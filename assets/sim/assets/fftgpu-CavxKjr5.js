/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import{$r as e,Dr as t,Gt as n,Hn as r,Lt as i,Rn as a,Rt as o,V as s,Wi as c,Yt as l,_r as u,ar as d,do as f,ea as p,ft as m,j as h,jr as g,lo as _,ta as v}from"./three.core-Dp-eO7LC.js";import"./fftsea-BlV7h9PB.js";var y=43,b=typeof location<`u`&&new URLSearchParams(location.search).get(`fftfloat`)===`1`?o:l,x=2*Math.PI;function S(e,t,n=new Float32Array(e.sets.length*y*y*4)){n.fill(0);let r=e.sets.length*y;return e.sets.forEach((e,i)=>{for(let a=0;a<e.n;a++){let o=e.w[a]*t,s=Math.cos(o),c=Math.sin(o),l=4*((e.ny[a]+21)*r+i*y+e.nx[a]+21);n[l]=e.re[a]*s+e.im[a]*c,n[l+1]=e.im[a]*s-e.re[a]*c,n[l+2]=e.w[a]}}),n}function C(e,t,n,r,i,a,o){let s=new Float64Array(12);if(Math.abs(i)>21||Math.abs(a)>21)return s;let c=x/n,l=i*c,u=a*c,d=Math.hypot(l,u);if(d<1e-6)return s;let f=l/d,p=u/d,m=t*y,h=(t,n)=>{let i=4*((n+21)*m+r*y+t+21),a=e[i+2],s=Math.cos(a*o),c=Math.sin(a*o);return[e[i]*s+e[i+1]*c,e[i+1]*s-e[i]*c,a]},[g,_,v]=h(i,a),[b,S,C]=h(-i,-a),w=(e,t,n,r)=>{let i=e*g-t*_,a=e*_+t*g,o=n*b-r*S,s=n*S+r*b;return[.5*(i+o),.5*(a-s)]},T=w(1,0,1,0),E=w(0,-v,0,-C),D=w(0,f,0,-f),O=w(0,p,0,-p),k=w(0,l,0,-l),A=w(0,u,0,-u),j=w(-l*f,0,-l*f,0),M=w(-u*p,0,-u*p,0),N=w(-u*f,0,-u*f,0),P=(e,t,n)=>{s[n]=e[0]-t[1],s[n+1]=e[1]+t[0]};return P(T,E,0),P(D,O,2),P(k,A,4),P(j,M,6),P(N,[0,0],8),s}var w=`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,T=`precision highp float; precision highp int; precision highp sampler2D;
const int N = 256, NR = 21, MM = ${y};
const float TAU = 6.28318530718;
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
vec2 mulI(vec2 a) { return vec2(-a.y, a.x); }
layout(location = 0) out highp vec4 o0; layout(location = 1) out highp vec4 o1; layout(location = 2) out highp vec4 o2;
`,E=T+`
uniform sampler2D uSpec; uniform float uL[32]; uniform int uNS; uniform int uBase; uniform float uTau;
vec3 modeAt(int s, int nx, int ny) {
vec4 z = texelFetch(uSpec, ivec2(s * MM + nx + NR, ny + NR), 0);
float ph = z.z * uTau; vec2 e = vec2(cos(ph), -sin(ph));
return vec3(cmul(z.xy, e), z.z);
}
vec2 F(vec2 mp, vec3 zp, vec2 mm, vec3 zm) { vec2 x = cmul(mp, zp.xy), y = cmul(mm, zm.xy); return 0.5 * vec2(x.x + y.x, x.y - y.y); }
void main() {
ivec2 p = ivec2(gl_FragCoord.xy); int tx = p.x / N, s = uBase + tx, ix = p.x - tx * N, iy = p.y;
int nx = ix >= N / 2 ? ix - N : ix, ny = iy >= N / 2 ? iy - N : iy;
o0 = vec4(0.0); o1 = vec4(0.0); o2 = vec4(0.0);
if (s >= uNS || abs(nx) > NR || abs(ny) > NR) return;
float dk = TAU / uL[s]; vec2 k = vec2(float(nx), float(ny)) * dk; float kl = length(k);
if (kl < 1e-6) return;
vec2 u = k / kl;
vec3 zp = modeAt(s, nx, ny), zm = modeAt(s, -nx, -ny);
vec2 h = F(vec2(1.0, 0.0), zp, vec2(1.0, 0.0), zm), ht = F(vec2(0.0, -zp.z), zp, vec2(0.0, -zm.z), zm);
vec2 dx = F(vec2(0.0, u.x), zp, vec2(0.0, -u.x), zm), dz = F(vec2(0.0, u.y), zp, vec2(0.0, -u.y), zm);
vec2 hx = F(vec2(0.0, k.x), zp, vec2(0.0, -k.x), zm), hz = F(vec2(0.0, k.y), zp, vec2(0.0, -k.y), zm);
vec2 jxx = F(vec2(-k.x * u.x, 0.0), zp, vec2(-k.x * u.x, 0.0), zm), jzz = F(vec2(-k.y * u.y, 0.0), zp, vec2(-k.y * u.y, 0.0), zm);
vec2 jxz = F(vec2(-k.y * u.x, 0.0), zp, vec2(-k.y * u.x, 0.0), zm);
o0 = vec4(h + mulI(ht), dx + mulI(dz)); o1 = vec4(hx + mulI(hz), jxx + mulI(jzz)); o2 = vec4(jxz, 0.0, 0.0);
}`,D=T+`
uniform sampler2D uS0, uS1, uS2; uniform int uNs; uniform int uRows;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy); int tx = p.x / N, lx = p.x - tx * N, ly = p.y;
int d = uRows == 1 ? lx : ly;
int Ns2 = 2 * uNs, g = d / Ns2, r = d - g * Ns2, k = r - (r / uNs) * uNs, j = g * uNs + k;
float ang = TAU * float(k) / float(Ns2); vec2 w = vec2(cos(ang), sin(ang));
ivec2 A = uRows == 1 ? ivec2(tx * N + j, p.y) : ivec2(p.x, j), B = uRows == 1 ? ivec2(tx * N + j + N / 2, p.y) : ivec2(p.x, j + N / 2);
float sg = r < uNs ? 1.0 : -1.0;
vec4 a = texelFetch(uS0, A, 0), b = texelFetch(uS0, B, 0); o0 = a + sg * vec4(cmul(b.xy, w), cmul(b.zw, w));
a = texelFetch(uS1, A, 0); b = texelFetch(uS1, B, 0); o1 = a + sg * vec4(cmul(b.xy, w), cmul(b.zw, w));
a = texelFetch(uS2, A, 0); b = texelFetch(uS2, B, 0); o2 = a + sg * vec4(cmul(b.xy, w), cmul(b.zw, w));
}`,O=T+`
uniform sampler2D uS0, uS1, uS2; uniform int uSlot;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy), q = ivec2(uSlot * N + p.x, p.y);
o0 = texelFetch(uS0, q, 0); o1 = texelFetch(uS1, q, 0); o2 = texelFetch(uS2, q, 0);
}`,k=class{constructor(e,r){this.renderer=e,this.water=r,this.sea=null,this.t0=null;let i=(e,t)=>new v({vertexShader:w,fragmentShader:e,uniforms:t,glslVersion:n,depthTest:!1,depthWrite:!1});this.evolveU={uSpec:{value:null},uL:{value:new Float32Array(32)},uNS:{value:0},uBase:{value:0},uTau:{value:0}},this.stageU={uS0:{value:null},uS1:{value:null},uS2:{value:null},uNs:{value:1},uRows:{value:1}},this.asmU={uS0:{value:null},uS1:{value:null},uS2:{value:null},uSlot:{value:0}},this.mats={evolve:i(E,this.evolveU),stage:i(D,this.stageU),asm:i(O,this.asmU)},this.full=new g(2,2),this.quad=new d(this.full,this.mats.evolve),this.quad.frustumCulled=!1,this.scene=new p,this.scene.add(this.quad),this.camera=new t(-1,1,1,-1,0,1)}_build(t){this._dispose(),this.sea=t,this.t0=null;let n=this.water.uniforms;if(!t||!t.sets.length){n.uFN.value=0;return}let d=t.sets.length,p=Math.min(d,8)*256,g=()=>new f(p,256,{count:3,type:b,format:e,depthBuffer:!1,stencilBuffer:!1,minFilter:u,magFilter:u,generateMipmaps:!1});this.pp=[g(),g()];let v=new _(256,256,d,{count:3,type:l,format:e,depthBuffer:!1,stencilBuffer:!1,minFilter:r,magFilter:a,generateMipmaps:!0,wrapS:c,wrapT:c});for(let e of v.textures)e.wrapS=e.wrapT=c,e.wrapR=s,e.minFilter=r,e.magFilter=a;this.out=v,this.first=!0,this.specData=new Float32Array(d*y*y*4),this.spec=new m(this.specData,d*y,y,e,o),this.spec.minFilter=this.spec.magFilter=u,this.evolveU.uSpec.value=this.spec,this.evolveU.uNS.value=d,t.sets.forEach((e,t)=>{this.evolveU.uL.value[t]=e.L});let x=p/256,S=e=>2*e/256-1,C=(e,t)=>{let n=[];for(let[r,i]of t)n.push(-1,r,0,e,r,0,e,i,0,-1,r,0,e,i,0,-1,i,0);let r=new h;return r.setAttribute(`position`,new i(n,3)),r};this.quads=Array.from({length:x+1},(e,t)=>t?{full:C(-1+2*t/x,[[-1,1]]),strip:C(-1+2*t/x,[[S(0),S(22)],[S(235),S(256)]])}:null);let w=n.uFSet.value;for(let e=0;e<32;e++)w[e].set(e<d?t.sets[e].L:1,e<d?t.sets[e].band:0,e<d?t.sets[e].ch:0,e<d?t.sets[e].span-1:0);if(n.uFMss)for(let e=0;e<32;e++)n.uFMss.value[e]=e<d?t.sets[e].slopeVar??0:0;if(n.uFPk){n.uFPk.value.fill(0),n.uPkG.value[0].set(0,0),n.uPkG.value[1].set(0,0);for(let e of t.peakGroups()){let r=e.name===`swell`?1:2;for(let i of e.sets)n.uFPk.value[t.sets.indexOf(i)]=r;n.uPkG.value[r-1].set(e.omega,e.k),n.uPkD.value[r-1].set(e.dx,e.dy)}}let T=t.peakVelocity();n.uFCp.value.set(T[0],T[1]),n.uFT0.value=v.textures[0],n.uFT1.value=v.textures[1],n.uFT2.value=v.textures[2],n.uFN.value=d}_dispose(){for(let e of[...this.pp??[],this.out])e?.dispose();this.spec?.dispose();for(let e of this.quads??[])e?.full.dispose(),e?.strip.dispose();this.pp=null,this.out=null,this.spec=null,this.quads=null}update(e,t){if(e!==this.sea&&this._build(e),!this.out)return;this.lastT=t,(this.t0==null||t<this.t0||t-this.t0>8)&&(this.t0=t,S(this.sea,t,this.specData),this.spec.needsUpdate=!0);let n=this.renderer,r=n.getRenderTarget(),i=n.autoClear,a=this.quad;n.autoClear=!1;let o=(e,t,r,i=this.full)=>{a.material=e,a.geometry=i,r==null?n.setRenderTarget(t):n.setRenderTarget(t,r),n.render(this.scene,this.camera)};this.evolveU.uTau.value=t-this.t0;let s=this.stageU,c=this.asmU,l=this.sea.sets.length;for(let e=0;e<l;e+=8){let t=this.quads[Math.min(8,l-e)];this.evolveU.uBase.value=e;let n=0;o(this.mats.evolve,this.pp[0],null,t.full);for(let e of[1,0])for(let r=1;r<256;r*=2){let i=this.pp[n].textures;s.uS0.value=i[0],s.uS1.value=i[1],s.uS2.value=i[2],s.uNs.value=r,s.uRows.value=e,o(this.mats.stage,this.pp[1-n],null,e?t.strip:t.full),n=1-n}let r=this.pp[n].textures;c.uS0.value=r[0],c.uS1.value=r[1],c.uS2.value=r[2];for(let t=e;t<Math.min(l,e+8);t++)c.uSlot.value=t-e,o(this.mats.asm,this.out,t)}a.geometry=this.full,n.setRenderTarget(r),n.autoClear=i,this._mips()}_mips(){let e=this.renderer;if(this.first){this.first=!1;for(let e of this.out.textures)e.generateMipmaps=!1}let t=e.getContext();for(let n of this.out.textures){let r=e.properties.get(n).__webglTexture;e.state.bindTexture(t.TEXTURE_2D_ARRAY,r),t.generateMipmap(t.TEXTURE_2D_ARRAY)}e.state.unbindTexture()}};export{S as i,y as n,C as r,k as t};