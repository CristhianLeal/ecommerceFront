import './adminProducts.css'
import { Table } from '../../Components'

const AdminProducts = () => {
  return (
    <div className="admin-container mt-5">
      <div className='container'>
        <h2 className="mt-3 text-center text-black">Productos</h2>
        <Table/>
      </div>
    </div>
  )
}

export default AdminProducts
