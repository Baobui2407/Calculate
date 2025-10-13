import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Lỗi");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display}>{input || "0"}</div>
        <div className={styles.buttonGrid}>
          <button className={`${styles.button} ${styles.function}`} onClick={handleClear}>C</button>
          <button className={`${styles.button} ${styles.operator}`} onClick={() => handleClick("/")}>÷</button>
          <button className={`${styles.button} ${styles.operator}`} onClick={() => handleClick("*")}>×</button>
          <button className={`${styles.button} ${styles.operator}`} onClick={() => handleClick("-")}>−</button>

          {[7, 8, 9].map((n) => (
            <button key={n} className={`${styles.button} ${styles.number}`} onClick={() => handleClick(n.toString())}>{n}</button>
          ))}
          <button className={`${styles.button} ${styles.operator}`} onClick={() => handleClick("+")}>+</button>

          {[4, 5, 6].map((n) => (
            <button key={n} className={`${styles.button} ${styles.number}`} onClick={() => handleClick(n.toString())}>{n}</button>
          ))}
          <button className={`${styles.button} ${styles.equals}`} onClick={handleCalculate}>=</button>

          {[1, 2, 3, 0].map((n) => (
            <button key={n} className={`${styles.button} ${styles.number}`} onClick={() => handleClick(n.toString())}>{n}</button>
          ))}
          <button className={`${styles.button} ${styles.number}`} onClick={() => handleClick(".")}>.</button>
        </div>
      </div>
    </div>
  );
}