import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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
import { addCommantaire, getCommantaire,deletePublication, getPublication } from '../../Actions';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Update from '../../Component/Layout'

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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [commentaire,setCommentaire]=useState('')
  const auth =useSelector(state=>state.auth);
  console.log(userId,auth.uid);
  const user=useSelector(state=>state.user)
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [open, setOpen] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
    dispatch(getCommantaire())

  };
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
  const deletePub=()=>{
    dispatch(deletePublication(id))
    dispatch(getPublication())

  }
  

  return (
    <div >
                  <Update data={data} open={open} id={id} onUpdate={val=>setOpen(val)}></Update>

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
       <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={deletePub}>
          <ListItemIcon>
            <DeleteIcon ></DeleteIcon>
          </ListItemIcon>
          <ListItemText primary="delete"  />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{setOpen(true) ;props.onUpdate(open)}}>
          <ListItemIcon >
            <UpdateIcon/>
          </ListItemIcon>
          <ListItemText primary="update" />
        </StyledMenuItem>
        <StyledMenuItem>
          
        </StyledMenuItem>
      </StyledMenu>
      
      <CardContent>
        {data[3]? <img className={classes.media2} src={data[3]}  />:null}
        {data[3]?<video className={classes.media2} src={data[3]}></video>:null}
        <Typography variant="body2" color="textSecondary" component="p">
          {data[1]}
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="like" className={classes.expand}>
          <ThumbUpIcon  />
        </IconButton>
        <IconButton
          className={classes.expand}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          
        >
          <CommentIcon/>
        </IconButton>
        <IconButton aria-label="share" className={classes.expand}>
          <ShareIcon />
        </IconButton>
        
        
        
        
      
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
    </div>
  );
}
export default RecipeReviewCard;