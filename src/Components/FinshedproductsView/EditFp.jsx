import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server_url } from "../../Services/server_url";
import { editProductsAPI, getSettingAPI } from "../../Services/allAPI";
import { editResponseContext } from "../../ContextAPI/ContextShare";

function EditFp({ products }) {
  const [settingData, setSettingData] = useState([]);
  const [productsData, setProductData] = useState({
    productId: products.productId,
    productName: products.productName,
    productImage: products.productImage,
    tons: products.tons,
    Diameter: products.Diameter,
    userName: products.userName,
  });
  const { editResponse, setEditResponse } = useContext(editResponseContext);
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

  const handleEdit = async () => {
    // console.log(productsData);
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
            "authorization": `Bearer ${token}`,
          };
          try {
            const id = products._id;
            const result = await editProductsAPI(productsData, reqHeader, id);
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
          className="btn btn-outline hover:bg-yellow-300 bg-yellow-400 sm:m-3 m-1"
          onClick={() =>
            document
              .getElementById(`my_modal_1editFP${products._id}`)
              .showModal()
          }
        >
          <i class="fa-regular fa-pen-to-square fa-xl"></i>
        </button>
        {/* modal */}
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id={`my_modal_1editFP${products._id}`} className="modal ">
            <div className="modal-box w-95">
              <h3 className="font-bold text-lg text-center text-yellow-500">
                Edit Finshed Product
              </h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Funshed Product Id"
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
                  onChange={(e) =>
                    setProductData({
                      ...productsData,
                      productImage: e.target.value,
                    })
                  }
                  value={productsData.productImage}
                >
                  <option disabled={false}>Select Finshed Product Image</option>
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
                  onChange={(e) =>
                    setProductData({
                      ...productsData,
                      tons: e.target.value,
                    })
                  }
                  value={productsData.tons}
                />{" "}
                tons
                <br />
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
                    ? settingData.map((data) => (
                        <option value={data.productDiameter}>
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
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <div className="flex">
                    <button className="btn btn-secondary btn-outline m-2">
                      Close
                    </button>
                    <button
                      className="btn btn-warning btn-outline m-2"
                      onClick={handleEdit}
                    >
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

export default EditFp;
