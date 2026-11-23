/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,s as t,t as n}from"./fftsea-BlV7h9PB.js";import{_ as r}from"./seas-CiqO6vxw.js";import{i}from"./scenarios-CUIjf6SF.js";import{n as a,t as o}from"./fine-detail-CvgjbFpv.js";import"./fftgpu-CavxKjr5.js";import{a as s,d as c,f as l,l as u,m as d}from"./ripcascade-DKXb2b1O.js";import{n as f,t as p}from"./ripples-webgpu-CdQ5PmzO.js";var m=.8,h=12,g=6,_=3,v=.35,y=44,b=48,x=60,S=x+8,C=S+64,w=C+128,T={OFF:0,MAIN:1,TAIL:2},E=`
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
`,D=e=>E+`
override RIPPLES: bool = true;      // the ripple cascades
override FACETS: u32 = 4u;          // the sky averaged over 4 facets, or 1 (the mean normal's reflection)
override FRAG_SETS: bool = true;    // the sea's sets read again per pixel for the slope (false: a flat normal; a cost test)
override VS_DISP: bool = true;      // the vertices displaced by the sea's sets (false: flat; a cost test)
override SHADE: bool = true;        // the water's shading (false: one colour, the mesh and the raster alone; a cost test)
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
  if (!SHADE) { return vec4f(0.1, 0.3, 0.4, 1.0); }
  let dx0 = dpdx(i.p0);
  let dy0 = dpdy(i.p0);
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
  let cRes = ${v} * (1.0 - smoothstep(20.0, 35.0, dist));
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
    skyAcc += wk * Fk * skyColor(Rk);
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
`,O=E+`
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
`,k={msaa:4,grid:32,ripples:!0,facets:4,fragSets:!0,vsDisp:!0,shade:!0},A=class{constructor(e,t,{msaa:n=4,format:r=navigator.gpu.getPreferredCanvasFormat(),timestamps:i=!1,grid:a=32,patch0:o=4,levels:s=12,rangeK:c=6}={}){if(c*.30000000000000004<Math.SQRT2)throw Error(`rangeK ${c} is too small: the mesh would crack (at least ${(Math.SQRT2/.30000000000000004).toFixed(2)})`);Object.assign(this,{device:e,canvas:t,format:r,patch0:o,rangeK:c,levels:Math.min(s,16)}),this.ctx=t.getContext(`webgpu`),this.ctx.configure({device:e,format:r,alphaMode:`opaque`});let l=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT;this.bgl=e.createBindGroupLayout({entries:[{binding:0,visibility:l,buffer:{type:`uniform`}},{binding:1,visibility:l,sampler:{type:`filtering`}},...[2,3,4,5,6].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}}))]}),this.layout=e.createPipelineLayout({bindGroupLayouts:[this.bgl]}),this.skyModule=e.createShaderModule({code:O,label:`sky`}),this.byGrid=new Map,this.pipes=new Map,this.uni=e.createBuffer({size:w*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(w),this.samp=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`repeat`,maxAnisotropy:2}),this.instMax=2048,this.instF=new Float32Array(this.instMax*4),this.inst=e.createBuffer({size:this.instF.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.timestamps=i,i&&(this.qs=e.createQuerySet({type:`timestamp`,count:4}),this.qres=e.createBuffer({size:32,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.qread=[],this.gpu={fft:[],draw:[],tagged:[]}),this.size=[0,0,0],this.cpuMs=[],this.doneMs=[],this.readMs=[],this.frameNo=0,this.setVariant({msaa:n,grid:a}),this.modules=[this.byGrid.get(a).module,this.skyModule]}_grid(e){let t=this.byGrid.get(e);if(!t){let n=new Uint16Array(e*e*6),r=0;for(let t=0;t<e;t++)for(let i=0;i<e;i++){let a=t*(e+1)+i,o=a+1,s=a+e+1,c=s+1;n.set([a,s,o,o,s,c],r),r+=6}let i=this.device.createBuffer({size:n.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(i,0,n),t={module:this.device.createShaderModule({code:D(e),label:`water ${e}`}),idx:i},this.byGrid.set(e,t)}return t}setVariant(e={}){let t={...k,...e},n=JSON.stringify(t),r=this.device,i=this.pipes.get(n);if(!i){let e=this._grid(t.grid),a={count:t.msaa},o=this.format,s={RIPPLES:+!!t.ripples,FACETS:t.facets,FRAG_SETS:+!!t.fragSets,VS_DISP:+!!t.vsDisp,SHADE:+!!t.shade};i={water:r.createRenderPipeline({layout:this.layout,label:`water ${n}`,vertex:{module:e.module,entryPoint:`vs`,constants:s,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:e.module,entryPoint:`fs`,constants:s,targets:[{format:o}]},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:`depth32float`,depthWriteEnabled:!0,depthCompare:`greater`},multisample:a}),sky:r.createRenderPipeline({layout:this.layout,label:`sky`,vertex:{module:this.skyModule,entryPoint:`vs`},fragment:{module:this.skyModule,entryPoint:`fs`,targets:[{format:o}]},depthStencil:{format:`depth32float`,depthWriteEnabled:!1,depthCompare:`greater-equal`},multisample:a}),idx:e.idx},this.pipes.set(n,i)}this.variant=t,this.water=i.water,this.sky=i.sky,this.idx=i.idx,this.msaa=t.msaa,this.grid=t.grid;for(let e=0;e<this.levels;e++){let n=this.patch0*2**e,r=this.rangeK*n;this.uniF.set([n/t.grid,m*r,r,n],S+4*e)}}setSea(r,i,s={},{micro:c=1,debug:l=0}={}){this.fft=r,this.rip=i;let u=r.sea.sets;i.setShape(s.ripples);let d=o(a(s),c),f=this.uniF;f.set(d.on?[d.dir[0],d.dir[1],d.amount*Math.sqrt(t(d.windMs,d.res)),1]:[1,0,0,0],b),f.set([...d.amp,d.on?d.sharp:1],52),f.set([e.cut,+!!r.sea.tails?.length,1,l],56),f.set(i.tiles,x);for(let e=0;e<32;e++){let t=u[e],i=e>=r.nS||t.band===n.WIND_L||t.band===n.WIND_R?T.OFF:t.band===n.TAIL?T.TAIL:T.MAIN;this.uniF.set(e<r.nS?[t.L,(t.span??1)-1,t.slopeVar??0,i]:[1,0,0,0],C+4*e)}this.chop=s.chop??1,this.uniF.set([.15*(s.stokes??0)*(s.stats?.sharpWeight??1),1/Math.max(.05,s.stats?.hs??0),s.ripples?.sharp??1,0],y),this.bg=this.device.createBindGroup({layout:this.bgl,entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:this.samp},...[...r.out,...i.out].map((e,t)=>({binding:2+t,resource:e.createView({dimension:`2d-array`})}))]})}_targets(){let e=this.canvas.width,t=this.canvas.height;(e!==this.size[0]||t!==this.size[1]||this.msaa!==this.size[2])&&(this.size=[e,t,this.msaa],this.colorMS?.destroy(),this.depth?.destroy(),this.colorMS=this.msaa>1?this.device.createTexture({size:[e,t],format:this.format,sampleCount:this.msaa,usage:GPUTextureUsage.RENDER_ATTACHMENT}):null,this.depth=this.device.createTexture({size:[e,t],format:`depth32float`,sampleCount:this.msaa,usage:GPUTextureUsage.RENDER_ATTACHMENT}))}_select(e,t){let n=this.instF,r=this.patch0,i=this.levels-1,a=e.e,o=e.n,s=e.h,c=e=>[t[e],t[4+e],t[8+e],t[12+e]],l=c(0),u=c(1),d=c(2),f=c(3),p=[f.map((e,t)=>e+l[t]),f.map((e,t)=>e-l[t]),f.map((e,t)=>e+u[t]),f.map((e,t)=>e-u[t]),f.map((e,t)=>e-d[t])],m=(e,t,n)=>{let r=e-a-g,i=r+n+12,s=o-t-n-g,c=s+n+12;for(let[e,t,n,a]of p)if(e*(e>0?i:r)+t*(t>0?h:-12)+n*(n>0?c:s)+a<0)return!1;return!0},_=e=>this.rangeK*r*2**e,v=(e,t,n)=>Math.hypot(Math.max(e-a,0,a-e-n),Math.max(t-o,0,o-t-n),s),y=0,b=(e,t,i)=>{y<this.instMax&&(n.set([e,t,r*2**i,i],4*y),y++)},x=(e,t,n)=>{let i=r*2**n,a=v(e,t,i);if(a>_(n))return!1;if(!m(e,t,i))return!0;if(n===0||a>_(n-1))return b(e,t,n),!0;let o=i/2;for(let[r,i]of[[0,0],[o,0],[0,o],[o,o]])!x(e+r,t+i,n-1)&&m(e+r,t+i,o)&&b(e+r,t+i,n-1);return!0},S=r*2**i,C=_(i);for(let e=Math.floor((a-C)/S);e<=Math.floor((a+C)/S);e++)for(let t=Math.floor((o-C)/S);t<=Math.floor((o+C)/S);t++)x(e*S,t*S,i);return y}frame(e,t,{exposure:n=1.4,chop:r=this.chop??1,sunDir:i=[.3,.45,-.84],load:a=1,tag:o=null}={}){let s=performance.now(),c=this.device;this._targets();let l=this.canvas.width,u=this.canvas.height,d=this.uniF,f=Math.cos(e.yaw),p=Math.sin(e.yaw),m=Math.cos(e.pitch),h=Math.sin(e.pitch),g=[p*m,h,-f*m],v=[f,0,p],y=[v[1]*g[2]-v[2]*g[1],v[2]*g[0]-v[0]*g[2],v[0]*g[1]-v[1]*g[0]],b=[0,e.h,0],x=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],S=[v[0],y[0],-g[0],0,v[1],y[1],-g[1],0,v[2],y[2],-g[2],0,-x(v,b),-x(y,b),x(g,b),1],C=l/u,w=Math.tan(e.fov*Math.PI/360),T=M([1/(C*w),0,0,0,0,1/w,0,0,0,0,0,-1,0,0,.05,0],S);d.set(T,0),d.set([e.e,e.h,e.n,t],16);let E=Math.hypot(...i);d.set([i[0]/E,i[1]/E,i[2]/E,_],20),d.set([l,u,1/l,1/u],24),d.set([this.fft.nS,r,n,0],28),d.set([v[0]*w*C,v[1]*w*C,v[2]*w*C,0,y[0]*w,y[1]*w,y[2]*w,0,g[0],g[1],g[2],0],32);let D=this._select(e,T);c.queue.writeBuffer(this.uni,0,d),c.queue.writeBuffer(this.inst,0,this.instF,0,D*4);let O=c.createCommandEncoder(),k=this.timestamps,A=O.beginComputePass(k?{timestampWrites:{querySet:this.qs,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});this.fft.encode(A,t),this.rip.encode(A,t),A.end();let N=this.ctx.getCurrentTexture().createView();for(let e=0;e<a;e++){let t=k&&(e===0||e===a-1)?{querySet:this.qs,...e===0?{beginningOfPassWriteIndex:2}:{},...e===a-1?{endOfPassWriteIndex:3}:{}}:null,n=O.beginRenderPass({colorAttachments:[this.colorMS?{view:this.colorMS.createView(),resolveTarget:N,loadOp:`clear`,storeOp:`discard`,clearValue:[0,0,0,1]}:{view:N,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:`discard`},...t?{timestampWrites:t}:{}});n.setBindGroup(0,this.bg),D&&(n.setPipeline(this.water),n.setVertexBuffer(0,this.inst),n.setIndexBuffer(this.idx,`uint16`),n.drawIndexed(this.grid*this.grid*6,D)),n.setPipeline(this.sky),n.draw(3),n.end()}let P=null;k&&(O.resolveQuerySet(this.qs,0,4,this.qres,0),P=this.qread.pop()??c.createBuffer({size:32,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),O.copyBufferToBuffer(this.qres,0,P,0,32)),c.queue.submit([O.finish()]);let F=performance.now();c.queue.onSubmittedWorkDone().then(()=>j(this.doneMs,performance.now()-F)).catch(()=>{});let I=++this.frameNo;P&&P.mapAsync(GPUMapMode.READ).then(()=>{j(this.readMs,performance.now()-F);let e=new BigUint64Array(P.getMappedRange()),t=Number(e[1]-e[0])/1e6,n=Number(e[3]-e[2])/1e6;j(this.gpu.fft,t),j(this.gpu.draw,n),o!=null&&j(this.gpu.tagged,{tag:o,fft:t,draw:n,lag:this.frameNo-I}),P.unmap(),this.qread.push(P)}).catch(()=>{}),this.patches=D,this.vertices=D*(this.grid+1)**2,j(this.cpuMs,performance.now()-s)}};function j(e,t){e.push(t),e.length>1200&&e.splice(0,600)}function M(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}var N=new URLSearchParams(location.search),P=(e,t)=>N.get(e)==null?t:Number(N.get(e)),F=document.getElementById(`hud`),I=document.getElementById(`view`),L={ready:!1,done:!1,errors:[],frames:0,fft:[],draw:[],wall:[]};window.__sim2=L;var R=e=>{L.errors.length>=20||L.errors.includes(e)||(L.errors.push(e),F.textContent=`${F.textContent}\n${e}`,console.error(e))},z=e=>{if(!e.length)return null;let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},B=e=>e==null?`-`:e.toFixed(1),V=e=>e==null?`-`:e.toFixed(2);function H(){let e=P(`dpr`,devicePixelRatio),t=(N.get(`size`)??``).split(`x`).map(Number);I.width=t[0]||Math.round(innerWidth*e),I.height=t[1]||Math.round(innerHeight*e),t[1]&&(I.style.width=`${I.width/e}px`,I.style.height=`${I.height/e}px`)}function U(e){let t={e:0,n:0,h:P(`eye`,1.1),yaw:(N.get(`yaw`)==null?e.headingDeg??0:P(`yaw`,0))*Math.PI/180,pitch:P(`pitch`,-6)*Math.PI/180,fov:P(`fov`,70)},n=new Set,r=P(`speed`,3.5);addEventListener(`keydown`,e=>n.add(e.key.toLowerCase())),addEventListener(`keyup`,e=>n.delete(e.key.toLowerCase()));let i=null;return I.addEventListener(`pointerdown`,e=>{i=[e.clientX,e.clientY],I.setPointerCapture(e.pointerId)}),I.addEventListener(`pointermove`,e=>{i&&=(t.yaw+=(e.clientX-i[0])*.004,t.pitch=Math.max(-1.4,Math.min(1.2,t.pitch-(e.clientY-i[1])*.004)),[e.clientX,e.clientY])}),I.addEventListener(`pointerup`,()=>{i=null}),I.addEventListener(`wheel`,e=>{t.h=Math.max(.3,Math.min(3e3,t.h*Math.exp(e.deltaY*.001))),e.preventDefault()},{passive:!1}),t.step=e=>{let i=e=>n.has(e),a=+!!i(`w`)-!!i(`s`),o=+!!i(`d`)-!!i(`a`),s=n.size?r*4*Math.max(1,t.h/10):r,c=n.size?a:1;t.e+=(Math.sin(t.yaw)*c+Math.cos(t.yaw)*o)*s*e,t.n+=(Math.cos(t.yaw)*c-Math.sin(t.yaw)*o)*s*e,i(`arrowleft`)&&(t.yaw-=e),i(`arrowright`)&&(t.yaw+=e),i(`arrowup`)&&(t.pitch=Math.min(1.2,t.pitch+e*.6)),i(`arrowdown`)&&(t.pitch=Math.max(-1.4,t.pitch-e*.6)),i(`q`)&&(t.h=Math.max(.3,t.h*Math.exp(-e))),i(`e`)&&(t.h=Math.min(3e3,t.h*Math.exp(e)))},t}var W=3,G=P(`ramp`,75),K=P(`tail`,30),q=48;function J(e,t){let n=W+G+K,r=[],i=[],a=c(),o=null,f=-1,p=0,m=[],h=!1,g=60,_=1,v=e=>e<W?`warm`:e<W+G?`ramp`:e<n?`tail`:null,y=(n,a)=>{let o=e.gpu,s=e=>e?e.splice(0):[],c={s:n,phase:a,load:_,fps:p,frameMs:z(m),doneMs:z(s(e.doneMs)),drawMs:z(s(o?.draw)),computeMs:z(s(o?.fft)),patches:e.patches};if(a===`warm`?i.push(...m):r.push(c),n===2){let e=i.slice().sort((e,t)=>e-t)[Math.floor(i.length*.1)]??16.7;g=e<11?120:e<22?60:30,t.pacing=l(e)}if(a===`ramp`||n===2){let e=p>=.95*g;_=n===2?1:e?Math.min(q,_+Math.max(1,Math.floor(_/4))):Math.max(1,_-(p<.8*g?2:1))}n+1===W+G&&(_=1),p=0,m=[]},b=()=>{let e=[`display ${g} fps (${t.pacing??`?`})`],n=r.filter(e=>e.phase===`ramp`),i=r.filter(e=>e.phase===`tail`);for(let t=0;t<G;t+=10){let r=n.filter(e=>e.s-W>=t&&e.s-W<t+10).filter(e=>e.fps>=.95*g).map(e=>e.load);e.push(`${t}-${Math.min(G,t+10)} s: held ${r.length?`up to ${Math.max(...r)} copies (median ${z(r)})`:`no second at the display rate`}`)}let a=(e,t)=>z(e.map(e=>e[t]).filter(e=>e!=null)),o=i.slice(0,5),s=i.slice(-10);return e.push(`then 1 copy: ${B(a(o,`fps`))} fps in its first 5 s, ${B(a(s,`fps`))} in its last 10 s; submit to done ${B(a(o,`doneMs`))} then ${B(a(s,`doneMs`))} ms`+(t.timestamps?`; GPU sea ${V(a(s,`drawMs`))} ms, compute ${V(a(s,`computeMs`))} ms`:``)),e},x=async()=>{h=!0;let n=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, canvas ${I.width}x${I.height}, MSAA ${e.msaa}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets`,await d()],i=[`s phase copies fps frame_ms done_ms gpu_sea_ms gpu_compute_ms patches`,...r.map(e=>[e.s,e.phase,e.load,e.fps,B(e.frameMs),B(e.doneMs),V(e.drawMs),V(e.computeMs),e.patches].join(` `))],o=b(),c=[...n,``,`The WebGPU sea: the copies a frame held at the display rate, then one copy:`,...o,``,...i,...L.errors.length?[``,...L.errors]:[]].join(`
`);L.measure={rows:r,lines:o,report:c},a.done({lines:o,onSend:()=>u(`Surfski WebGPU sea measurement`,c),onCopy:e=>s(c,e)})};return(e,t)=>{if(h)return null;o??=e;let r=Math.floor((e-o)/1e3),i=v(r);return r!==f&&(f>=0&&y(f,v(f)),f=r,i&&a.progress(i===`warm`?`the WebGPU sea, settling`:i===`ramp`?`the WebGPU sea, ${_} cop${_>1?`ies`:`y`} a frame`:`the WebGPU sea drawn once`,n-r)),i?(p++,m.push(t),_):(x(),null)}}var Y=P(`slot`,2.5),X=.5,Z=P(`rounds`,3),Q=4,$=Math.max(1,P(`load`,1)),ee=.08;function te(e){let t=t=>Math.min(1,Math.sqrt(t/e));return[[`full again`,{}],[`MSAA off`,{msaa:1}],[`1.2 megapixels`,{scale:t(12e5)}],[`1.2 megapixels, MSAA off`,{scale:t(12e5),msaa:1}],[`0.6 megapixels`,{scale:t(6e5)}],[`no ripples`,{ripples:!1}],[`sky from 1 facet, not 4`,{facets:1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`flat vertices (no displacement)`,{vsDisp:!1}],[`one colour (mesh, raster, MSAA only)`,{shade:!1}]]}function ne(e,t,n){let r=te(n[0]*n[1]),i=[];for(let e=0;e<Z;e++)for(let[e,t]of r)i.push([`full`,{}],[e,t]);i.push([`full`,{}]);let a=Q+i.length*Y+1.5,o=c(),l=i.map(([e])=>({name:e,frames:0,draw:[],compute:[],lag:[]})),f=null,p=-2,m=!1,h=null,g=([,t])=>{let{scale:r=1,...i}=t;I.width=Math.round(n[0]*r),I.height=Math.round(n[1]*r),e.setVariant(i)};for(let[,t]of r){let{scale:n,...r}=t;e.setVariant(r)}e.setVariant({});let _=()=>{for(let t of e.gpu?.tagged.splice(0)??[]){let e=l[t.tag];e&&(e.draw.push(t.draw),e.compute.push(t.fft),e.lag.push(t.lag))}},v=async()=>{m=!0,_(),g([`full`,{}]);let i=l.map(e=>({name:e.name,drawMs:e.draw.length?z(e.draw)/$:null,computeMs:z(e.compute),fps:e.frames/(Y-X),n:e.draw.length,lag:z(e.lag)})),a=t.timestamps?`drawMs`:`fps`,c=[];for(let[e]of r){let n=[],r=[],o=0;i.forEach((s,c)=>{if(s.name!==e)return;let l=i[c-1]?.[a],u=i[c+1]?.[a],d=s[a];if(l==null||u==null||d==null)return;let f=(l+u)/2;n.push((t.timestamps?f-d:d-f)/f),r.push(f-d),Math.abs(l-u)/f>ee&&o++}),c.push({name:e,rel:z(n),lo:n.length?Math.min(...n):null,hi:n.length?Math.max(...n):null,ms:z(r),pairs:n.length,drift:o})}let f=i.filter(e=>e.name===`full`),p=e=>e==null?`-`:`${Math.round(e*100)}%`,h=[t.timestamps?`the full picture: ${V(z(f.map(e=>e.drawMs)))} ms of GPU (${V(f[0]?.drawMs)} at the start, ${V(f[f.length-1]?.drawMs)} at the end), compute ${V(z(f.map(e=>e.computeMs)))} ms, ${B(z(f.map(e=>e.fps)))} fps`:`the full picture: ${B(z(f.map(e=>e.fps)))} fps (no GPU timers here: the shares are of frames a second)`,...c.map(e=>`${e.name}: ${t.timestamps?`saves`:`gains`} ${p(e.rel)}${t.timestamps?` (${V(e.ms)} ms)`:``}, ${p(e.lo)} to ${p(e.hi)}${e.drift?`; ${e.drift} of ${e.pairs} pairs drifted`:``}`),`the times came back ${B(z(l.flatMap(e=>e.lag)))} frames late; submit to done ${B(z(e.doneMs))} ms, to the timers read back ${B(z(e.readMs))} ms`],v=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, full canvas ${n[0]}x${n[1]}, MSAA 4${$>1?`, ${$} copies a frame (times per copy)`:``}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets, ${e.patches} patches`,await d()],y=[`slot variant gpu_sea_ms gpu_compute_ms fps samples lag_frames`,...i.map((e,t)=>[t,`"${e.name}"`,V(e.drawMs),V(e.computeMs),B(e.fps),e.n,e.lag].join(` `))],b=[...v,``,`The WebGPU sea, part by part (each against the full picture either side of it):`,...h,``,...y,...L.errors.length?[``,...L.errors]:[]].join(`
`);L.sweep={slots:i,rows:c,lines:h,report:b},o.done({lines:h,onSend:()=>u(`Surfski WebGPU sea parts`,b),onCopy:e=>s(b,e)})};return{before(e){if(m)return null;f??=e;let t=(e-f)/1e3-Q,n=t<0?-1:Math.floor(t/Y);return n>=i.length?(h??=e,e-h>1500?v():_(),null):(n!==p&&(p=n,n>=0&&g(i[n]),o.progress(n>=0?`the WebGPU sea's parts: ${i[n][0]}`:`the WebGPU sea, settling`,a-(e-f)/1e3)),_(),n<0||t-n*Y<X?null:(l[n].frames++,n))}}}async function re(){if(!navigator.gpu){R(`WebGPU is not available in this browser`);return}let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e){R(`WebGPU: no adapter`);return}let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:t?[`timestamp-query`]:[]});n.addEventListener(`uncapturederror`,e=>R(`WebGPU error: ${e.error.message}`)),n.lost.then(e=>R(`WebGPU device lost: ${e.message}`)),H(),!N.get(`size`)&&!N.get(`sweep`)&&addEventListener(`resize`,H);let a=r(N.get(`course`)??`gorge-swellcity`)??r(`gorge-swellcity`),o=i(a.name),s=o.state.fft.sea,c=s.sets.slice(0,32),l=new f(n);l.build({...s,sets:c});let u=new A(n,I,{msaa:P(`msaa`,4),timestamps:t,grid:P(`grid`,32),patch0:P(`patch0`,4),levels:P(`levels`,12),rangeK:P(`rangeK`,6)}),d=new p(n);for(let e of[...u.modules,...d.modules])for(let t of(await e.getCompilationInfo()).messages)R(`${e.label} ${t.type} line ${t.lineNum}:${t.linePos} ${t.message}`);u.setSea(l,d,o.state,{micro:P(`ripples`,1),debug:P(`seadbg`,0)});let m=U(o),h=P(`frames`,0),g=(o.look?.sunAz??200)*Math.PI/180,_=(o.look?.sunEl??30)*Math.PI/180,v={sunDir:[Math.sin(g)*Math.cos(_),Math.sin(_),-Math.cos(g)*Math.cos(_)]};L.info={course:a.id,adapter:`${e.info?.vendor??``} ${e.info?.architecture??``}`.trim()||`unknown`,timestamps:t,sets:c.length,msaa:u.msaa};let y=N.get(`measure`)?J(u,L.info):null,b=N.get(`sweep`)?ne(u,L.info,[I.width,I.height]):null,x=performance.now(),S=0,C=1,w=N.get(`freeze`)==null?null:P(`freeze`,100),T=e=>{let t=Math.min(.1,(e-x)/1e3);x=e,S+=t,y?C=y(e,t*1e3)??1:b&&(C=$);let n=b?.before(e)??null;if(w==null&&!b&&m.step(t),u.frame(m,w??100+S,{...v,load:C,tag:n}),L.frames++,L.wall.push(t*1e3),L.wall.length>1200&&L.wall.splice(0,600),L.ready=!0,L.frames%20==0){let e=u.gpu,t=z(L.wall.slice(-60));F.textContent=`${I.width}x${I.height}, MSAA ${u.msaa}, ${c.length} sets, ${u.patches} patches${C>1?`, drawn ${C} times`:``}\nframe ${B(t)} ms${e?`; GPU: FFT and ripples ${V(z(e.fft.slice(-60)))} ms, sea and sky ${V(z(e.draw.slice(-60)))} ms`:`; submit to done ${B(z(u.doneMs.slice(-60)))} ms`}\neye ${m.h.toFixed(1)} m, pitch ${(m.pitch*180/Math.PI).toFixed(0)}°${L.errors.length?`\n${L.errors.join(`
`)}`:``}`}if(h&&L.frames>=h){let e=u.gpu;Object.assign(L,{done:!0,fftMs:e?z(e.fft.slice(10)):null,drawMs:e?z(e.draw.slice(10)):null,frameMs:z(L.wall.slice(10)),doneMs:z(u.doneMs.slice(10)),patches:u.patches,vertices:u.vertices,cpuMs:z(u.cpuMs.slice(10)),size:[I.width,I.height]}),L.fft=e?.fft??[],L.draw=e?.draw??[]}else requestAnimationFrame(T)};requestAnimationFrame(T)}re().catch(e=>R(`sim2 failed: ${e.message}`));