import { Character } from "./entities/Character";
import { Starship } from "./entities/Starship";
import { Planet } from "./entities/Planet";

export interface SearchResult<T extends Character | Starship | Planet> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
