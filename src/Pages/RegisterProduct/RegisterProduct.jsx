import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import './registerProduct.css'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const RegisterProduct = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
  const onSubmit = async (data) => {
    if (name === null) {
      try {
        console.log(data)
        const token = sessionStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          accesstoken: `${token}`
        }
        const response = await axios.post('http://localhost:8003/products', data, { headers })
        if (response.status === 201) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data)
        }
      } catch (error) {
        console.error('Error al crear producto', error)
        toast.error(error.response.data.message)
      }
      reset()
    } else {
      try {
        const token = sessionStorage.getItem('token')
        const headers = {
          'Content-Type': 'application/json',
          accesstoken: `${token}`
        }
        const response = await axios.put(`http://localhost:8003/products/${id}`, data, { headers })
        if (response.status === 201) {
          toast.success(response.data.message)
          clearStorage()
          window.location.href = '/adminabout'
        } else {
          toast.error(response.data)
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
      <div className="form-container p-3 w-50">
        <h3 className="text-center">{name === null ? 'CREAR PRODUCTO' : `EDITAR PRODUCTO ${name}`}</h3>
        <form className='text-center' onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="Frutos Secos"
              {...register('name', {
                required: 'name is required',
                minLength: {
                  value: 3,
                  message: 'El Nombre debe tener al menos 3 caracteres'
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
                required: 'description is required',
                minLength: {
                  value: 5,
                  message: 'La descripción debe tener la menos 5 caracteres'
                }
              })}
            />
            {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Imagen</label>
            <input
            type="text"
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            placeholder="www.foto.com"
            {...register('imageUrl', {
              required: 'imageUrl is required',
              minLength: {
                value: 5,
                message: 'La imagen debe tener al menos 5 caracteres'
              }
            })} />
            {errors.imageUrl && <div className="invalid-feedback">{errors.imageUrl.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Formato</label>
            <input
            type="text"
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder="1500"
            {...register('price', {
              required: 'price is required',
              minLength: {
                value: 2,
                message: 'El precio debe tener al menos 2 caracteres'
              }
            })} />
            {errors.price && <div className="invalid-feedback">{errors.price.message}</div>}
          </div>
          <button type="submit" className="btn btn-primary">{name === null ? 'CREAR PRODUCTO' : 'EDITAR PRODUCTO'}</button>
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
