import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  StartIcon?: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple",
};

const defaultStyles = "px-4 py-2 rounded-md items-center flex";

export const Button = ({
  variant,
  text,
  StartIcon,
  onClick,
  fullWidth,
  loading
}: ButtonProps) => {
  return (
    <button
      className={
        variantClasses[variant] +
        " " +
        defaultStyles +
        `${fullWidth ? " w-full flex justify-center items-center" : ""}`
        +
        `${loading ? " opacity-45 hover:cursor-progress": ""}`
      }
      onClick={onClick}
      disabled={loading}
    >
      <div className="pr-2">{StartIcon}</div>
      {text}
    </button>
  );
};
