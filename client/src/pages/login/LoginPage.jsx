import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import loginImg from "../../assets/login-img.png";
import DPForm from "../../components/form/DPForm";
import DPInput from "../../components/form/DPInput";
import googleLogo from "../../assets/google-logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";

const defaultValue = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Stack
      direction={{
        md: "row",
      }}
      sx={{
        height: "100vh",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <img
          className="w-full max-w-[734px] h-full max-h-[768px]"
          src={loginImg}
          alt=""
        />
      </Box>

      <Box
        sx={{
          margin: " auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "74px",
            fontWeight: "600",
            color: "primary.main",
            textAlign: "center",
            mb: "66px",
          }}
        >
          Welcome
        </Typography>

        <Box>
          <DPForm onSubmit={onSubmit} defaultValue={defaultValue}>
            <DPInput
              name="email"
              label="Email"
              type="email"
              size="medium"
              fullWidth
              required
              icon={<MailOutlineIcon />}
            />
            <DPInput
              name="password"
              label="Password"
              type="password"
              size="medium"
              fullWidth
              required
              icon={<LockIcon />}
              sx={{
                marginTop: "24px",
              }}
            />

            <Typography
              component="p"
              variant="subtitle1"
              sx={{
                textAlign: "right",
                marginTop: "16px",
                cursor: "pointer",
              }}
            >
              Forgot password?
            </Typography>

            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Button
                type="submit"
                sx={{
                  my: "24px",
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
            </Box>

            <Divider>Or</Divider>

            <Button
              variant="text"
              startIcon={
                <img
                  src={googleLogo}
                  alt="google logo"
                  className="size-8 mr-8"
                />
              }
              sx={{
                my: "24px",
                width: "100%",
                fontSize: "16px",
                color: "#00000080",
                bgcolor: "rgba(0, 176, 117, 0.09)",
              }}
            >
              Continue with Google
            </Button>
          </DPForm>
        </Box>
      </Box>
    </Stack>
  );
};

export default LoginPage;
