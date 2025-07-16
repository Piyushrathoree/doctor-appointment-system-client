import React, { useEffect, useState } from "react";
import {
    Typography,
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert,
    Stack,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import axios from "axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("all");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError("");
            try {
                let url = "https://doctor-appointment-system-server-1.onrender.com/api/users";
                if (role !== "all") url += `?role=${role}`;
                const res = await axios.get(url);
                setUsers(res.data);
            } catch {
                setError("Failed to fetch users");
            }
            setLoading(false);
        };
        fetchUsers();
    }, [role]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fafafa",
                p: { xs: 2, sm: 4 },
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 6 },
                    borderRadius: 4,
                    width: "100%",
                    maxWidth: 700,
                    boxSizing: "border-box",
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2 }}
                >
                    <Typography variant="h5" fontWeight={700}>
                        Users
                    </Typography>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            value={role}
                            label="Role"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="doctor">Doctor</MenuItem>
                            <MenuItem value="patient">Patient</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                {error && <Alert severity="error">{error}</Alert>}
                {loading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <TableContainer
                        component={Paper}
                        sx={{ boxShadow: "none" }}
                    >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user._id || user.email}>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
};

export default Users;
