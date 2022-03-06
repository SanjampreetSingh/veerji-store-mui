import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import {
  getUser,
  updateUser,
  getAllLocality,
  getAllListProducts,
} from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import { generateRecurringId } from "../../../../utils/common/common";
import EditCustomerComponent from "../../../../components/admin/customer/edit-customer/EditCustomerComponent";

export default function EditCustomer() {
  let { userId } = useParams();
  const loading = useLoader();
  const history = useHistory();

  const recurringObj = {
    recurringIndex: "",
    productId: "",
    quantity: "",
  };

  const formObj = Object.freeze({
    name: "",
    email: "",
    phone: "",
    house_number: "",
    locality: "",
    locality_name: "",
    payment: "",
    recurring_product: "[]",
  });

  const errorObj = Object.freeze({
    error: false,
    name: "",
    email: "",
    phone: "",
    house_number: "",
    locality: "",
    payment: "",
    recurring_product: "[]",
  });

  const [loadError, setLoadError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [submitError, setSubmitError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [error, setError] = useState(errorObj);
  const [user, setUser] = useState(formObj);
  const [product, setProduct] = useState([]);
  const [recurringProduct, setRecurringProduct] = useState([]);
  const [locality, setLocality] = useState([]);
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    loadUserData();
    loadProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(
    (e) => {
      handleUserFormChange(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [recurringProduct]
  );

  useEffect(() => {
    loadUserData();
    loadLocalityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editButton]);

  const loadUserData = () => {
    loading?.startLoader();
    getUser(userId)
      .then((res) => {
        loading?.stopLoader();
        setUser((prev) => ({
          ...prev,
          name: res?.data?.name,
          email: res?.data?.email,
          phone: res?.data?.phone,
          house_number: res?.data?.house_number,
          locality: res?.data?.locality,
          locality_name: res?.data?.locality_name,
          payment: res?.data?.payment,
          recurring_product: JSON.parse(res?.data?.recurring_product),
        }));
        setRecurringProduct(JSON.parse(res?.data?.recurring_product));
      })
      .catch((error) => {
        loading?.stopLoader();
        setLoadError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  const loadProductData = () => {
    getAllListProducts()
      .then((res) => setProduct(res?.data))
      .catch((error) => {
        loading?.stopLoader();
        setLoadError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  const loadLocalityData = () => {
    getAllLocality()
      .then((res) => setLocality(res?.data))
      .catch((error) => {
        loading?.stopLoader();
        setLoadError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  const handleSubmit = () => {
    loading?.startLoader();
    updateUser(userId, user)
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setSubmitError(res.error);
        } else {
          setEditButton(false);
          history.push("/admin/customer/" + userId);
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

  const handleRecurringArray = (key, idx = "", obj = recurringObj) => {
    switch (key) {
      case "add":
        obj.recurringIndex = generateRecurringId();
        setRecurringProduct((prev) => [...prev, obj]);
        break;
      case "delete":
        setRecurringProduct(
          recurringProduct?.filter((item) => item?.recurringIndex !== idx)
        );
        break;
      default:
        break;
    }
  };

  const handleRecurringObj = (idx, key, value) => {
    const objIndex = recurringProduct?.findIndex(
      (obj) => obj.recurringIndex === idx
    );
    const updatedObj = JSON.parse(JSON.stringify(recurringProduct[objIndex]));
    updatedObj[key] = value;
    setRecurringProduct((item) => [
      ...item.slice(0, objIndex),
      updatedObj,
      ...item.slice(objIndex + 1),
    ]);
  };

  const handleUserFormChange = (e) => {
    const name = e?.target?.name;
    const value = e?.target?.value;
    setUser((prev) => ({
      ...prev,
      [name]: value,
      recurring_product: JSON.stringify(recurringProduct),
    }));
    // updateErrorState(name, value)
  };

  return (
    <EditCustomerComponent
      user={user}
      error={error}
      product={product}
      locality={locality}
      loadError={loadError}
      submitError={submitError}
      recurringProduct={recurringProduct}
      handleSubmit={handleSubmit}
      handleRecurringObj={handleRecurringObj}
      handleRecurringArray={handleRecurringArray}
      handleUserFormChange={handleUserFormChange}
      editButton={editButton}
      setEditButton={setEditButton}
    />
  );
}
