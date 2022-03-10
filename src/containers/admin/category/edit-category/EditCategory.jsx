import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { getCategory, editCategory } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import FormCategoryComponent from "../../../../components/admin/category/form-category/FormCategoryComponent";

export default function EditCategory() {
  const loading = useLoader();
  const history = useHistory();

  let id = window.location.href.split("/").pop();
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
  const [error, setError] = useState(errorObj);
  const [submitError, setSubmitError] = useState({
    isError: false,
    errorMessage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    editCategory(id, {
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

  const loadData = () => {
    loading?.startLoader();
    getCategory(id)
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
            description: res?.data?.description,
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

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormCategoryComponent
      error={error}
      response={response}
      formState={formState}
      submitError={submitError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={true}
    />
  );
}
