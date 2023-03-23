import { Character } from "../../types/entities/Character";

export const CharacterCard = ({ entity }: { entity: Character }) => {
  return (
    <div>
      <h3>{entity.name}</h3>
      <p>{`Gender: ${entity.gender}`}</p>
      <p>{`Mass: ${entity.mass}`}</p>
    </div>
  );
};
