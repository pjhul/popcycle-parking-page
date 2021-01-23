import React from "react";
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } from "three";

const Cube: React.FC<unknown> = () => {
  React.useEffect(() => {
    var scene = new Scene();
    var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    var geometry = new BoxGeometry( 1, 1, 1 );
    var material = new MeshBasicMaterial( { color: 0xff6701 } );
    var cube = new Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();

  }, []);

  return (
    <div />
  );
}

export default Cube;
