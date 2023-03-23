import { useState } from "react";
import { swapi } from "../services/swapi";
import { Character } from "../types/entities/Character";
import { Starship } from "../types/entities/Starship";
import { Planet } from "../types/entities/Planet";
import { SearchResult } from "../types/SearchResult";
import { CharacterCard } from "./Cards/CharacterCard";
import { StarshipCard } from "./Cards/StarshipCard";
import { PlanetCard } from "./Cards/PlanetCard";
import { CardList } from "./CardList";

export const SearchBar = () => {
  const [characterResults, setCharacterResults] = useState<Character[]>([]);
  const [planetResults, setPlanetResults] = useState<Planet[]>([]);
  const [starshipResults, setStarshipResults] = useState<Starship[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    try {
      await Promise.allSettled([
        swapi
          .get<SearchResult<Character>>(`people/?search=${searchTerm}`)
          .then(({ data: { results } }) => setCharacterResults(results)),
        swapi
          .get<SearchResult<Planet>>(`planets/?search=${searchTerm}`)
          .then(({ data: { results } }) => setPlanetResults(results)),
        swapi
          .get<SearchResult<Starship>>(`starships/?search=${searchTerm}`)
          .then(({ data: { results } }) => setStarshipResults(results)),
      ]);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={({ target: { value } }) => setSearchTerm(value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div style={{ display: "flex" }}>
        {loading && <p>Loading...</p>}
        {characterResults && (
          <CardList
            title={"Characters"}
            cards={characterResults}
            cardComponent={CharacterCard}
          />
        )}
        {planetResults && (
          <CardList
            title={"Planets"}
            cards={planetResults}
            cardComponent={PlanetCard}
          />
        )}
        {starshipResults && (
          <CardList
            title={"Starships"}
            cards={starshipResults}
            cardComponent={StarshipCard}
          />
        )}
      </div>
    </>
  );
};
