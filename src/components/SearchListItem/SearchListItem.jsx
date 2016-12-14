import React from 'react';
import './SearchListItem.css';

const SearchListItem = props => (
  <div className="search-list-item">
    <p><span>race name:</span>  {`${props.name}`}</p>
    <p><span>date:</span>  {`${props.race_date.substring(0,10)}`}</p>
    <p><span>location:</span> {`${props.location}`}</p>
    <button className="save" onClick={() => props.changeSelection(props.id)}>add to schedule</button>
  </div>
  );

export default SearchListItem;
