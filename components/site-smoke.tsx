"use client";

import { useEffect, useRef } from "react";
import { scrollMood } from "@/lib/scroll-mood";

// Resolucao reduzida: a fumaca e suave, nao precisa de pixel cheio (e pesa bem menos).
const RENDER_SCALE = 0.5;
const SPEED = 0.45;

const VERTEX = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

// Ruido "torcido" sobre si mesmo (domain warping) gera as dobras de fumaca/seda.
// Sai so o verde com alpha, pra deixar o fundo e o brilho do site aparecerem por baixo.
const FRAGMENT = `precision mediump float;
uniform vec2 r;uniform float t;uniform float a;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,s=.5;for(int i=0;i<5;i++){v+=s*n(p);p*=2.02;s*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/r.y;
  vec2 q=vec2(fbm(uv*1.4+t*.05),fbm(uv*1.4+vec2(5.2,1.3)-t*.04));
  vec2 w=vec2(fbm(uv*1.4+3.*q+vec2(1.7,9.2)+t*.06),fbm(uv*1.4+3.*q+vec2(8.3,2.8)-t*.05));
  float f=fbm(uv*1.4+3.*w);
  float line=pow(1.-abs(f-.5)*2.,14.);
  float body=smoothstep(.35,.9,f)*.35;
  float vig=1.-.35*length(gl_FragCoord.xy/r-.5);
  float alpha=clamp((line*.4+body*.15)*a*vig,0.,1.);
  gl_FragColor=vec4(vec3(.063,.725,.506)*alpha,alpha);
}`;

// Fundo de fumaca verde em movimento lento. A intensidade segue o "clima" do
// scroll (ver lib/scroll-mood.ts).
export function SiteSmoke() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!canvas || !gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(program, "r");
    const uTime = gl.getUniformLocation(program, "t");
    const uAmount = gl.getUniformLocation(program, "a");

    const target = () => scrollMood().smoke;

    let amount = target();
    let time = 0;
    let frame = 0;
    let last = 0;

    const resize = () => {
      canvas.width = Math.round(window.innerWidth * RENDER_SCALE);
      canvas.height = Math.round(window.innerHeight * RENDER_SCALE);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const draw = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uAmount, amount);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    // ~30fps: o movimento e lento.
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      if (now - last < 33) return;
      time += (last ? now - last : 0) / 1000 * SPEED;
      last = now;
      amount += (target() - amount) * 0.1;
      draw();
    };

    const onResize = () => {
      resize();
      draw();
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      last = 0;
      if (!document.hidden) frame = requestAnimationFrame(loop);
    };

    onResize();
    window.addEventListener("resize", onResize);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("resize", onResize);
    }

    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 size-full" />;
}
