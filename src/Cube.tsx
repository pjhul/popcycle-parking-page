import React from "react";
import * as THREE from "three";

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");

    return !! (window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext( "experimental-webgl" ))
    );
  }
  catch {
    return false;
  }
}

const Cube: React.FC<unknown> = () => {
  const cubeMount = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(isWebGLAvailable()) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      const camera = new THREE.PerspectiveCamera( 90, window.innerWidth/window.innerHeight, 0.1, 1000 );
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      renderer.setSize(window.innerWidth, window.innerHeight);
      cubeMount.current?.appendChild( renderer.domElement );

      const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbbb, 1 );
      scene.add( light );

      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshStandardMaterial( { color: 0xff6701 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.z = 2;

      const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.005;
        cube.rotation.y += 0.005;
        renderer.render(scene, camera);
      };

      animate();
    }
    else {
      console.error("No WEBGL");
    }
  }, []);

  console.log("render");

  return (
    <div className="overflow-hidden" ref={cubeMount}/>
  );
}

export default Cube;
