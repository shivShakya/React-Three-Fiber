import React, { useState, useEffect, forwardRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const Controls = forwardRef((props, ref) => {
  const [moveState, setMoveState] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const moveSpeed = props.speed;
    const controls = ref.current;

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
});

export default Controls;
