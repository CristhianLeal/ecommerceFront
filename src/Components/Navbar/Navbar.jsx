import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import logo from '../../assets/GamalDigitalColor.png'
import './navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState('')
  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }
  const closeNavbar = () => {
    setIsOpen(false)
  }
  const handleClick = () => {
    sessionStorage.clear()
    window.location.href = '/'
  }
  useEffect(() => {
    setUser(sessionStorage.getItem('user'))
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top text-white navTotal">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand text-white" to="/">
          {/* <img src={logo} alt="logo" className='logoNav' /> */}
        </Link>
        <button className="navbar-toggler colorSpan" type="button" onClick={toggleNavbar}>
          <span className="navbar-toggler-icon colorSpan"></span>
        </button>
        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          id="navbarNav">
          <ul className="navbar-nav ml-auto d-flex align-items-end gap-4">
            <li className="nav-item">
            <Link className="nav-link text-white" to= "/mainpage" onClick={closeNavbar}>Trabajos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/aboutus" onClick={closeNavbar}>Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/contact" onClick={closeNavbar}>Contacto</Link>
            </li>
            {
              user !== null &&
                <li className=''>
                  <Link className="nav-link text-white" to="/admin" onClick={closeNavbar}>Administración</Link>
                </li>
            }
            {
              user !== null &&
                <li>
                  <Link className="nav-link text-white" onClick={handleClick}>Cerrar sesión</Link>
                </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
