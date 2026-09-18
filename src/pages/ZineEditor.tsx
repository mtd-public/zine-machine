import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";
import EditorNavRail from "../components/editor/EditorNavRail";
import EditorTopBar from "../components/editor/EditorTopBar";
import EditPanel from "../components/editor/EditPanel";
import RightSidebar from "../components/editor/RightSidebar";
import ZinePaper from "../components/editor/ZinePaper";
import { ZINE_BLOCK_CAPACITY, zineSections } from "../data/sections";
import { useZines } from "../state/ZinesContext";

const ZOOM_MIN = 50;
const ZOOM_MAX = 150;
const ZOOM_STEP = 10;

export default function ZineEditor() {
  const { zineId } = useParams<{ zineId: string }>();
  const navigate = useNavigate();
  const { getZine, deleteZine } = useZines();
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);

  const zine = zineId ? getZine(zineId) : undefined;
  const currentPage = zineSections[pageIndex];

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
          <EditPanel
            zineTitle={zine.title}
            pageIndex={pageIndex}
            totalPages={zineSections.length}
            zineBlockUsed={currentPage.zineBlockCount}
            zineBlockCapacity={ZINE_BLOCK_CAPACITY}
            onZoomIn={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
            onZoomOut={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
            canZoomIn={zoom < ZOOM_MAX}
            canZoomOut={zoom > ZOOM_MIN}
            onPageUp={() => setPageIndex((i) => Math.max(0, i - 1))}
            onPageDown={() => setPageIndex((i) => Math.min(zineSections.length - 1, i + 1))}
            canPageUp={pageIndex > 0}
            canPageDown={pageIndex < zineSections.length - 1}
            onDeleteZine={() => {
              deleteZine(zine.id);
              navigate("/");
            }}
          />
          <ZinePaper title={zine.title} zoom={zoom} />
          <RightSidebar zineId={zine.id} />
        </Box>
      </Box>
    </Box>
  );
}
