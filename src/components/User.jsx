import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import styles from "./User.module.css";

/**
 * The User component displays the user's avatar, name, and a logout button, and handles the logout
 * functionality.
 * @returns The User component is returning a div element with the class name "user". Inside the div,
 * there is an image element displaying the user's avatar, a span element displaying the user's name,
 * and a button element with the text "Logout". When the button is clicked, the handleClick function is
 * called, which logs the user out and navigates them to the home page.
 */
function User() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * The handleClick function logs the user out and navigates them to the home page.
   */
  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;
