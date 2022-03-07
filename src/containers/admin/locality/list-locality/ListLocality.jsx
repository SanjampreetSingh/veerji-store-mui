import { useState, useEffect } from "react";

import ListLocalityComponent from "../../../../components/admin/locality/list-locality/ListLocalityComponent";
import { getAllLocality } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";

export default function ListLocality() {
  const loading = useLoader();

  const [page, setPage] = useState(0);
  const [locality, setLocality] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const loadData = () => {
    loading?.startLoader();
    getAllLocality()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setLocality(res?.data);
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
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableColumnProperty = [
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      format: (value) => (
        <a
          target="_blank"
          href={"http://maps.google.com/?q=" + value}
          rel="noreferrer"
        >
          {value}
        </a>
      ),
    },
    {
      id: "edit",
      label: "Action",
      minWidth: 10,
    },
  ];

  return (
    <ListLocalityComponent
      page={page}
      getError={error}
      locality={locality}
      rowsPerPage={rowsPerPage}
      columns={tableColumnProperty}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
