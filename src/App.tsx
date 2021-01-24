import React from "react";

import Info from "./Info";
import Cube from "./Cube";

const App: React.FC<unknown> = () => {
  return (
    <div className="flex flex-col md:flex-row fixed inset-0 font-display">
      <div className="h-full flex items-center flex-grow z-10">
        <Info />
      </div>

      <div className="w-full fixed top-0 mt-8 md:mt-0 md:relative md:w-1/2 flex items-center justify-center flex-shrink-0">
        <Cube
          canvasWidth={800}
          canvasHeight={800}
          dragSensitivity={0.0001}
          baseRotation={0.002}
          momentumDecay={0.025}
        />
      </div>

    </div>
  );
}

export default App;
