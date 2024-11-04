import {
  Box,
  Chip,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  LinearProgress,
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
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import PaginationUi from "../../../../components/ui/PaginationUi";
import { useGetAllAttendanceQuery } from "../../../../redux/api/finance/attendanceApi";
import DPLoading from "../../../../components/ui/DPLoading";
import { paginateFormateData } from "../../../../utils/pagination";
import formatDate from "../../../../utils/formateDate";
import formatTime from "../../../../utils/formateTime";
import dayjs from "dayjs";

// table data
const tableData = [
  {
    id: 1,
    date: "25 May 2023",
    checkIn: "09:15 AM",
    checkOut: "06:00 PM",
    production: "8h 45m",
    breakTime: "1h 15m",
    overTime: "0h 50m",
    progress: 50,
    totalWorkHour: "9h 30m",
    status: "Present",
  },
  {
    id: 2,
    date: "25 May 2023",
    checkIn: "",
    checkOut: "",
    production: "",
    breakTime: "",
    overTime: "",
    progress: 80,
    totalWorkHour: "",
    status: "Absent",
  },
];

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  const { data: allAttendance, isLoading } = useGetAllAttendanceQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });

  if (isLoading) <DPLoading />;

  const paginateData = paginateFormateData(allAttendance?.data?.result, page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
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
      field: "checkOut",
      headerName: "Check out",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Typography variant="p">{row.checkOut}</Typography>
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
            <Typography variant="p">{row.production || "8 hours"}</Typography>
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
            <Typography variant="p">{row.overTime || 0}</Typography>
          </Box>
        );
      },
    },
    {
      field: "progress",
      headerName: "Progress",
      flex: 1,
      renderCell: ({ row }) => {
        const hours = parseInt(row.totalWorkHour);
        const progress = Math.min((hours / 8) * 100, 100);

        return (
          <Box display="flex" alignItems="center" gap={1} width="100%">
            <Box
              sx={{
                width: "100%",
                mt: 4,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  backgroundColor: progress < 100 ? "red" : "inherit",
                }}
              />
            </Box>
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
              label={row.status ? "Present" : "Absent"}
              sx={{
                borderColor: row.status ? "primary.main" : "red",
                color: row.status ? "primary.main" : "red",
                fontWeight: 600,
                borderRadius: 1,
              }}
            />
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
  ];

  const rows = paginateData.map((data) => {
    return {
      id: data._id,
      date: formatDate(new Date(data.createdAt)),
      checkIn: formatTime(dayjs(data.checkIn)),
      checkOut: formatTime(dayjs(data.checkOut)),
      overTime: data.overTime,
      progress: data.progress,
      totalWorkHour: data.totalHours,
      status: data.approved,
    };
  });

  return (
    <Container>
      {/* Attendance statistics */}
      <Box
        sx={{
          border: "1px solid gray",
          borderRadius: 4,
          padding: "20px 50px",
        }}
      >
        <Typography
          variant="p"
          component={"span"}
          sx={{
            fontWeight: "500",
            mb: 2,
          }}
        >
          Days Overview This Month
        </Typography>
        <Grid2
          container
          spacing={2}
          sx={{
            mt: 4,
          }}
        >
          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                width: "160px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#FF9F43",
                  bgcolor: "#FFF6EE",
                  height: "140px",
                  width: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                31
              </Typography>
              <p className="text-2xl font-semibold text-center">
                Total working days
              </p>
            </Box>
          </Grid2>

          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                width: "160px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#FF0000",
                  bgcolor: "#FFE8E8",
                  height: "140px",
                  width: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                5
              </Typography>
              <p className="text-2xl font-semibold text-center">Absent days</p>
            </Box>
          </Grid2>

          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                width: "160px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#806CF0",
                  bgcolor: "#F2F1FE",
                  height: "140px",
                  width: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                28
              </Typography>
              <p className="text-2xl font-semibold text-center">Present days</p>
            </Box>
          </Grid2>

          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                width: "160px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#FF9F43",
                  bgcolor: "#FFF6EE",
                  height: "140px",
                  width: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                2
              </Typography>
              <p className="text-2xl font-semibold text-center">Half day</p>
            </Box>
          </Grid2>

          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                width: "160px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#FF9F43",
                  bgcolor: "#FFF6EE",
                  height: "140px",
                  width: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                1
              </Typography>
              <p className="text-2xl font-semibold text-center">Late day</p>
            </Box>
          </Grid2>

          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 2,
            }}
          >
            <Box
              sx={{
                width: "160px",
                margin: "0 auto",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "#7367F0",
                  bgcolor: "#F2F1FE",
                  height: "140px",
                  width: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 4,
                }}
              >
                2
              </Typography>
              <p className="text-2xl font-semibold text-center">Holidays</p>
            </Box>
          </Grid2>
        </Grid2>
      </Box>

      {/* Attendance table */}
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
            totalItems={tableData.length}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Attendance;
