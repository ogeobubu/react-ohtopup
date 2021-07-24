import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  getAllTransactions,
  dispatchGetAllTransactions,
} from "../../../redux/actions/transactionsAction";

const columns = [
  { field: "id", headerName: "ID", width: 150 },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  { field: "amount", headerName: "Amount", width: 100 },
  {
    field: "date",
    headerName: "Date Initiated",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
];

const TransactionsTable = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const transactions = useSelector((state) => state.allTransactions);

  useEffect(() => {
    if (auth) {
      const getTransactions = () => {
        return getAllTransactions(token).then((response) => {
          dispatch(dispatchGetAllTransactions(response));
        });
      };
      getTransactions();
    }
  }, [auth, dispatch, token]);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={transactions?.map((transaction) => {
          return {
            id:
              transaction.content?.transactions?.transactionId ||
              transaction._id,
            description:
              transaction.content?.transactions?.product_name ||
              "Wallet Topped",
            amount:
              transaction.content?.transactions?.total_amount ||
              transaction.amount / 100,
            date: moment(transaction.date).format("DD/MM/YYYY"),
            status: transaction.content?.transactions?.status || "topped",
            email: transaction.email,
          };
        })}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default TransactionsTable;

// import moment from "moment";
// import { useSelector, useDispatch } from "react-redux";
// import { useEffect } from "react";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import {
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   Chip,
//   Divider,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   Tooltip,
// } from "@material-ui/core";
// import ArrowRightIcon from "@material-ui/icons/ArrowRight";

// import {
//   getAllTransactions,
//   dispatchGetAllTransactions,
// } from "../../../redux/actions/transactionsAction";

// const TransactionsTable = (props) => {
//   const dispatch = useDispatch();
//   const auth = useSelector((state) => state.auth);
//   const token = useSelector((state) => state.token);
//   const transactions = useSelector((state) => state.allTransactions);
//   console.log(transactions);

//   useEffect(() => {
//     if (auth) {
//       const getTransactions = () => {
//         return getAllTransactions(token).then((response) => {
//           dispatch(dispatchGetAllTransactions(response));
//         });
//       };
//       getTransactions();
//     }
//   }, [auth, dispatch, token]);

//   return (
//     <Card {...props}>
//       <CardHeader title="All Transactions" />
//       <Divider />
//       <PerfectScrollbar>
//         <Box sx={{ minWidth: 800 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Transactions ID</TableCell>
//                 <TableCell>User Email</TableCell>
//                 <TableCell>Transaction Type</TableCell>
//                 <TableCell sortDirection="desc">
//                   <Tooltip enterDelay={300} title="Sort">
//                     <TableSortLabel active direction="desc">
//                       Date
//                     </TableSortLabel>
//                   </Tooltip>
//                 </TableCell>
//                 <TableCell>Status</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {transactions.map((t) => (
//                 <TableRow hover key={t.requestId}>
//                   <TableCell>
//                     {t?.content?.transactions?.transactionId}
//                   </TableCell>
//                   <TableCell>{t?.email}</TableCell>
//                   <TableCell>{t?.content?.transactions?.type}</TableCell>
//                   <TableCell>
//                     {moment(t?.transaction_date?.date).format("DD/MM/YYYY")}
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       color="primary"
//                       label={t?.content?.transactions.status}
//                       size="small"
//                     />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </Box>
//       </PerfectScrollbar>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "flex-end",
//           p: 2,
//         }}
//       >
//         <Button
//           color="primary"
//           endIcon={<ArrowRightIcon />}
//           size="small"
//           variant="text"
//         >
//           View all
//         </Button>
//       </Box>
//     </Card>
//   );
// };

// export default TransactionsTable;
