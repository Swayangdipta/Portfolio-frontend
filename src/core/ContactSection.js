import React, { useState } from 'react'
import {FiGithub,FaInstagramSquare,FaFacebookSquare,FaLinkedin,CgMail,FaChess} from 'react-icons/all'
import AboutSection from './AboutSection'
import { sendMail } from './helper/coreapicalls'
import HeroSection from './HeroSection'
import ProjectSection from './ProjectSection'
import loader from '../assets/img/Rolling-1s-200px (1).svg'
import { toast } from 'react-toastify'


export default function ContactSection() {
    const [currentPage,setCurrentPage] = useState('contact')
    const [mail,setMail] = useState({
        username: '',
        email: '',
        message: ''
    })

    const [response,setResponse] = useState({
        success: false,
        error: false
    })

    const [isSending,setIsSending] = useState(false)

    const {username,email,message} = mail
    const {success,error} = response

    const handleClick = page => {
        setCurrentPage(page)
    }

    const handleChange = e => name =>{
        setMail({...mail,[name]:e.target.value})
    }

    const handleMail = e => {
        e.preventDefault()
        setIsSending(true)
        sendMail(mail).then(data=>{
            if(data.error || !data){
                setResponse({...response,error: data,success:false})
                console.log(data);
                setIsSending(false)
            }
            else if(!data.messageId){
                setResponse({...response,error: data,success:false})
                console.log(data);
                setIsSending(false)
            }
            else{
                setResponse({...response,success: true,error:false})
                setMail({...mail,
                    username: '',
                    email: '',
                    message: ''
                })
                setIsSending(false)
            }
        })
    }

    const clearError = (e) => {
        e.preventDefault()
        setResponse({...response,error: false,success:false})
    }

    const successMsg = () => {
        toast.success("Message sent successfully!")
        setResponse({...response,success: false})
    }
    const errorMsg = () => {
        toast.error("Oops! something went wrong.")
        setResponse({...response,error: false})
    }

    return (
        currentPage == 'contact' ? (
            <div className="contactSection">
            <h1 className="folioSectionTitle">Contact</h1>
            <div className="contactContainer">
                <div className="socialLinks">
                    <a href='https://github.com/Swayangdipta' className="externalSocialLinks"><FiGithub className="contactLinks" /></a>
                    <a href='https://www.linkedin.com/in/swayangdipta-das-9a7815159/' className="externalSocialLinks"><FaLinkedin className="contactLinks" /></a>
                    <a href='https://www.instagram.com/swayangdiptacs/' className="externalSocialLinks"><FaInstagramSquare  className="contactLinks"/></a>
                    <a href='https://www.facebook.com/swayangdipta.das.1/' className="externalSocialLinks"><FaFacebookSquare className="contactLinks"/></a>
                    <a href='https://www.chess.com/member/swayangdipta_das' className="externalSocialLinks"><FaChess className="contactLinks" /></a>
                    <a href='swayangdiptacc@gmail.com' className="externalSocialLinks"><CgMail className="contactLinks"/></a>
                </div>
                <div className="sendMsg">
                    <form className="msgForm">
                        <label htmlFor="name" className="labels msgLabel">Name</label>
                        <input value={username} className="inputs msgInput" type="text" name="name" placeholder="Your full name..." onChange={(e)=>handleChange(e)('username')} />
                        <label htmlFor="email" className="labels msgLabel">Email</label>
                        <input value={email} className="inputs msgInput" type="email" name="email" placeholder="Your email id..." onChange={(e)=>handleChange(e)('email')} required />
                        <label htmlFor="msg" className="labels msgLabel">Message</label>
                        <textarea value={message} name="msg" className="inputs textarea msgInput" placeholder="Your message..." onChange={(e)=>handleChange(e)('message')} required />
                        <button type="button" className="signinBtn msgSubmitBtn" dis onClick={handleMail}>{isSending ? (<img className="loaderImg" src={loader} />) : ('Send')}</button>
                    </form>
                </div>
            </div>
            <div className="gotoPages">
                <button className="placeholderBtn" onClick={(e)=>handleClick("home")}><h4>Home</h4></button>
                <h4>|</h4>
                <button className="placeholderBtn" onClick={(e)=>handleClick("about")}><h4>About</h4></button>
                <h4>|</h4>
                <button className="placeholderBtn" onClick={(e)=>handleClick("projects")}><h4>Projects</h4></button>
            </div>
            {
                success && successMsg()
            }
            {
                error && errorMsg()
            }
        </div>
        ) : currentPage == 'home' ? (<HeroSection />) : currentPage == 'projects' ? (<ProjectSection />) : currentPage == 'about' ? (<AboutSection />) : ''
    )
}
