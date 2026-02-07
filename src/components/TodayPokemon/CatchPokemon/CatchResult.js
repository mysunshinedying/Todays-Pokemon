import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';

const CatchResult = (props) => {
    const [item, setItem] = useState(null);
    const itemNo = Math.floor(Math.random() * 304) + 1;

    useEffect(() => {
        fetch(`https://pokeapi.co/api/v2/item/${itemNo}`).then(res => res.json())
            .then((itemData) => {
                const nameKo = itemData.names?.find((e) => e.language.name === 'ko');
                const descriptKo = itemData.flavor_text_entries?.find((e) => e.language.name === 'ko');
                setItem({
                    itemNo: itemNo,
                    itemName: itemData.name,
                    itemNameKo: nameKo ? nameKo.name : itemData.name,
                    itemSprite: itemData.sprites?.default,
                    itemDesc: descriptKo ? descriptKo.text : itemData.text
                });
                console.log(itemNo);
            });
    }, []);

    return (
        <div>
            {props.pokemon.nameKo}를 잡았다!<br/>
            박스에 등록됩니다...
            <p>가지고 있는 아이템: {item && item.itemNameKo} {item && <img src={item.itemSprite}/>} {item && item.itemDesc}</p>
        </div>
    );
};

export default CatchResult;
