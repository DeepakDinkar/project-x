import country from "../../assets/json/country.json";

export default function countryValidator(_: unknown, value: string) {

    const isOptionAvailable = country.find(c => c.name.toLowerCase() === value.toLowerCase());
    if (!value || isOptionAvailable) {
        return Promise.resolve();
    }
    return Promise.reject("Invalid country");
}