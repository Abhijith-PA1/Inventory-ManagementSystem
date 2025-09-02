# Row2Ready - Inventory Management System

## 📌 Overview

**Row2Ready** is a **MERN Stack full-stack application** built for a **production-based factory (TMT)**. The system is designed to streamline workflow, enhance warehouse efficiency, and provide an easy way to manage **raw materials**, **finished products**, and **orders**.

The application ensures smooth coordination between different factory operations while offering an **admin dashboard** for complete control over data and users.

---

## ✨ Features

### 🔹 User Pages

* **Home Page**
* **Login Page**
* **Register Page**
* **Raw Material Page**
* **Finished Product Page**
* **New Order Page**

### 🔹 Components

* **Layout**: Header, Footer, Menubar
* **Storage Management**
* **Finished Products**: AddFp, CardFp, EditFp, ViewFp
* **New Orders**: AddNo, CardNo, EditNo, ViewNo
* **Raw Materials**: AddRm, CardRm, EditRm, ViewRm

### 🔹 Admin Panel

* Dashboard
* Finished Products List
* New Orders List
* Raw Materials List
* User List
* Settings

### 🔹 Admin Components

* AddP (Add Product)
* AddRM (Add Raw Material)
* PCard (Product Card)
* RMCard (Raw Material Card)
* UpdateStore

### 🔹 Additional Functionalities

* **Checkbox for Raw Materials**: Separate *used* and *new* raw materials.
* **Checkbox for Orders**: Distinguish *placed* and *new* orders.
* **Context API**: For data sharing and route guarding.

---

## 🛠️ Tech Stack

* **Frontend**: React, Tailwind CSS, DaisyUI, Axios, React Router DOM, React Toastify, React Icons, Chart.js
* **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer, JWT Authentication, Bcrypt
* **Architecture**: MERN (MongoDB, Express, React, Node)

---

## ⚙️ Dependencies

### 🔹 Frontend

```json
"dependencies": {
  "@tailwindcss/vite": "^4.1.11",
  "axios": "^1.11.0",
  "chart.js": "^4.5.0",
  "daisyui": "^5.0.47",
  "react": "^19.1.0",
  "react-chartjs-2": "^5.3.0",
  "react-dom": "^19.1.0",
  "react-icons": "^5.5.0",
  "react-router-dom": "^7.7.1",
  "react-toastify": "^11.0.5",
  "tailwindcss": "^4.1.11"
}
```

### 🔹 Backend

```json
"dependencies": {
  "bcrypt": "^6.0.0",
  "cors": "^2.8.5",
  "dotenv": "^17.2.1",
  "express": "^5.1.0",
  "jsonwebtoken": "^9.0.2",
  "mongodb": "^6.18.0",
  "mongoose": "^8.17.1",
  "multer": "^2.0.2"
}
```

---

## 🚀 Deployment Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Abhijith-PA1/Inventory-ManagementSystem.git
cd inventory-Manementsystem
```

### 2️⃣ Setup Backend

```bash
cd imsServer
npm install
npm start
```

Make sure to create a **.env** file inside the backend folder with the following variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://abhijithpa73:mern@cluster0.ywd7pq1.mongodb.net/imsServer?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=supersecret123
```

### 3️⃣ Setup Frontend

```bash
cd inventory-Manementsystem
npm install
npm run dev
```

The frontend will run on [https://inventory-management-system-lac-phi.vercel.app/](https://inventory-management-system-lac-phi.vercel.app/) (default Vite port).

The backend will run on [https://imsserver-f7sf.onrender.com](https://imsserver-f7sf.onrender.com) (default Vite port).

---

## 📂 Folder Structure

```
Row2Ready/
│── frontend/         # React Frontend
│   ├── components/   # Reusable Components
│   ├── pages/        # Application Pages
│   ├── context/      # Context API for State Management
│   └── ...
│
│── backend/          # Node + Express Backend
│   ├── models/       # Mongoose Schemas
│   ├── routes/       # API Endpoints
│   ├── middleware/   # Authentication & Validation
│   └── index.js      # Entry Point
│
└── README.md
```

---

## 👨‍💻 Usage

* Register/Login as a user.
* Manage **raw materials**, **finished products**, and **orders**.
* Access **admin dashboard** for managing users and factory workflow.
* Track storage and warehouse efficiency with built-in features.

---

## 📊 Future Enhancements

* Role-based access control (Admin, Manager, Staff).
* Real-time order notifications.
* Advanced reporting with charts and analytics.
* Cloud storage for invoices and order documents.

---

## 🏆 Conclusion

**Row2Ready** is a production-ready MERN stack solution tailored for **factory inventory management**. It provides robust functionality, efficient storage management, and seamless workflow tracking, making it a valuable tool for TMT-based production environments.

---
