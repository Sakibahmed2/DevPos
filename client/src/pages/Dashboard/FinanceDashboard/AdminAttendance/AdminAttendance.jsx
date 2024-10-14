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

// icons
import deleteIcon from "../../../../assets/dashboard icons/delete-icon.svg";
import editIcons from "../../../../assets/dashboard icons/edit-icon.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import CreateAttendanceModal from "./CreateAttendanceModal";
import EditAttendanceModal from "./EditAttendanceModal";

// table data
const tableData = [
  {
    id: 1,
    empName: "John Doe",
    empDesignation: "Software Engineer",
    empId: "EMP-001",
    date: "25 May 2023",
    shift: "Regular",
    checkIn: "9:00 AM",
    production: "9 hours",
    overTime: "2 hours",
    totalWorkHour: "8 hours",
    approval: "Approved",
  },
  {
    id: 2,
    empName: "John Doe",
    empDesignation: "Software Engineer",
    empId: "EMP-001",
    date: "25 May 2023",
    shift: "Regular",
    checkIn: "9:00 AM",
    production: "9 hours",
    overTime: "2 hours",
    totalWorkHour: "8 hours",
    approval: "Pending",
  },
];

const AdminAttendance = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [productId, setProductId] = useState(null);

  // const itemsPerPage = 3 ;

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleModal = (productId) => {
    setOpen(true);
    setProductId(productId);
  };

  const columns = [
    {
      field: "empName",
      headerName: "EMP name",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.empName}</Typography>
          </Box>
        );
      },
    },
    {
      field: "empId",
      headerName: "EMP ID",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.empId}</Typography>
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
      field: "shift",
      headerName: "Shift",
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
      field: "checkIn",
      headerName: "Check in",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.checkIn}</Typography>
          </Box>
        );
      },
    },
    {
      field: "production",
      headerName: "Production",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.production}</Typography>
          </Box>
        );
      },
    },
    {
      field: "overTime",
      headerName: "Over time",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.overTime}</Typography>
          </Box>
        );
      },
    },
    {
      field: "totalWorkHour",
      headerName: "Total hour",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.totalWorkHour}</Typography>
          </Box>
        );
      },
    },
    {
      field: "approval",
      headerName: "Approval",
      flex: 1,
      renderCell: ({ row }) => {
        console.log(row.approval);

        return (
          <Box>
            <Chip
              component={"button"}
              variant="filled"
              label={row.approval}
              sx={{
                color: "white",
                bgcolor: row.approval === "Approved" ? "primary.main" : "red",
                fontWeight: 500,
                borderRadius: 1,
                cursor: "pointer",
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

  const rows = tableData.map((data) => {
    return {
      id: data.id,
      empName: data.empName,
      empId: data.empId,
      empDesignation: data.empDesignation,
      checkIn: data.checkIn,
      production: data.production,
      overTime: data.overTime,
      totalWorkHour: data.totalWorkHour,
      date: data.date,
      shift: data.shift,
      approval: data.approval,
    };
  });

  return (
    <Container>
      <Box
        sx={{
          mt: 7,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <SectionTitle
            title={"Attendance"}
            description={"Manage your attendance"}
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
            Add new Attendance
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
                  <MenuItem value={"date"}>date</MenuItem>
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
            totalItems={tableData.length}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </Box>

        <CreateAttendanceModal open={createModal} setOpen={setCreateModal} />
        <EditAttendanceModal open={open} setOpen={setOpen} id={productId} />
      </Box>
    </Container>
  );
};

export default AdminAttendance;
