import React from "react";
import { Html } from "@react-three/drei";
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const UI = React.memo((props) => {
    const { camera } = useThree();

    const resetCamera = () => {
        camera.position.copy(props.initialPos);
        camera.lookAt(props.modelPos);
    };

    const handleVisibilityChange = (e) => {
        const visibility = e.target.checked;
        props.setVisibility(visibility); 
    
    };

    return (
        <Html className='ui' position={new THREE.Vector3(0,0,0)}>
            <div className="border range" style={{ fontSize: '15px' }}><input type="range" style={{ accentColor: 'blueviolet' }} min={0} max={50} value={props.speed} step={0.1} onChange={(e) => props.setSpeed(e.target.value)} /> {props.speed}  </div>
            <div className="border reset"><input type="checkbox"  placeholder="visibility" checked={props.visibility} onChange={handleVisibilityChange} /> visible</div>
            <div onClick={resetCamera} className="border reset">Reset</div>
        </Html>
    );
});

export default UI;
