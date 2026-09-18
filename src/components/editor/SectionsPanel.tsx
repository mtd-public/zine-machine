import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { zineSections } from "../../data/sections";
import { colors } from "../../theme";

export default function SectionsPanel() {
  const handleJump = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <List sx={{ py: 0 }}>
      {zineSections.map((section) => (
        <ListItemButton
          key={section.id}
          onClick={() => handleJump(section.id)}
          sx={{
            borderRadius: 1.5,
            mb: 0.5,
            "&:hover": { bgcolor: colors.background },
          }}
        >
          <ListItemText
            slotProps={{
              primary: {
                sx: { fontFamily: "'Fredoka', sans-serif", fontWeight: 600, color: colors.eggplant },
              },
            }}
          >
            {section.label}
          </ListItemText>
        </ListItemButton>
      ))}
    </List>
  );
}
