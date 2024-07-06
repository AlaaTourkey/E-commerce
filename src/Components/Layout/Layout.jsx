import React, { useContext, useEffect, useState } from 'react';
import Style from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../Context/userContext';
import { Offline, Online } from "react-detect-offline";

function Layout() {
  let { setUserToken } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      setUserToken(localStorage.getItem('userToken'));
    }
  }, [setUserToken]);

  const [scrollTop, setScrollTop] = useState(0);
  const [showArrow, setShowArrow] = useState(false); 

  function onScroll() {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    setScrollTop(scrolled);

    if (winScroll > window.innerHeight ) {
      setShowArrow(true);
    } else {
      setShowArrow(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const radius = 25;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (scrollTop / 100) * circumference;

  return (
    <>
      <Navbar />
      <div className="my-5 py-4">
        <Outlet />
      </div>
      <div>
        <Offline>
          <div className="network">
            <i className="fa fa-wifi" aria-hidden="true"></i> You are offline (surprise!)
          </div>
        </Offline>
      </div>
      <div className="position-fixed" style={{ bottom: '5%' ,cursor: 'pointer'}}  onClick={scrollToTop} >
        <div className="circle-progress-container position-relative " style={{ width: '60px', height: '60px' }}>
          <svg className="progress-circle" width="60" height="60">
            <circle
              className="progress-circle-background"
              cx="30"
              cy="30"
              r={radius}
              strokeWidth="8"
            />
            <circle
              className="progress-circle-foreground"
              cx="30"
              cy="30"
              r={radius}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
        </div>
        <span className={`position-absolute top-50 start-50 translate-middle ${showArrow ? 'opacity-100' : 'opacity-0'}`}>
          <i className="fa fa-arrow-up fw-bolder" aria-hidden="true"></i>
        </span>
      </div>
      
      <Footer />
    </>
  );
}

export default Layout;
