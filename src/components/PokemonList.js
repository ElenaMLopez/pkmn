import React, { Component } from 'react';
import PokemonCard from './PokemonCard';

class PokemonList extends Component {

  render() {
    return (
      <ul>
        {this.props.pokemons.map(pokemon =>
          <li key={pokemon.id}><PokemonCard {...pokemon} /></li>
        )}
      </ul>
    );
  }
}

export default PokemonList;
