import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { IoCall, IoLogoYoutube, IoSearchOutline } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import Container from '../Container/Container'
import Link from 'next/link'
import { CiClock2 } from 'react-icons/ci'
import { Button } from 'antd'

const Navbar = () => {
  return (
    // <div className='absolute top-0 left-0 w-full z-50  '>
    <div className=' w-full z-50  '>
      <div className="bg-primary">
      <Container>
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-5 text-white">
            <div className='flex items-center gap-3'>              
              <p>Madrasha Code: 11011</p>
              <p>EIIN: 107906</p>
            </div>
            <div className='flex items-center gap-3'>
              <MdOutlineMailOutline />
              <p>masuk797@gmail.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white">
            <Button type='primary' size='middle'>BB Online Abedon</Button>
          </div>
        </div>
      </Container>
      </div>

    </div>
  )
}

export default Navbar


const menuItems = [
  {
    name: "Home",
    link: "/",
  },

  {
    name: "Projects",
    link: "/projects",
  },
  
  {
    name: "Blog",
    link: "/blog",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },  
]