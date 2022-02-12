import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

export default function UserFooter() {
  return (
    <Box
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
    >
      <Grid container justifyContent="center" alignContent="center">
        <Grid item sx={{ display: { xs: "none", md: "block" } }} md={4}>
          <Typography variant="h6" color="text.secondary" align="center">
            {"© " + new Date().getFullYear()} &nbsp;
            <Link
              color="inherit"
              href="https://veerji.store/"
              underline="hover"
            >
              Veerji Departmental Store, Ldh
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "12", md: "none" } }}>
          <Typography align="center">
            <Link href="https://veerji.store/">
              <ShoppingBasketIcon />
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
