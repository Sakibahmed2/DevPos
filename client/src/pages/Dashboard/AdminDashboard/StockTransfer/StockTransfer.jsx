import {
  Box,
  Button,
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

import CreateStockTransferModal from "./CreateStockTransferModal";
import EditStockTransferModal from "./EditStockTransferModal";
import {
  useDeleteStockTransferMutation,
  useGetAllStockTransferQuery,
} from "../../../../redux/api/admin/stockTransferApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { paginateFormateData } from "../../../../utils/pagination";
import formatDate from "../../../../utils/formateDate";
import { toast } from "sonner";

const StockTransfer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [createStockModal, setCreateStockModal] = useState(false);
  const { data: stockTransferData, isLoading } = useGetAllStockTransferQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteStockTransfer] = useDeleteStockTransferMutation();

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(
    stockTransferData?.data?.result,
    page
  );

  const deleteStockTransferHandler = async (id) => {
    const toastId = toast.loading("Deleting stock transfer...");
    try {
      const res = await deleteStockTransfer(id).unwrap();
      if (res.success) {
        toast.success("Stock transfer deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete stock transfer", { id: toastId });
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = [
    {
      field: "from",
      headerName: "From warehouse",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.from}</Typography>
          </Box>
        );
      },
    },
    {
      field: "to",
      headerName: "To warehouse",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.to}</Typography>
          </Box>
        );
      },
    },
    {
      field: "NoOfProduct",
      headerName: "No of product",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box textAlign={"center"}>
            <Typography variant="p">{row.NoOfProduct}</Typography>
          </Box>
        );
      },
    },
    {
      field: "quantityTransferred",
      headerName: "Quantity transferred",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box textAlign={"center"}>
            <Typography variant="p">{row.quantityTransferred}</Typography>
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
              onClick={() => deleteStockTransferHandler(row.id)}
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
    return {
      id: data._id,
      from: data.from.name,
      to: data.to.name,
      NoOfProduct: data.noOfProduct,
      quantityTransferred: data.quantityTransferred,
      refNo: data.refNo,
      date: formatDate(new Date(data.createdAt)),
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
          title={"Stock transfer"}
          description={"Mange stock transfer"}
        />

        <Button
          onClick={() => setCreateStockModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new stock transfer
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
          />
        </Box>
      </Box>

      <Box>
        <PaginationUi
          totalItems={stockTransferData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit warranty modal */}
      <EditStockTransferModal open={open} setOpen={setOpen} id={productId} />

      {/* Add warranty modal */}
      <CreateStockTransferModal
        open={createStockModal}
        setOpen={setCreateStockModal}
      />
    </Container>
  );
};

export default StockTransfer;
