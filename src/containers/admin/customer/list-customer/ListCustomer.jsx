import { useState, useEffect } from "react";

import {
  getAllUser,
  searchUser,
  getAllLocalities,
  filterUserByLocality,
} from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import ListCustomerComponent from "../../../../components/admin/customer/list-customer/ListCustomerComponent";

export default function ListCustomer() {
  // TODO: need to add filter, sort and error display
  const loading = useLoader();

  const [page, setPage] = useState(0);
  const [user, setUser] = useState([]);
  const [locality, setLocality] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterOption, setFilterOption] = useState("");
  const [search, setSearch] = useState("");
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

  function loadSearchData(search_key) {
    loading?.startLoader();
    searchUser(search_key)
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

  function loadUserByLocalityFilter(locality_id) {
    loading?.startLoader();
    filterUserByLocality(locality_id)
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
    if (search === "") {
      loadData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleSearch = () => {
    if (search === "") {
      loadData();
    } else {
      loadSearchData(search);
    }
  };

  useEffect(() => {
    if (filterOption === "") {
      loadData();
    } else {
      loadUserByLocalityFilter(filterOption);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterOption]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableColumnProperty = [
    { id: "name", label: "Name", minWidth: 100 },
    {
      id: "email",
      label: "Email",
      minWidth: 100,
      format: (value) => (
        <a target="_blank" href={"mailto:" + value} rel="noreferrer">
          {value}
        </a>
      ),
    },
    {
      id: "phone",
      label: "Phone",
      minWidth: 100,
      format: (value) => (
        <a target="_blank" href={"tel:+91" + value} rel="noreferrer">
          {value}
        </a>
      ),
    },
    {
      id: "house_number",
      label: "House No.",
      minWidth: 55,
    },
    {
      id: "locality_name",
      label: "Locality",
      minWidth: 100,
    },
    {
      id: "payment",
      label: "Pending Payment",
      minWidth: 55,
    },
    {
      id: "edit",
      label: "Action",
      minWidth: 10,
    },
  ];

  const handleFilterOptionsChange = (event) => {
    setFilterOption(event.target.value);
  };

  const loadLocality = () => {
    loading?.startLoader();
    getAllLocalities()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setLocality(res?.data);
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
    loadLocality();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListCustomerComponent
      user={user}
      page={page}
      error={error}
      search={search}
      locality={locality}
      rowsPerPage={rowsPerPage}
      filterOption={filterOption}
      columns={tableColumnProperty}
      setSearch={setSearch}
      handleSearch={handleSearch}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
      handleFilterOptionsChange={handleFilterOptionsChange}
    />
  );
}
