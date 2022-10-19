import URL from '../../env/Url'
import axios from 'axios'

const login = async (payload) => {
    const { data } = payload
    const loginData = await axios.post(`${URL}/admin/login`, data)
    return loginData
}


const getAllProduct = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/admin/getAllProduct`, data, {headers:{'x-access-token':token}})
    return productData
}

const addProduct = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/admin/addProduct`, data, {headers:{'x-access-token':token}})
    return productData
}

const addCategory = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/admin/addCategory`, data, {headers:{'x-access-token':token}})
    return productData
}

const addType = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/admin/addType`, data, {headers:{'x-access-token':token}})
    return productData
}

const getType = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/admin/getType`, data, {headers:{'x-access-token':token}})
    return productData
}

export  default{
    login,
    getAllProduct,
    addProduct,
    addCategory,
    addType,
    getType
}