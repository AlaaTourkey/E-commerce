import React, { useContext, useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { date } from 'yup';
import { WishlistContext } from '../Context/wishlistContext';
import { CartContext } from '../Context/cartContext';

function Cart() {
  let { getLoggedUserWishlist, removeItem, setNumOfWishlistItem, numOfWishlistItem } = useContext(WishlistContext)
  let { addToCart, setNumOfCartItem } = useContext(CartContext)

  const [isLoading, setIsLoading] = useState(true);
  const [wishData, setWishtData] = useState(null);


  // Load wishlist data on component mount
  useEffect(() => {
    fetchWishlistInfo();
  }, []);


  // Function to fetch cart information
  async function fetchWishlistInfo() {
    setIsLoading(true);
    let { data } = await getLoggedUserWishlist()
    console.log(data);
    setWishtData(data?.data);
    setIsLoading(false);
    setNumOfWishlistItem(data?.count)
  }

  // fun that use addtocart fun from cartcontext
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      setNumOfCartItem(response.data.numOfCartItems);
      toast.success(response.data.message, {
        duration: 4000,
      })
    } else {
      toast.error('product not added')
    }
    console.log(response.data);
  }

  // Function to remove item from wishlist
  async function removeItemFromWishlist(id) {
    try {
      const response = await removeItem(id);
      if (response.data.status === 'success') {
        setNumOfWishlistItem(response.data.data.length);
        fetchWishlistInfo(); // Refresh wishlist data after removal
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast.error('Error removing item from wishlist');
    }
  }



  return (

    <>
      <h2>Wishlist</h2>

      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center my-5">
          <Bars height="100" width="100" color="#0aad0a" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
      ) : (<>
        {wishData ? (
          <div className="m-5 bg-main-light p-4">
            <div className=" d-flex justify-content-between">
              <div className="">
                <h3 className="fw-bolder">Wishlist : <i className="fa-solid fa-heart fs-3 text-danger"></i> </h3>
              </div>

            </div>
            {wishData?.map((product) => (
              <div key={product._id} className="row my-2 py-2 border-2 border-bottom">
                <div className="col-4  col-md-2">
                  <img src={product.imageCover} alt="" className="w-100" />
                </div>
                <div className="col-8 col-md-10">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h4 className="h5">{product.title.split(' ').slice(0,3).join(' ')}</h4>
                      <span><i className="fa fa-star rating-color" ></i> {product.ratingsAverage}</span>
                      <h6 className="text-main">price: {product.price}</h6>
                    </div>
                    <div>
                      <button onClick={() => addProduct(product._id)} className="btn main-border">
                        Add To Cart
                      </button>

                    </div>
                  </div>
                  <button onClick={() => removeItemFromWishlist(product._id)} className="btn text-danger">
                    <i className="fas fa-trash-can"></i> Remove
                  </button>

                </div>
              </div>
            ))}
          </div>
        ) : (
          ' '
        )}
      </>)}


    </>

  );
}

export default Cart;
