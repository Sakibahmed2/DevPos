import {
  Box,
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
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import laptopImg from "../../../../assets/laptopPng.png";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";

// table data
const tableData = [
  {
    id: 1,
    productImg: laptopImg,
    productName: "Laptop",
    purchaseDate: "09 Sep 2024",
    purchaseAmount: 1500,
    purchaseQty: 10,
    paid: 1500,
    due: 0,
    status: "Received",
  },
  {
    id: 2,
    productImg: laptopImg,
    productName: "Laptop",
    purchaseDate: "09 Sep 2024",
    purchaseAmount: 1500,
    purchaseQty: 10,
    paid: 1500,
    due: 0,
    status: "Received",
  },
];

const SupplierReport = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.purchaseDate}</Typography>
          </Box>
        );
      },
    },
    {
      field: "productImg",
      headerName: "Product Name",
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
            <img src={row.productImg} alt="laptop" className="w-12" />
          </Box>
        );
      },
    },
    {
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.productName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "purchaseAmount",
      headerName: "Purchase Amount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.purchaseAmount}</Typography>
          </Box>
        );
      },
    },
    {
      field: "purchaseQty",
      headerName: "Purchase Qty",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.purchaseQty}</Typography>
          </Box>
        );
      },
    },
    {
      field: "paid",
      headerName: "Paid",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.paid}</Typography>
          </Box>
        );
      },
    },
    {
      field: "due",
      headerName: "Due",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.due}</Typography>
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
            <Chip
              label={row.status}
              sx={{
                color: "white",
                bgcolor: row.status === "Received" ? "primary.main" : "red",
                borderRadius: 1,
                fontWeight: 600,
              }}
            />
          </Box>
        );
      },
    },
  ];

  const rows = tableData.map((data) => {
    return {
      id: data.id,
      productImg: data.productImg,
      productName: data.productName,
      purchaseDate: data.purchaseDate,
      purchaseAmount: data.purchaseAmount,
      purchaseQty: data.purchaseQty,
      paid: data.paid,
      due: data.due,
      status: data.status,
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
          title={"Supplier report"}
          description={"Manage your supplier report"}
        />
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
    </Container>
  );
};

export default SupplierReport;
