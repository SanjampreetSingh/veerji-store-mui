import { useEffect, useState } from "react";

import {
  getAllProduct,
  searchProduct,
  getAllCategory,
  filterProductByCategory,
} from "../../../../services/services";
import { useLoader } from "../../../../context/loader/LoaderProvider";
import ListProductComponent from "../../../../components/admin/product/list-product/ListProductComponent";

export default function ListProduct() {
  const loading = useLoader();

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterCategory, setFilterCategory] = useState("");
  const [error, setError] = useState({
    isError: false,
    errorMessage: "",
  });
  const [loadError, setLoadError] = useState({
    isError: false,
    errorMessage: "",
  });

  const loadProducts = () => {
    loading?.startLoader();
    getAllProduct()
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setProduct(res?.data);
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
    searchProduct(search_key)
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setProduct(res?.data);
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

  const loadCategoryData = () => {
    getAllCategory()
      .then((res) => setCategory(res?.data))
      .catch((error) => {
        loading?.stopLoader();
        setLoadError({
          isError: true,
          errorMessage: JSON.stringify(error?.response?.data),
        });
      });
  };

  function loadProductByCategoryFilter(locality_id) {
    loading?.startLoader();
    filterProductByCategory(locality_id)
      .then((res) => {
        loading?.stopLoader();
        if (res?.error) {
          setError({
            isError: true,
            errorMessage: JSON.stringify(res?.error?.response?.data),
          });
        } else {
          setProduct(res?.data);
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
      loadProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    loadCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (filterCategory === "") {
      loadProducts();
    } else {
      loadProductByCategoryFilter(filterCategory);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategory]);

  const handleSearch = () => {
    if (search === "") {
      loadProducts();
    } else {
      loadSearchData(search);
    }
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
      id: "name",
      label: "Product Name",
    },
    {
      id: "description",
      label: "Product Description",
    },
    {
      id: "category_name",
      label: "Category",
    },
    {
      id: "price",
      label: "Price Per Unit (₹)",
    },
    {
      id: "edit",
      label: "Actions",
    },
  ];

  return (
    <ListProductComponent
      page={page}
      error={error}
      search={search}
      product={product}
      columns={columns}
      category={category}
      loadError={loadError}
      setSearch={setSearch}
      rowsPerPage={rowsPerPage}
      handleSearch={handleSearch}
      filterCategory={filterCategory}
      handleChangePage={handleChangePage}
      setFilterCategory={setFilterCategory}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
