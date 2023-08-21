import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';

type LocationProps = {
  handleLocationSelected?: (location: string) => void;
};

const Location: React.FC<LocationProps> = ({ handleLocationSelected }) => {
  const onPlaceSelect = (value: any) => {
    if (handleLocationSelected) handleLocationSelected(value.properties.name);
  };
  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="City, airport, address or hotel"
        lang={'en'}
        debounceDelay={500}
        placeSelect={onPlaceSelect}
      />
    </GeoapifyContext>
  );
};

export default Location;
