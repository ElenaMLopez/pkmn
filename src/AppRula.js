import React, { Component } from 'react';
// import Search from './components/Search';
import PokemonList from './components/PokemonList';
import Header from './components/Header';


class App extends Component {
  constructor(props){
    super(props);
    const numberOfPokemon = 3;

    // Creamos un array de 25 elementos que van del 1 al 25: [1, 2, 3, ...25]
    const numbers = [...Array(numberOfPokemon).keys()].map(n => n + 1);

    // Creamos un array de pokemons con id y name: [{id: 1, name: 'bulbasaur'}]
    const pokemons = numbers.map(number =>({
        id: number,
        name: ''
      }));
    this.state = {
      pokemons,
      filter: ''
    };
  }

  handleFilterChange(query) {
    this.setState({
      filter: query
    });
  }

  filterPokemon(){
    return this.state.pokemons.filter(
      pokemon => pokemon.name.includes(this.state.filter)
    )
  }

  componentDidMount(){
    const baseURL = 'http://pokeapi.co/api/v2/';
    const pokemonURL = num => `${baseURL}pokemon/${num}/`;

    this.state.pokemons.map( pokemon =>
      fetch(pokemonURL(pokemon.id))
        .then(response =>
          response.json()
        )
        .then(json => {
          // Esto es un destructuring, no un diccionario
          const{
            name,
            sprites: {front_default: image},
            types: [{type: {name: type}}]
          } = json;

          this.setState((prevState, props) => {
            // Esta linea genera una copia del array para no modificar prevState.pokemons directamente
            const pokemons = [...prevState.pokemons];

            // Asignamos la info nueva (name, image...) y la anterior (...pokemons)
            // al pokemon que está en la posicion id - 1 del array pokemons
            pokemons[pokemon.id - 1] = { ...pokemon, name, image, type };
            return {pokemons};
          });
        })
    );
  }

  render() {
    return (
      <div>

        <PokemonList pokemons={this.filterPokemon()} />
      </div>
    );
  }
}
// <Search onFilterChange={this.handleFilterChange.bind(this)} />
export default App;
