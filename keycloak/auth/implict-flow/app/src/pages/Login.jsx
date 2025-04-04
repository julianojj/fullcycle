import { useEffect, useMemo } from "react"
import { Navigate} from 'react-router'
import { useAuth } from "../context/auth"

const Login = () => {
    const { makeLogin, isAuth } = useAuth()

    useEffect(() => {
        if(!isAuth) {
            window.location.href = makeLogin()
        }
    }, [])

    return (
        <>
            {!isAuth ? <div>...</div> : Navigate({ to: '/admin' })}
        </>
    )
}

export default Login
