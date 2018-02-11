import React, {Component} from 'react';
import './browse-recipes.css';
import SearchForm from './components/search-form';
import RecipeList from './components/recipe-list';
import LoadingPopup from './components/loading';

class BrowseRecipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
    };

  }

  toggleLoadingStatus() {
    this.setState({
      loading: !this.state.loading
    });
  }

  render() {
    return (
      <div className="browse-container">
      		<section className="recipe-search-form-container row">
      			<SearchForm onChange={value => this.setState({searchQuery: value})} />
      		</section>
      		<section className="recipes-main-container row">
      			<div className="recipes-header col-12">
      				<h2>Recipes</h2>
      			</div>
      			 <RecipeList 
              query={this.state.searchQuery}
              authToken={this.props.authToken}
              currentUser={this.props.currentUser}
              manage={false}
              toggleSignup={this.props.toggleSignup} />
      		</section>
          {this.state.loading ? 
            <LoadingPopup />
            : null}
      </div>
    );
  }
}

export default BrowseRecipes;