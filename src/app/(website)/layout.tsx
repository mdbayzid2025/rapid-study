import React from 'react'
import FooterLayout from './FooterLayout'
import Navbar from '@/components/shared/Navbar/Navbar'
import LandingFooter from '@/components/UI-InterFace/Landing/LandingFooter'


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar  />
        <div className='mt-20'>
            {children}
        </div>
        <LandingFooter />
    </div>
  )
}

export default layout

