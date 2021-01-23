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

type CubeProps = {
  canvasWidth: number,
  canvasHeight: number,
}

const Cube: React.FC<CubeProps> = (props) => {
  const {
    canvasWidth,
    canvasHeight,
  } = props;

  const cubeMount = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if(isWebGLAvailable() && cubeMount.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000 );
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
      });

      renderer.setSize(canvasWidth, canvasHeight);
      cubeMount.current.appendChild( renderer.domElement );

      const light = new THREE.HemisphereLight( 0xffffff, 0xaaaaaa, 1 );
      scene.add( light );

      const geometry = new THREE.BoxGeometry( 1, 1, 1 );
      const material = new THREE.MeshStandardMaterial( { color: 0xff6701 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add( cube );
      camera.position.y = 2;
      camera.rotation.x = -Math.PI / 2;

      const animate = function () {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.005;
        cube.rotation.z += 0.005;
        renderer.render(scene, camera);
      };

      animate();
    }
    else {
      console.error("No WEBGL");
    }
  }, []);

  return (
    <div className="overflow-hidden" ref={cubeMount}/>
  );
}

export default Cube;
