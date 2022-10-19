
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, FormGroup, Input, Table, ModalBody, ModalFooter, Modal, Button, ModalHeader } from 'reactstrap'
import Product from '../../apis/admin/admin'
import Category from '../../apis/user/user'
import AdminCategory from '../../apis/admin/admin'


function CategoryCom() {
  const navigate=useNavigate()
  let token = localStorage.getItem('adminToken')
  const [categories, setCategory] = useState([])
  const [types, setType] = useState([])
  const [typeData, setTypeData] = useState({
    type:'',
    category:''
  })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const getCategory = async () => {
    const { data } = await Category.getAllCategory({token: token})
    console.log('data====>',data);
    setCategory(data.data)
}

const getType = async () => {
  const { data } = await AdminCategory.getType({token: token})
  console.log('data====>',data);
  setType(data.data)
}
  useEffect(() => {
    getCategory()
    getType()
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin-login')
  }
  }, [])


const handleChange = (e)=>{
    setTypeData({
    ...typeData,
    [e.target.name]: e.target.value
})
}


const handleSubmit = async()=>{
  const {data} = await AdminCategory.addType({data:typeData, token:token})
  if(data.success){
    getCategory()
    getType()
    setIsOpenModal(false)
  }
}

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card className='mt-5' style={{ width: 900, boxShadow: '5px 5px 10px' }}>
        <h4 style={{ textAlign: 'center' }}>Type</h4>
        <Button onClick={() => setIsOpenModal(true)} style={{ width: 200, margin: 'auto' }} color='primary' className='shadow-none'>Add Type</Button>
        <div>
          <Modal isOpen={isOpenModal}>
            <ModalHeader>
              Add Type
            </ModalHeader>
            <ModalBody>
              <CardBody>

                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="type"
                    placeholder="Type Name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="category"
                    placeholder="Category Name"
                    type="select"
                  >
                    {categories.map((data, index)=>(

                    <option value={data._id}>{data.name}</option>
                    ))}
                  </Input>
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
                   Type
                </th>
              </tr>
            </thead>
            <tbody>
              {types.map((data, index) => <tr key={index}>
                <th scope="row">
                  {index + 1}
                </th>
                <td>
                  {data.type}
                </td>
              </tr>)}
            </tbody>
          </Table>
        </CardBody>
      </Card>

    </div>
  )
}

export default CategoryCom