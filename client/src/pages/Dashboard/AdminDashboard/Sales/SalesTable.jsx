import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import laptopImg from "../../../../assets/laptopPng.png";

const tableData = [
  {
    id: 1,
    productImg: laptopImg,
    productName: "Apple macbook pro",
    quantity: 10,
    price: 1000,
    discount: 500,
    tax: 0,
    taxAmount: 0,
    unitCost: 0,
    totalCost: 500,
  },
  {
    id: 2,
    productImg: laptopImg,
    productName: "Apple macbook pro",
    quantity: 10,
    price: 1000,
    discount: 500,
    tax: 0,
    taxAmount: 0,
    unitCost: 0,
    totalCost: 500,
  },
];

const SalesTable = () => {
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
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img src={row.productImg} alt="laptop" className="w-14 h-8 " />
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
      field: "quantity",
      headerName: "QTY",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantity}</Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Purchase Price",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.price}</Typography>
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
      field: "tax",
      headerName: "Tax",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.tax}</Typography>
          </Box>
        );
      },
    },
    {
      field: "taxAmount",
      headerName: "Tax amount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.taxAmount}</Typography>
          </Box>
        );
      },
    },
    {
      field: "unitCost",
      headerName: "Unit cost",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.unitCost}</Typography>
          </Box>
        );
      },
    },
    {
      field: "totalCost",
      headerName: "Total cost",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.totalCost}</Typography>
          </Box>
        );
      },
    },
  ];

  const rows = tableData.map((data) => {
    return {
      id: data.id,
      productName: data.productName,
      productImg: data.productImg,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount,
      tax: data.tax,
      taxAmount: data.taxAmount,
      unitCost: data.unitCost,
      totalCost: data.totalCost,
    };
  });

  return (
    <Box
      sx={{
        mt: 5,
        width: "800px",
      }}
    >
      <Box
        sx={{
          borderBottom: "1px solid lightgray",
        }}
      >
        <DataGrid
          sx={{
            border: 0,
            borderTop: "1px solid lightgray",
          }}
          rows={rows}
          columns={columns}
          hideFooter
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mt: 2,
        }}
      >
        <Stack
          sx={{
            width: "300px",
            color: "black",
            border: "1px solid lightgray",
            borderRadius: 2,
            p: "5px 10px",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="p">Order tax</Typography>
            <Typography variant="p">0</Typography>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="p">Discount</Typography>
            <Typography variant="p">0</Typography>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="p">Shipping</Typography>
            <Typography variant="p">0</Typography>
          </Stack>

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="p">Grand total</Typography>
            <Typography variant="p">0</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default SalesTable;
