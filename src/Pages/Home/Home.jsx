import { useEffect, useRef, useState } from 'react'
import './home.css'
import { Card, HomeButton } from '../../Components'
import { useProducts } from '../../hooks/useProducts'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'

const Home = () => {
  const [visible, setVisible] = useState([])
  const { productsData } = useProducts()
  const [productsDataShow, setProductsDataShow] = useState([])
  const [filtredData, setFiltredData] = useState([])
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
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
    setVisible(visibilities)
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
    setProductsDataShow(productsData)
    if (filtredData.length > 0) {
      setProductsDataShow(filtredData)
    }
  }, [productsData, filtredData])
  const reload = () => {
    setProductsDataShow(productsData)
    reset()
    window.scrollTo(0, 0)
  }
  const onSubmit = async (data) => {
    setLoading(true)
    if (data !== null) {
      try {
        const headers = {
          'Content-Type': 'application/json'
        }
        const response = await axios.post('https://ecommerce-back-v671.onrender.com/products/filter', data, { headers })
        if (response.status === 200) {
          setFiltredData(response.data.data)
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error('Error al buscar producto', error)
        toast.error(error.response.data.message)
      }
      setLoading(false)
    }
  }

  return (
    <div className='conten'>
      <div className='portada d-flex justify-content-center flex-column'>
        <h1 ref={title} className={`title pt-5 text-center ${visible[0] ? 'titleVisible' : ''}`}>NUTRILU STORE</h1>
        <h2 ref={subTitle} className={`subTitle text-center ${visible[1] ? 'subTitleVisible' : ''}`}>TIENDA SALUDABLE</h2>
      </div>
      <div>
        <h2 ref={cardTitle} className={`subTitle mt-4 text-center cardTitle ${visible[2] ? 'cardTitleVisible' : ''}`}>NUESTROS PRODUCTOS</h2>
        <form className='d-flex align-items-center justify-content-center' onSubmit={handleSubmit(onSubmit)}>
          <div className=' pe-3'>
            <input
              type="text"
              className={`form-control ${errors.searchQuery ? 'is-invalid' : ''}`}
              placeholder="Busca tu producto!"
              {...register('searchQuery', {
                required: 'Contenido requerido',
                minLength: {
                  value: 3,
                  message: 'El contenido debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'El contenido no debe tener mas de 20 caracteres'
                }
              })}
            />
            {errors.searchQuery && <div className="invalid-feedback">{errors.searchQuery.message}</div>}
          </div>
          {!loading &&
            <button type="submit" className="btn btn-primary">
              BUSCAR
            </button>}
          {loading &&
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
          }
        </form>
        <div className='d-flex flex-wrap align-items-center justify-content-center gap-5 mt-3 mb-3'>
          {productsDataShow?.length === 0
            ? (
            <div className='d-flex flex-row'>
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
                <p className='d-flex justify-content-center align-items-center m-0 py-0 px-3'>Cargando productos...</p>
            </div>
              )
            : (productsDataShow?.map((product) => (
            <Card key={product.id} product={product} />
              )))}
        </div>
        <HomeButton onClick={reload}/>
      </div>
    </div>
  )
}

export default Home
