import React, { useContext, useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import AddRM from "./AdminComponents/AddRM";
import AddP from "./AdminComponents/AddP";
import UpdateStorage from "./AdminComponents/UpdateStorage";
import RMCard from "./AdminComponents/RMCard";
import PCard from "./AdminComponents/PCard";
import { getSettingAPI } from "../Services/allAPI";
import {
  addSettingResponseContext,
  deleteSettingResponseContext,
} from "../ContextAPI/ContextShare";

function Settings() {
  const [rowMaterialsData, setRowMaterialsData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalStorage, setTotalStorage] = useState();
  const { addSettingResponse, setAddSettingResponse } = useContext(
    addSettingResponseContext
  );
  const { deleteSettingResponse, setDeleteSettingResponse } = useContext(
    deleteSettingResponseContext
  );
  // console.log(addSettingResponse);

  const getAllSettings = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (token) {
      //reqHeader - multipart/form-data
      const reqHeader = {
        "authorization": `Bearer ${token}`,
      };
      const result = await getSettingAPI(reqHeader);
      // console.log(result);
      if (result.status == 200) {
        setProductData(result.data[0].products);
        setTotalStorage(result.data[0].totalStorage);
        setRowMaterialsData(result.data[0].rowMaterials);
      } else {
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getAllSettings();
  }, [addSettingResponse,deleteSettingResponse]);

  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full">
          <div className="bg-base-300 m-10 p-10 flex justify-between flex-wrap">
            <AddRM />
            <AddP />
            <UpdateStorage />
          </div>
          <div className="flex justify-center">
            <div className="bg-base-300 p-10 sm:w-fit w-full">
              <h1 className="text-3xl text-center m-3 text-blue-600 font-bold">
                Total Storage Space
              </h1>
              <h1 className="text-5xl text-center m-3 text-green-600 font-black">
                {totalStorage}{" "}
                <span className="text-xl text-red-500">Tons</span>
              </h1>
            </div>
          </div>
          <div className="flex w-full sm:m-2">
            <div className="bg-base-300 sm:m-5 m-1 sm:w-full w-[50%] border-2 border-gray-400 shadow-2xl">
              <h1 className="text-center text-green-500 m-2 text-2xl">
                {" "}
                Row Meterials
              </h1>
              {rowMaterialsData.length > 0 ? (
                rowMaterialsData.map((rowMaterilas) => (
                  <RMCard rowMaterilas={rowMaterilas} />
                ))
              ) : (
                <p className="text-red-600 text-center m-10">
                  No Rowmaterials Available
                </p>
              )}
            </div>
            <div className="bg-base-300 sm:m-5 m-1 sm:w-full border-2 border-gray-400 shadow-2xl w-[50%]">
              <h1 className="text-center text-red-500 m-2 text-2xl">
                {" "}
                Products
              </h1>
              {productData.length > 0 ? (
                productData.map((products) => <PCard products={products} />)
              ) : (
                <p className="text-red-600 text-center m-10">
                  No Rowmaterials Available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
