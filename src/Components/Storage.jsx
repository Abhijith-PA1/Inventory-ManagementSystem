import React, { useContext, useEffect, useState } from "react";
import {
  getProductsAPI,
  getRowMaterialsAPI,
  getSettingAPI,
} from "../Services/allAPI";
import {
  addResponseContext,
  deleteResponseContext,
  editResponseContext,
} from "../ContextAPI/ContextShare";

function Storage() {
  const [totalStorage, setTotalStorage] = useState();
  const [productData, setProductData] = useState([]);
  const [rowMaterialsData, setRowmaterialsData] = useState([]);
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const { deleteResponse, setDeleteResponse } = useContext(
    deleteResponseContext
  );
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  const getAllSettings = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (token) {
      //reqHeader - multipart/form-data
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getSettingAPI(reqHeader);
      // console.log(result);
      if (result.status == 200) {
        setTotalStorage(result.data[0].totalStorage);
      } else {
        console.log(result.response.data);
      }
    }
  };

  const getAllProducts = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getProductsAPI(reqHeader);
      console.log(result);
      if (result.status == 200) {
        setProductData(result.data);
      } else {
        console.log(result.response.data);
      }
    }
  };

  const getAllRowMaterials = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const result = await getRowMaterialsAPI(reqHeader);
        console.log(result);
        if (result.status == 200) {
          setRowmaterialsData(result.data);
        } else {
          console.log(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllSettings();
    getAllProducts();
    getAllRowMaterials();
  }, [addResponse, deleteResponse, editResponse]);

  // Filter new raw materials (not used)
  const newRowMaterials = rowMaterialsData.filter(
    (item) => !item.usedRowMaterial
  );

  return (
    <>
      <div className="bg-gray-700 md:p-2 p-0">
        <div className="bg-gray-300 md:mx-5 mx-1 md:mt-5 mt-1 md:p-5 p-2 border-3 border-gray-600 rounded-lg">
          <h1 className="text-center md:text-xl text-blue-500 font-medium">
            Total Storage = {totalStorage} Tons
          </h1>
          <h1 className="text-center md:text-2xl text-xl font-black text-green-600">
            Available space={" "}
            {totalStorage -
              (newRowMaterials.reduce(
                (acc, item) => acc + (item.tons || 0),
                0
              ) +
                productData.reduce(
                  (acc, item) => acc + (item.tons || 0),
                  0
                ))}{" "}
            Tons
          </h1>
        </div>
        <div className=" flex">
          <div className="bg-gray-300 md:ms-5 ms-1 md:p-5 p-2 border-3 border-gray-600 rounded-lg">
            <h1 className="text-center md:text-xl text-red-500 font-medium">
              Row Meterials
            </h1>
            <h1 className="text-center md:text-2xl text-xl font-black text-red-600">
              {newRowMaterials.reduce((acc, item) => acc + (item.tons || 0), 0)}{" "}
              Tons
            </h1>
          </div>
          <div className="bg-gray-300 md:me-5 me-1 md:p-5 p-2 border-3 border-gray-600 rounded-lg">
            <h1 className="text-center md:text-xl text-yellow-500 font-medium">
              Finshed Products
            </h1>
            <h1 className="text-center md:text-2xl text-xl font-black text-yellow-600">
              {productData.reduce((acc, item) => acc + (item.tons || 0), 0)}{" "}
              Tons
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Storage;
