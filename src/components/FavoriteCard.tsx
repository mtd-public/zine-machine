import StarIcon from "@mui/icons-material/Star";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import type { Zine } from "../types";

interface FavoriteCardProps {
  zine: Zine;
  onUnfavorite: (id: string) => void;
  onOpen: (id: string) => void;
}

function formatLastAccessed(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function FavoriteCard({ zine, onUnfavorite, onOpen }: FavoriteCardProps) {
  const navigate = useNavigate();

  const handleOpen = () => {
    onOpen(zine.id);
    navigate(`/zine/${zine.id}`);
  };

  return (
    <Paper
      elevation={2}
      onClick={handleOpen}
      sx={{
        width: 180,
        height: 110,
        p: 1.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        borderRadius: 1,
        transition: "transform 0.15s, box-shadow 0.15s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: 6,
        },
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            pr: 0.5,
          }}
        >
          {zine.title}
        </Typography>
        <Tooltip title="Unfavorite">
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onUnfavorite(zine.id);
            }}
            sx={{ p: 0.25, mt: -0.5, mr: -0.5 }}
          >
            <StarIcon fontSize="small" color="warning" />
          </IconButton>
        </Tooltip>
      </Box>
      <Typography variant="caption" color="text.secondary">
        Last accessed {formatLastAccessed(zine.lastAccessed)}
      </Typography>
    </Paper>
  );
}
