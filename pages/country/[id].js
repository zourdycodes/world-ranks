/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { Layout } from "../../components";
import styles from "./country.module.css";

const getCountryDetails = async (id) => {
  const response = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);

  const country = await response.json();

  return country;
};

const CountryInfo = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBordersDetail = async () => {
    const border = await Promise.all(
      country.borders.map((border) => getCountryDetails(border))
    );

    setBorders(border);
  };

  useEffect(() => {
    getBordersDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={country.name}>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img
              className={styles.country__image}
              src={country.flag}
              alt={country.name}
            />

            <h1 className={styles.overview_name}>{country.name}</h1>
            <div className={styles.overview_region}>{country.region}</div>

            <div className={styles.overview_numbers}>
              <div className={styles.overview_population}>
                <div className={styles.overview_value}>
                  {parseInt(country.population).toLocaleString()}
                </div>
                <div className={styles.overview_label}>Population</div>
              </div>
              <div className={styles.overview_area}>
                <div className={styles.overview_value}>
                  {parseInt(country.area).toLocaleString()}
                </div>
                <div className={styles.overview_label}>
                  Area (km<sup>2</sup>)
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Capital</div>
              <div className={styles.details_panel_value}>
                {country.capital}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Language</div>
              <div className={styles.details_panel_value}>
                {country.languages.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Currencies</div>
              <div className={styles.details_panel_value}>
                {country.currencies.map(({ name }) => name).join(", ")}
              </div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Native name</div>
              <div className={styles.details_panel_value}>
                {country.nativeName}
              </div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>GINI</div>
              <div className={styles.details_panel_value}>{country.gini} %</div>
            </div>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Subregion</div>
              <div className={styles.details_panel_value}>
                {country.subregion}
              </div>
            </div>

            {/* Neighbour */}
            <div className={styles.details_panel_borders}>
              <div className={styles.details_panel__borders_label}>
                Country Neighbour
              </div>

              <div className={styles.details_panel_borders_container}>
                {borders.map(({ flag, name }, index) => (
                  <div
                    key={index}
                    className={styles.details_panel_borders_country}
                  >
                    <img src={flag} alt={name} />

                    <div className={styles.details_panel_borders_name}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CountryInfo;

export const getServerSideProps = async ({ params }) => {
  const country = await getCountryDetails(params.id);

  return {
    props: {
      country,
    },
  };
};
