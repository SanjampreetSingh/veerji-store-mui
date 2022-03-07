import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import FormLocalityComponent from "../../../../components/admin/locality/form-locality/FormLocalityComponent";
import { editLocality, getLocality } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";

export default function EditLocality() {
  const loading = useLoader();
  const history = useHistory();

  let id = window.location.href.split("/").pop();
  const formObj = Object.freeze({
    name: "",
  });

  const [formState, setFormState] = useState(formObj);
  const [submitError, setSubmitError] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    editLocality(id, { name: formState?.name })
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
    const value = e?.target?.value?.trim();
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // updateErrorState(name, value)
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    loading?.startLoader();
    getLocality(id)
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setFormState((prev) => ({
            ...prev,
            name: res?.data?.name,
          }));
          setError({
            isError: false,
            errorMessage: "",
          });
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

  return (
    <FormLocalityComponent
      response={response}
      error={error}
      submitError={submitError}
      formState={formState}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={true}
    />
  );
}
