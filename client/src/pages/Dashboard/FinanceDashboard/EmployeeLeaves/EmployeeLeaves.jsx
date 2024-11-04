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
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DPLoading from "../../../../components/ui/DPLoading";
import {
  useDeleteLeavesMutation,
  useGetAllLeavesQuery,
} from "../../../../redux/api/finance/leavesApi";
import formatDate from "../../../../utils/formateDate";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateEmployeeLeaveModal from "./CreateEmployeeLeaveModal";
import EditEmployeeLeaveModal from "./EditEmployeeLeaveModal";
import { toast } from "sonner";

const EmployeeLeaves = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createUnitsModal, setCreateUnitsModal] = useState(false);
  const [productId, setProductId] = useState(null);

  const { data: allLeave, isLoading } = useGetAllLeavesQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });

  const [deleteLeave] = useDeleteLeavesMutation();

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(allLeave?.data?.result, page);

  const handleDelete = async (id) => {
    const toastId = toast.loading("Deleting leave...");

    try {
      const res = await deleteLeave(id).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete leave", { id: toastId });
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
      field: "code",
      headerName: "Emp id",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.code}</Typography>
          </Box>
        );
      },
    },
    {
      field: "leaveType",
      headerName: "Type",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.leaveType}</Typography>
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
      field: "duration",
      headerName: "duration",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">
              {row.duration.days} days{" "}
              {row.duration.hours > 0 && row.duration.hours + " hours"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Applied on",
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
      field: "reason",
      headerName: "Reason",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">
              {row.reason ? row.reason : "N/A"}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "status",
      headerName: "Approval",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            {
              <Chip
                variant="outlined"
                size="small"
                sx={{
                  color: row.status === "Approved" ? "primary.main" : "red",
                  borderColor:
                    row.status === "Approved" ? "primary.main" : "red",
                  borderRadius: 1,
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
      name: `${data.employee.firstName} ${data.employee.lastName}`,
      code: data.employee.employeeCode,
      leaveType: data.leaveType.name,
      duration: data.duration,
      createdAt: formatDate(new Date(data.createdAt)),
      date: formatDate(new Date(data.startDate)),
      status: data.status,
      reason: data.reason,
    };
  });

  return (
    <Container>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle title={"Leaves"} description={"Manage your leaves"} />

        <Button
          onClick={() => setCreateUnitsModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Apply for leave
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
          totalItems={allLeave?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>

      {/* Edit units modal */}
      <EditEmployeeLeaveModal open={open} setOpen={setOpen} id={productId} />

      {/* Create units modal */}
      <CreateEmployeeLeaveModal
        open={createUnitsModal}
        setOpen={setCreateUnitsModal}
      />
    </Container>
  );
};

export default EmployeeLeaves;
