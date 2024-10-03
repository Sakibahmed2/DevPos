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
import laptopImg from "../../../../assets/laptopPng.png";
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import EditLowStockModal from "./EditLowStockModal";

// table data
const tableData = [
  {
    id: 1,
    productImg: laptopImg,
    name: "Walton 8rd Generation",
    stockKeepingUnit: "PT07",
    category: "Laptop",
    quantity: 20,
    quantityAlert: 10,
    warehouse: "Lobar handy",
    store: "Selosy",
  },
  {
    id: 2,
    productImg: laptopImg,
    name: "Walton 8rd Generation",
    stockKeepingUnit: "PT07",
    category: "Laptop",
    quantity: 20,
    quantityAlert: 10,
    warehouse: "Lobar handy",
    store: "Selosy",
  },
  {
    id: 3,
    productImg: laptopImg,
    name: "Walton 8rd Generation",
    stockKeepingUnit: "PT07",
    category: "Laptop",
    quantity: 20,
    quantityAlert: 10,
    warehouse: "Lobar handy",
    store: "Selosy",
  },
];

const LowStocks = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
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
      field: "img",
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
            <Typography variant="p">{row.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "wareHouse",
      headerName: "Warehouse",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.warehouse}</Typography>
          </Box>
        );
      },
    },
    {
      field: "store",
      headerName: "Store",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.store}</Typography>
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.category}</Typography>
          </Box>
        );
      },
    },
    {
      field: "stockKeepingUnit",
      headerName: "SKU",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.stockKeepingUnit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "Qty",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantity}</Typography>
          </Box>
        );
      },
    },
    {
      field: "quantityAlert",
      headerName: "Qty alert",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantityAlert}</Typography>
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
      name: data.name,
      productImg: data.productImg,
      stockKeepingUnit: data.stockKeepingUnit,
      category: data.category,
      warehouse: data.warehouse,
      store: data.store,
      quantity: data.quantity,
      quantityAlert: data.quantityAlert,
    };
  });

  return (
    <Container>
      <SectionTitle title="Low stocks" description="Mange your low stocks" />

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

      <EditLowStockModal open={open} setOpen={setOpen} id={productId} />
    </Container>
  );
};

export default LowStocks;
