import React, { Component } from 'react';
import Header from './components/Header/Header.jsx';
import SearchForm from './components/SearchForm/SearchForm.jsx';
import Footer from './components/Footer/Footer.jsx';
import SearchList from './components/SearchList/SearchList.jsx';
// import SearchListItem from './components/SearchListItem/SearchListItem.jsx';
// import SavedList from './components/SavedList/SavedList.jsx';
import InterestList from './components/InterestList/InterestList.jsx';
import CompletedList from './components/CompletedList/CompletedList.jsx';
import Calendar from './components/Calendar/Calendar.jsx';
import './App.css';

  class App extends Component {
  constructor() {
    super();

    this.state = {
      races: [],
      savedraces: [],
      raceName: '',
      raceDate: '',
      raceLocation: '',
      raceDistance: '',
      racePicURL: '',
      notes: '',
      calendar: '',
      completed: '',
      selectedRace: ''
    };
  }

  // get all races to choose from in db

  getAllRaces() {
    fetch(`/api/races`)
    .then(r => r.json())
    .then((data) => {
      this.setState({
        races: data
      });
      console.log(this.state);
    })
    .catch(err => console.log(err));
  }

// get all saved races
  getSavedRaces() {
    console.log('displaying saved')
    fetch(`/api/races/saved`)
    .then(r => r.json())
    .then((saved) => {
      // console.log(saved)
      this.setState({
        savedraces: saved
      });
      console.log(this.state);
    })
    .catch(err => console.log(err));
  }

  // matching the id of the races in index w. selected
  changeSelection(id) {
    const index = id - 1;
    this.setState({
      selected: this.state.races[index],
    });
  }

  // Collect the information from a specific race in the races list
  // Then send it to the saveRace function.
  formHandler() {
    console.log('form');
    const formData = {
        name: this.state.selected.name,
        race_date: this.state.selected.race_date,
        location: this.state.selected.location,
        distance: this.state.selected.distance,
        url: this.state.selected.url
    };
    this.saveRace(formData);
  }

  componentDidUpdate(prevProps,PrevState) {
  if (PrevState.selected != this.state.selected) {
    this.formHandler();
    }
  }

  // Save race to DB then getSavedRaces to reset the state of saved and update the savedList
  saveRace(formInfo) {
    console.log('save race');
    fetch('/api/races', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(formInfo),
    })

    .then(this.getSavedRaces());
  }

// delete race out of the main db
  handleDeleteRace(id) {
    fetch(`/api/races/${id}`, {
      method: 'delete'
    })
    .then(() => {
      let races = this.state.races.filter((race) => {
        return race.id !== id;
      });
      this.setState({ races });
    })
    .catch(err => console.log(err));
  }

  // delete a saved race from your calendar
  handleDeleteSavedRace(id) {
    fetch(`/api/races/saved/${id}`, {
      method: 'delete'
    })
    .then(() => {
      let savedraces = this.state.savedraces.filter((race) => {
        return race.id !== id;
      });
      this.setState({ savedraces });
    })
    .catch(err => console.log(err));
  }

  // updating the state as the user is writing in these form fields

  updateRaceName(e) {
    this.setState({
      raceName: e.target.value,
    });
  }

  updateRaceDate(e) {
    this.setState({
      raceDate: e.target.value,
    });
  }

  updateRaceLocation(e) {
    this.setState({
      raceLocation: e.target.value,
    });
  }

  updateRaceDistance(e) {
    this.setState({
      raceDistance: e.target.value,
    });
  }

  updateRacePicURL(e) {
    this.setState({
      racePicURL: e.target.value,
    });
  }

  updateNotes(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  // function to edit the race and add some notes
  modifyRace(updatedData) {
    fetch(`/api/races/saved`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'put',
      body: JSON.stringify(updatedData),
    })
    .then(this.getSavedRaces())
    .catch(err => console.log(err));
  }

   // Grab the state notes as well as the id and update the item in the db
  updateNotesForm(id) {
    const updatedData = {
      id: id,
      notes: this.state.notes,
    };
    this.modifyRace(updatedData);
    console.log(updatedData)
    this.setState({
      notes: '',
    });
  }

  // function to handle the submission of manually adding a race to your race calendar
  handleFormSubmit() {
    fetch('/api/races', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        name: this.state.raceName,
        race_date: this.state.raceDate,
        location: this.state.raceLocation,
        distance: this.state.raceDistance,
        url: this.state.racePicURL
      })
    })
    .then(this.getSavedRaces())
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Lato|Molle:400i" rel="stylesheet" />
        <Header
        />
        <SearchForm
        raceName={this.state.raceName}
        raceDate={this.state.raceDate}
        raceLocation={this.state.raceLocation}
        raceDistance={this.state.raceDistance}
        racePicURL={this.state.racePicURL}
        updateRaceName={event =>this.updateRaceName(event)}
        updateRaceDate={event => this.updateRaceDate(event)}
        updateRaceLocation={event => this.updateRaceLocation(event)}
        updateRaceDistance={event => this.updateRaceDistance(event)}
        updateRacePicURL={event => this.updateRacePicURL(event)}
        handleFormSubmit={() => this.handleFormSubmit()}
        />
        <SearchList
        races={this.state.races}
        getAllRaces={this.getAllRaces.bind(this)}
        handleDeleteRace={this.handleDeleteRace.bind(this)}
        changeSelection={this.changeSelection.bind(this)}
        />
        <Calendar
        savedraces={this.state.savedraces}
        notes={this.state.notes}
        updateNotes={this.updateNotes.bind(this)}
        updateNotesForm={this.updateNotesForm.bind(this)}
        getSavedRaces={this.getSavedRaces.bind(this)}
        handleDeleteSavedRace={this.handleDeleteSavedRace.bind(this)}
        />
        <CompletedList
        />
        <Footer
        />
      </div>
    );
  }
}

export default App;
