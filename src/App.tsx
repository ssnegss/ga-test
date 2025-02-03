import { useEffect, useState } from "react";
import { getMessage } from "./utils/getMessage";
import { fetchInstance } from "./utils/fetchInstance";
import { Input } from "./components/ui/input/Input";
import type { TMessage } from "../types/Message";

function App() {
   const apiUrl = "https://1103.api.green-api.com";
   const [idInstance, setIdInstance] = useState<string>("");
   const [apiTokenInstance, setApiTokenInstance] = useState<string>("");
   const [recipientPhone, setRecipientPhone] = useState<string>("");
   const [message, setMessage] = useState<string>("");

   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [isInChat, setIsInChat] = useState<boolean>(false);

   const [chatMessages, setChatMessages] = useState<TMessage[]>([]);

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
               setChatMessages((prev) => [
                  ...prev,
                  { sender: "companion", message: newMessage },
               ]);
            }
            isProcessing = false;
         }, 400);
   }, [isInChat]);

   const handleLogIn = async () => {
      if (idInstance && apiTokenInstance) {
         const data = await fetchInstance(apiUrl, idInstance, apiTokenInstance);
         if (data) {
            setIsLoggedIn(true);
         }
      }
   };

   const handleEnterPhone = () => {
      setIsInChat(true);
   };

   const sendMessage = async () => {
      try {
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

         setChatMessages((prev) => [...prev, { sender: "me", message }]);
         setMessage("");
      } catch (e) {
         console.error(e);
      }
   };

   return (
      <>
         {!isLoggedIn && (
            <div className="card auth-form">
               <div className="card__title">Auth</div>
               <Input value={idInstance} setValue={setIdInstance} />
               <Input value={apiTokenInstance} setValue={setApiTokenInstance} />
               <button className="btn" onClick={() => handleLogIn()}>
                  Log in
               </button>
            </div>
         )}
         {isLoggedIn && !isInChat && (
            <div className="card">
               <div className="card__title">Create new chat</div>
               <div>(start with 7)</div>
               <Input
                  type="number"
                  value={recipientPhone}
                  setValue={setRecipientPhone}
               />
               <button className="btn" onClick={() => handleEnterPhone()}>
                  Create chat
               </button>
            </div>
         )}
         {isLoggedIn && isInChat && (
            <div className="chat">
               <div className="chat__history">
                  {chatMessages.map((message, index) => (
                     <div
                        key={index}
                        className={
                           "chat__message chat__message--" + message.sender
                        }
                     >
                        <div className="chat__message-text">
                           {message.message}
                        </div>
                     </div>
                  ))}
               </div>
               <div className="chat__bottom">
                  <textarea
                     name="message"
                     id="message"
                     className="chat__textfield"
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                  <button
                     className="btn btn--secondary"
                     onClick={() => sendMessage()}
                  >
                     Отправить
                  </button>
               </div>
            </div>
         )}
      </>
   );
}

export default App;
