import "./AuthForm.css";

type TAuthFormProps = {
   idInstance: string;
   setIdInstance: (value: string) => void;
   apiTokenInstance: string;
   setApiTokenInstance: (value: string) => void;
};

export const AuthForm = ({
   idInstance,
   setIdInstance,
   apiTokenInstance,
   setApiTokenInstance,
}: TAuthFormProps) => {
   return (
      <>
         <input
            type="text"
            name="idInstance"
            id="idInstance"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
         />
         <input
            type="text"
            name="apiTokenInstance"
            id="apiTokenInstance"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
         />
      </>
   );
};
