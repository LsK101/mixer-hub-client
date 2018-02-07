import React, {Component} from 'react';
import './main.css';

class Main extends Component {
  render() {
    return (
          <div className="dashboard-container">
            <section className="stats-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">coming soon!</h2>
              </div>
            </section>

            <section className="stats-section-header row">
              <div className="col-12">
                <h2 className="dashboard-header">My Stats</h2>
              </div>
      		  </section>

      		  <section className="create-stats-section row">
              <div className="col-6">
      				  <h2>Create</h2>
      				  <span>Recipes Created: 0</span>
      				  <br/>
      				  <span>Average Recipe Rating: 5.0</span>
                <br/>
                <span>Average Recipe ABV: 40.00%</span>
              </div>
              <div className="col-6">
      				  <span>*create section graphic*, pie chart with ratings or ABVs?</span>
              </div>
      		  </section>

      		  <section className="critique-stats-section row">
              <div className="col-6">
      				  <h2>Discover / Critique</h2>
      				  <span>Recipes Rated: 0</span>
      				  <br/>
      				  <span>Average Recipe Rating: 5.0</span>
      				  <br/>
      				  <span>Average Given Rating: 5.0</span>
                <br/>
                <span>Average Recipe ABV: 5.0</span>
              </div>
              <div className="col-6">
      				  <span>*critique section graphic</span>
              </div>
      		  </section>
          </div>
    );
  }
}

export default Main;