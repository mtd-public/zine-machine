import { useEffect, useRef } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextContentBlockView from "./TextContentBlockView";
import { VIRTUAL_PAGE_WIDTH, type ZineTextBlock } from "../../data/sections";
import { useElementSize } from "../../hooks/useElementSize";
import { colors } from "../../theme";

interface ZinePaperProps {
  title: string;
  zoom: number;
  pageIndex: number;
  totalPages: number;
  textBlocks: ZineTextBlock[];
  onUpdateTextBlock: (blockId: string, text: string) => void;
  onTransformTextBlock: (
    blockId: string,
    transform: Partial<Pick<ZineTextBlock, "x" | "y" | "width" | "height" | "rotation">>,
  ) => void;
  onDeleteTextBlock: (blockId: string) => void;
}

const PAGE_RATIO = 8.5 / 11;
const MAX_PAGE_HEIGHT = 900;
const PEEK_HEIGHT = 22;
const PEEK_GAP = 14;

export default function ZinePaper({
  title,
  zoom,
  pageIndex,
  totalPages,
  textBlocks,
  onUpdateTextBlock,
  onTransformTextBlock,
  onDeleteTextBlock,
}: ZinePaperProps) {
  const [containerRef, { width, height }] = useElementSize<HTMLDivElement>();
  const isTitlePage = pageIndex === 0;
  const nodeRef = useRef<HTMLDivElement>(null);

  const prevIndexRef = useRef(pageIndex);
  const direction = pageIndex >= prevIndexRef.current ? "forward" : "backward";
  useEffect(() => {
    prevIndexRef.current = pageIndex;
  }, [pageIndex]);

  const showPrevPeek = pageIndex > 0;
  const showNextPeek = pageIndex < totalPages - 1;
  const reservedForPeeks =
    (showPrevPeek ? PEEK_HEIGHT + PEEK_GAP : 0) + (showNextPeek ? PEEK_HEIGHT + PEEK_GAP : 0);

  let pageHeight = Math.min(height - reservedForPeeks, MAX_PAGE_HEIGHT);
  let pageWidth = pageHeight * PAGE_RATIO;
  if (pageWidth > width) {
    pageWidth = width;
    pageHeight = pageWidth / PAGE_RATIO;
  }

  const pageScale = pageWidth > 0 ? pageWidth / VIRTUAL_PAGE_WIDTH : 0;
  const effectiveScale = pageScale * (zoom / 100);

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${zoom / 100})`,
          transition: "transform 0.15s",
        }}
      >
        {showPrevPeek && (
          <Box
            sx={{
              flexShrink: 0,
              width: pageWidth,
              height: PEEK_HEIGHT,
              mb: `${PEEK_GAP}px`,
              bgcolor: "#FFFFFF",
              borderRadius: "2px 2px 0 0",
              boxShadow: "0 -2px 5px rgba(42, 9, 68, 0.12)",
            }}
          />
        )}

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

                {textBlocks.map((block) => (
                  <TextContentBlockView
                    key={block.id}
                    block={block}
                    scale={pageScale}
                    dragScale={effectiveScale}
                    onConfirmText={(text) => onUpdateTextBlock(block.id, text)}
                    onTransform={(transform) => onTransformTextBlock(block.id, transform)}
                    onDelete={() => onDeleteTextBlock(block.id)}
                  />
                ))}
              </Box>
            </CSSTransition>
          </SwitchTransition>
        </Box>

        {showNextPeek && (
          <Box
            sx={{
              flexShrink: 0,
              width: pageWidth,
              height: PEEK_HEIGHT,
              mt: `${PEEK_GAP}px`,
              bgcolor: "#FFFFFF",
              borderRadius: "0 0 2px 2px",
              boxShadow: "0 2px 5px rgba(42, 9, 68, 0.12)",
            }}
          />
        )}
      </Box>
    </Box>
  );
}
