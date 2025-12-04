import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ pageNo, handlePrev, handleNext }) => {
  return (
    <div className="flex items-center justify-center mt-6 gap-6">
      <button
        onClick={handlePrev}
        className="
          p-3 rounded-full 
          bg-white 
          border border-black/20
          hover:shadow-[0_0_12px_rgba(0,0,0,0.25)]
          transition-all
        "
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>

     
      <div
        className="
          px-8 py-2 
          text-xl font-bold
          bg-white text-black 
          rounded-xl shadow-md 
          tracking-wide
        "
      >
        {pageNo}
      </div>

      
      <button
        onClick={handleNext}
        className="
          p-3 rounded-full 
          bg-white 
          border border-black/20
          hover:shadow-[0_0_12px_rgba(0,0,0,0.25)]
          transition-all
        "
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  );
};

export default Pagination;