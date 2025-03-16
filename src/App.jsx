import { Fragment, useEffect, useState } from "react";
import "./App.css";
import MainHeader from "./Components/MainHeader/MainHeader";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

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
    <Fragment>
      <MainHeader isAuthenticated={loggedIn} onLogout={logoutHandler}/>
      <main>
        {!loggedIn && <Login onLogin={loginHandler} />}
        {loggedIn && <Home/>}
      </main>
    </Fragment>
  );
}

export default App;
