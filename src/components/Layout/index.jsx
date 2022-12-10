import Header from '../../components/Header'
import AdminProtectedProvider from '../Admin/ProtectedProvider'

function App(props) {
  return (
    <AdminProtectedProvider>
      <div className="pb-10">
        <Header />

        <div className="xl:container mx-auto px-4">
          {props.children}
        </div>
      </div>
    </AdminProtectedProvider>
  )
}

export default App
