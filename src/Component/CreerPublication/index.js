import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { Collapse, IconButton, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
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
          marginLeft:theme.spacing(10)
      },
      publier:{
        maxHeight:800,
        maxWidth: 800,
        marginLeft:'25%',
       textAlign:'center',
       marginTop:'-5%',
       backgroundColor:"rgba(117, 190, 218, 0.0)",
       
      }
    }));
function Index() {
    const classes=useStyles();
    const [commentaire,setCommentaire]=useState('')
    const comment = (e)=>{
        
       
    }
    return (
        <div>
            <Paper component="form"  className={classes.root} >
                <div className={classes.root1}>
                    <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                    </Avatar>
    
                    <InputBase
                        className={classes.input}
                        placeholder="Comment..."
                        onClick={comment}
                        
                    />
                </div>
                <div >
                <IconButton size="small" className={classes.icon} >
                    <PhotoLibraryIcon color="primary"/>
                    Picture
                </IconButton>
                <IconButton size="small" className={classes.icon1}>
                    <YouTubeIcon color="secondary"/>
                    Video
                </IconButton>
                </div>
            </Paper>
            <Collapse in="true">
            <Paper className={classes.publier}  elevation={3}>
                <h3>Creer un publication </h3>
                <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                    </Avatar>
                    <InputBase
                        className={classes.input}
                        placeholder="Que Voulez-vous dire "
                       
                        
                    />
                    <IconButton size="small" className={classes.icon} >
                    <PhotoLibraryIcon color="primary"/>
                    Picture
                </IconButton>
                <IconButton size="small" className={classes.icon1}>
                    <YouTubeIcon color="secondary"/>
                    Video
                </IconButton>
            </Paper>
            </Collapse>
        </div>
    )
}

export default Index
