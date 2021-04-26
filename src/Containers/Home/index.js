import React from 'react'
import Navbar from '../../Component/Navbar';
import Publication from '../../Component/Publication';
import CreatePublication from '../../Component/CreerPublication';
import './style.css'

function index() {
    const data=[{firstName:'saber',lastName:"mrabet",comment:[{firstName:'saber',lastName:"mrabet",detail:"Aliquip consequat eu voluptate nostrud ex adipisicing aute cillum reprehenderit incididunt dolore id qui. Exercitation magna dolor elit occaecat duis aute exercitation sint non. Laboris fugiat mollit sit ad labore anim aute ad. Culpa fugiat consequat irure ex excepteur ipsum ullamco."}]},{firstName:'hiba'}]
  
    return (
        <div className="root" >
            
            <Navbar/>
            <CreatePublication/>
           {
               data.map((number,index)=>{return<Publication key={index} data={[number.firstName,number.lastName,number.comment]} />})
           }

            
        </div>
    )
}

export default index
