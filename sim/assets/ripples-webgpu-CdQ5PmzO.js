/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
import"./fftsea-BlV7h9PB.js";import{i as e,n as t}from"./fftgpu-CavxKjr5.js";import{n,r}from"./ripcascade-DKXb2b1O.js";var i=256,a=Math.log2(256),o=43,s=a+1;function c(e,t=i){let n=Math.log2(t),r=(e,t)=>t===`vec4f`?`vec4f(cmul(${e}.xy, w), cmul(${e}.zw, w))`:`cmul(${e}, w)`;return`
const N: u32 = ${t}u;
const LOGN: u32 = ${n}u;
const PI: f32 = 3.14159265358979;
${e.map(([e,n])=>`var<workgroup> ${e}: array<${n}, ${t}>;`).join(`
`)}
fn cmul(a: vec2f, b: vec2f) -> vec2f { return vec2f(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
fn mulI(a: vec2f) -> vec2f { return vec2f(-a.y, a.x); }
fn bitrev(i: u32) -> u32 { return reverseBits(i) >> (32u - LOGN); }
fn butterflies(t: u32) {
  for (var s = 0u; s < LOGN; s++) {
    let half = 1u << s;
    let pos = t & (half - 1u);
    let i0 = ((t >> s) << (s + 1u)) + pos;
    let i1 = i0 + half;
    let ang = PI * f32(pos) / f32(half);
    let w = vec2f(cos(ang), sin(ang));
${e.map(([e,t])=>`    { let a = ${e}[i0]; let b = ${r(`${e}[i1]`,t)}; ${e}[i0] = a + b; ${e}[i1] = a - b; }`).join(`
`)}
    workgroupBarrier();
  }
}
`}function l(e){let t=[...Array(e).keys()];return`
${t.map(e=>`@group(0) @binding(${e}) var s${e}: texture_2d_array<f32>;`).join(`
`)}
${t.map(t=>`@group(0) @binding(${e+t}) var d${t}: texture_storage_2d_array<rgba16float, write>;`).join(`
`)}
fn box(t: texture_2d_array<f32>, p: vec2u, l: u32) -> vec4f {
  let q = p * 2u;
  return 0.25 * (textureLoad(t, q, l, 0) + textureLoad(t, q + vec2u(1u, 0u), l, 0) + textureLoad(t, q + vec2u(0u, 1u), l, 0) + textureLoad(t, q + vec2u(1u, 1u), l, 0));
}
@compute @workgroup_size(8, 8, 1)
fn main(@builtin(global_invocation_id) id: vec3u) {
  let size = textureDimensions(d0);
  if (id.x >= size.x || id.y >= size.y) { return; }
${t.map(e=>`  textureStore(d${e}, id.xy, id.z, box(s${e}, id.xy, id.z));`).join(`
`)}
}
`}function u(e,t,n){let r=(e,t)=>e.createView({dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1}),i=n.length,a=[];for(let o=1;o<n[0].mipLevelCount;o++)a.push(e.createBindGroup({layout:t.getBindGroupLayout(0),entries:[...n.map((e,t)=>({binding:t,resource:r(e,o-1)})),...n.map((e,t)=>({binding:i+t,resource:r(e,o)}))]}));return a}function d(e,t,n,r,i){e.setPipeline(t),n.forEach((t,n)=>{let a=Math.max(1,r>>n+1);e.setBindGroup(0,t),e.dispatchWorkgroups(Math.ceil(a/8),Math.ceil(a/8),i)})}var f=c([[`wa`,`vec4f`],[`wb`,`vec4f`],[`wc`,`vec2f`]])+`
const NR: i32 = 21;
const ROWS: u32 = ${o}u;
`,p=f+`
struct P { tau: f32, nS: u32, pad0: u32, pad1: u32, L: array<vec4f, 8> };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> spec: array<vec4f>;      // (Re, Im of A e^{-i w t0}, w, 0) at (ny + NR) * (nS M) + s M + nx + NR
@group(0) @binding(2) var<storage, read_write> rowsA: array<vec4f>;
@group(0) @binding(3) var<storage, read_write> rowsB: array<vec4f>;
@group(0) @binding(4) var<storage, read_write> rowsC: array<vec2f>;
fn modeAt(s: u32, nx: i32, ny: i32) -> vec3f {
  let W = i32(p.nS) * ${t};
  let z = spec[(ny + NR) * W + i32(s) * ${t} + nx + NR];
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
@compute @workgroup_size(${i/2})
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
`,m=f+`
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
@compute @workgroup_size(${i/2})
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
`,h=class{constructor(e){this.device=e,this.sea=null,this.t0=null;let t=(t,n)=>e.createShaderModule({code:t,label:n});this.pipes={rows:e.createComputePipeline({layout:`auto`,compute:{module:t(p,`fft rows`),entryPoint:`main`},label:`fft rows`}),cols:e.createComputePipeline({layout:`auto`,compute:{module:t(m,`fft cols`),entryPoint:`main`},label:`fft cols`}),mips:e.createComputePipeline({layout:`auto`,compute:{module:t(l(3),`fft mips`),entryPoint:`main`},label:`fft mips`})},this.uni=e.createBuffer({size:144,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(36),this.uniU=new Uint32Array(this.uniF.buffer)}build(e){this.dispose(),this.sea=e,this.t0=null;let n=this.device,r=e.sets.length;this.nS=r,this.specData=new Float32Array(r*t*t*4),this.spec=n.createBuffer({size:this.specData.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});let a=r*o*i;this.rowsA=n.createBuffer({size:a*16,usage:GPUBufferUsage.STORAGE}),this.rowsB=n.createBuffer({size:a*16,usage:GPUBufferUsage.STORAGE}),this.rowsC=n.createBuffer({size:a*8,usage:GPUBufferUsage.STORAGE}),this.out=[0,1,2].map(e=>n.createTexture({label:`fft out ${e}`,size:[i,i,r],format:`rgba16float`,mipLevelCount:s,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}));let c=(e,t)=>e.createView({dimension:`2d-array`,baseMipLevel:t,mipLevelCount:1});this.bgRows=n.createBindGroup({layout:this.pipes.rows.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:{buffer:this.spec}},{binding:2,resource:{buffer:this.rowsA}},{binding:3,resource:{buffer:this.rowsB}},{binding:4,resource:{buffer:this.rowsC}}]}),this.bgCols=n.createBindGroup({layout:this.pipes.cols.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.rowsA}},{binding:1,resource:{buffer:this.rowsB}},{binding:2,resource:{buffer:this.rowsC}},...this.out.map((e,t)=>({binding:3+t,resource:c(e,0)}))]}),this.bgMips=u(n,this.pipes.mips,this.out),e.sets.forEach((e,t)=>{this.uniF[4+t]=e.L}),this.uniU[1]=r;let l=i*i*r*24;this.bytes=a*40+a*40+l+Math.round(1/3*l*5)}dispose(){for(let e of[this.spec,this.rowsA,this.rowsB,this.rowsC,...this.out??[]])e?.destroy();this.spec=this.rowsA=this.rowsB=this.rowsC=null,this.out=null}encode(t,n){this.out&&((this.t0==null||n<this.t0||n-this.t0>8)&&(this.t0=n,e(this.sea,n,this.specData),this.device.queue.writeBuffer(this.spec,0,this.specData)),this.uniF[0]=n-this.t0,this.device.queue.writeBuffer(this.uni,0,this.uniF),t.setPipeline(this.pipes.rows),t.setBindGroup(0,this.bgRows),t.dispatchWorkgroups(o,this.nS),t.setPipeline(this.pipes.cols),t.setBindGroup(0,this.bgCols),t.dispatchWorkgroups(i,this.nS),d(t,this.pipes.mips,this.bgMips,i,this.nS))}},g=256,_=Math.log2(g)+1,v=Math.ceil(1.2*(n[0][2]/n[0][0])),y=2*v+1,b=c([[`wa`,`vec4f`]],g)+`
const RR: i32 = ${v};
const ROWS: u32 = ${y}u;
const TAU: f32 = 6.2831853;
struct P { phase: f32, pad0: f32, pad1: f32, pad2: f32, tile: array<vec4f, 2> };
@group(0) @binding(0) var<uniform> p: P;
@group(0) @binding(1) var<storage, read> spec: array<vec4f>;      // (h0(k), conj h0(-k)) at (c ROWS + ny + RR) ROWS + nx + RR
@group(0) @binding(2) var<storage, read_write> rows: array<vec4f>;
// h(k, t) = h0(k) e^{i w t} + conj(h0(-k)) e^{-i w t}; out: (slope x + i slope y) = i kx h - ky h, and the compression |k| h (negative below
// 1.7 cm: sharp troughs for capillary waves), as EVOLVE_FRAG
fn evolve(c: u32, ix: u32, ny: i32, slot: u32) {
  let nx = select(i32(ix), i32(ix) - i32(N), ix >= N / 2u);
  var o = vec4f(0.0);
  if (abs(nx) <= RR) {
    let k = vec2f(f32(nx), f32(ny)) * (TAU / p.tile[c >> 2u][c & 3u]);
    let kl = length(k);
    if (kl >= 1e-6) {
      let h0 = spec[(c * ROWS + u32(ny + RR)) * ROWS + u32(nx + RR)];
      let w = sqrt(9.81 * kl + 7.28e-5 * kl * kl * kl);
      let n = floor(w * 128.0 / TAU + 0.5);
      let ph = TAU * fract(n * p.phase);
      let e = vec2f(cos(ph), sin(ph));
      let h = cmul(h0.xy, e) + cmul(h0.zw, vec2f(e.x, -e.y));
      let z1 = k.x * mulI(h) - k.y * h;
      let sgn = select(-1.0, 1.0, TAU / kl > 0.017);
      o = vec4f(z1, sgn * kl * h);
    }
  }
  wa[slot] = o;
}
@compute @workgroup_size(${g/2})
fn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_index) t: u32) {
  let c = wg.y; let r = wg.x; let ny = i32(r) - RR;
  evolve(c, t, ny, bitrev(t)); evolve(c, t + N / 2u, ny, bitrev(t + N / 2u));
  workgroupBarrier();
  butterflies(t);
  let base = (c * ROWS + r) * N;
  rows[base + t] = wa[t]; rows[base + t + N / 2u] = wa[t + N / 2u];
}
`,x=c([[`wa`,`vec4f`]],g)+`
const RR: i32 = ${v};
const ROWS: u32 = ${y}u;
@group(0) @binding(0) var<storage, read> rows: array<vec4f>;
@group(0) @binding(1) var outA: texture_storage_2d_array<rgba16float, write>;
@group(0) @binding(2) var outM: texture_storage_2d_array<rgba16float, write>;
fn load(c: u32, x: u32, iy: u32, slot: u32) {
  let ny = select(i32(iy), i32(iy) - i32(N), iy >= N / 2u);
  wa[slot] = select(vec4f(0.0), rows[(c * ROWS + u32(clamp(ny + RR, 0, 2 * RR))) * N + x], abs(ny) <= RR);
}
@compute @workgroup_size(${g/2})
fn main(@builtin(workgroup_id) wg: vec3u, @builtin(local_invocation_index) t: u32) {
  let c = wg.y; let x = wg.x;
  load(c, x, t, bitrev(t)); load(c, x, t + N / 2u, bitrev(t + N / 2u));
  workgroupBarrier();
  butterflies(t);
  for (var j = 0u; j < 2u; j++) {
    let y = t + j * (N / 2u);
    let z = wa[y];
    textureStore(outA, vec2u(x, y), c, vec4f(z.xy, z.z, 0.0));
    textureStore(outM, vec2u(x, y), c, vec4f(z.x * z.x, z.y * z.y, z.x * z.y, 0.0));
  }
}
`,S=class{constructor(e){this.device=e;let t=e,r={rows:b,cols:x,mips:l(2)};this.modules=[],this.pipes={};for(let[e,n]of Object.entries(r)){let r=t.createShaderModule({code:n,label:`ripple ${e}`});this.modules.push(r),this.pipes[e]=t.createComputePipeline({layout:`auto`,compute:{module:r,entryPoint:`main`},label:`ripple ${e}`})}this.tiles=n.map(e=>e[2]),this.uni=t.createBuffer({size:48,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniF=new Float32Array(12),this.uniF.set(this.tiles,4),this.specData=new Float32Array(8*y*y*4),this.spec=t.createBuffer({size:this.specData.byteLength,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this.rows=t.createBuffer({size:8*y*g*16,usage:GPUBufferUsage.STORAGE}),this.out=[`A`,`M`].map(e=>t.createTexture({label:`ripples ${e}`,size:[g,g,8],format:`rgba16float`,mipLevelCount:_,usage:GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC}));let i=e=>e.createView({dimension:`2d-array`,baseMipLevel:0,mipLevelCount:1});this.bgRows=t.createBindGroup({layout:this.pipes.rows.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.uni}},{binding:1,resource:{buffer:this.spec}},{binding:2,resource:{buffer:this.rows}}]}),this.bgCols=t.createBindGroup({layout:this.pipes.cols.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:this.rows}},{binding:1,resource:i(this.out[0])},{binding:2,resource:i(this.out[1])}]}),this.bgMips=u(t,this.pipes.mips,this.out);let a=g*g*8*16;this.bytes=this.specData.byteLength+16*y*g*16+a+Math.round(1/3*a*5),this.shapeKey=null,this.setShape(null)}setShape(e){let t=e?.fp??null,n=e?.spread??1,i=`${t==null?`null`:t.toFixed(5)}:${n.toFixed(3)}`;if(i===this.shapeKey)return;this.shapeKey=i;let a=r(5,{fp:t,spread:n}),o=8*g,s=this.specData;for(let e=0;e<8;e++)for(let t=-v;t<=v;t++)for(let n=-v;n<=v;n++){let r=4*((t+g)%g*o+e*g+(n+g)%g),i=4*((e*y+t+v)*y+n+v);s[i]=a[r],s[i+1]=a[r+1],s[i+2]=a[r+2],s[i+3]=a[r+3]}this.device.queue.writeBuffer(this.spec,0,s)}encode(e,t){this.uniF[0]=t/128%1,this.device.queue.writeBuffer(this.uni,0,this.uniF),e.setPipeline(this.pipes.rows),e.setBindGroup(0,this.bgRows),e.dispatchWorkgroups(y,8),e.setPipeline(this.pipes.cols),e.setBindGroup(0,this.bgCols),e.dispatchWorkgroups(g,8),d(e,this.pipes.mips,this.bgMips,g,8)}};export{h as n,S as t};