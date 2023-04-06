import React, { useContext, useEffect, useState } from 'react'
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { auth } from '../Firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut(){
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user) 
            setLoading(false)
        })

        return unsubscribe    // this method above returns a method which when we call, it unsubscribe the evene onAuthStateChanged event
    }, [])

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
