import React from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet';
import { Puff } from 'react-loader-spinner';

function Brands() {

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { data, isLoading } = useQuery('getbrands', getBrands)

  console.log(data?.data?.data);


  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Market - Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      {isLoading ? (
        <div className="w-100  my-5 d-flex justify-content-center align-items-center">
          <Puff
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (<div className="container my-5">
        <div className="row g-5">
          {data?.data?.data.map((product,index) => <div key={index} className="col-6 col-md-3">
            <div className="text-center product">
              <img className='w-100' src={product.image} alt="" />
              <hr />
              <h4 className='text-main'>{product.name}</h4>
              <p className='font-sm'>Updated at :{product.updatedAt}</p>
            </div>
          </div>)}
        </div>
      </div>)}

      <div className="container my-5">
        <div className="row g-5">
          {data?.data?.data.map((product) => <div className="col-6 col-md-3">
            <div className="text-center product">
              <img className='w-100' src={product.image} alt="" />
              <h4>{product.name}</h4>

            </div>
          </div>)}

        </div>
      </div>
    </>
  )
}

export default Brands
