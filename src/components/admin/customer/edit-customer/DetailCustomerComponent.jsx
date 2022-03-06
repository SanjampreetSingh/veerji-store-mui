import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function DetailCustomerComponent(props) {
  const { user } = props;
  return (
    <>
      <Grid item xs={6}>
        <Typography variant="subtitle2">
          Contact:{" "}
          <a href={"tel:+91-" + user?.phone} target="_blank" rel="noreferrer">
            +91-{user?.phone}
          </a>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle2">
          Email:{" "}
          <a href={"mailto:" + user?.email} target="_blank" rel="noreferrer">
            {user?.email}
          </a>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle2">
          Address:{" "}
          <a
            href={
              "http://maps.google.com/?q=:" +
              user?.house_number +
              " " +
              user?.locality_name
            }
            target="_blank"
            rel="noreferrer"
          >
            {user?.house_number + " " + user?.locality_name}
          </a>
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle2">
          Pending Payment: ₹{" " + user?.payment}
        </Typography>
      </Grid>
    </>
  );
}
