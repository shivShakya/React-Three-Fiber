import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import Model from './Model';
import UI from './UI';
import Controls from './Controls';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import * as THREE from 'three';
import './Scene.css';


function Panel(props){
    const cameraRef = useRef();
    const modelRef = useRef();

    const [speed, setSpeed] = useState(5);
    const [visibility, setVisibility] = useState(true);
    return (
               <Canvas
                    dpr={[1, 2]}
                    camera={{ position: props.initialPos, fov: 75 , name : props.id }}
                    style={{  height: '100%', width : '50%' }}
                    ref={cameraRef}
               >
                  <UI cameraId={props.id} visibility={visibility} enabled={props.enabled} initialPos={props.initialPos} setVisibility={setVisibility} setSpeed={setSpeed} modelPos={[0,0,0]} speed={parseFloat(speed)}/>
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
                     />
                 </Stage>
               <Controls speed={speed} height={props.height} enabled={props.enabled} />
                <ambientLight intensity={1.5} />
                </Canvas>
    )
}

export default Panel;

