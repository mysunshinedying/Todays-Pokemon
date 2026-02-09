import React from 'react';

const fetchPokemon = (pokemonNo, pokemonPersonal) => {
    return Promise.all([
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
                                typeNamesKo: ko ? ko.name : data.name
                            };
                        })
                )
            ).then((typeNames) => ({
                pokemonData,
                speciesData,
                spcNameKo,
                flavorKo,
                typeNames,
            }));
        }).then(({pokemonData, speciesData, spcNameKo, flavorKo, typeNames}) => {
            return {
                pokemon: pokemonData,
                pokeSprite: pokemonData.sprites.other["official-artwork"].front_default,
                nameKo: spcNameKo ? spcNameKo.name : pokemonData.name,
                pokemonNo: pokemonNo,
                pokeHeight: (pokemonData.height / 10).toFixed(1),
                pokeWeight: pokemonData.weight / 10,
                pokeDescription: flavorKo ? flavorKo.flavor_text : '등록되지 않음',
                pokePersonal: pokemonPersonal,
                pokeTypes: typeNames
            };
        });
}


export default fetchPokemon;
