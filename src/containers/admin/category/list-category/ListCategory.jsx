import { useEffect, useState } from "react";

import { getAllCategory } from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import ListCategoryComponent from "../../../../components/admin/category/list-category/ListCategoryComponent";

export default function ListCategory() {
  const loading = useLoader();

  const [category, setCategory] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });

  const loadCategory = () => {
    loading?.startLoader();
    getAllCategory()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setCategory(res?.data);
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
    loadCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    {
      id: "name",
      label: "Category Name",
    },
    {
      id: "description",
      label: "Category Description",
    },
    {
      id: "edit",
      label: "Actions",
    },
  ];

  return (
    <ListCategoryComponent
      page={page}
      category={category}
      error={error}
      columns={columns}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
