import CoffeeForm from './components/CoffeeForm'
import History from './components/History'
import Layout from './components/Layout'
import Stats from './components/Stats'
import Hero from './components/Hero'
import { useAuth } from './context/AuthContext'

function App() {
  const { globalData } = useAuth()
  const isAuthenticated = globalData
  // if globalData exists and list of entries is more than 0
  const isData = globalData && !!Object.keys(globalData || {}).length // !! force converts to bool

  const authenticatedContent = (
    <>
      <Stats/>
      <History/>
    </>
  )

  return (
    <Layout>
      <Hero/>
      <CoffeeForm isAuthenticated={isAuthenticated}/>
      {/* If authenticated, show autheticated content*/}
      {(isAuthenticated && isData) && (authenticatedContent)}
    </Layout>
  )
}

export default App
