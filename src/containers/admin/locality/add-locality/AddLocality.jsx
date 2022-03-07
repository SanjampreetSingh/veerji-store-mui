import { useState } from "react";
import { useHistory } from "react-router-dom";

import FormLocalityComponent from "../../../../components/admin/locality/form-locality/FormLocalityComponent";
import { addLocality } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";

export default function AddLocality() {
  const loading = useLoader();
  const history = useHistory();

  const formObj = Object.freeze({
    name: "",
  });

  const errorObj = Object.freeze({
    error: false,
    name: "",
  });

  const [error, setError] = useState(errorObj);
  const [formState, setFormState] = useState(formObj);
  const [submitError, setSubmitError] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    addLocality({ name: formState?.name })
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setSubmitError(res.error);
        } else {
          setResponse(res.data);
          setError({
            isError: false,
            errorMessage: "",
          });
          history.push("/admin/locality");
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

  const handleChange = (e) => {
    const name = e.target?.name;
    const value = e?.target?.value;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // updateErrorState(name, value)
  };

  return (
    <FormLocalityComponent
      response={response}
      error={error}
      submitError={submitError}
      formState={formState}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={false}
    />
  );
}
