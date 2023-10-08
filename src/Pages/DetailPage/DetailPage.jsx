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

  return (
    <div className='conten'>
      <div ref={ERef0} className={`Efectd1 ${visible[0] ? 'EfectVisibled1' : ''}`}>
        <h3 className='text-black text-center titleDetail mt-4'>{productData?.name}</h3>
        <div className='text-center pt-4 pb-4'>
          <img src={productData?.imageUrl} className="imgDetail border-0" alt="Imagen" onClick={() => toggleFullScreenImage(productData?.imageUrl)} />
        </div>
        <p className='text-black SubDetail text-center mb-4 px-2'>Descripción: {productData?.description}</p>
        <p className='text-black SubDetail text-center mb-4 px-2'>Precio:$ {productData?.price}!</p>
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
