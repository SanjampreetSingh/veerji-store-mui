import { Route, Redirect } from "react-router-dom";

import LoginLayout from "./LoginLayout";
import { useAuth } from "../../context/auth/AuthProvider";
import { useLoader } from "../../context/loader/LoaderProvider";
import UserBackdrop from "../../components/user/common/backdrop/UserBackdrop";

export default function LoginRouter({
  heading,
  component: Component,
  ...rest
}) {
  const auth = useAuth();
  const loading = useLoader();

  if (auth === null) {
    return <></>;
  }

  return (
    <>
      <UserBackdrop loading={loading?.loader} />
      {!auth?.state?.isAuthenticated ? (
        <Route
          {...rest}
          render={(props) => (
            <LoginLayout heading={heading}>
              <Component {...props} />
            </LoginLayout>
          )}
        />
      ) : auth?.state?.authType === 1 ? (
        <Redirect to="/admin" />
      ) : (
        <Redirect to="/user" />
      )}
    </>
  );
}
