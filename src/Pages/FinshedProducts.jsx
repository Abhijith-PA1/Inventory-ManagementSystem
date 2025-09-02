import React from "react";
import MenuBar from "../Components/MenuBar";
import AddFp from "../Components/FinshedproductsView/AddFp";
import ViewFp from "../Components/FinshedproductsView/ViewFp";
import Storage from "../Components/Storage";

function FinshedProducts() {
  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full">
          <div className="flex md:justify-between">
            <AddFp />
            <Storage />
          </div>
          <div className="w-full">
            <ViewFp />
          </div>
        </div>
      </div>
    </>
  );
}

export default FinshedProducts;
