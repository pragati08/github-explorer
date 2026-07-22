import './App.css'
import { useState } from 'react';
import UserProfile from './components/UserProfile';
import RepoCard from './components/RepoCard';
import useGitHubRepos from './hooks/useGitHubRepos'; // check this path matches your file exactly

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchedUsername, setSearchedUsername] = useState(null);
  const [languageFilter, setLanguageFilter] = useState('');

  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(searchedUsername); 
  // which hook, called with what argument?

  // derive unique languages from repos
  const availableLanguages = [...new Set(repos.map(repo => repo.language).filter(lang => lang !== null))]; 
  // which field, and think about null values here — some repos have language: null, should that appear in the dropdown?

  // derive the filtered list
  const filteredRepos = languageFilter === "" 
    ? repos 
    : repos.filter(repo => repo.language === languageFilter);

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

      {searchedUsername !== null && reposLoading && <p>Loading repos...</p>} {/* which state? */}
      {searchedUsername !== null && reposError && <p>Error: {reposError}</p>} {/* which state, and what to show */}

      <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
        <option value="">All Languages</option>
        {availableLanguages.map((lang, index) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <div className="repo-list">
        {filteredRepos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
      </div>
    </div>
  );
}

export default App;