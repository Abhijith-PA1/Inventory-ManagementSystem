import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { deleteProductsAPI, getProductsAPI } from "../Services/allAPI";
import { server_url } from "../Services/server_url";
import { ToastContainer, toast, Bounce } from "react-toastify";

function FinshedProductList() {
  const [productData, setProductData] = useState([]);
  // console.log(productData);

  const getAllProducts = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getProductsAPI(reqHeader);
      console.log(result);
      if (result.status == 200) {
        setProductData(result.data);
      } else {
        console.log(result.response.data);
      }
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (token) {
      const reqHeader = {
        "authorization": `Bearer ${token}`,
      };
      // console.log(id);
      try {
        const result = await deleteProductsAPI(reqHeader, id);
        console.log(result);
        toast.success("Delete Products Successfull");
        getAllProducts();
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
                    Product
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Product Id
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Employee Name
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Tons
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Diameter(mm)
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
                {productData.length ? (
                  productData.map((products, index) => (
                    <tr>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {index + 1} .
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        <img
                          className="md:w-30 md:h-20"
                          src={`${server_url}/Uploads/${products.productImage}`}
                          alt=""
                        />
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {products.productName}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {products.productId}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {products.userName}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {products.tons}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {products.Diameter}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {new Date(products.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {new Date(products.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-green-400 bg-orange-300 text-black ">
                        {" "}
                        <button className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3" onClick={()=>handleDelete(products._id)}>
                          <i class="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="text-red-700 text-center">No Products Exist</p>
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

export default FinshedProductList;
