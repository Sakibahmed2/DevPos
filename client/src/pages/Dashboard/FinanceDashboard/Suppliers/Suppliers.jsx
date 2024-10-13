import {
  Box,
  Button,
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
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import EditExpensesModal from "../Expenses/EditExpensesModal";
import CreateExpanseModal from "../Expenses/CreateExpensesModal";
import supplierImg from "../../../../assets/userImg.png";

// table data
const tableData = [
  {
    id: 1,
    supplierName: "John Doe",
    supplierImg: supplierImg,
    code: "C-123",
    phone: "123456789",
    email: "email@gmail.com",
    country: "Bangladesh",
  },
  {
    id: 3,
    supplierName: "John Doe",
    supplierImg: supplierImg,
    code: "C-123",
    phone: "123456789",
    email: "email@gmail.com",
    country: "Bangladesh",
  },
  {
    id: 2,
    supplierName: "John Doe",
    supplierImg: supplierImg,
    code: "C-123",
    phone: "123456789",
    email: "email@gmail.com",
    country: "Bangladesh",
  },
];

const Suppliers = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [productId, setProductId] = useState(null);

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
      field: "supplierImg",
      headerName: "Supplier",
      width: 90,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img src={row.supplierImg} alt="laptop" />
          </Box>
        );
      },
    },
    {
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.supplierName}</Typography>
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
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.email}</Typography>
          </Box>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.phone}</Typography>
          </Box>
        );
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.country}</Typography>
          </Box>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      renderCell: ({ row }) => {
        return (
          <Stack
            direction={"row"}
            gap={1}
            justifyContent={"center"}
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
      supplierName: data.supplierName,
      supplierImg: data.supplierImg,
      code: data.code,
      phone: data.phone,
      email: data.email,
      country: data.country,
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle
          title={"Supplier list"}
          description={"Manage your suppliers"}
        />

        <Button
          onClick={() => setCreateModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new supplier
        </Button>
      </Stack>

      <Box
        sx={{
          mt: 5,
          border: "1px solid lightgray",
        }}
      >
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

      {/* Edit expenses */}
      <EditExpensesModal open={open} setOpen={setOpen} id={productId} />

      {/* Add expenses */}
      <CreateExpanseModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default Suppliers;
