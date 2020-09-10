import React from "react";

function Fallback() {
  return (
    <div>
      <div className="fallback-div">
        <h1 className="header-message">Error - 404</h1>
        <h5 className="text-message">
          The page you are looking for is not available
        </h5>
      </div>
    </div>
  );
}

export default Fallback;
