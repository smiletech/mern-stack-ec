import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardBody, CardGroup, CardImg, CardSubtitle, CardText, CardTitle, Button, Input } from 'reactstrap'
import Product from '../../apis/user/user'
import Category from '../../apis/user/user'
import InfiniteScroll from 'react-infinite-scroll-component';
import { ToastContainer, toast } from 'react-toastify';

function Home() {
    const navigate = useNavigate()
    const token = localStorage.getItem('userToken')
    const [products, setProduct] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [typeId, setTypeId] = useState('')
    const [categories, setCategory] = useState([])
    const [types, setTypes] = useState([])
    // const [brand, setBrand] = useState('')
    const [qty, setQty] = useState(1)
    const [limit, setLimit] = useState(10)
    const [cart, setCart] = useState([])

    const getAllProduct = async (id) => {
        const { data } = await Product.getAllProduct({ data: { category:categoryId, type:typeId, limit }, token: token })
        setProduct(data.data.docs)
    }
    const getCategory = async () => {
        const { data } = await Category.getAllCategory({token: token})
        console.log('data====>',data);
        setCategory(data.data)
    }

    const getType = async (id) => {
        console.log('id====>', id);
        const { data } = await Category.getTypeById({token, data:{id}})
        setTypes(data.data)
    }
    


    const getCart = async () => {
        const { data } = await Product.getCart({ data: {}, token: token })
        if (data.success) {
            setCart(data.data.products)
            console.log(data);
        }

    }


    useEffect(() => {
        if (!localStorage.getItem('userToken')) {
            navigate('/login')
        }
        getCategory()
        getAllProduct()
        getCart()

    }, [categoryId, typeId, limit])
    const logOut = () => {
        localStorage.removeItem('userToken')
        navigate('/login')
    }
    

    const addToCart = async (id) => {
        const { data } = await Product.addtoCart({ data: { product_id: id, qty }, token: token })
        if (data.success) {
            setCart(data.data.products)
            console.log(data.data.products);
            toast.success('Product Added to Cart')
        }
        else {
            toast.error(data.message)
        }
    }



    const fetchMoreData = async () => {
      setTimeout(() => {
        setLimit(limit+10)
      }, 1500);
    }

    return (
        <>
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={""} alt="Logo" width="70" height="74" className="d-inline-block align-text-top" />
                    </a>

                    <i onClick={() => navigate('/view-cart')} style={{ cursor: 'pointer', marginRight: 30, color: 'blue' }} className="fas fa-shopping-cart mr-3" aria-hidden="true">Cart {(cart && cart.length) ? cart.length : 0}</i>

                </div>

            </nav>

            <div className='d-flex my-4'>

                <select onChange={(e)=>{
                    getType(e.target.value)
                    setTypeId('')
                    setCategoryId(e.target.value)
                    getAllProduct(e.target.value)
                }} className="form-select mx-2" aria-label="Default select example">
                
                    <option selected value="">All</option>
                    {categories.map((data, index)=>(
                        <option key={index} value={data._id}>{data.name}</option>
                    ))}
                </select>

                <select onChange={(e)=>{
                    setTypeId(e.target.value)
                }} className="form-select mx-2" aria-label="Default select example">
                    <option value={''} selected>All</option>
                    {
                        types.map(item=><><option value={item._id}>{item.type}</option></>)
                    }
                    
                    
                </select>


            </div>
            <div className='conatiner'>

            </div>
            {/* card */}

            
            <InfiniteScroll
          dataLength={products.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
              <div className='AllCart'>

                {products?.map((data, index) => (
                    <div className="card mx-4 my-4">
                        <img src={'https://picsum.photos/318/180'} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title text-end"> ₹ {data.price}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{data.product_name}</h6>
                            <p className="card-text">
                                {data.qty}</p>
                                <div className='d-flex justify-content-around '>
                            <Input min={1} disabled={data.qty >= 1 ? false : true} name='qty' onChange={(e) => setQty(e.target.value)} defaultValue={1} style={{ width: 80 }} className='mb-2' type='number' />
                            <button disabled={data.qty >= 1 ? false : true} onClick={() => addToCart(data._id)} className="btn btn-primary ms-2">Add</button>
                        </div>
                        </div>

                    </div>
                ))}

            </div>
            </InfiniteScroll>

            <ToastContainer />
        </>
    )

    // return (

    //     <Card className='mt-5' >
    //         <CardBody>
    //             <i onClick={() => navigate('/view-cart')} style={{   cursor: 'pointer', marginRight:30, color:'blue' }} className="fas fa-shopping-cart mr-3" aria-hidden="true">Cart {(cart && cart.length) ? cart.length : 0}</i>
    //             <a href='#' onClick={() => navigate('/view-order')} style={{ justifyContent: 'right' }} aria-hidden="true"> Your Order</a>
    //             <a href='#' onClick={ logOut} style={{marginLeft:50, justifyContent: 'right' }} aria-hidden="true"> Logout</a>
    //             <CardGroup className='row'>
    //                 {products.map((data, index) => (<Card key={index} className='col-lg-6 col-xl-6 col-md-6'>
    //                     <CardImg
    //                         alt="Card image cap"
    //                         src="https://picsum.photos/318/180"
    //                         top
    //                         width="100%"
    //                     />
    //                     <CardBody>
    //                         <CardTitle tag="h5">
    //                             {data.product_name}
    //                         </CardTitle>
    //                         <CardSubtitle

    //                             style={{ cursor: 'pointer' }}
    //                             onClick={() => getProductByBrand(data.brand)}
    //                             className="mb-2 text-muted"
    //                             tag="h6"
    //                         >
    //                             {data.brand}
    //                         </CardSubtitle>
    //                         <CardText>
    //                             {data.details}
    //                         </CardText>
    //                         <CardText>
    //                             Price - {data.price}
    //                         </CardText>
    //                         <CardText>
    //                             {data.qty} Product Left
    //                         </CardText>
    //                         {data.qty>=1?'':<CardText style={{color:'red', fontWeight:'bold'}}>
    //                             Out of Stock
    //                         </CardText>}

    //                         <Input min={1} disabled={data.qty>=1?false:true}  name='qty' onChange={(e) => setQty(e.target.value)} defaultValue={1} style={{ width: 80 }} className='mb-2' type='number' />

    //                         <Button disabled={data.qty>=1?false:true}  onClick={() => addToCart(data._id)}>
    //                             Add
    //                         </Button>
    //                     </CardBody>
    //                 </Card>))}

    //             </CardGroup>
    //         </CardBody>
    //         <ToastContainer />
    //     </Card>
    // )
}

export default Home