import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "../../theme";

export default function EditPanel() {
  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
        bgcolor: "#FFFFFF",
        borderRight: `3px solid ${colors.eggplant}`,
        p: 2.5,
      }}
    >
      <Typography variant="subtitle2" sx={{ color: colors.grape, mb: 1 }}>
        Edit
      </Typography>
      <Typography variant="body2" sx={{ color: colors.textMuted }}>
        Tools coming soon.
      </Typography>
    </Box>
  );
}
