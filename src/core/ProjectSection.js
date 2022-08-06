import React,{useEffect,useState} from 'react'
import {getAllProjects} from '../user/helper/userAndAdminApiCalls'
import ProjectCard from './ProjectCard'
import HeroSection from './HeroSection'
import ContactSection from './ContactSection'
import AboutSection from './AboutSection'

export default function ProjectSection() {

    const [projects,setProjects] = useState([])
    const [currentPage,setCurrentPage] = useState('projects')
    const handleClick = (page) => {
        setInterval(()=>{
          setCurrentPage(page)
        },500)
      }

    const preload = () => {
        getAllProjects().then(data=>{
            if(data.error){
                console.log("Faild to load projects.");
            }else{
                setProjects(data.sort((a,b)=>(a.fav_points > b.fav_points) ? -1 : 1))
            }
        })
    }


    useEffect(() => {
        preload()
    }, [])

    return (
        currentPage == "projects" ? (
            <>
            <div className="projectSection" id="projectSection">
                <h1 className="folioSectionTitle">Projects</h1>
                <div className="projectContainer">
                <div className="gotoPages gotoPages__projects">
                <button className="placeholderBtn" onClick={(e)=>handleClick("home")}><h4>Home</h4></button>
                <h4>|</h4>
                <button className="placeholderBtn" onClick={(e)=>handleClick("about")}><h4>About</h4></button>
                <h4>|</h4>
                <button className="placeholderBtn" onClick={(e)=>handleClick("contact")}><h4>Contact</h4></button>
                </div>
                <div className="projects">
                <div className="projects__inner">
                    {
                        projects.length > 0 ? (
                            projects.map((project,index)=>(
                                <>
                                <ProjectCard project={project} index={index} />
                                </>
                            ))
                        ) : (<div className="projects__loading">Loading...</div>)
                    }
                </div>
            </div>
            </div>
            </div>
        </>
        ) : currentPage == 'home' ? (<HeroSection />) : currentPage == 'contact' ? (<ContactSection />) : currentPage == 'about' ? (<AboutSection />) : ''
    )
}
