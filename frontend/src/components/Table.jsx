import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  MenuItem,
  Select,
  Box,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TableWithActions = () => {
  // Example data
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("All"); // State for the role filter

  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/user/getAllUsers"
      );

      if (response?.data?.status) {
        setData(response?.data?.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  // Function to filter data based on search input and role filter
  const filteredData = data.filter((row) => {
    const lowercasedSearchText = searchText.toLowerCase();
    const matchesSearchText =
      row.firstName?.toLowerCase().includes(lowercasedSearchText) ||
      row.lastName?.toLowerCase().includes(lowercasedSearchText) ||
      row.mail?.toLowerCase().includes(lowercasedSearchText) ||
      row.mobile?.toString().includes(lowercasedSearchText) ||
      row.role?.toLowerCase().includes(lowercasedSearchText);

    const matchesRoleFilter =
      roleFilter === "All" || row.role?.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearchText && matchesRoleFilter;
  });

  return (
    <>
      <Box sx={{ display: "flex",flexDirection:{xs:"column",sm:"row"}, justifyContent: "center" }}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          sx={{ marginRight: 2 }}
        />

        <FormControl variant="outlined" size="small" margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            label="Filter"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Guest">Guest</MenuItem>
          </Select>
        </FormControl>


      </Box>
      <Box sx={{ overflowX: 'auto', width: '100%'}}>
      <TableContainer component={Paper} sx={{maxWidth:{xs:"300px",sm:"600px",md:"800px"}}}>
        <Table sx={{width:"100%"}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 900 }}>First Name</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Last Name</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Mail</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Mobile</TableCell>
              <TableCell sx={{ fontWeight: 900 }}>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length ? (
              filteredData.map((row) => (
                <TableRow key={row?.id}>
                  <TableCell>{row?.firstName}</TableCell>
                  <TableCell>{row?.lastName}</TableCell>
                  <TableCell>{row?.mail}</TableCell>
                  <TableCell>{row?.mobile}</TableCell>
                  <TableCell>{row?.role}</TableCell>
                </TableRow>
              ))
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 4,
                  mx: "auto"
                }}
              >
                <Typography sx={{mx:5}}>No Data Found</Typography>
              </Box>

            )}

          </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </>
  );
};

export default TableWithActions;
