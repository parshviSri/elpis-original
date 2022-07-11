import styles from "../styles/Home.module.css";
import Header from "./components/header";
import Landing from "./components/landing";
import Footer from "./components/footer";
export default function Home() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <Landing />
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
