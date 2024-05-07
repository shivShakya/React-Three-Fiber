import React, { useRef, useState } from 'react';
import { useHelper, PivotControls } from '@react-three/drei';
import { PointLightHelper } from 'three'; 

function Lights(props) {
  const pointLight = useRef();
  const pivotControls = useRef();
  const group = useRef();

  useHelper(pointLight, PointLightHelper);
  const pivotPosition = [props.position[0], props.position[1], props.position[2]];

  return (
    <>
      {props.lightMode && (
        <group ref={group} position={props.position}>
          <PivotControls
            ref={pivotControls}
            position={[0, 0, 0]} 
            scale={10}
            onDragStart={() => props.setEnabled(false)}
            onDragEnd={() => props.setEnabled(true)}
          >
            <pointLight
              ref={pointLight}
              intensity={2000}
              position={[0, 0, 0]} 
              distance={2000} 
              decay={2} 
            />
            <mesh position={[0, 0, 0]}> 
              <sphereGeometry args={[6, 6, 6]} />
              <meshBasicMaterial visible={true} />
            </mesh>
          </PivotControls>
        </group>
      )}
    </>
  );
}

export default Lights;
