import React from 'react';
import {useState} from 'react';

const CatchPokemon = (props) => {
    const today = new Date().toISOString().slice(0, 10);
    const [monsterBall, setBall] = useState(10);
    const catchMonster  = () => {
        if(monsterBall < 1) {
            alert('더 못던져요');
            setBall(0);
            return false;
        }
        setBall(monsterBall - 1);
        if(Math.random() * 100 < 50) {
            localStorage.setItem('todaysPokemon', JSON.stringify({
                date: today,
                pokemonNo: props.pokemon.pokemonNo,
                pokemonPersonal: props.pokemon.pokemonPersonal,
                gacha: 1
            }));
            {props.onResult()}
        } else {
            console.log("포획 실패");
        }
    }


    return (
        <div>
            <img src={props.pokemon.pokeSprite} alt={props.pokemon.nameKo}/>
            <button onClick={catchMonster}>던지기 : 몬스터볼 {monsterBall}</button>
        </div>
    );
};

export default CatchPokemon;
