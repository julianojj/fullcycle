import { createContext, useEffect, useState } from 'react'
import { useContext } from 'react'
import { decodeJwt } from 'jose'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(null)
    const [idToken, setIdToken] = useState(null)
    const [state, setState] = useState(null)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            setAccessToken(localStorage.getItem('access_token'))
        }
        if (localStorage.getItem('id_token')) {
            setIdToken(localStorage.getItem('id_token'))
        }
        if (localStorage.getItem('state')) {
            setState(localStorage.getItem('state'))
        }
    }, [])

    const makeLogin = () => {
        const nonce = Math.random().toString(36)
        const state = Math.random().toString(36)
        
        localStorage.setItem("nonce", nonce)
        localStorage.setItem("state", state)
    
        const params = new URLSearchParams({
            client_id: 'normal-client',
            redirect_uri: 'http://localhost:5173/callback',
            response_type: 'token id_token',
            scope: 'openid',
            nonce,
            state
        })
    
        return `http://localhost:8080/realms/master/protocol/openid-connect/auth?${params.toString()}`
    }    

    const login = (accessToken, idToken, state) => {
        if (localStorage.getItem('state') !== state) {
            throw new Error('invalid state')
        }

        let decodedAccessToken = null
        let decodedIdToken = null

        try {
            decodedAccessToken = decodeJwt(accessToken)
            decodedIdToken = decodeJwt(idToken)
        } catch {
            throw new Error('invalid token')
        }

        if (localStorage.getItem('nonce') !== decodedIdToken.nonce) {
            throw new Error('invalid nonce')
        }

        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('id_token', idToken)

        setIsAuth(true)

        return decodedAccessToken
    }

    const logout = () => {
        const params = new URLSearchParams({
            id_token_hint: idToken,
            post_logout_redirect_uri: 'http://localhost:5173/login'
        })

        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('state')
        
        setIsAuth(false)
        setAccessToken(null)
        setIdToken(null)
        setState(null)
    
        return `http://localhost:8080/realms/master/protocol/openid-connect/logout?${params.toString()}`
    }

    return (
        <AuthContext.Provider value={{
            accessToken,
            idToken,
            state,
            isAuth,
            setIsAuth,
            login,
            logout,
            makeLogin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return { ...useContext(AuthContext) }
}