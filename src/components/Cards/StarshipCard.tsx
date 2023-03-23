import { Starship } from "../../types/entities/Starship";

export const StarshipCard = ({ entity }: { entity: Starship }) => {
  return (
    <div>
      <h3>{entity.name}</h3>
      <p>{`Length: ${entity.length}`}</p>
      <p>{`Crew: ${entity.crew}`}</p>
    </div>
  );
};
