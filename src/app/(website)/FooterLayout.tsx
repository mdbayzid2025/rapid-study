"use client"
import React from 'react'
import Navbar from '../components/shared/Navbar/Navbar'
import { ConfigProvider } from 'antd'
import { usePathname } from 'next/navigation';

const FooterLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col'>
      <div className="h-full">
        <Navbar />
        
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#0f67b1"
          }
        }}
        >
          {children}
        </ConfigProvider>
      </div>      
      { pathname === "/select-service" ? "" : 
      <footer className="relative bottom-0 hidden bg-gray-900 px-4 pt-20 mt-auto">
  <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
  <img className="h-full object-cover mx-auto" src="https://upload.wikimedia.org/wikipedia/en/1/1d/Prime_University.png" alt="" /></div>
  <nav aria-label="Footer Navigation" className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left">
    <a href="#" className="font-medium text-white">Demo</a>
    <a href="#" className="font-medium text-white">Support</a>
    <a href="#" className="font-medium text-white">Privacy Policy</a>
    <a href="#" className="font-medium text-white">Terms & Conditions</a>
  </nav>
  <p className="py-10 text-center text-gray-300">© 2022 Boleno | All Rights Reserved</p>
</footer>

      }
    </div>
  )
}

export default FooterLayout


/*

https://propertydevelopmentltd.com/
https://nde.com.bd/

primary color: #0f67b1
Secondary color: #03457c
blue: #3197d6
black #333333

*/