import React, {Component} from 'react';
import './confirm-delete.css';

class ConfirmDelete extends Component {
  render() {
    return (
      <div className="confirm-delete-popup">
        <div className="confirm-delete-popup-inner">
        	<div className="confirmation-text-container">
            	<span className="confirmation-text">Are you sure you want to delete this?</span>
            </div>
            <div className="confirm-button-container">
            	<button className="confirm-button" onClick={this.props.delete}>Yes</button>
            	<button className="confirm-button" onClick={this.props.cancel}>No</button>
            </div>
        </div>
      </div>
    );
  }
}

export default ConfirmDelete;