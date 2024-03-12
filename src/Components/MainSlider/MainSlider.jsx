import React from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick';
import img1 from '../../Assets/images/slider-image-1.jpeg'
import img2 from '../../Assets/images/slider-image-2.jpeg'
import img3 from '../../Assets/images/slider-image-3.jpeg'
import img4 from '../../Assets/images/grocery-banner-2.jpeg'
import img5 from '../../Assets/images/assortment-citrus-fruits.png'


function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows:false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows:false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
          arrows:false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          arrows:false,
        }
      }
    ]
  }
  return (
    <>
      <div className="row my-3 gx-0">
        <div className="col-9">

        <Slider {...settings}>
          <img height={400} className='w-100' src={img1} alt="image one" />
          <img height={400} className='w-100' src={img2} alt="image one" />
          <img height={400} className='w-100' src={img3} alt="image one" />
        </Slider>
        </div>
        <div className="col-3">
          <img height={200} className='w-100' src={img4} alt="" />
          <img height={200} className='w-100' src={img5} alt="" />
        </div>
      </div>
    </>
  )
}

export default MainSlider
