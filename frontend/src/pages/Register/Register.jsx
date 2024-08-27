import React, { useRef, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Container, Typography, Box, MenuItem, FormControl, InputLabel, Select, FormHelperText } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
// Define validation schema
const schema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  mail: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .required("Mobile number is required"),
  role: yup.string().required("Role is required"),

});


function Register() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {

    try {

      const response = await axios.post(
        "http://localhost:8000/api/user/createUser",
        data
      );


      console.log(response, "res");
      if (response?.data?.status) {
        toast.success(response?.data?.message);
        navigate("/");
      } else {
        toast.error(response?.data?.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="firstName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="First Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName ? errors.firstName.message : ""}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Last Name"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.lastName}
                helperText={errors.lastName ? errors.lastName.message : ""}
              />
            )}
          />
          <Controller
            name="mail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.mail}
                helperText={errors.mail ? errors.mail.message : ""}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Password"
                variant="outlined"
                type="password"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />

          <Controller
            name="mobile"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Mobile"
                size="small"
                type="number"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.mobile}
                helperText={errors.mobile ? errors.mobile.message : ""}
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.role}>
                <InputLabel sx={{ mt: -1 }}>Role</InputLabel>
                <Select
                  {...field}
                  labelId="role-label"
                  label="Role"
                  size="small"
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="guest">Guest</MenuItem>
                </Select>
                <FormHelperText>{errors.role ? errors.role.message : ""}</FormHelperText>
              </FormControl>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </form>
      </Box>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", my: 2 }}>
        <Typography>Exist User?</Typography>
        <Button variant="text" onClick={() => { navigate("/") }}>Sign in</Button>
      </Box>
    </Container>
  );
}

export default Register;
