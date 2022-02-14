import { useState, useEffect } from "react";

import { getAllUser } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import ListCustomerComponent from "../../../../components/admin/customer/list-customer/ListCustomerComponent";

export default function ListCustomer() {
  // TODO: need to add filter, sort and error display
  const loading = useLoader();

  const [user, setUser] = useState([]);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  function loadData() {
    loading?.startLoader();
    getAllUser()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setUser(res?.data);
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
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ListCustomerComponent user={user} error={error} />;
}
