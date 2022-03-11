import { useEffect, useState } from "react";

import {
  deleteSale,
  getAllSale,
  searchsale,
} from "../../../../services/services";
import ListOrderComponent from "../../../../components/admin/order/list-order/ListOrderComponent";
import { useLoader } from "../../../../context/loader/LoaderProvider";

export default function ListOrder() {
  const loading = useLoader();

  const [sale, setSale] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const loadOrders = () => {
    loading?.startLoader();
    getAllSale()
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

  function loadSearchData(search_key) {
    loading?.startLoader();
    searchsale(search_key)
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
  }

  useEffect(() => {
    if (search === "") {
      loadOrders();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = () => {
    if (search === "") {
      loadOrders();
    } else {
      loadSearchData(search);
    }
  };

  const deleteOrder = (id) => {
    loading?.startLoader();
    deleteSale(id)
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          loadOrders();
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
      id: "product_price",
      label: "Price Per Unit (₹)",
    },
    {
      id: "user_name",
      label: "Customer Name",
    },
    {
      id: "user_phone",
      label: "Customer Contact",
      format: (value) => (
        <a target="_blank" href={"tel:+91" + value} rel="noreferrer">
          {value}
        </a>
      ),
    },
    {
      id: "created",
      label: "Buy Date",
      format: (value) => dateFormatter(value),
    },
    {
      id: "edit",
      label: "Actions",
    },
  ];

  return (
    <ListOrderComponent
      page={page}
      order={sale}
      error={error}
      search={search}
      columns={columns}
      setSearch={setSearch}
      deleteOrder={deleteOrder}
      rowsPerPage={rowsPerPage}
      handleSearch={handleSearch}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
