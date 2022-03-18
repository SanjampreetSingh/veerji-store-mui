import { useState, useEffect } from "react";

import MilkSubscriptionComponent from "../../../components/user/milk-subscription/MilkSubscriptionComponent";
import {
  startPayment,
  getUserDetails,
  getSalePerMonth,
} from "../../../services/services";
import { useLoader } from "../../../context/loader/LoaderProvider";

export default function MilkSubscription() {
  const loading = useLoader();

  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);
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
      id: "product_price",
      label: "Price Per Unit (₹)",
    },
    {
      id: "created",
      label: "Buy Date",
      format: (value) => dateFormatter(value),
    },
  ];

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const showRazorpay = async (e) => {
    await loadScript();
    loading?.startLoader();
    const data = await startPayment()
      .then((res) => {
        loading?.stopLoader();
        return res;
      })
      .catch((error) => {
        loading?.stopLoader();
        console.log(error?.response?.data);
      });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user
    var options = {
      key_id: process.env.REACT_APP_PAYMENT_PUBLIC_KEY,
      key_secret: process.env.REACT_APP_PAYMENT_SECRET_KEY,
      amount: data?.payment?.toString(),
      currency: "INR",
      name: "Veerji Departmental Store",
      description: "Pay for your milk subscription online.",
      image: "https://www.veerji.store/icon.png",
      order_id: data?.data?.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        // handlePaymentSuccess(response);
        console.log(1);
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: user?.phone,
      },
      notes: {
        address:
          "Veerji Departmental Store, G Block SBS Nagar, Pakhowal Road, Ludhiana",
      },
      theme: {
        color: "#5048E5",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    e.preventDefault();
  };

  return (
    <MilkSubscriptionComponent
      open={open}
      page={page}
      sale={sale}
      user={user}
      error={error}
      setOpen={setOpen}
      columns={columns}
      monthYear={monthYear}
      rowsPerPage={rowsPerPage}
      showRazorpay={showRazorpay}
      setMonthYear={setMonthYear}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}
