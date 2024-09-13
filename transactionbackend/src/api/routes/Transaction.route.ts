import * as TransactionController from "../controllers/Transaction.controller";
import Transaction from "../../db/models/Transaction.models";
import { Router, Request, Response } from "express";
import { io } from "../..";

export const TransactionRouter = Router(io);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of Transaction
 *     description: Retrieve a list of Transaction from Database.
 *     responses:
 *       200:
 *         description: A list of transactions .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The transaction ID.
 *                         example: 3ae5d180-0f80-4683-b6a2-34b7519ead51
 *                       value:
 *                         type: integer
 *                         description: The transaction value.
 *                         example: 123452
 *                       sender:
 *                         type: string
 *                         description: The transaction sender.
 *                         example: john doe
 *                       receiver:
 *                         type: string
 *                         description: The transaction receiver.
 *                         example: sam doe
 *                       timestamp:
 *                         type: integer
 *                         description: The transaction timestamp.
 *                         example: 164432545278
 *                       confirmed:
 *                         type: boolean
 *                         description: The transaction status.
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         description: Creation date.
 *                         example: 2022-11-11
 *                       updatedAt:
 *                         type: string
 *                         description: Last modification date.
 *                         example: 2022-11-14
 */

//get all transactions

TransactionRouter.get("/", async (req: Request, res: Response) => {
    TransactionController.GetAllTransaction()
        .then((result) => {
            return res.status(200).send({
                success: true,
                data: result
            });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                error: err
            });
        });
});

/**
 * @swagger
 * /createTransaction:
 *   post:
 *     summary: Create a transaction.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: integer
 *                 description: The transaction value.
 *                 example: 123452
 *               sender:
 *                 type: string
 *                 description: The transaction sender.
 *                 example: john doe
 *               receiver:
 *                 type: string
 *                 description: The transaction receiver.
 *                 example: sam doe
 *               timestamp:
 *                 type: integer
 *                 description: The transaction timestamp.
 *                 example: 164432545278
 *               confirmed: 
 *                 type: boolean
 *                 description: The transaction confirmation status
 *                 example: false
 *     responses:
 *       200:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: string
 *                      description: The transaction ID.
 *                      example: 3ae5d180-0f80-4683-b6a2-34b7519ead51
 *                    value:
 *                      type: integer
 *                      description: The transaction value.
 *                      example: 123452
 *                    sender:
 *                      type: string
 *                      description: The transaction sender.
 *                      example: john doe
 *                    receiver:
 *                      type: string
 *                      description: The transaction receiver.
 *                      example: sam doe
 *                    timestamp:
 *                      type: integer
 *                      description: The transaction timestamp.
 *                      example: 164432545278
 *                    confirmed:
 *                      type: boolean
 *                      description: The transaction status.
 *                      example: 1
 *                    createdAt:
 *                      type: string
 *                      description: Creation date.
 *                      example: 2022-11-11
 *                    updatedAt:
 *                      type: string
 *                      description: Last modification date.
 *                      example: 2022-11-14
 */
//create transaction

TransactionRouter.post("/createTransaction", async (req: Request, res: Response) => {
    const transaction = req.body;
    if (!transaction) {
        return res.status(500).send({
            success: false,
            error: "Undefined Transaction"
        });
    }
    TransactionController.CreateTransaction(transaction)
        .then((result) => {
            io.emit('createTransaction', result);
            return res.status(200).send({
                success: true,
                data: result
            });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                error: err.message
            });
        });
});

/**
 * @swagger
 * /updateTransaction:
 *   put:
 *     summary: Update a transaction.
 *     description: Edit Transaction value on database
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: String ID of the Transaction to update.
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               value:
 *                 type: integer
 *                 description: The transaction value.
 *                 example: 123452
 *               sender:
 *                 type: string
 *                 description: The transaction sender.
 *                 example: john doe
 *               receiver:
 *                 type: string
 *                 description: The transaction receiver.
 *                 example: sam doe
 *               timestamp:
 *                 type: integer
 *                 description: The transaction timestamp.
 *                 example: 164432545278
 *               confirmed: 
 *                  type: boolean
 *                  description: The transaction confirmation status
 *                  example: false
 *     responses:
 *       201:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                    id:
 *                      type: string
 *                      description: The transaction ID.
 *                      example: 3ae5d180-0f80-4683-b6a2-34b7519ead51
 *                    value:
 *                      type: integer
 *                      description: The transaction value.
 *                      example: 123452
 *                    sender:
 *                      type: string
 *                      description: The transaction sender.
 *                      example: john doe
 *                    receiver:
 *                      type: string
 *                      description: The transaction receiver.
 *                      example: sam doe
 *                    timestamp:
 *                      type: integer
 *                      description: The transaction timestamp.
 *                      example: 164432545278
 *                    confirmed:
 *                      type: boolean
 *                      description: The transaction status.
 *                      example: 1
 *                    createdAt:
 *                      type: string
 *                      description: Creation date.
 *                      example: 2022-11-11
 *                    updatedAt:
 *                      type: string
 *                      description: Last modification date.
 *                      example: 2022-11-14
 */

//update transaction
TransactionRouter.put('/updateTransaction', async (req: Request, res: Response) => {
    const id = String(req.query.id);
    const transaction = req.body;
    if (!transaction || !id) {
        return res.status(500).send({
            success: false,
            error: "Undefined Transaction"
        });
    }
    TransactionController.UpdateTransaction(id, transaction)
        .then((result) => {
            io.emit('updateTransaction', result);
            return res.status(200).send({
                success: true,
                data: result
            });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                error: err
            });
        });
});

/**
 * @swagger
 * /transactionDetails:
 *   get:
 *     summary: Retrieve a transaction.
 *     description: Retrieve a single  transaction.
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: String ID of the Transaction to retrieve.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: A single transaction.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The transaction ID.
 *                         example: 3ae5d180-0f80-4683-b6a2-34b7519ead51
 *                       value:
 *                         type: integer
 *                         description: The transaction value.
 *                         example: 123452
 *                       sender:
 *                         type: string
 *                         description: The transaction sender.
 *                         example: john doe
 *                       receiver:
 *                         type: string
 *                         description: The transaction receiver.
 *                         example: sam doe
 *                       timestamp:
 *                         type: integer
 *                         description: The transaction timestamp.
 *                         example: 164432545278
 *                       confirmed:
 *                         type: boolean
 *                         description: The transaction status.
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         description: Creation date.
 *                         example: 2022-11-11
 *                       updatedAt:
 *                         type: string
 *                         description: Last modification date.
 *                         example: 2022-11-14
 */
//get details of a transaction by ID
TransactionRouter.get("/transactionDetails", async (req: Request, res: Response) => {
    const id = req.query.id;
    if (!id) {
        return res.status(500).send({
            success: false,
            error: 'Missing Id'
        });
    }
    TransactionController.GetTransactionById(id)
        .then((result) => {
            return res.status(200).send({
                success: true,
                data: result
            });
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                error: err
            });
        });
});

/**
 * @swagger
 * /getTransactionByRange:
 *   post:
 *     summary: Retrieve a range of Transaction
 *     description: Retrieve a range of Transaction from Database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 description: The transaction range Startdate.
 *                 example: 2024-09-09
 *               endDate:
 *                 type: string
 *                 description: The transaction range Enddate.
 *                 example: 2024-10-10
 *               
 *     responses:
 *       200:
 *         description: A rangeof transactions .
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The transaction ID.
 *                         example: 3ae5d180-0f80-4683-b6a2-34b7519ead51
 *                       value:
 *                         type: integer
 *                         description: The transaction value.
 *                         example: 123452
 *                       sender:
 *                         type: string
 *                         description: The transaction sender.
 *                         example: john doe
 *                       receiver:
 *                         type: string
 *                         description: The transaction receiver.
 *                         example: sam doe
 *                       timestamp:
 *                         type: integer
 *                         description: The transaction timestamp.
 *                         example: 164432545278
 *                       confirmed:
 *                         type: boolean
 *                         description: The transaction status.
 *                         example: 1
 *                       createdAt:
 *                         type: string
 *                         description: Creation date.
 *                         example: 2024-09-09
 *                       updatedAt:
 *                         type: string
 *                         description: Last modification date.
 *                         example: 2024-10-10
 */

//get range of transactions
TransactionRouter.post("/getTransactionByRange", async (req: Request, res: Response) => {
    const { startDate, endDate } = req.body;
    if (!startDate || !endDate) {
        return res.status(500).send({
            success: false,
            error: 'Missing value'
        });
    }
    TransactionController.GetTransactionByRange(startDate, endDate)
        .then((result) => {
            if (result.length >= 1) {
                return res.status(200).send({
                    success: true,
                    data: result
                });
            }
        })
        .catch((err) => {
            return res.status(500).send({
                success: false,
                error: err
            });
        });
});
