/* eslint-disable no-undef */
import {
  Box,
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
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import formatDate from "../../../../utils/formateDate";

const tableData = [
  {
    id: 1,
    employeeName: "John Doe",
    employeeCode: "EMP-001",
    from: "2021-10-10",
    to: "2021-10-15",
    leaveType: "Casual",
    duration: "5 days",
    shift: "Morning",
    createdAt: "2021-10-10",
    status: "Approved",
  },
];

const AdminLeaves = () => {
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  //   const handleDelete = async (id) => {
  //     const toastId = toast.loading("Deleting unit...");
  //     try {
  //       const res = await deleteUnit(id).unwrap();
  //       if (res.success) {
  //         toast.success(res.message, { id: toastId });
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

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
          <Box>
            <Typography variant="p">{row.name}</Typography>
          </Box>
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
            <Typography variant="p">{row.duration}</Typography>
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
      renderCell: () => {
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
              //   onClick={() => handleDelete(row.id)}
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
      name: data.employeeName,
      code: data.employeeCode,
      from: data.from,
      to: data.to,
      leaveType: data.leaveType,
      duration: data.duration,
      shift: data.shift,
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
          totalItems={tableData.length}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default AdminLeaves;
