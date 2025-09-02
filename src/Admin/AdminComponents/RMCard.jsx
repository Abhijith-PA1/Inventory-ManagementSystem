import React, { useContext } from "react";
import { server_url } from "../../Services/server_url";
import { deleteRowmaterialSettingAPI } from "../../Services/allAPI";
import { toast } from "react-toastify";
import { deleteSettingResponseContext } from "../../ContextAPI/ContextShare";

function RMCard({ rowMaterilas }) {  
  const { deleteSettingResponse, setDeleteSettingResponse } = useContext(deleteSettingResponseContext);

  const handleDelete = async() => {
    const id = rowMaterilas._id
    const token = localStorage.getItem("token");

    if (token) {
      //reqHeader - multipart/form-data
      const reqHeader = {
        "authorization": `Bearer ${token}`,
      };
      //api call
      try {
        const result = await deleteRowmaterialSettingAPI(id, reqHeader);
        console.log(result);
        
        if (result.status == 200) {
          toast.success("Row Material delete successfull");
          setDeleteSettingResponse(result.data);
        }else{
          toast.warning(result.response.data);
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
            src={`${server_url}/Uploads/${rowMaterilas?.rowMeterialImage}`}
            alt=""
            className="sm:mx-3 sm:m-2 sm:w-30 w-20 sm:h-20 h-15"
          />
          <h3 className="sm:mx-3 sm:m-2">
            name : {rowMaterilas.rowMeterialName}
          </h3>
          <button
            className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3"
            onClick={handleDelete}
          >
            <i class="fa-solid fa-trash fa-xl"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default RMCard;
