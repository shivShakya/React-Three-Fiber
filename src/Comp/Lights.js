import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useHelper, PivotControls } from '@react-three/drei';
import { PointLightHelper, Mesh } from 'three'; 

function Lights(props) {
  const [showPivot, setShowPivot] = useState(false);
  const pointLight = useRef();
  const pivotMesh = useRef();
  const pivotControls = useRef();

 const helper =  useHelper(pointLight, PointLightHelper);
 console.log({helper});

  const togglePivot = () => {
    setShowPivot(prevState => !prevState); 
  };

  const handleClick = (event) => {
    event.stopPropagation();
    togglePivot();
  };


  return (
    <>
      {props.lightMode && showPivot && (
        <PivotControls
          ref={pivotControls}
          position={[0, 0, 0]}
          scale={10}
          onClick={() => togglePivot()}
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
        </PivotControls>
      )}

      <mesh
        ref={pivotMesh}
        onClick={handleClick}
      >
        <sphereGeometry args={[6, 6, 6]} />
        <meshBasicMaterial visible={true} />
      </mesh>
    </>
  );
}

export default Lights;

