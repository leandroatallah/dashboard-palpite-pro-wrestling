import { useEffect } from 'react'
import Card from '../../../components/Card'
import AdminLayout from '../../../components/Admin/Layout'

const AdminDashboard = () => {

  useEffect(() => {
    // Check if is super user
  }, [])

  return (
    <AdminLayout title="Dashboard">
      <Card>
        Admin page
      </Card>
    </AdminLayout>
  )
}

export default AdminDashboard