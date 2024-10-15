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
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";

// table data
const tableData = [
  {
    id: 1,
    invoiceNo: "INV-123",
    customerName: "John Doe",
    dueDate: "09 Sep 2024",
    amount: 1000,
    paid: 1000,
    amountDue: 0,
    status: "Paid",
  },
  {
    id: 2,
    invoiceNo: "INV-123",
    customerName: "John Doe",
    dueDate: "09 Sep 2024",
    amount: 1000,
    paid: 1000,
    amountDue: 0,
    status: "Unpaid",
  },
];

const InvoiceReport = () => {
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
      headerName: "Customer name",
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
      field: "dueDate",
      headerName: "Due date",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.dueDate}</Typography>
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
            <Typography variant="p">{row.amount}</Typography>
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
      field: "amountDue",
      headerName: "Amount due",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.amountDue}</Typography>
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
              variant="outlined"
              label={row.status}
              sx={{
                borderColor: row.status === "Paid" ? "primary.main" : "red",
                color: row.status === "Paid" ? "primary.main" : "red",
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
      invoiceNo: data.invoiceNo,
      customerName: data.customerName,
      dueDate: data.dueDate,
      amount: data.amount,
      paid: data.paid,
      amountDue: data.amountDue,
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
          title={"Invoice report"}
          description={"Manage your invoice report"}
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

export default InvoiceReport;
