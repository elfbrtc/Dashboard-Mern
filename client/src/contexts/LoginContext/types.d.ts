export type StateType= {
    isLoggedIn: boolean;
    token: string;
    username: string;
}

export type ContextType = {
    login: (username: string, password: string) => void;
    logout: () => void;
    state: StateType;
}