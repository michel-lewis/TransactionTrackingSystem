import React, { useState } from "react";
import TransactionTable from "./TransactionTable";
import SearchBar from "./SearchBar";
import {
  fetchTransaction,
  Transaction,
  fetchTransactionByRange,
} from "../service/api";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

import TransactionDetails from "./TransactionDetails";
import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://localhost:8000')
const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [socketTransaction, setSocketTransactions] = useState<Transaction | undefined>();
  const [openModal, setOpenModal] = React.useState(false);

  const fetchTransactions = async () => {
    const transact = await fetchTransaction();
    if (transact) {
      setTransactions(transact);
    } else {
      return [];
    }
    console.log("Transact ", transact);
  };

  const handleCloseModal = () => setOpenModal(false);

  React.useEffect(() => {
    fetchTransactions();
    socket.on('connect', () => {
      console.log("frontend connexion");
    });

    socket.on('createTransaction', (data: any) => {
      console.log('connexion creation');
      // Update the transactions by appending the new transaction
      setTransactions(prevTransactions => [...prevTransactions, data]);
    });

    socket.on('updateTransaction', (data: any) => {
      setSocketTransactions(data);
    });

    return () => {
      socket.off('connect');
      socket.off('createTransaction');
      socket.off('updateTransaction');
    };

  }, []);

  const handleSearch = async (startDate: string, endDate: string) => {
    console.log("startDATE ", startDate, endDate);
    setIsLoading(true);
    const transaction = await fetchTransactionByRange(startDate, endDate);
    setIsLoading(false);
    console.log("transaction ", transaction);

    setTransactions(transaction);
  };

  return (
    <div className="dashboard">
      <h1 className="dashboardTitle">Transaction Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      {isLoading ? (
        <CircularProgress sx={{ color: "rgb(115, 65, 160)" }} />
      ) : (
        <TransactionTable
          transactions={transactions}
          socketTransaction={socketTransaction}
          onTransactionClick={setSelectedTransaction}
          openModal={setOpenModal}
        />
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            aria-label="close"
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseSharpIcon />
          </IconButton>

          <TransactionDetails transactionProps={selectedTransaction} />
        </Box>
      </Modal>
    </div>
  );
};

export default Dashboard;
