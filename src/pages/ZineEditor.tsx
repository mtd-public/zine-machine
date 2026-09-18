import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import { useZines } from "../state/ZinesContext";

export default function ZineEditor() {
  const { zineId } = useParams<{ zineId: string }>();
  const navigate = useNavigate();
  const { getZine } = useZines();

  const zine = zineId ? getZine(zineId) : undefined;

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, sm: 4 } }}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/")} sx={{ mb: 3 }}>
        Back to Zines
      </Button>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
        {zine ? zine.title : "Zine not found"}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {zine
          ? "The zine editor is coming soon."
          : "This zine doesn't exist, or has been removed."}
      </Typography>
    </Box>
  );
}
