
import React,{useState,useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useSelector, useDispatch } from 'react-redux'
import NavBar from '../../Component/Navbar'
import { deletePublication, deleteUser, getPublication, getRealtimeuser, } from '../../Actions';
import Button from '@material-ui/core/Button'


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

 function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch()
  const publication= useSelector(state=>state.user.publication);
  const user =useSelector(state=>state.user)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const id = props.id
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deletePub=(id)=>{
    publication.map(pub=>{
      if(pub.userId===id)
      dispatch(deletePublication(pub.id))
      
    })
    dispatch(getPublication())
    dispatch(deleteUser(id))
    dispatch(getRealtimeuser())
    props.listUser(user)
    setOpen(false);

  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Whene you agree this user will be anymore here
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={()=> deletePub(id)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const classes = useStyles();
  const user =useSelector(state=>state.user)
  const auth=useSelector(state=>state.auth)
  

  const users=user.users
  const[Susers,setSusers]=React.useState(null)
  const filter=(e)=>{
     
    setSusers(users.map(user=>{
      if(user.firstName.includes(e.target.value))
        return user
      
      
    }))
   
     }
     let  unsubscribe
    
console.log('auth',auth);
  return (
      <div>
                  <NavBar/>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Mazlina</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {Susers?Susers.map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row">
                {user.email?user.email:user.firstName}
              </TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <ResponsiveDialog id={user.uid} listUser={user=>{console.log('from inside',user );}}></ResponsiveDialog>
       
      </TableCell>
              
            </TableRow>
          )):users.map((user) => (
            <TableRow key={user.uid}>
              <TableCell component="th" scope="row">
                {user.email?user.email:user.firstName}
              </TableCell>
              <TableCell align="right">{user.firstName}</TableCell>
              <TableCell align="right">{user.lastName}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">
                <ResponsiveDialog id={user.uid} listUser={user=>{console.log('from inside',user );}}></ResponsiveDialog>
       
      </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
