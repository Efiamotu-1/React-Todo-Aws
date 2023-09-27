import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Verify.module.css";
import {Auth} from 'aws-amplify'

export default function Verify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const { verify, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      if (email && code){
          await Auth.confirmSignUp(email, code)
          verify()
          navigate("/task")
          console.log("success")
      } 
    }catch (err) {
      console.error(err)
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
          <Button type="primary">Verify</Button>
        </div>
      </form>
    </main>
  );
}