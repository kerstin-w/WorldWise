import styles from "./Message.module.css";

/**
 * The Message component is a React component that renders a paragraph element with a greeting emoji
 * and a message.
 * @returns The Message component is returning a paragraph element with a class name of "message".
 * Inside the paragraph, there is a span element with a role of "img" and an emoji of waving hand (👋),
 * followed by the value of the "message" prop.
 */
function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span> {message}
    </p>
  );
}

export default Message;
