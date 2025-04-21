import { Option } from "../types";
import styles from "./Checkbox.module.css";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  option: Option;
};

export default function Checkbox({ option, ...props }: CheckboxProps) {
  return (
    <label className={styles.label}>
      {option.label}
      <input type="checkbox" value={option.value} {...props} />
    </label>
  );
}
