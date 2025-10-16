import { useState, useRef, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [input, setInput] = useState("");
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [displayFontSize, setDisplayFontSize] = useState(32);

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  // adjust display font-size so long numbers fit the display without overflowing
  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;
    if (!container || !textEl) return;

    const MAX_FONT = 32;
    const MIN_FONT = 12;
    let font = MAX_FONT;

    // set initial font on the text element
    textEl.style.fontSize = font + "px";

    // reduce font size while the text's scrollWidth is greater than the container's inner width
    while (textEl.scrollWidth > container.clientWidth && font > MIN_FONT) {
      font -= 1;
      textEl.style.fontSize = font + "px";
    }

    setDisplayFontSize(font);
  }, [input]);

  const handleBackspace = () => {
    setInput((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      // basic sanitization: allow only digits, operators and dots
      if (!/^[0-9+\-*/.() ]+$/.test(input)) {
        setInput("Lỗi");
        return;
      }
      // eslint-disable-next-line no-eval
      const result = eval(input);
      setInput(String(result));
    } catch {
      setInput("Lỗi");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display} ref={containerRef}>
          <span
            className={styles.displayValue}
            ref={textRef}
            style={{ fontSize: displayFontSize + "px" }}
          >
            {input || "0"}
          </span>
        </div>
        <div className={styles.buttonGrid}>
          <button className={`${styles.button} ${styles.function}`} onClick={handleClear}>C</button>
          <button className={`${styles.button} ${styles.function}`} onClick={handleBackspace}>⌫</button>
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