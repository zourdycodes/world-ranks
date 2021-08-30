import { KeyboardArrowDownRounded } from "@material-ui/icons";
import styles from "./CountryTable.module.css";

const orderBy = (countries = [], direction) => {
  if (direction === "asc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );
  }

  if (direction === "desc") {
    return [...countries].sort((a, b) =>
      a.population > b.population ? -1 : 1
    );
  }

  return countries;
};

export const CountryTable = ({ countries }) => {
  const orderedByPopulation = orderBy(countries, "desc");

  return (
    <div>
      <div className={styles.heading}>
        <button className={styles.heading_name}>
          <div>Name</div>

          <KeyboardArrowDownRounded />
        </button>

        <button className={styles.heading_population}>
          <div>Population</div>

          <KeyboardArrowDownRounded />
        </button>
      </div>

      {orderedByPopulation?.map((country) => (
        <div key={country.numericCode} className={styles.row}>
          <div className={styles.name}>{country.name}</div>
          <div className={styles.population}>{country.population}</div>
        </div>
      ))}
    </div>
  );
};
