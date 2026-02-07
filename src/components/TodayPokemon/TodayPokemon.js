import React from 'react';
import {useState} from 'react';
import './TodayPokemon.css';
import ResultPokemon from './ResultPokemon/ResultPokemon';
import CatchPokemon from './CatchPokemon/CatchPokemon';
import CatchResult from './CatchPokemon/CatchResult';


const pokemonNo = Math.floor(Math.random() * 898) + 1;
const pokemonPersonalList = ['외로움을 타는', '고집스런', '개구쟁이같은', '용감한', '대담한', '장난꾸러기같은', '촐랑거리는', '무사태평한', '조심스러운', '의젓한',
                                        '덜렁거리는', '냉정한', '차분한', '얌전한', '신중한', '건방진', '겁쟁이같은', '성급한', '명랑한', '천진난만한', '수줍음을 타는',
                                        '노력하는', '온순한', '변덕스러운', '성실한'];
const pokemonPersonal = pokemonPersonalList[Math.floor(Math.random() * pokemonPersonalList.length)];

function TodayPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [currentScreen,setCurrentScreen] = useState('todayPokemon');



    const handleDraw = () => {
        Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNo}`).then(res => res.json()),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonNo}`).then(res => res.json()),
        ])
            .then(([pokemonData, speciesData]) => {
                const spcNameKo = speciesData.names?.find((e) => e.language.name === 'ko');
                const flavorKo = speciesData.flavor_text_entries?.find((e) => e.language.name === 'ko');
                return Promise.all(
                    pokemonData.types.map((t) =>
                        fetch(t.type.url)
                            .then((res) => res.json())
                            .then((data) => {
                                const ko = data.names?.find((e) => e.language.name === "ko");
                                return {
                                    typeNamesEn: data.name,
                                    typeNamesKo: ko ? ko.name : data.name };
                            })
                    )
                ).then((typeNames) => ({
                    pokemonData,
                    speciesData,
                    spcNameKo,
                    flavorKo,
                    typeNames,
                }));
            }).then(({ pokemonData, speciesData, spcNameKo, flavorKo, typeNames }) => {
                setPokemon({
                    pokemon: pokemonData,
                    pokeSprite: pokemonData.sprites.other["official-artwork"].front_default,
                    nameKo: spcNameKo ? spcNameKo.name : pokemonData.name,
                    pokeNo: pokemonNo,
                    pokeHeight:(pokemonData.height / 10).toFixed(1),
                    pokeWeight:pokemonData.weight / 10,
                    pokeDescription:flavorKo ? flavorKo.flavor_text : '등록되지 않음',
                    pokePersonal: pokemonPersonal,
                    pokeTypes: typeNames
                });
            setCurrentScreen('resultPokemon');
            });

    };
    const screens = {
        todayPokemon : <button onClick={handleDraw}>오늘의 포켓몬 뽑기</button>,
        catchPokemon : <CatchPokemon pokemon={pokemon} onResult={()=> setCurrentScreen('catchResult')}/>,
        resultPokemon : <ResultPokemon pokemon={pokemon} onCatch={() => setCurrentScreen('catchPokemon')}/>,
        catchResult : <CatchResult pokemon={pokemon}/>
    }
    return (
        <div>
            <div>{screens[currentScreen]}</div>
        </div>
    );

}

export default TodayPokemon;
