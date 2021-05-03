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
}));

 function RecipeReviewCard(props) {
   const data = props.data
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [commentaire,setCommentaire]=useState('')

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const comment = (e)=>{
      e.preventDefault()
     
  }

  return (
    <div ref={React.createRef()}>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data[0][0]}
          </Avatar>
        }
        
        title={data[0]}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="/images/firstPageImg.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
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
                R
            </Avatar>
          
            <InputBase
              className={classes.input}
              placeholder="Comment..."
              onChange={(e)=>{setCommentaire(e.target.value)}}
              value={commentaire}
              autoFocus={true}
            />
          </Paper>
         <Commentaire reply={<Commentaire/>} comment={data[2]}></Commentaire>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}
export default RecipeReviewCard;