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
import { ZINE_BLOCK_CAPACITY, getPageZineBlockCount } from "../data/sections";
import { useZines } from "../state/ZinesContext";

const ZOOM_MIN = 50;
const ZOOM_MAX = 150;
const ZOOM_STEP = 10;

export default function ZineEditor() {
  const { zineId } = useParams<{ zineId: string }>();
  const navigate = useNavigate();
  const {
    getZine,
    deleteZine,
    getPages,
    addPageAbove,
    addPageBelow,
    deletePage,
    addTextBlock,
    updateTextBlock,
    updateTextBlockTransform,
    deleteTextBlock,
  } = useZines();
  const [pageIndex, setPageIndex] = useState(0);
  const [zoom, setZoom] = useState(100);

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

  const pages = getPages(zine.id);
  const safePageIndex = Math.min(pageIndex, pages.length - 1);
  const currentPage = pages[safePageIndex];

  return (
    <Box sx={{ height: "100vh", display: "flex", overflow: "hidden" }}>
      <EditorNavRail />
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <EditorTopBar title={zine.title} />
        <Box sx={{ flexGrow: 1, display: "flex", minHeight: 0 }}>
          <EditPanel
            zineTitle={zine.title}
            pageIndex={safePageIndex}
            totalPages={pages.length}
            zineBlockUsed={getPageZineBlockCount(currentPage)}
            zineBlockCapacity={ZINE_BLOCK_CAPACITY}
            onZoomIn={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
            onZoomOut={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
            canZoomIn={zoom < ZOOM_MAX}
            canZoomOut={zoom > ZOOM_MIN}
            onPageUp={() => setPageIndex((i) => Math.max(0, i - 1))}
            onPageDown={() => setPageIndex((i) => Math.min(pages.length - 1, i + 1))}
            canPageUp={safePageIndex > 0}
            canPageDown={safePageIndex < pages.length - 1}
            onDeleteZine={() => {
              deleteZine(zine.id);
              navigate("/");
            }}
            canAddPageAbove={safePageIndex > 0}
            onAddPageAbove={() => addPageAbove(zine.id, safePageIndex)}
            onAddPageBelow={() => {
              addPageBelow(zine.id, safePageIndex);
              setPageIndex(safePageIndex + 1);
            }}
            canDeletePage={safePageIndex > 0}
            onDeletePage={() => {
              deletePage(zine.id, safePageIndex);
              setPageIndex((i) => Math.max(0, Math.min(i, pages.length - 2)));
            }}
            canAddTextBlock={safePageIndex !== 0}
            onAddTextBlock={() => addTextBlock(zine.id, safePageIndex)}
          />
          <ZinePaper
            title={zine.title}
            zoom={zoom}
            pageIndex={safePageIndex}
            totalPages={pages.length}
            textBlocks={currentPage.textBlocks}
            onUpdateTextBlock={(blockId, text) =>
              updateTextBlock(zine.id, safePageIndex, blockId, text)
            }
            onTransformTextBlock={(blockId, transform) =>
              updateTextBlockTransform(zine.id, safePageIndex, blockId, transform)
            }
            onDeleteTextBlock={(blockId) => deleteTextBlock(zine.id, safePageIndex, blockId)}
          />
          <RightSidebar
            zineId={zine.id}
            pages={pages}
            selectedIndex={safePageIndex}
            onSelectPage={setPageIndex}
          />
        </Box>
      </Box>
    </Box>
  );
}
