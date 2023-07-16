import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import Button from "./Button";

/**
 * The `Map` function is a React component that displays a map with markers for cities and allows the
 * user to change the map center and detect clicks on the map.
 * @returns The `Map` function returns JSX elements that represent a map container. It includes a
 * button to get the user's current position, a map container with a tile layer, markers for each city,
 * and additional components for changing the map center and detecting clicks on the map.
 */
function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  /* The `useEffect` hook in the provided code is used to update the `mapPosition` state variable
whenever the `mapLat` or `mapLng` values change. */
  useEffect(
    function () {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  /* The effect is triggered whenever the `geolocationPosition` variable changes. */
  useEffect(
    function () {
      if (geolocationPosition)
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    },
    [geolocationPosition]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your current position"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

/**
 * The ChangeCenter function takes a position and updates the center of a map using the useMap hook in
 * React.
 * @returns null
 */
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

/**
 * The DetectClick function uses React hooks to detect a click event on a map and navigate to a form
 * page with the latitude and longitude of the clicked location as query parameters.
 */
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
