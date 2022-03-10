import { useState, useEffect } from "react";

import MilkSubscriptionComponent from "../../../components/user/milk-subscription/MilkSubscriptionComponent";
import { getUserDetails, getSalePerMonth } from "../../../services/services";
import { useLoader } from "../../../context/loader/LoaderProvider";

export default function MilkSubscription() {
  const loading = useLoader();

  const [user, setUser] = useState({});
  const [sale, setSale] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [monthYear, setMonthYear] = useState(new Date());
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

  const getSale = (month, year) => {
    loading?.startLoader();
    getSalePerMonth(month, year)
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setSale(res?.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSale("0" + (monthYear.getMonth() + 1), monthYear.getFullYear());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthYear]);

  const dateFormatter = (value) => {
    return new Date(value).toISOString().split("T")[0];
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    {
      id: "product_name",
      label: "Product Name",
    },
    {
      id: "quantity",
      label: "Quantity",
    },
    {
      id: "created",
      label: "Buy Date",
      format: (value) => dateFormatter(value),
    },
  ];

  return (
    <MilkSubscriptionComponent
      page={page}
      sale={sale}
      user={user}
      error={error}
      monthYear={monthYear}
      columns={columns}
      setMonthYear={setMonthYear}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
