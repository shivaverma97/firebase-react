import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    
    const {logOut} = useAuth()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleOnClick(e){
        e.preventDefault()
        
        try{
            setError('')
            setLoading(true)
            await logOut()
            navigate('/login')
        }
        catch(ex){
            setError(`Failed to logout due to the following error: ${ex}`)
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div>
        Logged in successfully
        {error && <div>{error}</div>}
        <br></br>
        <button className='logout-btn' disabled={loading} onClick={handleOnClick}>Log Out</button>
    </div>
  )
}
