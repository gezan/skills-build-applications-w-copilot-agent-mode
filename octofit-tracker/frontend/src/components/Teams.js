import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams: fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : data.results || [];
        setTeams(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams: error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="card page-card">
      <div className="card-header">
        <h2>Teams</h2>
      </div>
      <div className="card-body p-0">
        {teams.length === 0 ? (
          <p className="text-muted p-3 mb-0">No teams found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, index) => (
                  <tr key={team.id}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{team.name}</td>
                    <td>{team.description || <span className="text-muted fst-italic">No description available.</span>}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {team.members ? team.members.length : 0} member(s)
                      </span>
                    </td>
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

export default Teams;
