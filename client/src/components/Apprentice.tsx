import React from 'react';

type ApprenticeProps = {
    apprentice: {
        Name: string
        Language: string
        Hub: string
        Img: string
    }
}

export const Apprentice = ({ apprentice }: ApprenticeProps) => {


    return (
        <div>
            <h3>{apprentice.Name}</h3>
            <img className="list-img" src={apprentice.Img} />
            <button>View Apprentice</button>
        </div>
    )
}