
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Button, Input } from 'reactstrap'
import Product from '../../apis/user/user'
import { ToastContainer, toast } from 'react-toastify';


function ViewCart() {
    const token = localStorage.getItem('userToken')
    const navigate = useNavigate()

    const [products, setProducts] = useState({
        products: [],
        price: 0
    })



    const getCart = async () => {
        const { data } = await Product.getCart({ data: {}, token: token })
        if (data.data) {
            setProducts({ ...products, products: data.data.products, price: data.data.price })
            console.log(data);
        }
    }
    useEffect(() => {
        console.log(products.products);

        getCart()

    }, [])



    const addToCart = async (e, id) => {
        console.log(e.target.value);

        const { data } = await Product.addtoCart({ data: { product_id: id, qty: e.target.value }, token: token })
        if (data.success) {
            setProducts({ ...products, products: data.data.products, price: data.data.price })
        }
        else {
            toast.error(data.message)
        }


    }

    const removeProduct = async (id) => {
        console.log('remove product=====', id);
        const { data } = await Product.removeProductFromCart({ data: { product_id: id }, token: token })
        if (data.success) {
            setProducts({ ...products, products: data.data.products, price: data.data.price })
        }
    }

    //     return (
    //         // <Card className='mt-5' >
    //         <div className='AllCart'>

    //             {products?.products.length ? <CardBody className='cart-item '>


    //                 <CardGroup className='row'>

    //                     {products.products.map((data, index) => (<Card key={index} className='col-lg-6 col-xl-6 col-md-6'>
    //                         <CardImg
    //                             alt="Card image cap"
    //                             src="https://picsum.photos/318/180"
    //                             top
    //                             width="100%"
    //                         />
    //                         <CardBody>
    //                             <CardTitle tag="h5">
    //                                 Name - {data.product_id.product_name}
    //                             </CardTitle>
    //                             <CardSubtitle
    //                                 className="mb-2 text-muted"
    //                                 tag="h6"
    //                             >
    //                                 Brand - {data.product_id.brand}
    //                             </CardSubtitle>
    //                             <CardText>
    //                                 Details - {data.details}
    //                             </CardText>
    //                             <CardText>
    //                                 Total Price - {data.price}
    //                             </CardText>
    //                             <CardText>
    //                                 QTY - {data.qty}
    //                             </CardText>
    //                             <Input min={1} name='qty' onChange={(e) => { addToCart(e, data.product_id._id) }} defaultValue={data.qty} style={{ width: 80 }} className='mb-2' type='number' />
    //                             <Button onClick={() => removeProduct(data.product_id._id)}>Remove</Button>
    //                         </CardBody>

    //                     </Card>))}
    //                     <CardText>Total - {products.price}</CardText>
    //                 </CardGroup>

    //                 <Button onClick={() => navigate('/checkout')}>Checkout</Button>

    //             </CardBody> : <CardText style={{ textAlign: 'center' }}>Cart is Empty</CardText>}

    //             <ToastContainer />
    // </div>
    //         // </Card>
    //     )

    return (
        <div className='meinmenu'>
            {products.products.length?<>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.products.map((data, index) =>
                        (<tr>
                            <td>{data.product_id.product_name}</td>

                            <td>
                                <Input min={1} name='qty' onChange={(e) => { addToCart(e, data.product_id._id) }} defaultValue={data.qty} style={{ width: 80 }} className='mb-2' type='number' />

                            </td>

                            <td>{data.price}</td>
                            <th scope="row"><button className='btn btn-danger' onClick={() => removeProduct(data.product_id._id)}>Remove</button></th>
                        </tr>))
                        }





                        {/* total */}
                        <tr>
                            <th scope="row">Total Item {products.products.length}</th>
                            <td><b>Total Qty {
                                products?.products?.reduce((accu, obj) => {
                                    return accu + obj.qty
                                }, 0)
                            } </b></td>
                            <td colspan="2"><b>Total Price  {products.price} </b></td>
                        </tr>

                    </tbody>
                </table>

                <div className='d-grid gap-2 col-6 mx-auto my-5'>
                    <button onClick={() => navigate('/checkout')} className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#CongratsModal" >Order Now</button>
                </div>
            </>:<h3 className='text-center'>Cart is Empty</h3>}
            

        </div>
    )

}

export default ViewCart