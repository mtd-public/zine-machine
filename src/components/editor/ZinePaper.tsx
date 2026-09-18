import { useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useElementSize } from "../../hooks/useElementSize";
import { colors } from "../../theme";

interface ZinePaperProps {
  title: string;
  zoom: number;
  pageIndex: number;
}

const PAGE_RATIO = 8.5 / 11;
const MAX_PAGE_HEIGHT = 900;

export default function ZinePaper({ title, zoom, pageIndex }: ZinePaperProps) {
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>();
  const isTitlePage = pageIndex === 0;
  const nodeRef = useRef<HTMLDivElement>(null);

  const prevIndexRef = useRef(pageIndex);
  const direction = pageIndex >= prevIndexRef.current ? "forward" : "backward";
  useEffect(() => {
    prevIndexRef.current = pageIndex;
  }, [pageIndex]);

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
        sx={{
          flexShrink: 0,
          width: pageWidth,
          height: pageHeight,
          bgcolor: "#FFFFFF",
          border: `4px solid ${colors.bubblegum}`,
          boxShadow: `8px 8px 0 rgba(42, 9, 68, 0.15)`,
          position: "relative",
          overflow: "hidden",
          transform: `scale(${zoom / 100})`,
          transition: "transform 0.15s",
        }}
      >
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={pageIndex}
            nodeRef={nodeRef}
            classNames={`page-slide-${direction}`}
            timeout={300}
          >
            <Box
              id="zine-page-canvas"
              ref={nodeRef}
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 20,
                  minWidth: 28,
                  height: 28,
                  px: 1,
                  borderRadius: "999px",
                  bgcolor: colors.eggplant,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: colors.banana, fontWeight: 800, lineHeight: 1 }}
                >
                  {pageIndex + 1}
                </Typography>
              </Box>

              {isTitlePage && (
                <Typography
                  variant="h4"
                  sx={{ color: colors.eggplant, textAlign: "center", wordBreak: "break-word" }}
                >
                  {title}
                </Typography>
              )}
            </Box>
          </CSSTransition>
        </SwitchTransition>
      </Box>
    </Box>
  );
}
