import React, { forwardRef, useState, useRef, useMemo, useEffect } from 'react';
import { useLoader } from '@react-three/fiber';
import { BoxHelper } from 'three';

const Model = forwardRef((props, ref) => {
    const  gltf = useLoader(props.loader, props.link);
    console.log({gltf});
    const [hoveredObject, setHoveredObject] = useState(null);
    const [selectedObjects, setSelectedObjects] = useState(new Set());
    const [store, setStore] = useState([]);
    const [recent, setRecent] = useState(null);
    const meshRefs = useRef([]);

    const handleHover = (e) => {
        setHoveredObject(e.object);
    };

    const handlePointerOut = () => {
        setHoveredObject(null);
    };

    const handleClick = () => {
        if (hoveredObject) {
            const newSelection = new Set(selectedObjects);
            if (newSelection.has(hoveredObject) && props.visibility && hoveredObject.material.opacity !== 0) {
                newSelection.delete(hoveredObject);
                hoveredObject.userData.helper.material.color.set(0xffff00);
                setStore((prevStore) => prevStore.map((item) => 
                    item.id === hoveredObject.uuid ? { ...item, visible: true, clicked: false } : item
                ));
            } else {
                newSelection.add(hoveredObject);
                hoveredObject.userData.helper.material.color.set('#00ffff');
                setStore((prevStore) => prevStore.map((item) => 
                    item.id === hoveredObject.uuid ? { ...item, visible: true, clicked: true } : item
                ));
            }
            setRecent(hoveredObject);
            setSelectedObjects(newSelection);
        }
    };

    useEffect(() => {
        if (recent) {
            if (!props.visibility) {
                recent.material.opacity = 0;
                recent.material.transparent = true;
                setStore((prevStore) => prevStore.map((item) => 
                    item.id === recent.uuid ? { ...item, visible: false, clicked: true } : item
                ));
            } else {
                recent.material.opacity = 1;
                recent.material.transparent = false;
                setStore((prevStore) => prevStore.map((item) => 
                    item.id === recent.uuid ? { ...item, visible: true, clicked: true } : item
                ));
            }
        }
    }, [recent , props.visibility]);

    useMemo(() => {
        const helpersArray = [];
        gltf.traverse((child) => {
            if (child.isMesh) {
                const helper = new BoxHelper(child, 0xffff00);
                child.userData.helper = helper;
                helpersArray.push({ id: child.uuid, visible: true, clicked: false });
            }
        });
        setStore(helpersArray);
        meshRefs.current = helpersArray;
    }, [gltf]);

    return (
        <>
            <primitive
                object={gltf}
                onPointerOver={handleHover}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
                ref={ref}
                {...props}
            />
            {meshRefs.current.map(({ id, visible, clicked }) => (
                      ((hoveredObject && hoveredObject.uuid === id) || selectedObjects.has(id)) && (
                              <primitive key={id} object={gltf.getObjectByProperty('uuid', id).userData.helper} />
              )
            ))}

        </>
    );
});

export default Model;
