import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { colors } from "../../theme";

interface ZinePaperProps {
  title: string;
  zoom: number;
}

export default function ZinePaper({ title, zoom }: ZinePaperProps) {
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
          border: `4px solid ${colors.bubblegum}`,
          boxShadow: `8px 8px 0 rgba(42, 9, 68, 0.15)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          transform: `scale(${zoom / 100})`,
          transition: "transform 0.15s",
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
