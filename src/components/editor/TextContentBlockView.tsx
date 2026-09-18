import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { colors } from "../../theme";

interface TextContentBlockViewProps {
  text: string;
  top: number;
  height: number;
  onConfirm: (text: string) => void;
  onDelete: () => void;
}

const tagButtonSx = {
  width: 16,
  height: 16,
  minHeight: 0,
  p: 0,
  bgcolor: "#FFFFFF",
  border: `1.5px solid ${colors.grape}`,
  "&:hover": { bgcolor: colors.background },
};

export default function TextContentBlockView({
  text,
  top,
  height,
  onConfirm,
  onDelete,
}: TextContentBlockViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(text);

  const startEdit = () => {
    setDraft(text);
    setIsEditing(true);
  };

  const confirm = () => {
    onConfirm(draft);
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(text);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <>
        <Box
          sx={{
            position: "absolute",
            top,
            left: "8%",
            width: "82%",
            height,
            borderRadius: 1.5,
            overflow: "hidden",
            border: `2px solid ${colors.bubblegum}`,
            bgcolor: "#FFFFFF",
          }}
        >
          <TextField
            autoFocus
            multiline
            fullWidth
            variant="standard"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            slotProps={{ input: { disableUnderline: true } }}
            sx={{
              height: "100%",
              px: 1,
              "& .MuiInputBase-root": { height: "100%", alignItems: "flex-start" },
              "& textarea": { height: "100% !important", overflow: "auto !important" },
            }}
          />
        </Box>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            position: "absolute",
            top: top + height / 2,
            left: "91%",
            transform: "translateY(-50%)",
          }}
        >
          <IconButton onClick={confirm} aria-label="Confirm edit" sx={tagButtonSx}>
            <CheckIcon sx={{ color: colors.slime, fontSize: 10 }} />
          </IconButton>
          <IconButton onClick={cancel} aria-label="Cancel edit" sx={tagButtonSx}>
            <CloseIcon sx={{ color: colors.textMuted, fontSize: 10 }} />
          </IconButton>
        </Stack>
      </>
    );
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top,
        left: "8%",
        width: "84%",
        height,
        overflow: "hidden",
      }}
    >
      <Typography variant="body2" sx={{ color: colors.eggplant, whiteSpace: "pre-wrap" }}>
        {text}
        <Tooltip title="Edit text" placement="right">
          <IconButton
            onClick={startEdit}
            aria-label="Edit text"
            sx={{ ...tagButtonSx, display: "inline-flex", verticalAlign: "middle", ml: 0.75 }}
          >
            <EditIcon sx={{ color: colors.grape, fontSize: 10 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete text block" placement="right">
          <IconButton
            onClick={onDelete}
            aria-label="Delete text block"
            sx={{ ...tagButtonSx, display: "inline-flex", verticalAlign: "middle", ml: 0.5 }}
          >
            <DeleteIcon sx={{ color: "error.main", fontSize: 10 }} />
          </IconButton>
        </Tooltip>
      </Typography>
    </Box>
  );
}
