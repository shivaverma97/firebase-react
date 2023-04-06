import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function LogIn() {
    const emailRef = useRef()
    const passRef = useRef()
    const { logIn } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleOnLogIn(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await logIn(emailRef.current.value, passRef.current.value)
            navigate("/")
            setLoading(false)
        } catch (ex) {
            setLoading(false)
            setError(`Failed to log In. Please try again!! Due to the following error: ${ex}`)
        }
    }

    return (
        <div>
            <form className="modal-content" onSubmit={handleOnLogIn}>
                <div className="container">
                    <h1>Log In</h1>
                    {error && <div className='error-message'>{error}</div>}
                    <hr />
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" ref={emailRef} required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={passRef} required />

                    <label>
                        <input type="checkbox" checked="checked" name="remember" style={{ marginBottom: "15px" }} />Remember me
                    </label>

                    <div className="clearfix">
                        <button type="button" className="cancelbtn">Cancel</button>
                        <button type="submit" className="signupbtn" disabled={loading}>Log In</button>
                    </div>

                    <p>Don't have an account? <Link to="/signup">Sign Up here</Link></p>
                </div>
            </form>
        </div>
    )
}
