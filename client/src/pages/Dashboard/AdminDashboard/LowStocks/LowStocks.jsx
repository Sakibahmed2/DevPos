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
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import PaginationUi from "../../../../components/ui/PaginationUi";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../../redux/api/admin/productApi";
import EditLowStockModal from "./EditLowStockModal";
import { toast } from "sonner";
import { paginateFormateData } from "../../../../utils/pagination";

const LowStocks = () => {
  const [sortBy, setSortBy] = useState("");
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [page, setPage] = useState(0);
  const [limit] = useState(5);
  const { data, isLoading, refetch } = useGetAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) return <DPLoading />;

  const productData = data?.data?.result?.filter(
    (product) =>
      product.pricingAndStock.quantity < product.pricingAndStock.quantityAlert
  );

  const handleDeleteProduct = async (productId) => {
    const toastId = toast.loading("Deleting product...");
    try {
      const res = await deleteProduct(productId).unwrap();
      console.log(res);
      if (res.success) {
        toast.success(res.message, toastId);
        refetch();
      }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  const handleModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = [
    {
      field: "img",
      headerName: "Products",
      width: 90,
      renderCell: ({ row }) => (
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
      ),
    },
    {
      flex: 1,
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.name}</Typography>
        </Box>
      ),
    },
    {
      field: "warehouse",
      headerName: "Warehouse",
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.warehouse}</Typography>
        </Box>
      ),
    },
    {
      field: "store",
      headerName: "Store",
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.store}</Typography>
        </Box>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.category}</Typography>
        </Box>
      ),
    },
    {
      field: "stockKeepingUnit",
      headerName: "SKU",
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.stockKeepingUnit}</Typography>
        </Box>
      ),
    },
    {
      field: "quantity",
      headerName: "Qty",
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.quantity}</Typography>
        </Box>
      ),
    },
    {
      field: "quantityAlert",
      headerName: "Qty alert",
      renderCell: ({ row }) => (
        <Box>
          <Typography variant="p">{row.quantityAlert}</Typography>
        </Box>
      ),
    },
    {
      field: "id",
      headerName: "Action",
      renderCell: ({ row }) => (
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
            onClick={() => handleDeleteProduct(row.id)}
            sx={{
              border: "1px solid gray",
              borderRadius: 1,
              p: "5px 3px",
            }}
          >
            <img src={deleteIcon} alt="" className="w-5 h-5" />
          </Box>
        </Stack>
      ),
    },
  ];

  // Calculate paginated data
  const paginatedData = paginateFormateData(productData, page);

  // Prepare rows for the DataGrid
  const rows = paginatedData?.map((data) => ({
    id: data._id,
    name: data.name,
    productImg: data.img,
    stockKeepingUnit: data.productInfo.stockKeepingUnit,
    category: data.productInfo.category.name,
    warehouse: data.productInfo.warehouse,
    store: data.productInfo.store,
    quantity: data.pricingAndStock.quantity,
    quantityAlert: data.pricingAndStock.quantityAlert,
  }));

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      <SectionTitle title="Low stocks" description="Manage your low stocks" />

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
          totalItems={productData?.length}
          currentPage={page}
          onPageChange={handlePageChange}
          itemsPerPage={limit} // Optionally pass itemsPerPage if needed
        />
      </Box>

      <EditLowStockModal open={open} setOpen={setOpen} id={productId} />
    </Container>
  );
};

export default LowStocks;
