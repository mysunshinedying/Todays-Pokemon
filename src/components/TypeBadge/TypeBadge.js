import React from 'react';

const TypeBadge = (props) => {
    return (
        <div>타입:
            {props.pokeTypes.map((type) =>(
                    <span class={type.typeNamesEn + " typeBadge"} >{type.typeNamesKo}</span>
            ))}
        </div>
    );
};

export default TypeBadge;
