import {
  Avatar,
  AvatarGroup,
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
import PaginationUi from "../../../../components/ui/PaginationUi";
import CreateDesignationModal from "./CreateDesignationModal";
import EditDesignationModal from "./EditDesignationModal";
import {
  useDeleteDesignationsMutation,
  useGetAllDesignationsQuery,
} from "../../../../redux/api/finance/designationsApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { paginateFormateData } from "../../../../utils/pagination";
import formatDate from "../../../../utils/formateDate";
import { toast } from "sonner";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";

const Stores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const { data: allEmployee, isLoading: employeeLoading } =
    useGetAllEmployeesQuery({});

  const { data: designationData, isLoading } = useGetAllDesignationsQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [deleteDesignation] = useDeleteDesignationsMutation();

  if (isLoading || employeeLoading) return <DPLoading />;

  const employeeData = allEmployee?.data?.result;
  const paginateData = paginateFormateData(designationData?.data?.result, page);
  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting designation...");

    try {
      await deleteDesignation(id).unwrap();
      toast.success("Designation deleted successfully", { id: toastId });
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete designation", { id: toastId });
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
      field: "designationName",
      headerName: "Designation",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.designationName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "members",
      headerName: "Members",
      flex: 1,
      renderCell: ({ row }) => {
        const employee = row.allEmployee.filter(
          (employee) => employee.designation._id === row.id
        );

        return (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <AvatarGroup total={row.allEmployee.length}>
              {employee?.map((emp) => (
                <Avatar
                  key={emp._id}
                  alt="Remy Sharp"
                  src={emp.img}
                  sx={{
                    height: 24,
                    width: 24,
                  }}
                />
              ))}
            </AvatarGroup>
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
      field: "totalMember",
      headerName: "Total member",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.allEmployee.length}</Typography>
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
                borderColor: row.status === "Active" ? "green" : "red",
                color: row.status === "Active" ? "green" : "red",
                borderRadius: 1,
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
      designationName: data.name,
      members: data.members || 0,
      totalMember: data.totalMember || 0,
      status: data.status,
      createdAt: formatDate(new Date(data.createdAt)),
      allEmployee: employeeData,
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
          title={"Designation"}
          description={"Manage your designation"}
        />

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
          Add new designation
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
          totalItems={designationData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit expenses */}
      <EditDesignationModal open={open} setOpen={setOpen} id={productId} />

      {/* Add expenses */}
      <CreateDesignationModal open={createModal} setOpen={setCreateModal} />
    </Container>
  );
};

export default Stores;
