import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { IoCall, IoLogoYoutube } from 'react-icons/io5'
import { MdOutlineMailOutline } from 'react-icons/md'
import Container from '../Container/Container'
import Link from 'next/link'

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
          <div className="flex items-center gap-3 text-white">
            <FaFacebookF />
            <FaTwitter />
            <FaLinkedinIn />
            <IoLogoYoutube />
          </div>
        </div>
      </Container>

      <div className="bg-white">
        <Container>
          <div className="flex items-center justify-between bg-white py-6">
            <img src="https://propertydevelopmentltd.com/media/common/PDL-black-logo.png" alt="" className='w-36' />
            <div className="flex-items-center text-black font-medium">
              {
                menuItems && menuItems.map(menu => <Link key={menu?.name} href={menu?.link} className='ml-3'>{menu?.name}</Link>)
              }

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
    name: "About",
    link: "/about",
  },
  {
    name: "Service",
    link: "/services",
  },
  {
    name: "Solutions",
    link: "/solutions",
  },
  {
    name: "Projects",
    link: "/projects",
  },
  {
    name: "Real Estate",
    link: "/real-estate",
  },
  {
    name: "Notice Board",
    link: "/notice-board",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "real-estate",
    link: "/real-estate",
  },
]