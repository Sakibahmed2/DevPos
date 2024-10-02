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
import userImg from "../../../../assets/userImg.png";
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import visibilityIcon from "../../../../assets/dashboard icons/visibility-icon.svg";
import { NavLink } from "react-router-dom";

// table data
const tableData = [
  {
    id: 1,
    productImg: laptopImg,
    name: "Walton 8rd Generation",
    stockKeepingUnit: "PT07",
    category: "Laptop",
    brand: "Walton",
    price: 5100,
    unit: "Pc",
    quantity: 100,
    createdBy: {
      name: "Tanjid",
      userImg: userImg,
    },
  },
  {
    id: 2,
    productImg: laptopImg,
    name: "Walton 8rd Generation",
    stockKeepingUnit: "PT07",
    category: "Laptop",
    brand: "Walton",
    price: 5100,
    unit: "Pc",
    quantity: 100,
    createdBy: {
      name: "Tanjid",
      userImg: userImg,
    },
  },
  {
    id: 3,
    productImg: laptopImg,
    name: "Walton 8rd Generation",
    stockKeepingUnit: "PT07",
    category: "Laptop",
    brand: "Walton",
    price: 5100,
    unit: "Pc",
    quantity: 100,
    createdBy: {
      name: "Tanjid",
      userImg: userImg,
    },
  },
];

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState("");

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
      field: "brand",
      headerName: "Brand",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.brand}</Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.price}</Typography>
          </Box>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.unit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "QTY",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantity}</Typography>
          </Box>
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img
              src={row.createdBy.userImg}
              alt="user img"
              className="size-10"
            />
            <Typography variant="p">{row.createdBy.name}</Typography>
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
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
              component={NavLink}
              to={`/dashboard/products/${row.id}`}
            >
              <img src={visibilityIcon} alt="" className="h-5 w-5" />
            </Box>

            <Box
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
      price: data.price,
      productImg: data.productImg,
      stockKeepingUnit: data.stockKeepingUnit,
      category: data.category,
      brand: data.brand,
      unit: data.unit,
      quantity: data.quantity,
      createdBy: data.createdBy,
    };
  });

  return (
    <Container>
      <SectionTitle
        title="Product list"
        description="Mange your products here"
      />

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
    </Container>
  );
};

export default ProductsPage;
