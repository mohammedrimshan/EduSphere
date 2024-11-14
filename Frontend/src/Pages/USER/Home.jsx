import React from "react";
import { useSelector } from "react-redux"; // Access Redux state

const Home = () => {
  const user = useSelector((state) => state.user.userDatas); // Get user data from Redux

  return (
    <div className="home-container">
      <h1>Welcome, {user ? user.name : "Guest"}</h1>
      <p>You are logged in!</p>
    </div>
  );
};

export default Home;
