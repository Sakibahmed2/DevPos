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
import employeeImg from "../../../../assets/employeesImg.png";
import EmployeesCard from "../../../../components/dashboard/finance/Employees/EmployeesCard";
import SectionTitle from "../../../../components/ui/SectionTitle";

const employees = [
  {
    id: 1,
    name: "Jhon doe",
    img: employeeImg,
    EMP_ID: "EMP-123",
    role: "Designer",
    department: "UI/UX",
    joined: "23 Jul 2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Jhon doe",
    img: employeeImg,
    EMP_ID: "EMP-125",
    role: "Developer",
    department: "Software",
    joined: "23 Jul 2024",
    status: "Inactive",
  },
  {
    id: 3,
    name: "Jhon doe",
    img: employeeImg,
    EMP_ID: "EMP-124",
    role: "Database administrator",
    department: "Admin",
    joined: "23 Jul 2024",
    status: "Active",
  },
];

const Employees = () => {
  const [sortBy, setSortBy] = useState("");

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
            <Typography variant="p">
              {" "}
              Total Employees{" "}
              <Typography
                variant="p"
                component={"span"}
                sx={{
                  bgcolor: "primary.main",
                  color: "white",
                  padding: "3px 5px",
                  borderRadius: "100%",
                }}
              >
                {" "}
                10{" "}
              </Typography>
            </Typography>
          </Box>

          <TextField
            sx={{
              width: "250px",
            }}
            label="Search here"
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
              <MenuItem value={"date"}>date</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>
      {/* Employees card */}
      <Grid2 container spacing={3} sx={{ mt: 5 }}>
        {employees.map((employee) => (
          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
            key={employee.id}
          >
            <EmployeesCard employee={employee} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Employees;
