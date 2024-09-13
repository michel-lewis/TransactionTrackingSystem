import { Optional } from "sequelize"

export type CreateTransactionType = {
    value: number,
    confirmed?: boolean,
    receiver: string,
    sender: string,
}

export type UpdateTransactionType = Optional<CreateTransactionType, 'value'>; 