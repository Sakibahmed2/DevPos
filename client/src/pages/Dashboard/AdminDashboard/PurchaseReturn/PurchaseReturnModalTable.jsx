import { Box, Chip, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import laptopImg from "../../../../assets/laptopPng.png";

const tableData = [
  {
    id: 1,
    productImg: laptopImg,
    productName: "Apple macbook pro",
    date: "09 Sep 2024",
    supplierName: "Jhon Doe",
    referenceNo: "123456",
    status: "Received",
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    payment: "Paid",
  },
  {
    id: 2,
    productImg: laptopImg,
    productName: "Apple macbook pro",
    date: "09 Sep 2024",
    supplierName: "Jhon Doe",
    referenceNo: "123456",
    status: "Pending",
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    payment: "Unpaid",
  },
];

const PurchaseReturnModalTable = () => {
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
      field: "supplierName",
      headerName: "Supplier",
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
      field: "referenceNo",
      headerName: "Reference",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.referenceNo}</Typography>
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
                variant="outline"
                size="small"
                sx={{
                  bgcolor:
                    row.status === "Received"
                      ? "primary.main"
                      : row.status === "Ordered"
                      ? "orange"
                      : row.status === "Pending"
                      ? "red"
                      : "",
                  color: "white",
                  borderRadius: 1,
                }}
                label={row.status}
              />
            }
          </Box>
        );
      },
    },
    {
      field: "grandTotal",
      headerName: "Grand total",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.grandTotal}</Typography>
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
            <Typography variant="p">{row.paid}</Typography>
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
            <Typography variant="p">{row.due}</Typography>
          </Box>
        );
      },
    },
    {
      field: "payment",
      headerName: "Payment",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {
              <Chip
                variant="outlined"
                size="small"
                sx={{
                  color:
                    row.payment === "Paid"
                      ? "green"
                      : row.payment === "Partial"
                      ? "orange"
                      : "red",
                  borderRadius: 1,
                  border:
                    row.payment === "Paid"
                      ? "1px solid lightgreen"
                      : row.payment === "Partial"
                      ? "1px solid orange"
                      : "1px solid red",
                  px: 1,
                }}
                label={row.payment}
              />
            }
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
      supplierName: data.supplierName,
      referenceNo: data.referenceNo,
      date: data.date,
      status: data.status,
      grandTotal: data.grandTotal,
      paid: data.paid,
      due: data.due,
      payment: data.payment,
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

export default PurchaseReturnModalTable;
