import React, { useRef, useState } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import * as THREE from "three";
import { useSpring, animated, config } from '@react-spring/three'
import useMousePosition from './useMousePosition';

export default function Planets({textures,size,rotationSelf,lightColor,position,isPosition,text}) {
    const [hover,setHover] = useState(false)
    const {x,y} = useMousePosition()
    const myMesh = useRef()
    const [ colorMap ] = useLoader(TextureLoader,[textures])

    const {scale} = useSpring({
        scale: hover ? size.max : size.min,
        config: {
            mass: 1,
            tension: 280,
            friction: 400,
        }
    })

    useFrame(({clock})=>{
        myMesh.current.rotation.x = clock.getElapsedTime() * 0.1
        myMesh.current.rotation.y = clock.getElapsedTime() * rotationSelf
        // myMesh.current.rotation.z = clock.getElapsedTime() * 0.3
        if(isPosition){
            myMesh.current.position.y = y * -0.0008
            myMesh.current.position.x = x * 0.0005
            myMesh.current.position.z = x * 0.0005
        }
    })

    return (
        <>
            <ambientLight intensity={0.001} color={0xFF0000} />
            <pointLight castShadow={true} color={0xF0000F} intensity={10} position={[0,30,-50]}/>
            {/* <pointLight castShadow={true} color={0xFFFF00} intensity={10} position={[0,-30,-50]}/> */}
            <pointLight color={0xF0000F} intensity={10} position={[30,7,-50]}/>
            {/* <pointLight castShadow={true} color={0xFFFF00} intensity={10} position={[-30,0,-50]}/> */}
            {/* <pointLight color={0xFFFFFF} intensity={10} position={[0,0,0]}/> */}
            <directionalLight intensity={0.3} color={'#444'} position={[0,0,30]} />
            <animated.mesh position={position} scale={scale} ref={myMesh} onPointerEnter={()=>setHover(true)} onPointerLeave={()=>setHover(false)} >
                <sphereGeometry userData={text}  args={[size.initial,100,100,0, Math.PI * 4,0,Math.PI*2]}  />
                <meshPhysicalMaterial 
                    clearcoat={10}
                    map={colorMap} 
                    reflectivity={0}
                    roughness={0}
                />

            </animated.mesh>
        </>
    )
}


// Some lights
            {/* <pointLight castShadow={true} color={0x00FF00} intensity={10} position={[0,50,-50]}/> */}
            {/* <directionalLight color={0x00071a} intensity={0.5} position={[0,10,10]}/> */}
            {/* <directionalLight color={0x0000FF} intensity={0.5} position={[0,-20,20]}/> */}
            {/* <directionalLight color={0xFF0000} intensity={.4} position={[x,y]}/> */}
            {/* <directionalLight castShadow={true} color={0xFFD700} intensity={50} position={[0,50,-50]}/> */}
            {/* <directionalLight castShadow={true} color={0x00FF00} intensity={100} position={[0,0,0]}/> */}
            {/* <directionalLight  color={color} intensity={1} position={[0,0,100]}/> */}
            {/* <directionalLight  color={0xFFD700} intensity={10} position={[0,0,-100]}/>  */}