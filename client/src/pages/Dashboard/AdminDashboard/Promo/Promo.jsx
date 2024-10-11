import {
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import PaginationUi from "../../../../components/ui/PaginationUi";
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import EditPromoModal from "./EditPromoModal";

const tableData = [
  {
    id: 1,
    name: "coupons 1",
    code: "GHGDHJ",
    type: "Percentage",
    discount: 10, // percentage
    status: "Active",
    limit: 100,
    valid: "09 Sep 2024",
  },
  {
    id: 2,
    name: "coupons 1",
    code: "GHGDHJ",
    type: "Percentage",
    discount: 10, // percentage
    status: "Active",
    limit: 100,
    valid: "09 Sep 2024",
  },
  {
    id: 3,
    name: "coupons 1",
    code: "GHGDHJ",
    type: "Percentage",
    discount: 10, // percentage
    status: "Active",
    limit: 100,
    valid: "09 Sep 2024",
  },
];

const Promo = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [createModal, setCreateModal] = useState(false);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "code",
      headerName: "Code",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.code}</Typography>
          </Box>
        );
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.type}</Typography>
          </Box>
        );
      },
    },

    {
      field: "discount",
      headerName: "Discount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.discount}</Typography>
          </Box>
        );
      },
    },
    {
      field: "limit",
      headerName: "Limit",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.limit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "valid",
      headerName: "Valid",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.valid}</Typography>
          </Box>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {
              <Chip
                variant="outlined"
                size="small"
                sx={{
                  color: row.status === "Active" ? "primary.main" : "red",
                  borderRadius: 1,
                  border:
                    row.status === "Active"
                      ? "1px solid lightgreen"
                      : "1px solid red",

                  px: 1,
                }}
                label={row.status}
              />
            }
          </Box>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Stack
            direction={"row"}
            gap={1}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              onClick={() => handleModal(row.id)}
              component={"button"}
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
            >
              <img src={editIcons} alt="" className="w-5 h-5" />
            </Box>

            <Box
              component={"button"}
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
            >
              <img src={deleteIcon} alt="" className="w-5 h-5" />
            </Box>
          </Stack>
        );
      },
    },
  ];

  const rows = tableData.map((data) => {
    return {
      id: data.id,
      name: data.name,
      code: data.code,
      type: data.type,
      discount: data.discount,
      status: data.status,
      limit: data.limit,
      valid: data.valid,
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"Promo"} description={"Manage your promo"} />

        <Button
          onClick={() => setCreateModal((prev) => !prev)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add promo
        </Button>
      </Stack>

      <Box
        sx={{
          mt: 5,
          border: "1px solid lightgray",
        }}
      >
        {/* search fields */}
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            pt: 3,
            px: 2,
          }}
        >
          <Box
            sx={{
              width: "250px",
            }}
          >
            <TextField
              label="Search here"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: <img src={searchIcon} />,
                },
              }}
            />
          </Box>

          <Box
            sx={{
              width: "170px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel>Sort by date</InputLabel>
              <Select
                value={sortBy}
                label="Sort by date"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value={"date"}>date</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>

        {/* Table */}
        <Box
          sx={{
            mt: 5,
          }}
        >
          <DataGrid
            sx={{
              border: 0,
              borderTop: "1px solid lightgray",
            }}
            rows={rows}
            columns={columns}
            rowHeight={80}
            hideFooter
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Box>
        <PaginationUi
          totalItems={tableData.length}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit promo modal  */}
      <EditPromoModal open={open} setOpen={setOpen} productId={productId} />
    </Container>
  );
};

export default Promo;
