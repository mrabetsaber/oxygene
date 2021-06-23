import React from 'react';
import { NavLink } from 'react-router-dom'
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Logout } from '../../Actions'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function SearchAppBar() {
  const auth =useSelector(state=>state.auth);
  const dispatch = useDispatch();
  const classes = useStyles();
  
 
  

  return (
    <header className="header">
      <AppBar position="static" color="transparent">
  <Toolbar>
    
    <Typography variant="h6" className={classes.title}>
    { !auth.authenticated?<NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder'}} to={'/'}>Oxygene</NavLink>
:<NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder'}} to={'/home'}>Oxygene</NavLink>
}
    </Typography>{ !auth.authenticated?<div>
 <NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder',marginRight:20 }} to={'/login'}>login</NavLink>
  
  <NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder'}} to={'/signin'}>SignUp</NavLink>
 </div>:null }
 { auth.authenticated?<div>
  <NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder',marginRight:20}} to={'/messages'}>messages</NavLink>
{ auth.email==="mrabetsaber31@gmail.com"? <NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder',marginRight:20}} to={'/admin'}>Admin</NavLink>
:null}  <NavLink style={{textDecoration:'none',color:'white', fontWeight:'bolder'}} to={'/'} onClick={()=>{
                  dispatch(Logout(auth.uid))
                }}>Logout</NavLink>
  
  
 </div>:null }
 
 
 
 
 </Toolbar>
</AppBar>
        <div style={{display: 'flex'}}>
{
            !auth.authenticated ?
            

            <ul className="leftMenu">
                <li><NavLink to={'/login'} > login</NavLink></li>
                <li className="test"><NavLink to={'/Signin'} >SignIn </NavLink></li>
            </ul>:null }
        </div>
        <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>{auth.authenticated?`Hi ${auth.firstName} ${auth.lastName}`:''} </div>
        <ul >
              {
                auth.authenticated?
               <ul className="leftmenu"> <li>
                
                <NavLink to={'/'} onClick={()=>{
                  dispatch(Logout(auth.uid))
                }}>Logout</NavLink>
            </li>
            <li><NavLink to={'/messages'} >messages</NavLink></li>
            <li><NavLink to={'/home'} >home</NavLink></li>
            </ul>
            :null
              }
              </ul>
        </header>
  );
}