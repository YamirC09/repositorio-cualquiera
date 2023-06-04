import React, { useState, useEffect } from 'react';

const ApiPokemon = () => {
    const [pokemon, setPokemon] = useState([]);
    const [paginacion, setPaginacion] = useState(1);
    const [mostrarPokemon, setMostrarPokemon] = useState(false);
    const [pokemonDetalles, setPokemonDetalles] = useState([]);

    useEffect(() => {
        if (mostrarPokemon) {
          traerPokemon();
        }
      }, [paginacion, mostrarPokemon]);
    
      const traerPokemon = async () => {
        try {
          const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon?offset=${(paginacion - 1) * 20}&limit=20`
          );
          const respuesta = await res.json();
          const auxPokemon = respuesta.results;
          setPokemon(auxPokemon);
    
          const detallesPromises = auxPokemon.map(async (aux) => {
            const res = await fetch(aux.url);
            const respuesta = await res.json();
            return respuesta;
          });
    
          const detallesPokemon = await Promise.all(detallesPromises);
          setPokemonDetalles(detallesPokemon);
        } catch (error) {
          console.log(error);
        }
      };

      const traerPokemonsClick = () => {
        setMostrarPokemon(true);
      };
    
      const siguiente = () => {
        setPaginacion(paginacion + 1);
      };
    
      const atras = () => {
        if (paginacion > 1) {
          setPaginacion(paginacion - 1);
        }
      };
    const capitalizar = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
    

  return (
    <div className="centered-container">
      <h1>Pokemon</h1>
      {!mostrarPokemon && (
        <button onClick={traerPokemonsClick}>Traer Pokemons</button>
      )}
      {mostrarPokemon && (
        <>
          <button onClick={siguiente}>Siguiente</button>
          <button onClick={atras}>Atrás</button>
          {pokemonDetalles.map((pokemonDetalle, index) => (
            <div className="container" key={index}>
              <h3>{capitalizar(pokemonDetalle.name)}</h3>
              <img
                src={pokemonDetalle.sprites.front_default}
                alt={pokemonDetalle.name}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ApiPokemon