import { Apprentice } from "./Apprentice";
import Card from "react-bootstrap/Card"

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
    <Card className="p-3">
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
    </Card>
  );
};
