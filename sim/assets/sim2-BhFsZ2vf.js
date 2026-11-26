/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./modulepreload-polyfill-P2Xu9kJm.js";import{i as e,s as t,t as n}from"./fftsea-BlV7h9PB.js";import{f as r,m as i,v as a}from"./waves-B5Ut6Mnp.js";import{_ as o}from"./seas-CiqO6vxw.js";import{i as s}from"./scenarios-CUIjf6SF.js";import{a as c,c as l,d as u,f as d,i as f,l as p,m,n as h,o as g,p as _,r as v,s as y,t as b,u as x}from"./atmosphere-CzlQdgsZ.js";import"./fftgpu-CavxKjr5.js";import{i as S,o as C}from"./wave-solve-YKJxEQBO.js";import{f as w,l as T,n as E,o as D,s as O,u as k}from"./perf-measure-mz5jO15u.js";import{n as A}from"./ripcascade-CufHP4RE.js";import{n as j,t as M}from"./clouds-Dpdjb2rK.js";import{n as ee,t as N}from"./ripples-webgpu-DC01rn5d.js";var P=2*Math.PI;function F(e,t,n){let r=(Math.imul(e|0,2376512323)^Math.imul(t|0,3625334849)^Math.imul(n|0,3407524639))>>>0;return r^=r>>>16,r=Math.imul(r,2246822507)>>>0,r^=r>>>13,r=Math.imul(r,3266489909)>>>0,r^=r>>>16,r>>>0}var te=(e,t,n)=>F(e,t,n)/4294967296,ne=e=>e*e*e*(e*(e*6-15)+10),re=Float64Array.from({length:16},(e,t)=>Math.cos(P*(t+.5)/16)),I=Float64Array.from({length:16},(e,t)=>Math.sin(P*(t+.5)/16));function L(e,t=0){let n=Math.floor(e),r=e-n,i=2*te(n,0,t)-1,a=2*te(n+1,0,t)-1;return i*r+(a*(r-1)-i*r)*ne(r)}function R(e,t,n=0){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=(e,t,r,i)=>{let a=F(e,t,n)>>>28;return re[a]*r+I[a]*i},c=s(r,i,a,o),l=s(r+1,i,a-1,o),u=s(r,i+1,a,o-1),d=s(r+1,i+1,a-1,o-1),f=ne(a),p=ne(o),m=c+(l-c)*f;return m+(u+(d-u)*f-m)*p}var z=.1405,B=.2158,ie=2.399963229728653;function ae(e,t,n=0,r=null){return se(t,n,r,(n,r)=>L(e/r+17.31*n,t.seed+101*n)/z)}function oe(e,t,n,r=0,i=null){return se(n,r,i,(r,i)=>{let a=Math.cos(ie*r),o=Math.sin(ie*r);return R((a*e-o*t)/i+17.31*r,(o*e+a*t)/i-9.77*r,n.seed+101*r)/B})}function se(e,t,n,r){let i=2**-e.hurst,a=e.rms*Math.sqrt(1-i*i),o=Math.max(t,e.finest??0),s=0,c=0,l=a,u=e.scale;for(let e=0;e<24;e++,l*=i,u*=.5){let t=o>0?Math.min(1,Math.max(0,u/o-1)):1;if(t<=0){c+=l*l/(1-i*i);break}s+=t*l*r(e,u),c+=(1-t*t)*l*l}return n&&(n.value=s,n.cut=c),s}var ce=`
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
      v += fine * keep * amp * nNoise2(q, i32(F.w) + 101 * k) / ${B};
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
      v += (fine * keep * amp / ${B}) * vec3f(nd.x, cs * gq.x + sn * gq.y, -sn * gq.x + cs * gq.y);
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
`,le=`
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
`;function ue(e){let t=new Float32Array(1),n=new Uint32Array(t.buffer);t[0]=e;let r=n[0],i=r>>>16&32768,a=(r>>>23&255)-127+15,o=r&8388607;return a<=0?i|(a<-10?0:(o|8388608)>>>1-a+13):a>=31?i|31744:i|a<<10|o>>>13}function de({sunElDeg:e=30,haze:t=null,hazeAmt:n=null,hazeType:r=null,teal:i=.6,turbid:a=0,bottom:o=null,glint:s=1.3,cloud:m=.35,cloudType:_=.25,cloudVar:v=.4,cloudDark:S=0}={},C={}){let[w,T]=b[t]??b.Light,E=n??w,D=r??T,O=`${E.toFixed(2)},${D.toFixed(2)}`;O!==C.hazeKey&&(C.atm=g(c(E,D)),C.hazeKey=O,C.skyKey=null);let k=Math.max(-4,e)*Math.PI/180,A=`${O}|${e}`,ee=!1;A!==C.skyKey&&(C.skyKey=A,C.sky=l(C.atm,k),ee=!0);let N=C.sky,P={...y(N),sunSin:Math.sin(k)},F=N.g,te=Math.min(1,Math.max(0,(P.lightSun-.03)/.37)),ne=h.bleach[2]*te*te*(3-2*te),re={...h,bleach:[h.bleach[0],h.bleach[1],ne]},I=d(u(i,a),P,o??[.22,.19,.15]),L=(e,t=0)=>[e[0],e[1],e[2],t],R=j(m,_,v),z=Math.min(1,Math.max(0,(R.opaque-.25)/.7)),B=(1-.9*z*z*(3-2*z))*(1-.5*S),ie=e=>p(C.atm,e,k).map((e,t)=>e*P.exp[t]*.8/Math.PI);return{values:new Float32Array([...L(P.exp),...L(P.sunDisc),...L(P.sunE),...L(N.ext),F.g,F.gPeak,F.wPeak,ne,h.knee,h.sat,h.bleach[0],h.bleach[1],h.satFade[0],h.satFade[1],B,1,...L(x(P.sunCol.map(e=>e*40),re),s),...L(f(I.deep,1/h.sat)),...L(f(I.bot,1/h.sat)),...L(I.kd),...L(x(I.sss)),...L(P.skyE.map(e=>e*.85/Math.PI),1),R.low,R.mid,R.high,R.variety,R.puff,R.scale,R.base,R.opaque,R.tower,R.towers,R.anvil,R.sheet,...L(ie(M.low),1),...L(ie(M.mid),S),...L(ie(M.high)),...L(ie(M.top))]),rayleigh:N.rayleigh,mie:N.mie,tablesChanged:ee,sky:N,look:P}}var fe=class{constructor(e){this.device=e;let t=t=>e.createTexture({label:t,size:[48,48],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});this.rayleigh=t(`sky rayleigh`),this.mie=t(`sky mie`),this.values=new Float32Array(80),this.cache={},this.version=0}set(e={}){let t=de(e,this.cache);if(t.tablesChanged)for(let[e,n]of[[this.rayleigh,t.rayleigh],[this.mie,t.mie]]){let t=new Uint16Array(n.length);for(let e=0;e<n.length;e++)t[e]=ue(n[e]);this.device.queue.writeTexture({texture:e},t,{bytesPerRow:384},[48,48])}return this.values.set(t.values),this.sky=t.sky,this.look=t.look,this.version++,this}},pe=.7,V={rollerB:2.5,trailH:3,onset:.9,life:6,cover:.8,jitter:.25,jitterScale:12,drift:.15,patch:14,lead:.03,rag:.035,ragScale:5,ragFine:.25,sizeH:[.02,.08],qbMax:.98},me={shareP:.65,warpScale:.4,warp:.25,hurst:.45,fine:.06,lifeVar:.6},H={area:.6,voids:.35,lengthH:2.5,peak:.35,bulkVar:.35,bulkScale:4,twistScale:1.4,twistFine:.35,twistV:.12,twistDrift:1.3,twistRoll:.4,crashRun:4,crashXi:[.3,.6],crashSpill:.2,crashWhite:1.5,crashAhead:1.2,splash:.25,ragGeo:1.5,lean:.55,leanBore:.4,leanWin:[-.12,.05],leanRamp:.04,lump:.6,spin:.5,churnT:.7,relief:.06,edge:.05,toeRag:.012},U={front:.06,life:6,stranded:2.5,strandedKeep:.7,cell:.35,onset:.9,frontOn:.8,frontLife:1.6,frontPeak:.6,mix:1,mixScale:30},he=(e,t=U.mix)=>`
${ce}
struct SW { grid: vec4f, size: vec4f, out: vec4f, misc: vec4f, sw: vec4f, bin: array<vec4f, ${e}>, lag: array<vec4f, ${e}>, cull: array<vec4f, 7> };
@group(0) @binding(0) var<uniform> U: SW;      // grid: a0, u0, 1/cell, bins; size: nx, ny; out: a0, u0, cell, n (texels a side); misc: time, chop, gamma; sw: (unused: the setup is layer 3's), the run-up's gain at the waves' periods, at the surf beat's, the bins' sum of amp^2; bin: omega, amp, then cos and sin of (phi - omega t) (the frame's rotation); lag: e^(i omega T) and e^(2 i omega T), T the mean period (each bin's turn back to one and two crests ago)
@group(0) @binding(1) var bins: texture_2d_array<f32>;      // amp, S, ka, ku per bin
// the outputs, one texture array (one storage binding: the default limit is four a stage), its layers: 0 the height, its displacement
// (a, u) and Hs; 1 its slope (dh/da, dh/du), the edge's band, the sea's share; 2 the swash's timing; 3 the whitewater's present inputs;
// 4 the past crests'; 5 the past uprushes' sizes and the bed's slope (see textureStore below swRead)
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
  // the bed's slope across the shore here, over 4 m, times the root of the deep-water wavelength of the mean period (g Tm^2 / 2 pi), for
  // the breaker's type ( crashType: its surf similarity number this over the root of the crest's height)
  let zbO = textureSampleLevel(bedTex, bedSamp, (au + vec2f(0.0, 2.0) - B.m.xy) * B.m.z, 0.0).x;
  let zbI = textureSampleLevel(bedTex, bedSamp, (au - vec2f(0.0, 2.0) - B.m.xy) * B.m.z, 0.0).x;
  let tb = clamp(0.25 * (zbI - zbO), 0.0, 1.0) * 1.2495 * 6.2831853 / max(U.size.w, 0.05);
  // the bores' mixing (Mike, 2026-11-24: "by the time we are at the shore, mixing would have randomized things quite a lot"; "add some
  // fractal noise component to near shore to reduce the strong left-to-right behavior"): the phase of the broken waves and of their swash
  // turned by a fractal of the along-shore place and of time (its largest scale ${U.mixScale} m along the shore and two wave periods in time,
  // resolved to the texel), the same across the shore, as strong as the share of the energy that has broken: each wave's arrival scatters
  // along the beach, its statistics unchanged, and the waves and the swash they cause stay together
  var mixR = vec2f(1.0, 0.0);
  if (${t} > 0.0 && keep < 0.995) {
    let tm = t * ${U.mixScale} / (2.0 * 6.2831853 / max(U.size.w, 0.1));
    let ph = ${t} * (1.0 - keep) * nFractal2(vec2f(au.x, tm), vec4f(${U.mixScale}.0, 1.0, 0.7, 657.0), vec2f(0.0, 2.0 * U.out.z));
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
  let hthr = max(hrms * sqrt(-log(clamp(qb, 1e-4, ${V.qbMax}))), 1e-3);
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
  textureStore(outA, id.xy, 5, vec4f(select(vec3f(0.0), vec3f(length(zp1), length(zp2), length(zp3)) * rn * U.sw.y, wb > 0.0), tb));      // (the past uprushes' sizes, as the swash's E; the bed's slope times the root of L0)
  textureStore(outA, id.xy, 1, vec4f(s * cap * (1.0 - w), wb, 1.0 - w));      // (w: how much of the surface is the sea's, not the run-up's: the whitewater's share)      // (z: the band where the water's edge is found at the pixel's scale, from the swell's texture, never the mesh's facets)      // (z: the run-up's share, for the edge at the pixel's scale; w: the breaking waves' whitewater)
}`,ge=class{constructor(e,t,n,r,{n:i=512,cell:a=1,a0:o=-256,u0:s=-16,chop:c=pe,gamma:l=.78,swash:u=null,face:d=.07,mix:f=U.mix}={}){Object.assign(this,{device:e,n:i,cell:a,a0:o,u0:s,chop:c,gamma:l});let p=t.bins.length,m=t.nx,h=t.ny;this.bins=e.createTexture({label:`swell bins`,size:[m,h,p],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),t.bins.forEach((t,n)=>{let r=new Uint16Array(m*h*4);for(let e=0;e<m*h;e++){let n=t.amp[e]||0;r[4*e]=ue(n*Math.cos(t.S[e])),r[4*e+1]=ue(n*Math.sin(t.S[e])),r[4*e+2]=ue(t.ka[e]||0),r[4*e+3]=ue(t.ku[e]||0)}e.queue.writeTexture({texture:this.bins,origin:[0,0,n]},r,{bytesPerRow:m*8,rowsPerImage:h},[m,h,1])}),this.brk=e.createTexture({label:`swell breaking`,size:[m,h],format:`rgba32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let g=t.breaking??Float32Array.from({length:m*h*4},(e,t)=>+(t%4==0));e.queue.writeTexture({texture:this.brk},g,{bytesPerRow:m*16},[m,h]),this.sref=e.createTexture({label:`swell swash phase`,size:[m,p],format:`rg32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});let _=new Float32Array(2*m*p);t.bins.forEach((e,t)=>{for(let n=0;n<m;n++){let r=e.sref?e.sref[n]:0;_[2*(t*m+n)]=Math.cos(r),_[2*(t*m+n)+1]=Math.sin(r)}}),e.queue.writeTexture({texture:this.sref},_,{bytesPerRow:m*8},[m,p]),this.shp=e.createTexture({label:`swell shape`,size:[m,h],format:`rg32float`,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST}),e.queue.writeTexture({texture:this.shp},t.shape??new Float32Array(m*h*2),{bytesPerRow:m*8},[m,h]),this.out=e.createTexture({label:`swell out`,size:[i,i,6],format:`rgba16float`,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),this.U=new Float32Array(20+8*p+28),this.oCull=20+8*p,this.U.set([t.a0,t.u0,1/t.cell,p,m,h,u?u.sInc/d:0,0,o,s,a,i,0,c,l,0],0),this.U[7]=t.bins.reduce((e,t)=>e+t.a*t.a*t.omega,0)/Math.max(t.bins.reduce((e,t)=>e+t.a*t.a,0),1e-12);let v=t.bins.reduce((e,t)=>e+t.a*t.a,0),y=4*Math.sqrt(v/2);u?this.U.set([u.setup,u.sInc/y,u.sIG/4,v],16):this.U.set([0,0,0,v],16),this.binsW=t.bins.map(e=>[e.omega,e.phi]),t.bins.forEach((e,t)=>this.U.set([e.omega,e.a,1,0],20+4*t)),this.omegaMean=t.bins.reduce((e,t)=>e+t.a*t.a*t.omega,0)/Math.max(v,1e-12);let b=2*Math.PI/Math.max(this.omegaMean,.05);t.bins.forEach((e,t)=>this.U.set([Math.cos(e.omega*b),Math.sin(e.omega*b),Math.cos(2*e.omega*b),Math.sin(2*e.omega*b)],20+4*p+4*t)),this.ubuf=e.createBuffer({size:this.U.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.bbuf=e.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.bbuf,0,new Float32Array([r.a0,r.u0,1/r.size,0])),this.module=e.createShaderModule({label:`swell`,code:he(p,f)}),this.pipe=e.createComputePipeline({label:`swell`,layout:`auto`,compute:{module:this.module,entryPoint:`main`}});let x=e.createSampler({magFilter:`linear`,minFilter:`linear`});this.bg=e.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.ubuf}},{binding:1,resource:this.bins.createView({dimension:`2d-array`})},{binding:2,resource:this.out.createView({dimension:`2d-array`})},{binding:4,resource:n},{binding:5,resource:x},{binding:6,resource:{buffer:this.bbuf}},{binding:7,resource:this.brk.createView()},{binding:8,resource:this.shp.createView()},{binding:9,resource:this.sref.createView()}]})}encode(e,t,n=null){if(this.U[12]=t,n){let e=n.vp,t=t=>[e[t],e[4+t],e[8+t],e[12+t]],r=t(0),i=t(1),a=t(2),o=t(3);[o.map((e,t)=>e+r[t]),o.map((e,t)=>e-r[t]),o.map((e,t)=>e+i[t]),o.map((e,t)=>e-i[t]),o.map((e,t)=>e-a[t])].forEach((e,t)=>{let n=Math.hypot(e[0],e[1],e[2])||1;this.U.set(e.map(e=>e/n),this.oCull+4*t)}),this.U.set([n.cam[0],n.cam[1],12,1],this.oCull+20),this.U.set(n.frame,this.oCull+24)}else this.U[this.oCull+23]=0;this.binsW.forEach(([e,n],r)=>{let i=n-e*t;this.U[20+4*r+2]=Math.cos(i),this.U[20+4*r+3]=Math.sin(i)}),this.device.queue.writeBuffer(this.ubuf,0,this.U),e.setPipeline(this.pipe),e.setBindGroup(0,this.bg),e.dispatchWorkgroups(Math.ceil(this.n/8),Math.ceil(this.n/8))}get map(){return[this.a0,this.u0,1/(this.n*this.cell),1]}get wash(){return[this.omegaMean,U.front,U.life,U.stranded]}get sea(){return[4*Math.sqrt(this.U[19]/2),2*Math.PI/Math.max(this.omegaMean,.1),0,0]}},W={max:16384,_0x55e5cd:.39,kappaOff:.2,throwK:.5,spawnV:.24,cell:[.5,.25],win:[120,200],voids:.35,rub:4,spinDecay:1,float:.5,impact:1.5,life:12,minSize:.03,pile:{mix:6,press:1},flatRate:2,foam:{cell:.4,n:[640,512],life:10,share:.27,flatEnd:.04},deficit:.65,lipLift:1,burst:{n:3,up:.45,spread:.25},lod:{near:30}},_e=64,ve=H.crashSpill.toFixed(4),ye=`
struct Parcel { xm: vec4f, va: vec4f, f0: vec4f, f1: vec4f, f2: vec4f, w0: vec4f, w1: vec4f, w2: vec4f };
// xm: the centre (east, up, north), the mass (kg); va: the velocity, the age (s; < 0 none); f0..f2: F's columns (its edges, m), f0.w the
// churn, f1.w its first mass, f2.w its seed; w0: the spin (rad/s, east up north), the time it has been on the water (s); w1, w2: spare
struct PU { win: vec4f, cell: vec4f, sim: vec4f, k: vec4f, k2: vec4f };
// win: the window's middle along the shore, its offshore start and end (m), half its width; cell: da, du (m), cells along, across;
// sim: dt (s), the pool's size, 1 to clear the pool, the frame; k: kappa, spawnV, voids, the spawns' cap a frame; k2: kappaOff, -, -, -
struct Ctr { head: u32, spawned: atomic<u32>, alive: atomic<u32>, contact: atomic<u32>, volFlight: atomic<u32>, volContact: atomic<u32>, impacts: atomic<u32>, base: u32 };
@group(1) @binding(0) var<storage, read_write> pool: array<Parcel>;
@group(1) @binding(1) var<storage, read_write> ctr: Ctr;
@group(1) @binding(2) var<uniform> PP: PU;
@group(1) @binding(3) var<storage, read_write> pile: array<atomic<i32>>;      // (a column's volume (ml) and momentum along and across the shore (ml m/s), and a spare)
@group(1) @binding(4) var<storage, read_write> foam: array<atomic<u32>>;      // (a cell's foam (ml) and the place it holds (its cell along and across, 16 bits each))
const PILE_V = 1e6;      // (fixed point: ml a cubic metre, so the sums are exact and the same on every run)
const FOAM_N = vec2i(${W.foam.n[0]}, ${W.foam.n[1]});
const FOAM_C = ${W.foam.cell.toFixed(4)};
/** A point's foam cell in the field (its index), from its place in the beach's frame. */
fn foamIdx(p: vec2f) -> i32 {
  let off = F.bd[0].zw;
  let d = p - F.bd[0].xy;
  let c = vec2i(floor(vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off)) / FOAM_C));
  let w = ((c % FOAM_N) + FOAM_N) % FOAM_N;
  return 2 * (w.y * FOAM_N.x + w.x);
}
/** Foam left at p: vol m^3 of water. */
fn foamAdd(p: vec2f, vol: f32) { if (vol > 0.0) { atomicAdd(&foam[foamIdx(p)], u32(round(vol * PILE_V))); } }
fn pileIdx(ia: i32, iu: i32) -> i32 { return 4 * (clamp(iu, 0, i32(PP.cell.w) - 1) * i32(PP.cell.z) + clamp(ia, 0, i32(PP.cell.z) - 1)); }
/** A point's place in the pile's grid (cells, from the window's corner; the cells' centres at .5). */
fn pileUV(p: vec2f) -> vec2f {
  let off = F.bd[0].zw;
  let d = p - F.bd[0].xy;
  return vec2f((dot(d, vec2f(off.y, -off.x)) - (PP.win.x - PP.win.w)) / PP.cell.x, (dot(d, off) - PP.win.y) / PP.cell.y);
}
fn pileVol(ia: i32, iu: i32) -> f32 { return f32(atomicLoad(&pile[pileIdx(ia, iu)])) / PILE_V; }
struct Pile { h: f32, g: vec2f, v: vec2f };
/** The pile at p: its thickness (m: the volume over the cell's area), its slope (east, north) and its mean velocity (east, north). */
fn pileAt(p: vec2f) -> Pile {
  var o = Pile(0.0, vec2f(0.0), vec2f(0.0));
  let q = pileUV(p) - 0.5;
  if (q.x < 0.0 || q.y < 0.0 || q.x > PP.cell.z - 1.0 || q.y > PP.cell.w - 1.0) { return o; }
  let i = vec2i(floor(q));
  let f = q - floor(q);
  let A = 1.0 / (PP.cell.x * PP.cell.y);
  let v00 = pileVol(i.x, i.y); let v10 = pileVol(i.x + 1, i.y); let v01 = pileVol(i.x, i.y + 1); let v11 = pileVol(i.x + 1, i.y + 1);
  o.h = A * mix(mix(v00, v10, f.x), mix(v01, v11, f.x), f.y);
  let ga = A * mix(v10 - v00, v11 - v01, f.y) / PP.cell.x;
  let gu = A * mix(v01 - v00, v11 - v10, f.x) / PP.cell.y;
  let off = F.bd[0].zw;
  let al = vec2f(off.y, -off.x);
  o.g = ga * al + gu * off;
  let c = pileIdx(i.x + i32(f.x > 0.5), i.y + i32(f.y > 0.5));
  let vol = f32(atomicLoad(&pile[c])) / PILE_V;
  if (vol > 1e-6) { o.v = (f32(atomicLoad(&pile[c + 1])) * al + f32(atomicLoad(&pile[c + 2])) * off) / PILE_V / vol; }
  return o;
}
fn pHash(a: u32, b: u32, c: u32) -> f32 {
  var h = (a * 73856093u) ^ (b * 19349663u) ^ (c * 83492791u);
  h = (h ^ (h >> 13u)) * 1274126177u;
  h = h ^ (h >> 16u);
  return f32(h) / 4294967295.0;
}
/** The water's particle velocity at the surface at p (east, up, north) and the crests' speed (east, north), from the swell (linear: a
 *  surface at eta moves at eta omega coth(k d) along the waves, and a wave of fixed form moves up at -c . grad eta), for the waves running
 *  shoreward (the crests' own direction is R3's). */
struct Water { h: f32, n: vec3f, u: vec3f, c: vec2f, carry: f32 };
fn waterAt(p: vec2f) -> Water {
  var o = Water(0.0, vec3f(0.0, 1.0, 0.0), vec3f(0.0), vec2f(0.0), 0.0);
  let S = swellAt(p);
  o.h = S.x - ${W.deficit.toFixed(4)} * pileAt(p).h;      // (less the water the crest lost to the parcels on it, as the drawn surface: parcelDeficit)
  let sl = swellSlope(p);
  o.n = normalize(vec3f(-sl.x, 1.0, -sl.y));
  if (!swellOn()) { return o; }
  let q = swellUV(p);
  if (q.z <= 0.0) { return o; }
  let k = max(swRead(q.xy, 4).w, 0.01);
  let d = max(-bedY(p), 0.02);
  let th = tanh(k * d);
  let om = sqrt(9.81 * k * th);
  let kd = -F.bd[0].zw;      // (shoreward)
  o.c = kd * (om / k);
  let uh = kd * (S.x * om / th);
  // (on a breaking crest's front face the surface water runs at about the crest's own speed, which is what breaking is (its crest's
  // particles as fast as the crest): there a parcel on the water is carried with the crest, a roller riding the bore; behind the crest, or
  // where the waves do not break, the linear particle velocity: the share breaking (layer 3) times how much the face falls shoreward)
  // (only over the roller's length ahead of the crest, ROLLER.lengthH of its height, the height taken as 0.6 of the depth (a broken wave's
  // between 0.78 and 0.4 of it): over the whole front face the parcels spread across half a wavelength, 20 m at r1-big-spill, 2026-11-27)
  let B3 = swRead(q.xy, 3);
  let ahead = (1.0 - surfPhase0(B3)) * 6.2831853 / k;      // (m to the coming crest)
  let rl = ${H.lengthH.toFixed(4)} * 0.6 * d;
  o.carry = B3.w * smoothstep(-0.03, 0.08, -dot(sl, kd)) * (1.0 - smoothstep(0.7 * rl, rl, ahead));      // (from the crest's top over the roller's length)
  o.u = vec3f(mix(uh, o.c, o.carry).x, -dot(o.c, sl), mix(uh, o.c, o.carry).y);
  return o;
}
@compute @workgroup_size(1) fn pBegin() {
  ctr.base = ctr.head;
  atomicStore(&ctr.spawned, 0u); atomicStore(&ctr.alive, 0u); atomicStore(&ctr.contact, 0u);
  atomicStore(&ctr.volFlight, 0u); atomicStore(&ctr.volContact, 0u); atomicStore(&ctr.impacts, 0u);
}
@compute @workgroup_size(64) fn pClear(@builtin(global_invocation_id) id: vec3u) {
  if (f32(id.x) >= 4.0 * PP.cell.z * PP.cell.w) { return; }
  atomicStore(&pile[id.x], 0);
}
// the foam's fade, and the cells the window has moved on to cleared: each cell holds the one place in the window (the parcels' window, its
// along-shore cells from floor((middle - half width) / cell), its cross-shore ones from floor(start / cell)) that wraps onto it
@compute @workgroup_size(8, 8) fn pFoam(@builtin(global_invocation_id) id: vec3u) {
  let w = vec2i(id.xy);
  if (w.x >= FOAM_N.x || w.y >= FOAM_N.y) { return; }
  let lo = vec2i(floor(vec2f(PP.win.x - PP.win.w, PP.win.y) / FOAM_C));
  let c = lo + (((w - lo) % FOAM_N) + FOAM_N) % FOAM_N;      // (the place in the window on this cell)
  let tag = (u32(c.x) & 0xffffu) | ((u32(c.y) & 0xffffu) << 16u);
  let i = 2 * (w.y * FOAM_N.x + w.x);
  if (atomicLoad(&foam[i + 1]) != tag) { atomicStore(&foam[i], 0u); atomicStore(&foam[i + 1], tag); return; }
  if (PP.sim.x > 0.0) { atomicStore(&foam[i], u32(f32(atomicLoad(&foam[i])) * exp(-PP.sim.x / ${W.foam.life.toFixed(4)}))); }
}
// each parcel's volume and momentum into the pile's grid, spread over its four nearest columns
@compute @workgroup_size(${_e}) fn pSplat(@builtin(global_invocation_id) id: vec3u) {
  if (f32(id.x) >= PP.sim.y) { return; }
  let P = pool[id.x];
  if (P.va.w < 0.0) { return; }
  let q = pileUV(P.xm.xz) - 0.5;
  if (q.x < 0.0 || q.y < 0.0 || q.x > PP.cell.z - 1.0 || q.y > PP.cell.w - 1.0) { return; }
  let i = vec2i(floor(q));
  let f = q - floor(q);
  // (a parcel wider than a column adds only its own thickness there, not all its volume: a big parcel shed far off by the LOD put metres
  // of pile into one column, so a hole in the water under it and pressures that threw parcels about, 2026-11-27)
  let s0 = pow(max(abs(dot(P.f0.xyz, cross(P.f1.xyz, P.f2.xyz))), 1e-9), 1.0 / 3.0);
  let vol = P.xm.w / (1000.0 * (1.0 - PP.k.z)) * min(1.0, PP.cell.x * PP.cell.y / (s0 * s0));
  let off = F.bd[0].zw;
  let va = dot(P.va.xz, vec2f(off.y, -off.x));
  let vu = dot(P.va.xz, off);
  let w = array<f32, 4>((1.0 - f.x) * (1.0 - f.y), f.x * (1.0 - f.y), (1.0 - f.x) * f.y, f.x * f.y);
  let o = array<vec2i, 4>(vec2i(0, 0), vec2i(1, 0), vec2i(0, 1), vec2i(1, 1));
  for (var k = 0; k < 4; k++) {
    let c = pileIdx(i.x + o[k].x, i.y + o[k].y);
    let dv = vol * w[k] * PILE_V;
    atomicAdd(&pile[c], i32(round(dv)));
    atomicAdd(&pile[c + 1], i32(round(dv * va)));
    atomicAdd(&pile[c + 2], i32(round(dv * vu)));
  }
}
// the detector: a cell where a crest has just passed (in the last step) with its linear kinematic ratio over kappa sheds a parcel
@compute @workgroup_size(8, 8) fn pSpawn(@builtin(global_invocation_id) id: vec3u) {
  if (f32(id.x) >= PP.cell.z || f32(id.y) >= PP.cell.w || PP.sim.x <= 0.0 || PP.sim.z > 0.5 || !swellOn()) { return; }
  let a = PP.win.x - PP.win.w + (f32(id.x) + 0.5) * PP.cell.x;
  let u = PP.win.y + (f32(id.y) + 0.5) * PP.cell.y;
  let off = F.bd[0].zw;
  let al = vec2f(off.y, -off.x);
  let p = F.bd[0].xy + a * al + u * off;
  let q = swellUV(p);
  if (q.z < 0.5) { return; }
  let B = swRead(q.xy, 3);
  if (dot(B.yz, B.yz) < 1e-10) { return; }
  let k = max(swRead(q.xy, 4).w, 0.01);
  // the crest passed within the last step: its phase since the crest under the share of a period the step is (the period from the mean
  // frequency first, a cheap test before the bed's read)
  let x0 = surfPhase0(B);
  if (x0 > 2.0 * PP.sim.x * F.wash.x / 6.2831853) { return; }
  let d = -bedY(p);
  if (d < 0.03 || swRead(q.xy, 1).w < 0.5) { return; }      // (none on the run-up's sheet)
  let th = tanh(k * d);
  let om = sqrt(9.81 * k * th);
  if (x0 > PP.sim.x * om / 6.2831853) { return; }
  let S = swellAt(p);
  let eta = S.x;
  // (onset past kappa; once broken, a bore keeps breaking down to kappaOff, at the field's share breaking (layer 3's Qb, 1 in a regular
  // train's surf zone): a bore's crest in linear terms is well under the onset's)
  let beta = eta * k / th;
  if (beta < PP.k2.x || (beta < PP.k.x && pHash(id.x, id.y, u32(PP.sim.w) + 3u) >= B.w)) { return; }
  // its size: the share of the roller it renews, spawnV H da du (H taken as twice the crest's height), its air voids of it
  let H = max(2.0 * eta, 0.02);
  // (the LOD: past lod.near m from the eye a cell sheds a parcel only (lod.near / distance)^2 of the times, that many times bigger, so the
  // pool's parcels go where they are seen up close and the window can be wide; the water shed and the foam left are the same on average)
  let De = length(vec3f(p.x - F.cam.x, F.cam.y, p.y - F.cam.z));
  let keep = min(1.0, pow(${W.lod.near.toFixed(4)} / max(De, 1.0), 2.0));
  if (pHash(id.x, id.y, u32(PP.sim.w) + 29u) >= keep) { return; }
  let V = PP.k.y * H * PP.cell.x * PP.cell.y / keep;
  let s = pow(V, 1.0 / 3.0);
  let n = atomicAdd(&ctr.spawned, 1u);
  if (f32(n) >= PP.k.w) { return; }
  let slot = (ctr.base + n) % u32(PP.sim.y);
  let fr = u32(PP.sim.w);
  let j = vec2f(pHash(id.x, id.y, fr) - 0.5, pHash(id.y, id.x, fr + 7u) - 0.5);
  let pp = p + (j.x * PP.cell.x) * al + (j.y * PP.cell.y - 0.25 * H) * off + S.yz;      // (just ahead of the crest, on its upper front face)
  // (the crests' speed; a fresh break's lip thrown faster, by its breaker type (crashType: 0 for a gentle slope's spilling, 1 a steep
  // face's plunging), so it runs ahead of the crest and falls on the water in front; a bore's parcels at the crest's speed)
  let fresh = beta >= PP.k.x;
  let plunge = select(0.0, (crashType(swRead(q.xy, 5).w, H) - ${ve}) / (1.0 - ${ve}), fresh);
  let c = -off * (om / k) * (1.0 + ${W.throwK} * plunge);
  let m = 1000.0 * V * (1.0 - PP.k.z);
  var P: Parcel;
  // (a plunging break's lip leaves from the crest's top above the face, clear of the water, so it flies; a spilling one's water starts on
  // the crest)
  // (a spilling one's on the water where it is put, just ahead of the crest and below its top: put at the crest's height it fell for 0.15
  // to 0.25 s first, 2026-11-27)
  let y0 = select(swellAt(pp).x + 0.5 * s * (1.0 - ${W.float.toFixed(4)}), eta + s * (0.5 + ${W.lipLift.toFixed(4)} * plunge), plunge > 0.05);
  P.xm = vec4f(pp.x, y0, pp.y, m);
  P.va = vec4f(c.x, 0.0, c.y, 0.0);
  P.f0 = vec4f(s * al.x, 0.0, s * al.y, 0.0);
  P.f1 = vec4f(0.0, s, 0.0, m);
  P.f2 = vec4f(s * off.x, 0.0, s * off.y, pHash(id.x, id.y, fr + 13u));
  P.w0 = vec4f(0.0);
  // (its water dissolving on the water over the roller's renewal: its length, ROLLER.lengthH H, at the crest's speed, so a riding
  // roller holds about the roller's volume, ROLLER.area H^2; what is left behind is the foam's)
  P.w1 = vec4f(0.0, clamp(${H.lengthH} * H / max(om / k, 0.3), 0.3, 3.0), keep, 0.0);      // (z: the LOD's share it was shed at)
  P.w2 = vec4f(0.0, 0.0, 0.0, select(0.0, 1.0, plunge > 0.05));      // (w: a plunging lip's water, the only kind that bursts on landing)
  pool[slot] = P;
}
@compute @workgroup_size(${_e}) fn pStep(@builtin(global_invocation_id) id: vec3u) {
  let i = id.x;
  if (f32(i) >= PP.sim.y) { return; }
  var P = pool[i];
  if (PP.sim.z > 0.5) { pool[i].va.w = -1.0; return; }
  if (P.va.w < 0.0) { return; }
  let dt = PP.sim.x;
  var x = P.xm.xyz;
  var v = P.va.xyz;
  var m = P.xm.w;
  var W = P.w0;
  // (its size: the cube root of its volume, det F; its half height: the ellipsoid's reach up, half the columns' vertical parts' length)
  let s0 = pow(max(abs(dot(P.f0.xyz, cross(P.f1.xyz, P.f2.xyz))), 1e-9), 1.0 / 3.0);
  let hh = 0.5 * length(vec3f(P.f0.y, P.f1.y, P.f2.y));
  var flat = 0.0;
  var diag = vec4f(0.0, 0.0, 0.0, P.w2.w);      // (for a probe's dump, in w2: the flattening's gate, the water's carry, how far it rests on the pile; w the lip's flag, kept)
  if (dt > 0.0) {
    let wa = waterAt(x.xz);
    var a = vec3f(0.0, -9.81, 0.0);
    // (resting on the pile in its column, at its own place in the pile's depth (its seed), less its own size)
    let pl = pileAt(x.xz);
    let lift = P.f2.w * max(pl.h - s0, 0.0);
    let pen = wa.h + lift - (x.y - hh);
    var spin = W.xyz;
    if (pen > 0.0) {
      // on the water or the pile: its push out (the slip into it stopped), its rub (the slip along it taken off at the rub's rate) toward
      // the water's velocity, or toward the pile's where it rests on parcels; the pile's push from thick to thin; the turn the rub gives
      // about the parcel's centre; its water dissolving
      let onPile = smoothstep(0.0, s0, lift);
      let uRest = mix(wa.u, vec3f(pl.v.x, wa.u.y, pl.v.y), onPile);
      a += vec3f(-9.81 * ${W.pile.press.toFixed(4)} * pl.g.x, 0.0, -9.81 * ${W.pile.press.toFixed(4)} * pl.g.y);
      let rel = v - uRest;
      let vn = dot(rel, wa.n);
      // (a landing from the air, hard: after a flight of at least 0.15 s, so a parcel that skips off the rising face of a spilling crest
      // for a step or two does not count, and burst, 150 to 570 a frame at r1-big-spill, 2026-11-27)
      let hard = P.w1.w > 0.15 && -vn > ${W.impact};
      if (hard) { atomicAdd(&ctr.impacts, 1u); }
      if (vn < 0.0) { v -= vn * wa.n; }
      // a hard landing bursts (R1d): the parcel splits in burst.n, thrown back up off the water at burst.up of its landing speed, spread
      // sideways by burst.spread of it, the momentum along the water kept; the pieces are new parcels from the pool's ring, this one the
      // first of them; foam left where it hit
      if (hard && P.w2.w > 0.5 && m > 4.0 * ${W.minSize} * ${W.minSize} * ${W.minSize} * 1000.0) {
        let nb = ${W.burst.n}u;
        let sp = -vn;
        m = m / f32(nb);
        foamAdd(x.xz, ${W.foam.share.toFixed(4)} * m / (1000.0 * (1.0 - PP.k.z)));
        let sc = pow(1.0 / f32(nb), 1.0 / 3.0);
        for (var b = 1u; b < nb; b++) {
          let n = atomicAdd(&ctr.spawned, 1u);
          if (f32(n) >= PP.k.w) { break; }
          let slot = (ctr.base + n) % u32(PP.sim.y);
          let hb = vec3f(pHash(i, b, u32(PP.sim.w)), pHash(b, i, u32(PP.sim.w) + 5u), pHash(i + b, 3u, u32(PP.sim.w))) - 0.5;
          var Q = P;
          Q.xm = vec4f(x + 0.3 * s0 * hb, m);
          Q.va = vec4f(v + wa.n * (${W.burst.up.toFixed(4)} * sp * (0.6 + 0.8 * hb.y + 0.4)) + vec3f(hb.x, 0.0, hb.z) * (2.0 * ${W.burst.spread.toFixed(4)} * sp), 0.0);
          Q.f0 = vec4f(P.f0.xyz * sc, P.f0.w); Q.f1 = vec4f(P.f1.xyz * sc, m); Q.f2 = vec4f(P.f2.xyz * sc, fract(P.f2.w + 0.37 * f32(b)));
          Q.w0 = vec4f(0.0); Q.w1 = vec4f(0.0, P.w1.y, 0.0, 0.0); Q.w2 = vec4f(0.0);      // (the pieces do not burst again)
          pool[slot] = Q;
        }
        v += wa.n * (${W.burst.up.toFixed(4)} * sp * 0.5);
        P.f1 = vec4f(P.f1.xyz, m);
        diag.w = 0.0;      // (its first mass now its share: the shape's step below sizes it from that once)
      }
      x.y += max(pen - ${W.float} * 2.0 * hh, 0.0);
      // (on the water or the pile behind the roller, where the water does not carry it: foam spreading out over the water, flattened at
      // flatRate; gated by the pile too, the trail's parcels piled up and never spread, and the pool filled with them)
      flat = (1.0 - wa.carry) * smoothstep(0.03, 0.15, hh);
      diag = vec4f(flat, wa.carry, onPile, P.w2.w);
      let vt = rel - vn * wa.n;
      let dv = vt * (1.0 - exp(-mix(${W.rub.toFixed(4)}, ${W.pile.mix.toFixed(4)}, onPile) * dt));
      v -= dv;
      // (the rub's impulse m dv at the contact, half the size below the centre along -n: its moment over a cube's inertia m s^2 / 6)
      spin += cross(-0.5 * s0 * wa.n, -dv) * (6.0 / (s0 * s0));
      let m1 = m * exp(-dt / max(P.w1.y, 0.1));
      foamAdd(x.xz, ${W.foam.share.toFixed(4)} * (m - m1) / (1000.0 * (1.0 - PP.k.z)));
      m = m1;
      W.w += dt;
    }
    // (the LOD the other way: a big parcel shed far off and now near the eye, more than twice the size the eye's distance calls for, splits
    // in two along its first edge, each half its water, so a paddler near the roller does not meet lumps metres across)
    let Dn = length(vec3f(x.x - F.cam.x, x.y - F.cam.y, x.z - F.cam.z));
    let kNow = min(1.0, pow(${W.lod.near.toFixed(4)} / max(Dn, 1.0), 2.0));
    if (P.w1.z > 0.0 && kNow > 2.0 * P.w1.z) {
      let n = atomicAdd(&ctr.spawned, 1u);
      if (f32(n) < PP.k.w) {
        let slot = (ctr.base + n) % u32(PP.sim.y);
        m = 0.5 * m;
        let sc = pow(0.5, 1.0 / 3.0);
        var Q = P;
        Q.xm = vec4f(x + 0.3 * P.f0.xyz, m);
        Q.va = vec4f(v, P.va.w);
        Q.f0 = vec4f(P.f0.xyz * sc, P.f0.w); Q.f1 = vec4f(P.f1.xyz * sc, m); Q.f2 = vec4f(P.f2.xyz * sc, fract(P.f2.w + 0.61));
        Q.w1 = vec4f(P.w1.xy, 2.0 * P.w1.z, P.w1.w);
        pool[slot] = Q;
        x -= 0.3 * P.f0.xyz;
        P.f1 = vec4f(P.f1.xyz, m);
        P.w1.z = 2.0 * P.w1.z;
      }
    }
    spin *= exp(-dt / ${W.spinDecay});
    v += a * dt;
    x += v * dt;
    // its shape: turned by the spin, sized by its mass (its air share kept)
    let sc = pow(m / max(P.f1.w, 1e-6), 1.0 / 3.0);
    let s1 = pow(P.f1.w / (1000.0 * (1.0 - PP.k.z)), 1.0 / 3.0) * sc;
    let ang = length(spin) * dt;
    var f0 = P.f0.xyz; var f1 = P.f1.xyz; var f2 = P.f2.xyz;
    if (ang > 1e-6) {
      let ax = spin / length(spin);
      let ca = cos(ang); let sa = sin(ang);
      f0 = f0 * ca + cross(ax, f0) * sa + ax * dot(ax, f0) * (1.0 - ca);
      f1 = f1 * ca + cross(ax, f1) * sa + ax * dot(ax, f1) * (1.0 - ca);
      f2 = f2 * ca + cross(ax, f2) * sa + ax * dot(ax, f2) * (1.0 - ca);
    }
    // (flattened: wider by e^e and thinner by e^-2e, its volume kept)
    let e = ${W.flatRate.toFixed(4)} * flat * dt;
    let wide = vec3f(exp(e), exp(-2.0 * e), exp(e));
    f0 *= wide; f1 *= wide; f2 *= wide;
    let r = s1 / max(s0, 1e-6);
    P.f0 = vec4f(f0 * r, P.f0.w); P.f1 = vec4f(f1 * r, P.f1.w); P.f2 = vec4f(f2 * r, P.f2.w);
    W = vec4f(spin, W.w);
    P.w1.x = select(0.0, 1.0, pen > 0.0);      // (on the water this step)
    // (how long it has been in the air: a gap under it of less than half its height counts as resting, as the pile's thickness under a
    // parcel moves a little from step to step)
    P.w1.w = select(P.w1.w + dt, 0.0, pen > -hh);
    var age = P.va.w + dt;
    // (gone when old, small or into the bed; spread out flat on the water it is left as foam)
    // (and once its height is a quarter of its size: a big parcel far off spread into a thin sheet metres across, drawn as speckled
    // squares, 2026-11-27)
    let spread = flat > 0.0 && hh < max(${W.foam.flatEnd.toFixed(4)}, 0.25 * s0);
    if (spread) { foamAdd(x.xz, m / (1000.0 * (1.0 - PP.k.z))); }
    if (age > ${W.life} || s1 < ${W.minSize} || x.y < bedY(x.xz) - 0.2 || spread) { age = -1.0; }
    P.xm = vec4f(x, m);
    P.va = vec4f(v, age);
    P.w0 = W;
    P.w2 = diag;
    pool[i] = P;
    if (age < 0.0) { return; }
  }
  atomicAdd(&ctr.alive, 1u);
  let vl = u32(1e4 * m / (1000.0 * (1.0 - PP.k.z)));      // (its volume, 0.1 l)
  if (W.w > 0.0) { atomicAdd(&ctr.contact, 1u); atomicAdd(&ctr.volContact, vl); } else { atomicAdd(&ctr.volFlight, vl); }
}
@compute @workgroup_size(1) fn pEnd() {
  ctr.head = (ctr.base + min(atomicLoad(&ctr.spawned), u32(PP.k.w))) % u32(PP.sim.y);
}
`,be=`
struct PU { win: vec4f, cell: vec4f, sim: vec4f, k: vec4f, k2: vec4f };
@group(0) @binding(0) var<storage, read> foam: array<u32>;
@group(0) @binding(1) var foamOut: texture_storage_2d<rgba16float, write>;
@group(0) @binding(2) var<storage, read> pile: array<i32>;
@group(0) @binding(3) var<uniform> PP: PU;
@compute @workgroup_size(8, 8) fn pFoamOut(@builtin(global_invocation_id) id: vec3u) {
  let n = vec2i(${W.foam.n[0]}, ${W.foam.n[1]});
  let w = vec2i(id.xy);
  if (w.x >= n.x || w.y >= n.y) { return; }
  let C = ${W.foam.cell.toFixed(4)};
  let v = f32(foam[2 * (w.y * n.x + w.x)]) * 1e-6 / (C * C);
  // (and the pile's thickness here (m), for the water the crests have lost to their rollers: the place in the window on this texel, as
  // pFoam finds it, then its column in the pile's grid)
  let lo = vec2i(floor(vec2f(PP.win.x - PP.win.w, PP.win.y) / C));
  let c = lo + (((w - lo) % n) + n) % n;
  let au = (vec2f(c) + 0.5) * C;
  let g = vec2i(floor(vec2f((au.x - (PP.win.x - PP.win.w)) / PP.cell.x, (au.y - PP.win.y) / PP.cell.y)));
  var hp = 0.0;
  if (g.x >= 0 && g.y >= 0 && f32(g.x) < PP.cell.z && f32(g.y) < PP.cell.w) { hp = f32(pile[4 * (g.y * i32(PP.cell.z) + g.x)]) * 1e-6 / (PP.cell.x * PP.cell.y); }
  textureStore(foamOut, w, vec4f(v, hp, 0.0, 0.0));
}
`,xe=`
struct Parcel { xm: vec4f, va: vec4f, f0: vec4f, f1: vec4f, f2: vec4f, w0: vec4f, w1: vec4f, w2: vec4f };
@group(2) @binding(0) var<storage, read> pool: array<Parcel>;
fn h3(p: vec3i, s: u32) -> f32 {
var h = (u32(p.x) * 73856093u) ^ (u32(p.y) * 19349663u) ^ (u32(p.z) * 83492791u) ^ (s * 2654435761u);
h = (h ^ (h >> 13u)) * 1274126177u;
h = h ^ (h >> 16u);
return f32(h) / 4294967295.0;
}
fn vn3(p: vec3f, s: u32) -> f32 {
let i = vec3i(floor(p));
let f = p - floor(p);
let u = f * f * (3.0 - 2.0 * f);
let a = mix(mix(h3(i, s), h3(i + vec3i(1, 0, 0), s), u.x), mix(h3(i + vec3i(0, 1, 0), s), h3(i + vec3i(1, 1, 0), s), u.x), u.y);
let b = mix(mix(h3(i + vec3i(0, 0, 1), s), h3(i + vec3i(1, 0, 1), s), u.x), mix(h3(i + vec3i(0, 1, 1), s), h3(i + vec3i(1, 1, 1), s), u.x), u.y);
return mix(a, b, u.z);
}
fn fbm3(p: vec3f, s: u32) -> f32 { return (vn3(p, s) - 0.5) * 0.57 + (vn3(2.03 * p, s + 1u) - 0.5) * 0.29 + (vn3(4.1 * p, s + 2u) - 0.5) * 0.14; }
fn inv3(m: mat3x3f) -> mat3x3f {
let a = m[0]; let b = m[1]; let c = m[2];
let r0 = cross(b, c); let r1 = cross(c, a); let r2 = cross(a, b);
let det = dot(a, r0);
return transpose(mat3x3f(r0, r1, r2)) * (1.0 / det);
}
const P_GROW = 1.35;
struct PO { @builtin(position) pos: vec4f, @location(0) @interpolate(flat) id: u32, @location(1) ray: vec3f };
@vertex fn pvs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> PO {
let P = pool[ii];
var o: PO;
o.id = ii;
o.ray = vec3f(0.0);
if (P.va.w < 0.0) { o.pos = vec4f(2.0, 2.0, 0.5, 1.0); return o; }
let c = vec3f(P.xm.x - F.cam.x, P.xm.y, -(P.xm.z - F.cam.z));
let R = 0.5 * P_GROW * sqrt(dot(P.f0.xyz, P.f0.xyz) + dot(P.f1.xyz, P.f1.xyz) + dot(P.f2.xyz, P.f2.xyz));
let eye = vec3f(0.0, F.cam.y, 0.0);
let toC = c - eye;
let D = length(toC);
let fw = toC / max(D, 1e-4);
let rt = normalize(cross(fw, vec3f(0.0, 1.0, 0.0)) + vec3f(1e-5, 0.0, 0.0));
let up = cross(rt, fw);
var corner = array<vec2f, 6>(vec2f(-1.0, -1.0), vec2f(1.0, -1.0), vec2f(1.0, 1.0), vec2f(-1.0, -1.0), vec2f(1.0, 1.0), vec2f(-1.0, 1.0));
let qv = corner[vi];
let Rs = R * D / sqrt(max(D * D - R * R, 1e-4));
let wp = c + (rt * qv.x + up * qv.y) * min(Rs, 4.0 * R + 1.0);
o.pos = F.viewProj * vec4f(wp, 1.0);
o.ray = wp - eye;
return o;
}
struct PF { @location(0) col: vec4f, @builtin(frag_depth) depth: f32 };
@fragment fn pfs(i: PO) -> PF {
let P = pool[i.id];
let eye = vec3f(0.0, F.cam.y, 0.0);
let c = vec3f(P.xm.x - F.cam.x, P.xm.y, -(P.xm.z - F.cam.z));
let rd = normalize(i.ray);
let toR = vec3f(1.0, 1.0, -1.0);
let Fm = mat3x3f(P.f0.xyz * toR, P.f1.xyz * toR, P.f2.xyz * toR) * 0.5;
let Fi = inv3(Fm);
let o = Fi * (eye - c);
let d = Fi * rd;
let A = dot(d, d);
let Bq = dot(o, d);
let Cq = dot(o, o) - P_GROW * P_GROW;
let disc = Bq * Bq - A * Cq;
if (disc <= 0.0) { discard; }
let sq = sqrt(disc);
let t0 = max((-Bq - sq) / A, 0.0);
let t1 = (-Bq + sq) / A;
if (t1 <= t0) { discard; }
let seed = u32(P.f2.w * 65535.0);
let boil = vec3f(0.0, -0.9 * P.va.w, 0.4 * P.va.w);
let teach = (u32(F.rip2.w) & 8388608u) != 0u;
let amp = select(0.55, 0.0, teach);
var t = t0;
var hit = false;
let nS = 10;
let dtm = (t1 - t0) / f32(nS);
var X = o + t * d;
for (var k = 0; k < nS; k++) {
X = o + t * d;
if (1.0 - dot(X, X) + amp * fbm3(1.6 * X + boil, seed) > 0.0) { hit = true; break; }
t += dtm;
}
if (!hit) { discard; }
var ta = max(t - dtm, t0);
var tb = t;
for (var k = 0; k < 4; k++) {
let tm = 0.5 * (ta + tb);
let Xm = o + tm * d;
if (1.0 - dot(Xm, Xm) + amp * fbm3(1.6 * Xm + boil, seed) > 0.0) { tb = tm; } else { ta = tm; }
}
X = o + tb * d;
let e = 0.04;
let g0 = amp * fbm3(1.6 * X + boil, seed);
let gN = vec3f(amp * fbm3(1.6 * (X + vec3f(e, 0.0, 0.0)) + boil, seed) - g0, amp * fbm3(1.6 * (X + vec3f(0.0, e, 0.0)) + boil, seed) - g0, amp * fbm3(1.6 * (X + vec3f(0.0, 0.0, e)) + boil, seed) - g0) / e;
let nX = -2.0 * X + gN;
let n = normalize(transpose(Fi) * (-nX));
let wp = eye + tb * rd;
let dist = length(wp - eye);
var out: PF;
out.depth = 0.05 / max(dot(wp - eye, F.camF.xyz), 1e-4);
let sunVis = F.lk[6].z * F.lk[6].w;
let ndl = dot(n, F.sun.xyz);
let litR = (0.70 + 0.40 * sunVis * clamp((ndl + 0.4) / 1.4, 0.0, 1.0)) * (0.9 + 0.1 * n.y);
var col = mix(vec3f(0.84, 0.90, 1.0), vec3f(0.97, 0.98, 0.98), smoothstep(0.75, 1.05, litR)) * litR;
if (teach) { col *= select(vec3f(1.0), vec3f(0.95, 0.35, 0.15), (X.x > 0.0) != (X.z > 0.0)); }
if (underwater()) { col = underMix(col * 0.8, rd, dist); }
else { col = mix(col, skyMap(normalize(vec3f(rd.x, 0.012, rd.z))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0))); }
out.col = present(col);
return out;
}
@group(3) @binding(0) var sceneDepth: texture_depth_2d;
@group(3) @binding(1) var nearest: texture_2d<f32>;
struct Hit { ok: bool, t0: f32, t1: f32, X: vec3f, r: f32, w: f32, n: vec3f };
fn parcelHit(P: Parcel, rd: vec3f, px: vec2i, wantN: bool) -> Hit {
var h = Hit(false, 0.0, 0.0, vec3f(0.0), 1.0, 0.0, vec3f(0.0, 1.0, 0.0));
let eye = vec3f(0.0, F.cam.y, 0.0);
let c = vec3f(P.xm.x - F.cam.x, P.xm.y, -(P.xm.z - F.cam.z));
let toR = vec3f(1.0, 1.0, -1.0);
let Fi = inv3(mat3x3f(P.f0.xyz * toR, P.f1.xyz * toR, P.f2.xyz * toR) * 0.5);
let o = Fi * (eye - c);
let d = Fi * rd;
let A = dot(d, d);
let Bq = dot(o, d);
let seed = u32(P.f2.w * 65535.0);
let boil = vec3f(0.0, -0.9 * P.va.w, 0.4 * P.va.w);
let o2 = dot(o, o);
var disc = Bq * Bq - A * (o2 - 1.0);
var X = o - (Bq / A) * d;
if (disc > 0.0) { X = o + ((-Bq - sqrt(disc)) / A) * d; }
var r = 1.0;
for (var it = 0; it < 2; it++) {
r = 1.0 + 0.45 * fbm3(1.6 * X + boil, seed) + 0.12 * fbm3(6.0 * X + 2.0 * boil, seed + 17u);
disc = Bq * Bq - A * (o2 - r * r);
if (disc <= 0.0) { return h; }
X = o + ((-Bq - sqrt(disc)) / A) * d;
}
let sq = sqrt(disc);
h.t0 = max((-Bq - sq) / A, 0.0);
h.t1 = (-Bq + sq) / A;
let zs = textureLoad(sceneDepth, px, 0);
if (zs > 0.0) { h.t1 = min(h.t1, 0.05 / zs / max(dot(rd, F.camF.xyz), 1e-4)); }
h.ok = h.t1 > h.t0;
h.X = X;
h.r = r;
let rc2 = max(o2 - Bq * Bq / A, 0.0) / (r * r);
h.w = (1.0 - rc2) * (1.0 - rc2);
if (wantN) {
let e = 0.05;
let g0 = fbm3(1.6 * X + boil, seed);
let gr = 0.45 * 1.6 * vec3f(fbm3(1.6 * (X + vec3f(e, 0.0, 0.0)) + boil, seed) - g0, fbm3(1.6 * (X + vec3f(0.0, e, 0.0)) + boil, seed) - g0, fbm3(1.6 * (X + vec3f(0.0, 0.0, e)) + boil, seed) - g0) / (1.6 * e);
h.n = normalize(transpose(Fi) * (X - r * gr));
}
return h;
}
@fragment fn psplat(i: PO) -> @location(0) vec4f {
let H = parcelHit(pool[i.id], normalize(i.ray), vec2i(i.pos.xy), false);
if (!H.ok) { discard; }
return vec4f(H.t0, H.t0, H.t0, H.t1 - H.t0);
}
const SSF_NEAR = 0.12;
@fragment fn pnorm(i: PO) -> @location(0) vec4f {
let q = vec2i(i.pos.xy);
let tn = textureLoad(nearest, q, 0).x;
let H = parcelHit(pool[i.id], normalize(i.ray), q, true);
if (!H.ok || H.t0 > tn + SSF_NEAR) { discard; }
let w = H.w * (1.0 - (H.t0 - tn) / SSF_NEAR) + 1e-4;
return vec4f(H.n * w, w);
}
`,Se=`
@group(2) @binding(0) var blob: texture_2d<f32>;
@group(2) @binding(1) var blobN: texture_2d<f32>;      // (the parcels' normals blended near the nearest surface: pnorm)
const SSF_R = 0.04;      // (m: the spacing the body's normal is taken over: finer shows the fractal's lumps, coarser flat facets)
const SSF_EDGE = vec2f(0.005, 0.06);      // (the thickness, m, from no body to an opaque one)
const SSF_FAR = 60000.0;      // (no parcel: the target's clear value)
fn ssfAt(q: vec2i) -> vec4f { return textureLoad(blob, clamp(q, vec2i(0), vec2i(textureDimensions(blob)) - 1), 0); }
@vertex fn cvs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
fn rayAt(px: vec2f) -> vec3f {
  let ndc = vec2f(2.0 * px.x * F.screen.z - 1.0, 1.0 - 2.0 * px.y * F.screen.w);
  return normalize(F.camF.xyz + ndc.x * F.camR.xyz + ndc.y * F.camU.xyz);
}
@fragment fn cfs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
  let q = vec2i(pos.xy);
  let a = ssfAt(q);
  if ((u32(F.rip2.w) & 33554432u) != 0u) { return vec4f(clamp(a.w * 4.0, 0.0, 1.0), clamp(a.w * 40.0, 0.0, 1.0), select(0.0, 1.0, a.w > 0.0), 1.0); }      // (debug 33554432: the body's thickness, red x 4, green x 40, blue where any)
  if (a.w < SSF_EDGE.x || a.x >= SSF_FAR) { discard; }
  let rd = rayAt(pos.xy);
  let dist = a.x;
  let P0 = rd * dist;
  // the neighbours SSF_R m away on the screen (1 to 16 pixels), each side; where one is off the body or far behind (an edge), the other
  let pixM = dist * 2.0 * length(F.camU.xyz) * F.screen.w / max(dot(rd, F.camF.xyz), 0.2);
  let k = i32(clamp(SSF_R / max(pixM, 1e-5), 1.0, 16.0));
  let jump = 4.0 * SSF_R;
  var dx = vec3f(0.0);
  var dy = vec3f(0.0);
  let xr = ssfAt(q + vec2i(k, 0)).x; let xl = ssfAt(q - vec2i(k, 0)).x;
  let yd = ssfAt(q + vec2i(0, k)).x; let yu = ssfAt(q - vec2i(0, k)).x;
  let okR = abs(xr - dist) < jump; let okL = abs(xl - dist) < jump;
  let okD = abs(yd - dist) < jump; let okU = abs(yu - dist) < jump;
  let pR = rayAt(pos.xy + vec2f(f32(k), 0.0)) * xr; let pL = rayAt(pos.xy - vec2f(f32(k), 0.0)) * xl;
  let pD = rayAt(pos.xy + vec2f(0.0, f32(k))) * yd; let pU = rayAt(pos.xy - vec2f(0.0, f32(k))) * yu;
  if (okR && okL) { dx = pR - pL; } else if (okR) { dx = pR - P0; } else if (okL) { dx = P0 - pL; }
  if (okD && okU) { dy = pU - pD; } else if (okU) { dy = pU - P0; } else if (okD) { dy = P0 - pD; }
  var n = -rd;
  let cr = cross(dx, dy);
  if (dot(cr, cr) > 1e-12) { n = normalize(cr); if (dot(n, rd) > 0.0) { n = -n; } }
  // (the edge of the body seen side-on, where the neighbours are gone: its normal bent toward the outline, up and away from the eye)
  if (!(okR && okL && okD && okU)) { n = normalize(n + 0.6 * vec3f(0.0, 1.0, 0.0)); }
  // (the parcels' own normals blended where they meet, mostly; the screen's differences only a little, for the body's larger shape)
  let bn = textureLoad(blobN, q, 0);
  if (bn.w > 1e-3 && dot(bn.xyz, bn.xyz) > 1e-8) { n = normalize(mix(n, normalize(bn.xyz), 0.8)); if (dot(n, rd) > 0.0) { n = normalize(n - 2.0 * dot(n, rd) * rd); } }
  let sunVis = F.lk[6].z * F.lk[6].w;
  let ndl = dot(n, F.sun.xyz);
  let sky = 0.70 + 0.20 * n.y;      // (the sky's light on it: more facing up; as bright in its shade as the flat foam on the water, 0.7)
  // (the sun's on its faces, wrapped round its sides as light scattered through foam is, and seen against the sun its thin edges lit
  // through: the foam's own light, not a mirror's)
  let sun = 0.55 * sunVis * max(ndl, 0.0) + 0.18 * sunVis * clamp(ndl + 0.5, 0.0, 1.0)
    + 0.35 * sunVis * pow(max(dot(rd, F.sun.xyz), 0.0), 4.0) * (1.0 - smoothstep(0.02, 0.08, a.w));
  var col = mix(vec3f(0.80, 0.87, 0.95), vec3f(0.98, 0.98, 0.97), clamp(sun * 1.6, 0.0, 1.0)) * (sky + sun);
  if (underwater()) { col = underMix(col * 0.8, rd, dist); }
  else { col = mix(col, skyMap(normalize(vec3f(rd.x, 0.012, rd.z))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0))); }
  return vec4f(present(col).rgb, smoothstep(SSF_EDGE.x, SSF_EDGE.y, a.w));
}
`,Ce=class{constructor(e,{max:t=W.max}={}){Object.assign(this,{device:e,max:t,ready:!1,frame:0,lastT:null,stats:null,reads:[]}),this.pool=e.createBuffer({label:`parcels`,size:t*128,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST|GPUBufferUsage.COPY_SRC});let n=new Float32Array(t*32);for(let e=0;e<t;e++)n[e*32+7]=-1;e.queue.writeBuffer(this.pool,0,n),this.ctr=e.createBuffer({label:`parcels counters`,size:32,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST}),this.U=new Float32Array(20),this.ubuf=e.createBuffer({label:`parcels uniforms`,size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let r=GPUShaderStage.COMPUTE,i=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,a=Math.ceil(2*W.win[0]/W.cell[0]),o=Math.ceil(W.win[1]/W.cell[1]);this.pileCells=a*o,this.pile=e.createBuffer({label:`parcels pile`,size:this.pileCells*16,usage:GPUBufferUsage.STORAGE});let[s,c]=W.foam.n;this.foam=e.createBuffer({label:`parcels foam`,size:s*c*8,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),this.foamTex=e.createTexture({label:`parcels foam`,size:[s,c],format:`rgba16float`,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING}),this.bglF=e.createBindGroupLayout({entries:[{binding:0,visibility:r,buffer:{type:`read-only-storage`}},{binding:1,visibility:r,storageTexture:{access:`write-only`,format:`rgba16float`}},{binding:2,visibility:r,buffer:{type:`read-only-storage`}},{binding:3,visibility:r,buffer:{type:`uniform`}}]}),this.foamPipe=e.createComputePipeline({label:`parcels foam out`,layout:e.createPipelineLayout({bindGroupLayouts:[this.bglF]}),compute:{module:e.createShaderModule({label:`parcels foam out`,code:be}),entryPoint:`pFoamOut`}}),this.bglC=e.createBindGroupLayout({entries:[{binding:0,visibility:r,buffer:{type:`storage`}},{binding:1,visibility:r,buffer:{type:`storage`}},{binding:2,visibility:r,buffer:{type:`uniform`}},{binding:3,visibility:r,buffer:{type:`storage`}},{binding:4,visibility:r,buffer:{type:`storage`}}]}),this.bglR=e.createBindGroupLayout({entries:[{binding:0,visibility:i,buffer:{type:`read-only-storage`}}]}),this.bgF=e.createBindGroup({layout:this.bglF,entries:[{binding:0,resource:{buffer:this.foam}},{binding:1,resource:this.foamTex.createView()},{binding:2,resource:{buffer:this.pile}},{binding:3,resource:{buffer:this.ubuf}}]}),this.bgC=e.createBindGroup({layout:this.bglC,entries:[{binding:0,resource:{buffer:this.pool}},{binding:1,resource:{buffer:this.ctr}},{binding:2,resource:{buffer:this.ubuf}},{binding:3,resource:{buffer:this.pile}},{binding:4,resource:{buffer:this.foam}}]}),this.bgR=e.createBindGroup({layout:this.bglR,entries:[{binding:0,resource:{buffer:this.pool}}]})}build(e,t){let n=this.device;this.module=n.createShaderModule({label:`parcels compute`,code:e+ye});let r=n.createPipelineLayout({bindGroupLayouts:[t,this.bglC]});this.pipes=Object.fromEntries([`begin`,`clear`,`foam`,`splat`,`spawn`,`step`,`end`].map(e=>[e,n.createComputePipeline({label:`parcels ${e}`,layout:r,compute:{module:this.module,entryPoint:`p${e[0].toUpperCase()}${e.slice(1)}`}})])),this.ready=!0}encode(e,t,n,r,i){if(!this.ready)return;let a=this.lastT==null?0:t-this.lastT,o=0;this.lastT!=null&&(a<0||a>1)&&(o=1,a=0),this.lastT=t,a=Math.min(a,1/20);let s=[r[2],r[3]],c=i.e-r[0],l=i.n-r[1],u=c*s[1]-l*s[0],d=c*s[0]+l*s[1],[f,p]=W.cell,[m,h]=W.win,g=Math.max(-5,Math.min(d-.5*h,d-20)),_=Math.ceil(2*m/f),v=Math.ceil(h/p);this.U.set([u,g,g+h,m,f,p,_,v,a,this.max,o,this.frame++,W._0x55e5cd,W.spawnV,W.voids,Math.floor(this.max/8),W.kappaOff,0,0,0]),this.device.queue.writeBuffer(this.ubuf,0,this.U),e.setBindGroup(0,n),e.setBindGroup(1,this.bgC),e.setPipeline(this.pipes.begin),e.dispatchWorkgroups(1),e.setPipeline(this.pipes.clear),e.dispatchWorkgroups(Math.ceil(4*_*v/64)),e.setPipeline(this.pipes.foam),e.dispatchWorkgroups(W.foam.n[0]/8,W.foam.n[1]/8),e.setPipeline(this.pipes.splat),e.dispatchWorkgroups(Math.ceil(this.max/_e)),e.setPipeline(this.pipes.spawn),e.dispatchWorkgroups(Math.ceil(_/8),Math.ceil(v/8)),e.setPipeline(this.pipes.step),e.dispatchWorkgroups(Math.ceil(this.max/_e)),e.setPipeline(this.pipes.end),e.dispatchWorkgroups(1),e.setPipeline(this.foamPipe),e.setBindGroup(0,this.bgF),e.dispatchWorkgroups(W.foam.n[0]/8,W.foam.n[1]/8),e.setBindGroup(0,n),this.window=[u-m,g,u+m,g+h]}readback(e){if(!this.ready||!this.reads.length&&(this.made??0)>=3)return;let t=this.reads.pop()??(this.made=(this.made??0)+1,this.device.createBuffer({size:32,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}));e.copyBufferToBuffer(this.ctr,0,t,0,32),this.pending=t}afterSubmit(){let e=this.pending;this.pending=null,e&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new Uint32Array(e.getMappedRange().slice(0));e.unmap(),this.reads.push(e);let n=performance.now();this.hist=(this.hist??[]).filter(e=>n-e.t<1e3),this.hist.push({t:n,s:t[1],i:t[6]});let r=this.hist.length;this.stats={spawned:t[1],alive:t[2],contact:t[3],volFlight:t[4]/1e4,volContact:t[5]/1e4,impacts:t[6],spawnRate:this.hist.reduce((e,t)=>e+t.s,0)/r,impactRate:this.hist.reduce((e,t)=>e+t.i,0)/r}}).catch(()=>{})}async dump(e=this.max){let t=this.device,n=Math.min(e,this.max)*128,r=t.createBuffer({size:n,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),i=t.createCommandEncoder();i.copyBufferToBuffer(this.pool,0,r,0,n),t.queue.submit([i.finish()]),await r.mapAsync(GPUMapMode.READ);let a=new Float32Array(r.getMappedRange().slice(0));return r.unmap(),r.destroy(),a}async dumpFoam(){let e=this.device,[t,n]=W.foam.n,r=e.createBuffer({size:t*n*8,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),i=e.createCommandEncoder();i.copyBufferToBuffer(this.foam,0,r,0,t*n*8),e.queue.submit([i.finish()]),await r.mapAsync(GPUMapMode.READ);let a=new Uint32Array(r.getMappedRange().slice(0));r.unmap(),r.destroy();let o=new Float32Array(t*n),s=1e-6/(W.foam.cell*W.foam.cell);for(let e=0;e<t*n;e++)o[e]=a[2*e]*s;return o}draw(e,t){this.ready&&(e.setPipeline(t),e.setBindGroup(2,this.bgR),e.draw(6,this.max))}},we=`
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
}`;function Te(e){let t=(e,t)=>{let n=1,r=0;for(;e>0;)n/=t,r+=e%t*n,e=Math.floor(e/t);return r},n=e%8+1;return[t(n,2)-.5,t(n,3)-.5]}var Ee=class{constructor(e,t,{wMax:n=12,wSoft:r=2,sigN:i=.35,sigW:a=.45,sharpen:o=0,jitter:s=!0}={}){Object.assign(this,{device:e,wMax:n,wSoft:r,sigN:i,sigW:a,sharpen:o,jitter:s});let c=e.createShaderModule({code:we,label:`temporal resolve`});this.modules=[c],this.pipe=e.createRenderPipeline({layout:`auto`,label:`temporal resolve`,vertex:{module:c,entryPoint:`vs`},fragment:{module:c,entryPoint:`fs`,targets:[{format:t},{format:`rgba16float`}]}}),this.uni=e.createBuffer({size:128,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(32),this.lin=e.createSampler({magFilter:`linear`,minFilter:`linear`,addressModeU:`clamp-to-edge`,addressModeV:`clamp-to-edge`}),this.size=``,this.hist=[],this.cur=0,this.valid=!1}resize(e,t,n,r){let i=[e,t,n,r].join(` `);if(i!==this.size){this.size=i,this.inSize=[e,t],this.outSize=[n,r];for(let e of this.hist)e.destroy();this.hist=[0,1].map(()=>this.device.createTexture({size:[n,r],format:`rgba16float`,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})),this.valid=!1}}reset(){this.valid=!1}resolve(e,t,n,r,i,a,o=null){let s=this.device,c=this.hist[this.cur],l=this.hist[1-this.cur],u=this.outSize[0]/this.inSize[0];this.uniF.set(r,0),this.uniF.set([...this.inSize,...this.outSize,i[0],i[1],this.wMax,+!!this.valid,u,this.sharpen,this.sigN,Math.max(this.sigW,.5*u),this.wSoft,0,0,0],16),s.queue.writeBuffer(this.uni,0,this.uniF);let d=s.createBindGroup({layout:this.pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:t},{binding:2,resource:n},{binding:3,resource:c.createView()},{binding:4,resource:this.lin}]}),f=e.beginRenderPass({colorAttachments:[{view:a,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]},{view:l.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],...o?{timestampWrites:o}:{}});f.setPipeline(this.pipe),f.setBindGroup(0,d),f.draw(3),f.end(),this.cur=1-this.cur,this.valid=!0}};function De(e){let t=Array.from(e),n=new Float32Array(16);n[0]=t[5]*t[10]*t[15]-t[5]*t[11]*t[14]-t[9]*t[6]*t[15]+t[9]*t[7]*t[14]+t[13]*t[6]*t[11]-t[13]*t[7]*t[10],n[4]=-t[4]*t[10]*t[15]+t[4]*t[11]*t[14]+t[8]*t[6]*t[15]-t[8]*t[7]*t[14]-t[12]*t[6]*t[11]+t[12]*t[7]*t[10],n[8]=t[4]*t[9]*t[15]-t[4]*t[11]*t[13]-t[8]*t[5]*t[15]+t[8]*t[7]*t[13]+t[12]*t[5]*t[11]-t[12]*t[7]*t[9],n[12]=-t[4]*t[9]*t[14]+t[4]*t[10]*t[13]+t[8]*t[5]*t[14]-t[8]*t[6]*t[13]-t[12]*t[5]*t[10]+t[12]*t[6]*t[9],n[1]=-t[1]*t[10]*t[15]+t[1]*t[11]*t[14]+t[9]*t[2]*t[15]-t[9]*t[3]*t[14]-t[13]*t[2]*t[11]+t[13]*t[3]*t[10],n[5]=t[0]*t[10]*t[15]-t[0]*t[11]*t[14]-t[8]*t[2]*t[15]+t[8]*t[3]*t[14]+t[12]*t[2]*t[11]-t[12]*t[3]*t[10],n[9]=-t[0]*t[9]*t[15]+t[0]*t[11]*t[13]+t[8]*t[1]*t[15]-t[8]*t[3]*t[13]-t[12]*t[1]*t[11]+t[12]*t[3]*t[9],n[13]=t[0]*t[9]*t[14]-t[0]*t[10]*t[13]-t[8]*t[1]*t[14]+t[8]*t[2]*t[13]+t[12]*t[1]*t[10]-t[12]*t[2]*t[9],n[2]=t[1]*t[6]*t[15]-t[1]*t[7]*t[14]-t[5]*t[2]*t[15]+t[5]*t[3]*t[14]+t[13]*t[2]*t[7]-t[13]*t[3]*t[6],n[6]=-t[0]*t[6]*t[15]+t[0]*t[7]*t[14]+t[4]*t[2]*t[15]-t[4]*t[3]*t[14]-t[12]*t[2]*t[7]+t[12]*t[3]*t[6],n[10]=t[0]*t[5]*t[15]-t[0]*t[7]*t[13]-t[4]*t[1]*t[15]+t[4]*t[3]*t[13]+t[12]*t[1]*t[7]-t[12]*t[3]*t[5],n[14]=-t[0]*t[5]*t[14]+t[0]*t[6]*t[13]+t[4]*t[1]*t[14]-t[4]*t[2]*t[13]-t[12]*t[1]*t[6]+t[12]*t[2]*t[5],n[3]=-t[1]*t[6]*t[11]+t[1]*t[7]*t[10]+t[5]*t[2]*t[11]-t[5]*t[3]*t[10]-t[9]*t[2]*t[7]+t[9]*t[3]*t[6],n[7]=t[0]*t[6]*t[11]-t[0]*t[7]*t[10]-t[4]*t[2]*t[11]+t[4]*t[3]*t[10]+t[8]*t[2]*t[7]-t[8]*t[3]*t[6],n[11]=-t[0]*t[5]*t[11]+t[0]*t[7]*t[9]+t[4]*t[1]*t[11]-t[4]*t[3]*t[9]-t[8]*t[1]*t[7]+t[8]*t[3]*t[5],n[15]=t[0]*t[5]*t[10]-t[0]*t[6]*t[9]-t[4]*t[1]*t[10]+t[4]*t[2]*t[9]+t[8]*t[1]*t[6]-t[8]*t[2]*t[5];let r=t[0]*n[0]+t[1]*n[4]+t[2]*n[8]+t[3]*n[12];for(let e=0;e<16;e++)n[e]/=r;return n}var Oe={seed:7,size:1024,res:512,landWidth:160,d50:.3,faceSlope:.07,plane:0,berm:1.4,bermAt:22,dune:5,duneAt:70,duneWidth:45,maxDepth:22,bar:{u:95,height:1.4,width:16,wander:16,trough:.6,troughAt:1.8},rips:{spacing:230,jitter:.3,at:60,width:15,flare:1.5,cut:.9,depth:.6,head:.3,attach:.5},shore:{megacusp:8,cusps:22,cuspRelief:.24,swash:10,step:.25,stepAt:7},noise:{shore:{scale:1600,rms:10,hurst:.85,seed:51,split:300,finest:4},bed:{scale:80,rms:1,hurst:.8,seed:57,finest:4},zones:{offshore:.12,surf:.05,face:.02,berm:.06,dune:.5}},divots:{hs:1.2,tp:10,scour:1,plunge:4,width:5,minWidth:3,barAt:2.5,da:4,du:1,from:300},reef:{cover:.25,scale:55,height:1.8,from:140,to:3e3,rough:.35,wander:.3},weed:{cover:.4,scale:22,depthMin:3,depthMax:16},coral:{cover:.45,scale:7,depthMin:1.5,depthMax:9},surfClear:1.2,sandDry:[.62,.5,.33],wetDark:.55,weedAlb:[.045,.065,.03],rockAlb:[.34,.31,.26],coralAlb:[.3,.24,.17],scrub:{from:.35,cover:.75,scale:14},scrubAlb:[.1,.11,.055],grains:{quartz:.7,shell:.25,heavy:.05,quartzAlb:[.62,.48,.3],shellAlb:[.8,.77,.7],heavyAlb:[.08,.07,.06],facets:4,facetAlpha:.7,F0:.045},wetLine:.7,ripple:.14};function ke(e,t=Oe){return{...t,plane:e,faceSlope:e,bar:{...t.bar,height:0,trough:0},rips:null,shore:null,divots:null,noise:null,reef:{...t.reef,cover:0},weed:{...t.weed,cover:0},coral:{...t.coral,cover:0}}}var Ae=e=>.21*e**.48,je=(e,t,n)=>{let r=Math.imul(e,374761393)+Math.imul(t,668265263)+Math.imul(n,2147483647)|0;return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967296};function Me(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=a*a*(3-2*a),c=o*o*(3-2*o),l=je(r,i,n),u=je(r+1,i,n),d=je(r,i+1,n),f=je(r+1,i+1,n);return l+(u-l)*s+(d-l)*c+(l-u-d+f)*s*c}function Ne(e,t,n,r=4){let i=0,a=.5,o=1,s=0;for(let c=0;c<r;c++)i+=a*Me(e*o,t*o,n+c*101),s+=a,a*=.5,o*=2.03;return i/s}var Pe=e=>.5+.11*Math.SQRT2*Fe(1-2*Math.min(.999,Math.max(.001,e)));function Fe(e){let t=.147,n=Math.log(1-e*e),r=2/(Math.PI*t)+n/2;return Math.sign(e)*Math.sqrt(Math.sqrt(r*r-n/t)-r)}var G=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Ie(e,t=Oe){let n=t.rips;if(!n)return null;if(!(n.spacing>0)||!Number.isFinite(n.spacing))throw RangeError(`the rips' spacing must be a positive number of metres, not ${n.spacing}`);let r=n.spacing,i=Math.floor((e-n.at)/r),a=Math.min(n.jitter,.5),o=e=>n.at+r*(e+(e===0?0:a*(je(e,77,t.seed)-.5))),s=-1/0,c=1/0;for(let t=i-1;t<=i+2;t++){let n=o(t);n<=e&&n>s&&(s=n),n>e&&n<c&&(c=n)}let l=(e-s)/(c-s);return{aL:s,aR:c,s:l,c:Math.cos(2*Math.PI*l),d:Math.min(e-s,c-e)}}function Le(e,t,n,r){if(Math.abs(t)>3*n.swash)return 0;let i=2*Math.PI*e/n.cusps+6*(Ne(e/(3*n.cusps),.3,r+41,2)-.5),a=.5+.5*Math.cos(i);return(n.cuspRelief*G(.3,.6,Ne(e/(8*n.cusps),.7,r+43))*.67+n.cuspRelief*.33)*(a*a-.375)*Math.exp(-((t/n.swash)**2))}var Re=9.81,ze=60,Be=new WeakMap;function Ve(e){if(e>=1)return 1;if(e<.2)return 0;let t=e*e,n=Math.exp(-1/t);for(let e=0;e<30;e++){let e=(1-n+t*Math.log(n))/(t/n-1);if(n-=e,Math.abs(e)<1e-10)break}return Math.min(n,t)}function He(e,t,n=Ie(e,t)?.c??0){let r=t.bar;return r.u+r.wander*n+.3*r.wander*(2*Ne(e/400,.5,t.seed+9)-1)}function Ue(e,t){let n=Be.get(t);if(n||Be.set(t,n=new Map),n.has(e))return n.get(e);let r=t.divots,i=e*r.da,a=Math.round((r.from+ze)/r.du),o=new Float32Array(a+1);n.set(e,o);let s=Ie(i,t),c=s?1-Math.exp(-((s.d/(t.rips.width*(1+t.rips.flare)))**2)):1;if(c<.001)return o;let l=r.tp,u=1/l,d=r.hs/Math.SQRT2,f=.5+.4*Math.tanh(33*d*2*Math.PI/(Re*l*l)),p=d*d/8*(Re*l/(4*Math.PI)),m=0,h=Ye(i,t).ub+Ye(i,t).xf-.5*t.bar.width;for(let e=0;e<=a;e++){let n=r.from-e*r.du,s=Ze(i,n,t,!1,!1),d=-(s.y+o[e]);if(d<.1)break;let g=C(l,d),_=S(g,d)[1],v=Math.sqrt(8*p/_),y=.88/g*Math.tanh(f*g*d/.88),b=Ve(v/y),x=b-m;if(p=Math.max(0,p-.25*u*b*y*y*r.du),m=b,x<=0||n>h)continue;let w=r.width*y,T=Math.max(r.minWidth,w),E=r.scour*y*x*c*(1-s.rock)*w/T,D=n-r.plunge*y,O=D-r.barAt*T,k=Math.max(0,Math.floor((r.from-D-3*T)/r.du)),A=Math.min(a,Math.ceil((r.from-O+3*T)/r.du));for(let e=k;e<=A;e++){let t=r.from-e*r.du;o[e]+=E*(Math.exp(-(((t-O)/T)**2))-Math.exp(-(((t-D)/T)**2)))}}return o}function We(e,t,n){let r=n.divots,i=Math.round((r.from+ze)/r.du),a=(r.from-t)/r.du;if(a<0||a>i)return 0;let o=e/r.da,s=Math.floor(o),c=o-s,l=Math.min(Math.floor(a),i-1),u=a-l,d=e=>e[l]+(e[l+1]-e[l])*u;return(d(Ue(s,n))*(1-c)+d(Ue(s+1,n))*c)*(1-G(40,ze,-t))}var Ge=(e,t,n=Oe)=>Ze(e,t,n,!0,!0),Ke=null,qe=NaN,Je=null;function Ye(e,t){if(t===Ke&&e===qe)return Je;let n=Ie(e,t),r=n?n.c:0,i=t.noise,a=i?ae(e,i.shore,i.shore.split):0,o=i?ae(e,i.shore)-a:0,s={scale:1200,rms:.4,hurst:.8,finest:30},c=ae(e,{...s,seed:t.seed+61}),l=ae(e,{...s,seed:t.seed+67});return Je={r:n,c:r,horn:.5-.5*r,ub:He(e,t,r),xf:a,xn:o,rw:c,rw2:l},Ke=t,qe=e,Je}function Xe(e,t){let n=t.noise.zones,r=t.shore?.swash??10;return e<0?n.face+(n.berm-n.face)*G(r,t.bermAt,-e)+(n.dune-n.berm)*G(t.duneAt,t.duneAt+.5*t.duneWidth,-e):n.face+(n.surf-n.face)*G(r,2*r,e)+(n.offshore-n.surf)*G(1.2*t.bar.u,1.8*t.bar.u,e)}function Ze(e,t,n,r,i){let a=Ae(n.d50),o=(2*a/(3*n.faceSlope))**3,s=n.bar,c=n.shore,l=n.rips,u=Ye(e,n),{r:d,c:f,horn:p,ub:m}=u,h=t-u.xf,g=h-((c?-c.megacusp*f:0)+u.xn)*(h>=0?1-G(.25*m,.7*m,h):1-G(n.bermAt,n.duneAt,-h)),_=c?Le(e,g,c,n.seed):0,v=r&&n.divots?We(e,t,n):0,y=n.noise?Xe(g,n)*oe(e,h,n.noise.bed):0,b,x=0,S=0,C=0,w=0,T=0,E=0;if(g>=0){let r=Math.min(n.maxDepth,n.plane?n.plane*g:a*(g+o)**(2/3)-a*o**(2/3)),f=G(0,.5*s.u,g),D=d?Math.exp(-((d.d/l.width)**2)):0,O=d?l.attach:0;r-=s.height*(1-(d?l.cut:0)*D)*Math.exp(-(((h-m)/s.width)**2))*f;let k=m-s.troughAt*s.width;if(r+=s.trough*(1-.4*p)*(1-O*p*p)*Math.exp(-(((h-k)/s.width)**2))*f,d){r-=O*p*p*.6*s.height*G(.15*m,.45*m,h)*(1-G(m-s.width,m,h));let e=k-s.width+O*(.2*m-(k-s.width)),t=l.width*(1+l.flare*(1-G(e,m-.5*s.width,h)));r+=l.depth*Math.exp(-((d.d/t)**2))*G(e-s.width,e,h)*(1-G(m+s.width,m+2.5*s.width,h))*f,r-=l.head*Math.exp(-((d.d/(2.5*l.width))**2))*Math.exp(-(((h-(m+3*s.width))/(1.5*s.width))**2))}c&&(r+=c.step*Math.exp(-(((g-c.stepAt)/(g<c.stepAt?1.5:5))**2))-_);let A=n.reef,j=Ne(e/A.scale,t/A.scale,n.seed+3),M=Pe(A.cover),ee=A.from*(1+A.wander*u.rw),N=A.to*(1+A.wander*u.rw2),P=G(ee-30,ee,h)*(1-G(N,N+.1*A.to,h)),F=.5*(n.blur??0)/A.scale,te=(n.blur??0)>3.5?0:A.rough;x=G(M,M+.04,j)*P;let ne=A.height*G(M-F,M+.12+F,j)*(1-te+te*Ne(e/3.5,t/3.5,n.seed+5));r-=ne*+(G(M-F,M+F+1e-9,j)>0)*P,r-=v+y;let re=c?c.swash:0,I=G(re,2*re+1,g);if(b=-(r+I*Math.max(0,.05*g*n.faceSlope-r)),!i)return{y:b,rock:x};let L=-b,R=G(n.surfClear*n.bar.u*.85,n.surfClear*n.bar.u,h),z=n.weed,B=n.coral;w=G(z.depthMin,z.depthMin+1.5,L)*(1-G(z.depthMax-2,z.depthMax,L))*R,E=G(B.depthMin,B.depthMin+1,L)*(1-G(B.depthMax-2,B.depthMax,L))*R,T=P;let ie=Pe(z.cover),ae=Pe(B.cover);S=G(ie,ie+.05,Ne(e/z.scale,t/z.scale,n.seed+11))*w,C=x*G(ae,ae+.06,Ne(e/B.scale,t/B.scale,n.seed+17))*E,S*=1-.6*x,x*=1-C}else{let r=-g,i=Math.min(r*n.faceSlope,n.berm),a=n.dune*G(n.duneAt,n.duneAt+n.duneWidth,r)*(n.noise?1:.8+.4*Ne(e/60,r/60,n.seed+21));b=i+(r>n.bermAt?.15*(r-n.bermAt)/40:0)+a+_+v+y;let o=n.scrub,s=Pe(o.cover);w=G(n.duneAt+o.from*n.duneWidth,n.duneAt+(o.from+.3)*n.duneWidth,r),S=G(s,s+.08,Ne(e/o.scale,t/o.scale,n.seed+31))*w}let D=Math.max(0,1-S-x-C);return{y:b,weed:S,rock:x,coral:C,sand:D,zW:w,zR:T,zC:E}}var Qe=Array.from({length:6},(e,t)=>.6**t),$e=Qe.reduce((e,t)=>e+t,0),K={cell:.42,scales:Qe.map((e,t)=>[.41**t,e/$e]),warp:.9,width:.6,patch:3.4,patchAmp:.35,gain:1};function et(e,t=[0,0],n=180,r=Oe){let i=new Float32Array(72);if(!e)return i;let a=n*Math.PI/180;i.set([t[0],t[1],Math.sin(a),Math.cos(a)],0),i.set([e.a0,e.u0,1/e.size,1],4),i.set([e.texel,r.wetLine,r.ripple,r.wetDark],8),i.set([...r.sandDry,e.levels.length],12);let o=e.outer??e,s=Ae(r.d50),c=(2*s/(3*r.faceSlope))**3,l=o.u0+o.size,u=Math.min(r.maxDepth,r.plane?r.plane*l:s*((l+c)**(2/3)-c**(2/3))),d=u>=r.maxDepth?.005:r.plane?r.plane:2/3*s*(l+c)**(-1/3);i.set([...r.weedAlb,-u,...r.rockAlb,d,...r.coralAlb,0,...r.scrubAlb,0],16);let f=r.grains;i.set([r.d50/1e3,f.quartz,f.shell,f.heavy,...f.quartzAlb,f.facets,...f.shellAlb,f.facetAlpha,...f.heavyAlb,f.F0],32),i.set([o.a0,o.u0,1/o.size,o.levels.length],48);let p=r.noise;return p&&(i.set([p.bed.scale,p.bed.hurst,p.bed.seed,p.zones.face],52),i[31]=p.bed.finest),i[27]=r.faceSlope,[[r.reef,3,.04],[r.weed,11,.05],[r.coral,17,.06],[r.scrub,31,.08]].forEach(([e,t,n],a)=>i.set([e.scale,Pe(e.cover),r.seed+t,n],56+4*a)),i}function tt(e,t=null){let n=t?t.res:1,r=t?t.levels.length:1,i=e.createTexture({label:`beach bed`,size:[n,n],format:`rgba16float`,mipLevelCount:r,usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST});return(t?t.levels:[new Float32Array([-1e3,0,0,0])]).forEach((t,r)=>{let a=Math.max(1,n>>r),o=new Uint16Array(t.length);for(let e=0;e<t.length;e++)o[e]=ue(t[e]);e.queue.writeTexture({texture:i,mipLevel:r},o,{bytesPerRow:a*8},[a,a])}),i}var nt=`
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
`,rt=`
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
let kw = clamp(${me.warpScale} * sc / (2.0 * max(px, 1e-4)) - 1.0, 0.0, 1.0);
let nw = nNoise2d(p / (${me.warpScale} * sc), i32(seed) + 7);
let w = ${me.warp} * sc * kw * vec2f(-nw.z, nw.y) / 0.626;
let pg = nFractal2(p + w, vec4f(sc, 1.0, ${me.hurst}, seed), vec2f(0.0, max(px, ${me.fine} * sc)));
let res = 1.0 - pow(clamp(2.0 * px / sc, 0.0, 1.0), 1.2);
let z = log((1.0 - m) / max(m, 1e-4)) / 1.702;
let M = mix(m, smoothstep(z - 0.25, z + 0.25, pg), res);
return cF * M / max(m, 1e-4);
}
fn surfPhase(p: vec2f, B: vec4f, px: f32, d: f32) -> f32 {
let x0 = surfPhase0(B);
let wr = (1.0 - smoothstep(0.04, 0.25, min(x0, 1.0 - x0))) * (1.0 - smoothstep(0.25, 1.0, d));
var rag = 0.0;
if (wr > 0.0) { rag = wr * ${V.rag} * clamp(nFractal2(p, vec4f(${V.ragScale}, 1.0, 0.55, 697.0), vec2f(0.0, max(px, ${V.ragFine}))), -2.5, 2.5); }
return fract(x0 + rag);
}
fn surfPhase0(B: vec4f) -> f32 { return fract(-atan2(B.z, B.y) / 6.2831853 + ${V.lead}); }
fn surfJitter(al: f32, tc: f32, px: f32) -> f32 {
let ja = ${V.jitter} * clamp(${V.jitterScale}.0 / max(2.0 * px, 1e-3) - 1.0, 0.0, 1.0);
return 1.0 + ja * nNoise2(vec2f(al, tc * ${V.jitterScale}.0) / ${V.jitterScale}.0, 661) / ${B};
}
fn leanG(y: f32) -> vec2f {
let y0 = ${H.leanWin[0]};
let y1 = ${H.leanWin[1]};
let r = ${H.leanRamp};
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
let xs = swRead(q.xy, 5).w;
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
let st = smoothstep(0.55, 1.0, r0) * (1.0 - (1.0 - ${H.leanBore}) * smoothstep(0.85, 1.15, r0 * j0)) * surfSize(r0 * thr) * gate;
var a = ${H.lean} * st * (1.0 - smoothstep(0.05, 0.1, wc));
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
a = min(a, 0.6 / (kl * ${(1-(H.leanWin[1]-H.leanWin[0]-H.leanRamp)).toFixed(6)}));
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
let n = nFractal2d(p, vec4f(${V.ragScale}, 1.0, 0.55, 697.0), vec2f(0.0, max(2.0 * cell, ${H.ragGeo})));
let nc = clamp(n.x, -2.5, 2.5);
let gwr = -wrs.y * wd * select(-1.0, 1.0, x0 < 0.5) * kx;
y += wr * ${V.rag} * nc;
gy += ${V.rag} * (wr * n.yz * select(0.0, 1.0, abs(n.x) < 2.5) + nc * gwr);
}
var cro = vec2f(1.0, 0.0);
let hn0 = B.x * thr;
if (B.x > 0.65 && y0 < 0.09 && y0 > -(${H.crashAhead} * hn0 + cell) / lam - 0.09) {
let grB = vec2f(Be.x - B.x, Bn.x - B.x) / es;
cro = vec2f(B.x + ${H.crashRun} * hn0 * dot(grB, kn), crashType(xs, hn0));
}
let hg = breakShape(y, gy, al, ald, T, B, P, lam, thr, gate, cell, kn, cro);
o.dh = hg.x;
o.g = hg.yz;
return o;
}
fn breakShape(y: f32, gy: vec2f, al: f32, ald: vec2f, T: f32, B: vec4f, P: vec4f, lam: f32, thr: f32, gate: f32, cell: f32, kn: vec2f, cro: vec2f) -> vec3f {
if (y < -0.2 || y > 0.33) { return vec3f(0.0); }
let tc = T - y;
let gtc = -gy;
let jS = ${V.jitterScale}.0;
let ja = ${V.jitter} * clamp(jS / max(2.0 * cell, 1e-3) - 1.0, 0.0, 1.0);
let nj = nNoise2d(vec2f(al / jS, tc), 661);
let jr = 1.0 + ja * nj.x / ${B};
let gjr = (ja / ${B}) * (nj.y / jS * ald + nj.z * gtc);
let xb = y * lam;
let gxb = lam * gy;
if (y < 0.0) {
let hn = B.x * thr;
if (hn <= 0.0) { return vec3f(0.0); }
let cs = crashRun(B.x * jr, cro.x * jr, xb / (${H.crashRun} * hn)) * surfSize(hn) * gate * cro.y;
if (cs <= 0.0) { return vec3f(0.0); }
let A = ${H.crashAhead} * hn;
let t = -xb / A;
let wf = cell / A;
let fd = 1.0 - smoothstep(0.3, 0.8, wf);
let u1 = ssd(0.0, 0.4 + wf, t);
let u2 = ssd(0.45, 1.0 + wf, t);
let sh = u1.x * (1.0 - u2.x);
let dsh = (u1.y * (1.0 - u2.x) - u1.x * u2.y) / A;
let K = ${H.splash} * hn * fd;
return vec3f(K * cs * sh, -K * cs * dsh * gxb);
}
let r = mix(B.x, P.x, y);
let gr = (P.x - B.x) * gy;
let hc = r * thr;
if (hc <= 0.01) { return vec3f(0.0); }
let ghc = thr * gr;
let sS = ssd(0.85, 1.15, r * jr);
let sZ = ssd(${V.sizeH[0]}, ${V.sizeH[1]}, hc);
let s = sS.x * sZ.x * gate;
if (s <= 0.0) { return vec3f(0.0); }
let gs = gate * (sS.y * sZ.x * (jr * gr + r * gjr) + sS.x * sZ.y * ghc);
let Lr = min(${H.lengthH} * hc, 0.3 * lam / (1.0 + cell / (${H.lengthH} * hc)));
let nv = nNoise2d(vec2f(al / ${H.bulkScale}, tc), 719);
var v = 1.0 + ${H.bulkVar} * nv.x / ${B};
var gv = (${H.bulkVar} / ${B}) * (nv.y / ${H.bulkScale} * ald + nv.z * gtc);
if (v < 0.2) { v = 0.2; gv = vec2f(0.0); }
let xi = xb / Lr;
let gxi = gxb / Lr - select(vec2f(0.0), xi * ghc / hc, Lr >= 0.999 * ${H.lengthH} * hc);
let wf = cell / Lr;
let pk = max(${H.peak}, 1.5 * wf);
let b1 = ssd(0.0, pk, xi);
let b2 = ssd(pk, 1.0 + wf, xi);
let bf = 1.0 - smoothstep(0.3, 0.8, wf);
let sh = select(0.0, b1.x * (1.0 - b2.x) * bf, bf > 0.0);
let dsh = select(0.0, (b1.y * (1.0 - b2.x) - b1.x * b2.y) * bf, bf > 0.0);
let K = ${2*H.area*H.voids/H.lengthH};
var h = K * hc * v * sh;
var g = K * (sh * (v * ghc + hc * gv) + hc * v * dsh * gxi);
let E = min(2.0 * Lr, 0.3 * lam);
let top = ${H.twistScale} * 0.5 * max(F.swl.x, 0.1);
let k1 = ssd(0.0, 0.3 * Lr, xb);
let k2 = ssd(0.4 * E, E, xb);
let kf = 1.0 - smoothstep(0.25 * top, 0.5 * top, cell);
let k = k1.x * (1.0 - k2.x) * kf;
if (k > 0.0) {
let gk = (k1.y * (1.0 - k2.x) - k1.x * k2.y) * kf * gxb;
let roll = ${H.twistRoll} * F.cam.w;
let qc = vec2f(al + ${H.twistDrift} * tc, xb + roll - 997.0 * floor(roll / 997.0));
let z = nFractal2d(qc, vec4f(top, 1.0, 0.6, 733.0), vec2f(0.0, max(${H.twistFine} * top, 2.0 * cell)));
let gz = z.y * (ald + ${H.twistDrift} * gtc) + z.z * gxb;
let sq = sqrt(z.x * z.x + 0.25);
let bl = 0.5 * (z.x + sq);
let dbl = 0.5 * (1.0 + z.x / sq);
let V = ${H.twistV};
h += V * hc * k * bl;
g += V * (bl * (k * ghc + hc * gk) + hc * k * dbl * gz);
}
return vec3f(s * h, s * g + h * gs);
}
fn crashRun(rh: f32, ro: f32, sh: f32) -> f32 {
let d = rh - ro;
if (d <= 0.01) { return 0.0; }
let f = (rh - 1.0) / d + sh;
return smoothstep(0.0, 0.1, f) * (1.0 - smoothstep(0.35, 1.0, f)) * smoothstep(0.01, 0.03, d);
}
fn crashType(xs: f32, hb: f32) -> f32 {
return mix(${H.crashSpill}, 1.0, smoothstep(${H.crashXi[0]}, ${H.crashXi[1]}, xs * inverseSqrt(max(hb, 1e-3))));
}
fn rollerChurn(al: f32, xb: f32, px: f32, c: f32) -> vec3f {
let ph = F.cam.w / ${H.churnT};
let k = floor(ph);
let f = ph - k;
let v = ${H.spin} * c * ${H.churnT};
let band = vec2f(0.0, max(3.0 * px, 0.01));
let kk = k - 4096.0 * floor(k / 4096.0);
let fb = fract(f + 0.5);
let kb = select(kk, kk + 1.0 - select(0.0, 4096.0, kk >= 4095.0), f >= 0.5);
let oa = vec2f(37.1 * fract(kk * 0.6180339), 53.3 * fract(kk * 0.4142136));
let ob = vec2f(37.1 * fract((kb + 0.5) * 0.6180339), 53.3 * fract((kb + 0.5) * 0.4142136));
let FL = vec4f(${H.lump}, 1.0, 0.8, 709.0);
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
let kL = clamp((${H.lump} / (3.0 * max(px, 1e-4)) - 1.0) / 3.0, 0.0, 1.0);
let gr = kL * ${H.relief} * (ch.y * vec2f(off.y, -off.x) + ch.z * off);
return mat2x4f(vec4f(0.0, max(s, sc), ch.x, x), vec4f(gr, 0.0, 0.0));
}
fn surfThr(hs: f32, qb: f32) -> f32 { return max(0.7071 * hs * sqrt(-log(clamp(qb, 1e-4, ${V.qbMax}))), 1e-3); }
fn surfSea(sea: f32) -> f32 { return smoothstep(0.0, 0.35, sea); }
fn surfSize(h: f32) -> f32 { return smoothstep(${V.sizeH[0]}, ${V.sizeH[1]}, h); }
fn rollerWhite(r: vec4f, ws: f32, aL: f32, px: f32) -> f32 {
if (ws <= 0.002) { return 0.0; }
if (r.y <= 0.0) { return ws; }
let kL = clamp((${H.lump} / (3.0 * max(px, 1e-4)) - 1.0) / 3.0, 0.0, 1.0);
let wc = clamp(ws, 0.001, 0.999);
let t = 0.5 + 0.195 * log((1.0 - wc) / wc);
let a = max(aL, 0.02);
let toe = smoothstep(0.0, 0.006, r.w - ${H.toeRag} * (0.6 - r.z));
return mix(ws, smoothstep(t - a, t + a, r.z), kL) * mix(1.0, toe, kL);
}
var<private> gSurfDbg: vec4f = vec4f(0.0, 0.0, 0.0, 1.0);
var<private> gCrash: f32 = 0.0;
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
if (${V.jitter} > 0.0 && toMean < 1.0) {
let tc = F.cam.w / Tm - x;
for (var n = 0; n < 3; n++) {
jit[n] = surfJitter(al, tc - f32(n), px);
}
}
let thr = surfThr(hs, B.w);
let r3 = mix(vec3f(B.x, P.x, P.y), P.xyz, x);
let sz = smoothstep(vec3f(${V.sizeH[0]}), vec3f(${V.sizeH[1]}), r3 * thr);
let qm = B.w * surfSize(max(0.7071 * hs, thr));
var S3 = smoothstep(vec3f(0.85), vec3f(1.15), r3 * jit) * sz * gate;
let dbg = u32(F.rip2.w);
var crash = vec2f(0.0, B.x * thr);
let ya = 1.0 - x;
let aC = ${H.crashAhead} * crash.y * P.w / 6.2831853;
let xr = max(${H.lengthH} * r3.x * thr * P.w / 6.2831853, 0.004);
let ahead = ya < aC;
if ((ahead || x < xr) && toMean < 1.0) {
let rc = select(r3.x, B.x, ahead);
let jc = select(jit.x, surfJitter(al, F.cam.w / Tm - x + 1.0, px), ahead);
let hc = rc * thr;
if (rc * jc > 0.7 && hc > ${V.sizeH[0]}) {
let Dc = ${H.crashRun} * hc;
let ro = swRead(swellUV(p + F.bd[0].zw * Dc).xy, 3).x;
let ty = crashType(swRead(q.xy, 5).w, hc);
crash.x = crashRun(rc * jc, ro * jc, select(x, -ya, ahead) * 6.2831853 / (max(P.w, 0.05) * Dc)) * ty * surfSize(hc) * gate * sea * q.z * (1.0 - toMean);
gCrash = crash.x;
}
}
if (d < 0.2 && (dbg & 524288u) == 0u && (x < 0.3 || crash.x > 0.0)) {
let rp = rollerPix(x, S3.x * sea * q.z, d, B, P.w, al, Tm, px, crash);
o.r = rp[0];
o.g = rp[1].xy;
}
if ((dbg & 1024u) != 0u) { return o; }
S3.z = mix(S3.z, qm, x);
let S = vec4f(mix(S3, vec3f(qm), toMean), qm);
let up = -F.bd[0].zw;
let dr = ${V.drift} * F.cam.w;
let pl = p - up * (dr - 4096.0 * floor(dr / 4096.0));
let lv = ${me.lifeVar} * clamp(${V.patch}.0 / max(2.0 * px, 1e-3) - 1.0, 0.0, 1.0);
let life = ${V.life}.0 * clamp(pow(max(hs, 0.01) / 0.3, 0.7), 1.0, 2.5) * exp(lv * nNoise2(pl / (0.7 * ${V.patch}.0), 677) / ${B} - 0.5 * lv * lv);
let bR = clamp(6.2831853 / max(P.w, 0.05) / (${V.trailH} * max(0.7071 * hs, thr)), ${V.rollerB}, 25.0);
let bL = Tm / life;
let b2 = Tm * (1.0 / ${V.onset} + 1.0 / life);
let W = clamp(crestSum(x, S, bR) + qm * crestBox(x, d, bR), 0.0, 1.0);
let Fm = max(crestSum(x, S, bL) - crestSum(x, S, b2) + qm * (crestBox(x, d, bL) - crestBox(x, d, b2)), 0.0);
let cF = 1.0 - exp(-${V.cover} * Fm);
if (max(W, cF) * sea < 0.002) { return o; }
let Wc = min(${H.crashWhite} * crash.x / max(sea * q.z, 1e-3), 1.0) * select(1.0 - smoothstep(0.5 * xr, 1.3 * xr, x), 1.0 - smoothstep(0.6 * aC, aC, ya), ahead);
let Ws = min(max(S.x * exp(-x * bR) * (1.0 - smoothstep(0.5 * xr, 1.3 * xr, x)) * (1.0 - toMean), Wc), 1.0);
let cL = foamPatches(pl, cF, px, ${V.patch}.0, 673.0, ${me.shareP});
let c = 1.0 - (1.0 - max(W - Ws, 0.0) / max(1.0 - Ws, 0.05)) * (1.0 - min(cL, 0.97));
if ((u32(F.rip2.w) & 32768u) != 0u) { gSurfDbg = vec4f(W, ${V.cover} * Fm, S.x, 1.0); }
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
let d = clamp(1.0 + ${K.patchAmp} * kp * nNoise2(p / ${K.patch}, 631) / ${B}, 0.3, 1.8);
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
      let t = max(0.0, ti.x * (1.0 + ${K.width} * k * nNoise2(p / (0.6 * s), 625 + sd) / ${B}));
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
  let gWet = (1.0 - exp(-ageA / ${U.onset})) * exp(-ageA / F.wash.z);
  // (what is left on the sand: strandedKeep of it near the top of the run-up, where the water stops, less lower down, where the backwash
  // runs fast and takes its foam with it (the lower swash is dry only briefly, and lace left there lay just ahead of the next front); the
  // rest shed over 0.4 s, so nothing steps as the point drains; and where the point barely drains (c near 1) the lace stays the water's,
  // so the band that never dries does not step where chi wraps: the review of 2026-11-24)
  let keepE = ${U.strandedKeep} * smoothstep(vec3f(0.2 * 3.14159265), vec3f(0.8 * 3.14159265), chiWn);
  let gDr = (1.0 - exp(-aDr / ${U.onset})) * exp(-aDr / F.wash.z) * (keepE + (1.0 - keepE) * exp(-ageD / 0.4)) * exp(-ageD / F.wash.w);
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
    let front = (1.0 - smoothstep(0.3 * F.wash.y, F.wash.y, level - z)) * (1.0 - exp(-age / ${U.frontOn})) * exp(-age / ${U.frontLife}) * ${U.frontPeak};
    let pl = p - up * clamp(0.25 * T.x / beta, -4.0, 4.0);
    let lace = washLace(pl, 0.55 * min(g, 1.6) * fade, px);
    return vec2f(max(front * fade * (0.75 + 0.25 * nNoise2(p / 0.4, 619)), lace) * q.z, 0.0);      // (the front faded with the rest: the second review)
  }
  // left on the sand after the water has been and gone, where the sheet left it (its carry as the water left, so it does not jump; drawn
  // out a third along the backwash, as stranded foam is)
  let pd = p - up * clamp(0.25 * (z - T.z - fine) / beta, -4.0, 4.0);
  return vec2f(0.0, washLace(pd, 0.55 * min(g, 1.6) * fade, px) * q.z);
}
`,it=.8,at=12,ot=6,st=3,ct=2,lt=.35,ut=68,dt=ut+64,ft=dt+128,pt=ft+80,mt=pt+72,ht=mt+4,gt=ht+4,_t=gt+4,vt=_t+8,yt=vt+4,bt=typeof location<`u`&&new URLSearchParams(location.search).get(`swcull`)===`0`,xt={rollerB:12,cover:.12,onset:.3,patchM:i.patchM,patchFrac:i.patchFrac},St={OFF:0,MAIN:1,TAIL:2},Ct=`
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
`,wt=`
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
  pf: vec4f,           // the breaking parcels' foam field's window in the beach's frame (m): its corner along and across the shore, its far corner (none: all 0)
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
@group(0) @binding(15) var parcelFoamTex: texture_2d<f32>;      // (the breaking parcels' foam, the water's thickness left as foam (m), wrapping)
@group(0) @binding(14) var<storage, read> eyeW: vec4f;      // (x: the water surface's height at the eye's position, worked out this frame by EYE_PROBE)
${le}
${ce}
${nt}
${rt}
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
    let al = dot(p, vec2f(-dir.y, dir.x)) / ${xt.patchM.toFixed(2)};
    let tc = F.cam.w / Tm - x;
    let pa = clamp(${xt.patchM.toFixed(2)} / max(2.0 * px, 1e-3) - 1.0, 0.0, 1.0);
    let sH = sH0;
    let th = 1.4 * (0.5 - pf);
    let c0 = mix(pf, smoothstep(-0.3, 0.3, nNoise2(vec2f(al, tc), 683) / ${B} - th), pa);
    let c1 = mix(pf, smoothstep(-0.3, 0.3, nNoise2(vec2f(al, tc - 1.0), 683) / ${B} - th), pa);
    let c2 = mix(pf, smoothstep(-0.3, 0.3, nNoise2(vec2f(al, tc - 2.0), 683) / ${B} - th), pa);
    S4 = mix(vec4f(sH * c0, sH * c1, sH * mix(c2, pf, x), sH * pf), vec4f(Smean), toMean);      // (the third to the tail's as x wraps)
  }
  let bR = F.wcap[1].z;
  let W = clamp(crestSum(x, S4, bR) + Smean * crestBox(x, d, bR), 0.0, 1.0);
  // the foam: grown in over onset, thinning over the breakers' plume time ( plumeTime, hb about twice a), times the
  // decay time's ratio to it (1.7: decayTime at 0.5 m, 2.6 s against 1.5 s)
  let hb = 2.0 * max(a, sqrt(2.0 * sv)) / max(km, 1e-3);
  let life = 1.7 * clamp(${a().tauP05} * pow(max(hb, 0.02) / 0.5, 0.7), 0.5, 10.0);
  let bL = Tm / life;
  let b2 = Tm * (1.0 / ${xt.onset} + 1.0 / life);
  let Fm = max(crestSum(x, S4, bL) - crestSum(x, S4, b2) + Smean * (crestBox(x, d, bL) - crestBox(x, d, b2)), 0.0);
  let cF = 1.0 - exp(-${xt.cover} * Fm);
  if (max(W, cF) < 0.002) { return 0.0; }
  // (the foam left in patches about half the waves' length across: each whitecap's own, not a net over the whole group)
  let cL = foamPatches(p, cF, px, 3.3 / max(km, 0.01), 691.0, ${me.shareP});
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
/** How far the eye is below the water surface at its position (m; negative when above). From this frame's EYE_PROBE: when the probe was
 *  read back to the CPU a few frames late, the sky showed for a frame or two on going under (Mike, 2026-11-26). */
/** The breaking parcels' foam at p as the share of the surface it covers, drawn as the surf's foam is (in patches, as lace): its thickness
 *  of water left as foam (the field, bilinear, wrapping) to a cover by 1 - e^(-T / PF_T0), faded over 12 m inside the window's edges.
 *  PF_T0 from the field measured on r1-big-spill (, 2026-11-27): about 40 mm left by each bore. */
const PF_T0 = 0.04;
const PF_MAX = 0.85;
fn parcelFoam(p: vec2f, px: f32) -> f32 {
  if (F.pf.z <= F.pf.x) { return 0.0; }
  let off = F.bd[0].zw;
  let d = p - F.bd[0].xy;
  let au = vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off));
  let e = min(min(au.x - F.pf.x, F.pf.z - au.x), min(au.y - F.pf.y, F.pf.w - au.y));
  if (e <= 0.0) { return 0.0; }
  let T = textureSampleLevel(parcelFoamTex, samp, au / ${W.foam.cell.toFixed(4)} / vec2f(${W.foam.n[0]}.0, ${W.foam.n[1]}.0), 0.0).x;
  let cF = PF_MAX * (1.0 - exp(-T / PF_T0)) * smoothstep(0.0, 12.0, e);      // (never quite solid: the lace keeps holes, or the foam reads as flat paint)
  if (cF < 0.002) { return 0.0; }
  return washLace(p, foamPatches(p, cF, px, ${V.patch.toFixed(1)}, 691.0, ${me.shareP}), px);
}
/** How much lower the surface is at p for the water the breaking crests have lost to their parcels (
 *  PARCEL.deficit times the pile's thickness, faded over 12 m inside the parcels' window). */
fn parcelDeficit(p: vec2f) -> f32 {
  if (F.pf.z <= F.pf.x) { return 0.0; }
  let off = F.bd[0].zw;
  let d = p - F.bd[0].xy;
  let au = vec2f(dot(d, vec2f(off.y, -off.x)), dot(d, off));
  let e = min(min(au.x - F.pf.x, F.pf.z - au.x), min(au.y - F.pf.y, F.pf.w - au.y));
  if (e <= 0.0) { return 0.0; }
  let T = textureSampleLevel(parcelFoamTex, samp, au / ${W.foam.cell.toFixed(4)} / vec2f(${W.foam.n[0]}.0, ${W.foam.n[1]}.0), 0.0).y;
  return ${W.deficit.toFixed(4)} * T * smoothstep(0.0, 12.0, e);
}
fn eyeDepth() -> f32 { return eyeW.x - F.cam.y; }
fn underwater() -> bool { return eyeDepth() > 0.0; }
/** The colour of the water itself seen along d from an eye under water (display values): the deep water's colour (F.lk[8]), brighter
 *  looking up, darker looking down and the deeper the eye. A basic underwater look, not a model of the light (Mike, 2026-11-26). */
fn underFog(d: vec3f) -> vec3f {
  let Kd = 0.5 * F.lk[10].xyz;
  return toneEnc(F.lk[8].xyz * mix(0.35, 1.8, smoothstep(-0.6, 0.9, d.y)) * exp(-Kd * max(eyeDepth(), 0.0)));
}
/** col at dist m along d, seen from under water: faded toward the water's colour by the beam's loss (about three times the diffuse
 *  attenuation; F.lk[10] is 2 Kd). */
fn underMix(col: vec3f, d: vec3f, dist: f32) -> vec3f { return mix(underFog(d), col, exp(-1.5 * F.lk[10].xyz * dist)); }
/** A display colour to the target: as it is for the canvas; back to linear for the temporal resolve (GAMMA off), which encodes it again. */
fn present(c: vec3f) -> vec4f { return vec4f(select(pow(max(c, vec3f(0.0)), vec3f(2.2)), c, GAMMA), 1.0); }
`,Tt=(e,t,n=``)=>wt+`
override RIPPLES: bool = true;      // the ripple cascades
override FACETS: u32 = 4u;          // the sky averaged over 4 facets, or 1 (the mean normal's reflection)
override FRAG_SETS: bool = true;    // the sea's sets read again per pixel for the slope (false: a flat normal; a cost test)
override VS_DISP: bool = true;      // the vertices displaced by the sea's sets (false: flat; a cost test)
override SHADE: bool = true;        // the water's shading (false: one colour, the mesh and the raster alone; a cost test)
override DERIV: bool = true;        // the footprint from screen derivatives (false: worked out from the camera; a cost test)
override UNDER: bool = true;        // include the from-below shading. SeaView draws with a copy compiled without it while the eye is well above
                                    // the water: the unused branch alone cost 1.8 ms of the 14 ms measure view on the Mac (2026-11-26)
override BURN: u32 = 0u;            // extra arithmetic a fragment (a cost test: how often the shader runs a pixel, by how MSAA multiplies it)
override SUN_FACETS: bool = true;   // the sun's disc and glare in each facet's mirror (false: a cost test)
override REGIMES: u32 = 1u;         // each ripple band by what the pixel makes of it (bits): 1 averaged away (its known variance, no reads; the same picture), 2 resolved (no read of the squares: sharpens the glitter, learnings 39, off); else read in full
@group(1) @binding(0) var env: texture_2d<f32>;      // the sky map for reflections (display values and the clouds' opacity, octahedral): drawn when the look or the sun changes
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
${Ct}
struct VO { @builtin(position) pos: vec4f, @location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32, @location(3) ${n} bias: f32, @location(4) ${n} br: vec4f };
// the fragment's inputs: without the position unless fsPos (a cost test: whether a fragment input of the position changes how often the shader runs)
struct FI { ${t?`@builtin(position) pos: vec4f, `:``}@builtin(front_facing) below: bool, @location(0) ${n} p0: vec2f, @location(1) ${n} world: vec3f, @location(2) ${n} h: f32, @location(3) ${n} bias: f32, @location(4) ${n} br: vec4f };
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
  h -= parcelDeficit(p);      // (the water the crest has lost to the parcels riding it)
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
  let cRes = ${lt} * (1.0 - smoothstep(20.0, 35.0, dist));
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
  let pfo = select(0.0, parcelFoam(i.p0, px), bedOn());      // (the breaking parcels' foam on the water)
  col = mix(col, vec3f(0.95, 0.97, 0.98) * (0.70 + 0.40 * sunVis), pfo);
  // (the breaking crest's roller over it, the white's solid part: solid at the toe, broken into its lumps behind (rollerWhite), lit as
  // white water is, scattering many times: wrapped round past its bulk's sides, a sky's worth of light in their shade, darker in the
  // hollows between its lumps)
  let rW = rollerWhite(rlF, surfW, ${H.edge}, px);
  // (its normal's light as the water's, NdLs (the bulk's shape is in the water's normal), tilted by its churn's relief (surfAt's g), its
  // churn's hollows darker)
  let NdLr = (NdLs - sf.g.x * F.sun.x + sf.g.y * F.sun.z) / sqrt(1.0 + dot(sf.g, sf.g));
  // (white water in its own shade stays bright: light scattered many times through it, and the sky's; Mike's City Beach photographs, 2026-11-25,
  // a white roll in the evening light with no grey in it; a little of the sky's blue in the shade)
  let litR = (0.74 + 0.36 * sunVis * clamp((NdLr + 0.4) / 1.4, 0.0, 1.0)) * (0.86 + 0.18 * rlF.z);
  col = mix(col, mix(vec3f(0.86, 0.92, 1.0), vec3f(0.97, 0.98, 0.98), smoothstep(0.75, 1.05, litR)) * litR, rW);
  col = mix(col, vec3f(0.95, 0.97, 0.98) * (0.70 + 0.40 * sunVis), wash);      // (the shore wash's foam: thin, flat and bright, as the Rottnest video's)
  // the eye under the water: the surface seen from below, the sky through Snell's window and the water below reflected outside it (total
  // internal reflection), the whitewater as a dim cover, through the water to the eye
  // Which side to draw from: normally the probe's answer for the eye. Within 40 m, with the eye within 1.5 m of the surface, each
  // triangle's facing decides instead (the mesh's winding makes it front-facing seen from below), so a view half in a wave draws both
  // parts right (Mike's waterline tear, 2026-11-26).
  if (UNDER && select(underwater(), i.below, dist < 40.0 && abs(eyeDepth()) < 1.5)) {
    if ((dbg & 16777216u) != 0u) { return vec4f(0.0, 0.0, 1.0, 1.0); }
    let rd = -V;
    let tr = refract(rd, -Nw, 1.3333);
    let refl = underFog(reflect(rd, -Nw));
    var uc = refl;
    if (dot(tr, tr) > 1e-6) { uc = mix(skyMap(tr).rgb, refl, schlick(dot(tr, Nw))); }
    uc = mix(uc, vec3f(0.62, 0.68, 0.72), 0.85 * max(max(rW, wash), max(max(surf, wcap), pfo)));
    return present(underMix(uc, rd, dist));
  }
  // the air between: the distance fades the sea toward the sky just above the horizon in that direction, per channel (the blue first)
  col = mix(col, skyMap(normalize(vec3f(-V.x, 0.012, -V.z))).rgb, clamp(1.0 - exp(-F.lk[3].xyz * dist), vec3f(0.0), vec3f(1.0)));
  if ((dbg & 8192u) != 0u) { return gWashDbg; }      // (debug 8192: the wash's c0 (red, 0.5 at the slow level), its phase (green), its band (blue))
  if ((dbg & 4194304u) != 0u) { return vec4f(mix(col, vec3f(1.0, 0.0, 1.0), clamp(2.0 * gCrash, 0.0, 1.0)), 1.0); }      // (debug 4194304: the coming crests' crash over the picture, magenta)
  if ((dbg & 32768u) != 0u) { return gSurfDbg; }      // (debug 32768: the surf's roller (red), foam (green), last crest's strength (blue))
  if ((dbg & 131072u) != 0u) { return vec4f(wcap, 1.0 - (1.0 - surf) * (1.0 - rW), wash, 1.0); }      // (debug 131072: the foams' shares, linear, for measuring their cover: red the whitecaps, green the surf's (its lace and its roller's white), blue the wash's)
  if ((dbg & 1048576u) != 0u) { return vec4f(clamp(breakGeom(i.p0, 0.05).dh * 10.0, 0.0, 1.0), rW, rlF.z * step(1e-4, rlF.y), 1.0); }      // (debug 1048576: the breaking crests' height x 10 (red, m: worked out again here, as the mesh's held through the shading cost 1.8 ms of the view's 16.5 on the Mac), the roller's white (green), its lumps (blue))
  if ((dbg & 8u) != 0u) { return vec4f(length(sN) / 2.0, length(sl) / 2.0, ripRough * 10.0, 1.0); }
  if ((dbg & 64u) != 0u) { let sv = swellAt(i.p0); let fw = select(0.0, max(surf, wcap), (dbg & 262144u) != 0u); return vec4f(mix(vec3f(0.5 + sv.x, 0.5 + sv.x, 0.5 - sv.x), vec3f(1.0), fw), 1.0); }      // (with 262144: the surf's foam and the whitecaps over it in white)      // the swell's height alone (64: red-yellow crests, blue troughs; 0.5 at still water)      // the slopes: r the drawn one, g the waves' alone (/ 2), b the ripples' roughness (x 10)
  if (dry) { return present(dryCol); }
  return present(col + vec3f(burn * 1e-6));
}
`,Et=wt+`
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
`,Dt=wt+`
@group(1) @binding(0) var<storage, read_write> probeOut: vec4f;
fn surfaceAt(p0: vec2f) -> vec3f {
  var h = 0.0;
  var disp = vec2f(0.0);
  for (var s = 0u; s < u32(F.sea.x); s++) {
    let S = F.sets[s];
    let lod = max(0.0, log2(0.1 * N / S.x));
    if (S.w == 0.0 || lod > 5.0 + S.y) { continue; }
    let a = textureSampleLevel(t0, samp, p0 / S.x + 0.5 / N, s, lod);
    h += a.x;
    disp += F.sea.y * a.zw;
  }
  let gw = bedWaveGain(p0);
  h *= gw;
  disp *= gw;
  let sv = swellAt(p0);
  h += sv.x;
  disp += sv.yz;
  h += F.wave.x * h * h * F.wave.y;
  if (bedOn()) { let bg = breakGeom(p0, 0.1); h += bg.dh; disp += bg.d; }
  h -= parcelDeficit(p0);
  return vec3f(h, disp);
}
@compute @workgroup_size(1) fn eyeProbe() {
  let eye = vec2f(F.cam.x, F.cam.z);
  var p = eye;
  for (var k = 0; k < 3; k++) { p = eye - surfaceAt(p).yz; }
  probeOut = vec4f(surfaceAt(p).x, 0.0, 0.0, 1.0);
}
`,Ot=wt+`
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
  // The eye under water: the water's colour. Also when the eye is within 1.5 m of the surface and a ray going down met no water before
  // the mesh's end: the eye is inside the crest beside it.
  if (underwater() || (d.y < 0.0 && eyeDepth() > -1.5 && F.cam.y < 2000.0 * -d.y)) {
    if ((u32(F.rip2.w) & 16777216u) != 0u) { return vec4f(0.0, 1.0, 0.0, 1.0); }
    return present(underFog(d));
  }
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
`,kt=e=>wt+`
@group(1) @binding(0) var env: texture_2d<f32>;
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
${Ct}
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
/** The bed seen from under water, faded by the water between. */
fn groundUnder(i: GO, px: f32) -> vec4f {
  if ((u32(F.rip2.w) & 16777216u) != 0u) { return vec4f(1.0, 0.0, 0.0, 1.0); }
  let toE = vec3f(F.cam.x, F.cam.y, -F.cam.z) - i.world;
  return present(underMix(groundShade(i.p, i.world, px), -normalize(toE), length(toE)));
}
@fragment fn fs(i: GO) -> @location(0) vec4f {
  let px = max(length(dpdx(i.p)), length(dpdy(i.p)));
  if (underwater()) { return groundUnder(i, px); }
  // Wet bed is drawn by the water in front of it, so it is dropped here. But with the eye within 0.3 m of the surface, part of the view
  // can be inside a wave with no surface between the eye and the bed: then draw it as seen under water. Where there is a surface in
  // front, the water's pixel covers this one.
  let atSurface = eyeDepth() > -0.3;
  if (bedRaw(i.p, px).x < -0.6) { if (atSurface) { return groundUnder(i, px); } discard; }
  // where the swell's level at this pixel is above the bed here, the water is there and draws it: the ground's facets (metres across far
  // off) would otherwise cut the water's edge into their straight-sided teeth
  if (swellEdge(i.p) > 0.0 && swellAt(i.p).x > bedYC(i.p, px)) { if (atSurface) { return groundUnder(i, px); } discard; }
  if ((u32(F.rip2.w) & 2048u) != 0u) { let r = bedRaw(i.p, px); return vec4f(r.y, bedMat(i.p, px).y, clamp(px / 64.0, 0.0, 1.0), 1.0); }      // (debug 2048: the cover's zone, its share and the footprint / 64 m)
  return present(groundShade(i.p, i.world, px));
}
`;function At(i,a,o,s={},{micro:c=1,debug:l=0}={}){let u=_(m(s),c),d=a.sets;i.set([.15*(s.stokes??0)*(s.stats?.sharpWeight??1),1/Math.max(.05,s.stats?.hs??0),s.ripples?.sharp??1,0],44),i.set(u.on?[u.dir[0],u.dir[1],u.amount*Math.sqrt(t(u.windMs,u.res)),1]:[1,0,0,0],48),i.set([...u.amp,u.on?u.sharp:1],52),i.set([e.cut,+!!a.tails?.length,1,l],56),i.set(A.map(e=>e[2]),60);for(let e=0;e<32;e++){let t=d[e],r=e>=o||t.band===n.WIND_L||t.band===n.WIND_R?St.OFF:t.band===n.TAIL?St.TAIL:St.MAIN;i.set(e<o?[t.L,(t.span??1)-1,t.slopeVar??0,r]:[1,0,0,0],dt+4*e)}let f=-1,p=0;for(let e=0;e<o;e++){let t=d[e];t.band===n.WIND&&!t.tail&&(t.var??0)>p&&(p=t.var,f=e)}if(f>=0){let e=d[f],t=0,n=0,r=0,a=0;for(let i=0;i<e.n;i++){let o=e.re[i]*e.re[i]+e.im[i]*e.im[i];t+=o,n+=o*e.kk[i],r+=o*e.ux[i],a+=o*e.uy[i]}let o=Math.hypot(r,a)||1;i.set([f+1,n/Math.max(t,1e-30),r/o,a/o],_t)}else i.set([0,1,1,0],_t);return i.set([r.s0,r.sd,xt.rollerB,xt.patchFrac],_t+4),i}var jt={msaa:4,grid:32,ripples:!0,facets:4,fragSets:!0,vsDisp:!0,shade:!0,fsPos:!1,deriv:!0,burn:0,skyBurn:0,interp:``,target:`canvas`,depth:`depth32float`,rs:.7,detail:null,regimes:1,sunFacets:!0,dbg:0,ground:!0,swell:!0},Mt=`rgba16float`,Nt=class{constructor(e,t,{msaa:n=4,format:r=navigator.gpu.getPreferredCanvasFormat(),timestamps:i=!1,grid:a=32,patch0:o=4,levels:s=12,rangeK:c=6}={}){if(c*.30000000000000004<Math.SQRT2)throw Error(`rangeK ${c} is too small: the mesh would crack (at least ${(Math.SQRT2/.30000000000000004).toFixed(2)})`);Object.assign(this,{device:e,canvas:t,format:r,patch0:o,rangeK:c,levels:Math.min(s,16)}),this.ctx=t.getContext(`webgpu`),this.ctx.configure({device:e,format:r,alphaMode:`opaque`});let l=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT|GPUShaderStage.COMPUTE;this.bgl=e.createBindGroupLayout({entries:[{binding:0,visibility:l,buffer:{type:`uniform`}},{binding:1,visibility:l,sampler:{type:`filtering`}},...[2,3,4,5,6].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}})),...[7,8].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}})),{binding:9,visibility:l,sampler:{type:`filtering`}},{binding:10,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}},{binding:11,visibility:l,texture:{sampleType:`float`,viewDimension:`2d-array`}},{binding:13,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}},{binding:14,visibility:l,buffer:{type:`read-only-storage`}},{binding:15,visibility:l,texture:{sampleType:`float`,viewDimension:`2d`}}]}),this.foamNone=e.createTexture({size:[1,1],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING}),this.swellNone=e.createTexture({size:[1,1,6],format:`rgba16float`,usage:GPUTextureUsage.TEXTURE_BINDING}),this.bedTex=tt(e),this.bedOut=tt(e),this.bedU=et(null),this.envLayout=e.createPipelineLayout({bindGroupLayouts:[this.bgl]}),this.bglEnv=e.createBindGroupLayout({entries:[0,1].map(e=>({binding:e,visibility:l,texture:{sampleType:`float`,viewDimension:e?`cube`:`2d`}}))}),this.layout=e.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv]}),this.probeBuf=e.createBuffer({label:`eye probe`,size:16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),this.eyeBuf=e.createBuffer({label:`eye water`,size:16,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),e.queue.writeBuffer(this.eyeBuf,0,new Float32Array([-1e4,0,0,0]));let u=e.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.COMPUTE,buffer:{type:`storage`}}]});this.probeBG=e.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:this.probeBuf}}]}),this.probeMod=e.createShaderModule({label:`eye probe`,code:Dt}),this.probePipe=e.createComputePipeline({label:`eye probe`,layout:e.createPipelineLayout({bindGroupLayouts:[this.bgl,u]}),compute:{module:this.probeMod,entryPoint:`eyeProbe`}});let d=(t,n,r=1,i=Mt)=>e.createTexture({label:t,size:[n,n,r],format:i,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING});this.env=d(`sky map`,256),this.domes=[d(`dome cube A`,512,6,`rgba8unorm`),d(`dome cube B`,512,6,`rgba8unorm`)],this.domeFront=0,this.domeStrip=-1,this.domeReady=!1,this.bgEnvs=this.domes.map(t=>e.createBindGroup({layout:this.bglEnv,entries:[{binding:0,resource:this.env.createView()},{binding:1,resource:t.createView({dimension:`cube`})}]}));let f=e.createShaderModule({code:Et,label:`sky map`}),p=(t,n,r)=>e.createRenderPipeline({layout:this.envLayout,label:`sky map ${t} ${n}`,vertex:{module:f,entryPoint:`vs`},fragment:{module:f,entryPoint:`fs`,constants:{MAP_N:t,FACE:n,LODK:r},targets:[{format:n<0?Mt:`rgba8unorm`}]}});this.envPipe=p(256,-1,9),this.facePipes=[0,1,2,3,4,5].map(e=>p(512,e,2)),this.envMod=f,this.envKey=null,this.skyModule=e.createShaderModule({code:Ot,label:`sky`}),this.byGrid=new Map,this.pipes=new Map,this.uni=e.createBuffer({size:yt*4,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(yt),this.samp=e.createSampler({magFilter:`linear`,minFilter:`linear`,mipmapFilter:`linear`,addressModeU:`repeat`,addressModeV:`repeat`,maxAnisotropy:2}),this.skySamp=e.createSampler({magFilter:`linear`,minFilter:`linear`}),this.look=new fe(e).set(),this.instMax=2048,this.instF=new Float32Array(this.instMax*4),this.inst=e.createBuffer({size:this.instF.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),this.timestamps=i,i&&(this.qs=e.createQuerySet({type:`timestamp`,count:6}),this.qres=e.createBuffer({size:48,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.qread=[],this.gpu={fft:[],draw:[],post:[],tagged:[]}),this.size=``,this.cpuMs=[],this.doneMs=[],this.readMs=[],this.frameNo=0,this.inFlight=0,this.setVariant({msaa:n,grid:a}),this.modules=[this._grid(a).module,this.skyModule,this.envMod]}_grid(e,t=!1,n=``){let r=this.byGrid.get(`${e} ${t} ${n}`);if(!r){let i=new Uint16Array(e*e*6),a=0;for(let t=0;t<e;t++)for(let n=0;n<e;n++){let r=t*(e+1)+n,o=r+1,s=r+e+1,c=s+1;i.set([r,s,o,o,s,c],a),a+=6}let o=this.device.createBuffer({size:i.byteLength,usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST});this.device.queue.writeBuffer(o,0,i),r={module:this.device.createShaderModule({code:Tt(e,t,n),label:`water ${e}`}),idx:o},this.byGrid.set(`${e} ${t} ${n}`,r)}return r}_ground(e){return this.groundMods??=new Map,this.groundMods.has(e)||this.groundMods.set(e,this.device.createShaderModule({code:kt(e),label:`ground ${e}`})),this.groundMods.get(e)}setVariant(e={}){let t={...jt,...e},n=JSON.stringify({...t,dbg:0,ground:!0,swell:!0}),r=this.device,i=this.pipes.get(n);if(!i){let e=t.target===`temporal`,a=this._grid(t.grid,t.fsPos,t.interp),o={count:e?1:t.msaa},s=t.target===`hdr`||e?Mt:this.format,c=t.depth,l=[{format:s}],u=this.skyModule,d={RIPPLES:+!!t.ripples,FACETS:t.facets,FRAG_SETS:+!!t.fragSets,VS_DISP:+!!t.vsDisp,SHADE:+!!t.shade,DERIV:+!!t.deriv,BURN:t.burn,GAMMA:+!e,REGIMES:t.regimes||0,SUN_FACETS:+!!t.sunFacets},f=e=>({layout:this.layout,label:`water ${e?`under `:``}${n}`,vertex:{module:a.module,entryPoint:`vs`,constants:d,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:a.module,entryPoint:`fs`,constants:{...d,UNDER:+!!e},targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o});i={water:r.createRenderPipeline(f(!1)),waterUnder:null,sky:r.createRenderPipeline({layout:this.layout,label:`sky`,vertex:{module:u,entryPoint:`vs`},fragment:{module:u,entryPoint:`fs`,constants:{BURN:t.skyBurn,GAMMA:+!e},targets:l},depthStencil:{format:c,depthWriteEnabled:!1,depthCompare:`greater-equal`},multisample:o}),idx:a.idx,parcels:this.parcels?r.createRenderPipeline({layout:r.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv,this.parcels.bglR]}),label:`parcels`,vertex:{module:this._parcelModule(),entryPoint:`pvs`},fragment:{module:this._parcelModule(),entryPoint:`pfs`,constants:{GAMMA:+!e},targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}):null,splat:this.parcels&&!e&&t.msaa===1?r.createRenderPipeline({layout:r.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv,this.parcels.bglR,this.bglDepth]}),label:`parcels splat`,vertex:{module:this._parcelModule(),entryPoint:`pvs`},fragment:{module:this._parcelModule(),entryPoint:`psplat`,targets:[{format:this._blobFormat(),blend:{color:{operation:`min`,srcFactor:`one`,dstFactor:`one`},alpha:{srcFactor:`one`,dstFactor:`one`}}}]},primitive:{topology:`triangle-list`,cullMode:`none`}}):null,norm:this.parcels&&!e&&t.msaa===1?r.createRenderPipeline({layout:r.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv,this.parcels.bglR,this.bglDepthN]}),label:`parcels normals`,vertex:{module:this._parcelModule(),entryPoint:`pvs`},fragment:{module:this._parcelModule(),entryPoint:`pnorm`,targets:[{format:`rgba16float`,blend:{color:{srcFactor:`one`,dstFactor:`one`},alpha:{srcFactor:`one`,dstFactor:`one`}}}]},primitive:{topology:`triangle-list`,cullMode:`none`}}):null,comp:this.parcels&&!e&&t.msaa===1?r.createRenderPipeline({layout:r.createPipelineLayout({bindGroupLayouts:[this.bgl,this.bglEnv,this.bglBlob]}),label:`parcels body`,vertex:{module:this._compModule(),entryPoint:`cvs`},fragment:{module:this._compModule(),entryPoint:`cfs`,constants:{GAMMA:+!e},targets:[{format:s,blend:{color:{srcFactor:`src-alpha`,dstFactor:`one-minus-src-alpha`},alpha:{srcFactor:`one`,dstFactor:`one-minus-src-alpha`}}}]},primitive:{topology:`triangle-list`}}):null,ground:this.bedOn?r.createRenderPipeline({layout:this.layout,label:`ground ${t.grid}`,vertex:{module:this._ground(t.grid),entryPoint:`vs`,buffers:[{arrayStride:16,stepMode:`instance`,attributes:[{shaderLocation:0,offset:0,format:`float32x4`}]}]},fragment:{module:this._ground(t.grid),entryPoint:`fs`,constants:{GAMMA:+!e},targets:l},primitive:{topology:`triangle-list`,cullMode:`none`},depthStencil:{format:c,depthWriteEnabled:!0,depthCompare:`greater`},multisample:o}):null},this.pipes.set(n,i);let p=i;r.createRenderPipelineAsync(f(!0)).then(e=>{p.waterUnder=e},e=>console.error(`water under: ${e.message}`))}this.pipeSet=i,this.variant=t,this.water=i.water,this.sky=i.sky,this.idx=i.idx,this.groundPipe=i.ground,this.parcelPipe=i.parcels,this.splatPipe=i.splat,this.compPipe=i.comp,this.normPipe=i.norm,this.msaa=t.target===`temporal`?1:t.msaa,this.grid=t.grid,t.target===`temporal`&&!this.temporal&&(this.temporal=new Ee(this.device,this.format)),t.target===`hdr`&&!this.blit&&this._makeBlit();for(let e=0;e<this.levels;e++){let n=this.patch0*2**e,r=this.rangeK*n;this.uniF.set([n/t.grid,it*r,r,n],ut+4*e)}}setSea(e,t,n={},{micro:r=1,debug:i=0}={}){this.fft=e,this.rip=t,t.setShape(n.ripples),At(this.uniF,e.sea,e.nS,n,{micro:r,debug:i}),this.debug=i,this.chop=n.chop??1,this._bind()}setBed(e,t=[0,0],n=180,r=void 0){this.bedTex.destroy(),this.bedTex=tt(this.device,e),this.bedU=et(e,t,n,r),this.bedOut.destroy(),this.bedOut=tt(this.device,e?.outer??null),this.bedOn=!!e,this.pipes.clear(),this.setVariant(this.variant??{}),this.fft&&this._bind()}setWetLine(e){this.bedU[9]=e}setSwell(e){this.swell=e,this.fft&&this._bind()}setParcels(e){if(this.parcels=e,e){e.build(wt,this.bgl);let t=GPUShaderStage.FRAGMENT;this.bglDepth??=this.device.createBindGroupLayout({entries:[{binding:0,visibility:t,texture:{sampleType:`depth`}}]}),this.bglBlob??=this.device.createBindGroupLayout({entries:[{binding:0,visibility:t,texture:{sampleType:`unfilterable-float`}},{binding:1,visibility:t,texture:{sampleType:`unfilterable-float`}}]}),this.bglDepthN??=this.device.createBindGroupLayout({entries:[{binding:0,visibility:t,texture:{sampleType:`depth`}},{binding:1,visibility:t,texture:{sampleType:`unfilterable-float`}}]}),this.size=null}this.fft&&this.look&&this._bind(),this.pipes.clear(),this.setVariant(this.variant??{})}_blobFormat(){return this.device.features.has(`float32-blendable`)?`rgba32float`:`rgba16float`}_compModule(){return this.compMod||=this.device.createShaderModule({label:`parcels body`,code:wt+`
@group(1) @binding(0) var env: texture_2d<f32>;
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
`+Se}),this.compMod}_parcelModule(){return this.parcelMod||=this.device.createShaderModule({label:`parcels`,code:wt+`
@group(1) @binding(0) var env: texture_2d<f32>;
fn skyMap(d: vec3f) -> vec4f { return textureSampleLevel(env, skySamp, octUV(d), 0.0); }
`+xe}),this.parcelMod}setLook(e){this.look=e,this.fft&&this._bind()}_bind(){let e=this.fft,t=this.rip;this.bg=this.device.createBindGroup({layout:this.bgl,entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:this.samp},...[...e.out,...t.out].map((e,t)=>({binding:2+t,resource:e.createView({dimension:`2d-array`})})),{binding:7,resource:this.look.rayleigh.createView()},{binding:8,resource:this.look.mie.createView()},{binding:9,resource:this.skySamp},{binding:10,resource:this.bedTex.createView()},{binding:13,resource:this.bedOut.createView()},{binding:11,resource:(this.swell?.out??this.swellNone).createView({dimension:`2d-array`})},{binding:14,resource:{buffer:this.eyeBuf}},{binding:15,resource:(this.parcels?.foamTex??this.foamNone).createView()}]})}_targets(){let e=this.canvas.width,t=this.canvas.height,n=this.variant,r=n.target===`temporal`,i=[e,t,this.msaa,n.target,n.depth,n.rs].join(` `);if(i===this.size)return;this.size=i,this.colorMS?.destroy(),this.depth?.destroy(),this.hdrTex?.destroy(),this.hdrTex=null,this.tColor?.destroy(),this.tColor=null;let a=r?Math.max(1,Math.round(e*n.rs)):e,o=r?Math.max(1,Math.round(t*n.rs)):t;this.renderSize=[a,o];let s=n.target===`hdr`?Mt:this.format,c=GPUTextureUsage.RENDER_ATTACHMENT;this.colorMS=this.msaa>1?this.device.createTexture({size:[a,o],format:s,sampleCount:this.msaa,usage:c}):null;let l=this.parcels&&!r&&this.msaa===1;this.depth=this.device.createTexture({size:[a,o],format:n.depth,sampleCount:this.msaa,usage:c|(r||l?GPUTextureUsage.TEXTURE_BINDING:0)}),this.blobTex?.destroy(),this.blobTex=null,l&&(this.blobTex=this.device.createTexture({label:`parcels body`,size:[a,o],format:this._blobFormat(),usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.bgDepth=this.device.createBindGroup({layout:this.bglDepth,entries:[{binding:0,resource:this.depth.createView({aspect:`depth-only`})}]}),this.blobN?.destroy(),this.blobN=this.device.createTexture({label:`parcels normals`,size:[a,o],format:`rgba16float`,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.bgBlob=this.device.createBindGroup({layout:this.bglBlob,entries:[{binding:0,resource:this.blobTex.createView()},{binding:1,resource:this.blobN.createView()}]}),this.bgDepthN=this.device.createBindGroup({layout:this.bglDepthN,entries:[{binding:0,resource:this.depth.createView({aspect:`depth-only`})},{binding:1,resource:this.blobTex.createView()}]})),r&&(this.tColor=this.device.createTexture({size:[a,o],format:Mt,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.temporal.resize(a,o,e,t)),n.target===`hdr`&&(this.hdrTex=this.device.createTexture({size:[a,o],format:Mt,usage:c|GPUTextureUsage.TEXTURE_BINDING}),this.blitBG=this.device.createBindGroup({layout:this.blit.getBindGroupLayout(0),entries:[{binding:0,resource:this.hdrTex.createView()}]}))}_makeBlit(){let e=this.device.createShaderModule({label:`blit`,code:`
@group(0) @binding(0) var src: texture_2d<f32>;
@vertex fn vs(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f { return vec4f(vec2f(f32((vi << 1u) & 2u), f32(vi & 2u)) * 2.0 - 1.0, 0.0, 1.0); }
@fragment fn fs(@builtin(position) p: vec4f) -> @location(0) vec4f { return textureLoad(src, vec2u(p.xy), 0); }
`});this.blit=this.device.createRenderPipeline({layout:`auto`,label:`blit`,vertex:{module:e,entryPoint:`vs`},fragment:{module:e,entryPoint:`fs`,targets:[{format:this.format}]}})}_select(e,t){let n=this.instF,r=this.patch0,i=this.levels-1,a=e.e,o=e.n,s=e.h,c=e=>[t[e],t[4+e],t[8+e],t[12+e]],l=c(0),u=c(1),d=c(2),f=c(3),p=[f.map((e,t)=>e+l[t]),f.map((e,t)=>e-l[t]),f.map((e,t)=>e+u[t]),f.map((e,t)=>e-u[t]),f.map((e,t)=>e-d[t])],m=(e,t,n)=>{let r=e-a-ot,i=r+n+12,s=o-t-n-ot,c=s+n+12;for(let[e,t,n,a]of p)if(e*(e>0?i:r)+t*(t>0?at:-12)+n*(n>0?c:s)+a<0)return!1;return!0},h=e=>this.rangeK*r*2**e,g=(e,t,n)=>Math.hypot(Math.max(e-a,0,a-e-n),Math.max(t-o,0,o-t-n),s),_=0,v=this.perLevel=Array(this.levels).fill(0),y=(e,t,i)=>{_<this.instMax&&(n.set([e,t,r*2**i,i],4*_),_++,v[i]++)},b=(e,t,n)=>{let i=r*2**n,a=g(e,t,i);if(a>h(n))return!1;if(!m(e,t,i))return!0;if(n===0||a>h(n-1))return y(e,t,n),!0;let o=i/2;for(let[r,i]of[[0,0],[o,0],[0,o],[o,o]])!b(e+r,t+i,n-1)&&m(e+r,t+i,o)&&y(e+r,t+i,n-1);return!0},x=r*2**i,S=h(i);for(let e=Math.floor((a-S)/x);e<=Math.floor((a+S)/x);e++)for(let t=Math.floor((o-S)/x);t<=Math.floor((o+S)/x);t++)b(e*x,t*x,i);return _}_waterPipe(e){let t=this.eyeWater==null?0:this.eyeWater-e.h;return this.nearSurface=this.eyeWater==null||t>(this.nearSurface?-.8:-.6),this.nearSurface&&this.pipeSet?.waterUnder||this.water}ready(){return this.inFlight<ct}frame(e,t,{exposure:n=1.4,chop:r=this.chop??1,sunDir:i=[.3,.45,-.84],load:a=1,tag:o=null}={}){let s=performance.now(),c=this.device;this._targets();let[l,u]=this.renderSize,d=this.uniF,f=this.variant.target===`temporal`,p=Math.cos(e.yaw),m=Math.sin(e.yaw),h=Math.cos(e.pitch),g=Math.sin(e.pitch),_=[m*h,g,-p*h],v=[p,0,m],y=[v[1]*_[2]-v[2]*_[1],v[2]*_[0]-v[0]*_[2],v[0]*_[1]-v[1]*_[0]],b=[0,e.h,0],x=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],S=[v[0],y[0],-_[0],0,v[1],y[1],-_[1],0,v[2],y[2],-_[2],0,-x(v,b),-x(y,b),x(_,b),1],C=l/u,w=Math.tan(e.fov*Math.PI/360),T=[1/(C*w),0,0,0,0,1/w,0,0,0,0,0,-1,0,0,.05,0],E=Ft(T,S),D=E,O=[0,0];if(f){O=this.temporal.jitter?Te(this.frameNo):[0,0];let t=T.slice();t[8]=-2*O[0]/l,t[9]=-2*O[1]/u,D=Ft(t,S);let n=this.prevCam??[e.e,e.n],r=[1,0,0,0,0,1,0,0,0,0,1,0,e.e-n[0],0,-(e.n-n[1]),1],i=Math.hypot(e.e-n[0],e.n-n[1])>50||!this.prevVP;i&&this.temporal.reset(),this.reproj=Ft(Ft(i?E:this.prevVP,r),De(E)),this.prevVP=E,this.prevCam=[e.e,e.n]}d.set(D,0),d.set([e.e,e.h,e.n,t],16);let k=Math.hypot(...i);d.set([i[0]/k,i[1]/k,i[2]/k,st],20),d.set([l,u,1/l,1/u],24),d.set([this.fft.nS,r,n,f?this.variant.detail??.5*this.variant.rs:1],28),d.set(this.look.values,ft),d.set(this.bedU,pt);let A=this.variant.swell?this.swell:null;d.set(A?A.map:[0,0,0,0],mt),d.set(A?.wash??[0,0,0,0],ht),d.set(A?.sea??[0,0,0,0],gt),d.set(A&&this.parcels?.window?this.parcels.window:[0,0,0,0],vt),d[59]=(this.debug??0)|this.variant.dbg,d.set([v[0]*w*C,v[1]*w*C,v[2]*w*C,0,y[0]*w,y[1]*w,y[2]*w,0,_[0],_[1],_[2],0],32);let j=this._select(e,D);c.queue.writeBuffer(this.uni,0,d),c.queue.writeBuffer(this.inst,0,this.instF,0,j*4);let M=c.createCommandEncoder(),ee=this.timestamps,N=M.beginComputePass(ee?{timestampWrites:{querySet:this.qs,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});this.fft.encode(N,t),this.rip.encode(N,t),A?.encode(N,t,this.variant.swellCull===!1||f||bt||this.parcels?null:{vp:E,cam:[e.e,e.n],frame:[this.bedU[0],this.bedU[1],this.bedU[2],this.bedU[3]]});let P=A&&this.bedOn&&this.parcelPipe?this.parcels:null;P?.encode(N,t,this.bg,[this.bedU[0],this.bedU[1],this.bedU[2],this.bedU[3]],e),N.setPipeline(this.probePipe),N.setBindGroup(0,this.bg),N.setBindGroup(1,this.probeBG),N.dispatchWorkgroups(1),N.end(),M.copyBufferToBuffer(this.probeBuf,0,this.eyeBuf,0,16);let F=this.prbBusy?null:this.prb??=c.createBuffer({label:`eye probe read`,size:16,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});F&&M.copyBufferToBuffer(this.probeBuf,0,F,0,16),P?.readback(M);let te=`${this.look.version} ${d[20].toFixed(5)} ${d[21].toFixed(5)} ${d[22].toFixed(5)}`,ne=(e,t)=>{let n=M.beginRenderPass({colorAttachments:[{view:e,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]});n.setPipeline(t),n.setBindGroup(0,this.bg),n.draw(3),n.end()},re=(e,t)=>e.createView({dimension:`2d`,baseArrayLayer:t,arrayLayerCount:1});if(te!==this.envKey){if(this.envKey=te,ne(this.env.createView(),this.envPipe),this.domeReady)this.domeStrip=0;else{for(let e=0;e<6;e++)ne(re(this.domes[this.domeFront],e),this.facePipes[e]);this.domeReady=!0}}this.domeStrip>=0&&(ne(re(this.domes[1-this.domeFront],this.domeStrip),this.facePipes[this.domeStrip]),++this.domeStrip===6&&(this.domeFront=1-this.domeFront,this.domeStrip=-1));let I=this.ctx.getCurrentTexture().createView(),L=this.tColor?this.tColor.createView():this.hdrTex?this.hdrTex.createView():I,R=P&&this.splatPipe&&this.normPipe&&this.compPipe&&this.blobTex&&!((this.debug??0)&8388608);for(let t=0;t<a;t++){let n=t===a-1,r=ee&&(t===0||n)?{querySet:this.qs,...t===0?{beginningOfPassWriteIndex:2}:{},...n&&!R?{endOfPassWriteIndex:3}:{}}:null,i=M.beginRenderPass({colorAttachments:[this.colorMS?{view:this.colorMS.createView(),resolveTarget:L,loadOp:`clear`,storeOp:`discard`,clearValue:[0,0,0,1]}:{view:L,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}],depthStencilAttachment:{view:this.depth.createView(),depthClearValue:0,depthLoadOp:`clear`,depthStoreOp:this.tColor||R?`store`:`discard`},...r?{timestampWrites:r}:{}});if(i.setBindGroup(0,this.bg),i.setBindGroup(1,this.bgEnvs[this.domeFront]),j&&this.groundPipe&&this.variant.ground&&(i.setPipeline(this.groundPipe),i.setVertexBuffer(0,this.inst),i.setIndexBuffer(this.idx,`uint16`),i.drawIndexed(this.grid*this.grid*6,j)),j&&(i.setPipeline(this._waterPipe(e)),i.setVertexBuffer(0,this.inst),i.setIndexBuffer(this.idx,`uint16`),i.drawIndexed(this.grid*this.grid*6,j)),R||P?.draw(i,this.parcelPipe),i.setPipeline(this.sky),i.draw(3),i.end(),R){let e=M.beginRenderPass({colorAttachments:[{view:this.blobTex.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[6e4,6e4,6e4,0]}]});e.setBindGroup(0,this.bg),e.setBindGroup(1,this.bgEnvs[this.domeFront]),e.setBindGroup(3,this.bgDepth),P.draw(e,this.splatPipe),e.end();let t=M.beginRenderPass({colorAttachments:[{view:this.blobN.createView(),loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,0]}]});t.setBindGroup(0,this.bg),t.setBindGroup(1,this.bgEnvs[this.domeFront]),t.setBindGroup(3,this.bgDepthN),P.draw(t,this.normPipe),t.end();let r=M.beginRenderPass({colorAttachments:[{view:L,loadOp:`load`,storeOp:`store`}],...ee&&n?{timestampWrites:{querySet:this.qs,endOfPassWriteIndex:3}}:{}});r.setPipeline(this.compPipe),r.setBindGroup(0,this.bg),r.setBindGroup(1,this.bgEnvs[this.domeFront]),r.setBindGroup(2,this.bgBlob),r.draw(3),r.end()}}if(this.tColor&&this.temporal.resolve(M,this.tColor.createView(),this.depth.createView(),this.reproj,[O[0],-O[1]],I,ee?{querySet:this.qs,beginningOfPassWriteIndex:4,endOfPassWriteIndex:5}:null),this.hdrTex){let e=M.beginRenderPass({colorAttachments:[{view:I,loadOp:`clear`,storeOp:`store`,clearValue:[0,0,0,1]}]});e.setPipeline(this.blit),e.setBindGroup(0,this.blitBG),e.draw(3),e.end()}let z=null,B=this.tColor?6:4;ee&&(M.resolveQuerySet(this.qs,0,B,this.qres,0),z=this.qread.pop()??c.createBuffer({size:48,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),M.copyBufferToBuffer(this.qres,0,z,0,8*B)),c.queue.submit([M.finish()]),P?.afterSubmit(),F&&(this.prbBusy=!0,F.mapAsync(GPUMapMode.READ).then(()=>{this.eyeWater=new Float32Array(F.getMappedRange())[0],F.unmap(),this.prbBusy=!1},()=>{this.prbBusy=!1})),this.inFlight++;let ie=performance.now();c.queue.onSubmittedWorkDone().then(()=>{this.inFlight--,Pt(this.doneMs,performance.now()-ie)}).catch(()=>{this.inFlight--});let ae=++this.frameNo;z&&z.mapAsync(GPUMapMode.READ).then(()=>{Pt(this.readMs,performance.now()-ie);let e=new BigUint64Array(z.getMappedRange()),t=Number(e[1]-e[0])/1e6,n=B===6?Number(e[5]-e[4])/1e6:0,r=Number(e[3]-e[2])/1e6+n;Pt(this.gpu.fft,t),Pt(this.gpu.draw,r),Pt(this.gpu.post,n),this.gpu.count=(this.gpu.count??0)+1,o!=null&&Pt(this.gpu.tagged,{tag:o,fft:t,draw:r,post:n,lag:this.frameNo-ae}),z.unmap(),this.qread.push(z)}).catch(()=>{}),this.patches=j,this.vertices=j*(this.grid+1)**2,Pt(this.cpuMs,performance.now()-s)}};function Pt(e,t){e.push(t),e.length>1200&&e.splice(0,600)}function Ft(e,t){let n=new Float32Array(16);for(let r=0;r<4;r++)for(let i=0;i<4;i++){let a=0;for(let n=0;n<4;n++)a+=e[n*4+i]*t[r*4+n];n[r*4+i]=a}return n}var It=9.81;function Lt(e,t,n){let r=.39*It**.2*(t*e*e)**.4,i=r/.78;return{Hb:r,hb:i,u:i/n}}function Rt(e,t,n){let r=It*t*t/(2*Math.PI),i=n/Math.sqrt(e/r);return{xi:i,L0:r,type:i<.5?`spilling`:i<3.3?`plunging`:`collapsing or surging`}}var zt=(e,t,n,r,i,a)=>{let o=Lt(r,i,n),s=Rt(r,i,n),c=Math.max(o.u,2);return{id:e,rung:`R1`,title:t,q:{scene:`beach`,plane:n,sea:`regular`,H:r,tp:i,chop:0,whitewater:0,parcels:1},views:{"down the line":{eye:Math.max(.8,1.6*o.Hb),pitch:-5,off:.8*c,along:-10,yawrel:82},"from the beach":{eye:1.6,pitch:-14,off:Math.max(-3,-.2*c),along:0,yawrel:30},"from behind":{eye:Math.max(1.5,2*o.Hb),pitch:-10,off:c+Math.max(8,4*o.Hb),along:0,yawrel:170},above:{eye:Math.max(10,.6*c),pitch:-70,off:c,along:0,yawrel:0}},notes:[`A regular wave ${r} m high at ${i} s, long-crested, straight in, over a plane slope of 1:${Math.round(1/n)}; no wind sea.`,`Breaker type by Battjes 1974's surf similarity number: ξ0 = ${s.xi.toFixed(2)} (spilling below 0.5, plunging 0.5 to 3.3): ${s.type}.`,`Breaks about ${o.u.toFixed(0)} m offshore in ${o.hb.toFixed(2)} m of water, ${o.Hb.toFixed(2)} m high (Komar and Gaughan 1972; H/h 0.78).`,`Look at: ${a}`,`Now: R1a and R1b, parcels that spawn, fly, land, ride and dissolve (no parcel touches another yet); today's whitewater off.`]}},Bt=(e,t,n,r,i,a,o)=>{let s=zt(e,t,n,1.4*r,i,o),c=Math.round(1/n),l=Lt(1.4*r,i,n),u=i*Math.sqrt(It*l.hb)/(2*Math.sin(a*Math.PI/180));return{...s,rung:`R2`,q:{...s.q,H:r,dir:a,T2:i,H2:r,dir2:-a},notes:[`Two regular trains, each ${r} m high at ${i} s, crossing at ±${a}° over a plane slope of 1:${c}; no wind sea.`,`Where their crests meet the wave is twice as high: every ${u.toFixed(0)} m or so along the shore where it breaks.`,`Look at: ${o}`,`Now: R2b, the parcels and their foam; today's whitewater off.`]}},Vt=(e,t,n,r,i)=>({id:e,rung:`R0`,title:t,q:{scene:`beach`,...n},views:r,notes:i}),Ht=[zt(`r1-spill`,`Spilling: 0.5 m, 6 s on 1:50`,.02,.5,6,`a white roller growing down the front from the crest; a bore running in; foam left behind.`),zt(`r1-plunge`,`Plunging: 0.3 m, 8 s on 1:10`,.1,.3,8,`a lip thrown ahead of the crest, its landing and splash-up; the crash as an event at the start.`),zt(`r1-tiny`,`Tiny shore break: 0.1 m, 8 s on 1:10`,.1,.1,8,`a distinct small crash at the water's edge even at this size (Mike: "apparent even for tiny shore breaking ripple waves").`),zt(`r1-weak-plunge`,`Weak plunging: 0.6 m, 8 s on 1:20`,.05,.6,8,`between the two: a short throw that turns into a spilling bore.`),zt(`r1-big-spill`,`Big spilling: 1.5 m, 10 s on 1:50`,.02,1.5,10,`the roller's volume and churn at a size a surfski meets outside; the width of the surf zone.`),Bt(`r2-chevron`,`Chevron: two 0.4 m trains at 8 s crossing ±20° on 1:50`,.02,.4,8,20,`each crest breaking first where it is highest, then along to its ends, the white trailing furthest from the middle.`),Bt(`r2-city`,`City Beach: two 0.6 m trains at 9 s crossing ±10° on 1:40`,.025,.6,9,10,`a modest chevron as each crest starts to break, and the crest sinking in its middle where it broke first.`),Vt(`r0-mike-2m`,`Today: 2 m at 7 s, Mike's drone view`,{hs:2,tp:7,attach:0},{drone:{eye:8,pitch:-20,off:60,along:-10,yawrel:35},low:{eye:4.9,pitch:-4,off:82,along:81,yawrel:-12}},[`The default beach (bar, crescentic rips), a 2 m sea at 7 s with the wind sea: the view the perf is measured at.`,`Now: R0, today's system.`]),Vt(`r0-shore`,`Today: 0.5 m shore break on a 0.12 face`,{bar:0,rips:0,divots:0,faceslope:.12,hs:.5,tp:8},{side:{eye:1,pitch:-6,off:-1,along:-10,yawrel:-60},"from the beach":{eye:1.6,pitch:-25,off:0,along:0,yawrel:75}},[`The default beach without its bar, a random 0.5 m sea at 8 s on a steep face: the crash of learnings 53.`,`Now: R0, today's system.`])],Ut=e=>Ht.find(t=>t.id===e)??null,Wt=9.81,Gt={hs:1.2,tp:10,gamma:3.3,spread:10,offNormal:0,seed:3};function Kt(e,t,n){let r=Math.sqrt(e*(Wt*t*t/(2*Math.PI))),i=.35*n*r,a=.75*n*r,o=.06*r;return{setup:i,sInc:a,sIG:o,R2:1.1*(i+Math.hypot(a,o)/2)}}var qt=(()=>{let e=new URLSearchParams(location.search),t=Ut(e.get(`test`));if(!t||Object.keys(t.q).every(t=>e.has(t)))return!1;let n=new URLSearchParams({...t.q,...Object.values(t.views)[0]});for(let[t,r]of e)n.set(t,r);return location.replace(`${location.pathname}?${n}`),!0})(),q=new URLSearchParams(location.search),J=(e,t)=>q.get(e)==null?t:Number(q.get(e)),Jt=document.getElementById(`hud`),Y=document.getElementById(`view`),X={ready:!1,done:!1,errors:[],frames:0,fft:[],draw:[],wall:[]};window.__sim2=X;var Yt=e=>{X.errors.length>=20||X.errors.includes(e)||(X.errors.push(e),Jt.textContent=`${Jt.textContent}\n${e}`,console.error(e))},Z=e=>{if(!e.length)return null;let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},Xt=e=>{q.get(`post`)&&fetch(`./__report`,{method:`POST`,body:e}).catch(()=>{})},Q=e=>e==null?`-`:e.toFixed(1),$=e=>e==null?`-`:e.toFixed(2),Zt=typeof matchMedia<`u`&&matchMedia(`(pointer: coarse)`).matches,Qt=q.get(`dpr`)==null?Math.min(devicePixelRatio,Math.min(innerWidth,innerHeight)<600?2:devicePixelRatio,Zt?Math.sqrt(25e5/(innerWidth*innerHeight)):1/0):J(`dpr`,devicePixelRatio),$t=Qt>=1.5?1:.75*Qt,en=Qt;function tn(){let e=en,t=(q.get(`size`)??``).split(`x`).map(Number);Y.width=t[0]||Math.round(innerWidth*e),Y.height=t[1]||Math.round(innerHeight*e),t[1]&&(Y.style.width=`${Y.width/e}px`,Y.style.height=`${Y.height/e}px`)}function nn(e,t){let n=0,r=0,i=3,a=0,o=0,s=!1;return(c,l=!1)=>{let u=e.gpu;if(!u)return;if(l||document.hidden){s=!0;return}if(s){s=!1,i=3,o=u.count??0,a=c+1e3;return}if(c<a)return;a=c+1e3;let d=Math.min((u.count??0)-o,u.fft.length,u.draw.length);if(o=u.count??0,i>0){i--;return}if(d<5)return;let f=Z(u.fft.slice(-d)),p=Z(u.draw.slice(-d)),m=f+p;n=m>.9*t?n+1:0,r=m<.55*t?r+1:0;let h=en;n>=2?h=Math.max($t,en*Math.sqrt(Math.min(1,Math.max(.6,(.8*t-f)/Math.max(p,.001))))):r>=5&&(h=Math.min(Qt,en*Math.sqrt(1.125))),Math.abs(h-en)>.02&&(en=h,tn(),n=0,r=0,i=3,Sn=`resolution ${en.toFixed(2)}x (the load governor: GPU ${m.toFixed(1)} ms against a ${t.toFixed(1)} ms budget)`)}}var rn=.7;function an(e,t=()=>0){let n={e:0,n:0,h:J(`eye`,1.1),yaw:(q.get(`yaw`)==null?e.headingDeg??0:J(`yaw`,0))*Math.PI/180,pitch:J(`pitch`,-6)*Math.PI/180,fov:J(`fov`,70)},r=new Set,i=J(`speed`,3.5),a=J(`turn`,0)*Math.PI/180;addEventListener(`keydown`,e=>r.add(e.key.toLowerCase())),addEventListener(`keyup`,e=>r.delete(e.key.toLowerCase()));let o=new Map,s=null,c=performance.now(),l={e:0,n:0,h:0},u=()=>{let e=0,t=0;for(let n of o.values())e+=n.x,t+=n.y;return{x:e/o.size,y:t/o.size,n:o.size}},d=()=>[Math.sin(n.yaw),Math.cos(n.yaw)],f=()=>[Math.cos(n.yaw),-Math.sin(n.yaw)],p=(e,t,r,i)=>{let[a,o]=d(),[s,c]=f(),u=a*e+s*t,p=o*e+c*t;n.e+=u,n.n+=p,n.h=Math.max(.3,Math.min(3e3,n.h+r));let h=1/Math.max(.016,i),g=3*Math.max(4,n.h),_=e=>Math.max(-g,Math.min(g,e));l.e=_(u*h),l.n=_(p*h),l.h=_(r*h)*.5,m=performance.now(),n.lastInput=m},m=0,h=()=>{if(n.pitch>=-.005)return null;let e=Math.max(.3,n.h)/Math.tan(-n.pitch);return e>5e3?null:{e:n.e+Math.sin(n.yaw)*e,n:n.n+Math.cos(n.yaw)*e,D:e}},g=e=>{let t=h();t&&(n.yaw+=e,n.e=t.e-Math.sin(n.yaw)*t.D,n.n=t.n-Math.cos(n.yaw)*t.D,l.e=0,l.n=0,m=performance.now(),n.lastInput=m)};Y.addEventListener(`contextmenu`,e=>e.preventDefault()),Y.addEventListener(`pointerdown`,e=>{n.lastInput=performance.now(),o.set(e.pointerId,{x:e.clientX,y:e.clientY,two:e.pointerType===`mouse`&&e.button===2}),Y.setPointerCapture(e.pointerId),s=o.size>1?u():null,c=performance.now()}),Y.addEventListener(`pointermove`,e=>{let t=o.get(e.pointerId);if(t){if(o.size===1&&t.two){let r=performance.now(),i=(r-c)/1e3,a=Math.max(1,n.h)*.006;e.altKey?(p(0,0,-(e.clientY-t.y)*a,i),g(-(e.clientX-t.x)*.004)):(n.yaw+=(e.clientX-t.x)*.004,p((e.clientY-t.y)*a,0,0,i)),c=r}else o.size===1&&(n.yaw+=(e.clientX-t.x)*.004,n.pitch=Math.max(-1.5,Math.min(1.2,n.pitch-(e.clientY-t.y)*.004)));if(t.x=e.clientX,t.y=e.clientY,o.size>1&&s&&s.n===o.size){let e=u(),t=e.x-s.x,r=e.y-s.y,i=performance.now(),a=(i-c)/1e3,l=Math.max(1,n.h)*.006;o.size===2?(n.yaw+=t*.004,p(r*l,0,0,a)):p(0,-t*l,r*l*.6,a),s=e,c=i}}});let _=e=>{o.delete(e.pointerId),s=o.size>1?u():null,c=performance.now()};Y.addEventListener(`pointerup`,_),Y.addEventListener(`pointercancel`,_);let v=performance.now();Y.addEventListener(`wheel`,e=>{e.preventDefault();let t=performance.now(),r=Math.min(.1,(t-v)/1e3),i=Math.max(1,n.h)*.004,a=e.deltaMode===1?16:1;v=t;let o=e.deltaX*a,s=e.deltaY*a;e.ctrlKey?p(0,0,-s*i*2,r):e.altKey?(p(0,0,-s*i*1.5,r),g(-o*.003)):e.shiftKey?(n.yaw+=o*.003,n.pitch=Math.max(-1.5,Math.min(1.2,n.pitch-s*.003))):p(-s*i,o*i,0,r)},{passive:!1});let y=q.get(`drone`)==null?q.get(`scene`)!=null:q.get(`drone`)!==`0`;return n.halt=()=>{l.e=l.n=l.h=0},n.step=e=>{let s=e=>r.has(e),c=+!!s(`w`)-!!s(`s`),u=+!!s(`d`)-!!s(`a`);if(y){let r=3*Math.max(4,n.h)*e,i=+!!s(`e`)-!!s(`q`);l.e+=(Math.sin(n.yaw)*c+Math.cos(n.yaw)*u)*r,l.n+=(Math.cos(n.yaw)*c-Math.sin(n.yaw)*u)*r,l.h+=i*r;let a=o.size>=2||performance.now()-m<60,d=a?1:Math.exp(-e/rn);a||(n.e+=l.e*e,n.n+=l.n*e,n.h+=l.h*e),l.e*=d,l.n*=d,l.h*=d;let f=t(n.e,n.n)+.3;n.h<f&&(n.h=f,l.h=Math.max(l.h,0)),n.h=Math.min(n.h,3e3),s(`arrowleft`)&&(n.yaw-=e),s(`arrowright`)&&(n.yaw+=e),s(`arrowup`)&&(n.pitch=Math.min(1.2,n.pitch+e*.6)),s(`arrowdown`)&&(n.pitch=Math.max(-1.5,n.pitch-e*.6)),n.speed=Math.hypot(l.e,l.n),n.climb=l.h,n.ground=t(n.e,n.n);return}let d=r.size?Math.max(i,3.5)*4*Math.max(1,n.h/10):y?0:i,f=r.size?c:1;n.e+=(Math.sin(n.yaw)*f+Math.cos(n.yaw)*u)*d*e,n.n+=(Math.cos(n.yaw)*f-Math.sin(n.yaw)*u)*d*e,r.size||(n.yaw+=a*e),s(`arrowleft`)&&(n.yaw-=e),s(`arrowright`)&&(n.yaw+=e),s(`arrowup`)&&(n.pitch=Math.min(1.2,n.pitch+e*.6)),s(`arrowdown`)&&(n.pitch=Math.max(-1.4,n.pitch-e*.6)),s(`q`)&&(n.h=Math.max(.3,n.h*Math.exp(-e))),s(`e`)&&(n.h=Math.min(3e3,n.h*Math.exp(e)))},n}function on(){let e=document.createElement(`canvas`),t=Math.min(2,devicePixelRatio||1);e.width=150*t,e.height=224*t,e.style.cssText=`position:fixed;top:8px;right:8px;width:150px;height:224px;pointer-events:none;z-index:5`,document.body.appendChild(e);let n=e.getContext(`2d`);n.scale(t,t);let r=[`N`,`NE`,`E`,`SE`,`S`,`SW`,`W`,`NW`];return e=>{let t=e.pitch*180/Math.PI,i=69/45,a=(e.yaw*180/Math.PI%360+360)%360,o=75+t*i;n.clearRect(0,0,150,224),n.save(),n.beginPath(),n.arc(75,75,69,0,2*Math.PI),n.clip(),n.fillStyle=`#3b7fc4`,n.fillRect(0,0,150,150),n.fillStyle=`#8a6a3c`,n.fillRect(0,o,150,150),n.strokeStyle=`#fff`,n.lineWidth=2,n.beginPath(),n.moveTo(0,o),n.lineTo(150,o),n.stroke(),n.lineWidth=1,n.font=`9px system-ui`,n.fillStyle=`#fff`,n.textAlign=`left`;for(let e=-80;e<=80;e+=10){if(!e)continue;let t=o-e*i,r=e%20?10:20;t<6||t>144||(n.beginPath(),n.moveTo(75-r,t),n.lineTo(75+r,t),n.stroke(),e%20||n.fillText(String(e),75+r+3,t+3))}n.restore(),n.strokeStyle=`#fc3`,n.lineWidth=2.5,n.beginPath(),n.moveTo(47,75),n.lineTo(66,75),n.lineTo(75,81),n.lineTo(84,75),n.lineTo(103,75),n.stroke(),n.strokeStyle=`rgba(255,255,255,0.8)`,n.lineWidth=1.5,n.beginPath(),n.arc(75,75,69,0,2*Math.PI),n.stroke(),n.fillStyle=`rgba(0,0,0,0.55)`,n.fillRect(0,150,150,74),n.fillStyle=`#fff`,n.textAlign=`center`,n.font=`bold 13px system-ui`,n.fillText(`${String(Math.round(a)).padStart(3,`0`)}° ${r[Math.round(a/45)%8]}`,75,166),n.font=`12px system-ui`,n.textAlign=`left`;let s=e.h-Math.max(e.ground??0,0);n.fillText(`height ${e.h<10?e.h.toFixed(1):Math.round(e.h)} m`,8,184),n.fillText(`above ${(e.ground??0)>0?`ground`:`water`} ${s<10?s.toFixed(1):Math.round(s)} m`,8,200),n.fillText(`pitch ${Math.round(t)}°  speed ${(e.speed??0).toFixed(1)} m/s`,8,216)}}function sn(e,t,n){let r=Ut(new URLSearchParams(location.search).get(`test`)),i=document.createElement(`div`);i.style.cssText=`position:fixed;right:8px;bottom:8px;max-width:min(460px,92vw);display:flex;flex-direction:column;gap:4px;font:12px system-ui;z-index:6;background:rgba(0,0,0,.6);padding:6px 8px;border-radius:6px;color:#fff`;let a=(e,t,n)=>{let r=document.createElement(e);return t&&(r.style.cssText=t),n!=null&&(r.textContent=n),r},o=e=>`font:12px system-ui;padding:3px 8px;border-radius:4px;border:0;cursor:pointer;background:${e?`#fc3`:`#eee`};color:#000`,s=(...e)=>{let t=a(`div`,`display:flex;gap:4px;flex-wrap:wrap;align-items:center;justify-content:flex-end`);return t.append(...e),i.append(t),t},c=a(`select`,`font:12px system-ui;max-width:100%`);c.append(new Option(`(no test case: the address as it is)`,``));for(let e of[...new Set(Ht.map(e=>e.rung))]){let t=document.createElement(`optgroup`);t.label=e;for(let n of Ht.filter(t=>t.rung===e))t.append(new Option(`${n.id}: ${n.title}`,n.id));c.append(t)}if(c.value=r?.id??``,c.onchange=()=>{let e=Ut(c.value);if(!e){location.search=`scene=beach`;return}let t=Object.values(e.views)[0],n=new URLSearchParams({test:e.id,...e.q,...t});location.search=n.toString()},s(a(`span`,`opacity:.8`,`case`),c),r){let n=t*Math.PI/180,i=t=>{e.e=Math.sin(n)*t.off+Math.cos(n)*t.along,e.n=Math.cos(n)*t.off-Math.sin(n)*t.along,e.yaw=n+t.yawrel*Math.PI/180,e.h=t.eye,e.pitch=t.pitch*Math.PI/180,e.halt?.(),e.lastInput=performance.now()};s(a(`span`,`opacity:.8`,`view`),...Object.entries(r.views).map(([e,t])=>{let n=a(`button`,o(!1),e);return n.onclick=()=>i(t),n}))}let l=[[`pause`,0],[`¼×`,.25],[`1×`,1]],u=[],d=e=>{X.timeK=e,u.forEach(([t,n])=>{t.style.cssText=o(n===e)})};if(s(a(`span`,`opacity:.8`,`time`),...l.map(([e,t])=>{let n=a(`button`,o(t===1),e);return n.onclick=()=>d(t),u.push([n,t]),n})),r){let e=a(`div`,`text-align:left;line-height:1.35;opacity:.92;white-space:normal`);e.innerHTML=`<b>${r.title}</b>`;for(let t of r.notes)e.append(a(`div`,``,t));i.append(e)}let f=a(`div`,`text-align:left;font:11px ui-monospace,monospace;opacity:.9;white-space:pre-wrap`);i.append(f),setInterval(()=>{f.textContent=n()},500),document.body.append(i)}var cn=3,ln=J(`ramp`,75),un=J(`tail`,30),dn=48;function fn(e,t){let n=cn+ln+un,r=[],i=[],a=T(),o=D(),s=null,c=-1,l=0,u=[],d=!1,f=60,p=1,m=e=>e<cn?`warm`:e<cn+ln?`ramp`:e<n?`tail`:null,h=(n,a)=>{let o=e.gpu,s=e=>e?e.splice(0):[],c={s:n,phase:a,load:p,fps:l,frameMs:Z(u),doneMs:Z(s(e.doneMs)),drawMs:Z(s(o?.draw)),computeMs:Z(s(o?.fft)),patches:e.patches};if(a===`warm`?i.push(...u):r.push(c),n===2){let e=i.slice().sort((e,t)=>e-t)[Math.floor(i.length*.1)]??16.7;f=e<11?120:e<22?60:30,t.pacing=k(e)}if(a===`ramp`||n===2){let e=l>=.95*f;p=n===2?1:e?Math.min(dn,p+Math.max(1,Math.floor(p/4))):Math.max(1,p-(l<.8*f?2:1))}n+1===cn+ln&&(p=1),l=0,u=[]},g=()=>{let e=[`display ${f} fps (${t.pacing??`?`})`],n=r.filter(e=>e.phase===`ramp`),i=r.filter(e=>e.phase===`tail`);for(let t=0;t<ln;t+=10){let r=n.filter(e=>e.s-cn>=t&&e.s-cn<t+10).filter(e=>e.fps>=.95*f).map(e=>e.load);e.push(`${t}-${Math.min(ln,t+10)} s: held ${r.length?`up to ${Math.max(...r)} copies (median ${Z(r)})`:`no second at the display rate`}`)}let a=(e,t)=>Z(e.map(e=>e[t]).filter(e=>e!=null)),o=i.slice(0,5),s=i.slice(-10);return e.push(`then 1 copy: ${Q(a(o,`fps`))} fps in its first 5 s, ${Q(a(s,`fps`))} in its last 10 s; submit to done ${Q(a(o,`doneMs`))} then ${Q(a(s,`doneMs`))} ms`+(t.timestamps?`; GPU sea ${$(a(s,`drawMs`))} ms, compute ${$(a(s,`computeMs`))} ms`:``)),e},_=async()=>{d=!0;let n=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, canvas ${Y.width}x${Y.height}, MSAA ${e.msaa}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets`,`${await w()}, ${o.report()}`];o.release();let i=[`s phase copies fps frame_ms done_ms gpu_sea_ms gpu_compute_ms patches`,...r.map(e=>[e.s,e.phase,e.load,e.fps,Q(e.frameMs),Q(e.doneMs),$(e.drawMs),$(e.computeMs),e.patches].join(` `))],s=g(),c=[...n,``,`The WebGPU sea: the copies a frame held at the display rate, then one copy:`,...s,``,...i,...X.errors.length?[``,...X.errors]:[]].join(`
`);X.measure={rows:r,lines:s,report:c},Xt(c),a.done({lines:s,report:c,title:`Surfski WebGPU sea measurement`,onSend:()=>O(`Surfski WebGPU sea measurement`,c),onCopy:e=>E(c,e)})};return(e,t)=>{if(d)return null;s??=e;let r=Math.floor((e-s)/1e3),i=m(r);return r!==c&&(c>=0&&h(c,m(c)),c=r,i&&a.progress(i===`warm`?`the WebGPU sea, settling`:i===`ramp`?`the WebGPU sea, ${p} cop${p>1?`ies`:`y`} a frame`:`the WebGPU sea drawn once`,n-r)),i?(l++,u.push(t),p):(_(),null)}}var pn=Math.max(1,J(`load`,1)),mn=J(`slot`,2.5),hn=.5,gn=J(`rounds`,3),_n=4,vn=Math.max(1,J(`load`,1)),yn=.08;function bn(e,t=!1){let n=t=>Math.min(1,Math.sqrt(t/e));return t?[[`full again`,{}],[`no swell (its compute and reads; the bed fades the open sea)`,{swell:!1}],[`no whitewater`,{dbg:1024}],[`no shore wash (its front and lace)`,{dbg:4096}],[`no water’s edge at the pixel’s scale`,{dbg:256}],[`the bed read bilinear only (no cubic)`,{dbg:512}],[`the cover’s patches as their mean`,{dbg:128}],[`all three bed cuts`,{dbg:896}],[`no ground pass`,{ground:!1}],[`no ripples`,{ripples:!1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`1.2 megapixels`,{scale:n(12e5)}],[`one colour (mesh, raster only)`,{shade:!1}]]:[[`full again`,{}],[`MSAA off`,{msaa:1}],[`1.2 megapixels`,{scale:n(12e5)}],[`1.2 megapixels, MSAA off`,{scale:n(12e5),msaa:1}],[`0.6 megapixels`,{scale:n(6e5)}],[`no ripples`,{ripples:!1}],[`sky from 1 facet, not 4`,{facets:1}],[`no per-pixel sea sets`,{fragSets:!1}],[`16 x 16 patches, not 32 x 32`,{grid:16}],[`flat vertices (no displacement)`,{vsDisp:!1}],[`one colour (mesh, raster, MSAA only)`,{shade:!1}],[`the position among the fragment inputs`,{fsPos:!0}],[`MSAA off, 16 x 16 patches`,{msaa:1,grid:16}],[`one colour, MSAA off`,{shade:!1,msaa:1}],[`half-float target, own resolve (web-ocean)`,{target:`hdr`}],[`half-float target, MSAA off`,{target:`hdr`,msaa:1}],[`depth24plus, not depth32float`,{depth:`depth24plus`}],[`footprint worked out (no derivatives)`,{deriv:!1}],[`footprint worked out, MSAA off`,{deriv:!1,msaa:1}],[`interpolation marked centre`,{interp:`@interpolate(perspective, center)`}],[`added arithmetic (MSAA 4)`,{burn:64}],[`added arithmetic, MSAA off`,{burn:64,msaa:1}],[`added arithmetic in the sky (one big triangle)`,{skyBurn:256}],[`added arithmetic in the sky, MSAA off`,{skyBurn:256,msaa:1}],[`temporal, drawn at 0.7 of the size`,{target:`temporal`,rs:.7}],[`temporal, drawn at 0.5 of the size`,{target:`temporal`,rs:.5}],[`temporal, drawn at full size`,{target:`temporal`,rs:1}],[`temporal, drawn at 0.85 of the size`,{target:`temporal`,rs:.85}],[`every ripple band read in full (no regimes)`,{regimes:0}],[`no regimes, MSAA off`,{regimes:0,msaa:1}],[`both regimes, MSAA off`,{regimes:3,msaa:1}]]}function xn(e,t,n,r=!1){let i=q.get(`only`)?.split(`,`).map(Number),a=bn(n[0]*n[1],r).filter((e,t)=>!i||i.includes(t)),o=[];for(let e=0;e<gn;e++)for(let[e,t]of a)o.push([`full`,{}],[e,t]);o.push([`full`,{}]);let s=_n+o.length*mn+1.5,c=T(),l=D(),u=o.map(([e])=>({name:e,frames:0,draw:[],post:[],compute:[],lag:[],iv:[],tLast:null})),d=null,f=-2,p=!1,m=null,h={msaa:e.variant.msaa,grid:e.variant.grid},g=([,t])=>{let{scale:r=1,...i}=t;Y.width=Math.round(n[0]*r),Y.height=Math.round(n[1]*r),e.setVariant({...h,...i})};for(let[,t]of a){let{scale:n,...r}=t;e.setVariant({...h,...r})}e.setVariant(h);let _=()=>{for(let t of e.gpu?.tagged.splice(0)??[]){let e=u[t.tag];e&&(e.draw.push(t.draw-t.post),e.post.push(t.post),e.compute.push(t.fft),e.lag.push(t.lag))}},v=async()=>{p=!0,_(),g([`full`,{}]);let r=(e,t)=>{let n=e.slice().sort((e,t)=>e-t);return n.length?n[Math.min(n.length-1,Math.floor(t*n.length))]:null},i=u.map((e,t)=>{let n=d+(_n+(t+1)*mn)*1e3,i=r(e.iv,.5),a=e.frames===0||n-e.tLast>Math.max(500,3*(i??0));return{name:e.name,drawMs:e.draw.length?Z(e.draw)/vn+Z(e.post):null,postMs:Z(e.post),computeMs:Z(e.compute),fps:e.frames/(mn-hn),n:e.draw.length,lag:Z(e.lag),p50:i,p95:r(e.iv,.95),partial:a}}),o=i.findIndex((e,t)=>e.fps===0&&i.slice(t).every(e=>e.fps===0)),s=t.timestamps?`drawMs`:`fps`,f=[];for(let[e]of a){let n=[],r=[],a=0;i.forEach((o,c)=>{if(o.name!==e||o.partial||i[c-1]?.partial||i[c+1]?.partial)return;let l=i[c-1]?.[s],u=i[c+1]?.[s],d=o[s];if(l==null||u==null||d==null)return;let f=(l+u)/2;n.push((t.timestamps?f-d:d-f)/f),r.push(f-d),Math.abs(l-u)/f>yn&&a++}),f.push({name:e,rel:Z(n),lo:n.length?Math.min(...n):null,hi:n.length?Math.max(...n):null,ms:Z(r),pairs:n.length,drift:a})}let m=i.filter(e=>e.name===`full`&&!e.partial),h=e=>e==null?`-`:`${Math.round(e*100)}%`,v=[t.timestamps?`the full picture: ${$(Z(m.map(e=>e.drawMs)))} ms of GPU (${$(m[0]?.drawMs)} at the start, ${$(m[m.length-1]?.drawMs)} at the end), compute ${$(Z(m.map(e=>e.computeMs)))} ms, ${Q(Z(m.map(e=>e.fps)))} fps`:`the full picture: ${Q(Z(m.map(e=>e.fps)))} fps (no GPU timers here: the shares are of frames a second)`,...f.map(e=>`${e.name}: ${t.timestamps?`saves`:`gains`} ${h(e.rel)}${t.timestamps?` (${$(e.ms)} ms)`:``}, ${h(e.lo)} to ${h(e.hi)}${e.drift?`; ${e.drift} of ${e.pairs} pairs drifted`:``}`),`the times came back ${Q(Z(u.flatMap(e=>e.lag)))} frames late; submit to done ${Q(Z(e.doneMs))} ms, to the timers read back ${Q(Z(e.readMs))} ms`];o>=0&&v.push(`no frames from slot ${o} on (about ${Math.round(_n+o*mn)} s in): the page stopped drawing (the screen locked, or the page was hidden); the slots before it stand`);let y=[`build ${document.querySelector(`meta[name=build]`)?.content??``}`,navigator.userAgent,`${innerWidth}x${innerHeight} at ${devicePixelRatio}x, full canvas ${n[0]}x${n[1]}, MSAA 4${vn>1?`, ${vn} copies a frame (times per copy)`:``}`,location.href,`WebGPU: ${t.adapter}; timestamp queries ${t.timestamps?`yes`:`no`}; ${t.sets} sea sets, ${e.patches} patches`,`${await w()}, ${l.report()}`];l.release();let b=[`slot variant gpu_sea_ms gpu_resolve_ms gpu_compute_ms fps samples lag_frames frame_p50_ms frame_p95_ms cut_short`,...i.map((e,t)=>[t,`"${e.name}"`,$(e.drawMs),$(e.postMs),$(e.computeMs),Q(e.fps),e.n,e.lag,Q(e.p50),Q(e.p95),+!!e.partial].join(` `))],x=[...y,``,`The WebGPU sea, part by part (each against the full picture either side of it):`,...v,``,...b,...X.errors.length?[``,...X.errors]:[]].join(`
`);X.sweep={slots:i,rows:f,lines:v,report:x},Xt(x),c.done({lines:v,report:x,title:`Surfski WebGPU sea parts`,onSend:()=>O(`Surfski WebGPU sea parts`,x),onCopy:e=>E(x,e)})};return{before(e){if(p)return null;d??=e;let t=(e-d)/1e3-_n,n=t<0?-1:Math.floor(t/mn);if(n>=o.length)return m??=e,e-m>1500?v():_(),null;if(n!==f&&(f=n,n>=0&&g(o[n]),(n===0||n===o.length>>1)&&Xt(`sweep progress: slot ${n} of ${o.length} at ${Q((e-d)/1e3)} s, ${X.frames} frames${X.errors.length?`; ${X.errors.join(`; `)}`:``}`),c.progress(n>=0?`the WebGPU sea's parts: ${o[n][0]}`:`the WebGPU sea, settling`,s-(e-d)/1e3)),_(),n<0||t-n*mn<hn)return null;let r=u[n];return r.tLast!=null&&r.iv.push(e-r.tLast),r.tLast=e,r.frames++,n}}}var Sn=``;async function Cn(){if(!navigator.gpu){Yt(`WebGPU is not available in this browser`);return}let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e){Yt(`WebGPU: no adapter`);return}let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:[...t?[`timestamp-query`]:[],...e.features.has(`float32-blendable`)?[`float32-blendable`]:[]]});n.addEventListener(`uncapturederror`,e=>Yt(`WebGPU error: ${e.error.message}`)),n.lost.then(e=>Yt(`WebGPU device lost: ${e.message}`)),tn(),!q.get(`size`)&&!q.get(`sweep`)&&addEventListener(`resize`,tn);let r=o(q.get(`course`)??(q.get(`scene`)===`beach`?`perth-trigg-sorrento`:`gorge-swellcity`))??o(`gorge-swellcity`),i=s(r.name),a=i.state.fft.sea,c=q.get(`chop`)==null?1:Math.max(0,J(`chop`,1)),l=a.sets.slice(0,32).map(e=>c===1?e:{...e,re:e.re.map(e=>e*c),im:e.im.map(e=>e*c)}),u=new ee(n);u.build({...a,sets:l});let d=new Nt(n,Y,{msaa:J(`msaa`,1),timestamps:t,grid:J(`grid`,32),patch0:J(`patch0`,4),levels:J(`levels`,12),rangeK:J(`rangeK`,6)});q.get(`ground`)===`0`&&d.setVariant({msaa:d.variant.msaa,grid:d.variant.grid,ground:!1});let f=new N(n);for(let e of[...d.modules,...f.modules])for(let t of(await e.getCompilationInfo()).messages)Yt(`${e.label} ${t.type} line ${t.lineNum}:${t.linePos} ${t.message}`);let p=q.get(`whitewater`)===`0`?594944:0;d.setSea(u,f,i.state,{micro:J(`ripples`,1),debug:J(`seadbg`,0)|p});let m=q.get(`scene`)===`beach`?q.get(`plane`)==null?{...Oe}:ke(Math.min(.5,Math.max(.005,J(`plane`,.05)))):null;if(m){for(let[e,t]of[[`d50`,`d50`],[`faceslope`,`faceSlope`],[`berm`,`berm`],[`dune`,`dune`],[`seed`,`seed`]])q.get(e)!=null&&(m[t]=J(e,m[t]));q.get(`bar`)!=null&&(m.bar={...m.bar,height:J(`bar`,m.bar.height)}),m.rips=q.get(`rips`)===`0`||!m.rips?null:{...m.rips,attach:Math.min(1,Math.max(0,J(`attach`,m.rips.attach))),spacing:Math.max(40,J(`ripspacing`,m.rips.spacing)||m.rips.spacing)},q.get(`shore`)===`0`&&(m.shore=null),m.divots=q.get(`divots`)===`0`||!m.divots?null:{...m.divots,hs:Math.max(0,J(`divhs`,m.divots.hs)),tp:Math.max(2,J(`divtp`,m.divots.tp))},m.facing=J(`facing`,((i.state.dirToDeg??20)+180)%360);let e=q.get(`sea`)===`regular`?Math.max(.01,J(`H`,.3)):0,t={hs:e?Math.SQRT2*Math.hypot(e,q.get(`T2`)?J(`H2`,e):0):J(`hs`,Gt.hs),tp:J(`tp`,Gt.tp)},r=q.get(`swell`)===`0`?null:Kt(t.hs,t.tp,m.faceSlope);r&&(m.wetLine=r.R2);let a=performance.now(),o=new Worker(new URL(new URL(`bed-texture-worker-CgXqlQmy.js`,import.meta.url).href,``+import.meta.url),{type:`module`});o.onmessage=e=>{m.tex=e.data.inner,m.tex.outer=e.data.outer,m.buildMs=performance.now()-a,X.bedBake={ms:e.data.ms,wallMs:m.buildMs},o.terminate(),d.setBed(m.tex,[0,0],m.facing,m),s&&=(s(),null)},o.postMessage({P:{...m}});let s=null;if(q.get(`swell`)!==`0`){let i={...Gt,hs:t.hs,tp:t.tp,spread:J(`spread`,Gt.spread),offNormal:J(`dir`,Gt.offNormal),...e?{regular:e,T2:q.get(`T2`)?J(`T2`,t.tp):0,H2:J(`H2`,e),dir2:J(`dir2`,J(`dir`,Gt.offNormal))}:{}},a=new Worker(new URL(new URL(`bed-solve-worker-BOpBRLtn.js`,import.meta.url).href,``+import.meta.url),{type:`module`}),o=performance.now();a.onmessage=t=>{if(t.data.progress){Sn=`the bed's wave response: ${t.data.progress[0]} of ${t.data.progress[1]} bins`;return}let i=t.data.result;X.swellSolve={ms:i.ms,wallMs:performance.now()-o,bins:i.bins.length,grid:[i.nx,i.ny]};let c=()=>{d.setSwell(new ge(n,i,d.bedTex.createView(),m.tex,{u0:Math.floor(i.u0),swash:q.get(`swash`)===`0`?null:r,face:m.faceSlope,...e?{gamma:.78*Math.SQRT2,mix:0}:{}})),q.get(`parcels`)===`1`&&(d.setParcels(new Ce(n)),X.parcels=d.parcels,window.__bd0=[...d.bedU.slice(0,4)])};if(m.tex?c():s=c,Sn=``,a.terminate(),r&&i.breaking){let e=0,t=0;for(let n=0;n<i.nx;n++)for(let r=0;r<i.ny;r++){let a=4*(r*i.nx+n);if(i.breaking[a+2]>0){e+=i.breaking[a+3],t++;break}}let n=t?e/t:r.setup;X.runup={setup:n,R2:1.1*(n+Math.hypot(r.sInc,r.sIG)/2)},d.setWetLine(X.runup.R2)}},a.postMessage({P:{...m},swell:i,opts:{cell:2}})}}let h=q.get(`regimes`)==null?1:J(`regimes`,1);if(q.get(`aa`)===`temporal`?d.setVariant({target:`temporal`,rs:J(`rs`,.7),detail:q.get(`detail`)==null?null:J(`detail`,1),regimes:h}):h!==1&&d.setVariant({msaa:d.msaa,grid:d.grid,regimes:h}),q.get(`v`)){let e=Object.fromEntries(q.get(`v`).split(`,`).map(e=>e.split(`:`)).filter(([e,t])=>e in jt&&t!=null).map(([e,t])=>[e,t===`true`?!0:t===`false`?!1:Number.isNaN(Number(t))?t:Number(t)]));d.setVariant({...d.variant,...e})}if(d.temporal)for(let[e,t]of[[`twmax`,`wMax`],[`twsoft`,`wSoft`],[`tsign`,`sigN`],[`tsigw`,`sigW`],[`tsharp`,`sharpen`]])q.get(e)!=null&&(d.temporal[t]=J(e,0));d.temporal&&q.get(`jitter`)===`0`&&(d.temporal.jitter=!1);let g=m?(e,t)=>{let n=m.facing*Math.PI/180,r=Math.sin(n),i=Math.cos(n);return Ge(e*i-t*r,e*r+t*i,m).y}:()=>-1e3,_=an(i,g),v=J(`frames`,0);X.cam=_,X.view=d,X.groundAt=g,X.place=e=>{let t=(m?.facing??0)*Math.PI/180;_.e=Math.sin(t)*e.off+Math.cos(t)*e.along,_.n=Math.cos(t)*e.off-Math.sin(t)*e.along,_.yaw=t+e.yawrel*Math.PI/180,_.h=e.eye,_.pitch=e.pitch*Math.PI/180,_.halt?.()},X.eyeWater=()=>d.eyeWater,X.after=(e=1)=>new Promise(t=>{let n=e=>e<=0?t(X.frames):requestAnimationFrame(()=>n(e-1));n(e)});let y=performance.now();addEventListener(`keydown`,()=>{y=performance.now()}),addEventListener(`wheel`,()=>{_.lastInput=performance.now()},{passive:!0});let b=()=>y,x=(q.get(`drone`)==null?q.get(`scene`):q.get(`drone`)!==`0`)&&q.get(`instruments`)!==`0`?on():null;if(m){let e=m.facing*Math.PI/180,t=q.get(`off`)==null,n=J(`off`,-8),r=J(`along`,t?11:0);_.e=Math.sin(e)*n+Math.cos(e)*r,_.n=Math.cos(e)*n-Math.sin(e)*r,q.get(`yawrel`)==null?q.get(`yaw`)??(_.yaw=t?e+16*Math.PI/180:e+Math.PI):_.yaw=e+J(`yawrel`,0)*Math.PI/180,t&&q.get(`eye`)==null&&(_.h=14.4),t&&q.get(`pitch`)==null&&(_.pitch=-20.6*Math.PI/180)}m&&q.get(`trial`)!==`0`&&!q.get(`frames`)&&!q.get(`probe`)&&sn(_,m.facing,()=>{let e=d.gpu,t=Z(X.wall.slice(-60)),n=d.parcels?.stats;return`frame ${Q(t)} ms${e?`; GPU: sea and sky ${$(Z(e.draw.slice(-60)))} ms, FFT, ripples, swell and parcels ${$(Z(e.fft.slice(-60)))} ms`:``}`+(n?`\nparcels: ${n.alive} (${n.contact} on the water), ${n.spawnRate.toFixed(0)} new a frame, ${(1e3*n.volFlight).toFixed(0)} l in the air, ${(1e3*n.volContact).toFixed(0)} l on the water, ${n.impactRate.toFixed(1)} hard landings a frame`:``)});let S=i.look??{},C=J(`sunaz`,S.sunAz??200),w=J(`sunel`,S.sunEl??30);d.setLook(new fe(n).set({sunElDeg:w,haze:q.get(`haze`)??S.haze??null,teal:J(`teal`,m?.85:S.teal??.6),turbid:J(`turbid`,m?0:S.turbid??0),bottom:m?[1,1,1]:S.bottom??null,glint:J(`glint`,1.3),cloud:J(`cloud`,S.cloud??.35),cloudType:J(`cloudtype`,S.cloudType??.25),cloudVar:J(`cloudvar`,S.cloudVar??.4),cloudDark:J(`clouddark`,S.cloudDark??0)}));let T=C*Math.PI/180,E=w*Math.PI/180,D={sunDir:[Math.sin(T)*Math.cos(E),Math.sin(E),-Math.cos(T)*Math.cos(E)]};X.info={course:r.id,adapter:`${e.info?.vendor??``} ${e.info?.architecture??``}`.trim()||`unknown`,timestamps:t,sets:l.length,msaa:d.msaa};let O=q.get(`measure`)?fn(d,X.info):null,k=q.get(`sweep`)?xn(d,X.info,[Y.width,Y.height],!!m):null,A=performance.now(),j=0,M=1,P=q.get(`freeze`)==null?null:J(`freeze`,100),F=q.get(`freezesea`)==null?null:J(`freezesea`,100),te=!q.get(`noqueuecap`),ne=q.get(`dt`)==null?null:J(`dt`,1/60),re=null;if(!q.get(`probe`)&&!q.get(`frames`)&&[`127.0.0.1`,`localhost`,`[::1]`].includes(location.hostname)){let e=document.createElement(`div`);e.style.cssText=`position:fixed;inset:auto 0 40% 0;margin:auto;width:fit-content;padding:10px 16px;background:rgba(0,0,0,.75);color:#fff;font:15px system-ui;border-radius:8px;display:none;z-index:9`,document.body.appendChild(e);let t=()=>fetch(`/__probe`).then(e=>e.json()).then(t=>{re=t.busy?t:null,e.style.display=t.busy?`block`:`none`,t.busy&&(e.textContent=`Paused: a performance probe is running (${t.why}; about ${t.left} s left)`)}).catch(()=>{}).finally(()=>setTimeout(t,1500));t()}let I=J(`idlefps`,20),L=J(`fps`,60),R=!(q.get(`measure`)||q.get(`sweep`)||q.get(`frames`))&&(q.get(`gov`)===`1`||q.get(`gov`)!==`0`&&!q.get(`probe`)&&q.get(`freeze`)==null&&!q.get(`size`))?nn(d,J(`budget`,1e3/30)):null,z=0,B=e=>{if(re){A=e,requestAnimationFrame(B);return}let t=!v&&!k&&!O&&(!document.hasFocus()||e-Math.max(_.lastInput??0,b())>1e4);if(!v&&!k&&!O&&e-z<1e3/(t?I:L)-2){requestAnimationFrame(B);return}if(z=e,te&&!d.ready()){X.skipped=(X.skipped??0)+1,requestAnimationFrame(B);return}let n=ne??Math.min(.1,(e-A)/1e3);A=e,j+=n*(X.timeK??1);let r=!m||!!m.tex&&(q.get(`swell`)===`0`||!!d.swell);M=O&&r?O(e,n*1e3)??1:k&&r?vn:O||k?1:pn;let i=r?k?.before(e)??null:null;if(P==null&&!k&&_.step(n),d.frame(_,X.freeze??P??F??100+j,{...D,load:M,tag:i}),r&&R?.(e,t),x?.(_),X.frames++,X.wall.push(n*1e3),X.wall.length>1200&&X.wall.splice(0,600),X.ready=!0,X.frames%20==0){let e=d.gpu,t=Z(X.wall.slice(-60));Jt.textContent=`${Y.width}x${Y.height}, MSAA ${d.msaa}, ${l.length} sets, ${d.patches} patches${M>1?`, drawn ${M} times`:``}\nframe ${Q(t)} ms${e?`; GPU: FFT and ripples ${$(Z(e.fft.slice(-60)))} ms, sea and sky ${$(Z(e.draw.slice(-60)))} ms`:`; submit to done ${Q(Z(d.doneMs.slice(-60)))} ms`}\neye ${_.h.toFixed(1)} m, pitch ${(_.pitch*180/Math.PI).toFixed(0)}°${Sn?`\n${Sn}`:``}${X.errors.length?`\n${X.errors.join(`
`)}`:``}`}if(v&&X.frames>=v){let e=d.gpu;Object.assign(X,{done:!0,fftMs:e?Z(e.fft.slice(10)):null,drawMs:e?Z(e.draw.slice(10)):null,postMs:e?Z(e.post.slice(10)):null,frameMs:Z(X.wall.slice(10)),doneMs:Z(d.doneMs.slice(10)),patches:d.patches,perLevel:d.perLevel,vertices:d.vertices,cpuMs:Z(d.cpuMs.slice(10)),size:[Y.width,Y.height]}),X.fft=e?.fft??[],X.draw=e?.draw??[],Xt([navigator.userAgent,location.href,`canvas ${Y.width}x${Y.height}, rendered ${d.renderSize?.join(`x`)}`,`GPU: compute ${$(X.fftMs)} ms, sea and sky with resolve and present ${$(X.drawMs)} ms, of which resolve and present ${$(X.postMs)} ms; frame ${Q(X.frameMs)} ms`].join(`
`))}else requestAnimationFrame(B)};requestAnimationFrame(B)}qt||Cn().catch(e=>Yt(`sim2 failed: ${e.message}`));