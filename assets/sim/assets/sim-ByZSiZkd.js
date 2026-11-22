/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./wave-solve-worker-BgfKx1ci.js","./wave-solve-Dztcr917.js","./fetch-C3abVaTh.js","./three.core-Dp-eO7LC.js","./skinned-paddler-DdWK7uaw.js","./skimesh-DowYOOGe.js","./waves-C73EEXvP.js","./GLTFLoader-DYpI7M-x.js","./devmodels-DA9qydCA.js","./settings-editor-9mFpOptI.js","./settings-tXKkGKtb.js"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-P2Xu9kJm.js";import{$ as e,$a as t,$i as n,$n as r,$r as i,$t as a,A as o,Aa as s,Ai as c,An as l,Ao as u,Ar as d,At as f,B as p,Ba as m,Bi as h,Bn as g,Br as _,Bt as v,C as y,Ca as b,Ci as x,Cn as S,Co as C,Cr as w,Ct as T,D as E,Da as D,Di as O,Dn as k,Do as A,Dr as ee,Dt as j,E as M,Ea as N,Ei as P,En as F,Eo as I,Er as L,Et as te,F as ne,Fa as re,Fi as ie,Fn as ae,Fr as oe,Ft as se,G as ce,Ga as le,Gi as ue,Gn as de,Gr as fe,Gt as pe,H as me,Ha as he,Hi as ge,Hn as _e,Hr as ve,Ht as ye,I as be,Ia as xe,Ii as Se,In as Ce,Ir as we,It as Te,J as R,Ja as Ee,Ji as De,Jn as Oe,Jr as ke,Jt as z,K as Ae,Ka as B,Ki as je,Kn as Me,Kr as Ne,Kt as Pe,L as Fe,La as Ie,Li as Le,Ln as Re,Lr as ze,Lt as Be,M as Ve,Ma as He,Mi as Ue,Mn as We,Mr as Ge,Mt as Ke,N as qe,Na as Je,Ni as Ye,Nn as Xe,Nr as Ze,Nt as Qe,O as $e,Oa as et,Oi as tt,On as nt,Oo as rt,Or as it,Ot as at,P as ot,Pa as st,Pi as ct,Pn as V,Pr as lt,Pt as ut,Q as dt,Qa as ft,Qi as pt,Qn as mt,Qr as ht,Qt as H,R as gt,Ra as U,Ri as W,Rn as _t,Rr as vt,Rt as G,S as K,Sa as q,Si as yt,Sn as bt,So as xt,Sr as St,St as Ct,T as wt,Ta as Tt,Ti as Et,Tn as Dt,To as Ot,Tr as kt,Tt as At,U as jt,Ua as Mt,Ui as Nt,Un as Pt,Ur as Ft,Ut as It,V as Lt,Va as Rt,Vi as zt,Vn as Bt,Vr as Vt,Vt as Ht,W as Ut,Wa as Wt,Wi as Gt,Wn as Kt,Wr as qt,Wt as Jt,X as Yt,Xa as Xt,Xi as Zt,Xn as Qt,Xr as $t,Xt as en,Y as tn,Ya as nn,Yi as rn,Yn as an,Yr as on,Yt as sn,Z as cn,Za as ln,Zi as un,Zn as dn,Zr as fn,Zt as pn,_ as mn,_a as hn,_i as gn,_n,_o as vn,_r as yn,_t as bn,a as xn,aa as Sn,ai as Cn,an as wn,ao as Tn,ar as En,at as Dn,b as On,ba as kn,bi as An,bn as jn,bo as Mn,br as Nn,bt as Pn,c as Fn,ca as In,ci as Ln,cn as Rn,co as zn,cr as Bn,ct as Vn,d as Hn,da as Un,di as Wn,dn as Gn,do as Kn,dr as qn,dt as Jn,ea as Yn,ei as Xn,en as Zn,eo as Qn,er as $n,et as er,f as tr,fa as nr,fi as rr,fn as ir,fo as ar,fr as or,ft as sr,g as cr,ga as lr,gi as ur,gn as dr,go as fr,gr as pr,gt as mr,h as hr,ha as gr,hi as _r,hn as vr,ho as yr,hr as br,ht as xr,i as Sr,ia as Cr,ii as wr,in as Tr,io as Er,ir as Dr,it as Or,j as kr,ja as Ar,ji as jr,jn as Mr,jr as Nr,jt as Pr,k as Fr,ka as Ir,ki as Lr,kn as Rr,ko as zr,kr as Br,kt as Vr,l as Hr,la as Ur,li as Wr,ln as Gr,lo as Kr,lr as qr,lt as Jr,m as Yr,ma as Xr,mi as Zr,mn as Qr,mo as $r,mr as ei,mt as ti,n as ni,na as ri,ni as ii,nn as ai,no as oi,nr as si,nt as ci,o as li,oa as ui,oi as di,on as fi,oo as pi,or as mi,ot as hi,p as gi,pa as _i,pi as vi,pn as yi,po as bi,pr as xi,pt as Si,q as Ci,qa as wi,qi as Ti,qn as Ei,qr as Di,qt as Oi,r as ki,ra as Ai,ri as ji,rn as Mi,ro as J,rr as Ni,rt as Pi,s as Fi,sa as Ii,si as Li,sn as Ri,so as zi,sr as Bi,st as Vi,t as Hi,ta as Ui,ti as Wi,tn as Gi,to as Ki,tr as qi,tt as Ji,u as Yi,ua as Xi,ui as Zi,un as Qi,uo as $i,ur as ea,ut as ta,v as na,va as ra,vi as ia,vn as aa,vo as oa,vr as sa,vt as ca,w as la,wa as ua,wi as da,wn as fa,wo as pa,wr as ma,wt as ha,x as ga,xa as _a,xi as va,xn as ya,xo as ba,xr as xa,xt as Sa,y as Ca,ya as wa,yi as Ta,yn as Ea,yo as Da,yr as Oa,yt as ka,z as Aa,za as ja,zi as Ma,zn as Na,zr as Pa,zt as Fa}from"./three.core-Dp-eO7LC.js";import{$ as Ia,A as La,C as Ra,D as za,E as Ba,F as Va,G as Ha,H as Ua,K as Wa,M as Ga,N as Ka,O as qa,P as Ja,S as Ya,T as Xa,U as Za,V as Qa,W as $a,X as eo,Y as to,_ as Y,a as no,b as ro,c as io,d as ao,et as oo,g as so,h as co,j as lo,k as uo,l as fo,m as po,n as mo,r as ho,t as go,u as _o,v as vo,w as yo,x as bo,y as xo}from"./waves-C73EEXvP.js";import{_ as So,a as Co,d as wo,f as To,g as Eo,h as Do,i as Oo,r as ko,t as Ao}from"./seas-DPdvaLRo.js";import{a as jo,c as Mo,i as No,n as Po,o as Fo,r as Io,s as Lo}from"./scenario-info-Bll8ePcw.js";import{a as Ro,c as zo,i as Bo,n as Vo,o as Ho,r as Uo,t as Wo}from"./race-course-C5739pLy.js";import{$ as Go,A as Ko,B as qo,C as Jo,D as Yo,E as Xo,F as Zo,G as Qo,H as $o,I as es,J as ts,K as ns,L as rs,M as is,N as as,O as os,P as ss,Q as cs,R as ls,S as us,T as ds,U as fs,V as ps,W as ms,X as hs,Y as gs,Z as _s,a as vs,at as ys,c as bs,d as xs,et as Ss,f as Cs,it as ws,k as Ts,m as Es,nt as Ds,ot as Os,p as ks,q as As,r as js,rt as Ms,tt as Ns,u as Ps,x as Fs,z as Is}from"./skimesh-DowYOOGe.js";import{r as Ls,t as Rs}from"./GLTFLoader-DYpI7M-x.js";import{a as zs,l as Bs,r as Vs,s as Hs,t as Us}from"./wave-solve-Dztcr917.js";import{a as Ws,n as Gs,r as Ks,t as qs}from"./fetch-C3abVaTh.js";import{a as Js,n as Ys,r as Xs}from"./audio-Zpp1gFqK.js";import{a as Zs,c as Qs,n as $s}from"./settings-tXKkGKtb.js";var ec=Object.defineProperty,tc=((e,t)=>{let n={};for(var r in e)ec(n,r,{get:e[r],enumerable:!0});return t||ec(n,Symbol.toStringTag,{value:`Module`}),n})({ACESFilmicToneMapping:()=>4,AddEquation:()=>100,AddOperation:()=>2,AdditiveAnimationBlendMode:()=>Hi,AdditiveBlending:()=>2,AgXToneMapping:()=>6,AlphaFormat:()=>ni,AlwaysCompare:()=>519,AlwaysDepth:()=>1,AlwaysStencilFunc:()=>519,AmbientLight:()=>ki,AnimationAction:()=>Sr,AnimationClip:()=>xn,AnimationLoader:()=>li,AnimationMixer:()=>Fi,AnimationObjectGroup:()=>Fn,AnimationUtils:()=>Hr,ArcCurve:()=>Yi,ArrayCamera:()=>Hn,ArrowHelper:()=>tr,AttachedBindMode:()=>gi,Audio:()=>Yr,AudioAnalyser:()=>hr,AudioContext:()=>cr,AudioListener:()=>mn,AudioLoader:()=>na,AxesHelper:()=>Ca,BackSide:()=>1,BasicDepthPacking:()=>On,BasicShadowMap:()=>0,BatchedMesh:()=>ga,BezierInterpolant:()=>K,Bone:()=>y,BooleanKeyframeTrack:()=>la,Box2:()=>wt,Box3:()=>M,Box3Helper:()=>E,BoxGeometry:()=>$e,BoxHelper:()=>Fr,BufferAttribute:()=>o,BufferGeometry:()=>kr,BufferGeometryLoader:()=>Ve,ByteType:()=>qe,Cache:()=>ot,Camera:()=>ne,CameraHelper:()=>be,CanvasTexture:()=>Fe,CapsuleGeometry:()=>gt,CatmullRomCurve3:()=>Aa,CineonToneMapping:()=>3,CircleGeometry:()=>p,ClampToEdgeWrapping:()=>Lt,Clock:()=>me,Color:()=>jt,ColorKeyframeTrack:()=>Ut,ColorManagement:()=>ce,Compatibility:()=>Ae,CompressedArrayTexture:()=>Ci,CompressedCubeTexture:()=>R,CompressedTexture:()=>tn,CompressedTextureLoader:()=>Yt,ConeGeometry:()=>cn,ConstantAlphaFactor:()=>213,ConstantColorFactor:()=>211,Controls:()=>dt,CubeCamera:()=>e,CubeDepthTexture:()=>er,CubeReflectionMapping:()=>301,CubeRefractionMapping:()=>302,CubeTexture:()=>Ji,CubeTextureLoader:()=>ci,CubeUVReflectionMapping:()=>306,CubicBezierCurve:()=>Pi,CubicBezierCurve3:()=>Or,CubicInterpolant:()=>Dn,CullFaceBack:()=>1,CullFaceFront:()=>2,CullFaceFrontBack:()=>3,CullFaceNone:()=>0,Curve:()=>hi,CurvePath:()=>Vi,CustomBlending:()=>5,CustomToneMapping:()=>5,CylinderGeometry:()=>Vn,Cylindrical:()=>Jr,Data3DTexture:()=>ta,DataArrayTexture:()=>Jn,DataTexture:()=>sr,DataTextureLoader:()=>Si,DataUtils:()=>ti,DecrementStencilOp:()=>xr,DecrementWrapStencilOp:()=>mr,DefaultLoadingManager:()=>bn,DepthFormat:()=>ca,DepthStencilFormat:()=>ka,DepthTexture:()=>Pn,DetachedBindMode:()=>Sa,DirectionalLight:()=>Ct,DirectionalLightHelper:()=>T,DiscreteInterpolant:()=>ha,DodecahedronGeometry:()=>At,DoubleSide:()=>2,DstAlphaFactor:()=>206,DstColorFactor:()=>208,DynamicCopyUsage:()=>te,DynamicDrawUsage:()=>j,DynamicReadUsage:()=>at,EdgesGeometry:()=>Vr,EllipseCurve:()=>f,EqualCompare:()=>514,EqualDepth:()=>4,EqualStencilFunc:()=>514,EquirectangularReflectionMapping:()=>303,EquirectangularRefractionMapping:()=>304,Euler:()=>Pr,EventDispatcher:()=>Ke,ExternalTexture:()=>Qe,ExtrudeGeometry:()=>ut,FileLoader:()=>se,Float16BufferAttribute:()=>Te,Float32BufferAttribute:()=>Be,FloatType:()=>G,Fog:()=>Fa,FogExp2:()=>v,FramebufferTexture:()=>Ht,FrontSide:()=>0,Frustum:()=>ye,FrustumArray:()=>It,GLBufferAttribute:()=>Jt,GLSL1:()=>`100`,GLSL3:()=>pe,GreaterCompare:()=>516,GreaterDepth:()=>6,GreaterEqualCompare:()=>518,GreaterEqualDepth:()=>5,GreaterEqualStencilFunc:()=>518,GreaterStencilFunc:()=>516,GridHelper:()=>Pe,Group:()=>Oi,HTMLTexture:()=>z,HalfFloatType:()=>sn,HemisphereLight:()=>en,HemisphereLightHelper:()=>pn,IcosahedronGeometry:()=>H,ImageBitmapLoader:()=>a,ImageLoader:()=>Zn,ImageUtils:()=>Gi,IncrementStencilOp:()=>ai,IncrementWrapStencilOp:()=>Mi,InstancedBufferAttribute:()=>Tr,InstancedBufferGeometry:()=>wn,InstancedInterleavedBuffer:()=>fi,InstancedMesh:()=>Ri,Int16BufferAttribute:()=>Rn,Int32BufferAttribute:()=>Gr,Int8BufferAttribute:()=>Qi,IntType:()=>Gn,InterleavedBuffer:()=>ir,InterleavedBufferAttribute:()=>yi,Interpolant:()=>Qr,InterpolateBezier:()=>vr,InterpolateDiscrete:()=>dr,InterpolateLinear:()=>_n,InterpolateSmooth:()=>aa,InterpolationSamplingMode:()=>Ea,InterpolationSamplingType:()=>jn,InvertStencilOp:()=>ya,KeepStencilOp:()=>bt,KeyframeTrack:()=>S,LOD:()=>fa,LatheGeometry:()=>Dt,Layers:()=>F,LessCompare:()=>513,LessDepth:()=>2,LessEqualCompare:()=>515,LessEqualDepth:()=>3,LessEqualStencilFunc:()=>515,LessStencilFunc:()=>513,Light:()=>k,LightProbe:()=>nt,LightShadow:()=>Rr,Line:()=>l,Line3:()=>Mr,LineBasicMaterial:()=>We,LineCurve:()=>Xe,LineCurve3:()=>V,LineDashedMaterial:()=>ae,LineLoop:()=>Ce,LineSegments:()=>Re,LinearFilter:()=>_t,LinearInterpolant:()=>Na,LinearMipMapLinearFilter:()=>g,LinearMipMapNearestFilter:()=>Bt,LinearMipmapLinearFilter:()=>_e,LinearMipmapNearestFilter:()=>Pt,LinearSRGBColorSpace:()=>Kt,LinearToneMapping:()=>1,LinearTransfer:()=>de,Loader:()=>Me,LoaderUtils:()=>Ei,LoadingManager:()=>Oe,LoopOnce:()=>an,LoopPingPong:()=>Qt,LoopRepeat:()=>dn,MOUSE:()=>mt,Material:()=>r,MaterialBlending:()=>6,MaterialLoader:()=>$n,MathUtils:()=>qi,Matrix2:()=>si,Matrix3:()=>Ni,Matrix4:()=>Dr,MaxEquation:()=>104,Mesh:()=>En,MeshBasicMaterial:()=>mi,MeshDepthMaterial:()=>Bi,MeshDistanceMaterial:()=>Bn,MeshLambertMaterial:()=>qr,MeshMatcapMaterial:()=>ea,MeshNormalMaterial:()=>qn,MeshPhongMaterial:()=>or,MeshPhysicalMaterial:()=>xi,MeshStandardMaterial:()=>ei,MeshToonMaterial:()=>br,MinEquation:()=>103,MirroredRepeatWrapping:()=>pr,MixOperation:()=>1,MultiplyBlending:()=>4,MultiplyOperation:()=>0,NearestFilter:()=>yn,NearestMipMapLinearFilter:()=>sa,NearestMipMapNearestFilter:()=>Oa,NearestMipmapLinearFilter:()=>Nn,NearestMipmapNearestFilter:()=>xa,NeutralToneMapping:()=>7,NeverCompare:()=>512,NeverDepth:()=>0,NeverStencilFunc:()=>512,NoBlending:()=>0,NoColorSpace:()=>``,NoNormalPacking:()=>``,NoToneMapping:()=>0,NormalAnimationBlendMode:()=>St,NormalBlending:()=>1,NormalGAPacking:()=>`ga`,NormalRGPacking:()=>`rg`,NotEqualCompare:()=>517,NotEqualDepth:()=>7,NotEqualStencilFunc:()=>517,NumberKeyframeTrack:()=>w,Object3D:()=>ma,ObjectLoader:()=>kt,ObjectSpaceNormalMap:()=>1,OctahedronGeometry:()=>L,OneFactor:()=>201,OneMinusConstantAlphaFactor:()=>214,OneMinusConstantColorFactor:()=>212,OneMinusDstAlphaFactor:()=>207,OneMinusDstColorFactor:()=>209,OneMinusSrcAlphaFactor:()=>205,OneMinusSrcColorFactor:()=>203,OrthographicCamera:()=>ee,PCFShadowMap:()=>1,PCFSoftShadowMap:()=>2,PMREMGenerator:()=>Ec,Path:()=>it,PerspectiveCamera:()=>Br,Plane:()=>d,PlaneGeometry:()=>Nr,PlaneHelper:()=>Ge,PointLight:()=>Ze,PointLightHelper:()=>lt,Points:()=>oe,PointsMaterial:()=>we,PolarGridHelper:()=>ze,PolyhedronGeometry:()=>vt,PositionalAudio:()=>Pa,PropertyBinding:()=>_,PropertyMixer:()=>Vt,QuadraticBezierCurve:()=>ve,QuadraticBezierCurve3:()=>Ft,Quaternion:()=>qt,QuaternionKeyframeTrack:()=>fe,QuaternionLinearInterpolant:()=>Ne,R11_EAC_Format:()=>Di,RED_GREEN_RGTC2_Format:()=>on,RED_RGTC1_Format:()=>$t,REVISION:()=>`186`,RG11_EAC_Format:()=>fn,RGBADepthPacking:()=>ht,RGBAFormat:()=>i,RGBAIntegerFormat:()=>Xn,RGBA_ASTC_10x10_Format:()=>Wi,RGBA_ASTC_10x5_Format:()=>ii,RGBA_ASTC_10x6_Format:()=>ji,RGBA_ASTC_10x8_Format:()=>wr,RGBA_ASTC_12x10_Format:()=>Cn,RGBA_ASTC_12x12_Format:()=>di,RGBA_ASTC_4x4_Format:()=>Li,RGBA_ASTC_5x4_Format:()=>Ln,RGBA_ASTC_5x5_Format:()=>Wr,RGBA_ASTC_6x5_Format:()=>Zi,RGBA_ASTC_6x6_Format:()=>Wn,RGBA_ASTC_8x5_Format:()=>rr,RGBA_ASTC_8x6_Format:()=>vi,RGBA_ASTC_8x8_Format:()=>Zr,RGBA_BPTC_Format:()=>_r,RGBA_ETC2_EAC_Format:()=>ur,RGBA_PVRTC_2BPPV1_Format:()=>gn,RGBA_PVRTC_4BPPV1_Format:()=>ia,RGBA_S3TC_DXT1_Format:()=>Ta,RGBA_S3TC_DXT3_Format:()=>An,RGBA_S3TC_DXT5_Format:()=>va,RGBDepthPacking:()=>yt,RGBFormat:()=>x,RGBIntegerFormat:()=>da,RGB_BPTC_SIGNED_Format:()=>Et,RGB_BPTC_UNSIGNED_Format:()=>P,RGB_ETC1_Format:()=>O,RGB_ETC2_Format:()=>tt,RGB_PVRTC_2BPPV1_Format:()=>Lr,RGB_PVRTC_4BPPV1_Format:()=>c,RGB_S3TC_DXT1_Format:()=>jr,RGDepthPacking:()=>Ue,RGFormat:()=>Ye,RGIntegerFormat:()=>ct,RawShaderMaterial:()=>ie,Ray:()=>Se,Raycaster:()=>Le,RectAreaLight:()=>W,RedFormat:()=>Ma,RedIntegerFormat:()=>h,ReinhardToneMapping:()=>2,RenderObjectRefreshType:()=>zt,RenderTarget:()=>ge,RenderTarget3D:()=>Nt,RepeatWrapping:()=>Gt,ReplaceStencilOp:()=>ue,ReverseSubtractEquation:()=>102,RingGeometry:()=>Ti,SIGNED_R11_EAC_Format:()=>De,SIGNED_RED_GREEN_RGTC2_Format:()=>rn,SIGNED_RED_RGTC1_Format:()=>Zt,SIGNED_RG11_EAC_Format:()=>un,SRGBColorSpace:()=>pt,SRGBTransfer:()=>n,Scene:()=>Yn,ShaderChunk:()=>ic,ShaderLib:()=>ac,ShaderMaterial:()=>Ui,ShadowMaterial:()=>ri,Shape:()=>Ai,ShapeGeometry:()=>Cr,ShapePath:()=>Sn,ShapeUtils:()=>ui,ShortType:()=>Ii,Skeleton:()=>In,SkeletonHelper:()=>Ur,SkinnedMesh:()=>Xi,Source:()=>Un,Sphere:()=>nr,SphereGeometry:()=>_i,Spherical:()=>Xr,SphericalHarmonics3:()=>gr,SplineCurve:()=>lr,SpotLight:()=>hn,SpotLightHelper:()=>ra,Sprite:()=>wa,SpriteMaterial:()=>kn,SrcAlphaFactor:()=>204,SrcAlphaSaturateFactor:()=>210,SrcColorFactor:()=>202,StaticCopyUsage:()=>_a,StaticDrawUsage:()=>q,StaticReadUsage:()=>b,StereoCamera:()=>ua,StreamCopyUsage:()=>Tt,StreamDrawUsage:()=>N,StreamReadUsage:()=>D,StringKeyframeTrack:()=>et,SubtractEquation:()=>101,SubtractiveBlending:()=>3,TOUCH:()=>Ir,TangentSpaceNormalMap:()=>0,TetrahedronGeometry:()=>s,Texture:()=>Ar,TextureLoader:()=>He,TextureSource:()=>Je,TextureUtils:()=>st,Timer:()=>re,TimestampQuery:()=>xe,TorusGeometry:()=>Ie,TorusKnotGeometry:()=>U,Triangle:()=>ja,TriangleFanDrawMode:()=>2,TriangleStripDrawMode:()=>1,TrianglesDrawMode:()=>0,TubeGeometry:()=>m,UVMapping:()=>300,Uint16BufferAttribute:()=>Rt,Uint32BufferAttribute:()=>he,Uint8BufferAttribute:()=>Mt,Uint8ClampedBufferAttribute:()=>Wt,Uniform:()=>le,UniformsGroup:()=>B,UniformsLib:()=>X,UniformsUtils:()=>wi,UnsignedByteType:()=>Ee,UnsignedInt101111Type:()=>nn,UnsignedInt248Type:()=>Xt,UnsignedInt5999Type:()=>ln,UnsignedIntType:()=>ft,UnsignedShort4444Type:()=>t,UnsignedShort5551Type:()=>Qn,UnsignedShortType:()=>Ki,VSMShadowMap:()=>3,Vector2:()=>oi,Vector3:()=>J,Vector4:()=>Er,VectorKeyframeTrack:()=>Tn,VideoFrameTexture:()=>pi,VideoTexture:()=>zi,WebGL3DRenderTarget:()=>zn,WebGLArrayRenderTarget:()=>Kr,WebGLCoordinateSystem:()=>$i,WebGLCubeRenderTarget:()=>Fc,WebGLRenderTarget:()=>Kn,WebGLRenderer:()=>yd,WebGLUtils:()=>sd,WebGPUCoordinateSystem:()=>ar,WebXRController:()=>bi,WireframeGeometry:()=>$r,WrapAroundEnding:()=>yr,ZeroCurvatureEnding:()=>fr,ZeroFactor:()=>200,ZeroSlopeEnding:()=>vn,ZeroStencilOp:()=>0,createCanvasElement:()=>Da,error:()=>ba,getConsoleFunction:()=>C,log:()=>Ot,setConsoleFunction:()=>rt,warn:()=>zr,warnOnce:()=>u});function nc(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function rc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var ic={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
uniform sampler2D aoMap;
uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
#if ! defined( GL_ANGLE_multi_draw )
#define gl_DrawID _gl_DrawID
uniform int _gl_DrawID;
#endif
uniform highp sampler2D batchingTexture;
uniform highp usampler2D batchingIdTexture;
mat4 getBatchingMatrix( const in float i ) {
int size = textureSize( batchingTexture, 0 ).x;
int j = int( i ) * 4;
int x = j % size;
int y = j / size;
vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
return mat4( v1, v2, v3, v4 );
}
float getIndirectIndex( const in int i ) {
int size = textureSize( batchingIdTexture, 0 ).x;
int x = i % size;
int y = i / size;
return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
}
#endif
#ifdef USE_BATCHING_COLOR
uniform sampler2D batchingColorTexture;
vec4 getBatchingColor( const in float i ) {
int size = textureSize( batchingColorTexture, 0 ).x;
int j = int( i );
int x = j % size;
int y = j / size;
return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
uniform sampler2D bumpMap;
uniform float bumpScale;
vec2 dHdxy_fwd() {
vec2 dSTdx = dFdx( vBumpMapUv );
vec2 dSTdy = dFdy( vBumpMapUv );
float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
return vec2( dBx, dBy );
}
vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
vec3 vN = surf_norm;
vec3 R1 = cross( vSigmaY, vN );
vec3 R2 = cross( vN, vSigmaX );
float fDet = dot( vSigmaX, R1 ) * faceDirection;
vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
return normalize( abs( fDet ) * surf_norm - vGrad );
}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
varying vec3 vClipPosition;
uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
const highp float a = 12.9898, b = 78.233, c = 43758.5453;
highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
float precisionSafeLength( vec3 v ) { return length( v ); }
#else
float precisionSafeLength( vec3 v ) {
float maxComponent = max3( abs( v ) );
return length( v / maxComponent ) * maxComponent;
}
#endif
struct IncidentLight {
vec3 color;
vec3 direction;
bool visible;
};
struct ReflectedLight {
vec3 directDiffuse;
vec3 directSpecular;
vec3 indirectDiffuse;
vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} `,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
uniform sampler2D displacementMap;
uniform float displacementScale;
uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
uniform float envMapIntensity;
uniform mat3 envMapRotation;
#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#else
uniform sampler2D envMap;
#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
uniform float reflectivity;
#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;
uniform float refractionRatio;
#else
varying vec3 vReflect;
#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
#define ENV_WORLDPOS
#endif
#ifdef ENV_WORLDPOS
varying vec3 vWorldPosition;
#else
varying vec3 vReflect;
uniform float refractionRatio;
#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
#ifdef FOG_EXP2
float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
#else
float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
#endif
gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
uniform vec3 fogColor;
varying float vFogDepth;
#ifdef FOG_EXP2
uniform float fogDensity;
#else
uniform float fogNear;
uniform float fogFar;
#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
float dotNL = dot( normal, lightDirection );
vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
#ifdef USE_GRADIENTMAP
return vec3( texture2D( gradientMap, coord ).r );
#else
vec2 fw = fwidth( coord ) * 0.5;
return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
uniform sampler2D lightMap;
uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
vec3 diffuseColor;
float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
vec3 irradiance = dotNL * directLight.color;
reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
float x = normal.x, y = normal.y, z = normal.z;
vec3 result = shCoefficients[ 0 ] * 0.886227;
result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
vec3 irradiance = ambientLightColor;
return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
if ( cutoffDistance > 0.0 ) {
distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
}
return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
struct SunLight {
vec3 direction;
vec3 color;
};
uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
light.color = sunLight.color;
light.direction = sunLight.direction;
light.visible = true;
}
#endif
#if NUM_DIR_LIGHTS > 0
struct DirectionalLight {
vec3 direction;
vec3 color;
};
uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
light.color = directionalLight.color;
light.direction = directionalLight.direction;
light.visible = true;
}
#endif
#if NUM_POINT_LIGHTS > 0
struct PointLight {
vec3 position;
vec3 color;
float distance;
float decay;
};
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
vec3 lVector = pointLight.position - geometryPosition;
light.direction = normalize( lVector );
float lightDistance = length( lVector );
light.color = pointLight.color;
light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
light.visible = ( light.color != vec3( 0.0 ) );
}
#endif
#if NUM_SPOT_LIGHTS > 0
struct SpotLight {
vec3 position;
vec3 direction;
vec3 color;
float distance;
float decay;
float coneCos;
float penumbraCos;
};
uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
vec3 lVector = spotLight.position - geometryPosition;
light.direction = normalize( lVector );
float angleCos = dot( light.direction, spotLight.direction );
float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
if ( spotAttenuation > 0.0 ) {
float lightDistance = length( lVector );
light.color = spotLight.color * spotAttenuation;
light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
light.visible = ( light.color != vec3( 0.0 ) );
} else {
light.color = vec3( 0.0 );
light.visible = false;
}
}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
struct RectAreaLight {
vec3 color;
vec3 position;
vec3 halfWidth;
vec3 halfHeight;
};
uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
struct HemisphereLight {
vec3 direction;
vec3 skyColor;
vec3 groundColor;
};
uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
float dotNL = dot( normal, hemiLight.direction );
float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
return irradiance;
}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
vec3 diffuseColor;
vec3 specularColor;
float specularShininess;
float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
vec3 irradiance = dotNL * directLight.color;
reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
vec3 diffuseColor;
vec3 diffuseContribution;
vec3 specularColor;
vec3 specularColorBlended;
float roughness;
float metalness;
float specularF90;
float dispersion;
vec2 dfg;
vec3 multiScatteringCompensation;
#ifdef USE_RETROREFLECTION
float retroreflectivity;
#endif
#ifdef USE_CLEARCOAT
float clearcoat;
float clearcoatRoughness;
vec3 clearcoatF0;
float clearcoatF90;
#endif
#ifdef USE_IRIDESCENCE
float iridescence;
float iridescenceIOR;
float iridescenceThickness;
vec3 iridescenceFresnel;
vec3 iridescenceF0Dielectric;
vec3 iridescenceF0Metallic;
#endif
#ifdef USE_SHEEN
vec3 sheenColor;
float sheenRoughness;
#endif
#ifdef IOR
float ior;
#endif
#ifdef USE_TRANSMISSION
float transmission;
float transmissionAlpha;
float thickness;
float attenuationDistance;
vec3 attenuationColor;
#endif
#ifdef USE_ANISOTROPY
float anisotropy;
float alphaT;
vec3 anisotropyT;
vec3 anisotropyB;
#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
float x2 = x * x;
float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
float a2 = pow2( alpha );
float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
float a2 = pow2( alpha );
float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
float a2 = alphaT * alphaB;
highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
highp float v2 = dot( v, v );
float w2 = a2 / v2;
return RECIPROCAL_PI * a2 * pow2 ( w2 );
}
#endif
#ifdef USE_CLEARCOAT
vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
vec3 f0 = material.clearcoatF0;
float f90 = material.clearcoatF90;
float roughness = material.clearcoatRoughness;
float alpha = pow2( roughness );
vec3 halfDir = normalize( lightDir + viewDir );
float dotNL = saturate( dot( normal, lightDir ) );
float dotNV = saturate( dot( normal, viewDir ) );
float dotNH = saturate( dot( normal, halfDir ) );
float dotVH = saturate( dot( viewDir, halfDir ) );
vec3 F = F_Schlick( f0, f90, dotVH );
float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
float D = D_GGX( alpha, dotNH );
return F * ( V * D );
}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
vec3 f0 = material.specularColorBlended;
float f90 = material.specularF90;
float roughness = material.roughness;
float alpha = pow2( roughness );
vec3 halfDir = normalize( lightDir + viewDir );
float dotNL = saturate( dot( normal, lightDir ) );
float dotNV = saturate( dot( normal, viewDir ) );
float dotNH = saturate( dot( normal, halfDir ) );
float dotVH = saturate( dot( viewDir, halfDir ) );
vec3 F = F_Schlick( f0, f90, dotVH );
#ifdef USE_IRIDESCENCE
F = mix( F, material.iridescenceFresnel, material.iridescence );
#endif
#ifdef USE_ANISOTROPY
float dotTL = dot( material.anisotropyT, lightDir );
float dotTV = dot( material.anisotropyT, viewDir );
float dotTH = dot( material.anisotropyT, halfDir );
float dotBL = dot( material.anisotropyB, lightDir );
float dotBV = dot( material.anisotropyB, viewDir );
float dotBH = dot( material.anisotropyB, halfDir );
float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
#else
float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
float D = D_GGX( alpha, dotNH );
#endif
return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
const float LUT_SIZE = 64.0;
const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
const float LUT_BIAS = 0.5 / LUT_SIZE;
float dotNV = saturate( dot( N, V ) );
vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
uv = uv * LUT_SCALE + LUT_BIAS;
return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
float l = length( f );
return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
float x = dot( v1, v2 );
float y = abs( x );
float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
float b = 3.4175940 + ( 4.1616724 + y ) * y;
float v = a / b;
float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
vec3 lightNormal = cross( v1, v2 );
if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
vec3 T1, T2;
T1 = normalize( V - N * dot( V, N ) );
T2 = - cross( N, T1 );
mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
vec3 coords[ 4 ];
coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
coords[ 0 ] = normalize( coords[ 0 ] );
coords[ 1 ] = normalize( coords[ 1 ] );
coords[ 2 ] = normalize( coords[ 2 ] );
coords[ 3 ] = normalize( coords[ 3 ] );
vec3 vectorFormFactor = vec3( 0.0 );
vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
float alpha = pow2( roughness );
float invAlpha = 1.0 / alpha;
float cos2h = dotNH * dotNH;
float sin2h = max( 1.0 - cos2h, 0.0078125 );
return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
vec3 halfDir = normalize( lightDir + viewDir );
float dotNL = saturate( dot( normal, lightDir ) );
float dotNV = saturate( dot( normal, viewDir ) );
float dotNH = saturate( dot( normal, halfDir ) );
float D = D_Charlie( sheenRoughness, dotNH );
float V = V_Neubelt( dotNV, dotNL );
return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
float dotNV = saturate( dot( normal, viewDir ) );
float r2 = roughness * roughness;
float rInv = 1.0 / ( roughness + 0.1 );
float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
float DG = exp( a * dotNV + b );
return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
float dotNV = saturate( dot( normal, viewDir ) );
vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
#ifdef USE_IRIDESCENCE
vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
#else
vec3 Fr = specularColor;
#endif
vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
float Ess = fab.x + fab.y;
float Ems = 1.0 - Ess;
vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
singleScatter += FssEss;
multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
vec3 normal = geometryNormal;
vec3 viewDir = geometryViewDir;
vec3 position = geometryPosition;
vec3 lightPos = rectAreaLight.position;
vec3 halfWidth = rectAreaLight.halfWidth;
vec3 halfHeight = rectAreaLight.halfHeight;
vec3 lightColor = rectAreaLight.color;
float roughness = material.roughness;
vec3 rectCoords[ 4 ];
rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
vec2 uv = LTC_Uv( normal, viewDir, roughness );
vec4 t1 = texture2D( ltc_1, uv );
vec4 t2 = texture2D( ltc_2, uv );
mat3 mInv = mat3(
vec3( t1.x, 0, t1.y ),
vec3(    0, 1,    0 ),
vec3( t1.z, 0, t1.w )
);
vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
#ifdef USE_CLEARCOAT
vec3 Ncc = geometryClearcoatNormal;
vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
mat3 mInvClearcoat = mat3(
vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
vec3(             0, 1,             0 ),
vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
);
vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
#endif
}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
vec3 irradiance = dotNL * directLight.color;
#ifdef USE_CLEARCOAT
float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
vec3 ccIrradiance = dotNLcc * directLight.color;
clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
#endif
#ifdef USE_SHEEN
sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
irradiance *= sheenEnergyComp;
#endif
vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
#ifdef USE_RETROREFLECTION
vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
#endif
reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
vec3 halfDir = normalize( directLight.direction + geometryViewDir );
float dotVH = saturate( dot( geometryViewDir, halfDir ) );
vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
#ifdef USE_RETROREFLECTION
vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
F = mix( F, retroF, saturate( material.retroreflectivity ) );
#endif
reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
vec3 singleScattering = vec3( 0.0 );
vec3 multiScattering = vec3( 0.0 );
#ifdef USE_IRIDESCENCE
computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
#else
computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
#endif
vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
#ifdef USE_SHEEN
float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
diffuse *= sheenEnergyComp;
#endif
reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
#ifdef USE_CLEARCOAT
clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
#endif
#ifdef USE_SHEEN
sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
#endif
vec3 singleScatteringDielectric = vec3( 0.0 );
vec3 multiScatteringDielectric = vec3( 0.0 );
vec3 singleScatteringMetallic = vec3( 0.0 );
vec3 multiScatteringMetallic = vec3( 0.0 );
#ifdef USE_IRIDESCENCE
computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
#else
computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
#endif
vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
vec3 indirectSpecular = radiance * singleScattering;
indirectSpecular += multiScattering * cosineWeightedIrradiance;
vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
#ifdef USE_SHEEN
float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
indirectSpecular *= sheenEnergyComp;
indirectDiffuse *= sheenEnergyComp;
#endif
reflectedLight.indirectSpecular += indirectSpecular;
reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
vec3 res = probesResolution;
vec3 gridRange = probesMax - probesMin;
vec3 resMinusOne = res - 1.0;
vec3 probeSpacing = gridRange / resMinusOne;
vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
uvw = uvw * resMinusOne / res + 0.5 / res;
float nz          = res.z;
float paddedSlices = nz + 2.0;
float atlasDepth  = 7.0 * paddedSlices;
float uvZBase     = uvw.z * nz + 1.0;
vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
vec3 c0 = s0.xyz;
vec3 c1 = vec3( s0.w, s1.xy );
vec3 c2 = vec3( s1.zw, s2.x );
vec3 c3 = s2.yzw;
vec3 c4 = s3.xyz;
vec3 c5 = vec3( s3.w, s4.xy );
vec3 c6 = vec3( s4.zw, s5.x );
vec3 c7 = s5.yzw;
vec3 c8 = s6.xyz;
float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
vec3 result = c0 * 0.886227;
result += c1 * 2.0 * 0.511664 * y;
result += c2 * 2.0 * 0.511664 * z;
result += c3 * 2.0 * 0.511664 * x;
result += c4 * 2.0 * 0.429043 * x * y;
result += c5 * 2.0 * 0.429043 * y * z;
result += c6 * ( 0.743125 * z * z - 0.247708 );
result += c7 * 2.0 * 0.429043 * x * z;
result += c8 * 0.429043 * ( x * x - y * y );
return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
uniform float logDepthBufFC;
varying float vFragDepth;
varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
varying float vFragDepth;
varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
varying vec2 vUv;
#else
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
uniform mat3 uvTransform;
#endif
#endif
#ifdef USE_MAP
uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
#ifndef USE_INSTANCING_MORPH
uniform float morphTargetBaseInfluence;
uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
#endif
uniform sampler2DArray morphTargetsTexture;
uniform ivec2 morphTargetsTextureSize;
vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
int y = texelIndex / morphTargetsTextureSize.x;
int x = texelIndex - y * morphTargetsTextureSize.x;
ivec3 morphUV = ivec3( x, y, morphTargetIndex );
return texelFetch( morphTargetsTexture, morphUV, 0 );
}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
varying vec3 vNormal;
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
uniform sampler2D normalMap;
uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
vec3 q0 = dFdx( eye_pos.xyz );
vec3 q1 = dFdy( eye_pos.xyz );
vec2 st0 = dFdx( uv.st );
vec2 st1 = dFdy( uv.st );
vec3 N = surf_norm;
vec3 q1perp = cross( q1, N );
vec3 q0perp = cross( N, q0 );
vec3 T = q1perp * st0.x + q0perp * st1.x;
vec3 B = q1perp * st0.y + q0perp * st1.y;
float det = max( dot( T, T ), dot( B, B ) );
float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
return mat3( T * scale, B * scale, N );
}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform sampler2D clearcoatNormalMap;
uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
vec3 dithering( vec3 color ) {
float grid_position = rand( gl_FragCoord.xy );
vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
return color + dither_shift_RGB;
}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
#if NUM_SUN_LIGHT_SHADOWS > 0
#define SUN_LIGHT_CASCADES 2
#if defined( SHADOWMAP_TYPE_PCF )
uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
#else
uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
#endif
uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
varying vec4 vSunShadowWorldPosition;
varying vec3 vSunShadowWorldNormal;
struct SunLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
};
uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
#endif
#if NUM_DIR_LIGHT_SHADOWS > 0
#if defined( SHADOWMAP_TYPE_PCF )
uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
#else
uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
#endif
varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
struct DirectionalLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
};
uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
#endif
#if NUM_SPOT_LIGHT_SHADOWS > 0
#if defined( SHADOWMAP_TYPE_PCF )
uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
#else
uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
#endif
struct SpotLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
};
uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
#endif
#if NUM_POINT_LIGHT_SHADOWS > 0
#if defined( SHADOWMAP_TYPE_PCF )
uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
#elif defined( SHADOWMAP_TYPE_BASIC )
uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
#endif
varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
struct PointLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
float shadowCameraNear;
float shadowCameraFar;
};
uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
#endif
#if defined( SHADOWMAP_TYPE_PCF )
float interleavedGradientNoise( vec2 position ) {
return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
}
vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
const float goldenAngle = 2.399963229728653;
float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
float theta = float( sampleIndex ) * goldenAngle + phi;
return vec2( cos( theta ), sin( theta ) ) * r;
}
#endif
#if defined( SHADOWMAP_TYPE_PCF )
float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
float shadow = 1.0;
shadowCoord.xyz /= shadowCoord.w;
shadowCoord.z += shadowBias;
bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
if ( frustumTest ) {
vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
float radius = shadowRadius * texelSize.x;
float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
shadow = (
texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
) * 0.2;
}
return mix( 1.0, shadow, shadowIntensity );
}
#elif defined( SHADOWMAP_TYPE_VSM )
float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
float shadow = 1.0;
shadowCoord.xyz /= shadowCoord.w;
#ifdef USE_REVERSED_DEPTH_BUFFER
shadowCoord.z -= shadowBias;
#else
shadowCoord.z += shadowBias;
#endif
bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
if ( frustumTest ) {
vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
float mean = distribution.x;
float variance = distribution.y * distribution.y;
#ifdef USE_REVERSED_DEPTH_BUFFER
float hard_shadow = step( mean, shadowCoord.z );
#else
float hard_shadow = step( shadowCoord.z, mean );
#endif
if ( hard_shadow == 1.0 ) {
shadow = 1.0;
} else {
variance = max( variance, 0.0000001 );
float d = shadowCoord.z - mean;
float p_max = variance / ( variance + d * d );
p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
shadow = max( hard_shadow, p_max );
}
}
return mix( 1.0, shadow, shadowIntensity );
}
#else
float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
float shadow = 1.0;
shadowCoord.xyz /= shadowCoord.w;
#ifdef USE_REVERSED_DEPTH_BUFFER
shadowCoord.z -= shadowBias;
#else
shadowCoord.z += shadowBias;
#endif
bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
if ( frustumTest ) {
float depth = texture2D( shadowMap, shadowCoord.xy ).r;
#ifdef USE_REVERSED_DEPTH_BUFFER
shadow = step( depth, shadowCoord.z );
#else
shadow = step( shadowCoord.z, depth );
#endif
}
return mix( 1.0, shadow, shadowIntensity );
}
#endif
#if NUM_SUN_LIGHT_SHADOWS > 0
float getSunShadow(
#if defined( SHADOWMAP_TYPE_PCF )
sampler2DShadow shadowMap,
#else
sampler2D shadowMap,
#endif
SunLightShadow sunLightShadow,
int shadowIndex
) {
vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
float viewDepth = vSunShadowWorldPosition.w;
int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
float shadow = 1.0;
for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
float cascadeShadow = getShadow(
shadowMap,
sunLightShadow.shadowMapSize,
sunLightShadow.shadowIntensity,
sunLightShadow.shadowBias,
sunLightShadow.shadowRadius,
sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
);
shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
}
}
return shadow;
}
#endif
#if NUM_POINT_LIGHT_SHADOWS > 0
#if defined( SHADOWMAP_TYPE_PCF )
float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
float shadow = 1.0;
vec3 lightToPosition = shadowCoord.xyz;
vec3 bd3D = normalize( lightToPosition );
vec3 absVec = abs( lightToPosition );
float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
#ifdef USE_REVERSED_DEPTH_BUFFER
float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
dp -= shadowBias;
#else
float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
dp += shadowBias;
#endif
float texelSize = shadowRadius / shadowMapSize.x;
vec3 absDir = abs( bd3D );
vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
tangent = normalize( cross( bd3D, tangent ) );
vec3 bitangent = cross( bd3D, tangent );
float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
vec2 sample0 = vogelDiskSample( 0, 5, phi );
vec2 sample1 = vogelDiskSample( 1, 5, phi );
vec2 sample2 = vogelDiskSample( 2, 5, phi );
vec2 sample3 = vogelDiskSample( 3, 5, phi );
vec2 sample4 = vogelDiskSample( 4, 5, phi );
shadow = (
texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
) * 0.2;
}
return mix( 1.0, shadow, shadowIntensity );
}
#elif defined( SHADOWMAP_TYPE_BASIC )
float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
float shadow = 1.0;
vec3 lightToPosition = shadowCoord.xyz;
vec3 absVec = abs( lightToPosition );
float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
dp += shadowBias;
vec3 bd3D = normalize( lightToPosition );
float depth = textureCube( shadowMap, bd3D ).r;
#ifdef USE_REVERSED_DEPTH_BUFFER
depth = 1.0 - depth;
#endif
shadow = step( dp, depth );
}
return mix( 1.0, shadow, shadowIntensity );
}
#endif
#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
#if NUM_SUN_LIGHT_SHADOWS > 0
varying vec4 vSunShadowWorldPosition;
varying vec3 vSunShadowWorldNormal;
#endif
#if NUM_DIR_LIGHT_SHADOWS > 0
uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
struct DirectionalLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
};
uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
#endif
#if NUM_SPOT_LIGHT_SHADOWS > 0
struct SpotLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
};
uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
#endif
#if NUM_POINT_LIGHT_SHADOWS > 0
uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
struct PointLightShadow {
float shadowIntensity;
float shadowBias;
float shadowNormalBias;
float shadowRadius;
vec2 shadowMapSize;
float shadowCameraNear;
float shadowCameraFar;
};
uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
uniform mat4 bindMatrix;
uniform mat4 bindMatrixInverse;
uniform highp sampler2D boneTexture;
mat4 getBoneMatrix( const in float i ) {
int size = textureSize( boneTexture, 0 ).x;
int j = int( i ) * 4;
int x = j % size;
int y = j / size;
vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
return mat4( v1, v2, v3, v4 );
}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
color *= toneMappingExposure;
return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
color *= toneMappingExposure;
color = max( vec3( 0.0 ), color - 0.004 );
return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
const mat3 ACESInputMat = mat3(
vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
vec3( 0.04823, 0.01566, 0.83777 )
);
const mat3 ACESOutputMat = mat3(
vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
vec3( -0.07367, -0.00605,  1.07602 )
);
color *= toneMappingExposure / 0.6;
color = ACESInputMat * color;
color = RRTAndODTFit( color );
color = ACESOutputMat * color;
return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
vec3( 1.6605, - 0.1246, - 0.0182 ),
vec3( - 0.5876, 1.1329, - 0.1006 ),
vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
vec3( 0.6274, 0.0691, 0.0164 ),
vec3( 0.3293, 0.9195, 0.0880 ),
vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
vec3 x2 = x * x;
vec3 x4 = x2 * x2;
return + 15.5 * x4 * x2
- 40.14 * x4 * x
+ 31.96 * x4
- 6.868 * x2 * x
+ 0.4298 * x2
+ 0.1191 * x
- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
const mat3 AgXInsetMatrix = mat3(
vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
);
const mat3 AgXOutsetMatrix = mat3(
vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
);
const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
color *= toneMappingExposure;
color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
color = AgXInsetMatrix * color;
color = max( color, 1e-10 );	color = log2( color );
color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
color = clamp( color, 0.0, 1.0 );
color = agxDefaultContrastApprox( color );
color = AgXOutsetMatrix * color;
color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
color = clamp( color, 0.0, 1.0 );
return color;
}
vec3 NeutralToneMapping( vec3 color ) {
const float StartCompression = 0.8 - 0.04;
const float Desaturation = 0.15;
color *= toneMappingExposure;
float x = min( color.r, min( color.g, color.b ) );
float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
color -= offset;
float peak = max( color.r, max( color.g, color.b ) );
if ( peak < StartCompression ) return color;
float d = 1. - StartCompression;
float newPeak = 1. - d * d / ( peak + d - StartCompression );
color *= newPeak / peak;
float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
uniform float transmission;
uniform float thickness;
uniform float attenuationDistance;
uniform vec3 attenuationColor;
#ifdef USE_TRANSMISSIONMAP
uniform sampler2D transmissionMap;
#endif
#ifdef USE_THICKNESSMAP
uniform sampler2D thicknessMap;
#endif
uniform vec2 transmissionSamplerSize;
uniform sampler2D transmissionSamplerMap;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrix;
varying vec3 vWorldPosition;
float w0( float a ) {
return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
}
float w1( float a ) {
return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
}
float w2( float a ){
return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
}
float w3( float a ) {
return ( 1.0 / 6.0 ) * ( a * a * a );
}
float g0( float a ) {
return w0( a ) + w1( a );
}
float g1( float a ) {
return w2( a ) + w3( a );
}
float h0( float a ) {
return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
}
float h1( float a ) {
return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
}
vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
uv = uv * texelSize.zw + 0.5;
vec2 iuv = floor( uv );
vec2 fuv = fract( uv );
float g0x = g0( fuv.x );
float g1x = g1( fuv.x );
float h0x = h0( fuv.x );
float h1x = h1( fuv.x );
float h0y = h0( fuv.y );
float h1y = h1( fuv.y );
vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
}
vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
vec2 fLodSizeInv = 1.0 / fLodSize;
vec2 cLodSizeInv = 1.0 / cLodSize;
vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
return mix( fSample, cSample, fract( lod ) );
}
vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
vec3 modelScale;
modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
return normalize( refractionVector ) * thickness * modelScale;
}
float applyIorToRoughness( const in float roughness, const in float ior ) {
return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
}
vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
}
vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
if ( isinf( attenuationDistance ) ) {
return vec3( 1.0 );
} else {
vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
}
}
vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
const in vec3 attenuationColor, const in float attenuationDistance ) {
vec4 transmittedLight;
vec3 transmittance;
#ifdef USE_DISPERSION
float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
for ( int i = 0; i < 3; i ++ ) {
vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
vec3 refractedRayExit = position + transmissionRay;
vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
vec2 refractionCoords = ndcPos.xy / ndcPos.w;
refractionCoords += 1.0;
refractionCoords /= 2.0;
vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
transmittedLight[ i ] = transmissionSample[ i ];
transmittedLight.a += transmissionSample.a;
transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
}
transmittedLight.a /= 3.0;
#else
vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
vec3 refractedRayExit = position + transmissionRay;
vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
vec2 refractionCoords = ndcPos.xy / ndcPos.w;
refractionCoords += 1.0;
refractionCoords /= 2.0;
transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
#endif
vec3 attenuatedColor = transmittance * transmittedLight.rgb;
vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
varying vec2 vUv;
#endif
#ifdef USE_MAP
varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
uniform mat3 transmissionMapTransform;
varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
uniform mat3 thicknessMapTransform;
varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
varying vec2 vUv;
#endif
#ifdef USE_MAP
uniform mat3 mapTransform;
varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
uniform mat3 alphaMapTransform;
varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
uniform mat3 lightMapTransform;
varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
uniform mat3 aoMapTransform;
varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
uniform mat3 bumpMapTransform;
varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
uniform mat3 normalMapTransform;
varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
uniform mat3 displacementMapTransform;
varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
uniform mat3 emissiveMapTransform;
varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
uniform mat3 metalnessMapTransform;
varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
uniform mat3 roughnessMapTransform;
varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
uniform mat3 anisotropyMapTransform;
varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
uniform mat3 clearcoatMapTransform;
varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
uniform mat3 clearcoatNormalMapTransform;
varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
uniform mat3 clearcoatRoughnessMapTransform;
varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
uniform mat3 sheenColorMapTransform;
varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform mat3 sheenRoughnessMapTransform;
varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
uniform mat3 iridescenceMapTransform;
varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
uniform mat3 iridescenceThicknessMapTransform;
varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
uniform mat3 specularMapTransform;
varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
uniform mat3 specularColorMapTransform;
varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform mat3 specularIntensityMapTransform;
varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
uniform mat3 transmissionMapTransform;
varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
uniform mat3 thicknessMapTransform;
varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
vec4 texColor = texture2D( t2D, vUv );
#ifdef DECODE_VIDEO_TEXTURE
texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
#endif
texColor.rgb *= backgroundIntensity;
gl_FragColor = texColor;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
vWorldDirection = transformDirection( position, modelMatrix );
#include <begin_vertex>
#include <project_vertex>
gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
#ifdef ENVMAP_TYPE_CUBE
vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
#elif defined( ENVMAP_TYPE_CUBE_UV )
vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
#else
vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
#endif
texColor.rgb *= backgroundIntensity;
gl_FragColor = texColor;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
vWorldDirection = transformDirection( position, modelMatrix );
#include <begin_vertex>
#include <project_vertex>
gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
gl_FragColor = texColor;
gl_FragColor.a *= opacity;
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
#include <uv_vertex>
#include <batching_vertex>
#include <skinbase_vertex>
#include <morphinstance_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
vec4 diffuseColor = vec4( 1.0 );
#include <clipping_planes_fragment>
#if DEPTH_PACKING == 3200
diffuseColor.a = opacity;
#endif
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <logdepthbuf_fragment>
#ifdef USE_REVERSED_DEPTH_BUFFER
float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
#else
float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
#endif
#if DEPTH_PACKING == 3200
gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
#elif DEPTH_PACKING == 3201
gl_FragColor = packDepthToRGBA( fragCoordZ );
#elif DEPTH_PACKING == 3202
gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
#elif DEPTH_PACKING == 3203
gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <batching_vertex>
#include <skinbase_vertex>
#include <morphinstance_vertex>
#ifdef USE_DISPLACEMENTMAP
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <worldpos_vertex>
#include <clipping_planes_vertex>
vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( 1.0 );
#include <clipping_planes_fragment>
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
float dist = length( vWorldPosition - referencePosition );
dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
dist = saturate( dist );
gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
vWorldDirection = transformDirection( position, modelMatrix );
#include <begin_vertex>
#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
vec3 direction = normalize( vWorldDirection );
vec2 sampleUV = equirectUv( direction );
gl_FragColor = texture2D( tEquirect, sampleUV );
#include <tonemapping_fragment>
#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
vLineDistance = scale * lineDistance;
#include <uv_vertex>
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
if ( mod( vLineDistance, totalSize ) > dashSize ) {
discard;
}
vec3 outgoingLight = vec3( 0.0 );
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
outgoingLight = diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>
#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#endif
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <envmap_vertex>
#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
#ifdef USE_LIGHTMAP
vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
#else
reflectedLight.indirectDiffuse += vec3( 1.0 );
#endif
#include <aomap_fragment>
reflectedLight.indirectDiffuse *= diffuseColor.rgb;
vec3 outgoingLight = reflectedLight.indirectDiffuse;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition = - mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_lambert_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
vec3 viewDir = normalize( vViewPosition );
vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
vec3 y = cross( viewDir, x );
vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
#ifdef USE_MATCAP
vec4 matcapColor = texture2D( matcap, uv );
#else
vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
#endif
vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphinstance_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
#include <clipping_planes_fragment>
#include <logdepthbuf_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
#ifdef OPAQUE
gl_FragColor.a = 1.0;
#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphinstance_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition = - mvPosition.xyz;
#include <worldpos_vertex>
#include <envmap_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <specularmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_phong_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
#include <envmap_fragment>
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition = - mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
#ifdef USE_TRANSMISSION
vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
#define IOR
#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
uniform float ior;
#endif
#ifdef USE_SPECULAR
uniform float specularIntensity;
uniform vec3 specularColor;
#ifdef USE_SPECULAR_COLORMAP
uniform sampler2D specularColorMap;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
uniform sampler2D specularIntensityMap;
#endif
#endif
#ifdef USE_CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
uniform float iridescence;
uniform float iridescenceIOR;
uniform float iridescenceThicknessMinimum;
uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
uniform vec3 sheenColor;
uniform float sheenRoughness;
#ifdef USE_SHEEN_COLORMAP
uniform sampler2D sheenColorMap;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
uniform sampler2D sheenRoughnessMap;
#endif
#endif
#ifdef USE_ANISOTROPY
uniform vec2 anisotropyVector;
#ifdef USE_ANISOTROPYMAP
uniform sampler2D anisotropyMap;
#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
#include <transmission_fragment>
vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
#ifdef USE_SHEEN
outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
#endif
#ifdef USE_CLEARCOAT
float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
#endif
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <normal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <displacementmap_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
vViewPosition = - mvPosition.xyz;
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
vec3 totalEmissiveRadiance = emissive;
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <emissivemap_fragment>
#include <lights_toon_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
varying vec2 vUv;
uniform mat3 uvTransform;
#endif
void main() {
#ifdef USE_POINTS_UV
vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
#endif
#include <color_vertex>
#include <morphinstance_vertex>
#include <morphcolor_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <project_vertex>
gl_PointSize = size;
#ifdef USE_SIZEATTENUATION
bool isPerspective = isPerspectiveMatrix( projectionMatrix );
if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
#endif
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <worldpos_vertex>
#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
vec3 outgoingLight = vec3( 0.0 );
#include <logdepthbuf_fragment>
#include <map_particle_fragment>
#include <color_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
outgoingLight = diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
#include <batching_vertex>
#include <beginnormal_vertex>
#include <morphinstance_vertex>
#include <morphnormal_vertex>
#include <skinbase_vertex>
#include <skinnormal_vertex>
#include <defaultnormal_vertex>
#include <begin_vertex>
#include <morphtarget_vertex>
#include <skinning_vertex>
#include <project_vertex>
#include <logdepthbuf_vertex>
#include <worldpos_vertex>
#include <shadowmap_vertex>
#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
#include <logdepthbuf_fragment>
gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
#include <uv_vertex>
vec4 mvPosition = modelViewMatrix[ 3 ];
vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
#ifndef USE_SIZEATTENUATION
bool isPerspective = isPerspectiveMatrix( projectionMatrix );
if ( isPerspective ) scale *= - mvPosition.z;
#endif
vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
vec2 rotatedPosition;
rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
mvPosition.xy += rotatedPosition;
gl_Position = projectionMatrix * mvPosition;
#include <logdepthbuf_vertex>
#include <clipping_planes_vertex>
#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
vec4 diffuseColor = vec4( diffuse, opacity );
#include <clipping_planes_fragment>
vec3 outgoingLight = vec3( 0.0 );
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <alphahash_fragment>
outgoingLight = diffuseColor.rgb;
#include <opaque_fragment>
#include <tonemapping_fragment>
#include <colorspace_fragment>
#include <fog_fragment>
}`},X={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ni},alphaMap:{value:null},alphaMapTransform:{value:new Ni},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ni}},envmap:{envMap:{value:null},envMapRotation:{value:new Ni},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ni}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ni}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ni},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ni},normalScale:{value:new oi(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ni},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ni}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ni}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ni}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ni},alphaTest:{value:0},uvTransform:{value:new Ni}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new oi(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ni},alphaMap:{value:null},alphaMapTransform:{value:new Ni},alphaTest:{value:0}}},ac={basic:{uniforms:I([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:ic.meshbasic_vert,fragmentShader:ic.meshbasic_frag},lambert:{uniforms:I([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new jt(0)},envMapIntensity:{value:1}}]),vertexShader:ic.meshlambert_vert,fragmentShader:ic.meshlambert_frag},phong:{uniforms:I([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ic.meshphong_vert,fragmentShader:ic.meshphong_frag},standard:{uniforms:I([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ic.meshphysical_vert,fragmentShader:ic.meshphysical_frag},toon:{uniforms:I([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new jt(0)}}]),vertexShader:ic.meshtoon_vert,fragmentShader:ic.meshtoon_frag},matcap:{uniforms:I([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:ic.meshmatcap_vert,fragmentShader:ic.meshmatcap_frag},points:{uniforms:I([X.points,X.fog]),vertexShader:ic.points_vert,fragmentShader:ic.points_frag},dashed:{uniforms:I([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ic.linedashed_vert,fragmentShader:ic.linedashed_frag},depth:{uniforms:I([X.common,X.displacementmap]),vertexShader:ic.depth_vert,fragmentShader:ic.depth_frag},normal:{uniforms:I([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:ic.meshnormal_vert,fragmentShader:ic.meshnormal_frag},sprite:{uniforms:I([X.sprite,X.fog]),vertexShader:ic.sprite_vert,fragmentShader:ic.sprite_frag},background:{uniforms:{uvTransform:{value:new Ni},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ic.background_vert,fragmentShader:ic.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ni}},vertexShader:ic.backgroundCube_vert,fragmentShader:ic.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ic.cube_vert,fragmentShader:ic.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ic.equirect_vert,fragmentShader:ic.equirect_frag},distance:{uniforms:I([X.common,X.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ic.distance_vert,fragmentShader:ic.distance_frag},shadow:{uniforms:I([X.lights,X.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:ic.shadow_vert,fragmentShader:ic.shadow_frag}};ac.physical={uniforms:I([ac.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ni},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ni},clearcoatNormalScale:{value:new oi(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ni},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ni},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ni},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ni},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ni},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ni},transmissionSamplerSize:{value:new oi},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ni},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ni},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ni},anisotropyVector:{value:new oi},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ni}}]),vertexShader:ic.meshphysical_vert,fragmentShader:ic.meshphysical_frag};var oc={r:0,b:0,g:0},sc=new Dr,cc=new Ni;cc.set(-1,0,0,0,1,0,0,0,1);function lc(e,t,r,i,a,o){let s=new jt(0),c=a===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let n=!1,i=m(t);i===null?_(s,c):i&&i.isColor&&(_(i,1),n=!0);let a=e.xr.getEnvironmentBlendMode();a===`additive`?r.buffers.color.setClear(0,0,0,1,o):a===`alpha-blend`&&r.buffers.color.setClear(0,0,0,0,o),(e.autoClear||n)&&(r.buffers.depth.setTest(!0),r.buffers.depth.setMask(!0),r.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,r){let a=m(r);a&&(a.isCubeTexture||a.mapping===306)?(u===void 0&&(u=new En(new $e(1,1,1),new Ui({name:`BackgroundCubeMaterial`,uniforms:oa(ac.backgroundCube.uniforms),vertexShader:ac.backgroundCube.vertexShader,fragmentShader:ac.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=a,u.material.uniforms.backgroundBlurriness.value=r.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=r.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(sc.makeRotationFromEuler(r.backgroundRotation)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(cc),u.material.toneMapped=ce.getTransfer(a.colorSpace)!==n,(d!==a||f!==a.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=a,f=a.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):a&&a.isTexture&&(l===void 0&&(l=new En(new Nr(2,2),new Ui({name:`BackgroundMaterial`,uniforms:oa(ac.background.uniforms),vertexShader:ac.background.vertexShader,fragmentShader:ac.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=a,l.material.uniforms.backgroundIntensity.value=r.backgroundIntensity,l.material.toneMapped=ce.getTransfer(a.colorSpace)!==n,a.matrixAutoUpdate===!0&&a.updateMatrix(),l.material.uniforms.uvTransform.value.copy(a.matrix),(d!==a||f!==a.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=a,f=a.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,n){t.getRGB(oc,pa(e)),r.buffers.color.setClear(oc.r,oc.g,oc.b,n,o)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return s},setClearColor:function(e,t=1){s.set(e),c=t,_(s,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(s,c)},render:h,addToRenderList:g,dispose:v}}function uc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function dc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function fc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(zr(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&zr(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function pc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new d,s=new Ni,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var mc=4,hc=6,gc=20,_c=256,vc=new ee,yc=new jt,bc=null,xc=0,Sc=0,Cc=!1,wc=new J,Tc=new J,Ec=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=wc}=i;bc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),Sc=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(bc,xc,Sc),this._renderer.xr.enabled=Cc,e.scissorTest=!1,kc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),bc=this._renderer.getRenderTarget(),xc=this._renderer.getActiveCubeFace(),Sc=this._renderer.getActiveMipmapLevel(),Cc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:_t,minFilter:_t,generateMipmaps:!1,type:sn,format:i,colorSpace:Kt,depthBuffer:!1},r=Oc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Dc(r)),this._blurMaterial=jc(r,e,t),this._ggxMaterial=Ac(r,e,t)}return r}_compileMaterial(e){let t=new En(new kr,e);this._renderer.compile(t,vc)}_sceneToCubeUV(e,t,n,r,i){let a=new Br(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(yc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new En(new $e,new mi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(yc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;kc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;kc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,vc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-mc?n-d+mc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,kc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,vc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,kc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,vc)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];kc(t,3*l*(r>this._lodMax-mc?r-this._lodMax+mc:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,vc)}};function Dc(e){let t=[],n=[],r=e,i=e-mc+1+hc;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,s=1+i,c=[a,a,s,a,s,s,a,a,s,s,a,s],l=new Float32Array(108),u=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];l.set(r,18*e);for(let t=0;t<6;t++){let n=c[t*2]*2-1,r=c[t*2+1]*2-1;e===0?Tc.set(1,r,n):e===1?Tc.set(-n,1,-r):e===2?Tc.set(-n,r,1):e===3?Tc.set(-1,r,-n):e===4?Tc.set(-n,-1,r):Tc.set(n,r,-1),Tc.toArray(u,(e*6+t)*3)}}let d=new kr;d.setAttribute(`position`,new o(l,3)),d.setAttribute(`outputDirection`,new o(u,3)),n.push(new En(d,null)),r>mc&&r--}return{lodMeshes:n,sizeLods:t}}function Oc(e,t,n){let r=new Kn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function kc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Ac(e,t,n){return new Ui({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:_c,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Pc(),fragmentShader:`
precision highp float;
precision highp int;
varying vec3 vOutputDirection;
uniform sampler2D envMap;
uniform float roughness;
uniform float mipInt;
#define ENVMAP_TYPE_CUBE_UV
#include <cube_uv_reflection_fragment>
#define PI 3.14159265359
float radicalInverse_VdC(uint bits) {
bits = (bits << 16u) | (bits >> 16u);
bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
return float(bits) * 2.3283064365386963e-10;
}
vec2 hammersley(uint i, uint N) {
return vec2(float(i) / float(N), radicalInverse_VdC(i));
}
vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
float alpha = roughness * roughness;
vec3 T1 = vec3(1.0, 0.0, 0.0);
vec3 T2 = cross(V, T1);
float r = sqrt(Xi.x);
float phi = 2.0 * PI * Xi.y;
float t1 = r * cos(phi);
float t2 = r * sin(phi);
float s = 0.5 * (1.0 + V.z);
t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;
vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;
return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
}
void main() {
vec3 N = normalize(vOutputDirection);
vec3 V = N;
vec3 prefilteredColor = vec3(0.0);
float totalWeight = 0.0;
if (roughness < 0.001) {
gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
return;
}
vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
vec3 tangent = normalize(cross(up, N));
vec3 bitangent = cross(N, tangent);
for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
vec2 Xi = hammersley(i, uint(GGX_SAMPLES));
vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);
vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
vec3 L = normalize(2.0 * dot(V, H) * H - V);
float NdotL = max(dot(N, L), 0.0);
if(NdotL > 0.0) {
vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);
prefilteredColor += sampleColor * NdotL;
totalWeight += NdotL;
}
}
if (totalWeight > 0.0) {
prefilteredColor = prefilteredColor / totalWeight;
}
gl_FragColor = vec4(prefilteredColor, 1.0);
}
`,blending:0,depthTest:!1,depthWrite:!1})}function jc(e,t,n){return new Ui({name:`SphericalGaussianBlur`,defines:{SAMPLES:gc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Pc(),fragmentShader:`
precision highp float;
precision highp int;
varying vec3 vOutputDirection;
uniform sampler2D envMap;
uniform float sigma;
uniform float mipInt;
#define ENVMAP_TYPE_CUBE_UV
#include <cube_uv_reflection_fragment>
#define PI 3.14159265359
#define GOLDEN_ANGLE 2.39996322973
void main() {
if ( sigma == 0.0 ) {
gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
return;
}
vec3 outputDirection = normalize( vOutputDirection );
vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
vec3 tangent = normalize( cross( up, outputDirection ) );
vec3 bitangent = cross( outputDirection, tangent );
float thetaMax = min( 3.0 * sigma, PI );
float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );
vec3 accumColor = vec3( 0.0 );
float accumWeight = 0.0;
for ( int i = 0; i < SAMPLES; i ++ ) {
float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
float phi = float( i ) * GOLDEN_ANGLE;
vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;
float weight = sin( theta ) / theta;
accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
accumWeight += weight;
}
gl_FragColor = vec4( accumColor / accumWeight, 1.0 );
}
`,blending:0,depthTest:!1,depthWrite:!1})}function Mc(){return new Ui({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Pc(),fragmentShader:`
precision mediump float;
precision mediump int;
varying vec3 vOutputDirection;
uniform sampler2D envMap;
#include <common>
void main() {
vec3 outputDirection = normalize( vOutputDirection );
vec2 uv = equirectUv( outputDirection );
gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );
}
`,blending:0,depthTest:!1,depthWrite:!1})}function Nc(){return new Ui({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pc(),fragmentShader:`
precision mediump float;
precision mediump int;
uniform float flipEnvMap;
varying vec3 vOutputDirection;
uniform samplerCube envMap;
void main() {
gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );
}
`,blending:0,depthTest:!1,depthWrite:!1})}function Pc(){return`
precision mediump float;
precision mediump int;
attribute vec3 outputDirection;
varying vec3 vOutputDirection;
void main() {
vOutputDirection = outputDirection;
gl_Position = vec4( position, 1.0 );
}
`}var Fc=class extends Kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ji(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let r={uniforms:{tEquirect:{value:null}},vertexShader:`
varying vec3 vWorldDirection;
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
void main() {
vWorldDirection = transformDirection( position, modelMatrix );
#include <begin_vertex>
#include <project_vertex>
}
`,fragmentShader:`
uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
vec3 direction = normalize( vWorldDirection );
vec2 sampleUV = equirectUv( direction );
gl_FragColor = texture2D( tEquirect, sampleUV );
}
`},i=new $e(5,5,5),a=new Ui({name:`CubemapFromEquirect`,uniforms:oa(r.uniforms),vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:1,blending:0});a.uniforms.tEquirect.value=n;let o=new En(i,a),s=n.minFilter;return n.minFilter===1008&&(n.minFilter=_t),new e(1,10,this).update(t,o),n.minFilter=s,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function Ic(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Fc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ec(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ec(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Lc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&u(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Rc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?he:Rt)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function zc(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Bc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:ba(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Vc(e,t,n){let r=new WeakMap,i=new Er;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Jn(h,p,m,u);g.type=G,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new oi(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Hc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var Uc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Wc(e,t,n,r,i,a){let o=new Kn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new kr;l.setAttribute(`position`,new Be([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Be([0,2,0,0,2,0],2));let u=new ie({uniforms:{tDiffuse:{value:null}},vertexShader:`
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
vUv = uv;
gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fragmentShader:`
precision highp float;
uniform sampler2D tDiffuse;
varying vec2 vUv;
#include <tonemapping_pars_fragment>
#include <colorspace_pars_fragment>
void main() {
gl_FragColor = texture2D( tDiffuse, vUv );
#ifdef LINEAR_TONE_MAPPING
gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
#elif defined( REINHARD_TONE_MAPPING )
gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
#elif defined( CINEON_TONE_MAPPING )
gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
#elif defined( ACES_FILMIC_TONE_MAPPING )
gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
#elif defined( AGX_TONE_MAPPING )
gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
#elif defined( NEUTRAL_TONE_MAPPING )
gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
#elif defined( CUSTOM_TONE_MAPPING )
gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
#endif
#ifdef SRGB_TRANSFER
gl_FragColor = sRGBTransferOETF( gl_FragColor );
#endif
}`,depthTest:!1,depthWrite:!1}),d=new En(l,u),f=new ee(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new Kn(t,n,{type:sn,depthBuffer:!1,stencilBuffer:!1}),c=new Kn(t,n,{type:sn,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},ce.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=Uc[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var Gc=new Ar,Kc=new Pn(1,1),qc=new Jn,Jc=new ta,Yc=new Ji,Xc=[],Zc=[],Qc=new Float32Array(16),$c=new Float32Array(9),el=new Float32Array(4);function tl(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Xc[i];if(a===void 0&&(a=new Float32Array(i),Xc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function nl(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function rl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function il(e,t){let n=Zc[t];n===void 0&&(n=new Int32Array(t),Zc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function al(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(nl(n,t))return;e.uniform2fv(this.addr,t),rl(n,t)}}function sl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(nl(n,t))return;e.uniform3fv(this.addr,t),rl(n,t)}}function cl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(nl(n,t))return;e.uniform4fv(this.addr,t),rl(n,t)}}function ll(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(nl(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),rl(n,t)}else{if(nl(n,r))return;el.set(r),e.uniformMatrix2fv(this.addr,!1,el),rl(n,r)}}function ul(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(nl(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),rl(n,t)}else{if(nl(n,r))return;$c.set(r),e.uniformMatrix3fv(this.addr,!1,$c),rl(n,r)}}function dl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(nl(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),rl(n,t)}else{if(nl(n,r))return;Qc.set(r),e.uniformMatrix4fv(this.addr,!1,Qc),rl(n,r)}}function fl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(nl(n,t))return;e.uniform2iv(this.addr,t),rl(n,t)}}function ml(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(nl(n,t))return;e.uniform3iv(this.addr,t),rl(n,t)}}function hl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(nl(n,t))return;e.uniform4iv(this.addr,t),rl(n,t)}}function gl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function _l(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(nl(n,t))return;e.uniform2uiv(this.addr,t),rl(n,t)}}function vl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(nl(n,t))return;e.uniform3uiv(this.addr,t),rl(n,t)}}function yl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(nl(n,t))return;e.uniform4uiv(this.addr,t),rl(n,t)}}function bl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Kc.compareFunction=n.isReversedDepthBuffer()?518:515,a=Kc):a=Gc,n.setTexture2D(t||a,i)}function xl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Jc,i)}function Sl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Yc,i)}function Cl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||qc,i)}function wl(e){switch(e){case 5126:return al;case 35664:return ol;case 35665:return sl;case 35666:return cl;case 35674:return ll;case 35675:return ul;case 35676:return dl;case 5124:case 35670:return fl;case 35667:case 35671:return pl;case 35668:case 35672:return ml;case 35669:case 35673:return hl;case 5125:return gl;case 36294:return _l;case 36295:return vl;case 36296:return yl;case 35678:case 36198:case 36298:case 36306:case 35682:return bl;case 35679:case 36299:case 36307:return xl;case 35680:case 36300:case 36308:case 36293:return Sl;case 36289:case 36303:case 36311:case 36292:return Cl}}function Tl(e,t){e.uniform1fv(this.addr,t)}function El(e,t){let n=tl(t,this.size,2);e.uniform2fv(this.addr,n)}function Dl(e,t){let n=tl(t,this.size,3);e.uniform3fv(this.addr,n)}function Ol(e,t){let n=tl(t,this.size,4);e.uniform4fv(this.addr,n)}function kl(e,t){let n=tl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Al(e,t){let n=tl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function jl(e,t){let n=tl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ml(e,t){e.uniform1iv(this.addr,t)}function Nl(e,t){e.uniform2iv(this.addr,t)}function Pl(e,t){e.uniform3iv(this.addr,t)}function Fl(e,t){e.uniform4iv(this.addr,t)}function Il(e,t){e.uniform1uiv(this.addr,t)}function Ll(e,t){e.uniform2uiv(this.addr,t)}function Rl(e,t){e.uniform3uiv(this.addr,t)}function zl(e,t){e.uniform4uiv(this.addr,t)}function Bl(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Kc:Gc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Vl(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Jc,a[e])}function Hl(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Yc,a[e])}function Ul(e,t,n){let r=this.cache,i=t.length,a=il(n,i);nl(r,a)||(e.uniform1iv(this.addr,a),rl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||qc,a[e])}function Wl(e){switch(e){case 5126:return Tl;case 35664:return El;case 35665:return Dl;case 35666:return Ol;case 35674:return kl;case 35675:return Al;case 35676:return jl;case 5124:case 35670:return Ml;case 35667:case 35671:return Nl;case 35668:case 35672:return Pl;case 35669:case 35673:return Fl;case 5125:return Il;case 36294:return Ll;case 36295:return Rl;case 36296:return zl;case 35678:case 36198:case 36298:case 36306:case 35682:return Bl;case 35679:case 36299:case 36307:return Vl;case 35680:case 36300:case 36308:case 36293:return Hl;case 36289:case 36303:case 36311:case 36292:return Ul}}var Gl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=wl(t.type)}},Kl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Wl(t.type)}},ql=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Jl=/(\w+)(\])?(\[|\.)?/g;function Yl(e,t){e.seq.push(t),e.map[t.id]=t}function Xl(e,t,n){let r=e.name,i=r.length;for(Jl.lastIndex=0;;){let a=Jl.exec(r),o=Jl.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Yl(n,l===void 0?new Gl(s,e,t):new Kl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ql(s),Yl(n,e)),n=e}}}var Zl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Xl(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ql(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var $l=37297,eu=0;function tu(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var nu=new Ni;function ru(e){ce._getMatrix(nu,ce.workingColorSpace,e);let t=`mat3( ${nu.elements.map(e=>e.toFixed(4))} )`;switch(ce.getTransfer(e)){case de:return[t,`LinearTransferOETF`];case n:return[t,`sRGBTransferOETF`];default:return zr(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function iu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+tu(e.getShaderSource(t),r)}return i}function au(e,t){let n=ru(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var ou={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function su(e,t){let n=ou[t];return n===void 0?(zr(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var cu=new J;function lu(){return ce.getLuminanceCoefficients(cu),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${cu.x.toFixed(4)}, ${cu.y.toFixed(4)}, ${cu.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function uu(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(pu).join(`
`)}function du(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function fu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function pu(e){return e!==``}function mu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function hu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var gu=/^[ \t]*#include +<([\w\d./]+)>/gm;function _u(e){return e.replace(gu,yu)}var vu=new Map;function yu(e,t){let n=ic[t];if(n===void 0){let e=vu.get(t);if(e!==void 0)n=ic[e],zr(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return _u(n)}var bu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xu(e){return e.replace(bu,Su)}function Su(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Cu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var wu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Tu(e){return wu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Eu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Du(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Eu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Ou={302:`ENVMAP_MODE_REFRACTION`};function ku(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Ou[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Au={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ju(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Au[e.combine]||`ENVMAP_BLENDING_NONE`}function Mu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Nu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Tu(n),l=Du(n),u=ku(n),d=ju(n),f=Mu(n),p=uu(n),m=du(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(pu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(pu).join(`
`),_.length>0&&(_+=`
`)):(g=[Cu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(pu).join(`
`),_=[Cu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:ic.tonemapping_pars_fragment,n.toneMapping===0?``:su(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,ic.colorspace_pars_fragment,au(`linearToOutputTexel`,n.outputColorSpace),lu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(pu).join(`
`)),o=_u(o),o=mu(o,n),o=hu(o,n),s=_u(s),s=mu(s,n),s=hu(s,n),o=xu(o),s=xu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ql(i,i.VERTEX_SHADER,y),S=Ql(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=iu(i,x,`vertex`),n=iu(i,S,`fragment`);ba(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):zr(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Zl(i,h),T=fu(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,$l)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=eu++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Pu=0,Fu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new Iu(e),t.set(e,n)),n}},Iu=class{constructor(e){this.id=Pu++,this.code=e,this.usedTimes=0}};function Lu(e){return e===1030||e===37490||e===36285}function Ru(e,t,n,r,i,a){let o=new F,s=new Fu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&zr(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=ac[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),j=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,P=!!i.map,F=!!i.matcap,I=!!x,L=!!i.aoMap,te=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,re=!!i.normalMap,ie=!!i.displacementMap,ae=!!i.emissiveMap,oe=!!i.metalnessMap,se=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,he=i.transmission>0,ge=le&&!!i.anisotropyMap,_e=ue&&!!i.clearcoatMap,ve=ue&&!!i.clearcoatNormalMap,ye=ue&&!!i.clearcoatRoughnessMap,be=pe&&!!i.iridescenceMap,xe=pe&&!!i.iridescenceThicknessMap,Se=me&&!!i.sheenColorMap,Ce=me&&!!i.sheenRoughnessMap,we=!!i.specularMap,Te=!!i.specularColorMap,R=!!i.specularIntensityMap,Ee=he&&!!i.transmissionMap,De=he&&!!i.thicknessMap,Oe=!!i.gradientMap,ke=!!i.alphaMap,z=i.alphaTest>0,Ae=!!i.alphaHash,B=!!i.extensions,je=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ce.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:F,envMap:I,envMapMode:I&&x.mapping,envMapCubeUVHeight:S,aoMap:L,lightMap:te,bumpMap:ne,normalMap:re,displacementMap:ie,emissiveMap:ae,normalMapObjectSpace:re&&i.normalMapType===1,normalMapTangentSpace:re&&i.normalMapType===0,packedNormalMap:re&&i.normalMapType===0&&Lu(i.normalMap.format),metalnessMap:oe,roughnessMap:se,anisotropy:le,anisotropyMap:ge,clearcoat:ue,clearcoatMap:_e,clearcoatNormalMap:ve,clearcoatRoughnessMap:ye,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:be,iridescenceThicknessMap:xe,sheen:me,sheenColorMap:Se,sheenRoughnessMap:Ce,specularMap:we,specularColorMap:Te,specularIntensityMap:R,transmission:he,transmissionMap:Ee,thicknessMap:De,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ke,alphaTest:z,alphaHash:Ae,combine:i.combine,mapUv:P&&m(i.map.channel),aoMapUv:L&&m(i.aoMap.channel),lightMapUv:te&&m(i.lightMap.channel),bumpMapUv:ne&&m(i.bumpMap.channel),normalMapUv:re&&m(i.normalMap.channel),displacementMapUv:ie&&m(i.displacementMap.channel),emissiveMapUv:ae&&m(i.emissiveMap.channel),metalnessMapUv:oe&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:ge&&m(i.anisotropyMap.channel),clearcoatMapUv:_e&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ve&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ye&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:be&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:xe&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(i.sheenRoughnessMap.channel),specularMapUv:we&&m(i.specularMap.channel),specularColorMapUv:Te&&m(i.specularColorMap.channel),specularIntensityMapUv:R&&m(i.specularIntensityMap.channel),transmissionMapUv:Ee&&m(i.transmissionMap.channel),thicknessMapUv:De&&m(i.thicknessMap.channel),alphaMapUv:ke&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(re||le),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(P||ke),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&re===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:j,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&ce.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ae&&i.emissiveMap.isVideoTexture===!0&&ce.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:B&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(B&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=ac[t];n=wi.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Nu(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function zu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Bu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Vu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Hu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Bu),r.length>1&&r.sort(t||Vu),i.length>1&&i.sort(t||Vu)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Uu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new Hu,e.set(t,[i])):n>=r.length?(i=new Hu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Wu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new jt};break;case`SpotLight`:n={position:new J,direction:new J,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new jt,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new jt,groundColor:new jt};break;case`RectAreaLight`:n={color:new jt,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function Gu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oi};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oi};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new oi,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Ku=0;function qu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ju(e){let t=new Wu,n=Gu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new Dr,o=new Dr;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(qu);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=Ku++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function Yu(e){let t=new Ju(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Xu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Yu(e),t.set(n,[a])):r>=i.length?(a=new Yu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Zu=`void main() {
gl_Position = vec4( position, 1.0 );
}`,Qu=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
const float samples = float( VSM_SAMPLES );
float mean = 0.0;
float squared_mean = 0.0;
float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
for ( float i = 0.0; i < samples; i ++ ) {
float uvOffset = uvStart + i * uvStride;
#ifdef HORIZONTAL_PASS
vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
mean += distribution.x;
squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
#else
float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
mean += depth;
squared_mean += depth * depth;
#endif
}
mean = mean / samples;
squared_mean = squared_mean / samples;
float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,$u=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],ed=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],td=new Dr,nd=new J,rd=new J;function id(e,t,n){let r=new ye,i=new oi,a=new oi,s=new Er,c=new Bi,l=new Bn,u={},d=n.maxTextureSize,f={0:1,1:0,2:2},p=new Ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new oi},radius:{value:4}},vertexShader:Zu,fragmentShader:Qu}),m=p.clone();m.defines.HORIZONTAL_PASS=1;let h=new kr;h.setAttribute(`position`,new o(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new En(h,p),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let v=this.type;this.render=function(t,n,o){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||t.length===0)return;this.type===2&&(zr(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),u=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=v!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],u=l.shadow;if(u===void 0){zr(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(u.autoUpdate===!1&&u.needsUpdate===!1)continue;i.copy(u.mapSize);let m=u.getFrameExtents();i.multiply(m),a.copy(u.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(a.x=Math.floor(d/m.x),i.x=a.x*m.x,u.mapSize.x=a.x),i.y>d&&(a.y=Math.floor(d/m.y),i.y=a.y*m.y,u.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(u.camera._reversedDepth=h,u.map===null||p===!0){if(u.map!==null&&(u.map.depthTexture!==null&&(u.map.depthTexture.dispose(),u.map.depthTexture=null),u.map.dispose()),this.type===3){if(l.isPointLight){zr(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}u.map=new Kn(i.x,i.y,{format:Ye,type:sn,minFilter:_t,magFilter:_t,generateMipmaps:!1}),u.map.texture.name=l.name+`.shadowMap`,u.map.depthTexture=new Pn(i.x,i.y,G),u.map.depthTexture.name=l.name+`.shadowMapDepth`,u.map.depthTexture.format=ca,u.map.depthTexture.compareFunction=null,u.map.depthTexture.minFilter=yn,u.map.depthTexture.magFilter=yn}else l.isPointLight?(u.map=new Fc(i.x),u.map.depthTexture=new er(i.x,ft)):(u.map=new Kn(i.x,i.y),u.map.depthTexture=new Pn(i.x,i.y,ft)),u.map.depthTexture.name=l.name+`.shadowMap`,u.map.depthTexture.format=ca,this.type===1?(u.map.depthTexture.compareFunction=h?518:515,u.map.depthTexture.minFilter=_t,u.map.depthTexture.magFilter=_t):(u.map.depthTexture.compareFunction=null,u.map.depthTexture.minFilter=yn,u.map.depthTexture.magFilter=yn);u.camera.updateProjectionMatrix()}u.map.isWebGLCubeRenderTarget!==!0&&(u.map.width!==i.x||u.map.height!==i.y)&&u.map.setSize(i.x,i.y);let g=u.map.isWebGLCubeRenderTarget?6:u.getViewportCount();l.isPointLight!==!0&&u.updateMatrices(l,o);for(let t=0;t<g;t++){let i=u.getCamera(t);if(l.isPointLight){let e=u.camera,n=u.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),nd.setFromMatrixPosition(l.matrixWorld),e.position.copy(nd),rd.copy(e.position),rd.add($u[t]),e.up.copy(ed[t]),e.lookAt(rd),e.updateMatrixWorld(),n.makeTranslation(-nd.x,-nd.y,-nd.z),td.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),u._frustum.setFromProjectionMatrix(td,e.coordinateSystem,e.reversedDepth)}if(u.map.isWebGLCubeRenderTarget)e.setRenderTarget(u.map,t),e.clear();else{t===0&&(e.setRenderTarget(u.map),e.clear());let n=u.getViewport(t);s.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(s)}r=u.getFrustum(t),x(n,o,i,l,this.type)}u.isPointLightShadow!==!0&&this.type===3&&y(u,o),u.needsUpdate=!1}v=this.type,_.needsUpdate=!1,e.setRenderTarget(c,l,u)};function y(n,r){let a=t.update(g);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,m.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),n.mapPass===null?n.mapPass=new Kn(i.x,i.y,{format:Ye,type:sn}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,g,null),m.uniforms.shadow_pass.value=n.mapPass.texture,m.uniforms.resolution.value.set(n.map.width,n.map.height),m.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,m,g,null)}function b(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?l:c,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=u[e];r===void 0&&(r={},u[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,S)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?f[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function x(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=b(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=b(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)x(c[e],i,a,o,s)}function S(e){e.target.removeEventListener(`dispose`,S);for(let t in u){let n=u[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function ad(e,t){function n(){let t=!1,n=new Er,r=null,i=new Er(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?oe(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=je[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?oe(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new jt(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,j=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(P)[1]),M=N>=1);let F=null,I={},L=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),ne=new Er().fromArray(L),re=new Er().fromArray(te);function ie(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ae={};ae[e.TEXTURE_2D]=ie(e.TEXTURE_2D,e.TEXTURE_2D,1),ae[e.TEXTURE_CUBE_MAP]=ie(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[e.TEXTURE_2D_ARRAY]=ie(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ae[e.TEXTURE_3D]=ie(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),oe(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),oe(e.CULL_FACE),pe(0);function oe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return h!==t&&(e.useProgram(t),h=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(se(e.BLEND),g=!1);else if(g===!1&&(oe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:ba(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:ba(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:ba(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:ba(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(de[n],de[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?se(e.CULL_FACE):oe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?se(e.CULL_FACE):(oe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(oe(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ye(t){t?oe(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function be(t){t===void 0&&(t=e.TEXTURE0+j-1),F!==t&&(e.activeTexture(t),F=t)}function xe(t,n,r){r===void 0&&(r=F===null?e.TEXTURE0+j-1:F);let i=I[r];i===void 0&&(i={type:void 0,texture:void 0},I[r]=i),(i.type!==t||i.texture!==n)&&(F!==r&&(e.activeTexture(r),F=r),e.bindTexture(t,n||ae[t]),i.type=t,i.texture=n)}function Se(){let t=I[F];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function R(){try{e.texSubImage3D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function z(){try{e.texImage2D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function Ae(){try{e.texImage3D(...arguments)}catch(e){ba(`WebGLState:`,e)}}function B(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){ne.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ne.copy(t))}function Pe(t){re.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),re.copy(t))}function Fe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ie(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Le(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},F=null,I={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new jt(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ne.set(0,0,e.canvas.width,e.canvas.height),re.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:oe,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:be,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:z,texImage3D:Ae,pixelStorei:Me,getParameter:B,updateUBOMapping:Fe,uniformBlockBinding:Ie,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:Te,texSubImage3D:R,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:Ne,viewport:Pe,reset:Le}}function od(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new oi,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Mn(`canvas`)}function g(e,t,n){let r=1,i=R(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),zr(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&zr(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];zr(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||zr(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?de:ce.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,zr(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function j(){let e=O;return e>=i.maxTextures&&zr(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&we(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)zr(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)zr(`WebGLRenderer: Texture marked for update but image is incomplete`);else{se(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?se(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function F(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?se(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function I(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let L={[Gt]:e.REPEAT,[Lt]:e.CLAMP_TO_EDGE,[pr]:e.MIRRORED_REPEAT},te={[yn]:e.NEAREST,[xa]:e.NEAREST_MIPMAP_NEAREST,[Nn]:e.NEAREST_MIPMAP_LINEAR,[_t]:e.LINEAR,[Pt]:e.LINEAR_MIPMAP_NEAREST,[_e]:e.LINEAR_MIPMAP_LINEAR},ne={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function re(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&zr(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,L[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,L[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,L[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,te[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,te[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ne[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ie(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ae(e,t,n){return Math.floor(Math.floor(e/n)/t)}function oe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ae(n.start,r.width,4),c=ae(t.start,r.width,4);n.start<=i+1&&a===c&&ae(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function se(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ie(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=ce.getPrimaries(ce.workingColorSpace),r=o.colorSpace===``?null:ce.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Te(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);re(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===ka,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&oe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=xt(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else zr(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?zr(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=xt(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=R(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=R(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,o,s){if(o.image.length!==6)return;let c=ie(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=ce.getPrimaries(ce.workingColorSpace),r=o.colorSpace===``?null:ce.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Te(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);re(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?zr(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=R(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Ce(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Se(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function fe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ce(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Se(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Se(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Ce(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Se(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Se(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function pe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),re(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let u=l.__webglTexture,d=Se(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Ce(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Ce(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function me(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)pe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?pe(i.__webglFramebuffer[0],t,0):pe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),fe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),fe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function he(t,n,i){let a=r.get(t);n!==void 0&&ue(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&me(t)}function ge(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Ce(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Se(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),fe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),re(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ue(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),re(c,a),ue(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),re(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ue(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&me(t)}function ve(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ye=[],be=[];function xe(t){if(t.samples>0){if(Ce(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ye.length=0,be.length=0,ye.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(ye.push(l),be.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,be)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ye))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Se(e){return Math.min(i.maxSamples,e.samples)}function Ce(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function we(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Te(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(ce.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&zr(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):ba(`WebGLTextures: Unsupported texture color space:`,n)),t}function R(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=j,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=N,this.setTexture2DArray=P,this.setTexture3D=F,this.setTextureCube=I,this.rebindTextures=he,this.setupRenderTarget=ge,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Ce,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function sd(e,t){function n(n,r=``){let i,a=ce.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var cd=`
void main() {
gl_Position = vec4( position, 1.0 );
}`,ld=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;
void main() {
vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );
if ( coord.x >= 1.0 ) {
gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;
} else {
gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;
}
}`,ud=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Qe(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ui({vertexShader:cd,fragmentShader:ld,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new En(new Nr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},dd=class extends Ke{constructor(e,t){super();let n=this,r=null,a=1,o=null,s=`local-floor`,c=1,l=null,u=null,d=null,f=null,p=null,m=null,h=typeof XRWebGLBinding<`u`,g=new ud,_={},v=t.getContextAttributes(),y=null,b=null,x=[],S=[],C=new oi,w=null,T=null,E=new Br;E.viewport=new Er;let D=new Br;D.viewport=new Er;let O=[E,D],k=new Hn,A=null,ee=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=x[e];return t===void 0&&(t=new bi,x[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=x[e];return t===void 0&&(t=new bi,x[e]=t),t.getGripSpace()},this.getHand=function(e){let t=x[e];return t===void 0&&(t=new bi,x[e]=t),t.getHandSpace()};function j(e){let t=S.indexOf(e.inputSource);if(t===-1)return;let n=x[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||o),n.dispatchEvent({type:e.type,data:e.inputSource}))}function M(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,M),r.removeEventListener(`inputsourceschange`,N);for(let e=0;e<x.length;e++){let t=S[e];t!==null&&(S[e]=null,x[e].disconnect(t))}A=null,ee=null,g.reset();for(let e in _)delete _[e];if(e.setRenderTarget(y),p=null,f=null,d=null,r=null,b=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(w),e.setSize(C.width,C.height,!1),T!==null){let e=T.camera;e.fov=T.fov,e.zoom=T.zoom,e.updateProjectionMatrix(),T=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){a=e,n.isPresenting===!0&&zr(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){s=e,n.isPresenting===!0&&zr(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&h&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(u){if(r=u,r!==null){if(y=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,M),r.addEventListener(`inputsourceschange`,N),v.xrCompatible!==!0&&await t.makeXRCompatible(),w=e.getPixelRatio(),e.getSize(C),h&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,o=null,s=null;v.depth&&(s=v.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=v.stencil?ka:ca,o=v.stencil?Xt:ft);let c={colorFormat:t.RGBA8,depthFormat:s,scaleFactor:a};d=this.getBinding(),f=d.createProjectionLayer(c),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),b=new Kn(f.textureWidth,f.textureHeight,{format:i,type:Ee,depthTexture:new Pn(f.textureWidth,f.textureHeight,o,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Kn(p.framebufferWidth,p.framebufferHeight,{format:i,type:Ee,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(s),ie.setContext(r),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=S.indexOf(n);r>=0&&(S[r]=null,x[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=S.indexOf(n);if(r===-1){for(let e=0;e<x.length;e++)if(e>=S.length){S.push(n),r=e;break}else if(S[e]===null){S[e]=n,r=e;break}if(r===-1)break}let i=x[r];i&&i.connect(n)}}let P=new J,F=new J;function I(e,t,n){P.setFromMatrixPosition(t.matrixWorld),F.setFromMatrixPosition(n.matrixWorld);let r=P.distanceTo(F),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function L(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;g.texture!==null&&(g.depthNear>0&&(t=g.depthNear),g.depthFar>0&&(n=g.depthFar)),k.near=D.near=E.near=t,k.far=D.far=E.far=n,(A!==k.near||ee!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),A=k.near,ee=k.far),k.layers.mask=e.layers.mask|6,E.layers.mask=k.layers.mask&-5,D.layers.mask=k.layers.mask&-3;let i=e.parent,a=k.cameras;L(k,i);for(let e=0;e<a.length;e++)L(a[e],i);a.length===2?I(k,E,D):k.projectionMatrix.copy(E.projectionMatrix),T===null&&e.isPerspectiveCamera&&(T={camera:e,fov:e.fov,zoom:e.zoom}),te(e,k,i)};function te(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ke*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(f!==null||p!==null)return c},this.setFoveation=function(e){c=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(k)},this.getCameraTexture=function(e){return _[e]};let ne=null;function re(t,i){if(u=i.getViewerPose(l||o),m=i,u!==null){let t=u.views;p!==null&&(e.setRenderTargetFramebuffer(b,p.framebuffer),e.setRenderTarget(b));let i=!1;t.length!==k.cameras.length&&(k.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(b,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(b))}let o=O[n];o===void 0&&(o=new Br,o.layers.enable(n),o.viewport=new Er,O[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(k.matrix.copy(o.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),i===!0&&k.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&h){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&g.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&h){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=_[n];e||(e=new Qe,_[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<x.length;e++){let t=S[e],n=x[e];t!==null&&n!==void 0&&n.update(t,i,l||o)}ne&&ne(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let ie=new nc;ie.setAnimationLoop(re),this.setAnimationLoop=function(e){ne=e},this.dispose=function(){}}},fd=new Dr,pd=new Ni;pd.set(-1,0,0,0,1,0,0,0,1);function md(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,pa(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(fd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(pd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function hd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return ba(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?zr(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):zr(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var gd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),_d=null;function vd(){return _d===null&&(_d=new sr(gd,16,16,Ye,sn),_d.name=`DFG_LUT`,_d.minFilter=_t,_d.magFilter=_t,_d.wrapS=Lt,_d.wrapT=Lt,_d.generateMipmaps=!1,_d.needsUpdate=!0),_d}var yd=class{constructor(e={}){let{canvas:n=Da(),context:r=null,depth:i=!0,stencil:a=!1,alpha:o=!1,antialias:s=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u=`default`,failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:p=Ee}=e;this.isWebGLRenderer=!0;let m;if(r!==null){if(typeof WebGLRenderingContext<`u`&&r instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);m=r.getContextAttributes().alpha}else m=o;let g=p,_=new Set([Xn,ct,h]),v=new Set([Ee,ft,Ki,Xt,t,Qn]),y=new Uint32Array(4),b=new Int32Array(4),x=new J,S=null,C=null,w=[],T=[],E=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let D=this,O=!1,k=null,ee=null,j=null,M=null;this._outputColorSpace=pt;let N=0,P=0,F=null,I=-1,L=null,te=new Er,ne=new Er,re=null,ie=new jt(0),ae=0,oe=n.width,se=n.height,le=1,ue=null,de=null,fe=new Er(0,0,oe,se),pe=new Er(0,0,oe,se),me=!1,he=new ye,ge=!1,ve=!1,be=new Dr,xe=new J,Se=new Er,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},we=!1;function Te(){return F===null?le:1}let R=r;function De(e,t){return n.getContext(e,t)}let Oe,ke,z,Ae,B,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je;try{let e={alpha:!0,depth:i,stencil:a,antialias:s,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if(`setAttribute`in n&&n.setAttribute(`data-engine`,`three.js r186`),n.addEventListener(`webglcontextlost`,Ze,!1),n.addEventListener(`webglcontextrestored`,Qe,!1),n.addEventListener(`webglcontextcreationerror`,$e,!1),R===null){let t=`webgl2`;if(R=De(t,e),R===null)throw De(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Ye()}catch(e){throw n.removeEventListener(`webglcontextlost`,Ze,!1),n.removeEventListener(`webglcontextrestored`,Qe,!1),n.removeEventListener(`webglcontextcreationerror`,$e,!1),ba(`WebGLRenderer: `+e.message),e}function Ye(){Oe=new Lc(R),Oe.init(),Ke=new sd(R,Oe),ke=new fc(R,Oe,e,Ke),z=new ad(R,Oe),ke.reversedDepthBuffer&&f&&z.buffers.depth.setReversed(!0),ee=R.createFramebuffer(),j=R.createFramebuffer(),M=R.createFramebuffer(),Ae=new Bc(R),B=new zu,je=new od(R,Oe,z,B,ke,Ke,Ae),Me=new Ic(D),Ne=new rc(R),qe=new uc(R,Ne),Pe=new Rc(R,Ne,Ae,qe),Fe=new Hc(R,Pe,Ne,qe,Ae),Ue=new Vc(R,ke,je),Be=new pc(B),Ie=new Ru(D,Me,Oe,ke,qe,Be),Le=new md(D,B),Re=new Uu,ze=new Xu(Oe),He=new lc(D,Me,z,Fe,m,c),Ve=new id(D,Fe,ke),Je=new hd(R,Ae,ke,z),We=new dc(R,Oe,Ae),Ge=new zc(R,Oe,Ae),Ae.programs=Ie.programs,D.capabilities=ke,D.extensions=Oe,D.properties=B,D.renderLists=Re,D.shadowMap=Ve,D.state=z,D.info=Ae}g!==1009&&(E=new Wc(g,n.width,n.height,s,i,a));let Xe=new dd(D,R);this.xr=Xe,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Oe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(e){e!==void 0&&(le=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,t,r=!0){Xe.isPresenting?zr(`WebGLRenderer: Can't change size while VR device is presenting.`):(oe=e,se=t,n.width=Math.floor(e*le),n.height=Math.floor(t*le),r===!0&&(n.style.width=e+`px`,n.style.height=t+`px`),E!==null&&E.setSize(n.width,n.height),this.setViewport(0,0,e,t))},this.getDrawingBufferSize=function(e){return e.set(oe*le,se*le).floor()},this.setDrawingBufferSize=function(e,t,r){oe=e,se=t,le=r,n.width=Math.floor(e*r),n.height=Math.floor(t*r),this.setViewport(0,0,e,t)},this.setEffects=function(e){if(g===1009)ba(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){zr(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}E.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(te)},this.getViewport=function(e){return e.copy(fe)},this.setViewport=function(e,t,n,r){e.isVector4?fe.set(e.x,e.y,e.z,e.w):fe.set(e,t,n,r),z.viewport(te.copy(fe).multiplyScalar(le).round())},this.getScissor=function(e){return e.copy(pe)},this.setScissor=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),z.scissor(ne.copy(pe).multiplyScalar(le).round())},this.getScissorTest=function(){return me},this.setScissorTest=function(e){z.setScissorTest(me=e)},this.setOpaqueSort=function(e){ue=e},this.setTransparentSort=function(e){de=e},this.getClearColor=function(e){return e.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor(...arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(F!==null){let t=F.texture.format;e=_.has(t)}if(e){let e=F.texture.type,t=v.has(e),n=He.getClearColor(),r=He.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(y[0]=i,y[1]=a,y[2]=o,y[3]=r,R.clearBufferuiv(R.COLOR,0,y)):(b[0]=i,b[1]=a,b[2]=o,b[3]=r,R.clearBufferiv(R.COLOR,0,b))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),k=e},this.dispose=function(){n.removeEventListener(`webglcontextlost`,Ze,!1),n.removeEventListener(`webglcontextrestored`,Qe,!1),n.removeEventListener(`webglcontextcreationerror`,$e,!1),He.dispose(),Re.dispose(),ze.dispose(),B.dispose(),Me.dispose(),Fe.dispose(),qe.dispose(),Je.dispose(),Ie.dispose(),Xe.dispose(),Xe.removeEventListener(`sessionstart`,ot),Xe.removeEventListener(`sessionend`,st),V.stop()};function Ze(e){e.preventDefault(),Ot(`WebGLRenderer: Context Lost.`),O=!0}function Qe(){Ot(`WebGLRenderer: Context Restored.`),O=!1;let e=Ae.autoReset,t=Ve.enabled,n=Ve.autoUpdate,r=Ve.needsUpdate,i=Ve.type;Ye(),Ae.autoReset=e,Ve.enabled=t,Ve.autoUpdate=n,Ve.needsUpdate=r,Ve.type=i}function $e(e){ba(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function et(e){let t=e.target;t.removeEventListener(`dispose`,et),tt(t)}function tt(e){nt(e),B.remove(e)}function nt(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Ie.releaseProgram(e)}),e.isShaderMaterial&&Ie.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ce);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=_t(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Pe.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;qe.setup(i,r,s,n,c);let h,g=We;if(c!==null&&(h=Ne.get(c),g=Ge,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*Te()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*Te()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(Oe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ne.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function rt(e,t,n,r){k!==null&&e.isNodeMaterial&&k.setObject(r,e),ge===!0&&Be.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,H(e,t,r),e.side=0,e.needsUpdate=!0,H(e,t,r),e.side=2):H(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),k!==null&&k.renderStart(e,t,n),C=ze.get(n),C.init(t),T.push(C),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(C.pushLight(e),e.castShadow&&C.pushShadow(e))}),C.setupLights(),k!==null&&k.updateLights(C.state.lightsArray),ve=this.localClippingEnabled,ge=Be.init(this.clippingPlanes,ve),ge===!0&&Be.setGlobalState(this.clippingPlanes,t),k!==null&&Ve.render(C.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];rt(o,n,t,e),r.add(o)}else rt(i,n,t,e),r.add(i)}}),C=T.pop(),k!==null&&k.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=B.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Oe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let it=null;function at(e){it&&it(e)}function ot(){V.stop()}function st(){V.start()}let V=new nc;V.setAnimationLoop(at),typeof self<`u`&&V.setContext(self),this.setAnimationLoop=function(e){it=e,Xe.setAnimationLoop(e),e===null?V.stop():V.start()},Xe.addEventListener(`sessionstart`,ot),Xe.addEventListener(`sessionend`,st),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){ba(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(O===!0)return;k!==null&&k.renderStart(e,t);let n=Xe.enabled===!0&&Xe.isPresenting===!0,r=E!==null&&(F===null||n)&&E.begin(D,F);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Xe.enabled===!0&&Xe.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(Xe.cameraAutoUpdate===!0&&Xe.updateCamera(t),t=Xe.getCamera()),e.isScene===!0&&e.onBeforeRender(D,e,t,F),C=ze.get(e,T.length),C.init(t),C.state.textureUnits=je.getTextureUnits(),T.push(C),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),he.setFromProjectionMatrix(be,$i,t.reversedDepth),ve=this.localClippingEnabled,ge=Be.init(this.clippingPlanes,ve),S=Re.get(e,w.length),S.init(),w.push(S),Xe.enabled===!0&&Xe.isPresenting===!0){let e=D.xr.getDepthSensingMesh();e!==null&&lt(e,t,-1/0,D.sortObjects)}lt(e,t,0,D.sortObjects),S.finish(),k!==null&&k.updateLights(C.state.lightsArray),D.sortObjects===!0&&S.sort(ue,de),we=Xe.enabled===!1||Xe.isPresenting===!1||Xe.hasDepthSensing()===!1,we&&He.addToRenderList(S,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&Be.beginShadows();let i=C.state.shadowsArray;if(Ve.render(i,e,t),ge===!0&&Be.endShadows(),(r&&E.hasRenderPass())===!1){let n=S.opaque,r=S.transmissive;if(C.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];dt(n,r,e,a)}we&&He.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ut(S,e,n,n.viewport)}}else r.length>0&&dt(n,r,e,t),we&&He.render(e),ut(S,e,t)}F!==null&&P===0&&(je.updateMultisampleRenderTarget(F),je.updateRenderTargetMipmap(F)),r&&E.end(D),e.isScene===!0&&e.onAfterRender(D,e,t),qe.resetDefaultState(),I=-1,L=null,T.pop(),T.length>0?(C=T[T.length-1],je.setTextureUnits(C.state.textureUnits),ge===!0&&Be.setGlobalState(D.clippingPlanes,C.state.camera)):C=null,w.pop(),S=w.length>0?w[w.length-1]:null,k!==null&&k.renderEnd()};function lt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)C.pushLightProbeGrid(e);else if(e.isLight)C.pushLight(e),e.castShadow&&C.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(he)){r&&Se.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let i=Fe.update(e),a=e.material;a.visible&&S.push(e,i,a,n,Se.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(he))){let i=Fe.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),Se.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Se.copy(e.boundingSphere.center)),Se.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&S.push(e,i,c,n,Se.z,s,t)}}else a.visible&&S.push(e,i,a,n,Se.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)lt(i[e],t,n,r)}function ut(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;C.setupLightsView(n),ge===!0&&Be.setGlobalState(D.clippingPlanes,n),r&&z.viewport(te.copy(r)),i.length>0&&mt(i,t,n),a.length>0&&mt(a,t,n),o.length>0&&mt(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function dt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[r.id]===void 0){let e=Oe.has(`EXT_color_buffer_half_float`)||Oe.has(`EXT_color_buffer_float`);C.state.transmissionRenderTarget[r.id]=new Kn(1,1,{generateMipmaps:!0,type:e?sn:Ee,minFilter:_e,samples:Math.max(4,ke.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ce.workingColorSpace})}let i=C.state.transmissionRenderTarget[r.id],o=r.viewport||te;i.setSize(o.z*D.transmissionResolutionScale,o.w*D.transmissionResolutionScale);let s=D.getRenderTarget(),c=D.getActiveCubeFace(),l=D.getActiveMipmapLevel();D.setRenderTarget(i),D.getClearColor(ie),ae=D.getClearAlpha(),ae<1&&D.setClearColor(16777215,.5),D.clear(),we&&He.render(n);let u=D.toneMapping;D.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),C.setupLightsView(r),ge===!0&&Be.setGlobalState(D.clippingPlanes,r),mt(e,n,r),je.updateMultisampleRenderTarget(i),je.updateRenderTargetMipmap(i),Oe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ht(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(je.updateMultisampleRenderTarget(i),je.updateRenderTargetMipmap(i))}D.setRenderTarget(s,c,l),D.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),D.toneMapping=u}function mt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ht(o,t,n,s,l,c)}}function ht(e,t,n,r,i,a){k!==null&&i.isNodeMaterial&&k.setObject(e,i),e.onBeforeRender(D,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(D,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,D.renderBufferDirect(n,t,r,i,e,a),i.side=2):D.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(D,t,n,r,i,a)}function H(e,t,n){t.isScene!==!0&&(t=Ce);let r=B.get(e),i=C.state.lights,a=C.state.shadowsArray,o=i.state.version,s=Ie.getParameters(e,i.state,a,t,n,C.state.lightProbeGridArray),c=Ie.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Me.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,et),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return U(e,s),d}else s.uniforms=Ie.getUniforms(e),k!==null&&e.isNodeMaterial&&k.build(e,n,s),e.onBeforeCompile(s,D),d=Ie.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Be.uniform),U(e,s),r.needsLights=G(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=C.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function gt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Zl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function U(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function W(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];x.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(x))return n}return null}function _t(e,t,n,r,i){t.isScene!==!0&&(t=Ce),je.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=F===null?D.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:ce.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Me.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(h=D.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=C.state.lights;if(ge===!0&&(ve===!0||e!==L)){let t=e===L&&r.id===I;Be.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Be.numPlanes||v.numIntersection!==Be.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=C.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=H(r,t,i),k&&r.isNodeMaterial&&k.onUpdateProgram(r,x,v));let S=!1,w=!1,T=!1,E=x.getUniforms(),O=v.uniforms;if(z.useProgram(x.program)&&(S=!0,w=!0,T=!0),r.id!==I&&(I=r.id,w=!0),v.needsLights){let e=W(C.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(S||L!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(R,`projectionMatrix`,e.projectionMatrix),E.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(R,xe.setFromMatrixPosition(e.matrixWorld)),ke.logarithmicDepthBuffer&&E.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),L!==e&&(L=e,w=!0,T=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&E.setValue(R,`sunShadowMap`,y.state.sunShadowMap,je),y.state.directionalShadowMap.length>0&&E.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,je),y.state.spotShadowMap.length>0&&E.setValue(R,`spotShadowMap`,y.state.spotShadowMap,je),y.state.pointShadowMap.length>0&&E.setValue(R,`pointShadowMap`,y.state.pointShadowMap,je)),i.isSkinnedMesh){E.setOptional(R,i,`bindMatrix`),E.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(R,`boneTexture`,e.boneTexture,je))}i.isBatchedMesh&&(E.setOptional(R,i,`batchingTexture`),E.setValue(R,`batchingTexture`,i._matricesTexture,je),E.setOptional(R,i,`batchingIdTexture`),E.setValue(R,`batchingIdTexture`,i._indirectTexture,je),E.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(R,`batchingColorTexture`,i._colorsTexture,je));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ue.update(i,n,x),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,E.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(O.envMapIntensity.value=t.environmentIntensity),O.dfgLUT!==void 0&&(O.dfgLUT.value=vd()),w){if(E.setValue(R,`toneMappingExposure`,D.toneMappingExposure),v.needsLights&&vt(O,T),a&&r.fog===!0&&Le.refreshFogUniforms(O,a),Le.refreshMaterialUniforms(O,r,le,se,C.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;O.probesSH.value=e.texture,O.probesMin.value.copy(e.boundingBox.min),O.probesMax.value.copy(e.boundingBox.max),O.probesResolution.value.copy(e.resolution)}Zl.upload(R,gt(v),O,je)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Zl.upload(R,gt(v),O,je),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(R,`center`,i.center),E.setValue(R,`modelViewMatrix`,i.modelViewMatrix),E.setValue(R,`normalMatrix`,i.normalMatrix),E.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Je.update(n,x),Je.bind(n,x)}}return x}function vt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function G(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){F=e,N=t,P=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),te.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,z.viewport(te),z.scissor(ne),z.setScissorTest(re),I=-1;return}if(o.__webglFramebuffer===void 0)je.setupRenderTarget(e);else if(o.__hasExternalTextures)je.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);je.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&je.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,te.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else te.copy(fe).multiplyScalar(le).floor(),ne.copy(pe).multiplyScalar(le).floor(),re=me;if(n!==0&&(r=ee),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(te),z.scissor(ne),z.setScissorTest(re),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}I=-1};function K(e){let t=B.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=ke.textureFormatReadable(e.format),t.__typeReadable=ke.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){ba(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let u=K(o);if(u.__formatReadable===!1){ba(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){ba(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Ke.convert(c),Ke.convert(l),a)}finally{let e=F===null?null:B.get(F).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s);let d=K(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Ke.convert(l),Ke.convert(u),0),R.bindBuffer(R.PIXEL_PACK_BUFFER,null);let p=F===null?null:B.get(F).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,p);let m=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await A(R,m,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,f),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.bindBuffer(R.PIXEL_PACK_BUFFER,null),R.deleteBuffer(f),R.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;je.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Ke.convert(t.format),_=Ke.convert(t.type),v;t.isData3DTexture?(je.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(je.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(je.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,j),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,M);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&je.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?je.setTextureCube(e,0):e.isData3DTexture?je.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?je.setTexture2DArray(e,0):je.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){N=0,P=0,F=null,z.reset(),qe.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return $i}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ce._getDrawingBufferColorSpace(e),t.unpackColorSpace=ce._getUnpackColorSpace()}},bd=class e{constructor(t,n,r,i,a=`div`){this.parent=t,this.object=n,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add(`lil-controller`),this.domElement.classList.add(i),this.$name=document.createElement(`div`),this.$name.classList.add(`lil-name`),e.nextNameID=e.nextNameID||0,this.$name.id=`lil-gui-name-${++e.nextNameID}`,this.$widget=document.createElement(`div`),this.$widget.classList.add(`lil-widget`),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener(`keydown`,e=>e.stopPropagation()),this.domElement.addEventListener(`keyup`,e=>e.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle(`lil-disabled`,e),this.$disable.toggleAttribute(`disabled`,e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},xd=class extends bd{constructor(e,t,n){super(e,t,n,`lil-boolean`,`label`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`checkbox`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener(`change`,()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Sd(e){let t,n;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?`#`+n:!1}var Cd={isPrimitive:!0,match:e=>typeof e==`string`,fromHexString:Sd,toHexString:Sd},wd={isPrimitive:!0,match:e=>typeof e==`number`,fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>`#`+e.toString(16).padStart(6,0)},Td=[Cd,wd,{isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,n=1){let r=wd.fromHexString(e);t[0]=(r>>16&255)/255*n,t[1]=(r>>8&255)/255*n,t[2]=(r&255)/255*n},toHexString([e,t,n],r=1){r=255/r;let i=e*r<<16^t*r<<8^(n*r|0);return wd.toHexString(i)}},{isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,n=1){let r=wd.fromHexString(e);t.r=(r>>16&255)/255*n,t.g=(r>>8&255)/255*n,t.b=(r&255)/255*n},toHexString({r:e,g:t,b:n},r=1){r=255/r;let i=e*r<<16^t*r<<8^(n*r|0);return wd.toHexString(i)}}];function Ed(e){return Td.find(t=>t.match(e))}var Dd=class extends bd{constructor(e,t,n,r){super(e,t,n,`lil-color`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`color`),this.$input.setAttribute(`tabindex`,-1),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$text=document.createElement(`input`),this.$text.setAttribute(`type`,`text`),this.$text.setAttribute(`spellcheck`,`false`),this.$text.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ed(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener(`input`,()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$text.addEventListener(`input`,()=>{let e=Sd(this.$text.value);e&&this._setValueFromHexString(e)}),this.$text.addEventListener(`focus`,()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener(`blur`,()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Od=class extends bd{constructor(e,t,n){super(e,t,n,`lil-function`),this.$button=document.createElement(`button`),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener(`click`,e=>{e.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$disable=this.$button}},kd=class extends bd{constructor(e,t,n,r,i,a){super(e,t,n,`lil-number`),this._initInput(),this.min(r),this.max(i);let o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+`%`}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),window.matchMedia(`(pointer: coarse)`).matches&&(this.$input.setAttribute(`type`,`number`),this.$input.setAttribute(`step`,`any`)),this.$widget.appendChild(this.$input),this.$disable=this.$input;let e=()=>{let e=parseFloat(this.$input.value);isNaN(e)||(this._stepExplicit&&(e=this._snap(e)),this.setValue(this._clamp(e)))},t=e=>{let t=parseFloat(this.$input.value);isNaN(t)||(this._snapClampSetValue(t+e),this.$input.value=this.getValue())},n=e=>{e.key===`Enter`&&this.$input.blur(),e.code===`ArrowUp`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e))),e.code===`ArrowDown`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e)*-1))},r=e=>{this._inputFocused&&(e.preventDefault(),t(this._step*this._normalizeMouseWheel(e)))},i=!1,a,o,s,c,l,u=e=>{a=e.clientX,o=s=e.clientY,i=!0,c=this.getValue(),l=0,window.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f)},d=e=>{if(i){let t=e.clientX-a,n=e.clientY-o;Math.abs(n)>5?(e.preventDefault(),this.$input.blur(),i=!1,this._setDraggingStyle(!0,`vertical`)):Math.abs(t)>5&&f()}if(!i){let t=e.clientY-s;l-=t*this._step*this._arrowKeyMultiplier(e),c+l>this._max?l=this._max-c:c+l<this._min&&(l=this._min-c),this._snapClampSetValue(c+l)}s=e.clientY},f=()=>{this._setDraggingStyle(!1,`vertical`),this._callOnFinishChange(),window.removeEventListener(`mousemove`,d),window.removeEventListener(`mouseup`,f)};this.$input.addEventListener(`input`,e),this.$input.addEventListener(`keydown`,n),this.$input.addEventListener(`wheel`,r,{passive:!1}),this.$input.addEventListener(`mousedown`,u),this.$input.addEventListener(`focus`,()=>{this._inputFocused=!0}),this.$input.addEventListener(`blur`,()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement(`div`),this.$slider.classList.add(`lil-slider`),this.$fill=document.createElement(`div`),this.$fill.classList.add(`lil-fill`),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add(`lil-has-slider`);let e=(e,t,n,r,i)=>(e-t)/(n-t)*(i-r)+r,t=t=>{let n=this.$slider.getBoundingClientRect(),r=e(t,n.left,n.right,this._min,this._max);this._snapClampSetValue(r)},n=e=>{this._setDraggingStyle(!0),t(e.clientX),window.addEventListener(`mousemove`,r),window.addEventListener(`mouseup`,i)},r=e=>{t(e.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`mousemove`,r),window.removeEventListener(`mouseup`,i)},a=!1,o,s,c=e=>{e.preventDefault(),this._setDraggingStyle(!0),t(e.touches[0].clientX),a=!1},l=e=>{e.touches.length>1||(this._hasScrollBar?(o=e.touches[0].clientX,s=e.touches[0].clientY,a=!0):c(e),window.addEventListener(`touchmove`,u,{passive:!1}),window.addEventListener(`touchend`,d))},u=e=>{if(a){let t=e.touches[0].clientX-o,n=e.touches[0].clientY-s;Math.abs(t)>Math.abs(n)?c(e):(window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d))}else e.preventDefault(),t(e.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d)},f=this._callOnFinishChange.bind(this),p;this.$slider.addEventListener(`mousedown`,n),this.$slider.addEventListener(`touchstart`,l,{passive:!1}),this.$slider.addEventListener(`wheel`,e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY)&&this._hasScrollBar)return;e.preventDefault();let t=this._normalizeMouseWheel(e)*this._step;this._snapClampSetValue(this.getValue()+t),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(f,400)},{passive:!1})}_setDraggingStyle(e,t=`horizontal`){this.$slider&&this.$slider.classList.toggle(`lil-active`,e),document.body.classList.toggle(`lil-dragging`,e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},Ad=class extends bd{constructor(e,t,n,r){super(e,t,n,`lil-option`),this.$select=document.createElement(`select`),this.$select.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$select.addEventListener(`change`,()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener(`focus`,()=>{this.$display.classList.add(`lil-focus`)}),this.$select.addEventListener(`blur`,()=>{this.$display.classList.remove(`lil-focus`)}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(e=>{let t=document.createElement(`option`);t.textContent=e,this.$select.appendChild(t)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},jd=class extends bd{constructor(e,t,n){super(e,t,n,`lil-string`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`spellcheck`,`false`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$input.addEventListener(`input`,()=>{this.setValue(this.$input.value)}),this.$input.addEventListener(`keydown`,e=>{e.code===`Enter`&&this.$input.blur()}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Md=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function Nd(e){let t=document.createElement(`style`);t.innerHTML=e;let n=document.querySelector(`head link[rel=stylesheet], head style`);n?document.head.insertBefore(t,n):document.head.appendChild(t)}var Pd=!1,Fd=class e{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:i=`Controls`,closeFolders:a=!1,injectStyles:o=!0,touchStyles:s=!0}={}){this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement(`div`),this.domElement.classList.add(`lil-gui`),this.$title=document.createElement(`button`),this.$title.classList.add(`lil-title`),this.$title.setAttribute(`aria-expanded`,!0),this.$title.addEventListener(`click`,()=>this.openAnimated(this._closed)),this.$title.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$children=document.createElement(`div`),this.$children.classList.add(`lil-children`),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(i),this.parent?(this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement)):(this.domElement.classList.add(`lil-root`),s&&this.domElement.classList.add(`lil-allow-touch-styles`),!Pd&&o&&(Nd(Md),Pd=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add(`lil-auto-place`,`autoPlace`),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty(`--width`,r+`px`),this._closeFolders=a)}add(e,t,n,r,i){if(Object(n)===n)return new Ad(this,e,t,n);let a=e[t];switch(typeof a){case`number`:return new kd(this,e,t,n,r,i);case`boolean`:return new xd(this,e,t);case`string`:return new jd(this,e,t);case`function`:return new Od(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new Dd(this,e,t,n)}addFolder(t){let n=new e({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(e,t=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof Od||t._name in e.controllers&&t.load(e.controllers[t._name])}),t&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof Od)){if(e._name in t.controllers)throw Error(`Cannot save GUI with duplicate property "${e._name}"`);t.controllers[e._name]=e.save()}}),e&&this.folders.forEach(e=>{if(e._title in t.folders)throw Error(`Cannot save GUI with duplicate folder "${e._title}"`);t.folders[e._title]=e.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),this.domElement.classList.toggle(`lil-closed`,this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+`px`,this.domElement.classList.add(`lil-transition`);let n=e=>{e.target===this.$children&&(this.$children.style.height=``,this.domElement.classList.remove(`lil-transition`),this.$children.removeEventListener(`transitionend`,n))};this.$children.addEventListener(`transitionend`,n);let r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle(`lil-closed`,!e),requestAnimationFrame(()=>{this.$children.style.height=r+`px`})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}},Id=`#4cd18a`;function Ld(e){if(e<=4)return Id;let t=Math.min(Math.max((e-4)/3,0),1);return`hsl(${Math.round(50-46*t)}, 100%, ${Math.round(58-4*t)}%)`}function Rd(e){let t=Math.min(Math.max((e-1)/2,0),1);return`hsl(${Math.round(265-5*t)}, ${Math.round(80+10*t)}%, ${Math.round(80-26*t)}%)`}function zd(e,t,n){let r=Math.max(0,e);for(let e=1;e<n.length;e++){let i=n[e-1]*t,a=n[e]*t;if(r<=a)return e-1+(a>i?(r-i)/(a-i):1)}return n.length-1}function Bd(e,t,n){let r=Math.min(Math.max(e,0),n.length-1),i=Math.min(Math.floor(r),n.length-2);return(n[i]+(n[i+1]-n[i])*(r-i))*t}var Vd=36,Hd=9,Ud=.02,Wd=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Gd=e=>Wd(-.004,.02,e);function Kd(e,t){let n=-1/0;for(let r=0;r<e.length;r++){let[i,a]=e[r],[o,s]=e[(r+1)%e.length];(i-t)*(o-t)<=0&&i!==o&&(n=Math.max(n,a+(s-a)*(t-i)/(o-i)))}return n}var qd=`
attribute float aH; varying vec3 vN, vW; varying float vH;
void main() {
vH = aH; vec3 n = normalize(normal);
vec4 w = modelMatrix * vec4(position + n * aH, 1.0);
vW = w.xyz; vN = normalize(mat3(modelMatrix) * n);
gl_Position = projectionMatrix * viewMatrix * w;
}`,Jd=`
uniform vec3 uSunDir; uniform float uSunT; varying vec3 vN, vW; varying float vH;
void main() {
float a = smoothstep(0.0004, 0.005, vH); if (a < 0.01) discard;
vec3 N = normalize(vN), V = normalize(cameraPosition - vW); if (dot(N, V) < 0.0) N = -N;
vec3 Hh = normalize(uSunDir + V);
float spec = pow(max(dot(N, Hh), 0.0), 260.0) * 5.0 * uSunT;
float fres = 0.04 + 0.96 * pow(1.0 - max(dot(N, V), 0.0), 5.0);
vec3 sky = vec3(0.66, 0.78, 0.92), under = vec3(0.42, 0.55, 0.66);
vec3 col = mix(under, sky, min(1.0, fres * 1.5)) + vec3(spec);
gl_FragColor = vec4(col, clamp(a * (0.34 + 0.6 * fres) + spec * a, 0.0, 0.95));
}`,Yd=class{constructor(e,t){let n=e.spec.L,r=-n/2+.03;this.dz=(-.9-r)/35,this.H=new Float32Array(324),this.hw=new Float32Array(Vd);let i=[],a=[];for(let t=0;t<Vd;t++){let a=r+t*this.dz,o=e.ring((a+n/2)/n),s=0;for(let[e]of o)s=Math.max(s,e);let c=.92*s;this.hw[t]=c;for(let e=0;e<Hd;e++){let t=(-1+2*e/8)*c,n=Kd(o,t);i.push(t,Number.isFinite(n)?n+.002:.3,a)}}for(let e=0;e<35;e++)for(let t=0;t<8;t++){let n=e*Hd+t,r=n+1,i=n+Hd,o=i+1;a.push(n,i,r,r,i,o)}let s=new kr;s.setAttribute(`position`,new Be(i,3)),s.setIndex(a),s.computeVertexNormals(),this.attr=new o(new Float32Array(324),1),this.attr.setUsage(j),s.setAttribute(`aH`,this.attr);let c=new Ui({uniforms:{uSunDir:t.uSunDir,uSunT:t.uSunT},vertexShader:qd,fragmentShader:Jd,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});this.mesh=new En(s,c),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.mesh.visible=!1}total(){let e=0;for(let t=0;t<this.H.length;t++)e+=this.H[t];return e}update(e,t){let n=this.H,r=Gd(t.bury??-1),i=Math.max(t.u??0,0),a=r*(.04+.012*i)+(t.plunge??0)*.05;if(a>0)for(let t=0;t<10;t++)for(let r=1;r<8;r++){let i=Math.abs(-1+2*r/8),o=(1-t/10)*(1-.6*i);n[t*Hd+r]=Math.min(Ud,n[t*Hd+r]+a*o*e)}let o=Math.min(.9,(.5+.35*i)*e/this.dz);for(let e=35;e>0;e--)for(let t=0;t<Hd;t++)n[e*Hd+t]+=o*(n[(e-1)*Hd+t]-n[e*Hd+t]);for(let e=0;e<Hd;e++)n[e]*=1-o;for(let t=0;t<Vd;t++){let r=t*Hd,i=new Float32Array(Hd);for(let t=0;t<Hd;t++){let a=Math.abs(t-4)/4,o=1+5*a*a;i[t]=n[r+t]*Math.min(.9,o*e)}for(let e=0;e<Hd;e++){let t=i[e];if(n[r+e]-=t,e===4)n[r+e-1]+=t/2,n[r+e+1]+=t/2;else{let i=e+Math.sign(e-4);i>=0&&i<Hd&&(n[r+i]+=t)}}}let s=Math.exp(-e/3);for(let e=0;e<n.length;e++)n[e]=n[e]*s<1e-5?0:n[e]*s}upload(){this.attr.array.set(this.H),this.attr.needsUpdate=!0,this.mesh.visible=this.total()>2e-4}},Xd=19.62,Zd=96,Qd=14,$d=5,ef=3,tf=4320*$d,nf=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},rf=`attribute float aA; attribute vec2 aUv; attribute float aSeed; varying float vA; varying vec2 vUv; varying float vSeed; varying vec3 vWorld; varying vec3 vN;
void main() { vA = aA; vUv = aUv; vSeed = aSeed; vN = normal; vWorld = position; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,af=`uniform vec3 uSunDir; uniform float uSunT; varying float vA; varying vec2 vUv; varying float vSeed; varying vec3 vWorld; varying vec3 vN;
float h1(float n) { return fract(sin(n * 127.1 + vSeed * 311.7) * 43758.5453); }
float vn(float x) { float i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(h1(i), h1(i + 1.0), f); }
void main() {
float s = vn(vUv.x * 22.0) * 0.55 + vn(vUv.x * 61.0 + 7.0) * 0.45;
float streak = smoothstep(0.30, 0.78, s + 0.25 * vn(vUv.y * 9.0 + vUv.x * 5.0));
float edge = smoothstep(0.0, 0.16, vUv.x) * smoothstep(1.0, 0.84, vUv.x);
float open = 1.0 - smoothstep(0.55, 1.0, vUv.y) * (0.45 + 0.55 * vn(vUv.x * 30.0 + vUv.y * 4.0));
float lip = smoothstep(0.80, 0.95, vUv.y) * (1.0 - smoothstep(0.95, 1.0, vUv.y));
vec3 V = normalize(vWorld - cameraPosition), N = normalize(vN);
float ndv = abs(dot(N, V)), fres = pow(1.0 - ndv, 2.0), glow = pow(max(dot(V, uSunDir), 0.0), 3.0) * uSunT;
float thick = clamp(0.45 / max(ndv, 0.2), 0.75, 1.6);
vec3 shade = mix(vec3(0.70, 0.80, 0.90), vec3(0.97, 0.98, 1.0), 0.5 + 0.5 * abs(N.y)) * mix(0.55, 1.0, uSunT);
vec3 col = shade + vec3(1.0, 0.95, 0.85) * glow * 0.5 + vec3(0.25) * lip;
float a = vA * mix(0.3, 1.0, streak) * edge * open * thick * (0.75 + 0.35 * fres + 0.5 * glow + 0.6 * lip);
a *= smoothstep(0.6, 2.2, length(vWorld - cameraPosition));
gl_FragColor = vec4(min(col, vec3(1.0)), min(a, 0.95));
}`,of=class{constructor(e,t){this.sheets=Array.from({length:Zd},()=>({on:!1,wasOn:!0})),this.pos=new Float32Array(tf*3),this.nrm=new Float32Array(tf*3),this.alpha=new Float32Array(tf),this.uv=new Float32Array(tf*2),this.seed=new Float32Array(tf);let n=[];for(let e=0;e<288;e++)for(let t=0;t<Qd;t++)for(let r=0;r<4;r++){let i=(e*15+t)*$d+r,a=i+$d;n.push(i,i+1,a,i+1,a+1,a)}for(let e=0;e<288;e++)for(let t=0;t<=Qd;t++)for(let n=0;n<$d;n++){let r=(e*15+t)*$d+n;this.uv[2*r]=n/4,this.uv[2*r+1]=t/Qd}let r=new kr;r.setAttribute(`position`,new o(this.pos,3)),r.setAttribute(`normal`,new o(this.nrm,3)),this.alphaAttr=new o(this.alpha,1),this.seedAttr=new o(this.seed,1),r.setAttribute(`aA`,this.alphaAttr),r.setAttribute(`aUv`,new o(this.uv,2)),r.setAttribute(`aSeed`,this.seedAttr),r.setIndex(n),this.mat=new Ui({uniforms:{uSunDir:t.uSunDir,uSunT:t.uSunT},transparent:!0,depthWrite:!1,side:2,vertexShader:rf,fragmentShader:af}),this.mesh=new En(r,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=6,e.add(this.mesh),this.accV=0,this.accD=0,this.next=0,this.clock=0}_emit(e,t){let n=-1;for(let e=0;e<Zd;e++){let t=(this.next+e)%Zd;if(!this.sheets[t].on){n=t;break}}if(n<0){this.dropped=(this.dropped??0)+1;return}this.next=(n+1)%Zd;let r=this.sheets[n],i=e.v[0],a=e.v[2],o=Math.hypot(i,a)||1,s=Math.random;Object.assign(r,e,{axis:[-a/o,0,i/o],on:!0,wasOn:!0,age:0});for(let e=0;e<ef;e++){let t=s()*40;for(let r=0;r<=Qd;r++)for(let i=0;i<$d;i++)this.seed[((n*ef+e)*15+r)*$d+i]=t}this.seedAttr.needsUpdate=!0}update(e,t){if(!(e>0))return;this.clock+=e;let n=Math.random,r=t.amount??1,i=Math.max(t.encounter,.4),a=Math.max(t.u,.5),o=-t.fz,s=t.fx;if(r>0&&t.on&&!t.mesh){let c=Math.min(1,Math.max(0,t.bury)/.35),l=Math.min(1.5,.45+i/4),u=t.buryBottom??(t.bury??-1)+.28,d=Gd(u),f=nf(.02,.3,u);this.accV+=r*(t.spray+(.22*d+.18*f)*Math.min(1.6,a/3))*e*22;let p=Math.min(3,Math.floor(this.accV));for(this.accV-=p;p-->0;)for(let e of[-1,1]){let r=(1.3+1.4*n())*l,u=Math.min(6.8,(1.6+i*.95+2.2*c)*(.85+.3*n())),d=(.62+.12*n())*a,f=.9*n(),p=(t.hullHalfWidth?t.hullHalfWidth(f):.1)+.02;this._emit({p:[t.x-t.fx*f+o*e*p,t.y+.02,t.z-t.fz*f+s*e*p],v:[t.fx*d+o*r*e,u,t.fz*d+s*r*e],cup:[o*e*.5,-.6,s*e*.5],w0:.5+.3*n(),spread:2.4*l,curv:.25,len:.5,life:.65+.4*n()+.25*c,a0:.72},t)}this.accD+=r*t.plunge*e*(4+6*c);let m=Math.min(2,Math.floor(this.accD));for(this.accD-=m;m-->0;)for(let e of[-1,1]){let r=1.8+1.2*n()+.5*c,l=Math.min(7,3.2+1.6*t.plunge+1.2*n()+.4*i);this._emit({p:[t.x-t.fx*.15+o*e*.05,t.y+.05,t.z-t.fz*.15+s*e*.05],v:[t.fx*.45*a+o*r*e,l,t.fz*.45*a+s*r*e],cup:[o*e*.5,-.6,s*e*.5],w0:.35+.15*n(),spread:1.3+.9*c,curv:.25,len:.5,life:.7+.35*n(),a0:.74},t)}}this._sheets(e,t.waterY??-1e3)}blade(e,t){if(!(e>0)||!(t.amount>0)||!(t.level>0))return;let n=Math.random,r=Math.min(3,t.level),i=Math.round(r),a=Math.max(t.u,.5),o=-t.fz,s=t.fx,c=t.side,l=Math.min(1.6,a/3);this.accBS=(this.accBS??0)+t.amount*e*l*[0,4,7,6][i];let u=Math.min(2,Math.floor(this.accBS));for(this.accBS-=u;u-->0;){let e=(.6+.9*n())*(i>2?1.2:1),r=(i>2?1.4:2+.5*i)*(.8+.4*n())*Math.min(1.4,.6+l*.5);this._emit({p:[t.x,t.y+.01,t.z],v:[t.fx*.35*a+o*c*e,r,t.fz*.35*a+s*c*e],cup:[o*c*.5,-.6,s*c*.5],w0:.18+.08*i+.1*n(),spread:.9+.35*i,curv:.25,len:.45,life:.45+.3*n(),a0:.5+.08*i},t)}}_sheets(e,t){let n=this.clock;for(let r=0;r<Zd;r++){let i=this.sheets[r];if(i.on&&(i.age+=e,i.age>=i.life&&(i.on=!1)),!i.on){if(i.wasOn){let e=r*ef*15*$d;this.alpha.fill(0,e,e+225),i.wasOn=!1}continue}let a=1-i.age/i.life,[o,s,c]=i.cup;for(let e=0;e<=Qd;e++){let l=Math.max(0,i.age-i.len*(Qd-e)/Qd),u=i.p[0]+i.v[0]*l,d=i.p[1]+i.v[1]*l-.5*Xd*l*l,f=i.p[2]+i.v[2]*l,p=i.v[0],m=i.v[1]-Xd*l,h=i.v[2],g=Math.hypot(p,m,h)||1;p/=g,m/=g,h/=g;let _=m*i.axis[2]-h*i.axis[1],v=h*i.axis[0]-p*i.axis[2],y=p*i.axis[1]-m*i.axis[0],b=Math.hypot(_,v,y)||1;_/=b,v/=b,y/=b;let x=(i.w0+i.spread*l)*.5,S=d<t-.02?0:1,C=Math.min(1,Math.max(.2,(d-t)/.15)),w=Math.min(1,.3+.7*(1-e/Qd)+.2),T=.015+.05*l;for(let p=0;p<ef;p++){let m=((r*ef+p)*15+e)*$d,h=(p-1)*T;for(let e=0;e<$d;e++){let r=e/4*2-1,p=i.curv*x*r*r,g=.03*Math.sin(7*l+4*r+this.seed[m]+n*3)*Math.min(1,l*3)+h,b=(m+e)*3,T=d+s*p+v*g;T<t&&(T=t),this.pos[b]=u+i.axis[0]*r*x+o*p+_*g,this.pos[b+1]=T,this.pos[b+2]=f+i.axis[2]*r*x+c*p+y*g,this.nrm[b]=_,this.nrm[b+1]=v,this.nrm[b+2]=y,this.alpha[m+e]=i.a0*a*a*w*S*C*.4833333333333333}}}}this.alphaAttr.needsUpdate=!0,this.mesh.geometry.attributes.position.needsUpdate=!0,this.mesh.geometry.attributes.normal.needsUpdate=!0}},sf=1024,cf={w:100,h:128},lf=[0,128,512,128],uf=[512,128,512,128],df={none:0,block:1,swoosh:2,speed:3,deck:4,tips:5,chevrons:6,fade:7,checks:8},ff=[df.block,df.swoosh,df.speed,df.deck,df.tips,df.chevrons,df.fade,df.checks],pf=`varying vec3 vHN;
uniform vec4 uDecA;
uniform vec3 uDecNum;
uniform vec3 uDecC1, uDecC2;
uniform sampler2D uDecTex;
float decAtlas(vec4 r, vec2 uv) {
if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
return texture2D(uDecTex, vec2((r.x + uv.x * r.z) / ${sf}.0, 1.0 - (r.y + (1.0 - uv.y) * r.w) / 384.0)).a;
}
float decNumber(vec2 ab, float h) {
float L = uDecA.z, dw = h * 0.72, tot = dw * L, a = ab.x + tot * 0.5;
if (L < 0.5 || a < 0.0 || a >= tot || abs(ab.y) > h * 0.5) return 0.0;
float idx = floor(a / dw), d = uDecNum[int(3.0 - L + idx)];
return decAtlas(vec4(d * ${cf.w}.0, 0.0, ${cf.w}.0, ${cf.h}.0), vec2(fract(a / dw), ab.y / h + 0.5));
}
float decLogo(vec4 r, vec2 ab, float h) {
float w = h * r.z / r.w;
return decAtlas(r, vec2(ab.x / w + 0.5, ab.y / h + 0.5));
}
float decChecks(vec2 p) {
vec2 w = max(fwidth(p), vec2(1e-4));
vec2 i = 2.0 * (abs(fract((p - 0.5 * w) * 0.5) - 0.5) - abs(fract((p + 0.5 * w) * 0.5) - 0.5)) / w;
return 0.5 - 0.5 * i.x * i.y;
}
`,mf=e=>`vec4(${e.map(e=>e.toFixed(1)).join(`,`)})`,hf=`
  if (uDecA.y > 0.0) {
    vec3 hp = vHL, hn = normalize(vHN);
    float aa = max(length(fwidth(hp)), 1e-4), ax = abs(hp.x), z = hp.z, y = hp.y;
    float deckUp = smoothstep(0.25, 0.55, hn.y), side = 1.0 - smoothstep(0.55, 0.85, abs(hn.y)), above = smoothstep(0.06, 0.1, y);
    float paint = 0.0, key = 0.0;
    if (uDecA.x < 1.5) {                                          // 1: a colour block on the bow with a slanted back edge and a thin keyline behind it
      float e = z - (-1.55 + (0.36 - y) * 1.6);
      paint = (1.0 - smoothstep(-aa, aa, e)) * above;
      key = smoothstep(-aa, aa, e) * (1.0 - smoothstep(0.012 - aa, 0.012 + aa, e)) * above;
    } else if (uDecA.x < 2.5) {                                   // 2: a swoosh down each side of the deck that widens toward the cockpit and ends on a slant
      float s = smoothstep(-2.85, -1.0, z), lo = 0.045, hi = lo + 0.12 * s;
      float d = min(min(ax - lo, hi - ax), (-0.95 + (ax - lo) * -2.6) - z);
      paint = smoothstep(-aa, aa, d) * deckUp * smoothstep(-2.88, -2.7, z);
    } else if (uDecA.x < 3.5) {                                   // 3: two speed stripes along each side of the deck that narrow to a point at both ends
      float tp = smoothstep(-2.85, -2.2, z) * (1.0 - smoothstep(1.6, 2.8, z));
      float w1 = 0.014 * tp, w2 = 0.007 * tp;
      float d1 = w1 - abs(ax - 0.075), d2 = w2 - abs(ax - 0.125);
      paint = smoothstep(-aa, aa, max(d1, d2)) * deckUp;
    } else if (uDecA.x < 4.5) {                                   // 4: two-tone: the deck (and the cockpit, moulded with it) in the accent, the hull its own colour, a keyline at the join
      float j = hn.y - 0.45, nAA = max(fwidth(hn.y), 1e-3);
      paint = smoothstep(-nAA, nAA, j);
      key = smoothstep(-0.1 - nAA, -0.1 + nAA, j) * (1.0 - paint) * above;
    } else if (uDecA.x < 5.5) {                                   // 5: the bow and the stern capped in the accent, slanted edges, a keyline behind each
      float e = min(z - (-2.3 + (0.36 - y) * 1.2), (2.2 - (0.22 - y) * 1.2) - z);
      paint = (1.0 - smoothstep(-aa, aa, e)) * above;
      key = smoothstep(-aa, aa, e) * (1.0 - smoothstep(0.012 - aa, 0.012 + aa, e)) * above;
    } else if (uDecA.x < 6.5) {                                   // 6: three chevrons on the rear deck pointing at the bow (seen from behind, where the other boats are mostly seen from)
      float c = (z - 1.1 * ax - 0.7) / 0.3, cw = max(fwidth(c), 1e-4), s = fract(c);
      paint = smoothstep(-cw, cw, 0.17 - abs(s - 0.2)) * step(0.0, c) * step(c, 3.0) * deckUp;
    } else if (uDecA.x < 7.5) {                                   // 7: the accent on the bow, fading into the hull colour toward the cockpit
      float f = 1.0 - smoothstep(-2.55 + 0.6 * (0.36 - y), -1.0, z);
      paint = f * f * (3.0 - 2.0 * f) * above;
    } else {                                                      // 8: a chequered band across the rear deck behind the cockpit, a keyline at each end
      float a0 = 0.66, a1 = 0.96, inB = smoothstep(a0 - aa, a0 + aa, z) * (1.0 - smoothstep(a1 - aa, a1 + aa, z));
      paint = decChecks(vec2(hp.x, z - a0) / 0.05) * inB * deckUp;
      key = max(1.0 - smoothstep(0.005 - aa, 0.005 + aa, abs(z - a0 + 0.01)), 1.0 - smoothstep(0.005 - aa, 0.005 + aa, abs(z - a1 - 0.01))) * deckUp;
    }
    diffuseColor.rgb = mix(diffuseColor.rgb, uDecC1, paint * uDecA.y);
    diffuseColor.rgb = mix(diffuseColor.rgb, uDecC2, key * uDecA.y);
    float lum = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 ink = lum > 0.42 ? vec3(0.04, 0.06, 0.12) : vec3(0.96, 0.97, 1.0);
    float side1 = hp.x >= 0.0 ? 1.0 : -1.0;
    // the number: on the foredeck (read from behind) and on both sides of the bow quarter (read from the side)
    float nm = decNumber(vec2(hp.x, -(z + 1.6)), 0.09) * deckUp * step(abs(z + 1.6), 0.07);
    nm = max(nm, decNumber(vec2(-side1 * (z + 1.75), y - 0.22), 0.1) * side * above);
    // the logos, on the deck beside the cockpit: Ocean Flight to port, Ballard Elks to starboard, each read from its own side
    float lg = decLogo(${mf(lf)}, vec2(z + 1.2, hp.x + 0.085), 0.045) * step(hp.x, 0.0) * deckUp;
    lg = max(lg, decLogo(${mf(uf)}, vec2(-(z + 1.2), -(hp.x - 0.085)), 0.045) * step(0.0, hp.x) * deckUp);
    diffuseColor.rgb = mix(diffuseColor.rgb, ink, clamp(max(nm, lg), 0.0, 1.0) * uDecA.y * step(0.5, uDecA.x));
  }
`;function gf(){let e=document.createElement(`canvas`);e.width=sf,e.height=384;let t=e.getContext(`2d`);t.fillStyle=`#fff`,t.textAlign=`center`,t.textBaseline=`middle`,t.font=`800 112px "Arial Black", "Helvetica Neue", Arial, sans-serif`;for(let e=0;e<10;e++)t.fillText(String(e),e*cf.w+cf.w/2,cf.h/2+4);_f(t);let n=new Fe(e);return n.colorSpace=``,n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=_e,yf(t,n),n}function _f(e){let[t,n,r,i]=lf,[a,o,s,c]=uf;e.clearRect(t,n,r,i),e.clearRect(a,o,s,c),e.fillStyle=`#fff`,e.font=`italic 600 70px Georgia, "Times New Roman", serif`,e.fillText(`Ocean Flight`,t+r/2,n+i/2),e.font=`800 62px "Arial Black", Arial, sans-serif`,e.fillText(`BALLARD ELKS`,a+s/2,o+c/2)}var vf=new Set(``.split(`,`).filter(Boolean));function yf(e,t){for(let[n,r]of[[`ocean-flight.png`,lf],[`ballard-elks.png`,uf]].filter(([e])=>vf.has(e))){let i=new Image;i.onload=()=>{let[n,a,o,s]=r,c=Math.min(o/i.width,s/i.height),l=i.width*c,u=i.height*c;e.clearRect(n,a,o,s),e.globalCompositeOperation=`source-over`,e.drawImage(i,n+(o-l)/2,a+(s-u)/2,l,u),t.needsUpdate=!0},i.src=`./decals/${n}`}}var bf=[741288,13115439,1316893,15909376,692074,16738835,16054008],xf=e=>(.299*(e>>16&255)+.587*(e>>8&255)+.114*(e&255))/255,Sf=(e,t)=>Math.hypot((e>>16&255)-(t>>16&255),(e>>8&255)-(t>>8&255),(e&255)-(t&255));function Cf(e,t=0,n=null,r=null){r??=[df.swoosh,df.block,df.speed][(t%3+3)%3];let i=bf.map(t=>({c:t,d:Sf(t,e)})).filter(e=>e.d>120).sort((e,t)=>t.d-e.d),a=i.slice(0,Math.max(2,Math.min(4,i.length))),o=(a[(t*7%a.length+a.length)%a.length]??{c:1316893}).c,s=xf(o)>.5?1316893:16054008,c=n??[7,12,27,41,58,66,83,95,104][(t%9+9)%9];return{style:r,c1:o,c2:s,number:Math.max(0,Math.min(999,Math.round(c)))}}function wf(e){let t=Math.max(0,Math.min(999,Math.round(e))),n=t>=100?3:t>=10?2:1;return{digits:[Math.floor(t/100)%10,Math.floor(t/10)%10,t%10],len:n}}var Tf=pf+`varying vec3 vHL;
uniform vec3 uGSeed; uniform float uGel;
float ghash(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float gnoise(vec3 x) {
vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
return mix(mix(mix(ghash(i), ghash(i + vec3(1, 0, 0)), f.x), mix(ghash(i + vec3(0, 1, 0)), ghash(i + vec3(1, 1, 0)), f.x), f.y),
mix(mix(ghash(i + vec3(0, 0, 1)), ghash(i + vec3(1, 0, 1)), f.x), mix(ghash(i + vec3(0, 1, 1)), ghash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,Ef=hf+`
  float gRough = 0.0;
  if (uGel > 0.0) {
    float g1 = gnoise(vHL * vec3(5.0, 5.0, 2.2) + uGSeed * 11.0), g2 = gnoise(vHL * vec3(21.0, 21.0, 8.0) + uGSeed * 13.0), g3 = gnoise(vHL * vec3(75.0, 75.0, 40.0) + uGSeed * 17.0), g4 = gnoise(vHL * 230.0 + uGSeed * 19.0);
    float cloud = g1 * 0.5 + g2 * 0.35 + g3 * 0.15, peel = g4 - 0.5;
    vec3 sp = floor(vHL * 150.0); float spk = step(0.992, ghash(sp + uGSeed * 23.0));
    float lum = 1.0 + uGel * (0.11 * (cloud - 0.5) + 0.035 * peel - 0.12 * spk);
    diffuseColor.rgb = mix(diffuseColor.rgb * lum, vec3(1.0), uGel * 0.07 * smoothstep(0.55, 0.8, cloud));
    gRough = uGel * (0.55 * (cloud - 0.5) + 0.25 * peel);
  }
`,Df=null;function Of(e){Df=e}function kf(e,t=Math.random){let n={uGel:{value:0},uGSeed:{value:new J(t()*50,t()*50,t()*50)},uDecA:{value:new Er(0,0,0,0)},uDecNum:{value:new J},uDecC1:{value:new jt(741288)},uDecC2:{value:new jt(16054008)},uDecTex:{value:null}},i=e.onBeforeCompile,a=i!==r.prototype.onBeforeCompile,o=a?e.customProgramCacheKey.bind(e):null;return e.onBeforeCompile=(t,r)=>{a&&i.call(e,t,r),Object.assign(t.uniforms,n),t.vertexShader=`varying vec3 vHL;
varying vec3 vHN;
`+t.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vHL = position; vHN = normal;`),t.fragmentShader=Tf+t.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
`+Ef).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
  roughnessFactor = clamp(roughnessFactor * (1.0 + gRough), 0.05, 1.0);
`)},e.customProgramCacheKey=()=>`gelcoat2-decals${o?`|`+o():``}`,Df&&ss(e,Df),e.needsUpdate=!0,n}var Af=null,jf=()=>Af??=gf(),Mf=class{constructor(e,t=Math.random){this.u=kf(e.material,t)}setAmount(e){this.u.uGel.value=e}setLook(e){let t=this.u,n=wf(e.number);this.look=e,t.uDecA.value.set(e.style,t.uDecA.value.y,n.len,0),t.uDecNum.value.set(...n.digits),t.uDecC1.value.setHex(e.c1),t.uDecC2.value.setHex(e.c2)}setDecalAmount(e){let t=this.u,n=e>0&&this.look;t.uDecA.value.y=n?e:0,n&&!t.uDecTex.value&&typeof document<`u`&&(t.uDecTex.value=jf())}},Nf=.7,Pf=.45,Ff=5.5,If=.7,Lf=2.4,Rf=.15,zf=.04,Bf=1.1,Vf=.8,Hf=.25,Uf=.55,Wf=19.62,Gf=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Kf=.04;function qf(e,t,n){let r=e.spec.L,i=Math.min(1,Math.max(0,(t+r/2)/r)),a=e.base+e.keelRel(i),o=e.base+e.deckRel(i),s=Math.min(1,Math.max(0,(n-a)/Math.max(o-a,1e-6)));return e.halfWidth(i)*e.profile(s,e.bottomK(i),t)}function Jf(e,t,n){let r=.02,i=.2,a=(qf(e,t,n+r)-qf(e,t,n-r))/(2*r),o=(qf(e,t+i,n)-qf(e,t-i,n))/(2*i),s=-a,c=-o,l=Math.hypot(1,s,c);return[1/l,s/l,c/l]}function Yf(e){let{boat:t,z:n,side:r}=e,i=t.base+.1;for(let a=0;a<2;a++){let a=r*qf(t,n,i),o=e.toWorld([a,i,n]),s=e.water(o[0],o[2]);i=e.toLocalY([o[0],s.h,o[2]])}let a=Math.min(1,Math.max(0,(n+t.spec.L/2)/t.spec.L)),o=t.base+t.keelRel(a),s=t.base+t.deckRel(a),c=+(i>o+.003&&i<s),l=Math.min(Math.max(i,o+.003),s-.003),u=r*qf(t,n,l),d=Jf(t,n,l),f=e.rotate([r*d[0],d[1],d[2]]),p=e.toWorld([u,l,n]),m=e.water(p[0],p[2]),h=typeof e.hullV==`function`?e.hullV(n):e.hullV,g=[m.ve-h[0],m.vu-h[1],m.vs-h[2]],_=Math.hypot(h[0],h[2]),v=-(g[0]*f[0]+g[2]*f[2]),y=Math.hypot(g[0],g[2]),b=Gf(Hf,Uf,Math.abs(v)/Math.max(y,.3)),x=-g[1]*f[1]+b*v,S=typeof e.slope==`function`?e.slope(n):[0,0],C=Math.hypot(S[0],1,S[1]),w=Math.max(0,(-S[0]*g[0]+g[1]-S[1]*g[2])/C),T=Math.hypot(f[0],f[2]),E=Math.max(Math.abs(f[1]),.05)/Math.max(T,.001),D=f[1]<0?Math.min(4,Math.PI/2/E)*w*Gf(If,Lf,w):0,O=T>.001?f[0]/T:0,k=T>.001?f[2]/T:0,A=Math.max(0,-(g[0]*O+g[2]*k)),ee=_>.2?Math.min(1,Math.abs((h[0]*O+h[2]*k)/_)):1,j=Math.max(ee/Math.sqrt(Math.max(1-ee*ee,1e-4)),.05),M=c&&f[1]<.5?Rf*Math.max(0,Math.min(4,Math.PI/2/j)-1.5)*A*b:0,N=c?Math.max(0,x)+Kf*_*Math.abs(d[2])+(D+M)/1.5:0,P=T>.001?[f[0]/T,0,f[2]/T]:[0,0,0],F=Math.hypot(g[0],g[2]),I=Math.exp(-Math.max(0,n+t.spec.L/2)/Bf),L=c?zf*(e.bowGain??1)*F*F/19.62*I*Gf(7,11,F):0,te=Math.sqrt(2*Wf*L),ne=[m.ve+1.5*(N-(D+M)/1.5)*f[0]+(D+M)*P[0],m.vu+1.5*(N-D/1.5)*f[1],m.vs+1.5*(N-D/1.5)*f[2]+(D+M)*P[2]],re=ne[1]-m.vu,ie=Math.hypot(ne[0]-m.ve,ne[2]-m.vs);return re<0&&(ne[1]=m.vu-re*Nf),ne[1]+=Pf*ie+te,ne[0]+=Vf*te*P[0],ne[2]+=Vf*te*P[2],ne[1]=m.vu+Ff*Math.tanh((ne[1]-m.vu)/Ff),{y:l,x:u,n:f,impact:N,jet:ne,wet:c,head:L,world:p}}var Xf=24,Zf=32,Qf=6,$f=2,ep=448,tp=.6,np=3.5/31,rp=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},ip=`attribute vec3 aV; attribute vec4 aInfo; attribute vec4 aRest;
uniform float uTime, uG, uLife, uLink; varying vec3 vPos; varying vec2 vRest; varying float vTau, vAmp, vRow, vBirth, vStretch;
void main() {
vBirth = aInfo.x; float tau = uTime - aInfo.x; vTau = tau; vAmp = aInfo.y; vRest = aRest.xy; vRow = aInfo.z;
vStretch = (1.0 + aRest.z * tau) * (1.0 + aRest.w * tau);
vec3 p = position + aV * tau; p.y -= 0.5 * uG * tau * tau; vPos = p;
bool dead = tau < 0.0 || tau > uLife || aInfo.y <= 0.0 || abs(aInfo.x - aInfo.w) > uLink;
gl_Position = dead ? vec4(0.0, 0.0, 2.0, 1.0) : projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,ap=`uniform float uLife, uSunT, uDbg; uniform vec3 uSunDir; varying vec3 vPos; varying vec2 vRest; varying float vTau, vAmp, vRow, vBirth, vStretch;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y); }
void main() {
float ratio = vStretch;
vec2 q = vRest * vec2(8.0, 8.0) + vec2(0.0, vBirth * 37.0);
float n = 0.6 * vnoise(q) + 0.4 * vnoise(q * vec2(2.9, 2.5) + 11.0);
float thin = clamp(1.0 / max(ratio, 1.0), 0.0, 1.0);
float th = 0.22 + 0.5 * (1.0 - pow(thin, 0.5)) + 0.22 * smoothstep(0.3, 1.0, vRow);
float cover = smoothstep(th - 0.05, th + 0.05, n);
float rim = 1.0 - smoothstep(0.0, 0.14, n - th);
float life = clamp(vTau / uLife, 0.0, 1.0), fade = (1.0 - life) * smoothstep(0.0, 0.06, vTau);
vec3 col = mix(vec3(0.72, 0.82, 0.92), vec3(0.97, 0.98, 1.0), 0.6 + 0.4 * rim) * mix(0.55, 1.0, uSunT);
float near = smoothstep(0.3, 1.2, distance(vPos, cameraPosition));
float dens = mix(0.55, 0.9, smoothstep(th, th + 0.25, n));
gl_FragColor = vec4(col, clamp(vAmp * fade * near * cover * dens * pow(thin, 0.25) * (1.0 - smoothstep(10.0, 40.0, ratio)), 0.0, 0.9));
if (uDbg > 0.5) gl_FragColor = vec4(1.0, 0.1, 0.1, 0.8 * step(0.0, vAmp - 0.001));
}`;function op(e,t){for(let n=0;n<t;n++){let t=e.map(e=>({y:e.y,x:e.x,impact:e.impact,head:e.head,jet:e.jet.slice()}));for(let n=0;n<e.length;n++){let r=t[Math.max(0,n-1)],i=t[n],a=t[Math.min(e.length-1,n+1)],o=e[n];o.y=(r.y+2*i.y+a.y)/4,o.x=(r.x+2*i.x+a.x)/4,o.impact=(r.impact+2*i.impact+a.impact)/4,o.head=(r.head+2*i.head+a.head)/4;for(let e=0;e<3;e++)o.jet[e]=(r.jet[e]+2*i.jet[e]+a.jet[e])/4}}}var sp=.03,cp=.02,lp=class{constructor(e,t,{weight:n=2}={}){let r=Xf*ep;this.pos=new Float32Array(r*3),this.vel=new Float32Array(r*3),this.info=new Float32Array(r*4),this.rest=new Float32Array(r*4);for(let e=0;e<Xf;e++)for(let t=0;t<ep;t++)this.info[(e*ep+t)*4]=-1e9;let i=[];for(let e=0;e<Xf;e++)for(let t=0;t<$f;t++)for(let n=0;n<31;n++)for(let r=0;r<Qf;r++){let a=e*ep+(t*Zf+n)*7+r,o=a+7;i.push(a,a+1,o,a+1,o+1,o)}let a=new kr;a.setAttribute(`position`,new o(this.pos,3)),a.setAttribute(`aV`,new o(this.vel,3)),a.setAttribute(`aInfo`,new o(this.info,4)),a.setAttribute(`aRest`,new o(this.rest,4)),a.setIndex(i),this.uniforms={uTime:{value:0},uG:{value:9.81*n},uLife:{value:1},uLink:{value:.16},uDbg:{value:+!!new URLSearchParams(location.search).get(`filmdbg`)},uSunDir:t.uSunDir,uSunT:t.uSunT},this.mat=new Ui({uniforms:this.uniforms,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:2,vertexShader:ip,fragmentShader:ap});let s=2604;this.LKV=s,this.lpos=new Float32Array(Xf*s*3),this.lvel=new Float32Array(Xf*s*3),this.linfo=new Float32Array(Xf*s*4),this.lrest=new Float32Array(Xf*s*4);for(let e=0;e<Xf*s;e++)this.linfo[e*4]=-1e9;let c=new kr;c.setAttribute(`position`,new o(this.lpos,3)),c.setAttribute(`aV`,new o(this.lvel,3)),c.setAttribute(`aInfo`,new o(this.linfo,4)),c.setAttribute(`aRest`,new o(this.lrest,4)),this.links=new En(c,this.mat),this.links.frustumCulled=!1,this.links.renderOrder=4,this.links.visible=!1,e.add(this.links),this.mesh=new En(a,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.visible=!1,e.add(this.mesh),this.pending=[],this.gain=[1,1],this.next=0,this.last=-1e9,this.every=.05,this.prevSpawn=null,this.uniforms.uLink.value=this.every*3.2,this.attrs=[`position`,`aV`,`aInfo`,`aRest`]}takeLandings(e){let t=[],n=[];for(let r of this.pending)r.tl<=e?t.length<48&&t.push(r):r.tl<e+3&&n.push(r);return this.pending=n,t}setVisible(e){this.mesh.visible=e,this.links.visible=e}_link(e,t,n,r,i){let a=t*this.LKV,o=(e,t,n,o,s,c)=>{let l=e*ep+(o*Zf+s)*7+c,u=t*ep+(o*Zf+s)*7+c,d=this.pos,f=this.vel,p=this.info,m=this.rest,h=this.lpos,g=this.lvel,_=this.linfo,v=this.lrest,y=a*3,b=a*4,x=l*3,S=l*4;h[y]=d[x],h[y+1]=d[x+1],h[y+2]=d[x+2],g[y]=f[x],g[y+1]=f[x+1],g[y+2]=f[x+2],_[b]=p[S],_[b+1]=p[S+1]*+(p[u*4+1]>0),_[b+2]=p[S+2],_[b+3]=p[u*4],v[b]=s*np,v[b+1]=n*i*r,v[b+2]=m[S+2],v[b+3]=m[S+3],a++};for(let n=0;n<$f;n++)for(let r=0;r<31;r++)for(let i=0;i<=Qf;i++)o(e,t,0,n,r,i),o(e,t,0,n,r+1,i),o(t,e,1,n,r,i),o(e,t,0,n,r+1,i),o(t,e,1,n,r+1,i),o(t,e,1,n,r,i)}update(e,t){if(this.uniforms.uTime.value=e,e<this.last&&(this.last=e-this.every),e-this.last<this.every||!(t.amount>0))return;this.last=e+(Math.random()-.5)*this.every*.5;let n=this.next,r=this.prevSpawn&&e-this.prevSpawn.t<this.every*2.5?this.prevSpawn.i:-1,i=Math.hypot(t.hullV(0)[0],t.hullV(0)[2]);this.next=(this.next+1)%Xf;let a=t.boat.spec.L,o=e=>{let n=t.toWorld([0,0,e]),r=.6;return[(t.water(n[0]+r,n[2]).h-t.water(n[0]-r,n[2]).h)/(2*r),(t.water(n[0],n[2]+r).h-t.water(n[0],n[2]-r).h)/(2*r)]},s=-a/2+.3,c=-a/4,l=.3,u=o(s),d=o(c),f=o(l),p=e=>{let t=e<c?Math.max(0,(e-s)/(c-s)):1+Math.min(1,(e-c)/(l-c)),n=t<1?u:d,r=t<1?d:f,i=t<1?t:t-1;return[n[0]+(r[0]-n[0])*i,n[1]+(r[1]-n[1])*i]};for(let r=0;r<$f;r++){let o=r?-1:1,s=[],c=[];this.gain[r]=Math.min(1.8,Math.max(.45,this.gain[r]+.1*(1-this.gain[r])+(Math.random()-.5)*.25));for(let e=0;e<Zf;e++){let n=Math.min(tp,-a/2+.02+e*(tp+a/2-.02)/31);s.push(n),c.push(Yf({boat:t.boat,z:n,side:o,toWorld:t.toWorld,toLocalY:t.toLocalY,rotate:t.rotate,water:t.water,hullV:t.hullV,bowGain:this.gain[r],slope:p}))}op(c,3);for(let a=0;a<Zf;a++){let l=c[a],u=s[a],d=t.amount*Math.max(rp(.25,1.6,l.impact),.75*rp(.003,.05,l.head)),f=Math.min(.22,.03+1.5*l.head+.05*l.impact)/Qf;if(a%2==0){let n=c[Math.min(31,a+1)],r=t.toWorld([o*(Math.abs(l.x)+.012),l.y,u]),s=l.jet,d=this.uniforms.uG.value,f=.3;for(let e=0;e<3;e++){let e=t.water(r[0]+s[0]*f,r[2]+s[2]*f).h,n=Math.max(r[1]-e,0);f=Math.min(1.2,(s[1]+Math.sqrt(Math.max(s[1]*s[1]+2*d*n,0)))/d)}let p=Math.min(1,1.2*(l.impact+n.impact)/2+4*(l.head+n.head)/2),m=cp*Math.min(i,8)*+!!l.wet,h=t.amount*sp*(p+m);h>1e-4&&this.pending.push({tl:e+f,e:r[0]+s[0]*f,n:-(r[2]+s[2]*f),r:.4+.25*f+.1*Math.hypot(s[0],s[2])*f*.3,a:h})}let p=c[Math.max(0,a-1)].jet,m=c[Math.min(31,a+1)].jet,h=Math.hypot(m[0]-p[0],m[1]-p[1],m[2]-p[2])/(2*np),g=.5*Math.hypot(...l.jet)/(Qf*f);for(let i=0;i<=Qf;i++){let s=n*ep+(r*Zf+a)*7+i,c=l.y+i*f,p=Math.abs(l.x),m=t.toWorld([o*(p+.012),c,u]),_=.75+.5*i/Qf;this.pos.set(m,s*3),this.vel.set([l.jet[0]*_,l.jet[1]*_,l.jet[2]*_],s*3),this.info.set([e,d,i/Qf,e],s*4),this.rest.set([a*np,i*f,h,g],s*4)}}}if(r>=0)this._link(r,n,e,e-this.prevSpawn.t,i);else{let e=n*this.LKV;for(let t=0;t<this.LKV;t++)this.linfo[(e+t)*4+1]=0}this.prevSpawn={i:n,t:e};for(let e of this.attrs)this.mesh.geometry.attributes[e].needsUpdate=!0,this.links.geometry.attributes[e].needsUpdate=!0}},up=e=>{let t=e>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296},dp=-3;function fp(){let e=up(2210),t=[],n=(e,t,n,r=[0,0])=>({x:e,y:t,top:n,lean:r});{let e=-716,r=[n(985,e,2.3),n(985,-713.4,2.5),n(985,-710.8,2.2,[.05,0])];t.push({name:`elks-bent`,cx:985,cy:-713.4,piles:r,beams:[{a:[985,e],b:[985,-710.8],h:1.5}],braces:[{a:[985,e,-.2],b:[985,-713.4,1.5]}]})}{let r=[],i=[];for(let t=0;t<11;t++)r.push(n(988+(e()-.5)*.5,-700+t*3+(e()-.5)*.3,2+e()*.5));r[0].lean=[.1,-.08],r[10].lean=[.1,.08],i.push({a:[r[0].x,r[0].y,-.2],b:[r[1].x,r[1].y,1.2]},{a:[r[10].x,r[10].y,-.2],b:[r[9].x,r[9].y,1.2]}),t.push({name:`elks-row`,cx:988,cy:-685,piles:r,beams:[],braces:i})}{let r=-645,i=[];for(let t=0;t<14;t++)i.push(n(992+(e()-.5)*6,r+(t/13-.5)*10+(e()-.5)*1.5,1.6+e()*1.8,[(e()-.5)*.06,(e()-.5)*.06]));for(let t=0;t<5;t++)i.push(n(992+(e()-.5)*3,-638+t*2.6+e(),.9+e()*.8));let a=i.filter(e=>e.top>2.9).sort((e,t)=>e.y-t.y),o=[];for(let t=0;t+1<a.length&&o.length<3;t+=2)o.push({a:[a[t].x,a[t].y],b:[a[t+1].x,a[t+1].y],h:2.1+e()*.3});t.push({name:`elks-cluster`,cx:992,cy:r,piles:i,beams:o,braces:[]})}return t}function pp(e){let t=e?.origin;return t&&Math.abs(t.lat-47.6777)<1e-4&&Math.abs(t.lon+122.42)<1e-4?fp():[]}function mp(e,t){let n=new Oi;n.name=`pilings`;let r=e.flatMap(e=>e.piles),i=e.flatMap(e=>e.beams??[]),a=e.flatMap(e=>e.braces??[]);if(!r.length)return n;let o=new qr({color:16777215}),s=new ma,c=new jt,l=new Vn(.17,.21,1,7,1);l.translate(0,.5,0);let u=new Ri(l,o,r.length);r.forEach((e,t)=>{let n=e.top-dp,r=.22+.1*(t*37%7)/7;s.position.set(e.x,dp,-e.y),s.rotation.set(-e.lean[1],0,-e.lean[0]),s.scale.set(1+.15*(t*11%5)/5,n,1+.15*(t*13%5)/5),s.updateMatrix(),u.setMatrixAt(t,s.matrix),c.setRGB(r*1.15,r*.95,r*.8),u.setColorAt(t,c)}),u.instanceMatrix.needsUpdate=!0,u.instanceColor.needsUpdate=!0,u.computeBoundingSphere(),n.add(u);let d=[...i.map(e=>({a:[e.a[0],e.h,e.a[1]],b:[e.b[0],e.h,e.b[1]],w:.22})),...a.map(e=>({a:[e.a[0],e.a[2],e.a[1]],b:[e.b[0],e.b[2],e.b[1]],w:.16}))];if(d.length){let e=new $e(1,1,1),t=new Ri(e,o,d.length),r=new J,i=new qt,a=new J(1,0,0);d.forEach((e,n)=>{let o=new J(e.a[0],e.a[1],-e.a[2]),l=new J(e.b[0],e.b[1],-e.b[2]);r.subVectors(l,o),s.position.copy(o).add(l).multiplyScalar(.5),s.quaternion.copy(i.setFromUnitVectors(a,r.clone().normalize())),s.scale.set(r.length()+.3,e.w,e.w),s.updateMatrix(),t.setMatrixAt(n,s.matrix),t.setColorAt(n,c.setRGB(.3,.25,.2))}),t.instanceMatrix.needsUpdate=!0,t.instanceColor.needsUpdate=!0,t.computeBoundingSphere(),n.add(t)}return t.pilings=r.length,t.tris+=r.length*28+d.length*12,n}var hp=(e,t=0)=>{let n=Math.imul(e|0,2654435761)^Math.imul((t|0)+7919,2246822507);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,(n>>>0)/4294967296},gp=e=>{let t=e>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296},_p=e=>[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],vp=e=>{let t=0;for(let n=0;n<e.length;n++){let[r,i]=e[n],[a,o]=e[(n+1)%e.length];t+=r*o-a*i}return t/2},yp={1:[15327955,14273976,12174540,13483944,10135456,13087643,14735046,9411238,12423031,13814196],2:[14274752,13222584,12103328,14867661,11115144],3:[12567492,13684940,11120306,13221806],4:[10396324,12171700,9080723,11050900],5:[8022616,5798543,10177340,10522488],0:[14209220,12893358,14932939,12103843]},bp=[4935509,5918278,7035725,4146250,7357754,6119524],xp={lowM:20,bigM2:900,spanM:5};function Sp(e,t,n){let r=new Map,i=1e3,a=t.meta?.biome===`gorge`;for(let o of e){let e=[];for(let t=2;t+1<o.length;t+=2)e.push([o[t]/10,o[t+1]/10]);if(e.length<3)continue;if(a){let r=e.map(([e,n])=>t.elevationAt(e,n)),i=Math.min(...r),a=Math.max(...r)-i;if(i>xp.lowM&&Math.abs(vp(e))<xp.bigM2||a>xp.spanM){n.hidden=(n.hidden??0)+1;continue}}let s=e.reduce((e,t)=>e+t[0],0)/e.length,c=e.reduce((e,t)=>e+t[1],0)/e.length,l=`${Math.floor(s/i)},${Math.floor(c/i)}`,u=r.get(l);u||r.set(l,u={pos:[],nrm:[],col:[],idx:[],list:[]}),u.list.push({ring:e,h:o[0]/10,type:o[1],seed:Math.round(s*10)^Math.round(c*17)})}let s=[],c=new qr({vertexColors:!0});for(let e of r.values()){let{pos:r,nrm:i,col:a,idx:l}=e;for(let o of e.list){let e=o.ring;vp(e)<0&&(e=e.slice().reverse());let s=e.map(([e,n])=>t.elevationAt(e,n)),c=Math.max(Math.min(...s),.4)-.3,u=Math.max(Math.max(...s),.6)+o.h,d=yp[o.type]??yp[0],f=_p(d[Math.floor(hp(o.seed)*d.length)]),p=_p(bp[Math.floor(hp(o.seed,3)*bp.length)]),m=.92+.16*hp(o.seed,5);for(let t=0;t<e.length;t++){let[n,o]=e[t],[s,d]=e[(t+1)%e.length],p=s-n,h=d-o,g=Math.hypot(p,h);if(g<.05)continue;let _=h/g,v=p/g,y=r.length/3,b=.86+.14*Math.abs(_);r.push(n,c,-o,s,c,-d,s,u,-d,n,u,-o);for(let e=0;e<4;e++)i.push(_,0,v),a.push(f[0]*m*b,f[1]*m*b,f[2]*m*b);l.push(y,y+1,y+2,y,y+2,y+3)}let h=r.length/3;for(let[t,n]of e)r.push(t,u,-n),i.push(0,1,0),a.push(p[0],p[1],p[2]);let g=ui.triangulateShape(e.map(([e,t])=>new oi(e,t)),[]);for(let[t,n,r]of g)(e[n][0]-e[t][0])*(e[r][1]-e[t][1])-(e[n][1]-e[t][1])*(e[r][0]-e[t][0])>=0?l.push(h+t,h+n,h+r):l.push(h+t,h+r,h+n);n.buildings++,n.tris+=e.length*2+g.length}let u=new kr;u.setAttribute(`position`,new Be(r,3)),u.setAttribute(`normal`,new Be(i,3)),u.setAttribute(`color`,new o(new Uint8Array(a.map(e=>Math.min(255,Math.round(e*255)))),3,!0)),u.setIndex(l),u.computeBoundingSphere();let d=new En(u,c);d.name=`shore-buildings`,s.push(d)}return s}function Cp(e,t,n,r,i){let a=e.length,o=[],s=[];for(let n=0;n<a;n++){let r=e[Math.max(n-1,0)],i=e[Math.min(n+1,a-1)],c=i[0]-r[0],l=i[1]-r[1],u=Math.hypot(c,l)||1;c/=u,l/=u,o.push([e[n][0]-l*t,e[n][1]+c*t]),s.push([e[n][0]+l*t,e[n][1]-c*t])}let{pos:c,nrm:l,idx:u}=i,d=c.length/3;for(let e=0;e<a;e++){let t=n(e);c.push(o[e][0],t,-o[e][1],s[e][0],t,-s[e][1]),l.push(0,1,0,0,1,0)}for(let e=0;e<a-1;e++){let t=d+2*e;u.push(t,t+1,t+2,t+1,t+3,t+2)}for(let[e,t]of[[o,1],[s,-1]]){let i=c.length/3;for(let i=0;i<a;i++){let o=n(i),s=e[i][0],u=-e[i][1],d=i&&i-1,f=e[Math.min(i+1,a-1)][0]-e[d][0],p=-(e[Math.min(i+1,a-1)][1]-e[d][1]),m=Math.hypot(f,p)||1;c.push(s,o,u,s,o-r,u),l.push(t*p/m,0,-t*f/m,t*p/m,0,-t*f/m)}for(let e=0;e<a-1;e++){let n=i+2*e;t>0?u.push(n,n+1,n+2,n+2,n+1,n+3):u.push(n,n+2,n+1,n+2,n+3,n+1)}}}var wp=({pos:e,nrm:t,idx:n},r)=>{let i=new kr;i.setAttribute(`position`,new Be(e,3)),i.setAttribute(`normal`,new Be(t,3)),i.setIndex(n);let a=new Float32Array(e.length),[s,c,l]=_p(r);for(let t=0;t<e.length;t+=3)a[t]=s,a[t+1]=c,a[t+2]=l;return i.setAttribute(`color`,new o(a,3)),i.computeBoundingSphere(),i},Tp=e=>{let t=[];for(let n=0;n+1<e.length;n+=2)t.push([e[n]/10,e[n+1]/10]);return t};function Ep(e,t){let n={pos:[],nrm:[],idx:[]},r=.5;for(let i of e){let e=Tp(i.p);if(i.c&&e.length>=4){let t=e.slice(0,-1);vp(t)<0&&(t=t.reverse());let i=n.pos.length/3;for(let[e,i]of t)n.pos.push(e,r,-i),n.nrm.push(0,1,0);for(let[e,r,a]of ui.triangulateShape(t.map(([e,t])=>new oi(e,t)),[])){let o=(t[r][0]-t[e][0])*(t[a][1]-t[e][1])-(t[r][1]-t[e][1])*(t[a][0]-t[e][0]);n.idx.push(...o>=0?[i+e,i+r,i+a]:[i+e,i+a,i+r])}for(let e=0;e<t.length;e++){let[i,a]=t[e],[o,s]=t[(e+1)%t.length],c=o-i,l=s-a,u=Math.hypot(c,l)||1,d=n.pos.length/3;n.pos.push(i,r,-a,o,r,-s,o,.15000000000000002,-s,i,.15000000000000002,-a);for(let e=0;e<4;e++)n.nrm.push(l/u,0,c/u);n.idx.push(d,d+1,d+2,d,d+2,d+3)}}else e.length>=2&&Cp(e,i.w?i.w/20:.9,()=>r,.35,n);t.piers++}return n.pos.length?new En(wp(n,9207146),new qr({vertexColors:!0,side:2})):null}function Dp(){let e=new H(1,0),t=e.index?e.toNonIndexed():e,n=t.attributes.position,r=new Map;for(let e=0;e<n.count;e++){let t=`${n.getX(e).toFixed(3)},${n.getY(e).toFixed(3)},${n.getZ(e).toFixed(3)}`,i=r.get(t);i||r.set(t,i=.7+.5*hp(r.size,31)),n.setXYZ(e,n.getX(e)*i,n.getY(e)*i,n.getZ(e)*i)}let i=new Float32Array(n.count*2);for(let e=0;e<n.count;e++)i[e*2]=n.getX(e)*.5+n.getZ(e)*.31,i[e*2+1]=n.getY(e)*.5+n.getZ(e)*.19;return t.setAttribute(`uv`,new o(i,2)),t.computeVertexNormals(),t}function Op(e){let t=pp(e),n=e=>{let n=e.p,r=n.length/2,i=0,a=0;for(let e=0;e<n.length;e+=2)i+=n[e]/r/10,a+=n[e+1]/r/10;return t.some(e=>Math.hypot(e.cx-i,e.cy-a)<60)};return(e?.breakwaters??[]).filter(e=>!n(e))}function kp(e){let t=[];for(let n of Op(e)){let e=Tp(n.p);for(let n=1;n<e.length;n++)t.push([e[n-1][0],e[n-1][1],e[n][0],e[n][1]])}return Bs(t)}function Ap(e,t){let n={pos:[],nrm:[],idx:[],col:[]},r=gp(77),i=[],a=[[-Hs.footHalf,Hs.footY],[-Hs.crestHalf,Hs.crestY],[Hs.crestHalf,Hs.crestY],[Hs.footHalf,Hs.footY]];for(let o of e){let e=Tp(o.p);if(e.length<2)continue;let s=[e[0]];for(let t=1;t<e.length;t++){let[n,r]=e[t-1],[i,a]=e[t],o=Math.hypot(i-n,a-r),c=Math.max(1,Math.round(o/3));for(let e=1;e<=c;e++)s.push([n+(i-n)*e/c,r+(a-r)*e/c])}let c=n.pos.length/3,l=a.length;for(let e=0;e<s.length;e++){let t=s[Math.max(e-1,0)],o=s[Math.min(e+1,s.length-1)],u=o[0]-t[0],d=o[1]-t[1],f=Math.hypot(u,d)||1;u/=f,d/=f;for(let[t,r]of a){let i=hp(Math.round(s[e][0]*3)+t*7,Math.round(s[e][1]*3));n.pos.push(s[e][0]-d*t+(i-.5)*.5,r+(hp(e,t*3)-.5)*.6,-(s[e][1]+u*t)+(hp(e,t)-.5)*.5),n.nrm.push(0,1,0);let a=.8+.3*i;n.col.push(.3*a,.3*a,.29*a)}if(e)for(let t=0;t<l-1;t++){let r=c+(e-1)*l+t,i=c+e*l+t;n.idx.push(r,i,r+1,r+1,i,i+1)}for(let t=0;t<9;t++){let t=(r()-.5)*13,n=Math.abs(t)<1.2?2.6:2.6-(Math.abs(t)-1.2)/6.8*5.1;i.push([s[e][0]-d*t,n+.1+r()*.4,s[e][1]+u*t,.55+r()*.6,r()])}}t.breakwaters++}let o=new Oi;if(n.pos.length){let e=new kr;e.setAttribute(`position`,new Be(n.pos,3)),e.setAttribute(`normal`,new Be(n.nrm,3)),e.setAttribute(`color`,new Be(n.col,3)),e.setIndex(n.idx),e.computeVertexNormals(),e.computeBoundingSphere(),o.add(new En(e,new qr({vertexColors:!0,side:2})))}if(i.length){let e=new Ri(Dp(),new qr({color:9078658}),i.length),n=new ma,r=new jt;i.forEach(([t,i,a,o,s],c)=>{n.position.set(t,i,-a),n.scale.set(o*1.3,o*.9,o*1.1),n.rotation.set(s*6,s*11,s*3),n.updateMatrix(),e.setMatrixAt(c,n.matrix);let l=.55+.45*hp(c,9);r.setRGB(l,l,l*.97),e.setColorAt(c,r)}),e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0,e.computeBoundingSphere(),o.add(e),t.tris+=i.length*20}return o}function jp(e,t,n){let r={pos:[],nrm:[],idx:[]},i={pos:[],nrm:[],idx:[]},a={pos:[],nrm:[],idx:[]},o=[];for(let s of e){let e=Tp(s.p);if(e.length<2)continue;let c=[e[0]];for(let t=1;t<e.length;t++){let[n,r]=e[t-1],[i,a]=e[t],o=Math.hypot(i-n,a-r),s=Math.max(1,Math.round(o/8));for(let e=1;e<=s;e++)c.push([n+(i-n)*e/s,r+(a-r)*e/s])}let l=c.map(([e,n])=>t.elevationAt(e,n)),u=Math.max(l[0],.5),d=Math.max(l.at(-1),.5),f=s.k===`foot`?2.5:s.k===`rail`?3.5:5,p=c.length-1,m=e=>{let t=p?e/p:0,n=u+(d-u)*t;return Math.max(n,l[e]+.4,l[e]<0?f:0)+(l[e]<0?0:.2)},h=s.k===`rail`?i:s.k===`foot`?a:r,g=s.k===`foot`?.3:s.k===`rail`?.9:1.1;Cp(c,s.w/20,m,g,h);for(let e=0;e<=p;e+=4)m(e)-Math.max(l[e],-8)>4&&s.k!==`foot`&&o.push([c[e][0],c[e][1],Math.max(l[e],-8),m(e)-g,s.k===`rail`?.7:1]);n.bridges++}let s=new Oi;for(let[e,t]of[[r,11184290],[i,7170662],[a,9075302]])e.pos.length&&s.add(new En(wp(e,t),new qr({vertexColors:!0,side:2})));if(o.length){let e=new Vn(1,1.2,1,10),t=new Ri(e,new qr({color:10328724}),o.length),n=new ma;o.forEach(([e,r,i,a,o],s)=>{n.position.set(e,(i+a)/2,-r),n.scale.set(o,a-i,o),n.rotation.set(0,0,0),n.updateMatrix(),t.setMatrixAt(s,n.matrix)}),t.instanceMatrix.needsUpdate=!0,t.computeBoundingSphere(),s.add(t)}return s}function Mp(e,t,n,r=10){let i=[],a=[],o=[[0,-n],[.7,-n*.55],[1,t*.2],[.98,t],[.45,t*1.02],[0,t*1.05]];for(let a=0;a<=r;a++){let s=a/r,c=-.5+s,l=e/2*Math.sin(Math.PI*Math.min(Math.max(s,.02),.995)**.75)**.65*(s>.93?1-(s-.93)*5:1),u=n*(.4+.6*Math.sin(Math.PI*s)),d=s*s*t*.9;for(let e of[1,-1])for(let[t,n]of o)i.push(c,n<0?-u:n+d*(n>0?1:.2),e*t*Math.max(l,.002))}let s=o.length*2;for(let e=0;e<r;e++)for(let t=0;t<s-1;t++){if(t===o.length-1)continue;let n=e*s+t,r=n+s;a.push(n,r,n+1,n+1,r,r+1,n,n+1,r,n+1,r+1,r)}let c=new kr;c.setAttribute(`position`,new Be(i,3)),c.setIndex(a);let l=c.toNonIndexed();return l.computeVertexNormals(),l.deleteAttribute(`uv`),l}var Np=(e,t,n,r,i,a,o=0)=>{let s=new $e(e,t,n);o&&s.rotateZ(o),s.translate(r,i,a);let c=s.toNonIndexed();return c.deleteAttribute(`uv`),c};function Pp(e=10){return{hull:Mp(.3,.055,.07,e),top:Ls([Np(.3,.05,.16,0,.08,0),Np(.012,.9,.012,.08,.5,0),Np(.4,.01,.012,-.12,.13,0),(()=>{let e=new kr;return e.setAttribute(`position`,new Be([.075,.14,0,.075,.92,0,-.32,.15,0,-.32,.15,0,.075,.92,0,.075,.14,0],3)),e.computeVertexNormals(),e})()])}}function Fp(e=10){return{hull:Mp(.33,.07,.06,e),top:Ls([Np(.42,.09,.2,-.04,.12,0),Np(.2,.07,.17,-.08,.2,0),Np(.012,.18,.012,-.08,.3,0)])}}var Ip=[[16053488,9],[15260864,1],[1845834,1.2],[9182493,.8],[1919542,.8],[2236962,.8],[10335176,.7]];function Lp(e,t,n){let r=e.marinas??[];if(!r.length)return null;let i=(e,t)=>r.some(n=>e>n.e0-30&&e<n.e1+30&&t>n.n0-30&&t<n.n1+30),a=[],o=gp(2024),s=[],c=(e,t,n)=>{for(let r=0;r+1<e.length;r++){let[i,o]=e[r],[c,l]=e[r+1],u=Math.hypot(c-i,l-o);s.push([i,o,c,l]),u>=6&&a.push({x0:i,y0:o,x1:c,y1:l,l:u,hw:t,both:n})}};for(let t of e.piers??[]){let e=Tp(t.p);e.length&&i(e[0][0],e[0][1])&&(t.c?(e=e.slice(0,-1),vp(e)<0&&e.reverse(),e.push(e[0]),c(e,0,!1)):c(e,t.w?t.w/20:.9,!0))}let l=(e,t,n)=>{let r=1e9;for(let i of s){if(i===n)continue;let a=i[2]-i[0],o=i[3]-i[1],s=a*a+o*o||1,c=Math.max(0,Math.min(1,((e-i[0])*a+(t-i[1])*o)/s)),l=Math.hypot(e-(i[0]+c*a),t-(i[1]+c*o));l<r&&(r=l)}return r},u=new Map,d=(e,t)=>`${Math.floor(e/4)},${Math.floor(t/4)}`,f=[],p={empty:0,water:0,overlap:0,dock:0};n.berthSegments=a.length;let m=(e,t,n,r)=>{let i=Math.floor((e-n)/4),a=Math.floor((e+n)/4),o=Math.floor((t-n)/4),s=Math.floor((t+n)/4);for(let e=i;e<=a;e++)for(let t=o;t<=s;t++)for(let n of u.get(`${e},${t}`)??[])if(r(n))return!0;return!1},h=0;for(let e of a){h++;let n=(e.x1-e.x0)/e.l,r=(e.y1-e.y0)/e.l;for(let i of e.both?[1,-1]:[1]){let a=r*i,s=-n*i,c=h*2+ +(i>0),g=.5+o()*2;for(;g<e.l-2;){let i=o(),h=i<.25?7+o()*2:i<.55?9+o()*2:i<.8?11+o()*3:i<.95?14+o()*6:20+o()*10,_=h*.3*(.9+.2*o()),v=_+1.1;if(g+v/2>e.l)break;let y=g+v/2,b=e.x0+n*y+a*(e.hw+.3+h/2),x=e.y0+r*y+s*(e.hw+.3+h/2);if(g+=v,o()>.85){p.empty++;continue}if(t.elevationAt(b,x)>-.6||t.elevationAt(b+a*h*.45,x+s*h*.45)>-.3){p.water++;continue}let S=!0;for(let e of[0,.25,.48])if(l(b+a*h*e,x+s*h*e,null)<1.2){S=!1;break}if(!S){p.dock++;continue}let C=[-.4,-.2,0,.2,.4].map(e=>[b+a*h*e,x+s*h*e]);if(C.some(([e,t])=>m(e,t,3+_,n=>n.seg!==c&&Math.hypot(n.x-e,n.y-t)<(_+n.beam)/2+.7)))p.overlap++;else{for(let[e,t]of C){let n=d(e,t);(u.get(n)??u.set(n,[]).get(n)).push({x:e,y:t,seg:c,beam:_})}if(f.push({x:b,y:x,len:h,beam:_/h,ang:Math.atan2(s,a),sail:o()<.55||h>13&&o()<.4,k:f.length}),f.length>=3500)break}}}}if(n.rejected=p,!f.length)return null;let g=new Oi;g.name=`shore-boats`;let _=e=>{let t=0;for(let[,e]of Ip)t+=e;let n=hp(e,4)*t;for(let[e,t]of Ip)if(n-=t,n<=0)return e;return Ip[0][0]},v=[],y=new Map;for(let e of f){let t=`${+!!e.sail}:${Math.floor(e.x/Rp)},${Math.floor(e.y/Rp)}`;(y.get(t)??y.set(t,[]).get(t)).push(e)}let b={true:{near:Pp(),far:Pp(3)},false:{near:Fp(),far:Fp(3)}},x=new qr({color:16777215}),S={true:new qr({color:15986918,emissive:5592405,side:2}),false:new qr({color:15330542,emissive:5592405,side:2})};for(let e of y.values()){let t=e[0].sail,r=b[t],i=new Ri(r.near.hull,x,e.length),a=new Ri(r.near.top,S[t],e.length),o=new ma,s=new jt;e.forEach((e,n)=>{o.position.set(e.x,0,-e.y),o.rotation.set(0,e.ang,0),o.scale.set(e.len,e.len,e.len*(e.beam/(t?.3:.33))),o.updateMatrix(),i.setMatrixAt(n,o.matrix),a.setMatrixAt(n,o.matrix),s.setHex(_(e.k)),i.setColorAt(n,s)});for(let e of[i,a])e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),g.add(e);i.instanceColor.needsUpdate=!0,n.tris+=e.length*((r.near.hull.attributes.position.count+r.near.top.attributes.position.count)/3);let c=e.reduce((e,t)=>e+t.x,0)/e.length,l=e.reduce((e,t)=>e+t.y,0)/e.length;v.push({hm:i,tm:a,P:r,cx:c,cy:l,r:i.boundingSphere.radius,far:!1})}return g.userData.lods=v,n.boats=f.length,n.boatTiles=v.length,g}var Rp=300,zp=350;function Bp(e,t,n){for(let r of e?.userData.lods??[]){let e=Math.hypot(r.cx-t,r.cy-n)-r.r,i=r.far?e>zp*.9:e>zp*1.1;if(i===r.far)continue;r.far=i;let a=i?r.P.far:r.P.near;r.hm.geometry=a.hull,r.tm.geometry=a.top}}function Vp(e,t,{boats:n=!0,cullM:r=0}={}){let i={buildings:0,piers:0,breakwaters:0,bridges:0,boats:0,tris:0},a=new Oi;a.name=`shore`;for(let n of Sp(e.buildings??[],t,i))a.add(n);let o=Ep(e.piers??[],i);o&&a.add(o),a.add(Ap(Op(e),i));let s=pp(e);s.length&&a.add(mp(s,i)),a.add(jp(e.bridges??[],t,i));let c=n?Lp(e,t,i):null;c&&a.add(c);let l=a.children.filter(e=>e.name===`shore-buildings`),u=(e,t)=>{for(let n of l){let i=n.geometry.boundingSphere;n.visible=Math.hypot(i.center.x-e,-i.center.z-t)-i.radius<r}for(let n of c?.userData.lods??[]){let i=Math.hypot(n.cx-e,n.cy-t)-n.r<r;n.hm.visible=i,n.tm.visible=i}};return{group:a,stats:i,update(e,t){Bp(c,e,t),r>0&&u(e,t)},dispose(){for(let e of c?.userData.lods??[])for(let t of[`near`,`far`])e.P[t].hull.dispose(),e.P[t].top.dispose();a.traverse(e=>{e.geometry?.dispose();let t=e.material;t&&(Array.isArray(t)?t:[t]).forEach(e=>e.dispose())})}}}var Hp=1/120;function Up(e,t,n=0){return{t,phase:n,e:e.e,n:e.n,psi:e.psi,u:e.u,z:e.z,pitch:e.pitch,roll:e.roll,power:e.power,wPrime:e.wPrime,hr:e.hr??null,onRun:e.onRun,splash:e.splash??0,spray:e.spray??0,encounter:e.encounter??0,plunge:e.plunge??0,bury:e.buryTip??-1}}function Wp(e,t,n){let r=Math.max(0,Math.min(e.length-1.0001,n/t)),i=Math.floor(r),a=e[i],o=e[i+1]??a,s=o.jump?+(r-i>=.999):r-i,c=e=>a[e]+(o[e]-a[e])*s,l={t:n,e:c(`e`),n:c(`n`),psi:c(`psi`),u:c(`u`),z:c(`z`),pitch:c(`pitch`),roll:c(`roll`),power:c(`power`),wPrime:c(`wPrime`),hr:a.hr!=null&&o.hr!=null?c(`hr`):a.hr??null,onRun:a.onRun,braceLevel:a.braceLevel??0,phase:c(`phase`),splash:c(`splash`),spray:c(`spray`),encounter:c(`encounter`),plunge:c(`plunge`),bury:c(`bury`)};return a.mix&&(l.mix=a.mix.map((e,t)=>a.mix[t]+(((o.mix??a.mix)[t]??a.mix[t])-a.mix[t])*s)),l.forward=[Math.sin(l.psi),Math.cos(l.psi)],l.headingDeg=(l.psi*180/Math.PI%360+360)%360,l}function Gp(e,t,n,r=14,i=.25){let[a,o]=t.forward,s={},c={},l={deg:-90,at:0},u=e.sample(t.e,t.n,n,s).h;c[0]=u;for(let d=i;d<=r+1e-9;d+=i){let r=e.sample(t.e+a*d,t.n+o*d,n,s).h,f=Math.atan2(r-u,i)*180/Math.PI;f>l.deg&&(l={deg:f,at:d-i/2}),u=r;for(let e of[2,5,10])Math.abs(d-e)<i/2&&(c[e]=r)}return{heights:c,steepest:l}}var Kp=5.7826,qp=[{u:0,keel:.2228,deck:.3102,half:0,prof:[0,.8002,.8002,.8002,.8002,1,1,1,.9751,.9751,.9751,.8368,.6348]},{u:.00346,keel:.1623,deck:.3359,half:.0152,prof:[0,.5256,.9537,.9537,.9975,.9975,1,1,.9806,.9806,.9493,.8705,.7678]},{u:.00692,keel:.1219,deck:.3488,half:.0183,prof:[0,.8865,.9524,.9524,1,.9993,.9993,.9894,.9748,.9748,.9572,.8553,.6253]},{u:.01038,keel:.0988,deck:.3535,half:.0206,prof:[0,1,1,.9977,.9967,.9967,.9938,.9878,.9835,.9802,.97,.8939,.7285]},{u:.01384,keel:.0838,deck:.3549,half:.023,prof:[0,1,1,.9906,.9906,.9864,.9837,.9803,.9803,.976,.9701,.9277,.7831]},{u:.01729,keel:.0735,deck:.3551,half:.0253,prof:[0,.8809,1,.9918,.9918,.9878,.9849,.9828,.9828,.9803,.977,.9578,.8271]},{u:.02075,keel:.0656,deck:.355,half:.0276,prof:[0,.8797,1,.9934,.9934,.9898,.9878,.9878,.986,.9843,.9826,.9788,.8556]},{u:.02083,keel:.0655,deck:.355,half:.0276,prof:[0,.8797,1,.9935,.9935,.9899,.9878,.9878,.9861,.9844,.9827,.9791,.856]},{u:.02421,keel:.0597,deck:.355,half:.0298,prof:[0,.9598,1,.995,.995,.9919,.9902,.9902,.9887,.9874,.9866,.9902,.8703]},{u:.02767,keel:.0557,deck:.3547,half:.0322,prof:[0,.8791,1,.9934,.9934,.99,.9886,.9886,.9873,.9864,.9875,.9946,.8834]},{u:.03113,keel:.0522,deck:.3543,half:.0346,prof:[0,.8805,1,.9918,.9918,.988,.9868,.9868,.9858,.985,.987,.9959,.8978]},{u:.03459,keel:.0499,deck:.351,half:.037,prof:[0,.8823,1,.99,.99,.9858,.9848,.9848,.984,.9833,.9855,.9943,.9281]},{u:.03805,keel:.048,deck:.3438,half:.0393,prof:[0,.8833,1,1,.9894,.9853,.9853,.9845,.9838,.9835,.9853,.9928,.9562]},{u:.0415,keel:.0467,deck:.3392,half:.0416,prof:[0,.883,1,1,.9901,.9863,.9863,.9857,.9852,.9848,.9844,.9912,.9549]},{u:.04167,keel:.0467,deck:.3389,half:.0417,prof:[0,.883,1,1,.9901,.9864,.9864,.9858,.9853,.9849,.9846,.9912,.9549]},{u:.04496,keel:.0456,deck:.337,half:.0439,prof:[0,.882,1,1,.9915,.9883,.9883,.9878,.9874,.9871,.9869,.9909,.9546]},{u:.04842,keel:.0443,deck:.3359,half:.0461,prof:[0,.8807,1,1,.9931,.9905,.9905,.9902,.9899,.9896,.9895,.9909,.9547]},{u:.05188,keel:.043,deck:.3367,half:.0483,prof:[0,.8793,1,1,.9948,.9929,.9929,.9926,.9924,.9922,.9921,.9919,.9555]},{u:.05534,keel:.0417,deck:.3387,half:.0505,prof:[0,.878,1,.9964,.9964,.9951,.995,.995,.9948,.9947,.9946,.994,.9568]},{u:.0588,keel:.0402,deck:.3443,half:.0526,prof:[0,.8765,1,.9982,.9982,.9977,.9974,.9974,.9974,.9973,.9973,.9948,.9592]},{u:.06226,keel:.0391,deck:.3515,half:.0548,prof:[0,.8643,.9929,.9982,.9982,1,1,.9999,.9999,.9999,.9991,.997,.9339]},{u:.0625,keel:.039,deck:.3516,half:.055,prof:[0,.8633,.9922,.998,.998,1,1,.9999,.9999,.9999,.9991,.997,.932]},{u:.06571,keel:.038,deck:.3522,half:.0571,prof:[0,.8507,.9838,.996,.996,1,1,1,.9999,.9999,.9993,.9972,.9078]},{u:.06917,keel:.037,deck:.3524,half:.0594,prof:[0,.835,.9733,.9933,.9933,1,1,1,1,1,.9994,.9976,.9117]},{u:.07263,keel:.0361,deck:.3521,half:.0617,prof:[0,.8195,.963,.9907,.9907,1,1,1,1,1,.9994,.9979,.9228]},{u:.07609,keel:.0352,deck:.3517,half:.064,prof:[0,.8051,.9534,.9883,.9883,1,1,1,1,1,.9995,.9982,.9331]},{u:.07955,keel:.0343,deck:.3514,half:.0662,prof:[0,.7917,.9445,.9861,.9861,1,1,1,1,1,.9996,.9984,.9427]},{u:.08301,keel:.0333,deck:.3511,half:.0685,prof:[0,.7791,.9361,.984,.984,1,1,1,1,1,.9997,.9987,.9516]},{u:.08333,keel:.0332,deck:.3511,half:.0688,prof:[0,.7779,.9353,.9838,.9838,1,1,1,1,1,.9997,.9987,.9525]},{u:.08647,keel:.0324,deck:.3507,half:.0708,prof:[0,.7668,.9279,.982,.982,1,1,1,1,1,.9997,.9989,.9448]},{u:.08992,keel:.0315,deck:.3502,half:.0731,prof:[0,.7552,.9201,.98,.98,1,1,1,1,1,.9998,.9991,.8953]},{u:.09338,keel:.0306,deck:.3497,half:.0754,prof:[0,.7443,.9129,.9782,.9782,1,1,1,1,1,.9998,.9993,.8493]},{u:.09684,keel:.0297,deck:.3493,half:.0777,prof:[0,.7341,.9061,.9765,.9765,1,1,1,1,1,.9999,.9994,.8628]},{u:.1003,keel:.0288,deck:.3488,half:.08,prof:[0,.7245,.8996,.9749,.9749,1,1,1,1,1,.9999,.9996,.8755]},{u:.10417,keel:.0278,deck:.3483,half:.0825,prof:[0,.7143,.8929,.9732,.9732,1,1,1,1,1,.9999,.9997,.8888]},{u:.125,keel:.0224,deck:.3456,half:.0963,prof:[0,.6689,.8626,.9656,.9656,1,1,1,1,1,1,.9739,.896]},{u:.14583,keel:.0179,deck:.3427,half:.1088,prof:[0,.6392,.8428,.9607,.9607,1,1,1,1,1,1,.9708,.7534]},{u:.16667,keel:.0144,deck:.3396,half:.1199,prof:[0,.6199,.8299,.9575,.9575,1,1,1,1,1,1,.9684,.7345]},{u:.1875,keel:.0115,deck:.3364,half:.1302,prof:[0,.6061,.8207,.9552,1,1,1,1,1,1,1,.8671,.5507]},{u:.20833,keel:.0091,deck:.333,half:.1401,prof:[0,.8143,.8143,.9536,1,1,1,1,1,1,1,.8627,.5406]},{u:.22917,keel:.0067,deck:.3295,half:.1506,prof:[0,.8092,.8092,.9523,1,1,1,1,1,1,.9651,.8603,.5355]},{u:.25,keel:.0043,deck:.326,half:.162,prof:[0,.8056,.8056,.9514,1,1,1,1,1,1,.965,.7093,.5367]},{u:.27083,keel:.0019,deck:.3226,half:.1736,prof:[0,.8026,.8026,.9504,.9997,.9997,.9997,.9997,1,1,.8566,.7076,.5383]},{u:.29167,keel:4e-4,deck:.3203,half:.1836,prof:[0,.8043,.8043,.9501,.999,.9994,.9998,1,.9978,.9705,.7802,.6454,.4923]},{u:.3125,keel:0,deck:.3194,half:.1914,prof:[0,.8108,.8108,.9503,.9976,.9989,1,.9971,.9098,.8099,.7383,.6102,.3829]},{u:.33333,keel:1e-4,deck:.2735,half:.1987,prof:[0,.818,.818,.9506,.9962,.9982,1,.9961,.9389,.7614,.6939,.6444,.6139]},{u:.35417,keel:4e-4,deck:.2716,half:.2064,prof:[0,.8227,.8227,.9516,.9961,.9982,1,.979,.8373,.7353,.667,.6266,.6087]},{u:.375,keel:9e-4,deck:.2667,half:.2141,prof:[0,.8251,.4389,.9532,.997,.9986,1,.9958,.8532,.7612,.6986,.6602,.6283]},{u:.39583,keel:.0015,deck:.2551,half:.2212,prof:[0,.8264,.8264,.9555,.9989,.9995,1,.9963,.9844,.8927,.7793,.7496,.7344]},{u:.41667,keel:.0022,deck:.2415,half:.2278,prof:[0,.8266,.8266,.9568,1,1,.9998,.9996,.997,.9895,.9013,.875,.8516]},{u:.4375,keel:.0028,deck:.227,half:.2337,prof:[0,.8257,.8257,.9564,.5409,1,.5571,1,1,.9995,.9995,.9895,.9747]},{u:.45833,keel:.0034,deck:.2187,half:.2391,prof:[0,.8224,.8224,.9517,.5611,.9951,.5937,.9956,.6204,.996,.9967,1,1]},{u:.47917,keel:.004,deck:.2127,half:.2411,prof:[0,.8299,.8299,.9575,.9575,1,.5856,1,.6349,1,1,1,1]},{u:.5,keel:.0044,deck:.2084,half:.2436,prof:[0,.8305,.8305,.9576,.9576,1,1,1,.6058,1,1,1,1]},{u:.52083,keel:.0045,deck:.2095,half:.2443,prof:[0,.8265,.8265,.9566,.9566,.9999,.9999,.9999,.6652,1,1,1,1]},{u:.54167,keel:.0044,deck:.213,half:.2442,prof:[0,.8208,.8208,.9552,.9552,1,.4747,1,1,1,1,1,.9909]},{u:.5625,keel:.0044,deck:.2206,half:.2443,prof:[0,.8159,.8159,.954,1,1,1,1,1,1,1,1,.9404]},{u:.58333,keel:.0044,deck:.2451,half:.2439,prof:[0,.8116,.9529,.9529,1,1,1,1,1,1,1,.924,.5773]},{u:.60417,keel:.0045,deck:.2553,half:.2419,prof:[0,.8082,.952,.952,1,1,1,1,1,1,.9833,.824,.4499]},{u:.625,keel:.0044,deck:.2495,half:.2385,prof:[0,.8047,.9512,.9512,1,1,1,1,1,1,1,.8444,.5253]},{u:.64583,keel:.0042,deck:.244,half:.2343,prof:[0,.7997,.9499,.9499,1,1,1,1,1,1,1,.9394,.5867]},{u:.66667,keel:.004,deck:.2386,half:.2291,prof:[0,.7936,.9484,.9484,1,1,1,1,1,1,1,.9415,.5785]},{u:.6875,keel:.0038,deck:.2335,half:.2229,prof:[0,.7865,.9466,.9466,1,1,1,1,1,1,1,.9413,.5957]},{u:.70833,keel:.0037,deck:.2285,half:.2157,prof:[0,.7785,.9446,.9446,1,1,1,1,1,1,1,.9384,.765]},{u:.72917,keel:.0039,deck:.2238,half:.2073,prof:[0,.7699,.9425,.9425,1,1,1,1,1,1,1,.9326,.7536]},{u:.75,keel:.0044,deck:.2193,half:.1978,prof:[0,.7616,.9404,.9404,1,1,1,1,1,1,.9982,.9239,.7398]},{u:.77083,keel:.0055,deck:.2148,half:.1869,prof:[0,.7549,.9387,.9387,1,1,1,1,1,1,.9923,.9118,.7341]},{u:.79167,keel:.0072,deck:.2103,half:.1746,prof:[0,.7506,.9376,.9376,1,1,1,1,1,1,.9806,.9491,.746]},{u:.8125,keel:.0092,deck:.2059,half:.1617,prof:[0,.7473,.9368,.9368,1,1,1,1,1,1,.9642,.9198,.6326]},{u:.83333,keel:.0112,deck:.2014,half:.1487,prof:[0,.7434,.9359,.9359,1,1,1,1,1,1,.9449,.9154,.6842]},{u:.85417,keel:.0139,deck:.1969,half:.1353,prof:[0,.7392,.9348,.9348,1,1,1,1,1,1,.927,.7823,.3992]},{u:.875,keel:.0182,deck:.1923,half:.1208,prof:[0,.7352,.9338,.9338,1,1,1,1,1,1,.9173,.7535,.4136]},{u:.89583,keel:.024,deck:.1875,half:.1054,prof:[0,.7311,.7311,.9328,1,1,1,1,1,1,.917,.7505,.417]},{u:.8997,keel:.0251,deck:.1866,half:.1026,prof:[0,.7302,.7302,.9326,1,1,1,1,1,1,.9173,.7509,.4173]},{u:.90316,keel:.0261,deck:.1858,half:.1,prof:[0,.7294,.7294,.9324,1,1,1,1,1,1,.9176,.7514,.4176]},{u:.90662,keel:.0271,deck:.185,half:.0974,prof:[0,.7286,.7286,.9321,1,1,1,1,1,1,.9179,.7518,.4179]},{u:.91008,keel:.0281,deck:.1842,half:.0948,prof:[0,.7276,.7276,.9319,1,1,1,1,1,1,.9182,.7522,.4182]},{u:.91353,keel:.0291,deck:.1834,half:.0922,prof:[0,.7267,.7267,.9317,1,1,1,1,1,1,.9185,.7527,.4185]},{u:.91667,keel:.03,deck:.1827,half:.0899,prof:[0,.7258,.7258,.9314,1,1,1,1,1,1,.9188,.7532,.4188]},{u:.91699,keel:.0301,deck:.1826,half:.0897,prof:[0,.7257,.7257,.9314,1,1,1,1,1,1,.9188,.7532,.4188]},{u:.92045,keel:.0312,deck:.1818,half:.087,prof:[0,.725,.725,.9312,1,1,1,1,1,1,.9193,.7539,.4193]},{u:.92391,keel:.0323,deck:.181,half:.0843,prof:[0,.7244,.7244,.9311,1,1,1,1,1,1,.9199,.7548,.4198]},{u:.92737,keel:.0334,deck:.1802,half:.0816,prof:[0,.7237,.7237,.9309,1,1,1,1,1,1,.9205,.7557,.4203]},{u:.93083,keel:.0345,deck:.1794,half:.079,prof:[0,.7231,.7231,.9308,1,1,1,1,1,1,.9212,.7567,.4209]},{u:.93429,keel:.0356,deck:.1785,half:.0763,prof:[0,.7223,.7223,.9306,1,1,1,1,1,1,.9219,.7577,.4215]},{u:.9375,keel:.0369,deck:.1777,half:.0736,prof:[0,.7229,.7229,.9307,1,1,1,1,1,1,.9231,.7593,.4224]},{u:.93774,keel:.037,deck:.1776,half:.0734,prof:[0,.723,.723,.9307,1,1,1,1,1,1,.9232,.7595,.4224]},{u:.9412,keel:.0385,deck:.1767,half:.0703,prof:[0,.7244,.7244,.9311,1,1,1,1,1,1,.9249,.7618,.4237]},{u:.94466,keel:.04,deck:.1758,half:.0673,prof:[0,.726,.726,.9315,1,1,1,1,1,1,.9268,.7644,.425]},{u:.94812,keel:.0416,deck:.1747,half:.0641,prof:[0,.7282,.7282,.9321,1,1,1,1,1,1,.929,.7689,.4239]},{u:.95158,keel:.0435,deck:.1735,half:.0608,prof:[0,.7327,.7327,.9332,1,1,1,1,1,1,.9323,.7796,.4186]},{u:.95504,keel:.0454,deck:.1717,half:.0574,prof:[0,.4816,.7377,.9344,.9344,1,1,1,1,1,.9359,.7916,.6804]},{u:.95833,keel:.0472,deck:.1675,half:.0541,prof:[0,.4896,.7431,.9358,.9358,1,1,1,1,1,.985,.9398,.6572]},{u:.9585,keel:.0473,deck:.1673,half:.054,prof:[0,.49,.7433,.9358,.9358,1,1,1,1,1,.985,.94,.8302]},{u:.96196,keel:.0491,deck:.1617,half:.0506,prof:[0,.4996,.7497,.9374,.9374,1,1,1,1,1,.9862,.9447,.8692]},{u:.96541,keel:.051,deck:.1572,half:.0472,prof:[0,.5105,.757,.757,.9393,1,1,1,1,1,1,.95,.876]},{u:.96887,keel:.0529,deck:.1551,half:.0438,prof:[0,.5232,.7655,.7655,.9414,1,1,1,1,1,1,.9562,.8839]},{u:.97233,keel:.0548,deck:.1551,half:.0404,prof:[0,.538,.7753,.7753,.9438,1,1,1,1,1,1,.9634,.8931]},{u:.97579,keel:.0567,deck:.1569,half:.037,prof:[0,.5554,.787,.787,.9467,1,1,1,1,1,.993,.9719,.904]},{u:.97917,keel:.0586,deck:.16,half:.0337,prof:[0,.5758,.8005,.9501,.9501,1,1,1,1,1,.9954,.9816,.9121]},{u:.97925,keel:.0586,deck:.1601,half:.0336,prof:[0,.5763,.8009,.9502,.9502,1,1,1,1,1,.9955,.9818,.9116]},{u:.98271,keel:.0607,deck:.1637,half:.0302,prof:[0,.6007,.8172,.9543,.9543,1,1,1,1,1,.992,.8889,.8889]},{u:.98616,keel:.0631,deck:.1645,half:.0266,prof:[0,.6282,.8355,.9589,.9589,1,1,1,1,.9997,.9986,.877,.877]},{u:.98962,keel:.066,deck:.164,half:.0229,prof:[0,.6605,.857,.9642,.9642,1,1,1,1,1,1,.875,.875]},{u:.99308,keel:.069,deck:.1633,half:.0192,prof:[0,.7043,.8862,.9715,.9715,1,1,1,1,1,1,.875,.875]},{u:.99654,keel:.072,deck:.1627,half:.0155,prof:[0,.7691,.9294,.9824,1,1,1,1,1,1,1,.875,.5]},{u:1,keel:.0762,deck:.1605,half:0,prof:[0,.9812,.9812,.9953,1,1,1,1,1,1,1,.8618,.5377]}],Jp=9.81,Yp=1e3,Xp=.1,Zp={_0x10b702:.12,_0x7411e5:.06,pBow:2.76,_0xde45ab:4,_0x46be24:.6,wExp:.9,_0xea2743:1,_0xcb265d:3.2,kAmp:3},Qp={"Epic V10 Gen 4":{L:6.1,B:.46,deckH:.34,skiKg:10.9,designKg:94,seatX:-.5,...Zp,_0x10b702:.129,_0x7411e5:.05,pBow:3.853,_0xde45ab:4,_0x46be24:.63,wExp:1,_0xea2743:1.1,_0xcb265d:3.036,kAmp:0},"Fenn Fennix Spearfish":{L:6.315,B:.455,deckH:.36,skiKg:11.5,designKg:100,seatX:-.52,...Zp,_0x10b702:.136,_0x7411e5:.05,pBow:4,_0xde45ab:4,_0x46be24:.54,wExp:1,_0xea2743:1.1,_0xcb265d:2.353,kAmp:0},"Generic ski":{L:Kp,B:.489,deckH:.34,skiKg:11.5,designKg:94,seatX:-.33,sections:qp,...Zp,cockpit:{x0:-.48,x1:.84,floorAbs:.1,zc:-.18,a:.66,wide:.19,narrow:.17},paddler:{seatX:-.33,hipUp:.085,hipHalf:.11,plateShift:.1,ankle:{z:-.62,up:.19,half:.1},ball:{z:-.72,up:.09},thigh:.44,shin:.425}},"Epic V8":{L:5.48,B:.527,deckH:.345,skiKg:11,designKg:99,seatX:-.45,...Zp,_0x10b702:.14,_0x7411e5:.05,pBow:3.705,_0xde45ab:4,_0x46be24:.579,wExp:1,_0xea2743:1.1,_0xcb265d:2.305,kAmp:0}},$p=48,em={x0:-1,x1:.8,floor:.08};function tm(e,t,n){if(e<=0)return 0;if(e<n)return 1-(1-e/n)**t;let r=(e-n)/(1-n);return Math.sqrt(Math.max(1-r*r,0))}var nm=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},rm=class e{constructor(e,{_0xc3ed10:t,N:n=13}={}){this.spec={...e},this.N=n,this._0xc3ed10=t??e.designKg,this.params={ka:.676,kc:.92,cd:3.9,ip:600,_0xd94007:.45,_0xab45e0:2.5,_0xe0aecc:1,slam:1,_0xc10313:0,yieldK:2,yieldT:.8,_0x3a02a3:.35,_0x5534ac:.5,_0x02786d:.05,_0x066167:.25,_0x2491c9:2,_0x2ab601:.3,_0x59b569:1.2,_0xe570b4:70,_0x393eec:2,_0xcabfd4:0,_0xe37013:.5,_0x0cb9bc:1},this.build(),this.calibrate(),this.reset()}halfWidth(e){if(this.spec.sections)return this.sec(e).half;let t=this.spec,n=e=>Math.max(Math.sin(Math.PI*e**+t._0xea2743),0)**+t.wExp;if(!this._wmax){let e=0;for(let t=1;t<200;t++)e=Math.max(e,n(t/200));this._wmax=e}return t.B/2*n(e)/this._wmax}keelRel(e){if(this.spec.sections)return this.sec(e).keel;let t=this.spec;return e<.5?t._0x10b702*((.5-e)/.5)**t.pBow:t._0x7411e5*((e-.5)/.5)**t._0xde45ab}zoneBump(e){return nm(-1.3,-.85,e)*(1-nm(.9,1.9,e))}deckRel(e){if(this.spec.sections)return this.sec(e).deck;let t=.215*Math.max(Math.sin(Math.PI*e**.78),0)**.62,n=-this.spec.L/2+e*this.spec.L,r=(.15+.17*(1-e)**3.2+.05*e**4+Math.max(.52*t,.004))*(this.spec.deckH/.34)-.006+.85*this.keelRel(e),i=this.spec.deckH+this.keelRel(e);return r+this.zoneBump(n)*Math.max(0,i-r)}profile(e,t,n){if(this.spec.sections)return this.secProfile(e,(n+this.spec.L/2)/this.spec.L);let r=tm(e,t,this.spec._0x46be24),i=this.zoneBump(n);if(i<=0||e<=.45)return r;let a=.93,o=tm(.45,t,this.spec._0x46be24);return r+i*((e<a?o+(1-o)*nm(.45,a,e):Math.sqrt(Math.max(1-((e-a)/.06999999999999995)**2,0)))-r)}sec(e){let t=this.spec.sections,n=Math.min(Math.max(e,0),1),r=0,i=t.length-1;for(;i-r>1;){let e=r+i>>1;t[e].u<=n?r=e:i=e}let a=t[r],o=t[i],s=o.u>a.u?(n-a.u)/(o.u-a.u):0,c=this._sec??={keel:0,deck:0,half:0,i:0,a:0};return c.keel=a.keel+(o.keel-a.keel)*s,c.deck=a.deck+(o.deck-a.deck)*s,c.half=a.half+(o.half-a.half)*s,c.i=r,c.a=s,c}secProfile(e,t){let n=this.spec.sections,{i:r,a:i}=this.sec(t),a=n[0].prof.length-1,o=Math.min(Math.max(e,0),1)*a,s=Math.min(a-1,Math.floor(o)),c=o-s,l=e=>e.prof[s]+(e.prof[s+1]-e.prof[s])*c;return l(n[r])+(l(n[r+1])-l(n[r]))*i}bottomK(e){return this.spec._0xcb265d+this.spec.kAmp*Math.sin(Math.PI*e)**.8}cockpitAt(e){return{floor:(this._0x053f62??0)+this.base+.07*nm(.15,-.9,e),hump:.09*nm(.25,-.1,e)*(1-nm(-.45,-.85,e))}}innerHalfAt(e,t){let n=(e+this.spec.L/2)/this.spec.L,r=this.base+this.keelRel(n),i=this.base+this.deckRel(n);return t<=r||t>=i?0:this.halfWidth(n)*this.profile((t-r)/(i-r),0,e)}openingHalfWidth(e){if(this.spec.noCockpit)return 0;let t=this.spec.cockpit,n=t?t.zc:.025,r=t?t.a:.975,i=Math.abs((e-n)/r);if(i>=1)return 0;let a=t?t.wide:.17,o=t?t.narrow:.12;return(o+(a-o)*nm(-.6,.2,e))*(1-i**3.2)**(1/3.2)}tList(e,t=9){let n=.93,r=[];for(let t=0;t<=e;t++)r.push(t/e*n);for(let e=1;e<=t;e++)r.push(n+.06999999999999995*Math.sin(e/t*Math.PI/2));return r}sideOutline(e,t=16){let n=this.halfWidth(e),r=this.keelRel(e)+this.base,i=this.deckRel(e)+this.base,a=this.bottomK(e),o=-this.spec.L/2+e*this.spec.L;return this.tList(t).map(e=>[n*this.profile(e,a,o),r+e*(i-r)])}static deckAt(e,t){let n=e[e.length-1][1];for(let n=e.length-1;n>0;n--){let[r,i]=e[n],[a,o]=e[n-1];if(t>=r&&t<=a||t>=a&&t<=r){if(a===r)continue;return i+(o-i)*(t-r)/(a-r)}}return n}ring(t,n=16){let r=this.sideOutline(t,n),i=-this.spec.L/2+t*this.spec.L,a=this.openingHalfWidth(i),o=r.map(e=>e.slice());if(a>.001){let t=[a,e.deckAt(r,a)],i=n;for(let e=i+1;e<o.length;e++)o[e][0]<a&&(o[e]=t.slice());o[i][0]<a&&(o[i]=t.slice())}let s=o.slice();for(let e=o.length-2;e>=1;e--)s.push([-o[e][0],o[e][1]]);return s}bucketRings(t=70){let n=[];for(let r=0;r<=t;r++){let i=-.95+1.95*r/t,a=(i+this.spec.L/2)/this.spec.L,o=this.openingHalfWidth(i),s=this.sideOutline(a),c=e.deckAt(s,Math.max(o,.001)),l=this.cockpitAt(i),u=nm(0,.25,1-Math.abs((i-.025)/.975)),d=l.floor+(c-l.floor)*(1-u),f=l.hump*u,p=Math.max(o-.025,0),m=[],h=[[o,c],[o-.004,c-.04],[p+.01,(c+d)/2-.01],[p,d+.012],[p*.9,d]];for(let e=1;e<=6;e++){let t=e/6;h.push([p*.9*(1-t),d+f*(1-(1-t)**2)])}for(let e of h)m.push(e);for(let e=h.length-2;e>=0;e--)m.push([-h[e][0],h[e][1]]);n.push({z:i,pts:m})}return n}deckTop(e){return this.deckRel(Math.min(Math.max((e+this.spec.L/2)/this.spec.L,0),1))+this.base}build(){let e=this.spec,t=this.N,n=e.L,r=n/t,i=[];this.base=0;for(let a=0;a<t;a++){let o=(a+.5)/t,s=(.5-o)*n,c=this.keelRel(o),l=this.deckRel(o),u=l-c,d=this.halfWidth(o),f=this.bottomK(o),p=new Float64Array(49);for(let e=1;e<=$p;e++)p[e]=p[e-1]+2*d*this.profile((e-.5)/$p,f,-n/2+o*n)*(u/$p);i.push({x:s,w:d,keel:c,top:l,H:u,A:p,dx:r,inCockpit:!e.noCockpit&&s>(e.cockpit?.x0??em.x0)&&s<(e.cockpit?.x1??em.x1)})}for(let e of i)e.side=e.inCockpit?Math.min(1,Math.max(0,1-this.openingHalfWidth(-e.x)/Math.max(e.w,.001))):1;this._0x5516d6=i}static area(e,t){if(t<=0)return 0;let n=e.A.length-1,r=Math.min(t/e.H,1)*n,i=Math.min(Math.floor(r),n-1);return e.A[i]+(e.A[i+1]-e.A[i])*(r-i)}static breadth(e,t){if(t<=0||t>=e.H)return 0;let n=e.A.length-1,r=Math.min(Math.floor(t/e.H*n),n-1);return(e.A[r+1]-e.A[r])*n/e.H}buoy(t,n){return Yp*Jp*e.area(t,n-0)*t.dx}masses(){let e=this.spec,t=this._0xc3ed10,n=e.skiKg,r=t+n,i=t*e.seatX+n*-.05;return{M:r,S:i,I:t*e.seatX*e.seatX+n*(e.L*e.L/12+.05*.05)+this.params.ip,xcg:i/r}}staticBuoyancy(e,t){let n=0,r=0;for(let i of this._0x5516d6){let a=-(e+i.x*Math.sin(t)+i.keel),o=Yp*Jp*this.areaAt(i,a)*i.dx;n+=o,r+=o*i.x*Math.cos(t)}return{F:n,My:r}}cap(e,t){return!e.inCockpit||this._0x053f62==null?t:Math.min(t,this._0x053f62-e.keel)}areaAt(t,n){let r=t.inCockpit&&this._0x053f62!=null?this._0x053f62-t.keel:1/0;if(n<=r)return e.area(t,n);let i=e.area(t,r);return this.params.sideTanks===!1?i:i+t.side*(e.area(t,n)-i)}breadthAt(t,n){let r=t.inCockpit&&this._0x053f62!=null?this._0x053f62-t.keel:1/0;return n<=r?e.breadth(t,n):this.params.sideTanks===!1?e.breadth(t,r):t.side*e.breadth(t,n)}equilibrium(e=this.masses()){let t=-.1,n=0,r=e.M*Jp,i=e.S*Jp;for(let e=0;e<60;e++){let e=(e,t)=>{let n=this.staticBuoyancy(e,t);return[n.F-r,n.My-i*Math.cos(t)]},[a,o]=e(t,n),s=1e-4,[c,l]=e(t+s,n),[u,d]=e(t,n+s),f=(c-a)/s,p=(l-o)/s,m=(u-a)/s,h=(d-o)/s,g=f*h-m*p;if(Math.abs(g)<1e-9)break;let _=(h*a-m*o)/g,v=(-p*a+f*o)/g;if(t-=Math.max(-.05,Math.min(.05,_)),n-=Math.max(-.05,Math.min(.05,v)),Math.abs(_)<1e-7&&Math.abs(v)<1e-8)break}return{hz:t,th:n}}calibrate(){this._0x053f62=null;let e=new im(this).designEq();this._0xf3a7ff=e.hz,this.base=Xp+e.hz,this._0x053f62=this.spec.cockpit?this.spec.cockpit.floorAbs:-e.hz+em.floor;let t=this.equilibrium();this.hzEq=t.hz,this.thEq=t.th;let n=this.masses();this.xcg=n.xcg;let r=.005;this._0xcebabb=(this.staticBuoyancy(t.hz-r,t.th).F-this.staticBuoyancy(t.hz+r,t.th).F)/(2*r),this._0x323196=(this.staticBuoyancy(t.hz,t.th-.005).My-this.staticBuoyancy(t.hz,t.th+.005).My)/.01-0}statics(){let e=this.equilibrium(),t=this._0x5516d6,n={};n.hzRel=e.hz-this._0xf3a7ff;let r=0,i=0,a=0,o=0,s=t=>-(e.hz+t.x*Math.sin(e.th)+t.keel);for(let e of t){let t=s(e),n=this.areaAt(e,t)*e.dx;r+=n,i+=n*e.x;let c=this.breadthAt(e,t);a+=c*e.dx,o+=c*e.dx*e.x}let c=t.reduce((e,t)=>Math.abs(t.x)<Math.abs(e.x)?t:e);n.displacementL=r*1e3,n.draftMid=s(c),n.bwl=this.breadthAt(c,s(c)),n.deckBeam=2*c.w,n.wp=a,n.lcb=i/r,n.lcf=o/a,n.trimDeg=e.th*180/Math.PI,n.xcg=this.masses().xcg;let l=[0,0,0],u=[0,0,0],d=this.spec.L;for(let e of t){let t=e.x>d/6?0:e.x<-d/6?2:1;l[t]+=Yp*this.areaAt(e,e.H)*e.dx,u[t]+=this.areaAt(e,s(e))*e.dx*Yp}return n.reserveKg=l.map(e=>e),n.restShare=u.map(e=>e/(r*Yp)),n._0xcebabb=this._0xcebabb,n._0x323196=this._0x323196,n}holdAttitude(e){let t=e*Math.PI/180,n=this.masses(),r=this.hzEq;this._0x5dd522=0;for(let e=0;e<40;e++){let e=this.staticBuoyancy(r,t);r+=(e.F-n.M*Jp)/this._0xcebabb}let i=this.staticBuoyancy(r,t);return this._0x5dd522=-(i.My-Jp*n.S*Math.cos(t)),{hz:r,th:t}}reset(e=this.hzEq,t=this.thEq){this._0x5dd522=this._0x5dd522??0,this.hz=e,this.th=t,this.vz=0,this.om=0,this._0x0b01ec=null,this._0x2ed581=null,this.aeff=null,this.defl=null,this._0xf45b40=0,this._0xb631b5=0,this._0x1c8720=0,this.awash=0,this.bury=0,this.thS=0,this.wet=1,this.motionPower=0,this.Fb=0}step(e,t,n={}){let r=this._0x5516d6,i=r.length,a=this.masses(),o=this.params,s={},c=Math.sin(this.th),l=Math.cos(this.th);this.fresh=!this._0x0b01ec,this._0x0b01ec||=new Float64Array(i),this.defl||=new Float64Array(i),this.aeff||=new Float64Array(i).fill(-1),this._0x2ed581?this._0x323159=!1:(this._0x2ed581=new Float64Array(i),this._0x323159=!0),this.hs||(this.hs=new Float64Array(i),this.uzs=new Float64Array(i),this.sl=new Float64Array(i));let u=o._0xe0aecc??0,d=n.uFwd??0;for(let e=0;e<i;e++){let n=t(r[e].x*l,s);this.hs[e]=n.h,this.uzs[e]=n.uz}if(u!==0&&d!==0)for(let e=0;e<i;e++){let t=Math.max(0,e-1),n=Math.min(i-1,e+1);this.sl[e]=(this.hs[n]-this.hs[t])/((r[n].x-r[t].x)*l)}else this.sl.fill(0);let f=this.diag={buoy:0,damp:0,addm:0},p=0,m=0,h=0,g=0,_=-a.M*Jp,v=-9.81*a.S*l+(this._0x5dd522??0)-(o._0xcabfd4??0)*this.om,y=0,b=0,x=0,S=0,C=0,w=0,T=-9,E=0,D=0,O=0;for(let t=0;t<i;t++){let n=r[t],i={h:this.hs[t],uz:this.uzs[t]},a=this.hz+n.x*c+n.keel,s=i.h-a,T=s-this.defl[t],k=this.areaAt(n,T),A=this.breadthAt(n,T),ee=k;if(o._0xc10313>0){let n=this.aeff[t];ee=n<0||k<=n?k:n+(k-n)*(1-Math.exp(-e/o._0xc10313)),this.aeff[t]=ee}let j=this.vz+n.x*this.om*l-i.uz-u*d*this.sl[t],M=Yp*Jp*ee*n.dx;S+=M;let N=n.x>this.spec.L/6;if(N&&(f.buoy+=M),A>0){let r=Yp*o.ka*A*A*n.dx,a=this.fresh?0:(i.uz-this._0x0b01ec[t])/e,s=o.kc*Yp*A*Math.sqrt(Jp*A)*n.dx*j+.5*Yp*o.cd*A*n.dx*Math.abs(j)*j;if(o._0x2491c9<1e6&&(s/=1+Math.abs(j)/o._0x2491c9),M+=r*a-s,C+=s*j,N&&(f.damp+=-s,f.addm+=r*a),y+=r,b+=r*n.x,x+=r*n.x*n.x,!this._0x323159&&o.slam&&j<0&&r>this._0x2ed581[t]){let e=-o.slam*(r-this._0x2ed581[t])*j;h+=e,g+=e*n.x*l}}this._0x2ed581[t]=A>0?Yp*o.ka*A*A*n.dx:0;let P=o._0xe37013>0||o._0x0cb9bc>0?nm(n.H-.02,n.H+.08,s):0;if(P>0){let r=2*n.w,a=P*Yp*(o._0xe37013??0)*r*r*n.dx,s=this.fresh?0:(i.uz-this._0x0b01ec[t])/e,c=P*.5*Yp*(o._0x0cb9bc??0)*r*n.dx*Math.abs(j)*j;M+=a*s-c,C+=c*j,y+=a,b+=a*n.x,x+=a*n.x*n.x}if(this._0x0b01ec[t]=i.uz,n.x>.5&&s>-.03&&s<.3&&j<-.15&&(p+=A*n.dx*(-j-.15)*(-j-.15),m=Math.max(m,-j)),o.yieldK>0){let n=nm(o._0x02786d,o._0x066167,s),r=o.yieldK*Math.max(0,-j-o._0x5534ac)*n;this.defl[t]=Math.min(o._0x3a02a3,Math.max(0,this.defl[t]+(r-this.defl[t]/o.yieldT)*e))}else this.defl[t]=0;_+=M,v+=M*n.x*l;let F=i.h-(this.hz+n.x*c+n.top);F>0&&E++,n.x>em.x1&&F>0&&(w=Math.max(w,2*Math.max(n.w,.08)*Math.min(F,.35))),n.x>em.x1&&(D++,F<=0&&O++)}let k=1-nm(.4,.8,E/i);this._0xcad7c2=k;let A=n.u??0,ee=1-Math.min(1,this._0xf45b40/o._0xe570b4);if(this._0xb631b5=k>0?Math.max(0,o._0x2ab601*Yp*w*Math.max(A,0)*ee*k):0,this._0xf45b40=Math.min(o._0xe570b4,Math.max(0,this._0xf45b40+(this._0xb631b5-this._0xf45b40/o._0x59b569)*e)),this._0x5d206d=D?O/D:1,this._0xf45b40>0){let e=this._0xf45b40*Jp*(o.deckWeighDry===!1?1:this._0x5d206d);_-=e,v-=e*o._0x393eec}if(w>0&&k>0){let e=Math.min(.5*Yp*o._0xd94007*w*A*Math.abs(A),.8*a.M*Jp);v-=.4*k*e}let j=0,M=0;for(let e=0;e<i;e++)j+=r[e].x*this.hs[e],M+=r[e].x*r[e].x;this.thS=Math.atan(j/M);let N=this.spec.L/2,P=t(N*l,s),F=this.hz+N*c+this.deckRel(0);T=P.h-F;let I=a.M+y,L=a.S+b,te=a.I+x,ne,re;if(n.holdPitch!=null)ne=_/I,re=0,this.th=n.holdPitch,this.om=0;else{let e=I*te-L*L;ne=(_*te-v*L)/e,re=(I*v-L*_)/e}if(n.holdPitch==null&&Math.abs(this.th)>=.6&&re*this.th>0&&(ne=_/I,re=0),this.vz+=ne*e,this.om+=re*e,h!==0){let e=I*te-L*L,t=(h*te-g*L)/e,r=(I*g-L*h)/e;this.vz+=t,n.holdPitch??(this.om+=r)}this._0x1c8720=h/e,this.hz+=this.vz*e,n.holdPitch??(this.th+=this.om*e),Math.abs(this.th)>.6&&(this.th=Math.sign(this.th)*.6,this.om=0);let ie=0;for(let e=0;e<i;e++)r[e].x>.5&&(ie=Math.max(ie,this.defl[e]));this.splash=Math.min(1,ie/.12),this.spray=p,this.encounter=m;{let e=T>(this._0x414034??T);this.plunge=nm(-.004,.025,T)*(e?1:.5),this._0x414034=T}return this.awash=w,this.bury=T,this.Fb=S,this.wet=Math.min(1,S/(a.M*Jp)),this.motionPower=C,this}},im=class{constructor(e){this.b=e}designEq(){let e=this.b,t=e._0xc3ed10;e._0xc3ed10=e.spec.designKg;let n=e.equilibrium();return e._0xc3ed10=t,n}},am=(e,t)=>(e-t+540)%360-180,om={v0:3.5,v1:7,depth:.5,floor:.3};function sm(e,t=1){if(!(t>1))return 1;let n=Math.min(Math.max((Math.abs(e)-om.v0)/(om.v1-om.v0),0),1);return Math.max(om.floor,1-om.depth*(t-1)*n*n*(3-2*n))}var cm={mass:105,_0x283f96:1.1,_0x6f9fed:.8,c2:4,c4:.03,_0x692a92:.8,_0x785bcb:1,_0xf3bf83:3,eta:.65,cp:202,_0x39dfcf:420,_0x220b40:14e3,_0x75b649:.47,_0x6adfa9:1.33,broach:1.6,_0x621947:2.2,_0x847153:3,_0x9849dc:1.6,_0xa97291:3,_0x56f330:.15,_0x522595:.5,_0xbf6a2c:.5,_0x8c9078:.01,_0xd72404:60,_0x1b25f3:2,_0xd94007:.45,_0x6fbebf:1,_0xec5b2e:4,_0xe67d0d:.9,_0x2a10a0:.0015,_0x20d602:.45,_0x8ecc72:0,disturb:0,_0x63da57:.1,waveLean:1.3,_0xcf574d:.26,_0xa51398:0};function lm(e,t){let n=am(t,e.headingDeg);return Math.max(-1,Math.min(1,n/25))}var um=1025,dm=Math.PI/180,fm={"Nelo short":{span:.125,chord:.115,areaFactor:.75,note:`Dietz: the short carbon rudder for flat water (125 x 115 mm)`},"Nelo large":{span:.174,chord:.129,areaFactor:.75,note:`Dietz: the surf rudder (174 x 129 mm)`}},pm={rudder:`Nelo short`,reflect:1.3,gamma:.6,_0xd93f05:.9,_0x89a646:18,_0xd53382:9,_0x0762e6:.06,_0x0d9d7c:1.15,cd0:.012,_0x0bd695:.85,_0x7d8a1b:0,_0x662366:.9,_0xc05141:8,_0x5c7dee:16,_0x8339c2:.05,_0xabcd44:null,_0x399de1:.03,_0x6b746a:9,_0x50108c:.25,_0xa5446e:5,_0xbf6a34:.05,_0x94049d:.03,_0x31e17f:!1},mm=e=>2*Math.PI*e/(2+Math.sqrt(e*e+4)),hm=class{constructor(e,{mass:t,_0xc3ed10:n,skiKg:r=11,seatX:i=-.33},a={}){this.o={...pm,...a};let o=e.hzEq,s=e.thEq??0;this.st=e._0x5516d6.map(t=>{let n=Math.max(0,-(o+t.x*Math.sin(s)+t.keel));return{x:t.x,dx:t.dx,T:n,m22:um*Math.PI*n*n/2,A:e.areaAt?e.areaAt(t,n):0}}),this.st.forEach((e,t)=>{e.i=t});let c=this.st[0];for(let e of this.st)e.m22>c.m22&&(c=e);this.xs=c.x,this.m22s=c.m22,this._0x97a3c1=c.i,this.fwd=this.st.filter(e=>e.x>this.xs),this.wet=this.st.filter(e=>e.T>.002);let l=0,u=0,d=0,f=0,p=0;for(let e of this.st)l+=e.m22*e.dx,u+=e.m22*e.x*e.dx,d+=e.m22*e.x*e.x*e.dx,e.x<this.xs&&e.T>.002&&(f+=e.T*e.dx,p+=e.x*e.T*e.dx);this._0xac0349=f,this.xAft=f>0?p/f:this.xs,this.xEnd=Math.min(...this.wet.map(e=>e.x-e.dx/2)),this._0x306bc7=this.wet.reduce((e,t)=>t.x<e.x?t:e).i;let m=e.spec.L,h=n??t-r;this.m=t,this.xG=e.xcg??0,this.Iz=h*i*i+h*.2*.2+6+r*(m*m/12),this.M11=t+l,this.M12=t*this.xG+u,this.M22=this.Iz+d,this.detM=this.M11*this.M22-this.M12*this.M12,this.added={m22:l,m26:u,m66:d},this.setRudder(this.o.rudder),this.reset()}dwAft(e){let t=0,n=0;for(let r of this.st)r.x<this.xs&&r.T>.002&&(t+=r.T*r.dx,n+=r.T*r.dx*e[r.i]);return t>0?n/t:0}setRudder(e){let t=fm[e]??fm[`Nelo short`],n=this.o;this.R=t,this._0xb6f42b=fm[e]?e:`Nelo short`,this.area=t.areaFactor*t.span*t.chord,this.AR=t.span*t.span/this.area,this.ARe=n.reflect*this.AR,this.cla=mm(this.ARe),this.xR=n._0xabcd44??this.xEnd+.15}reset(){this.v=0,this.r=0,this.stall=0,this.vent=0,this.alpha=0,this.Yr=0,this.Dr=0,this.load=0,this.imm=1}coeffsAt(e,t,n){let r=this.o,i=Math.max(this.ARe*n,.05),a=mm(i)*e,o=r._0x0d9d7c*Math.sin(e)*Math.cos(e);return{cl:(1-t)*a+t*o,cd:r.cd0+(1-t)*a*a/(Math.PI*r._0x0bd695*i)+t*r._0x0d9d7c*Math.sin(e)**2}}coeffs(e,t){let n=this.o,r=this.cla*e,i=n._0x0d9d7c*Math.sin(e)*Math.cos(e);return{cl:(1-t)*r+t*i,cd:n.cd0+(1-t)*r*r/(Math.PI*n._0x0bd695*this.ARe)+t*n._0x0d9d7c*Math.sin(e)**2}}forces(e,t,n,r,i,a=!0,o=null){let s=this.o,c=o?.dw,l=n=>e+n.x*t-(c?c[n.i]:0),u=this.st[this._0x97a3c1],d=l(u),f=-n*this.m22s*d,p=0;for(let e of this.fwd)p+=e.m22*l(e)*e.dx;let m=-n*(this.xs*this.m22s*d+p),h=-.5*um*n*this._0xac0349*s._0x7d8a1b*(e+this.xAft*t-(c?this.dwAft(c):0));if(f+=h,m+=h*this.xAft,a){let r=Math.min(1,Math.atan2(Math.abs(e)+1.5*Math.abs(t),Math.max(n,.05))/(s._0xc05141*dm));for(let e of this.wet){let t=l(e),n=-.5*um*s._0x662366*r*e.T*e.dx*t*Math.abs(t);f+=n,m+=n*e.x}}if(o?.da)for(let e of this.wet){let t=(um*e.A+e.m22)*o.da[e.i]*e.dx;f+=t,m+=t*e.x}let g=o?.du??0,_=o?.imm??1,v=o?.vent??0,y=c?c[this._0x306bc7]:0,b=Math.max(s._0xd93f05*(n+g),.05),x=s.gamma*(e+this.xR*t-y)+(o?.wExt??0),S=r+Math.atan2(x,b),{cl:C,cd:w}=_<.999?this.coeffsAt(S,i,_):this.coeffs(S,i);C*=1-v*(1-s._0x50108c);let T=.5*um*(b*b+x*x)*this.area*_,E=Math.atan2(x,b),D=-T*(C*Math.cos(E)+w*Math.sin(E)),O=T*(w*Math.cos(E)-C*Math.sin(E));return f+=D,m+=D*this.xR,{Y:f-this.m*n*t,N:m-this.m*this.xG*n*t,Yr:D,Dr:O,alpha:S,cl:C}}holdMoment(e){let t=1e-4,n=this.forces(0,0,e,0,0,!1),r=this.forces(t,0,e,0,0,!1),i=this.forces(0,t,e,0,0,!1),a=(r.Y-n.Y)/t,o=(i.Y-n.Y)/t,s=(r.N-n.N)/t,c=a*((i.N-n.N)/t)-o*s;return Math.abs(a)>1e-9?-c/a:0}step(e,t,n,r=null,i=0,a=null){let o=this.o,s=Math.max(t,.05),c=null;if(a?.hull&&o._0x31e17f){let t=a.hull,n=a.mid??0,r=t.length,i=this._dw??=new Float64Array(r),o=this._da??=new Float64Array(r),s=this._dwPrev;for(let e=0;e<r;e++)i[e]=t[e]-n;for(let t=0;t<r;t++)o[t]=s?(i[t]-s[t])/e:0;(this._dwPrev??=new Float64Array(r)).set(i),c={dw:i,da:o}}if(a){let t=a.top??.04;this.imm=Math.min(1,Math.max(0,(t+this.R.span)/this.R.span)),c={...c??{},du:a.du??0,wExt:o._0x31e17f?0:a.wExt??0,imm:Math.max(this.imm,.02),vent:this.vent};let r=Math.max(o._0xd93f05*(s+c.du),.05),i=Math.abs(n+Math.atan2(o.gamma*(this.v+this.xR*this.r)+c.wExt,r)),l=(101325+um*9.81*Math.max(t,0)-2340)/(.5*um*r*r),u=1+12*i+40*i*i,d=this.vent>.5?i/dm<o._0xa5446e&&t>o._0xbf6a34?0:1:+(t<o._0x399de1&&i/dm>o._0x6b746a||u>l&&t<this.R.chord);this.vent+=(d-this.vent)*Math.min(1,e/o._0x94049d),c.vent=this.vent,this.sigma=l}let l=this.forces(this.v,this.r,s,n,this.stall,!0,c),u=Math.abs(l.alpha)/dm,d=this.stall>.5?u<o._0xd53382?0:1:+(u>o._0x89a646);this.stall+=(d-this.stall)*Math.min(1,e/o._0x0762e6);let f=l.Y,p=l.N;if(r&&(f+=r.Y,p+=r.N),i){let e=Math.round(s/.05),t=this._hold??=new Map,n=t.get(e);n??(n=this.holdMoment(Math.max(e*.05,.05)),t.set(e,n)),p+=n*i}let m=(this.M22*f-this.M12*p)/this.detM,h=(-this.M12*f+this.M11*p)/this.detM;return this.v+=m*e,this.r+=h*e,this.alpha=l.alpha,this.Yr=l.Yr,this.Dr=l.Dr,this.load=Math.max(-1.3,Math.min(1.3,l.cl/(this.cla*o._0x89a646*dm))),this._0xcc42d2=this.stall>.5?`stall`:this.vent>.5?`vent`:null,this}},gm=(e,t,n,r,i)=>(Math.sin(t*e+i)+Math.sin(n*e+i*2.3)+Math.sin(r*e+i*3.1))/3,_m=e=>(e%360+360)%360,vm={...cm,_0x0c4c08:`Generic ski`,_0x621947:2.2,_0xb23f0a:1,_0xfd7ed3:.3,_0x3f7dc7:.75,_0xfe490c:.55,_0x99faf5:1.2,_0x2b70b1:.0012,_0xf42072:.25,_0x14c428:.3,_0x52b06a:0,roller:0,_0x07b279:1,_0x825208:.6,_0x4834eb:.25,_0xe1ff95:0},ym=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function bm(e,t=0){let n=ym(-.3,0,e),r=1-ym(.9,1.3,e),i=1-ym(.25,.45,e);return n*((1-t)*r+t*i)}var xm=1.225,Sm=1025,Cm={_0xf3bf83:.452,_0x785bcb:.701,_0x8c9078:.006,_0x1b25f3:4.745,_0x6c2890:-.421},wm=class{static defaults(){return{...vm}}constructor(e=vm){let{_0x6c2890:t,...n}=Cm;this.p={...vm,...e,...n},this.p._0x692a92=(e._0x692a92??cm._0x692a92)+t;let r=Qp[this.p._0x0c4c08];this.boat=new rm(r,{_0xc3ed10:Math.max(40,this.p.mass-r.skiKg)}),this.p.lateral3&&(this.lat=new hm(this.boat,{mass:this.p.mass,_0xc3ed10:Math.max(40,this.p.mass-r.skiKg),skiKg:r.skiKg,seatX:r.paddler?.seatX??r.seatX??-.33},this.p.lateral3===!0?{}:this.p.lateral3),this.p._0x6adfa9=0),this.hzEq=this.boat.hzEq,this.hull=this.boat,this.xcg=this.boat.xcg,this.reset(0,0,0)}get hz(){return this.boat.hz}set hz(e){this.boat.hz=e}get vz(){return this.boat.vz}set vz(e){this.boat.vz=e}get pitch(){return this.boat.th}set pitch(e){this.boat.th=e}get pitchRate(){return this.boat.om}set pitchRate(e){this.boat.om=e}get thS(){return this.boat.thS??0}set thS(e){this.boat.thS=e}get awash(){return this.boat.awash}set awash(e){this.boat.awash=e}get wet(){return this.boat.wet}set wet(e){this.boat.wet=e}get motionPower(){return this.boat.motionPower}set motionPower(e){this.boat.motionPower=e}get lv(){return this.lat?.v}set lv(e){this.lat&&e!=null&&(this.lat.v=e)}get lr(){return this.lat?.r}set lr(e){this.lat&&e!=null&&(this.lat.r=e)}get ls(){return this.lat?.stall}set ls(e){this.lat&&e!=null&&(this.lat.stall=e)}get lvent(){return this.lat?.vent}set lvent(e){this.lat&&e!=null&&(this.lat.vent=e)}get ldw(){return this.lat?._dwPrev?Array.from(this.lat._dwPrev):null}set ldw(e){this.lat&&(this.lat._dwPrev=e?Float64Array.from(e):null)}get uzp(){return this.boat._0x0b01ec?Array.from(this.boat._0x0b01ec):null}set uzp(e){this.boat._0x0b01ec=e?Float64Array.from(e):null}get maprev(){return this.boat._0x2ed581?Array.from(this.boat._0x2ed581):null}set maprev(e){this.boat._0x2ed581=e?Float64Array.from(e):null}get defl(){return this.boat.defl?Array.from(this.boat.defl):null}set defl(e){this.boat.defl=e?Float64Array.from(e):null}get spray(){return this.boat.spray??0}set spray(e){}get encounter(){return this.boat.encounter??0}set encounter(e){}get plunge(){return this.boat.plunge??0}set plunge(e){}get buryTip(){return this.boat.bury??-1}set buryTip(e){}get splash(){return this.boat.splash??0}set splash(e){}get deckw(){return this.boat._0xf45b40??0}set deckw(e){this.boat._0xf45b40=e??0}get aeff(){return this.boat.aeff?Array.from(this.boat.aeff):null}set aeff(e){this.boat.aeff=e?Float64Array.from(e):null}get z(){return this.boat.hz-this.boat._0xf3a7ff}set z(e){}get headingDeg(){return _m(this.psi*180/Math.PI)}get forward(){return[Math.sin(this.psi),Math.cos(this.psi)]}reset(e,t,n,r=3.2){this.e=e,this.n=t,this.psi=n*Math.PI/180,this.u=r,this.wPrime=this.p._0x220b40,this.distance=0,this.power=this.p.cp,this.settle()}settle(){this.roll=0,this.steerSm=0,this.waveLean=0,this.pearl=0,this.rollRate=0,this._0x044eb6=0,this._0x1adeea=0,this.onRun=!1,this.slopeForce=0,this.thrust=0,this.boat.reset(),this.boat._0x0b01ec=null,this.placed=!1,this.lat?.reset(),this.current=this.current??[0,0]}step(e,t,n,r,i={}){let a=this.p,o=this.boat,[s,c]=this.forward,l=c,u=-s,d=a.mass*a._0x283f96,f=a.mass*go,p=n.sample(this.e,this.n,r,i),m=n.sample(this.e+s*a._0x621947,this.n+c*a._0x621947,r,{}),h=n.sample(this.e-s*a._0x621947,this.n-c*a._0x621947,r,{}),g=(m.h-h.h)/(2*a._0x621947),_=p.sx*l+p.sn*u,v=p.ue*s+p.un*c+this.current[0]*s+this.current[1]*c,y=0,b=0,x=0,S=0,C=h.ue*s+h.un*c;if(a._0x52b06a>0&&(y=a._0x52b06a*(m.ue*l+m.un*u-(h.ue*l+h.un*u))/(2*a._0x621947)),a.roller>0&&n.spilling){let e=this._sp??=[{},{}];for(let t=0;t<2;t++){let i=t===0?a._0x621947:-a._0x621947,o=n.spilling(this.e+s*i,this.n+c*i,r,e[t]),d=o.steep+o.depth>0?o.steep/(o.steep+o.depth):1,f=Math.min(1,2*o.a/a._0x825208),p=o.p>.01?Math.min(1,a.roller)*o.p*f*(1-d+d*a._0x4834eb)*bm(o.theta,d):0;if(!(p>0))continue;let m=o.c*(o.dx*s+o.dy*c),h=o.c*(o.dx*l+o.dy*u);b+=.5*p*Math.max(m-this.u,0)/a._0x07b279,x+=(i>0?p:-p)*h/(2*a._0x621947),S+=.5*p*h,i<0&&(C+=p*(m-C))}}this._0x2bac06=b,this._0x8bf4e4=x;let w=0,T=0,E=this.lat?.o._0x31e17f?this._wl??=new Float64Array(o._0x5516d6.length):null,D=0,O={},k=(e,t)=>(Object.assign(t,n.sample(this.e+s*e,this.n+c*e,r,O)),w+=t.sx*l+t.sn*u,T++,E&&D<E.length&&(E[D++]=t.ue*l+t.un*u),t);if(!this.placed){let e=0,t=o._0x5516d6;for(let i of t)e+=n.sample(this.e+s*i.x,this.n+c*i.x,r,O).h;o.reset(e/t.length+o.hzEq,o.thEq),o._0x0b01ec=null,this.placed=!0}o.step(e,k,{uFwd:this.u,u:this.u});let A=a.hullFilter===0||T===0?_:w/T,ee=a.cp;t.power==null?(t.sprint&&this.wPrime>0?ee=a._0x39dfcf:t.brake&&(ee=0),this.wPrime=Math.min(a._0x220b40,Math.max(0,this.wPrime-(ee-a.cp)*e)),this.wPrime<=0&&ee>a.cp&&(ee=a.cp)):ee=t.power;let j=this.u-v,M=0,N=0;if(a.disturb>0){let e=Math.sqrt(n.state.stats?.slopeVar??0),t=a.disturb*Math.min(2,e/.1);M=t*.35*gm(r,1.9,3.3,5.1,1.7),N=t*.04*gm(r,2.3,3.9,6.1,.9)}let P=ee>0?a.eta*ee/Math.max(this.u-(this.current[0]*s+this.current[1]*c),1.5):0,F=o.th-o.thS,I=1+a._0x1b25f3*F*F,L=t.brace||0,te=(a.c2*j*Math.abs(j)*(1+a._0x6adfa9*(this.steerSm*this.steerSm+M*M))*I+a.c4*j*j*j*Math.abs(j))*sm(j,a._0x6fbebf)*(t.brake?2.2:1)*(1-(t.draft||0))+a._0xec5b2e*L*j*Math.abs(j),ne=Math.min(500*a._0xd94007*o.awash*j*Math.abs(j)+o._0xb631b5*Math.max(j,0),.8*f),re=Math.min((a._0x8c9078*Math.max(o.motionPower,0)+a._0x8c9078*a._0xd72404*this.rollRate*this.rollRate)/Math.max(this.u,1.5),.5*f),ie=a._0x63da57*d*go*A*A,ae=n.dominant,oe=ae.omega/ae.k,se=Math.min(Math.max((this.u-oe*(ae.dx*s+ae.dy*c))/(this.u+oe),0),1),ce=-d*go*a._0x6f9fed*(1-a._0x692a92*se)*g,le=a._0x8ecc72>0?a._0x8ecc72*Math.min(1,Math.abs(g)/.08)*(1-se)*te:0,ue=(a._0xf3bf83*d*go*g*g+a._0x785bcb*d*Math.abs(g)*Math.abs(j))*se+le,de=0,fe=0,pe=this.wind,me=a._0xb23f0a??0;if(me>0&&pe&&(pe[0]||pe[1])){let e=pe[0]-s*this.u,t=pe[1]-c*this.u,n=e*s+t*c,r=e*l+t*u,i=.5*xm*me;de=i*a._0xfd7ed3*Math.abs(n)*n,fe=i*a._0x3f7dc7*Math.abs(r)*r}this._0x6b0489=de,this._0x7faa18=fe,this.u=Math.max(v+.02,this.u+((P+ce+de-te-ue-ne-re-ie)/d+b)*e),this._0xf33390={resist:te,waveRes:ue,pearl:ne,_0x044eb6:re,_0x1adeea:ie,vrel:j,brace:a._0xec5b2e*L*j*Math.abs(j)};let he=j+v,ge=(a.c2*he*Math.abs(he)*(1+a._0x6adfa9*(this.steerSm*this.steerSm+M*M))+a.c4*he*he*he*Math.abs(he))*sm(he,a._0x6fbebf)*(t.brake?2.2:1)*(1-(t.draft||0))+a._0xec5b2e*L*he*Math.abs(he);this._0x2afee8=ce+b*d-ue-ne-re-ie-(te-ge),this.pearl=ne,this._0x044eb6=re,this._0x1adeea=ie,this.thrust=P,this.slopeForce=ce,this.power=ee;let _e=n.dominant,ve=_e?p.sx*_e.dx+p.sn*_e.dy:0,ye=ve<-.01&&this.u>1.5,be=(a.waveLean??0)>0&&ye?Math.sign(A)*Math.min(a._0xcf574d??.26,(a.waveLean??0)*Math.atan(Math.abs(A))*Math.min(1,-ve/.04)):0,xe=this.waveLean??0;this.waveLean=xe+(be-xe)*Math.min(1,e*2);let Se=1-(a._0xa51398??0)*Math.min(1,Math.abs(this.waveLean)/(a._0xcf574d??.26));this._0xdf8a3e=A;let Ce=a._0xec5b2e*L*j*Math.abs(j)*a._0xe67d0d*(t.braceSide||0),we=a._0x20d602*Math.tanh(a._0x2a10a0*Ce/a._0x20d602),Te=Math.max(this.u,.2),R=a._0xe1ff95>0?(1-a._0xe1ff95)*Te+a._0xe1ff95*Math.max(.2,this.u-C-(this.current[0]*s+this.current[1]*c)):Te,Ee=((t.steer||0)+M)*a._0x75b649*(R/(R+2)),De=a.broach*(1-.5*Math.min(L,1))*Se*A*Math.min(Te/6,1.2),Oe=fe?-a._0xf42072*Math.tanh(a._0x2b70b1*fe/a._0xf42072)*(Te/(Te+1))*(a._0x14c428??1):0,ke;if(this.lat){let n=this.lat,r=(n.o._0x31e17f?0:De)+we+y+x+M*a._0x75b649*(R/(R+2)),i=o._0x5516d6.length,f=o._0x5516d6[i-1],m=o.hs?o.hs[i-1]-(o.hz+f.x*Math.sin(o.th)+f.keel):.04,g=p.ue*s+p.un*c,_=p.ue*l+p.un*u,b=h.ue*l+h.un*u;n.step(e,Math.max(j,.05),(t.steer||0)/.7*n.o._0x5c7dee*(Math.PI/180),fe?{Y:fe,N:fe*n.o._0x8339c2}:null,r,{du:g-C,wExt:(a.carry??1)*_-b,top:m,hull:E,mid:(a.carry??1)*_}),this.psi+=n.r*e,ke=n.v,this.u=Math.max(v+.02,this.u+(n.v*n.r+n.xG*n.r*n.r-n.Dr/d)*e),this._0x829557=n.Yr,this._0x24e639=n.load,this._0xdc9ffa=!!n._0xcc42d2,this._0xc38049=n._0xcc42d2,this._0x14eb46=n.imm;let S=this.yawParts??={};S.rudder=n.r-r,S.broach=De,S.brace=we,S.wind=0,S.ends=y+x}else{this.psi+=(Ee+De+we+Oe+y+x)*e;{let e=this.yawParts??={};e.rudder=Ee,e.broach=De,e.brace=we,e.wind=Oe,e.ends=y+x}ke=fe?Math.sign(fe)*Math.sqrt(Math.abs(fe)/(.5*Sm*a._0xfe490c))/(1+Te/a._0x99faf5):0}let z=(p.ue*l+p.un*u)*(a.carry??1)+ke+S;this.leeway=ke,this.latV=z,this.e+=(Math.sin(this.psi)*this.u+l*z)*e,this.n+=(Math.cos(this.psi)*this.u+u*z)*e,this.distance+=Math.max(this.u,0)*e;let Ae=n.sample(this.e+l*.35,this.n+u*.35,r,{}),B=n.sample(this.e-l*.35,this.n-u*.35,r,{});this.steerSm+=((t.steer||0)-this.steerSm)*Math.min(1,e*4);let je=this.steerSm*.22*Math.min(this.u/3,1.3),Me=this.roll-xe,Ne=Me+((a.hullFilter===0?Math.atan2(B.h-Ae.h,.7):-Math.atan(A))+je+N-Me)*Math.min(1,e*(a.hullFilter===0?8:4));return this.rollRate=(Ne-Me)/e,this.roll=Ne+this.waveLean,this.onRun=ce>.35*P&&g<-.02,this}};function Tm(e){e?vm.lateral3=e:delete vm.lateral3}var Em=Math.PI/180,Dm=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Om(e,t,n,r){let i=(e|0)^Math.imul(t|0,2654435761)^Math.imul(n|0,2246822519)^Math.imul(r|0,3266489917);return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var km={cellM:120,stretch:2,cover:.4,riseS:6,lifeS:45,veerDeg:8,speedFrac:.8},Am=class{constructor(e){Object.assign(this,km,e),this.gustMs??=this.windMs,this.lullMs??=this.windMs,this.seed=(this.seed??1)|0;let t=this.gustMs-this.windMs,n=this.windMs-this.lullMs;this.lullShare??=t+n>0?n>0?t/(t+n):0:.5;let r=(this.fromDeg+180)*Em;this.ae=Math.sin(r),this.an=Math.cos(r),this.v=this.speedFrac*this.windMs,this.bx=this.stretch*this.cellM,this.by=this.cellM,this.bt=this.lifeS/2,this.gusty=this.gustMs>this.windMs+.01||this.lullMs<this.windMs-.01}sample(e,t,n,r={}){let i=0,a=0,o=0;if(this.gusty&&this.cover>0){let r=e*this.ae+t*this.an,s=e*this.an-t*this.ae,c=r-this.v*n,l=Math.floor(c/this.bx),u=Math.floor(s/this.by),d=Math.floor(n/this.bt),f=Math.floor((n-this.lifeS)/this.bt),p=this.bx/2,m=this.by/2;for(let e=f;e<=d;e++)for(let t=l-1;t<=l+1;t++)for(let r=u-1;r<=u+1;r++){let l=Om(this.seed,t,r,e);if(l()>=this.cover)continue;let u=(t+l())*this.bx,d=(r+l())*this.by,f=n-(e+l())*this.bt,h=(l()<this.lullShare?-1:1)*(.6+.4*l()),g=.7+.6*l(),_=(2*l()-1)*this.veerDeg;if(f<=0||f>=this.lifeS)continue;let v=Dm(0,this.riseS,f)*Dm(0,this.riseS,this.lifeS-f),y=(c-u)/(p*g),b=(s-d)/(m*g),x=v*Math.exp(-y*y-b*b);x<1e-4||(i+=h*x,a+=_*x,o+=x)}}let s=Math.max(0,this.windMs+(this.gustMs-this.windMs)*Math.tanh(1.3*Math.max(i,0))-(this.windMs-this.lullMs)*Math.tanh(1.3*Math.max(-i,0))),c=this.fromDeg+(o>0?a/o*Math.min(1,o):0),l=(c+180)*Em;return r.ms=s,r.fromDeg=c,r.ve=s*Math.sin(l),r.vn=s*Math.cos(l),r.g=i,r}vector(e,t,n){let r=this.sample(e,t,n,this._v??={});return[r.ve,r.vn]}};function jm(e,t=1){let n=e?.windMs??0,r=e?.windFromDeg;if(!(n>0)||r==null)return null;let i=e.state?.gusts?.on?e.state.gusts:null,a=e.seaModel?.localWind??{},o=a.gustKt==null?i?Math.max(n,i.readMs??i.windMs):n:a.gustKt*.514444;return new Am({windMs:n,fromDeg:r,gustMs:o,lullMs:a.lullKt==null?Math.max(0,2*n-o):a.lullKt*.514444,seed:t,...i?{cover:i.coverage??km.cover,cellM:i.patchM??km.cellM,stretch:i.stretch??km.stretch}:{},...Object.fromEntries([`cover`,`cellM`,`stretch`,`riseS`,`lifeS`,`lullShare`,`veerDeg`,`speedFrac`].filter(e=>a[e]!=null).map(e=>[e,a[e]]))})}var Mm=`
uniform vec4 uLWp0, uLWp1, uLWp2;
uniform int uLWSeed;
uint lwH;
float lwNext() { lwH += 0x6d2b79f5u; uint t = (lwH ^ (lwH >> 15u)) * (1u | lwH); t = (t + (t ^ (t >> 7u)) * (61u | t)) ^ t; return float(t ^ (t >> 14u)) / 4294967296.0; }
float lwSample(vec2 en, float t) {
float ae = uLWp0.x, an = uLWp0.y, v = uLWp0.z, cover = uLWp0.w, bx = uLWp1.x, by = uLWp1.y, bt = uLWp1.z, life = uLWp1.w, rise = uLWp2.x, lullShare = uLWp2.y;
float a = en.x * ae + en.y * an, c = en.x * an - en.y * ae, xi = a - v * t;
int i0 = int(floor(xi / bx)), j0 = int(floor(c / by)), m1 = int(floor(t / bt)), m0 = int(floor((t - life) / bt));
float la = bx * 0.5, lc = by * 0.5, g = 0.0;
for (int m = m0; m <= m1; m++) for (int i = i0 - 1; i <= i0 + 1; i++) for (int j = j0 - 1; j <= j0 + 1; j++) {
lwH = uint(uLWSeed) ^ (uint(i) * 0x9e3779b1u) ^ (uint(j) * 0x85ebca77u) ^ (uint(m) * 0xc2b2ae3du);
if (lwNext() >= cover) continue;
float xc = (float(i) + lwNext()) * bx, cc = (float(j) + lwNext()) * by, tb = (float(m) + lwNext()) * bt, age = t - tb;
bool lull = lwNext() < lullShare; float amp = (lull ? -1.0 : 1.0) * (0.6 + 0.4 * lwNext()), size = 0.7 + 0.6 * lwNext(); lwNext();
if (age <= 0.0 || age >= life) continue;
float env = smoothstep(0.0, rise, age) * smoothstep(0.0, rise, life - age), da = (xi - xc) / (la * size), dc = (c - cc) / (lc * size);
g += amp * env * exp(-da * da - dc * dc);
}
return g;
}
`;function Nm(e){return{p0:[e.ae,e.an,e.v,e.cover],p1:[e.bx,e.by,e.bt,e.lifeS],p2:[e.riseS,e.lullShare,e.veerDeg,0],seed:e.seed|0}}var Pm=[60,100,120,140,150,160,170,180],Fm=600,Im=.2/60,Lm=10;function Rm(e,t,n){let r=n,i=Math.max(0,e);for(let e=1;e<r.length;e++){let n=r[e-1]*t,a=r[e]*t;if(i<=a)return Pm[e-1]+(Pm[e]-Pm[e-1])*(a>n?(i-n)/(a-n):1)}return Pm[Pm.length-1]}function zm(e,t,n,r,i,a){let o=Rm(t,n,r),s=Pm[0],c=Pm[Pm.length-1],l=o+Math.min(Lm,Math.max(0,i-Fm)*Im)*((o-s)/(c-s)),u=l>e?60:80;return e+(l-e)*(1-Math.exp(-a/u))}var Bm=[{key:`plane`,min:1,max:3,assign:`_0x6fbebf`},{key:`push`,min:.25,max:2,params:[`_0x6f9fed`]},{key:`drag`,min:.5,max:1.6,params:[`c2`,`c4`]},{key:`eta`,min:.6,max:1.4,params:[`eta`]},{key:`mass`,min:.7,max:1.4,params:[`mass`]},{key:`broach`,min:0,max:2.5,params:[`broach`]},{key:`turn`,min:.5,max:1.8,params:[`_0x75b649`]},{key:`rudder`,min:0,max:2.5,params:[`_0x6adfa9`]},{key:`pitchI`,min:1,max:15,def:6,abs:100,boat:[`ip`]},{key:`yieldK`,min:0,max:3,boat:[`yieldK`]},{key:`yieldT`,min:.3,max:4,boat:[`yieldT`]},{key:`knee`,min:.25,max:4,boat:[`_0x2491c9`]},{key:`pitchD`,min:0,max:8,def:0,abs:1e3,boat:[`_0xcabfd4`]},{key:`deck`,min:0,max:3,boat:[`_0x2ab601`]},{key:`drain`,min:.3,max:4,boat:[`_0x59b569`]},{key:`sap`,min:0,max:1,def:.5,assign:`_0x8ecc72`},{key:`disturb`,min:0,max:2,def:0,assign:`disturb`},{key:`braceD`,min:0,max:3,params:[`_0xec5b2e`]},{key:`braceT`,min:0,max:3,params:[`_0x2a10a0`]},{key:`pearl`,min:0,max:3,params:[`_0xd94007`]},{key:`wind`,min:0,max:2,assign:`_0xb23f0a`}],Vm=Bm.map(e=>e.key),Hm=.05;function Um(e){let t={};for(let n of Bm){let r=Number(e?.[n.key]);t[n.key]=Number.isFinite(r)&&e?.[n.key]!==null&&e?.[n.key]!==``?Math.round(Math.min(n.max,Math.max(n.min,r))/Hm)*Hm:n.def??1,t[n.key]=+t[n.key].toFixed(2)}return t}var Wm=()=>Um({}),Gm=Object.fromEntries(Bm.map(e=>[e.key,e.def??1])),Km=e=>Vm.every(t=>Math.abs(Um(e)[t]-Gm[t])<1e-9);function qm(e,t){let n=Um(t),r={...e};for(let e of Bm)if(e.assign)(e.def!=null||n[e.key]!==1)&&(r[e.assign]=n[e.key]);else if(e.params)for(let t of e.params)Number.isFinite(r[t])&&(r[t]*=n[e.key]);return r}function Jm(e,t){let n=Um(t);for(let t of Bm)if(t.boat)for(let r of t.boat)t.abs?e[r]=t.abs*n[t.key]:Number.isFinite(e[r])&&e[r]<1e6&&(e[r]*=n[t.key])}var Ym=e=>{let t=Um(e);return Vm.filter(e=>Math.abs(t[e]-Gm[e])>1e-9).map(e=>`${e}:${t[e]}`).join(`,`)};function Xm(e){let t={};for(let n of String(e??``).split(`,`)){let[e,r]=n.split(`:`);Vm.includes(e)&&(t[e]=Number(r))}return Um(t)}ds[Fs]._0xbd9c94;function Zm(e){let t=e?.windMs??0,n=e?.windFromDeg;if(!(t>0)||n==null)return[0,0];let r=(n+180)*Math.PI/180;return[t*Math.sin(r),t*Math.cos(r)]}ds[Fs].maxW;var Qm=.545,$m=.74,eh=1.24,th=.4,nh=.2,rh=3,ih=.7,ah=.7,oh=.65,sh=3,ch=.5,lh=.15,uh=.04,dh=[0,.25,.5,.75,1,1.35,1.7,2.05],fh=(e,t)=>dh.reduce((n,r,i)=>Math.abs(r*t-e)<Math.abs(dh[n]*t-e)?i:n,0),ph=.8,mh=[0,0,1,3],hh=.25;function gh(e,t,n){if(e<=3)return n>.89408?`glide`:`idle`;let r=fh(e,t);return r>=6?`sprint`:r===5?`power on`:r===4?`tempo`:`low power`}var _h=e=>{let t=Math.min(3,Math.max(0,e)),n=Math.min(2,Math.floor(t));return mh[n]+(mh[n+1]-mh[n])*(t-n)},vh=.5,yh=`e.n.psi.u.z.pitch.roll.wPrime.steerSm.waveLean.distance.onRun.slopeForce.thrust.power.hz.vz.pitchRate.thS.rollRate.awash.pearl.motionPower.wet.uzp.maprev.aeff.defl.deckw.lv.lr.ls.lvent.ldw.hr`.split(`.`),bh=[`t`,`e`,`n`,`psi`,`u`,`z`,`pitch`,`roll`,`power`,`wPrime`,`phase`,`splash`,`spray`,`encounter`,`plunge`,`bury`,`m0`,`m1`,`m2`,`m3`,`m4`,`bl`],xh=e=>[e.t,e.e,e.n,e.psi,e.u,e.z,e.pitch,e.roll,e.power,e.wPrime,e.phase??0,e.splash??0,e.spray??0,e.encounter??0,e.plunge??0,e.bury??-1,...e.mix??[1,0,0,0,0],e.braceLevel??0].map((e,t)=>t===0?+e.toFixed(4):+Number(e).toFixed(6));function Sh(e,t){let n={};t.forEach((t,r)=>{n[t]=e[r]});let r={...n,mix:[n.m0,n.m1,n.m2,n.m3,n.m4??0],braceLevel:n.bl??0};return delete r.m0,delete r.m1,delete r.m2,delete r.m3,delete r.m4,delete r.bl,r}var Ch=(e,t)=>Object.keys(e).every(n=>Math.abs(e[n]-t[n])<1e-9),wh=class{constructor(e,t,n=null,r=Fs,i=`v2`){this.h=e.stepS??.008333333333333333,this.scn=e,this.field=t,this.depthFn=n,this.model=i,this.paddlerName=ds[r]?r:Fs,this.paddler0=this.paddlerName,this.prof=ds[this.paddlerName];let a=wm;this.Model=a,this.tune0=Um(e.tune),this.tune={...this.tune0},this.windSeed=(e.windSeed??e.state?.seed??1)|0,this.localWind=jm(e,this.windSeed),this.ski=this.buildSki(this.tune),this.ski.current=e.current??[0,0],this.draft=0,this.restart()}buildSki(e){let t=new this.Model(qm({...this.Model.defaults(),...this.prof.boat,cp:this.prof._0xbd9c94,_0x220b40:this.prof.wPrime},e));return t.boat?.params&&(t.boat.params._0xd94007*=e.pearl,Jm(t.boat.params,e)),t.current=this.scn.current??[0,0],t.wind=Zm(this.scn),t.hr=100,t}tuneAt(e){let t=this.tune0;for(let n of this.events)n.k===`tune`&&n.i<=e&&(t=n.v);return{...t}}paddlerAt(e){let t=this.paddler0;for(let n of this.events)n.k===`paddler`&&n.i<=e&&(t=n.v);return t}swapBoat(e,t){let n=this.getState(),r=this.prof.wPrime>0?n.wPrime/this.prof.wPrime:1;this.tune=Um(e),this.paddlerName=ds[t]?t:this.paddlerName,this.prof=ds[this.paddlerName],this.ski=this.buildSki(this.tune),this.setState(n),this.ski.wPrime=r*this.prof.wPrime,this.target=Math.min(this.target,this.prof.maxW),this.power=Math.min(this.power,this.prof.maxW)}retune(e){this.swapBoat(e,this.paddlerName)}setPaddler(e){return!ds[e]||e===this.paddlerName?!1:(this.apply({i:this.i,k:`paddler`,v:e},!0),!0)}setTune(e){let t=Um(e);return!Ch(t,this.tune)&&(this.apply({i:this.i,k:`tune`,v:t},!0),!0)}setStep(e){if(e===this.h)return!0;let t=this.i*this.h/e;return Math.abs(t-Math.round(t))>1e-6?!1:(this.i=Math.round(t),this.h=e,this.carry=0,!0)}get dt(){return this.h*2}get t(){return(this.frames.length-1)*this.dt}restart(){let e=this.scn.start??{e:0,n:0};(!Ch(this.tune,this.tune0)||this.paddlerName!==this.paddler0)&&(this.tune={...this.tune0},this.paddlerName=this.paddler0,this.prof=ds[this.paddler0],this.ski=this.buildSki(this.tune)),this.ski.reset(e.e,e.n,this.scn.headingDeg,this.scn.speed),this.ski.current=this.scn.current??[0,0],this.target=this.prof._0xbd9c94,this.power=this.prof._0xbd9c94,this.autoPower=!1,this.upHeld=!1,this.downHeld=!1,this.holdT=0,this.steerCmd=0,this.steerIn=0,this.phase=0,this.glide=null,this.i=0,this.aground=!1,this.braceLevel=0,this.levelT=0,this.lvS=0,this.upHoldT=0,this.sideT=0,this.mode=`paddle`,this.sticky=!1,this.modeT=0,this.side=0,this.braceWhy=``,this.tapCount=0,this.lastTapI=-1e9,this.holdDownT=0,this.w=[1,0,0],this.wv=[0,0,0],this.sideS=0,this.sideV=0,this.events=[],this.frames=[],this.states=[],this.scratch={},this.record()}record(){let e=Up(this.ski,this.i*this.h,this.phase);e.mix=[this.w[0],this.w[1],this.w[2],this.sideS,this.lvS],e.braceLevel=this.mode===`brace`?this.braceLevel:0,this.frames.push(e),this.states.push(this.getState())}getState(){let e={i:this.i,clashI:this.clashI??-1,target:this.target,upHeld:this.upHeld,downHeld:this.downHeld,holdT:this.holdT,power:this.power,steerCmd:this.steerCmd,steerIn:this.steerIn,phase:this.phase,glide:this.glide&&{...this.glide},mode:this.mode,sticky:this.sticky,modeT:this.modeT,side:this.side,braceWhy:this.braceWhy,tapCount:this.tapCount,lastTapI:this.lastTapI,holdDownT:this.holdDownT,w:[...this.w],wv:[...this.wv],sideS:this.sideS,sideV:this.sideV,braceLevel:this.braceLevel,levelT:this.levelT,lvS:this.lvS,upHoldT:this.upHoldT,sideT:this.sideT,autoPower:this.autoPower};for(let t of yh)e[t]=this.ski[t];return e}setState(e){this.i=e.i,this.clashI=e.clashI??-1,this.target=e.target,this.upHeld=e.upHeld,this.downHeld=e.downHeld,this.holdT=e.holdT,this.power=e.power,this.steerCmd=e.steerCmd,this.steerIn=e.steerIn,this.phase=e.phase,this.glide=e.glide?{...e.glide}:null,this.mode=e.mode??`paddle`,this.sticky=e.sticky??!1,this.modeT=e.modeT??0,this.side=e.side??0,this.braceWhy=e.braceWhy??``,this.tapCount=e.tapCount??0,this.lastTapI=e.lastTapI??-1e9,this.holdDownT=e.holdDownT??0,this.w=e.w?[...e.w]:[1,0,0],this.wv=e.wv?[...e.wv]:[0,0,0],this.sideS=e.sideS??0,this.sideV=e.sideV??0,this.braceLevel=e.braceLevel??0,this.levelT=e.levelT??0,this.lvS=e.lvS??0,this.upHoldT=e.upHoldT??0,this.sideT=e.sideT??0,this.autoPower=e.autoPower??!1;for(let t of yh)this.ski[t]=e[t]}setPower(e){e!==(this.autoPower?this.target:null)&&this.apply({i:this.i,k:`power`,v:e},!0)}setSteer(e){e!==this.steerCmd&&this.apply({i:this.i,k:`steer`,v:e},!0)}setUp(e){e!==this.upHeld&&this.apply({i:this.i,k:`up`,v:e},!0)}setDown(e){e!==this.downHeld&&this.apply({i:this.i,k:`down`,v:e},!0)}setBrace(e){let t=Math.max(1,Math.min(3,Math.round(e)));(this.mode!==`brace`||t!==this.braceLevel||this.autoPower)&&this.apply({i:this.i,k:`brace`,v:t},!0)}bump(e){this.apply({i:this.i,k:`bump`,v:e},!0)}clash(e=.4){this.apply({i:this.i,k:`clash`,v:e},!0)}apply(e,t=!1){if(e.k===`move`||e.k===`turn`)return this.teleport(e);if(e.k===`bump`){let t=this.ski,n=t.e+e.v.de,r=t.n+e.v.dn;(!this.depthFn||this.depthFn(n,r)>=ah)&&(t.e=n,t.n=r),t.psi+=e.v.dpsi,t.u=Math.max(.05,t.u+e.v.du)}else e.k===`clash`&&(this.clashI=this.i+Math.round(e.v/this.h),this.power=0);if(e.k===`tune`)this.retune(e.v);else if(e.k===`paddler`)this.swapBoat(this.tune,e.v);else if(e.k===`steer`)this.steerCmd=e.v;else if(e.k===`power`)e.v==null?this.autoPower=!1:(this.mode!==`paddle`&&this.setMode(`paddle`),this.autoPower=!0,this.holdT=0,this.upHeld=!1,this.downHeld=!1,this.target=Math.min(this.prof.maxW,Math.max(0,e.v)));else if(e.k===`up`){if(this.upHeld=e.v,e.v&&(this.autoPower=!1),e.v&&this.mode===`brace`)this.downHeld=!1,this.upHoldT=0,--this.braceLevel,this.braceLevel<=0&&this.setMode(`idle`);else if(e.v){let e=this.mode===`paddle`;e||this.setMode(`paddle`),this.downHeld=!1,this.holdT=th,e&&(this.target=this.stepLevel(1))}}else e.k===`down`?(this.downHeld=e.v,e.v&&(this.autoPower=!1),e.v&&(this.pressDown(),this.upHeld=!1,this.holdT=th,this.mode===`paddle`&&(this.target=this.stepLevel(-1)))):e.k===`brace`&&(this.autoPower=!1,this.upHeld=!1,this.downHeld=!1,this.holdT=0,this.mode!==`brace`&&this.setMode(`brace`),this.braceLevel=e.v,this.sticky=!0);t&&(this.events.push(e),this.states.length&&this.states[this.states.length-1].i===this.i&&(this.states[this.states.length-1]=this.getState()))}strafe(e,t){return this.jump({i:this.i,k:`move`,f:e,r:t})}turn(e){return this.jump({i:this.i,k:`turn`,deg:e})}jump(e){if(!this.apply(e,!1))return!1;if(this.events.push(e),this.i%2==0&&this.states[this.states.length-1]?.i!==this.i)this.record();else{let e=this.frames.length-1,t=Up(this.ski,this.i*this.h,this.phase);t.mix=[this.w[0],this.w[1],this.w[2],this.sideS,this.lvS],t.braceLevel=this.mode===`brace`?this.braceLevel:0,this.frames[e]={...t,t:this.frames[e].t},this.states[e]=this.getState()}return this.frames[this.frames.length-1].jump=!0,!0}teleport(e){let t=this.ski;if(e.k===`turn`)return t.psi+=e.deg*Math.PI/180,!0;let n=Math.sin(t.psi),r=Math.cos(t.psi),i=t.e+n*e.f+r*e.r,a=t.n+r*e.f-n*e.r;return this.depthFn&&this.depthFn(i,a)<ah?!1:(t.e=i,t.n=a,this.scratch={},this.aground=!1,t.settle?t.settle():t.placed=!1,!0)}setMode(e){let t=this.mode;this.mode=e,this.modeT=0,e===`paddle`&&t!==`paddle`&&(this.target=dh[1]*this.prof._0xbd9c94),e!==`paddle`&&(this.target=0),e===`brace`?(t!==`brace`&&(this.braceLevel=1),this.chooseBraceSide()):this.braceLevel=0,e===`paddle`&&(this.tapCount=0,this.sticky=!1)}stepLevel(e){let t=this.prof._0xbd9c94,n=this.target;if(e>0){for(let e=1;e<dh.length;e++)if(dh[e]*t>n+1.5)return Math.min(this.prof.maxW,dh[e]*t);return Math.min(this.prof.maxW,n+.35*t)}for(let e=dh.length-1;e>=0;e--)if(dh[e]*t<n-1.5)return dh[e]*t;return 0}pressDown(){this.tapCount=(this.i-this.lastTapI)*this.h<oh?this.tapCount+1:1,this.lastTapI=this.i,this.levelT=0,this.mode===`paddle`&&this.power<=3&&(this.setMode(`idle`),this.sticky=!0),this.mode===`paddle`?this.tapCount>=sh&&(this.setMode(`idle`),this.sticky=!0):this.mode===`idle`?(this.setMode(`brace`),this.sticky=!0):this.mode===`brace`&&(this.braceLevel=Math.min(3,this.braceLevel+1))}chooseBraceSide(){let e=this.steerIn||this.steerCmd,t=this.ski._0xdf8a3e??0;if(Math.abs(e)>lh)this.side=Math.sign(e),this.braceWhy=`turn`;else if(Math.abs(t)>uh)this.side=Math.sign(t),this.braceWhy=`face`;else{let e=(this.phase/(2*Math.PI)%1+1)%1;this.side=e<.5?1:-1,this.braceWhy=`stroke`}this.sideT=0,this.w[2]<.05&&(this.sideS=this.side,this.sideV=0)}stepMode(){if(this.modeT+=this.h,this.holdDownT=this.downHeld?this.holdDownT+this.h:0,this.mode===`paddle`&&this.power<5&&this.target<5?(this.setMode(`idle`),this.sticky=!0,this.levelT=0):this.mode===`idle`&&this.downHeld?(this.levelT+=this.h,this.levelT>=ch&&(this.setMode(`brace`),this.levelT=0)):this.mode===`brace`&&this.downHeld&&(this.levelT+=this.h,this.levelT>=.6&&this.braceLevel<3&&(this.braceLevel++,this.levelT=0)),this.downHeld||(this.levelT=0),this.mode===`brace`&&this.upHeld?(this.upHoldT+=this.h,this.upHoldT>=.5&&(this.setMode(`paddle`),this.upHoldT=0)):this.upHoldT=0,this.mode===`brace`){this.sideT+=this.h;let e=this.ski.steerSm*.22*Math.min(this.ski.u/3,1.3);this.sideT>=ph&&e*this.side<-.04&&(this.side=-this.side,this.braceWhy=`roll`,this.sideT=0)}this.lvS+=((this.mode===`brace`?this.braceLevel:0)-this.lvS)*(1-Math.exp(-this.h/hh));let e=[+(this.mode===`paddle`),+(this.mode===`idle`),+(this.mode===`brace`)];for(let t=0;t<3;t++)this.wv[t]+=(64*(e[t]-this.w[t])-16*this.wv[t])*this.h,this.w[t]+=this.wv[t]*this.h;this.sideV+=(64*(this.side-this.sideS)-16*this.sideV)*this.h,this.sideS+=this.sideV*this.h}advance(e,t=null){this.carry=(this.carry??0)+e;let n=Math.floor(this.carry/this.h);this.carry-=n*this.h;for(let e=0;e<n;e++)this.stepOnce(t);return this.t}stepOnce(e){if(e)for(;e.pos<e.events.length&&e.events[e.pos].i<=this.i;)this.apply(e.events[e.pos++],!1);let t=this.ski;this.i%2==0&&this.states[this.states.length-1]?.i!==this.i&&this.record();let n=this.holdT>0;n&&(this.holdT-=this.h);let r=this.prof._0xbd9c94;if(this.downHeld&&!n)this.target=Math.max(0,this.target-eh*r*this.h);else if(this.upHeld&&this.mode===`paddle`&&!n)this.target=Math.min(this.prof.maxW,this.target+$m*r*this.h);else if(!n){if(this.mode!==`paddle`)this.target=0;else if(this.target>r&&!this.autoPower){let e=r-this.target,t=Qm*r*this.h;this.target+=Math.abs(e)<t?e:-t}}this.power+=(this.target-this.power)*(1-Math.exp(-this.h/nh));let i=this.prof.cpW;this.ski.wPrime<=0&&this.power>i&&(this.power=i),this.i<(this.clashI??-1)&&(this.power=0),this.ski.wPrime=this.power>i?Math.max(0,this.ski.wPrime-(this.power-i)*this.h):Math.min(this.prof.wPrime,this.ski.wPrime+vh*(i-this.power)*this.h),this.ski.hr=zm(this.ski.hr??100,this.power,this.prof._0xbd9c94,dh,this.i*this.h,this.h);let a=this.steerCmd-this.steerIn,o=rh*this.h;this.steerIn+=Math.abs(a)<o?a:Math.sign(a)*o,this.stepMode();let s=t.e,c=t.n;if(this.localWind&&(t.wind=this.localWind.vector(t.e,t.n,this.i*this.h)),t.step(this.h,{steer:this.steerIn*ih,power:this.power,brace:_h(this.lvS),braceSide:this.sideS,draft:this.draft},this.field,this.i*this.h,this.scratch),this.depthFn&&this.depthFn(t.e,t.n)<ah?(t.e=s,t.n=c,t.u=Math.max(.3,Math.min(t.u,.6)),this.aground=!0):this.aground=!1,this.scn.fixedSpeed>0&&(t.u=this.scn.fixedSpeed),this.power>5){let e=is(this.prof,this.power,this.phase,this.glide,this.h);this.phase=e.phase,this.glide=e.glide}this.i++}truncateTo(e){e=Math.max(0,Math.min(e,this.frames.length-1));let t=this.states[e],n=this.tuneAt(t.i),r=this.paddlerAt(t.i);this.frames.length=e,this.states.length=e,(!Ch(n,this.tune)||r!==this.paddlerName)&&(this.tune=n,this.paddlerName=r,this.prof=ds[r],this.ski=this.buildSki(n)),this.setState(t),this.record(),this.events=this.events.filter(e=>e.i<=t.i),this.carry=0,this.aground=!1}avgSpeed(e=1/0){let t=this.states.length-1;if(t<1)return this.ski.u;let n=Number.isFinite(e)?Math.max(0,t-Math.round(e/this.dt)):0,r=(t-n)*this.dt;return r>0?(this.states[t].distance-this.states[n].distance)/r:this.ski.u}surfShare(){let e=0,t=this.states.length;for(let n=0;n<t;n++)this.states[n].onRun&&e++;return t?e/t:0}makeClip(e,t,n={}){e=Math.max(0,e),t=Math.min(this.frames.length-1,t);let r=this.states[e],i=this.states[t];return{kind:`surfski-clip`,version:2,...n,...this.scn.fixedSpeed>0?{fixedSpeed:this.scn.fixedSpeed}:{},...Km(this.tuneAt(r.i))?{}:{tune:this.tuneAt(r.i)},scenario:this.scn.name,paddler:this.paddlerAt(r.i),model:this.model,windSeed:this.windSeed,start:r,steps:i.i-r.i,events:this.events.filter(e=>e.i>r.i&&e.i<=i.i),frameKeys:bh,frames:this.frames.slice(e,t+1).map(xh),track:this.frames.slice(e,t+1).filter((e,t)=>t%15==0).map(e=>[+e.t.toFixed(2),+e.e.toFixed(1),+e.n.toFixed(1),+e.u.toFixed(2)])}}};function Th(e,t,n,r=null){let i=new wh({...t,tune:e.tune??null,fixedSpeed:e.fixedSpeed??null,windSeed:e.windSeed??t.windSeed},n,r,e.paddler,e.model??`v1`);i.frames=[],i.states=[],i.events=[],i.setState(e.start),i.record();let a={events:e.events,pos:0};if(i.advance((e.steps+1)*Hp+1e-9,a),Array.isArray(e.frames)&&e.frameKeys){let t=Math.min(e.frames.length,i.frames.length);for(let n=0;n<t;n++){let t=Sh(e.frames[n],e.frameKeys);i.frames[n]={...i.frames[n],...t};let r=i.states[n];if(r)for(let e of[`e`,`n`,`psi`,`u`,`pitch`,`roll`,`power`,`wPrime`,`phase`])r[e]=t[e]}i.frames.length=t,i.states.length=Math.min(i.states.length,t),i.recorded=!0}return i}var Eh=9.81;function Dh(e,{ns:t=160,nz:n=10,smoothM:r=.08}={}){let i=e.spec.L,a=e.hzEq,o=e.thEq,s=new Float64Array(t),c=new Float64Array(t),l=0;for(let n=0;n<t;n++){let r=(n+.5)/t;s[n]=(.5-r)*i,c[n]=Math.max(0,-(a+s[n]*Math.sin(o)+e.keelRel(r))),l=Math.max(l,c[n])}let u=l/n,d=new Float64Array(t*n),f=-i/2;for(let r=0;r<t;r++){let a=(r+.5)/t,o=e.keelRel(a),l=e.deckRel(a)-o,p=e.halfWidth(a),m=e.bottomK(a),h=-i/2+a*i;for(let t=0;t<n;t++){let i=c[r]-(t+.5)*u;d[r*n+t]=i>0?p*e.profile(i/l,m,h):0}d[r*n]>.002&&s[r]>f&&(f=s[r])}if(r>0){let e=r/(i/t),a=Math.ceil(3*e),o=Array.from({length:2*a+1},(t,n)=>Math.exp(-((n-a)**2)/(2*e*e))),s=new Float64Array(t);for(let e=0;e<n;e++){for(let r=0;r<t;r++){let i=0,c=0;for(let s=-a;s<=a;s++){let l=r+s;l<0||l>=t||(i+=o[s+a]*d[l*n+e],c+=o[s+a])}s[r]=i/c}for(let r=0;r<t;r++)d[r*n+e]=s[r]}}let p=e=>Math.min(t-1,Math.max(0,Math.round((.5-e/i)*t-.5))),m=f-.6,h=Math.atan(d[p(f-.3)*n]/.3),g=0;for(let e=0;e<t;e++)g=Math.max(g,d[e*n]);return{x:s,dxs:i/t,dz:u,nz:n,ns:t,Y:d,draft:l,xStem:f,bowX:m,bowDraft:c[p(m)],alpha:h,L:i,halfB:g,halfWL:e=>d[p(e)*n]}}var Oh=new Map;function kh(e){if(!Oh.has(e)){let t=Math.round(Math.log2(e)),n=new Uint32Array(e),r=new Float64Array(e/2),i=new Float64Array(e/2);for(let r=0;r<e;r++){let e=0;for(let n=0;n<t;n++)e|=(r>>n&1)<<t-1-n;n[r]=e}for(let t=0;t<e/2;t++)r[t]=Math.cos(2*Math.PI*t/e),i[t]=Math.sin(2*Math.PI*t/e);Oh.set(e,{rev:n,cos:r,sin:i})}return Oh.get(e)}function Ah(e,t,n,r,i){let{rev:a,cos:o,sin:s}=kh(i);for(let o=0;o<i;o++){let i=a[o];if(i>o){let a=n+o*r,s=n+i*r,c=e[a];e[a]=e[s],e[s]=c,c=t[a],t[a]=t[s],t[s]=c}}for(let a=2;a<=i;a<<=1){let c=a>>1,l=i/a;for(let u=0;u<i;u+=a)for(let i=0;i<c;i++){let a=o[i*l],d=s[i*l],f=n+(u+i)*r,p=f+c*r,m=e[p]*a-t[p]*d,h=e[p]*d+t[p]*a;e[p]=e[f]-m,t[p]=t[f]-h,e[f]+=m,t[f]+=h}}}function jh(e,t,n,r){for(let i=0;i<r;i++)Ah(e,t,i*n,1,n);for(let i=0;i<n;i++)Ah(e,t,i,n,r)}var Mh={coarse:{Nx:512,Ny:256,dx:.25,ahead:14,fadeM:32},fine:{Nx:512,Ny:256,dx:.04,ahead:3.5,fadeM:5},kSplit:6,kMaxShare:.6,wedge:{deg:23,near:.6,soft:.6,softPerM:.085,keepAhead:.3,aheadM:1.2}},Nh=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Ph(e,t,n,r=Mh.wedge){let i=Math.max(0,e.xStem-t),a=e.halfB+r.near+i*Math.tan(r.deg*Math.PI/180);return(1-Nh(a,a+r.soft+r.softPerM*i,Math.abs(n)))*(1-Nh(e.xStem+r.keepAhead,e.xStem+r.aheadM,t))}function Fh(e,t,n={}){let r={...Mh.coarse,kHi:Mh.kMaxShare*Math.PI/(n.dx??Mh.coarse.dx),kLo:0,...n},{Nx:i,Ny:a,dx:o}=r,s=i*o,c=a*o,l=r.ahead-s,u=-c/2,d=i*a,f=new Float64Array(d),p=new Float64Array(d),m=new Float64Array(d),h=new Float64Array(d),g=t*t,_=t/(2*r.fadeM),{ns:v,nz:y,x:b,dxs:x,dz:S,Y:C}=e,w=e=>Math.exp(-((e/r.kHi)**4))*(r.kLo>0?1-Math.exp(-((e/r.kLo)**4)):1),T=new Float64Array(y),E=new Float64Array(y);new Float64Array(y);for(let e=0;e<i;e++){let n=e<i/2?e:e-i,r=2*Math.PI*n/s;if(n===0)continue;T.fill(0),E.fill(0);for(let e=0;e<v;e++){let t=Math.cos(r*b[e])*x,n=-Math.sin(r*b[e])*x;for(let r=0;r<y;r++){let i=C[e*y+r];i&&(T[r]+=i*t,E[r]+=i*n)}}let o=Math.cos(r*l),d=Math.sin(r*l);for(let n=0;n<a;n++){let s=n<a/2?n:n-a,l=2*Math.PI*s/c,v=Math.hypot(r,l),b=w(v);if(b<1e-6)continue;let x=0,C=0,D=Math.exp(-v*S),O=Math.exp(-.5*v*S);for(let e=0;e<y;e++)x+=T[e]*O,C+=E[e]*O,O*=D;let k=Eh*v-g*r*r,A=-2*_*t*r,ee=k*k+A*A,j=-2*g*r*r*S*b/ee,M=j*(x*k+C*A),N=j*(C*k-x*A),P=l*u,F=Math.cos(P),I=Math.sin(P),L=o*F-d*I,te=o*I+d*F,ne=M*L-N*te;N=M*te+N*L,M=ne;let re=n*i+e;f[re]=(1-r)*M,p[re]=(1-r)*N,m[re]=-l*N,h[re]=l*M}}jh(f,p,i,a),jh(m,h,i,a);let D=1/(s*c),O=new Float32Array(d*4),k=.001;for(let t=0;t<a;t++)for(let n=0;n<i;n++){let a=t*i+n,s=l+n*o,c=u+t*o,d=f[a]*D,h=r.wedge===!1||e.xStem==null||e.halfB==null?1:Ph(e,s,c,r.wedge??Mh.wedge);if(h<=0)continue;let g=h>=1?0:(Ph(e,s+k,c)-Ph(e,s-k,c))/(2*k),_=h>=1?0:(Ph(e,s,c+k)-Ph(e,s,c-k))/(2*k);O[4*a]=h*d,O[4*a+1]=h*p[a]*D+g*d,O[4*a+2]=h*m[a]*D+_*d}return{Nx:i,Ny:a,dx:o,x0:l,y0:u,U:t,data:O}}function Ih(e,t){let n=Fh(e,t,{...Mh.coarse,kHi:Mh.kSplit}),r=Fh(e,t,{...Mh.fine,kLo:Mh.kSplit,kHi:Mh.kMaxShare*Math.PI/Mh.fine.dx}),i=(e,t,n)=>{let r=(t-e.x0)/e.dx,i=(n-e.y0)/e.dx,a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=e.data,u=e.Nx,d=(e,t)=>l[4*(t*u+e)];return(d(a,o)*(1-s)+d(a+1,o)*s)*(1-c)+(d(a,o+1)*(1-s)+d(a+1,o+1)*s)*c},a=0;for(let t=e.xStem+.1;t>e.xStem-1;t-=.02){let o=e.halfWL(t)+.03;a=Math.max(a,i(n,t,o)+i(r,t,o))}let o=Rh(t,e.bowDraft,e.alpha);return{coarse:n,fine:r,U:t,crest:a,FD:o.FD,Zb:o.Zb,bowGain:zh(o.FD)}}function Lh(e){let t=new Uint16Array(e.length),n=new Float32Array(1),r=new Uint32Array(n.buffer);for(let i=0;i<e.length;i++){n[0]=e[i];let a=r[0],o=a>>>16&32768,s=(a>>>23&255)-112,c=a&8388607;s<=0?t[i]=s<-10?o:o|(c|8388608)>>1-s+13:t[i]=s>=31?o|31744:o|s<<10|c>>13}return t}function Rh(e,t,n){let r=e/Math.sqrt(Eh*Math.max(t,1e-4)),i=e*e/Eh;return{Zb:i*2.2*Math.tan(n)/(Math.cos(n)*(1+r)),Tb:i*1.1/(1+r),FD:r}}var zh=e=>Math.min(2.4,Math.max(1,1.023+.44*Math.log(Math.max(e,.001))));function Bh(e,t,n,r){if(!(e>0)||!(t>0)||!(n>0)||!(r>0))return 0;let i=(e,t)=>e*e/(1+e/Math.sqrt(Eh*t));return i(e,t)/i(n,r)}var Vh={step:1.03,uMin:.6,uMax:8,fadeS:.4,bowTau:.12,fields:12},Hh=.5,Uh=400,Wh=8,Gh=.2,Kh=300,qh=e=>Vh.step**+Math.round(Math.log(e)/Math.log(Vh.step)),Jh=1,Yh=class{constructor(e,t,{worker:n=null,fields:r=Vh.fields}={}){this.water=e,this.boat=t,this.hull=Dh(t),this.scale=1;let a=Mh.coarse,o=Mh.fine,s=a.Nx*a.Ny*4;if(o.Nx!==a.Nx||o.Ny!==a.Ny)throw Error(`the two Kelvin grids must be the same size (one texture array)`);this.tex=new Jn(new Uint16Array(s*2*r),a.Nx,a.Ny,2*r),Object.assign(this.tex,{type:sn,format:i,minFilter:_t,magFilter:_t,generateMipmaps:!1,wrapS:Lt,wrapT:Lt}),this.tex.needsUpdate=!0,this.table=new sr(new Float32Array(768),24,8,i,G),Object.assign(this.table,{minFilter:yn,magFilter:yn,generateMipmaps:!1});let c=e.uniforms,l=e=>new Er(e.ahead-e.Nx*e.dx,-(e.Ny*e.dx)/2,e.Nx*e.dx,e.Ny*e.dx);c.uBowTex.value=this.tex,c.uBowC.value.copy(l(a)),c.uBowF.value.copy(l(o)),c.uWakeTex.value=this.table,c.uWakeN.value=0,this.slots=Array.from({length:r},()=>({U:0,gain:1,crest:0,used:0})),this.pending=new Map,this.wakes=[],this.worker=n,n&&n.addEventListener(`message`,e=>this._receive(e.data))}wake(e){return e>=8?null:this.wakes[e]??=new Xh(this,e)}field(e){let t=this.slots.findIndex(t=>t.U===e);if(t>=0)return this.slots[t].used=performance.now?.()??Date.now(),t;if(!this.pending.has(e)){let t=Jh++;if(this.pending.set(e,t),this.worker)this.worker.postMessage({kind:`field`,id:t,U:e});else{let n=Ih(this.hull,e);this._receive({id:t,U:e,coarse:Lh(n.coarse.data),fine:Lh(n.fine.data),bowGain:n.bowGain,crest:n.crest})}}return-1}_receive(e){if(this.pending.get(e.U)!==e.id)return;this.pending.delete(e.U);let t=new Set(this.wakes.flatMap(e=>e?[e.shown,e.fading?e.target:-1]:[])),n=this.slots.findIndex(e=>!e.U);if(n<0){let e=1/0;this.slots.forEach((r,i)=>{!t.has(i)&&r.used<e&&(e=r.used,n=i)})}if(n<0)return;let r=this.tex.image.width*this.tex.image.height*4,i=this.tex.image.data;i.set(e.coarse,2*n*r),i.set(e.fine,(2*n+1)*r),this.tex.addLayerUpdate(2*n),this.tex.addLayerUpdate(2*n+1),this.tex.needsUpdate=!0,this.slots[n]={U:e.U,gain:e.bowGain,crest:e.crest,used:performance.now?.()??Date.now()}}upload(){let e=0;this.wakes.forEach((t,n)=>{t?.drawn&&(e=n+1)}),this.water.uniforms.uWakeN.value=e,this.table.needsUpdate=!0}},Xh=class{constructor(e,t){this.bank=e,this.i=t,this.hull=e.hull,this.boat=e.boat,this.shown=-1,this.target=-1,this.mix=0,this.fading=!1,this.bow=1,this.on=!0,this.drawn=!1,this.state={U:0,Uq:0,bow:1,gain:1,Urel:0,D:0},this.track=[]}get scale(){return this.bank.scale}set scale(e){this.bank.scale=e}get slots(){return this.bank.slots}_row(e){return(this.i*24+e)*4}off(){let e=this.bank.table.image.data,t=this._row(22);e[t+1]=0,e[t+3]=0,this.drawn=!1}_track(e,t,n,r,i){let a=this.track,o=(e,t)=>Math.hypot(e[0]-t[0],e[1]-t[1]),s=[e,t],c;if(i){c=[s];let e=0;for(let t=1;t<=Kh;t++){let n=i(t*Gh);if(!n)break;let r=o(n,c[c.length-1]);if(r>Wh||(r>.001&&(c.push(n),e+=r),e>80))break}}else a.length&&o(s,a[0])>Wh&&(a.length=0),(!a.length||o(s,a[0])>=Hh)&&(a.unshift(s),a.length>Uh&&(a.length=Uh)),c=[s,...a.filter((e,t)=>t||o(e,s)>.001)];let l=[0];for(let e=1;e<c.length;e++)l.push(l[e-1]+o(c[e],c[e-1]));let u=[-n,-r];if(c.length>1){let e=c[c.length-2],t=c[c.length-1],n=o(e,t);n>.05&&(u=[(t[0]-e[0])/n,(t[1]-e[1])/n])}let d=[],f=c[c.length-1],p=l[l.length-1];for(let e=0,t=0;e<21;e++){let n=e*4;if(n<=p&&c.length>1){for(;t<c.length-2&&l[t+1]<n;)t++;let e=(n-l[t])/Math.max(l[t+1]-l[t],1e-6);d.push([c[t][0]+(c[t+1][0]-c[t][0])*e,c[t][1]+(c[t+1][1]-c[t][1])*e])}else d.push([f[0]+u[0]*(n-p),f[1]+u[1]*(n-p)])}let m=this.bank.table.image.data;for(let e=0;e<21;e++){let t=d[Math.max(0,e-1)],i=d[Math.min(20,e+1)],a=o(t,i),s=e===0||a<1e-6?[n,r]:[(t[0]-i[0])/a,(t[1]-i[1])/a],c=this._row(e);m[c]=d[e][0],m[c+1]=d[e][1],m[c+2]=s[0],m[c+3]=s[1]}}update(e,t,n,r,i=null){let a=this.bank,o=n??[0,0],s=a.table.image.data,c=t.u-(o[0]*t.fe+o[1]*t.fn);{let e=this._row(21);s[e]=t.e,s[e+1]=t.n,s[e+2]=t.fe,s[e+3]=t.fn}this._track(t.e,t.n,t.fe,t.fn,i);let l=this.shown>=0?a.slots[this.shown]:null;if(l&&l.U===0&&(this.shown=-1),this.on&&c>Vh.uMin&&!this.fading){let e=Math.min(Vh.uMax,qh(c));if(e!==(this.shown>=0?a.slots[this.shown].U:0)){let t=a.field(e);t>=0&&(this.shown<0?this.shown=t:(this.fading=!0,this.target=t))}}if(this.fading&&(this.mix=Math.min(1,this.mix+e/Vh.fadeS),this.mix>=1&&(this.shown=this.target,this.mix=0,this.fading=!1)),this.shown<0){this.off(),this.state.U=c;return}let u=this.hull,d=u.bowX,f=.5-d/this.boat.spec.L,p=r(t.e+t.fe*d,t.n+t.fn*d),m=t.u-((p.ue??0)+o[0])*t.fe-((p.un??0)+o[1])*t.fn,h=(t.z??0)+this.boat._0xf3a7ff+d*Math.sin(t.pitch??0)+this.boat.keelRel(f),g=p.h-h,_=a.slots[this.shown],v=_.U||c,y=Bh(Math.max(m,0),g,v,u.bowDraft);this.bow+=(Math.min(3,y)-this.bow)*Math.min(1,e/Vh.bowTau);let b=this.fading?a.slots[this.target]:_,x=this.fading?this.mix:0,S=this.on?qi.smoothstep(c,Vh.uMin,Vh.uMin+.4)*a.scale:0;{let e=this._row(22);s[e]=this.shown,s[e+1]=(1-x)*S,s[e+2]=this.fading?this.target:0,s[e+3]=this.fading?x*S:0}let C=(_.gain*(1-x)+b.gain*x)*this.bow;{let e=this._row(23);s[e]=u.xStem,s[e+1]=C,s[e+2]=1/Mh.coarse.fadeM,s[e+3]=21}this.drawn=S>0,Object.assign(this.state,{U:c,Uq:v,bow:this.bow,gain:C,Urel:m,D:g})}},Zh={desktop:{materials:`physical`,paddle:`high`,racerPaddle:`medium`},tablet:{materials:`physical`,paddle:`high`,racerPaddle:`medium`,quality:`Standard`,lite:!1,maxPx:45e5,fieldMs:3},phone:{materials:`standard`,paddle:`medium`,racerPaddle:`low`,quality:`Draft`,lite:!0,antialias:!1,maxPx:12e5,query:{wavesolve:`0`,skydisp:`512`,volsize:`256`},field:2,planBudget:2,fieldMs:1.5,landStep:2,sprayAmt:.6,shoreCullM:4e3}},Qh=`surfski.device`;function $h(e,t=globalThis){let n=t.navigator??{},r=t.screen??{},i=e?.get?.(`mobile`)??(()=>{try{return t.localStorage?.getItem(`surfski.device`)}catch{return null}})();if(i&&i!==`auto`){let e=i===`0`?`desktop`:i;if(Zh[e])return{tier:e,why:`chosen: ${i}`}}let a=n.userAgent??``,o=(n.maxTouchPoints??0)>0,s=e=>{try{return!!t.matchMedia?.(e).matches}catch{return!1}},c=Math.min(r.width??9999,r.height??9999);return/iPhone|iPod/.test(a)?{tier:`phone`,why:`iPhone`}:/Android/.test(a)&&/Mobile/.test(a)?{tier:`phone`,why:`Android phone`}:/iPad/.test(a)||/Macintosh/.test(a)&&o?{tier:`tablet`,why:`iPad`}:/Android/.test(a)?{tier:`tablet`,why:`Android tablet`}:o&&s(`(pointer: coarse)`)&&!s(`(pointer: fine)`)?c<=500?{tier:`phone`,why:`touch, ${c} px`}:{tier:`tablet`,why:`touch, ${c} px`}:{tier:`desktop`,why:`desktop`}}var eg=[[0,[.12,.28,.95]],[.5,[.1,.78,.92]],[1,[.2,.85,.3]],[1.35,[1,.85,.1]],[1.7,[1,.2,.12]]];function tg(e,t){let n=Math.max(0,e/t),r=eg;if(n<=r[0][0])return r[0][1];for(let e=1;e<r.length;e++)if(n<=r[e][0]){let t=(n-r[e-1][0])/(r[e][0]-r[e-1][0]);return r[e-1][1].map((n,i)=>n+(r[e][1][i]-n)*t)}return r[r.length-1][1]}var ng=.75,rg=1.8,ig=3.5,ag=1.5,og=.12,sg=8,cg=.04,lg=110,ug={route:.62,wave:.8},dg={route:0,wave:.15},fg=[.04,.3,.38],pg=.8;function mg(e,t=ag){let n=[];if(e.length<2)return n;let r=0;n.push({...e[0]});for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.hypot(o.e-a.e,o.n-a.n);if(s<1e-6)continue;let c=t-r;for(;c<=s;){let e=c/s;n.push({e:a.e+(o.e-a.e)*e,n:a.n+(o.n-a.n)*e,W:a.W+(o.W-a.W)*e,a:a.a+(o.a-a.a)*e}),c+=t}r=s-(c-t)}let i=e[e.length-1];return Math.hypot(i.e-n[n.length-1].e,i.n-n[n.length-1].n)>.3&&n.push({...i}),n}function hg(e,t){let n=e=>e.W<=.55*t,r=e=>e.W>=.95*t,i=()=>{for(let t=e.length-1;t>0;t--)if(e[t].a>=.9)return t;return Math.max(1,e.length-1)};if(e.length<2)return{head:0,from:-1};let a=0;if(n(e[0]))for(;a<e.length&&n(e[a]);)a++;else for(;a<e.length&&!n(e[a]);)a++;let o=a>=e.length?i():a,s=-1;for(let t=o+1;t<e.length;t++)if(r(e[t])){s=t;break}return{head:o,from:s}}function gg(e,t,n=2,r=8){let i=e.map((t,n)=>(e[Math.max(0,n-1)]+t+e[Math.min(e.length-1,n+1)])/3);for(let e=Math.max(1,n);e<i.length-1;e++){if(!(i[e]<=i[e-1]&&i[e]<i[e+1]))continue;let n=i[e],a=e;for(let t=e+1;t<=Math.min(i.length-1,e+r);t++)i[t]>n&&(n=i[t],a=t);if(n-i[e]>=t){let t=a;for(;t>e&&i[t-1]<=i[t];)t--;return t}}return-1}var _g=class{constructor(e){this.geo=new kr;let t=1464;this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.geo.setAttribute(`position`,new o(this.pos,3).setUsage(j)),this.geo.setAttribute(`color`,new o(this.col,4).setUsage(j)),this.geo.setIndex(new o(new Uint16Array(t*6),1).setUsage(j)),this.mat=new mi({vertexColors:!0,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fog:!1}),this.mask=null,this.mat.onBeforeCompile=e=>{e.uniforms.uPull={value:new oi(sg,cg)},this.mask&&Object.assign(e.uniforms,this.mask),e.vertexShader=`uniform vec2 uPull;
varying vec3 vGW;
`+e.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
{ vGW = (modelMatrix * vec4(transformed, 1.0)).xyz; float d = length(mvPosition.xyz), pull = min(uPull.y * max(d - uPull.x, 0.0), 0.5 * d); mvPosition.xyz *= (d - pull) / max(d, 1e-3); gl_Position = projectionMatrix * mvPosition; }`),this.mask&&(e.fragmentShader=Ds+`varying vec3 vGW;
`+e.fragmentShader.replace(`void main() {`,`void main() {
if (inHull(vGW, `+og.toFixed(3)+`)) discard;                  // never drawn inside a boat (it lies on the water)`))},this.mesh=new En(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=5,this.mesh.visible=!1,e.add(this.mesh)}hide(){this.mesh.visible=!1}setMask(e){this.mask=Object.fromEntries(Ms.map(t=>[t,e[t]])),this.mat.customProgramCacheKey=()=>`guide-mask`,this.mat.needsUpdate=!0}useStencil(e){Object.assign(this.mat,{depthTest:!1,stencilWrite:!0,stencilRef:e,stencilFunc:514,stencilFail:bt,stencilZFail:bt,stencilZPass:ai}),this.mask=null,this.mat.needsUpdate=!0}ribbons(e,t,n,r,{rgb:i=[1,.86,.22],width:a=.3,alpha:o=.4,maxM:s=400}={}){let c=this.pos,l=this.col,u=this.geo.index.array,d=this.pos.length/3,f=a/2,p=0,m=0;for(let a of e){let e=a.b.e-a.a.e,h=a.b.n-a.a.n,g=Math.hypot(e,h);if(g<1)continue;let _=e/g,v=h/g,y=v,b=-_,x=o*(a.next?1:.5),S=p;for(let e=0;e<=g+1e-6;e+=Math.min(3,Math.max(g-e,.001))){let o=a.a.e+_*e,u=a.a.n+v*e;if(Math.hypot(o-r.e,u-r.n)>s||p+4>d){if(p>S)break;continue}let m=(t.mapHeight?t.mapHeight(o,u,n):t.sample(o,u,n,{}).h)+og,h=Math.min(1,e/6,(g-e)/6+.25);for(let[e,t]of[[-1,0],[-.8,x*h],[pg,x*h],[1,0]])c[p*3]=o+y*f*e,c[p*3+1]=m,c[p*3+2]=-(u+b*f*e),l[p*4]=i[0],l[p*4+1]=i[1],l[p*4+2]=i[2],l[p*4+3]=t,p++;if(e>=g)break}for(let e=S;e+7<p;e+=4)for(let t=0;t<3;t++){let n=e+t;u[m++]=n,u[m++]=n+1,u[m++]=n+4,u[m++]=n+1,u[m++]=n+5,u[m++]=n+4}}m?(this.geo.setDrawRange(0,m),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.index.needsUpdate=!0,this.mesh.visible=!0):this.mesh.visible=!1}update(e,t,n,r,i=`route`,a={}){let o=mg(e);if(o.length<2){this.mesh.visible=!1;return}let s=Math.min(o.length,lg),c=this.pos,l=this.col,u=this.geo.index.array,d={},f=0,p=0,m=dg[i]??0,h=(ug[i]??ug.route)*(a.weight??1),g=(e,r,i,a,o,s)=>{let u=[o[0]*(1-m)+fg[0]*m,o[1]*(1-m)+fg[1]*m,o[2]*(1-m)+fg[2]*m],p=[[-1,0],[-.8,s],[pg,s],[1,0]],h=p.map(([t])=>[e.e+r*a*t,e.n+i*a*t]),g=0;for(let[e,r]of h)g+=t.sample(e,r,n,d).h/4;let _=og;for(let e=0;e<4;e++)c[f*3]=h[e][0],c[f*3+1]=g+_,c[f*3+2]=-h[e][1],l[f*4]=u[0],l[f*4+1]=u[1],l[f*4+2]=u[2],l[f*4+3]=p[e][1],f++},_=(e,t,n,i,a=!1,s=o,c=1)=>{let l=f,d=(t-e)*ag,m=Math.max(0,d-ig);for(let o=e;o<=t;o++){let l=s[o],u=s[Math.min(o+1,s.length-1)],f=s[Math.max(o-1,0)],p=u.e-f.e,_=u.n-f.n,v=Math.hypot(p,_)||1;p/=v,_/=v;let y=(o-e)*ag,b=tg(l.W,r),x=h*l.a*i*(a?Math.min(1,(o-e)/3):1),S=ng/2*c;n&&y>m&&(S=o===t?.02:rg/2*(1-(y-m)/(d-m+1e-6))+.02),g(l,_,-p,S,b,x),n&&y>m&&o>e&&Math.abs(y-m)<ag&&g(l,_,-p,rg/2,b,x)}for(let e=l;e+7<f;e+=4)for(let t=0;t<3;t++){let n=e+t;u[p++]=n,u[p++]=n+1,u[p++]=n+4,u[p++]=n+1,u[p++]=n+5,u[p++]=n+4}};if(i===`wave`){let e=hg(o.slice(0,s),r);if(a.rise>0&&o[0].W<=.55*r){let r=gg(o.slice(0,s).map(e=>t.sample(e.e,e.n,n,d).h),a.rise);r>0&&r<e.head&&(e.head=r),r>0&&e.from>=0&&e.from<=e.head&&(e.from=-1)}let i=Math.min(s-1,Math.max(1,e.head));_(0,i,!0,1),e.from>i&&e.from<s-1&&_(e.from,s-1,!1,.5,!0)}else _(0,s-1,!0,1);if(a.alts?.length)for(let e of a.alts.slice(0,2)){let t=mg(e.pts).slice(0,lg),n=Math.min(1,Math.max(0,e.weight??.5));t.length>=3&&f+t.length*4+8<this.pos.length/3&&_(0,t.length-1,!1,.3+.25*n,!0,t,.3+.7*n)}this.geo.setDrawRange(0,p),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.index.needsUpdate=!0,this.mesh.visible=!0}};function vg(e,t,n){return e<=.55*t?n?`surf`:`relax`:e<.95*t?`keep`:e<1.25*t?`steady`:e<1.6*t?`power`:`sprint`}var yg=[0,.25,.5,.75,1,1.35,1.7,2.05],bg=(e,t)=>yg.reduce((n,r,i)=>Math.abs(r*t-e)<Math.abs(yg[n]*t-e)?i:n,0),xg={surf:`glide`,relax:`glide`,keep:`keep paddling`,steady:`tempo`,power:`power on`,sprint:`sprint`},Sg=e=>e===`surf`||e===`relax`,Cg={little:10,full:25},wg={little:6,full:15},Tg={seen:.08,hop:.2,big:.3048},Eg=[.62,.75,.85];function Dg(e){let t=Math.abs(e);return t<wg.little?null:{side:e>0?`right`:`left`,little:t<wg.full}}var Og=e=>e.little?`a little ${e.side}`:e.side;function kg(e,t,n=!1){return t?e===`surf`?n?`glide ${Og(t)}`:`${Og(t)}, keep gliding`:e===`sprint`?`sprint ${Og(t)}`:e===`power`?`power ${Og(t)}`:Og(t):xg[e]}function Ag(e,t){return e>=Tg.big?t?`glide over`:`power up and over`:e>=Tg.hop?`up and over`:t?`glide through`:`power through`}function jg(e){let{W:t,W2:n,B:r,headingErr:i=0,run:a=!1,_0xdf8a3e:o=0,u:s=0}=e,c=vg(t,r,a);if(e.trafficRisk){let e=Dg(i);return{text:e?`give some space, ${e.side}`:`give some space`,key:`space`,color:Eg,next:null}}if(e.pearlRisk&&(c===`surf`||c===`relax`)&&(e.W0??0)>.6*r)return{text:`steady...`,key:`ease`,color:Eg,next:null};if(e.rapid){let n=vg(e.W0??t,r,a),i=e.slow?vg(e.slow.W,r,a):n;return(e.catchS??1/0)<=3?{text:`steady..`,key:`hold`,color:tg(e.W0??r,r),next:`then glide`}:i===n?{text:`wait for next`,key:`wait`,color:Eg,next:null}:e.canSurf&&e.slow?jg({...e,W:e.slow.W,W2:e.slow.W2,headingErr:e.slow.headingErr,rapid:!1,pearlRisk:!1}):{text:`let this one go`,key:`skip`,color:Eg,next:Fg(e.slow,r,a)}}let l=Dg(i),u=n==null?c:vg(n,r,a),d=xg[u]===xg[c]?null:`then ${xg[u]}`,f=tg(t,r);if(!l&&e.W0!=null){let n=Sg(c),i=bg(e.W0,r),a=bg(t,r)-i;if(n)return e.W0>.55*r?{text:`glide`,key:`relax`,color:f,next:d}:{text:`keep gliding`,key:c,color:f,next:d,quiet:!0};if(a===0&&i>=1)return{text:xg[c],key:c,color:f,next:d,quiet:!0};if(i>=1&&Math.abs(a)<=2)return{text:a>0?`a little more`:`a little less`,key:a>0?`more`:`less`,color:f,next:d}}return{text:kg(Sg(c)?`surf`:c,l,(e.W0??0)>.55*r),key:c,color:f,next:d}}function Mg(e){let{B:t,W0:n=e.W}=e,r=e.run,i=vg(n,t,r),a=e.slow,o=a?vg(a.W,t,r):i;return(e.catchS??1/0)<=3?{W:n,W2:0,headingErr:0}:o===i?{W:n,W2:n,headingErr:0}:e.canSurf&&a?{W:a.W,W2:a.W2,headingErr:a.headingErr}:{W:.5*t,W2:a?a.W2:n,headingErr:0}}function Ng(e){let t=e.crest;if(!t||!e.headSea||e.run||!(t.rise>=Tg.seen))return null;let n=e.W<=.55*e.B,r=t.rise>=Tg.big?`big`:t.rise>=Tg.hop?`hop`:`small`;return{text:Ag(t.rise,n),key:`crest`,size:r,id:(e.at??0)+t.inS,color:tg(e.W,e.B)}}function Pg(e){let t=e.lookDir;return!t||Math.abs(e.headingErr??0)>=wg.little?null:{text:`look ${t}`,key:`look`,dir:t,color:Eg}}function Fg(e,t,n){let r=e?vg(e.W2??e.W,t,n):`steady`;return r===`power`||r===`sprint`?`then accelerate on the next wave`:`then ${xg[r]}`}var Ig={tempo:[`settle in`,`smooth power`],"power on":[`push`,`dig in`],sprint:[`go hard`,`big push`],"keep paddling":[`keep it going`,`keep stroking`],"keep gliding":[`let it run`,`ride it`],"a little more":[`a bit more`,`lift it`],"a little less":[`a bit less`,`ease a little`],glide:[`stop paddling`,`rest`],good:[`nice`,`yes`,`that's it`],excellent:[`perfect`,`beautiful`]},Lg={surf:0,relax:0,skip:0,less:1.5,wait:1,keep:1,steady:2,hold:2,more:2.5,power:3,accel:3,sprint:4},Rg={scarcityX:0,gainTauS:1.5,noTurn:!1,minLevel:0,tolScale:1,repeatS:5,rate:.07,burst:3,persistS:.5,reversalS:2,holdBaseS:1.5,holdPerStepS:1.5,stageAtS:3,stepGapS:1.2,windowS:20,smallCrestTokens:2.5,tolMph:{cruise:1,sporty:.5,race:.2},majorGainX:2,gainFastX:3,ttl:{review:3,default:3.5,brace:2.5,ease:2,crest:1.8,look:6,praise:2.5,wait:4},praiseWindowS:8,praiseMinS:5,praiseGapS:20,praiseAfterCallS:6,praiseExcellentX:1/3,reviewGapS:30,reviewQuietS:6};function zg(e,t=jg(e)){let{B:n,W:r,headingErr:i=0,run:a=!1,runEnd:o=!1}=e,s=e.W2??r,c=[{text:t.text,at:0,color:t.color,key:t.key}];if(t.key===`brace`||t.key===`wait`||t.key===`ease`||t.key===`space`)return c;if(t.key===`hold`)return[c[0],{text:`and glide`,at:Rg.stageAtS-.2,color:tg(0,n),key:`surf`}];if(t.key===`skip`)return t.next?[c[0],{text:t.next.replace(/^then /,`and `),at:Rg.stageAtS+.2,color:t.color,key:`accel`}]:c;let l=vg(r,n,a),u=vg(s,n,o),d=Dg(i);if(l===u||Lg[l]===Lg[u]||!Sg(l)&&!Sg(u)&&Math.abs(bg(r,n)-bg(s,n))<=2)return c;let f=Lg[u]>Lg[l],p=tg(r,n),m=tg(s,n),h=[],g={...c[0]};if(f){let r=Lg[l]<=1&&t.key!==`more`&&(e.W0==null||e.W0<=.55*n);h.push(r?{text:`wait`,at:0,color:p,key:`wait`}:g);let i=u===`sprint`?`sprint`:u===`power`?`power on`:null;i?(h.push({text:`${i}${d?` ${Og(d)}`:``}${o?` to catch`:` now`}`,at:Rg.stageAtS,color:m,key:u}),o&&h.push({text:`and glide`,at:Rg.stageAtS+Rg.stepGapS,color:tg(0,n),key:`surf`})):h.push({text:`and ${kg(u,d,!0)}`,at:Rg.stageAtS,color:m,key:u})}else h.push(g),h.push({text:`and ${xg[u]}`,at:Rg.stageAtS,color:m,key:u});return h}var Bg={surf:[0,2],relax:[0,2],keep:[2,3],steady:[3,4],power:[5,5],sprint:[6,7],accel:[5,7]};function Vg(e,t){let n=Bg[e.key];if(!n||!t)return!0;let r=t.rapid&&t.slow?t.slow:t,i=t.B;return[bg(r.W,i),bg(r.W2??r.W,i)].some(e=>e>=n[0]-1&&e<=n[1]+1)}var Hg=2.23694,Ug=new Set([`more`,`less`,`steady`,`keep`,`power`,`sprint`,`relax`,`surf`]),Wg=e=>e.gain!=null&&e._0xa5e398?e.gain/e._0xa5e398*Hg:null,Gg=class{constructor(e={}){this.p={...Rg,...e},this.hardReset()}hardReset(){this.tokens=this.p.burst,this.tLast=null,this.queue=[],this.current=null,this.standingSig=null,this.standingOrder=2,this.lastCallAt=-1e9,this.lastDir=0,this.pending=null,this.holdUntil=0,this.history=[],this.lookSig=null,this.lookPending=null,this.lastCrestId=-1e9,this.lastEaseAt=-1e9,this.losses=[],this.lastPraiseAt=-1e9,this.lastLossAt=-1,this.lastReviewId=-1,this.lastReviewAt=-1e9,this.varyN={},this.gainEma=null,this.gainAt=null}reset(){this.queue=[],this.current=null,this.pending=null,this.standingSig=null,this.standingOrder=2,this.lastCallAt=-1e9,this.lookSig=null,this.lookPending=null}ips(e){let t=this.history.filter(t=>t>e-this.p.windowS),n=Math.max(3,Math.min(this.p.windowS,e-(this.history[0]??e))),r=0;for(let e of t)r=Math.max(r,t.filter(t=>t>=e&&t<e+3).length/3);return{avg:t.length/n,peak:r,count:t.length}}emit(e,t){if(this.p.variety&&Ig[e.text]){let t=[e.text,...Ig[e.text]],n=(this.varyN[e.text]=(this.varyN[e.text]??0)+1)-1;e={...e,text:t[n%t.length]}}this.current={...e,since:t},this.history.push(t),this.history.length>300&&this.history.shift()}step(e,t){if(this.tLast!=null&&t<this.tLast-1e-6&&this.hardReset(),this.tLast!=null&&(this.tokens=Math.min(this.p.burst,this.tokens+this.p.rate*Math.max(0,t-this.tLast))),this.tLast=t,!e)return this.reset(),null;let n=jg(e),r=(this.p.tolMph[e.mode]??this.p.tolMph.sporty)*(this.p.tolScale??1)/Hg*(e._0xa5e398??6);for(e.gain!=null&&e.at!==this.lastLossAt&&(this.lastLossAt=e.at,this.losses.push({t,v:e.gain}));this.losses.length&&this.losses[0].t<t-this.p.praiseWindowS;)this.losses.shift();if(n.key===`brace`)return this.current?.text!==n.text&&(this.queue=[],this.emit({text:n.text,color:n.color,key:`brace`},t),this.holdUntil=t+1,this.standingSig=null),this.view(t);if(n.key===`ease`||n.key===`space`)return t-this.lastEaseAt>3&&(this.queue=[],this.emit({text:n.text,color:n.color,key:n.key},t),this.lastEaseAt=t,this.tokens=Math.max(0,this.tokens-1),this.holdUntil=t+1.2,this.standingSig=null),this.view(t);if(this.current?.key===`brace`&&!this.queue.length&&(this.current={...this.current,key:`brace-done`}),this.queue.length){if(t>=this.queue[0].due){let n=this.queue.shift();if(Vg(n,e))this.emit(n,t);else return this.queue=[],this.standingSig=null,this.pending=null,this.holdUntil=t,this.current&&!this.current.key.startsWith(`brace`)&&(this.current=null),this.view(t)}return this.view(t)}if(t<this.holdUntil)return this.view(t);let i=Ng(e);if(i&&i.id>this.lastCrestId+1&&this.tokens>=(i.size===`small`?this.p.smallCrestTokens:1))return--this.tokens,this.lastCrestId=i.id,this.emit(i,t),this.holdUntil=t+1.2,this.view(t);let a=e.review;if(a&&a.id!==this.lastReviewId&&t-this.lastReviewAt>=this.p.reviewGapS&&t-this.lastCallAt>=this.p.reviewQuietS&&!this.queue.length&&this.tokens>=2)return--this.tokens,this.lastReviewId=a.id,this.lastReviewAt=t,this.emit({text:a.text,color:Eg,key:`review`},t),this.holdUntil=t+1.5,this.view(t);let o=Pg(e),s=e.gain!=null&&e.gain>=r;if(!o)this.lookSig=null,this.lookPending=null;else if(!(s||this.tokens<2)&&this.lookSig!==o.dir&&((!this.lookPending||this.lookPending.dir!==o.dir)&&(this.lookPending={dir:o.dir,since:t}),t-this.lookPending.since>=this.p.persistS&&this.tokens>=1))return--this.tokens,this.emit(o,t),this.lookSig=o.dir,this.lookPending=null,this.holdUntil=t+this.p.holdBaseS,this.view(t);let c=zg(e,n);if(n.quiet&&c.length===1)return this.pending=null,this.standingSig=null,this.current&&Ug.has(this.current.key)&&!this.queue.length&&t-this.current.since>1.2&&(this.current=null),this.praise(t,r),this.view(t);let l=c.map(e=>e.text).join(` | `);if(e.gain!=null&&this.p.gainTauS>0){let n=this.gainAt==null?0:Math.max(0,t-this.gainAt);this.gainEma=this.gainEma==null?e.gain:this.gainEma+(e.gain-this.gainEma)*(1-Math.exp(-n/this.p.gainTauS)),this.gainAt=t}let u=e.gain!=null,d=e.gain==null?1/0:this.p.gainTauS>0?Math.min(e.gain,this.gainEma):e.gain,f=r*(c[0].key===`skip`?this.p.majorGainX:1)*(1+(this.p.scarcityX??0)*(1-Math.min(1,this.tokens/this.p.burst)));if(l===this.standingSig&&t-this.lastCallAt>=this.p.repeatS&&u&&d>=f&&!c.some(e=>e.key===`skip`||e.key===`hold`)&&(this.standingSig=null),l===this.standingSig)return this.pending=null,this.view(t);if(u&&d<f)return this.pending=null,this.praise(t,r),this.view(t);let p=Lg[c[0].key]??2,m=t-this.lastCallAt<10&&Math.sign(p-this.standingOrder)!==0&&this.reversalOf(p);(!this.pending||this.pending.sig!==l)&&(this.pending={sig:l,since:t});let h=(m?this.p.reversalS:this.p.persistS)*(u&&d>=this.p.gainFastX*r?.5:1);if(t-this.pending.since>=h&&(this.tokens>=c.length||!this.history.length&&this.tokens>=1)){this.tokens-=Math.min(this.tokens,c.length),this.pending=null,this.standingSig=l;let e=c[c.length-1];this.lastDir=Math.sign((Lg[e.key]??p)-this.standingOrder),this.standingOrder=Lg[e.key]??p,this.lastCallAt=t,this.emit(c[0],t);for(let e of c.slice(1))this.queue.push({...e,due:t+e.at});this.holdUntil=t+(c.length>1?c[c.length-1].at:0)+this.p.holdBaseS+this.p.holdPerStepS*(c.length-1)}return this.view(t)}praise(e,t){let n=this.losses;if(n.length<6||e-n[0].t<this.p.praiseMinS||e-this.lastPraiseAt<this.p.praiseGapS||e-this.lastCallAt<this.p.praiseAfterCallS||this.tokens<1.5||this.queue.length||e<this.holdUntil)return!1;let r=n.reduce((e,t)=>e+t.v,0)/n.length,i=r<=t*this.p.praiseExcellentX?`excellent`:r<=t?`good`:null;return i?(--this.tokens,this.lastPraiseAt=e,this.emit({text:i,color:[.35,.9,.5],key:`praise`},e),this.holdUntil=e+1.5,!0):!1}reversalOf(e){return this.lastDir!=null&&this.lastDir!==0&&Math.sign(e-this.standingOrder)===-this.lastDir}view(e){let t=this.current;if(!t)return null;let n=e-t.since,r=this.p.ttl[t.key]??this.p.ttl.default;return!this.queue.length&&n>r?null:{text:t.text,color:t.color,key:t.key,ageS:n,standing:n>1.6&&!this.queue.length,next:this.queue.length?this.queue[0].text:null}}},Kg=e=>e===`left`?-1:1,qg=Cg.full,Jg=Cg.little,Yg=[[/^tempo$/,()=>({level:4})],[/^power on$/,()=>({level:5})],[/^sprint( now)?$/,()=>({level:6})],[/^keep paddling$/,()=>({level:3})],[/^(glide|keep gliding)$/,()=>({level:0})],[/^a little more$/,()=>({dLevel:1})],[/^a little less$/,()=>({dLevel:-1})],[/^back off$/,()=>({level:0,brake:!0})],[/^give some space(, (left|right))?$/,e=>e[2]?{turn:Kg(e[2])*Jg,turnS:3}:{noop:!0}],[/^(left|right)$/,e=>({turn:Kg(e[1])*qg,turnS:4})],[/^a little (left|right)$/,e=>({turn:Kg(e[1])*Jg,turnS:4})],[/^(a little )?(left|right), keep gliding$/,e=>({level:0,turn:Kg(e[2])*(e[1]?Jg:qg),turnS:4})],[/^glide (a little )?(left|right)$/,e=>({level:0,turn:Kg(e[2])*(e[1]?Jg:qg),turnS:4})],[/^(sprint|power on|power)( a little)? (left|right)( now| to catch)?$/,e=>({level:e[1]===`sprint`?6:5,turn:Kg(e[3])*(e[2]?Jg:qg),turnS:4})],[/^and (a little )?(left|right)$/,e=>({turn:Kg(e[2])*(e[1]?Jg:qg),turnS:4})],[/^(power on|sprint)( now| to catch)$/,e=>({level:e[1]===`sprint`?6:5})],[/^and (tempo|power on|sprint( now)?|keep paddling|glide)$/,e=>({level:{tempo:4,"power on":5,keep:3,glide:0}[e[1].replace(/ now$/,``).replace(/^keep paddling$/,`keep`)]??(e[1].startsWith(`sprint`)?6:4)})],[/^and (a little )?(left|right), keep gliding$/,e=>({level:0,turn:Kg(e[2])*(e[1]?Jg:qg),turnS:4})],[/^and accelerate on the next wave$/,()=>({level:5})],[/^let this one go$/,()=>({level:2,holdS:3})],[/^wait$/,()=>({level:0,holdS:2})],[/^wait for next$/,()=>({holdS:2})],[/^steady\.\.$/,()=>({level:4})],[/^steady\.\.\.$/,()=>({level:0})],[/^(glide through|glide over)$/,()=>({level:0,holdS:2})],[/^(power through|power up and over|up and over)$/,()=>({noop:!0})],[/^look (left|right)$/,()=>({noop:!0})],[/^(could have caught that|more power there|wasted power|(left|right) was better)$/,()=>({noop:!0})],[/^brace( hard and (left|right)| and a little (left|right))$/,()=>({noop:!0})],[/^(good|excellent)$/,()=>({noop:!0})]];for(let[e,t]of Object.entries(Ig))for(let n of t)Yg.push([RegExp(`^${n}$`),()=>Xg(e)]);function Xg(e){for(let[t,n]of Yg){let r=t.exec(e);if(r)return n(r)}return null}var Zg=e=>(e%360+360)%360;function Qg(e,t,n,r){let i=e.fft??e.base?.fft;if(!i)return 1;let a=i.keys.filter(e=>e.band!==Ha.TAIL),o=e.damp(t,n),s=0,c=0;for(let i of a){let a=e.bandGain(i.band,t,n,o)*e.chGain(i.ch,t,n,r);Ia(i.band)||(s+=i.var),c+=i.var*a*a}return s>0?Math.sqrt(c/s):1}function $g(e){let t=e.dominant;return Zg(Math.atan2(t.dx,t.dy)*180/Math.PI)}var e_=[0,.4,.7,1,1.4,2],t_=[0,20,40,70,110,180],n_=class{constructor(e){this.v=Array.isArray(e)?e:e_.map(t=>t_.map(n=>e(t,n)))}at(e,t){let n=Math.min(180,Math.abs(t)),r=Math.min(e_[e_.length-1],Math.max(0,e)),i=(e,t)=>{let n=0;for(;n<e.length-2&&t>e[n+1];)n++;return[n,Math.min(1,Math.max(0,(t-e[n])/(e[n+1]-e[n])))]},[a,o]=i(e_,r),[s,c]=i(t_,n),l=this.v;return(l[a][s]*(1-o)+l[a+1][s]*o)*(1-c)+(l[a][s+1]*(1-o)+l[a+1][s+1]*o)*c}};function r_({from:e,goal:t,_0x5516d6:n,offsets:r,speedAt:i,ok:a,scaleAt:o,maxStepOff:s=90,banned:c=null,maxSlope:l=null}){let u=Math.hypot(t.e-e.e,t.n-e.n),d=(t.e-e.e)/u,f=(t.n-e.n)/u,p=f,m=-d,h=n.filter(e=>e<u-20).concat([u]),g=(n,i)=>n<0?{e:e.e,n:e.n}:n===h.length-1?{e:t.e,n:t.n}:{e:e.e+d*h[n]+p*r[i],n:e.n+f*h[n]+m*r[i]},_=r.length,v=h.length,y=1e9,b=Array.from({length:v},()=>Array(_).fill(y)),x=Array.from({length:v},()=>Array(_).fill(-1)),S=r.indexOf(0),C=Array.from({length:v},(e,t)=>r.map((e,n)=>g(t,n))),w=C.map((e,t)=>e.map((e,n)=>a(e.e,e.n)&&!(c&&t<v-1&&c(t,n)))),T=(e,t)=>{let n=Math.hypot(t.e-e.e,t.n-e.n),r=Zg(Math.atan2(t.e-e.e,t.n-e.n)*180/Math.PI),a={e:(e.e+t.e)/2,n:(e.n+t.n)/2};return n/Math.max(.8,i(a.e,a.n,r))};for(let e=0;e<_;e++)(w[0][e]&&!(l&&v>1&&Math.abs(r[e])>l*h[0]+1e-6)||v===1)&&(b[0][e]=T(g(-1,0),C[0][e]),x[0][e]=-2);for(let e=1;e<v;e++)for(let t=0;t<_;t++)if(!(!w[e][t]&&e<v-1)&&(e!==v-1||t===S))for(let n=0;n<_;n++){if(b[e-1][n]>=y||e<v-1&&Math.abs(r[n]-r[t])>(l?Math.min(s,l*(h[e]-h[e-1]))+1e-6:s))continue;let i=b[e-1][n]+T(C[e-1][n],C[e][t]);i<b[e][t]&&(b[e][t]=i,x[e][t]=n)}if(b[v-1][S]>=y)return null;let E=[],D=S;for(let e=v-1;e>=0;e--){let t=C[e][D];E.unshift({e:t.e,n:t.n,off:r[D],s:o?o(t.e,t.n):null}),D=x[e][D]}let O=0;{let n={e:e.e,n:e.n};for(let r=0;r<v;r++){let i=r===v-1?{e:t.e,n:t.n}:{e:e.e+d*h[r],n:e.n+f*h[r]};O+=T(n,i),n=i}}return{path:E,time:b[v-1][S],straightTime:O}}function i_(e,t,n,r){let i=[];for(let n of e)n.pose&&i.push({b:n,a:n.pose.e*t[0]+n.pose.n*t[1]});i.sort((e,t)=>e.a-t.a);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length&&i[t].a-i[e].a<=n;t++){let a=i[e].b,o=i[t].b;Math.hypot(a.pose.e-o.pose.e,a.pose.n-o.pose.n)<=n&&(String(a.id)<String(o.id)?r(a,o):r(o,a))}}var a_={L:6.1,halfBeam:.23,seatX:-.5,bladeAft:.4,bladeAhead:1},o_={hs:.3,ahead:1,side:1,clear:.1},s_={prefer:2,tolerable:1,wash:.3048},c_={contact:200,close:40,tight:4,portBias:3},l_=e=>e*180/Math.PI,u_=(e,t)=>{let n=(e-t)%(2*Math.PI);return n>Math.PI&&(n-=2*Math.PI),n<-Math.PI&&(n+=2*Math.PI),n},d_=e=>[Math.sin(e.psi),Math.cos(e.psi)],f_=e=>(e.L??a_.L)/2;function p_(e){let[t,n]=d_(e),r=f_(e),i=e.seatX??a_.seatX;return{bow:[e.e+t*r,e.n+n*r],stern:[e.e-t*r,e.n-n*r],hips:[e.e+t*i,e.n+n*i]}}function m_(e,t,n,r=!1){if(Math.abs(l_(u_(e.psi,t.psi)))>45)return`mutual`;if(r)return h_(e,t,n)>o_.ahead?null:`give`;let i=e=>e[0]*n[0]+e[1]*n[1];return i(p_(t).bow)>i(p_(e).hips)?`give`:null}var h_=(e,t,n)=>(e.e-t.e)*n[0]+(e.n-t.n)*n[1],g_=e=>a_.halfBeam*4*e*(1-e),__=[0,.1,.25,.5,.75,.9,1],v_={gap:0,xe:0,xn:0,ce:0,cn:0};function y_(e,t,n,r,i,a,o,s,c){let l=e+(n-e)*i,u=t+(r-t)*i,d=s-a,f=c-o,p=d*d+f*f,m=Math.min(1,Math.max(0,((l-a)*d+(u-o)*f)/p)),h=a+d*m,g=o+f*m;return v_.gap=Math.sqrt((h-l)*(h-l)+(g-u)*(g-u))-g_(i)-g_(m),v_.xe=l,v_.xn=u,v_.ce=h,v_.cn=g,v_.gap}function b_(e,t,n={}){let r=Math.sin(e.psi),i=Math.cos(e.psi),a=Math.sin(t.psi),o=Math.cos(t.psi),s=f_(e),c=f_(t),l=e.seatX??a_.seatX,u=t.seatX??a_.seatX,d=e.e+r*s,f=e.n+i*s,p=e.e-r*s,m=e.n-i*s,h=e.e+r*l,g=e.n+i*l,_=t.e+a*c,v=t.n+o*c,y=t.e-a*c,b=t.n-o*c,x=t.e+a*u,S=t.n+o*u,C=1/0,w=0,T=0,E=0,D=0;for(let e of __)y_(p,m,d,f,e,y,b,_,v)<C&&(C=v_.gap,w=v_.xe,T=v_.xn,E=v_.ce,D=v_.cn),y_(y,b,_,v,e,p,m,d,f)<C&&(C=v_.gap,w=v_.ce,T=v_.cn,E=v_.xe,D=v_.xn);let O=(x-h)*r+(S-g)*i<0?(_-h)*r+(v-g)*i<-a_.bladeAft:(d-x)*a+(f-S)*o<-a_.bladeAft,k=(E-w)*i+(D-T)*-r>=0?1:-1,A=Math.abs((x-h)*r+(S-g)*i)<a_.bladeAhead+a_.bladeAft;return n.gap=C,n.wash=O,n.side=k,n.reach=A,n.pa?(n.pa[0]=w,n.pa[1]=T,n.pb[0]=E,n.pb[1]=D):(n.pa=[w,T],n.pb=[E,D]),n}function x_(e,t){let n=b_(e,t);if(n.gap>=0)return null;let r=n.pb[0]-n.pa[0],i=n.pb[1]-n.pa[1],a=Math.hypot(r,i);if(a<1e-4){let[n,o]=d_(e),s=(t.e-e.e)*o-(t.n-e.n)*n>=0?1:-1;r=o*s,i=-n*s,a=1}r/=a,i/=a;let o=-n.gap/2+.005,s=[Math.sin(e.psi)*e.u,Math.cos(e.psi)*e.u],c=[Math.sin(t.psi)*t.u,Math.cos(t.psi)*t.u],l=(c[0]-s[0])*r+(c[1]-s[1])*i,u=l<0?-l*.6:0,d=(e,t,n)=>{let[a,s]=d_(e),c=t*r,l=t*i,d=(n[0]-e.e)*a+(n[1]-e.n)*s,f=c*s-l*a,p=e.L??a_.L;return{de:c*o,dn:l*o,dpsi:12*d*f*o/(p*p),du:(c*a+l*s)*u}};return{a:d(e,-1,n.pa),b:d(t,1,n.pb),gap:n.gap}}var S_=.9,C_=e=>(e/(2*Math.PI)%1+1)%1<.5?1:-1;function w_(e,t){if(!(e.power>5&&t.power>5))return!1;let n=b_(e,t);return n.wash||!n.reach||n.gap>=.9?!1:C_(e.phase??0)===n.side&&C_(t.phase??0)===b_(t,e).side}function T_(e,t){return e<=0?`contact`:e<(t?s_.wash:s_.tolerable)?`close`:!t&&e<s_.prefer?`tight`:null}function E_(e,t){if(e.gap<=0)return`contact`;let n=Math.abs(t)<=o_.ahead?o_.side:e.reach?S_:o_.clear;return e.gap<n?`close`:null}function D_(e,t){if(t>o_.ahead)return 0;if(e.gap<=0)return c_.contact;let n=Math.abs(t)<=o_.ahead?o_.side:e.reach?S_:o_.clear;return e.gap<n?c_.close*(1+(n-e.gap)/n):0}function O_(e,t){if(e<=0)return c_.contact;let n=t?s_.wash:s_.tolerable;if(e<n)return c_.close*(1+(n-e)/n);if(!t&&e<s_.prefer){let t=(s_.prefer-e)/(s_.prefer-s_.tolerable);return c_.tight*t*t}return 0}var k_=e=>e<=2?1:Math.max(.4,1-.12*(e-2)),A_=(e,t)=>({...e,e:e.e+Math.sin(e.psi)*e.u*t,n:e.n+Math.cos(e.psi)*e.u*t});function j_(e,t,n,{_0xa5e398:r=8,reachM:i=12,small:a=!1}={}){let o=[];for(let s of t){if(!s||Math.hypot(s.e-e.e,s.n-e.n)>i+(Math.hypot(Math.sin(s.psi)*s.u-Math.sin(e.psi)*e.u,Math.cos(s.psi)*s.u-Math.cos(e.psi)*e.u)+1)*r)continue;let t=m_(e,s,n,a);t&&o.push({pose:s,rel:t})}return o.length?Object.assign(o,{small:a,course:n}):null}var M_={},N_={};function P_(e,t,n=null){if(!e||!t?.length)return 0;let r=0;for(let{pose:i,rel:a}of e){let o=0,s=1/0,c=0;for(let r of t){let t=A_(i,r.tau),a=Math.hypot(t.e-r.e,t.n-r.n);if(a>a_.L+s_.prefer+.5){a<s&&(s=a);continue}let l=(M_.L=M_.seatX=void 0,Object.assign(M_,n,r)),u=b_(l,t,N_),d=(e.small?D_(u,h_(l,t,e.course)):O_(u.gap,u.wash))*k_(r.tau);d>o&&(o=d),u.gap<s&&(s=u.gap,c=u.side)}r+=o+(a===`mutual`&&c>0&&s<6?c_.portBias:0)}return r}function F_({me:e,others:t,course:n,bearingDeg:r,_0xa5e398:i=5,turnRate:a=.3,offsets:o=[0,-6,6,-12,12,-20,20,-30,30],powers:s=[1,.75,1.3],small:c=!1}){let l=j_(e,t,n,{_0xa5e398:i,small:c});if(!l)return{dh:0,f:1,pen:0};let u=null;for(let t of o)for(let n of s){let o=(r+t)*Math.PI/180,s=[],c=e.u*Math.cbrt(n),d=.25,f=e.e,p=e.n,m=e.psi,h=e.u;for(let e=d;e<=i+1e-9;e+=d){let t=u_(o,m);m+=Math.sign(t)*Math.min(Math.abs(t),a*d),h+=(c-h)*(1-Math.exp(-.25/3)),f+=Math.sin(m)*h*d,p+=Math.cos(m)*h*d,s.push({e:f,n:p,psi:m,u:h,tau:e})}let g=e.u*i*(1-Math.cos(t*Math.PI/180))+.02*Math.abs(t)+4*Math.abs(n-1),_=P_(l,s,e)+g;(!u||_<u.cost-1e-9)&&(u={dh:t,f:n,cost:_,pen:_-g})}return u}var I_=class{constructor(){this.events=[],this.state=new Map,this.fresh=[]}check(e,t,n,r=!1){let i=this._seen??=new Set;i.clear(),i_(e,n,9,(e,a)=>{let o=b_(e.pose,a.pose),s=r?E_(o,h_(e.pose,a.pose,n)):T_(o.gap,o.wash),c=`${e.id}|${a.id}`,l=this.state.get(c)??null,u={contact:2,close:1},d=u[s]??0,f=u[l]??0;if(d>f){let i=m_(e.pose,a.pose,n,r),c=m_(a.pose,e.pose,n,r),l=[n[1],-n[0]],u=(e,t)=>(Math.sign((t.e-e.e)*l[0]+(t.n-e.n)*l[1])||1)*(Math.sin(e.psi)*e.u*l[0]+Math.cos(e.psi)*e.u*l[1]),d=i&&!c?e:c&&!i?a:u(e.pose,a.pose)>=u(a.pose,e.pose)?e:a,f={t,kind:s,gap:o.gap,a:e.name,b:a.name,fault:d.name,user:!!(e.user||a.user),userFault:!!d.user};this.events.push(f),this.fresh.push(f)}let p=r?Math.abs(h_(e.pose,a.pose,n))<=o_.ahead?o_.side:o.reach?S_:o_.clear:o.wash?s_.wash:s_.tolerable;(d>f||d<f&&o.gap>p+.3)&&this.state.set(c,d?s:null),i.add(c)});for(let e of this.state.keys())i.has(e)||this.state.delete(e)}clash(e,t,n){let r={t:n,kind:`clash`,gap:b_(e.pose,t.pose).gap,a:e.name,b:t.name,fault:null,user:!!(e.user||t.user),userFault:!1};this.events.push(r),this.fresh.push(r)}drain(){let e=this.fresh;return this.fresh=[],e}summary(){let e=(e,t=()=>!0)=>this.events.filter(n=>n.kind===e&&t(n)).length;return{close:e(`close`),contact:e(`contact`),clash:e(`clash`),closeUser:e(`close`,e=>e.user),contactUser:e(`contact`,e=>e.user),clashUser:e(`clash`,e=>e.user),userFault:this.events.filter(e=>e.userFault).length}}},L_={easy:.08,balanced:.015,fast:.004},R_={_0x778c02:8,ride:4,_0x1b99da:3,progress:.3,lambda:.01,_0xa5e398:8,levels:[0,.25,.5,1,1.35,1.7],_0x0c1f10:!0,through:!1},z_={easy:.004,balanced:.002,fast:.001,flow:R_.lambda},B_={easy:`cruise`,balanced:`sporty`,fast:`race`,flow:`cruise`},V_={_0x76c87b:0,effort:`balanced`,_0xa5e398:6,_0xe8351a:.6,marks:[],_0xd6127f:1/60,_0x58d966:.05,_0x55e302:0,_0x531918:150,arriveM:30,_0x07461b:3,_0xe8c5b4:40,_0x086b3f:[-40,-20,0,20,40],_0x4c8c5f:[-20,-12,-6,0,6,12,20],_0x8dcfb2:.6,_0x7504d5:2.5,_0x723aef:25,_0x23f408:2,_0x441076:15,_0x0c1f10:!0,sprint:{easy:[0,0],balanced:[.08,10],fast:[.2,25],flow:[.08,10]},_0x57141a:.04,_0xbc0dc5:80,_0xd372fa:.5,_0x033541:.5,_0x89fc5a:.05,_0xdd0f6a:.25,_0xdb51ba:.4,_0x30b303:15,_0x606918:.5,levels:[0,.5,1,1.35,1.7],stick:0,_0x697e75:1,_0x42c3db:8,_0xea3366:150,_0x8e0a73:50,_0x896ac6:250,_0xb09ae8:.03,_0x77b518:25,_0x042d53:4},H_=()=>typeof performance<`u`?performance.now():Date.now(),U_=e=>(e%360+360)%360,W_=(e,t)=>(e-t+540)%360-180;function G_(e,t){let n=.2,r=10;for(let i=0;i<40;i++){let i=(n+r)/2;e.eta*t/Math.max(i,1.5)-(e.c2*i*i+e.c4*i**4)*sm(i,e._0x6fbebf)>0?n=i:r=i}return n}function K_(e){if(e.goal)return{...e.goal};let t=e.start??{e:0,n:0},n=e.courseM??3e3,r=e.headingDeg*Math.PI/180;return{e:t.e+Math.sin(r)*n,n:t.n+Math.cos(r)*n}}function q_(e,t,n,r){let i=e.dominant;if(!i?.k)return 0;let a=2*Math.PI/i.k,o=e.sampleH?e.sampleH(t,n,r):e.sample(t,n,r,{}).h,s=o;for(let o=1;o<=4;o++){let c=o/8*a,l=e.sampleH?e.sampleH(t+i.dx*c,n+i.dy*c,r):e.sample(t+i.dx*c,n+i.dy*c,r,{}).h;s=Math.min(s,l)}return Math.max(0,o-s)}var J_=class{constructor(e,t={}){this.fp=e,this.o={...V_,...t},this.own={_0xa5e398:this.o._0xa5e398,levels:this.o.levels},this.lambda=this.o.lambda??(this.o._0x0c1f10?L_:z_)[this.o.effort]??z_.balanced,this.flowOpts(),this.goal=this.o.goal??K_(e.scn),this.final=this.o.final??e.scn?.goalFinal??!0;let n={e:e.ski.e,n:e.ski.n};this.line={e0:n.e,n0:n.n,len:Math.hypot(this.goal.e-n.e,this.goal.n-n.n)},this.drive=this.o.drive!==!1,this.hdg=e.ski.headingDeg,this.nextAt=0,this.last=null,this.arrived=!1,this.leadS=this.o.lead??0,this.energy=0,this.tLast=null,this.t0=e.i*e.h,this.start={e:e.ski.e,n:e.ski.n},this.wp=null,this.power=e.prof._0xbd9c94,this.midAt=0,this.job=null,this.stats={decisions:0,trials:0,planMs:0,dHdg:0,dW:0,leads:0,mids:0,midTrials:0,midMs:0}}report(){let e=this.fp,t=e.i*e.h-this.t0,n=Math.hypot(this.goal.e-this.start.e,this.goal.n-this.start.n),r=n-this.distToGoal;return{timeS:t,vmg:t>0?r/t:0,meanW:t>0?this.energy/t:0,energyJ:this.energy,doneM:r,totalM:n,arrived:this.arrived}}get pf(){let e=this.fp.field.planField();return this._pf&&this._pfBase===e?this._pf:(this._pfBase=e,this._pf=Object.create(e,{invIters:{value:this.o._0x697e75??1,writable:!0}}))}get sim(){let e=this.fp,t=e.field.planField();return this._sim||(this._sim=new wh({...e.scn,stepS:this.o._0xd6127f,tune:e.tune},t,e.depthFn,e.paddlerName,e.model),this._sim.record=()=>{}),this._sim.field=t,this._sim}get distToGoal(){return Math.hypot(this.goal.e-this.fp.ski.e,this.goal.n-this.fp.ski.n)}bearingToGoal(){let e=this.fp.ski;return U_(Math.atan2(this.goal.e-e.e,this.goal.n-e.n)*180/Math.PI)}crossTrack(e,t){let n=this.line,r=(this.goal.e-n.e0)/n.len,i=(this.goal.n-n.n0)/n.len;return(e-n.e0)*i-(t-n.n0)*r}get sprintBand(){return this.o.sprint?.[this.o.effort]??null}bankUpdate(e){let t=this.sprintBand;if(!t)return;let[n,r]=t,i=this.tBank==null?0:Math.max(0,e-this.tBank),a=(this.fp.power??0)>this.fp.prof.cpW+5;this.bank=Math.min(r,Math.max(0,(this.bank??Math.min(r,3))+i*(n-+!!a))),this.tBank=e}sprintOk(){let e=this.sprintBand;return!e||e[1]>0&&(this.bank??Math.min(e[1],3))>.5}allowW(e){return e<=this.fp.prof.cpW+5||this.sprintOk()}setGoal(e,t=!0){let n=this.fp.ski;this.goal={e:e.e,n:e.n},this.final=t,this.wp=null,this.route=null,this.job=null,this.nextAt=0,this.midAt=0,this.arrived=!1,this.line={e0:n.e,n0:n.n,len:Math.hypot(this.goal.e-n.e,this.goal.n-n.n)}}get target(){return this.wp??this.goal}finish(){this.arrived=!0,this.drive&&(this.fp.setSteer(0),this.fp.setPower(null))}update(e=this.o._0x042d53,{plan:t=!0}={}){let n=this.fp;if(this.arrived)return;if(this.final&&this.distToGoal<this.o.arriveM){this.arrived=!0,this.drive&&(n.setSteer(0),n.setPower(null));return}let r=n.i*n.h;if(this.tLast!=null&&(this.energy+=n.power*(r-this.tLast)),this.bankUpdate(r),this.tLast=r,this.wp&&Math.hypot(this.wp.e-n.ski.e,this.wp.n-n.ski.n)<this.o._0x77b518&&(this.wp=null),!this.table){this.tableJob??=this.tableGen();let t=H_();do if(this.tableJob.next().done){this.tableJob=null;break}while(H_()-t<e)}if(!t&&!this.drive){this.job=null;return}if(this.table&&r>=this.midAt&&this.distToGoal>200&&!this.job&&(this.planRouteNow(),this.midAt=r+this.o._0x42c3db),!this.job&&r>=this.nextAt?(this.job=this.planLocal(),this.nextAt=r+this.o._0xe8351a):!this.job&&this.leadS>0&&r>=(this.leadNextAt??0)&&(this.job=this.planLead(),this.leadNextAt=r+this.o._0xe8351a),this.job){let t=H_();do if(this.job.next().done){this.job=null;break}while(H_()-t<e)}if(!this.drive)return;let i=Math.round(lm(n.ski,this.hdg)*10)/10;n.setSteer(i),n.setPower(this.power)}*planLocal(){let e=H_(),{fp:t,sim:n,o:r}=this,i=t.prof._0xbd9c94,a=r.useFull?t.getState():null,o=this.target,s=this._lead;this.tview=this.trafficNow();let c=s?s.init:{e:t.ski.e,n:t.ski.n,u:t.ski.u,wp:t.ski.wPrime},l=U_(Math.atan2(o.e-c.e,o.n-c.n)*180/Math.PI),u=t.ski.p.mass*t.ski.p._0x283f96,d={e:c.e,n:c.n,u:c.u,wp:c.wp??c.wPrime,d:Math.hypot(o.e-c.e,o.n-c.n),tgt:o};r._0x76c87b>0&&(d.faceH=q_(this.pf,c.e,c.n,s?s.t0:t.i*t.h));let f=null,p=0,m=s?this.leadPlan?.hdg??U_(s.init.psi*180/Math.PI):this.hdg,h=s?this.leadPlan?.W??s.init.P:this.power??i,g=(e,t)=>e<t?e*e/(2*t):e-t/2,_=(e,t,n=t)=>r._0x89fc5a*g(Math.abs(W_(e,m)),r._0x30b303)+r._0xdd0f6a*(g(Math.abs(t-h)/i,r._0x606918)+.5*g(Math.abs(n-t)/i,r._0x606918)),v=s?.limit,y=new Set([...r._0x086b3f.map(e=>U_(l+e)),...r._0x4c8c5f.map(e=>U_(m+e))]),b=r.levels.map(e=>Math.min(t.prof.maxW,e*i)).filter(e=>this.allowW(e));v&&(y=new Set(r._0x4c8c5f.map(e=>U_(v.H0+e)).filter(e=>Math.abs(W_(e,v.H0))<=v.dH)),b=[...new Set([...b.filter(e=>e>=v.minW-1&&e<=v.maxW+1),Math.min(Math.max(v.W0,v.minW),v.maxW)])]);let x=[];for(let e of y)for(let t of b){let i=r.useFull?this.rollout(n,a,e,t,d,u):this.quick(()=>e,t,d,u,r._0xa5e398),o=i.score-_(e,t);x.push({hdg:e,W:t,score:o,r:i}),(!f||o>f.score)&&(f={hdg:e,W:t,score:o,r:i}),p++,yield}if(!r.useFull){let e=r._0xa5e398/2,n=(t,n)=>r=>r<e?t:n,a=(e,t)=>this.quick(()=>f.hdg,n(e,t),d,u,r._0xa5e398),o=f.W,s=f.W,c=f.score;for(let e of r.levels){let n=Math.min(t.prof.maxW,e*i);if(Math.abs(n-s)<1||!this.allowW(n))continue;let r=a(o,n).score-_(f.hdg,o,n);p++,yield,r>c&&(c=r,s=n)}for(let e of b){if(Math.abs(e-o)<1)continue;let t=a(e,s).score-_(f.hdg,e,s);p++,yield,t>c&&(c=t,o=e)}f.W=o,f.W2=s,f.score=c}if(this.alts=[],!s&&!r.useFull){let e=[f.hdg];for(let n of x.filter(e=>e.score>=f.score-r._0x23f408&&Math.abs(W_(e.hdg,f.hdg))>=r._0x441076).sort((e,t)=>t.score-e.score)){if(e.some(e=>Math.abs(W_(e,n.hdg))<r._0x441076))continue;e.push(n.hdg);let i=t.ski,a={e:i.e,n:i.n,psi:i.psi,u:i.u,wp:i.wPrime,P:t.power,sIn:t.steerIn,sSm:i.steerSm??0,cur:i.current??[0,0]},o=[];if(this.quickCore(this.pf,t.depthFn,a,()=>n.hdg,n.W,r._0xa5e398,r._0x58d966,t.i*t.h,0,[],o),this.alts.push({kind:`local`,hdg:n.hdg,W:n.W,behind:f.score-n.score,trace:o}),this.alts.length>=2)break}}if(s){let e=r._0xa5e398/2,t=this.quick(()=>f.hdg,t=>t<e?f.W:f.W2??f.W,d,u,r._0xa5e398).score,n=this.quick(()=>s.holdHdg??m,()=>s.holdW??h,d,u,r._0xa5e398).score,a=e=>Math.round(e/i*4),o=x.filter(e=>Math.abs(W_(e.hdg,f.hdg))>=10||a(e.W)!==a(f.W));s.result={gain:Math.max(0,t-n),margin:o.length?Math.max(0,f.score-Math.max(...o.map(e=>e.score))):1/0,hdg:f.hdg,W:f.W,W2:f.W2??f.W,headingErr:W_(f.hdg,U_(s.init.psi*180/Math.PI)),run:s.run>.35,_0xdf8a3e:s._0xdf8a3e,u:s.init.u,at:s.t0},this.stats.leads++}else{if(this.stats.dHdg+=Math.abs(W_(f.hdg,m)),this.stats.dW+=Math.abs(f.W-h),this.hdg=f.hdg,this.power=f.W,this.power2=f.W2??f.W,this.last=f,!r.useFull){let e=t.ski,n={e:e.e,n:e.n,psi:e.psi,u:e.u,wp:e.wPrime,P:t.power,sIn:t.steerIn,sSm:e.steerSm??0,cur:e.current??[0,0]},i=[];this.quickCore(this.pf,t.depthFn,n,()=>f.hdg,e=>e<r._0xa5e398/2?f.W:f.W2,r._0xa5e398,r._0x58d966,t.i*t.h,0,[],i),this.trace=i}this.commitPlan(),this.stats.decisions++,this.stats.trials+=p,this.stats.planMs+=H_()-e}}*planLead(){let e=this.fp,t=e.ski,n=this.leadS,r=t.headingDeg,i={e:t.e,n:t.n,psi:t.psi,u:t.u,wp:t.wPrime,P:e.power,sIn:e.steerIn,sSm:t.steerSm??0,cur:t.current??[0,0]},a=e.i*e.h,o=this.quickCore(this.pf,e.depthFn,i,()=>r,e.target,n,this.o._0x58d966,a,0),s=e.prof._0xbd9c94,c=e.target,l={init:{e:o.e,n:o.n,psi:o.psi,u:o.u,wp:o.wp,P:o.P,sIn:o.sIn,sSm:o.sSm,cur:i.cur},t0:a+n,run:o.run,_0xdf8a3e:o._0xdf8a3e,limit:null,holdHdg:r,holdW:c};try{this._lead=l,this.o.leadPlanner===`optimum`?yield*this.planLocal():yield*this.planWords(l,null);let t=l.result,u=t.W-c>=this.o._0x8dcfb2*s||Math.abs(t.headingErr)>this.o._0x723aef;u?(this.rapidT??=a,a-this.rapidT>this.o._0x7504d5&&(u=!1)):this.rapidT=null;let d=null;u&&(l.limit={W0:c,minW:.25*s,maxW:s,H0:r,dH:15},this.o.leadPlanner===`optimum`?yield*this.planLocal():yield*this.planWords(l,l.limit),d=l.result);let f=!1;if(this.tview){let t=[];this.quickCore(this.pf,e.depthFn,i,()=>r,e.target,4,this.o._0x58d966,a,0,[],null,t,0),f=P_(this.tview,t)>=.7*c_.close}let p=o.run>.2||!!e.ski.onRun||(e.ski.slopeForce??0)>.15*Math.max(e.ski.thrust??0,20);yield;let m=this.o._0xa5e398/2,h=this.quickCore(this.pf,e.depthFn,l.init,()=>t.hdg,e=>e<m?t.W:t.W2,this.o._0xa5e398,this.o._0x58d966,l.t0,0),g=Math.sin(t.hdg*Math.PI/180),_=Math.cos(t.hdg*Math.PI/180),v=e.field.dominant;if((this.reviewLog??=[]).push({t:a,gain:t.gain,tol:t.tolM??0,dH:t.headingErr,dL:bg(t.W,s)-bg(c,s),run:o.run>.35||!!e.ski.onRun}),this.reviewLog.length>40&&this.reviewLog.shift(),yield,this.leadPlan={...t,gain:t.gain,margin:t.margin,W0:c,rapid:u,slow:d,canSurf:p,trafficRisk:f,runEnd:h.run>.35,pearlRisk:h.maxSlope>.21,catchS:u?this.crestCatchS(l.init,l.t0):1/0,headSea:v.dx*g+v.dy*_<-.2,crest:this.crestAhead(l.init,t.hdg,l.t0)},this.o.leadPlanner!==`optimum`){yield;let o=this.leadPlan,l=u?Mg({B:s,W0:c,run:o.run,slow:o.slow,catchS:o.catchS,canSurf:o.canSurf}):{W:t.W,W2:t.W2,headingErr:t.headingErr},d=l.W,f=l.W2??l.W,p=U_(r+l.headingErr),m=[],h=this.o._0xa5e398/2;this.quickCore(this.pf,e.depthFn,i,(e,t,i)=>i<n?r:p,t=>t<n?e.target:t-n<h?d:f,n+this.o._0xa5e398,this.o._0x58d966,a,0,[],m),this.leadPlan.coach={trace:m,power:e.target,power2:f,gain:t.gain,gap:Math.max(0,(t.bestScore??0)-(t.score??0)),leadS:n},this.commitPlan()}}finally{this._lead=null}}*planWords(e,t){let{fp:n,o:r}=this,i=n.prof._0xbd9c94,a=this.target,o=e.holdHdg,s=e.holdW,c=n.ski.p.mass*n.ski.p._0x283f96,l=e.init,u=r._0xa5e398/2,d={e:l.e,n:l.n,u:l.u,wp:l.wp,d:Math.hypot(a.e-l.e,a.n-l.n),tgt:a},f=B_[r.effort]??`sporty`,p=(Rg.tolMph[f]??Rg.tolMph.sporty)*(Rg.tolScale??1)/2.23694*r._0xa5e398,m=Cg,h=[0,-m.little,m.little,-m.full,m.full].filter(e=>(!t||Math.abs(e)<=t.dH)&&(!Rg.noTurn||e===0)),g=e=>Math.min(n.prof.maxW,e),_=bg(s,i),v=yg.slice(0,7).map((e,t)=>({level:t,W:g(e*i)}));v=v.filter(e=>e.level>=(Rg.minLevel??0)&&this.allowW(e.W)),t&&(v=v.filter(e=>e.W>=t.minW-1&&e.W<=t.maxW+1));let y=(e,t,n=t)=>this.quick(()=>U_(o+e),t===n?t:e=>e<u?t:n,d,c,r._0xa5e398).score,b=y(0,s),x=[],S=1;yield,t&&v.push({level:_,W:Math.min(Math.max(s,t.minW),t.maxW),held:!0});for(let e of h)for(let t of v)x.push({dH:e,W:t.W,level:t.level,score:y(e,t.W)}),S++,yield;let C=x.reduce((e,t)=>t.score>e.score?t:e,x[0]),w={...C,W2:C.W};for(let e of v){if(Math.abs(e.W-C.W)<1)continue;let t=y(C.dH,C.W,e.W);S++,yield,t>w.score+.25*p&&(w={...C,W2:e.W,score:t})}let T=Math.max(w.score,b),E;if(!t&&b>=T-p*(this.coachHold?1:.6))E={dH:0,W:s,W2:s,score:b,level:_};else{let e=x.filter(e=>e.score>=T-p),n=e=>Math.abs(e.level-_)+(e.dH?1.5+Math.abs(e.dH)/25:0);if(!e.length)E=w;else{let r=t?null:this.coachLast,i=(r&&e.find(e=>e.level===r.level&&Math.abs(W_(U_(o+e.dH),r.hdg))<=6))??e.reduce((e,t)=>n(t)<n(e)-1e-9||Math.abs(n(t)-n(e))<1e-9&&t.score>e.score?t:e,e[0]);E={...i,W2:i.W};for(let e of v){if(Math.abs(e.W-i.W)<1)continue;let t=y(i.dH,i.W,e.W);S++,yield,t>E.score+.5*p&&(E={...i,W2:e.W,score:t})}}}t||(this.coachHold=E.dH===0&&E.W===s&&E.W2===s,this.coachLast=this.coachHold?null:{hdg:U_(o+E.dH),level:E.level}),e.result={gain:Math.max(0,T-b),margin:1/0,hdg:U_(o+E.dH),W:E.W,W2:E.W2??E.W,headingErr:E.dH,run:e.run>.35,_0xdf8a3e:e._0xdf8a3e,u:l.u,at:e.t0,bestScore:T,holdScore:b,tolM:p,score:E.score},t||this.stats.leads++,this.stats.trials+=S}setLead(e){this.leadS=e>0?e:0,this.leadS||(this.leadPlan=null,this.coachLast=null,this.coachHold=!1,this.rapidT=null,this.reviewLog=[],this.curPlan&&(this.curPlan.coach=null),this.prevPlan&&(this.prevPlan.coach=null))}crestCatchS(e,t){let n=this.fp.field,r=n.dominant,i=Math.sin(e.psi),a=Math.cos(e.psi),o={},s=2*Math.PI/r.k,c=r.omega/r.k*(r.dx*i+r.dy*a)-e.u,l=n.hsRef;if(!(c>.3))return 1/0;let u=r=>n.sample(e.e-i*r,e.n-a*r,t,o).h,d=u(0),f=u(.5);for(let e=1;e<=1.2*s;e+=.5){let t=u(e);if(f>d&&f>=t&&f>.2*l)return(e-.5)/c;d=f,f=t}return 1/0}crestAhead(e,t,n){let r=this.fp.field.planField(),i=Math.sin(t*Math.PI/180),a=Math.cos(t*Math.PI/180),o={},s=.1,c=Math.max(e.u,1.5),l=[];for(let t=0;t<=50;t++)l.push(r.sample(e.e+i*c*t*s,e.n+a*c*t*s,n+t*s,o).h);let u=l.map((e,t)=>(l[Math.max(0,t-1)]+e+l[Math.min(l.length-1,t+1)])/3),d=u[0];for(let e=1;e<u.length-1;e++){if(d=Math.min(d,u[e]),u[e]>u[e-1]&&u[e]>=u[e+1]&&u[e]-d>=Tg.seen&&e*s>=.3)return{rise:u[e]-d,inS:e*s};u[e]>u[e-1]&&u[e]>=u[e+1]&&(d=u[e])}return null}lookDir(){let e=this.fp.ski,t=this.leadPlan;if(!t)return null;let n=this.wp??(this.route?.path??[]).find(t=>Math.hypot(t.e-e.e,t.n-e.n)>=90);if(!n||Math.hypot(n.e-e.e,n.n-e.n)<60)return null;let r=W_(U_(Math.atan2(n.e-e.e,n.n-e.n)*180/Math.PI),t.hdg);return Math.abs(r)>=15?r>0?`right`:`left`:null}coachInput(){let e=this.leadPlan;return e?{W:e.W,W2:e.W2,B:this.fp.prof._0xbd9c94,headingErr:e.headingErr,run:e.run,_0xdf8a3e:e._0xdf8a3e,u:e.u,W0:e.W0,rapid:e.rapid,canSurf:e.canSurf,runEnd:e.runEnd,pearlRisk:e.pearlRisk,catchS:e.catchS,headSea:e.headSea,crest:e.crest,at:e.at,gain:e.gain,margin:e.margin,trafficRisk:!!e.trafficRisk,mode:B_[this.o.effort]??`sporty`,_0xa5e398:this.o._0xa5e398,lookDir:this.lookDir(),review:this.reviewNow(),slow:e.slow?{W:e.slow.W,W2:e.slow.W2,headingErr:e.slow.headingErr}:null}:null}reviewNow(){if(({easy:`cruise`,balanced:`sporty`,fast:`race`}[this.o.effort]??`sporty`)===`cruise`||!this.reviewLog?.length)return null;let e=this.reviewLog[this.reviewLog.length-1].t,t=this.reviewLog.filter(t=>e-t.t<=5.5);if(t.length<6)return null;let n=e=>t.reduce((t,n)=>t+e(n),0)/t.length,r=n(e=>e.tol);if(!(n(e=>e.gain)>3*r))return null;let i=e=>t.filter(e).length/t.length,a=n(e=>e.dL),o=n(e=>e.dH),s=i(e=>e.dL>=2)>=.7&&a>=2,c=i(e=>e.dL<=-2)>=.7&&a<=-2,l=i(e=>Math.sign(e.dH)===Math.sign(o)&&Math.abs(e.dH)>=10)>=.7,u=null;return s?u=i(e=>e.run)>=.3?`could have caught that`:`more power there`:c?u=`wasted power`:l&&(u=`${o<0?`left`:`right`} was better`),u?{text:u,id:e}:null}markers(){let e=this.fp.ski,t=[];this.distToGoal>25&&t.push({e:this.goal.e,n:this.goal.n,kind:`goal`});let n=(e,t)=>Math.hypot(e.e-t.e,e.n-t.n)<40;this.wp&&t.push({e:this.wp.e,n:this.wp.n,kind:`wp`});let r=0;for(let i of this.route?.path??[])if(!(Math.hypot(i.e-e.e,i.n-e.n)<220||n(i,this.goal)||this.wp&&n(i,this.wp)||t.some(e=>n(i,e)))&&(t.push({e:i.e,n:i.n,kind:`route`}),++r>=3))break;return t}planNow(){let e=this.fp.i*this.fp.h;this.table||this.buildTable(),this.distToGoal>200&&(this.planRouteNow(),this.midAt=e+this.o._0x42c3db);for(let e of this.planLocal());this.nextAt=e+this.o._0xe8351a,this.prevPlan=null}guide(e=130){let t=this.planGuide(this.curPlan??this.snapshot(),e),n=this.fp.i*this.fp.h;if(!this.prevPlan||n-this.switchT>=this.o._0xdb51ba)return t;let r=mg(this.planGuide(this.prevPlan,e)),i=mg(t),a=Math.min(1,Math.max(0,(n-this.switchT)/this.o._0xdb51ba)),o=a*a*(3-2*a),s=[];for(let e=0;e<i.length;e++){let t=i[e],n=r[e];s.push(n?{e:n.e+(t.e-n.e)*o,n:n.n+(t.n-n.n)*o,W:n.W+(t.W-n.W)*o,a:n.a+(t.a-n.a)*o}:{...t,a:t.a*o})}return s}snapshot(){return{trace:this.trace??[],power:this.power,power2:this.power2,path:this.route?.path??null,alts:this.alts??[],routeAlt:this.routeAlt??null,coach:this.leadS>0?this.leadPlan?.coach??null:null}}commitPlan(){this.prevPlan=this.curPlan??null,this.curPlan=this.snapshot(),this.switchT=this.fp.i*this.fp.h}planGuide(e,t=130){let n=this.fp.ski,r=this.fp.prof._0xbd9c94,i=.55,a=e.coach,o=[{e:n.e-Math.sin(n.psi)*i,n:n.n-Math.cos(n.psi)*i,W:(a?a.power:e.power)??this.fp.power,a:1}],s=a?a.trace:e.trace,c=0,l=1/0;s.forEach((e,t)=>{let r=Math.hypot(e.e-n.e,e.n-n.n);r<l&&(l=r,c=t)});for(let e=c+1;e<s.length;e++)o.push({e:s[e].e,n:s[e].n,W:s[e].W,a:1});let u=()=>o.reduce((e,t,n)=>e+(n?Math.hypot(t.e-o[n-1].e,t.n-o[n-1].n):0),0),d=o[o.length-1],f=(a?a.power2:e.power2)??e.power??r;if(u()<t&&e.path){let n=d.e-o[0].e,r=d.n-o[0].n,i=Math.hypot(n,r)||1;for(let a of e.path)if(!((a.e-d.e)*n+(a.n-d.n)*r<=4*i)&&(o.push({e:a.e,n:a.n,W:f,a:.55}),u()>=t))break}return o.length<3&&this.distToGoal>5&&o.push({e:this.goal.e,n:this.goal.n,W:f,a:.55}),o}altGuides(e=110){let t=this.fp.ski,n=this.fp.prof._0xbd9c94,r=.55,i=[],a=this.curPlan??this.snapshot(),o=e=>({e:t.e-Math.sin(t.psi)*r,n:t.n-Math.cos(t.psi)*r,W:e,a:1}),s=a.coach,c=a.trace??[];if(s&&c.length>2){let e=s.trace[Math.min(s.trace.length-1,c.length-1)],t=c[c.length-1],r=Math.hypot(e.e-t.e,e.n-t.n),l=Math.min(s.trace.length-1,Math.ceil((s.leadS??.8)/.4)+1),u=Math.abs(bg(c[1].W,n)-bg(s.trace[l].W,n));(r>8||u>=2)&&i.push({kind:`local`,behind:s.gap??0,weight:.8,pts:[o(a.power??n),...c.slice(1).map(e=>({e:e.e,n:e.n,W:e.W,a:1}))]})}for(let e of a.alts??[])i.push({kind:`local`,behind:e.behind,weight:Math.max(0,1-e.behind/this.o._0x23f408),pts:[o(e.W),...e.trace.slice(1).map(t=>({e:t.e,n:t.n,W:e.W,a:1}))]});if(a.routeAlt){let t=[o(this.power??n)],r=0,s=t[0];for(let i of a.routeAlt.path)if(r+=Math.hypot(i.e-s.e,i.n-s.n),t.push({e:i.e,n:i.n,W:this.power2??this.power??n,a:1}),s=i,r>=e)break;t.length>=2&&i.push({kind:`route`,behind:a.routeAlt.slowerPct,weight:Math.max(0,1-a.routeAlt.slowerPct/(100*this.o._0x57141a)),pts:t})}return i}*tableGen(){let e=this.fp,t=e.field.planField(),n=t.openWater?t.openWater():t,r=$g(e.field),i=e.prof._0xbd9c94,a=e.ski,o=[];for(let t of e_){let s=[],c=n.scaled(t);for(let t of t_){let n=U_(r+t),o=n*Math.PI/180,l=this.quickCore(c,null,{e:0,n:0,psi:o,u:3.2,wp:e.prof.wPrime,P:i,sIn:0,sSm:0,cur:a.current??[0,0]},()=>n,i,40,this.o._0x58d966,0,12);s.push(Math.max(.5,l.along/28)),yield}o.push(s)}this.table=new n_(o)}buildTable(){for(let e of this.tableGen());}setEffort(e){this.o.effort=e,this.lambda=(this.o._0x0c1f10?L_:z_)[e]??this.lambda,this.flowOpts()}get flow(){return this.o.effort===`flow`}flowOpts(){Object.assign(this.o,this.flow?{_0xa5e398:R_._0xa5e398,levels:R_.levels}:this.own),this.flow&&this.o.lambda==null&&(this.lambda=R_.lambda)}get rideSpeed(){return this._rideU??=G_(this.fp.ski.p,this.fp.prof._0xbd9c94)}setDrive(e){if(e===this.drive)return;let t=this.fp;e?(this.energy=0,this.tLast=null,this.t0=t.i*t.h,this.start={e:t.ski.e,n:t.ski.n},this.arrived=!1,this.line={e0:t.ski.e,n0:t.ski.n,len:Math.hypot(this.goal.e-t.ski.e,this.goal.n-t.ski.n)}):(t.setSteer(0),t.setPower(null)),this.drive=e}planRouteNow(){let e=H_(),{fp:t,o:n}=this,r=t.ski,i=this.goal,a=t.i*t.h,o=$g(t.field);if(!this.table)return;let s=(e,n)=>Qg(t.field,e,n,a),c=(e,t,n)=>this.table.at(s(e,t),W_(n,o)),l=Math.hypot(i.e-r.e,i.n-r.n),u=[50,100,150,200];for(let e=350;e<l;e+=n._0xea3366)u.push(e);let d=[];for(let e=-n._0x896ac6;e<=n._0x896ac6;e+=n._0x8e0a73)d.push(e);let f=(e,n)=>!t.depthFn||t.depthFn(e,n)>=4,p=r_({from:{e:r.e,n:r.n},goal:i,_0x5516d6:u,offsets:d,speedAt:c,ok:f,scaleAt:s,maxStepOff:n._0x8e0a73*1.5});if(this.route=p,this.routeAlt=null,p&&this.o.routeAlt!==!1){let e=p.path.map(e=>e.off),t=n._0xbc0dc5,a=p.path.length,o=u.filter(e=>e<l-20),d=[];for(let e=-n._0x896ac6;e<=n._0x896ac6;e+=n._0x8e0a73/2)d.push(e);let m=r_({from:{e:r.e,n:r.n},goal:i,_0x5516d6:u,offsets:d,speedAt:c,ok:f,scaleAt:s,maxStepOff:n._0x8e0a73*1.5,maxSlope:n._0xd372fa,banned:(r,i)=>Math.abs(d[i]-(e[r]??0))<Math.min(t,n._0x033541*(o[r]??0))&&r<a-1});m&&m.time<=p.time*(1+n._0x57141a)&&(this.routeAlt={path:m.path,time:m.time,slowerPct:100*(m.time-p.time)/p.time})}let m=null;if(p&&p.straightTime-p.time>n._0xb09ae8*p.straightTime){let e=p.path.find(e=>Math.hypot(e.e-r.e,e.n-r.n)>=120&&Math.abs(e.off)>=n._0x8e0a73*.9)??null;m=e?{e:e.e,n:e.n}:null}this.wp=m,this.commitPlan(),this.stats.mids++,this.stats.midMs+=H_()-e}quick(e,t,n,r,i,a=this.o._0x58d966,o=this.o.marks){let s=this.fp,c=s.ski,l=this._lead,u=l?l.init:{e:c.e,n:c.n,psi:c.psi,u:c.u,wp:c.wPrime,P:s.power,sIn:s.steerIn,sSm:c.steerSm??0,cur:c.current??[0,0]},d=this.tview,f=d?[]:null,p=l?Math.max(0,l.t0-s.i*s.h):0,m=this.quickCore(this.pf,s.depthFn,u,e,t,i,a,l?l.t0:s.i*s.h,0,o,null,f,p),h=this.o.leash,g=h?h.at(i+p):null,_=(d?P_(d,f):0)+(g?h.cost(Math.hypot(m.e-g.e,m.n-g.n)):0)+(this.o._0xe8c5b4??0)*(m.shoal??0),v=this.o._0x76c87b>0&&n.faceH!=null?this.o._0x76c87b*this.lambda*r*go*(m.faceH-n.faceH):0;if(!m.marks.length){let e=this.score(n,r,m.e,m.n,m.u,m.wp,m.energy,m.aground,m);return _||v?{...e,score:e.score-_+v,traffic:_,face:v}:e}let y=0,b=null;for(let e of m.marks)b=this.score(n,r,e.e,e.n,e.u,e.wp,e.energy,m.aground),y+=b.score;return{...b,score:y/m.marks.length-_+v,traffic:_,face:v}}trafficNow(){let e=this.o.traffic;if(!e)return null;let t=this.fp.ski,n=this.line,r=e.course??[(this.goal.e-n.e0)/(n.len||1),(this.goal.n-n.n0)/(n.len||1)];return j_({e:t.e,n:t.n,psi:t.psi,u:t.u},e.others()??[],r,{_0xa5e398:this.o._0xa5e398,small:!!e.small})}quickCore(e,t,n,r,i,a,o,s,c=0,l=[],u=null,d=null,f=0){let p=this.fp,m=p.ski.p,h={},g=Math.round(a/o),_=p.prof.cpW,v=p.prof.wPrime,y=m.mass*m._0x283f96,b=n.cur,{e:x,n:S,psi:C,u:w,wp:T,P:E,sIn:D,sSm:O}=n,k=0,A=0,ee=!1,j=x,M=S,N=0,P=0,F=0,I=0,L=0,te=0,ne=!1,re=0,ie=this.fp?.prof?._0xbd9c94??0,ae=R_.through?`vrel`:`u`,oe=this.o._0x07461b??0,se=this.flow?this.rideSpeed:1/0,ce=[],le=l.map(e=>Math.round(e/o)),ue=e.dominant,de=ue.omega/ue.k,fe=(m._0xb23f0a??0)>0&&p.ski.wind&&(p.ski.wind[0]||p.ski.wind[1])?p.ski.wind:null,pe=.6125*(m._0xb23f0a??0)*(m._0xfd7ed3??0),me=typeof i==`function`?i:()=>i,he=Math.max(1,Math.round(.4/o)),ge=Math.max(1,Math.round(.25/o)),_e=1-Math.exp(-o/.2),ve=m._0x621947,ye=Math.round(c/o),be=C;for(let n=0;n<g;n++){n===ye&&(j=x,M=S),u&&n%he===0&&u.push({e:x,n:S,W:me(n*o)}),d&&n>0&&n%ge===0&&d.push({e:x,n:S,psi:C,u:w,tau:f+n*o});let i=s+n*o,a=Math.sin(C),c=Math.cos(C),l=c,p=-a,g=(C*180/Math.PI%360+360)%360,be=Math.max(-1,Math.min(1,Math.round(W_(r(x,S,n*o),g)/25*10)/10||0))-D,xe=3*o;D+=Math.abs(be)<xe?be:Math.sign(be)*xe;let Se=D*.7;E+=(me(n*o)-E)*_e,T<=0&&E>_&&(E=_),T=E>_?Math.max(0,T-(E-_)*o):Math.min(v,T+.5*(_-E)*o),k+=E*o,E>ie&&(A+=(E-ie)*o);let Ce=e.sample(x,S,i,h),we=((e.sampleH?e.sampleH(x+a*ve,S+c*ve,i):e.sample(x+a*ve,S+c*ve,i,{}).h)-(e.sampleH?e.sampleH(x-a*ve,S-c*ve,i):e.sample(x-a*ve,S-c*ve,i,{}).h))/(2*ve),Te=Ce.sx*l+Ce.sn*p,R=b[0]*a+b[1]*c,Ee=Ce.ue*a+Ce.un*c+R,De=w-Ee,Oe=Math.min(Math.max((w-de*(ue.dx*a+ue.dy*c))/(w+de),0),1),ke=E>0?m.eta*E/Math.max(w-R,1.5):0,z=(m.c2*De*Math.abs(De)*(1+m._0x6adfa9*O*O)+m.c4*De*De*De*Math.abs(De))*sm(De,m._0x6fbebf),Ae=-y*go*m._0x6f9fed*(1-m._0x692a92*Oe)*we,B=(m._0xf3bf83*y*go*we*we+m._0x785bcb*y*Math.abs(we)*Math.abs(De))*Oe,je=m._0x63da57*y*go*Te*Te,Me=0;if(fe){let e=(fe[0]-a*w)*a+(fe[1]-c*w)*c;Me=pe*Math.abs(e)*e}P=Ae/Math.max(z,1),F=Te,I=Math.max(I,Math.abs(we)),ne=Ae>.35*ke&&we<-.02&&(ae===`vrel`?De:w)>=se,ne&&(L+=o,E<=3&&(te+=o)),w=Math.max(.2,w+(ke+Ae+Me-z-B-je)/y*o);let Ne=Ce.sx*ue.dx+Ce.sn*ue.dy,Pe=(m.waveLean??0)>0&&Ne<-.01&&w>1.5?Math.min(m._0xcf574d??.26,m.waveLean*Math.atan(Math.abs(Te))*Math.min(1,-Ne/.04)):0;if(C+=(Se*m._0x75b649*(w/(w+2))+m.broach*(1-(m._0xa51398??0)*Math.min(1,Pe/(m._0xcf574d??.26)))*Te*Math.min(w/6,1.2))*o,O+=(Se-O)*Math.min(1,o*4),x+=Math.sin(C)*w*o,S+=Math.cos(C)*w*o,t){let e=t(x,S);if(e<.7){ee=!0;break}e<oe&&(re=Math.max(re,oe-e))}N<le.length&&n+1===le[N]&&(ce.push({e:x,n:S,u:w,wp:T,energy:k}),N++)}let xe=this.o._0x76c87b>0&&!ee?q_(e,x,S,s+g*o):0;return{marks:ce,psi:C,P:E,sIn:D,sSm:O,run:P,maxSlope:I,_0xdf8a3e:F,e:x,n:S,u:w,wp:T,energy:k,above:A,aground:ee,shoal:re,along:(x-j)*Math.sin(be)+(S-M)*Math.cos(be),ride:L,glide:te,endRun:ne,faceH:xe}}score(e,t,n,r,i,a,o,s,c=null){let l=e.tgt??this.goal,u=Math.hypot(l.e-n,l.n-r),d=Math.abs(this.crossTrack(n,r)),f=.5*t*(i*i-e.u*e.u),p=Math.max(0,e.wp-a),m=.4*Math.max(0,d-this.o._0x531918)+(s?500:0);if(this.flow&&c){let t=R_,a=t._0x778c02*(c.glide+(c.endRun?t._0x1b99da:0))+t.ride*(c.ride-c.glide),l=t._0x0c1f10&&c.above!=null?c.above:o;return{score:t.progress*(e.d-u)+a-this.lambda*(l+p-f)-m,progress:e.d-u,energy:o,dWp:p,dKE:f,cross:d,u:i,e:n,n:r,aground:s,ride:c.ride,glide:c.glide}}return{score:e.d-u-this.lambda*((this.o._0x0c1f10?0:o)+p-f)-m,progress:e.d-u,energy:o,dWp:p,dKE:f,cross:d,u:i,e:n,n:r,aground:s}}rollout(e,t,n,r,i,a){e.setState(t),e.mode=`paddle`,e.autoPower=!0,e.target=r;let o=e.h,s=Math.round(this.o._0xa5e398/o),c=Math.max(1,Math.round(.1/o)),l=0,u=0,d=!1,f=0,p=0,m=this.flow?this.rideSpeed:1/0,h=this.fp?.prof?._0xbd9c94??0;for(let t=0;t<s;t++)t%c===0&&(e.steerCmd=Math.round(lm(e.ski,n)*10)/10),e.stepOnce(null),l+=e.power*o,e.power>h&&(u+=(e.power-h)*o),e.aground&&(d=!0),e.ski.onRun&&e.ski.u>=m&&(f+=o,e.power<=3&&(p+=o));let g=e.ski;return this.score(i,a,g.e,g.n,g.u,g.wPrime,l,d,{ride:f,glide:p,above:u,endRun:!!g.onRun&&g.u>=m})}},Y_=class{constructor({uRide:e,gapS:t=1}){this.o={uRide:e,gapS:t},this.reset()}reset(){this.done=[],this.start=null,this.last=-1/0,this.lastT=null,this.surfS=0,this.glideSurfS=0,this.glideS=0,this.totalS=0,this.fed=0}add(e,t,n,r){let i=this.lastT==null?0:Math.min(.5,Math.max(0,e-this.lastT));this.lastT=e,this.totalS+=i;let a=r<=3&&n>.89408,o=!!t&&n>=this.o.uRide;a&&(this.glideS+=i),o&&(this.surfS+=i,a&&(this.glideSurfS+=i),(this.start==null||e-this.last>this.o.gapS)&&(this.start!=null&&this.done.push(this.last-this.start),this.start=e),this.last=e)}feed(e){(e.length<this.fed||this.fed&&e[0]?.t!==this.t0)&&this.reset(),this.t0=e[0]?.t;for(let t=this.fed;t<e.length;t++){let n=e[t];this.add(n.t,n.onRun,n.u,n.power)}return this.fed=e.length,this}current(e=this.lastT){return this.start!=null&&e-this.last<=this.o.gapS?this.last-this.start:0}episodes(){let e=[...this.done];return this.start!=null&&e.push(this.last-this.start),e.sort((e,t)=>t-e)}get longest(){return this.episodes()[0]??0}timeIn(e){return this.episodes().filter(t=>t>=e).reduce((e,t)=>e+t,0)}summary(){let e=Math.max(this.totalS,1e-9),t=this.episodes();return{episodes:t,longest:t[0]??0,surf:this.surfS/e,glide:this.glideS/e,glideSurf:this.glideSurfS/e,over30:this.timeIn(30)/e}}},X_={gain:.06,lat:.3048+a_.halfBeam,angle:19.5,ahead:-.3,behind:.7,fade:2.5,gone:8,lead:1.2,on:.1,off:.3},Z_={gain:.04,near:.15,far:.46,on:.12,off:.4,touch:-.05,gone:1.2},Q_=1/3,$_=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},ev=(e,t,n,r,i)=>e<t?$_(t-r,t,e):e>n?1-$_(n,n+i,e):1;function tv(e,t){let n=[Math.sin(t.psi),Math.cos(t.psi)],r=[n[1],-n[0]],i=Math.abs(Math.atan2(Math.sin(e.psi-t.psi),Math.cos(e.psi-t.psi)))*180/Math.PI,a=$_(.4*3,3,t.u??0)*(1-$_(10,20,i));if(a<=0)return[];let o=(e,i)=>{let a=e-t.e,o=i-t.n;return[a*n[0]+o*n[1],a*r[0]+o*r[1]]},s=[Math.sin(e.psi),Math.cos(e.psi)],c=(e.L??a_.L)/2,l=e.seatX??a_.seatX,u=-(t.L??a_.L)/2,[d,f]=o(e.e+s[0]*l,e.n+s[1]*l),[p,m]=o(e.e+s[0]*c,e.n+s[1]*c),h=[],g=u-d,_=X_.lat+Math.max(g,0)*Math.tan(X_.angle*Math.PI/180),v=g<X_.ahead?$_(-X_.lead,X_.ahead,g):g>X_.behind?Math.exp(-(g-X_.behind)/X_.fade)*(1-$_(X_.gone-2,X_.gone,g)):1,y=ev(Math.abs(f)-_,-X_.on,X_.on,X_.off-X_.on,X_.off-X_.on);v*y>0&&h.push({kind:`side`,side:Math.sign(f)||1,s:X_.gain*v*y*a});let b=ev(u-p,Z_.near,Z_.far,Z_.near-Z_.touch,Z_.gone-Z_.far)*ev(Math.abs(m),0,Z_.on,0,Z_.off-Z_.on);return b>0&&h.push({kind:`stern`,side:0,s:Z_.gain*b*a}),h}function nv(e,t){let n=[];t.forEach((t,r)=>{for(let i of tv(e,t))n.push({...i,who:r})}),n.sort((e,t)=>t.s-e.s);let r=0,i=1;for(let e of n)r+=i*e.s,i*=Q_;return{saving:r,parts:n}}var rv=.44704,iv={goalM:1609,courseS:30,paceS:60,bandMph:1,gapK:1/30,waitMph:5,resumeM:20,slowMph:2,goMph:2.5,spotM:[10,15],holdM:15,chaseM:40,caughtM:20,powerX:1.5,rubberMs:1.5,rubberCloseMs:.3,farM:500,dropM:[25,50],dwellS:2,ownS:20,scaleRate:.15,scaleMin:.4,scaleMax:1.5},av={d0:30,s:10,k:.5};function ov(e,t=av){if(!(e>t.d0))return 0;let n=(e-t.d0)/t.s;return t.k*n*n}function sv(e,t){return t>0?(e.c2*t*t+e.c4*t**4)*sm(t,e._0x6fbebf)*Math.max(t,1.5)/e.eta:0}var cv=class{constructor(e=[0,1]){let t=Math.hypot(e[0],e[1])||1;this.ce=e[0]/t,this.cn=e[1]/t,this.t=null,this.vel=[0,0],this.vNow=null,this.vAvg=null,this.age=0,this.isSlow=!1}update(e,t){let n=this.t==null?0:Math.max(0,t-this.t);this.t=t;let r=Math.max(0,e.u??0),i=Math.sin(e.psi)*r,a=Math.cos(e.psi)*r,o=e=>n>0?1-Math.exp(-n/e):1;if(this.vel[0]+=(i-this.vel[0])*o(2),this.vel[1]+=(a-this.vel[1])*o(2),this.vNow=this.vNow==null?r:this.vNow+(r-this.vNow)*o(3),this.age+=n,this.vAvg=this.vAvg==null?r:this.vAvg+(r-this.vAvg)*Math.min(1,n/Math.min(iv.paceS,Math.max(this.age,n,1e-6))),r>iv.slowMph*rv){let e=o(iv.courseS),t=this.ce+(i/r-this.ce)*e,n=this.cn+(a/r-this.cn)*e,s=Math.hypot(t,n)||1;this.ce=t/s,this.cn=n/s}this.isSlow=this.isSlow?this.vNow<iv.goMph*rv:this.vNow<iv.slowMph*rv}goal(e,t=0){return{e:e.e+this.ce*iv.goalM+this.cn*t,n:e.n+this.cn*iv.goalM-this.ce*t}}predict(e,t){return{e:e.e+this.vel[0]*t,n:e.n+this.vel[1]*t}}rel(e,t,n){let r=t-e.e,i=n-e.n;return{a:r*this.ce+i*this.cn,c:r*this.cn-i*this.ce,d:Math.hypot(r,i)}}};function lv(e=Math.random,t=0,n=0){return{state:`paddle`,since:-1e9,offset:(2*e()-1)*iv.bandMph*rv,side:n<0?-1:n>0?1:e()<.5?-1:1,spot:iv.spotM[0]+e()*(iv.spotM[1]-iv.spotM[0]),pref:t,lane:n,scale:1,vOwn:null,lastD:null,rubber:0,teleports:0}}function uv(e,t,n,r,i,a=.25,o=Math.random){let s=iv,{a:c,d:l}=r.rel(n,t.e,t.n),u=Math.max(r.vAvg??0,0);e.vOwn=e.vOwn==null?t.u:e.vOwn+(t.u-e.vOwn)*(1-Math.exp(-a/s.ownS));let d=t=>{t!==e.state&&(e.state=t,e.since=i)};if(l>s.farM){let t=s.dropM[0]+o()*(s.dropM[1]-s.dropM[0]),i=Math.PI/2*(1+o())*(e.side||1),a=Math.cos(i),c=Math.sin(i),l=n.e+t*(r.ce*a+r.cn*c),u=n.n+t*(r.cn*a-r.ce*c);return e.teleports++,e.lastD=null,e.vOwn=n.u,d(`paddle`),{state:`paddle`,vTarget:n.u,aim:null,powerX:1,teleport:{e:l,n:u,psi:Math.atan2(r.ce,r.cn),u:n.u}}}let f=i-e.since<s.dwellS;r.isSlow?d(`regroup`):e.state===`regroup`&&d(`paddle`),e.state===`catchup`&&l<s.caughtM&&d(`paddle`),e.state===`wait`&&(l<s.resumeM||c<0)&&d(`paddle`),e.state!==`regroup`&&c<0&&l>s.chaseM&&d(`catchup`);let p=Math.max(0,u+e.offset-s.gapK*(c-e.pref));e.state===`paddle`&&!f&&c>0&&p<s.waitMph*rv&&d(`wait`);let m=e.lastD!=null&&a>0?(e.lastD-l)/a:0;switch(e.lastD=l,e.rubber=0,e.state){case`wait`:return{state:`wait`,vTarget:0,aim:null,powerX:1,teleport:null};case`regroup`:{let i=(c>0?.3:-.3)*e.spot,a={e:n.e+e.side*e.spot*r.cn+i*r.ce,n:n.n-e.side*e.spot*r.ce+i*r.cn},o=Math.hypot(a.e-t.e,a.n-t.n),u=l<(e.hold??s.holdM);return{state:`regroup`,vTarget:u?0:Math.min(2.2,.6+.08*o),aim:u?null:a,powerX:1,teleport:null}}case`catchup`:{let t=Math.max(u,r.vNow??0)+s.bandMph*rv;m<s.rubberCloseMs&&(e.rubber=Math.min(s.rubberMs,Math.max(0,(l-s.caughtM)/30)));let i=r.predict(n,15);return{state:`catchup`,vTarget:t,aim:{e:i.e+e.lane*r.cn,n:i.n-e.lane*r.ce},powerX:s.powerX,teleport:null}}default:return{state:`paddle`,vTarget:p,aim:r.goal(n,e.lane),powerX:1,teleport:null}}}function dv(e,t,n){let r=iv,i=(t-(e.vOwn??t))/Math.max(t,1);return e.scale=Math.min(r.scaleMax,Math.max(r.scaleMin,e.scale*Math.exp(r.scaleRate*i*n))),e.scale}var fv={man:[`Sam`,`Ben`,`Tom`,`Jack`,`Leo`,`Max`,`Raj`,`Kai`,`Luis`,`Omar`,`Hugo`,`Finn`,`Noah`,`Eli`,`Theo`,`Jon`,`Ivan`,`Kenji`,`Marco`,`Dev`],woman:[`Amy`,`Zoe`,`Mia`,`Ella`,`Ava`,`Lucy`,`Nia`,`Rosa`,`Ana`,`Ivy`,`Maya`,`Lena`,`Sara`,`Tess`,`Keiko`,`Priya`,`Jade`,`Nora`,`Ruth`,`Kim`]},pv={Race:`race`,"Group paddle":`group`};function mv(e){let t=Math.floor(e/4);return{lateral:[-4,4,-8,8][e%4]+(t%2?2:0),back:t*6}}var hv=[{level:3,factor:.75,name:`Cruiser`,color:3902463,body:`tank-f`,pfd:`Orange`},{level:4,factor:1,name:`Tempo`,color:3066993,body:`wetsuit-m`,pfd:`Red`},{level:5,factor:1.35,name:`Hammer`,color:16752410,body:`mike-kit`,pfd:`Green`},{bot:!0,name:`Auto`,color:12606719,body:`sportsuit-f`,pfd:`Yellow`}];function gv(e=hv.length,t=!1){let n=hv.slice(0,Math.min(e,hv.length)),r=[15158332,1752220,15844367,10181046,3426654,15105570,1482885,13849600,2719929,9323693];for(let i=hv.length;i<e;i++){let e=i-hv.length,a=hv[e%3],o=[.8,1,1.2][e%3]*(1+.03*(e/3|0)*(e%2?1:-1));n.push(t?{...hv[3],name:`Auto ${2+e}`,color:r[e%r.length],body:a.body,pfd:a.pfd}:{...a,level:a.level,factor:o,name:`${a.name} ${2+(e/3|0)}`,color:r[e%r.length]})}return n}var _v={easy:`Cruise`,balanced:`Sporty`,fast:`Race`,flow:`Flow`},vv=.4,yv={plan:85,avoid:60,draft:16,k:6},bv={full:6,minFull:2,planM:40,planMinM:15,lockM:10,dwellS:2,everyS:.25,fine:Hp,coarse:2*Hp},xv=(e,t)=>(Math.atan2(t.e-e.e,t.n-e.n)*180/Math.PI+360)%360,Sv=class{constructor({makeGhost:e,state0:t,goal:n,competitors:r=hv,arriveM:i=30,depthFn:a=null,minDepthM:o=8,effort:s=`balanced`,traffic:c=!0,drafting:l=!0,smallSea:u=!1,session:d=`race`,rand:f=Math.random,course:p=null}){this.smallSea=u,this.goal=n,this.arriveM=i,this.start=t,this.effort=s,this.traffic=c,this.user=null,this.log=new I_,this.drafting=l,this.course=d===`group`?null:p,this.userCur=null,this.session=d===`group`?`group`:`race`,this.rand=f;let m=n.e-t.e,h=n.n-t.n,g=Math.hypot(m,h)||1;this.d0=this.course?this.course.total:g,this.ue=m/g,this.un=h/g,this.re=this.un,this.rn=-this.ue;let _=this.session===`group`;_&&(this.trk=new cv([this.ue,this.un]));let v=a?a(t.e,t.n):1/0,y=Math.min(o,Math.max(2,.8*(Number.isFinite(v)?v:o)));this.setters=r.map((r,i)=>{let o=e(),l=mv(i),d=r.bot?null:r.factor*o.prof._0xbd9c94,p=(e,n)=>({e:t.e+this.re*e-this.ue*n,n:t.n+this.rn*e-this.un*n}),m=e=>!a||(()=>{let t=p(e,l.back);return a(t.e,t.n)>=y})(),h=m(l.lateral)?l.lateral:m(-l.lateral)?-l.lateral:l.lateral;o.setState({...t,...p(h,l.back)}),d!=null&&o.setPower(d);let g=typeof r.bot==`string`?r.bot:s,v=this.course?{e:n.e,n:n.n}:{e:n.e+this.re*h,n:n.n+this.rn*h},b={},x=c?{others:()=>{let e=b.s.g.ski;return this.near(e.e,e.n,b.s,yv.plan,yv.k)},course:[this.ue,this.un],small:u}:null,S=_?{_0x531918:1e9,_0x42c3db:1e9,leash:{at:e=>this.user?this.trk.predict(this.user,e):null,cost:ov}}:{},C=r.bot?new J_(o,{goal:v,final:!this.course,effort:g,drive:!0,_0x697e75:0,_0xe8351a:1.2,routeAlt:!1,_0x42c3db:15,traffic:x,...S}):null,w=new Y_({uRide:G_(o.ski.p,o.prof._0xbd9c94)}),T=_?lv(f,-l.back,h):null;if(T){let e=Math.floor(i/4);T.hold=iv.holdM+2*e,T.spot+=2*e}return b.s={...r,name:r.bot===!0&&!_?`${r.name} ${_v[g]??``}`.trim():r.name,follows:r.bot===!0,lane:h,back:l.back,W:d,g:o,auto:C,ep:w,finishT:null,nextSteer:0,nextAvoid:0,aim:v,avoid:{dh:0,f:1},gm:T,prof0:o.prof,cur:this.course?this.course.cursor():null}})}lodUpdate(e,t,n){let r=this.lod??={nFull:bv.full,planM:bv.planM,ms:0,at:-1e9,count:[0,0,0]};if(e-r.at<bv.everyS&&e>=r.at)return;r.at=e;let i=this.setters.filter(e=>e.finishT==null);if(!(n>0)){for(let t of i)this.setTier(t,0,e,!0);return}r.ms>n?r.nFull>bv.minFull?r.nFull--:r.planM=Math.max(bv.planMinM,r.planM*.8):r.ms<.6*n&&(r.planM<bv.planM?r.planM=Math.min(bv.planM,r.planM*1.25):r.nFull<i.length&&r.nFull++);let a=t?Math.sin(t.psi):this.ue,o=t?Math.cos(t.psi):this.un,s=t?.e??this.start.e,c=t?.n??this.start.n;for(let e of i){let t=e.g.ski,n=t.e-s,r=t.n-c,i=Math.hypot(n,r);e.dUser=i,e.rank=i*(n*a+r*o>=-.3*i?1:2)}i.sort((e,t)=>e.rank-t.rank);let l=[0,0,0];i.forEach((t,n)=>{let i=t.g,a=t.dUser<bv.lockM||(i.clashI??-1)>i.i||e-(t.bumpT??-1e9)<2,o=a||n<r.nFull?0:t.dUser>r.planM&&!(i.draft>.005)?2:1;this.setTier(t,o,e,a),l[t.tier??0]++}),r.count=l}setTier(e,t,n,r=!1){(e.tier??0)!==t&&(!r&&n-(e.tierAt??-1e9)<bv.dwellS||(e.tier=t,e.tierAt=n,e.wantStep=t===0?bv.fine:bv.coarse))}reindex(){let e=this._ix??=[],t=0,n=(n,r)=>{let i=e[t]??={};i.s=n,i.k=r,i.a=this.along(r.e,r.n),t++};for(let e of this.setters)e.finishT??n(e,e.g.ski);this.user&&n(null,this.user),e.length=t,e.sort((e,t)=>e.a-t.a)}near(e,t,n,r,i){let a=this._ix;if(!a?.length)return[];let o=this.along(e,t),s=[],c=0,l=a.length;for(;c<l;){let e=c+l>>1;a[e].a<o?c=e+1:l=e}let u=a=>{if(a.s===n)return;let o=Math.hypot(a.k.e-e,a.k.n-t);if(o>r||s.length>=i&&o>=s[s.length-1][0])return;let c=s.length;for(s.push(null);c>0&&s[c-1][0]>o;)s[c]=s[c-1],c--;s[c]=[o,a],s.length>i&&s.pop()};for(let e=c-1;e>=0&&o-a[e].a<=r;e--)u(a[e]);for(let e=c;e<a.length&&a[e].a-o<=r;e++)u(a[e]);return s.map(([,e])=>({e:e.k.e,n:e.k.n,psi:e.k.psi,u:e.k.u,...e.s?{}:{phase:e.k.phase,power:e.k.power}}))}posesBut(e){let t=[];for(let n of this.setters)if(n!==e&&n.finishT==null){let e=n.g.ski;t.push({e:e.e,n:e.n,psi:e.psi,u:e.u})}return this.user&&t.push(this.user),t}setEffort(e){this.effort=e;for(let t of this.setters)t.follows&&t.auto&&(t.auto.setEffort(e),this.session!==`group`&&(t.name=`Auto ${_v[e]??``}`.trim()))}groupTick(e,t){let n=this.trk;n.update(t,e);let r=this.gAt==null?.25:e-this.gAt;if(!(this.gAt!=null&&r<.25&&r>=0)){this.gAt=e;for(let i of this.setters){if(i.finishT!=null)continue;let a=i.g,o=a.ski,s=uv(i.gm,{e:o.e,n:o.n,psi:o.psi,u:o.u},t,n,e,Math.max(r,.05),this.rand??Math.random);if(i.uSm=i.uSm==null?o.u:i.uSm+(o.u-i.uSm)*(1-Math.exp(-Math.max(r,.05)/3)),s.teleport){let e=a.getState();a.setState({...e,e:s.teleport.e,n:s.teleport.n,psi:s.teleport.psi,u:s.teleport.u}),i.nextSteer=i.nextAvoid=0,i.uSm=s.teleport.u,i.auto&&(i.auto.wp=null)}i.dec=s;let c=s.powerX>1?{...i.prof0,maxW:i.prof0.maxW*s.powerX}:i.prof0;if(a.prof!==c&&(a.prof=c),i.auto){let e=n.goal(t,i.lane);if(i.auto.goal=e,i.auto.wp=null,s.state===`paddle`){let e=dv(i.gm,s.vTarget,Math.max(r,.05)),t=i.prof0._0xbd9c94,n=e>=1?[1,i.prof0.cpW/t]:[],a=t=>[...new Set([...t.map(t=>+(t*e).toFixed(3)),...n])].sort((e,t)=>e-t);i.auto.o.levels=a(i.auto.flow?R_.levels:V_.levels),i.auto.own.levels=a(V_.levels)}}}}}groupDrive(e){let t=e.g,n=t.ski,r=e.dec;if(r){if(t.i>=e.nextAvoid){let i=this.traffic&&r.aim?F_({me:{e:n.e,n:n.n,psi:n.psi,u:n.u},others:this.near(n.e,n.n,e,yv.avoid,yv.k),course:[this.trk.ce,this.trk.cn],bearingDeg:xv(n,r.aim),small:this.smallSea}):{dh:0,f:1};e.avoid=i;let a=r.vTarget,o=a>.05?Math.min(t.prof.maxW,Math.max(0,sv(n.p,a)+120*(a-(e.uSm??n.u)))):0;t.setPower(Math.round(o*i.f)),e.nextAvoid=t.i+Math.round(.5/t.h)}t.i>=e.nextSteer&&(t.setSteer(r.aim?Math.round(lm(n,xv(n,r.aim)+e.avoid.dh)*10)/10:0),e.nextSteer=t.i+Math.round(.2/t.h))}}contacts(e,t,n){this.clashAt??=new Map;let r=(e,r)=>{if(e.user)n?.bump?.(r);else{e.g.bump(r);let n=this.setters.find(t=>t.g===e.g);n&&(n.bumpT=t,n.tier&&this.setTier(n,0,t,!0))}};i_(e,[this.ue,this.un],7,(e,i)=>{let a=x_(e.pose,i.pose);a&&(r(e,a.a),r(i,a.b));let o=`${e.id}|${i.id}`;if((this.clashAt.get(o)??-1e9)<t-.6&&w_(e.pose,i.pose)){this.clashAt.set(o,t),this.log.clash(e,i,t);for(let t of[e,i])t.user?n?.clash?.(.4):t.g.clash(.4)}})}along(e,t){return(e-this.start.e)*this.ue+(t-this.start.n)*this.un}sync(e,t=40,n=4,r=null,i=null,a=null,o=0){this.user=i,this.reindex(),this.lodUpdate(e,i,o);let s=this.session===`group`,c=s&&!!i;c&&this.groupTick(e,i);let l=e=>c&&e.dec&&(!e.auto||e.dec.state!==`paddle`||!e.auto.table),u=!0,d=()=>typeof performance<`u`?performance.now():Date.now();for(let e of this.setters)e.steps=0,e.spent=0,e.waiting=!1,e.auto&&r&&!e.auto.table&&(e.auto.table=r);let f=this.setters.filter(e=>e.auto&&e.finishT==null&&!(c&&e.dec&&e.dec.state!==`paddle`));if(f.length){let e=this.tick=(this.tick??0)+1,t=e=>!i||Math.hypot(e.g.ski.e-i.e,e.g.ski.n-i.n)<60;f.sort((e,n)=>(e.thinkAt??0)+(t(e)?0:3)-((n.thinkAt??0)+(t(n)?0:3)));let r=n,a=this.prof?d():0;for(let t of f){if(r<=.05&&t.auto.table)continue;let n=d();t.auto.update(Math.max(.05,r)),r-=d()-n,t.thinkAt=e,t.nextSteer=t.g.i+24}this.prof&&(this.prof[`route (bots)`]=(this.prof[`route (bots)`]??0)+d()-a)}let p=d();for(;;){let n=null;for(let r of this.setters)!r.waiting&&r.finishT==null&&r.steps<t&&r.g.i*r.g.h<e-1e-9&&(!n||r.g.i*r.g.h<n.g.i*n.g.h)&&(n=r);if(!n)break;let r=n.g,i=d();n.full??=r.field,r.field=e-r.i*r.h>vv||n.tier===2?n.full.planField?.()??n.full:n.full,n.wantStep&&r.setStep(n.wantStep)&&(n.wantStep=null,n.nextSteer=n.nextAvoid=0);let a=this.prof,o=a?d():0,u=a?e=>{let t=d();a[e]=(a[e]??0)+t-o,o=t}:null;if(l(n))this.groupDrive(n);else if(n.auto){if(!n.auto.table){n.waiting=!0,n.spent+=d()-i;continue}r.i>=n.nextSteer&&n.auto.hdg!=null&&(r.setSteer(Math.round(lm(r.ski,n.auto.hdg)*10)/10),n.nextSteer=r.i+Math.round(.2/r.h),u?.(`steer`))}else{if(this.traffic&&r.i>=n.nextAvoid){let e=r.ski,t=F_({me:{e:e.e,n:e.n,psi:e.psi,u:e.u},others:this.near(e.e,e.n,n,yv.avoid,yv.k),course:[this.ue,this.un],bearingDeg:xv(e,n.aim),small:this.smallSea});t.f!==n.avoid.f&&r.setPower(n.W*t.f),n.avoid=t,n.nextAvoid=r.i+Math.round((n.tier===2?1:.5)/r.h),u?.(`traffic: keep clear`)}r.i>=n.nextSteer&&(r.setSteer(Math.round(lm(r.ski,xv(r.ski,n.aim)+n.avoid.dh)*10)/10),n.nextSteer=r.i+Math.round(.2/r.h),u?.(`steer`))}if(r.i%Math.max(1,Math.round(.05/r.h))===0){let e=r.ski;r.draft=this.drafting?nv({e:e.e,n:e.n,psi:e.psi,u:e.u},this.near(e.e,e.n,n,yv.draft,4)).saving:0,u?.(`drafting`)}if(r.advance(r.h),n.steps++,u?.(`physics`),n.ep.add(r.i*r.h,r.ski.onRun,r.ski.u,r.power),c&&n.gm){if(n.gm.rubber>0){let e=r.ski;e.e+=Math.sin(e.psi)*n.gm.rubber*r.h,e.n+=Math.cos(e.psi)*n.gm.rubber*r.h}(n.dec?.powerX??1)>1&&(r.ski.wPrime=r.prof.wPrime)}if(this.course&&n.cur&&this.course.update(n.cur,r.ski.e,r.ski.n)){let e=this.course.target(n.cur);e&&(n.aim={e:e.e,n:e.n},n.auto&&n.auto.setGoal(e,!1))}!s&&(this.course?this.course.done(n.cur):this.along(r.ski.e,r.ski.n)>=this.d0-this.arriveM)&&(n.finishT=r.i*r.h,n.auto&&r.setSteer(0),r.setPower(0)),n.spent+=d()-i}{let e=this.lod;e&&(e.ms=.85*e.ms+.15*(d()-p))}let m=this.prof?d():0;{let t=this.setters.filter(e=>e.finishT==null).map(e=>{let t=e.g.ski;return{id:e.name,name:e.name,g:e.g,pose:{e:t.e,n:t.n,psi:t.psi,u:t.u,phase:e.g.phase,power:e.g.power}}});i&&t.push({id:`you`,name:`You`,user:!0,pose:i}),this.log.check(t,e,[this.ue,this.un],this.smallSea),this.traffic&&this.contacts(t,e,a)}this.prof&&(this.prof[`contacts and close calls`]=(this.prof[`contacts and close calls`]??0)+d()-m,this.prof.frames=(this.prof.frames??0)+1);for(let t of this.setters){let n=t.g;n.frames.length>4&&(n.frames.splice(0,n.frames.length-2),n.states.splice(0,n.states.length-2)),n.i*n.h<e-1e-6&&t.finishT==null&&(u=!1)}return u}rows(e){let t=this.course,n=t&&this.userCur?t.progress(this.userCur,e.ski.e,e.ski.n):this.along(e.ski.e,e.ski.n);return this.setters.map(e=>{let r=e.g.i*e.g.h-this.start.i*Hp,i=e.finishT==null?t&&e.cur?t.progress(e.cur,e.g.ski.e,e.g.ski.n):this.along(e.g.ski.e,e.g.ski.n):this.d0,a=e.ep.summary();return{name:e.name,color:e.color,level:e.level,lane:e.lane,W:e.W,avgMs:r>0?e.g.ski.distance/r:0,aheadM:n-i,finished:e.finishT!=null,finishT:e.finishT,longest:a.longest,glide:a.glide}})}},Cv={White:15922421,Red:13115439,Yellow:15909376,"Sky blue":4891615,"Royal blue":2052021,Navy:1780298,Carbon:1711135,Lime:9159498,Orange:16742938,Teal:1023375,Silver:12173511,Purple:8081343,Green:3054927,Pink:14697851},wv=[...Object.values(Cv),Cv.White,Cv.White],Tv={man:[`mike-kit`,`wetsuit-m`],woman:[`tank-f`,`wetsuit-f`,`sportsuit-f`]},Ev=.6,Dv={"1: just me":0,"2 paddlers":1,"3 paddlers":2,"4 paddlers":3,"5 paddlers":4,"6 paddlers":5,"8 paddlers":7,"10 paddlers":9,"12 paddlers":11,"16 paddlers":15,"20 paddlers":19,"30 paddlers":29,"40 paddlers":39};function Ov(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function kv(e,t){let n=e.slice();for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function Av(e,t){let n=[];return()=>(n.length||(n=kv(e,t)),n.pop())}function jv(e,{seed:t=1,bib:n=7,own:r={color:15659764,style:df.swoosh,c1:741288}}={}){let i=Ov(t),a=Av(wv,i),o=Av(Object.keys(Yo),i),s=Av(ff,i),c=Av(Tv.man,i),l=Av(Tv.woman,i),u=kv(Array.from({length:199},(e,t)=>t+1).filter(e=>e!==n),i),d=Av(fv.man,i),f=Av(fv.woman,i),p=(e,t)=>Math.hypot((e>>16&255)-(t>>16&255),(e>>8&255)-(t>>8&255),(e&255)-(t&255))<60,m=[];for(let t=0;t<e;t++){let e=a(),n=i()<Ev,h=n?c():l(),g=o(),_=Ko(i()),v=Math.floor(i()*1e3),y=Cf(e,v,u[t%u.length],s());p(e,r.color)&&y.style===r.style&&y.c1===r.c1&&(y=Cf(e,v+1,y.number,y.style)),m.push({color:e,body:h,pfd:g,skin:_,look:y,first:(n?d:f)()})}return m}var Mv=/^(eyes|eyebrows|booties|footstrap)$|^pfd_([2-9]|side|straps)$|^[a-z]+_[2-9]$/,Nv=new Set([`footplate`,`bungee`,`rudder`,`rudderhead`,`handle`]),Pv=new Set([`booties`,`footplate`,`footstrap`,`rudder`]);function Fv(e){let t=new Map(Object.entries(e.userData?.parts??{}).map(([e,t])=>[t,e]));e.updateMatrixWorld?.(!0);let n=e.matrixWorld?.getMaxScaleOnAxis?.()||1,r=[];return e.traverse(e=>{if(!e.isMesh||t.get(e)===`hull`)return;let i=t.get(e),a=i??e.name??``,o=Nv.has(i)||!i&&Mv.test(a);e.geometry.boundingSphere||e.geometry.computeBoundingSphere();let s=e.geometry.boundingSphere.radius*((e.matrixWorld?.getMaxScaleOnAxis?.()||1)/n);r.push({o:e,r:Pv.has(a)?s/2:s,px:o?5:2})}),r}function Iv(e,t,n,r=!0,i=5){return 2*e*n/Math.max(t,.001)>=i*(r?.9:1.1)}function Lv(e,t,n,r){let i=e.userData;(!i.detail||i.detailKey!==r)&&(i.detail=Fv(e),i.detailKey=r);let a=0;for(let e of i.detail){let r=e.o.layers.isEnabled(0),i=Iv(e.r,t,n,r,e.px);i!==r&&(i?e.o.layers.enable(0):e.o.layers.disable(0)),i&&a++}return a}var Rv=class{constructor(e,{float:t=!1}={}){this.renderer=e,this.rt=new Kn(256,256,{type:t?G:sn,format:i,minFilter:_t,magFilter:_t,depthBuffer:!1}),this.mat=new Ui({uniforms:{uLWp0:{value:new Er},uLWp1:{value:new Er(1,1,1,1)},uLWp2:{value:new Er},uLWSeed:{value:1},uOrigin:{value:new oi},uT:{value:0}},vertexShader:`void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`${Mm}\nuniform vec2 uOrigin; uniform float uT;\nvoid main() { vec2 en = uOrigin + (gl_FragCoord.xy) * ${20 .toFixed(1)}; gl_FragColor = vec4(lwSample(en, uT), 0.0, 0.0, 1.0); }`,depthTest:!1,depthWrite:!1}),this.scene=new Yn,this.cam=new ee(-1,1,1,-1,0,1);let n=new En(new Nr(2,2),this.mat);n.frustumCulled=!1,this.scene.add(n),this.rect=new Er(0,0,5120,5120),this.wind=null}get texture(){return this.rt.texture}readAll(){let e=new Float32Array(262144);this.renderer.readRenderTargetPixels(this.rt,0,0,256,256,e);let t=new Float32Array(65536);for(let n=0;n<t.length;n++)t[n]=e[4*n];return t}setWind(e){if(this.wind=e?.gusty?e:null,!this.wind)return;let t=Nm(e),n=this.mat.uniforms;n.uLWp0.value.fromArray(t.p0),n.uLWp1.value.fromArray(t.p1),n.uLWp2.value.fromArray(t.p2),n.uLWSeed.value=t.seed}update(e,t,n){if(!this.wind)return!1;let r=2560,i=Math.floor((e-r)/20)*20,a=Math.floor((t-r)/20)*20;this.mat.uniforms.uOrigin.value.set(i,a),this.mat.uniforms.uT.value=n,this.rect.set(i,a,5120,5120);let o=this.renderer,s=o.getRenderTarget();return o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.setRenderTarget(s),!0}},zv=[[`Cruise`,`easy`],[`Sporty`,`balanced`],[`Race`,`fast`]],Bv=()=>typeof performance<`u`?performance.now():Date.now(),Vv=class{constructor({makeGhost:e,windowS:t=60,_0x042d53:n=3,pilotOpts:r={}}){this.makeGhost=e,this.windowS=t,this._0x042d53=n,this.pilotOpts=r,this.job=null,this.latest=null,this.history=[],this.progress=0,this.deadline=0}reset(){this.job=null,this.latest=null,this.history=[],this.progress=0}tick(e,t,n=null,r=this._0x042d53){let i=e.states.length;if(this.job&&(i<this.job.nAtStart||e.paddlerName!==this.job.paddler)&&(this.job=null),!this.job){let r=Math.round(this.windowS/e.dt);if(i-1<r||!t)return;this.job={gen:this.round(e,t,n,r),nAtStart:i,paddler:e.paddlerName}}let a=Bv();this.deadline=a+r;do if(this.job.gen.next().done){this.job=null;break}while(Bv()<this.deadline-.3)}*round(e,t,n,r){let i=e.states.length-1,a=i-r,o=e.states[a],s=e.states[i],c={endT:i*e.dt,startT:a*e.dt,user:(s.distance-o.distance)/(r*e.dt),modes:{}},l=0;for(let[i,a]of zv){let s=this.makeGhost();s.setState(o),s.tune={...e.tune};let u=new J_(s,{goal:t,effort:a,drive:!0,_0x0c1f10:!0,...this.pilotOpts});n&&(u.table=n);let d=o.i*s.h+r*e.dt,f=0;for(s.i*s.h;s.i*s.h<d&&!u.arrived;)if(u.update(Math.max(.3,this.deadline-Bv())),u.job||!u.table)yield;else{for(let e=0;e<6&&s.i*s.h<d;e++)s.advance(s.h),f+=s.power*s.h;yield}let p=s.i*s.h-o.i*s.h;c.modes[i]={speed:p>0?(s.ski.distance-o.distance)/p:0,meanW:p>0?f/p:0,wPrimeLeft:s.ski.wPrime,arrived:u.arrived},this.progress=++l/zv.length}this.latest=c,this.history.push(c),this.progress=0}};function Hv({fp:e,rows:t=[]}){let n=e.i*e.h,r=e.ski.distance,i=n>0?r/n:0,a=[3,4,5].map(e=>t.find(t=>t.level===e)).filter(Boolean),o=a.length?0:null;for(let e of a)if(e.aheadM>0)o++;else break;return{timeS:n,distM:r,avgMs:i,surfShare:e.surfShare(),reservePct:Math.round(100*e.ski.wPrime/Math.max(1,e.prof.wPrime)),paceRows:t,stars:o}}var Uv=e=>`surfski.best.${e}`;function Wv(e,t=globalThis.localStorage){try{return JSON.parse(t.getItem(Uv(e))??`null`)}catch{return null}}function Gv(e,t,n=globalThis.localStorage){let r=Wv(e,n),i=!r||t.timeS<r.timeS;if(i)try{n.setItem(Uv(e),JSON.stringify({timeS:t.timeS,avgMs:t.avgMs,stars:t.stars,at:new Date().toISOString()}))}catch{}return{best:i?t:r,improved:i,deltaS:r?t.timeS-r.timeS:null,first:!r}}var Kv={goal:{file:`buoy-flag`,tint:3530858,opacity:1},wp:{file:`buoy`,tint:16765498,opacity:.75},route:{file:`buoy`,tint:5625599,opacity:.45}},qv=1.85,Jv=6,Yv=e=>Math.min(40,Math.max(1.4,1.4+e*.017));function Xv(){let e=new Oi,t=new En(new cn(.45,1.8,12),new ei({color:14496563}));return t.position.y=.6,e.add(t),e}var Zv=class{constructor(e,t=`/`){this.scene=e,this.src={},this.pool=[],this.group=new Oi,this.group.visible=!1,e.add(this.group);let n=new Rs;for(let e of new Set(Object.values(Kv).map(e=>e.file)))n.loadAsync(`${t}models/${e}.glb`).then(t=>{this.src[e]=t.scene}).catch(()=>{this.src[e]=Xv()})}make(e){let t=Kv[e],n=this.src[t.file];if(!n)return null;let r=n.clone(!0);r.traverse(e=>{e.isMesh&&(e.material=e.material.clone(),e.material.emissive=new jt(t.tint),e.material.emissiveIntensity=.55,t.opacity<1&&(e.material.transparent=!0,e.material.opacity=t.opacity,e.material.depthWrite=!1),e.renderOrder=4,e.frustumCulled=!1,Object.assign(e.material,{stencilWrite:!0,stencilRef:0,stencilFunc:519,stencilZPass:ue}))});let i=new Oi;return i.add(r),i.userData.kind=e,this.group.add(i),i}hide(){this.group.visible=!1}update(e,t,n,r){let i=e.slice(0,Jv);for(;this.pool.length<i.length;)this.pool.push(null);let a=!1;i.forEach((e,i)=>{this.pool[i]?.userData.kind!==e.kind&&(this.pool[i]&&this.group.remove(this.pool[i]),this.pool[i]=this.make(e.kind));let o=this.pool[i];if(!o)return;let s=t.sample(e.e,e.n,n,{}).h,c=Yv(Math.hypot(e.e-r.x,-e.n-r.z,s-r.y))/qv;o.position.set(e.e,s,-e.n),o.scale.setScalar(c),o.visible=!0,a=!0});for(let e=i.length;e<this.pool.length;e++)this.pool[e]&&(this.pool[e].visible=!1);this.group.visible=a}},Qv=`modulepreload`,$v=function(e,t){return new URL(e,t).href},ey={},ty=function(e){return e.pathname.endsWith(`.css`)},ny=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},ry=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=$v(t,n);let r=s(t),i=ty(r);return ny(ey,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Qv,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},iy=new Set([`gorge`,`gorgeeast`,`gorgewest`,`rufus`]),ay=9.81,oy=2*Math.PI,sy=300,cy=7e5;function ly(e,t){let n=[];e.start&&n.push([e.start.e,e.start.n]);for(let r of e.marks??[])r.latLon&&t&&n.push(t(r.latLon[0],r.latLon[1]));if(e.goal)n.push([e.goal.e,e.goal.n]);else if(e.start){let t=(e.headingDeg??0)*Math.PI/180;n.push([e.start.e+2e3*Math.sin(t),e.start.n+2e3*Math.cos(t)])}return n}function uy(e,t,n){if(e.length===1)return Math.hypot(t-e[0][0],n-e[0][1]);let r=1/0;for(let i=1;i<e.length;i++){let[a,o]=e[i-1],[s,c]=e[i],l=s-a,u=c-o,d=l*l+u*u,f=d>0?Math.min(1,Math.max(0,((t-a)*l+(n-o)*u)/d)):0;r=Math.min(r,Math.hypot(t-a-f*l,n-o-f*u))}return r}function dy(e,t,n,{toEnu:r=null,margin:i=800,upwind:a=1e3}={}){if(!t||!n||!(n.Tp>0)||iy.has(e.site))return null;let o=ly(e,r);if(!o.length)return null;let s=(n.toDeg%360+360)%360,c=Math.sin(s*Math.PI/180),l=Math.cos(s*Math.PI/180),u=1/0,d=-1/0,f=1/0,p=-1/0;for(let[e,t]of o)u=Math.min(u,e-i),d=Math.max(d,e+i),f=Math.min(f,t-i),p=Math.max(p,t+i);if(c>.3?u-=a*c:c<-.3&&(d-=a*c),l>.3?f-=a*l:l<-.3&&(p-=a*l),u=Math.max(u,t.minE),d=Math.min(d,t.maxE),f=Math.max(f,t.minN),p=Math.min(p,t.maxN),!(d-u>200&&p-f>200))return null;let m=ay*n.Tp**2/oy,h=Math.round(Math.max(4,m/3)*2)/2;for(;fy(d-u,p-f,h,m)>cy&&h<m/2.4;)h+=.5;if(fy(d-u,p-f,h,m)>cy)return null;let g=0,_=0,v=0;for(let e=f+25;e<p;e+=50)for(let n=u+25;n<d;n+=50){let r=t.depthAt(n,e);v++,r<=0?_++:r<m/2&&g++}if(!_&&g<.01*v)return null;let y=e=>Math.round(e/10)*10,b={e0:y(u),e1:y(d),n0:y(f),n1:y(p)},x=Math.round(n.Tp*10)/10,S=Math.round(n.spreadDeg??20),C=Math.round(s);return{key:`${e.site}|${b.e0},${b.e1},${b.n0},${b.n1}|${C}|${x}|${S}|${h}`,site:e.site,win:b,cell:h,to:C,period:x,spread:S,path:o}}function fy(e,t,n,r){let i=(e,t)=>{let i=(Math.max(200,.6*Math.sqrt(1.56*r*e*n))+1.5*Math.sqrt(1.56*r*e*n))/n;return e*2**Math.ceil(Math.log2(t+e+2*i))},a=e/n,o=t/n;return Math.max(i(o,a),i(a,o))}function py(e,t){let{win:n,cell:r}=t,i=Math.max(2,Math.round((n.e1-n.e0)/r)),a=Math.max(2,Math.round((n.n1-n.n0)/r)),o=new Float32Array(i*a);for(let t=0;t<a;t++)for(let a=0;a<i;a++)o[t*i+a]=e.depthAt(n.e0+(a+.5)*r,n.n0+(t+.5)*r);return{W:i,H:a,depth:o}}var my=class{constructor({worker:e=null}={}){this.worker=e,this.cache=new Map,this.busy=null,this.next=null,this.onProgress=null}cached(e){return e?this.cache.get(e.key)??null:null}request(e,t){let n=this.cache.get(e.key);return n?Promise.resolve(n):new Promise(n=>{this.next&&this.next.resolve(null),this.next={plan:e,grid:py(t,e),resolve:n},this.pump()})}pump(){if(this.busy||!this.next)return;let e=this.busy=this.next;this.next=null;let t=t=>{this.busy=null,t&&this.cache.set(e.plan.key,t),e.resolve(t),this.pump()};this.worker?(this.worker.onmessage=n=>{let r=n.data;r?.key===e.plan.key&&(r.kind===`progress`?this.onProgress?.(r.done,r.of):t(r.kind===`solve`?r.S:null))},this.worker.onerror=e=>{console.warn(`shore solve worker failed`,e),t(null)},this.worker.postMessage({kind:`solve`,key:e.plan.key,plan:e.plan,grid:e.grid})):setTimeout(()=>{let n=null;try{n=Vs(e.plan,e.grid)}catch(e){console.warn(`shore solve failed`,e)}t(n)},0)}tiles(e,t){this.tileKey=e.key;let n=e=>{e?.key===this.tileKey&&(e.kind===`error`?console.warn(`whole-map shore solve failed`,e.message):(e.kind===`blocks`||e.kind===`tilesDone`)&&t(e))};this.worker?(this.worker.onmessage=e=>n(e.data),this.worker.onerror=e=>console.warn(`shore solve worker failed`,e),this.worker.postMessage(e,[e.pack.data.buffer,...e.fetch?[e.fetch.data.buffer]:[]])):ry(()=>import(`./wave-solve-worker-BgfKx1ci.js`).then(t=>{this.local=t,t.handle(e,n)}),__vite__mapDeps([0,1,2,3]),import.meta.url)}focus(e){let t={kind:`focus`,key:this.tileKey,focus:e};this.worker?this.worker.postMessage(t):this.local?.handle(t,()=>{})}cancel(){let e={kind:`cancel`,key:this.tileKey};this.worker?this.worker.postMessage(e):this.local?.handle(e,()=>{}),this.tileKey=null}},hy=e=>(t,n)=>{let r=uy(e,t,n);return r<400?1:r<800?(800-r)/400:0};function gy(e,t,{spread:n=null,pack:r=null,fromDeg:a=null,maxFetchM:o=3e4}={}){let s=zs(e,t?.left??0,t?.right??0),c=e.W,l=e.H,u=e.cell,d=c*l,f=e.e0+c*u,p=e.n0+l*u,m=(t,n)=>{let r=Math.min(t-e.e0,f-t,n-e.n0,p-n);return Math.min(1,Math.max(0,r/sy))},h=a==null?0:Math.sin(a*Math.PI/180),g=a==null?0:Math.cos(a*Math.PI/180),_=r&&a!=null?qs({minE:e.e0,minN:e.n0,maxE:f,maxN:p,elevationAt:(e,t)=>r.elevationAt(e,t)},a,o,{cell:u,step:u,minFactor:0}):null,v=(t,n)=>Math.min(h>1e-6?(f-t)/h:h<-1e-6?(e.e0-t)/h:1/0,g>1e-6?(p-n)/g:g<-1e-6?(e.n0-n)/g:1/0),y=new Float32Array(d),b=new Float32Array(d),x=new Float32Array(d),S=new Float32Array(d);for(let t=0;t<l;t++)for(let r=0;r<c;r++){let i=t*c+r,a=e.e0+(r+.5)*u,l=e.n0+(t+.5)*u,d=e.ratio[i];if(S[i]=m(a,l),!Number.isFinite(d))continue;let f=1,p=0;if(_){let e=v(a,l),t=_.factor(a,l)**2*o;t<o-u&&t<e-u&&(p=Math.sqrt(t/o)),n&&Number.isFinite(e)&&(f=n.factor(a+h*(e+60),l+g*(e+60))||1)}let C=f*(s.left[i]||0),w=f*(s.right[i]||0),T=Math.hypot(f*d,p);y[i]=Math.sqrt(Math.max(0,T*T-C*C-w*w)),b[i]=C,x[i]=w}let C=(t,n,r)=>{let i=Math.min(Math.max((n-e.e0)/u-.5,0),c-1.001),a=Math.min(Math.max((r-e.n0)/u-.5,0),l-1.001),o=Math.floor(i),s=Math.floor(a),d=i-o,f=a-s,p=t[s*c+o],m=t[s*c+o+1],h=t[(s+1)*c+o],g=t[(s+1)*c+o+1];return p+(m-p)*d+(h-p)*f+(p-m-h+g)*d*f},w=(t,n)=>t>=e.e0&&n>=e.n0&&t<=f&&n<=p,T=[0,0,0],E=[0,0],D=(e,t)=>{let r=n?n.factor(e,t):1;if(r===0||!w(e,t))return T[0]=r,T[1]=0,T[2]=0,T;let i=C(S,e,t);return T[0]=r+(C(y,e,t)-r)*i,T[1]=i*C(b,e,t),T[2]=i*C(x,e,t),T};return{solveRect:{minE:e.e0,minN:e.n0,sizeE:c*u,sizeN:l*u},turns:t??null,factor(e,t){return D(e,t)[0]},turned(e,t){return D(e,t),E[0]=T[1],E[1]=T[2],E},texture(){let e=new Uint16Array(d*4),t=ti.toHalfFloat;for(let n=0;n<d;n++)e[4*n]=t(y[n]),e[4*n+1]=t(b[n]),e[4*n+2]=t(x[n]),e[4*n+3]=t(S[n]);let n=new sr(e,c,l,i,sn);return n.minFilter=n.magFilter=_t,n.wrapS=n.wrapT=Lt,n.needsUpdate=!0,n}}}var _y=(e,t)=>Us(e,{weight:hy(t)}),vy=2048;function yy(e,t,n,{toEnu:r=null}={}){if(!t||!n||!(n.Tp>0)||iy.has(e.site))return null;let i=(Math.round(n.toDeg)%360+360)%360,a=Math.round(n.Tp*10)/10,o=Math.round(n.spreadDeg??20),s=ay*a**2/oy,c=Math.round(Math.max(4,s/3)*2)/2,l={e0:t.minE,e1:t.maxE,n0:t.minN,n1:t.maxN};return{key:`${e.site}|tiles|${i}|${a}|${o}|${c}`,site:e.site,region:l,sea:{to:i,period:a,spread:o,fromDeg:(i+180)%360},cell:c,path:ly(e,r)}}function by(e,t,n,r,i,{nearM:a=1500,nearUpM:o=1500}={}){return{kind:`tiles`,key:e.key,region:e.region,sea:e.sea,cell:e.cell,focus:r,maxFetchM:i,nearM:a,nearUpM:o,pack:{minE:t.minE,minN:t.minN,cell:t.cell,W:t.W,H:t.H,data:Float32Array.from(t.data),segs:t.structures?.segs??null},fetch:n?{W:n.W,H:n.H,data:Float32Array.from(n.data),rect:n.rect}:null}}var xy=class{constructor(e,{spread:t=null,turns:n=null}={}){this.out=e,this.spread=t,this.turns=n,this.raw=new Map,this.K=new Map,this.L=new Map,this.R=new Map,this.done=!1,this.solveRect={minE:e.e0,minN:e.n0,sizeE:e.OW*e.co,sizeN:e.OH*e.co},this.ts=Math.max(1,Math.ceil(Math.max(e.OW,e.OH)/vy)),this.TW=Math.ceil(e.OW/this.ts),this.TH=Math.ceil(e.OH/this.ts),this.tex=null,this.fresh=new Set,this.empty=new Set,this.tmp=[0,0,0],this.pair=[0,0]}add(e){for(let t of e){let e=t.by*this.out.BW+t.bx;t.empty?(this.empty.add(e),this.raw.delete(e)&&(this.K.delete(e),this.L.delete(e),this.R.delete(e),this.fresh.add(e))):(this.empty.delete(e),this.raw.set(e,t),this.split(e,t),this.fresh.add(e))}}split(e,t){let n=zs({W:t.w,H:t.h,ratio:t.ratio,mean:t.mean},this.turns?.left??0,this.turns?.right??0);for(let e of[n.kept,n.left,n.right])for(let t=0;t<e.length;t++)Number.isFinite(e[t])||(e[t]=0);this.K.set(e,n.kept),this.L.set(e,n.left),this.R.set(e,n.right)}setTurns(e){this.turns=e;for(let[e,t]of this.raw)this.split(e,t),this.fresh.add(e)}cellAt(e,t,n,r){let{BW:i,OW:a,OH:o,B:s}=this.out;if(t<0||n<0||t>=a||n>=o)return r[0]=0,r[1]=0,r;let c=Math.floor(n/s)*i+Math.floor(t/s),l=e.get(c);if(!l)return r[0]=0,r[1]=0,r;let u=this.raw.get(c);return r[0]=l[(n-u.oy)*u.w+(t-u.ox)],r[1]=1,r}at(e,t){let n=this.spread?this.spread.factor(e,t):1,{e0:r,n0:i,co:a}=this.out,o=(e-r)/a-.5,s=(t-i)/a-.5,c=Math.floor(o),l=Math.floor(s),u=o-c,d=s-l,f=this.tmp,p=this.pair,m=0,h=0,g=0,_=0;for(let[e,t,r]of[[0,0,(1-u)*(1-d)],[1,0,u*(1-d)],[0,1,(1-u)*d],[1,1,u*d]])this.cellAt(this.K,c+e,l+t,p),p[1]?(m+=r*p[0],_+=r,h+=r*this.cellAt(this.L,c+e,l+t,p)[0],g+=r*this.cellAt(this.R,c+e,l+t,p)[0]):m+=r*n;return n===0?(f[0]=0,f[1]=0,f[2]=0,f):(f[0]=m,f[1]=h,f[2]=g,f)}factor(e,t){return this.at(e,t)[0]}turned(e,t){let n=this.at(e,t);return this.pair2??=[0,0],this.pair2[0]=n[1],this.pair2[1]=n[2],this.pair2}covered(e,t,n){if(this.done)return!0;let{e0:r,n0:i,co:a,BW:o,BH:s}=this.out,c=this.out.B*a;for(let a=Math.max(0,Math.floor((t-n-i)/c));a<=Math.min(s-1,Math.floor((t+n-i)/c));a++)for(let t=Math.max(0,Math.floor((e-n-r)/c));t<=Math.min(o-1,Math.floor((e+n-r)/c));t++){let e=a*o+t;if(!this.raw.has(e)&&!this.empty.has(e))return!1}return!0}window({e0:e,e1:t,n0:n,n1:r}){let{co:i}=this.out,a=Math.max(0,Math.floor((e-this.out.e0)/i)),o=Math.max(0,Math.floor((n-this.out.n0)/i)),s=Math.max(1,Math.min(this.out.OW-a,Math.ceil((t-e)/i))),c=Math.max(1,Math.min(this.out.OH-o,Math.ceil((r-n)/i))),l=new Float32Array(s*c).fill(NaN),u=new Float32Array(s*c).fill(NaN),d=this.out.B;for(let e=0;e<c;e++)for(let t=0;t<s;t++){let n=a+t,r=o+e,i=Math.floor(r/d)*this.out.BW+Math.floor(n/d),c=this.raw.get(i);if(!c)continue;let f=(r-c.oy)*c.w+(n-c.ox);l[e*s+t]=c.ratio[f],u[e*s+t]=c.mean[f]}return{W:s,H:c,cell:i,e0:this.out.e0+a*i,n0:this.out.n0+o*i,ratio:l,mean:u}}texture(){let{TW:e,TH:t,ts:n}=this,r=ti.toHalfFloat;if(!this.tex){this.arr=new Uint16Array(e*t*4);let n=new sr(this.arr,e,t,i,sn);n.minFilter=n.magFilter=_t,n.wrapS=n.wrapT=Lt,this.tex=n,this.fresh.size||(n.addUpdateRange(0,4),n.needsUpdate=!0)}if(this.fresh.size){let i=[0,0],a=this.arr,o=this.out.B;for(let s of this.fresh){let c=this.raw.get(s)??{bx:s%this.out.BW,by:Math.floor(s/this.out.BW),ox:s%this.out.BW*o,oy:Math.floor(s/this.out.BW)*o,w:o,h:o},l=Math.floor(c.ox/n),u=Math.min(e-1,Math.floor((c.ox+c.w-1)/n)),d=Math.floor(c.oy/n),f=Math.min(t-1,Math.floor((c.oy+c.h-1)/n));for(let t=d;t<=f;t++)for(let s=l;s<=u;s++){let l=Math.min(this.out.OW-1,s*n+(n>>1)),u=Math.min(this.out.OH-1,t*n+(n>>1)),d=4*(t*e+s);Math.floor(l/o)===c.bx&&Math.floor(u/o)===c.by&&(this.cellAt(this.K,l,u,i),i[1]?(a[d]=r(i[0]),a[d+1]=r(this.cellAt(this.L,l,u,i)[0]),a[d+2]=r(this.cellAt(this.R,l,u,i)[0]),a[d+3]=r(1)):a[d]=a[d+1]=a[d+2]=a[d+3]=0)}for(let t=d;t<=f;t++)this.tex.addUpdateRange(4*(t*e+l),4*(u-l+1))}this.fresh.clear(),this.tex.needsUpdate=!0}return this.tex}},Sy=`surfski-solves`,Cy=`solves`,wy=`when`;function Ty(){return typeof indexedDB>`u`?Promise.resolve(null):new Promise(e=>{try{let t=indexedDB.open(Sy,1);t.onupgradeneeded=()=>{t.result.createObjectStore(Cy),t.result.createObjectStore(wy)},t.onsuccess=()=>e(t.result),t.onerror=()=>e(null),t.onblocked=()=>e(null)}catch{e(null)}})}var Ey=e=>new Promise(t=>{e.onsuccess=()=>t(e.result),e.onerror=()=>t(null)});function Dy(e){let t=e?.data;if(!t?.length)return`none`;let n=0;for(let e=0;e<64;e++)n+=t[Math.floor((e+.5)*t.length/64)];return`${e.W}x${e.H}@${e.cell}:${Math.round(n*100)}`}var Oy=(e,t)=>`${e}|v2|${Dy(t)}`;async function ky(e){let t=await Ty();if(!t)return null;try{let n=await Ey(t.transaction(Cy).objectStore(Cy).get(e));return n&&await Ey(t.transaction(wy,`readwrite`).objectStore(wy).put(Date.now(),e)),n??null}catch{return null}finally{t.close?.()}}async function Ay(e,t){let n=await Ty();if(!n)return!1;try{let r={out:t.out,blocks:t.blocks.map(e=>({bx:e.bx,by:e.by,ox:e.ox,oy:e.oy,w:e.w,h:e.h,ratio:e.ratio,mean:e.mean}))};await Ey(n.transaction(Cy,`readwrite`).objectStore(Cy).put(r,e));let i=n.transaction(wy,`readwrite`).objectStore(wy);await Ey(i.put(Date.now(),e));let a=await Ey(i.getAllKeys())??[],o=await Ey(n.transaction(wy).objectStore(wy).getAll())??[];if(a.length>8){let e=a.map((e,t)=>[e,o[t]??0]).sort((e,t)=>e[1]-t[1]).slice(0,a.length-8).map(e=>e[0]),t=n.transaction([Cy,wy],`readwrite`);for(let n of e)t.objectStore(Cy).delete(n),t.objectStore(wy).delete(n)}return!0}catch{return!1}finally{n.close?.()}}var jy={tipM:6,frac:.09,nextFrac:.055,nextAlpha:.45};function My(e){let t=document.createElement(`canvas`);t.width=128,t.height=256;let n=t.getContext(`2d`),r=e===`finish`?[255,255,255]:[255,210,58];n.lineJoin=`miter`;for(let[e,t,i,a,o]of[[30,30,12,.35,120],[40,38,16,.65,178],[52,48,22,1,248]]){let s=o-t,c=()=>{n.beginPath(),n.moveTo(64-e,s),n.lineTo(64-e+i,s),n.lineTo(64,o-i*1.3),n.lineTo(64+e-i,s),n.lineTo(64+e,s),n.lineTo(64,o),n.closePath()};c(),n.lineWidth=5,n.strokeStyle=`rgba(10,20,30,${.8*a})`,n.stroke(),c(),n.fillStyle=`rgba(${r[0]},${r[1]},${r[2]},${a})`,n.fill()}if(e===`port`||e===`starboard`){let t=e===`port`?1:-1,r=()=>{n.beginPath(),n.moveTo(64-30*t,40),n.lineTo(64+26*t,40),n.moveTo(64+26*t,40),n.lineTo(64+10*t,24),n.moveTo(64+26*t,40),n.lineTo(64+10*t,56)};n.lineCap=`round`,n.lineJoin=`round`,r(),n.strokeStyle=`rgba(10,20,30,0.9)`,n.lineWidth=22,n.stroke(),r(),n.strokeStyle=`#ffffff`,n.lineWidth=12,n.stroke()}else if(e===`finish`)for(let e=0;e<4;e++)for(let t=0;t<2;t++)n.fillStyle=(e+t)%2?`#111`:`#fff`,n.fillRect(32+e*16,22+t*16,16,16);let i=new Fe(t);return i.colorSpace=pt,i.anisotropy=4,i}var Ny=class{constructor(e){this.tex={},this.sprites=[0,1].map(()=>{let t=new kn({transparent:!0,depthTest:!1,depthWrite:!1,sizeAttenuation:!1,fog:!1,toneMapped:!1}),n=new wa(t);return n.center.set(.5,0),n.renderOrder=1e3,n.visible=!1,n.frustumCulled=!1,e.add(n),n})}texOf(e){return this.tex[e]??=My(e)}update(e,t,n){let r=e&&t?e.seq.slice(t.i,t.i+2):[],i=2*Math.tan((n?.fov??60)*Math.PI/360);this.sprites.forEach((e,t)=>{let n=r[t];if(e.visible=!!n,!n)return;let a=n.mark,o=a.finish?`finish`:n.buoys||!a.round?`gate`:a.round===`port`?`port`:`starboard`;e.material.map!==this.texOf(o)&&(e.material.map=this.texOf(o),e.material.needsUpdate=!0);let s=(t===0?jy.frac:jy.nextFrac)*i;e.scale.set(s*.5,s,1),e.material.opacity=t===0?1:jy.nextAlpha,e.position.set(a.e,jy.tipM,-a.n)})}hide(){for(let e of this.sprites)e.visible=!1}},Py=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Fy=`
uniform highp sampler2D uPuffTex, uPuffCells;
uniform vec2 uRollO;
uniform float uRollE, uRollCell;
vec4 puffTexel(int i, int k) { return texelFetch(uPuffTex, ivec2((i % 32) * 5 + k, i / 32), 0); }
vec4 cellTexel(ivec2 c, int k) { return texelFetch(uPuffCells, ivec2(c.x * 5 + k, c.y), 0); }
float cellId(ivec2 c, int k) { return cellTexel(c, k / 4)[k % 4]; }
vec3 puffQ(vec3 X, vec3 R, vec3 S) {
float qz = X.z / R.z, y = X.y - S.z * R.y * qz;
return vec3(X.x / (R.x * (1.0 + 0.5 * S.x * sign(X.x))), y / (R.y * (1.0 + 0.5 * S.y * sign(y))), qz);
}
float puffKernel(vec3 q, float waist) { float r2 = dot(q, q); return r2 >= 1.0 ? 0.0 : (1.0 - r2) * (1.0 - r2) * (1.0 - waist * exp(-q.x * q.x / 0.1225)); }
float puffDeposit(vec2 p) {
vec2 r = p - uRollO;
if (r.x < 0.0 || r.y < 0.0 || r.x >= uRollE || r.y >= uRollE) return -1.0;
ivec2 c = ivec2(floor(r / uRollCell));
float dep = 0.0;
for (int k = 0; k < 12; k++) {
float id = cellId(c, k); if (id < -0.5) continue;
int i = int(id + 0.5); vec4 A = puffTexel(i, 0), B = puffTexel(i, 1), D = puffTexel(i, 3);
vec2 dl = r - A.xy;
float w = puffKernel(puffQ(vec3(dot(dl, vec2(-B.y, B.x)), dot(dl, B.xy), 0.0), vec3(B.zw, 1.0), vec3(D.yz, 0.0)), puffTexel(i, 4).x);
dep += D.x * w;
}
return dep;
}`;function Iy(e,t,n,r){let i=Math.imul(e|0,668265261)^Math.imul(t|0,374761393)^Math.imul(n|0,2654435761)^Math.imul(r|0,2246822519);return i^=i>>>15,i=Math.imul(i,739982445),i^=i>>>12,i=Math.imul(i,695872825),i^=i>>>15,(i>>>0)/4294967296}var Ly=class{constructor(e,t,n,r,i,a,o,s=null,c=null,l=null){this.memo=l,this.m=e,this.cx=n,this.cy=r,this.P=a,this.R=i,this.out=[],this.bursts=[],this.sites=0,this.done=!1,this.G=[],this.hostOf=s,this.bySite=s?new Map:null,this.E=c,this.wind=o??{toE:0,toN:1,ms:0},this.groups=(t.fft?.peakGroups?.()??[]).map((t,o)=>{let s=t.k,c=t.omega/s,l=2*Math.PI/s,u=t.dx*r-t.dy*n,d=t.dx*n+t.dy*r-c*e*a.slot;return{gi:o,name:t.name,k:s,c,lam:l,dx:t.dx,dy:t.dy,ac:u,ad:d,j0:Math.floor((u-i)/a.stretch),j1:Math.ceil((u+i)/a.stretch),i0:Math.floor((d-i)/l),i1:Math.ceil((d+i)/l)}}),this.g=0,this.i=this.groups[0]?.i0??0,this.j=this.groups[0]?.j0??0,this.groups.length||(this.done=!0)}step(e,t=1/0){let n=this.P,r=this.m,i=this.R*this.R;for(this.G;!this.done&&t>0;){let a=this.groups[this.g],{gi:o,k:s,c,lam:l,dx:u,dy:d}=a,f=this.i,p=this.j;++this.j>a.j1&&(this.j=a.j0,++this.i>a.i1&&(++this.g>=this.groups.length?this.done=!0:(this.i=this.groups[this.g].i0,this.j=this.groups[this.g].j0)));let m=(p+.5+.6*(Iy(o,f,p,r*7+1)-.5))*n.stretch,h=(f+Iy(o,f,p,r*7+2))*l;if((m-a.ac)**2+(h-a.ad)**2>i||(t--,this.sites++,n.groupsOff?.[a.name]))continue;let g=this._wave(a,f,p,r,m,h,e);if(!g)continue;let{tb:_,be:v,bn:y,steep:b,chance:x,face:S}=g,C={a:g.wa},w=(o*1024+(f&1023))*1024+(p&1023);if(this.hostOf&&x>0){let e=this.E.restartSlots,t=r-((r+Math.floor(e*Iy(o+40,f,p,0)))%e+e)%e,i=this.hostOf(w,r,t),a=i?(v-i.e)*i.dx+(y-i.n)*i.dy:0;if(i&&i.E<i.cap&&Math.abs(a-i.c*(_-i.tb))<.25*l){i.abs.push({a:_-i.tb,q:x,m:r,x0:a}),i.E+=x,i.EJ+=qa(x,C.a*s,c,n),Iy(o+8,f,p,r*5+3)<x*Math.min(1,(i.v?.spray??1)*Ga(2*C.a,b,co))&&this._burst(o,f,p,_,v,y,u,d,c,2*C.a,b);continue}}if(Iy(o,f,p,r*7+4)>=x)continue;let T=2*C.a,E=Iy(o,f,p,r*7+5),D=Ba(e=>Iy(o+32+e,f,p,r*7)),O=this._local(a,v,y,_,g.theta,e),k={id:(Math.imul(r,4)+o)*1048576+(f&1023)*1024+(p&1023),g:o,tb:_,e:v,n:y,dx:O.dx,dy:O.dy,c:O.c,T:2*Math.PI/(O.c*O.k),Hb:T,p:b,rnd:E,v:D,seedA:Iy(o,f,p,r*7+6),seedB:Iy(o,f,p,r*7+7),face:S,back:Py(n.faceBack-.05,n.faceBack+.05,S)*S*(1-(n.faceBackTo??.5))/O.k};if(this.bySite){let e=this.E;Object.assign(k,{m:r,abs:[],E:1,EJ:qa(1,C.a*s,c,n),cap:e.cap[0]+(e.cap[1]-e.cap[0])*Iy(o+41,f,p,r)}),this.bySite.set(w,k)}if(n.aheadSlots>0&&(v-this.cx)**2+(y-this.cy)**2<(n.aheadR??1e9)**2){let t=this._nextBirth(a,f,p,r,k,e);k.ride=Number.isFinite(t)?Math.max(n.ride,t-_+n.rideLap):n.ride}this.out.push(k),this._sprays(e,o,f,p,_,v,y,O.dx,O.dy,O.c,O.k,T,b,E,D)}return this.done}_wave(e,t,n,r,i,a,o){let s=this.memo?`${e.gi},${t},${n},${r}`:null;if(s&&this.memo.has(s)){let e=this.memo.get(s).r;return this.memo.delete(s),e}return this._wave1(e,t,n,r,i,a,o)}_waveAhead(e,t,n,r,i,a,o){let s=this.memo?`${e.gi},${t},${n},${r}`:null;if(s&&this.memo.has(s))return this.memo.get(s).r;let c=this._wave1(e,t,n,r,i,a,o);return s&&this.memo.set(s,{m:r,r:c}),c}_wave1(e,t,n,r,i,a,o){let s=this.P,c=this.G,{gi:l,k:u,c:d,dx:f,dy:p}=e,m=s.faceTheta+(s.faceSpread??0)*((Iy(l+50,t,n,r)+Iy(l+51,t,n,r)+Iy(l+52,t,n,r))*(2/3)-1),h=(r+.999*Iy(l,t,n,r*7+3))*s.slot,g=a+d*h,_=-p*i+f*g,v=f*i+p*g;o.spillGroupsAt(_,v,h,c,l);let y=c[l];if(!y||!(y.a>0)||La(y.a*u).steep<.002)return null;let b=e=>Math.atan2(Math.sin(e),Math.cos(e)),x=_,S=v,C=y.theta;for(let e=0;e<6;e++){let t=b(m-C);if(Math.abs(t)<.02)break;let n=f,r=p,i=u;if(e>=2){o.spillGroupsAt(x+.5,S,h,c,l);let e=c[l].theta;o.spillGroupsAt(x,S+.5,h,c,l);let t=c[l].theta,a=b(e-C)/.5,s=b(t-C)/.5,d=Math.hypot(a,s);d>.3*u&&d<3*u&&(n=a/d,r=s/d,i=d)}x+=n*t/i,S+=r*t/i,o.spillGroupsAt(x,S,h,c,l),y=c[l],C=y.theta}if(Math.abs(b(m-C))>.15)return null;let w=y.a,T=La(w*u).steep;if(T<.002)return null;if(s.gate!==!1&&this.groups.length>1){o.spillGroupsAt(x,S,h,c);let e=0,t=0,n=0;for(let r=0;r<c.n;r++)e+=c[r].h,t+=c[r].a*Math.sin(c[r].theta),n+=c[r].a;let r=Math.atan2(t,e);if(!(e>(s.gateH??.2)*n&&r>-(s.gateBack??.3)&&r<(s.gateFront??1.4)))return null}let E=x-f*d*h,D=S-p*d*h,O=xo(T*lo(-E*p+D*f,E*f+D*p)*ro(i,t,h),s);return{tb:h,be:x,bn:S,wa:w,steep:T,chance:O,face:m,theta:C}}_local(e,t,n,r,i,a){let o=this.G,s=.5,c=e=>Math.atan2(Math.sin(e),Math.cos(e)),l={dx:e.dx,dy:e.dy,k:e.k,c:e.c},u=this.P.localWay??2;if(!Number.isFinite(i)||u<1)return l;a.spillGroupsAt(t+s,n,r,o,e.gi);let d=o[e.gi].theta;a.spillGroupsAt(t,n+s,r,o,e.gi);let f=o[e.gi].theta,p=c(d-i)/s,m=c(f-i)/s,h=Math.hypot(p,m);if(!(h>.6*e.k&&h<1.6*e.k))return l;let g=p/h,_=m/h;if(g*e.dx+_*e.dy<.5)return l;if(u<2)return{dx:g,dy:_,k:e.k,c:e.c};let v=.02;a.spillGroupsAt(t,n,r+v,o,e.gi);let y=-c(o[e.gi].theta-i)/v/h;return{dx:g,dy:_,k:h,c:y>.7*e.c&&y<1.3*e.c?y:e.c}}_nextBirth(e,t,n,r,i,a){let o=this.P,s=this.E,{gi:c,c:l,lam:u}=e,d=i.E??1;for(let l=1;l<=o.aheadSlots;l++){let f=r+l,p=(n+.5+.6*(Iy(c,t,n,f*7+1)-.5))*o.stretch,m=(t+Iy(c,t,n,f*7+2))*u,h=this._waveAhead(e,t,n,f,p,m,a);if(h&&h.chance>0){if(s){let e=s.restartSlots,a=f-((f+Math.floor(e*Iy(c+40,t,n,0)))%e+e)%e,o=(h.be-i.e)*i.dx+(h.bn-i.n)*i.dy;if(l<=s.absorbSlots&&r>=a&&d<i.cap&&Math.abs(o-i.c*(h.tb-i.tb))<.25*u){d+=h.chance;continue}}if(Iy(c,t,n,f*7+4)<h.chance)return h.tb}}return 1/0}_burst(e,t,n,r,i,a,o,s,c,l,u){let d=co,f=this.wind,p=d.windK*f.ms,m=Math.min(1,Math.max(0,(l-d.hMin)/(d.hFull-d.hMin))),h=za(l,u);this.bursts.push({tb:r+.04,e:i,n:a,z:null,up:d.crown*h,dx:o,dy:s,base:d.base/this.P.speed*Ra(.04,c,this.P),jet:d.jet[0]+(d.jet[1]-d.jet[0])*m,el:d.el,wE:p*f.toE,wN:p*f.toN,seed:Iy(e+9,t,n,this.m),amount:.6+.4*Iy(e+10,t,n,this.m),size:1})}_sprays(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m){let h=co,g=this.P,_=this.wind,v=h.windK*_.ms,y=v*_.toE,b=v*_.toN,x=m?.spray??1;Math.min(1,Math.max(0,(d-h.hMin)/(h.hFull-h.hMin))),za(d,f),Iy(t+8,n,r,this.m)<Math.min(1,x*Ga(d,f,h))&&this._burst(t,n,r,i,a,o,s,c,l,d,f);let S=x*Ka(_.ms,h);if(S>0)for(let e=0;e<8;e++){let _=(e+Iy(t+11,n,r,this.m*8+e))/S;if(_>h.shedAge)break;let v=yo(_,d,f,p,2*Math.PI/(l*u),g,void 0,m);if(!v.alive)break;let x=Xa(_,l,0,g),C=a+s*x,w=o+c*x;this.bursts.push({tb:i+_,e:C,n:w,z:null,up:h.crown*(v.zc+v.Rz),dx:s,dy:c,base:h.base/g.speed*Ra(_,l,g),jet:h.shedJet,el:h.shedEl,wE:y,wN:b,seed:Iy(t+12,n,r,this.m*8+e),amount:.3+.3*Iy(t+13,n,r,this.m*8+e),size:.8})}}},Ry=class{constructor({reach:e=100,keep:t=480,aheadFrames:n=10,P:r=ao,events:i=!1}={}){this.reach=e,this.keepN=t,this.aheadFrames=n,this.P=r,this.events=i?i===!0?1:i:0,this.E=this.events?Y(this.events):null,this.hostOf=this.events?(e,t,n)=>{for(let r=1;r<=this.E.absorbSlots&&t-r>=n;r++){let n=this.slots.get(t-r)?.bySite?.get(e);if(n)return n}return null}:null,this.slots=new Map,this.memo=new Map,this.ahead=null,this.live=[],this.nLive=0,this.bursts=[],this.nBursts=0,this.wind={toE:0,toN:1,ms:0},this._G=[],this.stats={births:0,sites:0,ms:0,slotsMade:0,syncSlots:0}}clear(){this.slots.clear(),this.memo.clear(),this.ahead=null,this.nLive=0}_keep(e,t){this.slots.set(e,{cx:t.cx,cy:t.cy,births:t.out,bursts:t.bursts,bySite:t.bySite}),this.stats.sites+=t.sites,this.stats.births+=t.out.length,this.stats.slotsMade++}_remake(e){for(let t of[...this.slots.keys()])t>e&&this.slots.delete(t);this.ahead&&this.ahead.m>e&&(this.ahead=null),this._unabsorb(e)}_unabsorb(e){if(this.events)for(let t=e-this.E.absorbSlots;t<e;t++)for(let n of this.slots.get(t)?.births??[]){let t=n.abs.filter(t=>t.m<e);t.length!==n.abs.length&&(n.abs=t,n.E=1+t.reduce((e,t)=>e+t.q,0))}}update(e,t,n,r,i=[0,0],a=null){let o=this.P,s=performance.now();if(a&&(this.wind=a),!t?.spillGroupsAt)return this.nLive=0,this.live;let c=this.E??Y(0),l=this.events?(c.absorbSlots+1)*o.slot:0,u=Math.floor(e/o.slot),d=Math.floor((e-o.life-l)/o.slot),f=this.events?d-c.restartSlots-c.absorbSlots:d;for(let e=f;e<=u;e++){let i=this.slots.get(e),a=i&&(i.cx-n)**2+(i.cy-r)**2>1600&&e>=u-1;if(i&&!a)continue;if((a||this.events&&!i&&[...this.slots.keys()].some(t=>t>e))&&this._remake(e),this.ahead?.m===e&&!a){this.ahead.step(t),this._keep(e,this.ahead),this.ahead=null;continue}let s=new Ly(e,t,n,r,this.reach,o,this.wind,this.hostOf,this.E,this.memo);s.step(t),this._keep(e,s),this.stats.syncSlots++}let p=u+1;if(!this.slots.has(p)){(!this.ahead||this.ahead.m!==p)&&(this.ahead&&this._unabsorb(this.ahead.m),this.ahead=new Ly(p,t,n,r,this.reach,o,this.wind,this.hostOf,this.E,this.memo));let e=this.ahead.groups.reduce((e,t)=>e+(t.i1-t.i0+1)*(t.j1-t.j0+1),0);this.ahead.step(t,Math.ceil(.8*e/this.aheadFrames))&&(this._keep(p,this.ahead),this.ahead=null)}if(this.memo.size>4e3)for(let[e,t]of this.memo)t.m<=u&&this.memo.delete(e);for(;this.slots.size>this.keepN;){let e=1/0;for(let t of this.slots.keys())t<e&&(e=t);this.slots.delete(e)}let m=this.live,h=0;for(let t=d;t<=u;t++){let a=this.slots.get(t);if(a)for(let t of a.births){let a=e-t.tb;if(a<0||a>o.life+l)continue;let s=yo(a,t.Hb,t.p,t.rnd,t.T,o,void 0,t.v,t.abs,this.events===2?t:null);if(!s.alive)continue;let c=Xa(a,t.c,0,o,this.events===2?o.ride:Math.max(t.ride??o.ride,Ya(t.abs,a,o)))+s.off,u=m[h]??={};u.b=t,u.age=a,u.e=t.e+t.dx*c+i[0]*a,u.n=t.n+t.dy*c+i[1]*a;let d=s.Rd;if(t.back){let e=o.spillS>0?Py(0,o.spillS,a):1,n=-t.back,r=n+(t.back+d)*e,i=.5*(n+r);d=Math.max(.5*(r-n),.25*s.Rd),u.e+=t.dx*i,u.n+=t.dy*i}u.Ra=s.Ra,u.Rd=d,u.Rz=s.Rz,u.zc=s.zc,u.rho=s.rho,u.deposit=s.deposit,u.r2=(u.e-n)**2+(u.n-r)**2,h++}}this.nLive=h;let g=m.slice(0,h).sort((e,t)=>e.r2-t.r2);for(let e=0;e<h;e++)m[e]=g[e];let _=this.bursts,v=0;for(let i=Math.floor((e-co.life-co.shedAge)/o.slot)-1;i<=u;i++){let a=this.slots.get(i);if(a)for(let i of a.bursts){let a=e-i.tb;if(a<0||a>co.life)continue;if(i.z==null){t.spillGroupsAt(i.e,i.n,i.tb,this._G);let e=0;for(let t=0;t<this._G.n;t++)e+=this._G[t].h;i.z=e+i.up}let o=_[v++]??={};Object.assign(o,i),o.age=a,o.r2=(i.e-n)**2+(i.n-r)**2}}this.nBursts=v;let y=_.slice(0,v).sort((e,t)=>e.r2-t.r2);for(let e=0;e<v;e++)_[e]=y[e];return this.stats.ms=performance.now()-s,m}},zy={kA:25,kP:5.5,chargeS:.15,drift:.03,convPerMs:.004,wakeTp:3,breakDx:1},By=`float coverOf(float F) { float z = (F - ${fo.mid.toFixed(3)}) / ${fo.sd.toFixed(3)}; return 1.0 / (1.0 + exp(-1.5976 * z * (1.0 + 0.04417 * z * z))); }`,Vy=`
precision highp float;
${ms}
${es}
uniform sampler2D uPrev;
uniform vec2 uOrigin, uOldOrigin, uDrift, uSkiPos, uSkiFwd, uWindDir;
uniform float uExtent, uDt, uTexel, uWakeRate, uSkiSpeed, uSplash, uWindMs;
uniform float uTauP05, uTauF, uTauL, uLaceYield, uConv;
uniform int uSkiN;
uniform vec4 uSki[6];
uniform int uSprayN;
uniform vec4 uSpray[48];
uniform float uSkiU[6];
varying vec2 vUv;
float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n21(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h21(i), h21(i + vec2(1.0, 0.0)), f.x), mix(h21(i + vec2(0.0, 1.0)), h21(i + vec2(1.0, 1.0)), f.x), f.y); }
float wakeStamp(vec2 p, vec2 pos, vec2 fwd, float speed) {
float sp = clamp(speed / 4.0, 0.0, 1.3);
if (sp < 0.02) return 0.0;
vec2 rel = p - pos;
float ahead = dot(rel, fwd), lat = abs(dot(rel, vec2(fwd.y, -fwd.x)));
float behind = -ahead - 3.1, dBow = 3.2 - ahead;
float trail = smoothstep(0.30 + 0.05 * max(behind, 0.0), 0.08, lat) * smoothstep(0.0, 0.5, behind) * (1.0 - smoothstep(0.8, 2.0, behind));
float armLatBow = 0.28 + 0.13 * min(dBow, 30.0) + 0.04 * max(dBow - 30.0, 0.0);
float armLatMain = 0.30 + 0.12 * min(max(dBow - 3.0, 0.0), 30.0) + 0.04 * max(dBow - 33.0, 0.0);
float armsBow = smoothstep(0.16, 0.0, abs(lat - armLatBow)) * smoothstep(0.0, 1.5, dBow) * exp(-dBow * 0.05) * 0.22;
float armsMain = smoothstep(0.16, 0.0, abs(lat - armLatMain)) * smoothstep(2.4, 4.6, dBow) * exp(-max(dBow - 3.0, 0.0) * 0.05);
float bk = 0.5 + 0.8 * n21(p * 2.2 + 4.1);
return (trail * 1.3 + (armsBow + armsMain) * 0.5) * bk * sp;
}
float rowField(vec2 p, vec2 cd) {
float cc = dot(p, cd);
return 0.6 * n21(vec2(cc / 22.0 + uTime * 0.012, 3.7)) + 0.4 * n21(vec2(cc / 9.0 - uTime * 0.017, 11.3));
}
void charge(inout float V, inout float T, float dV, float tp) { float nv = V + dV; if (nv > 1e-4) T = (V * T + dV * tp) / nv; V = nv; }
void main() {
vec2 p = uOrigin + vUv * uExtent;
vec2 wd = uWindDir, cd = vec2(-wd.y, wd.x);
float lm = rowField(p, cd), dlm = (rowField(p + cd * 0.5, cd) - rowField(p - cd * 0.5, cd));
float toward = -sign((lm - 0.5) * dlm) * smoothstep(0.0, 0.03, abs(lm - 0.5));
vec2 po = (p - uDrift * uDt - uOldOrigin) / uExtent;
vec2 poL = po - cd * (toward * uConv * uDt / uExtent);
vec4 prev = vec4(0.0); float Lp = 0.0, Lsm = 0.0;
vec2 tap = wd * (1.5 * uTexel / uExtent);
if (po.x >= 0.0 && po.y >= 0.0 && po.x <= 1.0 && po.y <= 1.0) {
prev = texture2D(uPrev, po);
Lp = texture2D(uPrev, poL).a;
Lsm = 0.5 * (texture2D(uPrev, poL - tap).a + texture2D(uPrev, poL + tap).a);
}
float F = prev.r, V = prev.g, Tp = max(prev.b * 10.0, 0.3);
float L = mix(Lp, Lsm, clamp(uDt * 2.0, 0.0, 0.5));
V *= exp(-uDt / Tp);
if (V > 0.05) {
vec2 o = vec2(uTexel / uExtent);
float nb = 0.25 * (texture2D(uPrev, po + vec2(o.x, 0.0)).r + texture2D(uPrev, po - vec2(o.x, 0.0)).r + texture2D(uPrev, po + vec2(0.0, o.y)).r + texture2D(uPrev, po - vec2(0.0, o.y)).r);
F = mix(F, max(F, nb), clamp(uDt * 1.5 * V, 0.0, 0.3));
}
float dmp = smoothstep(0.3, 4.0, depthAt(p)); vec3 ff = fetchAt(p);
Wave w = waveEval(p, uTime, ${zy.breakDx.toFixed(2)}, ff, dmp);
float b = breakProb(w, p);
float hb = clamp(2.0 * max(w.h, 0.0) + 0.25 * uHsRef, 0.05, 3.0), tpB = clamp(uTauP05 * pow(hb / 0.5, 0.7), 0.5, 10.0);
charge(V, Tp, (1.0 - V) * clamp(b * uDt / ${zy.chargeS.toFixed(2)}, 0.0, 1.0), tpB);
float supply = ${zy.kA.toFixed(1)} * b;
float wk = wakeStamp(p, uSkiPos, uSkiFwd, uSkiSpeed);
for (int i = 0; i < 6; i++) { if (i >= uSkiN) break; vec2 d = p - uSki[i].xy; if (dot(d, d) < 2500.0) wk += wakeStamp(p, uSki[i].xy, uSki[i].zw, uSkiU[i]); }
float wkr = clamp(wk * uWakeRate * uDt, 0.0, 1.0);
charge(V, Tp, (1.0 - V) * wkr * 0.25, ${zy.wakeTp.toFixed(1)});
supply += wk * uWakeRate * 0.06;
L += (1.0 - L) * wkr * 0.02;
float sp = 0.0;
for (int i = 0; i < 48; i++) { if (i >= uSprayN) break; vec2 d = p - uSpray[i].xy; float r = uSpray[i].z; sp += uSpray[i].w * exp(-dot(d, d) / (r * r)); }
sp = clamp(sp * (0.6 + 0.8 * n21(p * 3.0 + 1.7)), 0.0, 1.0);
charge(V, Tp, (1.0 - V) * sp * 0.3, 1.5);
F += (1.0 - F) * sp * 0.4;
if (uSplash > 0.01) {
vec2 rel2 = p - uSkiPos;
float ahead2 = dot(rel2, uSkiFwd), lat2 = abs(dot(rel2, vec2(uSkiFwd.y, -uSkiFwd.x))), dB = 3.2 - ahead2;
float burst = smoothstep(0.9, 0.1, lat2 + 0.12 * max(dB, 0.0)) * smoothstep(-0.5, 0.3, dB) * (1.0 - smoothstep(1.0, 3.0, dB));
float bs = clamp(burst * (0.55 + 0.7 * n21(p * 3.1 + 7.7)) * uSplash * ${7 .toFixed(1)} * uDt, 0.0, 1.0);
charge(V, Tp, (1.0 - V) * bs * 0.4, 1.2); F += (1.0 - F) * bs * 0.5;
}
supply += ${zy.kP.toFixed(1)} * V;
float Fn = (F + supply * uDt) / (1.0 + (supply + 1.0 / uTauF) * uDt);
L += (1.0 - L) * clamp(uLaceYield * Fn / uTauF * uDt, 0.0, 1.0);
L *= exp(-uDt / uTauL);
gl_FragColor = vec4(clamp(Fn, 0.0, 1.0), clamp(V, 0.0, 1.0), clamp(Tp / 10.0, 0.0, 1.0), clamp(L, 0.0, 1.0));
}`,Hy=.6,Uy=.5,Wy=e=>`
precision highp float;
${ms}
${es}
${qo}
${e?Fy:``}
uniform sampler2D uPrev;
uniform vec2 uOrigin, uOldOrigin, uDrift;
uniform float uExtent, uDt, uTauF;
varying vec2 vUv;
void main() {
vec2 p = uOrigin + vUv * uExtent;
vec2 po = (p - uDrift * uDt - uOldOrigin) / uExtent;
vec4 prev = (po.x >= 0.0 && po.y >= 0.0 && po.x <= 1.0 && po.y <= 1.0) ? texture2D(uPrev, po) : vec4(0.0);
float F = prev.r, V = prev.g * exp(-uDt / ${po.tp.toFixed(2)});
float dmp = smoothstep(0.3, 4.0, depthAt(p)); vec3 ff = fetchAt(p);
float b = spillEval(p, uTime, ff, dmp).x;
${e?`{ float dep = puffDeposit(p); if (dep >= 0.0) b = max(b * ${Hy.toFixed(2)}, clamp(${Uy.toFixed(2)} * dep, 0.0, 1.0)); }`:``}
V += (1.0 - V) * clamp(b * uDt / ${zy.chargeS.toFixed(2)}, 0.0, 1.0);
float supply = ${zy.kA.toFixed(1)} * b + ${zy.kP.toFixed(1)} * V;
float Fn = (F + supply * uDt) / (1.0 + (supply + 1.0 / uTauF) * uDt);
gl_FragColor = vec4(clamp(Fn, 0.0, 1.0), clamp(V, 0.0, 1.0), 0.0, 0.0);
}`,Gy=64,Ky=`
precision highp float;
${ms}
${es}
${By}
uniform sampler2D uFoam;
uniform vec2 uOrigin, uSkiPos, uSkiFwd;
uniform float uExtent, uTexel;
uniform int uSkiN;
uniform vec4 uSki[6];
varying vec2 vUv;
float inWake(vec2 p, vec2 pos, vec2 fwd) { vec2 r = p - pos; float behind = -dot(r, fwd), lat = abs(dot(r, vec2(fwd.y, -fwd.x))); return step(-4.0, behind) * step(behind, 70.0) * step(lat, 4.0 + 0.25 * max(behind, 0.0)); }
void main() {
vec2 p = uOrigin + vUv * uExtent;
float dmp = smoothstep(0.3, 4.0, depthAt(p)); vec3 ff = fetchAt(p);
Wave w = waveEval(p, uTime, ${zy.breakDx.toFixed(2)}, ff, dmp);
float det; waveSlopeMain(w, det);
float sig = sqrt(w.dvar + 0.0016);
float cov = 0.0, use = step(8.0, dot(p - uSkiPos, uSkiFwd));
for (int i = 0; i < 6; i++) { if (i >= uSkiN) break; use *= 1.0 - inWake(p, uSki[i].xy, uSki[i].zw); }
vec2 step1 = vec2(uTexel / uExtent);
for (int j = 0; j < 6; j++) for (int i = 0; i < 6; i++) cov += coverOf(texture2D(uFoam, vUv + (vec2(float(i), float(j)) - 2.5) * step1).r);
gl_FragColor = vec4(clamp(det * 0.5, 0.0, 1.0), clamp(sig * 4.0, 0.0, 1.0), cov / 36.0 * use, use);
}`,qy=class{constructor(e,t,{size:n=384,extent:r=192,wakeRate:a=3.2}={}){this.renderer=e,this.water=t,this.size=n,this.extent=r,this.texel=r/n,this.wakeRate=a,this.last=null,this.on=!0;let o=()=>new Kn(n,n,{type:sn,format:i,minFilter:_t,magFilter:_t,depthBuffer:!1,stencilBuffer:!1});this.rt=[o(),o()],this.cur=0,this.sp={rt:[o(),o()],cur:0};let s=t.uniforms;this.uniforms=Object.fromEntries(rs.map(e=>[e,s[e]])),Object.assign(this.uniforms,{uPrev:{value:null},uOrigin:{value:new oi},uOldOrigin:{value:new oi},uDrift:{value:new oi},uSkiPos:{value:new oi},uSkiFwd:{value:new oi(0,1)},uExtent:{value:r},uDt:{value:0},uWindDir:{value:new oi(0,1)},uWindMs:{value:0},uTauP05:{value:3},uTauF:{value:.6},uTauL:{value:40},uLaceYield:{value:.03},uConv:{value:0},uSkiN:{value:0},uSprayN:{value:0},uSpray:{value:Array.from({length:48},()=>new Er)},uSki:{value:Array.from({length:6},()=>new Er)},uSkiU:{value:new Float32Array(6)},uTexel:{value:this.texel},uWakeRate:{value:a},uSkiSpeed:{value:0},uSplash:{value:0}}),this.material=new Ui({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:Vy,uniforms:this.uniforms,depthTest:!1,depthWrite:!1}),this.quad=new En(new Nr(2,2),this.material),this.quad.frustumCulled=!1,this.scene=new Yn,this.scene.add(this.quad),this.camera=new ee(-1,1,1,-1,0,1),this.spillU={...Object.fromEntries(rs.map(e=>[e,s[e]])),uPrev:{value:null},uOrigin:this.uniforms.uOrigin,uOldOrigin:this.uniforms.uOldOrigin,uDrift:this.uniforms.uDrift,uExtent:this.uniforms.uExtent,uDt:this.uniforms.uDt,uTauF:this.uniforms.uTauF},this.spillQuad=new En(new Nr(2,2),new Ui({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:Wy(!1),uniforms:this.spillU,depthTest:!1,depthWrite:!1})),this.spillQuad.frustumCulled=!1,this.spillScene=new Yn,this.spillScene.add(this.spillQuad),this.statsRT=new Kn(Gy,Gy,{type:Ee,format:i,depthBuffer:!1,stencilBuffer:!1}),this.statsU={...Object.fromEntries(rs.map(e=>[e,s[e]])),uFoam:{value:null},uOrigin:this.uniforms.uOrigin,uSkiPos:this.uniforms.uSkiPos,uSkiFwd:this.uniforms.uSkiFwd,uExtent:this.uniforms.uExtent,uTexel:this.uniforms.uTexel,uSkiN:this.uniforms.uSkiN,uSki:this.uniforms.uSki},this.statsMat=new Ui({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:Ky,uniforms:this.statsU,depthTest:!1,depthWrite:!1}),this.statsQuad=new En(new Nr(2,2),this.statsMat),this.statsQuad.frustumCulled=!1,this.statsScene=new Yn,this.statsScene.add(this.statsQuad),this.statsBuf=new Uint8Array(16384),this.statsBusy=!1,this.statsT=-1e9,this.calib=new _o,this.windMs=0,this.gustMs=0,this.waterType=so.ocean,this.state={target:0,measured:null,ratio:this.calib.ratio,eps:.55,gust:0,wa:0},this.origin=new oi(1e9,1e9),this._publish()}_publish(){let e=this.water.uniforms;e.uSpillTex.value=this.sp.rt[this.sp.cur].texture,e.uFoamTex.value=this.rt[this.cur].texture,e.uFoamOrigin.value.copy(this.origin),e.uFoamExtent.value=this.extent,e.uFoamOn.value=+!!this.on}setEnabled(e){this.on=!!e,this._publish()}usePuffs(e){for(let t of[`uPuffTex`,`uPuffCells`,`uRollO`,`uRollE`,`uRollCell`])this.spillU[t]=e[t];let t=this.spillQuad.material;this.spillQuad.material=new Ui({vertexShader:t.vertexShader,fragmentShader:Wy(!0),uniforms:this.spillU,depthTest:!1,depthWrite:!1}),t.dispose()}setSea({windMs:e=0,gustMs:t=0,gustCover:n=0,water:r=so.ocean}={}){this.windMs=e,this.gustMs=t,this.waterType=r;let i=vo(r),a=this.uniforms;a.uTauP05.value=i.tauP05,a.uTauF.value=i.tauF,a.uTauL.value=i.tauL,a.uLaceYield.value=i.laceYield,a.uConv.value=zy.convPerMs*e;let o=t>e?Math.min(.95,Math.max(0,n)):0;this.state.target=((1-o)*Va(e)+o*Va(t))*(r.fresh?2/3:1),this.state.ambient=Va(e)*(r.fresh?2/3:1),this.calib.reset()}clear(){let e=this.renderer,t=e.getRenderTarget(),n=new jt;e.getClearColor(n);let r=e.getClearAlpha();e.setClearColor(0,0);for(let t of[...this.rt,...this.sp.rt])e.setRenderTarget(t),e.clear(!0,!1,!1);e.setRenderTarget(t),e.setClearColor(n,r),this.last=null,this.calib.reset()}update(e,t,n=[0,0],r=[],i={toE:0,toN:1,ms:0}){if(!this.on)return;if(this.last==null||e<this.last||e-this.last>.6){this.clear(),this.last=e,this._origin(t);return}let a=Math.min(e-this.last,.1);if(this.last=e,a<=1e-5)return;let o=this.uniforms,s=this.rt[this.cur],c=this.rt[1-this.cur];o.uOldOrigin.value.copy(this.origin),this._origin(t),o.uOrigin.value.copy(this.origin),o.uPrev.value=s.texture,o.uDt.value=a;let l=zy.drift*i.ms;o.uDrift.value.set(n[0]+l*i.toE,n[1]+l*i.toN),o.uWindDir.value.set(i.toE,i.toN),o.uWindMs.value=i.ms;let u=Math.min(r.length,6);o.uSkiN.value=u;for(let e=0;e<u;e++)o.uSki.value[e].set(r[e].e,r[e].n,r[e].fe,r[e].fn),o.uSkiU.value[e]=r[e].u;let d=t.sprays??[],f=Math.min(d.length,48);o.uSprayN.value=f;for(let e=0;e<f;e++)o.uSpray.value[e].set(d[e].e,d[e].n,d[e].r,d[e].a);o.uSkiPos.value.set(t.e,t.n),o.uSkiFwd.value.set(t.fe,t.fn),o.uSkiSpeed.value=t.u,o.uSplash.value=t.splash??0;let p=this.water.uniforms.uHsRef?.value??.5,m=Math.min(1,Math.max(0,(p-.05)/.45));o.uWakeRate.value=this.wakeRate*m*m*(3-2*m);let h=this.renderer,g=h.getRenderTarget(),_=h.autoClear;h.autoClear=!1,h.setRenderTarget(c),h.render(this.scene,this.camera),this.cur=1-this.cur,this.water.uniforms.uSpillOn.value>.5&&(this.spillU.uPrev.value=this.sp.rt[this.sp.cur].texture,h.setRenderTarget(this.sp.rt[1-this.sp.cur]),h.render(this.spillScene,this.camera),this.sp.cur=1-this.sp.cur),e-this.statsT>.5&&!this.statsBusy&&(this.statsU.uFoam.value=this.rt[this.cur].texture,h.setRenderTarget(this.statsRT),h.render(this.statsScene,this.camera),this._readStats(e-(this.statsT>0?this.statsT:e-.5)),this.statsT=e),h.setRenderTarget(g),h.autoClear=_,this._publish()}_readStats(e){this.statsBusy=!0;let t=()=>{this.statsBusy=!1},n=this.renderer.readRenderTargetPixelsAsync?.(this.statsRT,0,0,Gy,Gy,this.statsBuf);if(n?.then)n.then(()=>{this._calibrate(e),t()},t);else try{this.renderer.readRenderTargetPixels(this.statsRT,0,0,Gy,Gy,this.statsBuf),this._calibrate(e)}finally{t()}}_calibrate(e){let t=this.statsBuf,n=4096,r=new Float32Array(n),i=new Float32Array(n),a=0,o=0,s=0,c=0;for(let e=0;e<n;e++)r[e]=t[4*e]/255*2,i[e]=t[4*e+1]/255/4,s+=r[e],c+=r[e]*r[e],t[4*e+3]>127&&(a+=t[4*e+2]/255,o++);let l=this.state,u=l.target;if(!(u>0)){this._setEps(0,0);return}l.measured=o>200?a/o:null,l.measured!=null&&(l.ratio=this.calib.step(l.measured,u,e)),l.wa=Math.min(.5,(l.ambient??u)/l.ratio);let d=uo(r,i,l.wa),f=Math.sqrt(Math.max(c/n-(s/n)**2,1e-6)),p=this.gustMs>this.windMs?Math.min(6,Va(this.gustMs)/Math.max(Va(this.windMs),1e-6)):1,m=p>1?f*(Jy(Math.min(.4,l.wa*p))-Jy(l.wa)):0;this._setEps(l.eps+(d-l.eps)*Math.min(1,e/1.5),m)}_setEps(e,t){let n=this.state;n.eps=e,n.gust=t;let r=this.water.uniforms;r.uBreakEps.value=e,r.uBreakGust.value=t,r.uFoamRatio.value=n.ratio}probe(){let e=this.size*this.size,t=new Uint16Array(e*4);this.renderer.readRenderTargetPixels(this.rt[this.cur],0,0,this.size,this.size,t);let n=ti.fromHalfFloat,r={};return[`F`,`V`,`Tp`,`L`].forEach((i,a)=>{let o=0,s=[.01,.06,.3,.6,.9].map(()=>0);for(let r=0;r<e;r++){let e=n(t[4*r+a])*(a===2?10:1);o+=e,[.01,.06,.3,.6,.9].forEach((t,n)=>{e>(a===2?t*10:t)&&s[n]++})}r[i]={mean:+(o/e).toFixed(4),over:s.map(t=>+(t/e).toFixed(4))}}),r}_origin(e){let t=this.texel*8;this.origin.set(Math.floor((e.e-this.extent/2)/t)*t,Math.floor((e.n-this.extent/2)/t)*t)}};function Jy(e){let t=e<.5?e:1-e,n=Math.sqrt(-2*Math.log(Math.max(t,1e-12))),r=n-(2.515517+.802853*n+.010328*n*n)/(1+1.432788*n+.189269*n*n+.001308*n*n*n);return e<.5?-r:r}var Yy={drops:64,maxBursts:256,shutter:1/90,life:co.life,clump:[.01,.035],minPx:1,clumpPx:3,exposure:1,fadeIn:.12,near:25,far:45,gain:1.5},Xy=`
uniform highp sampler2D uBurstTex;
uniform sampler2D uRollS;
uniform vec2 uRollO;
uniform float uRollE, uPix, uRollDebug, uShutter, uMinPx, uClumpPx, uExposure, uFadeIn, uNear, uFar, uGain;
uniform vec2 uClump;
uniform vec3 uCamV;
attribute vec2 aDrop;
varying vec2 vUv;
varying float vA, vGlint, vWidth, vLen;
float h1(float n) { return fract(sin(n * 12.9898) * 43758.5453); }
vec4 bt(int b, int k) { return texelFetch(uBurstTex, ivec2(b * 4 + k, 0), 0); }
void main() {
int b = int(aDrop.x + 0.5); vec4 T0 = bt(b, 0), T1 = bt(b, 1), T2 = bt(b, 2), T3 = bt(b, 3);
float s = T2.w * 1000.0 + aDrop.y * 7.13, r1 = h1(s), r2 = h1(s + 1.1), r3 = h1(s + 2.3), r4 = h1(s + 3.7), r5 = h1(s + 5.9), r6 = h1(s + 7.7);
float t = T0.w - ${co.spreadS.toFixed(3)} * r6;
if (T1.w <= 0.0 || r5 > T3.x || t <= 0.0 || t > ${Yy.life.toFixed(2)}) { gl_Position = vec4(0.0, 0.0, 2.0, 1.0); return; }
vec2 d = T1.xy; float yaw = (r1 - 0.5) * ${(2*co.coneYaw).toFixed(3)}, el = T2.z + (r2 - 0.5) * ${(2*co.coneEl).toFixed(3)};
vec2 hd = vec2(d.x * cos(yaw) - d.y * sin(yaw), d.x * sin(yaw) + d.y * cos(yaw));
float jet = T1.w * (0.45 + 0.65 * r3), tau = mix(${co.tau[0].toFixed(3)}, ${co.tau[1].toFixed(3)}, r4 * r4);
vec3 v0 = vec3(d.x * T1.z, 0.0, -d.y * T1.z) + vec3(hd.x * cos(el), sin(el), -hd.y * cos(el)) * jet;
vec3 vT = vec3(T2.x, -9.81 * tau, -T2.y), e = vec3(1.0 - exp(-t / tau));
vec2 s0 = T0.xy + uRollO, x0 = s0;
for (int k = 0; k < 2; k++) x0 = s0 - texture2D(uRollS, (x0 - uRollO) / uRollE).yz;
vec3 p = vec3(x0.x, T0.z, -x0.y) + vT * t + tau * (v0 - vT) * e;
vec3 v = vT + (v0 - vT) * exp(-t / tau);
float hw = texture2D(uRollS, (vec2(p.x, -p.z) - uRollO) / uRollE).x;
if (p.y < hw) { gl_Position = vec4(0.0, 0.0, 2.0, 1.0); return; }
vec4 P = viewMatrix * vec4(p, 1.0); vec3 V = mat3(viewMatrix) * (v - uCamV);
float depth = max(-P.z, 0.1), lod = 1.0 - smoothstep(uNear, uFar, depth);
if (lod <= 0.0 && uRollDebug < 2.5) { gl_Position = vec4(0.0, 0.0, 2.0, 1.0); return; }
float pix = uPix * depth, clump = mix(uClump.x, uClump.y, r4) * T3.y;
float size = clamp(uClumpPx * pix, mix(${co.size[0].toFixed(4)}, ${co.size[1].toFixed(4)}, r4), clump);
float w = max(size, uMinPx * pix), len = max(length(V.xy) * uShutter, w);
if (uRollDebug > 2.5) { w = 0.08; len = 0.08; size = w; }
vec2 ax = length(V.xy) > 1e-4 ? normalize(V.xy) : vec2(0.0, 1.0), pr = vec2(-ax.y, ax.x);
P.xy += ax * position.y * len + pr * position.x * w;
vUv = position.xy + 0.5; vWidth = w; vLen = len;
float cut = clamp(size / w, 0.0, 1.0), lit = clamp(uGain * size * size / (w * len), 0.0, 1.0);
vA = mix(cut, lit, uExposure) * lod * (0.55 + 0.4 * r3) * smoothstep(0.0, uFadeIn, t) * (1.0 - smoothstep(${(.75*Yy.life).toFixed(2)}, ${Yy.life.toFixed(2)}, t));
vGlint = step(0.82, h1(s + 9.1));
if (uRollDebug > 2.5) vA = 1.0;
gl_Position = projectionMatrix * P;
}`,Zy=`
uniform float uSunT, uSunOcc;
varying vec2 vUv;
varying float vA, vGlint, vWidth, vLen;
void main() {
vec2 q = vUv - 0.5; float r = 0.5 * max(vWidth / vLen, 0.0), ax = max(abs(q.y) - (0.5 - r), 0.0) / max(r, 1e-3);
float d = length(vec2(2.0 * q.x, ax)), a = vA * (1.0 - smoothstep(0.35, 1.0, d)); if (a < 0.004) discard;
vec3 col = vec3(0.86, 0.9, 0.95) + vGlint * uSunT * uSunOcc * 0.6;
gl_FragColor = vec4(min(col, vec3(1.0)) * a, a);
}`,Qy=class{constructor(e,t,n){let r=Yy,a=n.uniforms;this.tex=new sr(new Float32Array(r.maxBursts*4*4),r.maxBursts*4,1,i,G),this.tex.minFilter=this.tex.magFilter=yn,this.tex.needsUpdate=!0,this.uniforms={uBurstTex:{value:this.tex},uRollS:t.uniforms.uRollS,uRollO:t.uniforms.uRollO,uRollE:t.uniforms.uRollE,uPix:{value:.001},uRollDebug:t.uniforms.uRollDebug,uSunT:a.uSunT,uSunOcc:a.uSunOcc,uShutter:{value:r.shutter},uMinPx:{value:r.minPx},uClumpPx:{value:r.clumpPx},uExposure:{value:r.exposure},uFadeIn:{value:r.fadeIn},uNear:{value:r.near},uFar:{value:r.far},uGain:{value:r.gain},uClump:{value:new oi(...r.clump)},uCamV:{value:new J}};let o=new wn().copy(new Nr(1,1)),s=new Float32Array(r.maxBursts*r.drops*2);for(let e=0,t=0;e<r.maxBursts;e++)for(let n=0;n<r.drops;n++)s[t++]=e,s[t++]=n;o.setAttribute(`aDrop`,new Tr(s,2)),o.instanceCount=0,this.mat=new Ui({vertexShader:Xy,fragmentShader:Zy,uniforms:this.uniforms,transparent:!0,depthWrite:!1,side:2,blending:5,blendSrc:201,blendDst:205}),this.mesh=new En(o,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,e.add(this.mesh),this.n=0}set visible(e){this.mesh.visible=!!e}get visible(){return this.mesh.visible}update(e,t,n,r=!0,i=null,a=null,o=null){let s=Yy,c=this.tex.image.data,l=(this.uniforms.uFar.value+5)**2,u=r?Math.min(e.nBursts,s.maxBursts):0;if(a!=null)for(;u>0&&e.bursts[u-1].r2>l;)u--;i&&this.uniforms.uCamV.value.copy(i);for(let n=0;n<u;n++){let r=e.bursts[n],i=n*16;c[i]=r.e-t.x,c[i+1]=r.n-t.y,c[i+2]=r.z,c[i+3]=r.age,c[i+4]=r.dx,c[i+5]=r.dy,c[i+6]=r.base,c[i+7]=r.jet,c[i+8]=r.wE,c[i+9]=r.wN,c[i+10]=r.el,c[i+11]=r.seed,c[i+12]=r.amount,c[i+13]=r.size,c[i+14]=0,c[i+15]=0}this.tex.needsUpdate=!0,this.n=u,this.mesh.geometry.instanceCount=u*s.drops,this.uniforms.uPix.value=n}dispose(){this.tex.dispose(),this.mesh.geometry.dispose(),this.mat.dispose(),this.mesh.removeFromParent()}},$y={cell:3,cells:53,tex:256,reach:[55,75],perCell:12,margin:1.4,sigma:14,erode:.35,erodeBase:.08,soft:.22,sink:.1,skin:.05,lumps:.45,tileL:1.6,drift:.1,fog:.04,fogTile:.6,fogSpeed:.5,steps:64,step:.1,maxPuffs:1024,minRho:[.06,.14]},eb={start:.75,light:20,win:.3,settle:.6,fast:16.4,riseTau:.2,riseMin:.15,fallTau:.1,first:.75,firstHold:3,second:.5,secondHold:1.5,unusable:50,riseCheck:3,backoff:[4,60],deep:[[.42,1,2,75],[.35,1,2,75],[.3,1.25,2,75],[.25,1.5,2,75],[.25,2,3,65],[.25,2,0,55],[.22,2.5,0,45],[.2,3,0,35]]},tb=.598,nb=.0575,rb=64,ib=32,ab=`
vec3 h33(vec3 p, float P) { uvec3 q = uvec3(ivec3(mod(p, P)) + 4096); q *= uvec3(1597334673u, 3812015801u, 2798796415u); q = (q.x ^ q.y ^ q.z) * uvec3(1597334673u, 3812015801u, 2798796415u); return vec3(q) * (1.0 / 4294967295.0); }
float gn(vec3 x, float P) {
  vec3 i = floor(x), f = fract(x), u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float c[8];
  for (int k = 0; k < 8; k++) { vec3 o = vec3(float(k & 1), float((k >> 1) & 1), float((k >> 2) & 1)); c[k] = dot(h33(i + o, P) * 2.0 - 1.0, f - o); }
  return mix(mix(mix(c[0], c[1], u.x), mix(c[2], c[3], u.x), u.y), mix(mix(c[4], c[5], u.x), mix(c[6], c[7], u.x), u.y), u.z);
}
float wn(vec3 x, float P) {                 // 1 at the cells' points, 0 between (1 - F1)
  vec3 i = floor(x), f = fract(x); float d = 1.0;
  for (int a = -1; a <= 1; a++) for (int b = -1; b <= 1; b++) for (int c = -1; c <= 1; c++) { vec3 o = vec3(float(a), float(b), float(c)), r = o + h33(i + o, P) - f; d = min(d, dot(r, r)); }
  return 1.0 - sqrt(d);
}`,ob=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,sb=`precision highp float; uniform float uZ; varying vec2 vUv;
${ab}
void main() {
vec3 x = vec3(vUv, uZ);
float pl = clamp(0.5 + 0.9 * (gn(x * 4.0, 4.0) * 0.55 + gn(x * 8.0, 8.0) * 0.3 + gn(x * 16.0, 16.0) * 0.15), 0.0, 1.0);
float w1 = wn(x * 4.0, 4.0) * 0.625 + wn(x * 8.0, 8.0) * 0.25 + wn(x * 16.0, 16.0) * 0.125;
float pw = clamp((pl - (w1 - 1.0)) / (2.0 - w1), 0.0, 1.0);
float w2 = wn(x * 8.0, 8.0) * 0.625 + wn(x * 16.0, 16.0) * 0.25 + wn(x * 32.0, 32.0) * 0.125;
float w3 = wn(x * 16.0, 16.0) * 0.625 + wn(x * 32.0, 32.0) * 0.25 + wn(x * 64.0, 64.0) * 0.125;
gl_FragColor = vec4(pw, w2, w3, pl);
}`,cb=`precision highp float; uniform float uZ; varying vec2 vUv;
${ab}
vec3 psi(vec3 x) { return vec3(gn(x * 2.0, 2.0) + 0.5 * gn(x * 4.0 + vec3(5.0, 0.0, 0.0), 4.0), gn(x * 2.0 + vec3(0.0, 7.0, 0.0), 2.0) + 0.5 * gn(x * 4.0 + vec3(0.0, 0.0, 9.0), 4.0), gn(x * 2.0 + vec3(0.0, 0.0, 11.0), 2.0) + 0.5 * gn(x * 4.0 + vec3(13.0, 0.0, 0.0), 4.0)); }
void main() {
vec3 x = vec3(vUv, uZ); float e = 1.0 / 64.0;
vec3 dx = (psi(x + vec3(e, 0.0, 0.0)) - psi(x - vec3(e, 0.0, 0.0))) / (2.0 * e), dy = (psi(x + vec3(0.0, e, 0.0)) - psi(x - vec3(0.0, e, 0.0))) / (2.0 * e), dz = (psi(x + vec3(0.0, 0.0, e)) - psi(x - vec3(0.0, 0.0, e))) / (2.0 * e);
vec3 v = vec3(dy.z - dz.y, dz.x - dx.z, dx.y - dy.x) / 9.0;
gl_FragColor = vec4(clamp(v * 0.5 + 0.5, 0.0, 1.0), 1.0);
}`,lb=`precision highp float;
${ms}
${es}
uniform vec2 uRollO; uniform float uRollE, uRollTx;
varying vec2 vUv;
void main() {
vec2 x = uRollO + vUv * uRollE;
float dmp = smoothstep(0.3, 4.0, depthAt(x));
Wave w0 = waveEval(x, uTime, uRollTx, fetchAt(x), dmp);
vec2 p0 = x - w0.disp;
dmp = smoothstep(0.3, 4.0, depthAt(p0));
Wave w = waveEval(p0, uTime, uRollTx, fetchAt(p0), dmp);
vec2 pe = p0 + w.disp; float det; vec2 sl = waveSlope(w, det);
float h = w.h + bowWave(pe, uRollTx).x + dot(sl, x - pe);
gl_FragColor = vec4(h, p0 - x, 0.0);
}`,ub=e=>e.toFixed(3),db=`vec4 at(vec2 p) { return texture2D(uVol, clamp(p, vec2(0.5), uVolRes - 0.5) * uVolTexel); }`,fb=`precision highp float; uniform sampler2D uVol; uniform vec2 uVolTexel, uVolRes; varying vec2 vUv;
${db}
void main() { vec2 p = vUv * uVolRes; gl_FragColor = 0.25 * (at(p + vec2(-0.5, -0.5)) + at(p + vec2(0.5, -0.5)) + at(p + vec2(-0.5, 0.5)) + at(p + vec2(0.5, 0.5))); }`,pb=`precision highp float; uniform sampler2D uVol; uniform highp sampler2D uSceneDepth; uniform vec2 uVolTexel, uVolRes; uniform mat4 uInvProj; uniform float uRevZ;
varying vec2 vUv;
${db}
float distAt(vec2 uv) { float d = texture2D(uSceneDepth, uv).r; vec4 v = uInvProj * vec4(uv * 2.0 - 1.0, uRevZ > 0.5 ? d : d * 2.0 - 1.0, 1.0); return length(v.xyz / v.w); }
void main() {
vec2 p = vUv * uVolRes;
if (at(p - 1.5).a + at(p + 1.5).a + at(p + vec2(1.5, -1.5)).a + at(p + vec2(-1.5, 1.5)).a < 0.002) discard;
float tp = distAt(vUv); vec2 c = p - 0.5, i0 = floor(c);
vec4 sum = vec4(0.0); float wsum = 0.0, wall = 0.0;
for (int j = -1; j <= 2; j++) for (int i = -1; i <= 2; i++) {
vec2 t0 = i0 + vec2(float(i), float(j)), dd = abs(t0 - c); float w = max(0.0, 1.5 - dd.x) * max(0.0, 1.5 - dd.y);
if (w <= 0.0) continue;
vec2 tx = clamp(t0, vec2(0.0), uVolRes - 1.0);
float tt = distAt((tx + 0.5) / uVolRes), wd = 1.0 - smoothstep(0.04, 0.12, (tt - tp) / max(tp, 0.1));
sum += w * wd * texture2D(uVol, (tx + 0.5) * uVolTexel); wsum += w * wd; wall += w;
}
gl_FragColor = wsum > 1e-4 ? sum / wsum * min(1.0, wsum / (0.25 * wall)) : vec4(0.0);
}`,mb=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},hb=`
${Fy}
uniform sampler2D uRollS;
uniform float uRollR, uRollSink;
attribute vec2 aCell;
varying vec3 vPos, vBmin, vBmax;
varying vec2 vCell;
void main() {
float c = uRollCell, hc = 0.5 * c;
vec2 m = uRollO + (aCell + 0.5) * c;
vec4 info = cellTexel(ivec2(aCell), 3);
if (info.y < 0.5 || length(m - uRollO - 0.5 * uRollE) > uRollR) { gl_Position = vec4(0.0, 0.0, 2.0, 1.0); return; }
float lo = 1e9, hi = -1e9;
for (int j = 0; j < 9; j++) {
vec2 o = vec2(float(j % 3) - 1.0, float(j / 3) - 1.0) * hc;
float h = texture2D(uRollS, (m + o - uRollO) / uRollE).x; lo = min(lo, h); hi = max(hi, h);
}
vec4 fp = cellTexel(ivec2(aCell), 3 + 1);
vec2 c0 = uRollO + aCell * c;
vBmin = vec3(c0.x + fp.x, lo - 0.1 - uRollSink, -(c0.y + fp.w));
vBmax = vec3(c0.x + fp.z, hi + info.x + 0.25, -(c0.y + fp.y));
vCell = aCell;
vPos = mix(vBmin, vBmax, position + 0.5);
gl_Position = projectionMatrix * viewMatrix * vec4(vPos, 1.0);
}`,gb=`
${ms}
${es}
${Fy}
uniform sampler2D uRollS;
uniform highp sampler3D uRollNoise;
uniform vec3 uSunDir;
uniform float uSunT, uSunOcc, uRollSteps, uRollDebug, uRollLight, uRollFine, uRollStepK, uRollFog, uRollSoft, uRollSink, uRollSkin;
uniform vec2 uRollReach;
varying vec3 vPos, vBmin, vBmax;
varying vec2 vCell;
#ifdef ROLL_PASS
uniform highp sampler2D uSceneDepth;
uniform vec2 uVolRes;
uniform mat4 uInvProj;
uniform float uRevZ;
float sceneT() {
vec2 uv = gl_FragCoord.xy / uVolRes;
float d = texture(uSceneDepth, uv).r;
vec4 v = uInvProj * vec4(uv * 2.0 - 1.0, uRevZ > 0.5 ? d : d * 2.0 - 1.0, 1.0);
return length(v.xyz / v.w);
}
#endif
vec4 PA[${$y.perCell}], PB[${$y.perCell}], PC[${$y.perCell}], PS[${$y.perCell}];
int NP = 0;
float styleErode(float s) { return mod(s, 256.0) / 64.0; }
float styleNoise(float s) { return mod(floor(s / 256.0), 256.0) / 64.0; }
float styleWaist(float s) { return floor(s / 65536.0) / 64.0; }
void loadPuffs(vec3 ro, vec3 inv, inout float tn, inout float tf) {
ivec2 c = ivec2(floor(vCell + 0.5));
float t0 = 1e9, t1 = -1e9, hiW = vBmax.y - cellTexel(c, 3).x - 0.25;
for (int k = 0; k < ${$y.perCell}; k++) {
float id = cellId(c, k); if (id < -0.5) continue;
int i = int(id + 0.5); vec4 A = puffTexel(i, 0), B = puffTexel(i, 1), S = puffTexel(i, 3);
float ra = B.z * (1.0 + 0.5 * abs(S.y)), rd = B.w * length(vec2(1.0 + 0.5 * abs(S.z), S.w));
vec2 m = A.xy + uRollO, h = sqrt(ra * ra * B.yx * B.yx + rd * rd * B.xy * B.xy) + ${ub($y.margin)};
vec3 lo = vec3(m.x - h.x, vBmin.y, -(m.y + h.y)), hi = vec3(m.x + h.x, hiW + A.z + A.w + 0.1, -(m.y - h.y));
vec3 ta = (lo - ro) * inv, tb = (hi - ro) * inv, q0 = min(ta, tb), q1 = max(ta, tb);
float e0 = max(max(max(q0.x, q0.y), q0.z), tn), e1 = min(min(min(q1.x, q1.y), q1.z), tf);
if (e1 <= e0) continue;
vec4 V = puffTexel(i, 4);
PA[NP] = A; PB[NP] = B; PC[NP] = puffTexel(i, 2); PS[NP] = vec4(S.yzw, floor(V.y * 64.0 + 0.5) + 256.0 * floor(V.z * 64.0 + 0.5) + 65536.0 * floor(V.x * 64.0 + 0.5)); NP++;
t0 = min(t0, e0); t1 = max(t1, e1);
}
tn = max(tn, t0); tf = min(tf, t1);
}
float billowZ(vec3 X, vec4 C, float nk) {
float g = (1.0 + ${ub(ao.grow)} * (1.0 - exp(-C.y / ${ub(ao.tauG)}))) * nk;
vec3 Y = X / g + vec3(C.z, C.w, C.z + C.w) * ${ub($y.tileL)} + vec3(0.0, 0.0, -${ub($y.drift)} * C.y);
vec4 N = texture(uRollNoise, Y / vec3(${ub($y.tileL)}, ${ub($y.tileL)}, ${ub(.7*$y.tileL)}));
return (N.r * 0.62 + N.g * 0.26 + N.b * 0.12 - ${tb.toFixed(4)}) / ${nb.toFixed(4)};
}
float densAt(vec3 p, bool fine, out float B, out float core, out float age, out float hz) {
vec2 en = vec2(p.x, -p.z), uv = (en - uRollO) / uRollE;
vec3 W = texture2D(uRollS, uv).xyz;
float z = p.y - W.x;
B = 0.0; core = 0.0; age = 0.0; hz = 0.0;
if (z < -0.05 - uRollSink) return 0.0;
vec2 s = en + W.yz - uRollO;
float w1 = 0.0, zs = 0.0, ww = 0.0, erw = 0.0, agw = 0.0, hzw = 0.0; int k1 = 0; vec3 X1 = vec3(0.0);
for (int k = 0; k < ${$y.perCell}; k++) {
if (k >= NP) break;
vec2 d = PB[k].xy, dl = s - PA[k].xy;
vec3 X = vec3(dot(dl, vec2(-d.y, d.x)), dot(dl, d), z - PA[k].z);
float st = PS[k].w, w = puffKernel(puffQ(X, vec3(PB[k].zw, PA[k].w), PS[k].xyz), styleWaist(st)) * PC[k].x;
if (w <= 0.0) continue;
B += w; erw += w * styleErode(st); agw += w * PC[k].y; hzw += w * X.z / PA[k].w;
if (fine) { zs += w * billowZ(X, PC[k], styleNoise(st)); ww += w * w; }
if (w > w1) { w1 = w; k1 = k; X1 = X; }
}
if (B < 0.002) return 0.0;
age = agw / B; hz = hzw / B;
float lo0 = ${ub($y.erodeBase+.5*$y.erode)};
if (!fine) return smoothstep(lo0, lo0 + ${ub($y.soft)}, B) * min(B, 1.0) * smoothstep(-0.05 - uRollSink, 0.02 - uRollSink, z);
float n = clamp(0.5 + 0.25 * zs / sqrt(max(ww, 1e-8)), 0.0, 1.0);
float Bn = B * (${ub(1-$y.lumps)} + ${ub(2*$y.lumps)} * n);
float lo = ${ub($y.erodeBase)} + ${ub($y.erode)} * (erw / B) * (1.0 - n);
core = smoothstep(lo, lo + uRollSoft, Bn);
float grain = texture(uRollNoise, X1 / ${ub($y.fogTile)} + vec3(0.0, 0.0, uTime * ${ub($y.fogSpeed)}) + PC[k1].zwz).g;
float fog = smoothstep(0.5 * ${ub($y.erodeBase)}, lo, Bn) * (1.0 - core) * (0.3 + 0.7 * grain);
return (core * min(Bn, 1.0) + uRollFog * fog) * smoothstep(-0.05 - uRollSink, 0.02 - uRollSink, z);
}
float densAt(vec3 p) { float B, c, a, h; return densAt(p, false, B, c, a, h); }
float hg(float c, float g) { float g2 = g * g; return (1.0 - g2) / pow(max(1.0 + g2 - 2.0 * g * c, 1e-4), 1.5); }
void main() {
vec3 ro = cameraPosition, rd = normalize(vPos - ro), inv = 1.0 / rd;
vec3 ta = (vBmin - ro) * inv, tb = (vBmax - ro) * inv, t0 = min(ta, tb), t1 = max(ta, tb);
float tn = max(max(t0.x, t0.y), t0.z), tf = min(min(t1.x, t1.y), t1.z);
bool inside = all(greaterThan(ro, vBmin)) && all(lessThan(ro, vBmax));
if (inside == gl_FrontFacing) discard;
tn = max(tn, 0.0);
#ifdef ROLL_PASS
if (uRollDebug > 4.5) {
float ts = sceneT();
if (ts < tn || ts > tf) discard;
vec3 ps = ro + rd * ts; float dz = ps.y - texture2D(uRollS, (vec2(ps.x, -ps.z) - uRollO) / uRollE).x;
gl_FragColor = uRollDebug > 5.5 ? vec4(clamp(0.5 + dz / 0.4, 0.0, 1.0), 1.0, 0.0, 1.0) : vec4(clamp(-dz / 0.1, 0.0, 1.0), clamp(dz / 0.1, 0.0, 1.0), 0.0, 1.0); return;
}
{ float ts = sceneT(); vec3 ps = ro + rd * ts;
if (rd.y < 0.0 && abs(ps.y - texture2D(uRollS, (vec2(ps.x, -ps.z) - uRollO) / uRollE).x) < 0.25) ts += min(uRollSkin / max(-rd.y, 0.08), 0.6);
tf = min(tf, ts); }
#endif
if (tf <= tn) discard;
if (uRollDebug > 0.5 && uRollDebug < 1.5) { gl_FragColor = vec4(0.25, 0.0, 0.0, 0.25); return; }
float tBox = tn;
loadPuffs(ro, inv, tn, tf);
if (NP == 0 || tf <= tn) discard;
if (uRollDebug > 3.5) { gl_FragColor = vec4(0.05, 0.0, 0.0, 0.05) * float(NP); return; }
if (uRollDebug > 1.5 && uRollDebug < 2.5) {
float mB = 0.0, mC = 0.0, mA = 0.0;
for (int i = 0; i < 48; i++) { vec3 p = ro + rd * mix(tn, tf, (float(i) + 0.5) / 48.0); float B, c, a, h; densAt(p, true, B, c, a, h); mB = max(mB, B); mC = max(mC, c); if (B > 0.02) mA = max(mA, a / 4.0); }
gl_FragColor = vec4(vec3(clamp(mB, 0.0, 1.0), mC, mA) * 0.8, 0.8); return;
}
vec2 mid = uRollO + 0.5 * uRollE;
vec3 sun = normalize(uSunDir);
float sunK = 0.4 * uSunT * uSunOcc * (0.85 + 0.15 * hg(dot(rd, sun), 0.55));
float step0 = uRollStepK * ${ub($y.step)} * exp2(floor(log2(max(1.0, tBox / 12.0)))), j = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
float t = (ceil(tn / step0 - j) + j) * step0;
float Tr = 1.0, tauS = 0.0; vec3 C = vec3(0.0); int lightN = 0;
for (int i = 0; i < 128; i++) {
if (float(i) >= uRollSteps || t > tf || Tr < 0.02) break;
vec3 p = ro + rd * t;
float B, core, age, hz, d = densAt(p, uRollFine > 0.5, B, core, age, hz), dt = step0;
if (rd.y < 0.0 && p.y < texture2D(uRollS, (vec2(p.x, -p.z) - uRollO) / uRollE).x - 0.1 - uRollSink) break;
if (d <= 0.0) { t += step0; continue; }
d *= 1.0 - smoothstep(uRollReach.x, uRollReach.y, length(vec2(p.x, -p.z) - mid));
d *= smoothstep(0.4, 1.5, t);
if (uRollLight > 0.5 && lightN++ % int(uRollLight) == 0) tauS = ${ub($y.sigma)} * (0.25 * densAt(p + sun * 0.15) + 0.7 * densAt(p + sun * 0.7));
else if (uRollLight < 0.5) tauS = ${ub($y.sigma)} * 0.5 * (1.0 - smoothstep(-0.3, 1.0, hz)) * min(B, 1.0);
float Ts = 0.45 * exp(-tauS) + 0.33 * exp(-0.25 * tauS) + 0.22 * exp(-0.06 * tauS);
float amb = mix(0.8, 1.0, smoothstep(-0.3, 1.0, hz)) * (1.0 - 0.15 * smoothstep(0.5, 3.0, age));
vec3 col = vec3(0.95, 0.965, 0.98) * (0.58 * amb * vec3(0.93, 0.96, 1.0) + sunK * Ts * vec3(1.0, 0.98, 0.95));
float a = 1.0 - exp(-${ub($y.sigma)} * d * dt);
C += Tr * a * col; Tr *= 1.0 - a; t += dt;
}
if (Tr > 0.995) discard;
gl_FragColor = vec4(min(C, vec3(1.0)), 1.0 - Tr);
}`,_b=class{constructor(e,t,n,{vol:r=1,steps:a=$y.steps,debug:o=0,events:s=!1,pass:c=!0,scale:l=null,light:u=2,fine:d=1,stepK:f=1,fog:p=null,soft:m=null,bilat:h=!0,puff:g=null,sink:_=null,skin:v=null}={}){let y=$y,b=n.uniforms;this.renderer=e,this.extent=y.cell*y.cells,this.vol=r,this.rtS=new Kn(y.tex,y.tex,{type:sn,format:i,minFilter:_t,magFilter:_t,depthBuffer:!1,stencilBuffer:!1}),this.puffs=new Ry({events:s,P:{...ao,...g??{}}});let x=(e,t)=>{let n=new sr(new Float32Array(e*t*4),e,t,i,G);return n.minFilter=n.magFilter=yn,n.needsUpdate=!0,n};this.puffTex=x(160,Math.ceil(y.maxPuffs/32)),this.cellTex=x(y.cells*5,y.cells),this.cellN=new Int32Array(y.cells*y.cells),this.cellScore=new Float32Array(y.cells*y.cells*y.perCell);let S=Object.fromEntries(rs.map(e=>[e,b[e]]));this.uniforms={...S,uSunDir:b.uSunDir,uSunT:b.uSunT,uSunOcc:b.uSunOcc,uRollO:{value:new oi},uRollE:{value:this.extent},uRollTx:{value:this.extent/y.tex},uRollCell:{value:y.cell},uRollR:{value:y.reach[1]},uRollS:{value:this.rtS.texture},uPuffTex:{value:this.puffTex},uPuffCells:{value:this.cellTex},uRollReach:{value:new oi(...y.reach)},uRollSteps:{value:a},uRollNoise:{value:null},uRollFlow:{value:null},uRollDebug:{value:o},uSceneDepth:{value:null},uVolRes:{value:new oi(1,1)},uInvProj:{value:new Dr},uRevZ:{value:0},uRollLight:{value:u},uRollFine:{value:d},uRollStepK:{value:f},uRollFog:{value:p??$y.fog},uRollSoft:{value:m??$y.soft},uRollSink:{value:c?_??$y.sink:0},uRollSkin:{value:v??$y.skin}},this.steps=a,this.base={stepK:f,light:u},this.bilat=!!h,this.sprayOn=!0,this.surfMat=new Ui({vertexShader:ob,fragmentShader:lb,uniforms:this.uniforms,depthTest:!1,depthWrite:!1}),this.quad=new En(new Nr(2,2),this.surfMat),this.quad.frustumCulled=!1,this.qScene=new Yn,this.qScene.add(this.quad),this.qCam=new ee(-1,1,1,-1,0,1),this._makeNoise();let C=y.cells,w=(C-1)/2,T=[];for(let e=0;e<C;e++)for(let t=0;t<C;t++){let n=Math.hypot(t-w,e-w)*y.cell;n<=y.reach[1]+y.cell&&T.push([t,e,n])}T.sort((e,t)=>t[2]-e[2]);let E=new wn().copy(new $e(1,1,1));if(E.setAttribute(`aCell`,new Tr(new Float32Array(T.flatMap(([e,t])=>[e,t])),2)),E.instanceCount=T.length,this.boxes=T.length,this.mat=new Ui({vertexShader:hb,fragmentShader:gb,uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!c,side:2,defines:c?{ROLL_PASS:1}:{},blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205}),this.mesh=new En(E,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.wanted=!0,this.on=!0,this.pass=c?{deep:-1,scale:l??eb.start,target:l??eb.start,fixed:l!=null,hold:0,cap:null,rise:null,volScene:new Yn,postScene:new Yn,rt:null,depth:null,ok:null,T:0,F0:0,vsync:1e3/60,last:0,lastChange:0}:null,(c?this.pass.volScene:t).add(this.mesh),this.spray=new Qy(c?this.pass.postScene:t,this,n),c){this.compMat=new Ui({vertexShader:ob,fragmentShader:h?pb:fb,uniforms:{uVol:{value:null},uVolTexel:{value:new oi},uVolRes:{value:new oi},uSceneDepth:this.uniforms.uSceneDepth,uInvProj:this.uniforms.uInvProj,uRevZ:this.uniforms.uRevZ},depthTest:!1,depthWrite:!1,transparent:!0,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205});let e=new En(new Nr(2,2),this.compMat);e.frustumCulled=!1,this.pass.compScene=new Yn,this.pass.compScene.add(e)}this.mainScene=t}_deep(e){let t=eb.deep,n=this.pass,r=this.uniforms;e=Math.max(-1,Math.min(t.length-1,e)),n.deep=e;let[i,a,o,s]=e>=0?t[e]:[null,this.base.stepK,this.base.light,$y.reach[1]];i!=null&&(n.scale=n.target=i),r.uRollStepK.value=a,r.uRollLight.value=o,r.uRollReach.value.set(s*.73,s),r.uRollR.value=s}renderPass(e){let t=this.pass;if(!t||(this._govern(),!this.mesh.visible))return;let n=this.renderer,r=n.getContext(),a=n.getDrawingBufferSize(this._size??=new oi),o=a.x,s=a.y;if(!t.depth||t.depth.width!==o||t.depth.height!==s){t.depth?.dispose();let e=new Pn(o,s,Xt);e.format=ka,t.depth=new Kn(o,s,{depthBuffer:!0,stencilBuffer:!0,depthTexture:e}),n.initRenderTarget(t.depth),this.uniforms.uSceneDepth.value=e,this.uniforms.uRevZ.value=+!!n.capabilities.reversedDepthBuffer}let c=Math.max(1,Math.round(o*t.scale)),l=Math.max(1,Math.round(s*t.scale));t.rt?(t.rt.width!==o||t.rt.height!==s)&&t.rt.setSize(o,s):t.rt=new Kn(o,s,{type:sn,format:i,minFilter:_t,magFilter:_t,depthBuffer:!1,stencilBuffer:!1}),t.rt.viewport.set(0,0,c,l),t.rt.scissor.set(0,0,c,l),t.rt.scissorTest=!0;let u=n.properties.get(t.depth).__webglFramebuffer;if(r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,u),r.blitFramebuffer(0,0,o,s,0,0,o,s,r.DEPTH_BUFFER_BIT|r.STENCIL_BUFFER_BIT,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),t.ok==null){let e=r.getError();if(t.ok=e===r.NO_ERROR,!t.ok){console.warn(`foam volume: the depth copy failed (GL error ${e}); drawn in the main render instead`),this._unpass();return}}this.uniforms.uVolRes.value.set(c,l),this.uniforms.uInvProj.value.copy(e.projectionMatrixInverse);let d=n.getClearColor(this._cc??=new jt),f=n.getClearAlpha(),p=n.autoClear;n.setRenderTarget(t.rt),n.setClearColor(0,0),n.clear(!0,!1,!1),n.render(t.volScene,e),n.setRenderTarget(null),n.autoClear=!1,this.compMat.uniforms.uVol.value=t.rt.texture,this.compMat.uniforms.uVolTexel.value.set(1/o,1/s),this.compMat.uniforms.uVolRes.value.set(c,l),n.render(t.compScene,this.qCam),n.render(t.postScene,e),n.autoClear=p,n.setClearColor(d,f)}setBilat(e){this.bilat=!!e,this.compMat&&(this.compMat.fragmentShader=e?pb:fb,this.compMat.needsUpdate=!0)}setEvents(e){this.puffs=new Ry({events:e||!1,P:this.puffs.P})}rebirth(){this.puffs.clear()}setShare(e){let t=this.pass;t&&(this._deep(-1),t.hold=0,t.cap=null,t.rise=null,t.sum=0,t.n=0,e==null?(t.fixed=!1,t.target=Math.max(t.scale,eb.start)):(t.fixed=!0,t.scale=t.target=e))}_unpass(){let e=this.pass;this.pass=null,e.volScene.remove(this.mesh),this.mainScene.add(this.mesh),e.postScene.remove(this.spray.mesh),this.mainScene.add(this.spray.mesh),this.mat.depthTest=!0,this.mat.defines={},this.mat.needsUpdate=!0,this.uniforms.uRollSink.value=0}_govern(){let e=this.pass,t=eb,n=performance.now(),r=n-e.last;if(e.last=n,!(r>0&&r<250)){e.n=0,e.sum=0;return}if(e.vsync=Math.min(e.vsync*1.0001,Math.max(r,4)),!e.fixed&&e.deep<0&&e.scale!==e.target){let n=e.target-e.scale,i=1-Math.exp(-r/((n>0?t.riseTau:t.fallTau)*1e3)),a=n>0?Math.max(n*i,t.riseMin*r/1e3):n*i;e.scale=Math.abs(n)<.002||Math.abs(a)>=Math.abs(n)?e.target:e.scale+a}if(e.sum=(e.sum??0)+r,e.n=(e.n??0)+1,e.sum<t.win*1e3)return;let i=e.sum/e.n;e.sum=0,e.n=0,e.T=i;let a=!this.mesh.visible||(this.packed??0)<t.light;a&&(e.F0=e.F0?e.F0+.3*(i-e.F0):i);let o=e.F0||e.vsync,s=e.T0=o<16.7?Math.max(1.25*o,20):1.25*o;if(e.fixed||a)return;let c=i>1.05*s,l=i>Math.max(t.unusable,2*s),u=i<t.fast||e.vsync>15.5&&i<1.05*e.vsync;if(c){if(e.rise&&n-e.rise.at<t.riseCheck*1e3){let r=e.cap?.wait?Math.min(2*e.cap.wait,t.backoff[1]):t.backoff[0];e.cap={share:Math.max(t.second,Math.min(e.rise.from,t.first)),until:n+r*1e3,wait:r}}e.rise=null,l&&e.deep<0&&e.target>t.second+.001?(e.target=t.second,e.hold=n+t.secondHold*1e3):n<e.hold||(e.deep<0&&e.target>t.first+.001?(e.target=t.first,e.hold=n+t.firstHold*1e3):e.deep<0&&e.target>t.second+.001?(e.target=t.second,e.hold=n+t.secondHold*1e3):e.deep<t.deep.length-1&&(this._deep(e.deep+1),e.hold=n+t.settle*1e3))}else if(u){if(e.deep>=0)n>=e.hold&&(this._deep(e.deep-1),e.deep<0&&(e.scale=e.target=t.second),e.hold=n+t.settle*1e3);else{let t=e.cap&&n<e.cap.until?e.cap.share:1;e.target<t-.001&&(e.rise={from:e.target,at:n},e.target=t)}}}_makeNoise(){let e=this.renderer,t=e.getRenderTarget(),n=(t,n)=>{let r=new zn(t,t,t,{type:Ee,format:i,depthBuffer:!1,stencilBuffer:!1});Object.assign(r.texture,{wrapS:Gt,wrapT:Gt,wrapR:Gt,minFilter:_t,magFilter:_t,generateMipmaps:!1});let a=new Ui({vertexShader:ob,fragmentShader:n,uniforms:{uZ:{value:0}},depthTest:!1,depthWrite:!1});this.quad.material=a;for(let n=0;n<t;n++)a.uniforms.uZ.value=(n+.5)/t,e.setRenderTarget(r,n),e.render(this.qScene,this.qCam);return a.dispose(),r};this.noiseRT=n(rb,sb),this.flowRT=n(ib,cb),this.uniforms.uRollNoise.value=this.noiseRT.texture,this.uniforms.uRollFlow.value=this.flowRT.texture,e.setRenderTarget(t)}set visible(e){this.wanted=!!e,this.mesh.visible=this.wanted&&this.on,this.spray.visible=this.mesh.visible}get visible(){return this.wanted}_pack(e){let t=$y,n=this.puffs,r=this.puffTex.image.data,i=this.cellTex.image.data,a=t.cells,o=t.perCell,s=this.cellN,c=this.cellScore,l=this.vol;s.fill(0),i.fill(-1);let u=0;for(let d=0;d<n.nLive&&u<t.maxPuffs;d++){let f=n.live[d],p=f.b;if(f.rho<t.minRho[0])continue;let m=u++,h=(m/32|0)*32*5*4+m%32*5*4,g=p.v,_=f.Rz*l,v=f.zc*l,y=f.Ra*Math.sqrt(l),b=f.Rd*Math.sqrt(l);r[h]=f.e-e.x,r[h+1]=f.n-e.y,r[h+2]=v,r[h+3]=_,r[h+4]=p.dx,r[h+5]=p.dy,r[h+6]=y,r[h+7]=b;let x=g?.waist??0;r[h+8]=f.rho*mb(t.minRho[0],t.minRho[1],f.rho)/(1-.574*x),r[h+9]=f.age,r[h+10]=p.seedA,r[h+11]=p.seedB,r[h+12]=f.deposit/(1-.548*x),r[h+13]=g?.skewA??0,r[h+14]=g?.skewD??0,r[h+15]=g?.lean??0,r[h+16]=g?.waist??0,r[h+17]=g?.erode??1,r[h+18]=g?.noise??1,r[h+19]=0;let[S,C]=bo(y,b,g),w=Math.max(S,C)+t.margin,T=f.rho*_*Math.min(y,b),E=v+_,D=Math.max(0,Math.floor((f.e-e.x-w)/t.cell)),O=Math.min(a-1,Math.floor((f.e-e.x+w)/t.cell)),k=Math.max(0,Math.floor((f.n-e.y-w)/t.cell)),A=Math.min(a-1,Math.floor((f.n-e.y+w)/t.cell));for(let n=k;n<=A;n++)for(let r=D;r<=O;r++){let l=Math.max(r*t.cell-(f.e-e.x),0,f.e-e.x-(r+1)*t.cell),u=Math.max(n*t.cell-(f.n-e.y),0,f.n-e.y-(n+1)*t.cell);if(l*l+u*u>w*w)continue;let d=Math.sqrt((S*p.dy)**2+(C*p.dx)**2)+t.margin,h=Math.sqrt((S*p.dx)**2+(C*p.dy)**2)+t.margin,g=Math.max(0,f.e-e.x-d-r*t.cell),_=Math.min(t.cell,f.e-e.x+d-r*t.cell),v=Math.max(0,f.n-e.y-h-n*t.cell),y=Math.min(t.cell,f.n-e.y+h-n*t.cell);if(_<=g||y<=v)continue;let b=n*a+r,x=(n*a+r)*5*4,D=x+12,O=s[b];if(O>=o){let e=0;for(let t=1;t<o;t++)c[b*o+t]<c[b*o+e]&&(e=t);if(c[b*o+e]>=T)continue;O=e}else s[b]++;c[b*o+O]=T,i[x+O]=m,i[D+1]=s[b],i[D]=Math.max(i[D],E);let k=D+4;s[b]===1&&O===0?(i[k]=g,i[k+1]=v,i[k+2]=_,i[k+3]=y):(i[k]=Math.min(i[k],g),i[k+1]=Math.min(i[k+1],v),i[k+2]=Math.max(i[k+2],_),i[k+3]=Math.max(i[k+3],y))}}for(let e=0;e<a*a;e++)if(!s[e]){let t=(e*5+3)*4;i[t]=0,i[t+1]=0}this.puffTex.needsUpdate=!0,this.cellTex.needsUpdate=!0,this.packed=u}update(e,t=!0,n=null){if(this.on=t,this.mesh.visible=this.wanted&&t,this.spray.visible=this.mesh.visible,!this.mesh.visible){if(this.packed){this.cellTex.image.data.fill(-1),this.cellN.fill(0),this.packed=0;for(let e=0;e<$y.cells**2;e++)this.cellTex.image.data[(e*5+3)*4+1]=0;this.cellTex.needsUpdate=!0}return}let r=$y,i=r.cell,a=(r.cells-1)/2,o=this.uniforms.uRollO.value;if(o.set((Math.floor(e.position.x/i)-a)*i,(Math.floor(-e.position.z/i)-a)*i),n?.field){this.puffs.update(n.t,n.field,e.position.x,-e.position.z,n.drift??[0,0],n.wind??null),this._pack(o);let t=e.position,r=this._camP??={p:t.clone(),t:n.t,v:new J},i=n.t-r.t;i>1e-4&&i<.25?r.v.subVectors(t,r.p).divideScalar(i):i!==0&&r.v.set(0,0,0),r.p.copy(t),r.t=n.t,this.spray.update(this.puffs,o,n.pixAng??.001,n.spray!==!1&&this.sprayOn,r.v,e.position.x,-e.position.z)}let s=this.renderer,c=s.getRenderTarget();this.quad.material=this.surfMat,s.setRenderTarget(this.rtS),s.render(this.qScene,this.qCam),s.setRenderTarget(c)}dispose(){this.spray.dispose(),[this.rtS,this.noiseRT,this.flowRT].forEach(e=>e.dispose()),[this.puffTex,this.cellTex].forEach(e=>e.dispose()),this.mesh.geometry.dispose(),[this.mat,this.surfMat].forEach(e=>e.dispose()),this.mesh.removeFromParent()}},vb=`surfski.experimental`,yb=e=>typeof e==`boolean`?e?`on`:`off`:String(+Number(e).toFixed(3)),bb=[[`ride`,`Ride the crest at least (s)`,0,2,.05,!0],[`speed`,`Speed once it slows (share of crest speed)`,.3,1,.01,!1],[`faceTheta`,`Born ahead of the crest, middle of the spread (rad of phase)`,0,1.5,.05,!0],[`faceSpread`,`Spread of where it is born, either side (rad)`,0,.6,.01,!0],[`spillS`,`Spills forward from its rear over (s; 0 all at once)`,0,1.5,.05,!1],[`gateH`,`Born only where both seas together stand over (share of their height)`,-1,1,.05,!0],[`gateBack`,`Born at most this far behind their combined crest (rad)`,0,3.2,.05,!0],[`gateFront`,`Born at most this far ahead of their combined crest (rad)`,0,3.2,.05,!0]],xb=[[`center`,`Middle over the water (share of its height)`,-.8,.8,.05,!1],[`below`,`Share of its shape under the water (its top kept)`,0,.8,.05,!1],[`along`,`Length along the crest (share of 2.5 m)`,.2,1.5,.05,!1],[`grow`,`Balloons by`,0,2,.05,!1],[`rise`,`Rises as it forms by`,0,.8,.01,!1],[`tauH`,`Slumps over (s)`,.2,5,.1,!1],[`fadeIn`,`Forms over (s)`,.01,.6,.01,!1],[`life`,`Longest life (s)`,.5,6,.1,!1],[`deposit`,`Surface foam it leaves`,0,2,.05,!1],[`rate`,`Births (times the spill chance)`,0,3,.05,!0]],Sb=[[`uRollSink`,`Full foam down to under its surface (m)`,0,.5,.01,$y.sink],[`uRollFog`,`Fog over the body`,0,.3,.01,$y.fog],[`uRollSoft`,`Edge softness`,.02,.8,.01,$y.soft],[`uRollFine`,`Billows (0 off, 1 on)`,0,1,1,1]],Cb={off:0,"boxes drawn":1,"density along each ray":2,"drops as 8 cm squares":3,"objects each pixel loads":4,"drawn water against the foam's surface (red under, green over)":5};function wb(e,{roller:t,makeRoller:n,toast:r=()=>{},light:i=null,water:a=null}){let o=e.addFolder(`Experimental`);o.close(),o.add({get profile(){try{return localStorage.getItem(`surfski.device`)??`auto`}catch{return`auto`}},set profile(e){try{e===`auto`?localStorage.removeItem(Qh):localStorage.setItem(Qh,e)}catch{}let t=new URL(location.href);t.searchParams.delete(`mobile`),location.replace(t.href)}},`profile`,[`auto`,`desktop`,`tablet`,`phone`]).name(`Device profile (reloads) · auto: ${globalThis.__tier?.tier??`?`}`);let s=o.addFolder(`Breaking waves`);s.close();let c=[];if(i){let e=o.addFolder(`Light on the boats and paddlers`);e.close();let t=i.live,n=i.defaults;for(let[r,a,o,s]of[[`sun`,`Sun on them (x the lamp)`,0,4],[`hemi`,`Sky light on them (x the lamp)`,0,2],[`env`,`Sky reflection`,0,2]])e.add(t,r,o,s,.05).name(`${a} · ${yb(n[r])}`).onChange(()=>i.apply()).listen(),c.push([`boatlight.${r}`,{get:()=>t[r],set:e=>{t[r]=e,i.apply()},def:n[r]}]);let r={sun:1,hemi:1,env:.95};e.add({go:()=>{Object.assign(t,r),i.apply(),e.controllersRecursive().forEach(e=>e.updateDisplay()),F()}},`go`).name(`As before 2026-11-20 (1, 1, 0.95)`);let a=()=>{Object.assign(t,n),i.apply(),e.controllersRecursive().forEach(e=>e.updateDisplay())};e.add({reset:()=>{a(),F()}},`reset`).name(`Reset to the defaults`)}let l=[];if(a?.uniforms?.uFaceRes){let e=o.addFolder(`Water`);e.close();let t={get faceRes(){return a.uniforms.uFaceRes.value},set faceRes(e){a.uniforms.uFaceRes.value=e}};e.add(t,`faceRes`,0,10,.05).name(`Face darkening · ${yb(Zo)}`).listen(),l.push([`water.faceRes`,{get:()=>t.faceRes,set:e=>{t.faceRes=e},def:Zo}]),a.uniforms.uSteepShade&&(Object.defineProperty(t,"steepShade",{get:()=>a.uniforms.uSteepShade.value,set:e=>{a.uniforms.uSteepShade.value=e},enumerable:!0}),e.add(t,`steepShade`,0,2,.05).name(`Steep faces darker · 0`).listen(),l.push([`water.steepShade`,{get:()=>t.steepShade,set:e=>{t.steepShade=e},def:0}])),e.add({reset:()=>{t.faceRes=Zo,`steepShade`in t&&(t.steepShade=0),e.controllersRecursive().forEach(e=>e.updateDisplay()),F()}},`reset`).name(`Reset to the defaults`)}let u=()=>t(),d=()=>u()?.puffs?.P,f=[],p=new Map,m=()=>s.controllersRecursive().forEach(e=>e.updateDisplay()),h=()=>u()?!0:(r(`Turn the foam objects on first (Experimental > Breaking waves, at the top)`),!1),g=u()?.puffs?.events||1,_={get objects(){return!!u()?.visible},set objects(e){let t=u()??(e?n(g):null);t&&(t.visible=e),m()},get mode(){return u()?.puffs?.events??g},set mode(e){g=e,u()?.setEvents(e),m()}};for(let[e,t]of c)p.set(e,t);for(let[e,t]of l)p.set(e,t);p.set(`objects`,{get:()=>_.objects,set:e=>{_.objects=e},def:!1}),p.set(`events`,{get:()=>_.mode,set:e=>{_.mode=e},def:1}),s.add(_,`objects`).name(`Foam objects on breaking crests · off`),s.add(_,`mode`,{"version 1 (no energy)":0,"grow with the water they take":1,"lengthen back to the crest":2}).name(`Foam events · grow`);let v=(e,t)=>{if(!h())return;let n=u().puffs.P;n.groupsOff={...n.groupsOff??{},[e]:!t},u().rebirth()},y={get swell(){return!u()?.puffs?.P.groupsOff?.swell},set swell(e){v(`swell`,e)},get wind(){return!u()?.puffs?.P.groupsOff?.wind},set wind(e){v(`wind`,e)}};p.set(`groups.swell`,{get:()=>y.swell,set:e=>{y.swell=e},def:!0}),p.set(`groups.wind`,{get:()=>y.wind,set:e=>{y.wind=e},def:!0}),s.add(y,`swell`).name(`Foam objects on the swell's crests · on`),s.add(y,`wind`).name(`Foam objects on the wind sea's crests · on`);let b=(e,t)=>{let n=s.addFolder(e);n.close();let r={};for(let[e,,,,,n]of t)Object.defineProperty(r,e,{get:()=>d()?.[e]??ao[e],set:t=>{h()&&(d()[e]=t)},enumerable:!0}),p.set(`puff.${e}`,{get:()=>r[e],set:t=>{r[e]=t},def:ao[e],birth:n});for(let[e,i,a,o,s,c]of t){let t=n.add(r,e,a,o,s).name(`${i} · ${yb(ao[e])}`);c&&t.onFinishChange(()=>u()?.rebirth())}let i=()=>{let e=d();if(e){for(let[n]of t)e[n]=ao[n];t.some(e=>e[5])&&u().rebirth(),m()}};n.add({reset:i},`reset`).name(`Reset to the defaults`),f.push(i)};b(`Objects: motion and birth`,bb),b(`Objects: shape and life`,xb);let x=s.addFolder(`Volume: drawing`);x.close();let S={};for(let[e,,,,,t]of Sb)Object.defineProperty(S,e,{get:()=>u()?.uniforms[e]?.value??t,set:t=>{h()&&(u().uniforms[e].value=t)},enumerable:!0}),p.set(`draw.${e}`,{get:()=>S[e],set:t=>{S[e]=t},def:t});for(let[e,t,n,r,i,a]of Sb)x.add(S,e,n,r,i).name(`${t} · ${yb(a)}`);let C={get debug(){return u()?.uniforms.uRollDebug.value??0},set debug(e){h()&&(u().uniforms.uRollDebug.value=e)},get bilat(){return u()?.bilat??!0},set bilat(e){h()&&u().setBilat(e)},get spray(){return u()?.sprayOn??!0},set spray(e){h()&&(u().sprayOn=e)}};for(let[e,t]of[[`debug`,0],[`spray`,!0]])p.set(`draw.${e}`,{get:()=>C[e],set:t=>{C[e]=t},def:t});x.add(C,`debug`,Cb).name(`Debug view · off`),x.add(C,`spray`).name(`Spray drops · on`);let w=()=>{let e=u();if(e){for(let[t,,,,,n]of Sb)e.uniforms[t].value=n;e.uniforms.uRollDebug.value=0,e.setBilat(!0),e.sprayOn=!0,e.pass&&!e.pass.fixed&&e.setShare(null),m()}};x.add({reset:w},`reset`).name(`Reset to the defaults`),f.push(w);let T=s.addFolder(`Spray drops`);T.close();let E=[[`uNear`,`Drawn fully out to (m)`,0,100,1,Yy.near],[`uFar`,`Faded out by (m)`,1,150,1,Yy.far],[`uGain`,`Brightness (times)`,.1,6,.05,Yy.gain],[`uShutter`,`Streak: the motion of (s)`,0,.05,.001,Yy.shutter]],D={};for(let[e,,,,,t]of E)Object.defineProperty(D,e,{get:()=>u()?.spray.uniforms[e]?.value??t,set:t=>{h()&&(u().spray.uniforms[e].value=t)},enumerable:!0}),p.set(`spray.${e}`,{get:()=>D[e],set:t=>{D[e]=t},def:t});for(let[e,t,n,r,i,a]of E)T.add(D,e,n,r,i).name(`${t} · ${yb(a)}`);let O=()=>{let e=u();if(e){for(let[t,,,,,n]of E)e.spray.uniforms[t].value=n;m()}};T.add({reset:O},`reset`).name(`Reset to the defaults`),f.push(O);let k=s.addFolder(`Volume: resolution`);k.close();let A={get auto(){return!u()?.pass?.fixed},set auto(e){h()&&u().pass&&(u().setShare(e?null:u().pass.scale),m())},get share(){return u()?.pass?.scale??1},set share(e){h()&&u().pass&&(u().setShare(e),m())},get status(){let e=u()?.pass;if(!e)return`no volume pass`;let t=e.cap&&performance.now()<e.cap.until?` · ceiling ${Math.round(e.cap.share*100)} %`:``;return`${e.fixed?`held`:e.deep>=0?`deep rung ${e.deep}`:`going to ${Math.round(e.target*100)} %`} · now ${Math.round(e.scale*100)} %${t} · frame ${(e.T||0).toFixed(1)} ms of ${(e.T0||0).toFixed(1)}`}};p.set(`res.share`,{get:()=>u()?.pass?.fixed?u().pass.scale:null,set:e=>{u()?.pass&&u().setShare(e)},def:null}),k.add(A,`auto`).name(`Let the frame rate choose (governor) · on`),k.add(A,`share`,.1,1,.01).name(`Resolution share (holds it) · governor`),k.add(A,`status`).name(`Now`).disable().listen();let ee=()=>{u()?.setShare(null),m()};k.add({reset:ee},`reset`).name(`Reset (governor on)`),f.push(ee),s.add({reset:()=>f.forEach(e=>e())},`reset`).name(`Reset all breaking-wave settings`);let j=(e,t)=>typeof e==`number`&&typeof t==`number`?Math.abs(e-t)<1e-9:e===t,M=()=>{let e={};for(let[t,n]of p){if(t!==`objects`&&!t.startsWith(`boatlight.`)&&!t.startsWith(`water.`)&&!u())continue;let r=n.get();j(r,n.def)||(e[t]=r)}return e},N=e=>{if(!e||typeof e!=`object`)return;e.objects!=null&&p.get(`objects`).set(!!e.objects),e.events!=null&&p.get(`events`).set(Number(e.events));let t=!1;for(let[n,r]of Object.entries(e)){let e=p.get(n);e&&n!==`objects`&&n!==`events`&&(typeof e.def!=`number`||typeof r==`number`&&Number.isFinite(r))&&(e.set(r),t||=!!e.birth)}t&&u()?.rebirth(),m()},P=typeof localStorage<`u`?localStorage:null,F=()=>{try{let e=M();Object.keys(e).length?P?.setItem(vb,JSON.stringify(e)):P?.removeItem(vb)}catch{}};o.onChange(F);let I=null;try{I=JSON.parse(P?.getItem(`surfski.experimental`)??`null`)}catch{I=null}if(I&&typeof I==`object`){N(I);let e=Object.keys(I).length;e&&setTimeout(()=>r(`Experimental settings kept from last time: ${e} changed (Settings > Experimental to reset)`,3500),1500)}return{folder:o,snapshot:M,apply:e=>{N(e),F()}}}var Tb=180/Math.PI,Eb=e=>(e%360+360)%360,Db=(e,t)=>((t-e)%360+540)%360-180,Ob=(e,t)=>Eb(Math.atan2(t.e-e.e,t.n-e.n)*Tb);function kb(e,t=.5,n=10){return Math.sign(e)*(Math.asinh(Math.min(Math.abs(e),n)/t)/Math.asinh(n/t))}function Ab(e,t){let n=1/0,r=-1/0;for(let t of e)t<n&&(n=t),t>r&&(r=t);let i=r-n,a=e[t];return{pos:i>1e-4?(a-n)/i:.5,H:i,above:a-n}}var jb={headingDeg:.75,cogDeg:1.5,pitchDeg:1,rollDeg:1,sog:1.5,stw:1.5,vsWave:1.5,waveCrestMs:3,waveSetMs:3,waveCAlong:3,waterW:1,waterSoonW:1,pushW:1,pushSoonW:1,extW:1,extSoonW:1,power:.5,paddlerW:.5,thrust:1,push:1,drag:1,net:1,_0x6b0489:1.5,_0x829557:.5,_0x24e639:.5,reserve:2,hr:1},Mb={pos:1,H:4,above:1,slopeDeg:1},Nb=class{constructor(){this.v={},this.t=null,this.o={},this.wave={},this.prof=null}update(e,t=.4){let n=this.t==null?-1:e.t-this.t,r=!(n>=0&&n<.5)||!(t>0);this.t=e.t;let i=this.v,a=(e,a,o,s=!1)=>{if(a==null||!Number.isFinite(a))return delete i[e],a;let c=i[e];if(r||c==null)return i[e]=a;let l=1-Math.exp(-n/(t*o));return i[e]=s?Eb(c+Db(c,a)*l):c+(a-c)*l},o=Object.assign(this.o,e);for(let t in jb)o[t]=a(t,e[t],jb[t],t.endsWith(`Deg`)&&t!==`pitchDeg`&&t!==`rollDeg`);if(o.driftDeg=e.driftDeg==null?null:Db(o.headingDeg,o.cogDeg),e.wave){let i=Object.assign(this.wave,e.wave);for(let t in Mb)i[t]=a(`wave.${t}`,e.wave[t],Mb[t]);let s=e.wave.profile;if(s){if(r||!this.prof||this.prof.length!==s.length)this.prof=Float64Array.from(s);else{let e=1-Math.exp(-n/t);for(let t=0;t<s.length;t++)this.prof[t]+=(s[t]-this.prof[t])*e}i.profile=this.prof}o.wave=i}o.yaw=e.yaw?Object.fromEntries(Object.entries(e.yaw).map(([e,t])=>[e,a(`yaw.${e}`,t,1.5)])):null;let s=e=>Db(o.headingDeg,e);return o.nav=e.nav?{...e.nav,rel:s(e.nav.bearing),after:e.nav.after?{...e.nav.after,rel:s(e.nav.after.bearing)}:null}:null,o}},Pb=17,Fb=.1,Ib=.7,Lb=class{constructor(){this.tel=null,this.waveT=-1e9,this.wave={pos:.5,H:0,above:0},this.hs=new Float64Array(Pb),this.o={}}update({fp:e,s:t,field:n,t:r,nav:i=null,prof:a=null,elapsed:o=null,light:s=!1}){let c=e?.ski,l=!!e&&Math.abs((e.t??0)-r)<.05,u=n?.dominant,d=Math.sin(t.psi),f=Math.cos(t.psi),p=f,m=-d,h=this.tel??={};h.t=r,h.live=l,h.headingDeg=t.headingDeg,h.pitchDeg=t.pitch*Tb,h.rollDeg=t.roll*Tb,h.u=t.u,h.power=t.power??0,h.reserve=a?.wPrime?Math.min(Math.max(t.wPrime/a.wPrime,0),1):null;let g=l?c.latV??0:0,_=d*t.u+p*g,v=f*t.u+m*g;h.sog=Math.hypot(_,v),h.cogDeg=h.sog>.2?Eb(Math.atan2(_,v)*Tb):h.headingDeg,h.driftDeg=l?Db(h.headingDeg,h.cogDeg):null,h.stw=l?c._0xf33390?.vrel??null:null;let y=u&&u.k>0?u.omega/u.k:0,b=u?u.dx*d+u.dy*f:0;if(h.waveC=y,h.waveCAlong=y*b,h.vsWave=t.u-y*b,h.waveCrestMs=u&&u.k>0?u.omega/u.k:null,h.waveSetMs=u&&u.k>0?u.omega/u.k-.5*Math.sqrt(9.81/u.k):null,h.wavesFromDeg=u?Eb(Math.atan2(u.dx,u.dy)*Tb+180):null,h.windFromDeg=l&&c.wind&&(c.wind[0]||c.wind[1])?Eb(Math.atan2(c.wind[0],c.wind[1])*Tb+180):null,h.windMs=l&&c.wind?Math.hypot(c.wind[0],c.wind[1]):null,!s&&n&&u&&u.k>0&&(r-this.waveT>Fb||r<this.waveT)){this.waveT=r;let e=2*Math.PI/u.k;for(let i=0;i<Pb;i++){let a=(i-8)/16*e;this.hs[i]=n.sample(t.e+u.dx*a,t.n+u.dy*a,r,this.o).h}this.wave=Ab(this.hs,8),this.wave.L=e;let i=n.sample(t.e,t.n,r,this.o),a=i.sx*u.dx+i.sn*u.dy;if(this.wave.slopeDeg=Math.atan(a)*Tb,this.wave.face=a<-.01?`front`:a>.01?`back`:`flat`,this.wave.profile=Array.from(this.hs),l&&c.p){let e=c.p,i=e._0x621947??2.2,a=t.u*Ib,o=u.omega/u.k*Ib,s=t.e+d*a-u.dx*o,l=t.n+f*a-u.dy*o,p=(n.sample(s+d*i,l+f*i,r,this.o).h-n.sample(s-d*i,l-f*i,r,this.o).h)/(2*i),m=Math.min(Math.max((t.u-y*b)/(t.u+y||1),0),1),h=e.mass*(e._0x283f96??1);this.soonW=-h*9.81*e._0x6f9fed*(1-(e._0x692a92??0)*m)*p*t.u}else this.soonW=null}h.wave=this.wave;let x=n?.state?.stats?.hs??n?.stats?.hs;h.seaH90=x>0?x*Math.sqrt(Math.LN10/2):null;let S=!l&&e?.states?.length?e.states[Math.min(e.states.length-1,Math.max(0,Math.round(r/(e.h*2))))]:null,C=l?c:S;h.thrust=C?.thrust??null,h.push=C?.slopeForce??null;let w=l?c._0xf33390:null;h.drag=w?w.resist+w.waveRes+w.pearl+w._0x044eb6+w._0x1adeea:null,h._0xf33390=w?{hull:w.resist,waves:w.waveRes,deck:w.pearl,motion:w._0x044eb6,side:w._0x1adeea}:null,h._0x6b0489=l?c._0x6b0489??0:null,h.pushW=h.push==null?null:h.push*t.u,h.pushSoonW=this.soonW??null,h.waterW=l&&c._0x2afee8!=null?c._0x2afee8*t.u:null,h.waterSoonW=h.waterW!=null&&this.soonW!=null&&h.pushW!=null?this.soonW+(h.waterW-h.pushW):null,h._0xbd9c94=a?._0xbd9c94??null,h.windW=l?(c._0x6b0489??0)*t.u:null,h.extW=h.waterW==null?null:h.waterW+h.windW,h.extSoonW=h.waterSoonW==null?null:h.waterSoonW+h.windW,h.braceW=w?.brace==null?0:w.brace*Math.max(t.u,0),h.paddlerW=(t.power??0)-h.braceW,h.levelsW=a?dh.slice(1).map(e=>e*a._0xbd9c94):null,h.braceStepsW=l&&c.p?._0xec5b2e?mh.slice(2).map(e=>-c.p._0xec5b2e*e*t.u*Math.abs(t.u)*Math.max(t.u,0)):null,h.bands=a?{_0xbd9c94:a._0xbd9c94,cpW:a.cpW,maxW:a.maxW,sprintW:a.bands?.[2]??a.maxW}:null,h.hr=l?c.hr??null:t.hr??null,h.elapsed=o,h.thrustW=h.thrust==null?null:h.thrust*t.u,h.dragW=h.drag!=null&&h.stw!=null?h.drag*Math.max(h.stw,0):null,h.net=h.drag==null?null:h.thrust+h.push+h._0x6b0489-h.drag,h.steer=l?e.steerIn??0:null;let T=l?c.yawParts:null;if(h.yaw=T?{rudder:T.rudder*Tb,broach:T.broach*Tb,wind:T.wind*Tb,brace:T.brace*Tb,ends:T.ends*Tb}:null,h._0x829557=l?c._0x829557??null:null,h._0x24e639=l?c._0x24e639??null:null,h._0xdc9ffa=l?c._0xdc9ffa??null:null,h._0xc38049=l?c._0xc38049??null:null,h._0x14eb46=l?c._0x14eb46??null:null,i?.goal){let e={e:t.e,n:t.n},n=Ob(e,i.goal),r=Math.hypot(i.goal.e-t.e,i.goal.n-t.n);h.nav={name:i.name??``,bearing:n,rel:Db(h.headingDeg,n),dist:r,remainingM:i.remainingM??r,doneM:i.doneM??(l?c.distance??null:null),after:i.after?{bearing:Ob(e,i.after),rel:Db(h.headingDeg,Ob(e,i.after)),dist:Math.hypot(i.after.e-t.e,i.after.n-t.n)}:null}}else h.nav=null;return h}},Rb=`surfski.instruments`,zb=.4,Bb=2.23694,Vb=.3048,Z={panel:`rgba(5, 20, 40, .66)`,text:`#e8f2ff`,dim:`rgba(232, 242, 255, .55)`,faint:`rgba(232, 242, 255, .25)`,mark:`#ffd23f`,push:`#4cd18a`,climb:`#ff7a45`,water:`#4aa3ff`,wind:`#7fe3ff`,sky:`#3f7fc4`,sea:`#0c3a52`,stall:`#ff3b30`,off:`rgba(255,255,255,.18)`,track:`rgba(255,255,255,.14)`,brace:`#9b6bff`,heart:`#ff4d6d`},Hb=(e,t,n)=>Math.min(n,Math.max(t,e)),Ub={Off:{},Default:{left:[`adi`,`elev`],right:[[`speed`,`hr`]]},Engineering:{above:[`strip`,`forces`],left:[`rudder`,`adi`,`elev`],right:[`speedFull`,`hr`]}},Wb=[`Wave profile`,`Bars`,`Power stack`,`All (compare)`],Gb={hr:24};function Kb(e,t){let n=document.createElement(`canvas`),r=Math.min(window.devicePixelRatio||1,2);n.width=Math.round(e*r),n.height=Math.round(t*r),n.style.width=`${e}px`,n.style.height=`${t}px`,n.style.display=`block`;let i=n.getContext(`2d`);return i.scale(r,r),{cv:n,ctx:i,w:e,h:t}}function qb(e,t,n,r=6){e.clearRect(0,0,t,n),e.fillStyle=Z.panel,e.beginPath(),e.roundRect(0,0,t,n,r),e.fill()}function Jb(e,t,n,r,{size:i=10,color:a=Z.text,align:o=`left`,weight:s=600,base:c=`alphabetic`}={}){e.font=`${s} ${i}px system-ui, -apple-system, Segoe UI, sans-serif`,e.fillStyle=a,e.textBaseline=c;let l=Yb(e,t);if(!/[0-9]/.test(t))return e.textAlign=o,e.fillText(t,n,r),l;e.textAlign=`left`;let u=e.measureText(`0`).width,d=o===`right`?n-l:o===`center`?n-l/2:n;for(let n of t){let t=n>=`0`&&n<=`9`?u:e.measureText(n).width;e.fillText(n,n>=`0`&&n<=`9`?d+(u-e.measureText(n).width)/2:d,r),d+=t}return l}function Yb(e,t){let n=e.measureText(`0`).width,r=0;for(let i of t)r+=i>=`0`&&i<=`9`?n:e.measureText(i).width;return r}function Xb(e,t,n,r,i,a,o=!0){e.beginPath(),e.arc(t,n,4.5,0,2*Math.PI),o?(e.fillStyle=r?i:Z.off,e.fill(),r&&(e.shadowColor=i,e.shadowBlur=8,e.fill(),e.shadowBlur=0)):(e.strokeStyle=Z.faint,e.lineWidth=1,e.stroke()),a&&Jb(e,a,t+7,n+3.5,{size:9,color:o?r?Z.text:Z.dim:Z.faint})}var Zb=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} km`:`${Math.round(e/10)*10} m`,Qb=(e,t=0)=>`${e>=0?`+`:`−`}${Math.abs(e).toFixed(t)}`;function $b(e,t,n,r,i,a=1){e.globalAlpha=a,e.fillStyle=i,e.beginPath(),e.moveTo(t,n),e.lineTo(t-r,n-r),e.lineTo(t-r*.45,n-r),e.lineTo(t,n-r*.55),e.lineTo(t+r*.45,n-r),e.lineTo(t+r,n-r),e.closePath(),e.fill(),e.globalAlpha=1}var ex=e=>{let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=String(t%60).padStart(2,`0`);return n?`${n}:${String(r).padStart(2,`0`)}:${i}`:`${r}:${i}`};function tx(e,t,n,r,i){e.fillStyle=i,e.beginPath(),e.moveTo(t,n+r*.8),e.bezierCurveTo(t-r*1.3,n-r*.05,t-r*.6,n-r,t,n-r*.35),e.bezierCurveTo(t+r*.6,n-r,t+r*1.3,n-r*.05,t,n+r*.8),e.fill()}var nx=150,rx=(e,t)=>t/2+Hb(e,-72,nx/2-3)*(t/nx),ix=class{constructor(e,{marks:t=!0}={}){Object.assign(this,Kb(e,t?36:27)),this.marks=t}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2,a=n/nx,o=e.headingDeg;qb(t,n,r),t.save(),t.beginPath(),t.roundRect(0,0,n,r,6),t.clip();for(let e=Math.ceil((o-nx/2)/5)*5;e<=o+nx/2;e+=5){let n=i+(e-o)*a,r=(e%360+360)%360,s=r%10==0;if(t.fillStyle=s?Z.dim:Z.faint,t.fillRect(n-.5,s?11:14,1,s?8:5),r%30==0){let e={0:`N`,90:`E`,180:`S`,270:`W`}[r]??String(r);Jb(t,e,n,9,{size:e.length===1?10:9,align:`center`,color:e.length===1?Z.text:Z.dim})}}let s=e=>((e-o)%360+540)%360-180,c=e=>Math.abs(e)>nx/2-3,l=e.windFromDeg==null?null:s(e.windFromDeg+180),u=e.wavesFromDeg==null?null:s(e.wavesFromDeg+180),d=l==null?null:rx(l,n),f=u==null?null:rx(u,n);if(d!=null&&f!=null&&Math.abs(d-f)<14){let e=(d+f)/2,t=d>=f?1:-1;d=e+t*7,f=e-t*7}f!=null&&(t.globalAlpha=c(u)?.4:1,t.strokeStyle=Z.water,t.lineWidth=1.6,t.beginPath(),t.moveTo(f-5,23),t.quadraticCurveTo(f-2.5,19,f,23),t.quadraticCurveTo(f+2.5,27,f+5,23),t.stroke(),t.globalAlpha=1),d!=null&&(t.globalAlpha=c(l)?.45:1,Jb(t,`💨`,d,23,{size:11,align:`center`,base:`middle`}),t.globalAlpha=1);let p=this.marks?e.nav:null;if(p?.after&&!c(p.after.rel)&&$b(t,rx(p.after.rel,n),r-3,6,Z.mark,.45),p){let e=rx(p.rel,n);if(c(p.rel)){t.fillStyle=Z.mark,t.beginPath();let n=Math.sign(p.rel);t.moveTo(e+n*6,r-8),t.lineTo(e-n*2,r-13),t.lineTo(e-n*2,r-3),t.fill(),Jb(t,`${Math.round(Math.abs(p.rel))}° · ${Zb(p.dist)}`,e-n*6,r-4,{size:10,align:n>0?`right`:`left`,color:Z.mark})}else $b(t,e,r-1,7,Z.mark),Jb(t,Zb(p.dist),e+(p.rel>30?-10:10),r-3,{size:10,align:p.rel>30?`right`:`left`,color:Z.mark})}t.restore(),t.fillStyle=Z.text,t.beginPath(),t.moveTo(i,19),t.lineTo(i-4,25),t.lineTo(i+4,25),t.fill(),t.fillStyle=`rgba(5, 20, 40, .92)`,t.fillRect(i-17,0,34,11),Jb(t,`${String(Math.round(o)%360).padStart(3,`0`)}°`,i,9.5,{size:10,align:`center`})}},ax=class{constructor(e){Object.assign(this,Kb(e,15))}draw(e){let{ctx:t,w:n,h:r}=this,i=e.nav,a=10.5,o=nx/2-3;t.clearRect(0,0,n,r);let s=i?.doneM==null?``:`${Zb(i.doneM)} done`,c=i?.remainingM==null?``:`${Zb(i.remainingM)} to go`,l=Z.dim,u=Z.dim;t.font=`600 10px system-ui, -apple-system, Segoe UI, sans-serif`;let d=e.elapsed==null?0:Yb(t,e.elapsed>=3600?`0:00:00`:`00:00`)+8;if(i&&Math.abs(i.rel)>o){let e=Math.sign(i.rel),r=`${Math.round(Math.abs(i.rel))}° · ${Zb(i.dist)}`,a=e>0?n-1-d:1;t.fillStyle=Z.mark,t.beginPath(),t.moveTo(a,6.5),t.lineTo(a-e*7,1.5),t.lineTo(a-e*7,11.5),t.fill(),e>0?(c=r,u=Z.mark):(s=r,l=Z.mark)}if(Jb(t,s,i&&i.rel<-72?10:2,a,{size:10,color:l}),e.elapsed!=null&&Jb(t,ex(e.elapsed),n-2,a,{size:10,align:`right`,color:Z.dim}),Jb(t,c,(i&&i.rel>o?n-10:n-2)-d,a,{size:10,align:`right`,color:u}),i?.after&&Math.abs(i.after.rel)<=o&&$b(t,rx(i.after.rel,n),r,6,Z.mark,.45),i&&Math.abs(i.rel)<=o){let e=rx(i.rel,n),o=e>n*.62?-1:1;$b(t,e,r,8,Z.mark),Jb(t,Zb(i.dist),e+o*11,a,{size:10,align:o>0?`left`:`right`,color:Z.mark,weight:700})}}},ox=class{constructor(e){Object.assign(this,Kb(e,27)),this.tw=48}draw(e,t){let{ctx:n,w:r,h:i}=this,a=.5,o=r-this.tw-6-a,s=e.bands?.maxW??t?.maxW??450,c=e=>a+Hb(.25+e/s*.75,0,1)*o,l=c(0);n.clearRect(0,0,r,i);let u=(e,t,r,i)=>{if(n.save(),n.beginPath(),n.roundRect(a,e,o,7,7/2),n.clip(),n.fillStyle=Z.track,n.fillRect(a,e,o,7),n.fillStyle=t,n.fillRect(a,e,l-a,7),r!=null){let t=c(r);n.fillStyle=i,n.fillRect(Math.min(t,l),e,Math.abs(t-l),7)}n.restore()},d=e.extW,f=e.paddlerW??e.power??0,p=e.bands;u(2,`rgba(255,122,69,.10)`,d,(d??0)>=0?Z.push:Z.climb);let m=p&&e.levelsW?[0,...e.levelsW.map(e=>e/p._0xbd9c94)]:null,h=e.braceStepsW?.[1];u(13,`rgba(150, 90, 255, .16)`,f,f<0?Rd(h?1+2*Math.min(1,f/h):2):m?Ld(zd(f,p._0xbd9c94,m)):Z.push),n.fillStyle=`rgba(255,255,255,.5)`,(e.levelsW??[]).forEach((e,t)=>{if(e>s)return;let r=c(e),i=t===3;n.globalAlpha=i?.95:.5,n.fillRect(r-(i?1:.5),11,i?2:1,11)});for(let t of e.braceStepsW??[]){let e=c(t);e>2.5&&(n.globalAlpha=.5,n.fillRect(e-.5,11,1,11))}if(n.globalAlpha=1,e.extSoonW!=null){let t=Hb(c(e.extSoonW),3.5,a+o-3);n.strokeStyle=e.extSoonW>=0?Z.push:Z.climb,n.lineWidth=1.5,n.strokeRect(t-3,1.25,6,8.5)}if(n.fillStyle=`rgba(255,255,255,.8)`,n.fillRect(l-1,0,2,22),e.reserve!=null){let t=Hb(e.reserve,0,1);n.fillStyle=Z.track,n.fillRect(a,24,o,2),n.fillStyle=t>.5?`#4cd18a`:t>.2?`#ffc247`:`#ff6a3d`,n.fillRect(a,24,t*o,2)}let g=r-1,_={size:11,align:`right`,weight:700};Jb(n,d==null?`n/a`:`${Qb(Math.round(d))} W`,g,9.5,{..._,color:d==null?Z.dim:Math.abs(d)<5?Z.text:d>0?Z.push:Z.climb}),Jb(n,`${f<0?`−`:``}${Math.abs(Math.round(f))} W`,g,20.5,{..._,color:f<0?`#c4a8ff`:Z.text})}},sx=class{constructor(e){Object.assign(this,Kb(e,e))}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2,a=r/2,o=r/2-3;qb(t,n,r,8),t.save(),t.beginPath(),t.arc(i,a,o,0,2*Math.PI),t.clip(),t.translate(i,a),t.rotate(-(e.rollDeg*Math.PI)/180);let s=e=>kb(e)*(o-4),c=s(e.pitchDeg);t.fillStyle=Z.sky,t.fillRect(-o*2,-o*2,o*4,o*2+c),t.fillStyle=Z.sea,t.fillRect(-o*2,c,o*4,o*2),t.fillStyle=`#fff`,t.fillRect(-o*2,c-.75,o*4,1.5);let l=o/50;for(let e of[.5,1,2,5,10])for(let n of[1,-1]){let r=c-n*s(e),i=(e>=5?16:e>=2?12:7)*l;t.fillStyle=`rgba(255,255,255,.7)`,t.fillRect(-i,r-.5,i*2,1),(e===1||e===2||e===10)&&Jb(t,String(e),i+2,r+3,{size:8,color:`rgba(255,255,255,.8)`,weight:500})}t.restore(),t.strokeStyle=`rgba(255,255,255,.35)`,t.lineWidth=1,t.beginPath(),t.arc(i,a,o,0,2*Math.PI),t.stroke();let u=o*.52;if(t.strokeStyle=Z.mark,t.lineWidth=2.5,t.lineCap=`round`,t.beginPath(),t.moveTo(i-u,a),t.lineTo(i-u*.35,a),t.lineTo(i-u*.15,a+u*.2),t.moveTo(i+u,a),t.lineTo(i+u*.35,a),t.lineTo(i+u*.15,a+u*.2),t.stroke(),t.fillStyle=Z.mark,t.beginPath(),t.arc(i,a,2,0,2*Math.PI),t.fill(),t.shadowColor=`rgba(0,0,0,.8)`,t.shadowBlur=3,Jb(t,`${Qb(e.pitchDeg,1)}°`,i,a+o*.72,{size:10,align:`center`}),t.shadowBlur=0,e._0xdc9ffa){let n=e._0xc38049===`vent`?`VENTED`:`RUDDER`,r=n.length*6.5+10;t.fillStyle=Z.stall,t.beginPath(),t.roundRect(i-r/2,a-o*.72-8,r,13,4),t.fill(),Jb(t,n,i,a-o*.72+2,{size:9,align:`center`,weight:800,color:`#fff`})}}},cx=class{constructor(e){Object.assign(this,Kb(28,e))}draw(e){let{ctx:t,w:n,h:r}=this,i=e.wave??{},a=(i.H??0)/Vb,o=(i.above??0)/Vb,s=r-6;qb(t,n,r,6);let c=Math.max(2,Math.ceil((e.seaH90??4*Vb)/Vb-.05)),l=e=>s-Hb(e/c,0,1)*(s-13),u=c>6?2:1;t.fillStyle=Z.track,t.fillRect(4,13,7,s-13),t.fillStyle=`rgba(74,163,255,.4)`,t.fillRect(4,l(a),7,s-l(a));for(let e=0;e<=c;e+=u){let r=l(e);t.fillStyle=Z.dim,t.fillRect(11,r-.5,3,1),Jb(t,String(e),n-3,r+3,{size:8,align:`right`,color:Z.dim,weight:500})}let d=l(o);t.fillStyle=Z.mark,t.fillRect(2,d-1.5,11,3),Jb(t,`ft`,n/2,8,{size:8,align:`center`,color:Z.dim})}},lx=class{constructor(e,{full:t=!1}={}){Object.assign(this,Kb(72,e)),this.full=t}draw(e){let{ctx:t,w:n,h:r}=this;qb(t,n,r,8),Jb(t,(e.sog*Bb).toFixed(1),n/2,19,{size:18,align:`center`,weight:700}),Jb(t,`mph`,n/2,28,{size:8,align:`center`,color:Z.dim});let i=e=>e==null?`–`:(e*Bb).toFixed(1),a=[[`crests`,i(e.waveCrestMs)],[`sets`,i(e.waveSetMs)]];this.full&&a.push([`water`,e.stw==null?`n/a`:i(e.stw)],[`drift`,e.driftDeg==null?`n/a`:`${Qb(e.driftDeg)}°`]);let o=this.full?42:r-16;a.forEach(([e,r],i)=>{let a=o+i*12;Jb(t,e,6,a,{size:9,color:Z.dim}),Jb(t,r,n-6,a,{size:10,align:`right`})})}},ux=class{constructor(){Object.assign(this,Kb(72,Gb.hr)),this.ph=0,this.lastT=null}draw(e){let{ctx:t,w:n,h:r}=this,i=e.hr;if(qb(t,n,r,8),this.lastT!=null&&i!=null){let t=e.t-this.lastT;t>0&&t<1&&(this.ph=(this.ph+t*i/60)%1)}this.lastT=e.t,tx(t,15,r/2+.5,6.5*(1+.2*Math.exp(-this.ph*7)),Z.heart),Jb(t,i==null?`–`:String(Math.round(i)),n-8,r/2+5,{size:14,align:`right`,weight:700})}},dx=class{constructor(e){Object.assign(this,Kb(e,26))}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2,a=i-6,o=e=>Hb(e/120,-1,1)*a;if(qb(t,n,r),e.drag==null){Jb(t,`forces: live only`,i,16,{size:10,align:`center`,color:Z.dim});return}let s=[[e.thrust,Z.water],[Math.max(e.push,0),Z.push],[Math.max(e._0x6b0489,0),Z.wind]],c=[[e.drag,Z.stall],[Math.max(-e.push,0),Z.climb],[Math.max(-e._0x6b0489,0),Z.wind]],l=i;for(let[e,n]of s){let r=o(e);t.fillStyle=n,t.fillRect(l,4,r,9),l+=r}l=i;for(let[e,n]of c){let r=o(e);t.fillStyle=n,t.fillRect(l-r,4,r,9),l-=r}t.fillStyle=Z.text,t.fillRect(i-.5,2,1,13),Jb(t,`drag ${e.drag.toFixed(0)} N`,6,r-3,{size:9,color:Z.dim}),Jb(t,`net ${Qb(e.net)} N`,i,r-3,{size:9,align:`center`}),Jb(t,`push ${Qb(e.push)} N`,n-6,r-3,{size:9,align:`right`,color:Z.dim})}},fx=class{constructor(){Object.assign(this,Kb(124,78))}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2;if(qb(t,n,r,8),Xb(t,9,10,!!e._0xdc9ffa,Z.stall,e._0x829557==null?`force n/a`:`${e._0xc38049?`${e._0xc38049===`vent`?`VENTED`:`STALLED`} · `:``}${Math.abs(e._0x829557).toFixed(0)} N`,e._0xdc9ffa!=null),e._0x14eb46!=null&&e._0x14eb46<.995&&Jb(t,`${Math.round(e._0x14eb46*100)}% in`,n-8,13,{size:9,align:`right`,color:e._0x14eb46<.6?Z.climb:Z.dim}),t.fillStyle=`rgba(255,255,255,.12)`,t.fillRect(10,20,n-20,7),e.steer!=null){let r=Hb(e.steer,-1,1)*(n/2-10);t.fillStyle=Z.mark,t.fillRect(Math.min(i,i+r),20,Math.abs(r),7)}if(e._0x24e639!=null){let r=Hb(e._0x24e639,-1,1)*(n/2-10);t.fillStyle=Math.abs(e._0x24e639)>.85?Z.stall:Z.text,t.fillRect(i+r-1,18,2,11)}t.fillStyle=Z.text,t.fillRect(i-.5,18,1,11);let a=e.yaw,o=(e,r,i)=>{Jb(t,r,8,e,{size:9,color:Z.dim}),Jb(t,i==null?`n/a`:`${Qb(i,2)}°/s`,n-8,e,{size:9,align:`right`})};o(42,`rudder`,a?.rudder),o(54,`waves`,a?a.broach+a.ends:null),o(66,`wind`,a?.wind)}},px=class{constructor(e){Object.assign(this,Kb(e,46)),this.n=100,this.p=new Float32Array(this.n),this.q=new Float32Array(this.n),this.v=new Float32Array(this.n),this.k=0,this.lastT=-1}draw(e){let{ctx:t,w:n,h:r}=this;e.t<this.lastT-.5&&(this.p.fill(0),this.q.fill(0),this.v.fill(0)),(e.t-this.lastT>=.1||e.t<this.lastT)&&(this.lastT=e.t,this.k=(this.k+1)%this.n,this.p[this.k]=e.power,this.q[this.k]=e.extW??0,this.v[this.k]=e.sog),qb(t,n,r);let i=e=>r/2-Hb(e/400,-1,1)*(r/2-4),a=e=>r-4-Hb(e/6,0,1)*(r-8);t.fillStyle=Z.faint,t.fillRect(4,r/2-.5,n-8,1);let o=(e,r,i,a)=>{t.strokeStyle=i,t.lineWidth=a,t.beginPath();for(let i=0;i<this.n;i++){let a=(this.k+1+i)%this.n,o=4+i/(this.n-1)*(n-8);i?t.lineTo(o,r(e[a])):t.moveTo(o,r(e[a]))}t.stroke()};o(this.v,a,`rgba(255,255,255,.6)`,1),o(this.p,i,Z.water,1.5),o(this.q,i,Z.push,1.5),Jb(t,`power`,6,10,{size:9,color:Z.water}),Jb(t,`wind+water`,40,10,{size:9,color:Z.push}),Jb(t,`speed`,100,10,{size:9,color:Z.dim}),Jb(t,`10 s`,n-6,10,{size:9,align:`right`,color:Z.dim})}},mx={course:e=>new ax(e),compass:e=>new ix(e,{marks:!1}),power:e=>new ox(e),strip:e=>new px(e),forces:e=>new dx(e),adi:(e,t)=>new sx(t),elev:(e,t)=>new cx(t),speed:(e,t)=>new lx(t),speedFull:(e,t)=>new lx(t,{full:!0}),hr:()=>new ux,rudder:()=>new fx};function hx(e=globalThis){try{return e.matchMedia?.(`(pointer: fine)`).matches?`Default`:`Off`}catch{return`Off`}}function gx(e,t=globalThis.localStorage,n=hx()){let r={};try{r=JSON.parse(t?.getItem(Rb)??`{}`)??{}}catch{r={}}r.preset??(r.preset=n),Wb.includes(r.preset)&&(r.preset=`Default`);let i=e?.get?.(`instr`);if(i!=null){let e=e=>e.toLowerCase().replace(/[^a-z]/g,``),t=e(i),n=Object.keys(Ub).find(n=>e(n)===t)??(t?Object.keys(Ub).find(n=>e(n).startsWith(t)):null);r.preset=n??(i===`1`?`Default`:`Off`)}return Ub[r.preset]||(r.preset=`Off`),r}var _x=class{constructor(e,{storage:t=globalThis.localStorage}={}){this.s=e,this.storage=t,this.power=document.getElementById(`power`),this.widgets=[],this.lastDraw=-1,this.geomT=-1,this.damper=new Nb,typeof window<`u`&&(window.__instr=this);let n=document.createElement(`style`);n.textContent=`.instr-slot{position:fixed;z-index:4;display:flex;gap:6px;align-items:flex-end;pointer-events:none} .instr-col{display:flex;flex-direction:column;gap:4px}
      .instr-main{display:flex;flex-direction:column;gap:2px} #power.instr-on>.row, #power.instr-on>#plab{display:none !important} body.dbgopen .instr-slot{visibility:hidden}`,document.head.appendChild(n),this.build()}save(){try{this.storage?.setItem(Rb,JSON.stringify(this.s))}catch{}}setPreset(e){this.s.preset=Ub[e]?e:`Off`,this.save(),this.build()}clear(){for(let e of this.els??[])e.remove();this.els=[],this.widgets=[],this.power?.classList.remove(`instr-on`),this.built=null}build(){this.clear();let e=Ub[this.s.preset];if(!this.power||!e||!Object.keys(e).length)return;this.power.classList.add(`instr-on`);let t=this.power.clientWidth,n=t-20>120?t-20:340,r=e=>{let t=document.createElement(`div`);return t.className=e,this.els.push(t),t},i=(e,t,n,r)=>{let i=mx[t](n,r);return i.id=t,e.appendChild(i.cv),this.widgets.push(i),i},a=r(`instr-main`);for(let t of e.above??[])i(a,t,n);let o=i(a,`course`,n);i(a,`compass`,n),i(a,`power`,n),this.power.insertBefore(a,this.power.firstChild);let s=this.power.getBoundingClientRect(),c=s.height>0?Math.round(s.bottom-o.cv.getBoundingClientRect().top+6):85,l=e=>{let t=r(`instr-slot`);for(let n of e??[]){if(!Array.isArray(n)){i(t,n,0,Gb[n]??c);continue}let e=document.createElement(`div`);e.className=`instr-col`,t.appendChild(e);let r=n.reduce((e,t)=>e+(Gb[t]??0),0),a=n.filter(e=>!Gb[e]).length,o=a?Math.floor((c-r-4*(n.length-1))/a):0;for(let t of n)i(e,t,0,Gb[t]??o)}return document.body.appendChild(t),t};this.left=l(e.left),this.right=l(e.right),this.built={w:t,h:Math.round(s.height)},this.geomT=-1,this.layout(performance.now())}layout(e){if(e-this.geomT<500)return;this.geomT=e;let t=this.power.getBoundingClientRect();if(this.built&&t.height>0&&(Math.abs(this.power.clientWidth-this.built.w)>2||Math.abs(Math.round(t.height)-this.built.h)>2)){this.build();return}let n=window.innerHeight-t.bottom;Object.assign(this.left.style,{right:`${window.innerWidth-t.left+6}px`,bottom:`${n}px`}),Object.assign(this.right.style,{left:`${t.right+6}px`,bottom:`${n}px`})}update(e,t,n=performance.now()){if(!this.widgets.length)return;let r=this.shown=this.damper.update(e,this.s.damp??zb);if(!(n-this.lastDraw<33)&&(this.lastDraw=n,this.layout(n),this.widgets.length))for(let e of this.widgets)e.draw(r,t)}};function vx(e,t){let n=e.addFolder(`Instruments`);n.close();let r={preset:t.s.preset,damp:t.s.damp??zb};return n.add(r,`preset`,Object.keys(Ub)).name(`Layout`).onChange(e=>t.setPreset(e)),n.add(r,`damp`,0,1.5,.05).name(`Damping (s)`).onChange(e=>{t.s.damp=e,t.save()}),n}var yx=Math.PI/180,bx=180/Math.PI,xx=`surfski.tilt`,Sx={deadPow:3,maxPow:22,curvePow:1.4,invPow:!1,deadSteer:2,maxSteer:28,curveSteer:1.6,invSteer:!1,deadRoll:3,maxRoll:25,curveRoll:1.4,invRoll:!1,roll:!1,smoothS:.1,powerMode:`absolute`,rateWps:120},Cx=(e,t)=>[e[0]*t[0]-e[1]*t[1]-e[2]*t[2]-e[3]*t[3],e[0]*t[1]+e[1]*t[0]+e[2]*t[3]-e[3]*t[2],e[0]*t[2]-e[1]*t[3]+e[2]*t[0]+e[3]*t[1],e[0]*t[3]+e[1]*t[2]-e[2]*t[1]+e[3]*t[0]],wx=e=>[e[0],-e[1],-e[2],-e[3]],Tx=(e,t)=>{let n=t*yx/2,r=Math.sin(n);return[Math.cos(n),e===0?r:0,e===1?r:0,e===2?r:0]},Ex=(e,t,n)=>Cx(Cx(Tx(2,e),Tx(0,t)),Tx(1,n)),Dx=(e,t)=>Cx(e,Tx(2,-t));function Ox(e){let[t,n,r,i]=e;t<0&&(t=-t,n=-n,r=-r,i=-i);let a=Math.hypot(n,r,i);if(a<1e-9)return[0,0,0];let o=2*Math.atan2(a,t)*bx;return[n/a*o,r/a*o,i/a*o]}function kx(e,t){let[n,r,i]=Ox(Cx(wx(e),t));return{pitch:-n,steer:-i,roll:r}}function Ax(e,t,n=0){let r=e*yx,i=t*yx,a=Math.cos(r)*Math.sin(i),o=-Math.sin(r),s=-Math.cos(r)*Math.cos(i),c=n*yx;return[a*Math.cos(c)-o*Math.sin(c),a*Math.sin(c)+o*Math.cos(c),s]}function jx(e,t){let n=e=>Math.atan2(e[0],-e[1])*bx,r=e=>Math.asin(Math.max(-1,Math.min(1,-e[2])))*bx,i=n(t)-n(e);return i=(i+540)%360-180,{pitch:r(t)-r(e),steer:i}}function Mx(e,t,n,r=1){let i=Math.abs(e);return i<=t?0:Math.sign(e)*Math.min((i-t)/Math.max(n-t,1e-6),1)**+r}var Nx=(e,t,n)=>e>=0?t+e*(n-t):t*(1+e),Px=(e,t)=>+(Math.round(e/t)*t).toFixed(9);function Fx(e=globalThis.localStorage){try{return{...Sx,...JSON.parse(e?.getItem(`surfski.tilt`)??`{}`)}}catch{return{...Sx}}}var Ix=(e=globalThis)=>{let t=e.screen?.orientation?.angle??e.orientation??0;return(Number(t)%360+360)%360},Lx=class{constructor(e=Fx(),{env:t=globalThis}={}){this.s=e,this.env=t,this.status=`off`,this.q=null,this.q0=null,this.angle0=null,this.raw={pitch:0,steer:0,roll:0},this.out={power:0,steer:0,roll:0},this.onEv=e=>this.reading(e),this.lastEv=0}save(){try{this.env.localStorage?.setItem(xx,JSON.stringify(this.s))}catch{}}async start(){let e=this.env.DeviceOrientationEvent;if(!e)return this.status=`none`,this.status;if(typeof e.requestPermission==`function`){this.status=`asking`;try{if(await e.requestPermission()!==`granted`)return this.status=`denied`,this.status}catch{return this.status=`denied`,this.status}}return this.env.addEventListener(`deviceorientation`,this.onEv),this.status=`waiting`,this.q0=null,setTimeout(()=>{this.status===`waiting`&&(this.status=`none`)},2500),this.status}stop(){this.env.removeEventListener?.(`deviceorientation`,this.onEv),this.status=`off`,this.out={power:0,steer:0,roll:0}}reading(e){if(e.beta==null||e.gamma==null)return;let t=Ix(this.env);this.q=Dx(Ex(e.alpha??0,e.beta,e.gamma),t),this.g=Ax(e.beta,e.gamma,t),this.hasGyro=e.alpha!=null,this.lastEv=performance.now(),(this.status===`waiting`||this.status===`none`)&&(this.status=`on`),(!this.q0||t!==this.angle0)&&this.setNeutral()}setNeutral(){this.q&&(this.q0=this.q.slice(),this.g0=this.g.slice(),this.angle0=Ix(this.env),this.out={power:0,steer:0,roll:0})}sample(e){if(this.status!==`on`||!this.q||!this.q0)return this.out;let t=this.s,n=jx(this.g0,this.g),r=this.raw={pitch:n.pitch,steer:n.steer,roll:this.hasGyro?kx(this.q0,this.q).roll:0},i=1-Math.exp(-e/Math.max(t.smoothS,.001)),a={power:Mx(r.pitch,t.deadPow,t.maxPow,t.curvePow)*(t.invPow?-1:1),steer:Mx(r.steer,t.deadSteer,t.maxSteer,t.curveSteer)*(t.invSteer?-1:1),roll:t.roll?Mx(r.roll,t.deadRoll,t.maxRoll,t.curveRoll)*(t.invRoll?-1:1):0};for(let e of[`power`,`steer`,`roll`])this.out[e]+=(a[e]-this.out[e])*i;return this.out}},Rx=`surfski.mouse`,zx={scale:1.5,snap:.2,deadSteer:5,curveSteer:1.5,invSteer:!1,smoothS:.05,lock:!0,gain:.35,aspect:1,fitShare:.66,pos:null};function Bx(e=globalThis.localStorage){try{return{...zx,...JSON.parse(e?.getItem(`surfski.mouse`)??`{}`)}}catch{return{...zx}}}var Vx=`surfski.touchpad`,Hx={...zx,lock:!1,sizeL:.6,sizeP:.46,aspect:.9,smoothS:.04};function Ux(e=globalThis.localStorage){try{return{...Hx,...JSON.parse(e?.getItem(`surfski.touchpad`)??`{}`)}}catch{return{...Hx}}}var Wx=(e,t,n)=>Math.min(n,Math.max(t,e)),Gx=.04,Kx=.66;function qx(e,t,n,r=Kx){let i=Wx(e/t,.5,2.5);return{aspect:i,gain:Wx(Math.round(n*i)/(Wx(r,.2,1)*e),.02,5)}}var Jx=[.7,1,1.5,1.5,1.5,1.5,1.5,1,.7,.7],Yx=Jx.reduce((e,t)=>(e.push(e[e.length-1]+t),e),[0]).map((e,t,n)=>e/n[n.length-1]);function Xx(e){let t=Math.min(Math.max(e,-3),7)- -3,n=Math.min(Math.floor(t),Jx.length-1);return Yx[n]+(Yx[n+1]-Yx[n])*(t-n)}function Zx(e){let t=Math.min(Math.max(e,0),1),n=0;for(;n<Jx.length-1&&Yx[n+1]<t;)n++;return-3+n+(Yx[n+1]>Yx[n]?(t-Yx[n])/(Yx[n+1]-Yx[n]):0)}var Qx=(e,t)=>t*Gx+(1-Xx(e))*t*(1-2*Gx);function $x(e,t,n,r,i,a=i){return{steer:Wx((e-n-i/2)/(i/2),-1,1),level:Zx(1-(t-r-a*Gx)/(a*(1-2*Gx)))}}var eS=(e,t)=>{let n=Math.round(e);return Math.abs(e-n)<=t?n:e};function tS(e,t){return{level:eS(e.level,t.snap),steer:Mx(e.steer*100,t.deadSteer,100,t.curveSteer)*(t.invSteer?-1:1)}}var nS=(e,t)=>`#mZone{display:none;position:fixed;z-index:6;border:1.5px solid rgba(255,255,255,.55);border-radius:10px;background:transparent;cursor:pointer;touch-action:none}
#mZone.on{border-color:#ffd23f;cursor:crosshair} body.mousemode #mZone{display:block} body.dbgopen #mZone{visibility:hidden}
#mZone .mHandle{position:absolute;left:6px;top:-15px;width:40px;height:14px;border-radius:7px 7px 0 0;background:rgba(255,255,255,.55);cursor:grab;touch-action:none;
  display:flex;align-items:center;justify-content:center;color:rgba(5,20,40,.8);font:700 10px/1 system-ui,sans-serif;letter-spacing:1px}
#mZone .mHandle:hover{background:rgba(255,255,255,.8)} #mZone.drag .mHandle{cursor:grabbing}
#mZone .mCal{position:absolute;right:4px;top:-15px;height:14px;padding:0 7px;border-radius:7px 7px 0 0;background:rgba(255,255,255,.55);color:rgba(5,20,40,.85);font:700 9px/14px system-ui,sans-serif;cursor:pointer}
#mZone .mCal:hover{background:rgba(255,255,255,.85)}
#mZone.cal{border:2px solid #ffd23f;box-shadow:0 0 0 4px rgba(255,210,63,.35),0 0 28px 6px rgba(255,210,63,.55);z-index:30}`.replaceAll(`#mZone`,`#${e}`).replace(`body.mousemode`,`body.${t}`),rS=class{constructor(e=Bx(),{env:t=globalThis,touch:n=!1}={}){this.s=e,this.env=t,this.touch=n,this.key=n?Vx:Rx,this.engaged=!1,this.locked=!1,this.raw={level:4,steer:0},this.sm={level:4,steer:0},this.out={level:4,steer:0},this.p=null;let r=this.doc=t.document,i=r.createElement(`style`),a=n?`tZone`:`mZone`;i.textContent=nS(a,n?`touchmode`:`mousemode`),r.head.appendChild(i),this.el=r.createElement(`div`),this.el.id=a,this.cv=r.createElement(`canvas`),this.el.appendChild(this.cv),r.body.appendChild(this.el),this.handle=r.createElement(`div`),this.handle.className=`mHandle`,this.handle.title=`Drag to move`,this.handle.textContent=`⋮⋮⋮`,this.el.appendChild(this.handle),this.handle.addEventListener(`pointerdown`,e=>this.dragStart(e)),this.calBtn=r.createElement(`div`),this.calBtn.className=`mCal`,this.calBtn.textContent=`calibrate`,this.calBtn.title=`Fit the zone to your trackpad or the room you have for the mouse`,this.el.appendChild(this.calBtn),this.calBtn.addEventListener(`pointerdown`,e=>{e.preventDefault(),e.stopPropagation(),this.engaged&&this.release(),this.onCalibrate?this.onCalibrate():this.calibrate()}),n&&(this.calBtn.style.display=`none`),this.resize(),this.el.addEventListener(`pointerdown`,e=>{this.engaged||(e.preventDefault(),e.stopPropagation(),this.engage(e))}),this.onTouchMove=e=>{e.pointerId===this.pid&&(e.preventDefault(),this.p=[e.clientX,e.clientY])},this.onTouchUp=e=>{e.pointerId===this.pid&&this.release()},this.onMove=e=>{if(!this.locked){this.p=[e.clientX,e.clientY];return}let t=this.el.getBoundingClientRect(),n=this.s.gain;this.p=[Wx(this.p[0]+e.movementX*n,t.left,t.right),Wx(this.p[1]+e.movementY*n,t.top,t.bottom)]},this.onDown=e=>{this.engaged&&(e.preventDefault(),e.stopPropagation(),this.release())},this.onKey=e=>{this.engaged&&e.key===`Escape`&&(e.stopPropagation(),this.release())},r.addEventListener(`pointerlockchange`,()=>{let e=this.locked;this.locked=r.pointerLockElement===this.el,e&&!this.locked&&(this.engaged&&this.release(),this.cal&&this.endCal(!1))}),this.onCalMove=e=>{let t=this.cal;t&&(t.x+=e.movementX,t.y+=e.movementY,t.x0=Math.min(t.x0,t.x),t.x1=Math.max(t.x1,t.x),t.y0=Math.min(t.y0,t.y),t.y1=Math.max(t.y1,t.y))},this.onCalDown=e=>{this.cal&&(e.preventDefault(),e.stopPropagation(),this.endCal(!0))},this.placeT=-1,typeof window<`u`&&(window[n?`__touchpad`:`__mouse`]=this)}save(){try{this.env.localStorage?.setItem(this.key,JSON.stringify(this.s))}catch{}}get w(){return Math.round(this.h*Wx(this.s.aspect??1,.5,2.5))}get h(){return this.hpx??135}fitHeight(){if(this.touch){let e=this.env.innerWidth,t=this.env.innerHeight,n=Math.round(Wx(e>=t?t*(this.s.sizeL??.6):e*(this.s.sizeP??.46),110,t-60));n!==this.hpx&&(this.hpx=n,this.resize());return}let e=this.doc,t=[...e.querySelectorAll(`.instr-slot`)].map(e=>e.getBoundingClientRect().height).filter(e=>e>0),n=t.length?Math.max(...t):e.getElementById(`power`)?.getBoundingClientRect().height||90,r=Math.round(Wx(n*(this.s.scale??1.5),80,this.env.innerHeight-60));r!==this.hpx&&(this.hpx=r,this.resize())}resize(){let e=this.w,t=this.h,n=Math.min(this.env.devicePixelRatio||1,2);this.cv.width=Math.round(e*n),this.cv.height=Math.round(t*n),this.cv.style.width=`${e}px`,this.cv.style.height=`${t}px`,this.cv.style.display=`block`,this.ctx=this.cv.getContext(`2d`),this.ctx.setTransform(n,0,0,n,0,0),this.placeT=-1}place(e=performance.now()){if(this.dragging||e-this.placeT<500)return;this.placeT=e,this.fitHeight();let t=this.doc,n=this.w,r=this.h,i=this.env.innerWidth,a=this.env.innerHeight,o,s;if(this.s.pos)o=this.s.pos.x*i,s=this.s.pos.y*a;else if(this.touch){o=i-n-16,s=16;let e=t.getElementById(`power`)?.getBoundingClientRect();i<a&&e?.height&&o<e.right&&e.bottom>a-16-r&&(s=a-e.top+8)}else{let e=t.getElementById(`power`)?.getBoundingClientRect(),r=[...t.querySelectorAll(`.instr-slot`)].map(e=>e.getBoundingClientRect()).filter(e=>e.width>0),c=Math.min(e?.width?e.left:i/2,...r.map(e=>e.left)),l=Math.max(e?.width?e.right:i/2,...r.map(e=>e.right));s=e?.height?a-e.bottom:12,o=c-14-n,o<8&&(o=l+14),o+n>i-8&&(o=(e?.width?e.left+e.width/2:i/2)-n/2,s=e?.height?a-e.top+20:140)}o=Wx(o,4,i-n-4),s=Wx(s,4,a-r-20),Object.assign(this.el.style,{left:`${Math.round(o)}px`,bottom:`${Math.round(s)}px`,width:`${n}px`,height:`${r}px`}),this.touch&&t.body?.style.setProperty(`--tZoneW`,`${n}px`)}dragStart(e){if(this.engaged)return;e.preventDefault(),e.stopPropagation();let t=this.el.getBoundingClientRect(),n=this.env.innerHeight,r=e.clientX-t.left,i=t.bottom-e.clientY;this.dragging=!0,this.el.classList.add(`drag`);let a=e=>{let t=Wx(e.clientX-r,4,this.env.innerWidth-this.w-4),a=Wx(n-e.clientY-i,4,n-this.h-20);Object.assign(this.el.style,{left:`${Math.round(t)}px`,bottom:`${Math.round(a)}px`})},o=()=>{this.env.removeEventListener(`pointermove`,a,!0),this.env.removeEventListener(`pointerup`,o,!0);let e=this.el.getBoundingClientRect();this.s.pos={x:e.left/this.env.innerWidth,y:(n-e.bottom)/n},this.save(),this.dragging=!1,this.el.classList.remove(`drag`),this.placeT=-1};this.env.addEventListener(`pointermove`,a,!0),this.env.addEventListener(`pointerup`,o,!0)}capture(){let e=e=>{try{return Promise.resolve(e?this.el.requestPointerLock(e):this.el.requestPointerLock())}catch(e){return Promise.reject(e)}};return this.el.requestPointerLock?e({unadjustedMovement:!0}).then(()=>(this.rawMove=!0,!0),()=>e().then(()=>(this.rawMove=!1,!0),()=>!1)):Promise.resolve(!1)}calibrate(){this.engaged&&this.release(),this.cal={x:0,y:0,x0:0,x1:0,y0:0,y1:0},this.el.classList.add(`on`,`cal`),this.env.addEventListener(`pointermove`,this.onCalMove,!0),this.env.addEventListener(`pointerdown`,this.onCalDown,!0),this.capture().then(e=>{e||this.endCal(!1)})}endCal(e){let t=this.cal;if(!t)return;this.cal=null,this.el.classList.remove(`on`,`cal`),this.env.removeEventListener(`pointermove`,this.onCalMove,!0),this.env.removeEventListener(`pointerdown`,this.onCalDown,!0),this.doc.pointerLockElement===this.el&&this.doc.exitPointerLock?.();let n=t.x1-t.x0,r=t.y1-t.y0;e&&n>40&&r>25&&(Object.assign(this.s,qx(n,r,this.h,this.s.fitShare??.66)),this.resize(),this.save(),this.fitted={sx:n,sy:r,rawMove:this.rawMove}),this.onFit?.(e?this.fitted:null)}engage(e){this.engaged=!0,this.p=[e.clientX,e.clientY],this.el.classList.add(`on`);let t=this.el.getBoundingClientRect(),n=$x(e.clientX,e.clientY,t.left,t.top,t.width,t.height);if(this.sm={...n},this.touch){this.pid=e.pointerId;try{this.el.setPointerCapture?.(e.pointerId)}catch{}this.env.addEventListener(`pointermove`,this.onTouchMove,!0),this.env.addEventListener(`pointerup`,this.onTouchUp,!0),this.env.addEventListener(`pointercancel`,this.onTouchUp,!0)}else this.env.addEventListener(`pointermove`,this.onMove,!0),this.env.addEventListener(`pointerdown`,this.onDown,!0),this.env.addEventListener(`keydown`,this.onKey,!0),this.s.lock&&this.capture()}release(){this.engaged&&(this.engaged=!1,this.el.classList.remove(`on`),this.out={level:this.out.level,steer:0},this.sm.steer=0,this.touch?(this.env.removeEventListener(`pointermove`,this.onTouchMove,!0),this.env.removeEventListener(`pointerup`,this.onTouchUp,!0),this.env.removeEventListener(`pointercancel`,this.onTouchUp,!0),this.pid=null):(this.env.removeEventListener(`pointermove`,this.onMove,!0),this.env.removeEventListener(`pointerdown`,this.onDown,!0),this.env.removeEventListener(`keydown`,this.onKey,!0),this.doc.pointerLockElement===this.el&&this.doc.exitPointerLock?.()))}sample(e){if(this.place(),!this.engaged||!this.p)return this.out;let t=this.el.getBoundingClientRect(),n=this.raw=$x(this.p[0],this.p[1],t.left,t.top,t.width,t.height),r=1-Math.exp(-e/Math.max(this.s.smoothS,.001));for(let e of[`level`,`steer`])this.sm[e]+=(n[e]-this.sm[e])*r;return this.out=tS(this.sm,this.s),this.out}draw(){let{ctx:e}=this,t=this.w,n=this.h,r=t/2,i=this.s,a=e=>Qx(e,n);e.clearRect(0,0,t,n),e.globalAlpha=.2,e.fillStyle=Id,e.fillRect(0,a(4),t,a(0)-a(4));for(let n=4;n<7;n++){let r=n===6?0:a(n+1);e.fillStyle=Ld(n+.5),e.fillRect(0,r,t,a(n)-r)}for(let r=0;r<3;r++)e.fillStyle=Rd(r+1),e.fillRect(0,a(-r),t,(r===2?n:a(-r-1))-a(-r));e.globalAlpha=1,e.font=`600 8px system-ui, -apple-system, sans-serif`,e.textAlign=`left`,e.shadowColor=`rgba(0,0,0,.7)`,e.shadowBlur=2;for(let n=-3;n<=7;n++){let r=Math.round(a(n))+.5,i=n===4;e.strokeStyle=i?`rgba(255,255,255,.6)`:n===0?`rgba(255,255,255,.4)`:`rgba(255,255,255,.16)`,e.lineWidth=i?1.5:1,e.beginPath(),e.moveTo(14,r),e.lineTo(t-4,r),e.stroke()}let o=[];for(let t of[4,0,1,2,3,-1,5,-2,7,-3,6]){let n=Math.round(a(t))+.5;o.some(e=>Math.abs(e-n)<8.5)||(o.push(n),e.fillStyle=t===4?`#fff`:`rgba(255,255,255,.7)`,e.fillText(String(t),3,n+3))}e.strokeStyle=`rgba(255,255,255,.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(r,4),e.lineTo(r,n-4),e.stroke();let s=i.deadSteer/100*r;e.fillStyle=`rgba(255,255,255,.08)`,e.fillRect(r-s,0,s*2,n),this.engaged&&(e.fillStyle=`rgba(255,255,255,.45)`,e.beginPath(),e.arc(r+this.raw.steer*r,a(this.raw.level),4,0,2*Math.PI),e.fill());let c=this.engaged?this.out:this.follow;if(c&&!this.cal&&(e.fillStyle=`#ffd23f`,e.globalAlpha=this.engaged?1:.85,e.beginPath(),e.arc(r+Wx(c.steer,-1,1)*r,a(c.level),6,0,2*Math.PI),e.fill(),e.globalAlpha=1),e.font=`600 11px system-ui, -apple-system, sans-serif`,e.textAlign=`center`,e.fillStyle=`rgba(255,255,255,.9)`,e.shadowBlur=3,this.cal){e.font=`600 10px system-ui, -apple-system, sans-serif`;let i=[],a=`Move over all the room you have (the trackpad, or the mouse pad): side to side, top to bottom, then click.`.split(` `);for(let n of a){let r=i[i.length-1];r!=null&&e.measureText(`${r} ${n}`).width<=t-16?i[i.length-1]=`${r} ${n}`:i.push(n)}i.push(`${Math.round(this.cal.x1-this.cal.x0)} × ${Math.round(this.cal.y1-this.cal.y0)}`,`Esc cancels`);let o=n/2-i.length*13/2;e.fillStyle=`rgba(5,20,40,.8)`,e.fillRect(4,o-4,t-8,i.length*13+8),e.fillStyle=`#fff`,i.forEach((t,n)=>e.fillText(t,r,o+(n+.8)*13))}else if(!(this.engaged&&this.touch)){if(this.engaged){e.font=`600 9px system-ui, -apple-system, sans-serif`,e.textAlign=`right`;let r=e.measureText(`Space: pause`).width+e.measureText(`click or Esc: let go`).width+16<=t;e.fillText(`click or Esc: let go`,t-6,r?n-5:n-16)}else{let n=this.touch?[`touch and hold:`,`up and down power,`,`left and right steer`]:[`click for mouse/trackpad control`,`or use arrow keys`],i=11,o=()=>(e.font=`600 ${i}px system-ui, -apple-system, sans-serif`,n.every(n=>e.measureText(n).width<=t-22));for(;!o()&&i>8.5;)i-=.5;if(!o()&&!this.touch)for(n=[`click for`,`mouse/trackpad control`,`or use arrow keys`],i=11;!o()&&i>7;)i-=.5;let s=a(2.4)+4-(n.length-2)*(i+3)/2;n.forEach((t,n)=>e.fillText(t,r+6,s+n*(i+3)))}}!this.cal&&!this.touch&&(e.font=`600 9px system-ui, -apple-system, sans-serif`,e.textAlign=`left`,e.fillStyle=`rgba(255,255,255,.9)`,e.shadowBlur=3,e.fillText(`Space: pause`,5,n-5)),e.shadowBlur=0}},iS=`surfski.perf`,aS=typeof location<`u`&&typeof URLSearchParams<`u`?new URLSearchParams(location.search).get(`perf`):null,oS=(()=>{try{return globalThis.localStorage?.getItem(`surfski.perf`)??``}catch{return``}})(),sS=aS??oS,cS=new Set(sS.split(`,`).map(e=>e.trim()).filter(e=>e.startsWith(`-`)).map(e=>e.slice(1))),lS={landlod:`Land in tiles, coarser far away, none off screen`},uS=e=>sS!==`0`&&!cS.has(e);function dS(e){try{globalThis.localStorage?.setItem(iS,e.length?e.map(e=>`-${e}`).join(`,`):``)}catch{}}var fS=()=>oS.split(`,`).map(e=>e.trim()).filter(e=>e.startsWith(`-`)).map(e=>e.slice(1)),pS=()=>{try{return!!(globalThis.navigator?.standalone||globalThis.matchMedia?.(`(display-mode: standalone)`).matches||globalThis.matchMedia?.(`(display-mode: fullscreen)`).matches)}catch{return!1}},mS=`surfski.battery`,hS=e=>{try{return e?.getItem(mS)===`1`}catch{return!1}},gS=(e,t)=>{try{e?.setItem(mS,t?`1`:`0`)}catch{}},_S=`surfski.experience`,vS=2.23694;function yS(e,t,n=globalThis.localStorage){let r=e?.get?.(`experience`);if(r===`casual`||r===`full`)return r;try{let e=n?.getItem(_S);if(e===`casual`||e===`full`)return e}catch{}return t===`phone`?`casual`:`full`}var bS={"shilshole-meadow-can6":`ok`,"shilshole-westpoint-goldengardens":`ok`,"shilshole-meadow-westpoint":`ok`,"gorge-swellcity":`ok`,"gorge-bobs-beach":`ok`,"tarifa-poniente":`ok`,"perth-doctor":`ok`,kaiwi:`fewer`,"perth-sunset":`fewer`,"perth-north-beaches":`fewer`,"perth-hillarys-laps":`fewer`,"perth-trigg-sorrento":`fewer`},xS=`
body.casual #toolbar, body.casual #hamb, body.casual #inset, body.casual #timeline, body.casual #plab, body.casual #power .row:has(#rfill),
body.casual .instr-slot, body.casual #menu, body.casual #intro .steps, body.casual #intro .fine, body.casual #intro table.keys, body.casual #intro p.tag { display: none !important; }
body.casual:not(.casualfull) #sidePanel { display: none !important; }
body.casual #power { left: 50% !important; right: auto !important; top: auto !important; bottom: 10px !important; transform: translateX(-50%) !important; width: min(46vw, 330px) !important; padding: 4px 8px !important; font-size: 11px; }
body.casual #touch { bottom: 12px !important; } body.casual.tiltmode:not(.hybrid) #touch { display: none !important; } body.touchmode #touch { display: none !important; }
body.casual.hybrid #touch .grp:first-child { visibility: hidden; } body.casual.hybrid #cTilt { left: 14px; right: auto; }      /* hybrid: the pad where the rudder buttons were */
@media (orientation: portrait) { body.casual #cTop .spd { margin-left: auto; } }
#cTop { display: none; position: fixed; z-index: 20; left: 6px; right: 6px; top: 6px; gap: 6px; align-items: center; pointer-events: none; }
body.casual #cTop { display: flex; }
#cTop .cb { pointer-events: auto; flex: none; width: 38px; height: 38px; border-radius: 19px; border: 0; background: rgba(5, 20, 40, .72); color: #fff; font-size: 18px; line-height: 1; padding: 0; touch-action: manipulation; }
#cTop .cb:active { background: rgba(43, 140, 255, .8); }
#cTop .cmp { flex: 1; display: flex; justify-content: center; min-width: 0; }
#cTop .spd { flex: none; min-width: 66px; text-align: right; color: #fff; text-shadow: 0 1px 3px rgba(0,0,0,.6); line-height: 1; padding: 0 4px; }
#cTop .spd b { font-size: 22px; font-weight: 700; } #cTop .spd small { display: block; font-size: 10px; opacity: .8; margin-top: 2px; }
#cMenu { display: none; position: fixed; inset: 0; z-index: 40; background: rgba(3, 12, 26, .95); color: #e8f2ff; overflow-y: auto; padding: 14px 16px 40px; font: 15px system-ui, -apple-system, sans-serif; }
body.cmenu #cMenu { display: block; }
#cMenu h3 { margin: 16px 0 8px; font-size: 13px; letter-spacing: .06em; text-transform: uppercase; opacity: .7; font-weight: 600; }
#cMenu .row { display: flex; flex-wrap: wrap; gap: 8px; }
#cMenu .secs { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 0 28px; } #cMenu .secs section.wide { grid-column: 1 / -1; }
#cMenu .chip { border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.06); color: #fff; border-radius: 20px; padding: 7px 13px; font-size: 14px; min-height: 38px; }
#cMenu .chip.on { background: #2b8cff; border-color: #2b8cff; }
#cMenu .chip.dim { opacity: .5; } #cMenu .chip .bd { font-size: 11px; opacity: .85; margin-left: 6px; }
#cMenu .big { display: flex; gap: 10px; } #cMenu .big button { flex: 1; min-height: 50px; border-radius: 12px; border: 0; font-size: 17px; font-weight: 600; color: #fff; background: #2b8cff; }
#cMenu .big button.alt { background: rgba(255,255,255,.12); }
#cMenu .x { position: sticky; top: 0; float: right; margin: 0 0 8px 12px; width: 40px; height: 40px; border-radius: 20px; border: 0; background: rgba(255,255,255,.12); color: #fff; font-size: 18px; }
#cMenu label.sl { display: grid; grid-template-columns: 9.5em 1fr 3.2em; gap: 8px; align-items: center; font-size: 13px; margin: 6px 0; }
#cMenu label.sl input { width: 100%; } #cMenu .note { font-size: 12px; opacity: .65; margin: 4px 0; }
.cIntro { display: none; } body.casual .cIntro { display: block; margin: 4px 0 12px; font-size: 15px; opacity: .85; }
#cRes { display: none; } body.casual #cRes { display: inline; font-size: 11px; opacity: .85; white-space: nowrap; }
#cTilt { display: none; position: fixed; z-index: 7; right: 14px; bottom: 12px; touch-action: none; }
body.casual.tiltmode #cTilt, body.tiltmode #cTilt { display: block; }
#ctlPop { display: none; position: fixed; z-index: 41; left: 50%; top: 56px; transform: translateX(-50%); width: min(440px, calc(100vw - 20px)); max-height: calc(100vh - 80px); overflow-y: auto; background: rgba(3, 12, 26, .95); color: #e8f2ff; border-radius: 12px; padding: 10px 14px 14px; font: 14px system-ui, -apple-system, sans-serif; box-shadow: 0 6px 24px rgba(0,0,0,.45); }
body.ctlpop #ctlPop { display: block; }
#ctlPop h3, #ctlTab h3 { margin: 4px 0 8px; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; opacity: .7; font-weight: 600; }
#ctlPop .row, #cMenu .row, #ctlTab .row { display: flex; flex-wrap: wrap; gap: 8px; }
#ctlPop .chip, #ctlTab .chip { border: 1px solid rgba(255,255,255,.25); background: rgba(255,255,255,.06); color: #fff; border-radius: 20px; padding: 6px 12px; font-size: 13px; min-height: 34px; cursor: pointer; }
#ctlPop .chip.on, #ctlTab .chip.on { background: #2b8cff; border-color: #2b8cff; }
#ctlPop .x { float: right; width: 32px; height: 32px; border-radius: 16px; border: 0; background: rgba(255,255,255,.12); color: #fff; font-size: 15px; cursor: pointer; }
#ctlPop label.sl, #ctlTab label.sl { display: grid; grid-template-columns: 9.5em 1fr 3.2em; gap: 8px; align-items: center; font-size: 13px; margin: 6px 0; } #ctlPop label.sl input, #ctlTab label.sl input { width: 100%; }
#ctlPop .note, #ctlTab .note { font-size: 12px; opacity: .65; margin: 6px 0; }
#ctlTab { padding: 4px 2px 12px; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,.15); }
#cHint { display: none; position: fixed; z-index: 21; left: 50%; top: 50%; transform: translate(-50%, -50%); background: rgba(5, 20, 40, .9); color: #fff; padding: 14px 18px; border-radius: 12px; font: 15px system-ui, sans-serif; text-align: center; max-width: 80vw; }
@media (orientation: portrait) { body.casual.hintportrait #cHint { display: block; }
  body.casual #cTop { flex-wrap: wrap; } body.casual #cTop .cmp { order: 9; flex-basis: 100%; }
  body.casual #power { width: calc(100vw - 20px) !important; bottom: 88px !important; } body.casual #touch { bottom: 10px !important; } }
/* 2026-11-22 (Mike: "simplify the mobile menus ... move speed and FPS to the instruments area ... make the compass thinner and stack on the
   instruments"): one panel at the bottom, the compass row over the power row; the top bar keeps only buttons. Safe areas for the notch. */
#cTop { left: calc(6px + env(safe-area-inset-left)); right: calc(6px + env(safe-area-inset-right)); top: calc(6px + env(safe-area-inset-top)); }
#cTop .gap { flex: 1; }
#cTop .cb.on { background: rgba(43, 140, 255, .85); }
#power .cCmpRow, #power .cVal { display: none; }
body.casual #power { top: auto !important; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; bottom: calc(8px + env(safe-area-inset-bottom)) !important;
  width: min(64vw, 560px) !important; box-sizing: border-box; padding: 4px 9px 5px !important; background: rgba(3, 14, 30, .84) !important; border-radius: 10px; font-size: 12px; font-variant-numeric: tabular-nums; color: #fff; }
body.casual #ptxt, body.casual #plab, body.casual #cRes.old { display: none !important; }
body.casual #power .cCmpRow { display: flex; align-items: center; gap: 8px; margin-bottom: 3px; }
body.casual #power .cCmpRow canvas { flex: 1; min-width: 0; height: 20px; display: block; }
body.casual #power .cCmpRow .l, body.casual #power .cCmpRow .r { flex: none; font-size: 11px; opacity: .92; white-space: nowrap; }
body.casual #power .cCmpRow .l { min-width: 5.6em; } body.casual #power .cCmpRow .r { min-width: 7.6em; text-align: right; }
body.casual #power .row { gap: 6px; }
body.casual:not(.touchmode):not(.tiltmode) #power { width: min(560px, calc(100vw - 336px - env(safe-area-inset-left) - env(safe-area-inset-right))) !important; }      /* between the touch buttons */
body.casual:not(.touchmode):not(.tiltmode) #power .row .bar:not(.thin) { flex-basis: 28%; }
body.casual #power .row .bar:not(.thin) { flex: 0 0 34%; height: 12px; }
body.casual #power .cVal { display: inline-block; white-space: nowrap; text-align: right; }
body.casual #cW { width: 4.4em; } body.casual #cWave { width: 5.4em; } body.casual #cResv { width: 4.3em; }
body.casual #cSpd { margin-left: auto; display: inline-flex !important; align-items: center; gap: 4px; } body.casual #cSpd b { font-size: 17px; font-weight: 700; } body.casual #cSpd small { font-size: 9px; line-height: 10px; opacity: .8; text-align: left; white-space: pre; }
body.casual.cmap #inset { display: block !important; left: calc(6px + env(safe-area-inset-left)) !important; top: calc(50px + env(safe-area-inset-top)) !important; width: min(40vw, 44vh, 260px) !important; }
body.casual.cmap #insetBar, body.casual.cmap #insetGrip, body.casual.cmap #hudBody { display: none !important; }
body.casual.cmap #inset #v2d { display: block !important; }      /* (the inset starts folded to its bar, which casual hides: the 🗺 button shows the map itself) */
@media (orientation: portrait) { body.casual.cmap #inset { width: min(50vw, 40vh, 260px) !important; } }
body.casual #touch { bottom: calc(12px + env(safe-area-inset-bottom)) !important; padding: 0 calc(14px + env(safe-area-inset-right)) 0 calc(14px + env(safe-area-inset-left)); }
body.casual #banner { top: calc(54px + env(safe-area-inset-top)) !important; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; width: max-content !important;
  max-width: min(560px, calc(100vw - 24px)) !important; box-sizing: border-box; font-size: 13px; padding: 7px 12px; text-align: center; }      /* under the top bar, clear of the panel and the pad */
@media (orientation: landscape) {      /* the touch pad at the bottom right: the panel and the banner move left of it (--tZoneW: the pad's width) */
  body.casual.touchmode #power { left: calc(8px + env(safe-area-inset-left)) !important; transform: none !important; width: min(560px, calc(100vw - var(--tZoneW, 160px) - 40px - env(safe-area-inset-left) - env(safe-area-inset-right))) !important; }
  body.casual.touchmode #banner { left: calc((100vw - var(--tZoneW, 160px) - 24px) / 2) !important; max-width: calc(100vw - var(--tZoneW, 160px) - 48px) !important; } }
@media (orientation: portrait) {
  body.casual #power { width: calc(100vw - 12px - env(safe-area-inset-left) - env(safe-area-inset-right)) !important; bottom: calc(6px + env(safe-area-inset-bottom)) !important; }
  body.casual #touch { bottom: calc(76px + env(safe-area-inset-bottom)) !important; }
  body.casual #power .row .bar:not(.thin) { flex-basis: 24%; }
  body.casual:not(.touchmode):not(.tiltmode) #power { width: calc(100vw - 12px - env(safe-area-inset-left) - env(safe-area-inset-right)) !important; }
  body.casual #cTop { flex-wrap: nowrap; } }
#cMenu select { width: 100%; font-size: 16px; padding: 9px 10px; border-radius: 10px; background: rgba(255,255,255,.08); color: #fff; border: 1px solid rgba(255,255,255,.28); }
#cMenu select option, #cMenu select optgroup { color: #000; }
#cMenu details { margin-top: 18px; border-top: 1px solid rgba(255,255,255,.15); padding-top: 6px; } #cMenu summary { cursor: pointer; font-size: 13px; letter-spacing: .06em; text-transform: uppercase; opacity: .75; padding: 8px 0; }
#ctlPop details summary, #cMenu .ctlMore summary { cursor: pointer; font-size: 13px; opacity: .8; padding: 8px 0; }
#ctlPop .bigbtn, #cMenu .bigbtn { display: block; width: 100%; min-height: 46px; border-radius: 12px; border: 0; font-size: 16px; font-weight: 600; color: #fff; background: #2b8cff; margin: 8px 0; }
#cMenu pre.msgs { white-space: pre-wrap; word-break: break-word; font-size: 11px; line-height: 1.35; max-height: 50vh; overflow: auto; background: rgba(0,0,0,.35); padding: 8px; border-radius: 8px; user-select: text; -webkit-user-select: text; }
body.casual #dbgbar { display: none !important; }      /* (the phone's ☰ > Developer has the reports: Mike, 2026-11-22, "on mobile, do not show the console") */
`;function Q(e,t={},...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t))e===`class`?r.className=n:e.startsWith(`on`)?r.addEventListener(e.slice(2),n):r.setAttribute(e,n);return r.append(...n),r}var SS=class{constructor(e,t){this.tilt=e,this.size=112;let n=Math.min(window.devicePixelRatio||1,2);this.cv=Q(`canvas`,{id:`cTilt`}),this.cv.width=this.size*n,this.cv.height=this.size*n,this.cv.style.width=this.cv.style.height=`${this.size}px`,this.ctx=this.cv.getContext(`2d`),this.ctx.scale(n,n),this.cv.addEventListener(`pointerdown`,e=>{e.preventDefault(),t()})}draw(){let{ctx:e,size:t}=this,n=t/2,r=n-6,i=this.tilt,a=i.s;e.clearRect(0,0,t,t),e.fillStyle=`rgba(5, 20, 40, .62)`,e.beginPath(),e.arc(n,n,r+4,0,2*Math.PI),e.fill(),e.strokeStyle=`rgba(255,255,255,.35)`,e.lineWidth=1,e.beginPath(),e.arc(n,n,r,0,2*Math.PI),e.moveTo(n-r,n),e.lineTo(n+r,n),e.moveTo(n,n-r),e.lineTo(n,n+r),e.stroke();let o=a.deadSteer/a.maxSteer*r,s=a.deadPow/a.maxPow*r;e.fillStyle=`rgba(255,255,255,.10)`,e.fillRect(n-o,n-s,o*2,s*2);let c=t=>{e.fillStyle=`#fff`,e.font=`600 11px system-ui, sans-serif`,e.textAlign=`center`,e.fillText(t,n,n+4)};if(i.status!==`on`){c({off:`tap to allow tilt`,asking:`allow…`,denied:`tap to retry`,waiting:`waiting…`,none:`no sensor`}[i.status]??i.status);return}let l=i.raw,u=n+Math.max(-1.15,Math.min(1.15,l.steer/a.maxSteer))*r,d=n-Math.max(-1.15,Math.min(1.15,l.pitch/a.maxPow))*r;e.fillStyle=`rgba(255,255,255,.35)`,e.beginPath(),e.arc(u,d,5,0,2*Math.PI),e.fill();let f=i.out,p=n+f.steer*r,m=n-f.power*r;if(e.fillStyle=`#ffd23f`,e.beginPath(),e.arc(p,m,7,0,2*Math.PI),e.fill(),a.roll){let t=-Math.PI/2+f.roll*Math.PI/4;e.strokeStyle=`#7fe3ff`,e.lineWidth=4,e.beginPath(),e.arc(n,n,r+1,t-.12,t+.12),e.stroke()}e.fillStyle=`#fff`,e.beginPath(),e.arc(n,n,4,0,2*Math.PI),e.fill()}},CS=class{constructor(){this.cv=Q(`canvas`),this.ctx=this.cv.getContext(`2d`),this.w=0,this.h=20,this.span=120}fit(){let e=Math.max(60,Math.round(this.cv.clientWidth||200)),t=Math.min(window.devicePixelRatio||1,2);(e!==this.w||this.r!==t)&&(this.w=e,this.r=t,this.cv.width=Math.round(e*t),this.cv.height=Math.round(this.h*t),this.ctx.setTransform(t,0,0,t,0,0))}draw(e,t=null){this.fit();let{ctx:n,w:r,h:i,span:a}=this,o=r/2,s=r/a,c=e??0;n.clearRect(0,0,r,i),n.font=`600 9px system-ui, sans-serif`,n.textAlign=`center`,n.textBaseline=`alphabetic`;for(let e=Math.ceil((c-a/2)/10)*10;e<=c+a/2;e+=10){let t=o+(e-c)*s,r=(e%360+360)%360,i=r%30==0;if(n.fillStyle=i?`rgba(255,255,255,.75)`:`rgba(255,255,255,.35)`,n.fillRect(Math.round(t)-.5,i?12:15,1,i?8:5),i&&Math.abs(t-o)>26){let e={0:`N`,90:`E`,180:`S`,270:`W`}[r]??String(r);n.fillStyle=e.length===1?`#fff`:`rgba(255,255,255,.6)`,n.fillText(e,t,9)}}if(t!=null){if(n.fillStyle=`#ffd23f`,Math.abs(t)<a/2-4){let e=o+t*s;n.beginPath(),n.moveTo(e-6,11),n.lineTo(e+6,11),n.lineTo(e,19),n.fill()}else{let e=Math.sign(t),i=e>0?r-3:3;n.beginPath(),n.moveTo(i,14),n.lineTo(i-e*8,8),n.lineTo(i-e*8,20),n.fill()}}n.fillStyle=`#fff`,n.fillRect(o-1,11,2,9),n.fillStyle=`rgba(3, 14, 30, .95)`,n.fillRect(o-15,0,30,11),n.fillStyle=`#fff`,n.font=`700 10px system-ui, sans-serif`,n.fillText(`${String(Math.round(c+360)%360).padStart(3,`0`)}°`,o,9.5)}},wS=e=>e==null?``:e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} km`:`${Math.round(e/10)*10} m`,TS=e=>{if(!(e>=0))return`0:00`;let t=Math.floor(e/60),n=Math.floor(e%60);return t>=60?`${Math.floor(t/60)}:${String(t%60).padStart(2,`0`)}:${String(n).padStart(2,`0`)}`:`${t}:${String(n).padStart(2,`0`)}`},ES=new Set([`Cloudy midday`,`Overcast morning`,`Midday stormy`,`Stormy evening`,`Hazy midday`]),DS=()=>[`mike`,`liddell`].join(`.`)+`@`+[`gmail`,`com`].join(`.`),OS=class{constructor(e,t,{storage:n=globalThis.localStorage}={}){this.api=e,this.storage=n,this.on=t===`casual`;let r=new URLSearchParams(globalThis.location?.search??``).get(`controls`),i=e=>[`tilt`,`hybrid`,`buttons`,`mouse`,`touchpad`].includes(e)?e:null,a=(()=>{try{return!!globalThis.matchMedia?.(`(pointer: fine)`).matches}catch{return!1}})()?`mouse`:`buttons`;this.controls=i(r)??(()=>{try{return i(n?.getItem(`surfski.controls`))??a}catch{return a}})(),this.tilt=new Lx(Fx(n)),this.lastSteer=null,this.lastW=null,this.lastSend=0,this.rateW=null,this.mouse=new rS(Bx(n)),this.mouse.onCalibrate=()=>this.calibrateMouse(),this.touchpad=new rS(Ux(n),{touch:!0}),this.battery=hS(n),document.head.appendChild(Q(`style`,{},xS)),this.buildTop(),this.buildMenu(),this.buildPop(),this.pad=new SS(this.tilt,()=>this.tapPad()),document.body.appendChild(this.pad.cv),this.hint=Q(`div`,{id:`cHint`,onclick:()=>{document.body.classList.remove(`hintportrait`);try{n?.setItem(`surfski.hintportrait`,`1`)}catch{}}},`Turn your phone sideways for the best view of the sea`,Q(`div`,{style:`font-size:12px;opacity:.7;margin-top:6px`},`tap to close`)),document.body.appendChild(this.hint);let o=document.querySelector(`#intro .btns`);o&&(this.introP=Q(`p`,{class:`cIntro`},``),o.before(this.introP)),this.apply()}controlWords(e=this.controls){return{touchpad:`a finger on the pad: up for power, sideways to steer`,mouse:`click the pad, then move: up for power, sideways to steer`,tilt:`turn the phone like a wheel to steer, tip it away for power`,hybrid:`turn the phone like a wheel to steer · ▲ ▼ power`}[e]??`◀ ▶ steer · ▲ more power · ▼ ease off`}save(){try{this.storage?.setItem(_S,this.on?`casual`:`full`),this.storage?.setItem(`surfski.controls`,this.controls)}catch{}}apply(){let e=document.body,t=this.controls,n=t===`tilt`||t===`hybrid`;e.classList.toggle(`casual`,this.on),e.classList.toggle(`tiltmode`,n),e.classList.toggle(`hybrid`,t===`hybrid`),e.classList.toggle(`mousemode`,t===`mouse`),e.classList.toggle(`touchmode`,t===`touchpad`);let r=!1;try{r=this.storage?.getItem(`surfski.hintportrait`)===`1`}catch{}if(e.classList.toggle(`hintportrait`,this.on&&!r),this.on){let t=this.help();this.api.quiet?.(`guide`,t.guide),this.api.quiet?.(`coaching`,t.coaching),e.classList.contains(`cmap`)||this.api.setInset?.(`Off`)}t!==`tilt`&&this.lastW!=null&&(this.api.fp()?.setPower(null),this.lastW=null),t!==`mouse`&&this.mouse.release(),t!==`touchpad`&&this.touchpad.release(),n||(this.lastSteer!=null&&this.api.fp()?.setSteer(0),this.lastSteer=null,this.tilt.stop()),this.api.onExperience?.(this.on),this.introP&&(this.introP.textContent=`Tap ▶ to start · ${this.controlWords()} · ☰ courses and settings · 🕹 controls`),this.syncGui?.()}setOn(e){this.on=e,this.save(),this.apply()}help(){try{return{guide:!1,coaching:!1,...JSON.parse(this.storage?.getItem(`surfski.casualHelp`)??`{}`)}}catch{return{guide:!1,coaching:!1}}}setBattery(e){this.battery=!!e,gS(this.storage,this.battery),this.api.onBattery?.(this.battery)}setHelp(e,t){let n={...this.help(),[e]:t};try{this.storage?.setItem(`surfski.casualHelp`,JSON.stringify(n))}catch{}e===`guide`?this.api.setGuide(t):this.api.setCoaching(t)}setControls(e){this.controls=e,this.save(),this.apply(),this.api.rehint?.(),(e===`tilt`||e===`hybrid`)&&this.tilt.status!==`on`&&this.tapPad().then(()=>this.refresh()),this.refresh()}refresh(){document.body.classList.contains(`cmenu`)&&this.fillMenu(),document.body.classList.contains(`ctlpop`)&&this.fillPop(),this.tab?.isConnected&&this.fillControlsTab(this.tab.parentNode)}buildTop(){let e=this.api;this.bPlay=Q(`button`,{class:`cb`,title:`Pause or resume`,onclick:()=>e.togglePlay()},`▶`),this.bFull=Q(`button`,{class:`cb`,title:`Full screen`,onclick:()=>{if(e.fullscreen(),this.controls===`tilt`)try{screen.orientation?.lock?.(`landscape`).catch(()=>{})}catch{}}},`⛶`),pS()&&(this.bFull.style.display=`none`),this.bSound=Q(`button`,{class:`cb`,title:`Sound on or off`,onclick:()=>{e.toggleSound(),this.bSound.textContent=e.soundOn()?`🔊`:`🔇`}},`🔊`),this.bMap=Q(`button`,{class:`cb`,title:`Map`,onclick:()=>this.toggleMap()},`🗺`);let t=Q(`button`,{class:`cb`,title:`Menu`,onclick:()=>this.openMenu()},`☰`),n=Q(`button`,{class:`cb`,title:`Controls`,onclick:()=>this.togglePop()},`🕹`);this.top=Q(`div`,{id:`cTop`},t,this.bMap,Q(`div`,{class:`gap`}),n,this.bPlay,this.bFull,this.bSound),document.body.appendChild(this.top),this.buildInst()}buildInst(){let e=document.getElementById(`power`);if(!e)return;this.cmp=new CS,this.iAvg=Q(`span`,{class:`l`},``),this.iRight=Q(`span`,{class:`r`},``),e.prepend(Q(`div`,{class:`cCmpRow`},this.iAvg,this.cmp.cv,this.iRight));let t=e.querySelector(`.row`);this.iW=Q(`span`,{class:`cVal`,id:`cW`},``),this.iWave=Q(`span`,{class:`cVal`,id:`cWave`,title:`The waves' power on the boat (+ pushing, − holding back)`},``),this.iRes=Q(`span`,{class:`cVal`,id:`cResv`,title:`Reserve: the sprint energy left (it drains above the critical power and comes back below it)`},``),this.iSpd=Q(`span`,{class:`cVal`,id:`cSpd`},Q(`b`,{},`0.0`),Q(`small`,{},`mph
– fps`)),t?.append(this.iW,this.iWave,this.iRes,this.iSpd),this.iT=0}toggleMap(e=!document.body.classList.contains(`cmap`)){document.body.classList.toggle(`cmap`,e),this.bMap.classList.toggle(`on`,e),this.api.setInset?.(e?`Map`:`Off`)}buildMenu(){this.menu=Q(`div`,{id:`cMenu`}),document.body.appendChild(this.menu)}openMenu(){this.wasLive=this.api.isLive(),this.wasLive&&this.api.togglePlay(),this.fillMenu(),document.body.classList.add(`cmenu`)}closeMenu(e=!0){document.body.classList.remove(`cmenu`),e&&(this.wasLive||this.api.isStart())&&(this.api.isLive()||this.api.togglePlay())}fillMenu(){let e=this.api,t=e.current(),n=this.menu;n.textContent=``;let r=(e,t,n,r=null,i=!1)=>Q(`button`,{class:`chip${t?` on`:``}${i?` dim`:``}`,onclick:()=>{n(),this.fillMenu()}},e,...r?[r]:[]),i=(e,t,n)=>{let r=Q(`select`,{});return r.append(...e),r.value=t??``,r.addEventListener(`change`,()=>n(r.value)),r},a=(e,t)=>Q(`option`,{value:e},t),o=Q(`div`,{class:`secs`}),s=(e,...t)=>{o.append(Q(`section`,{},Q(`h3`,{},e),...t))};n.append(Q(`button`,{class:`x`,onclick:()=>this.closeMenu(!0)},`✕`)),n.append(Q(`div`,{class:`big`},Q(`button`,{onclick:()=>this.closeMenu(!0)},e.isStart()?`▶ Paddle`:`▶ Resume`),Q(`button`,{class:`alt`,onclick:()=>{e.restart(),this.closeMenu(!1)}},`↺ Restart`)));let c=new Map;for(let t of e.courses())c.has(t.place)||c.set(t.place,[]),c.get(t.place).push(t);s(`Course`,i([...c].map(([t,n])=>{let r=Q(`optgroup`,{label:e.placeLabel(t)});return r.append(...n.map(e=>{let t=bS[e.id];return a(e.name,`${e.short??e.label}${t===`fewer`?` (fewer boats)`:t===`heavy`?` (heavy)`:``}`)})),r}),t.course,t=>{bS[e.courses().find(e=>e.name===t)?.id]===`heavy`&&!confirm(`This course is heavy for a phone and may run slowly. Load it anyway?`)||e.pickCourse(t),this.fillMenu()})),s(`Sea`,i(e.seas().map(e=>a(e.id,e.name)),t.sea,t=>{e.pickSea(t),this.fillMenu()})),s(`Time and weather`,i(e.weathers().filter(e=>!ES.has(e)||e===t.weather).map(e=>a(e,e===`As designed`?`As the course has it`:e)),t.weather,t=>{e.pickWeather(t),this.fillMenu()})),s(`Paddler`,Q(`div`,{class:`row`},...e.paddlers().map(n=>r(n,n===t.paddler,()=>e.pickPaddler(n))))),s(`Competitors`,Q(`div`,{class:`row`},...[0,1,2,3,4].map(n=>r(n===0?`None`:String(n),n===t.field,()=>e.pickField(n))))),s(`Help on the water`,Q(`div`,{class:`row`},r(`Guide arrow`,t.guide,()=>this.setHelp(`guide`,!t.guide)),r(`Coach`,t.coaching,()=>this.setHelp(`coaching`,!t.coaching)),r(`Autopilot`,t.autopilot,()=>e.setAutopilot(!t.autopilot))),Q(`div`,{class:`note`},`The guide, the coach and the autopilot use the route planner, which costs the phone time each frame.`)),s(`Controls`,Q(`div`,{class:`row`},...this.schemes().map(([e,t])=>r(t,this.controls===e,()=>this.setControls(e)))),Q(`div`,{class:`note`},`Settings for each: the 🕹 button at the top.`)),s(`Sound`,Q(`div`,{class:`row`},r(e.soundOn()?`🔊 On`:`🔇 Off`,e.soundOn(),()=>{e.toggleSound(),this.bSound.textContent=e.soundOn()?`🔊`:`🔇`})),(()=>{let t=Q(`input`,{type:`range`,min:`0`,max:`100`,step:`5`});return t.value=String(e.volume()),t.addEventListener(`input`,()=>e.setVolume(Number(t.value))),Q(`label`,{class:`sl`},`Volume`,t,Q(`span`,{},``))})()),s(`Frame rate`,Q(`div`,{class:`row`},r(`Battery mode (30 fps lock)`,this.battery,()=>this.setBattery(!this.battery))),Q(`div`,{class:`note`},this.battery?`Locked at 30 frames a second: a cooler phone and a longer battery.`:`Up to 60 frames a second at full sharpness; effects are cut first if the phone cannot keep up.`)),n.append(o,this.developerSection())}developerSection(){let e=this.api,t=(e,t,n)=>Q(`button`,{class:`chip${t?` on`:``}`,onclick:()=>{n(),this.fillMenu()}},e),n=Q(`details`,{},Q(`summary`,{},`Developer`)),r=(e,...t)=>n.append(Q(`h3`,{},e),...t);r(`Reports`,Q(`div`,{class:`row`},t(`Measure performance (2 min)`,!1,()=>{this.closeMenu(!1),globalThis.__perfProbe?.()}),t(`Send to dev`,!1,()=>this.sendReport()),t(`Copy report`,!1,()=>globalThis.__dbg?.copy(t=>e.toast?.(t?`Report copied`:`Copy failed`))),t(this.showMsgs?`Hide messages`:`Show messages`,!!this.showMsgs,()=>{this.showMsgs=!this.showMsgs}),t(`Save sound report`,!1,()=>globalThis.__dbg?.saveSound())),...this.showMsgs?[Q(`pre`,{class:`msgs`},globalThis.__dbg?.report?.()??`no report`)]:[],Q(`div`,{class:`note`},`Measure runs about 2 minutes from a fresh start (leave it running). Send to dev opens an email to the developer with the report (the build, the device, every message and the last measurement) for you to send; it is also copied.`));let i=e.deviceTier?.()??{};r(`Device profile`,Q(`div`,{class:`row`},...[[`auto`,`Automatic`],[`phone`,`Phone`],[`tablet`,`Tablet`],[`desktop`,`Desktop`]].map(([n,r])=>t(r,(i.kept??`auto`)===n,()=>e.setDevice?.(n)))),Q(`div`,{class:`note`},`Now: ${i.tier??`?`} (${i.why??``}). A change applies after a reload.`)),r(`Water mesh`,Q(`div`,{class:`row`},...[`Low`,`Draft`,`Standard`].map(n=>t(n,e.quality?.()===n,()=>e.setQuality?.(n)))));let a=new Set(fS());return r(`Speed-ups (on by default)`,...Object.entries(lS).map(([n,r])=>Q(`div`,{class:`row`},t(`${uS(n)?`✓`:`✗`} ${r}`,!a.has(n),()=>{let t=new Set(fS());t.has(n)?t.delete(n):t.add(n),dS([...t]),e.toast?.(`Applies after a reload`)}))),Q(`div`,{class:`row`},t(`Reload now`,!1,()=>location.reload()))),r(`Experience`,Q(`div`,{class:`row`},t(`Full experience: all settings, the inset, the sea editor`,!1,()=>{this.setOn(!1),this.closeMenu(!1),e.openFull()}))),n}sendReport(){let e=globalThis.__dbg?.report?.()??`no report`;try{globalThis.__dbg?.copy?.()}catch{}e.length>4e4&&(e=`${e.slice(0,3e3)}\n…\n${e.slice(-36800)}`),location.href=`mailto:${DS()}?subject=Surfski%20sim%20report&body=${encodeURIComponent(`${e}\n\n(The whole report is also on the clipboard.)`)}`}tiltSettings(){let e=this.tilt.s,t=[Q(`div`,{class:`note`},`Hold the phone as you like and tap the white dot to make that neutral. Tip the top edge away for more power, back for less; turn it like a steering wheel for the rudder. ${this.tilt.status===`on`?``:`Tilt: ${this.tilt.status}.`} On an iPhone, turn on the rotation lock so the screen does not flip.`)],n=(t,n,r,i,a,o=`°`)=>{let s=Q(`input`,{type:`range`,min:String(r),max:String(i),step:String(a)}),c=Q(`span`,{},`${e[t]}${o}`);return s.value=String(e[t]),s.addEventListener(`input`,()=>{e[t]=Number(s.value),c.textContent=`${e[t]}${o}`,this.tilt.save()}),Q(`label`,{class:`sl`},n,s,c)},r=(t,n)=>Q(`button`,{class:`chip${e[t]?` on`:``}`,onclick:()=>{e[t]=!e[t],this.tilt.save(),this.refresh()}},n);return t.push(n(`deadPow`,`Power dead zone`,0,10,.5),n(`maxPow`,`Power full at`,8,45,1),n(`curvePow`,`Power curve`,1,3,.1,``),n(`deadSteer`,`Rudder dead zone`,0,10,.5),n(`maxSteer`,`Rudder full at`,8,60,1),n(`curveSteer`,`Rudder curve`,1,3,.1,``),n(`smoothS`,`Smoothing`,.02,.5,.02,` s`),Q(`div`,{class:`row`},r(`invPow`,`Invert power`),r(`invSteer`,`Invert rudder`),r(`roll`,`Roll axis (shown only)`),Q(`button`,{class:`chip${e.powerMode===`rate`?` on`:``}`,onclick:()=>{e.powerMode=e.powerMode===`rate`?`absolute`:`rate`,this.tilt.save(),this.refresh()}},e.powerMode===`rate`?`Power: tip to climb (rate)`:`Power: tip sets it (absolute)`),Q(`button`,{class:`chip`,onclick:()=>{Object.assign(e,Sx),this.tilt.save(),this.refresh()}},`Defaults`),Q(`button`,{class:`chip`,onclick:()=>{this.tilt.setNeutral()}},`Set neutral now`))),e.roll&&t.push(n(`deadRoll`,`Roll dead zone`,0,10,.5),n(`maxRoll`,`Roll full at`,8,45,1),Q(`div`,{class:`row`},r(`invRoll`,`Invert roll`))),t}schemes(){let e=globalThis.navigator??{},t=e=>{try{return!!globalThis.matchMedia?.(e).matches}catch{return!1}},n=(e.maxTouchPoints??0)>0,r=t(`(any-pointer: fine)`)||!n,i=n&&`DeviceOrientationEvent`in globalThis,a=[[`buttons`,n&&!r?`Buttons`:`Keys`]];return(r||this.controls===`mouse`)&&a.push([`mouse`,`Mouse / trackpad`]),(n||this.controls===`touchpad`)&&a.push([`touchpad`,`Touch pad`]),(i||this.controls===`tilt`)&&a.push([`tilt`,`Tilt`]),(i||this.controls===`hybrid`)&&a.push([`hybrid`,`Tilt rudder, button power`]),a}controlsSection(){let e=[Q(`div`,{class:`row`},...this.schemes().map(([e,t])=>Q(`button`,{class:`chip${this.controls===e?` on`:``}`,onclick:()=>this.setControls(e)},t)))],t=this.controls===`tilt`||this.controls===`hybrid`,n={tilt:`Tip the top edge away for more power, back for less; turn the phone like a steering wheel to steer.`,hybrid:`Turn the phone like a steering wheel to steer; ▲ ▼ for the power.`,touchpad:`One finger on the pad: up and down for the power, sideways to steer. Lift it to let go.`,mouse:`Click in the zone; move for power (up and down) and rudder (sideways).`,buttons:(this.schemes()[0][1],`◀ ▶ steer · ▲ more power · ▼ ease off (and into a brace)`)}[this.controls];e.push(Q(`div`,{class:`note`},n??``)),t&&this.tilt.status!==`on`&&e.push(Q(`button`,{class:`bigbtn`,onclick:async()=>{await this.tapPad(),this.refresh()}},this.tilt.status===`denied`?`Tilt was not allowed: try again`:`Allow tilt (the motion sensor)`));let r=t?this.tiltSettings():this.controls===`mouse`?this.mouseSettings():this.controls===`touchpad`?this.touchSettings():null;return r&&e.push(Q(`details`,{class:`ctlMore`},Q(`summary`,{},`Adjust`),...r)),e}mouseSettings(){let e=this.mouse,t=e.s,n=[Q(`div`,{class:`note`},`Click in the zone to steer (the pointer is captured: your finger or the mouse moves the yellow dot; Calibrate fits the zone to your trackpad or mouse area, of which it spans the share set below): up and down are the power settings, as the arrow keys step them (brace 3 at the bottom, the glide at 0, tempo 4 on the bright line, 7 at the top), each a detent; left and right of the centre are the rudder, full at the edge. Click anywhere, or Esc, to let go: the rudder centres and the power stays where it was. Drag the tab on its top edge to move it.`)],r=(n,r,i,a,o,s=`%`)=>{let c=Q(`input`,{type:`range`,min:String(i),max:String(a),step:String(o)}),l=Q(`span`,{},`${t[n]}${s}`);return c.value=String(t[n]),c.addEventListener(`input`,()=>{t[n]=Number(c.value),l.textContent=`${t[n]}${s}`,n===`scale`?(e.placeT=-1,e.place()):n===`aspect`&&e.resize(),e.save()}),Q(`label`,{class:`sl`},r,c,l)},i=(n,r)=>Q(`button`,{class:`chip${t[n]?` on`:``}`,onclick:()=>{t[n]=!t[n],e.save(),this.refresh()}},r),a=Q(`button`,{class:`chip`,onclick:()=>this.calibrateMouse()},`Calibrate: fit my trackpad or mouse area`);return n.push(Q(`div`,{class:`row`},a,i(`lock`,`Capture the pointer`)),r(`fitShare`,`Zone spans (of the area)`,.3,1,.02,``),r(`gain`,`Pointer speed`,.05,3,.01,`×`),r(`scale`,`Height (× the instruments)`,1,3,.1,`×`),r(`aspect`,`Width : height`,.5,2.5,.05,``),r(`snap`,`Power detents`,0,.45,.05,``),r(`deadSteer`,`Rudder dead zone`,0,25,1),r(`curveSteer`,`Rudder curve`,1,3,.1,``),r(`smoothS`,`Smoothing`,0,.3,.01,` s`),Q(`div`,{class:`row`},i(`invSteer`,`Invert rudder`),Q(`button`,{class:`chip`,onclick:()=>{t.pos=null,e.placeT=-1,e.save()}},`Back to its place`),Q(`button`,{class:`chip`,onclick:()=>{Object.assign(t,zx),e.placeT=-1,e.place(),e.save(),this.refresh()}},`Defaults`))),n}touchSettings(){let e=this.touchpad,t=e.s,n=[Q(`div`,{class:`note`},`Up and down are the power settings (brace 3 at the bottom, the glide at 0, tempo 4 on the bright line, 7 at the top), each a detent; left and right of the centre the rudder. Lifting the finger centres the rudder and keeps the power. Drag the tab on its top edge to move the pad.`)],r=(n,r,i,a,o,s=`%`)=>{let c=Q(`input`,{type:`range`,min:String(i),max:String(a),step:String(o)}),l=Q(`span`,{},`${t[n]}${s}`);return c.value=String(t[n]),c.addEventListener(`input`,()=>{t[n]=Number(c.value),l.textContent=`${t[n]}${s}`,n===`sizeL`||n===`sizeP`?(e.placeT=-1,e.place()):n===`aspect`&&e.resize(),e.save()}),Q(`label`,{class:`sl`},r,c,l)};return n.push(r(`sizeL`,`Size, landscape (of the height)`,.3,.85,.05,``),r(`sizeP`,`Size, portrait (of the width)`,.25,.8,.05,``),r(`aspect`,`Width : height`,.5,2,.05,``),r(`snap`,`Power detents`,0,.45,.05,``),r(`deadSteer`,`Rudder dead zone`,0,25,1),r(`curveSteer`,`Rudder curve`,1,3,.1,``),r(`smoothS`,`Smoothing`,0,.3,.01,` s`),Q(`div`,{class:`row`},((n,r)=>Q(`button`,{class:`chip${t[n]?` on`:``}`,onclick:()=>{t[n]=!t[n],e.save(),this.refresh()}},r))(`invSteer`,`Invert rudder`),Q(`button`,{class:`chip`,onclick:()=>{t.pos=null,e.placeT=-1,e.save()}},`Back to its place`),Q(`button`,{class:`chip`,onclick:()=>{Object.assign(t,Hx),e.placeT=-1,e.place(),e.save(),this.refresh()}},`Defaults`))),n}calibrateMouse(){let e=this.mouse;this.api.isLive()&&this.api.togglePlay(),this.togglePop(!1),e.onFit=t=>{this.api.toast?.(t?`Calibrated: the zone is the area's shape (${e.s.aspect.toFixed(2)} wide to 1 high) and ${Math.round((e.s.fitShare??.66)*100)}% of the area spans it. Space to go on.${t.rawMove?``:` (The browser gave the accelerated movement: move at an even pace.)`}`:`Not calibrated`),this.refresh()},e.calibrate()}buildPop(){this.pop=Q(`div`,{id:`ctlPop`}),document.body.appendChild(this.pop);let e=document.getElementById(`toolbar`);e&&e.insertBefore(Q(`button`,{id:`tbControls`,title:`Controls: keys, mouse or trackpad, tilt`,onclick:()=>this.togglePop()},`🕹 Controls`),document.getElementById(`tbFull`)),addEventListener(`pointerdown`,e=>{document.body.classList.contains(`ctlpop`)&&!this.pop.contains(e.target)&&!e.target.closest?.(`#tbControls, #cTop .cb`)&&this.togglePop(!1)},!0),addEventListener(`keydown`,e=>{e.key===`Escape`&&document.body.classList.contains(`ctlpop`)&&this.togglePop(!1)})}togglePop(e=!document.body.classList.contains(`ctlpop`)){let t=document.querySelector(`#sidePanel .tabs button[data-tab=controls]`);!this.on&&t&&e?t.click():(document.body.classList.toggle(`ctlpop`,e),e&&this.fillPop())}fillControlsTab(e){e&&(this.tab||=Q(`div`,{id:`ctlTab`}),this.tab.parentNode!==e&&e.prepend(this.tab),this.tab.textContent=``,this.tab.append(Q(`h3`,{},`Control scheme`),...this.controlsSection()))}fillPop(){let e=this.pop;e.textContent=``,e.append(Q(`button`,{class:`x`,title:`Close`,onclick:()=>this.togglePop(!1)},`✕`),Q(`h3`,{},`Controls`),...this.controlsSection())}async tapPad(){let e=this.tilt;e.status===`on`?(e.setNeutral(),this.api.toast?.(`Tilt: neutral set here`)):(await e.start(),e.status===`denied`&&this.api.toast?.(`Tilt was not allowed: open the controls (🕹) to try again; the buttons still work`))}updateMouse(e,t=this.mouse){let n=t.sample(e),r=this.api.fp(),i=this.api.prof(),a=performance.now();if(t.engaged&&!t.was&&(this.lastW=null,this.lastSteer=null,this.lastBrace=null),t.was=t.engaged,r&&i&&this.api.isLive()){if(t.engaged&&a-this.lastSend>50){let e=Px(Math.max(-1,Math.min(1,n.steer)),.05);if(e!==this.lastSteer&&(r.setSteer(e),this.lastSteer=e,this.lastSend=a),n.level<=-.5){let e=Math.round(-n.level);e!==this.lastBrace&&(r.setBrace(e),this.lastBrace=e,this.lastW=null,this.lastSend=a)}else{let e=n.level<=0?0:Px(Bd(n.level,i._0xbd9c94,dh),4);e!==this.lastW&&(r.setPower(e),this.lastW=e,this.lastBrace=null,this.lastSend=a)}}else!t.engaged&&this.lastSteer!=null&&(this.lastSteer&&r.setSteer(0),this.lastSteer=null)}r&&i&&!t.engaged&&(t.follow={level:r.mode===`brace`?-(r.braceLevel||1):r.mode===`paddle`?zd(r.target,i._0xbd9c94,dh):0,steer:r.steerIn??0}),t.draw()}update(e,t){if(this.controls===`mouse`)this.updateMouse(t);else if(this.controls===`touchpad`)this.updateMouse(t,this.touchpad);else if(this.controls!==`buttons`){let e=this.tilt.sample(t),n=this.api.fp(),r=this.api.prof(),i=performance.now(),a=this.controls===`hybrid`;if(n&&r&&this.api.isLive()&&this.tilt.status===`on`&&i-this.lastSend>50){let o=Px(Math.max(-1,Math.min(1,e.steer)),.05),s;this.tilt.s.powerMode===`rate`?(this.rateW=Math.max(0,Math.min(r.maxW,(this.rateW??r._0xbd9c94)+e.power*this.tilt.s.rateWps*t)),s=this.rateW):s=Nx(Math.max(-1,Math.min(1,e.power)),r._0xbd9c94,r.maxW),s=Px(s,4),o!==this.lastSteer&&(n.setSteer(o),this.lastSteer=o,this.lastSend=i),!a&&s!==this.lastW&&(n.setPower(s),this.lastW=s,this.lastSend=i)}this.pad.draw()}if(!this.on||!e)return;let n=this.api.isLive();n!==this.lastLive&&(this.lastLive=n,this.bPlay.textContent=n?`⏸`:`▶`),this.iT=(this.iT+1)%2,this.iT===0&&this.cmp.draw(e.headingDeg,e.nav?e.nav.rel:null);let r=performance.now();if(r-(this.iLast??0)<100)return;this.iLast=r;let i=(e,t)=>{e.textContent!==t&&(e.textContent=t)},a=this.api.fp(),o=a?.ski,s=e.elapsed??0,c=o&&s>3?(o.distance??0)/s:null;i(this.iAvg,c==null?`⌀ – mph`:`⌀ ${(c*vS).toFixed(1)} mph`);let l=e.nav?.remainingM??null;i(this.iRight,`${TS(s)}${l==null?o?` · ${wS(o.distance)}`:``:` · ${wS(l)}`}`);let u=a?.mode===`brace`?a.braceLevel||1:0;i(this.iW,u?`brace ${u}`:`${Math.round(Math.max(0,e.power??0))} W`);let d=e.waterW;if(i(this.iWave,d==null?`🌊 –`:`🌊 ${d>=0?`+`:`−`}${Math.round(Math.abs(d))} W`),e.reserve!=null){let t=Math.round(e.reserve*100);i(this.iRes,`res ${t}%`),this.iRes.style.color=t>50?`#7fe3a5`:t>20?`#ffc247`:`#ff7a5c`}i(this.iSpd.firstChild,(e.sog*vS).toFixed(1)),i(this.iSpd.lastChild,`mph\n${Math.round(this.api.fpsNow()||0)} fps`)}};function kS(e,t){let n={casual:t.on},r=e.add(n,`casual`).name(`Casual phone experience`).onChange(e=>t.setOn(e));return t.syncGui=()=>{n.casual=t.on,r.updateDisplay()},r}var AS=e=>Math.round(e*10)/10,jS=(e,t)=>e[Math.min(e.length-1,Math.max(0,Math.floor(e.length*t)))];function MS(e){let t=e.length;if(!t)return null;let n=e.map(e=>e[0]).sort((e,t)=>e-t),r=n.reduce((e,t)=>e+t,0)/t,i=e.reduce((e,t)=>e+t[1],0)/t,a=e.reduce((e,t)=>e+(t[3]??0),0)/t,o={};for(let n of e)for(let e in n[2])o[e]=(o[e]??0)+n[2][e]/t;let s=(e,r)=>Math.round(100*n.filter(t=>t>e&&t<=r).length/t);return{n:t,fps:AS(1e3/r),ms:AS(r),p10:AS(jS(n,.1)),p50:AS(jS(n,.5)),p90:AS(jS(n,.9)),max:AS(n[t-1]),page:AS(i),steps:AS(a),st:o,bands:{"≤20":s(0,20),"≤37":s(20,37),"≤54":s(37,54),">54":s(54,1/0)}}}function NS(e,t=5,n=.3,r=[`renderScene total`]){return Object.entries(e).filter(([e,t])=>t>=n&&!r.includes(e)).sort((e,t)=>t[1]-e[1]).slice(0,t).map(([e,t])=>`${e} ${AS(t)}`).join(`, `)}var PS=e=>Object.entries(e).map(([e,t])=>`${e}:${t}%`).join(` `);function FS(e,{min:t=50,depth:n=2,budget:r=4e3}={}){let i={},a=new Set,o=0,s=e=>Array.isArray(e)||ArrayBuffer.isView(e)?e.length:e instanceof Map||e instanceof Set?e.size:null,c=e=>!e||typeof e!=`object`||e.isObject3D||e.isMaterial||e.isBufferGeometry||e.isTexture||e.isWebGLRenderTarget||e.isWebGLRenderer||typeof Node<`u`&&e instanceof Node||typeof WebGL2RenderingContext<`u`&&e instanceof WebGL2RenderingContext||ArrayBuffer.isView(e),l=(e,n,u)=>{if(!(o>r||c(e)||a.has(e))){a.add(e);for(let a of Object.keys(e)){if(++o>r)return;let c;try{c=e[a]}catch{continue}let d=s(c),f=`${n}.${a}`;d==null?u>0&&c&&typeof c==`object`&&l(c,f,u-1):(d>=t&&(i[f]=d),Array.isArray(c)&&c.length&&u>0&&c[0]&&typeof c[0]==`object`&&!Array.isArray(c[0])&&l(c[0],`${f}[0]`,u-1))}}};for(let[r,a]of Object.entries(e)){o=0;let e=s(a);e==null?l(a,r,n):e>=t&&(i[r]=e)}return i}function IS(e,t,{minGrowth:n=50,n:r=6}={}){return Object.entries(e).map(([e,n])=>[e,n,t[e]??0]).filter(([,e,t])=>e-t>=n).sort((e,t)=>t[1]-t[2]-(e[1]-e[2])).slice(0,r).map(([e,t,n])=>`${e} ${n}→${t}`).join(`, `)}var LS=(e,t=6)=>Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,t).map(([e,t])=>`${e} ${t}`).join(`, `);function RS(){let e=()=>{let e=performance.now(),t=0;for(let e=1;e<3e6;e++)t+=Math.sqrt(e)*Math.sin(e*.001);return globalThis.__cpuSink=t,performance.now()-e};return Math.min(e(),e())}function zS(e,t){let n=new e.WebGLRenderTarget(1024,1024),r=new e.OrthographicCamera(-1,1,1,-1,0,1),i=new e.Scene,a=new e.ShaderMaterial({uniforms:{uK:{value:0}},vertexShader:`void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`uniform float uK; void main() { vec2 p = gl_FragCoord.xy * 0.01 + uK; float s = 0.0; for (int i = 0; i < 256; i++) { s += sin(p.x + float(i) * 0.1) * cos(p.y - s * 0.01); p += 0.013; } gl_FragColor = vec4(s * 0.01, 0.0, 0.0, 1.0); }`});i.add(new e.Mesh(new e.PlaneGeometry(2,2),a));let o=t.getContext(),s=()=>{let e=t.getRenderTarget();o.finish();let s=performance.now();t.setRenderTarget(n);for(let e=0;e<12;e++)a.uniforms.uK.value=e,t.render(i,r);o.finish();let c=performance.now()-s;return t.setRenderTarget(e),c};return s(),s}function BS(e){let t={on:!1,renders:0,calls:0,targets:0},n=e.render.bind(e),r=e.setRenderTarget.bind(e);return e.render=(...r)=>{let i=n(...r);return t.on&&(t.renders++,t.calls+=e.info.render.calls),i},e.setRenderTarget=(...n)=>(t.on&&n[0]!==e.getRenderTarget()&&t.targets++,r(...n)),t.reset=()=>{t.renders=0,t.calls=0,t.targets=0},t}async function VS(e=globalThis.navigator,t=globalThis.matchMedia){let n=[];try{let t=await e.getBattery?.();n.push(t?`battery ${Math.round(t.level*100)}% ${t.charging?`charging`:`not charging`}`:`battery unknown (no Battery API: Safari)`)}catch{n.push(`battery unknown`)}n.push(`${e.hardwareConcurrency??`?`} cores`),e.deviceMemory&&n.push(`${e.deviceMemory} GB`),e.connection?.saveData&&n.push(`data saver on`);try{t?.(`(prefers-reduced-motion: reduce)`).matches&&n.push(`reduced motion on (iOS: also set by Low Power Mode on some versions)`)}catch{}return n.push(`page ${globalThis.document?.visibilityState??`?`}`),n.join(`, `)}function HS(e){return e<11?`120 Hz`:e<22?`60 Hz`:e<40?`capped near 30 fps (Battery mode, iOS Low Power Mode, or every frame slow)`:`slow frames only`}var US=[[.72,1.5],[.35,.72],[.13,.35],[.05,.13],[.0245,.05],[.012,.0245],[.006,.012],[.003,.006]].map(([e,t])=>[e,t,40*e]),WS=2*Math.PI,GS=typeof location<`u`&&new URLSearchParams(location.search).get(`fftfloat`)===`1`?G:sn;function KS(e=5,{fp:t=null,spread:n=1}={}){let r=2048,i=new Float32Array(r*256*4),a=e>>>0,o=()=>{a=a+1831565813>>>0;let e=a;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},s=()=>Math.sqrt(-2*Math.log(1-o()*.999999))*Math.cos(WS*o());for(let e=0;e<8;e++){let[a,o,c]=US[e],l=WS/o,u=WS/a,d=new Float32Array(65536),f=new Float32Array(65536),p=0;for(let e=0;e<256;e++)for(let r=0;r<256;r++){let i=(r>=128?r-256:r)*WS/c,a=(e>=128?e-256:e)*WS/c,o=Math.hypot(i,a),p=e*256+r;if(o<l*.8||o>u*1.2)continue;let m=Math.log(o),h=Math.min(1,Math.max(0,(m-Math.log(l*.8))/Math.log(1.25)))*Math.min(1,Math.max(0,(Math.log(u*1.2)-m)/Math.log(1.2))),g=eo(Math.atan2(-a,-i),oo(o,t,n)),_=o**-4*h*g,v=Math.sqrt(_/2);d[p]=s()*v,f[p]=s()*v}for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=(t>=128?t-256:t)*WS/c,r=(e>=128?e-256:e)*WS/c,i=e*256+t,a=(256-e)%256*256+(256-t)%256;p+=(n*n+r*r)*(d[i]*d[i]+f[i]*f[i]+d[a]*d[a]+f[a]*f[a])}let m=p>0?Math.sqrt(.5/p):0;for(let t=0;t<256;t++)for(let n=0;n<256;n++){let a=t*256+n,o=(256-t)%256*256+(256-n)%256,s=4*(t*r+e*256+n);i[s]=d[a]*m,i[s+1]=f[a]*m,i[s+2]=d[o]*m,i[s+3]=-f[o]*m}}return i}var qS=`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,JS=`precision highp float; precision highp sampler2D; precision highp int;
const int N = 256; const float TAU = 6.2831853;
layout(location = 0) out highp vec4 oA;
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
`,YS=JS+`
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
}`,XS=JS+`
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
}`,ZS=JS+`
layout(location = 1) out highp vec4 oM;
uniform sampler2D uSrc; uniform int uCascade;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
vec4 z = texelFetch(uSrc, ivec2(uCascade * N + p.x, p.y), 0);
vec2 s = z.xy;
oA = vec4(s, z.z, 0.0);
oM = vec4(s.x * s.x, s.y * s.y, s.x * s.y, 0.0);
}`,QS=class{constructor(e,t){this.renderer=e,this.water=t,this.first=!0;let n=new Kr(256,256,8,{count:2,type:sn,format:i,depthBuffer:!1,stencilBuffer:!1,minFilter:_e,magFilter:_t,generateMipmaps:!0,wrapS:Gt,wrapT:Gt}),r=typeof location<`u`&&Number(new URLSearchParams(location.search).get(`aniso`))||2;for(let e of n.textures)e.anisotropy=r,e.wrapR=Lt,e.wrapS=e.wrapT=Gt,e.minFilter=_e,e.magFilter=_t;this.rt=n,this.quad=new En(new Nr(2,2)),this.quad.frustumCulled=!1,this.scene=new Yn,this.scene.add(this.quad),this.camera=new ee(-1,1,1,-1,0,1);let a=t.uniforms;a.uCS.value=n.textures[0],a.uCM.value=n.textures[1],a.uCT.value=new Float32Array(US.map(e=>e[2]));let o=2048,s=()=>new Kn(o,256,{type:GS,format:i,depthBuffer:!1,stencilBuffer:!1,minFilter:yn,magFilter:yn}),c=new sr(KS(),o,256,i,G);c.minFilter=c.magFilter=yn,c.needsUpdate=!0,this.h0=c,this.shapeKey=`null:1`,this.pp=[s(),s()];let l=(e,t)=>new Ui({vertexShader:qS,fragmentShader:e,uniforms:t,glslVersion:pe,depthTest:!1,depthWrite:!1});this.evolveU={uH0:{value:c},uTile:{value:new Float32Array(US.map(e=>e[2]))},uPhase:{value:0}},this.stageU={uSrc:{value:null},uNs:{value:1},uRows:{value:1}},this.asmU={uSrc:{value:null},uCascade:{value:0}},this.mats={evolve:l(YS,this.evolveU),stage:l(XS,this.stageU),asm:l(ZS,this.asmU)}}setShape(e){let t=e?.fp??null,n=e?.spread??1,r=`${t==null?`null`:t.toFixed(5)}:${n.toFixed(3)}`;r!==this.shapeKey&&(this.shapeKey=r,this.h0.image.data.set(KS(5,{fp:t,spread:n})),this.h0.needsUpdate=!0)}update(e){let t=this.renderer,n=t.getRenderTarget(),r=t.autoClear,i=this.quad;t.autoClear=!1;let a=(e,n,r)=>{i.material=e,r==null?t.setRenderTarget(n):t.setRenderTarget(n,r),t.render(this.scene,this.camera)};this.evolveU.uPhase.value=e/128%1;let o=0;a(this.mats.evolve,this.pp[0]);for(let e of[1,0])for(let t=1;t<256;t*=2)this.stageU.uSrc.value=this.pp[o].texture,this.stageU.uNs.value=t,this.stageU.uRows.value=e,a(this.mats.stage,this.pp[1-o]),o=1-o;this.asmU.uSrc.value=this.pp[o].texture;for(let e=0;e<8;e++)this.asmU.uCascade.value=e,a(this.mats.asm,this.rt,e);if(t.setRenderTarget(n),t.autoClear=r,this.first){this.first=!1;for(let e of this.rt.textures)e.generateMipmaps=!1}let s=t.getContext();for(let e of this.rt.textures){let n=t.properties.get(e).__webglTexture;t.state.bindTexture(s.TEXTURE_2D_ARRAY,n),s.generateMipmap(s.TEXTURE_2D_ARRAY)}t.state.unbindTexture()}},$S=[{at:0,name:`Cirrus`,low:0,mid:.15,high:1,puff:.8,scale:1,tower:0,towers:0,anvil:0,sheet:.2,base:1200},{at:.25,name:`Fair-weather cumulus`,low:1,mid:.1,high:.12,puff:1,scale:.8,tower:3,towers:.35,anvil:0,sheet:0,base:1100},{at:.45,name:`Towering cumulus`,low:1,mid:.25,high:.15,puff:1,scale:1.1,tower:12,towers:.45,anvil:0,sheet:.1,base:1200},{at:.6,name:`Cumulonimbus`,low:.5,mid:.3,high:.35,puff:.9,scale:1.6,tower:20,towers:.45,anvil:1,sheet:.2,base:1300},{at:.8,name:`Stratocumulus`,low:1,mid:.4,high:.1,puff:.45,scale:1.8,tower:1.5,towers:.2,anvil:0,sheet:.3,base:900},{at:1,name:`Layered (altostratus, stratus)`,low:.7,mid:1,high:.3,puff:0,scale:2.5,tower:0,towers:0,anvil:0,sheet:1,base:700}],eC={low:1200,mid:4500,high:9e3,top:11e3},tC=e=>$S.reduce((t,n)=>Math.abs(n.at-e)<Math.abs(t.at-e)?n:t).name;function nC(e=.35,t=.25,n=.4){let r=Math.min(1,Math.max(0,e)),i=Math.min(1,Math.max(0,t)),a=Math.min(1,Math.max(0,n)),o=0;for(;o<$S.length-2&&i>$S[o+1].at;)o++;let s=$S[o],c=$S[o+1],l=Math.min(1,Math.max(0,(i-s.at)/(c.at-s.at))),u=e=>s[e]+(c[e]-s[e])*l,d=r*u(`low`),f=r*u(`mid`),p=Math.min(1,r*u(`high`)*1.2),m=u(`towers`)*Math.min(1,Math.max(0,(r-.05)/.35)),h=u(`sheet`),g=Math.min(1,d+f*(.5+.4*h)*(1-d)+.15*p*(1-d));return{low:d,mid:f,high:p,variety:a,puff:u(`puff`),scale:u(`scale`),base:u(`base`),tower:u(`tower`)*Math.PI/180,towers:m,anvil:u(`anvil`),sheet:h,opaque:g}}var rC=class{constructor(e){this.cv=e,this.ctx=e.getContext(`2d`),this.widthM=44}draw({ski:e,field:t,time:n,scn:r,frames:i,dt:a,hScale:o=.45,t0:s=0,end:c=r.durationS}){let{cv:l,ctx:u}=this,d=l.width,f=l.height,p={},m=d/this.widthM,h=f*.74,[g,_]=e.forward,v=_,y=-g,b=(t,n)=>{let r=t-e.e,i=n-e.n;return[d/2+(r*v+i*y)*m,h-(r*g+i*_)*m]};this.off||(this.off=document.createElement(`canvas`),this.off.width=this.off.height=48,this.img=this.off.getContext(`2d`).createImageData(48,48));let x=this.imgT==null||n<this.imgT-1e-6||n-this.imgT>=1/15||this.imgWide!==this.widthM||this.imgCv!==`${d}x${f}`;if(!this.job&&x&&(this.job={j:0,time:n,e:e.e,n:e.n,fe:g,fn:_,at:this.imgT==null||n<this.imgT||this.imgWide!==this.widthM?48:16}),this.job){let e=this.job,n=e.fn,r=-e.fe,i=Math.min(48,e.j+e.at),a=this.img.data;for(let s=e.j;s<i;s++)for(let i=0;i<48;i++){let c=(h-(s+.5)*f/48)/m,l=((i+.5)*d/48-d/2)/m,u=e.e+c*e.fe+l*n,g=e.n+c*e.fn+l*r,_=t.mapHeight?t.mapHeight(u,g,e.time):t.sample(u,g,e.time,p).h,v=Math.max(-1,Math.min(1,_/o)),y=(s*48+i)*4;v>=0?(a[y]=40+200*v,a[y+1]=110+135*v,a[y+2]=160+90*v):(a[y]=40+30*v,a[y+1]=110+70*v,a[y+2]=160+70*v),a[y+3]=255}e.j=i,i>=48&&(this.off.getContext(`2d`).putImageData(this.img,0,0),this.pose=e,this.imgT=e.time,this.imgWide=this.widthM,this.imgCv=`${d}x${f}`,this.job=null)}if(u.fillStyle=`rgb(40,110,160)`,u.fillRect(0,0,d,f),this.pose){let e=this.pose,t=e.fn,n=-e.fe,r=(r,i)=>{let a=(h-i)/m,o=(r-d/2)/m;return[e.e+a*e.fe+o*t,e.n+a*e.fn+o*n]},[i,a]=b(...r(0,0)),[o,s]=b(...r(d,0)),[c,l]=b(...r(0,f));u.save(),u.setTransform((o-i)/d,(s-a)/d,(c-i)/f,(l-a)/f,i,a),u.imageSmoothingEnabled=!0,u.imageSmoothingQuality=`medium`,u.drawImage(this.off,0,0,d,f),u.restore()}u.strokeStyle=`rgba(255,255,255,.35)`,u.fillStyle=`rgba(255,255,255,.8)`,u.font=`11px system-ui`,u.textAlign=`left`;for(let e=5;e<=30;e+=5){let t=h-e*m;u.beginPath(),u.moveTo(d/2-14,t),u.lineTo(d/2+14,t),u.stroke(),u.fillText(`${e} m`,d/2+18,t+4)}let S=(e,t,n)=>{u.setLineDash(n),u.beginPath();let r=!0;for(let n=Math.max(0,Math.floor((e-s)/a));n<=Math.min(i.length-1,Math.ceil((t-s)/a));n++){let[e,t]=b(i[n].e,i[n].n);r?(u.moveTo(e,t),r=!1):u.lineTo(e,t)}u.stroke(),u.setLineDash([])};if(u.lineWidth=2,u.strokeStyle=`#ff5a36`,S(Math.max(s,n-30),n,[]),u.strokeStyle=`rgba(255,200,170,.9)`,S(n,c,[5,5]),r.focus){let[e,t]=b(r.focus.e,r.focus.n),i=r.focus.t-n;u.strokeStyle=`#ffd34d`,u.lineWidth=2,u.beginPath(),u.arc(e,t,12,0,7),u.stroke(),u.fillStyle=`#ffd34d`,u.fillText(i>0?`focus in ${i.toFixed(1)} s`:`focus ${(-i).toFixed(1)} s ago`,e+16,t+4)}u.save(),u.translate(d/2,h),u.fillStyle=`#ff5a36`,u.strokeStyle=`#fff`,u.lineWidth=1.5,u.beginPath(),u.moveTo(0,-2.7*m),u.lineTo(.25*m+2,2.7*m),u.lineTo(-.25*m-2,2.7*m),u.closePath(),u.fill(),u.stroke(),u.restore();let C=-e.psi;u.save(),u.translate(d-30,30),u.rotate(C),u.fillStyle=`#fff`,u.beginPath(),u.moveTo(0,-16),u.lineTo(7,6),u.lineTo(-7,6),u.closePath(),u.fill(),u.restore(),u.fillStyle=`#fff`,u.fillText(`N`,d-34,56),u.fillText(`heading-up · ${this.widthM} m wide · light = crest, dark = trough`,8,f-8)}},iC=[5,10,20,50,100,200,500,1e3,2e3,5e3,1e4],aC=class{constructor(e){this.cv=e,this.ctx=e.getContext(`2d`),this.cache=new WeakMap}images(e){let t=this.cache.get(e);if(t)return t;let n=e.buildMapCanvas(),r=document.createElement(`canvas`);r.width=e.W,r.height=e.H;let i=r.getContext(`2d`),a=i.createImageData(e.W,e.H),o=e.data,s=e.W,c=e.H;for(let e=1;e<c-1;e++)for(let t=1;t<s-1;t++)o[e*s+t]>0&&(o[e*s+t-1]<=0||o[e*s+t+1]<=0||o[(e-1)*s+t]<=0||o[(e+1)*s+t]<=0)&&a.data.set([255,255,255,235],((c-1-e)*s+t)*4);return i.putImageData(a,0,0),t={map:n,shore:r},this.cache.set(e,t),t}waveStats(e){let t=e.fft??e.base?.fft;if(e._stats&&e._statsFor===t)return e._stats;let n=[];for(let e of t?.sets??[])if(!e.tail)for(let t=0;t<e.n;t++)n.push({lam:2*Math.PI/e.kk[t],v:.5*(e.re[t]**2+e.im[t]**2),c:Math.abs(e.w[t])/e.kk[t]});let r=n.reduce((e,t)=>e+t.v,0)||1;n.sort((e,t)=>e.lam-t.lam);let i=0,a=n[n.length-1]?.lam??50;for(let e of n)if(i+=e.v,i>=.25*r){a=e.lam;break}let o=1;{let e=0;for(let t=n.length-1;t>=0;t--)if(e+=n[t].v,e>=.1*r){o=Math.max(1,n[t].c);break}}return e._stats={lamQ:Math.max(a,4),cMax:o},e._statsFor=t,e._stats}blit(e,t,n,r,i){let{ctx:a,cv:o}=this,s=t.cell,c=t.minE,l=t.minN+t.H*s,u=n(c),d=r(l);t.W*s*i,t.H*s*i;let f=Math.max(0,-u/(s*i)),p=Math.max(0,-d/(s*i)),m=Math.min(t.W-f,o.width/(s*i)+1),h=Math.min(t.H-p,o.height/(s*i)+1);m<=0||h<=0||a.drawImage(e,f,p,m,h,u+f*s*i,d+p*s*i,m*s*i,h*s*i)}updateWaves({ski:e,field:t,time:n,terrain:r,widthM:i,ppm:a}){let{cv:o}=this,s=this.waveStats(t),c=s.lamQ/2.2,l=Math.max(.3,t.hsRef*.6),u={},d=Math.min(i,900,64*c),f=Math.max(32,Math.min(64,Math.ceil(d/c))),p=d/f,m=f+2,h=a*(o.clientWidth/o.width||1),g=Math.min(.25,Math.max(1/60,.96/(s.cMax*h+1e-6))),_=Math.floor((e.e-d/2)/p)*p-p,v=Math.floor((e.n-d/2)/p)*p-p;(!this.waveCv||this.waveCv.width!==m)&&(this.waveCv=document.createElement(`canvas`),this.waveCv.width=this.waveCv.height=m,this.waveImg=this.waveCv.getContext(`2d`).createImageData(m,m),this.waveCache=null);let y=this.waveCache,b=t.state.stokes,x=!y||y.field!==t||y.hs!==l||y.stokes!==b||y.ox!==_||y.oy!==v||y.step!==p||n<y.time||n-y.time>g-1/120,S=this.waveJob;if(S&&(S.field!==t||S.hs!==l||S.stokes!==b||S.ox!==_||S.oy!==v||S.step!==p||n<S.time)&&(S=this.waveJob=null),!S&&x&&(S=this.waveJob={field:t,hs:l,stokes:b,ox:_,oy:v,step:p,time:n,j:0}),S){let e=y&&y.field===t&&y.hs===l&&y.stokes===b&&y.ox===_&&y.oy===v&&y.step===p&&n>=y.time&&g>=.1,i=this.waveImg.data,a=e?Math.ceil(m/4):m,o=Math.min(m,S.j+a);for(let e=S.j;e<o;e++)for(let n=0;n<m;n++){let a=_+(n+.5)*p,o=v+(m-e-.5)*p,s=(e*m+n)*4;if(r&&r.depthAt(a,o)<=.5){i[s+3]=0;continue}let c=Math.min(n,m-1-n)/(.18*m),d=Math.min(e,m-1-e)/(.18*m),f=Math.min(1,c,d),h=f*f*(3-2*f),g=Math.max(-1,Math.min(1,(t.mapHeight?t.mapHeight(a,o,S.time):t.sample(a,o,S.time,u).h)/l));g>0?(i[s]=255,i[s+1]=255,i[s+2]=255,i[s+3]=107*g*h):(i[s]=0,i[s+1]=10,i[s+2]=40,i[s+3]=-102*g*h)}S.j=o,o>=m&&(this.waveCv.getContext(`2d`).putImageData(this.waveImg,0,0),this.waveCache={field:t,hs:l,stokes:b,ox:_,oy:v,step:p,time:S.time},this.waveJob=null)}}draw({ski:e,field:t,time:n,terrain:r,geo:i,frames:a,dt:o,t0:s,widthM:c,wavesToDeg:l,sunAzDeg:u,sunElDeg:d,modelled:f=!1,label:p=``,groups:m=null,gates:h=null,solve:g=null}){let{cv:_,ctx:v}=this,y=_.width,b=_.height,x=y/c,S=Math.max(1,y/280),C=t=>y/2+(t-e.e)*x,w=t=>b/2-(t-e.n)*x,T=this.waveCache;this.updateWaves({ski:e,field:t,time:n,terrain:r,widthM:c,ppm:x});let E=`${y}x${b}|${c}|${Math.round(e.e*x*2)}|${Math.round(e.n*x*2)}|${Math.round(e.psi*90/Math.PI)}|${p}|${i}|${l}|${u}|${g?.sig??``}`,D=performance.now();if(E===this.sig&&T===this.waveCache&&r===this.sigT&&m===this.sigG&&h===this.sigK&&D-this.paintT<500)return;if(this.sig=E,this.sigT=r,this.sigG=m,this.sigK=h,this.paintT=D,v.save(),v.fillStyle=`#0b3a66`,v.fillRect(0,0,y,b),v.imageSmoothingEnabled=!0,v.imageSmoothingQuality=`medium`,r){let e=this.images(r);this.blit(e.map,r,C,w,x),this.blit(e.shore,r,C,w,x)}{let e=this.waveCache;e&&(v.imageSmoothingEnabled=!0,v.drawImage(this.waveCv,C(e.ox),w(e.oy+this.waveCv.width*e.step),this.waveCv.width*e.step*x,this.waveCv.width*e.step*x))}if(g?.show)for(let e of g.blocks){let t=C(e.e0),n=w(e.n0),r=e.size*x;t>y||t+r<0||n<0||n-r>b||(v.fillStyle=e.quick?`rgba(255,214,64,0.22)`:`rgba(90,230,120,0.18)`,v.fillRect(t,n-r,r,r))}let O=(e,t,n,r,i)=>{let a=Math.sin(n*Math.PI/180),o=-Math.cos(n*Math.PI/180),s=e+a*r,c=t+o*r,l=-o,u=a;v.beginPath(),v.moveTo(e-a*r,t-o*r),v.lineTo(s,c),v.moveTo(s,c),v.lineTo(s-a*5*S+l*3.5*S,c-o*5*S+u*3.5*S),v.moveTo(s,c),v.lineTo(s-a*5*S-l*3.5*S,c-o*5*S-u*3.5*S),v.strokeStyle=i,v.lineWidth=1.6*S,v.stroke()},k=(e,t,n,r)=>{v.font=`${10*S}px system-ui, sans-serif`,v.lineWidth=3*S,v.strokeStyle=`rgba(5,20,40,.85)`,v.strokeText(e,t,n),v.fillStyle=r,v.fillText(e,t,n)},A=[];for(let e of m??[]){let t=e.zone;if(!t){A.push(e);continue}let n=t.outside>t.inside?`120,220,255`:`255,214,64`;if(v.save(),v.lineJoin=`round`,v.lineCap=`round`,t.kind===1)v.beginPath(),v.moveTo(C(t.ax),w(t.ay)),v.lineTo(C(t.bx),w(t.by)),v.strokeStyle=`rgba(${n},0.12)`,v.lineWidth=Math.max(1,2*(t.size+t.soft)*x),v.stroke(),v.strokeStyle=`rgba(${n},0.22)`,v.lineWidth=Math.max(1,2*t.size*x),v.stroke();else{let e=C(t.ax),r=w(t.ay),i=t.b0-Math.PI/2,a=i+t.span,o=n=>{v.beginPath(),t.span<2*Math.PI-1e-6&&v.moveTo(e,r),v.arc(e,r,Math.max(1,n*x),i,a),t.span<2*Math.PI-1e-6&&v.closePath()};o(t.size),v.fillStyle=`rgba(${n},0.12)`,v.fill(),o((1-t.soft*.5)*t.size),v.fillStyle=`rgba(${n},0.14)`,v.fill(),o(t.size),v.strokeStyle=`rgba(${n},0.7)`,v.lineWidth=1.2*S,v.setLineDash([4*S,3*S]),v.stroke()}v.restore();let r=t.kind===1?[(t.ax+t.bx)/2,(t.ay+t.by)/2]:[t.ax+Math.sin(t.b0+t.span/2)*t.size*.5,t.ay+Math.cos(t.b0+t.span/2)*t.size*.5],i=C(r[0]),a=w(r[1]);i>-40&&i<y+40&&a>-40&&a<b+40&&(v.save(),O(i,a,e.dirDeg,11*S,`rgb(${n})`),v.textAlign=`center`,k(e.name,i,a+20*S,`rgb(${n})`),v.restore())}A.length&&(v.save(),v.textAlign=`left`,A.forEach((e,t)=>{let n=34*S+t*14*S;O(16*S,n-3*S,e.dirDeg,6*S,`#cfe9ff`),k(`${e.name} · ${e.hsFt.toFixed(1)} ft`,28*S,n,`#cfe9ff`)}),v.restore()),g?.text&&(v.save(),v.textAlign=`left`,k(g.text,10*S,34*S+A.length*14*S,g.done?`#8ef0a8`:`#ffd640`),v.restore());for(let e of h??[]){v.save(),v.strokeStyle=e.next?`rgba(255,220,60,0.95)`:`rgba(255,220,60,0.45)`,v.lineWidth=(e.next?2:1.3)*S,e.next||v.setLineDash([4*S,3*S]),v.beginPath(),v.moveTo(C(e.a.e),w(e.a.n)),v.lineTo(C(e.b.e),w(e.b.n)),v.stroke(),v.setLineDash([]);for(let t of e.buoys??[])v.beginPath(),v.arc(C(t.e),w(t.n),3*S,0,2*Math.PI),v.fillStyle=`#ff8a2a`,v.fill(),v.strokeStyle=`#1b1b1b`,v.lineWidth=.8*S,v.stroke();v.restore()}let ee=Math.min(a.length-1,Math.floor((n-s)/o)),j=Math.max(1,Math.floor(ee/700));v.strokeStyle=`#ff5a36`,v.lineWidth=2.2*S,v.lineJoin=`round`,v.beginPath();for(let e=0;e<=ee;e+=j){let t=a[e];e?v.lineTo(C(t.e),w(t.n)):v.moveTo(C(t.e),w(t.n))}v.lineTo(C(e.e),w(e.n)),v.stroke();let M=Math.max(7*S,6.4*x);v.save(),v.translate(y/2,b/2),v.rotate(e.psi),v.fillStyle=`#ff5a36`,v.strokeStyle=`#fff`,v.lineWidth=1.3*S,v.beginPath(),v.moveTo(0,-M/2),v.lineTo(M*.2,M/2),v.lineTo(-M*.2,M/2),v.closePath(),v.fill(),v.stroke(),v.restore();let N=iC[0];for(let e of iC)e*x<=y*.3&&(N=e);let P=10*S,F=b-22*S;v.strokeStyle=`#fff`,v.fillStyle=`#fff`,v.lineWidth=2*S,v.font=`${11*S}px system-ui`,v.textAlign=`left`,v.shadowColor=`rgba(0,0,0,.7)`,v.shadowBlur=3*S,v.beginPath(),v.moveTo(P,F),v.lineTo(P+N*x,F),v.moveTo(P,F-4*S),v.lineTo(P,F+4*S),v.moveTo(P+N*x,F-4*S),v.lineTo(P+N*x,F+4*S),v.stroke(),v.fillText(N>=1e3?`${N/1e3} km`:`${N} m`,P,F-8*S),v.fillText(p,10*S,16*S),i&&v.fillText(i,10*S,b-6*S),v.shadowBlur=0;let I=24*S,L=y-I-8*S,te=I+8*S;if(v.fillStyle=`rgba(0,10,30,.55)`,v.strokeStyle=`rgba(255,255,255,.75)`,v.lineWidth=1.2*S,v.beginPath(),v.arc(L,te,I,0,Math.PI*2),v.fill(),v.stroke(),v.fillStyle=`#fff`,v.textAlign=`center`,v.font=`${10*S}px system-ui`,v.fillText(`N`,L,te-I+11*S),l!=null&&((e,t,n)=>{v.save(),v.translate(L,te),v.rotate(e*Math.PI/180),v.strokeStyle=v.fillStyle=t,v.lineWidth=2*S,v.beginPath(),v.moveTo(0,n*.5),v.lineTo(0,-n),v.stroke(),v.beginPath(),v.moveTo(0,-n-4*S),v.lineTo(-3.5*S,-n+3*S),v.lineTo(3.5*S,-n+3*S),v.fill(),v.restore()})(l,`#7fe3ff`,I*.55),u!=null){let e=u*Math.PI/180,t=L+Math.sin(e)*I,n=te-Math.cos(e)*I;v.fillStyle=`#ffd34d`,v.beginPath(),v.arc(t,n,3.6*S,0,Math.PI*2),v.fill()}v.restore()}drawLocal({ski:e,terrain:t,widthM:n,gain:r,toDeg:i=0,turns:a=null,status:o=``,label:s=``}){let{cv:c,ctx:l}=this,u=c.width,d=c.height,f=u/n,p=Math.max(1,u/280),m=n/96,h=t=>u/2+(t-e.e)*f,g=t=>d/2-(t-e.n)*f,_=Math.floor((e.e-n/2)/(m*8))*m*8,v=Math.floor((e.n-n*d/u/2)/(m*8))*m*8,y=Math.ceil(96*d/u)+9,b=`${_}|${v}|${m}|105x${y}|${o}|${a?.left??0}|${a?.right??0}`,x=performance.now(),S=this.local??={};if(S.key!==b||x-S.at>2e3){S.key=b,S.at=x,S.ox=_,S.oy=v,S.step=m,(!S.cv||S.cv.width!==105||S.cv.height!==y)&&(S.cv=document.createElement(`canvas`),S.cv.width=105,S.cv.height=y,S.img=S.cv.getContext(`2d`).createImageData(105,y));let e=S.img.data,n=e=>{let t=[[0,[10,30,70]],[.5,[30,120,150]],[1,[205,232,245]],[1.5,[255,140,40]]],n=Math.min(1.5,Math.max(0,e)),r=1;for(;r<t.length-1&&n>t[r][0];)r++;let[i,a]=t[r-1],[o,s]=t[r],c=(n-i)/(o-i);return a.map((e,t)=>e+(s[t]-e)*c)};S.arrows=[];for(let o=0;o<y;o++)for(let s=0;s<105;s++){let c=_+(s+.5)*m,l=v+(y-o-.5)*m,u=(o*105+s)*4;if(t&&t.depthAt(c,l)<=0){e[u+3]=0;continue}let d=r?r(c,l):[1,0,0],f=Math.hypot(d[0],d[1],d[2]),p=n(f);if(e[u]=p[0],e[u+1]=p[1],e[u+2]=p[2],e[u+3]=200,s%8==4&&o%8==4&&f>.05&&(d[1]>.05||d[2]>.05)){let e=d[0]**2+d[1]**2+d[2]**2,t=(d[2]**2*(a?.right??0)-d[1]**2*(a?.left??0))/e;S.arrows.push({e:c,n:l,deg:i+t,r:f})}}S.cv.getContext(`2d`).putImageData(S.img,0,0)}if(l.save(),l.fillStyle=`#0b3a66`,l.fillRect(0,0,u,d),l.imageSmoothingEnabled=!0,t){let e=this.images(t);this.blit(e.map,t,h,g,f)}if(l.drawImage(S.cv,h(S.ox),g(S.oy+S.cv.height*S.step),S.cv.width*S.step*f,S.cv.height*S.step*f),t){let e=this.images(t);this.blit(e.shore,t,h,g,f)}let C=(e,t,n,r,i)=>{let a=Math.sin(n*Math.PI/180),o=-Math.cos(n*Math.PI/180),s=e+a*r,c=t+o*r,u=-o,d=a;l.beginPath(),l.moveTo(e-a*r,t-o*r),l.lineTo(s,c),l.moveTo(s,c),l.lineTo(s-a*4*p+u*3*p,c-o*4*p+d*3*p),l.moveTo(s,c),l.lineTo(s-a*4*p-u*3*p,c-o*4*p-d*3*p),l.strokeStyle=i,l.lineWidth=1.5*p,l.stroke()};for(let e of S.arrows??[])C(h(e.e),g(e.n),e.deg,(3+5*Math.min(1,e.r))*p,`rgba(20,20,30,0.85)`);let w=Math.max(7*p,6.4*f);l.save(),l.translate(u/2,d/2),l.rotate(e.psi),l.fillStyle=`#ff5a36`,l.strokeStyle=`#fff`,l.lineWidth=1.3*p,l.beginPath(),l.moveTo(0,-w/2),l.lineTo(w*.2,w/2),l.lineTo(-w*.2,w/2),l.closePath(),l.fill(),l.stroke(),l.restore(),l.font=`${10*p}px system-ui, sans-serif`,l.textAlign=`left`;let T=(e,t,n,r)=>{l.lineWidth=3*p,l.strokeStyle=`rgba(5,20,40,.85)`,l.strokeText(e,t,n),l.fillStyle=r,l.fillText(e,t,n)};C(u-22*p,22*p,i,10*p,`#ffffff`),T(s||`Wind sea against the open sea`,8*p,14*p,`#fff`),o&&T(o,8*p,27*p,/solved/.test(o)?`#8ef0a8`:`#ffd640`);let E=Math.min(110*p,u*.5),D=8*p,O=d-16*p,k=l.createLinearGradient(D,0,D+E,0);k.addColorStop(0,`rgb(10,30,70)`),k.addColorStop(1/3,`rgb(30,120,150)`),k.addColorStop(2/3,`rgb(205,232,245)`),k.addColorStop(1,`rgb(255,140,40)`),l.fillStyle=k,l.fillRect(D,O,E,6*p),l.strokeStyle=`rgba(255,255,255,.6)`,l.lineWidth=1,l.strokeRect(D,O,E,6*p);for(let[e,t]of[[0,`0`],[2/3,`1`],[1,`1.5`]])T(t,D+E*e-3*p,O-3*p,`#fff`);let A=iC[0];for(let e of iC)e*f<=u*.3&&(A=e);T(A>=1e3?`${A/1e3} km`:`${A} m`,u-8*p-A*f,d-8*p,`#fff`),l.strokeStyle=`#fff`,l.lineWidth=2*p,l.beginPath(),l.moveTo(u-8*p-A*f,d-16*p),l.lineTo(u-8*p,d-16*p),l.stroke(),l.restore()}};function oC(e,t,n){let r=e.dominant;if(!r.a)return{cw:0,along:1/0,dot:0};let i=r.omega/r.k,a=r.dx*t+r.dy*n;return{cw:i,dot:a,along:a>.2?i/a:1/0,k:r.k,a:r.a}}function sC({ski:e,pose:t=e,field:n,time:r,behind:i=25,ahead:a=55,n:o=220,crest:s=null}){let c=e.p,[l,u]=t.forward,d=c._0x621947,f=c.mass*c._0x283f96,p=(e.current?.[0]??0)*l+(e.current?.[1]??0)*u,m=oC(n,l,u),h=s??(Number.isFinite(m.along)?m.along:0),g={},_=new Float64Array(o),v=new Float64Array(o),y=new Float64Array(o),b=new Float64Array(o),x=(i+a)/(o-1),S=.3,C=(e,r)=>n.sample(t.e+l*e,t.n+u*e,r,g);for(let e=0;e<o;e++){_[e]=-i+e*x;let t=C(_[e],r);v[e]=t.h,b[e]=t.ue*l+t.un*u+p,y[e]=C(_[e],r+S).h}let w=Math.max(1,Math.round(d/x)),T=(e,t)=>e[Math.min(o-1,Math.max(0,t))],E=e=>{let t=new Float64Array(o);for(let n=0;n<o;n++){let r=0,i=0;for(let t=n-w;t<=n+w;t++)t>=0&&t<o&&(r+=e[t],i++);t[n]=r/i}return t},D=E(v),O=E(y),k=new Float64Array(o),A=Math.max(2,2*w),ee=(e,t)=>{let n=Math.min(Math.max(t,0),o-1),r=Math.floor(n),i=Math.min(o-1,r+1);return e[r]+(e[i]-e[r])*(n-r)},j=[];for(let e=-.6;e<=3.6+1e-9;e+=.1)j.push(e);for(let e=0;e<o;e++){let t=0,n=1/0,r=[];for(let i of j){let a=0;for(let t=Math.max(0,e-A);t<=Math.min(o-1,e+A);t++){let e=ee(O,t+i/x)-D[t];a+=e*e}r.push(a),a<n&&(n=a,t=r.length-1)}let i=j[t];if(t>0&&t<r.length-1){let e=r[t-1],n=r[t],a=r[t+1],o=e-2*n+a;o>0&&(i+=.5*(e-a)/o*.1)}k[e]=Math.min(Math.max(i/S,0),12)}let M=new Float64Array(o),N=new Float64Array(o),P=new Float64Array(o),F=new Float64Array(o);for(let e=0;e<o;e++){let t=(T(v,e+w)-T(v,e-w))/(2*w*x);M[e]=Math.atan(-t)*180/Math.PI;let n=(s??k[e])-b[e],r=(c.c2*n*Math.abs(n)+c.c4*n**3*Math.abs(n))*sm(n,c._0x6fbebf),i=-f*go*c._0x6f9fed*t;P[e]=(i-r)/f,F[e]=r>0?i/r:0,N[e]=Math.atan(r/(f*go*c._0x6f9fed))*180/Math.PI}let I=[];for(let e=1;e<o;e++)if(P[e-1]>0&&P[e]<=0){let t=P[e-1]/(P[e-1]-P[e]);I.push(_[e-1]+t*x)}let L=-1;for(let e=0;e<o;e++)M[e]>1&&(L<0||F[e]>F[L])&&(L=e);let te=I.length?I.reduce((e,t)=>Math.abs(t)<Math.abs(e)?t:e):null,ne=e=>k[Math.min(o-1,Math.max(0,Math.round((e+i)/x)))];return{x:_,h:v,hs:D,vf:k,chordDeg:M,reqDeg:N,margin:P,ratio:F,eq:I,hold:te,sweet:L>=0?{x:_[L],ratio:F[L],deg:M[L],reqDeg:N[L],vf:k[L]}:null,holdSpeed:te==null?null:ne(te),faceHere:ne(0),uC:h,cw:m.cw,dot:m.dot,steepness:m.k?m.k*m.a:0,canHold:I.length>0,canCatch:h>0}}var cC=.514444,lC={sky:`#cfe6f6`,water:`#0f4c75`,line:`#bfe9ff`,faint:`rgba(191,233,255,0.28)`,ink:`#123`,hold:`#1a9e4b`,sweet:`#ffd23f`,bury:`#e24b3b`,low:`#f0a23a`,ok:`#3fbf6f`},uC=class{constructor(e){this.cv=e,this.ctx=e.getContext(`2d`),this.behind=14,this.ahead=30,this.last=null,this.lastT=-1e9}solve({ski:e,pose:t,field:n,time:r}){let i=performance.now();return(!this.last||i-this.lastT>60||this.lastSki!==e)&&(this.last=sC({ski:e,pose:t,field:n,time:r,behind:this.behind,ahead:this.ahead,n:200}),this.lastT=i,this.lastSki=e),this.last}draw({ski:e,pose:t=e,field:n,time:r}){if(!e){this.ctx.fillStyle=lC.sky,this.ctx.fillRect(0,0,this.cv.width,this.cv.height);return}let{cv:i,ctx:a}=this,o=i.width,s=i.height,c=this.solve({ski:e,pose:t,field:n,time:r}),l=c.x.length,u=this.behind+this.ahead,d=o-34-8,f=d/u,p=e=>34+(e+this.behind)*f,m=Math.round(s*.52),h=m+16,g=s-h-34;a.fillStyle=lC.sky,a.fillRect(0,0,o,s),a.font=`${Math.max(10,Math.min(Math.round(s/28),Math.round(o/34)))}px system-ui`,a.textAlign=`left`;let _=t.z+e.boat._0xf3a7ff,v=m*.55,y=e=>v-(e-_)*f,b=e=>{let t=c.chordDeg[e];return t>=15?lC.bury:t>0&&t>=c.reqDeg[e]?lC.ok:t>0?lC.low:null};a.fillStyle=lC.water,a.beginPath(),a.moveTo(p(c.x[0]),m);for(let e=0;e<l;e++)a.lineTo(p(c.x[e]),y(c.hs[e]));a.lineTo(p(c.x[l-1]),m),a.closePath(),a.fill(),a.lineWidth=1.2,a.strokeStyle=lC.faint,a.beginPath();for(let e=0;e<l;e++)(e?a.lineTo:a.moveTo).call(a,p(c.x[e]),y(c.h[e]));a.stroke(),a.lineWidth=3.2,a.lineCap=`round`;for(let e=1;e<l;e++)a.strokeStyle=b(e)??lC.line,a.beginPath(),a.moveTo(p(c.x[e-1]),y(c.hs[e-1])),a.lineTo(p(c.x[e]),y(c.hs[e])),a.stroke();let x=e.boat.spec.L*f,S=t.pitch;a.save(),a.translate(p(0),y(_)),a.rotate(-S),a.fillStyle=`#ff5a36`,a.fillRect(-x*.5,-3,x,5),a.beginPath(),a.moveTo(x*.5,-3),a.lineTo(x*.5+6,0),a.lineTo(x*.5,2),a.fill(),a.fillStyle=`#ffd1b8`,a.beginPath(),a.arc(-x*.08,-12,4,0,7),a.fill(),a.restore();let C=(e,t,n,r)=>{let i=Math.min(l-1,Math.max(0,Math.round((e+this.behind)/u*(l-1))));a.strokeStyle=t,a.fillStyle=t,a.lineWidth=2,a.beginPath(),a.moveTo(p(e),y(c.hs[i])-4),a.lineTo(p(e),y(c.hs[i])-18-r),a.stroke(),a.beginPath(),a.arc(p(e),y(c.hs[i]),5,0,7),a.fill(),a.textAlign=`center`,a.fillText(n,p(e),y(c.hs[i])-22-r),a.textAlign=`left`};c.sweet&&C(c.sweet.x,lC.sweet,`sweet spot`,0),c.hold!=null&&C(c.hold,lC.hold,`holds here`,14),a.fillStyle=lC.ink,a.fillText(`ahead →`,o-8-52,14),a.fillText(`true scale`,34,14);let w=Math.max(20,Math.ceil(Math.max(...c.chordDeg,18,Math.min(Math.max(...c.reqDeg),45))/5)*5),T=e=>h+(1-(e- -10)/(w- -10))*g;a.fillStyle=`#eaf3fa`,a.fillRect(34,h,d,g),a.save(),a.beginPath(),a.rect(34,h,d,g),a.clip();for(let e=1;e<l;e++){let t=b(e);t&&(a.fillStyle=t+`55`,a.fillRect(p(c.x[e-1]),T(Math.max(c.chordDeg[e],0)),Math.max(1,p(c.x[e])-p(c.x[e-1])+.5),T(0)-T(Math.max(c.chordDeg[e],0))))}a.strokeStyle=`#789`,a.lineWidth=1,a.setLineDash([]),a.beginPath(),a.moveTo(34,T(0)),a.lineTo(34+d,T(0)),a.stroke(),a.strokeStyle=lC.bury,a.setLineDash([4,4]),a.beginPath(),a.moveTo(34,T(15)),a.lineTo(34+d,T(15)),a.stroke(),a.strokeStyle=`#444`,a.beginPath();for(let e=0;e<l;e++)(e?a.lineTo:a.moveTo).call(a,p(c.x[e]),T(c.reqDeg[e]));a.stroke(),a.setLineDash([]),a.strokeStyle=`#0a3a5c`,a.lineWidth=2.4,a.beginPath();for(let e=0;e<l;e++)(e?a.lineTo:a.moveTo).call(a,p(c.x[e]),T(c.chordDeg[e]));a.stroke(),a.strokeStyle=`#ff5a36`,a.lineWidth=1.5,a.beginPath(),a.moveTo(p(0),h),a.lineTo(p(0),h+g),a.stroke();let E=-t.pitch*180/Math.PI;a.fillStyle=`#ff5a36`,a.beginPath(),a.arc(p(0),T(E),4.5,0,7),a.fill(),c.sweet&&(a.fillStyle=lC.sweet,a.strokeStyle=`#7a5d00`,a.lineWidth=1,a.beginPath(),a.arc(p(c.sweet.x),T(c.sweet.deg),5.5,0,7),a.fill(),a.stroke()),c.hold!=null&&(a.strokeStyle=lC.hold,a.lineWidth=2,a.beginPath(),a.moveTo(p(c.hold),h),a.lineTo(p(c.hold),h+g),a.stroke()),a.restore(),a.fillStyle=lC.ink,a.textAlign=`right`;for(let e of[0,10,20,30,40])e>=-10&&e<=w&&a.fillText(`${e}°`,30,T(e)+4);a.textAlign=`left`,a.fillText(`face angle under the hull`,38,h+13),a.fillStyle=`#444`,a.fillText(`- - needed to coast`,38,h+26),a.fillStyle=lC.bury,a.fillText(`- - bow may bury`,38,h+39);let D=t.u/cC,O=c.faceHere/cC,k;k=c.uC>0?c.dot<.7?`Waves cross your heading (${Math.round(Math.acos(Math.min(1,c.dot))*57.3)}° off): turn to run with them.`:c.canHold?c.sweet?`Best spot ${Math.abs(c.sweet.x).toFixed(1)} m ${c.sweet.x>=0?`ahead of`:`behind`} you · face ${c.sweet.deg.toFixed(0)}° (needs ${c.sweet.reqDeg.toFixed(0)}°)`:`Holds here.`:`No spot on this wave holds you at the ${O.toFixed(1)} kt of the face here: too gentle for this ski.`:`No wave train to match here.`,a.fillStyle=lC.ink,a.fillText(`ski ${D.toFixed(0)} kt · face here ${(c.faceHere/cC).toFixed(0)} kt · pitch ${E.toFixed(0)}° · S ${c.steepness.toFixed(2)}`,34,s-20),a.fillText(k,34,s-6)}},dC=7600,fC=900,pC=(e,t,n,r)=>{let i=(e-t+540)%360-180;return r*Math.exp(-.5*(i/n)**2)},mC=e=>{let t=Math.sin(e*127.1+31.7)*43758.5453;return t-Math.floor(t)};function hC(e){let t=Math.floor(e),n=e-t,r=n*n*(3-2*n);return mC(t)*(1-r)+mC(t+1)*r}function gC(e,t=0){let n=0,r=.55,i=.05,a=0;for(let o=0;o<5;o++){let s=1-Math.abs(2*hC(e*i+t+o*17.3)-1);n+=r*s,a+=r,r*=.5,i*=2.1}return n/a}var _C=(e,t,n)=>{let r=Math.abs((e-t+540)%360-180);return Math.max(0,1-(r/n)**2)},vC={Islands:(e,t)=>Math.max(pC(e,t-38,1.6,55),pC(e,t-33,2.4,90),pC(e,t+8,3.5,70),pC(e,t+14,1.4,40),pC(e,t+62,4,110),pC(e,t-95,5,80)),Mountains:(e,t)=>40+620*gC(e,3.1)**1.7*(.25+.75*_C(e,t-25,110))},yC=(e,t)=>{let n=Math.abs((e-t+540)%360-180);return 15+30*gC(e,5.3)+520*bC(14,60,n)*(.45+.8*gC(e,8.7))+120*bC(5,18,n)*gC(e,2.2)};function bC(e,t,n){let r=Math.min(Math.max((n-e)/(t-e),0),1);return r*r*(3-2*r)}vC.Gorge=yC,[...Object.keys(vC)];var xC=(e,t,n)=>e.map((e,r)=>e+(t[r]-e)*n),SC=e=>e.map(e=>e**2.2),CC={Islands:15e3,Mountains:3e4,Gorge:9e3,Skyline:14e3};function wC(e,t,n=null,r={}){let i=vC[e];if(e===`Skyline`&&n){let{binDeg:e,deg:t}=n,r=t.length;i=n=>{let i=(n%360+360)%360/e,a=Math.floor(i),o=i-a;return dC*Math.tan((t[a%r]*(1-o)+t[(a+1)%r]*o)*Math.PI/180)}}if(!i)return null;let a=[.72,.82,.91],o=[.2,.36,.2],s=[.36,.4,.22],c=[.5,.38,.26],l=e===`Skyline`?.55:.3,u=[],d=[],f=[],p=[],m=[],h=[],g=[[0,0,0],o,xC(o,s,.5),s,c].map(e=>SC(e).map(e=>e*.55));for(let n=0;n<=fC;n++){let f=n/fC*360,_=i(f,t),v=_>.5?_:0,y=f*Math.PI/180,b=dC*Math.sin(y),x=-7600*Math.cos(y),S=.8+.4*hC(f*.11+9.7),C=[v>0?-40:0,0,.3*v,.65*v,v],w=[a,xC(o,a,l),xC(xC(o,s,.5),a,l),xC(s,a,l*.9),xC(c,a,l*.8)],T=r.distAt?.(f)??CC[e]??15e3;C.forEach((e,t)=>{u.push(b,e,x);let n=t===0?w[0]:w[t].map(e=>Math.min(e*S,1));d.push(...n),p.push(...g[t].map(e=>e*S)),m.push(t===0?1e7:T),h.push(Math.max(0,e*T/dC))})}for(let e=0;e<fC;e++)for(let t=0;t<4;t++){let n=e*5+t,r=(e+1)*5+t;f.push(n,r,n+1,n+1,r,r+1)}let _=new kr;_.setAttribute(`position`,new Be(u,3)),_.setAttribute(`color`,new Be(d,3)),_.setAttribute(`albedo`,new Be(p,3)),_.setAttribute(`fogD`,new Be(m,1)),_.setAttribute(`fogH`,new Be(h,1)),_.setIndex(f);let v=new En(_,r.material??new mi({vertexColors:!0,fog:!1,side:2,depthWrite:!1}));return v.renderOrder=-.5,v.frustumCulled=!1,v}var TC=[{name:`Mt Rainier`,lat:46.8529,lon:-121.7604,elev:4392,half:13e3,k:1.25,snow:.62},{name:`Mt Adams`,lat:46.2024,lon:-121.4909,elev:3743,half:11e3,k:1.7,snow:.55},{name:`Mt Hood`,lat:45.3735,lon:-121.6959,elev:3429,half:8500,k:1.1,snow:.5},{name:`Mt St Helens`,lat:46.1914,lon:-122.1956,elev:2549,half:8e3,k:1.9,snow:.35},{name:`Mt Baker`,lat:48.7767,lon:-121.8144,elev:3286,half:1e4,k:1.5,snow:.6},{name:`Glacier Peak`,lat:48.1125,lon:-121.1139,elev:3213,half:7e3,k:1.2,snow:.55}],EC=6371e3,DC=400,OC=7700;function kC(e,t,n,r,i=2){let[a,o]=$a(t,e.lat,e.lon),s=a-n,c=o-r,l=Math.hypot(s,c),u=l*l/(2*EC)*.87;return{az:(Math.atan2(s,c)*180/Math.PI+360)%360,dist:l,elDeg:Math.atan2(e.elev-i-u,l)*180/Math.PI}}var AC=[.72,.82,.91],jC=[.3,.34,.46],MC=[.97,.97,.98],NC=(e,t,n)=>e.map((e,r)=>e+(t[r]-e)*n),PC=e=>{let t=Math.sin(e*91.7+13.3)*43758.5453;return t-Math.floor(t)};function FC(e,t){let n=[],r=[],i=[],a=[],o=[],s=[],c=(e=>e.map(e=>e**2.2*.55))([.22,.24,.3]),l=[.75,.75,.78],u=[0,.3,.48,.62,.8,1];for(let i=0;i<=48;i++){let d=i/48*2-1,f=Math.abs(d),p=Math.max(0,1-f**+e.k)*(1+.035*(PC(i+t*50)-.5)*2*Math.min(1,f*2.5));u.forEach((t,i)=>{n.push(d,p*t,0);let u=t*p,f=Math.min(1,Math.max(0,(u-e.snow*.85)/.18)),m=NC(NC(jC,AC,.5),NC(MC,AC,.3),f);r.push(...NC(m,AC,i===0?1:.3*(1-.5*f)*.5+.1)),a.push(...NC(c,l,f)),o.push(i===0?1e7:0),s.push(u*e.elev)})}for(let e=0;e<48;e++)for(let t=0;t<5;t++){let n=e*6+t,r=(e+1)*6+t;i.push(n,r,n+1,n+1,r,r+1)}let d=new kr;return d.setAttribute(`position`,new Be(n,3)),d.setAttribute(`color`,new Be(r,3)),d.setIndex(i),d.setAttribute(`albedo`,new Be(a,3)),d.setAttribute(`fogD`,new Be(o,1)),d.setAttribute(`fogH`,new Be(s,1)),d}var IC=class{constructor(e,t=null){this.group=new Oi,this.group.name=`peaks`,e.add(this.group),this.items=TC.map((e,n)=>{let r=t?Object.assign(t(),{depthTest:!1}):new mi({vertexColors:!0,fog:!1,side:2,depthWrite:!1,depthTest:!1,transparent:!1}),i=new En(FC(e,n),r);return i.renderOrder=.5,i.frustumCulled=!1,i.visible=!1,this.group.add(i),{peak:e,mesh:i}}),this.geo=null}setGeo(e){if(this.geo=e??null,!this.geo)for(let e of this.items)e.mesh.visible=!1}update(e,t=30){if(!this.geo)return;let n=Math.min(1,Math.max(.25,.25+t/25*.75));for(let{peak:t,mesh:r}of this.items){let i=kC(t,this.geo,e.position.x,-e.position.z,Math.max(2,e.position.y));if(i.dist>DC*1e3||i.elDeg<-1.2){r.visible=!1;continue}let a=i.az*Math.PI/180,o=Math.sin(a),s=-Math.cos(a),c=OC*Math.tan(Math.atan2(t.half,i.dist)),l=Math.sqrt(2*Math.max(2,e.position.y)/(EC/.87)),u=OC*Math.tan(-l-4e-4),d=OC*Math.tan(i.elDeg*Math.PI/180);r.visible=!0,r.position.set(e.position.x+o*OC,u,e.position.z+s*OC),r.rotation.set(0,Math.atan2(-o,-s),0),r.scale.set(c,d-u,1),r.material.uniforms?r.material.uniforms.uDistAdd.value=i.dist:r.material.color.setRGB(n,n*(.85+.15*n),n*(.75+.25*n))}}},LC=e=>document.getElementById(e),RC=0;function $(e,t=2200){let n=LC(`toast`);n&&(n.textContent=e,n.classList.add(`on`),clearTimeout(RC),RC=setTimeout(()=>n.classList.remove(`on`),t))}function zC(){let e=document,t=/iPhone|iPod/.test(navigator.userAgent)||/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1&&!e.documentElement.requestFullscreen,n=()=>$(t?`On an iPhone a web page cannot go full screen: tap Share (the square with the arrow), then Add to Home Screen, and open the sim from its new icon: it then runs full screen.`:`Full screen is not available here`,t?9e3:3e3);if(e.fullscreenElement||e.webkitFullscreenElement)(e.exitFullscreen||e.webkitExitFullscreen).call(e);else{let t=e.documentElement,r=t.requestFullscreen||t.webkitRequestFullscreen;if(r)try{let e=r.call(t);e?.catch&&e.catch(n)}catch{n()}else n()}}async function BC(e){try{return await navigator.clipboard.writeText(e),!0}catch{}let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand(`copy`)}catch{}return t.remove(),n}function VC({onStart:e}){let t=LC(`intro`),n=LC(`introGo`),r=!1,i=(e=!1)=>{r=!0,t.classList.add(`on`),n.textContent=e?`▶ Start paddling`:`▶ Back to the sim`},a=()=>{r=!1,t.classList.remove(`on`)};return n.onclick=()=>{let t=n.textContent.includes(`Start`);a();try{localStorage.setItem(`surfski.seen`,`1`)}catch{}t&&e?.()},t.addEventListener(`pointerdown`,e=>{if(e.target===t){a();try{localStorage.setItem(`surfski.seen`,`1`)}catch{}}}),{show:i,hide:a,get open(){return r},seen(){try{return localStorage.getItem(`surfski.seen`)===`1`}catch{return!1}}}}function HC(e,t=!1){let n=LC(`touch`);if(n&&(t||matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>0&&innerWidth<900)){n.classList.add(`on`);for(let t of n.querySelectorAll(`button`)){let n=t.dataset.k;t.addEventListener(`pointerdown`,r=>{r.preventDefault(),t.setPointerCapture?.(r.pointerId),t.classList.add(`held`),e(n,!0)});let r=r=>{r.preventDefault(),t.classList.remove(`held`),e(n,!1)};t.addEventListener(`pointerup`,r),t.addEventListener(`pointercancel`,r),t.addEventListener(`lostpointercapture`,r)}}}var UC=[[.75,45]],WC=(e,t)=>1/Math.min(e*t,e>=60?50:1/0),GC=[1,1.25,1.5,1.75,2];function KC(e,t){let n=GC.find(t=>t>e+.01);return n!=null&&n<=t+1e-9?n:null}function qC(e,t,n=!1){let r=Math.max(Math.min(1,e),e*t);return!n&&r>=e-.01?null:r}var JC=class{constructor(e,{targetFps:t=60,enabled:n=!0,slowAt:r=.92,fastAt:i=.97,cpuShare:a=.8,window:o=45,startSkip:s=90}={}){this.a=e,this.target=t,this.enabled=n,this.win=o,this.slowS=WC(t,r),this.fastS=1/(t*i),this.cpuS=a/t,this.ft=[],this.cpu=0,this.skip=s,this.probe=null,this.pixelBound=!1,this.vertexBound=!1,this.steps=0,this.log=[],this.vi=0,this.history=[],this.trial=null,this.calmS=0,this.retryS=20,this.ups=[],this.events=[],this.onEvent=null,this.w=null,this.stuck=null,this.t0=typeof performance<`u`?performance.now():0,this.windows=[]}rec(e,t){let n={t:this.now(),kind:e,msg:t,win:this.w,after:(this.a.state??this.a.snap)?.()??null};this.w&&(this.w.did=e),this.events.push(n),this.events.length>200&&this.events.shift(),e!==`stuck`&&(this.stuck=null);try{this.onEvent?.(n)}catch{}return n}now(){return+(((typeof performance<`u`?performance.now():0)-this.t0)/1e3).toFixed(1)}setTarget(e,{slowAt:t=.92,fastAt:n=.97,cpuShare:r=.8,deep:i=!0}={}){this.target=e,this.slowS=WC(e,t),this.fastS=1/(e*n),this.cpuS=r/e,this.noDeep=!i,this.ft.length=0,this.cpu=0,this.skip=30,this.w=null,this.rec(`target`,`${e} fps${i?``:`, never below render scale 1.0`}`)}quiet(e){this.log.push(e),this.rec(`back`,e),this.skip=10,this.ft.length=0,this.cpu=0}_try(e){let t=this.a.snap?.(),n=e();return n&&this.a.snap&&this.history.push({before:t,after:this.a.snap()}),n}note(e){this.log.push(e),this.rec(`step`,e),$(e,3200),this.skip=10,this.ft.length=0,this.cpu=0,this.steps++}stuckAt(e,t){this.stuck!==e&&(this.rec(`stuck`,t),this.stuck=e)}restart(e=30){this.ft.length=0,this.cpu=0,this.skip=e}tick(e,t=0){if(!this.enabled||document.hidden)return;if(this.skip>0){this.skip--;return}if(this.ft.push(Math.min(e,.3)),this.cpu+=Math.min(t,.3),this.ft.length<this.win)return;let n=this.ft.sort((e,t)=>e-t),r=Math.max(1,Math.floor(n.length*.9)),i=0;for(let e=0;e<r;e++)i+=n[e];let a=i/r,o=this.cpu/n.length,s=n.reduce((e,t)=>e+t,0),c=s/n.length;if(this.ft.length=0,this.cpu=0,this.w={t:this.now(),fps:+(1/c).toFixed(1),avgMs:+(a*1e3).toFixed(1),meanMs:+(c*1e3).toFixed(1),pageMs:+(o*1e3).toFixed(1),target:this.target,did:this.trial?`judging a trial`:`held`},this.windows.push(this.w),this.windows.length>120&&this.windows.splice(30,1),this.trial){let e=this.trial;if(e.up?c>this.fastS:a>this.slowS){this.a.apply(e.up?e.before:e.entry.after),this.trial=null,this.retryS=Math.min(this.retryS*2,300),this.calmS=0,this.skip=10,this.rec(`trial failed`,`${e.up?`the sharper picture`:`the restored step`} did not hold: put back; next try after ${this.retryS} s calm`);return}++e.windows>=(e.up?3:2)&&(this.trial=null,this.retryS=20,this.calmS=0,e.up?(this.ups.push(e.before),this.log.push(`sharper`),this.rec(`trial kept`,`the sharper picture held`),this.a.kept?.()):(this.history.pop(),this.note(`Fast again: picture and water detail restored a step`)));return}if(this.probe){let{before:e,undo:t}=this.probe;if(this.probe=null,a<e*.8)this.pixelBound=!0,this.rec(`probe`,`the smaller picture helped (${(e*1e3).toFixed(1)} → ${(a*1e3).toFixed(1)} ms): the pixels are a limit`);else{t(),this.history.pop(),this.vertexBound=!0,this.note(`The picture size was not the limit: put the sharpness back and simplifying the water instead`);return}}if(a<=this.slowS){if(this.stuck=null,c>this.fastS){this.calmS=0;return}if(this.calmS+=s,this.calmS<this.retryS)return;if(this.history.length&&this.a.snap&&this.a.apply){let e=this.history[this.history.length-1];this.a.apply(e.before),this.trial={entry:e,windows:0},this.calmS=0,this.skip=10,this.rec(`trial`,`calm for ${this.retryS} s: trying the last step undone`);return}if(this.a.up&&this.a.snap&&this.a.apply){let e=this.a.snap();this.a.up()&&(this.trial={up:!0,before:e,windows:0},this.skip=10,this.rec(`trial`,`calm: trying a sharper picture`)),this.calmS=0}return}if(this.calmS=0,this.ups.length&&this.a.apply){this.a.apply(this.ups.pop()),this.a.kept?.(),this.retryS=Math.min(this.retryS*2,300),this.quiet(`back a step`);return}let l=this.a,u=l.pixels();if(o>this.cpuS&&l.cpu){let e=this._try(()=>l.cpu());if(e){this.note(e);return}}if(!this.pixelBound&&!this.vertexBound&&u>7e5&&this._try(()=>l.scale(.7))){let e=this.history[this.history.length-1];this.probe={before:a,undo:()=>e&&l.apply?l.apply(e.before):l.scale(1/.7,!0)},this.note(`Slow: trying a lower picture resolution`);return}if(this.pixelBound&&this._try(()=>l.scale(.8))){this.note(`Still slow: lowering the picture resolution a little more`);return}if(o>this.cpuS){this.stuckAt(`cpu`,`slow, and the page's own work (${(o*1e3).toFixed(1)} ms a frame) is the limit: nothing left to cut there, so the water and the effects stay as they are`);return}let d=[l.mesh,l.mesh,l.mesh,l.near,l.lite].filter(Boolean);for(;this.vi<d.length;){let e=this._try(()=>d[this.vi++].call(l));if(e){this.note(e);return}}if(this._try(()=>l.scale(.8))){this.note(`Last resort: lowering the picture resolution`);return}let f=l.crit&&this._try(()=>l.crit());if(f)this.note(f);else{if(l.deep&&!this.noDeep){for(let[e,t]of UC)if(1/c<t&&this._try(()=>l.deep(e))){this.note(`Under ${t} fps: picture size ${e} to keep the motion smooth`);return}}this.stuckAt(l.deep&&!this.noDeep?`deep`:`all`,l.deep&&!this.noDeep?`slow, but not slow enough for a picture below render scale 1.0`:`slow, and every step is taken: nothing left to cut`)}}};function YC(e,t=`Space: resume`){let n=document.getElementById(`pausedLbl`);if(!n){n=document.createElement(`div`),n.id=`pausedLbl`,n.style.cssText=`position:fixed;z-index:8;transform:translateX(-50%);color:#ffd23f;font:700 15px system-ui,-apple-system,sans-serif;letter-spacing:.08em;text-shadow:0 1px 4px rgba(0,0,0,.85);pointer-events:none;white-space:nowrap;display:none`;let e=document.createElement(`style`);e.textContent=`body.dbgopen #pausedLbl{visibility:hidden}`,document.head.appendChild(e),document.body.appendChild(n)}n.innerHTML=`PAUSED <span style="font-size:12px;font-weight:600;letter-spacing:0">(${t})</span>`;let r=()=>{let e=document.getElementById(`power`)?.getBoundingClientRect(),t=e&&e.width>0&&e.height>0;n.style.left=t?`${Math.round(e.left+e.width/2)}px`:`50%`,n.style.bottom=t?`${Math.round(innerHeight-e.top+8)}px`:`120px`};clearInterval(YC.timer),n.style.display=e?`block`:`none`,e&&(r(),YC.timer=setInterval(r,400))}var XC=/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic|mesa offscreen/i,ZC=e=>XC.test(String(e||``));function QC(e){return new Set(String(e?.get?.(`caps`)||``).split(`,`).map(e=>e.trim()).filter(Boolean))}var $C={webgl2:`3-D graphics (WebGL 2). This browser is too old for it, or has it turned off.`,context:`access to 3-D graphics. The browser has WebGL 2 but would not give it to the page: hardware acceleration may be off, the graphics driver may be blocked, or other tabs may be holding all the graphics.`,float:`drawing into floating-point images (EXT_color_buffer_float), which the sea is made of. Some phones and older graphics chips cannot.`},ew=`Use an up-to-date Chrome, Edge or Firefox, or another Chromium browser (Vivaldi, Brave, Opera, Arc). Safari 15 or later works on a Mac, iPhone or iPad.`,tw=`Turn on hardware acceleration in the browser's settings (Chrome: Settings › System; Firefox: Settings › General › Performance), then quit and reopen the browser.`,nw=class extends Error{constructor(e,t=``,n=``){super(`this browser cannot run the simulator: needs `+e.join(`, `)+(n?` (`+n+`)`:``)),this.name=`CapsError`,this.missing=e,this.gpu=t,this.detail=n}};function rw(e,t=new Set,n=typeof WebGL2RenderingContext<`u`){let r=String(e?.message||e||``).slice(0,200);return new nw([!n||t.has(`nowebgl2`)?`webgl2`:`context`],``,r)}function iw(e){try{let t=e.getExtension(`WEBGL_debug_renderer_info`);return String(e.getParameter(t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER)||``)}catch{return``}}function aw(e,t=new Set){let n=t.has(`software`)?`Google SwiftShader [?caps=software]`:iw(e.getContext()),r=[],i=[];return!e.capabilities.isWebGL2||t.has(`nowebgl2`)?r.push(`webgl2`):(!e.extensions.has(`EXT_color_buffer_float`)||t.has(`nofloat`))&&r.push(`float`),ZC(n)&&i.push(`This browser is drawing 3-D graphics without the graphics card (software rendering: ${n}), so the simulator will be slow. ${tw}`),{missing:r,warn:i,gpu:n}}function ow(e){let t=e=>String(e).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),n=e.missing.map(e=>`<li>${t($C[e]||e)}</li>`).join(``),r=[ew,e.missing.includes(`webgl2`)?``:tw,e.missing.includes(`context`)?`Close other tabs, or restart the browser.`:``,e.missing.includes(`float`)?`Updating the graphics driver can also help.`:``].filter(Boolean),i=[e.gpu&&`graphics: `+e.gpu,e.detail,navigator.userAgent].filter(Boolean).map(t).join(`<br>`);return`<div id="capsCard" class="modal on" style="z-index:60"><div class="card"><h1>This browser can't run the simulator</h1>
<p class="tag">It needs:</p><ul>${n}</ul><p class="tag">What to try:</p><ul>${r.map(e=>`<li>${t(e)}</li>`).join(``)}</ul>
<p class="fine">${i}</p></div></div>`}function sw(e){document.getElementById(`loading`)?.remove(),document.getElementById(`capsCard`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,ow(e))}function cw(e){let t=document.getElementById(`capsNote`);if(t||(t=document.createElement(`div`),t.id=`capsNote`,t.setAttribute(`role`,`alert`),document.body.appendChild(t)),[...t.querySelectorAll(`p`)].some(t=>t.textContent===e))return;let n=document.createElement(`div`),r=document.createElement(`p`),i=document.createElement(`button`);r.textContent=e,i.textContent=`×`,i.setAttribute(`aria-label`,`Close`),i.onclick=()=>{n.remove(),t.children.length||t.remove()},n.append(r,i),t.appendChild(n)}function lw(e){let t=!1;return(n,r,i,a)=>{let o=e=>String(e||``).trim().slice(0,4e3);console.error(`THREE.WebGLProgram: Shader Error`,o(n.getProgramInfoLog(r)),o(n.getShaderInfoLog(i)),o(n.getShaderInfoLog(a))),!t&&(t=!0,cw(`The graphics driver could not build part of the picture (a shader failed${e?` on `+e:``}), so some of the scene may be missing. Try another browser or update the graphics driver.`))}}var uw=new Float32Array(16);if(typeof window<`u`&&(window.__FFTSea=Wa),typeof Worker<`u`&&new URLSearchParams(location.search).get(`sliceworker`)!==`0`)try{Wa.prefetch=new to(new Worker(new URL(new URL(`slice-worker-C8RikruM.js`,import.meta.url).href,``+import.meta.url),{type:`module`}))}catch(e){console.warn(`no slice worker; the sea makes its slices on the main thread`,e)}ce.enabled=!1,ic.tonemapping_pars_fragment=ic.tonemapping_pars_fragment.replace(`vec3 CustomToneMapping( vec3 color ) { return color; }`,`vec3 CustomToneMapping( vec3 color ) { color *= toneMappingExposure; float k = ${.72.toFixed(2)}, m = max(max(color.r, color.g), max(color.b, 1e-5));
    float f = m < k ? m : k + (1.0 - k) * (1.0 - exp(-(m - k) / (1.0 - k))); return color * (f / m); }`);var dw={hemi:1.25,sun:1.75,env:.95},fw=(()=>{let e=new URLSearchParams(globalThis.location?.search??``).get(`envi`),t=Number(e);return e!=null&&e!==``&&Number.isFinite(t)&&t>=0?t:new URLSearchParams(globalThis.location?.search??``).get(`materials`)===`legacy`?dw.env:Cs.env})(),pw=.514444,mw=Number(new URLSearchParams(location.search).get(`bladey`)??0),hw=new jt(.74,.83,.91),gw=new URLSearchParams(location.search).get(`sector`)===`1`,_w=[`config`,`roller`,`rollervol`,`rollersteps`,`rollerdebug`,`rollerspray`,`spillvol`,`foamevents`,`rollerpass`,`rollerscale`],vw=new J;function yw(e){e.getWorldDirection(vw);let t=Math.asin(Math.max(-1,Math.min(1,vw.y))),n=Math.tan(e.fov*Math.PI/360),r=n*e.aspect,i=Math.atan(Math.hypot(r,n)/Math.max(Math.cos(t),.2))+.35,a=Math.max(0,e.position.y);return{c:Math.atan2(vw.z,vw.x),span:2*i,rFull:Math.max(40,3*a)}}function bw(e){return e.getWorldDirection(vw),{c:Math.atan2(vw.z,vw.x),span:2*Math.PI,rFull:60}}var xw={key:0,hb:0,cs:1,rMax:0},Sw={on:new URLSearchParams(location.search).get(`viewmesh`)!==`0`,h:1.3,pix:.0011,at:0},Cw=(e,t)=>Sw.on?{...ww[e],cf:t,cs:1,rMax:Sw.h>=20?Math.max(ww[e].rMax,80*Sw.h):ww[e].rMax,view:{h:Sw.h,pix:Sw.pix,k:ps[e].k,sMin:ps[e].sMin/Math.max(.5,t)}}:{...ww[e],cf:t,cs:xw.cs,rMax:Math.max(ww[e].rMax,xw.rMax)},ww={Low:{J:200,K:220,power:2.4,rMax:1200},Draft:{J:280,K:290,power:2.4,rMax:1400},Standard:{J:360,K:360,power:2.4,rMax:1500}},Tw={"Boyan cam":{fov:90,local:[0,1.25,.15],pitch:-.3,steady:.75,hideRider:!0},"Deck cam":{fov:93,local:[0,.98,.42],pitch:-.13,steady:0,hideRider:!0},"Head POV":{fov:75,local:[0,1,.5],pitch:-.04,steady:.8,hideRider:!0},"Shoulder cam":{fov:95,local:[0,1.75,2.25],pitch:-.24,steady:.6,hideRider:!1},Drone:{fov:70,drone:!0},"Free cam":{fov:70,free:!0},Chase:{fov:60},Overhead:{fov:55}};function Ew(){return{textureRect:new Er(-1e6,-1e6,2e6,2e6),buildDepthTexture(){let e=ti.toHalfFloat(100),t=new sr(new Uint16Array([e,e,e,e]),2,2,Ma,sn);return t.minFilter=t.magFilter=_t,t.needsUpdate=!0,t}}}async function Dw(e){let t=e.get(`config`);if(!t)return null;let n=e=>{try{let t=new URL(e,location.href);return t.origin===location.origin?t:null}catch{return null}},r=n(t);if(!r)return console.warn(`?config= must be a file on this site:`,t),null;try{let t=await fetch(r).then(e=>{if(!e.ok)throw Error(`${e.status} ${r.pathname}`);return e.json()});if(t?.kind!==`surfski-scenario`&&t?.kind!==`surfski-settings`)throw Error(`not a scenario or settings file (kind surfski-scenario or surfski-settings)`);if(t.seaRef&&!t.seaModel){let e=n(new URL(t.seaRef,r).href);e&&(t.seaModel=await fetch(e).then(e=>e.ok?e.json():null))}for(let[n,r]of Object.entries(t.switches??{}))!e.has(n)&&/^[a-zA-Z][a-zA-Z0-9]{0,30}$/.test(n)&&e.set(n,String(r));return t.scenario!=null&&!e.has(`scenario`)&&e.set(`scenario`,String(t.scenario)),e.has(`intro`)||e.set(`intro`,`0`),t}catch(e){return console.warn(`?config= not used:`,e.message),null}}async function Ow(){let t=new URLSearchParams(location.search),n=await Dw(t);$s(t,{user:Zs(),file:n?.settings??{}});let r={},i={},a={},o={},s=document.getElementById(`gl`),c=document.getElementById(`v2d`),l=!1;try{let e=Number(localStorage.getItem(`surfski.boot`));l=e>0&&Date.now()-e<6e5,localStorage.setItem(`surfski.boot`,String(Date.now()))}catch{}let u=t.get(`safe`)===`0`?``:t.get(`safe`)===`1`?`safe=1`:/Xbox|PlayStation|SMART-TV|SmartTV|Tizen|Web0S|WebOS|BRAVIA|AFTM/i.test(navigator.userAgent)?`console browser`:navigator.deviceMemory&&navigator.deviceMemory<=2?`small memory (`+navigator.deviceMemory+` GB)`:l?`the last start did not finish`:``,d=!!u,f=$h(t),p=Zh[f.tier];window.__tier={...f,profile:p},t.get(`boat`)===`v3`&&Tm({...t.get(`rudder`)?{rudder:t.get(`rudder`)===`large`?`Nelo large`:`Nelo short`}:{},...t.get(`wavehull`)===`1`?{_0x31e17f:!0}:{}}),ks.value=[`physical`,`standard`,`simple`,`legacy`].includes(t.get(`materials`))?t.get(`materials`):p.materials;for(let[e,n]of Object.entries(p.query??{}))t.has(e)||t.set(e,n);f.tier!==`desktop`&&setTimeout(()=>window.__crumb?.(`device: ${f.tier} (${f.why})`),0),d&&setTimeout(()=>window.__crumb?.(`safe mode because: `+u),0),window.__crumb?.(`start`);let m=QC(t),h=null,g=null;for(let e of[{antialias:!d&&p.antialias!==!1,stencil:!0,powerPreference:`high-performance`},{antialias:!1,stencil:!1,powerPreference:`low-power`},{antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:`default`,failIfMajorPerformanceCaveat:!1}]){if(m.has(`nowebgl2`)||m.has(`nocontext`)){g=`pretend: ?caps=`+[...m].join(`,`);break}try{h=new yd({canvas:s,reversedDepthBuffer:t.get(`revz`)!==`0`,...e});break}catch(e){g=e,window.__crumb?.(`graphics context refused: `+String(e.message||e).slice(0,120))}}if(!h)throw rw(g,m);addEventListener(`pagehide`,e=>{if(!e.persisted)try{h.forceContextLoss()}catch{}}),await window.__crumb?.(`renderer created`),s.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),window.__showError?.(`WebGL context lost (the graphics memory ran out or the driver reset). Try ?safe=1`)}),h.outputColorSpace=Kt,h.toneMapping=t.get(`shoulder`)===`0`?0:5;let _=aw(h,m);if(_.missing.length)throw h.dispose(),new nw(_.missing,_.gpu);for(let e of _.warn)cw(e);h.debug.onShaderError=lw(_.gpu),window.__crumb?.(`graphics: `+_.gpu);let y=new Yn;y.fog=new v(hw,4e-4);{let e=ic.fog_fragment,t=`fogDensity * fogDensity * vFogDepth * vFogDepth`;e.includes(t)&&(ic.fog_fragment=e.replace(t,`fogDensity * vFogDepth`))}let b=new Br(100,1,.05,2e4),x=new en(13624319,3102048,t.get(`amb`)==null?dw.hemi:Number(t.get(`amb`))),S=x.intensity;y.add(x);let C=null,w=null,T=e=>{w=t.get(`lwmap`)===`0`?null:e?.gusty?e:null,w&&!C&&(C=new Rv(h)),C?.setWind(w);let n=D.uniforms;w?(n.uLWTex.value=C.texture,n.uLWRect.value=C.rect,n.uLW0.value.set(1,w.windMs,w.gustMs,w.lullMs)):n.uLW0.value.set(0,0,0,0)},E=()=>{w&&C.update(b.position.x,-b.position.z,q)},D=$o(Ew(),{query:t,compact:d||t.get(`compact`)===`1`,skirt:t.get(`hzaa`)!==`0`,...ww.Standard,micro:.5,sector:gw,tm:t.get(`tm`)==null?0:Number(t.get(`tm`)),jitter:t.get(`jitter`)==null?void 0:Number(t.get(`jitter`))});D.uniforms.uFogDensity.value=4e-4,await window.__crumb?.(`water built`);let O=new Ct(16773590,dw.sun),k=t.get(`sunI`)==null?dw.sun:Number(t.get(`sunI`)),A={get sun(){return xs.sun.value},set sun(e){xs.sun.value=e},get hemi(){return xs.sky.value},set hemi(e){xs.sky.value=e},env:fw};t.get(`boatsun`)&&(A.sun=Number(t.get(`boatsun`))),t.get(`boatsky`)&&(A.hemi=Number(t.get(`boatsky`))),O.position.copy(D.uniforms.uSunDir.value).multiplyScalar(1e3),y.add(O,O.target);let j=!d&&t.get(`shadow`)===`1`;h.shadowMap.enabled=j,O.castShadow=j,/Firefox/i.test(navigator.userAgent)&&(h.shadowMap.type=0),O.shadow.mapSize.set(1024,1024),O.shadow.bias=-4e-4,O.shadow.normalBias=.02,O.shadow.radius=3,Object.assign(O.shadow.camera,{left:-4.5,right:4.5,top:4.5,bottom:-4.5,near:900,far:1100});function M(e){let n=nC(e,H.cloudType??.25,H.cloudVar??.4),r=D.uniforms,i=n.opaque;r.uClW.value.set(n.low,n.mid,n.high,n.variety),r.uClLow.value.set(n.puff,n.scale,n.base,i),r.uClTow.value.set(n.tower,n.towers,n.anvil,n.sheet);let a=Math.min(1,Math.max(0,(i-.25)/.7)),o=H.cloudDark??0,s=(1-.9*a*a*(3-2*a))*(1-.5*o);r.uCloud.value=e,r.uCloudDark.value=o;try{ct()}catch{}let c=H.sunGain??1,l=H.ambGain??1,u=F?.sunOcc??1;r.uSunT.value=s*c,r.uSunOcc.value=u,r.uClGain.value=c,O.intensity=(k*s*c*u+.15*(1-s))*(F?.lightSun??1),x.intensity=S*l*(1-.4*o)*(F?.lightSky??1),r.uSeaAmb&&(r.uSeaAmb.value=(t.get(`seaamb`)==null?1:Number(t.get(`seaamb`)))*(1+1.5*(l-1)))}let N=new En(new _i(9e3,32,16),new Ui({side:1,depthWrite:!1,fog:!1,uniforms:{...Object.fromEntries(Is.map(e=>[e,D.uniforms[e]])),uSkyDisp:{value:null},uSkyDispOn:{value:0}},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; uniform samplerCube uSkyDisp; uniform float uSkyDispOn; ${ls}
void main(){ vec3 d = normalize(vec3(vDir.x, max(vDir.y, 0.002), vDir.z));
if (uSkyDispOn > 0.5) { vec4 s = textureCube(uSkyDisp, d); gl_FragColor = vec4(sunOver(s.rgb, d, 1.0 - s.a), 1.0); }
else { vec3 b = skyBase(d, true); gl_FragColor = vec4(sunOver(b, d, 1.0 - gCloudA), 1.0); } }`}));N.renderOrder=-1;let P=t.get(`skycube`)===`0`?null:(()=>{let n=new Fc(256,{type:sn,generateMipmaps:!0,minFilter:_e,magFilter:_t}),r=new Yn,i=new e(.1,100,n),a=t.get(`skydisp`)==null?1024:Math.min(2048,Number(t.get(`skydisp`))||0),o=a?new Fc(a,{type:Ee,generateMipmaps:!1,minFilter:_t,magFilter:_t}):null,s=o?new e(.1,100,o):null,c=t.get(`clvol`)!==`0`,l=e=>new Fc(e,{type:sn,generateMipmaps:!1,minFilter:_t,magFilter:_t}),u=2**Math.round(Math.log2(Math.min(2048,Math.max(256,Number(t.get(`volsize`))||512)))),d=u/2,f=c?l(u):null,p=c?l(d):null,m={value:f?.texture??null},g={value:2/u},_=f?new e(.1,100,f):null,v=p?new e(.1,100,p):null,y=new Yn,b=()=>Object.fromEntries(Is.map(e=>[e,D.uniforms[e]])),x=c?{CL_VOLTEX:``}:{};f&&y.add(new En(new _i(10,64,32),new Ui({defines:{CL_VOLONLY:``},side:1,depthWrite:!1,depthTest:!1,fog:!1,uniforms:b(),vertexShader:`varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; ${ls} void main(){ vec3 d = normalize(vDir); gVol = vec4(0.0); if (d.y > -0.004) skyBase(normalize(vec3(d.x, max(d.y, 0.002), d.z)), true); gl_FragColor = gVol; }`}))),r.add(new En(new _i(10,64,32),new Ui({defines:x,side:1,depthWrite:!1,depthTest:!1,fog:!1,uniforms:{...b(),...f?{uVolCube:m,uVolTx:g}:{}},vertexShader:`varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; ${ls} void main(){ vec3 d = normalize(vDir); vec3 c = skyBase(normalize(vec3(d.x, max(d.y, 0.002), d.z)), true); gl_FragColor = vec4(c, gCloudA); }`})));let S=``,C=(e,t,n,r,i)=>{e.parent===null&&e.updateMatrixWorld(),e.coordinateSystem!==h.coordinateSystem&&(e.coordinateSystem=h.coordinateSystem,e.updateCoordinateSystem());let a=h.getRenderTarget(),o=h.getActiveCubeFace(),s=h.getActiveMipmapLevel(),c=h.xr.enabled,l=e.renderTarget,u=l.width,d=Math.floor(u*r/i),f=Math.floor(u*(r+1)/i);l.scissor.set(0,d,u,f-d),l.scissorTest=i>1,h.xr.enabled=!1,h.setRenderTarget(l,n),h.render(t,e.children[n]),l.scissorTest=!1,h.setRenderTarget(a,o,s),h.xr.enabled=c},w=()=>{let e=``;for(let t of Is){let n=D.uniforms[t]?.value;e+=(n==null?``:n.isTexture?`t${n.version}`:typeof n==`number`?n.toFixed(5):n.toArray?n.toArray().map(e=>e.toFixed(5)).join(`,`):String(n))+`|`}return e},T={draft:Math.max(1,Math.round(2*(u/512)**2)),full:Math.max(1,Math.round(4*(u/512)**2))},E=new Kn(5,5),O=new Uint8Array(100),k=new Yn,A=new ee(-1,1,1,-1,0,1);return k.add(new En(new Nr(2,2),new Ui({defines:c?{CL_VOL:``}:{},depthTest:!1,depthWrite:!1,uniforms:Object.fromEntries(Is.map(e=>[e,D.uniforms[e]])),vertexShader:`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`${ls} void main(){ vec3 s = normalize(uSunDir), e1 = normalize(cross(s, abs(s.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0))), e2 = cross(s, e1); vec2 o = (gl_FragCoord.xy - ${(5/2).toFixed(1)}) * ${.02.toFixed(4)}; skyBase(normalize(s + e1 * o.x + e2 * o.y), true); gl_FragColor = vec4(gCloudA, gSunT, 0.0, 1.0); }`}))),{redraws:0,fulls:0,last:-1e9,full:0,pend:``,face:0,update(){let e=w(),t=performance.now();if(e!==S&&this.pend!==`draft`&&!(S&&t-this.last<200)){let n=!S;if(S=e,this.last=t,this.full=0,v)this.pend=`draft`,this.face=0,n&&(v.update(h,y),this.face=6*T.draft);else return this.draw()}if(this.pend){let e=this.pend===`full`,n=T[this.pend];if(this.face<6*n&&(C(e?_:v,y,Math.floor(this.face/n),this.face%n,n),this.face++),this.face<6*n)return;if(this.pend=``,this.face=0,m.value=e?f.texture:p.texture,g.value=e?2/u:2/d,e){this.fulls++,i.update(h,r),s&&s.update(h,r);return}return this.full=t+400,this.draw()}this.full&&t>=this.full&&e===S&&(this.full=0,this.pend=`full`,this.face=1,C(_,y,0,0,T.full))},draw(){let e=D.uniforms;this.redraws++,i.update(h,r),e.uSkyCube.value=n.texture,e.uSkyCubeOn.value=1,s&&(s.update(h,r),N.material.uniforms.uSkyDisp.value=o.texture,N.material.uniforms.uSkyDispOn.value=1);let t=h.getRenderTarget();h.setRenderTarget(E),h.render(k,A),h.readRenderTargetPixels(E,0,0,5,5,O),h.setRenderTarget(t);let a=0,c=0;for(let e=0;e<25;e++){let t=e%5-2,n=Math.floor(e/5)-2,r=Math.exp(-(t*t+n*n)/2);a+=r*(O[4*e+1]/255),c+=r}a/=c;let l=.12+.88*a;F.occWas=1-.88*(O[48]/255),Math.abs(l-(F.sunOcc??1))>.01&&(F.sunOcc=l,M(H.cloud))}}})(),F={haze:null,atm:null,key:``,sky:null,look:null,lightSun:1,lightSky:1,skyCol:[1,1,1],half:e=>e},I=(e,t)=>{let n=D.uniforms[e].value,r=n.image.data;for(let e=0;e<t.length;e++)r[e]=ti.toHalfFloat(t[e]);n.needsUpdate=!0};function L(){if(typeof H.haze==`string`){let e=Qo[H.haze]??Qo.Light;H.hazeAmt=e[0],H.hazeType=e[1]}H.haze=null}let te=null,ne=0;function re(){H.weatherPreset=`Custom`,clearTimeout(te);let e=performance.now();e-ne>150?(ne=e,Yr()):te=setTimeout(()=>{ne=performance.now(),Yr()},150)}function ie(){L();let e=Math.round((H.hazeAmt??.38)*100)/100,t=Math.round((H.hazeType??.3)*100)/100,n=`${e},${t}`,r=D.uniforms,i=Math.max(-4,H.sunEl)*Math.PI/180;F.haze!==n&&(F.atm=gs(ts(e,t)),F.haze=n,F.key=``);let a=`${n}|${H.sunEl}`;a!==F.key&&(F.key=a,F.sky=_s(F.atm,i),I(`uSkyR`,F.sky.rayleigh),I(`uSkyM`,F.sky.mie));let o=F.sky,s=F.look={...hs(o),sunSin:Math.sin(i)},c=o.g;r.uSkyExp.value.fromArray(s.exp),r.uSunDisc.value.fromArray(s.sunDisc),r.uSunE.value.fromArray(s.sunE);let l=e=>cs(F.atm,e,i).map((e,t)=>e*s.exp[t]*.8/Math.PI);r.uCloudSun.value.fromArray(l(eC.low)),r.uClSunM.value.fromArray(l(eC.mid)),r.uClSunH.value.fromArray(l(eC.high)),r.uClSunTop.value.fromArray(l(eC.top)),r.uCloudAmb.value.fromArray(s.skyE.map(e=>e*.85/Math.PI)),r.uFogExt.value.fromArray(o.ext.map(e=>e*(H.fogScale??1))),r.uSkyPhase.value.set(c.g,c.gPeak,c.wPeak,0),r.uLook.value.set(ns.knee,ns.sat,ns.bleach[0],ns.bleach[1]),r.uSatFade.value.set(...ns.satFade);let u=Math.min(1,Math.max(0,(s.lightSun-.03)/.37)),d=ns.bleach[2]*u*u*(3-2*u),f={...ns,bleach:[ns.bleach[0],ns.bleach[1],d]};r.uBleach.value=d,r.uGlintCol.value.fromArray(Go(s.sunCol.map(e=>e*40),f));let p=Ns(Ss(H.teal,H.turbid??0),s,H.bottom??[.22,.19,.15]);r.uWDeep.value.fromArray(As(p.deep,1/ns.sat)),r.uWBot.value.fromArray(As(p.bot,1/ns.sat)),r.uWKd.value.fromArray(p.kd),r.uWSss.value.fromArray(Go(p.sss)),F.lightSun=s.lightSun,F.lightSky=s.lightSky,F.skyCol=s.skyCol.map(e=>.55+.45*e);let m=Math.max(...F.skyCol);F.skyCol=F.skyCol.map(e=>e/m),O.color.setRGB(...s.sunCol),x.color.setRGB(...F.skyCol),x.groundColor.setRGB(...Go(p.deep.map(e=>e*4)));{let e=[0,1,2].map(e=>.6*s.lightSun*s.sunCol[e]+.4*s.lightSky*F.skyCol[e]),t=Math.max(...e,.001),n=Math.min(1.3,t)/t;F.landTint=e.map(e=>e*n),yt?.material.color?.setRGB(...F.landTint)}}function ae(){if(!F.sky)return;b.getWorldDirection(oe);let e=D.uniforms,t=e.uSunDir.value,n=Math.atan2(oe.x,-oe.z)-Math.atan2(t.x,-t.z),r=F.sky.horizonAt(n).map((e,t)=>e*F.look.exp[t]),i=Math.min(1,Math.max(0,(e.uClLow.value.w-.3)/.7)),a=e.uCloudAmb.value,o=r.map((e,t)=>e*(1-.85*i)+.85*i*.9*a.getComponent(t));y.fog.color.setRGB(...Go(o)),y.fog.density=Qc?0:F.sky.ext[1]*(H.fogScale??1),h.setClearColor(y.fog.color)}let oe=new J,se=new rm(Qp[`Generic ski`]),ce=new zo(y),le=new of(y,D.uniforms),ue={},de=new lp(y,D.uniforms),fe=new J,pe=new Dr,me={},he=null,ge=new Os(h,D);typeof window<`u`&&(window.__fftg=ge),typeof window<`u`&&(window.__foam=()=>Ce);let ve=new QS(h,D),ye=null;try{ye=new Worker(new URL(new URL(`kelvin-worker-CFlBvb48.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){console.warn(`no Kelvin worker; the ski's wave fields are made on the main thread`,e)}let be=t.get(`bow`)===`0`?null:new Yh(D,se,{worker:ye}),xe=be?.wake(0)??null,Se=t.get(`racerwakes`)!==`0`;be&&t.get(`bowx`)&&(be.scale=Number(t.get(`bowx`))),typeof window<`u`&&(window.__bow=()=>xe);let Ce=t.get(`foam`)===`0`?null:new qy(h,D);D.uniforms.uTrailMinR.value=Ce?.8*Ce.extent/2:0;let we=null,Te=(e=Number(t.get(`foamevents`))||0)=>we||(we=new _b(h,y,D,{vol:Number(t.get(`rollervol`)??1),steps:Number(t.get(`rollersteps`)??$y.steps),debug:Number(t.get(`rollerdebug`)??0),events:e,pass:t.get(`rollerpass`)!==`0`,scale:Number(t.get(`rollerscale`))>0?Number(t.get(`rollerscale`)):null,light:Number(t.get(`rollerlight`)??2),fine:Number(t.get(`rollerfine`)??1),stepK:Number(t.get(`rollerstepk`)??1),fog:t.get(`rollerfog`)==null?null:Number(t.get(`rollerfog`)),soft:t.get(`rollersoft`)==null?null:Number(t.get(`rollersoft`)),bilat:t.get(`rollerbilat`)!==`0`,sink:t.get(`rollersink`)==null?null:Number(t.get(`rollersink`)),skin:t.get(`rollerskin`)==null?null:Number(t.get(`rollerskin`)),puff:(()=>{let e=t.get(`foamride`)===`0`?{ride:0,rideW:0,aheadSlots:0,fadeMin:0}:Number(t.get(`foamride`))>0?{ride:Number(t.get(`foamride`))}:{};return t.get(`foamdepth`)!=null&&(e.center=-Math.abs(Number(t.get(`foamdepth`)))),t.get(`foambelow`)!=null&&(e.below=Number(t.get(`foambelow`))),t.get(`foamface`)!=null&&(e.faceTheta=Number(t.get(`foamface`))),Object.keys(e).length?e:null})()}),t.has(`spillvol`)||(D.uniforms.uSpillVol.value=0),Ce&&Ce.usePuffs(we.uniforms),we);(t.get(`roller`)===`1`||Number(t.get(`foamevents`))>0)&&Te(),typeof window<`u`&&(window.__roller=()=>we);let R=vs(se,{paddleDetail:p.paddle}),De=0,Oe=null,ke=Promise.resolve(),z,Ae=new Promise(e=>{z=e});function B(e){let n=++De;R.userData.skinned?.remove(),e?ke=ry(async()=>{let{loadBody:e,SkinnedPaddler:t}=await import(`./skinned-paddler-DdWK7uaw.js`);return{loadBody:e,SkinnedPaddler:t}},__vite__mapDeps([4,3,5,6,7]),import.meta.url).then(({loadBody:t,SkinnedPaddler:r})=>t(e,`./`).then(e=>Ae.then(()=>e)).then(e=>{if(n===De){new r(R,e).setSkinTone(Ts.indexOf(H.skin),`./`),Ps(R,Yo[H.pfd]??Yo[`Hi-vis yellow`]),st(R),Xe();try{Rt()}catch{}}})).catch(r=>Ae.then(()=>{n===De&&(console.error(`body not loaded`,e,r),(e!==`mike-kit`||t.get(`body`))&&$(`That paddler model is not available here: the simple figure instead`),H.body=``,Oe?.updateDisplay())})):Xe()}{let e=t.get(`body`)===`simple`?``:t.get(`body`)??`mike-kit`;e&&B(e)}let je=e=>se?se.halfWidth(Math.min(Math.max(e/se.spec.L,0),1)):.1,Me=se?se.deckRel(0)-se.keelRel(0):.28,Ne=se?new Yd(se,D.uniforms):null;Ne&&(R.add(Ne.mesh),window.__deckWater=Ne);let Pe=new Map;t.get(`wlcut`)!==`0`&&Of(D.uniforms);let Fe=e=>{let t=Pe.get(e);return t||(t=new Mf(e.userData.parts.hull),Pe.set(e,t)),t};Fe(R).setLook({style:df.swoosh,c1:741288,c2:16054008,number:Number(t.get(`bib`)??7)});let Ie=vs(se);Ie.visible=!1,Fe(Ie).setLook(Cf(15659764,4,99));let Le=()=>t.get(`smallsea`)==null?(U?.state?.stats?.hs??1)<o_.hs:t.get(`smallsea`)===`1`,Re=[],ze=t.get(`fieldseed`)==null?Math.floor(Math.random()*2**31):Number(t.get(`fieldseed`))|0,Be=Number(t.get(`bib`)??7),Ve=(()=>{if(t.get(`racers`)===`0`)return 0;if(t.get(`field`)!=null)return Math.max(0,Math.min(40,Number(t.get(`field`))||0));try{let e=localStorage.getItem(`surfski.field`);if(e!=null&&Object.values(Dv).includes(Number(e)))return Number(e)}catch{}return yS(t,f.tier)===`casual`?Math.min(hv.length,4):Math.min(hv.length,p.field??hv.length)})(),He=yS(t,f.tier)===`casual`,Ue=e=>{let n=jv(e,{seed:ze,bib:Be}),r=Ke()===`group`;return gv(e,!He&&(r||t.get(`fieldbots`)===`1`)).map((e,t)=>({...He&&e.bot?{...hv[1],factor:1.1}:e,...n[t],...r?{name:n[t].first}:{}}))},We=(()=>{let e=(t.get(`session`)??``).toLowerCase();if(e===`group`||e===`race`)return e===`group`?`Group paddle`:`Race`;try{let e=localStorage.getItem(`surfski.session`);if(pv[e])return e}catch{}return`Race`})(),Ge=We,Ke=()=>pv[Ge]??`race`,qe=Ue(Ve),Je=e=>hr?.setters?.[e]??qe[e]??{},Ye=e=>t.get(`racerskin`)==null?Je(e).skin??Ko():Number(t.get(`racerskin`));function Xe(){Re.forEach((e,t)=>{if(!e)return;let n=Je(t),r=H.body&&n.body?n.body:``,i=e.userData,a=Yo[n.pfd]??Yo[`Hi-vis yellow`];if(i.bodyWant===r){Ps(e,a);return}i.bodyWant=r;let o=i.bodyReq=(i.bodyReq??0)+1;i.skinned?.remove(),Ps(e,a),r&&(i.bodyLoad=ry(async()=>{let{loadBody:e,SkinnedPaddler:t}=await import(`./skinned-paddler-DdWK7uaw.js`);return{loadBody:e,SkinnedPaddler:t}},__vite__mapDeps([4,3,5,6,7]),import.meta.url).then(({loadBody:n,SkinnedPaddler:s})=>n(r,`./`).then(n=>{if(o!==i.bodyReq)return;let r=new s(e,n);r.simpleHands=!0,Ps(e,a),r.setSkinTone(Ye(t),`./`),e.traverse(e=>{e.isMesh&&(e.castShadow=j,e.receiveShadow=j)}),st(e)})).catch(e=>console.warn(`competitor body not loaded`,r,e)).finally(()=>{i.bodySettled=!0,Rt()}))})}let Ze=null,Qe=!1;function $e(){if(Ze||!H.racers||G!==`Free play`)return;let e=window.__warm={t0:performance.now()},t=()=>new Promise(e=>setTimeout(e,30));Ze=Promise.all(qe.map((e,t)=>et(t,e.color).userData.bodyLoad??null)).then(async()=>{e.bodies=performance.now()-e.t0;for(let e of Re)js(e,0,!1,Wt().prof.form),e.userData.skinned?.pose(),await t();e.fit=performance.now()-e.t0;let n=Re.map(e=>e.visible);Re.forEach(e=>{e.visible=!0});let r=h.compileAsync?h.compileAsync(y,b):Promise.resolve(h.compile(y,b));return Re.forEach((e,t)=>{e.visible=n[t]}),e.sync=performance.now()-e.t0,r.then(()=>{e.done=performance.now()-e.t0})}).catch(e=>console.warn(`competitors not made ahead`,e)).finally(()=>{Qe=!0;try{Rt()}catch{}})}let et=(e,t)=>{if(!Re[e]){let t=vs(se,{paddleDetail:p.racerPaddle});t.visible=!1,t.traverse(e=>{e.isMesh&&(e.castShadow=j,e.receiveShadow=j)}),y.add(t),Re[e]=t,st(t)}!Re[e].userData.bodyWant&&Re[e].userData.bodyWant!==``&&Xe(),Re[e].userData.parts.hull.material.color.setHex(t);let n=qe[e]?.look??Cf(t,e+1);return Re[e].userData.decalLook!==n&&(Re[e].userData.decalLook=n,Fe(Re[e]).setLook(n)),Re[e]};y.add(N,D.mesh,R,Ie);for(let e of[R,Ie])e.traverse(e=>{e.isMesh&&(e.castShadow=j,e.receiveShadow=j)});let tt=!d&&t.get(`env`)!==`0`,nt=tt?new Ec(h):null,rt=new Yn,it=null,at=0;rt.add(new En(new _i(10,16,8),N.material));function ot(){if(tt){it?.dispose(),it=nt.fromScene(rt,.02,.1,100);for(let e of[R,Ie,...Re])st(e)}}function st(e){it&&e.traverse(e=>{e.isMesh&&e.material?.isMeshStandardMaterial&&e.material.envMap!==it.texture&&(Es(e.material),e.material.envMap=it.texture,e.material.envMapIntensity=A.env,e.material.needsUpdate=!0)})}let ct=()=>{tt&&(clearTimeout(at),at=setTimeout(ot,150))};await window.__crumb?.(`boat and foam built`);let V=new Ys(void 0,{base:`./`});t.get(`audio`)===`0`&&(V.s.on=!1);let lt=()=>``;[`synth`,`recorded`].includes(t.get(`strokesound`))&&(V.strokeSound=t.get(`strokesound`));let ut=[`pointerdown`,`pointerup`,`touchend`,`click`,`keydown`],dt=()=>{if(V.start()){try{navigator.audioSession&&navigator.audioSession.type!==`playback`&&(navigator.audioSession.type=`playback`)}catch{}if(V.ctx?.state===`running`)for(let e of ut)removeEventListener(e,dt,!0);else V.ctx?.resume?.().catch(()=>{})}};for(let e of ut)addEventListener(e,dt,!0);document.addEventListener(`visibilitychange`,()=>{document.hidden?V.suspend():V.ctx&&V.ctx.resume()}),window.__audio=V,window.__dbgExtra=()=>`${Rc()}\n\n${lt()}\n\n${V.debugText()}`,window.__soundReport=()=>V.soundReport({build:`0c804ed 2026-11-22 12:48Z`,url:location.href,scenario:U?.name,sea:sr,windSeed:U?.windSeed,paddler:H.paddler,base:`./`});let ft=`surfski.guide`,pt=[`routing`,`guide`,`guideAlts`,`guideStyle`,`guideWeight`,`coaching`],mt={on:hS(localStorage)},ht=e=>{mt.on=!!e,gS(localStorage,mt.on),Fi.battery=mt.on,Fi.api.onBattery?.(mt.on)},H={scenario:No,mode:`Free play`,paddler:Fs,body:t.get(`body`)===`simple`?``:t.get(`body`)??`mike-kit`,skin:(()=>{let e=t.get(`skin`);if(e!=null){let t=Ts.findIndex(t=>t.toLowerCase()===e.toLowerCase());if(t>=0)return Ts[t];if(Ts[Number(e)])return Ts[Number(e)]}try{let e=localStorage.getItem(`surfski.skin`);if(Ts.includes(e))return e}catch{}return Jo})(),pfd:(()=>{let e=Object.keys(Yo),n=e.find(e=>e.toLowerCase()===(t.get(`pfd`)??``).toLowerCase());if(n)return n;try{let t=localStorage.getItem(`surfski.pfd`);if(e.includes(t))return t}catch{}return us})(),view:`Boyan cam`,playback:!1,inset:`Map`,mapZoom:.4,shore:new URLSearchParams(location.search).get(`shore`)!==`0`,quality:`Standard`,crit:Number(new URLSearchParams(location.search).get(`crit`)??1),renderScale:1,fov:Tw[`Boyan cam`].fov,routing:{cruise:`Cruise`,sporty:`Sporty`,race:`Race`,flow:`Surfing flow`,easy:`Cruise`,balanced:`Sporty`,fast:`Race`}[new URLSearchParams(location.search).get(`routing`)??new URLSearchParams(location.search).get(`autoroute`)]??`Sporty`,autopilot:new URLSearchParams(location.search).get(`autopilot`)===`1`||new URLSearchParams(location.search).get(`autoroute`)!=null,guide:!1,guideAlts:!0,coaching:!1,guideWeight:`Normal`,guideStyle:`Next wave`,eyeHeight:1.3,camSteady:.75,playSpeed:1,ripples:1,foam:.65,horizon:`Mountains`,tune:Wm(),sprayAmt:p.sprayAmt??1,gelcoat:1,decals:!0,sprayModel:t.get(`spraymodel`)===`ribbons`?`Ribbons`:`Mesh (prototype)`,faceTint:!1,trailR:220,cloud:.35,cloudDark:0,cloudType:.25,cloudVar:.4,teal:.6,turbid:0,haze:`Light`,hazeAmt:.38,hazeType:.3,fogScale:1,bottom:null,sunAz:0,sunEl:22,timeOfDay:`As designed`,weather:`As designed`,weatherPreset:`As designed`,glint:1.3,crestSharpen:2,wiggle:1,drafting:!0,racers:Ve>0,field:Ve,session:We,droneSide:6,droneBack:-3.5,droneHeight:2,droneYaw:0,dronePitch:0,lite:!1};z();let gt={},U,W=null,vt=null,G=`Free play`,K=!1,q=0,yt=null,bt={field:null,frames:[],dt:1/60},xt=null,St=null,wt=null,Tt=null,Et=null,Dt=null,Ot=null,kt=null,At;try{At=new my({worker:new Worker(new URL(new URL(`wave-solve-worker-PhWXXLTH.js`,import.meta.url).href,``+import.meta.url),{type:`module`})})}catch(e){console.warn(`no shore solve worker; it runs on the main thread`,e),At=new my}window.__shore=()=>({plan:kt&&{...kt,path:void 0},turns:U?.shoreTurns??null,on:!!Ot,gains:Ot,tiles:kn?.gains?{blocks:kn.gains.raw.size,empty:kn.gains.empty.size,done:!!kn.gains.done,ms:Math.round(performance.now()-kn.t0)}:null});let jt={left:!1,right:!1,up:!1,down:!1},Mt=!1,Nt=performance.now(),Pt=!1,Ft=!1,It=0,Lt=0;function Rt(){Nt=performance.now(),Lt=0,Mt&&(Mt=!1,Pt=!0,requestAnimationFrame(Yc))}for(let e of[`keydown`,`keyup`,`pointerdown`,`wheel`,`input`,`change`,`click`,`touchstart`,`touchend`,`resize`,`focus`,`drop`,`dragover`])addEventListener(e,Rt,{passive:!0,capture:!0});addEventListener(`pointerdown`,()=>{Ft=!0},{capture:!0,passive:!0});for(let e of[`pointerup`,`pointercancel`])addEventListener(e,()=>{Ft=!1,Rt()},{capture:!0,passive:!0});for(let e of[`pointermove`,`mousemove`,`scroll`,`contextmenu`,`gamepadconnected`,`compositionstart`,`beforeinput`])addEventListener(e,Rt,{capture:!0,passive:!0});document.addEventListener(`visibilitychange`,Rt),y.addEventListener(`childadded`,Rt),window.__field=()=>({depth:(()=>{let e=Un(),t=U.headingDeg*Math.PI/180,n=Math.sin(t),r=Math.cos(t),i={};for(let t of[-16,-8,-4,0,4,8,16])for(let a of[0,6,12])i[`${t}/${a}`]=e?+e(W.states[0].e+r*t-n*a,W.states[0].n-n*t-r*a).toFixed(1):null;return i})(),user:{e:W.ski.e,n:W.ski.n},live:(hr?.setters??[]).map(e=>({name:e.name,lane:e.lane,back:e.back,e:e.g.ski.e,n:e.g.ski.n}))}),window.__idleState=()=>({idle:Mt,frames:h.info.render.frame,idleFrames:It});let zt=0,Bt=!1,Vt=0;window.__stepFrames=(e=1,t=!1)=>{K&&(K=!1,Vi()),zt+=e,Bt=t,Vt=0,Rt()};let Ht=()=>bt.frames[0]?.t??0,Ut=()=>bt.frames[bt.frames.length-1]?.t??0,Wt=()=>G===`Recording`&&vt?vt:W;function Gt(){let e=Wt();bt={field:e.field,frames:e.frames,dt:e.dt}}let Jt=new rC(c),Yt=new uC(c),Xt=new aC(c),Zt=document.getElementById(`inset`),Qt=()=>60*200**(1-H.mapZoom),$t=e=>(e&&r[nr(e)])?.meta.skylines?.[e.skyline??`default`]??null,tn=t.get(`landfog`)!==`0`,nn=new IC(y,tn?()=>fs(D.uniforms):null),rn=tn?fs(D.uniforms):null,an=e=>{let t=e&&r[nr(e)]?.meta;if(!t||t.maxE==null)return;let n=e.start?.e??0,i=e.start?.n??0;return e=>{let r=Math.sin(e*Math.PI/180),a=Math.cos(e*Math.PI/180),o=1e9;return r>1e-9?o=Math.min(o,(t.maxE-n)/r):r<-1e-9&&(o=Math.min(o,(t.minE-n)/r)),a>1e-9?o=Math.min(o,(t.maxN-i)/a):a<-1e-9&&(o=Math.min(o,(t.minN-i)/a)),Math.min(6e4,Math.max(6e3,Math.max(0,o)+4e3))}};function on(){yt&&=(y.remove(yt),yt.geometry.dispose(),null),yt=wC(H.horizon,U?U.headingDeg:180,$t(U),{material:rn,distAt:an(U)}),yt&&y.add(yt),nn.setGeo(yt&&t.get(`peaks`)===`1`?U?.geo:null)}let cn=null,ln=null,un={},dn={},fn={};function pn(e){let n=e.site,i=n&&r[n]?r[n]:null;if(t.get(`hdg`)!=null&&(e.headingDeg=Number(t.get(`hdg`))),i&&t.get(`at`)){let[n,r]=t.get(`at`).split(`,`).map(Number),[a,o]=$a({lat:i.meta.lat0,lon:i.meta.lon0},n,r);e.start={e:a,n:o},t.get(`hdg`)!=null&&(e.headingDeg=Number(t.get(`hdg`))),mn(e,i)}else{if(i&&e.goalLatLon){let[t,n]=$a({lat:i.meta.lat0,lon:i.meta.lon0},e.goalLatLon[0],e.goalLatLon[1]);e.goal={e:t,n}}if(i&&!e.start){let[t,n]=e.startLatLon?$a({lat:i.meta.lat0,lon:i.meta.lon0},e.startLatLon[0],e.startLatLon[1]):i.point(e.startPoint,e.startOffset);e.start={e:t,n}}mn(e,i)}}function mn(e,n){if(!n||!(e.marks?.length||e.goalLatLon)||t.get(`course`)===`0`)return;e.raceCourse=Wo(e,(e,t)=>$a({lat:n.meta.lat0,lon:n.meta.lon0},e,t),{depthFn:(e,t)=>n.depthAt(e,t)});let r=e===U&&hn?hn:e.raceCourse?.cursor();e.raceCourse&&(e.goal={...e.raceCourse.target(r)??e.raceCourse.target(e.raceCourse.cursor())},e.goalFinal=!1)}let hn=null,gn=[];function _n(){let e=U.raceCourse;if(!e||!hn||!W)return;let t=e.update(hn,W.ski.e,W.ski.n);if(!t)return;gn.push([W.t,hn.i]);let n=e.next(hn);n?(U.goal={...n.point},_r?.setGoal(n.point,!1),$(`${t.lap<n.lap?`Lap ${t.lap} of ${e.laps} done. `:``}${t.buoys?`Through`:`Round`} ${t.mark.name}: next ${e.describe(n)}`)):(_r?.finish(),$(`Finished: through ${t.mark.name}`))}function vn(e){let t=U.raceCourse;if(!t||!hn)return;for(;gn.length>1&&gn[gn.length-1][0]>e+1e-6;)gn.pop();let n=gn[gn.length-1]?.[1]??0;if(n===hn.i)return;hn.i=n,hn.pe=hn.pn=null;let r=t.next(hn);r&&(U.goal={...r.point},_r&&_r.setGoal(r.point,!1))}function yn(e){let n=nr(e),a=n&&r[n];if(!a||t.get(`objects`)===`0`){ce.clear();return}let o=e.start??{e:0,n:0},s={lat:a.meta.lat0,lon:a.meta.lon0},c=e.aidFixes??null,l=(i[n]??[]).map(e=>c?.[e.name]?{...e,...c[e.name]}:e),u=Vo(e.raceCourse,l,s);ce.setSite(s,[...l,...u.buoys],[...e.traffic??Ho[n]??[],...u.boats],o,(e,t)=>a.depthAt(e,t))}let bn=null,xn=null,Sn=!1;function Cn(e,n){if(bn&&bn!==o[e]?.group&&(y.remove(bn),bn=null,xn=null),e&&n&&t.get(`gltf`)&&!Sn&&(Sn=!0,ry(()=>import(`./devmodels-DA9qydCA.js`).then(e=>e.loadDevModels(t.get(`gltf`),(t.get(`gltfAt`)??`${n.meta.lat0},${n.meta.lon0}`).split(`,`).map(Number),y,(e,t)=>$a({lat:n.meta.lat0,lon:n.meta.lon0},e,t))),__vite__mapDeps([8,3,7]),import.meta.url)),e&&n&&H.shore&&a[e]){if(!o[e]){let t=performance.now();o[e]=Vp(a[e],n,{cullM:p.shoreCullM??0}),console.info(`shore ${e}: ${JSON.stringify(o[e].stats)} built in ${Math.round(performance.now()-t)} ms`)}bn!==o[e].group&&(bn=o[e].group,xn=o[e],y.add(bn))}}let wn=t.get(`landlight`);function Tn(e){let n=e.site,i=n&&r[n]?r[n]:null,a=`flat`,o=null;i&&(a=n,un[a]??={terrain:i,mesh:i.buildMesh({gammaLight:wn===`gamma`||wn!==`lambert`&&!!i.landRGB,step:Number(t.get(`landstep`))||p.landStep||1,tiles:uS(`landlod`)})},o=i),xt=o;let s=i&&e.windFromDeg!=null?`${n}:${e.windFromDeg}:${e.fetchKm}:${e.fetchSpreadDeg??0}`:null;s&&(dn[s]??=qs(i,e.windFromDeg,(e.fetchKm??30)*1e3,{spreadDeg:e.fetchSpreadDeg??0})),St=Dt=s?dn[s]:null;let c=i&&t.get(`swellshadow`)!==`0`?Ws(e.seaModel):[],l=c.length?`${n}:swell:${c.map(e=>`${Math.round(e.fromDeg)}/${Math.round(e.spreadDeg)}/${e.Hs.toFixed(2)}`).join(`,`)}`:null;l&&(dn[l]??=Gs(i,c)),wt=l?dn[l]:null;let u=e.seaModel?.shoreMap,d=u&&t.get(`shorefx`)!==`0`?fn[n]?.[u]:null;if(d&&St){let e=`${s}|${u}`;dn[e]??=Uo(St,d),St=dn[e]}if(pn(e),a!==ln){cn&&y.remove(cn),cn=un[a]?.mesh??null,cn&&y.add(cn);for(let[e,t]of Object.entries(un))e!==a&&(t.mesh.userData.dispose(),delete un[e]);for(let e of Object.keys(dn))e.startsWith(`${n}:`)||delete dn[e];ln=a,o?D.setTerrain(o):D.setTerrain(Ew())}Cn(n,i),Ot=null,D.setShoreTexture(null),D.setFetchTexture(Ks(St,wt)),D.setSwellShadow(!!wt),Dn(e,i)}function Dn(e,n){let r=n?{lat:n.meta.lat0,lon:n.meta.lon0}:null,i=(e,t)=>$a(r,e,t),a=t.get(`wavesolve`);if(a!==`window`){jn(e,n,a===`0`?null:n?yy(e,n,e.windSea,{toEnu:i}):null);return}let o=n?dy(e,n,e.windSea,{toEnu:i}):null;if(kt=o,!o){e.shoreTurns&&e===U&&Ln(null);return}let s=At.cached(o);if(s){In(o,s);return}let c=performance.now();At.request(o,n).then(t=>{t&&kt?.key===o.key&&e===U&&(console.info(`shore solve ${o.key}: ${t.W}x${t.H} cells in ${Math.round(performance.now()-c)} ms`),In(o,t))})}let On=new Map,kn=null;function An(){kn&&=(clearInterval(kn.timer),kn.gains?.done||At.cancel(),null)}function jn(e,t,n){if(kn?.plan.key===n?.key&&kn?.sc===e){kn.gains&&(kn.fieldsSet=!1,kn.texAt=0,Fn(kn,!!kn.gains.done));return}if(An(),kt=n,!n){e.shoreTurns&&e===U&&Ln(null);return}let r=kn={plan:n,sc:e,gains:On.get(n.key)??null,turned:!1,t0:performance.now(),texAt:0,ck:Oy(n.key,t)},i=e.start??{e:n.region.e0,n:n.region.n0};r.gains?.done?Fn(r,!0):ky(r.ck).then(a=>{kn===r&&(a?.out&&a.blocks?.length?(r.gains=new xy(a.out,{spread:Dt,turns:null}),r.gains.add(a.blocks),r.gains.done=!0,r.gains.fromCache=!0,On.set(n.key,r.gains),console.info(`whole-map shore solve ${n.key}: from this browser's store (${a.blocks.length} blocks)`),Fn(r,!0)):Mn(r,e,t,n,i))})}function Mn(e,t,n,r,i){let a=()=>{let e=W!==void 0&&W&&t===U?W.ski:null;return e?[[e.e,e.n],[e.e+800*Math.sin(e.psi),e.n+800*Math.cos(e.psi)]]:[[i.e,i.n]]};At.tiles(by(r,n,Dt,a(),(t.fetchKm??30)*1e3,{nearM:0}),t=>{if(kn===e){if(!e.gains)for(e.gains=new xy(t.out,{spread:Dt,turns:null}),On.set(r.key,e.gains);On.size>3;)On.delete(On.keys().next().value);e.gains.add(t.blocks),t.kind===`tilesDone`&&(e.gains.done=!0,clearInterval(e.timer),console.info(`whole-map shore solve ${r.key}: ${t.solved} tiles solved, ${t.open} open, in ${Math.round(t.ms)} ms`),Ay(e.ck,{out:e.gains.out,blocks:[...e.gains.raw.values()]})),Fn(e,t.kind===`tilesDone`)}}),e.timer=setInterval(()=>{kn===e&&!e.gains?.done&&At.focus(a())},3e3)}function Nn(e){let t=W?.field?.fetchFn,n=U.windSea??U.state.windSea,r=Pn(),i=[1,0,0],a=t?(e,n)=>{i[0]=t(e,n);let r=t.turned?t.turned(e,n):null;return i[1]=r?r[0]:0,i[2]=r?r[1]:0,i}:null,o=n?r?r.text:Ot?`Local effects: solved (course window)`:t?`Fetch shelter only`:`Open water`:`No wind sea`;Xt.drawLocal({ski:e,terrain:xt,widthM:Qt(),gain:a,toDeg:n?.toDeg??U.state.stats.dominant?.dirToDeg??0,turns:U.shoreTurns??null,status:o,label:`Wind sea against the open sea`})}function Pn(){let e=kn,t=e?.gains;if(!e||e.sc!==U)return null;if(!t)return{text:`Local effects: solving...`,blocks:[],show:!1,sig:`start`};let n=t.out.BW*t.out.BH,r=t.raw.size+t.empty.size,i=!!t.done;i&&!e.doneAt&&(e.doneAt=performance.now());let a=!i||performance.now()-e.doneAt<1e4,o=t.out.B*t.out.co;return a&&(e.mapN!==t.raw.size||!e.mapBlocks)&&(e.mapN=t.raw.size,e.mapBlocks=[...t.raw.values()].map(e=>({e0:t.out.e0+e.bx*o,n0:t.out.n0+e.by*o,size:o,quick:!!e.quick}))),{text:i?t.fromCache?`Local effects: solved (kept from before)`:`Local effects: solved`:`Local effects: solving... ${Math.round(100*r/n)}%${t.raw.size&&[...t.raw.values()].some(e=>e.quick)?` (yellow: quick pass)`:``}`,done:i,show:a,blocks:a?e.mapBlocks??[]:[],sig:`${r}|${i}|${a}`}}function Fn(e,t){if(!t)return;let n=e.gains,r=e.sc;if(!n||r!==U)return;let i=r.start??{e:e.plan.region.e0,n:e.plan.region.n0};if(!e.turned&&(t||n.covered(i.e,i.n,1e3))){let t=e.plan.path.length?e.plan.path:[[i.e,i.n]],a=t.map(e=>e[0]),o=t.map(e=>e[1]),s=_y(n.window({e0:Math.min(...a)-800,e1:Math.max(...a)+800,n0:Math.min(...o)-800,n1:Math.max(...o)+800}),t),c={left:Math.round(s.left),right:Math.round(s.right)},l=r.shoreTurns??{left:0,right:0};(c.left!==l.left||c.right!==l.right)&&Ln(c.left||c.right?c:null),n.setTurns(U.shoreTurns??null),e.turned=!0,e.fieldsSet=!1,e.texAt=0}let a=performance.now();(t||a-e.texAt>1e3)&&(e.texAt=a,D.setShoreTexture(n.texture(),n.solveRect)),!e.fieldsSet&&(n.raw.size||t)&&(Ot=n,St=Dt,D.setFetchTexture(Ks(Dt,wt)),Rn(),e.fieldsSet=!0),t&&e.texAt!==a&&D.setShoreTexture(n.texture(),n.solveRect),!e.noted&&!n.fromCache&&W!==void 0&&W&&W.t>1&&(e.noted=!0,$(`Wave and shore interactions updated (the local effects are solved)`,3500))}function In(e,t){let n=_y(t,e.path),i={left:Math.round(n.left),right:Math.round(n.right)},a=U.shoreTurns??{left:0,right:0};(i.left!==a.left||i.right!==a.right)&&Ln(i.left||i.right?i:null),Ot=gy(t,U.shoreTurns,{spread:Dt,pack:r[nr(U)],fromDeg:U.windFromDeg,maxFetchM:(U.fetchKm??30)*1e3}),St=Dt,D.setFetchTexture(Ks(Dt,wt)),D.setShoreTexture(Ot.texture(),Ot.solveRect),Rn()}function Ln(e){let t=U.state,n={start:U.start,goal:U.goal,headingDeg:U.headingDeg};Mo(U,U.seaModel,{turns:e}),Object.assign(t,U.state),U.state=t,Object.assign(U,n),U.state.stokes=H.crestSharpen,Jn=null,W!==void 0&&W&&(W.field._envT=void 0),dr()}function Rn(){if(W===void 0||!W)return;let e=Wn();W.field.fetchFn=e,W.field._plan=null,Jn=null,mr=null;for(let t of hr?.setters??[])for(let n of new Set([t.g.field,t.full].filter(Boolean)))n.fetchFn=e,n._plan=null;_r?._sim&&(_r._sim.field=W.field.planField())}let zn={},Bn={s:0,size:0,pan:0},Vn=-1;function Hn(e,t){if(!(D.uniforms.uSpillOn.value>.5)||!W?.field)return Bn.s=0,Bn;if(t-Vn<.05&&t>=Vn)return Bn;Vn=t;let n=1,r=0,i=0,a=0;for(let o=-1;o<16;o++){let s=o<0?0:o<8?12:28,c=o<0?0:o%8*(Math.PI/4)+(o<8?0:Math.PI/8)+e.psi,l=e.e+s*Math.sin(c),u=e.n+s*Math.cos(c);W.field.spillFoam(l,u,t,zn);let d=zn.s/(1+(s/14)**2);d<=0||(n*=1-d,r+=d,i+=d*zn.size,a+=d*Math.sin(c-e.psi))}return Bn.s=1-n,Bn.size=r>0?i/r:0,Bn.pan=r>0?a/r*.8:0,Bn}let Un=()=>xt?(e,t)=>xt.depthAt(e,t):null,Wn=()=>{let e=Ot,t=St;if(e){let t=(t,n)=>e.factor(t,n);return t.turned=(t,n)=>e.turned(t,n),t}return t?(e,n)=>t.factor(e,n):null},Gn=()=>(e,t)=>wt?wt.factor(e,t):1,qn=()=>new mo(U.state,Un(),Wn(),Gn()),Jn=null,Xn=()=>{let e=U.state;if(Jn?.src!==e){let t=new mo(e).fft;Jn={src:e,st:{...e,fft:e.fft?{...e.fft,sea:t?t.twin():null}:e.fft}}}return new mo(Jn.st,Un(),Wn(),Gn())},Zn=[`#c9a7ff`,`#a56bff`,`#7a2cf0`],Qn=[`light`,`drag`,`heavy`],$n=()=>!!(He||matchMedia(`(pointer: coarse)`).matches),er=()=>`◀ ▶ steer · ▲ more power · ▼ ease off`,tr=()=>$n()?`Tap ▶ (top right) to start · ${er()} · ☰ courses and settings`:`Press Space to start · ←/→ steer · ↑ power up · ↓ ease off · ? for the full controls`,nr=e=>e.site,rr=null,ir={};function ar(e){let t=nr(e);return!t||r[t]!==void 0?Promise.resolve():ir[t]??=or(t).finally(()=>{delete ir[t]})}async function or(e){r[e]=await Ro.load(`./sites/${e}/`,{landImage:t.get(`landimg`)!==`0`}).catch(t=>(console.error(`terrain pack failed`,e,t),null)),r[e]&&(fn[e]=await Bo(`./sites/${e}/`)),r[e]&&(i[e]=await fetch(`./sites/${e}/aids.json`).then(e=>e.ok?e.json():null).then(e=>e?.aids??[]).catch(()=>[])),r[e]&&(a[e]=t.get(`shore`)===`0`?null:await fetch(`./sites/${e}/shore.json`).then(e=>e.ok?e.json():null).catch(()=>null)),r[e]&&a[e]&&t.get(`mounds`)!==`0`&&r[e].setStructures(kp(a[e])),r[e]||(rr=`Could not load the shoreline; showing open sea.`)}let sr=null,cr=t.get(`seapick`),lr=null;{let e=t.get(`sea`);if(e)try{let t=wo(e);t.ok?lr=t.model:console.warn(`sea state not used:`,t.errors)}catch(e){console.warn(`bad ?sea= link`,e)}}function ur(e){Rt();let n=Lo(e);if(H.scenario=e,di!==void 0&&H.place!==ui(e)&&(H.place=ui(e),di.options(li(H.place))),nr(n)&&r[nr(n)]===void 0){Ra(`Loading the shoreline…`),ar(n).then(()=>{H.scenario===e&&ur(e)});return}U=n,pn(U),cr&&=(sr=cr,null),[...Co(e),...Ao,...mi(e)].some(e=>e.id===sr)||(sr=Co(e)[0].id),Mo(U,lr??Oo(sr).model());try{history.replaceState(null,``,Pa())}catch{}typeof hi==`function`&&hi(),Tn(U),yn(U),Ce?.clear();let i=$t(U)?`Skyline`:U.horizon;i?(H.prevHorizon??=H.horizon,H.horizon=i):H.prevHorizon&&=(H.horizon=H.prevHorizon,null),H.turbid=0,H.cloudDark=0,H.cloudType=.25,H.cloudVar=.4,H.haze=`Light`,H.bottom=null,Object.assign(H,U.look),qr(),L(),Object.assign(H,gt),L();for(let e of Object.keys(gt))delete gt[e];M(H.cloud),t.get(`mapZoom`)||lc(),U.state.stokes=H.crestSharpen,ai().forEach(e=>e.updateDisplay()),dr(),on(),Yr(),zr()}function dr(){D.setWaveState(U.state),ve.setShape(U.state.ripples);let e=t.get(`lwmap`)===`0`?null:jm(U,1),n=e?.gusty?{gustMs:e.gustMs,gustCover:.5*e.cover*(1-e.lullShare)}:null;Ce?.setSea({windMs:io(U.windMs??0),gustMs:n?io(n.gustMs):U.state.gusts?.on?U.state.gusts.windMs:0,gustCover:n?n.gustCover:U.state.gusts?.coverage??0,water:Ja(U.place)});let r=U.state.stats.dominant??{dx:0,dy:1,k:1,omega:0},i=r.omega/r.k;D.uniforms.uStreakDir.value.set(r.dx,r.dy),D.uniforms.uWaveVel.value.set(r.dx*i,r.dy*i)}let fr={Cruise:`easy`,Sporty:`balanced`,Race:`fast`,"Surfing flow":`flow`},pr=!1,mr=null,hr=null;function gr(){if(hr)return hr;let e=U.raceCourse,t=e?e.target(e.cursor()):_r.goal;return hr=new Sv({makeGhost:()=>new wh(U,qn(),Un(),W.paddlerName,`v2`),state0:W.states[0],goal:t,depthFn:Un(),effort:fr[H.routing]??`balanced`,drafting:H.drafting,smallSea:Le(),competitors:qe,session:Ke(),course:U.raceCourse??null}),hr.userCur=hn,hr}let _r=null,vr=!1,yr=document.getElementById(`coach`),br=document.getElementById(`coachMain`),xr=document.getElementById(`coachNext`),Sr=new Gg({variety:t.get(`coachvar`)===`1`}),Cr=t.get(`coachdebug`)===`1`,wr=new _g(y),Tr=new Zv(y,`./`),Er=new _g(y),Or=new Ny(y),kr=ws(se,R.userData.parts.hull.geometry);h.getContext().getContextAttributes()?.stencil&&t.get(`guidemask`)!==`1`?(wr.useStencil(1),Er.useStencil(1),Er.mesh.renderOrder=6):(wr.setMask(D.uniforms),Er.setMask(D.uniforms),Er.mesh.renderOrder=4);function Ar(e=!1){let n=G===`Free play`,r=H.autopilot&&n,i=t.get(`plan`)!==`0`;if(!n||!(i||r||H.guide||H.coaching)){_r?.drive&&(W.setSteer(0),W.setPower(null)),_r=null,wr.hide(),Tr.hide();return}let a=fr[H.routing]??`balanced`;_r?_r.o.effort!==a&&_r.setEffort(a):(_r=new J_(W,{effort:a,drive:!1,traffic:{others:()=>H.racers&&hr?hr.near(W.ski.e,W.ski.n,null,85,6):[],small:Le()},...t.get(`arriveM`)?{arriveM:Number(t.get(`arriveM`))}:{}}),vr=!1),r!==_r.drive&&(_r.setDrive(r),vr=!1),_r.setLead(H.coaching?Number(t.get(`lead`)??.8):0),e&&r&&$(`Autopilot (${H.routing.toLowerCase()}): heading for a goal ${(_r.distToGoal/1e3).toFixed(1)} km ahead. Any steering or power key takes the controls back`)}let jr=()=>{Ar(!0),H.autopilot||$(`Autopilot off`)};function Mr(e){let t=Math.max(0,Math.min(40,Number(e)||0));try{localStorage.setItem(`surfski.field`,String(t))}catch{}if(qe=Ue(t),H.racers=t>0,!t)hr=null,$(`Just you: nobody else is simulated`);else if(G===`Free play`&&qe.forEach((e,t)=>et(t,e.color)),$e(),!hr||!K&&q<.5){let e=!K&&q<.5;hr=null,$(e?`A group of ${t+1}: you and ${t} others`:`${t} others start from the start line, behind you (R restarts the run with them beside you)`)}else t<hr.setters.length?(hr.setters.length=t,$(`A group of ${t+1}`)):t>hr.setters.length&&$(`${t-hr.setters.length} more join at the next start (R restarts the run)`)}function Fr(e){Ge=pv[e]?e:`Race`;try{localStorage.setItem(`surfski.session`,Ge)}catch{}qe=Ue(H.field),!hr||!K&&q<.5?(hr=null,$(Ge===`Race`?`Race: the others race you to the finish`:`Group paddle: the others head where you head, surf their own lines and stay with you; they regroup when you stop`)):$(`${Ge} from the next start (R restarts the run)`)}let Ir=()=>{Ar(),hr?.setEffort(fr[H.routing]??`balanced`),$(`Routing mode ${H.routing}: ${{Cruise:`saves energy, arrives later`,Sporty:`a balance of speed and effort`,Race:`spends effort wherever it buys speed`,"Surfing flow":`rides the waves as long as it can with the paddle idle, and paddles only to catch or keep a ride`}[H.routing]}`)},Lr=()=>{Ar(),$(H.guide?`Guide on (${H.routing.toLowerCase()}): the arrow shows where the planner would go. Colour is the power it plans: blue glide, cyan easy, green steady, yellow hard, red sprint`:`Guide off`)},Rr=()=>{_r?.drive&&(H.autopilot=!1,Ar(),ai().forEach(e=>e.updateDisplay()),$(`Autopilot off: you have the controls`))};function zr(){G=H.mode=`Free play`,vt=null,U.tune=Um(H.tune),t.get(`speed`)!=null&&(U.speed=Number(t.get(`speed`))/2.23694),U.fixedSpeed=t.get(`fixedSpeed`)==null?null:Number(t.get(`fixedSpeed`))/2.23694,hr=null,mr=null,pr=!1,document.getElementById(`scoreCard`)?.remove(),U.windSeed=t.get(`windseed`)==null?Math.random()*2**31|0:Number(t.get(`windseed`))|0,hn=U.raceCourse?U.raceCourse.cursor():null,gn=[[0,0]],U.raceCourse&&(U.goal={...U.raceCourse.target(hn)}),W=new wh(U,qn(),Un(),H.paddler,`v2`),T(W.localWind),_r=null,Ar(),Gt(),q=0,K=!1,Tt=Et=null,eo=!0,Ra(rr?`${rr} ${tr()}`:tr()),rr=null,Vi(),ai().forEach(e=>e.updateDisplay())}let Vr={"As designed":null,Morning:8,Midday:12,Afternoon:15.5,Evening:18.5,"Golden hour":{el:16},Sunset:19.8,Dusk:{el:-2}},Hr={"As designed":null,Sunny:{cloud:.08,cloudType:.2,cloudDark:0},"Partly cloudy":{cloud:.35,cloudType:.25,cloudDark:0},Cloudy:{cloud:.65,cloudType:.78,cloudDark:0},Overcast:{cloud:.95,cloudType:1,cloudDark:.55},Stormy:{cloud:1,cloudType:.62,cloudDark:1},"Bright midday":{cloud:.03,cloudType:.1,cloudDark:0,sunGain:1.4,ambGain:1.1,haze:`None`},"Bright and clear":{cloud:.15,cloudType:.2,cloudDark:0,sunGain:1.15,ambGain:1.3,haze:`None`},"Bright clouds":{cloud:.55,cloudType:.3,cloudVar:.2,cloudDark:0,sunGain:1.25,ambGain:1.25},"Hazy sun":{cloud:.12,cloudType:.05,cloudDark:0,sunGain:1.2,ambGain:1.1,haze:`Hazy`},Smoke:{cloud:.05,cloudType:.25,cloudDark:0,sunGain:1.2,ambGain:1.1,haze:`Smoky`},"Smoky clouds":{cloud:.5,cloudType:.3,cloudVar:.5,cloudDark:0,sunGain:1.25,ambGain:1.15,haze:`Smoky`},Thunderheads:{cloud:.45,cloudType:.6,cloudVar:.85,cloudDark:0,sunGain:1.15,ambGain:1.1,haze:`None`},Cirrus:{cloud:.6,cloudType:0,cloudVar:.5,cloudDark:0,sunGain:1.2,ambGain:1.15},"Fair-weather cumulus":{cloud:.4,cloudType:.25,cloudVar:.2,cloudDark:0,sunGain:1.2,ambGain:1.15}},Ur={"As designed":null,"Bright midday":[`Midday`,`Bright midday`],"Thunderheads at sunset":[`Sunset`,`Thunderheads`],Afterglow:[`Dusk`,`Thunderheads`],"Cirrus evening":[`Golden hour`,`Cirrus`],"Golden haze":[`Golden hour`,`Hazy sun`],"Hazy midday":[`Midday`,`Hazy sun`],"Smoky sunset":[`Sunset`,`Smoke`],"Bright sunset":[`Sunset`,`Bright and clear`],"Bright clouds":[`Midday`,`Bright clouds`],"Fluffy cumulus":[`Midday`,`Fair-weather cumulus`],"Salmon sunset":[`Sunset`,`Fair-weather cumulus`],"Cumulonimbus afternoon":[`Afternoon`,`Thunderheads`],"Summer morning":[`Morning`,`Partly cloudy`],"Summer midday":[`Midday`,`Sunny`],"Summer afternoon":[`Afternoon`,`Partly cloudy`],"Summer evening":[`Evening`,`Partly cloudy`],"Cloudy midday":[`Midday`,`Cloudy`],"Overcast morning":[`Morning`,`Overcast`],"Midday stormy":[`Midday`,`Stormy`],"Stormy evening":[`Evening`,`Stormy`],Custom:null};function Wr(){let e=Ur[H.weatherPreset];H.weatherPreset!==`Custom`&&(e?(H.timeOfDay=e[0],H.weather=e[1]):(H.timeOfDay=`As designed`,H.weather=`As designed`),Jr())}function Gr(){H.weatherPreset=`Custom`,Jr()}function Kr(e,t,n=!1){let r=23.44*Math.PI/180,i=e*Math.PI/180,a=(t-12)*15*Math.PI/180,o=Math.asin(Math.sin(i)*Math.sin(r)+Math.cos(i)*Math.cos(r)*Math.cos(a)),s=Math.atan2(Math.sin(a),Math.cos(a)*Math.sin(i)-Math.tan(r)*Math.cos(i));return{el:n?o*180/Math.PI:Math.min(70,Math.max(5,Math.round(o*180/Math.PI))),az:Math.round(((s*180/Math.PI+180)%360+360)%360)}}function qr(){let e=Vr[H.timeOfDay],t=U?.geo?.lat??47.655;if(e?.el!=null){let n=e.el,r=12;for(let e=12;e<=23;e+=.02)Kr(t,e,!0).el>=n&&(r=e);H.sunAz=Kr(t,r).az,H.sunEl=n,e=null}if(e!=null){let n=Kr(t,e);H.sunAz=n.az,H.sunEl=n.el}let n=Hr[H.weather];n&&Object.assign(H,n)}function Jr(){let e=U?.look??{},t={cloud:.35,cloudType:.25,cloudVar:.4,sunAz:0,sunEl:22,cloudDark:0,sunGain:1,ambGain:1,haze:`Light`};for(let n of Object.keys(t))H[n]=e[n]??t[n];qr(),L(),Yr(),M(H.cloud),ai().forEach(e=>e.updateDisplay())}function Yr(){let e=D.uniforms,n=H.sunEl*Math.PI/180,r=H.sunAz*Math.PI/180;e.uSunDir.value.set(Math.sin(r)*Math.cos(n),Math.sin(n),-Math.cos(r)*Math.cos(n)).normalize(),ie(),M(H.cloud);try{ct()}catch{}e.uGlint.value=H.glint,e.uPix.value=+(t.get(`pix`)===`1`),e.uShadow.value=0,e.uAid.value=0,H.trailR=Number(t.get(`trailR`)??H.trailR??(Ce?220:450)),e.uTrailR.value=H.trailR,e.uWindMs.value=io(U?.windMs??9),D.refreshRipples(),e.uFoamStyle.value=+(t.get(`foamstyle`)===`crest`),e.uStokes.value=H.crestSharpen,e.uTeal.value=H.teal,e.uTurbid.value=H.turbid??0,U&&(U.state.stokes=H.crestSharpen);try{ya?.contentWindow?.postMessage({kind:`surfski-sea-look-init`,ripples:H.ripples,teal:H.teal},location.origin)}catch{}}let Xr={f:0,r:0,u:0,yaw:0,pitch:0},Zr=()=>Tw[H.view].local?3:30;function Qr(){let e=Tw[H.view];e.free&&(Y.fresh=!0),Object.assign(Xr,{f:0,r:0,u:0,yaw:0,pitch:0}),H.fov=e.fov,e.local&&(H.camSteady=e.steady??0),Yr(),b.fov=H.fov,b.updateProjectionMatrix(),ai().forEach(e=>e.updateDisplay())}let $r=new Fd({title:`Settings`,container:document.getElementById(`paneSettings`)});$r.add({json(){Qs({courses:Object.values(Fo).map(e=>e.id).filter(Boolean),paddlers:Object.keys(ds),weatherPresets:Object.keys(Ur).filter(e=>Ur[e]),times:Object.keys(Vr),weathers:Object.keys(Hr)}),ry(()=>import(`./settings-editor-9mFpOptI.js`).then(e=>e.openSettingsEditor({url:new URLSearchParams(location.search),file:n?.settings??{}})),__vite__mapDeps([9,10]),import.meta.url).catch(e=>$(`The settings editor did not load: ${e.message}`))}},`json`).name(`Edit settings as JSON…`);let ei=document.getElementById(`paneScene`),ni=new Fd({title:`Scene`,container:ei}),ri=ni.addFolder(`Scenario`),ii=ni.addFolder(`Routing and coaching`);function ai(){return[...$r?.controllersRecursive()??[],...ni?.controllersRecursive()??[]]}let si=!!(So(t.get(`scenario`))?.test||t.has(`config`)||t.get(`tests`)===`1`),ci=Po(Eo.filter(e=>!e.test||si)),li=e=>Object.fromEntries(ci.find(t=>t.place===e).items.map(e=>[e.label,e.name])),ui=e=>ci.find(t=>t.items.some(t=>t.name===e))?.place??ci[0].place;H.place=ui(H.scenario),H.sea=null,ri.add(H,`place`,Object.fromEntries(ci.map(e=>[Io(e.place),e.place]))).name(`1 · Place`).onChange(e=>{let t=ci.find(t=>t.place===e).items[0].name;di.options(li(e)),H.scenario=t,di.updateDisplay(),lr=null,sr=null,ur(t)});let di=ri.add(H,`scenario`,li(H.place)).name(`2 · Course`).onChange(e=>{lr=null,sr=null,ur(e)}).listen(),fi={easy:`Easy`,advanced:`Advanced`,expert:`Expert`},pi=ri.add(H,`sea`,{}).name(`3 · Sea state`).onChange(e=>{e!==`custom`&&(lr=null,sr=e,ur(H.scenario))});function mi(e){return ko().filter(t=>t.courses.includes(e))}function hi(){let e={};for(let t of Co(U.name))e[`${fi[t.level]} · ${t.name}`]=t.id;for(let t of Ao)e[`Any course · ${t.name}`]=t.id;for(let t of mi(U.name))t.id===sr&&(e[`Retired · ${t.name}`]=t.id);lr&&(e[`Edited (from the editor, a clip or a link)`]=`custom`),pi.options(e),H.sea=lr?`custom`:sr,pi.updateDisplay()}$r.add(H,`mode`,[`Free play`,`Recording`]).name(`Mode`).onChange(fa).listen(),ri.add(H,`weatherPreset`,Object.keys(Ur)).name(`4 · Weather`).onChange(Wr).listen(),ri.add(H,`paddler`,Object.keys(ds)).name(`5 · Boat & experience`).onChange(()=>{G===`Recording`?(Ra(`A recording keeps its paddler. Switch to Free play to change it.`),H.paddler=vt.paddlerName,ai().forEach(e=>e.updateDisplay())):W.setPaddler(H.paddler)&&$(`Paddler and boat changed to ${H.paddler}`,2400)}).listen();let gi={...Xo};Object.values(gi).includes(H.body)||(gi[H.body?H.body:os]=H.body),Oe=ri.add(H,`body`,gi).name(`6 · Paddler model`).onChange(B),ri.add(H,`skin`,Ts).name(`6c · Skin tone`).onChange(e=>{R.userData.skinned?.setSkinTone(Ts.indexOf(e),`./`);try{localStorage.setItem(`surfski.skin`,e)}catch{}}),ri.add(H,`pfd`,Object.keys(Yo)).name(`6b · PFD colour`).onChange(e=>{Ps(R,Yo[e]);try{localStorage.setItem(`surfski.pfd`,e)}catch{}}),ri.add(H,`wiggle`,0,2,.1).name(`6d · Stroke variation`),ri.add(H,`field`,Dv).name(`7 · Paddle group size`).onChange(Mr),ri.add(H,`session`,Object.keys(pv)).name(`7b · Session type`).onChange(Fr),Ps(R,Yo[H.pfd]),ii.add(H,`routing`,Object.keys(fr)).name(`Routing mode`).onChange(Ir),ii.add(H,`drafting`).name(`Drafting (wakes save power)`).onChange(e=>{hr&&(hr.drafting=e)}),ii.add(H,`guide`).name(`Route guide`).onChange(Lr),ii.add(H,`guideAlts`).name(`Route alternatives`),ii.add(H,`guideStyle`,[`Whole route`,`Next wave`]).name(`Guide style`).onChange(()=>$(H.guideStyle===`Next wave`?`Next wave: full colour and the arrow head run to the next chance to surf (planned power low); the line goes on half transparent`:`Whole route: the arrow shows the whole plan in colour`)),ii.add(H,`guideWeight`,[`Normal`,`Light`,`Faint`]).name(`Guide weight`).onChange(()=>$(`Guide weight ${H.guideWeight.toLowerCase()}: ${{Normal:`as drawn`,Light:`about 40% more transparent`,Faint:`about 65% more transparent`}[H.guideWeight]}`));let vi=()=>{Ar(),H.coaching||(yr.style.display=`none`),$(H.coaching?`Coaching on: words at the top for what to do next, about a second before you should do it. It works with or without the guide arrow`:`Coaching off`)};ii.add(H,`coaching`).name(`Coaching (words at the top)`).onChange(vi),ii.add(H,`autopilot`).name(`Autopilot`).onChange(jr),ni.onChange(()=>{try{localStorage.setItem(ft,JSON.stringify(Object.fromEntries(pt.map(e=>[e,H[e]]))))}catch{}}),$r.add(H,`view`,Object.fromEntries(Object.keys(Tw).map((e,t)=>[`${t+1}  ${e}`,e]))).name(`Camera (keys 1-`+Object.keys(Tw).length+`, V next)`).onChange(Qr).listen(),$r.add(H,`mapZoom`,0,1,.01).name(`Map zoom`).listen(),$r.add(H,`playSpeed`,.1,2,.05).name(`Playback speed`),$r.add(H,`playback`).name(`Show playback controls`).onChange(e=>{try{localStorage.setItem(`surfski.playback`,e?`1`:`0`)}catch{}za()});let yi=$r.addFolder(`Rendering`);yi.add(mt,`on`).name(`Battery mode (30 fps lock)`).onChange(e=>ht(e)).listen(),yi.add(H,`shore`).name(`Shore: buildings, docks, boats (OSM)`).onChange(()=>{Cn(nr(U),r[nr(U)]),bi()}),yi.add(H,`quality`,Object.keys(ww)).name(`Mesh quality`).onChange(e=>{D.setGrid(Cw(e,H.crit)),bi()}).listen(),yi.add(H,`fov`,40,120,1).name(`Field of view`).onChange(e=>{b.fov=e,b.updateProjectionMatrix()}).listen(),yi.add(H,`eyeHeight`,.2,1.3,.05).name(`Head POV eye height (m)`),yi.add(H,`camSteady`,0,1,.05).name(`Camera steadiness (0 fixed to the boat, 1 holds the horizon)`).listen();let bi=()=>{Cc.enabled&&(Cc.enabled=!1,Ei.object.auto=!1,Ei.updateDisplay(),$(`Auto quality is off: your setting stays`))};yi.add(H,`renderScale`,.5,3,.05).name(`Picture size (render scale)`).onChange(()=>{Va(),bi()}).listen(),yi.add(H,`faceTint`).name(`Colour faces by steepness`).onChange(e=>{D.uniforms.uFaceTint.value=+!!e});let xi=yi.addFolder(`Foam and spray`);xi.close(),xi.add(H,`lite`).name(`Cheaper effects (faster; no foam trails)`).onChange(e=>{va(e),bi()}).listen(),xi.add(H,`trailR`,50,600,10).name(`Foam trail reach (m)`).onChange(e=>{_a(e),bi()}).listen(),yi.add({restore(){H.renderScale=$c.renderScale,Va(),H.quality=$c.quality,H.crit=1,D.setGrid(Cw(H.quality,H.crit)),va($c.lite),_a($c.trailR),Cc.enabled=!1,Ei.object.auto=!1,ai().forEach(e=>e.updateDisplay()),$(`Full quality restored. Auto quality is off; turn it on again below if you want it.`)}},`restore`).name(`Restore full quality`);let Si={get(){try{return localStorage.getItem(`surfski.autoQuality`)}catch{return null}},set(e){try{localStorage.setItem(`surfski.autoQuality`,e?`1`:`0`)}catch{}}},Ci={get(){try{return localStorage.getItem(`surfski.autoScale`)}catch{return null}},set(e){try{localStorage.setItem(`surfski.autoScale`,String(e))}catch{}}},wi=()=>Math.max(1,Math.min(devicePixelRatio||1,2)),Ti=t.get(`auto`)==null?Si.get()!==`0`:t.get(`auto`)!==`0`,Ei=yi.add({auto:Ti},`auto`).name(`Auto quality (follows the frame rate)`).onChange(e=>{Cc.enabled=e,Si.set(e),$(e?`Auto quality on: the sim may lower the picture size or water detail`:`Auto quality off: quality stays as chosen`)}),Di=ni.addFolder(`Sky & water`);Di.add(H,`timeOfDay`,Object.keys(Vr)).name(`Time of day (summer)`).onChange(Gr).listen(),Di.add(H,`weather`,Object.keys(Hr)).name(`Cloud cover`).onChange(Gr).listen(),Di.add(H,`sunAz`,0,360,1).name(`Sun direction (compass °)`).onChange(Yr).listen(),Di.add(H,`sunEl`,-4,70,.5).name(`Sun elevation (°; below 0 after sunset)`).onChange(Yr).listen(),Di.add(H,`hazeAmt`,0,1,.01).name(`Haze amount (0 crystal clear, 1 thick)`).onChange(re).listen(),Di.add(H,`hazeType`,0,1,.01).name(`Haze type (0 sea salt, 1 smoke)`).onChange(re).listen(),Di.add(H,`teal`,0,1,.05).name(`Water colour (0 yellowish, 0.5 teal, 1 deep blue)`).onChange(Yr).listen(),Di.add(H,`turbid`,0,1,.05).name(`Silt (0 clear, 1 muddy river)`).onChange(Yr).listen(),Di.add(H,`cloud`,0,1,.01).name(`Clouds (cover)`).onChange(()=>{H.weatherPreset=`Custom`,M(H.cloud)}).listen();let Oi=Di.add(H,`cloudType`,0,1,.01).name(`Cloud type: Fair-weather cumulus`).onChange(()=>{H.weatherPreset=`Custom`,M(H.cloud),Oi.name(`Cloud type: ${tC(H.cloudType)}`)}).listen();Di.add(H,`cloudVar`,0,1,.01).name(`Cloud variety (0 even, 1 banks and gaps)`).onChange(()=>{H.weatherPreset=`Custom`,M(H.cloud)}).listen(),Di.add(H,`cloudDark`,0,1,.05).name(`Clouds (grey: 0 white, 1 storm)`).onChange(()=>M(H.cloud)).listen();let ki=$r.addFolder(`Drone`);ki.add(H,`droneSide`,-12,12,.1).name(`Side (+ right, m)`),ki.add(H,`droneBack`,-10,25,.1).name(`Behind (m)`),ki.add(H,`droneHeight`,.3,20,.1).name(`Height above water (m)`);for(let e of[yi,Di,ki])e.close();let Ai=wb($r,{roller:()=>we,makeRoller:Te,toast:$,light:{live:A,apply:()=>{M(H.cloud??0);for(let e of[R,Ie,...Re])e?.traverse(e=>{e.isMesh&&e.material?.isMeshStandardMaterial&&e.material.envMap&&(e.material.envMapIntensity=A.env)})},defaults:{sun:Cs.sun,hemi:Cs.sky,env:Cs.env}},water:D}),ji=new _x(gx(t)),Mi=new Lb;vx($r,ji);let Ni=(e,t)=>ai().find(t=>t.object===H&&t.property===e)?.setValue(t),Pi=e=>document.getElementById(e),Fi=new OS({courses:()=>ci.flatMap(e=>e.items.map(t=>({id:So(t.name)?.id,name:t.name,label:t.label,short:t.name.replace(/^[^:]*:\s*/,``),place:e.place}))),placeLabel:Io,current:()=>({course:H.scenario,sea:H.sea??sr,paddler:H.paddler,field:Number(H.field),weather:H.weatherPreset,guide:H.guide,coaching:H.coaching,autopilot:H.autopilot}),pickCourse:e=>{let t=ui(e);H.place!==t&&(H.place=t,di.options(li(t))),H.scenario=e,ai().forEach(e=>e.updateDisplay()),lr=null,sr=null,ur(e)},seas:()=>Co(U.name).map(e=>({id:e.id,name:e.name})),pickSea:e=>pi.setValue(e),paddlers:()=>Object.keys(ds),pickPaddler:e=>Ni(`paddler`,e),pickField:e=>Ni(`field`,e),weathers:()=>Object.keys(Ur),pickWeather:e=>Ni(`weatherPreset`,e),setGuide:e=>Ni(`guide`,e),setCoaching:e=>Ni(`coaching`,e),setAutopilot:e=>Ni(`autopilot`,e),togglePlay:()=>Pi(`play`).click(),isLive:()=>K,isStart:()=>G===`Free play`&&W.t<.05,restart:()=>Pi(`tbRestart`).click(),fullscreen:()=>Pi(`tbFull`).click(),toggleSound:()=>Pi(`tbMute`).click(),soundOn:()=>!/\u{1F507}/u.test(Pi(`tbMute`).textContent),volume:()=>Number(Pi(`tbVolume`).value),setVolume:e=>{let t=Pi(`tbVolume`);t.value=String(e),t.dispatchEvent(new Event(`input`,{bubbles:!0}))},openFull:()=>{Pi(`sidePanel`)?.classList.contains(`hidden`)&&Pi(`tbGui`)?.click(),document.body.classList.add(`showgui`)},fp:()=>G===`Free play`?W:null,prof:()=>Wt().prof,fpsNow:()=>es,toast:$,setInset:e=>{if(H.inset!==e){H.inset=e;try{Ba()}catch{}}},quality:()=>H.quality,setQuality:e=>Ni(`quality`,e),deviceTier:()=>{let e=`auto`;try{e=localStorage.getItem(`surfski.device`)||`auto`}catch{}return{...f,kept:e}},setDevice:e=>{try{e===`auto`?localStorage.removeItem(Qh):localStorage.setItem(Qh,e)}catch{}$(`Device profile: applies after a reload`)},quiet:(e,t)=>{H[e]!==t&&(H[e]=t,ai().forEach(e=>e.updateDisplay()),W&&Ar())},rehint:()=>{G===`Free play`&&W&&!K&&W.t<.05&&Ra(tr())}},yS(t,f.tier));er=()=>Fi.controlWords(),kS($r,Fi);let Ii=()=>!Fi.on||H.autopilot||H.guide||H.coaching;t.get(`boat`),$r.add({capture:Ga},`capture`).name(`Save PNG of this frame`);let Li=$r.addFolder(`About`),Ri=document.createElement(`div`);Ri.style.cssText=`padding:6px 8px;font-size:11px;line-height:1.45;opacity:.85;white-space:normal`,Ri.textContent=`Surfski downwind simulator, designed and built by Mike Liddell. Rendering by three.js and lil-gui. Land and sea-floor data from public surveys (USGS, NOAA, Copernicus, OpenStreetMap and others); the full credits are in About.`,Li.$children.appendChild(Ri),Li.add({docs(){window.open(`./about.html`,`_blank`,`noopener`)}},`docs`).name(`Documentation and credits`),Li.add({share(){Fa()}},`share`).name(`Share: copy a link to this view`),Li.close();let zi=document.getElementById(`scrub`);document.getElementById(`time`);let Bi=document.getElementById(`play`);function Vi(){Bi.textContent=K?`⏸ Pause`:G===`Free play`?`▶ Resume`:`▶ Play`;let e=document.getElementById(`sceneStart`);e&&(e.textContent=K?`⏸ Pause`:q>.5?`▶ Resume paddling`:`▶ Start paddling`),YC(!K,$n()?G===`Free play`?q>.5?`▶: resume`:`▶: start`:`▶: play`:G===`Free play`?q>.5?`Space: resume`:`Space: start`:`Space: play`)}function Hi(){let e=document.getElementById(`track`);e.querySelectorAll(`.mark`).forEach(e=>e.remove());let t=Math.max(Ut()-Ht(),1e-6),n=(n,r,i)=>{if(n==null)return;let a=document.createElement(`div`);a.className=`mark`,a.style.left=`calc(${(n-Ht())/t*100}% - 1px)`,a.style.background=r,a.innerHTML=`<span style="color:${r}">${i}</span>`,e.appendChild(a)};n(Tt,`#7dffa1`,`in`),n(Et,`#ffb36b`,`out`)}let Wi=null;function Gi(){let e=document.createElement(`div`);e.id=`racerWait`,e.style.cssText=`position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:40;display:flex;align-items:center;gap:12px;padding:12px 18px;border-radius:10px;background:rgba(10,42,82,.85);color:#fff;font:600 15px system-ui,sans-serif;pointer-events:none`,e.innerHTML=`<div style="width:22px;height:22px;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite"></div>Loading the other paddlers…`,document.body.appendChild(e);let t=document.getElementById(`banner`).textContent;Ra(``);let n=Wi={cancel:(n=!0)=>{e.remove(),Wi=null,n&&Ra(t),Vi()}};Promise.race([Ze??Promise.resolve(),new Promise(e=>setTimeout(e,2e4))]).then(()=>{Wi===n&&(n.cancel(!1),Ki())})}function Ki(e=!1){Wi?e&&Wi.cancel():H.racers&&G===`Free play`&&!Qe&&q<.5?($e(),Gi()):(G===`Free play`?(W.truncateTo(Math.round((q-Ht())/W.dt)),Gt(),q=W.t,vn(W.t),W.setSteer(+!!jt.right-!!jt.left),W.setUp(jt.up),W.setDown(jt.down)):q>=Ut()-.01&&(q=Ht()),K=!0,Ra(``),Vi())}let qi=()=>{K?(K=!1,Vi()):Ki(!0)},Ji=e=>{K=!1,q=Math.min(Ut(),Math.max(Ht(),q+e)),Vi()};Bi.onclick=qi,document.getElementById(`restart`).onclick=()=>{G===`Recording`?(q=Ht(),K=!1,Vi()):zr()},document.getElementById(`back`).onclick=()=>Ji(-.5),document.getElementById(`fwd`).onclick=()=>Ji(.5),zi.oninput=()=>{q=Number(zi.value),K=!1,Vi()};function Yi(e,t,n=0){if(G!==`Free play`){$(`Switch to Free play to move the boat`);return}if(q<W.t-.25){$(`Go back to the live edge to move the boat`);return}if(!(e===`move`?W.strafe(t,n):W.turn(t))){$(`Too shallow there: the boat was not moved`);return}eo=!0,q=W.t;let r=Za(Ua(U.geo,W.ski.e,W.ski.n),4);$(e===`move`?`Moved ${Math.abs(t||n)} m ${t>0?`ahead`:t<0?`back`:n>0?`right`:`left`} · ${r}`:`Turned ${Math.abs(t)}° ${t>0?`right`:`left`} · heading ${Qa(W.ski.psi*180/Math.PI)}`,1600)}let Xi=()=>{Tt=q,Et!=null&&Et<Tt&&(Et=null),Hi()},Zi=()=>{Et=q,Tt!=null&&Tt>Et&&(Tt=null),Hi()};document.getElementById(`markin`).onclick=Xi,document.getElementById(`markout`).onclick=Zi;function Qi(e,t){let n=document.createElement(`a`);n.href=URL.createObjectURL(new Blob([JSON.stringify(t)],{type:`application/json`})),n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),4e3)}let $i=[`timeOfDay`,`weather`,`weatherPreset`,`sunAz`,`sunEl`,`cloud`,`cloudType`,`cloudVar`,`cloudDark`,`hazeAmt`,`hazeType`,`sunGain`,`ambGain`,`teal`,`turbid`,`bottom`,`glint`,`crestSharpen`,`ripples`,`horizon`],ea=[`view`,`fov`,`eyeHeight`,`camSteady`,`droneSide`,`droneBack`,`droneHeight`,`droneYaw`,`dronePitch`],ta=[`session`,`field`,`racers`,`drafting`,`routing`,`guide`,`guideStyle`,`guideWeight`,`guideAlts`,`coaching`,`autopilot`],na=e=>Object.fromEntries(e.filter(e=>H[e]!==void 0).map(e=>[e,Array.isArray(H[e])?[...H[e]]:H[e]])),ra=()=>{let e=null;try{H.view===`Free cam`&&(e={e:+Y.e.toFixed(2),n:+Y.n.toFixed(2),h:+Y.h.toFixed(2),yaw:+Y.yaw.toFixed(4),pitch:+Y.pitch.toFixed(4)})}catch{}return{look:na($i),camera:{...na(ea),...e?{free:e}:{}}}};function ia(e){if(!e)return;let t=e.look??{},n=e.camera??{};for(let e of[`timeOfDay`,`weather`,`weatherPreset`])t[e]!=null&&(H[e]=t[e]);for(let e of $i)t[e]!=null&&![`timeOfDay`,`weather`,`weatherPreset`].includes(e)&&(gt[e]=Array.isArray(t[e])?[...t[e]]:t[e]);n.view&&Tw[n.view]&&(H.view=n.view,Qr());for(let e of ea)e!==`view`&&n[e]!=null&&(H[e]=n[e]);if(n.free)try{Object.assign(Y,n.free,{fresh:!1})}catch{}b.fov=H.fov,b.updateProjectionMatrix()}function aa(){D.uniforms.uMicro.value=H.ripples,D.uniforms.uFoam.value=H.foam,D.refreshRipples?.(),Yr(),ai().forEach(e=>e.updateDisplay())}function oa(){let e=W?.states?.at(-1);return{kind:`surfski-scenario`,version:1,saved:new Date().toISOString(),build:`0c804ed 2026-11-22 12:48Z`,label:`${U.name}, ${H.paddler}`,scenario:U.name,paddler:H.paddler,...Ym(H.tune)?{tune:Ym(H.tune)}:{},...lr?{sea:To(lr)}:{seaId:sr},windSeed:U.windSeed,...ra(),group:na(ta),audio:{...V.s},...(e=>Object.keys(e).length?{experimental:e}:{})(Ai.snapshot()),at:e?{t:+(W.t??0).toFixed(2),e:+e.e.toFixed(1),n:+e.n.toFixed(1),headingDeg:+((e.psi*180/Math.PI%360+360)%360).toFixed(1),mph:+(e.u*2.23694).toFixed(1)}:null}}window.__scenarioFile=oa,window.__loadScenario=e=>ca(e),window.__saveScenario=()=>{let e=oa();Qi(`scenario-${U.name.replace(/[^a-z0-9]+/gi,`-`).toLowerCase()}-${e.saved.slice(0,16).replace(/[:T]/g,`-`)}.json`,e),$(`Saved this scenario (Load clip opens it again)`,2200)};let sa=null;function ca(e,{fromConfig:t=!1}={}){let n=So(e.scenario);if(!n)throw Error(`an unknown course`);if(e={...e,scenario:n.name},H.scenario=e.scenario,H.paddler=ds[e.paddler]?e.paddler:Fs,Object.assign(H.tune,e.tune?Xm(e.tune):Wm()),lr=null,sr=e.seaId??null,e.sea)try{let t=wo(e.sea);t.ok&&(lr=t.model)}catch{}if(e.seaModel){let t=Do(e.seaModel);t.ok?lr=t.model:console.warn(`the file's sea not used:`,t.errors)}t&&(sa=lr);let r=e.group??{};for(let[e,t]of Object.entries(r))e in H&&![`field`,`session`,`racers`].includes(e)&&(H[e]=t);r.session!=null&&r.session!==H.session&&(H.session=r.session,Fr(r.session)),r.field!=null&&r.field!==H.field&&(H.field=r.field,Mr(r.field)),e.audio&&(Object.assign(V.s,e.audio),Js(V.s),V.applyVolume(),Aa()),ia(e),ur(e.scenario),aa(),e.windSeed!=null&&(U.windSeed=e.windSeed,W=new wh(U,qn(),Un(),H.paddler,`v2`),T(W.localWind),Gt()),e.experimental&&Ai.apply(e.experimental),Ra(`Scenario: ${e.label??e.scenario}. ${$n()?`Tap ▶ to start.`:`Press Space to start.`}`)}function la(){if(G!==`Free play`){Ra(`Clips are cut from Free play tracks.`);return}let e=Tt??Ht(),t=Et??Ut(),n=e=>Math.round((e-Ht())/W.dt),r=W.makeClip(n(e),n(t),{...ra(),...lr?{sea:To(lr)}:{seaId:sr},saved:new Date().toISOString(),label:`${U.name} ${e.toFixed(0)}-${t.toFixed(0)} s`});Qi(`clip-${U.name.replace(/[^a-z0-9]+/gi,`-`).toLowerCase()}-${e.toFixed(0)}s.json`,r),Ra(`Saved a ${(t-e).toFixed(0)} s clip.`),setTimeout(()=>Ra(``),2500)}document.getElementById(`saveclip`).onclick=la;let ua=document.getElementById(`clipfile`);document.getElementById(`loadclip`).onclick=()=>ua.click(),ua.onchange=async()=>{let e=ua.files[0];if(ua.value=``,e)try{let t=JSON.parse(await e.text());t.kind===`surfski-scenario`?ca(t):da(t)}catch(e){Ra(`Could not load that file: ${e.message}`)}};function da(e){if(e.kind!==`surfski-clip`||!Fo[e.scenario])throw Error(`not a surfski clip, or an unknown scenario`);if(H.scenario=e.scenario,H.paddler=ds[e.paddler]?e.paddler:Fs,Object.assign(H.tune,Um(e.tune)),lr=null,sr=e.seaId??null,e.sea)try{let t=wo(e.sea);t.ok&&(lr=t.model)}catch{}(e.camera||Object.keys(e.look??{}).length>1)&&ia(e),ur(e.scenario),e.look?.crestSharpen!=null&&(H.crestSharpen=e.look.crestSharpen,U.state.stokes=H.crestSharpen),aa(),dr(),vt=Th(e,U,qn(),Un()),G=H.mode=`Recording`,Gt(),q=Ht(),K=!1,eo=!0,Vi(),Hi(),Ra(`Recording: ${e.label??e.scenario}. ${$n()?`Tap ▶ to play.`:`Press Space to play.`}${vt.recorded?``:` This older clip has no recorded frames: it is re-run from its inputs, so it can differ from when it was saved if the boat or sea model has changed since.`}`),ai().forEach(e=>e.updateDisplay())}function fa(e){e===`Recording`&&!vt?(Ra(`No recording loaded. Use Load clip, or cut one from Free play.`),H.mode=`Free play`,ai().forEach(e=>e.updateDisplay())):(G=e,Gt(),q=e===`Recording`?Ht():W.t,K=!1,eo=!0,Vi(),Hi(),za())}let pa={ArrowLeft:`left`,KeyA:`left`,ArrowRight:`right`,KeyD:`right`},ma=()=>+!!jt.right-!!jt.left;function ha(e,t){jt[e]=t,t&&!K&&G===`Free play`&&Ki(),G===`Free play`&&K&&(e===`left`||e===`right`?W.setSteer(ma()):e===`up`?W.setUp(t):W.setDown(t))}let ga=VC({onStart:()=>{K||Ki()}});HC(ha,t.get(`touch`)===`1`),addEventListener(`keydown`,e=>{if(e.target.tagName===`INPUT`&&e.target.type!==`range`)return;if(ga.open){e.code===`Space`||e.code===`Enter`?(e.preventDefault(),LC(`introGo`).click()):(e.code===`Escape`||e.key===`?`)&&ga.hide();return}let t=/^Key[IKJLUO]$/.test(e.code);if(e.altKey&&!e.ctrlKey&&!e.metaKey&&t){if(e.preventDefault(),!e.repeat){let t=e.shiftKey?1e3:100,n=e.shiftKey?90:30;e.code===`KeyI`?Yi(`move`,t,0):e.code===`KeyK`?Yi(`move`,-t,0):e.code===`KeyJ`?Yi(`move`,0,-t):e.code===`KeyL`?Yi(`move`,0,t):e.code===`KeyU`?Yi(`turn`,-n):e.code===`KeyO`&&Yi(`turn`,n)}}else{if(e.metaKey||e.ctrlKey)for(let e of[...ro])e.startsWith(`Key`)&&ro.delete(e);if(!(e.ctrlKey||e.metaKey||e.altKey)){if(e.code.startsWith(`Shift`)&&ro.add(`Shift`),e.code===`Digit0`)ro.clear(),Object.assign(Xr,{f:0,r:0,u:0,yaw:0,pitch:0}),$(`${H.view}: back to its usual place`);else if(t)ro.add(e.code);else if(!so(e.code)){if(e.key===`?`)wa(`controls`);else if(e.code===`Escape`&&xa.dataset.tab!==`scene`)Ca(`scene`);else if(e.code===`KeyR`)G===`Free play`&&(zr(),$(`Run restarted`));else if(e.code===`KeyG`)H.guide=!H.guide,ai().forEach(e=>e.updateDisplay()),Lr();else if(e.code===`KeyT`)H.coaching=!H.coaching,ai().forEach(e=>e.updateDisplay()),vi();else if(e.code===`KeyF`)zC();else if(e.code===`Equal`||e.code===`NumpadAdd`||e.code===`Minus`||e.code===`NumpadSubtract`)e.preventDefault(),ja(e.code===`Equal`||e.code===`NumpadAdd`?1:-1);else if(e.code===`Space`)e.preventDefault(),qi();else if(_r&&(pa[e.code]||[`ArrowUp`,`KeyW`,`ArrowDown`,`KeyS`].includes(e.code))&&Rr(),pa[e.code]&&(e.preventDefault(),jt[pa[e.code]]=!0,G===`Free play`&&K?W.setSteer(ma()):e.repeat||Ji(pa[e.code]===`left`?-.5:.5)),(e.code===`ArrowUp`||e.code===`KeyW`)&&(e.preventDefault(),jt.up=!0,G===`Free play`&&K&&W.setUp(!0)),(e.code===`ArrowDown`||e.code===`KeyS`)&&(e.preventDefault(),jt.down=!0,G===`Free play`&&K&&W.setDown(!0)),/^Digit[1-9]$/.test(e.code)&&!e.shiftKey){let t=Object.keys(Tw)[e.code.slice(5)-1];t&&(H.view=t,Qr(),$(`Camera ${e.code.slice(5)}: ${t}`))}else{if(e.code===`KeyV`){let e=Object.keys(Tw);H.view=e[(e.indexOf(H.view)+1)%e.length],Qr()}e.code===`BracketLeft`&&Xi(),e.code===`BracketRight`&&Zi(),e.code===`KeyC`&&la(),e.code===`KeyE`&&Ta(),e.code===`KeyP`&&LC(`tbGui`).click()}}}}}),addEventListener(`blur`,()=>ro.clear()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&ro.clear()}),addEventListener(`keyup`,e=>{ro.delete(e.code),e.code.startsWith(`Shift`)&&ro.delete(`Shift`),pa[e.code]&&(jt[pa[e.code]]=!1,G===`Free play`&&K&&W.setSteer(ma())),(e.code===`ArrowUp`||e.code===`KeyW`)&&(jt.up=!1,G===`Free play`&&K&&W.setUp(!1)),(e.code===`ArrowDown`||e.code===`KeyS`)&&(jt.down=!1,G===`Free play`&&K&&W.setDown(!1))});{let e=new Set,t=!1,n=(e,t)=>dispatchEvent(new KeyboardEvent(e,{code:t,key:t===`Slash`?`?`:t===`Space`?` `:t,bubbles:!0,cancelable:!0})),r=e=>{let t=t=>!!e.buttons[t]?.pressed,n=t=>(e.buttons[t]?.value??0)>.5,r=t=>e.axes[t]??0;return{ArrowLeft:t(14)||r(0)<-.4,ArrowRight:t(15)||r(0)>.4,ArrowUp:t(12)||n(7)||r(1)<-.7,ArrowDown:t(13)||n(6)||r(1)>.7,Space:t(0),Escape:t(1),KeyV:t(3),KeyP:t(9),Slash:t(8)}},i=()=>{let t=[...navigator.getGamepads?.()??[]].find(e=>e&&e.connected),a=new Set;if(t)for(let[e,n]of Object.entries(r(t)))n&&a.add(e);for(let t of a)e.has(t)||n(`keydown`,t);for(let t of e)a.has(t)||n(`keyup`,t);e=a,requestAnimationFrame(i)},a=()=>{t||(t=!0,i())};addEventListener(`gamepadconnected`,()=>{a(),$(`Controller connected: A start/pause · stick steer · RT power up · LT ease off · Y camera`,5e3)}),[...navigator.getGamepads?.()??[]].some(e=>e&&e.connected)&&a()}function _a(e){H.trailR=e,D.uniforms.uTrailR.value=e}function va(e){H.lite=!!e,D.uniforms.uLite.value=+!!H.lite}let ya=null;function ba(e){if(G!==`Free play`){$(`Switch to Free play to change the sea (a recording keeps the sea it was made in)`);return}lr=e;let t=U.state,n={start:U.start,headingDeg:U.headingDeg};Mo(U,e,{turns:U.shoreTurns??null}),Object.assign(t,U.state),U.state=t,U.start=n.start,W.field._envT=void 0,W.ski.current=U.current??[0,0],nr(U)&&r[nr(U)]&&Tn(U),yn(U),lc(),M(H.cloud),H.crestSharpen=U.look?.crestSharpen??H.crestSharpen,U.state.stokes=H.crestSharpen,dr(),hi(),K||(bt={field:W.field,frames:W.frames,dt:W.dt})}let xa=document.getElementById(`sidePanel`),Sa={scene:LC(`paneScene`),settings:LC(`paneSettings`),sea:LC(`paneSea`),audio:LC(`paneAudio`),controls:LC(`paneControls`)};function Ca(e){if(e===`sea`&&!ya&&(ya=document.createElement(`iframe`),ya.title=`Sea state editor`,ya.src=`./lab.html?embed=1`,Sa.sea.append(ya),addEventListener(`message`,e=>{if(e.origin===location.origin&&e.source===ya.contentWindow){if(e.data?.kind===`surfski-sea-ready`)Na();else if(e.data?.kind===`surfski-sea-look`)H.ripples=Math.min(1,Math.max(0,+e.data.ripples||0)),D.uniforms.uMicro.value=H.ripples,D.refreshRipples(),H.teal=Math.min(1,Math.max(0,+e.data.teal||0)),Yr();else if(e.data?.kind===`surfski-sea`){let t=Ma(e.data.model);t&&ba(t)}}})),e===`controls`&&!Sa.controls.firstChild){let e=document.querySelector(`#intro table.keys`);Sa.controls.append(Object.assign(document.createElement(`div`),{className:`note`,textContent:`Keys and what they do. Press ? again, or Esc, to go back to the Scene tab.`}),e?e.cloneNode(!0):document.createTextNode(``))}e===`controls`&&Fi.fillControlsTab(Sa.controls),xa.classList.remove(`hidden`),document.body.classList.remove(`nopanel`),xa.dataset.tab=e,xa.classList.toggle(`wide`,e===`sea`),xa.classList.toggle(`mid`,e===`controls`||e===`scene`||e===`settings`||e===`audio`);for(let[t,n]of Object.entries(Sa))n.classList.toggle(`on`,t===e);for(let t of xa.querySelectorAll(`.tabs button[data-tab]`))t.classList.toggle(`on`,t.dataset.tab===e);e===`sea`&&Na()}let wa=e=>Ca(xa.dataset.tab===e&&!xa.classList.contains(`hidden`)?`scene`:e),Ta=e=>e===!1?Ca(`scene`):wa(`sea`);for(let e of xa.querySelectorAll(`.tabs button[data-tab]`))e.onclick=()=>Ca(e.dataset.tab);let Ea=new Fd({title:`Audio`,container:LC(`paneAudio`)});Ea.add(V.s,`on`).name(`Sound`).onChange(e=>{V.setOn(e),Aa()}),Ea.add(V.s,`volume`,0,1,.05).name(`Volume (keys - and +)`).onChange(e=>{V.setVolume(e),Aa()});let Da=Ea.addFolder(`Mix`);for(let[e,t]of[[`wind`,`Wind`],[`sea`,`Open water`],[`spill`,`Spilling crests`],[`hull`,`Hull along the water`],[`strokes`,`Paddle strokes`],[`bow`,`Bow into waves`],[`ambience`,`Gulls, shore, thunder`]])Da.add(V.s,e,0,2,.05).name(t).onChange(t=>V.setLayer(e,t));LC(`paneAudio`).insertAdjacentHTML(`beforeend`,`<div class="note">Every sound is made from noise for now, shaped by the sim: the wind you feel (the true wind less your own speed), the waves round you, your speed along the hull, each blade in and out of the water, the bow driving into a wave. Recorded sounds come next. The browser starts sound on your first key or tap.</div>`);let Oa=LC(`tbVolume`),ka=LC(`tbMute`);function Aa(){Oa.value=String(Math.round(V.s.volume*100)),ka.textContent=V.s.on&&V.s.volume>0?V.s.volume<.35?`🔉`:`🔊`:`🔇`,Ea.controllersRecursive().forEach(e=>e.updateDisplay())}function ja(e){!V.s.on&&e>0&&V.setOn(!0);let t=V.setVolume(Math.round((V.s.volume+.1*e)*20)/20);Aa(),$(V.s.on?`Volume ${Math.round(t*100)}%`:`Sound off`,900)}Oa.oninput=()=>{V.s.on||V.setOn(!0),V.setVolume(Number(Oa.value)/100),Aa()},ka.onclick=()=>{V.setOn(!V.s.on),Aa(),$(V.s.on?`Sound on`:`Sound off`,900)},Aa(),Ca(`scene`),ei.insertAdjacentHTML(`beforeend`,`<div class="scene-foot"><button id="sceneStart" class="go">▶ Start paddling</button><button id="sceneControls" class="alt">Controls and keys</button><button class="alt" id="sceneMore">More settings: camera, quality, boat tuning</button><div class="tip">Keys: <b>Space</b> start or pause, <b>E</b> edit the sea, <b>R</b> restart, <b>P</b> show or hide this panel (or use the ✕ above).</div></div>`),LC(`sceneStart`).onclick=()=>{qi(),Ia()&&La(!1)},LC(`sceneControls`).onclick=()=>Ca(`controls`),LC(`sceneMore`).onclick=()=>Ca(`settings`);let Ma=e=>{try{return wo(To(e)).model}catch{return null}};function Na(){if(!ya?.contentWindow)return;let e=Oo(sr);ya.contentWindow.postMessage({kind:`surfski-sea-init`,look:{ripples:H.ripples,teal:H.teal},model:lr??e.model(),source:lr?`Your edited sea`:`Started from \u201c${e.name}\u201d`},location.origin)}function Pa(){let e=new URL(location.href);e.search=``,e.hash=``;let t=(t,n)=>e.searchParams.set(t,n);t(`scenario`,Fo[H.scenario]?.id??H.scenario),t(`paddler`,H.paddler),t(`view`,H.view),H.inset!==`Map`&&t(`inset`,H.inset),Ur[H.weatherPreset]?t(`wx`,H.weatherPreset):(H.timeOfDay!==`As designed`&&t(`tod`,H.timeOfDay),H.weather!==`As designed`&&t(`weather`,H.weather)),lr&&lr!==sa?t(`sea`,To(lr)):lr||sr!==Co(H.scenario)[0]?.id&&t(`seapick`,sr);{let e=Ym(H.tune);e&&t(`tune`,e)}if(H.weatherPreset===`Custom`)for(let e of[`sunAz`,`sunEl`,`cloud`,`cloudType`,`cloudVar`,`hazeAmt`,`hazeType`])Number.isFinite(H[e])&&t(e,Math.round(H[e]*100)/100);H.view===`Drone`&&(t(`droneSide`,H.droneSide),t(`droneBack`,H.droneBack),t(`droneHeight`,H.droneHeight));let n=new URLSearchParams(location.search);for(let e of _w)n.has(e)&&t(e,n.get(e));return e.toString()}LC(`tbHelp`).onclick=()=>wa(`controls`),LC(`tbRestart`).onclick=()=>{G===`Free play`?(zr(),$(`Run restarted`)):(q=Ht(),K=!1,Vi())},LC(`tbFull`).onclick=zC;let Fa=async()=>{let e=await BC(Pa());$(e?`Link copied: this sea, paddler and camera`:Pa(),e?2200:8e3)};LC(`tbGuide`).onclick=()=>{H.guide=!H.guide,ai().forEach(e=>e.updateDisplay()),Lr()},LC(`tbCoach`).onclick=()=>{H.coaching=!H.coaching,ai().forEach(e=>e.updateDisplay()),vi()},setInterval(()=>{LC(`tbGuide`).classList.toggle(`on`,!!H.guide),LC(`tbCoach`).classList.toggle(`on`,!!H.coaching)},250),LC(`tbSea`).onclick=()=>Ta();let Ia=()=>matchMedia(`(max-width: 760px)`).matches,La=e=>{document.body.classList.toggle(`showgui`,e),LC(`hamb`).textContent=e?`✕`:`☰`,LC(`hamb`).setAttribute(`aria-expanded`,String(e))};LC(`tbGui`).onclick=()=>{Ia()?La(!document.body.classList.contains(`showgui`)):(xa.classList.toggle(`hidden`),document.body.classList.toggle(`nopanel`,xa.classList.contains(`hidden`)))},LC(`panelClose`).onclick=()=>{xa.classList.add(`hidden`),document.body.classList.add(`nopanel`)},t.get(`panel`)!==`1`&&(xa.classList.add(`hidden`),document.body.classList.add(`nopanel`)),LC(`hamb`).onclick=()=>LC(`tbGui`).click();for(let e of[`tbRestart`,`tbFull`])LC(e).addEventListener(`click`,()=>{Ia()&&La(!1)});function Ra(e){let t=document.getElementById(`banner`);t.textContent=e,t.style.display=e?`block`:`none`}function za(){document.body.classList.toggle(`noplay`,!(H.playback||G===`Recording`)),Va()}function Ba(){Zt.classList.toggle(`off`,H.inset===`Off`),Zt.classList.toggle(`cond`,H.inset===`Conditions`||H.inset===`Run`);let e=document.getElementById(`insetSel`);e.value!==H.inset&&H.inset!==`Off`&&(e.value=H.inset),Va()}function Va(){let e=innerWidth,n=innerHeight,r=Number(t.get(`maxpx`))||(d?25e5:p.maxPx??8e6);h.setPixelRatio(Math.min(H.renderScale,Math.sqrt(r/(e*n)))),h.setSize(e,n,!1),b.aspect=e/n,b.updateProjectionMatrix(),Ha()}function Ha(){let e=c.getBoundingClientRect(),t=Math.min(devicePixelRatio||1,2);c.width=Math.max(2,Math.round(e.width*t)),c.height=Math.max(2,Math.round(e.height*t));let n=document.getElementById(`hudBody`);n&&(n.style.zoom=Zt.classList.contains(`cond`)&&Zt.style.width?String(Math.min(1.8,Math.max(.75,Zt.getBoundingClientRect().width/300)).toFixed(3)):``)}addEventListener(`resize`,Va);function Ga(e=``){let t=H.renderScale,n=Math.min(Math.max(t,2)*1.5,4);h.setPixelRatio(n),h.setSize(innerWidth,innerHeight,!1),go(0),s.toBlob(n=>{let r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=`${H.scenario.replace(/[^a-z0-9]+/gi,`-`).toLowerCase()}-${H.view.replace(/\s+/g,`-`).toLowerCase()}-t${q.toFixed(e?3:1)}s${e}.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),4e3),h.setPixelRatio(t),h.setSize(innerWidth,innerHeight,!1)})}new qt;let Ka=new qt,qa=new Pr(0,0,0,`YXZ`),Ya=new J,Xa=new oi,eo=!0,to=new J,Y={e:0,n:0,h:3,yaw:0,pitch:-.1,fresh:!0},ro=new Set,ao=3*Math.PI/180;function oo(e,t){let n=1e-6;if(t>0){let t=e<9.999999?1:e<29.999999?2:5;return Math.min(120,(Math.floor(e/t+n)+1)*t)}let r=e<=10.000001?1:e<=30.000001?2:5;return Math.max(1,(Math.ceil(e/r-n)-1)*r)}function so(e){if(H.view===`Drone`){let t=ro.has(`Shift`);if(e===`KeyY`||e===`KeyH`)H.droneHeight=Math.max(.3,Math.min(20,+(H.droneHeight+(e===`KeyY`?1:-1)*(t?2:.5)).toFixed(2)));else if(e===`KeyN`||e===`KeyM`)H.dronePitch=Math.max(-1.2,Math.min(1,H.dronePitch+(e===`KeyM`?1:-1)*ao*(t?3:1)));else return!1;return $(`Drone ${H.droneHeight} m up · ${H.droneBack.toFixed(1)} m behind · ${H.droneSide.toFixed(1)} m right`),ai().forEach(e=>e.updateDisplay()),!0}if(H.view!==`Free cam`){let t=ro.has(`Shift`),n=!!Tw[H.view].local,r=Zr();if(e===`KeyY`||e===`KeyH`)Xr.u=Math.max(-r,Math.min(r,+(Xr.u+(e===`KeyY`?1:-1)*(n?.1:1)*(t?5:1)).toFixed(2)));else if(e===`KeyN`||e===`KeyM`)Xr.pitch=Math.max(-1.2,Math.min(1,Xr.pitch+(e===`KeyM`?1:-1)*ao*(t?3:1)));else return!1;return $(`${H.view}: ${Xr.u>=0?`+`:``}${Xr.u.toFixed(1)} m up · tilt ${Xr.pitch>=0?`+`:``}${(Xr.pitch*180/Math.PI).toFixed(0)}° (change camera to reset)`),!0}if(e===`KeyY`||e===`KeyH`)Y.h=oo(Y.h,e===`KeyY`?1:-1);else if(e===`KeyN`||e===`KeyM`)Y.pitch=Math.max(-89*Math.PI/180,Math.min(60*Math.PI/180,Y.pitch+(e===`KeyM`?1:-1)*ao*(ro.has(`Shift`)?3:1)));else return!1;return $(`Camera ${Y.h} m · tilt ${(Y.pitch*180/Math.PI).toFixed(0)}°`),!0}function co(e){let t=ro.has(`Shift`),n=(12+2*Y.h)*(t?10:1),r=+!!ro.has(`KeyI`)-!!ro.has(`KeyK`),i=+!!ro.has(`KeyL`)-!!ro.has(`KeyJ`),a=+!!ro.has(`KeyO`)-!!ro.has(`KeyU`);Y.yaw+=a*.8*(t?3:1)*e;let o=Math.sin(Y.yaw),s=Math.cos(Y.yaw);Y.e+=(o*r+s*i)*n*e,Y.n+=(s*r-o*i)*n*e}function lo(){let e=Math.hypot(H.droneSide,H.droneBack);if(e<2.5){let t=H.droneSide<0?-1:1;e<.05?(H.droneSide=2.5*t,H.droneBack=0):(H.droneSide*=2.5/e,H.droneBack*=2.5/e),ai().forEach(e=>e.updateDisplay())}}function uo(e){let t=3*(ro.has(`Shift`)?4:1),n=e=>+!!ro.has(e);H.droneBack=Math.max(-10,Math.min(25,H.droneBack-(n(`KeyI`)-n(`KeyK`))*t*e)),H.droneSide=Math.max(-12,Math.min(12,H.droneSide+(n(`KeyL`)-n(`KeyJ`))*t*e)),lo(),H.droneYaw=Math.max(-1.6,Math.min(1.6,H.droneYaw+(n(`KeyO`)-n(`KeyU`))*.6*(ro.has(`Shift`)?3:1)*e))}function fo(e){let t=!!Tw[H.view].local,n=ro.has(`Shift`),r=(t?.6:6)*(n?4:1),i=e=>+!!ro.has(e),a=Zr();Xr.f=Math.max(-a,Math.min(a,Xr.f+(i(`KeyI`)-i(`KeyK`))*r*e)),Xr.r=Math.max(-a,Math.min(a,Xr.r+(i(`KeyL`)-i(`KeyJ`))*r*e)),Xr.yaw=Math.max(-Math.PI,Math.min(Math.PI,Xr.yaw+(i(`KeyU`)-i(`KeyO`))*.6*(n?3:1)*e))}let po=e=>{let t=bt.frames,n=(q-Ht()-e)/bt.dt;if(n<0||!t.length)return null;let r=Math.min(t.length-2,Math.floor(n)),i=t[r],a=t[r+1]??i;if(!i||a.jump)return null;let o=Math.min(1,n-r);return[i.e+(a.e-i.e)*o,i.n+(a.n-i.n)*o]};function go(e){let n=Wp(bt.frames,bt.dt,q-Ht()),[i,a]=n.forward;R.position.set(n.e,n.z-as,-n.n),R.rotation.set(n.pitch,-n.psi,-n.roll,`YXZ`),R.updateMatrixWorld(!0);{let e=_r&&H.coaching&&G===`Free play`?_r.coachInput():null,t=Sr.step(e,W.t);if(t){yr.style.display=`block`,yr.style.opacity=t.standing?.6:1,br.textContent=t.text,br.style.color=`rgb(${t.color.map(e=>Math.round(30+225*e)).join(`,`)})`;let n=Cr?Sr.ips(W.t):null;xr.textContent=(t.next?t.next:``)+(n?`   [${n.avg.toFixed(2)} ips, peak ${n.peak.toFixed(1)}, loss ${(Wg(e)??0).toFixed(2)} mph]`:``)}else yr.style.display=`none`}if(U.raceCourse&&hn&&G===`Free play`&&t.get(`gates`)!==`0`?Er.ribbons(U.raceCourse.lines(hn,2),bt.field,q,{e:b.position.x,n:-b.position.z}):Er.hide(),U.raceCourse&&hn&&G===`Free play`&&t.get(`chevron`)!==`0`?Or.update(U.raceCourse,hn,b):Or.hide(),_r&&H.guide&&G===`Free play`&&(wr.update(_r.guide(),bt.field,q,W.prof._0xbd9c94,H.guideStyle===`Next wave`?`wave`:`route`,{weight:{Normal:1,Light:.6,Faint:.35}[H.guideWeight]??1,rise:.45*bt.field.hsRef,alts:H.guideAlts?_r.altGuides():null}),t.get(`buoys`)!==`0`&&Tr.update(U.raceCourse?_r.markers().filter(e=>e.kind!==`goal`):_r.markers(),bt.field,q,b.position)),Ds++,Vc(`competitors: pose`,()=>{let e=H.racers&&G===`Free play`?Ms(W.t):[];e.length&&!Ze&&$e(),h.getDrawingBufferSize(Xa);let n=Xa.y/2/Math.tan(b.fov*Math.PI/360);e.forEach((e,r)=>{let i=et(r,e.color);i.visible=Qe&&(!i.userData.bodyWant||!!i.userData.bodySettled),i.position.set(e.e,e.z-as,-e.n),i.rotation.set(e.pitch,-e.psi,-e.roll,`YXZ`),i.updateMatrixWorld(!0),i.userData.wiggle={seed:101+r,t:q,amount:H.wiggle};let a=b.position.distanceTo(i.position),o=2*n/Math.max(a,.1),s=o>=60?1:o>=30?2:o>=12?4:8;((Ds+r)%s===0||!i.userData.posedOnce)&&(js(i,e.phase,e.power>1,Wt().prof.form,e.mix),i.userData.skinned?.pose(),i.userData.posedOnce=!0),t.get(`drawlod`)!==`0`&&Lv(i,a,n,i.userData.skinned),Fe(i).setAmount(H.gelcoat),Fe(i).setDecalAmount(+!!H.decals)});for(let t=e.length;t<Re.length;t++)Re[t]&&(Re[t].visible=!1)}),R.userData.wiggle={seed:1,t:q,amount:H.wiggle},js(R,n.phase,n.power>1,Wt().prof.form,n.mix),(n.braceLevel??0)>0&&(n.mix?.[2]??0)>.6&&e>0){R.updateMatrixWorld(!0);let t=n.mix[3]>=0?1:-1,r=R.userData.paddle.localToWorld(Ya.set(t*(R.userData.paddleDims?.bladeCenterX??.94),0,0)),o=bt.field.sample(r.x,-r.z,q-Ht(),ue).h;r.y<o+.25&&le.blade(Math.min(e,.1),{x:r.x,y:o,z:r.z,fx:i,fz:-a,u:n.u,side:t,level:n.mix[4]??n.braceLevel,amount:H.sprayAmt})}if(V.setPaused(!K),V.simT=q,V.ctx||V.rec){let t=W?.localWind?.sample(n.e,n.n,q,V.lwOut??={}),r=t?t.ms:U.windMs??0,i=((t?t.fromDeg:U.windFromDeg??0)+180)*Math.PI/180,a=K&&G===`Free play`,o=a?n.u:0,s=Xs(r,Math.sin(i),Math.cos(i),n.psi,o),c=e>0&&V.zPrev!=null?Math.abs(n.z-V.zPrev)/e:0;V.zPrev=n.z;let l=null;if(a&&R.userData.paddle){R.updateMatrixWorld(!0);let e=R.userData.paddleDims?.bladeCenterX??.94;l=[0,0];for(let t=0;t<2;t++){let n=R.userData.paddle.localToWorld(Ya.set((t?1:-1)*e,0,0));l[t]=bt.field.sample(n.x,-n.z,q-Ht(),ue).h-n.y+mw}}let u=a?n.plunge??0:0,d=u>.35&&(V.plPrev??0)<=.35?u:0;V.plPrev=u;let f=(n.mix?.[3]??0)>=0?1:-1,p=a&&l&&(n.braceLevel??0)>0&&(n.mix?.[2]??0)>.6?{level:n.mix[4]??n.braceLevel,side:f,wet:+(l[+(f>0)]>-.1)}:null,m=null;a&&H.racers&&G===`Free play`&&hr?.setters?.length&&(m=[],Ms(W.t).forEach((e,t)=>{let r=e.e-n.e,i=e.n-n.n,a=Math.hypot(r,i);if(a>30)return;let o=Re[t],s=o?.visible&&o.userData.paddle,c=null;if(s){let e=o.userData.paddleDims?.bladeCenterX??.94;c=[0,0];for(let t=0;t<2;t++){let n=s.localToWorld(Ya.set((t?1:-1)*e,0,0));c[t]=+(bt.field.sample(n.x,-n.z,q-Ht(),ue).h-n.y+mw).toFixed(3)}}m.push({id:t,d:+a.toFixed(2),pan:+(.8*Math.sin(Math.atan2(r,i)-n.psi)).toFixed(3),blades:c,power:e.power,slam:+(e.plunge??0).toFixed(3)})}));let h=a?Hn(n,q):null;V.update(e,{spill:h?.s??0,spillSize:h?.size??0,spillPan:h?.pan??0,app:s,gusty:!t&&!!U.state?.gusts?.on,gustNow:t?Math.max(0,Math.tanh(1.3*t.g)):null,hs:U.state?.stats?.hs??0,heave:c,u:o,surfing:a&&!!n.onRun,power:n.power,brace:p,others:m},l,{slam:d});let g=Un()?.(n.e,n.n)??1/0,_=Number.isFinite(g)?Math.min(1,Math.max(0,(25-g)/20)):0;V.ambience(e,{near:_,storm:Math.max(0,((H.cloudDark??0)-.6)/.4)},`./`)}let o=Tw[H.view];R.userData.rider.forEach(e=>{e.visible=!o.hideRider&&!t.get(`norider`)}),bs(R,!!o.hideRider);{let e=R.userData.skinned;e&&(e.setHeadless(!!o.hideRider),e.pose())}if(Ie.visible=!1,!o.free&&!o.drone){let e=performance.now();fo(Math.min(.1,(e-(Y.nt??e))/1e3)),Y.nt=e}if(o.local){let e=H.view===`Head POV`?[0,H.eyeHeight,o.local[2]]:o.local;b.position.copy(R.localToWorld(Ya.set(e[0]+Xr.r,e[1]+Xr.u,e[2]-Xr.f)));let t=Math.max(0,Math.min(1,H.camSteady??o.steady??0));b.quaternion.setFromEuler(qa.set(n.pitch*(1-.6*t),-n.psi,-n.roll*(1-t),`YXZ`)).multiply(Ka.setFromEuler(qa.set(o.pitch+Xr.pitch,Xr.yaw,0,`YXZ`)))}else if(o.free){if(Y.fresh){Y.fresh=!1;let e=t.get(`cam`);if(e&&!Y.fromUrl){Y.fromUrl=!0;let[t,n,i=3,a=0,o=-5]=e.split(`,`).map(Number),s=nr(U),c=s&&r[s],l=c?{lat:c.meta.lat0,lon:c.meta.lon0}:U.geo??{lat:0,lon:0},[u,d]=$a(l,t,n);Y.e=u,Y.n=d,Y.h=i,Y.yaw=a*Math.PI/180,Y.pitch=o*Math.PI/180}else eo?(Y.e=n.e-i*8,Y.n=n.n-a*8,Y.h=3,Y.yaw=Math.atan2(i,a),Y.pitch=-.1):(b.getWorldDirection(Ya),Y.e=b.position.x,Y.n=-b.position.z,Y.yaw=Math.atan2(Ya.x,-Ya.z),Y.pitch=Math.asin(Math.max(-1,Math.min(1,Ya.y))),Y.h=oo(Math.max(1,b.position.y)-.5,1))}let e=performance.now();co(Math.min(.1,(e-(Y.t??e))/1e3)),Y.t=e;let o=xt?xt.elevationAt(Y.e,Y.n):-1e9;b.position.set(Y.e,Math.max(Y.h,o+1.5),-Y.n),b.up.set(0,1,0),b.lookAt(Y.e+Math.sin(Y.yaw)*Math.cos(Y.pitch),b.position.y+Math.sin(Y.pitch),-(Y.n+Math.cos(Y.yaw)*Math.cos(Y.pitch))),Y.roll&&b.rotateZ(Y.roll)}else if(o.drone){lo();let e=a,t=-i,r=bt.field,o=q,s=n.e-i*H.droneBack+e*H.droneSide,c=n.n-a*H.droneBack+t*H.droneSide,l=(e,t)=>r.sample(e,t,o,{}).h;{let e=performance.now();H.view===`Drone`&&uo(Math.min(.1,(e-(Y.dt??e))/1e3)),Y.dt=e}b.position.set(s,l(s,c)+H.droneHeight,-c),b.up.set(0,1,0),b.lookAt(n.e+i*3.2,n.z+.3,-n.n-a*3.2),(H.droneYaw||H.dronePitch)&&(b.rotateOnWorldAxis(Ya.set(0,1,0),-H.droneYaw),b.rotateX(H.dronePitch))}else if(H.view===`Chase`){let t=n.e-i*(14-Xr.f)+a*Xr.r,r=n.n-a*(14-Xr.f)-i*Xr.r,o=Ya.set(t,n.z+4.5+Xr.u,-r).clone();eo&&to.copy(o),to.lerp(o,e?1-Math.exp(-e*4):1),b.position.copy(to),b.lookAt(n.e+i*10,n.z+.4,-n.n-a*10)}else{let e=n.e+i*Xr.f+a*Xr.r,t=n.n+a*Xr.f-i*Xr.r;b.position.set(e,n.z+Math.max(2,38+Xr.u),-t+.01),b.up.set(i,0,-a),b.lookAt(e+i*12,n.z,-t-a*12),b.up.set(0,1,0)}!o.free&&!o.drone&&!o.local&&(Xr.yaw||Xr.pitch)&&(b.rotateOnWorldAxis(Ya.set(0,1,0),Xr.yaw),b.rotateX(Xr.pitch)),eo=!1;let s=D.uniforms;if(s.uSkiPos.value.set(n.e,n.n),s.uSkiFwd.value.set(i,a),s.uSkiSpeed.value=n.u,xe){let e=performance.now(),t=Math.min(.1,(e-(xe.tPrev??e))/1e3);xe.tPrev=e;let r=bt.field,o=q,s=U.current??[0,0],c=(e,t)=>r.sample(e,t,o,{});xe.update(t,{e:n.e,n:n.n,fe:i,fn:a,u:n.u,z:n.z,pitch:n.pitch},s,c,po);let l=Se&&H.racers&&G===`Free play`?Ms():[];l.forEach((e,n)=>be.wake(1+n)?.update(t,{e:e.e,n:e.n,fe:Math.sin(e.psi),fn:Math.cos(e.psi),u:e.u,z:e.z,pitch:e.pitch},s,c,null));for(let e=1+l.length;e<be.wakes.length;e++)be.wakes[e]?.off();be.upload()}R.updateMatrixWorld(!0),ys(s,kr,[R,...Re]),h.getDrawingBufferSize(Xa),D.setEnv(ho(U.state.timeline,q,uw)),Vc(`objects.update`,()=>ce.update(q,bt.field,b)),xn?.update(b.position.x,-b.position.z);{let e=Math.max(0,b.position.y),t=e<40?0:Math.round(e/20);if(!Sw.on&&t!==xw.key&&Math.abs(e-xw.hb)>12&&(xw.key=t,xw.hb=t*20,xw.cs=t?Math.max(1,xw.hb/30):1,xw.rMax=t?80*xw.hb:0,D.setGrid(Cw(H.quality,H.crit))),Sw.on){let t=Math.max(.3,e),n=2*Math.tan(b.fov*Math.PI/360)/Math.max(1,h.domElement.height),r=performance.now();(Math.abs(Math.log(t/Sw.h))>.35||Math.abs(Math.log(n/Sw.pix))>.3)&&r-Sw.at>1500&&(Sw.h=t,Sw.pix=n,Sw.at=r,D.setGrid(Cw(H.quality,H.crit)))}}Vc(`water.update`,()=>{E(),D.update(q,{e:b.position.x,n:-b.position.z},b.position,2*Math.tan(b.fov*Math.PI/360)/Math.max(1,h.domElement.height),b,h.domElement.width,h.domElement.height),D.setSector(gw?yw(b):bw(b))});let c=n.splash??0;zc.noSpray||Vc(`bow spray`,()=>{let e=Number(t.get(`splash`)||0),r=le.lastT;le.lastT=q;let i=r==null||q<r?0:Math.min(.25,q-r),a=Math.max(+(i>0),Math.ceil(i*60)),o=3.05;for(let s=1;s<=a;s++){let l=r+i*s/a,u=s===a?n:Wp(bt.frames,bt.dt,l),d=u.forward[0],f=u.forward[1],p=u.e+d*o,m=u.n+f*o,g=bt.field.sample(p,m,l,ue).h;c=Math.max(c,u.splash??0);let _=t.get(`buryb`)==null?null:Number(t.get(`buryb`)),v=_==null?t.get(`bury`)==null?e?.25:u.bury:Number(t.get(`bury`)):_-Me,y=v+Me;le.update(i/a,{x:p,y:g,z:-m,fx:d,fz:-f,u:u.u,spray:e?.4*e:u.spray,encounter:e?2.5:u.encounter,plunge:e?e*.6:u.plunge,bury:v,buryBottom:y,amount:H.sprayAmt,on:!0,mesh:H.sprayModel!==`Ribbons`,waterY:g,hullHalfWidth:je,slam:e?Math.min(1,e):u.splash??0,cockpitD:3.3499999999999996,cockpitY:u.z-as+(se?se.deckTop(.3):.3)},b,h.domElement.height),Ne?.update(i/a,{bury:v,u:u.u,plunge:e?e*.6:u.plunge})}let s=H.sprayModel!==`Ribbons`;if(de.setVisible(s),s&&se){R.updateMatrixWorld(!0);let e=R.matrixWorld;pe.copy(e).invert();let t=he&&q>he.t?q-he.t:0,r=t?(n.z-he.z)/t:0,i=t?(n.pitch-he.p)/t:0;he={t:q,z:n.z,p:n.pitch},de.update(q,{boat:se,amount:H.sprayAmt,toWorld:t=>(fe.set(t[0],t[1],t[2]).applyMatrix4(e),[fe.x,fe.y,fe.z]),toLocalY:e=>fe.set(e[0],e[1],e[2]).applyMatrix4(pe).y,rotate:t=>(fe.set(t[0],t[1],t[2]).transformDirection(e),[fe.x,fe.y,fe.z]),water:(e,t)=>(bt.field.sample(e,-t,q,me),{h:me.h,ve:me.ue,vu:me.uz,vs:-me.un}),hullV:e=>[n.u*n.forward[0],r-e*i,-n.u*n.forward[1]]})}Ne?.upload(),Fe(R).setAmount(H.gelcoat),Fe(R).setDecalAmount(+!!H.decals),Ie.visible&&(Fe(Ie).setAmount(H.gelcoat),Fe(Ie).setDecalAmount(+!!H.decals))});let l=t.get(`freeze`)??``,u=zc.simEvery<=1||zc.frameNo%zc.simEvery===0;u&&!(l.includes(`fft`)&&ge.sea===U.state.fft.sea&&ge.out)&&Vc(`fft sea`,()=>Wc(()=>ge.update(U.state.fft.sea,q),`fft sea`)),P&&!zc.noSky&&Vc(`sky cube`,()=>Wc(()=>P.update(),`sky cube`));{let e=D.uniforms.uRipAmp.value;u&&e.x+e.y+e.z>0&&!(l.includes(`rip`)&&ve.done)&&(Vc(`ripple cascades`,()=>Wc(()=>ve.update(q),`ripple cascades`)),ve.done=!0)}Ce&&!zc.noFoam&&u&&Vc(`foam field`,()=>Wc(()=>Ce.update(q,{e:n.e,n:n.n,fe:i,fn:a,u:n.u,splash:Number(t.get(`splash`)||0)||c,sprays:H.sprayModel===`Ribbons`?[]:de.takeLandings(q)},U.current??[0,0],H.racers&&G===`Free play`?Ms(W.t).slice(0,6).map(e=>({e:e.e,n:e.n,fe:Math.sin(e.psi),fn:Math.cos(e.psi),u:e.u})):[],(()=>{let e=((U.windFromDeg??0)+180)*Math.PI/180;return{toE:Math.sin(e),toN:Math.cos(e),ms:io(U.windMs??0)}})()),`foam field`)),we&&Vc(`foam roller`,()=>Wc(()=>{let e=((U.windFromDeg??0)+180)*Math.PI/180,n=zy.drift*io(U.windMs??0),r=U.current??[0,0];we.update(b,D.uniforms.uSpillOn.value>.5,{t:q,field:bt.field,drift:[r[0]+n*Math.sin(e),r[1]+n*Math.cos(e)],wind:{toE:Math.sin(e),toN:Math.cos(e),ms:U.windMs??0},pixAng:2*Math.tan(b.fov*Math.PI/360)/Math.max(1,h.domElement.height),spray:t.get(`rollerspray`)!==`0`})},`foam roller`)),N.position.copy(b.position),yt&&yt.position.set(b.position.x,0,b.position.z),nn.update(b,H.sunEl),O.target.position.copy(R.position),O.position.set(n.e+s.uSunDir.value.x*1e3,s.uSunDir.value.y*1e3,-n.n+s.uSunDir.value.z*1e3),ae(),b.fov!==H.fov&&(b.fov=H.fov,b.updateProjectionMatrix()),cn?.isTerrainTiles&&cn.update(b,b.fov*Math.PI/180/Math.max(1,h.domElement.height));{let e=performance.now();Vc(`renderer.render (submit)`,()=>Wc(()=>h.render(y,b))),vc+=performance.now()-e}{let e=h.getContext();e.fenceSync&&Ic.fences.length<2&&Ic.fences.push(e.fenceSync(e.SYNC_GPU_COMMANDS_COMPLETE,0))}return we?.pass&&Vc(`foam volume`,()=>Wc(()=>we.renderPass(b),`foam volume`)),n}let _o=document.getElementById(`hudBody`),vo=document.getElementById(`hudSpeed`),yo=1,bo=!1,xo=``,qo=0,Zo=0,es=0,rs=new Map,is=new Map,ss=``;function ps(e,t,n){let r=`${e}.${t}`;if(rs.get(r)===n)return;rs.set(r,n);let i=is.get(e);if(!i){if(i=document.getElementById(e),!i)return;is.set(e,i)}t===`text`?i.textContent=n:i.style[t]=n}function ms(e,t,n,r,i=!1){let a=t=>{e.classList.toggle(`collapsed`,t);try{localStorage.setItem(n,t?`1`:`0`)}catch{}r?.()};t.addEventListener(`click`,()=>a(!e.classList.contains(`collapsed`)));let o=i;try{let e=localStorage.getItem(n);e!=null&&(o=e===`1`)}catch{}e.classList.toggle(`collapsed`,o)}document.getElementById(`insetSel`).addEventListener(`change`,e=>{H.inset=e.target.value,Ba()});for(let e of[`pointerdown`,`click`])document.getElementById(`insetSel`).addEventListener(e,e=>e.stopPropagation());ms(Zt,document.getElementById(`insetBar`),`surfski.insetCollapsed`,()=>Va(),!0);{let e=document.getElementById(`insetBar`),t=document.getElementById(`insetGrip`),n=`surfski.insetBox`,r=()=>{let e=Zt.getBoundingClientRect(),t=Math.min(innerWidth-16,(innerHeight-90)*.9);if(Zt.style.width&&e.width>t&&(Zt.style.width=`${Math.max(150,t)}px`),Zt.style.top){let e=Zt.getBoundingClientRect();Zt.style.left=`${Math.min(Math.max(0,e.left),Math.max(0,innerWidth-e.width))}px`,Zt.style.top=`${Math.min(Math.max(58,e.top),Math.max(0,innerHeight-40))}px`}},i=()=>{try{let e=Zt.getBoundingClientRect();localStorage.setItem(n,JSON.stringify({left:e.left,top:e.top,width:e.width}))}catch{}},a=()=>{let e=Zt.getBoundingClientRect();Zt.style.left=`${e.left}px`,Zt.style.top=`${e.top}px`,Zt.style.bottom=`auto`,Zt.style.right=`auto`};try{let e=matchMedia(`(max-width: 760px)`).matches?null:JSON.parse(localStorage.getItem(n)??`null`);e&&Number.isFinite(e.left)&&Number.isFinite(e.top)&&Number.isFinite(e.width)&&(Zt.style.width=`${e.width}px`,Zt.style.left=`${e.left}px`,Zt.style.top=`${Math.max(58,e.top)}px`,Zt.style.bottom=`auto`,Zt.style.right=`auto`,r())}catch{}let o=null,s=!1,c=(e,t)=>{if(e.button>0||matchMedia(`(max-width: 760px)`).matches)return;a();let n=Zt.getBoundingClientRect();o={mode:t,x:e.clientX,y:e.clientY,left:n.left,top:n.top,w:n.width},s=!1;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}e.preventDefault()};e.addEventListener(`pointerdown`,e=>c(e,`move`)),t.addEventListener(`pointerdown`,e=>{c(e,`size`),e.stopPropagation()});let l=t=>{if(!o)return;let n=t.clientX-o.x,r=t.clientY-o.y;if(!(!s&&Math.hypot(n,r)<4)){if(s=!0,o.mode===`move`)e.classList.add(`dragging`),Zt.style.left=`${Math.min(Math.max(0,o.left+n),innerWidth-Zt.offsetWidth)}px`,Zt.style.top=`${Math.min(Math.max(58,o.top+r),innerHeight-40)}px`;else{let e=Math.min(innerWidth-o.left-4,innerHeight-o.top-40);Zt.style.width=`${Math.min(Math.max(150,o.w+Math.max(n,r)),Math.max(150,e))}px`,Ha()}}},u=()=>{if(!o)return;let t=s;o=null,e.classList.remove(`dragging`),t&&(i(),Ha())};for(let n of[e,t])n.addEventListener(`pointermove`,l),n.addEventListener(`pointerup`,u),n.addEventListener(`pointercancel`,u);e.addEventListener(`click`,e=>{s&&=(e.stopImmediatePropagation(),!1)},!0),t.addEventListener(`dblclick`,()=>{Zt.removeAttribute(`style`);try{localStorage.removeItem(n)}catch{}Ha()}),addEventListener(`resize`,()=>{r()})}c.addEventListener(`wheel`,e=>{e.preventDefault(),H.mapZoom=Math.min(1,Math.max(0,H.mapZoom-e.deltaY*6e-4))},{passive:!1});let Ds=0,Ms=e=>(hr?.setters??[]).map(t=>{let n=t.g.ski,r=e!=null&&t.finishT==null?Math.max(-.05,Math.min(.05,t.g.i*t.g.h-e)):0;return{color:t.color,e:n.e-Math.sin(n.psi)*n.u*r,n:n.n-Math.cos(n.psi)*n.u*r,psi:n.psi,u:n.u,z:n.z,pitch:n.pitch,roll:n.roll,phase:t.g.phase,power:t.g.power,plunge:n.plunge??0,mix:[t.g.w[0],t.g.w[1],t.g.w[2],t.g.sideS,t.g.lvS]}}),Ls=()=>hr?.rows(W)??[];function Rs(){let e=Hv({fp:W,rows:Ls()}),t=!!_r?.drive,n=`${U.name}|${sr}|${W.paddlerName}`,r=t?null:Gv(n,e),i=t||e.stars==null?``:`<div style="font-size:34px;letter-spacing:6px;color:#ffd24d">${`★`.repeat(e.stars)}<span style="color:#456">${`★`.repeat(3-e.stars)}</span></div>`,a=t?``:r.first?`<div>First run on this course, sea and paddler: that is your best so far.</div>`:r.improved?`<div><b>New best</b>, ${Math.abs(r.deltaS).toFixed(0)} s faster than before.</div>`:`<div>${r.deltaS.toFixed(0)} s slower than your best (${zs(r.best.timeS)}).</div>`,o=document.createElement(`div`);o.id=`scoreCard`,o.style.cssText=`position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:50;min-width:300px;max-width:min(92vw,420px);background:rgba(8,24,40,.94);color:#fff;border:1px solid #7fe0c0;border-radius:12px;padding:14px 18px;font:14px system-ui;text-align:center;box-shadow:0 8px 30px #0008`,o.innerHTML=`<div style="font-size:12px;opacity:.7">${U.name}${t?` · autopilot (${H.routing})`:``}</div>${i}
      <div style="font-size:30px;font-weight:700">${zs(e.timeS)}</div>
      <div>${Bs(e.avgMs)} mph average · ${(e.distM/1e3).toFixed(2)} km paddled</div>
      <div style="opacity:.85">on a wave face ${Math.round(100*e.surfShare)}% of the run · reserve left ${e.reservePct}%</div>
      ${hr?(()=>{let e=hr.log.summary();return`<div style="opacity:.85">close calls with other boats ${e.closeUser}${e.contactUser?` · contacts ${e.contactUser}`:``}${e.clashUser?` · paddle clashes ${e.clashUser}`:``}${e.userFault?` (${e.userFault} yours)`:``}</div>`})():``}
      ${t?``:e.paceRows.map(e=>`<div>${e.name}: ${e.aheadM>=0?`ahead`:`behind`} by ${Math.abs(Math.round(e.aheadM))} m</div>`).join(``)}
      <div style="margin-top:6px">${a}</div>
      <div style="margin-top:8px"><button id="scoreClose" style="font:inherit;padding:4px 14px;border-radius:6px">Close</button></div>`,document.body.append(o),o.querySelector(`#scoreClose`).onclick=()=>o.remove()}let zs=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`,Bs=e=>(e*2.23694).toFixed(1),Vs=-1,Hs=``,Us=-1,ec=`–`,nc=null;function rc(e){let t=W.prof._0xbd9c94,n=`${W.paddlerName}|${t}`;(!nc||nc.key!==n)&&(nc=new Y_({uRide:G_(W.ski.p,t)}),nc.key=n);let r=nc.feed(W.frames).summary(),i=nc.current();return`<div title="Ride: on a wave face faster than you paddle on flat water at tempo (gaps up to 1 s bridged). Gliding: zero power (a brace counts) at more than 2 mph, as a share of the run." style="display:flex;gap:4px;margin:0 0 6px">${e(`${Math.round(i)} s`,`RIDE`)}${e(`${Math.round(r.longest)} s`,`LONGEST`)}${e(`${Math.round(100*r.glide)}%`,`GLIDING`)}</div>`}function X(e){if(G!==`Free play`)return``;let t=W.i*W.h;if(t===Vs&&Hs||Math.abs(t-Vs)<.25&&Hs&&t>Vs)return Hs;Vs=t;let n=_r?_r.distToGoal:null;if(Math.floor(t)!==Us){Us=Math.floor(t);let e=W.avgSpeed(30);ec=n!=null&&e>.5?zs(n/e):`–`}let r=(e,t,n=20)=>`<div style="flex:1;text-align:center"><div style="font-size:${n}px;font-weight:700;line-height:1.05;font-variant-numeric:tabular-nums">${e}</div><div style="font-size:10px;letter-spacing:.08em;opacity:.65;white-space:nowrap">${t}</div></div>`,i=e=>(e/1e3).toFixed(e>=1e3?2:3),a=Ls().map(e=>{let t=e.aheadS==null?e.aheadM>=0:e.aheadS>0,n=t?`#6fe39a`:`#ff8a80`,r=`#`+e.color.toString(16).padStart(6,`0`),i=e.aheadS==null?`${t?`+`:`−`}${Math.abs(Math.round(e.aheadM))} m`:`${e.aheadS>0?`+`:`−`}${Math.abs(Math.round(e.aheadS))} s`,a=n;return H.routing===`Surfing flow`&&e.longest!=null&&(i=`${Math.round(e.longest)} s`,a=(nc?.longest??0)>=e.longest?`#6fe39a`:`#ff8a80`),`<div style="display:flex;align-items:baseline;gap:8px;padding:2px 0;border-top:1px solid rgba(255,255,255,.12)"><span style="width:112px;font-size:13px;white-space:nowrap"><span style="color:${r}">●</span> ${e.name}${e.level==null?``:` <span style="opacity:.55;font-size:10px">${e.level}</span>`}</span><span style="flex:1;font-size:15px;font-variant-numeric:tabular-nums">${Bs(e.avgMs)} mph</span><span style="font-size:20px;font-weight:700;color:${a};font-variant-numeric:tabular-nums">${i}</span></div>`}).join(``),o=mr?.latest,s=o?[`Cruise`,`Sporty`,`Race`].map(e=>`<div style="flex:1;text-align:center"><div style="font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;color:${o.modes[e].speed>o.user?`#ff8a80`:`#6fe39a`}">${Bs(o.modes[e].speed)}</div><div style="font-size:9px;letter-spacing:.08em;opacity:.65">${e.toUpperCase()}</div></div>`).join(``):``,c=o?`<div title="Your average over the minute ending ${zs(o.endT)}, and what an autopilot in each routing mode averaged over the same minute from the same place. Red: it was faster than you." style="display:flex;gap:4px;align-items:center;margin-top:6px;padding-top:4px;border-top:1px solid rgba(255,255,255,.12)"><div style="flex:1;text-align:center"><div style="font-size:15px;font-weight:700;font-variant-numeric:tabular-nums">${Bs(o.user)}</div><div style="font-size:9px;letter-spacing:.08em;opacity:.65">YOU, MIN ${zs(o.startT)}</div></div>${s}</div>`:``;return Hs=`<div style="display:flex;gap:6px;align-items:flex-end">${r(Bs(e.u),`MPH`,46)}${r(Bs(W.avgSpeed(60)),`1 MIN`,46)}</div>
      <div style="display:flex;gap:4px;margin:8px 0 6px">${r(Bs(W.avgSpeed()),`AVG`)}${r(zs(t),`TIME`)}${r(n==null?`–`:i(n),`KM LEFT`)}${r(ec,`ETA`)}${r(`${Math.round(100*W.surfShare())}%`,`ON WAVE`)}</div>${H.routing===`Surfing flow`?rc(r):``}${a}${c}`}function ac(e){if(xo=`${(e.u*2.23694).toFixed(1)} mph · ${es?Math.round(es):`–`} fps`,vo.textContent!==xo&&(vo.textContent=xo),H.inset===`Run`){_o.innerHTML=X(e);return}if(H.inset!==`Conditions`)return;let t=Gp(bt.field,e,q),n=e=>(e/jo).toFixed(1),r=t.steepest.deg,i=r>30?`warn`:``,a=no(U.tp)/pw,o=U.current?` · current ${(Math.hypot(...U.current)/pw).toFixed(1)} kt`:``,s=U.geo?Ua(U.geo,e.e,e.n):null,c=U.layers.filter(e=>e.kind!==`ripples`).map(e=>`${e.name} from ${Qa((e.dirToDeg+180)%360)}`).join(`, `);_o.innerHTML=`
      <div class="name">${U.name}</div>
      <div class="notes">${U.notes}</div>
      <div class="notes">Sea: ${lr?`${U.seaModel.name} (edited)`:Oo(sr)?`${Oo(sr).name}. ${Oo(sr).notes}`:U.seaModel?.name??``}</div>
      ${U.geo?`<div class="geo">${U.geo.name}<br>${Za(s)}</div>`:``}
      <div style="font-size:12px;opacity:.85">Waves from: ${c}${U.windFromDeg==null?``:` · wind from ${Qa(U.windFromDeg)}`}. Sun from ${Qa(H.sunAz)}, ${Math.round(H.sunEl)}° high</div>
      <div style="opacity:.8">${Wt().paddlerName} · ${Wt().prof.boat.name}</div>
      <div class="big">${(e.u*2.23694).toFixed(1)} <small>mph (${(e.u/pw).toFixed(1)} kt) · heading ${e.headingDeg.toFixed(0)}°</small></div>
      ${G===`Free play`?`<div>Average speed: run ${(W.avgSpeed()*2.23694).toFixed(1)} mph · last 30 s ${(W.avgSpeed(30)*2.23694).toFixed(1)} · last 10 s ${(W.avgSpeed(10)*2.23694).toFixed(1)}</div>`:``}
      <div>${G===`Free play`?`Free play`:`Recording`}${e.onRun?` · <span class="run">on a wave face</span>`:``}</div>
      <div>Surface height (ft): here ${n(t.heights[0])} · +2 m ${n(t.heights[2])} · +5 m ${n(t.heights[5])} · +10 m ${n(t.heights[10])}</div>
      <div class="${i}">Steepest rising face ahead: ${r.toFixed(0)}° at ${t.steepest.at.toFixed(1)} m</div>
      <div>Main wave period ${U.tp.toFixed(1)} s · crest speed ${a.toFixed(1)} kt (${(a*pw*2.23694).toFixed(1)} mph)${o}</div>
      <div style="opacity:.7;font-size:11px;margin-top:4px">↑ tap = power up (↑ hold = keep climbing) · ↓ tap = ease off (↓ hold = glide) · ←/→ steer · Space pause/resume · IJKL/UO move the camera · Alt+IJKL move the boat 100 m · Alt+U/O turn it 30° · [ ] mark in/out · C save clip · V camera</div>`,G===`Free play`&&W.aground?(Ra(`Aground. Steer away from the shore.`),bo=!0):bo&&=(Ra(``),!1)}let oc=null,sc=[];function cc(){return oc===U.layers||(oc=U.layers,sc=U.layers.filter(e=>e.kind!==`ripples`).map(e=>({name:e.name.replace(/\s*\(.*\)/,``),zone:e.ch?U.state.zones?.[e.ch]??null:null,dirDeg:e.dirToDeg,hsFt:e.Hs/jo}))),sc}function lc(){let e=(U.state.zones??[]).filter(Boolean),t=U.start??{e:0,n:0};if(!e.length)return;let n=0;for(let r of e){let e=r.kind===1?[[r.ax,r.ay,r.size+r.soft],[r.bx,r.by,r.size+r.soft]]:[[r.ax,r.ay,r.size]];for(let[r,i,a]of e)n=Math.max(n,Math.hypot(r-t.e,i-t.n)+a)}let r=Math.min(12e3,Math.max(60,2.3*n));H.mapZoom=Math.round(Math.min(1,Math.max(0,1-Math.log(r/60)/Math.log(200)))*100)/100}let uc=null,dc=null;function fc(){let e=U.raceCourse;if(!e||!hn)return null;let t=`${U.name}|${hn.i}`;return t!==uc&&(uc=t,dc=e.lines(hn,3)),dc}function pc(e){let t=Qt(),n=U.geo?Ua(U.geo,e.e,e.n):null,r=U.site===`shilshole`?` · OpenStreetMap shore`:` · open water`;Xt.draw({ski:e,field:bt.field,time:q,terrain:xt,geo:n?Za(n):``,frames:bt.frames,dt:bt.dt,t0:Ht(),widthM:t,wavesToDeg:U.state.stats.dominant?.dirToDeg??0,sunAzDeg:H.sunAz,groups:cc(),gates:fc(),solve:Pn(),label:`${t>=1e3?`${(t/1e3).toFixed(1)} km`:`${Math.round(t)} m`} wide${r}`})}let mc=performance.now(),hc=0,gc=!1,_c=0,vc=0,yc=t.get(`fieldms`)==null?p.fieldMs??(matchMedia(`(pointer: coarse)`).matches?2:4):Number(t.get(`fieldms`)),bc=p.planBudget??4,xc=e=>{H.quality=e,D.setGrid(Cw(e,H.crit)),ai().forEach(e=>e.updateDisplay())},Sc=[`Standard`,`Draft`,`Low`],Cc=new JC({pixels:()=>(h.getDrawingBufferSize(Xa),Xa.x*Xa.y),scale:(e,t)=>{let n=qC(H.renderScale,e,t);return n!=null&&(H.renderScale=n,Va(),t||Ci.set(n),!0)},deep:e=>H.renderScale<=e+.01?!1:(H.renderScale=e,Va(),!0),up:()=>{let e=KC(H.renderScale,wi());return e!=null&&(H.renderScale=e,Va(),!0)},kept:()=>{Ci.set(H.renderScale),ai().forEach(e=>e.updateDisplay())},cpu:()=>bc>1.5?(bc=bc>2.5?2.5:1.5,`The guide and the competitors now think a little more slowly, to keep the motion smooth`):null,snap:()=>({renderScale:H.renderScale,quality:H.quality,crit:H.crit,lite:H.lite,trailR:H.trailR,planBudget:bc}),apply:e=>{H.renderScale=e.renderScale,Va(),Ci.set(e.renderScale),bc=e.planBudget??bc,(H.quality!==e.quality||H.crit!==e.crit)&&(H.crit=e.crit,xc(e.quality)),va(e.lite),_a(e.trailR),ai().forEach(e=>e.updateDisplay())},mesh:()=>{let e=Sc.indexOf(H.quality);return e<0||e>=Sc.length-1?null:(xc(Sc[e+1]),`Simplified the water (${H.quality} mesh) to keep the motion smooth`)},near:()=>H.trailR>150?(_a(150),`Foam trails now only near you (hardly visible), to keep the motion smooth`):null,lite:()=>H.lite?null:(va(!0),`Turned off foam trails to keep the motion smooth`)},{enabled:Ti&&!t.get(`bench`)});window.__adapt=Cc,Cc.a.state=()=>`${H.quality} mesh, scale ${H.renderScale}${H.lite?`, no trails`:`, trails ${H.trailR} m`}, plan ${bc} ms, ${qe.length} competitors at ${yc} ms`,Cc.onEvent=e=>window.__crumb?.(`gov ${e.t} s ${e.kind}: ${e.msg}${e.win?` [last window ${e.win.fps} fps, mean ${e.win.meanMs} ms, page ${e.win.pageMs} ms, target ${e.win.target}]`:``} → ${e.after}`),lt=()=>[`governor: target ${Cc.target} fps, ${Cc.enabled?`on`:`off`}; now ${Cc.a.state()}; ${Cc.events.length} decisions (each a "gov" line above); its windows (s since it started, fps, mean ms, page ms, what came of it):`,Cc.windows.map(e=>`${e.t} ${e.fps} ${e.meanMs} ${e.pageMs} ${e.did}`).join(` | `)].join(`
`);let wc=Cc.a.cpu;Cc.a.cpu=()=>wc()??(Fi.on?yc>1.01?(yc=Math.max(1,+(yc*.7).toFixed(2)),`The competitors now move on a lighter step, to keep the motion smooth`):qe.length>0?(Ni(`field`,qe.length-1),`One competitor fewer, to keep the motion smooth`):null:null);let Tc=e=>Cc.setTarget(mt.on?30:60,{deep:!e});Fi.api.onExperience=Tc,Tc(Fi.on),Fi.api.onBattery=e=>{mt.on=e,Tc(Fi.on)};{let e=Fi.api.onExperience;Fi.api.onExperience=t=>{e(t),He=t}}let Dc=0;window.__fps=()=>es;let Oc=Number(t.get(`bench`)||0),kc=[];function Ac(e,t){if(kc.push([e,t]),jc&&kc.length===40&&(jc.frames=0,jc.ms={},jc.gpuMs=0,jc.gpuFrames=0,jc.gpu={},jc.gpuN={},jc.gpuBig={}),kc.length===40+Oc&&!window.__bench){let e=kc.slice(40),t=(e,t)=>e.slice().sort((e,t)=>e-t)[Math.min(e.length-1,Math.floor(e.length*t))],n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=e=>e.reduce((e,t)=>e+t,0)/e.length,a=h.getContext(),o=a.getExtension(`WEBGL_debug_renderer_info`);h.getDrawingBufferSize(Xa),window.__bench={frames:e.length,intervalMs:{mean:i(n),p95:t(n,.95)},renderMs:{mean:i(r),p95:t(r,.95)},quality:H.quality,lite:H.lite,renderScale:H.renderScale,buffer:[Xa.x,Xa.y],css:[innerWidth,innerHeight],dpr:devicePixelRatio,gpu:o?a.getParameter(o.UNMASKED_RENDERER_WEBGL):`unknown`,scenario:H.scenario,view:H.view,...jc?{prof:{frames:jc.frames,msPerFrame:Object.fromEntries(Object.entries(jc.ms).map(([e,t])=>[e,t/Math.max(1,jc.frames)])),gpuMsPerFrame:jc.gpuFrames?jc.gpuMs/jc.gpuFrames:null,gpuTimerAvailable:!!Nc,gpuMsPerStage:Object.fromEntries(Object.entries(jc.gpu).map(([e,t])=>[e,t/Math.max(1,jc.gpuN[e])])),info:{memory:{...h.info.memory},render:{calls:h.info.render.calls,triangles:h.info.render.triangles},programs:h.info.programs?.length??null},heapMB:performance.memory?performance.memory.usedJSHeapSize/1e6:null,waterVertices:D.mesh.geometry.attributes.position.count}}:{}}}}let jc=t.get(`prof`)===`1`?window.__prof={frames:0,ms:{},gpuMs:0,gpuFrames:0,gpu:{},gpuN:{},gpuBig:{},pending:[],cur:{},max:{},slow:[]}:null,Mc=jc?h.getContext():null,Nc=Mc?Mc.getExtension(`EXT_disjoint_timer_query_webgl2`):null,Pc=window.__hitches={cur:{},prev:{},progs:0,progsPrev:0,steps:0,busy:null,late:0,log:[]},Ic=window.__secs={list:[],cur:null,fences:[]};function Lc(e,t){let n=Ic.cur;if(n||=Ic.cur={t0:e,n:0,iv:[],page:0,steps:0,adv:0,busy:0,busyN:0,late:0,sl:Wa.slices,pf:Wa.prefetched},n.n++,n.iv.push(t),n.page+=Pc.workPrev??0,n.steps+=Pc.stepsPrev??0,n.adv+=Pc.prev[`physics: fp.advance`]??0,n.late+=Pc.late,Pc.busy!=null&&(n.busyN++,Pc.busy&&n.busy++),e-n.t0<1e3)return;let r=n.iv.sort((e,t)=>e-t),i=n.n,a=e=>+e.toFixed(1);Ic.list.push({t:Math.round(n.t0/1e3),fps:Math.round(i*1e3/(e-n.t0)),p90:Math.round(r[Math.floor(r.length*.9)]),page:a(n.page/i),adv:a(n.adv/i),steps:a(n.steps/i),busy:n.busyN?Math.round(100*n.busy/n.busyN):null,late:a(n.late/i),main:Wa.slices-n.sl,worker:Wa.prefetched-n.pf,live:K,q:H.quality}),Ic.list.length>100&&Ic.list.splice(40,1),Ic.cur=null}let Rc=()=>[`since the page opened, a line a second: s, fps, p90 ms, page ms, fp.advance ms, physics steps a frame, GPU over a frame behind (% of frames), late ms, sea slices main/worker, live, mesh`,...Ic.list.map(e=>`${e.t} ${e.fps} ${e.p90} ${e.page} ${e.adv} ${e.steps} ${e.busy??`-`} ${e.late} ${e.main}/${e.worker} ${e.live?`live`:`paused`} ${e.q}`)].join(`
`),zc={noFoam:!1,noSpray:!1,noSky:!1,simEvery:1,finish:!1,frameNo:0,run:null},Bc=h.getContext(),Vc=(e,t)=>{zc.finish&&Bc.finish();let n=performance.now(),r=t();zc.finish&&Bc.finish();let i=performance.now()-n;return Pc.cur[e]=(Pc.cur[e]??0)+i,jc&&(jc.ms[e]=(jc.ms[e]??0)+i),r},Hc=()=>{Pc.prev=Pc.cur,Pc.cur={},Pc.workPrev=Pc.work,Pc.stepsPrev=Pc.steps,Pc.steps=0,Pc.progsPrev=Pc.progs,Pc.progs=h.info.programs?.length??0},Uc=e=>{zc.run?.rec&&zc.run.rec.push([e,Pc.workPrev??0,Pc.prev,Pc.stepsPrev??0,Pc.busy,Pc.late]);let t=Pc.prev,n=Object.entries(t).filter(([,e])=>e>1).sort((e,t)=>t[1]-e[1]);if(jc){for(let e in t)t[e]>(jc.max[e]??0)&&(jc.max[e]=t[e]);e>50&&jc.slow.length<60&&jc.slow.push({at:Math.round(performance.now()),ms:Math.round(e),stages:Object.fromEntries(n.map(([e,t])=>[e,+t.toFixed(1)]))})}if(e>250&&!document.hidden){let t=Pc.progs-Pc.progsPrev,r=n.reduce((e,[,t])=>e+t,0),i=`pause ${Math.round(e)} ms (page ${Math.round(Pc.workPrev??0)})${t>0?`, ${t} new shader${t>1?`s`:``}`:``}: ${n.slice(0,4).map(([e,t])=>`${e} ${Math.round(t)}`).join(`, `)||`no stage`}${r<e*.5?` (most of it outside the stages: compiling, collecting, the GPU or the browser)`:``}`;Pc.log.push(i),Pc.log.length>30&&Pc.log.shift(),window.__crumb?.(i)}},Wc=(e,t=`main render`)=>{if(!jc||!Nc){e();return}let n=Mc.createQuery();Mc.beginQuery(Nc.TIME_ELAPSED_EXT,n),e(),Mc.endQuery(Nc.TIME_ELAPSED_EXT),jc.pending.push([n,t]);for(let e=jc.pending.length-1;e>=0;e--){let[t,n]=jc.pending[e];if(Mc.getQueryParameter(t,Mc.QUERY_RESULT_AVAILABLE)){if(!Mc.getParameter(Nc.GPU_DISJOINT_EXT)){let e=Mc.getQueryParameter(t,Mc.QUERY_RESULT)/1e6;if(jc.gpu[n]=(jc.gpu[n]??0)+e,jc.gpuN[n]=(jc.gpuN[n]??0)+1,e>1){let t=jc.gpuBig[n]??=[];t.length<200&&t.push(+e.toFixed(1))}n===`main render`&&(jc.gpuMs+=e,jc.gpuFrames++)}Mc.deleteQuery(t),jc.pending.splice(e,1)}}},Gc=null,Kc=null;async function qc(){if(zc.run)return;Gc??=BS(h),Kc??=zS(tc,h);let e=D.uniforms,n=e.uRipAmp.value.clone(),r=t.get(`freeze`),i=cn?.visible??!0,a={live:K,auto:H.autopilot,adapt:Cc.enabled,plan:bc},o=[],s=[],c=null,l=e=>new Promise(t=>setTimeout(t,e)),u=e=>Math.round(e*10)/10,d=e=>window.__crumb?.(e),p=()=>{if(!H.autopilot){H.autopilot=!0;try{Ar()}catch{}}},m=()=>{o.forEach((e,t)=>{e.visible=s[t]}),cn&&(cn.visible=i),e.uRipAmp.value.copy(n),r==null?t.delete(`freeze`):t.set(`freeze`,r),zc.noFoam&&Ce&&(Ce.last=q),zc.noFoam=!1,zc.noSpray=!1,zc.noSky=!1,zc.simEvery=1,zc.finish=!1,bc=c?.planBudget??a.plan;let l=!1;return c&&(H.renderScale!==c.renderScale||H.quality!==c.quality)&&(Cc.a.apply(c),l=!0),p(),l},g=async e=>{zc.run.rec=[],Gc.reset(),Gc.on=!0;let t=zc.frameNo;await l(e),Gc.on=!1;let n=zc.run.rec.slice(1);zc.run.rec=null;let r=Math.max(1,zc.frameNo-t),i=n.filter(e=>e[4]!=null),a=n.length?n.reduce((e,t)=>e+(t[5]??0),0)/n.length:0;return{R:n,s:MS(n),nf:r,renders:Gc.renders,calls:Gc.calls,targets:Gc.targets,busy:i.length?Math.round(100*i.filter(e=>e[4]).length/i.length):null,late:u(a),passes:{renders:u(Gc.renders/r),calls:Math.round(Gc.calls/r),targets:u(Gc.targets/r)}}},_=()=>({fp:W,ski:W?.ski,run:bt,pace:hr,pilot:_r,foam:Ce,hullFilm:de,bowSpray:le,objects:ce,audio:V,telemetry:Mi,fftg:ge,ripc:ve,courseLog:gn,hitchLog:Pc.log,sea:U?.state,fftSets:U?.state?.fft?.sea?.sets,prefetch:Wa.prefetch}),v=h.getContext(),b=v.getExtension(`WEBGL_debug_renderer_info`),x=b?v.getParameter(b.UNMASKED_RENDERER_WEBGL):`GPU unknown`;h.getDrawingBufferSize(Xa);let S=Object.keys(lS).filter(e=>!uS(e));await d(`MEASURE (about 1 min 50 s) at governor time ${Cc.now()} s: ${U.name}; ${Xa.x}x${Xa.y} buffer (scale ${H.renderScale}, ${innerWidth}x${innerHeight} at ${devicePixelRatio}x); ${Fi.on?`casual, ${Fi.controls} controls`:`full experience`}; device ${f.tier}; Battery mode (30 fps lock) ${mt.on?`ON`:`off`}; target ${Cc.target} fps; governor ${Cc.enabled?`on`:`off`}; mesh ${H.quality}${H.lite?`, cheaper effects`:``}; ${qe.length} competitors; speed-ups off: ${S.join(`, `)||`none`}; ${x}`),await d(`power: ${await VS()}`),await d(`governor before: ${Cc.events.length?Cc.events.map(e=>`${e.t} s ${e.kind}: ${e.msg}`).join(` | `):`no decisions`}; now ${Cc.a.state()}`),$(`Measuring, about 2 minutes: leave it running`,5e3),zc.run={rec:null};let C={series:[],steps:[],split:null},w=async e=>{let t=K;K=!1;let n=y.children.map(e=>e.visible);y.children.forEach(e=>{e.isLight||(e.visible=!1)}),zc.noFoam=!0,zc.noSpray=!0,zc.noSky=!0,zc.simEvery=1e9,Rt(),await l(150);let r=await g(600);return y.children.forEach((e,t)=>{e.visible=n[t]??e.visible}),Ce&&(Ce.last=q),zc.noFoam=!1,zc.noSpray=!1,zc.noSky=!1,zc.simEvery=1,K=t,r.s&&await d(`idle (${e}): ${r.s.fps} fps, shortest frames ${r.s.p10} ms: the display ${HS(r.s.p10)}; page ${r.s.page} ms`),r};try{await w(`at the start`),zr(),p(),K=!0,Ra(``),Vi(),Rt(),Cc.restart(10);let n=null,r=[Wa.slices,Wa.prefetched];for(let e=1;e<=9;e++){let t=[];for(let e=0;e<5;e++)t.push(await g(1e3));let i=MS(t.flatMap(e=>e.R));if(!i)continue;let a=t.reduce((e,t)=>e+t.nf,0),o=e=>t.reduce((t,n)=>t+n[e],0),s={renders:u(o(`renders`)/a),calls:Math.round(o(`calls`)/a),targets:u(o(`targets`)/a)},c=t.filter(e=>e.busy!=null),l=c.length?Math.round(c.reduce((e,t)=>e+t.busy,0)/c.length):null,f=[Wa.slices-r[0],Wa.prefetched-r[1]];r=[Wa.slices,Wa.prefetched];let p=FS(_());n??=p;let m=RS(),v=Kc(),y=h.info.memory;await d(`t ${e*5} s: ${i.fps} fps (each s ${t.map(e=>e.s?Math.round(e.s.fps):0).join(` `)}); frame p10/50/90/max ${i.p10}/${i.p50}/${i.p90}/${i.max} ms [${PS(i.bands)}]; GPU more than a frame behind ${l??`?`}% of frames; page ${i.page} ms: ${NS(i.st)}; fp.advance ${u(i.st[`physics: fp.advance`]??0)} ms for ${i.steps} steps; sea slices ${f[0]} on the main thread, ${f[1]} from the worker; ${s.renders} passes, ${s.calls} draws, ${s.targets} target sets a frame; CPU ref ${u(m)} ms, GPU ref ${u(v)} ms; GL ${y.geometries} geometries, ${y.textures} textures, ${h.info.programs?.length??`?`} programs; ${W.aground?`AGROUND, `:``}${u(W.ski.u*2.237)} mph; ${Cc.a.state()}; grown: ${IS(p,n)||`nothing`}`),C.series.push({t:e*5,s:i,cpu:m,gpu:v,busy:l,passes:s,sizes:p})}await d(`largest: ${LS(FS(_()))}${performance.memory?`; JS heap ${Math.round(performance.memory.usedJSHeapSize/1e6)} MB`:``}`),await w(`after the run`),Cc.enabled=!1,c=Cc.a.snap(),o=y.children.slice(),s=o.map(e=>e.visible);let i=1500,a=[[`route planner paused (it steers by its last plan)`,()=>{bc=0}],[`no bow spray`,()=>{zc.noSpray=!0}],[`no fine ripples (shading and their FFT)`,()=>e.uRipAmp.value.set(0,0,0)],[`the sea FFT held`,()=>t.set(`freeze`,`fft`)],[`sea simulation every 2nd frame (FFT, ripples, foam)`,()=>{zc.simEvery=2}],[`sea simulation every 4th frame`,()=>{zc.simEvery=4}],[`sky cube held`,()=>{zc.noSky=!0}],[`no land drawn`,()=>{cn&&(cn.visible=!1)}],[`no water drawn`,()=>{D.mesh.visible=!1}],[`no scene objects drawn (the sea simulation still runs)`,()=>o.forEach(e=>{e.isLight||(e.visible=!1)})],[`no scene objects, no sea simulation, no foam, no spray, sky held`,()=>{o.forEach(e=>{e.isLight||(e.visible=!1)}),e.uRipAmp.value.set(0,0,0),t.set(`freeze`,`fft,rip`),zc.noFoam=!0,zc.noSpray=!0,zc.noSky=!0}],[`render scale 0.5 (a test only)`,()=>{H.renderScale=.5,Va()}],...Sc.filter(e=>e!==c.quality).map(e=>[`water mesh ${e}`,()=>xc(e)]),[`no foam field (last: it rebuilds after)`,()=>{zc.noFoam=!0}]],f=async()=>{let e=m();return await l(e?900:400),g(i)},v=await f();for(let[e,t]of a){m(),t(),await l(/render scale|water mesh/.test(e)?900:400);let n=await g(i),r=await f();if(!n.s||!v.s||!r.s){await d(`${e}: too few frames`),v=r;continue}let a=(v.s.ms+r.s.ms)/2,o=n.s.ms-a,s=Math.abs(v.s.ms-r.s.ms),c=(v.s.page+r.s.page)/2,p=Math.abs(o)>=Math.max(2*s,3);await d(`${e}: ${n.s.fps} fps, ${n.s.ms} ms (as it is either side ${v.s.ms}, ${r.s.ms}): ${p?`${o<=0?`saves`:`adds`} ${u(Math.abs(o))} ms`:`not resolved (${u(o)} ± ${u(s)} ms)`}; page ${n.s.page} ms (as it is ${u(c)}, ${n.s.page<=c?`−`:`+`}${u(Math.abs(n.s.page-c))}): ${NS(n.s.st,3)}; frames on beats [${PS(n.s.bands)}]; GPU busy ${n.busy??`?`}%; ${n.passes.renders} passes a frame`),C.steps.push({name:e,ms:n.s.ms,base:a,err:s,resolved:p,page:n.s.page,pBase:c}),v=r}await l(m()?900:400),zc.finish=!0,await l(300);let b=await g(2e3);zc.finish=!1,b.s&&(C.split=b.s,await d(`stages to the end of their GPU work (gl.finish around each: read as a rank order, the waits slow the frame): ${b.s.ms} ms a frame, page ${b.s.page} ms: ${NS(b.s.st,10,.2)}`)),await w(`at the end`)}finally{m(),bc=c?.planBudget??a.plan,Cc.enabled=a.adapt,Cc.restart(30),H.autopilot=a.auto;try{Ar()}catch{}a.live||(K=!1,Vi()),zc.run=null,Gc&&(Gc.on=!1);let e=C.series,t=(e,t)=>e.reduce((e,n)=>e+t(n),0)/e.length;if(e.length>=4){let n=e.slice(0,2),r=e.slice(-2);await d(`over the run: ${u(t(n,e=>e.s.fps))} fps in the first 10 s, ${u(t(r,e=>e.s.fps))} in the last 10 s; page ${u(t(n,e=>e.s.page))} → ${u(t(r,e=>e.s.page))} ms; GPU busy ${u(t(n,e=>e.busy??0))} → ${u(t(r,e=>e.busy??0))}%; physics steps a frame ${u(t(n,e=>e.s.steps))} → ${u(t(r,e=>e.s.steps))}; CPU ref ${u(t(n,e=>e.cpu))} → ${u(t(r,e=>e.cpu))} ms; GPU ref ${u(t(n,e=>e.gpu))} → ${u(t(r,e=>e.gpu))} ms (a reference that rises: that chip slowed, from heat or power)`)}let n=C.steps.filter(e=>e.resolved&&e.ms<e.base).sort((e,t)=>e.ms-e.base-(t.ms-t.base)).slice(0,5).map(e=>`${e.name} ${u(e.base-e.ms)}`).join(`, `);await d(n?`biggest savings (ms a frame, resolved): ${n}`:`no step resolved a saving`),window.__probe=C,await d(`measure done: ☰ > Developer > Send to dev (or the debug bar: copy)`),$(`Done: ☰ > Developer > Send to dev`,6e3)}}window.__perfProbe=qc;let Jc=new Map;function Yc(e){if(mt.on&&!Oc&&Dc&&e-Dc<30)requestAnimationFrame(Yc);else{Dc=e;try{Xc(e)}catch(e){let t=String(e?.stack||e).slice(0,400),n=performance.now();n-(Jc.get(t)??-1e9)<5e3||(Jc.set(t,n),console.error(`frame failed (the sim carries on)`,e)),requestAnimationFrame(Yc)}}}function Xc(e){let n=performance.now();vc=0,zc.frameNo++,qo++,e-Zo>=500&&(es=Zo?qo*1e3/(e-Zo):0,qo=0,Zo=e),Pt&&=(mc=e,!1);{let e=h.getContext();if(Pc.busy=null,Ic.fences.length>=2){let t=Ic.fences.shift();Pc.busy=e.getSyncParameter(t,e.SYNC_STATUS)!==e.SIGNALED,e.deleteSync(t)}}Pc.late=n-e,gc&&(Uc(e-mc),Lc(e,e-mc));let r=mc,i=zt>0&&!K,a=i?1/60:Math.min(.05,(e-mc)/1e3);Cc.tick((e-mc)/1e3,_c),mc=e;let o=!1;if(i&&(G===`Free play`&&q<W.t-1e-6?q=Math.min(W.t,q+a):(K=!0,o=!0)),G===`Free play`){if(K){_n(),_r&&Vc(`route planner`,()=>_r.update(bc,{plan:Ii()}));{let e=W.ski,t=H.racers&&H.drafting&&hr?hr.setters.filter(e=>e.finishT==null).map(e=>({e:e.g.ski.e,n:e.g.ski.n,psi:e.g.ski.psi,u:e.g.ski.u})):[];W.draft=t.length?nv({e:e.e,n:e.n,psi:e.psi,u:e.u},t).saving:0}{let e=W.i;Vc(`physics: fp.advance`,()=>W.advance(a*H.playSpeed)),Pc.steps+=W.i-e}if(q=W.t,_r?.drive&&_r.arrived&&!vr){vr=!0;let e=_r.report();$(`Arrived: ${(e.vmg*2.23694).toFixed(1)} mph made good, ${(e.timeS/60).toFixed(1)} min, ${Math.round(e.meanW)} W average, ${(e.energyJ/1e3).toFixed(0)} kJ`)}}else _r&&!_r.drive&&Vc(`route planner`,()=>_r.update(bc,{plan:Ii()}));!K&&_r&&!hr&&W.states.length&&qe.length&&H.racers&&Vc(`pace-setters`,gr),q=Math.min(Math.max(q,0),W.t),_r?.arrived&&!pr&&K&&(pr=!0,Rs()),H.inset===`Run`&&_r&&K&&Vc(`run compare`,()=>{mr??=new Vv({makeGhost:()=>new wh(U,Xn(),Un(),W.paddlerName,`v2`),pilotOpts:{_0x697e75:0,_0xe8351a:.8}}),mr.tick(W,_r.goal,_r.table)}),!H.racers&&hr&&(hr=null),_r&&K&&W.states.length&&qe.length&&H.racers&&Vc(`pace-setters`,()=>{hr&&hr.setters[0].g.i*hr.setters[0].g.h>W.i*W.h+.5&&(hr=null),gr();let e=W.ski;hr.sync(W.t,40,bc,_r.table,{e:e.e,n:e.n,psi:e.psi,u:e.u,phase:W.phase,power:W.power},{bump:e=>W.bump(e),clash:e=>W.clash(e)},yc);for(let e of hr.log.drain())if(e.user&&H.racers){let t=e.a===`You`?e.b:e.a;$(e.kind===`clash`?`Paddle clash with ${t}`:e.kind===`contact`?`Contact with ${t}${e.userFault?` (you cut in)`:``}`:`Close call with ${t}: ${e.gap.toFixed(1)} m${e.userFault?` (you cut in)`:``}`)}})}else K&&(q+=a*H.playSpeed,q>=Ut()&&(q=Ut(),K=!1,Vi()));let s=Oc?performance.now():0,c=Vc(`renderScene total`,()=>go(a));if(i&&(o&&(K=!1),zt--,Nt=performance.now(),Bt&&Ga(`-f${String(++Vt).padStart(2,`0`)}`),zt||(Vi(),$(`Stepped to ${q.toFixed(3)} s`,1500))),jc&&jc.frames++,Oc&&(t.get(`benchsync`)!==`0`&&h.getContext().finish(),Ac(e-r,performance.now()-s)),!gc){gc=!0,$e();try{localStorage.removeItem(`surfski.boot`)}catch{}window.__crumb?.(`first frame drawn`),Promise.race([ke,new Promise(e=>setTimeout(e,6e3))]).then(()=>{window.__crumb?.(`your paddler ready`),Rt(),LC(`loading`).classList.add(`done`),setTimeout(()=>LC(`loading`)?.remove(),700)}),Ze?.then(()=>window.__crumb?.(`competitors ready`)),t.get(`perfprobe`)===`1`&&setTimeout(qc,6e3)}H.inset!==`Off`&&H.inset!==`Conditions`&&H.inset!==`Run`&&(H.inset===`Map`?Vc(`2D inset map`,()=>pc(c)):H.inset===`Local effects`?Vc(`2D inset local effects`,()=>{Xt.sig=null,Nn(c)}):H.inset===`Waves`?Vc(`2D inset waves`,()=>(Xt.sig=null,Jt.draw({ski:c,field:bt.field,time:q,scn:U,frames:bt.frames,dt:bt.dt,t0:Ht(),end:Ut()}))):Vc(`2D inset surf`,()=>(Xt.sig=null,Yt.draw({ski:W?.ski,pose:c,field:bt.field,time:q})))),Fi.on||(zi.min=Ht(),zi.max=Math.max(Ut(),Ht()+.1),zi.value=q,ps(`time`,`text`,`${(q-Ht()).toFixed(1)} / ${(Ut()-Ht()).toFixed(1)} s${G===`Free play`?K?` · LIVE`:` · paused`:` · rec`}`));let l=Wt().prof,u=Math.max(0,c.power),d=c.braceLevel??0,f=20+l._0xbd9c94/l.maxW*80,p=!Fi.on;if(d>0&&u<5){let e=Math.min(Math.max(c.mix?.[4]??d,0),3)/3*20;ps(`pfill`,`left`,`${20-e}%`),ps(`pfill`,`width`,`${e.toFixed(1)}%`),ps(`pfill`,`background`,Zn[d-1]),p&&ps(`ptxt`,`text`,`power −${d} · ${Qn[d-1]} brace`)}else if(ps(`pfill`,`left`,`20%`),ps(`pfill`,`width`,`${(Math.min(u/l.maxW,1)*80).toFixed(1)}%`),ps(`pfill`,`background`,Ld(zd(u,l._0xbd9c94,dh))),p){let e=gh(u,l._0xbd9c94,c.u);ps(`ptxt`,`text`,u<=3?`power 0 · ${e}`:`power ${fh(u,l._0xbd9c94)} · ${e===`low power`?``:`${e} · `}${u.toFixed(0)} W${W.draft>=.005?` · draft ${Math.round(W.draft*100)}%`:``}`)}let m=`20|${f}`;if(ss!==m){ss=m;let e=document.getElementById(`pfill`);e.parentNode.querySelector(`.lvtick`)||dh.slice(1).forEach(t=>{let n=document.createElement(`i`);n.className=`tick lvtick`,n.dataset.f=t,e.parentNode.appendChild(n)}),e.parentNode.querySelectorAll(`.lvtick`).forEach(e=>{e.style.left=`${20+Math.min(+e.dataset.f*l._0xbd9c94/l.maxW,1)*80}%`}),document.getElementById(`pbase`).style.left=`${f}%`,document.getElementById(`psprint`).style.left=`${f}%`,document.getElementById(`pbrace`).style.width=`20%`,document.getElementById(`pzero`).style.left=`20%`,document.getElementById(`plab`).innerHTML=`<span style="left:10%">brace</span><span style="left:20%">0</span><span style="left:${(20+f)/2}%">1 2 3</span><span style="left:${f}%">tempo 4</span><span style="left:${(f+100)/2}%">5 6 7</span>`}if(p){let e=Math.min(Math.max(c.wPrime/l.wPrime,0),1);ps(`rfill`,`width`,`${(e*100).toFixed(1)}%`),ps(`rfill`,`background`,e>.5?`#4cd18a`:e>.2?`#ffc247`:`#ff6a3d`),ps(`rtxt`,`text`,`reserve ${(e*100).toFixed(0)}%`)}if(ji.s.preset!==`Off`||Fi.on||Fi.controls!==`buttons`){let e=U.raceCourse,t=e&&hn?e.seq?.[hn.i+1]?.point??null:null,n=e&&hn?{doneM:e.progress(hn,c.e,c.n),remainingM:e.remaining(hn,c.e,c.n)}:{},r=Mi.update({fp:G===`Free play`?W:null,s:c,field:bt.field,t:q,nav:U.goal?{goal:U.goal,after:t,...n}:null,prof:l,elapsed:q-Ht(),light:Fi.on&&ji.s.preset===`Off`});ji.s.preset!==`Off`&&ji.update(r,{zeroPct:20,maxW:l.maxW}),Fi.update(r,a)}yo+=a,yo>.1&&(yo=0,Vc(`HUD text`,()=>ac(c))),hc+=a,hc>.5&&(Tt!=null||Et!=null)&&(hc=0,Hi()),Pc.work=performance.now()-n,Hc(),_c=(performance.now()-n-vc)/1e3,!Oc&&!jc&&!zc.run&&t.get(`idle`)!==`0`&&!K&&ro.size===0&&!Ft&&performance.now()-Nt>600&&++Lt>40&&gc?(Mt=!0,It++):requestAnimationFrame(Yc)}t.get(`scenario`)&&(H.scenario=So(t.get(`scenario`))?.name??H.scenario);for(let e of[`view`,`inset`,`quality`,`horizon`])t.get(e)&&(H[e]=t.get(e));ww[H.quality]||(H.quality=`Standard`),t.get(`gelcoat`)!=null&&(H.gelcoat=Number(t.get(`gelcoat`))),t.get(`decals`)===`0`&&(H.decals=!1);{let e={"Blinding sun":`Bright midday`},n=t.get(`tod`),r=e[t.get(`weather`)]??t.get(`weather`),i=e[t.get(`wx`)]??t.get(`wx`);n&&n in Vr&&(H.timeOfDay=n),r&&r in Hr&&(H.weather=r),i&&Ur[i]?(H.weatherPreset=i,H.timeOfDay=Ur[i][0],H.weather=Ur[i][1]):(n||r)&&(H.weatherPreset=`Custom`)}{let e=null;try{e=localStorage.getItem(`surfski.playback`)}catch{}t.get(`playback`)!=null&&(e=t.get(`playback`)),H.playback=e===`1`}{let e=null;try{e=JSON.parse(localStorage.getItem(ft)??`null`)}catch{}let n={routing:Object.keys(fr),guideStyle:[`Whole route`,`Next wave`],guideWeight:[`Normal`,`Light`,`Faint`]};for(let t of pt)e&&t in e&&(n[t]?n[t].includes(e[t]):typeof e[t]==`boolean`)&&(H[t]=e[t]);t.get(`guide`)!=null&&(H.guide=t.get(`guide`)===`1`),t.get(`coaching`)!=null&&(H.coaching=t.get(`coaching`)===`1`),t.get(`alts`)!=null&&(H.guideAlts=t.get(`alts`)!==`0`),t.get(`guidestyle`)!=null&&(H.guideStyle=t.get(`guidestyle`)===`wave`?`Next wave`:`Whole route`),t.get(`guideweight`)!=null&&(H.guideWeight={light:`Light`,faint:`Faint`}[t.get(`guideweight`)]??`Normal`);let r={cruise:`Cruise`,sporty:`Sporty`,race:`Race`,flow:`Surfing flow`,easy:`Cruise`,balanced:`Sporty`,fast:`Race`}[t.get(`routing`)??t.get(`autoroute`)];r&&(H.routing=r)}t.get(`pixfade`)!=null&&(D.uniforms.uPixFade.value=Number(t.get(`pixfade`))),t.get(`cam`)&&(H.view=`Free cam`),t.get(`facetint`)===`1`&&(H.faceTint=!0,D.uniforms.uFaceTint.value=1),H.view===`Buddy cam`&&(H.view=`Drone`),Tw[H.view]||(H.view=`Boyan cam`);let Zc=matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>0&&innerWidth<1100;if(d||f.tier===`phone`||Zc&&f.tier===`desktop`?(t.get(`quality`)||(H.quality=`Draft`),H.renderScale=1,H.lite=!0):f.tier===`tablet`&&(t.get(`quality`)||(H.quality=p.quality),H.renderScale=1,H.lite=p.lite),t.get(`lite`)!=null&&(H.lite=t.get(`lite`)!==`0`),t.get(`scale`))H.renderScale=Number(t.get(`scale`));else if(Ti&&!Zc&&!d){let e=Number(Ci.get());e>1&&(H.renderScale=Math.min(e,wi()))}t.get(`steady`)||(H.camSteady=Tw[H.view].steady??0);for(let e of[`wiggle`,`ripples`,`foam`,`fov`,`eyeHeight`,`glint`,`mapZoom`,`droneSide`,`droneBack`,`droneHeight`,`droneYaw`,`dronePitch`])t.get(e)&&(H[e]=Number(t.get(e)));t.get(`steady`)&&(H.camSteady=Number(t.get(`steady`))),t.get(`racers`)===`0`&&(H.racers=!1),t.get(`drafting`)===`0`&&(H.drafting=!1);for(let[e,n]of[[`buddySide`,`droneSide`],[`buddyBack`,`droneBack`],[`buddyEye`,`droneHeight`]])t.get(e)&&(H[n]=Number(t.get(e)));for(let e of[`sunAz`,`sunEl`,`crestSharpen`,`teal`,`turbid`,`cloud`])t.get(e)&&(gt[e]=Number(t.get(e)));Qo[t.get(`haze`)]&&(gt.haze=t.get(`haze`));for(let e of[`hazeAmt`,`hazeType`,`cloudType`,`cloudVar`])t.get(e)&&(gt[e]=Number(t.get(e)));(H.inset===`Plan`||H.inset===`Waves`)&&(H.inset=`Local effects`),!t.get(`inset`)&&innerWidth<=760&&(H.inset=He?`Off`:`Conditions`),ds[t.get(`paddler`)]&&(H.paddler=t.get(`paddler`)),t.get(`tune`)&&Object.assign(H.tune,Xm(t.get(`tune`))),t.get(`fov`)||(H.fov=Tw[H.view].fov),b.fov=H.fov,b.updateProjectionMatrix(),D.uniforms.uMicro.value=H.ripples,D.uniforms.uFoam.value=H.foam,y.fog.density=0,D.uniforms.uFogDensity.value=0;let Qc=t.get(`fog`)===`0`;if(Qc&&(H.fogScale=0),H.racers&&G===`Free play`&&qe.forEach((e,t)=>et(t,e.color)),await window.__crumb?.(`building the first scenario`),await ar(Lo(H.scenario)),await window.__crumb?.(`scenario built, running the first load`),ur(H.scenario),n)try{ca(n,{fromConfig:!0})}catch(e){console.warn(`?config= not applied:`,e.message)}await window.__crumb?.(`first load done`),t.get(`autostart`)===`1`&&Ki();let $c={renderScale:H.renderScale,quality:H.quality,lite:H.lite,trailR:H.trailR};if(t.get(`t`)){W.advance(Number(t.get(`t`)));for(let e of t.get(`seq`)??``)e===`d`?(W.setDown(!0),W.advance(.05),W.setDown(!1),W.advance(.2)):e===`h`?(W.setDown(!0),W.advance(2.5)):e===`r`?(W.setSteer(1),W.advance(1.5)):e===`l`?(W.setSteer(-1),W.advance(1.5)):e===`w`?W.advance(1):e===`q`?W.advance(.4):e===`I`?W.strafe(100,0):e===`K`?W.strafe(-100,0):e===`J`?W.strafe(0,-100):e===`L`?W.strafe(0,100):e===`U`?W.turn(-30):e===`O`&&W.turn(30);q=W.t,K=!1,Ra(``)}(t.get(`live`)===`1`||Oc)&&(K=!0,Ra(``),Vi()),D.setGrid(Cw(H.quality,H.crit)),va(H.lite),ai().forEach(e=>e.updateDisplay()),Ba(),za();for(let e of(t.get(`collapse`)??``).split(`,`))(e===`hud`||e===`inset`)&&(Zt.classList.add(`collapsed`),Va());if(t.get(`hud`)===`0`)for(let e of[`#inset`,`#timeline`,`#sidePanel`,`#toolbar`,`#touch`,`#banner`])document.querySelector(e)?.style.setProperty(`display`,`none`);({}).__scn={get ui(){return H},get renderer(){return h},get atmos(){return F},get foam(){return Ce},get free(){return Y},get objects(){return ce},get skyCube(){return P},get pace(){return hr},get skiMesh(){return R},get water(){return D},get camera(){return b},get scn(){return U},get run(){return bt},get fp(){return W},get pace(){return hr},ui:H,set t(e){q=e},get t(){return q}},t.get(`t`)==null&&t.get(`hud`)!==`0`&&t.get(`intro`)!==`0`&&t.get(`live`)!==`1`&&!ga.seen()&&ga.show(!0),await window.__crumb?.(`starting to draw (the first frame compiles the shaders)`),requestAnimationFrame(Yc)}Ow().catch(e=>{e instanceof nw?(console.warn(e.message),sw(e)):(window.__showError?.(`startup failed: `+String(e.message||e)+` | `+String(e.stack||``).slice(0,1500)),document.getElementById(`loading`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`<pre style="color:#f88;padding:1em;position:fixed;top:0">${e.stack||e}</pre>`),console.error(e))});