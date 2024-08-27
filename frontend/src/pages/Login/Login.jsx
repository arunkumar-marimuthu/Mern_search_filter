import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../components/ConfirmDialog";

// Define validation schema
const schema = yup.object({
  mail: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subtitle: '',
    onConfirm: () => { },
  });

  const onSubmit = async (data) => {

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        data
      );
      console.log(response, "res");
      if (response?.data?.message === "IP mismatch") {
       
        setConfirmDialog({
          isOpen: true,
          title: 'Access Denied : IP address mismatch',
          subtitle: "Note : Please Contact Admin !",
          onConfirm: () => {
       
            setConfirmDialog({ ...confirmDialog, isOpen: false });
          },
        });
        
      } else if(response?.data?.message === "Login Successful!"){
        toast.success(response?.data?.message);
        navigate("/home", { state: { myData: response?.data } });

      }
      else if(response?.data?.message === "Password is incorrect"){
        toast.error(response?.data?.message);
        
      }
      else if(response?.data?.message === "User does not exist"){
        toast.error(response?.data?.message);
        
      }
    } catch (e) {
      console.log(e.message);
      
    }
  };

  return (
    <>
    <Container maxWidth="xs">
      <Box sx={{ mt: 10 }}>
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="mail"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="outlined"
                margin="normal"
                size="small"
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
                label="Password"
                size="small"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ""}
              />
            )}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>
      </Box>
      <Box sx={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",my:2}}>
      <Typography>New User?</Typography>
        <Button variant="text" onClick={()=>{navigate("/register")}}>Sign Up</Button>
      </Box>
    </Container>
    <ConfirmDialog confirmDialog={confirmDialog} setConfirmDialog={setConfirmDialog} />
</>
  );
}

export default LoginForm;
