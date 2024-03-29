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
  CRow,
} from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { config } from '../../config'
const baseUrl = `${config.apiUrl}`

const EditProduct = () => {
  const navigate = useNavigate()
  const [productData, setProductData] = useState({
    name: '',
    category_id: null,
  })
  const [parentCategories, setParentCategories] = useState([])
  const [validated, setValidated] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Fetch category data by ID
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        const { name, category_id } = response.data.data
        setProductData({ name, category_id })
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
    setProductData({ ...productData, [name]: value })
  }

  const handleSubmit = async (event) => {
    const token = localStorage.getItem('token')
    event.preventDefault()
    productData.category_id = selectedCategories
    try {
      await axios.put(`${baseUrl}/products/${id}`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      // Redirect or show a success message
      navigate('/products')
    } catch (error) {
      console.error('Error updating category:', error)
      // Handle errors
    }
  }

  const handleSelectChange = (event) => {
    setSelectedCategories(Array.from(event.target.selectedOptions, (option) => option.value))
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Product</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom01">Product Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom04">Select Category</CFormLabel>
                <CFormSelect
                  id="validationCustom04"
                  value={selectedCategories}
                  onChange={handleSelectChange}
                  multiple
                >
                  <option value="">Select an Category</option>
                  {parentCategories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.category_name}
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

export default EditProduct
