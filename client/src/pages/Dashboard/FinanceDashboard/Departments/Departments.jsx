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
import employeeImg from "../../../../assets/employeesImg.png";
import DepartmentCard from "../../../../components/dashboard/finance/Departments/DepartmentCard";
import SectionTitle from "../../../../components/ui/SectionTitle";
import CreateDepartmentsModal from "./CreateDepartmentsModal";

const departments = [
  {
    id: 1,
    name: "UI/UX",
    img: employeeImg,
    totalMembers: 10,
  },
  {
    id: 2,
    name: "UI/UX",
    img: employeeImg,
    totalMembers: 10,
  },
  {
    id: 3,
    name: "UI/UX",
    img: employeeImg,
    totalMembers: 10,
  },
];

const Departments = () => {
  const [sortBy, setSortBy] = useState("");
  const [createDepartmentsModal, setCreateDepartmentModal] = useState(false);

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
            }}
          >
            <img src={totalEmployeesIcon} alt="" />
            <Typography variant="p">
              {" "}
              Total departments{" "}
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
        {departments.map((department) => (
          <Grid2
            item
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
            key={department.id}
          >
            <DepartmentCard department={department} />
          </Grid2>
        ))}
      </Grid2>
      {/* create department modal */}
      <CreateDepartmentsModal
        open={createDepartmentsModal}
        setOpen={setCreateDepartmentModal}
      />
    </Container>
  );
};

export default Departments;
