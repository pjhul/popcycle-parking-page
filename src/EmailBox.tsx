import React from "react";
import { FiMail } from "react-icons/fi";

const EmailBox: React.FC<unknown> = () => {
  return (
    <div className="flex items-stretch space-x-2">
      <div className="flex items-center px-2 space-x-2 border-2 border-purple text-purple rounded-md">
        <FiMail className="w-6 h-6" />
        <input className="w-64" placeholder="Enter your email" />
      </div>

      <button className="px-6 py-3 bg-purple text-white rounded-md">
        Join
      </button>
    </div>
  );
}

export default EmailBox;
