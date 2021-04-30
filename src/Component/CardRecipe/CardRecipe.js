import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Button, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import More from '@material-ui/icons/More'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 300,
        marginBottom:'2rem',
        marginLeft:'1rem'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    button:{
        marginLeft:'auto'
    }
}));

function CardRecipe(props) {
    const classes = useStyles();
    const {info,recipe} = props

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {recipe.chef.substring(0,1).toUpperCase()}
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/*  <MoreVertIcon /> */}
                    </IconButton>
                }
                title={recipe.dish}
                subheader={recipe.Date}
            />
            <CardMedia
                className={classes.media}
                image={recipe.image}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {recipe.description}
        </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button
                    // variant="text" 
                    color="secondary"
                    className={classes.button}
                    startIcon={<More/>}
                    onClick={info}
                >
                    Recipe
      </Button>
            </CardActions>

        </Card>
    );
}

export default CardRecipe;
