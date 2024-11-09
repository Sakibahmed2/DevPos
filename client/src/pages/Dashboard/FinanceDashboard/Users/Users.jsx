import {
  Avatar,
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

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import PaginationUi from "../../../../components/ui/PaginationUi";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../../../redux/api/auth/authApi";
import formatDate from "../../../../utils/formateDate";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateUserModal from "./CreateUserModal";
import EditUserModal from "./EditUserModal";
import { toast } from "sonner";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [productId, setProductId] = useState(null);

  const { data: usersData, isLoading } = useGetAllUsersQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(usersData?.data?.result, page);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting user...");
    try {
      const res = await deleteUser(id).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete user", { id: toastId });
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
      field: "img",
      headerName: "User",
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
            <Avatar src={row.img} alt={row.name} variant="square" />
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
      field: "phone",
      headerName: "Phone",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.phone}</Typography>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.email}</Typography>
          </Box>
        );
      },
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.role}</Typography>
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
            <Chip
              variant="outlined"
              label={row.status}
              sx={{
                borderColor: row.status === "Active" ? "primary.main" : "red",
                color: row.status === "Active" ? "primary.main" : "red",
                borderRadius: 1,
                fontWeight: "600",
              }}
            />
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
      img: data.img,
      name: data.name,
      phone: data.phone || "N/A",
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: formatDate(new Date(data.createdAt)),
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"User list"} description={"Manage your user"} />

        <Button
          onClick={() => setCreateModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new user
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
          totalItems={usersData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit user */}
      <EditUserModal open={open} setOpen={setOpen} id={productId} />

      {/* Add user */}
      <CreateUserModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default Users;
