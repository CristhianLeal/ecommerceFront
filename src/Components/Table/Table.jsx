import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useState, useEffect } from 'react'
import './table.css'
const Table = () => {
  const { productsData, deleteProduct, editProduct } = useProducts()
  const [loading, setLoading] = useState(true)
  const deleting = (id) => {
    setLoading(id)
    deleteProduct(id)
  }
  useEffect(() => {
    if (productsData?.length > 0) {
      setLoading([])
    }
  }, [productsData])
  return (
    <div>
      {loading === true
        ? <div className='d-flex flex-row align-items-center justify-content-center'>
            <div className="spinner-border" role="status">
              <span className="visually-hidden"></span>
            </div>
              <p className='d-flex justify-content-center align-items-center m-0 py-0 px-3'>Cargando productos...</p>
          </div>
        : ''
      }
      <table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th>Nombre</th>
            <th className='displayNone'>Descripción</th>
            <th className='displayNone'>URL Imagen</th>
            <th className='displayNone'>Price</th>
            <th>
              Acciones
              <Link className='text-decoration-none text-white' to={'/registerproduct'}>
                <button className="btn btn-primary action-button mx-2">
                  <i className="bi bi-arrow-up-circle"> Nuevo </i>
                </button>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {productsData?.map((product) => (
            <tr key={product.id}>
              <td>
                <p className='m-0'>{product.name}</p>
              </td>
              <td className='displayNone'>
                <p className='m-0'>{product.description}</p>
              </td>
              <td className='displayNone'>
                <p className='m-0'>{product.imageUrl}</p>
              </td>
              <td className='displayNone'>
                <p className='m-0'>{product.price}</p>
              </td>
              <td className='text-center'>
              {loading !== product.id
                ? <button className="btn btn-danger action-button" onClick={() => deleting(product.id) }>
                    <i className="bi bi-trash">Eliminar</i>
                  </button>
                : ''
              }
              {loading === product.id
                ? <div className="spinner-border" role="status">
                    <span className="visually-hidden"></span>
                  </div>
                : ''
              }
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
  )
}

export default Table
