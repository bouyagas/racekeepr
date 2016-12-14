import React, { Component } from 'react';
import './SearchForm.css';


class SearchForm extends Component {

  render(){
    return (
      <div id='add-race-container'>
        <input
          type="text"
          placeholder="Race Name"
          value={this.props.raceName}
          onChange={this.props.updateRaceName}
        />
        <input
          type="date"
          placeholder="Race Date"
          value={this.props.raceDate}
          onChange={this.props.updateRaceDate}
        />
        <input
          type="text"
          placeholder="Location"
          value={this.props.raceLocation}
          onChange={this.props.updateRaceLocation}
        />
        <input
          type="text"
          placeholder="Distance"
          value={this.props.raceDistance}
          onChange={this.props.updateRaceDistance}
        />
        <button onClick={this.props.handleFormSubmit}>
          add race
        </button>
      </div>
    );
  }
}

export default SearchForm;
