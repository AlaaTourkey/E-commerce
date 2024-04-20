import React, { useContext, useState } from 'react'
import Style from './Login.module.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Bars } from 'react-loader-spinner'
import { UserContext } from '../Context/userContext'
import logimage from '../../Assets/images/package-basket.png'

function Login() {

  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function loginSubmit(values) {
    setIsLoading(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false)
        setError(err.response.data.message)
      });
    if (data.message == "success") {
      setIsLoading(false);
      localStorage.setItem("userToken", data.token);
      setUserToken(data.token)
      navigate('/home');
    }
    console.log(data);
  }

  // validation function (yup)
  let validateSchema = Yup.object({
    email: Yup.string().email('email is invalid').required('email is required'),
    password: Yup.string().matches(
      /^(?=.*[A-Za-z])/,
      'Password should contain at least one uppercase or lowercase letter.'
    )
      .matches(
        /[A-Za-z\d@$!%*?&]{8,}/,
        'Password should consist of at least 8 characters.'
      ).required('Password is required'),


  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    }, validationSchema: validateSchema,
    onSubmit: loginSubmit
  })


  return (
    <>
      <div className="w-75 m-auto my-5">
        {error ? <div className="alert alert-danger">{error}</div> : null}

        <div className="containe logdiv p-5">
          <div className="row">
            <div className="col-12 col-md-6 my-5">
              <form onSubmit={formik.handleSubmit}>

                <label htmlFor="email">Email: </label>
                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type='email' name='email' id='email' className='form-control w-100 my-3' />
                {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : " "}



                <label htmlFor="password">Password: </label>
                <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type='password' name='password' id='password' className='form-control w-100 my-3' />
                {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : " "}
                <div className="">
                  <Link to={'/forgetpassword'} > <a href="" className='text-danger '>Forget password</a></Link>

                </div>
                <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white my-3' >{isLoading ? <Bars height="25" width="40" color="#fff" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} /> : "Login"}</button>
              </form>
            </div>
            <div className="col-12 col-md-6 ">
              <img className='w-100' src={logimage} alt="" />
            </div>
          </div>
        </div>


      </div>

    </>
  )
}

export default Login
