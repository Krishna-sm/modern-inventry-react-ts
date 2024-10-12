 
import MainLayout from './layout/MainLayout'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
              <MainLayout>
                <Outlet/>
                </MainLayout>   
      </>
  )
}

export default App