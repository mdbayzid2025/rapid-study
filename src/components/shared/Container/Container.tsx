import React from 'react'

const Container = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='max-w-7xl mx-4 md:mx-8 xl:mx-auto'>
    {children}
    </div>
  )
}

export default Container