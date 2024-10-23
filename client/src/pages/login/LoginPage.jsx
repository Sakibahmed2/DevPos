import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import loginImg from "../../assets/login-img.png";
import DPForm from "../../components/form/DPForm";
import DPInput from "../../components/form/DPInput";
import googleLogo from "../../assets/google-logo.png";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import devPosLogo from "../../assets/devPosLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { toast } from "sonner";
import { useLoginUserMutation } from "../../redux/api/auth/authApi";
import { setTokenIntoLocalStorage } from "../../utils/local-storage";
import { useGoogleLogin } from "@react-oauth/google";

const defaultValue = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const res = await loginUser(data).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setTokenIntoLocalStorage(res?.data?.accessToken);
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.data?.message, { id: toastId });
      console.log(err);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const toastId = toast.loading("Login user with google...");
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
          email: userInfo.email,
          password: userInfo.sub,
        };

        const loggedUser = await loginUser(userData).unwrap();
        console.log(loggedUser);
        if (loggedUser?.success) {
          toast.success(loggedUser?.message, { id: toastId });
          setTokenIntoLocalStorage(loggedUser?.data?.accessToken);
          navigate("/");
        }
      } catch (err) {
        toast.error(err?.data?.message, { id: toastId });
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
          overflow: "hidden",
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
                type={showPassword ? "text" : "password"}
                required
                icon={<LockIcon />}
                sx={{
                  marginTop: "24px",
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  left: {
                    xs: 400,
                    xl: 450,
                  },
                  bottom: 40,
                }}
              >
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(false)}
                    sx={{
                      color: "gray",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(true)}
                    sx={{
                      color: "gray",
                      cursor: "pointer",
                    }}
                  />
                )}
              </Box>

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
                  Login
                </Button>
              </Box>

              <Divider>Or</Divider>

              <Button
                variant="text"
                onClick={googleLogin}
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

              <Typography component="p" sx={{ textAlign: "center" }}>
                Don’t have account?{" "}
                <Typography component={NavLink} to="/register" fontWeight={600}>
                  Register Now
                </Typography>
              </Typography>
            </DPForm>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default LoginPage;
