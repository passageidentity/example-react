import {useCurrentUser} from '../hooks/useCurrentUser';
import styles from '../styles/Dashboard.module.css';
import '@passageidentity/passage-elements/passage-profile';

function Dashboard() {
    const {isLoading, isAuthorized} = useCurrentUser();

    if (isLoading) {
        return null;
    }
    const authorizedBody = 
    <>
        You successfully signed in with Passage.
        <br/><br/>
        <passage-profile app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-profile>
    </>

    const unauthorizedBody = 
    <>
        You have not logged in and cannot view the dashboard.
        <br/><br/>
        <a href="/" className={styles.link}>Login to continue.</a>
    </>

    return (
        <div className={styles.dashboard}>
            <div className={styles.title}>{isAuthorized ? 'Welcome!' : 'Unauthorized'}</div>
            <div className={styles.message}>
                { isAuthorized ? authorizedBody : unauthorizedBody }
            </div>
        </div>
    );

}

export default Dashboard;