import React, { useState } from "react";
import Pagination from "./Pagination";
import { Transaction } from "../service/api";
import { formatDate } from "../utils/formatData";
import FolderOff from "@mui/icons-material/FolderOff";
import Box from "@mui/material/Box";

type TransactionTableProps = {
  transactions: Transaction[];
  onTransactionClick: (transaction: Transaction) => void;
  openModal: (open: boolean) => void;
  isLoadingSocketTransaction: boolean;
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  onTransactionClick,
  openModal,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleTransactionSelected = (transaction: Transaction) => {
    onTransactionClick(transaction);
    openModal(true);
  };

  return (
    <div className="transaction-table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Value</th>
            <th>Confirmed</th>
            <th>Timestamp</th>
            <th>Create Date</th>
            <th>Updated Date</th>
          </tr>
        </thead>

        <tbody>
          {currentItems.length < 1 ? (
            <tr>
              <td colSpan={8}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px", // Adjust height for centering vertically
                    width: "100%", // Ensure it takes the full width of the table
                  }}
                >
                  <FolderOff
                    sx={{ color: "grey.500", fontSize: 60 }} // Grey color and reasonable size
                  />
                </Box>
              </td>
            </tr>
          ) : (
            currentItems.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => handleTransactionSelected(transaction)}
                className="table-input"
              >
                <td>{transaction.id}</td>
                <td>{transaction.sender}</td>
                <td>{transaction.receiver}</td>
                <td>{transaction.value}</td>
                <td>{transaction.confirmed ? "Yes" : "No"}</td>
                <td>{transaction.timestamp}</td>
                <td>
                  {transaction.createdAt
                    ? formatDate(transaction.createdAt)
                    : ""}
                </td>
                <td>
                  {transaction.updatedAt
                    ? formatDate(transaction.updatedAt)
                    : ""}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={transactions ? transactions.length : 0}
        paginate={paginate}
      />
    </div>
  );
};

export default TransactionTable;
