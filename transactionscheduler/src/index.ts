const http = require('http');
const PORT = process.env.PORT || 4000;
const schedule = require('node-schedule');


import { createTransaction, updateTransaction } from "./service/api";
import { senderFakeData, receiverFakeData } from "./fakeData/TransactionFakeData";

const server = http.createServer((req: Request, res: Response) => {
    console.log('Server running', 4000);

})

const MAX = 100000
export const generateValue = () =>{
    let value = Math.floor(Math.random() * MAX)  + MAX
    return value
}

export const getRandom = (array: string[]) =>{
    let value = Math.floor(Math.random() * array.length)
    return array[value]
}

export const transactionValue = () =>{
    return {
        sender: getRandom(senderFakeData),
        receiver: getRandom(receiverFakeData),
        value: generateValue(),
        timestamp: new Date().getTime(),
        confirmed: false
    }
}

const rule = new schedule.RecurrenceRule();
rule.minutes = 1;

export const ScheduleCreateTransaction = () =>{
    const scheduleCreation = schedule.scheduleJob(rule, function(){
        const transaction = transactionValue();
        createTransaction(transaction)
        .then((result : any) =>{
            const startTime = new Date(Date.now() + 10000);
            const endTime = new Date(startTime.getTime() + 1000);
            const scheduleUpdate = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
                const payload = {confirmed: true}
                console.log('result :' ,result)
                updateTransaction(result.data.id, payload )
                .then((result: any) =>{
                    console.log('updated')
                })
                .catch((err: any) =>{
                    console.log(' error ', err)
                })
            })
           
        })
        .catch((error: any) =>{
            console.log('erreur', error)
        })
  
      });
      
}



server.listen(PORT, () => {
    ScheduleCreateTransaction();
    console.log('Server demarrer au port ', PORT)
})


