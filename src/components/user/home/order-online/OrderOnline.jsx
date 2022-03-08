/* eslint-disable jsx-a11y/iframe-has-title */
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import zomato from "../../../../assets/images/order-online/zomato.jpg";
import swiggy from "../../../../assets/images/order-online/swiggy.jpg";

export default function OrderOnline() {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        pb: 6,
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          component="h2"
          variant="h2"
          align="center"
          color="text.secondary"
          gutterBottom
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            mb: 4,
          }}
        >
          Order Online
        </Typography>
        <Grid container spacing={2} sx={{ px: 3 }}>
          <Grid item md={6}>
            <a
              href="https://www.zomato.com/ludhiana/veer-ji-food-court-pakhowal-road/order"
              target="_blank"
              rel="noreferrer"
            >
              <Card>
                <CardMedia
                  src={zomato}
                  sx={{
                    width: "100%",
                    border: 0,
                  }}
                  component="img"
                  loading="lazy"
                  alt="Order on Zomato"
                />
              </Card>
            </a>
          </Grid>
          <Grid item md={6}>
            <a
              href="https://www.swiggy.com/restaurants/veer-ji-food-court-brs-nagar-ludhiana-489300"
              target="_blank"
              rel="noreferrer"
            >
              <Card variant="outlined">
                <CardMedia
                  src={swiggy}
                  sx={{
                    width: "100%",
                    border: 0,
                  }}
                  component="img"
                  loading="lazy"
                  alt="Order on Swiggy"
                />
              </Card>
            </a>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
