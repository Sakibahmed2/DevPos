import LockIcon from "@mui/icons-material/Lock";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import devPosLogo from "../../assets/devPosLogo.png";
import googleLogo from "../../assets/google-logo.png";
import loginImg from "../../assets/login-img.png";
import DPForm from "../../components/form/DPForm";
import DPInput from "../../components/form/DPInput";
import { useCreateUserMutation } from "../../redux/api/auth/authApi";

const defaultValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [createUser] = useCreateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Creating account...");
    try {
      if (data.password !== data.confirmPassword) {
        return toast.error("Passwords do not match", { id: toastId });
      }

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await createUser(userData).unwrap();
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        navigate("/login");
      }
    } catch (err) {
      toast.error("Something went wrong in server", { id: toastId });
      console.log(err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const toastId = toast.loading("Creating account...");
      try {
        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
            method: "GET",
          }
        );

        const userInfo = await res.json();

        const userData = {
          name: userInfo.name,
          email: userInfo.email,
          password: userInfo.sub,
          img: userInfo.picture,
        };

        const newUser = await createUser(userData).unwrap();
        console.log(newUser);
        if (newUser?.success) {
          toast.success(newUser?.message, { id: toastId });
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        direction={{
          md: "row",
        }}
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "0",
              xl: "50%",
            },
          }}
        >
          <img
            className="w-full h-screen xl:flex hidden "
            src={loginImg}
            alt=""
          />
        </Box>

        <Box
          sx={{
            margin: " auto",
            width: "50%",
            maxWidth: "500px",
            boxShadow: { xl: "none", xs: "0px 4px 25px rgba(0, 0, 0, 0.1)" },
            padding: { xs: "24px", xl: "0" },
            borderRadius: { xl: "0", xs: "16px" },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              mb: "66px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img src={devPosLogo} alt="" />
          </Box>

          <Box>
            <DPForm onSubmit={onSubmit} defaultValue={defaultValue}>
              <Stack direction={"column"} gap={3}>
                <DPInput name="name" label="Name" />

                <DPInput
                  name="email"
                  label="Email"
                  type="email"
                  required
                  icon={<MailOutlineIcon />}
                />
                <DPInput
                  name="password"
                  label="Password"
                  type="password"
                  required
                  icon={<LockIcon />}
                />

                <DPInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  required
                  icon={<LockIcon />}
                />
              </Stack>

              <Typography
                component="p"
                sx={{
                  textAlign: "right",
                  marginTop: "16px",
                  cursor: "pointer",
                  color: "text.secondary",
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
                  SIGN UP
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
                onClick={() => googleLogin()}
              >
                Continue with Google
              </Button>

              <Typography component="p" sx={{ textAlign: "center" }}>
                Already have account?{" "}
                <Typography component={NavLink} to="/login" fontWeight={600}>
                  Sign in here
                </Typography>
              </Typography>
            </DPForm>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default RegisterPage;
