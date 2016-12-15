import React from 'react';
import './SavedListItem.css';

const SavedListItem = props => (
  <div className="race-list-item">
    <p><span>race name:</span>  {`${props.name}`}</p>
    <p><span>date:</span>  {props.race_date.substring(0,10)}</p>
    <p><span>location:</span> {`${props.location}`}</p>
    <p><span>notes:</span> {`${props.notes}`}</p>
    <div className="modify-race">
      <input
        type="text"
        placeholder="enter notes"
        onChange={props.updateNotes}
      />
      <button className="notes" onClick={() => props.updateNotesForm(props.id)}>update notes</button>
    </div>
    <button className="delete" onClick={() => props.handleDeleteSavedRace(props.id)}>
     delete
    </button>
  </div>
  );

export default SavedListItem;
