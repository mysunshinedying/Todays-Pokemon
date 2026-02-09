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

            });
    }, []);

    function eulReul(noun) {
        const last = noun.charCodeAt(noun.length - 1);
        if (last < 0xac00 || last > 0xd7a3) return `${noun}를`;

        const jong = (last - 0xac00) % 28;
        const josa = jong === 0 ? '를' : '을';
        return `${noun}${josa}`;
    }

    return (
        <div>
            {eulReul(props.pokemon.nameKo)} 잡았다!<br/>
            박스에 등록됩니다...
            <p>가지고 있는 아이템: {item && item.itemNameKo} {item && <img src={item.itemSprite}/>} {item && item.itemDesc}</p>
        </div>
    );
};

export default CatchResult;
