import React, { useEffect, useState } from 'react'
import {useAudioPlayer} from 'react-use-audio-player'
import audioPlay from '../assets/img/animation_300_kp8akcyj.gif'
import audioStop from '../assets/img/animation_300_kp8akcyj-2.png'
import Aphelion from '../assets/sounds/Aphelion160Short.mp3'


export default function AudioPlayer({src}) {

    const {togglePlayPause,ready,loading,playing} = useAudioPlayer({
        src: src,
        autoplay: true,
        loop: true,
        volume: 0.8
    })


    useEffect(()=>{
        console.log("Ready",ready);
        if(ready){
            togglePlayPause()
        }
    },[ready])

    return (
        <div>
            <button className="playPause" onClick={togglePlayPause} >{playing ? (
                <img src={audioPlay} style={{
                    width: '100%',
                    height: "100%",
                    objectFit: 'cover'
                }} />
            ) : (<img src={audioStop} style={{
                width: '100%',
                height: "100%",
                objectFit: 'cover'
            }} />)}</button>
        </div>
    )
}
