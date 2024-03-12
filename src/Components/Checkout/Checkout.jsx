import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';


function Address() {

  let {checkoutPayment} = useContext(CartContext)

    let { id } = useParams()

    // async function checkout(shippingAddress) {
    //     console.log(shippingAddress);
    //     console.log(cartId);


    //     let res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
    //         shippingAddress
    //     }, {
    //         headers: {
    //             token: localStorage.getItem("token")
    //         }
    //     })

    //     console.log(res.data.session.url);
    //     window.location.href = res.data.session.url
    // }


    let shippingForm = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        },
        onSubmit: function(val){
          shippingPay(val)
        }
    })
    async function shippingPay(val) {
      console.log(val);
      let {data} = await checkoutPayment(id , val)
      console.log(data);
      if (data.status == 'success') {
        window.location.href = data.session.url
      }
    }
    return (
        <form className='w-75 m-auto pt-5 mt-5' onSubmit={shippingForm.handleSubmit}>

            <label htmlFor="details">Details: </label>
            <input onBlur={shippingForm.handleBlur} onChange={shippingForm.handleChange} value={shippingForm.values.details} className='form-control mb-3' type="text" id='details' name='details' />


            <label htmlFor="phone">Phone: </label>
            <input onBlur={shippingForm.handleBlur} onChange={shippingForm.handleChange} value={shippingForm.values.phone} className='form-control mb-3' type="tel" id='phone' name='phone' />

            <label htmlFor="city">City: </label>
            <input onBlur={shippingForm.handleBlur} onChange={shippingForm.handleChange} value={shippingForm.values.city} className='form-control mb-3' type="text" id='city' name='city' />



            <button type='submit' className='btn bg-main text-white form-control ms-auto d-block'>PAY  <i className="fas fa-money-check-alt "></i>
</button>
        </form>
    )
}

export default Address