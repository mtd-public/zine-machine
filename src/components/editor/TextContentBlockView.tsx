import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
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

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top,
          left: "8%",
          width: "84%",
          height,
          borderRadius: 1.5,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          ...(isEditing
            ? { border: `2px solid ${colors.bubblegum}`, bgcolor: "#FFFFFF" }
            : { border: "none", bgcolor: "transparent" }),
        }}
      >
        {isEditing && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 0.5,
              p: 0.25,
              borderBottom: `1px solid ${colors.background}`,
              flexShrink: 0,
            }}
          >
            <IconButton size="small" onClick={confirm} aria-label="Confirm edit">
              <CheckIcon fontSize="small" sx={{ color: colors.slime }} />
            </IconButton>
            <IconButton size="small" onClick={cancel} aria-label="Cancel edit">
              <CloseIcon fontSize="small" sx={{ color: colors.textMuted }} />
            </IconButton>
            <IconButton size="small" onClick={onDelete} aria-label="Delete text block">
              <DeleteIcon fontSize="small" sx={{ color: "error.main" }} />
            </IconButton>
          </Box>
        )}

        <Box sx={{ flexGrow: 1, overflow: "hidden", p: isEditing ? 1 : 0, minHeight: 0 }}>
          {isEditing ? (
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
                "& .MuiInputBase-root": { height: "100%", alignItems: "flex-start" },
                "& textarea": { height: "100% !important", overflow: "auto !important" },
              }}
            />
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: colors.eggplant,
                whiteSpace: "pre-wrap",
                overflow: "hidden",
                height: "100%",
              }}
            >
              {text}
            </Typography>
          )}
        </Box>
      </Box>

      {!isEditing && (
        <Tooltip title="Edit text" placement="right">
          <IconButton
            size="small"
            onClick={startEdit}
            aria-label="Edit text"
            sx={{
              position: "absolute",
              top: top + height / 2,
              left: "93%",
              transform: "translate(-50%, -50%)",
              width: 24,
              height: 24,
              bgcolor: "#FFFFFF",
              border: `1.5px solid ${colors.grape}`,
              "&:hover": { bgcolor: colors.background },
            }}
          >
            <EditIcon sx={{ color: colors.grape, fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
