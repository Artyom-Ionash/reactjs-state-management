import { Card } from "antd";
import { Starship } from "../../types/entities/Starship";

export const StarshipCard = ({ entity }: { entity: Starship }) => {
  return (
    <Card title={entity.name} bordered={false} hoverable style={{ width: 250 }}>
      <p>{`Length: ${entity.length}`}</p>
      <p>{`Crew: ${entity.crew}`}</p>
    </Card>
  );
};
