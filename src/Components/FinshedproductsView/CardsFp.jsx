import React, { useContext } from "react";
import EditFp from "./EditFp";
import { server_url } from "../../Services/server_url";
import { deleteProductsAPI } from "../../Services/allAPI";
import { toast } from "react-toastify";
import { deleteResponseContext } from "../../ContextAPI/ContextShare";

function CardsFp({ products }) {
  const { deleteResponse, setDeleteResponse } = useContext(deleteResponseContext);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "authorization": `Bearer ${token}`,
      };
      const id = products._id;
      try {
        const result = await deleteProductsAPI(reqHeader, id);
        console.log(result);
        toast.success("Delete Products Successfull")
        setDeleteResponse(result.data);
      } catch (err) {
        toast.error(err)
      }
    }
  };

  return (
    <>
      <div className="card sm:ms-5 m-3">
        <div className="bg-white w-fit h-fit  rounded-2xl hover:scale-105">
          <img
            src={`${server_url}/Uploads/${products.productImage}`}
            alt=""
            className="sm:mx-3 sm:m-2 m-1 md:w-[250px] md:h-[180px] w-[125px] h-[90px]"
          />
          <h3 className="sm:m-3 m-1">id :{products.productId}</h3>
          <h3 className="sm:m-3 m-1">name : {products.productName}</h3>
          <p className="sm:m-3">tons :{products.tons}</p>
          <p className="sm:m-3">Diameter(mm) :{products.Diameter}</p>
          <div className="flex justify-between">
            <button
              className="text-red-600 btn btn-outline hover:bg-red-400 sm:m-3 m-1"
              onClick={handleDelete}
            >
              <i class="fa-solid fa-trash fa-xl"></i>
            </button>
            <EditFp  products={products}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardsFp;
