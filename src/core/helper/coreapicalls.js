import { API } from "../../Backend";

export const addProject = (userId,token,project) => {
    return fetch(`${API}/project/add/${userId}`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: project
    }).then(response => {
        return response.json()
    }).catch(e=>e)
}

export const editProject = (userId,projectId,project,token) => {
    return fetch(`${API}/project/update/${projectId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: project
    }).then(response=>{
        return response
    }).catch(e=>e)
}

export const removeProject = (userId,projectId,token) => {
    return fetch(`${API}/project/${projectId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(
        response => response.json()
    ).catch(e=>e)
}

export const addCourse = (userId,token,course) => {
    return fetch(`${API}/course/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: course
    }).then(response => {
        return response.json()
    }).catch(e=>e)
}

export const removeCourse = (userId,courseId,token) => {
    return fetch(`${API}/course/delete/${courseId}/${userId}`,{
        method: "DELETE",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(
        response => response.json()
    ).catch(e=>e)
}

export const updateCourse = (userId,courseId,token,course) => {
    return fetch(`${API}/course/${courseId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: course
    }).then(response=>response.json()).catch(e=>e)
}

export const sendMail = (mail) => {
    return fetch(`${API}/sendmail`,{
        method: "POST",
        mode: "no-cors",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(mail)
    }).then(response=>response.json()).catch(e=>e)
}

export const getInfo = userId => {
    return fetch(`${API}/user/info/${userId}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(response=>response.json()).catch(e=>e)
}