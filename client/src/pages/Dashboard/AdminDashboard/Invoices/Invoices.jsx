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
import PaginationUi from "../../../../components/ui/PaginationUi";
import SectionTitle from "../../../../components/ui/SectionTitle";

// icons
import searchIcon from "../../../../assets/dashboard icons/search.svg";

const tableData = [
  {
    id: 1,
    invoiceNo: "INV-123456",
    customerName: "John Doe",
    amount: 1000,
    paid: 1000,
    due: 0,
    status: "Paid",
    date: "09 Sep 2024",
  },
  {
    id: 2,
    invoiceNo: "INV-123456",
    customerName: "John Doe",
    amount: 1000,
    paid: 1000,
    due: 0,
    status: "Unpaid",
    date: "09 Sep 2024",
  },
  {
    id: 3,
    invoiceNo: "INV-123456",
    customerName: "John Doe",
    amount: 1000,
    paid: 1000,
    due: 0,
    status: "Paid",
    date: "09 Sep 2024",
  },
];

const Invoices = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      field: "invoiceNo",
      headerName: "Invoice no",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.invoiceNo}</Typography>
          </Box>
        );
      },
    },
    {
      field: "customerName",
      headerName: "Customer",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.customerName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.date}</Typography>
          </Box>
        );
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.amount}</Typography>
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
      headerName: "Amount due",
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
            {
              <Chip
                variant="outlined"
                size="small"
                sx={{
                  color: row.status === "Paid" ? "primary.main" : "red",
                  borderRadius: 1,
                  border:
                    row.status === "Paid"
                      ? "1px solid lightgreen"
                      : "1px solid red",

                  px: 1,
                }}
                label={row.status}
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
      invoiceNo: data.invoiceNo,
      customerName: data.customerName,
      amount: data.amount,
      paid: data.paid,
      due: data.due,
      status: data.status,
      date: data.date,
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
          title={"Invoice reports"}
          description={"Manage your invoices here"}
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

export default Invoices;
