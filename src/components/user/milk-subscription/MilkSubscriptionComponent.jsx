import DeliveryDetails from "./DeliveryDetails";
import UserHeroes from "./UserHeroes";

export default function MilkSubscriptionComponent(props) {
  const {
    user,
    monthYear,
    setMonthYear,
    page,
    sale,
    columns,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  return (
    <>
      <UserHeroes user={user} />
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
