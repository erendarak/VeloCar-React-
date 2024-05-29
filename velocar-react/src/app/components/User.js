import React from "react";

function User({ fullName }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <p style={{ marginRight: "10px", color: "red" }}>{fullName}</p>
      <button>Click Me</button>
    </div>
  );
}

export default User;
