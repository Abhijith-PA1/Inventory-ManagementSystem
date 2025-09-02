import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { deleteRegisterUserAPI, getRegisterUserAPI } from "../Services/allAPI";
import { ToastContainer, toast, Bounce } from "react-toastify";

function UsersList() {
  const [userData, setUserData] = useState([]);

  const getAllUserData = async () => {
    const result = await getRegisterUserAPI();
    if (result.status == 200) {
      setUserData(result.data);
    } else {
      console.log(result.response.data);
    }
  };
  // console.log(userData);

  useEffect(() => {
    getAllUserData();
  }, []);

  const handleDelete = async(id) => {
    try {
      // console.log(id);
      const result = await deleteRegisterUserAPI(id)
      // console.log(result);
      if(result.status==200){
        toast.success("Delete User Successfull")
        getAllUserData();
      }else{
        toast.warning(result.response.data);
      }
    } catch (err) {
      toast.error(err);
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
                    Employee Id
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Employee Name
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Email Id
                  </th>
                  <th className="md:p-5 p-2  border-2 border-yellow-400 bg-amber-800 text-white ">
                    Date Of Registered
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
                {userData.length ? (
                  userData.map((user, index) => (
                    <tr>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {index + 1} .
                      </td>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {user.employeeid}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {user.employeename}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {user.email}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {new Date(user.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="md:p-3 p-1  border-2 border-red-400 bg-orange-300 text-black ">
                        {" "}
                        <button
                          className="text-red-600 btn btn-outline hover:bg-red-400 sm:mx-3"
                          onClick={()=>handleDelete(user._id)}
                        >
                          <i class="fa-solid fa-trash fa-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="text-red-700 text-center">No Users Exist...</p>
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

export default UsersList;
