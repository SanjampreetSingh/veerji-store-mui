import { useState } from "react";
import { useHistory } from "react-router-dom";

import { addCategory } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import FormCategoryComponent from "../../../../components/admin/category/form-category/FormCategoryComponent";

export default function AddCategory() {
  const loading = useLoader();
  const history = useHistory();

  const formObj = Object.freeze({
    name: "",
    description: "",
  });

  const errorObj = Object.freeze({
    error: false,
    name: "",
    description: "",
  });

  const [formState, setFormState] = useState(formObj);
  const [response, setResponse] = useState("");
  const [error] = useState(errorObj);
  const [submitError, setSubmitError] = useState({
    isError: false,
    errorMessage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    addCategory({
      name: formState?.name,
      description: formState?.description,
    })
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setSubmitError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setResponse(res.data);
          setSubmitError({
            isError: false,
            errorMessage: "",
          });
          history.push("/admin/category");
        }
      })
      .catch((error) => {
        loading?.stopLoader();
        setSubmitError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  const handleChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // updateErrorState(name, value)
  };

  return (
    <FormCategoryComponent
      error={error}
      response={response}
      formState={formState}
      submitError={submitError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={false}
    />
  );
}
