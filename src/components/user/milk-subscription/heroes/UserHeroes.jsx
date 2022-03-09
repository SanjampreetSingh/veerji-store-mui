import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";

export default function UserHeroes(props) {
  const { user } = props;

  return (
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
            fontSize: "80px",
            border: "2px solid",
            borderRadius: "50%",
            borderMargin: "5px",
          }}
        />
      </Typography>
      <Typography
        component="h4"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Veerji Departmental Store
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Hi <em>{user?.name}</em>, now pay for your milk subscription online.
      </Typography>
    </Box>
  );
}
