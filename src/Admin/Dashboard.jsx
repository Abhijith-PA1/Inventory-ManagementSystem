import React, { useEffect, useState } from "react";
import MenuBar from "../Components/MenuBar";
import { Chart as ChartJS } from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import {
  getOrdersAPI,
  getProductsAPI,
  getRegisterUserAPI,
  getRowMaterialsAPI,
  getSettingAPI,
} from "../Services/allAPI";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [rowMaterialsData, setRowmaterialsData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [totalStorage, setTotalStorage] = useState();

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
        setTotalStorage(result.data[0].totalStorage);
      } else {
        console.log(result.response.data);
      }
    }
  };

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

  const getAllOrder = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const reqHeader = {
        authorization: `Bearer ${token}`,
      };
      const result = await getOrdersAPI(reqHeader);
      console.log(result);
      if (result.status == 200) {
        setOrderData(result.data);
      } else {
        console.log(result.response.data);
      }
    }
  };

  const getAllUserData = async () => {
    const result = await getRegisterUserAPI();
    if (result.status == 200) {
      setUserData(result.data);
    } else {
      console.log(result.response.data);
    }
  };
  // console.log(userData);
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
    getAllUserData();
    getAllRowMaterials();
    getAllProducts();
    getAllOrder();
    getAllSettings();
  }, []);

  // Filter new raw materials (not used)
  const newRowMaterials = rowMaterialsData.filter(
    (item) => !item.usedRowMaterial
  );

  const openOrders = orderData.filter((order) => order.closedOrder === false);

  return (
    <>
      <div className="flex">
        <div>
          <MenuBar />
        </div>
        <div className="w-full">
          <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 md:grid-rows-3 grid-rows-7 m-10">
            <div className="bg-yellow-300 sm:p-5 p-2 rounded-4xl hover:bg-gray-400 hover:text-white hover:scale-105">
              <h1 className="md:text-6xl text-4xl m-4 text-green-500 hover:text-green-300">
                {userData.length}{" "}
                <span className="md:text-2xl text-xl">Employee</span>
              </h1>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                User
              </p>
              <p className="m-2 md:text-xl text-lg">
                Total No of Registered Employees
              </p>
            </div>
            <div className="bg-yellow-300 sm:p-5 p-2 rounded-4xl hover:bg-gray-400 hover:text-white hover:scale-105">
              <h1 className="md:text-6xl text-4xl m-4 text-blue-500 hover:text-green-300">
                {newRowMaterials.reduce(
                  (acc, item) => acc + (item.tons || 0),
                  0
                )}{" "}
                <span className="md:text-2xl text-xl">Tons</span>
              </h1>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                Row Meterials
              </p>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                Number of loads ={" "}
                <span className="text-red-500">{newRowMaterials.length}</span>
              </p>
              <p className="m-2 md:text-xl text-lg">
                Total tons of row meterials
              </p>
            </div>
            <div className="bg-yellow-300 sm:p-5 p-2 rounded-4xl hover:bg-gray-400 hover:text-white hover:scale-105">
              <h1 className="md:text-6xl text-4xl m-4 text-orange-500 hover:text-green-300">
                {productData.reduce((acc, item) => acc + (item.tons || 0), 0)}{" "}
                <span className="md:text-2xl text-xl">Tons</span>
              </h1>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                Finshed Products
              </p>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                Number of Production Cycles ={" "}
                <span className="text-red-500">{productData.length}</span>
              </p>
              <p className="m-2 md:text-xl text-lg">
                Total tons of finshed products
              </p>
            </div>
            <div className="bg-yellow-300 sm:p-5 p-2 rounded-4xl hover:bg-gray-400 hover:text-white hover:scale-105">
              <h1 className="md:text-6xl text-4xl m-4 text-red-500 hover:text-green-300">
                {openOrders.reduce((acc, item) => acc + (item.tons || 0), 0)}{" "}
                <span className="md:text-2xl text-xl">Tons</span>
              </h1>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                New Orders
              </p>
              <p className="md:text-2xl text-xl m-2 hover:text-yellow-200">
                Number of Orders ={" "}
                <span className="text-red-500">{openOrders.length}</span>
              </p>
              <p className="m-2 md:text-xl text-lg">Total No of New Orders</p>
            </div>
            <div className="bg-yellow-300 sm:p-10 p-5 rounded-4xl sm:row-span-2 row-span-1 sm:col-span-2 col-span-1 hover:scale-105">
              {/* graph */}
              <div className="w-full h-full">
                <Doughnut
                  data={{
                    labels: ["Row Materials", "Products", "Available Storage"],
                    datasets: [
                      {
                        label: "Tons",
                        data: [
                          newRowMaterials.reduce(
                            (acc, item) => acc + (item.tons || 0),
                            0
                          ),
                          productData.reduce(
                            (acc, item) => acc + (item.tons || 0),
                            0
                          ),
                          totalStorage -
                            (newRowMaterials.reduce(
                              (acc, item) => acc + (item.tons || 0),
                              0
                            ) +
                              productData.reduce(
                                (acc, item) => acc + (item.tons || 0),
                                0
                              )),
                        ],
                        backgroundColor: [
                          "rgb(255, 99, 132)",
                          "rgb(54, 162, 235)",
                          "rgb(34, 139, 34)",
                        ],
                        hoverOffset: 4,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,
                  }}
                />
              </div>
            </div>
            <div className="bg-yellow-300 sm:p-20 p-5 rounded-4xl row-span-2  sm:col-span-2 col-span-1 hover:scale-105">
              <h1 className="md:text-2xl text-xl sm:m-5 m-3 ">
                Total Storage :{" "}
                <span className="text-green-600">{totalStorage} Tons</span>
              </h1>
              <h1 className="md:text-2xl text-xl sm:m-5 m-3 ">
                Row Meterials Storage :{" "}
                <span className="text-red-600">
                  {" "}
                  {newRowMaterials.reduce(
                    (acc, item) => acc + (item.tons || 0),
                    0
                  )}{" "}
                  Tons
                </span>
              </h1>
              <h1 className="md:text-2xl text-xl sm:m-5 m-3 ">
                Finshed Products Storage :{" "}
                <span className="text-sky-600">
                  {" "}
                  {productData.reduce(
                    (acc, item) => acc + (item.tons || 0),
                    0
                  )}{" "}
                  Tons
                </span>
              </h1>
              <h1 className="md:text-2xl text-xl sm:m-5 m-3 ">
                Available Storage :{" "}
                <span className="text-green-600">
                  {totalStorage -
                    (newRowMaterials.reduce(
                      (acc, item) => acc + (item.tons || 0),
                      0
                    ) +
                      productData.reduce(
                        (acc, item) => acc + (item.tons || 0),
                        0
                      ))}{" "}
                  Tons
                </span>
              </h1>
              <h1 className="md:text-2xl text-xl sm:m-5 m-3  sm:mt-15 mt-7 overflow-auto">
                High Demanded Item :{" "}
                <span className="text-green-600">
                  {Object.entries(
                    orderData.reduce((acc, order) => {
                      const key = `${order.productName} (${order.Diameter})`;
                      acc[key] = (acc[key] || 0) + 1;
                      return acc;
                    }, {})
                  ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
                </span>
              </h1>
              <h1 className="md:text-2xl text-xl sm:m-5 m-3 overflow-auto ">
                Low Demanded Item :{" "}
                <span className="text-red-600">
                  {Object.entries(
                    orderData.reduce((acc, order) => {
                      const key = `${order.productName} (${order.Diameter})`;
                      acc[key] = (acc[key] || 0) + 1;
                      return acc;
                    }, {})
                  )
                    .sort((a, b) => b[1] - a[1])
                    .slice(-1)[0]?.[0] || "N/A"}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
