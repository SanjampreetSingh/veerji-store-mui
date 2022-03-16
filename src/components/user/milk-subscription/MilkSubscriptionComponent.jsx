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
    setMonthYear,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  return (
    <>
      <UserHeroes user={user} open={open} setOpen={setOpen} />
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
