import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Login.module.css";

import PageNav from "../components/PageNav";
import Button from "../components/Button";
import { useAuth } from "../contexts/FakeAuthContext";
import Message from "../components/Message";

export default function Login() {
  const { login, isAuthenticated, errorMessage } = useAuth();
  const navigate = useNavigate();

  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  /**
   * The handleLogin function prevents the default form submission behavior and calls the login function
   * if either the email or password is provided.
   */
  function handleLogin(e) {
    e.preventDefault();
    if (email || password) login(email, password);
  }

  /* The `useEffect` hook is being used to check if the user is authenticated (`isAuthenticated` is a boolean
value). If the user is authenticated, it will navigate to the "/app" route using the `navigate`
function from the `react-router-dom` library. */
  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/app", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {errorMessage && <Message message={errorMessage} type="error" />}
        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
