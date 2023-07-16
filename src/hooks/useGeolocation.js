import { useState } from "react";

/**
 * The `useGeolocation` function is a custom hook in JavaScript that allows you to retrieve the user's
 * current position using the browser's geolocation API.
 * @param [defaultPosition=null] - The defaultPosition parameter is an optional parameter that allows
 * you to set a default position for the geolocation. If no defaultPosition is provided, it will be set
 * to null.
 * @returns The function `useGeolocation` returns an object with the following properties and methods:
 */
export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
