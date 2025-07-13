import React from 'react'
import FooterLayout from './FooterLayout'


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <FooterLayout>
            {children}
        </FooterLayout>
    </div>
  )
}

export default layout