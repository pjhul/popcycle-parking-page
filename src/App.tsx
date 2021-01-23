import React from "react";
import Cube from "./Cube";

const App: React.FC<unknown> = () => {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2">
        Test
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <Cube
          canvasWidth={700}
          canvasHeight={700}
        />
      </div>
    </div>
  );
}

export default App;
