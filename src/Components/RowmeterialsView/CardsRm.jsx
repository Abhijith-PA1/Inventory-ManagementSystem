import React, { useContext } from "react";
import EditRm from "./EditRm";
import { server_url } from "../../Services/server_url";
import { toast } from "react-toastify";
import {
  deleteRowMaterialsAPI,
  editRowMaterialsAPI,
} from "../../Services/allAPI";
import { deleteResponseContext, editResponseContext } from "../../ContextAPI/ContextShare";

function CardsRm({ rowMaterial, onUpdate }) {
  const { deleteResponse, setDeleteResponse } = useContext(
    deleteResponseContext
  );
  const { editResponse, setEditResponse } = useContext(editResponseContext);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const id = rowMaterial._id;
        const result = await deleteRowMaterialsAPI(reqHeader, id);
        console.log(result);
        if (result.status == 200) {
          toast.success("Row Material Deleted Successfully");
          setDeleteResponse(result.data);
        } else {
          toast.warning(result.response.data);
        }
      } catch (err) {
        toast.error(err);
      }
    }
  };

  const handleCheckboxToggle = async (e) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const updatedData = {
        ...rowMaterial,
        usedRowMaterial: e.target.checked,
      };
      try {
        const result = await editRowMaterialsAPI(
          updatedData,
          reqHeader,
          rowMaterial._id
        );
        if (result.status === 200) {
          toast.success("Material status updated");
          setEditResponse(result.data);
          if (onUpdate) onUpdate(); // refresh data from parent
        } else {
          toast.warning(result.response?.data || "Failed to update");
        }
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <>
      <div className="card sm:mx-5">
        <div className="sm:flex flex-wrap justify-between bg-white sm:mx-10 m-2 mx-4 sm:p-5 p-3 w-fill h-auto hover:scale-105">
          <img
            width={"50px"}
            src={`${server_url}/Uploads/${rowMaterial.rowMaterialImage}`}
            alt=""
            className="sm:mx-3 sm:m-2"
          />
          <h3 className="sm:mx-3 sm:m-2">id :{rowMaterial.rowMaterialId}</h3>
          <h3 className="sm:mx-3 sm:m-2">
            name : {rowMaterial.rowMaterialName}
          </h3>
          <p className="sm:mx-3 sm:m-2">tons :{rowMaterial.tons}</p>
          <button
            className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3"
            onClick={handleDelete}
            disabled={rowMaterial.usedRowMaterial && "disabled"}
          >
            <i class="fa-solid fa-trash fa-xl"></i>
          </button>
          <EditRm rowMaterial={rowMaterial} />
          <input
            type="checkbox"
            className="checkbox checkbox-error border-green-600 sm:m-2 m-2"
            checked={rowMaterial.usedRowMaterial}
            onChange={handleCheckboxToggle}
          />
        </div>
      </div>
    </>
  );
}

export default CardsRm;
