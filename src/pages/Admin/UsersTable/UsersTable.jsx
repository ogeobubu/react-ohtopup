import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  dispatchGetAllUsers,
  fetchAllUsers,
} from "../../../redux/actions/usersAction";
import {
  dispatchGetUserWallet,
  getUserWallet,
} from "../../../redux/actions/walletAction";

const UsersTable = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const { user, isAdmin } = auth;

  useEffect(() => {
    if (isAdmin) {
      return fetchAllUsers(token).then((response) => {
        dispatch(dispatchGetAllUsers(response));
      });
    }
  }, [dispatch, token, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      return getUserWallet(user.email).then((response) => {
        dispatch(dispatchGetUserWallet(response));
      });
    }
  }, [dispatch, isAdmin, user.email]);

  return (
    <Card {...props}>
      <CardHeader title="All Users" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Wallet</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow hover key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>
                    {moment(user.date).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>
                    <Chip color="primary" label={user.role} size="small" />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{`0${user.phone}`}</TableCell>
                  <TableCell style={{ fontSize: "20px" }}>
                    <Link
                      style={{ fontSize: "15px" }}
                      className="link"
                      to={`/dashboard/admin/edit-user/${user.email}`}
                    >
                      <span style={{ cursor: "pointer" }}>+</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default UsersTable;
