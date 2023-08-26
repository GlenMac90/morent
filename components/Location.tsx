import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

const Location = ({
  onUserInput,
  searchLocation,
}: {
  onUserInput?: (input: string) => void;
  searchLocation?: string;
}) => {
  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="City, airport, address or hotel"
        lang={"en"}
        debounceDelay={500}
        onUserInput={onUserInput}
        value={searchLocation}
      />
    </GeoapifyContext>
  );
};

export default Location;
