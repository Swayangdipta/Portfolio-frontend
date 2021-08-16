import {API} from '../../Backend'
import axios from 'axios'

export const signin = (user)=>{
    return fetch(`${API}/signin`,{
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(e=>{
        return ''
    })
}

export const authenticate = (data,next) => {
    if(typeof window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(data))
        next()
    }
}

export const isAuthenticated = () => {
    if(typeof window == undefined){
        return false
    }

    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false
    }
}

export const signup = (user) => {
    return fetch(`${API}/signup`,{
        method: "POST",
        headers:{
            Accept: "application/json"
        },
        body: user
    }).then(response=>{
        return response.json()
    }).catch(e=>'')
}

export const signout = () => {
    if(typeof window == undefined){
        return false
    }

    if(localStorage.getItem("jwt")){
        localStorage.removeItem("jwt")
        return true
    }
}