import { Box, Button, Stack, Typography } from "@mui/material";
import employeeIcon from "../../../../assets/dashboard icons/finance/settings/employeeIcon.svg";
import passwordIcon from "../../../../assets/dashboard icons/finance/settings/passwordIcon.svg";
import logOutIcon from "../../../../assets/dashboard icons/finance/settings/logOutIcon.svg";
import { useState } from "react";
import ChangePasswordModal from "../../../../components/dashboard/finance/GeneralSettings/ChangePasswordModal";
import { removeTokenFromLocalStorage } from "../../../../utils/local-storage";
import { useNavigate } from "react-router-dom";

const SecuritySetting = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokenFromLocalStorage();
    navigate("/login");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <img src={employeeIcon} alt="" />
        <Typography variant="h6" fontWeight={500}>
          Security
        </Typography>
      </Box>

      <Stack
        direction={"column"}
        gap={2}
        sx={{
          mt: 4,
        }}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img
              src={passwordIcon}
              alt=""
              className="bg-[#F2F5FF] py-3 px-4 rounded-md"
            />
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Password
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Change your password
              </Typography>
            </Box>
          </Box>

          <Button onClick={() => setOpen(true)}>Change password</Button>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img
              src={logOutIcon}
              alt=""
              className="bg-[#F2F5FF] py-3 px-4 rounded-md"
            />
            <Box>
              <Typography variant="h6" fontWeight={500}>
                Logout
              </Typography>
            </Box>
          </Box>

          <Button color="error" onClick={() => handleLogout()}>
            Logout
          </Button>
        </Stack>
      </Stack>

      <ChangePasswordModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default SecuritySetting;
