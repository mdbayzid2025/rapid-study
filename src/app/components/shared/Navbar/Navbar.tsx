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

      <div className="bg-white pb-5">
        <Container>
          <div className="flex items-center justify-between bg-white py-6">
            <img src="/logo-dark.png" alt="" className='w-48' />
            <div className="flex items-center gap-5">
              <div className="flex items-center gap-3">
                <div className="">
                  <CiClock2 size={60} className='text-chart-4' />
                </div>
                <div className="">
                  <h1 className='text-primary font-bold text-xl'>SO 9001</h1>
                  <p className='uppercase text-md'>Certification</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="">
                  <CiClock2 size={60} className='text-chart-4' />
                </div>
                <div className="">
                  <h1 className='text-primary font-bold text-xl'>24/7</h1>
                  <p className='uppercase text-md'>Service</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="">
                  <CiClock2 size={60} className='text-chart-4' />
                </div>
                <div className="">
                  <h1 className='text-primary font-bold text-xl'>Qualified</h1>
                  <p className='uppercase text-md'>Professionals</p>
                </div>
              </div>

            </div>
          </div>
        </Container>        
      </div>
      {/* <Container>
        <div className="bg-primary flex items-center justify-between px-5 py-10 -mt-10 text-white">
          <div className="flex items-center text-black font-medium text-xl">
            {
              menuItems && menuItems.map(menu => <Link key={menu?.name} href={menu?.link} className='ml-3'>{menu?.name}</Link>)
            }
          </div>
          <div className="flex items-center gap-5">
            <IoSearchOutline  size={24} color='#fff'/>
            <div className="bg-chart-4 px-5 py-5 font-medium">
              GET A Quote
            </div>
          </div>
        </div>
        </Container> */}

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