import React, { useContext, useEffect, useState } from "react";
import CardFp from "./CardsFp";
import { getProductsAPI } from "../../Services/allAPI";
import { addResponseContext, deleteResponseContext, editResponseContext } from "../../ContextAPI/ContextShare";

function ViewFp() {
  const [productData, setProductData] = useState([]);
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const { deleteResponse, setDeleteResponse } = useContext(deleteResponseContext);
  const  { editResponse, setEditResponse } = useContext(editResponseContext);

  const getAllProducts = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "authorization": `Bearer ${token}`,
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

  useEffect(() => {
    getAllProducts();
  }, [addResponse,deleteResponse,editResponse]);
 
  return (
    <>
      <div className=" w-full sm:m-2">
        <div className="bg-gray-200 sm:mt-5 sm:w-full w-[100%] border-2 border-gray-400 shadow-2xl flex flex-wrap">
          {productData.length > 0 ? (
            productData.map((products) => <CardFp products={products} />)
          ) : (
            <p className="text-red-700 text-center">No Product exist</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ViewFp;
