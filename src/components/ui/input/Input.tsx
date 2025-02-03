import "./input.css";

type TInputProps = {
   value: string;
   setValue: (value: string) => void;
   type?: string;
};

export const Input = ({ value, setValue, type = "text" }: TInputProps) => {
   return (
      <input
         className="input"
         type={type}
         value={value}
         onChange={(e) => setValue(e.target.value)}
      />
   );
};
