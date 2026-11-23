/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import{$n as e,$r as t,A as n,Gi as r,Hn as i,Ja as a,La as o,Ln as s,Lt as c,Mn as l,O as u,R as d,Rn as f,Tn as p,U as m,V as h,Wi as g,Wr as _,Yt as v,ar as y,ct as b,ft as x,io as S,ir as C,j as w,jt as T,mr as E,mt as D,no as O,pa as k,pr as A,qt as j,ro as M,ta as ee,zi as te}from"./three.core-Dp-eO7LC.js";import{i as ne}from"./fftsea-BlV7h9PB.js";import{I as N,R as re,f as ie,m as P,p as F}from"./waves-B5Ut6Mnp.js";import{m as ae,p as oe,r as se}from"./atmosphere-CzlQdgsZ.js";import"./fftgpu-CavxKjr5.js";import{i as ce}from"./GLTFLoader-DYpI7M-x.js";var I=12,L=24,le=.01,R=[.04,.1,.16,.22];function ue(e){let t=e?.spec?.cockpit;if(!t)return null;let n=e.spec.L;return{a0:t.x0-.05,a1:t.x1+.1,aMid:(t.x0+t.x1)/2,deckY:t=>e.base+e.deckRel((-t+n/2)/n),L:n}}function de(e,t){let r=ue(t),i=e.getAttribute(`position`),a=e.getAttribute(`normal`),o=new Float32Array(i.count);if(e.setAttribute(`aInner`,new n(o,1)),!r)return 0;let s=e.index?t=>e.index.getX(t):e=>e,c=(e.index?e.index.count:i.count)/3,l=new Map,u=new Int32Array(i.count);for(let e=0;e<i.count;e++){let t=`${Math.round(i.getX(e)*1e4)},${Math.round(i.getY(e)*1e4)},${Math.round(i.getZ(e)*1e4)}`;l.has(t)||l.set(t,l.size),u[e]=l.get(t)}let d=Array.from({length:l.size},()=>[]);for(let e=0;e<c;e++)for(let t=0;t<3;t++)d[u[s(3*e+t)]].push(e);let f=new Uint8Array(c),p=new Uint8Array(c),m=[];for(let e=0;e<c;e++){let t=0,n=0,o=0,c=0;for(let r=0;r<3;r++){let l=s(3*e+r);t+=i.getX(l)/3,n+=i.getY(l)/3,o-=i.getZ(l)/3,c+=a.getY(l)/3}f[e]=+(o>r.a0&&o<r.a1&&Math.abs(t)<.235&&n<r.deckY(o)-.025);let l=c>.9&&Math.abs(t)<.06&&(o>.25&&o<.65&&n<.09||o>-.4&&o<-.2&&n>.1);f[e]&&l&&(p[e]=1,m.push(e))}let h=new Uint8Array(l.size);for(;m.length;){let e=m.pop();for(let t=0;t<3;t++){let n=u[s(3*e+t)];h[n]=1;for(let e of d[n])f[e]&&!p[e]&&(p[e]=1,m.push(e))}}let g=0;for(let e=0;e<i.count;e++)h[u[e]]&&(o[e]=1,g++);return g}function fe(e,t){let n=ue(e);if(!n||!t?.getAttribute(`aInner`))return null;let r=t.getAttribute(`position`),i=t.getAttribute(`aInner`),a=(n.a1-n.a0)/11,o=Array(I).fill(0),s=Array(I).fill(1/0),c=Array(I).fill(0),l=Array.from({length:25},()=>R.map(()=>0)),u=Array(25).fill(-1/0);for(let t=0;t<r.count;t++){let s=(-r.getZ(t)-n.a0)/a,d=Math.abs(r.getX(t)),f=r.getY(t),p=i.getX(t)>.5;if(!p){let n=Math.round((.5-r.getZ(t)/e.spec.L)*L);n>=0&&n<=L&&(R.forEach((e,t)=>{f>=e&&(l[n][t]=Math.max(l[n][t],d))}),u[n]=Math.max(u[n],f))}for(let e=Math.max(0,Math.round(s)-1);e<=Math.min(11,Math.round(s)+1);e++)Math.abs(s-e)>.75||(p?o[e]=Math.max(o[e],d):f>.05&&f<.16&&(c[e]=Math.max(c[e],d)))}for(let e=0;e<I;e++)s[e]=c[e]>0?c[e]:1/0;let d=o.map((e,t)=>Math.max(0,Math.min(e+.005,s[t]-.02))),f=o.map((e,t)=>n.deckY(n.a0+t*a)-.005),p=l.map(e=>e.map(e=>Math.max(0,e-le)));for(let t=0;t<I;t++){let r=Math.round((.5+(n.a0+t*a)/e.spec.L)*L);r>=0&&r<=L&&(p[r]=p[r].map(e=>Math.max(e,d[t]+.005)))}let m=u.map((e,t)=>Number.isFinite(e)?e:u[t-1]??u[t+1]??.3);return{a0:n.a0,a1:n.a1,widths:d,tops:f,outline:p,deck:m,openY:Math.min(...f)-.04,L:e.spec.L,halfBeam:(e.spec.B??.46)/2}}function pe(){return{uCkN:{value:0},uCkInv:{value:Array.from({length:6},()=>new C)},uCkBox:{value:new O},uCkW:{value:Array(I).fill(0)},uCkTop:{value:Array(I).fill(0)},uCkHull:{value:new O},uCkOpen:{value:0},uCkOut:{value:Array.from({length:25},()=>new S)},uCkDeck:{value:Array(25).fill(0)}}}var me=[`uCkN`,`uCkInv`,`uCkBox`,`uCkW`,`uCkTop`,`uCkHull`,`uCkOut`,`uCkDeck`];function he(e,t,n){if(!t){e.uCkN.value=0;return}e.uCkBox.value.set(t.a0,t.a1),e.uCkW.value=t.widths,e.uCkTop.value=t.tops,e.uCkHull.value.set(t.L,t.halfBeam),e.uCkOpen.value=t.openY,e.uCkOut&&t.outline.forEach((t,n)=>e.uCkOut.value[n].fromArray(t)),e.uCkDeck&&(e.uCkDeck.value=t.deck);let r=0;for(let t of n)!t||!t.visible||r>=6||(e.uCkInv.value[r].copy(t.matrixWorld).invert(),r++);e.uCkN.value=r}var ge=`
#define CK_MAX 6
uniform int uCkN;
uniform mat4 uCkInv[CK_MAX];
uniform vec2 uCkBox;
uniform float uCkW[${I}];
uniform float uCkTop[${I}];
uniform vec2 uCkHull;
uniform vec4 uCkOut[25];
uniform float uCkDeck[25];
vec2 ckAt(float a) {
float f = (a - uCkBox.x) / max(uCkBox.y - uCkBox.x, 1e-3) * ${11 .toFixed(1)};
if (f < 0.0 || f > ${11 .toFixed(1)}) return vec2(0.0);
int k = int(min(floor(f), ${10 .toFixed(1)}));
vec2 p = vec2(uCkW[0], uCkTop[0]), q = vec2(uCkW[1], uCkTop[1]);
for (int i = 1; i < 11; i++) if (i == k) { p = vec2(uCkW[i], uCkTop[i]); q = vec2(uCkW[i + 1], uCkTop[i + 1]); }
return mix(p, q, f - float(k));
}
bool inCockpit(vec3 wp) {
for (int i = 0; i < CK_MAX; i++) {
if (i >= uCkN) break;
vec3 lp = (uCkInv[i] * vec4(wp, 1.0)).xyz; vec2 c = ckAt(-lp.z);
if (abs(lp.x) < c.x && lp.y < c.y && lp.y > 0.0) return true;
}
return false;
}
float deckAt(float s) {
float f = clamp(s, 0.0, 1.0) * ${L.toFixed(1)}; int k = int(min(floor(f), ${23 .toFixed(1)}));
float p = uCkDeck[0], q = uCkDeck[1];
for (int i = 1; i < ${L}; i++) if (i == k) { p = uCkDeck[i]; q = uCkDeck[i + 1]; }
return mix(p, q, f - float(k));
}
float outAt(float s, float y) {
float f = clamp(s, 0.0, 1.0) * ${L.toFixed(1)}; int k = int(min(floor(f), ${23 .toFixed(1)}));
vec4 p = uCkOut[0], q = uCkOut[1]; float dp = uCkDeck[0], dq = uCkDeck[1];
for (int i = 1; i < ${L}; i++) if (i == k) { p = uCkOut[i]; q = uCkOut[i + 1]; dp = uCkDeck[i]; dq = uCkDeck[i + 1]; }
vec4 w = mix(p, q, f - float(k)); float top = mix(dp, dq, f - float(k));
const vec4 h = vec4(${R.map(e=>e.toFixed(3)).join(`, `)});
  if (y <= h.x) return w.x;
  if (y <= h.y) return mix(w.x, w.y, (y - h.x) / (h.y - h.x));
  if (y <= h.z) return mix(w.y, w.z, (y - h.y) / (h.z - h.y));
  if (y <= h.w) return mix(w.z, w.w, (y - h.z) / (h.w - h.z));
  return mix(w.w, 0.0, clamp((y - h.w) / max(top - h.w, 1e-3), 0.0, 1.0));
}
bool inHull(vec3 wp, float lift) {   // world: a point drawn lift above the water, where a boat's hull covers that water seen from straight above
  for (int i = 0; i < CK_MAX; i++) {
    if (i >= uCkN) break;
    vec3 up = (uCkInv[i] * vec4(0.0, 1.0, 0.0, 0.0)).xyz, w = (uCkInv[i] * vec4(wp, 1.0)).xyz - up * lift;     // the world's up and the water, in the boat's frame
    float upY = max(up.y, 0.2 * length(up)), s = 0.5 - w.z / uCkHull.x;
    vec3 q = w;
    for (int k = 0; k < 2; k++) { q = w + up * ((deckAt(s) - w.y) / upY); s = 0.5 - q.z / uCkHull.x; }   // up (or down) the vertical to the deck's top there
    if (s > 0.0 && s < 1.0 && abs(q.x) < outAt(s, w.y)) return true;
  }
  return false;
}
`;function _e(){let e=()=>{let e=new x(new Uint16Array(9216).fill(D.toHalfFloat(.03)),48,48,t,v);return Object.assign(e,{minFilter:f,magFilter:f,wrapS:h,wrapT:h,generateMipmaps:!1}),e.needsUpdate=!0,e};return{uSkyR:{value:e()},uSkyM:{value:e()},uSkyExp:{value:new M(20,20,20)},uSunDisc:{value:new M(2e5,2e5,2e5)},uSunE:{value:new M(15,15,15)},uCloudSun:{value:new M(4,4,4)},uCloudAmb:{value:new M(1,1,1)},uFogExt:{value:new M(5e-5,1e-4,2e-4)},uSkyPhase:{value:new S(.72,.96,.25,0)},uLook:{value:new S(.6,1.5,2,40)},uSatFade:{value:new O(.7,2.5)},uClW:{value:new S(.35,.03,.12,.4)},uClLow:{value:new S(1,.8,1100,.35)},uClTow:{value:new S(.028,.3,0,0)},uSunOcc:{value:1},uClGain:{value:1},uClSunM:{value:new M(4,4,4)},uClSunH:{value:new M(4,4,4)},uClSunTop:{value:new M(4,4,4)},uBleach:{value:.4},uGlintCol:{value:new M(1,.95,.85)},uWDeep:{value:new M(.002,.05,.1)},uWBot:{value:new M(.1,.1,.08)},uWKd:{value:new M(.6,.15,.06)},uWSss:{value:new M(.03,.4,.34)}}}var ve=[`uSunDir`,`uCloud`,`uCloudDark`,`uSunT`,`uSeaAmb`,...Object.keys(_e())],ye=`
uniform vec3 uSunDir;
uniform float uCloud;
uniform float uCloudDark;
uniform float uSunT;
uniform float uSeaAmb;
uniform sampler2D uSkyR, uSkyM;
uniform vec3 uSkyExp, uSunDisc, uSunE, uCloudSun, uCloudAmb, uFogExt;
uniform vec4 uSkyPhase;
uniform vec4 uLook;
uniform float uBleach;
uniform vec2 uSatFade;
uniform vec4 uClW;
uniform vec4 uClLow;
uniform vec4 uClTow;
uniform vec3 uClSunM, uClSunH, uClSunTop;
uniform float uClGain;
uniform float uSunOcc;
uniform vec3 uGlintCol;
float skyH(vec2 p) { p = mod(p, 289.0); vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float skyN(vec2 p) {
vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
return mix(mix(skyH(i), skyH(i + vec2(1.0, 0.0)), f.x), mix(skyH(i + vec2(0.0, 1.0)), skyH(i + vec2(1.0, 1.0)), f.x), f.y);
}
float skyLumF(vec3 c) { return dot(c, vec3(0.2126, 0.7152, 0.0722)); }
vec3 toneMapL(vec3 x) {
float fs = clamp((max(max(x.r, x.g), x.b) - uSatFade.x) / (uSatFade.y - uSatFade.x), 0.0, 1.0), sat = mix(uLook.y, 1.0, fs * fs * (3.0 - 2.0 * fs));
float lm = skyLumF(x); vec3 y = max(vec3(lm) + (x - vec3(lm)) * sat, 0.0);
float m = max(max(y.r, y.g), y.b), k = uLook.x;
if (m > k) {
float mc = k + (1.0 - k) * (1.0 - exp(-(m - k) / (1.0 - k)));
float t = clamp((m - uLook.z) / (uLook.w - uLook.z), 0.0, 1.0), wb = uBleach * t * t * (3.0 - 2.0 * t);
y = mix(y * (mc / m), vec3(mc), wb);
}
return min(y, 1.0);
}
vec3 toneEnc(vec3 x) { return pow(toneMapL(x), vec3(1.0 / 2.2)); }
float phaseHG(float c, float g) { float g2 = g * g; return (1.0 - g2) / (12.566371 * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
float phaseCS(float c, float g) { float g2 = g * g; return 0.11936621 * (1.0 - g2) * (1.0 + c * c) / ((2.0 + g2) * pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5)); }
vec3 skyLin(vec3 d) {
float el = asin(clamp(d.y, -1.0, 1.0)), t = sign(el) * sqrt(abs(el) / 1.5707963);
float v = clamp((t - (${se.toFixed(4)})) / (1.0 - (${se.toFixed(4)})), 0.0, 1.0);
vec2 hs = normalize(uSunDir.xz + vec2(1e-5)), hd = normalize(d.xz + vec2(1e-5));
float az = acos(clamp(dot(hs, hd), -1.0, 1.0)) / 3.14159265;
vec2 uv = vec2(az, v) * (vec2(47.0, 47.0) / vec2(48.0, 48.0)) + 0.5 / vec2(48.0, 48.0);
float c = dot(d, uSunDir), ph = mix(phaseCS(c, uSkyPhase.x), phaseHG(c, uSkyPhase.y), uSkyPhase.z);
return (texture(uSkyR, uv).rgb + texture(uSkyM, uv).rgb * ph) * uSkyExp;
}
float gCloudA;
float gSunT;
float gClK;
float clF(vec2 p, int n, float lod) {
float s = 0.0, a = 0.5, fr = 1.0, A = 0.0, F = 0.0, R = 0.0;
for (int i = 0; i < 6; i++) {
if (i >= n) break;
float w = clamp(1.6 - lod * fr * 2.0, 0.0, 1.0);
s += a * w * (skyN(p) - 0.5); A += a; F += a * a; R += a * a * w * w;
p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; fr *= 2.03;
}
gClK = sqrt(R / F);
return 0.5 + s / (A * max(gClK, 0.35));
}
float toShell(vec3 d, float h) { float b = 6360002.0 * d.y, c = (h - 2.0) * (2.0 * 6360000.0 + h + 2.0); return c / (sqrt(b * b + c) + b); }
vec3 clAir(vec3 d, float t, float h) { float H = 1500.0, path = min(t, H * (1.0 - exp(-h / H)) / max(d.y, 1e-3)); return exp(-uFogExt * path); }
vec3 clSunAt(float h) {
return h < 4500.0 ? mix(uCloudSun, uClSunM, clamp((h - 1200.0) / 3300.0, 0.0, 1.0))
: h < 9000.0 ? mix(uClSunM, uClSunH, (h - 4500.0) / 4500.0) : mix(uClSunH, uClSunTop, clamp((h - 9000.0) / 2000.0, 0.0, 1.0));
}
float hgN(float c, float g) { float g2 = g * g; return (1.0 - g2) / pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5); }
float clThr(float c) { float x = 0.5 - clamp(c, 0.0, 1.0); return 0.5 + 0.30 * x + 0.9 * x * x * x; }
float clVaryK(vec3 d) {
vec2 p = normalize(d.xz + vec2(1e-5)) * (1.0 - asin(min(d.y, 1.0)) / 1.5707963) * 1.15;
float vn = skyN(p + vec2(4.7, 1.3)) * 0.65 + skyN(p * 2.1 + vec2(1.1, 8.3)) * 0.35;
return uClW.w * 3.0 * (2.0 * smoothstep(0.22, 0.78, vn) - 1.0);
}
float clCov(float c, float k) { c = clamp(c, 0.0, 1.0); float o = c * exp(k); return o / (o + 1.0 - c); }
float clExpLo(vec3 sunCol) {
float m = max(max(sunCol.r, sunCol.g), max(sunCol.b, 1e-3));
return mix(min(1.0, 3.1 / (uClGain * m)), 1.0, smoothstep(0.06, 0.3, uSunDir.y));
}
vec3 clLight(vec3 sunCol, float lit, float thick, float dens, float under, float cs, float fwdG) {
float edge = dens * (1.0 - thick), fwd = hgN(cs, fwdG), up = clamp(uSunDir.y * 1.3 + 0.15, 0.0, 1.0);
vec3 side = sunCol * 0.42 * (0.06 + 0.94 * lit) * (0.8 + 0.2 * min(fwd, 4.0) * (1.0 - thick));
vec3 base = mix(sunCol, vec3(skyLumF(sunCol)), 0.6 * thick) * up * 0.8 * mix(0.6, 0.04, thick);
vec3 sun = (mix(side, base, under) + sunCol * 0.5 * edge * max(fwd - 1.0, 0.0)) * (uClGain * clExpLo(sunCol));
return sun + mix(vec3(skyLumF(uCloudAmb)), uCloudAmb, 0.5) * 0.45 * (1.0 - 0.5 * thick * under);
}
vec4 gV, gV2;
#ifdef CL_VOLTEX
uniform samplerCube uVolCube;
uniform float uVolTx;
#endif
vec4 gVol;
vec4 gVT;
float gVv;
float skyH3(vec3 p) { p = mod(p, 289.0); vec3 p3 = fract(p * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float clN3(vec3 p) {
p = vec3(p.x + 0.43 * p.y, p.y + 0.31 * p.x - 0.37 * p.z, p.z + 0.29 * p.y);
vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
float a = mix(skyH3(i), skyH3(i + vec3(1.0, 0.0, 0.0)), f.x), b = mix(skyH3(i + vec3(0.0, 1.0, 0.0)), skyH3(i + vec3(1.0, 1.0, 0.0)), f.x);
float c = mix(skyH3(i + vec3(0.0, 0.0, 1.0)), skyH3(i + vec3(1.0, 0.0, 1.0)), f.x), e = mix(skyH3(i + vec3(0.0, 1.0, 1.0)), skyH3(i + vec3(1.0, 1.0, 1.0)), f.x);
return 0.5 + 1.6 * (mix(mix(a, b, f.y), mix(c, e, f.y), f.z) - 0.5);
}
float clVolD(vec2 xz, float h, float lod, float det) {
float hf = (h - gV.x) / gV.y;
gVv = -1e4;
if (hf < -0.1 || hf > 1.05) return 0.0;
vec2 q = xz / gV.z;
vec2 w = 0.55 * vec2(skyN(q * 0.45 + vec2(9.1, 2.3)), skyN(q * 0.45 + vec2(3.7, 7.9)));
float v = -1e4, cuT = gVT.y, thk = 0.0;
if (hf < cuT * 1.05) {
float e = clF(q + w + vec2(3.1, 1.4), 4, lod) - gV.w;
if (e > -0.07) {
float top = pow(1.0 - exp(-2.2 * max(e, 0.0) / gV2.y), gV2.z) * cuT;
float base = 0.12 * gV2.x * (1.0 - smoothstep(0.0, 0.1, e));
float vS = (top - hf) * gV.y, eN = -gV2.y / 2.2 * log(max(1.0 - pow(clamp(hf / cuT, 0.0, 0.999), 1.0 / gV2.z), 1e-3));
float vH = (e - eN) * 1.3 * gV.z;
v = min((hf - base) * gV.y, vS > 0.0 ? min(vS, vH) : max(vS, vH));
thk = (top - base) * gV.y;
}
}
float tw = 0.0;
if (gVT.x < 1.5) {
vec2 qT = q * 0.4 + w * 0.3 + vec2(7.3, 2.9);
float eT = clF(qT, 3, lod * 0.4) - gVT.x, rn = skyN(qT * 0.5 + vec2(5.3, 2.7));
if (eT > -0.07) {
float R = mix(0.4, 1.0, smoothstep(0.25, 0.65, rn)), top = min(pow(max(eT, 0.0) / 0.22, 0.6), 1.0) * R;
float vS = (top - hf) * gV.y, vH = hf < R ? (eT - 0.22 * pow(max(hf, 0.0) / R, 1.667)) * 1.5 * gV.z : vS;
float bT = 0.1 * (1.0 - smoothstep(0.0, 0.08, eT)), vT = min((hf - bT) * gV.y, vS > 0.0 ? min(vS, vH) : max(vS, vH));
if (vT > v) { v = vT; tw = 1.0; thk = (top - bT) * gV.y; }
}
if (gVT.z > 0.0 && hf > 0.7) {
vec2 qa = qT - vec2(0.3, 0.08);
float m = gVT.z * smoothstep(0.45, 0.7, skyN(qa * 0.5 + vec2(5.3, 2.7))) * smoothstep(-0.2, 0.02, clF(qa, 2, lod * 0.4 + 1.0) - gVT.x);
float vA = min(hf - (0.985 - 0.14 * m), (0.985 - 0.03 * (1.0 - m)) - hf) * gV.y;
if (vA > v) { v = vA; tw = 1.0; thk = (0.11 * m + 0.03) * gV.y; }
}
}
gVv = v;
float up = tw > 0.0 ? clamp(hf * 1.5, 0.0, 1.0) : clamp(hf / cuT, 0.0, 1.0);
float Ab = (tw > 0.0 ? 0.16 * gV.y : min(0.1 * gV.z, 0.3 * thk + 0.02 * gV.z)) * gV2.x, Am = min(gV.z * mix(0.03, 0.16, gV2.x), 0.33 * thk + 0.02 * gV.z);
if (v < -gVT.w - 0.45 * (Ab + Am)) return 0.0;
vec3 p3 = vec3(xz.x, h * 1.3, xz.y) / (gV.z * 0.16);
if (det != 0.0) v += (min(abs(2.0 * clN3(p3 * (tw > 0.0 ? 0.22 : 0.32) + vec3(4.4, 0.0, 8.1)) - 1.0), 1.0) - 0.55) * abs(det) * Ab * (0.3 + 0.7 * up);
if (det > 0.0) {
float fk = clamp(2.0 * det - 1.0, 0.0, 1.0), nm = min(abs(2.0 * clN3(p3) - 1.0), 1.0);
float nf = det > 0.5 ? mix(0.4, min(abs(2.0 * clN3(p3 * 2.6 + vec3(1.3, 4.1, 2.9)) - 1.0), 1.0), fk) : 0.4;
v += (nm * 0.68 + nf * 0.32 - 0.55) * det * Am * (0.25 + 0.75 * up);
}
return smoothstep(0.0, gVT.w, v);
}
#if defined(CL_VOL) || defined(CL_VOLONLY)
vec4 clVolMarch(vec3 d, vec3 c0, float cs, float vary) {
float cell = 1500.0 * uClLow.y, hb = uClLow.z, puff = uClLow.x, devel = smoothstep(0.03, 0.21, uClTow.x) * puff;
float depth = cell * mix(0.15, 0.6, puff) * (1.0 + 3.0 * devel) * (1.0 + 0.8 * uClTow.z);
float cov = clCov(uClW.x, vary);
gV = vec4(hb, depth, cell, clThr(cov)); gV2 = vec4(puff, mix(0.08, 0.3, puff), mix(1.0, 0.7, puff), devel);
float t0 = toShell(d, max(hb - 0.1 * depth, 20.0)), t1 = min(toShell(d, hb + 1.1 * depth), t0 + 40000.0);
float L = t1 - t0, ds0 = max(L / 64.0, 120.0), dsF = max(0.25 * ds0, 30.0), ds = ds0, fineN = 0.0, Dp = 0.0, tF = t0;
gVT = vec4(devel > 0.05 ? clThr(cov * mix(0.4, 0.55, uClTow.z) * devel) : 2.0, 1.0 / ((1.0 + 3.0 * devel) * (1.0 + 0.8 * uClTow.z)), uClTow.z * devel,
max(50.0 + 0.012 * depth, 0.3 * ds0));
float ign = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
float t = t0 + ds0 * ign;
float ph = 0.8 * hgN(cs, 0.55) + 0.2 * hgN(cs, -0.2), ph2 = hgN(cs, 0.3), sig = 0.012, sl = 40.0 + 0.04 * depth, Tv = 1.0;
vec3 acc = vec3(0.0), ambC = mix(vec3(skyLumF(uCloudAmb)), uCloudAmb, 0.5);
float kMs = mix(0.45, 1.0, smoothstep(0.06, 0.3, uSunDir.y));
float detS = clamp(1.5 - dsF / (0.06 * cell), 0.0, 1.0);
float cuH = hb + 1.15 * gVT.y * depth, dsC = min(max(1.2 * gVT.y * depth / (64.0 * max(d.y, 0.02)), 120.0), ds0), dsCF = max(0.25 * dsC, 30.0);
float detC = clamp(1.5 - dsCF / (0.06 * cell), 0.0, 1.0);
float mg = gVT.w + 0.45 * (0.1 * cell * puff + cell * mix(0.03, 0.16, puff)) + (gVT.x < 1.5 ? 0.06 * depth : 0.0);
for (int i = 0; i < 160; i++) {
if (t > t1 || Tv < 0.03) break;
float h = 2.0 + t * d.y + t * t * 7.86e-8;
vec2 xz = d.xz * t;
bool inC = h < cuH;
float sL = inC ? dsC : ds0, sF = inC ? dsCF : dsF;
float lod = 0.0015 * t / (gV.z * sqrt(max(d.y, 0.01))), det = min(clamp(2.0 - lod * 8.0, 0.0, 1.0), inC ? detC : detS);
if (fineN <= 0.0) {
clVolD(xz, h, lod, 0.0);
if (gVv > -mg * det - gVT.w) { t = max(t - 0.9 * sL, tF); ds = sF; fineN = 1.0 + ceil(1.5 * sL / sF); Dp = 0.0; continue; }
t += sL; continue;
}
float D = clVolD(xz, h, lod, det);
if (D > 0.002 && Dp <= 0.002) {
float ta = t - ds, tb = t;
for (int k = 0; k < 3; k++) {
float tm = 0.5 * (ta + tb), hm = 2.0 + tm * d.y + tm * tm * 7.86e-8;
if (clVolD(d.xz * tm, hm, lod, det) > 0.002) tb = tm; else ta = tm;
}
t = tb + 0.5 * ds; h = 2.0 + t * d.y + t * t * 7.86e-8; xz = d.xz * t; D = max(clVolD(xz, h, lod, det), 0.003);
}
Dp = D;
if (D > 0.002) {
fineN = 1.0 + ceil(1.5 * sL / sF);
float lsl = sl / gV.z;
float tau = 1.2 * sl * clVolD(xz + uSunDir.xz * (0.5 * sl), h + uSunDir.y * (0.5 * sl), lod, det * 0.6)
+ 2.0 * sl * clVolD(xz + uSunDir.xz * (2.0 * sl), h + uSunDir.y * (2.0 * sl), lod + 2.0 * lsl, -det * 0.6)
+ 4.0 * sl * clVolD(xz + uSunDir.xz * (5.0 * sl), h + uSunDir.y * (5.0 * sl), lod + 5.0 * lsl, -det * 0.6);
float Tl = exp(-sig * tau), hf = clamp((h - hb) / depth, 0.0, 1.0);
float pw = mix(1.0, 1.0 - exp(-2.0 * sig * tau), 0.7 * (0.5 - 0.5 * cs));
float ms = Tl * ph + (0.6 * sqrt(Tl) * ph2 + 0.38 * kMs * pow(Tl, 0.25) * (0.6 + 0.4 * hf)) * pw;
vec3 sH = clSunAt(h), Lc = sH * (uClGain * 0.42 * clExpLo(sH)) * ms + ambC * mix(0.22, 0.7, hf) * mix(1.0, pw, 0.5);
Lc = mix(Lc, uCloudAmb * 0.45 * (0.55 + 0.45 * Tl), uCloudDark);
vec3 Ta = clAir(d, t, max(h, 50.0)); Lc = Lc * Ta + c0 * (1.0 - Ta);
float a = 1.0 - exp(-sig * D * ds);
acc += Tv * a * Lc; Tv *= 1.0 - a;
}
fineN = D <= 0.002 && gVv < -mg * det - gVT.w ? 0.0 : fineN - 1.0;
ds = fineN > 0.0 ? (D > 0.002 ? clamp(0.5 / (sig * D), 30.0, sF) : sF) : sL;
tF = t + ds;
t += ds;
}
return vec4(acc, 1.0 - Tv);
}
#endif
vec3 cloudLayers(vec3 d, vec3 c) {
gCloudA = 0.0; gSunT = 1.0;
if (d.y <= 0.0) return c;
vec3 c0 = c;
float cs = dot(d, uSunDir), el = asin(min(d.y, 1.0));
vec2 toSun = normalize(uSunDir.xz + vec2(1e-4));
float faceV = 0.5 - 0.5 * dot(normalize(d.xz + vec2(1e-5)), toSun), sideK = mix(1.0, 0.12 + 0.88 * faceV, 1.0 - smoothstep(0.15, 0.7, uSunDir.y));
float vary = clVaryK(d);
#ifndef CL_VOLONLY
if (uClW.z > 0.002) {
float t = toShell(d, 9000.0); vec2 x = d.xz * t, r = vec2(x.x * 0.8 + x.y * 0.6, -x.x * 0.6 + x.y * 0.8);
float lod = 0.0027 * t / (450.0 * sqrt(max(d.y, 0.01)));
vec2 bq = r / vec2(14000.0, 7000.0), wq = r / vec2(16000.0, 8000.0);
float bank = skyN(bq + vec2(3.3, 8.1)) * 0.65 + skyN(bq * 2.1 + vec2(6.2, 0.7)) * 0.35;
float bend = (skyN(wq + vec2(1.9, 4.4)) - 0.5) + 0.5 * (skyN(wq * 2.3 + vec2(8.8, 2.6)) - 0.5);
float n = clF(vec2(r.x / 7000.0, (r.y + 1200.0 * bend) / 450.0) + vec2(7.3, 2.2), 5, lod);
float cov = clCov(uClW.z, vary + 1.8 * (2.0 * smoothstep(0.25, 0.75, bank) - 1.0)), thr = clThr(0.55 * cov);
float a = smoothstep(thr - 0.07, thr + 0.28, n); a = a * a * (0.18 + 0.32 * cov) + 0.08 * cov * cov;
vec3 col = clLight(uClSunH, 0.9, 0.0, a, 0.0, cs, 0.75);
vec3 T = clAir(d, t, 9000.0); col = col * T + c * (1.0 - T);
c = mix(c, col, a); gCloudA = max(gCloudA, a * 0.5); gSunT *= 1.0 - 0.5 * a;
}
if (uClW.y > 0.002) {
float L = mix(900.0, 2000.0, uClTow.w), t = toShell(d, 4500.0); vec2 q = d.xz * t / L; float lod = 0.0015 * t / (L * sqrt(max(d.y, 0.01)));
float n = clF(q * vec2(1.0, 1.3) + vec2(2.1, 5.7), 5, lod), n2 = clF(q * vec2(1.0, 1.3) + toSun * 0.15 + vec2(2.1, 5.7), 3, lod);
float cov = clCov(uClW.y, vary), sheet = uClTow.w;
float soft = mix(0.10, 0.40, sheet) + 0.12 * (1.0 - gClK), thr = clThr(cov) - 0.5 * soft;
float a = smoothstep(thr, thr + soft, n) * mix(0.92, 0.55 + 0.4 * cov, sheet);
float lit = clamp(0.7 - (n2 - n) * 6.0, 0.1, 1.0);
float thick = mix(0.25 * a, 0.35 + 0.6 * smoothstep(thr + 0.1, thr + 0.6, n), sheet);
float underM = mix(0.5 * smoothstep(0.02, 0.4, d.y), 1.0, sheet);
vec3 col = clLight(uClSunM, lit * mix(sideK, 1.0, underM), thick, a, underM, cs, 0.6);
col = mix(col, uCloudAmb * 0.5 * (0.8 + 0.3 * lit), uCloudDark * sheet);
vec3 T = clAir(d, t, 4500.0); col = col * T + c * (1.0 - T);
c = mix(c, col, a); gCloudA = max(gCloudA, a); gSunT *= 1.0 - 0.8 * a;
}
if (uClTow.y > 0.002 && uClTow.x > 0.001 && el < uClTow.x * 1.16) {
float az = atan(d.x, -d.z), K = 20.0, u = az * K / 6.2831853, iu = floor(u);
float azS = atan(uSunDir.x, -uSunDir.z), eN = clF(vec2(az * 150.0, el * 150.0) + vec2(5.0, 1.0), 4, 0.0);
float aT = 0.0; vec3 colT = vec3(0.0);
for (int k = -1; k <= 1; k++) {
float ci = mod(iu + float(k) + K, K), h1 = skyH(vec2(ci, 17.0)), h2 = skyH(vec2(ci, 23.0)), h3 = skyH(vec2(ci, 31.0)), h4 = skyH(vec2(ci, 43.0));
float c0 = (iu + float(k) + 0.2 + 0.6 * h2) * 6.2831853 / K;
if (h1 > min(clCov(uClTow.y, clVaryK(vec3(sin(c0), 0.05, -cos(c0)))), 0.9)) continue;
float sz = 0.55 + 0.45 * h3, H = uClTow.x * sz, wC = H * (0.2 + 0.22 * h4) * (1.0 + 0.4 * uClTow.z), D = 30000.0 / sz;
float sg = h3 > 0.5 ? 1.0 : -1.0, wA = min(wC * (2.0 + 1.6 * h2), 0.3);
float dz = mod(az - c0 + 3.14159265, 6.2831853) - 3.14159265, x = dz / wC;
if (abs(dz) > max(wA * uClTow.z, wC * 1.3) + 0.02) continue;
vec2 bq = vec2(dz, el) * (12.0 / H) + vec2(ci * 7.3, ci * 3.1);
float lobe = clF(vec2(x * 2.4 + ci * 5.1, ci * 2.3), 3, 0.0), bl = clF(bq, 4, 0.0);
float prof = H * pow(max(1.0 - x * x, 0.0), 0.3) * (0.72 + 0.45 * lobe);
float inside = prof - el + H * 0.14 * (bl - 0.5) * (0.4 + 0.6 * el / H);
float aC = smoothstep(0.0, 0.0012 + 0.003 * (1.0 - uClLow.x), inside);
float ua = sg * dz, ax = ua > 0.0 ? ua / wA : -ua / (wC * 1.1);
float aTop = H * (1.0 + 0.025 * (bl - 0.5)), th = H * (0.03 + 0.26 * pow(max(1.0 - ax, 0.0), 1.5));
float aA = uClTow.z * (1.0 - smoothstep(0.65, 1.0, ax + 0.3 * (bl - 0.5))) * smoothstep(aTop - th - 0.003, aTop - th + 0.002, el) * (1.0 - smoothstep(aTop - 0.003, aTop, el));
float a = max(aC, aA);
if (a <= aT) continue;
float zf = clamp(el / H, 0.0, 1.0), hz = D * tan(max(el, 0.0));
vec2 dh = normalize(d.xz + vec2(1e-5));
float face = 0.5 - 0.5 * dot(dh, toSun), sd = sin(azS - c0);
float bl2 = clF(bq + vec2(sd * 0.35, 0.3 + 0.4 * uSunDir.y), 4, 0.0), blit = clamp(0.55 - (bl2 - bl) * 6.0, 0.0, 1.0);
face = mix(0.55 + 0.45 * zf, face, 1.0 - smoothstep(0.15, 0.7, uSunDir.y));
float lt = clamp(face * (0.3 + 0.7 * blit) + (1.0 - face) * 0.3 * blit + 0.25 * sd * clamp(x, -1.0, 1.0) * (1.0 - smoothstep(0.3, 0.8, uSunDir.y)), 0.0, 1.0);
if (aA > aC) lt = mix(0.35 * face, 0.9, smoothstep(aTop - 0.35 * th, aTop, el));
float edge = (1.0 - smoothstep(0.0, 0.004, inside)) * aC;
vec3 sunCol = clSunAt(hz);
vec3 col = sunCol * (uClGain * clExpLo(sunCol)) * (0.42 * (0.04 + 0.96 * lt) * (0.7 + 0.3 * zf) + 0.6 * edge * max(hgN(cs, 0.7) - 1.0, 0.0))
+ mix(vec3(skyLumF(uCloudAmb)), uCloudAmb, 0.5) * (0.3 + 0.25 * zf);
col = mix(col, uCloudAmb * 0.4, uCloudDark);
vec3 T = clAir(d, D, max(hz, 50.0)); colT = col * T + c * (1.0 - T); aT = a;
}
c = mix(c, colT, aT); gCloudA = max(gCloudA, aT); gSunT *= 1.0 - aT;
}
#endif
#if defined(CL_VOL) || defined(CL_VOLONLY) || defined(CL_VOLTEX)
if (uClW.x > 0.002) {
#if defined(CL_VOLTEX)
vec3 vA = normalize(cross(d, abs(d.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0))) * uVolTx, vB = cross(d, vA);
vec4 vm = 0.25 * (textureCube(uVolCube, d + vA) + textureCube(uVolCube, d - vA) + textureCube(uVolCube, d + vB) + textureCube(uVolCube, d - vB));
#else
vec4 vm = clVolMarch(d, c0, cs, vary);
#endif
#ifdef CL_VOLONLY
gVol = vm;
#endif
c = c * (1.0 - vm.a) + vm.rgb; gCloudA = max(gCloudA, vm.a); gSunT *= 1.0 - vm.a;
}
#else
if (uClW.x > 0.002) {
float cell = 1500.0 * uClLow.y, hb = uClLow.z, puff = uClLow.x, depth = cell * mix(0.08, 0.5, puff);
float cov = clCov(uClW.x, vary), thr0 = clThr(cov), up = smoothstep(0.03, 0.5, d.y);
vec2 q0 = d.xz * toShell(d, hb) / cell;
vec2 w = 0.55 * vec2(skyN(q0 * 0.45 + vec2(9.1, 2.3)), skyN(q0 * 0.45 + vec2(3.7, 7.9)));
float deck = (1.0 - puff) * smoothstep(0.45, 0.85, cov);
vec3 acc = vec3(0.0); float A = 0.0, lit = 0.75;
for (int j = 0; j < 3; j++) {
float z = (float(j) + 0.5) / 3.0, h = hb + depth * z, t = toShell(d, h);
vec2 q = d.xz * t / cell; float lod = 0.0015 * t / (cell * sqrt(max(d.y, 0.01)));
float n = clF(q + w + vec2(3.1, 1.4), j == 0 ? 5 : 4, lod), k = gClK;
if (j == 1) lit = clamp(0.7 - (clF(q + w + toSun * 0.12 + vec2(3.1, 1.4), 3, lod) - n) * 7.0, 0.05, 1.0);
float soft = mix(0.30, 0.07, puff) + 0.12 * (1.0 - k), thr = thr0 - 0.5 * soft + puff * 0.16 * (z - 1.0 / 6.0);
float dens = smoothstep(thr, thr + soft, n), thick = smoothstep(thr, thr + soft + 0.22, n);
if (dens < 0.003) continue;
float under = mix(up * (1.0 - z), 1.0, deck);
vec3 col = clLight(uCloudSun, lit * (0.55 + 0.45 * z) * mix(sideK, 1.0, under), thick, dens, under, cs, 0.6);
col = mix(col, uCloudAmb * 0.45 * (0.75 + 0.35 * lit), uCloudDark);
vec3 T = clAir(d, t, h); col = col * T + c * (1.0 - T);
float a = dens * mix(0.8, 0.7, puff);
acc += (1.0 - A) * a * col; A += (1.0 - A) * a;
if (A > 0.985) break;
}
c = c * (1.0 - A) + acc; gCloudA = max(gCloudA, A); gSunT *= 1.0 - A;
}
#endif
return c;
}
vec3 skyBase(vec3 d, bool clouds) {
vec3 c = skyLin(d);
c = mix(c, vec3(skyLumF(c)) * vec3(0.52, 0.54, 0.57), uCloudDark);
gCloudA = 0.0; gSunT = 1.0;
if (clouds) c = cloudLayers(d, c);
return toneEnc(c);
}
vec3 sunTerm(vec3 d) {
float s = max(dot(d, uSunDir), 0.0), q = 1.0 - s;
float r2 = clamp(q / 1.07e-5, 0.0, 1.0), disc = (1.0 - smoothstep(0.8, 1.0, r2)) * (0.4 + 0.6 * sqrt(1.0 - r2));
vec3 lin = uSunDisc * disc + uSunE * (40.0 * exp(-q / 1.5e-4) + 3.0 * exp(-q / 2.0e-3));
return toneEnc(lin * uSunT) * step(1e-6, uSunT);
}
vec3 sunOver(vec3 s, vec3 d, float vis) {
float q = 1.0 - max(dot(d, uSunDir), 0.0);
float r2 = clamp(q / 1.07e-5, 0.0, 1.0), disc = (1.0 - smoothstep(0.8, 1.0, r2)) * (0.4 + 0.6 * sqrt(1.0 - r2));
vec3 lin = (uSunDisc * disc + uSunE * (2.0 * exp(-q / 1.2e-4) + 0.004 * exp(-q / 3.0e-3))) * (uSunT * vis);
return pow(min(pow(s, vec3(2.2)) + toneMapL(lin), 1.0), vec3(1.0 / 2.2));
}
vec3 skyColorC(vec3 d, bool clouds) { vec3 b = skyBase(d, clouds); return b + sunTerm(d) * (1.0 - gCloudA); }
vec3 skyColor(vec3 d) { return skyColorC(d, true); }`;function be(e){return new ee({side:2,depthWrite:!1,fog:!1,uniforms:{...Object.fromEntries(ve.map(t=>[t,e[t]])),uDistAdd:{value:0},uSkyCube:e.uSkyCube,uSkyCubeOn:e.uSkyCubeOn},vertexShader:`attribute vec3 albedo; attribute float fogD, fogH; uniform float uDistAdd; varying vec3 vAlb, vDir; varying float vD, vH;
void main() { vAlb = albedo; vD = fogD + uDistAdd; vH = fogH; vec4 w = modelMatrix * vec4(position, 1.0); vDir = w.xyz - cameraPosition; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`${ye}
varying vec3 vAlb, vDir; varying float vD, vH;
uniform samplerCube uSkyCube; uniform float uSkyCubeOn;
void main() {
vec3 d = normalize(vDir);
vec2 dh = normalize(d.xz + vec2(1e-5)), sh = normalize(uSunDir.xz + vec2(1e-5));
float face = 0.5 - 0.5 * dot(dh, sh);
vec3 E = uSunE * uSunT * mix(0.12, 0.65, face) + uCloudAmb * (3.14159 / 0.85);
vec3 land = vAlb * (1.0 / 3.14159) * E;
float z = max(vH, 1.0) / 1500.0, path = vD * (1.0 - exp(-z)) / z;
vec3 T = exp(-uFogExt * path);
vec3 hz = mix(skyLin(normalize(vec3(d.x, 0.012, d.z))), uCloudAmb * 0.9, 0.85 * smoothstep(0.3, 1.0, uClLow.w));
vec3 col = toneEnc(land * T + hz * (1.0 - T));
if (uSkyCubeOn > 0.5) col += (textureLod(uSkyCube, normalize(vec3(d.x, max(d.y, 0.012), d.z)), 3.0).rgb - toneEnc(hz)) * (1.0 - T);
gl_FragColor = vec4(col, 1.0);
}`})}var xe=`
uniform vec3 uCamPos;
uniform float uPixAng, uPixFade;
float pixelSpacing(vec3 wp) { vec3 d = uCamPos - wp; float dist = length(d); return uPixFade * dist * uPixAng / clamp(abs(d.y) / max(dist, 1e-3), 0.05, 1.0); }
`,Se=`
uniform float uTime, uChop, uCrestFoam, uHsRef, uStokes, uSharpW;
#define NE 16
uniform float uEnv[NE];
${N}
uniform vec4 uGustA;
uniform vec4 uGustB;
uniform vec4 uGustC;
uniform vec4 uGustT;
uniform sampler2D uLWTex;
uniform vec4 uLW0, uLWRect;
float lwCells(vec2 pe) { vec2 uv = (pe - uLWRect.xy) / uLWRect.zw; if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 0.0; return texture2D(uLWTex, uv).r; }
float gHash(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float gNoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(gHash(i), gHash(i + vec2(1, 0)), f.x), mix(gHash(i + vec2(0, 1)), gHash(i + vec2(1, 1)), f.x), f.y); }
float gustMask(vec2 pe) {
if (uLW0.x > 0.5) return tanh(1.3 * max(lwCells(pe), 0.0));
if (uGustC.y < 0.5) return 0.0;
vec2 gd = uGustB.xy, rel = pe - uGustT.xy;
vec2 p = vec2(dot(rel, gd) / (uGustA.y * uGustB.z), dot(rel, vec2(-gd.y, gd.x)) / uGustA.y) + uGustT.zw;
float n = 0.55 * gNoise(p) + 0.30 * gNoise(p * 2.1 + vec2(uGustC.w * 0.07, 5.3 - uGustC.w * 0.05)) + 0.15 * gNoise(p * 4.3 + vec2(-uGustC.w * 0.11, 11.7 + uGustC.w * 0.09));
return smoothstep(uGustA.z - 0.06, uGustA.z + 0.06, n);
}
float lullMask(vec2 pe) { return uLW0.x > 0.5 ? tanh(1.3 * max(-lwCells(pe), 0.0)) : 0.0; }
struct Wave { float h; float ht; vec2 disp; vec2 g; float jee; float jen; float jnn; vec2 gt; vec3 jt; float dvar; };
uniform int uFN;
uniform vec4 uFSet[32];
uniform float uFMss[32];
uniform vec2 uFCp;
uniform highp sampler2DArray uFT0, uFT1, uFT2;
uniform sampler2D uFetch;
uniform vec4 uRect;
uniform float uFetchOn, uSwellShOn;
float swellShadow(vec2 en) {
if (uSwellShOn < 0.5) return 1.0;
vec2 uv = (en - uRect.xy) / uRect.zw;
return (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) ? 1.0 : texture2D(uFetch, uv).g;
}
uniform float uTailSharp;
Wave waveEval(vec2 p0, float t, float spacing, vec3 fetch, float dmp) {
Wave w; w.h = 0.0; w.ht = 0.0; w.disp = vec2(0.0); w.g = vec2(0.0); w.jee = 0.0; w.jen = 0.0; w.jnn = 0.0; w.gt = vec2(0.0); w.jt = vec3(0.0); w.dvar = 0.0;
vec2 pf = p0 + uFCp * (uTime - t);
float sw = swellShadow(p0);
for (int s = 0; s < uFN; s++) {
vec4 S = uFSet[s];
float g = dmp;
if (S.y < 0.5) g *= sw; else if (S.y > 0.5 && S.y < 1.5) g *= fetch.x; else if (S.y > 2.5) g *= S.y < 3.5 ? fetch.y : fetch.z;
bool tail = S.y > 1.5 && S.y < 2.5;
int ch = int(S.z + 0.5);
if (ch > 0) g *= uEnv[ch] * zoneGain(ch, p0);
if (g == 0.0) continue;
float lod = max(0.0, log2(spacing * 256.0 / S.x));
float kept = clamp(1.0 - (lod - 2.0) / (2.5 + S.w), 0.0, 1.0), gm = g * uChop;
if (!tail) w.dvar += gm * gm * uFMss[s] * (1.0 - kept * kept);
if (lod > 5.0 + S.w) continue;
vec3 uvw = vec3(pf / S.x + ${(.5/256).toFixed(8)}, float(s));
vec4 a = textureLod(uFT0, uvw, lod), b = textureLod(uFT1, uvw, lod);
float jxz = textureLod(uFT2, uvw, lod).x, gc = g * uChop;
w.h += g * a.x; w.ht += g * a.y; w.disp += gc * a.zw;
if (tail) { w.gt += g * b.xy; w.jt += gc * vec3(b.z, b.w, jxz); }
else { w.g += g * b.xy; w.jee += gc * b.z; w.jnn += gc * b.w; w.jen += gc * jxz; }
}
float beta = 0.15 * uStokes * uSharpW, gain = 1.0 + 2.0 * beta * w.h / uHsRef;
w.h += beta * w.h * w.h / uHsRef; w.g *= gain; w.gt *= gain;
return w;
}
vec2 waveSlope(Wave w, out float det) {
vec3 jt = uTailSharp * w.jt;
float a11 = 1.0 + w.jee + jt.x, a12 = w.jen + jt.z, a22 = 1.0 + w.jnn + jt.y;
vec2 g = w.g + w.gt;
det = max(a11 * a22 - a12 * a12, 0.15);
return vec2(a22 * g.x - a12 * g.y, -a12 * g.x + a11 * g.y) / det;
}
vec2 waveSlopeMain(Wave w, out float det) {
float a11 = 1.0 + w.jee, a12 = w.jen, a22 = 1.0 + w.jnn;
det = max(a11 * a22 - a12 * a12, 0.15);
return vec2(a22 * w.g.x - a12 * w.g.y, -a12 * w.g.x + a11 * w.g.y) / det;
}
#define BOW_TRK_N 21
#define WAKE_MAX 8
uniform highp sampler2D uWakeTex;
uniform int uWakeN;
vec4 wakeAt(int b, int i) { return texelFetch(uWakeTex, ivec2(i, b), 0); }
vec4 bowLocal(int b, vec2 pe, vec4 P, float trkN) {
vec2 r = pe - P.xy, q0 = vec2(dot(r, P.zw), dot(r, vec2(-P.w, P.z)));
if (trkN < 2.0 || q0.x > -${3 .toFixed(1)}) return vec4(q0, P.zw);
int g = int(clamp(floor(-q0.x / ${4 .toFixed(1)}), 0.0, trkN - 2.0));
float best = 1e9; vec4 out4 = vec4(q0, P.zw);
for (int j = -2; j <= 2; j++) {
int i = g + j; if (i < 0 || float(i) > trkN - 2.0) continue;
vec4 A = wakeAt(b, i), B = wakeAt(b, i + 1);
vec2 ab = B.xy - A.xy; float t = clamp(dot(pe - A.xy, ab) / max(dot(ab, ab), 1e-6), 0.0, 1.0);
vec2 f = normalize(mix(A.zw, B.zw, t)), d = pe - mix(A.xy, B.xy, t);
float along = dot(d, f), lat = dot(d, vec2(-f.y, f.x)), score = abs(lat) + 4.0 * abs(along);
if (score < best) { best = score; out4 = vec4(-(float(i) + t) * ${4 .toFixed(1)} + along, lat, f); }
}
float w = smoothstep(${3 .toFixed(1)}, ${9 .toFixed(1)}, -q0.x);
return mix(vec4(q0, P.zw), out4, w);
}
uniform vec4 uBowC, uBowF;
uniform highp sampler2DArray uBowTex;
vec3 bowGrid(vec2 q, vec4 G, float fine, vec4 S, float fade) {
vec2 uv = (q - G.xy) / G.zw;
vec2 e = min(uv, 1.0 - uv);
float win = smoothstep(0.0, 0.06, e.x) * smoothstep(0.0, 0.12, e.y) * fade;
if (win <= 0.0) return vec3(0.0);
uv += 0.5 / vec2(textureSize(uBowTex, 0).xy);
vec3 a = texture(uBowTex, vec3(uv, 2.0 * S.x + fine)).xyz * S.y;
if (S.w > 0.0) a += texture(uBowTex, vec3(uv, 2.0 * S.z + fine)).xyz * S.w;
return win * a;
}
vec3 bowWaveOf(int b, vec2 pe, float spacing) {
vec4 P = wakeAt(b, 21); vec2 r0 = pe - P.xy; if (dot(r0, r0) > 140.0 * 140.0) return vec3(0.0);
vec4 S = wakeAt(b, 22); if (S.y + S.w <= 0.0) return vec3(0.0);
vec4 Nr = wakeAt(b, 23);
vec4 L = bowLocal(b, pe, P, Nr.w); vec2 q = L.xy, fw = normalize(L.zw);
if (q.x < uBowC.x || q.x > uBowC.x + uBowC.z || abs(q.y) > 0.5 * uBowC.w) return vec3(0.0);
float back = max(-q.x - 2.9, 0.0);
vec3 a = bowGrid(q, uBowC, 0.0, S, 1.0) * exp(min(back, 50.0) * Nr.z) * (1.0 - smoothstep(50.0, 75.0, back));
a += bowGrid(q, uBowF, 1.0, S, 1.0 - smoothstep(0.12, 0.35, spacing));
float wb = smoothstep(Nr.x + 0.4, Nr.x + 0.1, q.x) * smoothstep(Nr.x - 2.0, Nr.x - 1.0, q.x) * (1.0 - smoothstep(0.6, 1.2, abs(q.y)));
a *= 1.0 + (Nr.y - 1.0) * wb;
return vec3(a.x, a.y * fw.x - a.z * fw.y, a.y * fw.y + a.z * fw.x);
}
vec3 bowWave(vec2 pe, float spacing) {
vec3 a = vec3(0.0);
for (int b = 0; b < WAKE_MAX; b++) { if (b >= uWakeN) break; a += bowWaveOf(b, pe, spacing); }
return a;
}`,Ce=`uTime.uChop.uCrestFoam.uHsRef.uStokes.uSharpW.uEnv.uZ0.uZ1.uZ2.uGustA.uGustB.uGustC.uGustT.uLWTex.uLW0.uLWRect.uWakeTex.uWakeN.uBowC.uBowF.uBowTex.uFN.uFSet.uFMss.uFCp.uFPk.uPkG.uPkD.uSpillOn.uSpillPatch.uBreakEps.uBreakGust.uFoamRatio.uFT0.uFT1.uFT2.uTailSharp.uDepth.uRect.uFetch.uFetchOn.uShore.uShoreRect.uShoreOn.uSwellShOn`.split(`.`),we=`
uniform float uFPk[32];
uniform vec2 uPkG[2];
uniform vec2 uPkD[2];
uniform float uSpillOn;
uniform float uSpillVol;
vec2 spQ = vec2(0.0);
uniform float uSpillPatch;
float spH(vec2 i) { uvec2 q = uvec2(ivec2(i)); uint h = (q.x * 1597334673u) ^ (q.y * 3812015801u); h ^= h >> 16; h *= 2246822519u; h ^= h >> 13; h *= 3266489917u; h ^= h >> 16; return float(h) * (1.0 / 4294967296.0); }
float spN(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(spH(i), spH(i + vec2(1.0, 0.0)), f.x), mix(spH(i + vec2(0.0, 1.0)), spH(i + vec2(1.0, 1.0)), f.x), f.y); }
float spillCrestW(float th) { return smoothstep(${(-F.behind-F.fade).toFixed(3)}, ${(-F.behind).toFixed(3)}, th) * (1.0 - smoothstep(${F.ahead.toFixed(3)}, ${(F.ahead+F.fade).toFixed(3)}, th)); }
vec4 spillGroups(vec2 p0, float t, vec3 fetch, float dmp) {
vec4 H = vec4(0.0);
vec2 pf = p0 + uFCp * (uTime - t);
float sw = swellShadow(p0);
for (int s = 0; s < uFN; s++) {
int gi = int(uFPk[s] + 0.5); if (gi == 0) continue;
vec4 S = uFSet[s];
float g = dmp;
if (S.y < 0.5) g *= sw; else if (S.y > 0.5 && S.y < 1.5) g *= fetch.x; else if (S.y > 2.5) g *= S.y < 3.5 ? fetch.y : fetch.z;
int ch = int(S.z + 0.5);
if (ch > 0) g *= uEnv[ch] * zoneGain(ch, p0);
if (g == 0.0) continue;
float lod = max(0.0, log2(256.0 / S.x));
if (lod > 5.0 + S.w) continue;
vec4 a = textureLod(uFT0, vec3(pf / S.x + ${(.5/256).toFixed(8)}, float(s)), lod);
if (gi == 1) H.xy += g * a.xy; else H.zw += g * a.xy;
}
return H;
}
vec2 spillEval(vec2 p0, float t, vec3 fetch, float dmp) {
if (uSpillOn < 0.5) return vec2(0.0);
vec4 H = spillGroups(p0, t, fetch, dmp);
vec2 best = vec2(0.0);
for (int i = 0; i < 2; i++) {
float om = uPkG[i].x; if (om <= 0.0) continue;
vec2 hh = i == 0 ? H.xy : H.zw;
float rate = hh.y / om, amp = length(vec2(hh.x, rate)), ak = amp * uPkG[i].y;
vec2 d = uPkD[i], q = p0 - d * (om / uPkG[i].y) * uTime;
float onPatch = uSpillPatch < 0.5 ? 1.0 : smoothstep(${(P.patchFrac-.12).toFixed(2)}, ${(P.patchFrac+.12).toFixed(2)}, spN(vec2(dot(q, vec2(-d.y, d.x)) / ${P.patchM.toFixed(1)}, dot(q, d) / ${(P.patchM*5).toFixed(1)})));
float chance = phiL((ak - ${ie.s0.toFixed(4)}) / ${ie.sd.toFixed(4)}) * spillCrestW(atan(rate, hh.x)) * onPatch;
if (chance > best.x) { best = vec2(chance, 2.0 * amp); spQ = q; }
}
best.x *= ${P.gain.toFixed(3)};
return best;
}
float spillBulge(vec2 p0, vec3 fetch, float dmp) {
vec2 s = spillEval(p0, uTime, fetch, dmp);
if (s.x <= 0.0) return 0.0;
float lump = pow(spN(spQ * 0.34) * 0.65 + spN(spQ * 0.95 + 7.0) * 0.35, 1.7);
return min(uSpillVol * s.y * 0.14 * (s.x / ${P.gain.toFixed(3)}), uSpillVol * 0.55) * (0.10 + 0.90 * lump);
}`,Te=`
uniform float uShoreOn;
uniform sampler2D uDepth, uShore;
uniform vec4 uShoreRect;
float depthAt(vec2 en) {
vec2 uv = (en - uRect.xy) / uRect.zw;
if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 120.0;
return texture2D(uDepth, uv).r;
}
vec3 fetchAt(vec2 en) {
float f = 1.0;
if (uFetchOn > 0.5) { vec2 uv = (en - uRect.xy) / uRect.zw; if (uv.x >= 0.0 && uv.y >= 0.0 && uv.x <= 1.0 && uv.y <= 1.0) f = texture2D(uFetch, uv).r; }
if (uShoreOn < 0.5 || f <= 0.0) return vec3(f, 0.0, 0.0);
vec2 us = (en - uShoreRect.xy) / uShoreRect.zw;
if (us.x < 0.0 || us.y < 0.0 || us.x > 1.0 || us.y > 1.0) return vec3(f, 0.0, 0.0);
vec4 s = texture2D(uShore, us);
return mix(vec3(f, 0.0, 0.0), s.rgb, s.a);
}
float backSide(Wave w) {
float vn = w.ht / (0.45 + 0.9 * uHsRef);
float back = smoothstep(0.02, -0.30, vn);
float lip = 0.7 * smoothstep(0.30 * uHsRef, 0.55 * uHsRef, w.h);
return max(back, lip);
}
uniform float uBreakEps, uBreakGust, uFoamRatio;
float phiL(float x) { return 1.0 / (1.0 + exp(-1.5976 * x * (1.0 + 0.04417 * x * x))); }
float breakProb(Wave w, vec2 p) {
float det; waveSlopeMain(w, det);
float sig = sqrt(w.dvar + 0.0016), eps = uBreakEps + uBreakGust * gustMask(p);
return phiL((eps - det) / sig);
}
float foamMetric(Wave w, vec2 p) { return breakProb(w, p); }
`,Ee=(e=!1)=>`
${e?`#define COMPACT 1`:``}
${Se}
${xe}
uniform float uSpokes, uLite, uTrailR, uTrailMinR;
uniform float uCrit, uViewOn, uViewG;
uniform vec4 uView;
uniform vec4 uRing;
float ringSpacing(float r) {
float rr = max(r, 0.5), rhoQ = uRing.y / (uRing.x * uRing.z) * pow(rr / uRing.x, 1.0 / uRing.z - 1.0), extra = 0.0;
if (uRing.w > 0.0) { float rhoC = uRing.w * 700.0 / (1500.0 * 2.3) * pow(rr / (1500.0 * uCrit), 1.0 / 2.3 - 1.0) / uCrit; extra = (1.0 - smoothstep(30.0 * uCrit, 60.0 * uCrit, rr)) * max(0.0, rhoC - rhoQ); }
if (uViewOn > 0.5) return min(uViewG * max(uView.z, uView.w * uView.y * (r * r + uView.x * uView.x) / uView.x), ${Fe.toFixed(4)} * max(r, 1.0));
return 1.0 / (rhoQ + extra);
}
float gridSpacing(float r, float slope) { float ang = r * slope / uSpokes, angEven = r * 6.2831853 / uSpokes; return max(max(ang, min(ringSpacing(r), angEven)), 0.05); }
uniform vec2 uStreakDir;
uniform vec2 uCenter;
uniform float uSkirtLip;
${Te}
${we}
varying vec3 vBulge;
varying vec3 vWorld, vNormal;
varying float vBowH;
varying vec2 vP0;
varying float vFoam, vDepth, vDmp;
varying vec3 vFetch;
float vH(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vN(vec2 p) {
vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
return mix(mix(vH(i), vH(i + vec2(1.0, 0.0)), f.x), mix(vH(i + vec2(0.0, 1.0)), vH(i + vec2(1.0, 1.0)), f.x), f.y);
}
float crestSource(Wave w) {
float det; vec2 sl = waveSlopeMain(w, det);
return smoothstep(0.22 * uHsRef, 0.65 * uHsRef, w.h) * (0.45 + 0.55 * smoothstep(0.05, 0.30, length(sl))) + 0.6 * foamMetric(w, vP0);
}
uniform float uSecC, uSecSpan, uSecR;
uniform vec4 uWarp;
uniform vec2 uWarpR;
attribute float aU;
varying float vSlope;
varying float vSkirt;
void main() {
float r = length(position.xz);
float s = aU - 0.5, a = abs(s), rr = max(r, 1.0), even = 0.15915494;
float t0 = clamp(atan(uWarp.y, rr), 0.14, 0.70), t1 = clamp(atan(uWarp.z, rr), t0 + 0.9, 2.50), rampW = t1 - t0;
float kRaw = uSpokes * uSecSpan / 6.2831853;
float want = min(uWarp.x, 1.7 * rr / (kRaw * ringSpacing(rr))), d0 = even, d1 = even, k = 0.0;
if (want > even) want = even + (want - even) * (1.0 - smoothstep(70.0, 160.0, rr));
if (want > even + 1e-6) {
float lo = uWarp.w, tailW = 3.14159265 - t1;
d0 = want; d1 = lo;
float g0 = d0 * t0 + ((d0 - lo) / log(d0 / lo)) * rampW + lo * tailW - 0.5;
if (g0 <= 0.0) { float a1 = lo, b1 = d0; for (int i = 0; i < 18; i++) { float m = 0.5 * (a1 + b1), lm = abs(d0 - m) < 1e-7 ? d0 : (d0 - m) / log(d0 / m); if (d0 * t0 + lm * rampW + m * tailW - 0.5 < 0.0) a1 = m; else b1 = m; } d1 = 0.5 * (a1 + b1); }
else { float a1 = lo, b1 = d0; for (int i = 0; i < 18; i++) { float m = 0.5 * (a1 + b1), lm = abs(m - lo) < 1e-7 ? m : (m - lo) / log(m / lo); if (m * t0 + lm * rampW + lo * tailW - 0.5 < 0.0) a1 = m; else b1 = m; } d0 = 0.5 * (a1 + b1); }
k = log(d1 / d0) / rampW;
}
float Fr = abs(k) < 1e-6 ? d0 * rampW : d0 * (exp(k * rampW) - 1.0) / k, F1 = d0 * t0 + Fr, th, dens;
if (a <= d0 * t0) { th = a / d0; dens = d0; }
else if (a <= F1) { float c = a - d0 * t0, t = abs(k) < 1e-6 ? c / d0 : log(max(1.0 + k * c / d0, 1e-6)) / k; th = t0 + t; dens = d0 * exp(k * t); }
else { th = t1 + (a - F1) / d1; dens = d1; }
float norm = 3.14159265 / (t1 + (0.5 - F1) / d1);
th *= norm;
float fanSlope = norm / dens;
float wm = smoothstep(uWarpR.x, uWarpR.y, r), thetaW = sign(s) * th;
float theta = mix(s * 6.2831853, thetaW, wm);
vSlope = mix(6.2831853, fanSlope, wm);
float span = mix(6.2831853, uSecSpan, smoothstep(0.5 * uSecR, uSecR, r)), ang = uSecC + theta * span / 6.2831853;
vec3 mp = vec3(r * cos(ang), position.y, r * sin(ang));
vec2 p0 = vec2(mp.x + uCenter.x, uCenter.y - mp.z);
float spacing = max(gridSpacing(r, vSlope), pixelSpacing(vec3(p0.x, 0.0, -p0.y)));
float dmp = smoothstep(0.3, 4.0, depthAt(p0));
vec3 ff = fetchAt(p0);
Wave w = waveEval(p0, uTime, spacing, ff, dmp);
float det; vec2 slope = waveSlope(w, det);
float flat0 = smoothstep(uRing.x, 1.5 * uRing.x, r);
w.h *= 1.0 - flat0; w.disp *= 1.0 - flat0; slope *= 1.0 - flat0;
vec2 pe = p0 + w.disp;
vec3 bw = bowWave(pe, spacing);
slope += bw.yz;
vBulge = vec3(0.0);
if (uSpillOn > 0.5 && uSpillVol > 0.0 && spacing < 3.0) {
float eb = max(0.25, 0.5 * spacing), res = 1.0 - smoothstep(0.7, 3.0, spacing);
float b0 = spillBulge(p0, ff, dmp);
if (b0 > 0.0) vBulge = res * vec3(b0, (spillBulge(p0 + vec2(eb, 0.0), ff, dmp) - b0) / eb, (spillBulge(p0 + vec2(0.0, eb), ff, dmp) - b0) / eb);
}
slope += vBulge.yz;
vWorld = vec3(pe.x, w.h + bw.x + vBulge.x, -pe.y); vBowH = bw.x;
vNormal = normalize(vec3(-slope.x, 1.0, slope.y));
float foam = foamMetric(w, p0);
#ifndef COMPACT
if (r < uTrailR && r > uTrailMinR && uLite < 0.5) {
float jt = 0.7 + 0.6 * vN(p0 * 0.35 + 3.1);
foam = max(foam, 0.90 * foamMetric(waveEval(p0, uTime - 0.30 * jt, spacing, ff, dmp), p0));
foam = max(foam, 0.79 * foamMetric(waveEval(p0, uTime - 0.70 * jt, spacing, ff, dmp), p0));
foam = max(foam, 0.67 * foamMetric(waveEval(p0, uTime - 1.20 * jt, spacing, ff, dmp), p0));
foam = max(foam, 0.55 * foamMetric(waveEval(p0, uTime - 1.80 * jt, spacing, ff, dmp), p0));
}
if (r > uTrailMinR) foam = min(1.0, foam + max(uFoamRatio - 1.0, 0.0) * foamMetric(w, p0) * 0.85);
#endif
vFoam = foam;
vDepth = depthAt(pe); vP0 = p0; vFetch = ff; vDmp = dmp;
vFoam *= 1.0 - flat0;
vSkirt = r > uRing.x * 1.001 ? 1.0 : 0.0;
vec3 drawn = vWorld;
if (position.y > 0.5) drawn.y = uCamPos.y + length(vWorld.xz - uCamPos.xz) * uSkirtLip * uPixAng;
gl_Position = projectionMatrix * viewMatrix * vec4(drawn, 1.0);
}`,De=(e=!1)=>`
${e?`#define COMPACT 1`:``}
${Se}
${xe}
${ge}
uniform vec3 uFogColor;
uniform vec3 uRipAmp;
uniform vec2 uRipDir;
uniform highp sampler2DArray uCS, uCM;
uniform samplerCube uSkyCube;
uniform float uSkyCubeOn;
uniform float uFaceTrace;
uniform float uFaceRes;
uniform vec4 uFaceSh;
float unblockedS(float h, float ry, float strength) {
if (strength <= 0.0) return 1.0;
float sb = clamp(ry, 0.0005, 0.9999), a = sb / sqrt(1.0 - sb * sb) / (1.41421 * max(uFaceSh.y, 0.005));
float lam = a < 1.6 ? (1.0 - 1.259 * a + 0.396 * a * a) / (3.535 * a + 2.181 * a * a) : 0.0;
float F = 1.0 / (1.0 + exp(-1.702 * h / (0.25 * max(uHsRef, 0.05))));
return pow(F, lam * strength);
}
float unblocked(float h, float ry) { return unblockedS(h, ry, uFaceSh.x); }
uniform float uCT[8];
uniform float uCov;
uniform float uRipPar;
uniform float uRipPeak;
uniform float uRipSharp;
uniform float uRipMod;
uniform float uFTail, uFCut;
float tailShare(float lam, float spacing) { return lam >= uFCut ? uFTail * smoothstep(2.0 * spacing, 4.5 * spacing, lam) : 0.0; }
uniform float uRipBoost, uRipAdv, uRipCh, uRipU, uRipA, uRipRes;
uniform float uTM;
uniform vec3 uWDeep, uWBot, uWKd, uWSss;
uniform float uFogDensity, uMicro, uFoam, uSkiSpeed, uSpokes, uPix, uShadow, uGlint, uWindMs, uAid, uTeal, uTurbid, uFoamStyle;
uniform float uCrit, uViewOn, uViewG;
uniform vec4 uView;
uniform vec4 uRing;
float ringSpacing(float r) {
float rr = max(r, 0.5), rhoQ = uRing.y / (uRing.x * uRing.z) * pow(rr / uRing.x, 1.0 / uRing.z - 1.0), extra = 0.0;
if (uRing.w > 0.0) { float rhoC = uRing.w * 700.0 / (1500.0 * 2.3) * pow(rr / (1500.0 * uCrit), 1.0 / 2.3 - 1.0) / uCrit; extra = (1.0 - smoothstep(30.0 * uCrit, 60.0 * uCrit, rr)) * max(0.0, rhoC - rhoQ); }
if (uViewOn > 0.5) return min(uViewG * max(uView.z, uView.w * uView.y * (r * r + uView.x * uView.x) / uView.x), ${Fe.toFixed(4)} * max(r, 1.0));
return 1.0 / (rhoQ + extra);
}
float gridSpacing(float r, float slope) { float ang = r * slope / uSpokes, angEven = r * 6.2831853 / uSpokes; return max(max(ang, min(ringSpacing(r), angEven)), 0.05); }
uniform vec2 uStreakDir, uSkiPos, uSkiFwd, uCenter, uWaveVel, uFoamOrigin;
uniform sampler2D uFoamTex, uSpillTex;
uniform float uFoamExtent, uFoamOn;
uniform float uFaceTint;
uniform float uSteepShade;
varying vec3 vBulge;
varying vec3 vWorld, vNormal;
varying float vBowH;
varying vec2 vP0;
varying float vFoam, vDepth, vDmp, vSlope;
varying vec3 vFetch;
varying float vSkirt;
uniform vec3 uHzLine;
${ye}
float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float aaNoise(vec2 p) {
float w = max(fwidth(p.x), fwidth(p.y));
return mix(noise(p), 0.5, smoothstep(0.22, 0.75, w));
}
float hashF(vec2 p) { vec3 p3 = fract(vec3(p.xyx) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
float noiseF(vec2 p) {
vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
return mix(mix(hashF(i), hashF(i + vec2(1, 0)), f.x), mix(hashF(i + vec2(0, 1)), hashF(i + vec2(1, 1)), f.x), f.y);
}
float aaNoiseF(vec2 p) {
float w = max(fwidth(p.x), fwidth(p.y));
return mix(noiseF(p), 0.5, smoothstep(0.22, 0.75, w));
}
vec3 noiseGrad(vec2 q) {
const vec2 e = vec2(0.37, 0.0);
return vec3(noise(q + e.xy) - noise(q - e.xy), 0.0, noise(q + e.yx) - noise(q - e.yx));
}
float fineBudget(float U) {
float cm = 0.003 + 0.00512 * U, t = clamp((U - 1.5) / 2.0, 0.0, 1.0);
return max(cm - uRipRes, 0.3 * cm) * t * t * (3.0 - 2.0 * t);
}
void main() {
float hzCov = mix(1.0, clamp(dot(uHzLine.xy, gl_FragCoord.xy) + uHzLine.z + 0.5, 0.0, 1.0), vSkirt);
if (hzCov < 0.004) discard;
if (vDepth < 0.0 && vSkirt < 0.5) discard;
if (inCockpit(vWorld)) discard;
vec3 L = normalize(uSunDir);
vec3 toCam = uCamPos - vWorld;
float dist = length(toCam);
vec3 V = toCam / dist;
vec3 N = normalize(vNormal);
float h = vWorld.y - vBowH;
float rGrid = length(vP0 - uCenter);
float spacing = max(gridSpacing(rGrid, vSlope), pixelSpacing(vWorld));
float near = uPix > 0.5 ? 1.0 - smoothstep(60.0, 110.0, rGrid) : 0.0;
if (near > 0.0) {
Wave w = waveEval(vP0, uTime, spacing, vFetch, vDmp);
float det; vec2 sl = waveSlope(w, det);
vec3 bw = bowWave(vec2(vWorld.x, -vWorld.z), pixelSpacing(vWorld)); sl += bw.yz;
N = normalize(mix(N, normalize(vec3(-sl.x, 1.0, sl.y)), near));
h = mix(h, w.h, near);
}
float lit = 1.0;
#ifndef COMPACT
if (uShadow > 0.5 && rGrid < 55.0) {
vec2 toSun = normalize(vec2(L.x, -L.z));
float tanE = L.y / max(length(L.xz), 0.05), blocked = 0.0;
for (int j = 1; j <= 3; j++) {
float d = (j == 1 ? 1.6 : (j == 2 ? 4.5 : 9.0));
float hs = waveEval(vP0 + toSun * d, uTime, spacing, vFetch, vDmp).h;
blocked = max(blocked, smoothstep(0.0, 0.18, hs - h - d * tanE));
}
lit = 1.0 - 0.55 * blocked * (1.0 - smoothstep(35.0, 55.0, rGrid));
}
#endif
vec3 Nsm = N;
float ripRough = 0.0;
vec3 rcov = vec3(0.0);
if (uRipAmp.x + uRipAmp.y + uRipAmp.z > 0.0) {
vec2 pq = mix(vec2(vWorld.x, -vWorld.z), vP0, uRipAdv);
vec2 wd = uRipDir, wp = vec2(-wd.y, wd.x);
float alongP = dot(pq, wd), acrossP = dot(pq, wp);
int rch = int(uRipCh + 0.5), gch = int(uGustB.w + 0.5);
float fs = uRipA * sqrt(fineBudget(uRipU)) * (rch > 0 ? uEnv[rch] * zoneGain(rch, vP0) : 1.0);
float fg = uGustA.w * sqrt(fineBudget(uGustC.z)) * (gch > 0 ? uEnv[gch] * zoneGain(gch, vP0) : 1.0);
float fl = fs;
if (uLW0.x > 0.5) {
float cg = rch > 0 ? uEnv[rch] * zoneGain(rch, vP0) : 1.0;
fg = uRipA * sqrt(fineBudget(uLW0.z)) * cg; fl = uRipA * sqrt(fineBudget(uLW0.w)) * cg;
}
float gf = mix(mix(fs, max(fs, fg), gustMask(pq)), min(fs, fl), lullMask(pq)) * uRipBoost;
vec2 sl = vec2(0.0);
float sdw = dot(vec2(-N.x, N.z) / max(N.y, 0.2), wd);
float face = mix(1.0, clamp(1.0 + 1.6 * clamp(sdw / 0.25, -1.0, 1.0), 0.25, 2.4), uRipMod);
float pm0 = mix(1.0, mix(0.3, 1.7, smoothstep(0.25, 0.75, noiseF(pq / 6.0 + vec2(1.3, uTime * 0.03)))), uRipMod);
float pm1 = mix(1.0, mix(0.3, 1.7, smoothstep(0.25, 0.75, noiseF(pq / 2.0 + vec2(7.9, -uTime * 0.05)))), uRipMod);
float pm2 = mix(1.0, mix(0.3, 1.7, smoothstep(0.25, 0.75, noiseF(pq / 0.7 + vec2(3.7, uTime * 0.08)))), uRipMod);
vec2 ap = vec2(alongP, acrossP), sA = vec2(0.0);
float cmpA = 0.0;
vec3 cvA = vec3(0.0);
for (int c = 0; c < 6; c++) {
vec3 uvl = vec3(ap / uCT[c], float(c));
vec4 a = texture(uCS, uvl), m = texture(uCM, uvl);
float mc = (c < 2 ? uRipAmp.x : (c < 4 ? uRipAmp.y : uRipAmp.z)) * gf * face * (c < 2 ? pm0 : (c < 4 ? pm1 : pm2));
float rs = c < 4 ? 1.0 - tailShare(c == 0 ? 1.04 : (c == 1 ? 0.50 : (c == 2 ? 0.21 : 0.081)), spacing) : 1.0;
sA += mc * rs * a.xy; cmpA += mc * rs * a.z;
cvA += (mc * mc) * vec3(max(m.x - a.x * a.x, 0.0), max(m.y - a.y * a.y, 0.0), m.z - a.x * a.y);
}
float pk = uRipPeak * uRipSharp, jac = 1.0 - pk * cmpA;
float sharpC = 0.25 + 1.75 * smoothstep(0.05, 0.6, 1.0 - jac);
for (int c = 6; c < 8; c++) {
vec3 uvl = vec3(ap / uCT[c], float(c));
vec4 a = texture(uCS, uvl), m = texture(uCM, uvl);
float mc = uRipAmp.z * uRipPar * sharpC * gf * face * pm2;
sA += mc * a.xy;
cvA += (mc * mc) * vec3(max(m.x - a.x * a.x, 0.0), max(m.y - a.y * a.y, 0.0), m.z - a.x * a.y);
}
sl = (sA.x * wd + sA.y * wp) / clamp(jac, 0.35, 3.0);
rcov += vec3(cvA.x * wd.x * wd.x + cvA.y * wp.x * wp.x + 2.0 * cvA.z * wd.x * wp.x, cvA.x * wd.y * wd.y + cvA.y * wp.y * wp.y + 2.0 * cvA.z * wd.y * wp.y,
cvA.x * wd.x * wd.y + cvA.y * wp.x * wp.y + cvA.z * (wd.x * wp.y + wd.y * wp.x));
ripRough += cvA.x + cvA.y;
{ float mb = pk * 0.25 * smoothstep(0.5, 0.2, jac); ripRough += mb; rcov += vec3(0.5 * mb, 0.5 * mb, 0.0); }
N = normalize(vec3(N.x - sl.x * N.y, N.y, N.z + sl.y * N.y));
}
float bulgeW = smoothstep(0.03, 0.16, vBulge.x);
if (bulgeW > 0.0) {
N = normalize(vec3(N.x - vBulge.y * N.y, N.y, N.z + vBulge.z * N.y));
vec2 pb = vP0 * 2.6; float n0 = aaNoise(pb), nxx = aaNoise(pb + vec2(0.35, 0.0)), nyy = aaNoise(pb + vec2(0.0, 0.35));
N = normalize(N + bulgeW * 1.6 * vec3(-(nxx - n0), 0.0, (nyy - n0)));
}
float NdL = max(dot(N, L), 0.0), NdV = max(dot(N, V), 0.001);
float NdLs = uCov > 0.5 ? max(dot(Nsm, L), 0.0) : NdL;
float fres = 0.02 + 0.98 * pow(1.0 - NdV, 5.0);
bool covOn = uCov > 0.5 && uRipAmp.x + uRipAmp.y + uRipAmp.z > 0.0;
vec2 sN = vec2(-N.x, N.z) / max(N.y, 0.05);
vec3 cv = vec3(0.0);
if (covOn) {
vec2 dsx = dFdx(sN), dsy = dFdy(sN);
vec3 aa = vec3(dsx.x * dsx.x + dsy.x * dsy.x, dsx.y * dsx.y + dsy.y * dsy.y, dsx.x * dsx.y + dsy.x * dsy.y) * 0.5;
cv = rcov + vec3(0.00045 + 0.0035 * smoothstep(30.0, 500.0, dist)) * vec3(1.0, 1.0, 0.0) + aa * min(1.0, 0.03 / max(max(aa.x, aa.y), 1e-8));
}
vec3 R = reflect(-V, N); R.y += 1.1 * sqrt(ripRough); R = normalize(R); R.y = abs(R.y);
vec3 sky; float blk = 0.0;
if (covOn) {
float tr2 = 0.5 * (cv.x + cv.y), df2 = 0.5 * (cv.x - cv.y), rd = sqrt(df2 * df2 + cv.z * cv.z);
float l1 = sqrt(max(tr2 + rd, 1.07e-9)), l2 = sqrt(max(tr2 - rd, 1e-9)), th = 0.5 * atan(cv.z, df2);
vec2 e1 = vec2(cos(th), sin(th)), e2 = vec2(-e1.y, e1.x), o1 = 1.4142 * l1 * e1, o2 = 1.4142 * l2 * e2;
vec3 skyAcc = vec3(0.0); float fAcc = 0.0, bAcc = 0.0, wAcc = 0.0;
float nearC = 1.0 - smoothstep(20.0, 35.0, dist), cNear = uFaceSh.z * nearC, cPull = uFaceSh.w * nearC, cRes = min(uFaceRes, 1.0) * nearC;
float gRes = mix(1.0, max(uFaceRes, 1.0), nearC); vec3 Nres = normalize(vec3(N.x * gRes, N.y, N.z * gRes));
float eNear = uFaceTrace > 0.0 ? 1.0 - smoothstep(18.0, 25.0, rGrid) : 0.0, aStr = max(uFaceSh.x, uFaceTrace) * (1.0 - eNear);
float hT1 = 0.0, hT2 = 0.0, hT3 = 0.0;
#ifndef COMPACT
if (eNear > 0.0) {
vec3 R0 = reflect(-V, N); vec2 toR = normalize(vec2(R0.x, -R0.z) + vec2(1e-5, 0.0));
hT1 = waveEval(vP0 + toR * 1.5, uTime, spacing, vFetch, vDmp).h - h; hT2 = waveEval(vP0 + toR * 4.0, uTime, spacing, vFetch, vDmp).h - h; hT3 = waveEval(vP0 + toR * 8.0, uTime, spacing, vFetch, vDmp).h - h;
}
#else
eNear = 0.0; aStr = uFaceSh.x;
#endif
bool cube = uSkyCubeOn > 0.5;
vec3 cloudD = cube ? vec3(0.0) : skyColor(R) - skyColorC(R, false);
for (int k = 0; k < 4; k++) {
vec2 o = k == 0 ? o1 : (k == 1 ? -o1 : (k == 2 ? o2 : -o2));
vec3 Nk = normalize(vec3(-(sN.x + o.x), 1.0, sN.y + o.y));
vec3 Rk = reflect(-V, Nk);
float tk = Rk.y / max(length(Rk.xz), 0.05);
float vE = tk <= 0.0 ? 1.0 : 1.0 - max(max(smoothstep(0.0, 0.06, hT1 - 1.5 * tk), smoothstep(0.0, 0.06, hT2 - 4.0 * tk)), smoothstep(0.0, 0.06, hT3 - 8.0 * tk));
Rk.y = abs(Rk.y) * 0.4 + max(Rk.y, 0.0) * 0.6;
Rk = normalize(Rk);
float vis = smoothstep(0.0, 0.08, tr2) * 0.45 * (1.0 - max(cPull, cRes));
float Fk = 0.02 + 0.98 * pow(1.0 - clamp(dot(normalize(mix(mix(Nk, Nres, cRes), vec3(0.0, 1.0, 0.0), vis)), V), 0.0, 1.0), 5.0);
float fpR = max(length(dFdx(Rk)), length(dFdy(Rk))); fpR = fpR < 4.0 ? fpR : 0.0;
vec4 skC = cube ? textureLod(uSkyCube, Rk, clamp(log2(max(fpR * 128.0, 1e-4)), 0.0, 4.0)) : vec4(0.0); float vk = mix(unblockedS(h, Rk.y, aStr), vE, eNear * min(uFaceTrace, 1.0));
float wk = mix(1.0, max(dot(Nk, V), 0.0) + 1e-4, cNear);
skyAcc += 0.25 * wk * Fk * vk * (cube ? skC.rgb + sunTerm(Rk) * (1.0 - skC.a) : skyColorC(Rk, false) + cloudD); fAcc += 0.25 * wk * Fk; bAcc += 0.25 * wk * Fk * (1.0 - vk); wAcc += 0.25 * wk;
}
fres = fAcc / max(wAcc, 1e-4); sky = skyAcc / max(fAcc, 1e-4); blk = bAcc / max(fAcc, 1e-4);
} else { float vr = unblocked(h, R.y); sky = skyColor(R) * vr; blk = 1.0 - vr; }
float ao = mix(0.55, 1.0, smoothstep(-0.7 * uHsRef, 0.25 * uHsRef, h));
vec3 bodyLin = mix(uWBot, uWDeep, 1.0 - exp(-uWKd * max(vDepth, 0.0)));
vec3 body = toneEnc(bodyLin) * (0.40 * uSeaAmb + 0.60 * mix(0.45, NdLs * lit, uSunT * uSunOcc)) * (1.0 / 0.88) * ao;
if (blk > 0.0) {
float th = atan(1.41421 * uFaceSh.y), eb = asin(clamp(R.y, 0.0, 1.0)), Fb = 0.02 + 0.98 * pow(1.0 - sin(eb + th), 5.0);
vec3 Rh = normalize(vec3(R.x, tan(eb + 2.0 * th) * length(R.xz), R.z));
vec3 hi = uSkyCubeOn > 0.5 ? textureLod(uSkyCube, Rh, 3.0).rgb : skyColorC(Rh, false);
sky += blk * mix(body, hi, Fb);
}
vec3 col = mix(body, sky, fres);
float back = pow(clamp(dot(-V, L), 0.0, 1.0), 2.2);
float thin = smoothstep(0.04 * uHsRef, 0.55 * uHsRef, h) * (0.55 + 0.45 * (1.0 - N.y));
col += uWSss * back * thin * lit * (1.0 - fres) * 0.95 * uSunT * uSunOcc;
col += uWSss * 0.25 * smoothstep(0.0, 0.5 * uHsRef, h) * (1.0 - fres);
float alpha = clamp(0.058 + 0.0046 * uWindMs, 0.058, 0.25);
if (uRipAmp.x + uRipAmp.y + uRipAmp.z > 0.0) alpha = clamp(sqrt(0.0009 + ripRough), 0.03, 0.30);
vec3 Hv = normalize(L + V);
float Fh = 0.02 + 0.98 * pow(1.0 - max(dot(Hv, V), 0.0), 5.0);
if (covOn) {
vec2 hs = vec2(-Hv.x, Hv.z) / max(Hv.y, 0.02);
float det = max(cv.x * cv.y - cv.z * cv.z, 1e-8);
vec2 d2 = hs - sN;
float ex = (d2.x * d2.x * cv.y + d2.y * d2.y * cv.x - 2.0 * d2.x * d2.y * cv.z) / det;
float pdf = exp(-0.5 * ex) / (6.2831853 * sqrt(det));
float Dm = pdf / max(Hv.y * Hv.y * Hv.y * Hv.y, 1e-5);
vec2 aV = normalize(vec2(-V.x, V.z) + vec2(1e-5)), aL = normalize(vec2(-L.x, L.z) + vec2(1e-5));
float sV = aV.x * aV.x * cv.x + aV.y * aV.y * cv.y + 2.0 * aV.x * aV.y * cv.z, sL = aL.x * aL.x * cv.x + aL.y * aL.y * cv.y + 2.0 * aL.x * aL.y * cv.z;
float tV = max(V.y, 1e-3) / sqrt(max(1.0 - V.y * V.y, 1e-4)) / sqrt(2.0 * max(sV, 1e-6)), tL = max(L.y, 1e-3) / sqrt(max(1.0 - L.y * L.y, 1e-4)) / sqrt(2.0 * max(sL, 1e-6));
float lamV = tV >= 1.6 ? 0.0 : (1.0 - 1.259 * tV + 0.396 * tV * tV) / (3.535 * tV + 2.181 * tV * tV), lamL = tL >= 1.6 ? 0.0 : (1.0 - 1.259 * tL + 0.396 * tL * tL) / (3.535 * tL + 2.181 * tL * tL);
float Gs = 1.0 / (1.0 + lamV + lamL);
col += uGlintCol * min(Dm * Fh * Gs / (4.0 * max(NdV, 0.08)), 6.0) * uGlint * 0.28 * lit * uSunT * uSunOcc;
} else {
float NdH = max(dot(N, Hv), 0.0), a2 = alpha * alpha, dd = NdH * NdH * (a2 - 1.0) + 1.0;
float D = a2 / (3.14159 * dd * dd);
col += uGlintCol * min(D * Fh * NdL / max(4.0 * NdL * NdV, 0.08), 6.0) * uGlint * 0.28 * lit * uSunT * uSunOcc;
}
vec2 pe = vec2(vWorld.x, -vWorld.z);
vec2 perp = vec2(-uStreakDir.y, uStreakDir.x);
float sn = aaNoise(vec2(dot(pe, uStreakDir) * 0.30, dot(pe, perp) * 2.2));
float sn2 = aaNoise(vec2(dot(pe, uStreakDir) * 0.85, dot(pe, perp) * 6.5));
float streak = 0.30 + 0.70 * (sn * 0.6 + sn2 * 0.4);
float cexp = clamp(vFoam * uFoam, 0.0, 1.0);
vec2 pdr = pe - uWaveVel * uTime * 0.3;
vec2 pfl = vec2(dot(pdr, perp) * 0.30, dot(pdr, uStreakDir) * 0.55);
float nfl = aaNoise(pfl) * 0.62 + aaNoise(pfl * 2.3 + 4.7) * 0.38, ufl = 1.0 / (1.0 + exp(-1.5976 * (nfl - 0.5) / 0.156 * (1.0 + 0.04417 * pow((nfl - 0.5) / 0.156, 2.0))));
float fe = min(0.04, cexp), fl = cexp > 0.0 ? smoothstep(1.0 - cexp - fe, 1.0 - cexp + fe, ufl) : 0.0, ffar = smoothstep(0.6, 1.8, length(fwidth(pfl)));
float crest = mix(fl, cexp, ffar) * mix(1.0, streak * 1.25, 0.35);
if (mod(uFoamStyle, 2.0) > 0.5) {
vec2 pw = pe - uWaveVel * uTime;
float bk = smoothstep(0.30, 0.72, aaNoise(pw * 2.3) * 0.6 + aaNoise(pw * 6.1) * 0.4);
crest = clamp(vFoam * uFoam, 0.0, 1.0) * (0.25 + 0.95 * bk);
}
float n = aaNoise(vWorld.xz * 1.7 + uTime * 0.2) * 0.6 + aaNoise(vWorld.xz * 5.1) * 0.4;
float shore = smoothstep(1.6, 0.0, vDepth) * (0.55 + 0.45 * sin(vDepth * 5.0 - uTime * 1.5)) * n * 1.4;
vec2 rel = pe - uSkiPos;
float ahead = dot(rel, uSkiFwd);
float lat = abs(dot(rel, vec2(uSkiFwd.y, -uSkiFwd.x)));
float sp = clamp(uSkiSpeed / 4.0, 0.0, 1.3);
float behind = -ahead - 3.1;
float trail = smoothstep(0.35 + 0.14 * behind, 0.1, lat) * smoothstep(0.0, 0.8, behind) * exp(-behind * 0.07);
float dBow = 3.2 - ahead;
float armLat = 0.28 + 0.13 * min(dBow, 30.0) + 0.04 * max(dBow - 30.0, 0.0);
float arms = smoothstep(0.22, 0.0, abs(lat - armLat)) * smoothstep(0.0, 1.5, dBow) * exp(-dBow * 0.06) * 0.8;
float breakup = smoothstep(0.30, 0.72, aaNoise(pe * 2.3 + vec2(uTime * 0.6, 0.0)) * 0.6 + aaNoise(pe * 6.1 - vec2(0.0, uTime * 0.8)) * 0.4);
float wake = (trail * 0.6 + arms * 0.85) * breakup * sp;
float persist = 0.0, lace = 0.0, plume = 0.0, fresh = 0.0, thick = 1.0;
if (uFoamOn > 0.5) {
vec2 fuv = (vP0 - uFoamOrigin) / uFoamExtent;
vec2 fe = min(fuv, 1.0 - fuv);
float inside = smoothstep(0.0, 0.08, min(fe.x, fe.y));
vec4 fa = texture2D(uFoamTex, fuv) * inside;
vec4 fs = texture2D(uSpillTex, fuv) * inside;
fa.r = max(fa.r, fs.r); fa.g = max(fa.g, fs.g);
vec2 pf = vP0 - floor(vP0 / 1024.0) * 1024.0;
float nz = 0.45 * (aaNoiseF(pf * 1.3) - 0.5) + 0.45 * (aaNoiseF(pf * 2.9 + 3.7) - 0.5) + 0.32 * (aaNoiseF(pf * 6.7 + 1.9) - 0.5);
float fv = fa.r * 1.15 + nz * 0.9, fe2 = 0.012 + 0.6 * fwidth(fv);
persist = smoothstep(0.52 - fe2, 0.52 + fe2, fv);
fresh = clamp(fa.g * 1.4, 0.0, 1.0);
thick = clamp((fv - 0.52) / 0.3, 0.0, 1.0);
vec2 qh = vec2(dot(pf, uStreakDir) * 1.3, dot(pf, vec2(-uStreakDir.y, uStreakDir.x)) * 3.0);
float hn = aaNoiseF(qh) * 0.55 + aaNoiseF(qh * 2.6 + 9.1) * 0.45, hw = 0.02 + fwidth(hn);
persist *= 1.0 - smoothstep(0.60 - hw, 0.60 + hw, hn + 0.12 * (1.0 - thick)) * smoothstep(0.35, 0.85, 1.0 - fresh);
plume = fa.g;
if (fa.a > 0.004) {
float sdr = dot(pf, uStreakDir), sper = dot(pf, vec2(-uStreakDir.y, uStreakDir.x));
vec2 q = vec2(sdr * 1.2, sper * 2.6);
q += 1.1 * vec2(noiseF(pf * 0.6 + 7.1), noiseF(pf * 0.6 + 1.3));
float px = length(fwidth(q)), far = smoothstep(0.25, 0.6, px);
float c1 = abs(noiseF(q) - 0.5), c2 = abs(noiseF(q * 2.3 + 5.3) - 0.5);
float wl = 0.010 + 0.035 * clamp(fa.a * 2.0, 0.0, 1.0), d1 = fwidth(c1) + 1e-4, d2 = fwidth(c2) + 1e-4;
float net = max(1.0 - smoothstep(wl, wl + d1, c1), 0.6 * (1.0 - smoothstep(wl * 0.7, wl * 0.7 + d2, c2)));
float holes = smoothstep(0.50, 0.72, aaNoiseF(pf * 0.45 + 2.1) * 0.55 + aaNoiseF(pf * 1.3) * 0.45 + fa.a * 0.8);
lace = mix(net * holes, clamp(fa.a, 0.0, 1.0) * 0.18, far) * smoothstep(0.004, 0.06, fa.a);
}
wake = 0.0;
}
col = mix(col, col * 1.12 + vec3(0.0, 0.05, 0.045) * (0.55 + 0.45 * lit), clamp(plume * 1.5, 0.0, 1.0) * 0.35 * (1.0 - persist));
persist = max(persist, bulgeW); thick = max(thick, bulgeW); fresh = max(fresh, bulgeW);
float foam = clamp(crest + shore + wake + persist, 0.0, 1.0);
float grain = aaNoise(vWorld.xz * 9.0) * 0.6 + aaNoise(vWorld.xz * 23.0 + 3.1) * 0.4;
vec3 foamCol = vec3(0.93, 0.96, 0.98) * (0.78 + 0.26 * grain) * (0.66 + 0.50 * NdL * lit) * mix(0.84, 1.05, fresh) * mix(0.86, 1.04, thick);
col = mix(col, foamCol * 0.92, lace * 0.75 * (1.0 - foam));
foamCol = mix(foamCol, vec3(0.97, 0.985, 1.0), 0.45 * bulgeW);
col = mix(col, foamCol, foam * mix(0.62, 0.95, thick));
if (uAid > 0.5 && uAid < 1.5) {
float k = h / (0.25 * max(uHsRef, 0.2)), fk = fract(k), d = min(fk, 1.0 - fk);
float line = 1.0 - smoothstep(0.0, max(fwidth(k) * 1.4, 0.001), d);
col = mix(col, h >= 0.0 ? vec3(1.0, 1.0, 0.85) : vec3(0.1, 0.9, 1.0), line * 0.75);
} else if (uAid > 1.5) {
float sx = -N.x / max(N.y, 0.1), sn3 = N.z / max(N.y, 0.1);
float along = sx * uSkiFwd.x + sn3 * uSkiFwd.y;
float band = smoothstep(0.10, 0.45, abs(along));
float near = smoothstep(220.0, 50.0, dist);
vec3 tint = along > 0.0 ? vec3(0.95, 0.60, 0.25) : vec3(0.25, 0.60, 0.95);
col = mix(col, tint, band * near * 0.26);
float zc = 1.0 - smoothstep(0.0, max(fwidth(along) * 1.3, 0.002), abs(along));
col = mix(col, vec3(1.0, 0.98, 0.85), zc * near * 0.55);
}
if (uSteepShade > 0.0) {
vec3 Ns = normalize(vNormal); float sls = length(Ns.xz) / max(Ns.y, 0.2);
float bright = smoothstep(0.6, 0.9, dot(col, vec3(0.2126, 0.7152, 0.0722)));
col *= max(0.0, 1.0 - uSteepShade * 0.5 * smoothstep(0.12, 0.30, sls) * (1.0 - bright));
}
float alpha2 = mix(0.55, 1.0, smoothstep(0.0, 4.0, vDepth));
alpha2 = mix(alpha2, hzCov, vSkirt);
{ vec3 toP = normalize(vWorld - uCamPos), fogC = skyLin(normalize(vec3(toP.x, 0.012, toP.z)));
fogC = toneEnc(mix(fogC, uCloudAmb * 0.9, 0.85 * smoothstep(0.3, 1.0, uClLow.w)));
if (uSkyCubeOn > 0.5) fogC = textureLod(uSkyCube, normalize(vec3(toP.x, 0.012, toP.z)), 3.0).rgb;
vec3 fog = 1.0 - exp(-uFogExt * dist);
col = mix(col, fogC, clamp(fog, 0.0, 1.0)); }
if (uTM > 0.0) {
vec3 over = max(col - uTM, 0.0);
col = min(col, vec3(uTM)) + (1.0 - uTM) * (1.0 - exp(-over / (1.0 - uTM)));
}
if (uFaceTint > 0.0) {
vec3 Nc = normalize(vNormal);
float sl = length(Nc.xz) / max(Nc.y, 0.2);
col = mix(col, vec3(0.15, 0.9, 0.35), uFaceTint * 0.42 * smoothstep(0.12, 0.17, sl) * (1.0 - smoothstep(0.24, 0.29, sl)));
col = mix(col, vec3(0.95, 0.2, 0.15), uFaceTint * 0.5 * smoothstep(0.24, 0.30, sl));
}
gl_FragColor = vec4(col, alpha2);
}`;function Oe(e,t){let n=Math.imul(e+1013,2654435761)^Math.imul(t+7919,2246822507);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,n=Math.imul(n,695872825),n^=n>>>15,(n>>>0)/4294967296}var ke={rMax:1500,J:700,power:2.3,K:540},Ae=(e,t,n,r)=>n*(Math.max(e,0)/t)**(1/r),je=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Me=(e,t,n,r)=>n/(t*r)*(Math.max(e,1e-6)/t)**(1/r-1),Ne=(e,t,n,r,i,a=1)=>i>0?(1-je(30*a,60*a,e))*Math.max(0,i*Me(e/a,ke.rMax,ke.J,ke.power)/a-Me(e,t,n,r)):0;function Pe(e,t,n,r,i=1,a=1){let o=Math.max(e,.5);return 1/(Me(o,t,n,r)+Ne(o,t,n,r,i,a))}var Fe=.03,Ie={Low:{k:1.2,sMin:.12},Draft:{k:1,sMin:.1},Standard:{k:.8,sMin:.08}},Le=(e,t,n)=>n*(e*e+t*t)/Math.max(t,.05),Re=(e,{h:t,pix:n,k:r,sMin:i})=>Math.min(Math.max(i,r*Le(e,t,n)),Fe*Math.max(e,1));function ze({h:e,pix:t,k:n,sMin:r,J:i,rMax:a}){let o=6e3,s=new Float64Array(6001),c=new Float64Array(6001),l={h:e,pix:t,k:n,sMin:r};for(let e=0;e<=o;e++)s[e]=e/o*a*(e/o);for(let e=1;e<=o;e++)c[e]=c[e-1]+.5*(1/Re(s[e],l)+1/Re(s[e-1],l))*(s[e]-s[e-1]);let u=c[o],d=Math.max(40,Math.min(i,Math.ceil(u))),f=new Float64Array(d+1),p=0;for(let e=1;e<d;e++){let t=e*u/d;for(;p<o&&c[p+1]<t;)p++;let n=(t-c[p])/Math.max(c[p+1]-c[p],1e-12);f[e]=s[p]+n*(s[p+1]-s[p])}return f[d]=a,{radii:f,rings:d,g:u/d,I:u}}function Be(e,t,n,r=1,i=1){let a=4e3,o=new Float64Array(4001),s=new Float64Array(4001);for(let e=0;e<=a;e++)o[e]=.001*(60*i/.001)**(e/a);for(let c=1;c<=a;c++)s[c]=s[c-1]+.5*(Ne(o[c],e,t,n,r,i)+Ne(o[c-1],e,t,n,r,i))*(o[c]-o[c-1]);let c=e=>{if(e>=60*i)return s[a];if(e<=o[0])return 0;let t=Math.log(e/o[0])/Math.log(60*i/o[0])*a,n=Math.min(3999,Math.floor(t));return s[n]+(s[n+1]-s[n])*(t-n)},l=r=>Ae(r,e,t,n)+c(r),u=Math.round(l(e)),d=new Float64Array(u+1),f=u/l(e);for(let t=1;t<=u;t++){let n=0,r=e,i=t/f;for(let e=0;e<48;e++){let e=(n+r)/2;l(e)<i?n=e:r=e}d[t]=(n+r)/2}return d[u]=e,d}var z={W0:25,W1:90,OUT_MIN:.4,ISO:1.7,T0_MIN:.14,T0_MAX:.7,RAMP_MIN:.9,T1_MAX:2.5};function Ve(e,t){let n=[];for(let r=e*1.5;r<t*.95;r*=1.5)n.push(r);return n.push(t),n}function He(e,t,r,i,a=0,o=0,s=1,c=null,l=0){let u=c||(o>0?Be(e,t,i,o,s):Float64Array.from({length:t+1},(n,r)=>e*(r/t)**+i)),d=u.length-1,f=l>e?Ve(e,l):[],p=f.length?Float64Array.from([...u,...f,l]):u;t=p.length-1;let m=r+1,h=new Float32Array((t+1)*m*3),g=new Float32Array((t+1)*m),_=e=>p[e];for(let e=0;e<=t;e++){let n=_(e),i=e<t?_(e+1)-n:n-_(e-1),o=e===0||e>=d?0:1,s=e>d,c=s&&e===t?1:0;for(let t=0;t<m;t++){let l=t%r,u=a>0&&!s&&e&1?.5:0,d=a>0&&!s?(Oe(e,l)-.5)*a:0,f=a>0?(Oe(l+4001,e)-.5)*a*o:0,p=(t+u+d)/r,_=Math.max(0,n+f*i),v=p*Math.PI*2;h.set([_*Math.cos(v),c,_*Math.sin(v)],(e*m+t)*3),g[e*m+t]=p}}let v=new Uint32Array(t*r*6),y=0;for(let e=0;e<t;e++)for(let t=0;t<r;t++){let n=e*m+t,r=n+1,i=(e+1)*m+t,a=i+1;v.set([n,r,i,r,a,i],y),y+=6}let b=new w;return b.setAttribute(`position`,new n(h,3)),b.setAttribute(`aU`,new n(g,1)),b.setIndex(new n(v,1)),b}function Ue(e){let t=e<.5?e:1-e,n=Math.sqrt(-2*Math.log(t)),r=n-(2.515517+.802853*n+.010328*n*n)/(1+1.432788*n+.189269*n*n+.001308*n*n*n);return e<.5?-r:r}function We(){let e=new x(new Uint16Array(4),2,2,te,v);return e.minFilter=e.magFilter=f,e.needsUpdate=!0,e}function B(){let e=D.toHalfFloat(1),t=new x(new Uint16Array([e,e,e,e]),2,2,te,v);return t.minFilter=t.magFilter=f,t.needsUpdate=!0,t}var Ge=.35;function Ke(e=new URLSearchParams(globalThis.location?.search??``)){let t=e.get(`facefres`);return new S(Number(e.get(`faceshade`)??0),.1,+(t===`1`||t===`weight`),+(t===`1`||t===`pull`))}function qe(e,t={}){let n={rMax:t.rMax??3200,J:t.J??260,K:t.K??360,power:t.power??2.4,cf:t.cf??1,cs:t.cs??1},i=t.jitter??.6,a=t.skirt===!1?0:t.skirtR??7e3,o=t.sector!==!1,s=()=>o?Math.max(8,Math.round(n.K*.5)):n.K,c={...pe(),uTime:{value:0},uChop:{value:1},uLite:{value:t.lite??0},uSpokes:{value:s()},uMicro:{value:t.micro??0},uFoam:{value:t.foam??1},uSkiSpeed:{value:0},uCrestFoam:{value:0},uHsRef:{value:.5},uFaceSh:{value:Ke(t.query)},uFaceRes:{value:Number((t.query??new URLSearchParams(globalThis.location?.search??``)).get(`faceres`)??.35)},uFaceTrace:{value:Number((t.query??new URLSearchParams(globalThis.location?.search??``)).get(`facetrace`)??0)},uStokes:{value:1},uSharpW:{value:1},uStreakDir:{value:new O(0,-1)},uSkiPos:{value:new O(1e6,1e6)},uSkiFwd:{value:new O(0,1)},uFN:{value:0},uFTail:{value:0},uFCut:{value:ne.cut},uFSet:{value:Array.from({length:32},()=>new S(1,0,0,0))},uFMss:{value:new Float32Array(32)},uFPk:{value:new Float32Array(32)},uPkG:{value:[new O,new O]},uPkD:{value:[new O,new O]},uSpillPatch:{value:1},uSpillVol:{value:Number(new URLSearchParams(globalThis.location?.search??``).get(`spillvol`)??1)},uSpillOn:{value:new URLSearchParams(globalThis.location?.search??``).get(`spill`)===`0`?0:1},uWakeTex:{value:null},uWakeN:{value:0},uBowC:{value:new S(-114,-32,128,64)},uBowF:{value:new S(-17,-5,20,10)},uBowTex:{value:null},uBreakEps:{value:.55},uBreakGust:{value:0},uFoamRatio:{value:10},uFCp:{value:new O},uFT0:{value:null},uFT1:{value:null},uFT2:{value:null},uTailSharp:{value:1},uEnv:{value:new Float32Array(16).fill(1)},uZ0:{value:new Float32Array(64)},uZ1:{value:new Float32Array(64)},uZ2:{value:new Float32Array(64)},uView:{value:new S(1.3,.0011,.05,.5)},uViewOn:{value:0},uViewG:{value:1},uWarp:{value:new S(0,z.W0,z.W1,z.OUT_MIN/(2*Math.PI))},uRing:{value:new S(n.rMax,n.J,n.power,n.cf)},uCrit:{value:n.cs},uWarpR:{value:new O(8,20)},uCenter:{value:new O},uSecC:{value:0},uSecSpan:{value:Math.PI*2},uSecR:{value:60},uDepth:{value:e.buildDepthTexture()},uRect:{value:e.textureRect},uFetch:{value:B()},uFetchOn:{value:0},uSwellShOn:{value:0},uShore:{value:B()},uShoreRect:{value:new S(0,0,1,1)},uShoreOn:{value:0},uTrailR:{value:450},uTrailMinR:{value:0},uPix:{value:t.pixelNormals??1},uShadow:{value:t.shadows??1},uGlint:{value:t.glint??1},uSeaAmb:{value:1},uTeal:{value:0},uFaceTint:{value:0},uSteepShade:{value:Number((t.query??new URLSearchParams(globalThis.location?.search??``)).get(`steepshade`)??0)},uSunT:{value:1},uTurbid:{value:0},uFoamStyle:{value:0},uWaveVel:{value:new O},uCloud:{value:.35},uCloudDark:{value:0},..._e(),uWindMs:{value:8},uAid:{value:0},uTM:{value:t.tm??0},uRipAmp:{value:new M},uRipDir:{value:new O(1,0)},uCS:{value:null},uCM:{value:null},uSkyCube:{value:null},uSkyCubeOn:{value:0},uCT:{value:new Float32Array(8).fill(1)},uCov:{value:1},uRipPar:{value:1},uRipPeak:{value:1},uRipSharp:{value:1},uRipMod:{value:1},uRipBoost:{value:1},uRipAdv:{value:1},uRipCh:{value:0},uPixAng:{value:.0011},uPixFade:{value:1},uRipU:{value:5},uRipRes:{value:0},uRipA:{value:1},uGustA:{value:new S},uGustB:{value:new S(1,0,2,0)},uGustC:{value:new S},uGustT:{value:new S},uLWTex:{value:B()},uLW0:{value:new S},uLWRect:{value:new S(0,0,1,1)},uFoamTex:{value:B()},uSpillTex:{value:We()},uFoamOrigin:{value:new O},uFoamExtent:{value:1},uFoamOn:{value:0},uSunDir:{value:new M(.45,.62,-.64).normalize()},uHzLine:{value:new M(0,0,1e6)},uSkirtLip:{value:3},uCamPos:{value:new M},uFogColor:{value:new m(.74,.83,.91)},uFogDensity:{value:28e-5}},l=null,u=new M,d=[new M,new M,new M];function f(e,t,n,r){if(e.updateMatrixWorld(),e.getWorldDirection(u),Math.hypot(u.x,u.z)<.001){c.uHzLine.value.set(0,0,1e6);return}let i=Math.atan2(u.z,u.x),o=[];[[i-.3,a,0],[i+.3,a,0],[i,50,0]].forEach(([i,a],s)=>{let c=d[s].set(t.e+a*Math.cos(i),0,-t.n+a*Math.sin(i)).project(e);o.push([(c.x+1)*.5*n,(c.y+1)*.5*r])});let s=o[1][0]-o[0][0],l=o[1][1]-o[0][1],f=Math.hypot(s,l);if(!(f>1e-6)){c.uHzLine.value.set(0,0,1e6);return}let p=-l/f,m=s/f,h=-(p*o[0][0]+m*o[0][1]);p*o[2][0]+m*o[2][1]+h<0&&(p=-p,m=-m,h=-h),c.uHzLine.value.set(p,m,h)}let p=null,h=null;function g(){let e=oe(p,c.uMicro.value);c.uRipAmp.value.set(...e.amp),e.on&&(c.uRipU.value=e.windMs,c.uRipA.value=e.amount,c.uRipSharp.value=e.sharp,c.uRipCh.value=e.ch,c.uRipRes.value=e.res,c.uRipDir.value.set(...e.dir))}let _=new ee({vertexShader:Ee(!!t.compact),fragmentShader:De(!!t.compact),uniforms:c,transparent:!0}),v=()=>{let e=n.cf>0?n.cf*ke.K/(2*Math.PI*s()):0;c.uWarp.value.set(e,z.W0,z.W1,z.OUT_MIN/(2*Math.PI)),c.uRing.value.set(n.rMax,n.J,n.power,n.cf)};v();let b=new y(He(n.rMax,n.J,s(),n.power,i,n.cf,n.cs,null,a),_);return b.frustumCulled=!1,b.renderOrder=2,Object.assign(_,{stencilWrite:!0,stencilRef:1,stencilFunc:519,stencilZPass:r}),{mesh:b,uniforms:c,setWaveState(e){c.uChop.value=e.chop;let{Z0:t,Z1:n,Z2:r}=re(e.zones,16);c.uZ0.value=t,c.uZ1.value=n,c.uZ2.value=r,c.uStokes.value=e.stokes??0,c.uSharpW.value=e.stats?.sharpWeight??1,c.uFTail.value=+!!e.fft?.sea?.tails.length,c.uTailSharp.value=e.ripples?.sharp??1,c.uCrestFoam.value=e.crestFoam??0,c.uHsRef.value=Math.max(.05,e.stats?.hs??0),c.uFaceSh.value.y=Math.sqrt(Math.max(e.stats?.slopeVar??.01,113e-8));let i=e.gusts,a=c.uGustA.value,o=c.uGustB.value,s=c.uGustC.value;if(i?.on){let e=i.dirToDeg*Math.PI/180,t=Math.min(.95,Math.max(.05,i.coverage));a.set(i.speedMs,i.patchM,.5+.137*Ue(1-t),i.amount),o.set(Math.sin(e),Math.cos(e),i.stretch,i.ch??0),s.set(t,1,i.windMs,s.w)}else a.set(0,1,1,0),s.set(0,0,0,0);p=ae(e),g()},refreshRipples(){g()},setEnv(e){c.uEnv.value=e},setTerrain(e){c.uDepth.value.dispose?.(),c.uDepth.value=e.buildDepthTexture(),c.uRect.value=e.textureRect},setSwellShadow(e){c.uSwellShOn.value=+!!e},setFetchTexture(e){c.uFetch.value=e??B(),c.uFetchOn.value=+!!e},setShoreTexture(e,t){let n=c.uShore.value;n&&n!==e&&n.userData?.shore&&n.dispose(),e&&(e.userData.shore=!0),c.uShore.value=e??B(),c.uShoreOn.value=+!!e,e&&t&&c.uShoreRect.value.set(t.minE,t.minN,t.sizeE,t.sizeN)},ringSpacing(e){return l?l.g*Re(e,l):Pe(e,n.rMax,n.J,n.power,n.cf,n.cs)},get view(){return l},setGrid(e){if(n={...n,view:null,...e},c.uSpokes.value=s(),c.uSecSpan.value=Math.PI*2,v(),b.geometry.dispose(),c.uCrit.value=n.cs,n.view){let e=n.view,t=ze({...e,J:n.J,rMax:n.rMax});l={...e,g:t.g,rings:t.rings},c.uView.value.set(e.h,e.pix,e.sMin,e.k),c.uViewG.value=t.g,c.uViewOn.value=1,b.geometry.dispose(),b.geometry=He(n.rMax,t.rings,s(),n.power,i,0,1,t.radii,a)}else l=null,c.uViewOn.value=0,b.geometry=He(n.rMax,n.J,s(),n.power,i,n.cf,n.cs,null,a)},setSector(e){let t=e?Math.min(Math.PI*2,e.span):Math.PI*2;c.uSecSpan.value=t,c.uSecC.value=e?e.c:0,c.uSecR.value=e?.rFull??60,c.uSpokes.value=s()*(Math.PI*2)/t},update(e,t,n,r,i=null,o=0,s=0){c.uTime.value=e,r&&(c.uPixAng.value=r),a&&i&&s>0&&f(i,t,o,s);{let t=c.uGustT.value,r=c.uGustA.value,i=c.uGustB.value,a=n.x,o=-n.z;if(h&&r.y>0){let n=a-h.e,s=o-h.n,c=Math.min(.25,Math.max(0,e-h.t));t.z+=(n*i.x+s*i.y)/(r.y*i.z)-r.x*c/(r.y*i.z),t.w+=(-n*i.y+s*i.x)/r.y}let s=h?Math.min(.25,Math.max(0,e-h.t)):0;c.uGustC.value.w+=s*r.x/3.7,t.x=a,t.y=o,h={e:a,n:o,t:e}}c.uCenter.value.set(t.e,t.n),c.uCamPos.value.copy(n)}}}var Je=.012,Ye=.15,Xe=.06,Ze=.15,Qe={value:[0,0,9,9]};function $e(e,t,n=.16,r=.2){Qe.value=[e,t,n,r]}var et=`
uniform vec4 uPushZone;
float pushFade(vec3 p) {
float a = -p.z, along = smoothstep(uPushZone.x - 0.3, uPushZone.x, a) * (1.0 - smoothstep(uPushZone.y, uPushZone.y + 0.3, a));
return 1.0 - along * smoothstep(uPushZone.z, uPushZone.w, p.y);
}
`,tt=`
${Se}
${Te}
varying vec3 vWP, vLP, vEL;
varying float vInner;
uniform float uWLBelow, uWLSpacing;
uniform vec2 uCkBox, uCkHull;
uniform float uCkOpen;
bool viaOpening(vec3 p, vec3 e) {
if (p.y >= uCkOpen) return true;
if (e.y <= uCkOpen) return false;
vec3 q = mix(p, e, (uCkOpen - p.y) / (e.y - p.y)); float a = -q.z;
return a > uCkBox.x - 0.08 && a < uCkBox.y + 0.08 && abs(q.x) < uCkHull.y + 0.02;
}
float surfaceH(vec2 en) {
vec2 p0 = en; float h = 0.0;
for (int i = 0; i < 3; i++) {
float dmp = smoothstep(0.3, 4.0, depthAt(p0)); vec3 ff = fetchAt(p0);
Wave w = waveEval(p0, uTime, uWLSpacing, ff, dmp);
h = w.h; p0 = en - w.disp;
}
return h + bowWave(en, 0.04).x;
}
`,nt=`
#define WL_EDGE_MAX ${Xe.toFixed(3)}
  float wlA = 1.0;
  if (vInner < 0.5 || !viaOpening(vLP, vEL)) {   // the bucket (aInner) is below the sea outside but dry: no cut where it is seen through the opening
    float wlD = vWP.y - (surfaceH(vec2(vWP.x, -vWP.z)) - uWLBelow);
    wlA = smoothstep(0.0, clamp(fwidth(wlD), 1e-4, WL_EDGE_MAX) * 1.2, wlD);     // (the soft edge at most WL_EDGE_MAX: a face seen edge-on, the cockpit's rim from above,
                                                                                    //  has a huge fwidth, and its pixels were dropped well above the water: dashes)
    if (wlA < 0.004) discard;
  }
`;function rt(e,t){let n=e.onBeforeCompile,r=Object.fromEntries([...Ce,`uCkBox`,`uCkHull`,`uCkOpen`].map(e=>[e,t[e]]));r.uWLBelow={value:Je},r.uWLSpacing={value:Ze},r.uWLPush={value:Ye},r.uPushZone=Qe,e.onBeforeCompile=(e,t)=>{n?.(e,t),Object.assign(e.uniforms,r),e.vertexShader=`varying vec3 vWP, vLP, vEL;
varying float vInner;
attribute float aInner;
uniform float uWLPush;
`+et+e.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vWP = (modelMatrix * vec4(transformed, 1.0)).xyz; vLP = transformed; vEL = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz; vInner = aInner;`).replace(`#include <project_vertex>`,`#include <project_vertex>
  gl_Position = projectionMatrix * vec4(mvPosition.xyz + normalize(-mvPosition.xyz) * (1.0 - aInner) * pushFade(transformed) * uWLPush, 1.0);      // the bucket and the deck round it are not drawn toward the eye`),e.fragmentShader=tt+e.fragmentShader.replace(`#include <clipping_planes_fragment>`,`#include <clipping_planes_fragment>
`+nt).replace(`#include <color_fragment>`,`#include <color_fragment>
  diffuseColor.a *= wlA;`)};let i=e.customProgramCacheKey;e.customProgramCacheKey=()=>(i?i.call(e):``)+`-wlcut`,e.alphaToCoverage=!0,e.alphaTest=.001,e.polygonOffset=!0,e.polygonOffsetFactor=-3,e.polygonOffsetUnits=-3,e.needsUpdate=!0}function it(e,t=.03){let n=e.onBeforeCompile;e.onBeforeCompile=(e,r)=>{n?.(e,r),e.uniforms.uWLPush={value:Ye},e.uniforms.uWLExtra={value:t},e.uniforms.uPushZone=Qe,e.vertexShader=`uniform float uWLPush, uWLExtra;
`+et+e.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
  gl_Position = projectionMatrix * vec4(mvPosition.xyz + normalize(-mvPosition.xyz) * (uWLPush * pushFade(transformed) + uWLExtra), 1.0);`)};let r=e.customProgramCacheKey;e.customProgramCacheKey=()=>(r?r.call(e):``)+`-lift`,e.needsUpdate=!0}var at=6.4,ot=.1;function st(e){let t=.215*Math.max(Math.sin(Math.PI*e**.78),0)**.62;return{w:t,hh:Math.max(.52*t,.004),yc:.15+.17*(1-e)**3.2+.05*e**4}}var ct=e=>{let{hh:t,yc:n}=st(Math.min(Math.max((e+at/2)/at,0),1));return n+t},lt={Novice:{label:`Novice: stable ski, short arm-led stroke`,boat:{name:`Stable beginner ski`,mass:108,c2:4,c4:.028,_0xc4ece6:.45,_0xbc5840:.7},_0x1a6e27:156,cpW:158,maxW:260,wPrime:9800,bands:[110,170,215,260],tempoSpm:36,keySpm:40,form:{yawDeg:34,leanCatchDeg:2.4,leanExitDeg:3,topCatch:[-.006,.767,-.189],tiltCatch:51.9,betaCatch:11.8,topExit:[.065,.711,-.457],tiltExit:49.5,betaExit:-38.7,tExit:.24,tLevel:.34,shoulderY:.5,levelZ:-.24,legAmp:.01,headCounter:.6}},Advanced:{label:`Advanced: intermediate ski, rotation-led stroke`,boat:{name:`Intermediate ski`,mass:105,c2:3.2,c4:.024,_0xc4ece6:.45,_0xbc5840:.8},_0x1a6e27:160,cpW:198,maxW:450,wPrime:3e4,bands:[120,240,330,450],tempoSpm:40,keySpm:45,form:{yawDeg:56,leanCatchDeg:10,leanExitDeg:0,topCatch:[.2422,.8048,-.2601],tiltCatch:55.0749,betaCatch:-.46,topExit:[-.0313,.618,-.4502],tiltExit:56.3602,betaExit:-20.44,tExit:.24,tLevel:.34,shoulderY:.5,levelZ:-.24,legAmp:.03,headCounter:1,pullDiag:25,fit:{chin:[-.0062,.5969,-.2],hx:.3738},_0x1ded6d:{yaw:56,lean:9.3,hip:14,roll:.2,blade:-5,head:[0,0],lift:[75,25],wrist:[13,-9,9,0],grip:[-134.6,3.2,-176.3,26.2]},_0x03181c:{yaw:-22,lean:.3,hip:.9,roll:1,blade:-6.5,head:[0,0],lift:[55,40],wrist:[9.5,0,4.5,0],grip:[-83.2,15.5,165.7,26.1]},pre:[{dt:.161,top:[-.1344,.6518,-.2607],tilt:3.2721,beta:24.3333,yaw:29.7,lean:2.8,hip:7.4,roll:-.3,blade:40,head:[0,0],lift:[15,4.5],wrist:[0,0,-5,0],grip:[-50.5,-15,99.9,39]},{dt:.091,top:[.0529,.7726,-.2549],tilt:30.2995,beta:17.6087,yaw:47.1,lean:7,hip:11.8,roll:-.3,blade:20,head:[0,0],lift:[65,20],wrist:[5,0,5,-10],grip:[-93.3,-7.6,156.3,30.2]},{dt:.031,top:[.1584,.7893,-.2432],tilt:46.629,beta:3.411,yaw:54.9,lean:9.5,hip:13.7,roll:-.3,blade:5,head:[0,0],lift:[60,25],wrist:[10,-5,7,-10],grip:[-114.8,5.6,173.7,28.3]}],keys:[{name:`catch`,kind:`catch`,t:0,yaw:55.7,hip:14,lean:6,roll:-2.6,head:{turn:0,tilt:0},top:{fwd:5.9,up:9.4,out:-2.5},front:67.4,plan:43.7,lift:{top:75,low:25},wrist:{top:{back:13,side:-9},low:{back:9,side:0}},blade:-5},{name:`exit`,kind:`exit`,t:.24,yaw:-22,hip:.9,lean:.4,roll:-.2,head:{turn:0,tilt:0},top:{fwd:11,up:3,out:-.2},front:62.8,plan:-42,lift:{top:55,low:40},wrist:{top:{back:9.5,side:0},low:{back:4.5,side:0}},blade:-6.5},{name:`fold`,kind:`pre`,t:.339,yaw:29.7,hip:7.4,lean:2.2,roll:-.8,head:{turn:0,tilt:0},top:{fwd:2.3,up:2,out:11},front:9.3,plan:53.9,lift:{top:15,low:4.5},wrist:{top:{back:0,side:0},low:{back:-5,side:0}},blade:40},{name:`set-up`,kind:`pre`,t:.409,yaw:46.9,hip:11.8,lean:4.8,roll:-1.7,head:{turn:0,tilt:0},top:{fwd:4,up:7.5,out:5},front:57,plan:62,lift:{top:65,low:20},wrist:{top:{back:5,side:0},low:{back:5,side:-10}},blade:20},{name:`entry`,kind:`pre`,t:.469,yaw:54.6,hip:13.7,lean:6.4,roll:-2.3,head:{turn:0,tilt:0},top:{fwd:5,up:8.5,out:1},front:64,plan:50,lift:{top:60,low:25},wrist:{top:{back:10,side:-5},low:{back:7,side:-10}},blade:5}]}},Elite:{label:`Elite: fast narrow ski, full-body stroke`,boat:{name:`Elite narrow ski`,mass:98,c2:2.56,c4:.02,_0xc4ece6:.45,_0xbc5840:.85},_0x1a6e27:162,cpW:330,maxW:650,wPrime:4e4,bands:[130,360,480,650],tempoSpm:44,keySpm:50,form:{yawDeg:66,leanCatchDeg:10.1,leanExitDeg:-2,topCatch:[.18,.82,-.24],tiltCatch:51,betaCatch:-8.5,topExit:[.083,.795,-.277],tiltExit:63.1,betaExit:-24.5,tExit:.24,tLevel:.34,shoulderY:.5,levelZ:-.24,legAmp:.04,headCounter:1}}},ut=`Advanced`,dt={"Hi-vis yellow":`#cbe600`,"Hi-vis orange":`#ff5a14`,Blue:`#2b63c4`,Red:`#c62828`,Orange:`#ef6c00`,Yellow:`#f2c200`,Green:`#2e7d32`,Teal:`#00897b`,Pink:`#d81b60`,Black:`#1b1d21`},ft=`Hi-vis yellow`,pt={fluor:1.3},mt={"Man, T-shirt":`mike-kit`,"Man, wetsuit":`wetsuit-m`,"Woman, tank top":`tank-f`,"Woman, wetsuit":`wetsuit-f`,"Woman, sport suit":`sportsuit-f`},ht=`mike-kit`,gt=`Simple figure`,_t=[`Light`,`Medium light`,`Medium`,`Medium dark`,`Dark`],vt=`Light`,yt=[.25,.25,.3,.1,.1];function bt(e=Math.random(),t=yt){let n=0;for(let r=0;r<t.length;r++)if(n+=t[r],e<n)return r;return t.length-1}var xt=(e,t)=>`models/skins/${/-f$/.test(e??``)?`female`:`male`}-${Math.max(0,Math.min(_t.length-1,t|0))}.jpg`;function St(e,t){let n=e.tempoSpm+5*(t/e._0x1a6e27-1)/.7;return Math.min(e.tempoSpm+10,Math.max(e.tempoSpm-10,n))/60}function Ct(e,t){let n=St(e,t),r=1/n,i=60/e.tempoSpm,a=60/(e.keySpm??e.tempoSpm),o=Math.min(r,r>=i?a*r/i:a-.33333333333333337*(i-r));return{hz:n,motionHz:1/o,glide:(r-o)/2}}function wt(e){if(e.box)return{exit:e.exit?.t??.31,fold:e.boxKey?.t??.39};let t=e.keys?.find(e=>e.name===`fold`)?.t??(e.pre?.length?.5-e.pre[0].dt:e.tLevel??.36);return{exit:e.tExit??.2,fold:t}}function Tt(e,t,n){let r=Math.min(.5,n/(e+t+n)),i=2*r,a=e/(1-r),o=t/(1-r),s=Math.max(0,n-r*(a+o));return{D:i,Tin:a,Tout:o,hold:s,dIn:e,end:a+s+o,sEnd:e+t}}var Et=e=>e*e*e*e*(e*e-3*e+2.5);function Dt(e,t){if(t<=0)return t;if(t<e.Tin)return t-e.D*e.Tin*Et(t/e.Tin);let n=t-e.Tin-e.hold;return n<=0?e.dIn:n<e.Tout?e.dIn+n-e.D*e.Tout*(.5-Et(1-n/e.Tout)):e.sEnd+(t-e.end)}var Ot=(e,t,n)=>Math.min((n?.glideOut??.5)*(t-e),.6*(.5-t)),kt=2*Math.PI,At=e=>(e%.5+.5)%.5;function jt(e,t,n,r,i,a=e.form){if(r){let n=r.tau+i,a=r.sh;return n<a.end?{phase:r.phase0+kt*r.m*Dt(a,n),glide:{...r,tau:n}}:{phase:r.phase0+kt*(r.m*a.sEnd+Ct(e,t).motionHz*(n-a.end)),glide:null}}let o=Ct(e,t),s=o.motionHz,c=n/kt,l=At(c),u=l+s*i,{exit:d,fold:f}=wt(a);if(o.glide>1e-4&&l<d&&u>=d){let e=kt*(c+d-l),t=Tt((f-d)/s,Ot(d,f,a)/s,o.glide),n=(u-d)/s;return{phase:e+kt*s*Dt(t,n),glide:{phase0:e,m:s,sh:t,tau:n}}}return{phase:n+kt*s*i,glide:null}}var Mt={carbon:{color:2895668,roughness:.3,metalness:.75,clearcoat:1,clearcoatRoughness:.03,anisotropy:.8,map:`twill`,tile:.0084,normal:.5},gelcoat:{color:null,roughness:.42,metalness:0,clearcoat:.6,clearcoatRoughness:.07},webbing:{color:null,roughness:.82,metalness:0,sheen:.55,sheenRoughness:.55,map:`webbing`,tile:.006,normal:1},spandex:{color:null,roughness:.55,metalness:0,sheen:.65,sheenRoughness:.4,map:`knit`,tile:.0064,normal:.8},neoprene:{color:null,roughness:.72,metalness:0,sheen:.3,sheenRoughness:.55,map:`knit`,tile:.0048,normal:.6},nylon:{color:null,roughness:.58,metalness:0,sheen:.3,sheenRoughness:.5,map:`oxford`,tile:.008,normal:.5},braid:{color:null,roughness:.7,metalness:0,sheen:.4,sheenRoughness:.5,map:`braid`,tile:.006,normal:.9},plastic:{color:null,roughness:.42,metalness:0,clearcoat:0},retro:{color:11120049,roughness:.45,metalness:0,sheen:.2,sheenRoughness:.5,map:`oxford`,tile:.004,normal:.25,retro:2.4}},Nt={value:`physical`},Pt={value:8},V=(e,t)=>(e%t+t)%t;function Ft(e,t,n,r){let i=new Uint8Array(t*n*4);for(let a=0;a<n;a++)for(let o=0;o<t;o++){let s=(e[a*t+V(o+1,t)]-e[a*t+V(o-1,t)])*.5*r,c=(e[V(a+1,n)*t+o]-e[V(a-1,n)*t+o])*.5*r,l=Math.hypot(s,c,1),u=4*(a*t+o);i[u]=128+127*(-s/l),i[u+1]=128+127*(-c/l),i[u+2]=128+1/l*127,i[u+3]=255}return i}function H(e,n,r){let o=new x(e,n,r,t,a);return o.wrapS=o.wrapT=g,o.magFilter=f,o.minFilter=i,o.generateMipmaps=!0,o.anisotropy=Pt.value,o.colorSpace=``,o.needsUpdate=!0,o}var U=e=>Math.max(0,Math.sin(Math.PI*e))**.45,It=(e,t,n=4)=>V(e-t,n)<n/2;function Lt(e=256){let t=e/4,n=new Float32Array(e*e),r=new Uint8Array(e*e*4),i=new Uint8Array(e*e*4),a=7,o=()=>(a=a*16807%2147483647)/2147483647,s=Array.from({length:32},()=>.9+.2*o());for(let a=0;a<e;a++)for(let o=0;o<e;o++){let c=Math.floor(o/t),l=Math.floor(a/t),u=o%t/t,d=a%t/t,f=It(c,l,4),p=f?1:.35,m=f?.35:1,h=e=>.5-.5*Math.cos(Math.PI*Math.min(1,Math.max(0,e))),g=It(c+1,l,4),_=It(c-1,l,4),v=It(c,l+1,4),y=It(c,l-1,4),b=u<.5?p+((_?1:.35)-p)*(1-h(u*2+0))*.5:p+((g?1:.35)-p)*h(u*2-1)*.5,x=d<.5?m+((y?.35:1)-m)*(1-h(d*2))*.5:m+((v?.35:1)-m)*h(d*2-1)*.5,S=U(d)*b,C=U(u)*x,w=S>=C,T=4*(a*e+o),E=.04*Math.sin((w?d:u)*Math.PI*22+(w?l:c)*1.7);n[a*e+o]=Math.max(S,C)+E,r[T]=w?255:128,r[T+1]=w?128:255,r[T+2]=Math.round(255*Math.min(1,.25+.9*Math.max(S,C))),r[T+3]=255;let D=s[(w?0:16)+l*4+c];i[T]=255,i[T+1]=Math.round(255*Math.min(1,(.85+.3*(1-Math.max(S,C)))/1.15)),i[T+2]=Math.round(255*Math.min(1,D/1.1)),i[T+3]=255}return{normal:H(Ft(n,e,e,6),e,e),aniso:H(r,e,e),rough:H(i,e,e)}}function Rt(e=128){let t=e/6,n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let a=Math.floor(i/t),o=Math.floor(r/t),s=i%t/t,c=r%t/t,l=V(a-o,3)<2;n[r*e+i]=Math.max(U(c)*(l?1:.4),U(s)*(l?.4:.85))}return{normal:H(Ft(n,e,e,5),e,e)}}function zt(e=128){let t=e/8,n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let a=i%t/t-.5,o=r%t/t-.5,s=e=>{let t=.45*e,n=(a-e*.2)*Math.cos(t)-o*Math.sin(t),r=(a-e*.2)*Math.sin(t)+o*Math.cos(t);return Math.exp(-((n/.16)**2+(r/.42)**2))};n[r*e+i]=Math.max(s(-1),s(1))}return{normal:H(Ft(n,e,e,3),e,e)}}function Bt(e=128){let t=e/8,n=new Float32Array(e*e);for(let r=0;r<e;r++)for(let i=0;i<e;i++){let a=Math.floor(i/t),o=Math.floor(r/t),s=i%t/t,c=r%t/t,l=(a+o)%2==0;n[r*e+i]=Math.max(U(c)*(l?1:.5),U(s)*(l?.5:1))}return{normal:H(Ft(n,e,e,3),e,e)}}function Vt(e=128){let t=new Float32Array(e*e);for(let n=0;n<e;n++)for(let r=0;r<e;r++){let i=(r+n)/e*6,a=(r-n+e)/e*6,o=V(Math.floor(i)-Math.floor(a),4)<2;t[n*e+r]=Math.max(U(i%1)*(o?1:.45),U(a%1)*(o?.45:1))}return{normal:H(Ft(t,e,e,4),e,e)}}var Ht={twill:Lt,webbing:Rt,knit:zt,oxford:Bt,braid:Vt},Ut={};function Wt(e){return Ut[e]??=Ht[e]()}function Gt(e){let t=e.attributes.position,n=e.attributes.uv;if(!n)return 1;let r=e.index?.array,i=r?r.length:t.count,a=0,o=0,s=new M,c=new M,l=new M;for(let e=0;e+2<i;e+=3){let i=r?r[e]:e,u=r?r[e+1]:e+1,d=r?r[e+2]:e+2;s.fromBufferAttribute(t,i),c.fromBufferAttribute(t,u),l.fromBufferAttribute(t,d),a+=c.sub(s).cross(l.sub(s)).length()/2,o+=Math.abs((n.getX(u)-n.getX(i))*(n.getY(d)-n.getY(i))-(n.getX(d)-n.getX(i))*(n.getY(u)-n.getY(i)))/2}return o>0?Math.sqrt(a/o):1}function Kt(e,t,n){let r=e.onBeforeCompile,i=e.customProgramCacheKey?.bind(e);e.onBeforeCompile=(t,i)=>{r?.call(e,t,i),n(t)},e.customProgramCacheKey=()=>`${i?i():``}|${t}`}function qt(e,t){e.userData.retro={value:t},Kt(e,`retro`,t=>{t.uniforms.uRetro=e.userData.retro,t.fragmentShader=t.fragmentShader.replace(`void main() {`,`uniform float uRetro;
void main() {`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
      {
        vec3 rv = normalize(vViewPosition);
        float back = 0.0;
        #if NUM_DIR_LIGHTS > 0
          back = pow(max(dot(rv, directionalLights[0].direction), 0.0), 28.0) * max(dot(normal, directionalLights[0].direction), 0.0);
          reflectedLight.directSpecular += uRetro * 0.6 * back * directionalLights[0].color * diffuseColor.rgb;
        #endif
        #if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
          vec3 rw = inverseTransformDirection(rv, viewMatrix);
          reflectedLight.indirectSpecular += uRetro * 0.035 * diffuseColor.rgb * textureCubeUV(envMap, envMapRotation * rw, 0.3).rgb * envMapIntensity;
        #endif
      }`)})}function Jt(e,t){e.userData.fluor||(e.userData.fluor={value:t},Kt(e,`fluor`,t=>{t.uniforms.uFluor=e.userData.fluor,t.fragmentShader=t.fragmentShader.replace(`void main() {`,`uniform float uFluor;
void main() {`).replace(`#include <color_fragment>`,`#include <color_fragment>
  diffuseColor.rgb *= uFluor;`)})),e.userData.fluor.value=t,e.needsUpdate=!0}function W(e,{from:t=null,metresPerUv:n=1,mapRotation:r=0,overrides:i={},legacy:a=null}={}){let o={...Mt[e],...i},s=Nt.value;if(s===`legacy`){let n={color:o.color??8421504,roughness:.5,metalness:0,...a??{}},r=new E({color:n.color,roughness:n.roughness,metalness:n.metalness});return t&&(r.name=t.name,t.color&&r.color.copy(t.color),t.map&&(r.map=t.map)),r.userData.kind=e,r.userData.legacy=!0,r}let c=new(s===`physical`?A:E)({roughness:o.roughness,metalness:o.metalness??0});if(t&&(c.name=t.name,t.color&&c.color.copy(t.color),t.map&&(c.map=t.map),t.side!=null&&(c.side=t.side),t.transparent&&(c.transparent=!0,c.opacity=t.opacity)),o.color!=null&&c.color.setHex(o.color),s===`physical`&&(o.clearcoat&&(c.clearcoat=o.clearcoat,c.clearcoatRoughness=o.clearcoatRoughness??.05),o.sheen&&(c.sheen=o.sheen,c.sheenRoughness=o.sheenRoughness??.5,c.sheenColor=c.color.clone().lerp(new m(1,1,1),.35)),o.anisotropy&&(c.anisotropy=o.anisotropy)),o.map&&s!==`simple`){let e=Wt(o.map),t=n/o.tile,i=e=>{let n=e.clone();return n.repeat.set(t,t),n.rotation=r,n.needsUpdate=!0,n};c.normalMap=i(e.normal),c.normalScale.set(o.normal,o.normal),e.rough&&(c.roughnessMap=i(e.rough)),e.aniso&&s===`physical`&&o.anisotropy&&(c.anisotropyMap=i(e.aniso))}return o.retro&&s!==`simple`&&qt(c,o.retro),c.userData.kind=e,c}function Yt(e=``){return/^(jersey|top|tank|shorts|leggings|short02)/.test(e)||/hat/.test(e)?`spandex`:/^(wetsuit|booties|pfd_side|pfd_pocket1)/.test(e)?`neoprene`:/^(pfd|pfd_pocket0|pfd_pocket2)$/.test(e)?`nylon`:/^pfd_binding/.test(e)?`retro`:/^pfd_straps/.test(e)?`webbing`:/visor/.test(e)?`plastic`:null}function Xt(e){let t={};e.getHSL(t);let n=t.h*360;return t.s>.75&&t.l>.35&&t.l<.75&&(n>=55&&n<=95||n>=10&&n<=30)}var Zt={sun:{value:1.85},sky:{value:.7}},Qt={sun:1.85,sky:.7,env:.55};function $t(e){return Nt.value===`legacy`||e.userData.boatLit||!(e.isMeshStandardMaterial||e.isMeshLambertMaterial)||(e.userData.boatLit=!0,Kt(e,`boatlit`,e=>{e.uniforms.uBoatSun=Zt.sun,e.uniforms.uBoatSky=Zt.sky,e.fragmentShader=e.fragmentShader.replace(`void main() {`,`uniform float uBoatSun, uBoatSky;
void main() {`).replace(`#include <lights_fragment_end>`,`#include <lights_fragment_end>
  reflectedLight.directDiffuse *= uBoatSun; reflectedLight.directSpecular *= uBoatSun; reflectedLight.indirectDiffuse *= uBoatSky;`)}),e.needsUpdate=!0),e}var G=Math.PI/180,K=.0254,en=e=>new M(-e.x,e.y,e.z);function tn(e,t,n,r=new C,i=0){let a=e.trunk,o=new C,s=new T,c=(e,r,a,c)=>o.makeRotationFromEuler(s.set(-n*(c-a),t*(r-e),i*(c-a),`XYZ`));return r.makeTranslation(a.pelvisPos.x,a.pelvisPos.y,a.pelvisPos.z).multiply(c(0,a.pelvis,0,a.pelvisBend)),r.multiply(new C().makeTranslation(0,a.jointBelly,0)).multiply(c(a.pelvis,a.belly,a.pelvisBend,a.bellyBend)),r.multiply(new C().makeTranslation(0,a.jointChest,0)).multiply(c(a.belly,1,a.bellyBend,1)),r.multiply(new C().makeTranslation(0,-(a.jointBelly+a.jointChest),0))}function nn(e,t,n=1){return new M(n/Math.tan(e*G),-1,-1/Math.tan(t*G)).normalize()}function rn(e,t,n,r,i){let a=t.clone().sub(e),o=Math.min(Math.max(a.length(),1e-4),n+r-1e-4),s=a.normalize(),c=(o*o+n*n-r*r)/(2*o),l=Math.sqrt(Math.max(n*n-c*c,0));return e.clone().addScaledVector(s,c).addScaledVector(i.clone().addScaledVector(s,-i.dot(s)).normalize(),l)}function an(e,t,n){let r=tn(e,n.yaw,n.lean),i=r.clone().invert(),a=nn(n.front,n.side,1),o=2*t.handX,s=o+t.shaftHalf-t.handX,c=s+t.bladeLen/2,l=new M().setFromMatrixColumn(r,0),u=new M().setFromMatrixColumn(r,1),d=e.shoulders[1].clone().applyMatrix4(r),f=n.reach*(e.arm[0]+e.arm[1]),p=e=>{let t=new M(0,0,e).applyMatrix4(r),i=-n.depth-a.y*s-t.y,f=n.out-a.x*c-t.x,p=l.y*u.x-u.y*l.x,m=(i*u.x-u.y*f)/p,h=(l.y*f-i*l.x)/p,g=new M(m,h,e),_=g.clone().applyMatrix4(r).addScaledVector(a,o);return{top:g,low:_,dist:_.distanceTo(d)}},m=-1.2,h=.6,g=null;for(let e=m;e<=h;e+=.01){let t=p(e);if((!g||t.dist<g.dist)&&(g={z:e,...t}),t.dist<=f){h=e,m=e-.01;break}}if(g.dist>f)return{t:n.t,yaw:n.yaw,lean:n.lean,L:g.top,R:g.low.applyMatrix4(i),short:g.dist-f};for(let e=0;e<30;e++){let e=(m+h)/2;p(e).dist<=f?h=e:m=e}let _=p(h);return{t:n.t,yaw:n.yaw,lean:n.lean,L:_.top,R:_.low.applyMatrix4(i),short:0}}var on=new WeakMap;function sn(e,t,n){let r=on.get(e)??new Map;on.set(e,r);let i=`${t.id}|${n.handX}|${n.shaftHalf}`;if(r.has(i))return r.get(i);let a=e.yawDeg*G,o=n.handX,s={y:t.chinY+(e.box?.up??0)*K,z:t.clavZ-(e.box?.fwd??12)*K},c=e.water.map(([e,r,i,o,s,c,l,u])=>an(t,n,{t:e,yaw:r*a,lean:i*G,front:o,side:s,depth:c*K,out:l*K,reach:u})),l=c[c.length-1],u=e.exit,d=un(e,1),f=t.shoulders[1],p=rn(f,l.R,t.arm[0],t.arm[1],d),m=p.clone().sub(f),h=l.R.clone().sub(p),g=m.clone().cross(h);g.length()<.001*m.length()*h.length()&&g.crossVectors(d,m),g.normalize();let _=p.clone().add(h.clone().applyAxisAngle(g,u.pivot*G)),v=l.L.clone().add(new M(0,u.lift*K,0)),y=_.clone().add(v.sub(_).normalize().multiplyScalar(2*o));c.push({t:u.t,yaw:u.yaw*a,lean:u.lean*G,L:y,R:_});let b=e.boxKey;c.push({t:b.t,yaw:b.yaw*a,lean:b.lean*G,L:new M(-o,s.y,s.z),R:new M(o,s.y,s.z)});let x={keys:[...c,...c.map(e=>({t:e.t+.5,yaw:-e.yaw,lean:e.lean,L:en(e.R),R:en(e.L)}))],box:s};return r.set(i,x),x}var cn=-.0075;function ln(e,t,n,r){let i=e.navel??{y:.17,z:-.12},a=new M(r*n.across*K,i.y+n.up*K,i.z-n.fwd*K),o=tn(e,r*n.yaw,n.lean,new C,-r*n.roll),s=t.shaftHalf+t.bladeLen,c=e=>new M(r*Math.cos(e),-Math.sin(e),0),l=e=>a.clone().addScaledVector(c(e),s).applyMatrix4(o).y-cn,u=-.3,d=1;for(let e=0;e<40;e++){let e=(u+d)/2;l(e)>n.low*K?u=e:d=e}let f=c((u+d)/2),p=a.clone().addScaledVector(f,-t.handX),m=a.clone().addScaledVector(f,t.handX);return{yaw:r*n.yaw,lean:n.lean,roll:-r*n.roll,L:r>0?p:m,R:r>0?m:p,drive:0,headCounter:1,legAmp:0,bladeRoll:Math.PI/2-n.tilt*r,slope:(u+d)/2}}var un=(e,t,n=0)=>{let r=e.pole??[.3,-.9,.15],i=e.poleTop??r,a=e=>r[e]+(i[e]-r[e])*n;return new M(t*a(0),a(1),a(2))};function dn(e,t,n){let r=e.length,i=t=>e[(t%r+r)%r],a=e=>i(e).t+Math.floor(e/r),o=r-1;for(let n=0;n<r;n++)e[n].t<=t&&(o=n);let s=a(o),c=a(o+1),l=a(o-1),u=a(o+2),d=c-s,f=(t-s+ +(t<s))/d,p=n(i(o)),m=n(i(o+1)),h=n(i(o-1)),g=n(i(o+2)),_=f*f,v=_*f,y=2*v-3*_+1,b=v-2*_+f,x=-2*v+3*_,S=v-_;if(typeof p==`number`){let e=.7*(m-h)/(c-l)*d,t=.7*(g-p)/(u-s)*d;return p*y+e*b+m*x+t*S}let C=m.clone().sub(h).multiplyScalar(.7*d/(c-l)),w=g.clone().sub(p).multiplyScalar(.7*d/(u-s));return p.clone().multiplyScalar(y).addScaledVector(C,b).addScaledVector(m,x).addScaledVector(w,S)}function fn(e,t,n,r){let{keys:i}=sn(t,n,r);return{L:dn(i,e,e=>e.L),R:dn(i,e,e=>e.R),yaw:dn(i,e,e=>e.yaw),lean:dn(i,e,e=>e.lean)}}var pn=[{role:`hull`,nv:2602,nt:5200,pos:`OwBqA/Fwxf9qA/Fwxf/FBPFwOwA6BPFwxf/XBfFwAAARBfFwOwA2BfFwOgDaBfFwxf8KA99wPAAKA99wagBpA99wl/9oA99wlv83BN9wagDHBN9wagDOBd9wlv8SBd9wlv/OBd9wOAA1BuBwov8gA9FwXgAgA9Fwu/8tBt5wYQAUBtFwPADjAqlwlP8BA6lwagAAA6lwfv/VA6lwff8yBKlwff/lBKlwgwAdBalwgwDRBadwcgArBqhwxP/jAqlwr/+YArRugv9WA6dwpAAeBPlvaf8rBDtwgwAyBKlwff8/BalwqAAsBeBvff/OBahwjv8rBqhwAABXBqlwfP/ZAoRvUf8yAzlvN//5AyxvfABcA65wRv8hBIRvEwFCBaJtRP8/BXlvRv9qBYRvugBqBYRvRv/SBYRv1AA5Blhuwv9SBqpwXAB0AsBtrwAyAzlvGP+bA1Ru7P4HBJtt4wDZA6BuLv/3BP5u0gASBf9u6/7YBZVt4ABsBbRuTf81Bh5vgP9lBh1uPQBSBqtwAABjBjRvHv8KA7Rt/v7HBP5tHv89Bv5tgQBmBv5te/9nBm5tjgBlBkJt/P5EBjZtBAFEBjZtpP9uApBtAABZAuBsVf+WApttqwCWAptt4gAKA7Rt+wCWA+ZtFAEHBJ5tJgG1BDRt4P5iBVptFAHZBZht8v9uBkhtL/9OBs5sKQAqBsBrawAvAiRrNP9iAqBr0wBYAilrIQHaApZrrP7xAytsrP7+BCtskAFaBcpqrv5vBStsXgHABb9rx/4WBiFs8wA+BntsAv8zBjFsmv9CAvNr3/7aApZrqP5rA6JrWAFrA6JrfP7jAxNrrP6zBCtsgf5aBStrYgFqBdFrov7ABb9ro/77BQ9rVgH9BVtrJQEQBgVr2v4QBgprh/8BAjxpHv8/Ah5qq/6vAq5pbP5SAx5qggHjAxxrU/7XAx5qU/6yBB5qrQGyBB5qU/4FBR5qVAF6BCtsU/4+BR5qrQE+BR5qV/5zBR5qsgG8BYhpg/71BRtqfQH1BRtqRAELBhVqvf4MBhFqdAAgBjxpnv4eBihpYgEdBi5pZP4GBi1pa/+dARxlCP8dArBo+AAdArBoVQGvAq5pNf44A7hopAFJA7NpTv68BYhpJv9IBl5ogP5GBkFogAFGBkFoeABMBmRoQv4uBixorQEXBrhojQGBAqhnff2eAy1l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rALYCMGh+v62DVWeBgG2DVWeAADGDXWe6v50AX+eDAGCAWKdJQJVAyWdyv0IBb6dPAI6BfKd7/29B32c5v1qCMSc+P12DROeCAJ2DROeyf2NC8idMQKeDJqdFP+rDf6c7ACrDf6cAAC6Df2caP6FDdGcmAGFDdGc9QBTDSmcJP9ZDTOcCQGSAVyc2/1UAymdB/4nDVuc5gEEDZWb9P3QC1Cc+wHQCribwwFSDUmcPP5SDU6cAABfDSec9/6SAV+cNP4JAjec1gEAArGc6wFKBSSbD/6iBmSbDQI5CFScI/7+DF2bV/4nDV2bqQEnDV2bAAAuDU+bMP5JCUiaDv6OC22bAAKzC+abH//FAW2Z6wC4ATeaZf4rAjWamwErAjWaNP66Bh6azAG6Bh6ae/4dDQaagwEeDQaaN/4kCwiaN/6EDAGayQGEDAGaSP71DACauAH1DACaAADZAQeYmP5LAiqYbf6pA/qXmgGcA0aYb/5iBRKYeP7qBtCXeP6JCc+XlwHzBk2YzgG/CzOaSf7hC2qZkQGXCyKY3QAxDayYoP4xDaCYXwEyDZ+Ye/64DJWXhQG4DJWXbv4MDZeYwgDiAXyX2/9nDbuXQwFmDY+Xfv5yCqOXjf5BDXeXiAEcDSCYPv/kAWKXs/5fAh6XWwFSAqeXAADHDa+Wvv5pDYOXlAC/DamWmv6/A4iW9f6gDeGWCwGgDeGWawH7Bs6Wmf7fCK+Wa/++DauWWwE+CUuWlv65C9OWXAHnDD2WwP6TDV6WPwGRDWqWof7jDFOWWv/ODRmWpgDODRmWrAAPAvWVVP8PAvWV1P6CAuuVGQGYAkOVtv6RBaeVu/4WB4SVwv4+CU6Vxv6gCjGVyf4pDBCVBAEGDWuT8f6WDeqUaP9LAqmUmABLAqmU+P66Ap2UWwHGAyiWHQEyByeU7P4rBtWTJAFWB2mU8P6kCsCT8/4NDLGT0ACjDeqSAADaDfiVZP/WDdKUnADWDdKUef+nAnKThwCnAnKTFv8OA2eT6gAOA2eTAf/RBR6TDP+jCMeS3AATCfqRkP/cDZ2SMP+jDeqS/P4GDWuTGv8mDHCS6ACbC3aS/wBMDDyTif8lA16SdwAlA16SMf9/A1KSzwB/A1KSB/9SBNSSYgDbDQSSpP/eDQuSKP8wBsKR2ABgB82RiwCeDRaRXv8TDcWQogATDcWQmP/GA3yRaADGA3yRTP8OBGqRtAAOBGqRpQDxC0GQ6wC+CoeSJ/9vC++RN//gBD6RtP/HDRyRSwDIDR6Rdf+eDRaR0ACmBHKRbf+PBOCQkwCPBOCQpP+ABMqQXACABMqQU/8nCUSQZP8yBYKQnAAyBYKQlf9yDXaQSgCLDWuQwf+PDWuQWv/tC0SQVABJBUeQq/9KBUeQrgAjCUmQbP85BiGQjf8WDQSQcwAWDQSQsP9CBt2PUABCBt6Pw/8WDcyPPQAWDcyPc/+FB8OPkgCOBgWQiv92DJePdgB2DJePe/9BCWqPTACIB3mPtP+IB3mPhv+rC16PhQBBCWqPegCrC16Pwf96DFWPPwB5DFWPuP/hCC2PSADiCC2PwP/WCx+PQADWCx+Pvf8RCw+PQgASCw+PRQASCg+Pu/8TCg+P`,idx:`QQkRCRQJQQkUCSoJFgksCSoJFgkqCRQJJwkYCf0IGAkWCQ4JAAniCBgJAAkYCQ4J4gj9CBgJUAiECIoIUAiKCIsInAidCAAIeggBCJ0IAQgACJ0IhwF1AQkCTgEyAWoBTgFqAVoBMgFDAV8BMgFfAWoBFwEYAfQAAAnUCOII4Qj9COII7gDwAOQA7gDkANIA8ADyAOUA8ADlAOQA5QDUAOQA1ADSAOQAugC8ALIApwCUALoApwC6ALIAlAC4ALoAOgA3AE8AOgBPAFAANwBOAE8AJAQmBMMDiAl+CXQJCQoRChUKEQoZCiEKEQohChUKIAoVCiEKFQoKCgkKAgr4CfYJAgr2CQQK+AnsCeoJ+AnqCfYJ6Qn2CeoJ9gkDCgQKgQlYCWUJWAlLCTIJWAkyCWUJ9wjaCOUI2Aj1COUIAAkOCQ8JDgkWCRQJDgkUCQ8JEQkPCRQJEQkDCQ8JtwicCJoInAjgB5oItgiaCOAHcgGTAY8BlQFvAY8BMAH+ABIBLQFFAUcBRQFiAUcBVAFHAWIBXwFDAUYBUAFsAUYBwwjUCNUI1AjyCNUIAwnVCPIIAwmqCNUIHAkFCfUIHAn1CBoJBQn3COUIBQnlCPUI9QgZCRoJ7gDSAOEA7gDhAO0A7ADtAOEAwgDQALAA4ACwANAAuACkALYAhwDEALYAhwC2AKQAFQAeAEEAFQBBABEAKQARAEEAEwAKAAAAEwAAAAkAAQAJAAAAnAgACOAH3we2COAHeAd2B/gHdgdjB9gHMwh2B9gHMwj4B3YHcAYRBqUFOQIKArMBewgFCKAIvQh7CKAIvQiZCHsIJAkLCfwIbgNqA8gDbgPIA88DnQHDAaABwwHLAaABkwGRAaABkQGNAZ0BkQGdAaABcQFyAWMBRQFWAXEBRQFxAWMBVgFSAWABVgFgAXEBIAE7AS0BIAEIASsBIAErATsBoAZvBioGoAamBm8GEgfKBpoGygZTBpoGogbOBp8GogYZB84GHwoZCvkJhAluCUgJ8Aj8CAsJ/AjwCO4I3wjuCPAIvQizCJUIvQiVCJkIcwh1CJUIdQiZCJUImQh1COgHCAjoB3UIsAZ0Bh8HdAamBh8HbwYSBnYFbwZ2BYcFxAPGA5cDswG0AZoBTQFdAWgBNgEqARcBGQEYARcBGQEXASoB3ADLAOcA3ADnAPYAvwDNAKwAPgAvAFQACQKzAYgBswGXAYgBiAGHAQkCSwFOAVoBSwFaAWYB8gDwACQB8gAkARUB8ADuACQBMAEkAe4A8gD0ANcA8gDXAOUA9ADZANcAvAC9ALIAlgCnALIAlgCyAL0AOgBQAFEACgADAAAACQJ1AVMCdQGFAdcCdQHXAlMCUwI3AgkCegidCLoItwi5CJ0ItwidCJwIuQi6CJ0Iugi5CNwIugjcCN0IuQi3CNwI2gjcCLcI+gj5CAcJ+ggHCQkJ+Qj3CAUJ+QgFCQcJHAkeCQcJHAkHCQUJHgkgCQkJHgkJCQcJIAkeCTYJIAk2CU4JHgkcCTQJHgk0CTYJSwlNCTYJSwk2CTQJTQlOCTYJKAYnBsoG1wKFAYsB1wKLAQcCsQEHAosBNwKdAlUCnQI5AlUCPwIaAhcCGgLkAd8BGgLfARcCywEUAhcCywEXAt8BPAIMAjkCPAKdAQwCrgGoAZQBrgGUAaIBqAGlAaMBqAGjAZQBbwFTAVQBbAliCUQJbAlECVMJYgljCUQJRQlECWMJRAlBCVMJ9AgDCREJ9AgRCRIJaAiRCIgIGQoRCvQJGQr0CfkJEQoJCvIJEQryCfQJbglsCVUJQwk9CW4JQwluCVUJPQlICW4JJAknCf0IJAn9CAsJ/QjwCAsJ8Aj9COEI8AjhCOAI4AjfCPAIyAi/CLIIyAiyCLUIrAi1CLIIrAivCLUIIQckB9UGqwauBiEHqwYhB9UGrgapBtEGrgbRBiEHEgYTBnYFEwZwBj0FEwY9BXYFxgPIA5cDyANpA5cDtAEMApoBDAKdAZoBjQGKAZoBjQGaAZ0BUgFNAWgBUgFoAWABNgE5ARwBNgEcASoBOQErARwBCAEcASsBHAEZASoB9gD4AN0A+AD9AOsA+ADrAN0AwgDdAOsA3QDcAPYAzQDPAK4AzQCuAKwAzwDCALQAzwC0AK4AVABKADQADgAHAAYADgAVABEADgARAAcAtAGzAQoCtAEKAgwCOQIMAgoCGQofCiUKGQolCiEKHwonCiUKJgolCicKJQogCiEKHwoeCigKHwooCicKHgojCigKIgooCiMKKAomCicKFwoHCgwKFwoMChMKBwoCCgQKBwoECgwKAwoMCgQKDAoSChMKcwhxCAQIcwgECHUIcQh9CDoIcQg6CAQI/wcECDoIBAgICHUIqQawBiAHqQYgB9EGsAYfByAHdQZGBhIGEgZvBkUGJAcdB9AG0AarBiQHqwbVBiQHrwiXCJMIrwiTCK4Ilwh9CHEIlwhxCJMIcwiVCJMIcwiTCHEIlQizCK4IlQiuCJMIvQjICLMIyAi1CLMIrwiuCLMIrwizCLUIcAYTBkMGEwYSBkYGRgZDBhMGeAc1B3YHeAc0BzUHYwd2BzUHaAdnB0UHGAcFCF0HewdOBzwHPwd7BzwHPwd8B90HPwfdB3sHfAc/B1wHZweBB1wHeQcdB04Hewd5B04H1AjTCOII1AjDCMEI1AjBCNMIvwjRCNMIvwjTCMEI0QjhCOII0QjiCNMI2gi3CMoI2gjKCOUItwiaCMoItgjKCJoIygjYCOUI1AgACfIIAAkPCfIIAwnyCA8J3Qj6COkI+gj8COkI/AjrCOkI6wjfCOkIvQjPCMgIzwjfCMgI2gj3COcI2gjnCNwI9wj5COcI+gjnCPkI+gjdCNwI+gjcCOcIqQjWCPQIqggDCdYIAwn0CNYI4QjRCMgI4QjICOAI0Qi/CMgIyAjfCOAIhwFaAWoBhwFqAXUBXwF1AWoBXwGFAXUBhQFfAUYBhQFGAYsBbAF8AUYBfAGLAUYBkwGgAZ4BkwGeAY8BoAHLAZ4BogGVAZ4BlQGPAZ4BkwFyAYABkwGAAZEBcgFxAYABYAF+AYABYAGAAXEBfgGNAZEBfgGRAYABigFoAXgBaAF3AXgBdwGKAXgBdwFoAWcBZgF3AWcBdwGIAYoBggFkAVMBggFTAYMBbwGDAVMBbwGVAYMBjQF+AYoBfgFgAWgBfgFoAYoBTgEzATIBMAFDATIBRQFjAWIBYwFyAY8BYwGPAWIBbwFUAWIBbwFiAY8BQwEwARIBQwESAUYBLwFGARIBRQEtATsBRQE7AVYBKwFCAVYBKwFWATsBQgFSAVYBNgE+AUEBPgFNAUEBNQE+ATYBPgFLAU0BZAFJAVMBVAFTAUkBUgFCAUEBUgFBAU0BQgErATkBQgE5AUEBNgFBATkBegiABwEIgAdYBwEIfwcBCFgHfwcACAEIAAh/B+AHfwdWB+AHfgfgB1YHaAfoB4EHaAeBB2cH6AcICIEH6AdoB10H6AddB+cHBQjnB10H/wd8B+YH/wfmBwQIfAdcB+YHgQfmB1wHgQcICAQIgQcECOYHUAhMCPoHMwj6B0wIeQd7B9sH/Qf8B9sHngbNBhUHGAegBhUHygYnBokFygaJBVMGJgZTBokFnQZBBp8GnQY/BkEGQQaiBp8GsAZ3BnQGdwYSBkUGdwZFBnQGbwZ0BkUGbwamBnQGygbLBigGygYSB8sGzQaeBigGzQYoBssGqwZGBq4GdQapBq4GdQauBkYGqQZ1BrAGEgZ3BnUGdwawBnUG0AZwBnIG0AZyBqsGcAZDBnIGRgarBnIGRgZyBkMG+AcsCPcHLAhKCPcHjwSUBA0ERQQNBJQEYwhkCF0IYwhdCFwIVAhcCF0IrgHHAckBrgHJAbcBxwHkAeYBxwHmAckBPwJwAkECnQafBscGnQbHBpkGnwbOBg8HnwYPB8cGxwaXBpkG5AEaAh4C5AEeAuYBGgI/AkECGgJBAh4CpQGoAasBpQGrAakBqAGuAbcBqAG3AasBYQhjCFwIYQhcCFkIVAhSCFkIVAhZCFwIUghHCFkIzgY0BzEHzgYxBw8HNAdiBzEHTghVCFoITghKCFUIeAf4B9UH+Af3B9UH9QfVB/cH9QdIB9UHPwadBj4GnQaZBj4GlwZqBj4GlwY+BpkG7wcRCCAI7QcYCA4ICggYCO0HCgjrB/IHugMIBEEEugNBBL4DCAQ8BEEEOgQGBEEEBgS+A0EESQJkAkoCSQJ9Ao8CSQKPAmQCewJkAo8CewJLAkoCewJKAmQCEAIrAhUCKwJJAkoCSwItAisCSwIrAkoCLQIVAisC+AHyAQAC+AEAAvwBLQgTCPEH8QH1AdkB8QHZAdIB9QH/AeEB9QHhAdkB1AHNAdkB1AHZAeEBzQHCAdIBzQHSAdkBuwO0A5ADCAcBB8UGkQbFBgEHkQYBB/4GQgJFAiYCQgImAiECRQJaAikCRQIpAiYC/wH1ASYC/wEmAikC9QHxASEC9QEhAiYCwgHNAcUBwgHFAbsBzQHUAdcBzQHXAcUB1QHAAcUB1QHFAdcBwAG4AbsBwAG7AcUBMAgyCEkIMAgoCDIIKQgyCCgIXwcrB3EHKwdIB3EHRgguCEUILgglCBcILggXCEUIEwgtCEUIEwhFCBcIlAbFBk4GlAZOBlIGxQaRBkoGxQZKBk4GFQY5Bk4GFQZOBkoGOQbmBVIGOQZSBk4GwQMeBFYEjwQ1BGEEpQScBNMEwQMnBqAEmwQqBPUDmwT1A6UENQUrBfIEcAXNBJ0EggQvBBgEqQKmApsC1wLBA5gCFAOHAmwCFANsAqQCpAIEAxQDAQN5A3sDzAItA8QCzAJeA1oDzAJaAy0DVwMtA1oDVwPCAsQCVwPEAi0Duge/B8AHsQe8B7sHuAe7B7wHuAesB7EHuAexB7sHjQaPBuoGjQbqBg4HjwaRBv4Gjwb+BuoG6gb+Bl8H6gYsBw4HjQYOB8EGjQbBBokGDgcmB8EGDgcsB1IHDgdSByYH6QblBtsGKAcpB2sHewSBBHMEyQLLApMCyQKTApECywLNApQCywKUApMCcgJ0ApMCcgKTApQCdAJbApECdAKRApMCJAJRAlICJAIfAjICJAIyAlECxgXZBQcGxgUHBsIFqQNTA6wDqQNRA1MDVQODA1MDgwOwA6wDgwOsA1MDhQaCBlYGhQZWBlgGMAYyBlgGMAZYBlYGjQaJBmAGjQZgBlAGiQZcBmAGIgYgBmAGIgZgBlwGIAYeBlAGIAZQBmAG6AH3AfMB9wEQAhUCFQICAvcBAgLzAfcBDgIfAiQCJAISAg4CEgL8AQACEgIAAg4CzQSjBDoEPwQ6BKMEwgLAAowCeQJgAowCYAJ7AowCSwJNAi4CSwIuAi0CGAIVAi0CGAItAi4C6gHiAeUB4gHdAeUB6AHzAeUB6AHlAd0BIgYkBvoFIgb6BfcFJAYXBu4FJAbuBfoFfQV5BfoFfQX6Be4FeQVwBfcFeQX3BfoFBgS8A1wDBgRcA4cDvAOFA1wDVgNcA4UDXANXA4cDJgcJB8EGiAaJBsEGbAdrB1IHKgcmB1IHiQaIBl4GiQZeBlwGFwYkBl4GJAYiBlwGJAZcBl4GFQIYAgICAAL7AQIC+wHzAQICmAdtB24HaweHB4kHewfdB9sH/wf9B90H/wfdB3wH/QfbB90H/Qc8CD4I/Qf/BzoI/Qc6CDwIfQiCCDwIfQg8CDoIggiECD4Iggg+CDwIhAiCCKwIhAisCKEIggh9CJcIggiXCKwIrwisCJcIhAihCIoIoQisCLIIvwijCKEIvwihCLIIowiLCIoIowiKCKEIiwijCKUIiwilCHYIowi/CMEIowjBCKUIwwinCKUIwwilCMEIpwiNCHYIpwh2CKUIkQiqCIgIqgjWCIgIqQiICNYIqQiPCIgIiwhpCGYITAhQCGYIUAiLCGYIjwh+CIgIaAiICH4IWQhaCGwIWQhsCGoIWghpCGwI/Ac+CPoH/Af9Bz4IhAhQCD4IUAj6Bz4IwwjVCI4IwwiOCKcI1QiqCI4IkQiOCKoIjgiNCKcIjQiOCIYIjgiRCGgIjghoCIYIaAhtCIYIbQhqCI0IbQiNCIYIDggQCBEI+AHqAeUB+AHlAfIB8wH7AfIB8wHyAeUB+wEAAvIBKQglCC4IKQguCDIIRggyCC4IRghJCDIIuge4B7wHuge8B78HfQRvBGoERgRqBG8ERgQ/BKMERgSjBGoEwALHAngCwAJ4AowCxwLJApECxwKRAngCWwJ4ApECeAJ5AowCTQJPAjECTQIxAi4CTwIyAjECHwIcAjECHwIxAjICHAIYAi4CHAIuAjECwQXUBdUFwQWvBdQFvAOwA4UDsAODA4UDVQNWA4UDVQOFA4MD/wbrBuMG2Ab/BuMGawcqB1IHawcpByoHiAaHBmQGiAZkBl4GOAYtBmQGLQYXBl4GLQZeBmQGGAIcAgYCGAIGAgICHAIfAg4CHAIOAgYCAAIGAg4CAAICAgYCawdsB20HawdtB4cHjgeJB4cHjgeHB20HSQhGCEcITghHCEYIYwd5B9sHYwfbB9gH/Af6B9gH/AfYB9sH+gczCNgHQQY/BrUFQQa1BREGPwblBbUFtQXrBREGoAOPBHkDogalBhsHpQbQBhsHHQcbB9AGGwcZB6IGywHDARQCwwGdATwCPAJpAsMBaQIUAsMBGQcbBzcHGwcdBzcHHQdjBzcHTAhKCCwITAgsCDMI+AczCCwIQQYRBqUGEQZwBqUG0AalBnAGpQaiBkEG1QPTAwIE1QMCBAQE0wPPA/8D0wP/AwIEMgQCBP8DMgQ3BAQEMgQEBAIEaQI8AocChwKbAmkCaQhaCFUIaQhVCGYISghMCGYISghmCFUIjwhkCGMIjwhjCH4IYwhoCH4IaQiLCHYIaQh2CGwIjQhsCHYIjQhqCGwIaAhjCGEIaAhhCG0IWQhqCG0IWQhtCGEIowGCAYMBowGDAZQBlQGUAYMBlQGiAZQBywHfAb8BywG/AZ4B3wHkAccB3wHHAb8BrgGiAb8BrgG/AccBogGeAb8BVAFJAQoBVAEKAR8BSQFkAQoB+wAKAWQBSggtCPEHSgjxB/cH9Qf3B/EHDgRFBG0EVAgvCDAIMAhJCFQI5gHsAc8B5gHPAckB7AHxAdIB7AHSAc8BwgG9Ac8BwgHPAdIBvQG3AckBvQHJAc8BrgKhArsCDwcKB8cGCgcIB8UGlAaXBgoHlAYKB8UGlwbHBgoHQQJCAiECQQIhAh4C8QHsASEC7AHmAR4C7AEeAiECtwG9AbABtwGwAasBvQHCAbsBvQG7AbABuAGsAbABuAGwAbsBrAGpAasBrAGrAbABVAhJCFIIRwhSCEkITghGCEUILQhKCE4ILQhOCEUISAf1B3EHlwZpBmoGlwaUBlIGlwZSBmkG5gU8BmkG5gVpBlIGPAZqBmkG5gU5BgEGOQYVBgEG1gXoBQEG6AXmBQEGRQQMBIADgAMmA0UEWQhHCE4IWQhOCFoI9QbsBusG9QbrBvwG4QOuA98D3wMQBBIEEARGBEgEEARIBBIEEgThA98D2ASrBOEE2AR3BHgE2AR4BKsENwZmBmIGNwZiBjUGZgZ8BnoGZgZ6BmIGfgZaBmIGfgZiBnoGWgY1BmIG2AbjBtYG7AbjBusG4wbZBtYGgAfNBssGgAfLBlgHEgdYB8sGEgd/B1gHfwcSB5oGfweaBlYHEQdWB5oGNAfOBhkHNAcZBzUHGQc3BzUHNwdjBzUHpgZoB0UHpgZFBx8HaAdBB10HaAemBkEHGAddB0EHPAckByEH0QY/BzwH0QY8ByEHPwdDB1wHPwfRBiAHPwcgB0MHHwdFB0MHHwdDByAHRQdnB1wHRQdcB0MHHQc5B04HHQckBzkHJAc8BzkHPAdOBzkHNAd4B2IHeAfVB2IHSAdiB9UHXwf+BgEHXwcBBysHCAcrBwEHCAdIBysHXweEB+oGbgcsB4QHLAfqBoQHLAdTB1IHLAduB20HLAdtB1MHbAdSB1MHbAdTB20H/AbrBv8G/wYGB/wGKgcJBwwHJgcMBwkHJgcqBwwHHQd5B2MHSAcIBy8HSAcvB2IHCAcKBy8HDwcxBy8HDwcvBwoHMQdiBy8HggaFBrkGgga5BroG2wblBroG2wa6BrkG2wa5BtkGuQaFBtkGfgbZBoUG2Aa0BrcG2Aa3Bv8GtAZ8BoEGtAaBBrcGhwa+BrcGhwa3BoEGvgbfBv8Gvgb/BrcGKgcpBwUHKgcFBwYHKQcoBwUH/Ab5BvcG/Ab3BvUG6QbkBuUG3QblBuQG5QbdBroGgga6Bt0GBQbEBbsFwgUFBrsF5QPcA94DFgTmA94D5gMXBN4DTQTlA94DTQTeAxcEIgShBGsFIgRrBSQEnARXBGsFVwQkBGsFwQOgBJIDoQSSA6AEoQQiBJIDbQRFBJQEPARnBEEEPASZBJ0EPASdBGcEzQQ6BGcEzQRnBJ0EOgRBBGcEwQNjAx4EwAMeBGMDjwSgAzUEpQT1AyYExAPDA/UDxAP1A8YDwwMmBPUDKgTIA/UDxgP1A8gDGAQvBOoDGATqA+wDFwQWBIEEFwTmAxYEFQRzBIEEFQSBBBYEBgT9A7wDBgQ6BD8EBgQ/BP0DRgQQBOcDEATfA+cDsAPnA98DKgSbBGMEKgRjBDIEmwTJBGMEQwQMBA4ERQQOBAwERgRvBHAERgRwBEgEbwR4BHAEdwRwBHgEFwSBBIYEhgRNBBcEJwZWBIkFJwbBA1YEnwSJBVYEnASHBdMEPQXQBHYFPQWbBKUEPQWlBNAEpQTTBNAE0wSHBXYF0wR2BdAEoQT1BWsFoQSeBioGoQQqBvUFJwb+BaAEJwYoBv4FngahBP4Fngb+BSgGoQSgBP4FlQXlBeMFlQXjBbAFDwawBeMFmQTxBfQFmQT0BZ0E8QUeBiAG8QUgBvQFIgb3BfQFIgb0BSAG9wVwBZ0E9wWdBPQF2gSBBOIEewTiBIEEewTWBOIEfQVqBKMEfQWjBHkFzQR5BaMEzQRwBXkFqwR4BH0EqwR9BOUEfQSvBOUE8gS4BDgFhgSBBNoEgAMMBNcDgAPXAykD8QLeAvgC9ALxAvgC9ALvAvECBwP6AgwDJAOaA6ADdAMkA6ADygMsBI0ENQTKA40ENQSgA8oDLASKBI0EYQQ1BI0E+wQBBS0FAQU4BS0FSgVXBVsFRgVbBVIFRgVKBVsFwQROBToFOgW6BLwEvATBBDoFQwRmBDQEQwQOBGYENATXAwwEQwQ0BAwEwQM4A2MDwQPXApYCwQOWAjgD1gI4A5YC1gJjAzgDIgNuA0YDagM7A8gDagMUAzsDBAM7AxQDOwNpA8gDkANiA0MDkANDAxUD2QKVA2cD2QIiBMMD2QLDA5UDwQOSA5gCIgTZApID2QKYApIDeQMNBHsDeQOPBA0ERQQmA3sDRQR7Aw0EXgOLA4kDXgOJA1oDiwO6A74DiwO+A4kDBgSHA4kDBgSJA74DhwNXA1oDhwNaA4kDUQM3AzYDUQM2A1MDNwPNAssCNwPLAjYDyQJVAzYDyQI2A8sCVQNTAzYDVgMvA1wDwgJXAy8DwgIvA8ACVwNcAy8DVQMyA1YDVQPJAscCVQPHAjIDwAIvAzIDwAIyA8cCLwNWAzIDeQMBA3QDeQN0A6ADAQMYA3QDgAMpAw8DJgOAAw8DgQNPAykDoAOaA8oDgAIIA6oCTwMSAykDKQMSAw8DJgMPA3sDDwMOA3sDAQN7Aw4DBwN0AxgDdAMHAwwDDAMkA3QDIgO1AqkCIgOpAkEDNwLZAmcDNwJnA50CBAOdAmcD1wKYAlMC2QI3ApgCNwJTApgCPwKKAtMCPwLTAnACoQJwAtMCfQLMAsQCfQLEAo8CwgKMAo8CwgKPAsQCjAJ7Ao8C1wI1ApYC1wIHAjUCPwIXAmYCFAJpAmYCFAJmAhcCaQKbAmYCpAJrAmoCawI5AmoCOQKCAmoCggKkAmoChwI8AjkChwI5AmwCOQJrAmwCawKkAmwCRQJCAm4CRQKAAloCcgJWAnQCVgJSAlECMgJbAlYCMgJWAlECWwJ0AlYCSwJ7AmACSwJgAk0CWwJdAngCWwIyAk8CWwJPAl0CTQJgAl0CTQJdAk8CYAJ5AngCYAJ4Al0CbgJCAlcCQQJwAlcCQQJXAkICcAKhAlcCEgPrAu8CEgPuAusC8QLvAusC8QLrAu4CBwMYA/QCBwP0AvoCGAMBA/QCigKmArcCigK3ArkCkQaPBkwGkQZMBkoGjwaNBlAGjwZQBkwGHgYcBkwGHgZMBlAGHAYVBkoGHAZKBkwGFQYcBu8FHAYeBvEFHAbxBe8FmQQjBe8FmQTvBfEFIwWZBI4EjgSZBDwEjgQ8BIAEPAQvBIAELwSCBIAELwQ8BAgELwQIBOoDugPqAwgE7APqA2AD7ANgA7QD6gO6A4sD6gOLA2ADXgNgA4sDYANiA7QDYgNgA9sCYgPbAkMDYANeA8wCYAPMAtsC2wIVA0MDFQPbAqoC2wLMAn0C2wJ9AqoCgAKqAkcCgAJHAloCqgJ9AkkCqgJJAkcCWgJHAikCRwJJAisCRwIrAikCEAL/ASkCEAIpAisC/wHvAeEB/wEQAvcB/wH3Ae8B6AHbAe8B6AHvAfcB2wHUAeEB2wHhAe8B1AHbAdcB2wHoAd0B2wHdAdcB4gHVAdcB4gHXAd0BFQbvBdAFFQbQBQEG7wUjBdAF0AXWBQEGIwWOBLEEIwWxBNAFjgSABIIEjgSCBLEEugSRBGYEDgS8BLoEDgS6BGYEvAQOBMEEbQTBBA4EbQQ1BcEENQVtBCsFbQSUBCsFjwS7BCsFjwQrBZQEuwTyBCsF8gS7BGEE8gRhBLgEuwSPBGEEjQS4BGEEOAW4BIoEOAWKBC0FuASNBIoEvgT7BC0FvgQtBYoEAQVcBVcFWwVXBVwFyQSlBZMFyQSTBRAFwQQ1BUYFwQRGBU4F4QXmBbMFZwWTBZgFbgOkA54DbgOeA3cDpAPVA80DpAPNA54DngNyA3cDuwOQA5wDkANwA5wDKAOcA3ADsgRSBIUEHQRVBFIEHQRSBBoEVQSIBIUEVQSFBFIEAwO3ArUCZQVnBZgF1QMEBM0D/AMEBDcE/APNAwQErgK7AtECuwLcAtECswWaBUAFuwPvAxoE7wMdBBoEiwQ3BGQEYwWwBQ8GsAVlBZUFgQMpA6cDgQOnA30DKQPXA6cDuwOcA6cDuwOnA9cDnAMoA30DnAN9A6cD8QLcAuQC3AK7AuQC8QLkAt4CuwLiAt4CuwLeAuQCDAP6AugCAwMMA+gCmgMkA3EDSQNyA3EDLATKA/cDygPNA/cDzQP8A/cD/AMsBPcDigQsBIsE/AM3BCwENwSLBCwE+wS+BAEFWwVdBVkFZwVlBV0FZQVZBV0FWwVZBVIFZQWwBVIFZQVSBVkFsAVjBVIFOgVOBUwFTgVjBUwFQAVMBWMFQAU6BUwFQAUvBboEQAW6BDoFNARmBF4ENAReBCgEZgSRBF4EiARVBF4EiAReBJEEVQQdBCgEVQQoBF4E1wM0BPkDNAQoBPkDHQTvA/kDHQT5AygE7wO7A9cD7wPXA/kDIgNGA3cDIgN3A0kDRgNuA3cDcgNJA3cDKANwA00DgQN9A08DKANPA30DygOaA80DcgOeA5oDcgOaA3EDngPNA5oDTQMIAxwDHAMoA00DEgNPAx4DEgMeAxwDKAMcAx4DKAMeA08DJAMMAxsDJAMbA3EDAwNJAxsDAwMbAwwDSQNxAxsDIgNJA7UCSQMDA7UC3gLiAtMC3gLTArkC4gK7AtMC8QLuAtwC7gISAxwDHAPcAu4CCAOfAtECnwKuAtEC3AIcAwgD3AIIA9EC+gLeAugC3gLQAugC0AIDA+gCuQK3AtACAwPQArcC0ALeArkCLwVABZoFBAWyBLQEsgSFBLQEiAS2BLQEiAS0BIUEtgQvBQQFtgQEBbQELwW2BLoEtgSIBJEEtgSRBLoEvgSKBIsEZATJBMIEyQQQBQMFyQQDBcIEAQW+BMIEAQXCBAMFvgSLBGQEvgRkBMIEWwVcBV8FWwVfBV0FXAUBBV8FZwVfBQEFZwVdBV8FZwUBBRAFZwUQBZMFAQUDBRAFTgVSBWMFDwbhBY0F4QWzBUAF4QVABY0FQAVjBY0FYwUPBo0F/gIPAxIDEgPvAv4C9AIBAw4DDwP+Ag4D/gLvAvQC/gL0Ag4D9AL4AvsC+ALeAvsC+gL7At4C+gL0AvsCSgVIBTgFSAXyBDgFAQVXBTgFVwVKBTgFRgU1BfIERgXyBEQF8gRIBUQFSAVKBUYFSAVGBUQFRgVSBU8FTgVGBU8FTgVPBVIF6wWYBREGkwWlBZgFpQURBpgFzwPTA6ID0wPVA6QD0wOkA6IDbgOiA6QDbgPPA6IDtAOOA5ADYgOOA7QDYgOQA44DGAQaBLIEGgRSBLIEsgSCBBgEqQK1ArACtwKmArACtwKwArUCpgKpArAC5QWVBbUFlQVlBbUFmAXrBbUFmAW1BWUFzwMyBP8DzwPIAyoEzwMqBDIErgJuAlcCoQKuAlcCswXWBZoFswXmBegFswXoBdYFtAO7A+0DtAPtA+wDuwMaBO0DGgQYBOwDGgTsA+0DyQRkBGMENwQyBGQEMgRjBGQE5QU/Bj4G5QU+BuMFagYPBuMFagbjBT4GQQMUA2oDagNuA0EDbgMiA0EDFQNNA0sDcAOQA0sDcANLA00DkAMVA0sDCAO/AqoCTQMVA78CTQO/AggDFQOqAr8CqQKbAqwCqQKsAkEDmwKHAhQDmwIUA6wCFANBA6wCigK5AtMCuwKhAtMCCAOAAp8CgAJFAp8CbgKuAp8CbgKfAkUCigJmAqYCigI/AmYCmwKmAmYC0AUvBZAFmgXWBZAFmgWQBS8F1gXQBZAFggSyBLEEBAUvBbEEBAWxBLIELwXQBbEEyQSbBD0FPQXTBckEyQTTBaUFcAalBdMFcAbTBT0FDwY8BuEFDwZqBjwG5gXhBTwGggloCWYJggmECWgJ9ADyABUB9AAVARYBFgEXAfQAIgQkBMMDNwJVArMBNwKzAQkCVQI5ArMBBQh6CLoIBQi6CKAIvQigCM8IoAi6CN0IoAjdCM8I3QjpCM8I6QjfCM8I/Aj6CAkJIAkiCfwIIAn8CAkJIgkkCfwIJAkiCToJIgkgCU4JIglOCToJngYVByoGFQegBioGBQh7CDYIewiZCOgHewjoBzYI6AfnBzYI5wcFCDYIswGZAZcBswGaAZkBigGZAZoBigGIAZcBigGXAZkBZgFnAV0BZwFoAV0BTQFLAWYBTQFmAV0B9ADnANkAywDZAOcAvQC/ALMAvwCpALMAqQCWAL0AqQC9ALMAUQBSAC8ALwA6AFEACgANAAYACgAGAAMADQAOAAYABQACAAYAAgAAAAMAAgADAAYAnQKCAmgCOQJoAoICOQKdAmgCHgoXChsKHgobCiMKFwoTChsKEgobChMKGwoiCiMKgAfkB1oH5AcFCBgH5AcYB1oH/AjtCOsI/AjuCO0I3wjtCO4I3wjrCO0IZgFaAYcBZgGHAXcBhwGIAXcBNQEzAU4BNQFOAT4BTgFLAT4BeggFCOQHegjkB4AHGAdBB6AGpgagBkEHawWHBcsEhwWcBMsEnARrBcsEZwNpAzoDaQM7AzoDBAM6AzsDBANnAzoDFQfNBoAHgAdaBxUHWgcYBxUHJgQkBJwEJgScBKUEJARXBJwEKgZvBvIFKgbyBfUFbwaHBfIFhwVrBfUFhwX1BfIFwwPEA5UDxAOXA5UDaQOVA5cDaQNnA5UDBAOkAp0CggKdAqQC+gm8CdUJwAnbCcMJwAnYCdsJ2QnDCdsJmQmwCaoJsgnHCdIJxwkACtIJwAmvCagJwAmoCb4Jowm+CagJ0gnVCbkJ0gnTCdUJvAm5CdUJoAm8CaEJowmhCbwJswmrCawJswmsCbUJqwmkCawJsgnSCZwJnAnSCbkJvAmgCZwJvAmcCbkJgQllCXYJhAl7CYsJhAmLCW4JeQlsCW4JxwnECdAJxwmyCaoJxwmqCcQJsAnECaoJxAnPCdAJ6Am+CaMJvAn6CegJvAnoCaMJ2AnACc0JwAm+Cc0JvgnoCc0J+gniCfkJ+gnVCeIJ2AnuCdsJ2AnyCe4J7wnZCdsJ7wnbCe4JxwnfCQAK3wnsCQAK0gniCdMJ0gkACvEJ0gnxCeIJ4gnVCdMJhAmgCXsJoAmhCXsJZgmBCY8JsgmcCWYJsglmCY8JnAmCCWYJhAmCCZEJhAmRCaAJnAmgCZEJnAmRCYIJmQmqCY0JqgmyCY8JqgmPCY0JgQl2CY0JgQmNCY8Jiwl7CaEJowmoCZYJowmWCaEJqAmvCZgJqAmYCZYJeQluCZYJeQmWCZgJbgmLCaEJbgmhCZYJbAl5CXwJbAl8CXMJeQmHCXwJiAl0CXwJiAl8CYcJdAlzCXwJeQmYCZMJeQmTCYcJmAmvCaYJmAmmCZMJpAmTCaYJkwmICYcJrwmsCaYJrwnACbgJrwm4CawJrAmkCaYJwAnDCbUJwAm1CbgJwwnZCbMJwwmzCbUJtQmsCbgJYwliCXAJYwlwCXEJYglsCXMJYglzCXAJdAlwCXMJdAl+CXEJdAlxCXAJSwk0CTIJNAkcCRoJNAkaCTIJGQkyCRoJTwlgCToJTwloCYQJTwmECWAJhAlICWAJSAk6CWAJSAk9CTwJPQkkCTwJJAk6CTwJOglICTwJSwlYCVoJSwlaCU0JWAmBCWYJWAlmCVoJaAlcCVoJaAlaCWYJXAlOCU0JXAlNCVoJQwkwCT0JMAknCSQJMAkkCT0JTglcCV4JTgleCToJXAloCV4JaAlPCV4JTwk6CV4JRQkSCUQJEQlBCUQJEQlECRIJQwlVCVEJQwlRCUAJVQlsCVMJVQlTCVEJQQkqCVEJQQlRCVMJKgksCUAJKglACVEJFgkYCS4JFgkuCSwJGAknCTAJGAkwCS4JQwlACS4JQwkuCTAJQAksCS4J7AnfCd0J7AndCeoJ3wnHCdAJ3wnQCd0JzwndCdAJ3QnpCeoJ+QnoCecJ+gnnCegJ+gn5CecJ8gnYCc0J8gnNCfQJ6An5CfQJ6An0Cc0J4gkOCvkJHwr5CQ4KHwoOCh4K8gn+Ce4J8gkJCv4JCgr+CQkK/gnvCe4J7An4CQAK+AkCCgcK+AkHCgAKFwoACgcKAAoOCvEJAAoXCg4KHgoOChcKDgriCfEJpwCMAIoApwCKAJQAiQCUAIoAiQC4AJQAuACJAFgAuABYAKQAhwCkAFgAtADCALAA4AC1ALAArACbAL8AjACnAJYAtACTAJ0AtACdAK4AkwB+AJ0AmwCdAH4AmwCsAK4AmwCuAJ0AmwCpAL8AZwBQAE8AZwBPAFsATgBaAFsATgBbAE8AWgBOADYAWgA2AFgATABYADYAawBUAC8ALwBeAGsAegBRAHUAUABnAHUAUAB1AFEAbgBKAFQAbgBUAGAAVABrAGAAXgAvAFIAUQB6AF4AUQBeAFIAjABnAFsAjABbAIoAWgCKAFsAWgCJAIoAiQBaAFgATACHAFgAmwBeAHwAXgB6AHwAegCbAHwAqQB1AJYAqQB6AHUAZwCMAHUAjACWAHUAkwCAAH4AgABuAGAAgABgAH4AawBeAH4AawB+AGAAXgCbAH4AmwB6AHgAmwB4AKkAegCpAHgAEwAYAC0AEwAtAAoAGAATAAkAGAAJABYAHgA0AEEAQgApAEEACgAtACQALQAiACQAHgAVAA4AHgAOAB0ADgAcAB0AHAAOAA0ACgAkABwACgAcAA0AJAA8ABwASgBuAGIAbgBvAGIAbwBXAGIAbgCAAIEAbgCBAG8AgACTAIUAgACFAIEAgwCBAIUAkwCQAIUAkwC0AJ8AkwCfAJAAkQCQAJ8AkQCDAIUAkQCFAJAAtACwAKEAtAChAJ8AsAC1AKIAsACiAKEAogCRAKEAkQCfAKEASABKAGIAVwBIAGIAVwBVAEgAOgAtADcAGAA3AC0AGABOADcATgAYABYATgAWADYAIAA2ABYAPgAyACYAPgAmAC8AMgAcACYAHAA8ACYAPAAvACYAOgAvACIALwAkACIALQA6ACIANAAdAFQANAAeAB0AHAAyAB0AMgA+AFQAMgBUAB0APAAkAC8ANABGAEEANABKAEgANABIAEYAVQBGAEgAVQBCAEEAVQBBAEYA5QDJANQAyQC8ALoAyQC6ANQAuADGANQAuADUALoAxgDSANQA0gDGALYA0gC2AOEAxgC4ALYAtgDsAOEAwgDrAPoAwgD6ANAA6wD9APoA+wDgANAA+wDQAPoA3ADNAMsAzQC/AMsAvADJAMoAvADKAL0AyQDlANcAyQDXAMoAwgDPAN0AzQDcAN0AzQDdAM8AywC/AL0AvQDKAMsAygDXANkAygDZAMsAFwE1ATYBMAHuAP4A7gDtAP4AGQEGAQQBBgH2AOcABgHnAAQB9AAYAQQB9AAEAecAGAEZAQQBMAEyASQBMwEkATIBMwEVASQBDAH9APgADAH4AAgB9gAGAQgB9gAIAfgABgEZARwBBgEcAQgBFQEzATUBFQE1ARYBFwEWATUB+wD6AAoB/QAOAQoB/QAKAfoADgEfAQoBHwEOARABHwEQASIBDgH9AAwBDgEMARABCAEgARABCAEQAQwBIAEiARABLQFHASIBRwFUAR8BRwEfASIBIgEgAS0B0AfyB+sHsQezB8cHsQehB7MH6wfHB7MHEQgQCCAIKAggCBAIzAcRCO8HzAfTBxEIDggYCBwIyQftB9MHyQfSB+0HGAgKCBYIFggcCBgI6wcKCNIHCgjtB9IHyQfHB+sHyQfrB9IHCgjyBxYI0Af0B/IH9AcTCBYI9AcWCPIH8QcTCPQHMAgmCCgIIAgoCCYIKAgcCCkIHAgWCBcIHAgXCCUIFggTCBcIqQeaB5kH6wezB5oHswehB5kHsweZB5oHqAenB7YHvwe8B8EHvwfBB8MHvAexB8EHyQfDB8EHpwesB7gHpwedB6wHsQfHB8EHxwfJB8EHrAeqB6QHnQeqB6wHnQekB6oHsQesB6QHoQexB6QHbQeYB44HpAedB44HpAeOB5gHpweeB5AHDggcCBAIHAgoCBAI7QcOCNMHDggRCNMHzAfJB9MHHAglCCkIwAe/B8MHyQfMB8MHuge2B7gHpwe4B7YHiQeOB50HiQedB5AHpweQB50HXwdxB6kHXwepB4UHoQeLB5kHoQekB5gHoQeYB4sHiwepB5kHqQeLB4QHqQeEB4UHiweYB24HiwduB4QHhAdfB4UH0AfrB5oHqQfQB5oHqQfxB/QHqQf0B9AH8QepB5YHcQeWB6kHcQf1B/EHcQfxB5YHEwXHBN4ExwRqBH0FxwR9Bd4EfQWABd4EgAWEBd4ErwXSBQMG0gWEBYAFfQXuBdIFfQXSBYAF7gUXBgMG7gUDBtIFEwXeBCQF3gSEBSQF1gTqBOIE6gTaBOIE2gTqBO0EDgXaBO0ErwUDBtQFAwYXBi0GOAbcBQMGOAYDBi0G3AXVBdQF3AXUBQMG3AULBgwG3AUMBt0FCwY3BjUGCwY1BgwGWgYMBjUG2QUyBjAG2QUwBgcGwgUHBgUGBwYwBgUGcgWsBf4EcgWpBawFmwWpBXIFdAXJBW4FrgV7BZ8FrgUeBXsFewUhBRgF1gSbBXIF1gRyBRkFcgUbBRkFGwVyBf4EuwWpBcIFmwXGBakFxgXCBakFrgW+BZ0FxAWsBakFxAWpBbsF3QXJBcsFewUYBScF1gQZBeoEGwX+BOoEGwXqBBkF6gT+BAAF6gQABe0EDgUABf4EDgXtBAAFhAXSBaIFrwWiBdIF5QTwBAYF5QQGBasEBgX1BKsE9QToBOEE9QThBKsEEwUkBRgFewUnBSQFewUkBYQFJwUYBSQFrgWfBaIFrgWiBa8FnwV7BYQFnwWEBaIFnQW+BcEFnQXBBcsFvgWuBa8FvgWvBcEF6QbsBvIG7Ab1BvIG4QOyA64D4QMWBN4D4QPeA7ID3AOyA94D3AOrA64D3AOuA7IDSARLBBUESAQVBBIESwRzBBUEFgThAxUE4QMSBBUE2ATWBHsEewR3BNgEfgaFBloGhQZYBloGMgZaBlgG7AbZBuMG7AbpBtsG7AbbBtkGfgZ6BrIGfgayBtkGegZ8BrQGega0BrIG2AbWBrIG2AayBrQG1gbZBrIG6QbyBvEG8gb1BvcG8gb3BvEGdwR7BHMEcwRLBHcESwRIBHAESwRwBHcEmwVuBcYFbgXJBcYF1gTYBOgE2AThBOgEWgbbBQwGWgYyBtkFWgbZBdsF2wXdBQwGbgWbBdYEbgXoBHQF3QXbBc8F2wXZBcYF2wXGBc8FxgXJBd0FxgXdBc8F6ARuBfcEbgXWBPcE1gToBPcEaweJB5IHkAeSB4kHwAfDB8QHzAfEB8MHkweSB54HkgeQB54HpweoB54HfQR4BG8E1QXcBd0FhwaBBmgGhwZoBmQGgQZ8BmYGgQZmBmgGNwY4BmgGNwZoBmYGOAZkBmgGhwaIBsEGhwbBBr4GCQffBr4GCQe+BsEGsAP9A+cDsAO8A/0DPwRGBP0DRgTnA/0DfQRqBMcEfQTHBK8EEwXdBK8EEwWvBMcE3QTlBK8EOAY3BgsGOAYLBtwFrgWdBR4FnQXJBXQFdAUeBZ0FBgULBfUEGAUhBQsFIQX1BAsFewUeBSEF6AT1BB4F6AQeBXQF9QQhBR4F5QTdBAcF5QQHBfAE3QQTBQcFEwXwBAcF8AQTBRgFGAULBfAECwUGBfAEwQXVBcsF1QXdBcsFyQWdBcsFsAPfA6wD3wOuA6wDqwOsA64DqwOpA6wD/wbfBgYH3wYqBwYH/Ab7BvkG/AYGBwUH/AYFB/sGKgffBgkHaQlqCYkJFQkTCT4JFQk+CSsJEwkQCSkJEwkpCT4JJgkNCRcJJgnxCP4IJgn+CA0J/wgNCf4I/wgVCRcJ/wgXCQ0JfwiJCGUIiQiDCFcIiQhXCGUIeAjhBzQIeQg0COEHNgJ0AQgChgEIAnQBawExAV4BPQFlAV4BPQFeATEBAgEDAScBAgHzAAMB/wj+COMI0Aj+CPEI/wDiAOMA/wDjAO8A4gDTAOMA1QDjANMA1QDxAO8A1QDvAOMAtwCxALkAtwClALEApgCxAKUApgC7ALkApgC5ALEATQArAEMAOABDACsAiAl1CX4JiAl9CXUJCAoKChQKCAoUChAKCgoVChQKIAoUChUKIAoYChAKIAoQChQKAQoDCvUJAQr1CfcJAwr2CfUJ6Qn1CfYJ6QnrCfcJ6Qn3CfUJZAllCTIJMglJCWQJSQlKCVcJSQlXCWQJ1wjZCPYI1wj2CNgIAQkCCRAJEAkTCQEJEwkVCf8IEwn/CAEJywi2CJsItgh4CJsImwYlBooFJQYmBokFnwQlBokFvwPAA2MDiwFsAbEBbAE2ArEBhAGOAW4BjgGSAYEBEgERAS8BEQETAS8BbgFXATwBVwFYAUQBTwFrAVABwgjECOMIAgnkCMQIAgnECMUI5AjjCMQIGwkZCQQJ9QjYCBkJ2Aj2CAQJ2AgECRkJ/wDsAOIA0QDiAOwA4ADfAMMA3wDeAMMAtwDEAIcAbwBwAGMAbwBjAFcASwBMADYANgAgAEsAIABNAEsAFAA1ACgAFAARACkAFAApADUAEgAIAAEAEgABAAsACAAJAAEAeAi2CN8HdwfWB9kH1gcrCPkH1gf5B9kH+QfXB9kH6gUCBukFdwi8CDUIvAifCDUI6gjOCOwIywM/A2wDywNsA50DdQOdA2wDdQPRA50DuQGfARMCuQGMAZABuQGQAZ8BkgGfAZABkgHKARMCkgETAp8BbQFRAVUBbQFVAXABWAFwAVUBWAGBAXABOgEdASMBOgEjASwBIwFEASwBFAduBqMGbgYrBqMGEAcRB5oGEAebBskGoQbMBjMHoQYzBxYHCwoYCh0KaglHCW0Jagk5CUcJCgn7CO8ICgklCSMJ7wjOCN4IvAh3CHQIvAh0CLEIcgiUCHQIlAixCHQIdwg3CDgIdwg4CHQINwgHCDgIOAhyCHQIHAesBiMHowaGBUQGGgEpASgBGgEoAQMBKQE3ASgB2wDoAPUA2wD1ANoAqwDMAMAABAAFAAYAgAlXCXcJBgg1CAIIhgGWAbIBlgG1AbIBZQE9AUoBZQFKAVsB8QAAARQB8QAUAe8AEwH/ABQB/wDvABQB8QDVANYAuwCmAJUAuwCVAL4AqAC+AJUAOAAsADkAIARkAyEECwABAAwAAAACAAEAAgAMAAEAhgFUAggCVAJ6AggCNgIIAnoCeQieCDQIngi4CDQIywibCDQIywg0CLgImwh4CDQIngjMCNsIngjbCLgI2QjLCNsIywi4CNsI6AgICQYJ6AgGCfgICAkfCR0JCAkdCQYJGwkECQYJGwkGCR0JBAn2CPgIBAn4CAYJHwk3CTUJHwk1CR0JNwlMCTUJSgkzCTUJSgk1CUwJMwkbCR0JMwkdCTUJNAI1AgcCsQE0AgcCsQE2AjQCVAI4An8COAJnAn8CfwKZAlQCiQI+AhkCygHeAT4C3gHjARkC3gEZAj4CEQI7AgsCCwK5ARECNgJ6AncCmQJ6AlQCrQGmAaEBrQGhAacBowGlAacBowGnAaEBbgFIAXMBZAFzAUgBawlSCSgJawkoCWEJUgkpCSgJRQljCSgJYwlhCSgJEAkCCfMI9AgSCfMIAgnGCPMIqQj0CPMIqQjzCMYIGAoLCvMJGArzCRAK/wkIChAK/wkQCvMJbQlHCVYJRwlGCVYJQglUCVYJQglWCUYJVAlrCVYJJQkKCQwJCgnvCAwJ8QgmCQwJJgklCQwJ0AjxCO8I0AjvCN4I8QgMCe8ItAiYCLAIqwi0CLAIqwi+CMkIqwjJCLQIHgeoBq0GHgetBtMGqgbUBtMGqgbTBq0G1AYiB9MGRAaGBfgFygT4BYYFygQYBvgFxwOWA8sDtQGbAZwBtQGcAQsCjAG5AZwBjAGcAZsBuQELApwBaQFZAXoBUQFtAVkBUQFZAUwBbQF6AVkBNwEpARsBNwEbATgBKQEaARsBHQE6ARsBOgE4ARsB6ADpAPcA6ADbAOkA3gDqAOkA6gD8APcA6gD3AOkAzACrAK0AzACtAMEAowDeAMEAowDBAK0APwBFAD0ARQBJAD0ADwAEABAABAAGAAcAEQAUAAQAEQAEAAcAFAAQAAQAOgI4AgsCOgILAjsCOAK1AQsCGAogCiQKGAokCh0KIAolCiQKJgokCiUKJgodCiQKHQomCikKHQopChoKJgooCikKIgopCigKIgoaCikKDwoSCg0KDwoNCgYKEgoMCg0KAwoNCgwKAwoBCgYKAwoGCg0Kcgg4CAMIcggDCHAIOAgHCAMI3gc5CAMIOQh8CHAIOQhwCAMIIwesBtIGrAavBtIGqAYeB9IGqAbSBq8GRAYaBhkGGgZIBhkGpwbUBqoGpwY2ByIHpwYiB9QGmAitCJIImAiSCJYIrQiUCJIIcghwCJIIcgiSCJQIcAh8CJYIcAiWCJIIvAixCMcIsQiUCK0ImAi0CLEImAixCK0ItAjJCMcItAjHCLEIGAZCBkcGGAZHBvgFGgZEBvgFGgb4BUcGfQd+B1YHdwfZB0oHTQfZB2QHTQdKB9kHXgc3CEQHNwhmB0QHVwdVB3oHVQdUB3oHIwdbB14HdAd6B1QHVAdLB3QH4wj+CNII/gjQCNIIvgjACNIIvgjSCNAIwAjCCOMIwAjjCNII2QjXCMsI1wjYCMoItgjXCMoItgjLCNcIAgkBCeQIAQn/COMIAQnjCOQIzAj7COgIvAjHCN4IvAjeCM4I2QjbCOYI2QjmCPYI2wjMCOgI2wjoCOYI6Aj4COYI+Aj2COYIxggCCcUI0AjeCMkI3gjHCMkIyQi+CNAIhgF0AWUBdAE2AnsBawFeAXQBawF0AXsBXgFlAXQBNgJsAXsBbAGLAXwBUAFrAXsBUAF7AWwBkgGOAaQBjgGEAaQBpgGkAYQBpAHKAZIBkgGQAX8BkgF/AYEBkAGMAX0BkAF9AX8BbQFwAX8BbQF/AX0BcAGBAX8BmwGJAXYBmwF2AXkBWwFpAXkBWwF5AXYBcwGEAW4BcwFkAYIBjAGbAXoBjAF6AX0BmwF5AXoBaQF6AXkBegFtAX0BEwExAWsBMQElAT0BWAFXAWEBVwFuAWEBbgGOAWEBjgGBAVgBjgFYAWEBTwFQAUYBLwFPAUYBLwETAWsBLwFrAU8BWAFVAUQBOgEsAVUBOgFVAVEBLAFEAVUBTAE/AUABNwFAAT8BTAFKAT8BNAE3AT8BSAFuATwBPAFkAUgBUQFMAUABNwE4AUABOAE6AVEBOAFRAUABeQjhB+IHOgc7B+EHOgfhB3gIOwdZB+IHOwfiB+EHfgd9B98HfgffB+AHfQc6B3gIfQd4CN8HBwg3COkHNwheB+kHZgc3CAYI3gcDCOUHAwgHCOkHAwjpB+UHXgdbB+UHXgflB+kHWwdXB94HWwfeB+UH+QdXCPsH+QdLCFcI/gfaB/sH2gd6B3QHKQYUBz0HEAeaBlMGJgYlBhAHJgYQB1MGJQabBhAHzAahBpwGAgZABpwGAgacBqEGrwasBnMGrwZzBnYGrAYcB6MGrAajBnMGowZEBnMGRAYZBnYGRAZ2BnMGmwZsBhMHmwYTB8kGbAYpBj0HbAY9BxMHqgatBkgGqgZIBkcGrQaoBkgGGgZHBkgGqAavBngGqAZ4BkgGrwZ2BngGGQZIBngGGQZ4BnYGpwaqBnEGpwZxBhgGqgZHBnEGQgZxBkcGQgYYBnEGKwj2Bx0IQwgrCB0IawQ+BAsEVAhdCFsIVAhbCFMIXQhkCFsIrQG2AcgBrQHIAcYB6QHjAcYB6QHGAcgBiQJAAlgCnAaYBsgGnAbIBswGmAaWBsgGDQfIBpYGDQczB8wGDQfMBsgG4wHpAR0C4wEdAhkC6QEgAh0CQAIdAiACQAKJAhkCQAIZAh0CpQGpAaoBpQGqAacBqQGvAaoBtgGqAa8BtgGtAacBtgGnAaoBXghICFMIUwhbCF4IWwhiCGAIWwhgCF4IMwcNBzAHSQdKBzMHSQczBzAHQwhECFEITQhWCFEITQhRCEQIdwdzB9YH9gdzB3IH9gcrCNYH9gfWB3MHlgaYBmsGlgZrBj0GmAacBkAGmAZABmsG7wcgCO4H7AcMCAkIDAgLCAkIuQO9AwoEuQMKBAcEvQO4AwoEZQRABAoEZQQKBLgDQAQ7BAcEQAQHBAoESAJ8AmICSAJMAmMCSAJjAnwCjQJ8AmMCfAKVAmICDwIsAioCDwIWAiwCTAJIAiwCSAIqAiwC+AH8AQEC+AEBAvkBQAiVBxII8AcSCJUHLwgnCDAIJwgmCDAI8AHRAdgB8AHYAfQB0QHBAcwB0QHMAdgB0wHgAdgB0wHYAcwB4AH+AfQB4AH0AdgBbQOPA28DjwO1A7cDBweSBsQGkAbDBsQGkAbEBpIGwwb9BsQGQwIjAiUCQwIlAkQCIwLwAfQBIwL0ASUC/gEnAiUC/gElAvQBJwJGAkQCJwJEAiUCwQG6AcQBwQHEAcwBugG4AcABugHAAcQB1QHQAcQB1QHEAcAB0AHTAcwB0AHMAcQBQggxCC8IMQgnCC8IcAdHB2AHRgdgB0cHQQg/CCoIPwhACBIIEggkCD8IJAghCCoIJAgqCD8IkwZRBk0GkwZNBpIGUQY6Bg4GUQYOBk0GFAZJBk0GFAZNBg4GSQaQBpIGSQaSBk0GngSfBFYEHgQfBJ4EHgSeBFYEHwQgBJ4EOAQ+BGAEJQSkBMwEJQRZBKQEIAT9BYoFzwSkBFkEJQTPBFkEJQQpBJoEJQSaBM8ENAU2BSoFbwVpBaIEaQU+BZgEfgRQBE8E1QLWApYClgJ2AtUCdgJ3AtUCgwKBAqcChAKFAqMCZgNlA9oCdwLYAmQDPgMKA6MChQI+A6MChQKGAhMDhQITAz4DNAPDAlkDwwLBAiwDwwIsA1kDhgNZAywDWQNdAzQDwAfCB7oHvQe3B7QHsAeuB7cH/QbDBjIHwwaQBo4GwwaOBjIHjAbCBjIHjAYyB44GwgbmBjIHRgf9BjIHjAaLBsAGjAbABsIGiwaKBsAG4AbmBsIG4AbCBsAGJQfmBuAG6AbcBu4GUQcnBygHKAdrB1EHegRMBHUEyAKQApICyAKSAsoCkAJ1AnMCkAJzApICcgKUApICcgKSAnMClALNAsoClALKApICUAIiAjMCJAJSAjMCJAIzAiIC1wUJBsUFqQOqA1IDqgOvA4IDqgOCA1IDVANSA4IDUgNRA6kDhAZXBlQGhAZUBoMGVwYxBi8GVwYvBlQGjAZPBl8GjAZfBosGTwYdBh8GTwYfBl8GIQZbBl8GIQZfBh8GWwaKBosGWwaLBl8G5wH9AfYB5wH6Af0BFgIPAv0BDwL2Af0BAQL8AQ0C/AESAg0CJAIiAg0CJAINAhICogRlBGgEZQQ5BGgEwQKNAsUCiwKNAmECiwLFAo0CTAIsAi8CLAIWAi8CLwJOAkwC6gHtAeIB7QH6AecB5wHcAe0B3AHiAe0BIQb2BfkFIQb5BSMG9gVvBXgF9gV4BfkFfAXtBfkFfAX5BXgF7QUWBiMG7QUjBvkFuAOGA1sDuANbA7MDWAOEA1sDhAOzA1sD4AbABt4Giga/BsAGvwbeBsAGUAclB+AGigZbBl0GWwYhBiMGWwYjBl0GFgZdBiMGFgL9AQMC/QH6AQMCAQIDAvoBlweDB2kHhgdpB2oHegfaB9wH2gf+B9wH3gfcB/4H3gdXB3oH3gd6B9wH/gc9CDsIPQiDCIEIPQiBCDsIfAg5CDsIfAg7CIEIOQjeB/4HOQj+BzsIgwiwCJgIgwiYCIEIlgh8CIEIlgiBCJgIgwiJCKIIgwiiCLAIiQh/CKIIvgirCKIIqwiwCKIIfwiMCKQIfwikCKIIjAiACKYIjAimCKQIwgjACKQIwgikCKYIwAi+CKIIwAiiCKQIhwiPCKkIqQjGCIcIxgjFCJAIxgiQCIcIfwhlCF8IZQhXCEsISwhYCGUIWAhfCGUIjwiHCG4IhwiQCG4IXghvCGsIXghrCFYIXwhWCGsI+wdXCD0Igwg9CFcIPQj+B/sHwgimCKgIwgioCMQIpgiACIUIpgiFCKgIkAioCIUIkAjFCMQIkAjECKgIgAhvCGcIgAhnCIUIkAiFCGcIDwgZCA0I+QEBAvoB+gHtAfkB7QHqAfgB7QH4AfkBMQhCCEEIQQgqCDEIuQe6B74HpgRoBG4EpgRuBHwEaAQ5BEQEaAREBG4ExQKLAsYCdQKQAosCkALIAsYCkALGAosCTgIvAjACLwIWAhsCLwIbAjACIgJQAjACIgIwAhsCUAJOAjACswOEA68DVAOCA4QDVAOEA1gDggOvA4QD1wbhBucG4QbvBucGaQdQBycHaQcnB2oHUQdqBycHigZdBmMGigZjBoYGXQYWBiwGXQYsBmMGLgZjBiwGFgIDAgUCFgIFAhsCAwIBAgUCAQINAgUCDQIiAhsCDQIbAgUCaQeGB40HQghICEEITQhICE8ITQhBCEgI2QfXB3UH1wf5B/sH+wfaB9cH2gd0B3UH2gd1B9cHAgbqBeQFAgbkBUAG0ANzA6UDeAMLBKUDeAOlA3MDoQYWBxoHoQYaB6QGNgenBhoHpwakBhoHygE+Aj0CygE9AhMCEQITAj0CEQK5ARMCFgc4BxoHOAdNB0wHSwc2BzgHSwc4B0wHNgcaBzgHKwhLCPkHKwhDCEsIAgahBqQGpwYYBqQGGAYCBqQG1AMDBAEE1AMBBNIDAwQzBDYEAwQ2BAEEMQT+AwEEMQQBBDYE/gPRA9ID/gPSAwEEPQKBAoMChgI9AoMChgIRAj0CQwhRCFgIQwhYCEsIUQhWCF8IUQhfCFgIYghbCG4IYghuCJAIWwhkCI8IWwiPCG4IgAiMCGsIgAhrCG8IjAh/CF8IjAhfCGsIXghgCGcIXghnCG8IYAhiCJAIYAiQCGcIoQGmAYQBhAFzAaEBcwGCAaMBcwGjAaEBygGkAb4BygG+Ad4BpAGmAb4BrQHGAb4BrQG+AaYBxgHjAd4BxgHeAb4BPAEeAS4B+wBkAS4BZAE8AS4BQwgdCEAIlQcdCPYHlQdACB0IlwTZA0IEVAhTCC8IQggvCFMI6QHIAc4B6QHOAesByAG2AbwByAG8Ac4BwQHRAc4BwQHOAbwB0QHwAesB0QHrAc4BoAK4AroCDQeWBsYGlgaVBsYGkwaSBsYGkwbGBpUGkgYHB8YGQAIgAkMCIALpAesB8AEjAiAC8AEgAusBIwJDAiACtgGvAbwBrwGpAawBuAG6Aa8BuAGvAawBugHBAbwBugG8Aa8BQghTCEgIcgdJB3AHRAhDCEAIQAg/CEQIPwhBCE0IPwhNCEQIcAeVB/YHcAf2B3IHlgY9BjsGlgY7BpUGOgZRBjsGUQaTBpUGUQaVBjsGOgbnBQ4GpAUABg4GpAUOBucFAAYUBg4G2QN+A9sDfgPaA9sDTQhPCFYITwhICF4ITwheCFYI7wbwBvMGqwOxA60D4AOtA7ED4AMRBA8ESQRHBA8ESQQPBBEEeQRsBKkEeQSpBNsEqQTgBNsENgY0BmEGNgZhBmUGNAYzBmEGfQZ5BmEGfQZhBjMGeQZ7BmUGeQZlBmEG1wbiBuEG7wbhBuIGWQc7Bz0HyQYTBzsHyQY7BzoHEwc9BzsHOgd9BxEHfQdWBxEHEAfJBjoHEAc6BxEHSgdNBzMHFgdNBzgHFgczB00HXgdEByMHHAcjB0QHRAdmBxcHZgdABxcHFwccB0QHVQdXBz4HHgfTBlUHHgdVBz4H0wYiB1UHVwdbB0IHVwdCBz4HWwcjB0IHIwfSBkIH0gYeBz4H0gY+B0IHSwdUByIHSwciBzYHVAdVByIHSgdJB2EHSQdyB2EHcgdzB2EHcwd3B0oHcwdKB2EHRgdHB/0GRwdwBy0HBwfEBkcHBwdHBy0HxAb9BkcHgwdvBzIHgwcyB+YGbwdGBzIH5gYlB08HJQdQB08HaQdPB1AHaQeDB+YGaQfmBk8H8wYDBwIH5wbzBgIH5wbvBvMGUAfgBgsH4AbeBgsHTAdNB2QH2Qd1B0wH2QdMB2QHdQd0B0sHdQdLB0wHcAcuBy0HcAdJBzAHcAcwBy4HDQfGBi4HDQcuBzAHxgYHBy0HxgYtBy4H6Aa4BrsG6Aa7BtwGuAaEBoMGuAaDBrsG6AbaBrUG6Aa1BrgG2gbiBrUGfQZ/BrUGfwaEBrgGfwa4BrUG1wbnBrYG1wa2BrMG5wbeBr0G5wa9BrYGhgaABrYGhga2Br0GgAZ7BrMGgAazBrYGJwcDBwQHJwcEBygHBQcoBwQH+AbzBvYG8wb0BvYG9wb2BvQG9wb5BvgG9wb4BvYG3QbkBtwG5AbpBu4G5AbuBtwG3Aa7BrwG3Aa8Bt0GuwaDBrwGggbdBrwGgga8BoMGgwZUBlUGVAYvBlUGMAZWBlUGMAZVBi8GVgaCBoMGVgaDBlUGBQa8BcMFwwXEBQUG5APdA+ID3QPcA+UD3QPlA+ID5QNOBOID5QNNBE4EzAR+BSMEfgWIBcIDfgXCAyMEiAX9BSEEiAUhBMID/QUgBCEEawTZA5cElwSTBGsEkwQ+BGsEogRpBUAEogRABGUEaQWYBDsEaQU7BEAEHwQeBMADwAO/Ax8EvwNkAyAEvwMgBB8EPgQ4BAkEPgQJBAsE0AOlAwkE0AMJBDgEpQMLBAkEJQTyA/MDxwPzA/IDxwPLAyUExwMlBPMDywMpBCUEtgNPBFAEtgNQBOkDUATrA+kD6wO1A+kDTgR1BOQDTgTkA+IDdQRMBBQEdQQUBOQDOQQFBOgDOQRlBLgDOQS4AwUEuAOzAwUEswPoAwUERwREBPEDRwTxAw8ErwPgA/ED4AMPBPEDKQQxBJoElQTIBDEElQQxBGIEyASaBDEEQgTbA9oDQgTZA9sDRwRJBHEERwRxBHIEbAR5BHEEeQRyBHEETgR0BHUETgRNBIYETgSGBHQEhgR1BHQEigUlBtQEJQafBNQEnwSeBNQEngQgBIoFngSKBdQEhgV1Bc4EhgXOBNIEpATSBM4EygSGBc8EhgXSBM8EpATPBNIEzwSaBMoEiAV+BfsFiAX7BfwF+wUpBvwF/QWIBfwFKQZsBv0FKQb9BfwFbAabBooFbAaKBf0F3wXiBZQF4gXkBbIFPgVpBfMFPgXzBfAFaQVvBfYFaQX2BfMFIQYfBvMFIQbzBfYFHwYdBvAFHwbwBfMF2QT5BKgE2QSoBKcEegR1BKcEegSnBKgEfAV4BdEEfAXRBNUEeAVvBaIEeAWiBNEEogRoBNEEaASmBNUEaATVBNEE2wStBKwEfASsBK0EfAR5BNsEfATbBKwENgU3BfMENgXzBCoF9ATzBDcFMgU0BcMEMgXuBCkFhgTaBKoE2gQOBaoE2QSnBKoEpwR1BIYEpwSGBKoE2APaA34DfwPYA34DfwOmA9gD/wL2AvAC/wIAA/YC8wL3AvYC8wL2AgAD9wLlAvYCBgPnAvkCBgMLA+kCBgPpAucCIwMGA3MD0AMjA3MD0AOYA0UD0ANFAyMDyQPQAzgEyQM4BPoDOAQwBPoDMAQ4BGAEWwQwBGAE+gT0BDcFNwU7BfoEOwX9BPoESQVVBVoFSQVHBVUFRQVRBVUFRQVVBUcFUQVTBVUFTQVBBUIFMgUzBUIFMgVCBUEFMwUyBSkF7gQzBSkF7gQsBTMFkASWBEIEkARCBGkEQgQ9BGkEPQRCBNoD2AM9BNoDZAO/A9YCvwNjA9YC1QJ3AmQD1QJkA9YCdQNAA0QDIQNEA0ADlgM8Az0DCgM9AzwDPwPLAz4DywOWAz0DywM9Az4DCgM+Az0DPgMTAz8DQgNhA2sDbQNCA2sDbQMgA0IDZQNmA5QDZQOUA5MDxwOUA2YDlAPCA5MD2AJlA5MDwgMhBNgCwgPYApMDIQRkA9gCeAN6A6gDeAOoAwsEegMQA34DegN+A6gD2QNrBKgD2QOoA34DawQLBKgDXQNZA4gDXQOIA4oDWQOGA4gDuAO9A4gDuAOIA4YDvQO5A4oDvQOKA4gDUQNSAzUDUQM1AzcDUgNUAzMDUgMzAzUDyALKAjUDyAI1AzMDygLNAjcDygI3AzUDWANbAy4DWAMuAzADWwOGAywDWwMsAy4DwQLFAi4DwQIuAywDxQIwAy4DVANYAzEDVAMxAzMDWAMwAzEDxQLGAjEDxQIxAzADxgLIAjMDxgIzAzEDfgMQA38DpgN/A1ADfwNOA1ADTgMrA1AD0APJA5gDbQO+Ap4CbQOeAiADvgKoAp4CKwNOAx0DEQMrAx0DEQMfAysDfwMQA04DEAMRAx0DEAMdA04DEAN6Aw0DegN4Aw0DeANzAwkDcwMGAxkDcwMZAwkDBgMJAxkDIwMLAwYDIQO0Ar0CgwKyAr0CgwK9ArQCmQJ/AtoCfwKaAtoC2gJlA5kCdwJ6ApcCegKZApcCZQPYApcCZQOXApkC2AJ3ApcCiQJYAqICogLUAokClQJ8Ao4CfAKNAo4CwQLDAo4CwQKOAo0CwwI0A5UCwwKVAo4CdgKWAjUCNQI0AnYCNAI2AncCNAJ3AnYCZQKBAj0CPgJlAj0CPgKJAmUCOgI7AoUCOgKFAoQCOwIRAoYCOwKGAoUCRgJxAkQCRgKoAnECbQJDAkQCbQJEAnECcgJzAlkCcgJZAlYCcwJ1AlkCUAIzAlkCUAJZAnUCMwJSAlYCMwJWAlkCiwJhAl8CYQKNAmMCTAJhAmMCTAJOAl8CTAJfAmECdQKLAlwCiwJfAlwCTgJcAl8CTgJQAnUCTgJ1AlwCQAJDAm8CQAJvAlgCQwJtAm8CEQP8AuoC/AL/AvAC/ALwAuoC8ALsAuoC7AIRA+oCuAKgAq0CoAKIAq0CqAKzAq0CqAKtAogCBgP5AvUCBgP1AgkD8wL1AvkC8wJ4AwkD8wIJA/UCtgKBAqUC1AK2AqUC1ALPArYCkAZJBksGkAZLBo4GSQYUBhsGSQYbBksGHQZPBksGHQZLBhsGTwaMBo4GTwaOBksGFAbsBRsG7AUiBTAFPgXwBewFPgXsBTAF8AUdBhsG8AUbBuwFIgXFBDAFIgV/BMUEmAQ+BTAFmAQwBcUEfwR+BFMEfwRTBMUEfgRPBC4EfgQuBFMEOwRTBC4EOwSYBMUEOwTFBFMETwS2A/QDTwT0Ay4EuQMHBPQDuQP0A7YDBwQ7BC4EBwQuBPQD6QONA4wD6QOMA7YDjQNhA18DjQNfA4wDXQOKA4wDXQOMA18DigO5A7YDigO2A4wDYQNCAzkDYQM5A18DQgMgAzkDNANdA18DNANfAzkDIAOeAn4CIAN+AjkDngKoAn4ClQI0AzkDlQI5A34CqAJGAl4CqAJeAn4CSAJiAl4CYgKVAn4CYgJ+Al4CRgInAigCRgIoAl4CJwL+AQQCJwIEAigCDwIqAigCDwIoAgQCKgJIAl4CKgJeAigC/gHgAe4B/gHuAQQC4AHTAdoB4AHaAe4B5wH2Ae4B5wHuAdoB9gEPAgQC9gEEAu4B0wHQAdYB0wHWAdoB0AHVAdYB4gHcAdYB4gHWAdUB3AHnAdoB3AHaAdYBFAYABuwFAAakBY8FEQUABo8FEQUiBewFEQXsBQAGIgURBbAEfgSwBBEFfgR/BCIFfgQiBbAElgSQBO4EkAS5BO4E7gQyBcAE7gTABJYEMgXDBMAElwRCBMAElwTABMMEQgSWBMAEwwQ0BZMENAUqBZMEPgSTBCoFkwSXBMMEKgXzBLcE8wT0BLcEWwRgBLcEWwS3BPQEYAQ+BCoFYAQqBbcE+gS9BPQEiQRbBPQEiQT0BL0ElQSSBAgFkgTEBAgFNwVUBVYFNwVWBTsFVAVJBVoFVAVaBVYFkgUCBpEFFgUIBZEFMgVBBUMFRQVDBUEFRQU0BTIFRQUyBUMFlgU6BuAFlgXgBbEF3wWUBbEF3wWxBeAFkgVmBZcFkgVoBWYFdQN2A58DdQOfA6MDdgPMA58DzgOfA8wDzgPUA6MDzgOjA58DtwORA48DtwPFA5sDtwObA5EDfANvA5EDfAORA5sDbwOPA5EDhASHBFQEhARUBFEEHAQbBFEEHARRBFQEGwQZBFEEtgLPAgIDtgICA7ICzwLfAgIDlwVmBY4FZAWyBY4F1APOAwAE1AMABAMEzgP7AwAELQQzBAAELQQABPsDMwQDBAAEuALyAuMCuALjAtIC0gK6ArgClgVgBZkFPwVqBWAFagWZBWAFGwQcBO4DxQO3AxsExQMbBO4DtwMZBBsEMwQtBFwEMwRcBF8EkgRfBFwEsgWLBeIFsgVkBYsFYgWUBYsFlAXiBYsFfAObA6YDxQPWA6YDxQOmA5sD1gPYA6YD9gLjAvIC8gLwAvYC5QLdAuEC4wLlAuEC4wL2AuUCCwMCA98CCwPfAukCmANHA0UDRwN2A0gDJQNHA0gDJQMjA0UDJQNFA0cDMAQrBPYDMAT2A/oDKwQtBPsDKwT7A/YDzgPMA/YDzgP2A/sDzAPJA/oDzAP6A/YDiQRaBFsEiQSSBFwEiQRcBFoELQQrBFoELQRaBFwEKwQwBFsEKwRbBFoEOwUCBf0EOwWSBQIFVQVYBV4FWAVkBY4FWAWOBV4FZgVeBY4FXgVaBVUFUwViBYsFUwWLBVgFZAVYBYsFWAVVBVMFMwU5BU0FMwVNBUIFOQU/BWAFOQVgBU0FYQVNBWAF7gQuBSwFPwU5BS4FOQUzBSwFOQUsBS4FPQQnBF0EPQRdBGkEJwQcBFQEJwRUBF0EhwSMBF0EhwRdBFQEjASQBGkEjARpBF0E2APWA/gD2AP4Az0E1gPFA+4D1gPuA/gDHAQnBPgDHAT4A+4DJwQ9BPgDIQMlA0gDIQNIA0QDdgNEA0gDdgN1A0QDbwMnA0wDbwN8AyoDbwMqAycDKwMqA3wDKwN8A1ADfAOmA1ADyQPMA5kDyQOZA5gDdgNHA5kDdgOZA8wDRwOYA5kDTAMnAxcDBQOzAhcDEQMFAxcDEQMXAx8DJwMqAx8DJwMfAxcDKgMrAx8DIwMlAxoDIwMaAwsDAgMLAxoDAgMaAyUDsgICAxYDsgIWA70CAgMlAxYDJQMhAxYDIQO9AhYDugLSAuECugLhArwC0gLjAuEC3QLUAuEC1AK8AuEC8ALyAu0C8ALtAuwCBQMRA+0CBQPtAvICEQPsAu0CswLOAq0CswIFA/ICswLyAs4C8gK4As4CuAKtAs4C5wLpAuYC6QLfAuAC3QLlAukC3QLpAuAC5QL3AuYC5QLmAukC1ALgAs8C1ALdAuAC3wLPAuACagU/BS4F+ARqBS4F+AQ8BWoF+AS1BLMEhwSEBLMEhwSzBLUEkASMBLkEjASHBLUEjAS1BLkE+AQuBbkE+AS5BLUELgXuBLkE+gT9BL8E+gS/BL0EkgSJBL8EiQS9BL8EkgS/BMQE/QQCBcQE/QTEBL8EAgUIBcQEWgVeBVYFXgVmBWgFXgVoBVYFkgU7BVYFkgVWBWgFCAUCBTEFCAUxBZEFkgUxBQIFkgWRBTEFTQViBVAFTQVhBWIFUwVQBWIFlAWMBbEFlAViBWEFlAVhBYwFYQVgBYwFYAWWBbEFYAWxBYwF/wL9AgAD/wL8Av0CEQMQA/0CEQP9AvwCEAMAA/0CEAMNAwADDQN4A/MCDQPzAgAD+QLnAvMC5wLmAvMC5gL3AvMCSQVLBUcFSQVUBUsFNwVLBVQFNwU2BUcFNwVHBUsFNgU0BUcFNAVFBUcFRQVBBVEFQQVNBVEFTQVQBVEFUAVTBVEF6gXpBbYF6QUCBpIF6QWSBbYFkgWXBbYFlwXqBbYF0QN1A6ED0QOhA9IDdQOjA6EDowPUA9IDowPSA6EDtQOPA40DjwNtA2sDjwNrA40DYQONA2sDjQPpA7UDUARRBOsDUAR+BIMEUASDBFEEhARRBIMEUQQZBOsDgwKnAq8CgwKvArICpwKBArYCpwK2Aq8CtgKyAq8C5AXqBbQF5AW0BbIFlwWOBbQFlwW0BeoFjgWyBbQF0QP+A50DKQT+AzEEKQTLA50DKQSdA/4DWAJvAroCWAK6AqICbwJtAqACbwKgAroCpAXnBbcF5wU6BpYF5wWWBbcFlgWZBbcFmQVqBaQFmQWkBbcFtQPrAxkEtQMZBLcDlQRiBJIEYgQxBDYEMwRfBGIEMwRiBDYEXwSSBGIE5AXiBRAG4gXfBRAGPQZrBhAGPQYQBt8FawZABuQFawbkBRAGIQNAA7QCQAN1A2wDPwNAA2wDPwMTA7QCPwO0AkADbQNvA0oDbwNMA0oDqAK+ArMCvgJtA0oDTAMXA74CTAO+AkoDFwOzAr4CgwK0AqsCEwOrArQCEwOGAoMCEwODAqsC1AKiArECogK6ArECugK8ArECvALUArECbQJxAogCbQKIAqACcQKoAogC1AKlAmUC1AJlAokCpQKBAmUCEQWPBTwFagU8BY8FagWPBaQFfgQRBYME+ASzBBEF+AQRBTwFswSEBIMEswSDBBEFlQQIBcgECAUWBcgEygSaBMgEkQUCBhYFGAbKBBYFGAYWBQIGygTIBBYFOgY7BuAFOwY9Bt8FOwbfBeAFaQmDCV0JZwldCYMJ8wACAQEB8wABAdYAAAEBAQIBAAHxANYAAAHWAAEBxwPyA/ADxwPwA5QD8gMlBCME8gMjBPADwgPwAyMEwgOUA/ADtQE4ArIBVAKyATgCVAKGAbIBNQifCAIInwi8CLsIngifCLsIngh5CAIInggCCJ8IvAjOCM0IvAjNCLsIzgjqCPsIzgj7CM0IzAjNCPsIzAieCLsIzAi7CM0ICgkjCSEJHwkICQoJHwkKCSEJCAnoCPsICAn7CAoJIwk5CTgJIwk4CSEJNwkfCSEJNwkhCTgJbgZtBvsFbgYUB20GKQZtBhQHKQb7BW0GNwg1CAYINwh3CDUItQGWAZgBlgGJAZgBmwGYAYkBmwG1AZgBWwFKAVwBTAFZAVwBTAFcAUoBWQFpAVsBWQFbAVwB8wDWAOYA1gDYAOYA2gD1AOYA2gDmANgA9QDzAOYAvgCoAKoAqwDAAL4AqwC+AKoAOwA9AEQAPQBTADkAPQA5AEQADAACAA8ABQAEAAIABAAPAAIAfwJnApoCZwI4AjoCOgKEAmcChAKaAmcCGgoiChwKGgocChYKIgobChwKEgocChsKEgoPChYKEgoWChwKZgdlB0AHWQdAB2UH+wjqCOwIzgjvCOwI7wj7COwIdgGJAZYBhgFlAXYBhgF2AZYBZQFbAXYBPQE/AUoBPQElATQBPQE0AT8BZgfjB2UHZgcGCAIIZgcCCOMHeQjiB+MHeQjjBwII4gdZB2UH4gdlB+MHFwcUB88GFAejBs8GHAfPBqMGHAcXB88GfgXMBKQEfgWkBPsFzgR1BfsFzgT7BaQEZgPaAmgDCgM8A9oCPANoA9oCFwdABxQHWQc9BxQHWQcUB0AHzAQjBFgEIwQlBFgEJQTMBFgEdQWGBW4GdQVuBvsFhgWjBisGhgUrBm4GxwNmA2gDPAOWA2gDlgPHA2gD2gKaApwC2gKcAgoDhAKjApwChAKcApoCowIKA5wCugmfCcsJugnLCcoJ1gnKCcsJ1gnUCcoJvwnCCdoJvwnaCc4JwgnZCdoJ2gnkCc4JsQmwCZoJmQmMCbAJjAmaCbAJvQmfCa0Jogm9Ca0JognBCb0JsQm2CcYJ1AntCbYJ1Am2CcgJ7QnRCcYJ7QnGCbYJvwnBCacJvwmnCa4JogmnCcEJpwmpCa4JtgnJCcgJtgm6CcoJtgnKCckJ1AnJCcoJ1AnICckJnwmiCa0JugmeCZ8JpQmrCbQJpQmkCasJswm0CasJtgmbCZ0JtgmxCZoJtgmaCZsJugm2CZ4JtgmdCZ4Jfwl2CWUJZQlkCX8JZAlXCYAJZAmACX8JigmJCWoJagltCYoJbQl6CYoJhQlWCXgJVgmKCXoJbQlWCXoJVglrCXgJ0QnPCcUJ0QnFCcYJzwnECcUJsAnFCcQJsAmxCcYJsAnGCcUJ1wnWCcsJnwm9CdcJnwnXCcsJvQnMCdcJ5AnlCc4J5QnXCcwJvQnBCeUJvQnlCcwJwQm/Cc4JwQnOCeUJ1AnWCfsJ1An7CeEJCwoFCuEJCwrhCfsJ5AnaCeMJ2gnZCe8J2gnvCeMJ7wn/CeQJ7wnkCeMJ0QntCd4J7QnUCeAJ8AntCeAJ7QnrCd4JBQrwCdQJBQrUCeEJ8AngCdQJiQmiCZ8JkwmkCaUJpQmSCZMJkgmICZMJZwmdCZsJZwmbCXcJmgmOCXcJmgl3CZsJjgmACXcJaQmJCZAJaQmQCYMJiQmfCZ4JiQmeCZAJnQlnCZAJnQmQCZ4JZwmDCZAJmQmNCYwJjQl2CX8JjQl/CYwJgAmOCYwJgAmMCX8JjgmaCYwJogmJCZQJiQmKCZQJigmiCZQJogmVCacJogmKCVYJoglWCZUJhQmXCZUJhQmVCVYJlwmpCacJlwmnCZUJawlyCX0Jawl9CXgJcgl1CX0JiAmGCX0JhgmFCXgJhgl4CX0JhQmGCZIJhQmSCZcJhgmICZIJpQmpCZcJpQmXCZIJqQmlCbQJqQm0Ca4Jtwm/Ca4JtwmuCbQJvwm3CbsJvwm7CcIJtwm0CbsJswm7CbQJswnZCcIJswnCCbsJYwlxCW8JYwlvCWEJcQl+CXUJcQl1CW8JdQlyCW8JcglrCWEJcglhCW8JSglJCTEJSgkxCTMJSQkyCTEJGQkxCTIJGQkbCTMJGQkzCTEJOQlqCV8JaglpCV8JRwk5CTsJRwk7CUYJIwk7CTkJIwklCUYJIwlGCTsJSglMCVkJSglZCVcJTAk3CVsJTAlbCVkJZwl3CVkJZwlZCVsJdwlXCVkJQglGCS8JJQkmCS8JJQkvCUYJNwk4CV0JNwldCVsJOAk5CV8JOAlfCV0JaQldCV8JXQlnCVsJEAnzCCgJEAkoCSkJ8wgSCUUJ8whFCSgJQgk/CVAJQglQCVQJPwk+CVAJKQlSCVAJKQlQCT4JUglrCVQJUglUCVAJFQkrCS0JFQktCRcJKwk+CT8JKwk/CS0JQgkvCS0JQgktCT8JLwkmCRcJLwkXCS0J6wnpCdwJ6wncCd4J6QndCdwJzwncCd0JzwnRCd4JzwneCdwJCwr7CeYJ1gnXCeYJ1gnmCfsJ/wnzCeUJ/wnlCeQJ8wkLCuYJ8wnmCeUJ1wnlCeYJHQoaCgUKHQoFCgsK/wnvCf0J7wn+Cf0JCgr9Cf4JCgoICv8JCgr/Cf0J6wntCfwJ6wn8CfcJ7QnwCfwJDwoGCvwJBgoBCvcJBgr3CfwJ8AkFCvwJGgoWCgUKFgoPCvwJFgr8CQUKpgClAIsApQC3AIgAiABzAKUAcwCLAKUAtwCHAHEAtwBxAIgAowCvAMMArwC1AMMA4ADDALUAwwDeAKMAqwCqAJkAmgCrAJkAqACVAJcAlQCmAIsAiwCXAJUAowCtAJwAowCcAJIArQCrAJoArQCaAJwAmgCNAJwAjQCGAJIAjQCSAJwAqgCoAJgAqgCYAJkAqACXAJgAmACaAJkAcABvAIEAcACBAIIAgwCCAIEAgwCEAIIATQBDAGUATQBlAFkAQwA4AGYAQwBmAGUATABLAGQASwBNAFkASwBZAGQAagBpAF0AUwBqAF0AUwBfAGoAaABmAFwAOAA5AFwAOABcAGYAbQBsAGEAbABqAF8AUwA9AGwAUwBsAF8APQBJAGEAPQBhAGwAaQBoAFwAOQBpAFwAOQBTAF0AOQBdAGkAiwBzAHQAcwCIAHIAWQBlAHMAWQBzAHIAZQBmAHQAZQB0AHMAiABxAHIAcQCHAEwATABkAHEAZABZAHIAZAByAHEAmgB7AH0AmgB5AHsAaQBqAHsAaQB7AHkAagB9AHsAlwCLAHQAlwB0AHYAZgBoAHYAZgB2AHQAhgCNAH8AjQCaAH0AagBsAI0AagCNAH0AbABtAH8AbAB/AI0AmgCYAHcAmgB3AHkAmACXAHYAmAB2AHcAaABpAHcAaAB3AHYAaQB5AHcAhACDAI4AgwCRAI4AogCeAI4AogCOAJEAEgALACEAEgAhABcACwAZACEAHwAgABYACQAIAB8ACQAfABYACAASABcACAAXAB8AKAA1AD8ANQApAEIAQgBAADUAQAA/ADUAJQAjABsADwAlABsAIwAhABkAIwAZABoACwAMABoACwAaABkADwAQACcADwAnACUAEAAUACgAEAAoACcAIwAaABsADAAPABsADAAbABoASQBWAGMASQBjAGEAcABtAGEAcABhAGMAbQBwAIIAbQCCAH8AhACGAH8AhAB/AIIAhgCEAI8AhgCPAJIAhACOAI8AngCPAI4AngCjAJIAngCSAI8AowCeAKAAowCgAK8AogCgAJ4AogC1AK8AogCvAKAAVQBXAGMAYwBWAFUAVgBJAEcAVgBHAFUAOAArACwAKwBNACoAFwAhACsAFwArACoAIQAsACsATQAgAB8ATQAfACoAHwAXACoAPQAwADEAPQA7ADAAIwAlADAAJQAnADEAJQAxADAAOQAsAC4AIQAjAC4AIQAuACwAPwA9ADMAPQAxADMAJwAzADEAJwAoAD8AJwA/ADMARAA5AC4ARAAuADsAIwA7AC4AIwAwADsAPwBAAEUAQABCAFUAVQBHAEAARwBJAEUARwBFAEAA1QDTAMcA1QDHAMgA0wDiAMUA0wDFAMcAtwC5AMcAtwDHAMUAuQC7AMgAuQDIAMcA4gDRAMQA4gDEAMUA0QDsALYA0QC2AMQAxAC3AMUA3gDfAOoA3wDgAPsA+wD5AN8A+QD8AOoA+QDqAN8A2wDaAMwAwADMANoA1gDVAMgA1gDIAL4AuwC+AMgA3gDpAM4A6QDbAMwA6QDMAM4AzADBAM4AwQDeAM4A2ADWAL4AvgDAANoAvgDaANgAAgEnASYBJwEDASgBNwE0AScBNwEnASgBNAEmAScBEwERAf8AEQESAf4A7QDsABEB7QARAf4A7AD/ABEBGgEDAQUB8wD1AAMB9QDoAAUB9QAFAQMBFAEAASUBJQExARQBMQETARQBHQEbAQcBHQEHAQsBGwEaAQUBGwEFAQcB6AD3AAcB6AAHAQUB9wD8AAsB9wALAQcBAAECASYBAAEmASUBNAElASYB+wAuAQkBLgEeAQ0BLgENAQkB/AD5AAkB/AAJAQ0B+QD7AAkBHgEhAQ8BHgEPAQ0BIQEjAQ8BHQELAQ8BHQEPASMBCwH8AA0BCwENAQ8BRAEhAVcBRAEjASEBHgE8ASEBPAFXASEBxQfGB+oHxQfqB88HxgfRB+oHsAeyB68HsAfGB7IHxQeyB8YHxQegB68HxQevB7IHIAgaCO4HIAgfCBoIGggPCO4HDwjUB+4HDwjLB80HDwjNB9QHzAfvB9QHzAfUB80H7wfuB9QHDQgZCBsIGQgeCBsIGwgMCA0I7AfIB8oHDAgbCBQIDAgUCAsIGwgVCBQICwgUCBUI6gfRBwkIyAfsB9EHyAfRB8YH7AcJCNEHCQgLCPMHzwfqB/MH6gcJCPMH8AfPB/MHCwgSCPAHCwjwB/MHIAgmCCIIIAgiCB8IJggnCCIIIwgeCB8IHwgiCCMIIggnCDEIIggxCCMIEggLCBUIEggVCCQIGwghCCQIGwgkCBUIjAegB8UHjAfFB58HuQemB6gHqAe2B7kHtge6B7kHvge9B7QHvgfKB70HyAe9B8oHtweuB7QHrgelB7QHpge0B6UHvQfIB8YHvQfGB7cHxgewB7cHrgerB6IHqwejB6IHpQeuB6IHsAevB60HsAetB64HrwegB60HowerB60HowetB6AHqweuB60HjQebB2kHmwelB6IHoweXB5sHowebB6IHlwdpB5sHjwemB5wHnAeGB48HDwgaCBkIGggfCBkIHggZCB8I7AfKB8sH7AfLBwwIywcPCAwIDwgNCAwIIQgeCCoIIQgbCB4IIwgxCCoIIwgqCB4IugfCB74Hyge+B8IHygfCB8sHvge0B7UHtAemB7UHpge5B7UHuQe+B7UHnAemB6UHpQebB5wHmweNB4YHmweGB5wHlAeCB58HlAdwB2AHlAdgB4IHRgeCB2AHRgeMB58HRgefB4IHoAeMB4oHlwejB6AHlwegB4oHjAdGB28HjAdvB4oHgweXB4oHgweKB28HzwfwB84HlAefB84HnwfFB88HnwfPB84H8AeVB5QH8AeUB84HcAeUB5UH3wQVBcYEFQWFBX8FfAXVBBUFfAUVBX8F1QSmBMYE1QTGBBUF0QX/BaYF/wUWBu0F/wXtBaYFfAV/BaYFfAWmBe0FfwWFBaYF3wQfBRUF3wQSBR8FgwWFBR8FhQUVBR8F2wTgBOME7ATmBOAE5gTjBOAE+QTZBOkE2QTrBOkEqgQOBdkEDgX/BNkE/wTrBNkE0QXNBf8FzQXABQQGzQUEBv8FLgYsBv8FLgb/BQQGLAYWBv8FBgbeBQ0GBgYNBgoGMwY0Bg0GNAY2BgoGNAYKBg0GLwbXBQgGLwYxBgkGLwYJBtcF1wW8BQgGvAUFBggGMAYvBggGMAYIBgUGrAWrBZ4FcQWeBasFcQX+BKwFcQWsBZ4FbAVtBacFbQVxBasFqgVsBacFgQWjBa0FrQWgBYEFoAWCBYEFgQV6BaMFegWoBaMFBQXxBA8F8QTsBA8FFwUPBSAFegUXBSAFegWBBSgFegUoBRcFcQVtBRoFbQVsBQwFbQUMBRoFDQUcBRoFDQUOBf4EDQX+BBwF/gRxBRwFcQUaBRwFvAXXBbkF1wXFBbkFpwVtBbkFpwW5BcUFbQWrBbwFbQW8BbkFegW/BbgFvwVzBcgFqwXDBbwFqwWsBcQFqwXEBcMFzAXIBd4F3gUGBtgF3gXYBcwFFwUoBSYFFwUmBRQFKAWBBYIFKAWCBSYF+QTpBPwE6QTrBPwEDQUaBfwEDQX8BOsEGgUMBfkEGgX5BPwEDgUNBf8EDQXrBP8EgwWhBYUF0QWmBaEFpgWFBaEF5gTkBOME5gTvBOQE2wTkBO8E2wTjBOQE5gTsBPEEBQXmBPEEEgUlBR8FEgUUBSYFEgUmBSUFggWDBSUFggUlBSYFgwUfBSUFgwWgBaEFgwWCBaAFrQXRBaEFrQWhBaAF0QWtBc0FrQW9Bc0FvwXABc0FvwXNBb0F8wbwBvQG8AbvBu0G6AbuBvAG6AbwBu0G7gb0BvAG4AOxA+MDsQOrA9wD3APdA7ED3QPkA+MD3QPjA7EDSQQRBBMESQQTBEoEEQTgA+MDEQTjAxME5AMUBBME5AMTBOMDFARMBEoEFARKBBMEqQR2BNcEqQRsBHYEegSoBHYEqAT5BNcEqATXBHYEfQYzBlkGfQZZBn8GMQZXBlkGMQZZBjMGVwaEBn8GVwZ/BlkG7wbiBtoG7wbaBu0G6AbtBtoGfQa1BrEGfQaxBnkGtQbiBrEG1wazBrEG1waxBuIGswZ7BnkGswZ5BrEG9wb0BvEG7gbpBvEG7gbxBvQGcQRJBEoEcQRKBGwETAR6BGwETARsBEoEegR2BGwEyAVzBaoFyAWqBboFpwXFBboFpwW6BaoF7ATgBNcE7ATXBOcE4ASpBNcE+QTnBNcEMwYNBtoFDQbeBdoFCQYxBjMGCQYzBtoFcwX2BKoFcwXsBPYEDAVsBaoFDAWqBfYE3gXOBdoF3gXIBboF3gW6Bc4FxQXOBboFxQUJBtoFxQXaBc4F7ATnBPYE+QT2BOcE+QQMBfYEaweSB4gHaweIB1EHkgeTB5EHkgeRB4gHjweGB4gHjweIB5EHhgdqB1EHhgdRB4gHwAfEB8IHxAfMB80HywfCB8QHywfEB80HngeoB5MHpgePB5MHpgeTB6gHjweRB5MHfARuBHIEbgREBHIERwRyBEQEcgR5BHwEwAXKBdgFzAXYBcoFhgZjBmcGhgZnBoAGYwYuBmcGNgZlBmcGNgZnBi4GZQZ7BoAGZQaABmcGhga9Br8GvQbeBr8GvwaKBoYGrwPxA+gD8QNEBOgDOQToA0QE6AOzA68DfAStBK4ErQTbBNwErQTcBK4E3wTGBK4E3wSuBNwExgSmBHwExgR8BK4ELgYEBgYGBAbABdgFBAbYBQYGCgY2Bi4GCgYuBgYGegWcBb8FegV3BZwFcwWcBXcFcwW/BZwFBQUPBRcFBQUXBQoFFwUUBQoFegUgBR0FegUdBXcFIAUPBR0F7ARzBR0F7AQdBQ8FcwV3BR0FegW4BagFuAW/Bb0FrQW4Bb0FrQWjBagFrQWoBbgF2wTvBBIF2wQSBdwE3wTcBBIF5gQFBQkF5gQJBe8EBQUKBQkFFAUSBQkFFAUJBQoFEgXvBAkFwAXHBcoFwAW/BccFyAXMBccFyAXHBb8FzAXKBccFrwOqA+ADqgOpA6sDqwOtA6oDrQPgA6oDAgcDBycHJwdQBwIHUAfnBgIHBQcEB/oGBQf6BvsGBAcDB/MGBAfzBvoG+Ab6BvMG+Ab5BvsG+Ab7BvoG3gbnBgAHUAcLBwAHUAcAB+cGCwfeBgAH`},{role:`coaming`,nv:574,nt:1140,pos:`kPegB4oDcAiXB1ADlwinByMDlvfUB44Cw/eTBwIDPQiTBwIDxfebBwIDOwibBwIDxvekBwIDOgikBwIDxfetBwIDOwitBwIDw/e1BwIDPQi1BwIDufeEBwEDRwiEBwEDv/eLBwIDQQiLBwIDv/e9BwIDQQi9BwIDuffEBwEDRwjEBwEDsvd+BwEDTgh+BwEDsvfKBwEDTgjKBwEDqvd6BwEDVgh6BwEDVgjOBwEDovd4BwADXgh4BwADqPfNBygDXgjRBwADmffSBwADZwjSBwADmfd3BwADZwh3BwADcAjRB/8CkPd4B/8CcAh4B/8CiPd6B/8CeAh6B/8CeAjOB/8CgPd/B/4CgAh/B/4CgPfKB/4CgAjKB/4CefeEB/4ChwiEB/4Cc/eLB/4CjQiLB/4Cc/e+B/4CjQi+B/4CeffEB/4ChwjEB/4Cb/eTB/4CkQiTB/4CbfecB/0CkwicB/0CbPekB/0CbfetB/0Cb/e2B/4CkQi2B/4C0PeYB2YCMAiYB2YC0vegB2YCLgigB2YC0/epB2cCLQipB2cC0veyB2YCLgiyB2YC0Pe7B2YCMAi7B2YCy/eQB2YCNQiQB2YCy/fCB2YCNQjCB2YCxvfJB2YCOgjJB2YCv/eEB2UCQQiEB2UCxveJB2YCOgiJB2YCv/fPB2YCQQjPB2YCt/d/B2UCSQh/B2UCt/fTB2UCSQjTB2UCr/d9B2QCUQh9B2QCr/fWB2UCUQjWB2UCpvfXB2QCWgjXB2QCpvd8B2QCWgh8B2QCnffWB2QCYwjWB2QCnfd9B2QCYwh9B2QClffTB2MCawjTB2MClfeAB2MCawiAB2MCjffPB2MCcwjPB2MCjfeEB2MCcwiEB2MChveJB2ICegiJB2IChvfKB2MCegjKB2MCgPeQB2ICgAiQB2ICfPeYB2IChAiYB2ICevehB2IChgihB2ICefeqB2IChwiqB2ICeveyB2IChgiyB2ICfPe7B2IChAi7B2ICgPfDB2ICgAjDB2IC6feiBzYBFwiiBzYB7PeqBzcBFAiqBzcB7PezBzcBFAizBzcB7Pe8BzcBFAi8BzcB6ffFBzcBFwjFBzcB5ffNBzYBGwjNBzYB5feaBzYBGwiaBzYB3/fTBzYBIQjTBzYB2PeOBzUBKAiOBzUB3/eTBzYBIQiTBzYB2PfZBzYBKAjZBzYB0ffdBzUBLwjdBzUB0feKBzUBLwiKBzUByPfgBzUBOAjgBzUByPeHBzQBOAiHBzQBv/fhBzQBQQjhBzQBv/eGBzQBQQiGBzQBtvfgBzQBSgjgBzQBtveHBzMBSgiHBzMBrvfdBzMBUgjdBzMBrveKBzMBUgiKBzMBpvfZBzMBWgjZBzMBpveOBzMBWgiOBzMBn/fUBzMBYQjUBzMBn/eTBzIBYQiTBzIBmveaBzIBZgiaBzIBlvfFBzIBagjFBzIBmvfNBzIBZgjNBzIBlveiBzIBagiiBzIBk/erBzIBbQirBzIBkve0BzIBbgi0BzIBk/e8BzIBbQi8BzIBFvjEB0H/6gfEB0H/FfjNB0H/6wfNB0H/E/jVB0H/7QfVB0H/E/izB0H/7QezB0H/Ffi7B0H/6we7B0H/D/jdB0H/8QfdB0H/CfjkB0H/9wfkB0H/D/irB0H/8QerB0H/AvjqB0H//gfqB0H/CfikB0D/9wekB0D/+vfuB0D/BgjuB0D/AvieB0D//geeB0D/8vfwB0D/DgjwB0D/+veaBz//BgiaBz//6ffxBz//FwjxBz//8veXBz//DgiXBz//4PfxBz//IAjxBz//6feXBz7/FwiXBz7/2PfuBz7/KAjuBz7/4PeYBz7/IAiYBz7/0PfqBz3/MAjqBz3/2PeaBz3/KAiaBz3/yffkBz3/NwjkBz3/0PeeBz3/MAieBz3/yfekBzz/NwikBzz/v/fVBzz/QQjVBzz/w/fdBz3/PQjdBz3/w/erBzz/PQirBzz/v/ezBzz/QQizBzz/vfe7Bzz/Qwi7Bzz/vPfEBzz/RAjEBzz/vffNBzz/QwjNBzz/R/jPB+n8uQfPB+n8SPjYB+r8uAfYB+r8R/jhB+r8uQfhB+r8RfjpB+r8uwfpB+r8QPjxB+r8wAfxB+r8O/j4B+n8xQf4B+n8RfjGB+n8uwfGB+n8NPj9B+n8zAf9B+n8O/i4B+j8xQe4B+j8QPi/B+n8wAe/B+n8LPgCCOj81AcCCOj8JPgECOj83AcECOj8NPiyB+j8zAeyB+j8G/gFCOf85QcFCOf8LPiuB+f81AeuB+f8EvgECOf87gcECOf8JPirB+f83AerB+f8G/iqB+b85QeqB+b8CvgCCOb89gcCCOb8EvirB+X87gerB+X8Avj+B+b8/gf+B+b8CviuB+X89geuB+X8+/f4B+X8BQj4B+X8AviyB+T8/geyB+T89ffxB+X8CwjxB+X8+/e4B+T8BQi4B+T89fe/B+T8Cwi/B+T87/fhB+T8EQjhB+T88ffpB+T8DwjpB+T88ffHB+T8DwjHB+T87/fPB+T8EQjPB+T87vfYB+T8EgjYB+T8evjrB5L6hgfrB5L6efj0B5P6hwf0B5P6dvj9B5P6igf9B5P6cvgFCJL6jgcFCJL6dvjaB5L6igfaB5L6efjjB5L6hwfjB5L6bfgMCJL6kwcMCJL6ZvgRCJL6mgcRCJL6cvjSB5H6jgfSB5H6XvgVCJH6ogcVCJH6bfjLB5H6kwfLB5H6VvgYCJH6qgcYCJH6ZvjGB5D6mgfGB5D6TfgZCJD6swcZCJD6XvjCB5D6ogfCB5D6RPgYCJD6vAcYCJD6Vvi/B4/6qge/B4/6O/gWCI/6xQcWCI/6NPgRCI76zAcRCI76Tfi+B476swe+B476RPi/B476vAe/B476LfgMCI760wcMCI76O/jCB436xQfCB436J/gFCI362QcFCI36NPjGB436zAfGB436I/j9B4363Qf9B436LfjMB4z60wfMB4z6J/jTB4z62QfTB4z6I/jaB4z63QfaB4z6IPjjB4z64AfjB4z6H/jsB4z64QfsB4z6IPj1B4z64Af1B4z6pPj8B5/4XAf8B5/4o/gFCJ/4XQcFCJ/4oPgNCJ/4YAcNCJ/4nPgVCJ/4ZAcVCJ/4o/jzB574XQfzB574lvgcCJ/4agccCJ/4oPjrB574YAfrB574j/giCJ74cQciCJ74iPgmCJ74eAcmCJ74nPjjB574ZAfjB574lvjcB534agfcB534f/gpCJ34gQcpCJ34dvgqCJ34igcqCJ34j/jWB5z4cQfWB5z4bvgpCJz4kgcpCJz4iPjSB5z4eAfSB5z4f/jQB5v4gQfQB5v4ZfgmCJv4mwcmCJv4XfgiCJr4owciCJr4dvjPB5r4igfPB5r4bvjQB5n4kgfQB5n4VvgcCJr4qgccCJr4ZfjSB5n4mwfSB5n4UfgVCJn4rwcVCJn4XfjWB5j4owfWB5j4TfgOCJn4swcOCJn4VvjcB5j4qgfcB5j4UfjjB5j4rwfjB5j4Sfj8B5j4twf8B5j4SvgFCJj4tgcFCJj4TfjrB5j4swfrB5j4SvjzB5j4tgfzB5j4vfgGCHH3QwcGCHH3vPgPCHL3RAcPCHL3ufgXCHL3RwcXCHL3tfgfCHL3SwcfCHL3r/gmCHH3UQcmCHH3vPj9B3H3RAf9B3H3qfgsCHH3VwcsCHH3ufj1B3H3Rwf1B3H3ofgwCHD3XwcwCHD3tfjtB3D3SwftB3D3mPgzCHD3aAczCHD3r/jmB2/3UQfmB2/3qfjgB2/3VwfgB2/3j/gzCG/3cQczCG/3h/gzCG73eQczCG73ofjcB273XwfcB273mPjaB233aAfaB233fvgwCG73ggcwCG73dvgsCG33igcsCG33j/jZB233cQfZB233b/gmCGz3kQcmCGz3h/jaB2z3eQfaB2z3fvjcB2v3ggfcB2v3avgfCGz3lgcfCGz3dvjgB2v3igfgB2v3ZvgYCGv3mgcYCGv3b/jmB2r3kQfmB2r3YvgGCGr3ngcGCGr3Y/gPCGv3nQcPCGv3avjtB2r3lgftB2r3Zvj1B2r3mgf1B2r3Y/j9B2r3nQf9B2r3yPgUCNn2OAcUCNn2xvgcCNn2OgccCNn2yfgLCNn2NwcLCNn2wvgkCNn2PgckCNn2vPgrCNn2RAcrCNn2xvj6B9j2Ogf6B9j2yPgCCNn2OAcCCNn2tfgxCNn2SwcxCNn2rfg1CNj2Uwc1CNj2wvjyB9j2PgfyB9j2pfg4CNj2Wwc4CNj2vPjrB9f2RAfrB9f2nPg5CNf2ZAc5CNf2tfjlB9b2SwflB9b2k/g4CNb2bQc4CNb2rfjhB9b2UwfhB9b2i/g1CNX2dQc1CNX2pfjfB9X2WwffB9X2g/gxCNX2fQcxCNX2nPjeB9T2ZAfeB9T2fPgrCNT2hAcrCNT2k/jfB9P2bQffB9P2dvgkCNP2igckCNP2i/jhB9P2dQfhB9P2bPgRCPL2jgcdCNP2g/jlB9L2fQflB9L2fPjrB9L2hAfrB9L2dvjyB9L2igfyB9L2cvj6B9H2jgf6B9H2cPj+B9f2kAcCCNL2kQcWCKb2nPgLCIv2WwcPCIz2`,idx:`PgABAAIAAgB4AHoAeAC8AL4AeAC+AHoAtAB8AHoAtAB6AL4AfAA+AAIAfAACAHoArgBwAH4ArgB+ALYAcAA2ADQAcAA0AH4APgB8AH4APgB+ADQAfAC0ALYAfAC2AH4ANgABADQAAQA+ADQAAQA2AC4AKgABAC4ANgBwAGoANgBqAC4AcACuAKoAcACqAGoApgBmAGoApgBqAKoAZgAqAC4AZgAuAGoAngBeAGIAngBiAKIAXgAiACUAXgAlAGIAKgBmAGIAKgBiACUAZgCmAKIAZgCiAGIAIgABACUAAQAqACUAAQAiACAAHAABACAAIgBeAFwAIgBcACAAXgCeAJoAXgCaAFwAlgBYAFwAlgBcAJoAWAAcACAAWAAgAFwAjgBOAFQAjgBUAJQATgAVABkATgAZAFQAHABYAFQAHABUABkAWACWAJQAWACUAFQAFQABABkAAQAcABkAAQAVABMADQABABMAFQBOAEwAFQBMABMATgCOAIoATgCKAEwAiABIAEwAiABMAIoASAANABMASAATAEwAhABEAEYAhABGAIYARAAJAAsARAALAEYADQBIAEYADQBGAAsASACIAIYASACGAEYACQABAAsAAQANAAsAAQAJAAcABQABAAcACQBEAEIACQBCAAcARACEAIIARACCAEIAgABAAEIAgABCAIIAQAAFAAcAQAAHAEIAkgBSAEoAkgBKAIwAUgAPABEAUgARAEoABQBAAEoABQBKABEAQACAAIwAQACMAEoADwABABEAAQAFABEAAQAPABcAGwABABcADwBSAFAADwBQABcAUgCSAJAAUgCQAFAAmABWAFAAmABQAJAAVgAbABcAVgAXAFAAoABgAFoAoABaAJwAYAAkAB4AYAAeAFoAGwBWAFoAGwBaAB4AVgCYAJwAVgCcAFoAJAABAB4AAQAbAB4AAQAkACcAKQABACcAJABgAGQAJABkACcAYACgAKQAYACkAGQAqABoAGQAqABkAKQAaAApACcAaAAnAGQAsABuAGwAsABsAKwAbgAwACwAbgAsAGwAKQBoAGwAKQBsACwAaACoAKwAaACsAGwAMAABACwAAQApACwAAQAwADIAOAABADIAMABuAHIAMAByADIAbgCwALIAbgCyAHIAuAB0AHIAuAByALIAdAA4ADIAdAAyAHIAvAB4AHYAvAB2ALoAeAACADoAeAA6AHYAOAB0AHYAOAB2ADoAdAC4ALoAdAC6AHYAAgABADoAAQA4ADoAvAD8AP4AvAD+AL4A/AA+ATYB/AA2Af4AOAHyAP4AOAH+ADYB8gC0AL4A8gC+AP4APgF8AX4BPgF+ATYBfAG4AboBfAG6AX4BsgFyAX4BsgF+AboBcgE4ATYBcgE2AX4BqgFqAW4BqgFuAa4BagEsATABagEwAW4BOAFyAW4BOAFuATABcgGyAa4BcgGuAW4BLAHsAPQALAH0ADAB7ACuALYA7AC2APQAtADyAPQAtAD0ALYA8gA4ATAB8gAwAfQArgDsAOgArgDoAKoA7AAsASgB7AAoAegAJAHkAOgAJAHoACgB5ACmAKoA5ACqAOgALAFqAWQBLAFkASgBagGqAaQBagGkAWQBogFiAWQBogFkAaQBYgEkASgBYgEoAWQBmAFaAV4BmAFeAZwBWgEaAR4BWgEeAV4BJAFiAV4BJAFeAR4BYgGiAZwBYgGcAV4BGgHcAOAAGgHgAB4B3ACeAKIA3ACiAOAApgDkAOAApgDgAKIA5AAkAR4B5AAeAeAAngDcANgAngDYAJoA3AAaARYB3AAWAdgAFAHUANgAFAHYABYB1ACWAJoA1ACaANgAGgFaAVYBGgFWARYBWgGYAZYBWgGWAVYBkAFSAVYBkAFWAZYBUgEUARYBUgEWAVYBigFMAU4BigFOAY4BTAEKAQ4BTAEOAU4BFAFSAU4BFAFOAQ4BUgGQAY4BUgGOAU4BCgHMANAACgHQAA4BzACOAJQAzACUANAAlgDUANAAlgDQAJQA1AAUAQ4B1AAOAdAAjgDMAMoAjgDKAIoAzAAKAQgBzAAIAcoABgHEAMoABgHKAAgBxACIAIoAxACKAMoACgFMAUYBCgFGAQgBTAGKAYYBTAGGAUYBhAFEAUYBhAFGAYYBRAEGAQgBRAEIAUYBgAFAAUIBgAFCAYIBQAECAQQBQAEEAUIBBgFEAUIBBgFCAQQBRAGEAYIBRAGCAUIBAgHAAMIAAgHCAAQBwACEAIYAwACGAMIAiADEAMIAiADCAIYAxAAGAQQBxAAEAcIAhADAAMgAhADIAIIAwAACAQABwAAAAcgADAHGAMgADAHIAAABxgCAAIIAxgCCAMgAAgFAAUoBAgFKAQABQAGAAYgBQAGIAUoBjAFIAUoBjAFKAYgBSAEMAQABSAEAAUoBlAFUAVABlAFQAZIBVAEQARIBVAESAVABDAFIAVABDAFQARIBSAGMAZIBSAGSAVABEAHSAM4AEAHOABIB0gCSAIwA0gCMAM4AgADGAM4AgADOAIwAxgAMARIBxgASAc4AkgDSANYAkgDWAJAA0gAQARgB0gAYAdYAHAHaANYAHAHWABgB2gCYAJAA2gCQANYAEAFUAVgBEAFYARgBVAGUAZoBVAGaAVgBngFcAVgBngFYAZoBXAEcARgBXAEYAVgBpgFmAWABpgFgAaABZgEiASABZgEgAWABHAFcAWABHAFgASABXAGeAaABXAGgAWABIgHiAN4AIgHeACAB4gCgAJwA4gCcAN4AmADaAN4AmADeAJwA2gAcASAB2gAgAd4AoADiAOYAoADmAKQA4gAiASYB4gAmAeYAKgHqAOYAKgHmACYB6gCoAKQA6gCkAOYAIgFmAWgBIgFoASYBZgGmAagBZgGoAWgBrAFsAWgBrAFoAagBbAEqASYBbAEmAWgBtAF0AXABtAFwAbABdAEyAS4BdAEuAXABKgFsAXABKgFwAS4BbAGsAbABbAGwAXABMgHwAO4AMgHuAC4B8ACwAKwA8ACsAO4AqADqAO4AqADuAKwA6gAqAS4B6gAuAe4AsADwAPYAsAD2ALIA8AAyATQB8AA0AfYAOgH4APYAOgH2ADQB+AC4ALIA+ACyAPYAMgF0AXYBMgF2ATQBdAG0AbYBdAG2AXYBvAF4AXYBvAF2AbYBeAE6ATQBeAE0AXYBuAF8AXoBuAF6Ab4BfAE+ATwBfAE8AXoBOgF4AXoBOgF6ATwBeAG8Ab4BeAG+AXoBPgH8APoAPgH6ADwB/AC8ALoA/AC6APoAuAD4APoAuAD6ALoA+AA6ATwB+AA8AfoAuAH2AfgBuAH4AboB9gE7AvgBMALyAfgBMAL4ATsC8gGyAboB8gG6AfgBOwIoAiwCMAI7AiwCKALoAe4BKALuASwC6AGqAa4B6AGuAe4BsgHyAe4BsgHuAa4B8gEwAiwC8gEsAu4BqgHoAeQBqgHkAaQB6AEoAiQC6AEkAuQBIALiAeQBIALkASQC4gGiAaQB4gGkAeQBKAI7AiQCPQIgAiQCPQIkAjsCPQIYAhwCIAI9AhwCGALaAdwBGALcARwC2gGYAZwB2gGcAdwBogHiAdwBogHcAZwB4gEgAhwC4gEcAtwBmAHaAdQBmAHUAZYB2gEYAhQC2gEUAtQBEALQAdQBEALUARQC0AGQAZYB0AGWAdQBGAI9AhQCPQIQAhQCPQIIAg4CEAI9Ag4CCALIAcwBCALMAQ4CyAGKAY4ByAGOAcwBkAHQAcwBkAHMAY4B0AEQAg4C0AEOAswBigHIAcYBigHGAYYByAEIAgYCyAEGAsYBAgLEAcYBAgLGAQYCxAGEAYYBxAGGAcYBCAI9AgYCPQICAgYCPQIEAgACAgI9AgACBALAAcIBBALCAQACwAGAAYIBwAGCAcIBhAHEAcIBhAHCAYIBxAECAgACxAEAAsIBgAHAAcoBgAHKAYgBwAEEAgwCwAEMAsoBCgLOAcoBCgLKAQwCzgGMAYgBzgGIAcoBBAI9AgwCPQIKAgwCPQIWAhICCgI9AhICFgLWAdIBFgLSARIC1gGUAZIB1gGSAdIBjAHOAdIBjAHSAZIBzgEKAhICzgESAtIBlAHWAdgBlAHYAZoB1gEWAhoC1gEaAtgBHgLeAdgBHgLYARoC3gGeAZoB3gGaAdgBFgI9AhoCPQIeAhoCPQImAiICHgI9AiICJgLmAeABJgLgASIC5gGmAaAB5gGgAeABngHeAeABngHgAaAB3gEeAiIC3gEiAuABpgHmAeoBpgHqAagB5gEmAioC5gEqAuoBLgLsAeoBLgLqASoC7AGsAagB7AGoAeoBJgI9AioCPQIuAioCPQI0AjICLgI9AjICNAL0AfABNALwATIC9AG0AbAB9AGwAfABrAHsAfABrAHwAbAB7AEuAjIC7AEyAvABtAH0AfoBtAH6AbYB9AE0AjYC9AE2AvoBOAL8AfoBOAL6ATYC/AG8AbYB/AG2AfoBNAI9AjsCNAI7AjYCOwI4AjYCOAI7AjoCOwL2Af4BOwL+AToC9gG4Ab4B9gG+Af4BvAH8Af4BvAH+Ab4B/AE4AjoC/AE6Av4BOwAAADwAAAA9ADwAuwB3AHkAuwB5AL0AdwA7ADwAdwA8AHkAPQB7AHkAPQB5ADwAewCzAL0AewC9AHkANQBvAH0ANQB9ADMAbwCtALUAbwC1AH0AswB7AH0AswB9ALUAewA9ADMAewAzAH0AAAA1ADMAPQAAADMANQAAAC0AAAADAC0ArQBvAGkArQBpAKkAbwA1AC0AbwAtAGkAAwBlAGkAAwBpAC0AZQClAKkAZQCpAGkAIQBdAGEAIQBhAAMAXQCdAKEAXQChAGEApQBlAGEApQBhAKEAZQADAGEAAAAhAAMAIQAAAB8AnQBdAFsAnQBbAJkAXQAhAB8AXQAfAFsAHwBXAFsAVwCVAJkAVwCZAFsAFABNAFMAFABTABgATQCNAJMATQCTAFMAlQBXAFMAlQBTAJMAVwAfABgAVwAYAFMAAAAUABgAAAAYAB8AFAAAABIAAAAMABIAjQBNAEsAjQBLAIkATQAUABIATQASAEsADABHAEsADABLABIARwCHAIkARwCJAEsACABDAEUACABFAAoAQwCDAIUAQwCFAEUAhwBHAEUAhwBFAIUARwAMAAoARwAKAEUAAAAIAAoADAAAAAoACAAAAAYAAAAEAAYAgwBDAEEAgwBBAIEAQwAIAAYAQwAGAEEABAA/AEEABABBAAYAPwB/AIEAPwCBAEEADgBRAEkADgBJABAAUQCRAIsAUQCLAEkAfwA/AEkAfwBJAIsAPwAEABAAPwAQAEkAAAAOABAABAAAABAADgAAABYAAAAaABYAkQBRAE8AkQBPAI8AUQAOABYAUQAWAE8AGgBVAE8AGgBPABYAVQCXAI8AVQCPAE8AIwBfAFkAIwBZAB0AXwCfAJsAXwCbAFkAlwBVAFkAlwBZAJsAVQAaAB0AVQAdAFkAAAAjAB0AGgAAAB0AIwAAACYAAAAoACYAnwBfAGMAnwBjAKMAXwAjACYAXwAmAGMAKABnAGMAKABjACYAZwCnAKMAZwCjAGMALwBtAGsALwBrACsAbQCvAKsAbQCrAGsApwBnAGsApwBrAKsAZwAoACsAZwArAGsAAAAvACsAKAAAACsALwAAADEAAAA3ADEArwBtAHEArwBxALEAbQAvADEAbQAxAHEANwBzAHEANwBxADEAcwC3ALEAcwCxAHEAOwB3AHUAOwB1ADkAdwC7ALkAdwC5AHUAtwBzAHUAtwB1ALkAcwA3ADkAcwA5AHUAAAA7ADkANwAAADkAPQH7AP0APQH9ADUB+wC7AL0A+wC9AP0AswDxAP0AswD9AL0A8QA3ATUB8QA1Af0AtwF7AX0BtwF9AbkBewE9ATUBewE1AX0BNwFxAX0BNwF9ATUBcQGxAbkBcQG5AX0BKwFpAW0BKwFtAS8BaQGpAa0BaQGtAW0BsQFxAW0BsQFtAa0BcQE3AS8BcQEvAW0BrQDrAPMArQDzALUA6wArAS8B6wAvAfMANwHxAPMANwHzAC8B8QCzALUA8QC1APMAKwHrAOcAKwHnACcB6wCtAKkA6wCpAOcApQDjAOcApQDnAKkA4wAjAScB4wAnAecAqQFpAWMBqQFjAaMBaQErAScBaQEnAWMBIwFhAWMBIwFjAScBYQGhAaMBYQGjAWMBGQFZAV0BGQFdAR0BWQGXAZsBWQGbAV0BoQFhAV0BoQFdAZsBYQEjAR0BYQEdAV0BnQDbAN8AnQDfAKEA2wAZAR0B2wAdAd8AIwHjAN8AIwHfAB0B4wClAKEA4wChAN8AGQHbANcAGQHXABUB2wCdAJkA2wCZANcAlQDTANcAlQDXAJkA0wATARUB0wAVAdcAlwFZAVUBlwFVAZUBWQEZARUBWQEVAVUBEwFRAVUBEwFVARUBUQGPAZUBUQGVAVUBCQFLAU0BCQFNAQ0BSwGJAY0BSwGNAU0BjwFRAU0BjwFNAY0BUQETAQ0BUQENAU0BjQDLAM8AjQDPAJMAywAJAQ0BywANAc8AEwHTAM8AEwHPAA0B0wCVAJMA0wCTAM8ACQHLAMkACQHJAAcBywCNAIkAywCJAMkAhwDDAMkAhwDJAIkAwwAFAQcBwwAHAckAiQFLAUUBiQFFAYUBSwEJAQcBSwEHAUUBBQFDAUUBBQFFAQcBQwGDAYUBQwGFAUUBAQE/AUEBAQFBAQMBPwF/AYEBPwGBAUEBgwFDAUEBgwFBAYEBQwEFAQMBQwEDAUEBgwC/AMEAgwDBAIUAvwABAQMBvwADAcEABQHDAMEABQHBAAMBwwCHAIUAwwCFAMEAAQG/AMcAAQHHAP8AvwCDAIEAvwCBAMcAfwDFAMcAfwDHAIEAxQALAf8AxQD/AMcAfwE/AUkBfwFJAYcBPwEBAf8APwH/AEkBCwFHAUkBCwFJAf8ARwGLAYcBRwGHAUkBDwFTAU8BDwFPAREBUwGTAZEBUwGRAU8BiwFHAU8BiwFPAZEBRwELAREBRwERAU8BkQDRAM0AkQDNAIsA0QAPAREB0QARAc0ACwHFAM0ACwHNABEBxQB/AIsAxQCLAM0ADwHRANUADwHVABcB0QCRAI8A0QCPANUAlwDZANUAlwDVAI8A2QAbARcB2QAXAdUAkwFTAVcBkwFXAZkBUwEPARcBUwEXAVcBGwFbAVcBGwFXARcBWwGdAZkBWwGZAVcBIQFlAV8BIQFfAR8BZQGlAZ8BZQGfAV8BnQFbAV8BnQFfAZ8BWwEbAR8BWwEfAV8BnwDhAN0AnwDdAJsA4QAhAR8B4QAfAd0AGwHZAN0AGwHdAB8B2QCXAJsA2QCbAN0AIQHhAOUAIQHlACUB4QCfAKMA4QCjAOUApwDpAOUApwDlAKMA6QApASUB6QAlAeUApQFlAWcBpQFnAacBZQEhASUBZQElAWcBKQFrAWcBKQFnASUBawGrAacBawGnAWcBMQFzAW8BMQFvAS0BcwGzAa8BcwGvAW8BqwFrAW8BqwFvAa8BawEpAS0BawEtAW8BrwDvAO0ArwDtAKsA7wAxAS0B7wAtAe0AKQHpAO0AKQHtAC0B6QCnAKsA6QCrAO0AMQHvAPUAMQH1ADMB7wCvALEA7wCxAPUAtwD3APUAtwD1ALEA9wA5ATMB9wAzAfUAswFzAXUBswF1AbUBcwExATMBcwEzAXUBOQF3AXUBOQF1ATMBdwG7AbUBdwG1AXUBPQF7AXkBPQF5ATsBewG3Ab0BewG9AXkBuwF3AXkBuwF5Ab0BdwE5ATsBdwE7AXkBuwD7APkAuwD5ALkA+wA9ATsB+wA7AfkAOQH3APkAOQH5ADsB9wC3ALkA9wC5APkALwL1AfcB9QG3AbkB9QG5AfcBsQHxAfcBsQH3AbkB8QEvAvcBJwI8AisCPAIvAisCqQHnAe0BqQHtAa0B5wEnAisC5wErAu0BLwLxAe0BLwLtASsC8QGxAa0B8QGtAe0BJwLnAeMBJwLjASMC5wGpAaMB5wGjAeMBoQHhAeMBoQHjAaMB4QEfAiMC4QEjAuMBPAInAiMCHwI8AiMCFwI8AhsCPAIfAhsClwHZAdsBlwHbAZsB2QEXAhsC2QEbAtsBHwLhAdsBHwLbARsC4QGhAZsB4QGbAdsBFwLZAdMBFwLTARMC2QGXAZUB2QGVAdMBjwHPAdMBjwHTAZUBzwEPAhMCzwETAtMBPAIXAhMCDwI8AhMCBwI8Ag0CPAIPAg0CiQHHAcsBiQHLAY0BxwEHAg0CxwENAssBDwLPAcsBDwLLAQ0CzwGPAY0BzwGNAcsBBwLHAcUBBwLFAQUCxwGJAYUBxwGFAcUBgwHDAcUBgwHFAYUBwwEBAgUCwwEFAsUBPAIHAgUCAQI8AgUCAwI8Av8BPAIBAv8BfwG/AcEBfwHBAYEBvwEDAv8BvwH/AcEBAQLDAcEBAQLBAf8BwwGDAYEBwwGBAcEBAwK/AckBAwLJAQsCvwF/AYcBvwGHAckBiwHNAckBiwHJAYcBzQEJAgsCzQELAskBPAIDAgsCCQI8AgsCFQI8AhECPAIJAhECkwHVAdEBkwHRAZEB1QEVAhEC1QERAtEBCQLNAdEBCQLRARECzQGLAZEBzQGRAdEBFQLVAdcBFQLXARkC1QGTAZkB1QGZAdcBnQHdAdcBnQHXAZkB3QEdAhkC3QEZAtcBPAIVAhkCHQI8AhkCJQI8AiECPAIdAiECpQHlAd8BpQHfAZ8B5QElAiEC5QEhAt8BHQLdAd8BHQLfASEC3QGdAZ8B3QGfAd8BJQLlAekBJQLpASkC5QGlAacB5QGnAekBqwHrAekBqwHpAacB6wEtAikC6wEpAukBPAIlAikCLQI8AikCMwI8AjECPAItAjECswHzAe8BswHvAa8B8wEzAjEC8wExAu8BLQLrAe8BLQLvATEC6wGrAa8B6wGvAe8BMwLzAfkBMwL5ATUC8wGzAbUB8wG1AfkBuwH7AfkBuwH5AbUB+wE3AjUC+wE1AvkBPAIzAjUCNwI5AjwCNwI8AjUCLwI8AjkCtwH1Af0BtwH9Ab0B9QEvAjkC9QE5Av0BNwL7Af0BNwL9ATkC+wG7Ab0B+wG9Af0B`},{role:`footplate`,nv:524,nt:1044,pos:`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`,idx:`pADLAKMAIAGkAPIAmwGjAX4B9gGkAH4B9wAbAUAB9wBAAYIB9gGhAYIBggGkAXwBzQD3AKAAXQCgAPcA9wCeAJ8AVQBdAC0AnwAtAF0AggF8AZ4A9wCCAZ4A9wCfAF0ALQCfAFwApQGwAaMBsAGvAaIBsAGiAaMBrwGuAaIBfgGjAaIBrgGtAfYBrgH2AaIBrQGsAfYBfgGiAfYBrAGrAfYBqwGqAfYBqgHZAfYB9gHZAccB9gGpAaEBqQGoAaEBqAGnAaABqAGgAaEBggGhAaABpwGmAaQBpwGkAaABggGgAaQBfAGeAYABgAFuAXwBbgFeAVwBbgFcAXwBngB8AVwBXgFIAUcBXgFHAVwBSAEhAR8BSAEfAUcBngBHAR8BngBcAUcBIQHzAPEAIQHxAB8B8wDOAMkA8wDJAPEAngDxAMkA8QCeAB8BzgCmAJ0AzgCdAMkApgB9AHsApgB7AJ0AnwCeAJ0AnwCdAHsAngDJAJ0AfQBfAF4AfQBeAHsAXwBaAF4AXACfAF4AXABeAFoAnwB7AF4AXAAAABMAAAABABMAAQACABMALQBcABMAAgADABQAAgAUABMAAwBDABQALQAUAEMALQATABQAVQAtAEMAUAB+AF0AXQBVAFAAfgCnAKEAfgChAF0ApwDPAMoApwDKAKEAzQCgAKEAzQChAMoAoABdAKEAzwD0APgAzwD4AMoA9AAZARsB9AAbAfgAGwH3APgA9wDNAMoA9wDKAPgAGQE8AUABGQFAARsBPAFbAUABggFAAVsB9gGCAVsBpAD2AZ0BnQE9ARwBPQEaARwBpACdARwBGgH1APkAGgH5ABwB9QDQAMsA9QDLAPkAywCkAPkApAAcAfkA0ACoAKIA0ACiAMsAqAB/AHwAqAB8AKIAowCiAHwAowDLAKIAfwBgAEQAfwBEAHwAYABZAEQARACjAHwARABZAFIARABSABUAFQAEABYARAAVABYABAAFABYABQAGABcABQAXABYAowBEABYAowAWABcABgAHABIABgASABcAowAXABIAEgBXAFEAUQCAAKMAowASAFEAgACpAKUAgAClAKMAqQDRAMwAqQDMAKUApAClAMwApACjAKUA0QD2APIA0QDyAMwA9gAiASAB9gAgAfIA8gCkAMwAIgFJASABSQFfAV0BSQFdASABpAAgAV0BXwFvAW0BXwFtAV0BbwGBAX8BbwF/AW0BfgFtAX8BfgGkAF0BfgFdAW0BgQGPAZsBgQGbAX8BmwF+AX8BGAHuAJ0B7gDtABcBbAFZAX0B7QDuAMYA7gAYAXkA7gB5AMYAUgAYAVMAFgHvAMcAFgHHAFMAGAEWAVMAVwBTAFsA9gGjAVkBWQFsARYBWQEWARgBnQH2AVkBWQEYAZ0BGAFSAHkANgE7AVoBfAE7ATkBOwGbAJoAOwF8AVoB0AFaAXwBwwA7AZoA/wEAAvYB9gELAscB0AH1AfYB9QEKAvYBCwL2AQoC0AEIAgkC9QHQAQkCfAH0AdAB9AHzAQcCCALQAfQBCAL0AQcC9AF8AfMBnwGNAZoBOQFqAXoBOQF6AXwBjQGfAXwBjQF8AXoBOQE3AVcBagE5AVcBOwHqABIB6gDmAA4B6gAOARIBNwE5ARIBNwESAQ4BOQE7ARIBwwCZAMIAwwDCADsBmQCVAL4AmQC+AMIA5gDqAMIA5gDCAL4A6gA7AcIAwwBcAHcAlQCZAHcAmQDDAHcAwwBGAEUAmgBNAEwAmgBMAMMATQBIAEcATQBHAEwARgDDAEwARgBMAEcASABNAFYATQCaAFYAVQCaAFAAVQBWAJoAmwCWAHUAmwB1AJoAOwHrAMQA6wDnAL8A6wC/AMQAlgCbAMQAlgDEAL8AmwA7AcQANgEUATsBNgEPARQB5wDrABQB5wAUAQ8B6wA7ARQB7gBOAZ0BTgEzAU0BnQFOAU0B7QDsABUB7QAVARcB7ADoABAB7AAQARUBMwFOARUBMwEVARABTgHuABcBTgEXARUBeQCcAMUAeQDFAMYAnACXAMAAnADAAMUA6ADsAMUA6ADFAMAA7ADtAMYA7ADGAMUAlwCcAHgAnAB5AFIAnABSAHgAUgBKAEkAUgBJAFQATgBPAEsASgBSAE4ASgBOAEsAUgBTAE4ATgBTAFcATgBXAE8AUwB6AFsAegCYAHYAWwB6AHYA7wDwAMgA7wDIAMcA8ADpAMEA8ADBAMgAmAB6AMgAmADIAMEAegBTAMcAegDHAMgAFgE6ARMBOgE4AREBOgERARMB6QDwABMB6QATAREB8ADvABYB8AAWARMBbAFrAVgBOAE6AWwBOAFsAVgBOgEWAWwBWQGOAX0BjgGcAXsBjgF7AX0BawFsAX0BawF9AXsBowGcAVkBjgFZAZwBsAGlAb8BsAG/Ab4BpQHPAb8BzwHOAb4BzwG+Ab8BzgHPAeEBzgHhAeABzwGlAeEBpQHyAeEB8gHxAeAB8gHgAeEB8QHyAQYC8QEGAgUC8gGlAQYCpQGjAQYCowEFAgYCrgGvAb0BrgG9AbwBrwGwAb4BrwG+Ab0BzgHNAb0BzgG9Ab4BzQHMAbwBzQG8Ab0BzAHNAd8BzAHfAd4BzQHOAeABzQHgAd8B8QHwAd8B8QHfAeAB8AHvAd4B8AHeAd8B7wHwAQQC7wEEAgMC8AHxAQUC8AEFAgQCowH2AQQCowEEAgUC9gEDAgQCrAGtAbsBrAG7AboBrQGuAbwBrQG8AbsBzAHLAbsBzAG7AbwBywHKAboBywG6AbsBygHLAd0BygHdAdwBywHMAd4BywHeAd0B7wHuAd0B7wHdAd4B7gHtAdwB7gHcAd0B7QHuAQIC7QECAgEC7gHvAQMC7gEDAgIC9gECAgMC9gEBAgICqgGrAbkBqgG5AbgBqwGsAboBqwG6AbkBygHJAbkBygG5AboByQHIAbgByQG4AbkByAHJAdsByAHbAdoByQHKAdwByQHcAdsB7QHsAdsB7QHbAdwB7AHrAdoB7AHaAdsB6wHsAQAC7AHtAQEC7AEBAgAC9gEAAgEC2QGqAbgByAHZAbgB2QHIAdoB6wH/AdkB6wHZAdoB/wHrAQAC9gHZAf8BtwHHAdgBxwHqAdgB6gHHAf4B9gHHAdkBxwELAv4B9gHHAbcB9gG3AbYBxgHFAbYBxgG2AbcBxQHGAdcBxQHXAdYBxgG3AdgBxgHYAdcB6gHpAdcB6gHXAdgB6QHoAdYB6QHWAdcB6AHpAf0B6AH9AfwB6QHqAf4B6QH+Af0BCwIKAv0BCwL9Af4BCgL1AfwBCgL8Af0BqQH2AbUBqQG1AbQB9gG2AbUBxQHEAbUBxQG1AbYBxAHDAbQBxAG0AbUBwwHEAdUBwwHVAdQBxAHFAdYBxAHWAdUB6AHnAdUB6AHVAdYB5wHmAdQB5wHUAdUB5gHnAfsB5gH7AfoB5wHoAfwB5wH8AfsB9QEJAvsB9QH7AfwBCQIIAvoBCQL6AfsBpwGoAbMBpwGzAbIBqAGpAbQBqAG0AbMBwwHCAbMBwwGzAbQBwgHBAbIBwgGyAbMBwQHCAdMBwQHTAdIBwgHDAdQBwgHUAdMB5gHlAdMB5gHTAdQB5QHkAdIB5QHSAdMB5AHlAfkB5AH5AfgB5QHmAfoB5QH6AfkBCAIHAvkBCAL5AfoBBwLzAfgBBwL4AfkBpAGmAbEBpAGxAeIBpgGnAbIBpgGyAbEBwQHAAbEBwQGxAbIBwAHiAbEB4gHAAdEBwAHBAdIBwAHSAdEB5AHjAdEB5AHRAdIB4wHiAdEB4gHjAfcB4gH3AXwB4wHkAfgB4wH4AfcB8wF8AfcB8wH3AfgBfAGkAeIBfAGfAZ4BgAGeAZABgAGQAYMBngGSAZABkgGFAYMBkgGDAZABhQGSAZQBhQGUAYcBkgGeAZQBngGWAZQBlgGJAYcBlgGHAZQBiQGWAZgBiQGYAYsBlgGeAZgBnwGaAZgBnwGYAZ4BmgGNAYsBmgGLAZgBXgFuAXABXgFwAWABbgGAAYMBbgGDAXABhQFyAXABhQFwAYMBcgFiAWABcgFgAXABYgFyAXQBYgF0AWQBcgGFAYcBcgGHAXQBiQF2AXQBiQF0AYcBdgFmAWQBdgFkAXQBZgF2AXgBZgF4AWgBdgGJAYsBdgGLAXgBjQF6AXgBjQF4AYsBegFqAWgBegFoAXgBIQFIAUsBIQFLASYBSAFeAWABSAFgAUsBYgFPAUsBYgFLAWABTwEpASYBTwEmAUsBKQFPAVEBKQFRAS0BTwFiAWQBTwFkAVEBZgFTAVEBZgFRAWQBUwExAS0BUwEtAVEBMQFTAVUBMQFVATQBUwFmAWgBUwFoAVUBagFXAVUBagFVAWgBVwE3ATQBVwE0AVUBzgDzAPoAzgD6ANIA8wAhASYB8wAmAfoAKQH+APoAKQH6ACYB/gDWANIA/gDSAPoA1gD+AAIB1gACAdoA/gApAS0B/gAtAQIBMQEGAQIBMQECAS0BBgHeANoABgHaAAIB3gAGAQoB3gAKAeIABgExATQBBgE0AQoBNwEOAQoBNwEKATQBDgHmAOIADgHiAAoBfQCmAKoAfQCqAIEApgDOANIApgDSAKoA1gCuAKoA1gCqANIArgCFAIEArgCBAKoAhQCuALIAhQCyAIkArgDWANoArgDaALIA3gC2ALIA3gCyANoAtgCNAIkAtgCJALIAjQC2ALoAjQC6AJEAtgDeAOIAtgDiALoA5gC+ALoA5gC6AOIAvgCVAJEAvgCRALoAWgBfAGEAXwB9AIEAXwCBAGEAhQBlAGEAhQBhAIEAZQBaAGEAWgBlAGkAZQCFAIkAZQCJAGkAjQBtAGkAjQBpAIkAbQBaAGkAWgBtAHEAbQCNAJEAbQCRAHEAlQB3AHEAlQBxAJEAdwBcAFoAdwBaAHEAIgBcADgAXADDADgAAABcAAgAAAAIAAkAXAAiAAgAIgAYAAgAGAAZAAkAGAAJAAgAGQAYACMAGQAjACQAGAAiADgAGAA4ACMAOAAuACMALgAvACQALgAkACMALwAuADkALwA5ADoALgA4ADkAwwBFADkAwwA5ADgARQBGADoARQA6ADkAAgABAAoAAgAKAAsAAQAAAAkAAQAJAAoAGQAaAAoAGQAKAAkAGgAbAAsAGgALAAoAGwAaACUAGwAlACYAGgAZACQAGgAkACUALwAwACUALwAlACQAMAAxACYAMAAmACUAMQAwADsAMQA7ADwAMAAvADoAMAA6ADsARgBHADsARgA7ADoARwBIADwARwA8ADsAQwADAAwAAwACAAsAAwALAAwAGwAcAAwAGwAMAAsAHABDAAwAQwAcACcAHAAbACYAHAAmACcAMQAyACcAMQAnACYAMgBDACcAQwAyAD0AMgAxADwAMgA8AD0ASABWAD0ASAA9ADwAVgBDAD0AVgBVAEMAUACaAFgAfgBQAGIAfgBiAIIAUABYAGIAWABmAGIAZgCGAIIAZgCCAGIAhgBmAGoAhgBqAIoAZgBYAGoAWABuAGoAbgCOAIoAbgCKAGoAjgBuAHIAjgByAJIAbgBYAHIAmgB1AHIAmgByAFgAdQCWAJIAdQCSAHIAzwCnAKsAzwCrANMApwB+AIIApwCCAKsAhgCvAKsAhgCrAIIArwDXANMArwDTAKsA1wCvALMA1wCzANsArwCGAIoArwCKALMAjgC3ALMAjgCzAIoAtwDfANsAtwDbALMA3wC3ALsA3wC7AOMAtwCOAJIAtwCSALsAlgC/ALsAlgC7AJIAvwDnAOMAvwDjALsAGQH0APsAGQH7AB0B9ADPANMA9ADTAPsA1wD/APsA1wD7ANMA/wAjAR0B/wAdAfsAIwH/AAMBIwEDAScB/wDXANsA/wDbAAMB3wAHAQMB3wADAdsABwErAScBBwEnAQMBKwEHAQsBKwELAS8BBwHfAOMABwHjAAsB5wAPAQsB5wALAeMADwE2AS8BDwEvAQsBWwE8AT4BPAEZAR0BPAEdAT4BIwFBAT4BIwE+AR0BQQFbAT4BWwFBAUMBQQEjAScBQQEnAUMBKwFFAUMBKwFDAScBRQFbAUMBWwFFAVoBRQErAS8BRQEvAVoBNgFaAS8BWgHQAVsB0AH2AVsBGgE9AT8BGgE/AR4BPQGdAT8BnQFCAT8BQgEkAR4BQgEeAT8BJAFCAUQBJAFEASgBQgGdAUQBnQFGAUQBRgEsASgBRgEoAUQBLAFGAUoBLAFKATABRgGdAUoBnQFNAUoBTQEzATABTQEwAUoB0AD1APwA0AD8ANQA9QAaAR4B9QAeAfwAJAEAAfwAJAH8AB4BAAHYANQAAAHUAPwA2AAAAQQB2AAEAdwAAAEkASgBAAEoAQQBLAEIAQQBLAEEASgBCAHgANwACAHcAAQB4AAIAQwB4AAMAeQACAEsATABCAEwAQwBMwEQAQwBMwEMATABEAHoAOQAEAHkAAwBfwCoAKwAfwCsAIMAqADQANQAqADUAKwA2ACwAKwA2ACsANQAsACHAIMAsACDAKwAhwCwALQAhwC0AIsAsADYANwAsADcALQA4AC4ALQA4AC0ANwAuACPAIsAuACLALQAjwC4ALwAjwC8AJMAuADgAOQAuADkALwA6ADAALwA6AC8AOQAwACXAJMAwACTALwAWQBgAGMAYAB/AIMAYACDAGMAhwBnAGMAhwBjAIMAZwBZAGMAWQBnAGsAZwCHAIsAZwCLAGsAjwBvAGsAjwBrAIsAbwBZAGsAWQBvAHMAbwCPAJMAbwCTAHMAlwB4AHMAlwBzAJMAeABSAFkAeABZAHMAUgBUABUABAAVAA0ABAANAA4AFQAdAA0AHQAeAA4AHQAOAA0AHgAdACgAHgAoACkAHQAVACgAFQAzACgAMwA0ACkAMwApACgANAAzAD4ANAA+AD8AMwAVAD4AVABJAD4AVAA+ABUASQBKAD8ASQA/AD4ABgAFAA8ABgAPABAABQAEAA4ABQAOAA8AHgAfAA8AHgAPAA4AHwAgABAAHwAQAA8AIAAfACoAIAAqACsAHwAeACkAHwApACoANAA1ACoANAAqACkANQA2ACsANQArACoANgA1AEAANgBAAEEANQA0AD8ANQA/AEAASgBLAEAASgBAAD8ASwBPAEEASwBBAEAAEgAHABEAEgARAEIABwAGABAABwAQABEAIAAhABEAIAARABAAIQBCABEAQgAhACwAIQAgACsAIQArACwANgA3ACwANgAsACsANwBCACwANwA2AEEANwBBAEIATwBXAEIATwBCAEEAVwASAEIAUQBXAFsAgABRAGQAgABkAIQAUQBbAGQAWwBoAGQAaACIAIQAaACEAGQAiABoAGwAiABsAIwAaABbAGwAWwBwAGwAcACQAIwAcACMAGwAkABwAHQAkAB0AJQAcABbAHQAWwB2AHQAdgCYAJQAdgCUAHQA0QCpAK0A0QCtANUAqQCAAIQAqQCEAK0AiACxAK0AiACtAIQAsQDZANUAsQDVAK0A2QCxALUA2QC1AN0AsQCIAIwAsQCMALUAkAC5ALUAkAC1AIwAuQDhAN0AuQDdALUA4QC5AL0A4QC9AOUAuQCQAJQAuQCUAL0AmADBAL0AmAC9AJQAwQDpAOUAwQDlAL0AIgH2AP0AIgH9ACUB9gDRANUA9gDVAP0A2QABAf0A2QD9ANUAAQEqASUBAQElAf0AKgEBAQUBKgEFAS4BAQHZAN0AAQHdAAUB4QAJAQUB4QAFAd0ACQEyAS4BCQEuAQUBMgEJAQ0BMgENATUBCQHhAOUACQHlAA0B6QARAQ0B6QANAeUAEQE4ATUBEQE1AQ0BXwFJAUwBXwFMAWEBSQEiASUBSQElAUwBKgFQAUwBKgFMASUBUAFjAWEBUAFhAUwBYwFQAVIBYwFSAWUBUAEqAS4BUAEuAVIBMgFUAVIBMgFSAS4BVAFnAWUBVAFlAVIBZwFUAVYBZwFWAWkBVAEyATUBVAE1AVYBOAFYAVYBOAFWATUBWAFrAWkBWAFpAVYBgQFvAXEBgQFxAYQBbwFfAWEBbwFhAXEBYwFzAXEBYwFxAWEBcwGGAYQBcwGEAXEBhgFzAXUBhgF1AYgBcwFjAWUBcwFlAXUBZwF3AXUBZwF1AWUBdwGKAYgBdwGIAXUBigF3AXkBigF5AYwBdwFnAWkBdwFpAXkBawF7AXkBawF5AWkBewGcAYwBewGMAXkBmwGPAZEBmwGRAZkBjwGBAYQBjwGEAZEBhgGTAZEBhgGRAYQBkwGZAZEBmQGTAZUBkwGGAYgBkwGIAZUBigGXAZUBigGVAYgBlwGZAZUBlwGKAYwBlwGMAZkBnAGjAZkBnAGZAYwBmwGZAaMB`},{role:`bungee`,nv:249,nt:498,pos:`+QRCCVkjKARTCVkj/QNSCVkj8gQ5CVcjKARJCVcj/gRLCVcjxPxYCVMjEQNZCVYjbAFyCVQjkPpSCVAjHP96CVIjWAGVCVYjVf+UCVgjS/orCVYjnAUoCVYjuQNKCVIjU/pCCVQjMQRgCVYjgvx8CVIjCwCnCUUjVAQ6CU4jSAQ2CUAjbfocCT8jJvocCS0jxwUiCUUjvgJXCTgjMwB4CSwjYwKQCUQjBPo8CRsjEvpMCR4jqwUcCTQjqgRiCT4jOwF0CS0jcf6dCU4jtwVICUwjTPoiCScj+gQwCS4jmwNJCTIjl/tnCTEjoARbCS4jqfx7CSsjagChCS0jrgUsCSEjnQRACSkjKARJCSkjyQJhCSojuwRUCSojQ/tQCScjKQRcCSkjwftGCSwj6wNqCS0jWf5wCS8jZ/osCSkj+QRCCScjWPo+CSYjKARTCScjXwNjCScjeQKECSojoP6OCScjI/pPCREjmAU6CSYjMvo7CQEjsAVLCSwjL/olCQkj9gU7CRkjC/ohCRcjEPpQCbkiKvokCbciL/o7CbsizgVACfQi8gVLCcUi1AUoCdgi7wUdCe8i6AVRCfki/wUxCc0ixgVCCbciBPo8CZsiAvopCaci5QVECZIicgUqCUAi+gVDCbsiGfobCagicvpZCUEiywUaCY0i5AUkCY8idAU3CWIiyPpFCR0iQPs/CZwhK/pICa8iMwVrCREiQ/tUCaYhQfteCaYh+vo/CawhvvtlCTAhvPtuCTAhvftbCS4ht/t2CSwhuvtTCSohqPtLCSkhVgPTCTAgOfx2CbogN/x/CbkgOPxsCbggMvyHCbYgNfxkCbQgLPyNCbEgovxtCTkgzPx7CfAf7PyZCckf7wKvCfQftPyGCUQgsvyQCUMgs/x9CUIgwvyeCScghvydCT8geQH0CVIeHgVfCcchL/2WCc4fPf2wCbIfWf2HCZkfK/68Cdwe1wLOCesfc/6oCYwe4v3DCeIeVwEMCmUeEQHzCTUeIAEFCjoeEgHpCTMekgHQCZQed/+5CZEdgwD4CakdhADvCacdhAACCqgdiAAVCosdiADnCaMdYwDlCUgdDf/lCdsdwf6xCQ4e6v/6CRId6//xCRAd6/8EChAd7//pCQ0d7/8MCgwd9f/jCQcd9P8RCgYd/P/hCQAd+/8TCv8cAgDjCfkcAgARCvgcCADpCfMcBwAMCvMcDADxCe8cCwAECu8cDQD6Ce4cygG3CVUbEQDoCdccYwLWCYwa4QDHCUActgDdCWgchAHMCaQbKQHXCfkbbAC5CXcciQLICaka/wHUCSsbewLRCbQavgHmCVMbIgLJCccaLgOpCdUZtgO8CYgZbASiCdMYUwPTCd4ZCgScCRgZBATVCRwZiAO0CXAZ1QWtCV8XJfqRCYgXJvqHCYcXJvqaCYcXKvp/CYQXKvqiCYMXMPp6CX4XL/qoCX0XN/p4CXcXNvqqCXYXPvp6CXAXPfqoCXAXQ/p/CWsXQ/qiCWoXGfqrCUgXR/qHCWcXR/qaCWYXSPqRCWUX5QV1CUwX1gWlCT8X/wWfCUEX/wWLCVIX4QWnCREXxwWKCUQXC/qXCWkXN/qMCU4X1gWBCRsXEPp4CVoXKPqaCREXDvqtCToX9PmQCQsXIvp/CSEXBgaXCQUX6gWGCc4W7gWnCfEWsQWgCdcWBvp4CQYXvgWECeUWygVxCc0WyvujCdEWO/zKCdoWywPPCdYWRfqACd8W0fvGCdgW/P4ICtcW3f3+CdoWDQEfCtoWUPqYCdwW4APzCc8WuvzoCdYWuwH1Cc8W6f4dCtcWL/3OCcsWVPvCCc8WlgPLCbYWCgD/Cb4WUfqnCcUWGPqpCd8Wrf3cCbQWRP4cCssWJvqDCcAWVvp0CbkW9fvbCcEWegWtCbAWsgEnCsEWsgV2CbMWPfuWCbEWT/0ACqwWGQERCqUWUvqaCakWzfzNCawWsAWVCakW8gIACqkWOP7+CagWS/8rCq0W`,idx:`QgBYAFIAQgBSAEwAQwBYAEQATABSAFwATABcAE0ATQBcAFEAUQBXAEMAQwBXAFYAQwBWAFgAVgBaAFsAVgBbAFgAWABbAFIAUgBsAFwAXABXAFEAVwBaAFYAWgBdAF4AWgBeAFsAWwBeAGAAWwBgAFIAUgBgAHIAUgByAGwAXABsAGsAXABrAGIAXABiAFcAVwBiAGEAVwBhAF8AVwBfAF0AVwBdAFoAXQBkAGUAXQBlAF4AXgBlAGcAXgBnAGAAYABnAGkAYABpAHIAcgB7AGwAawBqAGIAYgBqAGgAYgBoAGEAYQBoAGYAYQBmAF8AXwBmAGQAXwBkAF0AZABuAG8AZABvAGUAZQBvAHEAZQBxAGcAZwBxAGkAaQBxAHIAbAB7AGsAagB3AGgAaAB3AHAAaABwAGYAZgBwAG4AZgBuAGQAbgB1AHYAbgB2AG8AbwB2AHEAcQB2AHIAcgB2AHsAawB3AGoAcAB3AHUAcAB1AG4AdQB4AHYAewCJAGsAawCJAHcAdwB4AHUAeACIAHYAdgCIAHsAiQB6AHcAdwB6AHgAeACeAIgAiQCBAHoAegCBAHgAeACBAJ4AewCIAIkAiACeAJsAiACbAKEAiAChAIkAiQChAIEAgQCdAJ4AnQCgAJ4AmwCcAKEAoQCaAIEAgQCaAJ0AmwCeAKUAnQCfAKAAmwClAJwAnQCaAJ8AnwCiAKMAnwCjAKAAoACjAKUAoAClAJ4AnACmAKEAmgCiAJ8AogCkAKMAowCkAKUApQCsAJwApgCnAKEAoQCnAJoAmgCrAKIAogCqAKQApACqAKUApQCqAKwApgCcAKcApwCrAJoAogCoAKoAnACtAKcAqwCpAKgAqwCoAKIAqACsAKoAnACsAK0ApwCtAKsAqACpAKwArADBAK0AqQDDAKwArADDAK4ArACuAMEAwQCrAK0AwQDFAKsAqwDFAMAAqwDAAKkAqQDAAMMAwwDCAK4ArgDCAMEAwgDEAMEAwQDEAMUAxQDIAMAAyADUAMAAxQDEAMgAzgDQAMIAwgDQAMQAwwDOAMIAwADUAM8AwADPAMMAwwDPAM4A0wDUAMgAzgDPANAA0ADRAMQAxADTAMgAzwD1ANAA1ADvAM8AxADRANMA9QDtANAA0ADtANEA7wD1AM8A7QDeANEA0wDRANcA0wDXANQA1ADXAO8A7wDkAPUA3gDXANEA1wDkAO8A9QD2AO0A9gDeAO0A3gDcANcA5AD2APUA9gDuAN4A3ADgANcA1wDgAOQA5ADyAPYA9gDyAO4A7gDcAN4A4ADlAOQA5ADlAPIA8gD4AO4A3ADaAOAA4ADaAOUA7gD4ANwA3AD4AOEA3ADhANoA+ADpAOEA8gDlAPcA8gD3APgA4QDbANoA2gDoAOUA5QDoAPcA4QDpANsA+ADxAOkA2gDiAOgA9wDxAPgA6QDfANsA6ADiAPQA6ADxAPcA8QDzAOwA8QDsAOkA6QDsAN8A3wDWANsA2wDWAOIA2wDiANoA4gDwAPQA6AD0APEA7ADjAN8A3wDjANkA3wDZANYA1gDVAOIA4gDVAPAA8ADzAPQA9ADzAPEA8wDmAOwA7ADmAOMA4wDdANkA2QDdANUA2QDVANYA4wDmAN0A1QDrAPAA1QDdANgA2ADrANUA8ADrAPMA6wDqAPMA6gDnAPMA8wDnAOYA2ADSAOsA5gDnAN0A6wDSAOoA6gDSAMwA6gDMAOcA3QDKANgA5wDKAN0AygDNANgAzADLAOcA2ADNANIAzQDJANIA5wDLAMoA0gDJAMwAygDHAM0AyQDGAMwAzADGAMsAygDLAMcAxwDJAM0AywC8AMcAywDGALwAxgCvALEAxgCxALMAxgCzALUAxgC1ALwAvAC1ALcAvAC3ALkAvAC5ALsAvAC7AL4AvAC+AL8AvAC/AMcAxwC/AL0AxwC9ALoAxwC6ALgAxwC4AMkAyQC4ALYAyQC2ALQAyQC0ALIAyQCyALAAyQCwAK8AyQCvAMYArwCKAIwArwCMALEAsQCMAI4AsQCOALMAswCOAJAAswCQALUAtQCQAJIAtQCSALcAtwCSAJQAtwCUALkAuQCUAJYAuQCWALsAuwCWAJgAuwCYAL4AvgCYAJkAvgCZAL8AvwCZAJcAvwCXAL0AvQCXAJUAvQCVALoAugCVAJMAugCTALgAuACTAJEAuACRALYAtgCRAI8AtgCPALQAtACPAI0AtACNALIAsgCNAIsAsgCLALAAsACLAIoAsACKAK8AigCCAIQAigCEAIwAjACEAIUAjACFAI4AjgCFAJAAkACFAJIAkgCFAJQAlACFAJYAlgCFAIcAlgCHAJgAmACHAJkAmQCHAJcAlwCHAJUAlQCHAJMAkwCHAJEAkQCHAI8AjwCHAIYAjwCGAI0AjQCGAIMAjQCDAIsAiwCDAIIAiwCCAIoAggB9AH4AggB+AIQAhAB+AIUAhQB+AHwAhQB8AHMAhQBzAIcAhwBzAIAAhwCAAIYAhgCAAH8AhgB/AIMAgwB/AH0AgwB9AIIAfQB8AH4AfwCAAHwAfwB8AH0AfABjAHMAgABtAHkAgAB5AHwAfAB5AGMAgABzAG0AYwB0AHMAcwB0AG0AeQBZAGMAdABPAG0AbQBPAFUAbQBVAHkAYwBZAHQAeQBVAFkAWQBOAHQAVQBGAFkAWQBGAE4ATgBUAHQAdABUAFMAdABTAE8AVQBPAEsAVQBLAEYATgBQAFQATwBTAEcATwBHAEsAUABKAFQASwBJAEYASgBIAFQAVABIAFMARwBFAEsATgBGAFAASwBFAEkAUwBIAEcASQBAAEYARgBAAFAAUABAAEoASgBAAEgARQA+AEkASAAqAEcAQAAYAEgARwAqAEUAKgA+AEUAPgAiAEkASQAiAEAAQAAiABgASAAeACoAKgA8AD4AGAAeAEgAIgAOABgAPAA1AC4APAAuAD4APgAuAB8APgAfACIAIgAFAAAAIgAAAA4ADgAAAAMAGAAOABUAGAAVAB4AHgAVACQAHgAkACoAKgA1ADwALgAnAB8AAwAUAA4ADgAUABUAJAArACoAKgArADUANQA3ADAANQAwAC4ALgAwACcAHwAbABEAHwARACIAIgARAAUABQARAAEABQABAAAAAAABAAQAAAAEAAMAAwAEAA8AAwAPABQAFAAPABUAFQAlACQAJAAlACwAJAAsACsAKwAsADcAKwA3ADUANwA4ADIANwAyADAAMAAyACcAJwAyAB8AHwAyABsAEQACAAEAAQACAAQABAACAA8AJQAtACwALAAtADgALAA4ADcAMgA5ABsAGwALABEAAgAHAA8ADwAHABUAFQAHABkAFQAZACUAJQAZAC0AOAA5ADIAEQALAAcAEQAHAAIALQA5ADgABwALAAgABwAIABkAGQAIACAAGQAgAC0ALQAgACkALQApADkAOQApABsAGwApAAsACAAaACAAIAAaACkAKQATAAsACAALAAoACAAKABoAGgA6ACkAEwAMAAsACwAMAAoACgAzABoAGgAzADoAKQA6ACEAKQAhABMAEwAhAAwADAAhAAoACgAGADMAOgAoACEAIQASAAoAIQAoABIAEgAGAAoAMwAoADoAEgAJAAYABgAxADMAMwAxACgAKAAvACYABgAWADEAMQAvACgAKAAmABIACQANAAYAMQA2AC8ALwA2ACYAJgAJABIACQAQAA0AFgA0ADEAMQA0ADYAJgA2AAkABgANABYAFgAjADQADQAXABYAFgAXACMANAAjADYANgA7AAkACQA7AB0ACQAdABAAHQAcABAAEAAcAA0AIwA/ADYADQAcAEEADQBBABcAPwA9ADYANgA9ADsAFwA/ACMAFwBBAD8APwBEAD0APQBEAFgAPQBYADsAOwBYAEIAOwBCAB0AHQBCAEwAHQBMABwAHABMAE0AHABNAEEAQQBNAFEAQQBRAEMAQQBDAD8APwBDAEQA`},{role:`rudder`,nv:240,nt:476,pos:`8//l+TdT+f/l+TdTAADl+TdTBwDl+TdTDQDl+TdT7v/k+TZTEgDk+TZT7P/i+TFTFADi+TFT8//a+jBT+f/a+jBTAADa+jBTBwDa+jBTDQDa+jBT7v/Z+i5TEgDZ+i5T7P/V+ipTFADV+ipT8/9R+SdT+f9R+SdTAABR+SdTBwBR+SdTDQBR+SdT7v9R+SZTEgBR+SZT8/+K/CZT+f+K/CZTAACK/CZTBwCK/CZTDQCK/CZT7v+J/CRTEgCJ/CRT7P9S+SJT7P+G/B5TFACG/B5T8/9N/hdT+f9N/hdTAABN/hdTBwBN/hdTDQBN/hdT7v9N/hVTEgBN/hVT7P9M/g9TFABM/g9T7P9///NP8/9//wJT+f9//wJTAAB//wJTBwB//wJTDQB//wJT7v9//wBTEgB//wBT7P9///lSFAB///lS8/80AO9S+f80AO9SAAA0AO9SBwA0AO9SDQA0AO9S7v80AO1SEgA0AO1S8//E+OtS+f/E+OtSAADE+OtSBwDE+OtSDQDE+OtS7v/F+OpSEgDF+OpS7f+nAOJS7P/I+OZSFADI+OZS7P9+AN9S7P8E+DpSFACoANpSFAAv/9RQFABS+SJTDQCsAOJS8/9N+JdS/v9N+JdSDQBN+JdS7v9P+JZSEgBP+JZS7P9T+JNSFABT+JNSFACgAEhS7v+lAJFS8/+nAJFSFAAE+DpS8//99zxSDQD99zxS7v//9zxSEgD/9zxS7P+aADRSFACWAOhR7v+gADNS8/+jADJS/f+jADJSDgCrAN5S7v+bALVR8/+dALRR/v+dALRRDQCdALRR7P/v93FRFADv93FR7v/p93BREgDp93BR8//o93BRDQDo93BRFACWAE9R7P+PAClR7v+VAChREgCVAChR8/+XAChR+f+XAChRAACXAChRBwCXAChRDQCXAChR7P8x+P1QFAAx+P1Q7v8t+PtQEgAt+PtQ8/8s+PpQ+f8s+PpQAAAs+PpQBwAs+PpQDQAs+PpQ7P+UALZR7P+JAIhQFACJAIhQ7v+QAIdQEgCQAIdQ8/+SAIZQ+f+SAIZQAACSAIZQBwCSAIZQDQCSAIZQ7P+r+HtQFACr+HtQ7v+n+HhQEgCn+HhQ8/+m+HdQ+f+m+HdQAACm+HdQBwCm+HdQDQCm+HdQ7P87+QtQFAA7+QtQ7v84+QZQEgA4+QZQ8/83+QVQ+f83+QVQAAA3+QVQBwA3+QVQDQA3+QVQ7P+EAMpPFACEAMpP7P/C+cpPFADC+cpP7v+KAMlPEgCKAMlP8/+MAMlP+f+MAMlPAACMAMlPBwCMAMlPDQCMAMlP7v/A+cVPEgDA+cVP8/+/+cNP+f+/+cNPAAC/+cNPBwC/+cNPDQC/+cNP7P+u+oFPFACu+oFP7v+t+ntPEgCt+ntP8/+t+nlP+f+t+nlPAACt+nlPBwCt+nlPDQCt+nlP7P9+ABJPFAB+ABJP7v+FABFPEgCFABFP8/+HABBP+f+HABBPAACHABBPBwCHABBPDQCHABBPAADV99tR7P9u/PdOFABu/PdO7v9t/PFOEgBt/PFO8/9t/O9O+f9t/O9OAABt/O9OBwBt/O9ODQBt/O9OFAB6AIJO7v+BAIBOEgCBAIBOAwCDAIBODQCDAIBOFAB3AB9O7P9B/mtOFABB/mtO7v9B/mROEgBB/mRO8/9B/mJO+f9B/mJOAABB/mJOBwBB/mJODQBB/mJO7P96AIJO7v9+AB1O8/+DAH5ODQB/ABBO7P9p/xhOFABp/xhO7v9p/xBOEgBp/xBO8/9p/w5O+f9p/w5OAABp/w5OBwBp/w5ODQBp/w5O7v96AMtN7P8OAO1NFAAOAO1NEgANAOZN8/8NAORN+f8NAORNAAANAORNBwANAORNDQANAORN7P9bANlN7P92AP1NDwB9AMdN`,idx:`DwARACIADwAiAB8AEQBLAEoAEQBKACIASgArACIAKwApAB8AKwAfACIAeAB2AGcAeABnAGkAdgC+AGcAvgBpAGcAUQBbAFcAUQBXAFMAWwC+AFcAlACSAIkAlACJAIsAkgC+AIkAvgB2AIkAdgB4AIsAdgCLAIkASgA1ACsASgBJADUAPAAzADUAPAA1AEkAMwApACsAMwArADUAGABLAAgAGAAIAAYASwARAAgAEQAPAAYAEQAGAAgArwDCAMAArwDAAK0AwgDRAM8AwgDPAMAAzQC+AMAAzQDAAM8AvgCtAMAA5wDvAOYAzQDmAO8AXQBKAGwAXQBUAEoAuAC2AMgAuADIAMoAtgBKAMgAzQDvAMoAzQDKAMgASgBXAL4ArwCtAJ0ArwCdAKYArQC+AJ0AvgCSAJ0AkgCUAKYAkgCmAJ0ASgBLAFcAGABDAEYAGABGAEsAQwBRAFMAQwBTAEYAVwBLAEYAVwBGAFMAvgDNAEoA0QDeANwA0QDcAM8A3gDnAOYA3gDmANwAzQDcAOYAzQDPANwASgCAAGwAgACCAG8AgABvAGwAXQBsAFQASgC2AJsAtgC4AJ8AtgCfAJsAggCAAJsAggCbAJ8AgABKAJsAzQDIAEoASQBKAFQATAA8AEkALAAhACoALAAgABAALAAQACEADgAeACEADgAhABAAHgAoACoAHgAqACEAvgB1AGYAdwBoAGYAdwBmAHUAaAC+AGYAvgBaAEgAUABSAEgAUABIAFoAvgCIAHUAvgCRAIgAkwCKAIgAkwCIAJEAigB3AHUAigB1AIgAOwBHADQAOwA0ADIARwAsADQALAAqADQAKgAoADIAKgAyADQAIAAHABAAFwAFAAcAFwAHACAABQAOABAABQAQAAcAvgDOAL8AzgDQAMEAzgDBAL8ArgCsAL8ArgC/AMEArAC+AL8A5ADlAO0A5QAsAO0A1wAsALUAtwDJANcAtwDXALUAyQDYAO4AyQDuANcAvgCcAJEAvgCsAJwArgClAJwArgCcAKwApQCTAJEApQCRAJwASABSAEUAUgBQAEIAUgBCAEUAFwAgAEUAFwBFAEIAIABIAEUAIAC+AEgAvgAgACwA7QDXAO4A2ADkAO4ALADlANsA5QDkAN0A5QDdANsA0ADOANsA0ADbAN0AzgC+ACwAzgAsANsA7QDuAOQAYgBuAG0AYgBtAH4AbgCBAH8AbgB/AG0ALAB+AG0ALABtAH8AVQBeAFwAVQBcAEQAXgBiAH4AXgB+AFwAfgAsAFwALABEAFwAgQCeAJoAgQCaAH8AngC3ALUAngC1AJoALACaALUALAB/AJoARAAsAEcA1wDtACwARwA7AEQADwAfAB0ADwAdAA0AHwApACcAHwAnAB0AJgAcAB0AJgAdACcAHAAMAA0AHAANAB0ADAAcABsADAAbAAsAHAAmACUAHAAlABsAJAAaABsAJAAbACUAGgAKAAsAGgALABsACgAaABkACgAZAAkAGgAkACMAGgAjABkAKAAeABkAKAAZACMAHgAOAAkAHgAJABkAeABpAGsAeABrAH0AaQC+AGsAvgBqAGsAagB8AH0AagB9AGsAfABqAHsAagB6AHsAegBqAHkAvgBoAGoAaAB3AHkAaAB5AGoAvgBbAFkAWwBRAE8AWwBPAFkATgBZAE8AvgBZAFgAWQBOAE0AWQBNAFgAUABaAFgAUABYAE0AWgC+AFgAlACLAJAAlACQAJkAiwB4AH0AiwB9AJAAfACPAJAAfACQAH0AjwCYAJkAjwCZAJAAmACPAI4AmACOAJcAjwB8AHsAjwB7AI4AegCNAI4AegCOAHsAjQCWAJcAjQCXAI4AlgCNAIwAlgCMAJUAjQB6AHkAjQB5AIwAdwCKAIwAdwCMAHkAigCTAJUAigCVAIwAKQAzADEAKQAxACcAMwA8ADoAMwA6ADEAOQAwADEAOQAxADoAMAAmACcAMAAnADEAJgAwAC8AJgAvACUAMAA5ADgAMAA4AC8ANwAuAC8ANwAvADgALgAkACUALgAlAC8AJAAuAC0AJAAtACMALgA3ADYALgA2AC0AOwAyAC0AOwAtADYAMgAoACMAMgAjAC0AGAAGAAQAGAAEABYABgAPAA0ABgANAAQADAADAAQADAAEAA0AAwAVABYAAwAWAAQAFQADAAIAFQACABQAAwAMAAsAAwALAAIACgABAAIACgACAAsAAQATABQAAQAUAAIAEwABAAAAEwAAABIAAQAKAAkAAQAJAAAADgAFAAAADgAAAAkABQAXABIABQASAAAA0QDCAMcA0QDHANYAwgCvALQAwgC0AMcAswDGAMcAswDHALQAxgDVANYAxgDWAMcA1QDGAMUA1QDFANQAxgCzALIAxgCyAMUAsQDEAMUAsQDFALIAxADTANQAxADUAMUA0wDEAMMA0wDDANIAxACxALAAxACwAMMArgDBAMMArgDDALAAwQDQANIAwQDSAMMA7wDnAOwA6wDvAOwA7wDrAOoA6QDvAOoA7wDpAOgA5ADvAOgAuADKAMwAuADMAL0AygDvANoAygDaAMwA2gDLAMwAywC8AL0AywC9AMwAvADLALsA2QDLANoA2QC6ALsA2QC7AMsAugDZALkA2ADJANkA2ADZAO8AyQC3ALkAyQC5ANkArwCmAKsArwCrALQApgCUAJkApgCZAKsAmACqAKsAmACrAJkAqgCzALQAqgC0AKsAswCqAKkAswCpALIAqgCYAJcAqgCXAKkAlgCoAKkAlgCpAJcAqACxALIAqACyAKkAsQCoAKcAsQCnALAAqACWAJUAqACVAKcAkwClAKcAkwCnAJUApQCuALAApQCwAKcASQBUAGEAYQBWAEwAVQBEAEwAVQBMAFYAUQBDAEEAUQBBAE8AQwAYABYAQwAWAEEAFQBAAEEAFQBBABYAQABOAE8AQABPAEEATgBAAD8AQAAVABQAQAAUAD8AEwA+AD8AEwA/ABQAPgBOAD8ATgA+AD0ATgA9AE0APgATABIAPgASAD0AFwBCAD0AFwA9ABIAQgBQAE0AQgBNAD0A7wDZANoA5ADYAO8A5wDeAOMA5wDjAOwA3gDRANYA3gDWAOMA1QDiAOMA1QDjANYA4gDrAOwA4gDsAOMA6wDiAOEA6wDhAOoA4gDVANQA4gDUAOEA0wDgAOEA0wDhANQA4ADpAOoA4ADqAOEA6QDgAN8A6QDfAOgA4ADTANIA4ADSAN8A0ADdAN8A0ADfANIA3QDkAOgA3QDoAN8ATABJAGEAbABvAHQAbAB0AGUAbwCCAIcAbwCHAHQAhgBzAHQAhgB0AIcAcwBkAGUAcwBlAHQAZABzAHIAcwCGAIUAcwCFAHIAhABxAHIAhAByAIUAcQBkAHIAZABxAHAAZABwAGMAcQCEAIMAcQCDAHAAgQBuAHAAgQBwAIMAbgBiAGMAbgBjAHAAVABsAGUAVABlAGEAZABhAGUAYQBkAGAAYQBgAF8AYQBfAFYAYABkAGMAYABjAF8AYgBeAF8AYgBfAGMAXgBVAFYAXgBWAF8AggCfAKQAggCkAIcAnwC4AL0AnwC9AKQAvACjAKQAvACkAL0AowCGAIcAowCHAKQAhgCjAKIAhgCiAIUAowC8ALsAowC7AKIAugChAKIAugCiALsAoQCEAIUAoQCFAKIAhAChAKAAhACgAIMAoQC6ALkAoQC5AKAAtwCeAKAAtwCgALkAngCBAIMAngCDAKAAPABMADoATAA5ADoAOQBMAEQAOQBEADgARAA3ADgANwBEADYARAA7ADYA`},{role:`rudderhead`,nv:126,nt:248,pos:`7/+yBz9R7/+mBz5R7/+sBz9R7/+jBzxR7/+iBzNRnQClByxRnQCqBy1RnQCxBy1RVADuBxRRnAChBypRd//QBzRRQf+lByRRQf+rByRRmgChByFRQv+iByFRRf+hBxlRLgG/Bw9RQQGhB+1QQQGnB+1QPwGdB+pQOwGcB+NQvP7KB+1Qof6hB9xQof6oB9xQo/6eB9pQp/6dB9JQMwABCDZQzgGbB4ZQzQGXB4RQxwGWB35QGf6jB25QGf6cB25QG/6ZB2xQIf6YB2ZQfv8GCDlQOQDOBzRQJgLUBypQPAKUB/5POgKRB/xPMwKQB/hPnAHWB2lP4P3TBzNQsv2WB+BPtP2SB99PvP2RB9tPzP/OBxNQlgAKCElPkADZB1ZPFv4PCHhPAAEBCAZQhAKQB15PgQKNB11PoALeB/ROeQKMB1tPc/2SBz1PUf3dB6tOdf2PBzxPff2OBzpPXv4GCA1PtP7ZB8lPcAHsB5JP9f8HCIxPlAKPB7BOnAKQB7FOnwKUB7FOIAILCDBPav/mB9xNbP2RB49OY/2SB49OYf2WB49ObP7kB/9NVv7gB3VOtgEOCLFOggKZBwVOigKaBwNOhgLnB9hNEgAUCOtNhv2bB+VNfv2cB+JNe/2fB+JNcf8WCA9Ox//sBwtNqP4cCJFN9wDrBy9NlgHyBwhO+v0aCAJOGwAdCFNNRAKpB2RN2v3yBxlNSwKqB2BNbAEoCGRNzP2qB0dNGwDrB0dNxf2sB0NNw/2vB0JNigAfCBVNyv8eCANNCQAnCGZM5AG6B9RM5gG+B9FMIgLbBw5NOf67B8FMM/68B7tMMf7AB7lMWAHHB21MXAHJB2ZMxP7IB1xMwP7KB1VMlv71B2FMv/7NB1NMZwCpBw5PuwDRBydMvQDSBx9MZf/RBx5MvgDiBxxM9QD1ByRMvgDWBxxMvgDbBxxMY//TBxZMYv/WBxNMpv/7BwVMEADUBwxMEQDWBwRMEQDeBwFMEQDkBwJMEQDZBwFM`,idx:`PQAaAC4ALgBMAFAAUABMAGAAYQBgAFYAWgBhAF8AIgAIABoAQQAIACQAWgBBAEsAUgBhAFgAVQBSAFgANwAwAFUAIgAwACkAKAAvACMAXAAvACgATAAvAFwAXAAoAFMAVABTACgAUQBGAEIARgAtAEIALQBGAEcALQBHADsAGgA9ACIALgBQAD0AVgBgAEwAYQBWAF8AGgAIADEACABBADEAQQBIADEAQQBaAEgAYQBSAGAAOgBSAFUAOgBVADAAOwA6ADAAOwAwACIAWgBfAFMAMQBIADwASABUADwASABaAFQAWgBTAFQAPQAtACIAYABCAFAAUgA6AEYAYABRAEIAOwAiAC0ALQA9AEIAPQBQAEIAUgBGAFEAUgBRAGAAOgA7AEcAOgBHAEYALwAuABoAVgBcAF8AUwBfAFwATABcAFYALwBMAC4ALwAaACMAPAAoADEAIwAaADEAIwAxACgAKAA8AFQACAAVAAoAEAAIAAoAJAAIABAANABBACQASwBBADQAWgBzAGEAWABhAGwAKQAVACIACAAiABUAZABaAEsAWgBkAHMAVQBYADcAKQAwADcAYQBzAHgAbABhAHgAHAATABQAHAAUAB0AEwAJAA0AEwANABQAbgAUAA0AbgAdABQACQADAAQACQAEAA0AAwAOAA8AAwAPAAQAbgAEAA8AbgANAAQADgAYABkADgAZAA8AGAAgACEAGAAhABkAbgAZACEAbgAPABkAIAArACwAIAAsACEAKwA4ADkAKwA5ACwAbgAsADkAbgAhACwAOABEAEMAOABDADkARABOAE0ARABNAEMAbgBDAE0AbgA5AEMATgBdAFsATgBbAE0AXQBmAGUAXQBlAFsAbgBbAGUAbgBNAFsAZgBrAGoAZgBqAGUAawB2AHEAawBxAGoAbgBqAHEAbgBlAGoAdgB6AHkAdgB5AHEAegBwAG8AegBvAHkAbgB5AG8AbgBxAHkAcABpAGgAcABoAG8AaQBiAGgAbgBoAGIAbgBvAGgAYgBZAFcAWQBKAEkAWQBJAFcAbgBXAEkAbgBiAFcASgA/AD4ASgA+AEkAPwAzADUAPwA1AD4AbgA+ADUAbgBJAD4AMwAmACcAMwAnADUAJgAcAB0AJgAdACcAbgAnAB0AbgA1ACcABgAFABEABgARABIABQAJABMABQATABEAHAAbABEAHAARABMAGwAQABIAGwASABEAEAAbACUAEAAlACQAGwAcACYAGwAmACUAMwAyACUAMwAlACYAMgA0ACQAMgAkACUANAAyAEAAMgAzAD8AMgA/AEAASgBLAEAASgBAAD8ASwA0AEAASwBKAFkASwBZAGQAYgBjAGQAYgBkAFkAZABjAHMAYwBiAGkAYwBpAHMAcAB0AHMAcABzAGkAdAB1AHMAeAB3AG0AeABtAGwAdwB2AGsAdwBrAG0AZgBnAG0AZgBtAGsAZwBsAG0AbABnAF4AbABeAFgAZwBmAF0AZwBdAF4ATgBPAF4ATgBeAF0ATwA3AFgATwBYAF4ANwBPAEUATwBOAEQATwBEAEUAOAA2AEUAOABFAEQANgA3AEUANwA2ACoANwAqACkANgA4ACsANgArACoAIAAfACoAIAAqACsAHwAeACkAHwApACoAHgAfABYAHgAWABcAHwAgABgAHwAYABYADgALABYADgAWABgACwAMABcACwAXABYAdQB0AH0AdQB9AHsAdABwAHoAdAB6AH0AdgB3AH0AdgB9AHoAdwB4AHsAdwB7AH0ADAALAAEADAABAAIACwAOAAMACwADAAEACQAFAAEACQABAAMABQAGAAIABQACAAEABwAGABIABwASABAAdQByAHMAKQAeABcAKQAXABUADAAKABUADAAVABcAcwByAHwAcwB8AHgAcgB1AHsAcgB7AHwAeAB8AHsACgAAABAACgAMAAIACgACAAAABgAHAAAABgAAAAIABwAQAAAA`},{role:`handle`,nv:101,nt:198,pos:`JAB4Bk1tLwBfBhJt2v9uBkZt6f+NBk9tIwBsBkVt3v9vBk1t9f9qBjRtCQBkBhVt2P9eBhFt2/+JBkZtzv9iBgptyP9WBvtsyP+QBstsLQCLBt1sHwCOBkhtAgBbBuxsRwBSBmxsPQCyBo1sAgBHBlVsuv9cBmZsvP8+BllsHAA9Bjxs0v+aBr1s+/9ZBkNsRQBlBhZs/P9lBuxrsv9uBgxsUwC5Bo1ruf/YBidssP+5Bo1rQQAUB4hrUwDrBrhr3P8iB3JrXQC6BhVrp/+1Bg1rIwBNB75qWwDlBpdqpf/kBpdqp/8SBzdrWgA7B25qpv8zB8lq2P9ZB0JqXwDWBiZq7P9dB+9pq/9EB1NpMwBZB8Vpo//aBhZqYAACB6dpRQBQB9FpUwDwBq9pof/0BqFpNgBUB2hp1/9bB5Rppv/UBkFpqf/iBrFoWwA4BzxpWQDOBjhp6v9OB/1otf/cBuFoqv8mB7RoQgA6B7poHgBHB8xo2/8sB09oSgDYBqZoRgAaB0por/+jBjBoTgCgBkRoWQDsBrloOwDuBpVn1f8KB+FnGgCWBttnAwBxButn6/+NBtpnt/8RByxoJABxBuFnx/9uBtVnu/+OBrdnRQBxBsBnPgDTBl5nuv9yBrpnRwCbBsdn/P+eBkxnPwCOBlxnJADfBlpnw/+VBkFnzP/ZBlBnLgCcBjFnMACnBhNnEACqBhpn0f+pBhJnKgCuBhFn1P/CBhxnLQDYBkZn3P+yBt5mJgDTBuBm3//VBtxm6f+zBtZmJACyBtxm4f+6BtRmDwC0BtRmGADLBtNm`,idx:`EAAXABgAKQAoACMAJAAlACoAEAAVABcAFwAZABgAGQAXABMAGQATABoAEQAcABYAIAARAB4AEQAgABwAGQAbABgAGQAdABsAHQAZABoAGwAiACEAHQAiABsAIAAeACMAIAAoABwAIAAjACgAJAAhACIAIgAlACQAJQAuACoAAwAFAAAAFAATABcAEQAQAB8AEAARAAEAEAAbAB8AEAAYABsAIQAkACcAKAAmABwAJgAiAB0AIgAmACUAKAAuACYAIQAfABsAKgAnACQAEwAMABwAEwAcABoAGgAmAB0AJQAmAC4AEwAKAAwAHAAmABoACwATABQAEwALAAoADwAIABIAJwAjAB4AEQANAAEAEQAfAB4AIQAeAB8AHgAhACcAFgAcAAwAAQAVABAAFQABAA8AFQAPABIAFQAUABcAFAAVABIACwAUABIACwAIAAoACAALABIAAQAIAA8ABwAIAAEACAAHAAYACAAGAAUACgAIAAUADAAKAAkAFgAMAA4AFgANABEADQAWAA4ADQAAAAEABgAHAAEACgACAAkACgAFAAIADAADAA4AAwAMAAkAAAANAA4AAAAEAAEAAQAFAAYABQAEAAAABQABAAQABQAJAAIABQADAAkAAwAAAA4AQgBDAD8AOAAvADEAJwA3ADAAJwAwAC0ATQBSAFAAVQBbAFkANgA6ADUASABGAEEATABIAEEAPQA+ADkAOwA+AEkAPwBDADoANgA/ADoAMQAyADUARgBNAFAARgBIAEoAQgBGAFAARgBCAEEARABFAD4ARQBEAFMARQBTAFUAPABEAD4APABAAEQAPAA+AD0ASQA+AEUAPwA2AEEAPwBBAEIAOAA6AEMAOgA4ADUALAA5AD4AMwA8AD0AMwA0AC0ANAA9ADkANAAzAD0ANAA5ACwAOAAxADUAMQAuADIALgAxACoALQAjACcALQArACkALQApACMAKwAtADQAKQArADQAYgBkAGMASgBNAEYARwBKAEgASwBIAEwASwBHAEgATgBCAFAAQwBEADcAOABDAC8ALwAqADEAUgBOAFAATgBSAFcAMgAuACgAOwA2ACwATABPAEsAUQBNAEcASwBRAEcAQwBOAEQATgBDAEIANwAvAEMAKgA3ACcANwAqAC8AVABBAFUAQQBJAFUAQQBUAEwAOwBBADYAMgAoACwAVABPAEwAQQA7AEkANgAyACwAMgA2ADUAVABVAFkAUgBRAFYAUgBNAFEATgBTAEQANwBAADwANwAtADAANwAzAC0ARABAADcANwA8ADMATgBXAFoAVQBJAEUAOwAsAD4ALAApADQALAAoACkASgBHAE0AVABLAE8AVABRAEsAUQBUAFkAWQBYAFEAVwBRAFgAUQBXAFYAUgBWAFcAWgBcAE4AWQBXAFgAWQBaAFcAWgBZAF0AXQBZAFsAUwBOAFwAXABaAF4AXwBVAFMAXABfAFMAYQBeAFoAXgBhAGQAYQBjAGQAYABhAFoAYQBgAGIAYQBiAGMAXQBgAFoAYABdAGIAXwBbAFUAXwBdAFsAXQBfAGIAXwBkAGIAXgBfAFwAXwBeAGQA`},{role:`handle`,nv:101,nt:198,pos:`HQC9DSKd3//bDSCd4P+9DSCd2P+7DQqd5P+6DRudJADdDRqdKQC+DQqdLAC1Deqc0v+2DeicLgDjDaScAgC5DdycHQDmDZSc1v/mDZ6cPgCPDaOcQQBdDS2cuf+HDVWcFQBmDS2cRwB/DUycOgC4Dducv/98DT+cu/9eDTqcHwB8DSac8P9eDRec7P98DSKcvv//DUqc8f8kDvqbsf+1DZabUACzDaKbFABiDiibrv/8DaKbwv9SDjybqf9NDv6aVwABDiWbqf/5DT+bNADwDT+bNwATDiOcp///DQ2bqf/yDbKaVgBSDu+aWQDyDauaFQARDlCaQgB8DliaXwAiDjWaoP8iDjOa1/9+DoWaCQAVDiKaq/9uDl+arP90DuyZYABKDuuZqf8DDsGZXwAIDryZov8jDk6ZXQBwDuqZx/+GDtaZ9f+NDmuZXQAgDk2Z+f8XDkyZp//yDdyYpP9lDjWZWQDyDdeYPAB3DuyYrP8BDlSYWgBhDu6YSQA0DvCXLgDyDUqYVAABDk2Y8P9XDi+Ysv9nDr2Yr//bDf+XSwCoDdWXtf+kDdaXxv/qDRqXSwDiDZ2XCgByDaCXCwCMDZiXuf+GDWqXRgBzDX2XRgCQDWyXvP9xDYSX7v8pDqGXLADpDQuXOAC1Dc6W2/+kDQCXGACfDReXBAC4Dd2Wzf+1Dc+W4v+0Dd2WMACyDdOWHADsDZWW3P/pDZqWKgC6DceWKwDFDcaW2P+/DbyWJADKDZqW4//DDayWDQDODY6W2P/lDZWWJgDfDZmWIADnDY6WAADsDZOW4P/NDZGW`,idx:`UQBNAEwASgBNAEUARgBLAEoAQABBAD0AYgBkAGAASgBLAE4ASgBFAEYARwBPAFAAQgA/AE8APwBQAE8AQgBPAEcARwBDAEIAQABFAEEARQBAAEYAPQBGAEAAOQBBADsAQQA5AD0AQgA8AD4AQgA+AD8AQgBDADwAQwA2ADwAOAA7ADcAOwA4ADkAMwA5ADgANwAyADgAMQA4ADIAMwA4ADEANgA0ADwANQA2AEMAYgBfAGQATABNAEoASgBJAEwASgBOAEkATQBRAEUAQQA/AD4ARQA/AEEAQQA+ADsAPgA3ADsARgA9AEQAQwA9ADkAQwA5ADoAMwA6ADkARQBRAEgARQBIAD8AUQA/AEgANwA+ADIARwBLAEYASwBHAFUARwBGAEQAPQBHAEQAPQBDAEcAUwBJAFQASQBSAFQAVABSAFYAUAA/AFEANAA+ADwAUQBaAFAAQwA6ADUAUwBRAEwAUwBMAEkAUgBJAE4ASwBVAFIAUgBOAEsAVABWAFwAVgBSAFUAVgBVAFwAUwBUAFoAWgBRAFcAUwBaAFcAUwBXAFEAUABaAFsAVABcAFoAVQBHAFkAVQBZAFwAWQBgAFwAYgBQAFsAXQBbAFoAXQBaAF8AWgBcAF8AXABkAF4AXwBcAF4AZABcAGAAWABZAEcAUABiAFgAWABHAFAAWwBhAGIAYgBhAF0AYQBbAF0AYgBdAF8AXwBeAGQAWABgAFkAWABjAGAAWABiAGMAYgBgAGMADAAYAAgAMwAxACsAIwAMAAsACwAJACMAFQAbABEAFwATABoAJAAgACIAIgAhACQAKgAoAC0AKAArAC0AFQAXABoAFQAaABsADAAjABkADAAZABgAGQAjABwAGAAZABwAGAAcAB4AIgAgABsAGwAaACIAIQAiABoAIAAkACUAJwAgACUAIwAmABwAHgAcACwAHwAeACwAHAAmACkALAAcACkAKAAqACcAJwAlACgAKwAoACUAMQAyAC0AMgAqAC0ALQArADEANAA2ACkALAApADYALAA2ADUALgAsADUAAQACAAAAFQARAA4AFwAVABYAFQAOABYAEwAXABQAFwAWABQAGwAgACYAJgASABsANAAgACcAJwAqADQADgARAA0AEQASAA0ADwAYABoAGgATAA8AGgAYAB0AGAAfAB0AHQAhABoAHwArACQAJAArACUAMwArADoALgA6ACsAEwAUAA8AEQAbABIAJgAgADQAPgA0ADAANAAqADAAKgAyAD4AKgA+ADAAHwAkACEAHwAuACsACAAYAA8AHwAhAB0ADwAUAAgAFgAQAAoAFgAKABQAIwAJABIAEgAJAAcAEgAmACMAJgA0ACkAGAAeAB8ALAAuAB8AOgAuAC8AOgAvADUALgA1AC8AFgAOABAACAAUAAoABgAKAAcAEgAHAA0ABwAKAA0AEAAOAA0AEAANAAoAAwAKAAYACgADAAgADAAIAAMABQAHAAkABQAGAAcADAADAAEACwAMAAEAAQAJAAsAAAAGAAUAAwAGAAAAAwAEAAIAAAACAAQAAAAEAAMAAgABAAMACQABAAUAAQAAAAUA`}],q={L:.499,W:.154,shaftR:.0138,planform:[[0,13,18],[.04,20,25],[.08,27,30],[.12,33,37],[.17,39,44],[.21,44,50],[.25,49,56],[.29,53,61],[.34,57,66],[.38,61,70],[.42,64,73],[.46,68,75],[.5,71,77],[.55,74,78],[.59,76.5,78.5],[.63,78,78],[.67,79,76.5],[.71,79,74.5],[.75,78,72],[.8,75.5,68.5],[.84,71,65],[.88,64,61],[.92,53,54],[.96,36,42],[1,0,0]],fill:.7,cup:.018,deep:-.18,curl:.4,hook:.016,twist:.22,spine:.01,spineW:.3,edge:.0026,neck:.14},mn=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function hn(e,t){let n=e.planform,r=1;for(;r<n.length-1&&n[r][0]<t;)r++;let i=n[r-1],a=n[r],o=Math.min(1,Math.max(0,(t-i[0])/(a[0]-i[0]))),s=o*o*(3-2*o),c=i[1]+(a[1]-i[1])*s,l=i[2]+(a[2]-i[2])*s;if(t>.9){let r=Math.sqrt(Math.max(0,1-((t-.9)/.1)**2)),i=hn({planform:n.filter(e=>e[0]<=.92),fill:e.fill},.9);return c=i.o*1e3*r,l=i.i*1e3*r,{o:c*.001,i:l*.001}}let u=1-(1-(e.fill??1))*mn(.02,.2,t);return c=79*(c/79)**u,l=79*(l/79)**u,{o:c*.001,i:l*.001}}function gn(e,t,n,r={f:new M,b:new M,n:new M}){let{o:i,i:a}=hn(e,t),o=n>=0?n*i:n*a,s=-e.L/2+t*e.L,c=(i+a)/e.W,l=n-e.deep,u=n>=e.deep?1-e.deep:1+e.deep,d=e.cup*c*(l/u)**2*(n>=e.deep?1+e.curl:1);d+=e.hook*t*t,d-=e.cup*.35*c*mn(0,.25,t)*(1-mn(.6,1,t));let f=e.twist*t**1.3,p=Math.cos(f),m=Math.sin(f),h=o*p-d*m,g=o*m+d*p;r.f.set(s,h,g);let _=e.spine*(1-mn(.05,.95,t))*Math.exp(-(((n+.05)/e.spineW)**2)),v=e.edge+_+.003*(1-n*n)*(1-t);return r.n.set(0,-m,p),r.b.copy(r.f).addScaledVector(r.n,-v),r}function _n(e=q,{nS:t=72,nT:n=30,nRim:r=4}={}){let i=[],a=[];for(let e=0;e<=n;e++){let t=e/n;i.push(-Math.cos(Math.PI*t))}for(let e=0;e<=t;e++){let n=e/t;a.push(n<.5?n:1-.5*(2-2*n)**1.4)}let o=[],s=[],l=[],u=[],d={f:new M,b:new M,n:new M},f=r=>{let c=o.length/3;for(let c=0;c<=t;c++)for(let t=0;t<=n;t++){gn(e,a[c],i[t],d);let n=r?d.f:d.b;o.push(n.x,n.y,n.z),s.push(n.x,n.y),l.push(+!!r)}for(let e=0;e<t;e++)for(let t=0;t<n;t++){let i=c+e*(n+1)+t,a=i+1,o=i+n+1,s=o+1;r?u.push(i,o,a,a,o,s):u.push(i,a,o,a,s,o)}return c},p=f(!0),m=f(!1),h=(n,c)=>{let f=o.length/3,p=new M,m=new M,h=new M;for(let u=0;u<=t;u++){gn(e,a[u],i[n],d);let t=d.f.clone(),f=d.b.clone();m.copy(t).add(f).multiplyScalar(.5);let g=t.distanceTo(f)/2;p.copy(t).sub(f).normalize(),gn(e,Math.min(1,a[u]+.002),i[n],d),h.copy(d.f).sub(t);let _=new M().crossVectors(h,p).normalize();_.y*c<0&&_.negate(),a[u]>.995&&_.set(1,0,0);for(let e=0;e<=r;e++){let t=e/r*Math.PI,n=m.clone().addScaledVector(p,g*Math.cos(t)).addScaledVector(_,g*Math.sin(t)*1.4);o.push(n.x,n.y,n.z),s.push(n.x,n.y),l.push(.5)}}for(let e=0;e<t;e++)for(let t=0;t<r;t++){let n=f+e*(r+1)+t,i=n+1,a=n+r+1,o=a+1;c>0?u.push(n,a,i,i,a,o):u.push(n,i,a,i,o,a)}};h(n,1),h(0,-1);for(let e=0;e<n;e++){let t=p+e,n=t+1,r=m+e,i=r+1;u.push(t,n,r,n,i,r)}let g=new w;return g.setAttribute(`position`,new c(o,3)),g.setAttribute(`uv`,new c(s,2)),g.setAttribute(`side`,new c(l,1)),g.setIndex(u),g.computeVertexNormals(),g.userData={F:p,B:m,nS:t,nT:n,S:a,ts:i,P:e},g}function vn(e=q,t=16,n=12){let r=[],i={f:new M,b:new M,n:new M},a=(t,n)=>(gn(e,t,n,i),i.f.clone().addScaledVector(i.n,.001));for(let e=2;e<t;e+=2)for(let i=1;i<n-1;i++){let o=e/t,s=a(o,-1+2*i/n),c=a(o,-1+2*(i+1)/n);r.push(s.x,s.y,s.z,c.x,c.y,c.z)}for(let e=2;e<n;e+=2)for(let i=1;i<t-1;i++){let o=-1+2*e/n,s=a(i/t,o),c=a((i+1)/t,o);r.push(s.x,s.y,s.z,c.x,c.y,c.z)}let o=new w;return o.setAttribute(`position`,new c(r,3)),o}function yn(e=q,{nS:t=24,nA:n=28,inShaft:r=.03}={}){let i=[],a=[],o=[],s={f:new M,b:new M,n:new M},l=e.shaftR;for(let o=0;o<=t;o++){let c=o/t,u=-e.L/2-r+c*(r+e.neck*e.L),d=Math.max(0,(u+e.L/2)/e.L),f=mn(0,1,(u+e.L/2+r)/(r+e.neck*e.L));gn(e,Math.min(d,e.neck),0,s);let p=(s.f.z+s.b.z)/2*f,m=l*(1+.25*f),h=l*(1-.72*f);for(let e=0;e<=n;e++){let t=e/n*Math.PI*2;i.push(u,m*Math.cos(t),p+h*Math.sin(t)),a.push(u,t/(Math.PI*2)*2*Math.PI*l)}}for(let e=0;e<t;e++)for(let t=0;t<n;t++){let r=e*(n+1)+t,i=r+1,a=r+n+1,s=a+1;o.push(r,i,a,i,s,a)}let u=new w;return u.setAttribute(`position`,new c(i,3)),u.setAttribute(`uv`,new c(a,2)),u.setIndex(o),u.computeVertexNormals(),u}function bn(e,t=q.shaftR,n=28,r=8){let i=new b(t,t,e,n,r,!0);i.rotateZ(Math.PI/2);let a=i.attributes.position,o=i.attributes.uv;for(let e=0;e<o.count;e++)o.setXY(e,a.getX(e),o.getX(e)*2*Math.PI*t);return i}function xn(e,t=q.shaftR){let n=new j,r=[[t*.98,-.07],[t*1.18,-.062],[t*1.22,-.03],[t*1.3,-.024],[t*1.3,.004],[t*1.22,.01],[t*1.18,.062],[t*.98,.07]],i=new y(new p(r.map(([e,t])=>new O(e,t)),32),e);i.rotation.z=-Math.PI/2,n.add(i);let a=new y(new u(.038,.006,.012),e);return a.position.set(-.004,t*1.34,0),n.add(a),n}function Sn(e=.48,t=.165,n=.03,r=16,i=12){let a=[],o=[],s=e/2,l=t/2;for(let e=0;e<=i;e++)for(let t=0;t<=r;t++){let o=t/r*2-1,c=e/i*2-1,u=o*s*Math.sqrt(1-c*c/2),d=c*l*Math.sqrt(1-o*o/2);a.push(u,d,n*(.75*(d/l)**2+.25*(u/s)**2))}for(let e=0;e<i;e++)for(let t=0;t<r;t++){let n=e*(r+1)+t,i=n+1,a=n+r+1,s=a+1;o.push(n,a,i,i,a,s)}let u=new w;return u.setAttribute(`position`,new c(a,3)),u.setIndex(o),u.computeVertexNormals(),u}var Cn=lt[ut].form,wn=at,Tn=ct,J=.55,En=.3,Dn=.12,On=.14,kn=.25,An=.55,jn=.3,Mn=.68,Nn=jn,Pn=new M(0,1,0),Fn=.34,In=.48,Ln=.7,Rn=e=>({pelvisPos:e.position.clone(),jointBelly:Dn,jointChest:On,pelvis:kn,belly:An,pelvisBend:jn,bellyBend:Mn}),zn=(e,t)=>{let n=e/2-In;return{length:e,handX:t,shaftHalf:n,bladeLen:In,bladeCenterX:n+In/2}};function Bn(e,t,n){let r=zn(t,n),[i,...a]=e.userData.paddleParts;return i.userData.len!==r.shaftHalf&&(i.geometry.dispose(),i.geometry=i.userData.legacy?new b(.009,.009,1,10).rotateZ(Math.PI/2).scale(2*r.shaftHalf,1,1):bn(2*r.shaftHalf),i.userData.len=r.shaftHalf),a.forEach((e,t)=>{e.geometry.boundingBox||e.geometry.computeBoundingBox(),e.position.x=(t?1:-1)*(r.shaftHalf+r.bladeLen-e.geometry.boundingBox.max.x)}),e.userData.paddleDims=r,r}function Vn(e,t=14){let{w:n,hh:r,yc:i}=st(e),a=[];for(let e=0;e<2*t;e++){let o=e/(2*t)*Math.PI*2,s=Math.sin(o);a.push([n*Math.cos(o),i+r*Math.sign(s)*Math.abs(s)**.85])}return a}function Hn(e,t=130){let n=[],r=[],i=0;for(let r=0;r<=t;r++){let a=r/t,o=-wn/2+a*wn,s=e(a);i=s.length;for(let[e,t]of s)n.push(e,t,o)}for(let e=0;e<t;e++)for(let t=0;t<i;t++){let n=e*i+t,a=e*i+(t+1)%i,o=(e+1)*i+t,s=(e+1)*i+(t+1)%i;r.push(n,a,o,a,s,o)}let a=new w;return a.setAttribute(`position`,new c(n,3)),a.setIndex(r),a.computeVertexNormals(),a}function Un(e){let t=[],n=[],r=e[0].pts.length;for(let{z:n,pts:r}of e)for(let[e,i]of r)t.push(e,i,n);for(let t=0;t<e.length-1;t++)for(let e=0;e<r-1;e++){let i=t*r+e,a=i+1,o=(t+1)*r+e,s=o+1;n.push(i,o,a,a,o,s)}let i=new w;return i.setAttribute(`position`,new c(t,3)),i.setIndex(n),i.computeVertexNormals(),i}function Wn(e,t){let n=-1/0;for(let r=0;r<e.length;r++){let[i,a]=e[r],[o,s]=e[(r+1)%e.length];(i-t)*(o-t)<=0&&i!==o&&(n=Math.max(n,a+(s-a)*(t-i)/(o-i)))}return n}function Gn(e,t,n,r,i=90,a=.002){let o=[],s=[];for(let c=0;c<=i;c++){let l=t+(n-t)*c/i,u=e((l+wn/2)/wn),d=0;for(let[e]of u)d=Math.max(d,e);let f=Math.min(r/2,.55*d),p=Wn(u,-f),m=Wn(u,f);if(o.push(-f,(Number.isFinite(p)?p:0)+a,l,f,(Number.isFinite(m)?m:0)+a,l),c){let e=(c-1)*2;s.push(e,e+1,e+2,e+1,e+3,e+2)}}let l=new w;return l.setAttribute(`position`,new c(o,3)),l.setIndex(s),l.computeVertexNormals(),l}var Kn=.65;function qn(t,n=.3,r=.65){let i={value:1};t.userData.nearCap=i;let a=t.onBeforeCompile,o=t.customProgramCacheKey?.bind(t),s=a!==e.prototype.onBeforeCompile;return t.onBeforeCompile=(e,o)=>{s&&a.call(t,e,o),e.uniforms.uNearCap=i,e.fragmentShader=e.fragmentShader.replace(`void main() {`,`uniform float uNearCap;
void main() {
float nearDist = length(vViewPosition);
if (nearDist < ${r.toFixed(2)} || uNearCap < 0.999) {
float dither = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
if (dither > min(smoothstep(${n.toFixed(2)}, ${r.toFixed(2)}, nearDist), uNearCap)) discard;
}`)},t.customProgramCacheKey=()=>`nearfade2-${n}-${r}${s?`|`+o():``}`,t}function Jn(e,t){if(e.userData.cockpitLook===t)return;e.userData.cockpitLook=t;let n=t?Kn:1;e.traverse(e=>{let t=e.material?.userData?.nearCap;t&&(t.value=n)})}var Y=(e,t=.5,n=0)=>new E({color:e,roughness:t,metalness:n}),Yn=(e,t)=>new y(new b(e,e,1,10),Y(t,.7)),Xn=(e,t)=>new y(new k(e,14,10),Y(t,.7));function Zn(e,t=0){let r=e=>Uint8Array.from(atob(e),e=>e.charCodeAt(0)).buffer;return pn.map(i=>{let a=new Int16Array(r(i.pos)),o=new Float32Array(a.length);for(let t=0;t<a.length;t+=3)o[t]=a[t]*1e-4,o[t+1]=a[t+1]*1e-4+e,o[t+2]=a[t+2]*1e-4;if(i.role===`footplate`)for(let e=2;e<o.length;e+=3)o[e]-=t;let s=new w;return s.setAttribute(`position`,new n(o,3)),s.setIndex(new n(new Uint16Array(r(i.idx)),1)),s=ce(s,i.role===`hull`?.9:.6),{role:i.role,geometry:s}})}var Qn={high:{key:`high`,nS:72,nT:30,nRim:4,throat:{nS:24,nA:28}},medium:{key:`medium`,nS:36,nT:14,nRim:3,throat:{nS:12,nA:16}},low:{key:`low`,nS:16,nT:8,nRim:2,throat:{nS:6,nA:10}}},$n={};function er(e){if(e.attributes.uv)return e;let t=e.attributes.position,r=e.attributes.normal,i=new Float32Array(t.count*2);for(let e=0;e<t.count;e++){let n=Math.abs(r.getX(e)),a=Math.abs(r.getY(e)),o=Math.abs(r.getZ(e));n>=a&&n>=o?(i[2*e]=t.getZ(e),i[2*e+1]=t.getY(e)):a>=o?(i[2*e]=t.getX(e),i[2*e+1]=t.getZ(e)):(i[2*e]=t.getX(e),i[2*e+1]=t.getY(e))}return e.setAttribute(`uv`,new n(i,2)),e}function tr(e=null,t={}){wn=e?e.spec.L:at,Tn=e?t=>e.deckTop(t):ct;let n=new j,r={};J=e?.spec.paddler?-e.spec.paddler.seatX:.55;let i=!!e?.spec.sections,a=new y(i?Zn(e.base,e.spec.paddler.plateShift).find(e=>e.role===`hull`).geometry:Hn(e?t=>e.ring(t):Vn),W(`gelcoat`,{overrides:{color:14869990},legacy:{color:15659764,roughness:.32}}));if(i&&(de(a.geometry,e),$e(e.spec.cockpit.x0,e.spec.cockpit.x1)),n.add(a),r.hull=a,i){let t=(e,t)=>({legacy:{color:e,roughness:t}}),i={coaming:W(`plastic`,{overrides:{color:2106667,roughness:.38},...t(2106667,.55)}),footplate:W(`carbon`,{mapRotation:Math.PI/4,...t(1382428,.8)}),bungee:W(`braid`,{overrides:{color:1119255},...t(1119255,.9)}),rudder:W(`carbon`,t(987412,.6)),rudderhead:W(`plastic`,{overrides:{color:2106667},...t(2106667,.5)}),handle:W(`plastic`,{overrides:{color:1711393,roughness:.6},...t(1711393,.7)})};for(let e of[`coaming`,`bungee`,`handle`])it(i[e]);for(let t of Zn(e.base,e.spec.paddler.plateShift))if(t.role!==`hull`){er(t.geometry);let e=new y(t.geometry,i[t.role]);e.material.side=2,n.add(e),r[t.role]=r[t.role]??e}}else if(e){let t=Y(13620955,.5,0);t.side=2;let i=new y(Un(e.bucketRings()),t);n.add(i),r.bucket=i}let c=e?t=>e.cockpitAt(t).floor:e=>Tn(e);if(!e){let e=J-.05,t=Tn(e),r=new y(new d(.15,.55,4,12),Y(1316635,.8));r.rotation.x=Math.PI/2,r.scale.set(1,1,.22),r.position.set(0,t+.005,e),n.add(r);let i=new y(new o(.17,.018,8,28),Y(2106667,.6));i.rotation.x=Math.PI/2,i.scale.set(1,1.9,1),i.position.set(0,t+.012,e),n.add(i)}else if(!i){let e=new y(new u(.3,.03,.34),Y(1316635,.85));e.position.set(0,c(J)+.012,J),n.add(e);let t=new y(new u(.32,.17,.04),Y(1316635,.85));t.position.set(0,c(J)+.09,J+.2),t.rotation.x=-.25,n.add(t)}let f=c(-.88);if(!i){let e=new y(new u(.26,.03,.26),Y(1382428,.8));e.position.set(0,f+.004,-.84),n.add(e);for(let e of[-1,1]){let t=new y(new u(.11,.03,.17),Y(16041282,.5));t.position.set(e*.1,f+.04,-.8799999999999999),t.rotation.x=-.55,n.add(t)}}let p=Y(16041282,.6);if(p.side=2,p.polygonOffset=!0,p.polygonOffsetFactor=-2,p.polygonOffsetUnits=-2,it(p),!i){let t=new y(Gn(e?t=>e.ring(t):Vn,-wn/2+.01,-1.25,.05),p);n.add(t)}let m=13623354,h=1316635,g=15318936,_=1712691,v=i?c(J)+e.spec.paddler.hipUp:e?c(J)+.03+.075:En,x=new j;x.position.set(0,v,J),n.add(x);let S=new j;S.position.set(0,Dn,0),x.add(S);let C=new j;C.position.set(0,On,0),S.add(C);let w=x,T=new y(new u(.32,.13,.23),Y(_,.9));T.position.set(0,.025,0),x.add(T);let E=new y(new d(.145,.05,6,12),Y(h,.9));E.position.set(0,.075,0),E.scale.set(1.2,1,.78),S.add(E);let D=new y(new d(.15,.04,6,12),Y(h,.9));D.position.set(0,.15,0),D.scale.set(1.28,1,.8),C.add(D);let O=new y(new k(.1,14,8),Y(h,.9));O.position.set(0,.27,.01),O.scale.set(1.7,.55,.95),C.add(O);let A=new j;A.position.set(0,.48,.03),A.rotation.order=`YXZ`,C.add(A);let ee=Xn(.105,g);A.add(ee);let te=new y(new b(.045,.05,.11,10),Y(g,.8));te.position.set(0,-.115,0),A.add(te);let ne=new y(new k(.112,14,8,0,Math.PI*2,0,Math.PI*.42),Y(2826520,.9));A.add(ne);let N=new y(new o(.109,.013,6,20),Y(13166140,.6));N.rotation.x=Math.PI/2,N.position.set(0,.025,0),A.add(N);let re=new y(new u(.15,.012,.09),Y(2826520,.9));re.position.set(0,.028,-.13),A.add(re);let ie=Xn(.016,g);ie.position.set(0,-.005,-.108),A.add(ie);let P=new M(-.21,.5,0),F=new M(.21,.5,0),ae=[];for(let t of[-1,1]){let r=Yn(.05,_),a=Yn(.036,_);if(n.add(r,a),i){let i=e.spec.paddler,o=new M(t*i.hipHalf,v+.02,J-.1),s=new M(t*i.ankle.half,e.base+i.ankle.up,i.ankle.z),c=new M(t*i.ankle.half,e.base+i.ball.up,i.ball.z),l=Yn(.034,_);n.add(l),ae.push({thigh:r,shin:a,shoe:l,hip:o,ankle:s,ball:c,thighLen:i.thigh,shinLen:i.shin,sx:t,ik:!0,knee:s.clone(),foot:s.clone()})}else ae.push({thigh:r,shin:a,hip:new M(t*.11,v+.02,J-.1),knee:new M(t*.14,.45,-.05),foot:new M(t*.1,c(-.88)+.06,-.88)})}let oe=new j;n.add(oe);let se=Qn[t.paddleDetail??`high`]??Qn.high,ce=Nt.value===`legacy`,I=qn(W(`carbon`,{legacy:{color:1118481,roughness:.7}})),L=qn(W(`carbon`,{mapRotation:Math.PI/4,legacy:{color:1448221,roughness:.35}}));L.side=2;let le=new y(ce?new b(.009,.009,1,10).rotateZ(Math.PI/2).scale(2*Ln,1,1):bn(2*Ln),I);if(le.userData.len=Ln,le.userData.legacy=ce,oe.add(le),!ce){let e=xn(qn(W(`plastic`,{overrides:{color:1382170,roughness:.4}})));oe.add(e)}let R=ce?$n.legacy??={blade:Sn(),throat:null,grid:vn(q)}:$n[se.key]??={blade:_n(q,se),throat:yn(q,se.throat),grid:vn(q)},ue=[],fe=[],pe=new l({color:16765503});for(let e of[-1,1]){let t=new y(R.blade,L);R.blade.boundingBox||R.blade.computeBoundingBox(),t.scale.x=e,t.position.set(e*(1.18-R.blade.boundingBox.max.x),0,0),R.throat&&t.add(new y(R.throat,I));let n=new s(R.grid,pe);n.visible=!1,t.add(n),fe.push(n),oe.add(t),ue.push(t)}let me=[];for(let e of[-1,1]){let t=Yn(.036,m),r=Yn(.031,m),i=Xn(.036,g);[t,r,i].forEach(e=>qn(e.material)),n.add(t,r,i),me.push({upper:t,fore:r,hand:i,sx:e})}return n.userData={vestMats:[E.material,D.material,O.material],parts:r,torso:w,pelvis:x,belly:S,chestG:C,head:A,chest:D,band:N,legs:ae,paddle:oe,arms:me,shoulderL:P,shoulderR:F,rider:[D,E,T,O,A],cap:ne,paddleParts:[le,...ue],bladeGrids:fe,paddleDims:zn(2.36,Fn)},n.userData.rig={id:`primitive:${v.toFixed(3)}:${J.toFixed(3)}`,trunk:Rn(x),shoulders:[P,F],arm:[.31,.29],chinY:.65,clavZ:-.05,navel:{y:.17,z:-.12}},Qr(n,0,!1),n}function nr(e,t){for(let n of e.userData.vestMats??[])n.color.set(t);e.userData.skinned?.setPfdColor(t)}function X(e,t,n){let r=new M().subVectors(n,t),i=r.length();e.position.copy(t).addScaledVector(r,.5),e.scale.set(1,Math.max(i,1e-4),1),e.quaternion.setFromUnitVectors(Pn,r.normalize())}var rr=new M,ir=new M,ar=new M,or=new M;function sr(e,t,n,r,i){let a=.31,o=.29,s=rr.subVectors(r,n),c=Math.min(s.length(),.599),l=ir.copy(s).normalize(),u=(c*c+a*a-o*o)/(2*c),d=Math.sqrt(Math.max(a*a-u*u,0)),f=or.copy(i).addScaledVector(l,-i.dot(l)).normalize(),p=ar.copy(n).addScaledVector(l,u).addScaledVector(f,d).clone();X(e,n.clone(),p),X(t,p,r.clone())}function cr(e,t,n,r,i){let a=new M().subVectors(t,e),o=Math.min(a.length(),n+r-.001),s=a.clone().normalize(),c=(o*o+n*n-r*r)/(2*o),l=Math.sqrt(Math.max(n*n-c*c,0)),u=new M(i*.35,1,0);return u.addScaledVector(s,-u.dot(s)).normalize(),e.clone().addScaledVector(s,c).addScaledVector(u,l)}var Z=Math.PI/180,lr=[20,20],ur=[0,0,0,0],dr=new M(0,-1,0),fr=new M(1,0,0);function pr(e,t,n,r,i=dr,a=fr){let{ref:o,out:s}=mr(t.clone().sub(e).normalize(),n,i,a);return o.multiplyScalar(Math.cos(r*Z)).addScaledVector(s,Math.sin(r*Z))}function mr(e,t,n=dr,r=fr){let i=e=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},a=n.clone().addScaledVector(e,-n.dot(e)),o=a.length(),s=new M().crossVectors(n,r),c=i((o-.17)/.47)*i((.2-e.dot(s))/.4);s.addScaledVector(e,-s.dot(e));let l=c>0?a.multiplyScalar(c/o):new M;return c<1&&s.lengthSq()>1e-9&&l.addScaledVector(s.normalize(),1-c),l.lengthSq()<1e-12&&l.copy(a.lengthSq()>1e-12?a:new M(1,0,0).addScaledVector(e,-e.x)),l.normalize(),{ref:l,out:new M().crossVectors(l,e).multiplyScalar(t)}}var hr=(e,t)=>new M(Math.cos(e)*Math.cos(t),-Math.sin(e),-Math.cos(e)*Math.sin(t)),Q=e=>new M(-e.x,e.y,e.z),gr=new WeakMap;function _r(e,t=Fn,n=null){gr.has(e)||gr.set(e,new Map);let r=e.fit&&n?.chin?n:null,i=r?`${t}|${r.id}`:t,a=gr.get(e);if(a.has(i))return a.get(i);let o=e=>new M(...e),s=2*t,c=r?r.chin.clone().sub(o(e.fit.chin)):null,l=(t,n)=>{let r=o(t).addScaledVector(n,2*Fn);return c?r.addScaledVector(n,s-2*e.fit.hx).add(c):r},u=hr(e.tiltCatch*Z,e.betaCatch*Z),d=hr(e.tiltExit*Z,e.betaExit*Z),f=l(e.topCatch,u),p=f.clone().addScaledVector(u,-s),m=l(e.topExit,d),h=m.clone().addScaledVector(d,-s),g=h.clone().add(m).multiplyScalar(.5),_=Q(f).add(Q(p)).multiplyScalar(.5),v=(e.tLevel-e.tExit)/(.5-e.tExit),y=g.z+(_.z-g.z)*v,b={L:new M(-t,e.shoulderY,y),R:new M(t,e.shoulderY,y)},x=e.tExit??.2,S=e.tLevel??.36,C=(e.pre??[]).slice().sort((e,t)=>t.dt-e.dt).map(e=>{let t=hr(e.tilt*Z,e.beta*Z),n=l(e.top,t);return{dt:e.dt,low:n,top:n.clone().addScaledVector(t,-s),x:e}}),w=(e.mid??[]).filter(e=>e.t>0&&e.t<x).slice().sort((e,t)=>e.t-t.t).map(e=>{let t=hr(e.tilt*Z,e.beta*Z),n=l(e.top,t);return{t:e.t,low:n,top:n.clone().addScaledVector(t,-s),x:e}}),T=!!(e._0x1ded6d||e._0x03181c||C.some(e=>e.x.yaw!=null||e.x.lift)||w.length),E=t=>e.yawDeg*Math.cos(2*Math.PI*t),D=t=>e.leanExitDeg+(e.leanCatchDeg-e.leanExitDeg)*(.5+.5*Math.cos(4*Math.PI*t)),O=(e,t)=>T?{yaw:e?.yaw??E(t),lean:e?.lean??D(t),lift:e?.lift??lr,wrist:e?.wrist??ur,hip:e?.hip??(e?.yaw??E(t))*kn,roll:e?.roll??0,head:e?.head??[0,0],blade:e?.blade??0,grip:e?.grip??null,ease:e?.ease??1}:{},k=(e,t,n,r,i)=>({t,L:n,R:r,...O(i,t)}),A=e.feather??0,j=e=>({t:e.t,L:e.L,R:e.R,...e.lift?{yaw:-e.yaw,lean:e.lean,lift:[e.lift[1],e.lift[0]],wrist:[e.wrist[2],e.wrist[3],e.wrist[0],e.wrist[1]],hip:-e.hip,roll:-e.roll,head:[-e.head[0],e.head[1]],blade:e.blade-A,grip:e.grip?[-e.grip[2]-A,e.grip[3],-e.grip[0]+A,e.grip[1]]:null,ease:e.ease}:{}}),ee=e=>C.length?C.map(t=>e===.5?j(k(0,.5-t.dt,Q(t.low),Q(t.top),{...t.x,...O(t.x,1-t.dt)})):k(0,1-t.dt,t.top,t.low,t.x)):[{t:e-.5+S,L:b.L,R:b.R,...T?{yaw:E(S),lean:D(S),lift:lr,wrist:ur,hip:E(S)*kn,roll:0,head:[0,0],blade:0}:{}}],te=k(0,0,p,f,e._0x1ded6d),ne=k(0,x,h,m,e._0x03181c),N=e=>w.map(t=>e?j({...k(0,t.t,Q(t.low),Q(t.top),t.x),t:t.t+.5}):k(0,t.t,t.top,t.low,t.x)),re=[te,...N(0),ne,...ee(.5),j({...k(0,0,Q(f),Q(p),e._0x1ded6d),t:.5}),...N(.5),j({...k(0,x,Q(m),Q(h),e._0x03181c),t:.5+x}),...ee(1),{...te,t:1}];return a.set(i,re),re}var vr=.7,yr=[1/6,2/6,3/6,4/6,5/6],br=[.5],xr=.065;function Sr(e,t){let n=e.length,r=2*n,i=Array.from({length:r},()=>new Float64Array(r+1)),a=e=>2*((e+n)%n),o=e=>a(e)+1;for(let s=0;s<n;s++){let c=(s-1+n)%n,l=(s+1)%n,u=s===0?t[0]+1-t[n-1]:t[s]-t[c],d=s===n-1?t[0]+1-t[s]:t[l]-t[s],f=i[2*s],p=i[2*s+1];f[a(c)]+=-24/u**2,f[o(c)]+=-3/u,f[o(s)]+=9/u- -9/d,f[a(s)]+=-36/u**2+36/d**2,f[o(l)]+=-3/d,f[a(l)]+=24/d**2,f[r]=-(60*(e[s]-e[c])/u**3)+60*(e[l]-e[s])/d**3,p[a(c)]+=-168/u**3,p[o(c)]+=-24/u**2,p[o(s)]+=36/u**2-36/d**2,p[a(s)]+=-192/u**3-192/d**3,p[o(l)]+=24/d**2,p[a(l)]+=-168/d**3,p[r]=-(360*(e[s]-e[c])/u**4)-360*(e[l]-e[s])/d**4}for(let e=0;e<r;e++){let t=e;for(let n=e+1;n<r;n++)Math.abs(i[n][e])>Math.abs(i[t][e])&&(t=n);[i[e],i[t]]=[i[t],i[e]];for(let t=0;t<r;t++)if(t!==e&&i[t][e]!==0){let n=i[t][e]/i[e][e];for(let a=e;a<=r;a++)i[t][a]-=n*i[e][a]}}let s=i.map((e,t)=>e[r]/e[t]);return{s:e.map((e,t)=>s[2*t]),a:e.map((e,t)=>s[2*t+1])}}var Cr=(e,t,n,r,i,a,o,s)=>{let c=o*o,l=c*o,u=l*o,d=u*o;return e*(1-10*l+15*u-6*d)+s*t*(o-6*l+8*u-3*d)+s*s*n*(.5*c-1.5*l+1.5*u-.5*d)+s*s*r*(.5*l-u+.5*d)+s*i*(-4*l+7*u-3*d)+a*(10*l-15*u+6*d)};function wr(e,t,n,r,i){let a=[1,2,3,4].map(r=>(n[r]??vr)*(e[r+1]-e[r-1])/(t[r+1]-t[r-1]));if(!i){let n=t[3]-t[2],i=r*r,o=i*r;return e[2]*(2*o-3*i+1)+n*a[1]*(o-2*i+r)+e[3]*(-2*o+3*i)+n*a[2]*(o-i)}let o=n=>{let r=t[n+1]-t[n],i=e[n+1]-e[n],o=a[n-1],s=a[n];return[(6*i-r*(4*o+2*s))/(r*r),(-6*i+r*(2*o+4*s))/(r*r)]},s=o(1),c=o(2),l=o(3),u=e=>(t[e+1]-t[e])**2,d=(s[1]*u(1)+c[0]*u(2))/(u(1)+u(2)),f=(c[1]*u(2)+l[0]*u(3))/(u(2)+u(3));return Cr(e[2],a[1],d,f,a[2],e[3],r,t[3]-t[2])}var Tr=e=>(e%360+540)%360-180;function Er(e,t,n,r,i){let a=e.length-1,o=[-2,-1,0,1,2,3].map(n=>{let r=t+n,i=Math.floor(r/a);return{k:e[r-i*a],t:e[r-i*a].t+i}}),s=o.map(e=>r(e.k));if(i){for(let e=3;e<6;e++)s[e]=s[e-1]+Tr(s[e]-s[e-1]);for(let e=1;e>=0;e--)s[e]=s[e+1]+Tr(s[e]-s[e+1])}return wr(s,o.map(e=>e.t),o.map(()=>vr),n,!0)}function Dr(e,t,n,r){let i=e.length-1,a=t.tExit??.2,o=(e,t)=>[0,.5].some(n=>e>=n-1e-9&&t<=n+a+1e-9),s=[];for(let t=0;t<i;t++){s.push({t:e[t].t,v:n(e[t]),key:e[t],j:t});for(let i of o(e[t].t,e[t+1].t)?yr:e[t+1].t-e[t].t>=xr?br:[])s.push({t:e[t].t+i*(e[t+1].t-e[t].t),v:Er(e,t,i,n,r),key:null,j:t})}if(r)for(let e=1;e<s.length;e++)s[e].v=s[e-1].v+Tr(s[e].v-s[e-1].v);let c=s.map(e=>e.t),l=s.length,u=r?s[l-1].v+Tr(n(e[0])-s[l-1].v)-s[0].v:0,d=s.map(e=>e.v-u*e.t),{s:f,a:p}=Sr(d,c),m=s.map(t=>r?n(e[t.j])-s.find(n=>n.key===e[t.j]).v:0);return{t:c,w:d,s:f.map(e=>e+u),a:p,wind:u,k:s,off:m}}function Or(e,t,n,r=null){let i=_r(t,n,r),a=i.length-1,o=0;for(;o<a-1&&e>=i[o+1].t;)o++;let s=[-2,-1,0,1,2,3].map(e=>{let t=o+e,n=Math.floor(t/a);return{k:i[t-n*a],t:i[t-n*a].t+n}}),c=s.map(e=>e.t),l=s.map(e=>e.k.ease),u=i[o],d=(e-c[2])/(c[3]-c[2]),f=!!u.lift,p=e=>(e%360+540)%360-180,m=(n,r,a)=>{let o=i.mj?.get(n);o||=(i.mj??=new Map).set(n,Dr(i,t,r,a)).get(n);let s=o.t,c=s.length,l=0;for(;l<c-1&&e>=s[l+1];)l++;let u=(l+1)%c,d=s[l],f=u?s[u]:1,p=e=>e.key?e.key.ease??1:1;return Cr(o.w[l]+o.wind*d,o.s[l]*p(o.k[l]),o.a[l],o.a[u],o.s[u]*p(o.k[u]),o.w[u]+o.wind*f,(e-d)/(f-d),f-d)+o.off[l]},h=(e,t)=>f?m(t,e,!1):wr(s.map(t=>e(t.k)),c,l,d,!1),g=(e,t)=>{if(f)return m(t,e,!0);let n=s.map(t=>e(t.k));for(let e=3;e<6;e++)n[e]=n[e-1]+p(n[e]-n[e-1]);for(let e=1;e>=0;e--)n[e]=n[e+1]+p(n[e]-n[e+1]);return wr(n,c,l,d,!1)},_={};for(let e of[`L`,`R`])_[e]=new M(h(t=>t[e].x,e+`x`),h(t=>t[e].y,e+`y`),h(t=>t[e].z,e+`z`));return u.lift&&(_.yaw=h(e=>e.yaw,`yaw`),_.lean=h(e=>e.lean,`lean`),_.lift=[g(e=>e.lift[0],`lift0`),g(e=>e.lift[1],`lift1`)],_.wrist=[0,1,2,3].map(e=>h(t=>t.wrist[e],`wrist`+e)),i.every(e=>e.grip)&&(_.grip=[0,1,2,3].map(e=>e%2?h(t=>t.grip[e],`grip`+e):g(t=>t.grip[e],`grip`+e))),_.hip=h(e=>e.hip,`hip`),_.roll=h(e=>e.roll,`roll`),_.head=[h(e=>e.head[0],`head0`),h(e=>e.head[1],`head1`)],_.blade=h(e=>e.blade,`blade`)),_}function kr(e,t=Cn,n=Fn,r=null,i=null){let a=(e/(2*Math.PI)%1+1)%1,o=a<.5?1:-1,s=a*2%1;if(t.water&&r&&i){let e=fn(a,t,r,i);return{sigma:o,u:s,cyc:a,yaw:e.yaw,lean:e.lean,L:e.L,R:e.R,drive:Math.cos(2*Math.PI*(a-.05)),headCounter:t.headCounter??1,legAmp:t.legAmp??0}}let c=Math.cos(2*Math.PI*a),l=.5+.5*Math.cos(4*Math.PI*a),u=Or(a,t,n,r),d=(u.yaw??t.yawDeg*c)*Z,f=(u.lean??t.leanExitDeg+(t.leanCatchDeg-t.leanExitDeg)*l)*Z,p=u.hip==null?{}:{hip:u.hip*Z,roll:u.roll*Z,head:[u.head[0]*Z,u.head[1]*Z],bladeRoll:u.blade*Z};return{sigma:o,u:s,cyc:a,yaw:d,lean:f,L:u.L,R:u.R,lift:u.lift,wrist:u.wrist,...u.grip?{grip:u.grip}:{},...u.wrist?{pullDiag:t.pullDiag??0}:{},...p,...u.wrist?{tExit:t.tExit??.2}:{},drive:Math.cos(2*Math.PI*(a-.05)),headCounter:t.headCounter,legAmp:t.legAmp}}var Ar=new M,jr=new M,$=new M,Mr=new C;new _;var Nr=new _,Pr=new C,Fr=new M;new C;var Ir=new Map;function Lr(e=Fn){return Ir.has(e)||Ir.set(e,{yaw:0,lean:.1,roll:0,L:new M(-e,.46,-.22),R:new M(e,.46,-.22),drive:0,headCounter:0,legAmp:0,bladeRoll:0}),Ir.get(e)}var Rr=.94,zr={up:0,fwd:4,across:-2,low:.5,lean:.1,roll:.1,yaw:0,tilt:.05},Br=[{Lx:-.233,Ly:.305,Lz:-.451,phi:.182,yaw:0,lean:.285,roll:-.204,tilt:.05},{Lx:-.216,Ly:.08,Lz:-.302,phi:.04,yaw:0,lean:.314,roll:-.271,tilt:.15},{Lx:-.176,Ly:.025,Lz:-.227,phi:-.011,yaw:.04,lean:.34,roll:-.4,tilt:.1}],Vr=(e,t,n)=>{let r={L:e.L.clone().lerp(t.L,n),R:e.R.clone().lerp(t.R,n),drive:0,headCounter:1,legAmp:0};for(let i of[`yaw`,`lean`,`roll`,`bladeRoll`])r[i]=e[i]+(t[i]-e[i])*n;return r};function Hr(e,t,n){let r=new M(t*e.Lx,e.Ly,e.Lz),i=r.clone().add(new M(t*Math.cos(e.phi),-Math.sin(e.phi),0).multiplyScalar(2*n));return{yaw:t*e.yaw,lean:e.lean,roll:t*e.roll,L:t>0?r:i,R:t>0?i:r,drive:0,headCounter:1,legAmp:0,bladeRoll:Math.PI/2-e.tilt*t}}var Ur=(e,t,n,r,i)=>e===0&&r&&i?Vr(ln(r,i,zr,-1),ln(r,i,zr,1),(1+t)/2):Vr(Hr(Br[e],-1,n),Hr(Br[e],1,n),(1+t)/2);function Wr(e,t=1,n=Fn,r=null,i=null){let a=Number.isFinite(t)?Math.min(3,Math.max(1,t)):1;return a>=3?Ur(2,e,n):Vr(Ur(Math.floor(a)-1,e,n,r,i),Ur(Math.floor(a),e,n,r,i),a-Math.floor(a))}var Gr=e=>{let t={yaw:0,lean:0,roll:0,L:new M,R:new M,drive:0,headCounter:0,legAmp:0,bladeRoll:0};for(let[n,r]of e)if(n!==0){for(let e of[`yaw`,`lean`,`roll`,`drive`,`headCounter`,`legAmp`,`bladeRoll`])t[e]+=n*(r[e]??0);t.L.addScaledVector(r.L,n),t.R.addScaledVector(r.R,n),r.headExtra&&(t.headExtra??=[0,0],t.headExtra[0]+=n*r.headExtra[0],t.headExtra[1]+=n*r.headExtra[1])}let n=e.filter(([e,t])=>e>0&&t.lift);if(n.length){let[,r]=n[0];t.keyW=n.reduce((e,[t])=>e+t,0),Object.assign(t,{lift:r.lift,wrist:r.wrist,grip:r.grip,cyc:r.cyc,tExit:r.tExit,pullDiag:r.pullDiag}),t.hip=0,t.head=[0,0];for(let[n,r]of e){if(n===0)continue;t.hip+=n*(r.hip??r.yaw*kn);let e=r.head??[r.yaw*(1-Math.min(r.headCounter??0,1)),0];t.head[0]+=n*e[0],t.head[1]+=n*e[1]}}return t},Kr={phase:.01,yaw:.06,lean:1.5,head:3,nod:1.5,roll:1},qr=.75,Jr=(e,t,n)=>{let r=Math.imul(e^2654435769,2246822507)^Math.imul(t+1663821227,3266489909)^Math.imul(n^668265263,374761393);return r=Math.imul(r^r>>>15,739982445),r=Math.imul(r^r>>>12,695872825),((r^r>>>15)>>>0)/4294967295*2-1};function Yr(e,t){let n={};return Object.keys(Kr).forEach((r,i)=>{let a=t/(qr*(.8+.4*(i*.618034%1)))+i*.37,o=Math.floor(a),s=a-o,c=s*s,l=c*s,u=t=>Jr(e|0,i,o+t);n[r]=(u(-1)*(1-3*s+3*c-l)+u(0)*(4-6*c+3*l)+u(1)*(1+3*s+3*c-3*l)+u(2)*l)/6}),n}var Xr=e=>((1+e)/2)**2;function Zr(e,t,n){let r=Kr,i=1+n*r.yaw*Xr(t.yaw),a={...e,yaw:e.yaw*i,lean:e.lean+n*r.lean*Z*Xr(t.lean),roll:(e.roll??0)+n*r.roll*Z*t.roll};return e.hip!=null&&(a.hip=e.hip*i),a.headExtra=[n*r.head*Z*t.head,n*r.nod*Z*t.nod],a}function Qr(e,t,n=!0,r=Cn,i=null){let{torso:a,head:o,legs:s,paddle:c,arms:l,shoulderL:u,shoulderR:d}=e.userData,f=e.userData.paddleDims,p=f?.handX??.34,m=Lr(p),h=e.userData.rig,g=e.userData.wiggle,_=g?.amount??0,v=_>0?g.n??Yr(g.seed??1,g.t??0):null,y=e=>v?Zr(kr(e+2*Math.PI*_*Kr.phase*v.phase,r,p,h,f),v,_):kr(e,r,p,h,f),b;if(i){let[e,n,r,a,o]=i,s=e=>{let t=Math.min(1,Math.max(0,e));return t*t*(3-2*t)},c=s(e),l=s(n),u=s(r),d=c+l+u||1;b=Gr([[c/d,e>1e-4?y(t):m],[l/d,m],[u/d,Wr(Math.max(-1,Math.min(1,a)),o??1,p,h,f)]])}else b=n?y(t):{...m,sigma:1};let{pelvis:x,belly:S,chestG:C}=e.userData,w=b.roll??0,T=b.hip==null?(e,t)=>b.yaw*(t-e):(e,t)=>e===0?b.hip:(b.yaw-b.hip)*(t-e)/.75,E=(e,t,n,r,i)=>{e.rotation.set(-b.lean*(i-r),T(t,n),w*(i-r),`XYZ`),e.updateMatrix()};E(x,0,kn,0,jn),E(S,kn,An,jn,Mn),E(C,An,1,Mn,1);let D=Pr.copy(x.matrix).multiply(S.matrix).multiply(C.matrix);Fr.set(0,.26,0);let O=b.headExtra??[0,0];b.head?o.rotation.set(.7*b.lean+b.head[1]+O[1],b.head[0]-b.yaw+O[0],0,`YXZ`):o.rotation.set(.7*b.lean+O[1],-Math.min(b.headCounter,1)*b.yaw+O[0],0,`YXZ`);let k=b.L.clone().sub(Fr).applyMatrix4(D),A=b.R.clone().sub(Fr).applyMatrix4(D);if(Ar.subVectors(A,k).normalize(),$.set(0,0,1).addScaledVector(Ar,-Ar.z).normalize(),jr.crossVectors($,Ar),b.bladeRoll){let e=Math.cos(b.bladeRoll),t=Math.sin(b.bladeRoll),n=jr.clone(),r=$.clone();$.copy(r).multiplyScalar(e).addScaledVector(n,t),jr.copy(n).multiplyScalar(e).addScaledVector(r,-t)}Mr.makeBasis(Ar,jr,$),c.position.copy(k).add(A).multiplyScalar(.5),c.quaternion.setFromRotationMatrix(Mr),e.userData.paddleParts[1].rotation.x=-(r?.feather??0)*Z,c.updateMatrix(),Nr.setFromRotationMatrix(D);let j=[u,d];l.forEach((e,t)=>{let n=j[t].clone().sub(Fr).applyMatrix4(D),i=new M(e.sx*p,0,0).applyMatrix4(c.matrix),a=r.water||r.pole,o=a?Math.min(1,Math.max(0,((t?b.R.y-b.L.y:b.L.y-b.R.y)-.05)/.2)):0,s=b.lift?b.keyW??1:0,l=a?un(r,e.sx,o*o*(3-2*o)):new M(e.sx*.55,-.75,.35),u=(s>=1?pr(h?.shoulders?.[t]??j[t],t?b.R:b.L,e.sx,b.lift[t]):s>0?pr(h?.shoulders?.[t]??j[t],t?b.R:b.L,e.sx,b.lift[t]).multiplyScalar(s).addScaledVector(l.normalize(),1-s).normalize():l).applyQuaternion(Nr);if(sr(e.upper,e.fore,n,i,u),e.hand.position.copy(i),e.grip=i,e.pole=u,e.lift=b.lift?b.lift[t]:null,e.trunkDown=dr.clone().applyQuaternion(Nr),e.trunkRight=fr.clone().applyQuaternion(Nr),e.keyW=s,e.wrist=b.wrist?[b.wrist[2*t],b.wrist[2*t+1]]:null,e.paddleZ=(e.paddleZ??new M).copy($),e.cyc=b.cyc,e.gripKey=b.grip?[b.grip[2*t],b.grip[2*t+1]]:null,e.pullDiag=b.pullDiag??0,b.cyc!=null&&b.tExit!=null){let n=((b.cyc-(t?0:.5))%1+1)%1,r=e=>Math.min(1,Math.max(0,e)),i=e=>e*e*(3-2*e);e.hook=(n<=b.tExit?1:i(r(1-(n-b.tExit)/.03))+i(r((n-.97)/.03)))*s}else e.hook=0}),s.forEach((e,t)=>{let n=b.drive*(t===0?-1:1);if(e.ik){let t=b.legAmp*n*.3,r=e.ankle.clone(),i=e.ball.clone();r.z+=t,i.z+=t;let a=cr(e.hip,r,e.thighLen,e.shinLen,e.sx);X(e.thigh,e.hip,a),X(e.shin,a,r),X(e.shoe,r,i),e.now={ankle:r,ball:i};return}let r=e.knee.clone();r.y-=b.legAmp*n,r.z-=b.legAmp*.8*n,X(e.thigh,e.hip,r),X(e.shin,r,e.foot)})}export{bt as A,we as B,vt as C,dt as D,mt as E,Ge as F,ge as G,qe as H,Te as I,he as J,me as K,Ce as L,jt as M,ot as N,gt as O,rt as P,ye as R,ft as S,lt as T,be as U,Ie as V,Se as W,W as _,tr as a,ht as b,Jn as c,Zt as d,Qt as f,Xt as g,Yt as h,pr as i,xt as j,_t as k,Bn as l,$t as m,Nn as n,qn as o,Nt as p,fe as q,Qr as r,Lr as s,Rr as t,nr as u,Jt as v,pt as w,ut as x,Gt as y,ve as z};