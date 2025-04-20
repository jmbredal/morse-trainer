import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button type="button" className={clsx(styles.button, className)} {...props}>
      {children}
    </button>
  );
}
