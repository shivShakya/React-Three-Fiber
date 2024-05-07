import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { useLoader, useThree  , useFrame} from '@react-three/fiber';
import { Vector3, BoxGeometry, Mesh, Raycaster, BoxHelper, ArrowHelper, SphereGeometry, MeshBasicMaterial, LineBasicMaterial, BufferGeometry, Line } from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import * as TWEEN from '@tweenjs/tween.js';


const Model = forwardRef((props, ref) => {
  const { scene, camera } = useThree();
  const model = useLoader(props.loader, props.link);
  const [store, setStore] = useState([]);
  const [clickCounter, setClickCounter] = useState(0);
  const fontLoader = new FontLoader();

  const meshRefs = useRef([]);
  const helperRefs = useRef(new Map());
  const recent = useRef(null);

  useFrame(()=>{
      TWEEN.update();
  })

  useEffect(() => {
    const newHelpers = [];

    if (model && model.position) {
      const raycaster = new Raycaster();
      raycaster.camera = camera;
      const coords = new Vector3(0, 200, 0);
      raycaster.set(model.position.clone().add(coords), new Vector3(0, -1, 0));
      const intersects = raycaster.intersectObject(model);

      intersects.forEach((intersection) => {
        const { object: mesh, face } = intersection;
        if (face) {
          mesh.visible = false;
        }
      });

      model.traverse((child) => {
        if (child.isMesh) {
          const helper = new BoxHelper(child, 0x000000, 2);
          helper.visible = false;
          helperRefs.current.set(child, helper);
          newHelpers.push(helper);
          meshRefs.current.push(child);
          setStore((prevStore) => [
            ...prevStore,
            { id: child.uuid, clicked: false, visible: true },
          ]);
          TWEEN.update();
        }
      });
    }

    scene.add(...newHelpers);
    return () => {
      scene.remove(...newHelpers);
      helperRefs.current.clear();
    };
  }, [model, scene, camera]);


  const handleClick = (e) => {
    if (e.shiftKey) {
      const objectsToRemove = [];
      setClickCounter((prevCounter) => prevCounter + 1);

      if (clickCounter % 2 === 0) {
        scene.remove(scene.getObjectByName('currentSphere'));
        scene.remove(scene.getObjectByName('line'));
        scene.remove(scene.getObjectByName('distanceText'));
        scene.remove(scene.getObjectByName('prevSphere'));
      }

      scene.children.forEach((child) => {
        if (child.isMesh && child.name !== 'currentSphere' && child.name !== 'prevSphere') {
          objectsToRemove.push(child);
        }
        if (child.isLine && child.name === 'line') {
          objectsToRemove.push(child);
        }
        if (child.isMesh && child.name === 'distanceText') {
          objectsToRemove.push(child);
        }
      });
      objectsToRemove.forEach((obj) => scene.remove(obj));

      const intersection = e.point;
      const sphereGeometry = new SphereGeometry(5, 32, 32);
      const sphereMaterial = new MeshBasicMaterial({ color: 0xff0000 });
      const sphereMesh = new Mesh(sphereGeometry, sphereMaterial);
      sphereMesh.position.copy(intersection);
      sphereMesh.name = 'currentSphere';
      scene.add(sphereMesh);

      const prevSphere = scene.getObjectByName('prevSphere');
      if (prevSphere) {
        const geometry = new BufferGeometry().setFromPoints([prevSphere.position, intersection]);
        const material = new LineBasicMaterial({ color: 0x0000ff });
        const line = new Line(geometry, material);
        line.name = 'line';
        scene.add(line);

        const distance = prevSphere.position.distanceTo(intersection);
        console.log('Distance between points:', distance);

        fontLoader.load('roboto.json', function (font) {
          const textGeometry = new TextGeometry(`Distance: ${distance.toFixed(2)}`, {
            font: font,
            size: 3,
            depth: 0.2,
          });
          const textMaterial = new MeshBasicMaterial({ color: 0xffffff });
          const textMesh = new Mesh(textGeometry, textMaterial);

          const midpoint = prevSphere.position.clone().add(intersection).multiplyScalar(0.5);
          textMesh.position.copy(midpoint);
          textMesh.lookAt(camera.position);

          scene.add(textMesh);
          textMesh.name = 'distanceText';
        });
      }

      if (prevSphere) {
        prevSphere.name = '';
      }
      sphereMesh.name = 'prevSphere';

    }  {
      
    
     if(!props.lightMode){
      const currentPosition = camera.position.clone();
      const offset = 20;
     const targetPosition = {
         x: e.point.x + offset,
         y: e.point.y + offset,
         z: e.point.z + offset
     };

    new TWEEN.Tween(currentPosition)
    .to(targetPosition, 1000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate((position) => {
        camera.position.set(position.x, position.y, position.z);
        camera.lookAt(position);
    })
    .start();
     }

  

      recent.current = e.object;
      const meshId = e.object.uuid;
      setStore((prevStore) =>
        prevStore.map((item) =>
          item.id === meshId
            ? {
              ...item,
              clicked: !item.clicked,
              visible: recent.current === meshId ? !item.visible : item.visible,
            }
            : item
        )
      );
    }
  };
  useEffect(() => {
    meshRefs.current.forEach((child) => {
      const helper = helperRefs.current.get(child);
      if (helper && child) {
        const storeItem = store.find((item) => item.id === child.uuid);
        if (storeItem) {
          helper.material.color.set(storeItem.clicked ? '#ff0000' : '#000000');
        }
      }
    });
  }, [store]);

  return (
    <>
      <primitive
        object={model}
        onClick={(e) => handleClick(e)}
        position={props.modelPos}
        rotation={props.rotation}
        receiveShadow 
        ref={ref}
        {...props}
      />
    </>
  );
});

export default Model;
