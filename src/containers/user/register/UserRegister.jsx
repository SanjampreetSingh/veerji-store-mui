import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import UserRegisterComponent from "../../../components/user/register/UserRegisterComponent";
import { getAllLocalities, addUser } from "../../../services/services";
import { useAuth } from "../../../context/auth/AuthProvider";
import { useLoader } from "../../../context/loader/LoaderProvider";

export default function UserRegister() {
  const loading = useLoader();
  const history = useHistory();
  const auth = useAuth();

  const formObj = Object.freeze({
    name: "",
    email: "",
    password: "",
    phone: "",
    house_number: "",
    locality: "",
  });

  const errorObj = Object.freeze({
    error: false,
    name: "",
    email: "",
    password: "",
    phone: "",
    house_number: "",
    locality: "",
  });

  const [locality, setLocality] = useState([]);
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
    addUser({
      name: formState?.name,
      email: formState?.email,
      password: formState?.password,
      phone: formState?.phone,
      house_number: formState?.house_number,
      locality: formState?.locality,
    })
      .then((res) => {
        if (res?.error) {
          setSubmitError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          auth.update();
          setButtonLoading(false);
          history.push("/login");
        }
      })
      .catch((error) => {
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
      case "name":
        if (value.length === 0) {
          errorVal = true;
          message = "Name cannot be empty.";
        } else if (value.trim().length <= 3) {
          errorVal = true;
          message = "Name too short. Name must be more the 3 characters.";
        }
        setError((prev) => ({
          ...prev,
          error: errorVal,
          [name]: message,
        }));
        break;

      case "email":
        if (value.length === 0) {
          message = "Email cannot be empty.";
          errorVal = true;
        } else if (value.length <= 3) {
          message = "Email is too short.";
          errorVal = true;
        } else if (
          /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(value) ===
          false
        ) {
          errorVal = true;
          message = "Email is invalid.";
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
        } else if (value.length <= 8) {
          message = "Password is too short.";
          errorVal = true;
        }
        setError((prev) => ({
          ...prev,
          error: errorVal,
          [name]: message,
        }));
        break;

      case "phone":
        if (value.length === 0) {
          message = "Phone number cannot be empty.";
          errorVal = true;
        } else if (value.length <= 9) {
          message = "Phone number is too short.";
          errorVal = true;
        } else if (value.length >= 11) {
          message = "Phone number must be 10 digit.";
          errorVal = true;
        }
        setError((prev) => ({
          ...prev,
          error: errorVal,
          [name]: message,
        }));
        break;

      case "house_number":
        if (value.length === 0) {
          message = "House Number cannot be empty.";
          errorVal = true;
        }
        setError((prev) => ({
          ...prev,
          error: errorVal,
          [name]: message,
        }));
        break;
      case "locality":
        if (value.length === 0 || value === "") {
          message = "Locality must be selected.";
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
    const value = e?.target?.value;
    updateErrorState(name, value);
  };

  const loadLocality = () => {
    loading?.startLoader();
    getAllLocalities()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setLocality(res?.data);
        }
      })
      .catch((error) => {
        loading?.stopLoader();
        setError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  useEffect(() => {
    loadLocality();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserRegisterComponent
      locality={locality}
      error={error}
      formState={formState}
      submitError={submitError}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      setSubmitError={setSubmitError}
      submitButtonLoading={buttonloading}
    />
  );
}
