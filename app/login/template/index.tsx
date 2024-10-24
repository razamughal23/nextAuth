"use client";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { useSession, signIn, signOut } from "next-auth/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Container,
  Grid,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import ApiData from "@/component";

const FormValidation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phone: Yup.string().required("Phone is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const LoginPage = () => {
  const [userData, setUserData] = useState({ name: "", phone: "", email: "" });
  const form: any = useRef();
  useEffect(() => {
    const name = Cookies.get("name");
    const phone = Cookies.get("phone");
    const email = Cookies.get("email");
    if (name || phone || email) {
      setUserData({
        name: name || "",
        phone: phone || "",
        email: email || "",
      });
    }
  }, []);
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  const resetFormAndMenu = () => {
    form.current.reset();
  };
  const formsubmission = async (values: any) => {
    try {
      Cookies.set("name", values.name, { expires: 7 });
      Cookies.set("phone", values.phone, { expires: 7 });
      Cookies.set("email", values.email, { expires: 7 });
      Cookies.set("formSubmission", "successful", { expires: 7 });
      let userData = {
        name: values.name,
        phone: values.phone,
        email: values.email,
        formSubmission: "successful",
      };
      setUserData({
        name: values.name,
        phone: values.phone,
        email: values.email,
      });
      console.log("Userdata", userData);
      resetFormAndMenu();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };
  const deleteCookies = () => {
    Cookies.remove("name");
    Cookies.remove("phone");
    Cookies.remove("email");
    Cookies.remove("formSubmission");
    console.log("Cookies deleted");
    setUserData({ name: "", phone: "", email: "" });
  };

  return (
    <Box>
      <Container>
        <Grid item xs={12}>
          {session ? (
            <>
              <h4>Welcome, {session.user?.name}</h4>
              <Button variant="outlined" onClick={() => signOut()}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <h4>Want to sign in with GitHub</h4>
              <Button variant="outlined" onClick={() => signIn()}>
                Sign in
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "10px" }}>
          <Formik
            initialValues={{
              name: "",
              phone: "",
              email: "",
            }}
            validationSchema={FormValidation}
            onSubmit={formsubmission}
          >
            {({ values, errors, touched, handleSubmit }) => (
              <Form onSubmit={handleSubmit} ref={form}>
                <Grid container gap={1} sx={{ marginBottom: "10px" }}>
                  <Grid item xs={5.9}>
                    <Field
                      as={TextField}
                      type="text"
                      name="name"
                      label="Name"
                      placeholder="Name"
                      required
                      value={values?.name}
                      error={touched?.name && Boolean(errors?.name)}
                      helperText={touched?.name && errors?.name}
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                  </Grid>
                  <Grid item xs={5.9}>
                    <Field
                      as={TextField}
                      type="text"
                      name="phone"
                      label="Phone"
                      placeholder="Phone"
                      required
                      value={values?.phone}
                      error={touched?.phone && Boolean(errors?.phone)}
                      helperText={touched?.phone && errors?.phone}
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                  </Grid>
                </Grid>
                <Grid container sx={{ marginBottom: "10px" }}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      type="email"
                      name="email"
                      label="Email"
                      placeholder="Email"
                      required
                      value={values?.email}
                      error={touched?.email && Boolean(errors?.email)}
                      helperText={touched?.email && errors?.email}
                      fullWidth
                      sx={{ marginBottom: "10px" }}
                    />
                  </Grid>
                </Grid>

                <Button type="submit" variant="outlined">
                  <Typography fontSize={"12px"}>Submit</Typography>
                </Button>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">User Data</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Name: {userData.name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Phone: {userData.phone}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">Email: {userData.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" onClick={deleteCookies}>
              Delete Cookies
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {userData.email ? <ApiData /> : "Please Login Firest to see data"}
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;
