/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import moreIcon from "../../../../assets/dashboard icons/finance/hrm/more.svg";
import { useState } from "react";
import EditDepartmentsModal from "../../../../pages/Dashboard/FinanceDashboard/Departments/EditDepartmentsModal";

const DepartmentCard = ({ department }) => {
  const { id, name, img, totalMembers } = department || {};
  const [open, setOpen] = useState(false);

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
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "20px",
              height: "20px",
              bgcolor: "primary.main",
              borderRadius: "100%",
            }}
          ></Box>

          <Typography
            variant="p"
            component={"span"}
            fontWeight={700}
            sx={{
              ml: 2,
            }}
          >
            {name}
          </Typography>
        </Box>

        <Box
          component={"button"}
          onClick={() => setOpen(true)}
          sx={{
            position: "relative",
            left: 30,
          }}
        >
          <img src={moreIcon} alt="" className="w-8" />
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "#F3F6F9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: "20px 100px",
          borderRadius: 4,
        }}
      >
        <img src={img} alt="" />
      </Box>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography variant="p" component={"span"} fontWeight={500}>
          Total members: {totalMembers}
        </Typography>
      </Box>

      {/* Edit department modal */}
      <EditDepartmentsModal open={open} setOpen={setOpen} id={id} />
    </Box>
  );
};

export default DepartmentCard;
