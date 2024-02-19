export default function zipCodeValidator(_: unknown, value: string) {
  const zipcodeRegex = /^[0-9a-zA-Z -]{3,10}$/;
  if (!value || zipcodeRegex.test(value)) {
    return Promise.resolve();
  }
  return Promise.reject("Zip code must be between 3 and 10 characters. ");
}
