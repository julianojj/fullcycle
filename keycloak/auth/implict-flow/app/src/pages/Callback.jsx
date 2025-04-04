import { useEffect, } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../context/auth";

const Callback = () => {
    const { hash } = useLocation()
    const {isAuth, login} = useAuth()

    useEffect(() => {
        const replacedHash = hash.replace('#', '')
        const searchParams = new URLSearchParams(replacedHash)
        const accessToken = searchParams.get("access_token")
        const idToken = searchParams.get("id_token")
        const state = searchParams.get("state")

        if (!accessToken || !idToken || !state) {
            Navigate({ to: '/login' })
        }

        login(accessToken, idToken, state)
    }, [hash])

    if (!isAuth) {
        return (
            <>
               <Navigate to='/login' />
            </>
        )
    }

    return (
        <>
            <Navigate to='/admin' />
        </>
    )


}

export default Callback
