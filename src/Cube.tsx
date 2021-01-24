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

  baseRotation: number,
  momentumDecay: number,
  dragSensitivity: number,
}

const Cube: React.FC<CubeProps> = (props) => {
  const {
    canvasWidth,
    canvasHeight,

    baseRotation,
    momentumDecay,
    dragSensitivity,
  } = props;

  const canvas = React.useRef<HTMLCanvasElement>(null);
  const [dragging, setDragging] = React.useState<boolean>(false);

  React.useEffect(() => {
    if(isWebGLAvailable() && canvas.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: canvas.current,
      });
      renderer.setSize(canvasWidth, canvasHeight);

      // Overwrite THREE automatically setting these to the static values of the
      // canvas dimensions
      canvas.current.style.width = "";
      canvas.current.style.height = "";

      const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1000 );
      camera.position.y = 2;
      camera.rotation.x = -Math.PI / 2;

      const light = new THREE.HemisphereLight(0xffffff, 0x999999, 1);
      scene.add(light);

      // Maximum size of the cube for it to fit inside the canvas while rotating
      const dim = 1 / Math.sqrt(3);
      const geometry = new THREE.BoxGeometry(dim, dim, dim);
      const material = new THREE.MeshStandardMaterial( { color: 0xff6701 } );
      const cube = new THREE.Mesh( geometry, material );
      scene.add(cube);

      let isDragging = false;
      let dragVel = {
        dx: 0,
        dz: 0,
      };

      canvas.current.onmousedown = () => {
        isDragging = true;
        setDragging(true);
      }

      document.onmousemove = (event) => {
        if(isDragging) {
          // event.movementX has only ~94% support, but is just so cool. Also this is
          // just a cosmetic feature so support isn't too critical

          dragVel.dx += event.movementY * dragSensitivity;
          dragVel.dz += event.movementX * dragSensitivity;
        }
      }

      document.onmouseup = () => {
        isDragging = false;
        setDragging(false);
      }

      const animate = () => {
        const deltaRot = new THREE.Quaternion()
          .setFromEuler(new THREE.Euler(
            baseRotation + dragVel.dx,
            0,
            baseRotation + -dragVel.dz,
            "XYZ"
          ));

        cube.quaternion.multiplyQuaternions(deltaRot, cube.quaternion);

        if(Math.abs(dragVel.dx) < 0.00001) {
          dragVel.dx = 0;
        } else {
          dragVel.dx -= momentumDecay * dragVel.dx;
        }

        if(Math.abs(dragVel.dz) < 0.00001) {
          dragVel.dz = 0;
        }
        else {
          dragVel.dz -= momentumDecay * dragVel.dz;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    }
    else {
      console.error("No WEBGL");
    }
  }, []);

  return (
    <div className={`overflow-hidden cursor-${dragging ? "grabbing" : "grab"}`}>
      <canvas ref={canvas} className="block w-full" width={canvasWidth} height={canvasHeight} />
    </div>
  );
}

export default Cube;
