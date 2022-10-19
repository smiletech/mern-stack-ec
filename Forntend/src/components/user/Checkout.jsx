import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CardBody, FormGroup, Input, Button } from 'reactstrap'
import Product from '../../apis/user/user'
import { ToastContainer, toast } from 'react-toastify';

function Checkout() {
    const navigate = useNavigate()
    const token = localStorage.getItem('userToken')
    const [details, setDetails] = useState({
        name:'',
        mobile:0,
        address:'',
        pin:0

    })
    const handleChange = (e) => {
        setDetails({
            ...details,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        console.log(details);
        const { data } = await Product.placeOrder({ data: details, token })
        if (data.success) {
            navigate('/thankyou')
        }
        else{
toast.error(data.message)
        }
    }
    return (
        <CardBody>

            <FormGroup>

                <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="name"
                    placeholder="Full Name"
                    type="text"
                />
            </FormGroup>
            <FormGroup>

                <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="mobile"
                    placeholder="Mobile"
                    type="text"
                />
            </FormGroup>
            <FormGroup>

                <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="address"
                    placeholder="Address"
                    type="text"
                />
            </FormGroup>
            <FormGroup>

                <Input
                    className='shadow-none'
                    onChange={handleChange}

                    name="pin"
                    placeholder="Pin"
                    type="number"
                />
            </FormGroup>
            <Button

                className='shadow-none'
                color="primary"
                onClick={handleSubmit}
            >
                Place Order
            </Button>
            <ToastContainer />
        </CardBody>
    )
}

export default Checkout