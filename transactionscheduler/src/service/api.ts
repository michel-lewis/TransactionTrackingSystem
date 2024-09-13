const axios = require("axios");
const BaseUrl = "http://localhost:8000/api";

type Transaction = {
  value: number;
  sender: string;
  receiver: string;
  confirmed: boolean;
  timestamp: number;
};

export const createTransaction = (payload: Transaction): Promise<any> => {
  return new Promise((resolved, reject) => {
    axios
      .post(`${BaseUrl}/createTransaction`, payload)
      .then((result: any) => {
        console.log(" resultat obtenu ", result.data);
        resolved(result.data);
      })
      .catch((err: any) => {
        console.log("errer", err);
        reject(err);
      });
  });
};

export const updateTransaction = (
  id: string,
  payload: Partial<Transaction>
) => {
  return new Promise((resolved, reject) => {
    axios
      .put(`${BaseUrl}/updateTransaction?id=${encodeURIComponent(id)}`, payload)
      .then((result: any) => {
        console.log("result obtenu ", result);
        resolved(result.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const getTransactionById = (id: string) => {
  return new Promise((resolved, reject) => {
    axios
      .get(`${BaseUrl}/transactionDetails?id=${id}`)
      .then((result: any) => {
        resolved(result.data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};
