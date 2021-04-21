import React from 'react';
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

  return (
      <div className="class">
        <NavBar/>
        
        <div className={classes.root}>
        
        <Paper elevation={3} className="container">
        
        
        <div className="container">
        <h3>Login</h3>
        <div className="input">
        <TextField
          id="outlined-password-input"
          label="Email"
          type="email"
          onChange=""
          variant="outlined"
        /></div><br/>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          
          variant="outlined"
        />
        
        </div>
        <div className="button">
        <Button  variant="contained" color="primary" >
        Primary
      </Button>
        </div>
        
        </Paper>
        </div>
    </div>
  );
}