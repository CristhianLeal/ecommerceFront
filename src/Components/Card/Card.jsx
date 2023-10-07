import './card.css'
import { Link } from 'react-router-dom'

const Card = ({ product }) => {
  return (
    <div className="card border-0">
      <Link className=' text-decoration-none' to={`/detailpage/${product._id}`}>
        <img src={product.imageUrl} className="card-img-top img-fluid border-0" alt="Imagen" />
        <div className="card-body">
          <h5 className="card-title text-black text-center">{product.name}</h5>
          <p className="card-text text-black text-center">Precio:$ {product.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
