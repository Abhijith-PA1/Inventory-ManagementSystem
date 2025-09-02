import React, { useContext, useEffect, useState } from "react";
import EditNo from "./EditNo";
import { server_url } from "../../Services/server_url";
import { toast } from "react-toastify";
import { deleteOrdersAPI, editOrdersAPI } from "../../Services/allAPI";
import {
  deleteResponseContext,
} from "../../ContextAPI/ContextShare";

function CardsNo({ order }) {
  const [orderStatus, setOrderstatus] = useState();
  const { deleteResponse, setDeleteResponse } = useContext(
    deleteResponseContext
  );
  // console.log(order);
  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const id = order._id;
      try {
        const result = await deleteOrdersAPI(reqHeader, id);
        console.log(result);
        toast.success("Delete Products Successfull");
        setDeleteResponse(result.data);
      } catch (err) {
        toast.error(err);
      }
    }
  };

  const handleCheckboxToggle = async (e) => {
    const newStatus = e.target.checked;
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const updatedData = {
        ...order,
        closedOrder: newStatus,
      };
      try {
        const result = await editOrdersAPI(updatedData, reqHeader, order._id);
        if (result.status === 200) {
          toast.success("Order status updated");
          setOrderstatus(newStatus); // ✅ Update UI immediately
        } else {
          toast.warning(result.response?.data || "Failed to update");
        }
      } catch (err) {
        toast.error(err);
      }
    }
  };

  useEffect(() => {
    if (order.closedOrder == true) {
      setOrderstatus(true);
    } else {
      setOrderstatus(false);
    }
  }, [order]);

  return (
    <>
      <div className="card sm:mx-5">
        <div
          className={`sm:flex flex-wrap justify-between ${
            orderStatus ? `bg-green-400` : `bg-white`
          } sm:mx-10 m-2 mx-4 sm:p-5 p-3 w-fill h-auto hover:scale-105`}
        >
          <img
            src={`${server_url}/Uploads/${order.productImage}`}
            alt=""
            className="sm:mx-3 sm:m-2 w-30 h-20"
          />
          <h3 className="sm:mx-3 sm:m-2">id :{order.orderNo}</h3>
          <h3 className="sm:mx-3 sm:m-2">name : {order.productName} </h3>
          <p className="sm:mx-3 sm:m-2">diameter :{order.Diameter}</p>
          <p className="sm:mx-3 sm:m-2">tons :{order.tons}</p>
          <button
            className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3"
            onClick={handleDelete}
            disabled={orderStatus&&`disabled`}
          >
            <i class="fa-solid fa-trash fa-xl"></i>
          </button>
          <EditNo order={order} orderStatus={orderStatus} />
          <input
            type="checkbox"
            className="checkbox checkbox-error border-green-600 sm:m-2 m-2"
            checked={orderStatus}
            onChange={handleCheckboxToggle}
          />
        </div>
      </div>
    </>
  );
}

export default CardsNo;
