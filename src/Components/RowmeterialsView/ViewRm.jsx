import React, { useContext, useEffect, useState } from "react";
import CardsRm from "./CardsRm";
import { getRowMaterialsAPI } from "../../Services/allAPI";
import {
  addResponseContext,
  deleteResponseContext,
  editResponseContext,
} from "../../ContextAPI/ContextShare";

function ViewRm() {
  const [rowMaterialsData, setRowmaterialsData] = useState([]);
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const { deleteResponse, setDeleteResponse } = useContext(
    deleteResponseContext
  );
  const { editResponse, setEditResponse } = useContext(editResponseContext);
  const usedMaterials = rowMaterialsData.filter((item) => item.usedRowMaterial);
  const newMaterials = rowMaterialsData.filter((item) => !item.usedRowMaterial);

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
    getAllRowMaterials();
  }, [addResponse, deleteResponse, editResponse]);

  return (
    <>
      <div className="flex w-full sm:m-2">
        <div className="bg-green-200 sm:m-5 m-1 sm:w-full w-[50%] border-2 border-gray-400 shadow-2xl">
          <h1 className="text-center text-green-500 m-2 text-2xl">
            {" "}
            New Raw Materials
          </h1>
          {newMaterials.length ? (
            newMaterials.map((rowMaterial) => (
              <CardsRm
                key={rowMaterial._id}
                rowMaterial={rowMaterial}
                onUpdate={getAllRowMaterials}
              />
            ))
          ) : (
            <p className="text-red-800 text-center">No New Raw Materials</p>
          )}
        </div>
        <div className="bg-red-200 sm:m-5 m-1 sm:w-full border-2 border-gray-400 shadow-2xl w-[50%]">
          <h1 className="text-center text-red-500 m-2 text-2xl">
            {" "}
            Used raw Materials
          </h1>
          {usedMaterials.length ? (
            usedMaterials.map((rowMaterial) => (
              <CardsRm
                key={rowMaterial._id}
                rowMaterial={rowMaterial}
                onUpdate={getAllRowMaterials}
              />
            ))
          ) : (
            <p className="text-red-800 text-center">No Used Raw Materials</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewRm;
