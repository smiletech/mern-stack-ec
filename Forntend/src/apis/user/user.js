import URL from '../../env/Url'
import axios from 'axios'

const login = async (payload) => {
    const { data } = payload
    const loginData = await axios.post(`${URL}/user/login`, data)
    return loginData
}


const register = async (payload) => {
    const { data } = payload
    const loginData = await axios.post(`${URL}/user/register`, data)
    return loginData
}


const getAllProduct = async(payload)=>{
    const {data, token} = payload
    console.log(payload);
    const productData = await axios.post(`${URL}/user/getAllProduct`, data, {headers:{'x-access-token':token}})
    return productData
}

const getAllCategory = async(payload)=>{
    const {data, token} = payload
    const catData = await axios.post(`${URL}/user/getAllCategory`, data, {headers:{'x-access-token':token}})
    return catData
}

const getTypeById = async(payload)=>{
    const {data, token} = payload
    const catData = await axios.post(`${URL}/user/getTypeById/${data.id}`, data, {headers:{'x-access-token':token}})
    return catData
}


const getCart = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/user/getCart`, data, {headers:{'x-access-token':token}})
    return productData
}

const addtoCart = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/user/addtoCart`, data, {headers:{'x-access-token':token}})
    return productData
}

const placeOrder = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/user/placeOrder`, data, {headers:{'x-access-token':token}})
    return productData
}

const getOrder = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/user/getOrder`, data, {headers:{'x-access-token':token}})
    return productData
}

const removeProductFromCart = async(payload)=>{
    const {data, token} = payload
    const productData = await axios.post(`${URL}/user/removeProductFromCart`, data, {headers:{'x-access-token':token}})
    return productData
}
export  default{
    login,
    register,
    getAllProduct,
    getAllCategory,
    getTypeById,
    getCart,
    addtoCart,
    placeOrder,
    getOrder,
    removeProductFromCart
}