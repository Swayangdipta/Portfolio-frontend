import { authenticate } from "../../auth/helper"
import { API } from "../../Backend"

export const getUserPhoto = (_id) => {
    return fetch(`${API}/user/photo/${_id}`,{
        method: "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(response=>{
        return response
    }).catch(e=>e)
}

export const getAllProjects = () => {
    return fetch(`${API}/projects`,{
        method: "GET"
    }).then(response=>response.json()).catch(e=>e)
}

export const getProjectPhoto = (projectId) => {
    return fetch(`${API}/project/thumbnail/${projectId}`,{
        method: "GET",
        headers:{
            "Content-Type" : "application/json"
        }
    }).then(response=>{
        return response
    }).catch(e=>e)
}

export const getCoursePhoto = (courseId) => {
    return fetch(`${API}/course/photo/${courseId}`,{
        method: "GET"
    }).then(response=> response).catch(e=>e)
}

export const getAllCourses = () =>{
    return fetch(`${API}/courses`,{
        method: "GET"
    }).then(response=>response.json()).catch(e=>e)
}

export const updateUser = (userId,user,token) => {
    return fetch(`${API}/user/update/${userId}`,{
        method: "PUT",
        headers:{
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: user
    }).then(response=>{
        return response.json()
    }).catch(e=>e)
}

export const getAProject = (id) => {
    return fetch(`${API}/project/${id}`,{
        method: "GET"
    }).then(response=>{
        return response.json()
    }).catch(e=>e)
}

export const getCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    }).then(response => {
       return response.json()
    }).catch(e=>e)
}

export const getACategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET"
    }).then(response=> response.json()).catch(e=>e)
}

export const getCourse = (courseId) => {
    return fetch(`${API}/courses/${courseId}`,{
        method: "GET"
    }).then(response=>response.json()).catch(e=>e)
}