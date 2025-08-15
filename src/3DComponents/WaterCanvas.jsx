import React, {useEffect, useRef, useState} from "react";
import {Canvas, useFrame} from "@react-three/fiber";
import * as THREE from "three";
import {OrbitControls} from "@react-three/drei";
import Drop from "./Drop.jsx";

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
                       //speed  decay freq amplitude offset
float wave1 = ripple(uTime/5.0, 1.5, 15.5, 90.0, 0.50, 0.22, uv);
float wave2 = ripple(uTime/5.0, 1.5, 15.5, 80.0, 0.25, 0.28, uv);
float wave3 = ripple(uTime/5.0, 1.5, 15.5, 70.0, 0.10, 0.34, uv);

float height = wave1 + wave2 + wave3 ;


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
        
        // Geçişi daha yumuşak yapmak için h'yı biraz eğiyoruz
        float smoothH = pow(h, 0.2);
    
        // Smoothstep aralığını genişlettik
        float t = smoothstep(0.1, 0.9, smoothH);
    
        vec3 deepBlue = vec3(0.02, 0.04, 0.1);
        vec3 ripplePeak = vec3(0.6, 0.7, 0.85);
    
        vec3 color = mix(ripplePeak, deepBlue, t);
    
        gl_FragColor = vec4(color, 1.0);
    }
`;

const uniforms = {
    uTime: {value: 0},
};

const Plane = React.forwardRef((props, ref) => (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1, 0]}>
        <planeGeometry args={[30, 30, 1000, 1000]}/>
        <shaderMaterial
            ref={ref}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms} // burası hep aynı obje
            side={THREE.DoubleSide}
        />
    </mesh>
));

function Ripple({active}) {
    const materialRef = useRef();
    const [startTime, setStartTime] = useState(null);
    const [rippleTime, setRippleTime] = useState(-1);

    useFrame(({clock}) => {
        if (active && startTime === null) {
            setStartTime(clock.getElapsedTime());
            setRippleTime(0);
        }
        if (startTime !== null) {
            const elapsed = clock.getElapsedTime() - startTime;
            if (elapsed > 22) {
                setStartTime(null);
                setRippleTime(-1);
            } else {
                setRippleTime(elapsed);
            }
        }
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = rippleTime;
        }
    });

    return <Plane ref={materialRef}/>;
}

export default function WaterCanvas({onLoad}) {
    const [active, setActive] = useState(false);
    const [start, setStart] = useState(false);
    const handleClick = () => {
        console.log("Button clicked");
        setActive(true);
        setStart(true);
        setTimeout(() => setActive(false), 100);
    };
    useEffect(() => {
        if (onLoad) onLoad();
        handleClick();
    }, [onLoad]);

    return (
        <>
            {/*<button*/}
            {/*    onClick={handleClick}*/}
            {/*    style={{*/}
            {/*        position: "absolute",*/}
            {/*        top: '50%',*/}
            {/*        left: '50%',*/}
            {/*        transform: "translate(-50%, -50%)",*/}
            {/*        zIndex: 999,*/}
            {/*        padding: "8px 16px",*/}
            {/*        color: "white",*/}
            {/*        cursor: "pointer",*/}
            {/*    }}*/}
            {/*    className={"animate-pulse"}*/}
            {/*>*/}
            {/*    Press Here To Continue*/}
            {/*</button>*/}
            <div style={{height: "100vh", width: "100vw"}}>
                <Canvas camera={{position: [0, 2, 15], fov: 55}}>
                    <OrbitControls/>
                    <directionalLight intensity={55} color="white"/>
                    <Drop active={start}/>
                    <Ripple active={active}/>
                </Canvas>
            </div>
        </>
    );
}
