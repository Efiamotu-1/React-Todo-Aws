import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";
import {Auth} from 'aws-amplify'

export default function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const { verify, login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if (username === '' ||  password === '') setError('Please input a value in each field')
      if (username && password) {
        const user = await Auth.signIn(username, password)
        navigate("/task")
        login(user)
        verify()
    }
    }catch(err) {
      setError(err.message)
    }
}

  useEffect(
    function () {
      if (isAuthenticated) navigate("/task", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setEmail(e.target.value)}
            value={username}
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

        <div>
        {error && <p className={styles.error}>{error}</p>}
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}