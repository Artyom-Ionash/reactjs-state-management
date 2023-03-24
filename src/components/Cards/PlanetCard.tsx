import { Card } from "antd";
import { Planet } from "../../types/entities/Planet";

export const PlanetCard = ({ entity }: { entity: Planet }) => {
  return (
    <Card
      title={entity.name}
      bordered={false}
      hoverable
      style={{ width: 250, backgroundColor: "#FFE8F1" }}
    >
      <p>{`Diameter: ${entity.diameter}`}</p>
      <p>{`Population: ${entity.population}`}</p>
    </Card>
  );
};
