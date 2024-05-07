import React, { useState } from 'react';
import Panel from './Panel';
import './Scene.css';

function Scene(props) {
   
  const [enabled , setEnabled] = useState(true);
  const [lightMode , setLightMode] = useState(true);
  return (
    <div className="scene-container" style={{ width: '100%', height: '100vh' }}>
        <Panel id={2} color={'black'} enabled={enabled} setEnabled={setEnabled} lightMode={lightMode} setLightMode={setLightMode} height={0} modelPath={'/model3.3ds'} initialPos={[0,0,500]} modelPos={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}/>    
      {
             // <Panel id={1} color={'yellow'} enabled={false} height={600} modelPath={'/model4.3ds'} initialPos={[0,200,0]} modelPos={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}/>
             // <Panel id={2} color={'gray'} enabled={true} height={-20} modelPath={'/model2.3ds'} initialPos={[0,0,500]} modelPos={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}/>    
             // <Panel id={1} color={'green'} enabled={false} height={600} modelPath={'/model1.3ds'} initialPos={[0,200,0]} modelPos={[0,0,0]} rotation={[-Math.PI / 2, 0, 0]}/>
      }
    </div>
  );
}

export default Scene;

