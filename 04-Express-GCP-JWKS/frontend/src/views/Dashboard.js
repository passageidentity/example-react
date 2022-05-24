import {useAuthStatus} from '../hooks/useAuthStatus';
import styles from '../styles/Dashboard.module.css';

function Dashboard() {
    const {isLoading, isAuthorized, message, GCP_API_GATEWAY_URL} = useAuthStatus();

    if (isLoading) {
        return null;
    }
    const authorizedBody = 
    <>
        You successfully logged in with Passage.
        <br/><br/>
        The following message is from the GCP API Gateway:
        <div style={{backgroundColor: '#D3D3D3', textAlign: 'center'}}>{GCP_API_GATEWAY_URL}</div>
        <br/><br/>
        <b>{message}</b>
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
