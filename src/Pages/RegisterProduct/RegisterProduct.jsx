import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import './registerProduct.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const RegisterProduct = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  const onSubmit = async (data) => {
    setLoading(true)
    if (name === null) {
      try {
        const token = sessionStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          accesstoken: `${token}`
        }
        const response = await axios.post('https://ecommerce-back-v671.onrender.com/products', data, { headers })
        if (response.status === 201) {
          reset()
          toast.success(response.data.message)
          window.location.href = '/adminproducts'
        } else {
          toast.error(response.data)
        }
      } catch (error) {
        console.error('Error al crear producto', error)
        toast.error(error.response.data.message)
      }
    } else {
      try {
        const token = sessionStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          accesstoken: `${token}`
        }
        const response = await axios.put(`https://ecommerce-back-v671.onrender.com/products/${id}`, data, { headers })
        if (response.status === 201) {
          toast.success(response.data.message)
          clearStorage()
          window.location.href = '/adminproducts'
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error('Error al editar producto', error)
        toast.error(error.response.data.message)
      }
    }
  }
  const id = localStorage.getItem('key')
  const name = localStorage.getItem('name')
  const description = localStorage.getItem('description')
  const imageUrl = localStorage.getItem('imageUrl')
  const price = localStorage.getItem('price')
  useEffect(() => {
    setValue('name', name)
    setValue('description', description)
    setValue('imageUrl', imageUrl)
    setValue('price', price)
  }, [])
  const clearStorage = () => {
    localStorage.clear()
  }

  return (
    <div className="background-black d-flex flex-column">
      <div className="form-container p-3 w-75">
        <h3 className="text-center">{name === null ? 'CREAR PRODUCTO' : `EDITAR PRODUCTO ${name}`}</h3>
        <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Frutos Secos"
              {...register('name', {
                required: 'El nombre es requerido',
                minLength: {
                  value: 3,
                  message: 'El Nombre debe tener al menos 3 caracteres'
                },
                maxLength: {
                  value: 20,
                  message: 'El Nombre no debe tener más de 20 caracteres'
                }
              })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              placeholder="Nueces y almendras"
              {...register('description', {
                required: 'La descripción es requerida',
                minLength: {
                  value: 5,
                  message: 'La descripción debe tener la menos 5 caracteres'
                },
                maxLength: {
                  value: 30,
                  message: 'La descripción no debe tener más de 30 caracteres'
                }
              })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">URL Imagen</label>
            <input
            type="text"
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            placeholder="www.foto.com"
            {...register('imageUrl', {
              required: 'La imagen es requerida',
              minLength: {
                value: 5,
                message: 'La imagen debe tener al menos 5 caracteres'
              },
              maxLength: {
                value: 500,
                message: 'La imagen no debe tener más de 500 caracteres'
              }
            })} />
            {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
            type="number"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="1500"
            {...register('price', {
              required: 'El precio es requerido',
              minLength: {
                value: 2,
                message: 'El precio debe tener al menos 2 caracteres'
              },
              maxLength: {
                value: 10,
                message: 'El precio no debe tener más de 10 caracteres'
              }
            })} />
            {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
          </div>
          {!loading && <button type="submit" className="btn btn-primary">
            {name === null ? 'CREAR PRODUCTO' : 'EDITAR PRODUCTO'}
          </button>}
          {loading && (
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
          )}
        </form>
      </div>
      <div className='d-flex flex-row'>
        <Link className='text-decoration-none text-white mt-4' to={'/adminproducts'} onClick={clearStorage}>
          <button className="btn btn-primary action-button mx-2">
            ATRAS
          </button>
        </Link>
      </div>
    </div>
  )
}

export default RegisterProduct
