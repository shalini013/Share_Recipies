import React, { Component, Fragment, createContext } from 'react';
import Header from './Component/Header';
import CardRecipe from './Component/CardRecipe/CardRecipe';
import { Grid, Typography } from '@material-ui/core';
import ListRecipe from './Component/ListRecipe/ListRecipe'
import AddRecipe from './Component/AddRecipe/AddRecipe'
import RecipeInfo from './Component/RecipeInfo/RecipeInfo'
import "./App.css"


export const activatedRecipe = createContext();

class App extends Component {

  state = {
    recipies: [
      {
        Date: new Date().toDateString(), dish: 'ginger tea', chef: 'shalini rajput', ingredientArray: ['tea leaves', 'milk', 'water',
          'chai masala'], description: ' and scrambled it  stress reliving perfect for cold cosey eveing in winter especially', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWludCUyMG1vaml0b3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        Date: 'march 13 20201 5:50pm', dish: 'lemon water', chef: 'pratush jain', ingredientArray: ['water', 'lemons', 'back salt',
          'sugar'], description: 'stress reliving perfect for cold cosey eveing in winter especially', image: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },

    ],
    isGrid: true,
    recipeIn: false,
    isRecipe: false,
    isActiveRecipe: ''
  }


  onGridHandler = () => {
    this.setState(prevState =>
      ({ isGrid: !prevState.isGrid, recipeIn: false, isActiveRecipe: '', isRecipe: false })

    )
  }

  onRecipeHandler = () => {
    this.setState(prevState => ({ isRecipe: !prevState.isRecipe, recipeIn: false, isActiveRecipe: " " }))
  }


  onReturn = () => {
    console.log('im clicked')
    this.setState(prevState => ({ isRecipe: false, recipeIn: false }))
  }
  isRecipeInfo = (recipe) => {
    this.setState(prevState => ({ recipeIn: !prevState.recipeIn, isActiveRecipe: recipe }))
  }
  onReturnHome = () => {
    this.setState(prevState => ({ recipeIn: !prevState.recipeIn }))

  }
  onDeleteActiveRecipe = (Date) => {
    const Recipies = this.state.recipies.filter(date => date.Date !== Date)
    this.setState({ recipies: Recipies, recipeIn: false })
  }
  onSaveRecipeInfo = (recipe) => {
    if (!recipe.Date) {
      recipe.Date = new Date().toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' }) + " " + new Date().toLocaleDateString();
      console.log(recipe.Date)
    }

    let ingredientArray = recipe.ingredient.split(',');
    delete recipe.ingredient;
    delete recipe.onSaveRecipeInfo;
    recipe.ingredientArray = ingredientArray

    let recipeIndex = this.state.recipies.findIndex(r => r.Date === recipe.Date)
    console.log(recipeIndex)

    let recipies = [...this.state.recipies]
    if (recipeIndex === -1) recipies.push(recipe);
    recipies[recipeIndex] = recipe;
    this.setState({ recipies: recipies,recipeIn:false })
    console.log(recipe)
  }

  render() {
    const { isRecipe, isGrid, recipeIn, recipies, isActiveRecipe } = this.state;

    let displayContent = '';
    if (isGrid) displayContent = recipies.map((recipe, index) => {
      return <CardRecipe
        key={index}
        recipe={recipe}
        info={this.isRecipeInfo.bind(this, recipe)} />
    })
    if (!isGrid) displayContent = recipies.map((recipe, index) => <ListRecipe
      key={index}
      recipe={recipe}
      info={this.isRecipeInfo.bind(this, recipe)}
    />)
    if (isRecipe) displayContent =
      <activatedRecipe.Provider value={isActiveRecipe}>
        <AddRecipe
          back={this.onReturn}
          fetchRecipe={(recipe) => this.onSaveRecipeInfo(recipe)}
        />
      </activatedRecipe.Provider>

    if (recipeIn) displayContent = <activatedRecipe.Provider value={isActiveRecipe}>
      <RecipeInfo
        back={this.onReturn}
        backHome={this.onReturnHome}
        onDelete={(Date) => this.onDeleteActiveRecipe(Date)}
        fetchRecipe={(recipe) => this.onSaveRecipeInfo(recipe)}

      />

    </activatedRecipe.Provider>
    //  <RecipeInfo  backHome={this.onReturnHome} onEdit={this.onEditCard} />


    return (
      <Fragment>
        <Header
          gridHandler={this.onGridHandler}
          gridStatus={this.state.isGrid}
          addRecipeHandler={this.onRecipeHandler}
        />
        <Grid container>
          <Grid item sm={1}></Grid>
          <Grid container item sm={10} className={this.state.isGrid ? 'grid' : 'list'}>
            {displayContent}
          </Grid>
          <Grid item sm={1}></Grid>
        </Grid>
        <Typography align='center' style={{ marginTop: '2rem' }}>Made with ❤️ in Rise&Shine</Typography>
      </Fragment>
    )
  }
}

export default App
