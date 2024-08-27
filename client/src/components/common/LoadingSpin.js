import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpin = ({ size }) => {
  return (
    <p style={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: { size }, // Bạn có thể điều chỉnh chiều cao theo nhu cầu
        }}
      >
        <CircularProgress />
      </Box>
    </p>
  );
};
export default LoadingSpin;
