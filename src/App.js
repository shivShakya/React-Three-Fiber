import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, PointerLockControls, Sky } from '@react-three/drei';
import './App.css';

function Model(props) {
  const { scene } = useGLTF("/modern_home.glb");
  return <primitive object={scene} {...props} />;
}

function Controls({ controlsRef, moveState }) {
  useFrame(() => {
    const moveSpeed = 4;
    const { current: controls } = controlsRef;
    if (!controls || !controls.isLocked) return;

    if (moveState.forward) {
      controls.moveForward(moveSpeed);
    }
    if (moveState.backward) {
      controls.moveForward(-moveSpeed);
    }
    if (moveState.left) {
      controls.moveRight(-moveSpeed);
    }
    if (moveState.right) {
      controls.moveRight(moveSpeed);
    }
    if (moveState.up) {
      controls.getObject().position.y += moveSpeed * 0.4;
    }
    if (moveState.down) {
      controls.getObject().position.y -= moveSpeed * 0.4;
    }
  });

  return null;
}

function App() {
  const controlsRef = useRef();
  const modelRef = useRef();
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
    up: false,
    down: false
  });

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
      case 'q':
        setMoveState((prevState) => ({ ...prevState, up: true }));
        break;
      case 'e':
        setMoveState((prevState) => ({ ...prevState, down: true }));
        break;
      default:
        break;
    }
  };

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
      case 'q':
        setMoveState((prevState) => ({ ...prevState, up: false }));
        break;
      case 'e':
        setMoveState((prevState) => ({ ...prevState, down: false }));
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

  //Camera look At for snapping to specific postion or angle (Currently at model Position )
  useEffect(() => {
    const { current: model } = modelRef;
    const { current: controls } = controlsRef;
    if (model && controls) {
          controls.getObject().lookAt(model.position);
    }
  }, [modelRef.current]);

  return (
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
  );
}

export default App;
