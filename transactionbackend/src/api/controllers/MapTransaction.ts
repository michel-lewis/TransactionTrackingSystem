import Transaction from "../../db/models/Transaction.models"
import { TransactionReadOutput } from "../../db/models/Transaction.models"

export const MapTransaction = (transaction: TransactionReadOutput): Transaction => {
    return Transaction.build({
        id: transaction.id,
        value: transaction.value,
        receiver: transaction.receiver,
        sender: transaction.sender,
        confirmed: transaction.confirmed,
        createdAt: transaction.createdAt,
        updatedAt: transaction.updatedAt,
        deletedAt: transaction.deletedAt,
        timestamp: transaction.timestamp,
    });
};
