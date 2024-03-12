import React, { useContext } from 'react'
import Style from './Home.module.css'
import { CounterContext } from '../Context/counterContext'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';


function Home() {
  let { changeCounter, decreaseCounter } = useContext(CounterContext);
  return (
    <>
      {/* <button onClick={()=> changeCounter()} className='btn btn-info'> change</button>
    <button onClick={()=> decreaseCounter()} className='btn btn-danger'> change</button>
      <h1>Home</h1> */}
      <div className="container">
        <MainSlider />
        <CategorySlider />
        <FeaturedProducts />

      </div>

    </>
  )
}

export default Home
