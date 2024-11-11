import { Box, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import DPLoading from "../../../ui/DPLoading";

const RecentProducts = () => {
  const { data: productsData, isLoading } = useGetAllProductsQuery({
    limit: 3,
    sort: "-createdAt",
  });

  if (isLoading) return <DPLoading />;

  const columns = [
    {
      headerName: "#",
      width: 90,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              {row.index + 1}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "img",
      headerName: "Products",
      width: 150,
      alignItems: "center",
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
            <img
              src={row.img}
              alt="laptop"
              className="w-24 h-14 object-contain"
            />
          </Box>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              {row.name}
            </Typography>
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
            <Typography
              variant="p"
              sx={{
                fontSize: "20px",
              }}
            >
              ${row.price}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const rows = productsData?.data?.result.map((data, idx) => {
    return {
      index: idx,
      id: data._id,
      name: data.name,
      price: data.pricingAndStock.price,
      img: data.img,
    };
  });

  return (
    <Box
      sx={{
        mt: 5,
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          mb: 2,
        }}
      >
        <Typography variant="h5" component={"p"}>
          Recent Products
        </Typography>
      </Stack>

      <Box>
        <DataGrid
          sx={{
            border: 0,
            borderTop: "1px solid lightgray",
          }}
          rows={rows}
          columns={columns}
          rowHeight={80}
          hideFooter
        />
      </Box>
    </Box>
  );
};

export default RecentProducts;
