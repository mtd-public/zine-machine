import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "../../theme";

interface ZinePaperProps {
  title: string;
}

export default function ZinePaper({ title }: ZinePaperProps) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "auto",
        p: 4,
        bgcolor: colors.background,
      }}
    >
      <Box
        id="section-title-page"
        sx={{
          aspectRatio: "8.5 / 11",
          height: "min(100%, 900px)",
          bgcolor: "#FFFFFF",
          border: `3px solid ${colors.eggplant}`,
          boxShadow: "8px 8px 0 rgba(42, 9, 68, 0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: colors.eggplant, textAlign: "center", wordBreak: "break-word" }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
