/* eslint-disable jsx-a11y/iframe-has-title */
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function ResponsiveMap() {
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
          }}
        >
          Reach us
        </Typography>
        <CardMedia
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3424.3144524795516!2d75.8036958!3d30.8778632!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a8146052e6131%3A0xfd2081c026ecda8b!2sVeerji%20Departmental%20Store!5e0!3m2!1sen!2sin!4v1636117186185!5m2!1sen!2sin"
          sx={{
            height: "350px",
            width: "100%",
            border: 0,
          }}
          component="iframe"
          allowFullScreen=""
          loading="lazy"
          className="embed-responsive-item"
        ></CardMedia>
      </Container>
    </Box>
  );
}
