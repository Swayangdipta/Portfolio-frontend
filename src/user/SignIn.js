import React,{useState} from 'react'
import {Redirect,Link } from 'react-router-dom'
import {authenticate, isAuthenticated, signin} from '../auth/helper/index'


export default function SignIn() {
    const [values,setValues] = useState({
        email: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        redirect: false
    })

    const {email,password,error,success,loading,redirect} = values

    const handleChange =  name => e => {
        setValues({...values,[name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({...values,error: false,success:false,loading: false,redirect: false})
        signin({email,password})
        .then(data=> {
            if(data.error){
                setValues({...values,error: data.error})
            }else{
                authenticate(data,()=>{
                    setValues({...values,error: false,loading: true,success: true,redirect: true})
                })
            }
        })
        .catch(e=>console.log(null))
    }

    const loader = () => {
        return(
            <div className="pageLoader">
                Loading...
            </div>
        )
    }

    const redirector = () => {
        return(
            <Redirect to="/profile" />
        )
    }

    const clearError = (e) => {
        setValues({...values,error: false})
    }

    const errorMsg = () => {
        return(
            <div className="errorMsg" onClick={clearError}><p className="error">{error}</p></div>
        )
    } 

    return (
        <div className="loginPage">
            <form className="loginForm">
                <h2 className="formTitle">Login</h2>
                <label htmlFor="email" className="labels">Email</label>
                <input type="email" value={email} className="inputs" name="email" required placeholder="Ex. something@xyz.com" onChange={handleChange('email')} />
                <label htmlFor="password" className="labels">Password</label>
                <input type="password" value={password} className="inputs" name="password" required onChange={handleChange('password')} />
                <button className="signinBtn" onClick={handleSubmit}>Login</button>
                <Link className="Link" to="/signup"><button className="signUpBtn">Sign Up!</button></Link>
            </form>
            {
                loading && loader()
            }
            {
                redirect && redirector()
            }
            {
                isAuthenticated() && redirector()
            }
            {
                error && errorMsg()
            }
        </div>
    )
}
