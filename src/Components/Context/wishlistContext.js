import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export const WishlistContextProvider = (props) => {

  const [numOfWishlistItem, setNumOfWishlistItem] = useState(0);

  useEffect(() => {
    const fetchInitialWishlist = async () => {
      try {
        const response = await getLoggedUserWishlist();
        console.log('num of wish');
        setNumOfWishlistItem(response.count);
      } catch (error) {
        console.error('Error fetching initial wishlist data:', error);
      }
    };

    fetchInitialWishlist();
  }, []);

  const headers = {
    token: localStorage.getItem('userToken')
  };

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
  async function getLoggedUserWishlist() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      headers: headers
    })
      .then((response) => response)
      .catch((error) => error);
  }

  // Function to remove item from wishlist
  async function removeItem(id) {
    try {
      const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
        headers: headers
      });
      if (response.data.status === 'success') {
        toast.success(response.data.message);
        return response;
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
      toast.error('Error removing item from wishlist');
    }
  }

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


  useEffect(() => {
    const fetchInitialWishlist = async () => {
      try {
        const response = await getLoggedUserWishlist();
        if (response && response.data && response.data.count !== undefined) {
          setNumOfWishlistItem(response.data.count);
        } else {
          console.error('Invalid response format or missing count property:', response);
        }
      } catch (error) {
        console.error('Error fetching initial Wishlist data:', error);
      }
    };
  
    fetchInitialWishlist();
  }, []);
  

  return (
    <WishlistContext.Provider value={{ getLoggedUserWishlist, addToWishlist, removeItem, numOfWishlistItem, setNumOfWishlistItem, checkoutPayment }}>
      {props.children}
    </WishlistContext.Provider>
  );
};

export default WishlistContextProvider;
