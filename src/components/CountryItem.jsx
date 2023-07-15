import styles from "./CountryItem.module.css";

/**
 * The CountryItem function is a React component that renders a list item displaying a country's emoji
 * and name.
 * @returns The CountryItem component is returning a list item (`<li>`) with two spans inside. The
 * first span displays the emoji of the country, and the second span displays the name of the country.
 */
function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
