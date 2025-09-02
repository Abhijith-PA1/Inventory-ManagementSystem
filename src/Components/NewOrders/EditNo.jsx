import React, { useContext, useEffect, useState } from "react";
import { server_url } from "../../Services/server_url";
import {  toast } from "react-toastify";
import { editOrdersAPI, getSettingAPI } from "../../Services/allAPI";
import { editResponseContext } from "../../ContextAPI/ContextShare";

function EditNo({ order, orderStatus }) {
  const [settingData, setSettingData] = useState([]);
  const [orderData, setOrderData] = useState({
    orderNo: order.orderNo,
    productName: order.productName,
    productImage: order.productImage,
    tons: order.tons,
    Diameter: order.Diameter,
    userName: order.userName,
    closedOrder: order.closedOrder,
  });
  const  { editResponse, setEditResponse } = useContext(editResponseContext);
  // console.log(orderData);
  // console.log(settingData);

  const getAllSettings = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (token) {
      const reqHeader = {
        "authorization": `Bearer ${token}`,
      };
      const result = await getSettingAPI(reqHeader);
      // console.log(result);
      if (result.status == 200) {
        setSettingData(result.data[0].products);
      } else {
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getAllSettings();
  }, []);

  const handleEdit = async () => {
    // console.log(productsData);
    const { orderNo, productName, productImage, tons, Diameter, userName } =
      orderData;
    if (
      !orderNo ||
      !productName ||
      !productImage ||
      !tons ||
      !Diameter ||
      !userName 
    ) {
      toast.warning("fill the missing fields");
    } else {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const reqHeader = {
            "authorization": `Bearer ${token}`,
          };
          try {
            const id = order._id;
            const result = await editOrdersAPI(orderData, reqHeader, id);
            console.log(result);
            if (result.status == 200) {
              toast.success("Products Edited Successfully");
              setEditResponse(result.data);
            } else {
              toast.warning(result.response.data);
            }
          } catch (err) {
            toast.error(err);
          }
        }
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <>
      <div>
        <button
          className="btn btn-outline hover:bg-yellow-300 bg-yellow-400 sm:mx-3 sm:mt-0 mt-1"
          onClick={() =>
            document.getElementById(`my_modal_1editNo${order._id}`).showModal()
          }
           disabled={orderStatus&&`disabled`}
        >
          <i class="fa-regular fa-pen-to-square fa-xl"></i>
        </button>
        {/* modal */}
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id={`my_modal_1editNo${order._id}`} className="modal ">
            <div className="modal-box w-95">
              <h3 className="font-bold text-lg text-center text-yellow-500">
                Edit Order
              </h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Edit Order No"
                  className="input input-success btn-block m-2"
                  onChange={(e) => {
                    setOrderData({ ...orderData, orderNo: e.target.value });
                  }}
                  value={orderData.orderNo}
                />
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 btn-block"
                  onChange={(e) => {
                    setOrderData({ ...orderData, productName: e.target.value });
                  }}
                  value={orderData.productName}
                >
                  <option disabled={false}>Select Product</option>
                  {settingData.length > 0
                    ? settingData.map((data) => (
                        <option value={data.productName}>
                          {data.productName}
                        </option>
                      ))
                    : null}
                </select>
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 btn-block"
                  onChange={(e) => {
                    setOrderData({
                      ...orderData,
                      productImage: e.target.value,
                    });
                  }}
                  value={orderData.productImage}
                >
                  <option disabled={false}>Select Product Image</option>
                  {settingData.length > 0
                    ? settingData.map((data) => (
                        <option value={data.productImage}>
                          {data.productImage}
                        </option>
                      ))
                    : null}
                </select>
                <input
                  type="number"
                  placeholder=""
                  className="input input-success w-30 m-2"
                  onChange={(e) => {
                    setOrderData({ ...orderData, tons: e.target.value });
                  }}
                  value={orderData.tons}
                />{" "}
                tons
                <br />
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 w-40"
                  onChange={(e) => {
                    setOrderData({ ...orderData, Diameter: e.target.value });
                  }}
                  value={orderData.Diameter}
                >
                  <option disabled={false}>Diameter</option>
                  {settingData.length > 0
                    ? settingData.map((data) => (
                        <option value={data.productDiameter}>
                          {data.productDiameter}
                        </option>
                      ))
                    : null}
                </select>
                mm
                {orderData.productImage && (
                  <img
                    src={`${server_url}/Uploads/${orderData.productImage}`}
                    className="w-30 h-20"
                    alt=""
                  />
                )}
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex">
                    <button className="btn btn-secondary btn-outline m-2">
                      Close
                    </button>
                    <button className="btn btn-warning btn-outline m-2" onClick={handleEdit}>
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </>
  );
}

export default EditNo;
