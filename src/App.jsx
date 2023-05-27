import { useState } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import Error404 from './pages/error404/Error404'
import TestPage from './pages/test/TestPage'
import Navbar from './components/navbar/Navbar'
import LoginPage from './pages/login/LoginPage'
import ProtectedRoute from './pages/protectedRoute/ProtectedRoute'
import AdminLecturerPage from './pages/admin/lecturer/AdminLecturerPage'

function App() {

  const Layout = ({ children }) => {
    return <div>
      <div className="d-flex m-0">
        <Sidebar />
        <div className='w-100'>
          <Navbar />
          {children}
        </div>
      </div>
    </div>

  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout children={<HomePage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Error404 />} />
        <Route path='/admin/*' element={<ProtectedRoute admin={true} />}>
          <Route path='lecturer' element={<Layout children={<AdminLecturerPage />} />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
