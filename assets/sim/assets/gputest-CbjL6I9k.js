/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import{a as e,g as t}from"./perf-measure-8DR_e9rP.js";import"./modulepreload-polyfill-P2Xu9kJm.js";import{io as n,no as r}from"./three.core-Dp-eO7LC.js";import{n as i,t as a}from"./fftsea-BlV7h9PB.js";import{i as o,n as s,r as c,t as l}from"./fftgpu-CavxKjr5.js";var u=256,d=Math.log2(256),f=43,p=d+1,m=`
const N: u32 = ${u}u;
const LOGN: u32 = ${d}u;
const NR: i32 = 21;
const ROWS: u32 = ${f}u;
const PI: f32 = 3.14159265358979;
var<workgroup> wa: array<vec4f, ${u}>;
var<workgroup> wb: array<vec4f, ${u}>;
var<workgroup> wc: array<vec2f, ${u}>;
fn cmul(a: vec2f, b: vec2f) -> vec2f { return vec2f(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
fn mulI(a: vec2f) -> vec2f { return vec2f(-a.y, a.x); }
fn bitrev(i: u32) -> u32 { return reverseBits(i) >> (32u - LOGN); }
// in place, radix 2, inverse (e^{+i}), the input already in bit-reversed order; no 1/N (as)
fn butterflies(t: u32) {
  for (var s = 0u; s < LOGN; s++) {
    let half = 1u << s;
    let pos = t & (half - 1u);
    let i0 = ((t >> s) << (s + 1u)) + pos;
    let i1 = i0 + half;
    let ang = PI * f32(pos) / f32(half);
    let w = vec2f(cos(ang), sin(ang));
    let a0 = wa[i0]; let a1 = wa[i1]; let b0 = wb[i0]; let b1 = wb[i1]; let c0 = wc[i0]; let c1 = wc[i1];
    let ta = vec4f(cmul(a1.xy, w), cmul(a1.zw, w)); let tb = vec4f(cmul(b1.xy, w), cmul(b1.zw, w)); let tc = cmul(c1, w);
    wa[i0] = a0 + ta; wa[i1] = a0 - ta; wb[i0] = b0 + tb; wb[i1] = b0 - tb; wc[i0] = c0 + tc; wc[i1] = c0 - tc;
    workgroupBarrier();
  }
}
`,h=m+`
struct P { tau: f32, nS: u32, pad0: u32, pad1: u32, L: array<vec4f, 8> };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> spec: array<vec4f>;      // (Re, Im of A e^{-i w t0}, w, 0) at (ny + NR) * (nS M) + s M + nx + NR
@group(0) @binding(2) var<storage, read_write> rowsA: array<vec4f>;
@group(0) @binding(3) var<storage, read_write> rowsB: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> rowsC: array<vec2f>;
fn modeAt(s: u32, nx: i32, ny: i32) -> vec3f {
  let W = i32(p.nS) * ${s};
  let z = spec[(ny + NR) * W + i32(s) * ${s} + nx + NR];
  let ph = z.z * p.tau;
  return vec3f(cmul(z.xy, vec2f(cos(ph), -sin(ph))), z.z);
}
fn F(mp: vec2f, zp: vec3f, mm: vec2f, zm: vec3f) -> vec2f { let x = cmul(mp, zp.xy); let y = cmul(mm, zm.xy); return 0.5 * vec2f(x.x + y.x, x.y - y.y); }
fn evolve(s: u32, ix: u32, ny: i32, slot: u32) {
  let nx = select(i32(ix), i32(ix) - i32(N), ix >= N / 2u);
  var o0 = vec4f(0.0); var o1 = vec4f(0.0); var o2 = vec2f(0.0);
  if (abs(nx) <= NR) {
    let L = p.L[s >> 2u][s & 3u];
    let k = vec2f(f32(nx), f32(ny)) * (2.0 * PI / L);
    let kl = length(k);
    if (kl >= 1e-6) {
      let u = k / kl;
      let zp = modeAt(s, nx, ny); let zm = modeAt(s, -nx, -ny);
      let h = F(vec2f(1.0, 0.0), zp, vec2f(1.0, 0.0), zm); let ht = F(vec2f(0.0, -zp.z), zp, vec2f(0.0, -zm.z), zm);
      let dx = F(vec2f(0.0, u.x), zp, vec2f(0.0, -u.x), zm); let dz = F(vec2f(0.0, u.y), zp, vec2f(0.0, -u.y), zm);
      let hx = F(vec2f(0.0, k.x), zp, vec2f(0.0, -k.x), zm); let hz = F(vec2f(0.0, k.y), zp, vec2f(0.0, -k.y), zm);
      let jxx = F(vec2f(-k.x * u.x, 0.0), zp, vec2f(-k.x * u.x, 0.0), zm); let jzz = F(vec2f(-k.y * u.y, 0.0), zp, vec2f(-k.y * u.y, 0.0), zm);
      let jxz = F(vec2f(-k.y * u.x, 0.0), zp, vec2f(-k.y * u.x, 0.0), zm);
      o0 = vec4f(h + mulI(ht), dx + mulI(dz)); o1 = vec4f(hx + mulI(hz), jxx + mulI(jzz)); o2 = jxz;
    }
  }
  wa[slot] = o0; wb[slot] = o1; wc[slot] = o2;
}
@compute @workgroup_size(${u/2})
fn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_index) t: u32) {
  let s = wg.y; let r = wg.x; let ny = i32(r) - NR;
  evolve(s, t, ny, bitrev(t)); evolve(s, t + N / 2u, ny, bitrev(t + N / 2u));
  workgroupBarrier();
  butterflies(t);
  let base = (s * ROWS + r) * N;
  rowsA[base + t] = wa[t]; rowsA[base + t + N / 2u] = wa[t + N / 2u];
  rowsB[base + t] = wb[t]; rowsB[base + t + N / 2u] = wb[t + N / 2u];
  rowsC[base + t] = wc[t]; rowsC[base + t + N / 2u] = wc[t + N / 2u];
}
`,g=m+`
@group(0) @binding(0) var<storage, read> rowsA: array<vec4f>;
@group(0) @binding(1) var<storage, read> rowsB: array<vec4f>;
@group(0) @binding(2) var<storage, read> rowsC: array<vec2f>;
@group(0) @binding(3) var out0: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(4) var out1: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(5) var out2: texture_storage_2d_array<rgba16float, write>;
fn load(s: u32, x: u32, iy: u32, slot: u32) {
  let ny = select(i32(iy), i32(iy) - i32(N), iy >= N / 2u);
  if (abs(ny) <= NR) {
    let i = (s * ROWS + u32(ny + NR)) * N + x;
    wa[slot] = rowsA[i]; wb[slot] = rowsB[i]; wc[slot] = rowsC[i];
  } else { wa[slot] = vec4f(0.0); wb[slot] = vec4f(0.0); wc[slot] = vec2f(0.0); }
}
@compute @workgroup_size(${u/2})
fn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_index) t: u32) {
  let s = wg.y; let x = wg.x;
  load(s, x, t, bitrev(t)); load(s, x, t + N / 2u, bitrev(t + N / 2u));
  workgroupBarrier();
  butterflies(t);
  for (var j = 0u; j < 2u; j++) {
    let y = t + j * (N / 2u);
    textureStore(out0, vec2u(x, y), s, wa[y]); textureStore(out1, vec2u(x, y), s, wb[y]); textureStore(out2, vec2u(x, y), s, vec4f(wc[y], 0.0, 0.0));
  }
}
`,_=`
@group(0) @binding(0) var s0: texture_2d_array<f32>;
@group(0) @binding(1) var s1: texture_2d_array<f32>;
@group(0) @binding(2) var s2: texture_2d_array<f32>;
@group(0) @binding(3) var d0: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(4) var d1: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(5) var d2: texture_storage_2d_array<rgba16float, write>;
fn box(t: texture_2d_array<f32>, p: vec2u, l: u32) -> vec4f {
  let q = p * 2u;
  return 0.25 * (textureLoad(t, q, l, 0) + textureLoad(t, q + vec2u(1u, 0u), l, 0) + textureLoad(t, q + vec2u(0u, 1u), l, 0) + textureLoad(t, q + vec2u(1u, 1u), l, 0));
}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = textureDimensions(d0);
  if (id.x >= size.x || id.y >= size.y) { return; }
  textureStore(d0, id.xy, id.z, box(s0, id.xy, id.z)); textureStore(d1, id.xy, id.z, box(s1, id.xy, id.z)); textureStore(d2, id.xy, id.z, box(s2, id.xy, id.z));
}
`,v=class{constructor(e){this.device=e,this.sea=null,this.t0=null;let t=(t,n)=>e.createShaderModule({code:t,label:n});this.pipes={rows:e.createComputePipeline({layout:`auto`,compute:{module:t(h,`fft rows`),entryPoint:`main`},label:`fft rows`}),cols:e.createComputePipeline({layout:`auto`,compute:{module:t(g,`fft cols`),entryPoint:`main`},label:`fft cols`}),mips:e.createComputePipeline({layout:`auto`,compute:{module:t(_,`fft mips`),entryPoint:`main`},label:`fft mips`})},this.uni=e.createBuffer({size:144,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(36),this.uniU=new Uint32Array(this.uniF.buffer)}build(e){this.dispose(),this.sea=e,this.t0=null;let t=this.device,n=e.sets.length;this.nS=n,this.specData=new Float32Array(n*s*s*4),this.spec=t.createBuffer({size:this.specData.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});let r=n*f*u;this.rowsA=t.createBuffer({size:r*16,usage:GPUBufferUsage.STORAGE}),this.rowsB=t.createBuffer({size:r*16,usage:GPUBufferUsage.STORAGE}),this.rowsC=t.createBuffer({size:r*8,usage:GPUBufferUsage.STORAGE}),this.out=[0,1,2].map(e=>t.createTexture({label:`fft out ${e}`,size:[u,u,n],format:`rgba16float`,mipLevelCount:p,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}));let i=(e,t)=>e.createView({dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1});this.bgRows=t.createBindGroup({layout:this.pipes.rows.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:{buffer:this.spec}},{binding:2,resource:{buffer:this.rowsA}},{binding:3,resource:{buffer:this.rowsB}},{binding:4,resource:{buffer:this.rowsC}}]}),this.bgCols=t.createBindGroup({layout:this.pipes.cols.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.rowsA}},{binding:1,resource:{buffer:this.rowsB}},{binding:2,resource:{buffer:this.rowsC}},...this.out.map((e,t)=>({binding:3+t,resource:i(e,0)}))]}),this.bgMips=[];for(let e=1;e<p;e++)this.bgMips.push(t.createBindGroup({layout:this.pipes.mips.getBindGroupLayout(0),entries:[...this.out.map((t,n)=>({binding:n,resource:i(t,e-1)})),...this.out.map((t,n)=>({binding:3+n,resource:i(t,e)}))]}));e.sets.forEach((e,t)=>{this.uniF[4+t]=e.L}),this.uniU[1]=n;let a=u*u*n*24;this.bytes=r*40+r*40+a+Math.round(1/3*a*5)}dispose(){for(let e of[this.spec,this.rowsA,this.rowsB,this.rowsC,...this.out??[]])e?.destroy();this.spec=this.rowsA=this.rowsB=this.rowsC=null,this.out=null}encode(e,t){if(this.out){(this.t0==null||t<this.t0||t-this.t0>8)&&(this.t0=t,o(this.sea,t,this.specData),this.device.queue.writeBuffer(this.spec,0,this.specData)),this.uniF[0]=t-this.t0,this.device.queue.writeBuffer(this.uni,0,this.uniF),e.setPipeline(this.pipes.rows),e.setBindGroup(0,this.bgRows),e.dispatchWorkgroups(f,this.nS),e.setPipeline(this.pipes.cols),e.setBindGroup(0,this.bgCols),e.dispatchWorkgroups(u,this.nS),e.setPipeline(this.pipes.mips);for(let t=1;t<p;t++){let n=Math.max(1,u>>t);e.setBindGroup(0,this.bgMips[t-1]),e.dispatchWorkgroups(Math.ceil(n/8),Math.ceil(n/8),this.nS)}}}},y=document.getElementById(`out`),b=e=>{y.textContent+=`${e}\n`,console.log(e)},x=new URLSearchParams(location.search),S=Number(x.get(`frames`)||240),C=()=>new Promise(e=>requestAnimationFrame(e)),w=(e,t,n)=>({fp:1/Math.sqrt(2*Math.PI*e/9.81),fLo:.7,fHi:3.65,gamma:3.3,tailGain:1,dirToDeg:t,spreadDeg:n}),T=new i({layers:[{id:`w1`,kind:`windSea`,spec:w(20,67,8),seed:11,band:a.WIND,ch:0,sharp:1,target:(.85/4)**2,oct:1},{id:`s1`,kind:`windSea`,spec:w(60,80,5),seed:7,band:a.SWELL??a.WIND,ch:0,sharp:1,target:(.5/4)**2,oct:1}],cur:[-.43,-.16],ripples:[]}),E=Math.min(T.sets.length,32),D={sets:E,n:256};window.__gpuTest=D;function O(e,t,n,r,i){for(let a=1,o=0;a<i;a++){let s=i>>1;for(;o&s;s>>=1)o^=s;if(o^=s,a<o){let i=n+a*r,s=n+o*r;[e[i],e[s]]=[e[s],e[i]],[t[i],t[s]]=[t[s],t[i]]}}for(let a=2;a<=i;a<<=1){let o=2*Math.PI/a;for(let s=0;s<i;s+=a)for(let i=0;i<a/2;i++){let c=Math.cos(o*i),l=Math.sin(o*i),u=n+(s+i)*r,d=n+(s+i+a/2)*r,f=e[d]*c-t[d]*l,p=e[d]*l+t[d]*c;e[d]=e[u]-f,t[d]=t[u]-p,e[u]+=f,t[u]+=p}}}function k(e,t,n){let r=new Float64Array(786432);for(let i=0;i<6;i++){let a=new Float64Array(65536),o=new Float64Array(65536);for(let r=0;r<256;r++)for(let s=0;s<256;s++){let l=s>=128?s-256:s,u=r>=128?r-256:r,d=c(n,E,T.sets[e].L,e,l,u,t);a[r*256+s]=d[2*i],o[r*256+s]=d[2*i+1]}for(let e=0;e<256;e++)O(a,o,e*256,1,256);for(let e=0;e<256;e++)O(a,o,e,256,256);for(let e=0;e<65536;e++)r[e*12+2*i]=a[e],r[e*12+2*i+1]=o[e]}return r}var A=e=>{let t=e&32768?-1:1,n=e>>10&31,r=e&1023;return n===0?t*2**-14*(r/1024):n===31?r?NaN:t*(1/0):t*2**(n-15)*(1+r/1024)};async function j(){if(!navigator.gpu)return b(`WebGPU: not available in this browser`),null;let e=await navigator.gpu.requestAdapter({powerPreference:`high-performance`});if(!e)return b(`WebGPU: no adapter`),null;let t=e.features.has(`timestamp-query`),n=await e.requestDevice({requiredFeatures:t?[`timestamp-query`]:[]}),r=new v(n);r.build({...T,sets:T.sets.slice(0,E)}),b(`WebGPU: ${e.info?.vendor??``} ${e.info?.architecture??``}; timestamp queries ${t?`yes`:`no`}; ${E} sets of 256²; about ${(r.bytes/1e6).toFixed(1)} MB of memory traffic a frame`);let i=3.7;{let e=n.createCommandEncoder(),t=e.beginComputePass();r.encode(t,i),t.end();let a=2048,s=r.out.map(()=>n.createBuffer({size:a*256,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}));r.out.forEach((t,n)=>e.copyTextureToBuffer({texture:t,origin:[0,0,0]},{buffer:s[n],bytesPerRow:a},[256,256,1])),n.queue.submit([e.finish()]),await Promise.all(s.map(e=>e.mapAsync(GPUMapMode.READ)));let c=s.map(e=>new Uint16Array(e.getMappedRange().slice(0))),l=k(0,i-r.t0,o({sets:T.sets.slice(0,E)},r.t0)),u=0,d=0;for(let e=0;e<65536;e++)for(let t=0;t<10;t++){let n=A(c[t>>2][e*4+(t&3)]),r=l[e*12+t];u=Math.max(u,Math.abs(n-r)),d+=r*r}d=Math.sqrt(d/655360),D.check={maxErr:u,rms:d,rel:u/d},b(`WebGPU check against JavaScript (set 0): largest error ${u.toExponential(2)}, fields' RMS ${d.toExponential(2)}, ratio ${(u/d).toExponential(2)} (half float holds about 1e-3)`)}let a=t?n.createQuerySet({type:`timestamp`,count:2}):null,s=t?n.createBuffer({size:16,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}):null,c=[],l=[];for(let e=0;e<S;e++){await C();let i=n.createCommandEncoder(),o=i.beginComputePass(t?{timestampWrites:{querySet:a,beginningOfPassWriteIndex:0,endOfPassWriteIndex:1}}:{});r.encode(o,4+e/60),o.end();let u=null;t&&(i.resolveQuerySet(a,0,2,s,0),u=n.createBuffer({size:16,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),i.copyBufferToBuffer(s,0,u,0,16));let d=performance.now();if(n.queue.submit([i.finish()]),await n.queue.onSubmittedWorkDone(),l.push(performance.now()-d),u){await u.mapAsync(GPUMapMode.READ);let e=new BigUint64Array(u.getMappedRange());c.push(Number(e[1]-e[0])/1e6),u.unmap(),u.destroy()}}let u=e=>{let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]};return D.webgpu={gpuMs:c.length?u(c):null,wallMs:u(l),bytes:r.bytes},b(`WebGPU FFT: ${c.length?`${u(c).toFixed(3)} ms GPU (median of ${c.length})`:`no GPU timer`}; submit to done ${u(l).toFixed(2)} ms`),r.dispose(),n.destroy(),D.webgpu}async function M(){let e=document.createElement(`canvas`);e.width=e.height=64,document.body.appendChild(e);let i=new t({canvas:e,powerPreference:`high-performance`}),a={uniforms:{uFN:{value:0},uFSet:{value:Array.from({length:32},()=>new n)},uFCp:{value:new r},uFT0:{value:null},uFT1:{value:null},uFT2:{value:null}}},o=new l(i,a),s={...T,sets:T.sets.slice(0,E),peakVelocity:()=>T.peakVelocity(),peakGroups:()=>[]},c=i.getContext(),u=c.getExtension(`EXT_disjoint_timer_query_webgl2`);o.update(s,4);let d=[],f=[];for(let e=0;e<S;e++){await C();let t=null;u&&(t=c.createQuery(),c.beginQuery(u.TIME_ELAPSED_EXT,t)),o.update(s,4+e/60),t&&(c.endQuery(u.TIME_ELAPSED_EXT),f.push(t));for(let e=f.length-1;e>=0;e--)c.getQueryParameter(f[e],c.QUERY_RESULT_AVAILABLE)&&(c.getParameter(u.GPU_DISJOINT_EXT)||d.push(c.getQueryParameter(f[e],c.QUERY_RESULT)/1e6),c.deleteQuery(f[e]),f.splice(e,1))}for(let e=0;e<30&&f.length;e++){await C();for(let e=f.length-1;e>=0;e--)c.getQueryParameter(f[e],c.QUERY_RESULT_AVAILABLE)&&(d.push(c.getQueryParameter(f[e],c.QUERY_RESULT)/1e6),c.deleteQuery(f[e]),f.splice(e,1))}let p=e=>{let t=e.slice().sort((e,t)=>e-t);return t[Math.floor(t.length/2)]},m=17*(Math.min(E,8)*256*256*Math.ceil(E/8))*72+E*256*256*48+Math.round(E*256*256*24*5/3);return D.webgl={gpuMs:d.length?p(d):null,bytes:m},b(`WebGL FFT: ${d.length?`${p(d).toFixed(3)} ms GPU (median of ${d.length})`:`no GPU timer`}; about ${(m/1e6).toFixed(0)} MB of memory traffic a frame`),i.dispose(),e.remove(),D.webgl}(async()=>{b(`The sea's FFT, WebGL against WebGPU: ${E} sets of 256², ${S} frames each`);try{await M()}catch(e){b(`WebGL failed: ${e.message}`)}try{await j()}catch(e){b(`WebGPU failed: ${e.message}`)}D.webgl?.gpuMs&&D.webgpu?.gpuMs&&b(`WebGPU takes ${(D.webgpu.gpuMs/D.webgl.gpuMs*100).toFixed(0)}% of the WebGL time; traffic ${(D.webgpu.bytes/D.webgl.bytes*100).toFixed(0)}%`),D.done=!0,b(`done`);let t=`build ${document.querySelector(`meta[name=build]`)?.content??``}\n${navigator.userAgent}\n${innerWidth}x${innerHeight} at ${devicePixelRatio}x\n${location.href}\n\n${y.textContent}`,n=[D.webgl?.gpuMs?`WebGL FFT: ${D.webgl.gpuMs.toFixed(2)} ms of GPU a frame`:`WebGL FFT: no GPU timer here`,D.webgpu?.gpuMs?`WebGPU FFT: ${D.webgpu.gpuMs.toFixed(2)} ms of GPU a frame`:D.webgpu?`WebGPU FFT: no GPU timer here (submit to done ${D.webgpu.wallMs.toFixed(1)} ms)`:`WebGPU: not available`,D.check?`WebGPU matches the JavaScript transform to ${D.check.rel.toExponential(1)} of the fields' size`:``].filter(Boolean),r=[`mike`,`liddell`].join(`.`)+`@`+[`gmail`,`com`].join(`.`);e().done({lines:n,onSend:()=>{navigator.clipboard?.writeText?.(t).catch(()=>{}),location.href=`mailto:${r}?subject=Surfski%20WebGPU%20comparison&body=${encodeURIComponent(t)}`},onCopy:e=>{(navigator.clipboard?.writeText?.(t)??Promise.reject()).then(()=>e(!0),()=>e(!1))}})})();