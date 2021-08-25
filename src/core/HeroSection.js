import React,{ Suspense,useEffect,useState} from 'react'
import { OrbitControls } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import Aphelion from '../assets/sounds/Aphelion160Short.mp3'
import AudioPlayer from './AudioPlayer';
import Planets from './Planets';
import useMousePosition from './useMousePosition';
import { Link } from 'react-router-dom';
import ProjectSection from './ProjectSection';
import ContactSection from './ContactSection';
import AboutSection from './AboutSection';
import Ripple from '../assets/img/Ripple-1s-200px.svg'


export default function HeroSection() {
    const {x,y} = useMousePosition()
    const [width,setWidth] = useState(window.innerWidth)
    const [currentPage,setCurrentPage] = useState('home')
    const [i,setI] = useState(0)


    const handleClick = (page) => {
      setInterval(()=>{
        setCurrentPage(page)
      },500)
    }


  useEffect(()=>{
    setWidth(window.innerWidth)
    if(currentPage == "home"){
      if(width>=801){
        document.querySelector('.Canvas').style.height="80vh"
      }else{
       document.querySelector('.Canvas').style.height="100vh"
      }
      document.querySelector('.Canvas').style.transition="ease-in-out 0.5s"
      document.querySelector('.pageTitle').style.opacity="1"
      document.querySelector('.pageTitle').style.transition="ease-in-out 1s"
    }

  })

  useEffect(()=>{
    window.addEventListener('load',(e)=>{
      setTimeout(()=>{
        document.querySelector('.loadingScreen').style.height = "0px"
        document.querySelector('.loadingScreen').style.opacity = "0"
        document.querySelector('.loadingScreen').style.transition = "ease-in-out 1s"
        setTimeout(()=>{
          document.querySelector('.loadingScreen').style.display = "none"
        },1010)

      },3000)
    })
  },[i])

  useEffect(()=>{
    setWidth(window.innerWidth)
    if(currentPage == "home"){
      if(width>=801){
        document.querySelector('.Canvas').style.height="80vh"
      }else{
       document.querySelector('.Canvas').style.height="100vh"
      }
    }
    console.log(window.innerWidth);
  },[width])

  const playEffect = ()=>{
    document.querySelector("audio").play()
  }

    return (
        <>
        <div className="loadingScreen"><img src={Ripple} />Give me a sec...</div>
        <div className="canvasContainer">
          {
            currentPage == 'home' ? (
              <>
              <div className="Canvas">
              <Canvas >
              <Suspense fallback={null} >
                  <Planets 
                  textures="Rock027/Rock027_1K_Color.jpg" 
                  size={{
                  max: 1.0,
                  min: 0.7,
                  initial: 2
                  }} 
                  rotationSelf="0.2"
                  lightColor="green"
                  position={[0,0,0]}
                  isPosition={false}
                  text='Home'
                  />
      
                <Planets 
                  textures="Rock027/Rock027_1K_Color.jpg" 
                  size={{
                  max: 0.2,
                  min: 0.1,
                  initial: 2
                  }} 
                  rotationSelf="0.3"
                  lightColor="green"
                  position={[10,5,-10]}
                  isPosition={true}
                  text='F'
                  />
                  
                  {/* <Particlesk /> */}
                  {/* <OrbitControls /> */}
              </Suspense>
              </Canvas>
              </div>
              <div className="pageTitle">
                  <h1>Swayangdipta Das</h1>
                  <h3>Developer | Designer | Student</h3>  
              </div>
              <div className="gotoPages">
                  <button className="placeholderBtn" onClick={(e)=>handleClick("projects")}><h4>Projects</h4></button>
                  <h4>|</h4>
                  <button className="placeholderBtn" onClick={(e)=>handleClick("about")}><h4>About</h4></button>
                  <h4>|</h4>
                  <button className="placeholderBtn" onClick={(e)=>handleClick("contact")}><h4>Contact</h4></button>
              </div>
              </>
            ) : currentPage == 'projects' ? (<ProjectSection />) : currentPage == 'contact' ? (<ContactSection />) : currentPage == 'about' ? (<AboutSection />) : ''
          }
          <AudioPlayer src={Aphelion} />
        </div>
        </>
    )
}