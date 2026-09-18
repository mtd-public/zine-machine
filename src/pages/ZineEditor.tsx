import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import EditorNavRail from "../components/editor/EditorNavRail";
import EditorTopBar from "../components/editor/EditorTopBar";
import EditPanel from "../components/editor/EditPanel";
import RightSidebar from "../components/editor/RightSidebar";
import ZinePaper from "../components/editor/ZinePaper";
import { useZines } from "../state/ZinesContext";

export default function ZineEditor() {
  const { zineId } = useParams<{ zineId: string }>();
  const navigate = useNavigate();
  const { getZine } = useZines();

  const zine = zineId ? getZine(zineId) : undefined;

  if (!zine) {
    return (
      <Box sx={{ maxWidth: 800, mx: "auto", p: { xs: 2, sm: 4 } }}>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Zine not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This zine doesn't exist, or has been removed.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          Back to Zines
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <EditorNavRail />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <EditorTopBar title={zine.title} />
        <Box sx={{ flexGrow: 1, display: "flex", minHeight: 0 }}>
          <EditPanel />
          <ZinePaper title={zine.title} />
          <RightSidebar zineId={zine.id} />
        </Box>
      </Box>
    </Box>
  );
}
