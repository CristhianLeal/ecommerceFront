import { useEffect, useRef, useState } from 'react'
import './home.css'
import Card from '../../Components/Card/Card'
import { useProducts } from '../../hooks/useProducts'

const Home = () => {
  const [refVisible, setRefVisible] = useState([])
  const { productsData } = useProducts()
  const title = useRef(null)
  const subTitle = useRef(null)
  const cardTitle = useRef(null)

  const handleScroll = () => {
    const refs = [title, subTitle, cardTitle]
    const visibilities = refs.map((ref) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        return rect.top <= window.innerHeight && rect.bottom >= 0
      }
      return false
    })
    setRefVisible(visibilities)
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
      <div className='portada d-flex justify-content-center flex-column'>
        <h1 ref={title} className={`title pt-5 text-center ${refVisible[0] ? 'titleVisible' : ''}`}>NUTRILU STORE</h1>
        <h2 ref={subTitle} className={`subTitle text-center ${refVisible[1] ? 'subTitleVisible' : ''}`}>TIENDA SALUDABLE</h2>
      </div>
      <div>
        <h2 ref={cardTitle} className={`subTitle mt-4 text-center cardTitle ${refVisible[2] ? 'cardTitleVisible' : ''}`}>NUESTROS PRODUCTOS</h2>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5 mt-3 mb-3'>
          {productsData.length === 0
            ? (
            <div>Cargando productos...</div>
              )
            : (productsData.map((product) => (
            <Card key={product._id} product={product} />
              )))}
        </div>
      </div>
    </div>
  )
}

export default Home
