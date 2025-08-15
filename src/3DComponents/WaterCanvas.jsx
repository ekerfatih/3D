import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import Drop from "./Drop.jsx";

// Ripple shader
const vertexShader = `
uniform float uTime;
varying float vHeight;
varying vec2 vUv;

float ripple(float time, float speed, float decay, float freq, float amplitude, float offset, vec2 uv) {
  if (time < 0.0) return 0.0;
  float dist = distance(uv, vec2(0.5));
  float ripplePos = speed * (time - offset);
  float diff = dist - ripplePos;
  if(diff >= 0.0 && diff < 0.1) {
    float attenuation = exp(-decay * (time - offset));
    return sin(freq * diff) * amplitude * attenuation;
  }
  return 0.0;
}

void main() {
  vUv = uv;
  float wave1 = ripple(uTime/5.0, 1.5, 15.5, 90.0, 0.50, 0.22, uv);
  float wave2 = ripple(uTime/5.0, 1.5, 15.5, 80.0, 0.25, 0.28, uv);
  float wave3 = ripple(uTime/5.0, 1.5, 15.5, 70.0, 0.10, 0.34, uv);
  float height = wave1 + wave2 + wave3;
  vec3 pos = position;
  pos.z += height;
  vHeight = height;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
varying float vHeight;
void main() {
  float h = clamp(vHeight * 5.0 + 0.5, 0.0, 1.0);
  float smoothH = pow(h, 0.2);
  float t = smoothstep(0.1, 0.9, smoothH);
  vec3 deepBlue = vec3(0.02, 0.04, 0.1);
  vec3 ripplePeak = vec3(0.6, 0.7, 0.85);
  vec3 color = mix(ripplePeak, deepBlue, t);
  gl_FragColor = vec4(color, 1.0);
}
`;

const uniforms = {uTime: {value: 0}};

const Plane = React.forwardRef(({meshRef}, materialRef) => (
    <mesh ref={meshRef} rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[30, 30, 1000, 1000]}/>
        <shaderMaterial
            ref={materialRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            side={THREE.DoubleSide}
        />
    </mesh>
));

function Ripple({trigger}) {
    const materialRef = useRef();
    const meshRef = useRef();
    const [startTime, setStartTime] = useState(null);
    const [rippleTime, setRippleTime] = useState(-1);

    useFrame(({clock}) => {
        if (trigger && startTime === null) {
            setStartTime(clock.getElapsedTime());
            setRippleTime(0);
        }
        if (startTime !== null) {
            const elapsed = clock.getElapsedTime() - startTime;
            setRippleTime(elapsed);
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = rippleTime;
        }
    });

    return <Plane ref={materialRef} meshRef={meshRef}/>;
}

export default function WaterCanvas({onLoad, rippleActive = true, dropActive = true}) {
    useEffect(() => {
        onLoad?.();
    }, [onLoad]);

    return (
        <div style={{height: "100vh", width: "100vw"}}>
            <Canvas camera={{position: [0, 2, 15], fov: 55}}>
                <OrbitControls/>
                <directionalLight intensity={55} color="white"/>
                {dropActive && <Drop active={true}/>} {/* HER ZAMAN true gönder */}
                {rippleActive && <Ripple trigger={true}/>} {/* Ripple da aynı şekilde */}
            </Canvas>
        </div>
    );
}
