import React, { useContext, useEffect, useState } from 'react'
import {onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from '../Firebase'

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState()

    function signUp(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {setCurrentUser(user)})

        return unsubscribe    // this method above returns a method which when we call, it unsubscribe the evene onAuthStateChanged event
    }, [])

    const value = {
        currentUser,
        signUp
    }

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}
