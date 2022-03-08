import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  addSale,
  getAllListProducts,
  getAllListUsers,
} from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import FormOrderComponent from "../../../../components/admin/order/form-order/FormOrderComponent";

export default function AddOrder() {
  const loading = useLoader();
  const history = useHistory();

  const formObj = Object.freeze({
    user: "",
    product: "",
    quantity: "",
  });

  const errorObj = Object.freeze({
    error: false,
    user: "",
    product: "",
    quantity: "",
  });

  const [error, setError] = useState(errorObj);
  const [formState, setFormState] = useState(formObj);
  const [submitError, setSubmitError] = useState("");
  const [response, setResponse] = useState("");
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    addSale({
      user: formState?.user,
      product: formState?.product,
      quantity: formState?.quantity,
    })
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
          history.push("/admin/order");
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

  const handleChange = (name, value) => {
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    // updateErrorState(name, value)
  };

  const getAllProducts = () => {
    loading?.startLoader();
    getAllListProducts()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError(res.error);
        } else {
          setProduct(res?.data);
        }
      })
      .catch((error) => {
        loading?.stopLoader();
        setError(error);
      });
  };

  const getAllUsers = () => {
    loading?.startLoader();
    getAllListUsers()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError(res.error);
        } else {
          setUser(res?.data);
        }
      })
      .catch((error) => {
        loading?.stopLoader();
        setError(error);
      });
  };

  useEffect(() => {
    getAllProducts();
    getAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormOrderComponent
      user={user}
      error={error}
      product={product}
      response={response}
      formState={formState}
      submitError={submitError}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      updateBool={false}
    />
  );
}
