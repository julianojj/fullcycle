import { useEffect } from "react"
import { useAuth } from "../context/auth"

const Logout = () => {
    const { logout } = useAuth()

    console.log('chamou')

    useEffect(() => {
        window.location.href = logout()
    }, [])

    return(
        <>Loading...</>
    )
}

export default Logout
