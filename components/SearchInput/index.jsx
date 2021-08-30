import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./SearchInput.module.css";

export const SearchInput = ({ ...restProps }) => {
  return (
    <div className={styles.wrapper}>
      <SearchRounded color="inherit" />
      <input className={styles.input} {...restProps} />
    </div>
  );
};
