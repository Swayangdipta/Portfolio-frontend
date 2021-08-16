import React,{useEffect,useState} from 'react'
import { isAuthenticated } from '../auth/helper'
import { getUserPhoto, updateUser } from './helper/userAndAdminApiCalls'


export default function EditProfile() {
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

        const [dp,setDp] = useState(false)

    
        const {email,success,error,filename,formData,photo,name,userInfo,loading,redirect} = values
    
        const {user,token} = isAuthenticated()

        const handleChange =  name => event => {
            const value = name === 'photo' ? event.target.files[0] : event.target.value
            formData.set(name,value)
            setValues({...values,[name]:value})
        }
    
        const handleSubmit = (e) => {
            e.preventDefault()
            setValues({...values,error: false,success:false,loading: false,redirect: false})
    
            updateUser(user._id,formData,token)
            .then(data=> {
                if(data.error){
                    setValues({...values,error: data.error})
                }else{
                    setValues({...values,error: false,loading: true,success: true,redirect: true})
                }
            })
            .catch(e=>console.log(e))
        }
    
    
        const clearError = (e) => {
            setValues({...values,error: false})
        }
    
        const errorMsg = () => {
            return(
                <div className="errorMsg" onClick={clearError}><p className="error">{error}</p></div>
            )
        } 

        const successMsg = () => {
            return(
                <div className="errorMsg" style={{backgroundColor: "green"}} onClick={clearError}><p className="error">{error}</p></div>
            )
        } 
    

    
        const setPreviewPhoto = e => {
            const url = URL.createObjectURL(e.target.files[0])
            setValues({...values,photo: url,filename: e.target.files[0].name})
        }

        const preload = () => {
            getUserPhoto(user._id).then(data=>{
                setDp(data)
            })

            setValues({...values,
                name: user.name,
                email: user.email,
                userInfo: user.userInfo,
                formData: new FormData()
            })
        }

        useEffect(() => {
            preload()
        }, [])
    
        return (
            <div className="loginPage">
                <form className="signUpForm">
                    <h2 className="formTitle">Edit Profile</h2>
                    <label htmlFor="name" className="labels">Name</label>
                    <input type="text" value={name} className="inputs" name="name" required placeholder="Your full name" onChange={handleChange('name')} />
                    <label htmlFor="email" className="labels">Email</label>
                    <input type="email" value={email} className="inputs" name="email" required placeholder="Ex. something@xyz.com" onChange={handleChange('email')} />
                    <label htmlFor="userInfo" className="labels">About You</label>
                    <textarea  value={userInfo} className="inputs textarea" name="userInfo" required onChange={handleChange('userInfo')} rows="5" />
                    
                    <label htmlFor="thumbnail" className="labels">Profile Picture</label>
                    <div className="uploader" name="thumbnail">
                        <input type="file" className="inputs thumbnail"  required onChange={(e)=>{
                            handleChange('photo')(e)
                            setPreviewPhoto(e)
                        }} />
                        <div className="previewHolder">
                            {
                                photo != '' ? (<img className="preview" src={photo}/>) : dp ? (
                                    <img className="preview" src={dp.url}/>
                                ) : ''
                            }
                        <h2 className="fileName">{
                            filename != '' ? (filename) : ("Click to choose. No file chosen.")
                        }</h2>
                        </div>
                    </div>
                    <button className="signinBtn" onClick={handleSubmit}>Update</button>
                </form>
                {
                    error && errorMsg()
                }
                {
                    success && successMsg()
                }
            </div>
    )
}
