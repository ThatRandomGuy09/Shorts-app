import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-red-500 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
            <span className="font-semibold text-xl">Shorts-app</span>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center"></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
