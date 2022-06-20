import { useEffect } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import "./style.css";

const options = {
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
  types: ["establishment"],
};

export const autoCompleteSearch = (isLoaded) => {
  return isLoaded;
};

export default function AutoCompleteSearch() {
  const { ref } = usePlacesWidget({
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options,
  });

  return <div>{autoCompleteSearch && <input ref={ref} />}</div>;
}
