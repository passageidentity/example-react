import Banner from '../components/banner';
import styles from '../styles/Layout.module.css';

function Layout({children, authorized, bodyClass}){
  return(
    <div className={`${styles.bodyClass} ${bodyClass}`}>
      <Banner authorized={authorized}/>
      <div className={styles.mainContainerSizer}>
        <div className={styles.mainContainer}>
          {children}
        </div>
      </div>
      <div className={styles.mainFooter}></div>
    </div>
  );
}

export default Layout;