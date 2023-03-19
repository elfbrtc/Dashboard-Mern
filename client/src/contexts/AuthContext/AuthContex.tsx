import {useState, createContext, FC, PropsWithChildren, useContext, useEffect } from 'react'
import instance from '../../services/instance'
import { AuthContextProps, StateType, UserType } from './types';


const initialState: StateType = {
    isLoggedIn: Boolean(localStorage.getItem('token')),
    token: localStorage.getItem('token') || '',
    username: localStorage.getItem('username') ||  '',
  }

export const AuthContext = createContext<AuthContextProps>({
  setAuthLoading: () => {},
  authLoading: false,
  handleLogout: () => {},
  handleAuth : () => {},
  state: initialState
});

export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [authLoading, setAuthLoading] = useState(false)
  const [state, setState] = useState<StateType>(initialState)


  useEffect(() => {
    instance.interceptors.response.use(
      (response) => {                
        const _config = { ...response}
        _config.headers = {
          ...response.headers,
        }
        _config.headers.Authorization = 'Bearer ' + state.token
        console.log("Success")
        return _config
      },
      (error) => {
          
        if ([401, 403].includes(error.response.status)) {
          console.log("Error")
          handleLogout()
        }
        return Promise.reject(error);
      }
    )
  }, [state.token])

  const handleLogout = async () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    instance.defaults.headers.common['Authorization'] = ''
    setAuthLoading(false)

    setState({
      username: '' ,
      token: '',
      isLoggedIn: false
    })
  }

  const handleAuth = async (UserType: UserType) => {
    localStorage.setItem('token', UserType.token)
    localStorage.setItem('username', UserType.username)

    setState({
      username: UserType.username,
      token: UserType.token,
      isLoggedIn: true
    })
  }

  const stateValues = {
    setAuthLoading,
    authLoading,
    handleLogout,
    handleAuth,
    state
  };

  return (
    <AuthContext.Provider
      value={
        stateValues
      }
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const { authLoading, setAuthLoading, handleLogout, handleAuth, state } = useContext(AuthContext)
  return { authLoading, setAuthLoading, handleLogout, handleAuth, state }
}