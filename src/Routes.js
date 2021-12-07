import React from 'react'
import {Switch,BrowserRouter,Route} from 'react-router-dom'
import PrivateRoutes from './auth/PrivateRoutes'
import Home from './core/Home'
import EditProject from './user/EditProject'
import Profile from './user/Profile'
import SignIn from './user/SignIn'
import Signup from './user/Signup'
import EditCourse from './user/EditCourse'
import NotFoundPage from './core/NotFoundPage'
import { AudioPlayerProvider } from 'react-use-audio-player'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Routes =() => {
    return (
        <>
        <ToastContainer />
        <AudioPlayerProvider>
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={Signup} />
                <PrivateRoutes path="/profile" exact component={Profile} />
                <PrivateRoutes path="/editproject/:projectId" exact component={EditProject} />
                <PrivateRoutes path="/editcourse/:courseId" exact component={EditCourse} />
                <Route path="*" exact component={NotFoundPage} />
            </Switch>
        </BrowserRouter>
        </AudioPlayerProvider>
        </>
    )
}

export default Routes