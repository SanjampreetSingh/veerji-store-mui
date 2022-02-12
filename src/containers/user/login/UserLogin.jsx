import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { instance } from "../../../services/ApiCall";
import { getToken } from "../../../services/services";
import UserLoginComponent from "../../../components/user/login/UserLoginComponent";

export default function UserLogin() {
  const history = useHistory();

  const formObj = Object.freeze({
    email: "",
    password: "",
  });

  const errorObj = Object.freeze({
    error: false,
    email: "",
    password: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(errorObj);
  const [submitError, setSubmitError] = useState("");
  const [formState, setFormState] = useState(formObj);

  const handleSubmit = (e) => {
    e.preventDefault();
    getToken({
      email: formState?.email,
      password: formState?.password,
    })
      .then((res) => {
        if (res?.error) {
          setSubmitError(res.error);
        } else {
          localStorage.setItem("access_token", res?.data?.access);
          localStorage.setItem("refresh_token", res?.data?.refresh);
          instance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
          const decoded = jwt_decode(localStorage.getItem("access_token"));
          if (decoded?.type === 1) {
            history.push("/admin");
          } else {
            history.push("/user");
          }
        }
      })
      .catch((error) => setSubmitError(error));
  };

  const handleChange = (e) => {
    const name = e.target?.name;
    const value = e?.target?.value?.trim();
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // updateErrorState(name, value)
  };

  return (
    <UserLoginComponent
      error={error}
      submitError={submitError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
