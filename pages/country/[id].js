const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>Country Page</h1>
    </div>
  );
};

export default CountryInfo;

export const getServerSideProps = async ({ params }) => {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/alpha/${params.id}`
  );

  const country = await response.json();

  return {
    props: {
      country,
    },
  };
};
