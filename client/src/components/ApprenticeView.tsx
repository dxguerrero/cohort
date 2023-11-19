import React from "react";

type ApprenticeViewProps = {
  currentApprentice: {
    Name: string
    Language: string
    Hub: string
    Img: string
  }
  setAreApprenticesVisible: (b: boolean) => void
  fetchApprentice: (name: string) => void
};

export const ApprenticeView = ({
  currentApprentice,
  fetchApprentice,
  setAreApprenticesVisible,
}: ApprenticeViewProps) => {
    return (
        <div className="apprentice-view">
            <img src={currentApprentice.Img} alt={currentApprentice.Name} />
            <h3>{currentApprentice.Name}</h3>
            <p>{currentApprentice.Hub}</p>
            <h2>{currentApprentice.Language}</h2>

        </div>
    )
};
