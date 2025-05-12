import "./Button.module.css";

type ButtonProps = {
  label: string;
  disabled: boolean;
  onClick: any;
};

const Button = ({ label, disabled, onClick }: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};
export default Button;
