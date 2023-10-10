import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './detailPage.css'

import { useProducts } from '../../hooks/useProducts'

const DetailPage = () => {
  const { id } = useParams()
  const { productData } = useProducts(id)
  const [visible, setVisible] = useState([])
  const [showFullScreenImage, setShowFullScreenImage] = useState(false)
  const [photo, setPhoto] = useState(false)
  const [loading, setLoading] = useState(true)
  const ERef0 = useRef(null)
  const handleScroll = () => {
    const refs = [ERef0]
    const visibilities = refs.map((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= window.innerHeight && rect.bottom >= 0
      }
      return false
    })
    setVisible(visibilities)
  }
  const toggleFullScreenImage = (foto) => {
    setPhoto(foto)
    setShowFullScreenImage((prev) => !prev)
  }
  useEffect(() => {
    handleScroll()
    window.scrollTo(0, 0)
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (productData.id > 0) {
      setLoading(false)
    }
  }, [productData])

  return (
    <div className='conten'>
      {loading === true
        ? <div className='d-flex flex-row align-items-center justify-content-center'>
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
              <p className='d-flex justify-content-center align-items-center m-0 py-0 px-3'>Cargando productos...</p>
          </div>
        : ''
      }
      <div ref={ERef0} className={`Efectd1 ${visible[0] ? 'EfectVisibled1' : ''}`}>
        <h3 className='text-black text-center titleDetail mt-4'>{productData?.name}</h3>
        <div className='d-flex flex-column flex-md-row justify-content-center align-items-center gap-0 gap-lg-5 pt-2 pb-3'>
          <img src={productData?.imageUrl} className="imgDetail mx-2 mb-4 mb-md-0" alt="Imagen" onClick={() => toggleFullScreenImage(productData?.imageUrl)} />
          <div>
            <p className='text-black SubDetail text-center mb-4 mb-md-0 px-2'>Descripción: {productData?.description}</p>
          </div>
        </div>
        <p className='text-black SubDetail text-center mb-3 px-2'>Precio:$ {productData?.price}!</p>
        <div className='text-center'>
          <Link className='text-decoration-none text-white mt-4 ' to={'/'}>
            <button className="btn btn-success mx-2">
              ATRAS
            </button>
          </Link>
        </div>
      </div>
      {showFullScreenImage && (
        <div className="fullscreen-image-overlay" onClick={toggleFullScreenImage}>
          <img src={photo} className="fullscreen-image" alt="Imagen" />
        </div>
      )}
    </div>
  )
}

export default DetailPage
