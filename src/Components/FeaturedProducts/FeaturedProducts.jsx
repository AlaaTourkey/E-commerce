import React, { useContext, useEffect, useState } from 'react'
import Style from './FeaturedProducts.module.css'
import axios from 'axios'
import { useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';



function FeaturedProducts() {

  let { addToCart ,setNumOfCartItem} = useContext(CartContext)

  // fun that use addtocart fun from cartcontext
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      setNumOfCartItem(response.data.numOfCartItems);
      toast.success(response.data.message ,  {
        duration : 4000,
      })
    }else{
      toast.error('product not added')
    }
    console.log(response.data);
  }


  // get products function
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data} = useQuery('featuredProducts', getFeaturedProducts);



  return (
    <>

      {isLoading ? <div className="w-100 vh-100  d-flex justify-content-center align-items-center">
        <Bars height="100"
          width="100"
          color="#0aad0a"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true} />
      </div> : <div className="container ">
        <div className="row ">
          {data?.data.data.map((product) => <div key={product.id} className="col-6 col-sm-4 col-md-2">
            <div className="product p-3">
              <Link to={`/Productdetails/${product.id}`}>
                <div className=" cursor-pointer  ">
                  <img src={product.imageCover} className='w-100' alt={product.title} />

                  <span className='text-main font-sm fw-bolder'>{product.category.name}</span>
                  <h3 className='h5'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>

                  <div className="d-flex justify-content-between mt-3">
                    <span>{product.price} EGP</span>
                    <span><i className="fa fa-star rating-color" ></i> {product.ratingsAverage}</span>
                  </div>

                </div>
              </Link>
              <button onClick={() => addProduct(product.id)} className='btn bg-main text-white w-100 btn-sm mt-2'>
                add to cart
              </button>
            </div>
          </div>)}

        </div>
      </div>}


    </>
  )
}

export default FeaturedProducts
