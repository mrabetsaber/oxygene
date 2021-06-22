import React,{useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../Component/Navbar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css'
import { signup } from '../../Actions/auth.action';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router';
import Alert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginTop:theme.spacing(3),
      marginLeft: theme.spacing(50),
      width: theme.spacing(70),
      height: theme.spacing(65),
     
    },
    textAlign:'center',
    
  },
}));







export default function Signin() {
  const classes = useStyles();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [password2,setpassword2]=useState('');
  const [firstName,setfirstName]=useState('');
  const [lastName,setlastName]=useState('');
  const  dispatch = useDispatch();
  const auth  = useSelector(state =>state.auth)
  const error= useSelector(state=>state.error)
  
  
  const userLogin=(e) => {
    e.preventDefault(); 
    if(email===""){
      alert("Email is required");
      return;
    }
    if(password===""){
      alert("password is required");
      return;
    }
    if(firstName===""){
      alert("first name is required");
      return;
    }
    if(lastName===""){
      alert("last name is required");
      return;
    }
    if(password2===""){
      alert("password shuld be confirmed ");
      return;
    }
    if(password!==password2){
      alert("password is not correctly confirmed");
      return;
    }
    const user ={firstName,lastName,email,password}
    dispatch(signup(user))
   }
   
   if(auth.authenticated){
    return <Redirect to ={'/home'}></Redirect>
  }
  return (
      <div className="sclass">
        <NavBar/>
        <div className={classes.root}>
          <Paper elevation={3} >
         { auth.error?<Alert severity="error">{auth.error.message}</Alert>:null}
            <p></p>
            <form onSubmit={userLogin}>
              <div className="Signincontainer">
                <h3>Sign In</h3>
                <div className="Sinput">
                  <TextField
                  
                  label="First Name"
                  type="text"
                  onChange={(e)=>setfirstName(e.target.value)}
                  autoComplete="current-password"
                  variant="outlined"
                  value={firstName}
                  />
              </div><br/>
                <div className="sinput">
                  <TextField
                  
                  label="Last Name"
                  type="text"
                  onChange={(e)=>setlastName(e.target.value)}
                  autoComplete="current-password"
                  variant="outlined"
                  value={lastName}
                  />
              </div><br/>
                <div className="sinput">
                  <TextField
                  
                  label="Email"
                  type="email"
                  onChange={(e)=>setemail(e.target.value)}
                  autoComplete="current-password"
                  variant="outlined"
                  value={email}
                  />
              </div><br/>
                <div className="sinput">
                  <TextField
                  
                  label="Password"
                  type="password"
                  onChange={(e)=>setpassword(e.target.value)}
                  autoComplete="current-password"
                  variant="outlined"
                  value={password}
                  />
              </div><br/>
              <TextField
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e)=>{setpassword2(e.target.value)}}
                value={password2}
                />
              </div>
              <div className="sbutton">
              <Button  variant="contained" color="primary" type="submit"  >
                Login
              </Button>
              </div>
            </form>
        
          </Paper>
        </div>
     </div>
  );
}