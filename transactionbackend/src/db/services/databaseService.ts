import  Transaction   from "../models/Transaction.models";
import { Op } from 'sequelize';
import {  TransactionCreateInput, TransactionReadOutput } from "../models/Transaction.models";
import { compareIfFirstDateIsMostRecent, formatDate } from "../../helpers/formatDate";

export const getAll = async () : Promise<TransactionReadOutput[]>=>{
    return await Transaction.findAll({
        order: [['createdAt', 'ASC']] 
    });
}

export const getById =  async (id: any) :Promise<TransactionReadOutput> =>{
    const transaction = await Transaction.findByPk(id)
    if(!transaction || transaction == null ){
        throw('Not Found Transaction ')
    }
    return transaction;
}

export const Create = async (transactionData: TransactionCreateInput ) :Promise<TransactionReadOutput>=> {
    const transaction = await Transaction.create(transactionData);
    if(!transaction || transaction==null ){
        throw('Error On Transaction Creation')
    }
    return transaction;
}

export const Update = async (id: string, transactionData: Partial<TransactionCreateInput>) :Promise<TransactionReadOutput>=>{
    const transaction = await Transaction.findByPk(id)
    if(!transaction){
        throw ('Not Found Transaction')
    }
    transaction.update(transactionData);
    return transaction
}

export const GetByRange = async (startDatePayload: string , endDatePayload: string):Promise<TransactionReadOutput[]> =>{
    let startDate = new Date(startDatePayload);
    let endDate= new Date(endDatePayload);
    let isMostRecent = compareIfFirstDateIsMostRecent(startDate, endDate);
    console.log("is most recent ", isMostRecent, endDate, startDate)
    if(isMostRecent == false){
        let date = startDate;
        startDate = endDate;
        endDate = date
    }
    endDate.setHours(23, 59, 59, 999);


    const transaction = await Transaction.findAll({
        where:{ createdAt: {
            [Op.between]: [startDate, endDate]
        }}
    })
    if(!transaction){
        return []
    }
    else{
        return transaction
    }

}