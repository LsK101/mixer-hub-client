import React from 'react';
import './search-form.css';

function SearchForm(props) {
  return (
    <form onSubmit={e => e.preventDefault()}>
      <label htmlFor="search">Search</label>&emsp;
      <input type="search" id="search" name="search"
        onChange={e => props.onChange(e.target.value)} />
    </form>
  );
}

export default SearchForm;