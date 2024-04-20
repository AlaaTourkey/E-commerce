import React from 'react'
import Style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet';

function Brands() {

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { data } = useQuery('getbrands', getBrands)

  console.log(data?.data?.data);


  return (
    <>
    
    <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Market - Brands</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
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
