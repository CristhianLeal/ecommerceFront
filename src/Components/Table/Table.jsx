import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import './table.css'
const Table = () => {
  const { productsData, deleteProduct, editProduct } = useProducts()
  return (
    <div>
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
            <tr key={product._id}>
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
  )
}

export default Table
