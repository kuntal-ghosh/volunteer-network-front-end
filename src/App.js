import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import HomePage from "./pages/HomePage/HomePage";
import EventRegister from "./pages/EventRegister/EventRegister";
import SignIn from "./pages/SignIn/SignIn";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/Navbar/NavBar";
import MyEvents from "./pages/MyEvents/MyEvents";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import userContext from "./Context/userContext";
import PrivateRoute from "./Route/PrivateRoute";
function App() {
  const [loginUser, setLoginUser] = useState({});
  console.log("logged in user");
  console.log(loginUser);
  return (
    <>
      <userContext.Provider value={[loginUser, setLoginUser]}>
        <NavBar />
        <main className={styles.App}>
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <PrivateRoute user={loginUser} path="/register-to-event/:_id">
              <EventRegister />
            </PrivateRoute>
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
      </userContext.Provider>
    </>
  );
}

export default App;
