import React, { useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'

function Register() {

  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function submitRegister(values) {
    setIsLoading(true);
    try {
      let response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
      if (response.data.message === "success") {
        setIsLoading(false);
        navigate('/login');
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.message);
      console.error(error);
    }
  }


  let validateSchema = Yup.object({
    name: Yup.string().min(3,'name minlingth is 3').max(20,'name maxlingth is 20').required('name is required'),
    email: Yup.string().email('email is invalid').required('email is required'),
    phone: Yup.string().matches(/^(\+?2)?010\d{8}$/,'Invalid phone number. Use international format, e.g  +201098765432').required('Phone number is required'),
    password: Yup.string().matches(
      /^(?=.*[A-Za-z])/,
      'Password should contain at least one uppercase or lowercase letter.'
    )
    .matches(
      /[A-Za-z\d@$!%*?&]{8,}/,
      'Password should consist of at least 8 characters.'
    ).required('Password is required'),
    
    rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Re-enter Password is required'),
  
  })

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    }, validationSchema:validateSchema,
    onSubmit: submitRegister
  })


  return (
    <>

      <div className="w-75 m-auto my-5">

        {error?<div className="alert alert-danger">{error}</div> : null}
        
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type='text'  name='name' id='name' className='form-control my-3' />
          {formik.errors.name && formik.touched.name ? <div className="alert p-2 my-2 alert-danger">{formik.errors.name}</div> : " "}


          <label htmlFor="email">Email: </label>
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type='email' name='email' id='email' className='form-control my-3' />
          {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : " "}


          <label htmlFor="phone">Phone: </label>
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type='tel' name='phone' id='phone' className='form-control my-3' />
          {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : " "}


          <label htmlFor="password">Password: </label>
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' name='password' id='password' className='form-control my-3' />
          {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : " "}


          <label htmlFor="rePassword">RePassword: </label>
          <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' name='rePassword' id='rePassword' className='form-control my-3' />
          {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : " "}


          <button disabled={!(formik.isValid && formik.dirty )} type='submit' className='btn bg-main text-white my-2' >{ isLoading?<Bars height="25" width="40" color="#fff" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true}/>: "Register"}</button>
        </form>
      </div>

    </>
  )
}

export default Register
