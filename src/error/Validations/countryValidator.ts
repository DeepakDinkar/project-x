import country from "../../assets/json/country.json";

export default function countryValidator(_: unknown, value: string) {
 
  if (!value) {
    return Promise.resolve();
  } else {
    const isOptionAvailable = country.find(
        (c) => c.name.toLowerCase() === value?.toLowerCase().trim()
      );
    if(isOptionAvailable) {
        return Promise.resolve();
    }
  }
  return Promise.reject("Invalid country");
}
