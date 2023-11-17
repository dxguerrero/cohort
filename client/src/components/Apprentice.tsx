import React from 'react';

type ApprenticeProps = {
    apprentice: {
        Name: string
        Language: string
        Hub: string
        Img: string
    }
    setAreApprenticesVisible: (b: boolean) => void;
    fetchApprentice: (name:string) =>  void;
}

export const Apprentice = ({ apprentice, setAreApprenticesVisible, fetchApprentice }: ApprenticeProps) => {
    async function handleClick(apprentice: {}): Promise<any> {
        await fetchApprentice(apprentice.Name);
        setAreApprenticesVisible(false);
    }

    return (
        <div className='apprentice-card'>
            <div className='circle'>
                <img className="list-img" src={apprentice.Img}/>
            </div>
            <h3>{apprentice.Name}</h3>
            <p>{apprentice.Hub}</p>
            <button onClick={() => handleClick(apprentice)}>View Apprentice</button>
        </div>
    )
}