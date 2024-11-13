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
import { toast } from "sonner";
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useDeleteSaleReturnMutation,
  useGetAllSaleReturnQuery,
} from "../../../../redux/api/admin/salesReturnApi";
import formatDate from "../../../../utils/formateDate";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateSaleReturnModal from "./CreateSaleReturnModal";

const SalesReturn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [createModal, setCreateModal] = useState(false);

  const { data: saleReturnData, isLoading } = useGetAllSaleReturnQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });

  const [deleteSaleReturn] = useDeleteSaleReturnMutation();

  if (isLoading) return <DPLoading />;

  const productsData = saleReturnData?.data?.result.reduce((acc, curr) => {
    const saleReturnId = curr._id;
    const customerName = curr.customerName;
    const status = curr.status;
    const paymentTypeStatus = curr.paymentTypeStatus;
    const createdAt = curr.createdAt;
    const productsWithCustomer = curr?.products?.map((product) => ({
      ...product,
      customerName,
      status,
      paymentTypeStatus,
      saleReturnId,
      createdAt,
    }));
    return acc.concat(productsWithCustomer);
  }, []);

  const paginateData = paginateFormateData(productsData, page);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting sale return...");

    try {
      const res = await deleteSaleReturn(id).unwrap();

      if (res?.success) {
        toast.success("Sale return deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete sale return", { id: toastId });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
            <Typography variant="p">{row.productName}</Typography>
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
                      : row.status === "Refunded"
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
    {
      field: "id",
      headerName: "Action",
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
              component={"button"}
              onClick={() => handleDelete(row.saleReturnId)}
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

  const rows = paginateData.map((data) => {
    const compositeKey = `${data._id}_${Math.random()}`;
    return {
      id: data._id,
      saleReturnId: data.saleReturnId,
      productImg: data.img,
      productName: data.name,
      customerName: data.customerName || "N/A",
      status: data.status,
      payment: data.paymentTypeStatus,
      date: formatDate(new Date(data.createdAt)),
      compositeKey: compositeKey,
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
          title={"Sales return list"}
          description={"Manage your sales return here"}
        />

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
          Add new sale return
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <MenuItem value={"createdAt"}>Oldest First</MenuItem>
                <MenuItem value={"-createdAt"}>Newest First</MenuItem>
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
            getRowId={(row) => row.compositeKey}
          />
        </Box>
      </Box>

      <Box>
        <PaginationUi
          totalItems={productsData.length}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Add warranty modal */}
      <CreateSaleReturnModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default SalesReturn;
