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

const socket = socketIOClient(import.meta.env.VITE_APP_API_BASE_URL)
const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingSocketTransaction , setIsLoadingSocketTransaction ] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >();
  const [openModal, setOpenModal] = React.useState(false);

  const fetchTransactions = async () => {
    const transact = await fetchTransaction();
    if (transact) {
      const sortedTransactions = transact.sort((a, b) => 
      new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
      setTransactions(sortedTransactions);
    } else {
      return [];
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  React.useEffect(() => {
    fetchTransactions();
    socket.on('connect', () => {
      console.log("frontend connexion");
    });

    socket.on('createTransaction', (data: any) => {
      // Update the transactions by appending the new transaction
      setTransactions(prevTransactions => [data, ...prevTransactions]);
    });

    socket.on('updateTransaction', (data: any) => {
      setIsLoadingSocketTransaction(true);
      setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === data.id ? { ...transaction, confirmed: data.confirmed } : transaction
      )
    );
      setIsLoadingSocketTransaction(false);

    });

    return () => {
      socket.off('connect');
      socket.off('createTransaction');
      socket.off('updateTransaction');
    };

  }, []);

  const handleSearch = async (startDate: string, endDate: string) => {
    setIsLoading(true);
    const transaction = await fetchTransactionByRange(startDate, endDate);
    setIsLoading(false);

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
          onTransactionClick={setSelectedTransaction}
          openModal={setOpenModal}
          isLoadingSocketTransaction={isLoadingSocketTransaction}
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
