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

import DPLoading from "../../../../components/ui/DPLoading";
import {
  useDeleteManageStockMutation,
  useGetAllManageStocksQuery,
} from "../../../../redux/api/admin/manageStockApi";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateStockModal from "./CreateStockModal";
import EditStockModal from "./EditStockModal";
import formatDate from "../../../../utils/formateDate";
import { toast } from "sonner";

const ManageStocks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [createStockModal, setCreateStockModal] = useState(false);

  const { data: manageStockData, isLoading } = useGetAllManageStocksQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteMangeStock] = useDeleteManageStockMutation();
  if (isLoading) {
    return <DPLoading />;
  }

  const paginateData = paginateFormateData(manageStockData?.data?.result, page);

  const handleDeleteStock = async (id) => {
    const toastId = toast.loading("Deleting stock...");

    try {
      const res = await deleteMangeStock(id).unwrap();

      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete stock", { id: toastId });
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
      field: "warehouse",
      headerName: "Warehouse",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.warehouse}</Typography>
          </Box>
        );
      },
    },
    {
      field: "shop",
      headerName: "Shop",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.shop}</Typography>
          </Box>
        );
      },
    },
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
            <Typography variant="p">{row.name}</Typography>
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
      field: "quantity",
      headerName: "Quantity",
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
              onClick={() => handleDeleteStock(row.id)}
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
      name: data.product.name,
      productImg: data.product.img,
      shop: data.shop.name,
      warehouse: data.warehouse.name,
      date: formatDate(new Date(data.createdAt)),
      quantity: data.quantity || 0,
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
          title={"Manage stock"}
          description={"Manage your stock"}
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
          Add new stock
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
          totalItems={manageStockData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit warranty modal */}
      <EditStockModal open={open} setOpen={setOpen} id={productId} />

      {/* Add warranty modal */}
      <CreateStockModal open={createStockModal} setOpen={setCreateStockModal} />
    </Container>
  );
};

export default ManageStocks;
