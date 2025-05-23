import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage } from '@react-three/drei';
import Model from './Model';
import UI from './UI';
import Controls from './Controls';
import { TDSLoader } from 'three/examples/jsm/loaders/TDSLoader';
import './Scene.css';
import Lights from './Lights';

function Panel(props) {
    const cameraRef = useRef();
    const modelRef = useRef();

    const [speed, setSpeed] = useState(7);
    const [visibility, setVisibility] = useState(true);

    return (
        <Canvas
            dpr={[1, 2]}
            shadows
            camera={{ position: props.initialPos, fov: 75, name: props.id }}
            style={{ height: '100%', width: '100%' }}
            ref={cameraRef}
        >
            <UI
                cameraId={props.id}
                visibility={visibility}
                enabled={props.enabled}
                initialPos={props.initialPos}
                setVisibility={setVisibility}
                setSpeed={setSpeed}
                modelPos={props.modelPos}
                speed={parseFloat(speed)}
                lightMode={props.lightMode}
                setLightMode={props.setLightMode}
                totalLights={props.totalLights}
                setTotalLights={props.setTotalLights}
            />
            <color attach="background" args={[props.color]} />
            <Stage environment={null}>
                <Model
                    ref={modelRef}
                    loader={TDSLoader}
                    visibility={visibility}
                    enabled={props.enabled}
                    link={props.modelPath}
                    rotation={props.rotation}
                    modelPos={props.modelPos}
                    lightMode={props.lightMode}
                />
            </Stage>
            <Controls speed={speed} height={props.height} enabled={props.enabled} />
            
            {Array.from({ length: props.totalLights }, (_, index) => (
                <Lights
                    key={index} 
                    lightType={ <spotLight
                        intensity={2000}
                        color={0xffffff} 
                        position={[0, 0, 0]} 
                        castShadow
                      />}
                    setEnabled={props.setEnabled}
                    lightMode={props.lightMode}
                    setLightMode={props.setLightMode}
                    position={[index*100, 40, 0]}
                />
            ))}
        </Canvas>
    );
}

export default Panel;
