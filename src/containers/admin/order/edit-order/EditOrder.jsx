import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  editSale,
  getSale,
  getAllListProducts,
  getAllListUsers,
} from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import FormOrderComponent from "../../../../components/admin/order/form-order/FormOrderComponent";

export default function EditOrder() {
  const loading = useLoader();
  const history = useHistory();

  let id = window.location.href.split("/").pop();
  const formObj = Object.freeze({
    user: "",
    product: "",
    quantity: "",
  });

  const [formState, setFormState] = useState(formObj);
  const [submitError, setSubmitError] = useState("");
  const [response, setResponse] = useState("");
  const [product, setProduct] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState({
    error: false,
    user: "",
    product: "",
    quantity: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loading?.startLoader();
    editSale(id, {
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
  const loadData = () => {
    loading?.startLoader();
    getSale(id)
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
            user: res?.data?.user,
            product: res?.data?.product,
            quantity: res?.data?.quantity,
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
    getAllProducts();
    getAllUsers();
    loadData();
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
      updateBool={true}
    />
  );
}
