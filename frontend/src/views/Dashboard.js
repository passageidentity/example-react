import Cookie from "js-cookie";
import { useAuthStatus } from "../models/hooks/useAuthStatus";

function Dashboard(){

  const { isLoading, isAuthorized, userEmail } = useAuthStatus();

  function loading() {
    return (
      <div className="material-icons loading">
        loop
      </div>
    );
  }

  function logout() {
    Cookie.remove("psg_auth_token");
    localStorage.removeItem("psg_auth_token");
  }

  function authorized(email) {
    return (
      <div id="authorized">
        <div className="header">
          <span id="userEmail">{email}</span> signed in
          <br />
          with <strong>Passage.</strong>
        </div>
        <div className="img-container">
          <img src="assets/launch.png" alt="People Celebrating" />
        </div>
        <div className="footer">
          <a href="/">
            <button className="btn btn-lg" onClick={logout}>
              Log Out
            </button>
          </a>
        </div>
      </div>
    );
  }

  function unauthorized(){
    return (
      <div id="unauthorized">
        <div className="header">
          oops
          <br />
          you are <strong>Unauthorized.</strong>
        </div>

        <div className="img-container">
          <img src="./assets/error.png" alt="People Sad" />
        </div>

        <div className="footer">
          Sign in or register for an account to proceed.
          <br />
          <a href="/">
            <button className="btn btn-lg">Sign In or Register</button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-poly"></div>
      { isLoading ? loading() : isAuthorized ? authorized(userEmail) : unauthorized() }
    </>
  )
};

export default Dashboard;
