import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useElementSize } from "../../hooks/useElementSize";
import { colors } from "../../theme";

interface ZinePaperProps {
  title: string;
  zoom: number;
}

const PAGE_RATIO = 8.5 / 11;
const MAX_PAGE_HEIGHT = 900;

export default function ZinePaper({ title, zoom }: ZinePaperProps) {
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>();

  let pageHeight = Math.min(height, MAX_PAGE_HEIGHT);
  let pageWidth = pageHeight * PAGE_RATIO;
  if (pageWidth > width) {
    pageWidth = width;
    pageHeight = pageWidth / PAGE_RATIO;
  }

  return (
    <Box
      ref={containerRef}
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
          flexShrink: 0,
          width: pageWidth,
          height: pageHeight,
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
