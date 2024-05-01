import React, { useContext, useEffect, useState } from 'react';
import Style from './Cart.module.css';
import { CartContext } from '../Context/cartContext';
import { Bars } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Cart() {
  const { getLoggedUserCart, removeItem, updateQuantity, clearCart, numOfCartItem, setNumOfCartItem } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartData, setCartData] = useState(null);
  let [totalCartPrice, setTotalCartPrice] = useState(0)


  // Load cart data on component mount
  useEffect(() => {
    fetchCartInfo();
  }, []);


  // Function to fetch cart information
  async function fetchCartInfo() {
    setIsLoading(true);
    let { data } = await getLoggedUserCart()
    setCartData(data?.data);
    setIsLoading(false);
    setTotalCartPrice(data?.data.totalCartPrice);
    setNumOfCartItem(data?.numOfCartItems)
  }


  // Function to remove item from cart
  async function removeItemFromCart(id) {
    let { data } = await removeItem(id);
    setCartData(data?.data);
    setTotalCartPrice(data?.data.totalCartPrice);
    setNumOfCartItem(data?.numOfCartItems)

  }

  // function to update product quantity
  async function updateProductQuantity(id, count) {
    if (count > 0) {
      let { data } = await updateQuantity(id, count)
      setCartData(data?.data);
      setTotalCartPrice(data?.data.totalCartPrice);
      console.log(data?.data.products);

      toast.success('success to updating product quantity');
    } else {
      removeItem(id)
        .then(() => fetchCartInfo())
        .catch(error => {
          console.error('Error removing item from cart:', error);
          toast.error('Error removing item from cart');
        });
    }
  }

  // Function to clear all data from the cart
  async function clearCartData() {
    try {
      let { data } = await clearCart();
      if (data.message === 'success') {
        setTotalCartPrice(0);
        setCartData(null);
        setNumOfCartItem("0");
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Error clearing cart');
    }
  }

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Market - Cart</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center my-5">
          <Bars height="100" width="100" color="#0aad0a" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
        </div>
      ) : (
        <>
          {cartData ? <>{cartData ? (
            <div className="m-5 bg-main-light p-4 ">
              <div className=" row">
                <div className="col-7">
                  <h3 className="fw-bolder">Shop Cart: {numOfCartItem}</h3>
                  <h5 className="fw-bolder text-main">Total Cart Price: {totalCartPrice} EGP</h5>
                </div>
                <div className="col-5 text-center">
                  <button onClick={clearCartData} className="btn p-2  btn-danger font-sm">
                    Clear Cart
                  </button>
                </div>
              </div>
              {cartData ? (
                <div className="m-2 bg-main-light">
                  {cartData?.products?.map((product) => (
                    <div key={product._id} className="row my-2 py-2 border-2 border-bottom">
                      <div className=" col-md-4">
                        <div className="w-100 ">
                          <img src={product.product.imageCover} alt="" className="w-100" />
                        </div>
                      </div>
                      <div className=" col-md-8 py-3">
                        <div className="row">
                          <div className="col-9">
                            <div className="">
                              <div className='w-100 w-md-75'>
                                <h3 className="fw-bolder fs-6 ">{product.product.title.split(' ').slice(0, 3).join(' ')}</h3>
                                <p className='fw-bold'>Available in Stock : {product.product.quantity}</p>
                                <p className='fw-bold'>reviews  : {product.product.ratingsAverage} <i className="fa fa-star rating-color" ></i></p>
                                <p className='fw-bold'> {product.product.brand.name} </p>
                                <h4 className="text-main my-3 fw-bold">price: {product.price}</h4>
                                <img className='product my-2 w-50' src={product.product.brand.image} alt="" />
                                <div className='col-3 text-center p-0'>
                                  <button onClick={() => removeItemFromCart(product.product.id)} className="btn text-danger">
                                    <i className="fas fa-trash-can"></i> Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-3">
                            <div className='d-flex align-items-center'>
                              <button onClick={() => updateProductQuantity(product.product._id, product.count + 1)} className=" fs-2 rounded-1 main-border">
                                +
                              </button>
                              <span className="m-1 fs-3">{product.count}</span>
                              <button onClick={() => updateProductQuantity(product.product._id, product.count - 1)} className="fs-2 rounded-1 main-border">
                                -
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                ' '
              )}
            </div>
          ) : (
            ' '
          )}
            {cartData ? <Link to={"/Checkout/" + cartData._id}>
              <span className='btn btn-success my-2 mx-5'>Buy Now</span>
            </Link> : " "}
          </> : <>
            <div className="bg-danger-subtle my-4 p-3 text-center ">
              <h1>No Items In Cart</h1>
            </div>
          </>}
        </>
      )}

    </>

  );
}

export default Cart;
