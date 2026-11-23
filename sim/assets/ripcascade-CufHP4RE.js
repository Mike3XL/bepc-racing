/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import{$r as e,Dr as t,Gt as n,Hn as r,Rn as i,Rt as a,V as o,Wi as s,Yt as c,_r as l,ar as u,do as d,ea as f,ft as p,jr as m,lo as h,ta as g}from"./three.core-Dp-eO7LC.js";import{o as _,u as v}from"./fftsea-BlV7h9PB.js";var y=[[.72,1.5],[.35,.72],[.13,.35],[.05,.13],[.0245,.05],[.012,.0245],[.006,.012],[.003,.006]].map(([e,t])=>[e,t,40*e]),b=2*Math.PI,x=typeof location<`u`&&new URLSearchParams(location.search).get(`fftfloat`)===`1`?a:c;function S(e=5,{fp:t=null,spread:n=1}={}){let r=2048,i=new Float32Array(r*256*4),a=e>>>0,o=()=>{a=a+1831565813>>>0;let e=a;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},s=()=>Math.sqrt(-2*Math.log(1-o()*.999999))*Math.cos(b*o());for(let e=0;e<8;e++){let[a,o,c]=y[e],l=b/o,u=b/a,d=new Float32Array(65536),f=new Float32Array(65536),p=0;for(let e=0;e<256;e++)for(let r=0;r<256;r++){let i=(r>=128?r-256:r)*b/c,a=(e>=128?e-256:e)*b/c,o=Math.hypot(i,a),p=e*256+r;if(o<l*.8||o>u*1.2)continue;let m=Math.log(o),h=Math.min(1,Math.max(0,(m-Math.log(l*.8))/Math.log(1.25)))*Math.min(1,Math.max(0,(Math.log(u*1.2)-m)/Math.log(1.2))),g=_(Math.atan2(-a,-i),v(o,t,n)),y=o**-4*h*g,x=Math.sqrt(y/2);d[p]=s()*x,f[p]=s()*x}for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=(t>=128?t-256:t)*b/c,r=(e>=128?e-256:e)*b/c,i=e*256+t,a=(256-e)%256*256+(256-t)%256;p+=(n*n+r*r)*(d[i]*d[i]+f[i]*f[i]+d[a]*d[a]+f[a]*f[a])}let m=p>0?Math.sqrt(.5/p):0;for(let t=0;t<256;t++)for(let n=0;n<256;n++){let a=t*256+n,o=(256-t)%256*256+(256-n)%256,s=4*(t*r+e*256+n);i[s]=d[a]*m,i[s+1]=f[a]*m,i[s+2]=d[o]*m,i[s+3]=-f[o]*m}}return i}var C=`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,w=`precision highp float; precision highp sampler2D; precision highp int;
const int N = 256; const float TAU = 6.2831853;
layout(location = 0) out highp vec4 oA;
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
`,T=w+`
uniform sampler2D uH0; uniform float uTile[8]; uniform float uPhase;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy); int c = p.x / N; int ix = p.x - c * N, iy = p.y;
float T = uTile[c];
vec2 k = vec2(float(ix >= N / 2 ? ix - N : ix), float(iy >= N / 2 ? iy - N : iy)) * (TAU / T);
float kl = length(k);
if (kl < 1e-6) { oA = vec4(0.0); return; }
vec4 h0 = texelFetch(uH0, p, 0);
float w = sqrt(9.81 * kl + 7.28e-5 * kl * kl * kl), n = floor(w * 128.0 / TAU + 0.5);
float ph = TAU * fract(n * uPhase);
vec2 e = vec2(cos(ph), sin(ph));
vec2 h = cmul(h0.xy, e) + cmul(h0.zw, vec2(e.x, -e.y));
vec2 ih = vec2(-h.y, h.x);
vec2 z1 = k.x * ih - k.y * h;
float lam = TAU / kl, sgn = lam > 0.017 ? 1.0 : -1.0;
oA = vec4(z1, sgn * kl * h);
}`,E=w+`
uniform sampler2D uSrc; uniform int uNs; uniform int uRows;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy); int c = p.x / N; int lx = p.x - c * N;
int d = uRows == 1 ? lx : p.y;
int Ns2 = 2 * uNs, g = d / Ns2, r = d - g * Ns2, k = r % uNs, j = g * uNs + k;
float ang = TAU * float(k) / float(Ns2);
vec2 w = vec2(cos(ang), sin(ang));
ivec2 A = uRows == 1 ? ivec2(c * N + j, p.y) : ivec2(p.x, j), B = uRows == 1 ? ivec2(c * N + j + N / 2, p.y) : ivec2(p.x, j + N / 2);
vec4 va = texelFetch(uSrc, A, 0), vb = texelFetch(uSrc, B, 0);
vec4 tb = vec4(cmul(vb.xy, w), cmul(vb.zw, w));
oA = r < uNs ? va + tb : va - tb;
}`,D=w+`
layout(location = 1) out highp vec4 oM;
uniform sampler2D uSrc; uniform int uCascade;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
vec4 z = texelFetch(uSrc, ivec2(uCascade * N + p.x, p.y), 0);
vec2 s = z.xy;
oA = vec4(s, z.z, 0.0);
oM = vec4(s.x * s.x, s.y * s.y, s.x * s.y, 0.0);
}`,O=class{constructor(_,v){this.renderer=_,this.water=v,this.first=!0;let b=new h(256,256,8,{count:2,type:c,format:e,depthBuffer:!1,stencilBuffer:!1,minFilter:r,magFilter:i,generateMipmaps:!0,wrapS:s,wrapT:s}),w=typeof location<`u`&&Number(new URLSearchParams(location.search).get(`aniso`))||2;for(let e of b.textures)e.anisotropy=w,e.wrapR=o,e.wrapS=e.wrapT=s,e.minFilter=r,e.magFilter=i;this.rt=b,this.quad=new u(new m(2,2)),this.quad.frustumCulled=!1,this.scene=new f,this.scene.add(this.quad),this.camera=new t(-1,1,1,-1,0,1);let O=v.uniforms;O.uCS.value=b.textures[0],O.uCM.value=b.textures[1],O.uCT.value=new Float32Array(y.map(e=>e[2]));let k=2048,A=()=>new d(k,256,{type:x,format:e,depthBuffer:!1,stencilBuffer:!1,minFilter:l,magFilter:l}),j=new p(S(),k,256,e,a);j.minFilter=j.magFilter=l,j.needsUpdate=!0,this.h0=j,this.shapeKey=`null:1`,this.pp=[A(),A()];let M=(e,t)=>new g({vertexShader:C,fragmentShader:e,uniforms:t,glslVersion:n,depthTest:!1,depthWrite:!1});this.evolveU={uH0:{value:j},uTile:{value:new Float32Array(y.map(e=>e[2]))},uPhase:{value:0}},this.stageU={uSrc:{value:null},uNs:{value:1},uRows:{value:1}},this.asmU={uSrc:{value:null},uCascade:{value:0}},this.mats={evolve:M(T,this.evolveU),stage:M(E,this.stageU),asm:M(D,this.asmU)}}setShape(e){let t=e?.fp??null,n=e?.spread??1,r=`${t==null?`null`:t.toFixed(5)}:${n.toFixed(3)}`;r!==this.shapeKey&&(this.shapeKey=r,this.h0.image.data.set(S(5,{fp:t,spread:n})),this.h0.needsUpdate=!0)}update(e){let t=this.renderer,n=t.getRenderTarget(),r=t.autoClear,i=this.quad;t.autoClear=!1;let a=(e,n,r)=>{i.material=e,r==null?t.setRenderTarget(n):t.setRenderTarget(n,r),t.render(this.scene,this.camera)};this.evolveU.uPhase.value=e/128%1;let o=0;a(this.mats.evolve,this.pp[0]);for(let e of[1,0])for(let t=1;t<256;t*=2)this.stageU.uSrc.value=this.pp[o].texture,this.stageU.uNs.value=t,this.stageU.uRows.value=e,a(this.mats.stage,this.pp[1-o]),o=1-o;this.asmU.uSrc.value=this.pp[o].texture;for(let e=0;e<8;e++)this.asmU.uCascade.value=e,a(this.mats.asm,this.rt,e);if(t.setRenderTarget(n),t.autoClear=r,this.first){this.first=!1;for(let e of this.rt.textures)e.generateMipmaps=!1}let s=t.getContext();for(let e of this.rt.textures){let n=t.properties.get(e).__webglTexture;t.state.bindTexture(s.TEXTURE_2D_ARRAY,n),s.generateMipmap(s.TEXTURE_2D_ARRAY)}t.state.unbindTexture()}};export{y as n,S as r,O as t};