import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
const Filter = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = async (data) => {
    if (data !== null) {
      console.log(data)
      try {
        const headers = {
          'Content-Type': 'application/json'
        }
        const response = await axios.post('http://localhost:8003/products/filter', data, { headers })
        if (response.status === 200) {
          toast.success(response.data.message)
        } else {
          toast.error(response.data.message)
        }
      } catch (error) {
        console.error('Error al buscar producto', error)
        toast.error(error.response.data.message)
      }
      reset()
    }
  }
  return (
    <div>
      <form className='d-flex align-items-center justify-content-center' onSubmit={handleSubmit(onSubmit)}>
        <div className=' pe-3'>
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
        <button type="submit" className="btn btn-primary">BUSCAR</button>
      </form>
    </div>
  )
}

export default Filter
