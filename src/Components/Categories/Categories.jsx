import React from 'react'
import Style from './Categories.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { Puff } from 'react-loader-spinner';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';

function Categories() {

  function getCategoriesProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isLoading, data } = useQuery('getCategoriesProducts', getCategoriesProducts);


  console.log(data?.data?.data);

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Market - Categories</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {isLoading ? (
        <div className="w-100 my-5  d-flex justify-content-center align-items-center">
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
      ) : (<>
      <CategorySlider />
      <div className="container my-5 w-75">
        <div className="row g-3">
          {data?.data.data.map((product) => <div key={product.id} className="product col-6 col-sm-4 col-md-3 px-4">
            <Link to={`/Subcategorys/${product._id}`} className=" w-100 h-100 ">
              <img className='w-100 h-75' src={product.image} alt={product.name} />
              <h2>{product.name}</h2>
            </Link>
          </div>
          )}
        </div>
      </div>
      </>
        )}
    </>
  )
}

export default Categories
