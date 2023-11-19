import React from "react";
import { Apprentice } from "./Apprentice";

type ApprenticeListProps = {
  apprentices: {
    ID: number;
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  }[];
  setAreApprenticesVisible: (b: boolean) => void;
  fetchApprentice: (name: string) => void;
};

export const ApprenticeList = ({
  apprentices,
  setAreApprenticesVisible,
  fetchApprentice,
}: ApprenticeListProps) => {
  return (
    <>
      {apprentices.map(
        (apprentice: {
          ID: number;
          Name: string;
          Language: string;
          Hub: string;
          Img: string;
        }) => (
          <Apprentice
            apprentice={apprentice}
            key={apprentice.ID}
            setAreApprenticesVisible={setAreApprenticesVisible}
            fetchApprentice={fetchApprentice}
          />
        )
      )}
    </>
  );
};
