import React, { useEffect } from 'react'
import Navbar from '../../Component/Navbar';
import Publication from '../../Component/Publication';
import CreatePublication from '../../Component/CreerPublication';
import './style.css'
import { useSelector, useDispatch } from 'react-redux'

import { getPublication} from '../../Actions/user.action';

function Index() {
    const auth =useSelector(state=>state.auth);
    const dispatch = useDispatch()
    
   const publication= useSelector(state=>state.user.publication);

   const [open, setOpen] = React.useState(false);
   
  
    return (
        <div className="root"  >
             
                
                
            <Navbar/>
            
            <CreatePublication  />
            {
               
              publication? publication.map((number,index)=>{return<Publication key={index} data={[number.name,number.text,number.createdAt,number.url]} userId={number.userId} onUpdate={(value)=>{setOpen(value);console.log('open',open);}} id={number.id} />})
          :null }


            
        </div>
    )
}

export default Index
