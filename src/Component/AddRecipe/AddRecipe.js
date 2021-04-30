import React, { useContext, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { activatedRecipe } from '../../App'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginBottom: "1rem"
    },
    back: {
        marginRight: '1rem',
        padding: '10px'
    }
}));

function AddRecipe(props) {
    const classes = useStyles();
    const { back ,fetchRecipe} = props;
    const recipe = useContext(activatedRecipe);
    
    let initialState = {
        dish: '',
        chef: '',
        description: '',
        image: '',
        ingredient: '',
        onSaveRecipe: false
    }
    if(recipe.dish) {
         let ingredient = recipe.ingredientArray.join()
        initialState = { ...initialState, ...recipe ,ingredient}
    }
    const [state, setstate] = useState(initialState)

    const onRecipeChange = (event) => {
        setstate(prevState => ({ ...prevState, [event.target.name]: event.target.value }))
    }

    const onSubmitRecipeDetails = () => {
        /*  if (!(state.dish && state.chef && state.image && state.description && state.ingredient)) {
            alert('Fill Alll the Details Properly')
        }
        let imgURL = /http:|https:/
        if(!imgURL.test(state.image)) {
            return alert('image must be an URL')
        }  */
        setstate(prevState => ({ ...prevState, onSaveRecipe:true }))
        fetchRecipe(state);
    }


    return (
        <Grid container >
            <Grid item sm={2}></Grid>
            <Grid container item sm={8}>
                <TextField
                    className={classes.root}
                    label="Add Recipe"
                    type="text"
                    variant="outlined"
                    color='secondary'
                    name='dish'
                    value={state.dish}
                    onChange={onRecipeChange}
                />
                <TextField
                    className={classes.root}
                    label="Chef Name"
                    type="text"
                    /* autoComplete="current-password" */
                    variant="outlined"
                    color='secondary'
                    name='chef'
                    value={state.chef}
                    onChange={onRecipeChange}
                />
                <TextField
                    className={classes.root}
                    label="Recipe Ingredient"
                    type="text"
                    /* autoComplete="current-password" */
                    variant="outlined"
                    color='secondary'
                    name='ingredient'
                    value={state.ingredient}
                    onChange={onRecipeChange}
                />
                <TextField
                    className={classes.root}
                    label="Recipe img URL"
                    type="url"
                    /* autoComplete="current-password" */
                    variant="outlined"
                    color='secondary'
                    name='image'
                    value={state.image}
                    onChange={onRecipeChange}
                />
                <TextField
                    className={classes.root}
                    label="Recipe Description"
                    type="text"
                    /* autoComplete="current-password" */
                    variant="outlined"
                    color='secondary'
                    name='description'
                    value={state.description}
                    onChange={onRecipeChange}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.back}
                    onClick={onSubmitRecipeDetails}
                    
                >
                    Save Recipe
</Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.back}
                    onClick={back}
                >
                    Back
</Button>


            </Grid>
            <Grid item sm={2}></Grid>
        </Grid>
    )
}

export default AddRecipe;
