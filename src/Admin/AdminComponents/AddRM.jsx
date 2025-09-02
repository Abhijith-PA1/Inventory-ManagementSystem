import React, { useContext, useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { addRowMaterialSettingAPI } from "../../Services/allAPI";
import { addSettingResponseContext } from "../../ContextAPI/ContextShare";

function AddRM() {
  const [addRowMeterial, setAddRowMeterial] = useState({
    rowMeterialName: "",
    rowMeterialImage: "",
  });
  const [fileStatus, setFileStatus] = useState();
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef(null);
  const { addSettingResponse, setAddSettingResponse } = useContext(addSettingResponseContext); 

  const handleAdd = async () => {
    // console.log(addRowMeteri
    const { rowMeterialName, rowMeterialImage } = addRowMeterial;
    if (!rowMeterialImage || !rowMeterialName) {
      toast.warning("fill the missing fields");
    } else {
      try {
        //proceed to api call
        const reqBody = new FormData();
        reqBody.append("rowMeterialName", rowMeterialName);
        reqBody.append("rowMeterialImage", rowMeterialImage);
        const token = localStorage.getItem("token");

        if (token) {
          //reqHeader - multipart/form-data
          const reqHeader = {
            "Content-Type": "multipart/form-data",
            "authorization": `Bearer ${token}`,
          };
          //api call
          try {
            const result = await addRowMaterialSettingAPI(reqBody, reqHeader);
            console.log(result);
            if (result.status == 200) {
              toast.success("Row Materials Added Successfully");
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
    setAddRowMeterial({
      rowMeterialName: "",
      rowMeterialImage: "",
    });
    setPreview("");
    console.log(addRowMeterial);
    setFileStatus(false);

    // Reset file input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  useEffect(() => {
    // console.log(addRowMeterial.rowMeterialImage.type);
    if (
      addRowMeterial.rowMeterialImage.type == "image/png" ||
      addRowMeterial.rowMeterialImage.type == "image/jpg" ||
      addRowMeterial.rowMeterialImage.type == "image/jpeg"
    ) {
      console.log("generate URL");
      // console.log(URL.createObjectURL(addRowMeterial.rowMeterialImage));
      setPreview(URL.createObjectURL(addRowMeterial.rowMeterialImage));
      setFileStatus(false);
    } else {
      console.log("Upload following formats only (png/jpg/jpeg)");
      setFileStatus(true);
      setPreview((addRowMeterial.rowMeterialImage = ""));
    }
  }, [addRowMeterial.rowMeterialImage]);

  return (
    <>
      <div>
        <button
          className="btn md:mt-5 m-4 md:text-xl bg-green-500"
          onClick={() =>
            document.getElementById("my_modal_1addRM2").showModal()
          }
        >
          Add Row Material <i class="fa-solid fa-plus "></i>
        </button>
        <dialog id="my_modal_1addRM2" className="modal ">
          <div className="modal-box w-95">
            <h3 className="font-bold text-lg text-center text-green-500">
              Add New Raw material
            </h3>
            <div className="py-4">
              <input
                type="text"
                placeholder="Row Meterial Name"
                className="input input-success btn-block m-2"
                onChange={(e) =>
                  setAddRowMeterial({
                    ...addRowMeterial,
                    rowMeterialName: e.target.value,
                  })
                }
                value={addRowMeterial.rowMeterialName}
              />
              <label>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setAddRowMeterial({
                      ...addRowMeterial,
                      rowMeterialImage: e.target.files[0],
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
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default AddRM;
