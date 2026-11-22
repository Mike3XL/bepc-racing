/*! Surfski downwind simulator. Copyright (c) 2026 Michael Liddell. All rights reserved. Not licensed for copying, modification or reuse: see LICENSE.txt. Bundled open-source libraries: THIRD-PARTY-NOTICES.txt. */
const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./wave-solve-worker-Bs7rdeG8.js","./wave-solve-Dztcr917.js","./fetch-C7v1AziQ.js","./three.core-DC1fbwns.js","./skinned-paddler-DTWuh6oP.js","./skimesh-DgIb1JTV.js","./waves-C73EEXvP.js","./GLTFLoader-BJhq7Gpd.js","./devmodels-D8BCf3h5.js","./settings-editor-9mFpOptI.js","./settings-tXKkGKtb.js"])))=>i.map(i=>d[i]);
import"./modulepreload-polyfill-P2Xu9kJm.js";import{$ as e,$n as t,A as n,At as r,B as i,Bn as a,C as o,Cn as s,Cr as c,Ct as l,D as u,Dn as d,Dr as f,Dt as p,E as m,En as h,Er as g,Et as _,F as v,Fn as y,G as b,Gn as x,Gt as S,I as C,In as w,Jn as T,K as E,Kt as D,L as O,Ln as k,Mt as A,N as j,Nt as M,O as N,On as P,Or as F,P as I,Pn as ee,Qn as L,R as te,Rt as R,S as ne,Sn as re,Sr as z,T as ie,Tn as ae,Tr as oe,Tt as se,U as ce,V as le,Vt as ue,W as de,Yn as fe,_ as pe,_r as me,_t as he,ar as ge,b as _e,br as ve,bt as ye,c as be,cr as xe,ct as Se,dr as Ce,er as we,f as Te,g as Ee,gr as De,gt as Oe,h as ke,hr as Ae,ht as B,j as je,jt as Me,k as Ne,kn as V,kt as H,lr as U,lt as Pe,m as Fe,mr as Ie,mt as Le,o as Re,or as ze,ot as Be,p as Ve,pr as He,pt as Ue,qn as We,r as Ge,rr as Ke,s as qe,sr as Je,st as Ye,tr as Xe,tt as Ze,u as Qe,ur as $e,ut as et,v as tt,vr as nt,vt as rt,w as it,wn as at,wr as ot,wt as st,x as ct,xr as lt,xt as ut,y as dt,yr as ft,yt as pt,z as mt}from"./three.core-DC1fbwns.js";import{$ as ht,A as gt,C as _t,D as vt,E as yt,F as bt,G as xt,H as St,K as Ct,M as wt,N as Tt,O as Et,P as Dt,S as Ot,T as kt,U as At,V as jt,W as Mt,X as Nt,Y as Pt,_ as W,a as Ft,b as It,c as Lt,d as G,et as K,g as Rt,h as q,j as J,k as Y,l as zt,m as Bt,n as Vt,r as Ht,t as Ut,u as Wt,v as Gt,w as Kt,x as qt,y as Jt}from"./waves-C73EEXvP.js";import{_ as Yt,a as Xt,d as Zt,f as Qt,g as $t,h as en,i as tn,r as nn,t as rn}from"./seas-DPdvaLRo.js";import{a as an,c as on,i as sn,n as cn,o as ln,r as un,s as dn}from"./scenario-info-Bll8ePcw.js";import{a as fn,c as pn,i as mn,n as hn,o as gn,r as _n,t as vn}from"./race-course-9iTwORJZ.js";import{$ as yn,A as bn,B as xn,C as Sn,D as Cn,E as wn,F as Tn,G as En,H as Dn,I as On,J as kn,K as An,L as jn,M as Mn,N as Nn,O as Pn,P as Fn,Q as In,R as Ln,S as Rn,T as zn,U as Bn,V as Vn,W as Hn,X as Un,Y as Wn,Z as Gn,a as Kn,at as qn,c as Jn,d as Yn,et as Xn,f as Zn,it as Qn,k as $n,m as er,nt as tr,ot as nr,p as rr,q as ir,r as ar,rt as or,tt as sr,u as cr,x as lr,z as ur}from"./skimesh-DgIb1JTV.js";import{r as dr,t as fr}from"./GLTFLoader-BJhq7Gpd.js";import{a as pr,l as mr,r as hr,s as gr,t as _r}from"./wave-solve-Dztcr917.js";import{a as vr,n as yr,r as br,t as xr}from"./fetch-C7v1AziQ.js";import{a as Sr,n as Cr,r as wr}from"./audio-D0We7AmF.js";import{a as Tr,c as Er,n as Dr}from"./settings-tXKkGKtb.js";function Or(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function kr(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Ar={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},X={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new B},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new B}},envmap:{envMap:{value:null},envMapRotation:{value:new B},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new B}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new B}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new B},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new B},normalScale:{value:new U(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new B},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new B}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new B}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new B}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $e},probesMax:{value:new $e},probesResolution:{value:new $e}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0},uvTransform:{value:new B}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new U(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new B},alphaMap:{value:null},alphaMapTransform:{value:new B},alphaTest:{value:0}}},jr={basic:{uniforms:oe([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.fog]),vertexShader:Ar.meshbasic_vert,fragmentShader:Ar.meshbasic_frag},lambert:{uniforms:oe([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:Ar.meshlambert_vert,fragmentShader:Ar.meshlambert_frag},phong:{uniforms:oe([X.common,X.specularmap,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.fog,X.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ar.meshphong_vert,fragmentShader:Ar.meshphong_frag},standard:{uniforms:oe([X.common,X.envmap,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.roughnessmap,X.metalnessmap,X.fog,X.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ar.meshphysical_vert,fragmentShader:Ar.meshphysical_frag},toon:{uniforms:oe([X.common,X.aomap,X.lightmap,X.emissivemap,X.bumpmap,X.normalmap,X.displacementmap,X.gradientmap,X.fog,X.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ar.meshtoon_vert,fragmentShader:Ar.meshtoon_frag},matcap:{uniforms:oe([X.common,X.bumpmap,X.normalmap,X.displacementmap,X.fog,{matcap:{value:null}}]),vertexShader:Ar.meshmatcap_vert,fragmentShader:Ar.meshmatcap_frag},points:{uniforms:oe([X.points,X.fog]),vertexShader:Ar.points_vert,fragmentShader:Ar.points_frag},dashed:{uniforms:oe([X.common,X.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ar.linedashed_vert,fragmentShader:Ar.linedashed_frag},depth:{uniforms:oe([X.common,X.displacementmap]),vertexShader:Ar.depth_vert,fragmentShader:Ar.depth_frag},normal:{uniforms:oe([X.common,X.bumpmap,X.normalmap,X.displacementmap,{opacity:{value:1}}]),vertexShader:Ar.meshnormal_vert,fragmentShader:Ar.meshnormal_frag},sprite:{uniforms:oe([X.sprite,X.fog]),vertexShader:Ar.sprite_vert,fragmentShader:Ar.sprite_frag},background:{uniforms:{uvTransform:{value:new B},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ar.background_vert,fragmentShader:Ar.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new B}},vertexShader:Ar.backgroundCube_vert,fragmentShader:Ar.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ar.cube_vert,fragmentShader:Ar.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ar.equirect_vert,fragmentShader:Ar.equirect_frag},distance:{uniforms:oe([X.common,X.displacementmap,{referencePosition:{value:new $e},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ar.distance_vert,fragmentShader:Ar.distance_frag},shadow:{uniforms:oe([X.lights,X.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ar.shadow_vert,fragmentShader:Ar.shadow_frag}};jr.physical={uniforms:oe([jr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new B},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new B},clearcoatNormalScale:{value:new U(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new B},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new B},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new B},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new B},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new B},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new B},transmissionSamplerSize:{value:new U},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new B},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new B},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new B},anisotropyVector:{value:new U},anisotropyMap:{value:null},anisotropyMapTransform:{value:new B}}]),vertexShader:Ar.meshphysical_vert,fragmentShader:Ar.meshphysical_frag};var Mr={r:0,b:0,g:0},Nr=new Oe,Pr=new B;Pr.set(-1,0,0,0,1,0,0,0,1);function Fr(e,t,n,r,i,a){let o=new Ve(0),s=i===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(o,s):i&&i.isColor&&(_(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&(i.isCubeTexture||i.mapping===306)?(u===void 0&&(u=new he(new Re(1,1,1),new k({name:`BackgroundCubeMaterial`,uniforms:nt(jr.backgroundCube.uniforms),vertexShader:jr.backgroundCube.vertexShader,fragmentShader:jr.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Nr.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Pr),u.material.toneMapped=Fe.getTransfer(i.colorSpace)!==y,(d!==i||f!==i.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new he(new M(2,2),new k({name:`BackgroundMaterial`,uniforms:nt(jr.background.uniforms),vertexShader:jr.background.vertexShader,fragmentShader:jr.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=Fe.getTransfer(i.colorSpace)!==y,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(Mr,c(e)),n.buffers.color.setClear(Mr.r,Mr.g,Mr.b,r,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,_(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,_(o,s)},render:h,addToRenderList:g,dispose:v}}function Ir(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Lr(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Rr(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(f(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,p=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&p===!1&&f(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function zr(e){let t=this,n=null,r=0,i=!1,a=!1,o=new A,s=new B,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Br=4,Vr=6,Hr=20,Ur=256,Wr=new r,Gr=new Ve,Kr=null,qr=0,Jr=0,Yr=!1,Xr=new $e,Zr=new $e,Qr=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Xr}=i;Kr=this._renderer.getRenderTarget(),qr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),Yr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ai(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ii(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kr,qr,Jr),this._renderer.xr.enabled=Yr,e.scissorTest=!1,ti(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kr=this._renderer.getRenderTarget(),qr=this._renderer.getActiveCubeFace(),Jr=this._renderer.getActiveMipmapLevel(),Yr=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Be,minFilter:Be,generateMipmaps:!1,type:mt,format:S,colorSpace:Pe,depthBuffer:!1},r=ei(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ei(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=$r(r)),this._blurMaterial=ri(r,e,t),this._ggxMaterial=ni(r,e,t)}return r}_compileMaterial(e){let t=new he(new be,e);this._renderer.compile(t,Wr)}_sceneToCubeUV(e,t,n,r,i){let a=new Me(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Gr),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new he(new Re,new rt({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Gr),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;ti(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ai()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ii());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;ti(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Wr)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Br?n-d+Br:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,ti(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Wr),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,ti(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Wr)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];ti(t,3*l*(r>this._lodMax-Br?r-this._lodMax+Br:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,Wr)}};function $r(e){let t=[],n=[],r=e,i=e-Br+1+Vr;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Zr.set(1,r,n):e===1?Zr.set(-n,1,-r):e===2?Zr.set(-n,r,1):e===3?Zr.set(-1,r,-n):e===4?Zr.set(-n,-1,r):Zr.set(n,r,-1),Zr.toArray(l,(e*6+t)*3)}}let u=new be;u.setAttribute(`position`,new qe(c,3)),u.setAttribute(`outputDirection`,new qe(l,3)),n.push(new he(u,null)),r>Br&&r--}return{lodMeshes:n,sizeLods:t}}function ei(e,t,n){let r=new De(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ti(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function ni(e,t,n){return new k({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Ur,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oi(),fragmentShader:`
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
`,blending:0,depthTest:!1,depthWrite:!1})}function ri(e,t,n){return new k({name:`SphericalGaussianBlur`,defines:{SAMPLES:Hr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oi(),fragmentShader:`
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
`,blending:0,depthTest:!1,depthWrite:!1})}function ii(){return new k({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:oi(),fragmentShader:`
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
`,blending:0,depthTest:!1,depthWrite:!1})}function ai(){return new k({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oi(),fragmentShader:`
precision mediump float;
precision mediump int;
uniform float flipEnvMap;
varying vec3 vOutputDirection;
uniform samplerCube envMap;
void main() {
gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );
}
`,blending:0,depthTest:!1,depthWrite:!1})}function oi(){return`
precision mediump float;
precision mediump int;
attribute vec3 outputDirection;
varying vec3 vOutputDirection;
void main() {
vOutputDirection = outputDirection;
gl_Position = vec4( position, 1.0 );
}
`}var si=class extends De{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new tt(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`
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
`},r=new Re(5,5,5),i=new k({name:`CubemapFromEquirect`,uniforms:nt(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new he(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Be),new Ee(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ci(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new si(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Qr(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Qr(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function li(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&F(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ui(e,n,r,i){let a={},o=new WeakMap;function s(e){let t=e.target;t.index!==null&&n.remove(t.index);for(let e in t.attributes)n.remove(t.attributes[e]);t.removeEventListener(`dispose`,s),delete a[t.id];let c=o.get(t);c&&(n.remove(c),o.delete(t)),i.releaseStatesOfGeometry(t),t.isInstancedBufferGeometry===!0&&delete t._maxInstanceCount,r.memory.geometries--}function c(e,t){return a[t.id]===!0||(t.addEventListener(`dispose`,s),a[t.id]=!0,r.memory.geometries++),t}function l(t){let r=t.attributes;for(let t in r)n.update(r[t],e.ARRAY_BUFFER)}function u(e){let r=[],i=e.index,a=e.attributes.position,s=0;if(a===void 0)return;if(i!==null){let e=i.array;s=i.version;for(let t=0,n=e.length;t<n;t+=3){let n=e[t+0],i=e[t+1],a=e[t+2];r.push(n,i,i,a,a,n)}}else{let e=a.array;s=a.version;for(let t=0,n=e.length/3-1;t<n;t+=3){let e=t+0,n=t+1,i=t+2;r.push(e,n,n,i,i,e)}}let c=new(a.count>=65535?t:L)(r,1);c.version=s;let l=o.get(e);l&&n.remove(l),o.set(e,c)}function d(e){let t=o.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&u(e)}else u(e);return o.get(e)}return{get:c,update:l,getWireframeAttribute:d}}function di(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function fi(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:lt(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function pi(e,t,n){let r=new WeakMap,i=new Ce;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new ct(h,p,m,u);g.type=I,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new U(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function mi(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var hi={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function gi(e,t,n,i,a,o){let s=new De(t,n,{type:e,depthBuffer:a,stencilBuffer:o,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,l=null,u=new be;u.setAttribute(`position`,new j([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new j([0,2,0,0,2,0],2));let d=new at({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
}`,depthTest:!1,depthWrite:!1}),f=new he(u,d),p=new r(-1,1,1,-1,0,1),m=null,h=null,g=!1,_,v=null,y=[],b=!1;this.setSize=function(e,t){s.setSize(e,t),c!==null&&c.setSize(e,t),l!==null&&l.setSize(e,t);for(let n=0;n<y.length;n++){let r=y[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){y=e,b=y.length>0&&y[0].isRenderPass===!0;let t=s.width,n=s.height;y.length>0&&c===null&&(c=new De(t,n,{type:mt,depthBuffer:!1,stencilBuffer:!1}),l=new De(t,n,{type:mt,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<y.length;e++){let r=y[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(g||e.toneMapping===0&&y.length===0)return!1;if(v=t,t!==null){let e=t.width,n=t.height;(s.width!==e||s.height!==n)&&this.setSize(e,n)}return b===!1&&e.setRenderTarget(s),_=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return b},this.end=function(e,t){e.toneMapping=_,g=!0;let n=s,r=c;for(let i=0;i<y.length;i++){let a=y[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===c?l:c))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Fe.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=hi[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(v),e.render(f,p),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){s.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),u.dispose(),d.dispose()}}var _i=new fe,vi=new m(1,1),yi=new ct,bi=new _e,xi=new tt,Si=[],Ci=[],wi=new Float32Array(16),Ti=new Float32Array(9),Ei=new Float32Array(4);function Di(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Si[i];if(a===void 0&&(a=new Float32Array(i),Si[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Oi(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ki(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ai(e,t){let n=Ci[t];n===void 0&&(n=new Int32Array(t),Ci[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function ji(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Mi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oi(n,t))return;e.uniform2fv(this.addr,t),ki(n,t)}}function Ni(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Oi(n,t))return;e.uniform3fv(this.addr,t),ki(n,t)}}function Pi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oi(n,t))return;e.uniform4fv(this.addr,t),ki(n,t)}}function Fi(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Oi(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ki(n,t)}else{if(Oi(n,r))return;Ei.set(r),e.uniformMatrix2fv(this.addr,!1,Ei),ki(n,r)}}function Ii(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Oi(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ki(n,t)}else{if(Oi(n,r))return;Ti.set(r),e.uniformMatrix3fv(this.addr,!1,Ti),ki(n,r)}}function Li(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Oi(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ki(n,t)}else{if(Oi(n,r))return;wi.set(r),e.uniformMatrix4fv(this.addr,!1,wi),ki(n,r)}}function Ri(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function zi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oi(n,t))return;e.uniform2iv(this.addr,t),ki(n,t)}}function Bi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Oi(n,t))return;e.uniform3iv(this.addr,t),ki(n,t)}}function Vi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oi(n,t))return;e.uniform4iv(this.addr,t),ki(n,t)}}function Hi(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ui(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Oi(n,t))return;e.uniform2uiv(this.addr,t),ki(n,t)}}function Wi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Oi(n,t))return;e.uniform3uiv(this.addr,t),ki(n,t)}}function Gi(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Oi(n,t))return;e.uniform4uiv(this.addr,t),ki(n,t)}}function Ki(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(vi.compareFunction=n.isReversedDepthBuffer()?518:515,a=vi):a=_i,n.setTexture2D(t||a,i)}function qi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||bi,i)}function Ji(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||xi,i)}function Yi(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||yi,i)}function Xi(e){switch(e){case 5126:return ji;case 35664:return Mi;case 35665:return Ni;case 35666:return Pi;case 35674:return Fi;case 35675:return Ii;case 35676:return Li;case 5124:case 35670:return Ri;case 35667:case 35671:return zi;case 35668:case 35672:return Bi;case 35669:case 35673:return Vi;case 5125:return Hi;case 36294:return Ui;case 36295:return Wi;case 36296:return Gi;case 35678:case 36198:case 36298:case 36306:case 35682:return Ki;case 35679:case 36299:case 36307:return qi;case 35680:case 36300:case 36308:case 36293:return Ji;case 36289:case 36303:case 36311:case 36292:return Yi}}function Zi(e,t){e.uniform1fv(this.addr,t)}function Qi(e,t){let n=Di(t,this.size,2);e.uniform2fv(this.addr,n)}function $i(e,t){let n=Di(t,this.size,3);e.uniform3fv(this.addr,n)}function ea(e,t){let n=Di(t,this.size,4);e.uniform4fv(this.addr,n)}function ta(e,t){let n=Di(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function na(e,t){let n=Di(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ra(e,t){let n=Di(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ia(e,t){e.uniform1iv(this.addr,t)}function aa(e,t){e.uniform2iv(this.addr,t)}function oa(e,t){e.uniform3iv(this.addr,t)}function sa(e,t){e.uniform4iv(this.addr,t)}function ca(e,t){e.uniform1uiv(this.addr,t)}function la(e,t){e.uniform2uiv(this.addr,t)}function ua(e,t){e.uniform3uiv(this.addr,t)}function da(e,t){e.uniform4uiv(this.addr,t)}function fa(e,t,n){let r=this.cache,i=t.length,a=Ai(n,i);Oi(r,a)||(e.uniform1iv(this.addr,a),ki(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?vi:_i;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function pa(e,t,n){let r=this.cache,i=t.length,a=Ai(n,i);Oi(r,a)||(e.uniform1iv(this.addr,a),ki(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||bi,a[e])}function ma(e,t,n){let r=this.cache,i=t.length,a=Ai(n,i);Oi(r,a)||(e.uniform1iv(this.addr,a),ki(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||xi,a[e])}function ha(e,t,n){let r=this.cache,i=t.length,a=Ai(n,i);Oi(r,a)||(e.uniform1iv(this.addr,a),ki(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||yi,a[e])}function ga(e){switch(e){case 5126:return Zi;case 35664:return Qi;case 35665:return $i;case 35666:return ea;case 35674:return ta;case 35675:return na;case 35676:return ra;case 5124:case 35670:return ia;case 35667:case 35671:return aa;case 35668:case 35672:return oa;case 35669:case 35673:return sa;case 5125:return ca;case 36294:return la;case 36295:return ua;case 36296:return da;case 35678:case 36198:case 36298:case 36306:case 35682:return fa;case 35679:case 36299:case 36307:return pa;case 35680:case 36300:case 36308:case 36293:return ma;case 36289:case 36303:case 36311:case 36292:return ha}}var _a=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Xi(t.type)}},va=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ga(t.type)}},ya=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ba=/(\w+)(\])?(\[|\.)?/g;function xa(e,t){e.seq.push(t),e.map[t.id]=t}function Sa(e,t,n){let r=e.name,i=r.length;for(ba.lastIndex=0;;){let a=ba.exec(r),o=ba.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){xa(n,l===void 0?new _a(s,e,t):new va(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ya(s),xa(n,e)),n=e}}}var Ca=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Sa(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function wa(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ta=37297,Ea=0;function Da(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Oa=new B;function ka(e){Fe._getMatrix(Oa,Fe.workingColorSpace,e);let t=`mat3( ${Oa.elements.map(e=>e.toFixed(4))} )`;switch(Fe.getTransfer(e)){case et:return[t,`LinearTransferOETF`];case y:return[t,`sRGBTransferOETF`];default:return f(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Aa(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Da(e.getShaderSource(t),r)}return i}function ja(e,t){let n=ka(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Ma={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Na(e,t){let n=Ma[t];return n===void 0?(f(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Pa=new $e;function Fa(){return Fe.getLuminanceCoefficients(Pa),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Pa.x.toFixed(4)}, ${Pa.y.toFixed(4)}, ${Pa.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Ia(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(za).join(`
`)}function La(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Ra(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function za(e){return e!==``}function Ba(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Va(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ha=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ua(e){return e.replace(Ha,Ga)}var Wa=new Map;function Ga(e,t){let n=Ar[t];if(n===void 0){let e=Wa.get(t);if(e!==void 0)n=Ar[e],f(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Ua(n)}var Ka=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function qa(e){return e.replace(Ka,Ja)}function Ja(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Ya(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Xa={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Za(e){return Xa[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Qa={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function $a(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Qa[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var eo={302:`ENVMAP_MODE_REFRACTION`};function to(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:eo[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var no={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function ro(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:no[e.combine]||`ENVMAP_BLENDING_NONE`}function io(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ao(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Za(n),l=$a(n),u=to(n),d=ro(n),p=io(n),m=Ia(n),h=La(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(za).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(za).join(`
`),v.length>0&&(v+=`
`)):(_=[Ya(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(za).join(`
`),v=[Ya(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,p?`#define CUBEUV_TEXEL_WIDTH `+p.texelWidth:``,p?`#define CUBEUV_TEXEL_HEIGHT `+p.texelHeight:``,p?`#define CUBEUV_MAX_MIP `+p.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Ar.tonemapping_pars_fragment,n.toneMapping===0?``:Na(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Ar.colorspace_pars_fragment,ja(`linearToOutputTexel`,n.outputColorSpace),Fa(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(za).join(`
`)),o=Ua(o),o=Ba(o,n),o=Va(o,n),s=Ua(s),s=Ba(s,n),s=Va(s,n),o=qa(o),s=qa(s),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+s,S=wa(i,i.VERTEX_SHADER,b),C=wa(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g)||``,r=i.getShaderInfoLog(S)||``,a=i.getShaderInfoLog(C)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Aa(i,S,`vertex`),n=Aa(i,C,`fragment`);lt(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):f(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:_},fragmentShader:{log:c,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Ca(i,g),E=Ra(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,Ta)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ea++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var oo=0,so=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new co(e),t.set(e,n)),n}},co=class{constructor(e){this.id=oo++,this.code=e,this.usedTimes=0}};function lo(e){return e===1030||e===37490||e===36285}function uo(e,t,n,r,i,a){let o=new Ze,s=new so,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,p=r.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return c.add(e),e===0?`uv`:`uv${e}`}function g(i,o,l,u,g,_){let v=u.fog,y=g.geometry,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,x=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,S=t.get(i.envMap||b,x),C=S&&S.mapping===306?S.image.height:null,w=m[i.type];i.precision!==null&&(p=r.getMaxPrecision(i.precision),p!==i.precision&&f(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,p,`instead.`));let T=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,E=T===void 0?0:T.length,D=0;y.morphAttributes.position!==void 0&&(D=1),y.morphAttributes.normal!==void 0&&(D=2),y.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(w){let e=jr[w];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),N=e.state.buffers.depth.getReversed(),P=g.isInstancedMesh===!0,F=g.isBatchedMesh===!0,I=!!i.map,ee=!!i.matcap,L=!!S,te=!!i.aoMap,R=!!i.lightMap,ne=!!i.bumpMap&&i.wireframe===!1,re=!!i.normalMap,z=!!i.displacementMap,ie=!!i.emissiveMap,ae=!!i.metalnessMap,oe=!!i.roughnessMap,se=i.anisotropy>0,ce=i.clearcoat>0,le=i.dispersion>0,ue=i.retroreflectivity>0,de=i.iridescence>0,fe=i.sheen>0,pe=i.transmission>0,me=se&&!!i.anisotropyMap,he=ce&&!!i.clearcoatMap,ge=ce&&!!i.clearcoatNormalMap,_e=ce&&!!i.clearcoatRoughnessMap,ve=de&&!!i.iridescenceMap,ye=de&&!!i.iridescenceThicknessMap,be=fe&&!!i.sheenColorMap,xe=fe&&!!i.sheenRoughnessMap,Se=!!i.specularMap,Ce=!!i.specularColorMap,we=!!i.specularIntensityMap,Te=pe&&!!i.transmissionMap,Ee=pe&&!!i.thicknessMap,De=!!i.gradientMap,Oe=!!i.alphaMap,ke=i.alphaTest>0,Ae=!!i.alphaHash,B=!!i.extensions,je=0;i.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(je=e.toneMapping);let Me={shaderID:w,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:p,batching:F,batchingColor:F&&g._colorsTexture!==null,instancing:P,instancingColor:P&&g.instanceColor!==null,instancingMorph:P&&g.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Fe.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:I,matcap:ee,envMap:L,envMapMode:L&&S.mapping,envMapCubeUVHeight:C,aoMap:te,lightMap:R,bumpMap:ne,normalMap:re,displacementMap:z,emissiveMap:ie,normalMapObjectSpace:re&&i.normalMapType===1,normalMapTangentSpace:re&&i.normalMapType===0,packedNormalMap:re&&i.normalMapType===0&&lo(i.normalMap.format),metalnessMap:ae,roughnessMap:oe,anisotropy:se,anisotropyMap:me,clearcoat:ce,clearcoatMap:he,clearcoatNormalMap:ge,clearcoatRoughnessMap:_e,dispersion:le,retroreflection:ue,iridescence:de,iridescenceMap:ve,iridescenceThicknessMap:ye,sheen:fe,sheenColorMap:be,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:Ce,specularIntensityMap:we,transmission:pe,transmissionMap:Te,thicknessMap:Ee,gradientMap:De,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Oe,alphaTest:ke,alphaHash:Ae,combine:i.combine,mapUv:I&&h(i.map.channel),aoMapUv:te&&h(i.aoMap.channel),lightMapUv:R&&h(i.lightMap.channel),bumpMapUv:ne&&h(i.bumpMap.channel),normalMapUv:re&&h(i.normalMap.channel),displacementMapUv:z&&h(i.displacementMap.channel),emissiveMapUv:ie&&h(i.emissiveMap.channel),metalnessMapUv:ae&&h(i.metalnessMap.channel),roughnessMapUv:oe&&h(i.roughnessMap.channel),anisotropyMapUv:me&&h(i.anisotropyMap.channel),clearcoatMapUv:he&&h(i.clearcoatMap.channel),clearcoatNormalMapUv:ge&&h(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&h(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&h(i.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&h(i.iridescenceThicknessMap.channel),sheenColorMapUv:be&&h(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&h(i.sheenRoughnessMap.channel),specularMapUv:Se&&h(i.specularMap.channel),specularColorMapUv:Ce&&h(i.specularColorMap.channel),specularIntensityMapUv:we&&h(i.specularIntensityMap.channel),transmissionMapUv:Te&&h(i.transmissionMap.channel),thicknessMapUv:Ee&&h(i.thicknessMap.channel),alphaMapUv:Oe&&h(i.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(re||se),vertexNormals:!!y.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:g.isPoints===!0&&!!y.attributes.uv&&(I||Oe),fog:!!v,useFog:i.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||y.attributes.normal===void 0&&re===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:N,skinning:g.isSkinnedMesh===!0,hasPositionAttribute:y.attributes.position!==void 0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:_.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:je,decodeVideoTexture:I&&i.map.isVideoTexture===!0&&Fe.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ie&&i.emissiveMap.isVideoTexture===!0&&Fe.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:B&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(B&&i.extensions.multiDraw===!0||F)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function b(e){let t=m[e.type],n;if(t){let e=jr[t];n=we.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r=u.get(n);return r===void 0?(r=new ao(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function S(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function C(e){s.remove(e)}function w(){s.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:l,dispose:w}}function fo(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function po(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function mo(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function ho(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||po),r.length>1&&r.sort(t||mo),i.length>1&&i.sort(t||mo)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function go(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new ho,e.set(t,[i])):n>=r.length?(i=new ho,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function _o(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new $e,color:new Ve};break;case`SpotLight`:n={position:new $e,direction:new $e,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new $e,color:new Ve,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new $e,skyColor:new Ve,groundColor:new Ve};break;case`RectAreaLight`:n={color:new Ve,position:new $e,halfWidth:new $e,halfHeight:new $e}}return e[t.id]=n,n}}}function vo(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new U,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var yo=0;function bo(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function xo(e){let t=new _o,n=vo(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new $e);let i=new $e,a=new Oe,o=new Oe;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(bo);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=X.LTC_FLOAT_1,r.rectAreaLTC2=X.LTC_FLOAT_2):(r.rectAreaLTC1=X.LTC_HALF_1,r.rectAreaLTC2=X.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=yo++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function So(e){let t=new xo(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Co(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new So(e),t.set(n,[a])):r>=i.length?(a=new So(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var wo=`void main() {
gl_Position = vec4( position, 1.0 );
}`,To=`uniform sampler2D shadow_pass;
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
}`,Eo=[new $e(1,0,0),new $e(-1,0,0),new $e(0,1,0),new $e(0,-1,0),new $e(0,0,1),new $e(0,0,-1)],Do=[new $e(0,-1,0),new $e(0,-1,0),new $e(0,0,1),new $e(0,0,-1),new $e(0,-1,0),new $e(0,-1,0)],Oo=new Oe,ko=new $e,Ao=new $e;function jo(e,t,n){let r=new C,i=new U,a=new U,o=new Ce,s=new pt,c=new ye,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},p=new k({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new U},radius:{value:4}},vertexShader:wo,fragmentShader:To}),h=p.clone();h.defines.HORIZONTAL_PASS=1;let g=new be;g.setAttribute(`position`,new qe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new he(g,p),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let y=this.type;this.render=function(t,n,s){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||t.length===0)return;this.type===2&&(f(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),p=e.state;p.setBlending(0),p.buffers.depth.getReversed()===!0?p.buffers.color.setClear(0,0,0,0):p.buffers.color.setClear(1,1,1,1),p.buffers.depth.setTest(!0),p.setScissorTest(!1);let h=y!==this.type;h&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){f(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let g=d.getFrameExtents();i.multiply(g),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/g.x),i.x=a.x*g.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/g.y),i.y=a.y*g.y,d.mapSize.y=a.y));let _=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=_,d.map===null||h===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){f(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new De(i.x,i.y,{format:re,type:mt,minFilter:Be,magFilter:Be,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new m(i.x,i.y,I),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=it,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=se,d.map.depthTexture.magFilter=se}else l.isPointLight?(d.map=new si(i.x),d.map.depthTexture=new pe(i.x,ge)):(d.map=new De(i.x,i.y),d.map.depthTexture=new m(i.x,i.y,ge)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=it,this.type===1?(d.map.depthTexture.compareFunction=_?518:515,d.map.depthTexture.minFilter=Be,d.map.depthTexture.magFilter=Be):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=se,d.map.depthTexture.magFilter=se);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let v=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<v;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),ko.setFromMatrixPosition(l.matrixWorld),e.position.copy(ko),Ao.copy(e.position),Ao.add(Eo[t]),e.up.copy(Do[t]),e.lookAt(Ao),e.updateMatrixWorld(),n.makeTranslation(-ko.x,-ko.y,-ko.z),Oo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Oo,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),p.viewport(o)}r=d.getFrustum(t),S(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&b(d,s),d.needsUpdate=!1}y=this.type,v.needsUpdate=!1,e.setRenderTarget(c,l,d)};function b(n,r){let a=t.update(_);p.defines.VSM_SAMPLES!==n.blurSamples&&(p.defines.VSM_SAMPLES=n.blurSamples,h.defines.VSM_SAMPLES=n.blurSamples,p.needsUpdate=!0,h.needsUpdate=!0),n.mapPass===null?n.mapPass=new De(i.x,i.y,{format:re,type:mt}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),p.uniforms.shadow_pass.value=n.map.depthTexture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,p,_,null),h.uniforms.shadow_pass.value=n.mapPass.texture,h.uniforms.resolution.value.set(n.map.width,n.map.height),h.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,h,_,null)}function x(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,w)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function S(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=x(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=x(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)S(c[e],i,a,o,s)}function w(e){e.target.removeEventListener(`dispose`,w);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Mo(e,t){function n(){let t=!1,n=new Ce,r=null,i=new Ce(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ie(e.DEPTH_TEST):ae(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=V[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ie(e.STENCIL_TEST):ae(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Ve(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,M=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,P=0,F=e.getParameter(e.VERSION);F.indexOf(`WebGL`)===-1?F.indexOf(`OpenGL ES`)!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),N=P>=2):(P=parseFloat(/^WebGL (\d)/.exec(F)[1]),N=P>=1);let I=null,ee={},L=e.getParameter(e.SCISSOR_BOX),te=e.getParameter(e.VIEWPORT),R=new Ce().fromArray(L),ne=new Ce().fromArray(te);function re(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let z={};z[e.TEXTURE_2D]=re(e.TEXTURE_2D,e.TEXTURE_2D,1),z[e.TEXTURE_CUBE_MAP]=re(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[e.TEXTURE_2D_ARRAY]=re(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),z[e.TEXTURE_3D]=re(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ie(e.DEPTH_TEST),o.setFunc(3),pe(!1),me(1),ie(e.CULL_FACE),de(0);function ie(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ae(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function oe(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function se(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ce(t){return h!==t&&(e.useProgram(t),h=t,!0)}let le={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};le[103]=e.MIN,le[104]=e.MAX;let ue={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function de(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ae(e.BLEND),g=!1);else if(g===!1&&(ie(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:lt(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:lt(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:lt(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:lt(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(le[n],le[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ue[r],ue[i],ue[o],ue[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function fe(t,n){t.side===2?ae(e.CULL_FACE):ie(e.CULL_FACE);let r=t.side===1;n&&(r=!r),pe(r),t.blending===1&&t.transparent===!1?de(0):de(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ge(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ie(e.SAMPLE_ALPHA_TO_COVERAGE):ae(e.SAMPLE_ALPHA_TO_COVERAGE)}function pe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function me(t){t===0?ae(e.CULL_FACE):(ie(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function he(t){t!==k&&(N&&e.lineWidth(t),k=t)}function ge(t,n,r){t?(ie(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ae(e.POLYGON_OFFSET_FILL)}function _e(t){t?ie(e.SCISSOR_TEST):ae(e.SCISSOR_TEST)}function ve(t){t===void 0&&(t=e.TEXTURE0+M-1),I!==t&&(e.activeTexture(t),I=t)}function ye(t,n,r){r===void 0&&(r=I===null?e.TEXTURE0+M-1:I);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(I!==r&&(e.activeTexture(r),I=r),e.bindTexture(t,n||z[t]),i.type=t,i.texture=n)}function be(){let t=ee[I];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function xe(){try{e.compressedTexImage2D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function Se(){try{e.compressedTexImage3D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function Te(){try{e.texSubImage3D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function Ee(){try{e.compressedTexSubImage2D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage3D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function Oe(){try{e.texStorage2D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function ke(){try{e.texStorage3D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function Ae(){try{e.texImage2D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function B(){try{e.texImage3D(...arguments)}catch(e){lt(`WebGLState:`,e)}}function je(t){return d[t]===void 0?e.getParameter(t):d[t]}function Me(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ne(t){R.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),R.copy(t))}function H(t){ne.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ne.copy(t))}function U(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},I=null,ee={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Ve(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,R.set(0,0,e.canvas.width,e.canvas.height),ne.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ie,disable:ae,bindFramebuffer:oe,drawBuffers:se,useProgram:ce,setBlending:de,setMaterial:fe,setFlipSided:pe,setCullFace:me,setLineWidth:he,setPolygonOffset:ge,setScissorTest:_e,activeTexture:ve,bindTexture:ye,unbindTexture:be,compressedTexImage2D:xe,compressedTexImage3D:Se,texImage2D:Ae,texImage3D:B,pixelStorei:Me,getParameter:je,updateUBOMapping:U,uniformBlockBinding:Pe,texStorage2D:Oe,texStorage3D:ke,texSubImage2D:we,texSubImage3D:Te,compressedTexSubImage2D:Ee,compressedTexSubImage3D:De,scissor:Ne,viewport:H,reset:Fe}}function No(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new U,u=new WeakMap,m=new Set,h,g=new WeakMap,v=!1;try{v=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function y(e,t){return v?new OffscreenCanvas(e,t):ve(`canvas`)}function b(e,t,n){let r=1,i=B(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);h===void 0&&(h=y(n,a));let o=t?y(n,a):h;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),f(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&f(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function x(e){return e.generateMipmaps}function S(t){e.generateMipmap(t)}function C(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function w(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];f(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||f(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?et:Fe.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function T(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,f(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function E(e,t){return x(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function D(e){let t=e.target;t.removeEventListener(`dispose`,D),k(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&m.delete(t)}function O(e){let t=e.target;t.removeEventListener(`dispose`,O),j(t)}function k(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=g.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&A(e),Object.keys(i).length===0&&g.delete(n)}r.remove(e)}function A(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=g.get(i);delete a[n.__cacheKey],o.memory.textures--}function j(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let M=0;function N(){M=0}function P(){return M}function F(e){M=e}function I(){let e=M;return e>=i.maxTextures&&f(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),M+=1,e}function ee(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function L(t,i){let a=r.get(t);if(t.isVideoTexture&&ke(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)f(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)f(`WebGLRenderer: Texture marked for update but image is incomplete`);else{fe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?fe(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function R(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?fe(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?pe(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[d]:e.REPEAT,[Te]:e.CLAMP_TO_EDGE,[st]:e.MIRRORED_REPEAT},ae={[se]:e.NEAREST,[p]:e.NEAREST_MIPMAP_NEAREST,[_]:e.NEAREST_MIPMAP_LINEAR,[Be]:e.LINEAR,[Se]:e.LINEAR_MIPMAP_NEAREST,[Ye]:e.LINEAR_MIPMAP_LINEAR},oe={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ce(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&f(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ae[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ae[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,oe[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function le(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,D));let i=n.source,a=g.get(i);a===void 0&&(a={},g.set(i,a));let s=ee(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&A(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ue(e,t,n){return Math.floor(Math.floor(e/n)/t)}function de(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ue(n.start,r.width,4),c=ue(t.start,r.width,4);n.start<=i+1&&a===c&&ue(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function fe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=le(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let d=r.get(u);if(u.version!==d.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Fe.getPrimaries(Fe.workingColorSpace),r=o.colorSpace===``?null:Fe.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=b(o.image,!1,i.maxTextureSize);t=Ae(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),h=w(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);ce(c,o);let g,_=o.mipmaps,v=o.isVideoTexture!==!0,y=d.__version===void 0||l===!0,C=u.dataReady,D=E(o,t);if(o.isDepthTexture)h=T(o.format===ie,o.type),y&&(v?n.texStorage2D(e.TEXTURE_2D,1,h,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(_.length>0){v&&y&&n.texStorage2D(e.TEXTURE_2D,D,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],v?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data);o.generateMipmaps=!1}else v?(y&&n.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height),C&&de(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,h,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){v&&y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,h,_[0].width,_[0].height,t.depth);for(let i=0,a=_.length;i<a;i++)if(g=_[i],o.format!==1023){if(r!==null){if(v){if(C){if(o.layerUpdates.size>0){let t=z(g.width,g.height,o.format,o.type);for(let a of o.layerUpdates){let o=g.data.subarray(a*t/g.data.BYTES_PER_ELEMENT,(a+1)*t/g.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,g.width,g.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,g.width,g.height,t.depth,r,g.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,h,g.width,g.height,t.depth,0,g.data,0,0)}else f(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else v?C&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,g.width,g.height,t.depth,r,p,g.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,h,g.width,g.height,t.depth,0,r,p,g.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{v&&y&&n.texStorage2D(e.TEXTURE_2D,D,h,_[0].width,_[0].height);for(let t=0,i=_.length;t<i;t++)g=_[t],o.format===1023?v?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,p,g.data):n.texImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,r,p,g.data):r===null?f(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):v?C&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,g.width,g.height,r,g.data):n.compressedTexImage2D(e.TEXTURE_2D,t,h,g.width,g.height,0,g.data)}}else if(o.isDataArrayTexture){if(v){if(y&&n.texStorage3D(e.TEXTURE_2D_ARRAY,D,h,t.width,t.height,t.depth),C){if(o.layerUpdates.size>0){let i=z(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,h,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)v?(y&&n.texStorage3D(e.TEXTURE_3D,D,h,t.width,t.height,t.depth),C&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,h,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(y){if(v)n.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<D;t++)n.texImage2D(e.TEXTURE_2D,t,h,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),m.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of m)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(_.length>0){if(v&&y){let t=B(_[0]);n.texStorage2D(e.TEXTURE_2D,D,h,t.width,t.height)}for(let t=0,i=_.length;t<i;t++)g=_[t],v?C&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,g):n.texImage2D(e.TEXTURE_2D,t,h,r,p,g);o.generateMipmaps=!1}else if(v){if(y){let r=B(t);n.texStorage2D(e.TEXTURE_2D,D,h,r.width,r.height)}C&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,h,r,p,t);x(o)&&S(c),d.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function pe(t,o,s){if(o.image.length!==6)return;let c=le(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Fe.getPrimaries(Fe.workingColorSpace),r=o.colorSpace===``?null:Fe.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let p=o.isCompressedTexture||o.image[0].isCompressedTexture,m=o.image[0]&&o.image[0].isDataTexture,h=[];for(let e=0;e<6;e++)!p&&!m?h[e]=b(o.image[e],!0,i.maxCubemapSize):h[e]=m?o.image[e].image:o.image[e],h[e]=Ae(o,h[e]);let g=h[0],_=a.convert(o.format,o.colorSpace),v=a.convert(o.type),y=w(o.internalFormat,_,v,o.normalized,o.colorSpace),C=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,D=l.dataReady,O=E(o,g);ce(e.TEXTURE_CUBE_MAP,o);let k;if(p){C&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,O,y,g.width,g.height);for(let t=0;t<6;t++){k=h[t].mipmaps;for(let r=0;r<k.length;r++){let i=k[r];o.format===1023?C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,_,v,i.data):_===null?f(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):C?D&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,_,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,y,i.width,i.height,0,i.data)}}}else{if(k=o.mipmaps,C&&T){k.length>0&&O++;let t=B(h[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,O,y,t.width,t.height)}for(let t=0;t<6;t++)if(m){C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,h[t].width,h[t].height,_,v,h[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,h[t].width,h[t].height,0,_,v,h[t].data);for(let r=0;r<k.length;r++){let i=k[r].image[t].image;C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,_,v,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,i.width,i.height,0,_,v,i.data)}}else{C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,_,v,h[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,y,_,v,h[t]);for(let r=0;r<k.length;r++){let i=k[r];C?D&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,_,v,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,y,_,v,i.image[t])}}}x(o)&&S(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function me(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=w(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,De(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function he(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=T(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Oe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,De(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,De(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=w(o.internalFormat,c,l,o.normalized,o.colorSpace);Oe(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,De(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,De(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ge(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,D)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else L(i.depthTexture,0);let u=l.__webglTexture,d=De(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Oe(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function _e(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ge(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ge(i.__webglFramebuffer[0],t,0):ge(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),he(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),he(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,i){let a=r.get(t);n!==void 0&&me(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&_e(t)}function be(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,O);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Oe(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=w(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=De(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),he(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),ce(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)me(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else me(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);x(i)&&S(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),ce(c,a),me(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),x(a)&&S(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),ce(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)me(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else me(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);x(i)&&S(r),n.unbindTexture()}t.depthBuffer&&_e(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(x(a)){let t=C(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),S(t),n.unbindTexture()}}}let Ce=[],we=[];function Ee(t){if(t.samples>0){if(Oe(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Ce.length=0,we.length=0,Ce.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Ce.push(l),we.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,we)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function De(e){return Math.min(i.maxSamples,e.samples)}function Oe(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function ke(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Ae(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Fe.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&f(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):lt(`WebGLTextures: Unsupported texture color space:`,n)),t}function B(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=N,this.getTextureUnits=P,this.setTextureUnits=F,this.setTexture2D=L,this.setTexture2DArray=te,this.setTexture3D=R,this.setTextureCube=ne,this.rebindTextures=ye,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=_e,this.setupFrameBufferTexture=me,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Po(e,t){function n(n,r=``){let i,a=Fe.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Fo=`
void main() {
gl_Position = vec4( position, 1.0 );
}`,Io=`
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
}`,Lo=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new je(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new k({vertexShader:Fo,fragmentShader:Io,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new he(new M(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Ro=class extends n{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,p=null,h=null,g=typeof XRWebGLBinding<`u`,_=new Lo,v={},y=t.getContextAttributes(),b=null,x=null,C=[],w=[],T=new U,E=null,D=null,O=new Me;O.viewport=new Ce;let k=new Me;k.viewport=new Ce;let A=[O,k],j=new Ge,M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new me,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new me,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new me,C[e]=t),t.getHandSpace()};function P(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function F(){r.removeEventListener(`select`,P),r.removeEventListener(`selectstart`,P),r.removeEventListener(`selectend`,P),r.removeEventListener(`squeeze`,P),r.removeEventListener(`squeezestart`,P),r.removeEventListener(`squeezeend`,P),r.removeEventListener(`end`,F),r.removeEventListener(`inputsourceschange`,I);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}M=null,N=null,_.reset();for(let e in v)delete v[e];if(e.setRenderTarget(b),p=null,d=null,u=null,r=null,x=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),D!==null){let e=D.camera;e.fov=D.fov,e.zoom=D.zoom,e.updateProjectionMatrix(),D=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&f(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&f(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?p:d},this.getBinding=function(){return u===null&&g&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return h},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(b=e.getRenderTarget(),r.addEventListener(`select`,P),r.addEventListener(`selectstart`,P),r.addEventListener(`selectend`,P),r.addEventListener(`squeeze`,P),r.addEventListener(`squeezestart`,P),r.addEventListener(`squeezeend`,P),r.addEventListener(`end`,F),r.addEventListener(`inputsourceschange`,I),y.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?ie:it,a=y.stencil?Ke:ge);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new De(d.textureWidth,d.textureHeight,{format:S,type:Xe,depthTexture:new m(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new De(p.framebufferWidth,p.framebufferHeight,{format:S,type:Xe,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ae.setContext(r),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function I(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let ee=new $e,L=new $e;function te(e,t,n){ee.setFromMatrixPosition(t.matrixWorld),L.setFromMatrixPosition(n.matrixWorld);let r=ee.distanceTo(L),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function R(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),j.near=k.near=O.near=t,j.far=k.far=O.far=n,(M!==j.near||N!==j.far)&&(r.updateRenderState({depthNear:j.near,depthFar:j.far}),M=j.near,N=j.far),j.layers.mask=e.layers.mask|6,O.layers.mask=j.layers.mask&-5,k.layers.mask=j.layers.mask&-3;let i=e.parent,a=j.cameras;R(j,i);for(let e=0;e<a.length;e++)R(a[e],i);a.length===2?te(j,O,k):j.projectionMatrix.copy(O.projectionMatrix),D===null&&e.isPerspectiveCamera&&(D={camera:e,fov:e.fov,zoom:e.zoom}),ne(e,j,i)};function ne(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ue*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return j},this.getFoveation=function(){if(d!==null||p!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(j)},this.getCameraTexture=function(e){return v[e]};let re=null;function z(t,i){if(l=i.getViewerPose(c||a),h=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let i=!1;t.length!==j.cameras.length&&(j.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(x,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(x))}let o=A[n];o===void 0&&(o=new Me,o.layers.enable(n),o.viewport=new Ce,A[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(j.matrix.copy(o.matrix),j.matrix.decompose(j.position,j.quaternion,j.scale)),i===!0&&j.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new je,v[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}re&&re(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),h=null}let ae=new Or;ae.setAnimationLoop(z),this.setAnimationLoop=function(e){re=e},this.dispose=function(){}}},zo=new Oe,Bo=new B;Bo.set(-1,0,0,0,1,0,0,0,1);function Vo(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,c(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),f(e,t)):t.isMeshPhongMaterial?(a(e,t),d(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),p(e,t),t.isMeshPhysicalMaterial&&m(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),h(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),g(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?l(e,t,n,r):t.isSpriteMaterial?u(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(zo.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Bo),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function l(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function d(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function f(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function p(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function m(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function h(e,t){t.matcap&&(e.matcap.value=t.matcap)}function g(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Ho(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(_(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,y));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(p(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return lt(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function p(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)m(t[n],e,n,a);else m(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(t,n,r,i){if(g(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=v(i);h(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else h(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function h(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function g(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function _(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=v(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function v(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?f(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):f(`WebGLRenderer: Unsupported uniform value type.`,e),t}function y(t){let n=t.target;n.removeEventListener(`dispose`,y);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function b(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:b}}var Uo=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Wo=null;function Go(){return Wo===null&&(Wo=new ne(Uo,16,16,re,mt),Wo.name=`DFG_LUT`,Wo.minFilter=Be,Wo.magFilter=Be,Wo.wrapS=Te,Wo.wrapT=Te,Wo.generateMipmaps=!1,Wo.needsUpdate=!0),Wo}var Ko=class{constructor(e={}){let{canvas:t=ft(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u=`default`,failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:p=!1,outputBufferType:m=Xe}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);_=n.getContextAttributes().alpha}else _=a;let v=m,y=new Set([D,s,h]),b=new Set([Xe,ge,xe,Ke,ze,Je]),x=new Uint32Array(4),S=new Int32Array(4),w=new $e,T=null,E=null,O=[],k=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,M=!1,N=null,P=null,F=null,I=null;this._outputColorSpace=ee;let L=0,te=0,R=null,ne=-1,re=null,z=new Ce,ie=new Ce,ae=null,oe=new Ve(0),se=0,ce=t.width,le=t.height,ue=1,de=null,fe=null,pe=new Ce(0,0,ce,le),me=new Ce(0,0,ce,le),he=!1,_e=new C,ve=!1,ye=!1,be=new Oe,Se=new $e,we=new Ce,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ee=!1;function ke(){return R===null?ue:1}let B=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,V,H,U,Pe,Ie,Le,Re,Be,He,Ue,We,Ge,qe,Ze,Qe,et,tt,nt,rt,it,at;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,ut,!1),t.addEventListener(`webglcontextrestored`,dt,!1),t.addEventListener(`webglcontextcreationerror`,pt,!1),B===null){let t=`webgl2`;if(B=je(t,e),B===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}st()}catch(e){throw t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,pt,!1),lt(`WebGLRenderer: `+e.message),e}function st(){Me=new li(B),Me.init(),rt=new Po(B,Me),Ne=new Rr(B,Me,e,rt),V=new Mo(B,Me),Ne.reversedDepthBuffer&&p&&V.buffers.depth.setReversed(!0),P=B.createFramebuffer(),F=B.createFramebuffer(),I=B.createFramebuffer(),H=new fi(B),U=new fo,Pe=new No(B,Me,V,U,Ne,rt,H),Ie=new ci(j),Le=new kr(B),it=new Ir(B,Le),Re=new ui(B,Le,H,it),Be=new mi(B,Re,Le,it,H),et=new pi(B,Ne,Pe),qe=new zr(U),He=new uo(j,Ie,Me,Ne,it,qe),Ue=new Vo(j,U),We=new go,Ge=new Co(Me),Qe=new Fr(j,Ie,V,Be,_,c),Ze=new jo(j,Be,Ne),at=new Ho(B,H,Ne,V),tt=new Lr(B,Me,H),nt=new di(B,Me,H),H.programs=He.programs,j.capabilities=Ne,j.extensions=Me,j.properties=U,j.renderLists=We,j.shadowMap=Ze,j.state=V,j.info=H}v!==1009&&(A=new gi(v,t.width,t.height,o,r,i));let ct=new Ro(j,B);this.xr=ct,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(e){e!==void 0&&(ue=e,this.setSize(ce,le,!1))},this.getSize=function(e){return e.set(ce,le)},this.setSize=function(e,n,r=!0){ct.isPresenting?f(`WebGLRenderer: Can't change size while VR device is presenting.`):(ce=e,le=n,t.width=Math.floor(e*ue),t.height=Math.floor(n*ue),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(ce*ue,le*ue).floor()},this.setDrawingBufferSize=function(e,n,r){ce=e,le=n,ue=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(v===1009)lt(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){f(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}A.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(z)},this.getViewport=function(e){return e.copy(pe)},this.setViewport=function(e,t,n,r){e.isVector4?pe.set(e.x,e.y,e.z,e.w):pe.set(e,t,n,r),V.viewport(z.copy(pe).multiplyScalar(ue).round())},this.getScissor=function(e){return e.copy(me)},this.setScissor=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),V.scissor(ie.copy(me).multiplyScalar(ue).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(e){V.setScissorTest(he=e)},this.setOpaqueSort=function(e){de=e},this.setTransparentSort=function(e){fe=e},this.getClearColor=function(e){return e.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor(...arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(R!==null){let t=R.texture.format;e=y.has(t)}if(e){let e=R.texture.type,t=b.has(e),n=Qe.getClearColor(),r=Qe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(x[0]=i,x[1]=a,x[2]=o,x[3]=r,B.clearBufferuiv(B.COLOR,0,x)):(S[0]=i,S[1]=a,S[2]=o,S[3]=r,B.clearBufferiv(B.COLOR,0,S))}else r|=B.COLOR_BUFFER_BIT}t&&(r|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&B.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),N=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ut,!1),t.removeEventListener(`webglcontextrestored`,dt,!1),t.removeEventListener(`webglcontextcreationerror`,pt,!1),Qe.dispose(),We.dispose(),Ge.dispose(),U.dispose(),Ie.dispose(),Be.dispose(),it.dispose(),at.dispose(),He.dispose(),ct.dispose(),ct.removeEventListener(`sessionstart`,xt),ct.removeEventListener(`sessionend`,St),Ct.stop()};function ut(e){e.preventDefault(),ot(`WebGLRenderer: Context Lost.`),M=!0}function dt(){ot(`WebGLRenderer: Context Restored.`),M=!1;let e=H.autoReset,t=Ze.enabled,n=Ze.autoUpdate,r=Ze.needsUpdate,i=Ze.type;st(),H.autoReset=e,Ze.enabled=t,Ze.autoUpdate=n,Ze.needsUpdate=r,Ze.type=i}function pt(e){lt(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function ht(e){let t=e.target;t.removeEventListener(`dispose`,ht),gt(t)}function gt(e){_t(e),U.remove(e)}function _t(e){let t=U.get(e).programs;t!==void 0&&(t.forEach(function(e){He.releaseProgram(e)}),e.isShaderMaterial&&He.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Te);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=Nt(e,t,n,r,i);V.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Re.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;it.setup(i,r,s,n,c);let h,g=tt;if(c!==null&&(h=Le.get(c),g=nt,g.setIndex(h)),i.isMesh)r.wireframe===!0?(V.setLineWidth(r.wireframeLinewidth*ke()),g.setMode(B.LINES)):g.setMode(B.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),V.setLineWidth(e*ke()),i.isLineSegments?g.setMode(B.LINES):i.isLineLoop?g.setMode(B.LINE_LOOP):g.setMode(B.LINE_STRIP)}else i.isPoints?g.setMode(B.POINTS):i.isSprite&&g.setMode(B.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Le.get(c).bytesPerElement:1,o=U.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(B,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function vt(e,t,n,r){N!==null&&e.isNodeMaterial&&N.setObject(r,e),ve===!0&&qe.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,kt(e,t,r),e.side=0,e.needsUpdate=!0,kt(e,t,r),e.side=2):kt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),N!==null&&N.renderStart(e,t,n),E=Ge.get(n),E.init(t),k.push(E),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(E.pushLight(e),e.castShadow&&E.pushShadow(e))}),E.setupLights(),N!==null&&N.updateLights(E.state.lightsArray),ye=this.localClippingEnabled,ve=qe.init(this.clippingPlanes,ye),ve===!0&&qe.setGlobalState(this.clippingPlanes,t),N!==null&&Ze.render(E.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];vt(o,n,t,e),r.add(o)}else vt(i,n,t,e),r.add(i)}}),E=k.pop(),N!==null&&N.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=U.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let yt=null;function bt(e){yt&&yt(e)}function xt(){Ct.stop()}function St(){Ct.start()}let Ct=new Or;Ct.setAnimationLoop(bt),typeof self<`u`&&Ct.setContext(self),this.setAnimationLoop=function(e){yt=e,ct.setAnimationLoop(e),e===null?Ct.stop():Ct.start()},ct.addEventListener(`sessionstart`,xt),ct.addEventListener(`sessionend`,St),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){lt(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(M===!0)return;N!==null&&N.renderStart(e,t);let n=ct.enabled===!0&&ct.isPresenting===!0,r=A!==null&&(R===null||n)&&A.begin(j,R);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(t),t=ct.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,R),E=Ge.get(e,k.length),E.init(t),E.state.textureUnits=Pe.getTextureUnits(),k.push(E),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),_e.setFromProjectionMatrix(be,Ae,t.reversedDepth),ye=this.localClippingEnabled,ve=qe.init(this.clippingPlanes,ye),T=We.get(e,O.length),T.init(),O.push(T),ct.enabled===!0&&ct.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&wt(e,t,-1/0,j.sortObjects)}wt(e,t,0,j.sortObjects),T.finish(),N!==null&&N.updateLights(E.state.lightsArray),j.sortObjects===!0&&T.sort(de,fe),Ee=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,Ee&&Qe.addToRenderList(T,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ve===!0&&qe.beginShadows();let i=E.state.shadowsArray;if(Ze.render(i,e,t),ve===!0&&qe.endShadows(),(r&&A.hasRenderPass())===!1){let n=T.opaque,r=T.transmissive;if(E.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];Et(n,r,e,a)}Ee&&Qe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];Tt(T,e,n,n.viewport)}}else r.length>0&&Et(n,r,e,t),Ee&&Qe.render(e),Tt(T,e,t)}R!==null&&te===0&&(Pe.updateMultisampleRenderTarget(R),Pe.updateRenderTargetMipmap(R)),r&&A.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),it.resetDefaultState(),ne=-1,re=null,k.pop(),k.length>0?(E=k[k.length-1],Pe.setTextureUnits(E.state.textureUnits),ve===!0&&qe.setGlobalState(j.clippingPlanes,E.state.camera)):E=null,O.pop(),T=O.length>0?O[O.length-1]:null,N!==null&&N.renderEnd()};function wt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)E.pushLightProbeGrid(e);else if(e.isLight)E.pushLight(e),e.castShadow&&E.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(_e)){r&&we.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let i=Be.update(e),a=e.material;a.visible&&T.push(e,i,a,n,we.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(_e))){let i=Be.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),we.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),we.copy(e.boundingSphere.center)),we.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&T.push(e,i,c,n,we.z,s,t)}}else a.visible&&T.push(e,i,a,n,we.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)wt(i[e],t,n,r)}function Tt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;E.setupLightsView(n),ve===!0&&qe.setGlobalState(j.clippingPlanes,n),r&&V.viewport(z.copy(r)),i.length>0&&Dt(i,t,n),a.length>0&&Dt(a,t,n),o.length>0&&Dt(o,t,n),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function Et(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);E.state.transmissionRenderTarget[r.id]=new De(1,1,{generateMipmaps:!0,type:e?mt:Xe,minFilter:Ye,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Fe.workingColorSpace})}let a=E.state.transmissionRenderTarget[r.id],o=r.viewport||z;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),l=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(oe),se=j.getClearAlpha(),se<1&&j.setClearColor(16777215,.5),j.clear(),Ee&&Qe.render(n);let u=j.toneMapping;j.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),E.setupLightsView(r),ve===!0&&qe.setGlobalState(j.clippingPlanes,r),Dt(e,n,r),Pe.updateMultisampleRenderTarget(a),Pe.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Pe.updateMultisampleRenderTarget(a),Pe.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,l),j.setClearColor(oe,se),d!==void 0&&(r.viewport=d),j.toneMapping=u}function Dt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ot(o,t,n,s,l,c)}}function Ot(e,t,n,r,i,a){N!==null&&i.isNodeMaterial&&N.setObject(e,i),e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function kt(e,t,n){t.isScene!==!0&&(t=Te);let r=U.get(e),i=E.state.lights,a=E.state.shadowsArray,o=i.state.version,s=He.getParameters(e,i.state,a,t,n,E.state.lightProbeGridArray),c=He.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,ht),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return jt(e,s),d}else s.uniforms=He.getUniforms(e),N!==null&&e.isNodeMaterial&&N.build(e,n,s),e.onBeforeCompile(s,j),d=He.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),jt(e,s),r.needsLights=W(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=E.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function At(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Ca.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function jt(e,t){let n=U.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Mt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];w.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(w))return n}return null}function Nt(e,t,n,r,i){t.isScene!==!0&&(t=Te),Pe.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=R===null?j.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Fe.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ie.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=U.get(r),y=E.state.lights;if(ve===!0&&(ye===!0||e!==re)){let t=e===re&&r.id===ne;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=E.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=kt(r,t,i),N&&r.isNodeMaterial&&N.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),D=v.uniforms;if(V.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==ne&&(ne=r.id,C=!0),v.needsLights){let e=Mt(E.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||re!==e){V.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(B,`projectionMatrix`,e.projectionMatrix),T.setValue(B,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(B,Se.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&T.setValue(B,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(B,`isOrthographic`,e.isOrthographicCamera===!0),re!==e&&(re=e,C=!0,w=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&T.setValue(B,`sunShadowMap`,y.state.sunShadowMap,Pe),y.state.directionalShadowMap.length>0&&T.setValue(B,`directionalShadowMap`,y.state.directionalShadowMap,Pe),y.state.spotShadowMap.length>0&&T.setValue(B,`spotShadowMap`,y.state.spotShadowMap,Pe),y.state.pointShadowMap.length>0&&T.setValue(B,`pointShadowMap`,y.state.pointShadowMap,Pe)),i.isSkinnedMesh){T.setOptional(B,i,`bindMatrix`),T.setOptional(B,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(B,`boneTexture`,e.boneTexture,Pe))}i.isBatchedMesh&&(T.setOptional(B,i,`batchingTexture`),T.setValue(B,`batchingTexture`,i._matricesTexture,Pe),T.setOptional(B,i,`batchingIdTexture`),T.setValue(B,`batchingIdTexture`,i._indirectTexture,Pe),T.setOptional(B,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(B,`batchingColorTexture`,i._colorsTexture,Pe));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&et.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(B,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=Go()),C){if(T.setValue(B,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&Pt(D,w),a&&r.fog===!0&&Ue.refreshFogUniforms(D,a),Ue.refreshMaterialUniforms(D,r,ue,le,E.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}Ca.upload(B,At(v),D,Pe)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Ca.upload(B,At(v),D,Pe),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(B,`center`,i.center),T.setValue(B,`modelViewMatrix`,i.modelViewMatrix),T.setValue(B,`normalMatrix`,i.normalMatrix),T.setValue(B,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,x),at.bind(n,x)}}return x}function Pt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function W(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return L},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(e,t,n){let r=U.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),U.get(e.texture).__webglTexture=t,U.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=U.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){R=e,L=t,te=n;let r=null,i=!1,a=!1;if(e){let o=U.get(e);if(o.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(B.FRAMEBUFFER,o.__webglFramebuffer),z.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest,V.viewport(z),V.scissor(ie),V.setScissorTest(ae),ne=-1;return}if(o.__webglFramebuffer===void 0)Pe.setupRenderTarget(e);else if(o.__hasExternalTextures)Pe.rebindTextures(e,U.get(e.texture).__webglTexture,U.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&U.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Pe.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=U.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Pe.useMultisampledRTT(e)===!1?U.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,z.copy(e.viewport),ie.copy(e.scissor),ae=e.scissorTest}else z.copy(pe).multiplyScalar(ue).floor(),ie.copy(me).multiplyScalar(ue).floor(),ae=he;if(n!==0&&(r=P),V.bindFramebuffer(B.FRAMEBUFFER,r)&&V.drawBuffers(e,r),V.viewport(z),V.scissor(ie),V.setScissorTest(ae),i){let r=U.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=U.get(e.textures[t]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=U.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,t.__webglTexture,n)}ne=-1};function Ft(e){let t=U.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){lt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){V.bindFramebuffer(B.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s);let u=Ft(o);if(u.__formatReadable===!1){lt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){lt(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&B.readPixels(t,n,r,i,rt.convert(c),rt.convert(l),a)}finally{let e=R===null?null:U.get(R).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=U.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){V.bindFramebuffer(B.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s);let d=Ft(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,f),B.bufferData(B.PIXEL_PACK_BUFFER,a.byteLength,B.STREAM_READ),B.readPixels(t,n,r,i,rt.convert(l),rt.convert(u),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);let p=R===null?null:U.get(R).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,p);let m=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await g(B,m,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,f),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,a),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(f),B.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Pe.setTexture2D(e,0),B.copyTexSubImage2D(B.TEXTURE_2D,n,0,0,o,s,i,a),V.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=rt.convert(t.format),_=rt.convert(t.type),v;t.isData3DTexture?(Pe.setTexture3D(t,0),v=B.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Pe.setTexture2DArray(t,0),v=B.TEXTURE_2D_ARRAY):(Pe.setTexture2D(t,0),v=B.TEXTURE_2D),V.activeTexture(B.TEXTURE0),V.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,t.flipY),V.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),V.pixelStorei(B.UNPACK_ALIGNMENT,t.unpackAlignment);let y=V.getParameter(B.UNPACK_ROW_LENGTH),b=V.getParameter(B.UNPACK_IMAGE_HEIGHT),x=V.getParameter(B.UNPACK_SKIP_PIXELS),S=V.getParameter(B.UNPACK_SKIP_ROWS),C=V.getParameter(B.UNPACK_SKIP_IMAGES);V.pixelStorei(B.UNPACK_ROW_LENGTH,h.width),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,h.height),V.pixelStorei(B.UNPACK_SKIP_PIXELS,l),V.pixelStorei(B.UNPACK_SKIP_ROWS,u),V.pixelStorei(B.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=U.get(e),r=U.get(t),h=U.get(n.__renderTarget),g=U.get(r.__renderTarget);V.bindFramebuffer(B.READ_FRAMEBUFFER,h.__webglFramebuffer),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,U.get(e).__webglTexture,i,d+n),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,U.get(t).__webglTexture,a,m+n)),B.blitFramebuffer(l,u,o,s,f,p,o,s,B.DEPTH_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||U.has(e)){let n=U.get(e),r=U.get(t);V.bindFramebuffer(B.READ_FRAMEBUFFER,F),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,I);for(let e=0;e<c;e++)w?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,n.__webglTexture,i),T?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,r.__webglTexture,a),i===0?T?B.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):B.copyTexSubImage2D(v,a,f,p,l,u,o,s):B.blitFramebuffer(l,u,o,s,f,p,o,s,B.COLOR_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?B.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h);V.pixelStorei(B.UNPACK_ROW_LENGTH,y),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,b),V.pixelStorei(B.UNPACK_SKIP_PIXELS,x),V.pixelStorei(B.UNPACK_SKIP_ROWS,S),V.pixelStorei(B.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&B.generateMipmap(v),V.unbindTexture()},this.initRenderTarget=function(e){U.get(e).__webglFramebuffer===void 0&&Pe.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Pe.setTextureCube(e,0):e.isData3DTexture?Pe.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Pe.setTexture2DArray(e,0):Pe.setTexture2D(e,0),V.unbindTexture()},this.resetState=function(){L=0,te=0,R=null,V.reset(),it.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ae}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Fe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Fe._getUnpackColorSpace()}},qo=class e{constructor(t,n,r,i,a=`div`){this.parent=t,this.object=n,this.property=r,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(a),this.domElement.classList.add(`lil-controller`),this.domElement.classList.add(i),this.$name=document.createElement(`div`),this.$name.classList.add(`lil-name`),e.nextNameID=e.nextNameID||0,this.$name.id=`lil-gui-name-${++e.nextNameID}`,this.$widget=document.createElement(`div`),this.$widget.classList.add(`lil-widget`),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener(`keydown`,e=>e.stopPropagation()),this.domElement.addEventListener(`keyup`,e=>e.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(r)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled||(this._disabled=e,this.domElement.classList.toggle(`lil-disabled`,e),this.$disable.toggleAttribute(`disabled`,e)),this}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},Jo=class extends qo{constructor(e,t,n){super(e,t,n,`lil-boolean`,`label`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`checkbox`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener(`change`,()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function Yo(e){let t,n;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?n=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?n=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(n=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),n?`#`+n:!1}var Xo={isPrimitive:!0,match:e=>typeof e==`string`,fromHexString:Yo,toHexString:Yo},Zo={isPrimitive:!0,match:e=>typeof e==`number`,fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>`#`+e.toString(16).padStart(6,0)},Qo=[Xo,Zo,{isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,n=1){let r=Zo.fromHexString(e);t[0]=(r>>16&255)/255*n,t[1]=(r>>8&255)/255*n,t[2]=(r&255)/255*n},toHexString([e,t,n],r=1){r=255/r;let i=e*r<<16^t*r<<8^(n*r|0);return Zo.toHexString(i)}},{isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,n=1){let r=Zo.fromHexString(e);t.r=(r>>16&255)/255*n,t.g=(r>>8&255)/255*n,t.b=(r&255)/255*n},toHexString({r:e,g:t,b:n},r=1){r=255/r;let i=e*r<<16^t*r<<8^(n*r|0);return Zo.toHexString(i)}}];function $o(e){return Qo.find(t=>t.match(e))}var es=class extends qo{constructor(e,t,n,r){super(e,t,n,`lil-color`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`color`),this.$input.setAttribute(`tabindex`,-1),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$text=document.createElement(`input`),this.$text.setAttribute(`type`,`text`),this.$text.setAttribute(`spellcheck`,`false`),this.$text.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=$o(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener(`input`,()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$text.addEventListener(`input`,()=>{let e=Yo(this.$text.value);e&&this._setValueFromHexString(e)}),this.$text.addEventListener(`focus`,()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener(`blur`,()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},ts=class extends qo{constructor(e,t,n){super(e,t,n,`lil-function`),this.$button=document.createElement(`button`),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener(`click`,e=>{e.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$disable=this.$button}},ns=class extends qo{constructor(e,t,n,r,i,a){super(e,t,n,`lil-number`),this._initInput(),this.min(r),this.max(i);let o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+`%`}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),window.matchMedia(`(pointer: coarse)`).matches&&(this.$input.setAttribute(`type`,`number`),this.$input.setAttribute(`step`,`any`)),this.$widget.appendChild(this.$input),this.$disable=this.$input;let e=()=>{let e=parseFloat(this.$input.value);isNaN(e)||(this._stepExplicit&&(e=this._snap(e)),this.setValue(this._clamp(e)))},t=e=>{let t=parseFloat(this.$input.value);isNaN(t)||(this._snapClampSetValue(t+e),this.$input.value=this.getValue())},n=e=>{e.key===`Enter`&&this.$input.blur(),e.code===`ArrowUp`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e))),e.code===`ArrowDown`&&(e.preventDefault(),t(this._step*this._arrowKeyMultiplier(e)*-1))},r=e=>{this._inputFocused&&(e.preventDefault(),t(this._step*this._normalizeMouseWheel(e)))},i=!1,a,o,s,c,l,u=e=>{a=e.clientX,o=s=e.clientY,i=!0,c=this.getValue(),l=0,window.addEventListener(`mousemove`,d),window.addEventListener(`mouseup`,f)},d=e=>{if(i){let t=e.clientX-a,n=e.clientY-o;Math.abs(n)>5?(e.preventDefault(),this.$input.blur(),i=!1,this._setDraggingStyle(!0,`vertical`)):Math.abs(t)>5&&f()}if(!i){let t=e.clientY-s;l-=t*this._step*this._arrowKeyMultiplier(e),c+l>this._max?l=this._max-c:c+l<this._min&&(l=this._min-c),this._snapClampSetValue(c+l)}s=e.clientY},f=()=>{this._setDraggingStyle(!1,`vertical`),this._callOnFinishChange(),window.removeEventListener(`mousemove`,d),window.removeEventListener(`mouseup`,f)};this.$input.addEventListener(`input`,e),this.$input.addEventListener(`keydown`,n),this.$input.addEventListener(`wheel`,r,{passive:!1}),this.$input.addEventListener(`mousedown`,u),this.$input.addEventListener(`focus`,()=>{this._inputFocused=!0}),this.$input.addEventListener(`blur`,()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()})}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement(`div`),this.$slider.classList.add(`lil-slider`),this.$fill=document.createElement(`div`),this.$fill.classList.add(`lil-fill`),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add(`lil-has-slider`);let e=(e,t,n,r,i)=>(e-t)/(n-t)*(i-r)+r,t=t=>{let n=this.$slider.getBoundingClientRect(),r=e(t,n.left,n.right,this._min,this._max);this._snapClampSetValue(r)},n=e=>{this._setDraggingStyle(!0),t(e.clientX),window.addEventListener(`mousemove`,r),window.addEventListener(`mouseup`,i)},r=e=>{t(e.clientX)},i=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`mousemove`,r),window.removeEventListener(`mouseup`,i)},a=!1,o,s,c=e=>{e.preventDefault(),this._setDraggingStyle(!0),t(e.touches[0].clientX),a=!1},l=e=>{e.touches.length>1||(this._hasScrollBar?(o=e.touches[0].clientX,s=e.touches[0].clientY,a=!0):c(e),window.addEventListener(`touchmove`,u,{passive:!1}),window.addEventListener(`touchend`,d))},u=e=>{if(a){let t=e.touches[0].clientX-o,n=e.touches[0].clientY-s;Math.abs(t)>Math.abs(n)?c(e):(window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d))}else e.preventDefault(),t(e.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener(`touchmove`,u),window.removeEventListener(`touchend`,d)},f=this._callOnFinishChange.bind(this),p;this.$slider.addEventListener(`mousedown`,n),this.$slider.addEventListener(`touchstart`,l,{passive:!1}),this.$slider.addEventListener(`wheel`,e=>{if(Math.abs(e.deltaX)<Math.abs(e.deltaY)&&this._hasScrollBar)return;e.preventDefault();let t=this._normalizeMouseWheel(e)*this._step;this._snapClampSetValue(this.getValue()+t),this.$input.value=this.getValue(),clearTimeout(p),p=setTimeout(f,400)},{passive:!1})}_setDraggingStyle(e,t=`horizontal`){this.$slider&&this.$slider.classList.toggle(`lil-active`,e),document.body.classList.toggle(`lil-dragging`,e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},rs=class extends qo{constructor(e,t,n,r){super(e,t,n,`lil-option`),this.$select=document.createElement(`select`),this.$select.setAttribute(`aria-labelledby`,this.$name.id),this.$display=document.createElement(`div`),this.$display.classList.add(`lil-display`),this.$select.addEventListener(`change`,()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener(`focus`,()=>{this.$display.classList.add(`lil-focus`)}),this.$select.addEventListener(`blur`,()=>{this.$display.classList.remove(`lil-focus`)}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(e=>{let t=document.createElement(`option`);t.textContent=e,this.$select.appendChild(t)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},is=class extends qo{constructor(e,t,n){super(e,t,n,`lil-string`),this.$input=document.createElement(`input`),this.$input.setAttribute(`type`,`text`),this.$input.setAttribute(`spellcheck`,`false`),this.$input.setAttribute(`aria-labelledby`,this.$name.id),this.$input.addEventListener(`input`,()=>{this.setValue(this.$input.value)}),this.$input.addEventListener(`keydown`,e=>{e.code===`Enter`&&this.$input.blur()}),this.$input.addEventListener(`blur`,()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},as=`.lil-gui {
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
}`;function os(e){let t=document.createElement(`style`);t.innerHTML=e;let n=document.querySelector(`head link[rel=stylesheet], head style`);n?document.head.insertBefore(t,n):document.head.appendChild(t)}var ss=!1,cs=class e{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:r,title:i=`Controls`,closeFolders:a=!1,injectStyles:o=!0,touchStyles:s=!0}={}){this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement(`div`),this.domElement.classList.add(`lil-gui`),this.$title=document.createElement(`button`),this.$title.classList.add(`lil-title`),this.$title.setAttribute(`aria-expanded`,!0),this.$title.addEventListener(`click`,()=>this.openAnimated(this._closed)),this.$title.addEventListener(`touchstart`,()=>{},{passive:!0}),this.$children=document.createElement(`div`),this.$children.classList.add(`lil-children`),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(i),this.parent?(this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement)):(this.domElement.classList.add(`lil-root`),s&&this.domElement.classList.add(`lil-allow-touch-styles`),!ss&&o&&(os(as),ss=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add(`lil-auto-place`,`autoPlace`),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty(`--width`,r+`px`),this._closeFolders=a)}add(e,t,n,r,i){if(Object(n)===n)return new rs(this,e,t,n);let a=e[t];switch(typeof a){case`number`:return new ns(this,e,t,n,r,i);case`boolean`:return new Jo(this,e,t);case`string`:return new is(this,e,t);case`function`:return new ts(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new es(this,e,t,n)}addFolder(t){let n=new e({parent:this,title:t});return this.root._closeFolders&&n.close(),n}load(e,t=!0){return e.controllers&&this.controllers.forEach(t=>{t instanceof ts||t._name in e.controllers&&t.load(e.controllers[t._name])}),t&&e.folders&&this.folders.forEach(t=>{t._title in e.folders&&t.load(e.folders[t._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(e=>{if(!(e instanceof ts)){if(e._name in t.controllers)throw Error(`Cannot save GUI with duplicate property "${e._name}"`);t.controllers[e._name]=e.save()}}),e&&this.folders.forEach(e=>{if(e._title in t.folders)throw Error(`Cannot save GUI with duplicate folder "${e._title}"`);t.folders[e._title]=e.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),this.domElement.classList.toggle(`lil-closed`,this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?`none`:``,this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute(`aria-expanded`,!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+`px`,this.domElement.classList.add(`lil-transition`);let n=e=>{e.target===this.$children&&(this.$children.style.height=``,this.domElement.classList.remove(`lil-transition`),this.$children.removeEventListener(`transitionend`,n))};this.$children.addEventListener(`transitionend`,n);let r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle(`lil-closed`,!e),requestAnimationFrame(()=>{this.$children.style.height=r+`px`})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(e=>e.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}},ls=`#4cd18a`;function us(e){if(e<=4)return ls;let t=Math.min(Math.max((e-4)/3,0),1);return`hsl(${Math.round(50-46*t)}, 100%, ${Math.round(58-4*t)}%)`}function ds(e){let t=Math.min(Math.max((e-1)/2,0),1);return`hsl(${Math.round(265-5*t)}, ${Math.round(80+10*t)}%, ${Math.round(80-26*t)}%)`}function fs(e,t,n){let r=Math.max(0,e);for(let e=1;e<n.length;e++){let i=n[e-1]*t,a=n[e]*t;if(r<=a)return e-1+(a>i?(r-i)/(a-i):1)}return n.length-1}function ps(e,t,n){let r=Math.min(Math.max(e,0),n.length-1),i=Math.min(Math.floor(r),n.length-2);return(n[i]+(n[i+1]-n[i])*(r-i))*t}var ms=36,hs=9,gs=.02,_s=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},vs=e=>_s(-.004,.02,e);function ys(e,t){let n=-1/0;for(let r=0;r<e.length;r++){let[i,a]=e[r],[o,s]=e[(r+1)%e.length];(i-t)*(o-t)<=0&&i!==o&&(n=Math.max(n,a+(s-a)*(t-i)/(o-i)))}return n}var bs=`
attribute float aH; varying vec3 vN, vW; varying float vH;
void main() {
vH = aH; vec3 n = normalize(normal);
vec4 w = modelMatrix * vec4(position + n * aH, 1.0);
vW = w.xyz; vN = normalize(mat3(modelMatrix) * n);
gl_Position = projectionMatrix * viewMatrix * w;
}`,xs=`
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
}`,Ss=class{constructor(e,t){let n=e.spec.L,r=-n/2+.03;this.dz=(-.9-r)/35,this.H=new Float32Array(324),this.hw=new Float32Array(ms);let i=[],a=[];for(let t=0;t<ms;t++){let a=r+t*this.dz,o=e.ring((a+n/2)/n),s=0;for(let[e]of o)s=Math.max(s,e);let c=.92*s;this.hw[t]=c;for(let e=0;e<hs;e++){let t=(-1+2*e/8)*c,n=ys(o,t);i.push(t,Number.isFinite(n)?n+.002:.3,a)}}for(let e=0;e<35;e++)for(let t=0;t<8;t++){let n=e*hs+t,r=n+1,i=n+hs,o=i+1;a.push(n,i,r,r,i,o)}let o=new be;o.setAttribute(`position`,new j(i,3)),o.setIndex(a),o.computeVertexNormals(),this.attr=new qe(new Float32Array(324),1),this.attr.setUsage(N),o.setAttribute(`aH`,this.attr);let s=new k({uniforms:{uSunDir:t.uSunDir,uSunT:t.uSunT},vertexShader:bs,fragmentShader:xs,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});this.mesh=new he(o,s),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.mesh.visible=!1}total(){let e=0;for(let t=0;t<this.H.length;t++)e+=this.H[t];return e}update(e,t){let n=this.H,r=vs(t.bury??-1),i=Math.max(t.u??0,0),a=r*(.04+.012*i)+(t.plunge??0)*.05;if(a>0)for(let t=0;t<10;t++)for(let r=1;r<8;r++){let i=Math.abs(-1+2*r/8),o=(1-t/10)*(1-.6*i);n[t*hs+r]=Math.min(gs,n[t*hs+r]+a*o*e)}let o=Math.min(.9,(.5+.35*i)*e/this.dz);for(let e=35;e>0;e--)for(let t=0;t<hs;t++)n[e*hs+t]+=o*(n[(e-1)*hs+t]-n[e*hs+t]);for(let e=0;e<hs;e++)n[e]*=1-o;for(let t=0;t<ms;t++){let r=t*hs,i=new Float32Array(hs);for(let t=0;t<hs;t++){let a=Math.abs(t-4)/4,o=1+5*a*a;i[t]=n[r+t]*Math.min(.9,o*e)}for(let e=0;e<hs;e++){let t=i[e];if(n[r+e]-=t,e===4)n[r+e-1]+=t/2,n[r+e+1]+=t/2;else{let i=e+Math.sign(e-4);i>=0&&i<hs&&(n[r+i]+=t)}}}let s=Math.exp(-e/3);for(let e=0;e<n.length;e++)n[e]=n[e]*s<1e-5?0:n[e]*s}upload(){this.attr.array.set(this.H),this.attr.needsUpdate=!0,this.mesh.visible=this.total()>2e-4}},Cs=19.62,Z=96,ws=14,Ts=5,Es=3,Ds=4320*Ts,Os=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},ks=`attribute float aA; attribute vec2 aUv; attribute float aSeed; varying float vA; varying vec2 vUv; varying float vSeed; varying vec3 vWorld; varying vec3 vN;
void main() { vA = aA; vUv = aUv; vSeed = aSeed; vN = normal; vWorld = position; gl_Position = projectionMatrix * viewMatrix * vec4(position, 1.0); }`,As=`uniform vec3 uSunDir; uniform float uSunT; varying float vA; varying vec2 vUv; varying float vSeed; varying vec3 vWorld; varying vec3 vN;
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
}`,js=class{constructor(e,t){this.sheets=Array.from({length:Z},()=>({on:!1,wasOn:!0})),this.pos=new Float32Array(Ds*3),this.nrm=new Float32Array(Ds*3),this.alpha=new Float32Array(Ds),this.uv=new Float32Array(Ds*2),this.seed=new Float32Array(Ds);let n=[];for(let e=0;e<288;e++)for(let t=0;t<ws;t++)for(let r=0;r<4;r++){let i=(e*15+t)*Ts+r,a=i+Ts;n.push(i,i+1,a,i+1,a+1,a)}for(let e=0;e<288;e++)for(let t=0;t<=ws;t++)for(let n=0;n<Ts;n++){let r=(e*15+t)*Ts+n;this.uv[2*r]=n/4,this.uv[2*r+1]=t/ws}let r=new be;r.setAttribute(`position`,new qe(this.pos,3)),r.setAttribute(`normal`,new qe(this.nrm,3)),this.alphaAttr=new qe(this.alpha,1),this.seedAttr=new qe(this.seed,1),r.setAttribute(`aA`,this.alphaAttr),r.setAttribute(`aUv`,new qe(this.uv,2)),r.setAttribute(`aSeed`,this.seedAttr),r.setIndex(n),this.mat=new k({uniforms:{uSunDir:t.uSunDir,uSunT:t.uSunT},transparent:!0,depthWrite:!1,side:2,vertexShader:ks,fragmentShader:As}),this.mesh=new he(r,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=6,e.add(this.mesh),this.accV=0,this.accD=0,this.next=0,this.clock=0}_emit(e,t){let n=-1;for(let e=0;e<Z;e++){let t=(this.next+e)%Z;if(!this.sheets[t].on){n=t;break}}if(n<0){this.dropped=(this.dropped??0)+1;return}this.next=(n+1)%Z;let r=this.sheets[n],i=e.v[0],a=e.v[2],o=Math.hypot(i,a)||1,s=Math.random;Object.assign(r,e,{axis:[-a/o,0,i/o],on:!0,wasOn:!0,age:0});for(let e=0;e<Es;e++){let t=s()*40;for(let r=0;r<=ws;r++)for(let i=0;i<Ts;i++)this.seed[((n*Es+e)*15+r)*Ts+i]=t}this.seedAttr.needsUpdate=!0}update(e,t){if(!(e>0))return;this.clock+=e;let n=Math.random,r=t.amount??1,i=Math.max(t.encounter,.4),a=Math.max(t.u,.5),o=-t.fz,s=t.fx;if(r>0&&t.on&&!t.mesh){let c=Math.min(1,Math.max(0,t.bury)/.35),l=Math.min(1.5,.45+i/4),u=t.buryBottom??(t.bury??-1)+.28,d=vs(u),f=Os(.02,.3,u);this.accV+=r*(t.spray+(.22*d+.18*f)*Math.min(1.6,a/3))*e*22;let p=Math.min(3,Math.floor(this.accV));for(this.accV-=p;p-->0;)for(let e of[-1,1]){let r=(1.3+1.4*n())*l,u=Math.min(6.8,(1.6+i*.95+2.2*c)*(.85+.3*n())),d=(.62+.12*n())*a,f=.9*n(),p=(t.hullHalfWidth?t.hullHalfWidth(f):.1)+.02;this._emit({p:[t.x-t.fx*f+o*e*p,t.y+.02,t.z-t.fz*f+s*e*p],v:[t.fx*d+o*r*e,u,t.fz*d+s*r*e],cup:[o*e*.5,-.6,s*e*.5],w0:.5+.3*n(),spread:2.4*l,curv:.25,len:.5,life:.65+.4*n()+.25*c,a0:.72},t)}this.accD+=r*t.plunge*e*(4+6*c);let m=Math.min(2,Math.floor(this.accD));for(this.accD-=m;m-->0;)for(let e of[-1,1]){let r=1.8+1.2*n()+.5*c,l=Math.min(7,3.2+1.6*t.plunge+1.2*n()+.4*i);this._emit({p:[t.x-t.fx*.15+o*e*.05,t.y+.05,t.z-t.fz*.15+s*e*.05],v:[t.fx*.45*a+o*r*e,l,t.fz*.45*a+s*r*e],cup:[o*e*.5,-.6,s*e*.5],w0:.35+.15*n(),spread:1.3+.9*c,curv:.25,len:.5,life:.7+.35*n(),a0:.74},t)}}this._sheets(e,t.waterY??-1e3)}blade(e,t){if(!(e>0)||!(t.amount>0)||!(t.level>0))return;let n=Math.random,r=Math.min(3,t.level),i=Math.round(r),a=Math.max(t.u,.5),o=-t.fz,s=t.fx,c=t.side,l=Math.min(1.6,a/3);this.accBS=(this.accBS??0)+t.amount*e*l*[0,4,7,6][i];let u=Math.min(2,Math.floor(this.accBS));for(this.accBS-=u;u-->0;){let e=(.6+.9*n())*(i>2?1.2:1),r=(i>2?1.4:2+.5*i)*(.8+.4*n())*Math.min(1.4,.6+l*.5);this._emit({p:[t.x,t.y+.01,t.z],v:[t.fx*.35*a+o*c*e,r,t.fz*.35*a+s*c*e],cup:[o*c*.5,-.6,s*c*.5],w0:.18+.08*i+.1*n(),spread:.9+.35*i,curv:.25,len:.45,life:.45+.3*n(),a0:.5+.08*i},t)}}_sheets(e,t){let n=this.clock;for(let r=0;r<Z;r++){let i=this.sheets[r];if(i.on&&(i.age+=e,i.age>=i.life&&(i.on=!1)),!i.on){if(i.wasOn){let e=r*Es*15*Ts;this.alpha.fill(0,e,e+225),i.wasOn=!1}continue}let a=1-i.age/i.life,[o,s,c]=i.cup;for(let e=0;e<=ws;e++){let l=Math.max(0,i.age-i.len*(ws-e)/ws),u=i.p[0]+i.v[0]*l,d=i.p[1]+i.v[1]*l-.5*Cs*l*l,f=i.p[2]+i.v[2]*l,p=i.v[0],m=i.v[1]-Cs*l,h=i.v[2],g=Math.hypot(p,m,h)||1;p/=g,m/=g,h/=g;let _=m*i.axis[2]-h*i.axis[1],v=h*i.axis[0]-p*i.axis[2],y=p*i.axis[1]-m*i.axis[0],b=Math.hypot(_,v,y)||1;_/=b,v/=b,y/=b;let x=(i.w0+i.spread*l)*.5,S=d<t-.02?0:1,C=Math.min(1,Math.max(.2,(d-t)/.15)),w=Math.min(1,.3+.7*(1-e/ws)+.2),T=.015+.05*l;for(let p=0;p<Es;p++){let m=((r*Es+p)*15+e)*Ts,h=(p-1)*T;for(let e=0;e<Ts;e++){let r=e/4*2-1,p=i.curv*x*r*r,g=.03*Math.sin(7*l+4*r+this.seed[m]+n*3)*Math.min(1,l*3)+h,b=(m+e)*3,T=d+s*p+v*g;T<t&&(T=t),this.pos[b]=u+i.axis[0]*r*x+o*p+_*g,this.pos[b+1]=T,this.pos[b+2]=f+i.axis[2]*r*x+c*p+y*g,this.nrm[b]=_,this.nrm[b+1]=v,this.nrm[b+2]=y,this.alpha[m+e]=i.a0*a*a*w*S*C*.4833333333333333}}}}this.alphaAttr.needsUpdate=!0,this.mesh.geometry.attributes.position.needsUpdate=!0,this.mesh.geometry.attributes.normal.needsUpdate=!0}},Ms=1024,Ns={w:100,h:128},Ps=[0,128,512,128],Fs=[512,128,512,128],Is={none:0,block:1,swoosh:2,speed:3,deck:4,tips:5,chevrons:6,fade:7,checks:8},Ls=[Is.block,Is.swoosh,Is.speed,Is.deck,Is.tips,Is.chevrons,Is.fade,Is.checks],Rs=`varying vec3 vHN;
uniform vec4 uDecA;
uniform vec3 uDecNum;
uniform vec3 uDecC1, uDecC2;
uniform sampler2D uDecTex;
float decAtlas(vec4 r, vec2 uv) {
if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0;
return texture2D(uDecTex, vec2((r.x + uv.x * r.z) / ${Ms}.0, 1.0 - (r.y + (1.0 - uv.y) * r.w) / 384.0)).a;
}
float decNumber(vec2 ab, float h) {
float L = uDecA.z, dw = h * 0.72, tot = dw * L, a = ab.x + tot * 0.5;
if (L < 0.5 || a < 0.0 || a >= tot || abs(ab.y) > h * 0.5) return 0.0;
float idx = floor(a / dw), d = uDecNum[int(3.0 - L + idx)];
return decAtlas(vec4(d * ${Ns.w}.0, 0.0, ${Ns.w}.0, ${Ns.h}.0), vec2(fract(a / dw), ab.y / h + 0.5));
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
`,zs=e=>`vec4(${e.map(e=>e.toFixed(1)).join(`,`)})`,Bs=`
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
    float lg = decLogo(${zs(Ps)}, vec2(z + 1.2, hp.x + 0.085), 0.045) * step(hp.x, 0.0) * deckUp;
    lg = max(lg, decLogo(${zs(Fs)}, vec2(-(z + 1.2), -(hp.x - 0.085)), 0.045) * step(0.0, hp.x) * deckUp);
    diffuseColor.rgb = mix(diffuseColor.rgb, ink, clamp(max(nm, lg), 0.0, 1.0) * uDecA.y * step(0.5, uDecA.x));
  }
`;function Vs(){let e=document.createElement(`canvas`);e.width=Ms,e.height=384;let t=e.getContext(`2d`);t.fillStyle=`#fff`,t.textAlign=`center`,t.textBaseline=`middle`,t.font=`800 112px "Arial Black", "Helvetica Neue", Arial, sans-serif`;for(let e=0;e<10;e++)t.fillText(String(e),e*Ns.w+Ns.w/2,Ns.h/2+4);Hs(t);let n=new Qe(e);return n.colorSpace=``,n.anisotropy=4,n.generateMipmaps=!0,n.minFilter=Ye,Ws(t,n),n}function Hs(e){let[t,n,r,i]=Ps,[a,o,s,c]=Fs;e.clearRect(t,n,r,i),e.clearRect(a,o,s,c),e.fillStyle=`#fff`,e.font=`italic 600 70px Georgia, "Times New Roman", serif`,e.fillText(`Ocean Flight`,t+r/2,n+i/2),e.font=`800 62px "Arial Black", Arial, sans-serif`,e.fillText(`BALLARD ELKS`,a+s/2,o+c/2)}var Us=new Set(``.split(`,`).filter(Boolean));function Ws(e,t){for(let[n,r]of[[`ocean-flight.png`,Ps],[`ballard-elks.png`,Fs]].filter(([e])=>Us.has(e))){let i=new Image;i.onload=()=>{let[n,a,o,s]=r,c=Math.min(o/i.width,s/i.height),l=i.width*c,u=i.height*c;e.clearRect(n,a,o,s),e.globalCompositeOperation=`source-over`,e.drawImage(i,n+(o-l)/2,a+(s-u)/2,l,u),t.needsUpdate=!0},i.src=`./decals/${n}`}}var Gs=[741288,13115439,1316893,15909376,692074,16738835,16054008],Ks=e=>(.299*(e>>16&255)+.587*(e>>8&255)+.114*(e&255))/255,qs=(e,t)=>Math.hypot((e>>16&255)-(t>>16&255),(e>>8&255)-(t>>8&255),(e&255)-(t&255));function Js(e,t=0,n=null,r=null){r??=[Is.swoosh,Is.block,Is.speed][(t%3+3)%3];let i=Gs.map(t=>({c:t,d:qs(t,e)})).filter(e=>e.d>120).sort((e,t)=>t.d-e.d),a=i.slice(0,Math.max(2,Math.min(4,i.length))),o=(a[(t*7%a.length+a.length)%a.length]??{c:1316893}).c,s=Ks(o)>.5?1316893:16054008,c=n??[7,12,27,41,58,66,83,95,104][(t%9+9)%9];return{style:r,c1:o,c2:s,number:Math.max(0,Math.min(999,Math.round(c)))}}function Ys(e){let t=Math.max(0,Math.min(999,Math.round(e))),n=t>=100?3:t>=10?2:1;return{digits:[Math.floor(t/100)%10,Math.floor(t/10)%10,t%10],len:n}}var Xs=Rs+`varying vec3 vHL;
uniform vec3 uGSeed; uniform float uGel;
float ghash(vec3 p) { p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float gnoise(vec3 x) {
vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
return mix(mix(mix(ghash(i), ghash(i + vec3(1, 0, 0)), f.x), mix(ghash(i + vec3(0, 1, 0)), ghash(i + vec3(1, 1, 0)), f.x), f.y),
mix(mix(ghash(i + vec3(0, 0, 1)), ghash(i + vec3(1, 0, 1)), f.x), mix(ghash(i + vec3(0, 1, 1)), ghash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}
`,Zs=Bs+`
  float gRough = 0.0;
  if (uGel > 0.0) {
    float g1 = gnoise(vHL * vec3(5.0, 5.0, 2.2) + uGSeed * 11.0), g2 = gnoise(vHL * vec3(21.0, 21.0, 8.0) + uGSeed * 13.0), g3 = gnoise(vHL * vec3(75.0, 75.0, 40.0) + uGSeed * 17.0), g4 = gnoise(vHL * 230.0 + uGSeed * 19.0);
    float cloud = g1 * 0.5 + g2 * 0.35 + g3 * 0.15, peel = g4 - 0.5;
    vec3 sp = floor(vHL * 150.0); float spk = step(0.992, ghash(sp + uGSeed * 23.0));
    float lum = 1.0 + uGel * (0.11 * (cloud - 0.5) + 0.035 * peel - 0.12 * spk);
    diffuseColor.rgb = mix(diffuseColor.rgb * lum, vec3(1.0), uGel * 0.07 * smoothstep(0.55, 0.8, cloud));
    gRough = uGel * (0.55 * (cloud - 0.5) + 0.25 * peel);
  }
`,Qs=null;function $s(e){Qs=e}function ec(e,t=Math.random){let n={uGel:{value:0},uGSeed:{value:new $e(t()*50,t()*50,t()*50)},uDecA:{value:new Ce(0,0,0,0)},uDecNum:{value:new $e},uDecC1:{value:new Ve(741288)},uDecC2:{value:new Ve(16054008)},uDecTex:{value:null}},r=e.onBeforeCompile,i=r!==Ue.prototype.onBeforeCompile,a=i?e.customProgramCacheKey.bind(e):null;return e.onBeforeCompile=(t,a)=>{i&&r.call(e,t,a),Object.assign(t.uniforms,n),t.vertexShader=`varying vec3 vHL;
varying vec3 vHN;
`+t.vertexShader.replace(`#include <begin_vertex>`,`#include <begin_vertex>
  vHL = position; vHN = normal;`),t.fragmentShader=Xs+t.fragmentShader.replace(`#include <color_fragment>`,`#include <color_fragment>
`+Zs).replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>
  roughnessFactor = clamp(roughnessFactor * (1.0 + gRough), 0.05, 1.0);
`)},e.customProgramCacheKey=()=>`gelcoat2-decals${a?`|`+a():``}`,Qs&&Fn(e,Qs),e.needsUpdate=!0,n}var tc=null,nc=()=>tc??=Vs(),rc=class{constructor(e,t=Math.random){this.u=ec(e.material,t)}setAmount(e){this.u.uGel.value=e}setLook(e){let t=this.u,n=Ys(e.number);this.look=e,t.uDecA.value.set(e.style,t.uDecA.value.y,n.len,0),t.uDecNum.value.set(...n.digits),t.uDecC1.value.setHex(e.c1),t.uDecC2.value.setHex(e.c2)}setDecalAmount(e){let t=this.u,n=e>0&&this.look;t.uDecA.value.y=n?e:0,n&&!t.uDecTex.value&&typeof document<`u`&&(t.uDecTex.value=nc())}},ic=.7,ac=.45,oc=5.5,sc=.7,cc=2.4,lc=.15,uc=.04,dc=1.1,fc=.8,pc=.25,mc=.55,hc=19.62,gc=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},_c=.04;function vc(e,t,n){let r=e.spec.L,i=Math.min(1,Math.max(0,(t+r/2)/r)),a=e.base+e.keelRel(i),o=e.base+e.deckRel(i),s=Math.min(1,Math.max(0,(n-a)/Math.max(o-a,1e-6)));return e.halfWidth(i)*e.profile(s,e.bottomK(i),t)}function yc(e,t,n){let r=.02,i=.2,a=(vc(e,t,n+r)-vc(e,t,n-r))/(2*r),o=(vc(e,t+i,n)-vc(e,t-i,n))/(2*i),s=-a,c=-o,l=Math.hypot(1,s,c);return[1/l,s/l,c/l]}function bc(e){let{boat:t,z:n,side:r}=e,i=t.base+.1;for(let a=0;a<2;a++){let a=r*vc(t,n,i),o=e.toWorld([a,i,n]),s=e.water(o[0],o[2]);i=e.toLocalY([o[0],s.h,o[2]])}let a=Math.min(1,Math.max(0,(n+t.spec.L/2)/t.spec.L)),o=t.base+t.keelRel(a),s=t.base+t.deckRel(a),c=+(i>o+.003&&i<s),l=Math.min(Math.max(i,o+.003),s-.003),u=r*vc(t,n,l),d=yc(t,n,l),f=e.rotate([r*d[0],d[1],d[2]]),p=e.toWorld([u,l,n]),m=e.water(p[0],p[2]),h=typeof e.hullV==`function`?e.hullV(n):e.hullV,g=[m.ve-h[0],m.vu-h[1],m.vs-h[2]],_=Math.hypot(h[0],h[2]),v=-(g[0]*f[0]+g[2]*f[2]),y=Math.hypot(g[0],g[2]),b=gc(pc,mc,Math.abs(v)/Math.max(y,.3)),x=-g[1]*f[1]+b*v,S=typeof e.slope==`function`?e.slope(n):[0,0],C=Math.hypot(S[0],1,S[1]),w=Math.max(0,(-S[0]*g[0]+g[1]-S[1]*g[2])/C),T=Math.hypot(f[0],f[2]),E=Math.max(Math.abs(f[1]),.05)/Math.max(T,.001),D=f[1]<0?Math.min(4,Math.PI/2/E)*w*gc(sc,cc,w):0,O=T>.001?f[0]/T:0,k=T>.001?f[2]/T:0,A=Math.max(0,-(g[0]*O+g[2]*k)),j=_>.2?Math.min(1,Math.abs((h[0]*O+h[2]*k)/_)):1,M=Math.max(j/Math.sqrt(Math.max(1-j*j,1e-4)),.05),N=c&&f[1]<.5?lc*Math.max(0,Math.min(4,Math.PI/2/M)-1.5)*A*b:0,P=c?Math.max(0,x)+_c*_*Math.abs(d[2])+(D+N)/1.5:0,F=T>.001?[f[0]/T,0,f[2]/T]:[0,0,0],I=Math.hypot(g[0],g[2]),ee=Math.exp(-Math.max(0,n+t.spec.L/2)/dc),L=c?uc*(e.bowGain??1)*I*I/19.62*ee*gc(7,11,I):0,te=Math.sqrt(2*hc*L),R=[m.ve+1.5*(P-(D+N)/1.5)*f[0]+(D+N)*F[0],m.vu+1.5*(P-D/1.5)*f[1],m.vs+1.5*(P-D/1.5)*f[2]+(D+N)*F[2]],ne=R[1]-m.vu,re=Math.hypot(R[0]-m.ve,R[2]-m.vs);return ne<0&&(R[1]=m.vu-ne*ic),R[1]+=ac*re+te,R[0]+=fc*te*F[0],R[2]+=fc*te*F[2],R[1]=m.vu+oc*Math.tanh((R[1]-m.vu)/oc),{y:l,x:u,n:f,impact:P,jet:R,wet:c,head:L,world:p}}var xc=24,Sc=32,Cc=6,wc=2,Tc=448,Ec=.6,Dc=3.5/31,Oc=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},kc=`attribute vec3 aV; attribute vec4 aInfo; attribute vec4 aRest;
uniform float uTime, uG, uLife, uLink; varying vec3 vPos; varying vec2 vRest; varying float vTau, vAmp, vRow, vBirth, vStretch;
void main() {
vBirth = aInfo.x; float tau = uTime - aInfo.x; vTau = tau; vAmp = aInfo.y; vRest = aRest.xy; vRow = aInfo.z;
vStretch = (1.0 + aRest.z * tau) * (1.0 + aRest.w * tau);
vec3 p = position + aV * tau; p.y -= 0.5 * uG * tau * tau; vPos = p;
bool dead = tau < 0.0 || tau > uLife || aInfo.y <= 0.0 || abs(aInfo.x - aInfo.w) > uLink;
gl_Position = dead ? vec4(0.0, 0.0, 2.0, 1.0) : projectionMatrix * viewMatrix * vec4(p, 1.0);
}`,Ac=`uniform float uLife, uSunT, uDbg; uniform vec3 uSunDir; varying vec3 vPos; varying vec2 vRest; varying float vTau, vAmp, vRow, vBirth, vStretch;
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
}`;function jc(e,t){for(let n=0;n<t;n++){let t=e.map(e=>({y:e.y,x:e.x,impact:e.impact,head:e.head,jet:e.jet.slice()}));for(let n=0;n<e.length;n++){let r=t[Math.max(0,n-1)],i=t[n],a=t[Math.min(e.length-1,n+1)],o=e[n];o.y=(r.y+2*i.y+a.y)/4,o.x=(r.x+2*i.x+a.x)/4,o.impact=(r.impact+2*i.impact+a.impact)/4,o.head=(r.head+2*i.head+a.head)/4;for(let e=0;e<3;e++)o.jet[e]=(r.jet[e]+2*i.jet[e]+a.jet[e])/4}}}var Mc=.03,Nc=.02,Pc=class{constructor(e,t,{weight:n=2}={}){let r=xc*Tc;this.pos=new Float32Array(r*3),this.vel=new Float32Array(r*3),this.info=new Float32Array(r*4),this.rest=new Float32Array(r*4);for(let e=0;e<xc;e++)for(let t=0;t<Tc;t++)this.info[(e*Tc+t)*4]=-1e9;let i=[];for(let e=0;e<xc;e++)for(let t=0;t<wc;t++)for(let n=0;n<31;n++)for(let r=0;r<Cc;r++){let a=e*Tc+(t*Sc+n)*7+r,o=a+7;i.push(a,a+1,o,a+1,o+1,o)}let a=new be;a.setAttribute(`position`,new qe(this.pos,3)),a.setAttribute(`aV`,new qe(this.vel,3)),a.setAttribute(`aInfo`,new qe(this.info,4)),a.setAttribute(`aRest`,new qe(this.rest,4)),a.setIndex(i),this.uniforms={uTime:{value:0},uG:{value:9.81*n},uLife:{value:1},uLink:{value:.16},uDbg:{value:+!!new URLSearchParams(location.search).get(`filmdbg`)},uSunDir:t.uSunDir,uSunT:t.uSunT},this.mat=new k({uniforms:this.uniforms,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:2,vertexShader:kc,fragmentShader:Ac});let o=2604;this.LKV=o,this.lpos=new Float32Array(xc*o*3),this.lvel=new Float32Array(xc*o*3),this.linfo=new Float32Array(xc*o*4),this.lrest=new Float32Array(xc*o*4);for(let e=0;e<xc*o;e++)this.linfo[e*4]=-1e9;let s=new be;s.setAttribute(`position`,new qe(this.lpos,3)),s.setAttribute(`aV`,new qe(this.lvel,3)),s.setAttribute(`aInfo`,new qe(this.linfo,4)),s.setAttribute(`aRest`,new qe(this.lrest,4)),this.links=new he(s,this.mat),this.links.frustumCulled=!1,this.links.renderOrder=4,this.links.visible=!1,e.add(this.links),this.mesh=new he(a,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.visible=!1,e.add(this.mesh),this.pending=[],this.gain=[1,1],this.next=0,this.last=-1e9,this.every=.05,this.prevSpawn=null,this.uniforms.uLink.value=this.every*3.2,this.attrs=[`position`,`aV`,`aInfo`,`aRest`]}takeLandings(e){let t=[],n=[];for(let r of this.pending)r.tl<=e?t.length<48&&t.push(r):r.tl<e+3&&n.push(r);return this.pending=n,t}setVisible(e){this.mesh.visible=e,this.links.visible=e}_link(e,t,n,r,i){let a=t*this.LKV,o=(e,t,n,o,s,c)=>{let l=e*Tc+(o*Sc+s)*7+c,u=t*Tc+(o*Sc+s)*7+c,d=this.pos,f=this.vel,p=this.info,m=this.rest,h=this.lpos,g=this.lvel,_=this.linfo,v=this.lrest,y=a*3,b=a*4,x=l*3,S=l*4;h[y]=d[x],h[y+1]=d[x+1],h[y+2]=d[x+2],g[y]=f[x],g[y+1]=f[x+1],g[y+2]=f[x+2],_[b]=p[S],_[b+1]=p[S+1]*+(p[u*4+1]>0),_[b+2]=p[S+2],_[b+3]=p[u*4],v[b]=s*Dc,v[b+1]=n*i*r,v[b+2]=m[S+2],v[b+3]=m[S+3],a++};for(let n=0;n<wc;n++)for(let r=0;r<31;r++)for(let i=0;i<=Cc;i++)o(e,t,0,n,r,i),o(e,t,0,n,r+1,i),o(t,e,1,n,r,i),o(e,t,0,n,r+1,i),o(t,e,1,n,r+1,i),o(t,e,1,n,r,i)}update(e,t){if(this.uniforms.uTime.value=e,e<this.last&&(this.last=e-this.every),e-this.last<this.every||!(t.amount>0))return;this.last=e+(Math.random()-.5)*this.every*.5;let n=this.next,r=this.prevSpawn&&e-this.prevSpawn.t<this.every*2.5?this.prevSpawn.i:-1,i=Math.hypot(t.hullV(0)[0],t.hullV(0)[2]);this.next=(this.next+1)%xc;let a=t.boat.spec.L,o=e=>{let n=t.toWorld([0,0,e]),r=.6;return[(t.water(n[0]+r,n[2]).h-t.water(n[0]-r,n[2]).h)/(2*r),(t.water(n[0],n[2]+r).h-t.water(n[0],n[2]-r).h)/(2*r)]},s=-a/2+.3,c=-a/4,l=.3,u=o(s),d=o(c),f=o(l),p=e=>{let t=e<c?Math.max(0,(e-s)/(c-s)):1+Math.min(1,(e-c)/(l-c)),n=t<1?u:d,r=t<1?d:f,i=t<1?t:t-1;return[n[0]+(r[0]-n[0])*i,n[1]+(r[1]-n[1])*i]};for(let r=0;r<wc;r++){let o=r?-1:1,s=[],c=[];this.gain[r]=Math.min(1.8,Math.max(.45,this.gain[r]+.1*(1-this.gain[r])+(Math.random()-.5)*.25));for(let e=0;e<Sc;e++){let n=Math.min(Ec,-a/2+.02+e*(Ec+a/2-.02)/31);s.push(n),c.push(bc({boat:t.boat,z:n,side:o,toWorld:t.toWorld,toLocalY:t.toLocalY,rotate:t.rotate,water:t.water,hullV:t.hullV,bowGain:this.gain[r],slope:p}))}jc(c,3);for(let a=0;a<Sc;a++){let l=c[a],u=s[a],d=t.amount*Math.max(Oc(.25,1.6,l.impact),.75*Oc(.003,.05,l.head)),f=Math.min(.22,.03+1.5*l.head+.05*l.impact)/Cc;if(a%2==0){let n=c[Math.min(31,a+1)],r=t.toWorld([o*(Math.abs(l.x)+.012),l.y,u]),s=l.jet,d=this.uniforms.uG.value,f=.3;for(let e=0;e<3;e++){let e=t.water(r[0]+s[0]*f,r[2]+s[2]*f).h,n=Math.max(r[1]-e,0);f=Math.min(1.2,(s[1]+Math.sqrt(Math.max(s[1]*s[1]+2*d*n,0)))/d)}let p=Math.min(1,1.2*(l.impact+n.impact)/2+4*(l.head+n.head)/2),m=Nc*Math.min(i,8)*+!!l.wet,h=t.amount*Mc*(p+m);h>1e-4&&this.pending.push({tl:e+f,e:r[0]+s[0]*f,n:-(r[2]+s[2]*f),r:.4+.25*f+.1*Math.hypot(s[0],s[2])*f*.3,a:h})}let p=c[Math.max(0,a-1)].jet,m=c[Math.min(31,a+1)].jet,h=Math.hypot(m[0]-p[0],m[1]-p[1],m[2]-p[2])/(2*Dc),g=.5*Math.hypot(...l.jet)/(Cc*f);for(let i=0;i<=Cc;i++){let s=n*Tc+(r*Sc+a)*7+i,c=l.y+i*f,p=Math.abs(l.x),m=t.toWorld([o*(p+.012),c,u]),_=.75+.5*i/Cc;this.pos.set(m,s*3),this.vel.set([l.jet[0]*_,l.jet[1]*_,l.jet[2]*_],s*3),this.info.set([e,d,i/Cc,e],s*4),this.rest.set([a*Dc,i*f,h,g],s*4)}}}if(r>=0)this._link(r,n,e,e-this.prevSpawn.t,i);else{let e=n*this.LKV;for(let t=0;t<this.LKV;t++)this.linfo[(e+t)*4+1]=0}this.prevSpawn={i:n,t:e};for(let e of this.attrs)this.mesh.geometry.attributes[e].needsUpdate=!0,this.links.geometry.attributes[e].needsUpdate=!0}},Fc=e=>{let t=e>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296},Ic=-3;function Lc(){let e=Fc(2210),t=[],n=(e,t,n,r=[0,0])=>({x:e,y:t,top:n,lean:r});{let e=-716,r=[n(985,e,2.3),n(985,-713.4,2.5),n(985,-710.8,2.2,[.05,0])];t.push({name:`elks-bent`,cx:985,cy:-713.4,piles:r,beams:[{a:[985,e],b:[985,-710.8],h:1.5}],braces:[{a:[985,e,-.2],b:[985,-713.4,1.5]}]})}{let r=[],i=[];for(let t=0;t<11;t++)r.push(n(988+(e()-.5)*.5,-700+t*3+(e()-.5)*.3,2+e()*.5));r[0].lean=[.1,-.08],r[10].lean=[.1,.08],i.push({a:[r[0].x,r[0].y,-.2],b:[r[1].x,r[1].y,1.2]},{a:[r[10].x,r[10].y,-.2],b:[r[9].x,r[9].y,1.2]}),t.push({name:`elks-row`,cx:988,cy:-685,piles:r,beams:[],braces:i})}{let r=-645,i=[];for(let t=0;t<14;t++)i.push(n(992+(e()-.5)*6,r+(t/13-.5)*10+(e()-.5)*1.5,1.6+e()*1.8,[(e()-.5)*.06,(e()-.5)*.06]));for(let t=0;t<5;t++)i.push(n(992+(e()-.5)*3,-638+t*2.6+e(),.9+e()*.8));let a=i.filter(e=>e.top>2.9).sort((e,t)=>e.y-t.y),o=[];for(let t=0;t+1<a.length&&o.length<3;t+=2)o.push({a:[a[t].x,a[t].y],b:[a[t+1].x,a[t+1].y],h:2.1+e()*.3});t.push({name:`elks-cluster`,cx:992,cy:r,piles:i,beams:o,braces:[]})}return t}function Rc(e){let t=e?.origin;return t&&Math.abs(t.lat-47.6777)<1e-4&&Math.abs(t.lon+122.42)<1e-4?Lc():[]}function zc(e,t){let n=new te;n.name=`pilings`;let r=e.flatMap(e=>e.piles),i=e.flatMap(e=>e.beams??[]),a=e.flatMap(e=>e.braces??[]);if(!r.length)return n;let o=new ut({color:16777215}),s=new H,c=new Ve,l=new dt(.17,.21,1,7,1);l.translate(0,.5,0);let u=new E(l,o,r.length);r.forEach((e,t)=>{let n=e.top-Ic,r=.22+.1*(t*37%7)/7;s.position.set(e.x,Ic,-e.y),s.rotation.set(-e.lean[1],0,-e.lean[0]),s.scale.set(1+.15*(t*11%5)/5,n,1+.15*(t*13%5)/5),s.updateMatrix(),u.setMatrixAt(t,s.matrix),c.setRGB(r*1.15,r*.95,r*.8),u.setColorAt(t,c)}),u.instanceMatrix.needsUpdate=!0,u.instanceColor.needsUpdate=!0,u.computeBoundingSphere(),n.add(u);let d=[...i.map(e=>({a:[e.a[0],e.h,e.a[1]],b:[e.b[0],e.h,e.b[1]],w:.22})),...a.map(e=>({a:[e.a[0],e.a[2],e.a[1]],b:[e.b[0],e.b[2],e.b[1]],w:.16}))];if(d.length){let e=new Re(1,1,1),t=new E(e,o,d.length),r=new $e,i=new R,a=new $e(1,0,0);d.forEach((e,n)=>{let o=new $e(e.a[0],e.a[1],-e.a[2]),l=new $e(e.b[0],e.b[1],-e.b[2]);r.subVectors(l,o),s.position.copy(o).add(l).multiplyScalar(.5),s.quaternion.copy(i.setFromUnitVectors(a,r.clone().normalize())),s.scale.set(r.length()+.3,e.w,e.w),s.updateMatrix(),t.setMatrixAt(n,s.matrix),t.setColorAt(n,c.setRGB(.3,.25,.2))}),t.instanceMatrix.needsUpdate=!0,t.instanceColor.needsUpdate=!0,t.computeBoundingSphere(),n.add(t)}return t.pilings=r.length,t.tris+=r.length*28+d.length*12,n}var Bc=(e,t=0)=>{let n=Math.imul(e|0,2654435761)^Math.imul((t|0)+7919,2246822507);return n^=n>>>15,n=Math.imul(n,739982445),n^=n>>>12,(n>>>0)/4294967296},Vc=e=>{let t=e>>>0||1;return()=>(t=Math.imul(t,1664525)+1013904223>>>0)/4294967296},Hc=e=>[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255],Uc=e=>{let t=0;for(let n=0;n<e.length;n++){let[r,i]=e[n],[a,o]=e[(n+1)%e.length];t+=r*o-a*i}return t/2},Wc={1:[15327955,14273976,12174540,13483944,10135456,13087643,14735046,9411238,12423031,13814196],2:[14274752,13222584,12103328,14867661,11115144],3:[12567492,13684940,11120306,13221806],4:[10396324,12171700,9080723,11050900],5:[8022616,5798543,10177340,10522488],0:[14209220,12893358,14932939,12103843]},Gc=[4935509,5918278,7035725,4146250,7357754,6119524],Kc={lowM:20,bigM2:900,spanM:5};function qc(e,t,n){let r=new Map,i=1e3,o=t.meta?.biome===`gorge`;for(let a of e){let e=[];for(let t=2;t+1<a.length;t+=2)e.push([a[t]/10,a[t+1]/10]);if(e.length<3)continue;if(o){let r=e.map(([e,n])=>t.elevationAt(e,n)),i=Math.min(...r),a=Math.max(...r)-i;if(i>Kc.lowM&&Math.abs(Uc(e))<Kc.bigM2||a>Kc.spanM){n.hidden=(n.hidden??0)+1;continue}}let s=e.reduce((e,t)=>e+t[0],0)/e.length,c=e.reduce((e,t)=>e+t[1],0)/e.length,l=`${Math.floor(s/i)},${Math.floor(c/i)}`,u=r.get(l);u||r.set(l,u={pos:[],nrm:[],col:[],idx:[],list:[]}),u.list.push({ring:e,h:a[0]/10,type:a[1],seed:Math.round(s*10)^Math.round(c*17)})}let s=[],c=new ut({vertexColors:!0});for(let e of r.values()){let{pos:r,nrm:i,col:o,idx:l}=e;for(let s of e.list){let e=s.ring;Uc(e)<0&&(e=e.slice().reverse());let c=e.map(([e,n])=>t.elevationAt(e,n)),u=Math.max(Math.min(...c),.4)-.3,d=Math.max(Math.max(...c),.6)+s.h,f=Wc[s.type]??Wc[0],p=Hc(f[Math.floor(Bc(s.seed)*f.length)]),m=Hc(Gc[Math.floor(Bc(s.seed,3)*Gc.length)]),h=.92+.16*Bc(s.seed,5);for(let t=0;t<e.length;t++){let[n,a]=e[t],[s,c]=e[(t+1)%e.length],f=s-n,m=c-a,g=Math.hypot(f,m);if(g<.05)continue;let _=m/g,v=f/g,y=r.length/3,b=.86+.14*Math.abs(_);r.push(n,u,-a,s,u,-c,s,d,-c,n,d,-a);for(let e=0;e<4;e++)i.push(_,0,v),o.push(p[0]*h*b,p[1]*h*b,p[2]*h*b);l.push(y,y+1,y+2,y,y+2,y+3)}let g=r.length/3;for(let[t,n]of e)r.push(t,d,-n),i.push(0,1,0),o.push(m[0],m[1],m[2]);let _=a.triangulateShape(e.map(([e,t])=>new U(e,t)),[]);for(let[t,n,r]of _)(e[n][0]-e[t][0])*(e[r][1]-e[t][1])-(e[n][1]-e[t][1])*(e[r][0]-e[t][0])>=0?l.push(g+t,g+n,g+r):l.push(g+t,g+r,g+n);n.buildings++,n.tris+=e.length*2+_.length}let u=new be;u.setAttribute(`position`,new j(r,3)),u.setAttribute(`normal`,new j(i,3)),u.setAttribute(`color`,new qe(new Uint8Array(o.map(e=>Math.min(255,Math.round(e*255)))),3,!0)),u.setIndex(l),u.computeBoundingSphere();let d=new he(u,c);d.name=`shore-buildings`,s.push(d)}return s}function Jc(e,t,n,r,i){let a=e.length,o=[],s=[];for(let n=0;n<a;n++){let r=e[Math.max(n-1,0)],i=e[Math.min(n+1,a-1)],c=i[0]-r[0],l=i[1]-r[1],u=Math.hypot(c,l)||1;c/=u,l/=u,o.push([e[n][0]-l*t,e[n][1]+c*t]),s.push([e[n][0]+l*t,e[n][1]-c*t])}let{pos:c,nrm:l,idx:u}=i,d=c.length/3;for(let e=0;e<a;e++){let t=n(e);c.push(o[e][0],t,-o[e][1],s[e][0],t,-s[e][1]),l.push(0,1,0,0,1,0)}for(let e=0;e<a-1;e++){let t=d+2*e;u.push(t,t+1,t+2,t+1,t+3,t+2)}for(let[e,t]of[[o,1],[s,-1]]){let i=c.length/3;for(let i=0;i<a;i++){let o=n(i),s=e[i][0],u=-e[i][1],d=i&&i-1,f=e[Math.min(i+1,a-1)][0]-e[d][0],p=-(e[Math.min(i+1,a-1)][1]-e[d][1]),m=Math.hypot(f,p)||1;c.push(s,o,u,s,o-r,u),l.push(t*p/m,0,-t*f/m,t*p/m,0,-t*f/m)}for(let e=0;e<a-1;e++){let n=i+2*e;t>0?u.push(n,n+1,n+2,n+2,n+1,n+3):u.push(n,n+2,n+1,n+2,n+3,n+1)}}}var Yc=({pos:e,nrm:t,idx:n},r)=>{let i=new be;i.setAttribute(`position`,new j(e,3)),i.setAttribute(`normal`,new j(t,3)),i.setIndex(n);let a=new Float32Array(e.length),[o,s,c]=Hc(r);for(let t=0;t<e.length;t+=3)a[t]=o,a[t+1]=s,a[t+2]=c;return i.setAttribute(`color`,new qe(a,3)),i.computeBoundingSphere(),i},Xc=e=>{let t=[];for(let n=0;n+1<e.length;n+=2)t.push([e[n]/10,e[n+1]/10]);return t};function Zc(e,t){let n={pos:[],nrm:[],idx:[]},r=.5;for(let i of e){let e=Xc(i.p);if(i.c&&e.length>=4){let t=e.slice(0,-1);Uc(t)<0&&(t=t.reverse());let i=n.pos.length/3;for(let[e,i]of t)n.pos.push(e,r,-i),n.nrm.push(0,1,0);for(let[e,r,o]of a.triangulateShape(t.map(([e,t])=>new U(e,t)),[])){let a=(t[r][0]-t[e][0])*(t[o][1]-t[e][1])-(t[r][1]-t[e][1])*(t[o][0]-t[e][0]);n.idx.push(...a>=0?[i+e,i+r,i+o]:[i+e,i+o,i+r])}for(let e=0;e<t.length;e++){let[i,a]=t[e],[o,s]=t[(e+1)%t.length],c=o-i,l=s-a,u=Math.hypot(c,l)||1,d=n.pos.length/3;n.pos.push(i,r,-a,o,r,-s,o,.15000000000000002,-s,i,.15000000000000002,-a);for(let e=0;e<4;e++)n.nrm.push(l/u,0,c/u);n.idx.push(d,d+1,d+2,d,d+2,d+3)}}else e.length>=2&&Jc(e,i.w?i.w/20:.9,()=>r,.35,n);t.piers++}return n.pos.length?new he(Yc(n,9207146),new ut({vertexColors:!0,side:2})):null}function Qc(){let e=new le(1,0),t=e.index?e.toNonIndexed():e,n=t.attributes.position,r=new Map;for(let e=0;e<n.count;e++){let t=`${n.getX(e).toFixed(3)},${n.getY(e).toFixed(3)},${n.getZ(e).toFixed(3)}`,i=r.get(t);i||r.set(t,i=.7+.5*Bc(r.size,31)),n.setXYZ(e,n.getX(e)*i,n.getY(e)*i,n.getZ(e)*i)}let i=new Float32Array(n.count*2);for(let e=0;e<n.count;e++)i[e*2]=n.getX(e)*.5+n.getZ(e)*.31,i[e*2+1]=n.getY(e)*.5+n.getZ(e)*.19;return t.setAttribute(`uv`,new qe(i,2)),t.computeVertexNormals(),t}function $c(e){let t=Rc(e),n=e=>{let n=e.p,r=n.length/2,i=0,a=0;for(let e=0;e<n.length;e+=2)i+=n[e]/r/10,a+=n[e+1]/r/10;return t.some(e=>Math.hypot(e.cx-i,e.cy-a)<60)};return(e?.breakwaters??[]).filter(e=>!n(e))}function el(e){let t=[];for(let n of $c(e)){let e=Xc(n.p);for(let n=1;n<e.length;n++)t.push([e[n-1][0],e[n-1][1],e[n][0],e[n][1]])}return mr(t)}function tl(e,t){let n={pos:[],nrm:[],idx:[],col:[]},r=Vc(77),i=[],a=[[-gr.footHalf,gr.footY],[-gr.crestHalf,gr.crestY],[gr.crestHalf,gr.crestY],[gr.footHalf,gr.footY]];for(let o of e){let e=Xc(o.p);if(e.length<2)continue;let s=[e[0]];for(let t=1;t<e.length;t++){let[n,r]=e[t-1],[i,a]=e[t],o=Math.hypot(i-n,a-r),c=Math.max(1,Math.round(o/3));for(let e=1;e<=c;e++)s.push([n+(i-n)*e/c,r+(a-r)*e/c])}let c=n.pos.length/3,l=a.length;for(let e=0;e<s.length;e++){let t=s[Math.max(e-1,0)],o=s[Math.min(e+1,s.length-1)],u=o[0]-t[0],d=o[1]-t[1],f=Math.hypot(u,d)||1;u/=f,d/=f;for(let[t,r]of a){let i=Bc(Math.round(s[e][0]*3)+t*7,Math.round(s[e][1]*3));n.pos.push(s[e][0]-d*t+(i-.5)*.5,r+(Bc(e,t*3)-.5)*.6,-(s[e][1]+u*t)+(Bc(e,t)-.5)*.5),n.nrm.push(0,1,0);let a=.8+.3*i;n.col.push(.3*a,.3*a,.29*a)}if(e)for(let t=0;t<l-1;t++){let r=c+(e-1)*l+t,i=c+e*l+t;n.idx.push(r,i,r+1,r+1,i,i+1)}for(let t=0;t<9;t++){let t=(r()-.5)*13,n=Math.abs(t)<1.2?2.6:2.6-(Math.abs(t)-1.2)/6.8*5.1;i.push([s[e][0]-d*t,n+.1+r()*.4,s[e][1]+u*t,.55+r()*.6,r()])}}t.breakwaters++}let o=new te;if(n.pos.length){let e=new be;e.setAttribute(`position`,new j(n.pos,3)),e.setAttribute(`normal`,new j(n.nrm,3)),e.setAttribute(`color`,new j(n.col,3)),e.setIndex(n.idx),e.computeVertexNormals(),e.computeBoundingSphere(),o.add(new he(e,new ut({vertexColors:!0,side:2})))}if(i.length){let e=new E(Qc(),new ut({color:9078658}),i.length),n=new H,r=new Ve;i.forEach(([t,i,a,o,s],c)=>{n.position.set(t,i,-a),n.scale.set(o*1.3,o*.9,o*1.1),n.rotation.set(s*6,s*11,s*3),n.updateMatrix(),e.setMatrixAt(c,n.matrix);let l=.55+.45*Bc(c,9);r.setRGB(l,l,l*.97),e.setColorAt(c,r)}),e.instanceMatrix.needsUpdate=!0,e.instanceColor.needsUpdate=!0,e.computeBoundingSphere(),o.add(e),t.tris+=i.length*20}return o}function nl(e,t,n){let r={pos:[],nrm:[],idx:[]},i={pos:[],nrm:[],idx:[]},a={pos:[],nrm:[],idx:[]},o=[];for(let s of e){let e=Xc(s.p);if(e.length<2)continue;let c=[e[0]];for(let t=1;t<e.length;t++){let[n,r]=e[t-1],[i,a]=e[t],o=Math.hypot(i-n,a-r),s=Math.max(1,Math.round(o/8));for(let e=1;e<=s;e++)c.push([n+(i-n)*e/s,r+(a-r)*e/s])}let l=c.map(([e,n])=>t.elevationAt(e,n)),u=Math.max(l[0],.5),d=Math.max(l.at(-1),.5),f=s.k===`foot`?2.5:s.k===`rail`?3.5:5,p=c.length-1,m=e=>{let t=p?e/p:0,n=u+(d-u)*t;return Math.max(n,l[e]+.4,l[e]<0?f:0)+(l[e]<0?0:.2)},h=s.k===`rail`?i:s.k===`foot`?a:r,g=s.k===`foot`?.3:s.k===`rail`?.9:1.1;Jc(c,s.w/20,m,g,h);for(let e=0;e<=p;e+=4)m(e)-Math.max(l[e],-8)>4&&s.k!==`foot`&&o.push([c[e][0],c[e][1],Math.max(l[e],-8),m(e)-g,s.k===`rail`?.7:1]);n.bridges++}let s=new te;for(let[e,t]of[[r,11184290],[i,7170662],[a,9075302]])e.pos.length&&s.add(new he(Yc(e,t),new ut({vertexColors:!0,side:2})));if(o.length){let e=new dt(1,1.2,1,10),t=new E(e,new ut({color:10328724}),o.length),n=new H;o.forEach(([e,r,i,a,o],s)=>{n.position.set(e,(i+a)/2,-r),n.scale.set(o,a-i,o),n.rotation.set(0,0,0),n.updateMatrix(),t.setMatrixAt(s,n.matrix)}),t.instanceMatrix.needsUpdate=!0,t.computeBoundingSphere(),s.add(t)}return s}function rl(e,t,n,r=10){let i=[],a=[],o=[[0,-n],[.7,-n*.55],[1,t*.2],[.98,t],[.45,t*1.02],[0,t*1.05]];for(let a=0;a<=r;a++){let s=a/r,c=-.5+s,l=e/2*Math.sin(Math.PI*Math.min(Math.max(s,.02),.995)**.75)**.65*(s>.93?1-(s-.93)*5:1),u=n*(.4+.6*Math.sin(Math.PI*s)),d=s*s*t*.9;for(let e of[1,-1])for(let[t,n]of o)i.push(c,n<0?-u:n+d*(n>0?1:.2),e*t*Math.max(l,.002))}let s=o.length*2;for(let e=0;e<r;e++)for(let t=0;t<s-1;t++){if(t===o.length-1)continue;let n=e*s+t,r=n+s;a.push(n,r,n+1,n+1,r,r+1,n,n+1,r,n+1,r+1,r)}let c=new be;c.setAttribute(`position`,new j(i,3)),c.setIndex(a);let l=c.toNonIndexed();return l.computeVertexNormals(),l.deleteAttribute(`uv`),l}var il=(e,t,n,r,i,a,o=0)=>{let s=new Re(e,t,n);o&&s.rotateZ(o),s.translate(r,i,a);let c=s.toNonIndexed();return c.deleteAttribute(`uv`),c};function al(e=10){return{hull:rl(.3,.055,.07,e),top:dr([il(.3,.05,.16,0,.08,0),il(.012,.9,.012,.08,.5,0),il(.4,.01,.012,-.12,.13,0),(()=>{let e=new be;return e.setAttribute(`position`,new j([.075,.14,0,.075,.92,0,-.32,.15,0,-.32,.15,0,.075,.92,0,.075,.14,0],3)),e.computeVertexNormals(),e})()])}}function ol(e=10){return{hull:rl(.33,.07,.06,e),top:dr([il(.42,.09,.2,-.04,.12,0),il(.2,.07,.17,-.08,.2,0),il(.012,.18,.012,-.08,.3,0)])}}var sl=[[16053488,9],[15260864,1],[1845834,1.2],[9182493,.8],[1919542,.8],[2236962,.8],[10335176,.7]];function cl(e,t,n){let r=e.marinas??[];if(!r.length)return null;let i=(e,t)=>r.some(n=>e>n.e0-30&&e<n.e1+30&&t>n.n0-30&&t<n.n1+30),a=[],o=Vc(2024),s=[],c=(e,t,n)=>{for(let r=0;r+1<e.length;r++){let[i,o]=e[r],[c,l]=e[r+1],u=Math.hypot(c-i,l-o);s.push([i,o,c,l]),u>=6&&a.push({x0:i,y0:o,x1:c,y1:l,l:u,hw:t,both:n})}};for(let t of e.piers??[]){let e=Xc(t.p);e.length&&i(e[0][0],e[0][1])&&(t.c?(e=e.slice(0,-1),Uc(e)<0&&e.reverse(),e.push(e[0]),c(e,0,!1)):c(e,t.w?t.w/20:.9,!0))}let l=(e,t,n)=>{let r=1e9;for(let i of s){if(i===n)continue;let a=i[2]-i[0],o=i[3]-i[1],s=a*a+o*o||1,c=Math.max(0,Math.min(1,((e-i[0])*a+(t-i[1])*o)/s)),l=Math.hypot(e-(i[0]+c*a),t-(i[1]+c*o));l<r&&(r=l)}return r},u=new Map,d=(e,t)=>`${Math.floor(e/4)},${Math.floor(t/4)}`,f=[],p={empty:0,water:0,overlap:0,dock:0};n.berthSegments=a.length;let m=(e,t,n,r)=>{let i=Math.floor((e-n)/4),a=Math.floor((e+n)/4),o=Math.floor((t-n)/4),s=Math.floor((t+n)/4);for(let e=i;e<=a;e++)for(let t=o;t<=s;t++)for(let n of u.get(`${e},${t}`)??[])if(r(n))return!0;return!1},h=0;for(let e of a){h++;let n=(e.x1-e.x0)/e.l,r=(e.y1-e.y0)/e.l;for(let i of e.both?[1,-1]:[1]){let a=r*i,s=-n*i,c=h*2+ +(i>0),g=.5+o()*2;for(;g<e.l-2;){let i=o(),h=i<.25?7+o()*2:i<.55?9+o()*2:i<.8?11+o()*3:i<.95?14+o()*6:20+o()*10,_=h*.3*(.9+.2*o()),v=_+1.1;if(g+v/2>e.l)break;let y=g+v/2,b=e.x0+n*y+a*(e.hw+.3+h/2),x=e.y0+r*y+s*(e.hw+.3+h/2);if(g+=v,o()>.85){p.empty++;continue}if(t.elevationAt(b,x)>-.6||t.elevationAt(b+a*h*.45,x+s*h*.45)>-.3){p.water++;continue}let S=!0;for(let e of[0,.25,.48])if(l(b+a*h*e,x+s*h*e,null)<1.2){S=!1;break}if(!S){p.dock++;continue}let C=[-.4,-.2,0,.2,.4].map(e=>[b+a*h*e,x+s*h*e]);if(C.some(([e,t])=>m(e,t,3+_,n=>n.seg!==c&&Math.hypot(n.x-e,n.y-t)<(_+n.beam)/2+.7)))p.overlap++;else{for(let[e,t]of C){let n=d(e,t);(u.get(n)??u.set(n,[]).get(n)).push({x:e,y:t,seg:c,beam:_})}if(f.push({x:b,y:x,len:h,beam:_/h,ang:Math.atan2(s,a),sail:o()<.55||h>13&&o()<.4,k:f.length}),f.length>=3500)break}}}}if(n.rejected=p,!f.length)return null;let g=new te;g.name=`shore-boats`;let _=e=>{let t=0;for(let[,e]of sl)t+=e;let n=Bc(e,4)*t;for(let[e,t]of sl)if(n-=t,n<=0)return e;return sl[0][0]},v=[],y=new Map;for(let e of f){let t=`${+!!e.sail}:${Math.floor(e.x/ll)},${Math.floor(e.y/ll)}`;(y.get(t)??y.set(t,[]).get(t)).push(e)}let b={true:{near:al(),far:al(3)},false:{near:ol(),far:ol(3)}},x=new ut({color:16777215}),S={true:new ut({color:15986918,emissive:5592405,side:2}),false:new ut({color:15330542,emissive:5592405,side:2})};for(let e of y.values()){let t=e[0].sail,r=b[t],i=new E(r.near.hull,x,e.length),a=new E(r.near.top,S[t],e.length),o=new H,s=new Ve;e.forEach((e,n)=>{o.position.set(e.x,0,-e.y),o.rotation.set(0,e.ang,0),o.scale.set(e.len,e.len,e.len*(e.beam/(t?.3:.33))),o.updateMatrix(),i.setMatrixAt(n,o.matrix),a.setMatrixAt(n,o.matrix),s.setHex(_(e.k)),i.setColorAt(n,s)});for(let e of[i,a])e.instanceMatrix.needsUpdate=!0,e.computeBoundingSphere(),g.add(e);i.instanceColor.needsUpdate=!0,n.tris+=e.length*((r.near.hull.attributes.position.count+r.near.top.attributes.position.count)/3);let c=e.reduce((e,t)=>e+t.x,0)/e.length,l=e.reduce((e,t)=>e+t.y,0)/e.length;v.push({hm:i,tm:a,P:r,cx:c,cy:l,r:i.boundingSphere.radius,far:!1})}return g.userData.lods=v,n.boats=f.length,n.boatTiles=v.length,g}var ll=300,ul=350;function dl(e,t,n){for(let r of e?.userData.lods??[]){let e=Math.hypot(r.cx-t,r.cy-n)-r.r,i=r.far?e>ul*.9:e>ul*1.1;if(i===r.far)continue;r.far=i;let a=i?r.P.far:r.P.near;r.hm.geometry=a.hull,r.tm.geometry=a.top}}function fl(e,t,{boats:n=!0,cullM:r=0}={}){let i={buildings:0,piers:0,breakwaters:0,bridges:0,boats:0,tris:0},a=new te;a.name=`shore`;for(let n of qc(e.buildings??[],t,i))a.add(n);let o=Zc(e.piers??[],i);o&&a.add(o),a.add(tl($c(e),i));let s=Rc(e);s.length&&a.add(zc(s,i)),a.add(nl(e.bridges??[],t,i));let c=n?cl(e,t,i):null;c&&a.add(c);let l=a.children.filter(e=>e.name===`shore-buildings`),u=(e,t)=>{for(let n of l){let i=n.geometry.boundingSphere;n.visible=Math.hypot(i.center.x-e,-i.center.z-t)-i.radius<r}for(let n of c?.userData.lods??[]){let i=Math.hypot(n.cx-e,n.cy-t)-n.r<r;n.hm.visible=i,n.tm.visible=i}};return{group:a,stats:i,update(e,t){dl(c,e,t),r>0&&u(e,t)},dispose(){for(let e of c?.userData.lods??[])for(let t of[`near`,`far`])e.P[t].hull.dispose(),e.P[t].top.dispose();a.traverse(e=>{e.geometry?.dispose();let t=e.material;t&&(Array.isArray(t)?t:[t]).forEach(e=>e.dispose())})}}}var pl=1/120;function ml(e,t,n=0){return{t,phase:n,e:e.e,n:e.n,psi:e.psi,u:e.u,z:e.z,pitch:e.pitch,roll:e.roll,power:e.power,wPrime:e.wPrime,hr:e.hr??null,onRun:e.onRun,splash:e.splash??0,spray:e.spray??0,encounter:e.encounter??0,plunge:e.plunge??0,bury:e.buryTip??-1}}function hl(e,t,n){let r=Math.max(0,Math.min(e.length-1.0001,n/t)),i=Math.floor(r),a=e[i],o=e[i+1]??a,s=o.jump?+(r-i>=.999):r-i,c=e=>a[e]+(o[e]-a[e])*s,l={t:n,e:c(`e`),n:c(`n`),psi:c(`psi`),u:c(`u`),z:c(`z`),pitch:c(`pitch`),roll:c(`roll`),power:c(`power`),wPrime:c(`wPrime`),hr:a.hr!=null&&o.hr!=null?c(`hr`):a.hr??null,onRun:a.onRun,braceLevel:a.braceLevel??0,phase:c(`phase`),splash:c(`splash`),spray:c(`spray`),encounter:c(`encounter`),plunge:c(`plunge`),bury:c(`bury`)};return a.mix&&(l.mix=a.mix.map((e,t)=>a.mix[t]+(((o.mix??a.mix)[t]??a.mix[t])-a.mix[t])*s)),l.forward=[Math.sin(l.psi),Math.cos(l.psi)],l.headingDeg=(l.psi*180/Math.PI%360+360)%360,l}function gl(e,t,n,r=14,i=.25){let[a,o]=t.forward,s={},c={},l={deg:-90,at:0},u=e.sample(t.e,t.n,n,s).h;c[0]=u;for(let d=i;d<=r+1e-9;d+=i){let r=e.sample(t.e+a*d,t.n+o*d,n,s).h,f=Math.atan2(r-u,i)*180/Math.PI;f>l.deg&&(l={deg:f,at:d-i/2}),u=r;for(let e of[2,5,10])Math.abs(d-e)<i/2&&(c[e]=r)}return{heights:c,steepest:l}}var _l=5.7826,vl=[{u:0,keel:.2228,deck:.3102,half:0,prof:[0,.8002,.8002,.8002,.8002,1,1,1,.9751,.9751,.9751,.8368,.6348]},{u:.00346,keel:.1623,deck:.3359,half:.0152,prof:[0,.5256,.9537,.9537,.9975,.9975,1,1,.9806,.9806,.9493,.8705,.7678]},{u:.00692,keel:.1219,deck:.3488,half:.0183,prof:[0,.8865,.9524,.9524,1,.9993,.9993,.9894,.9748,.9748,.9572,.8553,.6253]},{u:.01038,keel:.0988,deck:.3535,half:.0206,prof:[0,1,1,.9977,.9967,.9967,.9938,.9878,.9835,.9802,.97,.8939,.7285]},{u:.01384,keel:.0838,deck:.3549,half:.023,prof:[0,1,1,.9906,.9906,.9864,.9837,.9803,.9803,.976,.9701,.9277,.7831]},{u:.01729,keel:.0735,deck:.3551,half:.0253,prof:[0,.8809,1,.9918,.9918,.9878,.9849,.9828,.9828,.9803,.977,.9578,.8271]},{u:.02075,keel:.0656,deck:.355,half:.0276,prof:[0,.8797,1,.9934,.9934,.9898,.9878,.9878,.986,.9843,.9826,.9788,.8556]},{u:.02083,keel:.0655,deck:.355,half:.0276,prof:[0,.8797,1,.9935,.9935,.9899,.9878,.9878,.9861,.9844,.9827,.9791,.856]},{u:.02421,keel:.0597,deck:.355,half:.0298,prof:[0,.9598,1,.995,.995,.9919,.9902,.9902,.9887,.9874,.9866,.9902,.8703]},{u:.02767,keel:.0557,deck:.3547,half:.0322,prof:[0,.8791,1,.9934,.9934,.99,.9886,.9886,.9873,.9864,.9875,.9946,.8834]},{u:.03113,keel:.0522,deck:.3543,half:.0346,prof:[0,.8805,1,.9918,.9918,.988,.9868,.9868,.9858,.985,.987,.9959,.8978]},{u:.03459,keel:.0499,deck:.351,half:.037,prof:[0,.8823,1,.99,.99,.9858,.9848,.9848,.984,.9833,.9855,.9943,.9281]},{u:.03805,keel:.048,deck:.3438,half:.0393,prof:[0,.8833,1,1,.9894,.9853,.9853,.9845,.9838,.9835,.9853,.9928,.9562]},{u:.0415,keel:.0467,deck:.3392,half:.0416,prof:[0,.883,1,1,.9901,.9863,.9863,.9857,.9852,.9848,.9844,.9912,.9549]},{u:.04167,keel:.0467,deck:.3389,half:.0417,prof:[0,.883,1,1,.9901,.9864,.9864,.9858,.9853,.9849,.9846,.9912,.9549]},{u:.04496,keel:.0456,deck:.337,half:.0439,prof:[0,.882,1,1,.9915,.9883,.9883,.9878,.9874,.9871,.9869,.9909,.9546]},{u:.04842,keel:.0443,deck:.3359,half:.0461,prof:[0,.8807,1,1,.9931,.9905,.9905,.9902,.9899,.9896,.9895,.9909,.9547]},{u:.05188,keel:.043,deck:.3367,half:.0483,prof:[0,.8793,1,1,.9948,.9929,.9929,.9926,.9924,.9922,.9921,.9919,.9555]},{u:.05534,keel:.0417,deck:.3387,half:.0505,prof:[0,.878,1,.9964,.9964,.9951,.995,.995,.9948,.9947,.9946,.994,.9568]},{u:.0588,keel:.0402,deck:.3443,half:.0526,prof:[0,.8765,1,.9982,.9982,.9977,.9974,.9974,.9974,.9973,.9973,.9948,.9592]},{u:.06226,keel:.0391,deck:.3515,half:.0548,prof:[0,.8643,.9929,.9982,.9982,1,1,.9999,.9999,.9999,.9991,.997,.9339]},{u:.0625,keel:.039,deck:.3516,half:.055,prof:[0,.8633,.9922,.998,.998,1,1,.9999,.9999,.9999,.9991,.997,.932]},{u:.06571,keel:.038,deck:.3522,half:.0571,prof:[0,.8507,.9838,.996,.996,1,1,1,.9999,.9999,.9993,.9972,.9078]},{u:.06917,keel:.037,deck:.3524,half:.0594,prof:[0,.835,.9733,.9933,.9933,1,1,1,1,1,.9994,.9976,.9117]},{u:.07263,keel:.0361,deck:.3521,half:.0617,prof:[0,.8195,.963,.9907,.9907,1,1,1,1,1,.9994,.9979,.9228]},{u:.07609,keel:.0352,deck:.3517,half:.064,prof:[0,.8051,.9534,.9883,.9883,1,1,1,1,1,.9995,.9982,.9331]},{u:.07955,keel:.0343,deck:.3514,half:.0662,prof:[0,.7917,.9445,.9861,.9861,1,1,1,1,1,.9996,.9984,.9427]},{u:.08301,keel:.0333,deck:.3511,half:.0685,prof:[0,.7791,.9361,.984,.984,1,1,1,1,1,.9997,.9987,.9516]},{u:.08333,keel:.0332,deck:.3511,half:.0688,prof:[0,.7779,.9353,.9838,.9838,1,1,1,1,1,.9997,.9987,.9525]},{u:.08647,keel:.0324,deck:.3507,half:.0708,prof:[0,.7668,.9279,.982,.982,1,1,1,1,1,.9997,.9989,.9448]},{u:.08992,keel:.0315,deck:.3502,half:.0731,prof:[0,.7552,.9201,.98,.98,1,1,1,1,1,.9998,.9991,.8953]},{u:.09338,keel:.0306,deck:.3497,half:.0754,prof:[0,.7443,.9129,.9782,.9782,1,1,1,1,1,.9998,.9993,.8493]},{u:.09684,keel:.0297,deck:.3493,half:.0777,prof:[0,.7341,.9061,.9765,.9765,1,1,1,1,1,.9999,.9994,.8628]},{u:.1003,keel:.0288,deck:.3488,half:.08,prof:[0,.7245,.8996,.9749,.9749,1,1,1,1,1,.9999,.9996,.8755]},{u:.10417,keel:.0278,deck:.3483,half:.0825,prof:[0,.7143,.8929,.9732,.9732,1,1,1,1,1,.9999,.9997,.8888]},{u:.125,keel:.0224,deck:.3456,half:.0963,prof:[0,.6689,.8626,.9656,.9656,1,1,1,1,1,1,.9739,.896]},{u:.14583,keel:.0179,deck:.3427,half:.1088,prof:[0,.6392,.8428,.9607,.9607,1,1,1,1,1,1,.9708,.7534]},{u:.16667,keel:.0144,deck:.3396,half:.1199,prof:[0,.6199,.8299,.9575,.9575,1,1,1,1,1,1,.9684,.7345]},{u:.1875,keel:.0115,deck:.3364,half:.1302,prof:[0,.6061,.8207,.9552,1,1,1,1,1,1,1,.8671,.5507]},{u:.20833,keel:.0091,deck:.333,half:.1401,prof:[0,.8143,.8143,.9536,1,1,1,1,1,1,1,.8627,.5406]},{u:.22917,keel:.0067,deck:.3295,half:.1506,prof:[0,.8092,.8092,.9523,1,1,1,1,1,1,.9651,.8603,.5355]},{u:.25,keel:.0043,deck:.326,half:.162,prof:[0,.8056,.8056,.9514,1,1,1,1,1,1,.965,.7093,.5367]},{u:.27083,keel:.0019,deck:.3226,half:.1736,prof:[0,.8026,.8026,.9504,.9997,.9997,.9997,.9997,1,1,.8566,.7076,.5383]},{u:.29167,keel:4e-4,deck:.3203,half:.1836,prof:[0,.8043,.8043,.9501,.999,.9994,.9998,1,.9978,.9705,.7802,.6454,.4923]},{u:.3125,keel:0,deck:.3194,half:.1914,prof:[0,.8108,.8108,.9503,.9976,.9989,1,.9971,.9098,.8099,.7383,.6102,.3829]},{u:.33333,keel:1e-4,deck:.2735,half:.1987,prof:[0,.818,.818,.9506,.9962,.9982,1,.9961,.9389,.7614,.6939,.6444,.6139]},{u:.35417,keel:4e-4,deck:.2716,half:.2064,prof:[0,.8227,.8227,.9516,.9961,.9982,1,.979,.8373,.7353,.667,.6266,.6087]},{u:.375,keel:9e-4,deck:.2667,half:.2141,prof:[0,.8251,.4389,.9532,.997,.9986,1,.9958,.8532,.7612,.6986,.6602,.6283]},{u:.39583,keel:.0015,deck:.2551,half:.2212,prof:[0,.8264,.8264,.9555,.9989,.9995,1,.9963,.9844,.8927,.7793,.7496,.7344]},{u:.41667,keel:.0022,deck:.2415,half:.2278,prof:[0,.8266,.8266,.9568,1,1,.9998,.9996,.997,.9895,.9013,.875,.8516]},{u:.4375,keel:.0028,deck:.227,half:.2337,prof:[0,.8257,.8257,.9564,.5409,1,.5571,1,1,.9995,.9995,.9895,.9747]},{u:.45833,keel:.0034,deck:.2187,half:.2391,prof:[0,.8224,.8224,.9517,.5611,.9951,.5937,.9956,.6204,.996,.9967,1,1]},{u:.47917,keel:.004,deck:.2127,half:.2411,prof:[0,.8299,.8299,.9575,.9575,1,.5856,1,.6349,1,1,1,1]},{u:.5,keel:.0044,deck:.2084,half:.2436,prof:[0,.8305,.8305,.9576,.9576,1,1,1,.6058,1,1,1,1]},{u:.52083,keel:.0045,deck:.2095,half:.2443,prof:[0,.8265,.8265,.9566,.9566,.9999,.9999,.9999,.6652,1,1,1,1]},{u:.54167,keel:.0044,deck:.213,half:.2442,prof:[0,.8208,.8208,.9552,.9552,1,.4747,1,1,1,1,1,.9909]},{u:.5625,keel:.0044,deck:.2206,half:.2443,prof:[0,.8159,.8159,.954,1,1,1,1,1,1,1,1,.9404]},{u:.58333,keel:.0044,deck:.2451,half:.2439,prof:[0,.8116,.9529,.9529,1,1,1,1,1,1,1,.924,.5773]},{u:.60417,keel:.0045,deck:.2553,half:.2419,prof:[0,.8082,.952,.952,1,1,1,1,1,1,.9833,.824,.4499]},{u:.625,keel:.0044,deck:.2495,half:.2385,prof:[0,.8047,.9512,.9512,1,1,1,1,1,1,1,.8444,.5253]},{u:.64583,keel:.0042,deck:.244,half:.2343,prof:[0,.7997,.9499,.9499,1,1,1,1,1,1,1,.9394,.5867]},{u:.66667,keel:.004,deck:.2386,half:.2291,prof:[0,.7936,.9484,.9484,1,1,1,1,1,1,1,.9415,.5785]},{u:.6875,keel:.0038,deck:.2335,half:.2229,prof:[0,.7865,.9466,.9466,1,1,1,1,1,1,1,.9413,.5957]},{u:.70833,keel:.0037,deck:.2285,half:.2157,prof:[0,.7785,.9446,.9446,1,1,1,1,1,1,1,.9384,.765]},{u:.72917,keel:.0039,deck:.2238,half:.2073,prof:[0,.7699,.9425,.9425,1,1,1,1,1,1,1,.9326,.7536]},{u:.75,keel:.0044,deck:.2193,half:.1978,prof:[0,.7616,.9404,.9404,1,1,1,1,1,1,.9982,.9239,.7398]},{u:.77083,keel:.0055,deck:.2148,half:.1869,prof:[0,.7549,.9387,.9387,1,1,1,1,1,1,.9923,.9118,.7341]},{u:.79167,keel:.0072,deck:.2103,half:.1746,prof:[0,.7506,.9376,.9376,1,1,1,1,1,1,.9806,.9491,.746]},{u:.8125,keel:.0092,deck:.2059,half:.1617,prof:[0,.7473,.9368,.9368,1,1,1,1,1,1,.9642,.9198,.6326]},{u:.83333,keel:.0112,deck:.2014,half:.1487,prof:[0,.7434,.9359,.9359,1,1,1,1,1,1,.9449,.9154,.6842]},{u:.85417,keel:.0139,deck:.1969,half:.1353,prof:[0,.7392,.9348,.9348,1,1,1,1,1,1,.927,.7823,.3992]},{u:.875,keel:.0182,deck:.1923,half:.1208,prof:[0,.7352,.9338,.9338,1,1,1,1,1,1,.9173,.7535,.4136]},{u:.89583,keel:.024,deck:.1875,half:.1054,prof:[0,.7311,.7311,.9328,1,1,1,1,1,1,.917,.7505,.417]},{u:.8997,keel:.0251,deck:.1866,half:.1026,prof:[0,.7302,.7302,.9326,1,1,1,1,1,1,.9173,.7509,.4173]},{u:.90316,keel:.0261,deck:.1858,half:.1,prof:[0,.7294,.7294,.9324,1,1,1,1,1,1,.9176,.7514,.4176]},{u:.90662,keel:.0271,deck:.185,half:.0974,prof:[0,.7286,.7286,.9321,1,1,1,1,1,1,.9179,.7518,.4179]},{u:.91008,keel:.0281,deck:.1842,half:.0948,prof:[0,.7276,.7276,.9319,1,1,1,1,1,1,.9182,.7522,.4182]},{u:.91353,keel:.0291,deck:.1834,half:.0922,prof:[0,.7267,.7267,.9317,1,1,1,1,1,1,.9185,.7527,.4185]},{u:.91667,keel:.03,deck:.1827,half:.0899,prof:[0,.7258,.7258,.9314,1,1,1,1,1,1,.9188,.7532,.4188]},{u:.91699,keel:.0301,deck:.1826,half:.0897,prof:[0,.7257,.7257,.9314,1,1,1,1,1,1,.9188,.7532,.4188]},{u:.92045,keel:.0312,deck:.1818,half:.087,prof:[0,.725,.725,.9312,1,1,1,1,1,1,.9193,.7539,.4193]},{u:.92391,keel:.0323,deck:.181,half:.0843,prof:[0,.7244,.7244,.9311,1,1,1,1,1,1,.9199,.7548,.4198]},{u:.92737,keel:.0334,deck:.1802,half:.0816,prof:[0,.7237,.7237,.9309,1,1,1,1,1,1,.9205,.7557,.4203]},{u:.93083,keel:.0345,deck:.1794,half:.079,prof:[0,.7231,.7231,.9308,1,1,1,1,1,1,.9212,.7567,.4209]},{u:.93429,keel:.0356,deck:.1785,half:.0763,prof:[0,.7223,.7223,.9306,1,1,1,1,1,1,.9219,.7577,.4215]},{u:.9375,keel:.0369,deck:.1777,half:.0736,prof:[0,.7229,.7229,.9307,1,1,1,1,1,1,.9231,.7593,.4224]},{u:.93774,keel:.037,deck:.1776,half:.0734,prof:[0,.723,.723,.9307,1,1,1,1,1,1,.9232,.7595,.4224]},{u:.9412,keel:.0385,deck:.1767,half:.0703,prof:[0,.7244,.7244,.9311,1,1,1,1,1,1,.9249,.7618,.4237]},{u:.94466,keel:.04,deck:.1758,half:.0673,prof:[0,.726,.726,.9315,1,1,1,1,1,1,.9268,.7644,.425]},{u:.94812,keel:.0416,deck:.1747,half:.0641,prof:[0,.7282,.7282,.9321,1,1,1,1,1,1,.929,.7689,.4239]},{u:.95158,keel:.0435,deck:.1735,half:.0608,prof:[0,.7327,.7327,.9332,1,1,1,1,1,1,.9323,.7796,.4186]},{u:.95504,keel:.0454,deck:.1717,half:.0574,prof:[0,.4816,.7377,.9344,.9344,1,1,1,1,1,.9359,.7916,.6804]},{u:.95833,keel:.0472,deck:.1675,half:.0541,prof:[0,.4896,.7431,.9358,.9358,1,1,1,1,1,.985,.9398,.6572]},{u:.9585,keel:.0473,deck:.1673,half:.054,prof:[0,.49,.7433,.9358,.9358,1,1,1,1,1,.985,.94,.8302]},{u:.96196,keel:.0491,deck:.1617,half:.0506,prof:[0,.4996,.7497,.9374,.9374,1,1,1,1,1,.9862,.9447,.8692]},{u:.96541,keel:.051,deck:.1572,half:.0472,prof:[0,.5105,.757,.757,.9393,1,1,1,1,1,1,.95,.876]},{u:.96887,keel:.0529,deck:.1551,half:.0438,prof:[0,.5232,.7655,.7655,.9414,1,1,1,1,1,1,.9562,.8839]},{u:.97233,keel:.0548,deck:.1551,half:.0404,prof:[0,.538,.7753,.7753,.9438,1,1,1,1,1,1,.9634,.8931]},{u:.97579,keel:.0567,deck:.1569,half:.037,prof:[0,.5554,.787,.787,.9467,1,1,1,1,1,.993,.9719,.904]},{u:.97917,keel:.0586,deck:.16,half:.0337,prof:[0,.5758,.8005,.9501,.9501,1,1,1,1,1,.9954,.9816,.9121]},{u:.97925,keel:.0586,deck:.1601,half:.0336,prof:[0,.5763,.8009,.9502,.9502,1,1,1,1,1,.9955,.9818,.9116]},{u:.98271,keel:.0607,deck:.1637,half:.0302,prof:[0,.6007,.8172,.9543,.9543,1,1,1,1,1,.992,.8889,.8889]},{u:.98616,keel:.0631,deck:.1645,half:.0266,prof:[0,.6282,.8355,.9589,.9589,1,1,1,1,.9997,.9986,.877,.877]},{u:.98962,keel:.066,deck:.164,half:.0229,prof:[0,.6605,.857,.9642,.9642,1,1,1,1,1,1,.875,.875]},{u:.99308,keel:.069,deck:.1633,half:.0192,prof:[0,.7043,.8862,.9715,.9715,1,1,1,1,1,1,.875,.875]},{u:.99654,keel:.072,deck:.1627,half:.0155,prof:[0,.7691,.9294,.9824,1,1,1,1,1,1,1,.875,.5]},{u:1,keel:.0762,deck:.1605,half:0,prof:[0,.9812,.9812,.9953,1,1,1,1,1,1,1,.8618,.5377]}],yl=9.81,bl=1e3,xl=.1,Sl={_0x25c687:.12,_0x8577d8:.06,pBow:2.76,_0x354243:4,_0xd6defd:.6,wExp:.9,_0xf2e630:1,_0x3abbbf:3.2,kAmp:3},Cl={"Epic V10 Gen 4":{L:6.1,B:.46,deckH:.34,skiKg:10.9,designKg:94,seatX:-.5,...Sl,_0x25c687:.129,_0x8577d8:.05,pBow:3.853,_0x354243:4,_0xd6defd:.63,wExp:1,_0xf2e630:1.1,_0x3abbbf:3.036,kAmp:0},"Fenn Fennix Spearfish":{L:6.315,B:.455,deckH:.36,skiKg:11.5,designKg:100,seatX:-.52,...Sl,_0x25c687:.136,_0x8577d8:.05,pBow:4,_0x354243:4,_0xd6defd:.54,wExp:1,_0xf2e630:1.1,_0x3abbbf:2.353,kAmp:0},"Generic ski":{L:_l,B:.489,deckH:.34,skiKg:11.5,designKg:94,seatX:-.33,sections:vl,...Sl,cockpit:{x0:-.48,x1:.84,floorAbs:.1,zc:-.18,a:.66,wide:.19,narrow:.17},paddler:{seatX:-.33,hipUp:.085,hipHalf:.11,plateShift:.1,ankle:{z:-.62,up:.19,half:.1},ball:{z:-.72,up:.09},thigh:.44,shin:.425}},"Epic V8":{L:5.48,B:.527,deckH:.345,skiKg:11,designKg:99,seatX:-.45,...Sl,_0x25c687:.14,_0x8577d8:.05,pBow:3.705,_0x354243:4,_0xd6defd:.579,wExp:1,_0xf2e630:1.1,_0x3abbbf:2.305,kAmp:0}},wl=48,Tl={x0:-1,x1:.8,floor:.08};function El(e,t,n){if(e<=0)return 0;if(e<n)return 1-(1-e/n)**t;let r=(e-n)/(1-n);return Math.sqrt(Math.max(1-r*r,0))}var Dl=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ol=class e{constructor(e,{_0x18d49b:t,N:n=13}={}){this.spec={...e},this.N=n,this._0x18d49b=t??e.designKg,this.params={ka:.676,kc:.92,cd:3.9,ip:600,_0xdcb87b:.45,_0xf1c20a:2.5,_0xcba6f5:1,slam:1,_0x62b7f8:0,yieldK:2,yieldT:.8,_0x80b39d:.35,_0xb66248:.5,_0x20f15a:.05,_0x40f219:.25,_0x75d12f:2,_0xf64f98:.3,_0x17d458:1.2,_0x90009e:70,_0xd344c0:2,_0xa7c04e:0,_0xb03f1a:.5,_0x2c4668:1},this.build(),this.calibrate(),this.reset()}halfWidth(e){if(this.spec.sections)return this.sec(e).half;let t=this.spec,n=e=>Math.max(Math.sin(Math.PI*e**+t._0xf2e630),0)**+t.wExp;if(!this._wmax){let e=0;for(let t=1;t<200;t++)e=Math.max(e,n(t/200));this._wmax=e}return t.B/2*n(e)/this._wmax}keelRel(e){if(this.spec.sections)return this.sec(e).keel;let t=this.spec;return e<.5?t._0x25c687*((.5-e)/.5)**t.pBow:t._0x8577d8*((e-.5)/.5)**t._0x354243}zoneBump(e){return Dl(-1.3,-.85,e)*(1-Dl(.9,1.9,e))}deckRel(e){if(this.spec.sections)return this.sec(e).deck;let t=.215*Math.max(Math.sin(Math.PI*e**.78),0)**.62,n=-this.spec.L/2+e*this.spec.L,r=(.15+.17*(1-e)**3.2+.05*e**4+Math.max(.52*t,.004))*(this.spec.deckH/.34)-.006+.85*this.keelRel(e),i=this.spec.deckH+this.keelRel(e);return r+this.zoneBump(n)*Math.max(0,i-r)}profile(e,t,n){if(this.spec.sections)return this.secProfile(e,(n+this.spec.L/2)/this.spec.L);let r=El(e,t,this.spec._0xd6defd),i=this.zoneBump(n);if(i<=0||e<=.45)return r;let a=.93,o=El(.45,t,this.spec._0xd6defd);return r+i*((e<a?o+(1-o)*Dl(.45,a,e):Math.sqrt(Math.max(1-((e-a)/.06999999999999995)**2,0)))-r)}sec(e){let t=this.spec.sections,n=Math.min(Math.max(e,0),1),r=0,i=t.length-1;for(;i-r>1;){let e=r+i>>1;t[e].u<=n?r=e:i=e}let a=t[r],o=t[i],s=o.u>a.u?(n-a.u)/(o.u-a.u):0,c=this._sec??={keel:0,deck:0,half:0,i:0,a:0};return c.keel=a.keel+(o.keel-a.keel)*s,c.deck=a.deck+(o.deck-a.deck)*s,c.half=a.half+(o.half-a.half)*s,c.i=r,c.a=s,c}secProfile(e,t){let n=this.spec.sections,{i:r,a:i}=this.sec(t),a=n[0].prof.length-1,o=Math.min(Math.max(e,0),1)*a,s=Math.min(a-1,Math.floor(o)),c=o-s,l=e=>e.prof[s]+(e.prof[s+1]-e.prof[s])*c;return l(n[r])+(l(n[r+1])-l(n[r]))*i}bottomK(e){return this.spec._0x3abbbf+this.spec.kAmp*Math.sin(Math.PI*e)**.8}cockpitAt(e){return{floor:(this._0x632e11??0)+this.base+.07*Dl(.15,-.9,e),hump:.09*Dl(.25,-.1,e)*(1-Dl(-.45,-.85,e))}}innerHalfAt(e,t){let n=(e+this.spec.L/2)/this.spec.L,r=this.base+this.keelRel(n),i=this.base+this.deckRel(n);return t<=r||t>=i?0:this.halfWidth(n)*this.profile((t-r)/(i-r),0,e)}openingHalfWidth(e){if(this.spec.noCockpit)return 0;let t=this.spec.cockpit,n=t?t.zc:.025,r=t?t.a:.975,i=Math.abs((e-n)/r);if(i>=1)return 0;let a=t?t.wide:.17,o=t?t.narrow:.12;return(o+(a-o)*Dl(-.6,.2,e))*(1-i**3.2)**(1/3.2)}tList(e,t=9){let n=.93,r=[];for(let t=0;t<=e;t++)r.push(t/e*n);for(let e=1;e<=t;e++)r.push(n+.06999999999999995*Math.sin(e/t*Math.PI/2));return r}sideOutline(e,t=16){let n=this.halfWidth(e),r=this.keelRel(e)+this.base,i=this.deckRel(e)+this.base,a=this.bottomK(e),o=-this.spec.L/2+e*this.spec.L;return this.tList(t).map(e=>[n*this.profile(e,a,o),r+e*(i-r)])}static deckAt(e,t){let n=e[e.length-1][1];for(let n=e.length-1;n>0;n--){let[r,i]=e[n],[a,o]=e[n-1];if(t>=r&&t<=a||t>=a&&t<=r){if(a===r)continue;return i+(o-i)*(t-r)/(a-r)}}return n}ring(t,n=16){let r=this.sideOutline(t,n),i=-this.spec.L/2+t*this.spec.L,a=this.openingHalfWidth(i),o=r.map(e=>e.slice());if(a>.001){let t=[a,e.deckAt(r,a)],i=n;for(let e=i+1;e<o.length;e++)o[e][0]<a&&(o[e]=t.slice());o[i][0]<a&&(o[i]=t.slice())}let s=o.slice();for(let e=o.length-2;e>=1;e--)s.push([-o[e][0],o[e][1]]);return s}bucketRings(t=70){let n=[];for(let r=0;r<=t;r++){let i=-.95+1.95*r/t,a=(i+this.spec.L/2)/this.spec.L,o=this.openingHalfWidth(i),s=this.sideOutline(a),c=e.deckAt(s,Math.max(o,.001)),l=this.cockpitAt(i),u=Dl(0,.25,1-Math.abs((i-.025)/.975)),d=l.floor+(c-l.floor)*(1-u),f=l.hump*u,p=Math.max(o-.025,0),m=[],h=[[o,c],[o-.004,c-.04],[p+.01,(c+d)/2-.01],[p,d+.012],[p*.9,d]];for(let e=1;e<=6;e++){let t=e/6;h.push([p*.9*(1-t),d+f*(1-(1-t)**2)])}for(let e of h)m.push(e);for(let e=h.length-2;e>=0;e--)m.push([-h[e][0],h[e][1]]);n.push({z:i,pts:m})}return n}deckTop(e){return this.deckRel(Math.min(Math.max((e+this.spec.L/2)/this.spec.L,0),1))+this.base}build(){let e=this.spec,t=this.N,n=e.L,r=n/t,i=[];this.base=0;for(let a=0;a<t;a++){let o=(a+.5)/t,s=(.5-o)*n,c=this.keelRel(o),l=this.deckRel(o),u=l-c,d=this.halfWidth(o),f=this.bottomK(o),p=new Float64Array(49);for(let e=1;e<=wl;e++)p[e]=p[e-1]+2*d*this.profile((e-.5)/wl,f,-n/2+o*n)*(u/wl);i.push({x:s,w:d,keel:c,top:l,H:u,A:p,dx:r,inCockpit:!e.noCockpit&&s>(e.cockpit?.x0??Tl.x0)&&s<(e.cockpit?.x1??Tl.x1)})}for(let e of i)e.side=e.inCockpit?Math.min(1,Math.max(0,1-this.openingHalfWidth(-e.x)/Math.max(e.w,.001))):1;this._0xe111e0=i}static area(e,t){if(t<=0)return 0;let n=e.A.length-1,r=Math.min(t/e.H,1)*n,i=Math.min(Math.floor(r),n-1);return e.A[i]+(e.A[i+1]-e.A[i])*(r-i)}static breadth(e,t){if(t<=0||t>=e.H)return 0;let n=e.A.length-1,r=Math.min(Math.floor(t/e.H*n),n-1);return(e.A[r+1]-e.A[r])*n/e.H}buoy(t,n){return bl*yl*e.area(t,n-0)*t.dx}masses(){let e=this.spec,t=this._0x18d49b,n=e.skiKg,r=t+n,i=t*e.seatX+n*-.05;return{M:r,S:i,I:t*e.seatX*e.seatX+n*(e.L*e.L/12+.05*.05)+this.params.ip,xcg:i/r}}staticBuoyancy(e,t){let n=0,r=0;for(let i of this._0xe111e0){let a=-(e+i.x*Math.sin(t)+i.keel),o=bl*yl*this.areaAt(i,a)*i.dx;n+=o,r+=o*i.x*Math.cos(t)}return{F:n,My:r}}cap(e,t){return!e.inCockpit||this._0x632e11==null?t:Math.min(t,this._0x632e11-e.keel)}areaAt(t,n){let r=t.inCockpit&&this._0x632e11!=null?this._0x632e11-t.keel:1/0;if(n<=r)return e.area(t,n);let i=e.area(t,r);return this.params.sideTanks===!1?i:i+t.side*(e.area(t,n)-i)}breadthAt(t,n){let r=t.inCockpit&&this._0x632e11!=null?this._0x632e11-t.keel:1/0;return n<=r?e.breadth(t,n):this.params.sideTanks===!1?e.breadth(t,r):t.side*e.breadth(t,n)}equilibrium(e=this.masses()){let t=-.1,n=0,r=e.M*yl,i=e.S*yl;for(let e=0;e<60;e++){let e=(e,t)=>{let n=this.staticBuoyancy(e,t);return[n.F-r,n.My-i*Math.cos(t)]},[a,o]=e(t,n),s=1e-4,[c,l]=e(t+s,n),[u,d]=e(t,n+s),f=(c-a)/s,p=(l-o)/s,m=(u-a)/s,h=(d-o)/s,g=f*h-m*p;if(Math.abs(g)<1e-9)break;let _=(h*a-m*o)/g,v=(-p*a+f*o)/g;if(t-=Math.max(-.05,Math.min(.05,_)),n-=Math.max(-.05,Math.min(.05,v)),Math.abs(_)<1e-7&&Math.abs(v)<1e-8)break}return{hz:t,th:n}}calibrate(){this._0x632e11=null;let e=new kl(this).designEq();this._0xd486b6=e.hz,this.base=xl+e.hz,this._0x632e11=this.spec.cockpit?this.spec.cockpit.floorAbs:-e.hz+Tl.floor;let t=this.equilibrium();this.hzEq=t.hz,this.thEq=t.th;let n=this.masses();this.xcg=n.xcg;let r=.005;this._0x480d1c=(this.staticBuoyancy(t.hz-r,t.th).F-this.staticBuoyancy(t.hz+r,t.th).F)/(2*r),this._0xb7a72e=(this.staticBuoyancy(t.hz,t.th-.005).My-this.staticBuoyancy(t.hz,t.th+.005).My)/.01-0}statics(){let e=this.equilibrium(),t=this._0xe111e0,n={};n.hzRel=e.hz-this._0xd486b6;let r=0,i=0,a=0,o=0,s=t=>-(e.hz+t.x*Math.sin(e.th)+t.keel);for(let e of t){let t=s(e),n=this.areaAt(e,t)*e.dx;r+=n,i+=n*e.x;let c=this.breadthAt(e,t);a+=c*e.dx,o+=c*e.dx*e.x}let c=t.reduce((e,t)=>Math.abs(t.x)<Math.abs(e.x)?t:e);n.displacementL=r*1e3,n.draftMid=s(c),n.bwl=this.breadthAt(c,s(c)),n.deckBeam=2*c.w,n.wp=a,n.lcb=i/r,n.lcf=o/a,n.trimDeg=e.th*180/Math.PI,n.xcg=this.masses().xcg;let l=[0,0,0],u=[0,0,0],d=this.spec.L;for(let e of t){let t=e.x>d/6?0:e.x<-d/6?2:1;l[t]+=bl*this.areaAt(e,e.H)*e.dx,u[t]+=this.areaAt(e,s(e))*e.dx*bl}return n.reserveKg=l.map(e=>e),n.restShare=u.map(e=>e/(r*bl)),n._0x480d1c=this._0x480d1c,n._0xb7a72e=this._0xb7a72e,n}holdAttitude(e){let t=e*Math.PI/180,n=this.masses(),r=this.hzEq;this._0xdcff92=0;for(let e=0;e<40;e++){let e=this.staticBuoyancy(r,t);r+=(e.F-n.M*yl)/this._0x480d1c}let i=this.staticBuoyancy(r,t);return this._0xdcff92=-(i.My-yl*n.S*Math.cos(t)),{hz:r,th:t}}reset(e=this.hzEq,t=this.thEq){this._0xdcff92=this._0xdcff92??0,this.hz=e,this.th=t,this.vz=0,this.om=0,this._0x3ed930=null,this._0xab28e3=null,this.aeff=null,this.defl=null,this._0x5f7e27=0,this._0xb2a9d4=0,this._0xa081ae=0,this.awash=0,this.bury=0,this.thS=0,this.wet=1,this.motionPower=0,this.Fb=0}step(e,t,n={}){let r=this._0xe111e0,i=r.length,a=this.masses(),o=this.params,s={},c=Math.sin(this.th),l=Math.cos(this.th);this._0x8318f9=!this._0x3ed930,this._0x3ed930||=new Float64Array(i),this.defl||=new Float64Array(i),this.aeff||=new Float64Array(i).fill(-1),this._0xab28e3?this._0xd968ef=!1:(this._0xab28e3=new Float64Array(i),this._0xd968ef=!0),this.hs||(this.hs=new Float64Array(i),this.uzs=new Float64Array(i),this.sl=new Float64Array(i));let u=o._0xcba6f5??0,d=n.uFwd??0;for(let e=0;e<i;e++){let n=t(r[e].x*l,s);this.hs[e]=n.h,this.uzs[e]=n.uz}if(u!==0&&d!==0)for(let e=0;e<i;e++){let t=Math.max(0,e-1),n=Math.min(i-1,e+1);this.sl[e]=(this.hs[n]-this.hs[t])/((r[n].x-r[t].x)*l)}else this.sl.fill(0);let f=this.diag={buoy:0,damp:0,addm:0},p=0,m=0,h=0,g=0,_=-a.M*yl,v=-9.81*a.S*l+(this._0xdcff92??0)-(o._0xa7c04e??0)*this.om,y=0,b=0,x=0,S=0,C=0,w=0,T=-9,E=0,D=0,O=0;for(let t=0;t<i;t++){let n=r[t],i={h:this.hs[t],uz:this.uzs[t]},a=this.hz+n.x*c+n.keel,s=i.h-a,T=s-this.defl[t],k=this.areaAt(n,T),A=this.breadthAt(n,T),j=k;if(o._0x62b7f8>0){let n=this.aeff[t];j=n<0||k<=n?k:n+(k-n)*(1-Math.exp(-e/o._0x62b7f8)),this.aeff[t]=j}let M=this.vz+n.x*this.om*l-i.uz-u*d*this.sl[t],N=bl*yl*j*n.dx;S+=N;let P=n.x>this.spec.L/6;if(P&&(f.buoy+=N),A>0){let r=bl*o.ka*A*A*n.dx,a=this._0x8318f9?0:(i.uz-this._0x3ed930[t])/e,s=o.kc*bl*A*Math.sqrt(yl*A)*n.dx*M+.5*bl*o.cd*A*n.dx*Math.abs(M)*M;if(o._0x75d12f<1e6&&(s/=1+Math.abs(M)/o._0x75d12f),N+=r*a-s,C+=s*M,P&&(f.damp+=-s,f.addm+=r*a),y+=r,b+=r*n.x,x+=r*n.x*n.x,!this._0xd968ef&&o.slam&&M<0&&r>this._0xab28e3[t]){let e=-o.slam*(r-this._0xab28e3[t])*M;h+=e,g+=e*n.x*l}}this._0xab28e3[t]=A>0?bl*o.ka*A*A*n.dx:0;let F=o._0xb03f1a>0||o._0x2c4668>0?Dl(n.H-.02,n.H+.08,s):0;if(F>0){let r=2*n.w,a=F*bl*(o._0xb03f1a??0)*r*r*n.dx,s=this._0x8318f9?0:(i.uz-this._0x3ed930[t])/e,c=F*.5*bl*(o._0x2c4668??0)*r*n.dx*Math.abs(M)*M;N+=a*s-c,C+=c*M,y+=a,b+=a*n.x,x+=a*n.x*n.x}if(this._0x3ed930[t]=i.uz,n.x>.5&&s>-.03&&s<.3&&M<-.15&&(p+=A*n.dx*(-M-.15)*(-M-.15),m=Math.max(m,-M)),o.yieldK>0){let n=Dl(o._0x20f15a,o._0x40f219,s),r=o.yieldK*Math.max(0,-M-o._0xb66248)*n;this.defl[t]=Math.min(o._0x80b39d,Math.max(0,this.defl[t]+(r-this.defl[t]/o.yieldT)*e))}else this.defl[t]=0;_+=N,v+=N*n.x*l;let I=i.h-(this.hz+n.x*c+n.top);I>0&&E++,n.x>Tl.x1&&I>0&&(w=Math.max(w,2*Math.max(n.w,.08)*Math.min(I,.35))),n.x>Tl.x1&&(D++,I<=0&&O++)}let k=1-Dl(.4,.8,E/i);this._0xd5d31e=k;let A=n.u??0,j=1-Math.min(1,this._0x5f7e27/o._0x90009e);if(this._0xb2a9d4=k>0?Math.max(0,o._0xf64f98*bl*w*Math.max(A,0)*j*k):0,this._0x5f7e27=Math.min(o._0x90009e,Math.max(0,this._0x5f7e27+(this._0xb2a9d4-this._0x5f7e27/o._0x17d458)*e)),this._0x81771c=D?O/D:1,this._0x5f7e27>0){let e=this._0x5f7e27*yl*(o.deckWeighDry===!1?1:this._0x81771c);_-=e,v-=e*o._0xd344c0}if(w>0&&k>0){let e=Math.min(.5*bl*o._0xdcb87b*w*A*Math.abs(A),.8*a.M*yl);v-=.4*k*e}let M=0,N=0;for(let e=0;e<i;e++)M+=r[e].x*this.hs[e],N+=r[e].x*r[e].x;this.thS=Math.atan(M/N);let P=this.spec.L/2,F=t(P*l,s),I=this.hz+P*c+this.deckRel(0);T=F.h-I;let ee=a.M+y,L=a.S+b,te=a.I+x,R,ne;if(n.holdPitch!=null)R=_/ee,ne=0,this.th=n.holdPitch,this.om=0;else{let e=ee*te-L*L;R=(_*te-v*L)/e,ne=(ee*v-L*_)/e}if(n.holdPitch==null&&Math.abs(this.th)>=.6&&ne*this.th>0&&(R=_/ee,ne=0),this.vz+=R*e,this.om+=ne*e,h!==0){let e=ee*te-L*L,t=(h*te-g*L)/e,r=(ee*g-L*h)/e;this.vz+=t,n.holdPitch??(this.om+=r)}this._0xa081ae=h/e,this.hz+=this.vz*e,n.holdPitch??(this.th+=this.om*e),Math.abs(this.th)>.6&&(this.th=Math.sign(this.th)*.6,this.om=0);let re=0;for(let e=0;e<i;e++)r[e].x>.5&&(re=Math.max(re,this.defl[e]));this.splash=Math.min(1,re/.12),this.spray=p,this.encounter=m;{let e=T>(this._0x1cce61??T);this.plunge=Dl(-.004,.025,T)*(e?1:.5),this._0x1cce61=T}return this.awash=w,this.bury=T,this.Fb=S,this.wet=Math.min(1,S/(a.M*yl)),this.motionPower=C,this}},kl=class{constructor(e){this.b=e}designEq(){let e=this.b,t=e._0x18d49b;e._0x18d49b=e.spec.designKg;let n=e.equilibrium();return e._0x18d49b=t,n}},Al=(e,t)=>(e-t+540)%360-180,jl={v0:3.5,v1:7,depth:.5,floor:.3};function Ml(e,t=1){if(!(t>1))return 1;let n=Math.min(Math.max((Math.abs(e)-jl.v0)/(jl.v1-jl.v0),0),1);return Math.max(jl.floor,1-jl.depth*(t-1)*n*n*(3-2*n))}var Nl={mass:105,_0xd8add8:1.1,_0x530f2a:.8,c2:4,c4:.03,_0x2fbec7:.8,_0x1111ab:1,_0x3cdd41:3,eta:.65,cp:202,_0x990bf6:420,_0xe7a541:14e3,_0xacee49:.47,_0x2ab99a:1.33,broach:1.6,_0x650dee:2.2,_0xe65ea5:3,_0x3b5da9:1.6,_0x3da0c0:3,_0xb878a9:.15,_0xd0bc52:.5,_0x3675be:.5,_0x568c40:.01,_0xb77722:60,_0xe318ab:2,_0xdcb87b:.45,_0xef6fce:1,_0xd4dbdd:4,_0x81183e:.9,_0x319ee2:.0015,_0x2c64b1:.45,_0x7859d9:0,disturb:0,_0x6eccf3:.1,waveLean:1.3,_0xfb2c67:.26,_0x329cc3:0};function Pl(e,t){let n=Al(t,e.headingDeg);return Math.max(-1,Math.min(1,n/25))}var Fl=1025,Il=Math.PI/180,Ll={"Nelo short":{span:.125,chord:.115,areaFactor:.75,note:`Dietz: the short carbon rudder for flat water (125 x 115 mm)`},"Nelo large":{span:.174,chord:.129,areaFactor:.75,note:`Dietz: the surf rudder (174 x 129 mm)`}},Rl={rudder:`Nelo short`,reflect:1.3,gamma:.6,_0x8e511e:.9,_0xf03e44:18,_0x0f4324:9,_0xf04d3f:.06,_0xf0048f:1.15,cd0:.012,_0xaf3fdf:.85,_0x4542d6:0,_0xd682e3:.9,_0x8faf2b:8,_0x062f05:16,_0x698ece:.05,_0xe8c385:null,_0x279dcf:.03,_0xb2cb6f:9,_0xa82865:.25,_0x73794a:5,_0x8d13b6:.05,_0x28367d:.03,_0x950e9d:!1},zl=e=>2*Math.PI*e/(2+Math.sqrt(e*e+4)),Bl=class{constructor(e,{mass:t,_0x18d49b:n,skiKg:r=11,seatX:i=-.33},a={}){this.o={...Rl,...a};let o=e.hzEq,s=e.thEq??0;this.st=e._0xe111e0.map(t=>{let n=Math.max(0,-(o+t.x*Math.sin(s)+t.keel));return{x:t.x,dx:t.dx,T:n,m22:Fl*Math.PI*n*n/2,A:e.areaAt?e.areaAt(t,n):0}}),this.st.forEach((e,t)=>{e.i=t});let c=this.st[0];for(let e of this.st)e.m22>c.m22&&(c=e);this.xs=c.x,this.m22s=c.m22,this._0x5fa644=c.i,this.fwd=this.st.filter(e=>e.x>this.xs),this.wet=this.st.filter(e=>e.T>.002);let l=0,u=0,d=0,f=0,p=0;for(let e of this.st)l+=e.m22*e.dx,u+=e.m22*e.x*e.dx,d+=e.m22*e.x*e.x*e.dx,e.x<this.xs&&e.T>.002&&(f+=e.T*e.dx,p+=e.x*e.T*e.dx);this._0x29dd2a=f,this.xAft=f>0?p/f:this.xs,this.xEnd=Math.min(...this.wet.map(e=>e.x-e.dx/2)),this._0xa813a9=this.wet.reduce((e,t)=>t.x<e.x?t:e).i;let m=e.spec.L,h=n??t-r;this.m=t,this.xG=e.xcg??0,this.Iz=h*i*i+h*.2*.2+6+r*(m*m/12),this.M11=t+l,this.M12=t*this.xG+u,this.M22=this.Iz+d,this.detM=this.M11*this.M22-this.M12*this.M12,this.added={m22:l,m26:u,m66:d},this.setRudder(this.o.rudder),this.reset()}dwAft(e){let t=0,n=0;for(let r of this.st)r.x<this.xs&&r.T>.002&&(t+=r.T*r.dx,n+=r.T*r.dx*e[r.i]);return t>0?n/t:0}setRudder(e){let t=Ll[e]??Ll[`Nelo short`],n=this.o;this.R=t,this._0x496c22=Ll[e]?e:`Nelo short`,this.area=t.areaFactor*t.span*t.chord,this.AR=t.span*t.span/this.area,this.ARe=n.reflect*this.AR,this.cla=zl(this.ARe),this.xR=n._0xe8c385??this.xEnd+.15}reset(){this.v=0,this.r=0,this.stall=0,this.vent=0,this.alpha=0,this.Yr=0,this.Dr=0,this.load=0,this.imm=1}coeffsAt(e,t,n){let r=this.o,i=Math.max(this.ARe*n,.05),a=zl(i)*e,o=r._0xf0048f*Math.sin(e)*Math.cos(e);return{cl:(1-t)*a+t*o,cd:r.cd0+(1-t)*a*a/(Math.PI*r._0xaf3fdf*i)+t*r._0xf0048f*Math.sin(e)**2}}coeffs(e,t){let n=this.o,r=this.cla*e,i=n._0xf0048f*Math.sin(e)*Math.cos(e);return{cl:(1-t)*r+t*i,cd:n.cd0+(1-t)*r*r/(Math.PI*n._0xaf3fdf*this.ARe)+t*n._0xf0048f*Math.sin(e)**2}}forces(e,t,n,r,i,a=!0,o=null){let s=this.o,c=o?.dw,l=n=>e+n.x*t-(c?c[n.i]:0),u=this.st[this._0x5fa644],d=l(u),f=-n*this.m22s*d,p=0;for(let e of this.fwd)p+=e.m22*l(e)*e.dx;let m=-n*(this.xs*this.m22s*d+p),h=-.5*Fl*n*this._0x29dd2a*s._0x4542d6*(e+this.xAft*t-(c?this.dwAft(c):0));if(f+=h,m+=h*this.xAft,a){let r=Math.min(1,Math.atan2(Math.abs(e)+1.5*Math.abs(t),Math.max(n,.05))/(s._0x8faf2b*Il));for(let e of this.wet){let t=l(e),n=-.5*Fl*s._0xd682e3*r*e.T*e.dx*t*Math.abs(t);f+=n,m+=n*e.x}}if(o?.da)for(let e of this.wet){let t=(Fl*e.A+e.m22)*o.da[e.i]*e.dx;f+=t,m+=t*e.x}let g=o?.du??0,_=o?.imm??1,v=o?.vent??0,y=c?c[this._0xa813a9]:0,b=Math.max(s._0x8e511e*(n+g),.05),x=s.gamma*(e+this.xR*t-y)+(o?.wExt??0),S=r+Math.atan2(x,b),{cl:C,cd:w}=_<.999?this.coeffsAt(S,i,_):this.coeffs(S,i);C*=1-v*(1-s._0xa82865);let T=.5*Fl*(b*b+x*x)*this.area*_,E=Math.atan2(x,b),D=-T*(C*Math.cos(E)+w*Math.sin(E)),O=T*(w*Math.cos(E)-C*Math.sin(E));return f+=D,m+=D*this.xR,{Y:f-this.m*n*t,N:m-this.m*this.xG*n*t,Yr:D,Dr:O,alpha:S,cl:C}}holdMoment(e){let t=1e-4,n=this.forces(0,0,e,0,0,!1),r=this.forces(t,0,e,0,0,!1),i=this.forces(0,t,e,0,0,!1),a=(r.Y-n.Y)/t,o=(i.Y-n.Y)/t,s=(r.N-n.N)/t,c=a*((i.N-n.N)/t)-o*s;return Math.abs(a)>1e-9?-c/a:0}step(e,t,n,r=null,i=0,a=null){let o=this.o,s=Math.max(t,.05),c=null;if(a?.hull&&o._0x950e9d){let t=a.hull,n=a.mid??0,r=t.length,i=this._dw??=new Float64Array(r),o=this._da??=new Float64Array(r),s=this._dwPrev;for(let e=0;e<r;e++)i[e]=t[e]-n;for(let t=0;t<r;t++)o[t]=s?(i[t]-s[t])/e:0;(this._dwPrev??=new Float64Array(r)).set(i),c={dw:i,da:o}}if(a){let t=a.top??.04;this.imm=Math.min(1,Math.max(0,(t+this.R.span)/this.R.span)),c={...c??{},du:a.du??0,wExt:o._0x950e9d?0:a.wExt??0,imm:Math.max(this.imm,.02),vent:this.vent};let r=Math.max(o._0x8e511e*(s+c.du),.05),i=Math.abs(n+Math.atan2(o.gamma*(this.v+this.xR*this.r)+c.wExt,r)),l=(101325+Fl*9.81*Math.max(t,0)-2340)/(.5*Fl*r*r),u=1+12*i+40*i*i,d=this.vent>.5?i/Il<o._0x73794a&&t>o._0x8d13b6?0:1:+(t<o._0x279dcf&&i/Il>o._0xb2cb6f||u>l&&t<this.R.chord);this.vent+=(d-this.vent)*Math.min(1,e/o._0x28367d),c.vent=this.vent,this.sigma=l}let l=this.forces(this.v,this.r,s,n,this.stall,!0,c),u=Math.abs(l.alpha)/Il,d=this.stall>.5?u<o._0x0f4324?0:1:+(u>o._0xf03e44);this.stall+=(d-this.stall)*Math.min(1,e/o._0xf04d3f);let f=l.Y,p=l.N;if(r&&(f+=r.Y,p+=r.N),i){let e=Math.round(s/.05),t=this._hold??=new Map,n=t.get(e);n??(n=this.holdMoment(Math.max(e*.05,.05)),t.set(e,n)),p+=n*i}let m=(this.M22*f-this.M12*p)/this.detM,h=(-this.M12*f+this.M11*p)/this.detM;return this.v+=m*e,this.r+=h*e,this.alpha=l.alpha,this.Yr=l.Yr,this.Dr=l.Dr,this.load=Math.max(-1.3,Math.min(1.3,l.cl/(this.cla*o._0xf03e44*Il))),this._0xea37ff=this.stall>.5?`stall`:this.vent>.5?`vent`:null,this}},Vl=(e,t,n,r,i)=>(Math.sin(t*e+i)+Math.sin(n*e+i*2.3)+Math.sin(r*e+i*3.1))/3,Hl=e=>(e%360+360)%360,Ul={...Nl,_0xd5144d:`Generic ski`,_0x650dee:2.2,_0xdf00f2:1,_0x90e520:.3,_0x6e6bcf:.75,_0xc0f67c:.55,_0x7fa38d:1.2,_0xbe75ce:.0012,_0x36a15b:.25,_0x92495f:.3,_0x7fa213:0,roller:0,_0x7d3f14:1,_0x9a7ae4:.6,_0xbf72b2:.25,_0xc6343e:0},Wl=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function Gl(e,t=0){let n=Wl(-.3,0,e),r=1-Wl(.9,1.3,e),i=1-Wl(.25,.45,e);return n*((1-t)*r+t*i)}var Kl=1.225,ql=1025,Jl={_0x3cdd41:.452,_0x1111ab:.701,_0x568c40:.006,_0xe318ab:4.745,_0xccb620:-.421},Yl=class{static defaults(){return{...Ul}}constructor(e=Ul){let{_0xccb620:t,...n}=Jl;this.p={...Ul,...e,...n},this.p._0x2fbec7=(e._0x2fbec7??Nl._0x2fbec7)+t;let r=Cl[this.p._0xd5144d];this.boat=new Ol(r,{_0x18d49b:Math.max(40,this.p.mass-r.skiKg)}),this.p.lateral3&&(this.lat=new Bl(this.boat,{mass:this.p.mass,_0x18d49b:Math.max(40,this.p.mass-r.skiKg),skiKg:r.skiKg,seatX:r.paddler?.seatX??r.seatX??-.33},this.p.lateral3===!0?{}:this.p.lateral3),this.p._0x2ab99a=0),this.hzEq=this.boat.hzEq,this.hull=this.boat,this.xcg=this.boat.xcg,this.reset(0,0,0)}get hz(){return this.boat.hz}set hz(e){this.boat.hz=e}get vz(){return this.boat.vz}set vz(e){this.boat.vz=e}get pitch(){return this.boat.th}set pitch(e){this.boat.th=e}get pitchRate(){return this.boat.om}set pitchRate(e){this.boat.om=e}get thS(){return this.boat.thS??0}set thS(e){this.boat.thS=e}get awash(){return this.boat.awash}set awash(e){this.boat.awash=e}get wet(){return this.boat.wet}set wet(e){this.boat.wet=e}get motionPower(){return this.boat.motionPower}set motionPower(e){this.boat.motionPower=e}get lv(){return this.lat?.v}set lv(e){this.lat&&e!=null&&(this.lat.v=e)}get lr(){return this.lat?.r}set lr(e){this.lat&&e!=null&&(this.lat.r=e)}get ls(){return this.lat?.stall}set ls(e){this.lat&&e!=null&&(this.lat.stall=e)}get lvent(){return this.lat?.vent}set lvent(e){this.lat&&e!=null&&(this.lat.vent=e)}get ldw(){return this.lat?._dwPrev?Array.from(this.lat._dwPrev):null}set ldw(e){this.lat&&(this.lat._dwPrev=e?Float64Array.from(e):null)}get uzp(){return this.boat._0x3ed930?Array.from(this.boat._0x3ed930):null}set uzp(e){this.boat._0x3ed930=e?Float64Array.from(e):null}get maprev(){return this.boat._0xab28e3?Array.from(this.boat._0xab28e3):null}set maprev(e){this.boat._0xab28e3=e?Float64Array.from(e):null}get defl(){return this.boat.defl?Array.from(this.boat.defl):null}set defl(e){this.boat.defl=e?Float64Array.from(e):null}get spray(){return this.boat.spray??0}set spray(e){}get encounter(){return this.boat.encounter??0}set encounter(e){}get plunge(){return this.boat.plunge??0}set plunge(e){}get buryTip(){return this.boat.bury??-1}set buryTip(e){}get splash(){return this.boat.splash??0}set splash(e){}get deckw(){return this.boat._0x5f7e27??0}set deckw(e){this.boat._0x5f7e27=e??0}get aeff(){return this.boat.aeff?Array.from(this.boat.aeff):null}set aeff(e){this.boat.aeff=e?Float64Array.from(e):null}get z(){return this.boat.hz-this.boat._0xd486b6}set z(e){}get headingDeg(){return Hl(this.psi*180/Math.PI)}get forward(){return[Math.sin(this.psi),Math.cos(this.psi)]}reset(e,t,n,r=3.2){this.e=e,this.n=t,this.psi=n*Math.PI/180,this.u=r,this.wPrime=this.p._0xe7a541,this.distance=0,this.power=this.p.cp,this.settle()}settle(){this.roll=0,this.steerSm=0,this.waveLean=0,this.pearl=0,this.rollRate=0,this._0x982cdb=0,this._0x6ad898=0,this.onRun=!1,this.slopeForce=0,this.thrust=0,this.boat.reset(),this.boat._0x3ed930=null,this.placed=!1,this.lat?.reset(),this.current=this.current??[0,0]}step(e,t,n,r,i={}){let a=this.p,o=this.boat,[s,c]=this.forward,l=c,u=-s,d=a.mass*a._0xd8add8,f=a.mass*Ut,p=n.sample(this.e,this.n,r,i),m=n.sample(this.e+s*a._0x650dee,this.n+c*a._0x650dee,r,{}),h=n.sample(this.e-s*a._0x650dee,this.n-c*a._0x650dee,r,{}),g=(m.h-h.h)/(2*a._0x650dee),_=p.sx*l+p.sn*u,v=p.ue*s+p.un*c+this.current[0]*s+this.current[1]*c,y=0,b=0,x=0,S=0,C=h.ue*s+h.un*c;if(a._0x7fa213>0&&(y=a._0x7fa213*(m.ue*l+m.un*u-(h.ue*l+h.un*u))/(2*a._0x650dee)),a.roller>0&&n.spilling){let e=this._sp??=[{},{}];for(let t=0;t<2;t++){let i=t===0?a._0x650dee:-a._0x650dee,o=n.spilling(this.e+s*i,this.n+c*i,r,e[t]),d=o.steep+o.depth>0?o.steep/(o.steep+o.depth):1,f=Math.min(1,2*o.a/a._0x9a7ae4),p=o.p>.01?Math.min(1,a.roller)*o.p*f*(1-d+d*a._0xbf72b2)*Gl(o.theta,d):0;if(!(p>0))continue;let m=o.c*(o.dx*s+o.dy*c),h=o.c*(o.dx*l+o.dy*u);b+=.5*p*Math.max(m-this.u,0)/a._0x7d3f14,x+=(i>0?p:-p)*h/(2*a._0x650dee),S+=.5*p*h,i<0&&(C+=p*(m-C))}}this._0xa88f93=b,this._0xd62d98=x;let w=0,T=0,E=this.lat?.o._0x950e9d?this._wl??=new Float64Array(o._0xe111e0.length):null,D=0,O={},k=(e,t)=>(Object.assign(t,n.sample(this.e+s*e,this.n+c*e,r,O)),w+=t.sx*l+t.sn*u,T++,E&&D<E.length&&(E[D++]=t.ue*l+t.un*u),t);if(!this.placed){let e=0,t=o._0xe111e0;for(let i of t)e+=n.sample(this.e+s*i.x,this.n+c*i.x,r,O).h;o.reset(e/t.length+o.hzEq,o.thEq),o._0x3ed930=null,this.placed=!0}o.step(e,k,{uFwd:this.u,u:this.u});let A=a.hullFilter===0||T===0?_:w/T,j=a.cp;t.power==null?(t.sprint&&this.wPrime>0?j=a._0x990bf6:t.brake&&(j=0),this.wPrime=Math.min(a._0xe7a541,Math.max(0,this.wPrime-(j-a.cp)*e)),this.wPrime<=0&&j>a.cp&&(j=a.cp)):j=t.power;let M=this.u-v,N=0,P=0;if(a.disturb>0){let e=Math.sqrt(n.state.stats?.slopeVar??0),t=a.disturb*Math.min(2,e/.1);N=t*.35*Vl(r,1.9,3.3,5.1,1.7),P=t*.04*Vl(r,2.3,3.9,6.1,.9)}let F=j>0?a.eta*j/Math.max(this.u-(this.current[0]*s+this.current[1]*c),1.5):0,I=o.th-o.thS,ee=1+a._0xe318ab*I*I,L=t.brace||0,te=(a.c2*M*Math.abs(M)*(1+a._0x2ab99a*(this.steerSm*this.steerSm+N*N))*ee+a.c4*M*M*M*Math.abs(M))*Ml(M,a._0xef6fce)*(t.brake?2.2:1)*(1-(t.draft||0))+a._0xd4dbdd*L*M*Math.abs(M),R=Math.min(500*a._0xdcb87b*o.awash*M*Math.abs(M)+o._0xb2a9d4*Math.max(M,0),.8*f),ne=Math.min((a._0x568c40*Math.max(o.motionPower,0)+a._0x568c40*a._0xb77722*this.rollRate*this.rollRate)/Math.max(this.u,1.5),.5*f),re=a._0x6eccf3*d*Ut*A*A,z=n.dominant,ie=z.omega/z.k,ae=Math.min(Math.max((this.u-ie*(z.dx*s+z.dy*c))/(this.u+ie),0),1),oe=-d*Ut*a._0x530f2a*(1-a._0x2fbec7*ae)*g,se=a._0x7859d9>0?a._0x7859d9*Math.min(1,Math.abs(g)/.08)*(1-ae)*te:0,ce=(a._0x3cdd41*d*Ut*g*g+a._0x1111ab*d*Math.abs(g)*Math.abs(M))*ae+se,le=0,ue=0,de=this.wind,fe=a._0xdf00f2??0;if(fe>0&&de&&(de[0]||de[1])){let e=de[0]-s*this.u,t=de[1]-c*this.u,n=e*s+t*c,r=e*l+t*u,i=.5*Kl*fe;le=i*a._0x90e520*Math.abs(n)*n,ue=i*a._0x6e6bcf*Math.abs(r)*r}this._0x6a7db6=le,this._0xf8cfb7=ue,this.u=Math.max(v+.02,this.u+((F+oe+le-te-ce-R-ne-re)/d+b)*e),this._0xe72e54={resist:te,waveRes:ce,pearl:R,_0x982cdb:ne,_0x6ad898:re,vrel:M,brace:a._0xd4dbdd*L*M*Math.abs(M)};let pe=M+v,me=(a.c2*pe*Math.abs(pe)*(1+a._0x2ab99a*(this.steerSm*this.steerSm+N*N))+a.c4*pe*pe*pe*Math.abs(pe))*Ml(pe,a._0xef6fce)*(t.brake?2.2:1)*(1-(t.draft||0))+a._0xd4dbdd*L*pe*Math.abs(pe);this._0xebffbc=oe+b*d-ce-R-ne-re-(te-me),this.pearl=R,this._0x982cdb=ne,this._0x6ad898=re,this.thrust=F,this.slopeForce=oe,this.power=j;let he=n.dominant,ge=he?p.sx*he.dx+p.sn*he.dy:0,_e=ge<-.01&&this.u>1.5,ve=(a.waveLean??0)>0&&_e?Math.sign(A)*Math.min(a._0xfb2c67??.26,(a.waveLean??0)*Math.atan(Math.abs(A))*Math.min(1,-ge/.04)):0,ye=this.waveLean??0;this.waveLean=ye+(ve-ye)*Math.min(1,e*2);let be=1-(a._0x329cc3??0)*Math.min(1,Math.abs(this.waveLean)/(a._0xfb2c67??.26));this._0x973751=A;let xe=a._0xd4dbdd*L*M*Math.abs(M)*a._0x81183e*(t.braceSide||0),Se=a._0x2c64b1*Math.tanh(a._0x319ee2*xe/a._0x2c64b1),Ce=Math.max(this.u,.2),we=a._0xc6343e>0?(1-a._0xc6343e)*Ce+a._0xc6343e*Math.max(.2,this.u-C-(this.current[0]*s+this.current[1]*c)):Ce,Te=((t.steer||0)+N)*a._0xacee49*(we/(we+2)),Ee=a.broach*(1-.5*Math.min(L,1))*be*A*Math.min(Ce/6,1.2),De=ue?-a._0x36a15b*Math.tanh(a._0xbe75ce*ue/a._0x36a15b)*(Ce/(Ce+1))*(a._0x92495f??1):0,Oe;if(this.lat){let n=this.lat,r=(n.o._0x950e9d?0:Ee)+Se+y+x+N*a._0xacee49*(we/(we+2)),i=o._0xe111e0.length,f=o._0xe111e0[i-1],m=o.hs?o.hs[i-1]-(o.hz+f.x*Math.sin(o.th)+f.keel):.04,g=p.ue*s+p.un*c,_=p.ue*l+p.un*u,b=h.ue*l+h.un*u;n.step(e,Math.max(M,.05),(t.steer||0)/.7*n.o._0x062f05*(Math.PI/180),ue?{Y:ue,N:ue*n.o._0x698ece}:null,r,{du:g-C,wExt:(a.carry??1)*_-b,top:m,hull:E,mid:(a.carry??1)*_}),this.psi+=n.r*e,Oe=n.v,this.u=Math.max(v+.02,this.u+(n.v*n.r+n.xG*n.r*n.r-n.Dr/d)*e),this._0x39dfac=n.Yr,this._0x04e2ba=n.load,this._0x0dfab4=!!n._0xea37ff,this._0x6e2ff1=n._0xea37ff,this._0x84ea2d=n.imm;let S=this.yawParts??={};S.rudder=n.r-r,S.broach=Ee,S.brace=Se,S.wind=0,S.ends=y+x}else{this.psi+=(Te+Ee+Se+De+y+x)*e;{let e=this.yawParts??={};e.rudder=Te,e.broach=Ee,e.brace=Se,e.wind=De,e.ends=y+x}Oe=ue?Math.sign(ue)*Math.sqrt(Math.abs(ue)/(.5*ql*a._0xc0f67c))/(1+Ce/a._0x7fa38d):0}let ke=(p.ue*l+p.un*u)*(a.carry??1)+Oe+S;this.leeway=Oe,this.latV=ke,this.e+=(Math.sin(this.psi)*this.u+l*ke)*e,this.n+=(Math.cos(this.psi)*this.u+u*ke)*e,this.distance+=Math.max(this.u,0)*e;let Ae=n.sample(this.e+l*.35,this.n+u*.35,r,{}),B=n.sample(this.e-l*.35,this.n-u*.35,r,{});this.steerSm+=((t.steer||0)-this.steerSm)*Math.min(1,e*4);let je=this.steerSm*.22*Math.min(this.u/3,1.3),Me=this.roll-ye,Ne=Me+((a.hullFilter===0?Math.atan2(B.h-Ae.h,.7):-Math.atan(A))+je+P-Me)*Math.min(1,e*(a.hullFilter===0?8:4));return this.rollRate=(Ne-Me)/e,this.roll=Ne+this.waveLean,this.onRun=oe>.35*F&&g<-.02,this}};function Xl(e){e?Ul.lateral3=e:delete Ul.lateral3}var Zl=Math.PI/180,Ql=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function $l(e,t,n,r){let i=(e|0)^Math.imul(t|0,2654435761)^Math.imul(n|0,2246822519)^Math.imul(r|0,3266489917);return()=>{i=i+1831565813|0;let e=Math.imul(i^i>>>15,1|i);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var eu={cellM:120,stretch:2,cover:.4,riseS:6,lifeS:45,veerDeg:8,speedFrac:.8},tu=class{constructor(e){Object.assign(this,eu,e),this.gustMs??=this.windMs,this.lullMs??=this.windMs,this.seed=(this.seed??1)|0;let t=this.gustMs-this.windMs,n=this.windMs-this.lullMs;this.lullShare??=t+n>0?n>0?t/(t+n):0:.5;let r=(this.fromDeg+180)*Zl;this.ae=Math.sin(r),this.an=Math.cos(r),this.v=this.speedFrac*this.windMs,this.bx=this.stretch*this.cellM,this.by=this.cellM,this.bt=this.lifeS/2,this.gusty=this.gustMs>this.windMs+.01||this.lullMs<this.windMs-.01}sample(e,t,n,r={}){let i=0,a=0,o=0;if(this.gusty&&this.cover>0){let r=e*this.ae+t*this.an,s=e*this.an-t*this.ae,c=r-this.v*n,l=Math.floor(c/this.bx),u=Math.floor(s/this.by),d=Math.floor(n/this.bt),f=Math.floor((n-this.lifeS)/this.bt),p=this.bx/2,m=this.by/2;for(let e=f;e<=d;e++)for(let t=l-1;t<=l+1;t++)for(let r=u-1;r<=u+1;r++){let l=$l(this.seed,t,r,e);if(l()>=this.cover)continue;let u=(t+l())*this.bx,d=(r+l())*this.by,f=n-(e+l())*this.bt,h=(l()<this.lullShare?-1:1)*(.6+.4*l()),g=.7+.6*l(),_=(2*l()-1)*this.veerDeg;if(f<=0||f>=this.lifeS)continue;let v=Ql(0,this.riseS,f)*Ql(0,this.riseS,this.lifeS-f),y=(c-u)/(p*g),b=(s-d)/(m*g),x=v*Math.exp(-y*y-b*b);x<1e-4||(i+=h*x,a+=_*x,o+=x)}}let s=Math.max(0,this.windMs+(this.gustMs-this.windMs)*Math.tanh(1.3*Math.max(i,0))-(this.windMs-this.lullMs)*Math.tanh(1.3*Math.max(-i,0))),c=this.fromDeg+(o>0?a/o*Math.min(1,o):0),l=(c+180)*Zl;return r.ms=s,r.fromDeg=c,r.ve=s*Math.sin(l),r.vn=s*Math.cos(l),r.g=i,r}vector(e,t,n){let r=this.sample(e,t,n,this._v??={});return[r.ve,r.vn]}};function nu(e,t=1){let n=e?.windMs??0,r=e?.windFromDeg;if(!(n>0)||r==null)return null;let i=e.state?.gusts?.on?e.state.gusts:null,a=e.seaModel?.localWind??{},o=a.gustKt==null?i?Math.max(n,i.readMs??i.windMs):n:a.gustKt*.514444;return new tu({windMs:n,fromDeg:r,gustMs:o,lullMs:a.lullKt==null?Math.max(0,2*n-o):a.lullKt*.514444,seed:t,...i?{cover:i.coverage??eu.cover,cellM:i.patchM??eu.cellM,stretch:i.stretch??eu.stretch}:{},...Object.fromEntries([`cover`,`cellM`,`stretch`,`riseS`,`lifeS`,`lullShare`,`veerDeg`,`speedFrac`].filter(e=>a[e]!=null).map(e=>[e,a[e]]))})}var ru=`
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
`;function iu(e){return{p0:[e.ae,e.an,e.v,e.cover],p1:[e.bx,e.by,e.bt,e.lifeS],p2:[e.riseS,e.lullShare,e.veerDeg,0],seed:e.seed|0}}var au=[60,100,120,140,150,160,170,180],ou=600,su=.2/60,cu=10;function lu(e,t,n){let r=n,i=Math.max(0,e);for(let e=1;e<r.length;e++){let n=r[e-1]*t,a=r[e]*t;if(i<=a)return au[e-1]+(au[e]-au[e-1])*(a>n?(i-n)/(a-n):1)}return au[au.length-1]}function uu(e,t,n,r,i,a){let o=lu(t,n,r),s=au[0],c=au[au.length-1],l=o+Math.min(cu,Math.max(0,i-ou)*su)*((o-s)/(c-s)),u=l>e?60:80;return e+(l-e)*(1-Math.exp(-a/u))}var du=[{key:`plane`,min:1,max:3,assign:`_0xef6fce`},{key:`push`,min:.25,max:2,params:[`_0x530f2a`]},{key:`drag`,min:.5,max:1.6,params:[`c2`,`c4`]},{key:`eta`,min:.6,max:1.4,params:[`eta`]},{key:`mass`,min:.7,max:1.4,params:[`mass`]},{key:`broach`,min:0,max:2.5,params:[`broach`]},{key:`turn`,min:.5,max:1.8,params:[`_0xacee49`]},{key:`rudder`,min:0,max:2.5,params:[`_0x2ab99a`]},{key:`pitchI`,min:1,max:15,def:6,abs:100,boat:[`ip`]},{key:`yieldK`,min:0,max:3,boat:[`yieldK`]},{key:`yieldT`,min:.3,max:4,boat:[`yieldT`]},{key:`knee`,min:.25,max:4,boat:[`_0x75d12f`]},{key:`pitchD`,min:0,max:8,def:0,abs:1e3,boat:[`_0xa7c04e`]},{key:`deck`,min:0,max:3,boat:[`_0xf64f98`]},{key:`drain`,min:.3,max:4,boat:[`_0x17d458`]},{key:`sap`,min:0,max:1,def:.5,assign:`_0x7859d9`},{key:`disturb`,min:0,max:2,def:0,assign:`disturb`},{key:`braceD`,min:0,max:3,params:[`_0xd4dbdd`]},{key:`braceT`,min:0,max:3,params:[`_0x319ee2`]},{key:`pearl`,min:0,max:3,params:[`_0xdcb87b`]},{key:`wind`,min:0,max:2,assign:`_0xdf00f2`}],fu=du.map(e=>e.key),pu=.05;function mu(e){let t={};for(let n of du){let r=Number(e?.[n.key]);t[n.key]=Number.isFinite(r)&&e?.[n.key]!==null&&e?.[n.key]!==``?Math.round(Math.min(n.max,Math.max(n.min,r))/pu)*pu:n.def??1,t[n.key]=+t[n.key].toFixed(2)}return t}var hu=()=>mu({}),gu=Object.fromEntries(du.map(e=>[e.key,e.def??1])),_u=e=>fu.every(t=>Math.abs(mu(e)[t]-gu[t])<1e-9);function vu(e,t){let n=mu(t),r={...e};for(let e of du)if(e.assign)(e.def!=null||n[e.key]!==1)&&(r[e.assign]=n[e.key]);else if(e.params)for(let t of e.params)Number.isFinite(r[t])&&(r[t]*=n[e.key]);return r}function yu(e,t){let n=mu(t);for(let t of du)if(t.boat)for(let r of t.boat)t.abs?e[r]=t.abs*n[t.key]:Number.isFinite(e[r])&&e[r]<1e6&&(e[r]*=n[t.key])}var bu=e=>{let t=mu(e);return fu.filter(e=>Math.abs(t[e]-gu[e])>1e-9).map(e=>`${e}:${t[e]}`).join(`,`)};function xu(e){let t={};for(let n of String(e??``).split(`,`)){let[e,r]=n.split(`:`);fu.includes(e)&&(t[e]=Number(r))}return mu(t)}zn[lr]._0x903c72;function Su(e){let t=e?.windMs??0,n=e?.windFromDeg;if(!(t>0)||n==null)return[0,0];let r=(n+180)*Math.PI/180;return[t*Math.sin(r),t*Math.cos(r)]}zn[lr].maxW;var Cu=.545,wu=.74,Tu=1.24,Eu=.4,Du=.2,Ou=3,ku=.7,Au=.7,ju=.65,Mu=3,Nu=.5,Pu=.15,Fu=.04,Iu=[0,.25,.5,.75,1,1.35,1.7,2.05],Lu=(e,t)=>Iu.reduce((n,r,i)=>Math.abs(r*t-e)<Math.abs(Iu[n]*t-e)?i:n,0),Ru=.8,zu=[0,0,1,3],Bu=.25;function Vu(e,t,n){if(e<=3)return n>.89408?`glide`:`idle`;let r=Lu(e,t);return r>=6?`sprint`:r===5?`power on`:r===4?`tempo`:`low power`}var Hu=e=>{let t=Math.min(3,Math.max(0,e)),n=Math.min(2,Math.floor(t));return zu[n]+(zu[n+1]-zu[n])*(t-n)},Uu=.5,Wu=`e.n.psi.u.z.pitch.roll.wPrime.steerSm.waveLean.distance.onRun.slopeForce.thrust.power.hz.vz.pitchRate.thS.rollRate.awash.pearl.motionPower.wet.uzp.maprev.aeff.defl.deckw.lv.lr.ls.lvent.ldw.hr`.split(`.`),Gu=[`t`,`e`,`n`,`psi`,`u`,`z`,`pitch`,`roll`,`power`,`wPrime`,`phase`,`splash`,`spray`,`encounter`,`plunge`,`bury`,`m0`,`m1`,`m2`,`m3`,`m4`,`bl`],Ku=e=>[e.t,e.e,e.n,e.psi,e.u,e.z,e.pitch,e.roll,e.power,e.wPrime,e.phase??0,e.splash??0,e.spray??0,e.encounter??0,e.plunge??0,e.bury??-1,...e.mix??[1,0,0,0,0],e.braceLevel??0].map((e,t)=>t===0?+e.toFixed(4):+Number(e).toFixed(6));function qu(e,t){let n={};t.forEach((t,r)=>{n[t]=e[r]});let r={...n,mix:[n.m0,n.m1,n.m2,n.m3,n.m4??0],braceLevel:n.bl??0};return delete r.m0,delete r.m1,delete r.m2,delete r.m3,delete r.m4,delete r.bl,r}var Ju=(e,t)=>Object.keys(e).every(n=>Math.abs(e[n]-t[n])<1e-9),Yu=class{constructor(e,t,n=null,r=lr,i=`v2`){this.h=e.stepS??.008333333333333333,this.scn=e,this.field=t,this.depthFn=n,this.model=i,this.paddlerName=zn[r]?r:lr,this.paddler0=this.paddlerName,this.prof=zn[this.paddlerName];let a=Yl;this.Model=a,this.tune0=mu(e.tune),this.tune={...this.tune0},this.windSeed=(e.windSeed??e.state?.seed??1)|0,this.localWind=nu(e,this.windSeed),this.ski=this.buildSki(this.tune),this.ski.current=e.current??[0,0],this.draft=0,this.restart()}buildSki(e){let t=new this.Model(vu({...this.Model.defaults(),...this.prof.boat,cp:this.prof._0x903c72,_0xe7a541:this.prof.wPrime},e));return t.boat?.params&&(t.boat.params._0xdcb87b*=e.pearl,yu(t.boat.params,e)),t.current=this.scn.current??[0,0],t.wind=Su(this.scn),t.hr=100,t}tuneAt(e){let t=this.tune0;for(let n of this.events)n.k===`tune`&&n.i<=e&&(t=n.v);return{...t}}paddlerAt(e){let t=this.paddler0;for(let n of this.events)n.k===`paddler`&&n.i<=e&&(t=n.v);return t}swapBoat(e,t){let n=this.getState(),r=this.prof.wPrime>0?n.wPrime/this.prof.wPrime:1;this.tune=mu(e),this.paddlerName=zn[t]?t:this.paddlerName,this.prof=zn[this.paddlerName],this.ski=this.buildSki(this.tune),this.setState(n),this.ski.wPrime=r*this.prof.wPrime,this.target=Math.min(this.target,this.prof.maxW),this.power=Math.min(this.power,this.prof.maxW)}retune(e){this.swapBoat(e,this.paddlerName)}setPaddler(e){return!zn[e]||e===this.paddlerName?!1:(this.apply({i:this.i,k:`paddler`,v:e},!0),!0)}setTune(e){let t=mu(e);return!Ju(t,this.tune)&&(this.apply({i:this.i,k:`tune`,v:t},!0),!0)}setStep(e){if(e===this.h)return!0;let t=this.i*this.h/e;return Math.abs(t-Math.round(t))>1e-6?!1:(this.i=Math.round(t),this.h=e,this.carry=0,!0)}get dt(){return this.h*2}get t(){return(this.frames.length-1)*this.dt}restart(){let e=this.scn.start??{e:0,n:0};(!Ju(this.tune,this.tune0)||this.paddlerName!==this.paddler0)&&(this.tune={...this.tune0},this.paddlerName=this.paddler0,this.prof=zn[this.paddler0],this.ski=this.buildSki(this.tune)),this.ski.reset(e.e,e.n,this.scn.headingDeg,this.scn.speed),this.ski.current=this.scn.current??[0,0],this.target=this.prof._0x903c72,this.power=this.prof._0x903c72,this.autoPower=!1,this.upHeld=!1,this.downHeld=!1,this.holdT=0,this.steerCmd=0,this.steerIn=0,this.phase=0,this.glide=null,this.i=0,this.aground=!1,this.braceLevel=0,this.levelT=0,this.lvS=0,this.upHoldT=0,this.sideT=0,this.mode=`paddle`,this.sticky=!1,this.modeT=0,this.side=0,this.braceWhy=``,this.tapCount=0,this.lastTapI=-1e9,this.holdDownT=0,this.w=[1,0,0],this.wv=[0,0,0],this.sideS=0,this.sideV=0,this.events=[],this.frames=[],this.states=[],this.scratch={},this.record()}record(){let e=ml(this.ski,this.i*this.h,this.phase);e.mix=[this.w[0],this.w[1],this.w[2],this.sideS,this.lvS],e.braceLevel=this.mode===`brace`?this.braceLevel:0,this.frames.push(e),this.states.push(this.getState())}getState(){let e={i:this.i,clashI:this.clashI??-1,target:this.target,upHeld:this.upHeld,downHeld:this.downHeld,holdT:this.holdT,power:this.power,steerCmd:this.steerCmd,steerIn:this.steerIn,phase:this.phase,glide:this.glide&&{...this.glide},mode:this.mode,sticky:this.sticky,modeT:this.modeT,side:this.side,braceWhy:this.braceWhy,tapCount:this.tapCount,lastTapI:this.lastTapI,holdDownT:this.holdDownT,w:[...this.w],wv:[...this.wv],sideS:this.sideS,sideV:this.sideV,braceLevel:this.braceLevel,levelT:this.levelT,lvS:this.lvS,upHoldT:this.upHoldT,sideT:this.sideT,autoPower:this.autoPower};for(let t of Wu)e[t]=this.ski[t];return e}setState(e){this.i=e.i,this.clashI=e.clashI??-1,this.target=e.target,this.upHeld=e.upHeld,this.downHeld=e.downHeld,this.holdT=e.holdT,this.power=e.power,this.steerCmd=e.steerCmd,this.steerIn=e.steerIn,this.phase=e.phase,this.glide=e.glide?{...e.glide}:null,this.mode=e.mode??`paddle`,this.sticky=e.sticky??!1,this.modeT=e.modeT??0,this.side=e.side??0,this.braceWhy=e.braceWhy??``,this.tapCount=e.tapCount??0,this.lastTapI=e.lastTapI??-1e9,this.holdDownT=e.holdDownT??0,this.w=e.w?[...e.w]:[1,0,0],this.wv=e.wv?[...e.wv]:[0,0,0],this.sideS=e.sideS??0,this.sideV=e.sideV??0,this.braceLevel=e.braceLevel??0,this.levelT=e.levelT??0,this.lvS=e.lvS??0,this.upHoldT=e.upHoldT??0,this.sideT=e.sideT??0,this.autoPower=e.autoPower??!1;for(let t of Wu)this.ski[t]=e[t]}setPower(e){e!==(this.autoPower?this.target:null)&&this.apply({i:this.i,k:`power`,v:e},!0)}setSteer(e){e!==this.steerCmd&&this.apply({i:this.i,k:`steer`,v:e},!0)}setUp(e){e!==this.upHeld&&this.apply({i:this.i,k:`up`,v:e},!0)}setDown(e){e!==this.downHeld&&this.apply({i:this.i,k:`down`,v:e},!0)}setBrace(e){let t=Math.max(1,Math.min(3,Math.round(e)));(this.mode!==`brace`||t!==this.braceLevel||this.autoPower)&&this.apply({i:this.i,k:`brace`,v:t},!0)}bump(e){this.apply({i:this.i,k:`bump`,v:e},!0)}clash(e=.4){this.apply({i:this.i,k:`clash`,v:e},!0)}apply(e,t=!1){if(e.k===`move`||e.k===`turn`)return this.teleport(e);if(e.k===`bump`){let t=this.ski,n=t.e+e.v.de,r=t.n+e.v.dn;(!this.depthFn||this.depthFn(n,r)>=Au)&&(t.e=n,t.n=r),t.psi+=e.v.dpsi,t.u=Math.max(.05,t.u+e.v.du)}else e.k===`clash`&&(this.clashI=this.i+Math.round(e.v/this.h),this.power=0);if(e.k===`tune`)this.retune(e.v);else if(e.k===`paddler`)this.swapBoat(this.tune,e.v);else if(e.k===`steer`)this.steerCmd=e.v;else if(e.k===`power`)e.v==null?this.autoPower=!1:(this.mode!==`paddle`&&this.setMode(`paddle`),this.autoPower=!0,this.holdT=0,this.upHeld=!1,this.downHeld=!1,this.target=Math.min(this.prof.maxW,Math.max(0,e.v)));else if(e.k===`up`){if(this.upHeld=e.v,e.v&&(this.autoPower=!1),e.v&&this.mode===`brace`)this.downHeld=!1,this.upHoldT=0,--this.braceLevel,this.braceLevel<=0&&this.setMode(`idle`);else if(e.v){let e=this.mode===`paddle`;e||this.setMode(`paddle`),this.downHeld=!1,this.holdT=Eu,e&&(this.target=this.stepLevel(1))}}else e.k===`down`?(this.downHeld=e.v,e.v&&(this.autoPower=!1),e.v&&(this.pressDown(),this.upHeld=!1,this.holdT=Eu,this.mode===`paddle`&&(this.target=this.stepLevel(-1)))):e.k===`brace`&&(this.autoPower=!1,this.upHeld=!1,this.downHeld=!1,this.holdT=0,this.mode!==`brace`&&this.setMode(`brace`),this.braceLevel=e.v,this.sticky=!0);t&&(this.events.push(e),this.states.length&&this.states[this.states.length-1].i===this.i&&(this.states[this.states.length-1]=this.getState()))}strafe(e,t){return this.jump({i:this.i,k:`move`,f:e,r:t})}turn(e){return this.jump({i:this.i,k:`turn`,deg:e})}jump(e){if(!this.apply(e,!1))return!1;if(this.events.push(e),this.i%2==0&&this.states[this.states.length-1]?.i!==this.i)this.record();else{let e=this.frames.length-1,t=ml(this.ski,this.i*this.h,this.phase);t.mix=[this.w[0],this.w[1],this.w[2],this.sideS,this.lvS],t.braceLevel=this.mode===`brace`?this.braceLevel:0,this.frames[e]={...t,t:this.frames[e].t},this.states[e]=this.getState()}return this.frames[this.frames.length-1].jump=!0,!0}teleport(e){let t=this.ski;if(e.k===`turn`)return t.psi+=e.deg*Math.PI/180,!0;let n=Math.sin(t.psi),r=Math.cos(t.psi),i=t.e+n*e.f+r*e.r,a=t.n+r*e.f-n*e.r;return this.depthFn&&this.depthFn(i,a)<Au?!1:(t.e=i,t.n=a,this.scratch={},this.aground=!1,t.settle?t.settle():t.placed=!1,!0)}setMode(e){let t=this.mode;this.mode=e,this.modeT=0,e===`paddle`&&t!==`paddle`&&(this.target=Iu[1]*this.prof._0x903c72),e!==`paddle`&&(this.target=0),e===`brace`?(t!==`brace`&&(this.braceLevel=1),this.chooseBraceSide()):this.braceLevel=0,e===`paddle`&&(this.tapCount=0,this.sticky=!1)}stepLevel(e){let t=this.prof._0x903c72,n=this.target;if(e>0){for(let e=1;e<Iu.length;e++)if(Iu[e]*t>n+1.5)return Math.min(this.prof.maxW,Iu[e]*t);return Math.min(this.prof.maxW,n+.35*t)}for(let e=Iu.length-1;e>=0;e--)if(Iu[e]*t<n-1.5)return Iu[e]*t;return 0}pressDown(){this.tapCount=(this.i-this.lastTapI)*this.h<ju?this.tapCount+1:1,this.lastTapI=this.i,this.levelT=0,this.mode===`paddle`&&this.power<=3&&(this.setMode(`idle`),this.sticky=!0),this.mode===`paddle`?this.tapCount>=Mu&&(this.setMode(`idle`),this.sticky=!0):this.mode===`idle`?(this.setMode(`brace`),this.sticky=!0):this.mode===`brace`&&(this.braceLevel=Math.min(3,this.braceLevel+1))}chooseBraceSide(){let e=this.steerIn||this.steerCmd,t=this.ski._0x973751??0;if(Math.abs(e)>Pu)this.side=Math.sign(e),this.braceWhy=`turn`;else if(Math.abs(t)>Fu)this.side=Math.sign(t),this.braceWhy=`face`;else{let e=(this.phase/(2*Math.PI)%1+1)%1;this.side=e<.5?1:-1,this.braceWhy=`stroke`}this.sideT=0,this.w[2]<.05&&(this.sideS=this.side,this.sideV=0)}stepMode(){if(this.modeT+=this.h,this.holdDownT=this.downHeld?this.holdDownT+this.h:0,this.mode===`paddle`&&this.power<5&&this.target<5?(this.setMode(`idle`),this.sticky=!0,this.levelT=0):this.mode===`idle`&&this.downHeld?(this.levelT+=this.h,this.levelT>=Nu&&(this.setMode(`brace`),this.levelT=0)):this.mode===`brace`&&this.downHeld&&(this.levelT+=this.h,this.levelT>=.6&&this.braceLevel<3&&(this.braceLevel++,this.levelT=0)),this.downHeld||(this.levelT=0),this.mode===`brace`&&this.upHeld?(this.upHoldT+=this.h,this.upHoldT>=.5&&(this.setMode(`paddle`),this.upHoldT=0)):this.upHoldT=0,this.mode===`brace`){this.sideT+=this.h;let e=this.ski.steerSm*.22*Math.min(this.ski.u/3,1.3);this.sideT>=Ru&&e*this.side<-.04&&(this.side=-this.side,this.braceWhy=`roll`,this.sideT=0)}this.lvS+=((this.mode===`brace`?this.braceLevel:0)-this.lvS)*(1-Math.exp(-this.h/Bu));let e=[+(this.mode===`paddle`),+(this.mode===`idle`),+(this.mode===`brace`)];for(let t=0;t<3;t++)this.wv[t]+=(64*(e[t]-this.w[t])-16*this.wv[t])*this.h,this.w[t]+=this.wv[t]*this.h;this.sideV+=(64*(this.side-this.sideS)-16*this.sideV)*this.h,this.sideS+=this.sideV*this.h}advance(e,t=null){this.carry=(this.carry??0)+e;let n=Math.floor(this.carry/this.h);this.carry-=n*this.h;for(let e=0;e<n;e++)this.stepOnce(t);return this.t}stepOnce(e){if(e)for(;e.pos<e.events.length&&e.events[e.pos].i<=this.i;)this.apply(e.events[e.pos++],!1);let t=this.ski;this.i%2==0&&this.states[this.states.length-1]?.i!==this.i&&this.record();let n=this.holdT>0;n&&(this.holdT-=this.h);let r=this.prof._0x903c72;if(this.downHeld&&!n)this.target=Math.max(0,this.target-Tu*r*this.h);else if(this.upHeld&&this.mode===`paddle`&&!n)this.target=Math.min(this.prof.maxW,this.target+wu*r*this.h);else if(!n){if(this.mode!==`paddle`)this.target=0;else if(this.target>r&&!this.autoPower){let e=r-this.target,t=Cu*r*this.h;this.target+=Math.abs(e)<t?e:-t}}this.power+=(this.target-this.power)*(1-Math.exp(-this.h/Du));let i=this.prof.cpW;this.ski.wPrime<=0&&this.power>i&&(this.power=i),this.i<(this.clashI??-1)&&(this.power=0),this.ski.wPrime=this.power>i?Math.max(0,this.ski.wPrime-(this.power-i)*this.h):Math.min(this.prof.wPrime,this.ski.wPrime+Uu*(i-this.power)*this.h),this.ski.hr=uu(this.ski.hr??100,this.power,this.prof._0x903c72,Iu,this.i*this.h,this.h);let a=this.steerCmd-this.steerIn,o=Ou*this.h;this.steerIn+=Math.abs(a)<o?a:Math.sign(a)*o,this.stepMode();let s=t.e,c=t.n;if(this.localWind&&(t.wind=this.localWind.vector(t.e,t.n,this.i*this.h)),t.step(this.h,{steer:this.steerIn*ku,power:this.power,brace:Hu(this.lvS),braceSide:this.sideS,draft:this.draft},this.field,this.i*this.h,this.scratch),this.depthFn&&this.depthFn(t.e,t.n)<Au?(t.e=s,t.n=c,t.u=Math.max(.3,Math.min(t.u,.6)),this.aground=!0):this.aground=!1,this.scn.fixedSpeed>0&&(t.u=this.scn.fixedSpeed),this.power>5){let e=Mn(this.prof,this.power,this.phase,this.glide,this.h);this.phase=e.phase,this.glide=e.glide}this.i++}truncateTo(e){e=Math.max(0,Math.min(e,this.frames.length-1));let t=this.states[e],n=this.tuneAt(t.i),r=this.paddlerAt(t.i);this.frames.length=e,this.states.length=e,(!Ju(n,this.tune)||r!==this.paddlerName)&&(this.tune=n,this.paddlerName=r,this.prof=zn[r],this.ski=this.buildSki(n)),this.setState(t),this.record(),this.events=this.events.filter(e=>e.i<=t.i),this.carry=0,this.aground=!1}avgSpeed(e=1/0){let t=this.states.length-1;if(t<1)return this.ski.u;let n=Number.isFinite(e)?Math.max(0,t-Math.round(e/this.dt)):0,r=(t-n)*this.dt;return r>0?(this.states[t].distance-this.states[n].distance)/r:this.ski.u}surfShare(){let e=0,t=this.states.length;for(let n=0;n<t;n++)this.states[n].onRun&&e++;return t?e/t:0}makeClip(e,t,n={}){e=Math.max(0,e),t=Math.min(this.frames.length-1,t);let r=this.states[e],i=this.states[t];return{kind:`surfski-clip`,version:2,...n,...this.scn.fixedSpeed>0?{fixedSpeed:this.scn.fixedSpeed}:{},..._u(this.tuneAt(r.i))?{}:{tune:this.tuneAt(r.i)},scenario:this.scn.name,paddler:this.paddlerAt(r.i),model:this.model,windSeed:this.windSeed,start:r,steps:i.i-r.i,events:this.events.filter(e=>e.i>r.i&&e.i<=i.i),frameKeys:Gu,frames:this.frames.slice(e,t+1).map(Ku),track:this.frames.slice(e,t+1).filter((e,t)=>t%15==0).map(e=>[+e.t.toFixed(2),+e.e.toFixed(1),+e.n.toFixed(1),+e.u.toFixed(2)])}}};function Xu(e,t,n,r=null){let i=new Yu({...t,tune:e.tune??null,fixedSpeed:e.fixedSpeed??null,windSeed:e.windSeed??t.windSeed},n,r,e.paddler,e.model??`v1`);i.frames=[],i.states=[],i.events=[],i.setState(e.start),i.record();let a={events:e.events,pos:0};if(i.advance((e.steps+1)*pl+1e-9,a),Array.isArray(e.frames)&&e.frameKeys){let t=Math.min(e.frames.length,i.frames.length);for(let n=0;n<t;n++){let t=qu(e.frames[n],e.frameKeys);i.frames[n]={...i.frames[n],...t};let r=i.states[n];if(r)for(let e of[`e`,`n`,`psi`,`u`,`pitch`,`roll`,`power`,`wPrime`,`phase`])r[e]=t[e]}i.frames.length=t,i.states.length=Math.min(i.states.length,t),i.recorded=!0}return i}var Zu=9.81;function Qu(e,{ns:t=160,nz:n=10,smoothM:r=.08}={}){let i=e.spec.L,a=e.hzEq,o=e.thEq,s=new Float64Array(t),c=new Float64Array(t),l=0;for(let n=0;n<t;n++){let r=(n+.5)/t;s[n]=(.5-r)*i,c[n]=Math.max(0,-(a+s[n]*Math.sin(o)+e.keelRel(r))),l=Math.max(l,c[n])}let u=l/n,d=new Float64Array(t*n),f=-i/2;for(let r=0;r<t;r++){let a=(r+.5)/t,o=e.keelRel(a),l=e.deckRel(a)-o,p=e.halfWidth(a),m=e.bottomK(a),h=-i/2+a*i;for(let t=0;t<n;t++){let i=c[r]-(t+.5)*u;d[r*n+t]=i>0?p*e.profile(i/l,m,h):0}d[r*n]>.002&&s[r]>f&&(f=s[r])}if(r>0){let e=r/(i/t),a=Math.ceil(3*e),o=Array.from({length:2*a+1},(t,n)=>Math.exp(-((n-a)**2)/(2*e*e))),s=new Float64Array(t);for(let e=0;e<n;e++){for(let r=0;r<t;r++){let i=0,c=0;for(let s=-a;s<=a;s++){let l=r+s;l<0||l>=t||(i+=o[s+a]*d[l*n+e],c+=o[s+a])}s[r]=i/c}for(let r=0;r<t;r++)d[r*n+e]=s[r]}}let p=e=>Math.min(t-1,Math.max(0,Math.round((.5-e/i)*t-.5))),m=f-.6,h=Math.atan(d[p(f-.3)*n]/.3),g=0;for(let e=0;e<t;e++)g=Math.max(g,d[e*n]);return{x:s,dxs:i/t,dz:u,nz:n,ns:t,Y:d,draft:l,xStem:f,bowX:m,bowDraft:c[p(m)],alpha:h,L:i,halfB:g,halfWL:e=>d[p(e)*n]}}var $u=new Map;function ed(e){if(!$u.has(e)){let t=Math.round(Math.log2(e)),n=new Uint32Array(e),r=new Float64Array(e/2),i=new Float64Array(e/2);for(let r=0;r<e;r++){let e=0;for(let n=0;n<t;n++)e|=(r>>n&1)<<t-1-n;n[r]=e}for(let t=0;t<e/2;t++)r[t]=Math.cos(2*Math.PI*t/e),i[t]=Math.sin(2*Math.PI*t/e);$u.set(e,{rev:n,cos:r,sin:i})}return $u.get(e)}function td(e,t,n,r,i){let{rev:a,cos:o,sin:s}=ed(i);for(let o=0;o<i;o++){let i=a[o];if(i>o){let a=n+o*r,s=n+i*r,c=e[a];e[a]=e[s],e[s]=c,c=t[a],t[a]=t[s],t[s]=c}}for(let a=2;a<=i;a<<=1){let c=a>>1,l=i/a;for(let u=0;u<i;u+=a)for(let i=0;i<c;i++){let a=o[i*l],d=s[i*l],f=n+(u+i)*r,p=f+c*r,m=e[p]*a-t[p]*d,h=e[p]*d+t[p]*a;e[p]=e[f]-m,t[p]=t[f]-h,e[f]+=m,t[f]+=h}}}function nd(e,t,n,r){for(let i=0;i<r;i++)td(e,t,i*n,1,n);for(let i=0;i<n;i++)td(e,t,i,n,r)}var rd={coarse:{Nx:512,Ny:256,dx:.25,ahead:14,fadeM:32},fine:{Nx:512,Ny:256,dx:.04,ahead:3.5,fadeM:5},kSplit:6,kMaxShare:.6,wedge:{deg:23,near:.6,soft:.6,softPerM:.085,keepAhead:.3,aheadM:1.2}},id=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)};function ad(e,t,n,r=rd.wedge){let i=Math.max(0,e.xStem-t),a=e.halfB+r.near+i*Math.tan(r.deg*Math.PI/180);return(1-id(a,a+r.soft+r.softPerM*i,Math.abs(n)))*(1-id(e.xStem+r.keepAhead,e.xStem+r.aheadM,t))}function od(e,t,n={}){let r={...rd.coarse,kHi:rd.kMaxShare*Math.PI/(n.dx??rd.coarse.dx),kLo:0,...n},{Nx:i,Ny:a,dx:o}=r,s=i*o,c=a*o,l=r.ahead-s,u=-c/2,d=i*a,f=new Float64Array(d),p=new Float64Array(d),m=new Float64Array(d),h=new Float64Array(d),g=t*t,_=t/(2*r.fadeM),{ns:v,nz:y,x:b,dxs:x,dz:S,Y:C}=e,w=e=>Math.exp(-((e/r.kHi)**4))*(r.kLo>0?1-Math.exp(-((e/r.kLo)**4)):1),T=new Float64Array(y),E=new Float64Array(y);new Float64Array(y);for(let e=0;e<i;e++){let n=e<i/2?e:e-i,r=2*Math.PI*n/s;if(n===0)continue;T.fill(0),E.fill(0);for(let e=0;e<v;e++){let t=Math.cos(r*b[e])*x,n=-Math.sin(r*b[e])*x;for(let r=0;r<y;r++){let i=C[e*y+r];i&&(T[r]+=i*t,E[r]+=i*n)}}let o=Math.cos(r*l),d=Math.sin(r*l);for(let n=0;n<a;n++){let s=n<a/2?n:n-a,l=2*Math.PI*s/c,v=Math.hypot(r,l),b=w(v);if(b<1e-6)continue;let x=0,C=0,D=Math.exp(-v*S),O=Math.exp(-.5*v*S);for(let e=0;e<y;e++)x+=T[e]*O,C+=E[e]*O,O*=D;let k=Zu*v-g*r*r,A=-2*_*t*r,j=k*k+A*A,M=-2*g*r*r*S*b/j,N=M*(x*k+C*A),P=M*(C*k-x*A),F=l*u,I=Math.cos(F),ee=Math.sin(F),L=o*I-d*ee,te=o*ee+d*I,R=N*L-P*te;P=N*te+P*L,N=R;let ne=n*i+e;f[ne]=(1-r)*N,p[ne]=(1-r)*P,m[ne]=-l*P,h[ne]=l*N}}nd(f,p,i,a),nd(m,h,i,a);let D=1/(s*c),O=new Float32Array(d*4),k=.001;for(let t=0;t<a;t++)for(let n=0;n<i;n++){let a=t*i+n,s=l+n*o,c=u+t*o,d=f[a]*D,h=r.wedge===!1||e.xStem==null||e.halfB==null?1:ad(e,s,c,r.wedge??rd.wedge);if(h<=0)continue;let g=h>=1?0:(ad(e,s+k,c)-ad(e,s-k,c))/(2*k),_=h>=1?0:(ad(e,s,c+k)-ad(e,s,c-k))/(2*k);O[4*a]=h*d,O[4*a+1]=h*p[a]*D+g*d,O[4*a+2]=h*m[a]*D+_*d}return{Nx:i,Ny:a,dx:o,x0:l,y0:u,U:t,data:O}}function sd(e,t){let n=od(e,t,{...rd.coarse,kHi:rd.kSplit}),r=od(e,t,{...rd.fine,kLo:rd.kSplit,kHi:rd.kMaxShare*Math.PI/rd.fine.dx}),i=(e,t,n)=>{let r=(t-e.x0)/e.dx,i=(n-e.y0)/e.dx,a=Math.floor(r),o=Math.floor(i),s=r-a,c=i-o,l=e.data,u=e.Nx,d=(e,t)=>l[4*(t*u+e)];return(d(a,o)*(1-s)+d(a+1,o)*s)*(1-c)+(d(a,o+1)*(1-s)+d(a+1,o+1)*s)*c},a=0;for(let t=e.xStem+.1;t>e.xStem-1;t-=.02){let o=e.halfWL(t)+.03;a=Math.max(a,i(n,t,o)+i(r,t,o))}let o=ld(t,e.bowDraft,e.alpha);return{coarse:n,fine:r,U:t,crest:a,FD:o.FD,Zb:o.Zb,bowGain:ud(o.FD)}}function cd(e){let t=new Uint16Array(e.length),n=new Float32Array(1),r=new Uint32Array(n.buffer);for(let i=0;i<e.length;i++){n[0]=e[i];let a=r[0],o=a>>>16&32768,s=(a>>>23&255)-112,c=a&8388607;s<=0?t[i]=s<-10?o:o|(c|8388608)>>1-s+13:t[i]=s>=31?o|31744:o|s<<10|c>>13}return t}function ld(e,t,n){let r=e/Math.sqrt(Zu*Math.max(t,1e-4)),i=e*e/Zu;return{Zb:i*2.2*Math.tan(n)/(Math.cos(n)*(1+r)),Tb:i*1.1/(1+r),FD:r}}var ud=e=>Math.min(2.4,Math.max(1,1.023+.44*Math.log(Math.max(e,.001))));function dd(e,t,n,r){if(!(e>0)||!(t>0)||!(n>0)||!(r>0))return 0;let i=(e,t)=>e*e/(1+e/Math.sqrt(Zu*t));return i(e,t)/i(n,r)}var fd={step:1.03,uMin:.6,uMax:8,fadeS:.4,bowTau:.12,fields:12},pd=.5,md=400,hd=8,gd=.2,_d=300,vd=e=>fd.step**+Math.round(Math.log(e)/Math.log(fd.step)),yd=1,bd=class{constructor(e,t,{worker:n=null,fields:r=fd.fields}={}){this.water=e,this.boat=t,this.hull=Qu(t),this.scale=1;let i=rd.coarse,a=rd.fine,o=i.Nx*i.Ny*4;if(a.Nx!==i.Nx||a.Ny!==i.Ny)throw Error(`the two Kelvin grids must be the same size (one texture array)`);this.tex=new ct(new Uint16Array(o*2*r),i.Nx,i.Ny,2*r),Object.assign(this.tex,{type:mt,format:S,minFilter:Be,magFilter:Be,generateMipmaps:!1,wrapS:Te,wrapT:Te}),this.tex.needsUpdate=!0,this.table=new ne(new Float32Array(768),24,8,S,I),Object.assign(this.table,{minFilter:se,magFilter:se,generateMipmaps:!1});let s=e.uniforms,c=e=>new Ce(e.ahead-e.Nx*e.dx,-(e.Ny*e.dx)/2,e.Nx*e.dx,e.Ny*e.dx);s.uBowTex.value=this.tex,s.uBowC.value.copy(c(i)),s.uBowF.value.copy(c(a)),s.uWakeTex.value=this.table,s.uWakeN.value=0,this.slots=Array.from({length:r},()=>({U:0,gain:1,crest:0,used:0})),this.pending=new Map,this.wakes=[],this.worker=n,n&&n.addEventListener(`message`,e=>this._receive(e.data))}wake(e){return e>=8?null:this.wakes[e]??=new xd(this,e)}field(e){let t=this.slots.findIndex(t=>t.U===e);if(t>=0)return this.slots[t].used=performance.now?.()??Date.now(),t;if(!this.pending.has(e)){let t=yd++;if(this.pending.set(e,t),this.worker)this.worker.postMessage({kind:`field`,id:t,U:e});else{let n=sd(this.hull,e);this._receive({id:t,U:e,coarse:cd(n.coarse.data),fine:cd(n.fine.data),bowGain:n.bowGain,crest:n.crest})}}return-1}_receive(e){if(this.pending.get(e.U)!==e.id)return;this.pending.delete(e.U);let t=new Set(this.wakes.flatMap(e=>e?[e.shown,e.fading?e.target:-1]:[])),n=this.slots.findIndex(e=>!e.U);if(n<0){let e=1/0;this.slots.forEach((r,i)=>{!t.has(i)&&r.used<e&&(e=r.used,n=i)})}if(n<0)return;let r=this.tex.image.width*this.tex.image.height*4,i=this.tex.image.data;i.set(e.coarse,2*n*r),i.set(e.fine,(2*n+1)*r),this.tex.addLayerUpdate(2*n),this.tex.addLayerUpdate(2*n+1),this.tex.needsUpdate=!0,this.slots[n]={U:e.U,gain:e.bowGain,crest:e.crest,used:performance.now?.()??Date.now()}}upload(){let e=0;this.wakes.forEach((t,n)=>{t?.drawn&&(e=n+1)}),this.water.uniforms.uWakeN.value=e,this.table.needsUpdate=!0}},xd=class{constructor(e,t){this.bank=e,this.i=t,this.hull=e.hull,this.boat=e.boat,this.shown=-1,this.target=-1,this.mix=0,this.fading=!1,this.bow=1,this.on=!0,this.drawn=!1,this.state={U:0,Uq:0,bow:1,gain:1,Urel:0,D:0},this.track=[]}get scale(){return this.bank.scale}set scale(e){this.bank.scale=e}get slots(){return this.bank.slots}_row(e){return(this.i*24+e)*4}off(){let e=this.bank.table.image.data,t=this._row(22);e[t+1]=0,e[t+3]=0,this.drawn=!1}_track(e,t,n,r,i){let a=this.track,o=(e,t)=>Math.hypot(e[0]-t[0],e[1]-t[1]),s=[e,t],c;if(i){c=[s];let e=0;for(let t=1;t<=_d;t++){let n=i(t*gd);if(!n)break;let r=o(n,c[c.length-1]);if(r>hd||(r>.001&&(c.push(n),e+=r),e>80))break}}else a.length&&o(s,a[0])>hd&&(a.length=0),(!a.length||o(s,a[0])>=pd)&&(a.unshift(s),a.length>md&&(a.length=md)),c=[s,...a.filter((e,t)=>t||o(e,s)>.001)];let l=[0];for(let e=1;e<c.length;e++)l.push(l[e-1]+o(c[e],c[e-1]));let u=[-n,-r];if(c.length>1){let e=c[c.length-2],t=c[c.length-1],n=o(e,t);n>.05&&(u=[(t[0]-e[0])/n,(t[1]-e[1])/n])}let d=[],f=c[c.length-1],p=l[l.length-1];for(let e=0,t=0;e<21;e++){let n=e*4;if(n<=p&&c.length>1){for(;t<c.length-2&&l[t+1]<n;)t++;let e=(n-l[t])/Math.max(l[t+1]-l[t],1e-6);d.push([c[t][0]+(c[t+1][0]-c[t][0])*e,c[t][1]+(c[t+1][1]-c[t][1])*e])}else d.push([f[0]+u[0]*(n-p),f[1]+u[1]*(n-p)])}let m=this.bank.table.image.data;for(let e=0;e<21;e++){let t=d[Math.max(0,e-1)],i=d[Math.min(20,e+1)],a=o(t,i),s=e===0||a<1e-6?[n,r]:[(t[0]-i[0])/a,(t[1]-i[1])/a],c=this._row(e);m[c]=d[e][0],m[c+1]=d[e][1],m[c+2]=s[0],m[c+3]=s[1]}}update(e,t,n,r,i=null){let a=this.bank,o=n??[0,0],s=a.table.image.data,c=t.u-(o[0]*t.fe+o[1]*t.fn);{let e=this._row(21);s[e]=t.e,s[e+1]=t.n,s[e+2]=t.fe,s[e+3]=t.fn}this._track(t.e,t.n,t.fe,t.fn,i);let l=this.shown>=0?a.slots[this.shown]:null;if(l&&l.U===0&&(this.shown=-1),this.on&&c>fd.uMin&&!this.fading){let e=Math.min(fd.uMax,vd(c));if(e!==(this.shown>=0?a.slots[this.shown].U:0)){let t=a.field(e);t>=0&&(this.shown<0?this.shown=t:(this.fading=!0,this.target=t))}}if(this.fading&&(this.mix=Math.min(1,this.mix+e/fd.fadeS),this.mix>=1&&(this.shown=this.target,this.mix=0,this.fading=!1)),this.shown<0){this.off(),this.state.U=c;return}let u=this.hull,d=u.bowX,f=.5-d/this.boat.spec.L,p=r(t.e+t.fe*d,t.n+t.fn*d),m=t.u-((p.ue??0)+o[0])*t.fe-((p.un??0)+o[1])*t.fn,h=(t.z??0)+this.boat._0xd486b6+d*Math.sin(t.pitch??0)+this.boat.keelRel(f),g=p.h-h,_=a.slots[this.shown],v=_.U||c,y=dd(Math.max(m,0),g,v,u.bowDraft);this.bow+=(Math.min(3,y)-this.bow)*Math.min(1,e/fd.bowTau);let b=this.fading?a.slots[this.target]:_,x=this.fading?this.mix:0,S=this.on?Le.smoothstep(c,fd.uMin,fd.uMin+.4)*a.scale:0;{let e=this._row(22);s[e]=this.shown,s[e+1]=(1-x)*S,s[e+2]=this.fading?this.target:0,s[e+3]=this.fading?x*S:0}let C=(_.gain*(1-x)+b.gain*x)*this.bow;{let e=this._row(23);s[e]=u.xStem,s[e+1]=C,s[e+2]=1/rd.coarse.fadeM,s[e+3]=21}this.drawn=S>0,Object.assign(this.state,{U:c,Uq:v,bow:this.bow,gain:C,Urel:m,D:g})}},Sd={desktop:{materials:`physical`,paddle:`high`,racerPaddle:`medium`},tablet:{materials:`physical`,paddle:`high`,racerPaddle:`medium`,quality:`Standard`,lite:!1,maxPx:45e5,fieldMs:3},phone:{materials:`standard`,paddle:`medium`,racerPaddle:`low`,quality:`Draft`,lite:!0,antialias:!1,maxPx:12e5,query:{wavesolve:`0`,skydisp:`512`,volsize:`256`},field:2,planBudget:2,fieldMs:1.5,landStep:2,sprayAmt:.6,shoreCullM:4e3}},Cd=`surfski.device`;function wd(e,t=globalThis){let n=t.navigator??{},r=t.screen??{},i=e?.get?.(`mobile`)??(()=>{try{return t.localStorage?.getItem(`surfski.device`)}catch{return null}})();if(i&&i!==`auto`){let e=i===`0`?`desktop`:i;if(Sd[e])return{tier:e,why:`chosen: ${i}`}}let a=n.userAgent??``,o=(n.maxTouchPoints??0)>0,s=e=>{try{return!!t.matchMedia?.(e).matches}catch{return!1}},c=Math.min(r.width??9999,r.height??9999);return/iPhone|iPod/.test(a)?{tier:`phone`,why:`iPhone`}:/Android/.test(a)&&/Mobile/.test(a)?{tier:`phone`,why:`Android phone`}:/iPad/.test(a)||/Macintosh/.test(a)&&o?{tier:`tablet`,why:`iPad`}:/Android/.test(a)?{tier:`tablet`,why:`Android tablet`}:o&&s(`(pointer: coarse)`)&&!s(`(pointer: fine)`)?c<=500?{tier:`phone`,why:`touch, ${c} px`}:{tier:`tablet`,why:`touch, ${c} px`}:{tier:`desktop`,why:`desktop`}}var Td=[[0,[.12,.28,.95]],[.5,[.1,.78,.92]],[1,[.2,.85,.3]],[1.35,[1,.85,.1]],[1.7,[1,.2,.12]]];function Ed(e,t){let n=Math.max(0,e/t),r=Td;if(n<=r[0][0])return r[0][1];for(let e=1;e<r.length;e++)if(n<=r[e][0]){let t=(n-r[e-1][0])/(r[e][0]-r[e-1][0]);return r[e-1][1].map((n,i)=>n+(r[e][1][i]-n)*t)}return r[r.length-1][1]}var Dd=.75,Od=1.8,kd=3.5,Ad=1.5,jd=.12,Md=8,Nd=.04,Pd=110,Fd={route:.62,wave:.8},Id={route:0,wave:.15},Ld=[.04,.3,.38],Rd=.8;function zd(e,t=Ad){let n=[];if(e.length<2)return n;let r=0;n.push({...e[0]});for(let i=1;i<e.length;i++){let a=e[i-1],o=e[i],s=Math.hypot(o.e-a.e,o.n-a.n);if(s<1e-6)continue;let c=t-r;for(;c<=s;){let e=c/s;n.push({e:a.e+(o.e-a.e)*e,n:a.n+(o.n-a.n)*e,W:a.W+(o.W-a.W)*e,a:a.a+(o.a-a.a)*e}),c+=t}r=s-(c-t)}let i=e[e.length-1];return Math.hypot(i.e-n[n.length-1].e,i.n-n[n.length-1].n)>.3&&n.push({...i}),n}function Bd(e,t){let n=e=>e.W<=.55*t,r=e=>e.W>=.95*t,i=()=>{for(let t=e.length-1;t>0;t--)if(e[t].a>=.9)return t;return Math.max(1,e.length-1)};if(e.length<2)return{head:0,from:-1};let a=0;if(n(e[0]))for(;a<e.length&&n(e[a]);)a++;else for(;a<e.length&&!n(e[a]);)a++;let o=a>=e.length?i():a,s=-1;for(let t=o+1;t<e.length;t++)if(r(e[t])){s=t;break}return{head:o,from:s}}function Vd(e,t,n=2,r=8){let i=e.map((t,n)=>(e[Math.max(0,n-1)]+t+e[Math.min(e.length-1,n+1)])/3);for(let e=Math.max(1,n);e<i.length-1;e++){if(!(i[e]<=i[e-1]&&i[e]<i[e+1]))continue;let n=i[e],a=e;for(let t=e+1;t<=Math.min(i.length-1,e+r);t++)i[t]>n&&(n=i[t],a=t);if(n-i[e]>=t){let t=a;for(;t>e&&i[t-1]<=i[t];)t--;return t}}return-1}var Hd=class{constructor(e){this.geo=new be;let t=1464;this.pos=new Float32Array(t*3),this.col=new Float32Array(t*4),this.geo.setAttribute(`position`,new qe(this.pos,3).setUsage(N)),this.geo.setAttribute(`color`,new qe(this.col,4).setUsage(N)),this.geo.setIndex(new qe(new Uint16Array(t*6),1).setUsage(N)),this.mat=new rt({vertexColors:!0,transparent:!0,depthWrite:!1,side:2,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,fog:!1}),this.mask=null,this.mat.onBeforeCompile=e=>{e.uniforms.uPull={value:new U(Md,Nd)},this.mask&&Object.assign(e.uniforms,this.mask),e.vertexShader=`uniform vec2 uPull;
varying vec3 vGW;
`+e.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
{ vGW = (modelMatrix * vec4(transformed, 1.0)).xyz; float d = length(mvPosition.xyz), pull = min(uPull.y * max(d - uPull.x, 0.0), 0.5 * d); mvPosition.xyz *= (d - pull) / max(d, 1e-3); gl_Position = projectionMatrix * mvPosition; }`),this.mask&&(e.fragmentShader=tr+`varying vec3 vGW;
`+e.fragmentShader.replace(`void main() {`,`void main() {
if (inHull(vGW, `+jd.toFixed(3)+`)) discard;                  // never drawn inside a boat (it lies on the water)`))},this.mesh=new he(this.geo,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=5,this.mesh.visible=!1,e.add(this.mesh)}hide(){this.mesh.visible=!1}setMask(e){this.mask=Object.fromEntries(or.map(t=>[t,e[t]])),this.mat.customProgramCacheKey=()=>`guide-mask`,this.mat.needsUpdate=!0}useStencil(t){Object.assign(this.mat,{depthTest:!1,stencilWrite:!0,stencilRef:t,stencilFunc:514,stencilFail:e,stencilZFail:e,stencilZPass:ce}),this.mask=null,this.mat.needsUpdate=!0}ribbons(e,t,n,r,{rgb:i=[1,.86,.22],width:a=.3,alpha:o=.4,maxM:s=400}={}){let c=this.pos,l=this.col,u=this.geo.index.array,d=this.pos.length/3,f=a/2,p=0,m=0;for(let a of e){let e=a.b.e-a.a.e,h=a.b.n-a.a.n,g=Math.hypot(e,h);if(g<1)continue;let _=e/g,v=h/g,y=v,b=-_,x=o*(a.next?1:.5),S=p;for(let e=0;e<=g+1e-6;e+=Math.min(3,Math.max(g-e,.001))){let o=a.a.e+_*e,u=a.a.n+v*e;if(Math.hypot(o-r.e,u-r.n)>s||p+4>d){if(p>S)break;continue}let m=(t.mapHeight?t.mapHeight(o,u,n):t.sample(o,u,n,{}).h)+jd,h=Math.min(1,e/6,(g-e)/6+.25);for(let[e,t]of[[-1,0],[-.8,x*h],[Rd,x*h],[1,0]])c[p*3]=o+y*f*e,c[p*3+1]=m,c[p*3+2]=-(u+b*f*e),l[p*4]=i[0],l[p*4+1]=i[1],l[p*4+2]=i[2],l[p*4+3]=t,p++;if(e>=g)break}for(let e=S;e+7<p;e+=4)for(let t=0;t<3;t++){let n=e+t;u[m++]=n,u[m++]=n+1,u[m++]=n+4,u[m++]=n+1,u[m++]=n+5,u[m++]=n+4}}m?(this.geo.setDrawRange(0,m),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.index.needsUpdate=!0,this.mesh.visible=!0):this.mesh.visible=!1}update(e,t,n,r,i=`route`,a={}){let o=zd(e);if(o.length<2){this.mesh.visible=!1;return}let s=Math.min(o.length,Pd),c=this.pos,l=this.col,u=this.geo.index.array,d={},f=0,p=0,m=Id[i]??0,h=(Fd[i]??Fd.route)*(a.weight??1),g=(e,r,i,a,o,s)=>{let u=[o[0]*(1-m)+Ld[0]*m,o[1]*(1-m)+Ld[1]*m,o[2]*(1-m)+Ld[2]*m],p=[[-1,0],[-.8,s],[Rd,s],[1,0]],h=p.map(([t])=>[e.e+r*a*t,e.n+i*a*t]),g=0;for(let[e,r]of h)g+=t.sample(e,r,n,d).h/4;let _=jd;for(let e=0;e<4;e++)c[f*3]=h[e][0],c[f*3+1]=g+_,c[f*3+2]=-h[e][1],l[f*4]=u[0],l[f*4+1]=u[1],l[f*4+2]=u[2],l[f*4+3]=p[e][1],f++},_=(e,t,n,i,a=!1,s=o,c=1)=>{let l=f,d=(t-e)*Ad,m=Math.max(0,d-kd);for(let o=e;o<=t;o++){let l=s[o],u=s[Math.min(o+1,s.length-1)],f=s[Math.max(o-1,0)],p=u.e-f.e,_=u.n-f.n,v=Math.hypot(p,_)||1;p/=v,_/=v;let y=(o-e)*Ad,b=Ed(l.W,r),x=h*l.a*i*(a?Math.min(1,(o-e)/3):1),S=Dd/2*c;n&&y>m&&(S=o===t?.02:Od/2*(1-(y-m)/(d-m+1e-6))+.02),g(l,_,-p,S,b,x),n&&y>m&&o>e&&Math.abs(y-m)<Ad&&g(l,_,-p,Od/2,b,x)}for(let e=l;e+7<f;e+=4)for(let t=0;t<3;t++){let n=e+t;u[p++]=n,u[p++]=n+1,u[p++]=n+4,u[p++]=n+1,u[p++]=n+5,u[p++]=n+4}};if(i===`wave`){let e=Bd(o.slice(0,s),r);if(a.rise>0&&o[0].W<=.55*r){let r=Vd(o.slice(0,s).map(e=>t.sample(e.e,e.n,n,d).h),a.rise);r>0&&r<e.head&&(e.head=r),r>0&&e.from>=0&&e.from<=e.head&&(e.from=-1)}let i=Math.min(s-1,Math.max(1,e.head));_(0,i,!0,1),e.from>i&&e.from<s-1&&_(e.from,s-1,!1,.5,!0)}else _(0,s-1,!0,1);if(a.alts?.length)for(let e of a.alts.slice(0,2)){let t=zd(e.pts).slice(0,Pd),n=Math.min(1,Math.max(0,e.weight??.5));t.length>=3&&f+t.length*4+8<this.pos.length/3&&_(0,t.length-1,!1,.3+.25*n,!0,t,.3+.7*n)}this.geo.setDrawRange(0,p),this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,this.geo.index.needsUpdate=!0,this.mesh.visible=!0}};function Ud(e,t,n){return e<=.55*t?n?`surf`:`relax`:e<.95*t?`keep`:e<1.25*t?`steady`:e<1.6*t?`power`:`sprint`}var Wd=[0,.25,.5,.75,1,1.35,1.7,2.05],Gd=(e,t)=>Wd.reduce((n,r,i)=>Math.abs(r*t-e)<Math.abs(Wd[n]*t-e)?i:n,0),Kd={surf:`glide`,relax:`glide`,keep:`keep paddling`,steady:`tempo`,power:`power on`,sprint:`sprint`},qd=e=>e===`surf`||e===`relax`,Jd={little:10,full:25},Yd={little:6,full:15},Xd={seen:.08,hop:.2,big:.3048},Zd=[.62,.75,.85];function Qd(e){let t=Math.abs(e);return t<Yd.little?null:{side:e>0?`right`:`left`,little:t<Yd.full}}var $d=e=>e.little?`a little ${e.side}`:e.side;function ef(e,t,n=!1){return t?e===`surf`?n?`glide ${$d(t)}`:`${$d(t)}, keep gliding`:e===`sprint`?`sprint ${$d(t)}`:e===`power`?`power ${$d(t)}`:$d(t):Kd[e]}function tf(e,t){return e>=Xd.big?t?`glide over`:`power up and over`:e>=Xd.hop?`up and over`:t?`glide through`:`power through`}function nf(e){let{W:t,W2:n,B:r,headingErr:i=0,run:a=!1,_0x973751:o=0,u:s=0}=e,c=Ud(t,r,a);if(e.trafficRisk){let e=Qd(i);return{text:e?`give some space, ${e.side}`:`give some space`,key:`space`,color:Zd,next:null}}if(e.pearlRisk&&(c===`surf`||c===`relax`)&&(e.W0??0)>.6*r)return{text:`steady...`,key:`ease`,color:Zd,next:null};if(e.rapid){let n=Ud(e.W0??t,r,a),i=e.slow?Ud(e.slow.W,r,a):n;return(e.catchS??1/0)<=3?{text:`steady..`,key:`hold`,color:Ed(e.W0??r,r),next:`then glide`}:i===n?{text:`wait for next`,key:`wait`,color:Zd,next:null}:e.canSurf&&e.slow?nf({...e,W:e.slow.W,W2:e.slow.W2,headingErr:e.slow.headingErr,rapid:!1,pearlRisk:!1}):{text:`let this one go`,key:`skip`,color:Zd,next:sf(e.slow,r,a)}}let l=Qd(i),u=n==null?c:Ud(n,r,a),d=Kd[u]===Kd[c]?null:`then ${Kd[u]}`,f=Ed(t,r);if(!l&&e.W0!=null){let n=qd(c),i=Gd(e.W0,r),a=Gd(t,r)-i;if(n)return e.W0>.55*r?{text:`glide`,key:`relax`,color:f,next:d}:{text:`keep gliding`,key:c,color:f,next:d,quiet:!0};if(a===0&&i>=1)return{text:Kd[c],key:c,color:f,next:d,quiet:!0};if(i>=1&&Math.abs(a)<=2)return{text:a>0?`a little more`:`a little less`,key:a>0?`more`:`less`,color:f,next:d}}return{text:ef(qd(c)?`surf`:c,l,(e.W0??0)>.55*r),key:c,color:f,next:d}}function rf(e){let{B:t,W0:n=e.W}=e,r=e.run,i=Ud(n,t,r),a=e.slow,o=a?Ud(a.W,t,r):i;return(e.catchS??1/0)<=3?{W:n,W2:0,headingErr:0}:o===i?{W:n,W2:n,headingErr:0}:e.canSurf&&a?{W:a.W,W2:a.W2,headingErr:a.headingErr}:{W:.5*t,W2:a?a.W2:n,headingErr:0}}function af(e){let t=e.crest;if(!t||!e.headSea||e.run||!(t.rise>=Xd.seen))return null;let n=e.W<=.55*e.B,r=t.rise>=Xd.big?`big`:t.rise>=Xd.hop?`hop`:`small`;return{text:tf(t.rise,n),key:`crest`,size:r,id:(e.at??0)+t.inS,color:Ed(e.W,e.B)}}function of(e){let t=e.lookDir;return!t||Math.abs(e.headingErr??0)>=Yd.little?null:{text:`look ${t}`,key:`look`,dir:t,color:Zd}}function sf(e,t,n){let r=e?Ud(e.W2??e.W,t,n):`steady`;return r===`power`||r===`sprint`?`then accelerate on the next wave`:`then ${Kd[r]}`}var cf={tempo:[`settle in`,`smooth power`],"power on":[`push`,`dig in`],sprint:[`go hard`,`big push`],"keep paddling":[`keep it going`,`keep stroking`],"keep gliding":[`let it run`,`ride it`],"a little more":[`a bit more`,`lift it`],"a little less":[`a bit less`,`ease a little`],glide:[`stop paddling`,`rest`],good:[`nice`,`yes`,`that's it`],excellent:[`perfect`,`beautiful`]},lf={surf:0,relax:0,skip:0,less:1.5,wait:1,keep:1,steady:2,hold:2,more:2.5,power:3,accel:3,sprint:4},uf={scarcityX:0,gainTauS:1.5,noTurn:!1,minLevel:0,tolScale:1,repeatS:5,rate:.07,burst:3,persistS:.5,reversalS:2,holdBaseS:1.5,holdPerStepS:1.5,stageAtS:3,stepGapS:1.2,windowS:20,smallCrestTokens:2.5,tolMph:{cruise:1,sporty:.5,race:.2},majorGainX:2,gainFastX:3,ttl:{review:3,default:3.5,brace:2.5,ease:2,crest:1.8,look:6,praise:2.5,wait:4},praiseWindowS:8,praiseMinS:5,praiseGapS:20,praiseAfterCallS:6,praiseExcellentX:1/3,reviewGapS:30,reviewQuietS:6};function df(e,t=nf(e)){let{B:n,W:r,headingErr:i=0,run:a=!1,runEnd:o=!1}=e,s=e.W2??r,c=[{text:t.text,at:0,color:t.color,key:t.key}];if(t.key===`brace`||t.key===`wait`||t.key===`ease`||t.key===`space`)return c;if(t.key===`hold`)return[c[0],{text:`and glide`,at:uf.stageAtS-.2,color:Ed(0,n),key:`surf`}];if(t.key===`skip`)return t.next?[c[0],{text:t.next.replace(/^then /,`and `),at:uf.stageAtS+.2,color:t.color,key:`accel`}]:c;let l=Ud(r,n,a),u=Ud(s,n,o),d=Qd(i);if(l===u||lf[l]===lf[u]||!qd(l)&&!qd(u)&&Math.abs(Gd(r,n)-Gd(s,n))<=2)return c;let f=lf[u]>lf[l],p=Ed(r,n),m=Ed(s,n),h=[],g={...c[0]};if(f){let r=lf[l]<=1&&t.key!==`more`&&(e.W0==null||e.W0<=.55*n);h.push(r?{text:`wait`,at:0,color:p,key:`wait`}:g);let i=u===`sprint`?`sprint`:u===`power`?`power on`:null;i?(h.push({text:`${i}${d?` ${$d(d)}`:``}${o?` to catch`:` now`}`,at:uf.stageAtS,color:m,key:u}),o&&h.push({text:`and glide`,at:uf.stageAtS+uf.stepGapS,color:Ed(0,n),key:`surf`})):h.push({text:`and ${ef(u,d,!0)}`,at:uf.stageAtS,color:m,key:u})}else h.push(g),h.push({text:`and ${Kd[u]}`,at:uf.stageAtS,color:m,key:u});return h}var ff={surf:[0,2],relax:[0,2],keep:[2,3],steady:[3,4],power:[5,5],sprint:[6,7],accel:[5,7]};function pf(e,t){let n=ff[e.key];if(!n||!t)return!0;let r=t.rapid&&t.slow?t.slow:t,i=t.B;return[Gd(r.W,i),Gd(r.W2??r.W,i)].some(e=>e>=n[0]-1&&e<=n[1]+1)}var mf=2.23694,hf=new Set([`more`,`less`,`steady`,`keep`,`power`,`sprint`,`relax`,`surf`]),gf=e=>e.gain!=null&&e._0xe11729?e.gain/e._0xe11729*mf:null,_f=class{constructor(e={}){this.p={...uf,...e},this.hardReset()}hardReset(){this.tokens=this.p.burst,this.tLast=null,this.queue=[],this.current=null,this.standingSig=null,this.standingOrder=2,this.lastCallAt=-1e9,this.lastDir=0,this.pending=null,this.holdUntil=0,this.history=[],this.lookSig=null,this.lookPending=null,this.lastCrestId=-1e9,this.lastEaseAt=-1e9,this.losses=[],this.lastPraiseAt=-1e9,this.lastLossAt=-1,this.lastReviewId=-1,this.lastReviewAt=-1e9,this.varyN={},this.gainEma=null,this.gainAt=null}reset(){this.queue=[],this.current=null,this.pending=null,this.standingSig=null,this.standingOrder=2,this.lastCallAt=-1e9,this.lookSig=null,this.lookPending=null}ips(e){let t=this.history.filter(t=>t>e-this.p.windowS),n=Math.max(3,Math.min(this.p.windowS,e-(this.history[0]??e))),r=0;for(let e of t)r=Math.max(r,t.filter(t=>t>=e&&t<e+3).length/3);return{avg:t.length/n,peak:r,count:t.length}}emit(e,t){if(this.p.variety&&cf[e.text]){let t=[e.text,...cf[e.text]],n=(this.varyN[e.text]=(this.varyN[e.text]??0)+1)-1;e={...e,text:t[n%t.length]}}this.current={...e,since:t},this.history.push(t),this.history.length>300&&this.history.shift()}step(e,t){if(this.tLast!=null&&t<this.tLast-1e-6&&this.hardReset(),this.tLast!=null&&(this.tokens=Math.min(this.p.burst,this.tokens+this.p.rate*Math.max(0,t-this.tLast))),this.tLast=t,!e)return this.reset(),null;let n=nf(e),r=(this.p.tolMph[e.mode]??this.p.tolMph.sporty)*(this.p.tolScale??1)/mf*(e._0xe11729??6);for(e.gain!=null&&e.at!==this.lastLossAt&&(this.lastLossAt=e.at,this.losses.push({t,v:e.gain}));this.losses.length&&this.losses[0].t<t-this.p.praiseWindowS;)this.losses.shift();if(n.key===`brace`)return this.current?.text!==n.text&&(this.queue=[],this.emit({text:n.text,color:n.color,key:`brace`},t),this.holdUntil=t+1,this.standingSig=null),this.view(t);if(n.key===`ease`||n.key===`space`)return t-this.lastEaseAt>3&&(this.queue=[],this.emit({text:n.text,color:n.color,key:n.key},t),this.lastEaseAt=t,this.tokens=Math.max(0,this.tokens-1),this.holdUntil=t+1.2,this.standingSig=null),this.view(t);if(this.current?.key===`brace`&&!this.queue.length&&(this.current={...this.current,key:`brace-done`}),this.queue.length){if(t>=this.queue[0].due){let n=this.queue.shift();if(pf(n,e))this.emit(n,t);else return this.queue=[],this.standingSig=null,this.pending=null,this.holdUntil=t,this.current&&!this.current.key.startsWith(`brace`)&&(this.current=null),this.view(t)}return this.view(t)}if(t<this.holdUntil)return this.view(t);let i=af(e);if(i&&i.id>this.lastCrestId+1&&this.tokens>=(i.size===`small`?this.p.smallCrestTokens:1))return--this.tokens,this.lastCrestId=i.id,this.emit(i,t),this.holdUntil=t+1.2,this.view(t);let a=e.review;if(a&&a.id!==this.lastReviewId&&t-this.lastReviewAt>=this.p.reviewGapS&&t-this.lastCallAt>=this.p.reviewQuietS&&!this.queue.length&&this.tokens>=2)return--this.tokens,this.lastReviewId=a.id,this.lastReviewAt=t,this.emit({text:a.text,color:Zd,key:`review`},t),this.holdUntil=t+1.5,this.view(t);let o=of(e),s=e.gain!=null&&e.gain>=r;if(!o)this.lookSig=null,this.lookPending=null;else if(!(s||this.tokens<2)&&this.lookSig!==o.dir&&((!this.lookPending||this.lookPending.dir!==o.dir)&&(this.lookPending={dir:o.dir,since:t}),t-this.lookPending.since>=this.p.persistS&&this.tokens>=1))return--this.tokens,this.emit(o,t),this.lookSig=o.dir,this.lookPending=null,this.holdUntil=t+this.p.holdBaseS,this.view(t);let c=df(e,n);if(n.quiet&&c.length===1)return this.pending=null,this.standingSig=null,this.current&&hf.has(this.current.key)&&!this.queue.length&&t-this.current.since>1.2&&(this.current=null),this.praise(t,r),this.view(t);let l=c.map(e=>e.text).join(` | `);if(e.gain!=null&&this.p.gainTauS>0){let n=this.gainAt==null?0:Math.max(0,t-this.gainAt);this.gainEma=this.gainEma==null?e.gain:this.gainEma+(e.gain-this.gainEma)*(1-Math.exp(-n/this.p.gainTauS)),this.gainAt=t}let u=e.gain!=null,d=e.gain==null?1/0:this.p.gainTauS>0?Math.min(e.gain,this.gainEma):e.gain,f=r*(c[0].key===`skip`?this.p.majorGainX:1)*(1+(this.p.scarcityX??0)*(1-Math.min(1,this.tokens/this.p.burst)));if(l===this.standingSig&&t-this.lastCallAt>=this.p.repeatS&&u&&d>=f&&!c.some(e=>e.key===`skip`||e.key===`hold`)&&(this.standingSig=null),l===this.standingSig)return this.pending=null,this.view(t);if(u&&d<f)return this.pending=null,this.praise(t,r),this.view(t);let p=lf[c[0].key]??2,m=t-this.lastCallAt<10&&Math.sign(p-this.standingOrder)!==0&&this.reversalOf(p);(!this.pending||this.pending.sig!==l)&&(this.pending={sig:l,since:t});let h=(m?this.p.reversalS:this.p.persistS)*(u&&d>=this.p.gainFastX*r?.5:1);if(t-this.pending.since>=h&&(this.tokens>=c.length||!this.history.length&&this.tokens>=1)){this.tokens-=Math.min(this.tokens,c.length),this.pending=null,this.standingSig=l;let e=c[c.length-1];this.lastDir=Math.sign((lf[e.key]??p)-this.standingOrder),this.standingOrder=lf[e.key]??p,this.lastCallAt=t,this.emit(c[0],t);for(let e of c.slice(1))this.queue.push({...e,due:t+e.at});this.holdUntil=t+(c.length>1?c[c.length-1].at:0)+this.p.holdBaseS+this.p.holdPerStepS*(c.length-1)}return this.view(t)}praise(e,t){let n=this.losses;if(n.length<6||e-n[0].t<this.p.praiseMinS||e-this.lastPraiseAt<this.p.praiseGapS||e-this.lastCallAt<this.p.praiseAfterCallS||this.tokens<1.5||this.queue.length||e<this.holdUntil)return!1;let r=n.reduce((e,t)=>e+t.v,0)/n.length,i=r<=t*this.p.praiseExcellentX?`excellent`:r<=t?`good`:null;return i?(--this.tokens,this.lastPraiseAt=e,this.emit({text:i,color:[.35,.9,.5],key:`praise`},e),this.holdUntil=e+1.5,!0):!1}reversalOf(e){return this.lastDir!=null&&this.lastDir!==0&&Math.sign(e-this.standingOrder)===-this.lastDir}view(e){let t=this.current;if(!t)return null;let n=e-t.since,r=this.p.ttl[t.key]??this.p.ttl.default;return!this.queue.length&&n>r?null:{text:t.text,color:t.color,key:t.key,ageS:n,standing:n>1.6&&!this.queue.length,next:this.queue.length?this.queue[0].text:null}}},vf=e=>e===`left`?-1:1,yf=Jd.full,bf=Jd.little,xf=[[/^tempo$/,()=>({level:4})],[/^power on$/,()=>({level:5})],[/^sprint( now)?$/,()=>({level:6})],[/^keep paddling$/,()=>({level:3})],[/^(glide|keep gliding)$/,()=>({level:0})],[/^a little more$/,()=>({dLevel:1})],[/^a little less$/,()=>({dLevel:-1})],[/^back off$/,()=>({level:0,brake:!0})],[/^give some space(, (left|right))?$/,e=>e[2]?{turn:vf(e[2])*bf,turnS:3}:{noop:!0}],[/^(left|right)$/,e=>({turn:vf(e[1])*yf,turnS:4})],[/^a little (left|right)$/,e=>({turn:vf(e[1])*bf,turnS:4})],[/^(a little )?(left|right), keep gliding$/,e=>({level:0,turn:vf(e[2])*(e[1]?bf:yf),turnS:4})],[/^glide (a little )?(left|right)$/,e=>({level:0,turn:vf(e[2])*(e[1]?bf:yf),turnS:4})],[/^(sprint|power on|power)( a little)? (left|right)( now| to catch)?$/,e=>({level:e[1]===`sprint`?6:5,turn:vf(e[3])*(e[2]?bf:yf),turnS:4})],[/^and (a little )?(left|right)$/,e=>({turn:vf(e[2])*(e[1]?bf:yf),turnS:4})],[/^(power on|sprint)( now| to catch)$/,e=>({level:e[1]===`sprint`?6:5})],[/^and (tempo|power on|sprint( now)?|keep paddling|glide)$/,e=>({level:{tempo:4,"power on":5,keep:3,glide:0}[e[1].replace(/ now$/,``).replace(/^keep paddling$/,`keep`)]??(e[1].startsWith(`sprint`)?6:4)})],[/^and (a little )?(left|right), keep gliding$/,e=>({level:0,turn:vf(e[2])*(e[1]?bf:yf),turnS:4})],[/^and accelerate on the next wave$/,()=>({level:5})],[/^let this one go$/,()=>({level:2,holdS:3})],[/^wait$/,()=>({level:0,holdS:2})],[/^wait for next$/,()=>({holdS:2})],[/^steady\.\.$/,()=>({level:4})],[/^steady\.\.\.$/,()=>({level:0})],[/^(glide through|glide over)$/,()=>({level:0,holdS:2})],[/^(power through|power up and over|up and over)$/,()=>({noop:!0})],[/^look (left|right)$/,()=>({noop:!0})],[/^(could have caught that|more power there|wasted power|(left|right) was better)$/,()=>({noop:!0})],[/^brace( hard and (left|right)| and a little (left|right))$/,()=>({noop:!0})],[/^(good|excellent)$/,()=>({noop:!0})]];for(let[e,t]of Object.entries(cf))for(let n of t)xf.push([RegExp(`^${n}$`),()=>Sf(e)]);function Sf(e){for(let[t,n]of xf){let r=t.exec(e);if(r)return n(r)}return null}var Cf=e=>(e%360+360)%360;function wf(e,t,n,r){let i=e.fft??e.base?.fft;if(!i)return 1;let a=i.keys.filter(e=>e.band!==xt.TAIL),o=e.damp(t,n),s=0,c=0;for(let i of a){let a=e.bandGain(i.band,t,n,o)*e.chGain(i.ch,t,n,r);ht(i.band)||(s+=i.var),c+=i.var*a*a}return s>0?Math.sqrt(c/s):1}function Tf(e){let t=e.dominant;return Cf(Math.atan2(t.dx,t.dy)*180/Math.PI)}var Ef=[0,.4,.7,1,1.4,2],Df=[0,20,40,70,110,180],Of=class{constructor(e){this.v=Array.isArray(e)?e:Ef.map(t=>Df.map(n=>e(t,n)))}at(e,t){let n=Math.min(180,Math.abs(t)),r=Math.min(Ef[Ef.length-1],Math.max(0,e)),i=(e,t)=>{let n=0;for(;n<e.length-2&&t>e[n+1];)n++;return[n,Math.min(1,Math.max(0,(t-e[n])/(e[n+1]-e[n])))]},[a,o]=i(Ef,r),[s,c]=i(Df,n),l=this.v;return(l[a][s]*(1-o)+l[a+1][s]*o)*(1-c)+(l[a][s+1]*(1-o)+l[a+1][s+1]*o)*c}};function kf({from:e,goal:t,_0xe111e0:n,offsets:r,speedAt:i,ok:a,scaleAt:o,maxStepOff:s=90,banned:c=null,maxSlope:l=null}){let u=Math.hypot(t.e-e.e,t.n-e.n),d=(t.e-e.e)/u,f=(t.n-e.n)/u,p=f,m=-d,h=n.filter(e=>e<u-20).concat([u]),g=(n,i)=>n<0?{e:e.e,n:e.n}:n===h.length-1?{e:t.e,n:t.n}:{e:e.e+d*h[n]+p*r[i],n:e.n+f*h[n]+m*r[i]},_=r.length,v=h.length,y=1e9,b=Array.from({length:v},()=>Array(_).fill(y)),x=Array.from({length:v},()=>Array(_).fill(-1)),S=r.indexOf(0),C=Array.from({length:v},(e,t)=>r.map((e,n)=>g(t,n))),w=C.map((e,t)=>e.map((e,n)=>a(e.e,e.n)&&!(c&&t<v-1&&c(t,n)))),T=(e,t)=>{let n=Math.hypot(t.e-e.e,t.n-e.n),r=Cf(Math.atan2(t.e-e.e,t.n-e.n)*180/Math.PI),a={e:(e.e+t.e)/2,n:(e.n+t.n)/2};return n/Math.max(.8,i(a.e,a.n,r))};for(let e=0;e<_;e++)(w[0][e]&&!(l&&v>1&&Math.abs(r[e])>l*h[0]+1e-6)||v===1)&&(b[0][e]=T(g(-1,0),C[0][e]),x[0][e]=-2);for(let e=1;e<v;e++)for(let t=0;t<_;t++)if(!(!w[e][t]&&e<v-1)&&(e!==v-1||t===S))for(let n=0;n<_;n++){if(b[e-1][n]>=y||e<v-1&&Math.abs(r[n]-r[t])>(l?Math.min(s,l*(h[e]-h[e-1]))+1e-6:s))continue;let i=b[e-1][n]+T(C[e-1][n],C[e][t]);i<b[e][t]&&(b[e][t]=i,x[e][t]=n)}if(b[v-1][S]>=y)return null;let E=[],D=S;for(let e=v-1;e>=0;e--){let t=C[e][D];E.unshift({e:t.e,n:t.n,off:r[D],s:o?o(t.e,t.n):null}),D=x[e][D]}let O=0;{let n={e:e.e,n:e.n};for(let r=0;r<v;r++){let i=r===v-1?{e:t.e,n:t.n}:{e:e.e+d*h[r],n:e.n+f*h[r]};O+=T(n,i),n=i}}return{path:E,time:b[v-1][S],straightTime:O}}function Af(e,t,n,r){let i=[];for(let n of e)n.pose&&i.push({b:n,a:n.pose.e*t[0]+n.pose.n*t[1]});i.sort((e,t)=>e.a-t.a);for(let e=0;e<i.length;e++)for(let t=e+1;t<i.length&&i[t].a-i[e].a<=n;t++){let a=i[e].b,o=i[t].b;Math.hypot(a.pose.e-o.pose.e,a.pose.n-o.pose.n)<=n&&(String(a.id)<String(o.id)?r(a,o):r(o,a))}}var jf={L:6.1,halfBeam:.23,seatX:-.5,bladeAft:.4,bladeAhead:1},Mf={hs:.3,ahead:1,side:1,clear:.1},Nf={prefer:2,tolerable:1,wash:.3048},Pf={contact:200,close:40,tight:4,portBias:3},Ff=e=>e*180/Math.PI,If=(e,t)=>{let n=(e-t)%(2*Math.PI);return n>Math.PI&&(n-=2*Math.PI),n<-Math.PI&&(n+=2*Math.PI),n},Lf=e=>[Math.sin(e.psi),Math.cos(e.psi)],Rf=e=>(e.L??jf.L)/2;function zf(e){let[t,n]=Lf(e),r=Rf(e),i=e.seatX??jf.seatX;return{bow:[e.e+t*r,e.n+n*r],stern:[e.e-t*r,e.n-n*r],hips:[e.e+t*i,e.n+n*i]}}function Bf(e,t,n,r=!1){if(Math.abs(Ff(If(e.psi,t.psi)))>45)return`mutual`;if(r)return Vf(e,t,n)>Mf.ahead?null:`give`;let i=e=>e[0]*n[0]+e[1]*n[1];return i(zf(t).bow)>i(zf(e).hips)?`give`:null}var Vf=(e,t,n)=>(e.e-t.e)*n[0]+(e.n-t.n)*n[1],Hf=e=>jf.halfBeam*4*e*(1-e),Uf=[0,.1,.25,.5,.75,.9,1],Wf={gap:0,xe:0,xn:0,ce:0,cn:0};function Gf(e,t,n,r,i,a,o,s,c){let l=e+(n-e)*i,u=t+(r-t)*i,d=s-a,f=c-o,p=d*d+f*f,m=Math.min(1,Math.max(0,((l-a)*d+(u-o)*f)/p)),h=a+d*m,g=o+f*m;return Wf.gap=Math.sqrt((h-l)*(h-l)+(g-u)*(g-u))-Hf(i)-Hf(m),Wf.xe=l,Wf.xn=u,Wf.ce=h,Wf.cn=g,Wf.gap}function Kf(e,t,n={}){let r=Math.sin(e.psi),i=Math.cos(e.psi),a=Math.sin(t.psi),o=Math.cos(t.psi),s=Rf(e),c=Rf(t),l=e.seatX??jf.seatX,u=t.seatX??jf.seatX,d=e.e+r*s,f=e.n+i*s,p=e.e-r*s,m=e.n-i*s,h=e.e+r*l,g=e.n+i*l,_=t.e+a*c,v=t.n+o*c,y=t.e-a*c,b=t.n-o*c,x=t.e+a*u,S=t.n+o*u,C=1/0,w=0,T=0,E=0,D=0;for(let e of Uf)Gf(p,m,d,f,e,y,b,_,v)<C&&(C=Wf.gap,w=Wf.xe,T=Wf.xn,E=Wf.ce,D=Wf.cn),Gf(y,b,_,v,e,p,m,d,f)<C&&(C=Wf.gap,w=Wf.ce,T=Wf.cn,E=Wf.xe,D=Wf.xn);let O=(x-h)*r+(S-g)*i<0?(_-h)*r+(v-g)*i<-jf.bladeAft:(d-x)*a+(f-S)*o<-jf.bladeAft,k=(E-w)*i+(D-T)*-r>=0?1:-1,A=Math.abs((x-h)*r+(S-g)*i)<jf.bladeAhead+jf.bladeAft;return n.gap=C,n.wash=O,n.side=k,n.reach=A,n.pa?(n.pa[0]=w,n.pa[1]=T,n.pb[0]=E,n.pb[1]=D):(n.pa=[w,T],n.pb=[E,D]),n}function qf(e,t){let n=Kf(e,t);if(n.gap>=0)return null;let r=n.pb[0]-n.pa[0],i=n.pb[1]-n.pa[1],a=Math.hypot(r,i);if(a<1e-4){let[n,o]=Lf(e),s=(t.e-e.e)*o-(t.n-e.n)*n>=0?1:-1;r=o*s,i=-n*s,a=1}r/=a,i/=a;let o=-n.gap/2+.005,s=[Math.sin(e.psi)*e.u,Math.cos(e.psi)*e.u],c=[Math.sin(t.psi)*t.u,Math.cos(t.psi)*t.u],l=(c[0]-s[0])*r+(c[1]-s[1])*i,u=l<0?-l*.6:0,d=(e,t,n)=>{let[a,s]=Lf(e),c=t*r,l=t*i,d=(n[0]-e.e)*a+(n[1]-e.n)*s,f=c*s-l*a,p=e.L??jf.L;return{de:c*o,dn:l*o,dpsi:12*d*f*o/(p*p),du:(c*a+l*s)*u}};return{a:d(e,-1,n.pa),b:d(t,1,n.pb),gap:n.gap}}var Jf=.9,Yf=e=>(e/(2*Math.PI)%1+1)%1<.5?1:-1;function Xf(e,t){if(!(e.power>5&&t.power>5))return!1;let n=Kf(e,t);return n.wash||!n.reach||n.gap>=.9?!1:Yf(e.phase??0)===n.side&&Yf(t.phase??0)===Kf(t,e).side}function Zf(e,t){return e<=0?`contact`:e<(t?Nf.wash:Nf.tolerable)?`close`:!t&&e<Nf.prefer?`tight`:null}function Qf(e,t){if(e.gap<=0)return`contact`;let n=Math.abs(t)<=Mf.ahead?Mf.side:e.reach?Jf:Mf.clear;return e.gap<n?`close`:null}function $f(e,t){if(t>Mf.ahead)return 0;if(e.gap<=0)return Pf.contact;let n=Math.abs(t)<=Mf.ahead?Mf.side:e.reach?Jf:Mf.clear;return e.gap<n?Pf.close*(1+(n-e.gap)/n):0}function ep(e,t){if(e<=0)return Pf.contact;let n=t?Nf.wash:Nf.tolerable;if(e<n)return Pf.close*(1+(n-e)/n);if(!t&&e<Nf.prefer){let t=(Nf.prefer-e)/(Nf.prefer-Nf.tolerable);return Pf.tight*t*t}return 0}var tp=e=>e<=2?1:Math.max(.4,1-.12*(e-2)),np=(e,t)=>({...e,e:e.e+Math.sin(e.psi)*e.u*t,n:e.n+Math.cos(e.psi)*e.u*t});function rp(e,t,n,{_0xe11729:r=8,reachM:i=12,small:a=!1}={}){let o=[];for(let s of t){if(!s||Math.hypot(s.e-e.e,s.n-e.n)>i+(Math.hypot(Math.sin(s.psi)*s.u-Math.sin(e.psi)*e.u,Math.cos(s.psi)*s.u-Math.cos(e.psi)*e.u)+1)*r)continue;let t=Bf(e,s,n,a);t&&o.push({pose:s,rel:t})}return o.length?Object.assign(o,{small:a,course:n}):null}var ip={},ap={};function op(e,t,n=null){if(!e||!t?.length)return 0;let r=0;for(let{pose:i,rel:a}of e){let o=0,s=1/0,c=0;for(let r of t){let t=np(i,r.tau),a=Math.hypot(t.e-r.e,t.n-r.n);if(a>jf.L+Nf.prefer+.5){a<s&&(s=a);continue}let l=(ip.L=ip.seatX=void 0,Object.assign(ip,n,r)),u=Kf(l,t,ap),d=(e.small?$f(u,Vf(l,t,e.course)):ep(u.gap,u.wash))*tp(r.tau);d>o&&(o=d),u.gap<s&&(s=u.gap,c=u.side)}r+=o+(a===`mutual`&&c>0&&s<6?Pf.portBias:0)}return r}function sp({me:e,others:t,course:n,bearingDeg:r,_0xe11729:i=5,turnRate:a=.3,offsets:o=[0,-6,6,-12,12,-20,20,-30,30],powers:s=[1,.75,1.3],small:c=!1}){let l=rp(e,t,n,{_0xe11729:i,small:c});if(!l)return{dh:0,f:1,pen:0};let u=null;for(let t of o)for(let n of s){let o=(r+t)*Math.PI/180,s=[],c=e.u*Math.cbrt(n),d=.25,f=e.e,p=e.n,m=e.psi,h=e.u;for(let e=d;e<=i+1e-9;e+=d){let t=If(o,m);m+=Math.sign(t)*Math.min(Math.abs(t),a*d),h+=(c-h)*(1-Math.exp(-.25/3)),f+=Math.sin(m)*h*d,p+=Math.cos(m)*h*d,s.push({e:f,n:p,psi:m,u:h,tau:e})}let g=e.u*i*(1-Math.cos(t*Math.PI/180))+.02*Math.abs(t)+4*Math.abs(n-1),_=op(l,s,e)+g;(!u||_<u.cost-1e-9)&&(u={dh:t,f:n,cost:_,pen:_-g})}return u}var cp=class{constructor(){this.events=[],this.state=new Map,this._0x8318f9=[]}check(e,t,n,r=!1){let i=this._seen??=new Set;i.clear(),Af(e,n,9,(e,a)=>{let o=Kf(e.pose,a.pose),s=r?Qf(o,Vf(e.pose,a.pose,n)):Zf(o.gap,o.wash),c=`${e.id}|${a.id}`,l=this.state.get(c)??null,u={contact:2,close:1},d=u[s]??0,f=u[l]??0;if(d>f){let i=Bf(e.pose,a.pose,n,r),c=Bf(a.pose,e.pose,n,r),l=[n[1],-n[0]],u=(e,t)=>(Math.sign((t.e-e.e)*l[0]+(t.n-e.n)*l[1])||1)*(Math.sin(e.psi)*e.u*l[0]+Math.cos(e.psi)*e.u*l[1]),d=i&&!c?e:c&&!i?a:u(e.pose,a.pose)>=u(a.pose,e.pose)?e:a,f={t,kind:s,gap:o.gap,a:e.name,b:a.name,fault:d.name,user:!!(e.user||a.user),userFault:!!d.user};this.events.push(f),this._0x8318f9.push(f)}let p=r?Math.abs(Vf(e.pose,a.pose,n))<=Mf.ahead?Mf.side:o.reach?Jf:Mf.clear:o.wash?Nf.wash:Nf.tolerable;(d>f||d<f&&o.gap>p+.3)&&this.state.set(c,d?s:null),i.add(c)});for(let e of this.state.keys())i.has(e)||this.state.delete(e)}clash(e,t,n){let r={t:n,kind:`clash`,gap:Kf(e.pose,t.pose).gap,a:e.name,b:t.name,fault:null,user:!!(e.user||t.user),userFault:!1};this.events.push(r),this._0x8318f9.push(r)}drain(){let e=this._0x8318f9;return this._0x8318f9=[],e}summary(){let e=(e,t=()=>!0)=>this.events.filter(n=>n.kind===e&&t(n)).length;return{close:e(`close`),contact:e(`contact`),clash:e(`clash`),closeUser:e(`close`,e=>e.user),contactUser:e(`contact`,e=>e.user),clashUser:e(`clash`,e=>e.user),userFault:this.events.filter(e=>e.userFault).length}}},lp={easy:.08,balanced:.015,fast:.004},up={_0x7448de:8,ride:4,_0xee852a:3,progress:.3,lambda:.01,_0xe11729:8,levels:[0,.25,.5,1,1.35,1.7],_0x8c80cd:!0,through:!1},dp={easy:.004,balanced:.002,fast:.001,flow:up.lambda},fp={easy:`cruise`,balanced:`sporty`,fast:`race`,flow:`cruise`},pp={_0xdaa3ee:0,effort:`balanced`,_0xe11729:6,_0x139f52:.6,marks:[],_0xf4d649:1/60,_0xac27eb:.05,_0xe6f203:0,_0x2ddd79:150,arriveM:30,_0x0c3228:3,_0xf3af8b:40,_0x392183:[-40,-20,0,20,40],_0xff103e:[-20,-12,-6,0,6,12,20],_0xa04a46:.6,_0x73ec20:2.5,_0x169d59:25,_0x2a3a43:2,_0xb71ffb:15,_0x8c80cd:!0,sprint:{easy:[0,0],balanced:[.08,10],fast:[.2,25],flow:[.08,10]},_0xa4c396:.04,_0x94f9a2:80,_0x9ae07b:.5,_0x6100e6:.5,_0x371d24:.05,_0x4c9989:.25,_0xa2c72c:.4,_0xda1829:15,_0xf30718:.5,levels:[0,.5,1,1.35,1.7],stick:0,_0x3cd8ba:1,_0x44efb5:8,_0x4730ab:150,_0xca3def:50,_0xa2952c:250,_0x34308f:.03,_0xddad8c:25,_0xae7b01:4},mp=()=>typeof performance<`u`?performance.now():Date.now(),hp=e=>(e%360+360)%360,gp=(e,t)=>(e-t+540)%360-180;function _p(e,t){let n=.2,r=10;for(let i=0;i<40;i++){let i=(n+r)/2;e.eta*t/Math.max(i,1.5)-(e.c2*i*i+e.c4*i**4)*Ml(i,e._0xef6fce)>0?n=i:r=i}return n}function vp(e){if(e.goal)return{...e.goal};let t=e.start??{e:0,n:0},n=e.courseM??3e3,r=e.headingDeg*Math.PI/180;return{e:t.e+Math.sin(r)*n,n:t.n+Math.cos(r)*n}}function yp(e,t,n,r){let i=e.dominant;if(!i?.k)return 0;let a=2*Math.PI/i.k,o=e.sampleH?e.sampleH(t,n,r):e.sample(t,n,r,{}).h,s=o;for(let o=1;o<=4;o++){let c=o/8*a,l=e.sampleH?e.sampleH(t+i.dx*c,n+i.dy*c,r):e.sample(t+i.dx*c,n+i.dy*c,r,{}).h;s=Math.min(s,l)}return Math.max(0,o-s)}var bp=class{constructor(e,t={}){this.fp=e,this.o={...pp,...t},this.own={_0xe11729:this.o._0xe11729,levels:this.o.levels},this.lambda=this.o.lambda??(this.o._0x8c80cd?lp:dp)[this.o.effort]??dp.balanced,this.flowOpts(),this.goal=this.o.goal??vp(e.scn),this.final=this.o.final??e.scn?.goalFinal??!0;let n={e:e.ski.e,n:e.ski.n};this.line={e0:n.e,n0:n.n,len:Math.hypot(this.goal.e-n.e,this.goal.n-n.n)},this.drive=this.o.drive!==!1,this.hdg=e.ski.headingDeg,this.nextAt=0,this.last=null,this.arrived=!1,this.leadS=this.o.lead??0,this.energy=0,this.tLast=null,this.t0=e.i*e.h,this.start={e:e.ski.e,n:e.ski.n},this.wp=null,this.power=e.prof._0x903c72,this.midAt=0,this.job=null,this.stats={decisions:0,trials:0,planMs:0,dHdg:0,dW:0,leads:0,mids:0,midTrials:0,midMs:0}}report(){let e=this.fp,t=e.i*e.h-this.t0,n=Math.hypot(this.goal.e-this.start.e,this.goal.n-this.start.n),r=n-this.distToGoal;return{timeS:t,vmg:t>0?r/t:0,meanW:t>0?this.energy/t:0,energyJ:this.energy,doneM:r,totalM:n,arrived:this.arrived}}get pf(){let e=this.fp.field.planField();return this._pf&&this._pfBase===e?this._pf:(this._pfBase=e,this._pf=Object.create(e,{invIters:{value:this.o._0x3cd8ba??1,writable:!0}}))}get sim(){let e=this.fp,t=e.field.planField();return this._sim||(this._sim=new Yu({...e.scn,stepS:this.o._0xf4d649,tune:e.tune},t,e.depthFn,e.paddlerName,e.model),this._sim.record=()=>{}),this._sim.field=t,this._sim}get distToGoal(){return Math.hypot(this.goal.e-this.fp.ski.e,this.goal.n-this.fp.ski.n)}bearingToGoal(){let e=this.fp.ski;return hp(Math.atan2(this.goal.e-e.e,this.goal.n-e.n)*180/Math.PI)}crossTrack(e,t){let n=this.line,r=(this.goal.e-n.e0)/n.len,i=(this.goal.n-n.n0)/n.len;return(e-n.e0)*i-(t-n.n0)*r}get sprintBand(){return this.o.sprint?.[this.o.effort]??null}bankUpdate(e){let t=this.sprintBand;if(!t)return;let[n,r]=t,i=this.tBank==null?0:Math.max(0,e-this.tBank),a=(this.fp.power??0)>this.fp.prof.cpW+5;this.bank=Math.min(r,Math.max(0,(this.bank??Math.min(r,3))+i*(n-+!!a))),this.tBank=e}sprintOk(){let e=this.sprintBand;return!e||e[1]>0&&(this.bank??Math.min(e[1],3))>.5}allowW(e){return e<=this.fp.prof.cpW+5||this.sprintOk()}setGoal(e,t=!0){let n=this.fp.ski;this.goal={e:e.e,n:e.n},this.final=t,this.wp=null,this.route=null,this.job=null,this.nextAt=0,this.midAt=0,this.arrived=!1,this.line={e0:n.e,n0:n.n,len:Math.hypot(this.goal.e-n.e,this.goal.n-n.n)}}get target(){return this.wp??this.goal}finish(){this.arrived=!0,this.drive&&(this.fp.setSteer(0),this.fp.setPower(null))}update(e=this.o._0xae7b01,{plan:t=!0}={}){let n=this.fp;if(this.arrived)return;if(this.final&&this.distToGoal<this.o.arriveM){this.arrived=!0,this.drive&&(n.setSteer(0),n.setPower(null));return}let r=n.i*n.h;if(this.tLast!=null&&(this.energy+=n.power*(r-this.tLast)),this.bankUpdate(r),this.tLast=r,this.wp&&Math.hypot(this.wp.e-n.ski.e,this.wp.n-n.ski.n)<this.o._0xddad8c&&(this.wp=null),!this.table){this.tableJob??=this.tableGen();let t=mp();do if(this.tableJob.next().done){this.tableJob=null;break}while(mp()-t<e)}if(!t&&!this.drive){this.job=null;return}if(this.table&&r>=this.midAt&&this.distToGoal>200&&!this.job&&(this.planRouteNow(),this.midAt=r+this.o._0x44efb5),!this.job&&r>=this.nextAt?(this.job=this.planLocal(),this.nextAt=r+this.o._0x139f52):!this.job&&this.leadS>0&&r>=(this.leadNextAt??0)&&(this.job=this.planLead(),this.leadNextAt=r+this.o._0x139f52),this.job){let t=mp();do if(this.job.next().done){this.job=null;break}while(mp()-t<e)}if(!this.drive)return;let i=Math.round(Pl(n.ski,this.hdg)*10)/10;n.setSteer(i),n.setPower(this.power)}*planLocal(){let e=mp(),{fp:t,sim:n,o:r}=this,i=t.prof._0x903c72,a=r.useFull?t.getState():null,o=this.target,s=this._lead;this.tview=this.trafficNow();let c=s?s.init:{e:t.ski.e,n:t.ski.n,u:t.ski.u,wp:t.ski.wPrime},l=hp(Math.atan2(o.e-c.e,o.n-c.n)*180/Math.PI),u=t.ski.p.mass*t.ski.p._0xd8add8,d={e:c.e,n:c.n,u:c.u,wp:c.wp??c.wPrime,d:Math.hypot(o.e-c.e,o.n-c.n),tgt:o};r._0xdaa3ee>0&&(d.faceH=yp(this.pf,c.e,c.n,s?s.t0:t.i*t.h));let f=null,p=0,m=s?this.leadPlan?.hdg??hp(s.init.psi*180/Math.PI):this.hdg,h=s?this.leadPlan?.W??s.init.P:this.power??i,g=(e,t)=>e<t?e*e/(2*t):e-t/2,_=(e,t,n=t)=>r._0x371d24*g(Math.abs(gp(e,m)),r._0xda1829)+r._0x4c9989*(g(Math.abs(t-h)/i,r._0xf30718)+.5*g(Math.abs(n-t)/i,r._0xf30718)),v=s?.limit,y=new Set([...r._0x392183.map(e=>hp(l+e)),...r._0xff103e.map(e=>hp(m+e))]),b=r.levels.map(e=>Math.min(t.prof.maxW,e*i)).filter(e=>this.allowW(e));v&&(y=new Set(r._0xff103e.map(e=>hp(v.H0+e)).filter(e=>Math.abs(gp(e,v.H0))<=v.dH)),b=[...new Set([...b.filter(e=>e>=v.minW-1&&e<=v.maxW+1),Math.min(Math.max(v.W0,v.minW),v.maxW)])]);let x=[];for(let e of y)for(let t of b){let i=r.useFull?this.rollout(n,a,e,t,d,u):this.quick(()=>e,t,d,u,r._0xe11729),o=i.score-_(e,t);x.push({hdg:e,W:t,score:o,r:i}),(!f||o>f.score)&&(f={hdg:e,W:t,score:o,r:i}),p++,yield}if(!r.useFull){let e=r._0xe11729/2,n=(t,n)=>r=>r<e?t:n,a=(e,t)=>this.quick(()=>f.hdg,n(e,t),d,u,r._0xe11729),o=f.W,s=f.W,c=f.score;for(let e of r.levels){let n=Math.min(t.prof.maxW,e*i);if(Math.abs(n-s)<1||!this.allowW(n))continue;let r=a(o,n).score-_(f.hdg,o,n);p++,yield,r>c&&(c=r,s=n)}for(let e of b){if(Math.abs(e-o)<1)continue;let t=a(e,s).score-_(f.hdg,e,s);p++,yield,t>c&&(c=t,o=e)}f.W=o,f.W2=s,f.score=c}if(this.alts=[],!s&&!r.useFull){let e=[f.hdg];for(let n of x.filter(e=>e.score>=f.score-r._0x2a3a43&&Math.abs(gp(e.hdg,f.hdg))>=r._0xb71ffb).sort((e,t)=>t.score-e.score)){if(e.some(e=>Math.abs(gp(e,n.hdg))<r._0xb71ffb))continue;e.push(n.hdg);let i=t.ski,a={e:i.e,n:i.n,psi:i.psi,u:i.u,wp:i.wPrime,P:t.power,sIn:t.steerIn,sSm:i.steerSm??0,cur:i.current??[0,0]},o=[];if(this.quickCore(this.pf,t.depthFn,a,()=>n.hdg,n.W,r._0xe11729,r._0xac27eb,t.i*t.h,0,[],o),this.alts.push({kind:`local`,hdg:n.hdg,W:n.W,behind:f.score-n.score,trace:o}),this.alts.length>=2)break}}if(s){let e=r._0xe11729/2,t=this.quick(()=>f.hdg,t=>t<e?f.W:f.W2??f.W,d,u,r._0xe11729).score,n=this.quick(()=>s.holdHdg??m,()=>s.holdW??h,d,u,r._0xe11729).score,a=e=>Math.round(e/i*4),o=x.filter(e=>Math.abs(gp(e.hdg,f.hdg))>=10||a(e.W)!==a(f.W));s.result={gain:Math.max(0,t-n),margin:o.length?Math.max(0,f.score-Math.max(...o.map(e=>e.score))):1/0,hdg:f.hdg,W:f.W,W2:f.W2??f.W,headingErr:gp(f.hdg,hp(s.init.psi*180/Math.PI)),run:s.run>.35,_0x973751:s._0x973751,u:s.init.u,at:s.t0},this.stats.leads++}else{if(this.stats.dHdg+=Math.abs(gp(f.hdg,m)),this.stats.dW+=Math.abs(f.W-h),this.hdg=f.hdg,this.power=f.W,this.power2=f.W2??f.W,this.last=f,!r.useFull){let e=t.ski,n={e:e.e,n:e.n,psi:e.psi,u:e.u,wp:e.wPrime,P:t.power,sIn:t.steerIn,sSm:e.steerSm??0,cur:e.current??[0,0]},i=[];this.quickCore(this.pf,t.depthFn,n,()=>f.hdg,e=>e<r._0xe11729/2?f.W:f.W2,r._0xe11729,r._0xac27eb,t.i*t.h,0,[],i),this.trace=i}this.commitPlan(),this.stats.decisions++,this.stats.trials+=p,this.stats.planMs+=mp()-e}}*planLead(){let e=this.fp,t=e.ski,n=this.leadS,r=t.headingDeg,i={e:t.e,n:t.n,psi:t.psi,u:t.u,wp:t.wPrime,P:e.power,sIn:e.steerIn,sSm:t.steerSm??0,cur:t.current??[0,0]},a=e.i*e.h,o=this.quickCore(this.pf,e.depthFn,i,()=>r,e.target,n,this.o._0xac27eb,a,0),s=e.prof._0x903c72,c=e.target,l={init:{e:o.e,n:o.n,psi:o.psi,u:o.u,wp:o.wp,P:o.P,sIn:o.sIn,sSm:o.sSm,cur:i.cur},t0:a+n,run:o.run,_0x973751:o._0x973751,limit:null,holdHdg:r,holdW:c};try{this._lead=l,this.o.leadPlanner===`optimum`?yield*this.planLocal():yield*this.planWords(l,null);let t=l.result,u=t.W-c>=this.o._0xa04a46*s||Math.abs(t.headingErr)>this.o._0x169d59;u?(this.rapidT??=a,a-this.rapidT>this.o._0x73ec20&&(u=!1)):this.rapidT=null;let d=null;u&&(l.limit={W0:c,minW:.25*s,maxW:s,H0:r,dH:15},this.o.leadPlanner===`optimum`?yield*this.planLocal():yield*this.planWords(l,l.limit),d=l.result);let f=!1;if(this.tview){let t=[];this.quickCore(this.pf,e.depthFn,i,()=>r,e.target,4,this.o._0xac27eb,a,0,[],null,t,0),f=op(this.tview,t)>=.7*Pf.close}let p=o.run>.2||!!e.ski.onRun||(e.ski.slopeForce??0)>.15*Math.max(e.ski.thrust??0,20);yield;let m=this.o._0xe11729/2,h=this.quickCore(this.pf,e.depthFn,l.init,()=>t.hdg,e=>e<m?t.W:t.W2,this.o._0xe11729,this.o._0xac27eb,l.t0,0),g=Math.sin(t.hdg*Math.PI/180),_=Math.cos(t.hdg*Math.PI/180),v=e.field.dominant;if((this.reviewLog??=[]).push({t:a,gain:t.gain,tol:t.tolM??0,dH:t.headingErr,dL:Gd(t.W,s)-Gd(c,s),run:o.run>.35||!!e.ski.onRun}),this.reviewLog.length>40&&this.reviewLog.shift(),yield,this.leadPlan={...t,gain:t.gain,margin:t.margin,W0:c,rapid:u,slow:d,canSurf:p,trafficRisk:f,runEnd:h.run>.35,pearlRisk:h.maxSlope>.21,catchS:u?this.crestCatchS(l.init,l.t0):1/0,headSea:v.dx*g+v.dy*_<-.2,crest:this.crestAhead(l.init,t.hdg,l.t0)},this.o.leadPlanner!==`optimum`){yield;let o=this.leadPlan,l=u?rf({B:s,W0:c,run:o.run,slow:o.slow,catchS:o.catchS,canSurf:o.canSurf}):{W:t.W,W2:t.W2,headingErr:t.headingErr},d=l.W,f=l.W2??l.W,p=hp(r+l.headingErr),m=[],h=this.o._0xe11729/2;this.quickCore(this.pf,e.depthFn,i,(e,t,i)=>i<n?r:p,t=>t<n?e.target:t-n<h?d:f,n+this.o._0xe11729,this.o._0xac27eb,a,0,[],m),this.leadPlan.coach={trace:m,power:e.target,power2:f,gain:t.gain,gap:Math.max(0,(t.bestScore??0)-(t.score??0)),leadS:n},this.commitPlan()}}finally{this._lead=null}}*planWords(e,t){let{fp:n,o:r}=this,i=n.prof._0x903c72,a=this.target,o=e.holdHdg,s=e.holdW,c=n.ski.p.mass*n.ski.p._0xd8add8,l=e.init,u=r._0xe11729/2,d={e:l.e,n:l.n,u:l.u,wp:l.wp,d:Math.hypot(a.e-l.e,a.n-l.n),tgt:a},f=fp[r.effort]??`sporty`,p=(uf.tolMph[f]??uf.tolMph.sporty)*(uf.tolScale??1)/2.23694*r._0xe11729,m=Jd,h=[0,-m.little,m.little,-m.full,m.full].filter(e=>(!t||Math.abs(e)<=t.dH)&&(!uf.noTurn||e===0)),g=e=>Math.min(n.prof.maxW,e),_=Gd(s,i),v=Wd.slice(0,7).map((e,t)=>({level:t,W:g(e*i)}));v=v.filter(e=>e.level>=(uf.minLevel??0)&&this.allowW(e.W)),t&&(v=v.filter(e=>e.W>=t.minW-1&&e.W<=t.maxW+1));let y=(e,t,n=t)=>this.quick(()=>hp(o+e),t===n?t:e=>e<u?t:n,d,c,r._0xe11729).score,b=y(0,s),x=[],S=1;yield,t&&v.push({level:_,W:Math.min(Math.max(s,t.minW),t.maxW),held:!0});for(let e of h)for(let t of v)x.push({dH:e,W:t.W,level:t.level,score:y(e,t.W)}),S++,yield;let C=x.reduce((e,t)=>t.score>e.score?t:e,x[0]),w={...C,W2:C.W};for(let e of v){if(Math.abs(e.W-C.W)<1)continue;let t=y(C.dH,C.W,e.W);S++,yield,t>w.score+.25*p&&(w={...C,W2:e.W,score:t})}let T=Math.max(w.score,b),E;if(!t&&b>=T-p*(this.coachHold?1:.6))E={dH:0,W:s,W2:s,score:b,level:_};else{let e=x.filter(e=>e.score>=T-p),n=e=>Math.abs(e.level-_)+(e.dH?1.5+Math.abs(e.dH)/25:0);if(!e.length)E=w;else{let r=t?null:this.coachLast,i=(r&&e.find(e=>e.level===r.level&&Math.abs(gp(hp(o+e.dH),r.hdg))<=6))??e.reduce((e,t)=>n(t)<n(e)-1e-9||Math.abs(n(t)-n(e))<1e-9&&t.score>e.score?t:e,e[0]);E={...i,W2:i.W};for(let e of v){if(Math.abs(e.W-i.W)<1)continue;let t=y(i.dH,i.W,e.W);S++,yield,t>E.score+.5*p&&(E={...i,W2:e.W,score:t})}}}t||(this.coachHold=E.dH===0&&E.W===s&&E.W2===s,this.coachLast=this.coachHold?null:{hdg:hp(o+E.dH),level:E.level}),e.result={gain:Math.max(0,T-b),margin:1/0,hdg:hp(o+E.dH),W:E.W,W2:E.W2??E.W,headingErr:E.dH,run:e.run>.35,_0x973751:e._0x973751,u:l.u,at:e.t0,bestScore:T,holdScore:b,tolM:p,score:E.score},t||this.stats.leads++,this.stats.trials+=S}setLead(e){this.leadS=e>0?e:0,this.leadS||(this.leadPlan=null,this.coachLast=null,this.coachHold=!1,this.rapidT=null,this.reviewLog=[],this.curPlan&&(this.curPlan.coach=null),this.prevPlan&&(this.prevPlan.coach=null))}crestCatchS(e,t){let n=this.fp.field,r=n.dominant,i=Math.sin(e.psi),a=Math.cos(e.psi),o={},s=2*Math.PI/r.k,c=r.omega/r.k*(r.dx*i+r.dy*a)-e.u,l=n.hsRef;if(!(c>.3))return 1/0;let u=r=>n.sample(e.e-i*r,e.n-a*r,t,o).h,d=u(0),f=u(.5);for(let e=1;e<=1.2*s;e+=.5){let t=u(e);if(f>d&&f>=t&&f>.2*l)return(e-.5)/c;d=f,f=t}return 1/0}crestAhead(e,t,n){let r=this.fp.field.planField(),i=Math.sin(t*Math.PI/180),a=Math.cos(t*Math.PI/180),o={},s=.1,c=Math.max(e.u,1.5),l=[];for(let t=0;t<=50;t++)l.push(r.sample(e.e+i*c*t*s,e.n+a*c*t*s,n+t*s,o).h);let u=l.map((e,t)=>(l[Math.max(0,t-1)]+e+l[Math.min(l.length-1,t+1)])/3),d=u[0];for(let e=1;e<u.length-1;e++){if(d=Math.min(d,u[e]),u[e]>u[e-1]&&u[e]>=u[e+1]&&u[e]-d>=Xd.seen&&e*s>=.3)return{rise:u[e]-d,inS:e*s};u[e]>u[e-1]&&u[e]>=u[e+1]&&(d=u[e])}return null}lookDir(){let e=this.fp.ski,t=this.leadPlan;if(!t)return null;let n=this.wp??(this.route?.path??[]).find(t=>Math.hypot(t.e-e.e,t.n-e.n)>=90);if(!n||Math.hypot(n.e-e.e,n.n-e.n)<60)return null;let r=gp(hp(Math.atan2(n.e-e.e,n.n-e.n)*180/Math.PI),t.hdg);return Math.abs(r)>=15?r>0?`right`:`left`:null}coachInput(){let e=this.leadPlan;return e?{W:e.W,W2:e.W2,B:this.fp.prof._0x903c72,headingErr:e.headingErr,run:e.run,_0x973751:e._0x973751,u:e.u,W0:e.W0,rapid:e.rapid,canSurf:e.canSurf,runEnd:e.runEnd,pearlRisk:e.pearlRisk,catchS:e.catchS,headSea:e.headSea,crest:e.crest,at:e.at,gain:e.gain,margin:e.margin,trafficRisk:!!e.trafficRisk,mode:fp[this.o.effort]??`sporty`,_0xe11729:this.o._0xe11729,lookDir:this.lookDir(),review:this.reviewNow(),slow:e.slow?{W:e.slow.W,W2:e.slow.W2,headingErr:e.slow.headingErr}:null}:null}reviewNow(){if(({easy:`cruise`,balanced:`sporty`,fast:`race`}[this.o.effort]??`sporty`)===`cruise`||!this.reviewLog?.length)return null;let e=this.reviewLog[this.reviewLog.length-1].t,t=this.reviewLog.filter(t=>e-t.t<=5.5);if(t.length<6)return null;let n=e=>t.reduce((t,n)=>t+e(n),0)/t.length,r=n(e=>e.tol);if(!(n(e=>e.gain)>3*r))return null;let i=e=>t.filter(e).length/t.length,a=n(e=>e.dL),o=n(e=>e.dH),s=i(e=>e.dL>=2)>=.7&&a>=2,c=i(e=>e.dL<=-2)>=.7&&a<=-2,l=i(e=>Math.sign(e.dH)===Math.sign(o)&&Math.abs(e.dH)>=10)>=.7,u=null;return s?u=i(e=>e.run)>=.3?`could have caught that`:`more power there`:c?u=`wasted power`:l&&(u=`${o<0?`left`:`right`} was better`),u?{text:u,id:e}:null}markers(){let e=this.fp.ski,t=[];this.distToGoal>25&&t.push({e:this.goal.e,n:this.goal.n,kind:`goal`});let n=(e,t)=>Math.hypot(e.e-t.e,e.n-t.n)<40;this.wp&&t.push({e:this.wp.e,n:this.wp.n,kind:`wp`});let r=0;for(let i of this.route?.path??[])if(!(Math.hypot(i.e-e.e,i.n-e.n)<220||n(i,this.goal)||this.wp&&n(i,this.wp)||t.some(e=>n(i,e)))&&(t.push({e:i.e,n:i.n,kind:`route`}),++r>=3))break;return t}planNow(){let e=this.fp.i*this.fp.h;this.table||this.buildTable(),this.distToGoal>200&&(this.planRouteNow(),this.midAt=e+this.o._0x44efb5);for(let e of this.planLocal());this.nextAt=e+this.o._0x139f52,this.prevPlan=null}guide(e=130){let t=this.planGuide(this.curPlan??this.snapshot(),e),n=this.fp.i*this.fp.h;if(!this.prevPlan||n-this.switchT>=this.o._0xa2c72c)return t;let r=zd(this.planGuide(this.prevPlan,e)),i=zd(t),a=Math.min(1,Math.max(0,(n-this.switchT)/this.o._0xa2c72c)),o=a*a*(3-2*a),s=[];for(let e=0;e<i.length;e++){let t=i[e],n=r[e];s.push(n?{e:n.e+(t.e-n.e)*o,n:n.n+(t.n-n.n)*o,W:n.W+(t.W-n.W)*o,a:n.a+(t.a-n.a)*o}:{...t,a:t.a*o})}return s}snapshot(){return{trace:this.trace??[],power:this.power,power2:this.power2,path:this.route?.path??null,alts:this.alts??[],routeAlt:this.routeAlt??null,coach:this.leadS>0?this.leadPlan?.coach??null:null}}commitPlan(){this.prevPlan=this.curPlan??null,this.curPlan=this.snapshot(),this.switchT=this.fp.i*this.fp.h}planGuide(e,t=130){let n=this.fp.ski,r=this.fp.prof._0x903c72,i=.55,a=e.coach,o=[{e:n.e-Math.sin(n.psi)*i,n:n.n-Math.cos(n.psi)*i,W:(a?a.power:e.power)??this.fp.power,a:1}],s=a?a.trace:e.trace,c=0,l=1/0;s.forEach((e,t)=>{let r=Math.hypot(e.e-n.e,e.n-n.n);r<l&&(l=r,c=t)});for(let e=c+1;e<s.length;e++)o.push({e:s[e].e,n:s[e].n,W:s[e].W,a:1});let u=()=>o.reduce((e,t,n)=>e+(n?Math.hypot(t.e-o[n-1].e,t.n-o[n-1].n):0),0),d=o[o.length-1],f=(a?a.power2:e.power2)??e.power??r;if(u()<t&&e.path){let n=d.e-o[0].e,r=d.n-o[0].n,i=Math.hypot(n,r)||1;for(let a of e.path)if(!((a.e-d.e)*n+(a.n-d.n)*r<=4*i)&&(o.push({e:a.e,n:a.n,W:f,a:.55}),u()>=t))break}return o.length<3&&this.distToGoal>5&&o.push({e:this.goal.e,n:this.goal.n,W:f,a:.55}),o}altGuides(e=110){let t=this.fp.ski,n=this.fp.prof._0x903c72,r=.55,i=[],a=this.curPlan??this.snapshot(),o=e=>({e:t.e-Math.sin(t.psi)*r,n:t.n-Math.cos(t.psi)*r,W:e,a:1}),s=a.coach,c=a.trace??[];if(s&&c.length>2){let e=s.trace[Math.min(s.trace.length-1,c.length-1)],t=c[c.length-1],r=Math.hypot(e.e-t.e,e.n-t.n),l=Math.min(s.trace.length-1,Math.ceil((s.leadS??.8)/.4)+1),u=Math.abs(Gd(c[1].W,n)-Gd(s.trace[l].W,n));(r>8||u>=2)&&i.push({kind:`local`,behind:s.gap??0,weight:.8,pts:[o(a.power??n),...c.slice(1).map(e=>({e:e.e,n:e.n,W:e.W,a:1}))]})}for(let e of a.alts??[])i.push({kind:`local`,behind:e.behind,weight:Math.max(0,1-e.behind/this.o._0x2a3a43),pts:[o(e.W),...e.trace.slice(1).map(t=>({e:t.e,n:t.n,W:e.W,a:1}))]});if(a.routeAlt){let t=[o(this.power??n)],r=0,s=t[0];for(let i of a.routeAlt.path)if(r+=Math.hypot(i.e-s.e,i.n-s.n),t.push({e:i.e,n:i.n,W:this.power2??this.power??n,a:1}),s=i,r>=e)break;t.length>=2&&i.push({kind:`route`,behind:a.routeAlt.slowerPct,weight:Math.max(0,1-a.routeAlt.slowerPct/(100*this.o._0xa4c396)),pts:t})}return i}*tableGen(){let e=this.fp,t=e.field.planField(),n=t.openWater?t.openWater():t,r=Tf(e.field),i=e.prof._0x903c72,a=e.ski,o=[];for(let t of Ef){let s=[],c=n.scaled(t);for(let t of Df){let n=hp(r+t),o=n*Math.PI/180,l=this.quickCore(c,null,{e:0,n:0,psi:o,u:3.2,wp:e.prof.wPrime,P:i,sIn:0,sSm:0,cur:a.current??[0,0]},()=>n,i,40,this.o._0xac27eb,0,12);s.push(Math.max(.5,l.along/28)),yield}o.push(s)}this.table=new Of(o)}buildTable(){for(let e of this.tableGen());}setEffort(e){this.o.effort=e,this.lambda=(this.o._0x8c80cd?lp:dp)[e]??this.lambda,this.flowOpts()}get flow(){return this.o.effort===`flow`}flowOpts(){Object.assign(this.o,this.flow?{_0xe11729:up._0xe11729,levels:up.levels}:this.own),this.flow&&this.o.lambda==null&&(this.lambda=up.lambda)}get rideSpeed(){return this._rideU??=_p(this.fp.ski.p,this.fp.prof._0x903c72)}setDrive(e){if(e===this.drive)return;let t=this.fp;e?(this.energy=0,this.tLast=null,this.t0=t.i*t.h,this.start={e:t.ski.e,n:t.ski.n},this.arrived=!1,this.line={e0:t.ski.e,n0:t.ski.n,len:Math.hypot(this.goal.e-t.ski.e,this.goal.n-t.ski.n)}):(t.setSteer(0),t.setPower(null)),this.drive=e}planRouteNow(){let e=mp(),{fp:t,o:n}=this,r=t.ski,i=this.goal,a=t.i*t.h,o=Tf(t.field);if(!this.table)return;let s=(e,n)=>wf(t.field,e,n,a),c=(e,t,n)=>this.table.at(s(e,t),gp(n,o)),l=Math.hypot(i.e-r.e,i.n-r.n),u=[50,100,150,200];for(let e=350;e<l;e+=n._0x4730ab)u.push(e);let d=[];for(let e=-n._0xa2952c;e<=n._0xa2952c;e+=n._0xca3def)d.push(e);let f=(e,n)=>!t.depthFn||t.depthFn(e,n)>=4,p=kf({from:{e:r.e,n:r.n},goal:i,_0xe111e0:u,offsets:d,speedAt:c,ok:f,scaleAt:s,maxStepOff:n._0xca3def*1.5});if(this.route=p,this.routeAlt=null,p&&this.o.routeAlt!==!1){let e=p.path.map(e=>e.off),t=n._0x94f9a2,a=p.path.length,o=u.filter(e=>e<l-20),d=[];for(let e=-n._0xa2952c;e<=n._0xa2952c;e+=n._0xca3def/2)d.push(e);let m=kf({from:{e:r.e,n:r.n},goal:i,_0xe111e0:u,offsets:d,speedAt:c,ok:f,scaleAt:s,maxStepOff:n._0xca3def*1.5,maxSlope:n._0x9ae07b,banned:(r,i)=>Math.abs(d[i]-(e[r]??0))<Math.min(t,n._0x6100e6*(o[r]??0))&&r<a-1});m&&m.time<=p.time*(1+n._0xa4c396)&&(this.routeAlt={path:m.path,time:m.time,slowerPct:100*(m.time-p.time)/p.time})}let m=null;if(p&&p.straightTime-p.time>n._0x34308f*p.straightTime){let e=p.path.find(e=>Math.hypot(e.e-r.e,e.n-r.n)>=120&&Math.abs(e.off)>=n._0xca3def*.9)??null;m=e?{e:e.e,n:e.n}:null}this.wp=m,this.commitPlan(),this.stats.mids++,this.stats.midMs+=mp()-e}quick(e,t,n,r,i,a=this.o._0xac27eb,o=this.o.marks){let s=this.fp,c=s.ski,l=this._lead,u=l?l.init:{e:c.e,n:c.n,psi:c.psi,u:c.u,wp:c.wPrime,P:s.power,sIn:s.steerIn,sSm:c.steerSm??0,cur:c.current??[0,0]},d=this.tview,f=d?[]:null,p=l?Math.max(0,l.t0-s.i*s.h):0,m=this.quickCore(this.pf,s.depthFn,u,e,t,i,a,l?l.t0:s.i*s.h,0,o,null,f,p),h=this.o.leash,g=h?h.at(i+p):null,_=(d?op(d,f):0)+(g?h.cost(Math.hypot(m.e-g.e,m.n-g.n)):0)+(this.o._0xf3af8b??0)*(m.shoal??0),v=this.o._0xdaa3ee>0&&n.faceH!=null?this.o._0xdaa3ee*this.lambda*r*Ut*(m.faceH-n.faceH):0;if(!m.marks.length){let e=this.score(n,r,m.e,m.n,m.u,m.wp,m.energy,m.aground,m);return _||v?{...e,score:e.score-_+v,traffic:_,face:v}:e}let y=0,b=null;for(let e of m.marks)b=this.score(n,r,e.e,e.n,e.u,e.wp,e.energy,m.aground),y+=b.score;return{...b,score:y/m.marks.length-_+v,traffic:_,face:v}}trafficNow(){let e=this.o.traffic;if(!e)return null;let t=this.fp.ski,n=this.line,r=e.course??[(this.goal.e-n.e0)/(n.len||1),(this.goal.n-n.n0)/(n.len||1)];return rp({e:t.e,n:t.n,psi:t.psi,u:t.u},e.others()??[],r,{_0xe11729:this.o._0xe11729,small:!!e.small})}quickCore(e,t,n,r,i,a,o,s,c=0,l=[],u=null,d=null,f=0){let p=this.fp,m=p.ski.p,h={},g=Math.round(a/o),_=p.prof.cpW,v=p.prof.wPrime,y=m.mass*m._0xd8add8,b=n.cur,{e:x,n:S,psi:C,u:w,wp:T,P:E,sIn:D,sSm:O}=n,k=0,A=0,j=!1,M=x,N=S,P=0,F=0,I=0,ee=0,L=0,te=0,R=!1,ne=0,re=this.fp?.prof?._0x903c72??0,z=up.through?`vrel`:`u`,ie=this.o._0x0c3228??0,ae=this.flow?this.rideSpeed:1/0,oe=[],se=l.map(e=>Math.round(e/o)),ce=e.dominant,le=ce.omega/ce.k,ue=(m._0xdf00f2??0)>0&&p.ski.wind&&(p.ski.wind[0]||p.ski.wind[1])?p.ski.wind:null,de=.6125*(m._0xdf00f2??0)*(m._0x90e520??0),fe=typeof i==`function`?i:()=>i,pe=Math.max(1,Math.round(.4/o)),me=Math.max(1,Math.round(.25/o)),he=1-Math.exp(-o/.2),ge=m._0x650dee,_e=Math.round(c/o),ve=C;for(let n=0;n<g;n++){n===_e&&(M=x,N=S),u&&n%pe===0&&u.push({e:x,n:S,W:fe(n*o)}),d&&n>0&&n%me===0&&d.push({e:x,n:S,psi:C,u:w,tau:f+n*o});let i=s+n*o,a=Math.sin(C),c=Math.cos(C),l=c,p=-a,g=(C*180/Math.PI%360+360)%360,ve=Math.max(-1,Math.min(1,Math.round(gp(r(x,S,n*o),g)/25*10)/10||0))-D,ye=3*o;D+=Math.abs(ve)<ye?ve:Math.sign(ve)*ye;let be=D*.7;E+=(fe(n*o)-E)*he,T<=0&&E>_&&(E=_),T=E>_?Math.max(0,T-(E-_)*o):Math.min(v,T+.5*(_-E)*o),k+=E*o,E>re&&(A+=(E-re)*o);let xe=e.sample(x,S,i,h),Se=((e.sampleH?e.sampleH(x+a*ge,S+c*ge,i):e.sample(x+a*ge,S+c*ge,i,{}).h)-(e.sampleH?e.sampleH(x-a*ge,S-c*ge,i):e.sample(x-a*ge,S-c*ge,i,{}).h))/(2*ge),Ce=xe.sx*l+xe.sn*p,we=b[0]*a+b[1]*c,Te=xe.ue*a+xe.un*c+we,Ee=w-Te,De=Math.min(Math.max((w-le*(ce.dx*a+ce.dy*c))/(w+le),0),1),Oe=E>0?m.eta*E/Math.max(w-we,1.5):0,ke=(m.c2*Ee*Math.abs(Ee)*(1+m._0x2ab99a*O*O)+m.c4*Ee*Ee*Ee*Math.abs(Ee))*Ml(Ee,m._0xef6fce),Ae=-y*Ut*m._0x530f2a*(1-m._0x2fbec7*De)*Se,B=(m._0x3cdd41*y*Ut*Se*Se+m._0x1111ab*y*Math.abs(Se)*Math.abs(Ee))*De,je=m._0x6eccf3*y*Ut*Ce*Ce,Me=0;if(ue){let e=(ue[0]-a*w)*a+(ue[1]-c*w)*c;Me=de*Math.abs(e)*e}F=Ae/Math.max(ke,1),I=Ce,ee=Math.max(ee,Math.abs(Se)),R=Ae>.35*Oe&&Se<-.02&&(z===`vrel`?Ee:w)>=ae,R&&(L+=o,E<=3&&(te+=o)),w=Math.max(.2,w+(Oe+Ae+Me-ke-B-je)/y*o);let Ne=xe.sx*ce.dx+xe.sn*ce.dy,V=(m.waveLean??0)>0&&Ne<-.01&&w>1.5?Math.min(m._0xfb2c67??.26,m.waveLean*Math.atan(Math.abs(Ce))*Math.min(1,-Ne/.04)):0;if(C+=(be*m._0xacee49*(w/(w+2))+m.broach*(1-(m._0x329cc3??0)*Math.min(1,V/(m._0xfb2c67??.26)))*Ce*Math.min(w/6,1.2))*o,O+=(be-O)*Math.min(1,o*4),x+=Math.sin(C)*w*o,S+=Math.cos(C)*w*o,t){let e=t(x,S);if(e<.7){j=!0;break}e<ie&&(ne=Math.max(ne,ie-e))}P<se.length&&n+1===se[P]&&(oe.push({e:x,n:S,u:w,wp:T,energy:k}),P++)}let ye=this.o._0xdaa3ee>0&&!j?yp(e,x,S,s+g*o):0;return{marks:oe,psi:C,P:E,sIn:D,sSm:O,run:F,maxSlope:ee,_0x973751:I,e:x,n:S,u:w,wp:T,energy:k,above:A,aground:j,shoal:ne,along:(x-M)*Math.sin(ve)+(S-N)*Math.cos(ve),ride:L,glide:te,endRun:R,faceH:ye}}score(e,t,n,r,i,a,o,s,c=null){let l=e.tgt??this.goal,u=Math.hypot(l.e-n,l.n-r),d=Math.abs(this.crossTrack(n,r)),f=.5*t*(i*i-e.u*e.u),p=Math.max(0,e.wp-a),m=.4*Math.max(0,d-this.o._0x2ddd79)+(s?500:0);if(this.flow&&c){let t=up,a=t._0x7448de*(c.glide+(c.endRun?t._0xee852a:0))+t.ride*(c.ride-c.glide),l=t._0x8c80cd&&c.above!=null?c.above:o;return{score:t.progress*(e.d-u)+a-this.lambda*(l+p-f)-m,progress:e.d-u,energy:o,dWp:p,dKE:f,cross:d,u:i,e:n,n:r,aground:s,ride:c.ride,glide:c.glide}}return{score:e.d-u-this.lambda*((this.o._0x8c80cd?0:o)+p-f)-m,progress:e.d-u,energy:o,dWp:p,dKE:f,cross:d,u:i,e:n,n:r,aground:s}}rollout(e,t,n,r,i,a){e.setState(t),e.mode=`paddle`,e.autoPower=!0,e.target=r;let o=e.h,s=Math.round(this.o._0xe11729/o),c=Math.max(1,Math.round(.1/o)),l=0,u=0,d=!1,f=0,p=0,m=this.flow?this.rideSpeed:1/0,h=this.fp?.prof?._0x903c72??0;for(let t=0;t<s;t++)t%c===0&&(e.steerCmd=Math.round(Pl(e.ski,n)*10)/10),e.stepOnce(null),l+=e.power*o,e.power>h&&(u+=(e.power-h)*o),e.aground&&(d=!0),e.ski.onRun&&e.ski.u>=m&&(f+=o,e.power<=3&&(p+=o));let g=e.ski;return this.score(i,a,g.e,g.n,g.u,g.wPrime,l,d,{ride:f,glide:p,above:u,endRun:!!g.onRun&&g.u>=m})}},xp=class{constructor({uRide:e,gapS:t=1}){this.o={uRide:e,gapS:t},this.reset()}reset(){this.done=[],this.start=null,this.last=-1/0,this.lastT=null,this.surfS=0,this.glideSurfS=0,this.glideS=0,this.totalS=0,this.fed=0}add(e,t,n,r){let i=this.lastT==null?0:Math.min(.5,Math.max(0,e-this.lastT));this.lastT=e,this.totalS+=i;let a=r<=3&&n>.89408,o=!!t&&n>=this.o.uRide;a&&(this.glideS+=i),o&&(this.surfS+=i,a&&(this.glideSurfS+=i),(this.start==null||e-this.last>this.o.gapS)&&(this.start!=null&&this.done.push(this.last-this.start),this.start=e),this.last=e)}feed(e){(e.length<this.fed||this.fed&&e[0]?.t!==this.t0)&&this.reset(),this.t0=e[0]?.t;for(let t=this.fed;t<e.length;t++){let n=e[t];this.add(n.t,n.onRun,n.u,n.power)}return this.fed=e.length,this}current(e=this.lastT){return this.start!=null&&e-this.last<=this.o.gapS?this.last-this.start:0}episodes(){let e=[...this.done];return this.start!=null&&e.push(this.last-this.start),e.sort((e,t)=>t-e)}get longest(){return this.episodes()[0]??0}timeIn(e){return this.episodes().filter(t=>t>=e).reduce((e,t)=>e+t,0)}summary(){let e=Math.max(this.totalS,1e-9),t=this.episodes();return{episodes:t,longest:t[0]??0,surf:this.surfS/e,glide:this.glideS/e,glideSurf:this.glideSurfS/e,over30:this.timeIn(30)/e}}},Sp={gain:.06,lat:.3048+jf.halfBeam,angle:19.5,ahead:-.3,behind:.7,fade:2.5,gone:8,lead:1.2,on:.1,off:.3},Cp={gain:.04,near:.15,far:.46,on:.12,off:.4,touch:-.05,gone:1.2},wp=1/3,Tp=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Ep=(e,t,n,r,i)=>e<t?Tp(t-r,t,e):e>n?1-Tp(n,n+i,e):1;function Dp(e,t){let n=[Math.sin(t.psi),Math.cos(t.psi)],r=[n[1],-n[0]],i=Math.abs(Math.atan2(Math.sin(e.psi-t.psi),Math.cos(e.psi-t.psi)))*180/Math.PI,a=Tp(.4*3,3,t.u??0)*(1-Tp(10,20,i));if(a<=0)return[];let o=(e,i)=>{let a=e-t.e,o=i-t.n;return[a*n[0]+o*n[1],a*r[0]+o*r[1]]},s=[Math.sin(e.psi),Math.cos(e.psi)],c=(e.L??jf.L)/2,l=e.seatX??jf.seatX,u=-(t.L??jf.L)/2,[d,f]=o(e.e+s[0]*l,e.n+s[1]*l),[p,m]=o(e.e+s[0]*c,e.n+s[1]*c),h=[],g=u-d,_=Sp.lat+Math.max(g,0)*Math.tan(Sp.angle*Math.PI/180),v=g<Sp.ahead?Tp(-Sp.lead,Sp.ahead,g):g>Sp.behind?Math.exp(-(g-Sp.behind)/Sp.fade)*(1-Tp(Sp.gone-2,Sp.gone,g)):1,y=Ep(Math.abs(f)-_,-Sp.on,Sp.on,Sp.off-Sp.on,Sp.off-Sp.on);v*y>0&&h.push({kind:`side`,side:Math.sign(f)||1,s:Sp.gain*v*y*a});let b=Ep(u-p,Cp.near,Cp.far,Cp.near-Cp.touch,Cp.gone-Cp.far)*Ep(Math.abs(m),0,Cp.on,0,Cp.off-Cp.on);return b>0&&h.push({kind:`stern`,side:0,s:Cp.gain*b*a}),h}function Op(e,t){let n=[];t.forEach((t,r)=>{for(let i of Dp(e,t))n.push({...i,who:r})}),n.sort((e,t)=>t.s-e.s);let r=0,i=1;for(let e of n)r+=i*e.s,i*=wp;return{saving:r,parts:n}}var kp=.44704,Ap={goalM:1609,courseS:30,paceS:60,bandMph:1,gapK:1/30,waitMph:5,resumeM:20,slowMph:2,goMph:2.5,spotM:[10,15],holdM:15,chaseM:40,caughtM:20,powerX:1.5,rubberMs:1.5,rubberCloseMs:.3,farM:500,dropM:[25,50],dwellS:2,ownS:20,scaleRate:.15,scaleMin:.4,scaleMax:1.5},jp={d0:30,s:10,k:.5};function Mp(e,t=jp){if(!(e>t.d0))return 0;let n=(e-t.d0)/t.s;return t.k*n*n}function Np(e,t){return t>0?(e.c2*t*t+e.c4*t**4)*Ml(t,e._0xef6fce)*Math.max(t,1.5)/e.eta:0}var Pp=class{constructor(e=[0,1]){let t=Math.hypot(e[0],e[1])||1;this.ce=e[0]/t,this.cn=e[1]/t,this.t=null,this.vel=[0,0],this.vNow=null,this.vAvg=null,this.age=0,this.isSlow=!1}update(e,t){let n=this.t==null?0:Math.max(0,t-this.t);this.t=t;let r=Math.max(0,e.u??0),i=Math.sin(e.psi)*r,a=Math.cos(e.psi)*r,o=e=>n>0?1-Math.exp(-n/e):1;if(this.vel[0]+=(i-this.vel[0])*o(2),this.vel[1]+=(a-this.vel[1])*o(2),this.vNow=this.vNow==null?r:this.vNow+(r-this.vNow)*o(3),this.age+=n,this.vAvg=this.vAvg==null?r:this.vAvg+(r-this.vAvg)*Math.min(1,n/Math.min(Ap.paceS,Math.max(this.age,n,1e-6))),r>Ap.slowMph*kp){let e=o(Ap.courseS),t=this.ce+(i/r-this.ce)*e,n=this.cn+(a/r-this.cn)*e,s=Math.hypot(t,n)||1;this.ce=t/s,this.cn=n/s}this.isSlow=this.isSlow?this.vNow<Ap.goMph*kp:this.vNow<Ap.slowMph*kp}goal(e,t=0){return{e:e.e+this.ce*Ap.goalM+this.cn*t,n:e.n+this.cn*Ap.goalM-this.ce*t}}predict(e,t){return{e:e.e+this.vel[0]*t,n:e.n+this.vel[1]*t}}rel(e,t,n){let r=t-e.e,i=n-e.n;return{a:r*this.ce+i*this.cn,c:r*this.cn-i*this.ce,d:Math.hypot(r,i)}}};function Fp(e=Math.random,t=0,n=0){return{state:`paddle`,since:-1e9,offset:(2*e()-1)*Ap.bandMph*kp,side:n<0?-1:n>0?1:e()<.5?-1:1,spot:Ap.spotM[0]+e()*(Ap.spotM[1]-Ap.spotM[0]),pref:t,lane:n,scale:1,vOwn:null,lastD:null,rubber:0,teleports:0}}function Ip(e,t,n,r,i,a=.25,o=Math.random){let s=Ap,{a:c,d:l}=r.rel(n,t.e,t.n),u=Math.max(r.vAvg??0,0);e.vOwn=e.vOwn==null?t.u:e.vOwn+(t.u-e.vOwn)*(1-Math.exp(-a/s.ownS));let d=t=>{t!==e.state&&(e.state=t,e.since=i)};if(l>s.farM){let t=s.dropM[0]+o()*(s.dropM[1]-s.dropM[0]),i=Math.PI/2*(1+o())*(e.side||1),a=Math.cos(i),c=Math.sin(i),l=n.e+t*(r.ce*a+r.cn*c),u=n.n+t*(r.cn*a-r.ce*c);return e.teleports++,e.lastD=null,e.vOwn=n.u,d(`paddle`),{state:`paddle`,vTarget:n.u,aim:null,powerX:1,teleport:{e:l,n:u,psi:Math.atan2(r.ce,r.cn),u:n.u}}}let f=i-e.since<s.dwellS;r.isSlow?d(`regroup`):e.state===`regroup`&&d(`paddle`),e.state===`catchup`&&l<s.caughtM&&d(`paddle`),e.state===`wait`&&(l<s.resumeM||c<0)&&d(`paddle`),e.state!==`regroup`&&c<0&&l>s.chaseM&&d(`catchup`);let p=Math.max(0,u+e.offset-s.gapK*(c-e.pref));e.state===`paddle`&&!f&&c>0&&p<s.waitMph*kp&&d(`wait`);let m=e.lastD!=null&&a>0?(e.lastD-l)/a:0;switch(e.lastD=l,e.rubber=0,e.state){case`wait`:return{state:`wait`,vTarget:0,aim:null,powerX:1,teleport:null};case`regroup`:{let i=(c>0?.3:-.3)*e.spot,a={e:n.e+e.side*e.spot*r.cn+i*r.ce,n:n.n-e.side*e.spot*r.ce+i*r.cn},o=Math.hypot(a.e-t.e,a.n-t.n),u=l<(e.hold??s.holdM);return{state:`regroup`,vTarget:u?0:Math.min(2.2,.6+.08*o),aim:u?null:a,powerX:1,teleport:null}}case`catchup`:{let t=Math.max(u,r.vNow??0)+s.bandMph*kp;m<s.rubberCloseMs&&(e.rubber=Math.min(s.rubberMs,Math.max(0,(l-s.caughtM)/30)));let i=r.predict(n,15);return{state:`catchup`,vTarget:t,aim:{e:i.e+e.lane*r.cn,n:i.n-e.lane*r.ce},powerX:s.powerX,teleport:null}}default:return{state:`paddle`,vTarget:p,aim:r.goal(n,e.lane),powerX:1,teleport:null}}}function Lp(e,t,n){let r=Ap,i=(t-(e.vOwn??t))/Math.max(t,1);return e.scale=Math.min(r.scaleMax,Math.max(r.scaleMin,e.scale*Math.exp(r.scaleRate*i*n))),e.scale}var Rp={man:[`Sam`,`Ben`,`Tom`,`Jack`,`Leo`,`Max`,`Raj`,`Kai`,`Luis`,`Omar`,`Hugo`,`Finn`,`Noah`,`Eli`,`Theo`,`Jon`,`Ivan`,`Kenji`,`Marco`,`Dev`],woman:[`Amy`,`Zoe`,`Mia`,`Ella`,`Ava`,`Lucy`,`Nia`,`Rosa`,`Ana`,`Ivy`,`Maya`,`Lena`,`Sara`,`Tess`,`Keiko`,`Priya`,`Jade`,`Nora`,`Ruth`,`Kim`]},zp={Race:`race`,"Group paddle":`group`};function Bp(e){let t=Math.floor(e/4);return{lateral:[-4,4,-8,8][e%4]+(t%2?2:0),back:t*6}}var Vp=[{level:3,factor:.75,name:`Cruiser`,color:3902463,body:`tank-f`,pfd:`Orange`},{level:4,factor:1,name:`Tempo`,color:3066993,body:`wetsuit-m`,pfd:`Red`},{level:5,factor:1.35,name:`Hammer`,color:16752410,body:`mike-kit`,pfd:`Green`},{bot:!0,name:`Auto`,color:12606719,body:`sportsuit-f`,pfd:`Yellow`}];function Hp(e=Vp.length,t=!1){let n=Vp.slice(0,Math.min(e,Vp.length)),r=[15158332,1752220,15844367,10181046,3426654,15105570,1482885,13849600,2719929,9323693];for(let i=Vp.length;i<e;i++){let e=i-Vp.length,a=Vp[e%3],o=[.8,1,1.2][e%3]*(1+.03*(e/3|0)*(e%2?1:-1));n.push(t?{...Vp[3],name:`Auto ${2+e}`,color:r[e%r.length],body:a.body,pfd:a.pfd}:{...a,level:a.level,factor:o,name:`${a.name} ${2+(e/3|0)}`,color:r[e%r.length]})}return n}var Up={easy:`Cruise`,balanced:`Sporty`,fast:`Race`,flow:`Flow`},Wp=.4,Gp={plan:85,avoid:60,draft:16,k:6},Kp={full:6,minFull:2,planM:40,planMinM:15,lockM:10,dwellS:2,everyS:.25,fine:pl,coarse:2*pl},qp=(e,t)=>(Math.atan2(t.e-e.e,t.n-e.n)*180/Math.PI+360)%360,Jp=class{constructor({makeGhost:e,state0:t,goal:n,competitors:r=Vp,arriveM:i=30,depthFn:a=null,minDepthM:o=8,effort:s=`balanced`,traffic:c=!0,drafting:l=!0,smallSea:u=!1,session:d=`race`,rand:f=Math.random,course:p=null}){this.smallSea=u,this.goal=n,this.arriveM=i,this.start=t,this.effort=s,this.traffic=c,this.user=null,this.log=new cp,this.drafting=l,this.course=d===`group`?null:p,this.userCur=null,this.session=d===`group`?`group`:`race`,this.rand=f;let m=n.e-t.e,h=n.n-t.n,g=Math.hypot(m,h)||1;this.d0=this.course?this.course.total:g,this.ue=m/g,this.un=h/g,this.re=this.un,this.rn=-this.ue;let _=this.session===`group`;_&&(this.trk=new Pp([this.ue,this.un]));let v=a?a(t.e,t.n):1/0,y=Math.min(o,Math.max(2,.8*(Number.isFinite(v)?v:o)));this.setters=r.map((r,i)=>{let o=e(),l=Bp(i),d=r.bot?null:r.factor*o.prof._0x903c72,p=(e,n)=>({e:t.e+this.re*e-this.ue*n,n:t.n+this.rn*e-this.un*n}),m=e=>!a||(()=>{let t=p(e,l.back);return a(t.e,t.n)>=y})(),h=m(l.lateral)?l.lateral:m(-l.lateral)?-l.lateral:l.lateral;o.setState({...t,...p(h,l.back)}),d!=null&&o.setPower(d);let g=typeof r.bot==`string`?r.bot:s,v=this.course?{e:n.e,n:n.n}:{e:n.e+this.re*h,n:n.n+this.rn*h},b={},x=c?{others:()=>{let e=b.s.g.ski;return this.near(e.e,e.n,b.s,Gp.plan,Gp.k)},course:[this.ue,this.un],small:u}:null,S=_?{_0x2ddd79:1e9,_0x44efb5:1e9,leash:{at:e=>this.user?this.trk.predict(this.user,e):null,cost:Mp}}:{},C=r.bot?new bp(o,{goal:v,final:!this.course,effort:g,drive:!0,_0x3cd8ba:0,_0x139f52:1.2,routeAlt:!1,_0x44efb5:15,traffic:x,...S}):null,w=new xp({uRide:_p(o.ski.p,o.prof._0x903c72)}),T=_?Fp(f,-l.back,h):null;if(T){let e=Math.floor(i/4);T.hold=Ap.holdM+2*e,T.spot+=2*e}return b.s={...r,name:r.bot===!0&&!_?`${r.name} ${Up[g]??``}`.trim():r.name,follows:r.bot===!0,lane:h,back:l.back,W:d,g:o,auto:C,ep:w,finishT:null,nextSteer:0,nextAvoid:0,aim:v,avoid:{dh:0,f:1},gm:T,prof0:o.prof,cur:this.course?this.course.cursor():null}})}lodUpdate(e,t,n){let r=this.lod??={nFull:Kp.full,planM:Kp.planM,ms:0,at:-1e9,count:[0,0,0]};if(e-r.at<Kp.everyS&&e>=r.at)return;r.at=e;let i=this.setters.filter(e=>e.finishT==null);if(!(n>0)){for(let t of i)this.setTier(t,0,e,!0);return}r.ms>n?r.nFull>Kp.minFull?r.nFull--:r.planM=Math.max(Kp.planMinM,r.planM*.8):r.ms<.6*n&&(r.planM<Kp.planM?r.planM=Math.min(Kp.planM,r.planM*1.25):r.nFull<i.length&&r.nFull++);let a=t?Math.sin(t.psi):this.ue,o=t?Math.cos(t.psi):this.un,s=t?.e??this.start.e,c=t?.n??this.start.n;for(let e of i){let t=e.g.ski,n=t.e-s,r=t.n-c,i=Math.hypot(n,r);e.dUser=i,e.rank=i*(n*a+r*o>=-.3*i?1:2)}i.sort((e,t)=>e.rank-t.rank);let l=[0,0,0];i.forEach((t,n)=>{let i=t.g,a=t.dUser<Kp.lockM||(i.clashI??-1)>i.i||e-(t.bumpT??-1e9)<2,o=a||n<r.nFull?0:t.dUser>r.planM&&!(i.draft>.005)?2:1;this.setTier(t,o,e,a),l[t.tier??0]++}),r.count=l}setTier(e,t,n,r=!1){(e.tier??0)!==t&&(!r&&n-(e.tierAt??-1e9)<Kp.dwellS||(e.tier=t,e.tierAt=n,e.wantStep=t===0?Kp.fine:Kp.coarse))}reindex(){let e=this._ix??=[],t=0,n=(n,r)=>{let i=e[t]??={};i.s=n,i.k=r,i.a=this.along(r.e,r.n),t++};for(let e of this.setters)e.finishT??n(e,e.g.ski);this.user&&n(null,this.user),e.length=t,e.sort((e,t)=>e.a-t.a)}near(e,t,n,r,i){let a=this._ix;if(!a?.length)return[];let o=this.along(e,t),s=[],c=0,l=a.length;for(;c<l;){let e=c+l>>1;a[e].a<o?c=e+1:l=e}let u=a=>{if(a.s===n)return;let o=Math.hypot(a.k.e-e,a.k.n-t);if(o>r||s.length>=i&&o>=s[s.length-1][0])return;let c=s.length;for(s.push(null);c>0&&s[c-1][0]>o;)s[c]=s[c-1],c--;s[c]=[o,a],s.length>i&&s.pop()};for(let e=c-1;e>=0&&o-a[e].a<=r;e--)u(a[e]);for(let e=c;e<a.length&&a[e].a-o<=r;e++)u(a[e]);return s.map(([,e])=>({e:e.k.e,n:e.k.n,psi:e.k.psi,u:e.k.u,...e.s?{}:{phase:e.k.phase,power:e.k.power}}))}posesBut(e){let t=[];for(let n of this.setters)if(n!==e&&n.finishT==null){let e=n.g.ski;t.push({e:e.e,n:e.n,psi:e.psi,u:e.u})}return this.user&&t.push(this.user),t}setEffort(e){this.effort=e;for(let t of this.setters)t.follows&&t.auto&&(t.auto.setEffort(e),this.session!==`group`&&(t.name=`Auto ${Up[e]??``}`.trim()))}groupTick(e,t){let n=this.trk;n.update(t,e);let r=this.gAt==null?.25:e-this.gAt;if(!(this.gAt!=null&&r<.25&&r>=0)){this.gAt=e;for(let i of this.setters){if(i.finishT!=null)continue;let a=i.g,o=a.ski,s=Ip(i.gm,{e:o.e,n:o.n,psi:o.psi,u:o.u},t,n,e,Math.max(r,.05),this.rand??Math.random);if(i.uSm=i.uSm==null?o.u:i.uSm+(o.u-i.uSm)*(1-Math.exp(-Math.max(r,.05)/3)),s.teleport){let e=a.getState();a.setState({...e,e:s.teleport.e,n:s.teleport.n,psi:s.teleport.psi,u:s.teleport.u}),i.nextSteer=i.nextAvoid=0,i.uSm=s.teleport.u,i.auto&&(i.auto.wp=null)}i.dec=s;let c=s.powerX>1?{...i.prof0,maxW:i.prof0.maxW*s.powerX}:i.prof0;if(a.prof!==c&&(a.prof=c),i.auto){let e=n.goal(t,i.lane);if(i.auto.goal=e,i.auto.wp=null,s.state===`paddle`){let e=Lp(i.gm,s.vTarget,Math.max(r,.05)),t=i.prof0._0x903c72,n=e>=1?[1,i.prof0.cpW/t]:[],a=t=>[...new Set([...t.map(t=>+(t*e).toFixed(3)),...n])].sort((e,t)=>e-t);i.auto.o.levels=a(i.auto.flow?up.levels:pp.levels),i.auto.own.levels=a(pp.levels)}}}}}groupDrive(e){let t=e.g,n=t.ski,r=e.dec;if(r){if(t.i>=e.nextAvoid){let i=this.traffic&&r.aim?sp({me:{e:n.e,n:n.n,psi:n.psi,u:n.u},others:this.near(n.e,n.n,e,Gp.avoid,Gp.k),course:[this.trk.ce,this.trk.cn],bearingDeg:qp(n,r.aim),small:this.smallSea}):{dh:0,f:1};e.avoid=i;let a=r.vTarget,o=a>.05?Math.min(t.prof.maxW,Math.max(0,Np(n.p,a)+120*(a-(e.uSm??n.u)))):0;t.setPower(Math.round(o*i.f)),e.nextAvoid=t.i+Math.round(.5/t.h)}t.i>=e.nextSteer&&(t.setSteer(r.aim?Math.round(Pl(n,qp(n,r.aim)+e.avoid.dh)*10)/10:0),e.nextSteer=t.i+Math.round(.2/t.h))}}contacts(e,t,n){this.clashAt??=new Map;let r=(e,r)=>{if(e.user)n?.bump?.(r);else{e.g.bump(r);let n=this.setters.find(t=>t.g===e.g);n&&(n.bumpT=t,n.tier&&this.setTier(n,0,t,!0))}};Af(e,[this.ue,this.un],7,(e,i)=>{let a=qf(e.pose,i.pose);a&&(r(e,a.a),r(i,a.b));let o=`${e.id}|${i.id}`;if((this.clashAt.get(o)??-1e9)<t-.6&&Xf(e.pose,i.pose)){this.clashAt.set(o,t),this.log.clash(e,i,t);for(let t of[e,i])t.user?n?.clash?.(.4):t.g.clash(.4)}})}along(e,t){return(e-this.start.e)*this.ue+(t-this.start.n)*this.un}sync(e,t=40,n=4,r=null,i=null,a=null,o=0){this.user=i,this.reindex(),this.lodUpdate(e,i,o);let s=this.session===`group`,c=s&&!!i;c&&this.groupTick(e,i);let l=e=>c&&e.dec&&(!e.auto||e.dec.state!==`paddle`||!e.auto.table),u=!0,d=()=>typeof performance<`u`?performance.now():Date.now();for(let e of this.setters)e.steps=0,e.spent=0,e.waiting=!1,e.auto&&r&&!e.auto.table&&(e.auto.table=r);let f=this.setters.filter(e=>e.auto&&e.finishT==null&&!(c&&e.dec&&e.dec.state!==`paddle`));if(f.length){let e=this.tick=(this.tick??0)+1,t=e=>!i||Math.hypot(e.g.ski.e-i.e,e.g.ski.n-i.n)<60;f.sort((e,n)=>(e.thinkAt??0)+(t(e)?0:3)-((n.thinkAt??0)+(t(n)?0:3)));let r=n,a=this.prof?d():0;for(let t of f){if(r<=.05&&t.auto.table)continue;let n=d();t.auto.update(Math.max(.05,r)),r-=d()-n,t.thinkAt=e,t.nextSteer=t.g.i+24}this.prof&&(this.prof[`route (bots)`]=(this.prof[`route (bots)`]??0)+d()-a)}let p=d();for(;;){let n=null;for(let r of this.setters)!r.waiting&&r.finishT==null&&r.steps<t&&r.g.i*r.g.h<e-1e-9&&(!n||r.g.i*r.g.h<n.g.i*n.g.h)&&(n=r);if(!n)break;let r=n.g,i=d();n.full??=r.field,r.field=e-r.i*r.h>Wp||n.tier===2?n.full.planField?.()??n.full:n.full,n.wantStep&&r.setStep(n.wantStep)&&(n.wantStep=null,n.nextSteer=n.nextAvoid=0);let a=this.prof,o=a?d():0,u=a?e=>{let t=d();a[e]=(a[e]??0)+t-o,o=t}:null;if(l(n))this.groupDrive(n);else if(n.auto){if(!n.auto.table){n.waiting=!0,n.spent+=d()-i;continue}r.i>=n.nextSteer&&n.auto.hdg!=null&&(r.setSteer(Math.round(Pl(r.ski,n.auto.hdg)*10)/10),n.nextSteer=r.i+Math.round(.2/r.h),u?.(`steer`))}else{if(this.traffic&&r.i>=n.nextAvoid){let e=r.ski,t=sp({me:{e:e.e,n:e.n,psi:e.psi,u:e.u},others:this.near(e.e,e.n,n,Gp.avoid,Gp.k),course:[this.ue,this.un],bearingDeg:qp(e,n.aim),small:this.smallSea});t.f!==n.avoid.f&&r.setPower(n.W*t.f),n.avoid=t,n.nextAvoid=r.i+Math.round((n.tier===2?1:.5)/r.h),u?.(`traffic: keep clear`)}r.i>=n.nextSteer&&(r.setSteer(Math.round(Pl(r.ski,qp(r.ski,n.aim)+n.avoid.dh)*10)/10),n.nextSteer=r.i+Math.round(.2/r.h),u?.(`steer`))}if(r.i%Math.max(1,Math.round(.05/r.h))===0){let e=r.ski;r.draft=this.drafting?Op({e:e.e,n:e.n,psi:e.psi,u:e.u},this.near(e.e,e.n,n,Gp.draft,4)).saving:0,u?.(`drafting`)}if(r.advance(r.h),n.steps++,u?.(`physics`),n.ep.add(r.i*r.h,r.ski.onRun,r.ski.u,r.power),c&&n.gm){if(n.gm.rubber>0){let e=r.ski;e.e+=Math.sin(e.psi)*n.gm.rubber*r.h,e.n+=Math.cos(e.psi)*n.gm.rubber*r.h}(n.dec?.powerX??1)>1&&(r.ski.wPrime=r.prof.wPrime)}if(this.course&&n.cur&&this.course.update(n.cur,r.ski.e,r.ski.n)){let e=this.course.target(n.cur);e&&(n.aim={e:e.e,n:e.n},n.auto&&n.auto.setGoal(e,!1))}!s&&(this.course?this.course.done(n.cur):this.along(r.ski.e,r.ski.n)>=this.d0-this.arriveM)&&(n.finishT=r.i*r.h,n.auto&&r.setSteer(0),r.setPower(0)),n.spent+=d()-i}{let e=this.lod;e&&(e.ms=.85*e.ms+.15*(d()-p))}let m=this.prof?d():0;{let t=this.setters.filter(e=>e.finishT==null).map(e=>{let t=e.g.ski;return{id:e.name,name:e.name,g:e.g,pose:{e:t.e,n:t.n,psi:t.psi,u:t.u,phase:e.g.phase,power:e.g.power}}});i&&t.push({id:`you`,name:`You`,user:!0,pose:i}),this.log.check(t,e,[this.ue,this.un],this.smallSea),this.traffic&&this.contacts(t,e,a)}this.prof&&(this.prof[`contacts and close calls`]=(this.prof[`contacts and close calls`]??0)+d()-m,this.prof.frames=(this.prof.frames??0)+1);for(let t of this.setters){let n=t.g;n.frames.length>4&&(n.frames.splice(0,n.frames.length-2),n.states.splice(0,n.states.length-2)),n.i*n.h<e-1e-6&&t.finishT==null&&(u=!1)}return u}rows(e){let t=this.course,n=t&&this.userCur?t.progress(this.userCur,e.ski.e,e.ski.n):this.along(e.ski.e,e.ski.n);return this.setters.map(e=>{let r=e.g.i*e.g.h-this.start.i*pl,i=e.finishT==null?t&&e.cur?t.progress(e.cur,e.g.ski.e,e.g.ski.n):this.along(e.g.ski.e,e.g.ski.n):this.d0,a=e.ep.summary();return{name:e.name,color:e.color,level:e.level,lane:e.lane,W:e.W,avgMs:r>0?e.g.ski.distance/r:0,aheadM:n-i,finished:e.finishT!=null,finishT:e.finishT,longest:a.longest,glide:a.glide}})}},Yp={White:15922421,Red:13115439,Yellow:15909376,"Sky blue":4891615,"Royal blue":2052021,Navy:1780298,Carbon:1711135,Lime:9159498,Orange:16742938,Teal:1023375,Silver:12173511,Purple:8081343,Green:3054927,Pink:14697851},Xp=[...Object.values(Yp),Yp.White,Yp.White],Zp={man:[`mike-kit`,`wetsuit-m`],woman:[`tank-f`,`wetsuit-f`,`sportsuit-f`]},Qp=.6,$p={"1: just me":0,"2 paddlers":1,"3 paddlers":2,"4 paddlers":3,"5 paddlers":4,"6 paddlers":5,"8 paddlers":7,"10 paddlers":9,"12 paddlers":11,"16 paddlers":15,"20 paddlers":19,"30 paddlers":29,"40 paddlers":39};function em(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function tm(e,t){let n=e.slice();for(let e=n.length-1;e>0;e--){let r=Math.floor(t()*(e+1));[n[e],n[r]]=[n[r],n[e]]}return n}function nm(e,t){let n=[];return()=>(n.length||(n=tm(e,t)),n.pop())}function rm(e,{seed:t=1,bib:n=7,own:r={color:15659764,style:Is.swoosh,c1:741288}}={}){let i=em(t),a=nm(Xp,i),o=nm(Object.keys(Cn),i),s=nm(Ls,i),c=nm(Zp.man,i),l=nm(Zp.woman,i),u=tm(Array.from({length:199},(e,t)=>t+1).filter(e=>e!==n),i),d=nm(Rp.man,i),f=nm(Rp.woman,i),p=(e,t)=>Math.hypot((e>>16&255)-(t>>16&255),(e>>8&255)-(t>>8&255),(e&255)-(t&255))<60,m=[];for(let t=0;t<e;t++){let e=a(),n=i()<Qp,h=n?c():l(),g=o(),_=bn(i()),v=Math.floor(i()*1e3),y=Js(e,v,u[t%u.length],s());p(e,r.color)&&y.style===r.style&&y.c1===r.c1&&(y=Js(e,v+1,y.number,y.style)),m.push({color:e,body:h,pfd:g,skin:_,look:y,first:(n?d:f)()})}return m}var im=/^(eyes|eyebrows|booties|footstrap)$|^pfd_([2-9]|side|straps)$|^[a-z]+_[2-9]$/,am=new Set([`footplate`,`bungee`,`rudder`,`rudderhead`,`handle`]),om=new Set([`booties`,`footplate`,`footstrap`,`rudder`]);function sm(e){let t=new Map(Object.entries(e.userData?.parts??{}).map(([e,t])=>[t,e]));e.updateMatrixWorld?.(!0);let n=e.matrixWorld?.getMaxScaleOnAxis?.()||1,r=[];return e.traverse(e=>{if(!e.isMesh||t.get(e)===`hull`)return;let i=t.get(e),a=i??e.name??``,o=am.has(i)||!i&&im.test(a);e.geometry.boundingSphere||e.geometry.computeBoundingSphere();let s=e.geometry.boundingSphere.radius*((e.matrixWorld?.getMaxScaleOnAxis?.()||1)/n);r.push({o:e,r:om.has(a)?s/2:s,px:o?5:2})}),r}function cm(e,t,n,r=!0,i=5){return 2*e*n/Math.max(t,.001)>=i*(r?.9:1.1)}function lm(e,t,n,r){let i=e.userData;(!i.detail||i.detailKey!==r)&&(i.detail=sm(e),i.detailKey=r);let a=0;for(let e of i.detail){let r=e.o.layers.isEnabled(0),i=cm(e.r,t,n,r,e.px);i!==r&&(i?e.o.layers.enable(0):e.o.layers.disable(0)),i&&a++}return a}var um=class{constructor(e,{float:t=!1}={}){this.renderer=e,this.rt=new De(256,256,{type:t?I:mt,format:S,minFilter:Be,magFilter:Be,depthBuffer:!1}),this.mat=new k({uniforms:{uLWp0:{value:new Ce},uLWp1:{value:new Ce(1,1,1,1)},uLWp2:{value:new Ce},uLWSeed:{value:1},uOrigin:{value:new U},uT:{value:0}},vertexShader:`void main() { gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`${ru}\nuniform vec2 uOrigin; uniform float uT;\nvoid main() { vec2 en = uOrigin + (gl_FragCoord.xy) * ${20 .toFixed(1)}; gl_FragColor = vec4(lwSample(en, uT), 0.0, 0.0, 1.0); }`,depthTest:!1,depthWrite:!1}),this.scene=new w,this.cam=new r(-1,1,1,-1,0,1);let n=new he(new M(2,2),this.mat);n.frustumCulled=!1,this.scene.add(n),this.rect=new Ce(0,0,5120,5120),this.wind=null}get texture(){return this.rt.texture}readAll(){let e=new Float32Array(262144);this.renderer.readRenderTargetPixels(this.rt,0,0,256,256,e);let t=new Float32Array(65536);for(let n=0;n<t.length;n++)t[n]=e[4*n];return t}setWind(e){if(this.wind=e?.gusty?e:null,!this.wind)return;let t=iu(e),n=this.mat.uniforms;n.uLWp0.value.fromArray(t.p0),n.uLWp1.value.fromArray(t.p1),n.uLWp2.value.fromArray(t.p2),n.uLWSeed.value=t.seed}update(e,t,n){if(!this.wind)return!1;let r=2560,i=Math.floor((e-r)/20)*20,a=Math.floor((t-r)/20)*20;this.mat.uniforms.uOrigin.value.set(i,a),this.mat.uniforms.uT.value=n,this.rect.set(i,a,5120,5120);let o=this.renderer,s=o.getRenderTarget();return o.setRenderTarget(this.rt),o.render(this.scene,this.cam),o.setRenderTarget(s),!0}},dm=[[`Cruise`,`easy`],[`Sporty`,`balanced`],[`Race`,`fast`]],fm=()=>typeof performance<`u`?performance.now():Date.now(),pm=class{constructor({makeGhost:e,windowS:t=60,_0xae7b01:n=3,pilotOpts:r={}}){this.makeGhost=e,this.windowS=t,this._0xae7b01=n,this.pilotOpts=r,this.job=null,this.latest=null,this.history=[],this.progress=0,this.deadline=0}reset(){this.job=null,this.latest=null,this.history=[],this.progress=0}tick(e,t,n=null,r=this._0xae7b01){let i=e.states.length;if(this.job&&(i<this.job.nAtStart||e.paddlerName!==this.job.paddler)&&(this.job=null),!this.job){let r=Math.round(this.windowS/e.dt);if(i-1<r||!t)return;this.job={gen:this.round(e,t,n,r),nAtStart:i,paddler:e.paddlerName}}let a=fm();this.deadline=a+r;do if(this.job.gen.next().done){this.job=null;break}while(fm()<this.deadline-.3)}*round(e,t,n,r){let i=e.states.length-1,a=i-r,o=e.states[a],s=e.states[i],c={endT:i*e.dt,startT:a*e.dt,user:(s.distance-o.distance)/(r*e.dt),modes:{}},l=0;for(let[i,a]of dm){let s=this.makeGhost();s.setState(o),s.tune={...e.tune};let u=new bp(s,{goal:t,effort:a,drive:!0,_0x8c80cd:!0,...this.pilotOpts});n&&(u.table=n);let d=o.i*s.h+r*e.dt,f=0;for(s.i*s.h;s.i*s.h<d&&!u.arrived;)if(u.update(Math.max(.3,this.deadline-fm())),u.job||!u.table)yield;else{for(let e=0;e<6&&s.i*s.h<d;e++)s.advance(s.h),f+=s.power*s.h;yield}let p=s.i*s.h-o.i*s.h;c.modes[i]={speed:p>0?(s.ski.distance-o.distance)/p:0,meanW:p>0?f/p:0,wPrimeLeft:s.ski.wPrime,arrived:u.arrived},this.progress=++l/dm.length}this.latest=c,this.history.push(c),this.progress=0}};function mm({fp:e,rows:t=[]}){let n=e.i*e.h,r=e.ski.distance,i=n>0?r/n:0,a=[3,4,5].map(e=>t.find(t=>t.level===e)).filter(Boolean),o=a.length?0:null;for(let e of a)if(e.aheadM>0)o++;else break;return{timeS:n,distM:r,avgMs:i,surfShare:e.surfShare(),reservePct:Math.round(100*e.ski.wPrime/Math.max(1,e.prof.wPrime)),paceRows:t,stars:o}}var hm=e=>`surfski.best.${e}`;function gm(e,t=globalThis.localStorage){try{return JSON.parse(t.getItem(hm(e))??`null`)}catch{return null}}function _m(e,t,n=globalThis.localStorage){let r=gm(e,n),i=!r||t.timeS<r.timeS;if(i)try{n.setItem(hm(e),JSON.stringify({timeS:t.timeS,avgMs:t.avgMs,stars:t.stars,at:new Date().toISOString()}))}catch{}return{best:i?t:r,improved:i,deltaS:r?t.timeS-r.timeS:null,first:!r}}var vm={goal:{file:`buoy-flag`,tint:3530858,opacity:1},wp:{file:`buoy`,tint:16765498,opacity:.75},route:{file:`buoy`,tint:5625599,opacity:.45}},ym=1.85,bm=6,xm=e=>Math.min(40,Math.max(1.4,1.4+e*.017));function Sm(){let e=new te,t=new he(new ke(.45,1.8,12),new l({color:14496563}));return t.position.y=.6,e.add(t),e}var Cm=class{constructor(e,t=`/`){this.scene=e,this.src={},this.pool=[],this.group=new te,this.group.visible=!1,e.add(this.group);let n=new fr;for(let e of new Set(Object.values(vm).map(e=>e.file)))n.loadAsync(`${t}models/${e}.glb`).then(t=>{this.src[e]=t.scene}).catch(()=>{this.src[e]=Sm()})}make(e){let t=vm[e],n=this.src[t.file];if(!n)return null;let r=n.clone(!0);r.traverse(e=>{e.isMesh&&(e.material=e.material.clone(),e.material.emissive=new Ve(t.tint),e.material.emissiveIntensity=.55,t.opacity<1&&(e.material.transparent=!0,e.material.opacity=t.opacity,e.material.depthWrite=!1),e.renderOrder=4,e.frustumCulled=!1,Object.assign(e.material,{stencilWrite:!0,stencilRef:0,stencilFunc:519,stencilZPass:P}))});let i=new te;return i.add(r),i.userData.kind=e,this.group.add(i),i}hide(){this.group.visible=!1}update(e,t,n,r){let i=e.slice(0,bm);for(;this.pool.length<i.length;)this.pool.push(null);let a=!1;i.forEach((e,i)=>{this.pool[i]?.userData.kind!==e.kind&&(this.pool[i]&&this.group.remove(this.pool[i]),this.pool[i]=this.make(e.kind));let o=this.pool[i];if(!o)return;let s=t.sample(e.e,e.n,n,{}).h,c=xm(Math.hypot(e.e-r.x,-e.n-r.z,s-r.y))/ym;o.position.set(e.e,s,-e.n),o.scale.setScalar(c),o.visible=!0,a=!0});for(let e=i.length;e<this.pool.length;e++)this.pool[e]&&(this.pool[e].visible=!1);this.group.visible=a}},wm=`modulepreload`,Tm=function(e,t){return new URL(e,t).href},Em={},Dm=function(e){return e.pathname.endsWith(`.css`)},Om=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},km=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Tm(t,n);let r=s(t),i=Dm(r);return Om(Em,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:wm,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Am=new Set([`gorge`,`gorgeeast`,`gorgewest`,`rufus`]),jm=9.81,Mm=2*Math.PI,Nm=300,Pm=7e5;function Fm(e,t){let n=[];e.start&&n.push([e.start.e,e.start.n]);for(let r of e.marks??[])r.latLon&&t&&n.push(t(r.latLon[0],r.latLon[1]));if(e.goal)n.push([e.goal.e,e.goal.n]);else if(e.start){let t=(e.headingDeg??0)*Math.PI/180;n.push([e.start.e+2e3*Math.sin(t),e.start.n+2e3*Math.cos(t)])}return n}function Im(e,t,n){if(e.length===1)return Math.hypot(t-e[0][0],n-e[0][1]);let r=1/0;for(let i=1;i<e.length;i++){let[a,o]=e[i-1],[s,c]=e[i],l=s-a,u=c-o,d=l*l+u*u,f=d>0?Math.min(1,Math.max(0,((t-a)*l+(n-o)*u)/d)):0;r=Math.min(r,Math.hypot(t-a-f*l,n-o-f*u))}return r}function Lm(e,t,n,{toEnu:r=null,margin:i=800,upwind:a=1e3}={}){if(!t||!n||!(n.Tp>0)||Am.has(e.site))return null;let o=Fm(e,r);if(!o.length)return null;let s=(n.toDeg%360+360)%360,c=Math.sin(s*Math.PI/180),l=Math.cos(s*Math.PI/180),u=1/0,d=-1/0,f=1/0,p=-1/0;for(let[e,t]of o)u=Math.min(u,e-i),d=Math.max(d,e+i),f=Math.min(f,t-i),p=Math.max(p,t+i);if(c>.3?u-=a*c:c<-.3&&(d-=a*c),l>.3?f-=a*l:l<-.3&&(p-=a*l),u=Math.max(u,t.minE),d=Math.min(d,t.maxE),f=Math.max(f,t.minN),p=Math.min(p,t.maxN),!(d-u>200&&p-f>200))return null;let m=jm*n.Tp**2/Mm,h=Math.round(Math.max(4,m/3)*2)/2;for(;Rm(d-u,p-f,h,m)>Pm&&h<m/2.4;)h+=.5;if(Rm(d-u,p-f,h,m)>Pm)return null;let g=0,_=0,v=0;for(let e=f+25;e<p;e+=50)for(let n=u+25;n<d;n+=50){let r=t.depthAt(n,e);v++,r<=0?_++:r<m/2&&g++}if(!_&&g<.01*v)return null;let y=e=>Math.round(e/10)*10,b={e0:y(u),e1:y(d),n0:y(f),n1:y(p)},x=Math.round(n.Tp*10)/10,S=Math.round(n.spreadDeg??20),C=Math.round(s);return{key:`${e.site}|${b.e0},${b.e1},${b.n0},${b.n1}|${C}|${x}|${S}|${h}`,site:e.site,win:b,cell:h,to:C,period:x,spread:S,path:o}}function Rm(e,t,n,r){let i=(e,t)=>{let i=(Math.max(200,.6*Math.sqrt(1.56*r*e*n))+1.5*Math.sqrt(1.56*r*e*n))/n;return e*2**Math.ceil(Math.log2(t+e+2*i))},a=e/n,o=t/n;return Math.max(i(o,a),i(a,o))}function zm(e,t){let{win:n,cell:r}=t,i=Math.max(2,Math.round((n.e1-n.e0)/r)),a=Math.max(2,Math.round((n.n1-n.n0)/r)),o=new Float32Array(i*a);for(let t=0;t<a;t++)for(let a=0;a<i;a++)o[t*i+a]=e.depthAt(n.e0+(a+.5)*r,n.n0+(t+.5)*r);return{W:i,H:a,depth:o}}var Bm=class{constructor({worker:e=null}={}){this.worker=e,this.cache=new Map,this.busy=null,this.next=null,this.onProgress=null}cached(e){return e?this.cache.get(e.key)??null:null}request(e,t){let n=this.cache.get(e.key);return n?Promise.resolve(n):new Promise(n=>{this.next&&this.next.resolve(null),this.next={plan:e,grid:zm(t,e),resolve:n},this.pump()})}pump(){if(this.busy||!this.next)return;let e=this.busy=this.next;this.next=null;let t=t=>{this.busy=null,t&&this.cache.set(e.plan.key,t),e.resolve(t),this.pump()};this.worker?(this.worker.onmessage=n=>{let r=n.data;r?.key===e.plan.key&&(r.kind===`progress`?this.onProgress?.(r.done,r.of):t(r.kind===`solve`?r.S:null))},this.worker.onerror=e=>{console.warn(`shore solve worker failed`,e),t(null)},this.worker.postMessage({kind:`solve`,key:e.plan.key,plan:e.plan,grid:e.grid})):setTimeout(()=>{let n=null;try{n=hr(e.plan,e.grid)}catch(e){console.warn(`shore solve failed`,e)}t(n)},0)}tiles(e,t){this.tileKey=e.key;let n=e=>{e?.key===this.tileKey&&(e.kind===`error`?console.warn(`whole-map shore solve failed`,e.message):(e.kind===`blocks`||e.kind===`tilesDone`)&&t(e))};this.worker?(this.worker.onmessage=e=>n(e.data),this.worker.onerror=e=>console.warn(`shore solve worker failed`,e),this.worker.postMessage(e,[e.pack.data.buffer,...e.fetch?[e.fetch.data.buffer]:[]])):km(()=>import(`./wave-solve-worker-Bs7rdeG8.js`).then(t=>{this.local=t,t.handle(e,n)}),__vite__mapDeps([0,1,2,3]),import.meta.url)}focus(e){let t={kind:`focus`,key:this.tileKey,focus:e};this.worker?this.worker.postMessage(t):this.local?.handle(t,()=>{})}cancel(){let e={kind:`cancel`,key:this.tileKey};this.worker?this.worker.postMessage(e):this.local?.handle(e,()=>{}),this.tileKey=null}},Vm=e=>(t,n)=>{let r=Im(e,t,n);return r<400?1:r<800?(800-r)/400:0};function Hm(e,t,{spread:n=null,pack:r=null,fromDeg:i=null,maxFetchM:a=3e4}={}){let s=pr(e,t?.left??0,t?.right??0),c=e.W,l=e.H,u=e.cell,d=c*l,f=e.e0+c*u,p=e.n0+l*u,m=(t,n)=>{let r=Math.min(t-e.e0,f-t,n-e.n0,p-n);return Math.min(1,Math.max(0,r/Nm))},h=i==null?0:Math.sin(i*Math.PI/180),g=i==null?0:Math.cos(i*Math.PI/180),_=r&&i!=null?xr({minE:e.e0,minN:e.n0,maxE:f,maxN:p,elevationAt:(e,t)=>r.elevationAt(e,t)},i,a,{cell:u,step:u,minFactor:0}):null,v=(t,n)=>Math.min(h>1e-6?(f-t)/h:h<-1e-6?(e.e0-t)/h:1/0,g>1e-6?(p-n)/g:g<-1e-6?(e.n0-n)/g:1/0),y=new Float32Array(d),b=new Float32Array(d),x=new Float32Array(d),C=new Float32Array(d);for(let t=0;t<l;t++)for(let r=0;r<c;r++){let i=t*c+r,o=e.e0+(r+.5)*u,l=e.n0+(t+.5)*u,d=e.ratio[i];if(C[i]=m(o,l),!Number.isFinite(d))continue;let f=1,p=0;if(_){let e=v(o,l),t=_.factor(o,l)**2*a;t<a-u&&t<e-u&&(p=Math.sqrt(t/a)),n&&Number.isFinite(e)&&(f=n.factor(o+h*(e+60),l+g*(e+60))||1)}let S=f*(s.left[i]||0),w=f*(s.right[i]||0),T=Math.hypot(f*d,p);y[i]=Math.sqrt(Math.max(0,T*T-S*S-w*w)),b[i]=S,x[i]=w}let w=(t,n,r)=>{let i=Math.min(Math.max((n-e.e0)/u-.5,0),c-1.001),a=Math.min(Math.max((r-e.n0)/u-.5,0),l-1.001),o=Math.floor(i),s=Math.floor(a),d=i-o,f=a-s,p=t[s*c+o],m=t[s*c+o+1],h=t[(s+1)*c+o],g=t[(s+1)*c+o+1];return p+(m-p)*d+(h-p)*f+(p-m-h+g)*d*f},T=(t,n)=>t>=e.e0&&n>=e.n0&&t<=f&&n<=p,E=[0,0,0],D=[0,0],O=(e,t)=>{let r=n?n.factor(e,t):1;if(r===0||!T(e,t))return E[0]=r,E[1]=0,E[2]=0,E;let i=w(C,e,t);return E[0]=r+(w(y,e,t)-r)*i,E[1]=i*w(b,e,t),E[2]=i*w(x,e,t),E};return{solveRect:{minE:e.e0,minN:e.n0,sizeE:c*u,sizeN:l*u},turns:t??null,factor(e,t){return O(e,t)[0]},turned(e,t){return O(e,t),D[0]=E[1],D[1]=E[2],D},texture(){let e=new Uint16Array(d*4),t=o.toHalfFloat;for(let n=0;n<d;n++)e[4*n]=t(y[n]),e[4*n+1]=t(b[n]),e[4*n+2]=t(x[n]),e[4*n+3]=t(C[n]);let n=new ne(e,c,l,S,mt);return n.minFilter=n.magFilter=Be,n.wrapS=n.wrapT=Te,n.needsUpdate=!0,n}}}var Um=(e,t)=>_r(e,{weight:Vm(t)}),Wm=2048;function Gm(e,t,n,{toEnu:r=null}={}){if(!t||!n||!(n.Tp>0)||Am.has(e.site))return null;let i=(Math.round(n.toDeg)%360+360)%360,a=Math.round(n.Tp*10)/10,o=Math.round(n.spreadDeg??20),s=jm*a**2/Mm,c=Math.round(Math.max(4,s/3)*2)/2,l={e0:t.minE,e1:t.maxE,n0:t.minN,n1:t.maxN};return{key:`${e.site}|tiles|${i}|${a}|${o}|${c}`,site:e.site,region:l,sea:{to:i,period:a,spread:o,fromDeg:(i+180)%360},cell:c,path:Fm(e,r)}}function Km(e,t,n,r,i,{nearM:a=1500,nearUpM:o=1500}={}){return{kind:`tiles`,key:e.key,region:e.region,sea:e.sea,cell:e.cell,focus:r,maxFetchM:i,nearM:a,nearUpM:o,pack:{minE:t.minE,minN:t.minN,cell:t.cell,W:t.W,H:t.H,data:Float32Array.from(t.data),segs:t.structures?.segs??null},fetch:n?{W:n.W,H:n.H,data:Float32Array.from(n.data),rect:n.rect}:null}}var qm=class{constructor(e,{spread:t=null,turns:n=null}={}){this.out=e,this.spread=t,this.turns=n,this.raw=new Map,this.K=new Map,this.L=new Map,this.R=new Map,this.done=!1,this.solveRect={minE:e.e0,minN:e.n0,sizeE:e.OW*e.co,sizeN:e.OH*e.co},this.ts=Math.max(1,Math.ceil(Math.max(e.OW,e.OH)/Wm)),this.TW=Math.ceil(e.OW/this.ts),this.TH=Math.ceil(e.OH/this.ts),this.tex=null,this._0x8318f9=new Set,this.empty=new Set,this.tmp=[0,0,0],this.pair=[0,0]}add(e){for(let t of e){let e=t.by*this.out.BW+t.bx;t.empty?(this.empty.add(e),this.raw.delete(e)&&(this.K.delete(e),this.L.delete(e),this.R.delete(e),this._0x8318f9.add(e))):(this.empty.delete(e),this.raw.set(e,t),this.split(e,t),this._0x8318f9.add(e))}}split(e,t){let n=pr({W:t.w,H:t.h,ratio:t.ratio,mean:t.mean},this.turns?.left??0,this.turns?.right??0);for(let e of[n.kept,n.left,n.right])for(let t=0;t<e.length;t++)Number.isFinite(e[t])||(e[t]=0);this.K.set(e,n.kept),this.L.set(e,n.left),this.R.set(e,n.right)}setTurns(e){this.turns=e;for(let[e,t]of this.raw)this.split(e,t),this._0x8318f9.add(e)}cellAt(e,t,n,r){let{BW:i,OW:a,OH:o,B:s}=this.out;if(t<0||n<0||t>=a||n>=o)return r[0]=0,r[1]=0,r;let c=Math.floor(n/s)*i+Math.floor(t/s),l=e.get(c);if(!l)return r[0]=0,r[1]=0,r;let u=this.raw.get(c);return r[0]=l[(n-u.oy)*u.w+(t-u.ox)],r[1]=1,r}at(e,t){let n=this.spread?this.spread.factor(e,t):1,{e0:r,n0:i,co:a}=this.out,o=(e-r)/a-.5,s=(t-i)/a-.5,c=Math.floor(o),l=Math.floor(s),u=o-c,d=s-l,f=this.tmp,p=this.pair,m=0,h=0,g=0,_=0;for(let[e,t,r]of[[0,0,(1-u)*(1-d)],[1,0,u*(1-d)],[0,1,(1-u)*d],[1,1,u*d]])this.cellAt(this.K,c+e,l+t,p),p[1]?(m+=r*p[0],_+=r,h+=r*this.cellAt(this.L,c+e,l+t,p)[0],g+=r*this.cellAt(this.R,c+e,l+t,p)[0]):m+=r*n;return n===0?(f[0]=0,f[1]=0,f[2]=0,f):(f[0]=m,f[1]=h,f[2]=g,f)}factor(e,t){return this.at(e,t)[0]}turned(e,t){let n=this.at(e,t);return this.pair2??=[0,0],this.pair2[0]=n[1],this.pair2[1]=n[2],this.pair2}covered(e,t,n){if(this.done)return!0;let{e0:r,n0:i,co:a,BW:o,BH:s}=this.out,c=this.out.B*a;for(let a=Math.max(0,Math.floor((t-n-i)/c));a<=Math.min(s-1,Math.floor((t+n-i)/c));a++)for(let t=Math.max(0,Math.floor((e-n-r)/c));t<=Math.min(o-1,Math.floor((e+n-r)/c));t++){let e=a*o+t;if(!this.raw.has(e)&&!this.empty.has(e))return!1}return!0}window({e0:e,e1:t,n0:n,n1:r}){let{co:i}=this.out,a=Math.max(0,Math.floor((e-this.out.e0)/i)),o=Math.max(0,Math.floor((n-this.out.n0)/i)),s=Math.max(1,Math.min(this.out.OW-a,Math.ceil((t-e)/i))),c=Math.max(1,Math.min(this.out.OH-o,Math.ceil((r-n)/i))),l=new Float32Array(s*c).fill(NaN),u=new Float32Array(s*c).fill(NaN),d=this.out.B;for(let e=0;e<c;e++)for(let t=0;t<s;t++){let n=a+t,r=o+e,i=Math.floor(r/d)*this.out.BW+Math.floor(n/d),c=this.raw.get(i);if(!c)continue;let f=(r-c.oy)*c.w+(n-c.ox);l[e*s+t]=c.ratio[f],u[e*s+t]=c.mean[f]}return{W:s,H:c,cell:i,e0:this.out.e0+a*i,n0:this.out.n0+o*i,ratio:l,mean:u}}texture(){let{TW:e,TH:t,ts:n}=this,r=o.toHalfFloat;if(!this.tex){this.arr=new Uint16Array(e*t*4);let n=new ne(this.arr,e,t,S,mt);n.minFilter=n.magFilter=Be,n.wrapS=n.wrapT=Te,this.tex=n,this._0x8318f9.size||(n.addUpdateRange(0,4),n.needsUpdate=!0)}if(this._0x8318f9.size){let i=[0,0],a=this.arr,o=this.out.B;for(let s of this._0x8318f9){let c=this.raw.get(s)??{bx:s%this.out.BW,by:Math.floor(s/this.out.BW),ox:s%this.out.BW*o,oy:Math.floor(s/this.out.BW)*o,w:o,h:o},l=Math.floor(c.ox/n),u=Math.min(e-1,Math.floor((c.ox+c.w-1)/n)),d=Math.floor(c.oy/n),f=Math.min(t-1,Math.floor((c.oy+c.h-1)/n));for(let t=d;t<=f;t++)for(let s=l;s<=u;s++){let l=Math.min(this.out.OW-1,s*n+(n>>1)),u=Math.min(this.out.OH-1,t*n+(n>>1)),d=4*(t*e+s);Math.floor(l/o)===c.bx&&Math.floor(u/o)===c.by&&(this.cellAt(this.K,l,u,i),i[1]?(a[d]=r(i[0]),a[d+1]=r(this.cellAt(this.L,l,u,i)[0]),a[d+2]=r(this.cellAt(this.R,l,u,i)[0]),a[d+3]=r(1)):a[d]=a[d+1]=a[d+2]=a[d+3]=0)}for(let t=d;t<=f;t++)this.tex.addUpdateRange(4*(t*e+l),4*(u-l+1))}this._0x8318f9.clear(),this.tex.needsUpdate=!0}return this.tex}},Jm=`surfski-solves`,Ym=`solves`,Xm=`when`;function Zm(){return typeof indexedDB>`u`?Promise.resolve(null):new Promise(e=>{try{let t=indexedDB.open(Jm,1);t.onupgradeneeded=()=>{t.result.createObjectStore(Ym),t.result.createObjectStore(Xm)},t.onsuccess=()=>e(t.result),t.onerror=()=>e(null),t.onblocked=()=>e(null)}catch{e(null)}})}var Qm=e=>new Promise(t=>{e.onsuccess=()=>t(e.result),e.onerror=()=>t(null)});function $m(e){let t=e?.data;if(!t?.length)return`none`;let n=0;for(let e=0;e<64;e++)n+=t[Math.floor((e+.5)*t.length/64)];return`${e.W}x${e.H}@${e.cell}:${Math.round(n*100)}`}var eh=(e,t)=>`${e}|v2|${$m(t)}`;async function th(e){let t=await Zm();if(!t)return null;try{let n=await Qm(t.transaction(Ym).objectStore(Ym).get(e));return n&&await Qm(t.transaction(Xm,`readwrite`).objectStore(Xm).put(Date.now(),e)),n??null}catch{return null}finally{t.close?.()}}async function nh(e,t){let n=await Zm();if(!n)return!1;try{let r={out:t.out,blocks:t.blocks.map(e=>({bx:e.bx,by:e.by,ox:e.ox,oy:e.oy,w:e.w,h:e.h,ratio:e.ratio,mean:e.mean}))};await Qm(n.transaction(Ym,`readwrite`).objectStore(Ym).put(r,e));let i=n.transaction(Xm,`readwrite`).objectStore(Xm);await Qm(i.put(Date.now(),e));let a=await Qm(i.getAllKeys())??[],o=await Qm(n.transaction(Xm).objectStore(Xm).getAll())??[];if(a.length>8){let e=a.map((e,t)=>[e,o[t]??0]).sort((e,t)=>e[1]-t[1]).slice(0,a.length-8).map(e=>e[0]),t=n.transaction([Ym,Xm],`readwrite`);for(let n of e)t.objectStore(Ym).delete(n),t.objectStore(Xm).delete(n)}return!0}catch{return!1}finally{n.close?.()}}var rh={tipM:6,frac:.09,nextFrac:.055,nextAlpha:.45};function ih(e){let t=document.createElement(`canvas`);t.width=128,t.height=256;let n=t.getContext(`2d`),r=e===`finish`?[255,255,255]:[255,210,58];n.lineJoin=`miter`;for(let[e,t,i,a,o]of[[30,30,12,.35,120],[40,38,16,.65,178],[52,48,22,1,248]]){let s=o-t,c=()=>{n.beginPath(),n.moveTo(64-e,s),n.lineTo(64-e+i,s),n.lineTo(64,o-i*1.3),n.lineTo(64+e-i,s),n.lineTo(64+e,s),n.lineTo(64,o),n.closePath()};c(),n.lineWidth=5,n.strokeStyle=`rgba(10,20,30,${.8*a})`,n.stroke(),c(),n.fillStyle=`rgba(${r[0]},${r[1]},${r[2]},${a})`,n.fill()}if(e===`port`||e===`starboard`){let t=e===`port`?1:-1,r=()=>{n.beginPath(),n.moveTo(64-30*t,40),n.lineTo(64+26*t,40),n.moveTo(64+26*t,40),n.lineTo(64+10*t,24),n.moveTo(64+26*t,40),n.lineTo(64+10*t,56)};n.lineCap=`round`,n.lineJoin=`round`,r(),n.strokeStyle=`rgba(10,20,30,0.9)`,n.lineWidth=22,n.stroke(),r(),n.strokeStyle=`#ffffff`,n.lineWidth=12,n.stroke()}else if(e===`finish`)for(let e=0;e<4;e++)for(let t=0;t<2;t++)n.fillStyle=(e+t)%2?`#111`:`#fff`,n.fillRect(32+e*16,22+t*16,16,16);let i=new Qe(t);return i.colorSpace=ee,i.anisotropy=4,i}var ah=class{constructor(e){this.tex={},this.sprites=[0,1].map(()=>{let t=new T({transparent:!0,depthTest:!1,depthWrite:!1,sizeAttenuation:!1,fog:!1,toneMapped:!1}),n=new We(t);return n.center.set(.5,0),n.renderOrder=1e3,n.visible=!1,n.frustumCulled=!1,e.add(n),n})}texOf(e){return this.tex[e]??=ih(e)}update(e,t,n){let r=e&&t?e.seq.slice(t.i,t.i+2):[],i=2*Math.tan((n?.fov??60)*Math.PI/360);this.sprites.forEach((e,t)=>{let n=r[t];if(e.visible=!!n,!n)return;let a=n.mark,o=a.finish?`finish`:n.buoys||!a.round?`gate`:a.round===`port`?`port`:`starboard`;e.material.map!==this.texOf(o)&&(e.material.map=this.texOf(o),e.material.needsUpdate=!0);let s=(t===0?rh.frac:rh.nextFrac)*i;e.scale.set(s*.5,s,1),e.material.opacity=t===0?1:rh.nextAlpha,e.position.set(a.e,rh.tipM,-a.n)})}hide(){for(let e of this.sprites)e.visible=!1}},oh=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},sh=`
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
}`;function ch(e,t,n,r){let i=Math.imul(e|0,668265261)^Math.imul(t|0,374761393)^Math.imul(n|0,2654435761)^Math.imul(r|0,2246822519);return i^=i>>>15,i=Math.imul(i,739982445),i^=i>>>12,i=Math.imul(i,695872825),i^=i>>>15,(i>>>0)/4294967296}var lh=class{constructor(e,t,n,r,i,a,o,s=null,c=null,l=null){this.memo=l,this.m=e,this.cx=n,this.cy=r,this.P=a,this.R=i,this.out=[],this.bursts=[],this.sites=0,this.done=!1,this.G=[],this.hostOf=s,this.bySite=s?new Map:null,this.E=c,this.wind=o??{toE:0,toN:1,ms:0},this.groups=(t.fft?.peakGroups?.()??[]).map((t,o)=>{let s=t.k,c=t.omega/s,l=2*Math.PI/s,u=t.dx*r-t.dy*n,d=t.dx*n+t.dy*r-c*e*a.slot;return{gi:o,name:t.name,k:s,c,lam:l,dx:t.dx,dy:t.dy,ac:u,ad:d,j0:Math.floor((u-i)/a.stretch),j1:Math.ceil((u+i)/a.stretch),i0:Math.floor((d-i)/l),i1:Math.ceil((d+i)/l)}}),this.g=0,this.i=this.groups[0]?.i0??0,this.j=this.groups[0]?.j0??0,this.groups.length||(this.done=!0)}step(e,t=1/0){let n=this.P,r=this.m,i=this.R*this.R;for(this.G;!this.done&&t>0;){let a=this.groups[this.g],{gi:o,k:s,c,lam:l,dx:u,dy:d}=a,f=this.i,p=this.j;++this.j>a.j1&&(this.j=a.j0,++this.i>a.i1&&(++this.g>=this.groups.length?this.done=!0:(this.i=this.groups[this.g].i0,this.j=this.groups[this.g].j0)));let m=(p+.5+.6*(ch(o,f,p,r*7+1)-.5))*n.stretch,h=(f+ch(o,f,p,r*7+2))*l;if((m-a.ac)**2+(h-a.ad)**2>i||(t--,this.sites++,n.groupsOff?.[a.name]))continue;let g=this._wave(a,f,p,r,m,h,e);if(!g)continue;let{tb:_,be:v,bn:y,steep:b,chance:x,face:S}=g,C={a:g.wa},w=(o*1024+(f&1023))*1024+(p&1023);if(this.hostOf&&x>0){let e=this.E.restartSlots,t=r-((r+Math.floor(e*ch(o+40,f,p,0)))%e+e)%e,i=this.hostOf(w,r,t),a=i?(v-i.e)*i.dx+(y-i.n)*i.dy:0;if(i&&i.E<i.cap&&Math.abs(a-i.c*(_-i.tb))<.25*l){i.abs.push({a:_-i.tb,q:x,m:r,x0:a}),i.E+=x,i.EJ+=Et(x,C.a*s,c,n),ch(o+8,f,p,r*5+3)<x*Math.min(1,(i.v?.spray??1)*wt(2*C.a,b,q))&&this._burst(o,f,p,_,v,y,u,d,c,2*C.a,b);continue}}if(ch(o,f,p,r*7+4)>=x)continue;let T=2*C.a,E=ch(o,f,p,r*7+5),D=yt(e=>ch(o+32+e,f,p,r*7)),O=this._local(a,v,y,_,g.theta,e),k={id:(Math.imul(r,4)+o)*1048576+(f&1023)*1024+(p&1023),g:o,tb:_,e:v,n:y,dx:O.dx,dy:O.dy,c:O.c,T:2*Math.PI/(O.c*O.k),Hb:T,p:b,rnd:E,v:D,seedA:ch(o,f,p,r*7+6),seedB:ch(o,f,p,r*7+7),face:S,back:oh(n.faceBack-.05,n.faceBack+.05,S)*S*(1-(n.faceBackTo??.5))/O.k};if(this.bySite){let e=this.E;Object.assign(k,{m:r,abs:[],E:1,EJ:Et(1,C.a*s,c,n),cap:e.cap[0]+(e.cap[1]-e.cap[0])*ch(o+41,f,p,r)}),this.bySite.set(w,k)}if(n.aheadSlots>0&&(v-this.cx)**2+(y-this.cy)**2<(n.aheadR??1e9)**2){let t=this._nextBirth(a,f,p,r,k,e);k.ride=Number.isFinite(t)?Math.max(n.ride,t-_+n.rideLap):n.ride}this.out.push(k),this._sprays(e,o,f,p,_,v,y,O.dx,O.dy,O.c,O.k,T,b,E,D)}return this.done}_wave(e,t,n,r,i,a,o){let s=this.memo?`${e.gi},${t},${n},${r}`:null;if(s&&this.memo.has(s)){let e=this.memo.get(s).r;return this.memo.delete(s),e}return this._wave1(e,t,n,r,i,a,o)}_waveAhead(e,t,n,r,i,a,o){let s=this.memo?`${e.gi},${t},${n},${r}`:null;if(s&&this.memo.has(s))return this.memo.get(s).r;let c=this._wave1(e,t,n,r,i,a,o);return s&&this.memo.set(s,{m:r,r:c}),c}_wave1(e,t,n,r,i,a,o){let s=this.P,c=this.G,{gi:l,k:u,c:d,dx:f,dy:p}=e,m=s.faceTheta+(s.faceSpread??0)*((ch(l+50,t,n,r)+ch(l+51,t,n,r)+ch(l+52,t,n,r))*(2/3)-1),h=(r+.999*ch(l,t,n,r*7+3))*s.slot,g=a+d*h,_=-p*i+f*g,v=f*i+p*g;o.spillGroupsAt(_,v,h,c,l);let y=c[l];if(!y||!(y.a>0)||gt(y.a*u).steep<.002)return null;let b=e=>Math.atan2(Math.sin(e),Math.cos(e)),x=_,S=v,C=y.theta;for(let e=0;e<6;e++){let t=b(m-C);if(Math.abs(t)<.02)break;let n=f,r=p,i=u;if(e>=2){o.spillGroupsAt(x+.5,S,h,c,l);let e=c[l].theta;o.spillGroupsAt(x,S+.5,h,c,l);let t=c[l].theta,a=b(e-C)/.5,s=b(t-C)/.5,d=Math.hypot(a,s);d>.3*u&&d<3*u&&(n=a/d,r=s/d,i=d)}x+=n*t/i,S+=r*t/i,o.spillGroupsAt(x,S,h,c,l),y=c[l],C=y.theta}if(Math.abs(b(m-C))>.15)return null;let w=y.a,T=gt(w*u).steep;if(T<.002)return null;if(s.gate!==!1&&this.groups.length>1){o.spillGroupsAt(x,S,h,c);let e=0,t=0,n=0;for(let r=0;r<c.n;r++)e+=c[r].h,t+=c[r].a*Math.sin(c[r].theta),n+=c[r].a;let r=Math.atan2(t,e);if(!(e>(s.gateH??.2)*n&&r>-(s.gateBack??.3)&&r<(s.gateFront??1.4)))return null}let E=x-f*d*h,D=S-p*d*h,O=Jt(T*J(-E*p+D*f,E*f+D*p)*It(i,t,h),s);return{tb:h,be:x,bn:S,wa:w,steep:T,chance:O,face:m,theta:C}}_local(e,t,n,r,i,a){let o=this.G,s=.5,c=e=>Math.atan2(Math.sin(e),Math.cos(e)),l={dx:e.dx,dy:e.dy,k:e.k,c:e.c},u=this.P.localWay??2;if(!Number.isFinite(i)||u<1)return l;a.spillGroupsAt(t+s,n,r,o,e.gi);let d=o[e.gi].theta;a.spillGroupsAt(t,n+s,r,o,e.gi);let f=o[e.gi].theta,p=c(d-i)/s,m=c(f-i)/s,h=Math.hypot(p,m);if(!(h>.6*e.k&&h<1.6*e.k))return l;let g=p/h,_=m/h;if(g*e.dx+_*e.dy<.5)return l;if(u<2)return{dx:g,dy:_,k:e.k,c:e.c};let v=.02;a.spillGroupsAt(t,n,r+v,o,e.gi);let y=-c(o[e.gi].theta-i)/v/h;return{dx:g,dy:_,k:h,c:y>.7*e.c&&y<1.3*e.c?y:e.c}}_nextBirth(e,t,n,r,i,a){let o=this.P,s=this.E,{gi:c,c:l,lam:u}=e,d=i.E??1;for(let l=1;l<=o.aheadSlots;l++){let f=r+l,p=(n+.5+.6*(ch(c,t,n,f*7+1)-.5))*o.stretch,m=(t+ch(c,t,n,f*7+2))*u,h=this._waveAhead(e,t,n,f,p,m,a);if(h&&h.chance>0){if(s){let e=s.restartSlots,a=f-((f+Math.floor(e*ch(c+40,t,n,0)))%e+e)%e,o=(h.be-i.e)*i.dx+(h.bn-i.n)*i.dy;if(l<=s.absorbSlots&&r>=a&&d<i.cap&&Math.abs(o-i.c*(h.tb-i.tb))<.25*u){d+=h.chance;continue}}if(ch(c,t,n,f*7+4)<h.chance)return h.tb}}return 1/0}_burst(e,t,n,r,i,a,o,s,c,l,u){let d=q,f=this.wind,p=d.windK*f.ms,m=Math.min(1,Math.max(0,(l-d.hMin)/(d.hFull-d.hMin))),h=vt(l,u);this.bursts.push({tb:r+.04,e:i,n:a,z:null,up:d.crown*h,dx:o,dy:s,base:d.base/this.P.speed*_t(.04,c,this.P),jet:d.jet[0]+(d.jet[1]-d.jet[0])*m,el:d.el,wE:p*f.toE,wN:p*f.toN,seed:ch(e+9,t,n,this.m),amount:.6+.4*ch(e+10,t,n,this.m),size:1})}_sprays(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m){let h=q,g=this.P,_=this.wind,v=h.windK*_.ms,y=v*_.toE,b=v*_.toN,x=m?.spray??1;Math.min(1,Math.max(0,(d-h.hMin)/(h.hFull-h.hMin))),vt(d,f),ch(t+8,n,r,this.m)<Math.min(1,x*wt(d,f,h))&&this._burst(t,n,r,i,a,o,s,c,l,d,f);let S=x*Tt(_.ms,h);if(S>0)for(let e=0;e<8;e++){let _=(e+ch(t+11,n,r,this.m*8+e))/S;if(_>h.shedAge)break;let v=Kt(_,d,f,p,2*Math.PI/(l*u),g,void 0,m);if(!v.alive)break;let x=kt(_,l,0,g),C=a+s*x,w=o+c*x;this.bursts.push({tb:i+_,e:C,n:w,z:null,up:h.crown*(v.zc+v.Rz),dx:s,dy:c,base:h.base/g.speed*_t(_,l,g),jet:h.shedJet,el:h.shedEl,wE:y,wN:b,seed:ch(t+12,n,r,this.m*8+e),amount:.3+.3*ch(t+13,n,r,this.m*8+e),size:.8})}}},uh=class{constructor({reach:e=100,keep:t=480,aheadFrames:n=10,P:r=G,events:i=!1}={}){this.reach=e,this.keepN=t,this.aheadFrames=n,this.P=r,this.events=i?i===!0?1:i:0,this.E=this.events?W(this.events):null,this.hostOf=this.events?(e,t,n)=>{for(let r=1;r<=this.E.absorbSlots&&t-r>=n;r++){let n=this.slots.get(t-r)?.bySite?.get(e);if(n)return n}return null}:null,this.slots=new Map,this.memo=new Map,this.ahead=null,this.live=[],this.nLive=0,this.bursts=[],this.nBursts=0,this.wind={toE:0,toN:1,ms:0},this._G=[],this.stats={births:0,sites:0,ms:0,slotsMade:0,syncSlots:0}}clear(){this.slots.clear(),this.memo.clear(),this.ahead=null,this.nLive=0}_keep(e,t){this.slots.set(e,{cx:t.cx,cy:t.cy,births:t.out,bursts:t.bursts,bySite:t.bySite}),this.stats.sites+=t.sites,this.stats.births+=t.out.length,this.stats.slotsMade++}_remake(e){for(let t of[...this.slots.keys()])t>e&&this.slots.delete(t);this.ahead&&this.ahead.m>e&&(this.ahead=null),this._unabsorb(e)}_unabsorb(e){if(this.events)for(let t=e-this.E.absorbSlots;t<e;t++)for(let n of this.slots.get(t)?.births??[]){let t=n.abs.filter(t=>t.m<e);t.length!==n.abs.length&&(n.abs=t,n.E=1+t.reduce((e,t)=>e+t.q,0))}}update(e,t,n,r,i=[0,0],a=null){let o=this.P,s=performance.now();if(a&&(this.wind=a),!t?.spillGroupsAt)return this.nLive=0,this.live;let c=this.E??W(0),l=this.events?(c.absorbSlots+1)*o.slot:0,u=Math.floor(e/o.slot),d=Math.floor((e-o.life-l)/o.slot),f=this.events?d-c.restartSlots-c.absorbSlots:d;for(let e=f;e<=u;e++){let i=this.slots.get(e),a=i&&(i.cx-n)**2+(i.cy-r)**2>1600&&e>=u-1;if(i&&!a)continue;if((a||this.events&&!i&&[...this.slots.keys()].some(t=>t>e))&&this._remake(e),this.ahead?.m===e&&!a){this.ahead.step(t),this._keep(e,this.ahead),this.ahead=null;continue}let s=new lh(e,t,n,r,this.reach,o,this.wind,this.hostOf,this.E,this.memo);s.step(t),this._keep(e,s),this.stats.syncSlots++}let p=u+1;if(!this.slots.has(p)){(!this.ahead||this.ahead.m!==p)&&(this.ahead&&this._unabsorb(this.ahead.m),this.ahead=new lh(p,t,n,r,this.reach,o,this.wind,this.hostOf,this.E,this.memo));let e=this.ahead.groups.reduce((e,t)=>e+(t.i1-t.i0+1)*(t.j1-t.j0+1),0);this.ahead.step(t,Math.ceil(.8*e/this.aheadFrames))&&(this._keep(p,this.ahead),this.ahead=null)}if(this.memo.size>4e3)for(let[e,t]of this.memo)t.m<=u&&this.memo.delete(e);for(;this.slots.size>this.keepN;){let e=1/0;for(let t of this.slots.keys())t<e&&(e=t);this.slots.delete(e)}let m=this.live,h=0;for(let t=d;t<=u;t++){let a=this.slots.get(t);if(a)for(let t of a.births){let a=e-t.tb;if(a<0||a>o.life+l)continue;let s=Kt(a,t.Hb,t.p,t.rnd,t.T,o,void 0,t.v,t.abs,this.events===2?t:null);if(!s.alive)continue;let c=kt(a,t.c,0,o,this.events===2?o.ride:Math.max(t.ride??o.ride,Ot(t.abs,a,o)))+s.off,u=m[h]??={};u.b=t,u.age=a,u.e=t.e+t.dx*c+i[0]*a,u.n=t.n+t.dy*c+i[1]*a;let d=s.Rd;if(t.back){let e=o.spillS>0?oh(0,o.spillS,a):1,n=-t.back,r=n+(t.back+d)*e,i=.5*(n+r);d=Math.max(.5*(r-n),.25*s.Rd),u.e+=t.dx*i,u.n+=t.dy*i}u.Ra=s.Ra,u.Rd=d,u.Rz=s.Rz,u.zc=s.zc,u.rho=s.rho,u.deposit=s.deposit,u.r2=(u.e-n)**2+(u.n-r)**2,h++}}this.nLive=h;let g=m.slice(0,h).sort((e,t)=>e.r2-t.r2);for(let e=0;e<h;e++)m[e]=g[e];let _=this.bursts,v=0;for(let i=Math.floor((e-q.life-q.shedAge)/o.slot)-1;i<=u;i++){let a=this.slots.get(i);if(a)for(let i of a.bursts){let a=e-i.tb;if(a<0||a>q.life)continue;if(i.z==null){t.spillGroupsAt(i.e,i.n,i.tb,this._G);let e=0;for(let t=0;t<this._G.n;t++)e+=this._G[t].h;i.z=e+i.up}let o=_[v++]??={};Object.assign(o,i),o.age=a,o.r2=(i.e-n)**2+(i.n-r)**2}}this.nBursts=v;let y=_.slice(0,v).sort((e,t)=>e.r2-t.r2);for(let e=0;e<v;e++)_[e]=y[e];return this.stats.ms=performance.now()-s,m}},dh={kA:25,kP:5.5,chargeS:.15,drift:.03,convPerMs:.004,wakeTp:3,breakDx:1},fh=`float coverOf(float F) { float z = (F - ${zt.mid.toFixed(3)}) / ${zt.sd.toFixed(3)}; return 1.0 / (1.0 + exp(-1.5976 * z * (1.0 + 0.04417 * z * z))); }`,ph=`
precision highp float;
${Hn}
${On}
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
Wave w = waveEval(p, uTime, ${dh.breakDx.toFixed(2)}, ff, dmp);
float b = breakProb(w, p);
float hb = clamp(2.0 * max(w.h, 0.0) + 0.25 * uHsRef, 0.05, 3.0), tpB = clamp(uTauP05 * pow(hb / 0.5, 0.7), 0.5, 10.0);
charge(V, Tp, (1.0 - V) * clamp(b * uDt / ${dh.chargeS.toFixed(2)}, 0.0, 1.0), tpB);
float supply = ${dh.kA.toFixed(1)} * b;
float wk = wakeStamp(p, uSkiPos, uSkiFwd, uSkiSpeed);
for (int i = 0; i < 6; i++) { if (i >= uSkiN) break; vec2 d = p - uSki[i].xy; if (dot(d, d) < 2500.0) wk += wakeStamp(p, uSki[i].xy, uSki[i].zw, uSkiU[i]); }
float wkr = clamp(wk * uWakeRate * uDt, 0.0, 1.0);
charge(V, Tp, (1.0 - V) * wkr * 0.25, ${dh.wakeTp.toFixed(1)});
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
supply += ${dh.kP.toFixed(1)} * V;
float Fn = (F + supply * uDt) / (1.0 + (supply + 1.0 / uTauF) * uDt);
L += (1.0 - L) * clamp(uLaceYield * Fn / uTauF * uDt, 0.0, 1.0);
L *= exp(-uDt / uTauL);
gl_FragColor = vec4(clamp(Fn, 0.0, 1.0), clamp(V, 0.0, 1.0), clamp(Tp / 10.0, 0.0, 1.0), clamp(L, 0.0, 1.0));
}`,mh=.6,hh=.5,gh=e=>`
precision highp float;
${Hn}
${On}
${xn}
${e?sh:``}
uniform sampler2D uPrev;
uniform vec2 uOrigin, uOldOrigin, uDrift;
uniform float uExtent, uDt, uTauF;
varying vec2 vUv;
void main() {
vec2 p = uOrigin + vUv * uExtent;
vec2 po = (p - uDrift * uDt - uOldOrigin) / uExtent;
vec4 prev = (po.x >= 0.0 && po.y >= 0.0 && po.x <= 1.0 && po.y <= 1.0) ? texture2D(uPrev, po) : vec4(0.0);
float F = prev.r, V = prev.g * exp(-uDt / ${Bt.tp.toFixed(2)});
float dmp = smoothstep(0.3, 4.0, depthAt(p)); vec3 ff = fetchAt(p);
float b = spillEval(p, uTime, ff, dmp).x;
${e?`{ float dep = puffDeposit(p); if (dep >= 0.0) b = max(b * ${mh.toFixed(2)}, clamp(${hh.toFixed(2)} * dep, 0.0, 1.0)); }`:``}
V += (1.0 - V) * clamp(b * uDt / ${dh.chargeS.toFixed(2)}, 0.0, 1.0);
float supply = ${dh.kA.toFixed(1)} * b + ${dh.kP.toFixed(1)} * V;
float Fn = (F + supply * uDt) / (1.0 + (supply + 1.0 / uTauF) * uDt);
gl_FragColor = vec4(clamp(Fn, 0.0, 1.0), clamp(V, 0.0, 1.0), 0.0, 0.0);
}`,_h=64,vh=`
precision highp float;
${Hn}
${On}
${fh}
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
Wave w = waveEval(p, uTime, ${dh.breakDx.toFixed(2)}, ff, dmp);
float det; waveSlopeMain(w, det);
float sig = sqrt(w.dvar + 0.0016);
float cov = 0.0, use = step(8.0, dot(p - uSkiPos, uSkiFwd));
for (int i = 0; i < 6; i++) { if (i >= uSkiN) break; use *= 1.0 - inWake(p, uSki[i].xy, uSki[i].zw); }
vec2 step1 = vec2(uTexel / uExtent);
for (int j = 0; j < 6; j++) for (int i = 0; i < 6; i++) cov += coverOf(texture2D(uFoam, vUv + (vec2(float(i), float(j)) - 2.5) * step1).r);
gl_FragColor = vec4(clamp(det * 0.5, 0.0, 1.0), clamp(sig * 4.0, 0.0, 1.0), cov / 36.0 * use, use);
}`,yh=class{constructor(e,t,{size:n=384,extent:i=192,wakeRate:a=3.2}={}){this.renderer=e,this.water=t,this.size=n,this.extent=i,this.texel=i/n,this.wakeRate=a,this.last=null,this.on=!0;let o=()=>new De(n,n,{type:mt,format:S,minFilter:Be,magFilter:Be,depthBuffer:!1,stencilBuffer:!1});this.rt=[o(),o()],this.cur=0,this.sp={rt:[o(),o()],cur:0};let s=t.uniforms;this.uniforms=Object.fromEntries(jn.map(e=>[e,s[e]])),Object.assign(this.uniforms,{uPrev:{value:null},uOrigin:{value:new U},uOldOrigin:{value:new U},uDrift:{value:new U},uSkiPos:{value:new U},uSkiFwd:{value:new U(0,1)},uExtent:{value:i},uDt:{value:0},uWindDir:{value:new U(0,1)},uWindMs:{value:0},uTauP05:{value:3},uTauF:{value:.6},uTauL:{value:40},uLaceYield:{value:.03},uConv:{value:0},uSkiN:{value:0},uSprayN:{value:0},uSpray:{value:Array.from({length:48},()=>new Ce)},uSki:{value:Array.from({length:6},()=>new Ce)},uSkiU:{value:new Float32Array(6)},uTexel:{value:this.texel},uWakeRate:{value:a},uSkiSpeed:{value:0},uSplash:{value:0}}),this.material=new k({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:ph,uniforms:this.uniforms,depthTest:!1,depthWrite:!1}),this.quad=new he(new M(2,2),this.material),this.quad.frustumCulled=!1,this.scene=new w,this.scene.add(this.quad),this.camera=new r(-1,1,1,-1,0,1),this.spillU={...Object.fromEntries(jn.map(e=>[e,s[e]])),uPrev:{value:null},uOrigin:this.uniforms.uOrigin,uOldOrigin:this.uniforms.uOldOrigin,uDrift:this.uniforms.uDrift,uExtent:this.uniforms.uExtent,uDt:this.uniforms.uDt,uTauF:this.uniforms.uTauF},this.spillQuad=new he(new M(2,2),new k({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:gh(!1),uniforms:this.spillU,depthTest:!1,depthWrite:!1})),this.spillQuad.frustumCulled=!1,this.spillScene=new w,this.spillScene.add(this.spillQuad),this.statsRT=new De(_h,_h,{type:Xe,format:S,depthBuffer:!1,stencilBuffer:!1}),this.statsU={...Object.fromEntries(jn.map(e=>[e,s[e]])),uFoam:{value:null},uOrigin:this.uniforms.uOrigin,uSkiPos:this.uniforms.uSkiPos,uSkiFwd:this.uniforms.uSkiFwd,uExtent:this.uniforms.uExtent,uTexel:this.uniforms.uTexel,uSkiN:this.uniforms.uSkiN,uSki:this.uniforms.uSki},this.statsMat=new k({vertexShader:`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:vh,uniforms:this.statsU,depthTest:!1,depthWrite:!1}),this.statsQuad=new he(new M(2,2),this.statsMat),this.statsQuad.frustumCulled=!1,this.statsScene=new w,this.statsScene.add(this.statsQuad),this.statsBuf=new Uint8Array(16384),this.statsBusy=!1,this.statsT=-1e9,this.calib=new Wt,this.windMs=0,this.gustMs=0,this.waterType=Rt.ocean,this.state={target:0,measured:null,ratio:this.calib.ratio,eps:.55,gust:0,wa:0},this.origin=new U(1e9,1e9),this._publish()}_publish(){let e=this.water.uniforms;e.uSpillTex.value=this.sp.rt[this.sp.cur].texture,e.uFoamTex.value=this.rt[this.cur].texture,e.uFoamOrigin.value.copy(this.origin),e.uFoamExtent.value=this.extent,e.uFoamOn.value=+!!this.on}setEnabled(e){this.on=!!e,this._publish()}usePuffs(e){for(let t of[`uPuffTex`,`uPuffCells`,`uRollO`,`uRollE`,`uRollCell`])this.spillU[t]=e[t];let t=this.spillQuad.material;this.spillQuad.material=new k({vertexShader:t.vertexShader,fragmentShader:gh(!0),uniforms:this.spillU,depthTest:!1,depthWrite:!1}),t.dispose()}setSea({windMs:e=0,gustMs:t=0,gustCover:n=0,water:r=Rt.ocean}={}){this.windMs=e,this.gustMs=t,this.waterType=r;let i=Gt(r),a=this.uniforms;a.uTauP05.value=i.tauP05,a.uTauF.value=i.tauF,a.uTauL.value=i.tauL,a.uLaceYield.value=i.laceYield,a.uConv.value=dh.convPerMs*e;let o=t>e?Math.min(.95,Math.max(0,n)):0;this.state.target=((1-o)*bt(e)+o*bt(t))*(r._0x8318f9?2/3:1),this.state.ambient=bt(e)*(r._0x8318f9?2/3:1),this.calib.reset()}clear(){let e=this.renderer,t=e.getRenderTarget(),n=new Ve;e.getClearColor(n);let r=e.getClearAlpha();e.setClearColor(0,0);for(let t of[...this.rt,...this.sp.rt])e.setRenderTarget(t),e.clear(!0,!1,!1);e.setRenderTarget(t),e.setClearColor(n,r),this.last=null,this.calib.reset()}update(e,t,n=[0,0],r=[],i={toE:0,toN:1,ms:0}){if(!this.on)return;if(this.last==null||e<this.last||e-this.last>.6){this.clear(),this.last=e,this._origin(t);return}let a=Math.min(e-this.last,.1);if(this.last=e,a<=1e-5)return;let o=this.uniforms,s=this.rt[this.cur],c=this.rt[1-this.cur];o.uOldOrigin.value.copy(this.origin),this._origin(t),o.uOrigin.value.copy(this.origin),o.uPrev.value=s.texture,o.uDt.value=a;let l=dh.drift*i.ms;o.uDrift.value.set(n[0]+l*i.toE,n[1]+l*i.toN),o.uWindDir.value.set(i.toE,i.toN),o.uWindMs.value=i.ms;let u=Math.min(r.length,6);o.uSkiN.value=u;for(let e=0;e<u;e++)o.uSki.value[e].set(r[e].e,r[e].n,r[e].fe,r[e].fn),o.uSkiU.value[e]=r[e].u;let d=t.sprays??[],f=Math.min(d.length,48);o.uSprayN.value=f;for(let e=0;e<f;e++)o.uSpray.value[e].set(d[e].e,d[e].n,d[e].r,d[e].a);o.uSkiPos.value.set(t.e,t.n),o.uSkiFwd.value.set(t.fe,t.fn),o.uSkiSpeed.value=t.u,o.uSplash.value=t.splash??0;let p=this.water.uniforms.uHsRef?.value??.5,m=Math.min(1,Math.max(0,(p-.05)/.45));o.uWakeRate.value=this.wakeRate*m*m*(3-2*m);let h=this.renderer,g=h.getRenderTarget(),_=h.autoClear;h.autoClear=!1,h.setRenderTarget(c),h.render(this.scene,this.camera),this.cur=1-this.cur,this.water.uniforms.uSpillOn.value>.5&&(this.spillU.uPrev.value=this.sp.rt[this.sp.cur].texture,h.setRenderTarget(this.sp.rt[1-this.sp.cur]),h.render(this.spillScene,this.camera),this.sp.cur=1-this.sp.cur),e-this.statsT>.5&&!this.statsBusy&&(this.statsU.uFoam.value=this.rt[this.cur].texture,h.setRenderTarget(this.statsRT),h.render(this.statsScene,this.camera),this._readStats(e-(this.statsT>0?this.statsT:e-.5)),this.statsT=e),h.setRenderTarget(g),h.autoClear=_,this._publish()}_readStats(e){this.statsBusy=!0;let t=()=>{this.statsBusy=!1},n=this.renderer.readRenderTargetPixelsAsync?.(this.statsRT,0,0,_h,_h,this.statsBuf);if(n?.then)n.then(()=>{this._calibrate(e),t()},t);else try{this.renderer.readRenderTargetPixels(this.statsRT,0,0,_h,_h,this.statsBuf),this._calibrate(e)}finally{t()}}_calibrate(e){let t=this.statsBuf,n=4096,r=new Float32Array(n),i=new Float32Array(n),a=0,o=0,s=0,c=0;for(let e=0;e<n;e++)r[e]=t[4*e]/255*2,i[e]=t[4*e+1]/255/4,s+=r[e],c+=r[e]*r[e],t[4*e+3]>127&&(a+=t[4*e+2]/255,o++);let l=this.state,u=l.target;if(!(u>0)){this._setEps(0,0);return}l.measured=o>200?a/o:null,l.measured!=null&&(l.ratio=this.calib.step(l.measured,u,e)),l.wa=Math.min(.5,(l.ambient??u)/l.ratio);let d=Y(r,i,l.wa),f=Math.sqrt(Math.max(c/n-(s/n)**2,1e-6)),p=this.gustMs>this.windMs?Math.min(6,bt(this.gustMs)/Math.max(bt(this.windMs),1e-6)):1,m=p>1?f*(bh(Math.min(.4,l.wa*p))-bh(l.wa)):0;this._setEps(l.eps+(d-l.eps)*Math.min(1,e/1.5),m)}_setEps(e,t){let n=this.state;n.eps=e,n.gust=t;let r=this.water.uniforms;r.uBreakEps.value=e,r.uBreakGust.value=t,r.uFoamRatio.value=n.ratio}probe(){let e=this.size*this.size,t=new Uint16Array(e*4);this.renderer.readRenderTargetPixels(this.rt[this.cur],0,0,this.size,this.size,t);let n=o.fromHalfFloat,r={};return[`F`,`V`,`Tp`,`L`].forEach((i,a)=>{let o=0,s=[.01,.06,.3,.6,.9].map(()=>0);for(let r=0;r<e;r++){let e=n(t[4*r+a])*(a===2?10:1);o+=e,[.01,.06,.3,.6,.9].forEach((t,n)=>{e>(a===2?t*10:t)&&s[n]++})}r[i]={mean:+(o/e).toFixed(4),over:s.map(t=>+(t/e).toFixed(4))}}),r}_origin(e){let t=this.texel*8;this.origin.set(Math.floor((e.e-this.extent/2)/t)*t,Math.floor((e.n-this.extent/2)/t)*t)}};function bh(e){let t=e<.5?e:1-e,n=Math.sqrt(-2*Math.log(Math.max(t,1e-12))),r=n-(2.515517+.802853*n+.010328*n*n)/(1+1.432788*n+.189269*n*n+.001308*n*n*n);return e<.5?-r:r}var xh={drops:64,maxBursts:256,shutter:1/90,life:q.life,clump:[.01,.035],minPx:1,clumpPx:3,exposure:1,fadeIn:.12,near:25,far:45,gain:1.5},Sh=`
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
float t = T0.w - ${q.spreadS.toFixed(3)} * r6;
if (T1.w <= 0.0 || r5 > T3.x || t <= 0.0 || t > ${xh.life.toFixed(2)}) { gl_Position = vec4(0.0, 0.0, 2.0, 1.0); return; }
vec2 d = T1.xy; float yaw = (r1 - 0.5) * ${(2*q.coneYaw).toFixed(3)}, el = T2.z + (r2 - 0.5) * ${(2*q.coneEl).toFixed(3)};
vec2 hd = vec2(d.x * cos(yaw) - d.y * sin(yaw), d.x * sin(yaw) + d.y * cos(yaw));
float jet = T1.w * (0.45 + 0.65 * r3), tau = mix(${q.tau[0].toFixed(3)}, ${q.tau[1].toFixed(3)}, r4 * r4);
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
float size = clamp(uClumpPx * pix, mix(${q.size[0].toFixed(4)}, ${q.size[1].toFixed(4)}, r4), clump);
float w = max(size, uMinPx * pix), len = max(length(V.xy) * uShutter, w);
if (uRollDebug > 2.5) { w = 0.08; len = 0.08; size = w; }
vec2 ax = length(V.xy) > 1e-4 ? normalize(V.xy) : vec2(0.0, 1.0), pr = vec2(-ax.y, ax.x);
P.xy += ax * position.y * len + pr * position.x * w;
vUv = position.xy + 0.5; vWidth = w; vLen = len;
float cut = clamp(size / w, 0.0, 1.0), lit = clamp(uGain * size * size / (w * len), 0.0, 1.0);
vA = mix(cut, lit, uExposure) * lod * (0.55 + 0.4 * r3) * smoothstep(0.0, uFadeIn, t) * (1.0 - smoothstep(${(.75*xh.life).toFixed(2)}, ${xh.life.toFixed(2)}, t));
vGlint = step(0.82, h1(s + 9.1));
if (uRollDebug > 2.5) vA = 1.0;
gl_Position = projectionMatrix * P;
}`,Ch=`
uniform float uSunT, uSunOcc;
varying vec2 vUv;
varying float vA, vGlint, vWidth, vLen;
void main() {
vec2 q = vUv - 0.5; float r = 0.5 * max(vWidth / vLen, 0.0), ax = max(abs(q.y) - (0.5 - r), 0.0) / max(r, 1e-3);
float d = length(vec2(2.0 * q.x, ax)), a = vA * (1.0 - smoothstep(0.35, 1.0, d)); if (a < 0.004) discard;
vec3 col = vec3(0.86, 0.9, 0.95) + vGlint * uSunT * uSunOcc * 0.6;
gl_FragColor = vec4(min(col, vec3(1.0)) * a, a);
}`,wh=class{constructor(e,t,n){let r=xh,i=n.uniforms;this.tex=new ne(new Float32Array(r.maxBursts*4*4),r.maxBursts*4,1,S,I),this.tex.minFilter=this.tex.magFilter=se,this.tex.needsUpdate=!0,this.uniforms={uBurstTex:{value:this.tex},uRollS:t.uniforms.uRollS,uRollO:t.uniforms.uRollO,uRollE:t.uniforms.uRollE,uPix:{value:.001},uRollDebug:t.uniforms.uRollDebug,uSunT:i.uSunT,uSunOcc:i.uSunOcc,uShutter:{value:r.shutter},uMinPx:{value:r.minPx},uClumpPx:{value:r.clumpPx},uExposure:{value:r.exposure},uFadeIn:{value:r.fadeIn},uNear:{value:r.near},uFar:{value:r.far},uGain:{value:r.gain},uClump:{value:new U(...r.clump)},uCamV:{value:new $e}};let a=new b().copy(new M(1,1)),o=new Float32Array(r.maxBursts*r.drops*2);for(let e=0,t=0;e<r.maxBursts;e++)for(let n=0;n<r.drops;n++)o[t++]=e,o[t++]=n;a.setAttribute(`aDrop`,new de(o,2)),a.instanceCount=0,this.mat=new k({vertexShader:Sh,fragmentShader:Ch,uniforms:this.uniforms,transparent:!0,depthWrite:!1,side:2,blending:5,blendSrc:201,blendDst:205}),this.mesh=new he(a,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,e.add(this.mesh),this.n=0}set visible(e){this.mesh.visible=!!e}get visible(){return this.mesh.visible}update(e,t,n,r=!0,i=null,a=null,o=null){let s=xh,c=this.tex.image.data,l=(this.uniforms.uFar.value+5)**2,u=r?Math.min(e.nBursts,s.maxBursts):0;if(a!=null)for(;u>0&&e.bursts[u-1].r2>l;)u--;i&&this.uniforms.uCamV.value.copy(i);for(let n=0;n<u;n++){let r=e.bursts[n],i=n*16;c[i]=r.e-t.x,c[i+1]=r.n-t.y,c[i+2]=r.z,c[i+3]=r.age,c[i+4]=r.dx,c[i+5]=r.dy,c[i+6]=r.base,c[i+7]=r.jet,c[i+8]=r.wE,c[i+9]=r.wN,c[i+10]=r.el,c[i+11]=r.seed,c[i+12]=r.amount,c[i+13]=r.size,c[i+14]=0,c[i+15]=0}this.tex.needsUpdate=!0,this.n=u,this.mesh.geometry.instanceCount=u*s.drops,this.uniforms.uPix.value=n}dispose(){this.tex.dispose(),this.mesh.geometry.dispose(),this.mat.dispose(),this.mesh.removeFromParent()}},Th={cell:3,cells:53,tex:256,reach:[55,75],perCell:12,margin:1.4,sigma:14,erode:.35,erodeBase:.08,soft:.22,sink:.1,skin:.05,lumps:.45,tileL:1.6,drift:.1,fog:.04,fogTile:.6,fogSpeed:.5,steps:64,step:.1,maxPuffs:1024,minRho:[.06,.14]},Eh={start:.75,light:20,win:.3,settle:.6,fast:16.4,riseTau:.2,riseMin:.15,fallTau:.1,first:.75,firstHold:3,second:.5,secondHold:1.5,unusable:50,riseCheck:3,backoff:[4,60],deep:[[.42,1,2,75],[.35,1,2,75],[.3,1.25,2,75],[.25,1.5,2,75],[.25,2,3,65],[.25,2,0,55],[.22,2.5,0,45],[.2,3,0,35]]},Dh=.598,Oh=.0575,kh=64,Ah=32,jh=`
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
}`,Mh=`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,Nh=`precision highp float; uniform float uZ; varying vec2 vUv;
${jh}
void main() {
vec3 x = vec3(vUv, uZ);
float pl = clamp(0.5 + 0.9 * (gn(x * 4.0, 4.0) * 0.55 + gn(x * 8.0, 8.0) * 0.3 + gn(x * 16.0, 16.0) * 0.15), 0.0, 1.0);
float w1 = wn(x * 4.0, 4.0) * 0.625 + wn(x * 8.0, 8.0) * 0.25 + wn(x * 16.0, 16.0) * 0.125;
float pw = clamp((pl - (w1 - 1.0)) / (2.0 - w1), 0.0, 1.0);
float w2 = wn(x * 8.0, 8.0) * 0.625 + wn(x * 16.0, 16.0) * 0.25 + wn(x * 32.0, 32.0) * 0.125;
float w3 = wn(x * 16.0, 16.0) * 0.625 + wn(x * 32.0, 32.0) * 0.25 + wn(x * 64.0, 64.0) * 0.125;
gl_FragColor = vec4(pw, w2, w3, pl);
}`,Ph=`precision highp float; uniform float uZ; varying vec2 vUv;
${jh}
vec3 psi(vec3 x) { return vec3(gn(x * 2.0, 2.0) + 0.5 * gn(x * 4.0 + vec3(5.0, 0.0, 0.0), 4.0), gn(x * 2.0 + vec3(0.0, 7.0, 0.0), 2.0) + 0.5 * gn(x * 4.0 + vec3(0.0, 0.0, 9.0), 4.0), gn(x * 2.0 + vec3(0.0, 0.0, 11.0), 2.0) + 0.5 * gn(x * 4.0 + vec3(13.0, 0.0, 0.0), 4.0)); }
void main() {
vec3 x = vec3(vUv, uZ); float e = 1.0 / 64.0;
vec3 dx = (psi(x + vec3(e, 0.0, 0.0)) - psi(x - vec3(e, 0.0, 0.0))) / (2.0 * e), dy = (psi(x + vec3(0.0, e, 0.0)) - psi(x - vec3(0.0, e, 0.0))) / (2.0 * e), dz = (psi(x + vec3(0.0, 0.0, e)) - psi(x - vec3(0.0, 0.0, e))) / (2.0 * e);
vec3 v = vec3(dy.z - dz.y, dz.x - dx.z, dx.y - dy.x) / 9.0;
gl_FragColor = vec4(clamp(v * 0.5 + 0.5, 0.0, 1.0), 1.0);
}`,Fh=`precision highp float;
${Hn}
${On}
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
}`,Ih=e=>e.toFixed(3),Lh=`vec4 at(vec2 p) { return texture2D(uVol, clamp(p, vec2(0.5), uVolRes - 0.5) * uVolTexel); }`,Rh=`precision highp float; uniform sampler2D uVol; uniform vec2 uVolTexel, uVolRes; varying vec2 vUv;
${Lh}
void main() { vec2 p = vUv * uVolRes; gl_FragColor = 0.25 * (at(p + vec2(-0.5, -0.5)) + at(p + vec2(0.5, -0.5)) + at(p + vec2(-0.5, 0.5)) + at(p + vec2(0.5, 0.5))); }`,zh=`precision highp float; uniform sampler2D uVol; uniform highp sampler2D uSceneDepth; uniform vec2 uVolTexel, uVolRes; uniform mat4 uInvProj; uniform float uRevZ;
varying vec2 vUv;
${Lh}
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
}`,Bh=(e,t,n)=>{let r=Math.min(1,Math.max(0,(n-e)/(t-e)));return r*r*(3-2*r)},Vh=`
${sh}
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
}`,Hh=`
${Hn}
${On}
${sh}
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
vec4 PA[${Th.perCell}], PB[${Th.perCell}], PC[${Th.perCell}], PS[${Th.perCell}];
int NP = 0;
float styleErode(float s) { return mod(s, 256.0) / 64.0; }
float styleNoise(float s) { return mod(floor(s / 256.0), 256.0) / 64.0; }
float styleWaist(float s) { return floor(s / 65536.0) / 64.0; }
void loadPuffs(vec3 ro, vec3 inv, inout float tn, inout float tf) {
ivec2 c = ivec2(floor(vCell + 0.5));
float t0 = 1e9, t1 = -1e9, hiW = vBmax.y - cellTexel(c, 3).x - 0.25;
for (int k = 0; k < ${Th.perCell}; k++) {
float id = cellId(c, k); if (id < -0.5) continue;
int i = int(id + 0.5); vec4 A = puffTexel(i, 0), B = puffTexel(i, 1), S = puffTexel(i, 3);
float ra = B.z * (1.0 + 0.5 * abs(S.y)), rd = B.w * length(vec2(1.0 + 0.5 * abs(S.z), S.w));
vec2 m = A.xy + uRollO, h = sqrt(ra * ra * B.yx * B.yx + rd * rd * B.xy * B.xy) + ${Ih(Th.margin)};
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
float g = (1.0 + ${Ih(G.grow)} * (1.0 - exp(-C.y / ${Ih(G.tauG)}))) * nk;
vec3 Y = X / g + vec3(C.z, C.w, C.z + C.w) * ${Ih(Th.tileL)} + vec3(0.0, 0.0, -${Ih(Th.drift)} * C.y);
vec4 N = texture(uRollNoise, Y / vec3(${Ih(Th.tileL)}, ${Ih(Th.tileL)}, ${Ih(.7*Th.tileL)}));
return (N.r * 0.62 + N.g * 0.26 + N.b * 0.12 - ${Dh.toFixed(4)}) / ${Oh.toFixed(4)};
}
float densAt(vec3 p, bool fine, out float B, out float core, out float age, out float hz) {
vec2 en = vec2(p.x, -p.z), uv = (en - uRollO) / uRollE;
vec3 W = texture2D(uRollS, uv).xyz;
float z = p.y - W.x;
B = 0.0; core = 0.0; age = 0.0; hz = 0.0;
if (z < -0.05 - uRollSink) return 0.0;
vec2 s = en + W.yz - uRollO;
float w1 = 0.0, zs = 0.0, ww = 0.0, erw = 0.0, agw = 0.0, hzw = 0.0; int k1 = 0; vec3 X1 = vec3(0.0);
for (int k = 0; k < ${Th.perCell}; k++) {
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
float lo0 = ${Ih(Th.erodeBase+.5*Th.erode)};
if (!fine) return smoothstep(lo0, lo0 + ${Ih(Th.soft)}, B) * min(B, 1.0) * smoothstep(-0.05 - uRollSink, 0.02 - uRollSink, z);
float n = clamp(0.5 + 0.25 * zs / sqrt(max(ww, 1e-8)), 0.0, 1.0);
float Bn = B * (${Ih(1-Th.lumps)} + ${Ih(2*Th.lumps)} * n);
float lo = ${Ih(Th.erodeBase)} + ${Ih(Th.erode)} * (erw / B) * (1.0 - n);
core = smoothstep(lo, lo + uRollSoft, Bn);
float grain = texture(uRollNoise, X1 / ${Ih(Th.fogTile)} + vec3(0.0, 0.0, uTime * ${Ih(Th.fogSpeed)}) + PC[k1].zwz).g;
float fog = smoothstep(0.5 * ${Ih(Th.erodeBase)}, lo, Bn) * (1.0 - core) * (0.3 + 0.7 * grain);
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
float step0 = uRollStepK * ${Ih(Th.step)} * exp2(floor(log2(max(1.0, tBox / 12.0)))), j = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
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
if (uRollLight > 0.5 && lightN++ % int(uRollLight) == 0) tauS = ${Ih(Th.sigma)} * (0.25 * densAt(p + sun * 0.15) + 0.7 * densAt(p + sun * 0.7));
else if (uRollLight < 0.5) tauS = ${Ih(Th.sigma)} * 0.5 * (1.0 - smoothstep(-0.3, 1.0, hz)) * min(B, 1.0);
float Ts = 0.45 * exp(-tauS) + 0.33 * exp(-0.25 * tauS) + 0.22 * exp(-0.06 * tauS);
float amb = mix(0.8, 1.0, smoothstep(-0.3, 1.0, hz)) * (1.0 - 0.15 * smoothstep(0.5, 3.0, age));
vec3 col = vec3(0.95, 0.965, 0.98) * (0.58 * amb * vec3(0.93, 0.96, 1.0) + sunK * Ts * vec3(1.0, 0.98, 0.95));
float a = 1.0 - exp(-${Ih(Th.sigma)} * d * dt);
C += Tr * a * col; Tr *= 1.0 - a; t += dt;
}
if (Tr > 0.995) discard;
gl_FragColor = vec4(min(C, vec3(1.0)), 1.0 - Tr);
}`,Uh=class{constructor(e,t,n,{vol:i=1,steps:a=Th.steps,debug:o=0,events:s=!1,pass:c=!0,scale:l=null,light:u=2,fine:d=1,stepK:f=1,fog:p=null,soft:m=null,bilat:h=!0,puff:g=null,sink:_=null,skin:v=null}={}){let y=Th,x=n.uniforms;this.renderer=e,this.extent=y.cell*y.cells,this.vol=i,this.rtS=new De(y.tex,y.tex,{type:mt,format:S,minFilter:Be,magFilter:Be,depthBuffer:!1,stencilBuffer:!1}),this.puffs=new uh({events:s,P:{...G,...g??{}}});let C=(e,t)=>{let n=new ne(new Float32Array(e*t*4),e,t,S,I);return n.minFilter=n.magFilter=se,n.needsUpdate=!0,n};this.puffTex=C(160,Math.ceil(y.maxPuffs/32)),this.cellTex=C(y.cells*5,y.cells),this.cellN=new Int32Array(y.cells*y.cells),this.cellScore=new Float32Array(y.cells*y.cells*y.perCell);let T=Object.fromEntries(jn.map(e=>[e,x[e]]));this.uniforms={...T,uSunDir:x.uSunDir,uSunT:x.uSunT,uSunOcc:x.uSunOcc,uRollO:{value:new U},uRollE:{value:this.extent},uRollTx:{value:this.extent/y.tex},uRollCell:{value:y.cell},uRollR:{value:y.reach[1]},uRollS:{value:this.rtS.texture},uPuffTex:{value:this.puffTex},uPuffCells:{value:this.cellTex},uRollReach:{value:new U(...y.reach)},uRollSteps:{value:a},uRollNoise:{value:null},uRollFlow:{value:null},uRollDebug:{value:o},uSceneDepth:{value:null},uVolRes:{value:new U(1,1)},uInvProj:{value:new Oe},uRevZ:{value:0},uRollLight:{value:u},uRollFine:{value:d},uRollStepK:{value:f},uRollFog:{value:p??Th.fog},uRollSoft:{value:m??Th.soft},uRollSink:{value:c?_??Th.sink:0},uRollSkin:{value:v??Th.skin}},this.steps=a,this.base={stepK:f,light:u},this.bilat=!!h,this.sprayOn=!0,this.surfMat=new k({vertexShader:Mh,fragmentShader:Fh,uniforms:this.uniforms,depthTest:!1,depthWrite:!1}),this.quad=new he(new M(2,2),this.surfMat),this.quad.frustumCulled=!1,this.qScene=new w,this.qScene.add(this.quad),this.qCam=new r(-1,1,1,-1,0,1),this._makeNoise();let E=y.cells,D=(E-1)/2,O=[];for(let e=0;e<E;e++)for(let t=0;t<E;t++){let n=Math.hypot(t-D,e-D)*y.cell;n<=y.reach[1]+y.cell&&O.push([t,e,n])}O.sort((e,t)=>t[2]-e[2]);let A=new b().copy(new Re(1,1,1));if(A.setAttribute(`aCell`,new de(new Float32Array(O.flatMap(([e,t])=>[e,t])),2)),A.instanceCount=O.length,this.boxes=O.length,this.mat=new k({vertexShader:Vh,fragmentShader:Hh,uniforms:this.uniforms,transparent:!0,depthWrite:!1,depthTest:!c,side:2,defines:c?{ROLL_PASS:1}:{},blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205}),this.mesh=new he(A,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.wanted=!0,this.on=!0,this.pass=c?{deep:-1,scale:l??Eh.start,target:l??Eh.start,fixed:l!=null,hold:0,cap:null,rise:null,volScene:new w,postScene:new w,rt:null,depth:null,ok:null,T:0,F0:0,vsync:1e3/60,last:0,lastChange:0}:null,(c?this.pass.volScene:t).add(this.mesh),this.spray=new wh(c?this.pass.postScene:t,this,n),c){this.compMat=new k({vertexShader:Mh,fragmentShader:h?zh:Rh,uniforms:{uVol:{value:null},uVolTexel:{value:new U},uVolRes:{value:new U},uSceneDepth:this.uniforms.uSceneDepth,uInvProj:this.uniforms.uInvProj,uRevZ:this.uniforms.uRevZ},depthTest:!1,depthWrite:!1,transparent:!0,blending:5,blendSrc:201,blendDst:205,blendSrcAlpha:201,blendDstAlpha:205});let e=new he(new M(2,2),this.compMat);e.frustumCulled=!1,this.pass.compScene=new w,this.pass.compScene.add(e)}this.mainScene=t}_deep(e){let t=Eh.deep,n=this.pass,r=this.uniforms;e=Math.max(-1,Math.min(t.length-1,e)),n.deep=e;let[i,a,o,s]=e>=0?t[e]:[null,this.base.stepK,this.base.light,Th.reach[1]];i!=null&&(n.scale=n.target=i),r.uRollStepK.value=a,r.uRollLight.value=o,r.uRollReach.value.set(s*.73,s),r.uRollR.value=s}renderPass(e){let t=this.pass;if(!t||(this._govern(),!this.mesh.visible))return;let n=this.renderer,r=n.getContext(),i=n.getDrawingBufferSize(this._size??=new U),a=i.x,o=i.y;if(!t.depth||t.depth.width!==a||t.depth.height!==o){t.depth?.dispose();let e=new m(a,o,Ke);e.format=ie,t.depth=new De(a,o,{depthBuffer:!0,stencilBuffer:!0,depthTexture:e}),n.initRenderTarget(t.depth),this.uniforms.uSceneDepth.value=e,this.uniforms.uRevZ.value=+!!n.capabilities.reversedDepthBuffer}let s=Math.max(1,Math.round(a*t.scale)),c=Math.max(1,Math.round(o*t.scale));t.rt?(t.rt.width!==a||t.rt.height!==o)&&t.rt.setSize(a,o):t.rt=new De(a,o,{type:mt,format:S,minFilter:Be,magFilter:Be,depthBuffer:!1,stencilBuffer:!1}),t.rt.viewport.set(0,0,s,c),t.rt.scissor.set(0,0,s,c),t.rt.scissorTest=!0;let l=n.properties.get(t.depth).__webglFramebuffer;if(r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,l),r.blitFramebuffer(0,0,a,o,0,0,a,o,r.DEPTH_BUFFER_BIT|r.STENCIL_BUFFER_BIT,r.NEAREST),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),t.ok==null){let e=r.getError();if(t.ok=e===r.NO_ERROR,!t.ok){console.warn(`foam volume: the depth copy failed (GL error ${e}); drawn in the main render instead`),this._unpass();return}}this.uniforms.uVolRes.value.set(s,c),this.uniforms.uInvProj.value.copy(e.projectionMatrixInverse);let u=n.getClearColor(this._cc??=new Ve),d=n.getClearAlpha(),f=n.autoClear;n.setRenderTarget(t.rt),n.setClearColor(0,0),n.clear(!0,!1,!1),n.render(t.volScene,e),n.setRenderTarget(null),n.autoClear=!1,this.compMat.uniforms.uVol.value=t.rt.texture,this.compMat.uniforms.uVolTexel.value.set(1/a,1/o),this.compMat.uniforms.uVolRes.value.set(s,c),n.render(t.compScene,this.qCam),n.render(t.postScene,e),n.autoClear=f,n.setClearColor(u,d)}setBilat(e){this.bilat=!!e,this.compMat&&(this.compMat.fragmentShader=e?zh:Rh,this.compMat.needsUpdate=!0)}setEvents(e){this.puffs=new uh({events:e||!1,P:this.puffs.P})}rebirth(){this.puffs.clear()}setShare(e){let t=this.pass;t&&(this._deep(-1),t.hold=0,t.cap=null,t.rise=null,t.sum=0,t.n=0,e==null?(t.fixed=!1,t.target=Math.max(t.scale,Eh.start)):(t.fixed=!0,t.scale=t.target=e))}_unpass(){let e=this.pass;this.pass=null,e.volScene.remove(this.mesh),this.mainScene.add(this.mesh),e.postScene.remove(this.spray.mesh),this.mainScene.add(this.spray.mesh),this.mat.depthTest=!0,this.mat.defines={},this.mat.needsUpdate=!0,this.uniforms.uRollSink.value=0}_govern(){let e=this.pass,t=Eh,n=performance.now(),r=n-e.last;if(e.last=n,!(r>0&&r<250)){e.n=0,e.sum=0;return}if(e.vsync=Math.min(e.vsync*1.0001,Math.max(r,4)),!e.fixed&&e.deep<0&&e.scale!==e.target){let n=e.target-e.scale,i=1-Math.exp(-r/((n>0?t.riseTau:t.fallTau)*1e3)),a=n>0?Math.max(n*i,t.riseMin*r/1e3):n*i;e.scale=Math.abs(n)<.002||Math.abs(a)>=Math.abs(n)?e.target:e.scale+a}if(e.sum=(e.sum??0)+r,e.n=(e.n??0)+1,e.sum<t.win*1e3)return;let i=e.sum/e.n;e.sum=0,e.n=0,e.T=i;let a=!this.mesh.visible||(this.packed??0)<t.light;a&&(e.F0=e.F0?e.F0+.3*(i-e.F0):i);let o=e.F0||e.vsync,s=e.T0=o<16.7?Math.max(1.25*o,20):1.25*o;if(e.fixed||a)return;let c=i>1.05*s,l=i>Math.max(t.unusable,2*s),u=i<t.fast||e.vsync>15.5&&i<1.05*e.vsync;if(c){if(e.rise&&n-e.rise.at<t.riseCheck*1e3){let r=e.cap?.wait?Math.min(2*e.cap.wait,t.backoff[1]):t.backoff[0];e.cap={share:Math.max(t.second,Math.min(e.rise.from,t.first)),until:n+r*1e3,wait:r}}e.rise=null,l&&e.deep<0&&e.target>t.second+.001?(e.target=t.second,e.hold=n+t.secondHold*1e3):n<e.hold||(e.deep<0&&e.target>t.first+.001?(e.target=t.first,e.hold=n+t.firstHold*1e3):e.deep<0&&e.target>t.second+.001?(e.target=t.second,e.hold=n+t.secondHold*1e3):e.deep<t.deep.length-1&&(this._deep(e.deep+1),e.hold=n+t.settle*1e3))}else if(u){if(e.deep>=0)n>=e.hold&&(this._deep(e.deep-1),e.deep<0&&(e.scale=e.target=t.second),e.hold=n+t.settle*1e3);else{let t=e.cap&&n<e.cap.until?e.cap.share:1;e.target<t-.001&&(e.rise={from:e.target,at:n},e.target=t)}}}_makeNoise(){let e=this.renderer,t=e.getRenderTarget(),n=(t,n)=>{let r=new He(t,t,t,{type:Xe,format:S,depthBuffer:!1,stencilBuffer:!1});Object.assign(r.texture,{wrapS:d,wrapT:d,wrapR:d,minFilter:Be,magFilter:Be,generateMipmaps:!1});let i=new k({vertexShader:Mh,fragmentShader:n,uniforms:{uZ:{value:0}},depthTest:!1,depthWrite:!1});this.quad.material=i;for(let n=0;n<t;n++)i.uniforms.uZ.value=(n+.5)/t,e.setRenderTarget(r,n),e.render(this.qScene,this.qCam);return i.dispose(),r};this.noiseRT=n(kh,Nh),this.flowRT=n(Ah,Ph),this.uniforms.uRollNoise.value=this.noiseRT.texture,this.uniforms.uRollFlow.value=this.flowRT.texture,e.setRenderTarget(t)}set visible(e){this.wanted=!!e,this.mesh.visible=this.wanted&&this.on,this.spray.visible=this.mesh.visible}get visible(){return this.wanted}_pack(e){let t=Th,n=this.puffs,r=this.puffTex.image.data,i=this.cellTex.image.data,a=t.cells,o=t.perCell,s=this.cellN,c=this.cellScore,l=this.vol;s.fill(0),i.fill(-1);let u=0;for(let d=0;d<n.nLive&&u<t.maxPuffs;d++){let f=n.live[d],p=f.b;if(f.rho<t.minRho[0])continue;let m=u++,h=(m/32|0)*32*5*4+m%32*5*4,g=p.v,_=f.Rz*l,v=f.zc*l,y=f.Ra*Math.sqrt(l),b=f.Rd*Math.sqrt(l);r[h]=f.e-e.x,r[h+1]=f.n-e.y,r[h+2]=v,r[h+3]=_,r[h+4]=p.dx,r[h+5]=p.dy,r[h+6]=y,r[h+7]=b;let x=g?.waist??0;r[h+8]=f.rho*Bh(t.minRho[0],t.minRho[1],f.rho)/(1-.574*x),r[h+9]=f.age,r[h+10]=p.seedA,r[h+11]=p.seedB,r[h+12]=f.deposit/(1-.548*x),r[h+13]=g?.skewA??0,r[h+14]=g?.skewD??0,r[h+15]=g?.lean??0,r[h+16]=g?.waist??0,r[h+17]=g?.erode??1,r[h+18]=g?.noise??1,r[h+19]=0;let[S,C]=qt(y,b,g),w=Math.max(S,C)+t.margin,T=f.rho*_*Math.min(y,b),E=v+_,D=Math.max(0,Math.floor((f.e-e.x-w)/t.cell)),O=Math.min(a-1,Math.floor((f.e-e.x+w)/t.cell)),k=Math.max(0,Math.floor((f.n-e.y-w)/t.cell)),A=Math.min(a-1,Math.floor((f.n-e.y+w)/t.cell));for(let n=k;n<=A;n++)for(let r=D;r<=O;r++){let l=Math.max(r*t.cell-(f.e-e.x),0,f.e-e.x-(r+1)*t.cell),u=Math.max(n*t.cell-(f.n-e.y),0,f.n-e.y-(n+1)*t.cell);if(l*l+u*u>w*w)continue;let d=Math.sqrt((S*p.dy)**2+(C*p.dx)**2)+t.margin,h=Math.sqrt((S*p.dx)**2+(C*p.dy)**2)+t.margin,g=Math.max(0,f.e-e.x-d-r*t.cell),_=Math.min(t.cell,f.e-e.x+d-r*t.cell),v=Math.max(0,f.n-e.y-h-n*t.cell),y=Math.min(t.cell,f.n-e.y+h-n*t.cell);if(_<=g||y<=v)continue;let b=n*a+r,x=(n*a+r)*5*4,D=x+12,O=s[b];if(O>=o){let e=0;for(let t=1;t<o;t++)c[b*o+t]<c[b*o+e]&&(e=t);if(c[b*o+e]>=T)continue;O=e}else s[b]++;c[b*o+O]=T,i[x+O]=m,i[D+1]=s[b],i[D]=Math.max(i[D],E);let k=D+4;s[b]===1&&O===0?(i[k]=g,i[k+1]=v,i[k+2]=_,i[k+3]=y):(i[k]=Math.min(i[k],g),i[k+1]=Math.min(i[k+1],v),i[k+2]=Math.max(i[k+2],_),i[k+3]=Math.max(i[k+3],y))}}for(let e=0;e<a*a;e++)if(!s[e]){let t=(e*5+3)*4;i[t]=0,i[t+1]=0}this.puffTex.needsUpdate=!0,this.cellTex.needsUpdate=!0,this.packed=u}update(e,t=!0,n=null){if(this.on=t,this.mesh.visible=this.wanted&&t,this.spray.visible=this.mesh.visible,!this.mesh.visible){if(this.packed){this.cellTex.image.data.fill(-1),this.cellN.fill(0),this.packed=0;for(let e=0;e<Th.cells**2;e++)this.cellTex.image.data[(e*5+3)*4+1]=0;this.cellTex.needsUpdate=!0}return}let r=Th,i=r.cell,a=(r.cells-1)/2,o=this.uniforms.uRollO.value;if(o.set((Math.floor(e.position.x/i)-a)*i,(Math.floor(-e.position.z/i)-a)*i),n?.field){this.puffs.update(n.t,n.field,e.position.x,-e.position.z,n.drift??[0,0],n.wind??null),this._pack(o);let t=e.position,r=this._camP??={p:t.clone(),t:n.t,v:new $e},i=n.t-r.t;i>1e-4&&i<.25?r.v.subVectors(t,r.p).divideScalar(i):i!==0&&r.v.set(0,0,0),r.p.copy(t),r.t=n.t,this.spray.update(this.puffs,o,n.pixAng??.001,n.spray!==!1&&this.sprayOn,r.v,e.position.x,-e.position.z)}let s=this.renderer,c=s.getRenderTarget();this.quad.material=this.surfMat,s.setRenderTarget(this.rtS),s.render(this.qScene,this.qCam),s.setRenderTarget(c)}dispose(){this.spray.dispose(),[this.rtS,this.noiseRT,this.flowRT].forEach(e=>e.dispose()),[this.puffTex,this.cellTex].forEach(e=>e.dispose()),this.mesh.geometry.dispose(),[this.mat,this.surfMat].forEach(e=>e.dispose()),this.mesh.removeFromParent()}},Wh=`surfski.experimental`,Gh=e=>typeof e==`boolean`?e?`on`:`off`:String(+Number(e).toFixed(3)),Kh=[[`ride`,`Ride the crest at least (s)`,0,2,.05,!0],[`speed`,`Speed once it slows (share of crest speed)`,.3,1,.01,!1],[`faceTheta`,`Born ahead of the crest, middle of the spread (rad of phase)`,0,1.5,.05,!0],[`faceSpread`,`Spread of where it is born, either side (rad)`,0,.6,.01,!0],[`spillS`,`Spills forward from its rear over (s; 0 all at once)`,0,1.5,.05,!1],[`gateH`,`Born only where both seas together stand over (share of their height)`,-1,1,.05,!0],[`gateBack`,`Born at most this far behind their combined crest (rad)`,0,3.2,.05,!0],[`gateFront`,`Born at most this far ahead of their combined crest (rad)`,0,3.2,.05,!0]],qh=[[`center`,`Middle over the water (share of its height)`,-.8,.8,.05,!1],[`below`,`Share of its shape under the water (its top kept)`,0,.8,.05,!1],[`along`,`Length along the crest (share of 2.5 m)`,.2,1.5,.05,!1],[`grow`,`Balloons by`,0,2,.05,!1],[`rise`,`Rises as it forms by`,0,.8,.01,!1],[`tauH`,`Slumps over (s)`,.2,5,.1,!1],[`fadeIn`,`Forms over (s)`,.01,.6,.01,!1],[`life`,`Longest life (s)`,.5,6,.1,!1],[`deposit`,`Surface foam it leaves`,0,2,.05,!1],[`rate`,`Births (times the spill chance)`,0,3,.05,!0]],Jh=[[`uRollSink`,`Full foam down to under its surface (m)`,0,.5,.01,Th.sink],[`uRollFog`,`Fog over the body`,0,.3,.01,Th.fog],[`uRollSoft`,`Edge softness`,.02,.8,.01,Th.soft],[`uRollFine`,`Billows (0 off, 1 on)`,0,1,1,1]],Yh={off:0,"boxes drawn":1,"density along each ray":2,"drops as 8 cm squares":3,"objects each pixel loads":4,"drawn water against the foam's surface (red under, green over)":5};function Xh(e,{roller:t,makeRoller:n,toast:r=()=>{},light:i=null,water:a=null}){let o=e.addFolder(`Experimental`);o.close(),o.add({get profile(){try{return localStorage.getItem(`surfski.device`)??`auto`}catch{return`auto`}},set profile(e){try{e===`auto`?localStorage.removeItem(Cd):localStorage.setItem(Cd,e)}catch{}let t=new URL(location.href);t.searchParams.delete(`mobile`),location.replace(t.href)}},`profile`,[`auto`,`desktop`,`tablet`,`phone`]).name(`Device profile (reloads) · auto: ${globalThis.__tier?.tier??`?`}`);let s=o.addFolder(`Breaking waves`);s.close();let c=[];if(i){let e=o.addFolder(`Light on the boats and paddlers`);e.close();let t=i.live,n=i.defaults;for(let[r,a,o,s]of[[`sun`,`Sun on them (x the lamp)`,0,4],[`hemi`,`Sky light on them (x the lamp)`,0,2],[`env`,`Sky reflection`,0,2]])e.add(t,r,o,s,.05).name(`${a} · ${Gh(n[r])}`).onChange(()=>i.apply()).listen(),c.push([`boatlight.${r}`,{get:()=>t[r],set:e=>{t[r]=e,i.apply()},def:n[r]}]);let r={sun:1,hemi:1,env:.95};e.add({go:()=>{Object.assign(t,r),i.apply(),e.controllersRecursive().forEach(e=>e.updateDisplay()),I()}},`go`).name(`As before 2026-11-20 (1, 1, 0.95)`);let a=()=>{Object.assign(t,n),i.apply(),e.controllersRecursive().forEach(e=>e.updateDisplay())};e.add({reset:()=>{a(),I()}},`reset`).name(`Reset to the defaults`)}let l=[];if(a?.uniforms?.uFaceRes){let e=o.addFolder(`Water`);e.close();let t={get faceRes(){return a.uniforms.uFaceRes.value},set faceRes(e){a.uniforms.uFaceRes.value=e}};e.add(t,`faceRes`,0,10,.05).name(`Face darkening · ${Gh(Tn)}`).listen(),l.push([`water.faceRes`,{get:()=>t.faceRes,set:e=>{t.faceRes=e},def:Tn}]),a.uniforms.uSteepShade&&(Object.defineProperty(t,"steepShade",{get:()=>a.uniforms.uSteepShade.value,set:e=>{a.uniforms.uSteepShade.value=e},enumerable:!0}),e.add(t,`steepShade`,0,2,.05).name(`Steep faces darker · 0`).listen(),l.push([`water.steepShade`,{get:()=>t.steepShade,set:e=>{t.steepShade=e},def:0}])),e.add({reset:()=>{t.faceRes=Tn,`steepShade`in t&&(t.steepShade=0),e.controllersRecursive().forEach(e=>e.updateDisplay()),I()}},`reset`).name(`Reset to the defaults`)}let u=()=>t(),d=()=>u()?.puffs?.P,f=[],p=new Map,m=()=>s.controllersRecursive().forEach(e=>e.updateDisplay()),h=()=>u()?!0:(r(`Turn the foam objects on first (Experimental > Breaking waves, at the top)`),!1),g=u()?.puffs?.events||1,_={get objects(){return!!u()?.visible},set objects(e){let t=u()??(e?n(g):null);t&&(t.visible=e),m()},get mode(){return u()?.puffs?.events??g},set mode(e){g=e,u()?.setEvents(e),m()}};for(let[e,t]of c)p.set(e,t);for(let[e,t]of l)p.set(e,t);p.set(`objects`,{get:()=>_.objects,set:e=>{_.objects=e},def:!1}),p.set(`events`,{get:()=>_.mode,set:e=>{_.mode=e},def:1}),s.add(_,`objects`).name(`Foam objects on breaking crests · off`),s.add(_,`mode`,{"version 1 (no energy)":0,"grow with the water they take":1,"lengthen back to the crest":2}).name(`Foam events · grow`);let v=(e,t)=>{if(!h())return;let n=u().puffs.P;n.groupsOff={...n.groupsOff??{},[e]:!t},u().rebirth()},y={get swell(){return!u()?.puffs?.P.groupsOff?.swell},set swell(e){v(`swell`,e)},get wind(){return!u()?.puffs?.P.groupsOff?.wind},set wind(e){v(`wind`,e)}};p.set(`groups.swell`,{get:()=>y.swell,set:e=>{y.swell=e},def:!0}),p.set(`groups.wind`,{get:()=>y.wind,set:e=>{y.wind=e},def:!0}),s.add(y,`swell`).name(`Foam objects on the swell's crests · on`),s.add(y,`wind`).name(`Foam objects on the wind sea's crests · on`);let b=(e,t)=>{let n=s.addFolder(e);n.close();let r={};for(let[e,,,,,n]of t)Object.defineProperty(r,e,{get:()=>d()?.[e]??G[e],set:t=>{h()&&(d()[e]=t)},enumerable:!0}),p.set(`puff.${e}`,{get:()=>r[e],set:t=>{r[e]=t},def:G[e],birth:n});for(let[e,i,a,o,s,c]of t){let t=n.add(r,e,a,o,s).name(`${i} · ${Gh(G[e])}`);c&&t.onFinishChange(()=>u()?.rebirth())}let i=()=>{let e=d();if(e){for(let[n]of t)e[n]=G[n];t.some(e=>e[5])&&u().rebirth(),m()}};n.add({reset:i},`reset`).name(`Reset to the defaults`),f.push(i)};b(`Objects: motion and birth`,Kh),b(`Objects: shape and life`,qh);let x=s.addFolder(`Volume: drawing`);x.close();let S={};for(let[e,,,,,t]of Jh)Object.defineProperty(S,e,{get:()=>u()?.uniforms[e]?.value??t,set:t=>{h()&&(u().uniforms[e].value=t)},enumerable:!0}),p.set(`draw.${e}`,{get:()=>S[e],set:t=>{S[e]=t},def:t});for(let[e,t,n,r,i,a]of Jh)x.add(S,e,n,r,i).name(`${t} · ${Gh(a)}`);let C={get debug(){return u()?.uniforms.uRollDebug.value??0},set debug(e){h()&&(u().uniforms.uRollDebug.value=e)},get bilat(){return u()?.bilat??!0},set bilat(e){h()&&u().setBilat(e)},get spray(){return u()?.sprayOn??!0},set spray(e){h()&&(u().sprayOn=e)}};for(let[e,t]of[[`debug`,0],[`spray`,!0]])p.set(`draw.${e}`,{get:()=>C[e],set:t=>{C[e]=t},def:t});x.add(C,`debug`,Yh).name(`Debug view · off`),x.add(C,`spray`).name(`Spray drops · on`);let w=()=>{let e=u();if(e){for(let[t,,,,,n]of Jh)e.uniforms[t].value=n;e.uniforms.uRollDebug.value=0,e.setBilat(!0),e.sprayOn=!0,e.pass&&!e.pass.fixed&&e.setShare(null),m()}};x.add({reset:w},`reset`).name(`Reset to the defaults`),f.push(w);let T=s.addFolder(`Spray drops`);T.close();let E=[[`uNear`,`Drawn fully out to (m)`,0,100,1,xh.near],[`uFar`,`Faded out by (m)`,1,150,1,xh.far],[`uGain`,`Brightness (times)`,.1,6,.05,xh.gain],[`uShutter`,`Streak: the motion of (s)`,0,.05,.001,xh.shutter]],D={};for(let[e,,,,,t]of E)Object.defineProperty(D,e,{get:()=>u()?.spray.uniforms[e]?.value??t,set:t=>{h()&&(u().spray.uniforms[e].value=t)},enumerable:!0}),p.set(`spray.${e}`,{get:()=>D[e],set:t=>{D[e]=t},def:t});for(let[e,t,n,r,i,a]of E)T.add(D,e,n,r,i).name(`${t} · ${Gh(a)}`);let O=()=>{let e=u();if(e){for(let[t,,,,,n]of E)e.spray.uniforms[t].value=n;m()}};T.add({reset:O},`reset`).name(`Reset to the defaults`),f.push(O);let k=s.addFolder(`Volume: resolution`);k.close();let A={get auto(){return!u()?.pass?.fixed},set auto(e){h()&&u().pass&&(u().setShare(e?null:u().pass.scale),m())},get share(){return u()?.pass?.scale??1},set share(e){h()&&u().pass&&(u().setShare(e),m())},get status(){let e=u()?.pass;if(!e)return`no volume pass`;let t=e.cap&&performance.now()<e.cap.until?` · ceiling ${Math.round(e.cap.share*100)} %`:``;return`${e.fixed?`held`:e.deep>=0?`deep rung ${e.deep}`:`going to ${Math.round(e.target*100)} %`} · now ${Math.round(e.scale*100)} %${t} · frame ${(e.T||0).toFixed(1)} ms of ${(e.T0||0).toFixed(1)}`}};p.set(`res.share`,{get:()=>u()?.pass?.fixed?u().pass.scale:null,set:e=>{u()?.pass&&u().setShare(e)},def:null}),k.add(A,`auto`).name(`Let the frame rate choose (governor) · on`),k.add(A,`share`,.1,1,.01).name(`Resolution share (holds it) · governor`),k.add(A,`status`).name(`Now`).disable().listen();let j=()=>{u()?.setShare(null),m()};k.add({reset:j},`reset`).name(`Reset (governor on)`),f.push(j),s.add({reset:()=>f.forEach(e=>e())},`reset`).name(`Reset all breaking-wave settings`);let M=(e,t)=>typeof e==`number`&&typeof t==`number`?Math.abs(e-t)<1e-9:e===t,N=()=>{let e={};for(let[t,n]of p){if(t!==`objects`&&!t.startsWith(`boatlight.`)&&!t.startsWith(`water.`)&&!u())continue;let r=n.get();M(r,n.def)||(e[t]=r)}return e},P=e=>{if(!e||typeof e!=`object`)return;e.objects!=null&&p.get(`objects`).set(!!e.objects),e.events!=null&&p.get(`events`).set(Number(e.events));let t=!1;for(let[n,r]of Object.entries(e)){let e=p.get(n);e&&n!==`objects`&&n!==`events`&&(typeof e.def!=`number`||typeof r==`number`&&Number.isFinite(r))&&(e.set(r),t||=!!e.birth)}t&&u()?.rebirth(),m()},F=typeof localStorage<`u`?localStorage:null,I=()=>{try{let e=N();Object.keys(e).length?F?.setItem(Wh,JSON.stringify(e)):F?.removeItem(Wh)}catch{}};o.onChange(I);let ee=null;try{ee=JSON.parse(F?.getItem(`surfski.experimental`)??`null`)}catch{ee=null}if(ee&&typeof ee==`object`){P(ee);let e=Object.keys(ee).length;e&&setTimeout(()=>r(`Experimental settings kept from last time: ${e} changed (Settings > Experimental to reset)`,3500),1500)}return{folder:o,snapshot:N,apply:e=>{P(e),I()}}}var Zh=180/Math.PI,Qh=e=>(e%360+360)%360,$h=(e,t)=>((t-e)%360+540)%360-180,eg=(e,t)=>Qh(Math.atan2(t.e-e.e,t.n-e.n)*Zh);function tg(e,t=.5,n=10){return Math.sign(e)*(Math.asinh(Math.min(Math.abs(e),n)/t)/Math.asinh(n/t))}function ng(e,t){let n=1/0,r=-1/0;for(let t of e)t<n&&(n=t),t>r&&(r=t);let i=r-n,a=e[t];return{pos:i>1e-4?(a-n)/i:.5,H:i,above:a-n}}var rg={headingDeg:.75,cogDeg:1.5,pitchDeg:1,rollDeg:1,sog:1.5,stw:1.5,vsWave:1.5,waveCrestMs:3,waveSetMs:3,waveCAlong:3,waterW:1,waterSoonW:1,pushW:1,pushSoonW:1,extW:1,extSoonW:1,power:.5,paddlerW:.5,thrust:1,push:1,drag:1,net:1,_0x6a7db6:1.5,_0x39dfac:.5,_0x04e2ba:.5,reserve:2,hr:1},ig={pos:1,H:4,above:1,slopeDeg:1},ag=class{constructor(){this.v={},this.t=null,this.o={},this.wave={},this.prof=null}update(e,t=.4){let n=this.t==null?-1:e.t-this.t,r=!(n>=0&&n<.5)||!(t>0);this.t=e.t;let i=this.v,a=(e,a,o,s=!1)=>{if(a==null||!Number.isFinite(a))return delete i[e],a;let c=i[e];if(r||c==null)return i[e]=a;let l=1-Math.exp(-n/(t*o));return i[e]=s?Qh(c+$h(c,a)*l):c+(a-c)*l},o=Object.assign(this.o,e);for(let t in rg)o[t]=a(t,e[t],rg[t],t.endsWith(`Deg`)&&t!==`pitchDeg`&&t!==`rollDeg`);if(o.driftDeg=e.driftDeg==null?null:$h(o.headingDeg,o.cogDeg),e.wave){let i=Object.assign(this.wave,e.wave);for(let t in ig)i[t]=a(`wave.${t}`,e.wave[t],ig[t]);let s=e.wave.profile;if(s){if(r||!this.prof||this.prof.length!==s.length)this.prof=Float64Array.from(s);else{let e=1-Math.exp(-n/t);for(let t=0;t<s.length;t++)this.prof[t]+=(s[t]-this.prof[t])*e}i.profile=this.prof}o.wave=i}o.yaw=e.yaw?Object.fromEntries(Object.entries(e.yaw).map(([e,t])=>[e,a(`yaw.${e}`,t,1.5)])):null;let s=e=>$h(o.headingDeg,e);return o.nav=e.nav?{...e.nav,rel:s(e.nav.bearing),after:e.nav.after?{...e.nav.after,rel:s(e.nav.after.bearing)}:null}:null,o}},og=17,sg=.1,cg=.7,lg=class{constructor(){this.tel=null,this.waveT=-1e9,this.wave={pos:.5,H:0,above:0},this.hs=new Float64Array(og),this.o={}}update({fp:e,s:t,field:n,t:r,nav:i=null,prof:a=null,elapsed:o=null}){let s=e?.ski,c=!!e&&Math.abs((e.t??0)-r)<.05,l=n?.dominant,u=Math.sin(t.psi),d=Math.cos(t.psi),f=d,p=-u,m=this.tel??={};m.t=r,m.live=c,m.headingDeg=t.headingDeg,m.pitchDeg=t.pitch*Zh,m.rollDeg=t.roll*Zh,m.u=t.u,m.power=t.power??0,m.reserve=a?.wPrime?Math.min(Math.max(t.wPrime/a.wPrime,0),1):null;let h=c?s.latV??0:0,g=u*t.u+f*h,_=d*t.u+p*h;m.sog=Math.hypot(g,_),m.cogDeg=m.sog>.2?Qh(Math.atan2(g,_)*Zh):m.headingDeg,m.driftDeg=c?$h(m.headingDeg,m.cogDeg):null,m.stw=c?s._0xe72e54?.vrel??null:null;let v=l&&l.k>0?l.omega/l.k:0,y=l?l.dx*u+l.dy*d:0;if(m.waveC=v,m.waveCAlong=v*y,m.vsWave=t.u-v*y,m.waveCrestMs=l&&l.k>0?l.omega/l.k:null,m.waveSetMs=l&&l.k>0?l.omega/l.k-.5*Math.sqrt(9.81/l.k):null,m.wavesFromDeg=l?Qh(Math.atan2(l.dx,l.dy)*Zh+180):null,m.windFromDeg=c&&s.wind&&(s.wind[0]||s.wind[1])?Qh(Math.atan2(s.wind[0],s.wind[1])*Zh+180):null,m.windMs=c&&s.wind?Math.hypot(s.wind[0],s.wind[1]):null,n&&l&&l.k>0&&(r-this.waveT>sg||r<this.waveT)){this.waveT=r;let e=2*Math.PI/l.k;for(let i=0;i<og;i++){let a=(i-8)/16*e;this.hs[i]=n.sample(t.e+l.dx*a,t.n+l.dy*a,r,this.o).h}this.wave=ng(this.hs,8),this.wave.L=e;let i=n.sample(t.e,t.n,r,this.o),a=i.sx*l.dx+i.sn*l.dy;if(this.wave.slopeDeg=Math.atan(a)*Zh,this.wave.face=a<-.01?`front`:a>.01?`back`:`flat`,this.wave.profile=Array.from(this.hs),c&&s.p){let e=s.p,i=e._0x650dee??2.2,a=t.u*cg,o=l.omega/l.k*cg,c=t.e+u*a-l.dx*o,f=t.n+d*a-l.dy*o,p=(n.sample(c+u*i,f+d*i,r,this.o).h-n.sample(c-u*i,f-d*i,r,this.o).h)/(2*i),m=Math.min(Math.max((t.u-v*y)/(t.u+v||1),0),1),h=e.mass*(e._0xd8add8??1);this.soonW=-h*9.81*e._0x530f2a*(1-(e._0x2fbec7??0)*m)*p*t.u}else this.soonW=null}m.wave=this.wave;let b=n?.state?.stats?.hs??n?.stats?.hs;m.seaH90=b>0?b*Math.sqrt(Math.LN10/2):null;let x=!c&&e?.states?.length?e.states[Math.min(e.states.length-1,Math.max(0,Math.round(r/(e.h*2))))]:null,S=c?s:x;m.thrust=S?.thrust??null,m.push=S?.slopeForce??null;let C=c?s._0xe72e54:null;m.drag=C?C.resist+C.waveRes+C.pearl+C._0x982cdb+C._0x6ad898:null,m._0xe72e54=C?{hull:C.resist,waves:C.waveRes,deck:C.pearl,motion:C._0x982cdb,side:C._0x6ad898}:null,m._0x6a7db6=c?s._0x6a7db6??0:null,m.pushW=m.push==null?null:m.push*t.u,m.pushSoonW=this.soonW??null,m.waterW=c&&s._0xebffbc!=null?s._0xebffbc*t.u:null,m.waterSoonW=m.waterW!=null&&this.soonW!=null&&m.pushW!=null?this.soonW+(m.waterW-m.pushW):null,m._0x903c72=a?._0x903c72??null,m.windW=c?(s._0x6a7db6??0)*t.u:null,m.extW=m.waterW==null?null:m.waterW+m.windW,m.extSoonW=m.waterSoonW==null?null:m.waterSoonW+m.windW,m.braceW=C?.brace==null?0:C.brace*Math.max(t.u,0),m.paddlerW=(t.power??0)-m.braceW,m.levelsW=a?Iu.slice(1).map(e=>e*a._0x903c72):null,m.braceStepsW=c&&s.p?._0xd4dbdd?zu.slice(2).map(e=>-s.p._0xd4dbdd*e*t.u*Math.abs(t.u)*Math.max(t.u,0)):null,m.bands=a?{_0x903c72:a._0x903c72,cpW:a.cpW,maxW:a.maxW,sprintW:a.bands?.[2]??a.maxW}:null,m.hr=c?s.hr??null:t.hr??null,m.elapsed=o,m.thrustW=m.thrust==null?null:m.thrust*t.u,m.dragW=m.drag!=null&&m.stw!=null?m.drag*Math.max(m.stw,0):null,m.net=m.drag==null?null:m.thrust+m.push+m._0x6a7db6-m.drag,m.steer=c?e.steerIn??0:null;let w=c?s.yawParts:null;if(m.yaw=w?{rudder:w.rudder*Zh,broach:w.broach*Zh,wind:w.wind*Zh,brace:w.brace*Zh,ends:w.ends*Zh}:null,m._0x39dfac=c?s._0x39dfac??null:null,m._0x04e2ba=c?s._0x04e2ba??null:null,m._0x0dfab4=c?s._0x0dfab4??null:null,m._0x6e2ff1=c?s._0x6e2ff1??null:null,m._0x84ea2d=c?s._0x84ea2d??null:null,i?.goal){let e={e:t.e,n:t.n},n=eg(e,i.goal),r=Math.hypot(i.goal.e-t.e,i.goal.n-t.n);m.nav={name:i.name??``,bearing:n,rel:$h(m.headingDeg,n),dist:r,remainingM:i.remainingM??r,doneM:i.doneM??(c?s.distance??null:null),after:i.after?{bearing:eg(e,i.after),rel:$h(m.headingDeg,eg(e,i.after)),dist:Math.hypot(i.after.e-t.e,i.after.n-t.n)}:null}}else m.nav=null;return m}},ug=`surfski.instruments`,dg=.4,fg=2.23694,pg=.3048,Q={panel:`rgba(5, 20, 40, .66)`,text:`#e8f2ff`,dim:`rgba(232, 242, 255, .55)`,faint:`rgba(232, 242, 255, .25)`,mark:`#ffd23f`,push:`#4cd18a`,climb:`#ff7a45`,water:`#4aa3ff`,wind:`#7fe3ff`,sky:`#3f7fc4`,sea:`#0c3a52`,stall:`#ff3b30`,off:`rgba(255,255,255,.18)`,track:`rgba(255,255,255,.14)`,brace:`#9b6bff`,heart:`#ff4d6d`},mg=(e,t,n)=>Math.min(n,Math.max(t,e)),hg={Off:{},Default:{left:[`adi`,`elev`],right:[[`speed`,`hr`]]},Engineering:{above:[`strip`,`forces`],left:[`rudder`,`adi`,`elev`],right:[`speedFull`,`hr`]}},gg=[`Wave profile`,`Bars`,`Power stack`,`All (compare)`],_g={hr:24};function vg(e,t){let n=document.createElement(`canvas`),r=Math.min(window.devicePixelRatio||1,2);n.width=Math.round(e*r),n.height=Math.round(t*r),n.style.width=`${e}px`,n.style.height=`${t}px`,n.style.display=`block`;let i=n.getContext(`2d`);return i.scale(r,r),{cv:n,ctx:i,w:e,h:t}}function yg(e,t,n,r=6){e.clearRect(0,0,t,n),e.fillStyle=Q.panel,e.beginPath(),e.roundRect(0,0,t,n,r),e.fill()}function bg(e,t,n,r,{size:i=10,color:a=Q.text,align:o=`left`,weight:s=600,base:c=`alphabetic`}={}){e.font=`${s} ${i}px system-ui, -apple-system, Segoe UI, sans-serif`,e.fillStyle=a,e.textBaseline=c;let l=xg(e,t);if(!/[0-9]/.test(t))return e.textAlign=o,e.fillText(t,n,r),l;e.textAlign=`left`;let u=e.measureText(`0`).width,d=o===`right`?n-l:o===`center`?n-l/2:n;for(let n of t){let t=n>=`0`&&n<=`9`?u:e.measureText(n).width;e.fillText(n,n>=`0`&&n<=`9`?d+(u-e.measureText(n).width)/2:d,r),d+=t}return l}function xg(e,t){let n=e.measureText(`0`).width,r=0;for(let i of t)r+=i>=`0`&&i<=`9`?n:e.measureText(i).width;return r}function Sg(e,t,n,r,i,a,o=!0){e.beginPath(),e.arc(t,n,4.5,0,2*Math.PI),o?(e.fillStyle=r?i:Q.off,e.fill(),r&&(e.shadowColor=i,e.shadowBlur=8,e.fill(),e.shadowBlur=0)):(e.strokeStyle=Q.faint,e.lineWidth=1,e.stroke()),a&&bg(e,a,t+7,n+3.5,{size:9,color:o?r?Q.text:Q.dim:Q.faint})}var Cg=e=>e>=1e3?`${(e/1e3).toFixed(e>=1e4?0:1)} km`:`${Math.round(e/10)*10} m`,wg=(e,t=0)=>`${e>=0?`+`:`−`}${Math.abs(e).toFixed(t)}`;function Tg(e,t,n,r,i,a=1){e.globalAlpha=a,e.fillStyle=i,e.beginPath(),e.moveTo(t,n),e.lineTo(t-r,n-r),e.lineTo(t-r*.45,n-r),e.lineTo(t,n-r*.55),e.lineTo(t+r*.45,n-r),e.lineTo(t+r,n-r),e.closePath(),e.fill(),e.globalAlpha=1}var Eg=e=>{let t=Math.max(0,Math.floor(e)),n=Math.floor(t/3600),r=Math.floor(t%3600/60),i=String(t%60).padStart(2,`0`);return n?`${n}:${String(r).padStart(2,`0`)}:${i}`:`${r}:${i}`};function Dg(e,t,n,r,i){e.fillStyle=i,e.beginPath(),e.moveTo(t,n+r*.8),e.bezierCurveTo(t-r*1.3,n-r*.05,t-r*.6,n-r,t,n-r*.35),e.bezierCurveTo(t+r*.6,n-r,t+r*1.3,n-r*.05,t,n+r*.8),e.fill()}var Og=150,kg=(e,t)=>t/2+mg(e,-72,Og/2-3)*(t/Og),Ag=class{constructor(e,{marks:t=!0}={}){Object.assign(this,vg(e,t?36:27)),this.marks=t}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2,a=n/Og,o=e.headingDeg;yg(t,n,r),t.save(),t.beginPath(),t.roundRect(0,0,n,r,6),t.clip();for(let e=Math.ceil((o-Og/2)/5)*5;e<=o+Og/2;e+=5){let n=i+(e-o)*a,r=(e%360+360)%360,s=r%10==0;if(t.fillStyle=s?Q.dim:Q.faint,t.fillRect(n-.5,s?11:14,1,s?8:5),r%30==0){let e={0:`N`,90:`E`,180:`S`,270:`W`}[r]??String(r);bg(t,e,n,9,{size:e.length===1?10:9,align:`center`,color:e.length===1?Q.text:Q.dim})}}let s=e=>((e-o)%360+540)%360-180,c=e=>Math.abs(e)>Og/2-3,l=e.windFromDeg==null?null:s(e.windFromDeg+180),u=e.wavesFromDeg==null?null:s(e.wavesFromDeg+180),d=l==null?null:kg(l,n),f=u==null?null:kg(u,n);if(d!=null&&f!=null&&Math.abs(d-f)<14){let e=(d+f)/2,t=d>=f?1:-1;d=e+t*7,f=e-t*7}f!=null&&(t.globalAlpha=c(u)?.4:1,t.strokeStyle=Q.water,t.lineWidth=1.6,t.beginPath(),t.moveTo(f-5,23),t.quadraticCurveTo(f-2.5,19,f,23),t.quadraticCurveTo(f+2.5,27,f+5,23),t.stroke(),t.globalAlpha=1),d!=null&&(t.globalAlpha=c(l)?.45:1,bg(t,`💨`,d,23,{size:11,align:`center`,base:`middle`}),t.globalAlpha=1);let p=this.marks?e.nav:null;if(p?.after&&!c(p.after.rel)&&Tg(t,kg(p.after.rel,n),r-3,6,Q.mark,.45),p){let e=kg(p.rel,n);if(c(p.rel)){t.fillStyle=Q.mark,t.beginPath();let n=Math.sign(p.rel);t.moveTo(e+n*6,r-8),t.lineTo(e-n*2,r-13),t.lineTo(e-n*2,r-3),t.fill(),bg(t,`${Math.round(Math.abs(p.rel))}° · ${Cg(p.dist)}`,e-n*6,r-4,{size:10,align:n>0?`right`:`left`,color:Q.mark})}else Tg(t,e,r-1,7,Q.mark),bg(t,Cg(p.dist),e+(p.rel>30?-10:10),r-3,{size:10,align:p.rel>30?`right`:`left`,color:Q.mark})}t.restore(),t.fillStyle=Q.text,t.beginPath(),t.moveTo(i,19),t.lineTo(i-4,25),t.lineTo(i+4,25),t.fill(),t.fillStyle=`rgba(5, 20, 40, .92)`,t.fillRect(i-17,0,34,11),bg(t,`${String(Math.round(o)%360).padStart(3,`0`)}°`,i,9.5,{size:10,align:`center`})}},jg=class{constructor(e){Object.assign(this,vg(e,15))}draw(e){let{ctx:t,w:n,h:r}=this,i=e.nav,a=10.5,o=Og/2-3;t.clearRect(0,0,n,r);let s=i?.doneM==null?``:`${Cg(i.doneM)} done`,c=i?.remainingM==null?``:`${Cg(i.remainingM)} to go`,l=Q.dim,u=Q.dim;t.font=`600 10px system-ui, -apple-system, Segoe UI, sans-serif`;let d=e.elapsed==null?0:xg(t,e.elapsed>=3600?`0:00:00`:`00:00`)+8;if(i&&Math.abs(i.rel)>o){let e=Math.sign(i.rel),r=`${Math.round(Math.abs(i.rel))}° · ${Cg(i.dist)}`,a=e>0?n-1-d:1;t.fillStyle=Q.mark,t.beginPath(),t.moveTo(a,6.5),t.lineTo(a-e*7,1.5),t.lineTo(a-e*7,11.5),t.fill(),e>0?(c=r,u=Q.mark):(s=r,l=Q.mark)}if(bg(t,s,i&&i.rel<-72?10:2,a,{size:10,color:l}),e.elapsed!=null&&bg(t,Eg(e.elapsed),n-2,a,{size:10,align:`right`,color:Q.dim}),bg(t,c,(i&&i.rel>o?n-10:n-2)-d,a,{size:10,align:`right`,color:u}),i?.after&&Math.abs(i.after.rel)<=o&&Tg(t,kg(i.after.rel,n),r,6,Q.mark,.45),i&&Math.abs(i.rel)<=o){let e=kg(i.rel,n),o=e>n*.62?-1:1;Tg(t,e,r,8,Q.mark),bg(t,Cg(i.dist),e+o*11,a,{size:10,align:o>0?`left`:`right`,color:Q.mark,weight:700})}}},Mg=class{constructor(e){Object.assign(this,vg(e,27)),this.tw=48}draw(e,t){let{ctx:n,w:r,h:i}=this,a=.5,o=r-this.tw-6-a,s=e.bands?.maxW??t?.maxW??450,c=e=>a+mg(.25+e/s*.75,0,1)*o,l=c(0);n.clearRect(0,0,r,i);let u=(e,t,r,i)=>{if(n.save(),n.beginPath(),n.roundRect(a,e,o,7,7/2),n.clip(),n.fillStyle=Q.track,n.fillRect(a,e,o,7),n.fillStyle=t,n.fillRect(a,e,l-a,7),r!=null){let t=c(r);n.fillStyle=i,n.fillRect(Math.min(t,l),e,Math.abs(t-l),7)}n.restore()},d=e.extW,f=e.paddlerW??e.power??0,p=e.bands;u(2,`rgba(255,122,69,.10)`,d,(d??0)>=0?Q.push:Q.climb);let m=p&&e.levelsW?[0,...e.levelsW.map(e=>e/p._0x903c72)]:null,h=e.braceStepsW?.[1];u(13,`rgba(150, 90, 255, .16)`,f,f<0?ds(h?1+2*Math.min(1,f/h):2):m?us(fs(f,p._0x903c72,m)):Q.push),n.fillStyle=`rgba(255,255,255,.5)`,(e.levelsW??[]).forEach((e,t)=>{if(e>s)return;let r=c(e),i=t===3;n.globalAlpha=i?.95:.5,n.fillRect(r-(i?1:.5),11,i?2:1,11)});for(let t of e.braceStepsW??[]){let e=c(t);e>2.5&&(n.globalAlpha=.5,n.fillRect(e-.5,11,1,11))}if(n.globalAlpha=1,e.extSoonW!=null){let t=mg(c(e.extSoonW),3.5,a+o-3);n.strokeStyle=e.extSoonW>=0?Q.push:Q.climb,n.lineWidth=1.5,n.strokeRect(t-3,1.25,6,8.5)}if(n.fillStyle=`rgba(255,255,255,.8)`,n.fillRect(l-1,0,2,22),e.reserve!=null){let t=mg(e.reserve,0,1);n.fillStyle=Q.track,n.fillRect(a,24,o,2),n.fillStyle=t>.5?`#4cd18a`:t>.2?`#ffc247`:`#ff6a3d`,n.fillRect(a,24,t*o,2)}let g=r-1,_={size:11,align:`right`,weight:700};bg(n,d==null?`n/a`:`${wg(Math.round(d))} W`,g,9.5,{..._,color:d==null?Q.dim:Math.abs(d)<5?Q.text:d>0?Q.push:Q.climb}),bg(n,`${f<0?`−`:``}${Math.abs(Math.round(f))} W`,g,20.5,{..._,color:f<0?`#c4a8ff`:Q.text})}},Ng=class{constructor(e){Object.assign(this,vg(e,e))}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2,a=r/2,o=r/2-3;yg(t,n,r,8),t.save(),t.beginPath(),t.arc(i,a,o,0,2*Math.PI),t.clip(),t.translate(i,a),t.rotate(-(e.rollDeg*Math.PI)/180);let s=e=>tg(e)*(o-4),c=s(e.pitchDeg);t.fillStyle=Q.sky,t.fillRect(-o*2,-o*2,o*4,o*2+c),t.fillStyle=Q.sea,t.fillRect(-o*2,c,o*4,o*2),t.fillStyle=`#fff`,t.fillRect(-o*2,c-.75,o*4,1.5);let l=o/50;for(let e of[.5,1,2,5,10])for(let n of[1,-1]){let r=c-n*s(e),i=(e>=5?16:e>=2?12:7)*l;t.fillStyle=`rgba(255,255,255,.7)`,t.fillRect(-i,r-.5,i*2,1),(e===1||e===2||e===10)&&bg(t,String(e),i+2,r+3,{size:8,color:`rgba(255,255,255,.8)`,weight:500})}t.restore(),t.strokeStyle=`rgba(255,255,255,.35)`,t.lineWidth=1,t.beginPath(),t.arc(i,a,o,0,2*Math.PI),t.stroke();let u=o*.52;if(t.strokeStyle=Q.mark,t.lineWidth=2.5,t.lineCap=`round`,t.beginPath(),t.moveTo(i-u,a),t.lineTo(i-u*.35,a),t.lineTo(i-u*.15,a+u*.2),t.moveTo(i+u,a),t.lineTo(i+u*.35,a),t.lineTo(i+u*.15,a+u*.2),t.stroke(),t.fillStyle=Q.mark,t.beginPath(),t.arc(i,a,2,0,2*Math.PI),t.fill(),t.shadowColor=`rgba(0,0,0,.8)`,t.shadowBlur=3,bg(t,`${wg(e.pitchDeg,1)}°`,i,a+o*.72,{size:10,align:`center`}),t.shadowBlur=0,e._0x0dfab4){let n=e._0x6e2ff1===`vent`?`VENTED`:`RUDDER`,r=n.length*6.5+10;t.fillStyle=Q.stall,t.beginPath(),t.roundRect(i-r/2,a-o*.72-8,r,13,4),t.fill(),bg(t,n,i,a-o*.72+2,{size:9,align:`center`,weight:800,color:`#fff`})}}},Pg=class{constructor(e){Object.assign(this,vg(28,e))}draw(e){let{ctx:t,w:n,h:r}=this,i=e.wave??{},a=(i.H??0)/pg,o=(i.above??0)/pg,s=r-6;yg(t,n,r,6);let c=Math.max(2,Math.ceil((e.seaH90??4*pg)/pg-.05)),l=e=>s-mg(e/c,0,1)*(s-13),u=c>6?2:1;t.fillStyle=Q.track,t.fillRect(4,13,7,s-13),t.fillStyle=`rgba(74,163,255,.4)`,t.fillRect(4,l(a),7,s-l(a));for(let e=0;e<=c;e+=u){let r=l(e);t.fillStyle=Q.dim,t.fillRect(11,r-.5,3,1),bg(t,String(e),n-3,r+3,{size:8,align:`right`,color:Q.dim,weight:500})}let d=l(o);t.fillStyle=Q.mark,t.fillRect(2,d-1.5,11,3),bg(t,`ft`,n/2,8,{size:8,align:`center`,color:Q.dim})}},Fg=class{constructor(e,{full:t=!1}={}){Object.assign(this,vg(72,e)),this.full=t}draw(e){let{ctx:t,w:n,h:r}=this;yg(t,n,r,8),bg(t,(e.sog*fg).toFixed(1),n/2,19,{size:18,align:`center`,weight:700}),bg(t,`mph`,n/2,28,{size:8,align:`center`,color:Q.dim});let i=e=>e==null?`–`:(e*fg).toFixed(1),a=[[`crests`,i(e.waveCrestMs)],[`sets`,i(e.waveSetMs)]];this.full&&a.push([`water`,e.stw==null?`n/a`:i(e.stw)],[`drift`,e.driftDeg==null?`n/a`:`${wg(e.driftDeg)}°`]);let o=this.full?42:r-16;a.forEach(([e,r],i)=>{let a=o+i*12;bg(t,e,6,a,{size:9,color:Q.dim}),bg(t,r,n-6,a,{size:10,align:`right`})})}},Ig=class{constructor(){Object.assign(this,vg(72,_g.hr)),this.ph=0,this.lastT=null}draw(e){let{ctx:t,w:n,h:r}=this,i=e.hr;if(yg(t,n,r,8),this.lastT!=null&&i!=null){let t=e.t-this.lastT;t>0&&t<1&&(this.ph=(this.ph+t*i/60)%1)}this.lastT=e.t,Dg(t,15,r/2+.5,6.5*(1+.2*Math.exp(-this.ph*7)),Q.heart),bg(t,i==null?`–`:String(Math.round(i)),n-8,r/2+5,{size:14,align:`right`,weight:700})}},Lg=class{constructor(e){Object.assign(this,vg(e,26))}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2,a=i-6,o=e=>mg(e/120,-1,1)*a;if(yg(t,n,r),e.drag==null){bg(t,`forces: live only`,i,16,{size:10,align:`center`,color:Q.dim});return}let s=[[e.thrust,Q.water],[Math.max(e.push,0),Q.push],[Math.max(e._0x6a7db6,0),Q.wind]],c=[[e.drag,Q.stall],[Math.max(-e.push,0),Q.climb],[Math.max(-e._0x6a7db6,0),Q.wind]],l=i;for(let[e,n]of s){let r=o(e);t.fillStyle=n,t.fillRect(l,4,r,9),l+=r}l=i;for(let[e,n]of c){let r=o(e);t.fillStyle=n,t.fillRect(l-r,4,r,9),l-=r}t.fillStyle=Q.text,t.fillRect(i-.5,2,1,13),bg(t,`drag ${e.drag.toFixed(0)} N`,6,r-3,{size:9,color:Q.dim}),bg(t,`net ${wg(e.net)} N`,i,r-3,{size:9,align:`center`}),bg(t,`push ${wg(e.push)} N`,n-6,r-3,{size:9,align:`right`,color:Q.dim})}},Rg=class{constructor(){Object.assign(this,vg(124,78))}draw(e){let{ctx:t,w:n,h:r}=this,i=n/2;if(yg(t,n,r,8),Sg(t,9,10,!!e._0x0dfab4,Q.stall,e._0x39dfac==null?`force n/a`:`${e._0x6e2ff1?`${e._0x6e2ff1===`vent`?`VENTED`:`STALLED`} · `:``}${Math.abs(e._0x39dfac).toFixed(0)} N`,e._0x0dfab4!=null),e._0x84ea2d!=null&&e._0x84ea2d<.995&&bg(t,`${Math.round(e._0x84ea2d*100)}% in`,n-8,13,{size:9,align:`right`,color:e._0x84ea2d<.6?Q.climb:Q.dim}),t.fillStyle=`rgba(255,255,255,.12)`,t.fillRect(10,20,n-20,7),e.steer!=null){let r=mg(e.steer,-1,1)*(n/2-10);t.fillStyle=Q.mark,t.fillRect(Math.min(i,i+r),20,Math.abs(r),7)}if(e._0x04e2ba!=null){let r=mg(e._0x04e2ba,-1,1)*(n/2-10);t.fillStyle=Math.abs(e._0x04e2ba)>.85?Q.stall:Q.text,t.fillRect(i+r-1,18,2,11)}t.fillStyle=Q.text,t.fillRect(i-.5,18,1,11);let a=e.yaw,o=(e,r,i)=>{bg(t,r,8,e,{size:9,color:Q.dim}),bg(t,i==null?`n/a`:`${wg(i,2)}°/s`,n-8,e,{size:9,align:`right`})};o(42,`rudder`,a?.rudder),o(54,`waves`,a?a.broach+a.ends:null),o(66,`wind`,a?.wind)}},zg=class{constructor(e){Object.assign(this,vg(e,46)),this.n=100,this.p=new Float32Array(this.n),this.q=new Float32Array(this.n),this.v=new Float32Array(this.n),this.k=0,this.lastT=-1}draw(e){let{ctx:t,w:n,h:r}=this;e.t<this.lastT-.5&&(this.p.fill(0),this.q.fill(0),this.v.fill(0)),(e.t-this.lastT>=.1||e.t<this.lastT)&&(this.lastT=e.t,this.k=(this.k+1)%this.n,this.p[this.k]=e.power,this.q[this.k]=e.extW??0,this.v[this.k]=e.sog),yg(t,n,r);let i=e=>r/2-mg(e/400,-1,1)*(r/2-4),a=e=>r-4-mg(e/6,0,1)*(r-8);t.fillStyle=Q.faint,t.fillRect(4,r/2-.5,n-8,1);let o=(e,r,i,a)=>{t.strokeStyle=i,t.lineWidth=a,t.beginPath();for(let i=0;i<this.n;i++){let a=(this.k+1+i)%this.n,o=4+i/(this.n-1)*(n-8);i?t.lineTo(o,r(e[a])):t.moveTo(o,r(e[a]))}t.stroke()};o(this.v,a,`rgba(255,255,255,.6)`,1),o(this.p,i,Q.water,1.5),o(this.q,i,Q.push,1.5),bg(t,`power`,6,10,{size:9,color:Q.water}),bg(t,`wind+water`,40,10,{size:9,color:Q.push}),bg(t,`speed`,100,10,{size:9,color:Q.dim}),bg(t,`10 s`,n-6,10,{size:9,align:`right`,color:Q.dim})}},Bg={course:e=>new jg(e),compass:e=>new Ag(e,{marks:!1}),power:e=>new Mg(e),strip:e=>new zg(e),forces:e=>new Lg(e),adi:(e,t)=>new Ng(t),elev:(e,t)=>new Pg(t),speed:(e,t)=>new Fg(t),speedFull:(e,t)=>new Fg(t,{full:!0}),hr:()=>new Ig,rudder:()=>new Rg};function Vg(e=globalThis){try{return e.matchMedia?.(`(pointer: fine)`).matches?`Default`:`Off`}catch{return`Off`}}function Hg(e,t=globalThis.localStorage,n=Vg()){let r={};try{r=JSON.parse(t?.getItem(ug)??`{}`)??{}}catch{r={}}r.preset??(r.preset=n),gg.includes(r.preset)&&(r.preset=`Default`);let i=e?.get?.(`instr`);if(i!=null){let e=e=>e.toLowerCase().replace(/[^a-z]/g,``),t=e(i),n=Object.keys(hg).find(n=>e(n)===t)??(t?Object.keys(hg).find(n=>e(n).startsWith(t)):null);r.preset=n??(i===`1`?`Default`:`Off`)}return hg[r.preset]||(r.preset=`Off`),r}var Ug=class{constructor(e,{storage:t=globalThis.localStorage}={}){this.s=e,this.storage=t,this.power=document.getElementById(`power`),this.widgets=[],this.lastDraw=-1,this.geomT=-1,this.damper=new ag,typeof window<`u`&&(window.__instr=this);let n=document.createElement(`style`);n.textContent=`.instr-slot{position:fixed;z-index:4;display:flex;gap:6px;align-items:flex-end;pointer-events:none} .instr-col{display:flex;flex-direction:column;gap:4px}
      .instr-main{display:flex;flex-direction:column;gap:2px} #power.instr-on>.row, #power.instr-on>#plab{display:none !important} body.dbgopen .instr-slot{visibility:hidden}`,document.head.appendChild(n),this.build()}save(){try{this.storage?.setItem(ug,JSON.stringify(this.s))}catch{}}setPreset(e){this.s.preset=hg[e]?e:`Off`,this.save(),this.build()}clear(){for(let e of this.els??[])e.remove();this.els=[],this.widgets=[],this.power?.classList.remove(`instr-on`),this.built=null}build(){this.clear();let e=hg[this.s.preset];if(!this.power||!e||!Object.keys(e).length)return;this.power.classList.add(`instr-on`);let t=this.power.clientWidth,n=t-20>120?t-20:340,r=e=>{let t=document.createElement(`div`);return t.className=e,this.els.push(t),t},i=(e,t,n,r)=>{let i=Bg[t](n,r);return i.id=t,e.appendChild(i.cv),this.widgets.push(i),i},a=r(`instr-main`);for(let t of e.above??[])i(a,t,n);let o=i(a,`course`,n);i(a,`compass`,n),i(a,`power`,n),this.power.insertBefore(a,this.power.firstChild);let s=this.power.getBoundingClientRect(),c=s.height>0?Math.round(s.bottom-o.cv.getBoundingClientRect().top+6):85,l=e=>{let t=r(`instr-slot`);for(let n of e??[]){if(!Array.isArray(n)){i(t,n,0,_g[n]??c);continue}let e=document.createElement(`div`);e.className=`instr-col`,t.appendChild(e);let r=n.reduce((e,t)=>e+(_g[t]??0),0),a=n.filter(e=>!_g[e]).length,o=a?Math.floor((c-r-4*(n.length-1))/a):0;for(let t of n)i(e,t,0,_g[t]??o)}return document.body.appendChild(t),t};this.left=l(e.left),this.right=l(e.right),this.built={w:t,h:Math.round(s.height)},this.geomT=-1,this.layout(performance.now())}layout(e){if(e-this.geomT<500)return;this.geomT=e;let t=this.power.getBoundingClientRect();if(this.built&&t.height>0&&(Math.abs(this.power.clientWidth-this.built.w)>2||Math.abs(Math.round(t.height)-this.built.h)>2)){this.build();return}let n=window.innerHeight-t.bottom;Object.assign(this.left.style,{right:`${window.innerWidth-t.left+6}px`,bottom:`${n}px`}),Object.assign(this.right.style,{left:`${t.right+6}px`,bottom:`${n}px`})}update(e,t,n=performance.now()){if(!this.widgets.length)return;let r=this.shown=this.damper.update(e,this.s.damp??dg);if(!(n-this.lastDraw<33)&&(this.lastDraw=n,this.layout(n),this.widgets.length))for(let e of this.widgets)e.draw(r,t)}};function Wg(e,t){let n=e.addFolder(`Instruments`);n.close();let r={preset:t.s.preset,damp:t.s.damp??dg};return n.add(r,`preset`,Object.keys(hg)).name(`Layout`).onChange(e=>t.setPreset(e)),n.add(r,`damp`,0,1.5,.05).name(`Damping (s)`).onChange(e=>{t.s.damp=e,t.save()}),n}var Gg=Math.PI/180,Kg=180/Math.PI,qg=`surfski.tilt`,Jg={deadPow:3,maxPow:22,curvePow:1.4,invPow:!1,deadSteer:2,maxSteer:28,curveSteer:1.6,invSteer:!1,deadRoll:3,maxRoll:25,curveRoll:1.4,invRoll:!1,roll:!1,smoothS:.1,powerMode:`absolute`,rateWps:120},Yg=(e,t)=>[e[0]*t[0]-e[1]*t[1]-e[2]*t[2]-e[3]*t[3],e[0]*t[1]+e[1]*t[0]+e[2]*t[3]-e[3]*t[2],e[0]*t[2]-e[1]*t[3]+e[2]*t[0]+e[3]*t[1],e[0]*t[3]+e[1]*t[2]-e[2]*t[1]+e[3]*t[0]],Xg=e=>[e[0],-e[1],-e[2],-e[3]],Zg=(e,t)=>{let n=t*Gg/2,r=Math.sin(n);return[Math.cos(n),e===0?r:0,e===1?r:0,e===2?r:0]},Qg=(e,t,n)=>Yg(Yg(Zg(2,e),Zg(0,t)),Zg(1,n)),$g=(e,t)=>Yg(e,Zg(2,-t));function e_(e){let[t,n,r,i]=e;t<0&&(t=-t,n=-n,r=-r,i=-i);let a=Math.hypot(n,r,i);if(a<1e-9)return[0,0,0];let o=2*Math.atan2(a,t)*Kg;return[n/a*o,r/a*o,i/a*o]}function t_(e,t){let[n,r,i]=e_(Yg(Xg(e),t));return{pitch:-n,steer:-i,roll:r}}function n_(e,t,n=0){let r=e*Gg,i=t*Gg,a=Math.cos(r)*Math.sin(i),o=-Math.sin(r),s=-Math.cos(r)*Math.cos(i),c=n*Gg;return[a*Math.cos(c)-o*Math.sin(c),a*Math.sin(c)+o*Math.cos(c),s]}function r_(e,t){let n=e=>Math.atan2(e[0],-e[1])*Kg,r=e=>Math.asin(Math.max(-1,Math.min(1,-e[2])))*Kg,i=n(t)-n(e);return i=(i+540)%360-180,{pitch:r(t)-r(e),steer:i}}function i_(e,t,n,r=1){let i=Math.abs(e);return i<=t?0:Math.sign(e)*Math.min((i-t)/Math.max(n-t,1e-6),1)**+r}var a_=(e,t,n)=>e>=0?t+e*(n-t):t*(1+e),o_=(e,t)=>+(Math.round(e/t)*t).toFixed(9);function s_(e=globalThis.localStorage){try{return{...Jg,...JSON.parse(e?.getItem(`surfski.tilt`)??`{}`)}}catch{return{...Jg}}}var c_=(e=globalThis)=>{let t=e.screen?.orientation?.angle??e.orientation??0;return(Number(t)%360+360)%360},l_=class{constructor(e=s_(),{env:t=globalThis}={}){this.s=e,this.env=t,this.status=`off`,this.q=null,this.q0=null,this.angle0=null,this.raw={pitch:0,steer:0,roll:0},this.out={power:0,steer:0,roll:0},this.onEv=e=>this.reading(e),this.lastEv=0}save(){try{this.env.localStorage?.setItem(qg,JSON.stringify(this.s))}catch{}}async start(){let e=this.env.DeviceOrientationEvent;if(!e)return this.status=`none`,this.status;if(typeof e.requestPermission==`function`){this.status=`asking`;try{if(await e.requestPermission()!==`granted`)return this.status=`denied`,this.status}catch{return this.status=`denied`,this.status}}return this.env.addEventListener(`deviceorientation`,this.onEv),this.status=`waiting`,this.q0=null,setTimeout(()=>{this.status===`waiting`&&(this.status=`none`)},2500),this.status}stop(){this.env.removeEventListener?.(`deviceorientation`,this.onEv),this.status=`off`,this.out={power:0,steer:0,roll:0}}reading(e){if(e.beta==null||e.gamma==null)return;let t=c_(this.env);this.q=$g(Qg(e.alpha??0,e.beta,e.gamma),t),this.g=n_(e.beta,e.gamma,t),this.hasGyro=e.alpha!=null,this.lastEv=performance.now(),(this.status===`waiting`||this.status===`none`)&&(this.status=`on`),(!this.q0||t!==this.angle0)&&this.setNeutral()}setNeutral(){this.q&&(this.q0=this.q.slice(),this.g0=this.g.slice(),this.angle0=c_(this.env),this.out={power:0,steer:0,roll:0})}sample(e){if(this.status!==`on`||!this.q||!this.q0)return this.out;let t=this.s,n=r_(this.g0,this.g),r=this.raw={pitch:n.pitch,steer:n.steer,roll:this.hasGyro?t_(this.q0,this.q).roll:0},i=1-Math.exp(-e/Math.max(t.smoothS,.001)),a={power:i_(r.pitch,t.deadPow,t.maxPow,t.curvePow)*(t.invPow?-1:1),steer:i_(r.steer,t.deadSteer,t.maxSteer,t.curveSteer)*(t.invSteer?-1:1),roll:t.roll?i_(r.roll,t.deadRoll,t.maxRoll,t.curveRoll)*(t.invRoll?-1:1):0};for(let e of[`power`,`steer`,`roll`])this.out[e]+=(a[e]-this.out[e])*i;return this.out}},u_=`surfski.mouse`,d_={scale:1.5,snap:.2,deadSteer:5,curveSteer:1.5,invSteer:!1,smoothS:.05,lock:!0,gain:.35,aspect:1,fitShare:.66,pos:null};function f_(e=globalThis.localStorage){try{return{...d_,...JSON.parse(e?.getItem(`surfski.mouse`)??`{}`)}}catch{return{...d_}}}var p_=`surfski.touchpad`,m_={...d_,lock:!1,heightShare:.45,aspect:.9,smoothS:.04};function h_(e=globalThis.localStorage){try{return{...m_,...JSON.parse(e?.getItem(`surfski.touchpad`)??`{}`)}}catch{return{...m_}}}var g_=(e,t,n)=>Math.min(n,Math.max(t,e)),__=.04,v_=.66;function y_(e,t,n,r=v_){let i=g_(e/t,.5,2.5);return{aspect:i,gain:g_(Math.round(n*i)/(g_(r,.2,1)*e),.02,5)}}var b_=[.7,1,1.5,1.5,1.5,1.5,1.5,1,.7,.7],x_=b_.reduce((e,t)=>(e.push(e[e.length-1]+t),e),[0]).map((e,t,n)=>e/n[n.length-1]);function S_(e){let t=Math.min(Math.max(e,-3),7)- -3,n=Math.min(Math.floor(t),b_.length-1);return x_[n]+(x_[n+1]-x_[n])*(t-n)}function C_(e){let t=Math.min(Math.max(e,0),1),n=0;for(;n<b_.length-1&&x_[n+1]<t;)n++;return-3+n+(x_[n+1]>x_[n]?(t-x_[n])/(x_[n+1]-x_[n]):0)}var w_=(e,t)=>t*__+(1-S_(e))*t*(1-2*__);function T_(e,t,n,r,i,a=i){return{steer:g_((e-n-i/2)/(i/2),-1,1),level:C_(1-(t-r-a*__)/(a*(1-2*__)))}}var E_=(e,t)=>{let n=Math.round(e);return Math.abs(e-n)<=t?n:e};function D_(e,t){return{level:E_(e.level,t.snap),steer:i_(e.steer*100,t.deadSteer,100,t.curveSteer)*(t.invSteer?-1:1)}}var O_=(e,t)=>`#mZone{display:none;position:fixed;z-index:6;border:1.5px solid rgba(255,255,255,.55);border-radius:10px;background:transparent;cursor:pointer;touch-action:none}
#mZone.on{border-color:#ffd23f;cursor:crosshair} body.mousemode #mZone{display:block} body.dbgopen #mZone{visibility:hidden}
#mZone .mHandle{position:absolute;left:6px;top:-15px;width:40px;height:14px;border-radius:7px 7px 0 0;background:rgba(255,255,255,.55);cursor:grab;touch-action:none;
  display:flex;align-items:center;justify-content:center;color:rgba(5,20,40,.8);font:700 10px/1 system-ui,sans-serif;letter-spacing:1px}
#mZone .mHandle:hover{background:rgba(255,255,255,.8)} #mZone.drag .mHandle{cursor:grabbing}
#mZone .mCal{position:absolute;right:4px;top:-15px;height:14px;padding:0 7px;border-radius:7px 7px 0 0;background:rgba(255,255,255,.55);color:rgba(5,20,40,.85);font:700 9px/14px system-ui,sans-serif;cursor:pointer}
#mZone .mCal:hover{background:rgba(255,255,255,.85)}
#mZone.cal{border:2px solid #ffd23f;box-shadow:0 0 0 4px rgba(255,210,63,.35),0 0 28px 6px rgba(255,210,63,.55);z-index:30}`.replaceAll(`#mZone`,`#${e}`).replace(`body.mousemode`,`body.${t}`),k_=class{constructor(e=f_(),{env:t=globalThis,touch:n=!1}={}){this.s=e,this.env=t,this.touch=n,this.key=n?p_:u_,this.engaged=!1,this.locked=!1,this.raw={level:4,steer:0},this.sm={level:4,steer:0},this.out={level:4,steer:0},this.p=null;let r=this.doc=t.document,i=r.createElement(`style`),a=n?`tZone`:`mZone`;i.textContent=O_(a,n?`touchmode`:`mousemode`),r.head.appendChild(i),this.el=r.createElement(`div`),this.el.id=a,this.cv=r.createElement(`canvas`),this.el.appendChild(this.cv),r.body.appendChild(this.el),this.handle=r.createElement(`div`),this.handle.className=`mHandle`,this.handle.title=`Drag to move`,this.handle.textContent=`⋮⋮⋮`,this.el.appendChild(this.handle),this.handle.addEventListener(`pointerdown`,e=>this.dragStart(e)),this.calBtn=r.createElement(`div`),this.calBtn.className=`mCal`,this.calBtn.textContent=`calibrate`,this.calBtn.title=`Fit the zone to your trackpad or the room you have for the mouse`,this.el.appendChild(this.calBtn),this.calBtn.addEventListener(`pointerdown`,e=>{e.preventDefault(),e.stopPropagation(),this.engaged&&this.release(),this.onCalibrate?this.onCalibrate():this.calibrate()}),n&&(this.calBtn.style.display=`none`),this.resize(),this.el.addEventListener(`pointerdown`,e=>{this.engaged||(e.preventDefault(),e.stopPropagation(),this.engage(e))}),this.onTouchMove=e=>{e.pointerId===this.pid&&(e.preventDefault(),this.p=[e.clientX,e.clientY])},this.onTouchUp=e=>{e.pointerId===this.pid&&this.release()},this.onMove=e=>{if(!this.locked){this.p=[e.clientX,e.clientY];return}let t=this.el.getBoundingClientRect(),n=this.s.gain;this.p=[g_(this.p[0]+e.movementX*n,t.left,t.right),g_(this.p[1]+e.movementY*n,t.top,t.bottom)]},this.onDown=e=>{this.engaged&&(e.preventDefault(),e.stopPropagation(),this.release())},this.onKey=e=>{this.engaged&&e.key===`Escape`&&(e.stopPropagation(),this.release())},r.addEventListener(`pointerlockchange`,()=>{let e=this.locked;this.locked=r.pointerLockElement===this.el,e&&!this.locked&&(this.engaged&&this.release(),this.cal&&this.endCal(!1))}),this.onCalMove=e=>{let t=this.cal;t&&(t.x+=e.movementX,t.y+=e.movementY,t.x0=Math.min(t.x0,t.x),t.x1=Math.max(t.x1,t.x),t.y0=Math.min(t.y0,t.y),t.y1=Math.max(t.y1,t.y))},this.onCalDown=e=>{this.cal&&(e.preventDefault(),e.stopPropagation(),this.endCal(!0))},this.placeT=-1,typeof window<`u`&&(window[n?`__touchpad`:`__mouse`]=this)}save(){try{this.env.localStorage?.setItem(this.key,JSON.stringify(this.s))}catch{}}get w(){return Math.round(this.h*g_(this.s.aspect??1,.5,2.5))}get h(){return this.hpx??135}fitHeight(){if(this.touch){let e=Math.round(g_(this.env.innerHeight*(this.s.heightShare??.45),110,this.env.innerHeight-60));e!==this.hpx&&(this.hpx=e,this.resize());return}let e=this.doc,t=[...e.querySelectorAll(`.instr-slot`)].map(e=>e.getBoundingClientRect().height).filter(e=>e>0),n=t.length?Math.max(...t):e.getElementById(`power`)?.getBoundingClientRect().height||90,r=Math.round(g_(n*(this.s.scale??1.5),80,this.env.innerHeight-60));r!==this.hpx&&(this.hpx=r,this.resize())}resize(){let e=this.w,t=this.h,n=Math.min(this.env.devicePixelRatio||1,2);this.cv.width=Math.round(e*n),this.cv.height=Math.round(t*n),this.cv.style.width=`${e}px`,this.cv.style.height=`${t}px`,this.cv.style.display=`block`,this.ctx=this.cv.getContext(`2d`),this.ctx.setTransform(n,0,0,n,0,0),this.placeT=-1}place(e=performance.now()){if(this.dragging||e-this.placeT<500)return;this.placeT=e,this.fitHeight();let t=this.doc,n=this.w,r=this.h,i=this.env.innerWidth,a=this.env.innerHeight,o,s;if(this.s.pos)o=this.s.pos.x*i,s=this.s.pos.y*a;else if(this.touch)o=i-n-16,s=16;else{let e=t.getElementById(`power`)?.getBoundingClientRect(),r=[...t.querySelectorAll(`.instr-slot`)].map(e=>e.getBoundingClientRect()).filter(e=>e.width>0),c=Math.min(e?.width?e.left:i/2,...r.map(e=>e.left)),l=Math.max(e?.width?e.right:i/2,...r.map(e=>e.right));s=e?.height?a-e.bottom:12,o=c-14-n,o<8&&(o=l+14),o+n>i-8&&(o=(e?.width?e.left+e.width/2:i/2)-n/2,s=e?.height?a-e.top+20:140)}o=g_(o,4,i-n-4),s=g_(s,4,a-r-20),Object.assign(this.el.style,{left:`${Math.round(o)}px`,bottom:`${Math.round(s)}px`,width:`${n}px`,height:`${r}px`})}dragStart(e){if(this.engaged)return;e.preventDefault(),e.stopPropagation();let t=this.el.getBoundingClientRect(),n=this.env.innerHeight,r=e.clientX-t.left,i=t.bottom-e.clientY;this.dragging=!0,this.el.classList.add(`drag`);let a=e=>{let t=g_(e.clientX-r,4,this.env.innerWidth-this.w-4),a=g_(n-e.clientY-i,4,n-this.h-20);Object.assign(this.el.style,{left:`${Math.round(t)}px`,bottom:`${Math.round(a)}px`})},o=()=>{this.env.removeEventListener(`pointermove`,a,!0),this.env.removeEventListener(`pointerup`,o,!0);let e=this.el.getBoundingClientRect();this.s.pos={x:e.left/this.env.innerWidth,y:(n-e.bottom)/n},this.save(),this.dragging=!1,this.el.classList.remove(`drag`),this.placeT=-1};this.env.addEventListener(`pointermove`,a,!0),this.env.addEventListener(`pointerup`,o,!0)}capture(){let e=e=>{try{return Promise.resolve(e?this.el.requestPointerLock(e):this.el.requestPointerLock())}catch(e){return Promise.reject(e)}};return this.el.requestPointerLock?e({unadjustedMovement:!0}).then(()=>(this.rawMove=!0,!0),()=>e().then(()=>(this.rawMove=!1,!0),()=>!1)):Promise.resolve(!1)}calibrate(){this.engaged&&this.release(),this.cal={x:0,y:0,x0:0,x1:0,y0:0,y1:0},this.el.classList.add(`on`,`cal`),this.env.addEventListener(`pointermove`,this.onCalMove,!0),this.env.addEventListener(`pointerdown`,this.onCalDown,!0),this.capture().then(e=>{e||this.endCal(!1)})}endCal(e){let t=this.cal;if(!t)return;this.cal=null,this.el.classList.remove(`on`,`cal`),this.env.removeEventListener(`pointermove`,this.onCalMove,!0),this.env.removeEventListener(`pointerdown`,this.onCalDown,!0),this.doc.pointerLockElement===this.el&&this.doc.exitPointerLock?.();let n=t.x1-t.x0,r=t.y1-t.y0;e&&n>40&&r>25&&(Object.assign(this.s,y_(n,r,this.h,this.s.fitShare??.66)),this.resize(),this.save(),this.fitted={sx:n,sy:r,rawMove:this.rawMove}),this.onFit?.(e?this.fitted:null)}engage(e){this.engaged=!0,this.p=[e.clientX,e.clientY],this.el.classList.add(`on`);let t=this.el.getBoundingClientRect(),n=T_(e.clientX,e.clientY,t.left,t.top,t.width,t.height);if(this.sm={...n},this.touch){this.pid=e.pointerId;try{this.el.setPointerCapture?.(e.pointerId)}catch{}this.env.addEventListener(`pointermove`,this.onTouchMove,!0),this.env.addEventListener(`pointerup`,this.onTouchUp,!0),this.env.addEventListener(`pointercancel`,this.onTouchUp,!0)}else this.env.addEventListener(`pointermove`,this.onMove,!0),this.env.addEventListener(`pointerdown`,this.onDown,!0),this.env.addEventListener(`keydown`,this.onKey,!0),this.s.lock&&this.capture()}release(){this.engaged&&(this.engaged=!1,this.el.classList.remove(`on`),this.out={level:this.out.level,steer:0},this.sm.steer=0,this.touch?(this.env.removeEventListener(`pointermove`,this.onTouchMove,!0),this.env.removeEventListener(`pointerup`,this.onTouchUp,!0),this.env.removeEventListener(`pointercancel`,this.onTouchUp,!0),this.pid=null):(this.env.removeEventListener(`pointermove`,this.onMove,!0),this.env.removeEventListener(`pointerdown`,this.onDown,!0),this.env.removeEventListener(`keydown`,this.onKey,!0),this.doc.pointerLockElement===this.el&&this.doc.exitPointerLock?.()))}sample(e){if(this.place(),!this.engaged||!this.p)return this.out;let t=this.el.getBoundingClientRect(),n=this.raw=T_(this.p[0],this.p[1],t.left,t.top,t.width,t.height),r=1-Math.exp(-e/Math.max(this.s.smoothS,.001));for(let e of[`level`,`steer`])this.sm[e]+=(n[e]-this.sm[e])*r;return this.out=D_(this.sm,this.s),this.out}draw(){let{ctx:e}=this,t=this.w,n=this.h,r=t/2,i=this.s,a=e=>w_(e,n);e.clearRect(0,0,t,n),e.globalAlpha=.2,e.fillStyle=ls,e.fillRect(0,a(4),t,a(0)-a(4));for(let n=4;n<7;n++){let r=n===6?0:a(n+1);e.fillStyle=us(n+.5),e.fillRect(0,r,t,a(n)-r)}for(let r=0;r<3;r++)e.fillStyle=ds(r+1),e.fillRect(0,a(-r),t,(r===2?n:a(-r-1))-a(-r));e.globalAlpha=1,e.font=`600 8px system-ui, -apple-system, sans-serif`,e.textAlign=`left`,e.shadowColor=`rgba(0,0,0,.7)`,e.shadowBlur=2;for(let n=-3;n<=7;n++){let r=Math.round(a(n))+.5,i=n===4;e.strokeStyle=i?`rgba(255,255,255,.6)`:n===0?`rgba(255,255,255,.4)`:`rgba(255,255,255,.16)`,e.lineWidth=i?1.5:1,e.beginPath(),e.moveTo(14,r),e.lineTo(t-4,r),e.stroke()}let o=[];for(let t of[4,0,1,2,3,-1,5,-2,7,-3,6]){let n=Math.round(a(t))+.5;o.some(e=>Math.abs(e-n)<8.5)||(o.push(n),e.fillStyle=t===4?`#fff`:`rgba(255,255,255,.7)`,e.fillText(String(t),3,n+3))}e.strokeStyle=`rgba(255,255,255,.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(r,4),e.lineTo(r,n-4),e.stroke();let s=i.deadSteer/100*r;e.fillStyle=`rgba(255,255,255,.08)`,e.fillRect(r-s,0,s*2,n),this.engaged&&(e.fillStyle=`rgba(255,255,255,.45)`,e.beginPath(),e.arc(r+this.raw.steer*r,a(this.raw.level),4,0,2*Math.PI),e.fill());let c=this.engaged?this.out:this.follow;if(c&&!this.cal&&(e.fillStyle=`#ffd23f`,e.globalAlpha=this.engaged?1:.85,e.beginPath(),e.arc(r+g_(c.steer,-1,1)*r,a(c.level),6,0,2*Math.PI),e.fill(),e.globalAlpha=1),e.font=`600 11px system-ui, -apple-system, sans-serif`,e.textAlign=`center`,e.fillStyle=`rgba(255,255,255,.9)`,e.shadowBlur=3,this.cal){e.font=`600 10px system-ui, -apple-system, sans-serif`;let i=[],a=`Move over all the room you have (the trackpad, or the mouse pad): side to side, top to bottom, then click.`.split(` `);for(let n of a){let r=i[i.length-1];r!=null&&e.measureText(`${r} ${n}`).width<=t-16?i[i.length-1]=`${r} ${n}`:i.push(n)}i.push(`${Math.round(this.cal.x1-this.cal.x0)} × ${Math.round(this.cal.y1-this.cal.y0)}`,`Esc cancels`);let o=n/2-i.length*13/2;e.fillStyle=`rgba(5,20,40,.8)`,e.fillRect(4,o-4,t-8,i.length*13+8),e.fillStyle=`#fff`,i.forEach((t,n)=>e.fillText(t,r,o+(n+.8)*13))}else if(!(this.engaged&&this.touch)){if(this.engaged){e.font=`600 9px system-ui, -apple-system, sans-serif`,e.textAlign=`right`;let r=e.measureText(`Space: pause`).width+e.measureText(`click or Esc: let go`).width+16<=t;e.fillText(`click or Esc: let go`,t-6,r?n-5:n-16)}else{let n=this.touch?[`touch and hold:`,`up and down power,`,`left and right steer`]:[`click for mouse/trackpad control`,`or use arrow keys`],i=11,o=()=>(e.font=`600 ${i}px system-ui, -apple-system, sans-serif`,n.every(n=>e.measureText(n).width<=t-22));for(;!o()&&i>8.5;)i-=.5;if(!o()&&!this.touch)for(n=[`click for`,`mouse/trackpad control`,`or use arrow keys`],i=11;!o()&&i>7;)i-=.5;let s=a(2.4)+4-(n.length-2)*(i+3)/2;n.forEach((t,n)=>e.fillText(t,r+6,s+n*(i+3)))}}!this.cal&&!this.touch&&(e.font=`600 9px system-ui, -apple-system, sans-serif`,e.textAlign=`left`,e.fillStyle=`rgba(255,255,255,.9)`,e.shadowBlur=3,e.fillText(`Space: pause`,5,n-5)),e.shadowBlur=0}},A_=`surfski.battery`,j_=e=>{try{return e?.getItem(A_)===`1`}catch{return!1}},M_=(e,t)=>{try{e?.setItem(A_,t?`1`:`0`)}catch{}},N_=`surfski.experience`,P_=2.23694;function F_(e,t,n=globalThis.localStorage){let r=e?.get?.(`experience`);if(r===`casual`||r===`full`)return r;try{let e=n?.getItem(N_);if(e===`casual`||e===`full`)return e}catch{}return t===`phone`?`casual`:`full`}var I_={"shilshole-meadow-can6":`ok`,"shilshole-westpoint-goldengardens":`ok`,"shilshole-meadow-westpoint":`ok`,"gorge-swellcity":`ok`,"gorge-bobs-beach":`ok`,"tarifa-poniente":`ok`,"perth-doctor":`ok`,kaiwi:`fewer`,"perth-sunset":`fewer`,"perth-north-beaches":`fewer`,"perth-hillarys-laps":`fewer`,"perth-trigg-sorrento":`fewer`},L_=`
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
#cMenu .x { position: sticky; top: 0; float: right; width: 40px; height: 40px; border-radius: 20px; border: 0; background: rgba(255,255,255,.12); color: #fff; font-size: 18px; }
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
`;function $(e,t={},...n){let r=document.createElement(e);for(let[e,n]of Object.entries(t))e===`class`?r.className=n:e.startsWith(`on`)?r.addEventListener(e.slice(2),n):r.setAttribute(e,n);return r.append(...n),r}var R_=class{constructor(e,t){this.tilt=e,this.size=112;let n=Math.min(window.devicePixelRatio||1,2);this.cv=$(`canvas`,{id:`cTilt`}),this.cv.width=this.size*n,this.cv.height=this.size*n,this.cv.style.width=this.cv.style.height=`${this.size}px`,this.ctx=this.cv.getContext(`2d`),this.ctx.scale(n,n),this.cv.addEventListener(`pointerdown`,e=>{e.preventDefault(),t()})}draw(){let{ctx:e,size:t}=this,n=t/2,r=n-6,i=this.tilt,a=i.s;e.clearRect(0,0,t,t),e.fillStyle=`rgba(5, 20, 40, .62)`,e.beginPath(),e.arc(n,n,r+4,0,2*Math.PI),e.fill(),e.strokeStyle=`rgba(255,255,255,.35)`,e.lineWidth=1,e.beginPath(),e.arc(n,n,r,0,2*Math.PI),e.moveTo(n-r,n),e.lineTo(n+r,n),e.moveTo(n,n-r),e.lineTo(n,n+r),e.stroke();let o=a.deadSteer/a.maxSteer*r,s=a.deadPow/a.maxPow*r;e.fillStyle=`rgba(255,255,255,.10)`,e.fillRect(n-o,n-s,o*2,s*2);let c=t=>{e.fillStyle=`#fff`,e.font=`600 11px system-ui, sans-serif`,e.textAlign=`center`,e.fillText(t,n,n+4)};if(i.status!==`on`){c({off:`tap: tilt on`,asking:`allow…`,denied:`not allowed`,waiting:`waiting…`,none:`no sensor`}[i.status]??i.status);return}let l=i.raw,u=n+Math.max(-1.15,Math.min(1.15,l.steer/a.maxSteer))*r,d=n-Math.max(-1.15,Math.min(1.15,l.pitch/a.maxPow))*r;e.fillStyle=`rgba(255,255,255,.35)`,e.beginPath(),e.arc(u,d,5,0,2*Math.PI),e.fill();let f=i.out,p=n+f.steer*r,m=n-f.power*r;if(e.fillStyle=`#ffd23f`,e.beginPath(),e.arc(p,m,7,0,2*Math.PI),e.fill(),a.roll){let t=-Math.PI/2+f.roll*Math.PI/4;e.strokeStyle=`#7fe3ff`,e.lineWidth=4,e.beginPath(),e.arc(n,n,r+1,t-.12,t+.12),e.stroke()}e.fillStyle=`#fff`,e.beginPath(),e.arc(n,n,4,0,2*Math.PI),e.fill()}},z_=class{constructor(e,t,{storage:n=globalThis.localStorage}={}){this.api=e,this.storage=n,this.on=t===`casual`;let r=new URLSearchParams(globalThis.location?.search??``).get(`controls`),i=e=>[`tilt`,`hybrid`,`buttons`,`mouse`,`touchpad`].includes(e)?e:null,a=(()=>{try{return!!globalThis.matchMedia?.(`(pointer: fine)`).matches}catch{return!1}})()?`mouse`:`buttons`;this.controls=i(r)??(()=>{try{return i(n?.getItem(`surfski.controls`))??a}catch{return a}})(),this.tilt=new l_(s_(n)),this.lastSteer=null,this.lastW=null,this.lastSend=0,this.rateW=null,this.mouse=new k_(f_(n)),this.mouse.onCalibrate=()=>this.calibrateMouse(),this.touchpad=new k_(h_(n),{touch:!0}),this.battery=j_(n),document.head.appendChild($(`style`,{},L_)),this.buildTop(),this.buildMenu(),this.buildPop(),this.pad=new R_(this.tilt,()=>this.tapPad()),document.body.appendChild(this.pad.cv),this.hint=$(`div`,{id:`cHint`,onclick:()=>{document.body.classList.remove(`hintportrait`);try{n?.setItem(`surfski.hintportrait`,`1`)}catch{}}},`Turn your phone sideways for the best view of the sea`,$(`div`,{style:`font-size:12px;opacity:.7;margin-top:6px`},`tap to close`)),document.body.appendChild(this.hint);let o=document.querySelector(`#intro .btns`);o&&o.before($(`p`,{class:`cIntro`},`◀ ▶ steer · ▲ more power · ▼ ease off · ☰ courses, seas and tilt controls`)),this.apply()}save(){try{this.storage?.setItem(N_,this.on?`casual`:`full`),this.storage?.setItem(`surfski.controls`,this.controls)}catch{}}apply(){let e=document.body,t=this.controls,n=t===`tilt`||t===`hybrid`;e.classList.toggle(`casual`,this.on),e.classList.toggle(`tiltmode`,n),e.classList.toggle(`hybrid`,t===`hybrid`),e.classList.toggle(`mousemode`,t===`mouse`),e.classList.toggle(`touchmode`,t===`touchpad`);let r=!1;try{r=this.storage?.getItem(`surfski.hintportrait`)===`1`}catch{}if(e.classList.toggle(`hintportrait`,this.on&&!r),this.on){let e=this.help();this.api.quiet?.(`guide`,e.guide),this.api.quiet?.(`coaching`,e.coaching)}t!==`tilt`&&this.lastW!=null&&(this.api.fp()?.setPower(null),this.lastW=null),t!==`mouse`&&this.mouse.release(),t!==`touchpad`&&this.touchpad.release(),n||(this.lastSteer!=null&&this.api.fp()?.setSteer(0),this.lastSteer=null,this.tilt.stop()),this.api.onExperience?.(this.on),this.syncGui?.()}setOn(e){this.on=e,this.save(),this.apply()}help(){try{return{guide:!1,coaching:!1,...JSON.parse(this.storage?.getItem(`surfski.casualHelp`)??`{}`)}}catch{return{guide:!1,coaching:!1}}}setBattery(e){this.battery=!!e,M_(this.storage,this.battery),this.api.onBattery?.(this.battery)}setHelp(e,t){let n={...this.help(),[e]:t};try{this.storage?.setItem(`surfski.casualHelp`,JSON.stringify(n))}catch{}e===`guide`?this.api.setGuide(t):this.api.setCoaching(t)}setControls(e){this.controls=e,this.save(),this.apply(),(e===`tilt`||e===`hybrid`)&&this.tilt.status!==`on`&&this.tapPad(),this.refresh()}refresh(){document.body.classList.contains(`cmenu`)&&this.fillMenu(),document.body.classList.contains(`ctlpop`)&&this.fillPop(),this.tab?.isConnected&&this.fillControlsTab(this.tab.parentNode)}buildTop(){let e=this.api;this.cmp=new Ag(Math.min(440,Math.round(window.innerWidth*.5))),this.spd=$(`div`,{class:`spd`},$(`b`,{},`0.0`),$(`small`,{},`mph · – fps`)),this.bPlay=$(`button`,{class:`cb`,title:`Pause or resume`,onclick:()=>e.togglePlay()},`▶`),this.bFull=$(`button`,{class:`cb`,title:`Full screen`,onclick:()=>{if(e.fullscreen(),this.controls===`tilt`)try{screen.orientation?.lock?.(`landscape`).catch(()=>{})}catch{}}},`⛶`),this.bSound=$(`button`,{class:`cb`,title:`Sound on or off`,onclick:()=>{e.toggleSound(),this.bSound.textContent=e.soundOn()?`🔊`:`🔇`}},`🔊`);let t=$(`button`,{class:`cb`,title:`Menu`,onclick:()=>this.openMenu()},`☰`),n=$(`button`,{class:`cb`,title:`Controls`,onclick:()=>this.togglePop()},`🕹`);this.top=$(`div`,{id:`cTop`},t,$(`div`,{class:`cmp`},this.cmp.cv),this.spd,n,this.bPlay,this.bFull,this.bSound),document.body.appendChild(this.top),this.res=$(`span`,{id:`cRes`},``),document.querySelector(`#power .row`)?.appendChild(this.res),addEventListener(`resize`,()=>{let e=Math.min(440,Math.round(window.innerWidth*.5));if(Math.abs(e-this.cmp.w)>4){let t=new Ag(e);this.cmp.cv.replaceWith(t.cv),this.cmp=t}})}buildMenu(){this.menu=$(`div`,{id:`cMenu`}),document.body.appendChild(this.menu)}openMenu(){this.wasLive=this.api.isLive(),this.wasLive&&this.api.togglePlay(),this.fillMenu(),document.body.classList.add(`cmenu`)}closeMenu(e=!0){document.body.classList.remove(`cmenu`),e&&(this.wasLive||this.api.isStart())&&(this.api.isLive()||this.api.togglePlay())}fillMenu(){let e=this.api,t=e.current(),n=this.menu;n.textContent=``;let r=(e,t,n,r=null,i=!1)=>$(`button`,{class:`chip${t?` on`:``}${i?` dim`:``}`,onclick:()=>{n(),this.fillMenu()}},e,...r?[r]:[]),i=$(`div`,{class:`secs`}),a=(e,...t)=>{let n=$(`section`,{},$(`h3`,{},e),...t);e===`Course`&&(n.className=`wide`),i.append(n)};n.append($(`button`,{class:`x`,onclick:()=>this.closeMenu(!0)},`✕`)),n.append($(`div`,{class:`big`},$(`button`,{onclick:()=>this.closeMenu(!0)},e.isStart()?`▶ Paddle`:`▶ Resume`),$(`button`,{class:`alt`,onclick:()=>{e.restart(),this.closeMenu(!1)}},`↺ Restart`)));let o=new Map;for(let t of e.courses())o.has(t.place)||o.set(t.place,[]),o.get(t.place).push(t);let s=[];for(let[n,i]of o)s.push($(`div`,{class:`note`},e.placeLabel(n)),$(`div`,{class:`row`},...i.map(n=>{let i=I_[n.id],a=i===`heavy`?$(`span`,{class:`bd`},`⚠ heavy`):i===`fewer`?$(`span`,{class:`bd`},`fewer boats`):null;return r(n.short??n.label,n.name===t.course,()=>{(i!==`heavy`||confirm(`This course is heavy for a phone and may run under 30 fps. Load it anyway?`))&&e.pickCourse(n.name)},a,i===`heavy`)})));a(`Course`,...s),a(`Sea`,$(`div`,{class:`row`},...e.seas().map(n=>r(n.name,n.id===t.sea,()=>e.pickSea(n.id))))),a(`Paddler`,$(`div`,{class:`row`},...e.paddlers().map(n=>r(n,n===t.paddler,()=>e.pickPaddler(n))))),a(`Competitors`,$(`div`,{class:`row`},...[0,1,2,3,4].map(n=>r(n===0?`None`:String(n),n===t.field,()=>e.pickField(n))))),a(`Time and weather`,$(`div`,{class:`row`},...e.weathers().map(n=>r(n,n===t.weather,()=>e.pickWeather(n))))),a(`Help on the water`,$(`div`,{class:`row`},r(`Guide arrow`,t.guide,()=>this.setHelp(`guide`,!t.guide)),r(`Coach`,t.coaching,()=>this.setHelp(`coaching`,!t.coaching)),r(`Autopilot`,t.autopilot,()=>e.setAutopilot(!t.autopilot)))),a(`Controls`,...this.controlsSection()),a(`Smoothness`,$(`div`,{class:`row`},r(`Full speed (up to 60 fps)`,!this.battery,()=>this.setBattery(!1)),r(`Battery mode (30 fps lock)`,this.battery,()=>this.setBattery(!0))),$(`div`,{class:`note`},`The guide arrow and the coach use the route planner, which costs the phone time each frame.`)),a(`Sound`,(()=>{let t=$(`input`,{type:`range`,min:`0`,max:`100`,step:`5`});return t.value=String(e.volume()),t.addEventListener(`input`,()=>e.setVolume(Number(t.value))),$(`label`,{class:`sl`},`Volume`,t,$(`span`,{},``))})()),a(`More`,$(`div`,{class:`row`},r(`Full experience: all settings, the inset, the sea editor`,!1,()=>{this.setOn(!1),this.closeMenu(!1),e.openFull()})),$(`div`,{class:`note`},`Casual keeps the picture sharp and the motion smooth: 30 frames a second at full resolution, cutting effects first.`)),n.append(i)}tiltSettings(){let e=this.tilt.s,t=[$(`div`,{class:`note`},`Hold the phone as you like and tap the white dot to make that neutral. Tip the top edge away for more power, back for less; turn it like a steering wheel for the rudder. ${this.tilt.status===`on`?``:`Tilt: ${this.tilt.status}.`} On an iPhone, turn on the rotation lock so the screen does not flip.`)],n=(t,n,r,i,a,o=`°`)=>{let s=$(`input`,{type:`range`,min:String(r),max:String(i),step:String(a)}),c=$(`span`,{},`${e[t]}${o}`);return s.value=String(e[t]),s.addEventListener(`input`,()=>{e[t]=Number(s.value),c.textContent=`${e[t]}${o}`,this.tilt.save()}),$(`label`,{class:`sl`},n,s,c)},r=(t,n)=>$(`button`,{class:`chip${e[t]?` on`:``}`,onclick:()=>{e[t]=!e[t],this.tilt.save(),this.refresh()}},n);return t.push(n(`deadPow`,`Power dead zone`,0,10,.5),n(`maxPow`,`Power full at`,8,45,1),n(`curvePow`,`Power curve`,1,3,.1,``),n(`deadSteer`,`Rudder dead zone`,0,10,.5),n(`maxSteer`,`Rudder full at`,8,60,1),n(`curveSteer`,`Rudder curve`,1,3,.1,``),n(`smoothS`,`Smoothing`,.02,.5,.02,` s`),$(`div`,{class:`row`},r(`invPow`,`Invert power`),r(`invSteer`,`Invert rudder`),r(`roll`,`Roll axis (shown only)`),$(`button`,{class:`chip${e.powerMode===`rate`?` on`:``}`,onclick:()=>{e.powerMode=e.powerMode===`rate`?`absolute`:`rate`,this.tilt.save(),this.refresh()}},e.powerMode===`rate`?`Power: tip to climb (rate)`:`Power: tip sets it (absolute)`),$(`button`,{class:`chip`,onclick:()=>{Object.assign(e,Jg),this.tilt.save(),this.refresh()}},`Defaults`),$(`button`,{class:`chip`,onclick:()=>{this.tilt.setNeutral()}},`Set neutral now`))),e.roll&&t.push(n(`deadRoll`,`Roll dead zone`,0,10,.5),n(`maxRoll`,`Roll full at`,8,45,1),$(`div`,{class:`row`},r(`invRoll`,`Invert roll`))),t}schemes(){let e=globalThis.navigator??{},t=e=>{try{return!!globalThis.matchMedia?.(e).matches}catch{return!1}},n=(e.maxTouchPoints??0)>0,r=t(`(any-pointer: fine)`)||!n,i=n&&`DeviceOrientationEvent`in globalThis,a=[[`buttons`,n&&!r?`Buttons`:`Keys`]];return(r||this.controls===`mouse`)&&a.push([`mouse`,`Mouse / trackpad`]),(n||this.controls===`touchpad`)&&a.push([`touchpad`,`Touch pad`]),(i||this.controls===`tilt`)&&a.push([`tilt`,`Tilt`]),(i||this.controls===`hybrid`)&&a.push([`hybrid`,`Tilt rudder, button power`]),a}controlsSection(){let e=[$(`div`,{class:`row`},...this.schemes().map(([e,t])=>$(`button`,{class:`chip${this.controls===e?` on`:``}`,onclick:()=>this.setControls(e)},t)))];return this.controls===`tilt`||this.controls===`hybrid`?e.push(...this.tiltSettings()):this.controls===`mouse`?e.push(...this.mouseSettings()):this.controls===`touchpad`?e.push(...this.touchSettings()):e.push($(`div`,{class:`note`},this.schemes()[0][1]===`Keys`?`◀ ▶ steer · ▲ more power · ▼ ease off (and into a brace)`:`The buttons: ◀ ▶ steer, ▲ more power, ▼ ease off.`)),e}mouseSettings(){let e=this.mouse,t=e.s,n=[$(`div`,{class:`note`},`Click in the zone to steer (the pointer is captured: your finger or the mouse moves the yellow dot; Calibrate fits the zone to your trackpad or mouse area, of which it spans the share set below): up and down are the power settings, as the arrow keys step them (brace 3 at the bottom, the glide at 0, tempo 4 on the bright line, 7 at the top), each a detent; left and right of the centre are the rudder, full at the edge. Click anywhere, or Esc, to let go: the rudder centres and the power stays where it was. Drag the tab on its top edge to move it.`)],r=(n,r,i,a,o,s=`%`)=>{let c=$(`input`,{type:`range`,min:String(i),max:String(a),step:String(o)}),l=$(`span`,{},`${t[n]}${s}`);return c.value=String(t[n]),c.addEventListener(`input`,()=>{t[n]=Number(c.value),l.textContent=`${t[n]}${s}`,n===`scale`?(e.placeT=-1,e.place()):n===`aspect`&&e.resize(),e.save()}),$(`label`,{class:`sl`},r,c,l)},i=(n,r)=>$(`button`,{class:`chip${t[n]?` on`:``}`,onclick:()=>{t[n]=!t[n],e.save(),this.refresh()}},r),a=$(`button`,{class:`chip`,onclick:()=>this.calibrateMouse()},`Calibrate: fit my trackpad or mouse area`);return n.push($(`div`,{class:`row`},a,i(`lock`,`Capture the pointer`)),r(`fitShare`,`Zone spans (of the area)`,.3,1,.02,``),r(`gain`,`Pointer speed`,.05,3,.01,`×`),r(`scale`,`Height (× the instruments)`,1,3,.1,`×`),r(`aspect`,`Width : height`,.5,2.5,.05,``),r(`snap`,`Power detents`,0,.45,.05,``),r(`deadSteer`,`Rudder dead zone`,0,25,1),r(`curveSteer`,`Rudder curve`,1,3,.1,``),r(`smoothS`,`Smoothing`,0,.3,.01,` s`),$(`div`,{class:`row`},i(`invSteer`,`Invert rudder`),$(`button`,{class:`chip`,onclick:()=>{t.pos=null,e.placeT=-1,e.save()}},`Back to its place`),$(`button`,{class:`chip`,onclick:()=>{Object.assign(t,d_),e.placeT=-1,e.place(),e.save(),this.refresh()}},`Defaults`))),n}touchSettings(){let e=this.touchpad,t=e.s,n=[$(`div`,{class:`note`},`Put a finger in the pad and keep it there: up and down are the power settings, as the buttons step them (brace 3 at the bottom, the glide at 0, tempo 4 on the bright line, 7 at the top), each a detent; left and right of the centre are the rudder, full at the edge. Lift the finger to let go: the rudder centres and the power stays where it was. Drag the tab on its top edge to move it.`)],r=(n,r,i,a,o,s=`%`)=>{let c=$(`input`,{type:`range`,min:String(i),max:String(a),step:String(o)}),l=$(`span`,{},`${t[n]}${s}`);return c.value=String(t[n]),c.addEventListener(`input`,()=>{t[n]=Number(c.value),l.textContent=`${t[n]}${s}`,n===`heightShare`?(e.placeT=-1,e.place()):n===`aspect`&&e.resize(),e.save()}),$(`label`,{class:`sl`},r,c,l)};return n.push(r(`heightShare`,`Height (of the screen)`,.25,.8,.05,``),r(`aspect`,`Width : height`,.5,2,.05,``),r(`snap`,`Power detents`,0,.45,.05,``),r(`deadSteer`,`Rudder dead zone`,0,25,1),r(`curveSteer`,`Rudder curve`,1,3,.1,``),r(`smoothS`,`Smoothing`,0,.3,.01,` s`),$(`div`,{class:`row`},((n,r)=>$(`button`,{class:`chip${t[n]?` on`:``}`,onclick:()=>{t[n]=!t[n],e.save(),this.refresh()}},r))(`invSteer`,`Invert rudder`),$(`button`,{class:`chip`,onclick:()=>{t.pos=null,e.placeT=-1,e.save()}},`Back to its place`),$(`button`,{class:`chip`,onclick:()=>{Object.assign(t,m_),e.placeT=-1,e.place(),e.save(),this.refresh()}},`Defaults`))),n}calibrateMouse(){let e=this.mouse;this.api.isLive()&&this.api.togglePlay(),this.togglePop(!1),e.onFit=t=>{this.api.toast?.(t?`Calibrated: the zone is the area's shape (${e.s.aspect.toFixed(2)} wide to 1 high) and ${Math.round((e.s.fitShare??.66)*100)}% of the area spans it. Space to go on.${t.rawMove?``:` (The browser gave the accelerated movement: move at an even pace.)`}`:`Not calibrated`),this.refresh()},e.calibrate()}buildPop(){this.pop=$(`div`,{id:`ctlPop`}),document.body.appendChild(this.pop);let e=document.getElementById(`toolbar`);e&&e.insertBefore($(`button`,{id:`tbControls`,title:`Controls: keys, mouse or trackpad, tilt`,onclick:()=>this.togglePop()},`🕹 Controls`),document.getElementById(`tbFull`)),addEventListener(`pointerdown`,e=>{document.body.classList.contains(`ctlpop`)&&!this.pop.contains(e.target)&&!e.target.closest?.(`#tbControls, #cTop .cb`)&&this.togglePop(!1)},!0),addEventListener(`keydown`,e=>{e.key===`Escape`&&document.body.classList.contains(`ctlpop`)&&this.togglePop(!1)})}togglePop(e=!document.body.classList.contains(`ctlpop`)){let t=document.querySelector(`#sidePanel .tabs button[data-tab=controls]`);!this.on&&t&&e?t.click():(document.body.classList.toggle(`ctlpop`,e),e&&this.fillPop())}fillControlsTab(e){e&&(this.tab||=$(`div`,{id:`ctlTab`}),this.tab.parentNode!==e&&e.prepend(this.tab),this.tab.textContent=``,this.tab.append($(`h3`,{},`Control scheme`),...this.controlsSection()))}fillPop(){let e=this.pop;e.textContent=``,e.append($(`button`,{class:`x`,title:`Close`,onclick:()=>this.togglePop(!1)},`✕`),$(`h3`,{},`Controls`),...this.controlsSection())}async tapPad(){let e=this.tilt;e.status===`on`?(e.setNeutral(),this.api.toast?.(`Tilt: neutral set here`)):(await e.start(),e.status===`denied`&&this.api.toast?.(`Tilt was not allowed; the buttons still work (Menu > Controls)`))}updateMouse(e,t=this.mouse){let n=t.sample(e),r=this.api.fp(),i=this.api.prof(),a=performance.now();if(t.engaged&&!t.was&&(this.lastW=null,this.lastSteer=null,this.lastBrace=null),t.was=t.engaged,r&&i&&this.api.isLive()){if(t.engaged&&a-this.lastSend>50){let e=o_(Math.max(-1,Math.min(1,n.steer)),.05);if(e!==this.lastSteer&&(r.setSteer(e),this.lastSteer=e,this.lastSend=a),n.level<=-.5){let e=Math.round(-n.level);e!==this.lastBrace&&(r.setBrace(e),this.lastBrace=e,this.lastW=null,this.lastSend=a)}else{let e=n.level<=0?0:o_(ps(n.level,i._0x903c72,Iu),4);e!==this.lastW&&(r.setPower(e),this.lastW=e,this.lastBrace=null,this.lastSend=a)}}else!t.engaged&&this.lastSteer!=null&&(this.lastSteer&&r.setSteer(0),this.lastSteer=null)}r&&i&&!t.engaged&&(t.follow={level:r.mode===`brace`?-(r.braceLevel||1):r.mode===`paddle`?fs(r.target,i._0x903c72,Iu):0,steer:r.steerIn??0}),t.draw()}update(e,t){if(this.controls===`mouse`)this.updateMouse(t);else if(this.controls===`touchpad`)this.updateMouse(t,this.touchpad);else if(this.controls!==`buttons`){let e=this.tilt.sample(t),n=this.api.fp(),r=this.api.prof(),i=performance.now(),a=this.controls===`hybrid`;if(n&&r&&this.api.isLive()&&this.tilt.status===`on`&&i-this.lastSend>50){let o=o_(Math.max(-1,Math.min(1,e.steer)),.05),s;this.tilt.s.powerMode===`rate`?(this.rateW=Math.max(0,Math.min(r.maxW,(this.rateW??r._0x903c72)+e.power*this.tilt.s.rateWps*t)),s=this.rateW):s=a_(Math.max(-1,Math.min(1,e.power)),r._0x903c72,r.maxW),s=o_(s,4),o!==this.lastSteer&&(n.setSteer(o),this.lastSteer=o,this.lastSend=i),!a&&s!==this.lastW&&(n.setPower(s),this.lastW=s,this.lastSend=i)}this.pad.draw()}if(!this.on||!e)return;this.cmp.draw(e),e.reserve!=null&&(this.res.textContent=`${Math.round(e.reserve*100)}%`),this.spd.firstChild.textContent=(e.sog*P_).toFixed(1),this.spd.lastChild.textContent=`mph · ${Math.round(this.api.fpsNow()||0)} fps`;let n=this.api.isLive();n!==this.lastLive&&(this.lastLive=n,this.bPlay.textContent=n?`⏸`:`▶`)}};function B_(e,t){let n={casual:t.on},r=e.add(n,`casual`).name(`Casual phone experience`).onChange(e=>t.setOn(e));return t.syncGui=()=>{n.casual=t.on,r.updateDisplay()},r}var V_=typeof location<`u`&&typeof URLSearchParams<`u`?new URLSearchParams(location.search).get(`perf`)??``:``,H_=new Set(V_.split(`,`).map(e=>e.trim()).filter(e=>e.startsWith(`-`)).map(e=>e.slice(1))),U_=e=>V_!==`0`&&!H_.has(e),W_=[[.72,1.5],[.35,.72],[.13,.35],[.05,.13],[.0245,.05],[.012,.0245],[.006,.012],[.003,.006]].map(([e,t])=>[e,t,40*e]),G_=2*Math.PI,K_=typeof location<`u`&&new URLSearchParams(location.search).get(`fftfloat`)===`1`?I:mt;function q_(e=5,{fp:t=null,spread:n=1}={}){let r=2048,i=new Float32Array(r*256*4),a=e>>>0,o=()=>{a=a+1831565813>>>0;let e=a;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296},s=()=>Math.sqrt(-2*Math.log(1-o()*.999999))*Math.cos(G_*o());for(let e=0;e<8;e++){let[a,o,c]=W_[e],l=G_/o,u=G_/a,d=new Float32Array(65536),f=new Float32Array(65536),p=0;for(let e=0;e<256;e++)for(let r=0;r<256;r++){let i=(r>=128?r-256:r)*G_/c,a=(e>=128?e-256:e)*G_/c,o=Math.hypot(i,a),p=e*256+r;if(o<l*.8||o>u*1.2)continue;let m=Math.log(o),h=Math.min(1,Math.max(0,(m-Math.log(l*.8))/Math.log(1.25)))*Math.min(1,Math.max(0,(Math.log(u*1.2)-m)/Math.log(1.2))),g=Nt(Math.atan2(-a,-i),K(o,t,n)),_=o**-4*h*g,v=Math.sqrt(_/2);d[p]=s()*v,f[p]=s()*v}for(let e=0;e<256;e++)for(let t=0;t<256;t++){let n=(t>=128?t-256:t)*G_/c,r=(e>=128?e-256:e)*G_/c,i=e*256+t,a=(256-e)%256*256+(256-t)%256;p+=(n*n+r*r)*(d[i]*d[i]+f[i]*f[i]+d[a]*d[a]+f[a]*f[a])}let m=p>0?Math.sqrt(.5/p):0;for(let t=0;t<256;t++)for(let n=0;n<256;n++){let a=t*256+n,o=(256-t)%256*256+(256-n)%256,s=4*(t*r+e*256+n);i[s]=d[a]*m,i[s+1]=f[a]*m,i[s+2]=d[o]*m,i[s+3]=-f[o]*m}}return i}var J_=`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,Y_=`precision highp float; precision highp sampler2D; precision highp int;
const int N = 256; const float TAU = 6.2831853;
layout(location = 0) out highp vec4 oA;
vec2 cmul(vec2 a, vec2 b) { return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x); }
`,X_=Y_+`
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
}`,Z_=Y_+`
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
}`,Q_=Y_+`
layout(location = 1) out highp vec4 oM;
uniform sampler2D uSrc; uniform int uCascade;
void main() {
ivec2 p = ivec2(gl_FragCoord.xy);
vec4 z = texelFetch(uSrc, ivec2(uCascade * N + p.x, p.y), 0);
vec2 s = z.xy;
oA = vec4(s, z.z, 0.0);
oM = vec4(s.x * s.x, s.y * s.y, s.x * s.y, 0.0);
}`,$_=class{constructor(e,t){this.renderer=e,this.water=t,this.first=!0;let n=new Ie(256,256,8,{count:2,type:mt,format:S,depthBuffer:!1,stencilBuffer:!1,minFilter:Ye,magFilter:Be,generateMipmaps:!0,wrapS:d,wrapT:d}),i=typeof location<`u`&&Number(new URLSearchParams(location.search).get(`aniso`))||2;for(let e of n.textures)e.anisotropy=i,e.wrapR=Te,e.wrapS=e.wrapT=d,e.minFilter=Ye,e.magFilter=Be;this.rt=n,this.quad=new he(new M(2,2)),this.quad.frustumCulled=!1,this.scene=new w,this.scene.add(this.quad),this.camera=new r(-1,1,1,-1,0,1);let a=t.uniforms;a.uCS.value=n.textures[0],a.uCM.value=n.textures[1],a.uCT.value=new Float32Array(W_.map(e=>e[2]));let o=2048,s=()=>new De(o,256,{type:K_,format:S,depthBuffer:!1,stencilBuffer:!1,minFilter:se,magFilter:se}),c=new ne(q_(),o,256,S,I);c.minFilter=c.magFilter=se,c.needsUpdate=!0,this.h0=c,this.shapeKey=`null:1`,this.pp=[s(),s()];let l=(e,t)=>new k({vertexShader:J_,fragmentShader:e,uniforms:t,glslVersion:O,depthTest:!1,depthWrite:!1});this.evolveU={uH0:{value:c},uTile:{value:new Float32Array(W_.map(e=>e[2]))},uPhase:{value:0}},this.stageU={uSrc:{value:null},uNs:{value:1},uRows:{value:1}},this.asmU={uSrc:{value:null},uCascade:{value:0}},this.mats={evolve:l(X_,this.evolveU),stage:l(Z_,this.stageU),asm:l(Q_,this.asmU)}}setShape(e){let t=e?.fp??null,n=e?.spread??1,r=`${t==null?`null`:t.toFixed(5)}:${n.toFixed(3)}`;r!==this.shapeKey&&(this.shapeKey=r,this.h0.image.data.set(q_(5,{fp:t,spread:n})),this.h0.needsUpdate=!0)}update(e){let t=this.renderer,n=t.getRenderTarget(),r=t.autoClear,i=this.quad;t.autoClear=!1;let a=(e,n,r)=>{i.material=e,r==null?t.setRenderTarget(n):t.setRenderTarget(n,r),t.render(this.scene,this.camera)};this.evolveU.uPhase.value=e/128%1;let o=0;a(this.mats.evolve,this.pp[0]);for(let e of[1,0])for(let t=1;t<256;t*=2)this.stageU.uSrc.value=this.pp[o].texture,this.stageU.uNs.value=t,this.stageU.uRows.value=e,a(this.mats.stage,this.pp[1-o]),o=1-o;this.asmU.uSrc.value=this.pp[o].texture;for(let e=0;e<8;e++)this.asmU.uCascade.value=e,a(this.mats.asm,this.rt,e);if(t.setRenderTarget(n),t.autoClear=r,this.first){this.first=!1;for(let e of this.rt.textures)e.generateMipmaps=!1}let s=t.getContext();for(let e of this.rt.textures){let n=t.properties.get(e).__webglTexture;t.state.bindTexture(s.TEXTURE_2D_ARRAY,n),s.generateMipmap(s.TEXTURE_2D_ARRAY)}t.state.unbindTexture()}},ev=[{at:0,name:`Cirrus`,low:0,mid:.15,high:1,puff:.8,scale:1,tower:0,towers:0,anvil:0,sheet:.2,base:1200},{at:.25,name:`Fair-weather cumulus`,low:1,mid:.1,high:.12,puff:1,scale:.8,tower:3,towers:.35,anvil:0,sheet:0,base:1100},{at:.45,name:`Towering cumulus`,low:1,mid:.25,high:.15,puff:1,scale:1.1,tower:12,towers:.45,anvil:0,sheet:.1,base:1200},{at:.6,name:`Cumulonimbus`,low:.5,mid:.3,high:.35,puff:.9,scale:1.6,tower:20,towers:.45,anvil:1,sheet:.2,base:1300},{at:.8,name:`Stratocumulus`,low:1,mid:.4,high:.1,puff:.45,scale:1.8,tower:1.5,towers:.2,anvil:0,sheet:.3,base:900},{at:1,name:`Layered (altostratus, stratus)`,low:.7,mid:1,high:.3,puff:0,scale:2.5,tower:0,towers:0,anvil:0,sheet:1,base:700}],tv={low:1200,mid:4500,high:9e3,top:11e3},nv=e=>ev.reduce((t,n)=>Math.abs(n.at-e)<Math.abs(t.at-e)?n:t).name;function rv(e=.35,t=.25,n=.4){let r=Math.min(1,Math.max(0,e)),i=Math.min(1,Math.max(0,t)),a=Math.min(1,Math.max(0,n)),o=0;for(;o<ev.length-2&&i>ev[o+1].at;)o++;let s=ev[o],c=ev[o+1],l=Math.min(1,Math.max(0,(i-s.at)/(c.at-s.at))),u=e=>s[e]+(c[e]-s[e])*l,d=r*u(`low`),f=r*u(`mid`),p=Math.min(1,r*u(`high`)*1.2),m=u(`towers`)*Math.min(1,Math.max(0,(r-.05)/.35)),h=u(`sheet`),g=Math.min(1,d+f*(.5+.4*h)*(1-d)+.15*p*(1-d));return{low:d,mid:f,high:p,variety:a,puff:u(`puff`),scale:u(`scale`),base:u(`base`),tower:u(`tower`)*Math.PI/180,towers:m,anvil:u(`anvil`),sheet:h,opaque:g}}var iv=class{constructor(e){this.cv=e,this.ctx=e.getContext(`2d`),this.widthM=44}draw({ski:e,field:t,time:n,scn:r,frames:i,dt:a,hScale:o=.45,t0:s=0,end:c=r.durationS}){let{cv:l,ctx:u}=this,d=l.width,f=l.height,p={},m=d/this.widthM,h=f*.74,[g,_]=e.forward,v=_,y=-g,b=(t,n)=>{let r=t-e.e,i=n-e.n;return[d/2+(r*v+i*y)*m,h-(r*g+i*_)*m]};this.off||(this.off=document.createElement(`canvas`),this.off.width=this.off.height=48,this.img=this.off.getContext(`2d`).createImageData(48,48));let x=this.imgT==null||n<this.imgT-1e-6||n-this.imgT>=1/15||this.imgWide!==this.widthM||this.imgCv!==`${d}x${f}`;if(!this.job&&x&&(this.job={j:0,time:n,e:e.e,n:e.n,fe:g,fn:_,at:this.imgT==null||n<this.imgT||this.imgWide!==this.widthM?48:16}),this.job){let e=this.job,n=e.fn,r=-e.fe,i=Math.min(48,e.j+e.at),a=this.img.data;for(let s=e.j;s<i;s++)for(let i=0;i<48;i++){let c=(h-(s+.5)*f/48)/m,l=((i+.5)*d/48-d/2)/m,u=e.e+c*e.fe+l*n,g=e.n+c*e.fn+l*r,_=t.mapHeight?t.mapHeight(u,g,e.time):t.sample(u,g,e.time,p).h,v=Math.max(-1,Math.min(1,_/o)),y=(s*48+i)*4;v>=0?(a[y]=40+200*v,a[y+1]=110+135*v,a[y+2]=160+90*v):(a[y]=40+30*v,a[y+1]=110+70*v,a[y+2]=160+70*v),a[y+3]=255}e.j=i,i>=48&&(this.off.getContext(`2d`).putImageData(this.img,0,0),this.pose=e,this.imgT=e.time,this.imgWide=this.widthM,this.imgCv=`${d}x${f}`,this.job=null)}if(u.fillStyle=`rgb(40,110,160)`,u.fillRect(0,0,d,f),this.pose){let e=this.pose,t=e.fn,n=-e.fe,r=(r,i)=>{let a=(h-i)/m,o=(r-d/2)/m;return[e.e+a*e.fe+o*t,e.n+a*e.fn+o*n]},[i,a]=b(...r(0,0)),[o,s]=b(...r(d,0)),[c,l]=b(...r(0,f));u.save(),u.setTransform((o-i)/d,(s-a)/d,(c-i)/f,(l-a)/f,i,a),u.imageSmoothingEnabled=!0,u.imageSmoothingQuality=`medium`,u.drawImage(this.off,0,0,d,f),u.restore()}u.strokeStyle=`rgba(255,255,255,.35)`,u.fillStyle=`rgba(255,255,255,.8)`,u.font=`11px system-ui`,u.textAlign=`left`;for(let e=5;e<=30;e+=5){let t=h-e*m;u.beginPath(),u.moveTo(d/2-14,t),u.lineTo(d/2+14,t),u.stroke(),u.fillText(`${e} m`,d/2+18,t+4)}let S=(e,t,n)=>{u.setLineDash(n),u.beginPath();let r=!0;for(let n=Math.max(0,Math.floor((e-s)/a));n<=Math.min(i.length-1,Math.ceil((t-s)/a));n++){let[e,t]=b(i[n].e,i[n].n);r?(u.moveTo(e,t),r=!1):u.lineTo(e,t)}u.stroke(),u.setLineDash([])};if(u.lineWidth=2,u.strokeStyle=`#ff5a36`,S(Math.max(s,n-30),n,[]),u.strokeStyle=`rgba(255,200,170,.9)`,S(n,c,[5,5]),r.focus){let[e,t]=b(r.focus.e,r.focus.n),i=r.focus.t-n;u.strokeStyle=`#ffd34d`,u.lineWidth=2,u.beginPath(),u.arc(e,t,12,0,7),u.stroke(),u.fillStyle=`#ffd34d`,u.fillText(i>0?`focus in ${i.toFixed(1)} s`:`focus ${(-i).toFixed(1)} s ago`,e+16,t+4)}u.save(),u.translate(d/2,h),u.fillStyle=`#ff5a36`,u.strokeStyle=`#fff`,u.lineWidth=1.5,u.beginPath(),u.moveTo(0,-2.7*m),u.lineTo(.25*m+2,2.7*m),u.lineTo(-.25*m-2,2.7*m),u.closePath(),u.fill(),u.stroke(),u.restore();let C=-e.psi;u.save(),u.translate(d-30,30),u.rotate(C),u.fillStyle=`#fff`,u.beginPath(),u.moveTo(0,-16),u.lineTo(7,6),u.lineTo(-7,6),u.closePath(),u.fill(),u.restore(),u.fillStyle=`#fff`,u.fillText(`N`,d-34,56),u.fillText(`heading-up · ${this.widthM} m wide · light = crest, dark = trough`,8,f-8)}},av=[5,10,20,50,100,200,500,1e3,2e3,5e3,1e4],ov=class{constructor(e){this.cv=e,this.ctx=e.getContext(`2d`),this.cache=new WeakMap}images(e){let t=this.cache.get(e);if(t)return t;let n=e.buildMapCanvas(),r=document.createElement(`canvas`);r.width=e.W,r.height=e.H;let i=r.getContext(`2d`),a=i.createImageData(e.W,e.H),o=e.data,s=e.W,c=e.H;for(let e=1;e<c-1;e++)for(let t=1;t<s-1;t++)o[e*s+t]>0&&(o[e*s+t-1]<=0||o[e*s+t+1]<=0||o[(e-1)*s+t]<=0||o[(e+1)*s+t]<=0)&&a.data.set([255,255,255,235],((c-1-e)*s+t)*4);return i.putImageData(a,0,0),t={map:n,shore:r},this.cache.set(e,t),t}waveStats(e){let t=e.fft??e.base?.fft;if(e._stats&&e._statsFor===t)return e._stats;let n=[];for(let e of t?.sets??[])if(!e.tail)for(let t=0;t<e.n;t++)n.push({lam:2*Math.PI/e.kk[t],v:.5*(e.re[t]**2+e.im[t]**2),c:Math.abs(e.w[t])/e.kk[t]});let r=n.reduce((e,t)=>e+t.v,0)||1;n.sort((e,t)=>e.lam-t.lam);let i=0,a=n[n.length-1]?.lam??50;for(let e of n)if(i+=e.v,i>=.25*r){a=e.lam;break}let o=1;{let e=0;for(let t=n.length-1;t>=0;t--)if(e+=n[t].v,e>=.1*r){o=Math.max(1,n[t].c);break}}return e._stats={lamQ:Math.max(a,4),cMax:o},e._statsFor=t,e._stats}blit(e,t,n,r,i){let{ctx:a,cv:o}=this,s=t.cell,c=t.minE,l=t.minN+t.H*s,u=n(c),d=r(l);t.W*s*i,t.H*s*i;let f=Math.max(0,-u/(s*i)),p=Math.max(0,-d/(s*i)),m=Math.min(t.W-f,o.width/(s*i)+1),h=Math.min(t.H-p,o.height/(s*i)+1);m<=0||h<=0||a.drawImage(e,f,p,m,h,u+f*s*i,d+p*s*i,m*s*i,h*s*i)}updateWaves({ski:e,field:t,time:n,terrain:r,widthM:i,ppm:a}){let{cv:o}=this,s=this.waveStats(t),c=s.lamQ/2.2,l=Math.max(.3,t.hsRef*.6),u={},d=Math.min(i,900,64*c),f=Math.max(32,Math.min(64,Math.ceil(d/c))),p=d/f,m=f+2,h=a*(o.clientWidth/o.width||1),g=Math.min(.25,Math.max(1/60,.96/(s.cMax*h+1e-6))),_=Math.floor((e.e-d/2)/p)*p-p,v=Math.floor((e.n-d/2)/p)*p-p;(!this.waveCv||this.waveCv.width!==m)&&(this.waveCv=document.createElement(`canvas`),this.waveCv.width=this.waveCv.height=m,this.waveImg=this.waveCv.getContext(`2d`).createImageData(m,m),this.waveCache=null);let y=this.waveCache,b=t.state.stokes,x=!y||y.field!==t||y.hs!==l||y.stokes!==b||y.ox!==_||y.oy!==v||y.step!==p||n<y.time||n-y.time>g-1/120,S=this.waveJob;if(S&&(S.field!==t||S.hs!==l||S.stokes!==b||S.ox!==_||S.oy!==v||S.step!==p||n<S.time)&&(S=this.waveJob=null),!S&&x&&(S=this.waveJob={field:t,hs:l,stokes:b,ox:_,oy:v,step:p,time:n,j:0}),S){let e=y&&y.field===t&&y.hs===l&&y.stokes===b&&y.ox===_&&y.oy===v&&y.step===p&&n>=y.time&&g>=.1,i=this.waveImg.data,a=e?Math.ceil(m/4):m,o=Math.min(m,S.j+a);for(let e=S.j;e<o;e++)for(let n=0;n<m;n++){let a=_+(n+.5)*p,o=v+(m-e-.5)*p,s=(e*m+n)*4;if(r&&r.depthAt(a,o)<=.5){i[s+3]=0;continue}let c=Math.min(n,m-1-n)/(.18*m),d=Math.min(e,m-1-e)/(.18*m),f=Math.min(1,c,d),h=f*f*(3-2*f),g=Math.max(-1,Math.min(1,(t.mapHeight?t.mapHeight(a,o,S.time):t.sample(a,o,S.time,u).h)/l));g>0?(i[s]=255,i[s+1]=255,i[s+2]=255,i[s+3]=107*g*h):(i[s]=0,i[s+1]=10,i[s+2]=40,i[s+3]=-102*g*h)}S.j=o,o>=m&&(this.waveCv.getContext(`2d`).putImageData(this.waveImg,0,0),this.waveCache={field:t,hs:l,stokes:b,ox:_,oy:v,step:p,time:S.time},this.waveJob=null)}}draw({ski:e,field:t,time:n,terrain:r,geo:i,frames:a,dt:o,t0:s,widthM:c,wavesToDeg:l,sunAzDeg:u,sunElDeg:d,modelled:f=!1,label:p=``,groups:m=null,gates:h=null,solve:g=null}){let{cv:_,ctx:v}=this,y=_.width,b=_.height,x=y/c,S=Math.max(1,y/280),C=t=>y/2+(t-e.e)*x,w=t=>b/2-(t-e.n)*x,T=this.waveCache;this.updateWaves({ski:e,field:t,time:n,terrain:r,widthM:c,ppm:x});let E=`${y}x${b}|${c}|${Math.round(e.e*x*2)}|${Math.round(e.n*x*2)}|${Math.round(e.psi*90/Math.PI)}|${p}|${i}|${l}|${u}|${g?.sig??``}`,D=performance.now();if(E===this.sig&&T===this.waveCache&&r===this.sigT&&m===this.sigG&&h===this.sigK&&D-this.paintT<500)return;if(this.sig=E,this.sigT=r,this.sigG=m,this.sigK=h,this.paintT=D,v.save(),v.fillStyle=`#0b3a66`,v.fillRect(0,0,y,b),v.imageSmoothingEnabled=!0,v.imageSmoothingQuality=`medium`,r){let e=this.images(r);this.blit(e.map,r,C,w,x),this.blit(e.shore,r,C,w,x)}{let e=this.waveCache;e&&(v.imageSmoothingEnabled=!0,v.drawImage(this.waveCv,C(e.ox),w(e.oy+this.waveCv.width*e.step),this.waveCv.width*e.step*x,this.waveCv.width*e.step*x))}if(g?.show)for(let e of g.blocks){let t=C(e.e0),n=w(e.n0),r=e.size*x;t>y||t+r<0||n<0||n-r>b||(v.fillStyle=e.quick?`rgba(255,214,64,0.22)`:`rgba(90,230,120,0.18)`,v.fillRect(t,n-r,r,r))}let O=(e,t,n,r,i)=>{let a=Math.sin(n*Math.PI/180),o=-Math.cos(n*Math.PI/180),s=e+a*r,c=t+o*r,l=-o,u=a;v.beginPath(),v.moveTo(e-a*r,t-o*r),v.lineTo(s,c),v.moveTo(s,c),v.lineTo(s-a*5*S+l*3.5*S,c-o*5*S+u*3.5*S),v.moveTo(s,c),v.lineTo(s-a*5*S-l*3.5*S,c-o*5*S-u*3.5*S),v.strokeStyle=i,v.lineWidth=1.6*S,v.stroke()},k=(e,t,n,r)=>{v.font=`${10*S}px system-ui, sans-serif`,v.lineWidth=3*S,v.strokeStyle=`rgba(5,20,40,.85)`,v.strokeText(e,t,n),v.fillStyle=r,v.fillText(e,t,n)},A=[];for(let e of m??[]){let t=e.zone;if(!t){A.push(e);continue}let n=t.outside>t.inside?`120,220,255`:`255,214,64`;if(v.save(),v.lineJoin=`round`,v.lineCap=`round`,t.kind===1)v.beginPath(),v.moveTo(C(t.ax),w(t.ay)),v.lineTo(C(t.bx),w(t.by)),v.strokeStyle=`rgba(${n},0.12)`,v.lineWidth=Math.max(1,2*(t.size+t.soft)*x),v.stroke(),v.strokeStyle=`rgba(${n},0.22)`,v.lineWidth=Math.max(1,2*t.size*x),v.stroke();else{let e=C(t.ax),r=w(t.ay),i=t.b0-Math.PI/2,a=i+t.span,o=n=>{v.beginPath(),t.span<2*Math.PI-1e-6&&v.moveTo(e,r),v.arc(e,r,Math.max(1,n*x),i,a),t.span<2*Math.PI-1e-6&&v.closePath()};o(t.size),v.fillStyle=`rgba(${n},0.12)`,v.fill(),o((1-t.soft*.5)*t.size),v.fillStyle=`rgba(${n},0.14)`,v.fill(),o(t.size),v.strokeStyle=`rgba(${n},0.7)`,v.lineWidth=1.2*S,v.setLineDash([4*S,3*S]),v.stroke()}v.restore();let r=t.kind===1?[(t.ax+t.bx)/2,(t.ay+t.by)/2]:[t.ax+Math.sin(t.b0+t.span/2)*t.size*.5,t.ay+Math.cos(t.b0+t.span/2)*t.size*.5],i=C(r[0]),a=w(r[1]);i>-40&&i<y+40&&a>-40&&a<b+40&&(v.save(),O(i,a,e.dirDeg,11*S,`rgb(${n})`),v.textAlign=`center`,k(e.name,i,a+20*S,`rgb(${n})`),v.restore())}A.length&&(v.save(),v.textAlign=`left`,A.forEach((e,t)=>{let n=34*S+t*14*S;O(16*S,n-3*S,e.dirDeg,6*S,`#cfe9ff`),k(`${e.name} · ${e.hsFt.toFixed(1)} ft`,28*S,n,`#cfe9ff`)}),v.restore()),g?.text&&(v.save(),v.textAlign=`left`,k(g.text,10*S,34*S+A.length*14*S,g.done?`#8ef0a8`:`#ffd640`),v.restore());for(let e of h??[]){v.save(),v.strokeStyle=e.next?`rgba(255,220,60,0.95)`:`rgba(255,220,60,0.45)`,v.lineWidth=(e.next?2:1.3)*S,e.next||v.setLineDash([4*S,3*S]),v.beginPath(),v.moveTo(C(e.a.e),w(e.a.n)),v.lineTo(C(e.b.e),w(e.b.n)),v.stroke(),v.setLineDash([]);for(let t of e.buoys??[])v.beginPath(),v.arc(C(t.e),w(t.n),3*S,0,2*Math.PI),v.fillStyle=`#ff8a2a`,v.fill(),v.strokeStyle=`#1b1b1b`,v.lineWidth=.8*S,v.stroke();v.restore()}let j=Math.min(a.length-1,Math.floor((n-s)/o)),M=Math.max(1,Math.floor(j/700));v.strokeStyle=`#ff5a36`,v.lineWidth=2.2*S,v.lineJoin=`round`,v.beginPath();for(let e=0;e<=j;e+=M){let t=a[e];e?v.lineTo(C(t.e),w(t.n)):v.moveTo(C(t.e),w(t.n))}v.lineTo(C(e.e),w(e.n)),v.stroke();let N=Math.max(7*S,6.4*x);v.save(),v.translate(y/2,b/2),v.rotate(e.psi),v.fillStyle=`#ff5a36`,v.strokeStyle=`#fff`,v.lineWidth=1.3*S,v.beginPath(),v.moveTo(0,-N/2),v.lineTo(N*.2,N/2),v.lineTo(-N*.2,N/2),v.closePath(),v.fill(),v.stroke(),v.restore();let P=av[0];for(let e of av)e*x<=y*.3&&(P=e);let F=10*S,I=b-22*S;v.strokeStyle=`#fff`,v.fillStyle=`#fff`,v.lineWidth=2*S,v.font=`${11*S}px system-ui`,v.textAlign=`left`,v.shadowColor=`rgba(0,0,0,.7)`,v.shadowBlur=3*S,v.beginPath(),v.moveTo(F,I),v.lineTo(F+P*x,I),v.moveTo(F,I-4*S),v.lineTo(F,I+4*S),v.moveTo(F+P*x,I-4*S),v.lineTo(F+P*x,I+4*S),v.stroke(),v.fillText(P>=1e3?`${P/1e3} km`:`${P} m`,F,I-8*S),v.fillText(p,10*S,16*S),i&&v.fillText(i,10*S,b-6*S),v.shadowBlur=0;let ee=24*S,L=y-ee-8*S,te=ee+8*S;if(v.fillStyle=`rgba(0,10,30,.55)`,v.strokeStyle=`rgba(255,255,255,.75)`,v.lineWidth=1.2*S,v.beginPath(),v.arc(L,te,ee,0,Math.PI*2),v.fill(),v.stroke(),v.fillStyle=`#fff`,v.textAlign=`center`,v.font=`${10*S}px system-ui`,v.fillText(`N`,L,te-ee+11*S),l!=null&&((e,t,n)=>{v.save(),v.translate(L,te),v.rotate(e*Math.PI/180),v.strokeStyle=v.fillStyle=t,v.lineWidth=2*S,v.beginPath(),v.moveTo(0,n*.5),v.lineTo(0,-n),v.stroke(),v.beginPath(),v.moveTo(0,-n-4*S),v.lineTo(-3.5*S,-n+3*S),v.lineTo(3.5*S,-n+3*S),v.fill(),v.restore()})(l,`#7fe3ff`,ee*.55),u!=null){let e=u*Math.PI/180,t=L+Math.sin(e)*ee,n=te-Math.cos(e)*ee;v.fillStyle=`#ffd34d`,v.beginPath(),v.arc(t,n,3.6*S,0,Math.PI*2),v.fill()}v.restore()}drawLocal({ski:e,terrain:t,widthM:n,gain:r,toDeg:i=0,turns:a=null,status:o=``,label:s=``}){let{cv:c,ctx:l}=this,u=c.width,d=c.height,f=u/n,p=Math.max(1,u/280),m=n/96,h=t=>u/2+(t-e.e)*f,g=t=>d/2-(t-e.n)*f,_=Math.floor((e.e-n/2)/(m*8))*m*8,v=Math.floor((e.n-n*d/u/2)/(m*8))*m*8,y=Math.ceil(96*d/u)+9,b=`${_}|${v}|${m}|105x${y}|${o}|${a?.left??0}|${a?.right??0}`,x=performance.now(),S=this.local??={};if(S.key!==b||x-S.at>2e3){S.key=b,S.at=x,S.ox=_,S.oy=v,S.step=m,(!S.cv||S.cv.width!==105||S.cv.height!==y)&&(S.cv=document.createElement(`canvas`),S.cv.width=105,S.cv.height=y,S.img=S.cv.getContext(`2d`).createImageData(105,y));let e=S.img.data,n=e=>{let t=[[0,[10,30,70]],[.5,[30,120,150]],[1,[205,232,245]],[1.5,[255,140,40]]],n=Math.min(1.5,Math.max(0,e)),r=1;for(;r<t.length-1&&n>t[r][0];)r++;let[i,a]=t[r-1],[o,s]=t[r],c=(n-i)/(o-i);return a.map((e,t)=>e+(s[t]-e)*c)};S.arrows=[];for(let o=0;o<y;o++)for(let s=0;s<105;s++){let c=_+(s+.5)*m,l=v+(y-o-.5)*m,u=(o*105+s)*4;if(t&&t.depthAt(c,l)<=0){e[u+3]=0;continue}let d=r?r(c,l):[1,0,0],f=Math.hypot(d[0],d[1],d[2]),p=n(f);if(e[u]=p[0],e[u+1]=p[1],e[u+2]=p[2],e[u+3]=200,s%8==4&&o%8==4&&f>.05&&(d[1]>.05||d[2]>.05)){let e=d[0]**2+d[1]**2+d[2]**2,t=(d[2]**2*(a?.right??0)-d[1]**2*(a?.left??0))/e;S.arrows.push({e:c,n:l,deg:i+t,r:f})}}S.cv.getContext(`2d`).putImageData(S.img,0,0)}if(l.save(),l.fillStyle=`#0b3a66`,l.fillRect(0,0,u,d),l.imageSmoothingEnabled=!0,t){let e=this.images(t);this.blit(e.map,t,h,g,f)}if(l.drawImage(S.cv,h(S.ox),g(S.oy+S.cv.height*S.step),S.cv.width*S.step*f,S.cv.height*S.step*f),t){let e=this.images(t);this.blit(e.shore,t,h,g,f)}let C=(e,t,n,r,i)=>{let a=Math.sin(n*Math.PI/180),o=-Math.cos(n*Math.PI/180),s=e+a*r,c=t+o*r,u=-o,d=a;l.beginPath(),l.moveTo(e-a*r,t-o*r),l.lineTo(s,c),l.moveTo(s,c),l.lineTo(s-a*4*p+u*3*p,c-o*4*p+d*3*p),l.moveTo(s,c),l.lineTo(s-a*4*p-u*3*p,c-o*4*p-d*3*p),l.strokeStyle=i,l.lineWidth=1.5*p,l.stroke()};for(let e of S.arrows??[])C(h(e.e),g(e.n),e.deg,(3+5*Math.min(1,e.r))*p,`rgba(20,20,30,0.85)`);let w=Math.max(7*p,6.4*f);l.save(),l.translate(u/2,d/2),l.rotate(e.psi),l.fillStyle=`#ff5a36`,l.strokeStyle=`#fff`,l.lineWidth=1.3*p,l.beginPath(),l.moveTo(0,-w/2),l.lineTo(w*.2,w/2),l.lineTo(-w*.2,w/2),l.closePath(),l.fill(),l.stroke(),l.restore(),l.font=`${10*p}px system-ui, sans-serif`,l.textAlign=`left`;let T=(e,t,n,r)=>{l.lineWidth=3*p,l.strokeStyle=`rgba(5,20,40,.85)`,l.strokeText(e,t,n),l.fillStyle=r,l.fillText(e,t,n)};C(u-22*p,22*p,i,10*p,`#ffffff`),T(s||`Wind sea against the open sea`,8*p,14*p,`#fff`),o&&T(o,8*p,27*p,/solved/.test(o)?`#8ef0a8`:`#ffd640`);let E=Math.min(110*p,u*.5),D=8*p,O=d-16*p,k=l.createLinearGradient(D,0,D+E,0);k.addColorStop(0,`rgb(10,30,70)`),k.addColorStop(1/3,`rgb(30,120,150)`),k.addColorStop(2/3,`rgb(205,232,245)`),k.addColorStop(1,`rgb(255,140,40)`),l.fillStyle=k,l.fillRect(D,O,E,6*p),l.strokeStyle=`rgba(255,255,255,.6)`,l.lineWidth=1,l.strokeRect(D,O,E,6*p);for(let[e,t]of[[0,`0`],[2/3,`1`],[1,`1.5`]])T(t,D+E*e-3*p,O-3*p,`#fff`);let A=av[0];for(let e of av)e*f<=u*.3&&(A=e);T(A>=1e3?`${A/1e3} km`:`${A} m`,u-8*p-A*f,d-8*p,`#fff`),l.strokeStyle=`#fff`,l.lineWidth=2*p,l.beginPath(),l.moveTo(u-8*p-A*f,d-16*p),l.lineTo(u-8*p,d-16*p),l.stroke(),l.restore()}};function sv(e,t,n){let r=e.dominant;if(!r.a)return{cw:0,along:1/0,dot:0};let i=r.omega/r.k,a=r.dx*t+r.dy*n;return{cw:i,dot:a,along:a>.2?i/a:1/0,k:r.k,a:r.a}}function cv({ski:e,pose:t=e,field:n,time:r,behind:i=25,ahead:a=55,n:o=220,crest:s=null}){let c=e.p,[l,u]=t.forward,d=c._0x650dee,f=c.mass*c._0xd8add8,p=(e.current?.[0]??0)*l+(e.current?.[1]??0)*u,m=sv(n,l,u),h=s??(Number.isFinite(m.along)?m.along:0),g={},_=new Float64Array(o),v=new Float64Array(o),y=new Float64Array(o),b=new Float64Array(o),x=(i+a)/(o-1),S=.3,C=(e,r)=>n.sample(t.e+l*e,t.n+u*e,r,g);for(let e=0;e<o;e++){_[e]=-i+e*x;let t=C(_[e],r);v[e]=t.h,b[e]=t.ue*l+t.un*u+p,y[e]=C(_[e],r+S).h}let w=Math.max(1,Math.round(d/x)),T=(e,t)=>e[Math.min(o-1,Math.max(0,t))],E=e=>{let t=new Float64Array(o);for(let n=0;n<o;n++){let r=0,i=0;for(let t=n-w;t<=n+w;t++)t>=0&&t<o&&(r+=e[t],i++);t[n]=r/i}return t},D=E(v),O=E(y),k=new Float64Array(o),A=Math.max(2,2*w),j=(e,t)=>{let n=Math.min(Math.max(t,0),o-1),r=Math.floor(n),i=Math.min(o-1,r+1);return e[r]+(e[i]-e[r])*(n-r)},M=[];for(let e=-.6;e<=3.6+1e-9;e+=.1)M.push(e);for(let e=0;e<o;e++){let t=0,n=1/0,r=[];for(let i of M){let a=0;for(let t=Math.max(0,e-A);t<=Math.min(o-1,e+A);t++){let e=j(O,t+i/x)-D[t];a+=e*e}r.push(a),a<n&&(n=a,t=r.length-1)}let i=M[t];if(t>0&&t<r.length-1){let e=r[t-1],n=r[t],a=r[t+1],o=e-2*n+a;o>0&&(i+=.5*(e-a)/o*.1)}k[e]=Math.min(Math.max(i/S,0),12)}let N=new Float64Array(o),P=new Float64Array(o),F=new Float64Array(o),I=new Float64Array(o);for(let e=0;e<o;e++){let t=(T(v,e+w)-T(v,e-w))/(2*w*x);N[e]=Math.atan(-t)*180/Math.PI;let n=(s??k[e])-b[e],r=(c.c2*n*Math.abs(n)+c.c4*n**3*Math.abs(n))*Ml(n,c._0xef6fce),i=-f*Ut*c._0x530f2a*t;F[e]=(i-r)/f,I[e]=r>0?i/r:0,P[e]=Math.atan(r/(f*Ut*c._0x530f2a))*180/Math.PI}let ee=[];for(let e=1;e<o;e++)if(F[e-1]>0&&F[e]<=0){let t=F[e-1]/(F[e-1]-F[e]);ee.push(_[e-1]+t*x)}let L=-1;for(let e=0;e<o;e++)N[e]>1&&(L<0||I[e]>I[L])&&(L=e);let te=ee.length?ee.reduce((e,t)=>Math.abs(t)<Math.abs(e)?t:e):null,R=e=>k[Math.min(o-1,Math.max(0,Math.round((e+i)/x)))];return{x:_,h:v,hs:D,vf:k,chordDeg:N,reqDeg:P,margin:F,ratio:I,eq:ee,hold:te,sweet:L>=0?{x:_[L],ratio:I[L],deg:N[L],reqDeg:P[L],vf:k[L]}:null,holdSpeed:te==null?null:R(te),faceHere:R(0),uC:h,cw:m.cw,dot:m.dot,steepness:m.k?m.k*m.a:0,canHold:ee.length>0,canCatch:h>0}}var lv=.514444,uv={sky:`#cfe6f6`,water:`#0f4c75`,line:`#bfe9ff`,faint:`rgba(191,233,255,0.28)`,ink:`#123`,hold:`#1a9e4b`,sweet:`#ffd23f`,bury:`#e24b3b`,low:`#f0a23a`,ok:`#3fbf6f`},dv=class{constructor(e){this.cv=e,this.ctx=e.getContext(`2d`),this.behind=14,this.ahead=30,this.last=null,this.lastT=-1e9}solve({ski:e,pose:t,field:n,time:r}){let i=performance.now();return(!this.last||i-this.lastT>60||this.lastSki!==e)&&(this.last=cv({ski:e,pose:t,field:n,time:r,behind:this.behind,ahead:this.ahead,n:200}),this.lastT=i,this.lastSki=e),this.last}draw({ski:e,pose:t=e,field:n,time:r}){if(!e){this.ctx.fillStyle=uv.sky,this.ctx.fillRect(0,0,this.cv.width,this.cv.height);return}let{cv:i,ctx:a}=this,o=i.width,s=i.height,c=this.solve({ski:e,pose:t,field:n,time:r}),l=c.x.length,u=this.behind+this.ahead,d=o-34-8,f=d/u,p=e=>34+(e+this.behind)*f,m=Math.round(s*.52),h=m+16,g=s-h-34;a.fillStyle=uv.sky,a.fillRect(0,0,o,s),a.font=`${Math.max(10,Math.min(Math.round(s/28),Math.round(o/34)))}px system-ui`,a.textAlign=`left`;let _=t.z+e.boat._0xd486b6,v=m*.55,y=e=>v-(e-_)*f,b=e=>{let t=c.chordDeg[e];return t>=15?uv.bury:t>0&&t>=c.reqDeg[e]?uv.ok:t>0?uv.low:null};a.fillStyle=uv.water,a.beginPath(),a.moveTo(p(c.x[0]),m);for(let e=0;e<l;e++)a.lineTo(p(c.x[e]),y(c.hs[e]));a.lineTo(p(c.x[l-1]),m),a.closePath(),a.fill(),a.lineWidth=1.2,a.strokeStyle=uv.faint,a.beginPath();for(let e=0;e<l;e++)(e?a.lineTo:a.moveTo).call(a,p(c.x[e]),y(c.h[e]));a.stroke(),a.lineWidth=3.2,a.lineCap=`round`;for(let e=1;e<l;e++)a.strokeStyle=b(e)??uv.line,a.beginPath(),a.moveTo(p(c.x[e-1]),y(c.hs[e-1])),a.lineTo(p(c.x[e]),y(c.hs[e])),a.stroke();let x=e.boat.spec.L*f,S=t.pitch;a.save(),a.translate(p(0),y(_)),a.rotate(-S),a.fillStyle=`#ff5a36`,a.fillRect(-x*.5,-3,x,5),a.beginPath(),a.moveTo(x*.5,-3),a.lineTo(x*.5+6,0),a.lineTo(x*.5,2),a.fill(),a.fillStyle=`#ffd1b8`,a.beginPath(),a.arc(-x*.08,-12,4,0,7),a.fill(),a.restore();let C=(e,t,n,r)=>{let i=Math.min(l-1,Math.max(0,Math.round((e+this.behind)/u*(l-1))));a.strokeStyle=t,a.fillStyle=t,a.lineWidth=2,a.beginPath(),a.moveTo(p(e),y(c.hs[i])-4),a.lineTo(p(e),y(c.hs[i])-18-r),a.stroke(),a.beginPath(),a.arc(p(e),y(c.hs[i]),5,0,7),a.fill(),a.textAlign=`center`,a.fillText(n,p(e),y(c.hs[i])-22-r),a.textAlign=`left`};c.sweet&&C(c.sweet.x,uv.sweet,`sweet spot`,0),c.hold!=null&&C(c.hold,uv.hold,`holds here`,14),a.fillStyle=uv.ink,a.fillText(`ahead →`,o-8-52,14),a.fillText(`true scale`,34,14);let w=Math.max(20,Math.ceil(Math.max(...c.chordDeg,18,Math.min(Math.max(...c.reqDeg),45))/5)*5),T=e=>h+(1-(e- -10)/(w- -10))*g;a.fillStyle=`#eaf3fa`,a.fillRect(34,h,d,g),a.save(),a.beginPath(),a.rect(34,h,d,g),a.clip();for(let e=1;e<l;e++){let t=b(e);t&&(a.fillStyle=t+`55`,a.fillRect(p(c.x[e-1]),T(Math.max(c.chordDeg[e],0)),Math.max(1,p(c.x[e])-p(c.x[e-1])+.5),T(0)-T(Math.max(c.chordDeg[e],0))))}a.strokeStyle=`#789`,a.lineWidth=1,a.setLineDash([]),a.beginPath(),a.moveTo(34,T(0)),a.lineTo(34+d,T(0)),a.stroke(),a.strokeStyle=uv.bury,a.setLineDash([4,4]),a.beginPath(),a.moveTo(34,T(15)),a.lineTo(34+d,T(15)),a.stroke(),a.strokeStyle=`#444`,a.beginPath();for(let e=0;e<l;e++)(e?a.lineTo:a.moveTo).call(a,p(c.x[e]),T(c.reqDeg[e]));a.stroke(),a.setLineDash([]),a.strokeStyle=`#0a3a5c`,a.lineWidth=2.4,a.beginPath();for(let e=0;e<l;e++)(e?a.lineTo:a.moveTo).call(a,p(c.x[e]),T(c.chordDeg[e]));a.stroke(),a.strokeStyle=`#ff5a36`,a.lineWidth=1.5,a.beginPath(),a.moveTo(p(0),h),a.lineTo(p(0),h+g),a.stroke();let E=-t.pitch*180/Math.PI;a.fillStyle=`#ff5a36`,a.beginPath(),a.arc(p(0),T(E),4.5,0,7),a.fill(),c.sweet&&(a.fillStyle=uv.sweet,a.strokeStyle=`#7a5d00`,a.lineWidth=1,a.beginPath(),a.arc(p(c.sweet.x),T(c.sweet.deg),5.5,0,7),a.fill(),a.stroke()),c.hold!=null&&(a.strokeStyle=uv.hold,a.lineWidth=2,a.beginPath(),a.moveTo(p(c.hold),h),a.lineTo(p(c.hold),h+g),a.stroke()),a.restore(),a.fillStyle=uv.ink,a.textAlign=`right`;for(let e of[0,10,20,30,40])e>=-10&&e<=w&&a.fillText(`${e}°`,30,T(e)+4);a.textAlign=`left`,a.fillText(`face angle under the hull`,38,h+13),a.fillStyle=`#444`,a.fillText(`- - needed to coast`,38,h+26),a.fillStyle=uv.bury,a.fillText(`- - bow may bury`,38,h+39);let D=t.u/lv,O=c.faceHere/lv,k;k=c.uC>0?c.dot<.7?`Waves cross your heading (${Math.round(Math.acos(Math.min(1,c.dot))*57.3)}° off): turn to run with them.`:c.canHold?c.sweet?`Best spot ${Math.abs(c.sweet.x).toFixed(1)} m ${c.sweet.x>=0?`ahead of`:`behind`} you · face ${c.sweet.deg.toFixed(0)}° (needs ${c.sweet.reqDeg.toFixed(0)}°)`:`Holds here.`:`No spot on this wave holds you at the ${O.toFixed(1)} kt of the face here: too gentle for this ski.`:`No wave train to match here.`,a.fillStyle=uv.ink,a.fillText(`ski ${D.toFixed(0)} kt · face here ${(c.faceHere/lv).toFixed(0)} kt · pitch ${E.toFixed(0)}° · S ${c.steepness.toFixed(2)}`,34,s-20),a.fillText(k,34,s-6)}},fv=7600,pv=900,mv=(e,t,n,r)=>{let i=(e-t+540)%360-180;return r*Math.exp(-.5*(i/n)**2)},hv=e=>{let t=Math.sin(e*127.1+31.7)*43758.5453;return t-Math.floor(t)};function gv(e){let t=Math.floor(e),n=e-t,r=n*n*(3-2*n);return hv(t)*(1-r)+hv(t+1)*r}function _v(e,t=0){let n=0,r=.55,i=.05,a=0;for(let o=0;o<5;o++){let s=1-Math.abs(2*gv(e*i+t+o*17.3)-1);n+=r*s,a+=r,r*=.5,i*=2.1}return n/a}var vv=(e,t,n)=>{let r=Math.abs((e-t+540)%360-180);return Math.max(0,1-(r/n)**2)},yv={Islands:(e,t)=>Math.max(mv(e,t-38,1.6,55),mv(e,t-33,2.4,90),mv(e,t+8,3.5,70),mv(e,t+14,1.4,40),mv(e,t+62,4,110),mv(e,t-95,5,80)),Mountains:(e,t)=>40+620*_v(e,3.1)**1.7*(.25+.75*vv(e,t-25,110))},bv=(e,t)=>{let n=Math.abs((e-t+540)%360-180);return 15+30*_v(e,5.3)+520*xv(14,60,n)*(.45+.8*_v(e,8.7))+120*xv(5,18,n)*_v(e,2.2)};function xv(e,t,n){let r=Math.min(Math.max((n-e)/(t-e),0),1);return r*r*(3-2*r)}yv.Gorge=bv,[...Object.keys(yv)];var Sv=(e,t,n)=>e.map((e,r)=>e+(t[r]-e)*n),Cv=e=>e.map(e=>e**2.2),wv={Islands:15e3,Mountains:3e4,Gorge:9e3,Skyline:14e3};function Tv(e,t,n=null,r={}){let i=yv[e];if(e===`Skyline`&&n){let{binDeg:e,deg:t}=n,r=t.length;i=n=>{let i=(n%360+360)%360/e,a=Math.floor(i),o=i-a;return fv*Math.tan((t[a%r]*(1-o)+t[(a+1)%r]*o)*Math.PI/180)}}if(!i)return null;let a=[.72,.82,.91],o=[.2,.36,.2],s=[.36,.4,.22],c=[.5,.38,.26],l=e===`Skyline`?.55:.3,u=[],d=[],f=[],p=[],m=[],h=[],g=[[0,0,0],o,Sv(o,s,.5),s,c].map(e=>Cv(e).map(e=>e*.55));for(let n=0;n<=pv;n++){let f=n/pv*360,_=i(f,t),v=_>.5?_:0,y=f*Math.PI/180,b=fv*Math.sin(y),x=-7600*Math.cos(y),S=.8+.4*gv(f*.11+9.7),C=[v>0?-40:0,0,.3*v,.65*v,v],w=[a,Sv(o,a,l),Sv(Sv(o,s,.5),a,l),Sv(s,a,l*.9),Sv(c,a,l*.8)],T=r.distAt?.(f)??wv[e]??15e3;C.forEach((e,t)=>{u.push(b,e,x);let n=t===0?w[0]:w[t].map(e=>Math.min(e*S,1));d.push(...n),p.push(...g[t].map(e=>e*S)),m.push(t===0?1e7:T),h.push(Math.max(0,e*T/fv))})}for(let e=0;e<pv;e++)for(let t=0;t<4;t++){let n=e*5+t,r=(e+1)*5+t;f.push(n,r,n+1,n+1,r,r+1)}let _=new be;_.setAttribute(`position`,new j(u,3)),_.setAttribute(`color`,new j(d,3)),_.setAttribute(`albedo`,new j(p,3)),_.setAttribute(`fogD`,new j(m,1)),_.setAttribute(`fogH`,new j(h,1)),_.setIndex(f);let v=new he(_,r.material??new rt({vertexColors:!0,fog:!1,side:2,depthWrite:!1}));return v.renderOrder=-.5,v.frustumCulled=!1,v}var Ev=[{name:`Mt Rainier`,lat:46.8529,lon:-121.7604,elev:4392,half:13e3,k:1.25,snow:.62},{name:`Mt Adams`,lat:46.2024,lon:-121.4909,elev:3743,half:11e3,k:1.7,snow:.55},{name:`Mt Hood`,lat:45.3735,lon:-121.6959,elev:3429,half:8500,k:1.1,snow:.5},{name:`Mt St Helens`,lat:46.1914,lon:-122.1956,elev:2549,half:8e3,k:1.9,snow:.35},{name:`Mt Baker`,lat:48.7767,lon:-121.8144,elev:3286,half:1e4,k:1.5,snow:.6},{name:`Glacier Peak`,lat:48.1125,lon:-121.1139,elev:3213,half:7e3,k:1.2,snow:.55}],Dv=6371e3,Ov=400,kv=7700;function Av(e,t,n,r,i=2){let[a,o]=Mt(t,e.lat,e.lon),s=a-n,c=o-r,l=Math.hypot(s,c),u=l*l/(2*Dv)*.87;return{az:(Math.atan2(s,c)*180/Math.PI+360)%360,dist:l,elDeg:Math.atan2(e.elev-i-u,l)*180/Math.PI}}var jv=[.72,.82,.91],Mv=[.3,.34,.46],Nv=[.97,.97,.98],Pv=(e,t,n)=>e.map((e,r)=>e+(t[r]-e)*n),Fv=e=>{let t=Math.sin(e*91.7+13.3)*43758.5453;return t-Math.floor(t)};function Iv(e,t){let n=[],r=[],i=[],a=[],o=[],s=[],c=(e=>e.map(e=>e**2.2*.55))([.22,.24,.3]),l=[.75,.75,.78],u=[0,.3,.48,.62,.8,1];for(let i=0;i<=48;i++){let d=i/48*2-1,f=Math.abs(d),p=Math.max(0,1-f**+e.k)*(1+.035*(Fv(i+t*50)-.5)*2*Math.min(1,f*2.5));u.forEach((t,i)=>{n.push(d,p*t,0);let u=t*p,f=Math.min(1,Math.max(0,(u-e.snow*.85)/.18)),m=Pv(Pv(Mv,jv,.5),Pv(Nv,jv,.3),f);r.push(...Pv(m,jv,i===0?1:.3*(1-.5*f)*.5+.1)),a.push(...Pv(c,l,f)),o.push(i===0?1e7:0),s.push(u*e.elev)})}for(let e=0;e<48;e++)for(let t=0;t<5;t++){let n=e*6+t,r=(e+1)*6+t;i.push(n,r,n+1,n+1,r,r+1)}let d=new be;return d.setAttribute(`position`,new j(n,3)),d.setAttribute(`color`,new j(r,3)),d.setIndex(i),d.setAttribute(`albedo`,new j(a,3)),d.setAttribute(`fogD`,new j(o,1)),d.setAttribute(`fogH`,new j(s,1)),d}var Lv=class{constructor(e,t=null){this.group=new te,this.group.name=`peaks`,e.add(this.group),this.items=Ev.map((e,n)=>{let r=t?Object.assign(t(),{depthTest:!1}):new rt({vertexColors:!0,fog:!1,side:2,depthWrite:!1,depthTest:!1,transparent:!1}),i=new he(Iv(e,n),r);return i.renderOrder=.5,i.frustumCulled=!1,i.visible=!1,this.group.add(i),{peak:e,mesh:i}}),this.geo=null}setGeo(e){if(this.geo=e??null,!this.geo)for(let e of this.items)e.mesh.visible=!1}update(e,t=30){if(!this.geo)return;let n=Math.min(1,Math.max(.25,.25+t/25*.75));for(let{peak:t,mesh:r}of this.items){let i=Av(t,this.geo,e.position.x,-e.position.z,Math.max(2,e.position.y));if(i.dist>Ov*1e3||i.elDeg<-1.2){r.visible=!1;continue}let a=i.az*Math.PI/180,o=Math.sin(a),s=-Math.cos(a),c=kv*Math.tan(Math.atan2(t.half,i.dist)),l=Math.sqrt(2*Math.max(2,e.position.y)/(Dv/.87)),u=kv*Math.tan(-l-4e-4),d=kv*Math.tan(i.elDeg*Math.PI/180);r.visible=!0,r.position.set(e.position.x+o*kv,u,e.position.z+s*kv),r.rotation.set(0,Math.atan2(-o,-s),0),r.scale.set(c,d-u,1),r.material.uniforms?r.material.uniforms.uDistAdd.value=i.dist:r.material.color.setRGB(n,n*(.85+.15*n),n*(.75+.25*n))}}},Rv=e=>document.getElementById(e),zv=0;function Bv(e,t=2200){let n=Rv(`toast`);n&&(n.textContent=e,n.classList.add(`on`),clearTimeout(zv),zv=setTimeout(()=>n.classList.remove(`on`),t))}function Vv(){let e=document;if(e.fullscreenElement||e.webkitFullscreenElement)(e.exitFullscreen||e.webkitExitFullscreen).call(e);else{let t=e.documentElement,n=t.requestFullscreen||t.webkitRequestFullscreen;n?n.call(t).catch(()=>Bv(`Full screen is not available here`)):Bv(`Full screen is not available here`)}}async function Hv(e){try{return await navigator.clipboard.writeText(e),!0}catch{}let t=document.createElement(`textarea`);t.value=e,t.style.position=`fixed`,t.style.opacity=`0`,document.body.appendChild(t),t.select();let n=!1;try{n=document.execCommand(`copy`)}catch{}return t.remove(),n}function Uv({onStart:e}){let t=Rv(`intro`),n=Rv(`introGo`),r=!1,i=(e=!1)=>{r=!0,t.classList.add(`on`),n.textContent=e?`▶ Start paddling`:`▶ Back to the sim`},a=()=>{r=!1,t.classList.remove(`on`)};return n.onclick=()=>{let t=n.textContent.includes(`Start`);a();try{localStorage.setItem(`surfski.seen`,`1`)}catch{}t&&e?.()},t.addEventListener(`pointerdown`,e=>{if(e.target===t){a();try{localStorage.setItem(`surfski.seen`,`1`)}catch{}}}),{show:i,hide:a,get open(){return r},seen(){try{return localStorage.getItem(`surfski.seen`)===`1`}catch{return!1}}}}function Wv(e,t=!1){let n=Rv(`touch`);if(n&&(t||matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>0&&innerWidth<900)){n.classList.add(`on`);for(let t of n.querySelectorAll(`button`)){let n=t.dataset.k;t.addEventListener(`pointerdown`,r=>{r.preventDefault(),t.setPointerCapture?.(r.pointerId),t.classList.add(`held`),e(n,!0)});let r=r=>{r.preventDefault(),t.classList.remove(`held`),e(n,!1)};t.addEventListener(`pointerup`,r),t.addEventListener(`pointercancel`,r),t.addEventListener(`lostpointercapture`,r)}}}var Gv=[[.75,45]],Kv=(e,t)=>1/Math.min(e*t,e>=60?50:1/0),qv=[1,1.25,1.5,1.75,2];function Jv(e,t){let n=qv.find(t=>t>e+.01);return n!=null&&n<=t+1e-9?n:null}function Yv(e,t,n=!1){let r=Math.max(Math.min(1,e),e*t);return!n&&r>=e-.01?null:r}var Xv=class{constructor(e,{targetFps:t=60,enabled:n=!0,slowAt:r=.92,fastAt:i=.97,cpuShare:a=.8,window:o=45,startSkip:s=90}={}){this.a=e,this.target=t,this.enabled=n,this.win=o,this.slowS=Kv(t,r),this.fastS=1/(t*i),this.cpuS=a/t,this.ft=[],this.cpu=0,this.skip=s,this.probe=null,this.pixelBound=!1,this.vertexBound=!1,this.steps=0,this.log=[],this.vi=0,this.history=[],this.trial=null,this.calmS=0,this.retryS=20,this.ups=[]}setTarget(e,{slowAt:t=.92,fastAt:n=.97,cpuShare:r=.8,deep:i=!0}={}){this.target=e,this.slowS=Kv(e,t),this.fastS=1/(e*n),this.cpuS=r/e,this.noDeep=!i,this.ft.length=0,this.cpu=0,this.skip=30}quiet(e){this.log.push(e),this.skip=10,this.ft.length=0,this.cpu=0}_try(e){let t=this.a.snap?.(),n=e();return n&&this.a.snap&&this.history.push({before:t,after:this.a.snap()}),n}note(e){this.log.push(e),Bv(e,3200),this.skip=10,this.ft.length=0,this.cpu=0,this.steps++}tick(e,t=0){if(!this.enabled||document.hidden)return;if(this.skip>0){this.skip--;return}if(this.ft.push(Math.min(e,.3)),this.cpu+=Math.min(t,.3),this.ft.length<this.win)return;let n=this.ft.sort((e,t)=>e-t),r=Math.max(1,Math.floor(n.length*.9)),i=0;for(let e=0;e<r;e++)i+=n[e];let a=i/r,o=this.cpu/n.length,s=n.reduce((e,t)=>e+t,0),c=s/n.length;if(this.ft.length=0,this.cpu=0,this.trial){let e=this.trial;if(e.up?c>this.fastS:a>this.slowS){this.a.apply(e.up?e.before:e.entry.after),this.trial=null,this.retryS=Math.min(this.retryS*2,300),this.calmS=0,this.skip=10;return}++e.windows>=(e.up?3:2)&&(this.trial=null,this.retryS=20,this.calmS=0,e.up?(this.ups.push(e.before),this.log.push(`sharper`),this.a.kept?.()):(this.history.pop(),this.note(`Fast again: picture and water detail restored a step`)));return}if(this.probe){let{before:e,undo:t}=this.probe;if(this.probe=null,a<e*.8)this.pixelBound=!0;else{t(),this.history.pop(),this.vertexBound=!0,this.note(`The picture size was not the limit: put the sharpness back and simplifying the water instead`);return}}if(a<=this.slowS){if(c>this.fastS){this.calmS=0;return}if(this.calmS+=s,this.calmS<this.retryS)return;if(this.history.length&&this.a.snap&&this.a.apply){let e=this.history[this.history.length-1];this.a.apply(e.before),this.trial={entry:e,windows:0},this.calmS=0,this.skip=10;return}if(this.a.up&&this.a.snap&&this.a.apply){let e=this.a.snap();this.a.up()&&(this.trial={up:!0,before:e,windows:0},this.skip=10),this.calmS=0}return}if(this.calmS=0,this.ups.length&&this.a.apply){this.a.apply(this.ups.pop()),this.a.kept?.(),this.retryS=Math.min(this.retryS*2,300),this.quiet(`back a step`);return}let l=this.a,u=l.pixels();if(o>this.cpuS&&l.cpu){let e=this._try(()=>l.cpu());if(e){this.note(e);return}}if(!this.pixelBound&&!this.vertexBound&&u>7e5&&this._try(()=>l.scale(.7))){let e=this.history[this.history.length-1];this.probe={before:a,undo:()=>e&&l.apply?l.apply(e.before):l.scale(1/.7,!0)},this.note(`Slow: trying a lower picture resolution`);return}if(this.pixelBound&&this._try(()=>l.scale(.8))){this.note(`Still slow: lowering the picture resolution a little more`);return}if(o>this.cpuS)return;let d=[l.mesh,l.mesh,l.mesh,l.near,l.lite].filter(Boolean);for(;this.vi<d.length;){let e=this._try(()=>d[this.vi++].call(l));if(e){this.note(e);return}}if(this._try(()=>l.scale(.8))){this.note(`Last resort: lowering the picture resolution`);return}let f=l.crit&&this._try(()=>l.crit());if(f)this.note(f);else if(l.deep&&!this.noDeep){for(let[e,t]of Gv)if(1/c<t&&this._try(()=>l.deep(e))){this.note(`Under ${t} fps: picture size ${e} to keep the motion smooth`);return}}}};function Zv(e,t=`Space: resume`){let n=document.getElementById(`pausedLbl`);if(!n){n=document.createElement(`div`),n.id=`pausedLbl`,n.style.cssText=`position:fixed;z-index:8;transform:translateX(-50%);color:#ffd23f;font:700 15px system-ui,-apple-system,sans-serif;letter-spacing:.08em;text-shadow:0 1px 4px rgba(0,0,0,.85);pointer-events:none;white-space:nowrap;display:none`;let e=document.createElement(`style`);e.textContent=`body.dbgopen #pausedLbl{visibility:hidden}`,document.head.appendChild(e),document.body.appendChild(n)}n.innerHTML=`PAUSED <span style="font-size:12px;font-weight:600;letter-spacing:0">(${t})</span>`;let r=()=>{let e=document.getElementById(`power`)?.getBoundingClientRect(),t=e&&e.width>0&&e.height>0;n.style.left=t?`${Math.round(e.left+e.width/2)}px`:`50%`,n.style.bottom=t?`${Math.round(innerHeight-e.top+8)}px`:`120px`};clearInterval(Zv.timer),n.style.display=e?`block`:`none`,e&&(r(),Zv.timer=setInterval(r,400))}var Qv=/swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic|mesa offscreen/i,$v=e=>Qv.test(String(e||``));function ey(e){return new Set(String(e?.get?.(`caps`)||``).split(`,`).map(e=>e.trim()).filter(Boolean))}var ty={webgl2:`3-D graphics (WebGL 2). This browser is too old for it, or has it turned off.`,context:`access to 3-D graphics. The browser has WebGL 2 but would not give it to the page: hardware acceleration may be off, the graphics driver may be blocked, or other tabs may be holding all the graphics.`,float:`drawing into floating-point images (EXT_color_buffer_float), which the sea is made of. Some phones and older graphics chips cannot.`},ny=`Use an up-to-date Chrome, Edge or Firefox, or another Chromium browser (Vivaldi, Brave, Opera, Arc). Safari 15 or later works on a Mac, iPhone or iPad.`,ry=`Turn on hardware acceleration in the browser's settings (Chrome: Settings › System; Firefox: Settings › General › Performance), then quit and reopen the browser.`,iy=class extends Error{constructor(e,t=``,n=``){super(`this browser cannot run the simulator: needs `+e.join(`, `)+(n?` (`+n+`)`:``)),this.name=`CapsError`,this.missing=e,this.gpu=t,this.detail=n}};function ay(e,t=new Set,n=typeof WebGL2RenderingContext<`u`){let r=String(e?.message||e||``).slice(0,200);return new iy([!n||t.has(`nowebgl2`)?`webgl2`:`context`],``,r)}function oy(e){try{let t=e.getExtension(`WEBGL_debug_renderer_info`);return String(e.getParameter(t?t.UNMASKED_RENDERER_WEBGL:e.RENDERER)||``)}catch{return``}}function sy(e,t=new Set){let n=t.has(`software`)?`Google SwiftShader [?caps=software]`:oy(e.getContext()),r=[],i=[];return!e.capabilities.isWebGL2||t.has(`nowebgl2`)?r.push(`webgl2`):(!e.extensions.has(`EXT_color_buffer_float`)||t.has(`nofloat`))&&r.push(`float`),$v(n)&&i.push(`This browser is drawing 3-D graphics without the graphics card (software rendering: ${n}), so the simulator will be slow. ${ry}`),{missing:r,warn:i,gpu:n}}function cy(e){let t=e=>String(e).replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),n=e.missing.map(e=>`<li>${t(ty[e]||e)}</li>`).join(``),r=[ny,e.missing.includes(`webgl2`)?``:ry,e.missing.includes(`context`)?`Close other tabs, or restart the browser.`:``,e.missing.includes(`float`)?`Updating the graphics driver can also help.`:``].filter(Boolean),i=[e.gpu&&`graphics: `+e.gpu,e.detail,navigator.userAgent].filter(Boolean).map(t).join(`<br>`);return`<div id="capsCard" class="modal on" style="z-index:60"><div class="card"><h1>This browser can't run the simulator</h1>
<p class="tag">It needs:</p><ul>${n}</ul><p class="tag">What to try:</p><ul>${r.map(e=>`<li>${t(e)}</li>`).join(``)}</ul>
<p class="fine">${i}</p></div></div>`}function ly(e){document.getElementById(`loading`)?.remove(),document.getElementById(`capsCard`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,cy(e))}function uy(e){let t=document.getElementById(`capsNote`);if(t||(t=document.createElement(`div`),t.id=`capsNote`,t.setAttribute(`role`,`alert`),document.body.appendChild(t)),[...t.querySelectorAll(`p`)].some(t=>t.textContent===e))return;let n=document.createElement(`div`),r=document.createElement(`p`),i=document.createElement(`button`);r.textContent=e,i.textContent=`×`,i.setAttribute(`aria-label`,`Close`),i.onclick=()=>{n.remove(),t.children.length||t.remove()},n.append(r,i),t.appendChild(n)}function dy(e){let t=!1;return(n,r,i,a)=>{let o=e=>String(e||``).trim().slice(0,4e3);console.error(`THREE.WebGLProgram: Shader Error`,o(n.getProgramInfoLog(r)),o(n.getShaderInfoLog(i)),o(n.getShaderInfoLog(a))),!t&&(t=!0,uy(`The graphics driver could not build part of the picture (a shader failed${e?` on `+e:``}), so some of the scene may be missing. Try another browser or update the graphics driver.`))}}var fy=new Float32Array(16);if(typeof window<`u`&&(window.__FFTSea=Ct),typeof Worker<`u`&&new URLSearchParams(location.search).get(`sliceworker`)!==`0`)try{Ct.prefetch=new Pt(new Worker(new URL(new URL(`slice-worker-C8RikruM.js`,import.meta.url).href,``+import.meta.url),{type:`module`}))}catch(e){console.warn(`no slice worker; the sea makes its slices on the main thread`,e)}Fe.enabled=!1,Ar.tonemapping_pars_fragment=Ar.tonemapping_pars_fragment.replace(`vec3 CustomToneMapping( vec3 color ) { return color; }`,`vec3 CustomToneMapping( vec3 color ) { color *= toneMappingExposure; float k = ${.72.toFixed(2)}, m = max(max(color.r, color.g), max(color.b, 1e-5));
    float f = m < k ? m : k + (1.0 - k) * (1.0 - exp(-(m - k) / (1.0 - k))); return color * (f / m); }`);var py={hemi:1.25,sun:1.75,env:.95},my=(()=>{let e=new URLSearchParams(globalThis.location?.search??``).get(`envi`),t=Number(e);return e!=null&&e!==``&&Number.isFinite(t)&&t>=0?t:new URLSearchParams(globalThis.location?.search??``).get(`materials`)===`legacy`?py.env:Zn.env})(),hy=.514444,gy=Number(new URLSearchParams(location.search).get(`bladey`)??0),_y=new Ve(.74,.83,.91),vy=new URLSearchParams(location.search).get(`sector`)===`1`,yy=[`config`,`roller`,`rollervol`,`rollersteps`,`rollerdebug`,`rollerspray`,`spillvol`,`foamevents`,`rollerpass`,`rollerscale`],by=new $e;function xy(e){e.getWorldDirection(by);let t=Math.asin(Math.max(-1,Math.min(1,by.y))),n=Math.tan(e.fov*Math.PI/360),r=n*e.aspect,i=Math.atan(Math.hypot(r,n)/Math.max(Math.cos(t),.2))+.35,a=Math.max(0,e.position.y);return{c:Math.atan2(by.z,by.x),span:2*i,rFull:Math.max(40,3*a)}}function Sy(e){return e.getWorldDirection(by),{c:Math.atan2(by.z,by.x),span:2*Math.PI,rFull:60}}var Cy={key:0,hb:0,cs:1,rMax:0},wy={on:new URLSearchParams(location.search).get(`viewmesh`)!==`0`,h:1.3,pix:.0011,at:0},Ty=(e,t)=>wy.on?{...Ey[e],cf:t,cs:1,rMax:wy.h>=20?Math.max(Ey[e].rMax,80*wy.h):Ey[e].rMax,view:{h:wy.h,pix:wy.pix,k:Vn[e].k,sMin:Vn[e].sMin/Math.max(.5,t)}}:{...Ey[e],cf:t,cs:Cy.cs,rMax:Math.max(Ey[e].rMax,Cy.rMax)},Ey={Low:{J:200,K:220,power:2.4,rMax:1200},Draft:{J:280,K:290,power:2.4,rMax:1400},Standard:{J:360,K:360,power:2.4,rMax:1500}},Dy={"Boyan cam":{fov:90,local:[0,1.25,.15],pitch:-.3,steady:.75,hideRider:!0},"Deck cam":{fov:93,local:[0,.98,.42],pitch:-.13,steady:0,hideRider:!0},"Head POV":{fov:75,local:[0,1,.5],pitch:-.04,steady:.8,hideRider:!0},"Shoulder cam":{fov:95,local:[0,1.75,2.25],pitch:-.24,steady:.6,hideRider:!1},Drone:{fov:70,drone:!0},"Free cam":{fov:70,free:!0},Chase:{fov:60},Overhead:{fov:55}};function Oy(){return{textureRect:new Ce(-1e6,-1e6,2e6,2e6),buildDepthTexture(){let e=o.toHalfFloat(100),t=new ne(new Uint16Array([e,e,e,e]),2,2,ae,mt);return t.minFilter=t.magFilter=Be,t.needsUpdate=!0,t}}}async function ky(e){let t=e.get(`config`);if(!t)return null;let n=e=>{try{let t=new URL(e,location.href);return t.origin===location.origin?t:null}catch{return null}},r=n(t);if(!r)return console.warn(`?config= must be a file on this site:`,t),null;try{let t=await fetch(r).then(e=>{if(!e.ok)throw Error(`${e.status} ${r.pathname}`);return e.json()});if(t?.kind!==`surfski-scenario`&&t?.kind!==`surfski-settings`)throw Error(`not a scenario or settings file (kind surfski-scenario or surfski-settings)`);if(t.seaRef&&!t.seaModel){let e=n(new URL(t.seaRef,r).href);e&&(t.seaModel=await fetch(e).then(e=>e.ok?e.json():null))}for(let[n,r]of Object.entries(t.switches??{}))!e.has(n)&&/^[a-zA-Z][a-zA-Z0-9]{0,30}$/.test(n)&&e.set(n,String(r));return t.scenario!=null&&!e.has(`scenario`)&&e.set(`scenario`,String(t.scenario)),e.has(`intro`)||e.set(`intro`,`0`),t}catch(e){return console.warn(`?config= not used:`,e.message),null}}async function Ay(){let e=new URLSearchParams(location.search),t=await ky(e);Dr(e,{user:Tr(),file:t?.settings??{}});let n={},a={},s={},c={},l=document.getElementById(`gl`),d=document.getElementById(`v2d`),f=!1;try{let e=Number(localStorage.getItem(`surfski.boot`));f=e>0&&Date.now()-e<6e5,localStorage.setItem(`surfski.boot`,String(Date.now()))}catch{}let p=e.get(`safe`)===`0`?``:e.get(`safe`)===`1`?`safe=1`:/Xbox|PlayStation|SMART-TV|SmartTV|Tizen|Web0S|WebOS|BRAVIA|AFTM/i.test(navigator.userAgent)?`console browser`:navigator.deviceMemory&&navigator.deviceMemory<=2?`small memory (`+navigator.deviceMemory+` GB)`:f?`the last start did not finish`:``,m=!!p,h=wd(e),g=Sd[h.tier];window.__tier={...h,profile:g},e.get(`boat`)===`v3`&&Xl({...e.get(`rudder`)?{rudder:e.get(`rudder`)===`large`?`Nelo large`:`Nelo short`}:{},...e.get(`wavehull`)===`1`?{_0x950e9d:!0}:{}}),rr.value=[`physical`,`standard`,`simple`,`legacy`].includes(e.get(`materials`))?e.get(`materials`):g.materials;for(let[t,n]of Object.entries(g.query??{}))e.has(t)||e.set(t,n);h.tier!==`desktop`&&setTimeout(()=>window.__crumb?.(`device: ${h.tier} (${h.why})`),0),m&&setTimeout(()=>window.__crumb?.(`safe mode because: `+p),0),window.__crumb?.(`start`);let _=ey(e),y=null,b=null;for(let t of[{antialias:!m&&g.antialias!==!1,stencil:!0,powerPreference:`high-performance`},{antialias:!1,stencil:!1,powerPreference:`low-power`},{antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:`default`,failIfMajorPerformanceCaveat:!1}]){if(_.has(`nowebgl2`)||_.has(`nocontext`)){b=`pretend: ?caps=`+[..._].join(`,`);break}try{y=new Ko({canvas:l,reversedDepthBuffer:e.get(`revz`)!==`0`,...t});break}catch(e){b=e,window.__crumb?.(`graphics context refused: `+String(e.message||e).slice(0,120))}}if(!y)throw ay(b,_);addEventListener(`pagehide`,e=>{if(!e.persisted)try{y.forceContextLoss()}catch{}}),await window.__crumb?.(`renderer created`),l.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),window.__showError?.(`WebGL context lost (the graphics memory ran out or the driver reset). Try ?safe=1`)}),y.outputColorSpace=Pe,y.toneMapping=e.get(`shoulder`)===`0`?0:5;let S=sy(y,_);if(S.missing.length)throw y.dispose(),new iy(S.missing,S.gpu);for(let e of S.warn)uy(e);y.debug.onShaderError=dy(S.gpu),window.__crumb?.(`graphics: `+S.gpu);let C=new w;C.fog=new v(_y,4e-4);{let e=Ar.fog_fragment,t=`fogDensity * fogDensity * vFogDepth * vFogDepth`;e.includes(t)&&(Ar.fog_fragment=e.replace(t,`fogDensity * vFogDepth`))}let T=new Me(100,1,.05,2e4),E=new i(13624319,3102048,e.get(`amb`)==null?py.hemi:Number(e.get(`amb`))),D=E.intensity;C.add(E);let O=null,A=null,j=t=>{A=e.get(`lwmap`)===`0`?null:t?.gusty?t:null,A&&!O&&(O=new um(y)),O?.setWind(A);let n=P.uniforms;A?(n.uLWTex.value=O.texture,n.uLWRect.value=O.rect,n.uLW0.value.set(1,A.windMs,A.gustMs,A.lullMs)):n.uLW0.value.set(0,0,0,0)},N=()=>{A&&O.update(T.position.x,-T.position.z,Y)},P=Dn(Oy(),{query:e,compact:m||e.get(`compact`)===`1`,skirt:e.get(`hzaa`)!==`0`,...Ey.Standard,micro:.5,sector:vy,tm:e.get(`tm`)==null?0:Number(e.get(`tm`)),jitter:e.get(`jitter`)==null?void 0:Number(e.get(`jitter`))});P.uniforms.uFogDensity.value=4e-4,await window.__crumb?.(`water built`);let F=new u(16773590,py.sun),I=e.get(`sunI`)==null?py.sun:Number(e.get(`sunI`)),ee={get sun(){return Yn.sun.value},set sun(e){Yn.sun.value=e},get hemi(){return Yn.sky.value},set hemi(e){Yn.sky.value=e},env:my};e.get(`boatsun`)&&(ee.sun=Number(e.get(`boatsun`))),e.get(`boatsky`)&&(ee.hemi=Number(e.get(`boatsky`))),F.position.copy(P.uniforms.uSunDir.value).multiplyScalar(1e3),C.add(F,F.target);let L=!m&&e.get(`shadow`)===`1`;y.shadowMap.enabled=L,F.castShadow=L,/Firefox/i.test(navigator.userAgent)&&(y.shadowMap.type=0),F.shadow.mapSize.set(1024,1024),F.shadow.bias=-4e-4,F.shadow.normalBias=.02,F.shadow.radius=3,Object.assign(F.shadow.camera,{left:-4.5,right:4.5,top:4.5,bottom:-4.5,near:900,far:1100});function te(t){let n=rv(t,W.cloudType??.25,W.cloudVar??.4),r=P.uniforms,i=n.opaque;r.uClW.value.set(n.low,n.mid,n.high,n.variety),r.uClLow.value.set(n.puff,n.scale,n.base,i),r.uClTow.value.set(n.tower,n.towers,n.anvil,n.sheet);let a=Math.min(1,Math.max(0,(i-.25)/.7)),o=W.cloudDark??0,s=(1-.9*a*a*(3-2*a))*(1-.5*o);r.uCloud.value=t,r.uCloudDark.value=o;try{wt()}catch{}let c=W.sunGain??1,l=W.ambGain??1,u=z?.sunOcc??1;r.uSunT.value=s*c,r.uSunOcc.value=u,r.uClGain.value=c,F.intensity=(I*s*c*u+.15*(1-s))*(z?.lightSun??1),E.intensity=D*l*(1-.4*o)*(z?.lightSky??1),r.uSeaAmb&&(r.uSeaAmb.value=(e.get(`seaamb`)==null?1:Number(e.get(`seaamb`)))*(1+1.5*(l-1)))}let ne=new he(new x(9e3,32,16),new k({side:1,depthWrite:!1,fog:!1,uniforms:{...Object.fromEntries(ur.map(e=>[e,P.uniforms[e]])),uSkyDisp:{value:null},uSkyDispOn:{value:0}},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; uniform samplerCube uSkyDisp; uniform float uSkyDispOn; ${Ln}
void main(){ vec3 d = normalize(vec3(vDir.x, max(vDir.y, 0.002), vDir.z));
if (uSkyDispOn > 0.5) { vec4 s = textureCube(uSkyDisp, d); gl_FragColor = vec4(sunOver(s.rgb, d, 1.0 - s.a), 1.0); }
else { vec3 b = skyBase(d, true); gl_FragColor = vec4(sunOver(b, d, 1.0 - gCloudA), 1.0); } }`}));ne.renderOrder=-1;let re=e.get(`skycube`)===`0`?null:(()=>{let t=new si(256,{type:mt,generateMipmaps:!0,minFilter:Ye,magFilter:Be}),n=new w,i=new Ee(.1,100,t),a=e.get(`skydisp`)==null?1024:Math.min(2048,Number(e.get(`skydisp`))||0),o=a?new si(a,{type:Xe,generateMipmaps:!1,minFilter:Be,magFilter:Be}):null,s=o?new Ee(.1,100,o):null,c=e.get(`clvol`)!==`0`,l=e=>new si(e,{type:mt,generateMipmaps:!1,minFilter:Be,magFilter:Be}),u=2**Math.round(Math.log2(Math.min(2048,Math.max(256,Number(e.get(`volsize`))||512)))),d=u/2,f=c?l(u):null,p=c?l(d):null,m={value:f?.texture??null},h={value:2/u},g=f?new Ee(.1,100,f):null,_=p?new Ee(.1,100,p):null,v=new w,b=()=>Object.fromEntries(ur.map(e=>[e,P.uniforms[e]])),S=c?{CL_VOLTEX:``}:{};f&&v.add(new he(new x(10,64,32),new k({defines:{CL_VOLONLY:``},side:1,depthWrite:!1,depthTest:!1,fog:!1,uniforms:b(),vertexShader:`varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; ${Ln} void main(){ vec3 d = normalize(vDir); gVol = vec4(0.0); if (d.y > -0.004) skyBase(normalize(vec3(d.x, max(d.y, 0.002), d.z)), true); gl_FragColor = gVol; }`}))),n.add(new he(new x(10,64,32),new k({defines:S,side:1,depthWrite:!1,depthTest:!1,fog:!1,uniforms:{...b(),...f?{uVolCube:m,uVolTx:h}:{}},vertexShader:`varying vec3 vDir; void main(){ vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying vec3 vDir; ${Ln} void main(){ vec3 d = normalize(vDir); vec3 c = skyBase(normalize(vec3(d.x, max(d.y, 0.002), d.z)), true); gl_FragColor = vec4(c, gCloudA); }`})));let C=``,T=(e,t,n,r,i)=>{e.parent===null&&e.updateMatrixWorld(),e.coordinateSystem!==y.coordinateSystem&&(e.coordinateSystem=y.coordinateSystem,e.updateCoordinateSystem());let a=y.getRenderTarget(),o=y.getActiveCubeFace(),s=y.getActiveMipmapLevel(),c=y.xr.enabled,l=e.renderTarget,u=l.width,d=Math.floor(u*r/i),f=Math.floor(u*(r+1)/i);l.scissor.set(0,d,u,f-d),l.scissorTest=i>1,y.xr.enabled=!1,y.setRenderTarget(l,n),y.render(t,e.children[n]),l.scissorTest=!1,y.setRenderTarget(a,o,s),y.xr.enabled=c},E=()=>{let e=``;for(let t of ur){let n=P.uniforms[t]?.value;e+=(n==null?``:n.isTexture?`t${n.version}`:typeof n==`number`?n.toFixed(5):n.toArray?n.toArray().map(e=>e.toFixed(5)).join(`,`):String(n))+`|`}return e},D={draft:Math.max(1,Math.round(2*(u/512)**2)),full:Math.max(1,Math.round(4*(u/512)**2))},O=new De(5,5),A=new Uint8Array(100),j=new w,N=new r(-1,1,1,-1,0,1);return j.add(new he(new M(2,2),new k({defines:c?{CL_VOL:``}:{},depthTest:!1,depthWrite:!1,uniforms:Object.fromEntries(ur.map(e=>[e,P.uniforms[e]])),vertexShader:`void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:`${Ln} void main(){ vec3 s = normalize(uSunDir), e1 = normalize(cross(s, abs(s.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0))), e2 = cross(s, e1); vec2 o = (gl_FragCoord.xy - ${(5/2).toFixed(1)}) * ${.02.toFixed(4)}; skyBase(normalize(s + e1 * o.x + e2 * o.y), true); gl_FragColor = vec4(gCloudA, gSunT, 0.0, 1.0); }`}))),{redraws:0,fulls:0,last:-1e9,full:0,pend:``,face:0,update(){let e=E(),t=performance.now();if(e!==C&&this.pend!==`draft`&&!(C&&t-this.last<200)){let n=!C;if(C=e,this.last=t,this.full=0,_)this.pend=`draft`,this.face=0,n&&(_.update(y,v),this.face=6*D.draft);else return this.draw()}if(this.pend){let e=this.pend===`full`,r=D[this.pend];if(this.face<6*r&&(T(e?g:_,v,Math.floor(this.face/r),this.face%r,r),this.face++),this.face<6*r)return;if(this.pend=``,this.face=0,m.value=e?f.texture:p.texture,h.value=e?2/u:2/d,e){this.fulls++,i.update(y,n),s&&s.update(y,n);return}return this.full=t+400,this.draw()}this.full&&t>=this.full&&e===C&&(this.full=0,this.pend=`full`,this.face=1,T(g,v,0,0,D.full))},draw(){let e=P.uniforms;this.redraws++,i.update(y,n),e.uSkyCube.value=t.texture,e.uSkyCubeOn.value=1,s&&(s.update(y,n),ne.material.uniforms.uSkyDisp.value=o.texture,ne.material.uniforms.uSkyDispOn.value=1);let r=y.getRenderTarget();y.setRenderTarget(O),y.render(j,N),y.readRenderTargetPixels(O,0,0,5,5,A),y.setRenderTarget(r);let a=0,c=0;for(let e=0;e<25;e++){let t=e%5-2,n=Math.floor(e/5)-2,r=Math.exp(-(t*t+n*n)/2);a+=r*(A[4*e+1]/255),c+=r}a/=c;let l=.12+.88*a;z.occWas=1-.88*(A[48]/255),Math.abs(l-(z.sunOcc??1))>.01&&(z.sunOcc=l,te(W.cloud))}}})(),z={haze:null,atm:null,key:``,sky:null,look:null,lightSun:1,lightSky:1,skyCol:[1,1,1],half:e=>e},ie=(e,t)=>{let n=P.uniforms[e].value,r=n.image.data;for(let e=0;e<t.length;e++)r[e]=o.toHalfFloat(t[e]);n.needsUpdate=!0};function ae(){if(typeof W.haze==`string`){let e=En[W.haze]??En.Light;W.hazeAmt=e[0],W.hazeType=e[1]}W.haze=null}let oe=null,se=0;function ce(){W.weatherPreset=`Custom`,clearTimeout(oe);let e=performance.now();e-se>150?(se=e,ba()):oe=setTimeout(()=>{se=performance.now(),ba()},150)}function le(){ae();let e=Math.round((W.hazeAmt??.38)*100)/100,t=Math.round((W.hazeType??.3)*100)/100,n=`${e},${t}`,r=P.uniforms,i=Math.max(-4,W.sunEl)*Math.PI/180;z.haze!==n&&(z.atm=Wn(kn(e,t)),z.haze=n,z.key=``);let a=`${n}|${W.sunEl}`;a!==z.key&&(z.key=a,z.sky=Gn(z.atm,i),ie(`uSkyR`,z.sky.rayleigh),ie(`uSkyM`,z.sky.mie));let o=z.sky,s=z.look={...Un(o),sunSin:Math.sin(i)},c=o.g;r.uSkyExp.value.fromArray(s.exp),r.uSunDisc.value.fromArray(s.sunDisc),r.uSunE.value.fromArray(s.sunE);let l=e=>In(z.atm,e,i).map((e,t)=>e*s.exp[t]*.8/Math.PI);r.uCloudSun.value.fromArray(l(tv.low)),r.uClSunM.value.fromArray(l(tv.mid)),r.uClSunH.value.fromArray(l(tv.high)),r.uClSunTop.value.fromArray(l(tv.top)),r.uCloudAmb.value.fromArray(s.skyE.map(e=>e*.85/Math.PI)),r.uFogExt.value.fromArray(o.ext.map(e=>e*(W.fogScale??1))),r.uSkyPhase.value.set(c.g,c.gPeak,c.wPeak,0),r.uLook.value.set(An.knee,An.sat,An.bleach[0],An.bleach[1]),r.uSatFade.value.set(...An.satFade);let u=Math.min(1,Math.max(0,(s.lightSun-.03)/.37)),d=An.bleach[2]*u*u*(3-2*u),f={...An,bleach:[An.bleach[0],An.bleach[1],d]};r.uBleach.value=d,r.uGlintCol.value.fromArray(yn(s.sunCol.map(e=>e*40),f));let p=sr(Xn(W.teal,W.turbid??0),s,W.bottom??[.22,.19,.15]);r.uWDeep.value.fromArray(ir(p.deep,1/An.sat)),r.uWBot.value.fromArray(ir(p.bot,1/An.sat)),r.uWKd.value.fromArray(p.kd),r.uWSss.value.fromArray(yn(p.sss)),z.lightSun=s.lightSun,z.lightSky=s.lightSky,z.skyCol=s.skyCol.map(e=>.55+.45*e);let m=Math.max(...z.skyCol);z.skyCol=z.skyCol.map(e=>e/m),F.color.setRGB(...s.sunCol),E.color.setRGB(...z.skyCol),E.groundColor.setRGB(...yn(p.deep.map(e=>e*4)));{let e=[0,1,2].map(e=>.6*s.lightSun*s.sunCol[e]+.4*s.lightSky*z.skyCol[e]),t=Math.max(...e,.001),n=Math.min(1.3,t)/t;z.landTint=e.map(e=>e*n),zt?.material.color?.setRGB(...z.landTint)}}function ue(){if(!z.sky)return;T.getWorldDirection(de);let e=P.uniforms,t=e.uSunDir.value,n=Math.atan2(de.x,-de.z)-Math.atan2(t.x,-t.z),r=z.sky.horizonAt(n).map((e,t)=>e*z.look.exp[t]),i=Math.min(1,Math.max(0,(e.uClLow.value.w-.3)/.7)),a=e.uCloudAmb.value,o=r.map((e,t)=>e*(1-.85*i)+.85*i*.9*a.getComponent(t));C.fog.color.setRGB(...yn(o)),C.fog.density=qc?0:z.sky.ext[1]*(W.fogScale??1),y.setClearColor(C.fog.color)}let de=new $e,fe=new Ol(Cl[`Generic ski`]),pe=new pn(C),me=new js(C,P.uniforms),ge={},_e=new Pc(C,P.uniforms),ve=new $e,ye=new Oe,be={},xe=null,Se=new nr(y,P);typeof window<`u`&&(window.__fftg=Se),typeof window<`u`&&(window.__foam=()=>B);let Ce=new $_(y,P),we=null;try{we=new Worker(new URL(new URL(`kelvin-worker-CFlBvb48.js`,import.meta.url).href,``+import.meta.url),{type:`module`})}catch(e){console.warn(`no Kelvin worker; the ski's wave fields are made on the main thread`,e)}let Te=e.get(`bow`)===`0`?null:new bd(P,fe,{worker:we}),ke=Te?.wake(0)??null,Ae=e.get(`racerwakes`)!==`0`;Te&&e.get(`bowx`)&&(Te.scale=Number(e.get(`bowx`))),typeof window<`u`&&(window.__bow=()=>ke);let B=e.get(`foam`)===`0`?null:new yh(y,P);P.uniforms.uTrailMinR.value=B?.8*B.extent/2:0;let je=null,V=(t=Number(e.get(`foamevents`))||0)=>je||(je=new Uh(y,C,P,{vol:Number(e.get(`rollervol`)??1),steps:Number(e.get(`rollersteps`)??Th.steps),debug:Number(e.get(`rollerdebug`)??0),events:t,pass:e.get(`rollerpass`)!==`0`,scale:Number(e.get(`rollerscale`))>0?Number(e.get(`rollerscale`)):null,light:Number(e.get(`rollerlight`)??2),fine:Number(e.get(`rollerfine`)??1),stepK:Number(e.get(`rollerstepk`)??1),fog:e.get(`rollerfog`)==null?null:Number(e.get(`rollerfog`)),soft:e.get(`rollersoft`)==null?null:Number(e.get(`rollersoft`)),bilat:e.get(`rollerbilat`)!==`0`,sink:e.get(`rollersink`)==null?null:Number(e.get(`rollersink`)),skin:e.get(`rollerskin`)==null?null:Number(e.get(`rollerskin`)),puff:(()=>{let t=e.get(`foamride`)===`0`?{ride:0,rideW:0,aheadSlots:0,fadeMin:0}:Number(e.get(`foamride`))>0?{ride:Number(e.get(`foamride`))}:{};return e.get(`foamdepth`)!=null&&(t.center=-Math.abs(Number(e.get(`foamdepth`)))),e.get(`foambelow`)!=null&&(t.below=Number(e.get(`foambelow`))),e.get(`foamface`)!=null&&(t.faceTheta=Number(e.get(`foamface`))),Object.keys(t).length?t:null})()}),e.has(`spillvol`)||(P.uniforms.uSpillVol.value=0),B&&B.usePuffs(je.uniforms),je);(e.get(`roller`)===`1`||Number(e.get(`foamevents`))>0)&&V(),typeof window<`u`&&(window.__roller=()=>je);let H=Kn(fe,{paddleDetail:g.paddle}),Fe=0,Ie=null,Le=Promise.resolve(),Re,ze=new Promise(e=>{Re=e});function Ve(t){let n=++Fe;H.userData.skinned?.remove(),t?Le=km(async()=>{let{loadBody:e,SkinnedPaddler:t}=await import(`./skinned-paddler-DTWuh6oP.js`);return{loadBody:e,SkinnedPaddler:t}},__vite__mapDeps([4,3,5,6,7]),import.meta.url).then(({loadBody:e,SkinnedPaddler:r})=>e(t,`./`).then(e=>ze.then(()=>e)).then(e=>{if(n===Fe){new r(H,e).setSkinTone($n.indexOf(W.skin),`./`),cr(H,Cn[W.pfd]??Cn[`Hi-vis yellow`]),Ct(H),ut();try{dr()}catch{}}})).catch(r=>ze.then(()=>{n===Fe&&(console.error(`body not loaded`,t,r),(t!==`mike-kit`||e.get(`body`))&&Bv(`That paddler model is not available here: the simple figure instead`),W.body=``,Ie?.updateDisplay())})):ut()}{let t=e.get(`body`)===`simple`?``:e.get(`body`)??`mike-kit`;t&&Ve(t)}let He=e=>fe?fe.halfWidth(Math.min(Math.max(e/fe.spec.L,0),1)):.1,Ue=fe?fe.deckRel(0)-fe.keelRel(0):.28,We=fe?new Ss(fe,P.uniforms):null;We&&(H.add(We.mesh),window.__deckWater=We);let Ge=new Map;e.get(`wlcut`)!==`0`&&$s(P.uniforms);let Ke=e=>{let t=Ge.get(e);return t||(t=new rc(e.userData.parts.hull),Ge.set(e,t)),t};Ke(H).setLook({style:Is.swoosh,c1:741288,c2:16054008,number:Number(e.get(`bib`)??7)});let qe=Kn(fe);qe.visible=!1,Ke(qe).setLook(Js(15659764,4,99));let Je=()=>e.get(`smallsea`)==null?(G?.state?.stats?.hs??1)<Mf.hs:e.get(`smallsea`)===`1`,Ze=[],Qe=e.get(`fieldseed`)==null?Math.floor(Math.random()*2**31):Number(e.get(`fieldseed`))|0,et=Number(e.get(`bib`)??7),tt=(()=>{if(e.get(`racers`)===`0`)return 0;if(e.get(`field`)!=null)return Math.max(0,Math.min(40,Number(e.get(`field`))||0));try{let e=localStorage.getItem(`surfski.field`);if(e!=null&&Object.values($p).includes(Number(e)))return Number(e)}catch{}return F_(e,h.tier)===`casual`?Math.min(Vp.length,4):Math.min(Vp.length,g.field??Vp.length)})(),nt=F_(e,h.tier)===`casual`,rt=t=>{let n=rm(t,{seed:Qe,bib:et}),r=ot()===`group`;return Hp(t,!nt&&(r||e.get(`fieldbots`)===`1`)).map((e,t)=>({...nt&&e.bot?{...Vp[1],factor:1.1}:e,...n[t],...r?{name:n[t].first}:{}}))},it=(()=>{let t=(e.get(`session`)??``).toLowerCase();if(t===`group`||t===`race`)return t===`group`?`Group paddle`:`Race`;try{let e=localStorage.getItem(`surfski.session`);if(zp[e])return e}catch{}return`Race`})(),at=it,ot=()=>zp[at]??`race`,st=rt(tt),ct=e=>Wi?.setters?.[e]??st[e]??{},lt=t=>e.get(`racerskin`)==null?ct(t).skin??bn():Number(e.get(`racerskin`));function ut(){Ze.forEach((e,t)=>{if(!e)return;let n=ct(t),r=W.body&&n.body?n.body:``,i=e.userData,a=Cn[n.pfd]??Cn[`Hi-vis yellow`];if(i.bodyWant===r){cr(e,a);return}i.bodyWant=r;let o=i.bodyReq=(i.bodyReq??0)+1;i.skinned?.remove(),cr(e,a),r&&(i.bodyLoad=km(async()=>{let{loadBody:e,SkinnedPaddler:t}=await import(`./skinned-paddler-DTWuh6oP.js`);return{loadBody:e,SkinnedPaddler:t}},__vite__mapDeps([4,3,5,6,7]),import.meta.url).then(({loadBody:n,SkinnedPaddler:s})=>n(r,`./`).then(n=>{if(o!==i.bodyReq)return;let r=new s(e,n);r.simpleHands=!0,cr(e,a),r.setSkinTone(lt(t),`./`),e.traverse(e=>{e.isMesh&&(e.castShadow=L,e.receiveShadow=L)}),Ct(e)})).catch(e=>console.warn(`competitor body not loaded`,r,e)).finally(()=>{i.bodySettled=!0,dr()}))})}let dt=null,ft=!1;function pt(){if(dt||!W.racers||q!==`Free play`)return;let e=window.__warm={t0:performance.now()},t=()=>new Promise(e=>setTimeout(e,30));dt=Promise.all(st.map((e,t)=>ht(t,e.color).userData.bodyLoad??null)).then(async()=>{e.bodies=performance.now()-e.t0;for(let e of Ze)ar(e,0,!1,_r().prof.form),e.userData.skinned?.pose(),await t();e.fit=performance.now()-e.t0;let n=Ze.map(e=>e.visible);Ze.forEach(e=>{e.visible=!0});let r=y.compileAsync?y.compileAsync(C,T):Promise.resolve(y.compile(C,T));return Ze.forEach((e,t)=>{e.visible=n[t]}),e.sync=performance.now()-e.t0,r.then(()=>{e.done=performance.now()-e.t0})}).catch(e=>console.warn(`competitors not made ahead`,e)).finally(()=>{ft=!0;try{dr()}catch{}})}let ht=(e,t)=>{if(!Ze[e]){let t=Kn(fe,{paddleDetail:g.racerPaddle});t.visible=!1,t.traverse(e=>{e.isMesh&&(e.castShadow=L,e.receiveShadow=L)}),C.add(t),Ze[e]=t,Ct(t)}!Ze[e].userData.bodyWant&&Ze[e].userData.bodyWant!==``&&ut(),Ze[e].userData.parts.hull.material.color.setHex(t);let n=st[e]?.look??Js(t,e+1);return Ze[e].userData.decalLook!==n&&(Ze[e].userData.decalLook=n,Ke(Ze[e]).setLook(n)),Ze[e]};C.add(ne,P.mesh,H,qe);for(let e of[H,qe])e.traverse(e=>{e.isMesh&&(e.castShadow=L,e.receiveShadow=L)});let gt=!m&&e.get(`env`)!==`0`,_t=gt?new Qr(y):null,vt=new w,yt=null,bt=0;vt.add(new he(new x(10,16,8),ne.material));function xt(){if(gt){yt?.dispose(),yt=_t.fromScene(vt,.02,.1,100);for(let e of[H,qe,...Ze])Ct(e)}}function Ct(e){yt&&e.traverse(e=>{e.isMesh&&e.material?.isMeshStandardMaterial&&e.material.envMap!==yt.texture&&(er(e.material),e.material.envMap=yt.texture,e.material.envMapIntensity=ee.env,e.material.needsUpdate=!0)})}let wt=()=>{gt&&(clearTimeout(bt),bt=setTimeout(xt,150))};await window.__crumb?.(`boat and foam built`);let Tt=new Cr(void 0,{base:`./`});e.get(`audio`)===`0`&&(Tt.s.on=!1),[`synth`,`recorded`].includes(e.get(`strokesound`))&&(Tt.strokeSound=e.get(`strokesound`));let Et=()=>{Tt.start()&&(removeEventListener(`pointerdown`,Et,!0),removeEventListener(`keydown`,Et,!0))};addEventListener(`pointerdown`,Et,!0),addEventListener(`keydown`,Et,!0),document.addEventListener(`visibilitychange`,()=>{document.hidden?Tt.suspend():Tt.ctx&&Tt.ctx.resume()}),window.__audio=Tt,window.__dbgExtra=()=>Tt.debugText(),window.__soundReport=()=>Tt.soundReport({build:`28cecec 2026-11-22 09:26Z`,url:location.href,scenario:G?.name,sea:Ii,windSeed:G?.windSeed,paddler:W.paddler,base:`./`});let Ot=`surfski.guide`,kt=[`routing`,`guide`,`guideAlts`,`guideStyle`,`guideWeight`,`coaching`],Nt={on:j_(localStorage)},Pt=e=>{Nt.on=!!e,M_(localStorage,Nt.on),ro.battery=Nt.on,ro.api.onBattery?.(Nt.on)},W={scenario:sn,mode:`Free play`,paddler:lr,body:e.get(`body`)===`simple`?``:e.get(`body`)??`mike-kit`,skin:(()=>{let t=e.get(`skin`);if(t!=null){let e=$n.findIndex(e=>e.toLowerCase()===t.toLowerCase());if(e>=0)return $n[e];if($n[Number(t)])return $n[Number(t)]}try{let e=localStorage.getItem(`surfski.skin`);if($n.includes(e))return e}catch{}return Sn})(),pfd:(()=>{let t=Object.keys(Cn),n=t.find(t=>t.toLowerCase()===(e.get(`pfd`)??``).toLowerCase());if(n)return n;try{let e=localStorage.getItem(`surfski.pfd`);if(t.includes(e))return e}catch{}return Rn})(),view:`Boyan cam`,playback:!1,inset:`Map`,mapZoom:.4,shore:new URLSearchParams(location.search).get(`shore`)!==`0`,quality:`Standard`,crit:Number(new URLSearchParams(location.search).get(`crit`)??1),renderScale:1,fov:Dy[`Boyan cam`].fov,routing:{cruise:`Cruise`,sporty:`Sporty`,race:`Race`,flow:`Surfing flow`,easy:`Cruise`,balanced:`Sporty`,fast:`Race`}[new URLSearchParams(location.search).get(`routing`)??new URLSearchParams(location.search).get(`autoroute`)]??`Sporty`,autopilot:new URLSearchParams(location.search).get(`autopilot`)===`1`||new URLSearchParams(location.search).get(`autoroute`)!=null,guide:!1,guideAlts:!0,coaching:!1,guideWeight:`Normal`,guideStyle:`Next wave`,eyeHeight:1.3,camSteady:.75,playSpeed:1,ripples:1,foam:.65,horizon:`Mountains`,tune:hu(),sprayAmt:g.sprayAmt??1,gelcoat:1,decals:!0,sprayModel:e.get(`spraymodel`)===`ribbons`?`Ribbons`:`Mesh (prototype)`,faceTint:!1,trailR:220,cloud:.35,cloudDark:0,cloudType:.25,cloudVar:.4,teal:.6,turbid:0,haze:`Light`,hazeAmt:.38,hazeType:.3,fogScale:1,bottom:null,sunAz:0,sunEl:22,timeOfDay:`As designed`,weather:`As designed`,weatherPreset:`As designed`,glint:1.3,crestSharpen:2,wiggle:1,drafting:!0,racers:tt>0,field:tt,session:it,droneSide:6,droneBack:-3.5,droneHeight:2,droneYaw:0,dronePitch:0,lite:!1};Re();let It={},G,K=null,Rt=null,q=`Free play`,J=!1,Y=0,zt=null,Bt={field:null,frames:[],dt:1/60},Ut=null,Wt=null,Gt=null,Kt=null,qt=null,Jt=null,xn=null,Tn=null,On;try{On=new Bm({worker:new Worker(new URL(new URL(`wave-solve-worker-PhWXXLTH.js`,import.meta.url).href,``+import.meta.url),{type:`module`})})}catch(e){console.warn(`no shore solve worker; it runs on the main thread`,e),On=new Bm}window.__shore=()=>({plan:Tn&&{...Tn,path:void 0},turns:G?.shoreTurns??null,on:!!xn,gains:xn,tiles:ci?.gains?{blocks:ci.gains.raw.size,empty:ci.gains.empty.size,done:!!ci.gains.done,ms:Math.round(performance.now()-ci.t0)}:null});let jn={left:!1,right:!1,up:!1,down:!1},Mn=!1,Fn=performance.now(),Vn=!1,Hn=!1,tr=0,or=0;function dr(){Fn=performance.now(),or=0,Mn&&(Mn=!1,Vn=!0,requestAnimationFrame(Wc))}for(let e of[`keydown`,`keyup`,`pointerdown`,`wheel`,`input`,`change`,`click`,`touchstart`,`touchend`,`resize`,`focus`,`drop`,`dragover`])addEventListener(e,dr,{passive:!0,capture:!0});addEventListener(`pointerdown`,()=>{Hn=!0},{capture:!0,passive:!0});for(let e of[`pointerup`,`pointercancel`])addEventListener(e,()=>{Hn=!1,dr()},{capture:!0,passive:!0});for(let e of[`pointermove`,`mousemove`,`scroll`,`contextmenu`,`gamepadconnected`,`compositionstart`,`beforeinput`])addEventListener(e,dr,{capture:!0,passive:!0});document.addEventListener(`visibilitychange`,dr),C.addEventListener(`childadded`,dr),window.__field=()=>({depth:(()=>{let e=Si(),t=G.headingDeg*Math.PI/180,n=Math.sin(t),r=Math.cos(t),i={};for(let t of[-16,-8,-4,0,4,8,16])for(let a of[0,6,12])i[`${t}/${a}`]=e?+e(K.states[0].e+r*t-n*a,K.states[0].n-n*t-r*a).toFixed(1):null;return i})(),user:{e:K.ski.e,n:K.ski.n},live:(Wi?.setters??[]).map(e=>({name:e.name,lane:e.lane,back:e.back,e:e.g.ski.e,n:e.g.ski.n}))}),window.__idleState=()=>({idle:Mn,frames:y.info.render.frame,idleFrames:tr});let fr=0,pr=!1,mr=0;window.__stepFrames=(e=1,t=!1)=>{J&&(J=!1,uo()),fr+=e,pr=t,mr=0,dr()};let hr=()=>Bt.frames[0]?.t??0,gr=()=>Bt.frames[Bt.frames.length-1]?.t??0,_r=()=>q===`Recording`&&Rt?Rt:K;function Or(){let e=_r();Bt={field:e.field,frames:e.frames,dt:e.dt}}let kr=new iv(d),X=new dv(d),jr=new ov(d),Mr=document.getElementById(`inset`),Nr=()=>60*200**(1-W.mapZoom),Pr=e=>(e&&n[ji(e)])?.meta.skylines?.[e.skyline??`default`]??null,Fr=e.get(`landfog`)!==`0`,Ir=new Lv(C,Fr?()=>Bn(P.uniforms):null),Lr=Fr?Bn(P.uniforms):null,Rr=e=>{let t=e&&n[ji(e)]?.meta;if(!t||t.maxE==null)return;let r=e.start?.e??0,i=e.start?.n??0;return e=>{let n=Math.sin(e*Math.PI/180),a=Math.cos(e*Math.PI/180),o=1e9;return n>1e-9?o=Math.min(o,(t.maxE-r)/n):n<-1e-9&&(o=Math.min(o,(t.minE-r)/n)),a>1e-9?o=Math.min(o,(t.maxN-i)/a):a<-1e-9&&(o=Math.min(o,(t.minN-i)/a)),Math.min(6e4,Math.max(6e3,Math.max(0,o)+4e3))}};function zr(){zt&&=(C.remove(zt),zt.geometry.dispose(),null),zt=Tv(W.horizon,G?G.headingDeg:180,Pr(G),{material:Lr,distAt:Rr(G)}),zt&&C.add(zt),Ir.setGeo(zt&&e.get(`peaks`)===`1`?G?.geo:null)}let Br=null,Vr=null,Hr={},Ur={},Wr={};function Gr(t){let r=t.site,i=r&&n[r]?n[r]:null;if(e.get(`hdg`)!=null&&(t.headingDeg=Number(e.get(`hdg`))),i&&e.get(`at`)){let[n,r]=e.get(`at`).split(`,`).map(Number),[a,o]=Mt({lat:i.meta.lat0,lon:i.meta.lon0},n,r);t.start={e:a,n:o},e.get(`hdg`)!=null&&(t.headingDeg=Number(e.get(`hdg`))),Kr(t,i)}else{if(i&&t.goalLatLon){let[e,n]=Mt({lat:i.meta.lat0,lon:i.meta.lon0},t.goalLatLon[0],t.goalLatLon[1]);t.goal={e,n}}if(i&&!t.start){let[e,n]=t.startLatLon?Mt({lat:i.meta.lat0,lon:i.meta.lon0},t.startLatLon[0],t.startLatLon[1]):i.point(t.startPoint,t.startOffset);t.start={e,n}}Kr(t,i)}}function Kr(t,n){if(!n||!(t.marks?.length||t.goalLatLon)||e.get(`course`)===`0`)return;t.raceCourse=vn(t,(e,t)=>Mt({lat:n.meta.lat0,lon:n.meta.lon0},e,t),{depthFn:(e,t)=>n.depthAt(e,t)});let r=t===G&&qr?qr:t.raceCourse?.cursor();t.raceCourse&&(t.goal={...t.raceCourse.target(r)??t.raceCourse.target(t.raceCourse.cursor())},t.goalFinal=!1)}let qr=null,Jr=[];function Yr(){let e=G.raceCourse;if(!e||!qr||!K)return;let t=e.update(qr,K.ski.e,K.ski.n);if(!t)return;Jr.push([K.t,qr.i]);let n=e.next(qr);n?(G.goal={...n.point},Ki?.setGoal(n.point,!1),Bv(`${t.lap<n.lap?`Lap ${t.lap} of ${e.laps} done. `:``}${t.buoys?`Through`:`Round`} ${t.mark.name}: next ${e.describe(n)}`)):(Ki?.finish(),Bv(`Finished: through ${t.mark.name}`))}function Xr(e){let t=G.raceCourse;if(!t||!qr)return;for(;Jr.length>1&&Jr[Jr.length-1][0]>e+1e-6;)Jr.pop();let n=Jr[Jr.length-1]?.[1]??0;if(n===qr.i)return;qr.i=n,qr.pe=qr.pn=null;let r=t.next(qr);r&&(G.goal={...r.point},Ki&&Ki.setGoal(r.point,!1))}function Zr(t){let r=ji(t),i=r&&n[r];if(!i||e.get(`objects`)===`0`){pe.clear();return}let o=t.start??{e:0,n:0},s={lat:i.meta.lat0,lon:i.meta.lon0},c=t.aidFixes??null,l=(a[r]??[]).map(e=>c?.[e.name]?{...e,...c[e.name]}:e),u=hn(t.raceCourse,l,s);pe.setSite(s,[...l,...u.buoys],[...t.traffic??gn[r]??[],...u.boats],o,(e,t)=>i.depthAt(e,t))}let $r=null,ei=null,ti=!1;function ni(t,n){if($r&&$r!==c[t]?.group&&(C.remove($r),$r=null,ei=null),t&&n&&e.get(`gltf`)&&!ti&&(ti=!0,km(()=>import(`./devmodels-D8BCf3h5.js`).then(t=>t.loadDevModels(e.get(`gltf`),(e.get(`gltfAt`)??`${n.meta.lat0},${n.meta.lon0}`).split(`,`).map(Number),C,(e,t)=>Mt({lat:n.meta.lat0,lon:n.meta.lon0},e,t))),__vite__mapDeps([8,3,7]),import.meta.url)),t&&n&&W.shore&&s[t]){if(!c[t]){let e=performance.now();c[t]=fl(s[t],n,{cullM:g.shoreCullM??0}),console.info(`shore ${t}: ${JSON.stringify(c[t].stats)} built in ${Math.round(performance.now()-e)} ms`)}$r!==c[t].group&&($r=c[t].group,ei=c[t],C.add($r))}}let ri=e.get(`landlight`);function ii(t){let r=t.site,i=r&&n[r]?n[r]:null,a=`flat`,o=null;i&&(a=r,Hr[a]??={terrain:i,mesh:i.buildMesh({gammaLight:ri===`gamma`||ri!==`lambert`&&!!i.landRGB,step:Number(e.get(`landstep`))||g.landStep||1,tiles:U_(`landlod`)})},o=i),Ut=o;let s=i&&t.windFromDeg!=null?`${r}:${t.windFromDeg}:${t.fetchKm}:${t.fetchSpreadDeg??0}`:null;s&&(Ur[s]??=xr(i,t.windFromDeg,(t.fetchKm??30)*1e3,{spreadDeg:t.fetchSpreadDeg??0})),Wt=Jt=s?Ur[s]:null;let c=i&&e.get(`swellshadow`)!==`0`?vr(t.seaModel):[],l=c.length?`${r}:swell:${c.map(e=>`${Math.round(e.fromDeg)}/${Math.round(e.spreadDeg)}/${e.Hs.toFixed(2)}`).join(`,`)}`:null;l&&(Ur[l]??=yr(i,c)),Gt=l?Ur[l]:null;let u=t.seaModel?.shoreMap,d=u&&e.get(`shorefx`)!==`0`?Wr[r]?.[u]:null;if(d&&Wt){let e=`${s}|${u}`;Ur[e]??=_n(Wt,d),Wt=Ur[e]}if(Gr(t),a!==Vr){Br&&C.remove(Br),Br=Hr[a]?.mesh??null,Br&&C.add(Br);for(let[e,t]of Object.entries(Hr))e!==a&&(t.mesh.userData.dispose(),delete Hr[e]);for(let e of Object.keys(Ur))e.startsWith(`${r}:`)||delete Ur[e];Vr=a,o?P.setTerrain(o):P.setTerrain(Oy())}ni(r,i),xn=null,P.setShoreTexture(null),P.setFetchTexture(br(Wt,Gt)),P.setSwellShadow(!!Gt),ai(t,i)}function ai(t,n){let r=n?{lat:n.meta.lat0,lon:n.meta.lon0}:null,i=(e,t)=>Mt(r,e,t),a=e.get(`wavesolve`);if(a!==`window`){ui(t,n,a===`0`?null:n?Gm(t,n,t.windSea,{toEnu:i}):null);return}let o=n?Lm(t,n,t.windSea,{toEnu:i}):null;if(Tn=o,!o){t.shoreTurns&&t===G&&gi(null);return}let s=On.cached(o);if(s){hi(o,s);return}let c=performance.now();On.request(o,n).then(e=>{e&&Tn?.key===o.key&&t===G&&(console.info(`shore solve ${o.key}: ${e.W}x${e.H} cells in ${Math.round(performance.now()-c)} ms`),hi(o,e))})}let oi=new Map,ci=null;function li(){ci&&=(clearInterval(ci.timer),ci.gains?.done||On.cancel(),null)}function ui(e,t,n){if(ci?.plan.key===n?.key&&ci?.sc===e){ci.gains&&(ci.fieldsSet=!1,ci.texAt=0,mi(ci,!!ci.gains.done));return}if(li(),Tn=n,!n){e.shoreTurns&&e===G&&gi(null);return}let r=ci={plan:n,sc:e,gains:oi.get(n.key)??null,turned:!1,t0:performance.now(),texAt:0,ck:eh(n.key,t)},i=e.start??{e:n.region.e0,n:n.region.n0};r.gains?.done?mi(r,!0):th(r.ck).then(a=>{ci===r&&(a?.out&&a.blocks?.length?(r.gains=new qm(a.out,{spread:Jt,turns:null}),r.gains.add(a.blocks),r.gains.done=!0,r.gains.fromCache=!0,oi.set(n.key,r.gains),console.info(`whole-map shore solve ${n.key}: from this browser's store (${a.blocks.length} blocks)`),mi(r,!0)):di(r,e,t,n,i))})}function di(e,t,n,r,i){let a=()=>{let e=K!==void 0&&K&&t===G?K.ski:null;return e?[[e.e,e.n],[e.e+800*Math.sin(e.psi),e.n+800*Math.cos(e.psi)]]:[[i.e,i.n]]};On.tiles(Km(r,n,Jt,a(),(t.fetchKm??30)*1e3,{nearM:0}),t=>{if(ci===e){if(!e.gains)for(e.gains=new qm(t.out,{spread:Jt,turns:null}),oi.set(r.key,e.gains);oi.size>3;)oi.delete(oi.keys().next().value);e.gains.add(t.blocks),t.kind===`tilesDone`&&(e.gains.done=!0,clearInterval(e.timer),console.info(`whole-map shore solve ${r.key}: ${t.solved} tiles solved, ${t.open} open, in ${Math.round(t.ms)} ms`),nh(e.ck,{out:e.gains.out,blocks:[...e.gains.raw.values()]})),mi(e,t.kind===`tilesDone`)}}),e.timer=setInterval(()=>{ci===e&&!e.gains?.done&&On.focus(a())},3e3)}function fi(e){let t=K?.field?.fetchFn,n=G.windSea??G.state.windSea,r=pi(),i=[1,0,0],a=t?(e,n)=>{i[0]=t(e,n);let r=t.turned?t.turned(e,n):null;return i[1]=r?r[0]:0,i[2]=r?r[1]:0,i}:null,o=n?r?r.text:xn?`Local effects: solved (course window)`:t?`Fetch shelter only`:`Open water`:`No wind sea`;jr.drawLocal({ski:e,terrain:Ut,widthM:Nr(),gain:a,toDeg:n?.toDeg??G.state.stats.dominant?.dirToDeg??0,turns:G.shoreTurns??null,status:o,label:`Wind sea against the open sea`})}function pi(){let e=ci,t=e?.gains;if(!e||e.sc!==G)return null;if(!t)return{text:`Local effects: solving...`,blocks:[],show:!1,sig:`start`};let n=t.out.BW*t.out.BH,r=t.raw.size+t.empty.size,i=!!t.done;i&&!e.doneAt&&(e.doneAt=performance.now());let a=!i||performance.now()-e.doneAt<1e4,o=t.out.B*t.out.co;return a&&(e.mapN!==t.raw.size||!e.mapBlocks)&&(e.mapN=t.raw.size,e.mapBlocks=[...t.raw.values()].map(e=>({e0:t.out.e0+e.bx*o,n0:t.out.n0+e.by*o,size:o,quick:!!e.quick}))),{text:i?t.fromCache?`Local effects: solved (kept from before)`:`Local effects: solved`:`Local effects: solving... ${Math.round(100*r/n)}%${t.raw.size&&[...t.raw.values()].some(e=>e.quick)?` (yellow: quick pass)`:``}`,done:i,show:a,blocks:a?e.mapBlocks??[]:[],sig:`${r}|${i}|${a}`}}function mi(e,t){if(!t)return;let n=e.gains,r=e.sc;if(!n||r!==G)return;let i=r.start??{e:e.plan.region.e0,n:e.plan.region.n0};if(!e.turned&&(t||n.covered(i.e,i.n,1e3))){let t=e.plan.path.length?e.plan.path:[[i.e,i.n]],a=t.map(e=>e[0]),o=t.map(e=>e[1]),s=Um(n.window({e0:Math.min(...a)-800,e1:Math.max(...a)+800,n0:Math.min(...o)-800,n1:Math.max(...o)+800}),t),c={left:Math.round(s.left),right:Math.round(s.right)},l=r.shoreTurns??{left:0,right:0};(c.left!==l.left||c.right!==l.right)&&gi(c.left||c.right?c:null),n.setTurns(G.shoreTurns??null),e.turned=!0,e.fieldsSet=!1,e.texAt=0}let a=performance.now();(t||a-e.texAt>1e3)&&(e.texAt=a,P.setShoreTexture(n.texture(),n.solveRect)),!e.fieldsSet&&(n.raw.size||t)&&(xn=n,Wt=Jt,P.setFetchTexture(br(Jt,Gt)),_i(),e.fieldsSet=!0),t&&e.texAt!==a&&P.setShoreTexture(n.texture(),n.solveRect),!e.noted&&!n.fromCache&&K!==void 0&&K&&K.t>1&&(e.noted=!0,Bv(`Wave and shore interactions updated (the local effects are solved)`,3500))}function hi(e,t){let r=Um(t,e.path),i={left:Math.round(r.left),right:Math.round(r.right)},a=G.shoreTurns??{left:0,right:0};(i.left!==a.left||i.right!==a.right)&&gi(i.left||i.right?i:null),xn=Hm(t,G.shoreTurns,{spread:Jt,pack:n[ji(G)],fromDeg:G.windFromDeg,maxFetchM:(G.fetchKm??30)*1e3}),Wt=Jt,P.setFetchTexture(br(Jt,Gt)),P.setShoreTexture(xn.texture(),xn.solveRect),_i()}function gi(e){let t=G.state,n={start:G.start,goal:G.goal,headingDeg:G.headingDeg};on(G,G.seaModel,{turns:e}),Object.assign(t,G.state),G.state=t,Object.assign(G,n),G.state.stokes=W.crestSharpen,Ei=null,K!==void 0&&K&&(K.field._envT=void 0),Bi()}function _i(){if(K===void 0||!K)return;let e=Ci();K.field.fetchFn=e,K.field._plan=null,Ei=null,Ui=null;for(let t of Wi?.setters??[])for(let n of new Set([t.g.field,t.full].filter(Boolean)))n.fetchFn=e,n._plan=null;Ki?._sim&&(Ki._sim.field=K.field.planField())}let vi={},yi={s:0,size:0,pan:0},bi=-1;function xi(e,t){if(!(P.uniforms.uSpillOn.value>.5)||!K?.field)return yi.s=0,yi;if(t-bi<.05&&t>=bi)return yi;bi=t;let n=1,r=0,i=0,a=0;for(let o=-1;o<16;o++){let s=o<0?0:o<8?12:28,c=o<0?0:o%8*(Math.PI/4)+(o<8?0:Math.PI/8)+e.psi,l=e.e+s*Math.sin(c),u=e.n+s*Math.cos(c);K.field.spillFoam(l,u,t,vi);let d=vi.s/(1+(s/14)**2);d<=0||(n*=1-d,r+=d,i+=d*vi.size,a+=d*Math.sin(c-e.psi))}return yi.s=1-n,yi.size=r>0?i/r:0,yi.pan=r>0?a/r*.8:0,yi}let Si=()=>Ut?(e,t)=>Ut.depthAt(e,t):null,Ci=()=>{let e=xn,t=Wt;if(e){let t=(t,n)=>e.factor(t,n);return t.turned=(t,n)=>e.turned(t,n),t}return t?(e,n)=>t.factor(e,n):null},wi=()=>(e,t)=>Gt?Gt.factor(e,t):1,Ti=()=>new Vt(G.state,Si(),Ci(),wi()),Ei=null,Di=()=>{let e=G.state;if(Ei?.src!==e){let t=new Vt(e).fft;Ei={src:e,st:{...e,fft:e.fft?{...e.fft,sea:t?t.twin():null}:e.fft}}}return new Vt(Ei.st,Si(),Ci(),wi())},Oi=[`#c9a7ff`,`#a56bff`,`#7a2cf0`],ki=[`light`,`drag`,`heavy`],Ai=matchMedia(`(max-width: 760px)`).matches?`Tap ☰, then Start paddling · ◀ ▶ steer · ▲ power up · ▼ ease off`:`Press Space to start · ←/→ steer · ↑ power up · ↓ ease off · ? for the full controls`,ji=e=>e.site,Mi=null,Ni={};function Pi(e){let t=ji(e);return!t||n[t]!==void 0?Promise.resolve():Ni[t]??=Fi(t).finally(()=>{delete Ni[t]})}async function Fi(t){n[t]=await fn.load(`./sites/${t}/`,{landImage:e.get(`landimg`)!==`0`}).catch(e=>(console.error(`terrain pack failed`,t,e),null)),n[t]&&(Wr[t]=await mn(`./sites/${t}/`)),n[t]&&(a[t]=await fetch(`./sites/${t}/aids.json`).then(e=>e.ok?e.json():null).then(e=>e?.aids??[]).catch(()=>[])),n[t]&&(s[t]=e.get(`shore`)===`0`?null:await fetch(`./sites/${t}/shore.json`).then(e=>e.ok?e.json():null).catch(()=>null)),n[t]&&s[t]&&e.get(`mounds`)!==`0`&&n[t].setStructures(el(s[t])),n[t]||(Mi=`Could not load the shoreline; showing open sea.`)}let Ii=null,Li=e.get(`seapick`),Ri=null;{let t=e.get(`sea`);if(t)try{let e=Zt(t);e.ok?Ri=e.model:console.warn(`sea state not used:`,e.errors)}catch(e){console.warn(`bad ?sea= link`,e)}}function zi(t){dr();let r=dn(t);if(W.scenario=t,Pa!==void 0&&W.place!==Na(t)&&(W.place=Na(t),Pa.options(Ma(W.place))),ji(r)&&n[ji(r)]===void 0){ls(`Loading the shoreline…`),Pi(r).then(()=>{W.scenario===t&&zi(t)});return}G=r,Gr(G),Li&&=(Ii=Li,null),[...Xt(t),...rn,...La(t)].some(e=>e.id===Ii)||(Ii=Xt(t)[0].id),on(G,Ri??tn(Ii).model());try{history.replaceState(null,``,is())}catch{}typeof Ra==`function`&&Ra(),ii(G),Zr(G),B?.clear();let i=Pr(G)?`Skyline`:G.horizon;i?(W.prevHorizon??=W.horizon,W.horizon=i):W.prevHorizon&&=(W.horizon=W.prevHorizon,null),W.turbid=0,W.cloudDark=0,W.cloudType=.25,W.cloudVar=.4,W.haze=`Light`,W.bottom=null,Object.assign(W,G.look),va(),ae(),Object.assign(W,It),ae();for(let e of Object.keys(It))delete It[e];te(W.cloud),e.get(`mapZoom`)||dc(),G.state.stokes=W.crestSharpen,ka().forEach(e=>e.updateDisplay()),Bi(),zr(),ba(),da()}function Bi(){P.setWaveState(G.state),Ce.setShape(G.state.ripples);let t=e.get(`lwmap`)===`0`?null:nu(G,1),n=t?.gusty?{gustMs:t.gustMs,gustCover:.5*t.cover*(1-t.lullShare)}:null;B?.setSea({windMs:Lt(G.windMs??0),gustMs:n?Lt(n.gustMs):G.state.gusts?.on?G.state.gusts.windMs:0,gustCover:n?n.gustCover:G.state.gusts?.coverage??0,water:Dt(G.place)});let r=G.state.stats.dominant??{dx:0,dy:1,k:1,omega:0},i=r.omega/r.k;P.uniforms.uStreakDir.value.set(r.dx,r.dy),P.uniforms.uWaveVel.value.set(r.dx*i,r.dy*i)}let Vi={Cruise:`easy`,Sporty:`balanced`,Race:`fast`,"Surfing flow":`flow`},Hi=!1,Ui=null,Wi=null;function Gi(){if(Wi)return Wi;let e=G.raceCourse,t=e?e.target(e.cursor()):Ki.goal;return Wi=new Jp({makeGhost:()=>new Yu(G,Ti(),Si(),K.paddlerName,`v2`),state0:K.states[0],goal:t,depthFn:Si(),effort:Vi[W.routing]??`balanced`,drafting:W.drafting,smallSea:Je(),competitors:st,session:ot(),course:G.raceCourse??null}),Wi.userCur=qr,Wi}let Ki=null,qi=!1,Ji=document.getElementById(`coach`),Yi=document.getElementById(`coachMain`),Xi=document.getElementById(`coachNext`),Zi=new _f({variety:e.get(`coachvar`)===`1`}),Qi=e.get(`coachdebug`)===`1`,$i=new Hd(C),ea=new Cm(C,`./`),ta=new Hd(C),na=new ah(C),ra=Qn(fe,H.userData.parts.hull.geometry);y.getContext().getContextAttributes()?.stencil&&e.get(`guidemask`)!==`1`?($i.useStencil(1),ta.useStencil(1),ta.mesh.renderOrder=6):($i.setMask(P.uniforms),ta.setMask(P.uniforms),ta.mesh.renderOrder=4);function ia(t=!1){let n=q===`Free play`,r=W.autopilot&&n,i=e.get(`plan`)!==`0`;if(!n||!(i||r||W.guide||W.coaching)){Ki?.drive&&(K.setSteer(0),K.setPower(null)),Ki=null,$i.hide(),ea.hide();return}let a=Vi[W.routing]??`balanced`;Ki?Ki.o.effort!==a&&Ki.setEffort(a):(Ki=new bp(K,{effort:a,drive:!1,traffic:{others:()=>W.racers&&Wi?Wi.near(K.ski.e,K.ski.n,null,85,6):[],small:Je()},...e.get(`arriveM`)?{arriveM:Number(e.get(`arriveM`))}:{}}),qi=!1),r!==Ki.drive&&(Ki.setDrive(r),qi=!1),Ki.setLead(W.coaching?Number(e.get(`lead`)??.8):0),t&&r&&Bv(`Autopilot (${W.routing.toLowerCase()}): heading for a goal ${(Ki.distToGoal/1e3).toFixed(1)} km ahead. Any steering or power key takes the controls back`)}let aa=()=>{ia(!0),W.autopilot||Bv(`Autopilot off`)};function oa(e){let t=Math.max(0,Math.min(40,Number(e)||0));try{localStorage.setItem(`surfski.field`,String(t))}catch{}if(st=rt(t),W.racers=t>0,!t)Wi=null,Bv(`Just you: nobody else is simulated`);else if(q===`Free play`&&st.forEach((e,t)=>ht(t,e.color)),pt(),!Wi||!J&&Y<.5){let e=!J&&Y<.5;Wi=null,Bv(e?`A group of ${t+1}: you and ${t} others`:`${t} others start from the start line, behind you (R restarts the run with them beside you)`)}else t<Wi.setters.length?(Wi.setters.length=t,Bv(`A group of ${t+1}`)):t>Wi.setters.length&&Bv(`${t-Wi.setters.length} more join at the next start (R restarts the run)`)}function sa(e){at=zp[e]?e:`Race`;try{localStorage.setItem(`surfski.session`,at)}catch{}st=rt(W.field),!Wi||!J&&Y<.5?(Wi=null,Bv(at===`Race`?`Race: the others race you to the finish`:`Group paddle: the others head where you head, surf their own lines and stay with you; they regroup when you stop`)):Bv(`${at} from the next start (R restarts the run)`)}let ca=()=>{ia(),Wi?.setEffort(Vi[W.routing]??`balanced`),Bv(`Routing mode ${W.routing}: ${{Cruise:`saves energy, arrives later`,Sporty:`a balance of speed and effort`,Race:`spends effort wherever it buys speed`,"Surfing flow":`rides the waves as long as it can with the paddle idle, and paddles only to catch or keep a ride`}[W.routing]}`)},la=()=>{ia(),Bv(W.guide?`Guide on (${W.routing.toLowerCase()}): the arrow shows where the planner would go. Colour is the power it plans: blue glide, cyan easy, green steady, yellow hard, red sprint`:`Guide off`)},ua=()=>{Ki?.drive&&(W.autopilot=!1,ia(),ka().forEach(e=>e.updateDisplay()),Bv(`Autopilot off: you have the controls`))};function da(){q=W.mode=`Free play`,Rt=null,G.tune=mu(W.tune),e.get(`speed`)!=null&&(G.speed=Number(e.get(`speed`))/2.23694),G.fixedSpeed=e.get(`fixedSpeed`)==null?null:Number(e.get(`fixedSpeed`))/2.23694,Wi=null,Ui=null,Hi=!1,document.getElementById(`scoreCard`)?.remove(),G.windSeed=e.get(`windseed`)==null?Math.random()*2**31|0:Number(e.get(`windseed`))|0,qr=G.raceCourse?G.raceCourse.cursor():null,Jr=[[0,0]],G.raceCourse&&(G.goal={...G.raceCourse.target(qr)}),K=new Yu(G,Ti(),Si(),W.paddler,`v2`),j(K.localWind),Ki=null,ia(),Or(),Y=0,J=!1,Kt=qt=null,xs=!0,ls(Mi?`${Mi} ${Ai}`:Ai),Mi=null,uo(),ka().forEach(e=>e.updateDisplay())}let fa={"As designed":null,Morning:8,Midday:12,Afternoon:15.5,Evening:18.5,"Golden hour":{el:16},Sunset:19.8,Dusk:{el:-2}},pa={"As designed":null,Sunny:{cloud:.08,cloudType:.2,cloudDark:0},"Partly cloudy":{cloud:.35,cloudType:.25,cloudDark:0},Cloudy:{cloud:.65,cloudType:.78,cloudDark:0},Overcast:{cloud:.95,cloudType:1,cloudDark:.55},Stormy:{cloud:1,cloudType:.62,cloudDark:1},"Bright midday":{cloud:.03,cloudType:.1,cloudDark:0,sunGain:1.4,ambGain:1.1,haze:`None`},"Bright and clear":{cloud:.15,cloudType:.2,cloudDark:0,sunGain:1.15,ambGain:1.3,haze:`None`},"Bright clouds":{cloud:.55,cloudType:.3,cloudVar:.2,cloudDark:0,sunGain:1.25,ambGain:1.25},"Hazy sun":{cloud:.12,cloudType:.05,cloudDark:0,sunGain:1.2,ambGain:1.1,haze:`Hazy`},Smoke:{cloud:.05,cloudType:.25,cloudDark:0,sunGain:1.2,ambGain:1.1,haze:`Smoky`},"Smoky clouds":{cloud:.5,cloudType:.3,cloudVar:.5,cloudDark:0,sunGain:1.25,ambGain:1.15,haze:`Smoky`},Thunderheads:{cloud:.45,cloudType:.6,cloudVar:.85,cloudDark:0,sunGain:1.15,ambGain:1.1,haze:`None`},Cirrus:{cloud:.6,cloudType:0,cloudVar:.5,cloudDark:0,sunGain:1.2,ambGain:1.15},"Fair-weather cumulus":{cloud:.4,cloudType:.25,cloudVar:.2,cloudDark:0,sunGain:1.2,ambGain:1.15}},ma={"As designed":null,"Bright midday":[`Midday`,`Bright midday`],"Thunderheads at sunset":[`Sunset`,`Thunderheads`],Afterglow:[`Dusk`,`Thunderheads`],"Cirrus evening":[`Golden hour`,`Cirrus`],"Golden haze":[`Golden hour`,`Hazy sun`],"Hazy midday":[`Midday`,`Hazy sun`],"Smoky sunset":[`Sunset`,`Smoke`],"Bright sunset":[`Sunset`,`Bright and clear`],"Bright clouds":[`Midday`,`Bright clouds`],"Fluffy cumulus":[`Midday`,`Fair-weather cumulus`],"Salmon sunset":[`Sunset`,`Fair-weather cumulus`],"Cumulonimbus afternoon":[`Afternoon`,`Thunderheads`],"Summer morning":[`Morning`,`Partly cloudy`],"Summer midday":[`Midday`,`Sunny`],"Summer afternoon":[`Afternoon`,`Partly cloudy`],"Summer evening":[`Evening`,`Partly cloudy`],"Cloudy midday":[`Midday`,`Cloudy`],"Overcast morning":[`Morning`,`Overcast`],"Midday stormy":[`Midday`,`Stormy`],"Stormy evening":[`Evening`,`Stormy`],Custom:null};function ha(){let e=ma[W.weatherPreset];W.weatherPreset!==`Custom`&&(e?(W.timeOfDay=e[0],W.weather=e[1]):(W.timeOfDay=`As designed`,W.weather=`As designed`),ya())}function ga(){W.weatherPreset=`Custom`,ya()}function _a(e,t,n=!1){let r=23.44*Math.PI/180,i=e*Math.PI/180,a=(t-12)*15*Math.PI/180,o=Math.asin(Math.sin(i)*Math.sin(r)+Math.cos(i)*Math.cos(r)*Math.cos(a)),s=Math.atan2(Math.sin(a),Math.cos(a)*Math.sin(i)-Math.tan(r)*Math.cos(i));return{el:n?o*180/Math.PI:Math.min(70,Math.max(5,Math.round(o*180/Math.PI))),az:Math.round(((s*180/Math.PI+180)%360+360)%360)}}function va(){let e=fa[W.timeOfDay],t=G?.geo?.lat??47.655;if(e?.el!=null){let n=e.el,r=12;for(let e=12;e<=23;e+=.02)_a(t,e,!0).el>=n&&(r=e);W.sunAz=_a(t,r).az,W.sunEl=n,e=null}if(e!=null){let n=_a(t,e);W.sunAz=n.az,W.sunEl=n.el}let n=pa[W.weather];n&&Object.assign(W,n)}function ya(){let e=G?.look??{},t={cloud:.35,cloudType:.25,cloudVar:.4,sunAz:0,sunEl:22,cloudDark:0,sunGain:1,ambGain:1,haze:`Light`};for(let n of Object.keys(t))W[n]=e[n]??t[n];va(),ae(),ba(),te(W.cloud),ka().forEach(e=>e.updateDisplay())}function ba(){let t=P.uniforms,n=W.sunEl*Math.PI/180,r=W.sunAz*Math.PI/180;t.uSunDir.value.set(Math.sin(r)*Math.cos(n),Math.sin(n),-Math.cos(r)*Math.cos(n)).normalize(),le(),te(W.cloud);try{wt()}catch{}t.uGlint.value=W.glint,t.uPix.value=+(e.get(`pix`)===`1`),t.uShadow.value=0,t.uAid.value=0,W.trailR=Number(e.get(`trailR`)??W.trailR??(B?220:450)),t.uTrailR.value=W.trailR,t.uWindMs.value=Lt(G?.windMs??9),P.refreshRipples(),t.uFoamStyle.value=+(e.get(`foamstyle`)===`crest`),t.uStokes.value=W.crestSharpen,t.uTeal.value=W.teal,t.uTurbid.value=W.turbid??0,G&&(G.state.stokes=W.crestSharpen);try{Ho?.contentWindow?.postMessage({kind:`surfski-sea-look-init`,ripples:W.ripples,teal:W.teal},location.origin)}catch{}}let xa={f:0,r:0,u:0,yaw:0,pitch:0},Sa=()=>Dy[W.view].local?3:30;function Ca(){let e=Dy[W.view];e.free&&(Z._0x8318f9=!0),Object.assign(xa,{f:0,r:0,u:0,yaw:0,pitch:0}),W.fov=e.fov,e.local&&(W.camSteady=e.steady??0),ba(),T.fov=W.fov,T.updateProjectionMatrix(),ka().forEach(e=>e.updateDisplay())}let wa=new cs({title:`Settings`,container:document.getElementById(`paneSettings`)});wa.add({json(){Er({courses:Object.values(ln).map(e=>e.id).filter(Boolean),paddlers:Object.keys(zn),weatherPresets:Object.keys(ma).filter(e=>ma[e]),times:Object.keys(fa),weathers:Object.keys(pa)}),km(()=>import(`./settings-editor-9mFpOptI.js`).then(e=>e.openSettingsEditor({url:new URLSearchParams(location.search),file:t?.settings??{}})),__vite__mapDeps([9,10]),import.meta.url).catch(e=>Bv(`The settings editor did not load: ${e.message}`))}},`json`).name(`Edit settings as JSON…`);let Ta=document.getElementById(`paneScene`),Ea=new cs({title:`Scene`,container:Ta}),Da=Ea.addFolder(`Scenario`),Oa=Ea.addFolder(`Routing and coaching`);function ka(){return[...wa?.controllersRecursive()??[],...Ea?.controllersRecursive()??[]]}let Aa=!!(Yt(e.get(`scenario`))?.test||e.has(`config`)||e.get(`tests`)===`1`),ja=cn($t.filter(e=>!e.test||Aa)),Ma=e=>Object.fromEntries(ja.find(t=>t.place===e).items.map(e=>[e.label,e.name])),Na=e=>ja.find(t=>t.items.some(t=>t.name===e))?.place??ja[0].place;W.place=Na(W.scenario),W.sea=null,Da.add(W,`place`,Object.fromEntries(ja.map(e=>[un(e.place),e.place]))).name(`1 · Place`).onChange(e=>{let t=ja.find(t=>t.place===e).items[0].name;Pa.options(Ma(e)),W.scenario=t,Pa.updateDisplay(),Ri=null,Ii=null,zi(t)});let Pa=Da.add(W,`scenario`,Ma(W.place)).name(`2 · Course`).onChange(e=>{Ri=null,Ii=null,zi(e)}).listen(),Fa={easy:`Easy`,advanced:`Advanced`,expert:`Expert`},Ia=Da.add(W,`sea`,{}).name(`3 · Sea state`).onChange(e=>{e!==`custom`&&(Ri=null,Ii=e,zi(W.scenario))});function La(e){return nn().filter(t=>t.courses.includes(e))}function Ra(){let e={};for(let t of Xt(G.name))e[`${Fa[t.level]} · ${t.name}`]=t.id;for(let t of rn)e[`Any course · ${t.name}`]=t.id;for(let t of La(G.name))t.id===Ii&&(e[`Retired · ${t.name}`]=t.id);Ri&&(e[`Edited (from the editor, a clip or a link)`]=`custom`),Ia.options(e),W.sea=Ri?`custom`:Ii,Ia.updateDisplay()}wa.add(W,`mode`,[`Free play`,`Recording`]).name(`Mode`).onChange(Fo).listen(),Da.add(W,`weatherPreset`,Object.keys(ma)).name(`4 · Weather`).onChange(ha).listen(),Da.add(W,`paddler`,Object.keys(zn)).name(`5 · Boat & experience`).onChange(()=>{q===`Recording`?(ls(`A recording keeps its paddler. Switch to Free play to change it.`),W.paddler=Rt.paddlerName,ka().forEach(e=>e.updateDisplay())):K.setPaddler(W.paddler)&&Bv(`Paddler and boat changed to ${W.paddler}`,2400)}).listen();let za={...wn};Object.values(za).includes(W.body)||(za[W.body?W.body:Pn]=W.body),Ie=Da.add(W,`body`,za).name(`6 · Paddler model`).onChange(Ve),Da.add(W,`skin`,$n).name(`6c · Skin tone`).onChange(e=>{H.userData.skinned?.setSkinTone($n.indexOf(e),`./`);try{localStorage.setItem(`surfski.skin`,e)}catch{}}),Da.add(W,`pfd`,Object.keys(Cn)).name(`6b · PFD colour`).onChange(e=>{cr(H,Cn[e]);try{localStorage.setItem(`surfski.pfd`,e)}catch{}}),Da.add(W,`wiggle`,0,2,.1).name(`6d · Stroke variation`),Da.add(W,`field`,$p).name(`7 · Paddle group size`).onChange(oa),Da.add(W,`session`,Object.keys(zp)).name(`7b · Session type`).onChange(sa),cr(H,Cn[W.pfd]),Oa.add(W,`routing`,Object.keys(Vi)).name(`Routing mode`).onChange(ca),Oa.add(W,`drafting`).name(`Drafting (wakes save power)`).onChange(e=>{Wi&&(Wi.drafting=e)}),Oa.add(W,`guide`).name(`Route guide`).onChange(la),Oa.add(W,`guideAlts`).name(`Route alternatives`),Oa.add(W,`guideStyle`,[`Whole route`,`Next wave`]).name(`Guide style`).onChange(()=>Bv(W.guideStyle===`Next wave`?`Next wave: full colour and the arrow head run to the next chance to surf (planned power low); the line goes on half transparent`:`Whole route: the arrow shows the whole plan in colour`)),Oa.add(W,`guideWeight`,[`Normal`,`Light`,`Faint`]).name(`Guide weight`).onChange(()=>Bv(`Guide weight ${W.guideWeight.toLowerCase()}: ${{Normal:`as drawn`,Light:`about 40% more transparent`,Faint:`about 65% more transparent`}[W.guideWeight]}`));let Ba=()=>{ia(),W.coaching||(Ji.style.display=`none`),Bv(W.coaching?`Coaching on: words at the top for what to do next, about a second before you should do it. It works with or without the guide arrow`:`Coaching off`)};Oa.add(W,`coaching`).name(`Coaching (words at the top)`).onChange(Ba),Oa.add(W,`autopilot`).name(`Autopilot`).onChange(aa),Ea.onChange(()=>{try{localStorage.setItem(Ot,JSON.stringify(Object.fromEntries(kt.map(e=>[e,W[e]]))))}catch{}}),wa.add(W,`view`,Object.fromEntries(Object.keys(Dy).map((e,t)=>[`${t+1}  ${e}`,e]))).name(`Camera (keys 1-`+Object.keys(Dy).length+`, V next)`).onChange(Ca).listen(),wa.add(W,`mapZoom`,0,1,.01).name(`Map zoom`).listen(),wa.add(W,`playSpeed`,.1,2,.05).name(`Playback speed`),wa.add(W,`playback`).name(`Show playback controls`).onChange(e=>{try{localStorage.setItem(`surfski.playback`,e?`1`:`0`)}catch{}ds()});let Va=wa.addFolder(`Rendering`);Va.add(Nt,`on`).name(`Battery mode (30 fps lock)`).onChange(e=>Pt(e)).listen(),Va.add(W,`shore`).name(`Shore: buildings, docks, boats (OSM)`).onChange(()=>{ni(ji(G),n[ji(G)]),Ha()}),Va.add(W,`quality`,Object.keys(Ey)).name(`Mesh quality`).onChange(e=>{P.setGrid(Ty(e,W.crit)),Ha()}).listen(),Va.add(W,`fov`,40,120,1).name(`Field of view`).onChange(e=>{T.fov=e,T.updateProjectionMatrix()}).listen(),Va.add(W,`eyeHeight`,.2,1.3,.05).name(`Head POV eye height (m)`),Va.add(W,`camSteady`,0,1,.05).name(`Camera steadiness (0 fixed to the boat, 1 holds the horizon)`).listen();let Ha=()=>{Tc.enabled&&(Tc.enabled=!1,Ja.object.auto=!1,Ja.updateDisplay(),Bv(`Auto quality is off: your setting stays`))};Va.add(W,`renderScale`,.5,3,.05).name(`Picture size (render scale)`).onChange(()=>{ms(),Ha()}).listen(),Va.add(W,`faceTint`).name(`Colour faces by steepness`).onChange(e=>{P.uniforms.uFaceTint.value=+!!e});let Ua=Va.addFolder(`Foam and spray`);Ua.close(),Ua.add(W,`lite`).name(`Cheaper effects (faster; no foam trails)`).onChange(e=>{Vo(e),Ha()}).listen(),Ua.add(W,`trailR`,50,600,10).name(`Foam trail reach (m)`).onChange(e=>{Bo(e),Ha()}).listen(),Va.add({restore(){W.renderScale=Jc.renderScale,ms(),W.quality=Jc.quality,W.crit=1,P.setGrid(Ty(W.quality,W.crit)),Vo(Jc.lite),Bo(Jc.trailR),Tc.enabled=!1,Ja.object.auto=!1,ka().forEach(e=>e.updateDisplay()),Bv(`Full quality restored. Auto quality is off; turn it on again below if you want it.`)}},`restore`).name(`Restore full quality`);let Wa={get(){try{return localStorage.getItem(`surfski.autoQuality`)}catch{return null}},set(e){try{localStorage.setItem(`surfski.autoQuality`,e?`1`:`0`)}catch{}}},Ga={get(){try{return localStorage.getItem(`surfski.autoScale`)}catch{return null}},set(e){try{localStorage.setItem(`surfski.autoScale`,String(e))}catch{}}},Ka=()=>Math.max(1,Math.min(devicePixelRatio||1,2)),qa=e.get(`auto`)==null?Wa.get()!==`0`:e.get(`auto`)!==`0`,Ja=Va.add({auto:qa},`auto`).name(`Auto quality (follows the frame rate)`).onChange(e=>{Tc.enabled=e,Wa.set(e),Bv(e?`Auto quality on: the sim may lower the picture size or water detail`:`Auto quality off: quality stays as chosen`)}),Ya=Ea.addFolder(`Sky & water`);Ya.add(W,`timeOfDay`,Object.keys(fa)).name(`Time of day (summer)`).onChange(ga).listen(),Ya.add(W,`weather`,Object.keys(pa)).name(`Cloud cover`).onChange(ga).listen(),Ya.add(W,`sunAz`,0,360,1).name(`Sun direction (compass °)`).onChange(ba).listen(),Ya.add(W,`sunEl`,-4,70,.5).name(`Sun elevation (°; below 0 after sunset)`).onChange(ba).listen(),Ya.add(W,`hazeAmt`,0,1,.01).name(`Haze amount (0 crystal clear, 1 thick)`).onChange(ce).listen(),Ya.add(W,`hazeType`,0,1,.01).name(`Haze type (0 sea salt, 1 smoke)`).onChange(ce).listen(),Ya.add(W,`teal`,0,1,.05).name(`Water colour (0 yellowish, 0.5 teal, 1 deep blue)`).onChange(ba).listen(),Ya.add(W,`turbid`,0,1,.05).name(`Silt (0 clear, 1 muddy river)`).onChange(ba).listen(),Ya.add(W,`cloud`,0,1,.01).name(`Clouds (cover)`).onChange(()=>{W.weatherPreset=`Custom`,te(W.cloud)}).listen();let Xa=Ya.add(W,`cloudType`,0,1,.01).name(`Cloud type: Fair-weather cumulus`).onChange(()=>{W.weatherPreset=`Custom`,te(W.cloud),Xa.name(`Cloud type: ${nv(W.cloudType)}`)}).listen();Ya.add(W,`cloudVar`,0,1,.01).name(`Cloud variety (0 even, 1 banks and gaps)`).onChange(()=>{W.weatherPreset=`Custom`,te(W.cloud)}).listen(),Ya.add(W,`cloudDark`,0,1,.05).name(`Clouds (grey: 0 white, 1 storm)`).onChange(()=>te(W.cloud)).listen();let Za=wa.addFolder(`Drone`);Za.add(W,`droneSide`,-12,12,.1).name(`Side (+ right, m)`),Za.add(W,`droneBack`,-10,25,.1).name(`Behind (m)`),Za.add(W,`droneHeight`,.3,20,.1).name(`Height above water (m)`);for(let e of[Va,Ya,Za])e.close();let Qa=Xh(wa,{roller:()=>je,makeRoller:V,toast:Bv,light:{live:ee,apply:()=>{te(W.cloud??0);for(let e of[H,qe,...Ze])e?.traverse(e=>{e.isMesh&&e.material?.isMeshStandardMaterial&&e.material.envMap&&(e.material.envMapIntensity=ee.env)})},defaults:{sun:Zn.sun,hemi:Zn.sky,env:Zn.env}},water:P}),$a=new Ug(Hg(e)),eo=new lg;Wg(wa,$a);let to=(e,t)=>ka().find(t=>t.object===W&&t.property===e)?.setValue(t),no=e=>document.getElementById(e),ro=new z_({courses:()=>ja.flatMap(e=>e.items.map(t=>({id:Yt(t.name)?.id,name:t.name,label:t.label,short:t.name.replace(/^[^:]*:\s*/,``),place:e.place}))),placeLabel:un,current:()=>({course:W.scenario,sea:W.sea??Ii,paddler:W.paddler,field:Number(W.field),weather:W.weatherPreset,guide:W.guide,coaching:W.coaching,autopilot:W.autopilot}),pickCourse:e=>{let t=Na(e);W.place!==t&&(W.place=t,Pa.options(Ma(t))),W.scenario=e,ka().forEach(e=>e.updateDisplay()),Ri=null,Ii=null,zi(e)},seas:()=>Xt(G.name).map(e=>({id:e.id,name:e.name})),pickSea:e=>Ia.setValue(e),paddlers:()=>Object.keys(zn),pickPaddler:e=>to(`paddler`,e),pickField:e=>to(`field`,e),weathers:()=>Object.keys(ma),pickWeather:e=>to(`weatherPreset`,e),setGuide:e=>to(`guide`,e),setCoaching:e=>to(`coaching`,e),setAutopilot:e=>to(`autopilot`,e),togglePlay:()=>no(`play`).click(),isLive:()=>J,isStart:()=>q===`Free play`&&K.t<.05,restart:()=>no(`tbRestart`).click(),fullscreen:()=>no(`tbFull`).click(),toggleSound:()=>no(`tbMute`).click(),soundOn:()=>!/\u{1F507}/u.test(no(`tbMute`).textContent),volume:()=>Number(no(`tbVolume`).value),setVolume:e=>{let t=no(`tbVolume`);t.value=String(e),t.dispatchEvent(new Event(`input`,{bubbles:!0}))},openFull:()=>{no(`sidePanel`)?.classList.contains(`hidden`)&&no(`tbGui`)?.click(),document.body.classList.add(`showgui`)},fp:()=>q===`Free play`?K:null,prof:()=>_r().prof,fpsNow:()=>Us,toast:Bv,quiet:(e,t)=>{W[e]!==t&&(W[e]=t,ka().forEach(e=>e.updateDisplay()),K&&ia())}},F_(e,h.tier));B_(wa,ro);let io=()=>!ro.on||W.autopilot||W.guide||W.coaching;e.get(`boat`),wa.add({capture:gs},`capture`).name(`Save PNG of this frame`);let ao=wa.addFolder(`About`),oo=document.createElement(`div`);oo.style.cssText=`padding:6px 8px;font-size:11px;line-height:1.45;opacity:.85;white-space:normal`,oo.textContent=`Surfski downwind simulator, designed and built by Mike Liddell. Rendering by three.js and lil-gui. Land and sea-floor data from public surveys (USGS, NOAA, Copernicus, OpenStreetMap and others); the full credits are in About.`,ao.$children.appendChild(oo),ao.add({docs(){window.open(`./about.html`,`_blank`,`noopener`)}},`docs`).name(`Documentation and credits`),ao.add({share(){as()}},`share`).name(`Share: copy a link to this view`),ao.close();let so=document.getElementById(`scrub`),co=document.getElementById(`time`),lo=document.getElementById(`play`);function uo(){lo.textContent=J?`⏸ Pause`:q===`Free play`?`▶ Resume`:`▶ Play`;let e=document.getElementById(`sceneStart`);e&&(e.textContent=J?`⏸ Pause`:Y>.5?`▶ Resume paddling`:`▶ Start paddling`),Zv(!J,q===`Free play`?Y>.5?`Space: resume`:`Space: start`:`Space: play`)}function fo(){let e=document.getElementById(`track`);e.querySelectorAll(`.mark`).forEach(e=>e.remove());let t=Math.max(gr()-hr(),1e-6),n=(n,r,i)=>{if(n==null)return;let a=document.createElement(`div`);a.className=`mark`,a.style.left=`calc(${(n-hr())/t*100}% - 1px)`,a.style.background=r,a.innerHTML=`<span style="color:${r}">${i}</span>`,e.appendChild(a)};n(Kt,`#7dffa1`,`in`),n(qt,`#ffb36b`,`out`)}let po=null;function mo(){let e=document.createElement(`div`);e.id=`racerWait`,e.style.cssText=`position:fixed;left:50%;top:50%;transform:translate(-50%,-50%);z-index:40;display:flex;align-items:center;gap:12px;padding:12px 18px;border-radius:10px;background:rgba(10,42,82,.85);color:#fff;font:600 15px system-ui,sans-serif;pointer-events:none`,e.innerHTML=`<div style="width:22px;height:22px;border:3px solid rgba(255,255,255,.25);border-top-color:#fff;border-radius:50%;animation:spin 1s linear infinite"></div>Loading the other paddlers…`,document.body.appendChild(e);let t=document.getElementById(`banner`).textContent;ls(``);let n=po={cancel:(n=!0)=>{e.remove(),po=null,n&&ls(t),uo()}};Promise.race([dt??Promise.resolve(),new Promise(e=>setTimeout(e,2e4))]).then(()=>{po===n&&(n.cancel(!1),ho())})}function ho(e=!1){po?e&&po.cancel():W.racers&&q===`Free play`&&!ft&&Y<.5?(pt(),mo()):(q===`Free play`?(K.truncateTo(Math.round((Y-hr())/K.dt)),Or(),Y=K.t,Xr(K.t),K.setSteer(+!!jn.right-!!jn.left),K.setUp(jn.up),K.setDown(jn.down)):Y>=gr()-.01&&(Y=hr()),J=!0,ls(``),uo())}let go=()=>{J?(J=!1,uo()):ho(!0)},_o=e=>{J=!1,Y=Math.min(gr(),Math.max(hr(),Y+e)),uo()};lo.onclick=go,document.getElementById(`restart`).onclick=()=>{q===`Recording`?(Y=hr(),J=!1,uo()):da()},document.getElementById(`back`).onclick=()=>_o(-.5),document.getElementById(`fwd`).onclick=()=>_o(.5),so.oninput=()=>{Y=Number(so.value),J=!1,uo()};function vo(e,t,n=0){if(q!==`Free play`){Bv(`Switch to Free play to move the boat`);return}if(Y<K.t-.25){Bv(`Go back to the live edge to move the boat`);return}if(!(e===`move`?K.strafe(t,n):K.turn(t))){Bv(`Too shallow there: the boat was not moved`);return}xs=!0,Y=K.t;let r=At(St(G.geo,K.ski.e,K.ski.n),4);Bv(e===`move`?`Moved ${Math.abs(t||n)} m ${t>0?`ahead`:t<0?`back`:n>0?`right`:`left`} · ${r}`:`Turned ${Math.abs(t)}° ${t>0?`right`:`left`} · heading ${jt(K.ski.psi*180/Math.PI)}`,1600)}let yo=()=>{Kt=Y,qt!=null&&qt<Kt&&(qt=null),fo()},bo=()=>{qt=Y,Kt!=null&&Kt>qt&&(Kt=null),fo()};document.getElementById(`markin`).onclick=yo,document.getElementById(`markout`).onclick=bo;function xo(e,t){let n=document.createElement(`a`);n.href=URL.createObjectURL(new Blob([JSON.stringify(t)],{type:`application/json`})),n.download=e,n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),4e3)}let So=[`timeOfDay`,`weather`,`weatherPreset`,`sunAz`,`sunEl`,`cloud`,`cloudType`,`cloudVar`,`cloudDark`,`hazeAmt`,`hazeType`,`sunGain`,`ambGain`,`teal`,`turbid`,`bottom`,`glint`,`crestSharpen`,`ripples`,`horizon`],Co=[`view`,`fov`,`eyeHeight`,`camSteady`,`droneSide`,`droneBack`,`droneHeight`,`droneYaw`,`dronePitch`],wo=[`session`,`field`,`racers`,`drafting`,`routing`,`guide`,`guideStyle`,`guideWeight`,`guideAlts`,`coaching`,`autopilot`],To=e=>Object.fromEntries(e.filter(e=>W[e]!==void 0).map(e=>[e,Array.isArray(W[e])?[...W[e]]:W[e]])),Eo=()=>{let e=null;try{W.view===`Free cam`&&(e={e:+Z.e.toFixed(2),n:+Z.n.toFixed(2),h:+Z.h.toFixed(2),yaw:+Z.yaw.toFixed(4),pitch:+Z.pitch.toFixed(4)})}catch{}return{look:To(So),camera:{...To(Co),...e?{free:e}:{}}}};function Do(e){if(!e)return;let t=e.look??{},n=e.camera??{};for(let e of[`timeOfDay`,`weather`,`weatherPreset`])t[e]!=null&&(W[e]=t[e]);for(let e of So)t[e]!=null&&![`timeOfDay`,`weather`,`weatherPreset`].includes(e)&&(It[e]=Array.isArray(t[e])?[...t[e]]:t[e]);n.view&&Dy[n.view]&&(W.view=n.view,Ca());for(let e of Co)e!==`view`&&n[e]!=null&&(W[e]=n[e]);if(n.free)try{Object.assign(Z,n.free,{_0x8318f9:!1})}catch{}T.fov=W.fov,T.updateProjectionMatrix()}function Oo(){P.uniforms.uMicro.value=W.ripples,P.uniforms.uFoam.value=W.foam,P.refreshRipples?.(),ba(),ka().forEach(e=>e.updateDisplay())}function ko(){let e=K?.states?.at(-1);return{kind:`surfski-scenario`,version:1,saved:new Date().toISOString(),build:`28cecec 2026-11-22 09:26Z`,label:`${G.name}, ${W.paddler}`,scenario:G.name,paddler:W.paddler,...bu(W.tune)?{tune:bu(W.tune)}:{},...Ri?{sea:Qt(Ri)}:{seaId:Ii},windSeed:G.windSeed,...Eo(),group:To(wo),audio:{...Tt.s},...(e=>Object.keys(e).length?{experimental:e}:{})(Qa.snapshot()),at:e?{t:+(K.t??0).toFixed(2),e:+e.e.toFixed(1),n:+e.n.toFixed(1),headingDeg:+((e.psi*180/Math.PI%360+360)%360).toFixed(1),mph:+(e.u*2.23694).toFixed(1)}:null}}window.__scenarioFile=ko,window.__loadScenario=e=>jo(e),window.__saveScenario=()=>{let e=ko();xo(`scenario-${G.name.replace(/[^a-z0-9]+/gi,`-`).toLowerCase()}-${e.saved.slice(0,16).replace(/[:T]/g,`-`)}.json`,e),Bv(`Saved this scenario (Load clip opens it again)`,2200)};let Ao=null;function jo(e,{fromConfig:t=!1}={}){let n=Yt(e.scenario);if(!n)throw Error(`an unknown course`);if(e={...e,scenario:n.name},W.scenario=e.scenario,W.paddler=zn[e.paddler]?e.paddler:lr,Object.assign(W.tune,e.tune?xu(e.tune):hu()),Ri=null,Ii=e.seaId??null,e.sea)try{let t=Zt(e.sea);t.ok&&(Ri=t.model)}catch{}if(e.seaModel){let t=en(e.seaModel);t.ok?Ri=t.model:console.warn(`the file's sea not used:`,t.errors)}t&&(Ao=Ri);let r=e.group??{};for(let[e,t]of Object.entries(r))e in W&&![`field`,`session`,`racers`].includes(e)&&(W[e]=t);r.session!=null&&r.session!==W.session&&(W.session=r.session,sa(r.session)),r.field!=null&&r.field!==W.field&&(W.field=r.field,oa(r.field)),e.audio&&(Object.assign(Tt.s,e.audio),Sr(Tt.s),Tt.applyVolume(),es()),Do(e),zi(e.scenario),Oo(),e.windSeed!=null&&(G.windSeed=e.windSeed,K=new Yu(G,Ti(),Si(),W.paddler,`v2`),j(K.localWind),Or()),e.experimental&&Qa.apply(e.experimental),ls(`Scenario: ${e.label??e.scenario}. Press Space to start.`)}function Mo(){if(q!==`Free play`){ls(`Clips are cut from Free play tracks.`);return}let e=Kt??hr(),t=qt??gr(),n=e=>Math.round((e-hr())/K.dt),r=K.makeClip(n(e),n(t),{...Eo(),...Ri?{sea:Qt(Ri)}:{seaId:Ii},saved:new Date().toISOString(),label:`${G.name} ${e.toFixed(0)}-${t.toFixed(0)} s`});xo(`clip-${G.name.replace(/[^a-z0-9]+/gi,`-`).toLowerCase()}-${e.toFixed(0)}s.json`,r),ls(`Saved a ${(t-e).toFixed(0)} s clip.`),setTimeout(()=>ls(``),2500)}document.getElementById(`saveclip`).onclick=Mo;let No=document.getElementById(`clipfile`);document.getElementById(`loadclip`).onclick=()=>No.click(),No.onchange=async()=>{let e=No.files[0];if(No.value=``,e)try{let t=JSON.parse(await e.text());t.kind===`surfski-scenario`?jo(t):Po(t)}catch(e){ls(`Could not load that file: ${e.message}`)}};function Po(e){if(e.kind!==`surfski-clip`||!ln[e.scenario])throw Error(`not a surfski clip, or an unknown scenario`);if(W.scenario=e.scenario,W.paddler=zn[e.paddler]?e.paddler:lr,Object.assign(W.tune,mu(e.tune)),Ri=null,Ii=e.seaId??null,e.sea)try{let t=Zt(e.sea);t.ok&&(Ri=t.model)}catch{}(e.camera||Object.keys(e.look??{}).length>1)&&Do(e),zi(e.scenario),e.look?.crestSharpen!=null&&(W.crestSharpen=e.look.crestSharpen,G.state.stokes=W.crestSharpen),Oo(),Bi(),Rt=Xu(e,G,Ti(),Si()),q=W.mode=`Recording`,Or(),Y=hr(),J=!1,xs=!0,uo(),fo(),ls(`Recording: ${e.label??e.scenario}. Press Space to play.${Rt.recorded?``:` This older clip has no recorded frames: it is re-run from its inputs, so it can differ from when it was saved if the boat or sea model has changed since.`}`),ka().forEach(e=>e.updateDisplay())}function Fo(e){e===`Recording`&&!Rt?(ls(`No recording loaded. Use Load clip, or cut one from Free play.`),W.mode=`Free play`,ka().forEach(e=>e.updateDisplay())):(q=e,Or(),Y=e===`Recording`?hr():K.t,J=!1,xs=!0,uo(),fo(),ds())}let Io={ArrowLeft:`left`,KeyA:`left`,ArrowRight:`right`,KeyD:`right`},Lo=()=>+!!jn.right-!!jn.left;function Ro(e,t){jn[e]=t,t&&!J&&q===`Free play`&&ho(),q===`Free play`&&J&&(e===`left`||e===`right`?K.setSteer(Lo()):e===`up`?K.setUp(t):K.setDown(t))}let zo=Uv({onStart:()=>{J||ho()}});Wv(Ro,e.get(`touch`)===`1`),addEventListener(`keydown`,e=>{if(e.target.tagName===`INPUT`&&e.target.type!==`range`)return;if(zo.open){e.code===`Space`||e.code===`Enter`?(e.preventDefault(),Rv(`introGo`).click()):(e.code===`Escape`||e.key===`?`)&&zo.hide();return}let t=/^Key[IKJLUO]$/.test(e.code);if(e.altKey&&!e.ctrlKey&&!e.metaKey&&t){if(e.preventDefault(),!e.repeat){let t=e.shiftKey?1e3:100,n=e.shiftKey?90:30;e.code===`KeyI`?vo(`move`,t,0):e.code===`KeyK`?vo(`move`,-t,0):e.code===`KeyJ`?vo(`move`,0,-t):e.code===`KeyL`?vo(`move`,0,t):e.code===`KeyU`?vo(`turn`,-n):e.code===`KeyO`&&vo(`turn`,n)}}else{if(e.metaKey||e.ctrlKey)for(let e of[...ws])e.startsWith(`Key`)&&ws.delete(e);if(!(e.ctrlKey||e.metaKey||e.altKey)){if(e.code.startsWith(`Shift`)&&ws.add(`Shift`),e.code===`Digit0`)ws.clear(),Object.assign(xa,{f:0,r:0,u:0,yaw:0,pitch:0}),Bv(`${W.view}: back to its usual place`);else if(t)ws.add(e.code);else if(!Ds(e.code)){if(e.key===`?`)Jo(`controls`);else if(e.code===`Escape`&&Wo.dataset.tab!==`scene`)qo(`scene`);else if(e.code===`KeyR`)q===`Free play`&&(da(),Bv(`Run restarted`));else if(e.code===`KeyG`)W.guide=!W.guide,ka().forEach(e=>e.updateDisplay()),la();else if(e.code===`KeyT`)W.coaching=!W.coaching,ka().forEach(e=>e.updateDisplay()),Ba();else if(e.code===`KeyF`)Vv();else if(e.code===`Equal`||e.code===`NumpadAdd`||e.code===`Minus`||e.code===`NumpadSubtract`)e.preventDefault(),ts(e.code===`Equal`||e.code===`NumpadAdd`?1:-1);else if(e.code===`Space`)e.preventDefault(),go();else if(Ki&&(Io[e.code]||[`ArrowUp`,`KeyW`,`ArrowDown`,`KeyS`].includes(e.code))&&ua(),Io[e.code]&&(e.preventDefault(),jn[Io[e.code]]=!0,q===`Free play`&&J?K.setSteer(Lo()):e.repeat||_o(Io[e.code]===`left`?-.5:.5)),(e.code===`ArrowUp`||e.code===`KeyW`)&&(e.preventDefault(),jn.up=!0,q===`Free play`&&J&&K.setUp(!0)),(e.code===`ArrowDown`||e.code===`KeyS`)&&(e.preventDefault(),jn.down=!0,q===`Free play`&&J&&K.setDown(!0)),/^Digit[1-9]$/.test(e.code)&&!e.shiftKey){let t=Object.keys(Dy)[e.code.slice(5)-1];t&&(W.view=t,Ca(),Bv(`Camera ${e.code.slice(5)}: ${t}`))}else{if(e.code===`KeyV`){let e=Object.keys(Dy);W.view=e[(e.indexOf(W.view)+1)%e.length],Ca()}e.code===`BracketLeft`&&yo(),e.code===`BracketRight`&&bo(),e.code===`KeyC`&&Mo(),e.code===`KeyE`&&Yo(),e.code===`KeyP`&&Rv(`tbGui`).click()}}}}}),addEventListener(`blur`,()=>ws.clear()),document.addEventListener(`visibilitychange`,()=>{document.hidden&&ws.clear()}),addEventListener(`keyup`,e=>{ws.delete(e.code),e.code.startsWith(`Shift`)&&ws.delete(`Shift`),Io[e.code]&&(jn[Io[e.code]]=!1,q===`Free play`&&J&&K.setSteer(Lo())),(e.code===`ArrowUp`||e.code===`KeyW`)&&(jn.up=!1,q===`Free play`&&J&&K.setUp(!1)),(e.code===`ArrowDown`||e.code===`KeyS`)&&(jn.down=!1,q===`Free play`&&J&&K.setDown(!1))});{let e=new Set,t=!1,n=(e,t)=>dispatchEvent(new KeyboardEvent(e,{code:t,key:t===`Slash`?`?`:t===`Space`?` `:t,bubbles:!0,cancelable:!0})),r=e=>{let t=t=>!!e.buttons[t]?.pressed,n=t=>(e.buttons[t]?.value??0)>.5,r=t=>e.axes[t]??0;return{ArrowLeft:t(14)||r(0)<-.4,ArrowRight:t(15)||r(0)>.4,ArrowUp:t(12)||n(7)||r(1)<-.7,ArrowDown:t(13)||n(6)||r(1)>.7,Space:t(0),Escape:t(1),KeyV:t(3),KeyP:t(9),Slash:t(8)}},i=()=>{let t=[...navigator.getGamepads?.()??[]].find(e=>e&&e.connected),a=new Set;if(t)for(let[e,n]of Object.entries(r(t)))n&&a.add(e);for(let t of a)e.has(t)||n(`keydown`,t);for(let t of e)a.has(t)||n(`keyup`,t);e=a,requestAnimationFrame(i)},a=()=>{t||(t=!0,i())};addEventListener(`gamepadconnected`,()=>{a(),Bv(`Controller connected: A start/pause · stick steer · RT power up · LT ease off · Y camera`,5e3)}),[...navigator.getGamepads?.()??[]].some(e=>e&&e.connected)&&a()}function Bo(e){W.trailR=e,P.uniforms.uTrailR.value=e}function Vo(e){W.lite=!!e,P.uniforms.uLite.value=+!!W.lite}let Ho=null;function Uo(e){if(q!==`Free play`){Bv(`Switch to Free play to change the sea (a recording keeps the sea it was made in)`);return}Ri=e;let t=G.state,r={start:G.start,headingDeg:G.headingDeg};on(G,e,{turns:G.shoreTurns??null}),Object.assign(t,G.state),G.state=t,G.start=r.start,K.field._envT=void 0,K.ski.current=G.current??[0,0],ji(G)&&n[ji(G)]&&ii(G),Zr(G),dc(),te(W.cloud),W.crestSharpen=G.look?.crestSharpen??W.crestSharpen,G.state.stokes=W.crestSharpen,Bi(),Ra(),J||(Bt={field:K.field,frames:K.frames,dt:K.dt})}let Wo=document.getElementById(`sidePanel`),Go={scene:Rv(`paneScene`),settings:Rv(`paneSettings`),sea:Rv(`paneSea`),audio:Rv(`paneAudio`),controls:Rv(`paneControls`)};function qo(e){if(e===`sea`&&!Ho&&(Ho=document.createElement(`iframe`),Ho.title=`Sea state editor`,Ho.src=`./lab.html?embed=1`,Go.sea.append(Ho),addEventListener(`message`,e=>{if(e.origin===location.origin&&e.source===Ho.contentWindow){if(e.data?.kind===`surfski-sea-ready`)rs();else if(e.data?.kind===`surfski-sea-look`)W.ripples=Math.min(1,Math.max(0,+e.data.ripples||0)),P.uniforms.uMicro.value=W.ripples,P.refreshRipples(),W.teal=Math.min(1,Math.max(0,+e.data.teal||0)),ba();else if(e.data?.kind===`surfski-sea`){let t=ns(e.data.model);t&&Uo(t)}}})),e===`controls`&&!Go.controls.firstChild){let e=document.querySelector(`#intro table.keys`);Go.controls.append(Object.assign(document.createElement(`div`),{className:`note`,textContent:`Keys and what they do. Press ? again, or Esc, to go back to the Scene tab.`}),e?e.cloneNode(!0):document.createTextNode(``))}e===`controls`&&ro.fillControlsTab(Go.controls),Wo.classList.remove(`hidden`),document.body.classList.remove(`nopanel`),Wo.dataset.tab=e,Wo.classList.toggle(`wide`,e===`sea`),Wo.classList.toggle(`mid`,e===`controls`||e===`scene`||e===`settings`||e===`audio`);for(let[t,n]of Object.entries(Go))n.classList.toggle(`on`,t===e);for(let t of Wo.querySelectorAll(`.tabs button[data-tab]`))t.classList.toggle(`on`,t.dataset.tab===e);e===`sea`&&rs()}let Jo=e=>qo(Wo.dataset.tab===e&&!Wo.classList.contains(`hidden`)?`scene`:e),Yo=e=>e===!1?qo(`scene`):Jo(`sea`);for(let e of Wo.querySelectorAll(`.tabs button[data-tab]`))e.onclick=()=>qo(e.dataset.tab);let Xo=new cs({title:`Audio`,container:Rv(`paneAudio`)});Xo.add(Tt.s,`on`).name(`Sound`).onChange(e=>{Tt.setOn(e),es()}),Xo.add(Tt.s,`volume`,0,1,.05).name(`Volume (keys - and +)`).onChange(e=>{Tt.setVolume(e),es()});let Zo=Xo.addFolder(`Mix`);for(let[e,t]of[[`wind`,`Wind`],[`sea`,`Open water`],[`spill`,`Spilling crests`],[`hull`,`Hull along the water`],[`strokes`,`Paddle strokes`],[`bow`,`Bow into waves`],[`ambience`,`Gulls, shore, thunder`]])Zo.add(Tt.s,e,0,2,.05).name(t).onChange(t=>Tt.setLayer(e,t));Rv(`paneAudio`).insertAdjacentHTML(`beforeend`,`<div class="note">Every sound is made from noise for now, shaped by the sim: the wind you feel (the true wind less your own speed), the waves round you, your speed along the hull, each blade in and out of the water, the bow driving into a wave. Recorded sounds come next. The browser starts sound on your first key or tap.</div>`);let Qo=Rv(`tbVolume`),$o=Rv(`tbMute`);function es(){Qo.value=String(Math.round(Tt.s.volume*100)),$o.textContent=Tt.s.on&&Tt.s.volume>0?Tt.s.volume<.35?`🔉`:`🔊`:`🔇`,Xo.controllersRecursive().forEach(e=>e.updateDisplay())}function ts(e){!Tt.s.on&&e>0&&Tt.setOn(!0);let t=Tt.setVolume(Math.round((Tt.s.volume+.1*e)*20)/20);es(),Bv(Tt.s.on?`Volume ${Math.round(t*100)}%`:`Sound off`,900)}Qo.oninput=()=>{Tt.s.on||Tt.setOn(!0),Tt.setVolume(Number(Qo.value)/100),es()},$o.onclick=()=>{Tt.setOn(!Tt.s.on),es(),Bv(Tt.s.on?`Sound on`:`Sound off`,900)},es(),qo(`scene`),Ta.insertAdjacentHTML(`beforeend`,`<div class="scene-foot"><button id="sceneStart" class="go">▶ Start paddling</button><button id="sceneControls" class="alt">Controls and keys</button><button class="alt" id="sceneMore">More settings: camera, quality, boat tuning</button><div class="tip">Keys: <b>Space</b> start or pause, <b>E</b> edit the sea, <b>R</b> restart, <b>P</b> show or hide this panel (or use the ✕ above).</div></div>`),Rv(`sceneStart`).onclick=()=>{go(),os()&&ss(!1)},Rv(`sceneControls`).onclick=()=>qo(`controls`),Rv(`sceneMore`).onclick=()=>qo(`settings`);let ns=e=>{try{return Zt(Qt(e)).model}catch{return null}};function rs(){if(!Ho?.contentWindow)return;let e=tn(Ii);Ho.contentWindow.postMessage({kind:`surfski-sea-init`,look:{ripples:W.ripples,teal:W.teal},model:Ri??e.model(),source:Ri?`Your edited sea`:`Started from \u201c${e.name}\u201d`},location.origin)}function is(){let e=new URL(location.href);e.search=``,e.hash=``;let t=(t,n)=>e.searchParams.set(t,n);t(`scenario`,ln[W.scenario]?.id??W.scenario),t(`paddler`,W.paddler),t(`view`,W.view),W.inset!==`Map`&&t(`inset`,W.inset),ma[W.weatherPreset]?t(`wx`,W.weatherPreset):(W.timeOfDay!==`As designed`&&t(`tod`,W.timeOfDay),W.weather!==`As designed`&&t(`weather`,W.weather)),Ri&&Ri!==Ao?t(`sea`,Qt(Ri)):Ri||Ii!==Xt(W.scenario)[0]?.id&&t(`seapick`,Ii);{let e=bu(W.tune);e&&t(`tune`,e)}if(W.weatherPreset===`Custom`)for(let e of[`sunAz`,`sunEl`,`cloud`,`cloudType`,`cloudVar`,`hazeAmt`,`hazeType`])Number.isFinite(W[e])&&t(e,Math.round(W[e]*100)/100);W.view===`Drone`&&(t(`droneSide`,W.droneSide),t(`droneBack`,W.droneBack),t(`droneHeight`,W.droneHeight));let n=new URLSearchParams(location.search);for(let e of yy)n.has(e)&&t(e,n.get(e));return e.toString()}Rv(`tbHelp`).onclick=()=>Jo(`controls`),Rv(`tbRestart`).onclick=()=>{q===`Free play`?(da(),Bv(`Run restarted`)):(Y=hr(),J=!1,uo())},Rv(`tbFull`).onclick=Vv;let as=async()=>{let e=await Hv(is());Bv(e?`Link copied: this sea, paddler and camera`:is(),e?2200:8e3)};Rv(`tbGuide`).onclick=()=>{W.guide=!W.guide,ka().forEach(e=>e.updateDisplay()),la()},Rv(`tbCoach`).onclick=()=>{W.coaching=!W.coaching,ka().forEach(e=>e.updateDisplay()),Ba()},setInterval(()=>{Rv(`tbGuide`).classList.toggle(`on`,!!W.guide),Rv(`tbCoach`).classList.toggle(`on`,!!W.coaching)},250),Rv(`tbSea`).onclick=()=>Yo();let os=()=>matchMedia(`(max-width: 760px)`).matches,ss=e=>{document.body.classList.toggle(`showgui`,e),Rv(`hamb`).textContent=e?`✕`:`☰`,Rv(`hamb`).setAttribute(`aria-expanded`,String(e))};Rv(`tbGui`).onclick=()=>{os()?ss(!document.body.classList.contains(`showgui`)):(Wo.classList.toggle(`hidden`),document.body.classList.toggle(`nopanel`,Wo.classList.contains(`hidden`)))},Rv(`panelClose`).onclick=()=>{Wo.classList.add(`hidden`),document.body.classList.add(`nopanel`)},e.get(`panel`)!==`1`&&(Wo.classList.add(`hidden`),document.body.classList.add(`nopanel`)),Rv(`hamb`).onclick=()=>Rv(`tbGui`).click();for(let e of[`tbRestart`,`tbFull`])Rv(e).addEventListener(`click`,()=>{os()&&ss(!1)});function ls(e){let t=document.getElementById(`banner`);t.textContent=e,t.style.display=e?`block`:`none`}function ds(){document.body.classList.toggle(`noplay`,!(W.playback||q===`Recording`)),ms()}function ps(){Mr.classList.toggle(`off`,W.inset===`Off`),Mr.classList.toggle(`cond`,W.inset===`Conditions`||W.inset===`Run`);let e=document.getElementById(`insetSel`);e.value!==W.inset&&W.inset!==`Off`&&(e.value=W.inset),ms()}function ms(){let t=innerWidth,n=innerHeight,r=Number(e.get(`maxpx`))||(m?25e5:g.maxPx??8e6);y.setPixelRatio(Math.min(W.renderScale,Math.sqrt(r/(t*n)))),y.setSize(t,n,!1),T.aspect=t/n,T.updateProjectionMatrix(),hs()}function hs(){let e=d.getBoundingClientRect(),t=Math.min(devicePixelRatio||1,2);d.width=Math.max(2,Math.round(e.width*t)),d.height=Math.max(2,Math.round(e.height*t));let n=document.getElementById(`hudBody`);n&&(n.style.zoom=Mr.classList.contains(`cond`)&&Mr.style.width?String(Math.min(1.8,Math.max(.75,Mr.getBoundingClientRect().width/300)).toFixed(3)):``)}addEventListener(`resize`,ms);function gs(e=``){let t=W.renderScale,n=Math.min(Math.max(t,2)*1.5,4);y.setPixelRatio(n),y.setSize(innerWidth,innerHeight,!1),Ps(0),l.toBlob(n=>{let r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=`${W.scenario.replace(/[^a-z0-9]+/gi,`-`).toLowerCase()}-${W.view.replace(/\s+/g,`-`).toLowerCase()}-t${Y.toFixed(e?3:1)}s${e}.png`,r.click(),setTimeout(()=>URL.revokeObjectURL(r.href),4e3),y.setPixelRatio(t),y.setSize(innerWidth,innerHeight,!1)})}new R;let _s=new R,vs=new Ne(0,0,0,`YXZ`),ys=new $e,bs=new U,xs=!0,Cs=new $e,Z={e:0,n:0,h:3,yaw:0,pitch:-.1,_0x8318f9:!0},ws=new Set,Ts=3*Math.PI/180;function Es(e,t){let n=1e-6;if(t>0){let t=e<9.999999?1:e<29.999999?2:5;return Math.min(120,(Math.floor(e/t+n)+1)*t)}let r=e<=10.000001?1:e<=30.000001?2:5;return Math.max(1,(Math.ceil(e/r-n)-1)*r)}function Ds(e){if(W.view===`Drone`){let t=ws.has(`Shift`);if(e===`KeyY`||e===`KeyH`)W.droneHeight=Math.max(.3,Math.min(20,+(W.droneHeight+(e===`KeyY`?1:-1)*(t?2:.5)).toFixed(2)));else if(e===`KeyN`||e===`KeyM`)W.dronePitch=Math.max(-1.2,Math.min(1,W.dronePitch+(e===`KeyM`?1:-1)*Ts*(t?3:1)));else return!1;return Bv(`Drone ${W.droneHeight} m up · ${W.droneBack.toFixed(1)} m behind · ${W.droneSide.toFixed(1)} m right`),ka().forEach(e=>e.updateDisplay()),!0}if(W.view!==`Free cam`){let t=ws.has(`Shift`),n=!!Dy[W.view].local,r=Sa();if(e===`KeyY`||e===`KeyH`)xa.u=Math.max(-r,Math.min(r,+(xa.u+(e===`KeyY`?1:-1)*(n?.1:1)*(t?5:1)).toFixed(2)));else if(e===`KeyN`||e===`KeyM`)xa.pitch=Math.max(-1.2,Math.min(1,xa.pitch+(e===`KeyM`?1:-1)*Ts*(t?3:1)));else return!1;return Bv(`${W.view}: ${xa.u>=0?`+`:``}${xa.u.toFixed(1)} m up · tilt ${xa.pitch>=0?`+`:``}${(xa.pitch*180/Math.PI).toFixed(0)}° (change camera to reset)`),!0}if(e===`KeyY`||e===`KeyH`)Z.h=Es(Z.h,e===`KeyY`?1:-1);else if(e===`KeyN`||e===`KeyM`)Z.pitch=Math.max(-89*Math.PI/180,Math.min(60*Math.PI/180,Z.pitch+(e===`KeyM`?1:-1)*Ts*(ws.has(`Shift`)?3:1)));else return!1;return Bv(`Camera ${Z.h} m · tilt ${(Z.pitch*180/Math.PI).toFixed(0)}°`),!0}function Os(e){let t=ws.has(`Shift`),n=(12+2*Z.h)*(t?10:1),r=+!!ws.has(`KeyI`)-!!ws.has(`KeyK`),i=+!!ws.has(`KeyL`)-!!ws.has(`KeyJ`),a=+!!ws.has(`KeyO`)-!!ws.has(`KeyU`);Z.yaw+=a*.8*(t?3:1)*e;let o=Math.sin(Z.yaw),s=Math.cos(Z.yaw);Z.e+=(o*r+s*i)*n*e,Z.n+=(s*r-o*i)*n*e}function ks(){let e=Math.hypot(W.droneSide,W.droneBack);if(e<2.5){let t=W.droneSide<0?-1:1;e<.05?(W.droneSide=2.5*t,W.droneBack=0):(W.droneSide*=2.5/e,W.droneBack*=2.5/e),ka().forEach(e=>e.updateDisplay())}}function As(e){let t=3*(ws.has(`Shift`)?4:1),n=e=>+!!ws.has(e);W.droneBack=Math.max(-10,Math.min(25,W.droneBack-(n(`KeyI`)-n(`KeyK`))*t*e)),W.droneSide=Math.max(-12,Math.min(12,W.droneSide+(n(`KeyL`)-n(`KeyJ`))*t*e)),ks(),W.droneYaw=Math.max(-1.6,Math.min(1.6,W.droneYaw+(n(`KeyO`)-n(`KeyU`))*.6*(ws.has(`Shift`)?3:1)*e))}function Ms(e){let t=!!Dy[W.view].local,n=ws.has(`Shift`),r=(t?.6:6)*(n?4:1),i=e=>+!!ws.has(e),a=Sa();xa.f=Math.max(-a,Math.min(a,xa.f+(i(`KeyI`)-i(`KeyK`))*r*e)),xa.r=Math.max(-a,Math.min(a,xa.r+(i(`KeyL`)-i(`KeyJ`))*r*e)),xa.yaw=Math.max(-Math.PI,Math.min(Math.PI,xa.yaw+(i(`KeyU`)-i(`KeyO`))*.6*(n?3:1)*e))}let Ns=e=>{let t=Bt.frames,n=(Y-hr()-e)/Bt.dt;if(n<0||!t.length)return null;let r=Math.min(t.length-2,Math.floor(n)),i=t[r],a=t[r+1]??i;if(!i||a.jump)return null;let o=Math.min(1,n-r);return[i.e+(a.e-i.e)*o,i.n+(a.n-i.n)*o]};function Ps(t){let r=hl(Bt.frames,Bt.dt,Y-hr()),[i,a]=r.forward;H.position.set(r.e,r.z-Nn,-r.n),H.rotation.set(r.pitch,-r.psi,-r.roll,`YXZ`),H.updateMatrixWorld(!0);{let e=Ki&&W.coaching&&q===`Free play`?Ki.coachInput():null,t=Zi.step(e,K.t);if(t){Ji.style.display=`block`,Ji.style.opacity=t.standing?.6:1,Yi.textContent=t.text,Yi.style.color=`rgb(${t.color.map(e=>Math.round(30+225*e)).join(`,`)})`;let n=Qi?Zi.ips(K.t):null;Xi.textContent=(t.next?t.next:``)+(n?`   [${n.avg.toFixed(2)} ips, peak ${n.peak.toFixed(1)}, loss ${(gf(e)??0).toFixed(2)} mph]`:``)}else Ji.style.display=`none`}if(G.raceCourse&&qr&&q===`Free play`&&e.get(`gates`)!==`0`?ta.ribbons(G.raceCourse.lines(qr,2),Bt.field,Y,{e:T.position.x,n:-T.position.z}):ta.hide(),G.raceCourse&&qr&&q===`Free play`&&e.get(`chevron`)!==`0`?na.update(G.raceCourse,qr,T):na.hide(),Ki&&W.guide&&q===`Free play`&&($i.update(Ki.guide(),Bt.field,Y,K.prof._0x903c72,W.guideStyle===`Next wave`?`wave`:`route`,{weight:{Normal:1,Light:.6,Faint:.35}[W.guideWeight]??1,rise:.45*Bt.field.hsRef,alts:W.guideAlts?Ki.altGuides():null}),e.get(`buoys`)!==`0`&&ea.update(G.raceCourse?Ki.markers().filter(e=>e.kind!==`goal`):Ki.markers(),Bt.field,Y,T.position)),Gs++,Rc(`competitors: pose`,()=>{let t=W.racers&&q===`Free play`?Ks(K.t):[];t.length&&!dt&&pt(),y.getDrawingBufferSize(bs);let n=bs.y/2/Math.tan(T.fov*Math.PI/360);t.forEach((t,r)=>{let i=ht(r,t.color);i.visible=ft&&(!i.userData.bodyWant||!!i.userData.bodySettled),i.position.set(t.e,t.z-Nn,-t.n),i.rotation.set(t.pitch,-t.psi,-t.roll,`YXZ`),i.updateMatrixWorld(!0),i.userData.wiggle={seed:101+r,t:Y,amount:W.wiggle};let a=T.position.distanceTo(i.position),o=2*n/Math.max(a,.1),s=o>=60?1:o>=30?2:o>=12?4:8;((Gs+r)%s===0||!i.userData.posedOnce)&&(ar(i,t.phase,t.power>1,_r().prof.form,t.mix),i.userData.skinned?.pose(),i.userData.posedOnce=!0),e.get(`drawlod`)!==`0`&&lm(i,a,n,i.userData.skinned),Ke(i).setAmount(W.gelcoat),Ke(i).setDecalAmount(+!!W.decals)});for(let e=t.length;e<Ze.length;e++)Ze[e]&&(Ze[e].visible=!1)}),H.userData.wiggle={seed:1,t:Y,amount:W.wiggle},ar(H,r.phase,r.power>1,_r().prof.form,r.mix),(r.braceLevel??0)>0&&(r.mix?.[2]??0)>.6&&t>0){H.updateMatrixWorld(!0);let e=r.mix[3]>=0?1:-1,n=H.userData.paddle.localToWorld(ys.set(e*(H.userData.paddleDims?.bladeCenterX??.94),0,0)),o=Bt.field.sample(n.x,-n.z,Y-hr(),ge).h;n.y<o+.25&&me.blade(Math.min(t,.1),{x:n.x,y:o,z:n.z,fx:i,fz:-a,u:r.u,side:e,level:r.mix[4]??r.braceLevel,amount:W.sprayAmt})}if(Tt.setPaused(!J),Tt.simT=Y,Tt.ctx||Tt.rec){let e=K?.localWind?.sample(r.e,r.n,Y,Tt.lwOut??={}),n=e?e.ms:G.windMs??0,i=((e?e.fromDeg:G.windFromDeg??0)+180)*Math.PI/180,a=J&&q===`Free play`,o=a?r.u:0,s=wr(n,Math.sin(i),Math.cos(i),r.psi,o),c=t>0&&Tt.zPrev!=null?Math.abs(r.z-Tt.zPrev)/t:0;Tt.zPrev=r.z;let l=null;if(a&&H.userData.paddle){H.updateMatrixWorld(!0);let e=H.userData.paddleDims?.bladeCenterX??.94;l=[0,0];for(let t=0;t<2;t++){let n=H.userData.paddle.localToWorld(ys.set((t?1:-1)*e,0,0));l[t]=Bt.field.sample(n.x,-n.z,Y-hr(),ge).h-n.y+gy}}let u=a?r.plunge??0:0,d=u>.35&&(Tt.plPrev??0)<=.35?u:0;Tt.plPrev=u;let f=(r.mix?.[3]??0)>=0?1:-1,p=a&&l&&(r.braceLevel??0)>0&&(r.mix?.[2]??0)>.6?{level:r.mix[4]??r.braceLevel,side:f,wet:+(l[+(f>0)]>-.1)}:null,m=null;a&&W.racers&&q===`Free play`&&Wi?.setters?.length&&(m=[],Ks(K.t).forEach((e,t)=>{let n=e.e-r.e,i=e.n-r.n,a=Math.hypot(n,i);if(a>30)return;let o=Ze[t],s=o?.visible&&o.userData.paddle,c=null;if(s){let e=o.userData.paddleDims?.bladeCenterX??.94;c=[0,0];for(let t=0;t<2;t++){let n=s.localToWorld(ys.set((t?1:-1)*e,0,0));c[t]=+(Bt.field.sample(n.x,-n.z,Y-hr(),ge).h-n.y+gy).toFixed(3)}}m.push({id:t,d:+a.toFixed(2),pan:+(.8*Math.sin(Math.atan2(n,i)-r.psi)).toFixed(3),blades:c,power:e.power,slam:+(e.plunge??0).toFixed(3)})}));let h=a?xi(r,Y):null;Tt.update(t,{spill:h?.s??0,spillSize:h?.size??0,spillPan:h?.pan??0,app:s,gusty:!e&&!!G.state?.gusts?.on,gustNow:e?Math.max(0,Math.tanh(1.3*e.g)):null,hs:G.state?.stats?.hs??0,heave:c,u:o,surfing:a&&!!r.onRun,power:r.power,brace:p,others:m},l,{slam:d});let g=Si()?.(r.e,r.n)??1/0,_=Number.isFinite(g)?Math.min(1,Math.max(0,(25-g)/20)):0;Tt.ambience(t,{near:_,storm:Math.max(0,((W.cloudDark??0)-.6)/.4)},`./`)}let o=Dy[W.view];H.userData.rider.forEach(t=>{t.visible=!o.hideRider&&!e.get(`norider`)}),Jn(H,!!o.hideRider);{let e=H.userData.skinned;e&&(e.setHeadless(!!o.hideRider),e.pose())}if(qe.visible=!1,!o.free&&!o.drone){let e=performance.now();Ms(Math.min(.1,(e-(Z.nt??e))/1e3)),Z.nt=e}if(o.local){let e=W.view===`Head POV`?[0,W.eyeHeight,o.local[2]]:o.local;T.position.copy(H.localToWorld(ys.set(e[0]+xa.r,e[1]+xa.u,e[2]-xa.f)));let t=Math.max(0,Math.min(1,W.camSteady??o.steady??0));T.quaternion.setFromEuler(vs.set(r.pitch*(1-.6*t),-r.psi,-r.roll*(1-t),`YXZ`)).multiply(_s.setFromEuler(vs.set(o.pitch+xa.pitch,xa.yaw,0,`YXZ`)))}else if(o.free){if(Z._0x8318f9){Z._0x8318f9=!1;let t=e.get(`cam`);if(t&&!Z.fromUrl){Z.fromUrl=!0;let[e,r,i=3,a=0,o=-5]=t.split(`,`).map(Number),s=ji(G),c=s&&n[s],l=c?{lat:c.meta.lat0,lon:c.meta.lon0}:G.geo??{lat:0,lon:0},[u,d]=Mt(l,e,r);Z.e=u,Z.n=d,Z.h=i,Z.yaw=a*Math.PI/180,Z.pitch=o*Math.PI/180}else xs?(Z.e=r.e-i*8,Z.n=r.n-a*8,Z.h=3,Z.yaw=Math.atan2(i,a),Z.pitch=-.1):(T.getWorldDirection(ys),Z.e=T.position.x,Z.n=-T.position.z,Z.yaw=Math.atan2(ys.x,-ys.z),Z.pitch=Math.asin(Math.max(-1,Math.min(1,ys.y))),Z.h=Es(Math.max(1,T.position.y)-.5,1))}let t=performance.now();Os(Math.min(.1,(t-(Z.t??t))/1e3)),Z.t=t;let o=Ut?Ut.elevationAt(Z.e,Z.n):-1e9;T.position.set(Z.e,Math.max(Z.h,o+1.5),-Z.n),T.up.set(0,1,0),T.lookAt(Z.e+Math.sin(Z.yaw)*Math.cos(Z.pitch),T.position.y+Math.sin(Z.pitch),-(Z.n+Math.cos(Z.yaw)*Math.cos(Z.pitch))),Z.roll&&T.rotateZ(Z.roll)}else if(o.drone){ks();let e=a,t=-i,n=Bt.field,o=Y,s=r.e-i*W.droneBack+e*W.droneSide,c=r.n-a*W.droneBack+t*W.droneSide,l=(e,t)=>n.sample(e,t,o,{}).h;{let e=performance.now();W.view===`Drone`&&As(Math.min(.1,(e-(Z.dt??e))/1e3)),Z.dt=e}T.position.set(s,l(s,c)+W.droneHeight,-c),T.up.set(0,1,0),T.lookAt(r.e+i*3.2,r.z+.3,-r.n-a*3.2),(W.droneYaw||W.dronePitch)&&(T.rotateOnWorldAxis(ys.set(0,1,0),-W.droneYaw),T.rotateX(W.dronePitch))}else if(W.view===`Chase`){let e=r.e-i*(14-xa.f)+a*xa.r,n=r.n-a*(14-xa.f)-i*xa.r,o=ys.set(e,r.z+4.5+xa.u,-n).clone();xs&&Cs.copy(o),Cs.lerp(o,t?1-Math.exp(-t*4):1),T.position.copy(Cs),T.lookAt(r.e+i*10,r.z+.4,-r.n-a*10)}else{let e=r.e+i*xa.f+a*xa.r,t=r.n+a*xa.f-i*xa.r;T.position.set(e,r.z+Math.max(2,38+xa.u),-t+.01),T.up.set(i,0,-a),T.lookAt(e+i*12,r.z,-t-a*12),T.up.set(0,1,0)}!o.free&&!o.drone&&!o.local&&(xa.yaw||xa.pitch)&&(T.rotateOnWorldAxis(ys.set(0,1,0),xa.yaw),T.rotateX(xa.pitch)),xs=!1;let s=P.uniforms;if(s.uSkiPos.value.set(r.e,r.n),s.uSkiFwd.value.set(i,a),s.uSkiSpeed.value=r.u,ke){let e=performance.now(),t=Math.min(.1,(e-(ke.tPrev??e))/1e3);ke.tPrev=e;let n=Bt.field,o=Y,s=G.current??[0,0],c=(e,t)=>n.sample(e,t,o,{});ke.update(t,{e:r.e,n:r.n,fe:i,fn:a,u:r.u,z:r.z,pitch:r.pitch},s,c,Ns);let l=Ae&&W.racers&&q===`Free play`?Ks():[];l.forEach((e,n)=>Te.wake(1+n)?.update(t,{e:e.e,n:e.n,fe:Math.sin(e.psi),fn:Math.cos(e.psi),u:e.u,z:e.z,pitch:e.pitch},s,c,null));for(let e=1+l.length;e<Te.wakes.length;e++)Te.wakes[e]?.off();Te.upload()}H.updateMatrixWorld(!0),qn(s,ra,[H,...Ze]),y.getDrawingBufferSize(bs),P.setEnv(Ht(G.state.timeline,Y,fy)),Rc(`objects.update`,()=>pe.update(Y,Bt.field,T)),ei?.update(T.position.x,-T.position.z);{let e=Math.max(0,T.position.y),t=e<40?0:Math.round(e/20);if(!wy.on&&t!==Cy.key&&Math.abs(e-Cy.hb)>12&&(Cy.key=t,Cy.hb=t*20,Cy.cs=t?Math.max(1,Cy.hb/30):1,Cy.rMax=t?80*Cy.hb:0,P.setGrid(Ty(W.quality,W.crit))),wy.on){let t=Math.max(.3,e),n=2*Math.tan(T.fov*Math.PI/360)/Math.max(1,y.domElement.height),r=performance.now();(Math.abs(Math.log(t/wy.h))>.35||Math.abs(Math.log(n/wy.pix))>.3)&&r-wy.at>1500&&(wy.h=t,wy.pix=n,wy.at=r,P.setGrid(Ty(W.quality,W.crit)))}}Rc(`water.update`,()=>{N(),P.update(Y,{e:T.position.x,n:-T.position.z},T.position,2*Math.tan(T.fov*Math.PI/360)/Math.max(1,y.domElement.height),T,y.domElement.width,y.domElement.height),P.setSector(vy?xy(T):Sy(T))});let c=r.splash??0;Rc(`bow spray`,()=>{let t=Number(e.get(`splash`)||0),n=me.lastT;me.lastT=Y;let i=n==null||Y<n?0:Math.min(.25,Y-n),a=Math.max(+(i>0),Math.ceil(i*60)),o=3.05;for(let s=1;s<=a;s++){let l=n+i*s/a,u=s===a?r:hl(Bt.frames,Bt.dt,l),d=u.forward[0],f=u.forward[1],p=u.e+d*o,m=u.n+f*o,h=Bt.field.sample(p,m,l,ge).h;c=Math.max(c,u.splash??0);let g=e.get(`buryb`)==null?null:Number(e.get(`buryb`)),_=g==null?e.get(`bury`)==null?t?.25:u.bury:Number(e.get(`bury`)):g-Ue,v=_+Ue;me.update(i/a,{x:p,y:h,z:-m,fx:d,fz:-f,u:u.u,spray:t?.4*t:u.spray,encounter:t?2.5:u.encounter,plunge:t?t*.6:u.plunge,bury:_,buryBottom:v,amount:W.sprayAmt,on:!0,mesh:W.sprayModel!==`Ribbons`,waterY:h,hullHalfWidth:He,slam:t?Math.min(1,t):u.splash??0,cockpitD:3.3499999999999996,cockpitY:u.z-Nn+(fe?fe.deckTop(.3):.3)},T,y.domElement.height),We?.update(i/a,{bury:_,u:u.u,plunge:t?t*.6:u.plunge})}let s=W.sprayModel!==`Ribbons`;if(_e.setVisible(s),s&&fe){H.updateMatrixWorld(!0);let e=H.matrixWorld;ye.copy(e).invert();let t=xe&&Y>xe.t?Y-xe.t:0,n=t?(r.z-xe.z)/t:0,i=t?(r.pitch-xe.p)/t:0;xe={t:Y,z:r.z,p:r.pitch},_e.update(Y,{boat:fe,amount:W.sprayAmt,toWorld:t=>(ve.set(t[0],t[1],t[2]).applyMatrix4(e),[ve.x,ve.y,ve.z]),toLocalY:e=>ve.set(e[0],e[1],e[2]).applyMatrix4(ye).y,rotate:t=>(ve.set(t[0],t[1],t[2]).transformDirection(e),[ve.x,ve.y,ve.z]),water:(e,t)=>(Bt.field.sample(e,-t,Y,be),{h:be.h,ve:be.ue,vu:be.uz,vs:-be.un}),hullV:e=>[r.u*r.forward[0],n-e*i,-r.u*r.forward[1]]})}We?.upload(),Ke(H).setAmount(W.gelcoat),Ke(H).setDecalAmount(+!!W.decals),qe.visible&&(Ke(qe).setAmount(W.gelcoat),Ke(qe).setDecalAmount(+!!W.decals))});let l=e.get(`freeze`)??``;l.includes(`fft`)&&Se.sea===G.state.fft.sea&&Se.out||Rc(`fft sea`,()=>Vc(()=>Se.update(G.state.fft.sea,Y),`fft sea`)),re&&Rc(`sky cube`,()=>Vc(()=>re.update(),`sky cube`));{let e=P.uniforms.uRipAmp.value;e.x+e.y+e.z>0&&!(l.includes(`rip`)&&Ce.done)&&(Rc(`ripple cascades`,()=>Vc(()=>Ce.update(Y),`ripple cascades`)),Ce.done=!0)}B&&!Lc.noFoam&&Rc(`foam field`,()=>Vc(()=>B.update(Y,{e:r.e,n:r.n,fe:i,fn:a,u:r.u,splash:Number(e.get(`splash`)||0)||c,sprays:W.sprayModel===`Ribbons`?[]:_e.takeLandings(Y)},G.current??[0,0],W.racers&&q===`Free play`?Ks(K.t).slice(0,6).map(e=>({e:e.e,n:e.n,fe:Math.sin(e.psi),fn:Math.cos(e.psi),u:e.u})):[],(()=>{let e=((G.windFromDeg??0)+180)*Math.PI/180;return{toE:Math.sin(e),toN:Math.cos(e),ms:Lt(G.windMs??0)}})()),`foam field`)),je&&Rc(`foam roller`,()=>Vc(()=>{let t=((G.windFromDeg??0)+180)*Math.PI/180,n=dh.drift*Lt(G.windMs??0),r=G.current??[0,0];je.update(T,P.uniforms.uSpillOn.value>.5,{t:Y,field:Bt.field,drift:[r[0]+n*Math.sin(t),r[1]+n*Math.cos(t)],wind:{toE:Math.sin(t),toN:Math.cos(t),ms:G.windMs??0},pixAng:2*Math.tan(T.fov*Math.PI/360)/Math.max(1,y.domElement.height),spray:e.get(`rollerspray`)!==`0`})},`foam roller`)),ne.position.copy(T.position),zt&&zt.position.set(T.position.x,0,T.position.z),Ir.update(T,W.sunEl),F.target.position.copy(H.position),F.position.set(r.e+s.uSunDir.value.x*1e3,s.uSunDir.value.y*1e3,-r.n+s.uSunDir.value.z*1e3),ue(),T.fov!==W.fov&&(T.fov=W.fov,T.updateProjectionMatrix()),Br?.isTerrainTiles&&Br.update(T,T.fov*Math.PI/180/Math.max(1,y.domElement.height));{let e=performance.now();Rc(`renderer.render (submit)`,()=>Vc(()=>y.render(C,T))),bc+=performance.now()-e}return je?.pass&&Rc(`foam volume`,()=>Vc(()=>je.renderPass(T),`foam volume`)),r}let Fs=document.getElementById(`hudBody`),Ls=document.getElementById(`hudSpeed`),Rs=1,zs=!1,Bs=``,Vs=0,Hs=0,Us=0;function Ws(e,t,n,r,i=!1){let a=t=>{e.classList.toggle(`collapsed`,t);try{localStorage.setItem(n,t?`1`:`0`)}catch{}r?.()};t.addEventListener(`click`,()=>a(!e.classList.contains(`collapsed`)));let o=i;try{let e=localStorage.getItem(n);e!=null&&(o=e===`1`)}catch{}e.classList.toggle(`collapsed`,o)}document.getElementById(`insetSel`).addEventListener(`change`,e=>{W.inset=e.target.value,ps()});for(let e of[`pointerdown`,`click`])document.getElementById(`insetSel`).addEventListener(e,e=>e.stopPropagation());Ws(Mr,document.getElementById(`insetBar`),`surfski.insetCollapsed`,()=>ms(),!0);{let e=document.getElementById(`insetBar`),t=document.getElementById(`insetGrip`),n=`surfski.insetBox`,r=()=>{let e=Mr.getBoundingClientRect(),t=Math.min(innerWidth-16,(innerHeight-90)*.9);if(Mr.style.width&&e.width>t&&(Mr.style.width=`${Math.max(150,t)}px`),Mr.style.top){let e=Mr.getBoundingClientRect();Mr.style.left=`${Math.min(Math.max(0,e.left),Math.max(0,innerWidth-e.width))}px`,Mr.style.top=`${Math.min(Math.max(58,e.top),Math.max(0,innerHeight-40))}px`}},i=()=>{try{let e=Mr.getBoundingClientRect();localStorage.setItem(n,JSON.stringify({left:e.left,top:e.top,width:e.width}))}catch{}},a=()=>{let e=Mr.getBoundingClientRect();Mr.style.left=`${e.left}px`,Mr.style.top=`${e.top}px`,Mr.style.bottom=`auto`,Mr.style.right=`auto`};try{let e=matchMedia(`(max-width: 760px)`).matches?null:JSON.parse(localStorage.getItem(n)??`null`);e&&Number.isFinite(e.left)&&Number.isFinite(e.top)&&Number.isFinite(e.width)&&(Mr.style.width=`${e.width}px`,Mr.style.left=`${e.left}px`,Mr.style.top=`${Math.max(58,e.top)}px`,Mr.style.bottom=`auto`,Mr.style.right=`auto`,r())}catch{}let o=null,s=!1,c=(e,t)=>{if(e.button>0||matchMedia(`(max-width: 760px)`).matches)return;a();let n=Mr.getBoundingClientRect();o={mode:t,x:e.clientX,y:e.clientY,left:n.left,top:n.top,w:n.width},s=!1;try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}e.preventDefault()};e.addEventListener(`pointerdown`,e=>c(e,`move`)),t.addEventListener(`pointerdown`,e=>{c(e,`size`),e.stopPropagation()});let l=t=>{if(!o)return;let n=t.clientX-o.x,r=t.clientY-o.y;if(!(!s&&Math.hypot(n,r)<4)){if(s=!0,o.mode===`move`)e.classList.add(`dragging`),Mr.style.left=`${Math.min(Math.max(0,o.left+n),innerWidth-Mr.offsetWidth)}px`,Mr.style.top=`${Math.min(Math.max(58,o.top+r),innerHeight-40)}px`;else{let e=Math.min(innerWidth-o.left-4,innerHeight-o.top-40);Mr.style.width=`${Math.min(Math.max(150,o.w+Math.max(n,r)),Math.max(150,e))}px`,hs()}}},u=()=>{if(!o)return;let t=s;o=null,e.classList.remove(`dragging`),t&&(i(),hs())};for(let n of[e,t])n.addEventListener(`pointermove`,l),n.addEventListener(`pointerup`,u),n.addEventListener(`pointercancel`,u);e.addEventListener(`click`,e=>{s&&=(e.stopImmediatePropagation(),!1)},!0),t.addEventListener(`dblclick`,()=>{Mr.removeAttribute(`style`);try{localStorage.removeItem(n)}catch{}hs()}),addEventListener(`resize`,()=>{r()})}d.addEventListener(`wheel`,e=>{e.preventDefault(),W.mapZoom=Math.min(1,Math.max(0,W.mapZoom-e.deltaY*6e-4))},{passive:!1});let Gs=0,Ks=e=>(Wi?.setters??[]).map(t=>{let n=t.g.ski,r=e!=null&&t.finishT==null?Math.max(-.05,Math.min(.05,t.g.i*t.g.h-e)):0;return{color:t.color,e:n.e-Math.sin(n.psi)*n.u*r,n:n.n-Math.cos(n.psi)*n.u*r,psi:n.psi,u:n.u,z:n.z,pitch:n.pitch,roll:n.roll,phase:t.g.phase,power:t.g.power,plunge:n.plunge??0,mix:[t.g.w[0],t.g.w[1],t.g.w[2],t.g.sideS,t.g.lvS]}}),qs=()=>Wi?.rows(K)??[];function Ys(){let e=mm({fp:K,rows:qs()}),t=!!Ki?.drive,n=`${G.name}|${Ii}|${K.paddlerName}`,r=t?null:_m(n,e),i=t||e.stars==null?``:`<div style="font-size:34px;letter-spacing:6px;color:#ffd24d">${`★`.repeat(e.stars)}<span style="color:#456">${`★`.repeat(3-e.stars)}</span></div>`,a=t?``:r.first?`<div>First run on this course, sea and paddler: that is your best so far.</div>`:r.improved?`<div><b>New best</b>, ${Math.abs(r.deltaS).toFixed(0)} s faster than before.</div>`:`<div>${r.deltaS.toFixed(0)} s slower than your best (${Xs(r.best.timeS)}).</div>`,o=document.createElement(`div`);o.id=`scoreCard`,o.style.cssText=`position:fixed;left:50%;top:18%;transform:translateX(-50%);z-index:50;min-width:300px;max-width:min(92vw,420px);background:rgba(8,24,40,.94);color:#fff;border:1px solid #7fe0c0;border-radius:12px;padding:14px 18px;font:14px system-ui;text-align:center;box-shadow:0 8px 30px #0008`,o.innerHTML=`<div style="font-size:12px;opacity:.7">${G.name}${t?` · autopilot (${W.routing})`:``}</div>${i}
      <div style="font-size:30px;font-weight:700">${Xs(e.timeS)}</div>
      <div>${Zs(e.avgMs)} mph average · ${(e.distM/1e3).toFixed(2)} km paddled</div>
      <div style="opacity:.85">on a wave face ${Math.round(100*e.surfShare)}% of the run · reserve left ${e.reservePct}%</div>
      ${Wi?(()=>{let e=Wi.log.summary();return`<div style="opacity:.85">close calls with other boats ${e.closeUser}${e.contactUser?` · contacts ${e.contactUser}`:``}${e.clashUser?` · paddle clashes ${e.clashUser}`:``}${e.userFault?` (${e.userFault} yours)`:``}</div>`})():``}
      ${t?``:e.paceRows.map(e=>`<div>${e.name}: ${e.aheadM>=0?`ahead`:`behind`} by ${Math.abs(Math.round(e.aheadM))} m</div>`).join(``)}
      <div style="margin-top:6px">${a}</div>
      <div style="margin-top:8px"><button id="scoreClose" style="font:inherit;padding:4px 14px;border-radius:6px">Close</button></div>`,document.body.append(o),o.querySelector(`#scoreClose`).onclick=()=>o.remove()}let Xs=e=>`${Math.floor(e/60)}:${String(Math.floor(e%60)).padStart(2,`0`)}`,Zs=e=>(e*2.23694).toFixed(1),Qs=-1,ec=``,tc=-1,nc=`–`,ic=null;function ac(e){let t=K.prof._0x903c72,n=`${K.paddlerName}|${t}`;(!ic||ic.key!==n)&&(ic=new xp({uRide:_p(K.ski.p,t)}),ic.key=n);let r=ic.feed(K.frames).summary(),i=ic.current();return`<div title="Ride: on a wave face faster than you paddle on flat water at tempo (gaps up to 1 s bridged). Gliding: zero power (a brace counts) at more than 2 mph, as a share of the run." style="display:flex;gap:4px;margin:0 0 6px">${e(`${Math.round(i)} s`,`RIDE`)}${e(`${Math.round(r.longest)} s`,`LONGEST`)}${e(`${Math.round(100*r.glide)}%`,`GLIDING`)}</div>`}function oc(e){if(q!==`Free play`)return``;let t=K.i*K.h;if(t===Qs&&ec||Math.abs(t-Qs)<.25&&ec&&t>Qs)return ec;Qs=t;let n=Ki?Ki.distToGoal:null;if(Math.floor(t)!==tc){tc=Math.floor(t);let e=K.avgSpeed(30);nc=n!=null&&e>.5?Xs(n/e):`–`}let r=(e,t,n=20)=>`<div style="flex:1;text-align:center"><div style="font-size:${n}px;font-weight:700;line-height:1.05;font-variant-numeric:tabular-nums">${e}</div><div style="font-size:10px;letter-spacing:.08em;opacity:.65;white-space:nowrap">${t}</div></div>`,i=e=>(e/1e3).toFixed(e>=1e3?2:3),a=qs().map(e=>{let t=e.aheadS==null?e.aheadM>=0:e.aheadS>0,n=t?`#6fe39a`:`#ff8a80`,r=`#`+e.color.toString(16).padStart(6,`0`),i=e.aheadS==null?`${t?`+`:`−`}${Math.abs(Math.round(e.aheadM))} m`:`${e.aheadS>0?`+`:`−`}${Math.abs(Math.round(e.aheadS))} s`,a=n;return W.routing===`Surfing flow`&&e.longest!=null&&(i=`${Math.round(e.longest)} s`,a=(ic?.longest??0)>=e.longest?`#6fe39a`:`#ff8a80`),`<div style="display:flex;align-items:baseline;gap:8px;padding:2px 0;border-top:1px solid rgba(255,255,255,.12)"><span style="width:112px;font-size:13px;white-space:nowrap"><span style="color:${r}">●</span> ${e.name}${e.level==null?``:` <span style="opacity:.55;font-size:10px">${e.level}</span>`}</span><span style="flex:1;font-size:15px;font-variant-numeric:tabular-nums">${Zs(e.avgMs)} mph</span><span style="font-size:20px;font-weight:700;color:${a};font-variant-numeric:tabular-nums">${i}</span></div>`}).join(``),o=Ui?.latest,s=o?[`Cruise`,`Sporty`,`Race`].map(e=>`<div style="flex:1;text-align:center"><div style="font-size:15px;font-weight:700;font-variant-numeric:tabular-nums;color:${o.modes[e].speed>o.user?`#ff8a80`:`#6fe39a`}">${Zs(o.modes[e].speed)}</div><div style="font-size:9px;letter-spacing:.08em;opacity:.65">${e.toUpperCase()}</div></div>`).join(``):``,c=o?`<div title="Your average over the minute ending ${Xs(o.endT)}, and what an autopilot in each routing mode averaged over the same minute from the same place. Red: it was faster than you." style="display:flex;gap:4px;align-items:center;margin-top:6px;padding-top:4px;border-top:1px solid rgba(255,255,255,.12)"><div style="flex:1;text-align:center"><div style="font-size:15px;font-weight:700;font-variant-numeric:tabular-nums">${Zs(o.user)}</div><div style="font-size:9px;letter-spacing:.08em;opacity:.65">YOU, MIN ${Xs(o.startT)}</div></div>${s}</div>`:``;return ec=`<div style="display:flex;gap:6px;align-items:flex-end">${r(Zs(e.u),`MPH`,46)}${r(Zs(K.avgSpeed(60)),`1 MIN`,46)}</div>
      <div style="display:flex;gap:4px;margin:8px 0 6px">${r(Zs(K.avgSpeed()),`AVG`)}${r(Xs(t),`TIME`)}${r(n==null?`–`:i(n),`KM LEFT`)}${r(nc,`ETA`)}${r(`${Math.round(100*K.surfShare())}%`,`ON WAVE`)}</div>${W.routing===`Surfing flow`?ac(r):``}${a}${c}`}function sc(e){let t=gl(Bt.field,e,Y),n=e=>(e/an).toFixed(1),r=t.steepest.deg,i=r>30?`warn`:``,a=Ft(G.tp)/hy,o=G.current?` · current ${(Math.hypot(...G.current)/hy).toFixed(1)} kt`:``,s=G.geo?St(G.geo,e.e,e.n):null,c=G.layers.filter(e=>e.kind!==`ripples`).map(e=>`${e.name} from ${jt((e.dirToDeg+180)%360)}`).join(`, `);Bs=`${(e.u*2.23694).toFixed(1)} mph · ${Us?Math.round(Us):`–`} fps`,Ls.textContent=Bs,W.inset===`Run`?Fs.innerHTML=oc(e):W.inset===`Conditions`&&(Fs.innerHTML=`
      <div class="name">${G.name}</div>
      <div class="notes">${G.notes}</div>
      <div class="notes">Sea: ${Ri?`${G.seaModel.name} (edited)`:tn(Ii)?`${tn(Ii).name}. ${tn(Ii).notes}`:G.seaModel?.name??``}</div>
      ${G.geo?`<div class="geo">${G.geo.name}<br>${At(s)}</div>`:``}
      <div style="font-size:12px;opacity:.85">Waves from: ${c}${G.windFromDeg==null?``:` · wind from ${jt(G.windFromDeg)}`}. Sun from ${jt(W.sunAz)}, ${Math.round(W.sunEl)}° high</div>
      <div style="opacity:.8">${_r().paddlerName} · ${_r().prof.boat.name}</div>
      <div class="big">${(e.u*2.23694).toFixed(1)} <small>mph (${(e.u/hy).toFixed(1)} kt) · heading ${e.headingDeg.toFixed(0)}°</small></div>
      ${q===`Free play`?`<div>Average speed: run ${(K.avgSpeed()*2.23694).toFixed(1)} mph · last 30 s ${(K.avgSpeed(30)*2.23694).toFixed(1)} · last 10 s ${(K.avgSpeed(10)*2.23694).toFixed(1)}</div>`:``}
      <div>${q===`Free play`?`Free play`:`Recording`}${e.onRun?` · <span class="run">on a wave face</span>`:``}</div>
      <div>Surface height (ft): here ${n(t.heights[0])} · +2 m ${n(t.heights[2])} · +5 m ${n(t.heights[5])} · +10 m ${n(t.heights[10])}</div>
      <div class="${i}">Steepest rising face ahead: ${r.toFixed(0)}° at ${t.steepest.at.toFixed(1)} m</div>
      <div>Main wave period ${G.tp.toFixed(1)} s · crest speed ${a.toFixed(1)} kt (${(a*hy*2.23694).toFixed(1)} mph)${o}</div>
      <div style="opacity:.7;font-size:11px;margin-top:4px">↑ tap = power up (↑ hold = keep climbing) · ↓ tap = ease off (↓ hold = glide) · ←/→ steer · Space pause/resume · IJKL/UO move the camera · Alt+IJKL move the boat 100 m · Alt+U/O turn it 30° · [ ] mark in/out · C save clip · V camera</div>`,q===`Free play`&&K.aground?(ls(`Aground. Steer away from the shore.`),zs=!0):zs&&=(ls(``),!1))}let cc=null,lc=[];function uc(){return cc===G.layers||(cc=G.layers,lc=G.layers.filter(e=>e.kind!==`ripples`).map(e=>({name:e.name.replace(/\s*\(.*\)/,``),zone:e.ch?G.state.zones?.[e.ch]??null:null,dirDeg:e.dirToDeg,hsFt:e.Hs/an}))),lc}function dc(){let e=(G.state.zones??[]).filter(Boolean),t=G.start??{e:0,n:0};if(!e.length)return;let n=0;for(let r of e){let e=r.kind===1?[[r.ax,r.ay,r.size+r.soft],[r.bx,r.by,r.size+r.soft]]:[[r.ax,r.ay,r.size]];for(let[r,i,a]of e)n=Math.max(n,Math.hypot(r-t.e,i-t.n)+a)}let r=Math.min(12e3,Math.max(60,2.3*n));W.mapZoom=Math.round(Math.min(1,Math.max(0,1-Math.log(r/60)/Math.log(200)))*100)/100}let fc=null,pc=null;function mc(){let e=G.raceCourse;if(!e||!qr)return null;let t=`${G.name}|${qr.i}`;return t!==fc&&(fc=t,pc=e.lines(qr,3)),pc}function hc(e){let t=Nr(),n=G.geo?St(G.geo,e.e,e.n):null,r=G.site===`shilshole`?` · OpenStreetMap shore`:` · open water`;jr.draw({ski:e,field:Bt.field,time:Y,terrain:Ut,geo:n?At(n):``,frames:Bt.frames,dt:Bt.dt,t0:hr(),widthM:t,wavesToDeg:G.state.stats.dominant?.dirToDeg??0,sunAzDeg:W.sunAz,groups:uc(),gates:mc(),solve:pi(),label:`${t>=1e3?`${(t/1e3).toFixed(1)} km`:`${Math.round(t)} m`} wide${r}`})}let gc=performance.now(),_c=0,vc=!1,yc=0,bc=0,xc=e.get(`fieldms`)==null?g.fieldMs??(matchMedia(`(pointer: coarse)`).matches?2:4):Number(e.get(`fieldms`)),Sc=g.planBudget??4,Cc=e=>{W.quality=e,P.setGrid(Ty(e,W.crit)),ka().forEach(e=>e.updateDisplay())},wc=[`Standard`,`Draft`,`Low`],Tc=new Xv({pixels:()=>(y.getDrawingBufferSize(bs),bs.x*bs.y),scale:(e,t)=>{let n=Yv(W.renderScale,e,t);return n!=null&&(W.renderScale=n,ms(),t||Ga.set(n),!0)},deep:e=>W.renderScale<=e+.01?!1:(W.renderScale=e,ms(),!0),up:()=>{let e=Jv(W.renderScale,Ka());return e!=null&&(W.renderScale=e,ms(),!0)},kept:()=>{Ga.set(W.renderScale),ka().forEach(e=>e.updateDisplay())},cpu:()=>Sc>1.5?(Sc=Sc>2.5?2.5:1.5,`The guide and the competitors now think a little more slowly, to keep the motion smooth`):null,snap:()=>({renderScale:W.renderScale,quality:W.quality,crit:W.crit,lite:W.lite,trailR:W.trailR,planBudget:Sc}),apply:e=>{W.renderScale=e.renderScale,ms(),Ga.set(e.renderScale),Sc=e.planBudget??Sc,(W.quality!==e.quality||W.crit!==e.crit)&&(W.crit=e.crit,Cc(e.quality)),Vo(e.lite),Bo(e.trailR),ka().forEach(e=>e.updateDisplay())},mesh:()=>{let e=wc.indexOf(W.quality);return e<0||e>=wc.length-1?null:(Cc(wc[e+1]),`Simplified the water (${W.quality} mesh) to keep the motion smooth`)},near:()=>W.trailR>150?(Bo(150),`Foam trails now only near you (hardly visible), to keep the motion smooth`):null,lite:()=>W.lite?null:(Vo(!0),`Turned off foam trails to keep the motion smooth`)},{enabled:qa&&!e.get(`bench`)});window.__adapt=Tc;let Ec=Tc.a.cpu;Tc.a.cpu=()=>Ec()??(ro.on?xc>1.01?(xc=Math.max(1,+(xc*.7).toFixed(2)),`The competitors now move on a lighter step, to keep the motion smooth`):st.length>0?(to(`field`,st.length-1),`One competitor fewer, to keep the motion smooth`):null:null);let Dc=e=>Tc.setTarget(Nt.on?30:60,{deep:!e});ro.api.onExperience=Dc,Dc(ro.on),ro.api.onBattery=e=>{Nt.on=e,Dc(ro.on)};{let e=ro.api.onExperience;ro.api.onExperience=t=>{e(t),nt=t}}let Oc=0;window.__fps=()=>Us;let kc=Number(e.get(`bench`)||0),Ac=[];function jc(e,t){if(Ac.push([e,t]),Mc&&Ac.length===40&&(Mc.frames=0,Mc.ms={},Mc.gpuMs=0,Mc.gpuFrames=0,Mc.gpu={},Mc.gpuN={},Mc.gpuBig={}),Ac.length===40+kc&&!window.__bench){let e=Ac.slice(40),t=(e,t)=>e.slice().sort((e,t)=>e-t)[Math.min(e.length-1,Math.floor(e.length*t))],n=e.map(e=>e[0]),r=e.map(e=>e[1]),i=e=>e.reduce((e,t)=>e+t,0)/e.length,a=y.getContext(),o=a.getExtension(`WEBGL_debug_renderer_info`);y.getDrawingBufferSize(bs),window.__bench={frames:e.length,intervalMs:{mean:i(n),p95:t(n,.95)},renderMs:{mean:i(r),p95:t(r,.95)},quality:W.quality,lite:W.lite,renderScale:W.renderScale,buffer:[bs.x,bs.y],css:[innerWidth,innerHeight],dpr:devicePixelRatio,gpu:o?a.getParameter(o.UNMASKED_RENDERER_WEBGL):`unknown`,scenario:W.scenario,view:W.view,...Mc?{prof:{frames:Mc.frames,msPerFrame:Object.fromEntries(Object.entries(Mc.ms).map(([e,t])=>[e,t/Math.max(1,Mc.frames)])),gpuMsPerFrame:Mc.gpuFrames?Mc.gpuMs/Mc.gpuFrames:null,gpuTimerAvailable:!!Fc,gpuMsPerStage:Object.fromEntries(Object.entries(Mc.gpu).map(([e,t])=>[e,t/Math.max(1,Mc.gpuN[e])])),info:{memory:{...y.info.memory},render:{calls:y.info.render.calls,triangles:y.info.render.triangles},programs:y.info.programs?.length??null},heapMB:performance.memory?performance.memory.usedJSHeapSize/1e6:null,waterVertices:P.mesh.geometry.attributes.position.count}}:{}}}}let Mc=e.get(`prof`)===`1`?window.__prof={frames:0,ms:{},gpuMs:0,gpuFrames:0,gpu:{},gpuN:{},gpuBig:{},pending:[],cur:{},max:{},slow:[]}:null,Nc=Mc?y.getContext():null,Fc=Nc?Nc.getExtension(`EXT_disjoint_timer_query_webgl2`):null,Ic=window.__hitches={cur:{},prev:{},progs:0,progsPrev:0,log:[]},Lc={noFoam:!1,run:null},Rc=(e,t)=>{let n=performance.now(),r=t(),i=performance.now()-n;return Ic.cur[e]=(Ic.cur[e]??0)+i,Mc&&(Mc.ms[e]=(Mc.ms[e]??0)+i),r},zc=()=>{Ic.prev=Ic.cur,Ic.cur={},Ic.workPrev=Ic.work,Ic.progsPrev=Ic.progs,Ic.progs=y.info.programs?.length??0},Bc=e=>{Lc.run?.rec&&Lc.run.rec.push([e,Ic.workPrev??0,Ic.prev]);let t=Ic.prev,n=Object.entries(t).filter(([,e])=>e>1).sort((e,t)=>t[1]-e[1]);if(Mc){for(let e in t)t[e]>(Mc.max[e]??0)&&(Mc.max[e]=t[e]);e>50&&Mc.slow.length<60&&Mc.slow.push({at:Math.round(performance.now()),ms:Math.round(e),stages:Object.fromEntries(n.map(([e,t])=>[e,+t.toFixed(1)]))})}if(e>250&&!document.hidden){let t=Ic.progs-Ic.progsPrev,r=n.reduce((e,[,t])=>e+t,0),i=`pause ${Math.round(e)} ms (page ${Math.round(Ic.workPrev??0)})${t>0?`, ${t} new shader${t>1?`s`:``}`:``}: ${n.slice(0,4).map(([e,t])=>`${e} ${Math.round(t)}`).join(`, `)||`no stage`}${r<e*.5?` (most of it outside the stages: compiling, collecting, the GPU or the browser)`:``}`;Ic.log.push(i),Ic.log.length>30&&Ic.log.shift(),window.__crumb?.(i)}},Vc=(e,t=`main render`)=>{if(!Mc||!Fc){e();return}let n=Nc.createQuery();Nc.beginQuery(Fc.TIME_ELAPSED_EXT,n),e(),Nc.endQuery(Fc.TIME_ELAPSED_EXT),Mc.pending.push([n,t]);for(let e=Mc.pending.length-1;e>=0;e--){let[t,n]=Mc.pending[e];if(Nc.getQueryParameter(t,Nc.QUERY_RESULT_AVAILABLE)){if(!Nc.getParameter(Fc.GPU_DISJOINT_EXT)){let e=Nc.getQueryParameter(t,Nc.QUERY_RESULT)/1e6;if(Mc.gpu[n]=(Mc.gpu[n]??0)+e,Mc.gpuN[n]=(Mc.gpuN[n]??0)+1,e>1){let t=Mc.gpuBig[n]??=[];t.length<200&&t.push(+e.toFixed(1))}n===`main render`&&(Mc.gpuMs+=e,Mc.gpuFrames++)}Nc.deleteQuery(t),Mc.pending.splice(e,1)}}};async function Hc(){if(Lc.run)return;let t=P.uniforms,n=C.children.slice(),r=n.map(e=>e.visible),i=t.uRipAmp.value.clone(),a=e.get(`freeze`),o=new Set([P.mesh,ne]),s=()=>{n.forEach((e,t)=>{e.visible=r[t]}),t.uRipAmp.value.copy(i),a==null?e.delete(`freeze`):e.set(`freeze`,a),Lc.noFoam=!1},c=[[`as it is`,()=>{}],[`no fine ripple shading`,()=>t.uRipAmp.value.set(0,0,0)],[`the sea FFT held`,()=>e.set(`freeze`,`fft`)],[`no foam field`,()=>{Lc.noFoam=!0}],[`no water drawn`,()=>{P.mesh.visible=!1}],[`no sky dome drawn`,()=>{ne.visible=!1}],[`only water and sky drawn`,()=>n.forEach(e=>{!o.has(e)&&!e.isLight&&(e.visible=!1)})],[`nothing drawn`,()=>n.forEach(e=>{e.isLight||(e.visible=!1)})],[`nothing drawn, sea held, no foam`,()=>{n.forEach(e=>{e.isLight||(e.visible=!1)}),t.uRipAmp.value.set(0,0,0),e.set(`freeze`,`fft,rip`),Lc.noFoam=!0}],[`as it is (again)`,()=>{}]],l={live:J,auto:W.autopilot,scale:W.renderScale,adapt:Tc.enabled};if(Lc.run={rec:null},Tc.enabled=!1,!W.autopilot){W.autopilot=!0;try{ia()}catch{}}J||(J=!0,ls(``),uo()),dr();let u=e=>new Promise(t=>setTimeout(t,e)),d=[],f=e=>Math.round(e*10)/10;y.getDrawingBufferSize(bs);let p=`perf probe: ${bs.x}x${bs.y} buffer (scale ${W.renderScale}, ${innerWidth}x${innerHeight} at ${devicePixelRatio}x), mesh ${W.quality}, ${W.lite?`cheaper effects, `:``}competitors ${W.racers?st.length:`off`}, ${m?`safe mode, `:``}${S.gpu}`,h=`power unknown`;try{let e=await navigator.getBattery?.();e&&(h=e.charging?`on mains (battery ${Math.round(e.level*100)}%)`:`on battery (${Math.round(e.level*100)}%)`)}catch{}let g=()=>{let e=performance.now(),t=0;for(let e=1;e<3e6;e++)t+=Math.sqrt(e)*Math.sin(e*.001);return window.__cpuSink=t,performance.now()-e},_=Math.min(g(),g(),g()),v=`${p}; ${h}; CPU reference ${f(_)} ms (a fixed loop: slower means a slower or throttled CPU)`;window.__crumb?.(v),Bv(`Measuring the frame rate, about 40 s: leave it running`,4e3);let b=null;try{for(let[e,t]of c){s(),t(),await u(1e3),Lc.run.rec=[],await u(3e3);let n=Lc.run.rec;if(Lc.run.rec=null,n.length<3){d.push({name:e,frames:n.length}),window.__crumb?.(`${e}: only ${n.length} frames`);continue}let r=n.map(e=>e[0]).sort((e,t)=>e-t),i=r.reduce((e,t)=>e+t,0)/r.length,a=n.reduce((e,t)=>e+t[1],0)/n.length,o={};for(let e of n)for(let t in e[2])o[t]=(o[t]??0)+e[2][t]/n.length;let c=Object.entries(o).filter(([e,t])=>t>.5&&e!==`renderScene total`).sort((e,t)=>t[1]-e[1]).slice(0,4).map(([e,t])=>`${e} ${f(t)}`).join(`, `),l={name:e,fps:f(1e3/i),ms:f(i),p90:f(r[Math.floor(r.length*.9)]),page:f(a),top:c};b??=l,d.push(l),window.__crumb?.(`${e}: ${l.fps} fps, ${l.ms} ms a frame (p90 ${l.p90})${l===b?``:`, ${l.ms<=b.ms?`saves`:`adds`} ${f(Math.abs(b.ms-l.ms))} ms`}; page ${l.page} ms: ${c}`)}}finally{s(),Tc.enabled=l.adapt,W.autopilot=l.auto;try{ia()}catch{}l.live||(J=!1,uo());let e=d[0],t=d.find(e=>e.name===`nothing drawn`);e?.ms&&window.__crumb?.(e.ms<18?`verdict: at the display's rate; nothing to find`:e.page>.7*e.ms?`verdict: the page's own work (CPU) is the limit: ${e.page} of ${e.ms} ms`:t?.ms&&t.ms>.7*e.ms?`verdict: the fixed work is the limit (${t.ms} ms with nothing drawn): the sea's transforms, the foam, the browser`:`verdict: the drawing (GPU) is the limit: the page's work is ${e.page} of ${e.ms} ms`),window.__probe={head:v,rows:d},Lc.run=null,window.__crumb?.(`perf probe done: open the debug bar (tap the line at the top), copy, and send it`),Bv(`Done: the results are in the debug bar (copy)`,5e3)}}window.__perfProbe=Hc;let Uc=new Map;function Wc(e){if(Nt.on&&!kc&&Oc&&e-Oc<30)requestAnimationFrame(Wc);else{Oc=e;try{Gc(e)}catch(e){let t=String(e?.stack||e).slice(0,400),n=performance.now();n-(Uc.get(t)??-1e9)<5e3||(Uc.set(t,n),console.error(`frame failed (the sim carries on)`,e)),requestAnimationFrame(Wc)}}}function Gc(t){let n=performance.now();bc=0,Vs++,t-Hs>=500&&(Us=Hs?Vs*1e3/(t-Hs):0,Vs=0,Hs=t),Vn&&=(gc=t,!1),vc&&Bc(t-gc);let r=gc,i=fr>0&&!J,a=i?1/60:Math.min(.05,(t-gc)/1e3);Tc.tick((t-gc)/1e3,yc),gc=t;let o=!1;if(i&&(q===`Free play`&&Y<K.t-1e-6?Y=Math.min(K.t,Y+a):(J=!0,o=!0)),q===`Free play`){if(J){Yr(),Ki&&Rc(`route planner`,()=>Ki.update(Sc,{plan:io()}));{let e=K.ski,t=W.racers&&W.drafting&&Wi?Wi.setters.filter(e=>e.finishT==null).map(e=>({e:e.g.ski.e,n:e.g.ski.n,psi:e.g.ski.psi,u:e.g.ski.u})):[];K.draft=t.length?Op({e:e.e,n:e.n,psi:e.psi,u:e.u},t).saving:0}if(Rc(`physics: fp.advance`,()=>K.advance(a*W.playSpeed)),Y=K.t,Ki?.drive&&Ki.arrived&&!qi){qi=!0;let e=Ki.report();Bv(`Arrived: ${(e.vmg*2.23694).toFixed(1)} mph made good, ${(e.timeS/60).toFixed(1)} min, ${Math.round(e.meanW)} W average, ${(e.energyJ/1e3).toFixed(0)} kJ`)}}else Ki&&!Ki.drive&&Rc(`route planner`,()=>Ki.update(Sc,{plan:io()}));!J&&Ki&&!Wi&&K.states.length&&st.length&&W.racers&&Rc(`pace-setters`,Gi),Y=Math.min(Math.max(Y,0),K.t),Ki?.arrived&&!Hi&&J&&(Hi=!0,Ys()),W.inset===`Run`&&Ki&&J&&Rc(`run compare`,()=>{Ui??=new pm({makeGhost:()=>new Yu(G,Di(),Si(),K.paddlerName,`v2`),pilotOpts:{_0x3cd8ba:0,_0x139f52:.8}}),Ui.tick(K,Ki.goal,Ki.table)}),!W.racers&&Wi&&(Wi=null),Ki&&J&&K.states.length&&st.length&&W.racers&&Rc(`pace-setters`,()=>{Wi&&Wi.setters[0].g.i*Wi.setters[0].g.h>K.i*K.h+.5&&(Wi=null),Gi();let e=K.ski;Wi.sync(K.t,40,Sc,Ki.table,{e:e.e,n:e.n,psi:e.psi,u:e.u,phase:K.phase,power:K.power},{bump:e=>K.bump(e),clash:e=>K.clash(e)},xc);for(let e of Wi.log.drain())if(e.user&&W.racers){let t=e.a===`You`?e.b:e.a;Bv(e.kind===`clash`?`Paddle clash with ${t}`:e.kind===`contact`?`Contact with ${t}${e.userFault?` (you cut in)`:``}`:`Close call with ${t}: ${e.gap.toFixed(1)} m${e.userFault?` (you cut in)`:``}`)}})}else J&&(Y+=a*W.playSpeed,Y>=gr()&&(Y=gr(),J=!1,uo()));let s=kc?performance.now():0,c=Rc(`renderScene total`,()=>Ps(a));if(i&&(o&&(J=!1),fr--,Fn=performance.now(),pr&&gs(`-f${String(++mr).padStart(2,`0`)}`),fr||(uo(),Bv(`Stepped to ${Y.toFixed(3)} s`,1500))),Mc&&Mc.frames++,kc&&(e.get(`benchsync`)!==`0`&&y.getContext().finish(),jc(t-r,performance.now()-s)),!vc){vc=!0,pt();try{localStorage.removeItem(`surfski.boot`)}catch{}window.__crumb?.(`first frame drawn`),Promise.race([Le,new Promise(e=>setTimeout(e,6e3))]).then(()=>{window.__crumb?.(`your paddler ready`),dr(),Rv(`loading`).classList.add(`done`),setTimeout(()=>Rv(`loading`)?.remove(),700)}),dt?.then(()=>window.__crumb?.(`competitors ready`)),e.get(`perfprobe`)===`1`&&setTimeout(Hc,6e3)}W.inset!==`Off`&&W.inset!==`Conditions`&&W.inset!==`Run`&&(W.inset===`Map`?Rc(`2D inset map`,()=>hc(c)):W.inset===`Local effects`?Rc(`2D inset local effects`,()=>{jr.sig=null,fi(c)}):W.inset===`Waves`?Rc(`2D inset waves`,()=>(jr.sig=null,kr.draw({ski:c,field:Bt.field,time:Y,scn:G,frames:Bt.frames,dt:Bt.dt,t0:hr(),end:gr()}))):Rc(`2D inset surf`,()=>(jr.sig=null,X.draw({ski:K?.ski,pose:c,field:Bt.field,time:Y})))),so.min=hr(),so.max=Math.max(gr(),hr()+.1),so.value=Y,co.textContent=`${(Y-hr()).toFixed(1)} / ${(gr()-hr()).toFixed(1)} s${q===`Free play`?J?` · LIVE`:` · paused`:` · rec`}`;let l=_r().prof,u=Math.max(0,c.power),d=document.getElementById(`pfill`);l.bands;let f=c.braceLevel??0,p=20+l._0x903c72/l.maxW*80;if(f>0&&u<5){let e=Math.min(Math.max(c.mix?.[4]??f,0),3)/3*20;d.style.left=`${20-e}%`,d.style.width=`${e}%`,d.style.background=Oi[f-1],document.getElementById(`ptxt`).textContent=`power −${f} · ${ki[f-1]} brace`}else{d.style.left=`20%`,d.style.width=`${Math.min(u/l.maxW,1)*80}%`,d.style.background=us(fs(u,l._0x903c72,Iu));{let e=Vu(u,l._0x903c72,c.u);document.getElementById(`ptxt`).textContent=u<=3?`power 0 · ${e}`:`power ${Lu(u,l._0x903c72)} · ${e===`low power`?``:`${e} · `}${u.toFixed(0)} W${K.draft>=.005?` · draft ${Math.round(K.draft*100)}%`:``}`}d.parentNode.querySelector(`.lvtick`)||Iu.slice(1).forEach(e=>{let t=document.createElement(`i`);t.className=`tick lvtick`,t.dataset.f=e,d.parentNode.appendChild(t)}),d.parentNode.querySelectorAll(`.lvtick`).forEach(e=>{e.style.left=`${20+Math.min(+e.dataset.f*l._0x903c72/l.maxW,1)*80}%`})}document.getElementById(`pbase`).style.left=`${p}%`,document.getElementById(`psprint`).style.left=`${p}%`,document.getElementById(`pbrace`).style.width=`20%`,document.getElementById(`pzero`).style.left=`20%`,document.getElementById(`plab`).innerHTML=`<span style="left:10%">brace</span><span style="left:20%">0</span><span style="left:${(20+p)/2}%">1 2 3</span><span style="left:${p}%">tempo 4</span><span style="left:${(p+100)/2}%">5 6 7</span>`;let m=Math.min(Math.max(c.wPrime/l.wPrime,0),1),h=document.getElementById(`rfill`);if(h.style.width=`${m*100}%`,h.style.background=m>.5?`#4cd18a`:m>.2?`#ffc247`:`#ff6a3d`,document.getElementById(`rtxt`).textContent=`reserve ${(m*100).toFixed(0)}%`,$a.s.preset!==`Off`||ro.on||ro.controls!==`buttons`){let e=G.raceCourse,t=e&&qr?e.seq?.[qr.i+1]?.point??null:null,n=e&&qr?{doneM:e.progress(qr,c.e,c.n),remainingM:e.remaining(qr,c.e,c.n)}:{},r=eo.update({fp:q===`Free play`?K:null,s:c,field:Bt.field,t:Y,nav:G.goal?{goal:G.goal,after:t,...n}:null,prof:l,elapsed:Y-hr()});$a.s.preset!==`Off`&&$a.update(r,{zeroPct:20,maxW:l.maxW}),ro.update(r,a)}Rs+=a,Rs>.1&&(Rs=0,Rc(`HUD text`,()=>sc(c))),_c+=a,_c>.5&&(Kt!=null||qt!=null)&&(_c=0,fo()),Ic.work=performance.now()-n,zc(),yc=(performance.now()-n-bc)/1e3,!kc&&!Mc&&e.get(`idle`)!==`0`&&!J&&ws.size===0&&!Hn&&performance.now()-Fn>600&&++or>40&&vc?(Mn=!0,tr++):requestAnimationFrame(Wc)}e.get(`scenario`)&&(W.scenario=Yt(e.get(`scenario`))?.name??W.scenario);for(let t of[`view`,`inset`,`quality`,`horizon`])e.get(t)&&(W[t]=e.get(t));Ey[W.quality]||(W.quality=`Standard`),e.get(`gelcoat`)!=null&&(W.gelcoat=Number(e.get(`gelcoat`))),e.get(`decals`)===`0`&&(W.decals=!1);{let t={"Blinding sun":`Bright midday`},n=e.get(`tod`),r=t[e.get(`weather`)]??e.get(`weather`),i=t[e.get(`wx`)]??e.get(`wx`);n&&n in fa&&(W.timeOfDay=n),r&&r in pa&&(W.weather=r),i&&ma[i]?(W.weatherPreset=i,W.timeOfDay=ma[i][0],W.weather=ma[i][1]):(n||r)&&(W.weatherPreset=`Custom`)}{let t=null;try{t=localStorage.getItem(`surfski.playback`)}catch{}e.get(`playback`)!=null&&(t=e.get(`playback`)),W.playback=t===`1`}{let t=null;try{t=JSON.parse(localStorage.getItem(Ot)??`null`)}catch{}let n={routing:Object.keys(Vi),guideStyle:[`Whole route`,`Next wave`],guideWeight:[`Normal`,`Light`,`Faint`]};for(let e of kt)t&&e in t&&(n[e]?n[e].includes(t[e]):typeof t[e]==`boolean`)&&(W[e]=t[e]);e.get(`guide`)!=null&&(W.guide=e.get(`guide`)===`1`),e.get(`coaching`)!=null&&(W.coaching=e.get(`coaching`)===`1`),e.get(`alts`)!=null&&(W.guideAlts=e.get(`alts`)!==`0`),e.get(`guidestyle`)!=null&&(W.guideStyle=e.get(`guidestyle`)===`wave`?`Next wave`:`Whole route`),e.get(`guideweight`)!=null&&(W.guideWeight={light:`Light`,faint:`Faint`}[e.get(`guideweight`)]??`Normal`);let r={cruise:`Cruise`,sporty:`Sporty`,race:`Race`,flow:`Surfing flow`,easy:`Cruise`,balanced:`Sporty`,fast:`Race`}[e.get(`routing`)??e.get(`autoroute`)];r&&(W.routing=r)}e.get(`pixfade`)!=null&&(P.uniforms.uPixFade.value=Number(e.get(`pixfade`))),e.get(`cam`)&&(W.view=`Free cam`),e.get(`facetint`)===`1`&&(W.faceTint=!0,P.uniforms.uFaceTint.value=1),W.view===`Buddy cam`&&(W.view=`Drone`),Dy[W.view]||(W.view=`Boyan cam`);let Kc=matchMedia(`(pointer: coarse)`).matches||navigator.maxTouchPoints>0&&innerWidth<1100;if(m||h.tier===`phone`||Kc&&h.tier===`desktop`?(e.get(`quality`)||(W.quality=`Draft`),W.renderScale=1,W.lite=!0):h.tier===`tablet`&&(e.get(`quality`)||(W.quality=g.quality),W.renderScale=1,W.lite=g.lite),e.get(`lite`)!=null&&(W.lite=e.get(`lite`)!==`0`),e.get(`scale`))W.renderScale=Number(e.get(`scale`));else if(qa&&!Kc&&!m){let e=Number(Ga.get());e>1&&(W.renderScale=Math.min(e,Ka()))}e.get(`steady`)||(W.camSteady=Dy[W.view].steady??0);for(let t of[`wiggle`,`ripples`,`foam`,`fov`,`eyeHeight`,`glint`,`mapZoom`,`droneSide`,`droneBack`,`droneHeight`,`droneYaw`,`dronePitch`])e.get(t)&&(W[t]=Number(e.get(t)));e.get(`steady`)&&(W.camSteady=Number(e.get(`steady`))),e.get(`racers`)===`0`&&(W.racers=!1),e.get(`drafting`)===`0`&&(W.drafting=!1);for(let[t,n]of[[`buddySide`,`droneSide`],[`buddyBack`,`droneBack`],[`buddyEye`,`droneHeight`]])e.get(t)&&(W[n]=Number(e.get(t)));for(let t of[`sunAz`,`sunEl`,`crestSharpen`,`teal`,`turbid`,`cloud`])e.get(t)&&(It[t]=Number(e.get(t)));En[e.get(`haze`)]&&(It.haze=e.get(`haze`));for(let t of[`hazeAmt`,`hazeType`,`cloudType`,`cloudVar`])e.get(t)&&(It[t]=Number(e.get(t)));(W.inset===`Plan`||W.inset===`Waves`)&&(W.inset=`Local effects`),!e.get(`inset`)&&innerWidth<=760&&(W.inset=`Conditions`),zn[e.get(`paddler`)]&&(W.paddler=e.get(`paddler`)),e.get(`tune`)&&Object.assign(W.tune,xu(e.get(`tune`))),e.get(`fov`)||(W.fov=Dy[W.view].fov),T.fov=W.fov,T.updateProjectionMatrix(),P.uniforms.uMicro.value=W.ripples,P.uniforms.uFoam.value=W.foam,C.fog.density=0,P.uniforms.uFogDensity.value=0;let qc=e.get(`fog`)===`0`;if(qc&&(W.fogScale=0),W.racers&&q===`Free play`&&st.forEach((e,t)=>ht(t,e.color)),await window.__crumb?.(`building the first scenario`),await Pi(dn(W.scenario)),await window.__crumb?.(`scenario built, running the first load`),zi(W.scenario),t)try{jo(t,{fromConfig:!0})}catch(e){console.warn(`?config= not applied:`,e.message)}await window.__crumb?.(`first load done`),e.get(`autostart`)===`1`&&ho();let Jc={renderScale:W.renderScale,quality:W.quality,lite:W.lite,trailR:W.trailR};if(e.get(`t`)){K.advance(Number(e.get(`t`)));for(let t of e.get(`seq`)??``)t===`d`?(K.setDown(!0),K.advance(.05),K.setDown(!1),K.advance(.2)):t===`h`?(K.setDown(!0),K.advance(2.5)):t===`r`?(K.setSteer(1),K.advance(1.5)):t===`l`?(K.setSteer(-1),K.advance(1.5)):t===`w`?K.advance(1):t===`q`?K.advance(.4):t===`I`?K.strafe(100,0):t===`K`?K.strafe(-100,0):t===`J`?K.strafe(0,-100):t===`L`?K.strafe(0,100):t===`U`?K.turn(-30):t===`O`&&K.turn(30);Y=K.t,J=!1,ls(``)}(e.get(`live`)===`1`||kc)&&(J=!0,ls(``),uo()),P.setGrid(Ty(W.quality,W.crit)),Vo(W.lite),ka().forEach(e=>e.updateDisplay()),ps(),ds();for(let t of(e.get(`collapse`)??``).split(`,`))(t===`hud`||t===`inset`)&&(Mr.classList.add(`collapsed`),ms());if(e.get(`hud`)===`0`)for(let e of[`#inset`,`#timeline`,`#sidePanel`,`#toolbar`,`#touch`,`#banner`])document.querySelector(e)?.style.setProperty(`display`,`none`);({}).__scn={get ui(){return W},get renderer(){return y},get atmos(){return z},get foam(){return B},get free(){return Z},get objects(){return pe},get skyCube(){return re},get pace(){return Wi},get skiMesh(){return H},get water(){return P},get camera(){return T},get scn(){return G},get run(){return Bt},get fp(){return K},get pace(){return Wi},ui:W,set t(e){Y=e},get t(){return Y}},e.get(`t`)==null&&e.get(`hud`)!==`0`&&e.get(`intro`)!==`0`&&e.get(`live`)!==`1`&&!zo.seen()&&zo.show(!0),await window.__crumb?.(`starting to draw (the first frame compiles the shaders)`),requestAnimationFrame(Wc)}Ay().catch(e=>{e instanceof iy?(console.warn(e.message),ly(e)):(window.__showError?.(`startup failed: `+String(e.message||e)+` | `+String(e.stack||``).slice(0,1500)),document.getElementById(`loading`)?.remove(),document.body.insertAdjacentHTML(`beforeend`,`<pre style="color:#f88;padding:1em;position:fixed;top:0">${e.stack||e}</pre>`),console.error(e))});