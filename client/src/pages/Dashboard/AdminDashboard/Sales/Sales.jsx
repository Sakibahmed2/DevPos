import {
  Box,
  Button,
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
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import CreateWarrantyModal from "../Warranties/CreateWarrantyModal";
import EditSalesModal from "./EditSalesModal";

const tableData = [
  {
    id: 1,
    customerName: "John Doe",
    reference: "123456",
    date: "09 Sep 2024",
    status: "Completed",
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    payment: "Paid",
    biller: "Admin",
  },
  {
    id: 2,
    customerName: "John Doe",
    reference: "123456",
    date: "09 Sep 2024",
    status: "Completed",
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    payment: "Paid",
    biller: "Admin",
  },
  {
    id: 3,
    customerName: "John Doe",
    reference: "123456",
    date: "09 Sep 2024",
    status: "Pending",
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    payment: "Due",
    biller: "Admin",
  },
  {
    id: 4,
    customerName: "John Doe",
    reference: "123456",
    date: "09 Sep 2024",
    status: "Completed",
    grandTotal: 1000,
    paid: 1000,
    due: 0,
    payment: "Paid",
    biller: "Admin",
  },
];

const Sales = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [createModal, setCreateModal] = useState(false);

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
      field: "reference",
      headerName: "Reference",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.reference}</Typography>
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
                  backgroundColor:
                    row.status === "Completed" ? "primary.main" : "red",
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
            <Typography variant="p">${row.grandTotal}</Typography>
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
      headerName: "Due",
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
                  color: row.payment === "Paid" ? "primary.main" : "red",
                  borderRadius: 1,
                  border:
                    row.payment === "Paid"
                      ? "1px solid lightgreen"
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
    {
      field: "biller",
      headerName: "Biller",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.biller}</Typography>
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
      customerName: data.customerName,
      reference: data.reference,
      date: data.date,
      status: data.status,
      grandTotal: data.grandTotal,
      paid: data.paid,
      due: data.due,
      payment: data.payment,
      biller: data.biller,
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"Sales list"} description={"Manage your sale"} />

        <Button
          onClick={() => setCreateModal((prev) => !prev)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new sale
        </Button>
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

      {/* Edit warranty modal */}
      <EditSalesModal open={open} setOpen={setOpen} id={productId} />

      {/* Add warranty modal */}
      <CreateWarrantyModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default Sales;
