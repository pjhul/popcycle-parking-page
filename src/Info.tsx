import React from "react";

import EmailBox from "./EmailBox";
import Logo from "../public/logo.svg";

const Info: React.FC<unknown> = () => {
  return (
    <div className="h-full w-full flex flex-col items-start py-2 md:py-6 px-4 md:pl-8">
      <img className="h-8 mb-auto" src={Logo} alt="Popcycle" />

      <div className="w-full space-y-6 md:-mt-8">
        <h1 className="font-black text-7xl md:text-8xl">The future of fashion is coming</h1>
        <h3 className="font-bold italic text-gray-600 text-3xl md:text-4xl">Be first in line...</h3>

        <EmailBox />
      </div>

      <div className="mt-8 md:mt-auto text-sm italic">
        © 2021 Popcycle, LLC
      </div>
    </div>
  );
}

export default Info;
