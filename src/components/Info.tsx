import React from "react";

import EmailBox from "./EmailBox";

const Info: React.FC<unknown> = () => {
  return (
    <div className="flex flex-col items start w-full py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="font-black text-6xl md:text-8xl">The future of fashion is coming</h1>
        <h3 className="font-bold italic text-gray-600 text-2xl md:text-3xl">Don't miss out...</h3>
      </div>

      <EmailBox />
    </div>
  );
}

export default Info;
