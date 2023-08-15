import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

const Location = () => {
  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="City, airport, address or hotel"
        lang={"en"}
        debounceDelay={500}
      />
    </GeoapifyContext>
  );
};

export default Location;
