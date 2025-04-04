import { decodeJwt } from "jose"
import { useEffect, useState } from "react"
import { useAuth } from "../context/auth"
import { Navigate, useNavigate } from "react-router"

const Admin = () => {
    const { accessToken } = useAuth()
    const navigate = useNavigate()
    const [data, setData] = useState('')

    useEffect(() => {
        setData(decodeJwt(accessToken).name)
    }, [])

    return (
        <>
            <h1>Olá, {data}</h1>
            <button onClick={() => navigate('/logout')} >Logout</button>
        </>
    )
}

export default Admin
