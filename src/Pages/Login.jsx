import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { loginAPI } from "../Services/allAPI";

function Login() {
  const [employeeData, setEmployeeData] = useState({
    email: "",
    password: "",
    user: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(employeeData);
    const { email, password } = employeeData;
    if (!email || !password) {
      toast.warning("fill the missing fields");
      setError(true);
    } else {
      try {
        const result = await loginAPI(employeeData);
        // console.log(result);
        if (result.status == 200) {
          if (result.data.existingUser.user == true) {
            localStorage.setItem(
              "employeename",
              result.data.existingUser.employeename
            );
            localStorage.setItem("user", result.data.existingUser.user);
            localStorage.setItem("token", result.data.token);
            toast.success(" Employee Login successfull");
            setLoading(true);
            setTimeout(() => {
              navigate("/rowmeterials");
            }, 2000);
          } else {
            localStorage.setItem(
              "employeename",
              result.data.existingUser.employeename
            );
            localStorage.setItem("user", result.data.existingUser.user);
            localStorage.setItem("token", result.data.token);
            toast.success("Admin Login Successfull");
            setLoading(true);
            setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
          }
        } else {
          toast.warning(result.response.data);
          setError(true);
        }
      } catch (err) {
        toast.error(err);
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className=" w-95 h-85">
          <h1 className="text-center m-6 text-4xl text-green-700 font-bold shadow-2xs ">
            Login
          </h1>
          <div>
            <input
              type="email"
              placeholder="Email id"
              className={`input text-xl ${
                error ? "border-red-700" : "input-success"
              } input-md btn-block my-3`}
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
              className={`input text-xl ${
                error ? "border-red-700" : "input-success"
              } input-md btn-block my-3`}
              onChange={(e) =>
                setEmployeeData({
                  ...employeeData,
                  password: e.target.value,
                })
              }
              value={employeeData.password}
            />
            <button
              className="btn btn-outline btn-success my-3 btn-block text-xl btn-circle"
              onClick={handleLogin}
            >
              {loading ? (
                <span className="loading loading-spinner text-success"></span>
              ) : (
                "Login"
              )}
            </button>
            <h4 className="text-center">
              <Link to={"/register"} className="text-red-700" href="">
                Register
              </Link>{" "}
              before login
            </h4>
            <p className="text-center m-2 text-blue-400">
              <a href=""> forgot your password ?</a>
            </p>
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

export default Login;
