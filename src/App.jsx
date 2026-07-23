import './App.css'
import { useState, useEffect } from 'react';
import UserProfile from './components/UserProfile';
import RepoCard from './components/RepoCard';
import useGitHubRepos from './hooks/useGitHubRepos';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [searchedUsername, setSearchedUsername] = useState(null);
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  // Initializing state from localStorage
  const [bookmarks, setBookmarks] = useState(() => {
  const saved = localStorage.getItem("bookmarks");
    return saved ? JSON.parse(saved) : [];
  });
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const { repos, loading: reposLoading, error: reposError } = useGitHubRepos(searchedUsername); 

  const availableLanguages = [...new Set(repos.map(repo => repo.language).filter(lang => lang !== null))];

  const filteredRepos = languageFilter === "" 
    ? repos 
    : repos.filter(repo => repo.language === languageFilter);

  const visibleRepos = showBookmarksOnly 
    ? filteredRepos.filter(repo => bookmarks.some(b => b.id === repo.id)) // keep only repos that ARE bookmarked
    : filteredRepos;

  const sortedRepos = [...visibleRepos].sort((a, b) => {
    if (sortOption === "stars") {
      return b.stargazers_count-a.stargazers_count;
    } else if (sortOption === "updated") {
      return new Date(b.updated_at) - new Date(a.updated_at);
    }
    return 0;
  });

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      setSearchedUsername(inputValue);
    }
  }

  function toggleBookmark(repo) {
    const isBookmarked = bookmarks.some(b => b.id === repo.id);
    
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b.id !== repo.id));
    } else {
      setBookmarks([...bookmarks, repo]);
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
      {searchedUsername !== null && reposLoading && <p>Loading repos...</p>}
      {searchedUsername !== null && reposError && <p>Error: {reposError}</p>}

      <select value={languageFilter} onChange={(e) => setLanguageFilter(e.target.value)}>
        <option value="">All Languages</option>
        {availableLanguages.map((lang, index) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>

      <div className="sort-controls">
        <button onClick={() => setSortOption('stars')}>Sort by Stars</button>
        <button onClick={() => setSortOption('updated')}>Sort by Last Updated</button>
        <button onClick={() => setSortOption('')}>Clear Sort</button>
      </div>

      <label>
        <input 
          type="checkbox" 
          checked={showBookmarksOnly}
          onChange={(e) => setShowBookmarksOnly(e.target.checked)} 
        />
        Show only bookmarks
      </label>

      <div className="repo-list">
        {sortedRepos.map((repo) => (
        <RepoCard key={repo.id}
          repo={repo}
          isBookmarked={bookmarks.some(b => b.id === repo.id)}
          onToggleBookmark={()=> {toggleBookmark(repo)}}
        />
      ))}
      </div>
    </div>
  );
}

export default App;