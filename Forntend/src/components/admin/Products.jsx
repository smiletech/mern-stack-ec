
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, FormGroup, Input, Table, ModalBody, ModalFooter, Modal, Button, ModalHeader } from 'reactstrap'
import Product from '../../apis/admin/admin'
import Category from '../../apis/user/user'

function Products() {
  const navigate=useNavigate()
  let token = localStorage.getItem('adminToken')
  const [products, setProducts] = useState([])
  const [categories, setCategory] = useState([])
  const [categoryId, setCategoryId] = useState('')
  const [types, setType] = useState([])
  const [productData, setProductData] = useState({
    product_name:'',
    category:'',
    type:'',
    qty:0,
    price:0,
    details:''
  })
  const [isOpenModal, setIsOpenModal] = useState(false)
  const getAllProduct = async () => {
    const { data } = await Product.getAllProduct({ data: {}, token: token })
    if (data.success) {
      setProducts(data.data.docs)
    }
    console.log(data);
  }

  const getType = async () => {
    const { data } = await Category.getTypeById({token: token, data:{id:categoryId}})
    console.log('data====>',data);
    setType(data.data)
  }

  const getCategory = async () => {
    const { data } = await Category.getAllCategory({token: token})
    console.log('data====>',data);
    setCategory(data.data)
    
    setProductData({...productData, type:types[0]._id})
}
  useEffect(() => {
    getCategory()
    getAllProduct()
    console.log('products====', products);
    getType()
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin-login')
  }
  }, [categoryId])


const handleChange = (e)=>{
  setProductData({
    ...productData,
    [e.target.name]: e.target.value
})
}


const handleSubmit = async()=>{
  console.log(types[0]._id);
  const {data} = await Product.addProduct({data:productData, token:token})
  if(data.success){
    getAllProduct()
    setIsOpenModal(false)
  }
}

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card className='mt-5' style={{ width: 900, boxShadow: '5px 5px 10px' }}>
        <h4 style={{ textAlign: 'center' }}>Products</h4>
        <Button onClick={() => setIsOpenModal(true)} style={{ width: 200, margin: 'auto' }} color='primary' className='shadow-none'>Add Product</Button>
        <div>
          <Modal isOpen={isOpenModal}>
            <ModalHeader>
              Add Product
            </ModalHeader>
            <ModalBody>
              <CardBody>

                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="product_name"
                    placeholder="Product Name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>

                  <Input type='select' onChange={(e)=>{
                    setProductData({...productData, category:e.target.value})
                    setCategoryId(e.target.value)
                  }}>
                    <option value={''}>{'Select Category'}</option>
                    {categories.map((data, index)=>(
                    <option value={data._id}>{data.name}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>

                  <Input defaultValue={types[0]?._id} type='select' onChange={(e)=>{
                    setProductData({...productData, type:e.target.value})
                  }}>
                  <option value={''}>Select Type</option>
                    {types.map((data, index)=>(
                    <option value={data._id}>{data.type}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="qty"
                    placeholder="QTY"
                    type="number"
                  />
                </FormGroup>
                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="price"
                    placeholder="Price"
                    type="number"
                  />
                </FormGroup>
                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="details"
                    placeholder="Details"
                    type="text"
                  />
                </FormGroup>
                <Button
               
                className='shadow-none'
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
              </CardBody>
            </ModalBody>
            <ModalFooter>
              <Button
                className='shadow-none'
                color="secondary"
                onClick={() => setIsOpenModal(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>
        </div>

        <CardBody>
          <Table hover>
            <thead>
              <tr>
                <th>
                  Sn
                </th>
                <th>
                  Product Name
                </th>
                <th>
                  Category
                </th>
                <th>
                  Type
                </th>
                <th>
                  QTY
                </th>
                <th>
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {products?.map((data, index) => <tr key={index}>
                <th scope="row">
                  {index + 1}
                </th>
                <td>
                  {data.product_name}
                </td>
                <td>
                  {data.category.name}
                </td>
                <td>
                  {data.type.type}
                </td>
                <td>
                  {data.qty}
                </td>
                <td>
                  {data.price}
                </td>
              </tr>)}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    </div>
  )
}

export default Products