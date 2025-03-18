import { Fragment, useEffect, useState } from "react";
import "./App.css";
import MainHeader from "./Components/MainHeader/MainHeader";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import AuthContext from "./store/auth-context";

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    if (JSON.parse(localStorage.getItem("isLoggedUser")) !== null) {
      return JSON.parse(localStorage.getItem("isLoggedUser")).isLogged;
    } else {
      return false;
    }
  });

  console.log(loggedIn);

  useEffect(() => {
    const storedLoggedUSerData = JSON.parse(localStorage.getItem("isLoggedUser"));
    if (storedLoggedUSerData !== null) {
      if (storedLoggedUSerData === true) {
        setLoggedIn(true);
      }
    }
  }, []);

  const loginHandler = (user, password) => {
    const loggedUser = localStorage.setItem(
      "isLoggedUser",
      JSON.stringify({ username: user, isLogged: true })
    );
    setLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedUser')
    setLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={
      {
        loggedIn: loggedIn,
        onLogout: logoutHandler
      }
    }>
      <MainHeader onLogout={logoutHandler}/>
      <main>
        {!loggedIn && <Login onLogin={loginHandler} />}
        {loggedIn && <Home/>}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
