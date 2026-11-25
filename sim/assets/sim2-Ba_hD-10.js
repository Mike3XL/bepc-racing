/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,s as t,t as n}from"./fftsea-BlV7h9PB.js";import{f as r,m as i,v as a}from"./waves-B5Ut6Mnp.js";import{_ as o}from"./seas-CiqO6vxw.js";import{i as s}from"./scenarios-CUIjf6SF.js";import{a as c,c as l,d as u,f as d,i as f,l as p,m,n as h,o as g,p as _,r as v,s as y,t as b,u as x}from"./atmosphere-CzlQdgsZ.js";import"./fftgpu-CavxKjr5.js";import{i as S,o as C}from"./wave-solve-YKJxEQBO.js";import{f as w,l as T,n as E,o as D,s as O,u as k}from"./perf-measure-mz5jO15u.js";import{n as A}from"./ripcascade-CufHP4RE.js";import{n as j,t as M}from"./clouds-Dpdjb2rK.js";import{n as ee,t as N}from"./ripples-webgpu-DC01rn5d.js";var P=`
struct T { reproj: mat4x4f, inSize: vec2f, outSize: vec2f, jitterPx: vec2f, wMax: f32, valid: f32, up: f32, sharpen: f32, sigN: f32, sigW: f32, wSoft: f32, pad1: f32, pad2: f32, pad3: f32 };
@group(0) @binding(0) var<uniform> P: T;
@group(0) @binding(1) var cur: texture_2d<f32>;
@group(0) @binding(2) var depth: texture_depth_2d;
@group(0) @binding(3) var hist: texture_2d<f32>;
@group(0) @binding(4) var lin: sampler;
struct FO { @location(0) screen: vec4f, @location(1) history: vec4f };
fn toYCoCg(c: vec3f) -> vec3f { return vec3f(dot(c, vec3f(0.25, 0.5, 0.25)), dot(c, vec3f(0.5, 0.0, -0.5)), dot(c, vec3f(-0.25, 0.5, -0.25))); }
fn fromYCoCg(c: vec3f) -> vec3f { return vec3f(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z); }
fn catmullRom(uv: vec2f, size: vec2f) -> vec4f {
  let p = uv * size - 0.5;
  let t1 = floor(p) + 0.5;
  let f = p - floor(p);
  let w0 = f * (-0.5 + f * (1.0 - 0.5 * f));
  let w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  let w2 = f * (0.5 + f * (2.0 - 1.5 * f));
  let w3 = f * f * (-0.5 + 0.5 * f);
  let w12 = w1 + w2;
  let p0 = (t1 - 1.0) / size;
  let p3 = (t1 + 2.0) / size;
  let p12 = (t1 + w2 / w12) / size;
  var c = textureSampleLevel(hist, lin, vec2f(p12.x, p0.y), 0.0) * (w12.x * w0.y);
  c += textureSampleLevel(hist, lin, vec2f(p0.x, p12.y), 0.0) * (w0.x * w12.y);
  c += textureSampleLevel(hist, lin, p12, 0.0) * (w12.x * w12.y);
  c += textureSampleLevel(hist, lin, vec2f(p3.x, p12.y), 0.0) * (w3.x * w12.y);
  c += textureSampleLevel(hist, lin, vec2f(p12.x, p3.y), 0.0) * (w12.x * w3.y);
  let wsum = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  return max(c / wsum, vec4f(0.0));
}
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) fp: vec4f) -> FO {
  let uv = fp.xy / P.outSize;
  let pc = uv * P.inSize;
  let ic = vec2i(floor(pc + P.jitterPx));
  let hiI = vec2i(P.inSize) - 1;
  // where this pixel was a frame ago: its depth (reversed: 1 near, 0 at infinity) through this frame's inverse view-projection and the
  // last frame's (one matrix, worked out on the CPU)
  let d = textureLoad(depth, clamp(ic, vec2i(0), hiI), 0);
  let prev = P.reproj * vec4f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0);
  let pn = prev.xy / prev.w;
  let uvPrev = vec2f(pn.x * 0.5 + 0.5, 0.5 - pn.y * 0.5);
  let onScreen = all(uvPrev >= vec2f(0.0)) && all(uvPrev <= vec2f(1.0)) && P.valid > 0.5 && prev.w > 0.0;
  let H = catmullRom(uvPrev, P.outSize);
  let vel = length((uvPrev - uv) * P.outSize);
  // the history's weight: what it holds, capped, and less where the picture moves: each read between the history's pixels softens it (most
  // at half a pixel, not at all on one), and a fast move brings more that is new (at 6 screen pixels a frame, about 3 frames' worth)
  let fr = fract(uvPrev * P.outSize - 0.5);
  let soft = clamp(4.0 * (fr.x * (1.0 - fr.x) + fr.y * (1.0 - fr.y)), 0.0, 1.0) * smoothstep(0.0, 0.05, vel);
  let wh = select(0.0, min(H.a, min(mix(P.wMax, P.wSoft, soft), mix(P.wMax, 3.0, clamp(vel / 6.0, 0.0, 1.0)))), onScreen);
  let sig = mix(P.sigW, P.sigN, clamp(wh / 3.0, 0.0, 1.0));
  let k = 0.5 / (sig * sig);
  var c = vec3f(0.0);
  var wsum = 0.0;
  var m1 = vec3f(0.0);
  var m2 = vec3f(0.0);
  for (var dy = -1; dy <= 1; dy++) {
    for (var dx = -1; dx <= 1; dx++) {
      let q = clamp(ic + vec2i(dx, dy), vec2i(0), hiI);
      let s = textureLoad(cur, q, 0).rgb;
      let dd = (vec2f(q) + 0.5 - P.jitterPx - pc) * P.up;      // (from the screen pixel's centre, in screen pixels)
      let w = exp(-k * dot(dd, dd));
      c += s * w;
      wsum += w;
      let y = toYCoCg(s);
      m1 += y;
      m2 += y * y;
    }
  }
  let cw = c / max(wsum, 1e-6);
  m1 /= 9.0;
  let sigma = sqrt(max(m2 / 9.0 - m1 * m1, vec3f(0.0)));
  let h = toYCoCg(H.rgb);
  let dh = h - m1;
  let ext = max(abs(dh) / max(1.25 * sigma, vec3f(1e-4)), vec3f(1.0));
  let hc = m1 + dh / max(ext.x, max(ext.y, ext.z));
  let clipped = length(hc - h) / max(length(m1), 1e-3);
  // this frame's share: its samples' weight against the history's, more where the history was clipped far
  let a0 = wsum / max(wh + wsum, 1e-6);
  let a = select(1.0, clamp(a0 + 0.5 * clipped, a0, 1.0), wh > 0.0);
  let o = max(mix(fromYCoCg(hc), cw, a), vec3f(0.0));
  let sharp = max(o + P.sharpen * (cw - fromYCoCg(m1)), vec3f(0.0));
  var r: FO;
  r.history = vec4f(o, wsum / max(a, 1e-3));      // (the weight it now holds: wh + wsum when nothing was clipped)
  r.screen = vec4f(pow(min(sharp, vec3f(1.0)), vec3f(1.0 / 2.2)), 1.0);
  return r;
}`;function F(e){let t=(e,t)=>{let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r},n=e%8+1;return[t(n,2)-.5,t(n,3)-.5]}var te=class{constructor(e,t,{wMax:n=12,wSoft:r=2,sigN:i=.35,sigW:a=.45,sharpen:o=0,jitter:s=!0}={}){Object.assign(this,{device:e,wMax:n,wSoft:r,sigN:i,sigW:a,sharpen:o,jitter:s});let c=e.createShaderModule({code:P,label:`temporal resolve`});this.modules=[c],this.pipe=e.createRenderPipeline({layout:`auto`,label:`temporal resolve`,vertex:{module:c,entryPoint:`vs`},fragment:{module:c,entryPoint:`fs`,targets:[{format:t},{format:`rgba16float`}]}}),this.uni=e.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(32),this.lin=e.createSampler({magFilter:`linear`,minFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),this.size=``,this.hist=[],this.cur=0,this.valid=!1}resize(e,t,n,r){let i=[e,t,n,r].join(` `);if(i!==this.size){this.size=i,this.inSize=[e,t],this.outSize=[n,r];for(let e of this.hist)e.destroy();this.hist=[0,1].map(()=>this.device.createTexture({size:[n,r],format:`rgba16float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),this.valid=!1}}reset(){this.valid=!1}resolve(e,t,n,r,i,a,o=null){let s=this.device,c=this.hist[this.cur],l=this.hist[1-this.cur],u=this.outSize[0]/this.inSize[0];this.uniF.set(r,0),this.uniF.set([...this.inSize,...this.outSize,i[0],i[1],this.wMax,+!!this.valid,u,this.sharpen,this.sigN,Math.max(this.sigW,.5*u),this.wSoft,0,0,0],16),s.queue.writeBuffer(this.uni,0,this.uniF);let d=s.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:t},{binding:2,resource:n},{binding:3,resource:c.createView()},{binding:4,resource:this.lin}]}),f=e.beginRenderPass({colorAttachments:[{view:a,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]},{view:l.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],...o?{timestampWrites:o}:{}});f.setPipeline(this.pipe),f.setBindGroup(0,d),f.draw(3),f.end(),this.cur=1-this.cur,this.valid=!0}};function ne(e){let t=Array.from(e),n=new Float32Array(16);n[0]=t[5]*t[10]*t[15]-t[5]*t[11]*t[14]-t[9]*t[6]*t[15]+t[9]*t[7]*t[14]+t[13]*t[6]*t[11]-t[13]*t[7]*t[10],n[4]=-t[4]*t[10]*t[15]+t[4]*t[11]*t[14]+t[8]*t[6]*t[15]-t[8]*t[7]*t[14]-t[12]*t[6]*t[11]+t[12]*t[7]*t[10],n[8]=t[4]*t[9]*t[15]-t[4]*t[11]*t[13]-t[8]*t[5]*t[15]+t[8]*t[7]*t[13]+t[12]*t[5]*t[11]-t[12]*t[7]*t[9],n[12]=-t[4]*t[9]*t[14]+t[4]*t[10]*t[13]+t[8]*t[5]*t[14]-t[8]*t[6]*t[13]-t[12]*t[5]*t[10]+t[12]*t[6]*t[9],n[1]=-t[1]*t[10]*t[15]+t[1]*t[11]*t[14]+t[9]*t[2]*t[15]-t[9]*t[3]*t[14]-t[13]*t[2]*t[11]+t[13]*t[3]*t[10],n[5]=t[0]*t[10]*t[15]-t[0]*t[11]*t[14]-t[8]*t[2]*t[15]+t[8]*t[3]*t[14]+t[12]*t[2]*t[11]-t[12]*t[3]*t[10],n[9]=-t[0]*t[9]*t[15]+t[0]*t[11]*t[13]+t[8]*t[1]*t[15]-t[8]*t[3]*t[13]-t[12]*t[1]*t[11]+t[12]*t[3]*t[9],n[13]=t[0]*t[9]*t[14]-t[0]*t[10]*t[13]-t[8]*t[1]*t[14]+t[8]*t[2]*t[13]+t[12]*t[1]*t[10]-t[12]*t[2]*t[9],n[2]=t[1]*t[6]*t[15]-t[1]*t[7]*t[14]-t[5]*t[2]*t[15]+t[5]*t[3]*t[14]+t[13]*t[2]*t[7]-t[13]*t[3]*t[6],n[6]=-t[0]*t[6]*t[15]+t[0]*t[7]*t[14]+t[4]*t[2]*t[15]-t[4]*t[3]*t[14]-t[12]*t[2]*t[7]+t[12]*t[3]*t[6],n[10]=t[0]*t[5]*t[15]-t[0]*t[7]*t[13]-t[4]*t[1]*t[15]+t[4]*t[3]*t[13]+t[12]*t[1]*t[7]-t[12]*t[3]*t[5],n[14]=-t[0]*t[5]*t[14]+t[0]*t[6]*t[13]+t[4]*t[1]*t[14]-t[4]*t[2]*t[13]-t[12]*t[1]*t[6]+t[12]*t[2]*t[5],n[3]=-t[1]*t[6]*t[11]+t[1]*t[7]*t[10]+t[5]*t[2]*t[11]-t[5]*t[3]*t[10]-t[9]*t[2]*t[7]+t[9]*t[3]*t[6],n[7]=t[0]*t[6]*t[11]-t[0]*t[7]*t[10]-t[4]*t[2]*t[11]+t[4]*t[3]*t[10]+t[8]*t[2]*t[7]-t[8]*t[3]*t[6],n[11]=-t[0]*t[5]*t[11]+t[0]*t[7]*t[9]+t[4]*t[1]*t[11]-t[4]*t[3]*t[9]-t[8]*t[1]*t[7]+t[8]*t[3]*t[5],n[15]=t[0]*t[5]*t[10]-t[0]*t[6]*t[9]-t[4]*t[1]*t[10]+t[4]*t[2]*t[9]+t[8]*t[1]*t[6]-t[8]*t[2]*t[5];let r=t[0]*n[0]+t[1]*n[4]+t[2]*n[8]+t[3]*n[12];for(let e=0;e<16;e++)n[e]/=r;return n}var re=`
// lk[0] exposure x white balance (rgb); [1] the sun's disc radiance; [2] the sun's irradiance (both exposed); [3] the air's extinction at the
// sea (1/m); [4] the haze's phase (g, g of the forward peak, its weight), the bleach; [5] the tone curve (knee, saturation, bleach start,
// end); [6] the saturation fade (start, end), the sun through the clouds, the sun not hidden; [7] the glitter's colour (display), its gain;
// [8] deep water's light, [9] the bottom's (linear, exposed), [10] 2 Kd (1/m), [11] the light through a crest (display); [12] the sky's light
// on things (0.85 skyE / pi), the sea's ambient gain; the clouds ( cloudMix): [13] low, mid, high cover, variety; [14] the low
// layer's puff, scale, base (m), opaque; [15] the towers' top (rad), share, anvil, the mid layer's sheet; [16] the sunlight at the low layer,
// the clouds' gain; [17] at the mid layer, storm darkness; [18] at the high layer; [19] at the towers' tops.
const SKY_T0: f32 = ${v.toFixed(4)};
fn lumF(c: vec3f) -> f32 { return dot(c, vec3f(0.2126, 0.7152, 0.0722)); }
/** The tone curve before the display's encoding ( toneEnc): saturation, a shoulder that keeps the hue, partly toward white far above the top. */
fn toneMapL(x: vec3f) -> vec3f {
  let fs = clamp((max(max(x.r, x.g), x.b) - F.lk[6].x) / (F.lk[6].y - F.lk[6].x), 0.0, 1.0);
  let sat = mix(F.lk[5].y, 1.0, fs * fs * (3.0 - 2.0 * fs));
  let lm = lumF(x);
  var y = max(vec3f(lm) + (x - vec3f(lm)) * sat, vec3f(0.0));
  let m = max(max(y.r, y.g), y.b);
  let k = F.lk[5].x;
  if (m > k) {
    let mc = k + (1.0 - k) * (1.0 - exp(-(m - k) / (1.0 - k)));
    let t = clamp((m - F.lk[5].z) / (F.lk[5].w - F.lk[5].z), 0.0, 1.0);
    let wb = F.lk[4].w * t * t * (3.0 - 2.0 * t);
    y = mix(y * (mc / m), vec3f(mc), wb);
  }
  return min(y, vec3f(1.0));
}
fn toneEnc(x: vec3f) -> vec3f { return pow(toneMapL(x), vec3f(1.0 / 2.2)); }
fn phaseHG(c: f32, g: f32) -> f32 { let g2 = g * g; return (1.0 - g2) / (12.566371 * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
fn phaseCS(c: f32, g: f32) -> f32 { let g2 = g * g; return 0.11936621 * (1.0 - g2) * (1.0 + c * c) / ((2.0 + g2) * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
/** The clear sky's exposed light in direction d (x east, y up, z -north): the tables, the haze's phase applied here. */
fn skyLin(d: vec3f) -> vec3f {
  let el = asin(clamp(d.y, -1.0, 1.0));
  let t = sign(el) * sqrt(abs(el) / 1.5707963);
  let v = clamp((t - SKY_T0) / (1.0 - SKY_T0), 0.0, 1.0);
  let hs = normalize(F.sun.xz + vec2f(1e-5));
  let hd = normalize(d.xz + vec2f(1e-5));
  let az = acos(clamp(dot(hs, hd), -1.0, 1.0)) / 3.14159265;
  let n = vec2f(48.0, 48.0);
  let uv = vec2f(az, v) * ((n - 1.0) / n) + 0.5 / n;
  let c = dot(d, F.sun.xyz);
  let ph = mix(phaseCS(c, F.lk[4].x), phaseHG(c, F.lk[4].y), F.lk[4].z);
  return (textureSampleLevel(skyR, skySamp, uv, 0.0).rgb + textureSampleLevel(skyM, skySamp, uv, 0.0).rgb * ph) * F.lk[0].xyz;
}
/** The sun's disc (limb-darkened, 0.53 degrees across) and the close glare round it in direction d: display values, added ( sunTerm). */
fn sunTerm(d: vec3f) -> vec3f {
  let q = 1.0 - max(dot(d, F.sun.xyz), 0.0);
  if (q > 0.02) { return vec3f(0.0); }      // (11 degrees out the glare is under 1e-4 of the sun's light: nothing to work out)
  let r2 = clamp(q / 1.07e-5, 0.0, 1.0);
  let disc = (1.0 - smoothstep(0.8, 1.0, r2)) * (0.4 + 0.6 * sqrt(1.0 - r2));
  let lin = F.lk[1].xyz * disc + F.lk[2].xyz * (40.0 * exp(-q / 1.5e-4) + 3.0 * exp(-q / 2.0e-3));
  return toneEnc(lin * F.lk[6].z) * step(1e-6, F.lk[6].z);
}
/** The sun's disc and glare over the sky as the dome shows it, added in light ( sunOver). s: the sky (display); vis: the sun's share seen. */
fn sunOver(s: vec3f, d: vec3f, vis: f32) -> vec3f {
  let q = 1.0 - max(dot(d, F.sun.xyz), 0.0);
  let r2 = clamp(q / 1.07e-5, 0.0, 1.0);
  let disc = (1.0 - smoothstep(0.8, 1.0, r2)) * (0.4 + 0.6 * sqrt(1.0 - r2));
  let lin = (F.lk[1].xyz * disc + F.lk[2].xyz * (2.0 * exp(-q / 1.2e-4) + 0.004 * exp(-q / 3.0e-3))) * (F.lk[6].z * vis);
  return pow(min(pow(s, vec3f(2.2)) + toneMapL(lin), vec3f(1.0)), vec3f(1.0 / 2.2));
}
// ---------- the clouds ( SKY_GLSL cloudLayers, line for line; the low layer as the slab, not yet the volume) ----------
var<private> gCloudA: f32;                   // the clouds' opacity in the last direction cloudLayers drew
var<private> gSunT: f32;                     // the direct sunlight's transmittance through them there
var<private> gClK: f32;                      // the share of clF's spread its last call kept
override LODK: f32 = 1.0;                    // a texel of the map being drawn over the 1.5 mrad pixel clF's level of detail is written for (finer octaves dropped)
fn skyH(p0: vec2f) -> f32 { let p = p0 - 289.0 * floor(p0 / 289.0); var p3 = fract(vec3f(p.x, p.y, p.x) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
fn skyN(p: vec2f) -> f32 {
  let i = floor(p);
  var f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(skyH(i), skyH(i + vec2f(1.0, 0.0)), f.x), mix(skyH(i + vec2f(0.0, 1.0)), skyH(i + vec2f(1.0, 1.0)), f.x), f.y);
}
/** Value-noise fbm of n octaves (about normal, mean 0.5, sd 0.15); octaves finer than the pixel (lod) dropped and the rest scaled to keep the spread. */
fn clF(p0: vec2f, n: i32, lod: f32) -> f32 {
  var p = p0;
  var s = 0.0;
  var a = 0.5;
  var fr = 1.0;
  var A = 0.0;
  var Fq = 0.0;
  var R = 0.0;
  for (var i = 0; i < 6; i++) {
    if (i >= n) { break; }
    let w = clamp(1.6 - lod * LODK * fr * 2.0, 0.0, 1.0);
    s += a * w * (skyN(p) - 0.5);
    A += a;
    Fq += a * a;
    R += a * a * w * w;
    p = p * 2.03 + vec2f(1.7, 9.2);
    a *= 0.5;
    fr *= 2.03;
  }
  gClK = sqrt(R / Fq);
  return 0.5 + s / (A * max(gClK, 0.35));
}
/** The distance along d (d.y > 0) from the eye to the height h (m) above a round sea. */
fn toShell(d: vec3f, h: f32) -> f32 { let b = 6360002.0 * d.y; let c = (h - 2.0) * (2.0 * 6360000.0 + h + 2.0); return c / (sqrt(b * b + c) + b); }
/** What gets through the air from a cloud at distance t, height h (the haze thinning upward, 1.5 km). */
fn clAir(d: vec3f, t: f32, h: f32) -> vec3f { let H = 1500.0; let path = min(t, H * (1.0 - exp(-h / H)) / max(d.y, 1e-3)); return exp(-F.lk[3].xyz * path); }
fn clSunAt(h: f32) -> vec3f {
  if (h < 4500.0) { return mix(F.lk[16].xyz, F.lk[17].xyz, clamp((h - 1200.0) / 3300.0, 0.0, 1.0)); }
  if (h < 9000.0) { return mix(F.lk[17].xyz, F.lk[18].xyz, (h - 4500.0) / 4500.0); }
  return mix(F.lk[18].xyz, F.lk[19].xyz, clamp((h - 9000.0) / 2000.0, 0.0, 1.0));
}
fn hgN(c: f32, g: f32) -> f32 { let g2 = g * g; return (1.0 - g2) / pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5); }
fn clThr(c: f32) -> f32 { let x = 0.5 - clamp(c, 0.0, 1.0); return 0.5 + 0.30 * x + 0.9 * x * x * x; }
fn clVaryK(d: vec3f) -> f32 {
  let p = normalize(d.xz + vec2f(1e-5)) * (1.0 - asin(min(d.y, 1.0)) / 1.5707963) * 1.15;
  let vn = skyN(p + vec2f(4.7, 1.3)) * 0.65 + skyN(p * 2.1 + vec2f(1.1, 8.3)) * 0.35;
  return F.lk[13].w * 3.0 * (2.0 * smoothstep(0.22, 0.78, vn) - 1.0);
}
fn clCov(c0: f32, k: f32) -> f32 { let c = clamp(c0, 0.0, 1.0); let o = c * exp(k); return o / (o + 1.0 - c); }
fn clExpLo(sunCol: vec3f) -> f32 {
  let m = max(max(sunCol.r, sunCol.g), max(sunCol.b, 1e-3));
  return mix(min(1.0, 3.1 / (F.lk[16].w * m)), 1.0, smoothstep(0.06, 0.3, F.sun.y));
}
fn clLight(sunCol: vec3f, lit: f32, thick: f32, dens: f32, under: f32, cs: f32, fwdG: f32) -> vec3f {
  let edge = dens * (1.0 - thick);
  let fwd = hgN(cs, fwdG);
  let up = clamp(F.sun.y * 1.3 + 0.15, 0.0, 1.0);
  let side = sunCol * 0.42 * (0.06 + 0.94 * lit) * (0.8 + 0.2 * min(fwd, 4.0) * (1.0 - thick));
  let base = mix(sunCol, vec3f(lumF(sunCol)), 0.6 * thick) * up * 0.8 * mix(0.6, 0.04, thick);
  let sun = (mix(side, base, under) + sunCol * 0.5 * edge * max(fwd - 1.0, 0.0)) * (F.lk[16].w * clExpLo(sunCol));
  let amb = F.lk[12].xyz;
  return sun + mix(vec3f(lumF(amb)), amb, 0.5) * 0.45 * (1.0 - 0.5 * thick * under);
}
/** All the clouds over the clear sky c in direction d (exposed light); gCloudA their opacity, gSunT the sunlight they let through. */
fn cloudLayers(d: vec3f, cIn: vec3f) -> vec3f {
  gCloudA = 0.0;
  gSunT = 1.0;
  var c = cIn;
  if (d.y <= 0.0) { return c; }
  let cs = dot(d, F.sun.xyz);
  let el = asin(min(d.y, 1.0));
  let toSun = normalize(F.sun.xz + vec2f(1e-4));
  let faceV = 0.5 - 0.5 * dot(normalize(d.xz + vec2f(1e-5)), toSun);
  let sideK = mix(1.0, 0.12 + 0.88 * faceV, 1.0 - smoothstep(0.15, 0.7, F.sun.y));
  let vary = clVaryK(d);
  let clW = F.lk[13];
  let clLow = F.lk[14];
  let clTow = F.lk[15];
  let amb = F.lk[12].xyz;
  let dark = F.lk[17].w;
  // high: cirrus fibres in bands and patches
  if (clW.z > 0.002) {
    let t = toShell(d, 9000.0);
    let x = d.xz * t;
    let r = vec2f(x.x * 0.8 + x.y * 0.6, -x.x * 0.6 + x.y * 0.8);
    let lod = 0.0027 * t / (450.0 * sqrt(max(d.y, 0.01)));
    let bq = r / vec2f(14000.0, 7000.0);
    let wq = r / vec2f(16000.0, 8000.0);
    let bank = skyN(bq + vec2f(3.3, 8.1)) * 0.65 + skyN(bq * 2.1 + vec2f(6.2, 0.7)) * 0.35;
    let bend = (skyN(wq + vec2f(1.9, 4.4)) - 0.5) + 0.5 * (skyN(wq * 2.3 + vec2f(8.8, 2.6)) - 0.5);
    let n = clF(vec2f(r.x / 7000.0, (r.y + 1200.0 * bend) / 450.0) + vec2f(7.3, 2.2), 5, lod);
    let cov = clCov(clW.z, vary + 1.8 * (2.0 * smoothstep(0.25, 0.75, bank) - 1.0));
    let thr = clThr(0.55 * cov);
    var a = smoothstep(thr - 0.07, thr + 0.28, n);
    a = a * a * (0.18 + 0.32 * cov) + 0.08 * cov * cov;
    var col = clLight(F.lk[18].xyz, 0.9, 0.0, a, 0.0, cs, 0.75);
    let T = clAir(d, t, 9000.0);
    col = col * T + c * (1.0 - T);
    c = mix(c, col, a);
    gCloudA = max(gCloudA, a * 0.5);
    gSunT *= 1.0 - 0.5 * a;
  }
  // mid: altocumulus patches to an altostratus veil
  if (clW.y > 0.002) {
    let L = mix(900.0, 2000.0, clTow.w);
    let t = toShell(d, 4500.0);
    let q = d.xz * t / L;
    let lod = 0.0015 * t / (L * sqrt(max(d.y, 0.01)));
    let n = clF(q * vec2f(1.0, 1.3) + vec2f(2.1, 5.7), 5, lod);
    let n2 = clF(q * vec2f(1.0, 1.3) + toSun * 0.15 + vec2f(2.1, 5.7), 3, lod);
    let cov = clCov(clW.y, vary);
    let sheet = clTow.w;
    let soft = mix(0.10, 0.40, sheet) + 0.12 * (1.0 - gClK);
    let thr = clThr(cov) - 0.5 * soft;
    let a = smoothstep(thr, thr + soft, n) * mix(0.92, 0.55 + 0.4 * cov, sheet);
    let lit = clamp(0.7 - (n2 - n) * 6.0, 0.1, 1.0);
    let thick = mix(0.25 * a, 0.35 + 0.6 * smoothstep(thr + 0.1, thr + 0.6, n), sheet);
    let underM = mix(0.5 * smoothstep(0.02, 0.4, d.y), 1.0, sheet);
    var col = clLight(F.lk[17].xyz, lit * mix(sideK, 1.0, underM), thick, a, underM, cs, 0.6);
    col = mix(col, amb * 0.5 * (0.8 + 0.3 * lit), dark * sheet);
    let T = clAir(d, t, 4500.0);
    col = col * T + c * (1.0 - T);
    c = mix(c, col, a);
    gCloudA = max(gCloudA, a);
    gSunT *= 1.0 - 0.8 * a;
  }
  // towers on the horizon, 30 to 55 km off: 20 sectors, each one tower or none
  if (clTow.y > 0.002 && clTow.x > 0.001 && el < clTow.x * 1.16) {
    let az = atan2(d.x, -d.z);
    let K = 20.0;
    let u = az * K / 6.2831853;
    let iu = floor(u);
    let azS = atan2(F.sun.x, -F.sun.z);
    var aT = 0.0;
    var colT = vec3f(0.0);
    for (var k = -1; k <= 1; k++) {
      let cx = iu + f32(k) + K;
      let ci = cx - K * floor(cx / K);
      let h1 = skyH(vec2f(ci, 17.0));
      let h2 = skyH(vec2f(ci, 23.0));
      let h3 = skyH(vec2f(ci, 31.0));
      let h4 = skyH(vec2f(ci, 43.0));
      let c0 = (iu + f32(k) + 0.2 + 0.6 * h2) * 6.2831853 / K;
      if (h1 > min(clCov(clTow.y, clVaryK(vec3f(sin(c0), 0.05, -cos(c0)))), 0.9)) { continue; }
      let sz = 0.55 + 0.45 * h3;
      let H = clTow.x * sz;
      let wC = H * (0.2 + 0.22 * h4) * (1.0 + 0.4 * clTow.z);
      let D = 30000.0 / sz;
      let sg = select(-1.0, 1.0, h3 > 0.5);
      let wA = min(wC * (2.0 + 1.6 * h2), 0.3);
      let dz0 = az - c0 + 3.14159265;
      let dz = dz0 - 6.2831853 * floor(dz0 / 6.2831853) - 3.14159265;
      let x = dz / wC;
      if (abs(dz) > max(wA * clTow.z, wC * 1.3) + 0.02) { continue; }
      let bq = vec2f(dz, el) * (12.0 / H) + vec2f(ci * 7.3, ci * 3.1);
      let lobe = clF(vec2f(x * 2.4 + ci * 5.1, ci * 2.3), 3, 0.0);
      let bl = clF(bq, 4, 0.0);
      let prof = H * pow(max(1.0 - x * x, 0.0), 0.3) * (0.72 + 0.45 * lobe);
      let inside = prof - el + H * 0.14 * (bl - 0.5) * (0.4 + 0.6 * el / H);
      let aC = smoothstep(0.0, 0.0012 + 0.003 * (1.0 - clLow.x), inside);
      let ua = sg * dz;
      let ax = select(-ua / (wC * 1.1), ua / wA, ua > 0.0);
      let aTop = H * (1.0 + 0.025 * (bl - 0.5));
      let th = H * (0.03 + 0.26 * pow(max(1.0 - ax, 0.0), 1.5));
      let aA = clTow.z * (1.0 - smoothstep(0.65, 1.0, ax + 0.3 * (bl - 0.5))) * smoothstep(aTop - th - 0.003, aTop - th + 0.002, el) * (1.0 - smoothstep(aTop - 0.003, aTop, el));
      let a = max(aC, aA);
      if (a <= aT) { continue; }
      let zf = clamp(el / H, 0.0, 1.0);
      let hz = D * tan(max(el, 0.0));
      let dh = normalize(d.xz + vec2f(1e-5));
      var face = 0.5 - 0.5 * dot(dh, toSun);
      let sd = sin(azS - c0);
      let bl2 = clF(bq + vec2f(sd * 0.35, 0.3 + 0.4 * F.sun.y), 4, 0.0);
      let blit = clamp(0.55 - (bl2 - bl) * 6.0, 0.0, 1.0);
      face = mix(0.55 + 0.45 * zf, face, 1.0 - smoothstep(0.15, 0.7, F.sun.y));
      var lt = clamp(face * (0.3 + 0.7 * blit) + (1.0 - face) * 0.3 * blit + 0.25 * sd * clamp(x, -1.0, 1.0) * (1.0 - smoothstep(0.3, 0.8, F.sun.y)), 0.0, 1.0);
      if (aA > aC) { lt = mix(0.35 * face, 0.9, smoothstep(aTop - 0.35 * th, aTop, el)); }
      let edge = (1.0 - smoothstep(0.0, 0.004, inside)) * aC;
      let sunCol = clSunAt(hz);
      var col = sunCol * (F.lk[16].w * clExpLo(sunCol)) * (0.42 * (0.04 + 0.96 * lt) * (0.7 + 0.3 * zf) + 0.6 * edge * max(hgN(cs, 0.7) - 1.0, 0.0))
              + mix(vec3f(lumF(amb)), amb, 0.5) * (0.3 + 0.25 * zf);
      col = mix(col, amb * 0.4, dark);
      let T = clAir(d, D, max(hz, 50.0));
      colT = col * T + c * (1.0 - T);
      aT = a;
    }
    c = mix(c, colT, aT);
    gCloudA = max(gCloudA, aT);
    gSunT *= 1.0 - aT;
  }
  // low: cumulus, stratocumulus, stratus, as a slab sampled at three heights (the cover narrowing upward)
  if (clW.x > 0.002) {
    let cell = 1500.0 * clLow.y;
    let hb = clLow.z;
    let puff = clLow.x;
    let depth = cell * mix(0.08, 0.5, puff);
    let cov = clCov(clW.x, vary);
    let thr0 = clThr(cov);
    let up = smoothstep(0.03, 0.5, d.y);
    let q0 = d.xz * toShell(d, hb) / cell;
    let w = 0.55 * vec2f(skyN(q0 * 0.45 + vec2f(9.1, 2.3)), skyN(q0 * 0.45 + vec2f(3.7, 7.9)));
    let deck = (1.0 - puff) * smoothstep(0.45, 0.85, cov);
    var acc = vec3f(0.0);
    var A = 0.0;
    var lit = 0.75;
    for (var j = 0; j < 3; j++) {
      let z = (f32(j) + 0.5) / 3.0;
      let h = hb + depth * z;
      let t = toShell(d, h);
      let q = d.xz * t / cell;
      let lod = 0.0015 * t / (cell * sqrt(max(d.y, 0.01)));
      let n = clF(q + w + vec2f(3.1, 1.4), select(4, 5, j == 0), lod);
      let kk = gClK;
      if (j == 1) { lit = clamp(0.7 - (clF(q + w + toSun * 0.12 + vec2f(3.1, 1.4), 3, lod) - n) * 7.0, 0.05, 1.0); }
      let soft = mix(0.30, 0.07, puff) + 0.12 * (1.0 - kk);
      let thr = thr0 - 0.5 * soft + puff * 0.16 * (z - 1.0 / 6.0);
      let dens = smoothstep(thr, thr + soft, n);
      let thick = smoothstep(thr, thr + soft + 0.22, n);
      if (dens < 0.003) { continue; }
      let under = mix(up * (1.0 - z), 1.0, deck);
      var col = clLight(F.lk[16].xyz, lit * (0.55 + 0.45 * z) * mix(sideK, 1.0, under), thick, dens, under, cs, 0.6);
      col = mix(col, amb * 0.45 * (0.75 + 0.35 * lit), dark);
      let T = clAir(d, t, h);
      col = col * T + c * (1.0 - T);
      let a = dens * mix(0.8, 0.7, puff);
      acc += (1.0 - A) * a * col;
      A += (1.0 - A) * a;
      if (A > 0.985) { break; }
    }
    c = c * (1.0 - A) + acc;
    gCloudA = max(gCloudA, A);
    gSunT *= 1.0 - A;
  }
  return c;
}
/** The sky with its clouds in direction d (display values; .a the clouds' opacity: what hides the sun behind them). */
fn skyBase(d: vec3f) -> vec4f {
  var c = skyLin(d);
  c = mix(c, vec3f(lumF(c)) * vec3f(0.52, 0.54, 0.57), F.lk[17].w);      // (the gaps under storm cloud: grey air lit from the sides)
  c = cloudLayers(d, c);
  return vec4f(toneEnc(c), gCloudA);
}
/** The sky just above the horizon in direction d's azimuth (display): what the distance fades things toward. */
fn horizonSky(d: vec3f) -> vec3f { return toneEnc(skyLin(normalize(vec3f(d.x, 0.012, d.z)))); }
`;function I(e){let t=new Float32Array(1),n=new Uint32Array(t.buffer);t[0]=e;let r=n[0],i=r>>>16&32768,a=(r>>>23&255)-127+15,o=r&8388607;return a<=0?i|(a<-10?0:(o|8388608)>>>1-a+13):a>=31?i|31744:i|a<<10|o>>>13}function L({sunElDeg:e=30,haze:t=null,hazeAmt:n=null,hazeType:r=null,teal:i=.6,turbid:a=0,bottom:o=null,glint:s=1.3,cloud:m=.35,cloudType:_=.25,cloudVar:v=.4,cloudDark:S=0}={},C={}){let[w,T]=b[t]??b.Light,E=n??w,D=r??T,O=`${E.toFixed(2)},${D.toFixed(2)}`;O!==C.hazeKey&&(C.atm=g(c(E,D)),C.hazeKey=O,C.skyKey=null);let k=Math.max(-4,e)*Math.PI/180,A=`${O}|${e}`,ee=!1;A!==C.skyKey&&(C.skyKey=A,C.sky=l(C.atm,k),ee=!0);let N=C.sky,P={...y(N),sunSin:Math.sin(k)},F=N.g,te=Math.min(1,Math.max(0,(P.lightSun-.03)/.37)),ne=h.bleach[2]*te*te*(3-2*te),re={...h,bleach:[h.bleach[0],h.bleach[1],ne]},I=d(u(i,a),P,o??[.22,.19,.15]),L=(e,t=0)=>[e[0],e[1],e[2],t],R=j(m,_,v),z=Math.min(1,Math.max(0,(R.opaque-.25)/.7)),B=(1-.9*z*z*(3-2*z))*(1-.5*S),ie=e=>p(C.atm,e,k).map((e,t)=>e*P.exp[t]*.8/Math.PI);return{values:new Float32Array([...L(P.exp),...L(P.sunDisc),...L(P.sunE),...L(N.ext),F.g,F.gPeak,F.wPeak,ne,h.knee,h.sat,h.bleach[0],h.bleach[1],h.satFade[0],h.satFade[1],B,1,...L(x(P.sunCol.map(e=>e*40),re),s),...L(f(I.deep,1/h.sat)),...L(f(I.bot,1/h.sat)),...L(I.kd),...L(x(I.sss)),...L(P.skyE.map(e=>e*.85/Math.PI),1),R.low,R.mid,R.high,R.variety,R.puff,R.scale,R.base,R.opaque,R.tower,R.towers,R.anvil,R.sheet,...L(ie(M.low),1),...L(ie(M.mid),S),...L(ie(M.high)),...L(ie(M.top))]),rayleigh:N.rayleigh,mie:N.mie,tablesChanged:ee,sky:N,look:P}}var R=class{constructor(e){this.device=e;let t=t=>e.createTexture({label:t,size:[48,48],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});this.rayleigh=t(`sky rayleigh`),this.mie=t(`sky mie`),this.values=new Float32Array(80),this.cache={},this.version=0}set(e={}){let t=L(e,this.cache);if(t.tablesChanged)for(let[e,n]of[[this.rayleigh,t.rayleigh],[this.mie,t.mie]]){let t=new Uint16Array(n.length);for(let e=0;e<n.length;e++)t[e]=I(n[e]);this.device.queue.writeTexture({texture:e},t,{bytesPerRow:384},[48,48])}return this.values.set(t.values),this.sky=t.sky,this.look=t.look,this.version++,this}},z=2*Math.PI;function B(e,t,n){let r=(Math.imul(e|0,2376512323)^Math.imul(t|0,3625334849)^Math.imul(n|0,3407524639))>>>0;return r^=r>>>16,r=Math.imul(r,2246822507)>>>0,r^=r>>>13,r=Math.imul(r,3266489909)>>>0,r^=r>>>16,r>>>0}var ie=(e,t,n)=>B(e,t,n)/4294967296,ae=e=>e*e*e*(e*(e*6-15)+10),oe=Float64Array.from({length:16},(e,t)=>Math.cos(z*(t+.5)/16)),se=Float64Array.from({length:16},(e,t)=>Math.sin(z*(t+.5)/16));function ce(e,t=0){let n=Math.floor(e),r=e-n,i=2*ie(n,0,t)-1,a=2*ie(n+1,0,t)-1;return i*r+(a*(r-1)-i*r)*ae(r)}function le(e,t,n=0){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=(e,t,r,i)=>{let a=B(e,t,n)>>>28;return oe[a]*r+se[a]*i},c=s(r,i,a,o),l=s(r+1,i,a-1,o),u=s(r,i+1,a,o-1),d=s(r+1,i+1,a-1,o-1),f=ae(a),p=ae(o),m=c+(l-c)*f;return m+(u+(d-u)*f-m)*p}var ue=.1405,V=.2158,de=2.399963229728653;function fe(e,t,n=0,r=null){return me(t,n,r,(n,r)=>ce(e/r+17.31*n,t.seed+101*n)/ue)}function pe(e,t,n,r=0,i=null){return me(n,r,i,(r,i)=>{let a=Math.cos(de*r),o=Math.sin(de*r);return le((a*e-o*t)/i+17.31*r,(o*e+a*t)/i-9.77*r,n.seed+101*r)/V})}function me(e,t,n,r){let i=2**-e.hurst,a=e.rms*Math.sqrt(1-i*i),o=Math.max(t,e.finest??0),s=0,c=0,l=a,u=e.scale;for(let e=0;e<24;e++,l*=i,u*=.5){let t=o>0?Math.min(1,Math.max(0,u/o-1)):1;if(t<=0){c+=l*l/(1-i*i);break}s+=t*l*r(e,u),c+=(1-t*t)*l*l}return n&&(n.value=s,n.cut=c),s}var he=`
fn nHash2(i: i32, j: i32, seed: i32) -> u32 {
  var h = (bitcast<u32>(i) * 0x8da6b343u) ^ (bitcast<u32>(j) * 0xd8163841u) ^ (bitcast<u32>(seed) * 0xcb1ab31fu);
  h ^= h >> 16u; h *= 0x85ebca6bu; h ^= h >> 13u; h *= 0xc2b2ae35u; h ^= h >> 16u;
  return h;
}
fn nFade(t: f32) -> f32 { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }
const N_GRAD = array<vec2f, 16>(vec2f(0.980785280, 0.195090322), vec2f(0.831469612, 0.555570233), vec2f(0.555570233, 0.831469612), vec2f(0.195090322, 0.980785280), vec2f(-0.195090322, 0.980785280), vec2f(-0.555570233, 0.831469612), vec2f(-0.831469612, 0.555570233), vec2f(-0.980785280, 0.195090322), vec2f(-0.980785280, -0.195090322), vec2f(-0.831469612, -0.555570233), vec2f(-0.555570233, -0.831469612), vec2f(-0.195090322, -0.980785280), vec2f(0.195090322, -0.980785280), vec2f(0.555570233, -0.831469612), vec2f(0.831469612, -0.555570233), vec2f(0.980785280, -0.195090322));
fn nGrad(i: i32, j: i32, seed: i32, d: vec2f) -> f32 { return dot(N_GRAD[nHash2(i, j, seed) >> 28u], d); }
fn nNoise2(p: vec2f, seed: i32) -> f32 {
  let c = floor(p);
  let f = p - c;
  let i = i32(c.x);
  let j = i32(c.y);
  let n00 = nGrad(i, j, seed, f);
  let n10 = nGrad(i + 1, j, seed, f - vec2f(1.0, 0.0));
  let n01 = nGrad(i, j + 1, seed, f - vec2f(0.0, 1.0));
  let n11 = nGrad(i + 1, j + 1, seed, f - vec2f(1.0, 1.0));
  let u = nFade(f.x);
  let v = nFade(f.y);
  return mix(mix(n00, n10, u), mix(n01, n11, u), v);
}
const N_ROT = array<vec2f, 24>(vec2f(1.000000000, 0.000000000), vec2f(-0.737368878, 0.675490294), vec2f(0.087425725, -0.996171041), vec2f(0.608438861, 0.793600751), vec2f(-0.984713485, -0.174181950), vec2f(0.843755295, -0.536728053), vec2f(-0.259604305, 0.965715074), vec2f(-0.460907025, -0.887448429), vec2f(0.939321296, 0.343038631), vec2f(-0.924345556, 0.381556408), vec2f(0.423845995, -0.905734273), vec2f(0.299283864, 0.954164120), vec2f(-0.865211210, -0.501407581), vec2f(0.976675774, -0.214719429), vec2f(-0.575129429, 0.818062430), vec2f(-0.128510690, -0.991708124), vec2f(0.764648995, 0.644446983), vec2f(-0.999146054, 0.041317826), vec2f(0.708829414, -0.705379941), vec2f(-0.046191446, 0.998932605), vec2f(-0.640709145, -0.767783688), vec2f(0.991069413, 0.133346988), vec2f(-0.820858337, 0.571131850), vec2f(0.219481369, -0.975616691));      // (each octave's turn by the golden angle)
fn nFractal2(p: vec2f, F: vec4f, band: vec2f) -> f32 {
  let r = exp2(-F.z);
  var amp = F.y * sqrt(1.0 - r * r);
  var w = F.x;
  var v = 0.0;
  for (var k = 0; k < 24; k++) {
    let keep = select(1.0, clamp(w / band.y - 1.0, 0.0, 1.0), band.y > 0.0);
    if (keep <= 0.0) { break; }
    let fine = select(1.0, 1.0 - clamp(w / band.x - 1.0, 0.0, 1.0), band.x > 0.0);      // (what a bake at f0 left out of this octave)
    if (fine > 0.0) {
      let cs = N_ROT[k].x;
      let sn = N_ROT[k].y;
      let q = vec2f((cs * p.x - sn * p.y) / w + 17.31 * f32(k), (sn * p.x + cs * p.y) / w - 9.77 * f32(k));
      v += fine * keep * amp * nNoise2(q, i32(F.w) + 101 * k) / ${V};
    }
    amp *= r;
    w *= 0.5;
  }
  return v;
}
// nNoise2 with its gradient (value, d/dx, d/dy): the same corners and fade, differentiated (a slope for the light with no second sample)
fn nNoise2d(p: vec2f, seed: i32) -> vec3f {
  let c = floor(p);
  let f = p - c;
  let i = i32(c.x);
  let j = i32(c.y);
  let ga = N_GRAD[nHash2(i, j, seed) >> 28u];
  let gb = N_GRAD[nHash2(i + 1, j, seed) >> 28u];
  let gc = N_GRAD[nHash2(i, j + 1, seed) >> 28u];
  let gd = N_GRAD[nHash2(i + 1, j + 1, seed) >> 28u];
  let a = dot(ga, f);
  let b = dot(gb, f - vec2f(1.0, 0.0));
  let cc = dot(gc, f - vec2f(0.0, 1.0));
  let d = dot(gd, f - vec2f(1.0, 1.0));
  let u = nFade(f.x);
  let v = nFade(f.y);
  let du = 30.0 * f.x * f.x * (f.x - 1.0) * (f.x - 1.0);
  let dv = 30.0 * f.y * f.y * (f.y - 1.0) * (f.y - 1.0);
  let k = a - b - cc + d;
  let n = a + u * (b - a) + v * (cc - a) + u * v * k;
  let g = ga + u * (gb - ga) + v * (gc - ga) + u * v * (ga - gb - gc + gd) + vec2f(du * ((b - a) + v * k), dv * ((cc - a) + u * k));
  return vec3f(n, g);
}
// nFractal2 with its gradient (value, d/dp.x, d/dp.y): each octave's gradient turned back and over its scale
fn nFractal2d(p: vec2f, F: vec4f, band: vec2f) -> vec3f {
  let r = exp2(-F.z);
  var amp = F.y * sqrt(1.0 - r * r);
  var w = F.x;
  var v = vec3f(0.0);
  for (var k = 0; k < 24; k++) {
    let keep = select(1.0, clamp(w / band.y - 1.0, 0.0, 1.0), band.y > 0.0);
    if (keep <= 0.0) { break; }
    let fine = select(1.0, 1.0 - clamp(w / band.x - 1.0, 0.0, 1.0), band.x > 0.0);
    if (fine > 0.0) {
      let cs = N_ROT[k].x;
      let sn = N_ROT[k].y;
      let q = vec2f((cs * p.x - sn * p.y) / w + 17.31 * f32(k), (sn * p.x + cs * p.y) / w - 9.77 * f32(k));
      let nd = nNoise2d(q, i32(F.w) + 101 * k);
      let gq = nd.yz / w;
      v += (fine * keep * amp / ${V}) * vec3f(nd.x, cs * gq.x + sn * gq.y, -sn * gq.x + cs * gq.y);
    }
    amp *= r;
    w *= 0.5;
  }
  return v;
}
// the cellular noise's twin ( cellEdge2, laceThreshold)
fn nCellEdge2(p: vec2f, seed: i32) -> f32 {
  let c = floor(p);
  var f1 = 9.0;
  var f2 = 9.0;
  for (var dj = -1; dj <= 1; dj++) {
    for (var di = -1; di <= 1; di++) {
      let h = nHash2(i32(c.x) + di, i32(c.y) + dj, seed);
      let q = c + vec2f(f32(di), f32(dj)) + vec2f(f32(h & 0xffffu), f32(h >> 16u)) / 65536.0;
      let d = length(q - p);
      if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) { f2 = d; }
    }
  }
  return f2 - f1;
}
const N_LACE = array<f32, 11>(0.0, 0.0401, 0.0826, 0.1276, 0.1765, 0.23, 0.2893, 0.3574, 0.4413, 0.5591, 1.2444);
fn nLaceSW(e: f32) -> f32 { return select(0.0, 1.0 - exp(-pow(e / 0.3232, 1.078)), e > 0.0); }
fn nLaceDW(e: f32) -> f32 { if (e <= 0.0) { return 0.0; } let x = pow(e / 0.3232, 1.078); return (1.078 / 0.3232) * x / max(e / 0.3232, 1e-6) * exp(-x); }
fn nLaceTAA(c: f32, a: f32) -> vec2f {
  let d = 0.58 * a;
  let g0 = 0.3 * nLaceSW(d);
  if (c <= g0) { return vec2f(0.0, select(0.0, c / g0, g0 > 0.0)); }
  var t = 0.3232 * pow(-log(1.0 - min(c, 0.999)), 1.0 / 1.078);
  for (var n = 0; n < 2; n++) {
    let G = 0.4 * nLaceSW(t) + 0.3 * (nLaceSW(t + d) + nLaceSW(t - d));
    let dg = 0.4 * nLaceDW(t) + 0.3 * (nLaceDW(t + d) + nLaceDW(t - d));
    t = max(0.0, t + (c - G) / max(dg, 0.1));
  }
  return vec2f(t, 1.0);
}
fn nLaceT(c: f32) -> f32 { let x = 10.0 * clamp(c, 0.0, 1.0); let i = min(9u, u32(x)); return mix(N_LACE[i], N_LACE[i + 1u], x - f32(i)); }
`,ge={seed:7,size:1024,res:512,landWidth:160,d50:.3,faceSlope:.07,berm:1.4,bermAt:22,dune:5,duneAt:70,duneWidth:45,maxDepth:22,bar:{u:95,height:1.4,width:16,wander:16,trough:.6,troughAt:1.8},rips:{spacing:230,jitter:.3,at:60,width:15,flare:1.5,cut:.9,depth:.6,head:.3,attach:.5},shore:{megacusp:8,cusps:22,cuspRelief:.24,swash:10,step:.25,stepAt:7},noise:{shore:{scale:1600,rms:10,hurst:.85,seed:51,split:300,finest:4},bed:{scale:80,rms:1,hurst:.8,seed:57,finest:4},zones:{offshore:.12,surf:.05,face:.02,berm:.06,dune:.5}},divots:{hs:1.2,tp:10,scour:1,plunge:4,width:5,minWidth:3,barAt:2.5,da:4,du:1,from:300},reef:{cover:.25,scale:55,height:1.8,from:140,to:3e3,rough:.35,wander:.3},weed:{cover:.4,scale:22,depthMin:3,depthMax:16},coral:{cover:.45,scale:7,depthMin:1.5,depthMax:9},surfClear:1.2,sandDry:[.62,.5,.33],wetDark:.55,weedAlb:[.045,.065,.03],rockAlb:[.34,.31,.26],coralAlb:[.3,.24,.17],scrub:{from:.35,cover:.75,scale:14},scrubAlb:[.1,.11,.055],grains:{quartz:.7,shell:.25,heavy:.05,quartzAlb:[.62,.48,.3],shellAlb:[.8,.77,.7],heavyAlb:[.08,.07,.06],facets:4,facetAlpha:.7,F0:.045},wetLine:.7,ripple:.14},_e=e=>.21*e**.48,ve=(e,t,n)=>{let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,2147483647)|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function ye(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=ve(r,i,n),u=ve(r+1,i,n),d=ve(r,i+1,n),f=ve(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}function be(e,t,n,r=4){let i=0,a=.5,o=1,s=0;for(let c=0;c<r;c++)i+=a*ye(e*o,t*o,n+c*101),s+=a,a*=.5,o*=2.03;return i/s}var xe=e=>.5+.11*Math.SQRT2*Se(1-2*Math.min(.999,Math.max(.001,e)));function Se(e){let t=.147,n=Math.log(1-e*e),r=2/(Math.PI*t)+n/2;return Math.sign(e)*Math.sqrt(Math.sqrt(r*r-n/t)-r)}var H=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Ce(e,t=ge){let n=t.rips;if(!n)return null;if(!(n.spacing>0)||!Number.isFinite(n.spacing))throw RangeError(`the rips' spacing must be a positive number of metres, not ${n.spacing}`);let r=n.spacing,i=Math.floor((e-n.at)/r),a=Math.min(n.jitter,.5),o=e=>n.at+r*(e+(e===0?0:a*(ve(e,77,t.seed)-.5))),s=-1/0,c=1/0;for(let t=i-1;t<=i+2;t++){let n=o(t);n<=e&&n>s&&(s=n),n>e&&n<c&&(c=n)}let l=(e-s)/(c-s);return{aL:s,aR:c,s:l,c:Math.cos(2*Math.PI*l),d:Math.min(e-s,c-e)}}function we(e,t,n,r){if(Math.abs(t)>3*n.swash)return 0;let i=2*Math.PI*e/n.cusps+6*(be(e/(3*n.cusps),.3,r+41,2)-.5),a=.5+.5*Math.cos(i);return(n.cuspRelief*H(.3,.6,be(e/(8*n.cusps),.7,r+43))*.67+n.cuspRelief*.33)*(a*a-.375)*Math.exp(-((t/n.swash)**2))}var Te=9.81,Ee=60,De=new WeakMap;function Oe(e){if(e>=1)return 1;if(e<.2)return 0;let t=e*e,n=Math.exp(-1/t);for(let e=0;e<30;e++){let e=(1-n+t*Math.log(n))/(t/n-1);if(n-=e,Math.abs(e)<1e-10)break}return Math.min(n,t)}function ke(e,t,n=Ce(e,t)?.c??0){let r=t.bar;return r.u+r.wander*n+.3*r.wander*(2*be(e/400,.5,t.seed+9)-1)}function Ae(e,t){let n=De.get(t);if(n||De.set(t,n=new Map),n.has(e))return n.get(e);let r=t.divots,i=e*r.da,a=Math.round((r.from+Ee)/r.du),o=new Float32Array(a+1);n.set(e,o);let s=Ce(i,t),c=s?1-Math.exp(-((s.d/(t.rips.width*(1+t.rips.flare)))**2)):1;if(c<.001)return o;let l=r.tp,u=1/l,d=r.hs/Math.SQRT2,f=.5+.4*Math.tanh(33*d*2*Math.PI/(Te*l*l)),p=d*d/8*(Te*l/(4*Math.PI)),m=0,h=Ie(i,t).ub+Ie(i,t).xf-.5*t.bar.width;for(let e=0;e<=a;e++){let n=r.from-e*r.du,s=Re(i,n,t,!1,!1),d=-(s.y+o[e]);if(d<.1)break;let g=C(l,d),_=S(g,d)[1],v=Math.sqrt(8*p/_),y=.88/g*Math.tanh(f*g*d/.88),b=Oe(v/y),x=b-m;if(p=Math.max(0,p-.25*u*b*y*y*r.du),m=b,x<=0||n>h)continue;let w=r.width*y,T=Math.max(r.minWidth,w),E=r.scour*y*x*c*(1-s.rock)*w/T,D=n-r.plunge*y,O=D-r.barAt*T,k=Math.max(0,Math.floor((r.from-D-3*T)/r.du)),A=Math.min(a,Math.ceil((r.from-O+3*T)/r.du));for(let e=k;e<=A;e++){let t=r.from-e*r.du;o[e]+=E*(Math.exp(-(((t-O)/T)**2))-Math.exp(-(((t-D)/T)**2)))}}return o}function je(e,t,n){let r=n.divots,i=Math.round((r.from+Ee)/r.du),a=(r.from-t)/r.du;if(a<0||a>i)return 0;let o=e/r.da,s=Math.floor(o),c=o-s,l=Math.min(Math.floor(a),i-1),u=a-l,d=e=>e[l]+(e[l+1]-e[l])*u;return(d(Ae(s,n))*(1-c)+d(Ae(s+1,n))*c)*(1-H(40,Ee,-t))}var Me=(e,t,n=ge)=>Re(e,t,n,!0,!0),Ne=null,Pe=NaN,Fe=null;function Ie(e,t){if(t===Ne&&e===Pe)return Fe;let n=Ce(e,t),r=n?n.c:0,i=t.noise,a=i?fe(e,i.shore,i.shore.split):0,o=i?fe(e,i.shore)-a:0,s={scale:1200,rms:.4,hurst:.8,finest:30},c=fe(e,{...s,seed:t.seed+61}),l=fe(e,{...s,seed:t.seed+67});return Fe={r:n,c:r,horn:.5-.5*r,ub:ke(e,t,r),xf:a,xn:o,rw:c,rw2:l},Ne=t,Pe=e,Fe}function Le(e,t){let n=t.noise.zones,r=t.shore?.swash??10;return e<0?n.face+(n.berm-n.face)*H(r,t.bermAt,-e)+(n.dune-n.berm)*H(t.duneAt,t.duneAt+.5*t.duneWidth,-e):n.face+(n.surf-n.face)*H(r,2*r,e)+(n.offshore-n.surf)*H(1.2*t.bar.u,1.8*t.bar.u,e)}function Re(e,t,n,r,i){let a=_e(n.d50),o=(2*a/(3*n.faceSlope))**3,s=n.bar,c=n.shore,l=n.rips,u=Ie(e,n),{r:d,c:f,horn:p,ub:m}=u,h=t-u.xf,g=h-((c?-c.megacusp*f:0)+u.xn)*(h>=0?1-H(.25*m,.7*m,h):1-H(n.bermAt,n.duneAt,-h)),_=c?we(e,g,c,n.seed):0,v=r&&n.divots?je(e,t,n):0,y=n.noise?Le(g,n)*pe(e,h,n.noise.bed):0,b,x=0,S=0,C=0,w=0,T=0,E=0;if(g>=0){let r=Math.min(n.maxDepth,a*(g+o)**(2/3)-a*o**(2/3)),f=H(0,.5*s.u,g),D=d?Math.exp(-((d.d/l.width)**2)):0,O=d?l.attach:0;r-=s.height*(1-(d?l.cut:0)*D)*Math.exp(-(((h-m)/s.width)**2))*f;let k=m-s.troughAt*s.width;if(r+=s.trough*(1-.4*p)*(1-O*p*p)*Math.exp(-(((h-k)/s.width)**2))*f,d){r-=O*p*p*.6*s.height*H(.15*m,.45*m,h)*(1-H(m-s.width,m,h));let e=k-s.width+O*(.2*m-(k-s.width)),t=l.width*(1+l.flare*(1-H(e,m-.5*s.width,h)));r+=l.depth*Math.exp(-((d.d/t)**2))*H(e-s.width,e,h)*(1-H(m+s.width,m+2.5*s.width,h))*f,r-=l.head*Math.exp(-((d.d/(2.5*l.width))**2))*Math.exp(-(((h-(m+3*s.width))/(1.5*s.width))**2))}c&&(r+=c.step*Math.exp(-(((g-c.stepAt)/(g<c.stepAt?1.5:5))**2))-_);let A=n.reef,j=be(e/A.scale,t/A.scale,n.seed+3),M=xe(A.cover),ee=A.from*(1+A.wander*u.rw),N=A.to*(1+A.wander*u.rw2),P=H(ee-30,ee,h)*(1-H(N,N+.1*A.to,h)),F=.5*(n.blur??0)/A.scale,te=(n.blur??0)>3.5?0:A.rough;x=H(M,M+.04,j)*P;let ne=A.height*H(M-F,M+.12+F,j)*(1-te+te*be(e/3.5,t/3.5,n.seed+5));r-=ne*+(H(M-F,M+F+1e-9,j)>0)*P,r-=v+y;let re=c?c.swash:0,I=H(re,2*re+1,g);if(b=-(r+I*Math.max(0,.05*g*n.faceSlope-r)),!i)return{y:b,rock:x};let L=-b,R=H(n.surfClear*n.bar.u*.85,n.surfClear*n.bar.u,h),z=n.weed,B=n.coral;w=H(z.depthMin,z.depthMin+1.5,L)*(1-H(z.depthMax-2,z.depthMax,L))*R,E=H(B.depthMin,B.depthMin+1,L)*(1-H(B.depthMax-2,B.depthMax,L))*R,T=P;let ie=xe(z.cover),ae=xe(B.cover);S=H(ie,ie+.05,be(e/z.scale,t/z.scale,n.seed+11))*w,C=x*H(ae,ae+.06,be(e/B.scale,t/B.scale,n.seed+17))*E,S*=1-.6*x,x*=1-C}else{let r=-g,i=Math.min(r*n.faceSlope,n.berm),a=n.dune*H(n.duneAt,n.duneAt+n.duneWidth,r)*(n.noise?1:.8+.4*be(e/60,r/60,n.seed+21));b=i+(r>n.bermAt?.15*(r-n.bermAt)/40:0)+a+_+v+y;let o=n.scrub,s=xe(o.cover);w=H(n.duneAt+o.from*n.duneWidth,n.duneAt+(o.from+.3)*n.duneWidth,r),S=H(s,s+.08,be(e/o.scale,t/o.scale,n.seed+31))*w}let D=Math.max(0,1-S-x-C);return{y:b,weed:S,rock:x,coral:C,sand:D,zW:w,zR:T,zC:E}}var ze=.7,U={rollerB:2.5,trailH:3,onset:.9,life:6,cover:.8,jitter:.25,jitterScale:12,drift:.15,patch:14,lead:.03,rag:.035,ragScale:5,ragFine:.25,sizeH:[.02,.08],qbMax:.98},Be={shareP:.65,warpScale:.4,warp:.25,hurst:.45,fine:.06,lifeVar:.6},W={area:.6,voids:.35,lengthH:2.5,peak:.35,bulkVar:.35,bulkScale:4,twistScale:1.4,twistFine:.35,twistV:.12,twistDrift:1.3,twistRoll:.4,crashEnd:1.8,crashAhead:1.2,splash:.15,ragGeo:1.5,lean:.55,leanBore:.4,leanWin:[-.12,.05],leanRamp:.04,lump:.6,spin:.5,churnT:.7,relief:.06,edge:.05,toeRag:.012},G={front:.06,life:6,stranded:2.5,strandedKeep:.7,cell:.35,onset:.9,frontOn:.8,frontLife:1.6,frontPeak:.6,mix:1,mixScale:30},Ve=e=>`
${he}
struct SW { grid: vec4f, size: vec4f, out: vec4f, misc: vec4f, sw: vec4f, bin: array<vec4f, ${e}>, lag: array<vec4f, ${e}>, cull: array<vec4f, 7> };
@group(0) @binding(0) var<uniform> U: SW;      // grid: a0, u0, 1/cell, bins; size: nx, ny; out: a0, u0, cell, n (texels a side); misc: time, chop, gamma; sw: (unused: the setup is layer 3's), the run-up's gain at the waves' periods, at the surf beat's, the bins' sum of amp^2; bin: omega, amp, then cos and sin of (phi - omega t) (the frame's rotation); lag: e^(i omega T) and e^(2 i omega T), T the mean period (each bin's turn back to one and two crests ago)
@group(0) @binding(1) var bins: texture_2d_array<f32>;      // amp, S, ka, ku per bin
// the outputs, one texture array (one storage binding: the default limit is four a stage), its layers: 0 the height, its displacement
// (a, u) and Hs; 1 its slope (dh/da, dh/du), the edge's band, the sea's share; 2 the swash's timing; 3 the whitewater's present inputs;
// 4 the past crests'; 5 the past uprushes' sizes (see textureStore below swRead)
@group(0) @binding(2) var outA: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(4) var bedTex: texture_2d<f32>;
@group(0) @binding(5) var bedSamp: sampler;
struct BedMap { m: vec4f };
@group(0) @binding(6) var<uniform> B: BedMap;      // the bed texture's a0, u0, 1/size
@group(0) @binding(7) var brk: texture_2d<f32>;      // layer 3 ( breakSea) on the bins' grid: the energy's survival, the share breaking, the loss, the setup
fn brkAt(q: vec2i) -> vec4f { let n = vec2i(i32(U.size.x), i32(U.size.y)); return textureLoad(brk, clamp(q, vec2i(0), n - 1), 0); }
@group(0) @binding(8) var shp: texture_2d<f32>;      // the waves' shape here ( waveShape): Abreu's r and phi
fn shpAt(q: vec2i) -> vec4f { let n = vec2i(i32(U.size.x), i32(U.size.y)); return textureLoad(shp, clamp(q, vec2i(0), n - 1), 0); }
@group(0) @binding(9) var sref: texture_2d<f32>;      // each bin's phase on the line its swash is timed from, by column ( REF_U), as a unit complex number (cos, sin)
fn srefAt(i: i32, b: i32) -> vec2f { return textureLoad(sref, vec2i(clamp(i, 0, i32(U.size.x) - 1), b), 0).xy; }
fn binAt(l: i32, q: vec2i) -> vec4f { let n = vec2i(i32(U.size.x), i32(U.size.y)); return textureLoad(bins, clamp(q, vec2i(0), n - 1), l, 0); }
fn crot(z: vec2f, a: f32) -> vec2f { let c = cos(a); let s = sin(a); return vec2f(z.x * c - z.y * s, z.x * s + z.y * c); }
/** Abreu et al. 2010's form for a wave whose linear complex amplitude here is z (its size the envelope, its angle the phase th; the form's
 *  phase pi/2 - th): the shaped height. A sine for r = 0. */
fn shapeAt(z: vec2f, rr: f32, ff: f32, cph: f32, sph: f32, cc: f32) -> f32 {
  let C = length(z);
  if (C < 1e-7) { return 0.0; }
  let c = z.x / C;
  let sn = z.y / C;
  let ca = sn * cph - c * sph;
  return C * ff * (c + cc) / (1.0 - rr * ca);
}
@compute @workgroup_size(8, 8) fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.out.w);
  if (id.x >= n || id.y >= n) { return; }
  let au = U.out.xy + (vec2f(id.xy) + 0.5) * U.out.z;
  // only what the frame can see (the water's and the ground's pixels read this frame's texels, and only where they are in view): the
  // texel's place on the still water against the view's side and near planes, with a margin for the waves' height and motion and the
  // bilinear read's neighbours; the texels left out keep an older frame's values, which nothing reads (cull[5].w 0: everything)
  if (U.cull[5].w > 0.0) {
    let pw = U.cull[6].xy + au.x * vec2f(U.cull[6].w, -U.cull[6].z) + au.y * U.cull[6].zw;      // (east, north)
    let rel = vec3f(pw.x - U.cull[5].x, 0.0, -(pw.y - U.cull[5].y));
    for (var k = 0; k < 5; k++) { if (dot(U.cull[k].xyz, rel) + U.cull[k].w < -U.cull[5].z) { return; } }
  }
  let g = (au - U.grid.xy) * U.grid.z - 0.5;
  let q0 = vec2i(floor(g));
  let f = g - floor(g);
  let guv = (g + 0.5) / vec2f(U.size.x, U.size.y);
  var h = 0.0;
  var d = vec2f(0.0);
  var s = vec2f(0.0);
  var e2 = 0.0;
  // this sea's breaking here (layer 3): the energy left (s), the share of waves breaking (qb), the setup (m)
  let bk = mix(mix(brkAt(q0), brkAt(q0 + vec2i(1, 0)), f.x), mix(brkAt(q0 + vec2i(0, 1)), brkAt(q0 + vec2i(1, 1)), f.x), f.y);
  let keep = sqrt(max(bk.x, 0.0));
  // the waves' shape (Abreu et al. 2010's form with Ruessink et al. 2012's r and phi from the local Ursell number): each bin's wave sharper
  // at the crest and flatter in the trough as it shoals, pitched forward as it breaks; a sine offshore (r = 0)
  let sh = mix(mix(shpAt(q0), shpAt(q0 + vec2i(1, 0)), f.x), mix(shpAt(q0 + vec2i(0, 1)), shpAt(q0 + vec2i(1, 1)), f.x), f.y);
  let rr = clamp(sh.x, 0.0, 0.95);
  let ff = sqrt(1.0 - rr * rr);
  let cph = cos(sh.y);
  let sph = sin(sh.y);
  let cc = rr * sph / (1.0 + ff);
  var hq = vec2f(0.0);      // (the sea here as a complex sum, linear: its size is the wave's envelope, its angle the wave's phase)
  var gq = mat2x2f(0.0, 0.0, 0.0, 0.0);      // (its gradient: columns the gradients of its real and imaginary parts)
  var zi = 0.0;      // (the waves as they arrive at the shore, at their offshore size: the swash's own)
  var zc = vec2f(0.0);      // (their complex sum: its squared size is the groups' envelope, the surf beat's)
  var zq = 0.0;      // (the swash's quadrature: with zi its analytic signal, whose angle is the swash's phase)
  var e2s = 0.0;      // (the low-passed bins' variance)
  // the sea as it was one, two and three mean periods ago (the crests that passed before this one), where waves break: each bin turned
  // back by omega T n (exact: the bins are the sea's whole past), so the foam each crest left is known from how big that crest was when it
  // broke, not from the present crest (the second review of 2026-11-24: "past envelope = current" deleted the foam's memory)
  let past = bk.y > 0.002;
  var hp1 = vec2f(0.0);
  var hp2 = vec2f(0.0);
  var hp3 = vec2f(0.0);
  var zp1 = vec2f(0.0);      // (the swash as it was one, two and three mean periods ago: whether each past uprush reached a point up the face)
  var zp2 = vec2f(0.0);
  var zp3 = vec2f(0.0);
  let t = U.misc.x;
  // the run-up's share here, known before the bins (so the swash's own sums run only where it is: a few texels in a hundred)
  let zb = textureSampleLevel(bedTex, bedSamp, (au - B.m.xy) * B.m.z, 0.0).x;
  let depth = max(-zb, 0.0);
  let wb = (1.0 - smoothstep(0.2, 1.2, depth)) * (1.0 - smoothstep(20.0, 40.0, bk.z));
  // the bores' mixing (Mike, 2026-11-24: "by the time we are at the shore, mixing would have randomized things quite a lot"; "add some
  // fractal noise component to near shore to reduce the strong left-to-right behavior"): the phase of the broken waves and of their swash
  // turned by a fractal of the along-shore place and of time (its largest scale ${G.mixScale} m along the shore and two wave periods in time,
  // resolved to the texel), the same across the shore, as strong as the share of the energy that has broken: each wave's arrival scatters
  // along the beach, its statistics unchanged, and the waves and the swash they cause stay together
  var mixR = vec2f(1.0, 0.0);
  if (${G.mix} > 0.0 && keep < 0.995) {
    let tm = t * ${G.mixScale} / (2.0 * 6.2831853 / max(U.size.w, 0.1));
    let ph = ${G.mix} * (1.0 - keep) * nFractal2(vec2f(au.x, tm), vec4f(${G.mixScale}.0, 1.0, 0.7, 657.0), vec2f(0.0, 2.0 * U.out.z));
    mixR = vec2f(cos(ph), sin(ph));
  }
  for (var b = 0; b < i32(U.grid.w); b++) {
    // (the field at this texel. A bilinear blend of a wave's phasors at two nodes whose phases differ by D has size cos(D / 2) at the
    // middle, and its phase lags in between and catches up at the node: in 0.5 m a 5 s wave turns 130 degrees across a 4 m cell, the
    // blend's size there 0.42, its crests advancing in steps: the grid of whitening 10 m from shore, the second review of 2026-11-24.
    // One filtered read a bin, its size's dip divided out in closed form for a plane wave of the read's wavevector, |1 - f + f e^(i D)|
    // along each axis: its phase's lag is then under 0.012 rad where a cell turns the wave by D < 0.9 rad (it grows as D^3: 0.03 at 1.2,
    // 0.06 at 1.5). Where D is larger (a short wave in shallow water) each corner's complex amplitude is carried to the point first, along
    // the mean of its own wavevector and the point's (the trapezoid rule: exact while the wavevector changes linearly across the cell, as it
    // does as the depth shoals), then blended; the two ways blended over D from 0.9 to 1.3 rad, so there is no line where they meet. The
    // four reads are only where they are needed: for Tp 7 s, the shortest bins in water under about 2 m.)
    var v = textureSampleLevel(bins, bedSamp, guv, b, 0.0);      // (one filtered read a bin: the field in half floats, the review of 2026-11-24)
    let cm = 1.0 / U.grid.z;
    let wc = smoothstep(0.9, 1.3, length(v.zw) * cm);
    if (wc < 1.0) {
      let ff2 = 2.0 * f * (1.0 - f) * (1.0 - cos(v.zw * cm));
      v = vec4f(v.xy * inverseSqrt(max((1.0 - ff2.x) * (1.0 - ff2.y), 0.4)), v.zw);      // (0.4: the dip's floor for D < 1.3, so beside a singularity it is not overdone)
    }
    if (wc > 0.0) {
      let a00 = binAt(b, q0); let a10 = binAt(b, q0 + vec2i(1, 0)); let a01 = binAt(b, q0 + vec2i(0, 1)); let a11 = binAt(b, q0 + vec2i(1, 1));
      // (the point's wavevector: the corners' weighted by their sizes as well as their nearness, so a cell beside a phase singularity,
      // where the wave is small and its phase winds fast, does not turn the others)
      let w4 = vec4f((1.0 - f.x) * (1.0 - f.y) * length(a00.xy), f.x * (1.0 - f.y) * length(a10.xy), (1.0 - f.x) * f.y * length(a01.xy), f.x * f.y * length(a11.xy));
      let kp = (w4.x * a00.zw + w4.y * a10.zw + w4.z * a01.zw + w4.w * a11.zw) / max(w4.x + w4.y + w4.z + w4.w, 1e-9);
      let p00 = crot(a00.xy, 0.5 * dot(a00.zw + kp, vec2f(f.x, f.y) * cm));
      let p10 = crot(a10.xy, 0.5 * dot(a10.zw + kp, vec2f(f.x - 1.0, f.y) * cm));
      let p01 = crot(a01.xy, 0.5 * dot(a01.zw + kp, vec2f(f.x, f.y - 1.0) * cm));
      let p11 = crot(a11.xy, 0.5 * dot(a11.zw + kp, vec2f(f.x - 1.0, f.y - 1.0) * cm));
      v = vec4f(mix(v.xy, mix(mix(p00, p10, f.x), mix(p01, p11, f.x), f.y), wc), mix(v.zw, kp, wc));
    }
    // (the bin's field is its complex amplitude amp e^(i S), interpolated as a complex number: through a phase singularity (a diffraction
    // shadow's, where amp is 0) or a 2 pi difference in the stored phase, a phase interpolated as a real number swept through whole cycles
    // within a cell; its rotation for this time, e^(i (phi - omega t)), comes from the frame: U.bin.zw)
    let rot = vec2f(U.bin[b].z * mixR.x - U.bin[b].w * mixR.y, U.bin[b].z * mixR.y + U.bin[b].w * mixR.x);      // (the frame's rotation, turned by the mixing)
    let zc0 = vec2f(v.x * rot.x - v.y * rot.y, v.x * rot.y + v.y * rot.x);
    let am = length(v.xy);
    let c = zc0.x / max(am, 1e-9);
    let sn = zc0.y / max(am, 1e-9);
    if (wb > 0.0) {
      // (the swash: timed from the reference line, its phase interpolated between columns as a complex number, so a stored 2 pi jump
      // between columns does nothing)
      let r0 = srefAt(q0.x, b);
      let r1 = srefAt(q0.x + 1, b);
      let rm = mix(r0, r1, f.x);
      let rc = rm / max(length(rm), 1e-6);
      let cr = rc.x * rot.x - rc.y * rot.y;
      let sr = rc.x * rot.y + rc.y * rot.x;
      // the uprush's lateral spreading: a tongue of water running up the face spreads sideways about as far as it runs, so the run-up has
      // no along-shore detail finer than its excursion: each bin's part low-passed along the shore (a Gaussian of the excursion's length,
      // on its along-shore wavenumber at the reference line), then the sum scaled back to the same variance, so each point keeps
      // Stockdon's statistics and only the along-shore coherence changes (without it the edge, the run-up's level over a 1:15 face, had
      // straight-sided teeth: Mike, 2026-11-24)
      let ka = atan2(r0.x * r1.y - r0.y * r1.x, dot(r0, r1)) * U.grid.z;      // (the phase's step between the columns, the shortest way round)
      let dmp = exp(-0.5 * ka * ka * U.size.z * U.size.z);
      zi += U.bin[b].y * dmp * cr;
      zq += U.bin[b].y * dmp * sr;
      let zs = U.bin[b].y * dmp * vec2f(cr, sr);
      let l1 = U.lag[b].xy;
      let l2 = U.lag[b].zw;
      zp1 += vec2f(zs.x * l1.x - zs.y * l1.y, zs.x * l1.y + zs.y * l1.x);
      let zs2 = vec2f(zs.x * l2.x - zs.y * l2.y, zs.x * l2.y + zs.y * l2.x);
      zp2 += zs2;
      zp3 += vec2f(zs2.x * l1.x - zs2.y * l1.y, zs2.x * l1.y + zs2.y * l1.x);
      e2s += U.bin[b].y * U.bin[b].y * dmp * dmp;
      zc += U.bin[b].y * vec2f(cr, sr);
    }
    let A = U.bin[b].y * am * keep;
    if (A <= 0.0) { continue; }
    let kv = v.zw;
    let kl = max(length(kv), 1e-4);
    hq += A * vec2f(c, sn);
    if (past) {
      let z = A * vec2f(c, sn);
      let l1 = U.lag[b].xy;
      let l2 = U.lag[b].zw;
      hp1 += vec2f(z.x * l1.x - z.y * l1.y, z.x * l1.y + z.y * l1.x);
      let z2 = vec2f(z.x * l2.x - z.y * l2.y, z.x * l2.y + z.y * l2.x);
      hp2 += z2;
      hp3 += vec2f(z2.x * l1.x - z2.y * l1.y, z2.x * l1.y + z2.y * l1.x);
    }
    gq += mat2x2f(-A * sn * kv, A * c * kv);      // (the gradient of the complex field: d/dx of A e^(i th) is i k A e^(i th))
    d -= U.misc.y * A * sn * kv / kl;
    e2 += 0.5 * A * A;
  }
  // the waves' shape on the total, not on each bin (Ruessink 2012's fits are for the waves as they are, the sum: shaped one by one, 35
  // components summed to about a third of the skewness; the review of 2026-11-24): h = shaped(|hq|, arg hq), its slope by the chain rule
  // through hq (the form's phase is pi/2 - arg hq)
  let hs0 = shapeAt(hq, rr, ff, cph, sph, cc);
  h = hs0;
  let eps = max(1e-3, 1e-3 * length(hq));
  let dhx = (shapeAt(hq + vec2f(eps, 0.0), rr, ff, cph, sph, cc) - hs0) / eps;
  let dhy = (shapeAt(hq + vec2f(0.0, eps), rr, ff, cph, sph, cc) - hs0) / eps;
  s = dhx * gq[0] + dhy * gq[1];
  // the depth-limited cap: the sea's Hs here (4 sqrt of the variance) no more than gamma times the depth
  let hs = 4.0 * sqrt(e2);
  let cap = select(1.0, min(1.0, U.misc.z * depth / hs), hs > 1e-4);
  // near and above the waterline, the run-up's level: layer 3's setup at the shore (carried up the beach), the swash and the surf beat (the
  // envelope's departure from its mean, over its mean); taking over from the sea only in shallow water within 20 to 40 m of the shoreline
  // (layer 3's distance), not over shallow bars out in the surf
  let rn = sqrt(U.sw.w / max(e2s, 1e-9 * U.sw.w));
  zi *= rn;
  zq *= rn;
  let slow = bk.w + U.sw.z * (dot(zc, zc) - U.sw.w) / max(U.sw.w, 1e-6);
  let zeta = slow + U.sw.y * zi;
  // the level is the swash's only in the swash's own zone, from the backwash's lowest reach up (below it the water is never dry and its
  // surface is the waves'): over all the shallow band it lifted the whole band as a flat plateau whenever a big swash came (Mike,
  // 2026-11-24: "every once in a while (about 1/min) there is some huge surge at the shore")
  let E = U.sw.y * length(vec2f(zi, zq));
  let wz = smoothstep(slow - 1.5 * E - 0.3, slow - E, zb);      // (1 wherever the edge can be: at or above the backwash's lowest reach)
  // and only on the beach face, within about the swash's excursion of the shoreline (size.z: the significant swash over the face's slope):
  // over a flat terrace further out the run-down's level would lay bare tens of metres the bores keep covered (found 2026-11-24: a dry
  // polygon of bed 25 m offshore at the run-down); there the surface is the waves'
  let faceZ = 1.0 - smoothstep(0.8 * U.size.z + 2.0, 1.6 * U.size.z + 4.0, bk.z);
  // the swash's water is a sheet: never deeper than a bore's height over the bed (a few cm in a small sea, tens of cm in a big one), so a big
  // swash lifts a thin sheet up the beach, not the whole shallows as a flat plateau
  let sheet = min(zeta, zb + 0.05 + 0.25 * E);
  let w = wb * wz * faceZ;
  // (the shore wash's timing: zeta = slow + Re(E e^(i psi)) times the bore's front and the lace behind it from it)
  textureStore(outA, id.xy, 2, select(vec4f(0.0), vec4f(U.sw.y * zi, U.sw.y * zq, slow, wb), wb > 0.0));      // (w: the band's share, which tapers the lace at its seaward side)
  textureStore(outA, id.xy, 0, vec4f(mix(h * cap + bk.w, sheet, w), d * cap * (1.0 - w), hs * cap));
  // which crests break, crest by crest: those whose height here (twice the envelope) is above the height that a share Qb of a Rayleigh sea
  // exceeds, Hrms sqrt(-ln Qb) (so on average the share is layer 3's); the present crest's height over it and the last three crests' (the
  // sea a period, two and three ago), for the roller and the foam they leave ( surfAt)
  let hrms = 2.0 * sqrt(2.0 * e2) * cap;
  let qb = bk.y;
  // (the inputs only, smooth from texel to texel; the sharp parts, the threshold and the time since the crest, are worked out per pixel in
  // surfAt: made per texel and magnified they drew a staircase along an oblique crest, Mike 2026-11-24)
  // (Qb no more than SURF.qbMax here and where the shaders read it back ( surfThr): stored as a half float, a Qb
  // near 1 rounds by 5e-4, and the threshold's root of -ln Qb by up to half itself, so the crest's height that the ratio times the
  // threshold gives back came out a tenth of the true one in the inner surf, 2026-11-25)
  let hthr = max(hrms * sqrt(-log(clamp(qb, 1e-4, ${U.qbMax}))), 1e-3);
  let rat = vec4f(length(hq), length(hp1), length(hp2), length(hp3)) * 2.0 * cap / hthr;
  // (the phase is the drawn crest's, not the linear wave's: Abreu's form pitches the crest forward, to th_c where sin th = r cos phi +
  // r cc cos(th - phi) (its maximum; two fixed-point steps), reached up to a twelfth of a cycle before the linear crest in the surf: the
  // whitewater timed from the linear crest began behind the drawn one)
  var thc = asin(clamp(rr * cph, -1.0, 1.0));
  for (var it = 0; it < 2; it++) { thc = asin(clamp(rr * cph + rr * cc * cos(thc - sh.y), -1.0, 1.0)); }
  let hq1 = hq / max(length(hq), 1e-6);
  let hqn = vec2f(hq1.x * cos(thc) + hq1.y * sin(thc), hq1.y * cos(thc) - hq1.x * sin(thc));
  // the crests' phase's gradient (the local wavenumber, rad/m): how far a pixel's footprint spans the cycle, for the whitewater's filter
  let kph = min(length(hq.x * gq[1] - hq.y * gq[0]) / max(dot(hq, hq), 1e-9), 4.0);
  textureStore(outA, id.xy, 3, vec4f(rat.x, hqn, qb));
  textureStore(outA, id.xy, 4, vec4f(rat.yzw, kph));
  textureStore(outA, id.xy, 5, select(vec4f(0.0), vec4f(vec3f(length(zp1), length(zp2), length(zp3)) * rn * U.sw.y, 0.0), wb > 0.0));      // (the past uprushes' sizes, as the swash's E)
  textureStore(outA, id.xy, 1, vec4f(s * cap * (1.0 - w), wb, 1.0 - w));      // (w: how much of the surface is the sea's, not the run-up's: the whitewater's share)      // (z: the band where the water's edge is found at the pixel's scale, from the swell's texture, never the mesh's facets)      // (z: the run-up's share, for the edge at the pixel's scale; w: the breaking waves' whitewater)
}`,He=class{constructor(e,t,n,r,{n:i=512,cell:a=1,a0:o=-256,u0:s=-16,chop:c=ze,gamma:l=.78,swash:u=null,face:d=.07}={}){Object.assign(this,{device:e,n:i,cell:a,a0:o,u0:s,chop:c,gamma:l});let f=t.bins.length,p=t.nx,m=t.ny;this.bins=e.createTexture({label:`swell bins`,size:[p,m,f],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),t.bins.forEach((t,n)=>{let r=new Uint16Array(p*m*4);for(let e=0;e<p*m;e++){let n=t.amp[e]||0;r[4*e]=I(n*Math.cos(t.S[e])),r[4*e+1]=I(n*Math.sin(t.S[e])),r[4*e+2]=I(t.ka[e]||0),r[4*e+3]=I(t.ku[e]||0)}e.queue.writeTexture({texture:this.bins,origin:[0,0,n]},r,{bytesPerRow:p*8,rowsPerImage:m},[p,m,1])}),this.brk=e.createTexture({label:`swell breaking`,size:[p,m],format:`rgba32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let h=t.breaking??Float32Array.from({length:p*m*4},(e,t)=>+(t%4==0));e.queue.writeTexture({texture:this.brk},h,{bytesPerRow:p*16},[p,m]),this.sref=e.createTexture({label:`swell swash phase`,size:[p,f],format:`rg32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let g=new Float32Array(2*p*f);t.bins.forEach((e,t)=>{for(let n=0;n<p;n++){let r=e.sref?e.sref[n]:0;g[2*(t*p+n)]=Math.cos(r),g[2*(t*p+n)+1]=Math.sin(r)}}),e.queue.writeTexture({texture:this.sref},g,{bytesPerRow:p*8},[p,f]),this.shp=e.createTexture({label:`swell shape`,size:[p,m],format:`rg32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.queue.writeTexture({texture:this.shp},t.shape??new Float32Array(p*m*2),{bytesPerRow:p*8},[p,m]),this.out=e.createTexture({label:`swell out`,size:[i,i,6],format:`rgba16float`,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),this.U=new Float32Array(20+8*f+28),this.oCull=20+8*f,this.U.set([t.a0,t.u0,1/t.cell,f,p,m,u?u.sInc/d:0,0,o,s,a,i,0,c,l,0],0),this.U[7]=t.bins.reduce((e,t)=>e+t.a*t.a*t.omega,0)/Math.max(t.bins.reduce((e,t)=>e+t.a*t.a,0),1e-12);let _=t.bins.reduce((e,t)=>e+t.a*t.a,0),v=4*Math.sqrt(_/2);u?this.U.set([u.setup,u.sInc/v,u.sIG/4,_],16):this.U.set([0,0,0,_],16),this.binsW=t.bins.map(e=>[e.omega,e.phi]),t.bins.forEach((e,t)=>this.U.set([e.omega,e.a,1,0],20+4*t)),this.omegaMean=t.bins.reduce((e,t)=>e+t.a*t.a*t.omega,0)/Math.max(_,1e-12);let y=2*Math.PI/Math.max(this.omegaMean,.05);t.bins.forEach((e,t)=>this.U.set([Math.cos(e.omega*y),Math.sin(e.omega*y),Math.cos(2*e.omega*y),Math.sin(2*e.omega*y)],20+4*f+4*t)),this.ubuf=e.createBuffer({size:this.U.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.bbuf=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.bbuf,0,new Float32Array([r.a0,r.u0,1/r.size,0])),this.module=e.createShaderModule({label:`swell`,code:Ve(f)}),this.pipe=e.createComputePipeline({label:`swell`,layout:`auto`,compute:{module:this.module,entryPoint:`main`}});let b=e.createSampler({magFilter:`linear`,minFilter:`linear`});this.bg=e.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.bins.createView({dimension:`2d-array`})},{binding:2,resource:this.out.createView({dimension:`2d-array`})},{binding:4,resource:n},{binding:5,resource:b},{binding:6,resource:{buffer:this.bbuf}},{binding:7,resource:this.brk.createView()},{binding:8,resource:this.shp.createView()},{binding:9,resource:this.sref.createView()}]})}encode(e,t,n=null){if(this.U[12]=t,n){let e=n.vp,t=t=>[e[t],e[4+t],e[8+t],e[12+t]],r=t(0),i=t(1),a=t(2),o=t(3);[o.map((e,t)=>e+r[t]),o.map((e,t)=>e-r[t]),o.map((e,t)=>e+i[t]),o.map((e,t)=>e-i[t]),o.map((e,t)=>e-a[t])].forEach((e,t)=>{let n=Math.hypot(e[0],e[1],e[2])||1;this.U.set(e.map(e=>e/n),this.oCull+4*t)}),this.U.set([n.cam[0],n.cam[1],12,1],this.oCull+20),this.U.set(n.frame,this.oCull+24)}else this.U[this.oCull+23]=0;this.binsW.forEach(([e,n],r)=>{let i=n-e*t;this.U[20+4*r+2]=Math.cos(i),this.U[20+4*r+3]=Math.sin(i)}),this.device.queue.writeBuffer(this.ubuf,0,this.U),e.setPipeline(this.pipe),e.setBindGroup(0,this.bg),e.dispatchWorkgroups(Math.ceil(this.n/8),Math.ceil(this.n/8))}get map(){return[this.a0,this.u0,1/(this.n*this.cell),1]}get wash(){return[this.omegaMean,G.front,G.life,G.stranded]}get sea(){return[4*Math.sqrt(this.U[19]/2),2*Math.PI/Math.max(this.omegaMean,.1),0,0]}},Ue=Array.from({length:6},(e,t)=>.6**t),We=Ue.reduce((e,t)=>e+t,0),K={cell:.42,scales:Ue.map((e,t)=>[.41**t,e/We]),warp:.9,width:.6,patch:3.4,patchAmp:.35,gain:1};function Ge(e,t=[0,0],n=180,r=ge){let i=new Float32Array(72);if(!e)return i;let a=n*Math.PI/180;i.set([t[0],t[1],Math.sin(a),Math.cos(a)],0),i.set([e.a0,e.u0,1/e.size,1],4),i.set([e.texel,r.wetLine,r.ripple,r.wetDark],8),i.set([...r.sandDry,e.levels.length],12);let o=e.outer??e,s=_e(r.d50),c=(2*s/(3*r.faceSlope))**3,l=o.u0+o.size,u=Math.min(r.maxDepth,s*((l+c)**(2/3)-c**(2/3))),d=u>=r.maxDepth?.005:2/3*s*(l+c)**(-1/3);i.set([...r.weedAlb,-u,...r.rockAlb,d,...r.coralAlb,0,...r.scrubAlb,0],16);let f=r.grains;i.set([r.d50/1e3,f.quartz,f.shell,f.heavy,...f.quartzAlb,f.facets,...f.shellAlb,f.facetAlpha,...f.heavyAlb,f.F0],32),i.set([o.a0,o.u0,1/o.size,o.levels.length],48);let p=r.noise;return p&&(i.set([p.bed.scale,p.bed.hurst,p.bed.seed,p.zones.face],52),i[31]=p.bed.finest),i[27]=r.faceSlope,[[r.reef,3,.04],[r.weed,11,.05],[r.coral,17,.06],[r.scrub,31,.08]].forEach(([e,t,n],a)=>i.set([e.scale,xe(e.cover),r.seed+t,n],56+4*a)),i}function Ke(e,t=null){let n=t?t.res:1,r=t?t.levels.length:1,i=e.createTexture({label:`beach bed`,size:[n,n],format:`rgba16float`,mipLevelCount:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return(t?t.levels:[new Float32Array([-1e3,0,0,0])]).forEach((t,r)=>{let a=Math.max(1,n>>r),o=new Uint16Array(t.length);for(let e=0;e<t.length;e++)o[e]=I(t[e]);e.queue.writeTexture({texture:i,mipLevel:r},o,{bytesPerRow:a*8},[a,a])}),i}var qe=`
@group(0) @binding(10) var bedTex: texture_2d<f32>;      // the beach's bed: elevation (m), weed, rock, coral
@group(0) @binding(13) var bedOut: texture_2d<f32>;      // the same bed round it, coarser ( OUTER)
fn bHash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn bNoise(p: vec2f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(bHash(i), bHash(i + vec2f(1.0, 0.0)), u.x), mix(bHash(i + vec2f(0.0, 1.0)), bHash(i + vec2f(1.0, 1.0)), u.x), u.y);
}
/** A detail noise faded out where the pixel's footprint px is wider than its scale s (so far views do not shimmer): 0.5 on average. */
fn bDetail(p: vec2f, s: f32, px: f32) -> f32 { return mix(bNoise(p / s), 0.5, smoothstep(0.35 * s, 1.0 * s, px)); }
fn bedOn() -> bool { return F.bd[1].w > 0.5; }
/** A point (east, north) to the bed's texture coordinates (the beach's along-shore and offshore axes). */
fn bedUV(p: vec2f) -> vec2f {
  let d = p - F.bd[0].xy;
  let off = F.bd[0].zw;
  let au = vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off));      // (a along the shore, u offshore)
  return (au - F.bd[1].xy) * F.bd[1].z;
}
fn bedLod(px: f32) -> f32 { return clamp(log2(max(px, 1e-3) / F.bd[2].x), 0.0, F.bd[3].w - 1.0); }
fn bedAU(p: vec2f) -> vec2f { let d = p - F.bd[0].xy; let off = F.bd[0].zw; return vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off)); }
/** The outer bed at p: mirrored along the shore past its square, its edge's height inland past it, and offshore past it the profile
 *  carried on (bare sand falling away), never its edge's texels clamped (they streak to the horizon). */
fn bedOuter(p: vec2f, px: f32) -> vec4f {
  let size = 1.0 / F.bd[12].z;
  var uv = (bedAU(p) - F.bd[12].xy) * F.bd[12].z;
  uv.x = 1.0 - abs(1.0 - 2.0 * fract(uv.x * 0.5));
  let lod = clamp(log2(max(px, 1e-3) * F.bd[12].z * exp2(F.bd[12].w - 1.0)), 0.0, F.bd[12].w - 1.0);
  if (uv.y < 0.0) {      // (far inland: the edge's height from a coarse level, 128 m texels or wider, so no texel streaks inland; the scrub's zone)
    let e = textureSampleLevel(bedOut, skySamp, vec2f(uv.x, 0.0), max(lod, 3.0));
    return vec4f(e.x, 1.0, 0.0, 0.0);
  }
  let raw = textureSampleLevel(bedOut, skySamp, min(uv, vec2f(1.0)), lod);
  let past = (uv.y - 1.0) * size;
  let far = vec4f(max(F.bd[4].w - F.bd[5].w * past, -200.0), 0.0, 0.0, 0.0);
  return mix(raw, far, smoothstep(-0.03 * size, 0.0, past));
}
// The near bed read with a cubic B-spline where the pixel is finer than its texels (4 bilinear reads: Sigg and Hadwiger 2005), so its
// contours, and so the water's edge on it, curve between the texels instead of running straight across each and turning at its edge
fn bCubicW(v: f32) -> vec4f {
  let n = vec4f(1.0, 2.0, 3.0, 4.0) - v;
  let s = n * n * n;
  let x = s.x;
  let y = s.y - 4.0 * s.x;
  let z = s.z - 4.0 * s.y + 6.0 * s.x;
  return vec4f(x, y, z, 6.0 - x - y - z) * (1.0 / 6.0);
}
fn bedCubic(uv: vec2f) -> vec4f {
  let n = vec2f(textureDimensions(bedTex, 0));
  var t = uv * n - 0.5;
  let f = fract(t);
  t -= f;
  let xc = bCubicW(f.x);
  let yc = bCubicW(f.y);
  let c = t.xxyy + vec4f(-0.5, 1.5, -0.5, 1.5);
  let s = vec4f(xc.xz + xc.yw, yc.xz + yc.yw);
  let o = (c + vec4f(xc.yw, yc.yw) / s) / n.xxyy;
  let s0 = textureSampleLevel(bedTex, skySamp, o.xz, 0.0);
  let s1 = textureSampleLevel(bedTex, skySamp, o.yz, 0.0);
  let s2 = textureSampleLevel(bedTex, skySamp, o.xw, 0.0);
  let s3 = textureSampleLevel(bedTex, skySamp, o.yw, 0.0);
  let sx = s.x / (s.x + s.y);
  let sy = s.z / (s.z + s.w);
  return mix(mix(s3, s2, sx), mix(s1, s0, sx), sy);
}
/** The bed at p: elevation (m) and the shares of weed, rock and coral. The near square's fine texture, blended over its last 64 m on every
 *  side into the outer square's coarse one (the same bed: Mike, 2026-11-23, of the straight line where the old square ended: "why not
 *  fractal?"), and that one carried on past its own square. */
fn bedRaw(p: vec2f, px: f32) -> vec4f {
  if (!bedOn()) { return vec4f(-1000.0, 0.0, 0.0, 0.0); }
  let uv = bedUV(p);
  let size = 1.0 / F.bd[1].z;
  let edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)) * size;      // (m inside the near square; negative outside)
  if (edge <= 0.0) { return bedOuter(p, px); }
  let near = textureSampleLevel(bedTex, skySamp, uv, bedLod(px));
  if (edge >= 64.0) { return near; }
  return mix(bedOuter(p, px), near, smoothstep(0.0, 64.0, edge));
}
fn bedY(p: vec2f) -> f32 { return bedRaw(p, 0.0).x; }
/** The bed's height read with the cubic B-spline close up (bedCubic: where the pixel or the vertex spacing px is finer than the near
 *  texture's texels), so the water's edge and the ground's mesh curve between texels; faded to the bilinear read as px grows and over the
 *  near square's last 64 to 128 m, so nothing switches at a line; for everything else (normals, cover) the textures' own filtering. */
fn bedYC(p: vec2f, px: f32) -> f32 {
  let bl = bedRaw(p, px).x;
  let lod = bedLod(px);
  let uv = bedUV(p);
  let edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)) / F.bd[1].z;
  if (lod >= 1.0 || edge <= 64.0 || (u32(F.rip2.w) & 512u) != 0u) { return bl; }      // (?seadbg=512: bilinear only, a cost test)
  return mix(bl, bedCubic(uv).x, (1.0 - lod) * smoothstep(64.0, 128.0, edge));
}
// The cover's patches, made here at the pixel's own scale in each cover's zone (the textures hold the zones), near or far alike: the same
// value noise as fbm (its hash bit for bit), its octaves finer than the footprint replaced by their mean and the threshold's
// edge widened by the spread taken out, so a far pixel gets the share its patches cover, not a sample of one
fn bHashV(i: i32, j: i32, s: i32) -> f32 {
  var h = bitcast<u32>(i) * 374761393u + bitcast<u32>(j) * 668265263u + bitcast<u32>(s) * 2147483647u;
  h = (h ^ (h >> 13u)) * 1274126177u;
  return f32(h ^ (h >> 16u)) / 4294967296.0;
}
fn bVnoise(x: vec2f, s: i32) -> f32 {
  let c = floor(x);
  let f = x - c;
  let i = i32(c.x);
  let j = i32(c.y);
  let u = f * f * (3.0 - 2.0 * f);
  let a = bHashV(i, j, s);
  let b = bHashV(i + 1, j, s);
  let cc = bHashV(i, j + 1, s);
  let d = bHashV(i + 1, j + 1, s);
  return a + (b - a) * u.x + (cc - a) * u.y + (a - b - cc + d) * u.x * u.y;
}
// the covers' density varies at larger scales, fractally (Mike, 2026-11-24: "LOD should try to avoid hard horizons"): octaves of 28 m to
// about 2 km, each kept while the pixel holds it, shift every cover's level, so where the patches have averaged out to their share a far
// pixel still sees thicker and thinner ground, and the pattern has no distance at which it ends. One field for all the covers, worked out
// once a pixel (bedCover), not once a cover
var<private> gCoverShift: f32 = 0.0;
fn coverShift(q: vec2f, px: f32) -> f32 {
  var lv = 0.0;
  var wc = 1.0;
  var sc = 28.4;
  for (var o = 0; o < 7; o++) {
    let keep = clamp(sc / max(px, 1e-4) - 1.0, 0.0, 1.0);
    if (keep > 0.0) { lv += 0.2 * wc * keep * (bVnoise(q / sc, 700 + o * 37) - 0.5); }
    wc *= 0.8;
    sc *= 2.03;
  }
  return lv;
}
fn bPatch(q: vec2f, C: vec4f, px: f32) -> f32 {
  if ((u32(F.rip2.w) & 128u) != 0u) { return smoothstep(C.y - 0.165, C.y + C.w + 0.165, 0.5); }      // (?seadbg=128: the patches' mean share only, a cost test)
  var v = 0.0;
  var w = 0.5;
  var f = 1.0;
  var cut = 0.0;
  for (var o = 0; o < 4; o++) {
    let keep = clamp(C.x / (f * max(px, 1e-4)) - 1.0, 0.0, 1.0);      // (1 for an octave's cell of two footprints or more, 0 at one)
    var n = 0.5;
    if (keep > 0.0) { n = mix(0.5, bVnoise(q / C.x * f, i32(C.z) + o * 101), keep); }
    v += w * n;
    cut += (1.0 - keep * keep) * (0.214 * w) * (0.214 * w);      // (an octave's spread: 0.214 of its weight, for value noise with smoothstep cells)
    w *= 0.5;
    f *= 2.03;
  }
  let b = 1.5 * sqrt(cut) / 0.9375;
  return smoothstep(C.y + gCoverShift - b, C.y + gCoverShift + C.w + b, v / 0.9375);
}
/** The bed's cover at p from its zones (raw: bedRaw's) as has it: (elevation, weed or the dunes' scrub, rock, coral). */
fn bedCover(p: vec2f, raw: vec4f, px: f32) -> vec4f {
  let q = bedAU(p);      // (each patch's noise only where its zone is: most of the bed has one cover or none)
  gCoverShift = select(0.0, coverShift(q, px), raw.y > 0.0 || raw.z > 0.0);
  // (no land or sea as such, Mike 2026-11-24: "land is just seabed that isn't wet": the weed channel's patches are the seagrass's under the
  // sea's level and the dunes' scrub above it, blended across it; rock and coral wherever their zones are)
  let s = smoothstep(-0.4, 0.4, raw.x);
  var rock = select(0.0, raw.z * bPatch(q, F.bd[14], px), raw.z > 0.0);
  let coral = select(0.0, rock * raw.w * bPatch(q, F.bd[16], px), rock > 0.0 && raw.w > 0.0);
  var wp = 0.0;
  if (raw.y > 0.0) { wp = mix(select(0.0, bPatch(q, F.bd[15], px), s < 1.0), select(0.0, bPatch(q, F.bd[17], px), s > 0.0), s); }
  let weed = raw.y * wp * (1.0 - 0.6 * rock);
  rock *= 1.0 - coral;
  return vec4f(raw.x, weed, rock, coral);
}
fn bedMat(p: vec2f, px: f32) -> vec4f { return bedCover(p, bedRaw(p, px), px); }
/** The bed's relief finer than its textures hold ( noise.bed: the octaves the bake left out), down to the pixel's footprint, at
 *  the face's strength: detail with no mean, for the water's edge at the pixel's own scale. */
fn bedFine(p: vec2f, px: f32) -> f32 {
  if (F.bd[13].x <= 0.0) { return 0.0; }
  return F.bd[13].w * nFractal2(bedAU(p), vec4f(F.bd[13].x, 1.0, F.bd[13].y, F.bd[13].z), vec2f(F.bd[7].w, max(px, 0.002)));
}
/** The bed's normal (x east, y up, z -north), from its elevation a few texels apart (wider for a wider footprint). */
fn bedNormal(p: vec2f, px: f32) -> vec3f {
  let e = max(F.bd[2].x, px);
  let off = F.bd[0].zw;
  let ex = vec2f(e, 0.0);
  let ey = vec2f(0.0, e);
  let hx = bedRaw(p + ex, px).x - bedRaw(p - ex, px).x;
  let hy = bedRaw(p + ey, px).x - bedRaw(p - ey, px).x;
  return normalize(vec3f(-hx, 2.0 * e, hy));
}
// The sand as grains ( grains). A pixel sees n = 0.6 px^2 / (pi d^2 / 4) grains (0.6: their packing). Its albedo is the mix's
// mean plus the grains' spread over sqrt(n), drawn per cell of the footprint's size (a power of 2 of the grain, blended between two, so
// the pattern holds still as the eye moves); closer than a grain, each cell is one grain of one mineral. Its glints: each grain shows a few
// crystal facets; a facet mirrors the sun to the eye when its normal is within the sun's half-vector cone (a quarter of the sun's 6.8e-5
// sr), so a pixel expects lambda = facets x n x D(h) x 6.8e-5 / 4 glints, and gets k of them (Poisson, from a hash of the cell and of the
// half-vector's direction: they twinkle as the eye or the sun moves), and its specular is the mean microfacet one times k / lambda. So
// near, rare bright sparks; far, the smooth mean: the same light on average at every distance.
fn grainsIn(px: f32) -> f32 { let d = F.bd[8].x; return max(0.6 * px * px / (0.7854 * d * d), 1e-3); }
fn sandMean() -> vec3f { return F.bd[8].y * F.bd[9].xyz + F.bd[8].z * F.bd[10].xyz + F.bd[8].w * F.bd[11].xyz; }
// an integer hash of a cell (PCG3D, Jarzynski and Olano 2020): the sine hash loses its randomness at the cell numbers a grain's size gives
// (tens of thousands), where it never reached the 1 in 2000 a glint needs
fn pcg3d(vin: vec3u) -> vec3u {
  var v = vin * 1664525u + 1013904223u;
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  v ^= v >> vec3u(16u);
  v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
  return v;
}
fn bHash3(c: vec3f) -> f32 { return f32(pcg3d(bitcast<vec3u>(vec3i(floor(c)))).x) * 2.3283064e-10; }
fn grainAt(c: vec2f, lv: f32) -> vec3f {      // one grain's (or one cell's) albedo: a mineral by the shares, its own shade of it
  let h = bHash3(vec3f(c, lv));
  let a = select(select(F.bd[11].xyz, F.bd[10].xyz, h < F.bd[8].y + F.bd[8].z), F.bd[9].xyz, h < F.bd[8].y);
  return a * (0.8 + 0.4 * bHash3(vec3f(c, lv + 17.0)));
}
fn sandAlbedo(p: vec2f, px: f32) -> vec3f {
  let d = F.bd[8].x;
  let m = sandMean();
  let lv = max(log2(max(px, 1e-6) / d), 0.0);
  let l0 = floor(lv);
  let t = lv - l0;
  // the grains' spread about the mean, over the root of the grains in a cell of each of the two levels
  let s0 = d * exp2(l0);
  let s1 = s0 * 2.0;
  let n0 = 0.6 * s0 * s0 / (0.7854 * d * d);
  let a0 = m + (grainAt(floor(p / s0), l0) - m) / sqrt(max(n0, 1.0));
  let a1 = m + (grainAt(floor(p / s1), l0 + 1.0) - m) / sqrt(max(4.0 * n0, 1.0));
  return mix(a0, a1, t);
}
/** The sand's glints as a factor on the sun's light (the specular radiance over the sun's irradiance): n the surface's normal, V to the
 *  eye, L to the sun; wet 1 under a film of water (no glints). */
fn sandGlint(p: vec2f, px: f32, n: vec3f, V: vec3f, L: vec3f) -> f32 {
  let Hv = normalize(V + L);
  let NdH = max(dot(n, Hv), 0.0);
  let NdV = max(dot(n, V), 0.02);
  let NdL = max(dot(n, L), 0.0);
  if (NdL <= 0.0) { return 0.0; }
  let a2 = F.bd[10].w * F.bd[10].w;
  let dd = NdH * NdH * (a2 - 1.0) + 1.0;
  let D = a2 / (3.14159265 * dd * dd);
  let Fr = F.bd[11].w + (1.0 - F.bd[11].w) * pow(1.0 - max(dot(Hv, V), 0.0), 5.0);
  let mean = Fr * D / (4.0 * NdV);      // (the mean microfacet specular per unit irradiance; the masking left out, within the facets' spread)
  let d = F.bd[8].x;
  let lv = max(log2(max(px, 1e-6) / d), 0.0);
  let c = floor(p / (d * exp2(floor(lv))));
  let hq = floor(Hv.xz * 120.0);      // (the half-vector's cell: a twinkle as it moves about 0.008 rad)
  let lam = F.bd[9].w * grainsIn(px) * D * 6.8e-5 / 4.0;
  // k ~ Poisson(lam): exactly by its cumulative for small lam, a normal approximation for large
  let u = bHash3(vec3f(c.x + hq.x * 7919.0, c.y + hq.y * 104729.0, floor(lv) + 5.0));
  var k = 0.0;
  if (lam < 8.0) {
    var pk = exp(-lam);
    var cum = pk;
    for (var i = 1; i < 24; i++) { if (u <= cum) { break; } pk *= lam / f32(i); cum += pk; k += 1.0; }
  } else {
    let z = sqrt(-2.0 * log(max(bHash3(vec3f(c, 9.0)), 1e-6))) * cos(6.2831853 * u);
    k = max(0.0, lam + sqrt(lam) * z);
  }
  return mean * NdL * k / max(lam, 1e-6);
}
/** The bed's albedo at p (linear): sand (wet, under water or below the wet line), weed, rock and coral by their shares, with detail at
 *  their scales; dry: the sand is dry (above the wet line). */
fn bedAlbedo(p: vec2f, raw: vec4f, px: f32, wet: f32) -> vec3f {      // (wet: 0 dry to 1 wet, the sand darkened by it)
  let sandShare = max(1.0 - raw.y - raw.z - raw.w, 0.0);
  var sand = sandAlbedo(p, px) * (0.9 + 0.2 * bDetail(p, 0.9, px));      // (the grains' mix; a little patchiness at the metre scale)
  sand *= mix(1.0, F.bd[2].w, wet);
  let off = F.bd[0].zw;
  let u = dot(p - F.bd[0].xy, off);
  // the bedforms' troughs darker (the heavy minerals settle there), their crests lighter: by the bedforms' height over their own height
  sand *= 1.0 + 0.10 * gBedFormRel;
  var col = sand * sandShare;      // (each cover's detail only where it is: the review of 2026-11-24)
  if (raw.y > 0.0) { col += raw.y * mix(F.bd[4].xyz, F.bd[7].xyz, smoothstep(-0.4, 0.4, raw.x)) * (0.6 + 0.8 * bDetail(p, 1.6, px)) * (0.7 + 0.6 * bDetail(p * 2.3, 0.35, px)); }
  if (raw.z > 0.0) { col += raw.z * F.bd[5].xyz * (0.55 + 0.9 * bDetail(p, 2.4, px) * bDetail(p * 1.9, 0.5, px)); }
  if (raw.w > 0.0) { col += raw.w * F.bd[6].xyz * (0.6 + 0.8 * bDetail(p, 0.45, px)); }
  return col;
}
// The sand's bedforms (Mike, 2026-11-24: "sand ripples should have fractal noise ... everything should have spectra and noise"; "depth has
// some spectra and noise component ... shallow washboarding ... smoothly give way to a zero effect in deeper water"; the review of the
// same day: wave ripples are absent under sheet flow, the swash is a plane bed with rhomboid backwash marks, dry sand has wind ripples).
// Each a narrow band of a few short-crested components (a wavevector each, the crests' phase wandering and their strength broken up by
// gradient noise), with an analytic slope for the shading; each faded out where its wavelength is finer than about three pixels, to a flat
// bed of the same mean. By zone, from the swell's sea state (F.swl):
// - wave ripples under water: their wavelength 0.62 of the orbital diameter (Wiberg and Harris 1994's orbital ripples), at most 535 d50
//   (anorbital), their height 0.15 of it; present where the waves move the sand but not as sheet flow (the mobility number U^2 / ((s - 1) g
//   d50) fading out from 120 to 200), crests across the waves' way (along the shore here);
// - in the swash (the backwash's lowest reach, about -0.4 of the wet line, up to the wet line): a plane bed with rhomboid marks, two sets at
//   +-40 degrees to the flow, 12 cm, 1.5 mm high;
// - above the wet line: wind ripples, 9 cm, 6 mm high (crests along the shore: an onshore breeze assumed; no wind model in sim2 yet).
// gBedFormRel: the last call's height over its own amplitude (-1 to 1), for the albedo.
var<private> gBedFormRel: f32 = 0.0;
fn bfBand(au: vec2f, lam: f32, eta: f32, angles: vec3f, n: i32, seed: i32, px: f32) -> vec3f {      // (height, its gradient in (a, u))
  let fade = 1.0 - smoothstep(lam / 6.0, lam / 2.5, px);
  if (fade <= 0.0 || eta <= 0.0) { return vec3f(0.0); }
  var h = 0.0;
  var g = vec2f(0.0);
  let kr = 6.2831853 / lam;
  for (var i = 0; i < n; i++) {
    let th = angles[i];
    let kv = kr * (0.93 + 0.07 * f32(i)) * vec2f(sin(th), cos(th));      // (from the u axis, the shore's normal)
    let ph = 2.6 * nNoise2(au / (2.2 * lam), seed + 11 * i);
    let m = clamp(0.55 + 2.0 * nNoise2(au / (3.5 * lam), seed + 11 * i + 5), 0.0, 1.0);      // (short crests: the strength broken up)
    let arg = dot(kv, au) + ph;
    h += m * cos(arg);
    g -= m * sin(arg) * kv;
  }
  let a = eta * fade / sqrt(f32(n));      // (the sum's spread about eta / sqrt 2, whatever the count)
  return vec3f(h * a, g * a);
}
fn bedForms(p: vec2f, z: f32, px: f32) -> vec3f {
  gBedFormRel = 0.0;
  if (px > 0.08 || (u32(F.rip2.w) & 16384u) != 0u) { return vec3f(0.0); }      // (no bedform longer than 20 cm: nothing to show past a 8 cm footprint; ?seadbg=16384: none)
  let au = bedAU(p);
  let wl = F.bd[2].y;
  let zLow = -0.4 * wl;
  var out = vec3f(0.0);
  var amp = 0.0;
  // wave ripples, under water below the swash
  let depth = -z;
  let under = 1.0 - smoothstep(zLow - 0.4, zLow, z);
  if (under > 0.0 && F.swl.x > 0.0 && depth > 0.05) {
    let T = F.swl.y;
    let om2h = 39.478 * depth / (T * T * 9.81);      // (omega^2 h / g)
    let kh = om2h / sqrt(tanh(om2h));      // (Eckart's approximation)
    let ub = 3.14159265 * F.swl.x / (T * sinh(max(kh, 1e-3)));      // (the significant orbital velocity at the bed)
    let d50 = F.bd[8].x;
    let psi = ub * ub / (1.65 * 9.81 * d50);
    let live = under * (1.0 - smoothstep(120.0, 200.0, psi));
    if (live > 0.0) {
      let lam = clamp(0.62 * ub * T / 3.14159265, 0.05, 535.0 * d50);
      let r = bfBand(au, lam, 0.15 * lam * live, vec3f(-0.26, 0.0, 0.26), 3, 701, px);
      out += r;
      amp += 0.15 * lam * live;
    }
  }
  // the swash's rhomboid marks
  let sw = smoothstep(zLow - 0.3, zLow + 0.1, z) * (1.0 - smoothstep(wl - 0.1, wl + 0.1, z));
  if (sw > 0.0) {
    let r = bfBand(au, 0.12, 0.0015 * sw, vec3f(-0.70, 0.70, 0.0), 2, 721, px);
    out += r;
    amp += 0.0015 * sw;
  }
  // wind ripples on the dry sand
  let dry = smoothstep(wl + 0.1, wl + 0.6, z);
  if (dry > 0.0) {
    let r = bfBand(au, 0.09, 0.006 * dry, vec3f(-0.12, 0.05, 0.2), 3, 741, px);
    out += r;
    amp += 0.006 * dry;
  }
  gBedFormRel = select(0.0, out.x / amp, amp > 0.0);
  // (the gradient from the beach's (a, u) to east and north)
  let off = F.bd[0].zw;
  let along = vec2f(off.y, -off.x);
  return vec3f(out.x, out.y * along.x + out.z * off.x, out.y * along.y + out.z * off.y);
}
/** A normal n (x east, y up, z -north) tilted by the sand's bedforms at p (bed height z). */
fn bedFormNormal(n: vec3f, p: vec2f, z: f32, px: f32) -> vec3f {
  let b = bedForms(p, z, px);
  if (b.y == 0.0 && b.z == 0.0) { return n; }
  return normalize(vec3f(n.x / n.y - b.y, 1.0, n.z / n.y + b.z));
}
/** How much of the waves reach water this shallow (m of depth): the height a depth can hold, about 0.78 of it, over the sea's Hs. A stand-in
 *  until the bed's wave solve (beach-break plan, M2); 1 where there is no bed. */
fn bedWaveGain(p: vec2f) -> f32 {
  if (!bedOn()) { return 1.0; }
  let depth = max(-bedY(p), 0.0);
  return smoothstep(0.0, 1.0, clamp(0.78 * depth * F.wave.y, 0.0, 1.0));
}
`,Je=`
@group(0) @binding(11) var swA: texture_2d_array<f32>;
fn swRead(uv: vec2f, l: i32) -> vec4f { return textureSampleLevel(swA, skySamp, uv, l, 0.0); }
fn swellOn() -> bool { return F.sw.w > 0.5; }
fn swellUV(p: vec2f) -> vec3f {
let d = p - F.bd[0].xy;
let off = F.bd[0].zw;
let uv = (vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off)) - F.sw.xy) * F.sw.z;
let e = min(min(uv.x, 1.0 - uv.x), 1.0 - uv.y);
return vec3f(uv, select(smoothstep(0.0, 0.08, e), 0.0, uv.y < 0.0));
}
fn swellAt(p: vec2f) -> vec3f {
if (!swellOn()) { return vec3f(0.0); }
let q = swellUV(p);
if (q.z <= 0.0) { return vec3f(0.0); }
let v = swRead(q.xy, 0);
let off = F.bd[0].zw;
return vec3f(v.x, v.y * vec2f(off.y, -off.x) + v.z * off) * q.z;
}
fn crestSum(x: f32, s: vec4f, b: f32) -> f32 {
let r = exp(-b);
return exp(-b * x) * (s.x + r * (s.y + r * (s.z + r * s.w / (1.0 - r))));
}
fn crestCum(u: f32, b: f32) -> f32 { return (floor(u) + (1.0 - exp(-b * fract(u))) / (1.0 - exp(-b))) / b; }
fn crestBox(x: f32, d: f32, b: f32) -> f32 {
if (d < 1e-3) { return 0.0; }
return (crestCum(x + 0.5 * d, b) - crestCum(x - 0.5 * d, b)) / d - exp(-b * x) / (1.0 - exp(-b));
}
fn foamPatches(p: vec2f, cF: f32, px: f32, sc: f32, seed: f32, sp: f32) -> f32 {
let m = clamp(1.1 * pow(max(cF, 1e-8), sp), 0.0, 1.0);
if (m >= 0.999) { return cF; }
let kw = clamp(${Be.warpScale} * sc / (2.0 * max(px, 1e-4)) - 1.0, 0.0, 1.0);
let nw = nNoise2d(p / (${Be.warpScale} * sc), i32(seed) + 7);
let w = ${Be.warp} * sc * kw * vec2f(-nw.z, nw.y) / 0.626;
let pg = nFractal2(p + w, vec4f(sc, 1.0, ${Be.hurst}, seed), vec2f(0.0, max(px, ${Be.fine} * sc)));
let res = 1.0 - pow(clamp(2.0 * px / sc, 0.0, 1.0), 1.2);
let z = log((1.0 - m) / max(m, 1e-4)) / 1.702;
let M = mix(m, smoothstep(z - 0.25, z + 0.25, pg), res);
return cF * M / max(m, 1e-4);
}
fn surfPhase(p: vec2f, B: vec4f, px: f32, d: f32) -> f32 {
let x0 = surfPhase0(B);
let wr = (1.0 - smoothstep(0.04, 0.25, min(x0, 1.0 - x0))) * (1.0 - smoothstep(0.25, 1.0, d));
var rag = 0.0;
if (wr > 0.0) { rag = wr * ${U.rag} * clamp(nFractal2(p, vec4f(${U.ragScale}, 1.0, 0.55, 697.0), vec2f(0.0, max(px, ${U.ragFine}))), -2.5, 2.5); }
return fract(x0 + rag);
}
fn surfPhase0(B: vec4f) -> f32 { return fract(-atan2(B.z, B.y) / 6.2831853 + ${U.lead}); }
fn surfJitter(al: f32, tc: f32, px: f32) -> f32 {
let ja = ${U.jitter} * clamp(${U.jitterScale}.0 / max(2.0 * px, 1e-3) - 1.0, 0.0, 1.0);
return 1.0 + ja * nNoise2(vec2f(al, tc * ${U.jitterScale}.0) / ${U.jitterScale}.0, 661) / ${V};
}
fn leanG(y: f32) -> vec2f {
let y0 = ${W.leanWin[0]};
let y1 = ${W.leanWin[1]};
let r = ${W.leanRamp};
let beta = y1 - y0 - r;
var b = 0.0;
var I = 0.0;
if (y > y0) {
if (y < y0 + r) { let t = (y - y0) / r; b = t * t * (3.0 - 2.0 * t); I = r * (t * t * t - 0.5 * t * t * t * t); }
else if (y < y1 - r) { b = 1.0; I = 0.5 * r + (y - y0 - r); }
else if (y < y1) { let t = (y - y1 + r) / r; b = 1.0 - t * t * (3.0 - 2.0 * t); I = 0.5 * r + (y1 - y0 - 2.0 * r) + r * (t - t * t * t + 0.5 * t * t * t * t); }
else { I = beta; }
}
return vec2f(I - beta * (y + 0.5), b - beta);
}
fn ssd(e0: f32, e1: f32, x: f32) -> vec2f {
let t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
return vec2f(t * t * (3.0 - 2.0 * t), 6.0 * t * (1.0 - t) / (e1 - e0));
}
struct BreakG { dh: f32, d: vec2f, g: vec2f, c: vec2f }
fn breakGeom(p: vec2f, cell: f32) -> BreakG {
var o = BreakG(0.0, vec2f(0.0), vec2f(0.0), vec2f(0.0));
if (!swellOn() || (u32(F.rip2.w) & 524288u) != 0u) { return o; }
let q = swellUV(p);
if (q.z <= 0.0) { return o; }
let B = swRead(q.xy, 3);
let sea = surfSea(swRead(q.xy, 1).w);
if (B.w < 0.003 || sea <= 0.0) { return o; }
let P = swRead(q.xy, 4);
let lam = 6.2831853 / max(P.w, 0.05);
let wc = cell / lam;
if (wc > 0.25 || dot(B.yz, B.yz) < 1e-10) { return o; }
let x0 = surfPhase0(B);
let y0 = fract(x0 + 0.5) - 0.5;
let Tm = 6.2831853 / max(F.wash.x, 0.05);
let T = F.cam.w / Tm;
let al = bedAU(p).x;
let ald = vec2f(F.bd[0].w, -F.bd[0].z);
let thr = surfThr(swRead(q.xy, 0).w, B.w);
let gate = smoothstep(0.003, 0.01, B.w) * sea * q.z;
let r0 = select(mix(B.x, P.x, y0), B.x, y0 < 0.0);
let j0 = surfJitter(al, T - y0, cell);
let st = smoothstep(0.55, 1.0, r0) * (1.0 - (1.0 - ${W.leanBore}) * smoothstep(0.85, 1.15, r0 * j0)) * surfSize(r0 * thr) * gate;
var a = ${W.lean} * st * (1.0 - smoothstep(0.05, 0.1, wc));
let inShape = y0 >= -0.25 && y0 <= 0.42;
if (a <= 0.0 && !inShape) { return o; }
let ph = atan2(B.z, B.y);
let es = clamp(0.25 * lam, 0.25, 1.0);
let Be = swRead(swellUV(p + vec2f(es, 0.0)).xy, 3);
let Bn = swRead(swellUV(p + vec2f(0.0, es)).xy, 3);
let dph = vec2f(atan2(Be.z, Be.y), atan2(Bn.z, Bn.y)) - ph;
var kx = -(dph - 6.2831853 * round(dph / 6.2831853)) / (6.2831853 * es);
var kl = length(kx) * lam;
if (!(kl >= 0.0 && kl < 10.0)) { kl = 0.0; kx = vec2f(0.0); }
let kw = smoothstep(0.35, 0.6, kl) * (1.0 - smoothstep(1.8, 2.3, kl));
kx = mix(F.bd[0].zw / lam, kx, kw);
kl = length(kx) * lam;
let kn = normalize(kx);
if (a > 0.0) {
a = min(a, 0.6 / (kl * ${(1-(W.leanWin[1]-W.leanWin[0]-W.leanRamp)).toFixed(6)}));
let G = leanG(y0);
o.d = -kn * (a * lam * G.x);
let mJ = 1.0 / (1.0 - a * kl * G.y) - 1.0;
o.c = kn * sqrt(max(mJ, 0.0));
}
if (!inShape) { return o; }
let wrm = min(x0, 1.0 - x0);
let wrs = ssd(0.04, 0.25, wrm);
let wd = 1.0 - smoothstep(0.25, 1.0, wc);
let wr = (1.0 - wrs.x) * wd;
var y = y0;
var gy = kx;
if (wr > 0.0) {
let n = nFractal2d(p, vec4f(${U.ragScale}, 1.0, 0.55, 697.0), vec2f(0.0, max(2.0 * cell, ${W.ragGeo})));
let nc = clamp(n.x, -2.5, 2.5);
let gwr = -wrs.y * wd * select(-1.0, 1.0, x0 < 0.5) * kx;
y += wr * ${U.rag} * nc;
gy += ${U.rag} * (wr * n.yz * select(0.0, 1.0, abs(n.x) < 2.5) + nc * gwr);
}
let hg = breakShape(y, gy, al, ald, T, B, P, lam, thr, gate, cell);
o.dh = hg.x;
o.g = hg.yz;
return o;
}
fn breakShape(y: f32, gy: vec2f, al: f32, ald: vec2f, T: f32, B: vec4f, P: vec4f, lam: f32, thr: f32, gate: f32, cell: f32) -> vec3f {
if (y < -0.2 || y > 0.33) { return vec3f(0.0); }
let tc = T - y;
let gtc = -gy;
let jS = ${U.jitterScale}.0;
let ja = ${U.jitter} * clamp(jS / max(2.0 * cell, 1e-3) - 1.0, 0.0, 1.0);
let nj = nNoise2d(vec2f(al / jS, tc), 661);
let jr = 1.0 + ja * nj.x / ${V};
let gjr = (ja / ${V}) * (nj.y / jS * ald + nj.z * gtc);
let xb = y * lam;
let gxb = lam * gy;
if (y < 0.0) {
let hn = B.x * thr;
let rc = B.x * jr;
let c1 = ssd(0.9, 1.1, rc);
let c2 = ssd(1.3, ${W.crashEnd}, rc);
let sz = surfSize(hn) * gate;
let cs = c1.x * (1.0 - c2.x) * sz;
if (cs <= 0.0 || hn <= 0.0) { return vec3f(0.0); }
let gcs = (c1.y * (1.0 - c2.x) - c1.x * c2.y) * sz * B.x * gjr;
let A = ${W.crashAhead} * hn;
let t = -xb / A;
let wf = cell / A;
let fd = 1.0 - smoothstep(0.3, 0.8, wf);
let u1 = ssd(0.0, 0.4 + wf, t);
let u2 = ssd(0.45, 1.0 + wf, t);
let sh = u1.x * (1.0 - u2.x);
let dsh = (u1.y * (1.0 - u2.x) - u1.x * u2.y) / A;
let K = ${W.splash} * hn * fd;
return vec3f(K * cs * sh, K * (sh * gcs - cs * dsh * gxb));
}
let r = mix(B.x, P.x, y);
let gr = (P.x - B.x) * gy;
let hc = r * thr;
if (hc <= 0.01) { return vec3f(0.0); }
let ghc = thr * gr;
let sS = ssd(0.85, 1.15, r * jr);
let sZ = ssd(${U.sizeH[0]}, ${U.sizeH[1]}, hc);
let s = sS.x * sZ.x * gate;
if (s <= 0.0) { return vec3f(0.0); }
let gs = gate * (sS.y * sZ.x * (jr * gr + r * gjr) + sS.x * sZ.y * ghc);
let Lr = min(${W.lengthH} * hc, 0.3 * lam / (1.0 + cell / (${W.lengthH} * hc)));
let nv = nNoise2d(vec2f(al / ${W.bulkScale}, tc), 719);
var v = 1.0 + ${W.bulkVar} * nv.x / ${V};
var gv = (${W.bulkVar} / ${V}) * (nv.y / ${W.bulkScale} * ald + nv.z * gtc);
if (v < 0.2) { v = 0.2; gv = vec2f(0.0); }
let xi = xb / Lr;
let gxi = gxb / Lr - select(vec2f(0.0), xi * ghc / hc, Lr >= 0.999 * ${W.lengthH} * hc);
let wf = cell / Lr;
let pk = max(${W.peak}, 1.5 * wf);
let b1 = ssd(0.0, pk, xi);
let b2 = ssd(pk, 1.0 + wf, xi);
let bf = 1.0 - smoothstep(0.3, 0.8, wf);
let sh = select(0.0, b1.x * (1.0 - b2.x) * bf, bf > 0.0);
let dsh = select(0.0, (b1.y * (1.0 - b2.x) - b1.x * b2.y) * bf, bf > 0.0);
let K = ${2*W.area*W.voids/W.lengthH};
var h = K * hc * v * sh;
var g = K * (sh * (v * ghc + hc * gv) + hc * v * dsh * gxi);
let E = min(2.0 * Lr, 0.3 * lam);
let top = ${W.twistScale} * 0.5 * max(F.swl.x, 0.1);
let k1 = ssd(0.0, 0.3 * Lr, xb);
let k2 = ssd(0.4 * E, E, xb);
let kf = 1.0 - smoothstep(0.25 * top, 0.5 * top, cell);
let k = k1.x * (1.0 - k2.x) * kf;
if (k > 0.0) {
let gk = (k1.y * (1.0 - k2.x) - k1.x * k2.y) * kf * gxb;
let roll = ${W.twistRoll} * F.cam.w;
let qc = vec2f(al + ${W.twistDrift} * tc, xb + roll - 997.0 * floor(roll / 997.0));
let z = nFractal2d(qc, vec4f(top, 1.0, 0.6, 733.0), vec2f(0.0, max(${W.twistFine} * top, 2.0 * cell)));
let gz = z.y * (ald + ${W.twistDrift} * gtc) + z.z * gxb;
let sq = sqrt(z.x * z.x + 0.25);
let bl = 0.5 * (z.x + sq);
let dbl = 0.5 * (1.0 + z.x / sq);
let V = ${W.twistV};
h += V * hc * k * bl;
g += V * (bl * (k * ghc + hc * gk) + hc * k * dbl * gz);
}
return vec3f(s * h, s * g + h * gs);
}
fn crashShare(rn: f32, hn: f32) -> f32 {
return smoothstep(0.9, 1.1, rn) * (1.0 - smoothstep(1.3, ${W.crashEnd}, rn)) * surfSize(hn);
}
fn rollerChurn(al: f32, xb: f32, px: f32, c: f32) -> vec3f {
let ph = F.cam.w / ${W.churnT};
let k = floor(ph);
let f = ph - k;
let v = ${W.spin} * c * ${W.churnT};
let band = vec2f(0.0, max(3.0 * px, 0.01));
let kk = k - 4096.0 * floor(k / 4096.0);
let fb = fract(f + 0.5);
let kb = select(kk, kk + 1.0 - select(0.0, 4096.0, kk >= 4095.0), f >= 0.5);
let oa = vec2f(37.1 * fract(kk * 0.6180339), 53.3 * fract(kk * 0.4142136));
let ob = vec2f(37.1 * fract((kb + 0.5) * 0.6180339), 53.3 * fract((kb + 0.5) * 0.4142136));
let FL = vec4f(${W.lump}, 1.0, 0.8, 709.0);
let na = nFractal2d(vec2f(al, xb + v * f) + oa, FL, band);
let nb = nFractal2d(vec2f(al, xb + v * fb) + ob, FL, band);
let wa = 1.0 - abs(2.0 * f - 1.0);
let wb = 1.0 - wa;
let m = (wa * na + wb * nb) * (0.35 / sqrt(wa * wa + wb * wb));
let ch = 0.5 + m.x;
return vec3f(clamp(ch, 0.0, 1.0), m.yz * select(0.0, 1.0, ch > 0.0 && ch < 1.0));
}
fn rollerPix(x: f32, s0: f32, d: f32, B: vec4f, kph: f32, al: f32, Tm: f32, px: f32, crash: vec2f) -> mat2x4f {
let fd = 1.0 - smoothstep(0.06, 0.2, d);
let s = s0 * fd;
let sc = crash.x * fd;
if (max(s, sc) <= 0.0) { return mat2x4f(vec4f(0.0, 0.0, 0.5, x), vec4f(0.0)); }
let lam = 6.2831853 / max(kph, 0.05);
let off = F.bd[0].zw;
let xs = fract(surfPhase0(B) + 0.5) - 0.5;
let ca = al + 7.0 * (fract((F.cam.w / Tm - xs) / 64.0) * 64.0);
let ch = rollerChurn(ca, xs * lam, px, lam / Tm);
let kL = clamp((${W.lump} / (3.0 * max(px, 1e-4)) - 1.0) / 3.0, 0.0, 1.0);
let gr = kL * ${W.relief} * (ch.y * vec2f(off.y, -off.x) + ch.z * off);
return mat2x4f(vec4f(0.0, max(s, sc), ch.x, x), vec4f(gr, 0.0, 0.0));
}
fn surfThr(hs: f32, qb: f32) -> f32 { return max(0.7071 * hs * sqrt(-log(clamp(qb, 1e-4, ${U.qbMax}))), 1e-3); }
fn surfSea(sea: f32) -> f32 { return smoothstep(0.0, 0.35, sea); }
fn surfSize(h: f32) -> f32 { return smoothstep(${U.sizeH[0]}, ${U.sizeH[1]}, h); }
fn rollerWhite(r: vec4f, ws: f32, aL: f32, px: f32) -> f32 {
if (ws <= 0.002) { return 0.0; }
if (r.y <= 0.0) { return ws; }
let kL = clamp((${W.lump} / (3.0 * max(px, 1e-4)) - 1.0) / 3.0, 0.0, 1.0);
let wc = clamp(ws, 0.001, 0.999);
let t = 0.5 + 0.195 * log((1.0 - wc) / wc);
let a = max(aL, 0.02);
let toe = smoothstep(0.0, 0.006, r.w - ${W.toeRag} * (0.6 - r.z));
return mix(ws, smoothstep(t - a, t + a, r.z), kL) * mix(1.0, toe, kL);
}
var<private> gSurfDbg: vec4f = vec4f(0.0, 0.0, 0.0, 1.0);
struct Surf { lace: f32, ws: f32, r: vec4f, g: vec2f }
fn surfAt(p: vec2f, px: f32) -> Surf {
var o = Surf(0.0, 0.0, vec4f(0.0), vec2f(0.0));
if (!swellOn()) { return o; }
let q = swellUV(p);
if (q.z <= 0.0) { return o; }
let B = swRead(q.xy, 3);
let sea = surfSea(swRead(q.xy, 1).w);
if (B.w < 0.003 || sea <= 0.0 || dot(B.yz, B.yz) < 1e-10) { return o; }
let hs = swRead(q.xy, 0).w;
let P = swRead(q.xy, 4);
let om = F.wash.x;
let Tm = 6.2831853 / max(om, 0.05);
let d = min(P.w * px / 6.2831853, 4.0);
let x = surfPhase(p, B, px, d);
let gate = smoothstep(0.003, 0.01, B.w);
let toMean = smoothstep(0.25, 1.0, d);
var jit = vec3f(1.0);
let al = bedAU(p).x;
if (${U.jitter} > 0.0 && toMean < 1.0) {
let tc = F.cam.w / Tm - x;
for (var n = 0; n < 3; n++) {
jit[n] = surfJitter(al, tc - f32(n), px);
}
}
let thr = surfThr(hs, B.w);
let r3 = mix(vec3f(B.x, P.x, P.y), P.xyz, x);
let sz = smoothstep(vec3f(${U.sizeH[0]}), vec3f(${U.sizeH[1]}), r3 * thr);
let qm = B.w * surfSize(max(0.7071 * hs, thr));
var S3 = smoothstep(vec3f(0.85), vec3f(1.15), r3 * jit) * sz * gate;
let dbg = u32(F.rip2.w);
var crash = vec2f(0.0, B.x * thr);
let ya = 1.0 - x;
let aC = ${W.crashAhead} * crash.y * P.w / 6.2831853;
if (ya < aC && toMean < 1.0) { crash.x = crashShare(B.x * surfJitter(al, F.cam.w / Tm - x + 1.0, px), crash.y) * gate * sea * q.z * (1.0 - toMean); }
if (d < 0.2 && (dbg & 524288u) == 0u && (x < 0.3 || crash.x > 0.0)) {
let rp = rollerPix(x, S3.x * sea * q.z, d, B, P.w, al, Tm, px, crash);
o.r = rp[0];
o.g = rp[1].xy;
}
if ((dbg & 1024u) != 0u) { return o; }
S3.z = mix(S3.z, qm, x);
let S = vec4f(mix(S3, vec3f(qm), toMean), qm);
let up = -F.bd[0].zw;
let dr = ${U.drift} * F.cam.w;
let pl = p - up * (dr - 4096.0 * floor(dr / 4096.0));
let lv = ${Be.lifeVar} * clamp(${U.patch}.0 / max(2.0 * px, 1e-3) - 1.0, 0.0, 1.0);
let life = ${U.life}.0 * clamp(pow(max(hs, 0.01) / 0.3, 0.7), 1.0, 2.5) * exp(lv * nNoise2(pl / (0.7 * ${U.patch}.0), 677) / ${V} - 0.5 * lv * lv);
let bR = clamp(6.2831853 / max(P.w, 0.05) / (${U.trailH} * max(0.7071 * hs, thr)), ${U.rollerB}, 25.0);
let bL = Tm / life;
let b2 = Tm * (1.0 / ${U.onset} + 1.0 / life);
let W = clamp(crestSum(x, S, bR) + qm * crestBox(x, d, bR), 0.0, 1.0);
let Fm = max(crestSum(x, S, bL) - crestSum(x, S, b2) + qm * (crestBox(x, d, bL) - crestBox(x, d, b2)), 0.0);
let cF = 1.0 - exp(-${U.cover} * Fm);
if (max(W, cF) * sea < 0.002) { return o; }
let xr = max(${W.lengthH} * r3.x * thr * P.w / 6.2831853, 0.004);
let Wc = crash.x * (1.0 - smoothstep(0.6 * aC, aC, ya)) / max(sea * q.z, 1e-3);
let Ws = min(max(S.x * exp(-x * bR) * (1.0 - smoothstep(0.5 * xr, 1.3 * xr, x)) * (1.0 - toMean), Wc), 1.0);
let cL = foamPatches(pl, cF, px, ${U.patch}.0, 673.0, ${Be.shareP});
let c = 1.0 - (1.0 - max(W - Ws, 0.0) / max(1.0 - Ws, 0.05)) * (1.0 - min(cL, 0.97));
if ((u32(F.rip2.w) & 32768u) != 0u) { gSurfDbg = vec4f(W, ${U.cover} * Fm, S.x, 1.0); }
o.lace = washLace(pl, c * sea, px) * q.z;
o.ws = Ws * sea * q.z;
return o;
}
fn swellEdge(p: vec2f) -> f32 {
if (!swellOn()) { return 0.0; }
let q = swellUV(p);
if (q.z <= 0.0) { return 0.0; }
return swRead(q.xy, 1).z * q.z;
}
const SWASH_FINE = vec4f(3.0, 0.015, 0.7, 71.0);
const SWASH_PERIOD = 8.0;
const EDGE_BIAS = 0.06;
fn swashFine(p: vec2f, level: f32, px: f32) -> f32 {
let au = bedAU(p);
let q = vec2f(au.x, au.y + level / max(F.bd[6].w, 0.01));
let s = F.cam.w / SWASH_PERIOD;
let k = floor(s);
let f = s - k;
let kk = k - 65536.0 * floor(k / 65536.0);
let band = vec2f(0.0, max(px, 0.002));
let n0 = nFractal2(q, vec4f(SWASH_FINE.xyz, SWASH_FINE.w + kk), band);
let n1 = nFractal2(q, vec4f(SWASH_FINE.xyz, SWASH_FINE.w + kk + 1.0), band);
return (n0 * (1.0 - f) + n1 * f) / sqrt((1.0 - f) * (1.0 - f) + f * f);
}
fn swellSlope(p: vec2f) -> vec2f {
if (!swellOn()) { return vec2f(0.0); }
let q = swellUV(p);
if (q.z <= 0.0) { return vec2f(0.0); }
let v = swRead(q.xy, 1);
let off = F.bd[0].zw;
return (v.x * vec2f(off.y, -off.x) + v.y * off) * q.z;
}
fn washLace(p: vec2f, c: f32, px: f32) -> f32 {
if (c <= 0.002) { return c; }
let kp = clamp(${K.patch} / max(px, 1e-4) - 1.0, 0.0, 1.0);
let d = clamp(1.0 + ${K.patchAmp} * kp * nNoise2(p / ${K.patch}, 631) / ${V}, 0.3, 1.8);
let ce = 1.0 - pow(1.0 - min(c, 0.999), d);
if (c >= 0.96) { return ce; }
let fadeC = 1.0 - smoothstep(0.85, 0.96, c);
var miss = 1.0;
let SC = array<vec2f, ${K.scales.length}>(${K.scales.map(([e,t])=>`vec2f(${e.toFixed(6)}, ${t.toFixed(6)})`).join(`, `)});
  for (var o = 0; o < ${K.scales.length}; o++) {
    let s = ${K.cell} * SC[o].x;
    let co = 1.0 - pow(1.0 - ce, SC[o].y);
    let k = fadeC * clamp((s / max(px, 1e-4) - 3.0) / 2.0, 0.0, 1.0);      // (drawn where its cells are LACE_PX pixels across or more)
    var m = co;
    if (k > 0.0) {
      let sd = 10 * o;
      let wp = p / s + ${K.warp} * k * vec2f(nNoise2(p / (1.3 * s), 621 + sd), nNoise2(p / (1.3 * s), 623 + sd));
      let a = max(px / s, 0.03);
      let ti = nLaceTAA(min(0.98, co * ${K.gain}), a);
      let t = max(0.0, ti.x * (1.0 + ${K.width} * k * nNoise2(p / (0.6 * s), 625 + sd) / ${V}));
      let line = (1.0 - smoothstep(t - a, t + a, nCellEdge2(wp, 613 + sd))) * ti.y;
      m = mix(co, line, k);
    }
    miss *= 1.0 - m;
  }
  return 1.0 - miss;
}
/** The shore wash at p over a bed at height z, the water's level here 'level' (with the swash front's fine detail): x the foam's share on
 *  the water (the bore's front and the lace behind it), y the lace stranded on the drained sand. The same model as the surf's
 *  (surfAt): each uprush is a micro-spilling bore whose front is white and which leaves a
 *  lace, and the lace here is the sum over the uprushes that reached this point. The swash here is slow + Re(E e^(i psi)) (src/gpu/swell-
 *  webgpu.js: the analytic signal of the bins' swash), so as a cycle chi runs from its lowest reach (0) to its highest (pi) the point is wet
 *  from chi_w = acos((slow - z) / E) to 2 pi - chi_w. The last three uprushes each with its own size (the swash one, two and three mean
 *  periods ago, exact from the bins, read between by the cycle's phase as the surf's crests are), so a point a big uprush reached still
 *  has its lace when the next, smaller one falls short; each one's lace grows in from when it arrived and thins over the water's life, and
 *  once its water has drained, over the stranded life from then. A pure function of place and time: no history is kept. */
var<private> gWashDbg: vec4f = vec4f(0.0);
fn washAt(p: vec2f, z: f32, level: f32, fine: f32, px: f32) -> vec2f {      // (fine: the swash front's detail at the pixel's scale, added to the drawn level, so the wash is timed from the same front)
  if ((u32(F.rip2.w) & 4096u) != 0u || F.wash.x <= 0.0) { return vec2f(0.0); }
  let q = swellUV(p);
  if (q.z <= 0.0) { return vec2f(0.0); }
  let T = swRead(q.xy, 2);
  let E = length(T.xy);
  if (T.w <= 0.0 || E < 0.01) { return vec2f(0.0); }
  let Ep = swRead(q.xy, 5).xyz;
  let lv = T.z + fine - z;      // (the slow level over the bed here)
  let c0 = lv / E;
  let om = F.wash.x;
  if (c0 <= -1.0 && lv <= -max(Ep.x, max(Ep.y, Ep.z))) { return vec2f(0.0); }      // (above every reach, now and in the last three cycles)
  if (c0 >= 2.9) { return vec2f(0.0); }      // (so far below the lowest reach that no reach shows)
  let chi = fract((atan2(-T.y, T.x) + 3.14159265) / 6.2831853) * 6.2831853;
  // where the lace reaches seaward varies fractally (Mike, 2026-11-24: "lace only seems to get generated where floor elevation=0 which is a
  // smooth and hard function ... elevation having a fractal noise component?"): each wave's run-down and the bores' foam wander along the
  // shore, so the lace fades out not at the backwash's lowest reach (a smooth contour) but past it at a level shifted by a fractal of place,
  // re-formed each swash cycle and resolved to the pixel's footprint; the bore's front, timed from the unshifted level, stays with the
  // drawn edge
  let cyc = F.cam.w * om / 6.2831853;
  let kc = floor(cyc);
  let fc = cyc - kc;
  let kk = kc - 65536.0 * floor(kc / 65536.0);
  let auq = bedAU(p);
  let band = vec2f(0.0, max(px, 0.3));      // (finer levels move the fade by less than can be seen)
  let r0 = nFractal2(auq, vec4f(9.0, 1.0, 0.7, 643.0 + kk), band);
  let r1 = nFractal2(auq, vec4f(9.0, 1.0, 0.7, 644.0 + kk), band);
  let reach = (r0 * (1.0 - fc) + r1 * fc) / sqrt((1.0 - fc) * (1.0 - fc) + fc * fc);
  let fade = (1.0 - smoothstep(0.25, 1.35, c0 + 0.45 * reach)) * smoothstep(0.0, 0.5, T.w);
  if (fade <= 0.0) { return vec2f(0.0); }      // (past where the lace fades out)
  if ((u32(F.rip2.w) & 8192u) != 0u) { gWashDbg = vec4f(0.5 + 0.5 * c0, chi / 6.2831853, T.w, 1.0); }
  // the uprushes: this cycle's (n = 0, once it has arrived) and the last two, each's size read between the stored lags by the phase (so
  // where chi wraps, this cycle's becomes the last one's with the same size), whether it reached here, when it arrived (cycles ago)
  let x = chi / 6.2831853;
  let Es = vec3f(mix(E, Ep.x, x), mix(Ep.x, Ep.y, x), mix(Ep.y, Ep.z, x));      // (each cycle's size at its start: continuous where chi wraps; the drawn edge's E differs from this cycle's by the envelope's change within a cycle)
  let cn = clamp(vec3f(lv) / max(Es, vec3f(0.01)), vec3f(-1.0), vec3f(1.0));
  let reached = smoothstep(vec3f(-1.0), vec3f(-0.9), vec3f(lv) / max(Es, vec3f(0.01)));
  let chiWn = acos(cn);      // (always wet where c >= 1: the lace there is the bores', aged from the cycle's start)
  let chiDn = vec3f(6.2831853) - chiWn;      // (and dry again from 2 pi - chi_w)
  // each uprush's lace: on the water it grows in over onset and thins over the water's life; once that water has drained it is left on the
  // sand and thins over its own, shorter life from then on (a later uprush overruns it, still thinning). Not the water's life from the
  // arrival on the sand too: that kept the last uprushes' lace on the sand right up to the next one's front, drawn as lace running ahead
  // of the water (Mike, 2026-11-24, of screenshot 9.32.17: "this wave is moving up the beach and the lace is preceding it")
  let ph = vec3f(chi, chi + 6.2831853, chi + 12.5663706);
  let ageA = max(ph - chiWn, vec3f(0.0)) / om;
  let aDr = (chiDn - chiWn) / om;
  let ageD = max(ph - chiDn, vec3f(0.0)) / om;
  let gWet = (1.0 - exp(-ageA / ${G.onset})) * exp(-ageA / F.wash.z);
  // (what is left on the sand: strandedKeep of it near the top of the run-up, where the water stops, less lower down, where the backwash
  // runs fast and takes its foam with it (the lower swash is dry only briefly, and lace left there lay just ahead of the next front); the
  // rest shed over 0.4 s, so nothing steps as the point drains; and where the point barely drains (c near 1) the lace stays the water's,
  // so the band that never dries does not step where chi wraps: the review of 2026-11-24)
  let keepE = ${G.strandedKeep} * smoothstep(vec3f(0.2 * 3.14159265), vec3f(0.8 * 3.14159265), chiWn);
  let gDr = (1.0 - exp(-aDr / ${G.onset})) * exp(-aDr / F.wash.z) * (keepE + (1.0 - keepE) * exp(-ageD / 0.4)) * exp(-ageD / F.wash.w);
  let drains = smoothstep(vec3f(0.98), vec3f(0.9), cn);
  let arrived = vec3f(select(0.0, 1.0, chi > chiWn.x), 1.0, 1.0);
  let gL = select(mix(gWet, gDr, drains), gWet, ph < chiDn) * reached * arrived;
  let g = gL.x + gL.y + gL.z;
  let chiD = 6.2831853 - chiWn.x;
  let up = -F.bd[0].zw;      // (up the beach)
  let beta = max(F.bd[6].w, 0.02);
  if (chi > chiWn.x && chi < chiD) {
    // on the water: the bore's front (the newly wet thin sheet, coming on and fading with its age) and the lace, carried up and back with
    // the sheet (a quarter of the swash's own excursion: the same over a few metres, so the lace moves without stretching)
    let age = ageA.x;
    let front = (1.0 - smoothstep(0.3 * F.wash.y, F.wash.y, level - z)) * (1.0 - exp(-age / ${G.frontOn})) * exp(-age / ${G.frontLife}) * ${G.frontPeak};
    let pl = p - up * clamp(0.25 * T.x / beta, -4.0, 4.0);
    let lace = washLace(pl, 0.55 * min(g, 1.6) * fade, px);
    return vec2f(max(front * fade * (0.75 + 0.25 * nNoise2(p / 0.4, 619)), lace) * q.z, 0.0);      // (the front faded with the rest: the second review)
  }
  // left on the sand after the water has been and gone, where the sheet left it (its carry as the water left, so it does not jump; drawn
  // out a third along the backwash, as stranded foam is)
  let pd = p - up * clamp(0.25 * (z - T.z - fine) / beta, -4.0, 4.0);
  return vec2f(0.0, washLace(pd, 0.55 * min(g, 1.6) * fade, px) * q.z);
}
`,Ye=.8,Xe=12,Ze=6,Qe=3,$e=2,et=.35,tt=68,nt=tt+64,rt=nt+128,it=rt+80,at=it+72,ot=at+4,st=ot+4,ct=st+4,lt=ct+8,ut=typeof location<`u`&&new URLSearchParams(location.search).get(`swcull`)===`0`,dt={rollerB:12,cover:.12,onset:.3,patchM:i.patchM,patchFrac:i.patchFrac},ft={OFF:0,MAIN:1,TAIL:2},pt=`
/** The bed above the water as the ground pass draws it (its albedo, dry or wet, its grains' glints, the sun and the sky's light, the air
 *  between), before present(): p the point (east, north), world its place, px the pixel's footprint. The water's shader uses it too, where
 *  the edge at the pixel's own scale leaves the bed dry. */
fn groundShade(p: vec2f, world: vec3f, px: f32) -> vec3f {
  let raw = bedMat(p, px);
  let eye = vec3f(F.cam.x, F.cam.y, -F.cam.z);
  let toEye = eye - world;
  let dist = length(toEye);
  let n = bedFormNormal(bedNormal(p, px), p, raw.x, px);      // (with the sand's bedforms: ripples, swash marks, wind ripples; first, so the albedo has their height)
  let alb = bedAlbedo(p, raw, px, 1.0 - smoothstep(F.bd[2].y - 0.06, F.bd[2].y + 0.06, raw.x));      // (wet below the wet line, faded across it)
  let sunVis = F.lk[6].z * F.lk[6].w;
  // the sand's glints where it is dry and sand ( sandGlint): its crystal facets mirroring the sun
  let sandShare = max(1.0 - raw.y - raw.z - raw.w, 0.0) * smoothstep(F.bd[2].y - 0.06, F.bd[2].y + 0.06, raw.x);      // (dry sand's glints)
  let glint = sandGlint(p, px, n, toEye / dist, F.sun.xyz) * sandShare;
  let lin = alb * (F.lk[2].xyz * max(dot(n, F.sun.xyz), 0.0) * sunVis / 3.14159265 + F.lk[12].xyz) + F.lk[2].xyz * glint * sunVis;
  let col = toneEnc(lin);
  return mix(col, skyMap(normalize(vec3f(-toEye.x / dist, 0.012, -toEye.z / dist))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0)));
}
`,mt=`
struct Frame {
  viewProj: mat4x4f,
  cam: vec4f,          // eye east, height, north; time
  sun: vec4f,          // direction to the sun (x east, y up, z -north); its light
  screen: vec4f,       // width, height, 1/width, 1/height
  sea: vec4f,          // sets, chop, exposure, the footprint's scale (1; in the temporal mode half the screen's pixel over the drawn one: the detail an octave finer than the screen's, averaged over the jittered frames)
  camR: vec4f,         // the view's right * tan(half the horizontal field)
  camU: vec4f,         // up * tan(half the vertical field)
  camF: vec4f,         // forward
  wave: vec4f,         // the crest sharpening ( waveEval): beta, 1 / the sea's Hs; the fine tails' crest sharpness (uTailSharp); -
  rip0: vec4f,         // the ripples: the direction they run (east, north); their slope (the wind's fine budget x the amount); the parasitic capillaries' strength
  rip1: vec4f,         // each band's share (fine chop, ripples, capillary); the crests' sharpness (uRipPeak x the layer's sharp)
  rip2: vec4f,         // the fine tails' cut (m) and 1 when the sea has one ( tailShare); how much the ripples follow the long waves (uRipMod); debug bits (DEBUG)
  ripT: array<vec4f, 2>,     // each band's tile (m)
  lvl: array<vec4f, 16>,         // each level's cell (m), morph start, morph end (m from the eye), node size
  sets: array<vec4f, 32>,          // each set's tile (m), octaves held - 1, slope variance, KIND
  lk: array<vec4f, 20>,           // the sky's and the water's look ( LOOK_WGSL)
  bd: array<vec4f, 18>,            // the beach's bed ( BED_WGSL; bd[1].w 0: none)
  sw: vec4f,           // the swell over the beach: its surface's a0, u0, 1 / size, on
  wash: vec4f,         // the shore wash ( WASH): the swash's mean angular frequency, the bore front's depth, the lace's life on the water, stranded on the sand
  swl: vec4f,          // the swell's sea state for the sand's bedforms: Hs (m), its mean period (s), 0, 0 (none: 0)
  wcap: array<vec4f, 2>,     // the dominant waves' whitecaps (WHITECAP): [0] the peak set + 1 (0: none), its mean wavenumber, its mean direction (east, north); [1] s0, its softening, the roller's rate a period, the share of a crest that breaks
};
override GAMMA: bool = true;      // the colour gamma-encoded for the canvas; false: left for the temporal resolve, which encodes it itself
@group(0) @binding(0) var<uniform> F: Frame;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var t0: texture_2d_array<f32>;
@group(0) @binding(3) var t1: texture_2d_array<f32>;
@group(0) @binding(4) var t2: texture_2d_array<f32>;
@group(0) @binding(5) var rA: texture_2d_array<f32>;      // the ripple cascades: slope x, slope y, compression
@group(0) @binding(6) var rM: texture_2d_array<f32>;      // and the squares of the slope (LEAN)
@group(0) @binding(7) var skyR: texture_2d<f32>;          // the sky-view tables: the air's light, the haze's without its phase
@group(0) @binding(8) var skyM: texture_2d<f32>;
@group(0) @binding(9) var skySamp: sampler;
${re}
${he}
${qe}
${Je}
/** The dominant waves' whitecaps at p (the still-water place: the foam rides the orbit), a footprint px, from z, the peak set's analytic
 *  slope here (WHITECAP): the share covered. The surf's crest sum (crestSum, crestBox) with
 *  the present crest's strength for the past ones too (the deep sea's past is not summed: a stated approximation), each crest breaking where
 *  its steepness passes s0, in patches along it; a roller's white and the foam it leaves, drawn as patches of lace. */
fn whitecaps(p: vec2f, px: f32, z: vec2f) -> f32 {
  let pk = u32(F.wcap[0].x);
  if (pk == 0u) { return 0.0; }
  let km = F.wcap[0].y;
  let om = sqrt(9.81 * km);
  let Tm = 6.2831853 / om;
  let sv = F.sets[pk - 1u].z;      // (the set's slope variance: E|z|^2 is twice it, a Rayleigh envelope)
  let s0 = F.wcap[1].x;
  let pf = F.wcap[1].w;
  let Smean = exp(-s0 * s0 / max(2.0 * sv, 1e-6)) * pf;      // (the expected strength: the Rayleigh share over s0, times the share of a crest that breaks)
  if (Smean < 1e-4) { return 0.0; }
  let a = length(z);
  let x = fract(-atan2(z.y, z.x) / 6.2831853);      // (periods since the crest passed)
  let d = min(km * px / 6.2831853, 4.0);      // (the periods the footprint spans)
  let toMean = smoothstep(0.25, 1.0, d);
  // the crests' strengths: the present steepness (for the past crests too), times each crest's patches along its length: a noise of the
  // place along the crest and of the time that crest passed (so a crest keeps its patches as it runs, and the foam it left has them), its
  // share pf; toward the mean as the footprint spans a period
  var S4 = vec4f(Smean);
  let sH0 = smoothstep(s0 - F.wcap[1].y, s0 + F.wcap[1].y, length(z));
  if (sH0 <= 0.0 && toMean <= 0.0) { return 0.0; }      // (not steep enough here to break, and near enough that the mean does not stand in: most of the sea)
  if (toMean < 1.0) {
    let dir = F.wcap[0].zw;
    let al = dot(p, vec2f(-dir.y, dir.x)) / ${dt.patchM.toFixed(2)};
    let tc = F.cam.w / Tm - x;
    let pa = clamp(${dt.patchM.toFixed(2)} / max(2.0 * px, 1e-3) - 1.0, 0.0, 1.0);
    let sH = sH0;
    let th = 1.4 * (0.5 - pf);
    let c0 = mix(pf, smoothstep(-0.3, 0.3, nNoise2(vec2f(al, tc), 683) / ${V} - th), pa);
    let c1 = mix(pf, smoothstep(-0.3, 0.3, nNoise2(vec2f(al, tc - 1.0), 683) / ${V} - th), pa);
    let c2 = mix(pf, smoothstep(-0.3, 0.3, nNoise2(vec2f(al, tc - 2.0), 683) / ${V} - th), pa);
    S4 = mix(vec4f(sH * c0, sH * c1, sH * mix(c2, pf, x), sH * pf), vec4f(Smean), toMean);      // (the third to the tail's as x wraps)
  }
  let bR = F.wcap[1].z;
  let W = clamp(crestSum(x, S4, bR) + Smean * crestBox(x, d, bR), 0.0, 1.0);
  // the foam: grown in over onset, thinning over the breakers' plume time ( plumeTime, hb about twice a), times the
  // decay time's ratio to it (1.7: decayTime at 0.5 m, 2.6 s against 1.5 s)
  let hb = 2.0 * max(a, sqrt(2.0 * sv)) / max(km, 1e-3);
  let life = 1.7 * clamp(${a().tauP05} * pow(max(hb, 0.02) / 0.5, 0.7), 0.5, 10.0);
  let bL = Tm / life;
  let b2 = Tm * (1.0 / ${dt.onset} + 1.0 / life);
  let Fm = max(crestSum(x, S4, bL) - crestSum(x, S4, b2) + Smean * (crestBox(x, d, bL) - crestBox(x, d, b2)), 0.0);
  let cF = 1.0 - exp(-${dt.cover} * Fm);
  if (max(W, cF) < 0.002) { return 0.0; }
  // (the foam left in patches about half the waves' length across: each whitecap's own, not a net over the whole group)
  let cL = foamPatches(p, cF, px, 3.3 / max(km, 0.01), 691.0, ${Be.shareP});
  let c = 1.0 - (1.0 - W) * (1.0 - min(cL, 0.97));
  return washLace(p, c, px);
}
/** A direction to the sky map's coordinates (octahedral, y up; the lower half folded out to the corners). */
fn octUV(d: vec3f) -> vec2f {
  let n = d / (abs(d.x) + abs(d.y) + abs(d.z));
  var p = n.xz;
  if (n.y < 0.0) { p = (1.0 - abs(p.yx)) * select(vec2f(-1.0), vec2f(1.0), p >= vec2f(0.0)); }
  return p * 0.5 + 0.5;
}
fn octDir(uv: vec2f) -> vec3f {
  let p = uv * 2.0 - 1.0;
  var n = vec3f(p.x, 1.0 - abs(p.x) - abs(p.y), p.y);
  if (n.y < 0.0) { let xz = (1.0 - abs(n.zx)) * select(vec2f(-1.0), vec2f(1.0), n.xz >= vec2f(0.0)); n = vec3f(xz.x, n.y, xz.y); }
  return normalize(n);
}
fn tailShare(lam: f32, spacing: f32) -> f32 { return select(0.0, F.rip2.y * smoothstep(2.0 * spacing, 4.5 * spacing, lam), lam >= F.rip2.x); }
const N: f32 = 256.0;
/** The clear sky in direction d without the sun (display values; the clouds are still to come): worked out (the dome, the sky map). */
fn skyColor(d: vec3f) -> vec3f { return toneEnc(skyLin(d)); }
/** A display colour to the target: as it is for the canvas; back to linear for the temporal resolve (GAMMA off), which encodes it again. */
fn present(c: vec3f) -> vec4f { return vec4f(select(pow(max(c, vec3f(0.0)), vec3f(2.2)), c, GAMMA), 1.0); }
`,ht=(e,t,n=``)=>mt+`
override RIPPLES: bool = true;      // the ripple cascades
override FACETS: u32 = 4u;          // the sky averaged over 4 facets, or 1 (the mean normal's reflection)
override FRAG_SETS: bool = true;    // the sea's sets read again per pixel for the slope (false: a flat normal; a cost test)
override VS_DISP: bool = true;      // the vertices displaced by the sea's sets (false: flat; a cost test)
override SHADE: bool = true;        // the water's shading (false: one colour, the mesh and the raster alone; a cost test)
override DERIV: bool = true;        // the footprint from screen derivatives (false: worked out from the camera; a cost test)
override BURN: u32 = 0u;            // extra arithmetic a fragment (a cost test: how often the shader runs a pixel, by how MSAA multiplies it)
override SUN_FACETS: bool = true;   // the sun's disc and glare in each facet's mirror (false: a cost test)
override REGIMES: u32 = 1u;         // each ripple band by what the pixel makes of it (bits): 1 averaged away (its known variance, no reads; the same picture), 2 resolved (no read of the squares: sharpens the glitter, learnings 39, off); else read in full
@group(1) @binding(0) var env: texture_2d<f32>;      // the sky map for reflections (display values and the clouds' opacity, octahedral): drawn when the look or the sun changes
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
${pt}
struct VO { @builtin(position) pos: vec4f, @location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32, @location(3) ${n} bias: f32, @location(4) ${n} br: vec4f };
// the fragment's inputs: without the position unless fsPos (a cost test: whether a fragment input of the position changes how often the shader runs)
struct FI { ${t?`@builtin(position) pos: vec4f, `:``}@location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32, @location(3) ${n} bias: f32, @location(4) ${n} br: vec4f };
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) inst: vec4f) -> VO {
  let gx = vi % ${e+1}u;
  let gz = vi / ${e+1}u;
  let lv = F.lvl[u32(inst.w)];
  let cell = lv.x;
  var p = inst.xy + vec2f(f32(gx), f32(gz)) * cell;
  let dist = length(vec3f(p.x - F.cam.x, F.cam.y, p.y - F.cam.z));
  let k = clamp((dist - lv.y) / (lv.z - lv.y), 0.0, 1.0);
  p -= vec2f(f32(gx & 1u), f32(gz & 1u)) * (cell * k);       // the odd vertices onto their even neighbours: the parent's grid at k = 1
  let ccell = cell * (1.0 + k);
  var h = 0.0;
  var disp = vec2f(0.0);
  let nS = select(0u, u32(F.sea.x), VS_DISP);
  for (var s = 0u; s < nS; s++) {
    let S = F.sets[s];
    let lod = max(0.0, log2(ccell * N / S.x));
    if (S.w == 0.0 || lod > 5.0 + S.y) { continue; }
    let a = textureSampleLevel(t0, samp, p / S.x + 0.5 / N, s, lod);
    h += a.x;
    disp += F.sea.y * a.zw;
  }
  let gw = bedWaveGain(p);      // (the waves fade in the shallows: a stand-in until the bed's wave solve)
  h *= gw;
  disp *= gw;
  let sv = swellAt(p);      // (the swell over the beach, from the bed's response)
  let bias = swellEdge(p) * (EDGE_BIAS + 0.04 * ccell);      // (more on a coarser mesh: its triangles' level is further from the texture's)
  h += sv.x + bias;      // (raised a little where the run-up is: the fragment takes the same off, interpolated as the mesh is, and finds the edge per pixel)
  disp += sv.yz;
  let h0 = h;
  h += F.wave.x * h * h * F.wave.y;      // the crests sharpened, the troughs flattened ( waveEval)
  // the breaking crests' shape ( breakGeom): the crest's lean (a shoreward shift of the place by its phase), the
  // rollers' bulk, the broken water's blobby relief and the crash's splash, band-limited by the crests' size, added after the crests'
  // sharpening (which squared what it rode on: the first form drew metre-high spikes on a 2 m sea); their slopes and the lean's change to
  // the slopes go to the pixel
  var bg = BreakG(0.0, vec2f(0.0), vec2f(0.0), vec2f(0.0));
  if (bedOn()) { bg = breakGeom(p, ccell); }
  h += bg.dh;
  disp += bg.d;
  var o: VO;
  let w = vec3f(p.x + disp.x, h, -(p.y + disp.y));
  o.pos = F.viewProj * vec4f(w - vec3f(F.cam.x, 0.0, -F.cam.z), 1.0);
  o.p0 = p;
  o.world = w;
  o.h = h0;
  o.bias = bias;
  o.br = vec4f(bg.g, bg.c);
  return o;
}
// The fine detail the mesh and the sea's sets cannot hold (, the ripple cascades): each band's slope at the share the wind calls for,
// faded by the mips into roughness (the slope variance the pixel cannot show, LEAN). sl: the slope it adds (east, north); cov: the covariance
// (east-east, north-north, east-north) of the slopes it leaves unresolved; rough: their mean square. dx, dy: the still-water point's
// derivatives across the pixel; n: the normal so far.
struct Rip { sl: vec2f, cov: vec3f, rough: f32 };
fn ripples(p0: vec2f, dx: vec2f, dy: vec2f, spacing: f32, n: vec3f) -> Rip {
  let wd = F.rip0.xy;
  let wp = vec2f(-wd.y, wd.x);
  let ap = vec2f(dot(p0, wd), dot(p0, wp));
  let adx = vec2f(dot(dx, wd), dot(dx, wp));
  let ady = vec2f(dot(dy, wd), dot(dy, wp));
  let sdw = dot(vec2f(-n.x, n.z) / max(n.y, 0.2), wd);
  let face = mix(1.0, clamp(1.0 + 1.6 * clamp(sdw / 0.25, -1.0, 1.0), 0.25, 2.4), F.rip2.z);      // stronger on the windward faces, weaker in the lee
  let gf = F.rip0.z * face;
  var sA = vec2f(0.0);
  var cmpA = 0.0;
  var cvA = vec3f(0.0);
  for (var c = 0u; c < 8u; c++) {
    let T = F.ripT[c >> 2u][c & 3u];
    // The band's regime from the pixel's footprint against its shortest wave (lo, a fortieth of the tile; its longest is about 2 lo):
    // from 6 lo the pixel holds several of its longest waves and the mean slope fades to none and the variance to the band's whole (the
    // top mip: the tile's mean square), with no reads from 10 lo; below lo / 6.4 (a texel) the pixel resolves it and the squares are not
    // read (what the slope leaves unresolved there is the texels' interpolation, negligible).
    let lo = T / 40.0;
    let avg = select(0.0, smoothstep(6.0 * lo, 10.0 * lo, spacing), (REGIMES & 1u) != 0u);
    var a = vec4f(0.0);
    var cv = vec3f(0.0);
    if (avg < 1.0) {
      a = textureSampleGrad(rA, samp, ap / T, c, adx / T, ady / T);
      if ((REGIMES & 2u) == 0u || spacing > lo / 6.4) {
        let m = textureSampleGrad(rM, samp, ap / T, c, adx / T, ady / T);
        cv = vec3f(max(m.x - a.x * a.x, 0.0), max(m.y - a.y * a.y, 0.0), m.z - a.x * a.y);
      }
    }
    if (avg > 0.0) {
      let mt = textureSampleLevel(rM, samp, vec2f(0.5), c, ${Math.log2(256)}.0);      // (the top mip: one texel, always in the cache)
      a *= 1.0 - avg;
      cv = mix(cv, mt.xyz, avg);
    }
    if (c < 6u) {
      let mc = select(select(F.rip1.z, F.rip1.y, c < 4u), F.rip1.x, c < 2u) * gf;
      let lam = array<f32, 4>(1.04, 0.50, 0.21, 0.081)[min(c, 3u)];
      let rs = select(1.0, 1.0 - tailShare(lam, spacing), c < 4u);      // what the FFT tail does not already draw (the sub-pixel roughness is all kept)
      sA += mc * rs * a.xy;
      cmpA += mc * rs * a.z;
      cvA += mc * mc * cv;
    } else {
      // the parasitic capillaries (3 to 12 mm): shed by sharp crests, so strongest where the compression is greatest
      let jac0 = 1.0 - F.rip1.w * cmpA;
      let mc = F.rip1.z * F.rip0.w * (0.25 + 1.75 * smoothstep(0.05, 0.6, 1.0 - jac0)) * gf;
      sA += mc * a.xy;
      cvA += mc * mc * cv;
    }
  }
  let jac = 1.0 - F.rip1.w * cmpA;                       // 1 - (the divergence of the horizontal motion): the local stretching of the surface
  var o: Rip;
  o.sl = (sA.x * wd + sA.y * wp) / clamp(jac, 0.35, 3.0);
  o.cov = vec3f(cvA.x * wd.x * wd.x + cvA.y * wp.x * wp.x + 2.0 * cvA.z * wd.x * wp.x, cvA.x * wd.y * wd.y + cvA.y * wp.y * wp.y + 2.0 * cvA.z * wd.y * wp.y,
                cvA.x * wd.x * wd.y + cvA.y * wp.x * wp.y + cvA.z * (wd.x * wp.y + wd.y * wp.x));      // turned from the wind's axes to east and north
  let mb = F.rip1.w * 0.25 * smoothstep(0.5, 0.2, jac);      // past the limit the crest would overturn: shown as extra roughness
  o.cov += vec3f(0.5 * mb, 0.5 * mb, 0.0);
  o.rough = cvA.x + cvA.y + mb;
  return o;
}
fn schlick(c: f32) -> f32 { return 0.02 + 0.98 * pow(1.0 - clamp(c, 0.0, 1.0), 5.0); }
fn smithLambda(t: f32) -> f32 { return select((1.0 - 1.259 * t + 0.396 * t * t) / (3.535 * t + 2.181 * t * t), 0.0, t >= 1.6); }
@fragment fn fs(i: FI) -> @location(0) vec4f {
  if (!SHADE) { return vec4f(0.1, 0.3, 0.4, 1.0); }
  var burn = i.h;
  for (var b = 0u; b < BURN; b++) { burn = fract(sin(burn * 12.9898 + 78.233) * 43758.547); }
  // the pixel's footprint across the screen's x and y: from the screen derivatives, or (DERIV false) from the distance and the grazing
  // angle (a pixel's angle d theta across the view, d theta / sin(elevation) along it)
  let toEye0 = vec3f(F.cam.x, F.cam.y, -F.cam.z) - i.world;
  let d0 = length(toEye0);
  let pixA = 2.0 * length(F.camU.xyz) * F.screen.w;
  let hv = normalize(vec2f(-toEye0.x, toEye0.z) + vec2f(1e-6, 0.0));
  var dx0 = vec2f(-hv.y, hv.x) * d0 * pixA;
  var dy0 = hv * d0 * pixA / max(toEye0.y / d0, 0.02);
  if (DERIV) { dx0 = dpdx(i.p0); dy0 = dpdy(i.p0); }
  dx0 *= F.sea.w;      // (rebuilt in time, the detail is filtered an octave finer than the screen's pixel, as FSR 2 biases its mips by log2 of the scale minus 1)
  dy0 *= F.sea.w;
  let px = max(length(dx0), length(dy0));       // the pixel's footprint on the water (m)
  // the water's edge at the pixel's own scale: the run-up's level and the bed, each with its detail finer than the textures hold down to
  // this pixel ( swashFine, bedFine); where the level is below the bed here, the bed is dry and drawn as the ground
  var level = i.world.y;
  var dry = false;      // (returned at the end, after the derivatives: they need every pixel of a quad to run them)
  var dryCol = vec3f(0.0);
  var wash = 0.0;
  let edgeW = select(0.0, swellEdge(i.p0), bedOn() && (u32(F.rip2.w) & 256u) == 0u);      // (?seadbg=256: no edge at the pixel's scale, a cost test)
  if (edgeW > 0.0) {
    let pE = vec2f(i.world.x, -i.world.z);
    // the level here from the swell's own texture (1 m), not the mesh's triangles (metres apart far off: their flat facets put teeth in the
    // edge); offshore of the run-up's band the mesh's
    level = mix(i.world.y - i.bias, swellAt(pE).x, edgeW);
    // the fine detail can only move the edge where the coarse level and bed are within a few of its spreads of each other (faded in, so it
    // never switches at a contour)
    let bedC = bedYC(pE, px);
    let wf = 1.0 - smoothstep(0.06, 0.10, abs(level - bedC));
    var bedHere = bedC;
    var fineL = 0.0;
    if (wf > 0.0) { fineL = wf * edgeW * swashFine(pE, level, px); level += fineL; bedHere = bedC + wf * bedFine(pE, px); }      // (anchored to the texture's level, not the mesh's: the mesh's facets and its level of detail would shear it)
    let W = washAt(pE, bedHere, level, fineL, px);      // (the shore wash: the bore's front and the lace on the water, the lace stranded on the sand)
    wash = W.x;
    if (level < bedHere) {
      // the bed is dry here: drawn as the ground where the eye's ray meets it, on past the water's mesh (the mesh is above it), not under
      // the mesh's point (at a grazing angle that would shift it by metres)
      let dv = normalize(i.world - vec3f(F.cam.x, F.cam.y, -F.cam.z));
      let pw = i.world + dv * max((bedHere - i.world.y) / min(dv.y, -0.02), 0.0);
      dry = true;
      dryCol = groundShade(vec2f(pw.x, -pw.z), vec3f(pw.x, bedHere, pw.z), px);
      // (stranded foam: white, never darker than the sand it lies on; a white as bright as the sand's brightest channel, not the channels'
      // maximum one by one, which took the sand's red and the white's blue and drew the foam pink)
      let fw = vec3f(0.95, 0.96, 0.97) * max(0.70 + 0.40 * max(F.sun.y, 0.0), 1.05 * max(dryCol.r, max(dryCol.g, dryCol.b)));
      dryCol = mix(dryCol, fw, 0.9 * W.y);
    }
  }
  var g = vec2f(0.0);       // the main waves' still-water gradient and Jacobian (xx, zz, xz), and the fine tails' apart ( Wave)
  var j = vec3f(0.0);
  var gt = vec2f(0.0);
  var jt = vec3f(0.0);
  var zP = vec2f(0.0);
  let nS = select(0u, u32(F.sea.x), FRAG_SETS);
  for (var s = 0u; s < nS; s++) {
    let S = F.sets[s];
    if (S.w == 0.0) { continue; }
    let lod = max(0.0, log2(px * N / S.x));
    if (lod > 5.0 + S.y) { continue; }
    let uv = i.p0 / S.x + 0.5 / N;
    let b = textureSampleLevel(t1, samp, uv, s, lod);
    let x = textureSampleLevel(t2, samp, uv, s, lod).x;
    if (S.w == 2.0) { gt += b.xy; jt += vec3f(b.zw, x); } else { g += b.xy; j += vec3f(b.zw, x); }
    if (s + 1u == u32(F.wcap[0].x)) { zP = vec2f(-(b.z + b.w), -dot(b.xy, F.wcap[0].zw)); }      // (the dominant waves' analytic slope: a k e^(i theta))
  }
  let gw = bedWaveGain(i.p0);
  zP *= gw;
  g *= gw; gt *= gw; j *= gw; jt *= gw;
  g += swellSlope(i.p0);
  let sharp = 1.0 + 2.0 * F.wave.x * i.h * F.wave.y;
  g *= sharp;
  gt *= sharp;
  g += i.br.xy;      // (the breaking crests' shape: its slopes, the mesh's breakGeom)
  // the slope on the displaced surface ( waveSlope): the still-water gradient through the displacement's Jacobian, the fine tails in it
  let jm = F.sea.y * j;
  let ja = jm + F.sea.y * F.wave.z * jt;
  let a11 = 1.0 + ja.x;
  let a22 = 1.0 + ja.y;
  let a12 = ja.z;
  let dd = max(a11 * a22 - a12 * a12, 0.15);
  var ga = g + gt;
  ga += i.br.zw * dot(ga, i.br.zw);      // (the crest's lean: its front face compressed and steepened, breakGeom)
  let sl = vec2f(a22 * ga.x - a12 * ga.y, -a12 * ga.x + a11 * ga.y) / dd;
  let det = (1.0 + jm.x) * (1.0 + jm.y) - jm.z * jm.z;      // the main waves' alone for the foam (waveSlopeMain: the centimetre waves do not whiten the water)
  var Nw = normalize(vec3f(-sl.x, 1.0, sl.y));
  var rcov = vec3f(0.0);
  var ripRough = 0.0;
  if (RIPPLES && F.rip0.z > 0.0) {
    let rp = ripples(i.p0, dx0, dy0, px, Nw);
    Nw = normalize(vec3f(Nw.x - rp.sl.x * Nw.y, Nw.y, Nw.z + rp.sl.y * Nw.y));
    rcov = rp.cov;
    ripRough = rp.rough;
  }
  let eye = vec3f(F.cam.x, F.cam.y, -F.cam.z);
  let toEye = eye - i.world;
  let dist = length(toEye);
  let V = toEye / dist;
  let Ls = F.sun.xyz;
  // The slopes in this pixel: the covariance of those too small to resolve, a floor, and the change of the resolved slope from
  // pixel to pixel (a pixel holds all of it)
  let sN = vec2f(-Nw.x, Nw.z) / max(Nw.y, 0.05);
  var dsx = vec2f(0.0);
  var dsy = vec2f(0.0);
  if (DERIV) { dsx = dpdx(sN) * F.sea.w; dsy = dpdy(sN) * F.sea.w; }
  let aa = vec3f(dsx.x * dsx.x + dsy.x * dsy.x, dsx.y * dsx.y + dsy.y * dsy.y, dsx.x * dsx.y + dsy.x * dsy.y) * 0.5;
  let cv = rcov + vec3f(0.00045 + 0.0035 * smoothstep(30.0, 500.0, dist)) * vec3f(1.0, 1.0, 0.0) + aa * min(1.0, 0.03 / max(max(aa.x, aa.y), 1e-8));
  // The sky the pixel reflects: the average over four facets whose normals are spread by +-sqrt 2 sigma along the covariance's principal axes
  // (which gives the covariance exactly), each with its own Fresnel. A facet whose mirror ray points down faces away from the eye and is masked
  // by its neighbours: it is given the sky just over the horizon. Near the eye the Fresnel is taken partly from the resolved normal and
  // partly from straight up (the visible facets, the defaults of option C).
  let tr2 = 0.5 * (cv.x + cv.y);
  let df2 = 0.5 * (cv.x - cv.y);
  let rd = sqrt(df2 * df2 + cv.z * cv.z);
  let th = 0.5 * atan2(cv.z, df2);
  let e1 = vec2f(cos(th), sin(th));
  let o1 = 1.4142 * sqrt(max(tr2 + rd, 1e-9)) * e1;
  let o2 = 1.4142 * sqrt(max(tr2 - rd, 1e-9)) * vec2f(-e1.y, e1.x);
  let cRes = ${et} * (1.0 - smoothstep(20.0, 35.0, dist));
  let vis = smoothstep(0.0, 0.08, tr2) * 0.45 * (1.0 - cRes);
  var skyAcc = vec3f(0.0);
  var fAcc = 0.0;
  let wk = 1.0 / f32(FACETS);
  for (var k = 0u; k < FACETS; k++) {
    let o = select(select(o2, o1, k < 2u) * select(-1.0, 1.0, (k & 1u) == 0u), vec2f(0.0), FACETS == 1u);
    let Nk = normalize(vec3f(-(sN.x + o.x), 1.0, sN.y + o.y));
    var Rk = reflect(-V, Nk);
    Rk.y = abs(Rk.y) * 0.4 + max(Rk.y, 0.0) * 0.6;
    Rk = normalize(Rk);
    let Fk = schlick(dot(normalize(mix(mix(Nk, Nw, cRes), vec3f(0.0, 1.0, 0.0), vis)), V));
    let sk = skyMap(Rk);
    skyAcc += wk * Fk * (sk.rgb + select(vec3f(0.0), sunTerm(Rk) * (1.0 - sk.a), SUN_FACETS));      // (the sun's disc and glare in the facet's mirror, behind the clouds, as adds them)
    fAcc += wk * Fk;
  }
  let fres = fAcc;
  let sky = skyAcc / max(fAcc, 1e-4);
  // The sun's glitter: the share of facets tilted to mirror the sun to the eye, their slopes a Gaussian of that covariance round the resolved
  // slope, less the facets the eye or the sun cannot see (Smith masking)
  let Hv = normalize(Ls + V);
  let hs = vec2f(-Hv.x, Hv.z) / max(Hv.y, 0.02);
  let cdet = max(cv.x * cv.y - cv.z * cv.z, 1e-8);
  let d2 = hs - sN;
  let ex = (d2.x * d2.x * cv.y + d2.y * d2.y * cv.x - 2.0 * d2.x * d2.y * cv.z) / cdet;
  let Dm = exp(-0.5 * ex) / (6.2831853 * sqrt(cdet)) / max(Hv.y * Hv.y * Hv.y * Hv.y, 1e-5);
  let aV = normalize(vec2f(-V.x, V.z) + vec2f(1e-5));
  let aL = normalize(vec2f(-Ls.x, Ls.z) + vec2f(1e-5));
  let sV = aV.x * aV.x * cv.x + aV.y * aV.y * cv.y + 2.0 * aV.x * aV.y * cv.z;
  let sL = aL.x * aL.x * cv.x + aL.y * aL.y * cv.y + 2.0 * aL.x * aL.y * cv.z;
  let tV = max(V.y, 1e-3) / sqrt(max(1.0 - V.y * V.y, 1e-4)) / sqrt(2.0 * max(sV, 1e-6));
  let tL = max(Ls.y, 1e-3) / sqrt(max(1.0 - Ls.y * Ls.y, 1e-4)) / sqrt(2.0 * max(sL, 1e-6));
  let Gs = 1.0 / (1.0 + smithLambda(tV) + smithLambda(tL));
  let NdV = max(dot(Nw, V), 0.001);
  // The rest as has it, in display values (the look Mike tuned): the sun as it gets through (the clouds are to come: 1)
  let sunVis = F.lk[6].z * F.lk[6].w;
  let spec = min(Dm * schlick(dot(Hv, V)) * Gs / (4.0 * max(NdV, 0.08)), 6.0) * F.lk[7].w * 0.28 * sunVis;
  // the water's own colour ( waterLook): the light that comes back up out of deep water under this sky (sim2 has no
  // bathymetry yet, so the bottom's light lk[9] over 2 Kd lk[10] waits), darker in the troughs and in shade, lighter on lit faces
  let hsRef = 1.0 / max(F.wave.y, 1e-3);      // (the sea's significant height, m)
  let NdLs = max(dot(Nw, Ls), 0.0);
  let ao = mix(0.55, 1.0, smoothstep(-0.7 * hsRef, 0.25 * hsRef, i.h));
  // the bed seen through the water where there is one: the refracted ray to the bed, its light through the
  // water both ways (Kd down at the sun's angle, up along the ray), mixed with the deep water's own light by what the water lets through
  var bodyLin = F.lk[8].xyz;
  var bedT = 0.0;
  if (bedOn()) {
    let pS = vec2f(i.world.x, -i.world.z);
    let rw = refract(-V, Nw, 0.7519);
    let mu = max(-rw.y, 0.08);
    let H0 = max(level - bedY(pS), 0.0);
    let pb = pS + vec2f(rw.x, -rw.z) * (H0 / mu);
    let raw0 = bedRaw(pb, px);
    let Hb = max(level - raw0.x, 0.0);
    let lw = refract(-Ls, vec3f(0.0, 1.0, 0.0), 0.7519);
    let muS = max(-lw.y, 0.2);
    let Kd = 0.5 * F.lk[10].xyz;
    let T = exp(-Kd * Hb * (1.0 / muS + 1.0 / mu));
    bedT = max(T.x, max(T.y, T.z));
    bodyLin = F.lk[8].xyz * (1.0 - T);
    // (the bed's cover and normal only where the bed can be seen: below a two-thousandth of its light through the water it changes no
    // code value, and the cover's patches are the bed's costliest part, paid by every pixel of the sea over the reefs and the weed)
    if (bedT > 0.002) {
      let raw = bedCover(pb, raw0, px);
      let nb = bedFormNormal(bedNormal(pb, px), pb, raw0.x, px);
      let shade = mix(1.0, clamp(dot(nb, -lw), 0.0, 1.0) / muS, 0.7 * sunVis);
      let alb = bedAlbedo(pb, raw, px, 1.0);
      bodyLin += F.lk[9].xyz * alb * shade * T;
    }
  }
  let body = toneEnc(bodyLin) * mix((0.40 * F.lk[12].w + 0.60 * mix(0.45, NdLs, sunVis)) * (1.0 / 0.88) * ao, 1.0, bedT);
  let dbg = u32(F.rip2.w);
  var col = mix(body, select(sky, body, (dbg & 4u) != 0u), fres);
  // light through the thin crests, bright in the water's colour with the sun behind the wave; a little in every crest
  let back = pow(clamp(dot(-V, Ls), 0.0, 1.0), 2.2);
  let thin = smoothstep(0.04 * hsRef, 0.55 * hsRef, i.h) * (0.55 + 0.45 * (1.0 - Nw.y));
  col += F.lk[11].xyz * (back * thin * 0.95 * sunVis + 0.25 * smoothstep(0.0, 0.5 * hsRef, i.h)) * (1.0 - fres);
  col += select(F.lk[7].xyz * spec, vec3f(0.0), (dbg & 2u) != 0u);
  // foam where the main waves fold (the foam field and its look are to come)
  var foam = select(smoothstep(0.5, 0.15, det), 0.0, (dbg & 1u) != 0u);
  // the dominant waves' whitecaps (WHITECAP; ?seadbg=65536 none)
  var wcap = 0.0;
  if ((dbg & 65536u) == 0u) { wcap = whitecaps(i.p0, px, zP); }
  // the breaking waves' whitewater and foam ( surfAt: crest by crest, as layer 3's share says, each crest's
  // roller and the foam it leaves, summed over the crests that have passed, drawn as lace), and the last crest's roller. Worked out here,
  // late, not with the slopes: there its results were held through all the water's shading, and that alone cost 2 ms of the view's 17
  // on the Mac with the roller off (2026-11-25)
  var sf = Surf(0.0, 0.0, vec4f(0.0), vec2f(0.0));
  if (bedOn()) { sf = surfAt(i.p0, px); }
  let surf = sf.lace;
  let surfW = sf.ws;
  let rlF = sf.r;
  col = mix(col, vec3f(0.93, 0.96, 0.98) * 0.78 * (0.66 + 0.50 * NdLs * sunVis), foam * 0.8);
  // (the surf's foam and the whitecaps: the same white as the wash's)
  col = mix(col, vec3f(0.95, 0.97, 0.98) * (0.70 + 0.40 * sunVis), max(surf, wcap));
  // (the breaking crest's roller over it, the white's solid part: solid at the toe, broken into its lumps behind (rollerWhite), lit as
  // white water is, scattering many times: wrapped round past its bulk's sides, a sky's worth of light in their shade, darker in the
  // hollows between its lumps)
  let rW = rollerWhite(rlF, surfW, ${W.edge}, px);
  // (its normal's light as the water's, NdLs (the bulk's shape is in the water's normal), tilted by its churn's relief (surfAt's g), its
  // churn's hollows darker)
  let NdLr = (NdLs - sf.g.x * F.sun.x + sf.g.y * F.sun.z) / sqrt(1.0 + dot(sf.g, sf.g));
  // (white water in its own shade stays bright: light scattered many times through it, and the sky's; Mike's City Beach photographs, 2026-11-25,
  // a white roll in the evening light with no grey in it; a little of the sky's blue in the shade)
  let litR = (0.74 + 0.36 * sunVis * clamp((NdLr + 0.4) / 1.4, 0.0, 1.0)) * (0.86 + 0.18 * rlF.z);
  col = mix(col, mix(vec3f(0.86, 0.92, 1.0), vec3f(0.97, 0.98, 0.98), smoothstep(0.75, 1.05, litR)) * litR, rW);
  col = mix(col, vec3f(0.95, 0.97, 0.98) * (0.70 + 0.40 * sunVis), wash);      // (the shore wash's foam: thin, flat and bright, as the Rottnest video's)
  // the air between: the distance fades the sea toward the sky just above the horizon in that direction, per channel (the blue first)
  col = mix(col, skyMap(normalize(vec3f(-V.x, 0.012, -V.z))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0)));
  if ((dbg & 8192u) != 0u) { return gWashDbg; }      // (debug 8192: the wash's c0 (red, 0.5 at the slow level), its phase (green), its band (blue))
  if ((dbg & 32768u) != 0u) { return gSurfDbg; }      // (debug 32768: the surf's roller (red), foam (green), last crest's strength (blue))
  if ((dbg & 131072u) != 0u) { return vec4f(wcap, 1.0 - (1.0 - surf) * (1.0 - rW), wash, 1.0); }      // (debug 131072: the foams' shares, linear, for measuring their cover: red the whitecaps, green the surf's (its lace and its roller's white), blue the wash's)
  if ((dbg & 1048576u) != 0u) { return vec4f(clamp(breakGeom(i.p0, 0.05).dh * 10.0, 0.0, 1.0), rW, rlF.z * step(1e-4, rlF.y), 1.0); }      // (debug 1048576: the breaking crests' height x 10 (red, m: worked out again here, as the mesh's held through the shading cost 1.8 ms of the view's 16.5 on the Mac), the roller's white (green), its lumps (blue))
  if ((dbg & 8u) != 0u) { return vec4f(length(sN) / 2.0, length(sl) / 2.0, ripRough * 10.0, 1.0); }
  if ((dbg & 64u) != 0u) { let sv = swellAt(i.p0); let fw = select(0.0, max(surf, wcap), (dbg & 262144u) != 0u); return vec4f(mix(vec3f(0.5 + sv.x, 0.5 + sv.x, 0.5 - sv.x), vec3f(1.0), fw), 1.0); }      // (with 262144: the surf's foam and the whitecaps over it in white)      // the swell's height alone (64: red-yellow crests, blue troughs; 0.5 at still water)      // the slopes: r the drawn one, g the waves' alone (/ 2), b the ripples' roughness (x 10)
  if (dry) { return present(dryCol); }
  return present(col + vec3f(burn * 1e-6));
}
`,gt=mt+`
override MAP_N: f32 = 256.0;
override FACE: i32 = -1;      // -1 the octahedral map; 0 to 5 a cube face (+x, -x, +y, -y, +z, -z)
/** A cube face's direction at (s, t) in -1..1 (s right, t down: the sampling convention of cube textures). */
fn cubeDir(f: i32, s: f32, t: f32) -> vec3f {
  var d = vec3f(s, -t, 1.0);
  if (f == 0) { d = vec3f(1.0, -t, -s); } else if (f == 1) { d = vec3f(-1.0, -t, s); } else if (f == 2) { d = vec3f(s, 1.0, t); }
  else if (f == 3) { d = vec3f(s, -1.0, -t); } else if (f == 5) { d = vec3f(-s, -t, -1.0); }
  return normalize(d);
}
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4f {
  let uv = p.xy / MAP_N;
  if (FACE < 0) { return skyBase(octDir(uv)); }
  return skyBase(cubeDir(FACE, uv.x * 2.0 - 1.0, uv.y * 2.0 - 1.0));
}
`,_t=mt+`
struct SO { @builtin(position) pos: vec4f, @location(0) ndc: vec2f };
@vertex fn vs(@builtin(vertex_index) vi: u32) -> SO {
  let p = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  var o: SO;
  o.pos = vec4f(p, 0.0, 1.0);
  o.ndc = p;
  return o;
}
override BURN: u32 = 0u;      // extra arithmetic a fragment (a cost test: one triangle over the whole screen, so no edges; MSAA multiplies it only if the shader runs once a sample)
@group(1) @binding(1) var dome: texture_cube<f32>;      // the sky and its clouds for the dome (display values, the clouds' opacity), a cube of 512 a face
@fragment fn fs(i: SO) -> @location(0) vec4f {
  var burn = i.ndc.x;
  for (var b = 0u; b < BURN; b++) { burn = fract(sin(burn * 12.9898 + 78.233) * 43758.547); }
  let d = normalize(F.camF.xyz + i.ndc.x * F.camR.xyz + i.ndc.y * F.camU.xyz);
  if ((u32(F.rip2.w) & 16u) != 0u) { return present(vec3f(0.5, 0.6, 0.8)); }      // (debug 16: one colour, a cost test of the sky)
  if (d.y < 0.0) {
    // below the horizon, past the end of the water's mesh (tens of km off; the horizon is 100 km away from 760 m): the sea at infinity, which
    // at that grazing angle mirrors the sky just over the horizon, hazed by the air along the way as the water's own far pixels are, so there
    // is no dark band (the dome's lower half) between the mesh's end and the horizon (Mike, 2026-11-24: "a thick black line between sea and sky")
    let t = F.cam.y / max(-d.y, 1e-4);
    let mir = textureSampleLevel(dome, skySamp, normalize(vec3f(d.x, max(-d.y, 0.004), d.z)), 0.0).rgb;
    let hz = textureSampleLevel(dome, skySamp, normalize(vec3f(d.x, 0.012, d.z)), 0.0).rgb;
    return present(mix(mir, hz, clamp(1.0 - exp(-F.lk[3].xyz * t), vec3f(0.0), vec3f(1.0))));
  }
  // (the dome read no lower than a texel over the horizon, so its filtering never blends in the lower half's dark)
  var m = textureSampleLevel(dome, skySamp, normalize(vec3f(d.x, max(d.y, 0.004), d.z)), 0.0);
  if ((u32(F.rip2.w) & 32u) != 0u) { m = skyBase(d); }      // (debug 32: the sky worked out per pixel, to check the cube against)
  return present(sunOver(m.rgb, d, 1.0 - m.a) + vec3f(burn * 1e-6));
}
`,vt=e=>mt+`
@group(1) @binding(0) var env: texture_2d<f32>;
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
${pt}
struct GO { @builtin(position) pos: vec4f, @location(0) p: vec2f, @location(1) world: vec3f };
@vertex fn vs(@builtin(vertex_index) vi: u32, @location(0) inst: vec4f) -> GO {
  let gx = vi % ${e+1}u;
  let gz = vi / ${e+1}u;
  let lv = F.lvl[u32(inst.w)];
  let cell = lv.x;
  var p = inst.xy + vec2f(f32(gx), f32(gz)) * cell;
  let dist = length(vec3f(p.x - F.cam.x, F.cam.y, p.y - F.cam.z));
  let k = clamp((dist - lv.y) / (lv.z - lv.y), 0.0, 1.0);
  p -= vec2f(f32(gx & 1u), f32(gz & 1u)) * (cell * k);
  let ccellG = cell * (1.0 + k);      // (the vertices' spacing: the bed read at it)
  let w = vec3f(p.x, bedYC(p, ccellG), -p.y);
  var o: GO;
  o.pos = F.viewProj * vec4f(w - vec3f(F.cam.x, 0.0, -F.cam.z), 1.0);
  o.p = p;
  o.world = w;
  return o;
}
@fragment fn fs(i: GO) -> @location(0) vec4f {
  let px = max(length(dpdx(i.p)), length(dpdy(i.p)));
  if (bedRaw(i.p, px).x < -0.6) { discard; }
  // where the swell's level at this pixel is above the bed here, the water is there and draws it: the ground's facets (metres across far
  // off) would otherwise cut the water's edge into their straight-sided teeth
  if (swellEdge(i.p) > 0.0 && swellAt(i.p).x > bedYC(i.p, px)) { discard; }
  if ((u32(F.rip2.w) & 2048u) != 0u) { let r = bedRaw(i.p, px); return vec4f(r.y, bedMat(i.p, px).y, clamp(px / 64.0, 0.0, 1.0), 1.0); }      // (debug 2048: the cover's zone, its share and the footprint / 64 m)
  return present(groundShade(i.p, i.world, px));
}
`;function yt(i,a,o,s={},{micro:c=1,debug:l=0}={}){let u=_(m(s),c),d=a.sets;i.set([.15*(s.stokes??0)*(s.stats?.sharpWeight??1),1/Math.max(.05,s.stats?.hs??0),s.ripples?.sharp??1,0],44),i.set(u.on?[u.dir[0],u.dir[1],u.amount*Math.sqrt(t(u.windMs,u.res)),1]:[1,0,0,0],48),i.set([...u.amp,u.on?u.sharp:1],52),i.set([e.cut,+!!a.tails?.length,1,l],56),i.set(A.map(e=>e[2]),60);for(let e=0;e<32;e++){let t=d[e],r=e>=o||t.band===n.WIND_L||t.band===n.WIND_R?ft.OFF:t.band===n.TAIL?ft.TAIL:ft.MAIN;i.set(e<o?[t.L,(t.span??1)-1,t.slopeVar??0,r]:[1,0,0,0],nt+4*e)}let f=-1,p=0;for(let e=0;e<o;e++){let t=d[e];t.band===n.WIND&&!t.tail&&(t.var??0)>p&&(p=t.var,f=e)}if(f>=0){let e=d[f],t=0,n=0,r=0,a=0;for(let i=0;i<e.n;i++){let o=e.re[i]*e.re[i]+e.im[i]*e.im[i];t+=o,n+=o*e.kk[i],r+=o*e.ux[i],a+=o*e.uy[i]}let o=Math.hypot(r,a)||1;i.set([f+1,n/Math.max(t,1e-30),r/o,a/o],ct)}else i.set([0,1,1,0],ct);return i.set([r.s0,r.sd,dt.rollerB,dt.patchFrac],ct+4),i}var bt={msaa:4,grid:32,ripples:!0,facets:4,fragSets:!0,vsDisp:!0,shade:!0,fsPos:!1,deriv:!0,burn:0,skyBurn:0,interp:``,target:`canvas`,depth:`depth32float`,rs:.7,detail:null,regimes:1,sunFacets:!0,dbg:0,ground:!0,swell:!0},xt=`rgba16float`,St=class{constructor(e,t,{msaa:n=4,format:r=navigator.gpu.getPreferredCanvasFormat(),timestamps:i=!1,grid:a=32,patch0:o=4,levels:s=12,rangeK:c=6}={}){if(c*.30000000000000004<Math.SQRT2)throw Error(`rangeK ${c} is too small: the mesh would crack (at least ${(Math.SQRT2/.30000000000000004).toFixed(2)})`);Object.assign(this,{device:e,canvas:t,format:r,patch0:o,rangeK:c,levels:Math.min(s,16)}),this.ctx=t.getContext(`webgpu`),this.ctx.configure({device:e,format:r,alphaMode:`opaque`});let l=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.bgl=e.createBindGroupLayout({entries:[{binding:0,visibility:l,buffer:{type:`uniform`}},{binding:1,visibility:l,sampler:{type:`filtering`}},...[2,3,4,5,6].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}})),...[7,8].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}})),{binding:9,visibility:l,sampler:{type:`filtering`}},{binding:10,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}},{binding:11,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}},{binding:13,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}}]}),this.swellNone=e.createTexture({size:[1,1,6],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING}),this.bedTex=Ke(e),this.bedOut=Ke(e),this.bedU=Ge(null),this.envLayout=e.createPipelineLayout({bindGroupLayouts:[this.bgl]}),this.bglEnv=e.createBindGroupLayout({entries:[0,1].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:e?`cube`:`2d`}}))}),this.layout=e.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv]});let u=(t,n,r=1,i=xt)=>e.createTexture({label:t,size:[n,n,r],format:i,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING});this.env=u(`sky map`,256),this.domes=[u(`dome cube A`,512,6,`rgba8unorm`),u(`dome cube B`,512,6,`rgba8unorm`)],this.domeFront=0,this.domeStrip=-1,this.domeReady=!1,this.bgEnvs=this.domes.map(t=>e.createBindGroup({layout:this.bglEnv,entries:[{binding:0,resource:this.env.createView()},{binding:1,resource:t.createView({dimension:`cube`})}]}));let d=e.createShaderModule({code:gt,label:`sky map`}),f=(t,n,r)=>e.createRenderPipeline({layout:this.envLayout,label:`sky map ${t} ${n}`,vertex:{module:d,entryPoint:`vs`},fragment:{module:d,entryPoint:`fs`,constants:{MAP_N:t,FACE:n,LODK:r},targets:[{format:n<0?xt:`rgba8unorm`}]}});this.envPipe=f(256,-1,9),this.facePipes=[0,1,2,3,4,5].map(e=>f(512,e,2)),this.envMod=d,this.envKey=null,this.skyModule=e.createShaderModule({code:_t,label:`sky`}),this.byGrid=new Map,this.pipes=new Map,this.uni=e.createBuffer({size:lt*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(lt),this.samp=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`repeat`,maxAnisotropy:2}),this.skySamp=e.createSampler({magFilter:`linear`,minFilter:`linear`}),this.look=new R(e).set(),this.instMax=2048,this.instF=new Float32Array(this.instMax*4),this.inst=e.createBuffer({size:this.instF.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.timestamps=i,i&&(this.qs=e.createQuerySet({type:`timestamp`,count:6}),this.qres=e.createBuffer({size:48,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.qread=[],this.gpu={fft:[],draw:[],post:[],tagged:[]}),this.size=``,this.cpuMs=[],this.doneMs=[],this.readMs=[],this.frameNo=0,this.inFlight=0,this.setVariant({msaa:n,grid:a}),this.modules=[this._grid(a).module,this.skyModule,this.envMod]}_grid(e,t=!1,n=``){let r=this.byGrid.get(`${e} ${t} ${n}`);if(!r){let i=new Uint16Array(e*e*6),a=0;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*(e+1)+n,o=r+1,s=r+e+1,c=s+1;i.set([r,s,o,o,s,c],a),a+=6}let o=this.device.createBuffer({size:i.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(o,0,i),r={module:this.device.createShaderModule({code:ht(e,t,n),label:`water ${e}`}),idx:o},this.byGrid.set(`${e} ${t} ${n}`,r)}return r}_ground(e){return this.groundMods??=new Map,this.groundMods.has(e)||this.groundMods.set(e,this.device.createShaderModule({code:vt(e),label:`ground ${e}`})),this.groundMods.get(e)}setVariant(e={}){let t={...bt,...e},n=JSON.stringify({...t,dbg:0,ground:!0,swell:!0}),r=this.device,i=this.pipes.get(n);if(!i){let e=t.target===`temporal`,a=this._grid(t.grid,t.fsPos,t.interp),o={count:e?1:t.msaa},s=t.target===`hdr`||e?xt:this.format,c=t.depth,l=[{format:s}],u=this.skyModule,d={RIPPLES:+!!t.ripples,FACETS:t.facets,FRAG_SETS:+!!t.fragSets,VS_DISP:+!!t.vsDisp,SHADE:+!!t.shade,DERIV:+!!t.deriv,BURN:t.burn,GAMMA:+!e,REGIMES:t.regimes||0,SUN_FACETS:+!!t.sunFacets};i={water:r.createRenderPipeline({layout:this.layout,label:`water ${n}`,vertex:{module:a.module,entryPoint:`vs`,constants:d,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:a.module,entryPoint:`fs`,constants:d,targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}),sky:r.createRenderPipeline({layout:this.layout,label:`sky`,vertex:{module:u,entryPoint:`vs`},fragment:{module:u,entryPoint:`fs`,constants:{BURN:t.skyBurn,GAMMA:+!e},targets:l},depthStencil:{format:c,depthWriteEnabled:!1,depthCompare:`greater-equal`},multisample:o}),idx:a.idx,ground:this.bedOn?r.createRenderPipeline({layout:this.layout,label:`ground ${t.grid}`,vertex:{module:this._ground(t.grid),entryPoint:`vs`,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:this._ground(t.grid),entryPoint:`fs`,constants:{GAMMA:+!e},targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}):null},this.pipes.set(n,i)}this.variant=t,this.water=i.water,this.sky=i.sky,this.idx=i.idx,this.groundPipe=i.ground,this.msaa=t.target===`temporal`?1:t.msaa,this.grid=t.grid,t.target===`temporal`&&!this.temporal&&(this.temporal=new te(this.device,this.format)),t.target===`hdr`&&!this.blit&&this._makeBlit();for(let e=0;e<this.levels;e++){let n=this.patch0*2**e,r=this.rangeK*n;this.uniF.set([n/t.grid,Ye*r,r,n],tt+4*e)}}setSea(e,t,n={},{micro:r=1,debug:i=0}={}){this.fft=e,this.rip=t,t.setShape(n.ripples),yt(this.uniF,e.sea,e.nS,n,{micro:r,debug:i}),this.debug=i,this.chop=n.chop??1,this._bind()}setBed(e,t=[0,0],n=180,r=void 0){this.bedTex.destroy(),this.bedTex=Ke(this.device,e),this.bedU=Ge(e,t,n,r),this.bedOut.destroy(),this.bedOut=Ke(this.device,e?.outer??null),this.bedOn=!!e,this.pipes.clear(),this.setVariant(this.variant??{}),this.fft&&this._bind()}setWetLine(e){this.bedU[9]=e}setSwell(e){this.swell=e,this.fft&&this._bind()}setLook(e){this.look=e,this.fft&&this._bind()}_bind(){let e=this.fft,t=this.rip;this.bg=this.device.createBindGroup({layout:this.bgl,entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:this.samp},...[...e.out,...t.out].map((e,t)=>({binding:2+t,resource:e.createView({dimension:`2d-array`})})),{binding:7,resource:this.look.rayleigh.createView()},{binding:8,resource:this.look.mie.createView()},{binding:9,resource:this.skySamp},{binding:10,resource:this.bedTex.createView()},{binding:13,resource:this.bedOut.createView()},{binding:11,resource:(this.swell?.out??this.swellNone).createView({dimension:`2d-array`})}]})}_targets(){let e=this.canvas.width,t=this.canvas.height,n=this.variant,r=n.target===`temporal`,i=[e,t,this.msaa,n.target,n.depth,n.rs].join(` `);if(i===this.size)return;this.size=i,this.colorMS?.destroy(),this.depth?.destroy(),this.hdrTex?.destroy(),this.hdrTex=null,this.tColor?.destroy(),this.tColor=null;let a=r?Math.max(1,Math.round(e*n.rs)):e,o=r?Math.max(1,Math.round(t*n.rs)):t;this.renderSize=[a,o];let s=n.target===`hdr`?xt:this.format,c=GPUTextureUsage.RENDER_ATTACHMENT;this.colorMS=this.msaa>1?this.device.createTexture({size:[a,o],format:s,sampleCount:this.msaa,usage:c}):null,this.depth=this.device.createTexture({size:[a,o],format:n.depth,sampleCount:this.msaa,usage:c|(r?GPUTextureUsage.TEXTURE_BINDING:0)}),r&&(this.tColor=this.device.createTexture({size:[a,o],format:xt,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.temporal.resize(a,o,e,t)),n.target===`hdr`&&(this.hdrTex=this.device.createTexture({size:[a,o],format:xt,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.blitBG=this.device.createBindGroup({layout:this.blit.getBindGroupLayout(0),entries:[{binding:0,resource:this.hdrTex.createView()}]}))}_makeBlit(){let e=this.device.createShaderModule({label:`blit`,code:`
@group(0) @binding(0) var src: texture_2d<f32>;
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4f { return textureLoad(src, vec2u(p.xy), 0); }
`});this.blit=this.device.createRenderPipeline({layout:`auto`,label:`blit`,vertex:{module:e,entryPoint:`vs`},fragment:{module:e,entryPoint:`fs`,targets:[{format:this.format}]}})}_select(e,t){let n=this.instF,r=this.patch0,i=this.levels-1,a=e.e,o=e.n,s=e.h,c=e=>[t[e],t[4+e],t[8+e],t[12+e]],l=c(0),u=c(1),d=c(2),f=c(3),p=[f.map((e,t)=>e+l[t]),f.map((e,t)=>e-l[t]),f.map((e,t)=>e+u[t]),f.map((e,t)=>e-u[t]),f.map((e,t)=>e-d[t])],m=(e,t,n)=>{let r=e-a-Ze,i=r+n+12,s=o-t-n-Ze,c=s+n+12;for(let[e,t,n,a]of p)if(e*(e>0?i:r)+t*(t>0?Xe:-12)+n*(n>0?c:s)+a<0)return!1;return!0},h=e=>this.rangeK*r*2**e,g=(e,t,n)=>Math.hypot(Math.max(e-a,0,a-e-n),Math.max(t-o,0,o-t-n),s),_=0,v=this.perLevel=Array(this.levels).fill(0),y=(e,t,i)=>{_<this.instMax&&(n.set([e,t,r*2**i,i],4*_),_++,v[i]++)},b=(e,t,n)=>{let i=r*2**n,a=g(e,t,i);if(a>h(n))return!1;if(!m(e,t,i))return!0;if(n===0||a>h(n-1))return y(e,t,n),!0;let o=i/2;for(let[r,i]of[[0,0],[o,0],[0,o],[o,o]])!b(e+r,t+i,n-1)&&m(e+r,t+i,o)&&y(e+r,t+i,n-1);return!0},x=r*2**i,S=h(i);for(let e=Math.floor((a-S)/x);e<=Math.floor((a+S)/x);e++)for(let t=Math.floor((o-S)/x);t<=Math.floor((o+S)/x);t++)b(e*x,t*x,i);return _}ready(){return this.inFlight<$e}frame(e,t,{exposure:n=1.4,chop:r=this.chop??1,sunDir:i=[.3,.45,-.84],load:a=1,tag:o=null}={}){let s=performance.now(),c=this.device;this._targets();let[l,u]=this.renderSize,d=this.uniF,f=this.variant.target===`temporal`,p=Math.cos(e.yaw),m=Math.sin(e.yaw),h=Math.cos(e.pitch),g=Math.sin(e.pitch),_=[m*h,g,-p*h],v=[p,0,m],y=[v[1]*_[2]-v[2]*_[1],v[2]*_[0]-v[0]*_[2],v[0]*_[1]-v[1]*_[0]],b=[0,e.h,0],x=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],S=[v[0],y[0],-_[0],0,v[1],y[1],-_[1],0,v[2],y[2],-_[2],0,-x(v,b),-x(y,b),x(_,b),1],C=l/u,w=Math.tan(e.fov*Math.PI/360),T=[1/(C*w),0,0,0,0,1/w,0,0,0,0,0,-1,0,0,.05,0],E=wt(T,S),D=E,O=[0,0];if(f){O=this.temporal.jitter?F(this.frameNo):[0,0];let t=T.slice();t[8]=-2*O[0]/l,t[9]=-2*O[1]/u,D=wt(t,S);let n=this.prevCam??[e.e,e.n],r=[1,0,0,0,0,1,0,0,0,0,1,0,e.e-n[0],0,-(e.n-n[1]),1],i=Math.hypot(e.e-n[0],e.n-n[1])>50||!this.prevVP;i&&this.temporal.reset(),this.reproj=wt(wt(i?E:this.prevVP,r),ne(E)),this.prevVP=E,this.prevCam=[e.e,e.n]}d.set(D,0),d.set([e.e,e.h,e.n,t],16);let k=Math.hypot(...i);d.set([i[0]/k,i[1]/k,i[2]/k,Qe],20),d.set([l,u,1/l,1/u],24),d.set([this.fft.nS,r,n,f?this.variant.detail??.5*this.variant.rs:1],28),d.set(this.look.values,rt),d.set(this.bedU,it);let A=this.variant.swell?this.swell:null;d.set(A?A.map:[0,0,0,0],at),d.set(A?.wash??[0,0,0,0],ot),d.set(A?.sea??[0,0,0,0],st),d[59]=(this.debug??0)|this.variant.dbg,d.set([v[0]*w*C,v[1]*w*C,v[2]*w*C,0,y[0]*w,y[1]*w,y[2]*w,0,_[0],_[1],_[2],0],32);let j=this._select(e,D);c.queue.writeBuffer(this.uni,0,d),c.queue.writeBuffer(this.inst,0,this.instF,0,j*4);let M=c.createCommandEncoder(),ee=this.timestamps,N=M.beginComputePass(ee?{timestampWrites:{querySet:this.qs,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});this.fft.encode(N,t),this.rip.encode(N,t),A?.encode(N,t,this.variant.swellCull===!1||f||ut?null:{vp:E,cam:[e.e,e.n],frame:[this.bedU[0],this.bedU[1],this.bedU[2],this.bedU[3]]}),N.end();let P=`${this.look.version} ${d[20].toFixed(5)} ${d[21].toFixed(5)} ${d[22].toFixed(5)}`,te=(e,t)=>{let n=M.beginRenderPass({colorAttachments:[{view:e,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]});n.setPipeline(t),n.setBindGroup(0,this.bg),n.draw(3),n.end()},re=(e,t)=>e.createView({dimension:`2d`,baseArrayLayer:t,arrayLayerCount:1});if(P!==this.envKey){if(this.envKey=P,te(this.env.createView(),this.envPipe),this.domeReady)this.domeStrip=0;else{for(let e=0;e<6;e++)te(re(this.domes[this.domeFront],e),this.facePipes[e]);this.domeReady=!0}}this.domeStrip>=0&&(te(re(this.domes[1-this.domeFront],this.domeStrip),this.facePipes[this.domeStrip]),++this.domeStrip===6&&(this.domeFront=1-this.domeFront,this.domeStrip=-1));let I=this.ctx.getCurrentTexture().createView(),L=this.tColor?this.tColor.createView():this.hdrTex?this.hdrTex.createView():I;for(let e=0;e<a;e++){let t=ee&&(e===0||e===a-1)?{querySet:this.qs,...e===0?{beginningOfPassWriteIndex:2}:{},...e===a-1?{endOfPassWriteIndex:3}:{}}:null,n=M.beginRenderPass({colorAttachments:[this.colorMS?{view:this.colorMS.createView(),resolveTarget:L,loadOp:`clear`,storeOp:`discard`,clearValue:[0,0,0,1]}:{view:L,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:this.tColor?`store`:`discard`},...t?{timestampWrites:t}:{}});n.setBindGroup(0,this.bg),n.setBindGroup(1,this.bgEnvs[this.domeFront]),j&&this.groundPipe&&this.variant.ground&&(n.setPipeline(this.groundPipe),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,j)),j&&(n.setPipeline(this.water),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,j)),n.setPipeline(this.sky),n.draw(3),n.end()}if(this.tColor&&this.temporal.resolve(M,this.tColor.createView(),this.depth.createView(),this.reproj,[O[0],-O[1]],I,ee?{querySet:this.qs,beginningOfPassWriteIndex:4,endOfPassWriteIndex:5}:null),this.hdrTex){let e=M.beginRenderPass({colorAttachments:[{view:I,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}]});e.setPipeline(this.blit),e.setBindGroup(0,this.blitBG),e.draw(3),e.end()}let R=null,z=this.tColor?6:4;ee&&(M.resolveQuerySet(this.qs,0,z,this.qres,0),R=this.qread.pop()??c.createBuffer({size:48,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),M.copyBufferToBuffer(this.qres,0,R,0,8*z)),c.queue.submit([M.finish()]),this.inFlight++;let B=performance.now();c.queue.onSubmittedWorkDone().then(()=>{this.inFlight--,Ct(this.doneMs,performance.now()-B)}).catch(()=>{this.inFlight--});let ie=++this.frameNo;R&&R.mapAsync(GPUMapMode.READ).then(()=>{Ct(this.readMs,performance.now()-B);let e=new BigUint64Array(R.getMappedRange()),t=Number(e[1]-e[0])/1e6,n=z===6?Number(e[5]-e[4])/1e6:0,r=Number(e[3]-e[2])/1e6+n;Ct(this.gpu.fft,t),Ct(this.gpu.draw,r),Ct(this.gpu.post,n),this.gpu.count=(this.gpu.count??0)+1,o!=null&&Ct(this.gpu.tagged,{tag:o,fft:t,draw:r,post:n,lag:this.frameNo-ie}),R.unmap(),this.qread.push(R)}).catch(()=>{}),this.patches=j,this.vertices=j*(this.grid+1)**2,Ct(this.cpuMs,performance.now()-s)}};function Ct(e,t){e.push(t),e.length>1200&&e.splice(0,600)}function wt(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}var Tt=9.81,Et={hs:1.2,tp:10,gamma:3.3,spread:10,offNormal:0,seed:3};function Dt(e,t,n){let r=Math.sqrt(e*(Tt*t*t/(2*Math.PI))),i=.35*n*r,a=.75*n*r,o=.06*r;return{setup:i,sInc:a,sIG:o,R2:1.1*(i+Math.hypot(a,o)/2)}}var q=new URLSearchParams(location.search),J=(e,t)=>q.get(e)==null?t:Number(q.get(e)),Ot=document.getElementById(`hud`),Y=document.getElementById(`view`),X={ready:!1,done:!1,errors:[],frames:0,fft:[],draw:[],wall:[]};window.__sim2=X;var kt=e=>{X.errors.length>=20||X.errors.includes(e)||(X.errors.push(e),Ot.textContent=`${Ot.textContent}\n${e}`,console.error(e))},Z=e=>{if(!e.length)return null;let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},At=e=>{q.get(`post`)&&fetch(`./__report`,{method:`POST`,body:e}).catch(()=>{})},Q=e=>e==null?`-`:e.toFixed(1),$=e=>e==null?`-`:e.toFixed(2),jt=typeof matchMedia<`u`&&matchMedia(`(pointer: coarse)`).matches,Mt=q.get(`dpr`)==null?Math.min(devicePixelRatio,Math.min(innerWidth,innerHeight)<600?2:devicePixelRatio,jt?Math.sqrt(25e5/(innerWidth*innerHeight)):1/0):J(`dpr`,devicePixelRatio),Nt=Mt>=1.5?1:.75*Mt,Pt=Mt;function Ft(){let e=Pt,t=(q.get(`size`)??``).split(`x`).map(Number);Y.width=t[0]||Math.round(innerWidth*e),Y.height=t[1]||Math.round(innerHeight*e),t[1]&&(Y.style.width=`${Y.width/e}px`,Y.style.height=`${Y.height/e}px`)}function It(e,t){let n=0,r=0,i=3,a=0,o=0,s=!1;return(c,l=!1)=>{let u=e.gpu;if(!u)return;if(l||document.hidden){s=!0;return}if(s){s=!1,i=3,o=u.count??0,a=c+1e3;return}if(c<a)return;a=c+1e3;let d=Math.min((u.count??0)-o,u.fft.length,u.draw.length);if(o=u.count??0,i>0){i--;return}if(d<5)return;let f=Z(u.fft.slice(-d)),p=Z(u.draw.slice(-d)),m=f+p;n=m>.9*t?n+1:0,r=m<.55*t?r+1:0;let h=Pt;n>=2?h=Math.max(Nt,Pt*Math.sqrt(Math.min(1,Math.max(.6,(.8*t-f)/Math.max(p,.001))))):r>=5&&(h=Math.min(Mt,Pt*Math.sqrt(1.125))),Math.abs(h-Pt)>.02&&(Pt=h,Ft(),n=0,r=0,i=3,tn=`resolution ${Pt.toFixed(2)}x (the load governor: GPU ${m.toFixed(1)} ms against a ${t.toFixed(1)} ms budget)`)}}var Lt=.7;function Rt(e,t=()=>0){let n={e:0,n:0,h:J(`eye`,1.1),yaw:(q.get(`yaw`)==null?e.headingDeg??0:J(`yaw`,0))*Math.PI/180,pitch:J(`pitch`,-6)*Math.PI/180,fov:J(`fov`,70)},r=new Set,i=J(`speed`,3.5),a=J(`turn`,0)*Math.PI/180;addEventListener(`keydown`,e=>r.add(e.key.toLowerCase())),addEventListener(`keyup`,e=>r.delete(e.key.toLowerCase()));let o=new Map,s=null,c=performance.now(),l={e:0,n:0,h:0},u=()=>{let e=0,t=0;for(let n of o.values())e+=n.x,t+=n.y;return{x:e/o.size,y:t/o.size,n:o.size}},d=()=>[Math.sin(n.yaw),Math.cos(n.yaw)],f=()=>[Math.cos(n.yaw),-Math.sin(n.yaw)],p=(e,t,r,i)=>{let[a,o]=d(),[s,c]=f(),u=a*e+s*t,p=o*e+c*t;n.e+=u,n.n+=p,n.h=Math.max(.3,Math.min(3e3,n.h+r));let h=1/Math.max(.016,i),g=3*Math.max(4,n.h),_=e=>Math.max(-g,Math.min(g,e));l.e=_(u*h),l.n=_(p*h),l.h=_(r*h)*.5,m=performance.now(),n.lastInput=m},m=0,h=()=>{if(n.pitch>=-.005)return null;let e=Math.max(.3,n.h)/Math.tan(-n.pitch);return e>5e3?null:{e:n.e+Math.sin(n.yaw)*e,n:n.n+Math.cos(n.yaw)*e,D:e}},g=e=>{let t=h();t&&(n.yaw+=e,n.e=t.e-Math.sin(n.yaw)*t.D,n.n=t.n-Math.cos(n.yaw)*t.D,l.e=0,l.n=0,m=performance.now(),n.lastInput=m)};Y.addEventListener(`contextmenu`,e=>e.preventDefault()),Y.addEventListener(`pointerdown`,e=>{n.lastInput=performance.now(),o.set(e.pointerId,{x:e.clientX,y:e.clientY,two:e.pointerType===`mouse`&&e.button===2}),Y.setPointerCapture(e.pointerId),s=o.size>1?u():null,c=performance.now()}),Y.addEventListener(`pointermove`,e=>{let t=o.get(e.pointerId);if(t){if(o.size===1&&t.two){let r=performance.now(),i=(r-c)/1e3,a=Math.max(1,n.h)*.006;e.altKey?(p(0,0,-(e.clientY-t.y)*a,i),g(-(e.clientX-t.x)*.004)):(n.yaw+=(e.clientX-t.x)*.004,p((e.clientY-t.y)*a,0,0,i)),c=r}else o.size===1&&(n.yaw+=(e.clientX-t.x)*.004,n.pitch=Math.max(-1.5,Math.min(1.2,n.pitch-(e.clientY-t.y)*.004)));if(t.x=e.clientX,t.y=e.clientY,o.size>1&&s&&s.n===o.size){let e=u(),t=e.x-s.x,r=e.y-s.y,i=performance.now(),a=(i-c)/1e3,l=Math.max(1,n.h)*.006;o.size===2?(n.yaw+=t*.004,p(r*l,0,0,a)):p(0,-t*l,r*l*.6,a),s=e,c=i}}});let _=e=>{o.delete(e.pointerId),s=o.size>1?u():null,c=performance.now()};Y.addEventListener(`pointerup`,_),Y.addEventListener(`pointercancel`,_);let v=performance.now();Y.addEventListener(`wheel`,e=>{e.preventDefault();let t=performance.now(),r=Math.min(.1,(t-v)/1e3),i=Math.max(1,n.h)*.004,a=e.deltaMode===1?16:1;v=t;let o=e.deltaX*a,s=e.deltaY*a;e.ctrlKey?p(0,0,-s*i*2,r):e.altKey?(p(0,0,-s*i*1.5,r),g(-o*.003)):e.shiftKey?(n.yaw+=o*.003,n.pitch=Math.max(-1.5,Math.min(1.2,n.pitch-s*.003))):p(-s*i,o*i,0,r)},{passive:!1});let y=q.get(`drone`)==null?q.get(`scene`)!=null:q.get(`drone`)!==`0`;return n.step=e=>{let s=e=>r.has(e),c=+!!s(`w`)-!!s(`s`),u=+!!s(`d`)-!!s(`a`);if(y){let r=3*Math.max(4,n.h)*e,i=+!!s(`e`)-!!s(`q`);l.e+=(Math.sin(n.yaw)*c+Math.cos(n.yaw)*u)*r,l.n+=(Math.cos(n.yaw)*c-Math.sin(n.yaw)*u)*r,l.h+=i*r;let a=o.size>=2||performance.now()-m<60,d=a?1:Math.exp(-e/Lt);a||(n.e+=l.e*e,n.n+=l.n*e,n.h+=l.h*e),l.e*=d,l.n*=d,l.h*=d;let f=Math.max(t(n.e,n.n),0)+.3;n.h<f&&(n.h=f,l.h=Math.max(l.h,0)),n.h=Math.min(n.h,3e3),s(`arrowleft`)&&(n.yaw-=e),s(`arrowright`)&&(n.yaw+=e),s(`arrowup`)&&(n.pitch=Math.min(1.2,n.pitch+e*.6)),s(`arrowdown`)&&(n.pitch=Math.max(-1.5,n.pitch-e*.6)),n.speed=Math.hypot(l.e,l.n),n.climb=l.h,n.ground=t(n.e,n.n);return}let d=r.size?Math.max(i,3.5)*4*Math.max(1,n.h/10):y?0:i,f=r.size?c:1;n.e+=(Math.sin(n.yaw)*f+Math.cos(n.yaw)*u)*d*e,n.n+=(Math.cos(n.yaw)*f-Math.sin(n.yaw)*u)*d*e,r.size||(n.yaw+=a*e),s(`arrowleft`)&&(n.yaw-=e),s(`arrowright`)&&(n.yaw+=e),s(`arrowup`)&&(n.pitch=Math.min(1.2,n.pitch+e*.6)),s(`arrowdown`)&&(n.pitch=Math.max(-1.4,n.pitch-e*.6)),s(`q`)&&(n.h=Math.max(.3,n.h*Math.exp(-e))),s(`e`)&&(n.h=Math.min(3e3,n.h*Math.exp(e)))},n}function zt(){let e=document.createElement(`canvas`),t=Math.min(2,devicePixelRatio||1);e.width=150*t,e.height=224*t,e.style.cssText=`position:fixed;top:8px;right:8px;width:150px;height:224px;pointer-events:none;z-index:5`,document.body.appendChild(e);let n=e.getContext(`2d`);n.scale(t,t);let r=[`N`,`NE`,`E`,`SE`,`S`,`SW`,`W`,`NW`];return e=>{let t=e.pitch*180/Math.PI,i=69/45,a=(e.yaw*180/Math.PI%360+360)%360,o=75+t*i;n.clearRect(0,0,150,224),n.save(),n.beginPath(),n.arc(75,75,69,0,2*Math.PI),n.clip(),n.fillStyle=`#3b7fc4`,n.fillRect(0,0,150,150),n.fillStyle=`#8a6a3c`,n.fillRect(0,o,150,150),n.strokeStyle=`#fff`,n.lineWidth=2,n.beginPath(),n.moveTo(0,o),n.lineTo(150,o),n.stroke(),n.lineWidth=1,n.font=`9px system-ui`,n.fillStyle=`#fff`,n.textAlign=`left`;for(let e=-80;e<=80;e+=10){if(!e)continue;let t=o-e*i,r=e%20?10:20;t<6||t>144||(n.beginPath(),n.moveTo(75-r,t),n.lineTo(75+r,t),n.stroke(),e%20||n.fillText(String(e),75+r+3,t+3))}n.restore(),n.strokeStyle=`#fc3`,n.lineWidth=2.5,n.beginPath(),n.moveTo(47,75),n.lineTo(66,75),n.lineTo(75,81),n.lineTo(84,75),n.lineTo(103,75),n.stroke(),n.strokeStyle=`rgba(255,255,255,0.8)`,n.lineWidth=1.5,n.beginPath(),n.arc(75,75,69,0,2*Math.PI),n.stroke(),n.fillStyle=`rgba(0,0,0,0.55)`,n.fillRect(0,150,150,74),n.fillStyle=`#fff`,n.textAlign=`center`,n.font=`bold 13px system-ui`,n.fillText(`${String(Math.round(a)).padStart(3,`0`)}° ${r[Math.round(a/45)%8]}`,75,166),n.font=`12px system-ui`,n.textAlign=`left`;let s=e.h-Math.max(e.ground??0,0);n.fillText(`height ${e.h<10?e.h.toFixed(1):Math.round(e.h)} m`,8,184),n.fillText(`above ${(e.ground??0)>0?`ground`:`water`} ${s<10?s.toFixed(1):Math.round(s)} m`,8,200),n.fillText(`pitch ${Math.round(t)}°  speed ${(e.speed??0).toFixed(1)} m/s`,8,216)}}function Bt(){let e=new URLSearchParams(location.search),t=document.createElement(`div`);t.style.cssText=`position:fixed;right:8px;bottom:8px;display:flex;flex-direction:column;gap:4px;font:12px system-ui;z-index:6;background:rgba(0,0,0,.55);padding:6px;border-radius:6px;color:#fff`;let n=e=>{let t=new URLSearchParams(location.search);for(let[n,r]of Object.entries(e))r==null?t.delete(n):t.set(n,r);location.search=t.toString()},r=(e,t,r=!1)=>{let i=document.createElement(`button`);return i.textContent=e,i.style.cssText=`font:12px system-ui;padding:3px 8px;border-radius:4px;border:0;cursor:pointer;background:${r?`#fc3`:`#eee`}`,i.onclick=()=>n(t),i},i=(...e)=>{let n=document.createElement(`div`);n.style.cssText=`display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end`,n.append(...e),t.append(n)},a=e=>{let t=document.createElement(`span`);return t.textContent=e,t.style.cssText=`align-self:center;opacity:.8`,t},o=e.get(`swell`)!==`0`,s=e.get(`seadbg`)===`64`;i(a(`swell`),r(o?`on`:`off`,{swell:o?`0`:null},o),r(`its height alone`,{seadbg:s?null:`64`},s)),i(a(`swell`),...[[`0.6 m`,.6],[`1.2 m`,1.2],[`2 m`,2]].map(([t,n])=>r(t,{hs:n},Number(e.get(`hs`)??1.2)===n)),...[[`7 s`,7],[`10 s`,10],[`14 s`,14]].map(([t,n])=>r(t,{tp:n},Number(e.get(`tp`)??10)===n))),i(a(`view`),r(`paddler`,{eye:1.1,pitch:-4,off:70}),r(`low drone`,{eye:8,pitch:-20,off:60}),r(`aerial`,{eye:220,pitch:-50,off:360}),r(`overhead`,{eye:700,pitch:-89,off:260}));let c=e.get(`rips`)!==`0`,l=Number(e.get(`attach`)??ge.rips.attach),u=e.get(`shore`)!==`0`,d=e.get(`divots`)!==`0`;i(a(`bar`),r(`even`,{rips:`0`,attach:null},!c),...[[`crescentic`,0],[`rips`,ge.rips.attach],[`transverse`,1]].map(([e,t])=>r(e,{rips:null,attach:t===ge.rips.attach?null:t},c&&l===t)),r(d?`divots`:`no divots`,{divots:d?`0`:null},d)),i(a(`shore`),r(u?`cusps, step`:`straight`,{shore:u?`0`:null},u),r(`over a rip`,{eye:260,pitch:-89,off:90,along:ge.rips.at}),r(`toward a rip`,{eye:35,pitch:-24,off:-10,along:ge.rips.at-120,yawrel:40})),document.body.append(t)}var Vt=3,Ht=J(`ramp`,75),Ut=J(`tail`,30),Wt=48;function Gt(e,t){let n=Vt+Ht+Ut,r=[],i=[],a=T(),o=D(),s=null,c=-1,l=0,u=[],d=!1,f=60,p=1,m=e=>e<Vt?`warm`:e<Vt+Ht?`ramp`:e<n?`tail`:null,h=(n,a)=>{let o=e.gpu,s=e=>e?e.splice(0):[],c={s:n,phase:a,load:p,fps:l,frameMs:Z(u),doneMs:Z(s(e.doneMs)),drawMs:Z(s(o?.draw)),computeMs:Z(s(o?.fft)),patches:e.patches};if(a===`warm`?i.push(...u):r.push(c),n===2){let e=i.slice().sort((e,t)=>e-t)[Math.floor(i.length*.1)]??16.7;f=e<11?120:e<22?60:30,t.pacing=k(e)}if(a===`ramp`||n===2){let e=l>=.95*f;p=n===2?1:e?Math.min(Wt,p+Math.max(1,Math.floor(p/4))):Math.max(1,p-(l<.8*f?2:1))}n+1===Vt+Ht&&(p=1),l=0,u=[]},g=()=>{let e=[`display ${f} fps (${t.pacing??`?`})`],n=r.filter(e=>e.phase===`ramp`),i=r.filter(e=>e.phase===`tail`);for(let t=0;t<Ht;t+=10){let r=n.filter(e=>e.s-Vt>=t&&e.s-Vt<t+10).filter(e=>e.fps>=.95*f).map(e=>e.load);e.push(`${t}-${Math.min(Ht,t+10)} s: held ${r.length?`up to ${Math.max(...r)} copies (median ${Z(r)})`:`no second at the display rate`}`)}let a=(e,t)=>Z(e.map(e=>e[t]).filter(e=>e!=null)),o=i.slice(0,5),s=i.slice(-10);return e.push(`then 1 copy: ${Q(a(o,`fps`))} fps in its first 5 s, ${Q(a(s,`fps`))} in its last 10 s; submit to done ${Q(a(o,`doneMs`))} then ${Q(a(s,`doneMs`))} ms`+(t.timestamps?`; GPU sea ${$(a(s,`drawMs`))} ms, compute ${$(a(s,`computeMs`))} ms`:``)),e},_=async()=>{d=!0;let n=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, canvas ${Y.width}x${Y.height}, MSAA ${e.msaa}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets`,`${await w()}, ${o.report()}`];o.release();let i=[`s phase copies fps frame_ms done_ms gpu_sea_ms gpu_compute_ms patches`,...r.map(e=>[e.s,e.phase,e.load,e.fps,Q(e.frameMs),Q(e.doneMs),$(e.drawMs),$(e.computeMs),e.patches].join(` `))],s=g(),c=[...n,``,`The WebGPU sea: the copies a frame held at the display rate, then one copy:`,...s,``,...i,...X.errors.length?[``,...X.errors]:[]].join(`
`);X.measure={rows:r,lines:s,report:c},At(c),a.done({lines:s,report:c,title:`Surfski WebGPU sea measurement`,onSend:()=>O(`Surfski WebGPU sea measurement`,c),onCopy:e=>E(c,e)})};return(e,t)=>{if(d)return null;s??=e;let r=Math.floor((e-s)/1e3),i=m(r);return r!==c&&(c>=0&&h(c,m(c)),c=r,i&&a.progress(i===`warm`?`the WebGPU sea, settling`:i===`ramp`?`the WebGPU sea, ${p} cop${p>1?`ies`:`y`} a frame`:`the WebGPU sea drawn once`,n-r)),i?(l++,u.push(t),p):(_(),null)}}var Kt=Math.max(1,J(`load`,1)),qt=J(`slot`,2.5),Jt=.5,Yt=J(`rounds`,3),Xt=4,Zt=Math.max(1,J(`load`,1)),Qt=.08;function $t(e,t=!1){let n=t=>Math.min(1,Math.sqrt(t/e));return t?[[`full again`,{}],[`no swell (its compute and reads; the bed fades the open sea)`,{swell:!1}],[`no whitewater`,{dbg:1024}],[`no shore wash (its front and lace)`,{dbg:4096}],[`no water’s edge at the pixel’s scale`,{dbg:256}],[`the bed read bilinear only (no cubic)`,{dbg:512}],[`the cover’s patches as their mean`,{dbg:128}],[`all three bed cuts`,{dbg:896}],[`no ground pass`,{ground:!1}],[`no ripples`,{ripples:!1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`1.2 megapixels`,{scale:n(12e5)}],[`one colour (mesh, raster only)`,{shade:!1}]]:[[`full again`,{}],[`MSAA off`,{msaa:1}],[`1.2 megapixels`,{scale:n(12e5)}],[`1.2 megapixels, MSAA off`,{scale:n(12e5),msaa:1}],[`0.6 megapixels`,{scale:n(6e5)}],[`no ripples`,{ripples:!1}],[`sky from 1 facet, not 4`,{facets:1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`flat vertices (no displacement)`,{vsDisp:!1}],[`one colour (mesh, raster, MSAA only)`,{shade:!1}],[`the position among the fragment inputs`,{fsPos:!0}],[`MSAA off, 16 x 16 patches`,{msaa:1,grid:16}],[`one colour, MSAA off`,{shade:!1,msaa:1}],[`half-float target, own resolve (web-ocean)`,{target:`hdr`}],[`half-float target, MSAA off`,{target:`hdr`,msaa:1}],[`depth24plus, not depth32float`,{depth:`depth24plus`}],[`footprint worked out (no derivatives)`,{deriv:!1}],[`footprint worked out, MSAA off`,{deriv:!1,msaa:1}],[`interpolation marked centre`,{interp:`@interpolate(perspective, center)`}],[`added arithmetic (MSAA 4)`,{burn:64}],[`added arithmetic, MSAA off`,{burn:64,msaa:1}],[`added arithmetic in the sky (one big triangle)`,{skyBurn:256}],[`added arithmetic in the sky, MSAA off`,{skyBurn:256,msaa:1}],[`temporal, drawn at 0.7 of the size`,{target:`temporal`,rs:.7}],[`temporal, drawn at 0.5 of the size`,{target:`temporal`,rs:.5}],[`temporal, drawn at full size`,{target:`temporal`,rs:1}],[`temporal, drawn at 0.85 of the size`,{target:`temporal`,rs:.85}],[`every ripple band read in full (no regimes)`,{regimes:0}],[`no regimes, MSAA off`,{regimes:0,msaa:1}],[`both regimes, MSAA off`,{regimes:3,msaa:1}]]}function en(e,t,n,r=!1){let i=q.get(`only`)?.split(`,`).map(Number),a=$t(n[0]*n[1],r).filter((e,t)=>!i||i.includes(t)),o=[];for(let e=0;e<Yt;e++)for(let[e,t]of a)o.push([`full`,{}],[e,t]);o.push([`full`,{}]);let s=Xt+o.length*qt+1.5,c=T(),l=D(),u=o.map(([e])=>({name:e,frames:0,draw:[],post:[],compute:[],lag:[],iv:[],tLast:null})),d=null,f=-2,p=!1,m=null,h={msaa:e.variant.msaa,grid:e.variant.grid},g=([,t])=>{let{scale:r=1,...i}=t;Y.width=Math.round(n[0]*r),Y.height=Math.round(n[1]*r),e.setVariant({...h,...i})};for(let[,t]of a){let{scale:n,...r}=t;e.setVariant({...h,...r})}e.setVariant(h);let _=()=>{for(let t of e.gpu?.tagged.splice(0)??[]){let e=u[t.tag];e&&(e.draw.push(t.draw-t.post),e.post.push(t.post),e.compute.push(t.fft),e.lag.push(t.lag))}},v=async()=>{p=!0,_(),g([`full`,{}]);let r=(e,t)=>{let n=e.slice().sort((e,t)=>e-t);return n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:null},i=u.map((e,t)=>{let n=d+(Xt+(t+1)*qt)*1e3,i=r(e.iv,.5),a=e.frames===0||n-e.tLast>Math.max(500,3*(i??0));return{name:e.name,drawMs:e.draw.length?Z(e.draw)/Zt+Z(e.post):null,postMs:Z(e.post),computeMs:Z(e.compute),fps:e.frames/(qt-Jt),n:e.draw.length,lag:Z(e.lag),p50:i,p95:r(e.iv,.95),partial:a}}),o=i.findIndex((e,t)=>e.fps===0&&i.slice(t).every(e=>e.fps===0)),s=t.timestamps?`drawMs`:`fps`,f=[];for(let[e]of a){let n=[],r=[],a=0;i.forEach((o,c)=>{if(o.name!==e||o.partial||i[c-1]?.partial||i[c+1]?.partial)return;let l=i[c-1]?.[s],u=i[c+1]?.[s],d=o[s];if(l==null||u==null||d==null)return;let f=(l+u)/2;n.push((t.timestamps?f-d:d-f)/f),r.push(f-d),Math.abs(l-u)/f>Qt&&a++}),f.push({name:e,rel:Z(n),lo:n.length?Math.min(...n):null,hi:n.length?Math.max(...n):null,ms:Z(r),pairs:n.length,drift:a})}let m=i.filter(e=>e.name===`full`&&!e.partial),h=e=>e==null?`-`:`${Math.round(e*100)}%`,v=[t.timestamps?`the full picture: ${$(Z(m.map(e=>e.drawMs)))} ms of GPU (${$(m[0]?.drawMs)} at the start, ${$(m[m.length-1]?.drawMs)} at the end), compute ${$(Z(m.map(e=>e.computeMs)))} ms, ${Q(Z(m.map(e=>e.fps)))} fps`:`the full picture: ${Q(Z(m.map(e=>e.fps)))} fps (no GPU timers here: the shares are of frames a second)`,...f.map(e=>`${e.name}: ${t.timestamps?`saves`:`gains`} ${h(e.rel)}${t.timestamps?` (${$(e.ms)} ms)`:``}, ${h(e.lo)} to ${h(e.hi)}${e.drift?`; ${e.drift} of ${e.pairs} pairs drifted`:``}`),`the times came back ${Q(Z(u.flatMap(e=>e.lag)))} frames late; submit to done ${Q(Z(e.doneMs))} ms, to the timers read back ${Q(Z(e.readMs))} ms`];o>=0&&v.push(`no frames from slot ${o} on (about ${Math.round(Xt+o*qt)} s in): the page stopped drawing (the screen locked, or the page was hidden); the slots before it stand`);let y=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, full canvas ${n[0]}x${n[1]}, MSAA 4${Zt>1?`, ${Zt} copies a frame (times per copy)`:``}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets, ${e.patches} patches`,`${await w()}, ${l.report()}`];l.release();let b=[`slot variant gpu_sea_ms gpu_resolve_ms gpu_compute_ms fps samples lag_frames frame_p50_ms frame_p95_ms cut_short`,...i.map((e,t)=>[t,`"${e.name}"`,$(e.drawMs),$(e.postMs),$(e.computeMs),Q(e.fps),e.n,e.lag,Q(e.p50),Q(e.p95),+!!e.partial].join(` `))],x=[...y,``,`The WebGPU sea, part by part (each against the full picture either side of it):`,...v,``,...b,...X.errors.length?[``,...X.errors]:[]].join(`
`);X.sweep={slots:i,rows:f,lines:v,report:x},At(x),c.done({lines:v,report:x,title:`Surfski WebGPU sea parts`,onSend:()=>O(`Surfski WebGPU sea parts`,x),onCopy:e=>E(x,e)})};return{before(e){if(p)return null;d??=e;let t=(e-d)/1e3-Xt,n=t<0?-1:Math.floor(t/qt);if(n>=o.length)return m??=e,e-m>1500?v():_(),null;if(n!==f&&(f=n,n>=0&&g(o[n]),(n===0||n===o.length>>1)&&At(`sweep progress: slot ${n} of ${o.length} at ${Q((e-d)/1e3)} s, ${X.frames} frames${X.errors.length?`; ${X.errors.join(`; `)}`:``}`),c.progress(n>=0?`the WebGPU sea's parts: ${o[n][0]}`:`the WebGPU sea, settling`,s-(e-d)/1e3)),_(),n<0||t-n*qt<Jt)return null;let r=u[n];return r.tLast!=null&&r.iv.push(e-r.tLast),r.tLast=e,r.frames++,n}}}var tn=``;async function nn(){if(!navigator.gpu){kt(`WebGPU is not available in this browser`);return}let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e){kt(`WebGPU: no adapter`);return}let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:t?[`timestamp-query`]:[]});n.addEventListener(`uncapturederror`,e=>kt(`WebGPU error: ${e.error.message}`)),n.lost.then(e=>kt(`WebGPU device lost: ${e.message}`)),Ft(),!q.get(`size`)&&!q.get(`sweep`)&&addEventListener(`resize`,Ft);let r=o(q.get(`course`)??(q.get(`scene`)===`beach`?`perth-trigg-sorrento`:`gorge-swellcity`))??o(`gorge-swellcity`),i=s(r.name),a=i.state.fft.sea,c=a.sets.slice(0,32),l=new ee(n);l.build({...a,sets:c});let u=new St(n,Y,{msaa:J(`msaa`,1),timestamps:t,grid:J(`grid`,32),patch0:J(`patch0`,4),levels:J(`levels`,12),rangeK:J(`rangeK`,6)});q.get(`ground`)===`0`&&u.setVariant({msaa:u.variant.msaa,grid:u.variant.grid,ground:!1});let d=new N(n);for(let e of[...u.modules,...d.modules])for(let t of(await e.getCompilationInfo()).messages)kt(`${e.label} ${t.type} line ${t.lineNum}:${t.linePos} ${t.message}`);u.setSea(l,d,i.state,{micro:J(`ripples`,1),debug:J(`seadbg`,0)});let f=q.get(`scene`)===`beach`?{...ge}:null;if(f){for(let[e,t]of[[`d50`,`d50`],[`faceslope`,`faceSlope`],[`berm`,`berm`],[`dune`,`dune`],[`seed`,`seed`]])q.get(e)!=null&&(f[t]=J(e,f[t]));q.get(`bar`)!=null&&(f.bar={...f.bar,height:J(`bar`,f.bar.height)}),f.rips=q.get(`rips`)===`0`?null:{...f.rips,attach:Math.min(1,Math.max(0,J(`attach`,f.rips.attach))),spacing:Math.max(40,J(`ripspacing`,f.rips.spacing)||f.rips.spacing)},q.get(`shore`)===`0`&&(f.shore=null),f.divots=q.get(`divots`)===`0`?null:{...f.divots,hs:Math.max(0,J(`divhs`,f.divots.hs)),tp:Math.max(2,J(`divtp`,f.divots.tp))},f.facing=J(`facing`,((i.state.dirToDeg??20)+180)%360);let e={hs:J(`hs`,Et.hs),tp:J(`tp`,Et.tp)},t=q.get(`swell`)===`0`?null:Dt(e.hs,e.tp,f.faceSlope);t&&(f.wetLine=t.R2);let r=performance.now(),a=new Worker(new URL(new URL(`bed-texture-worker-hhUHCcwj.js`,import.meta.url).href,``+import.meta.url),{type:`module`});a.onmessage=e=>{f.tex=e.data.inner,f.tex.outer=e.data.outer,f.buildMs=performance.now()-r,X.bedBake={ms:e.data.ms,wallMs:f.buildMs},a.terminate(),u.setBed(f.tex,[0,0],f.facing,f),o&&=(o(),null)},a.postMessage({P:{...f}});let o=null;if(q.get(`swell`)!==`0`){let e={...Et,hs:J(`hs`,Et.hs),tp:J(`tp`,Et.tp),spread:J(`spread`,Et.spread)},r=new Worker(new URL(new URL(`bed-solve-worker-_BwLWRSF.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=performance.now();r.onmessage=e=>{if(e.data.progress){tn=`the bed's wave response: ${e.data.progress[0]} of ${e.data.progress[1]} bins`;return}let a=e.data.result;X.swellSolve={ms:a.ms,wallMs:performance.now()-i,bins:a.bins.length,grid:[a.nx,a.ny]};let s=()=>u.setSwell(new He(n,a,u.bedTex.createView(),f.tex,{u0:Math.floor(a.u0),swash:q.get(`swash`)===`0`?null:t,face:f.faceSlope}));if(f.tex?s():o=s,tn=``,r.terminate(),t&&a.breaking){let e=0,n=0;for(let t=0;t<a.nx;t++)for(let r=0;r<a.ny;r++){let i=4*(r*a.nx+t);if(a.breaking[i+2]>0){e+=a.breaking[i+3],n++;break}}let r=n?e/n:t.setup;X.runup={setup:r,R2:1.1*(r+Math.hypot(t.sInc,t.sIG)/2)},u.setWetLine(X.runup.R2)}},r.postMessage({P:{...f},swell:e,opts:{cell:2}})}}let p=q.get(`regimes`)==null?1:J(`regimes`,1);if(q.get(`aa`)===`temporal`?u.setVariant({target:`temporal`,rs:J(`rs`,.7),detail:q.get(`detail`)==null?null:J(`detail`,1),regimes:p}):p!==1&&u.setVariant({msaa:u.msaa,grid:u.grid,regimes:p}),q.get(`v`)){let e=Object.fromEntries(q.get(`v`).split(`,`).map(e=>e.split(`:`)).filter(([e,t])=>e in bt&&t!=null).map(([e,t])=>[e,t===`true`?!0:t===`false`?!1:Number.isNaN(Number(t))?t:Number(t)]));u.setVariant({...u.variant,...e})}if(u.temporal)for(let[e,t]of[[`twmax`,`wMax`],[`twsoft`,`wSoft`],[`tsign`,`sigN`],[`tsigw`,`sigW`],[`tsharp`,`sharpen`]])q.get(e)!=null&&(u.temporal[t]=J(e,0));u.temporal&&q.get(`jitter`)===`0`&&(u.temporal.jitter=!1);let m=Rt(i,f?(e,t)=>{let n=f.facing*Math.PI/180,r=Math.sin(n),i=Math.cos(n);return Me(e*i-t*r,e*r+t*i,f).y}:()=>-1e3),h=J(`frames`,0);X.cam=m;let g=performance.now();addEventListener(`keydown`,()=>{g=performance.now()}),addEventListener(`wheel`,()=>{m.lastInput=performance.now()},{passive:!0});let _=()=>g,v=(q.get(`drone`)==null?q.get(`scene`):q.get(`drone`)!==`0`)&&q.get(`instruments`)!==`0`?zt():null;if(f&&q.get(`trial`)!==`0`&&!q.get(`frames`)&&!q.get(`probe`)&&Bt(),f){let e=f.facing*Math.PI/180,t=q.get(`off`)==null,n=J(`off`,-8),r=J(`along`,t?11:0);m.e=Math.sin(e)*n+Math.cos(e)*r,m.n=Math.cos(e)*n-Math.sin(e)*r,q.get(`yawrel`)==null?q.get(`yaw`)??(m.yaw=t?e+16*Math.PI/180:e+Math.PI):m.yaw=e+J(`yawrel`,0)*Math.PI/180,t&&q.get(`eye`)==null&&(m.h=14.4),t&&q.get(`pitch`)==null&&(m.pitch=-20.6*Math.PI/180)}let y=i.look??{},b=J(`sunaz`,y.sunAz??200),x=J(`sunel`,y.sunEl??30);u.setLook(new R(n).set({sunElDeg:x,haze:q.get(`haze`)??y.haze??null,teal:J(`teal`,f?.85:y.teal??.6),turbid:J(`turbid`,f?0:y.turbid??0),bottom:f?[1,1,1]:y.bottom??null,glint:J(`glint`,1.3),cloud:J(`cloud`,y.cloud??.35),cloudType:J(`cloudtype`,y.cloudType??.25),cloudVar:J(`cloudvar`,y.cloudVar??.4),cloudDark:J(`clouddark`,y.cloudDark??0)}));let S=b*Math.PI/180,C=x*Math.PI/180,w={sunDir:[Math.sin(S)*Math.cos(C),Math.sin(C),-Math.cos(S)*Math.cos(C)]};X.info={course:r.id,adapter:`${e.info?.vendor??``} ${e.info?.architecture??``}`.trim()||`unknown`,timestamps:t,sets:c.length,msaa:u.msaa};let T=q.get(`measure`)?Gt(u,X.info):null,E=q.get(`sweep`)?en(u,X.info,[Y.width,Y.height],!!f):null,D=performance.now(),O=0,k=1,A=q.get(`freeze`)==null?null:J(`freeze`,100),j=q.get(`freezesea`)==null?null:J(`freezesea`,100),M=!q.get(`noqueuecap`),P=q.get(`dt`)==null?null:J(`dt`,1/60),F=null;if(!q.get(`probe`)&&!q.get(`frames`)&&[`127.0.0.1`,`localhost`,`[::1]`].includes(location.hostname)){let e=document.createElement(`div`);e.style.cssText=`position:fixed;inset:auto 0 40% 0;margin:auto;width:fit-content;padding:10px 16px;background:rgba(0,0,0,.75);color:#fff;font:15px system-ui;border-radius:8px;display:none;z-index:9`,document.body.appendChild(e);let t=()=>fetch(`/__probe`).then(e=>e.json()).then(t=>{F=t.busy?t:null,e.style.display=t.busy?`block`:`none`,t.busy&&(e.textContent=`Paused: a performance probe is running (${t.why}; about ${t.left} s left)`)}).catch(()=>{}).finally(()=>setTimeout(t,1500));t()}let te=J(`idlefps`,20),ne=J(`fps`,60),re=!(q.get(`measure`)||q.get(`sweep`)||q.get(`frames`))&&(q.get(`gov`)===`1`||q.get(`gov`)!==`0`&&!q.get(`probe`)&&q.get(`freeze`)==null&&!q.get(`size`))?It(u,J(`budget`,1e3/30)):null,I=0,L=e=>{if(F){D=e,requestAnimationFrame(L);return}let t=!h&&!E&&!T&&(!document.hasFocus()||e-Math.max(m.lastInput??0,_())>1e4);if(!h&&!E&&!T&&e-I<1e3/(t?te:ne)-2){requestAnimationFrame(L);return}if(I=e,M&&!u.ready()){X.skipped=(X.skipped??0)+1,requestAnimationFrame(L);return}let n=P??Math.min(.1,(e-D)/1e3);D=e,O+=n;let r=!f||!!f.tex&&(q.get(`swell`)===`0`||!!u.swell);k=T&&r?T(e,n*1e3)??1:E&&r?Zt:T||E?1:Kt;let i=r?E?.before(e)??null:null;if(A==null&&!E&&m.step(n),u.frame(m,X.freeze??A??j??100+O,{...w,load:k,tag:i}),r&&re?.(e,t),v?.(m),X.frames++,X.wall.push(n*1e3),X.wall.length>1200&&X.wall.splice(0,600),X.ready=!0,X.frames%20==0){let e=u.gpu,t=Z(X.wall.slice(-60));Ot.textContent=`${Y.width}x${Y.height}, MSAA ${u.msaa}, ${c.length} sets, ${u.patches} patches${k>1?`, drawn ${k} times`:``}\nframe ${Q(t)} ms${e?`; GPU: FFT and ripples ${$(Z(e.fft.slice(-60)))} ms, sea and sky ${$(Z(e.draw.slice(-60)))} ms`:`; submit to done ${Q(Z(u.doneMs.slice(-60)))} ms`}\neye ${m.h.toFixed(1)} m, pitch ${(m.pitch*180/Math.PI).toFixed(0)}°${tn?`\n${tn}`:``}${X.errors.length?`\n${X.errors.join(`
`)}`:``}`}if(h&&X.frames>=h){let e=u.gpu;Object.assign(X,{done:!0,fftMs:e?Z(e.fft.slice(10)):null,drawMs:e?Z(e.draw.slice(10)):null,postMs:e?Z(e.post.slice(10)):null,frameMs:Z(X.wall.slice(10)),doneMs:Z(u.doneMs.slice(10)),patches:u.patches,perLevel:u.perLevel,vertices:u.vertices,cpuMs:Z(u.cpuMs.slice(10)),size:[Y.width,Y.height]}),X.fft=e?.fft??[],X.draw=e?.draw??[],At([navigator.userAgent,location.href,`canvas ${Y.width}x${Y.height}, rendered ${u.renderSize?.join(`x`)}`,`GPU: compute ${$(X.fftMs)} ms, sea and sky with resolve and present ${$(X.drawMs)} ms, of which resolve and present ${$(X.postMs)} ms; frame ${Q(X.frameMs)} ms`].join(`
`))}else requestAnimationFrame(L)};requestAnimationFrame(L)}nn().catch(e=>kt(`sim2 failed: ${e.message}`));