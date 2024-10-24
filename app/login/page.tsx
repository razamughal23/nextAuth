import React from "react";
import LoginPage from "./template";
import { Box } from "@mui/material";

const Index = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "95vh",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <LoginPage />
    </Box>
  );
};

export default Index;
