import './App.css'
import { useState } from 'react';
import UserProfile from './components/UserProfile';
import RepoCard from './components/RepoCard';
import useGitHubRepos from './hooks/useGitHubRepos'; // check this path matches your file exactly

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchedUsername, setSearchedUsername] = useState(null);

  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(searchedUsername); 
  // which hook, called with what argument?

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSearchedUsername(inputValue);
    }
  }

  return (
    <div className="app">
      <h1>GitHub Explorer</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyDown(e)}
        placeholder="Enter GitHub username..."
      />
      {searchedUsername !== null && <UserProfile username={searchedUsername} />}

      {reposLoading && <p>Loading repos...</p>} {/* which state? */}
      {reposError && <p>Error: {reposError}</p>} {/* which state, and what to show */}

      <div className="repo-list">
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} /> 
        ))}
      </div>
    </div>
  );
}

export default App;