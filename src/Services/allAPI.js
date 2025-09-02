import { commonAPI } from "./commonAPI";
import { server_url } from "./server_url";


//registerAPI

export const registerAPI = async (user) => {
    return await commonAPI('POST', `${server_url}/register`, user, "")
}

//loginAPI

export const loginAPI = async (user) => {
    return await commonAPI('POST', `${server_url}/login`, user, "")
}

//getRegisterUserAPI

export const getRegisterUserAPI = async () => {
    return await commonAPI('GET', `${server_url}/getuser`, "", "")
}

//deleteRegisterUserAPI

export const deleteRegisterUserAPI = async (id) => {
    return await commonAPI('DELETE', `${server_url}/${id}/deleteuser`)
}


//Settings

//addRowmaterialSettingAPI

export const addRowMaterialSettingAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${server_url}/setting/addrowmaterial`, reqBody, reqHeader)
}

//deleteRowmaterialSettingAPI

export const deleteRowmaterialSettingAPI = async (id, reqHeader) => {
    return await commonAPI('DELETE', `${server_url}/setting/${id}/deleterowmaterial`, "", reqHeader)
}

//addProductlSettingAPI

export const addProductlSettingAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${server_url}/setting/addproduct`, reqBody, reqHeader)
}

//getSettingAPI

export const getSettingAPI = async (reqHeader) => {
    return await commonAPI('GET', `${server_url}/setting/getsettingsdata`, "", reqHeader)
}

//deleteProductSettingAPI

export const deleteProductSettingAPI = async (id, reqHeader) => {
    return await commonAPI('DELETE', `${server_url}/setting/${id}/deleteproduct`, "", reqHeader)
}

//updateStorageSettingAPI

export const updateStorageSettingAPI = async (reqBody, reqHeader) => {
    return await commonAPI('PUT', `${server_url}/setting/updatestorage`, reqBody, reqHeader)
}

//FinishedProducts

//addProductsAPI

export const addProductsAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${server_url}/finishedproducts/addProduct`, reqBody, reqHeader)
}

//getProductsAPI

export const getProductsAPI = async (reqHeader) => {
    return await commonAPI('GET', `${server_url}/finishedproducts/getProduct`, ' ', reqHeader)
}

//editProductsAPI

export const editProductsAPI = async (reqBody, reqHeader, id) => {
    return await commonAPI('PUT', `${server_url}/finishedproducts/${id}/editProduct`, reqBody, reqHeader)
}

//deleteProductsAPI

export const deleteProductsAPI = async (reqHeader, id) => {
    return await commonAPI('DELETE', `${server_url}/finishedproducts/${id}/deleteProduct`, ' ', reqHeader)
}

//NewOrders

//addOrderAPI

export const addOrderAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${server_url}/newOrders/addNewOrder`, reqBody, reqHeader)
}

//getOrdersAPI

export const getOrdersAPI = async (reqHeader) => {
    return await commonAPI('GET', `${server_url}/newOrders/getNewOrder`, ' ', reqHeader)
}

//editOrdersAPI

export const editOrdersAPI = async (reqBody, reqHeader, id) => {
    return await commonAPI('PUT', `${server_url}/newOrders/${id}/editNewOrder`, reqBody, reqHeader)
}

//deleteOrdersAPI

export const deleteOrdersAPI = async (reqHeader, id) => {
    return await commonAPI('DELETE', `${server_url}/newOrders/${id}/deleteNewOrder`, ' ', reqHeader)
}

//rowMatrials

//addRowMaterialsAPI

export const addRowMaterialsAPI = async (reqBody, reqHeader) => {
    return await commonAPI('POST', `${server_url}/rowMaterials/addRowMaterials`, reqBody, reqHeader)
}

//getRowMaterialsAPI

export const getRowMaterialsAPI = async (reqHeader) => {
    return await commonAPI('GET', `${server_url}/rowMaterials/getRowMaterials`, ' ', reqHeader)
}

//editRowMaterialsAPI

export const editRowMaterialsAPI = async (reqBody, reqHeader, id) => {
    return await commonAPI('PUT', `${server_url}/rowMaterials/${id}/editRowMaterials`, reqBody, reqHeader)
}

//deleteRowMaterialsAPI

export const deleteRowMaterialsAPI = async (reqHeader, id) => {
    return await commonAPI('DELETE', `${server_url}/rowMaterials/${id}/deleteRowMaterials`, ' ', reqHeader)
}