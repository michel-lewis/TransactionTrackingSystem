import * as TransactionController from "../controllers/Transaction.controller";
import Transaction from "../../db/models/Transaction.models";
import { Router, Request, Response } from "express";
import { io } from "../..";

export const TransactionRouter = Router(io);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Récupérer toutes les transactions
 *     responses:
 *       200:
 *         description: Succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Transaction'
 */
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
 * /api/createTransaction:
 *   post:
 *     summary: Créer une nouvelle transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction créée avec succès
 *       500:
 *         description: Erreur serveur
 */
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
 * /api/updateTransaction:
 *   put:
 *     summary: Mettre à jour une transaction
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transaction
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       200:
 *         description: Transaction mise à jour avec succès
 *       500:
 *         description: Erreur serveur
 */
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
 * /api/transactionDetails:
 *   get:
 *     summary: Obtenir les détails d'une transaction
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la transaction
 *     responses:
 *       200:
 *         description: Détails de la transaction
 *       500:
 *         description: Erreur serveur
 */
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
 * /api/getTransactionByRange:
 *   post:
 *     summary: Obtenir des transactions par plage de dates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *               endDate:
 *                 type: string
 *     responses:
 *       200:
 *         description: Transactions récupérées avec succès
 *       500:
 *         description: Erreur serveur
 */
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
