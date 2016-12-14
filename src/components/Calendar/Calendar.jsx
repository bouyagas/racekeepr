import React, { Component } from 'react';
import SavedListItem from '../SavedListItem/SavedListItem';
import './Calendar.css';

class Calendar extends Component {
  componentWillMount() {
    this.props.getSavedRaces();
  }
renderSavedRaces() {

    return this.props.savedraces.map((race, i) =>
      <SavedListItem
        key={i}
        name={race.name}
        race_date={race.race_date}
        location={race.location}
        distance={race.distance}
        url={race.url}
        id={race.id}
        notes={race.notes}
        updateNotes={ e => this.props.updateNotes(e)}
        updateNotesForm={this.props.updateNotesForm}
        handleDeleteSavedRace={this.props.handleDeleteSavedRace}
      />
    );
  }

  render(){
    return (
      <div id="calendar-container">
      <h3>my race schedule</h3>
        {this.renderSavedRaces()}
      </div>
    );
  }
}

export default Calendar;
