import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from REST API endpoint:', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities: fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const items = Array.isArray(data) ? data : data.results || [];
        setActivities(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities: error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <div className="text-center mt-4"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-4">Error: {error}</div>;

  return (
    <div className="card page-card">
      <div className="card-header">
        <h2>Activities</h2>
      </div>
      <div className="card-body p-0">
        {activities.length === 0 ? (
          <p className="text-muted p-3 mb-0">No activities found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Type</th>
                  <th>Duration (min)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, index) => (
                  <tr key={activity.id}>
                    <td>{index + 1}</td>
                    <td>{activity.user}</td>
                    <td><span className="badge bg-primary">{activity.type}</span></td>
                    <td>{activity.duration}</td>
                    <td>{activity.date}</td>
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

export default Activities;
