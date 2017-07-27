import React, { Component } from 'react';

class PokemonCard extends Component {

  render() {
    return (
      <span className='card'>
        <p>{this.props.id}</p>
        <p>{this.props.name}</p>
        <p>Type {this.props.type}</p>
        <img src={this.props.image} alt={this.props.name} />
      </span>
    );
  }
}

export default PokemonCard;
