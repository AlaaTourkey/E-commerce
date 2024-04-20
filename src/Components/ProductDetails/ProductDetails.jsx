import React, { useContext } from 'react'
import Style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import { Helmet } from 'react-helmet';
import { CartContext } from '../Context/cartContext';
import toast from 'react-hot-toast';


function ProductDetails() {

  // for slider of products info
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  let{ addToCart ,setNumOfCartItem}= useContext(CartContext)
  // get the id of each product
  let { id } = useParams();
  console.log(id);

  // get product details function
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  let { data, isLoading, isError } = useQuery('productDetails', () => getProductDetails(id));
  console.log(data?.data.data);


  // fun that use addtocart fun from cartcontext
  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      setNumOfCartItem(response.data.numOfCartItems);
      toast.success('product Successfully added' ,  {
        duration : 4000,
      })
    }else{
      toast.error('product not added')
    }
    console.log(response.data);
  }


  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>{data?.data.data.title}</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container">
        {data?.data.data ? <div className="row d-flex align-items-center">
          <div className="col-md-4">
            <Slider {...settings}>

              {data?.data.data?.images.map((img) => {
                return <img key={img} className='w-100' src={img} alt={data?.data.data.title} />
              })}

            </Slider>
          </div>
          <div className="col-md-8 my-4">
            <h2 className='fw-bold'>{data?.data.data.title}</h2>
            <p className='h5 text-black-50 p-2'>{data?.data.data.description}</p>
            <h4 className='h6'>{data?.data.data.category.name}</h4>
            <div className="d-flex justify-content-between">
              <h6 className='text-main'>{data?.data.data.price} EGP</h6>
              <h6><i class="fa fa-star rating-color" ></i> {data?.data.data.ratingsAverage}</h6>
            </div>
            <button onClick={()=>addProduct(data?.data.data.id)} className='btn text-white bg-main form-control my-2'>+ add to cart </button>

          </div>
        </div> : " "}

      </div>
    </>
  )
}

export default ProductDetails
