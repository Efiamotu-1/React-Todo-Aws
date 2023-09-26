import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Verify.module.css";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (email && code) login(email, code);
  }

  useEffect(
    function () {
      if (isAuthenticated) navigate("/app", { replace: true });
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.verify}>

      <form className={styles.form} onSubmit={handleSubmit}>
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
          <label htmlFor="code">Password</label>
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