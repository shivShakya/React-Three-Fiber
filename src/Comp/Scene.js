import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import Model from './Model';
import UI from './UI';
import Controls from './Controls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import './Scene.css';

function Scene(props) {
  const cameraRef = useRef();
  const modelRef = useRef();
  const [speed, setSpeed] = useState(0.4);
  const [height , setHeight] = useState(1);
  const [visibility , setVisibility] = useState(true);

  const initialPos = new THREE.Vector3(0, 0, 30);
  const modelPos = new THREE.Vector3(0, 0, 0);
  return (
    <div>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: initialPos , fov: 75 }}
        style={{ position: 'absolute' }}
        ref={cameraRef}
      >
       <UI initialPos={initialPos} modelPos={modelPos} speed={speed} setSpeed={setSpeed} visibility={visibility} setVisibility={setVisibility}/>
        <color attach="background" args={['skyblue']} />
        <Stage environment={null}>
          <Model ref={modelRef} loader={GLTFLoader} visibility={visibility} link={'/home.glb'} />
        </Stage>
        <Controls speed={speed} height={height}/>
        <ambientLight intensity={1.5} />
      </Canvas>
    </div>
  );
}

export default Scene;
