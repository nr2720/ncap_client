import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);

    useFrame((state, delta) => {
    const isBreakPoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;
    const isMD = window.innerWidth <= 700 && window.innerWidth > 600;
    const isLG = window.innerWidth > 700 && window.innerWidth <= 900;
    const isXL = window.innerWidth > 900 && window.innerWidth <= 1050;


  
   


    //set the initial position of the model
    let targetPosition = [-0.125, 0, 1.5];

    if(snap.intro) {
        if(isBreakPoint) {
            targetPosition = [0, 0, 2];
            
        }
        if(isMobile) {
            targetPosition = [0, 0.025, 2.5];
        }
    }
    else if (snap.customizer) {
        if(isMobile) {
            targetPosition = [0, 0, 2.5];
        }
        else {
            targetPosition = [0, 0, 1.5]
        }
    }

    else if (snap.checkout) {
        if (isMobile) {
            targetPosition = [0, 0, 2.5]
        }
        else if(isMD) {
            targetPosition = [0.18, 0, 2]
        }
        else if(isLG) {
            targetPosition = [0.23, 0, 2]
        }
        else if(isXL) {
            targetPosition = [0.3, 0, 2]
        }
        else {
            targetPosition = [0.2, 0, 2]
        }
    }

    //set modal camera position
    easing.damp3(
        state.camera.position, 
        targetPosition, 
        0.25, 
        delta
    )
    //modal rotation
    easing.dampE(
        group.current.rotation,
        [state.pointer.y / 10, -state.pointer.x / 5, 0],
        0.25,
        delta
    )

    })

  return (
    <group ref={group}>
        {children}
    </group>
  )
}

export default CameraRig