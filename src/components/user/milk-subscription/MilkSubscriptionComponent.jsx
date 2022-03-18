import DeliveryDetails from "./DeliveryDetails";
import UserHeroes from "./UserHeroes";

export default function MilkSubscriptionComponent(props) {
  const {
    open,
    sale,
    page,
    user,
    setOpen,
    columns,
    monthYear,
    rowsPerPage,
    showRazorpay,
    setMonthYear,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  return (
    <>
      <UserHeroes
        user={user}
        open={open}
        setOpen={setOpen}
        showRazorpay={showRazorpay}
      />
      <DeliveryDetails
        monthYear={monthYear}
        setMonthYear={setMonthYear}
        page={page}
        sale={sale}
        columns={columns}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
}
