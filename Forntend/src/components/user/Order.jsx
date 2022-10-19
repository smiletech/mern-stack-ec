import React, { useEffect, useState } from 'react'
import Product from '../../apis/user/user'
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Button, Input } from 'reactstrap'

function Order() {
    const token = localStorage.getItem('userToken')
    const [order, setOrder] = useState([])

    const getOrder = async () => {
        const { data } = await Product.getOrder({ data: {}, token })
        setOrder(data.data)
    }

    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div className='mt-5' >


            <CardText style={{ textAlign: 'center', fontSize: 20 }}>Your Order</CardText>
           
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                          
                        </tr>
                    </thead>

            {order.length ?   <tbody>
                   
                    {order.map((data, index) => (
                  <tr>
                  <td>{data.product_id.product_name}</td>
                  <td>
                    <Input disabled min={1} name='qty'  defaultValue={data.qty} style={{ width: 80 }} className='mb-2' type='number' />
                  </td>

                  <td>{data.price}</td>
              </tr>
          
          
                    ))}
                            

                    </tbody> : <CardText style={{ textAlign: 'center' }}>No Orders </CardText>}
            </table>

        </div>
    )
}

export default Order
