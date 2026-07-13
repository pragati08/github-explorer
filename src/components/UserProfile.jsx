import useGitHubUser from "../hooks/useGitHubUser";

function UserProfile({ username }) { // what prop is this component expecting?
  const { user, loading, error } = useGitHubUser(username); // call the hook

  if (loading) {
    return <p>Loading...</p>; // which state variable makes this show?
  }

  if (error) {
    return <p>Error: {error}</p>; // which state variable, and what do you display inside it?
  }

  if (!user) {
    return null; // why might we need this check even after the loading/error checks? think about it
  }

  return (
    <div className="profile-card">
      <img src={user.avatar_url} alt={user.name} /> {/* which two fields from `user`? */}
      <h2>{user.name}</h2> {/* display name */}
      <p>@{user.login}</p> {/* github username/login */}
      <p>{user.bio}</p> {/* bio, if it exists */}
      <p>📍 {user.location}</p> {/* location */}
      <p>🏢 {user.company}</p> {/* company */}
      <div className="stats">
        <span>{user.followers} followers</span>
        <span>{user.following} following</span>
        <span>{user.public_repos} repos</span>
      </div>
      <a href={user.html_url} target="_blank" rel="noreferrer">View on GitHub</a> {/* which URL field, and why this one not the other */}
    </div>
  );
}

export default UserProfile;