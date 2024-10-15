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
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";

// table data
const tableData = [
  {
    id: 1,
    supplier: "John Doe",
    date: "18 Aug 2024",
    refNo: "123456",
    totalAmount: 20000,
    paymentMethod: "Paypal",
    discount: 10,
    taxAmount: 200,
  },
  {
    id: 2,
    supplier: "John Doe",
    date: "18 Aug 2024",
    refNo: "123456",
    totalAmount: 20000,
    paymentMethod: "Paypal",
    discount: 10,
    taxAmount: 200,
  },
];

const TaxReport = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    {
      field: "supplier",
      headerName: "Supplier",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.supplier}</Typography>
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
      field: "refNo",
      headerName: "Ref no",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.refNo}</Typography>
          </Box>
        );
      },
    },

    {
      field: "totalAmount",
      headerName: "Total amount",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.totalAmount}</Typography>
          </Box>
        );
      },
    },
    {
      field: "paymentMethod",
      headerName: "Payment method",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography
              variant="p"
              component={"p"}
              sx={{
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {row.paymentMethod}
            </Typography>
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
  ];

  const rows = tableData.map((data) => {
    return {
      id: data.id,
      supplier: data.supplier,
      date: data.date,
      refNo: data.refNo,
      totalAmount: data.totalAmount,
      paymentMethod: data.paymentMethod,
      discount: data.discount,
      taxAmount: data.taxAmount,
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
          title={"Tax report"}
          description={"Manage your tax report"}
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

export default TaxReport;
