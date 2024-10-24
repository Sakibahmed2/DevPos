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
import SectionTitle from "../../../../components/ui/SectionTitle";

import PaginationUi from "../../../../components/ui/PaginationUi";
import EditBrandModal from "./EditBrandModal";

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useDeleteBrandMutation,
  useGetAllBrandsQuery,
} from "../../../../redux/api/admin/brandApi";
import formatDate from "../../../../utils/formateDate";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateBrandModal from "./CreateBrandModal";
import { toast } from "sonner";

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createBrandModal, setCreateBrandModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const { data: brandData, isLoading } = useGetAllBrandsQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteBrand] = useDeleteBrandMutation();
  isLoading && <DPLoading />;

  const limit = brandData?.data?.meta?.limit;

  const paginateData = paginateFormateData(
    brandData?.data?.result,
    page,
    limit
  );

  const handleDelete = async (brandId) => {
    const toastId = toast.loading("Deleting brand...");
    try {
      const res = await deleteBrand(brandId).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
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
      field: "name",
      headerName: "Brands",
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
      field: "brandLogo",
      headerName: "Logo",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <img src={row.brandLogo} alt="laptop" className="" />
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created on",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.createdAt}</Typography>
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
                variant="outlined"
                size="small"
                sx={{
                  color: row.status === "Active" ? "green" : "red",
                }}
                label={row.status}
              ></Chip>
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
              onClick={() => handleDelete(row.id)}
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
      name: data.name,
      brandLogo: data.img,
      createdAt: formatDate(new Date(data.createdAt)),
      status: data.status,
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"Brand"} description={"Manage your brand"} />

        <Button
          onClick={() => setCreateBrandModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new brand
        </Button>
      </Stack>

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
          totalItems={brandData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit brand modal */}
      <EditBrandModal open={open} setOpen={setOpen} id={productId} />

      {/* create brand modal */}
      <CreateBrandModal open={createBrandModal} setOpen={setCreateBrandModal} />
    </Container>
  );
};

export default Brands;
