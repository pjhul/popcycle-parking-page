import React from "react";

import Info from "./Info";
import Cube from "./Cube";

import Logo from "../assets/logo.svg";

const App: React.FC<unknown> = () => {
  return (
    <div className="p-4 md:p-8 fixed inset-0 font-display select-none">
      <div className="h-full w-full relative flex flex-col md:flex-row">
        <img className="h-8 absolute top-0 left-0 z-50" src={Logo} alt="Popcycle" />

        <div className="mt-auto md:my-auto z-40">
          <Info />
        </div>

        <div className="w-full flex items-center justify-center flex-shrink-0 absolute top-0 md:relative md:w-1/2">
          <Cube
            canvasWidth={900}
            canvasHeight={900}
            dragSensitivity={0.00005}
            baseRotation={0.002}
            momentumDecay={0.025}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
