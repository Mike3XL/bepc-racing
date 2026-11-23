/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,s as t,t as n}from"./fftsea-BlV7h9PB.js";import{_ as r}from"./seas-CiqO6vxw.js";import{i}from"./scenarios-CUIjf6SF.js";import{n as a,t as o}from"./fine-detail-CvgjbFpv.js";import"./fftgpu-CavxKjr5.js";import{a as s,d as c,l}from"./ripcascade-DKXb2b1O.js";import{n as u,t as d}from"./ripples-webgpu-CdQ5PmzO.js";var f=.8,p=12,m=6,h=3,g=.35,_=44,v=48,y=60,b=y+8,x=b+64,S=x+128,C={OFF:0,MAIN:1,TAIL:2},w=`
struct Frame {
  viewProj: mat4x4f,
  cam: vec4f,          // eye east, height, north; time
  sun: vec4f,          // direction to the sun (x east, y up, z -north); its light
  screen: vec4f,       // width, height, 1/width, 1/height
  sea: vec4f,          // sets, chop, exposure, -
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
};
@group(0) @binding(0) var<uniform> F: Frame;
@group(0) @binding(1) var samp: sampler;
@group(0) @binding(2) var t0: texture_2d_array<f32>;
@group(0) @binding(3) var t1: texture_2d_array<f32>;
@group(0) @binding(4) var t2: texture_2d_array<f32>;
@group(0) @binding(5) var rA: texture_2d_array<f32>;      // the ripple cascades: slope x, slope y, compression
@group(0) @binding(6) var rM: texture_2d_array<f32>;      // and the squares of the slope (LEAN)
fn tailShare(lam: f32, spacing: f32) -> f32 { return select(0.0, F.rip2.y * smoothstep(2.0 * spacing, 4.5 * spacing, lam), lam >= F.rip2.x); }
const N: f32 = 256.0;
fn skyColor(d: vec3f) -> vec3f {
  let up = clamp(d.y, 0.0, 1.0);
  let zenith = vec3f(0.18, 0.36, 0.72);
  let horizon = vec3f(0.72, 0.80, 0.88);
  var c = mix(horizon, zenith, pow(up, 0.45));
  let mu = max(dot(d, F.sun.xyz), 0.0);
  c += vec3f(1.0, 0.85, 0.6) * (0.25 * pow(mu, 8.0) + 0.6 * pow(mu, 64.0));
  return c;
}
fn present(c: vec3f) -> vec4f {
  let x = c * F.sea.z;
  return vec4f(pow(x / (1.0 + x), vec3f(1.0 / 2.2)), 1.0);
}
`,T=e=>w+`
struct VO { @builtin(position) pos: vec4f, @location(0) p0: vec2f, @location(1) world: vec3f, @location(2) h: f32 };
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
  let nS = u32(F.sea.x);
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
    let a = textureSampleGrad(rA, samp, ap / T, c, adx / T, ady / T);
    let m = textureSampleGrad(rM, samp, ap / T, c, adx / T, ady / T);
    let cv = vec3f(max(m.x - a.x * a.x, 0.0), max(m.y - a.y * a.y, 0.0), m.z - a.x * a.y);
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
@fragment fn fs(i: VO) -> @location(0) vec4f {
  let dx0 = dpdx(i.p0);
  let dy0 = dpdy(i.p0);
  let px = max(length(dx0), length(dy0));       // the pixel's footprint on the water (m)
  var g = vec2f(0.0);       // the main waves' still-water gradient and Jacobian (xx, zz, xz), and the fine tails' apart ( Wave)
  var j = vec3f(0.0);
  var gt = vec2f(0.0);
  var jt = vec3f(0.0);
  let nS = u32(F.sea.x);
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
  if (F.rip0.z > 0.0) {
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
  let dsx = dpdx(sN);
  let dsy = dpdy(sN);
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
  let cRes = ${g} * (1.0 - smoothstep(20.0, 35.0, dist));
  let vis = smoothstep(0.0, 0.08, tr2) * 0.45 * (1.0 - cRes);
  var skyAcc = vec3f(0.0);
  var fAcc = 0.0;
  for (var k = 0u; k < 4u; k++) {
    let o = select(o2, o1, k < 2u) * select(-1.0, 1.0, (k & 1u) == 0u);
    let Nk = normalize(vec3f(-(sN.x + o.x), 1.0, sN.y + o.y));
    var Rk = reflect(-V, Nk);
    Rk.y = abs(Rk.y) * 0.4 + max(Rk.y, 0.0) * 0.6;
    Rk = normalize(Rk);
    let Fk = schlick(dot(normalize(mix(mix(Nk, Nw, cRes), vec3f(0.0, 1.0, 0.0), vis)), V));
    skyAcc += 0.25 * Fk * skyColor(Rk);
    fAcc += 0.25 * Fk;
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
  let spec = min(Dm * schlick(dot(Hv, V)) * Gs / (4.0 * max(NdV, 0.08)), 6.0) * 0.28 * F.sun.w;
  let body = vec3f(0.02, 0.09, 0.12) * (0.6 + 0.4 * Ls.y) + vec3f(0.0, 0.05, 0.04) * pow(max(dot(-V, Ls), 0.0), 4.0);
  let dbg = u32(F.rip2.w);
  var col = mix(body, select(sky, body, (dbg & 4u) != 0u), fres) + select(vec3f(1.0, 0.92, 0.8) * spec, vec3f(0.0), (dbg & 2u) != 0u);
  let foam = select(smoothstep(0.5, 0.15, det), 0.0, (dbg & 1u) != 0u);
  col = mix(col, vec3f(0.9, 0.94, 0.96) * (0.55 + 0.45 * Ls.y), foam);
  col = mix(col, skyColor(normalize(vec3f(-V.x, 0.0, -V.z))), 1.0 - exp(-dist / 9000.0));      // haze toward the horizon
  if ((dbg & 8u) != 0u) { return vec4f(length(sN) / 2.0, length(sl) / 2.0, ripRough * 10.0, 1.0); }      // the slopes: r the drawn one, g the waves' alone (/ 2), b the ripples' roughness (x 10)
  return present(col);
}
`,E=w+`
struct SO { @builtin(position) pos: vec4f, @location(0) ndc: vec2f };
@vertex fn vs(@builtin(vertex_index) vi: u32) -> SO {
  let p = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0;
  var o: SO;
  o.pos = vec4f(p, 0.0, 1.0);
  o.ndc = p;
  return o;
}
@fragment fn fs(i: SO) -> @location(0) vec4f {
  return present(skyColor(normalize(F.camF.xyz + i.ndc.x * F.camR.xyz + i.ndc.y * F.camU.xyz)));
}
`,D=class{constructor(e,t,{msaa:n=4,format:r=navigator.gpu.getPreferredCanvasFormat(),timestamps:i=!1,grid:a=32,patch0:o=4,levels:s=12,rangeK:c=6}={}){if(c*.30000000000000004<Math.SQRT2)throw Error(`rangeK ${c} is too small: the mesh would crack (at least ${(Math.SQRT2/.30000000000000004).toFixed(2)})`);Object.assign(this,{device:e,canvas:t,msaa:n,format:r,grid:a,patch0:o,rangeK:c,levels:Math.min(s,16)}),this.ctx=t.getContext(`webgpu`),this.ctx.configure({device:e,format:r,alphaMode:`opaque`});let l=(t,n)=>e.createShaderModule({code:t,label:n}),u=l(T(a),`water`),d=l(E,`sky`);this.modules=[u,d];let p=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.bgl=e.createBindGroupLayout({entries:[{binding:0,visibility:p,buffer:{type:`uniform`}},{binding:1,visibility:p,sampler:{type:`filtering`}},...[2,3,4,5,6].map(e=>({binding:e,visibility:p,texture:{sampleType:`float`,viewDimension:`2d-array`}}))]});let m=e.createPipelineLayout({bindGroupLayouts:[this.bgl]}),h={count:n};this.water=e.createRenderPipeline({layout:m,label:`water`,vertex:{module:u,entryPoint:`vs`,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:u,entryPoint:`fs`,targets:[{format:r}]},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:`depth32float`,depthWriteEnabled:!0,depthCompare:`greater`},multisample:h}),this.sky=e.createRenderPipeline({layout:m,label:`sky`,vertex:{module:d,entryPoint:`vs`},fragment:{module:d,entryPoint:`fs`,targets:[{format:r}]},depthStencil:{format:`depth32float`,depthWriteEnabled:!1,depthCompare:`greater-equal`},multisample:h}),this.uni=e.createBuffer({size:S*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(S),this.samp=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`repeat`,maxAnisotropy:2});let g=a,_=new Uint16Array(g*g*6),v=0;for(let e=0;e<g;e++)for(let t=0;t<g;t++){let n=e*(g+1)+t,r=n+1,i=n+g+1,a=i+1;_.set([n,i,r,r,i,a],v),v+=6}this.idx=e.createBuffer({size:_.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.idx,0,_),this.instMax=2048,this.instF=new Float32Array(this.instMax*4),this.inst=e.createBuffer({size:this.instF.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});for(let e=0;e<this.levels;e++){let t=o*2**e,n=c*t;this.uniF.set([t/g,f*n,n,t],b+4*e)}this.timestamps=i,i&&(this.qs=e.createQuerySet({type:`timestamp`,count:4}),this.qres=e.createBuffer({size:32,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.qread=[],this.gpu={fft:[],draw:[]}),this.size=[0,0],this.cpuMs=[],this.doneMs=[]}setSea(r,i,s={},{micro:c=1,debug:l=0}={}){this.fft=r,this.rip=i;let u=r.sea.sets;i.setShape(s.ripples);let d=o(a(s),c),f=this.uniF;f.set(d.on?[d.dir[0],d.dir[1],d.amount*Math.sqrt(t(d.windMs,d.res)),1]:[1,0,0,0],v),f.set([...d.amp,d.on?d.sharp:1],52),f.set([e.cut,+!!r.sea.tails?.length,1,l],56),f.set(i.tiles,y);for(let e=0;e<32;e++){let t=u[e],i=e>=r.nS||t.band===n.WIND_L||t.band===n.WIND_R?C.OFF:t.band===n.TAIL?C.TAIL:C.MAIN;this.uniF.set(e<r.nS?[t.L,(t.span??1)-1,t.slopeVar??0,i]:[1,0,0,0],x+4*e)}this.chop=s.chop??1,this.uniF.set([.15*(s.stokes??0)*(s.stats?.sharpWeight??1),1/Math.max(.05,s.stats?.hs??0),s.ripples?.sharp??1,0],_),this.bg=this.device.createBindGroup({layout:this.bgl,entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:this.samp},...[...r.out,...i.out].map((e,t)=>({binding:2+t,resource:e.createView({dimension:`2d-array`})}))]})}_targets(){let e=this.canvas.width,t=this.canvas.height;(e!==this.size[0]||t!==this.size[1])&&(this.size=[e,t],this.colorMS?.destroy(),this.depth?.destroy(),this.colorMS=this.msaa>1?this.device.createTexture({size:[e,t],format:this.format,sampleCount:this.msaa,usage:GPUTextureUsage.RENDER_ATTACHMENT}):null,this.depth=this.device.createTexture({size:[e,t],format:`depth32float`,sampleCount:this.msaa,usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_select(e,t){let n=this.instF,r=this.patch0,i=this.levels-1,a=e.e,o=e.n,s=e.h,c=e=>[t[e],t[4+e],t[8+e],t[12+e]],l=c(0),u=c(1),d=c(2),f=c(3),h=[f.map((e,t)=>e+l[t]),f.map((e,t)=>e-l[t]),f.map((e,t)=>e+u[t]),f.map((e,t)=>e-u[t]),f.map((e,t)=>e-d[t])],g=(e,t,n)=>{let r=e-a-m,i=r+n+12,s=o-t-n-m,c=s+n+12;for(let[e,t,n,a]of h)if(e*(e>0?i:r)+t*(t>0?p:-12)+n*(n>0?c:s)+a<0)return!1;return!0},_=e=>this.rangeK*r*2**e,v=(e,t,n)=>Math.hypot(Math.max(e-a,0,a-e-n),Math.max(t-o,0,o-t-n),s),y=0,b=(e,t,i)=>{y<this.instMax&&(n.set([e,t,r*2**i,i],4*y),y++)},x=(e,t,n)=>{let i=r*2**n,a=v(e,t,i);if(a>_(n))return!1;if(!g(e,t,i))return!0;if(n===0||a>_(n-1))return b(e,t,n),!0;let o=i/2;for(let[r,i]of[[0,0],[o,0],[0,o],[o,o]])!x(e+r,t+i,n-1)&&g(e+r,t+i,o)&&b(e+r,t+i,n-1);return!0},S=r*2**i,C=_(i);for(let e=Math.floor((a-C)/S);e<=Math.floor((a+C)/S);e++)for(let t=Math.floor((o-C)/S);t<=Math.floor((o+C)/S);t++)x(e*S,t*S,i);return y}frame(e,t,{exposure:n=1.4,chop:r=this.chop??1,sunDir:i=[.3,.45,-.84],load:a=1}={}){let o=performance.now(),s=this.device;this._targets();let c=this.canvas.width,l=this.canvas.height,u=this.uniF,d=Math.cos(e.yaw),f=Math.sin(e.yaw),p=Math.cos(e.pitch),m=Math.sin(e.pitch),g=[f*p,m,-d*p],_=[d,0,f],v=[_[1]*g[2]-_[2]*g[1],_[2]*g[0]-_[0]*g[2],_[0]*g[1]-_[1]*g[0]],y=[0,e.h,0],b=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],x=[_[0],v[0],-g[0],0,_[1],v[1],-g[1],0,_[2],v[2],-g[2],0,-b(_,y),-b(v,y),b(g,y),1],S=c/l,C=Math.tan(e.fov*Math.PI/360),w=k([1/(S*C),0,0,0,0,1/C,0,0,0,0,0,-1,0,0,.05,0],x);u.set(w,0),u.set([e.e,e.h,e.n,t],16);let T=Math.hypot(...i);u.set([i[0]/T,i[1]/T,i[2]/T,h],20),u.set([c,l,1/c,1/l],24),u.set([this.fft.nS,r,n,0],28),u.set([_[0]*C*S,_[1]*C*S,_[2]*C*S,0,v[0]*C,v[1]*C,v[2]*C,0,g[0],g[1],g[2],0],32);let E=this._select(e,w);s.queue.writeBuffer(this.uni,0,u),s.queue.writeBuffer(this.inst,0,this.instF,0,E*4);let D=s.createCommandEncoder(),A=this.timestamps,j=D.beginComputePass(A?{timestampWrites:{querySet:this.qs,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});this.fft.encode(j,t),this.rip.encode(j,t),j.end();let M=this.ctx.getCurrentTexture().createView();for(let e=0;e<a;e++){let t=A&&(e===0||e===a-1)?{querySet:this.qs,...e===0?{beginningOfPassWriteIndex:2}:{},...e===a-1?{endOfPassWriteIndex:3}:{}}:null,n=D.beginRenderPass({colorAttachments:[this.colorMS?{view:this.colorMS.createView(),resolveTarget:M,loadOp:`clear`,storeOp:`discard`,clearValue:[0,0,0,1]}:{view:M,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:`discard`},...t?{timestampWrites:t}:{}});n.setBindGroup(0,this.bg),E&&(n.setPipeline(this.water),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,E)),n.setPipeline(this.sky),n.draw(3),n.end()}let N=null;A&&(D.resolveQuerySet(this.qs,0,4,this.qres,0),N=this.qread.pop()??s.createBuffer({size:32,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),D.copyBufferToBuffer(this.qres,0,N,0,32)),s.queue.submit([D.finish()]);let P=performance.now();s.queue.onSubmittedWorkDone().then(()=>O(this.doneMs,performance.now()-P)).catch(()=>{}),N&&N.mapAsync(GPUMapMode.READ).then(()=>{let e=new BigUint64Array(N.getMappedRange());O(this.gpu.fft,Number(e[1]-e[0])/1e6),O(this.gpu.draw,Number(e[3]-e[2])/1e6),N.unmap(),this.qread.push(N)}).catch(()=>{}),this.patches=E,this.vertices=E*(this.grid+1)**2,O(this.cpuMs,performance.now()-o)}};function O(e,t){e.push(t),e.length>1200&&e.splice(0,600)}function k(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}var A=new URLSearchParams(location.search),j=(e,t)=>A.get(e)==null?t:Number(A.get(e)),M=document.getElementById(`hud`),N=document.getElementById(`view`),P={ready:!1,done:!1,errors:[],frames:0,fft:[],draw:[],wall:[]};window.__sim2=P;var F=e=>{P.errors.length>=20||P.errors.includes(e)||(P.errors.push(e),M.textContent=`${M.textContent}\n${e}`,console.error(e))},I=e=>{if(!e.length)return null;let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},L=e=>e==null?`-`:e.toFixed(1),R=e=>e==null?`-`:e.toFixed(2);function z(){let e=j(`dpr`,devicePixelRatio),t=(A.get(`size`)??``).split(`x`).map(Number);N.width=t[0]||Math.round(innerWidth*e),N.height=t[1]||Math.round(innerHeight*e),t[1]&&(N.style.width=`${N.width/e}px`,N.style.height=`${N.height/e}px`)}function B(e){let t={e:0,n:0,h:j(`eye`,1.1),yaw:(A.get(`yaw`)==null?e.headingDeg??0:j(`yaw`,0))*Math.PI/180,pitch:j(`pitch`,-6)*Math.PI/180,fov:j(`fov`,70)},n=new Set,r=j(`speed`,3.5);addEventListener(`keydown`,e=>n.add(e.key.toLowerCase())),addEventListener(`keyup`,e=>n.delete(e.key.toLowerCase()));let i=null;return N.addEventListener(`pointerdown`,e=>{i=[e.clientX,e.clientY],N.setPointerCapture(e.pointerId)}),N.addEventListener(`pointermove`,e=>{i&&=(t.yaw+=(e.clientX-i[0])*.004,t.pitch=Math.max(-1.4,Math.min(1.2,t.pitch-(e.clientY-i[1])*.004)),[e.clientX,e.clientY])}),N.addEventListener(`pointerup`,()=>{i=null}),N.addEventListener(`wheel`,e=>{t.h=Math.max(.3,Math.min(3e3,t.h*Math.exp(e.deltaY*.001))),e.preventDefault()},{passive:!1}),t.step=e=>{let i=e=>n.has(e),a=+!!i(`w`)-!!i(`s`),o=+!!i(`d`)-!!i(`a`),s=n.size?r*4*Math.max(1,t.h/10):r,c=n.size?a:1;t.e+=(Math.sin(t.yaw)*c+Math.cos(t.yaw)*o)*s*e,t.n+=(Math.cos(t.yaw)*c-Math.sin(t.yaw)*o)*s*e,i(`arrowleft`)&&(t.yaw-=e),i(`arrowright`)&&(t.yaw+=e),i(`arrowup`)&&(t.pitch=Math.min(1.2,t.pitch+e*.6)),i(`arrowdown`)&&(t.pitch=Math.max(-1.4,t.pitch-e*.6)),i(`q`)&&(t.h=Math.max(.3,t.h*Math.exp(-e))),i(`e`)&&(t.h=Math.min(3e3,t.h*Math.exp(e)))},t}var V=3,H=(A.get(`stages`)??`1:30,2:30,4:30`).split(`,`).map(e=>{let[t,n]=e.split(`:`).map(Number);return{load:Math.max(1,Math.round(t||1)),s:n||30}});function U(e,t){let n=V+H.reduce((e,t)=>e+t.s,0),r=[],i=c(),a=null,o=-1,u=0,d=[],f=!1,p=e=>{let t=V;for(let n of H)if(e<(t+=n.s))return n;return null},m=(t,n)=>{let i=e.gpu,a=e=>e?e.splice(0):[],o={s:t,load:n.load,fps:u,frameMs:I(d),doneMs:I(a(e.doneMs)),drawMs:I(a(i?.draw)),computeMs:I(a(i?.fft))};t>=V&&r.push(o),u=0,d=[]},h=()=>H.map(e=>{let n=r.filter(t=>t.load===e.load),i=n.slice(0,5),a=n.slice(-10),o=(e,t)=>I(e.map(e=>e[t]).filter(e=>e!=null));return`x${e.load}: ${L(o(i,`fps`))} fps in its first 5 s, ${L(o(a,`fps`))} in its last 10 s; submit to done ${L(o(i,`doneMs`))} then ${L(o(a,`doneMs`))} ms`+(t.timestamps?`; GPU sea ${R(o(i,`drawMs`))} then ${R(o(a,`drawMs`))} ms, compute ${R(o(i,`computeMs`))} then ${R(o(a,`computeMs`))} ms`:``)}),g=()=>{f=!0;let n=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, canvas ${N.width}x${N.height}, MSAA ${e.msaa}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets, ${e.patches} patches`],a=[`s load fps frame_ms done_ms gpu_sea_ms gpu_compute_ms`,...r.map(e=>[e.s,e.load,e.fps,L(e.frameMs),L(e.doneMs),R(e.drawMs),R(e.computeMs)].join(` `))],o=h(),c=[...n,``,`The WebGPU sea, drawn 1, 2 and 4 times a frame:`,...o,``,...a,...P.errors.length?[``,...P.errors]:[]].join(`
`);P.measure={rows:r,lines:o,report:c},i.done({lines:o,onSend:()=>l(`Surfski WebGPU sea measurement`,c),onCopy:e=>s(c,e)})};return(e,t)=>{if(f)return null;a??=e;let r=Math.floor((e-a)/1e3),s=p(r);return r!==o&&(o>=0&&m(o,p(o)),o=r,s&&i.progress(r<V?`the WebGPU sea, settling`:`the WebGPU sea drawn ${s.load} time${s.load>1?`s`:``} a frame`,n-r)),s?(u++,d.push(t),s.load):(g(),null)}}async function W(){if(!navigator.gpu){F(`WebGPU is not available in this browser`);return}let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e){F(`WebGPU: no adapter`);return}let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:t?[`timestamp-query`]:[]});n.addEventListener(`uncapturederror`,e=>F(`WebGPU error: ${e.error.message}`)),n.lost.then(e=>F(`WebGPU device lost: ${e.message}`)),z(),A.get(`size`)||addEventListener(`resize`,z);let a=r(A.get(`course`)??`gorge-swellcity`)??r(`gorge-swellcity`),o=i(a.name),s=o.state.fft.sea,c=s.sets.slice(0,32),l=new u(n);l.build({...s,sets:c});let f=new D(n,N,{msaa:j(`msaa`,4),timestamps:t,grid:j(`grid`,32),patch0:j(`patch0`,4),levels:j(`levels`,12),rangeK:j(`rangeK`,6)}),p=new d(n);for(let e of[...f.modules,...p.modules])for(let t of(await e.getCompilationInfo()).messages)F(`${e.label} ${t.type} line ${t.lineNum}:${t.linePos} ${t.message}`);f.setSea(l,p,o.state,{micro:j(`ripples`,1),debug:j(`seadbg`,0)});let m=B(o),h=j(`frames`,0),g=(o.look?.sunAz??200)*Math.PI/180,_=(o.look?.sunEl??30)*Math.PI/180,v={sunDir:[Math.sin(g)*Math.cos(_),Math.sin(_),-Math.cos(g)*Math.cos(_)]};P.info={course:a.id,adapter:`${e.info?.vendor??``} ${e.info?.architecture??``}`.trim()||`unknown`,timestamps:t,sets:c.length,msaa:f.msaa};let y=A.get(`measure`)?U(f,P.info):null,b=performance.now(),x=0,S=1,C=A.get(`freeze`)==null?null:j(`freeze`,100),w=e=>{let t=Math.min(.1,(e-b)/1e3);if(b=e,x+=t,y&&(S=y(e,t*1e3)??1),C??m.step(t),f.frame(m,C??100+x,{...v,load:S}),P.frames++,P.wall.push(t*1e3),P.wall.length>1200&&P.wall.splice(0,600),P.ready=!0,P.frames%20==0){let e=f.gpu,t=I(P.wall.slice(-60));M.textContent=`${N.width}x${N.height}, MSAA ${f.msaa}, ${c.length} sets, ${f.patches} patches${S>1?`, drawn ${S} times`:``}\nframe ${L(t)} ms${e?`; GPU: FFT and ripples ${R(I(e.fft.slice(-60)))} ms, sea and sky ${R(I(e.draw.slice(-60)))} ms`:`; submit to done ${L(I(f.doneMs.slice(-60)))} ms`}\neye ${m.h.toFixed(1)} m, pitch ${(m.pitch*180/Math.PI).toFixed(0)}°${P.errors.length?`\n${P.errors.join(`
`)}`:``}`}if(h&&P.frames>=h){let e=f.gpu;Object.assign(P,{done:!0,fftMs:e?I(e.fft.slice(10)):null,drawMs:e?I(e.draw.slice(10)):null,frameMs:I(P.wall.slice(10)),doneMs:I(f.doneMs.slice(10)),patches:f.patches,vertices:f.vertices,cpuMs:I(f.cpuMs.slice(10)),size:[N.width,N.height]}),P.fft=e?.fft??[],P.draw=e?.draw??[]}else requestAnimationFrame(w)};requestAnimationFrame(w)}W().catch(e=>F(`sim2 failed: ${e.message}`));