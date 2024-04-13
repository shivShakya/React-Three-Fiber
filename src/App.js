import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame , useLoader } from '@react-three/fiber';
import { useGLTF, Stage, PointerLockControls, Sky } from '@react-three/drei';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import * as THREE from 'three';
import './App.css';

//GLB model load
function Model(props) {
  //const scene  = useLoader(TDSLoader ,"modern_home.glb");
  const {scene} = useGLTF("/modern_home.glb");
  return <primitive object={scene} {...props} />;
}


//WASD controls
function Controls({ controlsRef, moveState }) {
  useFrame(() => {
    const moveSpeed = 2;
    const { current: controls } = controlsRef;
    if (!controls || !controls.isLocked) return;

    const cameraDirection = new THREE.Vector3();
    controls.getObject().getWorldDirection(cameraDirection);

    if (moveState.forward) {
      cameraDirection.multiplyScalar(moveSpeed);
      controls.getObject().position.add(cameraDirection);
    }
    if (moveState.backward) {
      cameraDirection.multiplyScalar(-moveSpeed);
      controls.getObject().position.add(cameraDirection);
    }
    if (moveState.left) {
        controls.moveRight(-moveSpeed);
    }
    if (moveState.right) {
        controls.moveRight(moveSpeed);
    }

  });

  return null;
}


function App() {
  //references
  const controlsRef = useRef();
  const modelRef = useRef();

  //wasd states
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  // wasd func keydown
  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'w':
        setMoveState((prevState) => ({ ...prevState, forward: true }));
        break;
      case 's':
        setMoveState((prevState) => ({ ...prevState, backward: true }));
        break;
      case 'a':
        setMoveState((prevState) => ({ ...prevState, left: true }));
        break;
      case 'd':
        setMoveState((prevState) => ({ ...prevState, right: true }));
        break;
      default:
        break;
    }
  };
 // wasd func keyup
  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'w':
        setMoveState((prevState) => ({ ...prevState, forward: false }));
        break;
      case 's':
        setMoveState((prevState) => ({ ...prevState, backward: false }));
        break;
      case 'a':
        setMoveState((prevState) => ({ ...prevState, left: false }));
        break;
      case 'd':
        setMoveState((prevState) => ({ ...prevState, right: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

 

  const resetCamera = () => {
    const { current: controls } = controlsRef;
    if (controls && !controlsRef.current.lock()) {
      controls.getObject().position.set(0, 0, 180); 
      controls.getObject().lookAt(0,0,0);
    }
  };
 

  return (
    <>
     <div className='reset' onClick={resetCamera}>Reset</div>
    <Canvas dpr={[1, 2]} camera={{ fov: 75 }} style={{ position: 'absolute' }} onClick={() => controlsRef.current.lock()}>
      <PointerLockControls ref={controlsRef} />
      <color attach="background" args={['#0000FF']} />
      <Sky sunPosition={[100, 20, 100]} />
      <Stage environment={null}>
        <Model scale={0.01} ref={modelRef} />
      </Stage>
      <ambientLight intensity={1.5} />
      <Controls controlsRef={controlsRef} moveState={moveState} />
    </Canvas>
    </>
  );
}

export default App;
