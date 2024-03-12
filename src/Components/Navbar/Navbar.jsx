import React, { useContext } from 'react'
import Style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../Context/userContext'
import { CartContext } from '../Context/cartContext'


function Navbar() {

  let {numOfCartItem} = useContext(CartContext);
  let { userToken, setUserToken } = useContext(UserContext);
  let navigate = useNavigate()

  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  return (
    <>
      <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light py-3 ">
        <div className="container-fluid">
          <span className='navbar-brand' >
            <img src={logo} alt="fresh market logo" srcSet="" />
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {userToken !== null ? <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="Home">Home </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Products">Products</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Categories">Categories</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="Brands">Brands</Link>
                </li>
                <li className="nav-item position-relative">
                  <Link className="nav-link " to="Cart"><i className="fas fa-cart-plus  fs-5 mx-2 "></i></Link>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                    {numOfCartItem}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                </li>
              </> : ""}
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {userToken !== null ? <>
                <div className="d-flex align-items-center ">
                  
                </div>

                <li className="nav-item d-flex align-items-center cursor-pointer">
                  <i className="fa-brands fa-facebook mx-2"></i>
                  <i className="fa-brands fa-twitter mx-2"></i>
                  <i className="fa-brands fa-instagram mx-2"></i>
                  <i className="fa-brands fa-youtube mx-2"></i>
                  <i className="fa-brands fa-tiktok mx-2"></i>
                </li>

                <li className="nav-item">
                  <span onClick={logout} className="nav-link cursor-pointer" to="Login">Logout</span>
                </li></> :
                <><li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="Login">login</Link>
                </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="Register">Register</Link>
                  </li></>}

            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Navbar
