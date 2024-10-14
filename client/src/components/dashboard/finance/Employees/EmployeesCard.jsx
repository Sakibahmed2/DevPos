/* eslint-disable react/prop-types */
import { Box, Chip, Stack, Typography } from "@mui/material";
import moreIcon from "../../../../assets/dashboard icons/finance/hrm/more.svg";
import { NavLink } from "react-router-dom";

const EmployeesCard = ({ employee }) => {
  const { id, name, img, EMP_ID, role, department, joined, status } =
    employee || {};

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "460px",
        border: "1px solid lightgray",
        borderRadius: 4,
        p: "20px 40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          mb: 2,
        }}
      >
        <Chip
          variant="outlined"
          label={status}
          sx={{
            color: status === "Active" ? "primary.main" : "red",
            borderColor: status === "Active" ? "primary.main" : "red",
            fontSize: "15px",
            borderRadius: 2,
            px: 2,
          }}
        />
        <Box
          sx={{
            position: "relative",
            left: 30,
          }}
        >
          <NavLink to={`/finance/employees/edit-employee/${id}`}>
            <img src={moreIcon} alt="" className="w-8" />
          </NavLink>
        </Box>
      </Box>

      <Stack>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <img src={img} alt="" />

          <Box
            sx={{
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              border: "5px solid white",
              bgcolor: status === "Active" ? "primary.main" : "red",
              position: "relative",
              bottom: 15,
              left: 82,
            }}
          ></Box>

          <Typography
            variant="p"
            sx={{
              color: "primary.main",
              fontWeight: "500",
              mt: 1,
            }}
          >
            EMP ID: {EMP_ID}
          </Typography>
          <Typography
            component={"span"}
            sx={{
              fontWeight: "600",
              fontSize: "20px",
            }}
          >
            {name}
          </Typography>
          <Typography component={"span"}>{role}</Typography>
        </Box>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          sx={{
            bgcolor: "#F3F6F9",
            padding: "10px 20px",
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Stack direction={"column"}>
            <Typography variant="p" fontWeight={500}>
              Joined
            </Typography>
            <Typography variant="p">{joined}</Typography>
          </Stack>

          <Stack direction={"column"}>
            <Typography variant="p" fontWeight={500}>
              Department
            </Typography>
            <Typography variant="p">{department}</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default EmployeesCard;
