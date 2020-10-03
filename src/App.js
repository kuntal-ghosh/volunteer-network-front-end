import React from "react";
import styles from "./App.module.scss";
import HomePage from "./pages/HomePage/HomePage";
import EventRegister from "./pages/EventRegister/EventRegister";
import SignIn from "./pages/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";
import MyEvents from "./pages/MyEvents/MyEvents";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
function App() {
  return (
    <>
      <NavBar />
      <main className={styles.App}>
        <Switch>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/register-to-event">
            <EventRegister />
          </Route>
          <Route path="/my-events">
            <MyEvents />
          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </main>

      {/* <Footer /> */}
    </>
  );
}

export default App;
