import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './navbar.css'
import axios from 'axios'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [loged, setLoged] = useState(false)
  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }
  const closeNavbar = () => {
    setIsOpen(false)
  }
  const loging = () => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8003/products/log')
        sessionStorage.setItem('token', response.data.token)
        console.log(response)
      } catch (error) {
        console.error('Error al obtener token', error)
      }
    }
    fetchProducts()
    closeNavbar()
    setLoged(!loged)
    fetchProducts()
  }
  const closing = () => {
    sessionStorage.clear()
    closeNavbar()
    setLoged(!loged)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top text-white navTotal py-2">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand text-white" to="/">
          <img src={logo} alt="logo" className='logoNav' />
        </Link>
        <button className="navbar-toggler colorSpan" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon colorSpan"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id="navbarNav">
          <ul className="navbar-nav ml-auto d-flex align-items-end gap-4">
            <li className="nav-item">
            <Link className="nav-link text-white" to= "/" onClick={closeNavbar}>Productos</Link>
            </li>
            { loged === true &&
              <li className="nav-item">
              <Link className="nav-link text-white" to="/adminproducts" onClick={closeNavbar}>Adminitración</Link>
            </li>}
            {
              loged === false &&
                <li className=''>
                  <Link className="nav-link text-white" onClick={loging}>Logeate</Link>
                </li>
            }
            {
              loged === true &&
                <li>
                  <Link className="nav-link text-white" onClick={closing}>Cerrar sesión</Link>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
