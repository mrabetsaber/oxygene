import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

/**
* @author
* @function PrivateRoute
**/

const PrivateRoute = ({component:Component,...rest}) => {
  const auth =useSelector(state=>state.auth);
  return(
    <Route {...rest} component={(props)=>{
       const user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')) :null;
          console.log('local storage user',user);
        if(user===null){
          return <Redirect to={"/"} />
        }else{
          return <Component {... props} />

        }



    }} />
   )

 }

export default PrivateRoute