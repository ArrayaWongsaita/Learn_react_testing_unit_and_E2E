import { useState } from "react";

export default function Username() {
  const [username, setUsername] = useState("");
  return (
    <>
      <div data-testid="username">{username}</div>
      <button
        onClick={() => {
          setUsername("bar");
        }}
        data-testid="button"
      ></button>
      <input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        data-testid="usernameInput"
      />
    </>
  );
}