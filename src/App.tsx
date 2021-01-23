import React from "react";

import Info from "./Info";
import Cube from "./Cube";

const App: React.FC<unknown> = () => {
  return (
    <div className="flex h-screen w-screen font-body">
      <div className="flex items-center flex-grow">
        <Info />
      </div>

      <div className="w-1/2 flex items-center justify-center flex-shrink-0">
        <Cube
          canvasWidth={800}
          canvasHeight={800}
        />
      </div>

    </div>
  );
}

export default App;
