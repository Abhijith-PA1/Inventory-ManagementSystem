
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import RowMeterials from './Pages/RowMeterials'
import FinshedProducts from './Pages/FinshedProducts'
import NewOrders from './Pages/NewOrders'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Dashboard from './Admin/Dashboard'
import UsersList from './Admin/UsersList'
import RowMeterialList from './Admin/RowMeterialList'
import FinshedProductList from './Admin/FinshedProductList'
import NewOrderList from './Admin/NewOrderList'
import Settings from './Admin/Settings'
import { useContext } from 'react'
import { adminTokenAuthContext, tokenAuthContext } from './ContextAPI/TokenAuth'

function App() {

  const { isAuthorized, setIsAuthorized } = useContext(tokenAuthContext);
  const { adminIsAuthorized, setAdminIsAuthorized } = useContext(adminTokenAuthContext);

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/rowmeterials' element={isAuthorized?<RowMeterials/>:<Home/>}/>
      <Route path='/finshedproducts' element={isAuthorized?<FinshedProducts/>:<Home/>}/>
      <Route path='/neworders' element={isAuthorized?<NewOrders/>:<Home/>}/>
      <Route path='/dashboard' element={adminIsAuthorized?<Dashboard/>:<Home/>}/>
      <Route path='/userlist' element={adminIsAuthorized?<UsersList/>:<Home/>}/>
      <Route path='/rowmeteriallist' element={adminIsAuthorized?<RowMeterialList/>:<Home/>}/>
      <Route path='/finshedproductlist' element={adminIsAuthorized?<FinshedProductList/>:<Home/>}/>
      <Route path='/neworderlist' element={adminIsAuthorized?<NewOrderList/>:<Home/>}/>
      <Route path='/setting' element={adminIsAuthorized?<Settings/>:<Home/>}/>
    </Routes>
    <Footer/>  
    </>
  )
}

export default App
