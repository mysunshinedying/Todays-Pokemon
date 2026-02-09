import React from 'react';
import {useEffect} from 'react';

import PokemonDetail from "../../PokemonDetail/PokemonDetail";

const ResultPokemon = (props) => {

    return (
        <div>
            <PokemonDetail pokemon={props.pokemon}/>
            <a href={`https://www.pokemonstore.co.kr/pages/product/list.html?keyword=${props.pokemon.nameKo}`} target="_blank">포켓몬 스토어 가기</a>
            <button onClick={props.onCatch}>포획하기</button>
        </div>
    );
};

export default ResultPokemon;
