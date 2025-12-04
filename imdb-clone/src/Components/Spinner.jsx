import React from "react";
import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="
        p-6 
        rounded-2xl 
        bg-white/20 
        backdrop-blur-md 
        shadow-[0_0_25px_rgba(255,255,255,0.3)]
      ">
        <LoaderCircle
          className="animate-spin text-white"
          strokeWidth={2.5}
          size={60}
        />
      </div>
    </div>
  );
};

export default Spinner;