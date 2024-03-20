import React from 'react'
import Style from './Footer.module.css'
import img1 from '../../Assets/images/master.svg'
import img2 from '../../Assets/images/visa-1.svg'
import img3 from '../../Assets/images/app-store.svg'
import img4 from '../../Assets/images/google-store.svg'
function Footer() {
  return (
    <>
      <footer class="bg-main-light py-5">
        <div class="container ">
          <h2 class="h4 text-center text-md-start">Get the FreshCart app</h2>
          <h4 class="h6 text-muted text-center text-md-start mb-3 mb-md-0">We will send you a link, open it on your phone to
            download the app.</h4>
          <div class="row">
            <div class="col-12 col-md-10 mb-3 mb-md-0">
              <input class="form-control" type="email" placeholder="Email .." />
            </div>
            <div class="col-12 col-md-2">
              <button class="w-100 btn bg-main text-white">Share App Link</button>
            </div>
          </div>
          <hr />
          <div class="row justify-content-between">
            <div class="col-12 col-md-4 d-flex align-items-center justify-content-center justify-content-md-start">
              <p class="fw-bold mb-0 me-2">Payment Partners</p>
              <div>
                <img className='w-50'  src={img1} alt=""/>
                <img  className='w-50' src={img2} alt=""/>
              </div>
            </div>
            <div class="col-12 col-md-4 d-flex justify-content-center justify-content-center align-items-center">
              <p class="fw-bold mb-0 m-auto">Get deliveries with FreshCart</p>
              <div>
                <img  className='w-25' src={img3} alt=""/>
                <img  className='w-25' src={img4} alt=""/>

              </div>
            </div>
          </div>
          <hr />
          <p class="text-center">© 2024 <span class="text-main">Alaa Tourkey</span> All Rights Reserved</p>
        </div>
      </footer>

    </>
  )
}

export default Footer
