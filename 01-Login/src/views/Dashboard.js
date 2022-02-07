import {useCurrentUser} from '../hooks/useCurrentUser';
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    const {isLoading, isAuthorized, username} = useCurrentUser();

    if (isLoading) {
        return null;
    }
    if (isAuthorized) {
        return (
            <div className={styles.dashboard}>
                <div className={styles.title}>Welcome!</div>
                <div className={styles.message}>
                    You successfully signed in with Passage.
                    <br/><br/>
                    Your email is: <b>{username}</b>
                </div>
            </div>
        )
    }
    return (
        <div className={styles.dashboard}>
            <div className={styles.title}>Unauthorized</div>
            <div className={styles.message}>
                You have not logged in and cannot view the dashboard.
                <br/><br/>
                <a href="/" className={styles.link}>Login to continue.</a>
            </div>
        </div>
    ); 

}

export default Dashboard;