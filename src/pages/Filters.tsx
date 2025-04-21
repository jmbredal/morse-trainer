import { FormEvent } from "react";
import Checkbox from "../components/Checkbox";
import { allOptions } from "../utils/utils";
import styles from "./Filters.module.css";

type FiltersProps = {
  onChange: (event: FormEvent<HTMLFormElement>) => void;
  selected: number[];
};

export default function Filters({ onChange, selected }: FiltersProps) {
  return (
    <form className={styles.filters} onChange={onChange}>
      {allOptions.map((option) => (
        <Checkbox
          key={option.value}
          name="selection"
          option={option}
          defaultChecked={selected.includes(option.value)}
        />
      ))}
    </form>
  );
}
