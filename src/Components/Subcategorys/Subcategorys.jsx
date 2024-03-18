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

  return (
    <>
      <div className="container my-5">
        <div className="row g-5">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error fetching data</div>
          ) : (
            data?.data?.data?.map((product) =>
              <div key={product._id} className="col-md-3">
                <h2>{product.name}</h2>
              </div>
            )
          )}
        </div>
      </div>
    </>
  )
}

export default Subcategorys;
