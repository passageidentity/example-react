import { useAuthStatus } from "../models/hooks/useAuthStatus";
import Unauthorized from "../components/unauthorized";
import Authorized from "../components/authorized";

function Dashboard() {
  const { isLoading, isAuthorized, username } = useAuthStatus();

  if(isLoading){
    return null;
  }
  if(!isAuthorized){
    return <Unauthorized />;
  }
  return <Authorized username={username}/>;
}

export default Dashboard;
