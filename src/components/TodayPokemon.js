import React from 'react';
import {useState} from 'react';
import './TodayPokemon.css';

function TodayPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const handleDraw = () => {
        fetch('https://pokeapi.co/api/v2/pokemon/25')
            .then(res => res.json())
            .then(data => setPokemon(data));
    };
    return (
        <div>
            <button onClick={handleDraw}>오늘의 포켓몬 뽑기</button>
            {pokemon && <p>{pokemon.types}</p>}
        </div>
    );

}

export default TodayPokemon;
