import React from 'react'
import { FaSpinner } from 'react-icons/fa'

export const PageLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-[200px]">
      <FaSpinner className="animate-spin text-blue-500" size={45} />
    </div>
  )
}
