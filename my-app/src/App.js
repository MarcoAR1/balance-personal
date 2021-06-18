import Background from './components/Background'
import Form from './components/Form'
import HomeBalance from './components/HomeBalance'
import './styles/App.css'
import useStartApp from './hooks/useStartApp'
import { useSelector } from 'react-redux'
function App() {
  const userInfo = useSelector((state) => state.user)
  useStartApp()
  return (
    <Background>
      {userInfo.name ? <HomeBalance /> : <Form />}
    </Background>
  )
}

export default App
