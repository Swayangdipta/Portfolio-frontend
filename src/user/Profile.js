import React,{useEffect,useState} from 'react'
import { nativeTouchData } from 'react-dom/cjs/react-dom-test-utils.production.min'
import { Redirect,Link } from 'react-router-dom'
import { isAuthenticated, signout } from '../auth/helper'
import { getAllProjects, getUserPhoto,getAllCourses, getACategory } from './helper/userAndAdminApiCalls'
import {RiMailFill,BsInfoSquareFill,FaInfoCircle, FiGithub, FaGlobe,FaEdit,FaMinusCircle} from 'react-icons/all'
import { API } from '../Backend'
import AddProject from './AddProject'
import EditProfile from './EditProfile'
import EditProject from './EditProject'
import { removeProject ,removeCourse} from '../core/helper/coreapicalls'
import AddCourse from './AddCourse'

export default function Profile() {
    const [dp,setDp] = useState(false)
    const [signoutt,setSignout] = useState(false)
    const [projects,setProjects] = useState([])
    const [isOpen,setIsOpen] = useState(false)
    const [courses,setCourses] = useState([])
    const [currentSection,setCurrentSection] = useState("default")
    const [returnedRes,setReturnedRes] = useState({
        success: false,
        error: false
    })

    const [cateName,setCateName] = useState('')

    const {success,error} = returnedRes

    const {user,token} = isAuthenticated()

    const setOp = (name)=> {
        setCurrentSection(name)
        setIsOpen(!isOpen)
    }

    const clearError = (e) => {
        setReturnedRes({...returnedRes,error: false,success: false})
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

    const deleteProject = (e,projectId) => {
        removeProject(user._id,projectId,token).then(data=>{
            if(data.error){
                setReturnedRes({...returnedRes,error: data.error})
            }else{
                setReturnedRes({...returnedRes,success: "Course deleted"})
                getAllProjects().then(data=>{
                    setProjects(data)
                }).catch(e=>console.log(e))
            }
        })
    }

    const deleteCourse = (e,courseId) => {
        removeCourse(user._id,courseId,token).then(data=>{
            if(data.error){
                setReturnedRes({...returnedRes,error: data.error})
            }else{
                setReturnedRes({...returnedRes,success: "Project deleted"})
                getAllCourses().then(data=>{
                    setCourses(data)
                }).catch(e=>console.log(e))
            }
        })
    }


    const projCard = (project,index) => {
        return(
            <div className="card" key={index}>
                <img src={`${API}/project/thumbnail/${project._id}`} className="cardImg" />
                <div className="projInfo">
                    <FaInfoCircle />
                    <Link style={{color: "#FFF"}} to={project.git_repo} ><FiGithub /></Link>
                    <Link style={{color: "#FFF"}} to={project.live_url ? project.live_url : "#"} ><FaGlobe /></Link>
                    <Link to={`/editproject/${project._id}`}><FaEdit/></Link>
                    <FaMinusCircle style={{color: "red"}} onClick={(e)=>deleteProject(e,project._id)} />
                </div>
            </div>
        )
    }
    const courseCard = (course,index) => {
        return(
            <div className="card" key={index}>
                <img src={`${API}/course/photo/${course._id}`} className="cardImg" />
                <div className="projInfo">
                    <FaInfoCircle />
                    <Link to={`/editCourse/${course._id}`}><FaEdit/></Link>
                    <FaMinusCircle style={{color: "red"}} onClick={(e)=>deleteCourse(e,course._id)} />
                    <h6 >{course.category.name}</h6>
                </div>
            </div>
        )
    }
    
    
    const leftSide = () => {
        return(
            isOpen ? (
                <div className="menu">
                <h2 className="formTitle profTitle" onClick={e=> setIsOpen(!isOpen)}>Profile | X</h2>
                <ul className="list">
                    <li className="listItem" onClick={e=>setOp("default")}>Home</li>
                    <li className="listItem" onClick={e=>setOp("EditProfile")}>Edit profile</li>
                    <li className="listItem" onClick={e=>setOp("AddProject")}>Add Project</li>
                    <li className="listItem" onClick={e=>setOp("AddCourse")}>Add Course</li>
                    <li className="listItem" onClick={e=>signOut()}>Log Out</li>
                </ul>
            </div>
            ) : (
                <h2 className="formTitle profTitle closeMenu" onClick={e=> setIsOpen(!isOpen)}>Profile | Menu</h2>
            )
        )
    }



    const signOut = () => {
        setSignout(true)
        signout()
    }
    
    
    const rightSide = () => {
       return(
        currentSection == "default" ? (
            defaultView()
        ) : currentSection == "AddProject" ? (<AddProject />) :
         currentSection == "EditProfile" ? (<EditProfile />) : currentSection == "AddCourse" ? (
             <AddCourse />
         ) : ''
       )
    }

    const defaultView = () => {
        return(
            <div className="wholeProfile" >
            <div className="container">
                <div className="userDetails">
                    {
                        user ? (
                            <>
                            <h1 className="username">{user.name}</h1>
                            <h2 className="email"><RiMailFill className="icons" />{user.email}</h2>
                            <p className="userInfo"><BsInfoSquareFill className="icons" />{user.userInfo}</p>
                            </>
                        ) : ''
                    }
                </div>
                <img src={dp ? dp.url : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} className="dp" />
            </div>
            <div className="projectsView" >
                <div className="titleContainer">
                    <hr className="upperHr" />
                    <h2 className="sectionTitle">
                        Projects
                    </h2>
                </div>

                <div className="allProjects">
                    {
                        projects.length > 0 ? projects.map((project,index)=>(
                            projCard(project,index)
                        )) : ''
                    }
                </div>

            </div>
            <div className="projectsView" >
                <div className="titleContainer">
                    <hr className="upperHr" />
                    <h2 className="sectionTitle">
                        Courses
                    </h2>
                </div>

                <div className="allProjects">
                    {
                        courses.length > 0 ? courses.map((course,index)=>(
                            courseCard(course,index)
                        )) : ''
                    }
                </div>

            </div>
            </div>
        )
    }
    
    
    
    const preload = (userId) => {
        getUserPhoto(userId).then(data=>{
            setDp(data)
        })
        getAllProjects().then(data=>{
            setProjects(data)
        }).catch(e=>console.log(e))

        getAllCourses().then(data=>{
            setCourses(data)
        }).catch(e=>console.log(e))
    }

    useEffect(() => {
        preload(user._id)
    }, [])

    return (
        <div className="profilePage">
            {signoutt && (
                <Redirect to="/signin" />
            )}
            {leftSide()}
            {rightSide()}
            {success && successMsg()}
            {error && errorMsg()}
        </div>
    )
}
