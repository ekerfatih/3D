import React, {useRef, useState} from "react";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform float uDeform; // 0 = durdu, 1 = hız yüksek
  varying vec2 vUv;

  void main() {
    vUv = uv;

    float yPos = position.y;

    // Damla formu için ölçekleme (üst ince, alt yuvarlak)
    float baseScale = 1.0 - smoothstep(0.0, 1.0, yPos * 0.5 + 0.5) * 0.3;

    // Blob dalgalanması uDeform'a göre değişiyor
    float wave = sin(uTime * 5.0 + position.y * 10.0) * 0.05 * uDeform;

    vec3 newPosition = position;

    // XZ ölçeklendirme hem baseScale hem deform ile
    newPosition.x *= baseScale + wave;
    newPosition.z *= baseScale + wave;

    // Alt kısmı şişir, deformla orantılı
    if (yPos < 0.0) {
      newPosition.xz *= 1.1 + sin(uTime + position.y * 4.0) * 0.05 * uDeform;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;

  void main() {
    vec3 color = vec3(0.3, 0.6, 0.8); // açık mavi tonları
    float alpha = 0.7;                 // biraz şeffaf
    gl_FragColor = vec4(color, alpha);
}
`;

const Drop = ({active}) => {
    const ref = useRef(null);
    const materialRef = useRef(null);


    const velocity = useRef(0);
    const acceleration = -0.002; // negatif yöne ivme (yerçekimi gibi)

    useFrame(({clock}) => {
        if (!ref.current || !materialRef.current) return;

        // Eğer damla yere değmediyse
        if (ref.current.position.y > -50 && active) {
            velocity.current += acceleration;
            ref.current.position.y += velocity.current;

            if (ref.current.position.y <= -50) {
                ref.current.position.y = -50;
                velocity.current = 0;
            }
        }

        // uDeform uniform'unu hızın büyüklüğüne göre güncelle (0-1 arası normalize et)
        let deform = Math.min(Math.abs(velocity.current) * 500, 1.0);
        materialRef.current.uniforms.uDeform.value = deform;

        // zaman uniformu
        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    });

    return (
        <mesh position={[0, 10, 0]} ref={ref}>
            <sphereGeometry args={[0.5, 64, 64]}/>
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: {value: 0},
                    uDeform: {value: 0},
                }}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default Drop;
