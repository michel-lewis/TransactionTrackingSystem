import { Model, DataTypes, Optional } from "sequelize";
import connection from "../config";

export interface TransactionAttributes {
  id: string;
  value: number;
  receiver: string;
  sender: string;
  timestamp: number;
  confirmed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface TransactionCreateInput
  extends Optional<TransactionAttributes, "id" | "value"| "timestamp"> {}
export interface TransactionReadOutput
  extends Required<TransactionAttributes> {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreateInput>
  implements TransactionAttributes
{
  public id!: any;
  public value!: number;
  public receiver!: string;
  public sender!: string;
  public confirmed!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
  public timestamp!: number;
}

Transaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
    },
    timestamp: {
      type: DataTypes.BIGINT({ length: 15 }),
    },
  },
  {
    timestamps: true,
    sequelize: connection,
    paranoid: true,
    tableName: 'Transactions'
  }
);

export default Transaction;
