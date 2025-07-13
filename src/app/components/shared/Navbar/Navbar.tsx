import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { IoCall, IoLogoYoutube } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import Container from '../Container/Container'

const Navbar = () => {
  return (
    <div className='absolute top-0 left-0 w-full z-50 bg-primary '>
      <Container>
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-5 text-white">
            <div className='flex items-center gap-3'>
              <IoCall />
              <p>01111555555 (Tell free)</p>
            </div>
            <div className='flex items-center gap-3'>
              <MdOutlineMailOutline />
              <p>masuk797@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <IoLogoYoutube />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Navbar