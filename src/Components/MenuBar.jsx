import Button from "daisyui/components/button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

function MenuBar() {
  const [menu, setMenu] = useState(true);
  const user = localStorage.getItem('user')
  const isUser = (user=="true")?true:false
  const navigate = useNavigate();

  const handleMenu = () => {
    if (menu === true) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      <div className="bg-purple-300  w-auto">
        <button className="btn" onClick={handleMenu}>
          <i class="fa-solid fa-bars fa-xl"></i>
        </button>
      </div>
      {menu ? (
        <div className="bg-purple-300 w-30  md:w-50 h-screen">
          <div className="">
            <Link
              to={"/"}
              className="btn btn-block mt-5 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
            >
              <i class="fa-regular fa-house fa-lg"></i> Home
            </Link>
            {isUser?null:<div>
              <Link
                to={"/dashboard"}
                className="btn btn-block mt-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
              >
                <MdDashboard className="text-2xl"/>Dashboard
              </Link>
              <Link
                to={"/userlist"}
                className="btn btn-block mt-2 btn-outline bg-yellow-400  hover:bg-gray-500 hover:text-white"
              >
                <i class="fa-solid fa-user fa-xl"></i>Users List
              </Link>
              <Link
                to={"/rowmeteriallist"}
                className="btn btn-block mt-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
              >
                <CiViewList className="sm:text-2xl text-xl" />Row-M List
              </Link>
              <Link
                to={"/finshedproductlist"}
                className="btn btn-block mt-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
              >
               <CiViewList className="text-2xl" />Finshed-P List
              </Link>
              <Link
                to={"/neworderlist"}
                className="btn btn-block mt-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
              >
               <CiViewList className="text-2xl" /> New-O List
              </Link>
              <Link
                to={"/setting"}
                className="btn btn-block mt-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
              >
               <i class="fa-solid fa-gear fa-xl"></i> Settings
              </Link>
            </div>}
            <Link
              to={"/rowmeterials"}
              className="btn btn-block mt-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
            >
             <i class="fa-solid fa-list-ul fa-xl"></i> Raw Materials
            </Link>
            <Link
              to={"/neworders"}
              className="btn btn-block my-2 btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
            >
             <i class="fa-solid fa-list-ul fa-xl"></i> New Orders
            </Link>
            <Link
              to={"/finshedproducts"}
              className="btn btn-block btn-outline bg-yellow-400 hover:bg-gray-500 hover:text-white"
            >
             <i class="fa-solid fa-list-ul fa-xl"></i> Finshed Products
            </Link>
            <button className="btn my-2 btn-block btn-outline bg-green-400 hover:bg-red-500 hover:text-white" onClick={handleLogout}>
              <i class="fa-solid fa-power-off fa-lg"></i> Logout
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MenuBar;
