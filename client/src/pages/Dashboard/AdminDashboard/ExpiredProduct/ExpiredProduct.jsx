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
import { toast } from "sonner";
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import PaginationUi from "../../../../components/ui/PaginationUi";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../../redux/api/admin/productApi";
import formatDate from "../../../../utils/formateDate";

const ExpiredProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const {
    data: productData,
    isLoading,
    refetch,
  } = useGetAllProductsQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <DPLoading />;
  }

  // Get paginated data based on current page
  const paginatedData = productData?.data?.result?.slice(
    page * productData?.data?.meta?.limit,
    (page + 1) * productData?.data?.meta?.limit
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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

  const columns = [
    {
      field: "img",
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
      field: "stockKeepingUnit",
      headerName: "SKU",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.stockKeepingUnit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "manufactureDate",
      headerName: "Manufacture Date",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.manufactureDate}</Typography>
          </Box>
        );
      },
    },
    {
      field: "expiryDate",
      headerName: "Expired date",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.expiryDate}</Typography>
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
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
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
        );
      },
    },
  ];

  const rows = paginatedData?.map((data) => {
    return {
      id: data._id,
      name: data.name,
      productImg: data.img,
      stockKeepingUnit: data.productInfo.stockKeepingUnit,
      manufactureDate: formatDate(new Date(data.createdAt)),
      expiryDate: formatDate(new Date(data.expiryDate)),
    };
  });

  return (
    <Container>
      <SectionTitle
        title="Product list"
        description="Mange your products here"
      />

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
            checkboxSelection
            disableRowSelectionOnClick
            hideFooter
          />
        </Box>
      </Box>
      <Box>
        <PaginationUi
          totalItems={productData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default ExpiredProduct;
