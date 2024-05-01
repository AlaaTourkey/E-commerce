import React, { useState } from 'react'
import Style from './Products.module.css'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import { Helmet } from 'react-helmet';

function Products() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Fresh Market - Products</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <div className="container my-4 bg-body-secondary ">
        <div className="row">
          <div className="col-md-6">
            <div className="title">
              <h2 className='text-main fw-bolder '> All Products :</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="d-flex align-items-center bg-white rounded-4 my-2">
              <i className="fas fa-search  search-icon  "></i>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='search-input'
              />
            </div>
          </div>
        </div>
      </div>
      
      <FeaturedProducts searchQuery={searchQuery} />
    </>
  )
}

export default Products
