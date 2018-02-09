import React, {Component} from 'react';
import './main.css';
import {API_BASE_URL} from '../config.js';
import LoadingPopup from './components/loading';
import ReactStars from 'react-stars';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeData: [],
      loading: false,
      userRecipes: [],
      recipesCreated: null,
      averageUserRecipeRating: null,
      averageUserRecipeABV: null
    }
  }

  componentWillMount() {
      this.fetchRecipeDatabase();
    }

  fetchRecipeDatabase() {
    this.toggleLoadingStatus();
    return fetch(`${API_BASE_URL}/recipes`, {
              method: 'GET',
                headers: {
                  Authorization: `Bearer ${this.props.authToken}`
                }
            })
            .then((res) => {
              return res.json();
            })
            .then((recipeData) => {
              this.setState({
                "recipeData": recipeData
              });
              return recipeData;
            })
            .then((recipeData) => {
              this.getRecipesCreated();
              let recipesCreated = this.state.userRecipes.length;
              let averageUserRecipeRating = this.getAverageUserRecipeRating();
              let averageUserRecipeABV = this.getAverageUserRecipeABV();
              this.setState({
                recipesCreated: recipesCreated,
                averageUserRecipeRating: averageUserRecipeRating,
                averageUserRecipeABV: averageUserRecipeABV
              })
              return this.toggleLoadingStatus();
            })
            .catch(err => {
              this.toggleLoadingStatus();
              alert(err);
            });
    }

  toggleLoadingStatus() {
    this.setState({
      loading: !this.state.loading
    });
  }

  getRecipesCreated() {
    let recipes = this.state.recipeData
    .filter((recipe) => this.checkUsernameEquality(this.props.currentUser,recipe.recipeCreator))
    return this.setState({
      userRecipes: recipes
    });
  }

  checkUsernameEquality(searchQuery,recipeCreator) {
    const queryString = searchQuery;
    const recipeCreatorLowerCase = recipeCreator.toLowerCase();
    if (queryString !== recipeCreatorLowerCase) {
        return false;
    }
    return true;
  }

  getAverageUserRecipeRating() {
    let runningTotal = 0;
    let runningRatedRecipes = 0;
    let runningRecipeTotal = 0;
    let runningRecipeRatings = 0;
    let individualRecipeAverage = 0;
    let totalRecipeAverage = 0;
    for (let i = 0; i < this.state.userRecipes.length; i++) {
      if (this.state.userRecipes[i].userRatings.length >= 1) {
        for (let j = 0; j < this.state.userRecipes[i].userRatings.length; j++) {
          runningRecipeTotal = runningRecipeTotal + this.state.userRecipes[i].userRatings[j].rating;
          runningRecipeRatings++
        }
      individualRecipeAverage = (runningRecipeTotal / runningRecipeRatings);
      runningTotal = runningTotal + individualRecipeAverage;
      runningRatedRecipes++
      }
      runningRecipeTotal = 0;
      runningRecipeRatings = 0;
    }
    totalRecipeAverage = (runningTotal / runningRatedRecipes).toFixed(2);
    return totalRecipeAverage;
  }

  getAverageUserRecipeABV() {
    let runningABVTotal = 0;
    let averageABV = 0;
    for (let i = 0; i < this.state.userRecipes.length; i++) {
      runningABVTotal = runningABVTotal + this.state.userRecipes[i].totalABV;
    }
    averageABV = (runningABVTotal / this.state.userRecipes.length).toFixed(2);
    return averageABV;
  }

  render() {
    return (
          <div className="dashboard-container">
            <section className="stats-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">My Stats</h2>
              </div>
      		  </section>

            <section className="stats-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">Create</h2>
              </div>
            </section>

      		  <section className="create-stats-section row">
              <div className="col-6">
                <span>*create section graphic*, pie chart with ratings or ABVs?</span>
              </div>
              <div className="col-6">
      				  <span>Recipes Created: </span>{this.state.recipesCreated}
      				  <br/>
      				  <span className="average-recipe-rating-label">Average Recipe Rating: </span>
                {isNaN(this.state.averageUserRecipeRating) ?
                  `No Recipes Rated` :
                  <div className="rating-stars-container">
                    <ReactStars 
                      className={"rating-stars"}
                      count={5}
                      value={this.state.averageUserRecipeRating}
                      color1={"black"}
                      color2={"red"}
                      size={25}
                      edit={false} 
                      half={true} />
                    <span className="average-recipe-rating-number">{this.state.averageUserRecipeRating}</span>
                  </div> }
                <br/>
                <span>Average Recipe ABV: </span>
                {isNaN(this.state.averageUserRecipeABV) ?
                  `No Recipes Created` :
                  `${this.state.averageUserRecipeABV}%`}
              </div>
      		  </section>

            <section className="stats-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">Discover / Critique (coming soon!)</h2>
              </div>
            </section>

      		  <section className="critique-stats-section row">
              <div className="col-6">
                <span>*critique section graphic</span>
              </div>
              <div className="col-6">
      				  <span>Recipes Rated: null</span>
      				  <br/>
      				  <span>Average Recipe Rating: null</span>
      				  <br/>
      				  <span>Average Given Rating: null</span>
                <br/>
                <span>Average Recipe ABV: null</span>
              </div>
      		  </section>
          {this.state.loading ? 
            <LoadingPopup />
            : null}
          </div>
    );
  }
}

export default Main;