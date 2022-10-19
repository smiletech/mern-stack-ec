import { Button } from 'bootstrap'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, FormGroup, Input, Label, Alert, NavLink } from 'reactstrap'
import Auth from '../../apis/user/user'
import { BrowserRouter, Routes, Route, useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
function Login() {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
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
        const resData = await Auth.login({ data: login })
        if (resData.data && resData.data.success) {
            localStorage.setItem('userToken', resData.data.data.token)
            navigate('/')
        }
        else {
            toast.error(resData.data.message)
        }
    }
    useEffect(() => {
        if (localStorage.getItem('userToken')) {
            navigate('/')
        }
    }, [])

    return (

        <div style={{ display: 'flex', justifyContent: 'center' }}>

            <Card className='mt-5' style={{ height: 300, width: 600, boxShadow: '5px 5px 10px' }}>
                <h2 style={{ textAlign: 'center' }}>Login</h2>
                <CardBody>
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
                    <a href='#' onClick={() => navigate('/register')} className='mb-3' style={{ display: 'flex', justifyContent: 'right' }}>
                        Not Account ? Signup</a>
                </CardBody>


            </Card>
            <ToastContainer />
        </div>


    )
}

export default Login