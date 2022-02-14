import { useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from "../../../context/auth/AuthProvider";
import { instance } from "../../../services/ApiCall";

export default function UserLogout() {
  const history = useHistory();
  let token = localStorage?.getItem("refresh_token");
  const auth = useAuth();

  useEffect(() => {
    if (token) {
      instance.post("user/logout/blacklist/", {
        refresh_token: token,
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      instance.defaults.headers["Authorization"] = null;
      auth.update();
    }
    history.push("/");
  });

  return <></>;
}
