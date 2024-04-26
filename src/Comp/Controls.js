import React, { useState, useEffect, useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

const Controls = (props ,ref) => {
  const { camera } = useThree();

  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  const controlsRef = useRef(false);

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
  const handleMouseMove = (event) => {
    if (controlsRef.current && camera) {
      const rotateSpeed = 0.002;
      const { movementX, movementY } = event;
      const deltaYaw = -movementX * rotateSpeed;
     // const deltaPitch = -movementY * rotateSpeed;
      camera.rotation.y += deltaYaw;
    }
  };

  useEffect(() => {
    const handlePointerDown = () => {
      controlsRef.current = true;
    };
    const handlePointerUp = () => {
      controlsRef.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);
     window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  useFrame(() => {
    const moveSpeed = props.speed;
  
    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);
    cameraDirection.normalize();
  
    const cameraUp = new THREE.Vector3(0, 1, 0);
    const cameraRight = new THREE.Vector3();
    cameraRight.crossVectors(cameraDirection, cameraUp);
    cameraRight.normalize();
  
    const originalY = props.height;
  
    if (moveState.forward) {
      cameraDirection.multiplyScalar(moveSpeed);
      camera.position.add(cameraDirection);
    }
    if (moveState.backward) {
      cameraDirection.multiplyScalar(-moveSpeed);
      camera.position.add(cameraDirection);
    }
    if (moveState.left) {
      camera.position.addScaledVector(cameraRight, -moveSpeed);
    }
    if (moveState.right) {
      camera.position.addScaledVector(cameraRight, moveSpeed);
    }
  
    camera.position.y = originalY;
  });
  

  return null;
};

export default Controls;
