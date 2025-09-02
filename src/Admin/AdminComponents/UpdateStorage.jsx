import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { updateStorageSettingAPI } from "../../Services/allAPI";
import { addSettingResponseContext } from "../../ContextAPI/ContextShare";

function UpdateStorage() {
  const [storage, setStorage] = useState();
    const { addSettingResponse, setAddSettingResponse } = useContext(addSettingResponseContext);
  // console.log(storage);

  const handleUpdate = async () => {
    if (!storage || isNaN(storage)) {
      toast.warning("Please enter a valid storage value");
      return;
    } else {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const reqHeader = {
            "authorization": `Bearer ${token}`,
          };

          const reqBody = {
            storage: Number(storage), // make sure it's a number
          };

          // API call to update storage
          try {
            const result = await updateStorageSettingAPI(reqBody,reqHeader)
            console.log(result);
            if(result.status == 200){
              toast.success("Storage updated successfully ");
              setAddSettingResponse(result.data);
            }else{
              toast.warning(result.response.data)
            }
          } catch (err) {
            toast.error(err)
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
          className="btn md:mt-5 m-4 md:text-xl bg-blue-500"
          onClick={() => document.getElementById("my_modal_1addUS").showModal()}
        >
          Update Storage <i class="fa-solid fa-plus "></i>
        </button>
        <dialog id="my_modal_1addUS" className="modal ">
          <div className="modal-box w-95">
            <h3 className="font-bold text-lg text-center text-blue-500">
              Update Storage
            </h3>
            <div className="py-4">
              <input
                type="number"
                placeholder="Update Storage"
                className="input input-success btn-block m-2"
                onChange={(e) => setStorage(e.target.value)}
              />
            </div>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <div className="flex">
                  <button className="btn btn-warning btn-outline m-2">
                    Close
                  </button>
                  <button
                    className="btn btn-primary btn-outline m-2"
                    onClick={handleUpdate}
                  >
                    update
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

export default UpdateStorage;
