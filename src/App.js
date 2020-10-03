import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
