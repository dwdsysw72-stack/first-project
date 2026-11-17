/* ORBIT — hero WebGL: an iridescent, breathing blob that follows the pointer */
import * as THREE from './vendor/three.module.min.js';

const canvas = document.getElementById('gl');
const hero = document.querySelector('.hero');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = window.matchMedia('(max-width: 760px)').matches;

function supportsWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch { return false; }
}

if (canvas && hero && supportsWebGL()) init();

function init() {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  // Simplex noise (Ashima Arts / Stefan Gustavson, MIT)
  const noise = /* glsl */ `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  const uniforms = {
    uTime: { value: 0 },
    uAmp: { value: 0.32 },
    uFreq: { value: 1.1 },
    uHover: { value: 0 },
  };

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: /* glsl */ `
      uniform float uTime, uAmp, uFreq, uHover;
      varying vec3 vNormal; varying vec3 vView; varying float vN;
      ${noise}
      float field(vec3 p){
        float n = snoise(p * uFreq + vec3(uTime * 0.22));
        n += 0.45 * snoise(p * uFreq * 2.3 - vec3(uTime * 0.31));
        return n;
      }
      void main(){
        vec3 p = position;
        float amp = uAmp + uHover * 0.12;
        float n = field(normalize(p));
        vec3 displaced = p + normal * n * amp;
        // recompute the normal from two neighbour samples so lighting follows the waves
        vec3 t = normalize(cross(normal, vec3(0.0, 1.0, 0.001)));
        vec3 bt = normalize(cross(normal, t));
        float e = 0.02;
        vec3 pa = p + t * e;  pa += normalize(pa) * field(normalize(pa)) * amp;
        vec3 pb = p + bt * e; pb += normalize(pb) * field(normalize(pb)) * amp;
        vec3 nrm = normalize(cross(pa - displaced, pb - displaced));
        if (dot(nrm, normal) < 0.0) nrm = -nrm;
        vN = n;
        vNormal = normalize(normalMatrix * nrm);
        vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
        vView = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime;
      varying vec3 vNormal; varying vec3 vView; varying float vN;
      vec3 pal(float t){ return 0.5 + 0.5 * cos(6.28318 * (t + vec3(0.0, 0.33, 0.67))); }
      void main(){
        vec3 n = normalize(vNormal);
        vec3 v = normalize(vView);
        float fres = pow(1.0 - max(dot(n, v), 0.0), 2.2);
        vec3 light = normalize(vec3(-0.6, 0.8, 0.6));
        float diff = max(dot(n, light), 0.0);
        float spec = pow(max(dot(reflect(-light, n), v), 0.0), 40.0);
        vec3 irid = pal(vN * 0.35 + fres * 0.9 + uTime * 0.03 + 0.55);
        vec3 base = vec3(0.04, 0.035, 0.07);
        vec3 col = mix(base, irid * 0.85, 0.18 + diff * 0.35 + fres * 0.75);
        col += vec3(0.78, 1.0, 0.24) * pow(fres, 3.5) * 0.55;   // lime rim
        col += vec3(1.0) * spec * 0.6;
        gl_FragColor = vec4(col, 1.0);
      }`,
  });

  const blob = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, mobile ? 48 : 96), material);
  const group = new THREE.Group();
  group.add(blob);
  scene.add(group);

  // Dust particles around the blob
  const count = mobile ? 260 : 650;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = 2.2 + Math.random() * 3.2;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
    pos[i * 3 + 2] = r * Math.cos(ph);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xc8ff3d, size: mobile ? 0.03 : 0.022, transparent: true, opacity: 0.55, depthWrite: false, sizeAttenuation: true,
  }));
  group.add(dust);

  /* ---- layout: blob sits opposite the text (left side in RTL) ---- */
  let baseX = 0, baseY = 0, baseScale = 1;
  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const narrow = w < 860;
    const halfW = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z * camera.aspect;
    baseX = narrow ? 0.4 : -halfW * 0.52;
    baseY = narrow ? 1.2 : 0.15;
    baseScale = narrow ? 0.42 : 0.68;
  }
  resize();
  window.addEventListener('resize', resize);

  /* ---- interaction ---- */
  const pointer = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
  let hoverTarget = 0;
  window.addEventListener('pointermove', (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    hoverTarget = 1;
    clearTimeout(pointer.t);
    pointer.t = setTimeout(() => (hoverTarget = 0), 600);
  }, { passive: true });

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }, { threshold: 0 }).observe(hero);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) loop(); });

  const clock = new THREE.Clock();
  let running = false;
  const lerp = (a, b, t) => a + (b - a) * t;

  function frame() {
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    uniforms.uTime.value = reduce ? 4 : t;

    smooth.x = lerp(smooth.x, pointer.x, 0.04);
    smooth.y = lerp(smooth.y, pointer.y, 0.04);
    uniforms.uHover.value = lerp(uniforms.uHover.value, hoverTarget, 0.03);

    // scroll progress through the hero: blob drifts up, grows, and gets wilder
    const prog = Math.min(Math.max(window.scrollY / hero.clientHeight, 0), 1);
    uniforms.uAmp.value = 0.32 + prog * 0.35;

    group.position.x = baseX + smooth.x * 0.35;
    group.position.y = baseY - smooth.y * 0.25 + prog * 1.4;
    group.scale.setScalar(baseScale * (1 + prog * 0.35));
    blob.rotation.y += dt * 0.12;
    blob.rotation.x = lerp(blob.rotation.x, smooth.y * 0.5, 0.05);
    blob.rotation.z = lerp(blob.rotation.z, -smooth.x * 0.4, 0.05);
    dust.rotation.y -= dt * 0.03;
    dust.rotation.x = smooth.y * 0.15;

    renderer.render(scene, camera);
  }

  function loop() {
    if (running) return;
    running = true;
    const tick = () => {
      if (!visible || document.hidden) { running = false; return; }
      frame();
      if (reduce) { running = false; return; } // one static frame only
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Wait one frame so the first render is ready before fading in
  requestAnimationFrame(() => { frame(); document.documentElement.classList.add('gl-ready'); loop(); });
}
