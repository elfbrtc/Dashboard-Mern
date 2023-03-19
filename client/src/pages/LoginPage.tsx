import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import LoginForm from '../components/LoginForm/LoginForm'
import { LoginFormProps } from '../components/LoginForm/types'
import { AuthContext } from '../contexts/AuthContext/AuthContex'
import { auth } from '../services/endpoints/auth'

const LoginPage:FC = (props) => {

  const navigate = useNavigate()

  const {handleAuth} = React.useContext(AuthContext)

  const handleLogin: LoginFormProps['onLogin'] = (values) => {
    auth.login(values).then(({data}) => {
      handleAuth({ token: data.token, username: data.username })
      navigate('/')
    })

  }

  return (
    <LoginForm onLogin ={handleLogin} />
  )
}

export default LoginPage