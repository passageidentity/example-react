import React from "react";

function Home() {
  return (
    <div>
      <div className="bg-poly"></div>
      <div className="header">
        build amazing things
        <br />
        with <strong>Passage.</strong>
      </div>

      <div className="form-container">
        <passage-auth
          app-id={process.env.REACT_APP_PASSAGE_APP_ID}
        />
      </div>

      <div className="footer">
        Implement awesome authentication with two lines of code.
        <br />
        <a href="https://passage.id">
          <button className="btn btn-lg">Request Early Access</button>
        </a>
      </div>
    </div>
  );
}
export default Home;
