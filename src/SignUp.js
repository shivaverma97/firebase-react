import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()
    const  {signUp} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleOnSignUp(e){
        e.preventDefault()

        if(passRef.current.value !== repeatPassRef.current.value){
            return setError('Password do not match')
        }
        try{
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passRef.current.value)
            navigate("/login")
            setLoading(false)
        }catch(ex){
            setLoading(false)
            setError(`Failed to sign up. Please try again!! Due to the following error: ${ex}`)
        }
    }

    return (
        <div>
            <form className="modal-content" onSubmit={handleOnSignUp}>
                <div className="container">
                    <h1>Sign Up</h1>
                    <p>Please fill in this form to create an account.</p>
                    {error && <div className='error-message'>{error}</div>}
                    <hr />
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Email" name="email" ref={emailRef} required />

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={passRef} required />

                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" ref={repeatPassRef} required />

                    <label>
                        <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px"}}/>Remember me
                    </label>

                    <div className="clearfix">
                        <button type="button" className="cancelbtn">Cancel</button>
                        <button type="submit" className="signupbtn" disabled={loading}>Sign Up</button>
                    </div>
                    
                    <p>Already have an account? <Link to="/login">Log In</Link></p>
                </div>
            </form>
        </div>
    )
}
