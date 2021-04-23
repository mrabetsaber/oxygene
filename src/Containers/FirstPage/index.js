import React from 'react'
import './style.css'

import NavBar from '../../Component/Navbar'
import { NavLink } from 'react-router-dom'
function FirstPage() {
    return (<div>
        <NavBar/>
        <section className="cont">
            
            
            <p className="title">Free your Lungs</p>
            <p className="Subtitle">the best way to stop <br/> smoking </p>
            <NavLink to="/home"><div className="join" >join us</div></NavLink>  
            <img className="img" src="images/firstPageImg.jpg" alt="" />
            
            
           
            </section >
        </div>
    )
}

export default FirstPage
