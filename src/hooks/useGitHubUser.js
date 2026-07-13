import { useState, useEffect } from 'react';
import axios from 'axios';

function useGitHubUser(username) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username || username.trim() === "") {
      setError("Enter valid username");
      setLoading(false);
      return;
    }

    async function fetchUser() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        setUser(response.data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

  return { user, loading, error };
}

export default useGitHubUser;