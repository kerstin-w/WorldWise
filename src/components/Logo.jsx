import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

/**
 * The `Logo` function returns a JSX element that renders a logo image wrapped in a link.
 * @returns The Logo component is returning a JSX element. The JSX element consists of a Link component
 * from React Router, which wraps an img element. The img element has a src attribute set to
 * "/logo.png" and an alt attribute set to "WorldWise logo". It also has a className attribute set to
 * {styles.logo}, which suggests that there is a CSS module being used to style the logo.
 */
function Logo() {
  return (
    <Link to="/">
      <img src="/logo.png" alt="WorldWise logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
