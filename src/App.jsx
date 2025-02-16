import CoffeeForm from './components/CoffeeForm'
import History from './components/History'
import Layout from './components/Layout'
import Stats from './components/Stats'
import Hero from './components/Hero'

function App() {
  const isAuthenticated = false

  const authenticatedContent = (
    <>
      <Stats/>
      <History/>
    </>
  )

  return (
    <Layout>
      <Hero/>
      <CoffeeForm/>
      {/* If authenticated, show autheticated content*/}
      {isAuthenticated && (authenticatedContent)}
      <Layout/>
    </Layout>
  )
}

export default App
