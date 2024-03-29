import React from 'react'

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'))
const CategoryList = React.lazy(() => import('./components/Categories/CategoryList'))
const ProductList = React.lazy(() => import('./components/Products/ProductList'))
const AddCategory = React.lazy(() => import('./components/Categories/AddCategory'))
const EditCategory = React.lazy(() => import('./components/Categories/EditCategory'))
const AddProduct = React.lazy(() => import('./components/Products/AddProduct'))
const EditProduct = React.lazy(() => import('./components/Products/EditProduct'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/categories', name: 'Category List', element: CategoryList },
  { path: '/products', name: 'Product List', element: ProductList },
  { path: '/add-category', name: 'Add Category', element: AddCategory },
  { path: '/edit-category/:id', name: 'Edit Category', element: EditCategory },
  { path: '/add-product', name: 'Add Product', element: AddProduct },
  { path: '/edit-product/:id', name: 'Edit PRoduct', element: EditProduct },
]

export default routes
