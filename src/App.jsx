import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { Home, DetailPage, RegisterProduct, AdminProducts, Login } from './Pages'
import { Navbar } from './Components'

function App () {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/detailpage/:id' element={<DetailPage />} />
        <Route path='/registerproduct' element={<RegisterProduct />} />
        <Route path='/adminproducts' element={<AdminProducts />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  )
}
export default App
