import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridActionsCellItem,
  type GridColDef,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CreateZineModal from "../components/CreateZineModal";
import FavoriteCard from "../components/FavoriteCard";
import { useZines } from "../state/ZinesContext";
import type { Zine } from "../types";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Landing() {
  const { zines, favorites, createZine, toggleFavorite, touchZine } = useZines();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const openZine = (id: string) => {
    touchZine(id);
    navigate(`/zine/${id}`);
  };

  const columns: GridColDef<Zine>[] = useMemo(
    () => [
      {
        field: "title",
        headerName: "Title",
        flex: 1,
        minWidth: 200,
      },
      {
        field: "createdAt",
        headerName: "Created",
        width: 140,
        valueFormatter: (value: string) => formatDate(value),
      },
      {
        field: "lastAccessed",
        headerName: "Last Accessed",
        width: 160,
        valueFormatter: (value: string) => formatDate(value),
      },
      {
        field: "favorited",
        headerName: "Favorite",
        width: 100,
        sortable: false,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <GridActionsCellItem
            icon={
              params.row.favorited ? (
                <StarIcon color="warning" />
              ) : (
                <StarBorderIcon />
              )
            }
            label={params.row.favorited ? "Unfavorite" : "Favorite"}
            onClick={() => toggleFavorite(params.row.id)}
          />
        ),
      },
      {
        field: "actions",
        type: "actions",
        headerName: "",
        width: 70,
        getActions: (params) => [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit zine"
            onClick={() => openZine(String(params.id))}
          />,
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [toggleFavorite],
  );

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, sm: 4 } }}>
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Zine Machine
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setModalOpen(true)}
        >
          New Zine
        </Button>
      </Stack>

      {favorites.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
            Favorites
          </Typography>
          <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap", rowGap: 2 }}>
            {favorites.map((zine) => (
              <FavoriteCard
                key={zine.id}
                zine={zine}
                onUnfavorite={toggleFavorite}
                onOpen={touchZine}
              />
            ))}
          </Stack>
        </Box>
      )}

      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>
        All Projects
      </Typography>
      <Box sx={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={zines}
          columns={columns}
          disableRowSelectionOnClick
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25]}
        />
      </Box>

      <CreateZineModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={createZine}
      />
    </Box>
  );
}
