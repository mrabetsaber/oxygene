import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './style.css'
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ReplyIcon from '@material-ui/icons/Reply';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Avatar from '@material-ui/core/Avatar';
import { Collapse, makeStyles } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root2: {
        padding: '3px 3px',
        display: 'flex',
        marginTop:10,
        width: 400,
        backgroundColor:'#eee'
      },
      avatar: {
        backgroundColor: red[500] ,
        
      },
      input: {
        marginLeft: theme.spacing(1),
        
      },
}));


function Index(props) {
    const Comment=props.reply;
    const comment=props.comment
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    return (
        <div>
            <React.StrictMode>
            <Card className="Commentroot" variant="outlined">
                <CardContent>
                
        
                </CardContent>
                <CardActions>
                    <IconButton aria-label="like">
                        <ThumbUpIcon  />
                    </IconButton>
                    <IconButton onClick={handleExpandClick}>
                        <ReplyIcon fontSize="large"/>
                    </IconButton>
                    
                </CardActions>
    </Card>
    <Collapse in={expanded} unmountOnExit>
    <div className="reply">
    <Paper component="form"  className={classes.root2}>
      
      <Avatar aria-label="recipe" className={classes.avatar}>
          R
      </Avatar>
    
      <InputBase
        className={classes.input}
        placeholder="Reply..."
        autoFocus={true}
      />
    </Paper>
    
   
        {Comment}
    </div>
        </Collapse>
        </React.StrictMode>
        </div>
    )
}

export default Index
