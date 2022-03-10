import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { addProduct, getAllCategory } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import FormProductComponent from "../../../../components/admin/product/form-product/FormProductComponent";

export default function AddProduct() {
  const loading = useLoader();
  const history = useHistory();

  const formObj = Object.freeze({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const errorObj = Object.freeze({
    error: false,
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [formState, setFormState] = useState(formObj);
  const [response, setResponse] = useState("");
  const [category, setCategory] = useState([]);
  const [error, setError] = useState(errorObj);
  const [submitError, setSubmitError] = useState({
    isError: false,
    errorMessage: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    addProduct({
      name: formState?.name,
      price: formState?.price,
      category: formState?.category,
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
          history.push("/admin/product");
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

  const getAllCategories = () => {
    loading?.startLoader();
    getAllCategory()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError(res.error);
        } else {
          setCategory(res?.data);
        }
      })
      .catch((error) => {
        loading?.stopLoader();
        setError(error);
      });
  };

  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormProductComponent
      error={error}
      category={category}
      response={response}
      formState={formState}
      submitError={submitError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={false}
    />
  );
}
