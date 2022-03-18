import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

import PaymentModal from "./PaymentModal";

export default function UserHeroes(props) {
  const { user, open, setOpen, showRazorpay } = props;

  return (
    <>
      <PaymentModal
        open={open}
        setOpen={setOpen}
        pendingPayment={user?.payment}
      />
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          width: "100%",
        }}
      >
        <Typography align="center" color="text.primary">
          <PersonIcon
            color="primary"
            fontSize="inherit"
            sx={{
              fontSize: "60px",
              border: "2px solid",
              borderRadius: "50%",
              borderMargin: "5px",
            }}
          />
        </Typography>

        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Hi <em>{user?.name}</em>, now pay for your milk subscription online.
        </Typography>
        <Typography align="center">
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            justifyContent="center"
          >
            <Grid item component={Paper} variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle1">
                Contact:{" "}
                <a
                  href={"tel:+91-" + user?.phone}
                  target="_blank"
                  rel="noreferrer"
                >
                  +91-{user?.phone}
                </a>
              </Typography>
            </Grid>
            <Grid item component={Paper} variant="outlined" sx={{ p: 1 }}>
              {" "}
              <Typography variant="subtitle1">
                Email:{" "}
                <a
                  href={"mailto:" + user?.email}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user?.email}
                </a>
              </Typography>
            </Grid>
            <Grid item component={Paper} variant="outlined" sx={{ p: 1 }}>
              <Typography variant="subtitle1">
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
          </Stack>
        </Typography>

        <Stack
          sx={{ pt: 2 }}
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <Grid item component={Paper} elevation={3} sx={{ p: 1 }}>
            <Typography variant="subtitle1">
              Payment: ₹{" " + user?.payment}
            </Typography>
          </Grid>
          {user?.payment !== 0 ? (
            <>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Make Payment by UPI QR
              </Button>
              <Button variant="contained" onClick={showRazorpay}>
                Make Payment Online
              </Button>
            </>
          ) : null}
        </Stack>
      </Box>
    </>
  );
}
