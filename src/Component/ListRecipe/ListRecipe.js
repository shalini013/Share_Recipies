import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
      padding:'10px 1.5rem'
    },
    imgSpace:{
      marginRight:'1rem'
    }
  }));

function ListRecipe(props) {
    const classes = useStyles();
    const {info,recipe} = props;
    return (
        <div className={classes.button}>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={info}
                title={recipe.description}
            >
                <img className={classes.imgSpace} height={30} src={recipe.image} alt='' />
                {recipe.dish}
      </Button>
        </div>
    )
}

export default ListRecipe;
