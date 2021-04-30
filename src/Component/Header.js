import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, Typography, Button, IconButton, AppBar } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
import List from  '@material-ui/icons/List';
import Gridon from  '@material-ui/icons/GridOn';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom:'2rem'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


function Header(props) {
    const classes = useStyles();
    const {gridHandler,gridStatus,addRecipeHandler} = props;
    return (
        <div className={classes.root}>
            <AppBar color='secondary'  position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <span>🥄</span>
                    लाजवाबFood
                    <span>🍴</span>
          </Typography>
                    <IconButton 
                    edge="start" 
                    className={classes.menuButton} 
                    color="inherit" 
                    aria-label="menu"
                    onClick={gridHandler}
                    >
                        {gridStatus ? <Gridon /> : <List  /> }
                        {/* <List  />
                        <Gridon /> */}
                    </IconButton>
                    <Button 
                    color="inherit"
                    onClick={addRecipeHandler}
                    >ADD RECIPE </Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
