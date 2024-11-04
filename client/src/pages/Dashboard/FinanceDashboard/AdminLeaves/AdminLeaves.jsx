/* eslint-disable no-undef */
import {
  Box,
  Chip,
  Container,
  FormControl,
  InputLabel,
  Menu,
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
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import formatDate from "../../../../utils/formateDate";
import {
  useDeleteLeavesMutation,
  useGetAllLeavesQuery,
  useUpdateLeaveApprovalMutation,
} from "../../../../redux/api/finance/leavesApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { paginateFormateData } from "../../../../utils/pagination";
import { toast } from "sonner";

const AdminLeaves = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const { data: allLeave, isLoading } = useGetAllLeavesQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });
  const [updateApproval] = useUpdateLeaveApprovalMutation();
  const [deleteLeave] = useDeleteLeavesMutation();

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(allLeave?.data?.result, page);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateLeaveApproval = async (id, status) => {
    const toastId = toast.loading("Updating leave status...");
    try {
      const res = await updateApproval({ id: id, status: status }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId });
        handleClose();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to update leave status", { id: toastId });
    }
  };

  const handleDeleteLeave = async (id) => {
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

  const columns = [
    {
      field: "name",
      headerName: "Emp name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Stack
            direction="column"
            spacing={0}
            sx={{
              mt: 2,
            }}
          >
            <Typography variant="body2">{row.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {row.designation}
            </Typography>
          </Stack>
        );
      },
    },
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
      field: "from",
      headerName: "From",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.from}</Typography>
          </Box>
        );
      },
    },
    {
      field: "to",
      headerName: "To",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.to}</Typography>
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
      field: "shift",
      headerName: "shift",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.shift}</Typography>
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
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
            <Box
              component={"button"}
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Chip
                label={row.status}
                size="small"
                sx={{
                  color: "white",
                  bgcolor:
                    row.status === "Approved"
                      ? "primary.main"
                      : row.status === "Pending"
                      ? "darkorange"
                      : "red",
                  borderRadius: 1,
                }}
              />
            </Box>

            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={() => updateLeaveApproval(row.id, "Approved")}>
                Approved
              </MenuItem>
              <MenuItem onClick={() => updateLeaveApproval(row.id, "Rejected")}>
                Rejected
              </MenuItem>
            </Menu>
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
              component={"button"}
              onClick={() => handleDeleteLeave(row.id)}
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
      from: formatDate(new Date(data.startDate)),
      to: formatDate(new Date(data.endDate)),
      leaveType: data.leaveType.name,
      duration: data.duration,
      shift: data.employee.shift.name,
      createdAt: formatDate(new Date(data.createdAt)),
      designation: data.employee.designation.name,
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
        <SectionTitle title={"Leaves"} description={"Manage your leaves"} />
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
    </Container>
  );
};

export default AdminLeaves;
