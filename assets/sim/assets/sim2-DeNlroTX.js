/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,s as t,t as n}from"./fftsea-BlV7h9PB.js";import{_ as r}from"./seas-CiqO6vxw.js";import{i}from"./scenarios-CUIjf6SF.js";import{a,c as o,d as s,f as c,i as l,m as u,n as d,o as f,p,r as m,s as h,t as g,u as _}from"./atmosphere-CzlQdgsZ.js";import"./fftgpu-CavxKjr5.js";import{c as v,d as y,l as b,n as x,o as S}from"./perf-measure-BhdqA_WF.js";import"./ripcascade-CufHP4RE.js";import{n as C,t as w}from"./ripples-webgpu-DC01rn5d.js";var T=`
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
}`;function E(e){let t=(e,t)=>{let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r},n=e%8+1;return[t(n,2)-.5,t(n,3)-.5]}var D=class{constructor(e,t,{wMax:n=12,wSoft:r=2,sigN:i=.35,sigW:a=.45,sharpen:o=0,jitter:s=!0}={}){Object.assign(this,{device:e,wMax:n,wSoft:r,sigN:i,sigW:a,sharpen:o,jitter:s});let c=e.createShaderModule({code:T,label:`temporal resolve`});this.modules=[c],this.pipe=e.createRenderPipeline({layout:`auto`,label:`temporal resolve`,vertex:{module:c,entryPoint:`vs`},fragment:{module:c,entryPoint:`fs`,targets:[{format:t},{format:`rgba16float`}]}}),this.uni=e.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(32),this.lin=e.createSampler({magFilter:`linear`,minFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),this.size=``,this.hist=[],this.cur=0,this.valid=!1}resize(e,t,n,r){let i=[e,t,n,r].join(` `);if(i!==this.size){this.size=i,this.inSize=[e,t],this.outSize=[n,r];for(let e of this.hist)e.destroy();this.hist=[0,1].map(()=>this.device.createTexture({size:[n,r],format:`rgba16float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),this.valid=!1}}reset(){this.valid=!1}resolve(e,t,n,r,i,a,o=null){let s=this.device,c=this.hist[this.cur],l=this.hist[1-this.cur],u=this.outSize[0]/this.inSize[0];this.uniF.set(r,0),this.uniF.set([...this.inSize,...this.outSize,i[0],i[1],this.wMax,+!!this.valid,u,this.sharpen,this.sigN,Math.max(this.sigW,.5*u),this.wSoft,0,0,0],16),s.queue.writeBuffer(this.uni,0,this.uniF);let d=s.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:t},{binding:2,resource:n},{binding:3,resource:c.createView()},{binding:4,resource:this.lin}]}),f=e.beginRenderPass({colorAttachments:[{view:a,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]},{view:l.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],...o?{timestampWrites:o}:{}});f.setPipeline(this.pipe),f.setBindGroup(0,d),f.draw(3),f.end(),this.cur=1-this.cur,this.valid=!0}};function O(e){let t=Array.from(e),n=new Float32Array(16);n[0]=t[5]*t[10]*t[15]-t[5]*t[11]*t[14]-t[9]*t[6]*t[15]+t[9]*t[7]*t[14]+t[13]*t[6]*t[11]-t[13]*t[7]*t[10],n[4]=-t[4]*t[10]*t[15]+t[4]*t[11]*t[14]+t[8]*t[6]*t[15]-t[8]*t[7]*t[14]-t[12]*t[6]*t[11]+t[12]*t[7]*t[10],n[8]=t[4]*t[9]*t[15]-t[4]*t[11]*t[13]-t[8]*t[5]*t[15]+t[8]*t[7]*t[13]+t[12]*t[5]*t[11]-t[12]*t[7]*t[9],n[12]=-t[4]*t[9]*t[14]+t[4]*t[10]*t[13]+t[8]*t[5]*t[14]-t[8]*t[6]*t[13]-t[12]*t[5]*t[10]+t[12]*t[6]*t[9],n[1]=-t[1]*t[10]*t[15]+t[1]*t[11]*t[14]+t[9]*t[2]*t[15]-t[9]*t[3]*t[14]-t[13]*t[2]*t[11]+t[13]*t[3]*t[10],n[5]=t[0]*t[10]*t[15]-t[0]*t[11]*t[14]-t[8]*t[2]*t[15]+t[8]*t[3]*t[14]+t[12]*t[2]*t[11]-t[12]*t[3]*t[10],n[9]=-t[0]*t[9]*t[15]+t[0]*t[11]*t[13]+t[8]*t[1]*t[15]-t[8]*t[3]*t[13]-t[12]*t[1]*t[11]+t[12]*t[3]*t[9],n[13]=t[0]*t[9]*t[14]-t[0]*t[10]*t[13]-t[8]*t[1]*t[14]+t[8]*t[2]*t[13]+t[12]*t[1]*t[10]-t[12]*t[2]*t[9],n[2]=t[1]*t[6]*t[15]-t[1]*t[7]*t[14]-t[5]*t[2]*t[15]+t[5]*t[3]*t[14]+t[13]*t[2]*t[7]-t[13]*t[3]*t[6],n[6]=-t[0]*t[6]*t[15]+t[0]*t[7]*t[14]+t[4]*t[2]*t[15]-t[4]*t[3]*t[14]-t[12]*t[2]*t[7]+t[12]*t[3]*t[6],n[10]=t[0]*t[5]*t[15]-t[0]*t[7]*t[13]-t[4]*t[1]*t[15]+t[4]*t[3]*t[13]+t[12]*t[1]*t[7]-t[12]*t[3]*t[5],n[14]=-t[0]*t[5]*t[14]+t[0]*t[6]*t[13]+t[4]*t[1]*t[14]-t[4]*t[2]*t[13]-t[12]*t[1]*t[6]+t[12]*t[2]*t[5],n[3]=-t[1]*t[6]*t[11]+t[1]*t[7]*t[10]+t[5]*t[2]*t[11]-t[5]*t[3]*t[10]-t[9]*t[2]*t[7]+t[9]*t[3]*t[6],n[7]=t[0]*t[6]*t[11]-t[0]*t[7]*t[10]-t[4]*t[2]*t[11]+t[4]*t[3]*t[10]+t[8]*t[2]*t[7]-t[8]*t[3]*t[6],n[11]=-t[0]*t[5]*t[11]+t[0]*t[7]*t[9]+t[4]*t[1]*t[11]-t[4]*t[3]*t[9]-t[8]*t[1]*t[7]+t[8]*t[3]*t[5],n[15]=t[0]*t[5]*t[10]-t[0]*t[6]*t[9]-t[4]*t[1]*t[10]+t[4]*t[2]*t[9]+t[8]*t[1]*t[6]-t[8]*t[2]*t[5];let r=t[0]*n[0]+t[1]*n[4]+t[2]*n[8]+t[3]*n[12];for(let e=0;e<16;e++)n[e]/=r;return n}var k=`
// lk[0] exposure x white balance (rgb); [1] the sun's disc radiance; [2] the sun's irradiance (both exposed); [3] the air's extinction at the
// sea (1/m); [4] the haze's phase (g, g of the forward peak, its weight), the bleach; [5] the tone curve (knee, saturation, bleach start,
// end); [6] the saturation fade (start, end), the sun through the clouds, the sun not hidden; [7] the glitter's colour (display), its gain;
// [8] deep water's light, [9] the bottom's (linear, exposed), [10] 2 Kd (1/m), [11] the light through a crest (display); [12] the sky's light
// on things (0.85 skyE / pi), the sea's ambient gain.
const SKY_T0: f32 = ${m.toFixed(4)};
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
/** The sky just above the horizon in direction d's azimuth (display): what the distance fades things toward. */
fn horizonSky(d: vec3f) -> vec3f { return toneEnc(skyLin(normalize(vec3f(d.x, 0.012, d.z)))); }
`;function A(e){let t=new Float32Array(1),n=new Uint32Array(t.buffer);t[0]=e;let r=n[0],i=r>>>16&32768,a=(r>>>23&255)-127+15,o=r&8388607;return a<=0?i|(a<-10?0:(o|8388608)>>>1-a+13):a>=31?i|31744:i|a<<10|o>>>13}var j=class{constructor(e){this.device=e;let t=t=>e.createTexture({label:t,size:[48,48],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});this.rayleigh=t(`sky rayleigh`),this.mie=t(`sky mie`),this.values=new Float32Array(52),this.hazeKey=null,this.skyKey=null,this.version=0}set({sunElDeg:e=30,haze:t=null,hazeAmt:n=null,hazeType:r=null,teal:i=.6,turbid:u=0,bottom:p=null,glint:m=1.3}={}){let[v,y]=g[t]??g.Light,b=n??v,x=r??y,S=`${b.toFixed(2)},${x.toFixed(2)}`;S!==this.hazeKey&&(this.atm=f(a(b,x)),this.hazeKey=S,this.skyKey=null);let C=Math.max(-4,e)*Math.PI/180,w=`${S}|${e}`;if(w!==this.skyKey){this.skyKey=w,this.sky=o(this.atm,C);for(let[e,t]of[[this.rayleigh,this.sky.rayleigh],[this.mie,this.sky.mie]]){let n=new Uint16Array(t.length);for(let e=0;e<t.length;e++)n[e]=A(t[e]);this.device.queue.writeTexture({texture:e},n,{bytesPerRow:384},[48,48])}}let T=this.sky,E={...h(T),sunSin:Math.sin(C)},D=T.g,O=Math.min(1,Math.max(0,(E.lightSun-.03)/.37)),k=d.bleach[2]*O*O*(3-2*O),j={...d,bleach:[d.bleach[0],d.bleach[1],k]},M=c(s(i,u),E,p??[.22,.19,.15]),N=(e,t=0)=>[e[0],e[1],e[2],t];return this.values.set([...N(E.exp),...N(E.sunDisc),...N(E.sunE),...N(T.ext),D.g,D.gPeak,D.wPeak,k,d.knee,d.sat,d.bleach[0],d.bleach[1],d.satFade[0],d.satFade[1],1,1,...N(_(E.sunCol.map(e=>e*40),j),m),...N(l(M.deep,1/d.sat)),...N(l(M.bot,1/d.sat)),...N(M.kd),...N(_(M.sss)),...N(E.skyE.map(e=>e*.85/Math.PI),1)]),this.look=E,this.version++,this}},M=.8,N=12,P=6,ee=3,F=2,te=.35,I=44,ne=48,L=60,R=L+8,z=R+64,re=z+128,ie=re+52,ae={OFF:0,MAIN:1,TAIL:2},oe=`
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
  lk: array<vec4f, 13>,           // the sky's and the water's look ( LOOK_WGSL)
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
${k}
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
`,se=(e,t,n=``)=>oe+`
override RIPPLES: bool = true;      // the ripple cascades
override FACETS: u32 = 4u;          // the sky averaged over 4 facets, or 1 (the mean normal's reflection)
override FRAG_SETS: bool = true;    // the sea's sets read again per pixel for the slope (false: a flat normal; a cost test)
override VS_DISP: bool = true;      // the vertices displaced by the sea's sets (false: flat; a cost test)
override SHADE: bool = true;        // the water's shading (false: one colour, the mesh and the raster alone; a cost test)
override DERIV: bool = true;        // the footprint from screen derivatives (false: worked out from the camera; a cost test)
override BURN: u32 = 0u;            // extra arithmetic a fragment (a cost test: how often the shader runs a pixel, by how MSAA multiplies it)
override SUN_FACETS: bool = true;   // the sun's disc and glare in each facet's mirror (false: a cost test)
override REGIMES: u32 = 1u;         // each ripple band by what the pixel makes of it (bits): 1 averaged away (its known variance, no reads; the same picture), 2 resolved (no read of the squares: sharpens the glitter, learnings 39, off); else read in full
@group(1) @binding(0) var env: texture_2d<f32>;      // the sky map (display values, octahedral): drawn when the look or the sun changes (SeaView._env)
fn skyMap(d: vec3f) -> vec3f { return textureSampleLevel(env, skySamp, octUV(d), 0.0).rgb; }
struct VO { @builtin(position) pos: vec4f, @location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32 };
// the fragment's inputs: without the position unless fsPos (a cost test: whether a fragment input of the position changes how often the shader runs)
struct FI { ${t?`@builtin(position) pos: vec4f, `:``}@location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32 };
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
  let h0 = h;
  h += F.wave.x * h * h * F.wave.y;      // the crests sharpened, the troughs flattened ( waveEval)
  var o: VO;
  let w = vec3f(p.x + disp.x, h, -(p.y + disp.y));
  o.pos = F.viewProj * vec4f(w - vec3f(F.cam.x, 0.0, -F.cam.z), 1.0);
  o.p0 = p;
  o.world = w;
  o.h = h0;
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
  let cRes = ${te} * (1.0 - smoothstep(20.0, 35.0, dist));
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
    skyAcc += wk * Fk * (skyMap(Rk) + select(vec3f(0.0), sunTerm(Rk), SUN_FACETS));      // (the sun's disc and glare in the facet's mirror, as adds them)
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
  let body = toneEnc(F.lk[8].xyz) * (0.40 * F.lk[12].w + 0.60 * mix(0.45, NdLs, sunVis)) * (1.0 / 0.88) * ao;
  let dbg = u32(F.rip2.w);
  var col = mix(body, select(sky, body, (dbg & 4u) != 0u), fres);
  // light through the thin crests, bright in the water's colour with the sun behind the wave; a little in every crest
  let back = pow(clamp(dot(-V, Ls), 0.0, 1.0), 2.2);
  let thin = smoothstep(0.04 * hsRef, 0.55 * hsRef, i.h) * (0.55 + 0.45 * (1.0 - Nw.y));
  col += F.lk[11].xyz * (back * thin * 0.95 * sunVis + 0.25 * smoothstep(0.0, 0.5 * hsRef, i.h)) * (1.0 - fres);
  col += select(F.lk[7].xyz * spec, vec3f(0.0), (dbg & 2u) != 0u);
  // foam where the main waves fold (the foam field and its look are to come)
  let foam = select(smoothstep(0.5, 0.15, det), 0.0, (dbg & 1u) != 0u);
  col = mix(col, vec3f(0.93, 0.96, 0.98) * 0.78 * (0.66 + 0.50 * NdLs * sunVis), foam * 0.8);
  // the air between: the distance fades the sea toward the sky just above the horizon in that direction, per channel (the blue first)
  col = mix(col, skyMap(normalize(vec3f(-V.x, 0.012, -V.z))), clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0)));
  if ((dbg & 8u) != 0u) { return vec4f(length(sN) / 2.0, length(sl) / 2.0, ripRough * 10.0, 1.0); }      // the slopes: r the drawn one, g the waves' alone (/ 2), b the ripples' roughness (x 10)
  return present(col + vec3f(burn * 1e-6));
}
`,ce=128,le=oe+`
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4f { return vec4f(skyColor(octDir(p.xy / ${ce}.0)), 1.0); }
`,ue=oe+`
struct SO { @builtin(position) pos: vec4f, @location(0) ndc: vec2f };
@vertex fn vs(@builtin(vertex_index) vi: u32) -> SO {
  let p = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  var o: SO;
  o.pos = vec4f(p, 0.0, 1.0);
  o.ndc = p;
  return o;
}
override BURN: u32 = 0u;      // extra arithmetic a fragment (a cost test: one triangle over the whole screen, so no edges; MSAA multiplies it only if the shader runs once a sample)
@fragment fn fs(i: SO) -> @location(0) vec4f {
  var burn = i.ndc.x;
  for (var b = 0u; b < BURN; b++) { burn = fract(sin(burn * 12.9898 + 78.233) * 43758.547); }
  let d = normalize(F.camF.xyz + i.ndc.x * F.camR.xyz + i.ndc.y * F.camU.xyz);
  if ((u32(F.rip2.w) & 16u) != 0u) { return present(vec3f(0.5, 0.6, 0.8)); }      // (debug 16: one colour, a cost test of the sky)
  return present(sunOver(skyColor(d), d, 1.0) + vec3f(burn * 1e-6));
}
`,de={msaa:4,grid:32,ripples:!0,facets:4,fragSets:!0,vsDisp:!0,shade:!0,fsPos:!1,deriv:!0,burn:0,skyBurn:0,interp:``,target:`canvas`,depth:`depth32float`,rs:.7,detail:null,regimes:1,sunFacets:!0},B=`rgba16float`,fe=class{constructor(e,t,{msaa:n=4,format:r=navigator.gpu.getPreferredCanvasFormat(),timestamps:i=!1,grid:a=32,patch0:o=4,levels:s=12,rangeK:c=6}={}){if(c*.30000000000000004<Math.SQRT2)throw Error(`rangeK ${c} is too small: the mesh would crack (at least ${(Math.SQRT2/.30000000000000004).toFixed(2)})`);Object.assign(this,{device:e,canvas:t,format:r,patch0:o,rangeK:c,levels:Math.min(s,16)}),this.ctx=t.getContext(`webgpu`),this.ctx.configure({device:e,format:r,alphaMode:`opaque`});let l=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.bgl=e.createBindGroupLayout({entries:[{binding:0,visibility:l,buffer:{type:`uniform`}},{binding:1,visibility:l,sampler:{type:`filtering`}},...[2,3,4,5,6].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}})),...[7,8].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}})),{binding:9,visibility:l,sampler:{type:`filtering`}}]}),this.envLayout=e.createPipelineLayout({bindGroupLayouts:[this.bgl]}),this.bglEnv=e.createBindGroupLayout({entries:[{binding:0,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}}]}),this.layout=e.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv]}),this.env=e.createTexture({label:`sky map`,size:[ce,ce],format:B,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING}),this.bgEnv=e.createBindGroup({layout:this.bglEnv,entries:[{binding:0,resource:this.env.createView()}]});let u=e.createShaderModule({code:le,label:`sky map`});this.envPipe=e.createRenderPipeline({layout:this.envLayout,label:`sky map`,vertex:{module:u,entryPoint:`vs`},fragment:{module:u,entryPoint:`fs`,targets:[{format:B}]}}),this.envKey=null,this.skyModule=e.createShaderModule({code:ue,label:`sky`}),this.byGrid=new Map,this.pipes=new Map,this.uni=e.createBuffer({size:ie*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(ie),this.samp=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`repeat`,maxAnisotropy:2}),this.skySamp=e.createSampler({magFilter:`linear`,minFilter:`linear`}),this.look=new j(e).set(),this.instMax=2048,this.instF=new Float32Array(this.instMax*4),this.inst=e.createBuffer({size:this.instF.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.timestamps=i,i&&(this.qs=e.createQuerySet({type:`timestamp`,count:6}),this.qres=e.createBuffer({size:48,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.qread=[],this.gpu={fft:[],draw:[],post:[],tagged:[]}),this.size=``,this.cpuMs=[],this.doneMs=[],this.readMs=[],this.frameNo=0,this.inFlight=0,this.setVariant({msaa:n,grid:a}),this.modules=[this._grid(a).module,this.skyModule]}_grid(e,t=!1,n=``){let r=this.byGrid.get(`${e} ${t} ${n}`);if(!r){let i=new Uint16Array(e*e*6),a=0;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*(e+1)+n,o=r+1,s=r+e+1,c=s+1;i.set([r,s,o,o,s,c],a),a+=6}let o=this.device.createBuffer({size:i.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(o,0,i),r={module:this.device.createShaderModule({code:se(e,t,n),label:`water ${e}`}),idx:o},this.byGrid.set(`${e} ${t} ${n}`,r)}return r}setVariant(e={}){let t={...de,...e},n=JSON.stringify(t),r=this.device,i=this.pipes.get(n);if(!i){let e=t.target===`temporal`,a=this._grid(t.grid,t.fsPos,t.interp),o={count:e?1:t.msaa},s=t.target===`hdr`||e?B:this.format,c=t.depth,l=[{format:s}],u=this.skyModule,d={RIPPLES:+!!t.ripples,FACETS:t.facets,FRAG_SETS:+!!t.fragSets,VS_DISP:+!!t.vsDisp,SHADE:+!!t.shade,DERIV:+!!t.deriv,BURN:t.burn,GAMMA:+!e,REGIMES:t.regimes||0,SUN_FACETS:+!!t.sunFacets};i={water:r.createRenderPipeline({layout:this.layout,label:`water ${n}`,vertex:{module:a.module,entryPoint:`vs`,constants:d,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:a.module,entryPoint:`fs`,constants:d,targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}),sky:r.createRenderPipeline({layout:this.layout,label:`sky`,vertex:{module:u,entryPoint:`vs`},fragment:{module:u,entryPoint:`fs`,constants:{BURN:t.skyBurn,GAMMA:+!e},targets:l},depthStencil:{format:c,depthWriteEnabled:!1,depthCompare:`greater-equal`},multisample:o}),idx:a.idx},this.pipes.set(n,i)}this.variant=t,this.water=i.water,this.sky=i.sky,this.idx=i.idx,this.msaa=t.target===`temporal`?1:t.msaa,this.grid=t.grid,t.target===`temporal`&&!this.temporal&&(this.temporal=new D(this.device,this.format)),t.target===`hdr`&&!this.blit&&this._makeBlit();for(let e=0;e<this.levels;e++){let n=this.patch0*2**e,r=this.rangeK*n;this.uniF.set([n/t.grid,M*r,r,n],R+4*e)}}setSea(r,i,a={},{micro:o=1,debug:s=0}={}){this.fft=r,this.rip=i;let c=r.sea.sets;i.setShape(a.ripples);let l=p(u(a),o),d=this.uniF;d.set(l.on?[l.dir[0],l.dir[1],l.amount*Math.sqrt(t(l.windMs,l.res)),1]:[1,0,0,0],ne),d.set([...l.amp,l.on?l.sharp:1],52),d.set([e.cut,+!!r.sea.tails?.length,1,s],56),d.set(i.tiles,L);for(let e=0;e<32;e++){let t=c[e],i=e>=r.nS||t.band===n.WIND_L||t.band===n.WIND_R?ae.OFF:t.band===n.TAIL?ae.TAIL:ae.MAIN;this.uniF.set(e<r.nS?[t.L,(t.span??1)-1,t.slopeVar??0,i]:[1,0,0,0],z+4*e)}this.chop=a.chop??1,this.uniF.set([.15*(a.stokes??0)*(a.stats?.sharpWeight??1),1/Math.max(.05,a.stats?.hs??0),a.ripples?.sharp??1,0],I),this._bind()}setLook(e){this.look=e,this.fft&&this._bind()}_bind(){let e=this.fft,t=this.rip;this.bg=this.device.createBindGroup({layout:this.bgl,entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:this.samp},...[...e.out,...t.out].map((e,t)=>({binding:2+t,resource:e.createView({dimension:`2d-array`})})),{binding:7,resource:this.look.rayleigh.createView()},{binding:8,resource:this.look.mie.createView()},{binding:9,resource:this.skySamp}]})}_targets(){let e=this.canvas.width,t=this.canvas.height,n=this.variant,r=n.target===`temporal`,i=[e,t,this.msaa,n.target,n.depth,n.rs].join(` `);if(i===this.size)return;this.size=i,this.colorMS?.destroy(),this.depth?.destroy(),this.hdrTex?.destroy(),this.hdrTex=null,this.tColor?.destroy(),this.tColor=null;let a=r?Math.max(1,Math.round(e*n.rs)):e,o=r?Math.max(1,Math.round(t*n.rs)):t;this.renderSize=[a,o];let s=n.target===`hdr`?B:this.format,c=GPUTextureUsage.RENDER_ATTACHMENT;this.colorMS=this.msaa>1?this.device.createTexture({size:[a,o],format:s,sampleCount:this.msaa,usage:c}):null,this.depth=this.device.createTexture({size:[a,o],format:n.depth,sampleCount:this.msaa,usage:c|(r?GPUTextureUsage.TEXTURE_BINDING:0)}),r&&(this.tColor=this.device.createTexture({size:[a,o],format:B,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.temporal.resize(a,o,e,t)),n.target===`hdr`&&(this.hdrTex=this.device.createTexture({size:[a,o],format:B,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.blitBG=this.device.createBindGroup({layout:this.blit.getBindGroupLayout(0),entries:[{binding:0,resource:this.hdrTex.createView()}]}))}_makeBlit(){let e=this.device.createShaderModule({label:`blit`,code:`
@group(0) @binding(0) var src: texture_2d<f32>;
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4f { return textureLoad(src, vec2u(p.xy), 0); }
`});this.blit=this.device.createRenderPipeline({layout:`auto`,label:`blit`,vertex:{module:e,entryPoint:`vs`},fragment:{module:e,entryPoint:`fs`,targets:[{format:this.format}]}})}_select(e,t){let n=this.instF,r=this.patch0,i=this.levels-1,a=e.e,o=e.n,s=e.h,c=e=>[t[e],t[4+e],t[8+e],t[12+e]],l=c(0),u=c(1),d=c(2),f=c(3),p=[f.map((e,t)=>e+l[t]),f.map((e,t)=>e-l[t]),f.map((e,t)=>e+u[t]),f.map((e,t)=>e-u[t]),f.map((e,t)=>e-d[t])],m=(e,t,n)=>{let r=e-a-P,i=r+n+12,s=o-t-n-P,c=s+n+12;for(let[e,t,n,a]of p)if(e*(e>0?i:r)+t*(t>0?N:-12)+n*(n>0?c:s)+a<0)return!1;return!0},h=e=>this.rangeK*r*2**e,g=(e,t,n)=>Math.hypot(Math.max(e-a,0,a-e-n),Math.max(t-o,0,o-t-n),s),_=0,v=this.perLevel=Array(this.levels).fill(0),y=(e,t,i)=>{_<this.instMax&&(n.set([e,t,r*2**i,i],4*_),_++,v[i]++)},b=(e,t,n)=>{let i=r*2**n,a=g(e,t,i);if(a>h(n))return!1;if(!m(e,t,i))return!0;if(n===0||a>h(n-1))return y(e,t,n),!0;let o=i/2;for(let[r,i]of[[0,0],[o,0],[0,o],[o,o]])!b(e+r,t+i,n-1)&&m(e+r,t+i,o)&&y(e+r,t+i,n-1);return!0},x=r*2**i,S=h(i);for(let e=Math.floor((a-S)/x);e<=Math.floor((a+S)/x);e++)for(let t=Math.floor((o-S)/x);t<=Math.floor((o+S)/x);t++)b(e*x,t*x,i);return _}ready(){return this.inFlight<F}frame(e,t,{exposure:n=1.4,chop:r=this.chop??1,sunDir:i=[.3,.45,-.84],load:a=1,tag:o=null}={}){let s=performance.now(),c=this.device;this._targets();let[l,u]=this.renderSize,d=this.uniF,f=this.variant.target===`temporal`,p=Math.cos(e.yaw),m=Math.sin(e.yaw),h=Math.cos(e.pitch),g=Math.sin(e.pitch),_=[m*h,g,-p*h],v=[p,0,m],y=[v[1]*_[2]-v[2]*_[1],v[2]*_[0]-v[0]*_[2],v[0]*_[1]-v[1]*_[0]],b=[0,e.h,0],x=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],S=[v[0],y[0],-_[0],0,v[1],y[1],-_[1],0,v[2],y[2],-_[2],0,-x(v,b),-x(y,b),x(_,b),1],C=l/u,w=Math.tan(e.fov*Math.PI/360),T=[1/(C*w),0,0,0,0,1/w,0,0,0,0,0,-1,0,0,.05,0],D=H(T,S),k=D,A=[0,0];if(f){A=this.temporal.jitter?E(this.frameNo):[0,0];let t=T.slice();t[8]=-2*A[0]/l,t[9]=-2*A[1]/u,k=H(t,S);let n=this.prevCam??[e.e,e.n],r=[1,0,0,0,0,1,0,0,0,0,1,0,e.e-n[0],0,-(e.n-n[1]),1],i=Math.hypot(e.e-n[0],e.n-n[1])>50||!this.prevVP;i&&this.temporal.reset(),this.reproj=H(H(i?D:this.prevVP,r),O(D)),this.prevVP=D,this.prevCam=[e.e,e.n]}d.set(k,0),d.set([e.e,e.h,e.n,t],16);let j=Math.hypot(...i);d.set([i[0]/j,i[1]/j,i[2]/j,ee],20),d.set([l,u,1/l,1/u],24),d.set([this.fft.nS,r,n,f?this.variant.detail??.5*this.variant.rs:1],28),d.set(this.look.values,re),d.set([v[0]*w*C,v[1]*w*C,v[2]*w*C,0,y[0]*w,y[1]*w,y[2]*w,0,_[0],_[1],_[2],0],32);let M=this._select(e,k);c.queue.writeBuffer(this.uni,0,d),c.queue.writeBuffer(this.inst,0,this.instF,0,M*4);let N=c.createCommandEncoder(),P=this.timestamps,F=N.beginComputePass(P?{timestampWrites:{querySet:this.qs,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});this.fft.encode(F,t),this.rip.encode(F,t),F.end();let te=`${this.look.version} ${d[20].toFixed(5)} ${d[21].toFixed(5)} ${d[22].toFixed(5)}`;if(te!==this.envKey){this.envKey=te;let e=N.beginRenderPass({colorAttachments:[{view:this.env.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}]});e.setPipeline(this.envPipe),e.setBindGroup(0,this.bg),e.draw(3),e.end()}let I=this.ctx.getCurrentTexture().createView(),ne=this.tColor?this.tColor.createView():this.hdrTex?this.hdrTex.createView():I;for(let e=0;e<a;e++){let t=P&&(e===0||e===a-1)?{querySet:this.qs,...e===0?{beginningOfPassWriteIndex:2}:{},...e===a-1?{endOfPassWriteIndex:3}:{}}:null,n=N.beginRenderPass({colorAttachments:[this.colorMS?{view:this.colorMS.createView(),resolveTarget:ne,loadOp:`clear`,storeOp:`discard`,clearValue:[0,0,0,1]}:{view:ne,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:this.tColor?`store`:`discard`},...t?{timestampWrites:t}:{}});n.setBindGroup(0,this.bg),n.setBindGroup(1,this.bgEnv),M&&(n.setPipeline(this.water),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,M)),n.setPipeline(this.sky),n.draw(3),n.end()}if(this.tColor&&this.temporal.resolve(N,this.tColor.createView(),this.depth.createView(),this.reproj,[A[0],-A[1]],I,P?{querySet:this.qs,beginningOfPassWriteIndex:4,endOfPassWriteIndex:5}:null),this.hdrTex){let e=N.beginRenderPass({colorAttachments:[{view:I,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}]});e.setPipeline(this.blit),e.setBindGroup(0,this.blitBG),e.draw(3),e.end()}let L=null,R=this.tColor?6:4;P&&(N.resolveQuerySet(this.qs,0,R,this.qres,0),L=this.qread.pop()??c.createBuffer({size:48,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),N.copyBufferToBuffer(this.qres,0,L,0,8*R)),c.queue.submit([N.finish()]),this.inFlight++;let z=performance.now();c.queue.onSubmittedWorkDone().then(()=>{this.inFlight--,V(this.doneMs,performance.now()-z)}).catch(()=>{this.inFlight--});let ie=++this.frameNo;L&&L.mapAsync(GPUMapMode.READ).then(()=>{V(this.readMs,performance.now()-z);let e=new BigUint64Array(L.getMappedRange()),t=Number(e[1]-e[0])/1e6,n=R===6?Number(e[5]-e[4])/1e6:0,r=Number(e[3]-e[2])/1e6+n;V(this.gpu.fft,t),V(this.gpu.draw,r),V(this.gpu.post,n),o!=null&&V(this.gpu.tagged,{tag:o,fft:t,draw:r,post:n,lag:this.frameNo-ie}),L.unmap(),this.qread.push(L)}).catch(()=>{}),this.patches=M,this.vertices=M*(this.grid+1)**2,V(this.cpuMs,performance.now()-s)}};function V(e,t){e.push(t),e.length>1200&&e.splice(0,600)}function H(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}var U=new URLSearchParams(location.search),W=(e,t)=>U.get(e)==null?t:Number(U.get(e)),pe=document.getElementById(`hud`),G=document.getElementById(`view`),K={ready:!1,done:!1,errors:[],frames:0,fft:[],draw:[],wall:[]};window.__sim2=K;var q=e=>{K.errors.length>=20||K.errors.includes(e)||(K.errors.push(e),pe.textContent=`${pe.textContent}\n${e}`,console.error(e))},J=e=>{if(!e.length)return null;let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},Y=e=>{U.get(`post`)&&fetch(`./__report`,{method:`POST`,body:e}).catch(()=>{})},X=e=>e==null?`-`:e.toFixed(1),Z=e=>e==null?`-`:e.toFixed(2);function me(){let e=W(`dpr`,devicePixelRatio),t=(U.get(`size`)??``).split(`x`).map(Number);G.width=t[0]||Math.round(innerWidth*e),G.height=t[1]||Math.round(innerHeight*e),t[1]&&(G.style.width=`${G.width/e}px`,G.style.height=`${G.height/e}px`)}function he(e){let t={e:0,n:0,h:W(`eye`,1.1),yaw:(U.get(`yaw`)==null?e.headingDeg??0:W(`yaw`,0))*Math.PI/180,pitch:W(`pitch`,-6)*Math.PI/180,fov:W(`fov`,70)},n=new Set,r=W(`speed`,3.5),i=W(`turn`,0)*Math.PI/180;addEventListener(`keydown`,e=>n.add(e.key.toLowerCase())),addEventListener(`keyup`,e=>n.delete(e.key.toLowerCase()));let a=null;return G.addEventListener(`pointerdown`,e=>{a=[e.clientX,e.clientY],G.setPointerCapture(e.pointerId)}),G.addEventListener(`pointermove`,e=>{a&&=(t.yaw+=(e.clientX-a[0])*.004,t.pitch=Math.max(-1.4,Math.min(1.2,t.pitch-(e.clientY-a[1])*.004)),[e.clientX,e.clientY])}),G.addEventListener(`pointerup`,()=>{a=null}),G.addEventListener(`wheel`,e=>{t.h=Math.max(.3,Math.min(3e3,t.h*Math.exp(e.deltaY*.001))),e.preventDefault()},{passive:!1}),t.step=e=>{let a=e=>n.has(e),o=+!!a(`w`)-!!a(`s`),s=+!!a(`d`)-!!a(`a`),c=n.size?r*4*Math.max(1,t.h/10):r,l=n.size?o:1;t.e+=(Math.sin(t.yaw)*l+Math.cos(t.yaw)*s)*c*e,t.n+=(Math.cos(t.yaw)*l-Math.sin(t.yaw)*s)*c*e,n.size||(t.yaw+=i*e),a(`arrowleft`)&&(t.yaw-=e),a(`arrowright`)&&(t.yaw+=e),a(`arrowup`)&&(t.pitch=Math.min(1.2,t.pitch+e*.6)),a(`arrowdown`)&&(t.pitch=Math.max(-1.4,t.pitch-e*.6)),a(`q`)&&(t.h=Math.max(.3,t.h*Math.exp(-e))),a(`e`)&&(t.h=Math.min(3e3,t.h*Math.exp(e)))},t}var Q=3,$=W(`ramp`,75),ge=W(`tail`,30),_e=48;function ve(e,t){let n=Q+$+ge,r=[],i=[],a=v(),o=null,s=-1,c=0,l=[],u=!1,d=60,f=1,p=e=>e<Q?`warm`:e<Q+$?`ramp`:e<n?`tail`:null,m=(n,a)=>{let o=e.gpu,s=e=>e?e.splice(0):[],u={s:n,phase:a,load:f,fps:c,frameMs:J(l),doneMs:J(s(e.doneMs)),drawMs:J(s(o?.draw)),computeMs:J(s(o?.fft)),patches:e.patches};if(a===`warm`?i.push(...l):r.push(u),n===2){let e=i.slice().sort((e,t)=>e-t)[Math.floor(i.length*.1)]??16.7;d=e<11?120:e<22?60:30,t.pacing=b(e)}if(a===`ramp`||n===2){let e=c>=.95*d;f=n===2?1:e?Math.min(_e,f+Math.max(1,Math.floor(f/4))):Math.max(1,f-(c<.8*d?2:1))}n+1===Q+$&&(f=1),c=0,l=[]},h=()=>{let e=[`display ${d} fps (${t.pacing??`?`})`],n=r.filter(e=>e.phase===`ramp`),i=r.filter(e=>e.phase===`tail`);for(let t=0;t<$;t+=10){let r=n.filter(e=>e.s-Q>=t&&e.s-Q<t+10).filter(e=>e.fps>=.95*d).map(e=>e.load);e.push(`${t}-${Math.min($,t+10)} s: held ${r.length?`up to ${Math.max(...r)} copies (median ${J(r)})`:`no second at the display rate`}`)}let a=(e,t)=>J(e.map(e=>e[t]).filter(e=>e!=null)),o=i.slice(0,5),s=i.slice(-10);return e.push(`then 1 copy: ${X(a(o,`fps`))} fps in its first 5 s, ${X(a(s,`fps`))} in its last 10 s; submit to done ${X(a(o,`doneMs`))} then ${X(a(s,`doneMs`))} ms`+(t.timestamps?`; GPU sea ${Z(a(s,`drawMs`))} ms, compute ${Z(a(s,`computeMs`))} ms`:``)),e},g=async()=>{u=!0;let n=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, canvas ${G.width}x${G.height}, MSAA ${e.msaa}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets`,await y()],i=[`s phase copies fps frame_ms done_ms gpu_sea_ms gpu_compute_ms patches`,...r.map(e=>[e.s,e.phase,e.load,e.fps,X(e.frameMs),X(e.doneMs),Z(e.drawMs),Z(e.computeMs),e.patches].join(` `))],o=h(),s=[...n,``,`The WebGPU sea: the copies a frame held at the display rate, then one copy:`,...o,``,...i,...K.errors.length?[``,...K.errors]:[]].join(`
`);K.measure={rows:r,lines:o,report:s},Y(s),a.done({lines:o,onSend:()=>S(`Surfski WebGPU sea measurement`,s),onCopy:e=>x(s,e)})};return(e,t)=>{if(u)return null;o??=e;let r=Math.floor((e-o)/1e3),i=p(r);return r!==s&&(s>=0&&m(s,p(s)),s=r,i&&a.progress(i===`warm`?`the WebGPU sea, settling`:i===`ramp`?`the WebGPU sea, ${f} cop${f>1?`ies`:`y`} a frame`:`the WebGPU sea drawn once`,n-r)),i?(c++,l.push(t),f):(g(),null)}}var ye=W(`slot`,2.5),be=.5,xe=W(`rounds`,3),Se=4,Ce=Math.max(1,W(`load`,1)),we=.08;function Te(e){let t=t=>Math.min(1,Math.sqrt(t/e));return[[`full again`,{}],[`MSAA off`,{msaa:1}],[`1.2 megapixels`,{scale:t(12e5)}],[`1.2 megapixels, MSAA off`,{scale:t(12e5),msaa:1}],[`0.6 megapixels`,{scale:t(6e5)}],[`no ripples`,{ripples:!1}],[`sky from 1 facet, not 4`,{facets:1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`flat vertices (no displacement)`,{vsDisp:!1}],[`one colour (mesh, raster, MSAA only)`,{shade:!1}],[`the position among the fragment inputs`,{fsPos:!0}],[`MSAA off, 16 x 16 patches`,{msaa:1,grid:16}],[`one colour, MSAA off`,{shade:!1,msaa:1}],[`half-float target, own resolve (web-ocean)`,{target:`hdr`}],[`half-float target, MSAA off`,{target:`hdr`,msaa:1}],[`depth24plus, not depth32float`,{depth:`depth24plus`}],[`footprint worked out (no derivatives)`,{deriv:!1}],[`footprint worked out, MSAA off`,{deriv:!1,msaa:1}],[`interpolation marked centre`,{interp:`@interpolate(perspective, center)`}],[`added arithmetic (MSAA 4)`,{burn:64}],[`added arithmetic, MSAA off`,{burn:64,msaa:1}],[`added arithmetic in the sky (one big triangle)`,{skyBurn:256}],[`added arithmetic in the sky, MSAA off`,{skyBurn:256,msaa:1}],[`temporal, drawn at 0.7 of the size`,{target:`temporal`,rs:.7}],[`temporal, drawn at 0.5 of the size`,{target:`temporal`,rs:.5}],[`temporal, drawn at full size`,{target:`temporal`,rs:1}],[`temporal, drawn at 0.85 of the size`,{target:`temporal`,rs:.85}],[`every ripple band read in full (no regimes)`,{regimes:0}],[`no regimes, MSAA off`,{regimes:0,msaa:1}],[`both regimes, MSAA off`,{regimes:3,msaa:1}]]}function Ee(e,t,n){let r=U.get(`only`)?.split(`,`).map(Number),i=Te(n[0]*n[1]).filter((e,t)=>!r||r.includes(t)),a=[];for(let e=0;e<xe;e++)for(let[e,t]of i)a.push([`full`,{}],[e,t]);a.push([`full`,{}]);let o=Se+a.length*ye+1.5,s=v(),c=a.map(([e])=>({name:e,frames:0,draw:[],post:[],compute:[],lag:[]})),l=null,u=-2,d=!1,f=null,p=([,t])=>{let{scale:r=1,...i}=t;G.width=Math.round(n[0]*r),G.height=Math.round(n[1]*r),e.setVariant(i)};for(let[,t]of i){let{scale:n,...r}=t;e.setVariant(r)}e.setVariant({});let m=()=>{for(let t of e.gpu?.tagged.splice(0)??[]){let e=c[t.tag];e&&(e.draw.push(t.draw-t.post),e.post.push(t.post),e.compute.push(t.fft),e.lag.push(t.lag))}},h=async()=>{d=!0,m(),p([`full`,{}]);let r=c.map(e=>({name:e.name,drawMs:e.draw.length?J(e.draw)/Ce+J(e.post):null,postMs:J(e.post),computeMs:J(e.compute),fps:e.frames/(ye-be),n:e.draw.length,lag:J(e.lag)})),a=t.timestamps?`drawMs`:`fps`,o=[];for(let[e]of i){let n=[],i=[],s=0;r.forEach((o,c)=>{if(o.name!==e)return;let l=r[c-1]?.[a],u=r[c+1]?.[a],d=o[a];if(l==null||u==null||d==null)return;let f=(l+u)/2;n.push((t.timestamps?f-d:d-f)/f),i.push(f-d),Math.abs(l-u)/f>we&&s++}),o.push({name:e,rel:J(n),lo:n.length?Math.min(...n):null,hi:n.length?Math.max(...n):null,ms:J(i),pairs:n.length,drift:s})}let l=r.filter(e=>e.name===`full`),u=e=>e==null?`-`:`${Math.round(e*100)}%`,f=[t.timestamps?`the full picture: ${Z(J(l.map(e=>e.drawMs)))} ms of GPU (${Z(l[0]?.drawMs)} at the start, ${Z(l[l.length-1]?.drawMs)} at the end), compute ${Z(J(l.map(e=>e.computeMs)))} ms, ${X(J(l.map(e=>e.fps)))} fps`:`the full picture: ${X(J(l.map(e=>e.fps)))} fps (no GPU timers here: the shares are of frames a second)`,...o.map(e=>`${e.name}: ${t.timestamps?`saves`:`gains`} ${u(e.rel)}${t.timestamps?` (${Z(e.ms)} ms)`:``}, ${u(e.lo)} to ${u(e.hi)}${e.drift?`; ${e.drift} of ${e.pairs} pairs drifted`:``}`),`the times came back ${X(J(c.flatMap(e=>e.lag)))} frames late; submit to done ${X(J(e.doneMs))} ms, to the timers read back ${X(J(e.readMs))} ms`],h=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, full canvas ${n[0]}x${n[1]}, MSAA 4${Ce>1?`, ${Ce} copies a frame (times per copy)`:``}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets, ${e.patches} patches`,await y()],g=[`slot variant gpu_sea_ms gpu_resolve_ms gpu_compute_ms fps samples lag_frames`,...r.map((e,t)=>[t,`"${e.name}"`,Z(e.drawMs),Z(e.postMs),Z(e.computeMs),X(e.fps),e.n,e.lag].join(` `))],_=[...h,``,`The WebGPU sea, part by part (each against the full picture either side of it):`,...f,``,...g,...K.errors.length?[``,...K.errors]:[]].join(`
`);K.sweep={slots:r,rows:o,lines:f,report:_},Y(_),s.done({lines:f,onSend:()=>S(`Surfski WebGPU sea parts`,_),onCopy:e=>x(_,e)})};return{before(e){if(d)return null;l??=e;let t=(e-l)/1e3-Se,n=t<0?-1:Math.floor(t/ye);return n>=a.length?(f??=e,e-f>1500?h():m(),null):(n!==u&&(u=n,n>=0&&p(a[n]),(n===0||n===a.length>>1)&&Y(`sweep progress: slot ${n} of ${a.length} at ${X((e-l)/1e3)} s, ${K.frames} frames${K.errors.length?`; ${K.errors.join(`; `)}`:``}`),s.progress(n>=0?`the WebGPU sea's parts: ${a[n][0]}`:`the WebGPU sea, settling`,o-(e-l)/1e3)),m(),n<0||t-n*ye<be?null:(c[n].frames++,n))}}}async function De(){if(!navigator.gpu){q(`WebGPU is not available in this browser`);return}let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e){q(`WebGPU: no adapter`);return}let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:t?[`timestamp-query`]:[]});n.addEventListener(`uncapturederror`,e=>q(`WebGPU error: ${e.error.message}`)),n.lost.then(e=>q(`WebGPU device lost: ${e.message}`)),me(),!U.get(`size`)&&!U.get(`sweep`)&&addEventListener(`resize`,me);let a=r(U.get(`course`)??`gorge-swellcity`)??r(`gorge-swellcity`),o=i(a.name),s=o.state.fft.sea,c=s.sets.slice(0,32),l=new C(n);l.build({...s,sets:c});let u=new fe(n,G,{msaa:W(`msaa`,1),timestamps:t,grid:W(`grid`,32),patch0:W(`patch0`,4),levels:W(`levels`,12),rangeK:W(`rangeK`,6)}),d=new w(n);for(let e of[...u.modules,...d.modules])for(let t of(await e.getCompilationInfo()).messages)q(`${e.label} ${t.type} line ${t.lineNum}:${t.linePos} ${t.message}`);u.setSea(l,d,o.state,{micro:W(`ripples`,1),debug:W(`seadbg`,0)});let f=U.get(`regimes`)==null?1:W(`regimes`,1);if(U.get(`aa`)===`temporal`?u.setVariant({target:`temporal`,rs:W(`rs`,.7),detail:U.get(`detail`)==null?null:W(`detail`,1),regimes:f}):f!==1&&u.setVariant({msaa:u.msaa,grid:u.grid,regimes:f}),U.get(`v`)){let e=Object.fromEntries(U.get(`v`).split(`,`).map(e=>e.split(`:`)).map(([e,t])=>[e,t===`true`?!0:t===`false`?!1:Number.isNaN(Number(t))?t:Number(t)]));u.setVariant({...u.variant,...e})}if(u.temporal)for(let[e,t]of[[`twmax`,`wMax`],[`twsoft`,`wSoft`],[`tsign`,`sigN`],[`tsigw`,`sigW`],[`tsharp`,`sharpen`]])U.get(e)!=null&&(u.temporal[t]=W(e,0));u.temporal&&U.get(`jitter`)===`0`&&(u.temporal.jitter=!1);let p=he(o),m=W(`frames`,0),h=o.look??{},g=W(`sunaz`,h.sunAz??200),_=W(`sunel`,h.sunEl??30);u.setLook(new j(n).set({sunElDeg:_,haze:U.get(`haze`)??h.haze??null,teal:W(`teal`,h.teal??.6),turbid:W(`turbid`,h.turbid??0),bottom:h.bottom??null,glint:W(`glint`,1.3)}));let v=g*Math.PI/180,y=_*Math.PI/180,b={sunDir:[Math.sin(v)*Math.cos(y),Math.sin(y),-Math.cos(v)*Math.cos(y)]};K.info={course:a.id,adapter:`${e.info?.vendor??``} ${e.info?.architecture??``}`.trim()||`unknown`,timestamps:t,sets:c.length,msaa:u.msaa};let x=U.get(`measure`)?ve(u,K.info):null,S=U.get(`sweep`)?Ee(u,K.info,[G.width,G.height]):null,T=performance.now(),E=0,D=1,O=U.get(`freeze`)==null?null:W(`freeze`,100),k=U.get(`freezesea`)==null?null:W(`freezesea`,100),A=!U.get(`noqueuecap`),M=U.get(`dt`)==null?null:W(`dt`,1/60),N=e=>{if(A&&!u.ready()){K.skipped=(K.skipped??0)+1,requestAnimationFrame(N);return}let t=M??Math.min(.1,(e-T)/1e3);T=e,E+=t,x?D=x(e,t*1e3)??1:S&&(D=Ce);let n=S?.before(e)??null;if(O==null&&!S&&p.step(t),u.frame(p,O??k??100+E,{...b,load:D,tag:n}),K.frames++,K.wall.push(t*1e3),K.wall.length>1200&&K.wall.splice(0,600),K.ready=!0,K.frames%20==0){let e=u.gpu,t=J(K.wall.slice(-60));pe.textContent=`${G.width}x${G.height}, MSAA ${u.msaa}, ${c.length} sets, ${u.patches} patches${D>1?`, drawn ${D} times`:``}\nframe ${X(t)} ms${e?`; GPU: FFT and ripples ${Z(J(e.fft.slice(-60)))} ms, sea and sky ${Z(J(e.draw.slice(-60)))} ms`:`; submit to done ${X(J(u.doneMs.slice(-60)))} ms`}\neye ${p.h.toFixed(1)} m, pitch ${(p.pitch*180/Math.PI).toFixed(0)}°${K.errors.length?`\n${K.errors.join(`
`)}`:``}`}if(m&&K.frames>=m){let e=u.gpu;Object.assign(K,{done:!0,fftMs:e?J(e.fft.slice(10)):null,drawMs:e?J(e.draw.slice(10)):null,postMs:e?J(e.post.slice(10)):null,frameMs:J(K.wall.slice(10)),doneMs:J(u.doneMs.slice(10)),patches:u.patches,perLevel:u.perLevel,vertices:u.vertices,cpuMs:J(u.cpuMs.slice(10)),size:[G.width,G.height]}),K.fft=e?.fft??[],K.draw=e?.draw??[],Y([navigator.userAgent,location.href,`canvas ${G.width}x${G.height}, rendered ${u.renderSize?.join(`x`)}`,`GPU: compute ${Z(K.fftMs)} ms, sea and sky with resolve and present ${Z(K.drawMs)} ms, of which resolve and present ${Z(K.postMs)} ms; frame ${X(K.frameMs)} ms`].join(`
`))}else requestAnimationFrame(N)};requestAnimationFrame(N)}De().catch(e=>q(`sim2 failed: ${e.message}`));