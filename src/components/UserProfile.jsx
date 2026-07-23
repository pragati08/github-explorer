import useGitHubUser from "../hooks/useGitHubUser";

function UserProfile({ username }) {
  const { user, loading, error } = useGitHubUser(username);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt={user.name} />
      <h2>{user.name}</h2>
      <p>@{user.login}</p>
      <p>{user.bio}</p>
      <p>📍 {user.location}</p>
      <p>🏢 {user.company}</p>
      <div className="stats">
        <span>{user.followers} followers</span>
        <span>{user.following} following</span>
        <span>{user.public_repos} repos</span>
      </div>
      <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
    </div>
  );
}

export default UserProfile;