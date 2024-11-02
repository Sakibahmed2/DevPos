import {
  Box,
  Button,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import totalEmployeesIcon from "../../../../assets/dashboard icons/finance/hrm/totalEmployees.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import EmployeesCard from "../../../../components/dashboard/finance/Employees/EmployeesCard";
import DPLoading from "../../../../components/ui/DPLoading";
import PaginationUi from "../../../../components/ui/PaginationUi";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import { paginateFormateData } from "../../../../utils/pagination";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);

  const { data: employeesData, isLoading } = useGetAllEmployeesQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(employeesData?.data?.result, page);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Container>
      {" "}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <SectionTitle
          title={"Employees list"}
          description={"Manage your employees"}
        />

        <Button
          component={NavLink}
          to="/finance/employees/add-employee"
          // onClick={() => setCreateEmployeeModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new employee
        </Button>
      </Stack>
      {/* Search field section */}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          border: "1px solid lightgray",
          padding: "40px 20px",
          mt: 5,
        }}
      >
        <Stack direction={"row"} gap={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={totalEmployeesIcon} alt="" />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="p">Total Employees</Typography>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  borderRadius: "100%",
                  height: "22px",
                  width: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {employeesData?.data?.meta?.total}
              </Box>
            </Box>
          </Box>

          <TextField
            sx={{
              width: "250px",
            }}
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
      {/* Employees card */}
      <Grid2 container spacing={3} sx={{ mt: 5 }}>
        {paginateData.map((employee) => (
          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
            key={employee._id}
          >
            <EmployeesCard employee={employee} />
          </Grid2>
        ))}
      </Grid2>
      <Box>
        <PaginationUi
          totalItems={employeesData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
    </Container>
  );
};

export default Employees;
