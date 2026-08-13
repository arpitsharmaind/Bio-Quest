import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import Login from './pages/admin/Login.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import CategoriesAdmin from './pages/admin/CategoriesAdmin.jsx'
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx'
import SlidesAdmin from './pages/admin/SlidesAdmin.jsx'
import ContactInfoAdmin from './pages/admin/ContactInfoAdmin.jsx'
import ContactsAdmin from './pages/admin/ContactsAdmin.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import ProtectedRoute from './components/admin/ProtectedRoute.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public storefront */}
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<CategoryPage />} />

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="slides" element={<SlidesAdmin />} />
        <Route path="categories" element={<CategoriesAdmin />} />
        <Route path="products" element={<ProductsAdmin />} />
        <Route path="contact-info" element={<ContactInfoAdmin />} />
        <Route path="contacts" element={<ContactsAdmin />} />
      </Route>
    </Routes>
  )
}
