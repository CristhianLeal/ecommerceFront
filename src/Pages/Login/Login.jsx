import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import './login.css'

const Login = () => {
  const token = sessionStorage.getItem('token')
  if (token !== null) {
    window.location.href = '/adminproducts'
  }
  const [code, setCreationCode] = useState('')
  const [submitButtonText, setSubmitButtonText] = useState('Login')
  const [message, setMessage] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    if (code !== '') {
      setMessage('Creando usuario...')
      try {
        const response = await axios.post('http://localhost:8003/users', {
          username: data.username,
          password: data.password,
          code: data.code
        })
        if (response.status === 200) {
          toast.success(response.data.message)
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('user', data.username)
          window.location.href = '/adminproducts'
        } else {
          toast.error(response.data)
          setMessage('Error creando usuario...')
        }
      } catch (error) {
        console.error('Error al crear usuario', error)
        toast.error(error.response.data.message)
        setMessage('Error al crear usuario')
      }
    } else {
      setMessage('Iniciando sesión...')
      try {
        const response = await axios.post('http://localhost:8003/users/login', {
          username: data.username,
          password: data.password
        })
        console.log(response)
        if (response.status === 200) {
          toast.success(`Bienvenido ${response.data.User.username}!`)
          sessionStorage.setItem('token', response.data.token)
          sessionStorage.setItem('user', data.username)
          reset()
          window.location.href = '/adminproducts'
        } else {
          toast.error(response.data.message)
          setMessage('Error en usuario o contraseña...')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleCodeChange = (event) => {
    const newCode = event.target.value
    if (newCode.length === 0) {
      setSubmitButtonText('Login')
    } else {
      setSubmitButtonText('Crear Usuario')
    }
    setCreationCode(newCode)
  }

  return (
    <div className="login-container mt-5 mb-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
            <div className="login-form">
              <h1>Login</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label>Usuario</label>
                  <input
                    type="username"
                    className="form-control"
                    placeholder="Enter username"
                    {...register('username', {
                      required: 'El usuario es requerido',
                      minLength: {
                        value: 3,
                        message: 'El Usuario debe tener al menos 3 caracteres'
                      },
                      maxLength: {
                        value: 20,
                        message: 'El Usuario no debe tener más de 20 caracteres'
                      }
                    })}
                  />
                  {errors.username && <span className="error">{errors.username.message}</span>}
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    {...register('password', {
                      required: 'La contraseña es requerida',
                      minLength: {
                        value: 3,
                        message: 'La contraseña debe tener al menos 3 caracteres'
                      },
                      maxLength: {
                        value: 20,
                        message: 'La contraseña no debe tener más de 20 caracteres'
                      }
                    })}
                  />
                  {errors.password && <span className="error">{errors.password.message}</span>}
                </div>
                <div className="form-group">
                  <label>Código de Creación</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingrese el código de creación"
                    {...register('code')}
                    onChange={handleCodeChange}
                  />
                  {errors.code && <span className="error">{errors.code.message}</span>}
                </div>
                <div className="text-center mt-3">
                  <button className="btn btn-primary" type="submit">
                    {submitButtonText}
                  </button>
                  <p className="message mt-3">{message}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
