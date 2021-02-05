import React from "react";
import Placeholder from "../assets/placeholder.png";

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

  const rotation = React.useRef<number>(0.00001);
  const isDragging = React.useRef<boolean>(dragging);

  const lastPos = React.useRef({
    x: 0,
    y: 0,
  });

  const dragVel = React.useRef({
    dx: 0,
    dz: 0,
  });

  // Arguably simpler/more performant to include these in the effect hook, but
  // I believe this is much easier to follow, declaring them here and only attatching
  // them in the effect hook
  const onTouchStart = (event: TouchEvent) => {
    if(event.touches.length === 1) {
      const touch = event.touches[0];

      lastPos.current = {
        x: touch.pageX,
        y: touch.pageY,
      };
    }
  }

  const onTouchMove = (event: TouchEvent) => {
    if(event.touches[0]) {
      const touch = event.touches[0];

      const { x, y } = lastPos.current;
      const { dx, dz } = dragVel.current;

      dragVel.current = {
        dx: dx + (touch.pageY - y) * dragSensitivity,
        dz: dz + (touch.pageX - x) * dragSensitivity,
      }

      lastPos.current = {
        x: touch.pageX,
        y: touch.pageY,
      };
    }
  }

  const onMouseDown = () => {
    isDragging.current = true;
    setDragging(true);
  }

  const onMouseMove = (event: MouseEvent) => {
    if(isDragging.current) {
      const { movementX, movementY } = event;
      const { dx, dz } = dragVel.current;

      dragVel.current = {
        dx: dx + movementY * dragSensitivity,
        dz: dz + movementX * dragSensitivity,
      }
    }
  }

  const onMouseUp = () => {
    if(isDragging.current) {
      isDragging.current = false;
      setDragging(false);
    }
  }

  React.useEffect(() => {
    // Allow webpack to split three into its own chunk and load it dynamically
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

        // Position the camera directly above the cube, looking downwards
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

        document.ontouchstart = onTouchStart;
        canvas.current.ontouchmove = onTouchMove;

        canvas.current.onmousedown = onMouseDown;
        document.onmousemove = onMouseMove;
        document.onmouseup = onMouseUp;

        const animate = () => {
          // Over-optimization :P
          const { dx, dz } = dragVel.current;
          const rot = rotation.current;

          const x = rot + dx;
          const z = rot - dz;

          // Altered these equations to omit c2 & s2, as they would be always 0 & 1 respectively
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

          // Interpolate rotation between its starting value and baseRotation with
          // logistic growth
          rotation.current = rot + 0.05 * (rot - (rot ** 2 / baseRotation));

          // Don't think numerical stability is actually too big of an issue
          dragVel.current = {
            dx: dx - momentumDecay * dx,
            dz: dz - momentumDecay * dz,
          }

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

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement("canvas");

    return !! (window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  }
  catch {
    return false;
  }
}
