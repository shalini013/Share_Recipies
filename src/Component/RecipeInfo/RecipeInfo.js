import React, {useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent, CardMedia, Typography, Button, Paper } from '@material-ui/core';
import { activatedRecipe } from '../../App';
import AddRecipe from '../AddRecipe/AddRecipe'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '300px'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%'

  },
  cover: {
    width: '50%',
  },
  space: {
    textAlign: 'right',
    marginTop: '1rem'
  },
  btn: {
    marginRight: '1rem'
  },
  color: {
    backgroundColor: 'rgba(245, 0, 87,0.05)',
    // marginTop: '1rem'
  },
  btn1: {
    marginTop: '1rem',
    padding: '1rem'

  },
  btn11: {
    marginLeft: '1rem',
    marginBottom: '0.3rem',
  },
  onEdit:{
    padding:'1rem',
    alignItems:'center',
    display:'flex',flexDirection:'column'
    
  }
}));

function RecipeInfo(props) {
  const classes = useStyles();
  let initialState ={isRecipeInfo:false}
  const [state, setstate] = useState(initialState)
  const { backHome, onDelete,fetchRecipe,back } = props;


  const recipe = useContext(activatedRecipe)
  const { dish, chef, Date, description, image, ingredientArray } = recipe;

  const varientArray = ['contained', 'outlined', 'text'];
  const colorArray = ['primary', 'secondary', 'default'];
  const randomIndex = () => Math.floor(Math.random() * 3)

  const ingredientBadge = ingredientArray.map((ingredient) =>
    <Button
      key={ingredient} 
      className={classes.btn11}
      variant={varientArray[randomIndex()]}
      color={colorArray[randomIndex()]}
    >
      {ingredient}
    </Button>
  )
  const onRecipeInfoEdit=()=>{
    setstate(prevState=>({isRecipeInfo:true}))
  }

  let infoContent = '';
  if (state.isRecipeInfo) infoContent = (<div className={classes.onEdit}>
     <Typography component="h5" variant="h5">Edit Recipe Info</Typography>
     <br/>
    <AddRecipe 
    back={back}
    fetchRecipe={fetchRecipe} />
  </div>)
  else infoContent = (
    <CardContent className={classes.content}>
      <Typography component="h4" variant="h4">{dish}</Typography>
      <Typography variant="subtitle1" color="textSecondary">{chef}</Typography>
      <Typography variant="subtitle2" color="textSecondary">{Date}</Typography>
      <br />
      <Typography variant="body1" color="textSecondary">{description}</Typography>
      <br />
      <Paper className={classes.color} elevation={3}>
        <Typography component="h5" variant="h5">🥘 Ingredient</Typography>
        <div className={classes.btn1}>
          {ingredientBadge}
        </div>

      </Paper>
      <div className={classes.space}>
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          onClick={onRecipeInfoEdit}
        >
          Edit
</Button>
        <Button 
        variant="contained" 
        color="secondary" 
        className={classes.btn}
        onClick={()=>onDelete(Date)}>
          Delete
</Button>
        <Button
          variant="contained"
          className={classes.btn}
          onClick={backHome}
        >Home</Button>
      </div>



    </CardContent>
  )

  return (
    <Paper elevation={3} className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={image}
        title={"Live from space album cover"}
      />
      <div className={classes.details}>
          {infoContent}
      </div>

    </Paper>
  );
}

export default RecipeInfo;
