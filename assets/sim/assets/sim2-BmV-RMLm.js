/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,s as t,t as n}from"./fftsea-BlV7h9PB.js";import{_ as r}from"./seas-CiqO6vxw.js";import{i}from"./scenarios-CUIjf6SF.js";import{a,c as o,d as s,f as c,i as l,l as u,m as d,n as f,o as p,p as m,r as h,s as g,t as _,u as v}from"./atmosphere-CzlQdgsZ.js";import"./fftgpu-CavxKjr5.js";import{i as y,o as b}from"./wave-solve-YKJxEQBO.js";import{f as x,l as S,n as C,o as w,s as T,u as E}from"./perf-measure-mz5jO15u.js";import{n as D}from"./ripcascade-CufHP4RE.js";import{n as O,t as k}from"./clouds-Dpdjb2rK.js";import{n as A,t as j}from"./ripples-webgpu-DC01rn5d.js";var M=`
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
}`;function ee(e){let t=(e,t)=>{let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r},n=e%8+1;return[t(n,2)-.5,t(n,3)-.5]}var N=class{constructor(e,t,{wMax:n=12,wSoft:r=2,sigN:i=.35,sigW:a=.45,sharpen:o=0,jitter:s=!0}={}){Object.assign(this,{device:e,wMax:n,wSoft:r,sigN:i,sigW:a,sharpen:o,jitter:s});let c=e.createShaderModule({code:M,label:`temporal resolve`});this.modules=[c],this.pipe=e.createRenderPipeline({layout:`auto`,label:`temporal resolve`,vertex:{module:c,entryPoint:`vs`},fragment:{module:c,entryPoint:`fs`,targets:[{format:t},{format:`rgba16float`}]}}),this.uni=e.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(32),this.lin=e.createSampler({magFilter:`linear`,minFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),this.size=``,this.hist=[],this.cur=0,this.valid=!1}resize(e,t,n,r){let i=[e,t,n,r].join(` `);if(i!==this.size){this.size=i,this.inSize=[e,t],this.outSize=[n,r];for(let e of this.hist)e.destroy();this.hist=[0,1].map(()=>this.device.createTexture({size:[n,r],format:`rgba16float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),this.valid=!1}}reset(){this.valid=!1}resolve(e,t,n,r,i,a,o=null){let s=this.device,c=this.hist[this.cur],l=this.hist[1-this.cur],u=this.outSize[0]/this.inSize[0];this.uniF.set(r,0),this.uniF.set([...this.inSize,...this.outSize,i[0],i[1],this.wMax,+!!this.valid,u,this.sharpen,this.sigN,Math.max(this.sigW,.5*u),this.wSoft,0,0,0],16),s.queue.writeBuffer(this.uni,0,this.uniF);let d=s.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:t},{binding:2,resource:n},{binding:3,resource:c.createView()},{binding:4,resource:this.lin}]}),f=e.beginRenderPass({colorAttachments:[{view:a,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]},{view:l.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],...o?{timestampWrites:o}:{}});f.setPipeline(this.pipe),f.setBindGroup(0,d),f.draw(3),f.end(),this.cur=1-this.cur,this.valid=!0}};function P(e){let t=Array.from(e),n=new Float32Array(16);n[0]=t[5]*t[10]*t[15]-t[5]*t[11]*t[14]-t[9]*t[6]*t[15]+t[9]*t[7]*t[14]+t[13]*t[6]*t[11]-t[13]*t[7]*t[10],n[4]=-t[4]*t[10]*t[15]+t[4]*t[11]*t[14]+t[8]*t[6]*t[15]-t[8]*t[7]*t[14]-t[12]*t[6]*t[11]+t[12]*t[7]*t[10],n[8]=t[4]*t[9]*t[15]-t[4]*t[11]*t[13]-t[8]*t[5]*t[15]+t[8]*t[7]*t[13]+t[12]*t[5]*t[11]-t[12]*t[7]*t[9],n[12]=-t[4]*t[9]*t[14]+t[4]*t[10]*t[13]+t[8]*t[5]*t[14]-t[8]*t[6]*t[13]-t[12]*t[5]*t[10]+t[12]*t[6]*t[9],n[1]=-t[1]*t[10]*t[15]+t[1]*t[11]*t[14]+t[9]*t[2]*t[15]-t[9]*t[3]*t[14]-t[13]*t[2]*t[11]+t[13]*t[3]*t[10],n[5]=t[0]*t[10]*t[15]-t[0]*t[11]*t[14]-t[8]*t[2]*t[15]+t[8]*t[3]*t[14]+t[12]*t[2]*t[11]-t[12]*t[3]*t[10],n[9]=-t[0]*t[9]*t[15]+t[0]*t[11]*t[13]+t[8]*t[1]*t[15]-t[8]*t[3]*t[13]-t[12]*t[1]*t[11]+t[12]*t[3]*t[9],n[13]=t[0]*t[9]*t[14]-t[0]*t[10]*t[13]-t[8]*t[1]*t[14]+t[8]*t[2]*t[13]+t[12]*t[1]*t[10]-t[12]*t[2]*t[9],n[2]=t[1]*t[6]*t[15]-t[1]*t[7]*t[14]-t[5]*t[2]*t[15]+t[5]*t[3]*t[14]+t[13]*t[2]*t[7]-t[13]*t[3]*t[6],n[6]=-t[0]*t[6]*t[15]+t[0]*t[7]*t[14]+t[4]*t[2]*t[15]-t[4]*t[3]*t[14]-t[12]*t[2]*t[7]+t[12]*t[3]*t[6],n[10]=t[0]*t[5]*t[15]-t[0]*t[7]*t[13]-t[4]*t[1]*t[15]+t[4]*t[3]*t[13]+t[12]*t[1]*t[7]-t[12]*t[3]*t[5],n[14]=-t[0]*t[5]*t[14]+t[0]*t[6]*t[13]+t[4]*t[1]*t[14]-t[4]*t[2]*t[13]-t[12]*t[1]*t[6]+t[12]*t[2]*t[5],n[3]=-t[1]*t[6]*t[11]+t[1]*t[7]*t[10]+t[5]*t[2]*t[11]-t[5]*t[3]*t[10]-t[9]*t[2]*t[7]+t[9]*t[3]*t[6],n[7]=t[0]*t[6]*t[11]-t[0]*t[7]*t[10]-t[4]*t[2]*t[11]+t[4]*t[3]*t[10]+t[8]*t[2]*t[7]-t[8]*t[3]*t[6],n[11]=-t[0]*t[5]*t[11]+t[0]*t[7]*t[9]+t[4]*t[1]*t[11]-t[4]*t[3]*t[9]-t[8]*t[1]*t[7]+t[8]*t[3]*t[5],n[15]=t[0]*t[5]*t[10]-t[0]*t[6]*t[9]-t[4]*t[1]*t[10]+t[4]*t[2]*t[9]+t[8]*t[1]*t[6]-t[8]*t[2]*t[5];let r=t[0]*n[0]+t[1]*n[4]+t[2]*n[8]+t[3]*n[12];for(let e=0;e<16;e++)n[e]/=r;return n}var F=`
// lk[0] exposure x white balance (rgb); [1] the sun's disc radiance; [2] the sun's irradiance (both exposed); [3] the air's extinction at the
// sea (1/m); [4] the haze's phase (g, g of the forward peak, its weight), the bleach; [5] the tone curve (knee, saturation, bleach start,
// end); [6] the saturation fade (start, end), the sun through the clouds, the sun not hidden; [7] the glitter's colour (display), its gain;
// [8] deep water's light, [9] the bottom's (linear, exposed), [10] 2 Kd (1/m), [11] the light through a crest (display); [12] the sky's light
// on things (0.85 skyE / pi), the sea's ambient gain; the clouds ( cloudMix): [13] low, mid, high cover, variety; [14] the low
// layer's puff, scale, base (m), opaque; [15] the towers' top (rad), share, anvil, the mid layer's sheet; [16] the sunlight at the low layer,
// the clouds' gain; [17] at the mid layer, storm darkness; [18] at the high layer; [19] at the towers' tops.
const SKY_T0: f32 = ${h.toFixed(4)};
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
`;function I(e){let t=new Float32Array(1),n=new Uint32Array(t.buffer);t[0]=e;let r=n[0],i=r>>>16&32768,a=(r>>>23&255)-127+15,o=r&8388607;return a<=0?i|(a<-10?0:(o|8388608)>>>1-a+13):a>=31?i|31744:i|a<<10|o>>>13}function L({sunElDeg:e=30,haze:t=null,hazeAmt:n=null,hazeType:r=null,teal:i=.6,turbid:d=0,bottom:m=null,glint:h=1.3,cloud:y=.35,cloudType:b=.25,cloudVar:x=.4,cloudDark:S=0}={},C={}){let[w,T]=_[t]??_.Light,E=n??w,D=r??T,A=`${E.toFixed(2)},${D.toFixed(2)}`;A!==C.hazeKey&&(C.atm=p(a(E,D)),C.hazeKey=A,C.skyKey=null);let j=Math.max(-4,e)*Math.PI/180,M=`${A}|${e}`,ee=!1;M!==C.skyKey&&(C.skyKey=M,C.sky=o(C.atm,j),ee=!0);let N=C.sky,P={...g(N),sunSin:Math.sin(j)},F=N.g,I=Math.min(1,Math.max(0,(P.lightSun-.03)/.37)),L=f.bleach[2]*I*I*(3-2*I),te={...f,bleach:[f.bleach[0],f.bleach[1],L]},R=c(s(i,d),P,m??[.22,.19,.15]),z=(e,t=0)=>[e[0],e[1],e[2],t],B=O(y,b,x),V=Math.min(1,Math.max(0,(B.opaque-.25)/.7)),H=(1-.9*V*V*(3-2*V))*(1-.5*S),U=e=>u(C.atm,e,j).map((e,t)=>e*P.exp[t]*.8/Math.PI);return{values:new Float32Array([...z(P.exp),...z(P.sunDisc),...z(P.sunE),...z(N.ext),F.g,F.gPeak,F.wPeak,L,f.knee,f.sat,f.bleach[0],f.bleach[1],f.satFade[0],f.satFade[1],H,1,...z(v(P.sunCol.map(e=>e*40),te),h),...z(l(R.deep,1/f.sat)),...z(l(R.bot,1/f.sat)),...z(R.kd),...z(v(R.sss)),...z(P.skyE.map(e=>e*.85/Math.PI),1),B.low,B.mid,B.high,B.variety,B.puff,B.scale,B.base,B.opaque,B.tower,B.towers,B.anvil,B.sheet,...z(U(k.low),1),...z(U(k.mid),S),...z(U(k.high)),...z(U(k.top))]),rayleigh:N.rayleigh,mie:N.mie,tablesChanged:ee,sky:N,look:P}}var te=class{constructor(e){this.device=e;let t=t=>e.createTexture({label:t,size:[48,48],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});this.rayleigh=t(`sky rayleigh`),this.mie=t(`sky mie`),this.values=new Float32Array(80),this.cache={},this.version=0}set(e={}){let t=L(e,this.cache);if(t.tablesChanged)for(let[e,n]of[[this.rayleigh,t.rayleigh],[this.mie,t.mie]]){let t=new Uint16Array(n.length);for(let e=0;e<n.length;e++)t[e]=I(n[e]);this.device.queue.writeTexture({texture:e},t,{bytesPerRow:384},[48,48])}return this.values.set(t.values),this.sky=t.sky,this.look=t.look,this.version++,this}},R=2*Math.PI;function z(e,t,n){let r=(Math.imul(e|0,2376512323)^Math.imul(t|0,3625334849)^Math.imul(n|0,3407524639))>>>0;return r^=r>>>16,r=Math.imul(r,2246822507)>>>0,r^=r>>>13,r=Math.imul(r,3266489909)>>>0,r^=r>>>16,r>>>0}var B=(e,t,n)=>z(e,t,n)/4294967296,V=e=>e*e*e*(e*(e*6-15)+10),H=Float64Array.from({length:16},(e,t)=>Math.cos(R*(t+.5)/16)),U=Float64Array.from({length:16},(e,t)=>Math.sin(R*(t+.5)/16));function ne(e,t=0){let n=Math.floor(e),r=e-n,i=2*B(n,0,t)-1,a=2*B(n+1,0,t)-1;return i*r+(a*(r-1)-i*r)*V(r)}function re(e,t,n=0){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=(e,t,r,i)=>{let a=z(e,t,n)>>>28;return H[a]*r+U[a]*i},c=s(r,i,a,o),l=s(r+1,i,a-1,o),u=s(r,i+1,a,o-1),d=s(r+1,i+1,a-1,o-1),f=V(a),p=V(o),m=c+(l-c)*f;return m+(u+(d-u)*f-m)*p}var ie=.1405,ae=.2158,oe=2.399963229728653;function se(e,t,n=0,r=null){return le(t,n,r,(n,r)=>ne(e/r+17.31*n,t.seed+101*n)/ie)}function ce(e,t,n,r=0,i=null){return le(n,r,i,(r,i)=>{let a=Math.cos(oe*r),o=Math.sin(oe*r);return re((a*e-o*t)/i+17.31*r,(o*e+a*t)/i-9.77*r,n.seed+101*r)/ae})}function le(e,t,n,r){let i=2**-e.hurst,a=e.rms*Math.sqrt(1-i*i),o=Math.max(t,e.finest??0),s=0,c=0,l=a,u=e.scale;for(let e=0;e<24;e++,l*=i,u*=.5){let t=o>0?Math.min(1,Math.max(0,u/o-1)):1;if(t<=0){c+=l*l/(1-i*i);break}s+=t*l*r(e,u),c+=(1-t*t)*l*l}return n&&(n.value=s,n.cut=c),s}var ue=`
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
      v += fine * keep * amp * nNoise2(q, i32(F.w) + 101 * k) / ${ae};
    }
    amp *= r;
    w *= 0.5;
  }
  return v;
}
`,W={seed:7,size:1024,res:512,landWidth:160,d50:.3,faceSlope:.07,berm:1.4,bermAt:22,dune:5,duneAt:70,duneWidth:45,maxDepth:22,bar:{u:95,height:1.4,width:16,wander:16,trough:.6,troughAt:1.8},rips:{spacing:230,jitter:.3,at:60,width:15,flare:1.5,cut:.9,depth:.6,head:.3,attach:.5},shore:{megacusp:8,cusps:22,cuspRelief:.24,swash:10,step:.25,stepAt:7},noise:{shore:{scale:1600,rms:10,hurst:.85,seed:51,split:300,finest:4},bed:{scale:80,rms:1,hurst:.8,seed:57,finest:4},zones:{offshore:.12,surf:.05,face:.02,berm:.06,dune:.5}},divots:{hs:1.2,tp:10,scour:1,plunge:4,width:5,minWidth:3,barAt:2.5,da:4,du:1,from:300},reef:{cover:.25,scale:55,height:1.8,from:140,to:3e3,rough:.35,wander:.3},weed:{cover:.4,scale:22,depthMin:3,depthMax:16},coral:{cover:.45,scale:7,depthMin:1.5,depthMax:9},surfClear:1.2,sandDry:[.62,.5,.33],wetDark:.55,weedAlb:[.045,.065,.03],rockAlb:[.34,.31,.26],coralAlb:[.3,.24,.17],scrub:{from:.35,cover:.75,scale:14},scrubAlb:[.1,.11,.055],grains:{quartz:.7,shell:.25,heavy:.05,quartzAlb:[.62,.48,.3],shellAlb:[.8,.77,.7],heavyAlb:[.08,.07,.06],facets:4,facetAlpha:.7,F0:.045},wetLine:.7,ripple:.14},de=e=>.21*e**.48,fe=(e,t,n)=>{let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,2147483647)|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function pe(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=fe(r,i,n),u=fe(r+1,i,n),d=fe(r,i+1,n),f=fe(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}function G(e,t,n,r=4){let i=0,a=.5,o=1,s=0;for(let c=0;c<r;c++)i+=a*pe(e*o,t*o,n+c*101),s+=a,a*=.5,o*=2.03;return i/s}var me=e=>.5+.11*Math.SQRT2*he(1-2*Math.min(.999,Math.max(.001,e)));function he(e){let t=.147,n=Math.log(1-e*e),r=2/(Math.PI*t)+n/2;return Math.sign(e)*Math.sqrt(Math.sqrt(r*r-n/t)-r)}var K=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function ge(e,t=W){let n=t.rips;if(!n)return null;if(!(n.spacing>0)||!Number.isFinite(n.spacing))throw RangeError(`the rips' spacing must be a positive number of metres, not ${n.spacing}`);let r=n.spacing,i=Math.floor((e-n.at)/r),a=Math.min(n.jitter,.5),o=e=>n.at+r*(e+(e===0?0:a*(fe(e,77,t.seed)-.5))),s=-1/0,c=1/0;for(let t=i-1;t<=i+2;t++){let n=o(t);n<=e&&n>s&&(s=n),n>e&&n<c&&(c=n)}let l=(e-s)/(c-s);return{aL:s,aR:c,s:l,c:Math.cos(2*Math.PI*l),d:Math.min(e-s,c-e)}}function _e(e,t,n,r){if(Math.abs(t)>3*n.swash)return 0;let i=2*Math.PI*e/n.cusps+6*(G(e/(3*n.cusps),.3,r+41,2)-.5),a=.5+.5*Math.cos(i);return(n.cuspRelief*K(.3,.6,G(e/(8*n.cusps),.7,r+43))*.67+n.cuspRelief*.33)*(a*a-.375)*Math.exp(-((t/n.swash)**2))}var ve=9.81,ye=60,be=new WeakMap;function xe(e){if(e>=1)return 1;if(e<.2)return 0;let t=e*e,n=Math.exp(-1/t);for(let e=0;e<30;e++){let e=(1-n+t*Math.log(n))/(t/n-1);if(n-=e,Math.abs(e)<1e-10)break}return Math.min(n,t)}function Se(e,t,n=ge(e,t)?.c??0){let r=t.bar;return r.u+r.wander*n+.3*r.wander*(2*G(e/400,.5,t.seed+9)-1)}function Ce(e,t){let n=be.get(t);if(n||be.set(t,n=new Map),n.has(e))return n.get(e);let r=t.divots,i=e*r.da,a=Math.round((r.from+ye)/r.du),o=new Float32Array(a+1);n.set(e,o);let s=ge(i,t),c=s?1-Math.exp(-((s.d/(t.rips.width*(1+t.rips.flare)))**2)):1;if(c<.001)return o;let l=r.tp,u=1/l,d=r.hs/Math.SQRT2,f=.5+.4*Math.tanh(33*d*2*Math.PI/(ve*l*l)),p=d*d/8*(ve*l/(4*Math.PI)),m=0,h=ke(i,t).ub+ke(i,t).xf-.5*t.bar.width;for(let e=0;e<=a;e++){let n=r.from-e*r.du,s=je(i,n,t,!1,!1),d=-(s.y+o[e]);if(d<.1)break;let g=b(l,d),_=y(g,d)[1],v=Math.sqrt(8*p/_),x=.88/g*Math.tanh(f*g*d/.88),S=xe(v/x),C=S-m;if(p=Math.max(0,p-.25*u*S*x*x*r.du),m=S,C<=0||n>h)continue;let w=r.width*x,T=Math.max(r.minWidth,w),E=r.scour*x*C*c*(1-s.rock)*w/T,D=n-r.plunge*x,O=D-r.barAt*T,k=Math.max(0,Math.floor((r.from-D-3*T)/r.du)),A=Math.min(a,Math.ceil((r.from-O+3*T)/r.du));for(let e=k;e<=A;e++){let t=r.from-e*r.du;o[e]+=E*(Math.exp(-(((t-O)/T)**2))-Math.exp(-(((t-D)/T)**2)))}}return o}function we(e,t,n){let r=n.divots,i=Math.round((r.from+ye)/r.du),a=(r.from-t)/r.du;if(a<0||a>i)return 0;let o=e/r.da,s=Math.floor(o),c=o-s,l=Math.min(Math.floor(a),i-1),u=a-l,d=e=>e[l]+(e[l+1]-e[l])*u;return(d(Ce(s,n))*(1-c)+d(Ce(s+1,n))*c)*(1-K(40,ye,-t))}var Te=(e,t,n=W)=>je(e,t,n,!0,!0),Ee=null,De=NaN,Oe=null;function ke(e,t){if(t===Ee&&e===De)return Oe;let n=ge(e,t),r=n?n.c:0,i=t.noise,a=i?se(e,i.shore,i.shore.split):0,o=i?se(e,i.shore)-a:0,s={scale:1200,rms:.4,hurst:.8,finest:30},c=se(e,{...s,seed:t.seed+61}),l=se(e,{...s,seed:t.seed+67});return Oe={r:n,c:r,horn:.5-.5*r,ub:Se(e,t,r),xf:a,xn:o,rw:c,rw2:l},Ee=t,De=e,Oe}function Ae(e,t){let n=t.noise.zones,r=t.shore?.swash??10;return e<0?n.face+(n.berm-n.face)*K(r,t.bermAt,-e)+(n.dune-n.berm)*K(t.duneAt,t.duneAt+.5*t.duneWidth,-e):n.face+(n.surf-n.face)*K(r,2*r,e)+(n.offshore-n.surf)*K(1.2*t.bar.u,1.8*t.bar.u,e)}function je(e,t,n,r,i){let a=de(n.d50),o=(2*a/(3*n.faceSlope))**3,s=n.bar,c=n.shore,l=n.rips,u=ke(e,n),{r:d,c:f,horn:p,ub:m}=u,h=t-u.xf,g=h-((c?-c.megacusp*f:0)+u.xn)*(h>=0?1-K(.25*m,.7*m,h):1-K(n.bermAt,n.duneAt,-h)),_=c?_e(e,g,c,n.seed):0,v=r&&n.divots?we(e,t,n):0,y=n.noise?Ae(g,n)*ce(e,h,n.noise.bed):0,b,x=0,S=0,C=0,w=0,T=0,E=0;if(g>=0){let r=Math.min(n.maxDepth,a*(g+o)**(2/3)-a*o**(2/3)),f=K(0,.5*s.u,g),D=d?Math.exp(-((d.d/l.width)**2)):0,O=d?l.attach:0;r-=s.height*(1-(d?l.cut:0)*D)*Math.exp(-(((h-m)/s.width)**2))*f;let k=m-s.troughAt*s.width;if(r+=s.trough*(1-.4*p)*(1-O*p*p)*Math.exp(-(((h-k)/s.width)**2))*f,d){r-=O*p*p*.6*s.height*K(.15*m,.45*m,h)*(1-K(m-s.width,m,h));let e=k-s.width+O*(.2*m-(k-s.width)),t=l.width*(1+l.flare*(1-K(e,m-.5*s.width,h)));r+=l.depth*Math.exp(-((d.d/t)**2))*K(e-s.width,e,h)*(1-K(m+s.width,m+2.5*s.width,h))*f,r-=l.head*Math.exp(-((d.d/(2.5*l.width))**2))*Math.exp(-(((h-(m+3*s.width))/(1.5*s.width))**2))}c&&(r+=c.step*Math.exp(-(((g-c.stepAt)/(g<c.stepAt?1.5:5))**2))-_);let A=n.reef,j=G(e/A.scale,t/A.scale,n.seed+3),M=me(A.cover),ee=A.from*(1+A.wander*u.rw),N=A.to*(1+A.wander*u.rw2),P=K(ee-30,ee,h)*(1-K(N,N+.1*A.to,h)),F=.5*(n.blur??0)/A.scale,I=(n.blur??0)>3.5?0:A.rough;x=K(M,M+.04,j)*P;let L=A.height*K(M-F,M+.12+F,j)*(1-I+I*G(e/3.5,t/3.5,n.seed+5));r-=L*+(K(M-F,M+F+1e-9,j)>0)*P,r-=v+y;let te=c?c.swash:0,R=K(te,2*te+1,g);if(b=-(r+R*Math.max(0,.05*g*n.faceSlope-r)),!i)return{y:b,rock:x};let z=-b,B=K(n.surfClear*n.bar.u*.85,n.surfClear*n.bar.u,h),V=n.weed,H=n.coral;w=K(V.depthMin,V.depthMin+1.5,z)*(1-K(V.depthMax-2,V.depthMax,z))*B,E=K(H.depthMin,H.depthMin+1,z)*(1-K(H.depthMax-2,H.depthMax,z))*B,T=P;let U=me(V.cover),ne=me(H.cover);S=K(U,U+.05,G(e/V.scale,t/V.scale,n.seed+11))*w,C=x*K(ne,ne+.06,G(e/H.scale,t/H.scale,n.seed+17))*E,S*=1-.6*x,x*=1-C}else{let r=-g,i=Math.min(r*n.faceSlope,n.berm),a=n.dune*K(n.duneAt,n.duneAt+n.duneWidth,r)*(n.noise?1:.8+.4*G(e/60,r/60,n.seed+21));b=i+(r>n.bermAt?.15*(r-n.bermAt)/40:0)+a+_+v+y;let o=n.scrub,s=me(o.cover);w=K(n.duneAt+o.from*n.duneWidth,n.duneAt+(o.from+.3)*n.duneWidth,r),S=K(s,s+.08,G(e/o.scale,t/o.scale,n.seed+31))*w}let D=Math.max(0,1-S-x-C);return{y:b,weed:S,rock:x,coral:C,sand:D,zW:w,zR:T,zC:E}}function Me(e,t=[0,0],n=180,r=W){let i=new Float32Array(72);if(!e)return i;let a=n*Math.PI/180;i.set([t[0],t[1],Math.sin(a),Math.cos(a)],0),i.set([e.a0,e.u0,1/e.size,1],4),i.set([e.texel,r.wetLine,r.ripple,r.wetDark],8),i.set([...r.sandDry,e.levels.length],12);let o=e.outer??e,s=de(r.d50),c=(2*s/(3*r.faceSlope))**3,l=o.u0+o.size,u=Math.min(r.maxDepth,s*((l+c)**(2/3)-c**(2/3))),d=u>=r.maxDepth?.005:2/3*s*(l+c)**(-1/3);i.set([...r.weedAlb,-u,...r.rockAlb,d,...r.coralAlb,0,...r.scrubAlb,0],16);let f=r.grains;i.set([r.d50/1e3,f.quartz,f.shell,f.heavy,...f.quartzAlb,f.facets,...f.shellAlb,f.facetAlpha,...f.heavyAlb,f.F0],32),i.set([o.a0,o.u0,1/o.size,o.levels.length],48);let p=r.noise;return p&&(i.set([p.bed.scale,p.bed.hurst,p.bed.seed,p.zones.face],52),i[31]=p.bed.finest),i[27]=r.faceSlope,[[r.reef,3,.04],[r.weed,11,.05],[r.coral,17,.06],[r.scrub,31,.08]].forEach(([e,t,n],a)=>i.set([e.scale,me(e.cover),r.seed+t,n],56+4*a)),i}function Ne(e,t=null){let n=t?t.res:1,r=t?t.levels.length:1,i=e.createTexture({label:`beach bed`,size:[n,n],format:`rgba16float`,mipLevelCount:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return(t?t.levels:[new Float32Array([-1e3,0,0,0])]).forEach((t,r)=>{let a=Math.max(1,n>>r),o=new Uint16Array(t.length);for(let e=0;e<t.length;e++)o[e]=I(t[e]);e.queue.writeTexture({texture:i,mipLevel:r},o,{bytesPerRow:a*8},[a,a])}),i}var Pe=`
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
  // the cover's density itself varies at larger scales, fractally (Mike, 2026-11-24: "LOD should try to avoid hard horizons"): octaves of
  // twice the patches' size and up (to about 2 km), each kept while the pixel holds it, shift the level, so where the patches have
  // averaged out to their share a far pixel still sees thicker and thinner ground, and the pattern has no distance at which it ends
  var lv = C.y;
  var wc = 1.0;
  var sc = 2.03 * C.x;
  for (var o = 0; o < 7; o++) {
    let keep = clamp(sc / max(px, 1e-4) - 1.0, 0.0, 1.0);
    if (keep > 0.0) { lv += 0.2 * wc * keep * (bVnoise(q / sc, i32(C.z) + 700 + o * 37) - 0.5); }
    wc *= 0.8;
    sc *= 2.03;
  }
  return smoothstep(lv - b, lv + C.w + b, v / 0.9375);
}
/** The bed's cover at p from its zones (raw: bedRaw's) as has it: (elevation, weed or the dunes' scrub, rock, coral). */
fn bedCover(p: vec2f, raw: vec4f, px: f32) -> vec4f {
  let q = bedAU(p);      // (each patch's noise only where its zone is: most of the bed has one cover or none)
  if (raw.x > 0.0) { return vec4f(raw.x, select(0.0, raw.y * bPatch(q, F.bd[17], px), raw.y > 0.0), 0.0, 0.0); }
  var rock = select(0.0, raw.z * bPatch(q, F.bd[14], px), raw.z > 0.0);
  let coral = select(0.0, rock * raw.w * bPatch(q, F.bd[16], px), rock > 0.0 && raw.w > 0.0);
  let weed = select(0.0, raw.y * bPatch(q, F.bd[15], px) * (1.0 - 0.6 * rock), raw.y > 0.0);
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
fn bedAlbedo(p: vec2f, raw: vec4f, px: f32, dry: bool) -> vec3f {
  let sandShare = max(1.0 - raw.y - raw.z - raw.w, 0.0);
  var sand = sandAlbedo(p, px) * (0.9 + 0.2 * bDetail(p, 0.9, px));      // (the grains' mix; a little patchiness at the metre scale)
  if (!dry) { sand *= F.bd[2].w; }
  let off = F.bd[0].zw;
  let u = dot(p - F.bd[0].xy, off);
  // the sand ripples under water: crests along the shore, a wavelength bd[2].z, bending a little; faded where the pixel cannot hold them
  let rl = F.bd[2].z;
  let rip = select(0.0, sin(6.2831853 * (u + 0.6 * rl * bNoise(p / 1.3)) / rl) * (1.0 - smoothstep(0.25 * rl, 0.7 * rl, px)), !dry);
  sand *= 1.0 + 0.16 * rip;
  let weed = select(F.bd[4].xyz, F.bd[7].xyz, dry) * (0.6 + 0.8 * bDetail(p, 1.6, px)) * (0.7 + 0.6 * bDetail(p * 2.3, 0.35, px));
  let rock = F.bd[5].xyz * (0.55 + 0.9 * bDetail(p, 2.4, px) * bDetail(p * 1.9, 0.5, px));
  let coral = F.bd[6].xyz * (0.6 + 0.8 * bDetail(p, 0.45, px));
  return sand * sandShare + weed * raw.y + rock * raw.z + coral * raw.w;
}
/** How much of the waves reach water this shallow (m of depth): the height a depth can hold, about 0.78 of it, over the sea's Hs. A stand-in
 *  until the bed's wave solve (beach-break plan, M2); 1 where there is no bed. */
fn bedWaveGain(p: vec2f) -> f32 {
  if (!bedOn()) { return 1.0; }
  let depth = max(-bedY(p), 0.0);
  return smoothstep(0.0, 1.0, clamp(0.78 * depth * F.wave.y, 0.0, 1.0));
}
`,Fe=`
@group(0) @binding(11) var swH: texture_2d<f32>;      // the swell's height, displacement along a and u, its Hs
@group(0) @binding(12) var swS: texture_2d<f32>;      // its slope along a and u
fn swellOn() -> bool { return F.sw.w > 0.5; }
fn swellUV(p: vec2f) -> vec3f {
  let d = p - F.bd[0].xy;
  let off = F.bd[0].zw;
  let uv = (vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off)) - F.sw.xy) * F.sw.z;
  let e = min(min(uv.x, 1.0 - uv.x), 1.0 - uv.y);      // (faded along the shore and offshore, not on the land side: the run-up is there)
  return vec3f(uv, select(smoothstep(0.0, 0.08, e), 0.0, uv.y < 0.0));
}
/** The swell at p: its height and its displacement (east, north). */
fn swellAt(p: vec2f) -> vec3f {
  if (!swellOn()) { return vec3f(0.0); }
  let q = swellUV(p);
  if (q.z <= 0.0) { return vec3f(0.0); }
  let v = textureSampleLevel(swH, skySamp, q.xy, 0.0);
  let off = F.bd[0].zw;
  return vec3f(v.x, v.y * vec2f(off.y, -off.x) + v.z * off) * q.z;
}
/** The sea's breaking at p: (its Hs here, the breaking waves' whitewater, 0 to 1). */
fn swellBreak(p: vec2f) -> vec2f {
  if (!swellOn()) { return vec2f(0.0); }
  let q = swellUV(p);
  if (q.z <= 0.0) { return vec2f(0.0); }
  return vec2f(textureSampleLevel(swH, skySamp, q.xy, 0.0).w, textureSampleLevel(swS, skySamp, q.xy, 0.0).w) * q.z;
}
/** How much of the surface at p is the run-up's level (0 offshore, 1 on the face), faded with the square's edges. */
fn swellEdge(p: vec2f) -> f32 {
  if (!swellOn()) { return 0.0; }
  let q = swellUV(p);
  if (q.z <= 0.0) { return 0.0; }
  return textureSampleLevel(swS, skySamp, q.xy, 0.0).z * q.z;
}
// The swash's front at the pixel's own scale (Mike, 2026-11-23: "can the water run up have LOD so that it is infinitely variable at the
// finest scale of observation?"): a fractal of the level, zero mean, from SWASH_FINE's outer scale down to the pixel, anchored to the front
// (its distance from where the level meets the face) and re-formed every SWASH_PERIOD s (each uprush its own, crossfaded); picture detail
// only (the physics reads the coarse level). EDGE_BIAS: the water's mesh is raised this much where the run-up is, so the finer edge can
// reach past the coarse one; the shader takes it off again.
const SWASH_FINE = vec4f(3.0, 0.015, 0.7, 71.0);      // outer scale (m), rms (m), hurst, seed
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
/** Its slope at p (dh/d east, dh/d north). */
fn swellSlope(p: vec2f) -> vec2f {
  if (!swellOn()) { return vec2f(0.0); }
  let q = swellUV(p);
  if (q.z <= 0.0) { return vec2f(0.0); }
  let v = textureSampleLevel(swS, skySamp, q.xy, 0.0);
  let off = F.bd[0].zw;
  return (v.x * vec2f(off.y, -off.x) + v.y * off) * q.z;
}
`,Ie=.8,Le=12,Re=6,ze=3,Be=2,Ve=.35,He=68,Ue=He+64,We=Ue+128,Ge=We+80,Ke=Ge+72,qe=Ke+4,Je={OFF:0,MAIN:1,TAIL:2},Ye=`
/** The bed above the water as the ground pass draws it (its albedo, dry or wet, its grains' glints, the sun and the sky's light, the air
 *  between), before present(): p the point (east, north), world its place, px the pixel's footprint. The water's shader uses it too, where
 *  the edge at the pixel's own scale leaves the bed dry. */
fn groundShade(p: vec2f, world: vec3f, px: f32) -> vec3f {
  let raw = bedMat(p, px);
  let eye = vec3f(F.cam.x, F.cam.y, -F.cam.z);
  let toEye = eye - world;
  let dist = length(toEye);
  let alb = bedAlbedo(p, raw, px, raw.x > F.bd[2].y);
  let n = bedNormal(p, px);
  let sunVis = F.lk[6].z * F.lk[6].w;
  // the sand's glints where it is dry and sand ( sandGlint): its crystal facets mirroring the sun
  let sandShare = max(1.0 - raw.y - raw.z - raw.w, 0.0) * select(0.0, 1.0, raw.x > F.bd[2].y);
  let glint = sandGlint(p, px, n, toEye / dist, F.sun.xyz) * sandShare;
  let lin = alb * (F.lk[2].xyz * max(dot(n, F.sun.xyz), 0.0) * sunVis / 3.14159265 + F.lk[12].xyz) + F.lk[2].xyz * glint * sunVis;
  let col = toneEnc(lin);
  return mix(col, skyMap(normalize(vec3f(-toEye.x / dist, 0.012, -toEye.z / dist))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0)));
}
`,Xe=`
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
${F}
${ue}
${Pe}
${Fe}
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
`,Ze=(e,t,n=``)=>Xe+`
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
${Ye}
struct VO { @builtin(position) pos: vec4f, @location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32, @location(3) ${n} bias: f32 };
// the fragment's inputs: without the position unless fsPos (a cost test: whether a fragment input of the position changes how often the shader runs)
struct FI { ${t?`@builtin(position) pos: vec4f, `:``}@location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32, @location(3) ${n} bias: f32 };
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
  var o: VO;
  let w = vec3f(p.x + disp.x, h, -(p.y + disp.y));
  o.pos = F.viewProj * vec4f(w - vec3f(F.cam.x, 0.0, -F.cam.z), 1.0);
  o.p0 = p;
  o.world = w;
  o.h = h0;
  o.bias = bias;
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
    if (wf > 0.0) { level += wf * edgeW * swashFine(pE, i.world.y, px); bedHere = bedC + wf * bedFine(pE, px); }
    if (level < bedHere) {
      // the bed is dry here: drawn as the ground where the eye's ray meets it, on past the water's mesh (the mesh is above it), not under
      // the mesh's point (at a grazing angle that would shift it by metres)
      let dv = normalize(i.world - vec3f(F.cam.x, F.cam.y, -F.cam.z));
      let pw = i.world + dv * max((bedHere - i.world.y) / min(dv.y, -0.02), 0.0);
      dry = true;
      dryCol = groundShade(vec2f(pw.x, -pw.z), vec3f(pw.x, bedHere, pw.z), px);
    }
  }
  var g = vec2f(0.0);       // the main waves' still-water gradient and Jacobian (xx, zz, xz), and the fine tails' apart ( Wave)
  var j = vec3f(0.0);
  var gt = vec2f(0.0);
  var jt = vec3f(0.0);
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
  }
  let gw = bedWaveGain(i.p0);
  g *= gw; gt *= gw; j *= gw; jt *= gw;
  g += swellSlope(i.p0);
  let sharp = 1.0 + 2.0 * F.wave.x * i.h * F.wave.y;
  g *= sharp;
  gt *= sharp;
  // the slope on the displaced surface ( waveSlope): the still-water gradient through the displacement's Jacobian, the fine tails in it
  let jm = F.sea.y * j;
  let ja = jm + F.sea.y * F.wave.z * jt;
  let a11 = 1.0 + ja.x;
  let a22 = 1.0 + ja.y;
  let a12 = ja.z;
  let dd = max(a11 * a22 - a12 * a12, 0.15);
  let ga = g + gt;
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
  let cRes = ${Ve} * (1.0 - smoothstep(20.0, 35.0, dist));
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
    let raw = bedMat(pb, px);
    let Hb = max(level - raw.x, 0.0);
    let lw = refract(-Ls, vec3f(0.0, 1.0, 0.0), 0.7519);
    let muS = max(-lw.y, 0.2);
    let Kd = 0.5 * F.lk[10].xyz;
    let T = exp(-Kd * Hb * (1.0 / muS + 1.0 / mu));
    let nb = bedNormal(pb, px);
    let shade = mix(1.0, clamp(dot(nb, -lw), 0.0, 1.0) / muS, 0.7 * sunVis);
    let alb = bedAlbedo(pb, raw, px, false);
    bodyLin = F.lk[8].xyz * (1.0 - T) + F.lk[9].xyz * alb * shade * T;
    bedT = max(T.x, max(T.y, T.z));
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
  // the breaking waves' whitewater (: wave by wave, as layer 3's share says, from the crest and trailing it), broken
  // up along the crests by a slow noise
  if (bedOn() && (dbg & 1024u) == 0u) {
    let sb = swellBreak(i.p0);
    if (sb.y > 0.01) { foam = max(foam, sb.y * (0.65 + 0.35 * clamp(nFractal2(i.p0, vec4f(12.0, 0.35, 0.8, 91.0), vec2f(0.0, max(px, 0.5))), -1.0, 1.0))); }
  }
  col = mix(col, vec3f(0.93, 0.96, 0.98) * 0.78 * (0.66 + 0.50 * NdLs * sunVis), foam * 0.8);
  // the air between: the distance fades the sea toward the sky just above the horizon in that direction, per channel (the blue first)
  col = mix(col, skyMap(normalize(vec3f(-V.x, 0.012, -V.z))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0)));
  if ((dbg & 8u) != 0u) { return vec4f(length(sN) / 2.0, length(sl) / 2.0, ripRough * 10.0, 1.0); }
  if ((dbg & 64u) != 0u) { let sv = swellAt(i.p0); return vec4f(0.5 + sv.x, 0.5 + sv.x, 0.5 - sv.x, 1.0); }      // the swell's height alone (64: red-yellow crests, blue troughs; 0.5 at still water)      // the slopes: r the drawn one, g the waves' alone (/ 2), b the ripples' roughness (x 10)
  if (dry) { return present(dryCol); }
  return present(col + vec3f(burn * 1e-6));
}
`,Qe=Xe+`
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
`,$e=Xe+`
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
`,et=e=>Xe+`
@group(1) @binding(0) var env: texture_2d<f32>;
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
${Ye}
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
`;function tt(r,i,a,o={},{micro:s=1,debug:c=0}={}){let l=m(d(o),s),u=i.sets;r.set([.15*(o.stokes??0)*(o.stats?.sharpWeight??1),1/Math.max(.05,o.stats?.hs??0),o.ripples?.sharp??1,0],44),r.set(l.on?[l.dir[0],l.dir[1],l.amount*Math.sqrt(t(l.windMs,l.res)),1]:[1,0,0,0],48),r.set([...l.amp,l.on?l.sharp:1],52),r.set([e.cut,+!!i.tails?.length,1,c],56),r.set(D.map(e=>e[2]),60);for(let e=0;e<32;e++){let t=u[e],i=e>=a||t.band===n.WIND_L||t.band===n.WIND_R?Je.OFF:t.band===n.TAIL?Je.TAIL:Je.MAIN;r.set(e<a?[t.L,(t.span??1)-1,t.slopeVar??0,i]:[1,0,0,0],Ue+4*e)}return r}var nt={msaa:4,grid:32,ripples:!0,facets:4,fragSets:!0,vsDisp:!0,shade:!0,fsPos:!1,deriv:!0,burn:0,skyBurn:0,interp:``,target:`canvas`,depth:`depth32float`,rs:.7,detail:null,regimes:1,sunFacets:!0,dbg:0,ground:!0,swell:!0},rt=`rgba16float`,it=class{constructor(e,t,{msaa:n=4,format:r=navigator.gpu.getPreferredCanvasFormat(),timestamps:i=!1,grid:a=32,patch0:o=4,levels:s=12,rangeK:c=6}={}){if(c*.30000000000000004<Math.SQRT2)throw Error(`rangeK ${c} is too small: the mesh would crack (at least ${(Math.SQRT2/.30000000000000004).toFixed(2)})`);Object.assign(this,{device:e,canvas:t,format:r,patch0:o,rangeK:c,levels:Math.min(s,16)}),this.ctx=t.getContext(`webgpu`),this.ctx.configure({device:e,format:r,alphaMode:`opaque`});let l=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.bgl=e.createBindGroupLayout({entries:[{binding:0,visibility:l,buffer:{type:`uniform`}},{binding:1,visibility:l,sampler:{type:`filtering`}},...[2,3,4,5,6].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}})),...[7,8].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}})),{binding:9,visibility:l,sampler:{type:`filtering`}},{binding:10,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}},...[11,12,13].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}}))]}),this.swellNone=e.createTexture({size:[1,1],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING}),this.bedTex=Ne(e),this.bedOut=Ne(e),this.bedU=Me(null),this.envLayout=e.createPipelineLayout({bindGroupLayouts:[this.bgl]}),this.bglEnv=e.createBindGroupLayout({entries:[0,1].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:e?`cube`:`2d`}}))}),this.layout=e.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv]});let u=(t,n,r=1,i=rt)=>e.createTexture({label:t,size:[n,n,r],format:i,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING});this.env=u(`sky map`,256),this.domes=[u(`dome cube A`,512,6,`rgba8unorm`),u(`dome cube B`,512,6,`rgba8unorm`)],this.domeFront=0,this.domeStrip=-1,this.domeReady=!1,this.bgEnvs=this.domes.map(t=>e.createBindGroup({layout:this.bglEnv,entries:[{binding:0,resource:this.env.createView()},{binding:1,resource:t.createView({dimension:`cube`})}]}));let d=e.createShaderModule({code:Qe,label:`sky map`}),f=(t,n,r)=>e.createRenderPipeline({layout:this.envLayout,label:`sky map ${t} ${n}`,vertex:{module:d,entryPoint:`vs`},fragment:{module:d,entryPoint:`fs`,constants:{MAP_N:t,FACE:n,LODK:r},targets:[{format:n<0?rt:`rgba8unorm`}]}});this.envPipe=f(256,-1,9),this.facePipes=[0,1,2,3,4,5].map(e=>f(512,e,2)),this.envMod=d,this.envKey=null,this.skyModule=e.createShaderModule({code:$e,label:`sky`}),this.byGrid=new Map,this.pipes=new Map,this.uni=e.createBuffer({size:qe*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(qe),this.samp=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`repeat`,maxAnisotropy:2}),this.skySamp=e.createSampler({magFilter:`linear`,minFilter:`linear`}),this.look=new te(e).set(),this.instMax=2048,this.instF=new Float32Array(this.instMax*4),this.inst=e.createBuffer({size:this.instF.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.timestamps=i,i&&(this.qs=e.createQuerySet({type:`timestamp`,count:6}),this.qres=e.createBuffer({size:48,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.qread=[],this.gpu={fft:[],draw:[],post:[],tagged:[]}),this.size=``,this.cpuMs=[],this.doneMs=[],this.readMs=[],this.frameNo=0,this.inFlight=0,this.setVariant({msaa:n,grid:a}),this.modules=[this._grid(a).module,this.skyModule,this.envMod]}_grid(e,t=!1,n=``){let r=this.byGrid.get(`${e} ${t} ${n}`);if(!r){let i=new Uint16Array(e*e*6),a=0;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*(e+1)+n,o=r+1,s=r+e+1,c=s+1;i.set([r,s,o,o,s,c],a),a+=6}let o=this.device.createBuffer({size:i.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(o,0,i),r={module:this.device.createShaderModule({code:Ze(e,t,n),label:`water ${e}`}),idx:o},this.byGrid.set(`${e} ${t} ${n}`,r)}return r}_ground(e){return this.groundMods??=new Map,this.groundMods.has(e)||this.groundMods.set(e,this.device.createShaderModule({code:et(e),label:`ground ${e}`})),this.groundMods.get(e)}setVariant(e={}){let t={...nt,...e},n=JSON.stringify({...t,dbg:0,ground:!0,swell:!0}),r=this.device,i=this.pipes.get(n);if(!i){let e=t.target===`temporal`,a=this._grid(t.grid,t.fsPos,t.interp),o={count:e?1:t.msaa},s=t.target===`hdr`||e?rt:this.format,c=t.depth,l=[{format:s}],u=this.skyModule,d={RIPPLES:+!!t.ripples,FACETS:t.facets,FRAG_SETS:+!!t.fragSets,VS_DISP:+!!t.vsDisp,SHADE:+!!t.shade,DERIV:+!!t.deriv,BURN:t.burn,GAMMA:+!e,REGIMES:t.regimes||0,SUN_FACETS:+!!t.sunFacets};i={water:r.createRenderPipeline({layout:this.layout,label:`water ${n}`,vertex:{module:a.module,entryPoint:`vs`,constants:d,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:a.module,entryPoint:`fs`,constants:d,targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}),sky:r.createRenderPipeline({layout:this.layout,label:`sky`,vertex:{module:u,entryPoint:`vs`},fragment:{module:u,entryPoint:`fs`,constants:{BURN:t.skyBurn,GAMMA:+!e},targets:l},depthStencil:{format:c,depthWriteEnabled:!1,depthCompare:`greater-equal`},multisample:o}),idx:a.idx,ground:this.bedOn?r.createRenderPipeline({layout:this.layout,label:`ground ${t.grid}`,vertex:{module:this._ground(t.grid),entryPoint:`vs`,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:this._ground(t.grid),entryPoint:`fs`,constants:{GAMMA:+!e},targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}):null},this.pipes.set(n,i)}this.variant=t,this.water=i.water,this.sky=i.sky,this.idx=i.idx,this.groundPipe=i.ground,this.msaa=t.target===`temporal`?1:t.msaa,this.grid=t.grid,t.target===`temporal`&&!this.temporal&&(this.temporal=new N(this.device,this.format)),t.target===`hdr`&&!this.blit&&this._makeBlit();for(let e=0;e<this.levels;e++){let n=this.patch0*2**e,r=this.rangeK*n;this.uniF.set([n/t.grid,Ie*r,r,n],He+4*e)}}setSea(e,t,n={},{micro:r=1,debug:i=0}={}){this.fft=e,this.rip=t,t.setShape(n.ripples),tt(this.uniF,e.sea,e.nS,n,{micro:r,debug:i}),this.debug=i,this.chop=n.chop??1,this._bind()}setBed(e,t=[0,0],n=180,r=void 0){this.bedTex.destroy(),this.bedTex=Ne(this.device,e),this.bedU=Me(e,t,n,r),this.bedOut.destroy(),this.bedOut=Ne(this.device,e?.outer??null),this.bedOn=!!e,this.pipes.clear(),this.setVariant(this.variant??{}),this.fft&&this._bind()}setWetLine(e){this.bedU[9]=e}setSwell(e){this.swell=e,this.fft&&this._bind()}setLook(e){this.look=e,this.fft&&this._bind()}_bind(){let e=this.fft,t=this.rip;this.bg=this.device.createBindGroup({layout:this.bgl,entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:this.samp},...[...e.out,...t.out].map((e,t)=>({binding:2+t,resource:e.createView({dimension:`2d-array`})})),{binding:7,resource:this.look.rayleigh.createView()},{binding:8,resource:this.look.mie.createView()},{binding:9,resource:this.skySamp},{binding:10,resource:this.bedTex.createView()},{binding:13,resource:this.bedOut.createView()},{binding:11,resource:(this.swell?.outH??this.swellNone).createView()},{binding:12,resource:(this.swell?.outS??this.swellNone).createView()}]})}_targets(){let e=this.canvas.width,t=this.canvas.height,n=this.variant,r=n.target===`temporal`,i=[e,t,this.msaa,n.target,n.depth,n.rs].join(` `);if(i===this.size)return;this.size=i,this.colorMS?.destroy(),this.depth?.destroy(),this.hdrTex?.destroy(),this.hdrTex=null,this.tColor?.destroy(),this.tColor=null;let a=r?Math.max(1,Math.round(e*n.rs)):e,o=r?Math.max(1,Math.round(t*n.rs)):t;this.renderSize=[a,o];let s=n.target===`hdr`?rt:this.format,c=GPUTextureUsage.RENDER_ATTACHMENT;this.colorMS=this.msaa>1?this.device.createTexture({size:[a,o],format:s,sampleCount:this.msaa,usage:c}):null,this.depth=this.device.createTexture({size:[a,o],format:n.depth,sampleCount:this.msaa,usage:c|(r?GPUTextureUsage.TEXTURE_BINDING:0)}),r&&(this.tColor=this.device.createTexture({size:[a,o],format:rt,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.temporal.resize(a,o,e,t)),n.target===`hdr`&&(this.hdrTex=this.device.createTexture({size:[a,o],format:rt,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.blitBG=this.device.createBindGroup({layout:this.blit.getBindGroupLayout(0),entries:[{binding:0,resource:this.hdrTex.createView()}]}))}_makeBlit(){let e=this.device.createShaderModule({label:`blit`,code:`
@group(0) @binding(0) var src: texture_2d<f32>;
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4f { return textureLoad(src, vec2u(p.xy), 0); }
`});this.blit=this.device.createRenderPipeline({layout:`auto`,label:`blit`,vertex:{module:e,entryPoint:`vs`},fragment:{module:e,entryPoint:`fs`,targets:[{format:this.format}]}})}_select(e,t){let n=this.instF,r=this.patch0,i=this.levels-1,a=e.e,o=e.n,s=e.h,c=e=>[t[e],t[4+e],t[8+e],t[12+e]],l=c(0),u=c(1),d=c(2),f=c(3),p=[f.map((e,t)=>e+l[t]),f.map((e,t)=>e-l[t]),f.map((e,t)=>e+u[t]),f.map((e,t)=>e-u[t]),f.map((e,t)=>e-d[t])],m=(e,t,n)=>{let r=e-a-Re,i=r+n+12,s=o-t-n-Re,c=s+n+12;for(let[e,t,n,a]of p)if(e*(e>0?i:r)+t*(t>0?Le:-12)+n*(n>0?c:s)+a<0)return!1;return!0},h=e=>this.rangeK*r*2**e,g=(e,t,n)=>Math.hypot(Math.max(e-a,0,a-e-n),Math.max(t-o,0,o-t-n),s),_=0,v=this.perLevel=Array(this.levels).fill(0),y=(e,t,i)=>{_<this.instMax&&(n.set([e,t,r*2**i,i],4*_),_++,v[i]++)},b=(e,t,n)=>{let i=r*2**n,a=g(e,t,i);if(a>h(n))return!1;if(!m(e,t,i))return!0;if(n===0||a>h(n-1))return y(e,t,n),!0;let o=i/2;for(let[r,i]of[[0,0],[o,0],[0,o],[o,o]])!b(e+r,t+i,n-1)&&m(e+r,t+i,o)&&y(e+r,t+i,n-1);return!0},x=r*2**i,S=h(i);for(let e=Math.floor((a-S)/x);e<=Math.floor((a+S)/x);e++)for(let t=Math.floor((o-S)/x);t<=Math.floor((o+S)/x);t++)b(e*x,t*x,i);return _}ready(){return this.inFlight<Be}frame(e,t,{exposure:n=1.4,chop:r=this.chop??1,sunDir:i=[.3,.45,-.84],load:a=1,tag:o=null}={}){let s=performance.now(),c=this.device;this._targets();let[l,u]=this.renderSize,d=this.uniF,f=this.variant.target===`temporal`,p=Math.cos(e.yaw),m=Math.sin(e.yaw),h=Math.cos(e.pitch),g=Math.sin(e.pitch),_=[m*h,g,-p*h],v=[p,0,m],y=[v[1]*_[2]-v[2]*_[1],v[2]*_[0]-v[0]*_[2],v[0]*_[1]-v[1]*_[0]],b=[0,e.h,0],x=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],S=[v[0],y[0],-_[0],0,v[1],y[1],-_[1],0,v[2],y[2],-_[2],0,-x(v,b),-x(y,b),x(_,b),1],C=l/u,w=Math.tan(e.fov*Math.PI/360),T=[1/(C*w),0,0,0,0,1/w,0,0,0,0,0,-1,0,0,.05,0],E=ot(T,S),D=E,O=[0,0];if(f){O=this.temporal.jitter?ee(this.frameNo):[0,0];let t=T.slice();t[8]=-2*O[0]/l,t[9]=-2*O[1]/u,D=ot(t,S);let n=this.prevCam??[e.e,e.n],r=[1,0,0,0,0,1,0,0,0,0,1,0,e.e-n[0],0,-(e.n-n[1]),1],i=Math.hypot(e.e-n[0],e.n-n[1])>50||!this.prevVP;i&&this.temporal.reset(),this.reproj=ot(ot(i?E:this.prevVP,r),P(E)),this.prevVP=E,this.prevCam=[e.e,e.n]}d.set(D,0),d.set([e.e,e.h,e.n,t],16);let k=Math.hypot(...i);d.set([i[0]/k,i[1]/k,i[2]/k,ze],20),d.set([l,u,1/l,1/u],24),d.set([this.fft.nS,r,n,f?this.variant.detail??.5*this.variant.rs:1],28),d.set(this.look.values,We),d.set(this.bedU,Ge);let A=this.variant.swell?this.swell:null;d.set(A?A.map:[0,0,0,0],Ke),d[59]=(this.debug??0)|this.variant.dbg,d.set([v[0]*w*C,v[1]*w*C,v[2]*w*C,0,y[0]*w,y[1]*w,y[2]*w,0,_[0],_[1],_[2],0],32);let j=this._select(e,D);c.queue.writeBuffer(this.uni,0,d),c.queue.writeBuffer(this.inst,0,this.instF,0,j*4);let M=c.createCommandEncoder(),N=this.timestamps,F=M.beginComputePass(N?{timestampWrites:{querySet:this.qs,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});this.fft.encode(F,t),this.rip.encode(F,t),A?.encode(F,t),F.end();let I=`${this.look.version} ${d[20].toFixed(5)} ${d[21].toFixed(5)} ${d[22].toFixed(5)}`,L=(e,t)=>{let n=M.beginRenderPass({colorAttachments:[{view:e,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]});n.setPipeline(t),n.setBindGroup(0,this.bg),n.draw(3),n.end()},te=(e,t)=>e.createView({dimension:`2d`,baseArrayLayer:t,arrayLayerCount:1});if(I!==this.envKey){if(this.envKey=I,L(this.env.createView(),this.envPipe),this.domeReady)this.domeStrip=0;else{for(let e=0;e<6;e++)L(te(this.domes[this.domeFront],e),this.facePipes[e]);this.domeReady=!0}}this.domeStrip>=0&&(L(te(this.domes[1-this.domeFront],this.domeStrip),this.facePipes[this.domeStrip]),++this.domeStrip===6&&(this.domeFront=1-this.domeFront,this.domeStrip=-1));let R=this.ctx.getCurrentTexture().createView(),z=this.tColor?this.tColor.createView():this.hdrTex?this.hdrTex.createView():R;for(let e=0;e<a;e++){let t=N&&(e===0||e===a-1)?{querySet:this.qs,...e===0?{beginningOfPassWriteIndex:2}:{},...e===a-1?{endOfPassWriteIndex:3}:{}}:null,n=M.beginRenderPass({colorAttachments:[this.colorMS?{view:this.colorMS.createView(),resolveTarget:z,loadOp:`clear`,storeOp:`discard`,clearValue:[0,0,0,1]}:{view:z,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:this.tColor?`store`:`discard`},...t?{timestampWrites:t}:{}});n.setBindGroup(0,this.bg),n.setBindGroup(1,this.bgEnvs[this.domeFront]),j&&this.groundPipe&&this.variant.ground&&(n.setPipeline(this.groundPipe),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,j)),j&&(n.setPipeline(this.water),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,j)),n.setPipeline(this.sky),n.draw(3),n.end()}if(this.tColor&&this.temporal.resolve(M,this.tColor.createView(),this.depth.createView(),this.reproj,[O[0],-O[1]],R,N?{querySet:this.qs,beginningOfPassWriteIndex:4,endOfPassWriteIndex:5}:null),this.hdrTex){let e=M.beginRenderPass({colorAttachments:[{view:R,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}]});e.setPipeline(this.blit),e.setBindGroup(0,this.blitBG),e.draw(3),e.end()}let B=null,V=this.tColor?6:4;N&&(M.resolveQuerySet(this.qs,0,V,this.qres,0),B=this.qread.pop()??c.createBuffer({size:48,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),M.copyBufferToBuffer(this.qres,0,B,0,8*V)),c.queue.submit([M.finish()]),this.inFlight++;let H=performance.now();c.queue.onSubmittedWorkDone().then(()=>{this.inFlight--,at(this.doneMs,performance.now()-H)}).catch(()=>{this.inFlight--});let U=++this.frameNo;B&&B.mapAsync(GPUMapMode.READ).then(()=>{at(this.readMs,performance.now()-H);let e=new BigUint64Array(B.getMappedRange()),t=Number(e[1]-e[0])/1e6,n=V===6?Number(e[5]-e[4])/1e6:0,r=Number(e[3]-e[2])/1e6+n;at(this.gpu.fft,t),at(this.gpu.draw,r),at(this.gpu.post,n),o!=null&&at(this.gpu.tagged,{tag:o,fft:t,draw:r,post:n,lag:this.frameNo-U}),B.unmap(),this.qread.push(B)}).catch(()=>{}),this.patches=j,this.vertices=j*(this.grid+1)**2,at(this.cpuMs,performance.now()-s)}};function at(e,t){e.push(t),e.length>1200&&e.splice(0,600)}function ot(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}var st=9.81,ct={hs:1.2,tp:10,gamma:3.3,spread:10,offNormal:0,seed:3};function lt(e,t,n){let r=Math.sqrt(e*(st*t*t/(2*Math.PI))),i=.35*n*r,a=.75*n*r,o=.06*r;return{setup:i,sInc:a,sIG:o,R2:1.1*(i+Math.hypot(a,o)/2)}}var ut=.7,dt=e=>`
struct SW { grid: vec4f, size: vec4f, out: vec4f, misc: vec4f, sw: vec4f, bin: array<vec4f, ${e}> };
@group(0) @binding(0) var<uniform> U: SW;      // grid: a0, u0, 1/cell, bins; size: nx, ny; out: a0, u0, cell, n (texels a side); misc: time, chop, gamma; sw: (unused: the setup is layer 3's), the run-up's gain at the waves' periods, at the surf beat's, the bins' sum of amp^2; bin: omega, amp, phi
@group(0) @binding(1) var bins: texture_2d_array<f32>;      // amp, S, ka, ku per bin
@group(0) @binding(2) var outH: texture_storage_2d<rgba16float, write>;      // h, disp a, disp u, Hs
@group(0) @binding(3) var outS: texture_storage_2d<rgba16float, write>;      // dh/da, dh/du
@group(0) @binding(4) var bedTex: texture_2d<f32>;
@group(0) @binding(5) var bedSamp: sampler;
struct BedMap { m: vec4f };
@group(0) @binding(6) var<uniform> B: BedMap;      // the bed texture's a0, u0, 1/size
@group(0) @binding(7) var brk: texture_2d<f32>;      // layer 3 ( breakSea) on the bins' grid: the energy's survival, the share breaking, the loss, the setup
fn brkAt(q: vec2i) -> vec4f { let n = vec2i(i32(U.size.x), i32(U.size.y)); return textureLoad(brk, clamp(q, vec2i(0), n - 1), 0); }
@group(0) @binding(8) var shp: texture_2d<f32>;      // the waves' shape here ( waveShape): Abreu's r and phi
fn shpAt(q: vec2i) -> vec4f { let n = vec2i(i32(U.size.x), i32(U.size.y)); return textureLoad(shp, clamp(q, vec2i(0), n - 1), 0); }
@group(0) @binding(9) var sref: texture_2d<f32>;      // each bin's phase on the line its swash is timed from, by column ( REF_U)
fn srefAt(i: i32, b: i32) -> f32 { return textureLoad(sref, vec2i(clamp(i, 0, i32(U.size.x) - 1), b), 0).x; }
fn tex(l: i32, q: vec2i) -> vec4f { let n = vec2i(i32(U.size.x), i32(U.size.y)); return textureLoad(bins, clamp(q, vec2i(0), n - 1), l, 0); }
@compute @workgroup_size(8, 8) fn main(@builtin(global_invocation_id) id: vec3u) {
  let n = u32(U.out.w);
  if (id.x >= n || id.y >= n) { return; }
  let au = U.out.xy + (vec2f(id.xy) + 0.5) * U.out.z;
  let g = (au - U.grid.xy) * U.grid.z - 0.5;
  let q0 = vec2i(floor(g));
  let f = g - floor(g);
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
  var zi = 0.0;      // (the waves as they arrive at the shore, at their offshore size: the swash's own)
  var zc = vec2f(0.0);      // (their complex sum: its squared size is the groups' envelope, the surf beat's)
  let t = U.misc.x;
  // the run-up's share here, known before the bins (so the swash's own sums run only where it is: a few texels in a hundred)
  let depth = max(-textureSampleLevel(bedTex, bedSamp, (au - B.m.xy) * B.m.z, 0.0).x, 0.0);
  let w = (1.0 - smoothstep(0.2, 1.2, depth)) * (1.0 - smoothstep(20.0, 40.0, bk.z));
  for (var b = 0; b < i32(U.grid.w); b++) {
    let a00 = tex(b, q0); let a10 = tex(b, q0 + vec2i(1, 0)); let a01 = tex(b, q0 + vec2i(0, 1)); let a11 = tex(b, q0 + vec2i(1, 1));
    let v = mix(mix(a00, a10, f.x), mix(a01, a11, f.x), f.y);
    let th = v.y - U.bin[b].x * t + U.bin[b].z;      // (on land the phase is the shoreline's, carried up)
    let c = cos(th);
    let sn = sin(th);
    if (w > 0.0) {
      let thr = mix(srefAt(q0.x, b), srefAt(q0.x + 1, b), f.x) - U.bin[b].x * t + U.bin[b].z;      // (the swash: timed from the reference line)
      let cr = cos(thr);
      let sr = sin(thr);
      zi += U.bin[b].y * cr;
      zc += U.bin[b].y * vec2f(cr, sr);
    }
    let A = U.bin[b].y * v.x * keep;
    if (A <= 0.0) { continue; }
    let kv = v.zw;
    let kl = max(length(kv), 1e-4);
    // (the form's phase is pi/2 - th: its sine is c, its cosine sn)
    let ca = sn * cph - c * sph;
    let sa = c * cph + sn * sph;
    let den = 1.0 - rr * ca;
    hq += A * vec2f(c, sn);
    h += A * ff * (c + cc) / den;
    d -= U.misc.y * A * sn * kv / kl;
    s -= A * ff * (sn * den - (c + cc) * rr * sa) / (den * den) * kv;
    e2 += 0.5 * A * A;
  }
  // the depth-limited cap: the sea's Hs here (4 sqrt of the variance) no more than gamma times the depth
  let hs = 4.0 * sqrt(e2);
  let cap = select(1.0, min(1.0, U.misc.z * depth / hs), hs > 1e-4);
  // near and above the waterline, the run-up's level: layer 3's setup at the shore (carried up the beach), the swash and the surf beat (the
  // envelope's departure from its mean, over its mean); taking over from the sea only in shallow water within 20 to 40 m of the shoreline
  // (layer 3's distance), not over shallow bars out in the surf
  let zeta = bk.w + U.sw.y * zi + U.sw.z * (dot(zc, zc) - U.sw.w) / max(U.sw.w, 1e-6);
  textureStore(outH, id.xy, vec4f(mix(h * cap + bk.w, zeta, w), d * cap * (1.0 - w), hs * cap));
  // which waves break, wave by wave: those whose height here (twice the envelope) is above the height that a share Qb of a Rayleigh sea
  // exceeds, Hrms sqrt(-ln Qb) (so on average the share is layer 3's), whitened from the crest on and fading behind it over about two
  // fifths of the wave's cycle (the bore's foam), moving with the wave; a first picture until M4's breakers and M5's foam
  let hrms = 2.0 * sqrt(2.0 * e2) * cap;
  let qb = bk.y;
  let brkW = select(0.0, smoothstep(0.85, 1.15, 2.0 * length(hq) * cap / max(hrms * sqrt(-log(max(qb, 1e-4))), 1e-3)), qb > 0.005);
  let since = fract(-atan2(hq.y, hq.x) / 6.2831853);      // (the share of the wave's cycle since its crest passed here)
  // (and the older foam the bores leave behind, a share of the breaking: a stand-in for M5's foam, which will carry and age it)
  let foam = max(brkW * exp(-since * 6.2831853 / 2.5), 0.35 * qb);
  textureStore(outS, id.xy, vec4f(s * cap * (1.0 - w), w, foam * (1.0 - w)));      // (z: the run-up's share, for the edge at the pixel's scale; w: the breaking waves' whitewater)
}`,ft=class{constructor(e,t,n,r,{n:i=512,cell:a=1,a0:o=-256,u0:s=-16,chop:c=ut,gamma:l=.78,swash:u=null}={}){Object.assign(this,{device:e,n:i,cell:a,a0:o,u0:s,chop:c,gamma:l});let d=t.bins.length,f=t.nx,p=t.ny;this.bins=e.createTexture({label:`swell bins`,size:[f,p,d],format:`rgba32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),t.bins.forEach((t,n)=>{let r=new Float32Array(f*p*4);for(let e=0;e<f*p;e++)r[4*e]=t.amp[e],r[4*e+1]=t.S[e],r[4*e+2]=t.ka[e],r[4*e+3]=t.ku[e];e.queue.writeTexture({texture:this.bins,origin:[0,0,n]},r,{bytesPerRow:f*16,rowsPerImage:p},[f,p,1])}),this.brk=e.createTexture({label:`swell breaking`,size:[f,p],format:`rgba32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let m=t.breaking??Float32Array.from({length:f*p*4},(e,t)=>+(t%4==0));e.queue.writeTexture({texture:this.brk},m,{bytesPerRow:f*16},[f,p]),this.sref=e.createTexture({label:`swell swash phase`,size:[f,d],format:`r32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let h=new Float32Array(f*d);t.bins.forEach((e,t)=>{e.sref&&h.set(e.sref,t*f)}),e.queue.writeTexture({texture:this.sref},h,{bytesPerRow:f*4},[f,d]),this.shp=e.createTexture({label:`swell shape`,size:[f,p],format:`rg32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.queue.writeTexture({texture:this.shp},t.shape??new Float32Array(f*p*2),{bytesPerRow:f*8},[f,p]);let g=t=>e.createTexture({label:t,size:[i,i],format:`rgba16float`,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING});this.outH=g(`swell surface`),this.outS=g(`swell slope`),this.U=new Float32Array(20+4*d),this.U.set([t.a0,t.u0,1/t.cell,d,f,p,0,0,o,s,a,i,0,c,l,0],0);let _=t.bins.reduce((e,t)=>e+t.a*t.a,0),v=4*Math.sqrt(_/2);u?this.U.set([u.setup,u.sInc/v,u.sIG/4,_],16):this.U.set([0,0,0,_],16),t.bins.forEach((e,t)=>this.U.set([e.omega,e.a,e.phi,0],20+4*t)),this.ubuf=e.createBuffer({size:this.U.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.bbuf=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.bbuf,0,new Float32Array([r.a0,r.u0,1/r.size,0])),this.module=e.createShaderModule({label:`swell`,code:dt(d)}),this.pipe=e.createComputePipeline({label:`swell`,layout:`auto`,compute:{module:this.module,entryPoint:`main`}});let y=e.createSampler({magFilter:`linear`,minFilter:`linear`});this.bg=e.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.bins.createView({dimension:`2d-array`})},{binding:2,resource:this.outH.createView()},{binding:3,resource:this.outS.createView()},{binding:4,resource:n},{binding:5,resource:y},{binding:6,resource:{buffer:this.bbuf}},{binding:7,resource:this.brk.createView()},{binding:8,resource:this.shp.createView()},{binding:9,resource:this.sref.createView()}]})}encode(e,t){this.U[12]=t,this.device.queue.writeBuffer(this.ubuf,0,this.U),e.setPipeline(this.pipe),e.setBindGroup(0,this.bg),e.dispatchWorkgroups(Math.ceil(this.n/8),Math.ceil(this.n/8))}get map(){return[this.a0,this.u0,1/(this.n*this.cell),1]}},q=new URLSearchParams(location.search),J=(e,t)=>q.get(e)==null?t:Number(q.get(e)),pt=document.getElementById(`hud`),Y=document.getElementById(`view`),X={ready:!1,done:!1,errors:[],frames:0,fft:[],draw:[],wall:[]};window.__sim2=X;var mt=e=>{X.errors.length>=20||X.errors.includes(e)||(X.errors.push(e),pt.textContent=`${pt.textContent}\n${e}`,console.error(e))},Z=e=>{if(!e.length)return null;let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},ht=e=>{q.get(`post`)&&fetch(`./__report`,{method:`POST`,body:e}).catch(()=>{})},Q=e=>e==null?`-`:e.toFixed(1),$=e=>e==null?`-`:e.toFixed(2);function gt(){let e=J(`dpr`,devicePixelRatio),t=(q.get(`size`)??``).split(`x`).map(Number);Y.width=t[0]||Math.round(innerWidth*e),Y.height=t[1]||Math.round(innerHeight*e),t[1]&&(Y.style.width=`${Y.width/e}px`,Y.style.height=`${Y.height/e}px`)}var _t=.7;function vt(e,t=()=>0){let n={e:0,n:0,h:J(`eye`,1.1),yaw:(q.get(`yaw`)==null?e.headingDeg??0:J(`yaw`,0))*Math.PI/180,pitch:J(`pitch`,-6)*Math.PI/180,fov:J(`fov`,70)},r=new Set,i=J(`speed`,3.5),a=J(`turn`,0)*Math.PI/180;addEventListener(`keydown`,e=>r.add(e.key.toLowerCase())),addEventListener(`keyup`,e=>r.delete(e.key.toLowerCase()));let o=new Map,s=null,c=performance.now(),l={e:0,n:0,h:0},u=()=>{let e=0,t=0;for(let n of o.values())e+=n.x,t+=n.y;return{x:e/o.size,y:t/o.size,n:o.size}},d=()=>[Math.sin(n.yaw),Math.cos(n.yaw)],f=()=>[Math.cos(n.yaw),-Math.sin(n.yaw)],p=(e,t,r,i)=>{let[a,o]=d(),[s,c]=f(),u=a*e+s*t,p=o*e+c*t;n.e+=u,n.n+=p,n.h=Math.max(.3,Math.min(3e3,n.h+r));let h=1/Math.max(.016,i),g=3*Math.max(4,n.h),_=e=>Math.max(-g,Math.min(g,e));l.e=_(u*h),l.n=_(p*h),l.h=_(r*h)*.5,m=performance.now(),n.lastInput=m},m=0;Y.addEventListener(`contextmenu`,e=>e.preventDefault()),Y.addEventListener(`pointerdown`,e=>{n.lastInput=performance.now(),o.set(e.pointerId,{x:e.clientX,y:e.clientY,two:e.pointerType===`mouse`&&e.button===2}),Y.setPointerCapture(e.pointerId),s=o.size>1?u():null,c=performance.now()}),Y.addEventListener(`pointermove`,e=>{let t=o.get(e.pointerId);if(t){if(o.size===1&&t.two){let r=performance.now(),i=(r-c)/1e3,a=Math.max(1,n.h)*.006;n.yaw+=(e.clientX-t.x)*.004,p((e.clientY-t.y)*a,0,0,i),c=r}else o.size===1&&(n.yaw+=(e.clientX-t.x)*.004,n.pitch=Math.max(-1.5,Math.min(1.2,n.pitch-(e.clientY-t.y)*.004)));if(t.x=e.clientX,t.y=e.clientY,o.size>1&&s&&s.n===o.size){let e=u(),t=e.x-s.x,r=e.y-s.y,i=performance.now(),a=(i-c)/1e3,l=Math.max(1,n.h)*.006;o.size===2?(n.yaw+=t*.004,p(r*l,0,0,a)):p(0,-t*l,r*l*.6,a),s=e,c=i}}});let h=e=>{o.delete(e.pointerId),s=o.size>1?u():null,c=performance.now()};Y.addEventListener(`pointerup`,h),Y.addEventListener(`pointercancel`,h);let g=performance.now();Y.addEventListener(`wheel`,e=>{e.preventDefault();let t=performance.now(),r=Math.min(.1,(t-g)/1e3),i=Math.max(1,n.h)*.004,a=e.deltaMode===1?16:1;g=t;let o=e.deltaX*a,s=e.deltaY*a;e.ctrlKey?p(0,0,-s*i*2,r):e.shiftKey?(n.pitch=Math.max(-1.5,Math.min(1.2,n.pitch+s*.003)),p(0,o*i,0,r)):(n.yaw+=o*.003,p(-s*i,0,0,r))},{passive:!1});let _=q.get(`drone`)==null?q.get(`scene`)!=null:q.get(`drone`)!==`0`;return n.step=e=>{let s=e=>r.has(e),c=+!!s(`w`)-!!s(`s`),u=+!!s(`d`)-!!s(`a`);if(_){let r=3*Math.max(4,n.h)*e,i=+!!s(`e`)-!!s(`q`);l.e+=(Math.sin(n.yaw)*c+Math.cos(n.yaw)*u)*r,l.n+=(Math.cos(n.yaw)*c-Math.sin(n.yaw)*u)*r,l.h+=i*r;let a=o.size>=2||performance.now()-m<60,d=a?1:Math.exp(-e/_t);a||(n.e+=l.e*e,n.n+=l.n*e,n.h+=l.h*e),l.e*=d,l.n*=d,l.h*=d;let f=Math.max(t(n.e,n.n),0)+.3;n.h<f&&(n.h=f,l.h=Math.max(l.h,0)),n.h=Math.min(n.h,3e3),s(`arrowleft`)&&(n.yaw-=e),s(`arrowright`)&&(n.yaw+=e),s(`arrowup`)&&(n.pitch=Math.min(1.2,n.pitch+e*.6)),s(`arrowdown`)&&(n.pitch=Math.max(-1.5,n.pitch-e*.6)),n.speed=Math.hypot(l.e,l.n),n.climb=l.h,n.ground=t(n.e,n.n);return}let d=r.size?Math.max(i,3.5)*4*Math.max(1,n.h/10):_?0:i,f=r.size?c:1;n.e+=(Math.sin(n.yaw)*f+Math.cos(n.yaw)*u)*d*e,n.n+=(Math.cos(n.yaw)*f-Math.sin(n.yaw)*u)*d*e,r.size||(n.yaw+=a*e),s(`arrowleft`)&&(n.yaw-=e),s(`arrowright`)&&(n.yaw+=e),s(`arrowup`)&&(n.pitch=Math.min(1.2,n.pitch+e*.6)),s(`arrowdown`)&&(n.pitch=Math.max(-1.4,n.pitch-e*.6)),s(`q`)&&(n.h=Math.max(.3,n.h*Math.exp(-e))),s(`e`)&&(n.h=Math.min(3e3,n.h*Math.exp(e)))},n}function yt(){let e=document.createElement(`canvas`),t=Math.min(2,devicePixelRatio||1);e.width=150*t,e.height=224*t,e.style.cssText=`position:fixed;top:8px;right:8px;width:150px;height:224px;pointer-events:none;z-index:5`,document.body.appendChild(e);let n=e.getContext(`2d`);n.scale(t,t);let r=[`N`,`NE`,`E`,`SE`,`S`,`SW`,`W`,`NW`];return e=>{let t=e.pitch*180/Math.PI,i=69/45,a=(e.yaw*180/Math.PI%360+360)%360,o=75+t*i;n.clearRect(0,0,150,224),n.save(),n.beginPath(),n.arc(75,75,69,0,2*Math.PI),n.clip(),n.fillStyle=`#3b7fc4`,n.fillRect(0,0,150,150),n.fillStyle=`#8a6a3c`,n.fillRect(0,o,150,150),n.strokeStyle=`#fff`,n.lineWidth=2,n.beginPath(),n.moveTo(0,o),n.lineTo(150,o),n.stroke(),n.lineWidth=1,n.font=`9px system-ui`,n.fillStyle=`#fff`,n.textAlign=`left`;for(let e=-80;e<=80;e+=10){if(!e)continue;let t=o-e*i,r=e%20?10:20;t<6||t>144||(n.beginPath(),n.moveTo(75-r,t),n.lineTo(75+r,t),n.stroke(),e%20||n.fillText(String(e),75+r+3,t+3))}n.restore(),n.strokeStyle=`#fc3`,n.lineWidth=2.5,n.beginPath(),n.moveTo(47,75),n.lineTo(66,75),n.lineTo(75,81),n.lineTo(84,75),n.lineTo(103,75),n.stroke(),n.strokeStyle=`rgba(255,255,255,0.8)`,n.lineWidth=1.5,n.beginPath(),n.arc(75,75,69,0,2*Math.PI),n.stroke(),n.fillStyle=`rgba(0,0,0,0.55)`,n.fillRect(0,150,150,74),n.fillStyle=`#fff`,n.textAlign=`center`,n.font=`bold 13px system-ui`,n.fillText(`${String(Math.round(a)).padStart(3,`0`)}° ${r[Math.round(a/45)%8]}`,75,166),n.font=`12px system-ui`,n.textAlign=`left`;let s=e.h-Math.max(e.ground??0,0);n.fillText(`height ${e.h<10?e.h.toFixed(1):Math.round(e.h)} m`,8,184),n.fillText(`above ${(e.ground??0)>0?`ground`:`water`} ${s<10?s.toFixed(1):Math.round(s)} m`,8,200),n.fillText(`pitch ${Math.round(t)}°  speed ${(e.speed??0).toFixed(1)} m/s`,8,216)}}function bt(){let e=new URLSearchParams(location.search),t=document.createElement(`div`);t.style.cssText=`position:fixed;right:8px;bottom:8px;display:flex;flex-direction:column;gap:4px;font:12px system-ui;z-index:6;background:rgba(0,0,0,.55);padding:6px;border-radius:6px;color:#fff`;let n=e=>{let t=new URLSearchParams(location.search);for(let[n,r]of Object.entries(e))r==null?t.delete(n):t.set(n,r);location.search=t.toString()},r=(e,t,r=!1)=>{let i=document.createElement(`button`);return i.textContent=e,i.style.cssText=`font:12px system-ui;padding:3px 8px;border-radius:4px;border:0;cursor:pointer;background:${r?`#fc3`:`#eee`}`,i.onclick=()=>n(t),i},i=(...e)=>{let n=document.createElement(`div`);n.style.cssText=`display:flex;gap:4px;flex-wrap:wrap;justify-content:flex-end`,n.append(...e),t.append(n)},a=e=>{let t=document.createElement(`span`);return t.textContent=e,t.style.cssText=`align-self:center;opacity:.8`,t},o=e.get(`swell`)!==`0`,s=e.get(`seadbg`)===`64`;i(a(`swell`),r(o?`on`:`off`,{swell:o?`0`:null},o),r(`its height alone`,{seadbg:s?null:`64`},s)),i(a(`swell`),...[[`0.6 m`,.6],[`1.2 m`,1.2],[`2 m`,2]].map(([t,n])=>r(t,{hs:n},Number(e.get(`hs`)??1.2)===n)),...[[`7 s`,7],[`10 s`,10],[`14 s`,14]].map(([t,n])=>r(t,{tp:n},Number(e.get(`tp`)??10)===n))),i(a(`view`),r(`paddler`,{eye:1.1,pitch:-4,off:70}),r(`low drone`,{eye:8,pitch:-20,off:60}),r(`aerial`,{eye:220,pitch:-50,off:360}),r(`overhead`,{eye:700,pitch:-89,off:260}));let c=e.get(`rips`)!==`0`,l=Number(e.get(`attach`)??W.rips.attach),u=e.get(`shore`)!==`0`,d=e.get(`divots`)!==`0`;i(a(`bar`),r(`even`,{rips:`0`,attach:null},!c),...[[`crescentic`,0],[`rips`,W.rips.attach],[`transverse`,1]].map(([e,t])=>r(e,{rips:null,attach:t===W.rips.attach?null:t},c&&l===t)),r(d?`divots`:`no divots`,{divots:d?`0`:null},d)),i(a(`shore`),r(u?`cusps, step`:`straight`,{shore:u?`0`:null},u),r(`over a rip`,{eye:260,pitch:-89,off:90,along:W.rips.at}),r(`toward a rip`,{eye:35,pitch:-24,off:-10,along:W.rips.at-120,yawrel:40})),document.body.append(t)}var xt=3,St=J(`ramp`,75),Ct=J(`tail`,30),wt=48;function Tt(e,t){let n=xt+St+Ct,r=[],i=[],a=S(),o=w(),s=null,c=-1,l=0,u=[],d=!1,f=60,p=1,m=e=>e<xt?`warm`:e<xt+St?`ramp`:e<n?`tail`:null,h=(n,a)=>{let o=e.gpu,s=e=>e?e.splice(0):[],c={s:n,phase:a,load:p,fps:l,frameMs:Z(u),doneMs:Z(s(e.doneMs)),drawMs:Z(s(o?.draw)),computeMs:Z(s(o?.fft)),patches:e.patches};if(a===`warm`?i.push(...u):r.push(c),n===2){let e=i.slice().sort((e,t)=>e-t)[Math.floor(i.length*.1)]??16.7;f=e<11?120:e<22?60:30,t.pacing=E(e)}if(a===`ramp`||n===2){let e=l>=.95*f;p=n===2?1:e?Math.min(wt,p+Math.max(1,Math.floor(p/4))):Math.max(1,p-(l<.8*f?2:1))}n+1===xt+St&&(p=1),l=0,u=[]},g=()=>{let e=[`display ${f} fps (${t.pacing??`?`})`],n=r.filter(e=>e.phase===`ramp`),i=r.filter(e=>e.phase===`tail`);for(let t=0;t<St;t+=10){let r=n.filter(e=>e.s-xt>=t&&e.s-xt<t+10).filter(e=>e.fps>=.95*f).map(e=>e.load);e.push(`${t}-${Math.min(St,t+10)} s: held ${r.length?`up to ${Math.max(...r)} copies (median ${Z(r)})`:`no second at the display rate`}`)}let a=(e,t)=>Z(e.map(e=>e[t]).filter(e=>e!=null)),o=i.slice(0,5),s=i.slice(-10);return e.push(`then 1 copy: ${Q(a(o,`fps`))} fps in its first 5 s, ${Q(a(s,`fps`))} in its last 10 s; submit to done ${Q(a(o,`doneMs`))} then ${Q(a(s,`doneMs`))} ms`+(t.timestamps?`; GPU sea ${$(a(s,`drawMs`))} ms, compute ${$(a(s,`computeMs`))} ms`:``)),e},_=async()=>{d=!0;let n=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, canvas ${Y.width}x${Y.height}, MSAA ${e.msaa}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets`,`${await x()}, ${o.report()}`];o.release();let i=[`s phase copies fps frame_ms done_ms gpu_sea_ms gpu_compute_ms patches`,...r.map(e=>[e.s,e.phase,e.load,e.fps,Q(e.frameMs),Q(e.doneMs),$(e.drawMs),$(e.computeMs),e.patches].join(` `))],s=g(),c=[...n,``,`The WebGPU sea: the copies a frame held at the display rate, then one copy:`,...s,``,...i,...X.errors.length?[``,...X.errors]:[]].join(`
`);X.measure={rows:r,lines:s,report:c},ht(c),a.done({lines:s,report:c,title:`Surfski WebGPU sea measurement`,onSend:()=>T(`Surfski WebGPU sea measurement`,c),onCopy:e=>C(c,e)})};return(e,t)=>{if(d)return null;s??=e;let r=Math.floor((e-s)/1e3),i=m(r);return r!==c&&(c>=0&&h(c,m(c)),c=r,i&&a.progress(i===`warm`?`the WebGPU sea, settling`:i===`ramp`?`the WebGPU sea, ${p} cop${p>1?`ies`:`y`} a frame`:`the WebGPU sea drawn once`,n-r)),i?(l++,u.push(t),p):(_(),null)}}var Et=Math.max(1,J(`load`,1)),Dt=J(`slot`,2.5),Ot=.5,kt=J(`rounds`,3),At=4,jt=Math.max(1,J(`load`,1)),Mt=.08;function Nt(e,t=!1){let n=t=>Math.min(1,Math.sqrt(t/e));return t?[[`full again`,{}],[`no swell (its compute and reads; the bed fades the open sea)`,{swell:!1}],[`no whitewater`,{dbg:1024}],[`no water’s edge at the pixel’s scale`,{dbg:256}],[`the bed read bilinear only (no cubic)`,{dbg:512}],[`the cover’s patches as their mean`,{dbg:128}],[`all three bed cuts`,{dbg:896}],[`no ground pass`,{ground:!1}],[`no ripples`,{ripples:!1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`1.2 megapixels`,{scale:n(12e5)}],[`one colour (mesh, raster only)`,{shade:!1}]]:[[`full again`,{}],[`MSAA off`,{msaa:1}],[`1.2 megapixels`,{scale:n(12e5)}],[`1.2 megapixels, MSAA off`,{scale:n(12e5),msaa:1}],[`0.6 megapixels`,{scale:n(6e5)}],[`no ripples`,{ripples:!1}],[`sky from 1 facet, not 4`,{facets:1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`flat vertices (no displacement)`,{vsDisp:!1}],[`one colour (mesh, raster, MSAA only)`,{shade:!1}],[`the position among the fragment inputs`,{fsPos:!0}],[`MSAA off, 16 x 16 patches`,{msaa:1,grid:16}],[`one colour, MSAA off`,{shade:!1,msaa:1}],[`half-float target, own resolve (web-ocean)`,{target:`hdr`}],[`half-float target, MSAA off`,{target:`hdr`,msaa:1}],[`depth24plus, not depth32float`,{depth:`depth24plus`}],[`footprint worked out (no derivatives)`,{deriv:!1}],[`footprint worked out, MSAA off`,{deriv:!1,msaa:1}],[`interpolation marked centre`,{interp:`@interpolate(perspective, center)`}],[`added arithmetic (MSAA 4)`,{burn:64}],[`added arithmetic, MSAA off`,{burn:64,msaa:1}],[`added arithmetic in the sky (one big triangle)`,{skyBurn:256}],[`added arithmetic in the sky, MSAA off`,{skyBurn:256,msaa:1}],[`temporal, drawn at 0.7 of the size`,{target:`temporal`,rs:.7}],[`temporal, drawn at 0.5 of the size`,{target:`temporal`,rs:.5}],[`temporal, drawn at full size`,{target:`temporal`,rs:1}],[`temporal, drawn at 0.85 of the size`,{target:`temporal`,rs:.85}],[`every ripple band read in full (no regimes)`,{regimes:0}],[`no regimes, MSAA off`,{regimes:0,msaa:1}],[`both regimes, MSAA off`,{regimes:3,msaa:1}]]}function Pt(e,t,n,r=!1){let i=q.get(`only`)?.split(`,`).map(Number),a=Nt(n[0]*n[1],r).filter((e,t)=>!i||i.includes(t)),o=[];for(let e=0;e<kt;e++)for(let[e,t]of a)o.push([`full`,{}],[e,t]);o.push([`full`,{}]);let s=At+o.length*Dt+1.5,c=S(),l=w(),u=o.map(([e])=>({name:e,frames:0,draw:[],post:[],compute:[],lag:[],iv:[],tLast:null})),d=null,f=-2,p=!1,m=null,h={msaa:e.variant.msaa,grid:e.variant.grid},g=([,t])=>{let{scale:r=1,...i}=t;Y.width=Math.round(n[0]*r),Y.height=Math.round(n[1]*r),e.setVariant({...h,...i})};for(let[,t]of a){let{scale:n,...r}=t;e.setVariant({...h,...r})}e.setVariant(h);let _=()=>{for(let t of e.gpu?.tagged.splice(0)??[]){let e=u[t.tag];e&&(e.draw.push(t.draw-t.post),e.post.push(t.post),e.compute.push(t.fft),e.lag.push(t.lag))}},v=async()=>{p=!0,_(),g([`full`,{}]);let r=(e,t)=>{let n=e.slice().sort((e,t)=>e-t);return n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:null},i=u.map((e,t)=>{let n=d+(At+(t+1)*Dt)*1e3,i=r(e.iv,.5),a=e.frames===0||n-e.tLast>Math.max(500,3*(i??0));return{name:e.name,drawMs:e.draw.length?Z(e.draw)/jt+Z(e.post):null,postMs:Z(e.post),computeMs:Z(e.compute),fps:e.frames/(Dt-Ot),n:e.draw.length,lag:Z(e.lag),p50:i,p95:r(e.iv,.95),partial:a}}),o=i.findIndex((e,t)=>e.fps===0&&i.slice(t).every(e=>e.fps===0)),s=t.timestamps?`drawMs`:`fps`,f=[];for(let[e]of a){let n=[],r=[],a=0;i.forEach((o,c)=>{if(o.name!==e||o.partial||i[c-1]?.partial||i[c+1]?.partial)return;let l=i[c-1]?.[s],u=i[c+1]?.[s],d=o[s];if(l==null||u==null||d==null)return;let f=(l+u)/2;n.push((t.timestamps?f-d:d-f)/f),r.push(f-d),Math.abs(l-u)/f>Mt&&a++}),f.push({name:e,rel:Z(n),lo:n.length?Math.min(...n):null,hi:n.length?Math.max(...n):null,ms:Z(r),pairs:n.length,drift:a})}let m=i.filter(e=>e.name===`full`&&!e.partial),h=e=>e==null?`-`:`${Math.round(e*100)}%`,v=[t.timestamps?`the full picture: ${$(Z(m.map(e=>e.drawMs)))} ms of GPU (${$(m[0]?.drawMs)} at the start, ${$(m[m.length-1]?.drawMs)} at the end), compute ${$(Z(m.map(e=>e.computeMs)))} ms, ${Q(Z(m.map(e=>e.fps)))} fps`:`the full picture: ${Q(Z(m.map(e=>e.fps)))} fps (no GPU timers here: the shares are of frames a second)`,...f.map(e=>`${e.name}: ${t.timestamps?`saves`:`gains`} ${h(e.rel)}${t.timestamps?` (${$(e.ms)} ms)`:``}, ${h(e.lo)} to ${h(e.hi)}${e.drift?`; ${e.drift} of ${e.pairs} pairs drifted`:``}`),`the times came back ${Q(Z(u.flatMap(e=>e.lag)))} frames late; submit to done ${Q(Z(e.doneMs))} ms, to the timers read back ${Q(Z(e.readMs))} ms`];o>=0&&v.push(`no frames from slot ${o} on (about ${Math.round(At+o*Dt)} s in): the page stopped drawing (the screen locked, or the page was hidden); the slots before it stand`);let y=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, full canvas ${n[0]}x${n[1]}, MSAA 4${jt>1?`, ${jt} copies a frame (times per copy)`:``}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets, ${e.patches} patches`,`${await x()}, ${l.report()}`];l.release();let b=[`slot variant gpu_sea_ms gpu_resolve_ms gpu_compute_ms fps samples lag_frames frame_p50_ms frame_p95_ms cut_short`,...i.map((e,t)=>[t,`"${e.name}"`,$(e.drawMs),$(e.postMs),$(e.computeMs),Q(e.fps),e.n,e.lag,Q(e.p50),Q(e.p95),+!!e.partial].join(` `))],S=[...y,``,`The WebGPU sea, part by part (each against the full picture either side of it):`,...v,``,...b,...X.errors.length?[``,...X.errors]:[]].join(`
`);X.sweep={slots:i,rows:f,lines:v,report:S},ht(S),c.done({lines:v,report:S,title:`Surfski WebGPU sea parts`,onSend:()=>T(`Surfski WebGPU sea parts`,S),onCopy:e=>C(S,e)})};return{before(e){if(p)return null;d??=e;let t=(e-d)/1e3-At,n=t<0?-1:Math.floor(t/Dt);if(n>=o.length)return m??=e,e-m>1500?v():_(),null;if(n!==f&&(f=n,n>=0&&g(o[n]),(n===0||n===o.length>>1)&&ht(`sweep progress: slot ${n} of ${o.length} at ${Q((e-d)/1e3)} s, ${X.frames} frames${X.errors.length?`; ${X.errors.join(`; `)}`:``}`),c.progress(n>=0?`the WebGPU sea's parts: ${o[n][0]}`:`the WebGPU sea, settling`,s-(e-d)/1e3)),_(),n<0||t-n*Dt<Ot)return null;let r=u[n];return r.tLast!=null&&r.iv.push(e-r.tLast),r.tLast=e,r.frames++,n}}}var Ft=``;async function It(){if(!navigator.gpu){mt(`WebGPU is not available in this browser`);return}let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e){mt(`WebGPU: no adapter`);return}let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:t?[`timestamp-query`]:[]});n.addEventListener(`uncapturederror`,e=>mt(`WebGPU error: ${e.error.message}`)),n.lost.then(e=>mt(`WebGPU device lost: ${e.message}`)),gt(),!q.get(`size`)&&!q.get(`sweep`)&&addEventListener(`resize`,gt);let a=r(q.get(`course`)??(q.get(`scene`)===`beach`?`perth-trigg-sorrento`:`gorge-swellcity`))??r(`gorge-swellcity`),o=i(a.name),s=o.state.fft.sea,c=s.sets.slice(0,32),l=new A(n);l.build({...s,sets:c});let u=new it(n,Y,{msaa:J(`msaa`,1),timestamps:t,grid:J(`grid`,32),patch0:J(`patch0`,4),levels:J(`levels`,12),rangeK:J(`rangeK`,6)}),d=new j(n);for(let e of[...u.modules,...d.modules])for(let t of(await e.getCompilationInfo()).messages)mt(`${e.label} ${t.type} line ${t.lineNum}:${t.linePos} ${t.message}`);u.setSea(l,d,o.state,{micro:J(`ripples`,1),debug:J(`seadbg`,0)});let f=q.get(`scene`)===`beach`?{...W}:null;if(f){for(let[e,t]of[[`d50`,`d50`],[`faceslope`,`faceSlope`],[`berm`,`berm`],[`dune`,`dune`],[`seed`,`seed`]])q.get(e)!=null&&(f[t]=J(e,f[t]));q.get(`bar`)!=null&&(f.bar={...f.bar,height:J(`bar`,f.bar.height)}),f.rips=q.get(`rips`)===`0`?null:{...f.rips,attach:Math.min(1,Math.max(0,J(`attach`,f.rips.attach))),spacing:Math.max(40,J(`ripspacing`,f.rips.spacing)||f.rips.spacing)},q.get(`shore`)===`0`&&(f.shore=null),f.divots=q.get(`divots`)===`0`?null:{...f.divots,hs:Math.max(0,J(`divhs`,f.divots.hs)),tp:Math.max(2,J(`divtp`,f.divots.tp))},f.facing=J(`facing`,((o.state.dirToDeg??20)+180)%360);let e={hs:J(`hs`,ct.hs),tp:J(`tp`,ct.tp)},t=q.get(`swell`)===`0`?null:lt(e.hs,e.tp,f.faceSlope);t&&(f.wetLine=t.R2);let r=performance.now(),i=new Worker(new URL(new URL(`bed-texture-worker-hhUHCcwj.js`,import.meta.url).href,``+import.meta.url),{type:`module`});i.onmessage=e=>{f.tex=e.data.inner,f.tex.outer=e.data.outer,f.buildMs=performance.now()-r,X.bedBake={ms:e.data.ms,wallMs:f.buildMs},i.terminate(),u.setBed(f.tex,[0,0],f.facing,f),a&&=(a(),null)},i.postMessage({P:{...f}});let a=null;if(q.get(`swell`)!==`0`){let e={...ct,hs:J(`hs`,ct.hs),tp:J(`tp`,ct.tp),spread:J(`spread`,ct.spread)},r=new Worker(new URL(new URL(`bed-solve-worker-D2TwBR1U.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),i=performance.now();r.onmessage=e=>{if(e.data.progress){Ft=`the bed's wave response: ${e.data.progress[0]} of ${e.data.progress[1]} bins`;return}let o=e.data.result;X.swellSolve={ms:o.ms,wallMs:performance.now()-i,bins:o.bins.length,grid:[o.nx,o.ny]};let s=()=>u.setSwell(new ft(n,o,u.bedTex.createView(),f.tex,{u0:Math.floor(o.u0),swash:q.get(`swash`)===`0`?null:t}));if(f.tex?s():a=s,Ft=``,r.terminate(),t&&o.breaking){let e=0,n=0;for(let t=0;t<o.nx;t++)for(let r=0;r<o.ny;r++){let i=4*(r*o.nx+t);if(o.breaking[i+2]>0){e+=o.breaking[i+3],n++;break}}let r=n?e/n:t.setup;X.runup={setup:r,R2:1.1*(r+Math.hypot(t.sInc,t.sIG)/2)},u.setWetLine(X.runup.R2)}},r.postMessage({P:{...f},swell:e,opts:{cell:2}})}}let p=q.get(`regimes`)==null?1:J(`regimes`,1);if(q.get(`aa`)===`temporal`?u.setVariant({target:`temporal`,rs:J(`rs`,.7),detail:q.get(`detail`)==null?null:J(`detail`,1),regimes:p}):p!==1&&u.setVariant({msaa:u.msaa,grid:u.grid,regimes:p}),q.get(`v`)){let e=Object.fromEntries(q.get(`v`).split(`,`).map(e=>e.split(`:`)).map(([e,t])=>[e,t===`true`?!0:t===`false`?!1:Number.isNaN(Number(t))?t:Number(t)]));u.setVariant({...u.variant,...e})}if(u.temporal)for(let[e,t]of[[`twmax`,`wMax`],[`twsoft`,`wSoft`],[`tsign`,`sigN`],[`tsigw`,`sigW`],[`tsharp`,`sharpen`]])q.get(e)!=null&&(u.temporal[t]=J(e,0));u.temporal&&q.get(`jitter`)===`0`&&(u.temporal.jitter=!1);let m=vt(o,f?(e,t)=>{let n=f.facing*Math.PI/180,r=Math.sin(n),i=Math.cos(n);return Te(e*i-t*r,e*r+t*i,f).y}:()=>-1e3),h=J(`frames`,0);X.cam=m;let g=performance.now();addEventListener(`keydown`,()=>{g=performance.now()}),addEventListener(`wheel`,()=>{m.lastInput=performance.now()},{passive:!0});let _=()=>g,v=(q.get(`drone`)==null?q.get(`scene`):q.get(`drone`)!==`0`)&&q.get(`instruments`)!==`0`?yt():null;if(f&&q.get(`trial`)!==`0`&&!q.get(`frames`)&&!q.get(`probe`)&&bt(),f){let e=f.facing*Math.PI/180,t=q.get(`off`)==null,n=J(`off`,-8),r=J(`along`,t?11:0);m.e=Math.sin(e)*n+Math.cos(e)*r,m.n=Math.cos(e)*n-Math.sin(e)*r,q.get(`yawrel`)==null?q.get(`yaw`)??(m.yaw=t?e+16*Math.PI/180:e+Math.PI):m.yaw=e+J(`yawrel`,0)*Math.PI/180,t&&q.get(`eye`)==null&&(m.h=14.4),t&&q.get(`pitch`)==null&&(m.pitch=-20.6*Math.PI/180)}let y=o.look??{},b=J(`sunaz`,y.sunAz??200),x=J(`sunel`,y.sunEl??30);u.setLook(new te(n).set({sunElDeg:x,haze:q.get(`haze`)??y.haze??null,teal:J(`teal`,f?.85:y.teal??.6),turbid:J(`turbid`,f?0:y.turbid??0),bottom:f?[1,1,1]:y.bottom??null,glint:J(`glint`,1.3),cloud:J(`cloud`,y.cloud??.35),cloudType:J(`cloudtype`,y.cloudType??.25),cloudVar:J(`cloudvar`,y.cloudVar??.4),cloudDark:J(`clouddark`,y.cloudDark??0)}));let S=b*Math.PI/180,C=x*Math.PI/180,w={sunDir:[Math.sin(S)*Math.cos(C),Math.sin(C),-Math.cos(S)*Math.cos(C)]};X.info={course:a.id,adapter:`${e.info?.vendor??``} ${e.info?.architecture??``}`.trim()||`unknown`,timestamps:t,sets:c.length,msaa:u.msaa};let T=q.get(`measure`)?Tt(u,X.info):null,E=q.get(`sweep`)?Pt(u,X.info,[Y.width,Y.height],!!f):null,D=performance.now(),O=0,k=1,M=q.get(`freeze`)==null?null:J(`freeze`,100),ee=q.get(`freezesea`)==null?null:J(`freezesea`,100),N=!q.get(`noqueuecap`),P=q.get(`dt`)==null?null:J(`dt`,1/60),F=null;if(!q.get(`probe`)&&!q.get(`frames`)&&[`127.0.0.1`,`localhost`,`[::1]`].includes(location.hostname)){let e=document.createElement(`div`);e.style.cssText=`position:fixed;inset:auto 0 40% 0;margin:auto;width:fit-content;padding:10px 16px;background:rgba(0,0,0,.75);color:#fff;font:15px system-ui;border-radius:8px;display:none;z-index:9`,document.body.appendChild(e);let t=()=>fetch(`/__probe`).then(e=>e.json()).then(t=>{F=t.busy?t:null,e.style.display=t.busy?`block`:`none`,t.busy&&(e.textContent=`Paused: a performance probe is running (${t.why}; about ${t.left} s left)`)}).catch(()=>{}).finally(()=>setTimeout(t,1500));t()}let I=J(`idlefps`,20),L=J(`fps`,60),R=0,z=e=>{if(F){D=e,requestAnimationFrame(z);return}let t=!h&&!E&&!T&&(!document.hasFocus()||e-Math.max(m.lastInput??0,_())>1e4);if(!h&&!E&&!T&&e-R<1e3/(t?I:L)-2){requestAnimationFrame(z);return}if(R=e,N&&!u.ready()){X.skipped=(X.skipped??0)+1,requestAnimationFrame(z);return}let n=P??Math.min(.1,(e-D)/1e3);D=e,O+=n;let r=!f||!!f.tex&&(q.get(`swell`)===`0`||!!u.swell);k=T&&r?T(e,n*1e3)??1:E&&r?jt:T||E?1:Et;let i=r?E?.before(e)??null:null;if(M==null&&!E&&m.step(n),u.frame(m,M??ee??100+O,{...w,load:k,tag:i}),v?.(m),X.frames++,X.wall.push(n*1e3),X.wall.length>1200&&X.wall.splice(0,600),X.ready=!0,X.frames%20==0){let e=u.gpu,t=Z(X.wall.slice(-60));pt.textContent=`${Y.width}x${Y.height}, MSAA ${u.msaa}, ${c.length} sets, ${u.patches} patches${k>1?`, drawn ${k} times`:``}\nframe ${Q(t)} ms${e?`; GPU: FFT and ripples ${$(Z(e.fft.slice(-60)))} ms, sea and sky ${$(Z(e.draw.slice(-60)))} ms`:`; submit to done ${Q(Z(u.doneMs.slice(-60)))} ms`}\neye ${m.h.toFixed(1)} m, pitch ${(m.pitch*180/Math.PI).toFixed(0)}°${Ft?`\n${Ft}`:``}${X.errors.length?`\n${X.errors.join(`
`)}`:``}`}if(h&&X.frames>=h){let e=u.gpu;Object.assign(X,{done:!0,fftMs:e?Z(e.fft.slice(10)):null,drawMs:e?Z(e.draw.slice(10)):null,postMs:e?Z(e.post.slice(10)):null,frameMs:Z(X.wall.slice(10)),doneMs:Z(u.doneMs.slice(10)),patches:u.patches,perLevel:u.perLevel,vertices:u.vertices,cpuMs:Z(u.cpuMs.slice(10)),size:[Y.width,Y.height]}),X.fft=e?.fft??[],X.draw=e?.draw??[],ht([navigator.userAgent,location.href,`canvas ${Y.width}x${Y.height}, rendered ${u.renderSize?.join(`x`)}`,`GPU: compute ${$(X.fftMs)} ms, sea and sky with resolve and present ${$(X.drawMs)} ms, of which resolve and present ${$(X.postMs)} ms; frame ${Q(X.frameMs)} ms`].join(`
`))}else requestAnimationFrame(z)};requestAnimationFrame(z)}It().catch(e=>mt(`sim2 failed: ${e.message}`));