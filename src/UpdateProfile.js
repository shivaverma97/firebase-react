import React, { useRef, useState } from 'react'
import { useAuth } from './contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passRef = useRef()
    const repeatPassRef = useRef()
    const  {currentUser, updateUserEmail, updateUserPassword} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleOnSignUp(e){
        e.preventDefault()

        if(passRef.current.value !== repeatPassRef.current.value){
            return setError('Password do not match')
        }

        const promises = []
        setError('')
        setLoading(true)

        if(emailRef.current.value !== currentUser.email){
            promises.push(updateUserEmail(currentUser, emailRef.current.value))
        }
        if(passRef.current.value !== currentUser.password){
            promises.push(updateUserPassword(currentUser, passRef.current.value))
        }
        Promise.all(promises).then(()=>{
            navigate("/")
        })
        .catch((ex)=>{
            setError(`Failed to update account details ${ex}`)
        })
        .finally(()=>{
            setLoading(false)
        })
    }

    return (
        <div>
            <form className="modal-content" onSubmit={handleOnSignUp}>
                <div className="container">
                    <h1>Update Profile</h1>
                    <p>Please fill in this form to update an account.</p>
                    {error && <div className='error-message'>{error}</div>}
                    <hr />
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" defaultValue={currentUser.email} ref={emailRef}/>

                    <label htmlFor="psw"><b>Password</b></label>
                    <input type="password" placeholder="Leave blank to keep the same" name="psw" ref={passRef} />

                    <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Leave blank to keep the same" name="psw-repeat" ref={repeatPassRef} />

                    <div className="clearfix">
                        <button type="button" className="cancelbtn"><Link to= "/">Cancel</Link></button>
                        <button type="submit" className="signupbtn" disabled={loading}>Update</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
