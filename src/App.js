import React, { Component } from 'react';
import Search from './components/Search';
import PokemonList from './components/PokemonList';

class App extends Component {
  constructor(props){
    super(props);
    const numberOfPokemon = 20;
    const pokemonsGroup = []
    for (var i = 1; i <= numberOfPokemon; i++) {
      var pokemon = {
          id:i,
          name:''
      }
      pokemonsGroup.push(pokemon);
    }

    this.state = {
      pokemons: pokemonsGroup,
      filter: ''
    };
  }

  componentDidMount() {
    this.getPokemons(this.state.pokemons);
  }

  handleFilterChange(query) {
    this.setState({
      filter: query
    });
  }

  filterPokemon(){
    return this.state.pokemons.filter(
      pokemon => pokemon.name.includes(this.state.filter)
    );
  }

  getPokemons(pokemonArr) {
    for (const pokemon of pokemonArr) {
      const baseURL = 'http://pokeapi.co/api/v2/';
      const pokemonURL = num => `${baseURL}pokemon/${num}/`;

      fetch(pokemonURL(pokemon.id))
        .then(response =>
            response.json()  //esto nos da el json de pokemon con su indice
        )
        .then(json =>{
          const {
            name,
            sprites: {front_default: image},
            types: [{type: {name: type}}]
          } = json;

          // {
          //   pokemons: [...this.state.pokemons, ]// los puntos coje todo lo que tuviese el array y luego se le añade
          //   //otro elemento pokemon
          // }

          this.setState((prevState, props) => {
            const updatedPokemons = [...prevState.pokemons];
            updatedPokemons[pokemon.id - 1] = {
              id: pokemon.id,
              name,
              image,
              type
            };


            return {
              pokemons: updatedPokemons
            }
          });
        })
    }
    // Al acutualizarse el estado se repintan los componentes
  }

  getMorePokemons() {
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
