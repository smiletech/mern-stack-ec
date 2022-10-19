import { Button } from 'bootstrap'
import React, { useState } from 'react'
import { Card, CardBody, FormGroup, Input, Label, Alert, NavLink } from 'reactstrap'
import Auth from '../../apis/user/user'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
function Register() {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        first_name:'',
        last_name:'',
        email: '',
        password: ''
    })
    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async () => {
        const resData = await Auth.register({ data: login })
        if (resData.data && resData.data.success) {
            navigate('/login')
        }
        else {
            toast.error(resData.data.message)
        }
    }

    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Card className='mt-5' style={{  width: 600, boxShadow: '5px 5px 10px' }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <CardBody>
                <FormGroup>
                        <Label >
                            First Name
                        </Label>
                        <Input
                            onChange={handleChange}

                            name="first_name"
                            placeholder="First Name"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label >
                            Last Name
                        </Label>
                        <Input
                            onChange={handleChange}

                            name="last_name"
                            placeholder="Last Name"
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label >
                            Email
                        </Label>
                        <Input
                            onChange={handleChange}

                            name="email"
                            placeholder="Email"
                            type="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">
                            Password
                        </Label>
                        <Input
                            onChange={handleChange}

                            name="password"
                            placeholder="Password"
                            type="password"
                        />
                    </FormGroup>

                    <button onClick={handleSubmit} className='btn btn-primary shadow-none'>
                        Login
                    </button>
                    
                </CardBody>


            </Card>
            <ToastContainer />
        </div>


    )
}

export default Register