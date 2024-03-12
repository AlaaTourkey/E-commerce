import React from 'react'
import Style from './Categories.module.css'
import axios from 'axios';
import { useQuery } from 'react-query';

function Categories() {
  function getCategoriesProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { isLoading, data } = useQuery('getCategoriesProducts', getCategoriesProducts);


  console.log(data?.data?.data);

  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          {data?.data.data.map((product) => <div key={product.id} className="col-6 col-sm-4 col-md-2">
              <h2>{product.name}</h2>
          </div>
            
            )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Categories
