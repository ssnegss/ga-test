import { useEffect, useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { getMessage } from "./utils/getMessage";

function App() {
   const apiUrl = "https://1103.api.green-api.com";
   const [idInstance, setIdInstance] = useState<string>("");
   const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
   const [recipientPhone, setRecipientPhone] = useState<string>("");
   const [message, setMessage] = useState<string>("");

   const [isInChat, setIsInChat] = useState<boolean>(false);

   const [chat, setChat] = useState<string[]>([""]);

   const headers = {
      "Content-Type": "application/json",
   };

   let isProcessing = false;

   useEffect(() => {
      if (isInChat)
         setInterval(async () => {
            if (isProcessing) return;
            isProcessing = true;
            const newMessage = await getMessage(
               apiUrl,
               idInstance,
               apiTokenInstance
            );

            if (newMessage) {
               setChat((prev) => [...prev, newMessage]);
            }
            isProcessing = false;
         }, 400);
   }, [isInChat]);

   const sendMessage = async () => {
      const body = {
         chatId: `${recipientPhone}@c.us`,
         message: message,
      };

      await fetch(
         `${apiUrl}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
         {
            method: "POST",
            headers,
            body: JSON.stringify(body),
         }
      );

      setChat((prev) => [...prev, message]);
   };

   return (
      <>
         <div>
            <AuthForm
               idInstance={idInstance}
               setIdInstance={setIdInstance}
               apiTokenInstance={apiTokenInstance}
               setApiTokenInstance={setApiTokenInstance}
            />
            <br />
            <div>
               <input
                  type="text"
                  value={recipientPhone}
                  onChange={(e) => setRecipientPhone(e.target.value)}
               />
            </div>
            <textarea
               name="message"
               id="message"
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button onClick={() => sendMessage()}>Отправить</button>
            {chat.map((message, index) => (
               <div key={index}>{message}</div>
            ))}
         </div>
      </>
   );
}

export default App;
