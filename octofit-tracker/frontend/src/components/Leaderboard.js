import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiBase = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const apiUrl = `${apiBase}/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard: fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : data.results || [];
        // Sort by score descending
        const sorted = [...items].sort((a, b) => b.score - a.score);
        setEntries(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard: error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  const rankBadge = (index) => {
    if (index === 0) return <span className="badge bg-warning text-dark fs-6">🥇 1st</span>;
    if (index === 1) return <span className="badge bg-secondary fs-6">🥈 2nd</span>;
    if (index === 2) return <span className="badge fs-6" style={{ backgroundColor: '#cd7f32' }}>🥉 3rd</span>;
    return <span className="badge bg-light text-dark fs-6">{index + 1}</span>;
  };

  return (
    <div className="card page-card">
      <div className="card-header">
        <h2>Leaderboard</h2>
      </div>
      <div className="card-body p-0">
        {entries.length === 0 ? (
          <p className="text-muted p-3 mb-0">No leaderboard entries found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, index) => (
                  <tr key={entry.id} className={index === 0 ? 'table-warning' : ''}>
                    <td>{rankBadge(index)}</td>
                    <td className="fw-semibold">{entry.team}</td>
                    <td><span className="badge bg-dark fs-6">{entry.score}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
