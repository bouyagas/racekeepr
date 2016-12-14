import React, { Component } from 'react';
import SearchListItem from '../SearchListItem/SearchListItem';
import './SearchList.css';

class SearchList extends Component {

  componentWillMount() {
    this.props.getAllRaces();
  }

renderRaces() {
    return this.props.races.map((race, i) =>
      <SearchListItem
        key={i}
        name={race.name}
        race_date={race.race_date}
        location={race.location}
        distance={race.distance}
        url={race.url}
        id={race.id}
        handleDeleteRace={this.props.handleDeleteRace}
        changeSelection={this.props.changeSelection}
      />
    );
  }

  render(){
    return (
      <div id="results-container">
      <h3>search race database</h3>
        {this.renderRaces()}
      </div>
    );
  }
}

export default SearchList;
