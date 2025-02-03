export const getMessage = async (
   apiUrl: string,
   idInstance: string,
   apiTokenInstance: string
) => {
   let message = null;

   try {
      const response = await fetch(
         `${apiUrl}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}?receiveTimeout=5`,
         {
            method: "GET",
         }
      );
      const data = await response.json();

      if (data) {
         if (
            data.body.typeWebhook === "incomingMessageReceived" &&
            data.body.messageData.typeMessage === "textMessage"
         ) {
            message = data.body.messageData.textMessageData.textMessage;
         }

         await fetch(
            `${apiUrl}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${data.receiptId}`,
            {
               method: "DELETE",
            }
         );
      }
   } catch (e) {
      console.error(e);
   }

   return message;
};
