import React from "react";

function User({ fullName }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span style={{ marginRight: "10px", color: "red" }}>{fullName}</span>
      <button>Click Me</button>
    </div>
  );
}

export default User;
