import React from 'react'
import { useNavigate } from 'react-router-dom'

function ThankYou() {
const navigate = useNavigate()

  return (
    <>
    <h2  style={{textAlign:'center', marginTop:100}}>Thank You</h2>
    <h3 onClick={()=>navigate('/view-order')} className='mt-5' style={{textAlign:'center', marginTop:100, cursor:'pointer', color:'blue'}}>View Order</h3>
    </>
  )
}

export default ThankYou