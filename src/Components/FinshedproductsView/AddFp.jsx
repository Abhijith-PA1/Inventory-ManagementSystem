import React, { useContext, useEffect, useState } from "react";
import { addProductsAPI, getSettingAPI } from "../../Services/allAPI";
import { server_url } from "../../Services/server_url";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { addResponseContext } from "../../ContextAPI/ContextShare";

function AddFp() {
  const [settingData, setSettingData] = useState([]);
  const [productsData, setProductData] = useState({
    productId: "",
    productName: "",
    productImage: "",
    tons: "",
    Diameter: "",
    userName: localStorage.getItem("employeename"),
  });
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  // console.log(productsData);
  // console.log(settingData);

  const getAllSettings = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
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

  const handleClose = () => {
    setProductData({
      productId: "",
      productName: "",
      productImage: "",
      tons: "",
      Diameter: "",
      userName: localStorage.getItem("employeename"),
    });
  };

  const handleAdd = async () => {
    console.log(productsData);
    const { productId, productName, productImage, tons, Diameter, userName } =
      productsData;
    if (
      !productId ||
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
            authorization: `Bearer ${token}`,
          };
          try {
            const result = await addProductsAPI(productsData, reqHeader);
            // console.log(result);
            if (result.status == 200) {
              toast.success("Products Added Successfully");
              setAddResponse(result.data);
              handleClose();
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
  //     setProductData((e) => ({
  //       ...e,
  //       userName: localStorage.getItem("employeename"),
  //     }));
  // }, [productsData.userName]);

  return (
    <>
      <div>
        <div className="flex flex-wrap">
          <h2 className="md:text-3xl text-xl md:ms-5 sm:mt-5 m-3 font-bold text-gray-500">
            Add New Finshed Products
          </h2>
          <button
            className="btn md:mt-5 m-4 md:text-xl bg-green-400"
            onClick={() =>
              document.getElementById("my_modal_1addFP").showModal()
            }
          >
            add <i class="fa-solid fa-plus "></i>
          </button>
        </div>
        {/* modal */}
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_1addFP" className="modal ">
            <div className="modal-box w-95">
              <h3 className="font-bold text-lg text-center text-green-500">
                Add Finshed Product
              </h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Finshed Product Id"
                  className="input input-success btn-block m-2"
                  onChange={(e) =>
                    setProductData({
                      ...productsData,
                      productId: e.target.value,
                    })
                  }
                  value={productsData.productId}
                />
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 btn-block"
                  onChange={(e) =>
                    setProductData({
                      ...productsData,
                      productName: e.target.value,
                    })
                  }
                  value={productsData.productName}
                >
                  <option disabled={false}>Select Finshed Product</option>
                  {settingData.length
                    ? settingData.map((data, index) => (
                        <option key={index} value={data.productName}>
                          {data.productName}
                        </option>
                      ))
                    : null}
                </select>
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 btn-block"
                  onChange={(e) =>
                    setProductData({
                      ...productsData,
                      productImage: e.target.value,
                    })
                  }
                  value={productsData.productImage}
                >
                  <option disabled={false}>Select Finsh Products Image</option>
                  {settingData.length > 0
                    ? settingData.map((data, index) => (
                        <option key={index} value={data.productImage}>
                          {data.productImage}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <input
                type="number"
                placeholder=""
                className="input input-success w-30 m-2"
                onChange={(e) =>
                  setProductData({
                    ...productsData,
                    tons: e.target.value,
                  })
                }
                value={productsData.tons}
              />{" "}
              tons <br />
              <select
                defaultValue="Pick a Runtime"
                className="select select-success m-2 w-40"
                onChange={(e) =>
                  setProductData({
                    ...productsData,
                    Diameter: e.target.value,
                  })
                }
                value={productsData.Diameter}
              >
                <option disabled={false}>Diameter</option>
                {settingData.length > 0
                  ? settingData.map((data, index) => (
                      <option key={index} value={data.productDiameter}>
                        {data.productDiameter}
                      </option>
                    ))
                  : null}
              </select>
              mm
              {productsData.productImage && (
                <img
                  src={`${server_url}/Uploads/${productsData.productImage}`}
                  className="w-30 h-20"
                  alt=""
                />
              )}
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex">
                    <button
                      className="btn btn-warning btn-outline m-2"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-success btn-outline m-2"
                      onClick={handleAdd}
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
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

export default AddFp;
