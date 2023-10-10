import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
export const useProducts = (id) => {
  const [productsData, setProductsData] = useState([])
  const [productData, setProductData] = useState([])
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
    localStorage.clear()
  }, [deleted])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/products/${id}`)
        setProductData(response.data.product)
      } catch (error) {
        console.error('Error al obtener los posts:', error)
      }
    }
    if (id !== undefined) {
      fetchPost()
    }
  }, [])

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
    localStorage.setItem('key', product.id)
    localStorage.setItem('name', product.name)
    localStorage.setItem('description', product.description)
    localStorage.setItem('imageUrl', product.imageUrl)
    localStorage.setItem('price', product.price)
  }

  return { productsData, deleteProduct, editProduct, productData }
}
