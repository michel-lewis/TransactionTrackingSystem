export const formatDate = (payloadDate: Date | string) => {
    const date = typeof payloadDate === "string" ? new Date(payloadDate) : payloadDate;
  
    if (isNaN(date.getTime())) {
      throw new Error("La date fournie est invalide.");
    }
  
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  };