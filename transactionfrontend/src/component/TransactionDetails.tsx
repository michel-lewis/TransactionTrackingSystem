import { useEffect, useState } from "react";
import { Transaction, fetchTransationDetails } from "../service/api";
import { formatDate } from "../utils/formatData";

type TransactionDetailsProps = {
  transactionProps?: Transaction | undefined;
  onTransactionClick?: (transaction: Transaction | undefined) => void;
};

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transactionProps,
}) => {
  const id = transactionProps ? transactionProps.id : "";
  const [transaction, setTransaction] = useState<Transaction>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionDetails = async () => {
      try {
        const transact = await fetchTransationDetails(id ? id : "");
        setTransaction(transact);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transaction) {
    return <div>Transaction not found</div>;
  }



  return (
    <div className="transaction-details">

      <h2>Transaction Details</h2>
      <div className="transaction-card">
        <p>
          <strong>Transaction ID:</strong> {transaction.id}
        </p>
        <p>
          <strong>Value:</strong> ${transaction.value}
        </p>
        <p>
          <strong>Sender:</strong> {transaction.sender}
        </p>
        <p>
          <strong>Receiver:</strong> {transaction.receiver}
        </p>
        <p>
          <strong>Confirmed:</strong> {transaction.confirmed ? "Yes" : "No"}
        </p>
        <p>
          <strong>Created Date:</strong>{" "}
          {!!transaction.createdAt ? formatDate(transaction.createdAt) : ""}
        </p>
        <p>
          <strong>Updated Date:</strong>{" "}
          {!!transaction.createdAt ? formatDate(transaction.createdAt) : ""}        </p>
        <p>
          <strong>timestamp:</strong>{" "}
          {new Date(transaction.timestamp).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TransactionDetails;
