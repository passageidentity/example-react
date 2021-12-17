import styles from '../styles/Unauthorized.module.css';
import Layout from './layout';

function Unauthorized(){
  return (
    <Layout bodyClass={styles.bodyClass}>
      <div className={styles.mainContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.messageContainer}>
            <div className={styles.title}>Oops</div>
            <div className={styles.message}>Unauthorized login.</div>
          </div>
          <div className={styles.bodyImage}>
            <div className={styles.imgContainer}>
              <img src="/error.png" alt="People Celebrating"/>
            </div>
          </div>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.returnHome}>Return to home to <a href='/' className={styles.link}>sign up</a></div>
      </div>
    </Layout>
  );
}

export default Unauthorized;