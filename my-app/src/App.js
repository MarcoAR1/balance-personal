import Background from './components/Background'
import Form from './components/Form'
import HomeBalance from './components/HomeBalance'
import './styles/App.css'
import useUser from './hooks/useUser'
function App() {
  const { userInfo } = useUser()
  return (
    <Background>
      {userInfo.name ? <HomeBalance /> : <Form />}
    </Background>
  )
}

export default App
