import React, {Component} from 'react';
import './landing.css';

class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
            <section className="landing-background-section-container row">
                  <div className="logo-container col-12">
      			<img className="logo" src="https://sunrisehouse.com/wp-content/uploads/2016/12/alcoholic-drinks.jpg" alt="various alcoholic beverages" />
      		</div>
      	</section>

            <section className="create-recipe-info row">
                  <div className="col-6">
                        <h2>Create</h2>
                        <p>
                              Share your favorite drink recipes and
                              create new ones! An intuitive interface
                              allows you to calculate final ABV of
                              your mixed beverages and fine tune them
                              to your liking.    
                        </p>
      		</div>

      		<div className="col-6">
                        <img className="logo" src="https://sunrisehouse.com/wp-content/uploads/2016/12/alcoholic-drinks.jpg" alt="various alcoholic beverages" />
      		</div>
      	</section>

      	<section className="browse-recipes-info row">
      		<div className="col-6">
                        <img className="logo" src="https://sunrisehouse.com/wp-content/uploads/2016/12/alcoholic-drinks.jpg" alt="various alcoholic beverages" />
      		</div>

      		<div className="col-6">
                        <h2>Discover</h2>
                        <p>
                              Discover recipes made by others. Try
                              something new that you think you might
                              like!
                        </p>
      		</div>
      	</section>

      	<section className="rate-recipes-info row">
      		<div className="col-6">
                        <h2>Critique</h2>
                        <p>
                              Give feedback on other's recipes and
                              receive feedback on your own. 
                        </p>
      		</div>

      		<div className="col-6">
                        <img className="logo" src="https://sunrisehouse.com/wp-content/uploads/2016/12/alcoholic-drinks.jpg" alt="various alcoholic beverages" />
      		</div>
      	</section>

      	<section className="signup-container row">
      		<form className="col-12">
      		signup form
      		</form>
      	</section>
      </div>
    );
  }
}

export default Landing;