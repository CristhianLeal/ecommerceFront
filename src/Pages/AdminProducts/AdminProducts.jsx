import './adminProducts.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminProducts = () => {
  const [productsData, setProductsData] = useState([])
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8003/products')
        setProductsData(response.data.products)
      } catch (error) {
        console.error('Error al obtener los datos de los productos:', error)
      }
    }
    fetchProducts()
    // localStorage.clear()
  }, [deleted])

  const deleteProduct = async (id) => {
    try {
      const token = sessionStorage.getItem('token')
      const headers = {
        'Content-Type': 'application/json',
        accesstoken: `${token}`
      }
      const response = await axios.delete(`http://localhost:8003/products/${id}`, { headers })
      if (response.status === 200) {
        toast.success(response.data.message)
        setDeleted(!deleted)
      } else {
        toast.error(response.data)
      }
    } catch (error) {
      console.error('Error al intentar eliminar el producto:', error)
    }
  }
  const editProduct = (product) => {
    localStorage.setItem('key', product._id)
    localStorage.setItem('name', product.name)
    localStorage.setItem('description', product.description)
    localStorage.setItem('imageUrl', product.imageUrl)
    localStorage.setItem('price', product.price)
  }
  return (
    <div className="admin-container mt-5">
      <div className='container'>
        <h2 className="mt-3 text-center text-black">Productos</h2>
        <table className="table table-dark table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>URL Imagen</th>
              <th>Price</th>
              <th>
                Acciones
                <Link className='text-decoration-none text-white' to={'/registerproduct'}>
                  <button className="btn btn-primary action-button mx-2">
                    <i className="bi bi-arrow-up-circle"> Subir Producto </i>
                  </button>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody>
            {productsData?.map((product) => (
              <tr key={product._id}>
                <td>
                  <p className='m-0'>{product.productName}</p>
                </td>
                <td>
                  <p className='m-0'>{product.description}</p>
                </td>
                <td>
                  <p className='m-0'>{product.imageUrl}</p>
                </td>
                <td>
                  <p className='m-0'>{product.price}</p>
                </td>
                <td>
                  <button className="btn btn-danger action-button" onClick={() => deleteProduct(product._id) }>
                    <i className="bi bi-trash">Eliminar</i>
                  </button>
                  <Link className='text-decoration-none text-white' to={'/registerproduct'} onClick={() => editProduct(product)}>
                    <button className="btn btn-success action-button">
                      <i className="bi bi-pen">Editar</i>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminProducts
