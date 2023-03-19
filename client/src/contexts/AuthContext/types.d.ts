export type StateType = {
    username: string,
    token: string
    isLoggedIn: boolean

  }

  export type UserType = {
    username: string
    token: string
  }

  export type AuthContextProps = {
    setAuthLoading: (loading: boolean) => void
    authLoading: boolean
    handleLogout: () => void
    handleAuth: (UserType: UserType) => void
    state: StateType
  }

