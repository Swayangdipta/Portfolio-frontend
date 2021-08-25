import React, { useEffect, useState } from 'react'
import { API } from '../Backend'
import { getAllCourses, getUserPhoto } from '../user/helper/userAndAdminApiCalls'
import CourseCard from './CourseCard'
import {FaBirthdayCake,TiWeatherSunny,FaClock, TiWeatherCloudy} from 'react-icons/all'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import resume from '../assets/Swayangdipta-Resume (2).pdf'
import HeroSection from './HeroSection'
import ContactSection from './ContactSection'
import ProjectSection from './ProjectSection'
import { isAuthenticated } from '../auth/helper'
import { getInfo } from './helper/coreapicalls'

export default function AboutSection() {

    const [courses,setCourses] = useState([])
    const [dp,setDp] = useState(false)
    const [currentTime,setCurrentTime] = useState({
        hr: "00",
        min: "00",
        sec: "00",
        day: 'Monday'
    })

    const [weather,setWeather] = useState(undefined)
    const [currentPage,setCurrentPage] = useState('about')
    const [userInfo,setUserInfo] = useState(undefined)


    const changeEverySecond = () => {
        var weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
        var date = new Date();
        var days = date.getDay()
        var dayName = weekdays[days]
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds()
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        setCurrentTime({
            ...currentTime,
            hr: hours,
            min: minutes,
            sec: seconds,
            day: dayName
        })
    }

    const getWeather = () => {
        const API_KEY = "5413cba48a7343a9bda111746212508";
        const params ={
            key : API_KEY,
            q : "auto:ip"
        }
        Axios.get("https://api.weatherapi.com/v1/current.json?",{params}).then(
            response=>{
                console.log(response.data);
                setWeather(response.data)
            }
        ).catch(e=>{
            console.error(e)
        })
    }

    const handleClick = page => {
        setCurrentPage(page)
    }


    useEffect(()=>{
        getAllCourses().then(data=>{
            if(data.error){
                console.log("Faild to load courses.");
            }else{
                setCourses(data)
            }
        })
        getUserPhoto("6113cc8ab13ac20c98207fcf").then(data=>{
            setDp(data)
        })
        getInfo('6113cc8ab13ac20c98207fcf').then(data=>{

            setUserInfo(data)
        })

        getWeather()
    },[])

    useEffect(()=>{
        changeEverySecond()
    },[currentTime.min])

    return (
        currentPage == "about" ? (
            <div className="aboutSection">
            <div className="aboutContainer">
                <div className="myInfo">
                    <div className="profilePictureContainer"><img src={dp ? dp.url : ''} className="myProfilePicture" /></div>
                    <div className="myDescInfo">
                        <h1 className="folioSectionTitle mySuperName">Swayangdipta Das</h1>
                        <div className="subname">
                            <p className="viewName folioSectionTitle viewDescPara" style={{textAlign: "center", color: "mediumorchid",margin: "auto"}}><FaBirthdayCake/> 11.03.2000</p>
                            <p className="viewName folioSectionTitle viewDescPara" style={{textAlign: "center",color: "lightgoldenrodyellow",margin: "auto"}}><TiWeatherCloudy /> {weather?weather.current.temp_c: '0'}&deg;C</p>
                            <p className="viewName folioSectionTitle viewDescPara" style={{textAlign: "center",color: "lightseagreen",textTransform: "capitalize",margin: "auto"}}><FaClock /> {currentTime.hr}:{currentTime.min}|{currentTime.day}</p>
                        </div>
                        <hr className="interSection" />
                        <h1 className="viewDescPara folioSectionTitle viewName viewTagName specialTitle" style={{marginTop: "70px",marginBottom: '50px',width: "initial"}}>Its Me</h1>
                        <div className="viewDescPara fullDesc">
                            <p>{userInfo != undefined ? (userInfo.info) : ('....')}</p>
                        </div>
                        <div className="certifications">
                        <h1 className="viewDescPara folioSectionTitle viewName viewTagName specialTitle">Certificates</h1>
                            <div className="certificateContainer">
                                {
                                    courses.length > 0 ? (
                                        courses.map((course,index)=>(
                                            <CourseCard course={course} key= {index} index={index} />
                                        ))
                                    ) : ''
                                }
                            </div>
                        </div>
                        <h1 className="viewDescPara folioSectionTitle viewName viewTagName specialTitle" style={{marginBottom: '50px',width: "initial"}}>Skills</h1>
                        <div className="skills">
                            <h1 className="folioSectionTitle viewName viewTagName skill">React</h1>
                            <h1 className="folioSectionTitle viewName viewTagName skill">NodeJs</h1>
                            <h1 className="folioSectionTitle viewName viewTagName skill">MongoDB</h1>
                            <h1 className="folioSectionTitle viewName viewTagName skill">Python</h1>
                            <h1 className="folioSectionTitle viewName viewTagName skill">Java</h1>
                            <h1 className="folioSectionTitle viewName viewTagName skill">Illustrator</h1>
                            <h1 className="folioSectionTitle viewName viewTagName skill">MERN</h1>
                        </div>
                        <div className="skills resume">
                            <Link to={resume} target='_blank' download><button className="folioSectionTitle viewName viewTagName getResume">Resume</button></Link>
                        </div>
                    </div>
                </div>
                <div className="gotoPages aboutGoToPages">
                    <button className="placeholderBtn" onClick={(e)=>handleClick("home")}><h4>Home</h4></button>
                    <h4>|</h4>
                    <button className="placeholderBtn" onClick={(e)=>handleClick("contact")}><h4>Contact</h4></button>
                    <h4>|</h4>
                    <button className="placeholderBtn" onClick={(e)=>handleClick("projects")}><h4>Projects</h4></button>
                </div>
            </div>
        </div>
        ) : currentPage == "home" ? (<HeroSection />) : currentPage == "contact" ? (<ContactSection/>) : currentPage == "projects" ? (<ProjectSection/>) : ''
    )
}
