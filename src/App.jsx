// src/App.jsx
import React from "react";
import Layout from "./Layout/Layout";
import UserProfile from "./components/UserProfile/UserProfile";

function App() {
  return (
    <Layout>
      <UserProfile userId={12} /> {/* tu peux tester avec 12 ou 18 */}
    </Layout>
  );
}

export default App;
