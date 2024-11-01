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
import totalEmployeesIcon from "../../../../assets/dashboard icons/finance/hrm/totalEmployees.svg";
import plusIcon from "../../../../assets/dashboard icons/plusIcon.svg";
import searchIcon from "../../../../assets/dashboard icons/search.svg";
import DepartmentCard from "../../../../components/dashboard/finance/Departments/DepartmentCard";
import DPLoading from "../../../../components/ui/DPLoading";
import PaginationUi from "../../../../components/ui/PaginationUi";
import SectionTitle from "../../../../components/ui/SectionTitle";
import { useGetAllDepartmentsQuery } from "../../../../redux/api/finance/departmentsApi";
import { paginateFormateData } from "../../../../utils/pagination";
import CreateDepartmentsModal from "./CreateDepartmentsModal";

const Departments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(0);
  const [createDepartmentsModal, setCreateDepartmentModal] = useState(false);

  const { data: departmentData, isLoading } = useGetAllDepartmentsQuery({
    searchTerm: searchTerm,
    sort: sortBy,
  });

  if (isLoading) return <DPLoading />;

  const paginateData = paginateFormateData(departmentData?.data?.result, page);

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
          title={"Departments"}
          description={"Manage your departments"}
        />

        <Button
          onClick={() => setCreateDepartmentModal(true)}
          startIcon={
            <img
              src={plusIcon}
              alt="plus icon"
              style={{ width: 30, height: 30 }}
            />
          }
        >
          Add new departments
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
              gap: 2,
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
              {" "}
              <Typography variant="p">Total departments </Typography>
              <Box
                sx={{
                  bgcolor: "primary.main",
                  width: "22px",
                  height: "22px",
                  borderRadius: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="p"
                  component={"span"}
                  sx={{
                    color: "white",
                  }}
                >
                  {departmentData?.data?.meta?.total}
                </Typography>
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
      {departmentData?.data?.result.length === 0 && (
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h5" fontWeight={600} sx={{ mt: 5 }}>
            No departments founded
          </Typography>
        </Stack>
      )}
      <Grid2 container spacing={3} sx={{ mt: 5 }}>
        {paginateData.map((department) => (
          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
            key={department._id}
          >
            <DepartmentCard department={department} />
          </Grid2>
        ))}
      </Grid2>
      <Box>
        <PaginationUi
          totalItems={departmentData?.data?.meta?.total}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </Box>
      {/* create department modal */}
      <CreateDepartmentsModal
        open={createDepartmentsModal}
        setOpen={setCreateDepartmentModal}
      />
    </Container>
  );
};

export default Departments;
