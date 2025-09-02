import React from "react";
import MenuBar from "../Components/MenuBar";
import AddNo from "../Components/NewOrders/AddNo";
import Storage from "../Components/Storage";
import ViewNo from "../Components/NewOrders/ViewNo";


function NewOrders() {
  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full">
          <div className="flex md:justify-between">
            <AddNo />
            <Storage/>
          </div>
          <div className="w-full">
            <ViewNo/>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewOrders;
