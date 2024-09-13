import axios, {AxiosResponse,AxiosError } from 'axios'
const baseUrl: string = (import.meta.env.VITE_APP_API_BASE_URL)as string ;

if (!baseUrl) {
    throw new Error("REACT_APP_BASE_URL is not defined in .env");
}
export type Transaction  = {
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

export const fetchTransaction = async ():Promise<Transaction[] | undefined>=>{

    try {
        const res: AxiosResponse<{data:  Transaction[]}>  = await axios.get(baseUrl)
        return res.data.data
    } catch (err: AxiosError| any) {
        console.log('error ',err.message)
        return undefined
    }
}

export const fetchTransationDetails = async (id: string ): Promise<Transaction | undefined> =>{
    try{
        const res: AxiosResponse = await axios.get(`${baseUrl}/transactionDetails?id=${id}`)
        console.log("res.data", res.data.data)
        return res.data.data

    }
    catch(err: AxiosError | any){
        console.log(err.message )
        return undefined
    }
}



export const fetchTransactionByRange = async (startDate: string, endDate: string): Promise<any> => {
    try {
        console.log("tryinng ")
        const res: AxiosResponse = await axios.post(`${baseUrl}/getTransactionByRange`, {
            startDate,
            endDate
        });
        console.log("res.data", res.data.data);
        return res.data.data;
    } catch (err: AxiosError | any) {
        console.log(err.message);
        return undefined;
    }
};
