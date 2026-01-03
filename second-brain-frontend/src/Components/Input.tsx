interface InputBoxProps {
  placeHolder: string;
  reference: React.RefObject<HTMLInputElement | null> 
}
export const Input = ({ placeHolder, reference }: InputBoxProps) => {
  return (
    <div>
      <input
        required={true}
        ref={reference} 
        type="text"
        placeholder={placeHolder}
        className="px-4 py-2 m-2 border rounded"
      ></input>
    </div>
  );
}