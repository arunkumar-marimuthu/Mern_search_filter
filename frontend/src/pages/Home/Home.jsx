import { Typography, Box } from '@mui/material'
import React from 'react'
import Appbar from '../../components/Appbar'
import { useLocation } from "react-router-dom";
import TableWithActions from "../../components/Table";




const Home = () => {

  const location = useLocation();
  const userData = location?.state?.myData;
  console.log(userData?.data?.name, "userData")

  return (
    <>
      <Appbar />
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box
          sx={{
            m: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start"
          }}
        >
          <Typography sx={{ fontWeight: 900, my: 2, fontSize: "16px" }}>Users List</Typography>
          <TableWithActions />
        </Box>

      </Box>
    </>
  )
}

export default Home