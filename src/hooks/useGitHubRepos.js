import { useState, useEffect } from 'react';
import axios from 'axios';

function useGitHubRepos(username) {
  const [repos, setRepos] = useState([]); // what type should this default to — null, or something else? think about what .map() needs later
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || username.trim() === "") {
      setError("Enter valid username");
      setLoading(false);
      return;
    } // same guard clause logic as before

    async function fetchRepos() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`); // what's the repos endpoint URL?
        setRepos(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch repos");
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, [username]);

  return { repos, loading, error };
}

export default useGitHubRepos;