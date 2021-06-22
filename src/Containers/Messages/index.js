import React,{useState,useEffect} from 'react';
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
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux'

import { getRealtimeuser,updateMessage,  getRealTimeConversation, addMessage } from '../../Actions';

const User =(props)=>{
  const {user,onClick}=props
  const classes=useStyles()
  
  return(
    <Button onClick={()=>onClick(user)} className={classes.person}>
        <Avatar aria-label="recipe" >
                {user?user.firstName[0]:null}
            </Avatar>
           <p> {user?user.firstName:null }  {user?user.lastName:null}</p>
            <br/>
    </Button>
 
    
  )
}



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
    
    
    borderRadius:40,
    marginBottom:-15,
    width:200,
    marginLeft:100
  },
  message:{
    float:'left',
   
    
    
    padding:10,
    width:200,
    marginRight:100,
  },
  messageRoot:{
   
    overflow:"auto",
    height: 340,
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
  const [messsage , setMessage]=useState('')
  const classes = useStyles();
  const [name,setname]=useState('');
  
  const [clicked,setEnterMessage]=useState(true)
  const auth =useSelector(state=>state.auth);
  const user =useSelector(state=>state.user)
  
  const [chatStarted, setChatStarted] = useState(false);
  const [chatUser, setChatUser] = useState('');
  const [userUid,setUserUid]=useState(null);
  const [search,setSearch]=useState('')
  let unsubscribe;
    const dispatch = useDispatch()
    useEffect(()=>{ 
      unsubscribe= dispatch(getRealtimeuser(auth.uid))
       .then(unsubscribe => {
         return unsubscribe
         
       })
       .catch(error=>{
         console.log(error);
         
       })

       
       
       
    
     },[])
    const initChat=(user)=>{
      setEnterMessage();
      setname(user.firstName)
  setChatStarted(true)
 
  setUserUid(user.uid)
    
  console.log(user);
  dispatch(getRealTimeConversation({uid_1:auth.uid,uid_2:user.uid}) )



  }
  
  const submitMessage=(e)=>{
    e.preventDefault()
    const msgobj={
      user_uid_1:auth.uid,
      user_uid_2:userUid,
      messsage
    }
    if(messsage!== ''){
      dispatch(updateMessage(msgobj))
      .then(()=>{
        setMessage('')
      })
    }

    console.log(msgobj)
    
    
  }
  
  const users=user.users
  
  const[Susers,setSusers]=React.useState(null)
  
  const filter=(e)=>{
     
      setSusers(users.map(user=>{
        if(user.firstName.includes(e.target.value))
          return user
        
        
      }))
     
  }
        


  return (
  <div>
    
      <Navbar></Navbar>
    <div className={classes.root}>

        <Paper className={classes.paperRoot}>
              <h1>chats</h1>
              <Divider className={classes.divider} orientation="horizontal"  />
                  <Paper component="form" onSubmit={e=>e.preventDefault()} className={classes.searchRoot}>
                  <IconButton type="submit" className={classes.iconButton} aria-label="search">
                      <SearchIcon />
                  </IconButton>
                  
                  <InputBase
                  
                      onChange={(e)=>{setSearch(e.target.value) ;filter(e)}}
                    
                      className={classes.input}
                      placeholder=""
                      inputProps={{ 'aria-label': 'search google maps' }}
                      value={search}
                     
                  />
                   
                  
                  </Paper>
              
                  <div className="listOfUsers">
<div className={classes.messageRoot}>
  {

Susers?Susers.map((user,index)=>{
  return(
    user?
   <User key={index} user={user} onClick={initChat} />:null
  )
}):users.map((user,index)=>{
  return(
    user?
   <User key={index} user={user} onClick={initChat} />:null
  )
})



/** 
  user.users.length > 0? 
  user.users.map((user)=>{
    return(
   
      <User
      onClick={initChat}
      key={user.uid} user={user}> </User>
  )}):null
    */}</div>


  
          
          
</div>
         
          </Paper>



          <Paper  className={classes.paperRoot}>
            
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
                
                 user.conversations.map((data,index)=>{
                   
                  if(userUid==data.user_uid_2&&data.user_uid_1==auth.uid){
                      

                    return <p className={classes.myMessage} style={{ backgroundColor:"#eee",borderRadius:40,}}>{data.messsage}</p>
                    
                    }
                  else if(data.user_uid_2==auth.uid&&data.user_uid_1==userUid){
                    return<div key={index}className={classes.message} >
                            <Avatar aria-label="recipe" className={classes.avatar}>
                              {name[0]}
                            </Avatar>
                            <p style={{ backgroundColor:"#eee",borderRadius:40,}} >{data.messsage}</p>
                            
                          </div>
                  }
            
                })
              }

            </div>
            
            {clicked?null:
            <Paper component='form'  onSubmit={(e)=> submitMessage(e)} className={classes.messagesInput} elevation={3} >
        
              <InputBase
              onChange={(e)=>setMessage(e.target.value)}
              className={classes.input}
              
              inputProps={{ 'aria-label': 'search google maps' }}
              value={messsage}
              />
            
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton onClick={submitMessage} className={classes.iconButton} aria-label="directions">
              <SendIcon   />
              </IconButton>
              
            </Paper> }
        </Paper>
</div>

  </div>
  );
}
