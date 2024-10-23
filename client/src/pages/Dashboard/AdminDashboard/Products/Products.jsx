import {
  Avatar,
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
import { NavLink } from "react-router-dom";
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import visibilityIcon from "../../../../assets/dashboard icons/visibility-icon.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import PaginationUi from "../../../../components/ui/PaginationUi";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../../../redux/api/admin/productApi";
import { toast } from "sonner";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const {
    data: productsData,
    isLoading,
    refetch,
  } = useGetAllProductsQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const itemsPerPage = 5;

  if (isLoading) {
    return <DPLoading />;
  }

  // Get paginated data based on current page
  const paginatedData = productsData?.data?.result?.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
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
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.stockKeepingUnit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "category",
      headerName: "Category",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.category}</Typography>
          </Box>
        );
      },
    },
    {
      field: "brand",
      headerName: "Brand",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.brand}</Typography>
          </Box>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.price}</Typography>
          </Box>
        );
      },
    },
    {
      field: "unit",
      headerName: "Unit",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.unit}</Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "QTY",
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.quantity}</Typography>
          </Box>
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Avatar alt="Remy Sharp" src={row.createdBy.img} />
            <Typography variant="p">{row.createdBy.name}</Typography>
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
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                border: "1px solid gray",
                borderRadius: 1,
                p: "5px 3px",
              }}
              component={NavLink}
              to={`/admin/products/${row.id}`}
            >
              <img src={visibilityIcon} alt="" className="h-5 w-5" />
            </Box>

            <Box
              component={NavLink}
              to={`/admin/products/edit/${row.id}`}
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
        );
      },
    },
  ];

  const rows = paginatedData?.map((data) => {
    return {
      id: data._id,
      name: data.name,
      price: data.pricingAndStock.price,
      productImg: data.img,
      stockKeepingUnit: data.productInfo.stockKeepingUnit,
      category: data.productInfo.category,
      brand: data.productInfo.brand,
      unit: data.productInfo.unit,
      quantity: data.pricingAndStock.quantity,
      createdBy: data.createdBy,
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
            hideFooter
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Box>
        <PaginationUi
          totalItems={productsData?.data?.length}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default ProductsPage;
