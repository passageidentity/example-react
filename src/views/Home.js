import "@passageidentity/passage-auth";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

function Home() {
  return (
    <Layout bodyClass={styles.bodyClass}>
      <div className={styles.mainContainer}>
      <div className={styles.earlyAccessContainer}>
        <div className={styles.title}>Experience the Passage Difference.</div>
        <div className={styles.spacer}></div>
        <div className={styles.bodyText}>Implement risk-free authentication with two lines of code.</div>
      </div>
      <div className={styles.authContainer}>
        <passage-auth app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-auth>
      </div>
    </div>
    </Layout>
  );
}
export default Home;
