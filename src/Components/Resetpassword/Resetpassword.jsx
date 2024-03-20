import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';

function ResetPassword() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initialValues = {
    resetCode: '',
  };

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Reset code is required'),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
      if (response.data.status === 'success') {
        navigate('/reset-password'); // Navigate to the reset password page upon successful verification of the reset code
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="w-75 m-auto my-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="containe logdiv p-5">
        <div className="row">
          <div className="col-12 col-md-6 my-5">
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="resetCode">Reset Code: </label>
              <input
                id="resetCode"
                name="resetCode"
                type="text"
                className="form-control w-100 my-3"
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.resetCode && formik.touched.resetCode && <div className="alert alert-danger">{formik.errors.resetCode}</div>}
              <button type="submit" className="btn bg-main text-white my-2" disabled={!formik.isValid || !formik.dirty || isLoading}>
                {isLoading ? <Bars height="25" width="40" color="#fff" ariaLabel="bars-loading" visible={true} /> : <Link className='text-white' to={'/Login'}>Submit</Link>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
