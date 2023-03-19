export type RegisterFormValuesProps = {
    username: string
    password: string
}

export type RegisterFormProps = {
    onRegister: (values: RegisterFormValuesProps) => void
}