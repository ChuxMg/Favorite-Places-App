import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedplaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadedPlaces() {
      const places = await fetchPlaces();
      setLoadedplaces(places);
    }
    if (isFocused) {
      loadedPlaces();

      // setLoadedplaces((curPlaces) => [...curPlaces, route.params.place]);
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}

export default AllPlaces;
