import React from 'react'
import Style from './Notfound.module.css'
import notfoundImg from '../../Assets/images/error.svg'

function Notfound() {
  return (
    <>
      <div className='text-center'>
      <img className='w-50' src={notfoundImg} alt="" />
    </div>
    </>
  )
}

export default Notfound
