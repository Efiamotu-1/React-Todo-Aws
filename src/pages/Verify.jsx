import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Verify.module.css";
import {Auth} from 'aws-amplify'

export default function Verify() {
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("")

  const { verify, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if (username === '' ||  code === '') setError('Please input a value in each field')
      if (username && code){
          await Auth.confirmSignUp(username, code)
          verify()
          navigate("/task")
      } 
    }catch (err) {
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
    <main className={styles.verify}>

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
          <label htmlFor="code">Authentication Code</label>
          <input
            type="number"
            id="code"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
        </div>

        <div>
        {error && <p className={styles.error}>{error}</p>}
          <Button type="primary">Verify</Button>
        </div>
      </form>
    </main>
  );
}