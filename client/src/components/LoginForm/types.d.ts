export type LoginFormValuesProops = {
    username: string
    password: string
}

export type LoginFormProps = {
    onLogin: (values: LoginFormValuesProops) => void
}