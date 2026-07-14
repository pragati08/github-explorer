function RepoCard({ repo }) {
  return (
    <div className="repo-card">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h3>{repo.name}</h3>
      </a>
      <p>{repo.description || "No description provided."}</p> {/* what's a sensible fallback string? */}
      <div className="repo-meta">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>{repo.language || "Not specified"}</span>
      </div>
      <span className="updated-at">Updated: {new Date(repo.updated_at).toLocaleDateString()}</span> {/* raw date, or formatted? */}
    </div>
  );
}

export default RepoCard;