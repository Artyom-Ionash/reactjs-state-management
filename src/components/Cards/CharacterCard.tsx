import { Card } from "antd";
import { Character } from "../../types/entities/Character";

export const CharacterCard = ({ entity }: { entity: Character }) => {
  return (
    <Card title={entity.name} bordered={false} hoverable style={{ width: 250 }}>
      <p>{`Gender: ${entity.gender}`}</p>
      <p>{`Mass: ${entity.mass}`}</p>
    </Card>
  );
};
