import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { BoxHelper } from 'three';

const Model = forwardRef((props, ref) => {
    const { scene } = useThree();
    const model = useLoader(props.loader, props.link);
    const [selectedObject, setSelectedObject] = useState(null);
    const [store, setStore] = useState([]);

    const meshRefs = useRef([]);
    const helperRefs = useRef(new Map());
    const recent = useRef(null);

    const handleHover = (e) => {
        setSelectedObject(e.object);
    };

    const handlePointerOut = () => {
        setSelectedObject(null);
    };

    useEffect(() => {
        const newHelpers = [];
        const meshArr = [];
        model.traverse((child) => {
            if (child.isMesh) {

                if(child.name === 'Group1'){
                        child.visible = false;
                }
                const helper = new BoxHelper(child, 0x000000, 2);
                helper.visible = false;
                helperRefs.current.set(child, helper);
                newHelpers.push(helper);
                meshArr.push(child);
                setStore((prevStore) => [
                    ...prevStore,
                    { id: child.uuid, clicked: false, visible: true },
                ]);
            }
        });
        meshRefs.current = meshArr;
        scene.add(...newHelpers);
        return () => {
            scene.remove(...newHelpers);
            helperRefs.current.clear();
        };
    }, [model, scene]);
    

    useEffect(() => {
        if (recent.current && recent.current.visible !== undefined) {
            if (!props.visibility) {
                recent.current.visible = false;
                
                setStore((prevStore) => prevStore.map((item) => 
                    item.id === recent.current.uuid ? { ...item, visible: false, clicked: true } : item
                ));
            } else {
                recent.current.visible = true;
                setStore((prevStore) => prevStore.map((item) => 
                    item.id === recent.current.uuid ? { ...item, visible: true, clicked: true } : item
                ));
            }
        }
    }, [props.visibility]);

    const handleClick = (e) => {
        recent.current = e.object;
        const meshId =  e.object.uuid;
        setStore((prevStore) =>
            prevStore.map((item) =>
                item.id === meshId ? { ...item, clicked: !item.clicked, visible: recent.current === meshId ? !item.visible : item.visible } : item
            )
        );
    };

    useEffect(() => {
        meshRefs.current.forEach((child) => {
            const helper = helperRefs.current.get(child);
            if (helper && child) {
                const storeItem = store.find((item) => item.id === child.uuid);
                if (storeItem) {
                    helper.material.color.set(storeItem.clicked ? "#ff0000" : "#000000");
                }
               if (!props.enabled) {
                    helper.visible = storeItem && (selectedObject === child || (storeItem.clicked && storeItem.id === child.uuid) || !storeItem.visible);
               }
               
            }
        });
    }, [selectedObject, store]);

    return (
        <primitive
            object={model}
            onPointerOver={handleHover}
            onPointerOut={handlePointerOut}
            onClick={(e) => handleClick(e)}
            rotation={props.rotation}
            position={props.modelPos}
            ref={ref}
            {...props}
        />
    );
});

export default Model;
