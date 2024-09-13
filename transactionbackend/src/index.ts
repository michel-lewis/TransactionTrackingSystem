import express, { Request, Response } from "express";
import connection from "./db/config";
import cors from 'cors';
import { TransactionRouter } from "./api/routes/Transaction.route";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path'; // pour gérer les chemins de fichiers
import * as dotenv from 'dotenv'; // Import dotenv pour charger les variables d'environnement

dotenv.config(); // Charger

const SocketIo = require('socket.io')
const http = require("http");

// Configuration des options Swagger
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API Documentation',
        version: '1.0.0',
        description: 'API documentation for my project',
      },
      servers: [
        {
          url: 'http://localhost:8000/api',
        },
      ],
    },
    apis: [path.join(__dirname, './api/routes/Transaction.route.ts')],
  };


  // Initialisation de SwaggerJSDoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

  



const app = express();
const port = process.env.PORT || 8000;
const server = http.createServer(app)
app.use(cors());
app.use(express.json());
app.use("/api", TransactionRouter)

export const io = SocketIo(server, {cors: {origin: "*"}})

io.on('connection', (socket: any) =>{
    console.log("connection etablie ", socket.id)
    socket.on('createTransaction', (data: any) =>{
        socket.emit('creation de la transaction', data)
    })
    socket.on('updateTransaction', (data: any)=>{
        socket.emit('Modification de  la transaction', data)
    })
})


// Route pour accéder à la documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));



const start = async ():Promise<void> =>{
    try {
       const sync =  await connection.sync();
        console.log(sync)
        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
          });
          
    } catch (error) {
        console.error("error", error)
        process.exit(1);
    }
}

start();

app.get('/', (req, res) => {
    console.log('serveur running')
  });
  


