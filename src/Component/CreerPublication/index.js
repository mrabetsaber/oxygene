import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { Collapse, Hidden, IconButton, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
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
        height:300,
        maxHeight:600,
        
        width:640,
        marginLeft:'30%',
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
          paddingLeft:'100px',
          height:100,
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
         marginBottom:0
      }





    }));
function Index() {
    const classes=useStyles();
    const [visabal,setvisabal]=useState(true);
    const [video,setVideo]=useState('');
    const [image,setImg]=useState('');
    let imghid=true;
    let vidhid=true;
    const handleVisbalClick = ()=>{
     
        setvisabal(!visabal);
        if(visabal){
            setImg('');
            setVideo('');
        }
        console.log(image);
      
    }
    const handelImg=(img)=>{
        imghid=false
        img=URL.createObjectURL(img)
        setImg(img);
        setVideo('');
        
    }
    const handelvideo=(vid)=>{
        vid=URL.createObjectURL(vid)
        setImg('');
        setVideo(vid);
    }
    
    return (
        <div >
          
            <Collapse  in={visabal} >
            <Paper  className={classes.publier}  elevation={3}>

                <div className={classes.header} ref={React.createRef()}>
                    <h3>Creer un publication </h3>
                <IconButton className={classes.closeIco} onClick={handleVisbalClick}>
                <CloseIcon/>
                </IconButton>
                </div>
                
                <Avatar aria-label="recipe" className={classes.avatarP}>
                            R
                    </Avatar>
                    <div className={classes.media}>
                    <img height="200"  src="/images/firstPageImg.jpg" alt="" />
                    <video src={video} className={classes.video}></video>
                    </div>
                    
                    <InputBase
                        className={classes.PublicationInput}
                        placeholder="Que Voulez-vous dire "
                        multiline
                        rowsMax={6}
                        
                    />
                    
                    <label htmlFor="img1" className={classes.icon1}>
                
                    <PhotoLibraryIcon  color="primary"/>
                    Picture
                    
                    <input type="file" id="img1" hidden
                     onChange={(e)=>{handelImg( e.target.files[0]); } }
                     />
         
                </label>
                
                    <label htmlFor="video1" className={classes.icon1}>
                        <YouTubeIcon color="secondary"/>
                            Video
                           
                        <input type="file" id="video1" hidden
                         onChange={(e)=>{handelvideo((e.target.files[0]));}} />
                    </label>                

            </Paper>
            </Collapse>
            <Paper component="form"   className={clsx(classes.root, {
            [classes.rootClicked]: visabal,})} >

                <div className={classes.root1}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                    </Avatar>
    
                    <InputBase
                        className={classes.input}
                        placeholder="Comment..."
                        onClick={handleVisbalClick}
                        
                    />
                </div>
                <label htmlFor="img" className={classes.icon1}>
                
                    <PhotoLibraryIcon  color="primary"/>
                    Picture
                    
                    <input type="file" id="img" hidden
                     onChange={(e)=>{handelImg( e.target.files[0]);handleVisbalClick() } }
                     />
         
                </label>
                    <label htmlFor="video" className={classes.icon1}>
                        <YouTubeIcon color="secondary"/>
                            Video
                           
                        <input type="file" id="video" hidden
                         onChange={(e)=>{handelvideo((e.target.files[0]));handleVisbalClick()}} />
                    </label>                
            </Paper>
            
          </div>
    )
}

export default Index
