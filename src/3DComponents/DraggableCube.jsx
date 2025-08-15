import React, {useRef, useState, useEffect, useMemo} from "react";
import {useFrame, useThree, useLoader} from "@react-three/fiber";
import * as THREE from "three";

export default function DraggableCube({height}) {
    const ref = useRef();
    const edgesRef = useRef(); // kenar çizgileri için
    const timeRef = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const lastPosRef = useRef([0, 0]);
    const {camera} = useThree();

    // --- Textures ---
    const allTextures = useLoader(THREE.TextureLoader, [
        "/textures/java.png",
        "/textures/spring.png",
        "/textures/react.png",
        "/textures/postgresql.png",
        "/textures/node.png",
        "/textures/tailwind.png",
        "/textures/docker.png",
        "/textures/ai.png",
        "/textures/csharp.png",
        "/textures/typescript.png",
        "/textures/git.png",
        "/textures/cypress.png",
        "/textures/jwt.png",
        "/textures/mssql.png",
        "/textures/next.png",
        "/textures/postman.png",
        "/textures/dotnet.png",
    ]);

    const [faceTextures, setFaceTextures] = useState(allTextures.slice(0, 6));
    const textureQueue = useRef([...allTextures.slice(6), ...allTextures.slice(0, 6)]);
    const wasVisibleRef = useRef(Array(6).fill(false));

    // Drag
    const onMouseDown = (e) => {
        setIsDragging(true);
        lastPosRef.current = [e.clientX, e.clientY];
    };
    const onMouseUp = () => setIsDragging(false);
    const onMouseMove = (e) => {
        if (!isDragging) return;
        const [lx, ly] = lastPosRef.current;
        const dx = e.clientX - lx;
        const dy = e.clientY - ly;

        if (ref.current) {
            ref.current.rotation.y += dx * 0.01;
            ref.current.rotation.x += dy * 0.01;
        }
        lastPosRef.current = [e.clientX, e.clientY];
    };
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };
    }, [isDragging]);

    // Face normals
    const faceNormals = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, 1),  // front
        new THREE.Vector3(0, 0, -1), // back
    ];

    function pullNextTexture(currentTextures, skipIndex) {
        const used = new Set(currentTextures.filter((_, i) => i !== skipIndex));
        for (let i = 0; i < textureQueue.current.length; i++) {
            const tex = textureQueue.current.shift();
            textureQueue.current.push(tex);
            if (!used.has(tex)) return tex;
        }
        return textureQueue.current[0];
    }

    useFrame((_, delta) => {
        if (!ref.current) return;

        if (!isDragging) {
            timeRef.current += delta;
            ref.current.position.y = height + Math.sin(timeRef.current * 2) * 0.1;
            ref.current.rotation.y += 0.0012;
        }

        const cubePos = new THREE.Vector3();
        ref.current.getWorldPosition(cubePos);
        const camDir = new THREE.Vector3().subVectors(camera.position, cubePos).normalize();

        const newTextures = [...faceTextures];
        let changed = false;

        faceNormals.forEach((normal, i) => {
            const worldNormal = normal.clone().applyQuaternion(ref.current.quaternion);
            const dot = worldNormal.dot(camDir);
            const isVisibleNow = dot > 0;

            if (wasVisibleRef.current[i] && !isVisibleNow) {
                const nextTex = pullNextTexture(newTextures, i);
                newTextures[i] = nextTex;
                changed = true;
            }
            wasVisibleRef.current[i] = isVisibleNow;
        });

        if (changed) {
            setFaceTextures(newTextures);
        }
    });

    const materials = useMemo(
        () => faceTextures.map((tex) => new THREE.MeshStandardMaterial({map: tex})),
        [faceTextures]
    );

    useEffect(() => {
        if (ref.current && !edgesRef.current) {
            const edges = new THREE.EdgesGeometry(ref.current.geometry);
            const line = new THREE.LineSegments(
                edges,
                new THREE.LineBasicMaterial({ color: "black", linewidth: 2 })
            );
            ref.current.add(line);
            edgesRef.current = line;
        }
    }, []);

    return (
        <mesh position={[6, 0, 0]} ref={ref} material={materials} onPointerDown={onMouseDown}>
            <boxGeometry args={[2, 2, 2]}/>
        </mesh>
    );
}
