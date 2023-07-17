import { useNavigate } from "react-router-dom";
import Button from "./Button";

/**
 * The BackButton component is a React component that renders a button with a left arrow icon and
 * navigates back to the previous page when clicked.
 * @returns The `BackButton` component is returning a `Button` component with a type of "back" and an
 * `onClick` event handler. When the button is clicked, it prevents the default behavior (e.g., form
 * submission) and navigates back by calling the `navigate` function with a parameter of -1. The button
 * text is "&larr; Back".
 */
function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}

export default BackButton;
