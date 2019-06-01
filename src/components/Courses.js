import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';


class Courses extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            fetchDone : false,
            expanded: false,
            }
    }
    componentDidMount() {
		fetch('http://localhost:50414/Course/')
  		.then(function(response) {
    			return response.json();
  			}).then(data => {
				var obj = JSON.parse(data)
                this.setState({courses:obj, fetchDone:"true"})
                
                });
		}

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };    

    render(){
        var cardStyle = {
            display: 'block',
            width: '25vw',
            transitionDuration: '0.3s',
            height: '20vw',
            margin: '20px'
        }
        var CardOpenedStyle = {
            display: 'block',
            width: '25vw',
            transitionDuration: '0.3s',
            height: '35vw',
            margin: '20px'
        }        
        return(
            <div>
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"            >

            {
                
                this.state.fetchDone === "true"&&
                this.state.courses.map((course, index) => {
                    return(
                        <div>
                            <Card style = {cardStyle} id="card">
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="Recipe">
                                        R
                                         </Avatar>
                                    }
                                    action={
                                        <IconButton>
                                        <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={course.name}
                                    subheader={course.teacherName}
                                    />
                                    <CardMedia
                                    image="/static/images/cards/paella.jpg"
                                    title="Paella dish"
                                    />
                                    <CardContent>
                                    <Typography component="p">
                                    {course.details}
                                    </Typography>
                                    </CardContent>
                                    <CardActions disableActionSpacing>
                                    <IconButton aria-label="Add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="Share">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={this.handleExpandClick}
                                        aria-expanded={this.state.expanded}
                                        aria-label="Show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                    </CardActions>
                                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Method:</Typography>
                                        <Typography paragraph>
                                        Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                        minutes.
                                        </Typography>
                                        <Typography paragraph>
                                        Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                        heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                        browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving
                                        chicken and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion,
                                        salt and pepper, and cook, stirring often until thickened and fragrant, about 10
                                        minutes. Add saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                        </Typography>
                                        <Typography paragraph>
                                        Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                        without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat
                                        to medium-low, add reserved shrimp and mussels, tucking them down into the rice, and
                                        cook again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                        minutes more. (Discard any mussels that don’t open.)
                                        </Typography>
                                        <Typography>
                                        Set aside off of the heat to let rest for 10 minutes, and then serve.
                                        </Typography>
                                    </CardContent>
                                    </Collapse>
                                </Card>
                        </div>
                    )

                    }
                )

            }
            </Grid>
            </div>
            )}
}
export default Courses;
