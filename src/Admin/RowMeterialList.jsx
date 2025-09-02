import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { deleteRowMaterialsAPI, getRowMaterialsAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import { ToastContainer, toast, Bounce } from "react-toastify";

function RowMeterialList() {
  const [rowMaterialsData, setRowmaterialsData] = useState([]);
  // console.log(rowMaterialsData);

  const getAllRowMaterials = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        const result = await getRowMaterialsAPI(reqHeader);
        console.log(result);
        if (result.status == 200) {
          setRowmaterialsData(result.data);
        } else {
          console.log(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getAllRowMaterials();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      try {
        // console.log(id);
        const result = await deleteRowMaterialsAPI(reqHeader, id);
        console.log(result);
        if (result.status == 200) {
          toast.success("Row Material Deleted Successfully");
          getAllRowMaterials();
        } else {
          toast.warning(result.response.data);
        }
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
            <p className="bg-green-300 m-3 p-2 w-fit ml-[70%]">Used Row Materials</p>
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
                    Row Material
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Row Material Id
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Employee Name
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Tons
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
                {rowMaterialsData.length ? (
                  rowMaterialsData.map((rowMaterial, index) => (
                    <tr>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {index + 1} .
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        <img
                          className="md:w-30 md:h-20"
                          src={`${server_url}/Uploads/${rowMaterial.rowMaterialImage}`}
                          alt=""
                        />
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {rowMaterial.rowMaterialName}
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {rowMaterial.rowMaterialId}
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {rowMaterial.userName}
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {rowMaterial.tons}
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {new Date(rowMaterial.updatedAt).toLocaleDateString()}
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {new Date(rowMaterial.updatedAt).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </td>
                      <td className={`md:p-3 p-1  border-2 border-blue-400 ${rowMaterial.usedRowMaterial?"bg-green-300":"bg-orange-300"} text-black `}>
                        {" "}
                        <button className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3" onClick={()=>handleDelete(rowMaterial._id)}>
                          <i class="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No Row Material Exist</p>
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

export default RowMeterialList;
