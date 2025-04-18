import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button type="button" className={clsx(styles.button)} onClick={onClick}>
      {children}
    </button>
  );
}
