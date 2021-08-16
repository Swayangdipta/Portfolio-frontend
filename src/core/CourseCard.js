import React,{useState} from 'react'
import {FaGlobe, FaInfoCircle } from 'react-icons/fa'
import { FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { API } from '../Backend'
import DetailedView from './DetailedView'

export default function CourseCard({course,index}) {

    const [isOpen,setIsOpen] = useState(false)
    const openView = ()=> {
        setTimeout(()=> {
            setIsOpen(!isOpen)
        },300)
    }

    return (
        <>
        {isOpen && <DetailedView item={course} isOpen={isOpen} setIsOpen={setIsOpen} /> }
        <div className="card" key={index}>
            <img src={`${API}/course/photo/${course._id}`} className="cardImg" />
            <div className="projInfo">
                <FaInfoCircle onClick={openView} />
                <h6>{course.category.name}</h6>
            </div>
        </div>
        </>
    )
}
