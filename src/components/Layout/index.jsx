import Header from '../../components/Header'

function App(props) {
  return (
    <div className="pb-10">
      <Header />

      <div className="xl:container mx-auto px-4">
        {props.children}
      </div>
    </div>
  )
}

export default App
