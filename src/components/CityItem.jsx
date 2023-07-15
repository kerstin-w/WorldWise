import styles from "./CityItem.module.css";

/**
 * The `formatDate` function formats a given date into a string with the day, month, and year in a
 * specific format.
 */
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

/**
 * The CityItem component renders a list item with the city name, date, and emoji, along with a delete
 * button.
 * @returns The CityItem component is returning a list item element that displays the city's emoji,
 * name, date, and a delete button.
 */
function CityItem({ city }) {
  const { cityName, date, emoji } = city;

  return (
    <li className={styles.cityItem}>
      <span className={styles.emoji}>{emoji}</span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button className={styles.deleteBtn}>&times;</button>
    </li>
  );
}

export default CityItem;
