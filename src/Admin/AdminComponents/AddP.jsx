import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { addProductlSettingAPI } from "../../Services/allAPI";
import { addSettingResponseContext } from "../../ContextAPI/ContextShare";

function AddP() {
  const [addProduct, setAddProduct] = useState({
    productName: "",
    productImage: "",
    productDiameter: "",
  });
  const [fileStatus, setFileStatus] = useState();
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const { addSettingResponse, setAddSettingResponse } = useContext(
    addSettingResponseContext
  );

  const handleAdd = async () => {
    // console.log(addRowMeteri
    const { productName, productImage, productDiameter } = addProduct;
    if (!productName || !productImage || !productDiameter) {
      toast.warning("fill the missing fields");
    } else {
      try {
        //proceed to api call
        const reqBody = new FormData();
        reqBody.append("productName", productName);
        reqBody.append("productImage", productImage);
        reqBody.append("productDiameter", productDiameter);
        const token = localStorage.getItem("token");

        if (token) {
          //reqHeader - multipart/form-data
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
          };
          //api call
          try {
            const result = await addProductlSettingAPI(reqBody, reqHeader);
            console.log(result);
            if (result.status == 200) {
              toast.success("products Added Successfully");
              setAddSettingResponse(result.data);
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

  const handleClose = () => {
    setAddProduct({
      productName: "",
      productDiameter:"",
      productImage: "",
    });
    setPreview("");
    // console.log(addProduct);
    setFileStatus(false);

    // Reset file input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    // console.log(addRowMeterial.rowMeterialImage.type);
    if (
      addProduct.productImage.type == "image/png" ||
      addProduct.productImage.type == "image/jpg" ||
      addProduct.productImage.type == "image/jpeg"
    ) {
      console.log("generate URL");
      // console.log(URL.createObjectURL(addProduct.productImage));
      setPreview(URL.createObjectURL(addProduct.productImage));
      setFileStatus(false);
    } else {
      console.log("Upload following formats only (png/jpg/jpeg)");
      setFileStatus(true);
      setPreview((addProduct.productImage = ""));
    }
  }, [addProduct.productImage]);
  return (
    <>
      <div>
        <button
          className="btn md:mt-5 m-4 md:text-xl bg-red-500"
          onClick={() => document.getElementById("my_modal_1addP").showModal()}
        >
          Products <i class="fa-solid fa-plus "></i>
        </button>
        <dialog id="my_modal_1addP" className="modal ">
          <div className="modal-box w-95">
            <h3 className="font-bold text-lg text-center text-red-500">
              Add Product
            </h3>
            <div className="py-4">
              <input
                type="text"
                placeholder="Product Name"
                className="input input-success btn-block m-2"
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    productName: e.target.value,
                  })
                }
                value={addProduct.productName}
              />
              <input
                type="number"
                placeholder="Product Diameter"
                className="input input-success w-40 m-2"
                onChange={(e) =>
                  setAddProduct({
                    ...addProduct,
                    productDiameter: e.target.value,
                  })
                }
                value={addProduct.productDiameter}
              />mm
              <label>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setAddProduct({
                      ...addProduct,
                      productImage: e.target.files[0],
                    })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://png.pngtree.com/png-vector/20190129/ourmid/pngtree-gallery-vector-icon-png-image_355839.jpg"
                  }
                  className="w-35 h-30"
                  alt=""
                />
              </label>
              {fileStatus && (
                <p className="text-red-600">
                  Upload following formats only (png/jpg/jpeg)
                </p>
              )}
            </div>
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
                    className="btn btn-error btn-outline m-2"
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
    </>
  );
}

export default AddP;
