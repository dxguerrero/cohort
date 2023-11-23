import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";


type ApprenticeProps = {
  apprentice: {
    Name: string;
    Language: string;
    Hub: string;
    Img: string;
  };
  setAreApprenticesVisible: (b: boolean) => void;
  fetchApprentice: (name: string) => void;
};

export const Apprentice = ({
  apprentice,
  setAreApprenticesVisible,
  fetchApprentice,
}: ApprenticeProps) => {
  async function handleClick(apprentice: {Name:string;}): Promise<any> {
    await fetchApprentice(apprentice.Name);
    setAreApprenticesVisible(false);
  }

  return (
    <Card className="border border-primary card-margin-top-bottom p-2" style={{ width: '40rem'}}>
      <Row>
        <Stack direction="horizontal" gap={3}>
        <Col xs={3}>
          <Image className="p-2" src={apprentice.Img} width={150} height={150} roundedCircle />
        </Col>
        <Stack gap={1} className="name-hub-container">
          <Col xs={6}>
            <h3 className="p-1">{apprentice.Name}</h3>
            <p className="p-1">{apprentice.Hub}</p>
          </Col>
        </Stack>
        <Col>
          <Button className="p-2 ms-auto" onClick={() => handleClick(apprentice)}>
            View Apprentice
          </Button>
        </Col>
        </Stack>
      </Row>
    </Card>
  );
};
