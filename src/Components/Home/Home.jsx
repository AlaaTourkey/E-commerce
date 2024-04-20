import React, { useContext } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../Context/counterContext'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import Products from '../Products/Products';


function Home() {
  let { changeCounter, decreaseCounter } = useContext(CounterContext);
  return (
    <>


      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Market - Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      {/* <button onClick={()=> changeCounter()} className='btn btn-info'> change</button>
    <button onClick={()=> decreaseCounter()} className='btn btn-danger'> change</button>
      <h1>Home</h1> */}
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <Products/>

      </div>

    </>
  )
}

export default Home
