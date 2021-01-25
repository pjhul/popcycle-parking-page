import React from "react";
import Placeholder from "../public/placeholder.png";

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
  canvasWidth: number
  canvasHeight: number

  baseRotation: number
  momentumDecay: number
  dragSensitivity: number
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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    import("three").then(THREE => {
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

        const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 4);
        camera.position.y = 1;
        camera.rotation.x = -Math.PI / 2;

        const light = new THREE.HemisphereLight(0xffffff, 0x999999, 1);
        scene.add(light);

        // Maximum size of the cube for it to fit inside the canvas while rotating
        const dim = 1 / Math.sqrt(3);
        const geometry = new THREE.BoxGeometry(dim, dim, dim);
        const material = new THREE.MeshStandardMaterial({ color: 0xff6701 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        renderer.render(scene, camera);
        setIsLoading(false);

        let rotation = 0.00001;
        let isDragging = false;

        let lastPos = {
          x: 0,
          y: 0,
        };
        let dragVel = {
          dx: 0,
          dz: 0,
        };

        canvas.current.ontouchstart = (event) => {
          if(event.touches.length === 1) {
            const touch = event.touches[0];

            lastPos = {
              x: touch.pageX,
              y: touch.pageY,
            };

            isDragging = true;
            setDragging(true);
          }
        }

        document.ontouchmove = (event) => {
          if(isDragging && event.touches[0]) {
            const touch = event.touches[0];
            dragVel.dx += (touch.pageY - lastPos.y) * dragSensitivity;
            dragVel.dz += (touch.pageX - lastPos.x) * dragSensitivity;

            lastPos = {
              x: touch.pageX,
              y: touch.pageY,
            };
          }
        }

        document.ontouchend = (event) => {
          if(event.touches.length === 0) {
            isDragging = false;
            setDragging(false);
          }
        }

        canvas.current.onmousedown = () => {
          isDragging = true;
          setDragging(true);
        }

        document.onmousemove = (event) => {
          if(isDragging) {
            dragVel.dx += event.movementY * dragSensitivity;
            dragVel.dz += event.movementX * dragSensitivity;
          }
        }

        document.onmouseup = () => {
          isDragging = false;
          setDragging(false);
        }

        const animate = () => {
          // Over-optimization :P
          const x = rotation + dragVel.dx;
          const z = rotation - dragVel.dz;

          // Altered these equations to omit c2 & s2, as they would be always 0 & 1
          // Use small angle approximation for sin & cos
          const c1 = 1 - (x ** 2) / 8;
          const c3 = 1 - (z ** 2) / 8;

          const s1 = x / 2;
          const s3 = z / 2;

          const qx = s1 * c3;
          const qy = - s1 * s3;
          const qz = c1 * s3;
          const qw = c1 * c3;

          const deltaRot = new THREE.Quaternion(qx, qy, qz, qw);

          cube.quaternion.multiplyQuaternions(deltaRot, cube.quaternion);

          // Interpolate rotation between it's starting value and baseRotation with
          // logistic growth
          rotation += 0.05 * (rotation - (rotation ** 2 / baseRotation));

          // Don't think numerical stability is actually too big of an issue
          dragVel.dx -= momentumDecay * dragVel.dx;
          dragVel.dz -= momentumDecay * dragVel.dz;

          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };

        animate();
      }
      else {
        console.info("No WEBGL Support");
      }
    })
  }, []);

  return (
    <div className={`relative overflow-hidden ${dragging ? "cursor-grabbing" : "cursor-grab"}`}>
      { isLoading ? <img className="absolute w-full" src={Placeholder} /> : null }
      <canvas ref={canvas} className="block w-full" width={canvasWidth} height={canvasHeight} />
    </div>
  );
}

export default Cube;
