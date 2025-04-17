import styles from "./App.module.css";

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <h1>Morse Code Practice</h1>
      </header>

      <main className={styles.appMain}>
        <p>Let's start practicing!</p>

        <div className={styles.card}>asd</div>
      </main>
    </div>
  );
}
