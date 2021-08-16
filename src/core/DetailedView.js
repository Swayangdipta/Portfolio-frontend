import React,{useState} from 'react'
import {API} from '../Backend'
import {FiGithub} from 'react-icons/fi'
import {FaGlobe} from 'react-icons/fa'
import {CgClose} from 'react-icons/all'

export default function DetailedView({item,isOpen=undefined,setIsOpen = f => f}) {

    const closeView = () => {
        setIsOpen(false)
    }

    return (
        <div className="detailedViewContainer">
            <div className="closeView" onClick={closeView}><CgClose /></div>
            <div className="detailedView">
                <div className="viewImg">
                    <img src={item.title ? `${API}/project/thumbnail/${item._id}` : `${API}/course/photo/${item._id}`} className="viewThumbnail" />
                    <div className="titleHolder">
                        <h1 className="viewName folioSectionTitle viewTitle">Title</h1>
                        <h1 className="viewName folioSectionTitle">{item.title ? item.title : item.name}</h1>
                    </div>
                </div>
                <div className="viewExtras">
                    <div className="viewDescription">
                        <h1 className="viewName folioSectionTitle viewTitle viewDescriptionName">Description</h1>
                        <p className="viewName folioSectionTitle viewDescPara">{item.description}</p>
                    </div>
                    <div className="viewTags">
                        <h1 className="viewName folioSectionTitle viewTitle viewDescriptionName viewCategory">Category</h1>
                        <h1 className="viewDescPara folioSectionTitle viewName viewTagName">{item.tag ? item.tag : item.category.name}</h1>
                    {item.title ? (
                        <div className="viewLinks">
                            <h1 className="viewName folioSectionTitle viewTitle viewDescriptionName viewCategory">Links</h1>
                            <div className="viewActualLinks">
                                <a style={{color: "hsla(192, 18%, 49%, 1)"}} href={item.git_repo}><FiGithub /></a>
                                <a style={{color: "hsla(192, 18%, 49%, 1)"}} href={item.live_url}><FaGlobe /></a>
                            </div>
                        </div>
                    ) : ''}
                    </div>
                </div>
            </div>
        </div>
    )
}
