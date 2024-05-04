import React, { useRef, useState } from 'react';
import Panel from './Panel';

import * as THREE from 'three';
import './Scene.css';

function Scene(props) {

  return (
    <div style={{ display: 'flex' , flexDirection : 'column', width: '100%', height: '100vh' }}> 
               <Panel id={2} color={'gray'} enabled={true} height={-20} modelPath={'/model1.3ds'} initialPos={[0,0,500]} modelPos={[0,0,0]} rotation={[Math.PI / 2, 0, 0]}/>    
               <Panel id={1}  color={'green'} enabled={false} height={500}  modelPath={'/model2.3ds'} initialPos={[0,200,0]} modelPos={[0,-500,0]} rotation={[Math.PI / 2, 0, 0]}/>
    </div> 
  );
}

export default Scene;
