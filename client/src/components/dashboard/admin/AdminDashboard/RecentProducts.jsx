import { DataGrid } from "@mui/x-data-grid";
import laptopImg from "../../../../assets/laptopPng.png";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const tableData = [
  {
    id: 1,
    img: laptopImg,
    name: "MSI",
    price: "2000",
  },
  {
    id: 2,
    img: laptopImg,
    name: "Lenovo",
    price: 1500,
  },
  {
    id: 3,
    img: laptopImg,
    name: "Dell",
    price: 1800,
  },
  {
    id: 4,
    img: laptopImg,
    name: "HP",
    price: 1200,
  },
];

const RecentProducts = () => {
  const [searchParams, setSearchParams] = useState("");

  const handleChange = (e) => {
    setSearchParams(e.target.value);
  };

  const columns = [
    {
      headerName: "#",
      width: 90,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              {row.id + 1}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "img",
      headerName: "Products",
      width: 150,
      alignItems: "center",
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
            <img src={row.img} alt="laptop" className="w-24 h-14 " />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              {row.name}
            </Typography>
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
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              ${row.price}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const rows = tableData.map((data, index) => {
    return {
      id: index,
      name: data.name,
      price: data.price,
      img: data.img,
    };
  });

  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          mb: 2,
        }}
      >
        <Typography variant="h5" component={"p"}>
          Recent Products
        </Typography>

        <FormControl
          sx={{
            width: "150px",
          }}
        >
          <InputLabel id="demo-simple-select-label">View all</InputLabel>
          <Select value={searchParams} label="View all" onChange={handleChange}>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box>
        <DataGrid
          sx={{
            border: 0,
            borderTop: "1px solid lightgray",
          }}
          rows={rows}
          columns={columns}
          rowHeight={80}
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default RecentProducts;
