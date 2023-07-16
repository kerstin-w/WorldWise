import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

/* `const CitiesContext = createContext();` is creating a new context object called `CitiesContext`
using the `createContext` function provided by React. This context object will be used to share data
between components in a React component tree. */
const CitiesContext = createContext();

/**
 * The code defines a React component called CitiesProvider that fetches a list of cities from an API
 * and provides the data and loading state to its child components through a context.
 * @returns The `CitiesProvider` component is being returned, which is a provider component that wraps
 * its children with the `CitiesContext.Provider`. The `useCities` function is also being exported,
 * which is a custom hook that returns the context object obtained from the `useContext` hook.
 */
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data..");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

/**
 * The function "useCities" is a custom hook that returns the context of the "CitiesContext" and throws
 * an error if it is used outside of a "CitiesProvider".
 * @returns The `useCities` function returns the `context` object obtained from the `useContext` hook.
 */
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
