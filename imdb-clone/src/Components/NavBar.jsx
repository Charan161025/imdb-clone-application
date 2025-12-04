import React from "react";
import Logo from "../assets/movie.png";
import { NavLink } from "react-router-dom";
import { Home, ListVideo } from "lucide-react";

const NavBar = () => {
  const linkClasses =
    "flex items-center gap-2 text-lg font-bold px-3 py-2 rounded-md transition-all duration-200 text-gray-200 hover:bg-blue-500/20 hover:text-blue-300";

  return (
    <nav className="w-full bg-[#0b0b0b] text-white shadow-md">
      <ul className="flex items-center px-6 py-4 space-x-10 max-w-7xl mx-auto">
        <li>
          <NavLink to="/">
            <img
              className="w-[55px] rounded-full hover:scale-105 transition-transform duration-200"
              src={Logo}
              alt="logo"
            />
          </NavLink>
        </li>

        
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-400 bg-blue-500/10 underline underline-offset-4"
                  : ""
              }`
            }
          >
            <Home size={24} className="text-current" />
            Home
          </NavLink>
        </li>

        
        <li>
          <NavLink
            to="/watchlist"
            className={({ isActive }) =>
              `${linkClasses} ${
                isActive
                  ? "text-blue-400 bg-blue-500/10 underline underline-offset-4"
                  : ""
              }`
            }
          >
            <ListVideo size={24} className="text-current" />
            WatchList
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default NavBar;