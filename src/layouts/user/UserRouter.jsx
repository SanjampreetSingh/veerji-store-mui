import { Route, Redirect } from "react-router-dom";

import { useAuth } from "../../context/auth/AuthProvider";
import { useLoader } from "../../context/loader/LoaderProvider";
import UserLayout from "./UserLayout";
import UserBackdrop from "../../components/user/common/backdrop/UserBackdrop";

export default function UserRouter({ component: Component, ...rest }) {
  const auth = useAuth();
  const loading = useLoader();

  if (auth?.state?.isAuthenticated === null) {
    return <></>;
  }

  if (auth?.state?.authType !== 2) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <UserBackdrop loading={loading?.loader} />
      {auth?.state?.isAuthenticated && auth?.state?.authType === 2 ? (
        <Route
          {...rest}
          render={(props) => (
            <UserLayout>
              <Component {...props} />
            </UserLayout>
          )}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
