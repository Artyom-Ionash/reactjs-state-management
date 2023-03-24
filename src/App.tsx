import logo from "./light-sabers-svgrepo-com.svg";
import "./App.css";

import { SearchBar } from "./components/SearchBar";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <SearchBar></SearchBar>
        <p>This is a test task performed on React.js</p>
        <a
          className="App-link"
          href="https://swapi.dev/api/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Star Wars API
        </a>
      </header>
    </div>
  );
}

export default App;
