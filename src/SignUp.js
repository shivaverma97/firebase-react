import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'

export default function SignUp() {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()
    const  {currentUser, signUp} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    async function handleOnSignUp(e){
        e.preventDefault()

        if(passRef.current.value !== repeatPassRef.current.value){
            return setError('Password do not match')
        }
        try{
            setError('')
            setLoading(true)
            await  signUp(emailRef.current.value, passRef.current.value)
            setLoading(false)
        }catch(ex){
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
                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" ref={emailRef} required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={passRef} required />

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" ref={repeatPassRef} required />

                    <label>
                        <input type="checkbox" checked="checked" name="remember" style={{marginBottom:"15px"}}/>Remember me
                    </label>

                    <p>By creating an account you agree to our <a href="#" style={{color:"dodgerblue"}}>Terms & Privacy</a>.</p>

                    <div className="clearfix">
                        <button type="button" className="cancelbtn">Cancel</button>
                        <button type="submit" className="signupbtn">Sign Up</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
