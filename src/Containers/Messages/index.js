import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import SearchIcon from '@material-ui/icons/Search';
import Navbar from '../../Component/Navbar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import SendIcon from '@material-ui/icons/Send';
import ImageIcon from '@material-ui/icons/Image';
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
 root: {
     backgroundColor:"#eee",
    display: 'flex',
    flexWrap: 'wrap',
    textAlign:'center',
    '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(70),
        height: theme.spacing(16),
    },
    paddingBottom:'3.5%',
    paddingLeft:100
    
 },
 
  searchRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    marginLeft: theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 1,
    margin: 4,
    
  },
  person:{
    
    display: 'flex',
    alignItems: 'center',
    marginLeft:theme.spacing(3),
    fontFamily:'Poppins',
    fontWeight:600
    
  },
  avatar: {
    backgroundColor: red[500],
    marginRight:theme.spacing(3)
    
  },
  paperRoot:{
      height:500,
      fontFamily:'Poppins'
  },
  messagesRoot:{
    overflow:'auto',
    height:360
  },
  messagesInput:{
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 500,
    marginLeft: theme.spacing(3),
    marginTop:10
  
  },
  Button:{
    paddingRight:'80%',
    fontFamily:'Poppins',
    fontWeight:600
    
  },
  myMessage:{
    float:'right',
    backgroundColor:"#eee",
    marginBottom:10,
    borderRadius:40,
    padding:10,
    width:200,
    marginLeft:100
  },
  message:{
    float:'left',
    backgroundColor:"#eee",
    marginBottom:10,
    borderRadius:40,
    padding:10,
    width:200,
    marginRight:100,
  },
  messageRoot:{
    float:'left',
    marginLeft:30,
    overflow:"auto",

  },
  connected:{
    borderRadius:50,
    backgroundColor:'green',
    padding:4,
    marginLeft:15
  },

  send:{
    textAlign:'center',
    marginTop:150,
    fontFamily:'Poppins',
    marginBottom:-150
    
  }

  
   
  
}));

export default function CustomizedInputBase() {
  const classes = useStyles();
  const [name,setname]=useState('');
  const id="wassim";
  const [clicked,setEnterMessage]=useState(true)
  
  
  
  const dat=[
      {firstName:'saber'
      ,lastName:"mrabet",
      connected:false
      
      },
      {firstName:'hiba',
      connected:true
    },
      {firstName:'hiba',
      connected:true
    },


    ];
    const messages=[
      {id:"saber",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.Ullamco fugiat ad aliqua aliquip ipsum. Qui quis esse consectetur cupidatat deserunt eu dolor tempor. Culpa voluptate Lorem pariatur sint esse velit exercitation velit exercitation eiusmod. Adipisicing officia ullamco cillum cupidatat tempor. Ex reprehenderit dolor reprehenderit cupidatat sit cillum aliqua ad. Id aliqua laborum aliquip cupidatat esse ullamco exercitation magna Lorem labore.",
       time:"15:22",
       to:"wassim" 
    },
      {id:"wassim",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.",
       time:"15:22",
       to:"saber" 
    },
      {id:"hiba",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.",
       time:"15:22",
       to:"wassim" 
    },
      {id:"wassim",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.",
       time:"15:22",
       to:"hiba" 
    },
      {id:"saber",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.",
       time:"15:22",
       to:"hiba" 
    },
      {id:"hiba",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.",
       time:"15:22",
       to:"saber" 
    },
      {id:"wassim",
       message:"Id non proident amet commodo eiusmod reprehenderit culpa non.",
       time:"15:22",
       to:"saber" 
    },
  ]


  return (
  <div>
      <Navbar></Navbar>
    <div className={classes.root}>

        <Paper className={classes.paperRoot}>
              <h1>chats</h1>
              <Divider className={classes.divider} orientation="horizontal"  />
                  <Paper component="form" className={classes.searchRoot}>
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                  </IconButton>
                  
                  <InputBase
                      className={classes.input}
                      placeholder="Search Google Maps"
                      inputProps={{ 'aria-label': 'search google maps' }}
                  />
                  
                  
                  </Paper>
              
          {
              
              dat.map((data,index)=>{
                return <div key={index} className={classes.person} >
                          
                          <Button className={classes.Button} onClick={()=>{setEnterMessage();setname(data.firstName)}}>
                          <Avatar aria-label="recipe" className={classes.avatar}>
                            {data.firstName[0]}
                          </Avatar>
                          <p>{data.firstName}</p>
                            <div className={clsx(null,{[classes.connected]:data.connected})} ></div>

                          </Button>
                          
                        </div>
            
              })
          }
         
          </Paper>



          <Paper className={classes.paperRoot}>
            
            {clicked?<div className={classes.send}>

              <SendIcon></SendIcon>
              <h3>Your messages</h3>
              <p>send private messages and picture to freind or to a group </p>
              <Button variant="contained" color="primary">send a Maessage</Button>
            </div>
            
            
            :<div>
              <div className={classes.person}>
                <Avatar aria-label="recipe" className={classes.avatar}>
                  {name[0]}
                </Avatar>
                <p>{name}</p>
              </div>
              <Divider className={classes.divider} orientation="horizontal"  />
            </div>}
            <div className={classes.messagesRoot}>
              {
                messages.map((data,index)=>{
                  if(id==data.id&&data.to==name){
                      

                    return <div key={index} className={classes.myMessage}>
                    
                      <p>{data.message}</p>
                      <br/>
                    </div>
                    }
                  else if(data.id==name&&data.to==id){
                    return<div key={index} className={classes.messageRoot}>
                            <Avatar aria-label="recipe" className={classes.avatar}>
                              {name[0]}
                            </Avatar>
                            <p className={classes.message}>{data.message}</p>
                            <br/>
                          </div>
                  }
            
                })
              }

            </div>
            
            {clicked?null:
            <Paper  className={classes.messagesInput} elevation={3} >
        
              <InputBase
              className={classes.input}
              placeholder="Search Google Maps"    
              inputProps={{ 'aria-label': 'search google maps' }}
              />
            
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton  className={classes.iconButton} aria-label="directions">
              <SendIcon   />
              </IconButton>
              <IconButton  className={classes.iconButton} aria-label="directions">
              <ImageIcon/>
              </IconButton>
            </Paper> }
        </Paper>
</div>

  </div>
  );
}
