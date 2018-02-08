import React, {Component} from 'react';
import './loading.css';
import LoadingIndicator from '../../loading-indicator.gif';

class LoadingPopup extends Component {
  render() {
    return (
      <div className="loading-popup">
        <div className="loading-popup-inner">
            <img className="loading-indicator" src={LoadingIndicator} alt="loading indicator" />
        </div>
      </div>
    );
  }
}

export default LoadingPopup;