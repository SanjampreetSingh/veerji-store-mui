import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../context/auth/AuthProvider";
import { useLoader } from "../../context/loader/LoaderProvider";
import AdminLayout from "./AdminLayout";
import UserBackdrop from "../../components/user/common/backdrop/UserBackdrop";

export default function AdminRouter({ component: Component, ...rest }) {
  const auth = useAuth();
  const loading = useLoader();

  if (auth?.state?.isAuthenticated === null) {
    return <></>;
  }

  if (auth?.state?.authType !== 1) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <UserBackdrop loading={loading?.loader} />
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
