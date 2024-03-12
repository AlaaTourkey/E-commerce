import React, { useContext, useEffect } from 'react'
import Style from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
import { UserContext } from '../Context/userContext'
import { Offline, Online } from "react-detect-offline";

function Layout() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'))
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="my-5 py-4">
        <Outlet />
      </div>
      <div >
        <Offline >
          <div className="network">
            <i class="fa fa-wifi" aria-hidden="true"></i> You are offline (surprise!)
          </div>
        </Offline>
      </div>
      <Footer />
    </>
  )
}

export default Layout