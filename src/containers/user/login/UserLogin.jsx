import { useState } from "react";
import { useHistory } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { instance } from "../../../services/ApiCall";
import { getToken } from "../../../services/services";
import { useAuth } from "../../../context/auth/AuthProvider";
import { useLoader } from "../../../context/loader/LoaderProvider";
import UserLoginComponent from "../../../components/user/login/UserLoginComponent";

export default function UserLogin() {
  const history = useHistory();
  const auth = useAuth();
  const loading = useLoader();

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
  const [submitError, setSubmitError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [formState, setFormState] = useState(formObj);
  const [buttonloading, setButtonLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    loading?.startLoader();
    getToken({
      email: formState?.email,
      password: formState?.password,
    })
      .then((res) => {
        if (res?.error) {
          setSubmitError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
          loading?.stopLoader();
        } else {
          localStorage.setItem("access_token", res?.data?.access);
          localStorage.setItem("refresh_token", res?.data?.refresh);
          instance.defaults.headers["Authorization"] =
            "Bearer " + localStorage.getItem("access_token");
          const decoded = jwt_decode(localStorage.getItem("access_token"));
          setSubmitError({
            isError: false,
            errorMessage: "",
          });
          loading?.stopLoader();
          auth.update();
          setButtonLoading(false);
          if (decoded?.type === 1) {
            history.push("/admin");
          } else {
            history.push("/");
          }
        }
      })
      .catch((error) => {
        loading?.stopLoader();
        setButtonLoading(false);
        setSubmitError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  const updateErrorState = (name, value) => {
    let message = "";
    let errorVal = false;
    switch (name) {
      case "email":
        if (value.length === 0) {
          message = "Email cannot be empty.";
          errorVal = true;
        } else if (value.length <= 3) {
          message = "Email too short.";
          errorVal = true;
        } else if (
          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value) ===
          false
        ) {
          message = "Email is invalid.";
          errorVal = true;
        }
        setError((prev) => ({
          ...prev,
          error: errorVal,
          [name]: message,
        }));
        break;

      case "password":
        if (value.length === 0) {
          message = "Password cannot be empty.";
          errorVal = true;
        }
        setError((prev) => ({
          ...prev,
          error: errorVal,
          [name]: message,
        }));
        break;

      default:
        break;
    }

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const name = e.target?.name;
    const value = e?.target?.value?.trim();
    updateErrorState(name, value);
  };

  return (
    <UserLoginComponent
      error={error}
      submitError={submitError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      setSubmitError={setSubmitError}
      submitButtonLoading={buttonloading}
      formState={formState}
    />
  );
}
