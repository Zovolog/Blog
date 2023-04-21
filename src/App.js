import "./App.css";
import { Main } from "./Components/Main";
import { createContext, useEffect, useState } from "react";
export const token = createContext();
function App() {
  const [accessToken, getAccessToken] = useState(sessionStorage.getItem("token"));

  return (
    <token.Provider
      value={{
        accessToken,
        getAccessToken,
      }}
    >
      <div className="App">
        <Main token={accessToken} />
      </div>
    </token.Provider>
  );
}

export default App;
