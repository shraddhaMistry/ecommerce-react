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
import { Link, useNavigate } from 'react-router-dom'
import { config } from '../../config'
const baseUrl = `${config.apiUrl}`

const AddProduct = () => {
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [productName, setProductName] = useState('')

  const handleSubmit = async (event) => {
    try {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      setValidated(true)
      // if (validated === true) {
        console.log({
          name: productName,
          category_id: selectedCategories,
        });
        const token = localStorage.getItem('token')
        await axios.post(
          `${baseUrl}/products`,
          {
            name: productName,
            category_id: selectedCategories,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        )
        // Redirect to categories or any other page
        navigate('/products')
      // }
    } catch (error) {
      setError('Invalid username or password')
      console.error('Error logging in:', error)
    }
  }

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

  const handleSelectChange = (event) => {
    setSelectedCategories(Array.from(event.target.selectedOptions, option => option.value));
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Add Product</strong>
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
                  placeholder="Product Name"
                  autoComplete="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
                <CFormFeedback valid>Looks good!</CFormFeedback>
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="validationCustom04">Select Categories</CFormLabel>
                <CFormSelect
                  id="validationCustom04"
                  value={selectedCategories}
                  onChange ={handleSelectChange}
                  multiple
                >
                  <option value="">Select an Category</option>
                  {categories.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.category_name}
                    </option>
                  ))}
                </CFormSelect>
                <CFormFeedback invalid>Please provide a valid city.</CFormFeedback>
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

export default AddProduct
