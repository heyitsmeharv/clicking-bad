import React, { useState, useEffect } from "react";

import cookie from "./resources/images/cookie.png";

function App() {
  const [cookies, setCookies] = useState(0);
  const [clickValue, setClickValue] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCookies(cookies + clickValue);
    }, 1000);
    return () => clearInterval(timer);
  }, [cookies]);

  const handleClick = () => {
    setCookies(cookies + clickValue);
  };

  return (
    <div className="App">
      <div className="cookie-container">
        <button onClick={handleClick}>
          <img src={cookie} alt="cookie" />
        </button>
        <div className="cookie-count">{cookies} cookies</div>
      </div> 
    </div>
  );
}

export default App;