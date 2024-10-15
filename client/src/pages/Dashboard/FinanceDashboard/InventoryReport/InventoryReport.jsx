import {
  Box,
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
    stockKeepingUnit: "SKU-123",
    category: "Electronics",
    brand: "Apple",
    unit: "pcs",
    inStockQty: 20,
  },
  {
    id: 2,
    productImg: laptopImg,
    productName: "Laptop",
    stockKeepingUnit: "SKU-123",
    category: "Electronics",
    brand: "Apple",
    unit: "pcs",
    inStockQty: 20,
  },
];

const InventoryReport = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
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
      field: "stockKeepingUnit",
      headerName: "SKU",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.stockKeepingUnit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.category}</Typography>
          </Box>
        );
      },
    },
    {
      field: "brand",
      headerName: "brand",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.brand}</Typography>
          </Box>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.unit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "inStockQty",
      headerName: "In stock qty",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.inStockQty}</Typography>
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
      stockKeepingUnit: data.stockKeepingUnit,
      category: data.category,
      brand: data.brand,
      unit: data.unit,
      inStockQty: data.inStockQty,
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
          title={"Inventory report"}
          description={"Manage your inventory report"}
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

export default InventoryReport;
