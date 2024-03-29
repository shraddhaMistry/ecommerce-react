import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { config } from '../../config'
const baseUrl = `${config.apiUrl}`

const EditCategory = () => {
  const navigate = useNavigate()
  const [categoryData, setCategoryData] = useState({
    name: '',
    parent_id: null,
  })
  const [parentCategories, setParentCategories] = useState([])
  const [validated, setValidated] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Fetch category data by ID
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { name, parent_id } = response.data.data
        setCategoryData({ name: name, parent_id })
      } catch (error) {
        console.error('Error fetching category data:', error)
      }
    }

    // Fetch parent categories
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get(`${baseUrl}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setParentCategories(response.data.data)
      } catch (error) {
        console.error('Error fetching parent categories:', error)
      }
    }

    fetchCategoryData()
    fetchParentCategories()
  }, [id])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setCategoryData({ ...categoryData, [name]: value })
  }

  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token')
    event.preventDefault()
    try {
      await axios.put(`${baseUrl}/categories/${id}`, categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Redirect or show a success message
      navigate('/categories')
    } catch (error) {
      console.error('Error updating category:', error)
      // Handle errors
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Category</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom01">Category Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="categoryName"
                  name="name"
                  value={categoryData.name}
                  onChange={handleInputChange}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom04">Select Parent Category</CFormLabel>
                <CFormSelect
                  id="parent_id"
                  name="parent_id"
                  value={categoryData.parent_id || ''}
                  onChange={handleInputChange}
                >
                  <option value="">No Parent Category</option>
                  {parentCategories.map((parentCategory) => (
                    <option key={parentCategory.id} value={parentCategory.id}>
                      {parentCategory.category_name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid category.</CFormFeedback>
              </CCol>
              <CCol xs={12}>
                <CButton color="primary" type="submit">
                  Submit form
                </CButton>
              </CCol>
            </CForm>
            {/* <DocsExample href="forms/validation">{CustomStyles()}</DocsExample> */}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EditCategory
