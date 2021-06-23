import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ShareIcon from '@material-ui/icons/Share';
import CommentIcon from '@material-ui/icons/Comment';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Commentaire from '../Commentaire'
import { useSelector, useDispatch } from 'react-redux'
import { addCommantaire, getCommantaire,deletePublication, getPublication, addlike, getLike, deleteLike, addPublication, getRealtimeuser } from '../../Actions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Update from '../../Component/Layout'




import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

 function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch()
  const publication= useSelector(state=>state.user.publication);
  const user =useSelector(state=>state.user)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const id = props.id
  const url= props.url
  
  const handleClickOpen = () => {
    setOpen(true);
    props.onChange(null)
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deletePub=(id)=>{
    
    dispatch(deletePublication(id,url))
    
    setOpen(false);
   
  
  
props.onAgree(true)
  }
  
    
  

  return (
    <div>
      
      <Button   onClick={handleClickOpen}>
      <DeleteIcon></DeleteIcon> Delete
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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}



 



const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    padding:'30px 30px',
    maxWidth: 600,
    marginLeft:'30%',
    marginBottom:20
    
    
  },
  root1: {
    padding: '6px 6px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
    backgroundColor:'#eee'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 8, 
  },
 comment:{
     display:'flex'
 },
  avatar: {
    backgroundColor: red[500],
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  media2:{
    height: '200px',
    width: '100px',
  }
}));

 function RecipeReviewCard(props) {
   const data = props.data
   const id = props.id
   const userId=props.userId;
   const time=data[2]
   const [openA, setOpenA] = React.useState(false);
   const likes= useSelector(state=>state.user.likes);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [commentaire,setCommentaire]=useState('')
  const auth =useSelector(state=>state.auth);
  
  const user=useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const [like, setLike] = React.useState(props.like);
  const [likeId, setlikeid] = React.useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
    dispatch(getCommantaire())

  };
  useEffect(()=>{ 
    dispatch(getRealtimeuser())
    likes.map(like=>{
     
      if(like.pubId===id&&like.userId===auth.uid){
        setlikeid(like.id)
        return setLike(like.isLiked);
        
      }
      return false
    })
     },[])
  const comment = (e)=>{
      e.preventDefault()
      const Commantaire={
       pubId:id,
        name:auth.firstName,
        commentaire ,
        createdAt :new Date().toLocaleTimeString(),
        
        }
      dispatch(addCommantaire(Commantaire));

      setCommentaire('')
      dispatch(getCommantaire())
     
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log('data[4]',data[4]);
  const handleClosea = (event, reason) => {
    if (reason === 'clickaway') {
      setOpenA(false);
      dispatch(getPublication())
      return;
    }

    setOpenA(false);
    dispatch(getPublication())
  };
  
 const liked =()=>{
   if(like){
     dispatch(deleteLike(likeId))
     dispatch(getLike())
     setLike(false)
     return;
   }
   const l={
     userId:auth.uid,
     pubId:id,
     isLiked:true
   }
  dispatch(addlike(l))
  dispatch(getLike())
  likes.map(like=>{
     
    if(like.pubId===id||like.userId===auth.uid){
      setlikeid(like.id)
      return setLike(like.isLiked);
      
    }
    return false
  })
 }
 const call=(val)=>{
  setOpen(val)
  props.onUpdate()
 }
 const share=(id)=>{
  const publication={
       
    name:auth.firstName,
    userId:auth.uid,
    text:data[1] ,
    createdAt :new Date().toLocaleTimeString(),
    url:data[3],
    sort:new Date().toString(),
    oldUser:userId


}
dispatch(addPublication(publication));

dispatch(getPublication())
 }
 
 console.log("the function",like);

  return (
    <div >
                  <Update data={data} open={open} id={id} onUpdate={val=>call(val)}></Update>

    <Card className={classes.root}>
      <CardHeader
        avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
            {data[0]?data[0][0]:null}
          </Avatar>
        }

        action={
         auth.uid===userId? <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        :null}
        
        title={data[0]}
        subheader={time}
      />
      {data[4]?
        user.users.map(user=>{
          if(user.uid===data[4]){
            return <div>
              <Divider variant="fullWidth"></Divider>
            <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {user.firstName[0]}
              </Avatar>
            }
            
            title={user.firstName}
            
            />
            </div>
          }
        })
     :null }
       <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
        <ResponsiveDialog onChange={(val)=>setAnchorEl(val)} onAgree={(value)=>setOpenA(value)} id={id} url={data[3]}></ResponsiveDialog>
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{setOpen(true) ;props.onUpdate(open);setAnchorEl(null)}}>
          <Button><UpdateIcon/> Update </Button>
        </StyledMenuItem>
        
      </StyledMenu>
      
      <CardContent>
        {data[3]? <img className={classes.media2} src={data[3]}  />:null}
        {data[3]?<video className={classes.media2} src={data[3]}></video>:null}
        <h4>

          {data[1]}
        </h4>
          
      
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={liked} aria-label="like" className={classes.expand}>
          <ThumbUpIcon color={like?"primary":''} />
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          
        >
          <CommentIcon/>
        </IconButton>
       {auth.uid!==userId? <IconButton onClick={share} aria-label="share" className={classes.expand}>
          <ShareIcon />
        </IconButton>:null}
        
        
        
        
      
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className="comment">
          
      
          
          <Paper component="form" onSubmit={comment} className={classes.root1}>
      
            <Avatar aria-label="recipe" className={classes.avatar}>
                {data[0][0]}
            </Avatar>
          
            <InputBase
              className={classes.input}
              placeholder="Comment..."
              onChange={(e)=>{setCommentaire(e.target.value)}}
              value={commentaire}
              autoFocus={true}
            />
                
          </Paper>
         
          {user.commantaire?
                
                user.commantaire.map((data,index)=>{
                  console.log('data',data);
                  
                     
                    if(data.pubId==id){
                   return <Commentaire
                     comment={data} key={index} >
                   </Commentaire>
                    }
               
           
               }):null
             }
                
                   
                
                   
          </CardContent>
      </Collapse>
    </Card>
    <Snackbar open={openA} autoHideDuration={6000} onClose={handleClosea}>
        <Alert onClose={handleClosea}  severity="success">
          your post is deleted successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
export default RecipeReviewCard;