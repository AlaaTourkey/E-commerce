import React, { useContext, useEffect, useState } from 'react';
import Style from './FeaturedProducts.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { Bars } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../Context/wishlistContext';

function FeaturedProducts() {

  const { addToWishlist, setNumOfWishlistItem } = useContext(WishlistContext);
  const { addToCart, setNumOfCartItem } = useContext(CartContext);

  const [wishlistStatus, setWishlistStatus] = useState({});

  // Function to add product to wishlist
  async function addProductToWishlist(productId) {
    let response = await addToWishlist(productId);
    if (response.data.status === 'success') {
      toast.success(response.data.message, { duration: 4000 });
      // Update wishlist status for this product to true
      setWishlistStatus(prevStatus => ({ ...prevStatus, [productId]: true }));
      setNumOfWishlistItem(response.data.data.length);
    } else {
      toast.error('Product not added to wishlist');
    }
  }

  // Function to add product to cart
  async function addProductToCart(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      toast.success(response.data.message, { duration: 4000 });
      setNumOfCartItem(response.data.numOfCartItems);
    } else {
      toast.error('Product not added to cart');
    }
  }

  // Fetch featured products
  function getFeaturedProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { isLoading, data } = useQuery('featuredProducts', getFeaturedProducts);

  return (
    <>
      {isLoading ? (
        <div className="w-100 vh-100  d-flex justify-content-center align-items-center">
          <Bars height="100" width="100" color="#0aad0a" ariaLabel="bars-loading" />
        </div>
      ) : (
        <div className="container">
          <div className="row">
            {data?.data.data.map((product) => (
              <div key={product.id} className="col-6 col-md-3">
                <div className="product p-3">
                  <Link to={`/Productdetails/${product.id}`}>
                    <div className="cursor-pointer">
                      <img src={product.imageCover} className="w-100" alt={product.title} />
                      <span className="text-main font-sm fw-bolder">{product.category.name}</span>
                      <h3 className="h5">{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                      <div className="d-flex justify-content-between mt-3">
                        <span>{product.price} EGP</span>
                        <span><i className="fa fa-star rating-color"></i> {product.ratingsAverage}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="d-flex align-items-center justify-content-between w-100 ">
                    <button onClick={() => addProductToCart(product.id)} className="btn bg-main text-white btn-sm font-10 fw-bold  mt-2">
                      Add to Cart
                    </button>
                    <button onClick={() => addProductToWishlist(product.id)} className="btn mt-2">
                      <i className={`fa-solid fa-heart p-0 m-0 fs-5 ${wishlistStatus[product.id] ? 'text-danger' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FeaturedProducts;
