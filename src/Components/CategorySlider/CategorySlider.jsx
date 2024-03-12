import React from 'react'
import Style from './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick';



function CategorySlider() {

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }


  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading, isError } = useQuery('getCategories', getCategories)

  return (
    <>
      <div className="container mb-5 mt-3">

        {data?.data.data ? <Slider {...settings}>
          {data?.data.data.map((category) => 
              <img height={200} key={category._id} src={category.image} className='w-100 ' alt="" />
          )}
        </Slider> : " "}
      </div>

    </>
  )
}

export default CategorySlider
