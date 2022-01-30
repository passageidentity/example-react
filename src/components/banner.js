import { useHistory } from 'react-router-dom';
import styles from '../styles/Banner.module.css';

function Banner({authorized}){

  const router = useHistory();

  function logout(){
    document.cookie = "psg_auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("psg_auth_token");
    router.push('/');
  }

  function logoutButton(){
    if(!authorized){
      return null;
    }
    return(
      <div className={styles.logout} onClick={logout}>Logout</div>
    );
  }

  return(
    <div className={styles.mainHeader}>
      <a href="https://passage.id/"><div className={styles.passageLogo}></div></a>
      <div className={styles.spacer}></div>
      <div className={styles.links}>
      {logoutButton()}
      <a href="https://passage.id/"><div className={styles.home}><span className={styles.text}>Go to Passage</span><div className={styles.icon}></div></div></a>
      </div>
    </div>
  );
}

export default Banner;