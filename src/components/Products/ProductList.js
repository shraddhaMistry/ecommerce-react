import { CCard, CCardBody, CCardHeader, CCol, CRow, CButton } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { config } from '../../config'
import { Link, useNavigate } from 'react-router-dom'

const baseUrl = `${config.apiUrl}`

const ProductList = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Product Name',
      selector: (row) => row.name,
    },
    {
      name: 'Product Categories',
      selector: (row) => row.category_names,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <CButton
            className="m-1"
            color="info"
            size="sm"
            onClick={() => navigate(`/edit-product/${row.id}`)}
          >
            Edit
          </CButton>
          <CButton className="m-1" color="danger" size="sm" onClick={() => handleDelete(row.id)}>
            Delete
          </CButton>
        </div>
      ),
    },
  ]
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${baseUrl}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setProducts(response.data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // If user confirms delete
      deleteItem(id)
    }
  }

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${baseUrl}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchProducts() // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Product</strong>
          </CCardHeader>
          <CRow className='p-3'>
            <CCol xs={10}>
              <h4>Product List</h4>
            </CCol>
            <CCol xs={2} className=" mt-2">
              <Link to="/add-product" className="d-grid">
                  <CButton color="primary" shape="rounded-20" size="sm">Add Product</CButton>
              </Link>
            </CCol>
          </CRow>
          <CCardBody>
            <DataTable
              // title="Product List"
              columns={columns}
              data={products}
              defaultSortFieldId={1}
              pagination
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ProductList
