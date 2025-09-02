import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { registerAPI } from "../Services/allAPI";

function Register() {
  const [employeeData, setEmployeeData] = useState({
    employeename: "",
    employeeid: "",
    email: "",
    password: "",
    user: true,
  });
  const [ loading , setLoading ]  = useState(false);
  const [ error, setError ] = useState(false)
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // console.log(employeeData);
    const { employeename, employeeid, email, password } = employeeData;
    if (!employeename || !employeeid || !email || !password) {
      toast.warning("fill the missing fields");
      setError(true)
    } else {
      try {
        const result = await registerAPI(employeeData);
        // console.log(result);
        if (result.status == 200) {
          toast.success(
            `${result.data.employeename} is Registered successfully`
          );
          setEmployeeData({
            employeename: "",
            employeeid: "",
            email: "",
            password: "",
          });
          setLoading(true)
          setError(false)
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.warning(result.response.data);
          setError(true)
        }
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className=" w-95 h-125">
          <h1 className="text-center m-6 text-4xl text-yellow-700 font-bold shadow-2xs ">
            Register
          </h1>
          <div>
            <input
              type="text"
              placeholder="Employee Name"
              className={`input text-xl ${error?'border-red-700':'input-warning'} input-md btn-block my-3`}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  employeename: e.target.value,
                })
              }
              value={employeeData.employeename}
            />
            <input
              type="text"
              placeholder="Employee Id"
              className={`input text-xl ${error?'border-red-700':'input-warning'} input-md btn-block my-3`}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  employeeid: e.target.value,
                })
              }
              value={employeeData.employeeid}
            />
            <input
              type="email"
              placeholder="Email id"
              className={`input text-xl ${error?'border-red-700':'input-warning'} input-md btn-block my-3`}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  email: e.target.value,
                })
              }
              value={employeeData.email}
            />
            <input
              type="password"
              placeholder="Password"
              className={`input text-xl ${error?'border-red-700':'input-warning'} input-md btn-block my-3`}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  password: e.target.value,
                })
              }
              value={employeeData.password}
            />
            <button
              className="btn btn-outline btn-warning my-3 btn-block text-xl btn-circle"
              onClick={handleRegister}
            >
            {loading?<span className="loading loading-spinner text-success"></span>:"Register"}
            </button>
            <h4 className="text-center">
              if you register-
              <Link to={"/login"} className="text-green-700" href="">
                Login
              </Link>{" "}
            </h4>
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

export default Register;
