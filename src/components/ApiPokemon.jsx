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

  return (
    <div>ApiPokemon</div>
  )
}

export default ApiPokemon