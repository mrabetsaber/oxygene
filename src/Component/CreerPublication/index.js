import React,{useEffect, useState} from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { Collapse, Hidden, IconButton, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardHeader from '@material-ui/core/CardHeader';
import { useSelector, useDispatch } from 'react-redux'
import { addPublication,getPublication} from '../../Actions/user.action';


const useStyles = makeStyles((theme) => ({



    root: {
        padding: '10px 10px',
        alignItems: 'center',
        width: 640,
        marginLeft:'30%',
        marginTop:40,
        marginBottom:20,
        flexGrow:1,
        
      },
      root1:{
          display:'flex'
      },
      avatar: {
        backgroundColor: red[500],
        marginLeft:theme.spacing(3)
      },
      input: {
        marginLeft: theme.spacing(4),
        flex: 1,
      },
      icon:{
        marginLeft: theme.spacing(10),
        
        flexGrow: 1,
      },
      icon1:{
          marginLeft:theme.spacing(10),
          
      },
      publier:{
        height:600,
        maxHeight:600,
        
        width:440,
        
       alignItems:'center',
       marginTop:40,
       
      
       
      },
      rootClicked:{
        visibility:'hidden',
      },
      header:{
        
       display:'flex',
       flexGrow:1,
        fontWeight:900,
        alignItems:'center',
        padding: '10px 10px',
        width: 640,
        marginLeft:'30%',
        marginTop:40,
        marginBottom:0,
        flexGrow:1,
      },
      closeIco:{
          marginLeft:'15%'
      },
      PublicationInput:{
          
          
          width:'100%',
         textAlign:'center',
         maxHeight:200,
         marginBottom:10
      },
      avatarP:{
        backgroundColor: red[500],
        marginLeft:theme.spacing(6)
      },

      media:{
          
         textAlign:'center',
         marginBottom:0,
         width:10
      },
      video:{
        height:120,
        marginLeft:'70%'
      }





    }));
function Index(props) {
  

    const classes=useStyles();
    const [visabal,setvisabal]=useState(false);
    const [videoUrl,setVideoUrl]=useState('');
    const [vid,setVideo]=useState('')
    const [image,setImg]=useState('');
    const [imageUrl,setImgUrl]=useState('');
    const auth =useSelector(state=>state.auth);
    const publication = useSelector(state=>console.log(state))
    
    const dispatch = useDispatch()
    const[text,setText]=useState('')
    
    const handleVisbalClick = ()=>{
     
        setOpen(true)
       
      
    }
    
    const handelImg=(img)=>{
        
        let imgUrl=URL.createObjectURL(img);
        setImg(img);
        setImgUrl(imgUrl)
       
        setVideo('');
        
    }
    const handelvideo=(vid)=>{
       let vidUrl=URL.createObjectURL(vid);
        setImg('');
        setVideo(vid)
        setVideoUrl(vidUrl);
    }
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
      
    };
  
    const handleClose = () => {
      setOpen(false);
      
      if(open){
        setImg('')
        setVideo('')
        setImgUrl('');
        setVideoUrl('');
    }
    console.log(image);
    };
    
    const addPub = ()=>{
     const publication={
       
          name:auth.firstName,
          userId:auth.uid,
          text ,
          createdAt :new Date().toLocaleTimeString(),
          url:'',
          sort:new Date().toString(),


      }
      dispatch(addPublication(publication,image));
      setText('')
      dispatch(getPublication())
      props.onUpdate()
      handleClose()
      
    }
    return (
        <div >
           <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{textAlign:'center'}}>{"Create your Post"}</DialogTitle>
        <DialogContent className={classes.publier}>
        
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {auth.firstName[0]}
                        </Avatar>
                      }
                      
                      title={auth.firstName}
                      
                    />
                    <div className={classes.media}>
                    <img height="200"  src={imageUrl} className={classes.video} alt="" />
                    <video height="200"  src={videoUrl} className={classes.video}></video>
                    </div>
                    
                    <InputBase
                        className={classes.PublicationInput}
                        placeholder="Que Voulez-vous dire "
                        value={text}
                        multiline
                        rowsMax={6}
                        onChange={(e)=>{setText(e.target.value)}}
                    />
                     <label htmlFor="img" className={classes.icon1}>
                
                <PhotoLibraryIcon  color="primary"/>
                Picture
                
                <input type="file" id="img" hidden
                 onChange={(e)=>{handelImg( e.target.files[0]);handleVisbalClick();e.target.value=null } }
                 />
     
            </label>
                <label htmlFor="video" className={classes.icon1}>
                    <YouTubeIcon color="secondary"/>
                        Video
                       
                    <input type="file" id="video" hidden
                     onChange={(e)=>{handelvideo((e.target.files[0]));handleVisbalClick();e.target.value=null}} 
                     />
                </label>  
        </DialogContent>
        <DialogActions>
        <Button  disabled ={text===''&&imageUrl===''&&videoUrl===""} onClick={ addPub  } variant="contained" style={{width:'100%'}} color="primary">
          Post
        </Button>
        <Button onClick={ handleClose } variant="contained" style={{width:'100%'}} color="secondary">
          Cancel
        </Button>
                  
        </DialogActions>
      </Dialog>
    </div>
          

            <Paper component="form"   className={clsx(classes.root, {
            [classes.rootClicked]: visabal,})} >

                <div className={classes.root1}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                            {auth.firstName[0]}
                    </Avatar>
    
                    <InputBase
                        className={classes.input}
                        placeholder="create your post"
                        onClick={handleClickOpen}
                        onChange={(e)=>{setText(e.target.value);handleClickOpen()}}
                        value={text}
                    />
                </div>
                <label htmlFor="img" className={classes.icon1}>
                
                    <PhotoLibraryIcon  color="primary"/>
                    Picture
                    
                    <input type="file" id="img" hidden
                     onChange={(e)=>{handelImg( e.target.files[0]);handleVisbalClick();e.target.value=null } }
                     />
         
                </label>
                    <label htmlFor="video" className={classes.icon1}>
                        <YouTubeIcon color="secondary"/>
                            Video
                           
                        <input type="file" id="video" hidden
                         onChange={(e)=>{handelvideo((e.target.files[0]));handleVisbalClick();e.target.value=null}} 
                         />
                    </label>                
            </Paper>
            
          </div>
    )
}

export default Index
