import React, {Component} from 'react';
import './main.css';
import {API_BASE_URL} from '../config.js';
import LoadingPopup from './components/loading';
import ReactStars from 'react-stars';
import DonutChart from 'react-svg-donut-chart';

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipeData: [],
      loading: false,
      userRecipes: [],
      recipesRated: [],
      recipesCreated: null,
      recipesCreatedAndRated: 0,
      averageUserRecipeRating: null,
      averageUserRecipeABV: null,
      ratedLessThanTwo: 0,
      ratedLessThanThree: 0,
      ratedLessThanFour: 0,
      ratedLessThanFive: 0,
      ratedFive: 0,
      givenOne: 0,
      givenTwo: 0,
      givenThree: 0,
      givenFour: 0,
      givenFive: 0,
      averageRatedRecipeRating: null,
      averageGivenRating: null,
      averageRatedRecipeABV: null
    }
  }

  componentWillMount() {
      this.fetchRecipeDatabase();
    }

  toggleLoadingStatus() {
    this.setState({
      loading: !this.state.loading
    });
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
              return this.getUserGivenRatings();
            })
            .catch(err => {
              this.toggleLoadingStatus();
              alert(err);
            });
  }

  getUserGivenRatings() {
    let recipesUserRated = this.state.recipeData
      .filter((recipe) => this.findUserInUserRatings(this.props.currentUser,recipe.userRatings));
    this.setState({
      recipesRated: recipesUserRated
    });
    return this.getCritiqueStats();
  }

  getCritiqueStats() {
    let averageRatedRecipeRating = this.getAverageRatedRecipeRating();
    this.setState({
      averageRatedRecipeRating: averageRatedRecipeRating
    });
    this.getAverageGivenRating();
    let averageRatedRecipeABV = this.getAverageRatedRecipeABV();
    this.setState({
      averageRatedRecipeABV: averageRatedRecipeABV
    });
    return this.toggleLoadingStatus();
  }

  getAverageRatedRecipeRating() {
    let runningTotal = 0;
    let runningRatedRecipes = 0;
    let runningRecipeTotal = 0;
    let runningRecipeRatings = 0;
    let individualRecipeAverage = 0;
    let totalRecipeAverage = 0;
    for (let i = 0; i < this.state.recipesRated.length; i++) {
      if (this.state.recipesRated[i].userRatings.length >= 1) {
        for (let j = 0; j < this.state.recipesRated[i].userRatings.length; j++) {
          runningRecipeTotal = runningRecipeTotal + this.state.recipesRated[i].userRatings[j].rating;
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

  getAverageGivenRating() {
    this.setState({
      givenOne: 0,
      givenTwo: 0,
      givenThree: 0,
      givenFour: 0,
      givenFive: 0,
      givenRatings: 0
    });
    for (let i = 0; i < this.state.recipesRated.length; i++) {
      let userRating = this.state.recipesRated[i].userRatings
        .find((array) => {
          return array.username === this.props.currentUser;
        })
        .rating;
      if (userRating === 1) {
        this.setState({
          givenOne: (this.state.givenOne + 1),
          givenRatings: (this.state.givenRatings + 1)
        });
      }
      if (userRating === 2) {
        this.setState({
          givenTwo: (this.state.givenTwo + 1),
          givenRatings: (this.state.givenRatings + 1)
        });
      }
      if (userRating === 3) {
        this.setState({
          givenThree: (this.state.givenThree + 1),
          givenRatings: (this.state.givenRatings + 1)
        });
      }
      if (userRating === 4) {
        this.setState({
          givenFour: (this.state.givenFour + 1),
          givenRatings: (this.state.givenRatings + 1)
        });
      }
      if (userRating === 5) {
        this.setState({
          givenFive: (this.state.givenFive + 1),
          givenRatings: (this.state.givenRatings + 1)
        });
      }
    }
    let averageGivenRating = (((this.state.givenOne * 1) + (this.state.givenTwo * 2) +
      (this.state.givenThree * 3) + (this.state.givenFour * 4) +
      (this.state.givenFive * 5)) / this.state.givenRatings).toFixed(2);
    this.setState({
      averageGivenRating: averageGivenRating
    });
    return;
  }

  getAverageRatedRecipeABV() {
    let runningABVTotal = 0;
    let averageABV = 0;
    for (let i = 0; i < this.state.recipesRated.length; i++) {
      runningABVTotal = runningABVTotal + this.state.recipesRated[i].totalABV;
    }
    averageABV = (runningABVTotal / this.state.recipesRated.length).toFixed(2);
    return averageABV;
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
    this.setState({
      ratedLessThanTwo: 0,
      ratedLessThanThree: 0,
      ratedLessThanFour: 0,
      ratedLessThanFive: 0,
      ratedFive: 0
    });
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
      this.countRecipeRatingsForPieChart(individualRecipeAverage);
      runningTotal = runningTotal + individualRecipeAverage;
      runningRatedRecipes++
      }
      runningRecipeTotal = 0;
      runningRecipeRatings = 0;
    }
    totalRecipeAverage = (runningTotal / runningRatedRecipes).toFixed(2);
    this.setState({
      recipesCreatedAndRated: runningRatedRecipes
    });
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

  findUserInUserRatings(currentUser,ratingsArray) {
    for (let i = 0; i < ratingsArray.length; i++) {
      if (ratingsArray[i].username === currentUser) {
        return true;
      }
    }
    return false;
  }

  countRecipeRatingsForPieChart(rating) {
    if (rating < 2) {
      return this.setState({
        ratedLessThanTwo: (this.state.ratedLessThanTwo + 1)
      });
    }
    if (rating < 3) {
      return this.setState({
        ratedLessThanThree: (this.state.ratedLessThanThree + 1)
      });
    }
    if (rating < 4) {
      return this.setState({
        ratedLessThanFour: (this.state.ratedLessThanFour + 1)
      });
    }
    if (rating < 5) {
      return this.setState({
        ratedLessThanFive: (this.state.ratedLessThanFive + 1)
      });
    }
    else {
      return this.setState({
        ratedFive: (this.state.ratedFive + 1)
      });
    }
  }

  render() {
    let createPieData = [
      {value: this.state.ratedLessThanTwo, stroke: '#CC1313', strokeWidth: 10},
      {value: this.state.ratedLessThanThree, stroke: '#CC7013', strokeWidth: 10},
      {value: this.state.ratedLessThanFour, stroke: '#CCCC13', strokeWidth: 10},
      {value: this.state.ratedLessThanFive, stroke: '#70CC13', strokeWidth: 10},
      {value: this.state.ratedFive, stroke: '#13CC70', strokeWidth: 10}
    ];
    let discoverPieData = [
      {value: this.state.givenOne, stroke: '#CC1313', strokeWidth: 10},
      {value: this.state.givenTwo, stroke: '#CC7013', strokeWidth: 10},
      {value: this.state.givenThree, stroke: '#CCCC13', strokeWidth: 10},
      {value: this.state.givenFour, stroke: '#70CC13', strokeWidth: 10},
      {value: this.state.givenFive, stroke: '#13CC70', strokeWidth: 10}
    ];
    const nullPie = [
      {value: 1, stroke: '#000000', strokeWidth: 10}
    ];
    return (
          <div className="dashboard-container">
            <section className="stats-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">My Stats</h2>
              </div>
      		  </section>

            <section className="create-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">Create</h2>
              </div>
            </section>

      		  <section className="create-stats-section row">
              <div className="pie-chart-section col-6">
                <div className="pie-chart-container">
                  <strong>Average Recipe Rating</strong>
                  {this.state.recipesCreatedAndRated >= 1 ?
                    <DonutChart
                      data={createPieData} /> :
                    <DonutChart
                      data={nullPie} />
                  }
                  <div className="pie-chart-key red">
                    <strong className="pie-chart-key-label">1.00 - 1.99</strong>
                  </div>
                  <div className="pie-chart-key orange">
                    <strong className="pie-chart-key-label">2.00 - 2.99</strong>
                  </div>
                  <div className="pie-chart-key yellow">
                    <strong className="pie-chart-key-label">3.00 - 3.99</strong>
                  </div>
                  <div className="pie-chart-key green">
                    <strong className="pie-chart-key-label">4.00 - 4.99</strong>
                  </div>
                  <div className="pie-chart-key blue">
                    <strong className="pie-chart-key-label">5.00</strong>
                  </div>
                </div>
              </div>
              <div className="create-stats-container col-6">
      				  <strong>Recipes Created: </strong>{this.state.recipesCreated}
      				  <br/>
      				  <strong className="average-recipe-rating-label">Average Recipe Rating:</strong>
                {isNaN(this.state.averageUserRecipeRating) ?
                  ` No Recipes Rated` :
                  <div className="rating-stars-container">
                    <ReactStars 
                      className={"rating-stars"}
                      count={5}
                      value={this.state.averageUserRecipeRating}
                      color1={"black"}
                      color2={"#CA0000"}
                      size={25}
                      edit={false} 
                      half={true} />
                    <span className="average-recipe-rating-number">{this.state.averageUserRecipeRating}</span>
                  </div> }
                <br/>
                <strong>Average Recipe ABV:</strong>
                {isNaN(this.state.averageUserRecipeABV) ?
                  ` No Recipes Created` :
                  ` ${this.state.averageUserRecipeABV}%`}
              </div>
      		  </section>

            <section className="discover-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">Discover and Critique</h2>
              </div>
            </section>

      		  <section className="critique-stats-section row">
              <div className="pie-chart-section col-6">
                <div className="pie-chart-container">
                  <strong>Ratings Given To Other Recipes</strong>
                  {this.state.recipesRated.length > 0 ?
                    <DonutChart
                      data={discoverPieData} /> :
                    <DonutChart
                      data={nullPie} />
                  }
                  <div className="pie-chart-key red">
                    <strong className="pie-chart-key-label">1</strong>
                  </div>
                  <div className="pie-chart-key orange">
                    <strong className="pie-chart-key-label">2</strong>
                  </div>
                  <div className="pie-chart-key yellow">
                    <strong className="pie-chart-key-label">3</strong>
                  </div>
                  <div className="pie-chart-key green">
                    <strong className="pie-chart-key-label">4</strong>
                  </div>
                  <div className="pie-chart-key blue">
                    <strong className="pie-chart-key-label">5</strong>
                  </div>
                </div>
              </div>
              <div className="col-6">
      				  <strong>Recipes Rated: </strong>{this.state.recipesRated.length}
      				  <br/>
      				  <strong className="average-recipe-rating-label">Average Recipe Rating:</strong>
                {isNaN(this.state.averageRatedRecipeRating) ?
                  ` No Recipes Rated` :
                  <div className="rating-stars-container">
                    <ReactStars 
                      className={"rating-stars"}
                      count={5}
                      value={this.state.averageRatedRecipeRating}
                      color1={"black"}
                      color2={"#CA0000"}
                      size={25}
                      edit={false} 
                      half={true} />
                    <span className="average-recipe-rating-number">{this.state.averageRatedRecipeRating}</span>
                  </div> }
      				  <br/>
      				  <strong>Average Given Rating:</strong>
                {isNaN(this.state.averageGivenRating) ?
                  ` No Recipes Rated` :
                  <div className="rating-stars-container">
                    <ReactStars 
                      className={"rating-stars"}
                      count={5}
                      value={this.state.averageGivenRating}
                      color1={"black"}
                      color2={"#CA0000"}
                      size={25}
                      edit={false} 
                      half={true} />
                    <span className="average-recipe-rating-number">{this.state.averageGivenRating}</span>
                  </div> }
                <br/>
                <strong>Average Recipe ABV:</strong>
                {isNaN(this.state.averageRatedRecipeABV) ?
                  ` No Recipes Rated` :
                  ` ${this.state.averageRatedRecipeABV}%`}
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

/*
                  <PieChart
                    slices={[
                      {
                        color: '#B30000',
                        value: this.state.givenOne
                      },
                      {
                        color: '#CC6600',
                        value: this.state.givenTwo
                      },
                      {
                        color: '#C1CC00',
                        value: this.state.givenThree
                      },
                      {
                        color: '#00CC0B',
                        value: this.state.givenFour
                      },
                      {
                        color: '#0080CC',
                        value: this.state.givenFive
                      }
                    ]} /> :
                    <PieChart slices={[{color: 'black', value: 1}]} />
                    */