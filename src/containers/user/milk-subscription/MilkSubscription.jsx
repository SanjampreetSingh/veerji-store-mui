import { useState, useEffect } from "react";

import MilkSubscriptionComponent from "../../../components/user/milk-subscription/MilkSubscriptionComponent";
import { getUserDetails } from "../../../services/services";
import { useLoader } from "../../../context/loader/LoaderProvider";

export default function MilkSubscription() {
  const loading = useLoader();

  const [user, setUser] = useState({});
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const getUser = () => {
    loading?.startLoader();
    getUserDetails()
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
  };

  useEffect(() => {
    getUser();
  }, []);

  return <MilkSubscriptionComponent user={user} error={error} />;
}
