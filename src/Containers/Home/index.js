import React from 'react'
import Navbar from '../../Component/Navbar';
import Publication from '../../Component/Publication';
import CreatePublication from '../../Component/CreerPublication';
import './style.css'
function index() {
  
    return (
        <div className="root" >
            <Navbar/>
            <CreatePublication/>


            <Publication/>
        </div>
    )
}

export default index
