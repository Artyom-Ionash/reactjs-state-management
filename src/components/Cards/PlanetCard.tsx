import { Planet } from "../../types/entities/Planet";

export const PlanetCard = ({ entity }: { entity: Planet }) => {
  return (
    <div>
      <h3>{entity.name}</h3>
      <p>{`Diameter: ${entity.diameter}`}</p>
      <p>{`Population: ${entity.population}`}</p>
    </div>
  );
};
