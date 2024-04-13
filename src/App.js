import React from "react";
import Scene from "./Comp/Scene";
import * as THREE from 'three';

function App(){
  const initialPos = new THREE.Vector3(0, 0, 180);
  const modelPos = new THREE.Vector3(0, 0, 0);
    
  return(
    <div className="app">
      <Scene initialPos={initialPos} modelPos={modelPos} />
    </div>
  );
}

export default App;
