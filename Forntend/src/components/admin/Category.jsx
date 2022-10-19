
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
  const [catData, setCatData] = useState({
    category:'',
  })
  const [isOpenModal, setIsOpenModal] = useState(false)

  const getCategory = async () => {
    const { data } = await Category.getAllCategory({token: token})
    console.log('data====>',data);
    setCategory(data.data)
}
  useEffect(() => {
    getCategory()
    if (!localStorage.getItem('adminToken')) {
      navigate('/admin-login')
  }
  }, [])


const handleChange = (e)=>{
    setCatData({
    ...catData,
    [e.target.name]: e.target.value
})
}


const handleSubmit = async()=>{
  const {data} = await AdminCategory.addCategory({data:catData, token:token})
  if(data.success){
    getCategory()
    setIsOpenModal(false)
  }
}

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Card className='mt-5' style={{ width: 900, boxShadow: '5px 5px 10px' }}>
        <h4 style={{ textAlign: 'center' }}>Category</h4>
        <Button onClick={() => setIsOpenModal(true)} style={{ width: 200, margin: 'auto' }} color='primary' className='shadow-none'>Add Categories</Button>
        <div>
          <Modal isOpen={isOpenModal}>
            <ModalHeader>
              Add Category
            </ModalHeader>
            <ModalBody>
              <CardBody>

                <FormGroup>

                  <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="name"
                    placeholder="Category Name"
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
                  Category Name
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((data, index) => <tr key={index}>
                <th scope="row">
                  {index + 1}
                </th>
                <td>
                  {data.name}
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