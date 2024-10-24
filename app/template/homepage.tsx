"use client";
import { Box } from "@mui/material";
import Link from "next/link";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "95vh",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Hi welcome to Next Auth App</h1>
      <Link href={"/login"}>Click here for Login Page</Link>
    </Box>
  );
};

export default HomePage;
