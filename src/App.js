import React, { Component } from 'react';
import Search from './components/Search';
import PokemonList from './components/PokemonList';

class App extends Component {
  constructor(props){
    super(props);
    this.numberOfPokemon = 20;

    this.state = {
      pokemons: [],
      filter: ''
    };
  }

  async componentDidMount() {
    this.getPokemons(1, this.numberOfPokemon + 1);
  }

  handleFilterChange = query => {
    this.setState({
      filter: query
    });
  }

  filterPokemon(){
    return this.state.pokemons.filter(
      pokemon => pokemon.name.includes(this.state.filter)
    );
  }

  getPokemons = async (start, end) => {
    for (let index = start; index < end; index++) {
      const baseURL = 'http://pokeapi.co/api/v2/';
      const pokemonURL = num => `${baseURL}pokemon/${num}/`;

      const response = await fetch(pokemonURL(index));
      const pokemon = await response.json();

      const {
        name,
        sprites: {front_default: image},
        types: [{type: {name: type}}]
      } = pokemon;

      this.setState({
        pokemons: [...this.state.pokemons, { ...pokemon, name, image, type }]
      });
    }
  }

  getMorePokemons = () => {
    const start = this.state.pokemons.length + 1;
    const end = this.numberOfPokemon + this.state.pokemons.length + 1;

    this.getPokemons(start, end);
  }

  render() {
    return (
      <div>
        <Search onFilterChange={this.handleFilterChange} />
        <PokemonList pokemons={this.filterPokemon()} />
        <button onClick={() => this.getMorePokemons()}>More Pokemons</button>
      </div>
    );
  }
}

export default App;
