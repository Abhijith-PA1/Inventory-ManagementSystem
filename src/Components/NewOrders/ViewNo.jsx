import React, { useContext, useEffect, useState } from "react";
import CardsNo from "./CardsNo";
import { getOrdersAPI } from "../../Services/allAPI";
import { addResponseContext, deleteResponseContext, editResponseContext } from "../../ContextAPI/ContextShare";

function ViewNo() {
  const [orderData, setOrderData] = useState([]);
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  const { deleteResponse, setDeleteResponse }  = useContext(deleteResponseContext);
  const  { editResponse, setEditResponse } = useContext(editResponseContext);

  const getAllOrder = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "authorization": `Bearer ${token}`,
      };
      const result = await getOrdersAPI(reqHeader);
      console.log(result);
      if (result.status == 200) {
        setOrderData(result.data);
      } else {
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getAllOrder();
  }, [addResponse,deleteResponse,editResponse]);

  return (
    <>
      <div className="bg-gray-400 m-1 sm:w-full w-[100%] border-2 border-gray-400 shadow-2xl">
        <h1 className="text-center text-2xl text-white m-2">New Orders</h1>
        <p className="text-red-700 ml-[70%] m-3 w-fit">Placed Orders &#x2705;</p>
        {orderData.length > 0 ? (
          orderData.map((order) => <CardsNo order={order} key={order._id} />)
        ) : (
          <p className="text-red-700 text-center">No Order Is Added </p>
        )}
      </div>
    </>
  );
}

export default ViewNo;
