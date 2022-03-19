import { useState } from "react";

import { useLoader } from "../../../context/loader/LoaderProvider";
import { addRecurringSale } from "../../../services/services";
import ActionComponent from "../../../components/admin/action/ActionComponent";

export default function Action() {
  const loading = useLoader();

  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const handleAddRecurringSale = () => {
    loading?.startLoader();
    addRecurringSale()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
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
    <ActionComponent
      handleAddRecurringSale={handleAddRecurringSale}
      error={error}
    />
  );
}
