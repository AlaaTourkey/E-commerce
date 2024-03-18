import React from 'react'
import Style from './MainSlider.module.css'
import Slider from 'react-slick';
import img1 from '../../Assets/images/slider-image-1.jpeg'
import img2 from '../../Assets/images/slider-image-2.jpeg'
import img3 from '../../Assets/images/slider-image-3.jpeg'
import img4 from '../../Assets/images/slider-2.jpeg'
import img5 from '../../Assets/images/grocery-banner-2.jpeg'


function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
          arrows: false,
        }
      }
    ]
  }
  return (
    <>
      <div className="row my-3 gx-0">
        <div className="col-sm-9 col-12 mb-3">

          <Slider {...settings}>
            <img height={400} className='w-100' src={img1} alt="image one" />
            <img height={400} className='w-100' src={img4} alt="image one" />
            <img height={400} className='w-100' src={img5} alt="image one" />
          </Slider>
        </div>
        <div className="col-sm-3 col-12">
          <img height={200} className='w-100' src={img2} alt="" />
          <img height={200} className='w-100' src={img3} alt="" />
        </div>
      </div>
    </>
  )
}

export default MainSlider
