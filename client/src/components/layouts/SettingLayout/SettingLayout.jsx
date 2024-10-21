/* eslint-disable react/prop-types */
import { Box, Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import SectionTitle from "../../ui/SectionTitle";
import SettingLinks from "./SettingLinks";

const SettingLayout = ({ pathLinks }) => {
  return (
    <Container>
      <Box>
        <SectionTitle
          title={"Setting"}
          description={"Manage your setting on portal"}
        />
      </Box>

      <Stack
        direction={"row"}
        gap={2}
        sx={{
          mt: 4,
          borderBottom: "2px solid lightgray",
          pb: 4,
        }}
      >
        {pathLinks?.map((item) => (
          <SettingLinks key={item.id} path={item.path} label={item.label} />
        ))}
      </Stack>

      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default SettingLayout;
