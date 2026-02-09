import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import './TodayPokemon.css';
import ResultPokemon from './ResultPokemon/ResultPokemon';
import CatchPokemon from './CatchPokemon/CatchPokemon';
import CatchResult from './CatchPokemon/CatchResult';
import fetchPokemon from '../API/pokeAPI';


const today = new Date().toISOString().slice(0, 10);
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const yesterdayStr = yesterday.toISOString().slice(0, 10);

const dailyData = JSON.parse(localStorage.getItem('dailyCheck')) ?? null;
const todaysPokemonData = JSON.parse(localStorage.getItem('todaysPokemon')) ?? null;
const alreadyDrewToday = todaysPokemonData?.date === today;

let stack = 1;
let monsterball = 6;

if(dailyData?.date === today) {
    stack = Number(dailyData.stack) || 1;
} else if(dailyData?.date) {
    stack = dailyData.date === yesterdayStr ? (Number(dailyData.stack) || 0) + 1 : 1;
}


const dailyCheck = { date: today, stack: stack };
localStorage.setItem('dailyCheck', JSON.stringify(dailyCheck));
//localStorage.removeItem('todaysPokemon');

function TodayPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [currentScreen,setCurrentScreen] = useState(alreadyDrewToday ? 'resultPokemon' : 'todayPokemon');

    useEffect(() => {
            if(!alreadyDrewToday || !todaysPokemonData?.pokemonNo) return;
            fetchPokemon(todaysPokemonData.pokemonNo, todaysPokemonData.pokemonPersonal).then(setPokemon);
    }, []);


    const handleDraw = () => {
        const pokemonNo = Math.floor(Math.random() * 898) + 1;
        const pokemonPersonalList = ['외로움을 타는', '고집스런', '개구쟁이같은', '용감한', '대담한', '장난꾸러기같은', '촐랑거리는', '무사태평한', '조심스러운', '의젓한',
            '덜렁거리는', '냉정한', '차분한', '얌전한', '신중한', '건방진', '겁쟁이같은', '성급한', '명랑한', '천진난만한', '수줍음을 타는',
            '노력하는', '온순한', '변덕스러운', '성실한'];
        const pokemonPersonal = todaysPokemonData?.pokemonPersonal ?? pokemonPersonalList[Math.floor(Math.random() * pokemonPersonalList.length)];

        fetchPokemon(pokemonNo,pokemonPersonal).then((data) => {
            setPokemon(data);
            localStorage.setItem('todaysPokemon', JSON.stringify({
                date: today,
                pokemonNo: pokemonNo,
                pokemonPersonal: pokemonPersonal,
                gacha: 0
            }));

            setCurrentScreen('resultPokemon');
        });

    };
    const screens = {
        todayPokemon : <button onClick={handleDraw}>오늘의 포켓몬 뽑기</button>,
        catchPokemon : <CatchPokemon pokemon={pokemon} onResult={()=> setCurrentScreen('catchResult')}/>,
        resultPokemon : pokemon ? <ResultPokemon pokemon={pokemon} onCatch={() => setCurrentScreen('catchPokemon')}/> : '',
        catchResult : <CatchResult pokemon={pokemon}/>
    }
    return (
        <div>
            <div>{screens[currentScreen]}</div>
        </div>
    );

}

export default TodayPokemon;
