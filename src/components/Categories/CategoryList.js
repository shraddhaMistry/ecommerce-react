import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom'

import { config } from '../../config'
const baseUrl = `${config.apiUrl}`

const CategoryList = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const columns = [
    {
      name: 'ID',
      selector: (row) => row.id,
    },
    {
      name: 'Category Name',
      selector: (row) => row.category_name,
    },
    {
      name: 'Parent Name',
      selector: (row) => row.parent_category_name,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div>
          <CButton className="m-1" color="info" size="sm" onClick={() => navigate(`/edit-category/${row.id}`)}>
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
    fetchCategory()
  }, [])

  const fetchCategory = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`${baseUrl}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCategories(response.data.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleEdit = (id) => {
    // Handle edit action
    console.log('Edit clicked for id:', id)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      // If user confirms delete
      deleteItem(id);
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`${baseUrl}/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      fetchCategory(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Category</strong>
          </CCardHeader>
          <CRow className='p-3'>
            <CCol xs={10}>
              <h4>Category List</h4>
            </CCol>
            <CCol xs={2} className=" mt-2">
              <Link to="/add-category" className="d-grid">
                  <CButton color="primary" shape="rounded-20" size="sm">Add Category</CButton>
              </Link>
            </CCol>
          </CRow>
          <CCardBody>
            <DataTable
              // title="Category List"
              columns={columns}
              data={categories}
              defaultSortFieldId={1}
              pagination
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default CategoryList
