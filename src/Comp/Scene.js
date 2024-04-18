import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PointerLockControls, Sky, Box } from '@react-three/drei';
import Model from './Model';
import Controls from './Controls';
import UI from './UI';
import Grid from './Grid';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import './Scene.css';

function Scene(props) {
  //references
  const controlsRef = useRef();
  const modelRef = useRef();

  const initialPos = new THREE.Vector3(0, 0, 180);
  const modelPos = new THREE.Vector3(0, 0, 0);
 
  const [speed , setSpeed] = useState(2);


  return (
    <>
     <UI ref={controlsRef} initialPos={initialPos} modelPos={modelPos} speed={speed} setSpeed={setSpeed} />
    <Canvas dpr={[1, 2]} camera={{ position: initialPos, fov: 75 }} style={{ position: 'absolute' }} onClick={() => controlsRef.current.lock()}>
      <PointerLockControls ref={controlsRef} />
      <color attach="background" args={['#000000']} />
     { /*<Sky sunPosition={[100, 20, 100]} />*/ }
     <Grid />
      <Stage environment={null}>
        <Model scale={0.01} ref={modelRef} loader={GLTFLoader} link={'/modern_home.glb'} />
      </Stage>
      <Controls ref={controlsRef} speed={speed} />

      <ambientLight intensity={1.5} />
    </Canvas>
    </>
  );
}

export default Scene;
