import { useEffect, useState } from 'react'
import Background from './components/Background'
import Form from './components/Form'
import HomeBalance from './components/HomeBalance'
import { setTokens } from './services/balances'
import './styles/App.css'

function App() {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const userData = window.localStorage.getItem('infoUser')
    if (userData) {
      setTokens(JSON.parse(userData).token)
      setUserInfo(JSON.parse(userData))
    }
  }, [])
  return (
    <Background>
      {userInfo ? (
        <HomeBalance userInfo={userInfo} />
      ) : (
        <Form handleChangeUser={setUserInfo} />
      )}
    </Background>
  )
}

export default App
