import './card.css'
import { Link } from 'react-router-dom'

const Card = ({ post }) => {
  const savePostId = () => {
    localStorage.setItem('postId', post._id)
  }
  return (
    <div className="card border-0">
      <Link className=' text-decoration-none' to="/detailpage" onClick={savePostId}>
        <img src={post.picture} className="card-img-top img-fluid border-0" alt="Imagen" />
        <div className="card-body">
          <h5 className="card-title text-white text-center">{post.name}</h5>
          <p className="card-text text-white text-center">{post.description}</p>
        </div>
      </Link>
    </div>
  )
}

export default Card
