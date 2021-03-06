import { useEffect, useState } from "react";

import {
  deleteSale,
  getAllSale,
  searchSale,
  filterSaleByCreated,
} from "../../../../services/services";
import ListOrderComponent from "../../../../components/admin/order/list-order/ListOrderComponent";
import { useLoader } from "../../../../context/loader/LoaderProvider";

export default function ListOrder() {
  const loading = useLoader();

  const [sale, setSale] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
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
    searchSale(search_key)
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

  function loadSaleByCreatedFilter(created_date) {
    loading?.startLoader();
    const date = created_date.toISOString().split("T")[0];
    filterSaleByCreated(date)
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

  const handleDateFilter = () => {
    if (dateFilter === null) {
      loadOrders();
    } else {
      loadSaleByCreatedFilter(dateFilter);
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
      label: "Price Per Unit (???)",
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
      deleteId={deleteId}
      setSearch={setSearch}
      deleteOpen={deleteOpen}
      dateFilter={dateFilter}
      setDeleteId={setDeleteId}
      deleteOrder={deleteOrder}
      rowsPerPage={rowsPerPage}
      handleSearch={handleSearch}
      setDeleteOpen={setDeleteOpen}
      setDateFilter={setDateFilter}
      handleOrderDelete={deleteOrder}
      handleDateFilter={handleDateFilter}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
