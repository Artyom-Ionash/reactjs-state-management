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
    setLoading(true);
    setCurrentPage(page);
    try {
      const fetchSearchResults = async <
        T extends Character | Planet | Starship
      >(
        resource: string,
        searchTerm: string,
        page: number,
        setResults: (value: React.SetStateAction<T[]>) => void
      ): Promise<number> =>
        swapi
          .get<SearchResult<T>>(
            `${resource}/?search=${searchTerm}&page=${page}`
          )
          .then(({ data: { results, count } }) => {
            setResults(results);
            return count;
          })
          .catch(() => {
            setResults([]);
            return 0;
          });

      const counters = await Promise.allSettled([
        fetchSearchResults("people", searchTerm, page, setCharacterResults),
        fetchSearchResults("planets", searchTerm, page, setPlanetResults),
        fetchSearchResults("starships", searchTerm, page, setStarshipResults),
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
      {loading && <p>Loading...</p>}
      {(maxCount || null) && (
        <>
          <div style={{ display: "flex" }}>
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
