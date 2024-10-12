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
import PaginationUi from "../../../../components/ui/PaginationUi";
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import shoeImg from "../../../../assets/shoeImg.svg";

const tableData = [
  {
    id: 1,
    productImg: shoeImg,
    productName: "Nike Air Max",
    purchaseAmount: 40000,
    purchaseQuantity: 20,
    inStockQuantity: 20,
  },
  {
    id: 2,
    productImg: shoeImg,
    productName: "Nike Air Max",
    purchaseAmount: 40000,
    purchaseQuantity: 20,
    inStockQuantity: 20,
  },
  {
    id: 3,
    productImg: shoeImg,
    productName: "Nike Air Max",
    purchaseAmount: 40000,
    purchaseQuantity: 20,
    inStockQuantity: 20,
  },
];

const PurchaseOrder = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      field: "productImg",
      headerName: "Products",
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
            <img src={row.productImg} alt="laptop" className="h-8 w-12" />
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
      headerName: "Purchase amount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.purchaseAmount}</Typography>
          </Box>
        );
      },
    },
    {
      field: "purchaseQuantity",
      headerName: "Purchase quantity",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.purchaseQuantity}</Typography>
          </Box>
        );
      },
    },

    {
      field: "inStockQuantity",
      headerName: "In stock quantity",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.inStockQuantity}</Typography>
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
      purchaseAmount: data.purchaseAmount,
      purchaseQuantity: data.purchaseQuantity,
      inStockQuantity: data.inStockQuantity,
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
          title={"Purchase order report"}
          description={"Manage your purchase orders here"}
        />
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
    </Container>
  );
};

export default PurchaseOrder;
