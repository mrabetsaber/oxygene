import React,{useState }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import NavBar from '../../Component/Navbar'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './style.css'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginTop:theme.spacing(3),
      marginLeft: theme.spacing(50),
      width: theme.spacing(60),
      height: theme.spacing(64),
     
    },
    textAlign:'center',
    
  },
}));






export default function SimplePaper() {
  const classes = useStyles();
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  
  
  
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
   }
  return (
      <div className="class">
        <NavBar/>
        <div className={classes.root}>
          <Paper elevation={3} >
            <form onSubmit={userLogin}>
              <div className="container">
                <h3>Login</h3>
                <div className="input">
                  <TextField
                  id="outlined-email-input"
                  label="Email"
                  type="email"
                  onChange={(e)=>setemail(e.target.value)}
                  autoComplete="current-password"
                  variant="outlined"
                  value={email}
                  />
              </div><br/>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={(e)=>{setpassword(e.target.value)}}
                value={password}
                />
              </div>
              <div className="button">
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