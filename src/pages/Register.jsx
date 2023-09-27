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

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if (username && email && password) {
        const {user} = await Auth.signUp({
          username: username,
          password: password,
          attributes: {
            email: email
          }
        })
        login(user)
        navigate("/verify")
        console.log("clicked")
      };
    }catch(err) {
      console.error(err)
    }


  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
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
          <Button type="primary">Register</Button>
        </div>
      <div className={styles["login-link"]}>Have an account  <Link style={{color: "blue"}} to="login">Login</Link></div>
      </form>
    </main>
  );
}