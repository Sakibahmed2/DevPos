/* eslint-disable react/prop-types */
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import moreIcon from "../../../../assets/dashboard icons/finance/hrm/more.svg";
import EditDepartmentsModal from "../../../../pages/Dashboard/FinanceDashboard/Departments/EditDepartmentsModal";
import { useDeleteDepartmentsMutation } from "../../../../redux/api/finance/departmentsApi";
import { toast } from "sonner";
import { useGetAllEmployeesQuery } from "../../../../redux/api/finance/employeesApi";
import DPLoading from "../../../ui/DPLoading";

const DepartmentCard = ({ department }) => {
  const { _id, name, img } = department || {};
  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [deleteDepartment] = useDeleteDepartmentsMutation();
  const { data: allEmployee, isLoading } = useGetAllEmployeesQuery({});

  if (isLoading) return <DPLoading />;

  const employeeData = allEmployee?.data?.result;

  const totalEmployeeByDepartment = employeeData?.filter(
    (employee) => employee.department._id === _id
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting department...");
    try {
      const res = await deleteDepartment(_id).unwrap();
      if (res?.success) {
        toast.success("Department deleted successfully", { id: toastId });
        handleClose();
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete department", { id: toastId });
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
    handleClose();
  };

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
          sx={{
            position: "relative",
            left: 30,
          }}
        >
          <Box
            component={"button"}
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img src={moreIcon} alt="" className="w-8" />
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
            <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
            <MenuItem onClick={handleModalOpen}>Edit</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: "#F3F6F9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100px",
          borderRadius: 4,
        }}
      >
        <img src={img} alt="" className="object-contain size-20" />
      </Box>

      <Box
        sx={{
          mt: 2,
        }}
      >
        <Typography variant="p" component={"span"} fontWeight={500}>
          Total members: {totalEmployeeByDepartment?.length}
        </Typography>
      </Box>

      {/* Edit department modal */}
      <EditDepartmentsModal open={modalOpen} setOpen={setModalOpen} id={_id} />
    </Box>
  );
};

export default DepartmentCard;
