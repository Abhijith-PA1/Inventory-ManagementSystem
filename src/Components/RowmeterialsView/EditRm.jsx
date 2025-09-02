import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server_url } from "../../Services/server_url";
import { editRowMaterialsAPI, getSettingAPI } from "../../Services/allAPI";
import { editResponseContext } from "../../ContextAPI/ContextShare";

function EditRm({ rowMaterial }) {
  const [settingData, setSettingData] = useState([]);
  const [rowMaterialsData, setRowmaterialsData] = useState({
    rowMaterialId: rowMaterial.rowMaterialId,
    rowMaterialName: rowMaterial.rowMaterialName,
    rowMaterialImage: rowMaterial.rowMaterialImage,
    tons: rowMaterial.tons,
    userName: rowMaterial.userName,
    usedRowMaterial: rowMaterial.usedRowMaterial,
  });
  const { editResponse, setEditResponse } = useContext(editResponseContext);
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

  const handleEdit = async () => {
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
            const id = rowMaterial._id;
            const result = await editRowMaterialsAPI(
              rowMaterialsData,
              reqHeader,
              id
            );
            console.log(result);
            if (result.status == 200) {
              toast.success("Row Materials Edited Successfully");
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
          className="btn btn-outline hover:bg-yellow-300 bg-yellow-400 sm:mx-3 my-1"
          onClick={() =>
            document
              .getElementById(`my_modal_1editRM${rowMaterial._id}`)
              .showModal()
          }
          disabled={rowMaterial.usedRowMaterial && "disabled"}
        >
          <i class="fa-regular fa-pen-to-square fa-xl"></i>
        </button>
        {/* modal */}
        <div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <dialog id={`my_modal_1editRM${rowMaterial._id}`} className="modal ">
            <div className="modal-box w-95">
              <h3 className="font-bold text-lg text-center text-yellow-500">
                Edit Raw materials
              </h3>
              <div className="py-4">
                <input
                  type="text"
                  placeholder="Edit Meterial Id"
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

export default EditRm;
