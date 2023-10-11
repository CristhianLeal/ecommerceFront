import { Link } from 'react-router-dom'
const HomeButton = ({ onClick }) => {
  return (
    <div className='my-2'>
      <div className='text-center'>
        <Link className='text-decoration-none text-white mt-4 ' to={'/'}>
          <button className="btn btn-success mx-2" onClick={onClick}>
            INICIO
          </button>
        </Link>
      </div>
  </div>
  )
}

export default HomeButton
