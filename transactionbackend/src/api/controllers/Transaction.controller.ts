import Transaction from "../../db/models/Transaction.models";
import { TransactionCreateInput, TransactionReadOutput } from "../../db/models/Transaction.models";
import * as service from "../../db/services/databaseService";
import { CreateTransactionType, UpdateTransactionType } from "../../types/TransactionType";
import { MapTransaction } from "./MapTransaction";


export const CreateTransaction = async (payload: CreateTransactionType) :Promise<Transaction> =>{
    return MapTransaction( await service.Create(payload))
}

export const UpdateTransaction = async (id: string ,payload: UpdateTransactionType) :Promise<Transaction> =>{
    return MapTransaction(await service.Update(id, payload))
}

export const GetAllTransaction = async () :Promise<Transaction[]> =>{
    return (await service.getAll()).map(
        MapTransaction
    )
}

export const GetTransactionById = async (id: any) :Promise<Transaction> =>{
    return MapTransaction(await service.getById(id));
}

export const GetTransactionByRange = async (startDate: string, endDate: string):Promise<Transaction[]> =>{
    return ((await service.GetByRange(endDate, startDate)).map(
        MapTransaction
    ))
}