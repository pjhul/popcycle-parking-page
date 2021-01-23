import React from "react";

import Info from "./Info";
import Cube from "./Cube";

const App: React.FC<unknown> = () => {
  return (
    <div className="flex h-screen w-screen font-body">
      <div className="flex items-center flex-grow">
        <Info />
      </div>

      <div className="w-5/12 flex items-center flex-shrink-0">
        <Cube
          canvasWidth={700}
          canvasHeight={700}
        />
      </div>
    </div>
  );
}

export default App;
