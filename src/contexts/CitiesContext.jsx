import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://my-json-server.typicode.com/kerstin-w/WorldWise";

/* `const CitiesContext = createContext();` is creating a new context object called `CitiesContext`
using the `createContext` function provided by React. This context object will be used to share data
between components in a React component tree. */
const CitiesContext = createContext();

/* The `const initialState` is defining the initial state object for the reducer function. It includes
properties such as `cities`, `isLoading`, `currentCity`, and `error`, which will be used to manage
the state of the application. */
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  errro: "",
};

/**
 * The reducer function handles different action types and updates the state accordingly in a
 * JavaScript React application.
 * @returns The reducer function returns a new state object based on the action type provided. The
 * returned state object includes properties such as isLoading, cities, currentCity, and error, which
 * are updated based on the action type and payload.
 */
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      throw new Error("unhandled action type");
  }
}

/**
 * The `CitiesProvider` function is a React component that provides state and functions related to
 * cities to its child components.
 * @returns The `CitiesProvider` component returns a `CitiesContext.Provider` component with the
 * following values provided as the context value: `cities`, `isLoading`, `currentCity`, `error`,
 * `getCity`, `createCity`, and `deleteCity`.
 */
function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  /* The useEffect hook is used to fetch the list of cities from the server when the component is mounted. */
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities..",
        });
      }
    }
    fetchCities();
  }, []);

  /**
   * The function `getCity` is an asynchronous function that fetches city data from an API based on the
   * provided `id` parameter and updates the state accordingly.
   * @returns The function does not have a return statement, so it does not explicitly return anything.
   */
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading the city..",
      });
    }
  }

  /**
   * The function `createCity` is an asynchronous function that sends a POST request to create a new city
   * and dispatches actions based on the response.
   */
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the city..",
      });
    }
  }

  /**
   * The function `deleteCity` is an asynchronous function that sends a DELETE request to the server to
   * delete a city by its ID, and dispatches different actions based on the success or failure of the
   * request.
   */
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city..",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
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
