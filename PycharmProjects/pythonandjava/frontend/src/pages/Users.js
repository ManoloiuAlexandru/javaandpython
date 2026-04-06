import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:5002";

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Users ERROR:", err));
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "20px" }}>👤 Users</h1>

      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px"
          }}
        >
          {users.map(user => (
            <div
              key={user.id}
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
                transition: "0.2s",
                cursor: "pointer"
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <h3 style={{ marginBottom: "10px" }}>{user.name}</h3>
              <p style={{ color: "#666" }}>ID: {user.id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;