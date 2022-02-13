import { Route, Redirect } from "react-router-dom";

import AdminLayout from "./AdminLayout";
import { useAuth } from "../../context/auth/AuthProvider";

export default function AdminRouter({ component: Component, ...rest }) {
  const auth = useAuth();

  if (auth?.state?.isAuthenticated === null) {
    return <></>;
  }

  if (auth?.state?.authType !== 1) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      {auth?.state?.isAuthenticated ? (
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
