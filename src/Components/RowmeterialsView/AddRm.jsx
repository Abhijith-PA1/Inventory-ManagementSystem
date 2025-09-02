import React, { useContext, useEffect, useState } from "react";
import { addRowMaterialsAPI, getSettingAPI } from "../../Services/allAPI";
import { server_url } from "../../Services/server_url";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { addResponseContext } from "../../ContextAPI/ContextShare";

function AddRm() {
  const [settingData, setSettingData] = useState([]);
  const [rowMaterialsData, setRowmaterialsData] = useState({
    rowMaterialId: "",
    rowMaterialName: "",
    rowMaterialImage: "",
    tons: "",
    userName: localStorage.getItem("employeename"),
    usedRowMaterial: false,
  });
  const { addResponse, setAddResponse } = useContext(addResponseContext);
  // console.log(settingData);
  // console.log(rowMaterialsData);

  const getAllSettings = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);

    if (token) {
      //reqHeader - multipart/form-data
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getSettingAPI(reqHeader);
      // console.log(result);
      if (result.status == 200) {
        setSettingData(result.data[0].rowMaterials);
      } else {
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getAllSettings();
  }, []);

  const handleClose = () => {
    setRowmaterialsData({
      rowMaterialId: "",
      rowMaterialName: "",
      rowMaterialImage: "",
      tons: "",
      userName: localStorage.getItem("employeename"),
      usedRowMaterial: false,
    });
  };

  const handleAdd = async () => {
    console.log(rowMaterialsData);
    const { rowMaterialId, rowMaterialName, rowMaterialImage, tons, userName } =
      rowMaterialsData;
    if (
      !rowMaterialId ||
      !rowMaterialName ||
      !rowMaterialImage ||
      !tons ||
      !userName
    ) {
      toast.warning("fill the missing fields");
    } else {
      try {
        const token = localStorage.getItem("token");
        // console.log(token);
        if (token) {
          const reqHeader = {
            authorization: `Bearer ${token}`,
          };
          try {
            const result = await addRowMaterialsAPI(
              rowMaterialsData,
              reqHeader
            );
            console.log(result);
            if (result.status == 200) {
              toast.success("Row Materials Added Successfully");
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
  //   setRowmaterialsData((data) => ({
  //     ...data,
  //     userName: localStorage.getItem("employeename"),
  //   }));
  //   setRowmaterialsData((data) => ({
  //     ...data,
  //     usedRowMaterial: false,
  //   }));
  // }, [rowMaterialsData.userName, rowMaterialsData.usedRowMaterial]);

  return (
    <>
      <div>
        <div className="flex flex-wrap">
          <h2 className="md:text-3xl text-xl md:ms-5 sm:mt-5 m-3 font-bold text-gray-500">
            Add New Raw materials
          </h2>
          <button
            className="btn md:mt-5 m-4 md:text-xl bg-green-400"
            onClick={() =>
              document.getElementById("my_modal_1addRM").showModal()
            }
          >
            add <i class="fa-solid fa-plus "></i>
          </button>
        </div>
        {/* modal */}
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id="my_modal_1addRM" className="modal ">
            <div className="modal-box w-95">
              <h3 className="font-bold text-lg text-center text-green-500">
                Add New Raw materials
              </h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Row Meterial Id"
                  className="input input-success btn-block m-2"
                  onChange={(e) =>
                    setRowmaterialsData({
                      ...rowMaterialsData,
                      rowMaterialId: e.target.value,
                    })
                  }
                  value={rowMaterialsData.rowMaterialId}
                />
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 btn-block"
                  onChange={(e) =>
                    setRowmaterialsData({
                      ...rowMaterialsData,
                      rowMaterialName: e.target.value,
                    })
                  }
                  value={rowMaterialsData.rowMaterialName}
                >
                  <option disabled={false}>Select Raw materials</option>
                  {settingData.length > 0
                    ? settingData.map((data) => (
                        <option value={data.rowMeterialName}>
                          {data.rowMeterialName}
                        </option>
                      ))
                    : null}
                </select>
                <select
                  defaultValue="Pick a Runtime"
                  className="select select-success m-2 btn-block"
                  onChange={(e) =>
                    setRowmaterialsData({
                      ...rowMaterialsData,
                      rowMaterialImage: e.target.value,
                    })
                  }
                  value={rowMaterialsData.rowMaterialImage}
                >
                  <option disabled={false}>Select Raw materials Image</option>
                  {settingData.length > 0
                    ? settingData.map((data) => (
                        <option value={data.rowMeterialImage}>
                          {data.rowMeterialImage}
                        </option>
                      ))
                    : null}
                </select>
                <input
                  type="number"
                  placeholder=""
                  className="input input-success w-30 m-2"
                  onChange={(e) =>
                    setRowmaterialsData({
                      ...rowMaterialsData,
                      tons: e.target.value,
                    })
                  }
                  value={rowMaterialsData.tons}
                />{" "}
                tons
                {rowMaterialsData.rowMaterialImage && (
                  <img
                    src={`${server_url}/Uploads/${rowMaterialsData.rowMaterialImage}`}
                    className="w-30 h-20"
                    alt=""
                  />
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

export default AddRm;
