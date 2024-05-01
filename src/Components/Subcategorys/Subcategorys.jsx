import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'

function Subcategorys() {
  let { id } = useParams()

  function getsubcategoryDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
  }

  let { data, isLoading, isError } = useQuery('getsubcategoryDetails', () => getsubcategoryDetails(id));

  console.log(data);
  return (
    <>
      <div className="container my-5">
        <div className="row g-4">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching data</div>
          ) : (
            data?.data?.data?.map((product) =>
              <div key={product._id} className="col-md-3 product cursor-pointer">
                <h4 className='fw-bolder'>{product.name}</h4>
                <hr />
                <p className='fw-bolder text-main'>{product.slug}</p>
                <p className='font-sm '>Updated at: {product.updatedAt}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Subcategorys;
