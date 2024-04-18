import React from 'react';
import * as THREE from 'three';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

const Grid = () => {
    const gridObject = new THREE.LineSegments(
		new BoxLineGeometry(6, 6, 6, 20, 20, 20).translate(0, 2.9, 0),
		new THREE.LineBasicMaterial({ color: 0x808080 })
	);
    gridObject.scale.set(1000, 1000, 1000);
  return (
      <primitive object={gridObject} />
  );
};

export default Grid;
