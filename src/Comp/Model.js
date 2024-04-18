import React, { forwardRef } from 'react';
import { useLoader } from '@react-three/fiber';

const Model = forwardRef((props, ref) => {
    const gltf = useLoader(props.loader, props.link);

    return <primitive object={gltf.scene} ref={ref} {...props} />;
});

export default Model;
