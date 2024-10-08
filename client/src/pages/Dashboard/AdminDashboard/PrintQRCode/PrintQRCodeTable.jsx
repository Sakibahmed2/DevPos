import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import laptopImg from "../../../../assets/laptopPng.png";

const tableData = [
  {
    id: 1,
    img: laptopImg,
    name: "MSI",
    stockKeepingUnit: "PT07",
    code: "GRT-123",
    quantity: 10,
  },
  {
    id: 2,
    img: laptopImg,
    name: "MSI",
    stockKeepingUnit: "PT07",
    code: "GRT-123",
    quantity: 10,
  },
  {
    id: 3,
    img: laptopImg,
    name: "MSI",
    stockKeepingUnit: "PT07",
    code: "GRT-123",
    quantity: 10,
  },
  {
    id: 4,
    img: laptopImg,
    name: "MSI",
    stockKeepingUnit: "PT07",
    code: "GRT-123",
    quantity: 10,
  },
];

const PrintQRCodeTable = () => {
  const [searchParams, setSearchParams] = useState("");

  const handleChange = (e) => {
    setSearchParams(e.target.value);
  };

  const columns = [
    {
      field: "img",
      headerName: "Products",
      width: 150,
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
      field: "stockKeepingUnit",
      headerName: "SKU",
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
              ${row.stockKeepingUnit}
            </Typography>
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
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              ${row.code}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "QTY",
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
              ${row.quantity}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "id",
      headerName: "Action",
      renderCell: () => {
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
              component={"button"}
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
            >
              <img src={deleteIcon} alt="" className="w-7 h-8" />
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
      img: data.img,
      stockKeepingUnit: data.stockKeepingUnit,
      code: data.code,
      quantity: data.quantity,
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
        <Typography variant="h5" component={"p"} fontWeight={"500"}>
          Products
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

export default PrintQRCodeTable;
