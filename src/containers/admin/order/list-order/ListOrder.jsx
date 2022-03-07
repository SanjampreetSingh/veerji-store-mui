import { useEffect, useState } from "react";

import { deleteSale, getAllSale } from "../../../../services/services";
import ListOrderComponent from "../../../../components/admin/order/list-order/ListOrderComponent";

export default function ListOrder() {
  const [error, setError] = useState(false);
  const [sale, setSale] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllSale()
      .then((res) => {
        if (res?.error) {
          setError(res.error);
        } else {
          setSale(res?.data);
        }
      })
      .catch((error) => setError(error));
  };

  const deleteData = (id) => {
    deleteSale(id)
      .then((res) => {
        if (res?.error) {
          setError(res.error);
        } else {
          loadData();
        }
      })
      .catch((error) => setError(error));
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
      columns={columns}
      deleteData={deleteData}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
