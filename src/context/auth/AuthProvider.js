import { useEffect, useState, useContext } from "react";
import jwt_decode from "jwt-decode";

import AuthContext from "./AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = (props) => {
  const state = {
    isAuthenticated: false,
    authType: null,
  };

  const [authState, setAuthState] = useState(state);

  let token = localStorage?.getItem("refresh_token");

  if (token === undefined || token === null || token === "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  const updateAuth = () => {
    token = localStorage?.getItem("refresh_token");

    if (token === undefined || token === null || token === "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    if (token) {
      let decoded = jwt_decode(token);
      let tokenExpiration = decoded?.exp;
      let type = decoded?.type;
      let dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setAuthState(state);
      } else {
        setAuthState({
          isAuthenticated: true,
          authType: type,
        });
      }
    } else {
      setAuthState(state);
    }
  };

  useEffect(() => {
    updateAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ state: authState, update: updateAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
