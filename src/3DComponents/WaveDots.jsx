import React, {useRef, useMemo, useState, useEffect} from 'react';
import {Canvas, useFrame, useThree} from '@react-three/fiber';
import {OrbitControls, TransformControls} from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
// Vertex Shader
attribute float size;
varying vec3 vColor;
varying float vOpacity;

void main() {
    // Dalga yüksekliğine göre renk
    float yFactor = clamp((position.y + 0.2) / 0.4, 0.0, 1.0); // Y ~ -0.2..0.2 arası normalize
    vec3 deepBlue = vec3(0.0, 0.2, 0.8);
    vec3 cyan = vec3(0.0, 1.0, 1.0);
    vColor = mix(deepBlue, cyan, yFactor);

    // Opaklık sadece -Z yönüne göre
    float directionFactor = clamp(1.0 + position.z, 0.0, 1.0); // Z=-1 → 0, Z=1 → 1
    vOpacity = directionFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    // Boyut sabit
    gl_PointSize = size;
}



`;

const fragmentShader = `
// Fragment Shader
precision highp float;
varying vec3 vColor;
varying float vOpacity;

void main() {
    vec2 coord = gl_PointCoord * 2.0 - 1.0;
    float dist = length(coord);
    if (dist > 1.0) discard;

    float intensity = 1.0 - dist * dist;

    gl_FragColor = vec4(vColor * intensity, vOpacity * intensity);
}

`;

function WavePoints() {
    const pointsRef = useRef();
    const cols = 100;
    const rows = 100;
    const spacing = .25;

    // Merkez hesaplama
    const centerX = (cols * spacing) / 2 - spacing / 2;
    const centerZ = (rows * spacing) / 2 - spacing / 2;

    const positions = useMemo(() => {
        const arr = [];
        for (let x = 0; x < cols; x++) {
            for (let z = 0; z < rows; z++) {
                arr.push(
                    x * spacing - centerX,
                    0,
                    z * spacing - centerZ
                );
            }
        }
        return new Float32Array(arr);
    }, [cols, rows, spacing, centerX, centerZ]);

    const sizes = useMemo(() => {
        const arr = new Float32Array(positions.length / 3);
        for (let i = 0; i < arr.length; i++) arr[i] = 5.50; // sabit
        return arr;
    }, [positions]);

    useFrame(({clock}) => {


        const time = clock.getElapsedTime();
        const positionsAttr = pointsRef.current.geometry.attributes.position;
        const count = positionsAttr.count;

        for (let i = 0; i < count; i++) {
            const x = positionsAttr.getX(i);
            const z = positionsAttr.getZ(i);
            const distToCenter = Math.sqrt(x * x + z * z);

            // Dalga formülü (merkezden uzaklığa göre değişen)
            positionsAttr.setY(
                i,
                Math.sin(z * 0.5 + time * 1.2) * 0.1 +
                Math.cos(x * 0.8 + time * 1.2) * 0.1 +
                Math.sin((x + z) * .4 + time * 1.2) * 0.1 * (1.0 - distToCenter / 15.0)
            );
        }
        positionsAttr.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-size"
                    count={sizes.length}
                    array={sizes}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending} // Renkleri daha canlı yapar
            />
        </points>
    );
}

function CameraLogger() {
    const {camera} = useThree();
    const lastLogTime = useRef(0);

    useFrame(({clock}) => {
        const time = clock.getElapsedTime();
        if (time - lastLogTime.current > 1.0) { // Her 1 saniyede bir logla
            lastLogTime.current = time;
            console.log('Kamera pozisyonu:', {
                position: camera.position.toArray(),
                rotation: camera.rotation.toArray().map(rad => THREE.MathUtils.radToDeg(rad)),
                zoom: camera.zoom
            });
        }
    });

    return null;
}


function Axes() {
    const {scene} = useThree();
    const axesRef = useRef();

    React.useEffect(() => {
        const helper = new THREE.AxesHelper(2); // 2 birim uzunluk
        axesRef.current = helper;
        scene.add(helper);

        return () => {
            scene.remove(helper);
        };
    }, [scene]);

    return null;
}





export default function WaveDots() {
    return (
        <>
            <ambientLight intensity={0.5}/>
            <pointLight position={[2, 0, 15]} intensity={2} decay={0} color="white"/>
            <WavePoints/>
        </>
    );
}