import React from "react";
import MenuBar from "../Components/MenuBar";
import AddRm from "../Components/RowmeterialsView/AddRm";
import ViewRm from "../Components/RowmeterialsView/ViewRm"
import Storage from "../Components/Storage";

function RowMeterials() {
  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full">
          <div className="flex md:justify-between">
            <AddRm />
            <Storage/>
          </div>
          <div className="w-full">
            <ViewRm/>
          </div>
        </div>
      </div>
    </>
  );
}

export default RowMeterials;
