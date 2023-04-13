import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link} from 'react-router-dom'

export default function ResetPassword() {
    const emailRef = useRef()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const {resetPassword} = useAuth()
    const [message, setMessage] = useState('')

    async function handleReset(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            setMessage('')
            await resetPassword(emailRef.current.value)
            setMessage("Email sent successfully. Please check your inbox.")
            setLoading(false)
        } catch (ex) {
            setLoading(false)
            setError(`Failed to log In. Please try again!! Due to the following error: ${ex}`)
        }
    }

    return (
        <div>
            <form className="modal-content" onSubmit={handleReset}>
                <div className="container">
                    <h1>Reset Password</h1>
                    {error && <div className='error-message'>{error}</div>}
                    {message && <div className='message'>{message}</div>}
                    <hr />
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" ref={emailRef} required />

                    <div className="clearfix">
                        <button type="button" className="cancelbtn">Cancel</button>
                        <button type="submit" className="signupbtn" disabled={loading}>Send Email</button>
                    </div>
                    <p><Link to="/login">Log In</Link></p>
                    <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p>
                </div>
            </form>
        </div>
    )
}
