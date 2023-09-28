import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Register.module.css";
import {Auth} from 'aws-amplify'



export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    const isNotValidUsername = !(/^[a-zA-Z0-9]+$/.test(username))
    const isNotValidPassword = password.length < 8
    try{
      if (isNotValidPassword) setError('your password is less than 8')
        if(isNotValidUsername) setError('your username should be alpha numeric')
        if (username === '' || email === '' || password === '') setError('Please input a value in each field')
      if (isNotValidPassword !== true && email && isNotValidUsername !== true) {
        const {user} = await Auth.signUp({
          username: username,
          password: password,
          attributes: {
            email: email
          }
        })
        login(user)
        navigate("/verify")
      };
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
    <main className={styles.register}>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

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

        <div>
          {error && <p className={styles.error}>{error}</p>}
          <Button type="primary">Register</Button>
        </div>
      <div className={styles["login-link"]}>Have an account  <Link style={{color: "blue"}} to="login">Login</Link></div>
      </form>
    </main>
  );
}