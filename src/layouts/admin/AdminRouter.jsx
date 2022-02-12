import { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

import AdminLayout from "./AdminLayout";

export default function AdminRouter({ component: Component, ...rest }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  let token = localStorage?.getItem("refresh_token");
  if (token === undefined || token === null || token === "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  useEffect(() => {
    if (token) {
      let decoded = jwt_decode(token);
      let tokenExpiration = decoded?.exp;
      let type = decoded?.type;
      let dateNow = new Date();

      if (tokenExpiration < dateNow.getTime() / 1000) {
        setIsAuthenticated(false);
      } else if (type !== 1) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <>
      {isAuthenticated ? (
        <Route
          {...rest}
          render={(props) => (
            <AdminLayout>
              <Component {...props} />
            </AdminLayout>
          )}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
