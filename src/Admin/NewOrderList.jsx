import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { deleteOrdersAPI, getOrdersAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import { ToastContainer, toast, Bounce } from "react-toastify";

function NewOrderList() {
  const [orderData, setOrderData] = useState([]);
  const getAllOrder = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
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
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      // console.log(id);
      try {
        const result = await deleteOrdersAPI(reqHeader, id);
        console.log(result);
        toast.success("Delete Products Successfull");
        getAllOrder();
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full overflow-auto h-auto">
          <div>
            <p className="bg-green-300 m-3 p-2 w-fit ml-[70%]">
              Used Row Materials
            </p>
            <table className="sm:m-10 my-5 table-auto">
              <thead>
                <tr>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    SI.No
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Image
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Product
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Order No
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Employee Name
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Tons
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Diameter(mm)
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Entry Date
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Time
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {orderData.length ? (
                  orderData.map((order, index) => (
                    <tr>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {index + 1} .
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        <img
                          className="md:w-30 md:h-20"
                          src={`${server_url}/Uploads/${order.productImage}`}
                          alt=""
                        />
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {order.productName}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {order.orderNo}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {order.userName}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {order.tons}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {order.Diameter}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {new Date(order.updatedAt).toLocaleDateString()}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {new Date(order.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td
                        className={`md:p-3 p-1  border-2 border-purple-400 ${
                          order.closedOrder ? "bg-green-300" : "bg-orange-300"
                        } text-black `}
                      >
                        {" "}
                        <button
                          className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3"
                          onClick={() => handleDelete(order._id)}
                        >
                          <i class="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="text-red-700 text-center">No Order Exist</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default NewOrderList;
