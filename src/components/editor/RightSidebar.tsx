import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import CommentsPanel from "./CommentsPanel";
import SectionsPanel from "./SectionsPanel";
import { colors } from "../../theme";

interface RightSidebarProps {
  zineId: string;
}

export default function RightSidebar({ zineId }: RightSidebarProps) {
  const [tab, setTab] = useState<"sections" | "comments">("sections");

  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
        bgcolor: "#FFFFFF",
        borderLeft: `3px solid ${colors.eggplant}`,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Tabs
        value={tab}
        onChange={(_, value) => setTab(value)}
        variant="fullWidth"
        sx={{
          borderBottom: `2px solid ${colors.background}`,
          minHeight: 48,
          "& .MuiTab-root": {
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            minHeight: 48,
          },
        }}
      >
        <Tab label="Sections" value="sections" />
        <Tab label="Comments" value="comments" />
      </Tabs>
      <Box sx={{ p: 2, overflow: "auto", flexGrow: 1 }}>
        {tab === "sections" ? <SectionsPanel /> : <CommentsPanel zineId={zineId} />}
      </Box>
    </Box>
  );
}
