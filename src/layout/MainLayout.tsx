import React from 'react'
import FloatNav from '../components/FloatNav'

const MainLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <>
           <div className="min-h-screen relative bg-blue-200">
           {children}
           <FloatNav/>  
           </div>
     </>
  )
}

export default MainLayout