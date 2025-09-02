import React, { createContext, useEffect, useState } from "react";
import { getRegisterUserAPI } from "../Services/allAPI";

export const tokenAuthContext = createContext();
export const adminTokenAuthContext = createContext();

function TokenAuth({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [adminIsAuthorized, setAdminIsAuthorized] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (localStorage.getItem("user") == "false") {
      setAdminIsAuthorized(true);
    } else {
      setAdminIsAuthorized(false);
    }
  }, [adminIsAuthorized]);

  return (
    <div>
      <adminTokenAuthContext.Provider
        value={{ adminIsAuthorized, setAdminIsAuthorized }}
      >
        <tokenAuthContext.Provider value={{ isAuthorized, setIsAuthorized }}>
          {children}
        </tokenAuthContext.Provider>
      </adminTokenAuthContext.Provider>
    </div>
  );
}

export default TokenAuth;
