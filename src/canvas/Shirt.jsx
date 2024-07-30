import React from 'react'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import { useFrame } from '@react-three/fiber'
import { Decal, useGLTF, useTexture } from '@react-three/drei'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { useEffect, useRef } from 'react';
import { MeshStandardMaterial } from 'three';

import state from '../store'; 

const Shirt = () => {
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('/newcap.glb');
    const textMeshRef = useRef();

    const logoTexture = useTexture(snap.logoDecal);
    const fullTexture = useTexture(snap.fullDecal);


    //Text Geometry

    useEffect(() => {
        const loader = new FontLoader();

        loader.load(snap.textFont.url, (font) => {
            const textGeometry = new TextGeometry(snap.logoText, {
                font: font,
                size: snap.sizeText, // Adjust the size as needed
                depth: 0.0005,
                curveSegments: 12,
                bevelEnabled: false,
                bevelThickness: 0.01,
                bevelSize: 0.005,
                bevelOffset: 0,
                bevelSegments: 1,
            });

            const textMaterial = new MeshStandardMaterial({ color: snap.textColor || 'white' });
            textMeshRef.current.geometry = textGeometry;
            textMeshRef.current.material = textMaterial;
        });
    }, [snap.textColor, snap.logoText, snap.isText, snap.sizeText, snap.textFont.url]);

    useFrame((state, delta) => easing.dampC(materials['Cap Fabric'].color, snap.color, 0.25, delta));
    const stateString = JSON.stringify(snap);
    return (
    <group
        
    >
        <mesh
        castShadow
        geometry={nodes.cap002.geometry}
        material={materials['Cap Fabric']}
        material-roughness={1.1}
        dispose={null}
        >
            {snap.isFullTexture && (
                <Decal 
                    position={[0.05, 0.125, 0.125]}
                    rotation={[0, 0, 0]}
                    scale={[0.3, 0.35, 0.3]}
                    map={fullTexture}
                    renderOrder={1}
                />
            )}
                {snap.isLogoTexture && (
                <Decal 
                    position={[0, 0.06 , 0.05]}
                    rotation={[0, 0, 0]}
                    scale={[0.06, 0.06, 0.06]}
                    map={logoTexture}
                    depthTest={false}
                    depthWrite={true}
                    renderOrder={2}
                />
            )}
            
        </mesh>
        {snap.isText && (
            <mesh 
            ref={textMeshRef} 
            position={[snap.positionTextX, snap.positionTextY, 0.075]} 
            />
        )}
    </group>
  )
}

export default Shirt

