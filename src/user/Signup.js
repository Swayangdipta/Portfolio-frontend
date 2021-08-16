import React,{useState} from 'react'
import {Redirect,Link } from 'react-router-dom'
import {authenticate, isAuthenticated, signup} from '../auth/helper/index'


export default function Signup() {
    const [values,setValues] = useState({
        email: '',
        password: '',
        photo: '',
        name: '',
        userInfo: '',
        filename: '',
        error: false,
        success: false,
        loading: false,
        redirect: false,
        formData: new FormData()
    })

    const {email,password,error,filename,formData,photo,name,userInfo,loading,redirect} = values

    const handleChange =  name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({...values,error: false,success:false,loading: false,redirect: false})

        signup(formData)
        .then(data=> {
            if(data.error){
                setValues({...values,error: data.error})
            }else{
                setValues({...values,error: false,loading: true,success: true,redirect: true})
            }
        })
        .catch(e=>console.log(e))
    }

    const loader = () => {
        
    }

    const redirector = () => {
        return(
            <Redirect to="/signin" />
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

    const sendTo = path =>{      
        return(
            <Redirect to={path} />
        )
    }

    const setPreviewPhoto = e => {
        const url = URL.createObjectURL(e.target.files[0])
        setValues({...values,photo: url,filename: e.target.files[0].name})
    }

    return (
        <div className="loginPage">
            <form className="signUpForm">
                <h2 className="formTitle">Sign Up</h2>
                <label htmlFor="name" className="labels">Name</label>
                <input type="text" value={name} className="inputs" name="name" required placeholder="Your full name" onChange={handleChange('name')} />
                <label htmlFor="email" className="labels">Email</label>
                <input type="email" value={email} className="inputs" name="email" required placeholder="Ex. something@xyz.com" onChange={handleChange('email')} />
                <label htmlFor="userInfo" className="labels">About You</label>
                <textarea  value={userInfo} className="inputs textarea" name="userInfo" required onChange={handleChange('userInfo')} rows="5" />
                <label htmlFor="password" className="labels">Password</label>
                <input type="password" value={password} className="inputs" name="password" required onChange={handleChange('password')} />
                
                <label htmlFor="thumbnail" className="labels">Profile Picture</label>
                <div className="uploader" name="thumbnail">
                    <input type="file" className="inputs thumbnail"  required onChange={(e)=>{
                        handleChange('photo')(e)
                        setPreviewPhoto(e)
                    }} />
                    <div className="previewHolder">
                        {
                            photo != '' ? (<img className="preview" src={photo}/>) : (
                                    <img className="preview" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"/>
                                )
                        }
                    <h2 className="fileName">{
                        filename != '' ? (filename) : ("Click to choose. No file chosen.")
                    }</h2>
                    </div>
                </div>
                <button className="signinBtn" onClick={handleSubmit}>Sign Up</button>
                <Link className="Link" to="/signin"><button className="signUpBtn">Log In!</button></Link>
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
