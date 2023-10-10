import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'
import axios from 'axios'
const Filter = () => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSubmit = async (data) => {
    setLoading(true)
    if (data !== null) {
      try {
        const headers = {
          'Content-Type': 'application/json'
        }
        const response = await axios.post('https://ecommerce-back-v671.onrender.com/products/filter', data, { headers })
        if (response.status === 200) {
          toast.success(response.data.message)
          window.location.href = `/detailpage/${response.data.data[0].id}`
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
    <div>
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
    </div>
  )
}

export default Filter
