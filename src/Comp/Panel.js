import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import Model from './Model';
import UI from './UI';
import Controls from './Controls';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import './Scene.css';
import Lights from './Lights';


function Panel(props){
    const cameraRef = useRef();
    const modelRef = useRef();

    const [speed, setSpeed] = useState(7);
    const [visibility, setVisibility] = useState(true);
    return (
               <Canvas
                    dpr={[1, 2]}
                    camera={{ position: props.initialPos, fov: 75 , name : props.id }}
                    style={{  height: '100%', width : '100%' }}
                    ref={cameraRef}
               >
                    <Lights  setEnabled={props.setEnabled} lightMode={props.lightMode} setLightMode={props.setLightMode} position={[0,40,0]}/>
                    <Lights  setEnabled={props.setEnabled} lightMode={props.lightMode} setLightMode={props.setLightMode} position={[50,60,100]}/>
                    <Lights  setEnabled={props.setEnabled} lightMode={props.lightMode} setLightMode={props.setLightMode} position={[100,20,200]}/>
                    <Lights  setEnabled={props.setEnabled} lightMode={props.lightMode} setLightMode={props.setLightMode} position={[40,0,300]}/>
                  <UI cameraId={props.id} visibility={visibility} enabled={props.enabled} initialPos={props.initialPos} setVisibility={setVisibility} setSpeed={setSpeed} modelPos={props.modelPos} speed={parseFloat(speed)} lightMode={props.lightMode} setLightMode={props.setLightMode}/>
                  <color attach="background" args={[props.color]} />
                  <Stage environment={null}>
                      <Model
                         ref={modelRef}
                         loader={TDSLoader}
                         visibility={visibility}
                         enabled = {props.enabled}
                         link={props.modelPath}
                         rotation={props.rotation}
                         modelPos={props.modelPos}
                         lightMode={props.lightMode} 
                     />
                 </Stage>
               <Controls speed={speed} height={props.height} enabled={props.enabled} />
                </Canvas>
    )
}

export default Panel;

