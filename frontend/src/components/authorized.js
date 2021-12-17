import styles from '../styles/Authorized.module.css';
import Layout from './layout';

function Authorized({username}){

  return (
    <Layout bodyClass={styles.bodyClass} authorized={true}>
      <div className={styles.mainContainer}>
        <div>
          <div className={styles.title}>Welcome!</div>
          <div className={styles.message}><b>{username}</b> successfully signed in with Passage.</div>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.imgContainer}>
          <img src="/launch.png" alt="People Celebrating"/>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.subMessage}>Implement risk-free authentication with two lines of code.</div>
      </div>
    </Layout>
  );
}

export default Authorized;