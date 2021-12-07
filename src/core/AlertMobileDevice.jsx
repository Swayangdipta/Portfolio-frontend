import React from 'react'

function AlertMobileDevice({isMobile=undefined,setIsMobile= f => f,info = undefined}) {
    return (
        <div className="alert__container">
            <h1 className="alert__msg">This website may not work properly on your {info.os} Device.</h1>
            <button className="alert__agreeBtn" onClick={(e)=>setIsMobile(!isMobile)}>Ok</button>
        </div>
    )
}

export default AlertMobileDevice
