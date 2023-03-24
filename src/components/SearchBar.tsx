import { useState } from "react";
import { Pagination } from "antd";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [maxCount, setMaxCount] = useState(0);

  const handleSearch = async (page: number) => {
    console.log(`people/?search=${searchTerm}&page=${page}`);
    setLoading(true);
    setCurrentPage(page);
    try {
      const counters = await Promise.allSettled([
        swapi
          .get<SearchResult<Character>>(
            `people/?search=${searchTerm}&page=${page}`
          )
          .then(({ data: { results, count } }) => {
            setCharacterResults(results);
            return count;
          })
          .catch(() => {
            setCharacterResults([]);
            return 0;
          }),
        swapi
          .get<SearchResult<Planet>>(
            `planets/?search=${searchTerm}&page=${page}`
          )
          .then(({ data: { results, count } }) => {
            setPlanetResults(results);
            return count;
          })
          .catch(() => {
            setPlanetResults([]);
            return 0;
          }),
        swapi
          .get<SearchResult<Starship>>(
            `starships/?search=${searchTerm}&page=${page}`
          )
          .then(({ data: { results, count } }) => {
            setStarshipResults(results);
            return count;
          })
          .catch(() => {
            setStarshipResults([]);
            return 0;
          }),
      ]).then((results) =>
        results
          .filter(
            (r): r is PromiseFulfilledResult<number> => r.status === "fulfilled"
          )
          .map(({ value }) => value)
      );
      setMaxCount(Math.max(0, ...counters));
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
      <button onClick={() => handleSearch(1)}>Search</button>
      {(maxCount || null) && (
        <>
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
          <Pagination
            current={currentPage}
            total={maxCount}
            pageSize={10}
            onChange={handleSearch} // Call handleSearch when the page number changes
          />
        </>
      )}
    </>
  );
};
