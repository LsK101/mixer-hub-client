import React, {Component} from 'react';
import './landing.css';

class Landing extends Component {
  render() {
    return (
      <div class="landing-container">
      	<section class="landing-background-logo row">
      		<div class="col-12">
      			background photo
      		</div>
      	</section>

      	<section class="create-recipe-info row">
      		<div class="col-6">
      		create recipes info
      		</div>

      		<div class="col-6">
      		create recipe photo
      		</div>
      	</section>

      	<section class="browse-recipes-info row">
      		<div class="col-6">
      		browse recipe photo
      		</div>

      		<div class="col-6">
      		browse recipes info
      		</div>
      	</section>

      	<section class="rate-recipes-info row">
      		<div class="col-6">
      		rate recipe info
      		</div>

      		<div class="col-6">
      		rate recipe info
      		</div>
      	</section>

      	<section class="signup-container row">
      		<form class="col-12">
      		signup form
      		</form>
      	</section>
      </div>
    );
  }
}

export default Landing;