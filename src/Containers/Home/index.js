import React, { useEffect } from 'react'
import Navbar from '../../Component/Navbar';
import Publication from '../../Component/Publication';
import CreatePublication from '../../Component/CreerPublication';
import './style.css'
import { useSelector, useDispatch } from 'react-redux'

import { getLike, getPublication, getRealtimeuser} from '../../Actions/user.action';
import { Call } from '@material-ui/icons';

function Index() {
    const auth =useSelector(state=>state.auth);
    const dispatch = useDispatch()
    
   const publication= useSelector(state=>state.user.publication);

   const [open, setOpen] = React.useState(false);
   const Call=()=>{
     dispatch(getPublication())
   }
   const add=()=>{
      console.log('add')
       dispatch(getPublication())
   }
   
  useEffect(()=>{ 
    dispatch(getRealtimeuser())
    let unsubscribe= dispatch(getPublication())
      .then((unsubscribe) => {
        return unsubscribe;
        
        
      })
      .catch(error=>{
        console.log(error);
        
      }) },[])
    return (
        <div className="root"  >
             
                
                
            <Navbar/>
            
            <CreatePublication  onUpdate={()=>add()} />
            {
               
              publication? publication.map((pub,index)=>{return<Publication key={index} data={[pub.name,pub.text,pub.createdAt,pub.url,pub.oldUser]} userId={pub.userId} onUpdate={(value)=>{Call();console.log('call');}} id={pub.id} />})
          :null }


            
        </div>
    )
}

export default Index
