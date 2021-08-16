import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper'
import { addCourse, addProject } from '../core/helper/coreapicalls'
import {getCategories} from './helper/userAndAdminApiCalls'

export default function AddCourse() {
    const [values,setValues] = useState({
        name: '',
        description: '',
        thumbnail: '',
        category: '',
        filename: '',
        error: false,
        success: false,
        loading: false,
        redirect: false,
        success: false,
        formData: new FormData()
    })

    const {name,category,error,success,filename,formData,thumbnail,description,loading,redirect} = values
    const [categories,setCategories] = useState(undefined)

    const {user,token} = isAuthenticated()

    const handleChange =  name => event => {
        const value = name === 'thumbnail' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({...values,error: false,success:false,loading: false,redirect: false})

        addCourse(user._id,token,formData).then(data=>{
            if(data.error){
                setValues({...values,error: data.error,success:false,loading: false,redirect: false})
            }else{
                setValues({...values,error: false,success:"Course Added.",loading: false,redirect: false})
            }
        })


    }


    const setPreviewthumbnail = e => {
        const url = URL.createObjectURL(e.target.files[0])
        setValues({...values,thumbnail: url,filename: e.target.files[0].name})
    }

    const clearError = (e) => {
        setValues({...values,error: false,success: false})
    }

    const errorMsg = () => {
        return(
            <div className="errorMsg" onClick={clearError}><p className="error">{error}</p></div>
        )
    } 

    const successMsg = () => {
        return(
            <div className="errorMsg" style={{backgroundColor: "lightgreen"}} onClick={clearError}><p className="error">{success}</p></div>
        )
    }

    const preload = () => {
        getCategories().then(data=>{
            if(data.error){
                setValues({...values,error: data.error})
            }else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        preload()
    },[])

    const addForm = () => {
        return(
            <div className="loginPage">
            <form className="signUpForm">
                <h2 className="formTitle">Add Course</h2>
                <label htmlFor="name" className="labels">Name</label>
                <input type="text" value={name} className="inputs" name="name" required placeholder="Course Title" onChange={handleChange('name')} />
                <label htmlFor="description" className="labels">Course Description</label>
                <textarea  value={description} className="inputs textarea" name="description" required onChange={handleChange('description')} rows="5" />
                <label htmlFor="category" className="labels">Category</label>
                <select
                onChange={handleChange("category")}
                className="form-control"
                placeholder="Category"
                name="category"
                >
                <option value="Category" className="inputs">Category</option>
                {
                        categories !== undefined ? (
                            categories.map((cate,index)=>(
                                <option key={index} value={cate._id} className="inputs">{cate.name}</option>
                            ))
                        ) : ''
                    }
                </select>
                <label htmlFor="thumbnail" className="labels">Project Thumbnail</label>
                <div className="uploader" name="thumbnail">
                    <input type="file" className="inputs thumbnail"  required onChange={(e)=>{
                        handleChange('thumbnail')(e)
                        setPreviewthumbnail(e)
                    }} />
                    <div className="previewHolder">
                        {
                            thumbnail != '' ? (<img className="preview" src={thumbnail}/>) : (
                                    <img className="preview" src="https://cdn.pixabay.com/thumbnail/2016/08/08/09/17/avatar-1577909_960_720.png"/>
                                )
                        }
                    <h2 className="fileName">{
                        filename != '' ? (filename) : ("Click to choose. No file chosen.")
                    }</h2>
                    </div>
                </div>
                <button className="signinBtn" onClick={handleSubmit}>ADD</button>
            </form>
            </div>
        )
    }

    return (
        <div>
        {error && errorMsg()}
        {success && successMsg()}
        {addForm()}
        </div>
    )
}
