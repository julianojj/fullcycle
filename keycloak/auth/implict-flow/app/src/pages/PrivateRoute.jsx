import { Navigate } from "react-router"
import { useAuth } from "../context/auth"

const PrivateRoute = (props) => {
    const { isAuth } = useAuth()

    if (!isAuth) {
        return <Navigate to='/login' />
    }

    return props.children
}

export default PrivateRoute
