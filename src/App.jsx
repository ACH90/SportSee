// src/App.jsx
import React from "react";
import UserProfile from "./components/UserProfile";

function App() {
  return (
    <div className="App">
      <UserProfile userId={12} /> {/* tu peux tester avec 12 ou 18 */}
    </div>
  );
}

export default App;
