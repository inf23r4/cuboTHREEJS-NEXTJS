import { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


const Scene = () => {
    const mountRef = useRef(null)

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000080)
        const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.z = 6;
        camera.position.x = 6;
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;


        const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5 );
        const material = new THREE.MeshPhysicalMaterial( { color: 0x00f2c64 } );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        camera.lookAt(cube.position);

        const light = new THREE.PointLight(0xff00c0, 5)
        light.position.set(8, 8, 8,);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight( 0x404040, 10 ); // soft white light
        scene.add( ambientLight );


        const clock = new THREE.Clock();
        const animate = () => {

          const resize = () =>{
            const upddateWidth = window.innerWidth
            const updateHeigth = window.innerHeight
            renderer.setSize(upddateWidth, updateHeigth);
            camera.aspect = upddateWidth / updateHeigth;
            camera.updateProjectionMatrix()
          }

          window.addEventListener("resize", resize )

            const elapsedTime = clock.getElapsedTime();
            cube.rotation.y = elapsedTime;
            cube.rotation.x = elapsedTime;
            cube.position.y = Math.sin(elapsedTime);
            cube.position.z = Math.cos(elapsedTime);

            controls.update();
            renderer.render(scene, camera),
            requestAnimationFrame(animate);
        };

        animate();
        
        renderer.render( scene, camera );

      return () => {
        document.body.removeChild(renderer.domElement); 
      }
    }, [])
    
    

  return (
    <div ref={ mountRef } >
    </div>
  );
};

export default Scene