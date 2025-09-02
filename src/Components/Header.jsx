import React from "react";
import RowToReady from "../assets/RowToReady.svg";
import R2R1 from "../assets/R2R1.svg";
import {Link} from "react-router-dom"

function Header() {
  return (
    <>
      <div className="navbar bg-purple-400 shadow-sm ">
        <img className="sm:w-40 w-20" src={R2R1} alt="" />
        <Link to={'/'} className="btn btn-ghost bg-purple-400 text-xl border-purple-400 ">
          <img className="sm:w-70 w-full" src={RowToReady} alt="" />
        </Link>
      </div>
    </>
  );
}

export default Header;
