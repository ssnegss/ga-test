import "./input.css";

type TInputProps = {
   value: string;
   setValue: (value: string) => void;
};

export const Input = ({ value, setValue }: TInputProps) => {
   return (
      <input
         className="input"
         type="text"
         value={value}
         onChange={(e) => setValue(e.target.value)}
      />
   );
};
