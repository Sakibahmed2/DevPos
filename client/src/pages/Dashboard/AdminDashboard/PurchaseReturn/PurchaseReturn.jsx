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
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useDeletePurchaseReturnMutation,
  useGetAllPurchaseReturnQuery,
} from "../../../../redux/api/admin/purchaseReturnApi";
import formatDate from "../../../../utils/formateDate";
import CreatePurchaseReturnModal from "./CreatePurchaseReturnModal";
import EditPurchaseReturnModal from "./EditPurchaseReturnModal";
import { paginateFormateData } from "../../../../utils/pagination";

const PurchaseReturn = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(null);
  const [createModal, setCreateModal] = useState(false);

  const { data: purchaseReturnData, isLoading } = useGetAllPurchaseReturnQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });

  const [deletePurchaseReturn] = useDeletePurchaseReturnMutation();

  if (isLoading) return <DPLoading />;

  const purchaseReturnProducts = purchaseReturnData?.data?.result.reduce(
    (acc, curr) => {
      const supplierName = curr?.supplierName;
      const createdAt = curr?.createdAt;
      const refNo = curr?.refNo;
      const status = curr?.status;
      const paymentTypeStatus = curr?.paymentTypeStatus;
      const purchaseItemId = curr?._id;
      const productsWithCustomer = curr?.products?.map((product) => ({
        ...product,
        supplierName,
        createdAt,
        refNo,
        status,
        paymentTypeStatus,
        purchaseItemId,
      }));
      return acc.concat(productsWithCustomer);
    },
    []
  );

  const paginatedData = paginateFormateData(purchaseReturnProducts, page);

  const HandleDelete = async (id) => {
    const toastId = toast.loading("Deleting purchase return...");
    try {
      const res = await deletePurchaseReturn(id).unwrap();
      if (res?.success) {
        toast.success("Purchase return deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete purchase return", { id: toastId });
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
            <img
              src={row.productImg}
              alt="laptop"
              className="h-8 w-12 object-contain"
            />
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
      field: "supplierName",
      headerName: "Supplier name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.supplierName}</Typography>
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
      field: "total",
      headerName: "Grand total",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">${row.total}</Typography>
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
              onClick={() => HandleDelete(row.id)}
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
    const compositeKey = `${data._id}_${Math.random()}`;
    return {
      id: data.purchaseItemId,
      productImg: data.img,
      productName: data.name,
      supplierName: data.supplierName || "N/A",
      reference: data.refNo,
      status: data.status,
      total: data.pricingAndStock.price,
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
          title={"Purchase return list"}
          description={"Manage your purchase return here"}
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
          Add new purchase return
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
              onChange={(e) => setSearchTerm(e.target.value)}
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
                <MenuItem value={"createdAt"}>Oldest First</MenuItem>
                <MenuItem value={"-createdAt"}>Newest First</MenuItem>
              </Select>
            </FormControl>{" "}
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
          totalItems={purchaseReturnProducts?.length}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit warranty modal */}
      <EditPurchaseReturnModal open={open} setOpen={setOpen} id={productId} />

      {/* Add warranty modal */}
      <CreatePurchaseReturnModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default PurchaseReturn;
