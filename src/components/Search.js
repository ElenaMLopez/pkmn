import React, { Component } from 'react';

class Search extends Component {

  handleChange = (event) => {
    this.props.onFilterChange(event.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="Search" onChange={this.handleChange} />
      </div>
    );
  }
}

export default Search;
