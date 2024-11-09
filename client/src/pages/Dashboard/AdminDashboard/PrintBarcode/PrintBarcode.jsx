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
import { useRef, useState } from "react";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetAllStoresQuery } from "../../../../redux/api/finance/storeApi";
import { useGetAllWarehousesQuery } from "../../../../redux/api/finance/warehouseApi";

import Barcode from "react-barcode";
import { useGetAllProductsQuery } from "../../../../redux/api/admin/productApi";
import { useReactToPrint } from "react-to-print";

const PrintBarcode = () => {
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [productId, setProductId] = useState("");
  const { data: warehouseData, isLoading: warehouseLoading } =
    useGetAllWarehousesQuery({});
  const { data: storeData, isLoading: storeLoading } = useGetAllStoresQuery({});

  const { data: productData, isLoading: productLoading } =
    useGetAllProductsQuery({
      searchTerm: searchTerm,
    });

  console.log(productData?.data?.result);
  const contentRef = useRef();

  const handlePrint = useReactToPrint({ contentRef });

  if (warehouseLoading || storeLoading || productLoading) return <DPLoading />;

  const columns = [
    {
      field: "img",
      headerName: "Products",
      width: 150,
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
            <img src={row.img} alt="laptop" className="object-contain w-16 " />
          </Box>
        );
      },
    },
    {
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
      field: "stockKeepingUnit",
      headerName: "SKU",
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
              {row.stockKeepingUnit}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "code",
      headerName: "Code",
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
              {row.code}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "quantity",
      headerName: "QTY",
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
              {row.quantity}
            </Typography>
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
            <Chip
              onClick={() => setProductId(row.id)}
              component={"button"}
              label="Add"
              variant="outlined"
              sx={{
                color: "black",
                borderColor: "black",
                borderRadius: 1,
                cursor: "pointer",
              }}
            ></Chip>
          </Stack>
        );
      },
    },
  ];

  const rows = productData?.data?.result.map((data) => {
    return {
      id: data._id,
      name: data.name,
      img: data.img,
      stockKeepingUnit: data.productInfo.stockKeepingUnit,
      code: data.productInfo.itemCode,
      quantity: data.pricingAndStock.quantity,
    };
  });

  return (
    <Container>
      <Box>
        <SectionTitle
          title={"Print barcode"}
          description={"Manage your barcode"}
        />

        {/* print barcode form & table */}

        <Box
          sx={{
            border: "1px solid lightgray",
            p: 3,
            mt: 5,
          }}
        >
          {/* Sort and search product */}
          <Stack>
            <Stack
              direction={"row"}
              sx={{
                alignItems: "center",
                width: "50%",
                gap: 3,
              }}
            >
              <FormControl fullWidth>
                <InputLabel>Warehouse</InputLabel>
                <Select
                  value={sortBy}
                  label="Warehouse"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {warehouseData?.data?.result.map((warehouse) => (
                    <MenuItem key={warehouse.name} value={warehouse.name}>
                      {warehouse.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Store</InputLabel>
                <Select
                  value={sortBy}
                  label="Store"
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  {storeData?.data?.result.map((store, idx) => (
                    <MenuItem key={idx} value={store.name}>
                      {store.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack
              sx={{
                mt: 3,
                width: "50%",
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
            </Stack>
          </Stack>

          {/* products table */}
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
              <Typography variant="h5" component={"p"} fontWeight={"500"}>
                Products
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

          {/* print barcode button */}

          <Box
            ref={contentRef}
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {productId && (
              <Barcode
                value={`http://localhost:5173/admin/products/${productId}`}
                width={1}
                height={60}
                fontOptions="bold"
                textAlign="center"
                textMargin={4}
                fontSize={14}
                lineColor="#000"
              />
            )}
          </Box>

          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Button onClick={handlePrint}>Print Barcode</Button>

            <Button
              sx={{
                bgcolor: "black",
              }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PrintBarcode;
