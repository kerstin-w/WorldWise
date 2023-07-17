import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

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
  const { currentCity, deleteCity } = useCities();
  const { cityName, date, emoji, id, position } = city;

  /**
   * The handleClick function prevents the default behavior of an event and calls the deleteCity function
   * with the id parameter.
   */
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
