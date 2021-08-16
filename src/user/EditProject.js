import React,{useEffect,useState} from 'react'
import { isAuthenticated } from '../auth/helper'
import { editProject } from '../core/helper/coreapicalls'
import { getAProject, getProjectPhoto } from './helper/userAndAdminApiCalls'

export default function EditProject({match}) {
    const [values,setValues] = useState({
        title: '',
        description: '',
        thumbnail: '',
        git_repo: '',
        live_url: '',
        fav_points: 0,
        tag: '',
        filename: '',
        error: false,
        success: false,
        loading: false,
        redirect: false,
        success: false,
        formData: new FormData()
    })

    const [dp,setDp] = useState(false)

    const {title,git_repo,fav_points,live_url,tag,error,success,filename,formData,thumbnail,description,loading,redirect} = values


    const {user,token} = isAuthenticated()


    const handleChange =  name => event => {
        const value = name === 'thumbnail' ? event.target.files[0] : event.target.value
        formData.set(name,value)
        setValues({...values,[name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setValues({...values,error: false,success:false,loading: false,redirect: false})

        editProject(user._id,match.params.projectId,formData,token).then(data=>{
            if(data.error){
                setValues({...values,error: data.error})
            }else{
                setValues({...values,success: "Updated successfully"})
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

    const addForm = () => {
        return(
            <div className="loginPage">
            <form className="signUpForm">
                <h2 className="formTitle">Add Project</h2>
                <label htmlFor="title" className="labels">Title</label>
                <input type="text" value={title} className="inputs" name="title" required placeholder="Project Title" onChange={handleChange('title')} />
                <label htmlFor="description" className="labels">Project Description</label>
                <textarea  value={description} className="inputs textarea" name="description" required onChange={handleChange('description')} rows="5" />
                <label htmlFor="gitRepo" className="labels">Github Repo</label>
                <input type="link" value={git_repo} className="inputs" name="gitRepo" required placeholder="Github Repo link" onChange={handleChange('git_repo')} />
                <label htmlFor="liveUrl" className="labels">Live link</label>
                <input type="link" value={live_url} className="inputs" name="liveUrl" required placeholder="Live Project Link" onChange={handleChange('live_url')} />
                <label htmlFor="fav" className="labels">Favorite Points</label>
                <input type="number" value={fav_points} className="inputs" name="fav" required placeholder="" onChange={handleChange('fav_points')} />
                <label htmlFor="tag" className="labels">Tag</label>
                <input type="text" value={tag} className="inputs" name="tag" required placeholder="Tags ex. MERN" onChange={handleChange('tag')} />
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
                <button className="signinBtn" onClick={handleSubmit}>Update</button>
            </form>
            </div>
        )
    }

    const preload = (projectId) => {

        getProjectPhoto(projectId).then(data=>{
            setDp(data.url)
        })

        getAProject(projectId).then(data=>{
            setValues({...values,
                title: data.title,
                description: data.description,
                thumbnail: dp,
                git_repo: data.git_repo,
                live_url: data.live_url,
                fav_points: data.fav_points,
                tag: data.tag,
                formData: new FormData()
            })
        }).catch(e=>console.log(e))
    }

    useEffect(()=>{
        preload(match.params.projectId)
    },[])

    return (
        <div>
        {error && errorMsg()}
        {success && successMsg()}
        {addForm()}
        </div>
    )
}
