import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import RegisterForm from '../components/RegisterForm/RegisterForm'
import { RegisterFormProps } from '../components/RegisterForm/types'
import { AuthContext } from '../contexts/AuthContext/AuthContex'
import { auth } from '../services/endpoints/auth'

const RegisterPage:FC = (props) => {
  const navigate = useNavigate()

  const {handleAuth} = React.useContext(AuthContext)

  const handleRegister: RegisterFormProps['onRegister'] = (values) => {
    auth.register(values).then(({data}) => {
      handleAuth({ token: data.token, username: data.username })
      navigate('/', { replace: true })
    })

  }

  return (
    <RegisterForm onRegister ={handleRegister} />
  )
}

export default RegisterPage