import React from 'react';
import TypeBadge from '../TypeBadge/TypeBadge';

const PokemonDetail = (props) => {

    return (
        <div>
            <img src={props.pokemon.pokeSprite} alt={props.pokemon.nameKo}/>
            <h1>{props.pokemon.nameKo}</h1>
            <p>도감 번호: {props.pokemon.pokeNo}</p>
            <p>키: {props.pokemon.pokeHeight}m</p>
            <p>체중: {props.pokemon.pokeWeight}kg</p>
            <p>성격: {props.pokemon.pokePersonal}</p>
            <TypeBadge pokeTypes={props.pokemon.pokeTypes}/>
            <div>
                {props.pokemon.pokeDescription}
            </div>
        </div>
    );
};

export default PokemonDetail;
