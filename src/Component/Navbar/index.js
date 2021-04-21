import React from 'react';
import { NavLink } from 'react-router-dom'
import './style.css'




export default function SearchAppBar() {
  

  return (
    <header className="header">
        <div style={{display: 'flex'}}>

            <NavLink to={'/'}><img src="" alt="oxygene" /></NavLink>

            <ul className="leftMenu">
                <li><NavLink to={'/login'} > login</NavLink></li>
                <li className="test"><NavLink to={'/home'} >SignIn </NavLink></li>
            </ul> 
        </div>
        </header>
  );
}