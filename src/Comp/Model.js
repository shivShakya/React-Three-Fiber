import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { useLoader, useThree } from '@react-three/fiber';
import { BoxHelper, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, Raycaster, ArrowHelper } from 'three';

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

            const raycaster = new Raycaster();
            const coords = new Vector3(0, 200, 0);
            raycaster.set(model.position.clone().add(coords), new Vector3(0, -1, 0));
            var intersects = raycaster.intersectObject(model);
            console.log({ ['intersects' + props.link]: intersects });
    
                intersects.forEach((intersection) => {
                    const { object: mesh, face } = intersection;
                    if (face) {
                        mesh.visible = false;
                       
                    }
                });
    
                const arrowHelper = new ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 100, 0x00ff00);
                scene.add(arrowHelper);
    
                const boxGeometry = new BoxGeometry(10, 10, 10);
                const boxMaterial = new MeshBasicMaterial({ color: 0xffff00 });
                const boxMesh = new Mesh(boxGeometry, boxMaterial);
                boxMesh.position.copy(coords);
                scene.add(boxMesh);
    
       
        
        model.traverse((child) => {
            if (child.isMesh) {
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

    const handleClick = (e) => {
        recent.current = e.object;
        const meshId = e.object.uuid;
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
            }
        });
    }, [store]);

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
