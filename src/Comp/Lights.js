import React, { useRef } from 'react';
import { PivotControls } from '@react-three/drei';

function Lights(props) {
  const pivotControls = useRef();
  const group = useRef();

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
           {props.lightType}
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
