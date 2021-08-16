import React,{useState} from 'react'
import {FaGlobe, FaInfoCircle } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { API } from '../Backend'
import DetailedView from './DetailedView'

export default function ProjectCard({project,index}) {

    const [isOpen,setIsOpen] = useState(false)
    const openView = ()=> {
        setTimeout(()=> {
            setIsOpen(!isOpen)
        },300)
    }

    return (
        <>
        {isOpen && <DetailedView item={project} isOpen={isOpen} setIsOpen={setIsOpen} /> }
        <div className="card" key={index}>
            <img src={`${API}/project/thumbnail/${project._id}`} className="cardImg" />
            <div className="projInfo">
                <FaInfoCircle onClick={openView} />
                <a style={{color: "hsla(192, 18%, 49%, 1)",padding: "0",marginTop: "7px"}} href={project.git_repo} ><FiGithub /></a>
                <a style={{color: "hsla(192, 18%, 49%, 1)",padding: "0",marginTop: "7px"}} href={project.live_url ? project.live_url : "#"} ><FaGlobe /></a>
            </div>
        </div>
        </>
    )
}
