import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext()

export default function CartContextProvider(props) {

  let headers = {
    token: localStorage.getItem('userToken')
  }

  // add products to cart function 
  async function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
      {
        productId: id
      },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  }

    // add products to Wishlist function 
    async function addToWishlist(id) {
      return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: id
        },
        {
          headers: headers
        })
        .then((response) => response)
        .catch((error) => error);
    }


  // get info from logged cart 
  async function getLoggedUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers
    })
      .then((response) => response)
      .catch((error) => error);

  }

  // remove item from cart
  async function removeItem(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      headers: headers
    })
      .then((response) => response)
      .catch((error) => error);
  }

  // update product countity 
  async function updateQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      count: count
    },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  }

  // clear all cart products 
  async function clearCart() {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: headers
    });
  }

  const [cartId, setCartId] = useState(null)
  const [numOfCartItem, setNumOfCartItem] = useState(0)

  // to show number of cart items when open site
  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const response = await getLoggedUserCart();
        console.log('num of cart');
        setNumOfCartItem(response.data.numOfCartItems);
      } catch (error) {
        console.error('Error fetching initial cart data:', error);
      }
    };

    fetchInitialCart();
  }, []);


  // checkout function (payment)
  async function checkoutPayment(id, shippingData) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, {
      shippingData: shippingData
    },
      {
        headers: headers
      })
      .then((response) => response)
      .catch((error) => error);
  }


  return <CartContext.Provider value={{ addToCart, addToWishlist, getLoggedUserCart, removeItem, updateQuantity, clearCart, numOfCartItem, setNumOfCartItem ,checkoutPayment}}>
    {props.children}
  </CartContext.Provider>
}